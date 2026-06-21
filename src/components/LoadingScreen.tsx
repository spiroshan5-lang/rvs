'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Ensure scroll is locked while loading
    document.body.style.overflow = 'hidden';

    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = ''; // Restore scroll
    }, 2500);

    // Remove from DOM after fade animation completes (1.2s)
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      if (onComplete) {
        onComplete();
      }
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes fadePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes zoomIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
      <div 
        className={`fixed top-0 left-0 w-screen h-screen bg-[#0B0B0B] z-[99999] flex justify-center items-center flex-col transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="relative w-[150px] h-[150px] flex justify-center items-center scale-90" style={{ animation: 'zoomIn 1.5s ease-out forwards' }}>
          
          {/* Glow */}
          <div className="absolute w-[130px] h-[130px] rounded-full bg-[radial-gradient(circle,rgba(201,168,106,0.15)_0%,transparent_70%)]" style={{ animation: 'pulseGlow 2s ease-in-out infinite alternate' }} />
          
          {/* Ring */}
          <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-[#C9A86A] border-b-[#C9A86A] rounded-full" style={{ animation: 'rotateRing 3s linear infinite' }} />
          
          {/* Logo */}
          <div className="relative w-[100px] h-[100px] z-10 flex justify-center items-center overflow-hidden rounded-full drop-shadow-[0_0_15px_rgba(201,168,106,0.3)]">
             <Image 
                src="/new-logo.jpeg" 
                alt="RVS Crafted Interiors Logo" 
                fill
                className="object-cover" 
             />
          </div>
        </div>
        
        <div className="mt-[30px] font-sans text-xs font-light tracking-[0.4em] uppercase text-[#8E8E8E]" style={{ animation: 'fadePulse 1.8s ease-in-out infinite' }}>
          RVS Crafted Interiors
        </div>
      </div>
    </>
  );
}
