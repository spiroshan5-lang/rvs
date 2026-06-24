import { cookies } from 'next/headers';
import AdminDashboard from './AdminDashboard';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value === 'authenticated';

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const res = await fetch('https://riko-backend-default-rtdb.firebaseio.com/cms.json', {
    cache: 'no-store'
  });
  const data = res.ok ? await res.json() : null;
  const cmsData = data || { hero: { images: [], interval: 4.5 }, gallery: [] };

  return <AdminDashboard initialData={cmsData} />;
}
