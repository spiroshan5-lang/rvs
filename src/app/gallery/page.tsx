import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryClient from '@/components/GalleryClient';
import { getDatabaseUrl } from '@/lib/firebase';

export const metadata: Metadata = {
  title: 'Gallery | RVS Craft Interiors | Luxury Spatial Architecture Studio',
  description: 'Step into the spatial anthology of RVS Craft Interiors. Explore our luxury interior portfolio featuring rich material details, custom layout compositions, and lighting design.',
  keywords: ['interior design portfolio', 'luxury spatial architecture gallery', 'RVS portfolio', 'residential design photos'],
};

export default async function GalleryPage() {
  let cards: any[] = [];
  try {
    const res = await fetch(getDatabaseUrl('/cms.json'), {
      next: { revalidate: 3600 }, // Enable Incremental Static Regeneration (ISR) with a 1-hour revalidation window
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.gallery) {
        cards = data.gallery;
      }
    }
  } catch (err) {
    console.error('Failed to fetch gallery CMS data on server:', err);
  }

  return (
    <div className="min-h-screen text-[var(--fg)] flex flex-col justify-between transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-24 md:pt-32 flex-grow flex flex-col overflow-hidden">
        <GalleryClient initialCards={cards} />
      </main>
      <Footer />
    </div>
  );
}
