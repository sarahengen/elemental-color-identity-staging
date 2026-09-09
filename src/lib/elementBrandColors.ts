/** Canonical four-element gradients (forum, guides, marketing). */
export const ELEMENT_GRADIENT = {
  fire: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)',
  water: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)',
  earth: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)',
  air: 'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)',
} as const;

export type ElementId = keyof typeof ELEMENT_GRADIENT;
