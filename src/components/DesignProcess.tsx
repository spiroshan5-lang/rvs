'use client';

import { motion } from 'framer-motion';

interface ProcessStep {
  num: string;
  title: string;
  subtitle: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    num: '01',
    title: 'Discovery & Consultation',
    subtitle: 'Understanding Spatial Intent',
    description: 'We align on your vision, functional requirements, and stylistic aspirations. This phase establishes the core direction, budgets, and milestones.',
  },
  {
    num: '02',
    title: 'Concept & Spatial Planning',
    subtitle: 'Drafting the Architectural Flow',
    description: 'We draft initial layout alternatives, spatial flows, and furniture arrangement schemes. We establish volume hierarchy and functional zoning.',
  },
  {
    num: '03',
    title: '3D Visualization & Renders',
    subtitle: 'Photorealistic Digital Realities',
    description: 'We render highly detailed 3D perspectives to preview the material pairing, light interactions, furniture composition, and general mood.',
  },
  {
    num: '04',
    title: 'Material & Object Selection',
    subtitle: 'Tactile Curation',
    description: 'We source marble slabs, wooden finishes, custom metals, and fabric textures. We physically coordinate mood boards to evaluate real tactile harmony.',
  },
  {
    num: '05',
    title: 'Execution & Supervision',
    subtitle: 'Precise Craftsmanship Management',
    description: 'Our technical team drafts working blueprints, coordinates details with builders, and supervises quality standards directly on-site.',
  },
  {
    num: '06',
    title: 'Final Styling & Handover',
    subtitle: 'Bringing the Space to Life',
    description: 'We procure and place bespoke art pieces, coordinate final furniture placements, adjust lighting angles, and hand over your move-in ready sanctuary.',
  },
];

export default function DesignProcess() {
  return (
    <section
      id="process"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 md:mb-28">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              The Path
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Design Process
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/50 tracking-wider max-w-xs mt-4 lg:mt-0 leading-relaxed">
            Our sequential, structural methodology designed to carry concepts from vision to immaculate realization.
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex flex-col border-t border-[#c9a86a]/20">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              className="group border-b border-[#c9a86a]/20 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative overflow-hidden origin-top"
              initial={{ scaleY: 0.9, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Unfolding panel hover effect background */}
              <div className="absolute inset-0 bg-[#1f1005]/30 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.25,1,0.5,1] -z-10" />

              {/* Number and subtitle */}
              <div className="lg:col-span-3 flex flex-col justify-start space-y-1">
                <span className="font-serif text-3xl md:text-4xl text-[#c9a86a] font-light select-none">
                  {step.num}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/45 mt-2">
                  Phase {step.num}
                </span>
              </div>

              {/* Main title and concept */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-[#F5F5F0] group-hover:text-[#c9a86a] transition-colors duration-300">
                  {step.title}
                </h3>
                <span className="text-xs font-light text-[#c9a86a]/60 mt-1 uppercase tracking-widest">
                  {step.subtitle}
                </span>
              </div>

              {/* Description */}
              <div className="lg:col-span-4 flex items-center">
                <p className="text-xs md:text-sm font-light leading-relaxed text-[#F5F5F0]/70 tracking-wide">
                  {step.description}
                </p>
              </div>

              {/* Decorative line reveal overlay */}
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-[#c9a86a]"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

