import React, { useState, useMemo } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, Swords, Shield, AlertTriangle, Heart, Eye, ArrowRight, ArrowDown, Copy, Check, Zap, Users, Scale, MessageSquare, ClipboardList, Map } from 'lucide-react';
import { conflictData, mediationGuides, ConflictElement, MediationGuide } from '@/data/conflictData';
import ConflictStyleQuiz from '@/components/ConflictStyleQuiz';
import TeamConflictMap from '@/components/TeamConflictMap';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';


interface ElementalConflictStylesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const elementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-6 h-6" />,
  water: <Droplets className="w-6 h-6" />,
  earth: <Mountain className="w-6 h-6" />,
  air: <Wind className="w-6 h-6" />
};

const smallElementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  earth: <Mountain className="w-4 h-4" />,
  air: <Wind className="w-4 h-4" />
};

const responseColors: Record<string, { bg: string; text: string; border: string; label: string; icon: React.ReactNode }> = {
  fight: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', label: 'Fight', icon: <Swords className="w-4 h-4" /> },
  flight: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Flight', icon: <Wind className="w-4 h-4" /> },
  freeze: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', label: 'Freeze', icon: <Shield className="w-4 h-4" /> },
  fawn: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Fawn', icon: <Heart className="w-4 h-4" /> }
};

const elementGradients: Record<string, { from: string; to: string }> = {
  fire: { from: '#C41E3A', to: '#FF6B35' },
  water: { from: '#6B8BA4', to: '#B4A7D6' },
  earth: { from: '#8B4513', to: '#228B22' },
  air: { from: '#00CED1', to: '#FFE135' }
};

const elementNames: Record<string, string> = {
  fire: 'Fire', water: 'Water', earth: 'Earth', air: 'Air'
};

// Build a flat list of all subtypes for the simulator dropdowns
const allSubtypes = conflictData.flatMap(el =>
  el.subtypes.map(s => ({ ...s, elementId: el.elementId, element: el.element, gradientFrom: el.gradientFrom, gradientTo: el.gradientTo }))
);

