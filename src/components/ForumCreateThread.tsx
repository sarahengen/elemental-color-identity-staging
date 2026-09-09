import React, { useState, useRef, useEffect } from 'react';
import { X, Image, Send, Loader2, AlertTriangle, Sparkles, MessageSquare, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { USER_UPLOADS_BUCKET } from '@/lib/storageBucket';
import { toast } from '@/components/ui/use-toast';
import {
  getAllRootsCategoryOptions,
  getRootsCategoryIdForSubtype,
  parseRootsCategoryId,
} from '@/data/rootsForumConfig';

interface ForumCreateThreadProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: any;
  onThreadCreated: () => void;
  forumMode?: 'public' | 'roots';
  rootsDefaultRootCategoryId?: string;
  rootsAllowedRootCategoryIds?: string[];
  rootsReadOnly?: boolean;
  onRequestDayPass?: (rootCategoryId: string) => void;
}

const CATEGORIES = [
  { id: 'general', label: 'General Discussion', color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
  { id: 'results', label: 'Share My Results', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  { id: 'color-matching', label: 'Color Matching Help', color: '#EC4899', gradient: 'linear-gradient(135deg, #DB2777, #F472B6)' },
  { id: 'outfit-feedback', label: 'Outfit Feedback', color: '#F59E0B', gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
  { id: 'tips', label: 'Tips & Tricks', color: '#10B981', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  { id: 'questions', label: 'Questions', color: '#3B82F6', gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
];

const ELEMENTS = [
  { id: '', label: 'All Elements' },
  { id: 'fire', label: 'Fire' },
  { id: 'water', label: 'Water' },
  { id: 'earth', label: 'Earth' },
  { id: 'air', label: 'Air' },
];

const ROOTS_OPTIONS = getAllRootsCategoryOptions();

const ForumCreateThread: React.FC<ForumCreateThreadProps> = ({
  isOpen,
  onClose,
  user,
  profile,
  onThreadCreated,
  forumMode = 'public',
  rootsDefaultRootCategoryId,
  rootsAllowedRootCategoryIds,
  rootsReadOnly = false,
  onRequestDayPass,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(forumMode === 'roots' && ROOTS_OPTIONS[0] ? ROOTS_OPTIONS[0].id : 'general');
  const [elementalType, setElementalType] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string; image?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (forumMode === 'roots') {
      const matchSubtype = rootsDefaultRootCategoryId ?? getRootsCategoryIdForSubtype(profile?.elemental_subtype);
      setCategory(matchSubtype || ROOTS_OPTIONS[0]?.id || 'general');
    } else {
      setCategory('general');
    }
    setElementalType('');
  }, [isOpen, forumMode, profile?.elemental_subtype, rootsDefaultRootCategoryId]);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image must be under 5MB' }));
        toast({
          title: 'Image too large',
          description: 'Please select an image under 5MB.',
          variant: 'destructive',
        });
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Only JPEG, PNG, GIF, and WebP images are allowed' }));
        toast({
          title: 'Invalid file type',
          description: 'Only JPEG, PNG, GIF, and WebP images are allowed.',
          variant: 'destructive',
        });
        return;
      }
      setErrors(prev => { const { image, ...rest } = prev; return rest; });
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setErrors(prev => { const { image, ...rest } = prev; return rest; });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const newErrors: { title?: string; body?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!body.trim()) newErrors.body = 'Body is required';
    else if (body.trim().length < 10) newErrors.body = 'Body must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !user?.id) return null;

    setUploadingImage(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      // Upload via Storage (same bucket/prefix pattern as avatar uploads in ProfileSettings).
      // The previous Edge Function `upload-forum-image` is not in this repo and often is not
      // deployed, which left `image_url` NULL while the thread still inserted.
      const rawExt = imageFile.name.split('.').pop()?.toLowerCase();
      const ext =
        rawExt && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(rawExt)
          ? rawExt
          : imageFile.type === 'image/png'
            ? 'png'
            : imageFile.type === 'image/gif'
              ? 'gif'
              : imageFile.type === 'image/webp'
                ? 'webp'
                : 'jpg';
      const filePath = `avatars/${user.id}-forum-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(USER_UPLOADS_BUCKET)
        .upload(filePath, imageFile, {
          contentType: imageFile.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(USER_UPLOADS_BUCKET).getPublicUrl(filePath);
      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        throw new Error('No public URL returned from storage');
      }

      return publicUrl;
    } catch (error: any) {
      console.error('Image upload error:', error);
      const raw = String(error?.message ?? error ?? '');
      const bucketMissing = /bucket not found/i.test(raw);
      toast({
        title: 'Image upload failed',
        description: bucketMissing
          ? `Storage bucket "${USER_UPLOADS_BUCKET}" is missing in Supabase. Create it (public) or run supabase/migrations/20260420120000_user_uploads_storage_bucket.sql in the SQL Editor.`
          : raw || 'Could not upload the image. Your thread will be posted without it.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;
    if (forumMode === 'roots' && rootsReadOnly) {
      // User can still view locked Roots, but posting requires a day pass.
      onRequestDayPass?.(category);
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl && imageFile) {
          toast({
            title: 'Posting without image',
            description: 'Your thread will be posted without the attached image.',
          });
        }
      }

      const rootsParsed = forumMode === 'roots' ? parseRootsCategoryId(category) : null;
      const elementalResolved =
        forumMode === 'roots' && rootsParsed ? rootsParsed.element : elementalType || null;

      const authorName = profile?.full_name || user.email?.split('@')[0] || 'Anonymous';
      const authorElement = profile?.elemental_type || null;
      const authorSubtype = profile?.elemental_subtype || null;

      const { error } = await supabase.from('forum_threads').insert({
        user_id: user.id,
        title: title.trim(),
        body: body.trim(),
        category,
        elemental_type: elementalResolved,
        image_url: imageUrl,
        author_name: authorName,
        author_element: authorElement,
        author_subtype: authorSubtype,
      });

      if (error) throw error;

      toast({
        title: 'Thread posted!',
        description: imageUrl 
          ? 'Your thread with image has been published successfully.' 
          : imageFile 
            ? 'Your thread was posted, but the image could not be attached.'
            : 'Your thread has been published successfully.',
      });

      setTitle('');
      setBody('');
      setCategory(forumMode === 'roots' && ROOTS_OPTIONS[0] ? ROOTS_OPTIONS[0].id : 'general');
      setElementalType('');
      removeImage();
      onThreadCreated();
      onClose();
    } catch (error: any) {
      console.error('Error creating thread:', error);
      toast({
        title: 'Failed to post thread',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoots = ROOTS_OPTIONS.find((c) => c.id === category);
  const selectedCat = forumMode === 'roots' ? selectedRoots : CATEGORIES.find((c) => c.id === category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Colorful Gradient Header */}
        <div
          className="relative flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 40%, #7C3AED 70%, #A855F7 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute bottom-0 left-1/3 w-16 h-16 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>Create New Thread</h2>
              <p className="text-xs text-white/60">
                {forumMode === 'roots' ? 'Post in your Root forum' : 'Share with the elemental community'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Category & Element */}
          <div className={forumMode === 'roots' ? 'space-y-4' : 'grid grid-cols-2 gap-4'}>
            <div>
              <label className="block text-sm font-bold text-violet-800 mb-1.5">
                {forumMode === 'roots' ? 'Root forum' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-violet-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-violet-50/50 font-medium transition-all"
              >
                {forumMode === 'roots'
                  ? ROOTS_OPTIONS.map((cat) => {
                      const allowed = !rootsAllowedRootCategoryIds || rootsAllowedRootCategoryIds.includes(cat.id);
                      return (
                        <option key={cat.id} value={cat.id} disabled={!allowed}>
                          {allowed ? cat.label : `Locked · ${cat.shortLabel}`}
                        </option>
                      );
                    })
                  : CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
              </select>
              {forumMode === 'roots' && (
                <p className="mt-1.5 text-xs text-gray-500">
                  The thread’s element tag matches this Root forum automatically.
                </p>
              )}
            </div>
            {forumMode !== 'roots' && (
              <div>
                <label className="block text-sm font-bold text-violet-800 mb-1.5">Element Tag</label>
                <select
                  value={elementalType}
                  onChange={(e) => setElementalType(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-violet-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-violet-50/50 font-medium transition-all"
                >
                  {ELEMENTS.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Selected category preview pill */}
          {selectedCat && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Selected:</span>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{
                  background:
                    forumMode === 'roots' && selectedRoots ? selectedRoots.gradient : (selectedCat as { gradient: string }).gradient,
                }}
              >
                {forumMode === 'roots' && selectedRoots ? selectedRoots.shortLabel : (selectedCat as { label: string }).label}
              </span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-violet-800 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-gray-50 font-medium transition-all ${
                errors.title ? 'border-red-300' : 'border-gray-200'
              }`}
              maxLength={200}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500 font-medium">{errors.title}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-bold text-violet-800 mb-1.5">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts, questions, or experiences..."
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-gray-50 resize-none transition-all ${
                errors.body ? 'border-red-300' : 'border-gray-200'
              }`}
              maxLength={5000}
            />
            {errors.body && <p className="mt-1 text-xs text-red-500 font-medium">{errors.body}</p>}
            <p className="mt-1 text-xs text-gray-400 text-right font-medium">{body.length}/5000</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-violet-800 mb-1.5">Image (optional)</label>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-violet-200 shadow-md">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {uploadingImage && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-violet-200 rounded-xl text-violet-400 hover:text-violet-600 hover:border-violet-400 hover:bg-violet-50/50 transition-all"
              >
                <Image className="w-5 h-5" />
                <span className="text-sm font-medium">Click to upload an image</span>
              </button>
            )}
            {errors.image && (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                {errors.image}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            {forumMode === 'roots' && rootsReadOnly ? (
              <button
                type="button"
                onClick={() => onRequestDayPass?.(category)}
                className="flex items-center gap-2 px-6 py-2.5 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
              >
                <Lock className="w-4 h-4" />
                Request Day Pass
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || uploadingImage}
                className="flex items-center gap-2 px-6 py-2.5 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED, #A855F7)' }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {uploadingImage ? 'Uploading image...' : 'Posting...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Thread
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumCreateThread;
