'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryItem {
  id: string;
  image: string;
  aspect: string;
  title: string;
  colSpan: string;
  yOffset: string;
}

const items: GalleryItem[] = [
  {
    id: 'gal-1',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
    title: 'The Travertine Lounge',
    colSpan: 'md:col-span-7',
    yOffset: 'translate-y-0',
  },
  {
    id: 'gal-2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-square',
    title: 'Warm Oak Kitchen',
    colSpan: 'md:col-span-5',
    yOffset: 'md:translate-y-16', // offset down for masonry wave
  },
  {
    id: 'gal-3',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[4/3]',
    title: 'Brushed Brass Washroom',
    colSpan: 'md:col-span-5',
    yOffset: 'md:-translate-y-8',
  },
  {
    id: 'gal-4',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[3/4]',
    title: 'Linen Sanctuary Bedroom',
    colSpan: 'md:col-span-7',
    yOffset: 'translate-y-0',
  },
];

export default function GalleryPreview() {
  return (
    <section 
      id="gallery"
      className="bg-luxury-black text-soft-white py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-wood-light mb-4 block">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Spatial Anthology
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-beige-dark/50 tracking-wider max-w-xs mt-4 md:mt-0 leading-relaxed">
            A visual directory of residential details, lighting composition, and tactile material setups.
          </p>
        </div>

        {/* Masonry Grid */}
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
              {/* Image box */}
              <div className={`relative ${item.aspect} w-full overflow-hidden bg-luxury-gray`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.8] hover:brightness-[0.9]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Thin overlay outline border */}
                <div className="absolute inset-0 border border-soft-white/5 group-hover:border-wood-light/30 transition-colors duration-500" />
              </div>
              
              {/* Small description */}
              <div className="flex justify-between items-center px-1">
                <span className="font-serif text-sm font-light tracking-wide text-beige-dark/80 group-hover:text-soft-white transition-colors duration-300">
                  {item.title}
                </span>
                <span className="text-[9px] tracking-widest uppercase font-light text-soft-white/30 group-hover:text-wood-light transition-colors duration-300">
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
