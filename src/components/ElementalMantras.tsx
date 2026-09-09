import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, Star } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';

interface ElementalMantrasProps {
  userElement?: string | null;
  userSubtype?: string | null;
}

/* ─── Imperative Data ─── */
const imperatives = [
  {
    id: 'fire',
    keyword: 'BURN',
    element: 'Fire',
    icon: <Flame className="w-7 h-7" />,
    imperative: 'Burn with purpose',
    line1: 'Not just destruction, but the flame of transformation.',
    line2: 'To burn is to change the nature of things, to transmute energy from one state to another.',
    color: 'text-orange-600',
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
    border: 'border-orange-200',
    accent: 'bg-orange-500',
    ring: 'ring-orange-300',
    glow: 'shadow-orange-100',
  },
  {
    id: 'water',
    keyword: 'FLOW',
    element: 'Water',
    icon: <Droplets className="w-7 h-7" />,
    imperative: 'Flow with grace.',
    line1: 'Not just movement, but the wisdom of adaptation.',
    line2: 'To flow is to move around obstacles, not through force but through persistence.',
    color: 'text-blue-600',
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    accent: 'bg-blue-500',
    ring: 'ring-blue-300',
    glow: 'shadow-blue-100',
  },
  {
    id: 'air',
    keyword: 'THINK',
    element: 'Air',
    icon: <Wind className="w-7 h-7" />,
    imperative: 'Think with clarity.',
    line1: 'Not just intellect, but the space between thoughts.',
    line2: '',
    color: 'text-sky-600',
    bg: 'bg-gradient-to-br from-sky-50 to-indigo-50',
    border: 'border-sky-200',
    accent: 'bg-sky-500',
    ring: 'ring-sky-300',
    glow: 'shadow-sky-100',
  },
  {
    id: 'earth',
    keyword: 'GROW',
    element: 'Earth',
    icon: <Mountain className="w-7 h-7" />,
    imperative: 'Grow with patience.',
    line1: 'Not just accumulation, but the patience of becoming.',
    line2: '',
    color: 'text-emerald-600',
    bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
    border: 'border-emerald-200',
    accent: 'bg-emerald-500',
    ring: 'ring-emerald-300',
    glow: 'shadow-emerald-100',
  },
];



/* ─── Ritual Data ─── */
const ritualSteps = [
  { action: 'Light a candle', element: 'Burn', icon: <Flame className="w-5 h-5 text-orange-500" />, color: 'border-orange-300 bg-orange-50' },
  { action: 'Pour a bowl of water', element: 'Flow', icon: <Droplets className="w-5 h-5 text-blue-500" />, color: 'border-blue-300 bg-blue-50' },
  { action: 'Burn incense', element: 'Think — air carries scent', icon: <Wind className="w-5 h-5 text-sky-500" />, color: 'border-sky-300 bg-sky-50' },
  { action: 'Place a stone or plant', element: 'Grow', icon: <Mountain className="w-5 h-5 text-emerald-500" />, color: 'border-emerald-300 bg-emerald-50' },
];

/* ─── Element Colors (matching Ultimate Purpose) ─── */
const getElementIcon = (element: string) => {
  switch (element) {
    case 'fire': return <Flame className="w-5 h-5" />;
    case 'water': return <Droplets className="w-5 h-5" />;
    case 'earth': return <Mountain className="w-5 h-5" />;
    case 'air': return <Wind className="w-5 h-5" />;
    default: return <Star className="w-5 h-5" />;
  }
};

const getElementColors = (element: string) => {
  switch (element) {
    case 'fire':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        accent: 'bg-red-100',
        iconBg: 'bg-gradient-to-br from-[#C41E3A] to-[#FF6B35]',
        gradientFrom: '#C41E3A',
        gradientTo: '#FF6B35',
      };
    case 'water':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        accent: 'bg-blue-100',
        iconBg: 'bg-gradient-to-br from-[#6B8BA4] to-[#B4A7D6]',
        gradientFrom: '#6B8BA4',
        gradientTo: '#B4A7D6',
      };
    case 'earth':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        accent: 'bg-amber-100',
        iconBg: 'bg-gradient-to-br from-[#8B4513] to-[#228B22]',
        gradientFrom: '#8B4513',
        gradientTo: '#228B22',
      };
    case 'air':
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        accent: 'bg-emerald-100',
        iconBg: 'bg-gradient-to-br from-[#00CED1] to-[#FFE135]',
        gradientFrom: '#00CED1',
        gradientTo: '#FFE135',
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        accent: 'bg-gray-100',
        iconBg: 'bg-gray-500',
        gradientFrom: '#6B7280',
        gradientTo: '#9CA3AF',
      };
  }
};

/* ─── Subtype Data ─── */
interface Subtype {
  id: string;
  name: string;
  title: string;
  quote: string;
  bullets: string[];
  meditation: string;
}

