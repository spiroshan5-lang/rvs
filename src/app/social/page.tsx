'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── Inline SVG Icons ── */
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

const platforms = [
  {
    name: 'Instagram',
    handle: '@rvs_crafted_interiors',
    description: 'Daily inspiration, behind-the-scenes of our design process, and completed project reveals.',
    href: 'https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5',
    Icon: InstagramIcon,
    gradient: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
  },
  {
    name: 'Facebook',
    handle: 'RVS Craft Interiors',
    description: 'Community updates, client testimonials, and exclusive interior design tips from our studio.',
    href: 'https://www.facebook.com/share/1JbpJqQkmm/',
    Icon: FacebookIcon,
    gradient: 'from-[#1877F2] to-[#0C5DC7]',
  },
  {
    name: 'WhatsApp',
    handle: '+91 9591685465',
    description: 'Quick consultations, project inquiries, and direct communication with our design team.',
    href: 'https://wa.me/919591685465',
    Icon: WhatsAppIcon,
    gradient: 'from-[#25D366] to-[#128C7E]',
  },
];

const feedImages = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900&auto=format&fit=crop', alt: 'Modern villa living room', tall: true, wide: false },
  { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop', alt: 'Luxury bedroom design', tall: false, wide: false },
  { src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop', alt: 'Modular kitchen', tall: false, wide: false },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop', alt: 'Executive office space', tall: false, wide: true },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop', alt: 'Premium furniture styling', tall: false, wide: false },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', alt: 'Architectural exterior', tall: false, wide: false },
  { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=900&auto=format&fit=crop', alt: 'Classic furniture showcase', tall: true, wide: false },
  { src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop', alt: 'Artisan woodwork detail', tall: false, wide: false },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop', alt: 'Boutique hotel lobby', tall: false, wide: false },
];

