import { buildWaterSubtypeProfilePDF } from '@/lib/waterSubtypeProfilePdfBuilder';
import { waterFireProfile } from '@/data/waterFireProfile';

export async function generateWaterFireProfilePDF(): Promise<void> {
  await buildWaterSubtypeProfilePDF(waterFireProfile);
}
