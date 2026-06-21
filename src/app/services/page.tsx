'use client';

import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F0]">
      <Navbar />
      <main className="pt-24">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
