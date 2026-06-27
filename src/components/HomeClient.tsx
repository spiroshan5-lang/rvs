'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StudioIntro from '@/components/StudioIntro';
import WhyChooseUs from '@/components/WhyChooseUs';
import DesignProcess from '@/components/DesignProcess';
import ScrollReveal from '@/components/ScrollReveal';
import Footer from '@/components/Footer';

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      
      {/* 
        Render the homepage content always but set visibility or overflow 
        depending on loading state so that Lenis and GSAP can query heights correctly.
      */}
      <div className={isLoading ? 'invisible h-screen overflow-hidden' : 'visible'}>
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          
          <ScrollReveal>
            <StudioIntro />
          </ScrollReveal>
          
          <ScrollReveal>
            <WhyChooseUs />
          </ScrollReveal>
          
          <ScrollReveal>
            <DesignProcess />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </>
  );
}
