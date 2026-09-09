import { buildEarthSubtypeProfilePDF } from '@/lib/earthSubtypeProfilePdfBuilder';
import { earthAirProfile } from '@/data/earthAirProfile';

export async function generateEarthAirProfilePDF(): Promise<void> {
  await buildEarthSubtypeProfilePDF(earthAirProfile);
}
