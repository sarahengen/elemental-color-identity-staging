import React, { useState } from 'react';
import { Shield, Flame, Droplets, Mountain, Wind, AlertTriangle, ChevronDown } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  GUIDE_USER_SUBTYPE_CARD_CLASS,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  guideUserElementCardClass,
} from '@/lib/guideElementVisualTheme';

interface ElementalBlocksProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface ElementalBlock {
  subtype: string;
  subtypeId: string;
  name: string;
  fear: string;
  description: string;
}

interface ElementData {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  subtypes: ElementalBlock[];
}

const elementalBlocksData: ElementData[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        fear: 'The Fear of Being Blunted',
        description: 'Being forced into environments of constant compromise, ambiguity, or emotional coddling where their sharp clarity is treated as a flaw. A world that values harmony over truth.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        fear: 'The Fear of Spilling Over',
        description: 'Being pressured to perform warmth, emotional display, or rapid, shallow action. An environment that distrusts stillness and demands constant, noisy engagement.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        fear: 'The Fear of Being Unmanned/Unmade',
        description: 'Being rendered useless, having their strength and reliability taken for granted or disrespected. A context where endurance has no purpose and authority is undermined.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        fear: 'The Fear of the Wet Blanket',
        description: 'Chronic cynicism, pessimism, or a rigid, joyless environment that systematically dismisses or punishes enthusiasm, play, and optimism.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        fear: 'The Fear of Harshness',
        description: 'Confrontation, aggression, loud noise, and emotionally arid environments. Being forced to harden their edges and defend against constant psychic abrasion.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        fear: 'The Fear of Being Dredged',
        description: 'Invasive scrutiny, forced transparency, and a culture that pathologizes depth and privacy. Being asked to explain the inexplicable depths of their feeling on demand.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        fear: 'The Fear of Rootlessness',
        description: 'A presentist culture with no respect for history, memory, or lineage. Constant, disruptive change that severs connection to the past and makes nostalgia seem like a weakness.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        fear: 'The Fear of the Barren Desert',
        description: 'A selfish, transactional, uncaring environment where nurturance is exploited, not reciprocated. Emotional and physical sterility with no one to care for and no sustenance in return.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',

        fear: 'The Fear of Sand',
        description: 'Moral relativity, shifting goalposts, and a lack of any solid principles to build upon. Anarchy and chaos that render their steadfastness foolish.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        fear: 'The Fear of the Sterile Lab',
        description: 'An over-intellectualized, virtual, or hyper-sanitized world disconnected from dirt, cycles, decay, and tangible, gritty reality.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        fear: 'The Fear of the Bleak Concrete Cell',
        description: 'Harsh lighting, uncomfortable textures, sensory overload, and environments devoid of comfort, subtlety, or gentle beauty. Functional ugliness.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',

        name: 'The Golden Harvest',
        fear: 'The Fear of Famine',
        description: 'Scarcity mindset, Puritanical restraint, and an aesthetic of minimalism that denies abundance, sensuality, and celebration. Being told that beauty and bounty are morally suspect.'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        fear: 'The Fear of Fog',
        description: 'Emotional manipulation, "fake news," illogical arguments, and systems where truth is subordinate to feeling or profit. An environment where clarity is impossible.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        fear: 'The Fear of the Silo',
        description: 'Rigid routines, bureaucratic silos, and literal or figurative boxes that prevent cross-pollination, spontaneity, and the free flow of ideas and people.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        fear: 'The Fear of the Echo Chamber of Cynicism',
        description: 'A culture of irony, detachment, and coolness that meets warmth with mockery and sees persuasion as manipulation. An audience that refuses to be inspired.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        fear: 'The Fear of the Blaring Siren',
        description: 'Crassness, literalism, constant noise, and a complete cultural deafness to nuance, subtlety, and the unspoken. A world with no room for whispers.'
      }
    ]
  }
];


const ElementalBlocks: React.FC<ElementalBlocksProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Each Elemental subtype's greatest gift contains the seed of its own inhibition. Their primary strength, when inverted or blocked, becomes their primary prison. The single greatest obstacle is being trapped in an environment, relationship, or cultural narrative that systematically negates the validity of their core elemental language.
          </p>
        </div>
      )}

      {/* Elements list — white cards, teal outline when expanded (reference: Imbalance-style accordion) */}
      <div className="space-y-4">
        {elementalBlocksData.map((element) => {
          const isOpen = expandedElements.includes(element.elementId);
          return (
          <div
            key={element.element}
            className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.elementId)
            )}`}
          >
            {/* Element Header */}
            <button
              type="button"
              onClick={() => toggleElement(element.elementId)}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-gray-50/80 transition-colors text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left min-w-0">
                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                    <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                    {isUserElement(element.elementId) && (
                      <span className={`shrink-0 ${GUIDE_USER_ELEMENT_BADGE_CLASS}`}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill
                    gradientFrom={element.gradientFrom}
                    gradientTo={element.gradientTo}
                    className="mt-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  >
                    Blocks
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 shrink-0 ml-2 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>

            {/* Subtypes Content */}
            {isOpen && (
              <div className="border-t border-gray-100 bg-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => {
                    const isHighlighted = isUserSubtype(subtype.subtypeId);
                    
                    return (
                      <div
                        key={subtype.subtype}
                        className={`relative rounded-xl p-6 transition-all duration-300 ${
                          isHighlighted
                            ? GUIDE_USER_SUBTYPE_CARD_CLASS
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        style={{
                          background: !isHighlighted
                            ? `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`
                            : undefined
                        }}
                      >
                        {/* User's Subtype Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-3 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Your Block
                            </span>
                          </div>
                        )}

                        {/* Subtype Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                              color: element.gradientFrom
                            }}
                          >
                            {subtype.subtype}
                          </span>
                        </div>

                        {/* Subtype Name */}
                        <h4 className="text-xl font-bold mb-2 text-gray-900">
                          {subtype.name}
                        </h4>

                        {/* Fear Title */}
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4" style={{ color: element.gradientFrom }} />
                          <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                            {subtype.fear}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="p-4 bg-white/80 rounded-lg">
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.description}
                          </p>
                        </div>

                        {/* Decorative corner accent */}
                        <div 
                          className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-tr-xl rounded-bl-full"
                          style={{
                            background: `linear-gradient(to bottom left, ${element.gradientFrom}30, transparent)`
                          }}
                        />
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

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 rounded-2xl border border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Understanding Your Blocks</h4>
            <p className="text-gray-600 leading-relaxed">
              The Universal Block: At its root, for every subtype, the single greatest obstacle is being trapped in an environment, relationship, or cultural narrative that systematically negates the validity of their core elemental language. It is the profound isolation of speaking your native tongue in a land where it is not only foreign but considered dangerous or defective. Healing comes from finding or creating the ecological niche where that elemental language is the mother tongue.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalBlocks;
