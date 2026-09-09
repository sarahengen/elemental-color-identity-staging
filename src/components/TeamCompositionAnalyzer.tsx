import React, { useState, useMemo, useEffect } from 'react';
import { Users, Plus, X, Zap, AlertTriangle, CheckCircle, BarChart3, Sparkles, Share2 } from 'lucide-react';
import { teamDynamicsData, teamChemistryRules, teamBuildingStrategies } from '@/data/teamDynamicsData';
import TeamCompositionShareGuide from './TeamCompositionShareGuide';

interface TeamMember {
  id: string;
  name: string;
  element: string;
  subtypeId: string;
  subtypeName: string;
  archetypeName: string;
}

const allSubtypes = teamDynamicsData.flatMap(el =>
  el.subtypes.map(s => ({
    element: el.element,
    elementId: el.elementId,
    subtypeId: s.subtypeId,
    subtype: s.subtype,
    name: s.name,
    teamRole: s.teamRole,
    gradientFrom: el.gradientFrom,
    gradientTo: el.gradientTo
  }))
);

const TeamCompositionAnalyzer: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [memberName, setMemberName] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [showShareGuide, setShowShareGuide] = useState(false);

  // Handle shareable link URL parameters
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const teamCompData = params.get('teamcomp');
      if (teamCompData) {
        const decoded = JSON.parse(decodeURIComponent(atob(teamCompData)));
        if (Array.isArray(decoded) && decoded.length >= 2) {
          const loadedMembers: TeamMember[] = [];
          decoded.forEach((item: { n: string; e: string; s: string }, idx: number) => {
            const found = allSubtypes.find(s => s.subtypeId === item.s);
            if (found) {
              loadedMembers.push({
                id: `loaded-${idx}-${Date.now()}`,
                name: item.n || `Team Member ${idx + 1}`,
                element: found.elementId,
                subtypeId: found.subtypeId,
                subtypeName: found.subtype,
                archetypeName: found.name
              });
            }
          });
          if (loadedMembers.length >= 2) {
            setTeamMembers(loadedMembers);
            setShowReport(true);
            // Clean URL
            const url = new URL(window.location.href);
            url.searchParams.delete('teamcomp');
            window.history.replaceState({}, '', url.toString());
          }
        }
      }
    } catch (e) {
      console.error('Error parsing teamcomp URL parameter:', e);
    }
  }, []);

  const addMember = () => {
    if (!selectedSubtype) return;
    const found = allSubtypes.find(s => s.subtypeId === selectedSubtype);
    if (!found) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: memberName.trim() || `Team Member ${teamMembers.length + 1}`,
      element: found.elementId,
      subtypeId: found.subtypeId,
      subtypeName: found.subtype,
      archetypeName: found.name
    };

    setTeamMembers(prev => [...prev, newMember]);
    setSelectedSubtype('');
    setMemberName('');
  };

  const removeMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    if (teamMembers.length <= 2) setShowReport(false);
  };

  const analysis = useMemo(() => {
    if (teamMembers.length < 2) return null;

    // Element distribution
    const elementCounts: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };
    teamMembers.forEach(m => { elementCounts[m.element] = (elementCounts[m.element] || 0) + 1; });

    const presentElements = Object.entries(elementCounts).filter(([, c]) => c > 0);
    const missingElements = Object.entries(elementCounts).filter(([, c]) => c === 0).map(([e]) => e);
    const dominantElement = presentElements.sort((a, b) => b[1] - a[1])[0];

    // Chemistry scores between all pairs
    let totalScore = 0;
    let pairCount = 0;
    const pairDetails: { member1: string; member2: string; chemistry: string; score: number; dynamic: string }[] = [];

    for (let i = 0; i < teamMembers.length; i++) {
      for (let j = i + 1; j < teamMembers.length; j++) {
        const m1 = teamMembers[i];
        const m2 = teamMembers[j];
        const chem = teamChemistryRules[m1.element]?.[m2.element];
        if (chem) {
          totalScore += chem.score;
          pairCount++;
          pairDetails.push({
            member1: m1.name,
            member2: m2.name,
            chemistry: chem.chemistry,
            score: chem.score,
            dynamic: chem.dynamic
          });
        }
      }
    }

    const avgScore = pairCount > 0 ? Math.round(totalScore / pairCount) : 0;

    // Balance score
    const elementBalance = presentElements.length / 4;
    const balanceScore = Math.round(elementBalance * 100);

    // Overall team score
    const overallScore = Math.round((avgScore * 0.6) + (balanceScore * 0.4));

    // Strengths
    const strengths: string[] = [];
    if (presentElements.length === 4) strengths.push('Full elemental coverage — your team has access to all four modes of intelligence.');
    if (elementCounts.fire > 0 && elementCounts.earth > 0) strengths.push('Fire + Earth presence ensures ideas get executed.');
    if (elementCounts.water > 0 && elementCounts.air > 0) strengths.push('Water + Air presence ensures decisions are both empathic and analytical.');
    if (presentElements.length >= 3) strengths.push('Strong elemental diversity — multiple perspectives are naturally represented.');
    if (avgScore >= 85) strengths.push('Exceptional chemistry — this team\'s elemental pairings are naturally productive.');
    if (avgScore >= 75 && avgScore < 85) strengths.push('Good chemistry — most elemental pairings in this team are complementary.');

    // Risks
    const risks: string[] = [];
    if (missingElements.includes('fire')) risks.push('Missing Fire energy — the team may lack urgency and decisive action. Consider assigning a "catalyst" role.');
    if (missingElements.includes('water')) risks.push('Missing Water energy — the team may overlook emotional dynamics and relational needs. Schedule regular check-ins.');
    if (missingElements.includes('earth')) risks.push('Missing Earth energy — the team may struggle to execute and deliver. Assign clear ownership for implementation.');
    if (missingElements.includes('air')) risks.push('Missing Air energy — the team may lack strategic perspective and innovation. Schedule regular "big picture" reviews.');
    if (dominantElement && dominantElement[1] > teamMembers.length * 0.6) risks.push(`Over-concentration of ${dominantElement[0].charAt(0).toUpperCase() + dominantElement[0].slice(1)} energy — the team may have blind spots in areas this element naturally neglects.`);
    if (avgScore < 75) risks.push('Some elemental pairings may create friction. Review the pair dynamics below for specific guidance.');

    // Recommendations
    const recommendations: string[] = [];
    if (missingElements.length > 0) {
      recommendations.push(`Consider adding a ${missingElements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(' or ')} type to fill elemental gaps.`);
    }
    if (dominantElement && dominantElement[1] > 2) {
      recommendations.push(`With ${dominantElement[1]} ${dominantElement[0].charAt(0).toUpperCase() + dominantElement[0].slice(1)} types, designate one to play "devil's advocate" and intentionally represent the missing elemental perspectives.`);
    }
    recommendations.push('Schedule a team session to share individual team roles and discuss how each person\'s elemental nature contributes to the collective.');
    if (pairDetails.some(p => p.score < 80)) {
      recommendations.push('For lower-chemistry pairings, establish explicit communication protocols — these relationships need more structure, not less interaction.');
    }

    return {
      elementCounts,
      presentElements,
      missingElements,
      dominantElement,
      avgScore,
      balanceScore,
      overallScore,
      pairDetails: pairDetails.sort((a, b) => b.score - a.score),
      strengths,
      risks,
      recommendations
    };
  }, [teamMembers]);

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      fire: '#C41E3A',
      water: '#6B8BA4',
      earth: '#8B4513',
      air: '#00CED1'
    };
    return colors[element] || '#666';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 65) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 65) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="mt-12">
      <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 rounded-2xl border border-indigo-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Team Composition Analyzer</h3>
          </div>
          <p className="text-indigo-100 text-sm max-w-2xl">
            Add team members by selecting their elemental subtype. Once you have at least two members, 
            generate a comprehensive team chemistry report with strengths, risks, and recommendations.
          </p>
        </div>

        {/* Add Member Form */}
        <div className="p-6 md:p-8 border-b border-indigo-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Member name (optional)"
              value={memberName}
              onChange={e => setMemberName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
            />
            <select
              value={selectedSubtype}
              onChange={e => setSelectedSubtype(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white"
            >
              <option value="">Select elemental subtype...</option>
              {teamDynamicsData.map(el => (
                <optgroup key={el.elementId} label={el.element}>
                  {el.subtypes.map(s => (
                    <option key={s.subtypeId} value={s.subtypeId}>
                      {s.subtype} — {s.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              onClick={addMember}
              disabled={!selectedSubtype}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Team Members List */}
        {teamMembers.length > 0 && (
          <div className="p-6 md:p-8 border-b border-indigo-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Team Members ({teamMembers.length})</h4>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map(member => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm"
                  style={{
                    borderColor: `${getElementColor(member.element)}40`,
                    backgroundColor: `${getElementColor(member.element)}10`
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: getElementColor(member.element) }}
                  />
                  <span className="font-medium text-gray-800">{member.name}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-xs">{member.subtypeName}</span>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {teamMembers.length >= 2 && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowReport(!showReport)}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center gap-2 shadow-md"
                >
                  <BarChart3 className="w-4 h-4" />
                  {showReport ? 'Hide Report' : 'Generate Chemistry Report'}
                </button>
              </div>
            )}
            {teamMembers.length === 1 && (
              <p className="mt-3 text-xs text-gray-500 italic">Add at least one more member to generate a team chemistry report.</p>
            )}
          </div>
        )}

        {/* Chemistry Report */}
        {showReport && analysis && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Share Button Bar */}
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-serif text-gray-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" />
                Chemistry Report
              </h4>
              <button
                onClick={() => setShowShareGuide(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                Share This Report
              </button>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border text-center ${getScoreBg(analysis.overallScore)}`}>
                <p className="text-xs font-medium text-gray-500 mb-1">Overall Team Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>{analysis.overallScore}</p>
                <p className="text-xs text-gray-400 mt-1">out of 100</p>
              </div>
              <div className={`p-4 rounded-xl border text-center ${getScoreBg(analysis.avgScore)}`}>
                <p className="text-xs font-medium text-gray-500 mb-1">Avg Chemistry</p>
                <p className={`text-3xl font-bold ${getScoreColor(analysis.avgScore)}`}>{analysis.avgScore}</p>
                <p className="text-xs text-gray-400 mt-1">pair compatibility</p>
              </div>
              <div className={`p-4 rounded-xl border text-center ${getScoreBg(analysis.balanceScore)}`}>
                <p className="text-xs font-medium text-gray-500 mb-1">Element Balance</p>
                <p className={`text-3xl font-bold ${getScoreColor(analysis.balanceScore)}`}>{analysis.balanceScore}</p>
                <p className="text-xs text-gray-400 mt-1">diversity score</p>
              </div>
            </div>

            {/* Element Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Element Distribution
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {(['fire', 'water', 'earth', 'air'] as const).map(el => {
                  const count = analysis.elementCounts[el] || 0;
                  const pct = teamMembers.length > 0 ? Math.round((count / teamMembers.length) * 100) : 0;
                  return (
                    <div key={el} className="text-center">
                      <div
                        className="w-full h-2 rounded-full mb-2 bg-gray-100 overflow-hidden"
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: getElementColor(el),
                            minWidth: count > 0 ? '10%' : '0%'
                          }}
                        />
                      </div>
                      <p className="text-xs font-medium capitalize" style={{ color: getElementColor(el) }}>{el}</p>
                      <p className="text-xs text-gray-400">{count} ({pct}%)</p>
                    </div>
                  );
                })}
              </div>
              {analysis.missingElements.length > 0 && (
                <p className="mt-3 text-xs text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Missing: {analysis.missingElements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}
                </p>
              )}
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5">
                <h4 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Team Strengths
                </h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risks */}
            {analysis.risks.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                <h4 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Potential Risks
                </h4>
                <ul className="space-y-2">
                  {analysis.risks.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pair Dynamics */}
            {analysis.pairDetails.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-500" />
                  Pair Dynamics
                </h4>
                <div className="space-y-3">
                  {analysis.pairDetails.map((pair, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${getScoreBg(pair.score)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {pair.member1} + {pair.member2}
                        </span>
                        <span className={`text-sm font-bold ${getScoreColor(pair.score)}`}>
                          {pair.score}/100
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-600 mb-1">{pair.chemistry}</p>
                      <p className="text-xs text-gray-500">{pair.dynamic}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations.length > 0 && (
              <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-5">
                <h4 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-500 mt-0.5 font-bold">{i + 1}.</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Share CTA */}
            <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 rounded-xl border border-indigo-200 p-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Share this report with your team</h4>
                  <p className="text-xs text-gray-500">
                    Download a beautiful PDF, copy a shareable link, or email the full chemistry report to your team members, 
                    manager, or coach so everyone can understand the group's elemental dynamics.
                  </p>
                </div>
                <button
                  onClick={() => setShowShareGuide(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md hover:shadow-lg flex-shrink-0"
                >
                  <Share2 className="w-4 h-4" />
                  Share Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {teamMembers.length === 0 && (
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="text-gray-500 text-sm">
              Add team members above to analyze your team's elemental chemistry.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Select each person's elemental subtype and generate a comprehensive report.
            </p>
          </div>
        )}
      </div>

      {/* Share Guide Modal */}
      {analysis && (
        <TeamCompositionShareGuide
          isOpen={showShareGuide}
          onClose={() => setShowShareGuide(false)}
          members={teamMembers}
          analysis={analysis}
        />
      )}
    </div>
  );
};

export default TeamCompositionAnalyzer;
