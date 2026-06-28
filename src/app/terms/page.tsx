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
                Welcome to RVS Craft Interiors. By accessing our website and engaging with our spatial design, space planning, modular kitchen, or turnkey project execution capabilities, you agree to comply with and be bound by the following Terms &amp; Conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">2. Professional Services &amp; Consultations</h2>
              <p>
                Our studio provides architectural interior design consultations, 2D/3D layout drafting, and turnkey execution management. While we make every attempt to ensure timelines and deliverables align perfectly with proposal agreements, schedules may occasionally fluctuate due to vendor procurements, site conditions, or design adjustments requested during site supervisions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">3. Intellectual Property Rights</h2>
              <p>
                All content on this site (including images, spatial text layouts, and project names) and all design deliverables (including false ceiling blueprints, furniture sketches, space zoning plans, and technical layouts) created by RVS Craft Interiors remain our exclusive intellectual property. 
              </p>
              <p>
                You are granted a limited license to implement the designs at the specific project site contracted. You may not reproduce, resell, or distribute these drawings or visual assets for other residential or commercial purposes without our explicit written consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">4. Payment &amp; Procurement Terms</h2>
              <p>
                All payments for consultations, design phases, and material procurements must be completed in accordance with the milestones outlined in your custom project proposal. Materials will only be procured and dispatched to sites after the corresponding milestone payments are received. Payments are non-refundable once design and material production has commenced.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">5. Liability Limitations</h2>
              <p>
                RVS Craft Interiors coordinates with premium third-party vendor agencies, structural contractors, and materials suppliers. While we supervise all site executions to ensure standard specifications are met, we are not directly liable for defects, delays, or structural damage caused directly by external vendor builders or forces outside our immediate operational control.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">6. Jurisdiction &amp; Governing Law</h2>
              <p>
                These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes, grievances, or legal claims arising from our design agreements or web services will be subject exclusively to the jurisdiction of the courts located in Bengaluru, Karnataka, India.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
