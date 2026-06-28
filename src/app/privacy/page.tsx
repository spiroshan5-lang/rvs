'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-[var(--fg)] transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-4 block">
              Legal
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide">
              Privacy <span className="italic font-normal text-[var(--gold)]">Policy</span>
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-[var(--fg)]/40 mt-4 uppercase">
              Last Updated: June 28, 2026
            </p>
          </div>

          <div className="space-y-8 text-sm font-light leading-relaxed text-[var(--fg)]/80 tracking-wide border-t border-[var(--gold-border)]/20 pt-8">
            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">1. Introduction</h2>
              <p>
                RVS Craft Interiors (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates as a luxury interior design atelier based in Bengaluru, India. We are committed to protecting your privacy and ensuring a transparent and secure relationship when you interact with our website and spatial design services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">2. Information We Collect</h2>
              <p>
                We only collect personal information that you voluntarily provide to us when submitting inquiries, requesting design consultations, or contacting us:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>**Contact Details**: Name, email address, phone number.</li>
                <li>**Project Specifications**: Location of properties, design requirements, spatial preferences, and budget ranges.</li>
                <li>**Analytics Data**: IP addresses, browser types, and navigation history collected through Google Analytics to optimize page load speeds and overall user experience.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">3. How We Use Your Information</h2>
              <p>
                Your information is processed for specific, legitimate business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To schedule spatial design consultations and coordinate design reviews.</li>
                <li>To respond to contact form submissions, inquiries, and customer requests.</li>
                <li>To optimize website layouts, load performance, and spatial media rendering.</li>
                <li>To comply with regulatory obligations and legal requirements in India.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">4. Data Sharing and Protection</h2>
              <p>
                We do not sell, rent, or trade your personal information. We employ robust security measures (including rate limits, access controls, and encrypted environment configurations) to prevent unauthorized access, alteration, or exposure of your data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">5. Cookies and Google Analytics</h2>
              <p>
                Our site uses cookies to enhance page transitions, persist user themes (light/dark mode), and collect traffic data through Google Analytics. You can adjust your browser settings to refuse cookies, though some features (such as transition animations or theme memory) may experience minor layout updates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">6. Contact and Grievances</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out to us at:
              </p>
              <div className="font-mono text-xs p-4 bg-[var(--bg-alt)] border border-[var(--gold-border)]/35 rounded-lg space-y-1">
                <p>**Email**: queriesrvs@gmail.com</p>
                <p>**Call**: +91 9591685465</p>
                <p>**Address**: Bengaluru, Karnataka, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
