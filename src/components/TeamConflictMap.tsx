import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Flame, Droplets, Mountain, Wind, Swords, Shield, Heart, Users,
  AlertTriangle, CheckCircle2, Eye, Zap, ArrowRight,
  BarChart3, Target, BookOpen, Sparkles, ChevronDown, ChevronUp,
  UserPlus, Trash2, MessageSquare, Scale, Info, Share2
} from 'lucide-react';

import { conflictData, mediationGuides, MediationGuide } from '@/data/conflictData';
import TeamConflictShareGuide from '@/components/TeamConflictShareGuide';


interface TeamMember {
  id: string;
  name: string;
  subtypeId: string;
}

interface PairingResult {
  memberA: TeamMember;
  memberB: TeamMember;
  frictionScore: number;
  category: 'ally' | 'compatible' | 'hidden-friction' | 'high-clash';
  categoryLabel: string;
  description: string;
  responseInteraction: string;
  mediationGuide: MediationGuide | null;
  guideSwapped: boolean;
}

interface TeamConflictMapProps {
  userElement?: string | null;
  userSubtype?: string | null;
  onNavigateToGuide?: (partyAId: string, partyBId: string) => void;
}

// Build flat subtype list
const allSubtypes = conflictData.flatMap(el =>
  el.subtypes.map(s => ({
    ...s,
    elementId: el.elementId,
    element: el.element,
    gradientFrom: el.gradientFrom,
    gradientTo: el.gradientTo
  }))
);

const getSubtype = (id: string) => allSubtypes.find(s => s.subtypeId === id);

const elementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  earth: <Mountain className="w-4 h-4" />,
  air: <Wind className="w-4 h-4" />
};

const tinyElementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-3 h-3" />,
  water: <Droplets className="w-3 h-3" />,
  earth: <Mountain className="w-3 h-3" />,
  air: <Wind className="w-3 h-3" />
};

const responseLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  fight: { label: 'Fight', icon: <Swords className="w-3 h-3" />, color: 'text-red-600' },
  flight: { label: 'Flight', icon: <Wind className="w-3 h-3" />, color: 'text-amber-600' },
  freeze: { label: 'Freeze', icon: <Shield className="w-3 h-3" />, color: 'text-blue-600' },
  fawn: { label: 'Fawn', icon: <Heart className="w-3 h-3" />, color: 'text-emerald-600' }
};

// Friction scoring: response interaction
const responseFriction: Record<string, number> = {
  'fight-fight': 85,
  'fight-flight': 62,
  'fight-freeze': 70,
  'fight-fawn': 55,
  'flight-flight': 45,
  'flight-freeze': 40,
  'flight-fawn': 35,
  'freeze-freeze': 50,
  'freeze-fawn': 30,
  'fawn-fawn': 42
};

const getResponseFriction = (a: string, b: string): number => {
  return responseFriction[`${a}-${b}`] ?? responseFriction[`${b}-${a}`] ?? 50;
};

// Element interaction modifier
const elementModifiers: Record<string, number> = {
  'fire-fire': 5,
  'fire-water': 15,
  'fire-earth': 8,
  'fire-air': 3,
  'water-water': 5,
  'water-earth': -12,
  'water-air': 5,
  'earth-earth': 5,
  'earth-air': 8,
  'air-air': 5
};

const getElementModifier = (a: string, b: string): number => {
  return elementModifiers[`${a}-${b}`] ?? elementModifiers[`${b}-${a}`] ?? 0;
};

// Response interaction descriptions
const responseInteractionDescriptions: Record<string, string> = {
  'fight-fight': 'Both default to direct confrontation. Conflicts will be loud, fast, and potentially explosive. High energy but risk of escalation spirals.',
  'fight-flight': 'One confronts while the other retreats. The fighter feels dismissed; the flyer feels pursued. A frustrating chase dynamic.',
  'fight-freeze': 'Direct confrontation meets internal shutdown. The fighter reads silence as indifference; the freezer reads intensity as aggression.',
  'fight-fawn': 'Confrontation meets accommodation. The fighter may not realize the fawner is suppressing their true feelings, creating hidden resentment.',
  'flight-flight': 'Both avoid direct engagement. Issues accumulate silently. The relationship may appear smooth while problems grow beneath the surface.',
  'flight-freeze': 'One leaves, the other goes still. Neither engages directly. Conflicts may never be explicitly addressed or resolved.',
  'flight-fawn': 'One withdraws while the other over-accommodates. The fawner may chase the flyer with helpfulness, creating an exhausting dynamic.',
  'freeze-freeze': 'Both go internal simultaneously. Extended silences where both are processing but neither is communicating. Stalemate risk.',
  'freeze-fawn': 'One goes still while the other soothes. The fawner may fill the silence with accommodation, preventing the freezer from completing their processing.',
  'fawn-fawn': 'Both accommodate each other. Superficially harmonious but neither party\'s real needs get expressed. Hidden mutual frustration builds over time.'
};

