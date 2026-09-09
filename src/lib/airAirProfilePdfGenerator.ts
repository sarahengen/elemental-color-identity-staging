import { buildAirSubtypeProfilePDF } from '@/lib/airSubtypeProfilePdfBuilder';
import { airAirProfile } from '@/data/airAirProfile';

export async function generateAirAirProfilePDF(): Promise<void> {
  await buildAirSubtypeProfilePDF(airAirProfile);
}
