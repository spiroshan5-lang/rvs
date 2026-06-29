'use client';

import { useRef, useState, useEffect } from 'react';
// Removed next/image import
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface Service {
  index: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

const services: Service[] = [
  {
    index: '01',
    title: 'Residential Interiors',
    description: 'Bespoke living environments tailored to individual stories. We craft private sanctuaries from concept planning to finishing details.',
    details: ['Villas & Estates', 'Luxury Penthouses', 'High-End Apartments', 'Renovations'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '02',
    title: 'Commercial Spaces',
    description: 'Corporate workspaces that combine luxury aesthetics with brand narratives, optimizing flow, light, and architectural purpose.',
    details: ['Executive Offices', 'Co-Working Spaces', 'Creative Studios', 'Conference Rooms'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '03',
    title: 'Hospitality Design',
    description: 'Immersive spaces designed to provoke emotion. We construct hotels, bars, and luxury retail lounges with rich spatial textures.',
    details: ['Boutique Hotels', 'Premium Lounges', 'Fine Dining', 'Resort Suites'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '04',
    title: 'Modular Kitchens',
    description: 'Sleek, highly functional, and custom-tailored kitchen designs that seamlessly integrate with your lifestyle and home aesthetics.',
    details: ['Smart Storage', 'Premium Materials', 'Italian Layouts', 'Ergonomic Workflows'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '05',
    title: 'Retail & Showrooms',
    description: 'Immersive flagship store layouts designed to engage clients, drive conversions, and communicate your brand identity.',
    details: ['Flagship Showrooms', 'Luxury Boutiques', 'Experience Centers', 'Window Displays'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '06',
    title: 'Custom Furniture Design',
    description: 'Bespoke furniture and custom architectural elements crafted specifically for your spatial identity and functional needs.',
    details: ['Signature Dining Tables', 'Bespoke Wardrobes', 'Artisan Cabinets', 'Luxury Seating'],
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '07',
    title: 'Styling & Decor Curation',
    description: 'Curating objects, art pieces, rugs, and custom furniture that complete a space. We source globally from premium artisans.',
    details: ['Art Sourcing', 'Decorative Styling', 'Textile Selection', 'Accessory Styling'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '08',
    title: 'Space Planning & Layouts',
    description: 'Precision zoning and traffic flow optimization. We draft comprehensive layout blueprints and conceptual floor plans.',
    details: ['Zoning Blueprints', 'Traffic Flow Analysis', 'Conceptual Floor Plans', 'Space Optimization'],
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '09',
    title: 'Lighting & Ceiling Design',
    description: 'Architectural lighting layouts and custom false ceiling blueprints designed to elevate moods and showcase spatial materials.',
    details: ['False Ceilings', 'Lighting Layouts', 'Mood Systems', 'Automation Plans'],
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '10',
    title: 'Landscape & Patio Design',
    description: 'Extending luxury living outdoors. We design custom patios, balconies, and green vertical landscapes for relaxation.',
    details: ['Balcony Lounges', 'Terrace Gardens', 'Barbecue Patios', 'Vertical Green Walls'],
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '11',
    title: 'Material & Finish Curation',
    description: 'Selecting premium surface finishes, stone patterns, exotic veneers, and wallpaper textiles that establish spatial character.',
    details: ['Stone & Marble', 'Exotic Veneers', 'Wall Coverings', 'Texture Palettes'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '12',
    title: 'Modular Wardrobes & Closets',
    description: 'Bespoke bedroom wardrobes, walk-in closets, and innovative storage configurations engineered for style and utility.',
    details: ['Walk-in Closets', 'Sliding Wardrobes', 'Smart Drawers', 'Glass Doors'],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isScrollingTo = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  // Sync state to ref
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // Capture lenis instance without triggering state updates on scroll
  useLenis((instance) => {
    lenisRef.current = instance;
  });



  // Track parent scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic index tracker using type-safe useMotionValueEvent
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (isScrollingTo.current) return;
    const current = Math.min(Math.floor(v * services.length), services.length - 1);
    const safeIndex = current >= 0 ? current : 0;
    if (safeIndex !== activeIdxRef.current) {
      setActiveIdx(safeIndex);
    }
  });

  // Snapped page-by-page scrolling interceptor bound once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;

    const handleScrollAttempt = (direction: 1 | -1) => {
      const currentIdx = activeIdxRef.current;
      const nextIdx = currentIdx + direction;
      const lenisInstance = lenisRef.current;

      if (nextIdx >= 0 && nextIdx < services.length && lenisInstance) {
        isTransitioningRef.current = true;
        isScrollingTo.current = true;
        setActiveIdx(nextIdx);

        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollRange = containerHeight - viewportHeight;
        
        // Calculate target scroll corresponding to the exact progress of nextIdx card
        const targetScroll = containerTop + (nextIdx / (services.length - 1)) * scrollRange;

        lenisInstance.scrollTo(targetScroll, {
          lock: true,
          duration: 0.8,
          onComplete: () => {
            isTransitioningRef.current = false;
            isScrollingTo.current = false;
          }
        });

        return true;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isStickyActive = rect.top <= 5 && rect.bottom >= window.innerHeight - 5;

      if (!isStickyActive) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const currentIdx = activeIdxRef.current;
      if (currentIdx === 0 && direction === -1) return;
      if (currentIdx === services.length - 1 && direction === 1) return;

      e.preventDefault();
      handleScrollAttempt(direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isStickyActive = rect.top <= 5 && rect.bottom >= window.innerHeight - 5;

      if (!isStickyActive) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) < 40) return; // 40px swipe threshold

      const direction = deltaY > 0 ? 1 : -1;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const currentIdx = activeIdxRef.current;
      if (currentIdx === 0 && direction === -1) return;
      if (currentIdx === services.length - 1 && direction === 1) return;

      e.preventDefault();
      touchStartY = touchEndY; 
      handleScrollAttempt(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Fade out scroll indicator as user scrolls down
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.08], [0, 20]);

  // Left-side architectural ruler slider scale
  const rulerScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Framer Motion state variants for the cards stack to bypass WAAPI scroll bugs
  const cardVariants = {
    active: {
      scale: 1.0,
      opacity: 1.0,
      rotateY: 0,
      y: 0,
      z: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    scrolledPast: {
      scale: 2.2,
      opacity: 0,
      rotateY: -10,
      y: -120,
      z: 50,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    upcoming: {
      scale: 0.7,
      opacity: 0.85,
      rotateY: 6,
      y: 35,
      z: -50,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
    hidden: {
      scale: 0.35,
      opacity: 0,
      rotateY: 12,
      y: 100,
      z: -100,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-10 w-full"
      style={{ height: (services.length * 80) + "vh", minHeight: "600vh", background: "var(--bg)" }}
    >
      {/* Sticky Fullscreen Wrapper */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center">
        {/* Dynamic Abstract Background Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />

        {/* 1. Left-Side Architectural Progress Ruler (Hidden on Mobile) */}
        <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2.5 z-30 font-mono text-[9px]">
          {services.map((service, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={service.index}
                onClick={() => {
                  const container = containerRef.current;
                  const lenisInstance = lenisRef.current;
                  if (!container || !lenisInstance) return;
                  
                  isTransitioningRef.current = true;
                  isScrollingTo.current = true;
                  setActiveIdx(idx);

                  const containerTop = container.offsetTop;
                  const containerHeight = container.offsetHeight;
                  const viewportHeight = window.innerHeight;
                  const scrollRange = containerHeight - viewportHeight;
                  const targetScroll = containerTop + (idx / (services.length - 1)) * scrollRange;

                  lenisInstance.scrollTo(targetScroll, {
                    lock: true,
                    duration: 1.0,
                    onComplete: () => {
                      isTransitioningRef.current = false;
                      isScrollingTo.current = false;
                    }
                  });
                }}
                className={`py-1 px-2 transition-all duration-300 hover:text-[var(--gold)] cursor-pointer ${
                  isActive 
                    ? 'text-[var(--gold)] scale-125 font-bold' 
                    : 'text-[var(--fg)]/30'
                }`}
              >
                {service.index}
              </button>
            );
          })}
        </div>

        {/* 2. Page Title Header (Floating Top-Left) */}
        <div className="absolute left-6 md:left-32 top-8 md:top-14 z-30">
          <span className="text-[9px] tracking-[0.35em] uppercase font-light text-[var(--gold)] mb-1 block">
            Capabilities
          </span>
          <h2 className="font-serif text-xl md:text-3xl font-light tracking-wide text-[var(--fg)]">
            Spatial Architecture
          </h2>
        </div>

        {/* 3. The 3D Spatial Walkthrough Stack */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          {services.map((service, i) => {
            // Determine active/scrolledPast/upcoming/hidden variant state
            let currentState = 'hidden';
            if (i === activeIdx) {
              currentState = 'active';
            } else if (i < activeIdx) {
              currentState = 'scrolledPast';
            } else if (i === activeIdx + 1) {
              currentState = 'upcoming';
            }

            const zIndex = activeIdx === i ? 20 : i < activeIdx ? 10 : 5;

            return (
              <motion.div
                key={service.index}
                initial="hidden"
                animate={currentState}
                variants={cardVariants}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-[90vw] sm:w-[650px] md:w-[850px] h-[65svh] sm:h-[480px] rounded-[2rem] border border-[var(--gold-border)]/35 bg-[var(--bg-alt)]/90 backdrop-blur-xl flex flex-col sm:flex-row overflow-hidden shadow-2xl pointer-events-auto"
              >
                {/* Left side: Content details */}
                <div className="w-full sm:w-1/2 p-6 md:p-10 flex flex-col justify-between h-[50%] sm:h-full relative z-10">
                  <div>
                    {/* Index row */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <span className="font-mono text-xs text-[var(--gold)] font-medium">
                        {service.index} / {String(services.length).padStart(2, "0")}
                      </span>
                      <span className="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse" />
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-[var(--fg)] mb-3 sm:mb-4">
                      {service.title}
                    </h3>
                    <p className="text-xs font-light text-[var(--fg-muted)] leading-relaxed tracking-wide">
                      {service.description}
                    </p>
                  </div>

                  {/* Details pill tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {service.details.map((detail, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[9px] tracking-wider uppercase font-sans font-medium px-3 py-1 rounded-full border border-[var(--gold-border)]/45 bg-[var(--bg)]/50 text-[var(--fg-muted)]"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: High-res image */}
                <div className="w-full sm:w-1/2 h-[50%] sm:h-full relative overflow-hidden bg-[var(--gold-muted)]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] hover:brightness-[0.95] transition-all duration-700"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                  {/* Subtle inner overlay border accent */}
                  <div className="absolute inset-0 border-l border-[var(--gold-border)]/20 pointer-events-none hidden sm:block" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Highlighted "Scroll / Swipe to Explore" Guide indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity, y: indicatorY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 pointer-events-none"
        >
          <div className="px-5 py-2.5 rounded-full border border-[var(--gold-border)] bg-[var(--bg-alt)]/80 backdrop-blur-md shadow-lg flex items-center gap-2.5 animate-pulse">
            {/* Pulsing Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[var(--gold)]">
              Scroll to Explore
            </span>
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--gold)] opacity-75" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
