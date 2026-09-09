import { buildEarthSubtypeProfilePDF } from '@/lib/earthSubtypeProfilePdfBuilder';
import { earthFireProfile } from '@/data/earthFireProfile';

export async function generateEarthFireProfilePDF(): Promise<void> {
  await buildEarthSubtypeProfilePDF(earthFireProfile);
}