const getResponseInteraction = (a: string, b: string): string => {
  return responseInteractionDescriptions[`${a}-${b}`] ?? responseInteractionDescriptions[`${b}-${a}`] ?? 'A unique interaction pattern between these two response styles.';
};

// Calculate friction score for a pair
const calculatePairFriction = (subtypeA: string, subtypeB: string): number => {
  const a = getSubtype(subtypeA);
  const b = getSubtype(subtypeB);
  if (!a || !b) return 50;

  let score = getResponseFriction(a.defaultResponse, b.defaultResponse);
  score += getElementModifier(a.elementId, b.elementId);

  // Same subtype bonus (they understand each other deeply)
  if (subtypeA === subtypeB) score -= 15;

  return Math.max(0, Math.min(100, score));
};

const categorizeScore = (score: number): { category: PairingResult['category']; label: string } => {
  if (score <= 32) return { category: 'ally', label: 'Natural Allies' };
  if (score <= 52) return { category: 'compatible', label: 'Compatible' };
  if (score <= 68) return { category: 'hidden-friction', label: 'Hidden Friction' };
  return { category: 'high-clash', label: 'High Clash Risk' };
};

const categoryStyles: Record<string, { bg: string; text: string; border: string; cellBg: string; dot: string }> = {
  'ally': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', cellBg: 'bg-emerald-100', dot: 'bg-emerald-500' },
  'compatible': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', cellBg: 'bg-sky-100', dot: 'bg-sky-500' },
  'hidden-friction': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', cellBg: 'bg-amber-100', dot: 'bg-amber-500' },
  'high-clash': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', cellBg: 'bg-red-100', dot: 'bg-red-500' }
};

// Find matching mediation guide
const findMediationGuide = (subtypeAId: string, subtypeBId: string): { guide: MediationGuide; swapped: boolean } | null => {
  const direct = mediationGuides.find(g => g.partyAId === subtypeAId && g.partyBId === subtypeBId);
  if (direct) return { guide: direct, swapped: false };
  const reversed = mediationGuides.find(g => g.partyAId === subtypeBId && g.partyBId === subtypeAId);
  if (reversed) return { guide: reversed, swapped: true };
  return null;
};

