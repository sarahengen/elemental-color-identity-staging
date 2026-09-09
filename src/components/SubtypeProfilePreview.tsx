import React, { useState } from 'react';
import { elementalTypes } from '@/data/elementalTypes';
import { makeupPalettes } from '@/data/makeupData';
import { getJewelryData } from '@/data/jewelryData';
import { hairColorData } from './HairColorGuide';
import {
  Sparkles, ArrowRight, Crown, Briefcase, Heart, Leaf, Compass,
  Palette, BookOpen, Eye, Star, Droplets, Quote, Scissors, Brush, Gem
} from 'lucide-react';

interface SubtypeProfilePreviewProps {
  onStartQuiz: () => void;
  onJoinMembership: () => void;
}

// Energy-guide preview cards shown in the mockup
const energyGuides = [
  { icon: Briefcase, title: 'Career & Calling', blurb: 'Your depth is built to hold, remember, and steward. Roles where you keep culture and meaning alive.', accent: '#6495ED' },
  { icon: Heart, title: 'Love Language', blurb: 'You love through shared memory and quiet devotion — warmth that flickers beneath a calm surface.', accent: '#C4647C' },
  { icon: Compass, title: 'Life Purpose', blurb: 'To reflect and warm. You exist to turn memory into wisdom and make others feel deeply seen.', accent: '#DA70D6' },
  { icon: Leaf, title: 'Elemental Nutrition', blurb: 'Joyful, shared, colorful food — nourishment that celebrates without tipping into excess.', accent: '#4A8B8B' },
  { icon: BookOpen, title: 'Philosophy', blurb: 'You move through the world as the Reflective Storyteller — drawn to legacy, beauty, and continuity.', accent: '#708090' },
  { icon: Star, title: 'Celebrity Twin', blurb: 'You share your cool, clear coloring with iconic Cool Summer figures.', accent: '#C9A0DC' },
];


