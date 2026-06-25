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
          if (data?.gallery) setCards(data.gallery);
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
    <div className="min-h-screen text-[var(--fg)] flex flex-col justify-between transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-24 md:pt-32 flex-grow flex flex-col justify-center items-center overflow-hidden">

        {/* Section header */}
        <div className="w-full px-6 md:px-12 text-center mb-5 md:mb-8" style={{ maxWidth: "90rem" }}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-3 block">
            Portfolio
          </span>
          <h1 className="font-serif font-light tracking-wide leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)" }}>
            Spatial Anthology
          </h1>
          <p className="font-light text-[var(--fg)] tracking-wider mx-auto leading-relaxed"
             style={{ fontSize: "clamp(11px, 2.8vw, 14px)", opacity: 0.55, maxWidth: 420 }}>
            A dynamic, tactile showcase of physical details, lighting composition, and rich material pairing.
          </p>
        </div>

        {/* Gallery slider */}
        <div className="w-full flex justify-center" style={{ minHeight: "40vh" }}>
          {!loading && cards.length > 0 && <SocialCards cards={cards} />}
          {loading && (
            <div className="flex items-center justify-center" style={{ minHeight: "40vh" }}>
              <span className="text-[var(--gold)] opacity-50 font-sans tracking-widest text-xs uppercase">Loading Gallery...</span>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
