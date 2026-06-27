'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scale: starts at 0.94, reaches 1 in full view, drops back on exit
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.94, 1, 1, 0.94]);
  
  // Transform 3D rotation along X axis: tilts forward on entry, tilts backward on exit
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [8, 0, 0, -8]);
  
  // Transform vertical translation to create a lift/entry effect
  const y = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [60, 0, 0, -60]);
  
  // Transform opacity smoothly
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.6, 1, 1, 0.6]);

  return (
    <div 
      ref={containerRef} 
      className="w-full relative my-16 md:my-28 px-4 md:px-8"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          scale,
          rotateX,
          y,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="w-full origin-center rounded-[2.5rem] overflow-hidden border border-[var(--gold-border)]/20 shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
