import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, Quote, Zap } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface SecretSauceSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  secretSauce: string;
  impression: string;
}

interface SecretSauceElement {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: SecretSauceSubtype[];
}

const secretSauceData: SecretSauceElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'The Gift of Forward Motion',
    subtypes: [
      {
        subtype: 'Pure Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        secretSauce: 'Your clarity is not harshness; it is efficiency. You need to know that your rapid diagnosis and direct communication are not intimidating—they are time-saving and trust-building. People don\'t need you to soften your conclusions; they need you to invite them into your logic. The phrase "Here is what I see—am I missing anything?" transforms your precision from a verdict into a collaboration.',
        impression: '"She sees the core problem instantly. I trust her judgment."'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        secretSauce: 'Your silence is not disengagement; it is processing. You need to know that your quiet, focused demeanor reads as depth, not distance. When you speak after extended listening, your words carry disproportionate weight. Do not force participation in rapid brainstorming. Instead, signal your engagement with a nod, a note, a steady gaze. Then deliver the synthesized insight that no one else could have formulated.',
        impression: '"He doesn\'t speak often, but when he does, it changes the conversation."'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        secretSauce: 'Your loyalty is not predictability; it is the foundation of trust. You need to know that your consistent reliability and protective instincts are not "unambitious" or "resistant to change." You are the ballast that allows the organization to take calculated risks. Your role is to ask "How do we ensure this new direction doesn\'t compromise our core?" Own the voice of sustainable growth.',
        impression: '"She is the person you want in the room when the stakes are high and the path is unclear."'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        secretSauce: 'Your enthusiasm is not naivete; it is catalytic. You need to know that your optimism and creative energy are not "unserious." You are the innovation catalyst who prevents teams from stagnating in risk-averse cynicism. Your role is to ask "What if we tried something different?" and to make the answer feel exciting, not threatening. Your joy is a professional asset.',
        impression: '"He makes hard problems feel like exciting puzzles. The team works better when he\'s present."'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'The Gift of Cohesion',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        secretSauce: 'Your gentleness is not weakness; it is psychological safety. You need to know that your soft, harmonizing presence is not "too quiet" or "lacking authority." You are the emotional infrastructure of the team. People feel safe admitting mistakes, asking questions, and being vulnerable when you are in the room. This is not a soft skill—it is a leadership competency. Your role is to say "Let\'s pause and make sure everyone is on the same page."',
        impression: '"She creates the conditions for others to do their best work. The team is healthier with her."'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        secretSauce: 'Your depth is not slowness; it is discernment. You need to know that your need to process, reflect, and understand the subtext before acting is not a liability. You are the organization\'s wisdom keeper. You perceive the underlying currents—political, emotional, ethical—that others miss. Your role is to ask "What are we not talking about?" and to hold space for the answer.',
        impression: '"He understands the unspoken dynamics of every situation. His counsel is invaluable."'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        secretSauce: 'Your sentimentality is not impracticality; it is cultural continuity. You need to know that your attention to tradition, legacy, and interpersonal history is not "resistance to change." You are the keeper of organizational memory and the weaver of cultural cohesion. Your role is to say "Before we move forward, let\'s honor what we\'ve built and learn from it." This prevents the hubris of forgetting.',
        impression: '"She reminds us who we are and why our work matters. She gives the organization its soul."'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        secretSauce: 'Your nurturance is not servility; it is operational glue. You need to know that your willingness to support, organize, and care for the functional well-being of the team is not "administrative" or "subordinate." You are the logistics of morale. Your role is to ask "What does everyone need to do their best work?" and to quietly, competently make it happen.',
        impression: '"He makes everything run smoothly without drama. The team would disintegrate without his quiet competence."'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'The Gift of Substance & Power',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        secretSauce: 'Your authority is not intimidation; it is protective strength. You need to know that your commanding presence, decisive manner, and high standards are not "too much." You are the organization\'s bulwark—the person who can absorb pressure, make the difficult call, and shield your team from chaos. Your role is to say "I will handle it" and mean it. People do not fear you; they feel safer because you are there.',
        impression: '"When she\'s in charge, I know everything is going to be okay. She has the strength to protect us and the integrity to lead us."'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        secretSauce: 'Your pragmatism is not unimaginative; it is executable reality. You need to know that your focus on what is tangible, feasible, and physically possible is not "lack of vision." You are the translation layer between strategy and execution. Your role is to ask "How do we actually build this, source this, or implement this?" You turn abstractions into operations.',
        impression: '"He is the person who makes ideas real. Without him, great strategies stay on PowerPoint slides."'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        secretSauce: 'Your need for comfort is not preciousness; it is environmental intelligence. You need to know that your sensitivity to physical and sensory workplace conditions is not "fussiness." You are the advocate for human-centered design. Your role is to ask "Is this workspace supporting or depleting our people?" and to advocate for lighting, acoustics, and ergonomics that improve everyone\'s output.',
        impression: '"She creates spaces where people can focus and feel at ease. Her presence makes the office more humane."'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        secretSauce: 'Your abundance is not ostentation; it is standard-raising. You need to know that your attention to beauty, quality, and presentation is not "superficial." You are the organization\'s curator of excellence. Your role is to ask "Is this the best we can do?" and to quietly refuse to accept mediocrity in aesthetics, materials, and execution. You elevate not through criticism, but through visible, aspirational example.',
        impression: '"He has impeccable taste and uncompromising standards. Working with him makes everyone\'s work better."'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'The Gift of Clarity',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        secretSauce: 'Your detachment is not coldness; it is objectivity. You need to know that your ability to analyze without emotional entanglement is not "aloof." You are the organization\'s diagnostic instrument. Your role is to ask "What does the data actually say?" and to follow the evidence without regard for politics or popularity. This is rare and invaluable.',
        impression: '"She cuts through the noise and shows us what\'s actually happening. We make better decisions when she\'s involved."'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        secretSauce: 'Your scatteredness is not unreliability; it is creative cross-pollination. You need to know that your wide-ranging curiosity and tendency to connect disparate ideas is not "ADD." You are the innovation ecosystem. Your role is to ask "Have we considered how they solved this in [completely different field]?" and to bring unexpected, valuable solutions from the periphery.',
        impression: '"He sees connections the rest of us miss. His \'crazy ideas\' keep saving us from groupthink."'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        secretSauce: 'Your warmth is not manipulation; it is consensus-building. You need to know that your desire to be liked and to create harmony is not "people-pleasing." You are the social architect who can rally disparate stakeholders around a shared vision. Your role is to ask "What language will help everyone see their interests reflected in this plan?" This is diplomacy, not deceit.',
        impression: '"She can get any group to agree on a path forward. She is our secret weapon for alignment."'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        secretSauce: 'Your subtlety is not invisibility; it is precision. You need to know that your quiet, intuitive, and non-linear communication style is not "not speaking up." You are the early warning system for subtle shifts—in team morale, in client sentiment, in unspoken tension. Your role is to say "I have a sense that..." and to trust that your perceptions are data, even before they are provable.',
        impression: '"She notices what no one else does. Her instincts are uncannily accurate."'
      }
    ]
  }
];


