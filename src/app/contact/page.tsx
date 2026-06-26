import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | RVS Craft Interiors | Luxury Spatial Architecture Studio',
  description: 'Connect with RVS Craft Interiors. Fill out our spatial design consultation form, and our design coordinators will connect with you within 48 hours.',
  keywords: ['contact interior designer', 'luxury interiors consultation', 'RVS Craft Interiors contact', 'interior design inquiry'],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen text-[var(--fg)] transition-colors duration-300" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[var(--gold)] mb-4 block">
              Inquire
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-wide">
              Let&apos;s Create Your <br />
              <span className="italic font-normal text-[var(--gold)]">Sanctuary</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 flex flex-col space-y-12">
              <p className="text-base md:text-lg font-light leading-relaxed text-[var(--fg)]/70 tracking-wide">
                Have a project in mind, or want to explore architectural possibilities? Fill out the inquiry form, and our design consultation team will connect with you within 48 hours.
              </p>

              <div className="flex flex-col space-y-8 pt-8 border-t border-[var(--gold-border)]">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-1">Email Us</h3>
                    <a href="mailto:hello@rvscraftinteriors.com" className="text-base font-light hover:text-[var(--gold)] transition-colors">
                      hello@rvscraftinteriors.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-1">Call Us</h3>
                    <a href="tel:+919591685465" className="text-base font-light hover:text-[var(--gold)] transition-colors">
                      +91 9591685465
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
