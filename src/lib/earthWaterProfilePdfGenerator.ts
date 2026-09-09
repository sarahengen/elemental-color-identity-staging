import { buildEarthSubtypeProfilePDF } from '@/lib/earthSubtypeProfilePdfBuilder';
import { earthWaterProfile } from '@/data/earthWaterProfile';

export async function generateEarthWaterProfilePDF(): Promise<void> {
  await buildEarthSubtypeProfilePDF(earthWaterProfile);
}
