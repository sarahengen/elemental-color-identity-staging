import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, Users, Handshake, AlertTriangle, Shield, Lightbulb } from 'lucide-react';
import { teamDynamicsData, frictionPairs, teamBuildingStrategies } from '@/data/teamDynamicsData';
import TeamCompositionAnalyzer from './TeamCompositionAnalyzer';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface ElementalTeamDynamicsProps {
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

const ElementalTeamDynamics: React.FC<ElementalTeamDynamicsProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [activeTab, setActiveTab] = useState<'roles' | 'friction' | 'strategies'>('roles');

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;
  const isUserElement = (elementId: string) => userElement === elementId;

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            A team is not a collection of individuals. It is an elemental ecosystem—a living system where each person's 
            energy either amplifies or diminishes the whole. Understanding your team's elemental composition is not a 
            parlor game. It is the difference between a group that merely coexists and a team that genuinely creates.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 'roles' as const, label: 'Team Roles & Collaboration', icon: <Users className="w-4 h-4" /> },
          { id: 'friction' as const, label: 'Friction Points', icon: <AlertTriangle className="w-4 h-4" /> },
          { id: 'strategies' as const, label: 'Team Building', icon: <Shield className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Team Roles & Collaboration */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {teamDynamicsData.map((element) => (
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
                  <div className="p-6 space-y-8">
                    {element.subtypes.map((subtype) => {
                      const isHighlighted = isUserSubtype(subtype.subtypeId);

                      return (
                        <div
                          key={subtype.subtype}
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
                                Your Team Role
                              </span>
                            </div>
                          )}

                          {/* Subtype Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
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

                          {/* Team Role Title */}
                          <h4 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                            <Users className="w-5 h-5" style={{ color: element.gradientFrom }} />
                            {subtype.teamRole}
                          </h4>

                          {/* Team Role Description */}
                          <div className="p-4 md:p-5 bg-blue-50/80 rounded-lg border border-blue-100 mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Users className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-sm text-blue-700">Your Natural Team Role</span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.teamRoleDescription}</p>
                          </div>

                          {/* Collaboration Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div className="p-4 bg-red-50/60 rounded-lg border border-red-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Flame className="w-3.5 h-3.5 text-red-500" />
                                <span className="font-semibold text-xs text-red-700">With Fire Types</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.collaborationWithFire}</p>
                            </div>
                            <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                                <span className="font-semibold text-xs text-blue-700">With Water Types</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.collaborationWithWater}</p>
                            </div>
                            <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Mountain className="w-3.5 h-3.5 text-amber-700" />
                                <span className="font-semibold text-xs text-amber-800">With Earth Types</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.collaborationWithEarth}</p>
                            </div>
                            <div className="p-4 bg-cyan-50/60 rounded-lg border border-cyan-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Wind className="w-3.5 h-3.5 text-cyan-600" />
                                <span className="font-semibold text-xs text-cyan-700">With Air Types</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.collaborationWithAir}</p>
                            </div>
                          </div>

                          {/* Strength & Challenge */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100">
                              <div className="flex items-center gap-2 mb-2">
                                <Handshake className="w-4 h-4 text-emerald-600" />
                                <span className="font-semibold text-xs text-emerald-700">Strength in Teams</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.strengthInTeams}</p>
                            </div>
                            <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <span className="font-semibold text-xs text-amber-700">Challenge in Teams</span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{subtype.challengeInTeams}</p>
                            </div>
                          </div>

                          {/* Decorative accent */}
                          <div
                            className="absolute top-0 right-0 w-20 h-20 opacity-15 rounded-tr-xl rounded-bl-full"
                            style={{
                              background: `linear-gradient(to bottom left, ${element.gradientFrom}40, transparent)`
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
      )}

      {/* TAB: Friction Points */}
      {activeTab === 'friction' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              Friction between elemental types is not a problem to be eliminated—it is a resource to be managed. 
              The most productive teams are not the most harmonious; they are the ones that channel their differences 
              into better outcomes.
            </p>
          </div>

          <div className="space-y-4">
            {frictionPairs.map((pair, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5 md:p-6">
                  {/* Pair Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-full text-xs font-semibold text-red-700">
                      {pair.pairNames[0]}
                    </span>
                    <span className="text-gray-400 text-xs font-bold">vs</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-700">
                      {pair.pairNames[1]}
                    </span>
                  </div>

                  {/* Friction Point */}
                  <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-sm text-amber-700">The Friction</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{pair.frictionPoint}</p>
                  </div>

                  {/* Resolution */}
                  <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-sm text-emerald-700">The Resolution</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{pair.resolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Team Building Strategies */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              Building a high-performing elemental team is not about finding four identical people. 
              It is about assembling a diverse elemental ecosystem where each person's energy 
              amplifies the others.
            </p>
          </div>

          <div className="space-y-4">
            {teamBuildingStrategies.map((strategy, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-gray-900 mb-2">{strategy.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{strategy.description}</p>
                    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-semibold text-xs text-indigo-700">Practical Advice</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{strategy.advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Composition Analyzer */}
      <TeamCompositionAnalyzer />

      {/* The Team Truth */}
      <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 rounded-2xl border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Team Truth</h4>
            <p className="text-gray-600 leading-relaxed">
              The highest-performing teams are not the ones where everyone gets along effortlessly. They are the ones 
              where every member understands their own elemental nature, respects the elemental nature of others, and 
              commits to channeling their differences into collective excellence. Your team does not need less friction—it 
              needs more consciousness. When each person brings their full elemental gift to the table, and the team has 
              the language and the structure to receive it, something extraordinary happens: the team becomes more than 
              the sum of its elements. It becomes an ecosystem. And ecosystems, unlike machines, do not just function. 
              They flourish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalTeamDynamics;
