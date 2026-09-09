/**
 * Maps quiz subtype ids → private Storage object names
 * (bucket: `profile-pdfs`, files in `private-assets/profile-pdfs` for upload).
 * Kept in sync with confirm-profile-purchase / send-profile-pdf-email.
 */
export const SUBTYPE_PROFILE_PDF_FILES: Record<string, string> = {
  'fire-fire': 'fire-fire-electric-arc-profile-org.pdf',
  'fire-water': 'fire-water-blue-flame-profile-org.pdf',
  'fire-earth': 'fire-earth-forged-iron-profile-org.pdf',
  'fire-air': 'fire-air-illuminating-spark-profile-org.pdf',
  'earth-earth': 'earth-earth-forest-floor-profile-org.pdf',
  'earth-fire': 'earth-fire-mountain-stone-profile-org.pdf',
  'earth-water': 'earth-water-velvet-moss-profile-org.pdf',
  'earth-air': 'earth-air-golden-harvest-profile-org.pdf',
  'water-water': 'water-water-forest-lake-profile-org.pdf',
  'water-air': 'water-air-misty-shore-profile-org.pdf',
  'water-fire': 'water-fire-sun-dappled-pond-profile-org.pdf',
  'water-earth': 'water-earth-languid-river-profile-org.pdf',
  'air-air': 'air-air-clear-morning-sky-profile-org.pdf',
  'air-water': 'air-water-first-whisper-profile-org.pdf',
  'air-fire': 'air-fire-playful-breeze-profile-org.pdf',
  'air-earth': 'air-earth-gilded-zephyr-profile-org.pdf',
};

export const PROFILE_PDF_STORAGE_BUCKET = 'profile-pdfs';

export function getSubtypeProfilePdfFileName(subtypeId: string): string | null {
  return SUBTYPE_PROFILE_PDF_FILES[subtypeId] ?? null;
}
