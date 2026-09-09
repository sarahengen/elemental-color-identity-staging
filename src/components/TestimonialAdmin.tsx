import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Star, RefreshCw, X, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface Testimonial {
  id: string;
  quote: string;
  author: string | null;
  source: string | null;
  is_featured: boolean;
  sort_order: number;
}

const blankForm = { quote: '', author: '', source: '', is_featured: false, sort_order: 0 };

const TestimonialAdmin: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(blankForm);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error) setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...blankForm, sort_order: testimonials.length + 1 });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      quote: t.quote,
      author: t.author || '',
      source: t.source || '',
      is_featured: t.is_featured,
      sort_order: t.sort_order,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.quote.trim()) {
      toast({ title: 'Quote is required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      quote: form.quote.trim(),
      author: form.author.trim() || null,
      source: form.source.trim() || null,
      is_featured: form.is_featured,
      sort_order: Number(form.sort_order) || 0,
    };
    let error;
    if (editing) {
      ({ error } = await supabase.from('testimonials').update(payload).eq('id', editing.id));
    } else {
      ({ error } = await supabase.from('testimonials').insert(payload));
    }
    setSaving(false);
    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: editing ? 'Testimonial updated' : 'Testimonial added' });
    setShowForm(false);
    setEditing(null);
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Testimonial deleted' });
    fetchTestimonials();
  };

  const toggleFeatured = async (t: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_featured: !t.is_featured })
      .eq('id', t.id);
    if (!error) fetchTestimonials();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Testimonials</h2>
          <p className="text-sm text-gray-500">Manage the rotating client quotes shown on the homepage.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchTestimonials}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Quote className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No testimonials yet</p>
          <p className="text-sm text-gray-400">Add one to display it on the homepage carousel.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4"
            >
              <div className="flex flex-col items-center gap-1 pt-1">
                <span className="text-xs font-mono text-gray-400">#{t.sort_order}</span>
                <button
                  onClick={() => toggleFeatured(t)}
                  title={t.is_featured ? 'Featured' : 'Mark as featured'}
                  className={t.is_featured ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}
                >
                  <Star className="w-5 h-5" fill={t.is_featured ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-gray-900 italic leading-snug">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-sm text-gray-500">
                  {[t.author, t.source].filter(Boolean).join(' \u00b7 ') || 'No attribution'}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => openEdit(t)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {editing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote *</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  rows={3}
                  placeholder="People now look her in the eye."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Maya R."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                    placeholder="Psychology Today"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 pb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  />
                  Featured
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialAdmin;
