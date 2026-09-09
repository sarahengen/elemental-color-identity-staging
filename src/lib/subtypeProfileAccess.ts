/** Profile fields used to determine full subtype profile access. */
export type SubtypeProfileAccessProfile = {
  membership_tier?: string | null;
  subtype_profile_unlocked?: boolean | null;
  workshop_unlocked?: boolean | null;
  elemental_type?: string | null;
  elemental_subtype?: string | null;
} | null;

const PREMIUM_TIERS = new Set([
  'discovery',
  'expression',
  'premium',
  'professional',
  'pro',
]);

/**
 * Discovery-level access: membership tiers, one-time subtype profile purchase,
 * or workshop. Includes subtype page, Color Tools, and Roots forum.
 * Workshop / Expression is the higher tier and also passes this check.
 */
export function hasSubtypeProfileAccess(profile: SubtypeProfileAccessProfile): boolean {
  if (!profile) return false;
  const tier = profile.membership_tier?.toLowerCase();
  if (tier && PREMIUM_TIERS.has(tier)) return true;
  if (profile.workshop_unlocked === true) return true;
  return profile.subtype_profile_unlocked === true;
}

export type SubtypeGuideAccessContext = {
  profile: SubtypeProfileAccessProfile;
  userElement?: string | null;
  userSubtype?: string | null;
  typeId: string;
  subtypeId?: string | null;
};

/**
 * Workshop / legacy premium: guides on any subtype.
 * Profile-only purchase: guides on the user's own subtype page only.
 */
export function canViewSubtypeGuides(ctx: SubtypeGuideAccessContext): boolean {
  if (!ctx.profile) return false;
  const tier = ctx.profile.membership_tier?.toLowerCase();
  if (tier && PREMIUM_TIERS.has(tier)) return true;
  if (ctx.profile.workshop_unlocked === true) return true;
  if (!ctx.profile.subtype_profile_unlocked || !ctx.subtypeId) return false;
  return ctx.userElement === ctx.typeId && ctx.userSubtype === ctx.subtypeId;
}

/** Whether a subtype detail page may be opened (same rules as guides). */
export function canAccessSubtypeDetail(ctx: SubtypeGuideAccessContext): boolean {
  return canViewSubtypeGuides({ ...ctx, subtypeId: ctx.subtypeId ?? undefined });
}

export function getSubtypeProfilePriceUsd(): number {
  const raw = import.meta.env.VITE_SUBTYPE_PROFILE_PRICE_USD;
  const parsed = raw ? Number.parseFloat(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 49;
}
