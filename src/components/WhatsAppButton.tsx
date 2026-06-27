'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
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
        </div>
      )}
    </AnimatePresence>
  );
}
