/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { sendInquiryEmail } from '@/lib/mailer';
import { createSessionToken, validateSessionToken } from '@/lib/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { InquirySchema } from '@/lib/validation';
import { getDatabaseUrl } from '@/lib/firebase';
import { createHash } from 'crypto';

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

// ════════════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════
// CUSTOMER INQUIRIES  (Firebase RTDB – server-side only)
// ════════════════════════════════════════════════════════════════

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

    // Send email notification (non-blocking — form should still succeed)
    try {
      await sendInquiryEmail(inquiry);
    } catch (emailErr) {
      console.error('Email notification failed (non-blocking):', emailErr);
    }

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

// ════════════════════════════════════════════════════════════════
// CLOUDINARY HELPERS  (image config stored as raw JSON in Cloudinary)
// Hero slides  → public_id: rvs_cms/hero_config
// Gallery cards → public_id: rvs_cms/gallery_config
// ════════════════════════════════════════════════════════════════

const HERO_PUBLIC_ID    = 'rvs_cms/hero_config';
const GALLERY_PUBLIC_ID = 'rvs_cms/gallery_config';

/** Build Cloudinary SHA-1 signature */
function cloudinarySign(params: Record<string, string>, apiSecret: string): string {
  const sorted = Object.entries(params)
    .filter(([, v]) => v !== '' && v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return createHash('sha1').update(sorted + apiSecret).digest('hex');
}

/** Fetch the JSON array stored in Cloudinary as a raw resource */
async function readCloudinaryJson(publicId: string): Promise<any[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return [];
  const url = `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}.json?_t=${Date.now()}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];          // not found yet → empty list
    return await res.json();
  } catch {
    return [];
  }
}

/** Upload (overwrite) a JSON array to Cloudinary as a raw resource */
async function writeCloudinaryJson(publicId: string, data: any[]): Promise<void> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary env vars not configured');

  const timestamp = Math.round(Date.now() / 1000).toString();
  // Only params that go into signature (excludes file, api_key, resource_type, cloud_name)
  const sigParams: Record<string, string> = {
    invalidate: 'true',
    overwrite:  'true',
    public_id:  publicId,
    timestamp,
  };
  const signature = cloudinarySign(sigParams, apiSecret);

  const json = JSON.stringify(data);
  const form = new FormData();
  form.append('file',      new Blob([json], { type: 'application/json' }), 'config.json');
  form.append('api_key',   apiKey);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('public_id', publicId);
  form.append('overwrite', 'true');
  form.append('invalidate','true');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: 'POST', body: form }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Cloudinary write failed');
  }
}

// ════════════════════════════════════════════════════════════════
// CMS – HERO SLIDES  (Cloudinary-only, no Firebase)
// ════════════════════════════════════════════════════════════════

export interface CMSHeroSlide {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export async function getCMSHeroSlidesAction(): Promise<{ success: boolean; data: CMSHeroSlide[]; error?: string }> {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized', data: [] };
  try {
    const slides = (await readCloudinaryJson(HERO_PUBLIC_ID)) as CMSHeroSlide[];
    return { success: true, data: slides.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function addCMSHeroSlideAction(slide: { url: string; alt: string; order: number }) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!slide.url.trim().startsWith('https://')) return { success: false, error: 'URL must start with https://' };

  try {
    const slides = (await readCloudinaryJson(HERO_PUBLIC_ID)) as CMSHeroSlide[];
    const newSlide: CMSHeroSlide = { id: `hero-${Date.now()}`, ...slide };
    await writeCloudinaryJson(HERO_PUBLIC_ID, [...slides, newSlide]);
    revalidatePath('/');
    return { success: true, id: newSlide.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCMSHeroSlideAction(id: string, slide: Partial<{ url: string; alt: string; order: number }>) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!id || !id.startsWith('hero-')) return { success: false, error: 'Invalid slide ID' };

  try {
    const slides = (await readCloudinaryJson(HERO_PUBLIC_ID)) as CMSHeroSlide[];
    const updated = slides.map(s => s.id === id ? { ...s, ...slide } : s);
    await writeCloudinaryJson(HERO_PUBLIC_ID, updated);
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
  if (!id || !id.startsWith('hero-')) return { success: false, error: 'Invalid slide ID' };

  try {
    const slides = (await readCloudinaryJson(HERO_PUBLIC_ID)) as CMSHeroSlide[];
    await writeCloudinaryJson(HERO_PUBLIC_ID, slides.filter(s => s.id !== id));
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ════════════════════════════════════════════════════════════════
// CMS – GALLERY CARDS  (Cloudinary-only, no Firebase)
// ════════════════════════════════════════════════════════════════

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
    const cards = (await readCloudinaryJson(GALLERY_PUBLIC_ID)) as CMSGalleryCard[];
    return { success: true, data: cards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function addCMSGalleryCardAction(card: { imgUrl: string; alt: string; linkUrl?: string; order: number }) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!card.imgUrl.trim().startsWith('https://')) return { success: false, error: 'Image URL must start with https://' };

  try {
    const cards = (await readCloudinaryJson(GALLERY_PUBLIC_ID)) as CMSGalleryCard[];
    const newCard: CMSGalleryCard = { id: `gallery-${Date.now()}`, ...card };
    await writeCloudinaryJson(GALLERY_PUBLIC_ID, [...cards, newCard]);
    revalidatePath('/gallery');
    return { success: true, id: newCard.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCMSGalleryCardAction(id: string, card: Partial<{ imgUrl: string; alt: string; linkUrl: string; order: number }>) {
  if (!(await isAuthenticated())) return { success: false, error: 'Unauthorized' };

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(`cms:${ip}`, RATE_LIMITS.CMS_SAVE.maxAttempts, RATE_LIMITS.CMS_SAVE.windowMs);
  if (!rateCheck.allowed) return { success: false, error: 'Too many updates. Please wait a few minutes.' };
  if (!id || !id.startsWith('gallery-')) return { success: false, error: 'Invalid card ID' };

  try {
    const cards = (await readCloudinaryJson(GALLERY_PUBLIC_ID)) as CMSGalleryCard[];
    const updated = cards.map(c => c.id === id ? { ...c, ...card } : c);
    await writeCloudinaryJson(GALLERY_PUBLIC_ID, updated);
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
  if (!id || !id.startsWith('gallery-')) return { success: false, error: 'Invalid card ID' };

  try {
    const cards = (await readCloudinaryJson(GALLERY_PUBLIC_ID)) as CMSGalleryCard[];
    await writeCloudinaryJson(GALLERY_PUBLIC_ID, cards.filter(c => c.id !== id));
    revalidatePath('/gallery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

