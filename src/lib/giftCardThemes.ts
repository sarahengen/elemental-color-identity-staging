/** Gift card themes aligned with elementalTypes.ts primary palettes. */

export interface GiftCardThemeColors {
  gradient: string;
  accent: string;
  bg: string;
  pattern: string;
  /** Use dark body text when the card background is light (e.g. Air / Spring). */
  lightBackground?: boolean;
}

export const giftCardElementColors: Record<string, GiftCardThemeColors> = {
  fire: {
    gradient: 'from-[#C41E3A] via-[#FF1493] to-[#4169E1]',
    accent: '#C41E3A',
    bg: 'from-[#0A0A0A] via-[#8B1538] to-[#4A0E4E]',
    pattern:
      'radial-gradient(circle at 20% 80%, rgba(196,30,58,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,20,147,0.15) 0%, transparent 50%)',
  },
  water: {
    gradient: 'from-[#6B8BA4] via-[#B4A7D6] to-[#D4A5A5]',
    accent: '#6B8BA4',
    bg: 'from-[#4A667A] via-[#6B8BA4] to-[#8E7B8B]',
    pattern:
      'radial-gradient(circle at 30% 70%, rgba(107,139,164,0.35) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(212,165,165,0.25) 0%, transparent 50%)',
  },
  earth: {
    gradient: 'from-[#CC4E3E] via-[#CC5500] to-[#808000]',
    accent: '#CC4E3E',
    bg: 'from-[#5C3D2E] via-[#8B4513] to-[#4A5D23]',
    pattern:
      'radial-gradient(circle at 25% 75%, rgba(204,78,62,0.35) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(74,93,35,0.25) 0%, transparent 50%)',
  },
  air: {
    gradient: 'from-[#FF7F50] via-[#FFE135] to-[#40E0D0]',
    accent: '#FF7F50',
    bg: 'from-[#FF7F50] via-[#FFCBA4] to-[#40E0D0]',
    pattern:
      'radial-gradient(circle at 20% 60%, rgba(255,225,53,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(64,224,208,0.25) 0%, transparent 50%)',
    lightBackground: true,
  },
};

export const giftCardDefaultColors: GiftCardThemeColors = {
  gradient: 'from-amber-500 via-rose-500 to-violet-500',
  accent: '#f59e0b',
  bg: 'from-gray-900 via-gray-800 to-gray-900',
  pattern:
    'radial-gradient(circle at 30% 70%, rgba(245,158,11,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168,85,247,0.2) 0%, transparent 50%)',
};

export interface GiftCardThemeOption {
  id: string | null;
  label: string;
  swatch: string;
}

/** Picker swatches — exact brand hex gradients (avoids muddy Tailwind complements). */
export const giftCardThemeOptions: GiftCardThemeOption[] = [
  {
    id: null,
    label: 'Default',
    swatch: 'linear-gradient(135deg, #f59e0b 0%, #f472b6 50%, #8b5cf6 100%)',
  },
  {
    id: 'fire',
    label: 'Fire',
    swatch: 'linear-gradient(135deg, #C41E3A 0%, #FF1493 100%)',
  },
  {
    id: 'water',
    label: 'Water',
    swatch: 'linear-gradient(135deg, #6B8BA4 0%, #D4A5A5 100%)',
  },
  {
    id: 'earth',
    label: 'Earth',
    swatch: 'linear-gradient(135deg, #CC4E3E 0%, #808000 100%)',
  },
  {
    id: 'air',
    label: 'Air',
    swatch: 'linear-gradient(135deg, #FF7F50 0%, #FFE135 50%, #40E0D0 100%)',
  },
];

type TextTone = 'primary' | 'secondary' | 'muted' | 'faint' | 'subtle' | 'link' | 'code';

const darkText: Record<TextTone, string> = {
  primary: 'text-gray-900',
  secondary: 'text-gray-800',
  muted: 'text-gray-600',
  faint: 'text-gray-500',
  subtle: 'text-gray-400',
  link: 'text-gray-600',
  code: 'text-gray-700',
};

const lightText: Record<TextTone, string> = {
  primary: 'text-white',
  secondary: 'text-white/90',
  muted: 'text-white/70',
  faint: 'text-white/50',
  subtle: 'text-white/40',
  link: 'text-white/55',
  code: 'text-white/80',
};

export function giftCardTextClass(lightBackground: boolean | undefined, tone: TextTone): string {
  return lightBackground ? darkText[tone] : lightText[tone];
}
