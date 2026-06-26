import { cookies } from 'next/headers';
import { validateSessionToken } from '@/lib/session';
import { getDatabaseUrl } from '@/lib/firebase';
import AdminDashboard from './AdminDashboard';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value ? validateSessionToken(session.value) : false;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const res = await fetch(getDatabaseUrl('/cms.json'), {
    cache: 'no-store'
  });
  const data = res.ok ? await res.json() : null;
  const cmsData = data || { hero: { images: [], interval: 4.5 }, gallery: [] };

  return <AdminDashboard initialData={cmsData} />;
}
