'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const message = encodeURIComponent(
    "Hi! I'm interested in interior design services from RVS Craft Interiors. Could you share more details?"
  );
  const href = 'https://wa.me/919591685465?text=' + message;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5 pointer-events-none">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulseGlow {
              0%, 100% {
                box-shadow: 0 10px 25px -5px rgba(201, 168, 106, 0.5), 0 0 0 0px rgba(201, 168, 106, 0.3);
              }
              50% {
                box-shadow: 0 15px 35px 0px rgba(201, 168, 106, 0.7), 0 0 0 8px rgba(201, 168, 106, 0);
              }
            }
            @keyframes shimmerSweep {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .luxury-pulsing-btn {
              animation: pulseGlow 2.5s infinite ease-in-out;
              background: linear-gradient(120deg, #c9a86a 0%, #e5c07b 30%, #b59253 70%, #c9a86a 100%);
              background-size: 200% auto;
              transition: all 0.3s ease;
              border: 1px solid rgba(255, 255, 255, 0.2);
              animation-name: pulseGlow, shimmerSweep;
              animation-duration: 2.5s, 6s;
              animation-iteration-count: infinite, infinite;
              animation-timing-function: ease-in-out, linear;
            }
            .luxury-pulsing-btn:hover {
              transform: scale(1.05) translateY(-2px);
              box-shadow: 0 15px 35px 0px rgba(201, 168, 106, 0.8);
              filter: brightness(1.05);
            }
          `}} />

          {/* Book Consultation Floating Pill Button with Glow & Shimmer */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.15 }}
            className="pointer-events-auto flex items-center gap-2.5 px-6 py-4 rounded-full shadow-2xl cursor-pointer font-sans text-xs tracking-wider uppercase font-semibold text-[#0B0B0B] luxury-pulsing-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4 text-[#0B0B0B]"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>Book Consultation</span>
          </motion.a>

          {/* WhatsApp Direct Floating Button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            aria-label="Chat with RVS Craft Interiors on WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl cursor-pointer"
            style={{ background: '#25D366' }}
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#25D366' }} />
            <span className="absolute inset-[-4px] rounded-full opacity-20 animate-pulse" style={{ background: '#25D366' }} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-7 h-7 relative z-10"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
