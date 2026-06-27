export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const HERO_PUBLIC_ID    = 'rvs_cms/hero_config';
const GALLERY_PUBLIC_ID = 'rvs_cms/gallery_config';

async function readCloudinaryJson(publicId: string): Promise<unknown[]> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return [];
  const url = 'https://res.cloudinary.com/' + cloudName + '/raw/upload/' + publicId + '.json?_t=' + Date.now();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  // Rate limit: max 60 requests per minute per IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const rateCheck = checkRateLimit('cms-api:' + ip, 60, 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const [heroSlides, galleryCards] = await Promise.all([
      readCloudinaryJson(HERO_PUBLIC_ID),
      readCloudinaryJson(GALLERY_PUBLIC_ID),
    ]);
    return NextResponse.json(
      { heroSlides, galleryCards },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  } catch {
    return NextResponse.json({ heroSlides: [], galleryCards: [] });
  }
}
