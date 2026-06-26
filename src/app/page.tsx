import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'RVS Craft Interiors | Luxury Spatial Architecture Studio',
  description: 'A luxury interior design studio crafting atmospheric homes, premium hospitality spaces, and immersive spatial experiences. Interiors with rhythm, warmth, and precision.',
};

export default function Home() {
  return <HomeClient />;
}