interface ElementSubtypes {
  elementId: string;
  elementName: string;
  subtypes: Subtype[];
}

const elementSubtypes: ElementSubtypes[] = [
  {
    elementId: 'fire',
    elementName: 'Fire',
    subtypes: [
      {
        id: 'fire-fire',
        name: 'Fire + Fire',
        title: 'THE ELECTRIC ARC',
        quote: 'To connect, to bridge, to illuminate suddenly.',
        bullets: [
          'Not the slow burn, but the instant of recognition',
          'The synapse firing between separated thoughts',
          'The flash that reveals what was always there',
        ],
        meditation: 'Where can I be the bridge today? What needs sudden clarity?',
      },
      {
        id: 'fire-water',
        name: 'Fire + Water',
        title: 'THE BLUE FLAME',
        quote: 'To refine, to purify, to focus completely.',
        bullets: [
          'Burn away everything but the essence',
          'The surgeon\'s precision, the scientist\'s clarity',
          'Heat without waste, energy without excess',
        ],
        meditation: 'What in me needs distillation? Where must my energy be laser-focused?',
      },
      {
        id: 'fire-earth',
        name: 'Fire + Earth',
        title: 'THE FORGE FIRE',
        quote: 'To shape, to strengthen, to make useful.',
        bullets: [
          'Fire as tool, not just force',
          'Transforming raw material into purpose',
          'The marriage of destruction and creation',
        ],
        meditation: 'What raw experience can I forge into strength today? What needs tempering?',
      },
      {
        id: 'fire-air',
        name: 'Fire + Air',
        title: 'THE ILLUMINATING SPARK',
        quote: 'To ignite, to begin, to inspire quietly.',
        bullets: [
          'The tiny start of everything large',
          'The idea before the plan, the glance before the love',
          'Courage in miniature form',
        ],
        meditation: 'What small beginning needs my courage? What ember of possibility can I protect today?',
      },
    ],
  },
  {
    elementId: 'water',
    elementName: 'Water',
    subtypes: [
      {
        id: 'water-air',
        name: 'Water + Air',
        title: 'THE MISTY SHORE',
        quote: 'To soften, to veil, to reveal gradually.',
        bullets: [
          'The boundary that gentles hard edges',
          'The slow unveiling of truth',
          'Moisture that makes things grow without drowning',
        ],
        meditation: 'What needs softening in my perception? What truth reveals itself only in gentle light?',
      },
      {
        id: 'water-water',
        name: 'Water + Water',
        title: 'THE FOREST LAKE',
        quote: 'To reflect, to absorb, to hold deeply.',
        bullets: [
          'Stillness that receives everything',
          'Depth that doesn\'t disturb the surface',
          'The mirror that shows back more than was given',
        ],
        meditation: 'What do I need to reflect upon without distortion? What depth am I afraid to sound?',
      },
      {
        id: 'water-fire',
        name: 'Water + Fire',
        title: 'THE SUN-DAPPLED POND',
        quote: 'To dance, to celebrate, to scatter joy.',
        bullets: [
          'Water that plays with light',
          'Movement without destination',
          'The everyday made magical through refraction',
        ],
        meditation: 'Where can I find playful beauty today? How can I scatter light instead of hoarding it?',
      },
      {
        id: 'water-earth',
        name: 'Water + Earth',
        title: 'THE LANGUAGE RIVER',
        quote: 'To carry, to tell, to connect stories.',
        bullets: [
          'Water as narrator',
          'The current that links mountain to ocean',
          'Memory flowing toward meaning',
        ],
        meditation: 'What story am I carrying? What upstream source needs acknowledging in my downstream journey?',
      },
    ],
  },
  {
    elementId: 'earth',
    elementName: 'Earth',
    subtypes: [
      {
        id: 'earth-fire',
        name: 'Earth + Fire',
        title: 'THE MOUNTAIN STONE',
        quote: 'To endure, to mark, to witness silently.',
        bullets: [
          'The patient record-keeper',
          'Stability that makes perspective possible',
          'Weight that grounds everything light',
        ],
        meditation: 'What in me needs unmovable commitment? What view requires my steady perspective?',
      },
      {
        id: 'earth-earth',
        name: 'Earth + Earth',
        title: 'THE FOREST FLOOR',
        quote: 'To compost, to nourish, to transform death.',
        bullets: [
          'The alchemy of decay into fertility',
          'The dark, necessary work beneath beauty',
          'Humility that feeds greatness',
        ],
        meditation: 'What old self needs composting? What decay in my life contains tomorrow\'s nourishment?',
      },
      {
        id: 'earth-water',
        name: 'Earth + Water',
        title: 'THE VELVET MOSS',
        quote: 'To cloak, to soften, to collaborate quietly.',
        bullets: [
          'Gentleness over hardness',
          'Community of tiny beings making one blanket',
          'Success through cooperation, not competition',
        ],
        meditation: 'What hardness in me needs softening? Where can I be part of a quiet, collective beauty?',
      },
      {
        id: 'earth-air',
        name: 'Earth + Air',
        title: 'THE GOLDEN HARVEST',
        quote: 'To fruit, to offer, to celebrate abundance.',
        bullets: [
          'The patient work made visible',
          'Generosity as natural law',
          'The climax that contains its own end',
        ],
        meditation: 'What in me is ready for harvest? How can I offer my abundance without clinging to it?',
      },
    ],
  },
  {
    elementId: 'air',
    elementName: 'Air',
    subtypes: [
      {
        id: 'air-air',
        name: 'Air + Air',
        title: 'THE CLEAR MORNING SKY',
        quote: 'To empty, to make space, to hold potential.',
        bullets: [
          'The blank page before the word',
          'The inhale before the song',
          'Vastness that welcomes everything',
        ],
        meditation: 'What clutter needs clearing in my mental sky? What potential needs empty space to manifest?',
      },
      {
        id: 'air-fire',
        name: 'Air + Fire',
        title: 'THE PLAYFUL BREEZE',
        quote: 'To stir, to tickle, to remind of movement.',
        bullets: [
          'Air that remembers joy',
          'The nudge that prevents stagnation',
          'Freedom in gentle form',
        ],
        meditation: 'What has become too still in my life? Where can I bring a breath of playful change?',
      },
      {
        id: 'air-fire-gilded',
        name: 'Air + Fire',
        title: 'THE GILDED ZEPHYR',
        quote: 'To carry scent, to gild, to make luxurious.',
        bullets: [
          'Air that enriches everything it touches',
          'The breath of sophistication',
          'Beauty as atmosphere',
        ],
        meditation: 'How can I make the ordinary feel sacred today? What scent of memory or hope can I carry forward?',
      },
      {
        id: 'air-water',
        name: 'Air + Water',
        title: 'THE FIRST WHISPER',
        quote: 'To hint, to suggest, to begin secretly.',
        bullets: [
          'The almost-sound that changes everything',
          'Intimacy as elemental force',
          'Truth too tender for shouting',
        ],
        meditation: 'What truth in me is still at whisper-stage? What beginning needs protection in quiet?',
      },
    ],
  },
];


