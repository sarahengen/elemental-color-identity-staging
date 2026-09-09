// Friend Group: Finding Your Common Element
// Single source of truth for the four elemental friend-group profiles and the
// group composition analyzer used by the Relationships guide section.

import { friendshipProfiles } from '@/data/friendshipCompatibilityData';

export interface FriendGroupQuality {
  label: string;
  description: string;
}

export interface FriendGroupProfile {
  elementId: 'fire' | 'water' | 'earth' | 'air';
  elementName: string;
  groupName: string;
  tagline: string;
  coreQualities: FriendGroupQuality[];
  activities: string[];
  thrive: string[];
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  soft: string;
  border: string;
}

export const friendGroupProfiles: FriendGroupProfile[] = [
  {
    elementId: 'fire',
    elementName: 'Fire',
    groupName: 'The Fire Keepers',
    tagline: 'Where ideas ignite and action follows.',
    coreQualities: [
      { label: 'Courageous', description: 'You push each other to take risks' },
      { label: 'Passionate', description: 'You bring energy and enthusiasm' },
      { label: 'Catalytic', description: 'You spark new ideas and adventures' },
      { label: 'Direct', description: 'You speak the truth to each other' },
      { label: 'Transformative', description: 'You help each other grow and evolve' },
    ],
    activities: [
      'Adventure sports',
      'Creative collaborations',
      'Debate nights',
      'Cooking competitions',
      'Vision boards',
      'Impromptu road trips',
    ],
    thrive: [
      'Be honest with each other',
      'Keep things exciting',
      'Lift each other up',
      'Give each other time to shine',
      'Come back together after flare ups',
      'Keep the connection burning',
    ],
    gradientFrom: '#C41E3A',
    gradientTo: '#F97316',
    accent: '#C41E3A',
    soft: 'from-rose-50 via-orange-50 to-amber-50',
    border: 'border-rose-200',
  },
  {
    elementId: 'water',
    elementName: 'Water',
    groupName: 'The Deep Souls',
    tagline: 'Where emotions are held and hearts are known.',
    coreQualities: [
      { label: 'Intuitive', description: 'You understand each other without words' },
      { label: 'Empathetic', description: "You feel each other's joys and sorrows deeply" },
      { label: 'Deeply Connected', description: 'Your bonds run beneath the surface' },
      { label: 'Supportive', description: 'You are a safe harbor for each other' },
      { label: 'Authentic', description: 'You show up as your real selves—no masks' },
    ],
    activities: [
      'Deep Conversations',
      'Cooking Together',
      'Book Clubs',
      'Moonlit Walks',
      'Journaling Circles',
      'Sound Baths',
    ],
    thrive: [
      'Keep it real',
      'Be present and not judge',
      'Share and be vulnerable',
      'Be attentive and kind',
      'Create a safe space',
      'Nurture the bond',
    ],
    gradientFrom: '#6B8BA4',
    gradientTo: '#38BDF8',
    accent: '#4A7B9D',
    soft: 'from-sky-50 via-blue-50 to-indigo-50',
    border: 'border-sky-200',
  },
  {
    elementId: 'earth',
    elementName: 'Earth',
    groupName: 'The Foundations',
    tagline: 'Where foundations are built and lives are sustained.',
    coreQualities: [
      { label: 'Consistency', description: 'You show up for each other, again and again' },
      { label: 'Grounded', description: 'You keep each other steady in a chaotic world' },
      { label: 'Practical', description: 'You help each other with real, tangible needs' },
      { label: 'Loyal', description: 'You are in it for the long haul' },
      { label: 'Abundant', description: 'You share what you have generously' },
    ],
    activities: [
      'Always Active',
      'Gardening',
      'Home Improvement',
      'Cooking Feasts',
      'Spa Days',
      'Practical help & advice',
      'Long Walks in Nature',
    ],
    thrive: [
      'Stay accountable',
      'Share the workload',
      'Share the bounty',
      'Listen Without Fixing',
      'Regular Contact',
      'Appreciate and Acknowledge',
    ],
    gradientFrom: '#8B4513',
    gradientTo: '#65A30D',
    accent: '#7C5A2A',
    soft: 'from-amber-50 via-lime-50 to-emerald-50',
    border: 'border-amber-200',
  },
  {
    elementId: 'air',
    elementName: 'Air',
    groupName: 'Idea Dancers',
    tagline: 'Where ideas dance and possibilities expand.',
    coreQualities: [
      { label: 'Curious', description: 'You are always exploring and learning together' },
      { label: 'Intellectually Stimulating', description: "You challenge each other's thinking" },
      { label: 'Playful', description: 'You laugh, joke, and keep things light' },
      { label: 'Connective', description: 'You introduce each other to new ideas, people, and perspectives' },
      { label: 'Expansive', description: 'You help each other see the bigger picture' },
    ],
    activities: [
      'Book Clubs - inspirational',
      'Creative Workshops',
      'Museum Trips',
      'Game Nights',
      '"What If" Dinners',
      'Trying New Things',
    ],
    thrive: [
      'Keep it interesting',
      'Fun matters',
      'Keep it fresh',
      'Space for Detours',
      'Space to breathe',
      'Stay engaged',
    ],
    gradientFrom: '#00CED1',
    gradientTo: '#818CF8',
    accent: '#0E9AA7',
    soft: 'from-cyan-50 via-teal-50 to-indigo-50',
    border: 'border-cyan-200',
  },
];

