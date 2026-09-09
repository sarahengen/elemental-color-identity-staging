import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { USER_UPLOADS_BUCKET } from '@/lib/storageBucket';
import { toast } from '@/components/ui/use-toast';

export type ColorScanScoreFilter = 'all' | 'strong' | 'okay' | 'weak';

export interface AnalyzedColorSnapshot {
  hex: string;
  percentage: number;
  name: string;
}

export interface ColorAnalyzerScan {
  id: string;
  user_id: string;
  hex: string;
  score: number;
  verdict: string;
  note: string | null;
  image_path: string | null;
  analyzed_colors: AnalyzedColorSnapshot[] | null;
  element_id: string | null;
  subtype_id: string | null;
  created_at: string;
  /** Resolved public URL for thumbnail (client-only). */
  imageUrl?: string | null;
}

export interface SaveColorScanInput {
  hex: string;
  score: number;
  verdict: string;
  note?: string | null;
  analyzedColors?: AnalyzedColorSnapshot[] | null;
  elementId?: string | null;
  subtypeId?: string | null;
  /** data URL (image/jpeg) from canvas capture */
  imageDataUrl?: string | null;
}

function resolveImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;
  const { data } = supabase.storage.from(USER_UPLOADS_BUCKET).getPublicUrl(imagePath);
  return data.publicUrl ?? null;
}

function withImageUrl(row: ColorAnalyzerScan): ColorAnalyzerScan {
  return { ...row, imageUrl: resolveImageUrl(row.image_path) };
}

async function dataUrlToJpegBlob(dataUrl: string, maxEdge = 640, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxEdge || height > maxEdge) {
        if (width > height) {
          height = Math.round((height * maxEdge) / width);
          width = maxEdge;
        } else {
          width = Math.round((width * maxEdge) / height);
          height = maxEdge;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not create canvas'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error('Could not compress image'));
          else resolve(blob);
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = dataUrl;
  });
}

export function filterScansByScore(
  scans: ColorAnalyzerScan[],
  filter: ColorScanScoreFilter
): ColorAnalyzerScan[] {
  switch (filter) {
    case 'strong':
      return scans.filter((s) => s.score >= 70);
    case 'okay':
      return scans.filter((s) => s.score >= 50 && s.score < 70);
    case 'weak':
      return scans.filter((s) => s.score < 50);
    default:
      return scans;
  }
}

export function useSavedColorScans(user: User | null) {
  const [scans, setScans] = useState<ColorAnalyzerScan[]>([]);
  const [loading, setLoading] = useState(false);
  const [scoreFilter, setScoreFilter] = useState<ColorScanScoreFilter>('all');

  const fetchScans = useCallback(async () => {
    if (!user) {
      setScans([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('color_analyzer_scans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScans((data || []).map((row) => withImageUrl(row as ColorAnalyzerScan)));
    } catch (err) {
      console.error('Failed to load color analyzer scans:', err);
      setScans([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void fetchScans();
  }, [fetchScans]);

  const filteredScans = useMemo(
    () => filterScansByScore(scans, scoreFilter),
    [scans, scoreFilter]
  );

  const saveScan = useCallback(
    async (input: SaveColorScanInput): Promise<ColorAnalyzerScan | null> => {
      if (!user) {
        toast({
          title: 'Sign in required',
          description: 'Sign in to save scans to your account.',
          variant: 'destructive',
        });
        return null;
      }

      const note = input.note?.trim() ? input.note.trim().slice(0, 200) : null;
      const scanId = crypto.randomUUID();
      let imagePath: string | null = null;

      try {
        if (input.imageDataUrl) {
          const blob = await dataUrlToJpegBlob(input.imageDataUrl);
          imagePath = `${user.id}/color-scans/${scanId}.jpg`;
          const { error: uploadError } = await supabase.storage
            .from(USER_UPLOADS_BUCKET)
            .upload(imagePath, blob, { contentType: 'image/jpeg', upsert: true });
          if (uploadError) {
            console.warn('Scan thumbnail upload failed; saving metadata only:', uploadError);
            imagePath = null;
          }
        }

        const { data, error } = await supabase
          .from('color_analyzer_scans')
          .insert({
            id: scanId,
            user_id: user.id,
            hex: input.hex,
            score: input.score,
            verdict: input.verdict,
            note,
            image_path: imagePath,
            analyzed_colors: input.analyzedColors ?? null,
            element_id: input.elementId ?? null,
            subtype_id: input.subtypeId ?? null,
          })
          .select('*')
          .single();

        if (error) throw error;

        const saved = withImageUrl(data as ColorAnalyzerScan);
        setScans((prev) => [saved, ...prev]);
        toast({
          title: 'Scan saved',
          description: 'You can revisit it anytime under My Saved Scans.',
        });
        return saved;
      } catch (err) {
        console.error('Failed to save color scan:', err);
        if (imagePath) {
          await supabase.storage.from(USER_UPLOADS_BUCKET).remove([imagePath]).catch(() => undefined);
        }
        toast({
          title: 'Could not save scan',
          description: 'Please try again in a moment.',
          variant: 'destructive',
        });
        return null;
      }
    },
    [user]
  );

  const deleteScan = useCallback(
    async (scanId: string) => {
      if (!user) return;

      const existing = scans.find((s) => s.id === scanId);
      try {
        const { error } = await supabase
          .from('color_analyzer_scans')
          .delete()
          .eq('id', scanId)
          .eq('user_id', user.id);

        if (error) throw error;

        if (existing?.image_path) {
          await supabase.storage
            .from(USER_UPLOADS_BUCKET)
            .remove([existing.image_path])
            .catch(() => undefined);
        }

        setScans((prev) => prev.filter((s) => s.id !== scanId));
        toast({ title: 'Scan deleted', description: 'Removed from My Saved Scans.' });
      } catch (err) {
        console.error('Failed to delete color scan:', err);
        toast({
          title: 'Could not delete scan',
          description: 'Please try again.',
          variant: 'destructive',
        });
      }
    },
    [user, scans]
  );

  return {
    scans,
    filteredScans,
    loading,
    scoreFilter,
    setScoreFilter,
    saveScan,
    deleteScan,
    refreshScans: fetchScans,
  };
}
