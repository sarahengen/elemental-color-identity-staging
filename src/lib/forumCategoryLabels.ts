/**
 * Resolves a forum thread's `category` string into a human-readable label
 * and a CSS gradient used for the category badge.
 */

import { getRootsForumCategoryDisplay, parseRootsThreadCategoryId } from '@/data/rootsForumConfig';

interface CategoryDisplay {
  label: string;
  gradient: string;
}

const CATEGORY_MAP: Record<string, CategoryDisplay> = {
  general:          { label: 'General',          gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
  results:          { label: 'Share Results',    gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  'color-matching': { label: 'Color Matching',   gradient: 'linear-gradient(135deg, #DB2777, #F472B6)' },
  'outfit-feedback':{ label: 'Outfit Feedback',  gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
  tips:             { label: 'Tips & Tricks',    gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  questions:        { label: 'Questions',        gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
};

/** Roots: archetype labels from config; fallback for unknown roots-* ids. */
function rootsLabel(category: string): CategoryDisplay {
  const resolved = getRootsForumCategoryDisplay(category);
  if (resolved) return resolved;

  const parsed = parseRootsThreadCategoryId(category);
  if (parsed) {
    const rootDisp = getRootsForumCategoryDisplay(parsed.rootCategoryId);
    if (rootDisp) return rootDisp;
  }

  const parts = category.replace('roots-', '').split('-');
  const element = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Roots';
  const secondary = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';

  const elementGradients: Record<string, string> = {
    fire:  'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)',
    water: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)',
    earth: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)',
    air:   'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)',
  };

  return {
    label: secondary ? `${element} – ${secondary}` : element,
    gradient: elementGradients[parts[0]] || 'linear-gradient(135deg, #065F46, #10B981)',
  };
}

export function getForumCategoryDisplay(category: string): CategoryDisplay {
  if (category.startsWith('roots-')) return rootsLabel(category);
  return CATEGORY_MAP[category] || { label: category, gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' };
}