interface ElementalSecretSauceProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const ElementalSecretSauce: React.FC<ElementalSecretSauceProps> = ({
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
          <p className="text-lg text-gray-600 leading-relaxed italic">
            A positive work impression is not about being more of anything. It is about understanding the specific, inherent gift you bring to a professional ecosystem and learning to deploy it consciously, without dilution or apology.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {secretSauceData.map((element) => (
          <div
            key={element.element}
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
                    {element.tagline}
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

            {/* Element Description Banner */}
            {expandedElements.includes(element.elementId) && (
              <div
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  borderColor: `${element.gradientFrom}40`
                }}
              >
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.tagline} — Discover the secret sauce and workplace impression for each {element.element} subtype.
                  </p>
                </div>
              </div>
            )}

            {/* Subtypes Content */}
            {expandedElements.includes(element.elementId) && (
              <div className="bg-gradient-to-br from-gray-50 to-white">
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
                              <Sparkles className="w-3 h-3" />
                              Your Secret Sauce
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
                        <h4 className="text-xl font-bold mb-4 text-gray-900">
                          {subtype.name}
                        </h4>

                        {/* Secret Sauce */}
                        <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Secret Sauce
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.secretSauce}
                          </p>
                        </div>

                        {/* Impression */}
                        <div className="p-4 bg-violet-50/80 rounded-lg border border-violet-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Quote className="w-4 h-4 text-violet-600" />
                            <span className="font-semibold text-sm text-violet-700">
                              Impression
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700 italic">
                            {subtype.impression}
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
        ))}
      </div>

      {/* The Unified Truth */}
      <div className="mt-12 p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-violet-50 rounded-2xl border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Unified Truth</h4>
            <p className="text-gray-600 leading-relaxed">
              Your secret sauce is not a skill you need to acquire. It is an inherent frequency you need to stop 
              suppressing. The workplace does not need you to be quieter, louder, softer, or sharper. It needs you 
              to be unapologetically, intelligently, professionally yourself. That is the impression that lasts.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ElementalSecretSauce;
