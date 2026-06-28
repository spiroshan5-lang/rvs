import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Analytics } from '@vercel/analytics/next';


const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rvs-wheat.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'RVS Craft Interiors | Luxury Spatial Architecture Studio',
    template: '%s | RVS Craft Interiors',
  },
  description:
    'RVS Craft Interiors is a luxury interior design studio in Bengaluru crafting atmospheric homes, premium hospitality spaces, and immersive spatial experiences. Interiors with rhythm, warmth, and precision.',
  keywords: [
    'luxury interior design Bengaluru',
    'interior designer Bangalore',
    'architectural interior design',
    'premium interior design studio',
    'RVS Craft Interiors',
    'residential interior design',
    'hospitality design India',
    'modular kitchen design',
  ],
  authors: [{ name: 'RVS Craft Interiors' }],
  creator: 'RVS Craft Interiors',
  publisher: 'RVS Craft Interiors',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RVS Craft Interiors | Luxury Spatial Architecture Studio',
    description:
      'Atmospheric homes, hospitality spaces, and immersive spatial experiences designed with rhythm, warmth, and precision. Based in Bengaluru, India.',
    type: 'website',
    url: BASE_URL,
    siteName: 'RVS Craft Interiors',
    locale: 'en_IN',
    images: [
      {
        url: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_kitchen.jpg',
        width: 1200,
        height: 630,
        alt: 'RVS Craft Interiors - Luxury Interior Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RVS Craft Interiors | Luxury Spatial Architecture Studio',
    description: 'Luxury interior design studio crafting atmospheric homes and immersive spatial experiences.',
    images: ['https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_kitchen.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  name: 'RVS Craft Interiors',
  description:
    'Luxury interior design studio in Bengaluru crafting atmospheric homes, premium hospitality spaces, and immersive spatial experiences.',
  url: BASE_URL,
  telephone: '+91-9591685465',
  email: 'queriesrvs@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.9716',
    longitude: '77.5946',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '₹₹₹',
  image: 'https://res.cloudinary.com/dbxbpvn8j/image/upload/v1782543002/rvs_cms/hero_kitchen.jpg',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Interior Design Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Interior Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Interior Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hospitality Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Modular Kitchen Design' } },
    ],
  },
};

import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('rvs-theme');
              var theme = (stored === 'dark' || stored === 'light') ? stored : 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="transition-colors duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
        {/* Subtle paper texture overlay */}
        <div className="noise-overlay" />

        {/* Lenis smooth scrolling container */}
        <SmoothScroll>
          <ThemeProvider>
            {children}
            <WhatsAppButton />
          </ThemeProvider>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}