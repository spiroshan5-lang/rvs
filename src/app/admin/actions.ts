'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { sendInquiryEmail } from '@/lib/mailer';
import { createSessionToken, validateSessionToken } from '@/lib/session';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { InquirySchema } from '@/lib/validation';

/** Helper to get client IP for rate limiting */
async function getClientIP(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headerStore.get('x-real-ip') || 'unknown';
}

/** Helper to validate admin session from cookie */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session') ?.value;
  if (!token) return false;
  return validateSessionToken(token);
}

export async function loginAction(password: string) {
  const ip = await getClientIP();

  // Rate limit login attempts
  const rateCheck = checkRateLimit(
    `login:${ip}`,
    RATE_LIMITS.LOGIN.maxAttempts,
    RATE_LIMITS.LOGIN.windowMs
  );

  if (!rateCheck.allowed) {
    const minutes = Math.ceil(rateCheck.resetIn / 60000);
    return {
      success: false,
      error: `Too many login attempts. Try again in ${minutes} minutes.`,
    };
  }

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    const sessionToken = createSessionToken();

    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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

export async function saveCmsAction(data: any) {
  if (!(await isAuthenticated())) {
    return { success: false, error: 'Unauthorized' };
  }

  const ip = await getClientIP();
  const rateCheck = checkRateLimit(
    `cms:${ip}`,
    RATE_LIMITS.CMS_SAVE.maxAttempts,
    RATE_LIMITS.CMS_SAVE.windowMs
  );

  if (!rateCheck.allowed) {
    return { success: false, error: 'Too many save attempts. Please wait.' };
  }

  try {
    const response = await fetch(
      'https://riko-backend-default-rtdb.firebaseio.com/cms.json',
      {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error('Failed to update Firebase database');

    revalidatePath('/');
    revalidatePath('/gallery');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitInquiryAction(formData: {
  name: string;
  email: string;
  phone: string;
  budget: string;
  location: string;
  message: string;
}) {
  const ip = await getClientIP();

  // Rate limit contact form submissions
  const rateCheck = checkRateLimit(
    `inquiry:${ip}`,
    RATE_LIMITS.CONTACT_FORM.maxAttempts,
    RATE_LIMITS.CONTACT_FORM.windowMs
  );

  if (!rateCheck.allowed) {
    const minutes = Math.ceil(rateCheck.resetIn / 60000);
    return {
      success: false,
      error: `Too many submissions. Please try again in ${minutes} minutes.`,
    };
  }

  // Validate input with Zod
  const parsed = InquirySchema.safeParse(formData);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || 'Invalid input';
    return { success: false, error: firstError };
  }

  try {
    const inquiry = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    // Save to Firebase
    const response = await fetch(
      'https://riko-backend-default-rtdb.firebaseio.com/inquiries.json',
      {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(inquiry),
      }
    );

    if (!response.ok) throw new Error('Failed to save inquiry');

    // Send email notification (non-blocking)
    try {
      await sendInquiryEmail(inquiry);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getInquiriesAction() {
  if (!(await isAuthenticated())) {
    return { success: false, error: 'Unauthorized', data: [] };
  }

  try {
    const response = await fetch(
      'https://riko-backend-default-rtdb.firebaseio.com/inquiries.json',
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('Failed to fetch inquiries');

    const raw = await response.json();
    if (!raw) return { success: true, data: [] };

    const list = Object.entries(raw).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));

    list.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function deleteInquiryAction(id: string) {
  if (!(await isAuthenticated())) {
    return { success: false, error: 'Unauthorized' };
  }

  // Validate ID format to prevent path traversal
  if (!/^[\w\-]+$/.test(id)) {
    return { success: false, error: 'Invalid inquiry ID' };
  }

  try {
    const url =
      'https://riko-backend-default-rtdb.firebaseio.com/inquiries/' +
      id +
      '.json';
    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) throw new Error('Failed to delete inquiry');

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateInquiryStatusAction(id: string, status: string) {
  if (!(await isAuthenticated())) {
    return { success: false, error: 'Unauthorized' };
  }

  // Validate ID format to prevent path traversal
  if (!/^[\w\-]+$/.test(id)) {
    return { success: false, error: 'Invalid inquiry ID' };
  }

  // Validate status value
  const allowedStatuses = ['new', 'contacted', 'in-progress', 'closed'];
  if (!allowedStatuses.includes(status)) {
    return { success: false, error: 'Invalid status value' };
  }

  try {
    const url =
      'https://riko-backend-default-rtdb.firebaseio.com/inquiries/' +
      id +
      '.json';
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Failed to update inquiry status');

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

