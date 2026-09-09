import { buildWaterSubtypeProfilePDF } from '@/lib/waterSubtypeProfilePdfBuilder';
import { waterWaterProfile } from '@/data/waterWaterProfile';

export async function generateWaterWaterProfilePDF(): Promise<void> {
  await buildWaterSubtypeProfilePDF(waterWaterProfile);
}
