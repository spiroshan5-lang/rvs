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
          if (data?.hero?.images) {
            setImages(data.hero.images);
          }
          if (data?.hero?.interval) {
            setIntervalTime(data.hero.interval);
          }
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
      className="relative w-full h-screen bg-[#0B0B0B] flex items-center justify-center p-4 md:p-6 lg:p-8"
      id="home"
    >
      <div className="relative w-full h-full max-w-[1920px] mx-auto rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden border border-[#c9a86a]/15 shadow-2xl">
        
        <div className="absolute inset-0 w-full h-full z-0 bg-[#0B0B0B]">
          <AnimatePresence mode="popLayout">
            {images.length > 0 ? (
              <motion.img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={images[currentIndex].alt || 'Hero Image'}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/50 to-[#0B0B0B]/60 z-10 pointer-events-none" />

        <div className="absolute inset-0 z-20 w-full h-full flex flex-col justify-between">
          
          <div className="flex justify-between items-center w-full px-6 md:px-12 pt-6 md:pt-12">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden border border-[#c9a86a]/30 shadow-lg flex-shrink-0 bg-[#0B0B0B]">
                <Image src="/new-logo.jpeg" alt="RVS Crafted Interiors Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm md:text-2xl text-[#F5F5F0] tracking-wider leading-none">RVS Crafted Interiors</span>
                <span className="font-sans text-[7px] md:text-[10px] text-[#c9a86a] tracking-[0.25em] uppercase mt-1">Spatial Architecture Studio</span>
              </div>
            </div>

            <Link 
              href="/contact" 
              className="flex items-center space-x-2 md:space-x-4 bg-[#3d2410]/70 hover:bg-[#c9a86a] hover:text-[#0B0B0B] backdrop-blur-md border border-[#c9a86a]/40 rounded-full px-4 py-2 md:px-6 md:py-3 transition-all duration-300 group cursor-pointer text-[#F5F5F0]"
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
              <span className="text-[10px] md:text-sm tracking-wider md:tracking-wide font-sans font-semibold uppercase md:normal-case">Book Now</span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-4xl px-6 md:px-12 pt-8 md:pt-0 pointer-events-none">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] leading-[1.05] tracking-tight text-[#F5F5F0] mb-6 drop-shadow-2xl">
              Future of <br />
              Modern Living
            </h1>
            
            <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c9a86a] to-transparent mb-6 opacity-80" />
            
            <div className="flex flex-col space-y-2">
              <p className="font-sans text-sm md:text-xl text-[#F5F5F0] tracking-wider font-semibold drop-shadow-md">
                Design.Build.Inspire!
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            
            <div className="px-6 md:px-12 pb-6 md:pb-12 pointer-events-auto">
              <div className="flex items-center space-x-3 md:space-x-4 bg-[#1f1005]/75 backdrop-blur-md border border-[#c9a86a]/30 rounded-[1.5rem] p-2.5 md:p-3">
                <a 
                  href="https://wa.me/919591685465" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a86a]/30 hover:bg-[#c9a86a]/15 flex items-center justify-center transition-all group"
                  title="Chat on WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform md:w-[22px] md:h-[22px]">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </a>
                <a 
                  href="tel:+919591685465" 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a86a]/30 hover:bg-[#c9a86a]/15 flex items-center justify-center transition-all group"
                  title="Call Us"
                >
                  <Phone className="w-4 h-4 text-[#c9a86a] group-hover:scale-110 transition-transform md:w-5 md:h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <Link 
              href="/gallery" 
              className="flex items-center space-x-3 md:space-x-6 px-5 py-4 md:px-10 md:py-8 bg-[#1f1005]/80 backdrop-blur-md border border-[#c9a86a]/35 border-r-0 border-b-0 rounded-tl-[2.5rem] md:rounded-tl-[3.5rem] group cursor-pointer hover:bg-[#3d2410]/95 transition-all text-[#F5F5F0] pointer-events-auto"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#c9a86a]/40 flex items-center justify-center group-hover:bg-[#c9a86a]/20 transition-colors">
                <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-[#F5F5F0]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs md:text-[1.1rem] tracking-wide mb-0.5 md:mb-1 font-semibold">View our works</span>
                <span className="font-sans text-[7px] md:text-[10px] text-[#c9a86a] tracking-[0.2em] uppercase">150+ customers</span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
