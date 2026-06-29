// Static fallback slides. CMS data (from /api/cms) overrides these at runtime.
export interface HeroSlide {
  id: string;
  url: string;
  mobileUrl?: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h1', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782724446/rvs_cms/hero_living_room.jpg', alt: 'Luxury Modern Living Room with Bespoke Wood Detailing' },
  { id: 'h2', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782724448/rvs_cms/hero_kitchen.jpg', alt: 'Premium Italian-Style Kitchen with Breakfast Counter' },
  { id: 'h3', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782724451/rvs_cms/hero_study.jpg', alt: 'Lit Executive Study Desk and Custom Shelf Lighting' }
];

// Slideshow interval in seconds
export const HERO_INTERVAL = 4.5;
