import { buildAirSubtypeProfilePDF } from '@/lib/airSubtypeProfilePdfBuilder';
import { airWaterProfile } from '@/data/airWaterProfile';

export async function generateAirWaterProfilePDF(): Promise<void> {
  await buildAirSubtypeProfilePDF(airWaterProfile);
}
