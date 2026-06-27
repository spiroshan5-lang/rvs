export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { getDatabaseUrl } from '@/lib/firebase';

async function readFirebaseJson(path: string): Promise<unknown[]> {
  try {
    const url = await getDatabaseUrl(path);
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
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
      readFirebaseJson('/cms/hero.json'),
      readFirebaseJson('/cms/gallery.json'),
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
