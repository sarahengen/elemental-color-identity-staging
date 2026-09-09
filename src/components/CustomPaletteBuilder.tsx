import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Share2, Copy, Check, X, Palette, Sparkles, Lock, Globe, Edit2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { elementalTypes, ColorSwatch } from '@/data/elementalTypes';
import { toast } from '@/components/ui/use-toast';

interface CustomPalette {
  id: string;
  name: string;
  purpose: string;
  description: string;
  colors: ColorSwatch[];
  is_public: boolean;
  share_code: string | null;
  created_at: string;
}

interface CustomPaletteBuilderProps {
  user: any;
  profile: any;
}

const purposeOptions = [
  { value: 'work', label: 'Work / Professional', icon: '💼' },
  { value: 'casual', label: 'Casual / Everyday', icon: '☀️' },
  { value: 'formal', label: 'Formal / Evening', icon: '✨' },
  { value: 'creative', label: 'Creative / Artistic', icon: '🎨' },
  { value: 'seasonal', label: 'Seasonal', icon: '🍂' },
  { value: 'general', label: 'General', icon: '🎯' }
];

const CustomPaletteBuilder: React.FC<CustomPaletteBuilderProps> = ({ user, profile }) => {
  const [palettes, setPalettes] = useState<CustomPalette[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPalette, setEditingPalette] = useState<CustomPalette | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // New palette form state
  const [newPalette, setNewPalette] = useState({
    name: '',
    purpose: 'general',
    description: '',
    colors: [] as ColorSwatch[],
    is_public: false
  });

  // Get user's elemental type colors
  const userType = profile?.elemental_type 
    ? elementalTypes.find(t => t.id === profile.elemental_type) 
    : null;
  const userSubtype = userType && profile?.elemental_subtype
    ? userType.subtypes.find(s => s.id === profile.elemental_subtype)
    : null;
  const availableColors = userSubtype?.colors || userType?.colors || [];

  // Get accent colors from other elements for mixing
  const accentColors: ColorSwatch[] = elementalTypes
    .filter(t => t.id !== profile?.elemental_type)
    .flatMap(t => t.colors.filter(c => c.category === 'accent'))
    .slice(0, 12);

  useEffect(() => {
    if (user) {
      fetchPalettes();
    }
  }, [user]);

  const fetchPalettes = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_palettes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPalettes(data || []);
    } catch (error) {
      console.error('Error fetching palettes:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateShareCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleAddColor = (color: ColorSwatch) => {
    if (newPalette.colors.length >= 12) {
      toast({ title: 'Maximum colors reached', description: 'A palette can have up to 12 colors', variant: 'destructive' });
      return;
    }
    if (newPalette.colors.some(c => c.hex === color.hex)) {
      toast({ title: 'Color already added', description: 'This color is already in your palette', variant: 'destructive' });
      return;
    }
    setNewPalette(prev => ({
      ...prev,
      colors: [...prev.colors, color]
    }));
  };

  const handleRemoveColor = (hex: string) => {
    setNewPalette(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c.hex !== hex)
    }));
  };

  const handleSavePalette = async () => {
    if (!newPalette.name.trim()) {
      toast({ title: 'Name required', description: 'Please enter a name for your palette', variant: 'destructive' });
      return;
    }
    if (newPalette.colors.length < 3) {
      toast({ title: 'More colors needed', description: 'Add at least 3 colors to your palette', variant: 'destructive' });
      return;
    }

    try {
      const paletteData = {
        user_id: user.id,
        name: newPalette.name,
        purpose: newPalette.purpose,
        description: newPalette.description,
        colors: newPalette.colors,
        is_public: newPalette.is_public,
        share_code: newPalette.is_public ? generateShareCode() : null
      };

      if (editingPalette) {
        const { error } = await supabase
          .from('custom_palettes')
          .update(paletteData)
          .eq('id', editingPalette.id);
        if (error) throw error;
        toast({ title: 'Palette updated', description: 'Your palette has been saved' });
      } else {
        const { error } = await supabase
          .from('custom_palettes')
          .insert([paletteData]);
        if (error) throw error;
        toast({ title: 'Palette created', description: 'Your new palette has been saved' });
      }

      setNewPalette({ name: '', purpose: 'general', description: '', colors: [], is_public: false });
      setIsCreating(false);
      setEditingPalette(null);
      fetchPalettes();
    } catch (error) {
      console.error('Error saving palette:', error);
      toast({ title: 'Error', description: 'Failed to save palette', variant: 'destructive' });
    }
  };

  const handleDeletePalette = async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_palettes')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast({ title: 'Palette deleted', description: 'Your palette has been removed' });
      fetchPalettes();
    } catch (error) {
      console.error('Error deleting palette:', error);
      toast({ title: 'Error', description: 'Failed to delete palette', variant: 'destructive' });
    }
  };

  const handleEditPalette = (palette: CustomPalette) => {
    setEditingPalette(palette);
    setNewPalette({
      name: palette.name,
      purpose: palette.purpose,
      description: palette.description || '',
      colors: palette.colors,
      is_public: palette.is_public
    });
    setIsCreating(true);
  };

  const handleTogglePublic = async (palette: CustomPalette) => {
    try {
      const newIsPublic = !palette.is_public;
      const { error } = await supabase
        .from('custom_palettes')
        .update({
          is_public: newIsPublic,
          share_code: newIsPublic ? generateShareCode() : null
        })
        .eq('id', palette.id);
      if (error) throw error;
      toast({ 
        title: newIsPublic ? 'Palette shared' : 'Palette private', 
        description: newIsPublic ? 'Others can now view your palette' : 'Your palette is now private' 
      });
      fetchPalettes();
    } catch (error) {
      console.error('Error updating palette:', error);
    }
  };

  const copyShareLink = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/palette/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast({ title: 'Link copied', description: 'Share link copied to clipboard' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-serif text-gray-900">My Custom Palettes</h2>
          <p className="text-gray-500 mt-1">Create and save personalized color combinations for different occasions</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Palette
          </button>
        )}
      </div>

      {/* Palette Creator */}
      {isCreating && (
        <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingPalette ? 'Edit Palette' : 'Create New Palette'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPalette(null);
                setNewPalette({ name: '', purpose: 'general', description: '', colors: [], is_public: false });
              }}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Palette Name</label>
              <input
                type="text"
                value={newPalette.name}
                onChange={(e) => setNewPalette(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Office Essentials"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                value={newPalette.purpose}
                onChange={(e) => setNewPalette(prev => ({ ...prev, purpose: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {purposeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={newPalette.description}
              onChange={(e) => setNewPalette(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe when you'd use this palette..."
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>

          {/* Selected Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Colors ({newPalette.colors.length}/12)
            </label>
            <div className="min-h-[60px] p-3 bg-white rounded-xl border border-gray-200">
              {newPalette.colors.length === 0 ? (
                <p className="text-gray-400 text-sm">Click colors below to add them to your palette</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {newPalette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="group relative"
                    >
                      <div
                        className="w-10 h-10 rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <button
                        onClick={() => handleRemoveColor(color.hex)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Your Element Colors */}
          {availableColors.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Sparkles className="w-4 h-4 inline mr-1" />
                Your {userSubtype?.name || userType?.name} Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddColor(color)}
                    disabled={newPalette.colors.some(c => c.hex === color.hex)}
                    className={`group relative ${newPalette.colors.some(c => c.hex === color.hex) ? 'opacity-40' : ''}`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Accent Colors from Other Elements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Palette className="w-4 h-4 inline mr-1" />
              Accent Colors (from other elements)
            </label>
            <div className="flex flex-wrap gap-2">
              {accentColors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddColor(color)}
                  disabled={newPalette.colors.some(c => c.hex === color.hex)}
                  className={`group relative ${newPalette.colors.some(c => c.hex === color.hex) ? 'opacity-40' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewPalette(prev => ({ ...prev, is_public: !prev.is_public }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${newPalette.is_public ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${newPalette.is_public ? 'left-7' : 'left-1'}`} />
            </button>
            <span className="text-sm text-gray-700">
              {newPalette.is_public ? (
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Public - Others can view this palette</span>
              ) : (
                <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Private - Only you can see this palette</span>
              )}
            </span>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPalette(null);
                setNewPalette({ name: '', purpose: 'general', description: '', colors: [], is_public: false });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePalette}
              className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              {editingPalette ? 'Update Palette' : 'Save Palette'}
            </button>
          </div>
        </div>
      )}

      {/* Saved Palettes */}
      {palettes.length === 0 && !isCreating ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Palette className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-serif text-gray-900 mb-2">No Palettes Yet</h3>
          <p className="text-gray-500 mb-6">Create your first custom color palette to get started</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Palette
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {palettes.map((palette) => (
            <div key={palette.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{palette.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {purposeOptions.find(p => p.value === palette.purpose)?.label || 'General'}
                    </span>
                    {palette.is_public ? (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Public
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Private
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditPalette(palette)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleTogglePublic(palette)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title={palette.is_public ? 'Make Private' : 'Share'}
                  >
                    <Share2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDeletePalette(palette.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {palette.description && (
                <p className="text-sm text-gray-500 mb-3">{palette.description}</p>
              )}

              {/* Color Swatches */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {palette.colors.map((color: ColorSwatch, idx: number) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>

              {/* Share Link */}
              {palette.is_public && palette.share_code && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Share:</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{palette.share_code}</code>
                  <button
                    onClick={() => copyShareLink(palette.share_code!)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {copiedCode === palette.share_code ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomPaletteBuilder;
