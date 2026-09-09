import React, { useState } from 'react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';
import { Flame, Droplets, Mountain, Wind, Heart, ChevronDown, ChevronUp, Sparkles, MessageCircle, Eye, Star } from 'lucide-react';

interface ElementalLoveLanguagesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface SubtypeLoveLanguage {
  subtype: string;
  subtypeId: string;
  name: string;
  receivesLoveThrough: string;
  nonVerbalCues: string;
}

interface ElementLoveData {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  loveTheme: string;
  coreNeed: string;
  subtypes: SubtypeLoveLanguage[];
}

const elementalLoveData: ElementLoveData[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    loveTheme: 'Love as Fuel & Witness',
    coreNeed: 'Love is received when their energy is met with matching intensity, respect, and space to be sovereign.',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        receivesLoveThrough: 'Being trusted with the truth, no matter how sharp. When you bring them a complex problem without sugarcoating it, when you defend their integrity in their absence, when you give them space for absolute, uncompromising focus without interruption. Love is a clean, well-lit room where their mind can work.',
        nonVerbalCues: 'Respecting their physical and mental boundaries (not touching their things, not dropping in unannounced). Listening in complete silence when they are explaining something. A firm, confident handshake or look of mutual understanding.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        receivesLoveThrough: 'Being understood in silence. When you sit with them in a museum, at a concert, or in nature without needing to chat. When you remember a profound detail they shared once and reference it months later. When you protect their contemplative space from chaos. Love is a shared, deep appreciation of a single perfect thing.',
        nonVerbalCues: 'Matching their low-energy, calm demeanor when together. A perfectly timed cup of tea placed beside them. A gift of a rare book or ticket to an obscure lecture.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        receivesLoveThrough: 'Being relied upon and having that reliance honored. When you ask for their help with something substantial and then follow through on their advice. When you celebrate their endurance—"I don\'t know how you held it together." When you feed them a hearty meal after their labor. Love is being the cornerstone of a stable structure.',
        nonVerbalCues: 'A pat on the back that has weight to it. Taking on a physical task to lighten their load without being asked. Standing shoulder-to-shoulder with them, literally and figuratively.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        receivesLoveThrough: 'Enthusiastic co-creation and celebration. When you say "YES! Let\'s do it!" to their wild idea. When you remember their favorite song and play it to surprise them. When you amplify their joy by laughing at their jokes and sharing in their excitement. Love is a collaborative project or a spontaneous adventure.',
        nonVerbalCues: 'Bright eye contact and an animated face when they\'re talking. A spontaneous gift of something colorful or fun. Dancing with them.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    loveTheme: 'Love as a Safe Current',
    coreNeed: 'Love is received when their emotional landscape is acknowledged, held, and reflected without demand.',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        receivesLoveThrough: 'Gentle, non-invasive care. When you notice they\'re cold and offer a blanket without fuss. When you lower your voice to match theirs. When you create a peaceful atmosphere—soft lighting, tidy spaces, calm music. Love is an environment where they can relax their constant gentle buffering of the world.',
        nonVerbalCues: 'A soft touch on the arm. Remembering their favorite cozy spot and saving it for them. Speaking kindly about others in their presence.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        receivesLoveThrough: 'Being given the key to your own depths. When you share a vulnerable secret, a childhood pain, or a profound dream with them. When you sit with them in emotional silence without trying to "fix" it. When you honor their need for solitary recharging without taking it personally. Love is being someone\'s chosen confessional.',
        nonVerbalCues: 'Long, comfortable silences. A gaze that holds steady and doesn\'t look away from intensity. A gift that is symbolic and personal, not flashy.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        receivesLoveThrough: 'The curation of shared memory. When you help them sort old photos, visit a place from their past, or cook a family recipe together. When you tell a story about them that highlights their warmth and character. When you create new traditions that feel timeless. Love is adding a golden thread to the tapestry of their life.',
        nonVerbalCues: 'A warm, lingering hug. A beautifully set table for a simple meal. Saving mementos from time spent together.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        receivesLoveThrough: 'Reciprocal, tangible nurturance. When you cook for them for a change, when you notice they\'re tired and run them a bath, when you take care of a practical errand that\'s been weighing on them. When you allow them to receive care without guilt. Love is the feeling of the current flowing both ways.',
        nonVerbalCues: 'Bringing them a glass of water. Folding their laundry. A foot rub. Any act of service that says, "Your body and comfort matter."'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    loveTheme: 'Love as Mental Space & Synchronicity',
    coreNeed: 'Love is received through freedom, intellectual respect, and the joy of connected ideas.',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        receivesLoveThrough: 'Intellectual respect and the gift of mental clarity. When you engage with their ideas seriously, play devil\'s advocate to help them refine a thought, or give them uninterrupted time to think. When you organize chaos for them—planning a trip, sorting paperwork. Love is a well-ordered mind and a worthy debating partner.',
        nonVerbalCues: 'Listening with a focused, still expression. Remembering a fact or quote they mentioned. A gift of a well-designed notebook or a book on a niche interest.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        receivesLoveThrough: 'Engagement with their whirlwind and shared spontaneity. When you text them a funny meme related to an hours-ago conversation, when you\'re up for a last-minute plan, when you follow their chaotic creative thread and add to it. Love is a perpetual, joyful game of ping-pong with ideas and experiences.',
        nonVerbalCues: 'Laughing freely at their jokes. A spontaneous high-five or playful nudge. A gift of tickets to something weird and wonderful.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        receivesLoveThrough: 'Social validation and vocal appreciation. When you praise them publicly, introduce them with pride, or choose them to be the speaker or host. When you help them build their community—connecting them to people, showing up to their events. Love is being someone\'s favorite ambassador.',
        nonVerbalCues: 'A warm, sustained smile when they enter a room. Nodding along encouragingly when they speak. A gift that helps them "host" (a nice bottle, a board game).'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        receivesLoveThrough: 'Protection of their subtle energy and attention to their ethereal cues. When you notice they\'re overwhelmed and guide them to a quiet place, when you remember a dream they told you, when you accept their non-linear way of communicating without forcing clarity. Love is being a safe harbor for their drifting boat.',
        nonVerbalCues: 'Speaking softly around them. A light, almost imperceptible touch. A gift of a crystal, a scented candle, or a piece of ambient music.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    loveTheme: 'Love as Solid Ground',
    coreNeed: 'Love is received through tangible evidence of loyalty, appreciation of their substance, and shared physical reality.',
    subtypes: [
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Mountain Stone',
        receivesLoveThrough: 'Demonstrated loyalty and respect for their code. When you stand by them in a conflict, when you keep your promises to the letter, when you ask for their counsel on a matter of principle. When you acknowledge their sacrifices without sentimentalizing them. Love is being someone\'s most trusted ally.',
        nonVerbalCues: 'A firm, respectful nod. Showing up, on time, every time. Taking their side in a debate, not to flatter, but because you genuinely see their logic.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor (Pure Earth)',
        receivesLoveThrough: 'Shared, productive labor. When you get your hands dirty with them in the garden, help them build a shelf, or simply do the dishes side-by-side. When you appreciate the fruits of their labor—eating the meal they cooked with gusto, using the tool they fixed. Love is the companionship of shared, useful action.',
        nonVerbalCues: 'Passing them the right tool before they ask. A shared beer at the end of a hard day\'s work. A comfortable silence while working on separate, tangible tasks in the same room.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        receivesLoveThrough: 'The prioritization of their comfort and sensory peace. When you notice the room is too loud and find a quieter one, when you buy them the exact brand of tea they like, when you create a corner of the world that feels like a hug—plump pillows, soft lighting, their favorite scent. Love is being treated as a precious, delicate ecosystem.',
        nonVerbalCues: 'Adjusting the thermostat for them. Giving them the most comfortable chair. A gift of incredibly soft pajamas or a luxurious blanket.'
      },
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Golden Harvest',
        receivesLoveThrough: 'Celebration and sensual appreciation. When you throw a party in their honor, toast to their success, or enthusiastically admire something they\'ve made or acquired. When you engage fully with the abundance they offer—savoring a meal, admiring a decor choice. Love is being someone\'s favorite guest at the feast of life.',
        nonVerbalCues: 'A wide, appreciative smile. Clinking glasses with gusto. A gift that is beautiful, indulgent, and aesthetically aligned with their taste.'
      }
    ]
  }

];

