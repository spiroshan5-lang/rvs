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

              <div className="flex flex-col space-y-6 pt-8 border-t border-[var(--gold-border)]">
                {/* Email Us */}
                <a href="mailto:queriesrvs@gmail.com" className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <Mail className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-0.5">Email Us</h3>
                    <span className="text-[9px] text-[var(--fg)]/40 block mb-1 font-mono uppercase tracking-wider">Click to email us</span>
                    <span className="text-base font-light group-hover:text-[var(--gold)] transition-colors duration-300">
                      queriesrvs@gmail.com
                    </span>
                  </div>
                </a>

                {/* Call Us */}
                <a href="tel:+919591685465" className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <Phone className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-0.5">Call Us</h3>
                    <span className="text-[9px] text-[var(--fg)]/40 block mb-1 font-mono uppercase tracking-wider">Click to call us</span>
                    <span className="text-base font-light group-hover:text-[var(--gold)] transition-colors duration-300">
                      +91 9591685465
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/919591685465" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.111-2.879-6.974-1.859-1.863-4.331-2.887-6.97-2.888-5.441 0-9.87 4.42-9.874 9.86-.001 1.748.459 3.454 1.332 4.965l-.973 3.548 3.65-.957zm11.237-7.614c-.3-.15-1.772-.875-2.046-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.488-.891-.795-1.493-1.777-1.668-2.077-.175-.3-.018-.463.13-.61.134-.133.3-.349.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.925-2.225-.244-.589-.493-.51-.674-.519-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.116 4.525.715.31 1.273.495 1.708.633.718.228 1.37.196 1.885.119.574-.085 1.772-.725 2.022-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-0.5">WhatsApp</h3>
                    <span className="text-[9px] text-[var(--fg)]/40 block mb-1 font-mono uppercase tracking-wider">Click to chat with us</span>
                    <span className="text-base font-light group-hover:text-[var(--gold)] transition-colors duration-300">
                      +91 9591685465
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/rvs_craftedinteriors/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-0.5">Instagram</h3>
                    <span className="text-[9px] text-[var(--fg)]/40 block mb-1 font-mono uppercase tracking-wider">Click to follow us</span>
                    <span className="text-base font-light group-hover:text-[var(--gold)] transition-colors duration-300">
                      @rvs_craftedinteriors
                    </span>
                  </div>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/share/1Gqkm9RypS/" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-[var(--gold)] transition-colors duration-300">
                    <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[var(--gold)] mb-0.5">Facebook</h3>
                    <span className="text-[9px] text-[var(--fg)]/40 block mb-1 font-mono uppercase tracking-wider">Click to connect with us</span>
                    <span className="text-base font-light group-hover:text-[var(--gold)] transition-colors duration-300">
                      RVS Crafted Interiors
                    </span>
                  </div>
                </a>
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
