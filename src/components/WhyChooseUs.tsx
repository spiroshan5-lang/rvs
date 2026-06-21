'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Palette, Award } from 'lucide-react';

interface ChoiceReason {
  num: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const reasons: ChoiceReason[] = [
  {
    num: '01',
    title: 'Uncompromising Precision',
    description: 'We translate architectural designs into flawless structural realities. From precise load distributions to micro-millimeter alignment of stone joints, we tolerate zero errors.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Atmospheric Architecture',
    description: 'We evaluate spaces beyond layouts. By mapping natural light cycles, structuring advanced acoustics, and pairing rich material weights, we compose environments that trigger emotion.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Bespoke Global Curation',
    description: 'Through our network of European stone quarries, custom millworkers, and premium textile mills, we source rare fixtures, materials, and art commissions not available on the open market.',
    icon: Palette,
  },
  {
    num: '04',
    title: 'Client-Centric Process',
    description: 'We orchestrate full turnkey processes with professional timeline audits, regular budget reports, and direct oversight, safeguarding your financial and aesthetic investment.',
    icon: Award,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: Header and Stats */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Atelier Value
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide leading-tight mb-6">
              Why Choose Us?
            </h2>
            <p className="text-sm font-light text-[#F5F5F0]/70 tracking-wider leading-relaxed">
              Four structural pillars that define our commitment to premium spatial architecture, client trust, and luxury craftsmanship.
            </p>
          </div>

          {/* Numbers Don't Lie Stats Section */}
          <div className="pt-8 border-t border-[#c9a86a]/15">
            <h3 className="font-serif text-2xl font-light italic text-[#c9a86a] mb-8">
              Numbers Don't Lie
            </h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              <div>
                <h4 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] font-light">98%</h4>
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/50 mt-1">Client Satisfaction</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] font-light">180+</h4>
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/50 mt-1">Sanctuaries Built</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl md:text-4xl text-[#F5F5F0] font-light">12+</h4>
                <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/50 mt-1">Years of Craft</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Reasons Grid */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 p-6 border border-[#c9a86a]/15 rounded-[1.5rem] bg-[#111111]/30 backdrop-blur-sm hover:bg-[#3d2410]/30 transition-colors duration-500 relative group overflow-hidden"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-full border border-[#c9a86a]/30 flex items-center justify-center flex-shrink-0 bg-[#0B0B0B] group-hover:bg-[#c9a86a]/10 transition-colors duration-500">
                  <Icon className="w-5 h-5 text-[#c9a86a]" />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#F5F5F0] group-hover:text-[#c9a86a] transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <span className="font-serif text-xs text-[#c9a86a]/50 font-light select-none group-hover:text-[#c9a86a] transition-colors duration-300">
                      {reason.num}
                    </span>
                  </div>
                  <p className="text-xs font-light text-[#F5F5F0]/70 leading-relaxed tracking-wide">
                    {reason.description}
                  </p>
                </div>

                {/* Accent border highlight */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c9a86a] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