const ElementalLoveLanguages: React.FC<ElementalLoveLanguagesProps> = ({
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-6">
            <Heart className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Elemental Love Languages</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Beyond "Words of Affirmation" or "Acts of Service," each subtype has a somatic, environmental, and energetic language for receiving love.
          </p>
          <p className="text-gray-500 mt-4">
            It's about how the world feels around them when they are truly cherished. Discover the unique ways 
            each elemental combination experiences and receives love at its deepest level.
          </p>
        </div>
      )}

      {/* Elements Accordion */}
      <div className="space-y-6">
        {elementalLoveData.map((element) => (
          <div
            key={element.elementId}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.elementId)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.elementId)}
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
                    <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                    {isUserElement(element.elementId) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.loveTheme}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Subtypes Content */}
            {expandedElements.includes(element.elementId) && (
              <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                {/* Core Need Banner */}
                <div className="px-6 pt-6 pb-2">
                  <div
                    className="p-4 rounded-xl text-white text-sm leading-relaxed flex items-start gap-3"
                    style={{
                      background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                    }}
                  >
                    <Heart className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-90" />
                    <span className="opacity-95 italic">{element.coreNeed}</span>
                  </div>
                </div>

                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => (
                    <div
                      key={subtype.subtypeId}
                      className={`rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                        isUserSubtype(subtype.subtypeId)
                          ? GUIDE_USER_SUBTYPE_CARD_CLASS
                          : selectedSubtype === subtype.subtypeId
                          ? 'bg-white border-2 border-gray-300 shadow-md'
                          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedSubtype(selectedSubtype === subtype.subtypeId ? null : subtype.subtypeId)}
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
                              {subtype.subtype}
                            </span>
                            {isUserSubtype(subtype.subtypeId) && (
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            )}
                          </div>

                          {/* Subtype Name */}
                          <h4 className="text-xl font-serif text-gray-900 mb-2">{subtype.name}</h4>

                          {/* Love Language Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                            }}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {subtype.name}
                          </div>
                        </div>
                      </div>

                      {/* Receives Love Through */}
                      <div className="flex items-start gap-3 mb-3 p-3 bg-rose-50 rounded-lg">
                        <MessageCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wide">Receives Love Through</span>
                          <p className="text-rose-900 text-sm leading-relaxed mt-1">{subtype.receivesLoveThrough}</p>
                        </div>
                      </div>

                      {/* Non-Verbal Cues */}
                      <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                        <Eye className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Non-Verbal Cues</span>
                          <p className="text-emerald-900 text-sm leading-relaxed mt-1">{subtype.nonVerbalCues}</p>
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
      <div className="mt-12 p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-2xl border border-rose-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Understanding Your Love Language</h4>
            <p className="text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">The Ultimate Love Gesture:</span> For every subtype, the deepest act of love is to see their elemental energy not as a problem to be managed, but as a sacred force to be companioned. It is to say, through action and presence: {'"'}I will not try to turn your fire to water, your earth to air. I will learn the climate in which you thrive, and I will help you build it.{'"'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ElementalLoveLanguages;
