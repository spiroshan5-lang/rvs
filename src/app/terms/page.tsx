'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
              Terms &amp; <span className="italic font-normal text-[var(--gold)]">Conditions</span>
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-[var(--fg)]/40 mt-4 uppercase">
              Last Updated: June 28, 2026
            </p>
          </div>

          <div className="space-y-8 text-sm font-light leading-relaxed text-[var(--fg)]/80 tracking-wide border-t border-[var(--gold-border)]/20 pt-8">
            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">1. Agreement to Terms</h2>
              <p>
                Welcome to RVS Craft Interiors. These Terms govern your use of our website and our professional services, including residential interior design, space planning layout curation, and custom modular kitchens.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">2. Consultations &amp; Submissions</h2>
              <p>
                By submitting inquiries through our contact forms, you agree to provide accurate and active email and phone contact details. Submission details are processed server-side via Firebase RTDB to initialize your design consultation file.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">3. Intellectual Property of Designs</h2>
              <p>
                All materials, including website content, layout images served via Cloudinary, and spatial blueprints, are owned by RVS Craft Interiors. 
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Any custom 2D layouts, false ceiling diagrams, lighting systems, or 3D furniture renders supplied during your project remain our intellectual property.
                </li>
                <li>
                  You are granted a license to use these files solely for execution at the contracted project site. You may not distribute, replicate, or resell our designs for external projects without our written authorization.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">4. Execution Milestones &amp; Payments</h2>
              <p>
                Project supervision is structured around phased design milestones. Payments are non-refundable once site design drafts, layout selections, or custom procurement files have been finalized. Timelines discussed are estimations and may adapt to site conditions in Bengaluru.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">5. Third-Party Integrations Liability</h2>
              <p>
                We use secure integrations like Cloudinary, Firebase, and WhatsApp to optimize your experience. While we select reliable providers, we are not responsible for global network outages or API faults in these external services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">6. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any claims, disagreements, or legal proceedings regarding our web assets or physical executions will be subject exclusively to the courts of Bengaluru, Karnataka, India.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
