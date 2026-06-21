'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,        // Lower value = smoother scroll inertia
        duration: 1.2,     // Duration of scroll animation
        smoothWheel: true, // Enable mouse wheel smooth scroll
      }}
    >
      {children}
    </ReactLenis>
  );
}