// Generate conflict protocol based on group composition
const generateConflictProtocol = (members: TeamMember[]): {
  title: string;
  steps: string[];
  principles: string[];
  warningSignals: string[];
} => {
  const responses: Record<string, number> = { fight: 0, flight: 0, freeze: 0, fawn: 0 };
  members.forEach(m => {
    const s = getSubtype(m.subtypeId);
    if (s) responses[s.defaultResponse]++;
  });

  const total = members.length;
  const fightPct = responses.fight / total;
  const flightPct = responses.flight / total;
  const freezePct = responses.freeze / total;
  const fawnPct = responses.fawn / total;

  const dominant = Object.entries(responses).sort((a, b) => b[1] - a[1])[0][0];
  const secondary = Object.entries(responses).sort((a, b) => b[1] - a[1])[1][0];

  let title = '';
  const steps: string[] = [];
  const principles: string[] = [];
  const warningSignals: string[] = [];

  // Title based on dominant mix
  if (fightPct >= 0.5) {
    title = 'The Direct Engagement Protocol';
  } else if (flightPct >= 0.5) {
    title = 'The Structured Return Protocol';
  } else if (freezePct >= 0.5) {
    title = 'The Processing Space Protocol';
  } else if (fawnPct >= 0.5) {
    title = 'The Honest Harmony Protocol';
  } else if (fightPct >= 0.3 && fawnPct >= 0.3) {
    title = 'The Balanced Voice Protocol';
  } else if (fightPct >= 0.3 && freezePct >= 0.3) {
    title = 'The Pace-Bridging Protocol';
  } else if (flightPct >= 0.3 && fawnPct >= 0.3) {
    title = 'The Safe Engagement Protocol';
  } else {
    title = 'The Adaptive Resolution Protocol';
  }

  // Steps always include these core elements, customized
  steps.push(
    responses.fight > 0
      ? `When conflict arises, allow Fight-responders (${members.filter(m => getSubtype(m.subtypeId)?.defaultResponse === 'fight').map(m => m.name).join(', ')}) to state the issue directly — but limit initial statements to 2 minutes each.`
      : 'When conflict arises, designate one person to name the issue clearly and concisely before discussion begins.'
  );

  if (responses.freeze > 0 || responses.flight > 0) {
    steps.push(
      `After the issue is stated, provide a mandatory 5-minute pause before responses. This honors the processing needs of ${[
        ...(responses.freeze > 0 ? members.filter(m => getSubtype(m.subtypeId)?.defaultResponse === 'freeze').map(m => m.name) : []),
        ...(responses.flight > 0 ? members.filter(m => getSubtype(m.subtypeId)?.defaultResponse === 'flight').map(m => m.name) : [])
      ].join(', ')}.`
    );
  }

  if (responses.fawn > 0) {
    steps.push(
      `Explicitly ask Fawn-responders (${members.filter(m => getSubtype(m.subtypeId)?.defaultResponse === 'fawn').map(m => m.name).join(', ')}) for their honest opinion — not their accommodating one. Use the prompt: "What do YOU actually need here?"`
    );
  }

  steps.push('Each person states their core need in one sentence. No rebuttals during this round — only listening.');

  if (responses.fight > 0 && responses.freeze > 0) {
    steps.push('Fight-responders: practice summarizing what Freeze-responders said before responding. This prevents the "loud over quiet" dynamic.');
  }

  if (responses.flight > 0) {
    steps.push('If anyone needs to step away, they must state a specific return time: "I need 20 minutes, then I\'ll come back." No open-ended exits.');
  }

  steps.push('Before closing, each person names one thing they will do differently and one thing they appreciate about another member\'s contribution to the discussion.');
  steps.push('Schedule a follow-up check-in within one week to assess whether the resolution is holding.');

  // Principles
  principles.push('Every conflict response is valid — Fight is not aggression, Flight is not cowardice, Freeze is not indifference, Fawn is not weakness.');

  if (fightPct >= 0.3) {
    principles.push('Directness is valued, but volume is not. Say what you mean at a conversational tone.');
  }
  if (flightPct >= 0.3) {
    principles.push('Space is respected, but disappearance is not. Always communicate when you need to step away and when you\'ll return.');
  }
  if (freezePct >= 0.3) {
    principles.push('Processing time is honored. Written responses are equally valid as spoken ones.');
  }
  if (fawnPct >= 0.3) {
    principles.push('Accommodation without honesty is not resolution. Saying "I\'m fine" when you\'re not is a violation of this protocol.');
  }

  principles.push('The goal is not to eliminate conflict but to ensure every voice is heard and every need is considered.');

  // Warning signals
  if (responses.fight >= 2) {
    warningSignals.push('Multiple Fight-responders escalating simultaneously — call a mandatory cool-down before the conversation becomes a power struggle.');
  }
  if (responses.fawn >= 2) {
    warningSignals.push('Multiple Fawn-responders agreeing too quickly — slow down and ask each person to name one thing they disagree with.');
  }
  if (responses.freeze >= 2) {
    warningSignals.push('Extended group silence — someone needs to gently break it with: "I notice we\'ve all gone quiet. What\'s happening for each of us right now?"');
  }
  if (responses.flight >= 2) {
    warningSignals.push('Multiple people disengaging or changing the subject — name the avoidance pattern: "I think we\'re all trying to move past this without resolving it."');
  }
  if (responses.fight > 0 && responses.fawn > 0) {
    warningSignals.push('Fight-responders dominating while Fawn-responders accommodate — actively redirect: "I want to hear from everyone, especially those who haven\'t spoken yet."');
  }
  if (responses.fight > 0 && responses.freeze > 0) {
    warningSignals.push('Fight-responders interpreting Freeze-responders\' silence as agreement — check in directly: "[Name], I want to make sure we\'re hearing your perspective too."');
  }

  if (warningSignals.length === 0) {
    warningSignals.push('Watch for any member consistently deferring to others — this may indicate suppressed needs that will surface later as resentment.');
  }

  return { title, steps, principles, warningSignals };
};

