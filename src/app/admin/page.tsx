import { cookies } from 'next/headers';
import { validateSessionToken } from '@/lib/session';
import { getInquiriesAction } from './actions';
import InquiriesPanel from './InquiriesPanel';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value ? validateSessionToken(session.value) : false;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const { data: inquiries } = await getInquiriesAction();

  return <InquiriesPanel initialInquiries={inquiries ?? []} />;
}
