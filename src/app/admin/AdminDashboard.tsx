'use client';

import { useState } from 'react';
import { saveCmsAction, logoutAction } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    const result = await saveCmsAction(data);
    if (result.success) {
      alert('CMS Data saved successfully!');
      router.refresh();
    } else {
      alert('Failed to save data: ' + result.error);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-[var(--gold-border)] pb-6">
          <h1 className="font-serif text-4xl tracking-wide text-[var(--gold)]">CMS Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#c9a86a] text-[#0B0B0B] px-6 py-2 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleLogout}
              className="border border-[#c9a86a]/50 text-[var(--gold)] px-6 py-2 rounded-lg font-semibold hover:bg-[#c9a86a]/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Hero CMS */}
        <section className="mb-16 bg-[var(--gold-muted)]/50 border border-[var(--gold-border)] rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-serif  mb-2">Hero Section</h2>
            <p className="text-sm text-[--fg-muted]">Manage the dynamic slideshow images and transition speed.</p>
            <p className="text-xs text-[var(--gold)] mt-1 bg-[#c9a86a]/10 inline-block px-2 py-1 rounded">Recommended Aspect Ratio: 16:9 (Desktop Cover)</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm mb-2 text-[--fg-muted]">Transition Interval (seconds)</label>
            <input 
              type="number" 
              step="0.5"
              value={data.hero?.interval || 4.5}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, interval: parseFloat(e.target.value) } })}
              className=" border border-[var(--gold-border)] rounded px-3 py-2 w-32 focus:border-[#c9a86a] outline-none"
            />
          </div>

          <div className="space-y-4">
            {data.hero?.images?.map((img: any, idx: number) => (
              <div key={img.id || idx} className="flex gap-4 items-start  p-4 rounded-lg border border-gray-800">
                <div className="w-32 h-20 bg-[--bg] relative rounded overflow-hidden flex-shrink-0">
                  {img.url ? <img src={img.url} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" /> : <div className="w-full h-full bg-[--bg-alt] flex items-center justify-center text-[var(--gold)]">No Image</div>}
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => {
                      const newImages = [...data.hero.images];
                      newImages[idx].url = e.target.value;
                      setData({ ...data, hero: { ...data.hero, images: newImages } });
                    }}
                    placeholder="Hosted Image URL"
                    className="w-full bg-transparent border-b border-[--border] pb-1 outline-none focus:border-[#c9a86a] text-sm"
                  />
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => {
                      const newImages = [...data.hero.images];
                      newImages[idx].alt = e.target.value;
                      setData({ ...data, hero: { ...data.hero, images: newImages } });
                    }}
                    placeholder="Alt Text (Optional)"
                    className="w-full bg-transparent border-b border-[--border] pb-1 outline-none focus:border-[#c9a86a] text-sm text-[--fg-muted]"
                  />
                </div>
                <button 
                  onClick={() => {
                    const newImages = data.hero.images.filter((_: any, i: number) => i !== idx);
                    setData({ ...data, hero: { ...data.hero, images: newImages } });
                  }}
                  className="text-red-400 hover:text-red-300 px-3 py-1 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => {
                const newImages = [...(data.hero?.images || []), { id: `hero-${Date.now()}`, url: '', alt: '' }];
                setData({ ...data, hero: { ...data.hero, images: newImages } });
              }}
              className="w-full border border-dashed border-[var(--gold-border)] hover:bg-[#c9a86a]/10 rounded-lg py-4 text-sm text-[var(--gold)] transition-colors"
            >
              + Add Hero Image
            </button>
          </div>
        </section>

        {/* Gallery CMS */}
        <section className="bg-[var(--gold-muted)]/50 border border-[var(--gold-border)] rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-serif  mb-2">Gallery Section</h2>
            <p className="text-sm text-[--fg-muted] mb-2">Manage cards displayed in the gallery page and homepage preview.</p>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--gold)]">
              <span className="bg-[#c9a86a]/10 px-2 py-1 rounded">Homepage Slots: 3:4, 1:1, 4:3, 3:4</span>
              <span className="bg-[#c9a86a]/10 px-2 py-1 rounded">Gallery Page: 16:9</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.gallery?.map((item: any, idx: number) => (
              <div key={item.id || idx} className=" p-4 rounded-xl border border-gray-800 flex flex-col group">
                <div className="w-full aspect-video bg-[--bg] relative rounded-lg overflow-hidden mb-4">
                  {item.imgUrl ? <img src={item.imgUrl} alt={item.alt} className="absolute inset-0 w-full h-full object-cover" /> : <div className="w-full h-full bg-[--bg-alt] flex items-center justify-center text-[var(--gold)]">No Image</div>}
                </div>
                <div className="space-y-3 flex-1">
                  <div>
                    <label className="text-xs text-gray-500">Image URL</label>
                    <input
                      type="text"
                      value={item.imgUrl}
                      onChange={(e) => {
                        const newGallery = [...data.gallery];
                        newGallery[idx].imgUrl = e.target.value;
                        setData({ ...data, gallery: newGallery });
                      }}
                      className="w-full bg-transparent border-b border-[--border] py-1 outline-none focus:border-[#c9a86a] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Title / Alt Text</label>
                    <input
                      type="text"
                      value={item.alt}
                      onChange={(e) => {
                        const newGallery = [...data.gallery];
                        newGallery[idx].alt = e.target.value;
                        setData({ ...data, gallery: newGallery });
                      }}
                      className="w-full bg-transparent border-b border-[--border] py-1 outline-none focus:border-[#c9a86a] text-sm text-[--fg-muted]"
                    />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-gray-600">Index {idx}</span>
                  <button 
                    onClick={() => {
                      const newGallery = data.gallery.filter((_: any, i: number) => i !== idx);
                      setData({ ...data, gallery: newGallery });
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => {
                const newGallery = [...(data.gallery || []), { id: `gal-${Date.now()}`, imgUrl: '', alt: 'New Item' }];
                setData({ ...data, gallery: newGallery });
              }}
              className="w-full min-h-[300px] border border-dashed border-[var(--gold-border)] hover:bg-[#c9a86a]/10 rounded-xl flex flex-col items-center justify-center text-[var(--gold)] transition-colors"
            >
              <span className="text-2xl mb-2">+</span>
              <span className="text-sm">Add Gallery Card</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}