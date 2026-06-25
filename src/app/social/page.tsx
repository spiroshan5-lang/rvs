'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const socialImages = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop',
];

export default function SocialPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--gold)] selection:text-black">
      <Navbar />
      
      <main className="flex-grow pt-32 md:pt-48 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-6 block"
            >
              Our Digital Atelier
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight mb-8"
            >
              Visual Diary & <br />
              <span className="italic font-normal text-[var(--gold)]">Social Presence</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base font-light text-[var(--fg-muted)] tracking-wider leading-relaxed"
            >
              Curated moments, architectural insights, and the visual diary of our design journey. Connect with us to explore the nuances of premium interior design.
            </motion.p>
          </div>

          {/* Social Links Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-24 md:mb-36"
          >
            <a 
              href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--gold-border)] bg-[var(--bg-alt)] p-8 md:p-12 hover:border-[#c9a86a] transition-all duration-500 flex flex-col justify-between min-h-[250px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-colors duration-500">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-[var(--gold)] opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--fg-muted)] mb-2 block">Follow Us</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--fg)] group-hover:text-[var(--gold)] transition-colors duration-500">
                  Instagram
                </h3>
              </div>
            </a>

            <a 
              href="https://www.facebook.com/share/1JbpJqQkmm/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--gold-border)] bg-[var(--bg-alt)] p-8 md:p-12 hover:border-[#c9a86a] transition-all duration-500 flex flex-col justify-between min-h-[250px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-colors duration-500">
                  <FacebookIcon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-[var(--gold)] opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--fg-muted)] mb-2 block">Connect With Us</span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--fg)] group-hover:text-[var(--gold)] transition-colors duration-500">
                  Facebook
                </h3>
              </div>
            </a>
          </motion.div>

          {/* Social Image Grid */}
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-12 block text-center">
              The Feed
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {socialImages.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl group ${idx === 0 || idx === 3 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
                  style={{ aspectRatio: idx === 0 || idx === 3 ? '1/1' : '1/1' }}
                >
                  <Image
                    src={src}
                    alt={`Social Feed Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
