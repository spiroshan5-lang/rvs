'use client';

import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Edit3, Save, X, Image as ImageIcon,
  GalleryHorizontal, Sparkles, Link, Hash, MoveUp, MoveDown,
  CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';
import {
  CMSHeroSlide, CMSGalleryCard,
  addCMSHeroSlideAction, updateCMSHeroSlideAction, deleteCMSHeroSlideAction,
  addCMSGalleryCardAction, updateCMSGalleryCardAction, deleteCMSGalleryCardAction,
  
} from './actions';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Shared Styles
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INPUT_CLS = 'w-full bg-[var(--bg)] border border-[var(--gold-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--fg)] placeholder-[var(--fg)]/30 focus:outline-none focus:border-[var(--gold)] transition-colors font-mono';
const BTN_GOLD = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold-border)] text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors text-sm font-medium';
const BTN_DANGER = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors text-xs';
const BTN_SAVE = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-medium';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Toast Notification
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Toast({ msg, type }: { msg: string; type: 'ok' | 'err' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      className={'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium shadow-2xl backdrop-blur-md ' + 
        (type === 'ok'
          ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
          : 'bg-red-950/80 border-red-500/30 text-red-300'
        )}
    >
      {type === 'ok' ? <CheckCircle2 className='w-4 h-4' /> : <AlertCircle className='w-4 h-4' />}
      {msg}
    </motion.div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Image Upload Area
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Image Preview Card
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ImagePreview({ url, alt }: { url: string; alt: string }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [url]);

  if (!url || error) {
    return (
      <div className='w-full aspect-video rounded-xl bg-[var(--bg-alt)] border border-[var(--gold-border)]/30 flex flex-col items-center justify-center gap-2 text-[var(--fg)]/20'>
        <ImageIcon className='w-6 h-6' />
        <span className='text-xs font-mono'>No preview available</span>
      </div>
    );
  }
  return (
    <div className='relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--gold-border)]/30'>
      <img src={url} alt={alt || 'Preview'} className='absolute inset-0 w-full h-full object-cover' onError={() => setError(true)} />
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HERO SLIDES CMS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function HeroCMSPanel({ initialSlides }: { initialSlides: CMSHeroSlide[] }) {
  const [slides, setSlides] = useState<CMSHeroSlide[]>(initialSlides);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const [isPending, startTransition] = useTransition();

  const [newSlide, setNewSlide] = useState({ url: '', mobileUrl: '', alt: '', order: slides.length + 1 });
  const [editForm, setEditForm] = useState<Partial<CMSHeroSlide>>({});

  function showToast(msg: string, type: 'ok' | 'err') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAdd() {
    startTransition(async () => {
      const res = await addCMSHeroSlideAction(newSlide);
      if (res.success) {
        showToast('Hero slide added. Redeploy or revalidate to see live.', 'ok');
        setShowAdd(false);
        setNewSlide({ url: '', mobileUrl: '', alt: '', order: slides.length + 2 });
        setSlides(prev => [...prev, { id: res.id || `hero-${Date.now()}`, ...newSlide }]);
      } else {
        showToast(res.error || 'Failed to add', 'err');
      }
    });
  }

  function startEdit(slide: CMSHeroSlide) {
    setEditingId(slide.id);
    setEditForm({ url: slide.url, mobileUrl: slide.mobileUrl || '', alt: slide.alt, order: slide.order });
  }

  function handleSaveEdit(id: string) {
    startTransition(async () => {
      const res = await updateCMSHeroSlideAction(id, editForm);
      if (res.success) {
        showToast('Slide updated.', 'ok');
        setSlides(prev => prev.map(s => s.id === id ? { ...s, ...editForm } : s));
        setEditingId(null);
      } else {
        showToast(res.error || 'Failed to update', 'err');
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this hero slide?')) return;
    startTransition(async () => {
      const res = await deleteCMSHeroSlideAction(id);
      if (res.success) {
        showToast('Slide deleted.', 'ok');
        setSlides(prev => prev.filter(s => s.id !== id));
      } else {
        showToast(res.error || 'Failed to delete', 'err');
      }
    });
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-[var(--fg)] flex items-center gap-2'>
            <Sparkles className='w-5 h-5 text-[var(--gold)]' />
            Hero Slideshow
          </h3>
          <p className='text-xs text-[var(--fg)]/40 mt-1 font-mono'>
            Paste image URLs (e.g. Cloudinary or Unsplash). Order decides slideshow sequence.
          </p>
        </div>
        <button className={BTN_GOLD} onClick={() => setShowAdd(!showAdd)}>
          <Plus className='w-4 h-4' />
          Add Slide
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='overflow-hidden'
          >
            <div className='rounded-2xl border border-[var(--gold-border)] bg-[var(--bg-alt)] p-5 space-y-4'>
              <h4 className='text-sm font-semibold text-[var(--gold)] tracking-wide uppercase'>New Slide</h4>
              
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2 md:col-span-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Image URL *</label>
                  <input
                    className={INPUT_CLS}
                    placeholder='https://res.cloudinary.com/...'
                    value={newSlide.url}
                    onChange={e => setNewSlide(p => ({ ...p, url: e.target.value }))}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Alt Text *</label>
                  <input
                    className={INPUT_CLS}
                    placeholder='Luxury living room'
                    value={newSlide.alt}
                    onChange={e => setNewSlide(p => ({ ...p, alt: e.target.value }))}
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Order</label>
                  <input
                    type='number'
                    className={INPUT_CLS}
                    value={newSlide.order}
                    onChange={e => setNewSlide(p => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              <ImagePreview url={newSlide.url} alt={newSlide.alt} />
              <div className='flex gap-3'>
                <button className={BTN_SAVE} onClick={handleAdd} disabled={isPending || !newSlide.url || !newSlide.alt}>
                  {isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
                  Save Slide
                </button>
                <button className={BTN_DANGER} onClick={() => setShowAdd(false)}>
                  <X className='w-4 h-4' /> Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slides list */}
      {slides.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-[var(--gold-border)]/40 py-16 text-center'>
          <Sparkles className='w-8 h-8 mx-auto mb-3 text-[var(--fg)]/15' />
          <p className='text-sm text-[var(--fg)]/30 font-mono'>No hero slides yet. Upload your first image above.</p>
        </div>
      ) : (
        <div className='space-y-3'>
          {slides.map((slide, idx) => (
            <motion.div
              key={slide.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className='rounded-2xl border border-[var(--gold-border)] bg-[var(--bg-alt)] overflow-hidden'
            >
              {editingId === slide.id ? (
                <div className='p-5 space-y-4'>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div className='space-y-2 md:col-span-2'>
                      <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Image URL</label>
                      <input
                        className={INPUT_CLS}
                        value={editForm.url || ''}
                        onChange={e => setEditForm(p => ({ ...p, url: e.target.value }))}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Alt Text</label>
                      <input
                        className={INPUT_CLS}
                        value={editForm.alt || ''}
                        onChange={e => setEditForm(p => ({ ...p, alt: e.target.value }))}
                      />
                    </div>
                    <div className='space-y-2 md:col-span-2'>
                      <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Order</label>
                      <input
                        type='number'
                        className={INPUT_CLS}
                        value={editForm.order ?? slide.order}
                        onChange={e => setEditForm(p => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                      />
                    </div>
                  </div>
                  <ImagePreview url={editForm.url || slide.url} alt={editForm.alt || slide.alt} />
                  <div className='flex gap-3'>
                    <button className={BTN_SAVE} onClick={() => handleSaveEdit(slide.id)} disabled={isPending}>
                      {isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
                      Save
                    </button>
                    <button className={BTN_DANGER} onClick={() => setEditingId(null)}>
                      <X className='w-3.5 h-3.5' /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-4 p-4'>
                  <div className='w-24 h-16 relative rounded-lg overflow-hidden flex-shrink-0 border border-[var(--gold-border)]/30'>
                    <ImagePreview url={slide.url} alt={slide.alt} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm text-[var(--fg)]/80 font-mono truncate'>{slide.url}</p>
                    <p className='text-xs text-[var(--fg)]/40 mt-0.5'>{slide.alt} â€¢ order: {slide.order}</p>
                  </div>
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <button
                      className={BTN_GOLD + ' !px-3 !py-1.5 !text-xs'}
                      onClick={() => startEdit(slide)}
                    >
                      <Edit3 className='w-3.5 h-3.5' />
                    </button>
                    <button className={BTN_DANGER} onClick={() => handleDelete(slide.id)}>
                      <Trash2 className='w-3.5 h-3.5' />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// GALLERY CMS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function GalleryCMSPanel({ initialCards }: { initialCards: CMSGalleryCard[] }) {
  const [cards, setCards] = useState<CMSGalleryCard[]>(initialCards);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
  const [isPending, startTransition] = useTransition();

  const [newCard, setNewCard] = useState({ imgUrl: '', alt: '', linkUrl: '', order: cards.length + 1 });
  const [editForm, setEditForm] = useState<Partial<CMSGalleryCard>>({});

  function showToast(msg: string, type: 'ok' | 'err') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleAdd() {
    startTransition(async () => {
      const res = await addCMSGalleryCardAction({
        imgUrl: newCard.imgUrl,
        alt: newCard.alt,
        linkUrl: newCard.linkUrl || undefined,
        order: newCard.order,
      });
      if (res.success) {
        showToast('Gallery card added.', 'ok');
        setCards(prev => [...prev, { id: res.id || `gallery-${Date.now()}`, ...newCard }]);
        setShowAdd(false);
        setNewCard({ imgUrl: '', alt: '', linkUrl: '', order: cards.length + 2 });
      } else {
        showToast(res.error || 'Failed to add', 'err');
      }
    });
  }

  function startEdit(card: CMSGalleryCard) {
    setEditingId(card.id);
    setEditForm({ imgUrl: card.imgUrl, alt: card.alt, linkUrl: card.linkUrl || '', order: card.order });
  }

  function handleSaveEdit(id: string) {
    startTransition(async () => {
      const res = await updateCMSGalleryCardAction(id, editForm);
      if (res.success) {
        showToast('Card updated.', 'ok');
        setCards(prev => prev.map(c => c.id === id ? { ...c, ...editForm } : c));
        setEditingId(null);
      } else {
        showToast(res.error || 'Failed to update', 'err');
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this gallery card?')) return;
    startTransition(async () => {
      const res = await deleteCMSGalleryCardAction(id);
      if (res.success) {
        showToast('Card deleted.', 'ok');
        setCards(prev => prev.filter(c => c.id !== id));
      } else {
        showToast(res.error || 'Failed to delete', 'err');
      }
    });
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-[var(--fg)] flex items-center gap-2'>
            <GalleryHorizontal className='w-5 h-5 text-[var(--gold)]' />
            Gallery Images
          </h3>
          <p className='text-xs text-[var(--fg)]/40 mt-1 font-mono'>
            Paste image URLs (e.g. Cloudinary or Unsplash). Changes reflect instantly on the /gallery page.
          </p>
        </div>
        <button className={BTN_GOLD} onClick={() => setShowAdd(!showAdd)}>
          <Plus className='w-4 h-4' />
          Add Image
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='overflow-hidden'
          >
            <div className='rounded-2xl border border-[var(--gold-border)] bg-[var(--bg-alt)] p-5 space-y-4'>
              <h4 className='text-sm font-semibold text-[var(--gold)] tracking-wide uppercase'>New Gallery Image</h4>
              
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2 md:col-span-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Image URL *</label>
                  <input
                    className={INPUT_CLS}
                    placeholder='https://res.cloudinary.com/...'
                    value={newCard.imgUrl}
                    onChange={e => setNewCard(p => ({ ...p, imgUrl: e.target.value }))}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Alt Text *</label>
                  <input
                    className={INPUT_CLS}
                    placeholder='Modern living space'
                    value={newCard.alt}
                    onChange={e => setNewCard(p => ({ ...p, alt: e.target.value }))}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Link URL (optional)</label>
                  <input
                    className={INPUT_CLS}
                    placeholder='https://...'
                    value={newCard.linkUrl}
                    onChange={e => setNewCard(p => ({ ...p, linkUrl: e.target.value }))}
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Order</label>
                  <input
                    type='number'
                    className={INPUT_CLS}
                    value={newCard.order}
                    onChange={e => setNewCard(p => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              <ImagePreview url={newCard.imgUrl} alt={newCard.alt} />
              <div className='flex gap-3'>
                <button className={BTN_SAVE} onClick={handleAdd} disabled={isPending || !newCard.imgUrl || !newCard.alt}>
                  {isPending ? <Loader2 className='w-4 h-4 animate-spin' /> : <Save className='w-4 h-4' />}
                  Save Image
                </button>
                <button className={BTN_DANGER} onClick={() => setShowAdd(false)}>
                  <X className='w-4 h-4' /> Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      {cards.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-[var(--gold-border)]/40 py-16 text-center'>
          <GalleryHorizontal className='w-8 h-8 mx-auto mb-3 text-[var(--fg)]/15' />
          <p className='text-sm text-[var(--fg)]/30 font-mono'>No gallery images yet. Upload your first image above.</p>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              className='rounded-2xl border border-[var(--gold-border)] bg-[var(--bg-alt)] overflow-hidden'
            >
              {editingId === card.id ? (
                <div className='p-4 space-y-3'>
                  <div className='space-y-2'>
                    <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Image URL</label>
                    <input
                      className={INPUT_CLS}
                      value={editForm.imgUrl || ''}
                      onChange={e => setEditForm(p => ({ ...p, imgUrl: e.target.value }))}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Alt Text</label>
                    <input
                      className={INPUT_CLS}
                      value={editForm.alt || ''}
                      onChange={e => setEditForm(p => ({ ...p, alt: e.target.value }))}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Link URL</label>
                    <input
                      className={INPUT_CLS}
                      value={editForm.linkUrl || ''}
                      onChange={e => setEditForm(p => ({ ...p, linkUrl: e.target.value }))}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-xs text-[var(--fg)]/50 uppercase tracking-widest font-mono'>Order</label>
                    <input
                      type='number'
                      className={INPUT_CLS}
                      value={editForm.order ?? card.order}
                      onChange={e => setEditForm(p => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                      />
                  </div>
                  <ImagePreview url={editForm.imgUrl || card.imgUrl} alt={editForm.alt || card.alt} />
                  <div className='flex gap-2'>
                    <button className={BTN_SAVE + ' !text-xs !px-3 !py-1.5'} onClick={() => handleSaveEdit(card.id)} disabled={isPending}>
                      {isPending ? <Loader2 className='w-3.5 h-3.5 animate-spin' /> : <Save className='w-3.5 h-3.5' />}
                      Save
                    </button>
                    <button className={BTN_DANGER} onClick={() => setEditingId(null)}>
                      <X className='w-3.5 h-3.5' /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className='relative aspect-video'>
                    <ImagePreview url={card.imgUrl} alt={card.alt} />
                  </div>
                  <div className='p-3'>
                    <p className='text-xs text-[var(--fg)]/70 font-medium truncate'>{card.alt}</p>
                    <p className='text-[10px] text-[var(--fg)]/30 font-mono truncate mt-0.5'>{card.imgUrl}</p>
                    {card.linkUrl && (
                      <p className='text-[10px] text-blue-400/50 font-mono truncate mt-0.5 flex items-center gap-1'>
                        <Link className='w-2.5 h-2.5' />{card.linkUrl}
                      </p>
                    )}
                    <div className='flex items-center gap-2 mt-2'>
                      <span className='text-[9px] text-[var(--fg)]/20 font-mono flex items-center gap-1'>
                        <Hash className='w-2.5 h-2.5' />{card.order}
                      </span>
                      <div className='ml-auto flex gap-1.5'>
                        <button className={BTN_GOLD + ' !px-2 !py-1 !text-xs'} onClick={() => startEdit(card)}>
                          <Edit3 className='w-3 h-3' />
                        </button>
                        <button className={BTN_DANGER + ' !px-2 !py-1'} onClick={() => handleDelete(card.id)}>
                          <Trash2 className='w-3 h-3' />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

