'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const steps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery & Consultation',
    subtitle: 'Understanding Spatial Intent',
    description: 'We align on your vision, functional requirements, and stylistic aspirations. This phase establishes the core direction, budgets, and milestones.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'Concept & Spatial Planning',
    subtitle: 'Drafting the Architectural Flow',
    description: 'We draft initial layout alternatives, spatial flows, and furniture arrangement schemes. We establish volume hierarchy and functional zoning.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    title: '3D Visualization & Renders',
    subtitle: 'Photorealistic Digital Realities',
    description: 'We render highly detailed 3D perspectives to preview the material pairing, light interactions, furniture composition, and general mood.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'Material & Object Selection',
    subtitle: 'Tactile Curation',
    description: 'We source marble slabs, wooden finishes, custom metals, and fabric textures. We physically coordinate mood boards to evaluate real tactile harmony.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    title: 'Execution & Supervision',
    subtitle: 'Precise Craftsmanship Management',
    description: 'Our technical team drafts working blueprints, coordinates details with builders, and supervises quality standards directly on-site.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    title: 'Final Styling & Handover',
    subtitle: 'Bringing the Space to Life',
    description: 'We procure and place bespoke art pieces, coordinate final furniture placements, adjust lighting angles, and hand over your move-in ready sanctuary.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  },
];

export default function DesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="process"
      className=" text-[var(--fg)] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
     style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-4 block">
            The Path
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight mb-6">
            Design Process
          </h2>
          <p className="text-xs md:text-sm font-light text-[var(--fg)]/50 tracking-wider max-w-lg leading-relaxed">
            Our sequential, structural methodology designed to carry concepts from vision to immaculate realization.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* The Central Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#c9a86a]/20 md:-translate-x-1/2" />
          
          {/* The Central Animated Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-[#c9a86a] md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col space-y-24 md:space-y-36 pb-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.num} className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full`}>
                  
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#c9a86a] bg-[var(--bg)] md:-translate-x-1/2 z-10"
                  />

                  {/* Left Side (Text for Even, Image for Odd) */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 flex ${isEven ? 'md:justify-end' : 'md:justify-start'} ${!isEven ? 'md:order-2' : ''}`}>
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start md:items-end text-left md:text-right max-w-md md:pr-12"
                      >
                        <div className="mb-4 inline-block px-3 py-1 border border-[var(--gold-border)] rounded-full text-[9px] tracking-[0.2em] uppercase font-light text-[var(--gold)]">
                          Phase {step.num}
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[var(--fg)] mb-2">
                          {step.title}
                        </h3>
                        <span className="text-xs font-light text-[var(--gold)]/80 mb-6 uppercase tracking-widest block">
                          {step.subtitle}
                        </span>
                        <p className="text-sm font-light leading-relaxed text-[var(--fg)]/70 tracking-wide">
                          {step.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 0.8 }}
                        className="w-full relative aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-[var(--gold-border)] ml-8 md:ml-12"
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-1000 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side (Image for Even, Text for Odd) */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 flex ${isEven ? 'md:justify-start' : 'md:justify-end'} ${!isEven ? 'md:order-1' : ''}`}>
                    {isEven ? (
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 0.8 }}
                        className="w-full relative aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-[var(--gold-border)] ml-8 md:ml-12"
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-1000 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start md:items-end text-left md:text-right max-w-md md:pr-12"
                      >
                        <div className="mb-4 inline-block px-3 py-1 border border-[var(--gold-border)] rounded-full text-[9px] tracking-[0.2em] uppercase font-light text-[var(--gold)]">
                          Phase {step.num}
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-[var(--fg)] mb-2">
                          {step.title}
                        </h3>
                        <span className="text-xs font-light text-[var(--gold)]/80 mb-6 uppercase tracking-widest block">
                          {step.subtitle}
                        </span>
                        <p className="text-sm font-light leading-relaxed text-[var(--fg)]/70 tracking-wide">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
