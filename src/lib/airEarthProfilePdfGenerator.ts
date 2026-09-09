import { buildAirSubtypeProfilePDF } from '@/lib/airSubtypeProfilePdfBuilder';
import { airEarthProfile } from '@/data/airEarthProfile';

export async function generateAirEarthProfilePDF(): Promise<void> {
  await buildAirSubtypeProfilePDF(airEarthProfile);
}
