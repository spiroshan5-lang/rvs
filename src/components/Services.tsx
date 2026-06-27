'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    details: ['Villas & Private Estates', 'Luxury Penthouses', 'High-End Apartments', 'Renovations'],
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
    details: ['Flagship Showrooms', 'Luxury Retail Boutiques', 'Experience Centers', 'Window Displays'],
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
    title: '3D Visualizations & VR',
    description: 'State-of-the-art photorealistic renders and virtual walk-throughs that let you experience your space before construction starts.',
    details: ['3D Renders', 'VR Walkthroughs', 'Floor Plans', 'Sectional Views'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
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
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? 480 : clientWidth * 0.85;
      const scrollTo = direction === "left" 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden transition-colors duration-300" style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <style dangerouslySetInnerHTML={{__html: "\n        .scrollbar-none::-webkit-scrollbar {\n          display: none;\n        }\n        .scrollbar-none {\n          -ms-overflow-style: none;\n          scrollbar-width: none;\n        }\n      "}} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-4 block">
              Capabilities
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Spatial Solutions
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:mt-0">
            <p className="text-xs md:text-sm font-light text-[var(--fg-muted)] tracking-wider max-w-xs leading-relaxed">
              From spatial consultations to architectural construction supervision, we deliver uncompromising quality.
            </p>
            
            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 self-start sm:self-center">
              <button 
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-[var(--gold-border)] hover:border-[#c9a86a] bg-transparent flex items-center justify-center text-[var(--gold)] hover:bg-[#c9a86a]/10 active:opacity-75 transition-all duration-300 cursor-pointer"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-[var(--gold-border)] hover:border-[#c9a86a] bg-transparent flex items-center justify-center text-[var(--gold)] hover:bg-[#c9a86a]/10 active:opacity-75 transition-all duration-300 cursor-pointer"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Horizontal Scroll Wrapper */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap scrollbar-none gap-6 md:gap-8 pb-12 pt-2 scroll-smooth"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[85vw] sm:w-[450px] shrink-0 snap-start p-8 md:p-10 border border-[var(--gold-border)] rounded-[2rem]  backdrop-blur-sm  transition-colors duration-500 flex flex-col justify-between min-h-[520px] group relative overflow-hidden" style={{ background: "var(--bg-alt)" }}
            >
              {/* Top Row: Index & Dot */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-sm text-[var(--gold)] select-none font-medium">
                  {service.index}
                </span>
                <span className="w-1.5 h-1.5 bg-[var(--fg)]/25 group-hover:bg-[var(--gold)] group-hover:scale-150 rounded-full transition-all duration-500" />
              </div>

              {/* Service Image */}
              <div className="relative w-full h-[60vw] sm:h-56 mb-6 overflow-hidden rounded-[1.5rem] bg-[var(--gold-muted)]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.8] hover:brightness-[0.9]"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                <div className="absolute inset-0 border border-[var(--gold-border)] group-hover:border-[var(--gold-border)] transition-colors duration-500 rounded-[1.5rem]" />
              </div>

              {/* Service Info */}
              <div className="flex-grow flex flex-col justify-end space-y-4">
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide text-[var(--fg)] group-hover:text-[var(--gold)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs font-light text-[var(--fg-muted)] leading-relaxed tracking-wide">
                  {service.description}
                </p>
                
                {/* Details pill tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.details.map((detail, dIdx) => (
                    <span 
                      key={dIdx} 
                      className="text-[9px] tracking-wider uppercase font-sans font-medium px-2 py-0.5 rounded-full border border-[var(--gold-border)]/40 bg-[var(--bg)]/40 text-[var(--fg-muted)] group-hover:border-[var(--gold-border)] transition-all duration-500"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover bottom line accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c9a86a] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
