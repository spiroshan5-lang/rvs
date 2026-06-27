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
              href="https://wa.me/919591685465?text=Hi!%20I%27m%20interested%20in%20interior%20design%20services%20from%20RVS%20Craft%20Interiors.%20Could%20you%20share%20more%20details%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-lg"
              style={{ background: 'var(--gold)', color: '#0B0B0B', border: '1px solid var(--gold)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Book Now</span>
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
          <span className="mt-2 md:mt-0 hover:opacity-70 transition-opacity duration-300 cursor-pointer">Privacy Policy &amp; Terms</span>
        </div>
      </div>
    </footer>
  );
}

