'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GalleryPreview() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCms() {
      try {
        const res = await fetch('https://riko-backend-default-rtdb.firebaseio.com/cms.json');
        if (res.ok) {
          const data = await res.json();
          if (data?.gallery) {
            const mapped = data.gallery.slice(0, 4).map((item: any, idx: number) => {
              const layoutStyles = [
                { aspect: 'aspect-[3/4]', colSpan: 'md:col-span-7', yOffset: 'translate-y-0' },
                { aspect: 'aspect-square', colSpan: 'md:col-span-5', yOffset: 'md:translate-y-16' },
                { aspect: 'aspect-[4/3]', colSpan: 'md:col-span-5', yOffset: 'md:-translate-y-8' },
                { aspect: 'aspect-[3/4]', colSpan: 'md:col-span-7', yOffset: 'translate-y-0' }
              ];
              return { ...item, ...layoutStyles[idx % 4] };
            });
            setItems(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to fetch gallery CMS data', err);
      }
    }
    fetchCms();
  }, []);

  if (items.length === 0) return null;

  return (
    <section 
      id="gallery"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Spatial Anthology
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/50 tracking-wider max-w-xs mt-4 md:mt-0 leading-relaxed">
            A visual directory of residential details, lighting composition, and tactile material setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`${item.colSpan} ${item.yOffset} group flex flex-col space-y-4`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <div className={`relative ${item.aspect} w-full overflow-hidden bg-[#1f1005]`}>
                <img
                  src={item.imgUrl}
                  alt={item.alt || item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.8] hover:brightness-[0.9]"
                />
                <div className="absolute inset-0 border border-[#F5F5F0]/5 group-hover:border-[#c9a86a]/30 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="font-serif text-sm font-light tracking-wide text-[#F5F5F0]/80 group-hover:text-[#F5F5F0] transition-colors duration-300">
                  {item.alt || item.title}
                </span>
                <span className="text-[9px] tracking-widest uppercase font-light text-[#F5F5F0]/30 group-hover:text-[#c9a86a] transition-colors duration-300">
                  View Frame
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
