import { buildAirSubtypeProfilePDF } from '@/lib/airSubtypeProfilePdfBuilder';
import { airFireProfile } from '@/data/airFireProfile';

export async function generateAirFireProfilePDF(): Promise<void> {
  await buildAirSubtypeProfilePDF(airFireProfile);
}
