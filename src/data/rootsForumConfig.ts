/**
 * Roots Forum – sacred spaces aligned with the 16 elemental subtype archetypes.
 *
 * Category id: roots-{primaryElement}-{secondaryElement}
 * e.g. roots-fire-earth → The Forged Iron (Fire + Earth).
 *
 * Legacy themed ids (roots-fire-hearth, etc.) map to the closest archetype so existing threads
 * still resolve labels and filters.
 */

import {
  ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES,
  ROOTS_SUBTYPE_IDS_BY_ELEMENT,
} from '@/data/elementalSubtypeArchetypes';

export interface RootsCategoryOption {
  id: string;
  label: string;
  shortLabel: string;
  element: 'fire' | 'water' | 'earth' | 'air';
  /** Quiz / profile subtype id (e.g. fire-earth) for matching user subtype. */
  subtypeId: string;
  gradient: string;
}

export type RootsSpaceKey = 'seed-vault' | 'greenhouse' | 'compost-corner' | 'harvest-table';

export interface RootsSpaceOption {
  key: RootsSpaceKey;
  label: string;
  prompt: string;
  gradient: string;
}

export const ROOTS_SPACE_OPTIONS: RootsSpaceOption[] = [
  {
    key: 'seed-vault',
    label: 'Seed Vault',
    prompt: 'How did your Roots nature first sprout?',
    gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
  },
  {
    key: 'greenhouse',
    label: 'Greenhouse',
    prompt: 'What are you cultivating this season?',
    gradient: 'linear-gradient(135deg, #059669, #34D399)',
  },
  {
    key: 'compost-corner',
    label: 'Compost Corner',
    prompt: 'What breakdowns have led to growth? (Anonymous option available.)',
    gradient: 'linear-gradient(135deg, #F59E0B, #F97316)',
  },
  {
    key: 'harvest-table',
    label: 'Harvest Table',
    prompt: 'What are you celebrating—what fruits have you grown in alignment?',
    gradient: 'linear-gradient(135deg, #DC2626, #F97316)',
  },
];

const ELEMENT_GRADIENT: Record<'fire' | 'water' | 'earth' | 'air', string[]> = {
  fire: [
    'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)',
    'linear-gradient(135deg, #1E3A5F, #2563EB, #93C5FD)',
    'linear-gradient(135deg, #B91C1C, #DC2626, #F97316)',
    'linear-gradient(135deg, #EA580C, #FBBF24, #FDE047)',
  ],
  water: [
    'linear-gradient(135deg, #1E40AF, #3B82F6, #93C5FD)',
    'linear-gradient(135deg, #4338CA, #6366F1, #A5B4FC)',
    'linear-gradient(135deg, #0E7490, #06B6D4, #67E8F9)',
    'linear-gradient(135deg, #134E4A, #0D9488, #5EEAD4)',
  ],
  earth: [
    'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)',
    'linear-gradient(135deg, #14532D, #166534, #4ADE80)',
    'linear-gradient(135deg, #92400E, #B45309, #D97706)',
    'linear-gradient(135deg, #A16207, #CA8A04, #FDE047)',
  ],
  air: [
    'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)',
    'linear-gradient(135deg, #4C1D95, #7C3AED, #C4B5FD)',
    'linear-gradient(135deg, #0E7490, #22D3EE, #E0F2FE)',
    'linear-gradient(135deg, #854D0E, #CA8A04, #FEF08A)',
  ],
};

function buildRootsCategories(): RootsCategoryOption[] {
  const out: RootsCategoryOption[] = [];
  (['fire', 'water', 'earth', 'air'] as const).forEach((element) => {
    const subtypes = ROOTS_SUBTYPE_IDS_BY_ELEMENT[element];
    const gradients = ELEMENT_GRADIENT[element];
    subtypes.forEach((subtypeId, i) => {
      const archetype = ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES[subtypeId];
      if (!archetype) return;
      const [, secondary] = subtypeId.split('-');
      const id = `roots-${element}-${secondary}`;
      const elementLabel = element.charAt(0).toUpperCase() + element.slice(1);
      out.push({
        id,
        subtypeId,
        label: `${elementLabel} – ${archetype}`,
        shortLabel: archetype,
        element,
        gradient: gradients[i] ?? ELEMENT_GRADIENT[element][0],
      });
    });
  });
  return out;
}

const ROOTS_CATEGORIES: RootsCategoryOption[] = buildRootsCategories();

/**
 * Previous themed “sacred space” ids → canonical archetype category id.
 * Keeps older threads labeled and filterable under the new subtype spaces.
 */
export const LEGACY_ROOTS_CATEGORY_TO_CANONICAL: Record<string, string> = {
  'roots-fire-hearth': 'roots-fire-fire',
  'roots-fire-forge': 'roots-fire-earth',
  'roots-fire-ember': 'roots-fire-air',
  'roots-water-well': 'roots-water-water',
  'roots-water-tide': 'roots-water-fire',
  'roots-water-mist': 'roots-water-air',
  'roots-earth-grove': 'roots-earth-earth',
  'roots-earth-stone': 'roots-earth-fire',
  'roots-earth-soil': 'roots-earth-water',
  'roots-air-summit': 'roots-air-air',
  'roots-air-breeze': 'roots-air-fire',
  'roots-air-cloud': 'roots-air-water',
};

