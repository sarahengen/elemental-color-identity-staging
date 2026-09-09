import type { GuideCategorySlug } from '@/lib/guideCategoryRoutes';
import type { PageAnchorNavItem } from '@/components/PageAnchorNav';

/** Anchor pills shown at the top of each guide category page. */
export const GUIDE_CATEGORY_ANCHORS: Record<GuideCategorySlug, PageAnchorNavItem[]> = {
  style: [
    { id: 'hair-color', label: 'Hair Color' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'wardrobe-review', label: 'Wardrobe Review' },
    { id: 'makeup', label: 'Makeup' },
    { id: 'nails', label: 'Nail Color' },
  ],
  philosophy: [
    { id: 'spiritual-essence', label: 'Essence' },
    { id: 'philosophies', label: 'Philosophy' },
    { id: 'compass', label: 'Compass' },
    { id: 'mantras', label: 'Mantras' },
    { id: 'blessings', label: 'Blessings' },
    { id: 'ultimate-goal', label: 'Ultimate Goal' },
    { id: 'life-purpose', label: 'Life Purpose' },
  ],
  career: [
    { id: 'careers', label: 'Career' },
    { id: 'work-environment', label: 'Work Environment' },
    { id: 'secret-sauce', label: 'Secret Sauce' },
    { id: 'leadership-styles', label: 'Leadership' },
    { id: 'team-dynamics', label: 'Team Dynamics' },
    { id: 'communication-styles', label: 'Communication' },
    { id: 'conflict-styles', label: 'Conflict Style' },
  ],
  growth: [
    { id: 'resolutions', label: 'Resolutions' },
    { id: 'lesson', label: 'Lesson' },
    { id: 'blocks', label: 'Blocks' },
    { id: 'imbalance', label: 'Imbalance' },
    { id: 'healing', label: 'Healing' },
    { id: 'biorhythms', label: 'Biorhythms' },
  ],
  living: [
    { id: 'decor', label: 'Decor' },
    { id: 'habitat', label: 'Habitat' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'nutrition', label: 'Nutrition' },
  ],
  relationships: [
    { id: 'love-languages', label: 'Love Languages' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'friendship-compatibility', label: 'Friendship' },
    { id: 'friend-group', label: 'Friend Group' },
  ],

  arts: [
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'artistic-correspondence', label: 'Art & Creativity' },
  ],
};
