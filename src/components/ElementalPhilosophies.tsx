import React, { useState } from 'react';
import { Sparkles, Flame, Droplets, Wind, Mountain, ChevronDown, ChevronUp, BookOpen, Lightbulb, Scale } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface PhilosophySubtype {
  id: string;
  combination: string;
  name: string;
  coreTenet: string;
  ethicalImperative: string;
}

interface PhilosophyElement {
  id: string;
  name: string;
  philosophy: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  subtypes: PhilosophySubtype[];
}

const philosophyData: PhilosophyElement[] = [
  {
    id: 'fire',
    name: 'Fire',
    philosophy: 'The Philosophy of Transformative Agency',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    subtypes: [
      {
        id: 'fire-fire',
        combination: 'Fire + Fire',
        name: 'Philosophy of Radical Clarity',
        coreTenet: 'Truth is an act of precision. Reality is best understood through stark contrasts and undeniable principles. Clarity is not coldness; it is the highest form of integrity. To see things as they truly are is the first ethical act. The self is forged in the moment of decisive choice.',
        ethicalImperative: 'Purify illusion. Your role is to cut through ambiguity, hypocrisy, and muddled thinking. Your presence should sharpen the world.'
      },
      {
        id: 'fire-water',
        combination: 'Fire + Water',
        name: 'Philosophy of Alchemical Stillness',
        coreTenet: 'The most intense transformation occurs in perfect containment. Power is not expressed through expansion, but through focused, cool intensity. The void is not empty; it is full of potential. Stillness is the precursor to revelation.',
        ethicalImperative: 'Hold the tension of opposites. Your role is to be the crucible where contradictions are resolved into higher understanding, without spilling over.'
      },
      {
        id: 'fire-earth',
        combination: 'Fire + Earth',
        name: 'Philosophy of Enduring Will',
        coreTenet: 'Strength is tempered, not innate. Character, like metal, is shaped under pressure and cooled in resolve. Value is earned through trial. The most profound light is the one that glows from within enduring darkness. Legacy is built layer by layer.',
        ethicalImperative: 'Become unbreakable for a purpose. Your role is to provide the durable framework upon which others can rely.'
      },
      {
        id: 'fire-air',
        combination: 'Fire + Air',
        name: 'Philosophy of Irrepressible Vitality',
        coreTenet: 'Optimism is a creative force. Joy is not frivolous; it is the engine of creation and connection. Life is meant to be engaged with enthusiasm. Inspiration is contagious and should be spread without reserve. Growth is inherently good.',
        ethicalImperative: 'Ignite potential. Your role is to be the catalyst that awakens energy and possibility in others, banishing cynicism.'
      }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    philosophy: 'The Philosophy of Receptive Depth',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    subtypes: [
      {
        id: 'water-air',
        combination: 'Water + Air',
        name: 'Philosophy of Gentle Dissolution',
        coreTenet: 'Boundaries are permeable and softening is a virtue. True connection requires a gentle blurring of edges. Harsh truths are best delivered wrapped in compassion. Atmosphere is more influential than argument. Peace is cultivated, not declared.',
        ethicalImperative: 'Create safe harbors. Your role is to soften the hard edges of the world, allowing for healing and connection.'
      },
      {
        id: 'water-water',
        combination: 'Water + Water',
        name: 'Philosophy of Reflective Wisdom',
        coreTenet: 'Stillness reveals what activity obscures. The deepest truths are not shouted; they are reflected in calm depths. All experience settles into sediment, forming wisdom. To understand a thing, one must be able to hold its image without distortion.',
        ethicalImperative: 'Provide the mirror. Your role is to offer a calm, reflective space where others (and yourself) can see their true nature.'
      },
      {
        id: 'water-fire',
        combination: 'Water + Fire',
        name: 'Philosophy of Golden Memory',
        coreTenet: 'The past is not dead; it is a nutrient-rich soil. Nostalgia, when distilled, becomes empathy. Beauty is found in the patina of time, the warmth of shared memory. Growth is cyclical, feeding on what has decayed.',
        ethicalImperative: 'Tend the roots. Your role is to be the keeper of stories and the connector of generations, finding the warmth in melancholy.'
      },
      {
        id: 'water-earth',
        combination: 'Water + Earth',
        name: 'Philosophy of Nurturing Flow',
        coreTenet: 'Sustenance is found in gentle, persistent motion. To nurture is not to smother, but to provide a constant, supportive current. Community is built through small, daily acts of care. Strength is fluid and adaptive.',
        ethicalImperative: 'Carry life forward. Your role is to be the connective tissue of your community, ensuring well-being flows where it is needed.'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    philosophy: 'The Philosophy of Substantial Reality',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    subtypes: [
      {
        id: 'earth-air',
        combination: 'Earth + Air',
        name: 'Philosophy of Abundant Manifestation',
        coreTenet: 'Prosperity is evidence of harmonious effort. The senses are sacred pathways to gratitude. To create, craft, and celebrate bounty is to participate in divine generosity. Life should be a feast for the senses and the soul.',
        ethicalImperative: 'Celebrate and share the feast. Your role is to demonstrate that material and spiritual abundance are not opposed, but intertwined.'

      },
      {
        id: 'earth-earth',
        combination: 'Earth + Earth',
        name: 'Philosophy of Generative Decay',
        coreTenet: 'Nothing is wasted; everything is transformed. Death is not an end but a return to the creative process. Richness comes from complexity, layering, and recycling. Authenticity is found in the unvarnished, the rustic, the process itself.',
        ethicalImperative: 'Compost experience into wisdom. Your role is to transform what is spent or broken into fertile ground for new growth.'
      },
      {
        id: 'earth-water',
        combination: 'Earth + Water',
        name: 'Philosophy of Gentle Embodiment',
        coreTenet: 'The physical world is a comfort to be cherished. Luxury is found in subtlety and tactile peace. To make the immediate environment beautiful and nurturing is a spiritual practice. Growth should be soft, slow, and enveloping.',
        ethicalImperative: 'Sanctify the everyday. Your role is to make embodiment feel safe, pleasant, and deeply appreciated.'
      },


      {
        id: 'earth-fire',
        combination: 'Earth + Fire',
        name: 'Philosophy of Solemn Endurance',
        coreTenet: 'There is dignity in bearing witness. Change happens around enduring forms. Principle is the bedrock of character. Silence is not absence; it is a form of profound presence. To stand firm is a sacred offering in a shifting world.',
        ethicalImperative: 'Be the bedrock. Your role is to provide unshakeable stability and integrity, a reference point in chaos.'
      }
    ]
  },

  {
    id: 'air',
    name: 'Air',
    philosophy: 'The Philosophy of Lucid Perception',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    subtypes: [
      {
        id: 'air-air',
        combination: 'Air + Air',
        name: 'Philosophy of Lucid Truth',
        coreTenet: 'Reality is best perceived with detached clarity. The mind, like a clear sky, should be free of obscuring clouds. Communication should aim for perfect transparency. Ideals are navigational stars. Understanding precedes effective action.',
        ethicalImperative: 'Illuminate without heat. Your role is to provide the clarifying perspective that allows for right understanding and just decisions.'
      },
      {
        id: 'air-fire',
        combination: 'Air + Fire',
        name: 'Philosophy of Connective Synergy',
        coreTenet: 'Ideas gain power through recombination. Creativity is the playful collision of disparate concepts. Rigidity is the enemy of innovation. Joy is a valid and powerful mode of inquiry. The universe is a dynamic, interactive system.',
        ethicalImperative: 'Cross-pollinate. Your role is to break down silos, connect people and ideas, and reveal the playful intelligence of existence.'
      },
      {
        id: 'air-earth',
        combination: 'Air + Earth',
        name: 'Philosophy of Persuasive Optimism',
        coreTenet: 'Positive vision is a social good. Ideas must be warmed by heart to motivate change. Communication is an act of building consensus and hope. The future is a compelling story that must be told well. Potential is a reality waiting to be acknowledged.',
        ethicalImperative: 'Narrate the uplifting story. Your role is to be the articulate voice of hope, turning abstract ideals into inviting, shared visions.'
      },
      {
        id: 'air-water',
        combination: 'Air + Water',
        name: 'Philosophy of Nascent Potential',
        coreTenet: 'The most powerful forces are those just coming into being. Attention should be paid to the subtle, the hint, the barely-formed. Silence is the canvas for inspiration. To rush definition is to kill possibility. The ethereal is real.',
        ethicalImperative: 'Guard the seed of inspiration. Your role is to listen for and protect the fragile beginnings of ideas, feelings, and movements, allowing them space to form.'
      }
    ]
  }
];


interface ElementalPhilosophiesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const ElementalPhilosophies: React.FC<ElementalPhilosophiesProps> = ({
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-violet-100 mb-6">
            <BookOpen className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Philosophies</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your Elemental Type is not just a color palette; it is a lived philosophy—a way of being, 
            perceiving, and interacting with reality. To understand your subtype's philosophy is to know 
            your unique function.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {philosophyData.map((element) => (
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
                    {element.philosophy}
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
                      <div className="mb-4">
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
                            <Sparkles className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                        
                        {/* Philosophy Name */}
                        <h4 className="text-xl font-serif text-gray-900">{subtype.name}</h4>
                      </div>

                      {/* Core Tenet */}
                      <div className="flex items-start gap-3 mb-4 p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Core Tenet</span>
                          <p className="text-gray-700 leading-relaxed mt-1">{subtype.coreTenet}</p>
                        </div>
                      </div>

                      {/* Ethical Imperative */}
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg">
                        <Scale className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">Ethical Imperative</span>
                          <p className="text-indigo-900 font-medium mt-1">{subtype.ethicalImperative}</p>
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
      <div className="mt-12 p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 rounded-2xl border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Living Your Philosophy</h4>
            <p className="text-gray-600 leading-relaxed">
              Your elemental philosophy is not a prescription but an invitation to deeper self-understanding. 
              It describes the lens through which you naturally perceive reality and the unique contribution 
              you are positioned to make. By aligning your actions with your core tenet and ethical imperative, 
              you move from merely existing to purposefully being. Remember: all philosophies contain wisdom, 
              and understanding others' perspectives enriches your own.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalPhilosophies;
