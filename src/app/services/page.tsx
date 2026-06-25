'use client';

import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <div className=" min-h-screen text-[var(--fg)] transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-24">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
