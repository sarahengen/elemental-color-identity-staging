import React, { useState, useEffect } from 'react';
import { ElementalType, ColorSwatch } from '@/data/elementalTypes';
import { Copy, Check, Download, ChevronDown, Heart } from 'lucide-react';
import {
  SavedPaletteColor,
  buildPaletteColorId,
  makeSavedPaletteColor,
} from '@/lib/savedPalette';

interface ColorPaletteProps {
  type: ElementalType;
  subtype?: string | null;
  /** Colors the user has already saved to their personal palette */
  savedPaletteColors?: SavedPaletteColor[];
  /** Save a color to the personal palette. If absent, save buttons are hidden. */
  onSaveColor?: (color: SavedPaletteColor) => void;
  /** Remove a color from the personal palette */
  onRemoveColor?: (colorId: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  type,
  subtype,
  savedPaletteColors = [],
  onSaveColor,
  onRemoveColor,
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(subtype || null);
  const [showSubtypeDropdown, setShowSubtypeDropdown] = useState(false);

  // Keep in sync when parent passes a subtype after mount (e.g. profile load) or navigation.
  useEffect(() => {
    setSelectedSubtype(subtype || null);
  }, [subtype]);

  const canSave = !!onSaveColor;
  const savedIds = new Set(savedPaletteColors.map(c => c.id));

  // Get the active palette (subtype if selected, otherwise main type)
  const getActivePalette = (): ColorSwatch[] => {
    if (selectedSubtype) {
      const subtypeData = type.subtypes.find(s => s.id === selectedSubtype);
      if (subtypeData) return subtypeData.colors;
    }
    return type.colors;
  };

  const getActiveSubtypeData = () => {
    if (selectedSubtype) {
      return type.subtypes.find(s => s.id === selectedSubtype);
    }
    return null;
  };

  const activePalette = getActivePalette();
  const activeSubtype = getActiveSubtypeData();

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const toggleSave = (color: ColorSwatch) => {
    const id = buildPaletteColorId(type.id, selectedSubtype, color.hex);
    if (savedIds.has(id)) {
      onRemoveColor?.(id);
    } else {
      onSaveColor?.(
        makeSavedPaletteColor(color, {
          elementId: type.id,
          subtypeId: selectedSubtype,
          elementName: type.name,
          subtypeName: activeSubtype?.name,
        })
      );
    }
  };

  const downloadPalette = () => {
    const paletteName = activeSubtype ? activeSubtype.name : type.name;
    const paletteText = activePalette.map(c => `${c.name}: ${c.hex}`).join('\n');
    const blob = new Blob([`${paletteName} Color Palette\n\n${paletteText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paletteName.toLowerCase().replace(/\s+/g, '-')}-color-palette.txt`;
    a.click();
  };

  const groupedColors = {
    primary: activePalette.filter(c => c.category === 'primary'),
    secondary: activePalette.filter(c => c.category === 'secondary'),
    accent: activePalette.filter(c => c.category === 'accent'),
    neutral: activePalette.filter(c => c.category === 'neutral'),
  };

  const ColorSwatchComponent = ({ color }: { color: ColorSwatch }) => {
    const id = buildPaletteColorId(type.id, selectedSubtype, color.hex);
    const isSaved = savedIds.has(id);
    return (
      <div className="group relative">
        <div
          className="w-full aspect-square rounded-xl shadow-md border border-gray-100 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
          style={{ backgroundColor: color.hex }}
          onClick={() => copyToClipboard(color.hex)}
        />
        {/* Copy hint */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          {copiedColor === color.hex ? (
            <Check className="w-6 h-6 text-white drop-shadow-lg" />
          ) : (
            <Copy className="w-5 h-5 text-white drop-shadow-lg" />
          )}
        </div>
        {/* Save to palette button */}
        {canSave && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleSave(color); }}
            title={isSaved ? 'Remove from My Palette' : 'Save to My Palette'}
            aria-label={isSaved ? 'Remove from My Palette' : 'Save to My Palette'}
            className={`absolute top-1.5 right-1.5 p-1.5 rounded-full backdrop-blur-sm transition-all ${
              isSaved
                ? 'bg-white/90 text-rose-500 opacity-100 shadow'
                : 'bg-black/25 text-white opacity-0 group-hover:opacity-100 hover:bg-black/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        )}
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-800 truncate">{color.name}</p>
          <p className="text-xs text-gray-500 uppercase">{color.hex}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-serif text-gray-900">Your Color Palette</h3>
          <p className="text-gray-500 mt-1">
            {activeSubtype ? `${activeSubtype.name} (${type.season})` : `${type.name} (${type.season})`}
          </p>
          {canSave && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              Tap the heart on any color to save it to My Palette
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Subtype selector */}
          <div className="relative">
            <button
              onClick={() => setShowSubtypeDropdown(!showSubtypeDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
            >
              {activeSubtype ? activeSubtype.name : 'All Subtypes'}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSubtypeDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                <button
                  onClick={() => {
                    setSelectedSubtype(null);
                    setShowSubtypeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    !selectedSubtype ? 'text-gray-900 font-medium' : 'text-gray-600'
                  }`}
                >
                  Main {type.name} Palette
                </button>
                {type.subtypes.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedSubtype(st.id);
                      setShowSubtypeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                      selectedSubtype === st.id ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: st.colors[0].hex }}
                    />
                    {st.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={downloadPalette}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Subtype description if selected */}
      {activeSubtype && (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-700">{activeSubtype.description}</p>
        </div>
      )}

      {/* Primary Colors */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Primary Colors</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {groupedColors.primary.map((color, idx) => (
            <ColorSwatchComponent key={idx} color={color} />
          ))}
        </div>
      </div>

      {/* Secondary Colors */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Secondary Colors</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {groupedColors.secondary.map((color, idx) => (
            <ColorSwatchComponent key={idx} color={color} />
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Accent Colors</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {groupedColors.accent.map((color, idx) => (
            <ColorSwatchComponent key={idx} color={color} />
          ))}
        </div>
      </div>

      {/* Neutral Colors */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Neutral Colors</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {groupedColors.neutral.map((color, idx) => (
            <ColorSwatchComponent key={idx} color={color} />
          ))}
        </div>
      </div>

      {/* All Subtypes Overview */}
      {!selectedSubtype && (
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="text-lg font-serif text-gray-900 mb-6">Your {type.name} Subtypes</h4>
          <div className="grid md:grid-cols-2 gap-6">
            {type.subtypes.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedSubtype(st.id)}
                className="text-left bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-1">
                    {st.colors.slice(0, 4).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <h5 className="font-medium text-gray-900 group-hover:text-gray-700">{st.name}</h5>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{st.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;
