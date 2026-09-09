import { getViteEnv } from '@/lib/env';

/**
 * Site launch phases (client rebrand / funnel rollout).
 *
 * - entry:    Public nav — homepage funnel, elemental types, forum, color tools, about/contact/press.
 *             Guides, blog, book hidden from discovery.
 * - workshop: Unlocks Elements page, guides, gallery (Expression-tier content).
 * - full:     Legacy complete nav (pre-rebrand behavior).
 *
 * Set VITE_LAUNCH_PHASE=workshop|full in .env to override. Defaults to entry.
 */
export type LaunchPhase = 'entry' | 'workshop' | 'full';

export function getLaunchPhase(): LaunchPhase {
  const raw = getViteEnv('VITE_LAUNCH_PHASE')?.toLowerCase();
  if (raw === 'workshop' || raw === 'full') return raw;
  return 'entry';
}

export function isEntryLaunch(): boolean {
  return getLaunchPhase() === 'entry';
}

export function isWorkshopLaunch(): boolean {
  return getLaunchPhase() === 'workshop';
}

export function isFullLaunch(): boolean {
  return getLaunchPhase() === 'full';
}

/** Section ids shown in header/footer during entry launch. */
export const ENTRY_PUBLIC_NAV_IDS = [
  'home',
  'types',
  'elemental-workshop',
  'community',
  'color-tools',
  'about',
  'contact',
  'press',
] as const;

export type EntryPublicNavId = (typeof ENTRY_PUBLIC_NAV_IDS)[number];

const ENTRY_HIDDEN_SECTION_IDS = new Set<string>([
  // Hidden pages (client brief)
  'blog',
  'book',
  'pro-guides',
  'elemental-gallery',
  'membership',
  // Legacy nav / funnel noise
  'consultations',
  'classes',
  'analyzer',
  // Discovery dropdown
  'hair-color',
  'decor',
  'jewelry',
  'celebrities',
  'compare',
  'dominant-element',
  // Expression dropdown + guide hub sections
  'spiritual-essence',
  'philosophies',
  'compass',
  'mantras',
  'artistic-correspondence',
  'cinematic',
  'wardrobe-review',
  'incantations',
  'resolutions',
  'blessings',
  'ultimate-goal',
  'life-purpose',
  'careers',
  'work-environment',
  'secret-sauce',
  'leadership-styles',
  'team-dynamics',
  'communication-styles',
  'conflict-styles',
  'lesson',
  'blocks',
  'imbalance',
  'healing',
  'biorhythms',
  'habitat',
  'hobbies',
  'nutrition',
  'love-languages',
  'relationships',
  'friendship-compatibility',
  'friend-group',

  'nav-guide-style',
  'nav-guide-philosophy',
  'nav-guide-career',
  'nav-guide-growth',
  'nav-guide-living',
  'nav-guide-relationships',
  'nav-guide-arts',
]);

/** True when this section should not appear in public nav / quick nav during entry launch. */
export function isHiddenInEntryPhase(sectionId: string): boolean {
  if (!isEntryLaunch()) return false;
  if ((ENTRY_PUBLIC_NAV_IDS as readonly string[]).includes(sectionId)) return false;
  return ENTRY_HIDDEN_SECTION_IDS.has(sectionId) || sectionId.startsWith('nav-guide-');
}

/** Block detached routes (guides, gallery) when browsing in entry phase. Admin/dev can use full phase. */
export function isDetachedRouteBlockedInEntry(sectionId: string): boolean {
  if (!isEntryLaunch()) return false;
  if (
    sectionId === 'community' ||
    sectionId === 'press' ||
    sectionId === 'color-tools' ||
    sectionId === 'types' ||
    sectionId === 'elemental-types' ||
    sectionId === 'elemental-workshop'
  ) {
    return false;
  }
  return isHiddenInEntryPhase(sectionId);
}

/** Quick nav section ids for entry launch (homepage + tools + forum). */
export const ENTRY_QUICK_NAV_IDS = [
  'home',
  'types',
  'color-tools',
  'color-wheel',
  'analyzer',
  'wardrobe',
  'color-palette',
  'community',
] as const;

export function isQuickNavSectionVisible(sectionId: string): boolean {
  if (isFullLaunch()) return true;
  if (isWorkshopLaunch()) {
    if (sectionId === 'blog' || sectionId === 'book') return false;
    return true;
  }
  return (ENTRY_QUICK_NAV_IDS as readonly string[]).includes(sectionId);
}
