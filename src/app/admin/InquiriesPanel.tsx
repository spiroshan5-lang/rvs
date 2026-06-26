'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction, deleteInquiryAction, updateInquiryStatusAction } from './actions';
import {
  Mail, Phone, MapPin, Trash2, RefreshCw, ChevronDown, ChevronUp,
  LogOut, User, IndianRupee, Activity, List, Clock, CheckCircle2,
  Circle, AlertCircle, XCircle, ArrowRight,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  new:           'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  contacted:     'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  closed:        'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
};

const STATUS_LOG_ICON: Record<string, React.ReactNode> = {
  new:           <Circle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />,
  contacted:     <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />,
  'in-progress': <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />,
  closed:        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />,
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

type Tab = 'inquiries' | 'logs';

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function InquiriesPanel({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries]   = useState<Inquiry[]>(initialInquiries);
  const [expanded,  setExpanded]    = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab]   = useState<Tab>('inquiries');
  const router = useRouter();

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

  // Sort inquiries newest-first for logs view
  const logsSorted = [...inquiries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[var(--gold-border)] pb-6">
          <div>
            <h1 className="font-serif text-4xl tracking-wide text-[var(--gold)]">Admin Dashboard</h1>
            <p className="text-sm text-[var(--fg)]/50 mt-1 font-light tracking-wider">RVS Craft Interiors — Control Panel</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

        {/* Tab switcher */}
        <div className="flex items-center gap-1 mb-8 p-1 bg-[var(--bg-alt)] border border-[var(--gold-border)] rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'inquiries'
                ? 'bg-[#c9a86a] text-[#0B0B0B]'
                : 'text-[var(--fg)]/50 hover:text-[var(--fg)]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
              activeTab === 'logs'
                ? 'bg-[#c9a86a] text-[#0B0B0B]'
                : 'text-[var(--fg)]/50 hover:text-[var(--fg)]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Submission Logs
            {inquiries.length > 0 && (
              <span className="ml-1 bg-[var(--gold-border)] text-[var(--fg)]/60 text-[9px] px-1.5 py-0.5 rounded-full">
                {inquiries.length}
              </span>
            )}
          </button>
        </div>

        {/* ─────────────────────── INQUIRIES TAB ─────────────────────── */}
        <AnimatePresence mode="wait">
          {activeTab === 'inquiries' && (
            <motion.div
              key="inquiries"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
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
                              <div className="bg-[var(--bg)] border border-[var(--gold-border)]/30 rounded-xl p-4">
                                <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--fg)]/30 mb-2">Message</p>
                                <p className="text-sm font-light leading-relaxed text-[var(--fg)]/80">{inq.message}</p>
                              </div>
                              <div className="flex items-center justify-between flex-wrap gap-3">
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
                                <div className="flex items-center gap-2">
                                  <a
                                    href={`mailto:${inq.email}?subject=Re: Your Interior Design Inquiry - RVS Craft Interiors`}
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
            </motion.div>
          )}

          {/* ─────────────────────── LOGS TAB ─────────────────────── */}
          {activeTab === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Terminal header */}
              <div className="rounded-2xl overflow-hidden border border-[var(--gold-border)]">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--gold-border)] bg-[var(--bg-alt)]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="ml-3 text-[10px] tracking-[0.25em] uppercase text-[var(--fg)]/30 font-mono">
                    firebase://rvs-db/inquiries — live feed
                  </span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 tracking-wider uppercase font-mono">connected</span>
                  </div>
                </div>

                {logsSorted.length === 0 ? (
                  <div className="py-20 text-center bg-[var(--bg)]">
                    <XCircle className="w-8 h-8 mx-auto mb-3 text-[var(--fg)]/20" />
                    <p className="text-xs font-mono text-[var(--fg)]/30 tracking-widest">NO RECORDS FOUND</p>
                  </div>
                ) : (
                  <div className="bg-[var(--bg)] divide-y divide-[var(--gold-border)]/20">
                    {logsSorted.map((inq, idx) => (
                      <motion.div
                        key={inq.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="px-5 py-4 hover:bg-[#c9a86a]/3 transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          {/* Timeline dot */}
                          <div className="flex flex-col items-center mt-1 flex-shrink-0">
                            {STATUS_LOG_ICON[inq.status] || <Circle className="w-3.5 h-3.5 text-[var(--fg)]/20 flex-shrink-0" />}
                            {idx < logsSorted.length - 1 && (
                              <div className="w-px flex-1 min-h-[24px] mt-1 bg-[var(--gold-border)]/20" />
                            )}
                          </div>

                          {/* Log entry */}
                          <div className="flex-1 min-w-0 pb-2">
                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1">
                              {/* Log index */}
                              <span className="font-mono text-[9px] text-[var(--fg)]/20 select-none">
                                #{String(logsSorted.length - idx).padStart(3, '0')}
                              </span>
                              {/* Timestamp */}
                              <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--fg)]/40">
                                <Clock className="w-2.5 h-2.5" />
                                {formatDateTime(inq.submittedAt)}
                              </span>
                              <span className="font-mono text-[9px] text-[var(--fg)]/25">({timeAgo(inq.submittedAt)})</span>
                              {/* Status badge */}
                              <span className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full border font-mono ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                                {inq.status}
                              </span>
                            </div>

                            {/* Main log line */}
                            <p className="font-mono text-sm text-[var(--fg)]/80 leading-relaxed">
                              <span className="text-[var(--gold)]">{inq.name}</span>
                              <span className="text-[var(--fg)]/30 mx-1.5">&lt;</span>
                              <a href={`mailto:${inq.email}`} className="text-blue-400/70 hover:text-blue-400 transition-colors text-xs">
                                {inq.email}
                              </a>
                              <span className="text-[var(--fg)]/30 mx-1.5">&gt;</span>
                              <span className="text-[var(--fg)]/40 text-xs">submitted inquiry</span>
                            </p>

                            {/* Meta line */}
                            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                              <span className="font-mono text-[10px] text-[var(--fg)]/35">
                                <span className="text-[var(--fg)]/20">budget:</span> {inq.budget}
                              </span>
                              <span className="font-mono text-[10px] text-[var(--fg)]/35">
                                <span className="text-[var(--fg)]/20">phone:</span> {inq.phone}
                              </span>
                              <span className="font-mono text-[10px] text-[var(--fg)]/35">
                                <span className="text-[var(--fg)]/20">location:</span> {inq.location}
                              </span>
                              <span className="font-mono text-[10px] text-[var(--fg)]/25">
                                <span className="text-[var(--fg)]/15">id:</span> {inq.id.substring(0, 12)}...
                              </span>
                            </div>

                            {/* Message preview */}
                            <p className="mt-2 font-mono text-[11px] text-[var(--fg)]/30 leading-relaxed line-clamp-2 italic">
                              &quot;{inq.message}&quot;
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                              href={`mailto:${inq.email}?subject=Re: Your Interior Design Inquiry - RVS Craft Interiors`}
                              className="p-2 rounded-lg border border-[var(--gold-border)] hover:bg-[#c9a86a]/10 text-[var(--gold)] transition-colors"
                              title="Reply"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                {logsSorted.length > 0 && (
                  <div className="px-5 py-3 border-t border-[var(--gold-border)] bg-[var(--bg-alt)] flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[var(--fg)]/25 tracking-widest">
                      {logsSorted.length} record{logsSorted.length !== 1 ? 's' : ''} total
                    </span>
                    <span className="font-mono text-[9px] text-[var(--fg)]/25">
                      last updated: {formatDateTime(logsSorted[0]?.submittedAt)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
