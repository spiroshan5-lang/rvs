/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { sendInquiryEmail } from '@/lib/mailer';
import { createSessionToken, validateSessionToken } from '@/lib/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { InquirySchema } from '@/lib/validation';
import { getDatabaseUrl } from '@/lib/firebase';

/** Helper: get client IP for rate limiting */
async function getClientIP(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headerStore.get('x-real-ip') || 'unknown';
}

/** Helper: validate admin session cookie */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return false;
  return validateSessionToken(token);
}

// ─────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────

export async function loginAction(password: string) {
  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`login:${ip}`, RATE_LIMITS.LOGIN.maxAttempts, RATE_LIMITS.LOGIN.windowMs);
  if (!rateCheck.allowed) {
    const minutes = Math.ceil(rateCheck.resetIn / 60000);
    return { success: false, error: `Too many login attempts. Try again in ${minutes} minutes.` };
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword || expectedPassword === 'admin123' || password === 'admin123') {
    return { success: false, error: 'Invalid password' };
  }

  if (password === expectedPassword) {
    const cookieStore = await cookies();
    const sessionToken = createSessionToken();
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  }
  return { success: false, error: 'Invalid password' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

// ─────────────────────────────────────────────────────────────────
// CUSTOMER INQUIRIES  (Firebase RTDB – server-side only)
// ─────────────────────────────────────────────────────────────────

export async function submitInquiryAction(formData: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  location: string;
  message: string;
}) {
  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`inquiry:${ip}`, RATE_LIMITS.CONTACT_FORM.maxAttempts, RATE_LIMITS.CONTACT_FORM.windowMs);
  if (!rateCheck.allowed) {
    const minutes = Math.ceil(rateCheck.resetIn / 60000);
    return { success: false, error: `Too many submissions. Try again in ${minutes} minutes.` };
  }

  const parsed = InquirySchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Invalid input' };
  }

  try {
    const inquiry = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    // Save securely to Firebase RTDB (token auth appended by getDatabaseUrl)
    const response = await fetch(await getDatabaseUrl('/inquiries.json'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) {
      console.error('Firebase write failed:', await response.text());
      // Non-blocking: still send email even if DB write fails
    }

    // Send email notification
    await sendInquiryEmail(inquiry);

    return { success: true };
  } catch (error: any) {
    console.error('Inquiry submission failed:', error);
    return { success: false, error: 'Failed to submit inquiry. Please try again.' };
  }
}

export async function getInquiriesAction() {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized', data: [] };

  try {
    const response = await fetch(await getDatabaseUrl('/inquiries.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch inquiries');

    const raw = await response.json();
    if (!raw) return { success: true, data: [] };

    const list = Object.entries(raw)
      .map(([id, val]: [string, any]) => ({ id, ...val }))
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function deleteInquiryAction(id: string) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid inquiry ID' };

  try {
    const response = await fetch(await getDatabaseUrl(`/inquiries/${id}.json`), { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete inquiry');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateInquiryStatusAction(id: string, status: string) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid inquiry ID' };

  const allowedStatuses = ['new', 'contacted', 'in-progress', 'closed'];
  if (!allowedStatuses.includes(status)) return { success: false, error: 'Invalid status value' };

  try {
    const response = await fetch(await getDatabaseUrl(`/inquiries/${id}.json`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ─────────────────────────────────────────────────────────────────
// CMS – HERO SLIDES  (Firebase RTDB /cms/heroSlides)
// ─────────────────────────────────────────────────────────────────

export interface CMSHeroSlide {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export async function getCMSHeroSlidesAction(): Promise<{ success: boolean; data: CMSHeroSlide[]; error?: string }> {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized', data: [] };

  try {
    const response = await fetch(await getDatabaseUrl('/cms/heroSlides.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch hero slides');
    const raw = await response.json();
    if (!raw) return { success: true, data: [] };

    const list: CMSHeroSlide[] = Object.entries(raw)
      .map(([id, val]: [string, any]) => ({ id, ...val }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function addCMSHeroSlideAction(slide: { url: string; alt: string; order: number }) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!slide.url.startsWith('https://')) return { success: false, error: 'URL must start with https://' };

  try {
    const response = await fetch(await getDatabaseUrl('/cms/heroSlides.json'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide),
    });
    if (!response.ok) throw new Error('Failed to add hero slide');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCMSHeroSlideAction(id: string, slide: Partial<{ url: string; alt: string; order: number }>) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid ID' };

  try {
    const response = await fetch(await getDatabaseUrl(`/cms/heroSlides/${id}.json`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slide),
    });
    if (!response.ok) throw new Error('Failed to update hero slide');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCMSHeroSlideAction(id: string) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid ID' };

  try {
    const response = await fetch(await getDatabaseUrl(`/cms/heroSlides/${id}.json`), { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete hero slide');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ─────────────────────────────────────────────────────────────────
// CMS – GALLERY CARDS  (Firebase RTDB /cms/galleryCards)
// ─────────────────────────────────────────────────────────────────

export interface CMSGalleryCard {
  id: string;
  imgUrl: string;
  alt: string;
  linkUrl?: string;
  order: number;
}

export async function getCMSGalleryCardsAction(): Promise<{ success: boolean; data: CMSGalleryCard[]; error?: string }> {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized', data: [] };

  try {
    const response = await fetch(await getDatabaseUrl('/cms/galleryCards.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch gallery cards');
    const raw = await response.json();
    if (!raw) return { success: true, data: [] };

    const list: CMSGalleryCard[] = Object.entries(raw)
      .map(([id, val]: [string, any]) => ({ id, ...val }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function addCMSGalleryCardAction(card: { imgUrl: string; alt: string; linkUrl?: string; order: number }) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!card.imgUrl.startsWith('https://')) return { success: false, error: 'Image URL must start with https://' };

  try {
    const response = await fetch(await getDatabaseUrl('/cms/galleryCards.json'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    if (!response.ok) throw new Error('Failed to add gallery card');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCMSGalleryCardAction(id: string, card: Partial<{ imgUrl: string; alt: string; linkUrl: string; order: number }>) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid ID' };

  try {
    const response = await fetch(await getDatabaseUrl(`/cms/galleryCards/${id}.json`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    if (!response.ok) throw new Error('Failed to update gallery card');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCMSGalleryCardAction(id: string) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!/^[\w\-]+$/.test(id)) return { success: false, error: 'Invalid ID' };

  try {
    const response = await fetch(await getDatabaseUrl(`/cms/galleryCards/${id}.json`), { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete gallery card');
    revalidatePath('/gallery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
