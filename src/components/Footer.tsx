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
      className="bg-[#0B0B0B] text-[#F5F5F0] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Visual background structural line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#c9a86a]/15" />

      <div className="max-w-7xl mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Large CTA Section */}
        {showCTA && (
          <div className="flex flex-col items-start max-w-4xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Begin the Journey
            </span>
            <motion.h2 
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Let's Design a Space That <br />
              <span className="italic font-normal text-[#c9a86a]">Speaks Before You Do.</span>
            </motion.h2>

            <motion.a 
              href="/contact"
              className="inline-flex items-center space-x-3 bg-[#c9a86a] hover:bg-[#F5F5F0] text-[#0B0B0B] hover:text-[#0B0B0B] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 border border-[#c9a86a] hover:border-[#F5F5F0] shadow-lg shadow-[#c9a86a]/10"
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

        {/* Contact and Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-[#c9a86a]/15">
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <span className="font-serif text-xl tracking-[0.2em] uppercase font-light text-[#F5F5F0]">
              RVS Craft Interiors
            </span>
            <p className="text-xs text-[#F5F5F0]/90 font-light leading-relaxed tracking-wide">
              An architectural interior design atelier producing premium private residences, high-end hospitality hubs, and executive spaces worldwide.
            </p>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#c9a86a]">
              Contact Us
            </span>
            <div className="flex flex-col space-y-3">
              <a href="mailto:hello@rvscraftinteriors.com" className="flex items-center space-x-3 text-xs font-light text-[#F5F5F0] hover:text-[#c9a86a] transition-colors duration-300">
                <Mail className="w-3.5 h-3.5 text-[#c9a86a]" />
                <span>hello@rvscraftinteriors.com</span>
              </a>
              <a href="tel:+919591685465" className="flex items-center space-x-3 text-xs font-light text-[#F5F5F0] hover:text-[#c9a86a] transition-colors duration-300">
                <Phone className="w-3.5 h-3.5 text-[#c9a86a]" />
                <span>+91 9591685465</span>
              </a>
            </div>
          </div>

          {/* Directory Col */}
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#c9a86a]">
              Directory
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-light text-[#F5F5F0]">
              {[
                { name: 'Home', url: '/' },
                { name: 'Gallery', url: '/gallery' },
                { name: 'Services', url: '/services' },
                { name: 'Contact', url: '/contact' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.url}
                  className="hover:text-[#c9a86a] transition-colors duration-300 py-0.5"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials Col */}
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#c9a86a]">
              Connect
            </span>
            <div className="flex flex-col space-y-2 text-xs font-light text-[#F5F5F0]">
              <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a86a] transition-colors duration-300 py-0.5 flex items-center justify-between group">
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9a86a]" />
              </a>
              <a href="#" className="hover:text-[#c9a86a] transition-colors duration-300 py-0.5 flex items-center justify-between group">
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9a86a]" />
              </a>
              <a href="#" className="hover:text-[#c9a86a] transition-colors duration-300 py-0.5 flex items-center justify-between group">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9a86a]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#c9a86a]/15 text-[10px] text-[#F5F5F0]/85 tracking-widest uppercase font-light">
          <span>RVS Craft Interiors &copy; 2026. All rights reserved.</span>
          <span className="mt-2 md:mt-0 hover:text-[#c9a86a] transition-colors duration-300 cursor-pointer">
            Privacy Policy & Terms
          </span>
        </div>
      </div>
    </footer>
  );
}
