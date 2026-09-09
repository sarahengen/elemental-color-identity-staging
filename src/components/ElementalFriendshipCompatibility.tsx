import React, { useState, useMemo } from 'react';
import { 
  Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Sparkles, 
  Heart, TrendingUp, Zap, ArrowRight, Users, HandHeart, ShieldAlert,
  Lightbulb, Star, ArrowLeftRight, Share2
} from 'lucide-react';
import FriendshipCompatibilityShareGuide from '@/components/FriendshipCompatibilityShareGuide';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

import { elementalTypes } from '@/data/elementalTypes';
import { 
  friendshipProfiles, 
  generateCompatibilityReport,
  type PairwiseCompatibility 
} from '@/data/friendshipCompatibilityData';

interface ElementalFriendshipCompatibilityProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface ElementConfig {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypeIds: string[];
}

const elementConfigs: ElementConfig[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Friendships of Intensity & Mutual Ignition',
    subtypeIds: ['fire-fire', 'fire-water', 'fire-earth', 'fire-air']
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Friendships of Depth & Emotional Sanctuary',
    subtypeIds: ['water-air', 'water-water', 'water-fire', 'water-earth']
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Friendships of Loyalty & Enduring Alliance',
    subtypeIds: ['earth-fire', 'earth-earth', 'earth-water', 'earth-air']
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Friendships of Ideas & Liberating Connection',
    subtypeIds: ['air-air', 'air-fire', 'air-earth', 'air-water']
  }
];

// Get all subtypes for the calculator dropdown
const allSubtypes = elementalTypes.flatMap(et => 
  et.subtypes.map(st => ({
    id: st.id,
    name: st.name,
    shortName: st.shortName,
    elementId: et.id,
    elementName: et.name
  }))
);

const getSubtypeName = (subtypeId: string): string => {
  const found = allSubtypes.find(s => s.id === subtypeId);
  return found?.name || subtypeId;
};

const getSubtypeShortName = (subtypeId: string): string => {
  const found = allSubtypes.find(s => s.id === subtypeId);
  return found?.shortName || subtypeId;
};

const getElementColor = (elementId: string): string => {
  const config = elementConfigs.find(c => c.elementId === elementId);
  return config?.gradientFrom || '#666';
};

