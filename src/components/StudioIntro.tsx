'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StudioIntro() {
  return (
    <section 
      id="studio"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Small label column */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3"
          >
            <span className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a]">
              Our Philosophy
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-[#c9a86a]/20 shadow-2xl mt-2"
          >
            <Image 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop" 
              alt="Our Philosophy" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out" 
            />
          </motion.div>
        </div>

        {/* Text columns */}
        <div className="lg:col-span-9 flex flex-col space-y-12">
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide max-w-4xl"
          >
            Interiors With Rhythm, <br />
            <span className="italic font-normal text-[#c9a86a]">Warmth, and Precision</span>
          </motion.h2>

          {/* Large Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6"
          >
            <p className="text-base md:text-lg font-light leading-relaxed text-[#F5F5F0]/80 tracking-wide">
              At RVS Craft Interiors, we believe that space has a voice. Our architectural approach values the silence between forms, the weight of textures, and the dance of soft light. We do not design rooms; we craft atmospheric sanctuary spaces that tell stories.
            </p>
            <div className="flex flex-col justify-between space-y-6">
              <p className="text-sm md:text-base font-light leading-relaxed text-[#F5F5F0]/60 tracking-wide">
                By carefully balancing warm wooden panels, tactile stone surfaces, and refined metal accents, we create harmonized environments that balance structural precision with human warmth. Each line is intentional, each texture is selected to inspire stillness.
              </p>
              
              <div className="pt-6 border-t border-[#c9a86a]/20 flex items-center justify-start gap-12 md:gap-16">
                <div>
                  <h4 className="font-serif text-2xl font-light">12+</h4>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/50">Years Crafting Space</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-light">180+</h4>
                  <p className="text-[9px] tracking-[0.2em] uppercase font-light text-[#F5F5F0]/50">Trusted Clients</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

