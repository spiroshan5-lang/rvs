'use client';

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
        const res = await fetch('https://riko-backend-default-rtdb.firebaseio.com/cms.json');
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

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center p-0 md:p-6 lg:p-8 transition-colors duration-300"
      style={{ background: 'var(--bg)' }}
    >
      <div className="relative w-full h-full max-w-[1920px] mx-auto rounded-none md:rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border-0 md:border shadow-2xl" style={{ borderColor: 'var(--gold-border)' }}>

        {/* Background image / video */}
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

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'var(--hero-overlay)' }}
        />

        {/* Content layer */}
        <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between">

          {/* Top bar */}
          <div className="flex justify-between items-center w-full px-6 md:px-12 pt-28 md:pt-12">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg flex-shrink-0" style={{ border: '1px solid var(--gold-border)', background: '#0B0B0B' }}>
                <Image src="/new-logo.jpeg" alt="RVS Crafted Interiors Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm md:text-2xl tracking-wider leading-none" style={{ color: '#F5F5F0' }}>RVS Crafted Interiors</span>
                <span className="font-sans text-[7px] md:text-[10px] tracking-[0.25em] uppercase mt-1" style={{ color: 'var(--gold)' }}>Spatial Architecture Studio</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center space-x-2 md:space-x-4 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 transition-all duration-300 group cursor-pointer"
              style={{ background: 'rgba(61,36,16,0.7)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
              <span className="text-[10px] md:text-sm tracking-wider md:tracking-wide font-sans font-semibold uppercase md:normal-case">Book Now</span>
            </Link>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center max-w-4xl px-6 md:px-12 pt-8 md:pt-0 pointer-events-none">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] tracking-tight mb-6 drop-shadow-2xl" style={{ color: '#F5F5F0' }}>
              Future of <br />
              Modern Living
            </h1>
            <div className="w-24 md:w-32 h-[1px] mb-6 opacity-80" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
            <p className="font-sans text-sm md:text-xl tracking-wider font-semibold drop-shadow-md" style={{ color: '#F5F5F0' }}>
              Design.Build.Inspire!
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row md:justify-between items-end md:items-end w-full gap-4 md:gap-0">
            <div className="px-6 md:px-12 pb-8 md:pb-12 pointer-events-auto self-start md:self-auto">
              <div className="flex items-center space-x-3 md:space-x-4 backdrop-blur-md rounded-[1.5rem] p-2.5 md:p-3" style={{ background: 'rgba(31,16,5,0.75)', border: '1px solid var(--gold-border)' }}>
                <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
                  style={{ border: '1px solid var(--gold-border)' }} title="Chat on WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform md:w-[22px] md:h-[22px]">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </a>
                <a href="tel:+919591685465"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all group hover:bg-[#c9a86a]/15"
                  style={{ border: '1px solid var(--gold-border)' }} title="Call Us">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform md:w-5 md:h-5" style={{ color: 'var(--gold)' }} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <Link
              href="/gallery"
              className="flex items-center space-x-3 md:space-x-6 px-5 py-4 md:px-10 md:py-8 backdrop-blur-md border-r-0 border-b-0 rounded-tl-[2.5rem] md:rounded-tl-[3.5rem] group cursor-pointer transition-all pointer-events-auto"
              style={{ background: 'rgba(31,16,5,0.8)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#c9a86a]/20" style={{ border: '1px solid var(--gold-border)' }}>
                <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} style={{ color: '#F5F5F0' }} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs md:text-[1.1rem] tracking-wide mb-0.5 md:mb-1 font-semibold">View our works</span>
                <span className="font-sans text-[7px] md:text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--gold)' }}>150+ customers</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
