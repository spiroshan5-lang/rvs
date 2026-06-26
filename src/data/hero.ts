// ╔══════════════════════════════════════════════════════════╗
// ║  HERO SLIDES — paste your Cloudinary image URLs below   ║
// ╚══════════════════════════════════════════════════════════╝
export interface HeroSlide {
  id: string;
  url: string;
  alt: string;
}

// Add your Cloudinary URLs here. Leave empty to show the hero video fallback.
export const HERO_SLIDES: HeroSlide[] = [
  // { id: 'h1', url: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/hero1.jpg', alt: 'Luxury living room' },
  // { id: 'h2', url: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/hero2.jpg', alt: 'Premium kitchen' },
];

// Slideshow interval in seconds
export const HERO_INTERVAL = 4.5;