const ElementalFriendshipCompatibility: React.FC<ElementalFriendshipCompatibilityProps> = ({ 
  userElement, 
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [activeTab, setActiveTab] = useState<'profiles' | 'calculator'>('profiles');
  
  // Calculator state
  const [calcSubtype1, setCalcSubtype1] = useState<string>(userSubtype || '');
  const [calcSubtype2, setCalcSubtype2] = useState<string>('');
  const [showReport, setShowReport] = useState(false);
  const [showShareGuide, setShowShareGuide] = useState(false);


  const compatibilityReport = useMemo<PairwiseCompatibility | null>(() => {
    if (calcSubtype1 && calcSubtype2) {
      return generateCompatibilityReport(calcSubtype1, calcSubtype2);
    }
    return null;
  }, [calcSubtype1, calcSubtype2]);

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;
  const isUserElement = (elementId: string) => userElement === elementId;

  const handleCalculate = () => {
    if (calcSubtype1 && calcSubtype2) {
      setShowReport(true);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    if (score >= 4) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 9) return 'Extraordinary';
    if (score >= 7) return 'Strong';
    if (score >= 5) return 'Moderate';
    if (score >= 3) return 'Challenging';
    return 'Difficult';
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "Friendship between elemental types is not about finding someone identical—it is about 
            finding someone whose frequency creates harmony with yours, whose presence makes you 
            more fully yourself, and whose differences teach you what you cannot learn alone."
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab('profiles')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'profiles'
              ? 'bg-gray-900 text-white shadow-lg'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Users className="w-4 h-4" />
          Friendship Profiles
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-gray-900 text-white shadow-lg'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          Compatibility Calculator
        </button>
      </div>

      {/* PROFILES TAB */}
      {activeTab === 'profiles' && (
        <div className="space-y-6">
          {elementConfigs.map((element) => (
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

              {/* Expanded Content */}
              {expandedElements.includes(element.elementId) && (
                <>
                  {/* Element Banner */}
                  <div
                    className="px-6 py-4 border-t border-b"
                    style={{
                      background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                      borderColor: `${element.gradientFrom}40`
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <HandHeart className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                      <p className="text-white italic text-sm">
                        {element.tagline} — Explore friendship compatibility profiles for each {element.element} subtype.
                      </p>
                    </div>
                  </div>

                  {/* Subtype Cards */}
                  <div className="bg-gradient-to-br from-gray-50 to-white">
                    <div className="p-6 grid gap-6 md:grid-cols-2">
                      {element.subtypeIds.map((subtypeId) => {
                        const profile = friendshipProfiles.find(p => p.subtypeId === subtypeId);
                        if (!profile) return null;
                        const isHighlighted = isUserSubtype(subtypeId);

                        return (
                          <div
                            key={subtypeId}
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
                            {/* User Badge */}
                            {isHighlighted && (
                              <div className="absolute -top-3 right-4">
                                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  Your Profile
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
                                {profile.subtypeName}
                              </span>
                            </div>

                            {/* Archetype Name */}
                            <h4 className="text-xl font-bold mb-1 text-gray-900">
                              {profile.archetypeName}
                            </h4>

                            {/* Friendship Style */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">
                              {profile.friendshipStyle}
                            </p>

                            {/* Natural Chemistry */}
                            <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100 mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Heart className="w-4 h-4 text-emerald-600" />
                                <span className="font-semibold text-sm text-emerald-700">
                                  Natural Chemistry
                                </span>
                              </div>
                              <div className="space-y-2.5">
                                {profile.naturalChemistry.map((ally, idx) => (
                                  <div key={idx} className="text-sm">
                                    <span className="font-medium text-emerald-800">{ally.name}</span>
                                    <p className="text-gray-600 mt-0.5 leading-relaxed">{ally.reason}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Growth Friendships */}
                            <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100 mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-amber-600" />
                                <span className="font-semibold text-sm text-amber-700">
                                  Growth Friendships
                                </span>
                              </div>
                              <div className="space-y-2.5">
                                {profile.growthFriendships.map((growth, idx) => (
                                  <div key={idx} className="text-sm">
                                    <span className="font-medium text-amber-800">{growth.name}</span>
                                    <p className="text-gray-600 mt-0.5 leading-relaxed">{growth.reason}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Friction Points */}
                            <div className="p-4 bg-red-50/80 rounded-lg border border-red-100">
                              <div className="flex items-center gap-2 mb-2">
                                <ShieldAlert className="w-4 h-4 text-red-600" />
                                <span className="font-semibold text-sm text-red-700">
                                  Friction Points
                                </span>
                              </div>
                              <div className="space-y-2.5">
                                {profile.frictionPoints.map((friction, idx) => (
                                  <div key={idx} className="text-sm">
                                    <span className="font-medium text-red-800">{friction.name}</span>
                                    <p className="text-gray-600 mt-0.5 leading-relaxed">{friction.reason}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Decorative corner */}
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
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CALCULATOR TAB */}
      {activeTab === 'calculator' && (
        <div className="space-y-8">
          {/* Calculator Card */}
          <div className="bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50 rounded-2xl p-8 border border-violet-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-gray-900">Friendship Compatibility Calculator</h3>
                <p className="text-gray-600 text-sm">Select two subtypes to discover their friendship dynamic</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Subtype 1 Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Friend {userSubtype && calcSubtype1 === userSubtype && (
                    <span className="text-amber-600 text-xs">(You)</span>
                  )}
                </label>
                <select
                  value={calcSubtype1}
                  onChange={(e) => {
                    setCalcSubtype1(e.target.value);
                    setShowReport(false);
                  }}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-violet-300 focus:border-violet-400 outline-none transition-all"
                >
                  <option value="">Select a subtype...</option>
                  {elementalTypes.map(et => (
                    <optgroup key={et.id} label={`${et.name} (${et.season})`}>
                      {et.subtypes.map(st => (
                        <option key={st.id} value={st.id}>
                          {st.shortName} — {st.name}
                          {st.id === userSubtype ? ' (You)' : ''}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Subtype 2 Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Second Friend
                </label>
                <select
                  value={calcSubtype2}
                  onChange={(e) => {
                    setCalcSubtype2(e.target.value);
                    setShowReport(false);
                  }}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-violet-300 focus:border-violet-400 outline-none transition-all"
                >
                  <option value="">Select a subtype...</option>
                  {elementalTypes.map(et => (
                    <optgroup key={et.id} label={`${et.name} (${et.season})`}>
                      {et.subtypes.map(st => (
                        <option key={st.id} value={st.id}>
                          {st.shortName} — {st.name}
                          {st.id === userSubtype ? ' (You)' : ''}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <button
                onClick={handleCalculate}
                disabled={!calcSubtype1 || !calcSubtype2}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                  calcSubtype1 && calcSubtype2
                    ? 'bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-rose-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Reveal Compatibility
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Compatibility Report */}
          {showReport && compatibilityReport && calcSubtype1 && calcSubtype2 && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              {/* Report Header */}
              <div className="p-8 bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: getElementColor(calcSubtype1.split('-')[0]) }}
                      >
                        {getSubtypeShortName(calcSubtype1).split('-').map(w => w[0]).join('')}
                      </div>
                      <ArrowLeftRight className="w-5 h-5 text-white/70" />
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: getElementColor(calcSubtype2.split('-')[0]) }}
                      >
                        {getSubtypeShortName(calcSubtype2).split('-').map(w => w[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif">
                        {getSubtypeName(calcSubtype1)} & {getSubtypeName(calcSubtype2)}
                      </h3>
                      <p className="text-white/80 text-sm">{compatibilityReport.friendshipArchetype}</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                        <circle 
                          cx="40" cy="40" r="35" fill="none" 
                          stroke="white" strokeWidth="6" 
                          strokeLinecap="round"
                          strokeDasharray={`${(compatibilityReport.overallScore / 10) * 220} 220`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{compatibilityReport.overallScore}</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-xs mt-1">{getScoreLabel(compatibilityReport.overallScore)}</p>
                  </div>
                </div>
              </div>

              {/* Report Body */}
              <div className="p-8 space-y-6">
                {/* Chemistry Type */}
                <div className="text-center pb-6 border-b border-gray-100">
                  <span 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${getScoreColor(compatibilityReport.overallScore)}15`,
                      color: getScoreColor(compatibilityReport.overallScore)
                    }}
                  >
                    <Star className="w-4 h-4" />
                    {compatibilityReport.chemistryType}
                  </span>
                </div>

                {/* Description */}
                <div className="bg-gradient-to-br from-violet-50 to-rose-50 rounded-xl p-6 border border-violet-100">
                  <p className="text-gray-700 leading-relaxed italic">
                    {compatibilityReport.description}
                  </p>
                </div>

                {/* Strengths */}
                <div className="p-6 bg-emerald-50/80 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-800 text-lg">What Works</h4>
                  </div>
                  <div className="space-y-3">
                    {compatibilityReport.strengths.map((strength, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed text-sm">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="p-6 bg-amber-50/80 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-amber-800 text-lg">Where Tension Lives</h4>
                  </div>
                  <div className="space-y-3">
                    {compatibilityReport.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed text-sm">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bridge Advice */}
                <div className="p-6 bg-blue-50/80 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800 text-lg">How to Bridge the Gap</h4>
                  </div>
                  <div className="space-y-4">
                    {compatibilityReport.bridgeAdvice.map((advice, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed text-sm">{advice}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compatibility Meter Visual */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-semibold text-gray-800 text-sm mb-4 text-center">Compatibility Spectrum</h4>
                  <div className="relative h-4 bg-gradient-to-r from-red-200 via-amber-200 via-yellow-200 to-emerald-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-500"
                      style={{ 
                        left: `calc(${(compatibilityReport.overallScore / 10) * 100}% - 12px)`,
                        backgroundColor: getScoreColor(compatibilityReport.overallScore)
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Challenging</span>
                    <span>Growth</span>
                    <span>Natural</span>
                    <span>Extraordinary</span>
                  </div>
                </div>

                {/* Share / Download Button */}
                <div className="pt-4 border-t border-gray-100 text-center">
                  <button
                    onClick={() => setShowShareGuide(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                    Share / Download This Report
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Download as image, print, copy link, or email this compatibility report
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* Quick Compatibility Grid (when no report shown) */}
          {!showReport && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="text-lg font-serif text-gray-900 mb-4 text-center">Quick Reference: Element Friendship Dynamics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { pair: 'Fire + Fire', score: 7, label: 'Mirror Intensity', color: '#C41E3A' },
                  { pair: 'Fire + Water', score: 5, label: 'Steam & Transformation', color: '#8B6BA4' },
                  { pair: 'Fire + Earth', score: 7, label: 'Forge & Foundation', color: '#A47930' },
                  { pair: 'Fire + Air', score: 8, label: 'Wildfire & Wind', color: '#E04535' },
                  { pair: 'Water + Water', score: 8, label: 'Deep Resonance', color: '#6B8BA4' },
                  { pair: 'Water + Earth', score: 8, label: 'River & Valley', color: '#6B7B5A' },
                  { pair: 'Water + Air', score: 6, label: 'Cloud & Mist', color: '#5BAABC' },
                  { pair: 'Earth + Earth', score: 8, label: 'Shared Foundation', color: '#8B4513' },
                  { pair: 'Earth + Air', score: 6, label: 'Mountain & Sky', color: '#5A9A6B' },
                  { pair: 'Air + Air', score: 7, label: 'Intellectual Symphony', color: '#00CED1' }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
                    style={{ background: `${item.color}08` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ color: item.color }}>{item.pair}</span>
                      <span 
                        className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${getScoreColor(item.score)}15`,
                          color: getScoreColor(item.score)
                        }}
                      >
                        {item.score}/10
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50 rounded-2xl border border-violet-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center flex-shrink-0">
            <HandHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Art of Elemental Friendship</h4>
            <p className="text-gray-600 leading-relaxed">
              No compatibility score determines the fate of a friendship. The most transformative 
              relationships often come from the most unexpected pairings. What matters is not whether 
              your elements naturally harmonize, but whether both friends are willing to learn each 
              other's elemental language. The highest form of friendship is not finding someone who 
              speaks your tongue—it is finding someone worth learning a new language for.
            </p>
          </div>
        </div>
      </div>

      {/* Share Guide Modal */}
      {showShareGuide && compatibilityReport && calcSubtype1 && calcSubtype2 && (
        <FriendshipCompatibilityShareGuide
          isOpen={showShareGuide}
          onClose={() => setShowShareGuide(false)}
          subtype1Id={calcSubtype1}
          subtype2Id={calcSubtype2}
          report={compatibilityReport}
        />
      )}
    </div>

  );
};

export default ElementalFriendshipCompatibility;
