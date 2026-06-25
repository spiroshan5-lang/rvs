'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

const feedImages = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop', alt: 'Modern villa living room', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop', alt: 'Luxury bedroom design', span: '' },
  { src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop', alt: 'Modular kitchen', span: '' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', alt: 'Executive office space', span: '' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop', alt: 'Premium furniture styling', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', alt: 'Architectural exterior', span: '' },
  { src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop', alt: 'Artisan woodwork detail', span: '' },
  { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop', alt: 'Classic furniture showcase', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop', alt: 'Boutique hotel lobby', span: '' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop', alt: 'Dining room interiors', span: '' },
];

const platforms = [
  {
    name: 'Instagram',
    handle: '@rvs_crafted_interiors',
    description: 'Daily inspiration, behind-the-scenes of our design process, and completed project reveals.',
    href: 'https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5',
    icon: InstagramIcon,
    gradient: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
  },
  {
    name: 'Facebook',
    handle: 'RVS Craft Interiors',
    description: 'Community updates, client testimonials, and exclusive interior design tips from our studio.',
    href: 'https://www.facebook.com/share/1JbpJqQkmm/',
    icon: FacebookIcon,
    gradient: 'from-[#1877F2] to-[#0C5DC7]',
  },
  {
    name: 'WhatsApp',
    handle: '+91 9591685465',
    description: 'Quick consultations, project inquiries, and direct communication with our design team.',
    href: 'https://wa.me/919591685465',
    icon: WhatsAppIcon,
    gradient: 'from-[#25D366] to-[#128C7E]',
  },
];

export default function SocialPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--gold)] selection:text-black" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      
      <main className="flex-grow pt-28 md:pt-44 pb-24 relative overflow-hidden">

        {/* ── Hero Section ── */}
        <section className="px-6 md:px-12 mb-20 md:mb-32">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-5 block"
              >
                Connect & Follow
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] mb-6"
              >
                Our Digital<br />
                <span className="italic font-normal text-[var(--gold)]">Atelier</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-base font-light text-[var(--fg-muted)] tracking-wider leading-relaxed max-w-lg"
              >
                Curated moments from our design journey. Follow along for architectural inspiration, behind-the-scenes craftsmanship, and the art of spatial storytelling.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="w-[1px] h-12 bg-[var(--gold)]/30 hidden lg:block" />
              <p className="text-[10px] tracking-[0.2em] uppercase font-light text-[var(--fg-muted)] max-w-[200px] leading-relaxed">
                Where luxury design meets digital storytelling
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Platform Cards ── */}
        <section className="px-6 md:px-12 mb-24 md:mb-36">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {platforms.map((platform, idx) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--gold-border)] bg-[var(--bg-alt)] p-7 md:p-8 hover:border-[#c9a86a] transition-all duration-500 flex flex-col justify-between min-h-[280px] md:min-h-[320px]"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-11 h-11 rounded-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-500">
                      <platform.icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[var(--gold)] opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                  </div>
                  
                  <p className="text-[11px] font-light text-[var(--fg-muted)] tracking-wider leading-relaxed mb-6">
                    {platform.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-[var(--gold-border)]/50">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[var(--fg)] group-hover:text-[var(--gold)] transition-colors duration-500 mb-1">
                    {platform.name}
                  </h3>
                  <span className="text-[10px] tracking-[0.15em] uppercase font-light text-[var(--fg-muted)]">
                    {platform.handle}
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700" style={{ background: 'var(--gold)' }} />
              </motion.a>
            ))}
          </div>
        </section>

        {/* ── Masonry Image Feed ── */}
        <section className="px-6 md:px-12 mb-24 md:mb-36">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-3 block">
                  Visual Journal
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                  The Feed
                </h2>
              </div>
              <a 
                href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-light text-[var(--gold)] hover:text-[#c9a86a] transition-colors duration-300"
              >
                View on Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Desktop: CSS Grid Masonry | Mobile: 2-col grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
              {feedImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                  className={`relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer ${img.span ? img.span.split(' ').map(s => 'md:' + s).join(' ') : ''}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 brightness-[0.85] group-hover:brightness-100"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-5 md:pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/90 backdrop-blur-sm">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-white/70 font-light">
                      {img.alt}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--gold-border)] bg-[var(--bg-alt)] p-10 md:p-16 text-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[var(--gold)]/[0.03] blur-[80px]" />
              
              <div className="relative z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-6 block">
                  Stay Inspired
                </span>
                <h2 className="font-serif text-2xl md:text-4xl font-light tracking-wide mb-4 leading-tight">
                  Follow Our Journey of<br />
                  <span className="italic font-normal text-[var(--gold)]">Crafting Exceptional Spaces</span>
                </h2>
                <p className="text-xs md:text-sm font-light text-[var(--fg-muted)] tracking-wider max-w-md mx-auto mb-8 leading-relaxed">
                  Be the first to see our latest projects, design tips, and behind-the-scenes moments from the studio.
                </p>
                <a
                  href="https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--gold-border)] hover:border-[#c9a86a] bg-transparent text-[var(--gold)] hover:bg-[#c9a86a]/5 transition-all duration-300 rounded-full text-xs tracking-[0.2em] uppercase"
                >
                  <InstagramIcon className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
