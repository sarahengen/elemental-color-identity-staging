import React, { useState } from 'react';
import { elementalTypes } from '@/data/elementalTypes';
import { getNailPalette, NailColor } from '@/data/nailData';
import { Palette, Sparkles, Star, Brush, Lightbulb, Flame, Droplets, Mountain, Wind } from 'lucide-react';

interface NailColorGuideProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

type NailCategory = 'everydayNeutrals' | 'boldStatement' | 'seasonalPicks' | 'specialOccasion';

const ElementIcon: React.FC<{ element: string; className?: string; style?: React.CSSProperties }> = ({
  element,
  className = 'w-5 h-5',
  style,
}) => {
  switch (element) {
    case 'fire':
      return <Flame className={className} style={style} />;
    case 'water':
      return <Droplets className={className} style={style} />;
    case 'earth':
      return <Mountain className={className} style={style} />;
    case 'air':
      return <Wind className={className} style={style} />;
    default:
      return <Sparkles className={className} style={style} />;
  }
};

const elementColors: Record<string, { hex: string; secondary: string; accent: string; primary: string }> = {
  fire: { hex: '#E11D48', secondary: 'bg-rose-100', accent: 'text-rose-600', primary: 'from-rose-600 to-red-700' },
  water: { hex: '#3B82F6', secondary: 'bg-blue-100', accent: 'text-blue-600', primary: 'from-blue-400 to-indigo-500' },
  earth: { hex: '#D97706', secondary: 'bg-amber-100', accent: 'text-amber-600', primary: 'from-amber-500 to-orange-600' },
  air: { hex: '#10B981', secondary: 'bg-emerald-100', accent: 'text-emerald-600', primary: 'from-emerald-400 to-teal-500' },
};

const seasonMap: Record<string, string> = { fire: 'Winter', water: 'Summer', earth: 'Autumn', air: 'Spring' };

const categoryTabs: { id: NailCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'everydayNeutrals', label: 'Everyday Neutrals', icon: Palette },
  { id: 'boldStatement', label: 'Bold Statement', icon: Sparkles },
  { id: 'seasonalPicks', label: 'Seasonal Picks', icon: Star },
  { id: 'specialOccasion', label: 'Special Occasion', icon: Brush },
];

const difficultyColor: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
};

const NailColorGuide: React.FC<NailColorGuideProps> = ({ userElement, userSubtype, embedInGuideHub = false }) => {
  const firstElement = userElement || 'fire';
  const elementData = elementalTypes.find((t) => t.id === firstElement) || elementalTypes[0];
  const defaultSubtype = userSubtype || elementData.subtypes[0]?.id || 'fire-fire';

  const [selectedElement, setSelectedElement] = useState(elementData.id);
  const [selectedSubtype, setSelectedSubtype] = useState(defaultSubtype);
  const [activeTab, setActiveTab] = useState<NailCategory>('everydayNeutrals');

  const currentElement = elementalTypes.find((t) => t.id === selectedElement) || elementalTypes[0];
  const palette = getNailPalette(selectedSubtype);
  const colors = elementColors[selectedElement] ?? elementColors.fire;
  const subtypeName = currentElement.subtypes.find((s) => s.id === selectedSubtype)?.name ?? selectedSubtype;

  const handleElementChange = (elementId: string) => {
    setSelectedElement(elementId);
    const el = elementalTypes.find((t) => t.id === elementId);
    if (el && el.subtypes.length > 0) setSelectedSubtype(el.subtypes[0].id);
  };

  const NailSwatch: React.FC<{ color: NailColor }> = ({ color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="w-full h-14 rounded-lg mb-3 border border-gray-100" style={{ backgroundColor: color.hex }} />
      <p className="font-semibold text-gray-900 text-sm">{color.name}</p>
      {(color.brand || color.productName) && (
        <p className="text-xs text-gray-500 mt-1">
          {[color.brand, color.productName].filter(Boolean).join(' \u2014 ')}
        </p>
      )}
      {color.finish && (
        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 capitalize">
          {color.finish}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden p-8 border-b bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500">
        <div className="relative z-10">
          {!embedInGuideHub && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Brush className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif text-white drop-shadow-md">Nail Color Guide</h2>
                <p className="text-white/90 drop-shadow-sm">Polish shades and nail art for your coloring</p>
              </div>
            </div>
          )}

          <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white">{subtypeName}</span>
          </div>

          {/* Element Selector */}
          <div className="flex flex-wrap gap-3 mt-6">
            {elementalTypes.map((element) => (
              <button
                key={element.id}
                onClick={() => handleElementChange(element.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  selectedElement === element.id
                    ? 'bg-white text-gray-900 shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                }`}
              >
                <ElementIcon element={element.id} className="w-5 h-5" />
                <span>{element.name}</span>
                <span className="text-sm opacity-75">({seasonMap[element.id]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Subtype Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Subtype</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentElement.subtypes.map((subtype) => (
              <button
                key={subtype.id}
                onClick={() => setSelectedSubtype(subtype.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedSubtype === subtype.id
                    ? `ring-2 shadow-lg scale-[1.02] ${colors.secondary}`
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
                style={
                  selectedSubtype === subtype.id
                    ? ({ '--tw-ring-color': colors.hex } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.hex }} />
                  <span className="font-medium text-gray-900">{subtype.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {!palette ? (
          <div className="text-center py-12 text-gray-500">Nail palette coming soon for this subtype.</div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryTabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                  style={activeTab === id ? { backgroundColor: colors.hex } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {palette[activeTab].map((color, idx) => (
                <NailSwatch key={idx} color={color} />
              ))}
            </div>

            {/* Recommended finishes */}
            {palette.recommendedFinishes.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Recommended Finishes</h3>
                <div className="flex flex-wrap gap-2">
                  {palette.recommendedFinishes.map((finish, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                    >
                      {finish}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nail art tips */}
            {palette.nailArtTips.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <Brush className="w-5 h-5" style={{ color: colors.hex }} />
                  Nail Art Ideas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {palette.nailArtTips.map((tip, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm">{tip.pattern}</p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                            difficultyColor[tip.difficulty] ?? 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tip.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General tips */}
            {palette.generalTips.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5" style={{ color: colors.hex }} />
                  Nail Tips for {subtypeName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {palette.generalTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.hex }} />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA for users without a type */}
        {!userElement && (
          <div className={`mt-10 bg-gradient-to-r ${colors.primary} rounded-2xl p-8 text-center text-white`}>
            <h3 className="text-2xl font-bold mb-3">Discover Your Perfect Nail Colors</h3>
            <p className="text-lg opacity-90 mb-2 max-w-2xl mx-auto">
              Take the elemental quiz to unlock nail shades tailored to your exact subtype.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NailColorGuide;
