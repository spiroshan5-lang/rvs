'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function loginAction(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
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
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const response = await fetch('https://riko-backend-default-rtdb.firebaseio.com/cms.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update Firebase database');
    }

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
  try {
    const inquiry = {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    const response = await fetch('https://riko-backend-default-rtdb.firebaseio.com/inquiries.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) throw new Error('Failed to save inquiry');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getInquiriesAction() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    return { success: false, error: 'Unauthorized', data: [] };
  }

  try {
    const response = await fetch('https://riko-backend-default-rtdb.firebaseio.com/inquiries.json', {
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch inquiries');

    const raw = await response.json();
    if (!raw) return { success: true, data: [] };

    // Firebase POST returns an object keyed by push IDs
    const list = Object.entries(raw).map(([id, val]: [string, any]) => ({
      id,
      ...val,
    }));

    // Sort newest first
    list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function deleteInquiryAction(id: string) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const response = await fetch('https://riko-backend-default-rtdb.firebaseio.com/inquiries/' + id + '.json', {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete inquiry');

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateInquiryStatusAction(id: string, status: string) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const response = await fetch('https://riko-backend-default-rtdb.firebaseio.com/inquiries/' + id + '.json', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Failed to update inquiry status');

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
