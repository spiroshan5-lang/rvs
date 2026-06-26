// ╔════════════════════════════════════════════════════════════╗
// ║  GALLERY CARDS — paste your Cloudinary image URLs below   ║
// ╚════════════════════════════════════════════════════════════╝
export interface GalleryCard {
  id: string;
  imgUrl: string;
  alt: string;
  linkUrl?: string;
}

// Add your Cloudinary URLs here.
export const GALLERY_CARDS: GalleryCard[] = [
  // { id: 'g1', imgUrl: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/g1.jpg', alt: 'Modern living space' },
  // { id: 'g2', imgUrl: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/g2.jpg', alt: 'Luxury bedroom' },
  // { id: 'g3', imgUrl: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/g3.jpg', alt: 'Premium kitchen' },
];
