'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1503387762-592dec583e72?q=80&w=800&auto=format&fit=crop',
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
    title: 'Turnkey Project Execution',
    description: 'End-to-end execution with meticulous timeline management, site coordination, and structural oversight for complete peace of mind.',
    details: ['Vendor Procurement', 'Site Supervision', 'Quality Control', 'Timeline Management'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '12',
    title: 'Material & Finish Curation',
    description: 'Selecting premium surface finishes, stone patterns, exotic veneers, and wallpaper textiles that establish spatial character.',
    details: ['Stone & Marble', 'Exotic Veneers', 'Wall Coverings', 'Texture Palettes'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
  },
  {
    index: '13',
    title: 'Modular Wardrobes & Closets',
    description: 'Bespoke bedroom wardrobes, walk-in closets, and innovative storage configurations engineered for style and utility.',
    details: ['Walk-in Closets', 'Sliding Wardrobes', 'Smart Drawers', 'Glass Doors'],
    image: 'https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Track parent scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic index tracker based on scroll progress
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const current = Math.min(Math.floor(v * services.length), services.length - 1);
      setActiveIdx(current >= 0 ? current : 0);
    });
  }, [scrollYProgress]);

  // Fade out scroll indicator as user scrolls down
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const indicatorY = useTransform(scrollYProgress, [0, 0.08], [0, 20]);

  // Left-side architectural ruler slider height
  const rulerHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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
        <div className="absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-30">
          <span className="text-[10px] font-mono tracking-widest text-[var(--gold)]">01</span>
          
          <div className="w-[1.5px] h-[250px] bg-[var(--fg)]/10 relative rounded-full overflow-hidden">
            <motion.div 
              style={{ height: rulerHeight }}
              className="absolute top-0 left-0 w-full bg-[var(--gold)]" 
            />
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[var(--fg)]/30">
            {String(services.length).padStart(2, "0")}
          </span>
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
        <div className="relative w-full h-full flex items-center justify-center">
          {services.map((service, i) => {
            const step = 1 / services.length;
            const focus = i * step;

            // Framer Motion transforms for 3D walkthrough depth
            // Entry -> Focus -> Exit (passes through screen)
            const scale = useTransform(
              scrollYProgress,
              [focus - step * 1.5, focus - step * 0.4, focus, focus + step * 0.6, focus + step * 1.2],
              [0.35, 0.7, 1.0, 1.5, 2.5]
            );

            const opacity = useTransform(
              scrollYProgress,
              [focus - step * 1.5, focus - step * 0.4, focus, focus + step * 0.5, focus + step * 1.0],
              [0, 0.9, 1.0, 0.9, 0]
            );

            const zIndex = activeIdx === i ? 20 : i < activeIdx ? 10 : 5;

            // Parallax 3D tilt movement on translation
            const rotateY = useTransform(
              scrollYProgress,
              [focus - step * 1.5, focus, focus + step * 1.2],
              [10, 0, -10]
            );

            return (
              <motion.div
                key={service.index}
                style={{
                  scale,
                  opacity,
                  zIndex,
                  rotateY,
                  transformStyle: "preserve-3d",
                  perspective: "1200px",
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
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={i < 3}
                    className="object-cover filter brightness-[0.85] hover:brightness-[0.95] transition-all duration-700"
                    sizes="(max-width: 640px) 100vw, 425px"
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
