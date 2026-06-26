'use client';

import { useState, useEffect, useTransition } from 'react';
import { getInquiriesAction, deleteInquiryAction, updateInquiryStatusAction } from './actions';
import { Mail, Phone, MapPin, DollarSign, MessageSquare, Trash2, RefreshCw, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  location: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
};

const STATUS_COLORS: Record<string, string> = {
  'new': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  'contacted': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'closed': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export default function InquiriesPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    setLoading(true);
    setError('');
    const result = await getInquiriesAction();
    if (result.success) {
      setInquiries(result.data as Inquiry[]);
    } else {
      setError(result.error || 'Failed to load inquiries');
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this inquiry? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteInquiryAction(id);
      setInquiries(prev => prev.filter(i => i.id !== id));
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    startTransition(async () => {
      await updateInquiryStatusAction(id, status);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: status as Inquiry['status'] } : i));
    });
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return iso; }
  };

  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <section className="mb-16 bg-[var(--gold-muted)]/50 border border-[var(--gold-border)] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-serif">Customer Inquiries</h2>
            {newCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {newCount} New
              </span>
            )}
          </div>
          <p className="text-sm text-[--fg-muted] mt-1">View and manage contact form submissions from customers.</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 border border-[var(--gold-border)] text-[var(--gold)] px-4 py-2 rounded-lg text-sm hover:bg-[#c9a86a]/10 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-6 h-6 animate-spin text-[var(--gold)]" />
          <span className="ml-3 text-sm text-[--fg-muted]">Loading inquiries...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-400 text-sm">{error}</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="w-10 h-10 text-[var(--gold)]/30 mx-auto mb-3" />
          <p className="text-sm text-[--fg-muted]">No inquiries yet. Submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="border border-gray-800 rounded-xl overflow-hidden">
              {/* Row header */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#c9a86a]/5 transition-colors"
                onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#c9a86a]/10 border border-[var(--gold-border)] flex items-center justify-center flex-shrink-0 text-[var(--gold)] font-semibold text-sm">
                  {inq.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm truncate">{inq.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLORS[inq.status] || STATUS_COLORS['new']}`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-[--fg-muted] flex-wrap">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inq.email}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(inq.submittedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:block text-xs text-[var(--gold)] bg-[#c9a86a]/10 border border-[var(--gold-border)] px-2 py-1 rounded-lg">
                    {inq.budget}
                  </span>
                  {expandedId === inq.id ? <ChevronUp className="w-4 h-4 text-[--fg-muted]" /> : <ChevronDown className="w-4 h-4 text-[--fg-muted]" />}
                </div>
              </div>

              {/* Expanded details */}
              {expandedId === inq.id && (
                <div className="border-t border-gray-800 p-5 space-y-5 bg-[#0B0B0B]/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest uppercase text-[--fg-muted]">Phone</p>
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-2 text-sm hover:text-[var(--gold)] transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[var(--gold)]" /> {inq.phone}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest uppercase text-[--fg-muted]">Location</p>
                      <p className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3.5 h-3.5 text-[var(--gold)] flex-shrink-0" /> {inq.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest uppercase text-[--fg-muted]">Budget</p>
                      <p className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-3.5 h-3.5 text-[var(--gold)]" /> {inq.budget}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] tracking-widest uppercase text-[--fg-muted]">Message</p>
                    <p className="text-sm leading-relaxed text-[var(--fg)]/80 bg-[var(--gold-muted)]/30 p-3 rounded-lg border border-[var(--gold-border)]">
                      {inq.message}
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] tracking-widest uppercase text-[--fg-muted]">Status:</label>
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        disabled={isPending}
                        className="bg-[var(--bg)] border border-[var(--gold-border)] text-sm px-3 py-1.5 rounded-lg text-[var(--fg)] outline-none focus:border-[#c9a86a] cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${inq.email}?subject=Re: Your Interior Design Inquiry`}
                        className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg bg-[#c9a86a]/10 border border-[var(--gold-border)] text-[var(--gold)] hover:bg-[#c9a86a]/20 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" /> Reply via Email
                      </a>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        disabled={isPending}
                        className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
