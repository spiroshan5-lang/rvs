'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SocialCards from '@/components/ui/card-fan-carousel';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCms() {
      try {
        const res = await fetch('https://riko-backend-default-rtdb.firebaseio.com/cms.json');
        if (res.ok) {
          const data = await res.json();
          if (data?.gallery) {
            setCards(data.gallery);
          }
        }
      } catch (err) {
        console.error('Failed to fetch gallery CMS data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCms();
  }, []);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F0] flex flex-col justify-between">
      <Navbar />
      <main className="pt-32 flex-grow flex flex-col justify-center items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 text-center mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
            Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight mb-4">
            Spatial Anthology
          </h1>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/60 tracking-wider max-w-lg mx-auto leading-relaxed">
            A dynamic, tactile showcase of physical details, lighting composition, and rich material pairing.
          </p>
        </div>
        <div className="w-full flex justify-center py-8 min-h-[40vh]">
          {!loading && cards.length > 0 && <SocialCards cards={cards} />}
          {loading && <div className="text-[#c9a86a] opacity-50 font-sans tracking-widest text-sm uppercase">Loading Gallery...</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
