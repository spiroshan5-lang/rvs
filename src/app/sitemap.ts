import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rvs-wheat.vercel.app';

  return [
    { url: baseUrl,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `/services`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `/gallery`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `/contact`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}