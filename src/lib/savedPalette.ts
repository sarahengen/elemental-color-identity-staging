import { ColorSwatch } from '@/data/elementalTypes';

// A single color saved by the user to their personal palette.
export interface SavedPaletteColor {
  id: string;            // stable unique id (element + subtype + hex)
  name: string;
  hex: string;
  category: string;      // primary | secondary | accent | neutral
  elementId: string;
  subtypeId?: string | null;
  elementName?: string;
  subtypeName?: string;
  savedAt: string;       // ISO timestamp
}

const STORAGE_KEY = 'savedPaletteColors';

// Build a stable id for a saved color so duplicates can be detected.
export const buildPaletteColorId = (
  elementId: string,
  subtypeId: string | null | undefined,
  hex: string
): string => `${elementId}::${subtypeId || 'main'}::${hex.toLowerCase()}`;

export const makeSavedPaletteColor = (
  color: ColorSwatch,
  meta: { elementId: string; subtypeId?: string | null; elementName?: string; subtypeName?: string }
): SavedPaletteColor => ({
  id: buildPaletteColorId(meta.elementId, meta.subtypeId, color.hex),
  name: color.name,
  hex: color.hex,
  category: color.category,
  elementId: meta.elementId,
  subtypeId: meta.subtypeId ?? null,
  elementName: meta.elementName,
  subtypeName: meta.subtypeName,
  savedAt: new Date().toISOString(),
});

export const readLocalPalette = (): SavedPaletteColor[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const writeLocalPalette = (colors: SavedPaletteColor[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
};
