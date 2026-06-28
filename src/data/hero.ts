// Static fallback slides. CMS data (from /api/cms) overrides these at runtime.
export interface HeroSlide {
  id: string;
  url: string;
  mobileUrl?: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { id: 'h1', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543000/rvs_cms/hero_living_room.jpg', alt: 'Luxury Modern Living Room' },
  { id: 'h2', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_kitchen.jpg', alt: 'Premium Kitchen Design' },
  { id: 'h3', url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_bedroom.jpg', alt: 'Elegant Master Bedroom' }
];

// Slideshow interval in seconds
export const HERO_INTERVAL = 4.5;
