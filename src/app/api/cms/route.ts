import { NextResponse } from 'next/server';
import { getDatabaseUrl } from '@/lib/firebase';

// Public endpoint: returns CMS hero slides and gallery cards
// No auth required - this is public read-only content
export async function GET() {
  try {
    const [heroRes, galleryRes] = await Promise.all([
      fetch(await getDatabaseUrl('/cms/heroSlides.json'), { next: { revalidate: 60 } }),
      fetch(await getDatabaseUrl('/cms/galleryCards.json'), { next: { revalidate: 60 } }),
    ]);

    const heroRaw = heroRes.ok ? await heroRes.json() : null;
    const galleryRaw = galleryRes.ok ? await galleryRes.json() : null;

    const heroSlides = heroRaw
      ? Object.entries(heroRaw)
          .map(([id, val]: [string, unknown]) => ({ id, ...(val as object) }))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
            ((a.order as number) ?? 0) - ((b.order as number) ?? 0)
          )
      : [];

    const galleryCards = galleryRaw
      ? Object.entries(galleryRaw)
          .map(([id, val]: [string, unknown]) => ({ id, ...(val as object) }))
          .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
            ((a.order as number) ?? 0) - ((b.order as number) ?? 0)
          )
      : [];

    return NextResponse.json({ heroSlides, galleryCards });
  } catch {
    return NextResponse.json({ heroSlides: [], galleryCards: [] });
  }
}
