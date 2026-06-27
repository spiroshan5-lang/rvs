export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

// Public endpoint: returns CMS hero slides and gallery cards
// Reads from Cloudinary raw JSON configs — no Firebase dependency
const HERO_PUBLIC_ID    = 'rvs_cms/hero_config';
const GALLERY_PUBLIC_ID = 'rvs_cms/gallery_config';

async function readCloudinaryJson(publicId: string): Promise<unknown[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return [];
  const url = `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}.json?_t=${Date.now()}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const [heroSlides, galleryCards] = await Promise.all([
      readCloudinaryJson(HERO_PUBLIC_ID),
      readCloudinaryJson(GALLERY_PUBLIC_ID),
    ]);

    return NextResponse.json({ heroSlides, galleryCards });
  } catch {
    return NextResponse.json({ heroSlides: [], galleryCards: [] });
  }
}
