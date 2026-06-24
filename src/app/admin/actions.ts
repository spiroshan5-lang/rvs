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
