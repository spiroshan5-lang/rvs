// Static fallback slides. CMS data (from /api/cms) overrides these at runtime.
export interface HeroSlide {
  id: string;
  url: string;
  mobileUrl?: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h1', url: '/hero_living_room.jpg', alt: 'Luxury Modern Living Room with Bespoke Wood Detailing' },
  { id: 'h2', url: '/hero_kitchen.jpg', alt: 'Premium Italian-Style Kitchen with Breakfast Counter' },
  { id: 'h3', url: '/hero_study.jpg', alt: 'Lit Executive Study Desk and Custom Shelf Lighting' }
];

// Slideshow interval in seconds
export const HERO_INTERVAL = 4.5;
