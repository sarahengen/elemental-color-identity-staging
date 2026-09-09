/**
 * Shared visual-theme utilities used across all Elemental Guide components
 * to highlight the user's own element / subtype cards.
 */

/** Tailwind classes applied to a subtype card that matches the current user's subtype */
export const GUIDE_USER_SUBTYPE_CARD_CLASS =
  'border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 shadow-lg ring-1 ring-emerald-200/60';

/** Tailwind classes applied to the "Your Element" badge pill */
export const GUIDE_USER_ELEMENT_BADGE_CLASS =
  'px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-md';

/**
 * Returns a Tailwind class string for an element-level card when it matches the
 * signed-in user's primary element.
 *
 * @param isUserElement – whether the card's element matches the user's element
 */
export function guideUserElementCardClass(isUserElement: boolean): string {
  if (!isUserElement) return '';
  return 'ring-2 ring-emerald-300/70 shadow-emerald-100';
}
