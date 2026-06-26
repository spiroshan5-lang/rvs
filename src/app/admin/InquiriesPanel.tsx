'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction, deleteInquiryAction, updateInquiryStatusAction } from './actions';
import { Mail, Phone, MapPin, Trash2, RefreshCw, ChevronDown, ChevronUp, LogOut, User, Calendar, IndianRupee } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  new:         'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  contacted:   'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  closed:      'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
};

const STATUSES = ['new', 'contacted', 'in-progress', 'closed'];

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  budget: string;
  message: string;
  status: string;
  submittedAt: string;
}

export default function InquiriesPanel({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries]   = useState<Inquiry[]>(initialInquiries);
  const [expanded,  setExpanded]    = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  async function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 1000);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this inquiry permanently?')) return;
    const res = await deleteInquiryAction(id);
    if (res.success) setInquiries((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleStatusChange(id: string, status: string) {
    const res = await updateInquiryStatusAction(id, status);
    if (res.success) {
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    }
  }

  async function handleLogout() {
    await logoutAction();
    router.refresh();
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-[var(--gold-border)] pb-6">
          <div>
            <h1 className="font-serif text-4xl tracking-wide text-[var(--gold)]">Admin Dashboard</h1>
            <p className="text-sm text-[var(--fg)]/50 mt-1 font-light tracking-wider">Customer Inquiries — RVS Craft Interiors</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 border border-[var(--gold-border)] hover:bg-[#c9a86a]/10 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATUSES.map((s) => {
            const count = inquiries.filter((i) => i.status === s).length;
            return (
              <div key={s} className="bg-[var(--bg-alt)] border border-[var(--gold-border)] rounded-xl p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--fg)]/40 mb-1">{s}</p>
                <p className="text-3xl font-serif text-[var(--gold)]">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Inquiry list */}
        {inquiries.length === 0 ? (
          <div className="text-center py-24 text-[var(--fg)]/30">
            <User className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="text-sm tracking-widest uppercase">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <motion.div
                key={inq.id}
                layout
                className="border border-[var(--gold-border)] rounded-2xl overflow-hidden bg-[var(--bg-alt)]"
              >
                {/* Row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#c9a86a]/5 transition-colors"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 text-xs font-semibold text-[var(--gold)] uppercase">
                    {inq.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{inq.name}</span>
                      <span className={`text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full border ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[var(--fg)]/50">{inq.email}</span>
                      <span className="text-[10px] text-[var(--fg)]/30">·</span>
                      <span className="text-xs text-[var(--fg)]/50">{new Date(inq.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] tracking-wider border border-[var(--gold-border)] text-[var(--gold)] px-2.5 py-1 rounded-full">
                      <IndianRupee className="w-2.5 h-2.5" />
                      {inq.budget}
                    </span>
                    {expanded === inq.id ? <ChevronUp className="w-4 h-4 text-[var(--fg)]/40" /> : <ChevronDown className="w-4 h-4 text-[var(--fg)]/40" />}
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded === inq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--gold-border)]/40 space-y-5">

                        {/* Contact details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-2.5 text-sm text-[var(--fg)]/70 hover:text-[var(--gold)] transition-colors group">
                            <Mail className="w-3.5 h-3.5 text-[var(--gold)] flex-shrink-0" />
                            <span className="truncate">{inq.email}</span>
                          </a>
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-2.5 text-sm text-[var(--fg)]/70 hover:text-[var(--gold)] transition-colors">
                            <Phone className="w-3.5 h-3.5 text-[var(--gold)] flex-shrink-0" />
                            {inq.phone}
                          </a>
                          <div className="flex items-center gap-2.5 text-sm text-[var(--fg)]/70">
                            <MapPin className="w-3.5 h-3.5 text-[var(--gold)] flex-shrink-0" />
                            <span className="truncate">{inq.location}</span>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="bg-[var(--bg)] border border-[var(--gold-border)]/30 rounded-xl p-4">
                          <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/30 mb-2">Message</p>
                          <p className="text-sm font-light leading-relaxed text-[var(--fg)]/80">{inq.message}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          {/* Status selector */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--fg)]/40">Set status:</span>
                            {STATUSES.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(inq.id, s)}
                                className={`text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all ${
                                  inq.status === s
                                    ? STATUS_COLORS[s]
                                    : 'border-[var(--gold-border)]/30 text-[var(--fg)]/40 hover:border-[var(--gold-border)]'
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>

                          {/* Quick reply + Delete */}
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${inq.email}?subject=Re: Your Interior Design Inquiry — RVS Craft Interiors`}
                              className="flex items-center gap-2 bg-[#c9a86a] hover:bg-[#b08e50] text-[#0B0B0B] px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors"
                            >
                              <Mail className="w-3 h-3" /> Reply
                            </a>
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="flex items-center gap-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 px-3 py-2 rounded-lg text-xs transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
