/** Profile fields used to determine Elemental Color Workshop access. */
export type WorkshopAccessProfile = {
  membership_tier?: string | null;
  workshop_unlocked?: boolean | null;
} | null;

const PREMIUM_TIERS = new Set([
  'discovery',
  'expression',
  'premium',
  'professional',
  'pro',
]);

/**
 * Expression-level access: workshop-tier content (Four Elements deep dive,
 * all subtypes, expression guide library, and all Roots spaces).
 *
 * Granted to premium/expression members or anyone with the one-time workshop
 * purchase flag (`workshop_unlocked`). Profile-only buyers do not get this.
 */
export function hasWorkshopAccess(profile: WorkshopAccessProfile): boolean {
  if (!profile) return false;
  const tier = profile.membership_tier?.toLowerCase();
  if (tier && PREMIUM_TIERS.has(tier)) return true;
  return profile.workshop_unlocked === true;
}

/** One-time Elemental Color Workshop price (USD); configurable via env. */
export function getWorkshopPriceUsd(): number {
  const raw = import.meta.env.VITE_WORKSHOP_PRICE_USD;
  const parsed = raw ? Number.parseFloat(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 149;
}
