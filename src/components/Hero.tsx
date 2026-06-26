'use client';
import { getDatabaseUrl } from '@/lib/firebase';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [images, setImages] = useState<any[]>([]);
  const [intervalTime, setIntervalTime] = useState(4.5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchCms() {
      try {
        const res = await fetch(getDatabaseUrl('/cms.json'));
        if (res.ok) {
          const data = await res.json();
          if (data?.hero?.images) setImages(data.hero.images);
          if (data?.hero?.interval) setIntervalTime(data.hero.interval);
        }
      } catch (err) {
        console.error('Failed to fetch hero CMS data', err);
      }
    }
    fetchCms();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime * 1000);
    return () => clearInterval(timer);
  }, [images, intervalTime]);

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     Shared: Background image / video layer
     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     Shared: Gradient overlay
     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      <div className="relative w-full h-full max-w-[1920px] mx-auto rounded-none md:rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border-0 md:border shadow-2xl" style={{ borderColor: 'var(--gold-border)' }}>

        {backgroundLayer}
        {gradientOverlay}

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           DESKTOP CONTENT LAYER (hidden on mobile)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="absolute inset-0 z-20 w-full h-full hidden md:flex flex-col justify-between">

          {/* Top bar */}
          <div className="flex justify-between items-center w-full px-12 pt-12">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg flex-shrink-0" style={{ border: '1px solid var(--gold-border)', background: '#0B0B0B' }}>
                <Image src="/new-logo.jpeg" alt="RVS Crafted Interiors Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wider leading-none" style={{ color: '#F5F5F0' }}>RVS Crafted Interiors</span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase mt-1" style={{ color: 'var(--gold)' }}>Spatial Architecture Studio</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center space-x-4 backdrop-blur-md rounded-full px-6 py-3 transition-all duration-300 group cursor-pointer"
              style={{ background: 'rgba(61,36,16,0.7)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
            >
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
              <span className="text-sm tracking-wide font-sans font-semibold">Book Now</span>
            </Link>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl px-12 pointer-events-none">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] tracking-tight mb-6 drop-shadow-2xl" style={{ color: '#F5F5F0' }}>
              Future of <br />
              Modern Living
            </h1>
            <div className="w-32 h-[1px] mb-6 opacity-80" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
            <p className="font-sans text-xl tracking-wider font-semibold drop-shadow-md" style={{ color: '#F5F5F0' }}>
              Design.Build.Inspire!
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-row justify-between items-end w-full">
            <div className="px-12 pb-12 pointer-events-auto">
              <div className="flex items-center space-x-4 backdrop-blur-md rounded-[1.5rem] p-3" style={{ background: 'rgba(31,16,5,0.75)', border: '1px solid var(--gold-border)' }}>
                <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
                  style={{ border: '1px solid var(--gold-border)' }} title="Chat on WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </a>
                <a href="tel:+919591685465"
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
                  style={{ border: '1px solid var(--gold-border)' }} title="Call Us">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <Link
              href="/gallery"
              className="flex items-center space-x-6 px-10 py-8 backdrop-blur-md border-r-0 border-b-0 rounded-tl-[3.5rem] group cursor-pointer transition-all pointer-events-auto"
              style={{ background: 'rgba(31,16,5,0.8)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#c9a86a]/20" style={{ border: '1px solid var(--gold-border)' }}>
                <ArrowUpRight className="w-6 h-6" strokeWidth={1.5} style={{ color: '#F5F5F0' }} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[1.1rem] tracking-wide mb-1 font-semibold">View our works</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>150+ customers</span>
              </div>
            </Link>
          </div>
        </div>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           MOBILE CONTENT LAYER (hidden on desktop)
           â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div className="absolute inset-0 z-20 w-full h-full flex md:hidden flex-col justify-between px-5 pb-6">

          {/* Top spacer to clear fixed mobile header (80px = h-20) */}
          <div className="pt-24 flex-shrink-0" />

          {/* Hero heading area */}
          <div className="flex-1 flex flex-col justify-center pointer-events-none max-w-[90vw]">
            <h1
              className="font-serif leading-[1.08] tracking-tight mb-4 drop-shadow-2xl"
              style={{
                color: '#F5F5F0',
                fontSize: 'clamp(2rem, 10vw, 3.5rem)',
              }}
            >
              Future of<br />
              Modern Living
            </h1>
            <div className="w-16 h-[1px] mb-4 opacity-80" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
            <p className="font-sans text-sm tracking-wider font-semibold drop-shadow-md" style={{ color: '#F5F5F0' }}>
              Design.Build.Inspire!
            </p>

            {/* Mobile Book Now CTA - in flow below subheading */}
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

          {/* Bottom actions area - stacked cleanly */}
          <div className="flex items-end justify-between w-full gap-3 pointer-events-auto flex-shrink-0">
            {/* Floating contact buttons */}
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

            {/* View our works card */}
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
      </div>
    </section>
  );
}