const CANONICAL_ID_SET = new Set(ROOTS_CATEGORIES.map((c) => c.id));

/** Normalize any roots category string (legacy or current) to the canonical id. */
export function canonicalizeRootsCategoryId(categoryId: string): string {
  if (!categoryId.startsWith('roots-')) return categoryId;
  // Allow category formats like `roots-water-air-greenhouse` by canonicalizing only the root portion.
  const match = categoryId.match(/^roots-(\w+)-(\w+)/);
  if (!match) return categoryId;
  const rootId = `roots-${match[1]}-${match[2]}`;
  if (CANONICAL_ID_SET.has(rootId)) return rootId;
  return LEGACY_ROOTS_CATEGORY_TO_CANONICAL[rootId] ?? rootId;
}

/** Supabase filter: canonical id plus any legacy ids that resolve to it. */
export function getRootsCategoryIdsForQuery(canonicalOrLegacyId: string): string[] {
  const canonical = canonicalizeRootsCategoryId(canonicalOrLegacyId);
  const legacy = Object.entries(LEGACY_ROOTS_CATEGORY_TO_CANONICAL)
    .filter(([, c]) => c === canonical)
    .map(([old]) => old);
  const baseIds = [canonical, ...legacy].filter((id, i, a) => a.indexOf(id) === i);
  // Include former sacred-space suffixes so older threads still appear under the archetype.
  const withSpaces = baseIds.flatMap((id) => [
    id,
    ...ROOTS_SPACE_OPTIONS.map((s) => `${id}-${s.key}`),
  ]);
  return withSpaces.filter((id, i, a) => a.indexOf(id) === i);
}

export function getRootsForumCategoryDisplay(categoryId: string): {
  label: string;
  gradient: string;
} | null {
  const canonical = canonicalizeRootsCategoryId(categoryId);
  const opt = ROOTS_CATEGORIES.find((c) => c.id === canonical);
  if (!opt) return null;
  return { label: opt.label, gradient: opt.gradient };
}

export function getRootsSpaceDisplay(spaceKey: RootsSpaceKey): RootsSpaceOption {
  return ROOTS_SPACE_OPTIONS.find((s) => s.key === spaceKey) ?? ROOTS_SPACE_OPTIONS[0];
}

/** Build a Roots thread category id with sacred-space suffix. */
export function buildRootsThreadCategoryId(rootCategoryId: string, spaceKey: RootsSpaceKey): string {
  const rootCanonical = canonicalizeRootsCategoryId(rootCategoryId);
  return `${rootCanonical}-${spaceKey}`;
}

export function parseRootsThreadCategoryId(categoryId: string):
  | { rootCategoryId: string; spaceKey: RootsSpaceKey }
  | null {
  if (!categoryId.startsWith('roots-')) return null;

  // Legacy threads without suffix are treated as Seed Vault.
  const rootCanonical = canonicalizeRootsCategoryId(categoryId);
  const legacySpaceKey: RootsSpaceKey = 'seed-vault';

  // Try to find a matching sacred-space suffix.
  for (const space of ROOTS_SPACE_OPTIONS) {
    if (categoryId.endsWith(`-${space.key}`)) {
      return { rootCategoryId: rootCanonical, spaceKey: space.key };
    }
  }

  // If it's a valid roots-* category but no suffix, default to Seed Vault.
  const isValidRoot = CANONICAL_ID_SET.has(rootCanonical);
  if (isValidRoot) return { rootCategoryId: rootCanonical, spaceKey: legacySpaceKey };

  return null;
}

/** Return all Roots category options (all elements). */
export function getAllRootsCategoryOptions(): RootsCategoryOption[] {
  return ROOTS_CATEGORIES;
}

/** Return Roots categories filtered to a single element. */
export function getRootsCategoriesForElementFilter(
  element: 'fire' | 'water' | 'earth' | 'air',
): RootsCategoryOption[] {
  return ROOTS_CATEGORIES.filter((c) => c.element === element);
}

/** Parse a roots category id like "roots-fire-earth" into primary element and secondary element key. */
export function parseRootsCategoryId(
  categoryId: string,
): { element: string; space: string } | null {
  const canonical = canonicalizeRootsCategoryId(categoryId);
  const match = canonical.match(/^roots-(\w+)-(\w+)$/);
  if (!match) return null;
  return { element: match[1], space: match[2] };
}

/** Match user profile subtype (e.g. water-air) to a roots category id, if any. */
export function getRootsCategoryIdForSubtype(
  subtypeId: string | null | undefined,
): string | null {
  if (!subtypeId) return null;
  const parts = subtypeId.split('-');
  if (parts.length !== 2) return null;
  const [a, b] = parts;
  const id = `roots-${a}-${b}`;
  return CANONICAL_ID_SET.has(id) ? id : null;
}
