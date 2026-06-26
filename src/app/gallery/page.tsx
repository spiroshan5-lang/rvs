import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryClient from '@/components/GalleryClient';
import { GALLERY_CARDS } from '@/data/gallery';

export const metadata: Metadata = {
  title: 'Gallery | RVS Craft Interiors | Luxury Spatial Architecture Studio',
  description: 'Step into the spatial anthology of RVS Craft Interiors. Explore our luxury interior portfolio featuring rich material details, custom layout compositions, and lighting design.',
  keywords: ['interior design portfolio', 'luxury spatial architecture gallery', 'RVS portfolio', 'residential design photos'],
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen text-[var(--fg)] flex flex-col justify-between transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-24 md:pt-32 flex-grow flex flex-col overflow-hidden">
        <GalleryClient initialCards={GALLERY_CARDS} />
      </main>
      <Footer />
    </div>
  );
}
