'use client';

import Navbar from '@/components/Navbar';
import SocialCards from '@/components/ui/card-fan-carousel';
import Footer from '@/components/Footer';

const GALLERY_CARDS = [
  {
    imgUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=450&fit=crop",
    alt: "The Travertine Lounge",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=450&fit=crop",
    alt: "Warm Oak Kitchen",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop",
    alt: "Bespoke Living Room",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=450&fit=crop",
    alt: "Luxury Dining Room",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=450&fit=crop",
    alt: "Linen Sanctuary Bedroom",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=450&fit=crop",
    alt: "Brushed Brass Washroom",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=450&fit=crop",
    alt: "Executive Studio Office",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F0] flex flex-col justify-between">
      <Navbar />
      <main className="pt-32 flex-grow flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 text-center mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
            Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight mb-4">
            Spatial Anthology
          </h1>
          <p className="text-xs md:text-sm font-light text-[#F5F5F0]/60 tracking-wider max-w-lg mx-auto leading-relaxed">
            A dynamic, tactile showcase of physical details, lighting composition, and rich material pairing.
          </p>
        </div>
        <div className="w-full flex justify-center py-8">
          <SocialCards cards={GALLERY_CARDS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
