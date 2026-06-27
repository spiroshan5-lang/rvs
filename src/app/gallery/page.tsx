import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryClient from '@/components/GalleryClient';
import { GALLERY_CARDS } from '@/data/gallery';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rvs-wheat.vercel.app';

export const metadata: Metadata = {
  title: 'Gallery | Our Portfolio of Luxury Interiors',
  description: 'Step into the spatial anthology of RVS Craft Interiors. Explore our luxury interior portfolio featuring rich material details, custom layout compositions, and bespoke lighting design in Bengaluru.',
  keywords: ['interior design portfolio Bengaluru', 'luxury spatial architecture gallery', 'RVS Craft Interiors portfolio', 'residential design photos'],
  alternates: { canonical: `/gallery` },
  openGraph: {
    title: 'Gallery | RVS Craft Interiors Portfolio',
    description: 'Explore our curated portfolio of luxury residential and hospitality interiors.',
    images: [{ url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_kitchen.jpg', width: 1200, height: 630, alt: 'RVS Craft Interiors Gallery' }],
  },
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