const SubtypeProfilePreview: React.FC<SubtypeProfilePreviewProps> = ({ onStartQuiz, onJoinMembership }) => {
  // Sample subtype: Water+Fire (Cool Summer) — The Sun-Dappled Pond
  const water = elementalTypes.find(t => t.id === 'water')!;
  const subtype = water.subtypes.find(s => s.id === 'water-fire')!;
  const [activeGuide, setActiveGuide] = useState<number | null>(null);

  // Derived hair / makeup / jewelry data for the Water+Fire sample
  const waterHairGuide = hairColorData
    .find(e => e.elementId === 'water')?.subtypeGuides
    .find(s => s.subtypeId === 'water-fire');
  const hairColors = (waterHairGuide?.bestColors || [])
    .flatMap(c => c.colors)
    .slice(0, 4);

  const makeup = makeupPalettes['water-fire'];
  const lipstickColors = (makeup?.lipstick || []).slice(0, 4);
  const eyeColors = (makeup?.eyeshadow || []).slice(0, 4);

  const jewelry = getJewelryData('water', 'water-fire');
  const bestMetals = (jewelry?.metals || []).filter(m => m.rating === 'best').slice(0, 3);
  const gemstones = (jewelry?.gemstones || []).slice(0, 4);



  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-rose-50/40 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-5 border border-amber-100">
            <Eye className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.18em]">A peek inside your profile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">See What Your Result Looks Like</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Here is a sample of the profile for <span className="font-medium text-gray-900">Water+Fire</span> — one of 16 elemental subtypes.
            Your own quiz unlocks a sample of your personalized palette.
          </p>

        </div>

        {/* Mock profile card */}
        <div className="relative">
          <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative rounded-[2rem] bg-white shadow-2xl border border-gray-100 overflow-hidden">
            {/* Browser-style chrome bar for an "app screenshot" feel */}
            <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <span className="w-3 h-3 rounded-full bg-rose-300" />
              <span className="w-3 h-3 rounded-full bg-amber-300" />
              <span className="w-3 h-3 rounded-full bg-emerald-300" />
              <span className="ml-3 text-xs text-gray-400 font-medium tracking-wide">your-elemental-profile</span>
            </div>

            {/* Profile hero band */}
            <div
              className="px-6 md:px-10 py-10 relative"
              style={{ background: `linear-gradient(135deg, ${subtype.colors[2].hex}14, ${subtype.colors[3].hex}14, ${subtype.colors[1].hex}10)` }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${subtype.colors[2].hex}, ${subtype.colors[1].hex})` }}
                >
                  <Droplets className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-600 font-semibold mb-1">Your Elemental Subtype</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-gray-900">{subtype.name}</h3>
                  <p className="text-gray-500 mt-1">
                    Water Element · Secondary influence of Fire · {subtype.seasonalName}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                    {subtype.elementalExpression.themes.slice(0, 5).map(theme => (
                      <span key={theme} className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-700 border border-gray-200">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-10 py-10 grid lg:grid-cols-2 gap-10">
              {/* Color palette */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-amber-500" />
                  <h4 className="text-lg font-serif text-gray-900">Your Color Palette</h4>
                </div>
                <div className="grid grid-cols-6 gap-2.5 mb-4">
                  {subtype.colors.map(color => (
                    <div key={color.name} className="group/swatch text-center">
                      <div
                        className="aspect-square rounded-xl shadow-sm border border-black/5 transition-transform group-hover/swatch:scale-110"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <span className="block mt-1.5 text-[10px] text-gray-400 leading-tight truncate">{color.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  12+ hand-selected shades across primary, secondary, accent, and neutral tones —
                  with hex codes and a downloadable guide.
                </p>

                {/* Sample outfit / styling strip */}
                <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Signature Look</p>
                  <div className="flex items-center gap-3">
                    {subtype.colors.slice(0, 3).map(c => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full shadow-inner border border-black/5" style={{ backgroundColor: c.hex }} />
                      </div>
                    ))}
                    <p className="text-sm text-gray-600 italic">
                      &ldquo;{subtype.name} wears Rose Pink better than anyone.&rdquo;
                    </p>

                  </div>
                </div>
              </div>

              {/* Essence quote + archetypes */}
              <div className="flex flex-col">
                <div className="rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                  <Quote className="w-8 h-8 text-amber-400/60 mb-3" />
                  <p className="font-serif text-lg leading-relaxed text-gray-100 italic">
                    {subtype.elementalExpression.inNature}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {subtype.elementalExpression.archetypes.map(a => (
                      <span key={a} className="px-3 py-1 rounded-full text-xs bg-white/10 text-amber-200 border border-white/10">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-gray-600 leading-relaxed text-[15px]">
                  {subtype.description.split('.').slice(0, 2).join('.')}.
                </p>
              </div>
            </div>

            {/* Energy guides mockup */}
            <div className="px-6 md:px-10 pb-10">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <h4 className="text-lg font-serif text-gray-900">A Glimpse of Your Energy Guides</h4>
                <span className="ml-auto text-xs text-gray-400">6 of 35 shown</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {energyGuides.map((guide, idx) => {
                  const Icon = guide.icon;
                  const open = activeGuide === idx;
                  return (
                    <button
                      key={guide.title}
                      onMouseEnter={() => setActiveGuide(idx)}
                      onMouseLeave={() => setActiveGuide(null)}
                      onClick={() => setActiveGuide(open ? null : idx)}
                      className="text-left rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${guide.accent}1A` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: guide.accent }} />
                      </div>
                      <h5 className="font-medium text-gray-900 mb-1">{guide.title}</h5>
                      <p className={`text-sm text-gray-500 leading-relaxed transition-all ${open ? '' : 'line-clamp-2'}`}>
                        {guide.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hair, Makeup & Jewelry preview */}
            <div className="px-6 md:px-10 pb-10 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-6 mt-6">
                <Sparkles className="w-5 h-5 text-rose-500" />
                <h4 className="text-lg font-serif text-gray-900">Your Beauty &amp; Style Guides</h4>
                <span className="ml-auto text-xs text-gray-400">Hair · Makeup · Jewelry</span>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {/* Hair */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#5B4B3B20' }}>
                      <Scissors className="w-4 h-4" style={{ color: '#5B4B3B' }} />

                    </div>
                    <h5 className="font-medium text-gray-900">Hair Color</h5>
                  </div>
                  <div className="space-y-2.5">
                    {hairColors.map(c => (
                      <div key={c.name} className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: c.hex }} />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-800 font-medium truncate">{c.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{c.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                    Cool, clear shades with soft definition that flatter your Cool Summer coloring.
                  </p>
                </div>

                {/* Makeup */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E8A4B833' }}>
                      <Brush className="w-4 h-4" style={{ color: '#C4647C' }} />

                    </div>
                    <h5 className="font-medium text-gray-900">Makeup</h5>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Lipstick</p>
                      <div className="flex gap-2">
                        {lipstickColors.map(c => (
                          <span key={c.name} className="w-7 h-7 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: c.hex }} title={c.name} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Eyeshadow</p>
                      <div className="flex gap-2">
                        {eyeColors.map(c => (
                          <span key={c.name} className="w-7 h-7 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: c.hex }} title={c.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                    Cool pinks and clear berries with foundation in a {makeup?.foundation.undertone} undertone.
                  </p>

                </div>

                {/* Jewelry */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C0C0C033' }}>
                      <Gem className="w-4 h-4" style={{ color: '#7C7C7C' }} />

                    </div>
                    <h5 className="font-medium text-gray-900">Jewelry</h5>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Best Metals</p>
                      <div className="flex flex-wrap gap-1.5">
                        {bestMetals.map(m => (
                          <span key={m.name} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] text-gray-600">
                            <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: m.hex }} />
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Gemstones</p>
                      <div className="flex gap-2">
                        {gemstones.map(g => (
                          <span key={g.name} className="w-7 h-7 rounded-full shadow-inner border border-black/10" style={{ backgroundColor: g.hex }} title={g.name} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                    Cool silver and rose gold with clear, refined stones for elegant, quiet contrast.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SubtypeProfilePreview;
