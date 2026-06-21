'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Material {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
}

const materials: Material[] = [
  {
    id: 'mat-1',
    name: 'Walnut Wood',
    type: 'Warmth',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=600&auto=format&fit=crop',
    description: 'Brings organic warmth, rich grain rhythm, and deep wood panel structure.',
  },
  {
    id: 'mat-2',
    name: 'Carrara Marble',
    type: 'Nobility',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop',
    description: 'Elegant white marble surfaces with delicate gray veining for timeless light reflectiveness.',
  },
  {
    id: 'mat-3',
    name: 'Travertine Stone',
    type: 'Texture',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
    description: 'Raw, textured volcanic rock providing heavy grounding presence and architectural weight.',
  },
  {
    id: 'mat-4',
    name: 'Bouclé Fabric',
    type: 'Comfort',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop',
    description: 'Soft linen and rich bouclé loops creating tactile shadow plays and comforting seating.',
  },
  {
    id: 'mat-5',
    name: 'Brushed Brass',
    type: 'Precision',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop',
    description: 'Hand-brushed luxury metallic fixtures framing edges with gold and bronze highlights.',
  },
  {
    id: 'mat-6',
    name: 'Fluted Glass',
    type: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    description: 'Ribbed, frosted partitions scattering soft light rays while preserving spatial privacy.',
  },
];

export default function MaterialMood() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section 
      id="materials"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Tactile Studies
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Material Mood Board
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/60 tracking-wider max-w-xs mt-4 lg:mt-0 leading-relaxed">
            Interact with our primary palette. Hover over a tile to expand its grain details and tactile composition.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <motion.div
              key={mat.id}
              className="relative aspect-square overflow-hidden bg-[#1f1005] group cursor-pointer"
              onMouseEnter={() => setHoveredId(mat.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              animate={{
                opacity: hoveredId && hoveredId !== mat.id ? 0.4 : 1,
              }}
            >
              {/* Texture Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.8]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Grid content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top: Name & Tag */}
                <div className="flex justify-between items-start">
                  <span className="font-serif text-xl md:text-2xl text-[#F5F5F0] font-light tracking-wide">
                    {mat.name}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-light text-[#c9a86a] border border-[#c9a86a]/40 px-2 py-0.5">
                    {mat.type}
                  </span>
                </div>

                {/* Bottom: Description revealing on hover */}
                <div className="overflow-hidden">
                  <motion.p 
                    className="text-xs text-[#F5F5F0]/95 font-light leading-relaxed tracking-wide mt-2 block"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ 
                      y: hoveredId === mat.id ? 0 : 40,
                      opacity: hoveredId === mat.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {mat.description}
                  </motion.p>
                </div>
              </div>

              {/* Inner border frame highlight */}
              <div className="absolute inset-0 border border-[#F5F5F0]/10 group-hover:border-[#c9a86a]/60 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