/** Canonical dot/bar colors for the four elements used across the friend group guide + share card. */
export const FRIEND_GROUP_ELEMENT_COLOR: Record<string, string> = {
  fire: '#C41E3A',
  water: '#6B8BA4',
  earth: '#8B4513',
  air: '#00CED1',
};

/** Inline SVG path data for each element icon (used in the share card canvas render). */
export const FRIEND_GROUP_ELEMENT_ICON_PATHS: Record<string, string[]> = {
  fire: [
    'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  ],
  water: ['M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'],
  earth: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  air: [
    'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2',
    'M9.6 4.6A2 2 0 1 1 11 8H2',
    'M12.6 19.4A2 2 0 1 0 14 16H2',
  ],
};

export const getFriendGroupProfile = (elementId: string): FriendGroupProfile | undefined =>
  friendGroupProfiles.find(p => p.elementId === elementId);


/** All 16 subtypes, derived from the friendship compatibility source of truth. */
export interface FriendGroupSubtypeOption {
  subtypeId: string;
  subtypeName: string;
  archetypeName: string;
  elementId: string;
}

export const friendGroupSubtypeOptions: FriendGroupSubtypeOption[] = friendshipProfiles.map(p => ({
  subtypeId: p.subtypeId,
  subtypeName: p.subtypeName,
  archetypeName: p.archetypeName,
  elementId: p.elementId,
}));

export const FRIEND_GROUP_MAX_MEMBERS = 6;

export interface FriendGroupMember {
  id: string;
  name: string;
  subtypeId: string;
  subtypeName: string;
  archetypeName: string;
  elementId: string;
  /** Secondary/influencing element derived from the subtype id (e.g. fire-water -> water). */
  secondaryElementId: string;
}

export interface FriendGroupAnalysis {
  /** Most recurring primary element across the group. */
  commonElement: FriendGroupProfile;
  /** Primary element counts. */
  counts: Record<string, number>;
  /** Counts including secondary/influencing elements (used only for tie-breaks). */
  weightedCounts: Record<string, number>;
  /** Elements not represented as a primary element in the group. */
  missingElements: string[];
  /** True when more than one element shares the top count. */
  wasTie: boolean;
  tiedElements: string[];
  /** Percentage of the group carrying the common element as primary. */
  dominancePercent: number;
  /** Short human summary of how the common element was found. */
  summary: string;
}

const ELEMENT_ORDER = ['fire', 'water', 'earth', 'air'] as const;

export function buildFriendGroupMember(
  option: FriendGroupSubtypeOption,
  name: string,
  id: string
): FriendGroupMember {
  const parts = option.subtypeId.split('-');
  return {
    id,
    name,
    subtypeId: option.subtypeId,
    subtypeName: option.subtypeName,
    archetypeName: option.archetypeName,
    elementId: option.elementId,
    secondaryElementId: parts[1] || option.elementId,
  };
}

/**
 * Finds the most recurring element among the group's subtypes.
 * Ties are broken by the secondary (influencing) element counts, then by
 * elemental order as a final fallback so the result is always deterministic.
 */
export function analyzeFriendGroup(members: FriendGroupMember[]): FriendGroupAnalysis | null {
  if (members.length < 2) return null;

  const counts: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };
  const weightedCounts: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };

  members.forEach(m => {
    counts[m.elementId] = (counts[m.elementId] || 0) + 1;
    weightedCounts[m.elementId] = (weightedCounts[m.elementId] || 0) + 2;
    weightedCounts[m.secondaryElementId] = (weightedCounts[m.secondaryElementId] || 0) + 1;
  });

  const topCount = Math.max(...ELEMENT_ORDER.map(e => counts[e]));
  const tiedElements = ELEMENT_ORDER.filter(e => counts[e] === topCount);

  let winner = tiedElements[0] as string;
  if (tiedElements.length > 1) {
    const topWeighted = Math.max(...tiedElements.map(e => weightedCounts[e]));
    winner = (tiedElements.find(e => weightedCounts[e] === topWeighted) || tiedElements[0]) as string;
  }

  const profile = getFriendGroupProfile(winner) || friendGroupProfiles[0];
  const missingElements = ELEMENT_ORDER.filter(e => counts[e] === 0);
  const dominancePercent = Math.round((counts[winner] / members.length) * 100);

  const summary =
    tiedElements.length > 1
      ? `${tiedElements
          .map(e => e.charAt(0).toUpperCase() + e.slice(1))
          .join(' and ')} appear equally often as primary elements. The influencing (secondary) elements in your group tip the balance toward ${profile.elementName}.`
      : `${profile.elementName} is the most recurring element in your group — ${counts[winner]} of ${members.length} ${
          counts[winner] === 1 ? 'friend carries' : 'friends carry'
        } it as their primary element (${dominancePercent}%).`;

  return {
    commonElement: profile,
    counts,
    weightedCounts,
    missingElements: [...missingElements],
    wasTie: tiedElements.length > 1,
    tiedElements: [...tiedElements],
    dominancePercent,
    summary,
  };
}
