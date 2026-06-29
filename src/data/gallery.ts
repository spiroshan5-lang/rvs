export interface GalleryCard {
  id: string;
  imgUrl: string;
  alt: string;
  linkUrl?: string;
}

export const GALLERY_CARDS: GalleryCard[] = [
  {
    id: 'g1',
    imgUrl: '/gallery_living_room_1.jpg',
    alt: 'Luxury Living Room with Maroon Leather Seating & Wooden Accent Wall',
  },
  {
    id: 'g2',
    imgUrl: '/gallery_kitchen_bar.jpg',
    alt: 'Sleek Modern Kitchen Bar with Custom Countertops & Stools',
  },
  {
    id: 'g3',
    imgUrl: '/gallery_study_desk.jpg',
    alt: 'Lit Executive Home Office Workstation with Built-in Shelving',
  },
  {
    id: 'g4',
    imgUrl: '/gallery_living_room_2.jpg',
    alt: 'Minimalist TV Accent Wall with Wood Panel Detailing',
  },
  {
    id: 'g5',
    imgUrl: '/gallery_living_room_3.jpg',
    alt: 'Lit Formal Sitting Area with Sophisticated Wood Partitioning',
  },
  {
    id: 'g6',
    imgUrl: '/gallery_bedroom_bed.jpg',
    alt: 'Elegant Master Bed Frame featuring Dark Wood Headboard Design',
  },
  {
    id: 'g7',
    imgUrl: '/gallery_lobby.jpg',
    alt: 'Bright Interior Foyer with Premium Vertical White Panels',
  },
  {
    id: 'g8',
    imgUrl: '/gallery_wardrobe_sliding.jpg',
    alt: 'Custom Slatted Sliding Closet Doors with Ambient Shelving',
  },
];
