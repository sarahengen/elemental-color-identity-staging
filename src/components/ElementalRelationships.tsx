import React, { useState } from 'react';
import { Heart, Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';


interface ElementalRelationshipsProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface RelationshipData {
  subtypeId: string;
  name: string;
  title: string;
  description: string;
}

interface ElementRelationships {
  element: string;
  elementName: string;
  theme: string;
  subtypes: RelationshipData[];
}

const relationshipsData: ElementRelationships[] = [
  {
    element: 'fire',
    elementName: 'Fire',
    theme: 'Relationships as Catalysis & Mutual Ignition',
    subtypes: [
      {
        subtypeId: 'fire-fire',
        name: 'Fire + Fire',
        title: 'The Electric Arc',
        description: 'Friendship is shared pursuit of truth. Relationships are crucibles for sharpening each other\'s minds and wills. Love is expressed through fierce loyalty and protecting each other\'s autonomy. They need partners who aren\'t afraid of productive conflict and who respect boundaries as sacred.'
      },
      {
        subtypeId: 'fire-water',
        name: 'Fire + Water',
        title: 'The Blue Flame',
        description: 'Relationship is silent, profound understanding. They seek partners who can share depth without demanding constant emotional display. Love is a private covenant, proven through steadfastness in crisis. They need a calm harbor that doesn\'t try to thaw their controlled exterior but appreciates the steady heat within.'
      },
      {
        subtypeId: 'fire-earth',
        name: 'Fire + Earth',
        title: 'The Forged Iron',
        description: 'Friendship is durable alliance. Bonds are forged in shared trials and honored through unwavering reliability. Love is demonstrated through protective action and provision. They need partners who value substance over sparkle, who see their strength as shelter, not a threat.'
      },
      {
        subtypeId: 'fire-air',
        name: 'Fire + Air',
        title: 'The Illuminating Spark',
        description: 'Relationship is celebratory co-creation. Friends are fellow adventurers and playmates. Love is expressed through enthusiastic encouragement and shared laughter. They need partners who match their optimism, who see life as a canvas for joy, and who won\'t dampen their spirit.'
      }
    ]
  },
  {
    element: 'water',
    elementName: 'Water',
    theme: 'Relationships as Deep Merging & Emotional Sanctuary',
    subtypes: [
      {
        subtypeId: 'water-air',
        name: 'Water + Air',
        title: 'The Misty Shore',
        description: 'Friendship is safe, non-judgmental presence. They create relationships that feel like a soft, accepting haze where pretenses drop. Love is expressed through gentle nurturing and empathetic listening. They need partners who are emotionally attuned, who offer reassurance, and who protect their sensitive energy.'
      },
      {
        subtypeId: 'water-water',
        name: 'Water + Water',
        title: 'The Forest Lake',
        description: 'Relationship is soul-level intimacy. They seek bonds of profound, wordless understanding. Friendship is a private depth shared with few. Love is a quiet, boundless devotion that doesn\'t require grand gestures. They need partners who are comfortable with silence and mystery, who don\'t fear their emotional depths.'
      },
      {
        subtypeId: 'water-fire',
        name: 'Water + Fire',
        title: 'The Sun-Dappled Pond',
        description: 'Friendship is shared memory and nostalgic warmth. Bonds are built on a foundation of shared history, stories, and sentimental traditions. Love is expressed through thoughtful remembrance and creating a warm, beautiful home life. They need partners who value continuity, ritual, and the poetry of everyday life.'
      },
      {
        subtypeId: 'water-earth',
        name: 'Water + Earth',
        title: 'The Languid River',
        description: 'Relationship is nurturing flow. They are the emotional caregivers, bonding through acts of service and steady support. Love is expressed by anticipating needs and creating harmony. They need partners who reciprocate care, who see their nurturance as a gift, not an obligation, and who encourage them to receive.'
      }
    ]
  },
  {
    element: 'earth',
    elementName: 'Earth',
    theme: 'Relationships as Steadfast Co-Creation & Tangible Support',
    subtypes: [
      {
        subtypeId: 'earth-fire',
        name: 'Earth + Fire',
        title: 'The Mountain Stone',
        description: 'Friendship is mutual respect and steadfast loyalty. Bonds are built on demonstrated integrity and shared principles. Love is expressed through dependability and creating a secure, stable life together. They need partners who are equally self-sufficient, who value their solidity, and who don\'t demand constant emotional demonstration.'
      },


      {
        subtypeId: 'earth-earth',
        name: 'Earth + Earth',
        title: 'The Forest Floor',
        description: 'Relationship is practical partnership and grounded growth. Friends are companions in the tangible projects of life. Love is expressed by sharing burdens, building a home, and weathering life\'s seasons together. They need partners who are real, authentic, and who appreciate the beauty of the unvarnished, everyday struggle.'
      },
      {
        subtypeId: 'earth-water',
        name: 'Earth + Water',
        title: 'The Velvet Moss',
        description: 'Friendship is comfortable, tactile closeness. They seek relationships that are cozy, safe, and physically comforting. Love is expressed through creating a beautiful, serene environment and offering gentle, reassuring touch. They need partners who are soothing presences, who value domestic harmony, and who provide a soft landing.'
      },
      {
        subtypeId: 'earth-air',
        name: 'Earth + Air',
        title: 'The Golden Harvest',
        description: 'Relationship is celebratory abundance and sensual partnership. Bonds are forged in shared feasts, creative projects, and the enjoyment of life\'s richness. Love is expressed through generosity, vibrant shared experiences, and appreciation of physical beauty. They need partners who are enthusiastic, appreciative, and who can match their zest for life\'s pleasures.'
      }

    ]
  },
  {
    element: 'air',
    elementName: 'Air',
    theme: 'Relationships as Intellectual Synergy & Liberating Alliance',
    subtypes: [
      {
        subtypeId: 'air-air',
        name: 'Air + Air',
        title: 'The Clear Morning Sky',
        description: 'Friendship is meeting of minds. They bond through stimulating conversation, shared ideals, and mutual respect for intelligence. Love is expressed through honest communication and supporting each other\'s growth and autonomy. They need partners who are their intellectual equals, who value truth over comfort, and who give them space for objectivity.'
      },
      {
        subtypeId: 'air-fire',
        name: 'Air + Fire',
        title: 'The Playful Breeze',
        description: 'Relationship is adventurous ideation and dynamic fun. Friends are co-conspirators in curiosity and creative chaos. Love is expressed through spontaneity, sharing new discoveries, and keeping things light and engaging. They need partners who are flexible, intellectually playful, and who won\'t clip their wings with excessive routine.'
      },
      {
        subtypeId: 'air-earth',
        name: 'Air + Earth',
        title: 'The Gilded Zephyr',
        description: 'Friendship is mutual inspiration and social synergy. They thrive in relationships that are outwardly positive, encouraging, and socially connected. Love is expressed through public affirmation, building a shared social world, and vocal belief in each other. They need partners who are socially adept, optimistic, and who appreciate their role as a connector and cheerleader.'
      },
      {
        subtypeId: 'air-water',
        name: 'Air + Water',
        title: 'The First Whisper',
        description: 'Relationship is intuitive connection and ethereal understanding. They seek bonds that transcend words, built on subtle energy and unspoken knowing. Love is expressed through creating a peaceful, aesthetically harmonious space and respecting each other\'s need for quiet and dreaming. They need partners who are gentle, perceptive, and who can protect their delicate energy from the harshness of the world.'
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
    default: return <Heart className="w-5 h-5" />;
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
        gradientFrom: '#6b7280',
        gradientTo: '#9ca3af',
      };
  }
};

const ElementalRelationships: React.FC<ElementalRelationshipsProps> = ({
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
    const elementData = relationshipsData.find(e => e.element === userElement);
    if (!elementData) return null;
    return elementData.subtypes.find(s => s.subtypeId === userSubtype);
  };

  const userSubtypeData = getUserSubtypeData();

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-2xl p-8 border border-rose-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-serif text-gray-900">Understanding Elemental Relationships</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg italic">
            "Each subtype seeks core assurance in relationship: Conflict arises not from a lack of love, but from speaking different elemental languages—the Fire's need for challenge vs. the Water's need for peace, the Earth's need for stability vs. the Air's need for freedom. Harmony is found when each learns to translate their love into the native tongue of the other."
          </p>
        </div>
      )}

      {/* User's Subtype Highlight */}
      {userSubtypeData && (
        <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 rounded-2xl p-6 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Your Relationship Style</span>
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
              <p className="text-gray-600 leading-relaxed">{userSubtypeData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Elements */}
      <div className="space-y-4">
        {relationshipsData.map((elementData) => {
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
                      {elementData.theme}
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
                              <p className="text-gray-600 leading-relaxed text-sm">{subtype.description}</p>
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
            Take the quiz to discover your elemental relationship style
          </p>
        </div>
      )}
    </div>
  );
};

export default ElementalRelationships;
