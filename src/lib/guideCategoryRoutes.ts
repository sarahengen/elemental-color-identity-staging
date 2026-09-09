export const GUIDE_CATEGORY_SLUGS = [
  'style',
  'philosophy',
  'career',
  'growth',
  'living',
  'relationships',
  'arts',
] as const;

export type GuideCategorySlug = (typeof GUIDE_CATEGORY_SLUGS)[number];

export function isGuideCategorySlug(value: string): value is GuideCategorySlug {
  return (GUIDE_CATEGORY_SLUGS as readonly string[]).includes(value);
}

/** Individual guide section ids grouped by their pillar category. */
const CATEGORY_SECTIONS: Record<GuideCategorySlug, string[]> = {
  style: ['hair-color', 'jewelry', 'wardrobe-review', 'makeup', 'nails'],
  philosophy: [
    'spiritual-essence',
    'philosophies',
    'compass',
    'mantras',
    'blessings',
    'ultimate-goal',
    'life-purpose',
  ],
  career: [
    'careers',
    'work-environment',
    'secret-sauce',
    'leadership-styles',
    'team-dynamics',
    'communication-styles',
    'conflict-styles',
  ],
  growth: ['resolutions', 'lesson', 'blocks', 'imbalance', 'healing', 'biorhythms'],
  living: ['decor', 'habitat', 'hobbies', 'nutrition'],
  relationships: ['love-languages', 'relationships', 'friendship-compatibility', 'friend-group'],

  arts: ['cinematic', 'artistic-correspondence'],
};

/** Gallery page section ids. */
const GALLERY_SECTION_IDS = [
  'dominant-element',
  'celebrities',
  'compare',
  'color-palette',
  'color-wheel',
] as const;

export function isGallerySectionId(section: string): boolean {
  return (GALLERY_SECTION_IDS as readonly string[]).includes(section);
}

/** Build a path to a guide category page, optionally anchored to a section. */
export function guideCategoryPath(slug: GuideCategorySlug, section?: string): string {
  return section ? `/guides/${slug}#${section}` : `/guides/${slug}`;
}

/** Build a path to the elemental gallery page, optionally anchored to a section. */
export function elementalGalleryPath(section?: string): string {
  return section ? `/elemental-gallery#${section}` : '/elemental-gallery';
}

/** Map an individual guide section id to its pillar category slug. */
export function categoryForGuideSection(section: string): GuideCategorySlug | null {
  for (const slug of GUIDE_CATEGORY_SLUGS) {
    if (CATEGORY_SECTIONS[slug].includes(section)) return slug;
  }
  return null;
}

/** Resolve a quick-nav id that targets a whole pillar (e.g. "guides-style", "style"). */
export function guideSlugFromQuickNavId(section: string): GuideCategorySlug | null {
  const normalized = section.startsWith('guides-') ? section.slice('guides-'.length) : section;
  return isGuideCategorySlug(normalized) ? normalized : null;
}

export const GALLERY_PAGE_ANCHORS: { id: string; label: string }[] = [
  { id: 'dominant-element', label: 'Dominant Element' },
  { id: 'celebrities', label: 'Famous Faces' },
  { id: 'compare', label: 'Compare Types' },
  { id: 'color-palette', label: 'Color Palette' },
  { id: 'color-wheel', label: 'Color Compass' },
];
