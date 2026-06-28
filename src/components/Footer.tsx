'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  showCTA?: boolean;
}

export default function Footer({ showCTA = true }: FooterProps) {
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg)', color: 'var(--fg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'var(--section-divider)' }} />

      <div className="max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        {showCTA && (
          <div className="flex flex-col items-start max-w-4xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light mb-4 block" style={{ color: 'var(--gold)' }}>
              Begin the Journey
            </span>
            <motion.h2
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Let&apos;s Design a Space That <br />
              <span className="italic font-normal" style={{ color: 'var(--gold)' }}>Speaks Before You Do.</span>
            </motion.h2>

            <motion.a
              href="/contact"
              className="inline-flex items-center space-x-3 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'var(--gold)', color: '#0B0B0B', border: '1px solid var(--gold)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t" style={{ borderColor: 'var(--section-divider)' }}>
          <div className="flex flex-col space-y-4">
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-light">RVS Craft Interiors</span>
            <p className="text-xs font-light leading-relaxed tracking-wide" style={{ color: 'var(--fg-muted)' }}>
              An architectural interior design atelier producing premium private residences, high-end hospitality hubs, and executive spaces worldwide.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--gold)' }}>Contact Us</span>
            <div className="flex flex-col space-y-3">
              <a href="mailto:hello@rvscraftinteriors.com" className="flex items-center space-x-3 text-xs font-light transition-colors duration-300 hover:opacity-80" style={{ color: 'var(--fg)' }}>
                <Mail className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} />
                <span>hello@rvscraftinteriors.com</span>
              </a>
              <a href="tel:+919591685465" className="flex items-center space-x-3 text-xs font-light transition-colors duration-300 hover:opacity-80" style={{ color: 'var(--fg)' }}>
                <Phone className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} />
                <span>+91 9591685465</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--gold)' }}>Directory</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-light">
              {[{ name: 'Home', url: '/' }, { name: 'Gallery', url: '/gallery' }, { name: 'Services', url: '/services' }, { name: 'Contact', url: '/contact' }].map((item) => (
                <Link key={item.name} href={item.url} className="transition-colors duration-300 py-0.5 hover:opacity-70" style={{ color: 'var(--fg)' }}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--gold)' }}>Connect</span>
            <div className="flex flex-col space-y-2 text-xs font-light">
              {[{ label: 'WhatsApp', href: 'https://wa.me/919591685465' }, { label: 'Instagram', href: 'https://www.instagram.com/rvs_crafted_interiors?igsh=eHRwcWtzNms4dmw5' }, { label: 'Facebook', href: 'https://www.facebook.com/share/1JbpJqQkmm/' }].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 py-0.5 flex items-center justify-between group hover:opacity-70" style={{ color: 'var(--fg)' }}>
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--gold)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between pt-8 border-t text-[10px] tracking-widest uppercase font-light text-center md:text-left" style={{ borderColor: 'var(--section-divider)', color: 'var(--fg-muted)' }}>
          <span className="mb-4 md:mb-0">RVS Craft Interiors &copy; 2026. All rights reserved.</span>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-[var(--gold)] transition-colors duration-300">Privacy Policy</Link>
            <span className="hidden sm:inline opacity-30">|</span>
            <Link href="/terms" className="hover:text-[var(--gold)] transition-colors duration-300">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

