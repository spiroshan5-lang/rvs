'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { submitInquiryAction } from '@/app/admin/actions';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    budget: 'Under 5L',
    location: '',
    message: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsSubmitted(false);
    setError('');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    // Save to Firebase database first
    const res = await submitInquiryAction(formState);
    setIsPending(false);

    if (res.success) {
      setIsSubmitted(true);
      
      // Build WhatsApp message
      const textMsg = 
`Hi RVS Craft Interiors! 

I'd like to book a design consultation. Here are my details:
• Name: ${formState.name}
• Email: ${formState.email}
• Phone: ${formState.phone}
• Location: ${formState.location}
• Budget: ${formState.budget}

Message: 
${formState.message}`;

      const waUrl = 'https://wa.me/919591685465?text=' + encodeURIComponent(textMsg);
      
      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');
      
      // Clear form
      setFormState({
        name: '',
        email: '',
        phone: '',
        budget: 'Under 5L',
        location: '',
        message: '',
      });

      // Auto close after brief delay
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    } else {
      setError(res.error || 'Failed to submit. Please try again.');
    }
  };

  return (
    <>
      <AnimatePresence>
        {visible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0B0B0B]/90 backdrop-blur-sm text-white text-xs rounded-xl px-3 py-2 whitespace-nowrap border border-white/10 shadow-xl"
                >
                  Chat with us on WhatsApp
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleOpen}
              aria-label="Open WhatsApp Form"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl cursor-pointer"
              style={{ background: '#25D366' }}
            >
              <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#25D366' }} />
              <span className="absolute inset-[-4px] rounded-full opacity-20 animate-pulse" style={{ background: '#25D366' }} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7 relative z-10"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[var(--bg-alt)] border border-[var(--gold-border)] rounded-[2rem] p-6 md:p-8 w-full max-w-xl relative z-10 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--gold)]/10 text-[var(--fg)]/70 hover:text-[var(--gold)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-[var(--fg)]">Design Enquiry</h3>
                  <p className="text-[10px] tracking-wider uppercase text-[var(--fg)]/50">WhatsApp Consultation Form</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <h4 className="font-serif text-xl font-light">Redirecting to WhatsApp...</h4>
                  <p className="text-xs text-[var(--fg)]/60 max-w-xs leading-relaxed">
                    We have saved your details securely and are opening WhatsApp to finalize your consultation request.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Full Name</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-2 text-xs font-light outline-none transition-colors w-full"
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Email Address</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-2 text-xs font-light outline-none transition-colors w-full"
                        placeholder="john@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Phone Number</label>
                      <input
                        type="tel" required
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-2 text-xs font-light outline-none transition-colors w-full"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Project Location</label>
                      <input
                        type="text" required
                        value={formState.location}
                        onChange={e => setFormState({ ...formState, location: e.target.value })}
                        className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-2 text-xs font-light outline-none transition-colors w-full"
                        placeholder="City, State"
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Budget Range</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Under 5L', '5-10L', '10-25L', 'Above 25L'].map(budgetOption => (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() => setFormState({ ...formState, budget: budgetOption })}
                          className={'py-2 px-3 rounded-lg text-[10px] tracking-wider border transition-all cursor-pointer ' + (
                            formState.budget === budgetOption
                              ? 'bg-[#c9a86a]/10 border-[#c9a86a] text-[var(--gold)]'
                              : 'bg-transparent border-[var(--nav-border)] text-[var(--fg)]/60 hover:border-[var(--fg)]/30'
                          )}
                        >
                          {budgetOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light">Tell us about your space</label>
                    <textarea
                      required
                      rows={3}
                      maxLength={500}
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                      className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-2 text-xs font-light outline-none transition-colors resize-none w-full"
                      placeholder="Brief description of your design needs..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-[10px] text-center bg-red-400/10 py-1.5 px-3 rounded-lg">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba56] disabled:opacity-60 text-white py-3 rounded-xl text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 group shadow-lg shadow-[#25D366]/10 cursor-pointer"
                  >
                    {isPending ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Saving...</span></>
                    ) : (
                      <><span>Continue on WhatsApp</span><Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
