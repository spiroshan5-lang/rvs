import { cookies } from 'next/headers';
import { validateSessionToken } from '@/lib/session';
import { getInquiriesAction, getCMSHeroSlidesAction, getCMSGalleryCardsAction } from './actions';
import InquiriesPanel from './InquiriesPanel';
import LoginForm from './LoginForm';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const isAuthenticated = session?.value ? validateSessionToken(session.value) : false;

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const [inquiriesResult, heroSlidesResult, galleryCardsResult] = await Promise.all([
    getInquiriesAction(),
    getCMSHeroSlidesAction(),
    getCMSGalleryCardsAction(),
  ]);

  return (
    <InquiriesPanel
      initialInquiries={inquiriesResult.data ?? []}
      initialHeroSlides={heroSlidesResult.data ?? []}
      initialGalleryCards={galleryCardsResult.data ?? []}
    />
  );
}
