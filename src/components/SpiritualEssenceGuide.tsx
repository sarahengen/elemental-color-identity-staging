import React, { useState } from 'react';
import { Sparkles, Flame, Droplets, Wind, Mountain, ChevronDown, ChevronUp, Star, Heart, Compass, Sun } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface SpiritualSubtype {
  id: string;
  combination: string;
  name: string;
  spiritualEssence: string;
  description: string;
  lesson: string;
  practice: string;
}

interface SpiritualElement {
  id: string;
  name: string;
  principle: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  subtypes: SpiritualSubtype[];
}

const spiritualData: SpiritualElement[] = [
  {
    id: 'fire',
    name: 'Fire',
    principle: 'The Principle of Transformation',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    subtypes: [
      {
        id: 'fire-fire',
        combination: 'Fire + Fire',
        name: 'The Electric Arc',
        spiritualEssence: 'The Divine Flash',
        description: 'You are the lightning bolt of clarity that shatters illusion. Your soul\'s purpose is revelation through radical truth. You exist to cut through noise and show the underlying pattern.',
        lesson: 'To strike with precision, not malice.',
        practice: 'Epiphany, the moment of absolute conviction, the un-ignorable sign.'
      },
      {
        id: 'fire-water',
        combination: 'Fire + Water',
        name: 'The Blue Flame',
        spiritualEssence: 'The Alchemical Purifier',
        description: 'You are the flame that burns in the void, the process of distillation itself. Your purpose is transformation through sublime focus—turning the lead of confusion into the gold of understanding.',
        lesson: 'To hold intensity without losing stillness.',
        practice: 'Meditation, the laboratory, the vow of silence.'
      },
      {
        id: 'fire-earth',
        combination: 'Fire + Earth',
        name: 'The Forged Iron',
        spiritualEssence: 'The Keeper of Stories',
        description: 'Your fire is the sacred flame at the center of the community, the campfire that holds space for myth, memory, and lineage. Your purpose is to preserve and transmit wisdom through warmth. You teach that true power is sustained, communal, and rooted.',
        lesson: 'To burn slowly enough to be relied upon.',
        practice: 'Ritual, storytelling, shared nourishment.'
      },
      {
        id: 'fire-air',
        combination: 'Fire + Air',
        name: 'The Illuminating Spark',
        spiritualEssence: 'The Awakener',
        description: 'Your flame is not for burning away, but for kindling inspiration. Your soul\'s purpose is to ignite curiosity, joy, and creative potential in others. You are a living reminder that enlightenment can be playful.',
        lesson: 'To spark without consuming.',
        practice: 'Celebration, laughter, the "aha!" moment.'
      }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    principle: 'The Principle of Soul-Merging',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    subtypes: [
      {
        id: 'water-air',
        combination: 'Water + Air',
        name: 'The Misty Shore',
        spiritualEssence: 'The Veil-Mender',
        description: 'Your essence is the merciful haze that softens harsh edges, allowing separate realities to blend. Your purpose is compassionate connection and the dissolution of artificial boundaries. You teach that love is a field, not a transaction.',
        lesson: 'To soften without disappearing.',
        practice: 'Forgiveness, the gentle touch, the boundary as membrane.'
      },
      {
        id: 'water-water',
        combination: 'Water + Water',
        name: 'The Forest Lake',
        spiritualEssence: 'The Reflective Abyss',
        description: 'You are the still water that holds the entire forest in its depths. Your purpose is to provide the space where truth can surface to be seen. You are the mirror that reveals the soul to itself.',
        lesson: 'To contain without stagnating.',
        practice: 'Contemplation, the mirror, the deep listening.'
      },
      {
        id: 'water-fire',
        combination: 'Water + Fire',
        name: 'The Sun-Dappled Pond',
        spiritualEssence: 'The Vessel of Memory',
        description: 'Your water is golden-hued, holding the warmth of the passing sun. Your purpose is alchemical nostalgia—transforming raw experience into bittersweet wisdom and empathy. You teach that time deepens, rather than decays.',
        lesson: 'To hold warmth without boiling over.',
        practice: 'Remembrance, legacy, the heirloom.'
      },
      {
        id: 'water-earth',
        combination: 'Water + Earth',
        name: 'The Languid Stream',
        spiritualEssence: 'The Current of Nurturance',
        description: 'Your flow is patient, persistent, and life-giving. You carve canyons of connection through gentle persistence. Your purpose is to carry and deposit the nutrients of emotional sustenance wherever you go.',
        lesson: 'To flow without losing your essence.',
        practice: 'Nurturance, emotional offering, the safe passage.'
      }
    ]
  },
  {
    id: 'air',
    name: 'Air',
    principle: 'The Principle of Revelation',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    subtypes: [
      {
        id: 'air-air',
        combination: 'Air + Air',
        name: 'The Clear Morning Sky',
        spiritualEssence: 'The Lens of Truth',
        description: 'You are the atmosphere after a storm, where clarity is absolute and vision extends to the horizon. Your purpose is to reveal objective truth with benevolent detachment. You offer the "view from above."',
        lesson: 'To clarify without chilling.',
        practice: 'Insight, the clear word, the blueprint.'
      },
      {
        id: 'air-fire',
        combination: 'Air + Fire',
        name: 'The Playful Breeze',
        spiritualEssence: 'The Spirit of Synchronicity',
        description: 'You are the wind that scatters seeds and pollinates ideas, creating unexpected and fruitful connections. Your purpose is the divine play of ideation—showing that creativity is the universe\'s native language.',
        lesson: 'To connect without forcing.',
        practice: 'Inspiration, the happy accident, the brainstorm.'
      },
      {
        id: 'air-earth',
        combination: 'Air + Earth',
        name: 'The Gilded Zephyr',
        spiritualEssence: 'The Golden Tongue',
        description: 'Your air is warmed by the sun, carrying not just ideas, but conviction and persuasive grace. Your purpose is to give inspiring form to ineffable truths, making wisdom feel warm and accessible.',
        lesson: 'To persuade without overpowering.',
        practice: 'Eloquence, the encouraging word, the shared vision.'
      },
      {
        id: 'air-water',
        combination: 'Air + Water',
        name: 'The First Whispers',
        spiritualEssence: 'The Muse\'s Breath',
        description: 'You are the almost-imperceptible shift in pressure that announces a coming idea. Your purpose is to channel the faintest signals from the creative void into the realm of potential. You are the whisper before the word, the intuition before the thought.',
        lesson: 'To suggest without imposing.',
        practice: 'Intuition, the creative hunch, the gentle nudge toward possibility.'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    principle: 'The Principle of Manifestation',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    subtypes: [
      {
        id: 'earth-fire',
        combination: 'Earth + Fire',
        name: 'The Mountain Stone',


        spiritualEssence: 'The Eternal Witness',
        description: 'You are the enduring form that observes cycles without being eroded by them. Your purpose is to provide the unshakeable ground from which perspective is gained. You teach the wisdom of "the long view."',
        lesson: 'To endure without becoming immovable.',
        practice: 'Steadfastness, the vow, the monument.'
      },
      {
        id: 'earth-earth',
        combination: 'Earth + Earth',
        name: 'The Forest Floor',
        spiritualEssence: 'The Alchemy of Decay',
        description: 'You are the process of death-into-life, the sacred composting of all experience into fertile wisdom. Your purpose is regeneration through gracious dissolution. You teach that nothing is wasted.',
        lesson: 'To transform without attachment.',
        practice: 'Composting, the offering, the cycle of return.'
      },
      {
        id: 'earth-water',
        combination: 'Earth + Water',
        name: 'The Velvet Moss',
        spiritualEssence: 'The Embrace of the Real',
        description: 'Your earth is gentle, receptive, and enveloping. Your purpose is to make embodiment feel safe, gentle, and luxurious. You teach that the physical world is a comfort, not a prison.',
        lesson: 'To nurture without smothering.',
        practice: 'Sanctuary, the caress, the humble luxury.'
      },
      {
        id: 'earth-air',
        combination: 'Earth + Air',

        name: 'The Golden Harvest',

        spiritualEssence: 'The Cornucopia',
        description: 'You are the abundant, celebratory result of effort meeting grace. Your purpose is to display the glorious beauty and richness of material manifestation. You are a hymn to the senses.',
        lesson: 'To abound without hoarding.',
        practice: 'The feast, the offering of plenty, the skilled craft.'
      }
    ]
  }

];

interface SpiritualEssenceGuideProps {
  userElement?: string | null;
  userSubtype?: string | null;
  /** When true, omit duplicate section header (used inside guide category hub). */
  embedInGuideHub?: boolean;
}

const SpiritualEssenceGuide: React.FC<SpiritualEssenceGuideProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(userSubtype || null);

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserElement = (elementId: string) => userElement === elementId;
  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Spiritual Essence</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Spiritual essence moves beyond personality traits to experiencing life through different elemental lenses.
          </p>
          <p className="text-gray-500 mt-4">
            Each element represents a fundamental principle of existence, and each subtype offers a unique spiritual path 
            and practice for connecting with that principle.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {spiritualData.map((element) => (
          <div
            key={element.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.id)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.id)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif text-gray-900">{element.name}</h3>
                    {isUserElement(element.id) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.principle}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.id) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Subtypes Content */}
            {expandedElements.includes(element.id) && (
              <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => (
                    <div
                      key={subtype.id}
                      className={`rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                        isUserSubtype(subtype.id)
                          ? GUIDE_USER_SUBTYPE_CARD_CLASS
                          : selectedSubtype === subtype.id
                          ? 'bg-white border-2 border-gray-300 shadow-md'
                          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedSubtype(selectedSubtype === subtype.id ? null : subtype.id)}
                    >
                      {/* Subtype Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          {/* Element Combination Label */}
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="text-sm font-semibold px-2.5 py-1 rounded-md"
                              style={{
                                background: `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`,
                                color: element.gradientFrom
                              }}
                            >
                              {subtype.combination}
                            </span>
                            {isUserSubtype(subtype.id) && (
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          
                          {/* Subtype Name */}
                          <h4 className="text-xl font-serif text-gray-900 mb-2">{subtype.name}</h4>
                          
                          {/* Spiritual Essence Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                            }}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {subtype.spiritualEssence}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {subtype.description}
                      </p>

                      {/* Lesson */}
                      <div className="flex items-start gap-3 mb-3 p-3 bg-amber-50 rounded-lg">
                        <Compass className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Lesson</span>
                          <p className="text-amber-900 font-medium">{subtype.lesson}</p>
                        </div>
                      </div>

                      {/* Practice */}
                      <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                        <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Practice</span>
                          <p className="text-emerald-900 font-medium">{subtype.practice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl border border-violet-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Integrating Your Spiritual Essence</h4>
            <p className="text-gray-600 leading-relaxed">
              Your spiritual essence is not a limitation but an invitation. It describes the unique lens through which 
              you naturally perceive and interact with the world. By understanding your elemental nature, you can 
              align your daily practices, creative expressions, and relationships with your deepest purpose. 
              Remember: every element contains all others within it—your dominant essence simply indicates where 
              your gifts flow most naturally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiritualEssenceGuide;