const ElementalConflictStyles: React.FC<ElementalConflictStylesProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [activeTab, setActiveTab] = useState<'profiles' | 'scripts' | 'simulator' | 'quiz' | 'team-map'>('profiles');


  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  // Simulator state
  const [simPartyA, setSimPartyA] = useState<string>(userSubtype || 'fire-fire');
  const [simPartyB, setSimPartyB] = useState<string>(
    userSubtype === 'water-water' ? 'fire-fire' : 'water-water'
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;
  const isUserElement = (elementId: string) => userElement === elementId;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedScript(id);
      setTimeout(() => setCopiedScript(null), 2000);
    });
  };

  // Find the best matching mediation guide for the simulator
  const simulatorGuide = useMemo((): { guide: MediationGuide; swapped: boolean } | null => {
    // Only use exact subtype ID matches — no element-level fallback
    const directMatch = mediationGuides.find(
      g => g.partyAId === simPartyA && g.partyBId === simPartyB
    );
    if (directMatch) return { guide: directMatch, swapped: false };

    // Check if the guide exists with parties reversed
    const reversedMatch = mediationGuides.find(
      g => g.partyAId === simPartyB && g.partyBId === simPartyA
    );
    if (reversedMatch) return { guide: reversedMatch, swapped: true };

    return null;
  }, [simPartyA, simPartyB]);


  const subtypeA = allSubtypes.find(s => s.subtypeId === simPartyA);
  const subtypeB = allSubtypes.find(s => s.subtypeId === simPartyB);

  // Generate a dynamic guide when no pre-built one exists
  const generateDynamicGuide = () => {
    if (!subtypeA || !subtypeB) return null;
    const respA = responseColors[subtypeA.defaultResponse];
    const respB = responseColors[subtypeB.defaultResponse];

    return {
      frictionSource: `${subtypeA.subtype} (${respA.label} response) meets ${subtypeB.subtype} (${respB.label} response). ${subtypeA.subtype}'s ${subtypeA.conflictArchetype.toLowerCase()} style can clash with ${subtypeB.subtype}'s ${subtypeB.conflictArchetype.toLowerCase()} approach, creating friction when their default responses collide.`,
      steps: [
        `Acknowledge both conflict styles: ${subtypeA.subtype} tends toward ${subtypeA.defaultResponse}, while ${subtypeB.subtype} tends toward ${subtypeB.defaultResponse}.`,
        `Create a safe environment that addresses ${subtypeB.subtype}'s triggers while respecting ${subtypeA.subtype}'s need for ${subtypeA.defaultResponse === 'fight' ? 'direct engagement' : subtypeA.defaultResponse === 'flight' ? 'space to process' : subtypeA.defaultResponse === 'freeze' ? 'time to assess' : 'relational safety'}.`,
        `Ask ${subtypeA.subtype} to express their core concern in 2-3 sentences.`,
        `Give ${subtypeB.subtype} time to respond in their preferred style—${subtypeB.defaultResponse === 'freeze' ? 'written or with a pause' : subtypeB.defaultResponse === 'flight' ? 'through structured dialogue' : subtypeB.defaultResponse === 'fawn' ? 'with encouragement to be honest' : 'directly'}.`,
        `Identify the shared value beneath the disagreement. Both types have legitimate needs.`,
        `Co-create one concrete action item for each party that addresses the other's core concern.`,
        `Schedule a follow-up to ensure the resolution is holding.`,
        `Close by having each party name one strength they see in the other's conflict style.`
      ],
      commonGround: `Both ${subtypeA.subtype} and ${subtypeB.subtype} ultimately want resolution—they just approach it through different channels. Finding the shared value beneath the surface disagreement is the key to bridging their styles.`,
      key: `${subtypeA.subtype} must understand that ${subtypeB.subtype}'s ${subtypeB.defaultResponse} response is not ${subtypeB.defaultResponse === 'fight' ? 'aggression' : subtypeB.defaultResponse === 'flight' ? 'avoidance' : subtypeB.defaultResponse === 'freeze' ? 'indifference' : 'weakness'}—it is their natural way of processing conflict. ${subtypeB.subtype} must understand that ${subtypeA.subtype}'s ${subtypeA.defaultResponse} response is not ${subtypeA.defaultResponse === 'fight' ? 'an attack' : subtypeA.defaultResponse === 'flight' ? 'dismissal' : subtypeA.defaultResponse === 'freeze' ? 'stonewalling' : 'manipulation'}—it is their path to resolution.`
    };
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            Conflict is not the enemy of connection—it is the crucible in which connection is tested and strengthened. 
            Every elemental type has a default conflict response—fight, flight, freeze, or fawn—that is neither good nor bad, 
            but simply the way their nervous system has learned to protect what matters most. Understanding your pattern 
            is the first step toward choosing your response rather than being chosen by it.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 'profiles' as const, label: 'Conflict Profiles', icon: <Shield className="w-4 h-4" /> },
          { id: 'quiz' as const, label: 'Conflict Style Quiz', icon: <ClipboardList className="w-4 h-4" /> },
          { id: 'team-map' as const, label: 'Team Conflict Map', icon: <Map className="w-4 h-4" /> },
          { id: 'scripts' as const, label: 'Resolution Scripts', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'simulator' as const, label: 'Conflict Simulator', icon: <Scale className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>



      {/* TAB: Conflict Style Quiz */}
      {activeTab === 'quiz' && (
        <ConflictStyleQuiz userElement={userElement} userSubtype={userSubtype} />
      )}

      {/* TAB: Conflict Profiles */}

      {activeTab === 'profiles' && (
        <div className="space-y-6">
          {conflictData.map((element) => (
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
                    style={{ background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})` }}
                  >
                    {elementIcons[element.elementId]}
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
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Subtypes Content */}
              {expandedElements.includes(element.elementId) && (
                <div className="bg-gradient-to-br from-gray-50 to-white">
                  {/* Element Core Nature */}
                  <div className="px-6 pt-6 pb-2">
                    <div
                      className="p-5 rounded-xl border"
                      style={{
                        background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                        borderColor: `${element.gradientFrom}20`
                      }}
                    >
                      <p className="text-sm text-gray-700 leading-relaxed italic">{element.coreConflictNature}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {element.subtypes.map((subtype) => {
                      const isHighlighted = isUserSubtype(subtype.subtypeId);
                      const resp = responseColors[subtype.defaultResponse];

                      return (
                        <div
                          key={subtype.subtypeId}
                          className={`relative rounded-xl p-6 md:p-8 transition-all duration-300 ${
                            isHighlighted
                              ? GUIDE_USER_SUBTYPE_CARD_CLASS
                              : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          style={{
                            background: !isHighlighted
                              ? `linear-gradient(135deg, ${element.gradientFrom}06, ${element.gradientTo}06)`
                              : undefined
                          }}
                        >
                          {/* User Badge */}
                          {isHighlighted && (
                            <div className="absolute -top-3 right-4">
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Your Conflict Style
                              </span>
                            </div>
                          )}

                          {/* Subtype Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span
                              className="text-sm font-semibold px-2.5 py-1 rounded-md"
                              style={{
                                background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                                color: element.gradientFrom
                              }}
                            >
                              {subtype.subtype}
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-sm text-gray-500 italic">{subtype.name}</span>
                          </div>

                          {/* Archetype & Response */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                              {subtype.conflictArchetype}
                            </h4>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${resp.bg} ${resp.text} border ${resp.border}`}>
                              {resp.icon}
                              Default: {resp.label}
                            </span>
                          </div>

                          {/* Default Response Detail */}
                          <div className={`p-4 md:p-5 rounded-lg border mb-4 ${resp.bg} ${resp.border}`}>
                            <div className="flex items-center gap-2 mb-3">
                              {resp.icon}
                              <span className={`font-semibold text-sm ${resp.text}`}>Default Conflict Response: {resp.label}</span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.defaultResponseDetail}</p>
                          </div>

                          {/* Triggers */}
                          <div className="p-4 md:p-5 bg-orange-50/80 rounded-lg border border-orange-100 mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Zap className="w-4 h-4 text-orange-600" />
                              <span className="font-semibold text-sm text-orange-700">What Triggers You</span>
                            </div>
                            <ul className="space-y-1.5">
                              {subtype.triggers.map((trigger, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                  <AlertTriangle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                                  {trigger}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Escalation & De-escalation */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 md:p-5 bg-red-50/80 rounded-lg border border-red-100">
                              <div className="flex items-center gap-2 mb-3">
                                <ArrowRight className="w-4 h-4 text-red-600 rotate-45" />
                                <span className="font-semibold text-sm text-red-700">Escalation Pattern</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.escalationPattern}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-emerald-50/80 rounded-lg border border-emerald-100">
                              <div className="flex items-center gap-2 mb-3">
                                <ArrowRight className="w-4 h-4 text-emerald-600 -rotate-45" />
                                <span className="font-semibold text-sm text-emerald-700">De-escalation Pattern</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.deEscalationPattern}</p>
                            </div>
                          </div>

                          {/* Blind Spot & Strength */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 md:p-5 bg-violet-50/80 rounded-lg border border-violet-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Eye className="w-4 h-4 text-violet-600" />
                                <span className="font-semibold text-sm text-violet-700">Blind Spot in Conflict</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.blindSpotInConflict}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-sky-50/80 rounded-lg border border-sky-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Shield className="w-4 h-4 text-sky-600" />
                                <span className="font-semibold text-sm text-sky-700">Conflict Strength</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.conflictStrength}</p>
                            </div>
                          </div>

                          {/* What They Need to Hear */}
                          <div
                            className="p-4 md:p-5 rounded-lg border mb-4"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                              borderColor: `${element.gradientFrom}25`
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <MessageSquare className="w-4 h-4" style={{ color: element.gradientFrom }} />
                              <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                                What This Type Needs to Hear in Conflict
                              </span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700 italic font-medium bg-white/60 p-3 rounded border" style={{ borderColor: `${element.gradientFrom}15` }}>
                              {subtype.whatTheyNeedToHear}
                            </p>
                          </div>

                          {/* Recovery Style */}
                          <div className="p-4 md:p-5 bg-indigo-50/80 rounded-lg border border-indigo-100">
                            <div className="flex items-center gap-2 mb-3">
                              <Heart className="w-4 h-4 text-indigo-600" />
                              <span className="font-semibold text-sm text-indigo-700">Recovery Style</span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.recoveryStyle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: Resolution Scripts */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              These mediation guides provide step-by-step scripts for resolving conflicts between specific elemental 
              pairings. Each guide includes what to say to each party, common ground to build on, warning signs to 
              watch for, and the key insight that unlocks resolution.
            </p>
          </div>

          <div className="space-y-6">
            {mediationGuides.map((guide, idx) => {
              const gradA = elementGradients[guide.partyAElement];
              const gradB = elementGradients[guide.partyBElement];

              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div
                    className="p-6 text-white"
                    style={{ background: `linear-gradient(135deg, ${gradA.from}, ${gradB.to})` }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full">
                        {smallElementIcons[guide.partyAElement]}
                        <span className="text-sm font-semibold">{guide.partyA}</span>
                      </div>
                      <Swords className="w-5 h-5 text-white/60" />
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full">
                        {smallElementIcons[guide.partyBElement]}
                        <span className="text-sm font-semibold">{guide.partyB}</span>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{guide.frictionSource}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Step-by-Step Mediation */}
                    <div className="p-5 bg-indigo-50/80 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 mb-4">
                        <Scale className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-indigo-700">Step-by-Step Mediation Guide</span>
                      </div>
                      <ol className="space-y-2">
                        {guide.stepByStepMediation.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Scripts for Each Party */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-50/80 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {smallElementIcons[guide.partyAElement]}
                            <span className="font-semibold text-sm text-blue-700">Script for {guide.partyA}</span>
                          </div>
                          <button
                            onClick={() => copyText(guide.scriptForA, `a-${idx}`)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          >
                            {copiedScript === `a-${idx}` ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-blue-100">
                          {guide.scriptForA}
                        </p>
                      </div>
                      <div className="p-5 bg-violet-50/80 rounded-xl border border-violet-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {smallElementIcons[guide.partyBElement]}
                            <span className="font-semibold text-sm text-violet-700">Script for {guide.partyB}</span>
                          </div>
                          <button
                            onClick={() => copyText(guide.scriptForB, `b-${idx}`)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-violet-600 hover:bg-violet-100 rounded transition-colors"
                          >
                            {copiedScript === `b-${idx}` ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-violet-100">
                          {guide.scriptForB}
                        </p>
                      </div>
                    </div>

                    {/* Common Ground, Warning, Key */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-xs text-emerald-700">Common Ground</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{guide.commonGround}</p>
                      </div>
                      <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span className="font-semibold text-xs text-amber-700">Warning Sign</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{guide.warningSign}</p>
                      </div>
                      <div className="p-4 bg-rose-50/80 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-rose-600" />
                          <span className="font-semibold text-xs text-rose-700">Resolution Key</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{guide.resolutionKey}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Conflict Resolution Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              Select two subtypes in conflict to receive a customized mediation guide with step-by-step 
              instructions, scripts for each party, and the key insight that unlocks resolution.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            {/* Subtype Selectors */}
            <div className="flex flex-col md:flex-row items-stretch gap-6 justify-center mb-8">
              {/* Party A */}
              <div className="flex-1 max-w-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">Party A</p>
                <select
                  value={simPartyA}
                  onChange={(e) => {
                    setSimPartyA(e.target.value);
                    if (e.target.value === simPartyB) {
                      const other = allSubtypes.find(s => s.subtypeId !== e.target.value);
                      if (other) setSimPartyB(other.subtypeId);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 bg-white focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all"
                >
                  {conflictData.map(el => (
                    <optgroup key={el.elementId} label={el.element}>
                      {el.subtypes.map(s => (
                        <option key={s.subtypeId} value={s.subtypeId}>
                          {s.subtype} — {s.conflictArchetype}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {subtypeA && (
                  <div className="mt-3 p-3 rounded-lg" style={{ background: `linear-gradient(135deg, ${subtypeA.gradientFrom}10, ${subtypeA.gradientTo}10)` }}>
                    <div className="flex items-center gap-2 mb-1">
                      {smallElementIcons[subtypeA.elementId]}
                      <span className="text-sm font-bold text-gray-800">{subtypeA.name}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${responseColors[subtypeA.defaultResponse].bg} ${responseColors[subtypeA.defaultResponse].text}`}>
                      {responseColors[subtypeA.defaultResponse].icon}
                      {responseColors[subtypeA.defaultResponse].label}
                    </span>
                  </div>
                )}
              </div>

              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Swords className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Party B */}
              <div className="flex-1 max-w-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">Party B</p>
                <select
                  value={simPartyB}
                  onChange={(e) => setSimPartyB(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 bg-white focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all"
                >
                  {conflictData.map(el => (
                    <optgroup key={el.elementId} label={el.element}>
                      {el.subtypes.filter(s => s.subtypeId !== simPartyA).map(s => (
                        <option key={s.subtypeId} value={s.subtypeId}>
                          {s.subtype} — {s.conflictArchetype}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {subtypeB && (
                  <div className="mt-3 p-3 rounded-lg" style={{ background: `linear-gradient(135deg, ${subtypeB.gradientFrom}10, ${subtypeB.gradientTo}10)` }}>
                    <div className="flex items-center gap-2 mb-1">
                      {smallElementIcons[subtypeB.elementId]}
                      <span className="text-sm font-bold text-gray-800">{subtypeB.name}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${responseColors[subtypeB.defaultResponse].bg} ${responseColors[subtypeB.defaultResponse].text}`}>
                      {responseColors[subtypeB.defaultResponse].icon}
                      {responseColors[subtypeB.defaultResponse].label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            {simulatorGuide ? (
              (() => {
                const g = simulatorGuide.guide;
                const isSwapped = simulatorGuide.swapped;
                // Map guide parties to match user's Party A / Party B selection
                const displayPartyAName = isSwapped ? g.partyB : g.partyA;
                const displayPartyBName = isSwapped ? g.partyA : g.partyB;
                const displayPartyAElement = isSwapped ? g.partyBElement : g.partyAElement;
                const displayPartyBElement = isSwapped ? g.partyAElement : g.partyBElement;
                const displayScriptForA = isSwapped ? g.scriptForB : g.scriptForA;
                const displayScriptForB = isSwapped ? g.scriptForA : g.scriptForB;

                return (
              <div className="space-y-4">
                {/* Header */}
                <div
                  className="p-5 rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${elementGradients[displayPartyAElement].from}, ${elementGradients[displayPartyBElement].to})` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {smallElementIcons[displayPartyAElement]}
                    </div>
                    <Swords className="w-5 h-5 text-white/60" />
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {smallElementIcons[displayPartyBElement]}
                    </div>
                  </div>
                  <h4 className="text-lg font-serif mb-1">{displayPartyAName} vs. {displayPartyBName}</h4>
                  <p className="text-white/90 text-sm">{g.frictionSource}</p>
                </div>

                {/* Steps */}
                <div className="p-5 bg-indigo-50/80 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Scale className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-700">Step-by-Step Mediation</span>
                  </div>
                  <ol className="space-y-2">
                    {g.stepByStepMediation.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Scripts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-blue-50/80 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {smallElementIcons[displayPartyAElement]}
                        <span className="font-semibold text-sm text-blue-700">Script for {displayPartyAName}</span>
                      </div>
                      <button onClick={() => copyText(displayScriptForA, 'sim-a')} className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded transition-colors">
                        {copiedScript === 'sim-a' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-blue-100">{displayScriptForA}</p>
                  </div>
                  <div className="p-5 bg-violet-50/80 rounded-xl border border-violet-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {smallElementIcons[displayPartyBElement]}
                        <span className="font-semibold text-sm text-violet-700">Script for {displayPartyBName}</span>
                      </div>
                      <button onClick={() => copyText(displayScriptForB, 'sim-b')} className="flex items-center gap-1 px-2 py-1 text-xs text-violet-600 hover:bg-violet-100 rounded transition-colors">
                        {copiedScript === 'sim-b' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-violet-100">{displayScriptForB}</p>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-xs text-emerald-700">Common Ground</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{g.commonGround}</p>
                  </div>
                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-xs text-amber-700">Warning Sign</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{g.warningSign}</p>
                  </div>
                  <div className="p-4 bg-rose-50/80 rounded-xl border border-rose-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      <span className="font-semibold text-xs text-rose-700">Resolution Key</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{g.resolutionKey}</p>
                  </div>
                </div>
              </div>
                );
              })()
            ) : (
              // Dynamic guide when no pre-built one exists
              (() => {
                const dynamic = generateDynamicGuide();
                if (!dynamic || !subtypeA || !subtypeB) return (
                  <div className="text-center py-8 text-gray-500">
                    <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select two different subtypes to generate a mediation guide.</p>
                  </div>
                );

                return (
                  <div className="space-y-4">
                    <div
                      className="p-5 rounded-xl text-white"
                      style={{ background: `linear-gradient(135deg, ${subtypeA.gradientFrom}, ${subtypeB.gradientTo})` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {smallElementIcons[subtypeA.elementId]}
                        </div>
                        <Swords className="w-5 h-5 text-white/60" />
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {smallElementIcons[subtypeB.elementId]}
                        </div>
                      </div>
                      <h4 className="text-lg font-serif mb-1">{subtypeA.subtype} vs. {subtypeB.subtype}</h4>
                      <p className="text-white/90 text-sm">{dynamic.frictionSource}</p>
                    </div>

                    <div className="p-5 bg-indigo-50/80 rounded-xl border border-indigo-100">
                      <div className="flex items-center gap-2 mb-4">
                        <Scale className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-indigo-700">Generated Mediation Guide</span>
                      </div>
                      <ol className="space-y-2">
                        {dynamic.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* What each needs to hear */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-50/80 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          {smallElementIcons[subtypeA.elementId]}
                          <span className="font-semibold text-sm text-blue-700">What {subtypeA.subtype} Needs to Hear</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-blue-100">{subtypeA.whatTheyNeedToHear}</p>
                      </div>
                      <div className="p-5 bg-violet-50/80 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-2 mb-3">
                          {smallElementIcons[subtypeB.elementId]}
                          <span className="font-semibold text-sm text-violet-700">What {subtypeB.subtype} Needs to Hear</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic bg-white/60 p-3 rounded border border-violet-100">{subtypeB.whatTheyNeedToHear}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-xs text-emerald-700">Common Ground</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{dynamic.commonGround}</p>
                      </div>
                      <div className="p-4 bg-rose-50/80 rounded-xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-rose-600" />
                          <span className="font-semibold text-xs text-rose-700">Resolution Key</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{dynamic.key}</p>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}

      {/* TAB: Team Conflict Map */}

      {activeTab === 'team-map' && (
        <TeamConflictMap
          userElement={userElement}
          userSubtype={userSubtype}
          onNavigateToGuide={(partyAId, partyBId) => {
            setSimPartyA(partyAId);
            setSimPartyB(partyBId);
            setActiveTab('simulator');
          }}
        />
      )}


      {/* The Conflict Truth */}
      <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 rounded-2xl border border-rose-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Swords className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Conflict Truth</h4>
            <p className="text-gray-600 leading-relaxed">
              The goal of understanding your conflict style is not to eliminate conflict—it is to transform it from 
              a destructive force into a generative one. Every fight response contains courage. Every flight response 
              contains wisdom. Every freeze response contains depth. Every fawn response contains compassion. The 
              fully realized person does not abandon their default response—they expand their repertoire so they can 
              choose the response that serves the situation, rather than the one their nervous system defaults to. 
              When Fire learns to pause, Water learns to speak, Earth learns to flex, and Air learns to feel, 
              conflict becomes the forge in which stronger relationships are made.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalConflictStyles;
