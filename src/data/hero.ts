// Static fallback slides. CMS data (from /api/cms) overrides these at runtime.
export interface HeroSlide {
  id: string;
  url: string;
  mobileUrl?: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [];

// Slideshow interval in seconds
export const HERO_INTERVAL = 4.5;
