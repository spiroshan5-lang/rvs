import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        {/* Subtle, expensive paper texture overlay */}
        <div className="noise-overlay" />
        
        {/* Lenis smooth scrolling container */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