/* ─── Component ─── */
const ElementalMantras: React.FC<ElementalMantrasProps> = ({ userElement, userSubtype }) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(userElement ? [userElement] : ['fire']);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);

  const toggleElement = (id: string) => {
    setExpandedElements(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
    setExpandedSubtype(null);
  };

  const toggleSubtype = (id: string) => {
    setExpandedSubtype(prev => (prev === id ? null : id));
  };

  const isUserSubtype = (subtypeId: string) => {
    if (!userElement || !userSubtype) return false;
    return subtypeId === userSubtype || subtypeId === `${userElement}-${userSubtype?.split('-')[1]}`;
  };

  return (
    <div className="space-y-16">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm mb-6">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <span className="text-sm font-medium text-gray-700">The Four Imperatives</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-4 leading-tight">
          To Burn, To Flow, To Think, To Grow
        </h2>
      </div>

      {/* ═══════════════════ FOUR IMPERATIVES ═══════════════════ */}
      <div className="grid sm:grid-cols-2 gap-6">
        {imperatives.map((imp) => (
          <div
            key={imp.id}
            className={`${imp.bg} rounded-2xl p-6 md:p-8 border ${imp.border} shadow-sm ${imp.glow} transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`${imp.accent} text-white p-2.5 rounded-xl`}>
                {imp.icon}
              </div>
              <div>
                <h3 className={`text-xl font-bold ${imp.color}`}>
                  TO {imp.keyword} <span className="text-gray-400 font-normal text-base">({imp.element})</span>
                </h3>
                <p className="text-sm text-gray-600 italic">{imp.imperative}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-1">{imp.line1}</p>
            {imp.line2 && <p className="text-gray-700 leading-relaxed">{imp.line2}</p>}
          </div>
        ))}
      </div>



      {/* ═══════════════════ RITUAL OF WHOLENESS ═══════════════════ */}
      <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 rounded-3xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-serif text-center text-gray-900 mb-2">
          A Ritual of Wholeness
        </h3>
        <p className="text-center text-gray-500 mb-8 text-sm">Gather all four elements in one space</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {ritualSteps.map((step, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 ${step.color} p-6 text-center transition-transform hover:scale-105`}
            >
              <div className="flex justify-center mb-3">{step.icon}</div>
              <p className="font-medium text-gray-900 mb-1">{step.action}</p>
              <p className="text-xs text-gray-500 italic">({step.element})</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SUBTYPE SECTIONS (Ultimate Purpose style) ═══════════════════ */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-2">Elemental Subtypes</h3>
          <p className="text-gray-500 max-w-xl mx-auto">
            Each fusion carries its own archetype, meditation, and calling. Explore all four elements and their unique combinations below.
          </p>
        </div>

        <div className="space-y-4">
          {elementSubtypes.map((elGroup) => {
            const colors = getElementColors(elGroup.elementId);
            const isExpanded = expandedElements.includes(elGroup.elementId);
            const isUserElement = elGroup.elementId === userElement;

            return (
              <div
                key={elGroup.elementId}
                className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ${guideUserElementCardClass(
                  isUserElement
                )}`}
              >
                {/* Element Header */}
                <button
                  onClick={() => toggleElement(elGroup.elementId)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center text-white shadow-md`}>
                      {getElementIcon(elGroup.elementId)}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-serif text-gray-900">{elGroup.elementName}</h3>
                        {isUserElement && (
                          <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                            Your Element
                          </span>
                        )}
                      </div>
                      <GuideElementSubtitlePill gradientFrom={colors.gradientFrom} gradientTo={colors.gradientTo}>
                        Mantras & Meditations
                      </GuideElementSubtitlePill>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                {/* Subtypes */}
                {isExpanded && (
                  <div className="p-6 bg-white">
                    <div className="grid gap-4">
                      {elGroup.subtypes.map((sub) => {
                        const isUser = isUserSubtype(sub.id);
                        const secondElementId = sub.id.includes('-fire-gilded') ? 'fire' : sub.id.split('-')[1];
                        const secondColors = getElementColors(secondElementId);
                        const isSubExpanded = expandedSubtype === sub.id;

                        return (
                          <div
                            key={sub.id}
                            className={`rounded-xl border transition-all duration-200 ${
                              isUser
                                ? 'border-amber-300 bg-amber-50/50 shadow-md'
                                : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {/* Subtype Header */}
                            <button
                              onClick={() => toggleSubtype(sub.id)}
                              className="w-full p-5 flex items-start gap-4 text-left"
                            >
                              <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                                <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center text-white`}>
                                  {getElementIcon(elGroup.elementId)}
                                </div>
                                <span className="text-gray-300 text-lg">+</span>
                                <div className={`w-8 h-8 rounded-lg ${secondColors.iconBg} flex items-center justify-center text-white`}>
                                  {getElementIcon(secondElementId)}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.accent} ${colors.text}`}>
                                    {elGroup.elementName}
                                  </span>
                                  <span className="text-xs text-gray-400">+</span>
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${secondColors.accent} ${secondColors.text}`}>
                                    {secondElementId.charAt(0).toUpperCase() + secondElementId.slice(1)}
                                  </span>
                                  {isUser && (
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-200 text-amber-700 ml-auto">
                                      Your Type
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-lg font-serif text-gray-900 mb-1">{sub.title}</h4>
                                <p className="text-gray-600 italic text-sm">&ldquo;{sub.quote}&rdquo;</p>
                              </div>
                              <div className="flex-shrink-0 mt-1">
                                {isSubExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                            </button>

                            {/* Subtype Expanded Content */}
                            {isSubExpanded && (
                              <div className="px-5 pb-5 space-y-5">
                                {/* Divider */}
                                <div className="border-t border-gray-100" />

                                {/* Bullet Points */}
                                <ul className="space-y-2.5 pl-[calc(2rem+0.25rem+2rem+0.25rem+1rem)]">
                                  {sub.bullets.map((bullet, bi) => (
                                    <li key={bi} className="flex items-start gap-3">
                                      <span
                                        className={`w-1.5 h-1.5 mt-2 rounded-full flex-shrink-0`}
                                        style={{
                                          background: `linear-gradient(135deg, ${colors.gradientFrom}, ${colors.gradientTo})`,
                                        }}
                                      />
                                      <span className="text-gray-700 leading-relaxed text-sm">{bullet}</span>
                                    </li>
                                  ))}
                                </ul>

                                {/* Meditation */}
                                <div
                                  className="rounded-xl p-5 border ml-[calc(2rem+0.25rem+2rem+0.25rem+1rem)]"
                                  style={{
                                    background: `linear-gradient(135deg, ${colors.gradientFrom}08, ${colors.gradientTo}08)`,
                                    borderColor: `${colors.gradientFrom}25`,
                                  }}
                                >
                                  <p
                                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                                    style={{ color: colors.gradientFrom }}
                                  >
                                    Meditation
                                  </p>
                                  <p className="text-gray-800 italic leading-relaxed font-serif text-base">
                                    &ldquo;{sub.meditation}&rdquo;
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ElementalMantras;
