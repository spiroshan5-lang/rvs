'use client';
import { GalleryCard } from '@/data/gallery';

import { motion } from 'framer-motion';
import SocialCards from '@/components/ui/card-fan-carousel';

/* 🎨🎨 Inline SVG Icons 🎨🎨 */
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

interface GalleryClientProps {
  initialCards: GalleryCard[];
}

export default function GalleryClient({ initialCards }: GalleryClientProps) {
  return (
    <>
      {/* 🚀🚀 SOCIAL CTA BANNER 🚀🚀 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-4 sm:px-6 md:px-12 mb-8 md:mb-10"
      >
        <div
          className="max-w-7xl mx-auto rounded-[1.5rem] sm:rounded-[2rem] border px-6 sm:px-10 md:px-16 py-10 sm:py-12 text-center relative overflow-hidden"
          style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-alt)' }}
        >
          {/* Subtle glow */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'rgba(201,168,106,0.04)' }}
          />

          <div className="relative z-10">
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light text-[var(--gold)] mb-4 sm:mb-5 block">
              Stay Inspired
            </span>

            <h2
              className="font-serif font-light tracking-wide mb-3 sm:mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', color: 'var(--fg)' }}
            >
              Follow Our Journey of<br />
              <span className="italic font-normal text-[var(--gold)]">Crafting Exceptional Spaces</span>
            </h2>

            <p
              className="font-light tracking-wider max-w-sm mx-auto mb-7 sm:mb-8 leading-relaxed"
              style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: 'var(--fg-muted)' }}
            >
              Be the first to see our latest projects, design tips, and behind-the-scenes moments from the studio.
            </p>

            {/* Buttons 📱 stack on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-300 hover:opacity-80 w-full sm:w-auto"
                style={{ borderColor: 'var(--gold-border)', color: 'var(--fg)', background: 'transparent' }}
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[var(--gold)]" />
                Instagram
              </a>

              <a
                href="https://www.facebook.com/share/1JbpJqQkmm/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-300 hover:opacity-80 w-full sm:w-auto"
                style={{ borderColor: 'var(--gold-border)', color: 'var(--fg)', background: 'transparent' }}
              >
                <FacebookIcon className="w-3.5 h-3.5 text-[var(--gold)]" />
                Facebook
              </a>

              <a
                href="https://wa.me/919591685465"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90 w-full sm:w-auto"
                style={{ background: 'var(--gold)', color: '#0B0B0B' }}
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🚀🚀 GALLERY SECTION 🚀🚀 */}
      <div className="flex-grow flex flex-col justify-center items-center">
        {/* Section header */}
        <div className="w-full px-6 md:px-12 text-center mb-5 md:mb-8" style={{ maxWidth: '90rem' }}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-3 block">
            Portfolio
          </span>
          <h1
            className="font-serif font-light tracking-wide leading-tight mb-3"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.75rem)' }}
          >
            Spatial Anthology
          </h1>
          <p
            className="font-light tracking-wider mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(11px, 2.8vw, 14px)', color: 'var(--fg-muted)', maxWidth: 420 }}
          >
            A dynamic, tactile showcase of physical details, lighting composition, and rich material pairing.
          </p>
        </div>

        {/* Gallery slider */}
        <div className="w-full flex justify-center" style={{ minHeight: '40vh' }}>
          {initialCards && initialCards.length > 0 ? (
            <SocialCards cards={initialCards} />
          ) : (
            <div className="flex items-center justify-center" style={{ minHeight: '40vh' }}>
              <span className="text-[var(--gold)] opacity-50 font-sans tracking-widest text-xs uppercase">No Gallery Items Available</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

