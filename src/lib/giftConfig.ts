/**
 * Shared gift purchase configuration.
 *
 * GIFT_VALIDITY_MONTHS is the single source of truth for how long gift quiz
 * links and profile vouchers remain valid after purchase. It is referenced in
 * the Terms of Service (Section 4 — Purchases & Payments) and on the Gift
 * Membership purchase flow so the two never drift apart.
 */
export const GIFT_VALIDITY_MONTHS = 12;

/** Human-readable validity period, e.g. "12 months". */
export const GIFT_VALIDITY_LABEL = `${GIFT_VALIDITY_MONTHS} months`;