const stats = [
  { value: '12K+', label: 'Followers' },
  { value: '380+', label: 'Projects Shared' },
  { value: '4.9★', label: 'Avg. Rating' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

export default function SocialPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--gold)] selection:text-black" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-36 md:pt-40 pb-28 relative overflow-hidden">

        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(201,168,106,0.06) 0%, transparent 70%)' }} />

        {/* ══ HERO ══ */}
        <section className="relative z-10 px-5 sm:px-8 md:px-14 mb-16 md:mb-28">
          <div className="max-w-7xl mx-auto">

            <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-light text-[var(--gold)] mb-6">
              <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
              Connect &amp; Follow
            </motion.span>

            <motion.h1 {...fadeUp(0.1)} className="font-serif font-light leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}>
              Our Digital<br />
              <span className="italic font-normal text-[var(--gold)]">Atelier</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="max-w-lg text-sm md:text-base font-light tracking-wide leading-relaxed mb-10" style={{ color: 'var(--fg-muted)' }}>
              Curated moments from our design journey — architectural inspiration, behind-the-scenes craftsmanship, and the art of spatial storytelling.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-5 py-3 rounded-2xl border text-center" style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-alt)' }}>
                  <span className="font-serif text-xl md:text-2xl font-light text-[var(--gold)]">{s.value}</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase font-light mt-0.5" style={{ color: 'var(--fg-muted)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ PLATFORM CARDS ══ */}
        <section className="relative z-10 px-5 sm:px-8 md:px-14 mb-20 md:mb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {platforms.map(({ name, handle, description, href, Icon, gradient }, idx) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp(0.1 + idx * 0.12)}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-[1.75rem] border flex flex-col justify-between p-6 sm:p-7 md:p-8"
                style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-alt)', minHeight: '280px' }}
              >
                <div className={`absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${gradient}`} />

                <div className="relative z-10 flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 text-[var(--gold)]" style={{ background: 'var(--gold-muted)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[var(--gold)] opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-end">
                  <p className="text-[11px] font-light tracking-wider leading-relaxed mb-5" style={{ color: 'var(--fg-muted)' }}>
                    {description}
                  </p>
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--gold-border)' }}>
                    <h3 className="font-serif text-xl md:text-2xl font-light mb-1 group-hover:text-[var(--gold)] transition-colors duration-400" style={{ color: 'var(--fg)' }}>{name}</h3>
                    <span className="text-[9px] tracking-[0.18em] uppercase font-light" style={{ color: 'var(--fg-muted)' }}>{handle}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: 'var(--gold)' }} />
              </motion.a>
            ))}
          </div>
        </section>

        {/* ══ FEED GRID ══ */}
        <section className="relative z-10 px-5 sm:px-8 md:px-14 mb-20 md:mb-32">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12 gap-4">
              <div>
                <motion.span {...fadeUpView(0)} className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-2 block">Visual Journal</motion.span>
                <motion.h2 {...fadeUpView(0.08)} className="font-serif text-3xl sm:text-4xl font-light tracking-wide">The Feed</motion.h2>
              </div>
              <motion.a
                {...fadeUpView(0.12)}
                href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-light text-[var(--gold)] hover:opacity-70 transition-opacity"
              >
                View on Instagram <ArrowUpRight className="w-3 h-3" />
              </motion.a>
            </div>

            {/* Mobile: 2-col uniform grid */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {feedImages.map((img, idx) => (
                <motion.div key={idx} {...fadeUpView(idx * 0.05)} className="relative overflow-hidden rounded-xl group cursor-pointer" style={{ aspectRatio: '1/1' }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-all duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-3">
                    <span className="text-[8px] tracking-[0.15em] uppercase text-white/80 font-light text-center px-2">{img.alt}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: CSS grid masonry-style */}
            <div
              className="hidden sm:grid gap-3 md:gap-4"
              style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px' }}
            >
              {feedImages.map((img, idx) => {
                const spanClass = [
                  img.tall ? 'row-span-2' : '',
                  img.wide ? 'col-span-2' : '',
                ].filter(Boolean).join(' ');
                return (
                  <motion.div
                    key={idx}
                    {...fadeUpView((idx % 4) * 0.07)}
                    className={`relative overflow-hidden rounded-2xl group cursor-pointer ${spanClass}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
                      sizes="(max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-5">
                      <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80 backdrop-blur-sm mb-2">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] tracking-[0.15em] uppercase text-white/70 font-light">{img.alt}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section className="relative z-10 px-5 sm:px-8 md:px-14">
          <div className="max-w-7xl mx-auto">
            <motion.div
              {...fadeUpView(0)}
              className="relative overflow-hidden rounded-[2rem] border text-center px-6 py-14 md:py-20"
              style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-alt)' }}
            >
              <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,168,106,0.04)' }} />

              <div className="relative z-10">
                <span className="text-[10px] tracking-[0.35em] uppercase font-light text-[var(--gold)] mb-5 block">Stay Inspired</span>
                <h2 className="font-serif font-light tracking-wide mb-4 leading-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
                  Follow Our Journey of<br />
                  <span className="italic font-normal text-[var(--gold)]">Crafting Exceptional Spaces</span>
                </h2>
                <p className="text-xs sm:text-sm font-light tracking-wider max-w-sm mx-auto mb-9 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  Be the first to see our latest projects, design tips, and behind-the-scenes moments from the studio.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80 w-full sm:w-auto justify-center"
                    style={{ borderColor: 'var(--gold-border)', color: 'var(--gold)', background: 'transparent' }}>
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </a>
                  <a href="https://www.facebook.com/share/1JbpJqQkmm/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-80 w-full sm:w-auto justify-center"
                    style={{ borderColor: 'var(--gold-border)', color: 'var(--gold)', background: 'transparent' }}>
                    <FacebookIcon className="w-4 h-4" /> Facebook
                  </a>
                  <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90 w-full sm:w-auto justify-center font-medium"
                    style={{ background: 'var(--gold)', color: '#0B0B0B' }}>
                    <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
