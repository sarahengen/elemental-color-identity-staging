import { buildEarthSubtypeProfilePDF } from '@/lib/earthSubtypeProfilePdfBuilder';
import { earthEarthProfile } from '@/data/earthEarthProfile';

export async function generateEarthEarthProfilePDF(): Promise<void> {
  await buildEarthSubtypeProfilePDF(earthEarthProfile);
}
