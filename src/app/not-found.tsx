'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--gold)] selection:text-black">
      <Navbar />
      
      <main className="flex-grow relative flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
            alt="Empty luxury room"
            fill
            className="object-cover object-center opacity-30 grayscale mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="font-serif text-[10rem] md:text-[15rem] leading-none text-[var(--gold)]/20 font-light select-none tracking-tighter block">
              404
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
              This space is currently unfurnished.
            </h1>
            <p className="text-sm md:text-base font-light text-[var(--fg-muted)] tracking-wider max-w-lg mx-auto leading-relaxed mb-12">
              It seems we&apos;ve led you to an empty room. The page you are looking for has been moved, removed, or never existed in our blueprints. Let&apos;s get you back to a more curated space.
            </p>
            
            <Link 
              href="/"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--gold-border)] hover:border-[#c9a86a] bg-transparent text-[var(--gold)] hover:bg-[#c9a86a]/5 transition-all duration-300 rounded-full text-xs tracking-[0.2em] uppercase"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Return to Gallery
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
