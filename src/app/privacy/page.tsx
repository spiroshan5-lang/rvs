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
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">1. Overview</h2>
              <p>
                At RVS Craft Interiors (Bengaluru, India), we believe in transparency. This Privacy Policy details the exact data we collect, where it is stored, and the third-party integrations we utilize on our digital platform to deliver our luxury design and space planning services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">2. Data We Collect &amp; Third-Party Services We Use</h2>
              <p>
                We collect information when you fill out our Spatial Design Consultation Form, request project estimates, or browse our portfolio. We integrate the following secure services to handle your data:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Contact Inquiries (Firebase)</strong>: When you submit an inquiry form, the details (name, phone, email, project type, and description) are processed server-side and stored securely in our <strong>Firebase Realtime Database</strong>.
                </li>
                <li>
                  <strong>Email Notifications (Nodemailer)</strong>: Inquiry submissions trigger automatic administrative notifications forwarded securely to our team via <strong>Nodemailer SMTP (Gmail Integration)</strong>.
                </li>
                <li>
                  <strong>Visual Media Delivery (Cloudinary)</strong>: All portfolio images, false ceiling models, and interior design materials rendered on this site are hosted and served dynamically through <strong>Cloudinary CDN</strong> for high-resolution performance.
                </li>
                <li>
                  <strong>User Analytics (Google Analytics)</strong>: We use <strong>Google Analytics (gtag.js)</strong> with Measurement ID <code>G-V2SX8DH9SY</code> to capture anonymous browser behavior, page views, and traffic trends. No personally identifiable details are linked to these analytics reports.
                </li>
                <li>
                  <strong>Personalization &amp; Theme Caching (Local Storage)</strong>: We save your website appearance choice (Light/Dark mode) locally on your device via <strong>HTML5 Local Storage</strong> so it is remembered on subsequent visits.
                </li>
                <li>
                  <strong>Communication Redirects (WhatsApp)</strong>: We provide a direct communication channel via a <strong>WhatsApp Floating Icon</strong>. Scraping or clicking the button redirects you to the official WhatsApp application, which operates under its own end-to-end encryption and privacy parameters.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">3. Data Retention and Security</h2>
              <p>
                We do not sell, share, or trade client information with marketing agencies. Inquiry records stored in our Firebase database are restricted by server-level rules and admin credentials. We retain contact requests only as long as necessary to coordinate client consultations and manage ongoing design proposals.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">4. Consent and Opt-Out</h2>
              <p>
                By using our form, you consent to the storage of your inquiry info in our database and the delivery of emails to our design coordinates. You can disable cookies or clear local storage in your browser settings if you wish to opt-out of analytics and theme caching.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-lg text-[var(--fg)] tracking-wide font-medium">5. Legal Inquiries</h2>
              <p>
                For data access requests, corrections, or general questions regarding our privacy integrations, please contact us at:
              </p>
              <div className="font-mono text-xs p-4 bg-[var(--bg-alt)] border border-[var(--gold-border)]/35 rounded-lg space-y-1">
                <p>**Email**: rvsqueries@gmail.com</p>
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
