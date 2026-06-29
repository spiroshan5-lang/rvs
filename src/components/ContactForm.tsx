'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, MessageCircle } from 'lucide-react';
import { submitInquiryAction } from '@/app/admin/actions';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    budget: 'Under 5L',
    service: 'Residential',
    location: '',
    message: '',
  });


  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [waLink, setWaLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');
    
    const result = await submitInquiryAction(formState);
    setIsLoading(false);
    
    if (result.success) {
      // Build detailed WhatsApp message content
      const textMsg = 
`Hi RVS Craft Interiors! 

I've submitted a design inquiry on your website:
• Name: ${formState.name}
• Email: ${formState.email}
• Phone: ${formState.phone}
• Location: ${formState.location}
• Service: ${formState.service}
• Budget: ${formState.budget}

Message: 
${formState.message || '(Not specified)'}`;

      const targetWaUrl = 'https://wa.me/919591685465?text=' + encodeURIComponent(textMsg);
      setWaLink(targetWaUrl);
      setIsSubmitted(true);
      
      // Attempt automatic redirect to WhatsApp
      try {
        window.open(targetWaUrl, '_blank');
      } catch (err) {
        console.error('WhatsApp popup blocked:', err);
      }
    } else {
      setSubmitError(result.error || 'Failed to submit. Please try again.');
    }
  };

  const inputCls = "bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors w-full";
  const labelCls = "text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/50 font-light";

  return (
    <div className="lg:col-span-7">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--bg-alt)] border border-[var(--gold-border)] rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#c9a86a]/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h3 className="font-serif text-2xl font-light">Inquiry Submitted</h3>
          <p className="text-sm font-light text-[var(--fg)]/60 max-w-sm leading-relaxed">
            Thank you! Your details have been sent to our email and saved to our database. 
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all hover:opacity-90 shadow-lg shadow-[#25D366]/10"
            style={{ background: '#25D366', color: 'white' }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp</span>
          </a>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--bg-alt)]/40 border border-[var(--nav-border)] rounded-[2rem] p-8 md:p-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-2">
              <label className={labelCls}>Full Name</label>
              <input
                type="text" required
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                className={inputCls}
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className={labelCls}>Email Address</label>
              <input
                type="email" required
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                className={inputCls}
                placeholder="john@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-2">
              <label className={labelCls}>Phone Number</label>
              <input
                type="tel" required
                value={formState.phone}
                onChange={e => setFormState({ ...formState, phone: e.target.value })}
                className={inputCls}
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className={labelCls}>Project Location</label>
              <input
                type="text" required
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
                className={inputCls}
                placeholder="City, State"
                autoComplete="address-level2"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <label className={labelCls}>Service Interested In</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Residential', 'Commercial', 'Modular Kitchen', 'Other'].map((serviceOption) => (
                <button key={serviceOption} type="button"
                  onClick={() => setFormState({...formState, service: serviceOption})}
                  className={`py-3 px-2 rounded-xl text-[10px] text-center tracking-wider border transition-all cursor-pointer ${
                    formState.service === serviceOption 
                      ? 'bg-[#c9a86a]/10 border-[#c9a86a] text-[var(--gold)]' 
                      : 'bg-transparent border-[var(--nav-border)] text-[var(--fg)]/60 hover:border-[var(--fg)]/30'
                  }`}
                >
                  {serviceOption}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <label className={labelCls}>Budget Range</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Under 5L', '5-10L', '10-25L', 'Above 25L'].map(budgetOption => (
                <button
                  key={budgetOption}
                  type="button"
                  onClick={() => setFormState({ ...formState, budget: budgetOption })}
                  className={`py-3 px-4 rounded-xl text-xs tracking-wider border transition-all cursor-pointer ${
                    formState.budget === budgetOption
                      ? 'bg-[#c9a86a]/10 border-[#c9a86a] text-[var(--gold)]'
                      : 'bg-transparent border-[var(--nav-border)] text-[var(--fg)]/60 hover:border-[var(--fg)]/30'
                  }`}
                >
                  {budgetOption}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className={labelCls}>Tell us about your space</label>
              <span className={`text-[9px] font-mono ${formState.message.length > 450 ? 'text-amber-400' : 'text-[var(--fg)]/25'}`}>
                {formState.message.length}/500
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={500}
              value={formState.message}
              onChange={e => setFormState({ ...formState, message: e.target.value })}
              className="bg-transparent border-b border-[var(--nav-border)] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors resize-none w-full"
              placeholder="Describe your vision, dimensions, or specific design challenges..."
            />
          </div>

          {submitError && (
            <p className="text-red-400 text-xs text-center bg-red-400/10 py-2 px-4 rounded-lg">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-[#c9a86a] hover:bg-[#b08e50] disabled:opacity-60 text-[#0B0B0B] py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 group shadow-lg shadow-[#c9a86a]/10 cursor-pointer"
          >
            {isLoading ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Submitting...</span></>
            ) : (
              <><span>Submit Inquiry</span></>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