// Generate group conflict patterns
const generateGroupPatterns = (pairings: PairingResult[], members: TeamMember[]): string[] => {
  const patterns: string[] = [];
  const highClash = pairings.filter(p => p.category === 'high-clash');
  const hiddenFriction = pairings.filter(p => p.category === 'hidden-friction');
  const allies = pairings.filter(p => p.category === 'ally');

  if (highClash.length > 0) {
    const clashNames = highClash.map(p => `${p.memberA.name} & ${p.memberB.name}`).join('; ');
    patterns.push(`High-energy conflict zones: ${clashNames}. These pairings will produce the most visible and intense disagreements. They need explicit mediation protocols.`);
  }

  if (hiddenFriction.length > pairings.length * 0.4) {
    patterns.push('This group has a high proportion of hidden friction pairings. Conflicts may appear rare but are actually accumulating beneath the surface. Schedule regular "clearing the air" sessions to prevent buildup.');
  }

  if (allies.length > 0) {
    const allyNames = allies.map(p => `${p.memberA.name} & ${p.memberB.name}`).join('; ');
    patterns.push(`Natural alliance zones: ${allyNames}. These pairings can serve as stabilizing forces during group conflict. Consider pairing allies with high-clash members as mediators.`);
  }

  // Check for isolation
  const memberClashCount: Record<string, number> = {};
  members.forEach(m => { memberClashCount[m.id] = 0; });
  highClash.forEach(p => {
    memberClashCount[p.memberA.id]++;
    memberClashCount[p.memberB.id]++;
  });
  const isolatedMembers = members.filter(m => memberClashCount[m.id] >= Math.ceil(members.length / 2));
  if (isolatedMembers.length > 0) {
    patterns.push(`${isolatedMembers.map(m => m.name).join(', ')} ${isolatedMembers.length === 1 ? 'has' : 'have'} high clash potential with multiple group members. This person may feel isolated or become a lightning rod for group tension. Proactive support is essential.`);
  }

  // Response distribution patterns
  const responses: Record<string, number> = { fight: 0, flight: 0, freeze: 0, fawn: 0 };
  members.forEach(m => {
    const s = getSubtype(m.subtypeId);
    if (s) responses[s.defaultResponse]++;
  });

  if (responses.fight === 0) {
    patterns.push('This group has no Fight-responders. Issues may go unaddressed because no one is naturally inclined to name problems directly. Assign a rotating "devil\'s advocate" role to ensure concerns surface.');
  }
  if (responses.fawn === 0) {
    patterns.push('This group has no Fawn-responders. Emotional safety may be lacking during conflicts. Explicitly build in empathy checks: "How is everyone feeling about this discussion?"');
  }
  if (responses.freeze === 0) {
    patterns.push('This group has no Freeze-responders. Decisions may be made too quickly without deep analysis. Build in mandatory reflection pauses before finalizing conflict resolutions.');
  }
  if (responses.flight === 0) {
    patterns.push('This group has no Flight-responders. The group may lack perspective-taking ability. Encourage stepping back to see the bigger picture before diving into solutions.');
  }

  if (responses.fight >= members.length * 0.5) {
    patterns.push('This group is Fight-dominant. Expect frequent, direct, high-energy conflicts. The risk is escalation spirals. Establish a "cool-down" rule: if voices rise, take a 10-minute break.');
  }
  if (responses.fawn >= members.length * 0.5) {
    patterns.push('This group is Fawn-dominant. Expect surface harmony masking unspoken tensions. The risk is accumulated resentment. Establish a "honesty round" where each person must name one concern.');
  }

  return patterns;
};

let memberIdCounter = 0;
const generateId = () => `member-${++memberIdCounter}-${Date.now()}`;

