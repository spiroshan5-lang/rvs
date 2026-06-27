// Updated fallback content for Vercel rebuild
export interface GalleryCard {
  id: string;
  imgUrl: string;
  alt: string;
  linkUrl?: string;
}

// Static fallback cards. CMS data (from /api/cms) overrides these at runtime.
export const GALLERY_CARDS: GalleryCard[] = [
  { id: 'g1', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543003/rvs_cms/gallery_living_room.jpg', alt: 'Modern Living Space' },
  { id: 'g2', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543004/rvs_cms/gallery_kitchen.jpg', alt: 'Premium Kitchen' },
  { id: 'g3', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543005/rvs_cms/gallery_bedroom.jpg', alt: 'Master Bedroom Suite' },
  { id: 'g4', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543006/rvs_cms/gallery_bathroom.jpg', alt: 'Spa-Inspired Bathroom' },
  { id: 'g5', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543007/rvs_cms/gallery_dining.jpg', alt: 'Elegant Dining Room' },
  { id: 'g6', imgUrl: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543008/rvs_cms/gallery_office.jpg', alt: 'Luxury Home Office' },
];
