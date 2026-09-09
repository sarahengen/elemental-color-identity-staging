import { buildWaterSubtypeProfilePDF } from '@/lib/waterSubtypeProfilePdfBuilder';
import { waterEarthProfile } from '@/data/waterEarthProfile';

export async function generateWaterEarthProfilePDF(): Promise<void> {
  await buildWaterSubtypeProfilePDF(waterEarthProfile);
}
