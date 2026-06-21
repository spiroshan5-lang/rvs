'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    budget: 'Under 5L', 
    location: '', 
    message: '' 
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F0]">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            <span className="text-[10px] tracking-[0.3em] uppercase font-light text-[#c9a86a] mb-4 block">
              Inquire
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-wide">
              Let's Create Your <br />
              <span className="italic font-normal text-[#c9a86a]">Sanctuary</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left side: Contact Info */}
            <div className="lg:col-span-5 flex flex-col space-y-12">
              <p className="text-base md:text-lg font-light leading-relaxed text-[#F5F5F0]/70 tracking-wide">
                Have a project in mind, or want to explore architectural possibilities? Fill out the inquiry form, and our design consultation team will connect with you within 48 hours.
              </p>

              <div className="flex flex-col space-y-8 pt-8 border-t border-[#c9a86a]/15">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#c9a86a]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-[#c9a86a]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#c9a86a] mb-1">Email Us</h3>
                    <a href="mailto:hello@rvscraftinteriors.com" className="text-base font-light hover:text-[#c9a86a] transition-colors">
                      hello@rvscraftinteriors.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full border border-[#c9a86a]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-4 h-4 text-[#c9a86a]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#c9a86a] mb-1">Call Us</h3>
                    <a href="tel:+919591685465" className="text-base font-light hover:text-[#c9a86a] transition-colors">
                      +91 9591685465
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#111111] border border-[#c9a86a]/20 rounded-[2rem] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c9a86a]/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#c9a86a]" />
                  </div>
                  <h3 className="font-serif text-2xl font-light">Inquiry Received</h3>
                  <p className="text-sm font-light text-[#F5F5F0]/60 max-w-sm leading-relaxed">
                    Thank you for connecting. Our design coordinators will review your project requirements and touch base shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 bg-[#111111]/40 border border-[#333333] rounded-[2rem] p-8 md:p-12 backdrop-blur-md">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="bg-transparent border-b border-[#333333] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="bg-transparent border-b border-[#333333] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Location Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone Number */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formState.phone}
                        onChange={e => setFormState({...formState, phone: e.target.value})}
                        className="bg-transparent border-b border-[#333333] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Project Location Address */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Project Location Address</label>
                      <input 
                        type="text" 
                        required
                        value={formState.location}
                        onChange={e => setFormState({...formState, location: e.target.value})}
                        className="bg-transparent border-b border-[#333333] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors"
                        placeholder="City, State / Full Address"
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="flex flex-col space-y-3">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Budget Range</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Under 5L', '5-10L', '10-25L', 'Above 25L'].map((budgetOption) => (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() => setFormState({...formState, budget: budgetOption})}
                          className={`py-3 px-4 rounded-xl text-xs tracking-wider border transition-all cursor-pointer ${
                            formState.budget === budgetOption 
                              ? 'bg-[#c9a86a]/10 border-[#c9a86a] text-[#c9a86a]' 
                              : 'bg-transparent border-[#333333] text-[#F5F5F0]/60 hover:border-[#F5F5F0]/30'
                          }`}
                        >
                          {budgetOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-[0.2em] uppercase text-[#F5F5F0]/50 font-light">Tell us about your space</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      className="bg-transparent border-b border-[#333333] focus:border-[#c9a86a] py-3 text-sm font-light outline-none transition-colors resize-none"
                      placeholder="Describe your vision, dimensions, or specific design challenges..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center space-x-3 bg-[#c9a86a] hover:bg-[#b08e50] text-[#0B0B0B] py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 group shadow-lg shadow-[#c9a86a]/10 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer showCTA={false} />
    </div>
  );
}
