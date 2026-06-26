import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Services | RVS Craft Interiors | Luxury Spatial Architecture Studio',
  description: 'Explore the bespoke interior design and architectural design services offered by RVS Craft Interiors, including Residential Interiors, Commercial Spaces, Hospitality Design, and Modular Kitchens.',
  keywords: ['interior design services', 'residential interior design', 'commercial interiors', 'luxury modular kitchens', 'hospitality design', 'RVS Services'],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-[var(--fg)] transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-24">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
