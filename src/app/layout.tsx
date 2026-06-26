import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "RVS Craft Interiors | Luxury Spatial Architecture Studio",
  description: "A luxury interior design studio crafting atmospheric homes, premium hospitality spaces, and immersive spatial experiences. Interiors with rhythm, warmth, and precision.",
  keywords: ["luxury interior design", "architectural spaces", "premium interior design studio", "RVS Craft Interiors", "residential interior design", "hospitality design"],
  authors: [{ name: "RVS Craft Interiors" }],
  openGraph: {
    title: "RVS Craft Interiors | Luxury Spatial Architecture Studio",
    description: "Atmospheric homes, hospitality spaces, and immersive spatial experiences designed with rhythm, warmth, and precision.",
    type: "website",
    url: "https://rvscraftinteriors.com", // Placeholder
  }
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
      </head>
      <body className="transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>
        
        {/* Subtle, expensive paper texture overlay */}
        <div className="noise-overlay" />
        
        {/* Lenis smooth scrolling container */}
        <SmoothScroll>
          <ThemeProvider>{children}</ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}


