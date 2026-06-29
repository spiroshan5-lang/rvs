'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote: "RVS Craft Interiors transformed our penthouse into a serene, light-filled sanctuary. Their attention to detail—from the millimeter precision of the marble joints to the warmth of the custom walnut panels—is absolutely unmatched.",
    author: "Aditya & Priya Sen",
    role: "Homeowners",
    location: "Whitefield Penthouse",
  },
  {
    id: 't-2',
    quote: "Their space planning and volumetric design created an office environment that feels both incredibly premium and highly functional. The fluted glass partitions and custom lighting layouts keep our team inspired daily.",
    author: "Rohan K. Mehta",
    role: "Managing Director",
    location: "Indiranagar Executive Hub",
  },
  {
    id: 't-3',
    quote: "From our first consultation to the final object styling, the RVS team carried the design with absolute structural integrity and artistic maturity. It's rare to find a studio that delivers precisely on their photorealistic 3D concepts.",
    author: "Sanjay Rao",
    role: "Villa Owner",
    location: "Sadashivanagar Estate",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials"
      className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-alt)', color: 'var(--fg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'var(--section-divider)' }} />
      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'var(--section-divider)' }} />
      
      {/* Background Decorative Blur */}
      <div aria-hidden className="absolute -top-24 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,168,106,0.03)' }} />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-4 block">
            Client Words
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">
            Testimonials
          </h2>
        </div>

        {/* Testimonial Quote Carousel */}
        <div className="relative w-full min-h-[300px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center flex flex-col items-center max-w-4xl px-4 md:px-12"
            >
              <Quote className="w-8 h-8 text-[var(--gold)]/30 mb-6" strokeWidth={1.5} />
              <p className="font-serif text-lg md:text-2xl font-light leading-relaxed tracking-wide italic text-[var(--fg)]/90 mb-8">
                "{testimonials[current].quote}"
              </p>
              
              <div className="flex flex-col items-center">
                <span className="font-serif text-base font-light tracking-wide text-[var(--fg)]">
                  {testimonials[current].author}
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase font-light text-[var(--gold)] mt-1.5">
                  {testimonials[current].role} &mdash; {testimonials[current].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold)] hover:bg-[#c9a86a]/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setAutoplay(false); setCurrent(idx); }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: idx === current ? 'var(--gold)' : 'var(--fg-muted)',
                  opacity: idx === current ? 1 : 0.3,
                  width: idx === current ? '16px' : '6px',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center text-[var(--gold)] hover:bg-[#c9a86a]/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

