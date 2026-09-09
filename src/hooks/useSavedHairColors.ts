import { useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import type { SavedHairColor } from '@/components/HairColorGuide';

interface ProfileLike {
  saved_hair_colors?: SavedHairColor[] | null;
}

export function useSavedHairColors(user: User | null, profile: ProfileLike | null) {
  const [savedHairColors, setSavedHairColors] = useState<SavedHairColor[]>([]);

  const fetchSavedHairColors = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase.from('saved_hair_colors').select('*').eq('user_id', user.id);
      if (error) {
        if (profile?.saved_hair_colors) {
          setSavedHairColors(profile.saved_hair_colors);
        }
      } else {
        const sorted = (data || []).sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        setSavedHairColors(sorted);
      }
    } catch {
      if (profile?.saved_hair_colors) {
        setSavedHairColors(profile.saved_hair_colors);
      }
    }
  }, [user, profile?.saved_hair_colors]);

  useEffect(() => {
    if (user) {
      fetchSavedHairColors();
    } else {
      const localColors = localStorage.getItem('savedHairColors');
      if (localColors) {
        try {
          setSavedHairColors(JSON.parse(localColors));
        } catch {
          setSavedHairColors([]);
        }
      }
    }
  }, [user, fetchSavedHairColors]);

  const handleSaveHairColor = async (color: SavedHairColor) => {
    if (!user) {
      const updated = [...savedHairColors, color];
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({ title: 'Color saved!', description: `${color.name} has been added to your favorites.` });
      return;
    }
    try {
      const { error } = await supabase.from('saved_hair_colors').insert({
        user_id: user.id,
        color_id: color.id,
        name: color.name,
        hex: color.hex,
        description: color.description,
        undertone: color.undertone,
        intensity: color.intensity,
        category: color.category,
        element_id: color.elementId,
        subtype_id: color.subtypeId,
      });
      if (error) {
        const updated = [...savedHairColors, color];
        await supabase.from('user_profiles').update({ saved_hair_colors: updated }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors((prev) => [...prev, color]);
      }
      toast({ title: 'Color saved!', description: `${color.name} has been added to your favorites.` });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save color. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveHairColor = async (colorId: string) => {
    if (!user) {
      const updated = savedHairColors.filter((c) => c.id !== colorId);
      setSavedHairColors(updated);
      localStorage.setItem('savedHairColors', JSON.stringify(updated));
      toast({ title: 'Color removed', description: 'The color has been removed from your favorites.' });
      return;
    }
    try {
      const { error } = await supabase.from('saved_hair_colors').delete().eq('user_id', user.id).eq('color_id', colorId);
      if (error) {
        const updated = savedHairColors.filter((c) => c.id !== colorId);
        await supabase.from('user_profiles').update({ saved_hair_colors: updated }).eq('id', user.id);
        setSavedHairColors(updated);
      } else {
        setSavedHairColors((prev) => prev.filter((c) => c.id !== colorId));
      }
      toast({ title: 'Color removed', description: 'The color has been removed from your favorites.' });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to remove color. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return { savedHairColors, handleSaveHairColor, handleRemoveHairColor };
}
