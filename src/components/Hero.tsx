'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES, HERO_INTERVAL } from '@/data/hero';

export default function Hero() {
  const images = HERO_SLIDES;
  const intervalTime = HERO_INTERVAL;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime * 1000);
    return () => clearInterval(timer);
  }, [images, intervalTime]);

  /* ─────────────────────────────────────────────────────────
     Shared: Background image / video layer
     ───────────────────────────────────────────────────────── */
  const backgroundLayer = (
    <div className="absolute inset-0 w-full h-full z-0" style={{ background: 'var(--bg)' }}>
      <AnimatePresence mode="popLayout">
        {images.length > 0 ? (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.alt || 'Hero Image'}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        )}
      </AnimatePresence>
    </div>
  );

  /* ─────────────────────────────────────────────────────────
     Shared: Gradient overlay
     ───────────────────────────────────────────────────────── */
  const gradientOverlay = (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ background: 'var(--hero-overlay)' }}
    />
  );

  return (
    <section
      id="home"
      className="relative w-full h-[100svh] md:h-screen flex items-center justify-center p-0 md:p-6 lg:p-8 transition-colors duration-300"
      style={{ background: 'var(--bg)' }}
    >
      {backgroundLayer}
      {gradientOverlay}

      {/* ─────────────────────────────────────────────────────
          DESKTOP CONTENT LAYER (hidden on mobile)
          ───────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative z-20 w-full h-full items-end justify-between px-12 pb-16">
        {/* Bottom-left: headline */}
        <div className="max-w-2xl">
          <h1
            className="font-serif leading-[1.08] tracking-tight mb-6 drop-shadow-2xl"
            style={{ color: '#F5F5F0', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Future of<br />
            Modern Living
          </h1>
          <div className="w-24 h-[1px] mb-6 opacity-80" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
          <p className="font-sans text-sm tracking-wider font-semibold drop-shadow-md" style={{ color: '#F5F5F0' }}>
            Design.Build.Inspire!
          </p>
        </div>

        {/* Bottom-right: CTAs */}
        <div className="flex flex-col items-end gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 backdrop-blur-md rounded-full px-8 py-4 transition-all duration-300 group cursor-pointer"
            style={{ background: 'rgba(61,36,16,0.8)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
          >
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
            <span className="text-xs tracking-wider font-sans font-semibold uppercase">Book a Consultation</span>
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center space-x-3 backdrop-blur-md rounded-full px-8 py-4 transition-all duration-300 group cursor-pointer"
            style={{ background: 'rgba(31,16,5,0.6)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
          >
            <span className="text-xs tracking-wider font-sans font-semibold uppercase">View Portfolio</span>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>150+ projects</span>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          MOBILE CONTENT LAYER (hidden on desktop)
          ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 w-full h-full flex md:hidden flex-col justify-between px-5 pb-6">
        <div className="pt-24 flex-shrink-0" />

        <div className="flex-1 flex flex-col justify-center pointer-events-none max-w-[90vw]">
          <h1
            className="font-serif leading-[1.08] tracking-tight mb-4 drop-shadow-2xl"
            style={{ color: '#F5F5F0', fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
          >
            Future of<br />
            Modern Living
          </h1>
          <div className="w-16 h-[1px] mb-4 opacity-80" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
          <p className="font-sans text-sm tracking-wider font-semibold drop-shadow-md" style={{ color: '#F5F5F0' }}>
            Design.Build.Inspire!
          </p>

          <div className="pointer-events-auto mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 backdrop-blur-md rounded-full px-6 py-3.5 transition-all duration-300 group cursor-pointer"
              style={{ background: 'rgba(61,36,16,0.8)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
            >
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
              <span className="text-xs tracking-wider font-sans font-semibold uppercase">Book Now</span>
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between w-full gap-3 pointer-events-auto flex-shrink-0">
          <div className="flex items-center space-x-2.5 backdrop-blur-md rounded-[1.25rem] p-2" style={{ background: 'rgba(31,16,5,0.8)', border: '1px solid var(--gold-border)' }}>
            <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
              style={{ border: '1px solid var(--gold-border)' }} title="Chat on WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            </a>
            <a href="tel:+919591685465"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
              style={{ border: '1px solid var(--gold-border)' }} title="Call Us">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
            </a>
          </div>

          <Link
            href="/gallery"
            className="flex items-center space-x-3 px-4 py-3.5 backdrop-blur-md rounded-2xl group cursor-pointer transition-all"
            style={{ background: 'rgba(31,16,5,0.85)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#c9a86a]/20" style={{ border: '1px solid var(--gold-border)' }}>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} style={{ color: '#F5F5F0' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs tracking-wide font-semibold whitespace-nowrap">View our works</span>
              <span className="font-sans text-[7px] tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>150+ customers</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Slide dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === currentIndex ? '24px' : '6px',
                height: '6px',
                background: i === currentIndex ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