const TeamConflictMap: React.FC<TeamConflictMapProps> = ({ userElement, userSubtype, onNavigateToGuide }) => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const initial: TeamMember[] = [
      { id: generateId(), name: '', subtypeId: userSubtype || 'fire-fire' }
    ];
    return initial;
  });
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [expandedPairing, setExpandedPairing] = useState<string | null>(null);
  const [showProtocol, setShowProtocol] = useState(false);
  const [showShareGuide, setShowShareGuide] = useState(false);

  // Handle shareable link URL parameter
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const teamParam = params.get('teammap');
      if (teamParam) {
        const decoded = JSON.parse(decodeURIComponent(atob(teamParam)));
        if (Array.isArray(decoded) && decoded.length >= 3 && decoded.length <= 8) {
          const validSubtypeIds = allSubtypes.map(s => s.subtypeId);
          const loadedMembers: TeamMember[] = decoded
            .filter((d: any) => d.n && d.s && validSubtypeIds.includes(d.s))
            .map((d: any) => ({
              id: generateId(),
              name: d.n,
              subtypeId: d.s
            }));
          if (loadedMembers.length >= 3) {
            setMembers(loadedMembers);
            // Auto-analyze after a brief delay to let state settle
            setTimeout(() => setHasAnalyzed(true), 100);
            // Clean the URL parameter without reloading
            const url = new URL(window.location.href);
            url.searchParams.delete('teammap');
            window.history.replaceState({}, '', url.toString());
          }
        }
      }
    } catch (e) {
      // Silently ignore invalid URL params
      console.warn('Invalid teammap URL parameter:', e);
    }
  }, []);


  const addMember = useCallback(() => {
    if (members.length >= 8) return;
    setMembers(prev => [...prev, { id: generateId(), name: '', subtypeId: 'water-water' }]);
    setHasAnalyzed(false);
  }, [members.length]);

  const removeMember = useCallback((id: string) => {
    if (members.length <= 1) return;
    setMembers(prev => prev.filter(m => m.id !== id));
    setHasAnalyzed(false);
  }, [members.length]);

  const updateMember = useCallback((id: string, field: 'name' | 'subtypeId', value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
    setHasAnalyzed(false);
  }, []);

  const canAnalyze = members.length >= 3 && members.every(m => m.name.trim().length > 0);

  // Calculate all pairings
  const pairings = useMemo((): PairingResult[] => {
    if (!hasAnalyzed) return [];
    const results: PairingResult[] = [];
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const a = members[i];
        const b = members[j];
        const subtypeA = getSubtype(a.subtypeId);
        const subtypeB = getSubtype(b.subtypeId);
        if (!subtypeA || !subtypeB) continue;

        const frictionScore = calculatePairFriction(a.subtypeId, b.subtypeId);
        const { category, label } = categorizeScore(frictionScore);
        const responseInteraction = getResponseInteraction(subtypeA.defaultResponse, subtypeB.defaultResponse);
        const guideResult = findMediationGuide(a.subtypeId, b.subtypeId);

        let description = '';
        if (category === 'ally') {
          description = `${a.name} and ${b.name} are natural allies. Their conflict styles complement each other, creating a stabilizing dynamic in the group.`;
        } else if (category === 'compatible') {
          description = `${a.name} and ${b.name} have compatible conflict styles. Minor friction may arise but is easily managed with basic awareness.`;
        } else if (category === 'hidden-friction') {
          description = `${a.name} and ${b.name} have hidden friction. Their conflicts may not be visible but are accumulating beneath the surface. Proactive check-ins recommended.`;
        } else {
          description = `${a.name} and ${b.name} are a high-clash pairing. Their default conflict responses are likely to trigger each other. Active mediation protocols recommended.`;
        }

        results.push({
          memberA: a,
          memberB: b,
          frictionScore,
          category,
          categoryLabel: label,
          description,
          responseInteraction,
          mediationGuide: guideResult?.guide || null,
          guideSwapped: guideResult?.swapped || false
        });
      }
    }
    return results.sort((a, b) => b.frictionScore - a.frictionScore);
  }, [hasAnalyzed, members]);

  // Group risk score
  const groupRiskScore = useMemo((): number => {
    if (pairings.length === 0) return 0;
    const avg = pairings.reduce((sum, p) => sum + p.frictionScore, 0) / pairings.length;
    return Math.round(avg);
  }, [pairings]);

  const groupRiskLabel = useMemo(() => {
    if (groupRiskScore <= 35) return { label: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', description: 'This group has strong natural compatibility. Conflicts will be infrequent and manageable.' };
    if (groupRiskScore <= 50) return { label: 'Moderate Risk', color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', description: 'This group has a healthy mix of compatibility and friction. Some intentional conflict management will be beneficial.' };
    if (groupRiskScore <= 65) return { label: 'Elevated Risk', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', description: 'This group has significant friction potential. Proactive conflict protocols are strongly recommended.' };
    return { label: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', description: 'This group has high conflict potential. Without active management, disagreements may escalate quickly and frequently.' };
  }, [groupRiskScore]);

  const groupPatterns = useMemo(() => {
    if (!hasAnalyzed) return [];
    return generateGroupPatterns(pairings, members);
  }, [hasAnalyzed, pairings, members]);

  const conflictProtocol = useMemo(() => {
    if (!hasAnalyzed) return null;
    return generateConflictProtocol(members);
  }, [hasAnalyzed, members]);

  // Response distribution
  const responseDistribution = useMemo(() => {
    const dist: Record<string, { count: number; members: string[] }> = {
      fight: { count: 0, members: [] },
      flight: { count: 0, members: [] },
      freeze: { count: 0, members: [] },
      fawn: { count: 0, members: [] }
    };
    members.forEach(m => {
      const s = getSubtype(m.subtypeId);
      if (s) {
        dist[s.defaultResponse].count++;
        dist[s.defaultResponse].members.push(m.name || 'Unnamed');
      }
    });
    return dist;
  }, [members]);

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          Map the conflict dynamics of any group — a team, family, or friend circle. Add 3-8 members with their 
          elemental subtypes to reveal compatibility patterns, high-risk pairings, and a customized conflict 
          protocol for the group.
        </p>
      </div>

      {/* Member Input Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            Team Members
            <span className="text-sm font-normal text-gray-400">({members.length}/8)</span>
          </h4>
          <button
            onClick={addMember}
            disabled={members.length >= 8}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              members.length >= 8
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 shadow-md hover:shadow-lg'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <div className="space-y-3">
          {members.map((member, idx) => {
            const subtype = getSubtype(member.subtypeId);
            return (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                  placeholder="Enter name..."
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-800 bg-white focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all placeholder:text-gray-400"
                />
                <select
                  value={member.subtypeId}
                  onChange={(e) => updateMember(member.id, 'subtypeId', e.target.value)}
                  className="w-64 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-800 bg-white focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all"
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
                {subtype && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                    subtype.defaultResponse === 'fight' ? 'bg-red-100 text-red-700' :
                    subtype.defaultResponse === 'flight' ? 'bg-amber-100 text-amber-700' :
                    subtype.defaultResponse === 'freeze' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {responseLabels[subtype.defaultResponse].icon}
                    {responseLabels[subtype.defaultResponse].label}
                  </div>
                )}
                <button
                  onClick={() => removeMember(member.id)}
                  disabled={members.length <= 1}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    members.length <= 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Analyze Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          {!canAnalyze && members.length < 3 && (
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Add at least 3 members to analyze team dynamics
            </p>
          )}
          {!canAnalyze && members.length >= 3 && (
            <p className="text-xs text-amber-500 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Please enter a name for each team member
            </p>
          )}
          <button
            onClick={() => setHasAnalyzed(true)}
            disabled={!canAnalyze}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
              canAnalyze
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analyze Team Conflict Dynamics
          </button>
        </div>
      </div>

      {/* Results */}
      {hasAnalyzed && pairings.length > 0 && (
        <>
          {/* Group Risk Score */}
          <div className={`rounded-2xl border overflow-hidden ${groupRiskLabel.border}`}>
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={groupRiskScore <= 35 ? '#22c55e' : groupRiskScore <= 50 ? '#0ea5e9' : groupRiskScore <= 65 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray={`${groupRiskScore}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{groupRiskScore}</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider">Risk</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">Group Conflict Risk Score</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${groupRiskLabel.bg} ${groupRiskLabel.color}`}>
                      {groupRiskLabel.label}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xl">{groupRiskLabel.description}</p>
                </div>
              </div>
            </div>

            {/* Response Distribution */}
            <div className="p-6 md:p-8 bg-white">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Group Response Distribution</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['fight', 'flight', 'freeze', 'fawn'] as const).map(response => {
                  const info = responseLabels[response];
                  const dist = responseDistribution[response];
                  const pct = members.length > 0 ? Math.round((dist.count / members.length) * 100) : 0;
                  return (
                    <div key={response} className={`p-4 rounded-xl border ${
                      response === 'fight' ? 'bg-red-50/50 border-red-100' :
                      response === 'flight' ? 'bg-amber-50/50 border-amber-100' :
                      response === 'freeze' ? 'bg-blue-50/50 border-blue-100' :
                      'bg-emerald-50/50 border-emerald-100'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={info.color}>{info.icon}</span>
                        <span className={`text-sm font-semibold ${info.color}`}>{info.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{dist.count}</div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            response === 'fight' ? 'bg-red-500' :
                            response === 'flight' ? 'bg-amber-500' :
                            response === 'freeze' ? 'bg-blue-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      {dist.members.length > 0 && (
                        <p className="text-xs text-gray-500 truncate">{dist.members.join(', ')}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Compatibility Matrix */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-600" />
              Conflict Compatibility Matrix
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Each cell shows the friction score between two members. Lower is better.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { cat: 'ally', label: 'Natural Allies (0-32)' },
                { cat: 'compatible', label: 'Compatible (33-52)' },
                { cat: 'hidden-friction', label: 'Hidden Friction (53-68)' },
                { cat: 'high-clash', label: 'High Clash Risk (69-100)' }
              ].map(item => (
                <div key={item.cat} className="flex items-center gap-1.5 text-xs">
                  <div className={`w-3 h-3 rounded-sm ${categoryStyles[item.cat].dot}`} />
                  <span className="text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Matrix Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-xs font-medium text-gray-400 w-32" />
                      {members.map(m => {
                        const s = getSubtype(m.subtypeId);
                        return (
                          <th key={m.id} className="p-2 text-center min-w-[80px]">
                            <div className="flex flex-col items-center gap-1">
                              {s && (
                                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                                  style={{ background: `linear-gradient(135deg, ${allSubtypes.find(st => st.subtypeId === m.subtypeId)?.gradientFrom || '#666'}, ${allSubtypes.find(st => st.subtypeId === m.subtypeId)?.gradientTo || '#999'})` }}
                                >
                                  {tinyElementIcons[s.elementId]}
                                </div>
                              )}
                              <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{m.name}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((rowMember, rowIdx) => {
                      const rowSubtype = getSubtype(rowMember.subtypeId);
                      return (
                        <tr key={rowMember.id}>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              {rowSubtype && (
                                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white flex-shrink-0"
                                  style={{ background: `linear-gradient(135deg, ${allSubtypes.find(st => st.subtypeId === rowMember.subtypeId)?.gradientFrom || '#666'}, ${allSubtypes.find(st => st.subtypeId === rowMember.subtypeId)?.gradientTo || '#999'})` }}
                                >
                                  {tinyElementIcons[rowSubtype.elementId]}
                                </div>
                              )}
                              <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">{rowMember.name}</span>
                            </div>
                          </td>
                          {members.map((colMember, colIdx) => {
                            if (rowIdx === colIdx) {
                              return (
                                <td key={colMember.id} className="p-2 text-center">
                                  <div className="w-full h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-300">—</span>
                                  </div>
                                </td>
                              );
                            }
                            const score = calculatePairFriction(rowMember.subtypeId, colMember.subtypeId);
                            const { category } = categorizeScore(score);
                            const style = categoryStyles[category];
                            const pairingKey = [rowMember.id, colMember.id].sort().join('-');

                            return (
                              <td key={colMember.id} className="p-2 text-center">
                                <button
                                  onClick={() => setExpandedPairing(expandedPairing === pairingKey ? null : pairingKey)}
                                  className={`w-full h-12 rounded-lg ${style.cellBg} border ${style.border} flex items-center justify-center hover:shadow-md transition-all cursor-pointer group`}
                                >
                                  <span className={`text-sm font-bold ${style.text} group-hover:scale-110 transition-transform`}>
                                    {score}
                                  </span>
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Detailed Pairings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Swords className="w-5 h-5 text-gray-600" />
              All Pairings — Ranked by Friction
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Click any pairing to expand details and access mediation resources.
            </p>

            <div className="space-y-3">
              {pairings.map((pairing) => {
                const pairingKey = [pairing.memberA.id, pairing.memberB.id].sort().join('-');
                const isExpanded = expandedPairing === pairingKey;
                const style = categoryStyles[pairing.category];
                const subtypeA = getSubtype(pairing.memberA.subtypeId);
                const subtypeB = getSubtype(pairing.memberB.subtypeId);
                const fullSubtypeA = allSubtypes.find(s => s.subtypeId === pairing.memberA.subtypeId);
                const fullSubtypeB = allSubtypes.find(s => s.subtypeId === pairing.memberB.subtypeId);

                return (
                  <div key={pairingKey} className={`rounded-xl border overflow-hidden transition-all ${style.border} ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}`}>
                    <button
                      onClick={() => setExpandedPairing(isExpanded ? null : pairingKey)}
                      className={`w-full p-4 flex items-center gap-4 ${style.bg} hover:opacity-90 transition-opacity`}
                    >
                      {/* Score Badge */}
                      <div className={`w-12 h-12 rounded-xl ${style.cellBg} border ${style.border} flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-lg font-bold ${style.text}`}>{pairing.frictionScore}</span>
                      </div>

                      {/* Names */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            {fullSubtypeA && (
                              <div className="w-5 h-5 rounded flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(135deg, ${fullSubtypeA.gradientFrom}, ${fullSubtypeA.gradientTo})` }}
                              >
                                {tinyElementIcons[fullSubtypeA.elementId]}
                              </div>
                            )}
                            <span className="text-sm font-semibold text-gray-800">{pairing.memberA.name}</span>
                          </div>
                          <Swords className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <div className="flex items-center gap-1.5">
                            {fullSubtypeB && (
                              <div className="w-5 h-5 rounded flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(135deg, ${fullSubtypeB.gradientFrom}, ${fullSubtypeB.gradientTo})` }}
                              >
                                {tinyElementIcons[fullSubtypeB.elementId]}
                              </div>
                            )}
                            <span className="text-sm font-semibold text-gray-800">{pairing.memberB.name}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">{pairing.description}</p>
                      </div>

                      {/* Category Badge */}
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text} border ${style.border} flex-shrink-0 hidden sm:block`}>
                        {pairing.categoryLabel}
                      </div>

                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="p-5 bg-white space-y-4 border-t border-gray-100">
                        {/* Response Interaction */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-gray-600" />
                            <span className="font-semibold text-sm text-gray-700">Response Interaction</span>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            {subtypeA && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                subtypeA.defaultResponse === 'fight' ? 'bg-red-100 text-red-700' :
                                subtypeA.defaultResponse === 'flight' ? 'bg-amber-100 text-amber-700' :
                                subtypeA.defaultResponse === 'freeze' ? 'bg-blue-100 text-blue-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}>
                                {responseLabels[subtypeA.defaultResponse].icon}
                                {pairing.memberA.name}: {responseLabels[subtypeA.defaultResponse].label}
                              </span>
                            )}
                            <ArrowRight className="w-3 h-3 text-gray-400" />
                            {subtypeB && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                subtypeB.defaultResponse === 'fight' ? 'bg-red-100 text-red-700' :
                                subtypeB.defaultResponse === 'flight' ? 'bg-amber-100 text-amber-700' :
                                subtypeB.defaultResponse === 'freeze' ? 'bg-blue-100 text-blue-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}>
                                {responseLabels[subtypeB.defaultResponse].icon}
                                {pairing.memberB.name}: {responseLabels[subtypeB.defaultResponse].label}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{pairing.responseInteraction}</p>
                        </div>

                        {/* Elemental Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {subtypeA && (
                            <div className="p-4 rounded-xl border border-gray-100" style={{ background: `linear-gradient(135deg, ${fullSubtypeA?.gradientFrom}08, ${fullSubtypeA?.gradientTo}08)` }}>
                              <div className="flex items-center gap-2 mb-2">
                                {fullSubtypeA && elementIcons[fullSubtypeA.elementId]}
                                <span className="text-sm font-semibold text-gray-800">{pairing.memberA.name}</span>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{subtypeA.subtype} — {subtypeA.conflictArchetype}</p>
                              <p className="text-xs text-gray-600 italic">Needs to hear: "{subtypeA.whatTheyNeedToHear.substring(1, 80)}..."</p>
                            </div>
                          )}
                          {subtypeB && (
                            <div className="p-4 rounded-xl border border-gray-100" style={{ background: `linear-gradient(135deg, ${fullSubtypeB?.gradientFrom}08, ${fullSubtypeB?.gradientTo}08)` }}>
                              <div className="flex items-center gap-2 mb-2">
                                {fullSubtypeB && elementIcons[fullSubtypeB.elementId]}
                                <span className="text-sm font-semibold text-gray-800">{pairing.memberB.name}</span>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{subtypeB.subtype} — {subtypeB.conflictArchetype}</p>
                              <p className="text-xs text-gray-600 italic">Needs to hear: "{subtypeB.whatTheyNeedToHear.substring(1, 80)}..."</p>
                            </div>
                          )}
                        </div>

                        {/* Mediation Guide Link */}
                        {pairing.mediationGuide ? (
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Scale className="w-4 h-4 text-indigo-600" />
                                <span className="text-sm font-semibold text-indigo-700">Pre-Built Mediation Guide Available</span>
                              </div>
                              {onNavigateToGuide && (
                                <button
                                  onClick={() => onNavigateToGuide(
                                    pairing.guideSwapped ? pairing.memberB.subtypeId : pairing.memberA.subtypeId,
                                    pairing.guideSwapped ? pairing.memberA.subtypeId : pairing.memberB.subtypeId
                                  )}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  Open in Simulator
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-indigo-600 mt-2 leading-relaxed">
                              {pairing.mediationGuide.frictionSource.substring(0, 150)}...
                            </p>
                          </div>
                        ) : (pairing.category === 'high-clash' || pairing.category === 'hidden-friction') ? (
                          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                              <span className="text-sm font-semibold text-amber-700">Dynamic Mediation Recommended</span>
                            </div>
                            <p className="text-xs text-amber-600 mt-2">
                              No pre-built guide exists for this exact pairing, but you can use the Conflict Simulator tab to generate a customized mediation guide for {subtypeA?.subtype} vs. {subtypeB?.subtype}.
                            </p>
                            {onNavigateToGuide && (
                              <button
                                onClick={() => onNavigateToGuide(pairing.memberA.subtypeId, pairing.memberB.subtypeId)}
                                className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors"
                              >
                                <Scale className="w-3 h-3" />
                                Open in Simulator
                              </button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Conflict Patterns */}
          {groupPatterns.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-gray-600" />
                Predicted Group Conflict Patterns
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Based on the composition of your group, these are the most likely conflict dynamics to emerge.
              </p>
              <div className="space-y-3">
                {groupPatterns.map((pattern, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50/80 rounded-xl border border-violet-100">
                    <div className="w-7 h-7 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{pattern}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conflict Protocol */}
          {conflictProtocol && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setShowProtocol(!showProtocol)}
                className="w-full p-6 md:p-8 flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold">{conflictProtocol.title}</h4>
                    <p className="text-white/60 text-sm">Customized conflict protocol for your group</p>
                  </div>
                </div>
                {showProtocol ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
              </button>

              {showProtocol && (
                <div className="p-6 md:p-8 space-y-6">
                  {/* Protocol Steps */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      When Conflict Arises — Follow These Steps
                    </h5>
                    <ol className="space-y-3">
                      {conflictProtocol.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-4 bg-indigo-50/80 rounded-xl border border-indigo-100">
                          <span className="w-7 h-7 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Principles */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Group Conflict Principles
                    </h5>
                    <div className="space-y-2">
                      {conflictProtocol.principles.map((principle, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 leading-relaxed">{principle}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning Signals */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      Warning Signals — Intervene When You See These
                    </h5>
                    <div className="space-y-2">
                      {conflictProtocol.warningSignals.map((signal, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-red-50/80 rounded-xl border border-red-100">
                          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 leading-relaxed">{signal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Share Guide Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowShareGuide(true)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">Share This Guide</div>
                <div className="text-xs text-white/60">Download, print, or send to your team, partner, or therapist</div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Share Guide Modal */}
      <TeamConflictShareGuide
        isOpen={showShareGuide}
        onClose={() => setShowShareGuide(false)}
        members={members}
        pairings={pairings}
        groupRiskScore={groupRiskScore}
        groupRiskLabel={groupRiskLabel}
        responseDistribution={responseDistribution}
        groupPatterns={groupPatterns}
        conflictProtocol={conflictProtocol}
      />
    </div>
  );
};

export default TeamConflictMap;
