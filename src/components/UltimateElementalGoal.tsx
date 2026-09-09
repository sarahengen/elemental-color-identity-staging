import React, { useState } from 'react';
import { Target, Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';

interface UltimateElementalGoalProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface GoalData {
  subtypeId: string;
  name: string;
  title: string;
  goal: string;
}

interface ElementGoals {
  element: string;
  elementName: string;
  subtypes: GoalData[];
}

const goalsData: ElementGoals[] = [
  {
    element: 'fire',
    elementName: 'Fire',
    subtypes: [
      {
        subtypeId: 'fire-fire',
        name: 'Fire + Fire',
        title: 'The Electric Arc',
        goal: 'To become a Conduit of Pure Truth—where personal will dissolves into a flawless instrument for clarity, striking only where illusion needs shattering, without ego or cruelty.'
      },
      {
        subtypeId: 'fire-water',
        name: 'Fire + Water',
        title: 'The Blue Flame',
        goal: 'To become the Stillpoint of Alchemical Transformation—holding such focused intensity that it effortlessly transmutes base experience into crystalline wisdom, without freezing or fragmenting.'
      },
      {
        subtypeId: 'fire-earth',
        name: 'Fire + Earth',
        title: 'The Forged Iron',
        goal: 'To become the Unshakable Anvil of Legacy—a tempered strength upon which worthy things are built and sustained, providing a dependable foundation for generations.'
      },
      {
        subtypeId: 'fire-air',
        name: 'Fire + Air',
        title: 'The Illuminating Spark',
        goal: 'To become the Eternal Kindler—whose very presence ignites the creative and joyful potential in all they meet, leaving a trail of awakened inspiration.'
      }
    ]
  },
  {

    element: 'water',
    elementName: 'Water',
    subtypes: [
      {
        subtypeId: 'water-air',
        name: 'Water + Air',
        title: 'The Misty Shore',
        goal: 'To become a Sanctuary of Softening Grace—where harsh realities are gently absorbed and healed, creating spaces where all beings feel safe to be vulnerable.'
      },
      {
        subtypeId: 'water-water',
        name: 'Water + Water',
        title: 'The Forest Lake',
        goal: 'To become the Mirror of Deep Knowing—possessing such still depth that it reflects the true essence of everything placed before it, revealing soul-truths without distortion.'
      },
      {
        subtypeId: 'water-fire',
        name: 'Water + Fire',
        title: 'The Sun-Dappled Pond',
        goal: 'To become the Keeper of Golden Memory—alchemizing all past experience, sweet and bitter, into a boundless reservoir of empathetic wisdom and nourishing nostalgia.'
      },
      {
        subtypeId: 'water-earth',
        name: 'Water + Earth',
        title: 'The Languid River',
        goal: 'To become the Current of Unconditional Nurturance—a flowing, patient force that carries and sustains life effortlessly, ensuring no one within its reach goes unnourished.'
      }
    ]
  },
  {
    element: 'earth',
    elementName: 'Earth',
    subtypes: [
      {
        subtypeId: 'earth-fire',
        name: 'Earth + Fire',
        title: 'The Mountain Stone',
        goal: 'To become the Eternal Witness—an immovable presence that imparts perspective and courage simply by enduring, embodying the dignity of time itself.'
      },
      {
        subtypeId: 'earth-earth',
        name: 'Earth + Earth',
        title: 'The Forest Floor',
        goal: 'To become the Alchemy of Life from Death—mastering the sacred art of decay so completely that it becomes a boundless source of fertility for new growth.'
      },
      {
        subtypeId: 'earth-water',
        name: 'Earth + Water',
        title: 'The Velvet Moss',
        goal: 'To become the Embodiment of Sacred Comfort—making the physical world a tender, welcoming home, proving that embodiment itself is a divine sanctuary.'
      },
      {
        subtypeId: 'earth-air',
        name: 'Earth + Air',
        title: 'The Golden Harvest',
        goal: 'To become the Celebration of Manifested Abundance—a living testament to the glorious, sensuous bounty that arises when spirit takes material form.'
      }

    ]
  },
  {
    element: 'air',
    elementName: 'Air',
    subtypes: [
      {
        subtypeId: 'air-air',
        name: 'Air + Air',
        title: 'The Clear Morning Sky',
        goal: 'To become the Lens of Objective Clarity—through which the fundamental architecture of reality is perceived and articulated without bias or fog.'
      },
      {
        subtypeId: 'air-fire',
        name: 'Air + Fire',
        title: 'The Playful Breeze',
        goal: 'To become the Spirit of Synchronicity—weaving a web of chance and connection so deftly that it reveals the hidden, joyful intelligence of the universe.'
      },
      {
        subtypeId: 'air-earth',
        name: 'Air + Earth',
        title: 'The Gilded Zephyr',
        goal: 'To become the Voice of Inspired Consensus—translating lofty ideals into warm, compelling language that unites communities and turns vision into shared action.'
      },
      {
        subtypeId: 'air-water',
        name: 'Air + Water',
        title: 'The First Whisper',
        goal: 'To become the Gateway to the Unformed—a perfectly clear channel for the faintest signals of inspiration from the void, giving nascent beauty its first form.'
      }
    ]
  }
];

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

const UltimateElementalGoal: React.FC<UltimateElementalGoalProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(userElement ? [userElement] : ['fire']);

  const toggleElement = (element: string) => {
    setExpandedElements(prev => 
      prev.includes(element) 
        ? prev.filter(e => e !== element)
        : [...prev, element]
    );
  };

  const getUserSubtypeData = () => {
    if (!userElement || !userSubtype) return null;
    const elementData = goalsData.find(e => e.element === userElement);
    if (!elementData) return null;
    return elementData.subtypes.find(s => s.subtypeId === userSubtype);
  };

  const userSubtypeData = getUserSubtypeData();

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl p-8 border border-violet-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-serif text-gray-900">The Ultimate Elemental Goal</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg italic">
            "The goal is not to change one's nature, but to fulfill its highest potential and achieve its unique form of wholeness."
          </p>
        </div>
      )}

      {/* User's Subtype Highlight */}
      {userSubtypeData && (
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Your Ultimate Goal</span>
          </div>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl ${getElementColors(userElement!).iconBg} flex items-center justify-center flex-shrink-0`}>
              {getElementIcon(userElement!)}
              <span className="text-white ml-1">{getElementIcon(userSubtype!.split('-')[1])}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getElementColors(userElement!).accent} ${getElementColors(userElement!).text}`}>
                  {userElement!.charAt(0).toUpperCase() + userElement!.slice(1)}
                </span>
                <span className="text-xs text-gray-400">+</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getElementColors(userSubtype!.split('-')[1]).accent} ${getElementColors(userSubtype!.split('-')[1]).text}`}>
                  {userSubtype!.split('-')[1].charAt(0).toUpperCase() + userSubtype!.split('-')[1].slice(1)}
                </span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-2">{userSubtypeData.title}</h4>
              <p className="text-gray-600 leading-relaxed">{userSubtypeData.goal}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Elements */}
      <div className="space-y-4">
        {goalsData.map((elementData) => {
          const colors = getElementColors(elementData.element);
          const isExpanded = expandedElements.includes(elementData.element);
          const isUserElement = elementData.element === userElement;

          return (
            <div 
              key={elementData.element} 
              className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ${guideUserElementCardClass(
                isUserElement
              )}`}
            >
              {/* Element Header */}
              <button
                onClick={() => toggleElement(elementData.element)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center text-white shadow-md`}>
                    {getElementIcon(elementData.element)}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-serif text-gray-900">{elementData.elementName}</h3>
                      {isUserElement && (
                        <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                          Your Element
                        </span>
                      )}
                    </div>
                    <GuideElementSubtitlePill gradientFrom={colors.gradientFrom} gradientTo={colors.gradientTo}>
                      Ultimate Goals & Highest Potential
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
                    {elementData.subtypes.map((subtype) => {
                      const isUserSubtype = subtype.subtypeId === userSubtype;
                      const secondElement = subtype.subtypeId.split('-')[1];
                      const secondColors = getElementColors(secondElement);

                      return (
                        <div
                          key={subtype.subtypeId}
                          className={`p-5 rounded-xl border transition-all duration-200 ${
                            isUserSubtype 
                              ? 'border-amber-300 bg-amber-50/50 shadow-md' 
                              : 'border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center text-white`}>
                                {getElementIcon(elementData.element)}
                              </div>
                              <span className="text-gray-300 text-lg">+</span>
                              <div className={`w-8 h-8 rounded-lg ${secondColors.iconBg} flex items-center justify-center text-white`}>
                                {getElementIcon(secondElement)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.accent} ${colors.text}`}>
                                  {elementData.elementName}
                                </span>
                                <span className="text-xs text-gray-400">+</span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${secondColors.accent} ${secondColors.text}`}>
                                  {secondElement.charAt(0).toUpperCase() + secondElement.slice(1)}
                                </span>
                                {isUserSubtype && (
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-200 text-amber-700 ml-auto">
                                    Your Type
                                  </span>
                                )}
                              </div>
                              <h4 className="text-lg font-serif text-gray-900 mb-2">{subtype.title}</h4>
                              <p className="text-gray-600 leading-relaxed text-sm">{subtype.goal}</p>
                            </div>
                          </div>
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

      {/* Call to Action if no type */}
      {!userElement && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Take the quiz to discover your ultimate elemental goal
          </p>
        </div>
      )}
    </div>
  );
};

export default UltimateElementalGoal;
