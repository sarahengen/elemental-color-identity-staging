/**
 * Canonical display names for the 16 elemental subtypes (quiz / profile IDs like fire-fire, water-air).
 * Single source for Roots Forum sacred spaces and UI that references archetypes by subtype id.
 */
export const ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES: Record<string, string> = {
  'fire-fire': 'The Electric Arc',
  'fire-water': 'The Blue Flame',
  'fire-earth': 'The Forged Iron',
  'fire-air': 'The Illuminating Spark',

  'earth-earth': 'The Forest Floor',
  'earth-fire': 'The Mountain Stone',
  'earth-water': 'The Velvet Moss',
  'earth-air': 'The Golden Harvest',

  'water-water': 'The Forest Lake',
  'water-air': 'The Misty Shore',
  'water-fire': 'The Sun-Dappled Pond',
  'water-earth': 'The Languid River',

  'air-air': 'The Clear Morning Sky',
  'air-water': 'The First Whisper',
  'air-fire': 'The Playful Breeze',
  'air-earth': 'The Gilded Zephyr',
};

export const ROOTS_SUBTYPE_IDS_BY_ELEMENT: Record<
  'fire' | 'water' | 'earth' | 'air',
  string[]
> = {
  fire: ['fire-fire', 'fire-water', 'fire-earth', 'fire-air'],
  water: ['water-water', 'water-air', 'water-fire', 'water-earth'],
  earth: ['earth-earth', 'earth-water', 'earth-fire', 'earth-air'],
  air: ['air-air', 'air-water', 'air-fire', 'air-earth'],
};
