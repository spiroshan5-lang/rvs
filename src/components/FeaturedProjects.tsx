'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    name: 'The Obsidian Pavilion',
    location: 'Zurich, Switzerland',
    type: 'Residential Design',
    image: '/project1.png',
  },
  {
    id: 'project-2',
    name: 'Amber Wood Sanctuary',
    location: 'Milan, Italy',
    type: 'Penthouse Lounge',
    image: '/project2.png',
  },
  {
    id: 'project-3',
    name: 'Nordic Stone Atelier',
    location: 'Copenhagen, Denmark',
    type: 'Architectural Kitchen',
    image: '/project3.png',
  },
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring settings for organic magnetic weight
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Position relative to the parent section
    mouseX.set(e.clientX - rect.left - 48); // offset half of badge width (w-24 = 96px)
    mouseY.set(e.clientY - rect.top - 48);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="projects"
      className="bg-[#0B0B0B] text-[#F5F5F0] py-24 md:py-36 px-6 md:px-12 relative overflow-hidden cursor-none" // Hide default cursor here
    >
      {/* 1. Magnetic Custom Cursor Follower (only visible on desktop) */}
      <motion.div
        className="hidden md:flex absolute w-24 h-24 bg-[#c9a86a]/95 rounded-full z-40 pointer-events-none items-center justify-center text-[#0B0B0B] font-serif text-[10px] tracking-[0.25em] uppercase shadow-lg select-none"
        style={{
          left: cursorX,
          top: cursorY,
          scale: hoveredProject ? 1 : 0,
          opacity: hoveredProject ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        <span>View</span>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Selected Creations
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/50 tracking-wider max-w-xs mt-4 md:mt-0 leading-relaxed">
            A curated showcase of spatial structures balancing atmosphere, architecture, and luxury craftsmanship.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group flex flex-col space-y-6 relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1f1005]">
                {/* Parallax Hover Image */}
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:brightness-95"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Index badge */}
                <div className="absolute top-6 left-6 font-serif text-xs text-[#F5F5F0]/60 select-none">
                  {`0${project.id.replace('project-', '')}`}
                </div>
              </div>

              {/* Text Info */}
              <div className="flex justify-between items-start pt-2">
                <div className="flex flex-col space-y-1">
                  <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide group-hover:text-[#c9a86a] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-[10px] tracking-[0.15em] uppercase font-light text-[#F5F5F0]/60">
                    <span>{project.location}</span>
                    <span className="w-1 h-1 bg-[#c9a86a] rounded-full" />
                    <span>{project.type}</span>
                  </div>
                </div>

                <div className="border border-[#c9a86a]/20 hover:border-[#c9a86a] bg-transparent text-[#F5F5F0] rounded-full p-2.5 transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

