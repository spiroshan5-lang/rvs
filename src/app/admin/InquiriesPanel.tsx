'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction, deleteInquiryAction, updateInquiryStatusAction } from './actions';
import type { CMSHeroSlide, CMSGalleryCard } from './actions';
import { HeroCMSPanel, GalleryCMSPanel } from './CMSPanel';
import {
  Mail, Trash2, RefreshCw, ChevronDown, ChevronUp,
  LogOut, User, IndianRupee, Activity, List, Clock, CheckCircle2,
  Circle, AlertCircle, XCircle, ArrowRight, Sparkles, GalleryHorizontal,
  Phone, MapPin,
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
  service: string;
  message: string;
  status: string;
  submittedAt: string;
}

type MainTab = 'inquiries' | 'logs' | 'hero-cms' | 'gallery-cms';

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

interface InquiriesPanelProps {
  initialInquiries: Inquiry[];
  initialHeroSlides: CMSHeroSlide[];
  initialGalleryCards: CMSGalleryCard[];
}

export default function InquiriesPanel({ initialInquiries, initialHeroSlides, initialGalleryCards }: InquiriesPanelProps) {
  const [inquiries, setInquiries]   = useState<Inquiry[]>(initialInquiries);
  const [expanded,  setExpanded]    = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab]   = useState<MainTab>('inquiries');
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

  const logsSorted = [...inquiries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  // Tab config
  const tabs: { id: MainTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'inquiries',   label: 'Inquiries',        icon: <List className="w-3.5 h-3.5" />,            badge: inquiries.filter(i => i.status === 'new').length || undefined },
    { id: 'logs',        label: 'Submission Logs',  icon: <Activity className="w-3.5 h-3.5" />,        badge: inquiries.length || undefined },
    { id: 'hero-cms',    label: 'Hero Slides',      icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'gallery-cms', label: 'Gallery Images',   icon: <GalleryHorizontal className="w-3.5 h-3.5" /> },
  ];

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
        <div className="flex items-center gap-1 mb-8 p-1 bg-[var(--bg-alt)] border border-[var(--gold-border)] rounded-xl w-fit flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#c9a86a] text-[#0B0B0B]'
                  : 'text-[var(--fg)]/50 hover:text-[var(--fg)]'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`ml-1 text-[9px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-[#0B0B0B]/20 text-[#0B0B0B]'
                    : 'bg-[var(--gold-border)] text-[var(--fg)]/60'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── TAB CONTENT ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* INQUIRIES TAB */}
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
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-medium text-[var(--fg)]">{inq.name}</span>
                            <span className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full border font-mono ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                              {inq.status}
                            </span>
                            <span className="text-xs text-[var(--fg)]/40 font-mono flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {timeAgo(inq.submittedAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 flex-wrap">
                            <a href={`mailto:${inq.email}`} className="text-xs text-blue-400/60 hover:text-blue-400 font-mono flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              <Mail className="w-3 h-3" />{inq.email}
                            </a>
                            <span className="text-xs text-[var(--fg)]/35 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3" />{inq.phone}
                            </span>
                            <span className="text-xs text-[var(--fg)]/35 font-mono flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{inq.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <IndianRupee className="w-3 h-3 text-[var(--gold)]/50" />
                          <span className="text-xs text-[var(--gold)] font-mono">{inq.service}</span>
                            <span className="text-[var(--fg)]/20 font-mono">&middot;</span>
                            <span className="text-xs text-[var(--fg)]/50 font-mono">{inq.budget}</span>
                          {expanded === inq.id ? <ChevronUp className="w-4 h-4 text-[var(--fg)]/30" /> : <ChevronDown className="w-4 h-4 text-[var(--fg)]/30" />}
                        </div>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {expanded === inq.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-[var(--gold-border)]/30"
                          >
                            <div className="px-5 py-4 space-y-4">
                              <p className="text-sm text-[var(--fg)]/70 leading-relaxed italic">&quot;{inq.message}&quot;</p>
                              <div className="text-xs text-[var(--fg)]/40 font-mono">
                                Submitted: {formatDateTime(inq.submittedAt)} · ID: {inq.id}
                              </div>
                              <div className="flex items-center gap-3 flex-wrap">
                                {/* Status changer */}
                                <div className="flex items-center gap-1 p-1 bg-[var(--bg)] border border-[var(--gold-border)] rounded-lg">
                                  {STATUSES.map(s => (
                                    <button
                                      key={s}
                                      onClick={() => handleStatusChange(inq.id, s)}
                                      className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase font-mono transition-all ${
                                        inq.status === s
                                          ? STATUS_COLORS[s] + ' border'
                                          : 'text-[var(--fg)]/30 hover:text-[var(--fg)]/60'
                                      }`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                                <a
                                  href={`mailto:${inq.email}?subject=Re: Your Interior Design Inquiry - RVS Craft Interiors`}
                                  className="flex items-center gap-1.5 text-xs border border-[var(--gold-border)] px-3 py-1.5 rounded-lg text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors"
                                >
                                  <Mail className="w-3 h-3" /> Reply
                                </a>
                                <button
                                  onClick={() => handleDelete(inq.id)}
                                  className="flex items-center gap-1.5 text-xs border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
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

          {/* LOGS TAB */}
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
                              <span className="font-mono text-[9px] text-[var(--fg)]/20 select-none">
                                #{String(logsSorted.length - idx).padStart(3, '0')}
                              </span>
                              <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--fg)]/40">
                                <Clock className="w-2.5 h-2.5" />
                                {formatDateTime(inq.submittedAt)}
                              </span>
                              <span className="font-mono text-[9px] text-[var(--fg)]/25">({timeAgo(inq.submittedAt)})</span>
                              <span className={`text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full border font-mono ${STATUS_COLORS[inq.status] || STATUS_COLORS.new}`}>
                                {inq.status}
                              </span>
                            </div>

                            <p className="font-mono text-sm text-[var(--fg)]/80 leading-relaxed">
                              <span className="text-[var(--gold)]">{inq.name}</span>
                              <span className="text-[var(--fg)]/30 mx-1.5">&lt;</span>
                              <a href={`mailto:${inq.email}`} className="text-blue-400/70 hover:text-blue-400 transition-colors text-xs">
                                {inq.email}
                              </a>
                              <span className="text-[var(--fg)]/30 mx-1.5">&gt;</span>
                              <span className="text-[var(--fg)]/40 text-xs">submitted inquiry</span>
                            </p>

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

          {/* HERO CMS TAB */}
          {activeTab === 'hero-cms' && (
            <motion.div
              key="hero-cms"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <HeroCMSPanel initialSlides={initialHeroSlides} />
            </motion.div>
          )}

          {/* GALLERY CMS TAB */}
          {activeTab === 'gallery-cms' && (
            <motion.div
              key="gallery-cms"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryCMSPanel initialCards={initialGalleryCards} />
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
