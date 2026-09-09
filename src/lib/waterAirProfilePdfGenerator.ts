import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
import { waterAirProfile } from '@/data/waterAirProfile';
import { getMakeupPalette } from '@/data/makeupData';
import { getNailPalette } from '@/data/nailData';
import { getJewelryData } from '@/data/jewelryData';
import { getDecorData } from '@/data/decorData';
import { hairColorData } from '@/components/HairColorGuide';
import { friendshipProfiles } from '@/data/friendshipCompatibilityData';
import { waterNutritionSubtypes } from '@/data/waterNutritionData';
import { conflictData } from '@/data/conflictData';
import { teamDynamicsData } from '@/data/teamDynamicsData';
import { cinematicData } from '@/components/CinematicPreferences';
import { artisticCorrespondenceData } from '@/components/ArtisticCorrespondence';
import { elementalImbalanceData } from '@/components/ElementalImbalance';

// Water+Air soft / misty palette
const MIST_BLUE: [number, number, number] = [107, 139, 164];   // #6B8BA4
const LAVENDER: [number, number, number] = [180, 167, 214];    // #B4A7D6
const PERIWINKLE: [number, number, number] = [140, 168, 200];  // soft periwinkle
const DEEP_WATER: [number, number, number] = [70, 110, 150];   // deeper accent for highlights
const INK: [number, number, number] = [20, 28, 44];
const SLATE: [number, number, number] = [71, 85, 105];
const GRAY: [number, number, number] = [120, 130, 150];

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function gradientBar(doc: jsPDF, x: number, y: number, w: number, h: number,
  from: [number, number, number], mid: [number, number, number], to: [number, number, number]) {
  const steps = 40;
  const sw = w / steps;
  for (let i = 0; i < steps; i++) {
    const r = i / steps;
    let a: [number, number, number], b: [number, number, number], lr: number;
    if (r < 0.5) { a = from; b = mid; lr = r * 2; } else { a = mid; b = to; lr = (r - 0.5) * 2; }
    const col: [number, number, number] = [
      Math.round(a[0] + (b[0] - a[0]) * lr),
      Math.round(a[1] + (b[1] - a[1]) * lr),
      Math.round(a[2] + (b[2] - a[2]) * lr),
    ];
    doc.setFillColor(...col);
    doc.rect(x + i * sw, y, sw + 0.6, h, 'F');
  }
}

export async function generateWaterAirProfilePDF(): Promise<void> {
  const p = waterAirProfile;

  const water = elementalTypes.find(t => t.id === 'water');
  const subtype = water?.subtypes.find(s => s.id === 'water-air');
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette('water-air');
  const jewelry = getJewelryData('water', 'water-air');
  const decor = getDecorData('water', 'water-air');
  const hairGuide = hairColorData
    .find(e => e.elementId === 'water')
    ?.subtypeGuides.find(s => s.subtypeId === 'water-air');

  // Cross-guide Water+Air content (single source of truth — pulled from each guide's data)
  const friendship = friendshipProfiles.find(f => f.subtypeId === 'water-air');
  const nutrition = waterNutritionSubtypes.find(n => n.id === 'water-air');
  const waterConflict = conflictData.find(e => e.elementId === 'water');
  const conflict = waterConflict?.subtypes.find(s => s.subtypeId === 'water-air');
  const waterTeam = teamDynamicsData.find(e => e.elementId === 'water');
  const team = waterTeam?.subtypes.find(s => s.subtypeId === 'water-air');
  // Arts — actual Water+Air film recommendation & suggested artwork (single source of truth)
  const waterFilms = cinematicData.find(e => e.id === 'water');
  const cineFilm = waterFilms?.films.find(f => f.id === 'water-air');
  const waterArt = artisticCorrespondenceData.water;
  const artData = waterArt?.find(a => a.subtypeId === 'water-air');
  // Out of Balance — actual Water+Air imbalance patterns (single source of truth)
  const waterImbalance = elementalImbalanceData.find(e => e.elementId === 'water');
  const imbalance = waterImbalance?.subtypes.find(s => s.subtypeId === 'water-air');


  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const ml = 50;
  const cw = pw - 100;
  const mb = 55;
  let y = 0;

  const ensure = (need: number) => {
    if (y + need > ph - mb) { doc.addPage(); y = 50; }
  };

  // ── HERO (gradient background matching the download banner) ──
  const blendOverWhite = (hex: string): [number, number, number] => {
    const [r, g, b] = hexToRgb(hex);
    const a = 0xdd / 255; // "dd" alpha used by the banner
    return [
      Math.round(r * a + 255 * (1 - a)),
      Math.round(g * a + 255 * (1 - a)),
      Math.round(b * a + 255 * (1 - a)),
    ];
  };
  const heroFrom = colors[0] ? blendOverWhite(colors[0].hex) : [255, 255, 255] as [number, number, number];
  const heroTo = colors[1] ? blendOverWhite(colors[1].hex) : heroFrom;
  const heroMid: [number, number, number] = [
    Math.round((heroFrom[0] + heroTo[0]) / 2),
    Math.round((heroFrom[1] + heroTo[1]) / 2),
    Math.round((heroFrom[2] + heroTo[2]) / 2),
  ];
  gradientBar(doc, 0, 0, pw, 200, heroFrom, heroMid, heroTo);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('THE MISTY SHORE', pw / 2, 56, { align: 'center' });

  doc.setFontSize(40);
  doc.setTextColor(255, 255, 255);
  doc.text('Water + Air', pw / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.splitTextToSize(p.tagline, cw - 40).slice(0, 2).forEach((ln: string, i: number) => {
    doc.text(ln, pw / 2, 138 + i * 16, { align: 'center' });
  });


  // Color dots
  const dots = colors.slice(0, 9);
  const dotW = 22, gap = 6;
  const totalW = dots.length * dotW + (dots.length - 1) * gap;
  let dx = (pw - totalW) / 2;
  dots.forEach(c => {
    doc.setFillColor(...hexToRgb(c.hex));
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.roundedRect(dx, 168, dotW, 16, 4, 4, 'FD');
    dx += dotW + gap;
  });


  y = 228;

  // ── SECTION HELPERS ──
  const sectionMarker: [number, number, number] = colors[0] ? hexToRgb(colors[0].hex) : MIST_BLUE;
  const sectionTitle = (label: string) => {
    y += 14;
    ensure(40);
    doc.setFillColor(...sectionMarker);
    doc.rect(ml, y - 9, 4, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(label, ml + 12, y + 3);
    y += 22;
  };

  const paragraph = (text: string, italic = false) => {
    if (!text) return;
    doc.setFont('helvetica', italic ? 'italic' : 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...SLATE);
    const lines = doc.splitTextToSize(text, cw) as string[];
    lines.forEach(ln => { ensure(15); doc.text(ln, ml, y); y += 14.5; });
    y += 8;
  };

  const chips = (items: string[], from: [number, number, number]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    let cx = ml; const chy0 = 6;
    items.forEach(it => {
      const tw = doc.getTextWidth(it.toUpperCase()) + 16;
      if (cx + tw > ml + cw) { cx = ml; y += 22; }
      ensure(20);
      doc.setFillColor(from[0], from[1], from[2]);
      doc.roundedRect(cx, y - chy0, tw, 16, 8, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(it.toUpperCase(), cx + 8, y + 4.5);
      cx += tw + 6;
    });
    y += 32;
  };

  const bullets = (items: string[], dot: [number, number, number]) => {
    items.forEach(it => {
      ensure(15);
      doc.setFillColor(dot[0], dot[1], dot[2]);
      doc.circle(ml + 3, y - 3, 2, 'F');
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...SLATE);
      const lines = doc.splitTextToSize(it, cw - 16) as string[];
      lines.forEach((ln, i) => { if (i > 0) ensure(13); doc.text(ln, ml + 14, y + i * 13); });
      y += lines.length * 13 + 3;
    });
    y += 8;
  };

  const labeledBullets = (items: { label: string; text: string }[], dot: [number, number, number]) => {
    items.forEach(it => {
      ensure(15);
      doc.setFillColor(dot[0], dot[1], dot[2]);
      doc.circle(ml + 3, y - 3, 2, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...INK);
      const labelLines = doc.splitTextToSize(it.label, cw - 16) as string[];
      labelLines.forEach((ln, i) => { if (i > 0) ensure(13); doc.text(ln, ml + 14, y + i * 13); });
      y += labelLines.length * 13;
      doc.setFont('helvetica', 'normal'); doc.setTextColor(...SLATE);
      const textLines = doc.splitTextToSize(it.text, cw - 16) as string[];
      textLines.forEach(ln => { ensure(13); doc.text(ln, ml + 14, y); y += 13; });
      y += 4;
    });
    y += 6;
  };

  const subHeading = (label: string, color: [number, number, number] = LAVENDER) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: [number, number, number] = LAVENDER) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(240, 244, 250);
    doc.roundedRect(ml, y - 6, cw, qLines.length * 14 + 18, 6, 6, 'F');
    doc.setFillColor(accent[0], accent[1], accent[2]);
    doc.rect(ml, y - 6, 3, qLines.length * 14 + 18, 'F');
    doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(accent[0], accent[1], accent[2]);
    let qy = y + 8;
    qLines.forEach(ln => { doc.text(ln, ml + 14, qy); qy += 14; });
    y = qy + 12;
  };

  const swatchRow = (label: string, list: { name: string; hex: string }[], showHex = false) => {
    if (!list || list.length === 0) return;
    ensure(60);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(label, ml, y); y += 12;
    const items = list.slice(0, 6);
    const sw = 70; const sh = 28; let sx = ml;
    items.forEach(c => {
      if (sx + sw > ml + cw) { sx = ml; y += sh + (showHex ? 28 : 18); ensure(sh + 28); }
      doc.setFillColor(...hexToRgb(c.hex));
      doc.roundedRect(sx, y, sw, sh, 4, 4, 'F');
      doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
      doc.text(doc.splitTextToSize(c.name, sw)[0], sx, y + sh + 9);
      if (showHex) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(6); doc.setTextColor(...SLATE);
        doc.text(c.hex.toUpperCase(), sx, y + sh + 18);
      }
      sx += sw + 8;
    });
    y += sh + (showHex ? 40 : 32);
  };


  // ── CORE ELEMENTAL IDENTITY ──
  sectionTitle('Core Elemental Identity');
  const identityRows: { label: string; value: string }[] = [
    { label: 'Elemental Signature', value: 'Water + Air (Water as Dominant, Air as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Late Spring into Summer (Light Summer)' },
    { label: 'Core Mantra', value: '\u201CI AM the softening of the world.\u201D' },
  ];
  const idLabelW = 150;
  const idValueW = cw - idLabelW;
  identityRows.forEach((row) => {
    const valueLines = doc.splitTextToSize(row.value, idValueW - 20) as string[];
    const rowH = Math.max(24, valueLines.length * 13 + 11);
    ensure(rowH);
    doc.setFillColor(244, 247, 251);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    doc.setDrawColor(220, 228, 238); doc.setLineWidth(0.5);
    doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
    y += rowH;
  });
  y += 14;


  sectionTitle('Your Essence');
  {
    const highlightSentence =
      'You look best in the softest end of the cool spectrum \u2014 light, luminous, low-contrast colors like icy blue, pale lavender, and soft periwinkle, as if morning mist had settled on your skin.';
    const idx = p.essence.indexOf(highlightSentence);
    if (idx >= 0) {
      const leadText = p.essence.slice(0, idx).trim();
      paragraph(leadText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DEEP_WATER);
      const hLines = doc.splitTextToSize(highlightSentence, cw) as string[];
      hLines.forEach(ln => { ensure(15); doc.text(ln, ml, y); y += 14.5; });
      y += 8;
    } else {
      paragraph(p.essence);
    }
  }

  subHeading('In Nature', LAVENDER);
  paragraph(p.inNature, true);
  chips(p.themes, LAVENDER);

  sectionTitle('Archetypes');
  chips(p.archetypes, MIST_BLUE);

  paragraph('The Feeling: \u201CI am the moment sea becomes sky \u2014 and neither can be told apart.\u201D', true);
  paragraph('The Analogy: Think of sea mist rolling in at dawn \u2014 it asks nothing, it simply arrives, and slowly the hard edges of the world go soft. It doesn\u2019t announce itself; it settles, envelops, and quietly changes how everything feels. This is your energy: gentle, diffusing, and impossible to resist because it never pushes.', true);

  // ── CELEBRITIES WHO SHARE THIS SUBTYPE ──
  subHeading('Celebrities Who Share Your Subtype', LAVENDER);
  paragraph('Famous faces who embody the Misty Shore \u2014 soft, luminous, low-contrast coloring that comes alive in light, cool, gentle colors.', true);
  labeledBullets([
    { label: 'Taylor Swift', text: 'Light, delicate coloring with a fresh, youthful glow \u2014 beautiful in sky blue and soft pink.' },
    { label: 'Elle Fanning', text: 'Ethereal, light coloring with delicate features perfect for powder blue and pale rose.' },
    { label: 'Aurora (fictional)', text: 'The dreamy princess with soft, gentle coloring and quiet grace.' },
    { label: 'The Gentle Muse', text: 'Anyone whose presence lowers the volume of a room and makes it feel safe.' },
  ], MIST_BLUE);


  sectionTitle('Energy & Vibration');
  paragraph(p.energy);
  paragraph(p.vibration);
  paragraph(p.blessing, true);
  paragraph('You are water given lightness. Where Water alone gathers in the depths, your Water has been lifted by Air into something diffuse and luminous \u2014 mist rather than ocean, dew rather than flood. You do not crash into a room; you drift into it. Where other Waters pull people down into feeling, you soften the air itself, so that feeling becomes bearable, even beautiful.');
  paragraph('Air gives your Water something pure Water alone does not have: lightness, perspective, and the ability to hold emotion without drowning in it. From that combination something rare emerges \u2014 the capacity to translate. You sense the unspoken current beneath a conversation and, without force, name what everyone is feeling but no one can say. Your clarity is not loud or sharp. It is gentle \u2014 a soft light that reveals the shape of things without ever glaring.');
  paragraph('You are not here to command. You are here to soothe. Your gift is atmosphere \u2014 the particular, quieting capacity to make people feel safe, to dissolve their defenses, to hold the tender in-between where healing happens. This is rare and it is easy to overlook. People may not always notice you in the moment. But they will remember how they felt in your presence \u2014 lighter, softer, more themselves.');
  paragraph('You are here to soften. To translate. To carry Water\u2019s depth on Air\u2019s currents, wherever gentleness is needed most.');


  // ── SEASONAL MATCH ──
  sectionTitle('Seasonal Match');
  paragraph(
    'Water types belong to the ' + (water?.season || 'Summer') +
    ' seasonal color palette, characterized by cool undertones, soft contrast, and gentle, muted, low-saturation colors.',
  );

  // ── KEY CHARACTERISTICS ──
  sectionTitle('Key Characteristics');
  bullets(subtype?.characteristics || [], LAVENDER);


  // ── THE COLOR PALETTE ──
  sectionTitle('Your Color Palette (with Hex Codes)');
  paragraph('Your signature Water + Air palette \u2014 soft, luminous, low-contrast colors with cool undertones, like morning mist on a still shore. Each swatch includes its exact hex code.');
  swatchRow('Primary Colors', colors.filter(c => c.category === 'primary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Secondary Colors', colors.filter(c => c.category === 'secondary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Accent Colors', colors.filter(c => c.category === 'accent').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Neutrals', colors.filter(c => c.category === 'neutral').map(c => ({ name: c.name, hex: c.hex })), true);

  // ── STYLE & PHILOSOPHY ──
  sectionTitle('Style & Philosophy');
  paragraph('\u201CI dress to soften, not to announce.\u201D', true);
  paragraph('The Misty Shore approaches style as a form of atmosphere. Your clothing is not about drama, contrast, or commanding attention. It is about gentle luminosity \u2014 the soft, unmistakable expression of your ethereal nature. You dress to put people at ease, to feel like light through mist, to be the calm that settles a room.');
  calloutQuote('Your Style Mantra: \u201CIf it doesn\u2019t feel like morning light, it\u2019s not for me.\u201D', LAVENDER);
  y += 14;


  // How the Misty Shore Approaches Color
  sectionTitle('How the Misty Shore Approaches Color');
  subHeading('The Luminous Palette', MIST_BLUE);
  paragraph('Your colors are not bold \u2014 they are luminous. Not sharp \u2014 soft. Not commanding \u2014 enveloping. You are drawn to colors that seem to glow gently from within:');
  labeledBullets([
    { label: 'Signature', text: 'Icy Blue, Pale Lavender, Soft Periwinkle, Misty Blue-Gray: light, cool colors that feel like sea mist and dawn light.' },
    { label: 'Anchors', text: 'Soft White, Silver Gray, Oxford Blue: gentle, cool foundations that let your luminous colors breathe.' },
    { label: 'Connectors', text: 'Dove Grey, Pale Aqua, Soft Lilac: quiet, cool transitions that keep everything flowing softly.' },
    { label: 'Luminous', text: 'Pearl, Moonstone, Frosted Silver, Opalescent: the light of the mist itself \u2014 diffuse, gentle, glowing.' },
  ], MIST_BLUE);

  subHeading('The Temperature Rule', LAVENDER);
  paragraph('Your palette is cool and soft. You do not wear warm, golden, or earthy colors \u2014 they feel heavy and muddy on your delicate coloring. When you need warmth, reach for a cool-leaning rose or a soft mauve rather than anything golden.');
  paragraph('The Rule: \u201CIf it doesn\u2019t feel cool and soft, it\u2019s not for me.\u201D', true);

  subHeading('The Lightness Rule', LAVENDER);
  paragraph('Your colors are light and low-contrast. You cannot wear heavy, dark, or highly saturated tones \u2014 they overwhelm your subtle energy and swallow your natural glow. You need colors that whisper, not shout.');
  paragraph('The Rule: \u201CIf it feels heavy, it\u2019s not speaking my language.\u201D', true);

  subHeading('The Softness Rule', LAVENDER);
  paragraph('You need gentle, blended transitions, not stark contrast. Your energy is misty, and your colors must match that softness. Tonal, monochromatic layering \u2014 pale blue on softer blue, lavender on grey \u2014 creates the diffuse harmony that feels like you.');
  paragraph('The Rule: \u201CI need the blur of the mist \u2014 soft against soft, light against light.\u201D', true);

  // How the Misty Shore Assembles an Outfit
  sectionTitle('How the Misty Shore Assembles an Outfit');
  subHeading('The Principle: Soft Layers, One Gentle Glow', MIST_BLUE);
  paragraph('You are not about statement pieces. You are about atmosphere. Your outfit should feel like layers of mist \u2014 tonal, fluid, and quietly luminous, with nothing that breaks the softness.');
  subHeading('The Formula', LAVENDER);
  bullets([
    'Anchor (60%): A soft, cool, fluid foundation in your Anchor colors.',
    'Connector (25%): A tonal layering piece that keeps everything blended.',
    'Glow (15%): One luminous, pale accent \u2014 a pearl, an icy scarf \u2014 that catches the light.',
  ], LAVENDER);

  subHeading('The Everyday Formula', LAVENDER);
  labeledBullets([
    { label: 'Anchor', text: 'Soft white blouse + dove-grey trousers: gentle, cool foundation.' },
    { label: 'Connector', text: 'A pale-lavender cardigan or soft-blue wrap: a tonal transition.' },
    { label: 'Glow', text: 'A moonstone pendant or icy-blue scarf: the quiet luminosity people notice without knowing why.' },
  ], MIST_BLUE);

  subHeading('The Impact Formula', LAVENDER);
  paragraph('For moments when you need quiet authority:');
  labeledBullets([
    { label: 'Anchor', text: 'Oxford blue or soft charcoal tailoring: a calm, cool foundation of composure.' },
    { label: 'Connector', text: 'Silver or pearl accessory: the gentle, refined bridge.' },
    { label: 'Glow', text: 'An icy periwinkle blouse: the luminous note that makes you unforgettable without effort.' },
  ], MIST_BLUE);

  subHeading('The Evening Formula', LAVENDER);
  paragraph('For moments of intimacy and connection:');
  labeledBullets([
    { label: 'Anchor', text: 'A fluid dress in soft blue-grey or pale lavender: the gentle foundation.' },
    { label: 'Connector', text: 'Pearl or moonstone jewelry: the soft, luminous transition.' },
    { label: 'Glow', text: 'A sheer icy wrap or a whisper of frosted shimmer: the mist that makes you glow.' },
  ], MIST_BLUE);

  // Getting It Right
  sectionTitle('Getting It Right: The Misty Shore at Their Best');

  subHeading('The Right Softness', MIST_BLUE);
  paragraph('You understand that low contrast is your power. A tonal, blended outfit in your soft palette is far more beautiful on you than any bold, high-contrast look.');
  paragraph('Right Example: Pale blue-grey trousers, soft white blouse, and an icy lavender wrap. The whole look glows gently.');
  paragraph('Wrong Example: Black blazer with a bright white shirt and a saturated red bag. The hard contrast overwhelms your softness and drains your glow.', true);

  subHeading('The Right Texture', MIST_BLUE);
  paragraph('You understand that your colors need fluid, lightweight fabrics. Your outfit should drape and move like mist \u2014 chiffon, fine knit, silk georgette.');
  paragraph('Right Example: A soft, flowing silk blouse in dove grey with a gentle drape. The fabric lets your lightness shine.');
  paragraph('Wrong Example: Stiff, structured, heavy fabrics that fight your fluid nature. You need drape, not architecture.', true);

  subHeading('The Right Accent', MIST_BLUE);
  paragraph('You understand that accessories should glow softly, not shout. One luminous, delicate piece is better than anything bold.');
  paragraph('Right Example: A single moonstone pendant or delicate pearl earrings. Soft, luminous, quietly lovely.');
  paragraph('Wrong Example: A heavy, high-shine statement piece that breaks the mist and competes with your gentle glow.', true);

  // Wear This / Avoid This
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(20, 120, 80);
  ensure(16); doc.text('WEAR THIS', ml, y); y += 16;
  p.style.wearThis.forEach(it => {
    ensure(14); doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...SLATE);
    doc.setTextColor(20, 140, 90); doc.text('+', ml, y);
    doc.setTextColor(...SLATE);
    doc.splitTextToSize(it, cw - 16).forEach((ln: string, i: number) => { doc.text(ln, ml + 14, y + i * 13); });
    y += doc.splitTextToSize(it, cw - 16).length * 13 + 2;
  });
  y += 6;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(190, 30, 50);
  ensure(16); doc.text('AVOID THIS', ml, y); y += 16;
  p.style.avoidThis.forEach(it => {
    ensure(14); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.setTextColor(200, 50, 60); doc.text('\u00D7', ml, y);
    doc.setTextColor(...SLATE);
    doc.splitTextToSize(it, cw - 16).forEach((ln: string, i: number) => { doc.text(ln, ml + 14, y + i * 13); });
    y += doc.splitTextToSize(it, cw - 16).length * 13 + 2;
  });
  y += 10;


  // ── BEAUTY PALETTE ──
  sectionTitle('Beauty Palette');
  subHeading('Make-up Philosophy', LAVENDER);
  paragraph('\u201CMakeup as Mist.\u201D', true);
  paragraph('The Look: Soft, luminous, veiled. Skin that looks like morning dew has just settled \u2014 barely-there, dewy, and glowing.', true);
  labeledBullets([
    { label: 'The Canvas', text: 'Dewy, sheer finish. The lightest coverage that lets your natural luminosity show \u2014 never heavy, never matte.' },
    { label: 'The Eyes', text: 'Pale lavender or the lightest silver shimmer swept softly across the lid. Skip harsh liner \u2014 a soft smudge of taupe is plenty.' },
    { label: 'The Brows', text: 'Soft and natural, brushed rather than drawn. A brow that looks effortless and unforced.' },
    { label: 'The Lips', text: 'A sheer icy pink or soft cool rose. Balm-like and glossy \u2014 a whisper of color, not a statement.' },
    { label: 'The Cheeks', text: 'A barely-there flush of cool pink, high on the cheekbone, as if it appeared naturally. The finest diffused pearl highlighter \u2014 almost invisible, but transformative.' },
  ], MIST_BLUE);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) {
      swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    }
  }


  // ── JEWELRY / METALS ──
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for Water + Air', MIST_BLUE);
    labeledBullets(
      jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })),
      MIST_BLUE,
    );
    const bestMetals = jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex }));
    swatchRow('Best Metals', bestMetals, true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));

    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', LAVENDER);
      labeledBullets(
        jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })),
        LAVENDER,
      );
    }

    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', MIST_BLUE);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(
        jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })),
        MIST_BLUE,
      );
    }

    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', LAVENDER);
      bullets(jewelry.watchRecommendations, LAVENDER);
    }

    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', MIST_BLUE);
      chips(jewelry.eyewearColors, MIST_BLUE);
    }

    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', LAVENDER);
      bullets(jewelry.tips, LAVENDER);
    }

    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', LAVENDER);
      bullets(jewelry.avoidList, LAVENDER);
    }
  }

  // ── HAIR COLOR ──
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(
      'Your soft, low-contrast coloring calls for gentle, cool-toned hair shades. Choose muted, ashy, luminous colors and avoid anything too dark, warm, or brassy that overpowers your delicate glow.',
    );
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', LAVENDER);
      bullets(hairGuide.tips, LAVENDER);
    }
    hairGuide.bestColors.forEach(cat => {
      swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex })));
    });
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', MIST_BLUE);
      swatchRow('Shades to Avoid', hairGuide.avoidColors.map(c => ({ name: c.name, hex: c.hex })));
    }
  }

  // ── NAIL COLOR GUIDE ──
  {
    const nail = getNailPalette('water-air');
    if (nail) {
      sectionTitle('Nail Color Guide');
      paragraph('Perfect polish colors for your Water + Air coloring \u2014 soft, cool, muted shades with a gentle luminosity that complement your misty palette.');

      swatchRow('Everyday Neutrals', nail.everydayNeutrals.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Bold Statement', nail.boldStatement.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Seasonal Picks', nail.seasonalPicks.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Special Occasion', nail.specialOccasion.map(c => ({ name: c.name, hex: c.hex })));

      if (nail.recommendedFinishes && nail.recommendedFinishes.length) {
        subHeading('Recommended Finishes', MIST_BLUE);
        chips(nail.recommendedFinishes, MIST_BLUE);
      }

      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', LAVENDER);
        labeledBullets(
          nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })),
          LAVENDER,
        );
      }

      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for Water + Air', MIST_BLUE);
        bullets(nail.generalTips, MIST_BLUE);
      }
    }
  }


  // ── DECOR ──
  sectionTitle('Decor');
  paragraph(p.living.decor);

  if (decor) {
    const parseColor = (c: string) => ({
      hex: c.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888',
      name: c.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, ''),
    });

    subHeading('The Atmosphere', MIST_BLUE);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, MIST_BLUE);

    subHeading('Color Scheme', LAVENDER);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);

    subHeading('Style', MIST_BLUE);
    labeledBullets(
      decor.roomStyles.map(s => ({ label: s.name, text: s.description })),
      MIST_BLUE,
    );

    subHeading('Materials', LAVENDER);
    chips(decor.materials, LAVENDER);
    subHeading('Textures', MIST_BLUE);
    chips(decor.textures, MIST_BLUE);

    if (decor.artStyle && decor.artStyle.length) {
      subHeading('Art Styles to Consider', LAVENDER);
      chips(decor.artStyle, LAVENDER);
    }
  }


  // ── HABITAT ──
  sectionTitle('Habitat');
  paragraph(p.living.habitat);
  subHeading('The Space Itself', LAVENDER);
  bullets([
    'Soft, diffused light \u2014 sheer curtains, lamps, no harsh overheads',
    'A view of water or open sky if possible',
    'Calm, uncluttered surfaces and gentle textures',
    'A quiet corner to withdraw and recharge',
    'Natural sounds \u2014 rain, waves, soft music',
  ], LAVENDER);
  paragraph('Why It Works: The Misty Shore needs a threshold between the world and retreat \u2014 a place soft enough to let your guard down and quiet enough to hear your own feelings again.', true);


  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote('The Sanctuary Day', MIST_BLUE);
  paragraph('A day of softness, water, and quiet creativity. A slow morning with tea and a journal. An afternoon by the water \u2014 swimming, floating, or simply watching the light change. Evening spent reading, listening to music, or writing. You recharge through stillness, beauty, and gentle solitude.');
  bullets(['Poetry & journaling', 'Watercolor painting', 'Swimming & floating', 'Yin yoga & meditation', 'Long, quiet walks in nature', 'Listening to ambient music'], MIST_BLUE);

  // Nutrition
  if (nutrition) {
    sectionTitle('Nutrition');
    paragraph('Pattern: ' + nutrition.pattern);
    paragraph('Body wisdom: ' + nutrition.bodyWisdom, true);
    subHeading('Approach', LAVENDER);
    labeledBullets([
      { label: 'Do:', text: nutrition.approach.do },
      { label: 'Don\u2019t:', text: nutrition.approach.dont },
      { label: 'Key:', text: nutrition.approach.key },
    ], MIST_BLUE);
    subHeading('Eating Rituals', LAVENDER);
    labeledBullets(nutrition.eatingRituals.map(r => ({ label: r.name, text: r.desc })), LAVENDER);
    paragraph('Mantra: \u201C' + nutrition.mantra + '\u201D', true);
  } else {
    paragraph(p.living.nutrition);
  }

  // ── LOVE LANGUAGE ──
  sectionTitle('Love Language');
  paragraph('Receives love through: ' + p.loveLanguage.receivesLoveThrough);
  paragraph('Non-verbal cues: ' + p.loveLanguage.nonVerbalCues);

  // ── RELATIONSHIPS ──
  sectionTitle('Relationships');
  paragraph(p.relationships.inLove);
  subHeading('Your Relationship Strengths', MIST_BLUE);
  bullets(p.relationships.strengthsInRelationship, MIST_BLUE);
  subHeading('Your Relationship Growth Edges', LAVENDER);
  bullets(p.relationships.growthInRelationship, LAVENDER);

  // Friendship Compatibility
  if (friendship) {
    sectionTitle('Friendships');
    paragraph(friendship.friendshipStyle);
    subHeading('Natural Chemistry', MIST_BLUE);
    labeledBullets(friendship.naturalChemistry.map(a => ({ label: a.name, text: a.reason })), MIST_BLUE);
    subHeading('Growth Friendships', LAVENDER);
    labeledBullets(friendship.growthFriendships.map(a => ({ label: a.name, text: a.reason })), LAVENDER);
    subHeading('Friction Points', MIST_BLUE);
    labeledBullets(friendship.frictionPoints.map(a => ({ label: a.name, text: a.reason })), MIST_BLUE);
  } else {
    paragraph(p.relationships.friendshipCompatibility);
  }

  // ── ANIMAL AFFINITY ──
  sectionTitle('Animal Affinity');
  paragraph('The Heron at the Misty Shore. The quiet, patient creature that stands at the threshold between water and air \u2014 still, watchful, and utterly at peace in the in-between. It moves softly, sees deeply, and belongs fully to neither element, but to the gentle boundary where they meet.');

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');

  subHeading('Cinematic Preferences', LAVENDER);
  paragraph(p.arts.cinematic);
  if (cineFilm) {
    calloutQuote(
      '\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')',
      LAVENDER,
    );
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], LAVENDER);
  }

  subHeading('Artistic Correspondence', MIST_BLUE);
  paragraph(p.arts.artisticCorrespondence);
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', MIST_BLUE);
    labeledBullets([
      {
        label: 'Visual Artwork \u2014 \u201C' + artData.visualArtwork.title + '\u201D by ' + artData.visualArtwork.artist,
        text: artData.visualArtwork.description + '.',
      },
      {
        label: 'Movement & Style \u2014 ' + artData.movementStyle.name,
        text: artData.movementStyle.description + '.',
      },
      { label: 'Medium Suggestion', text: artData.mediumSuggestion },
      { label: 'Creative Prompt', text: '\u201C' + artData.creativePrompt + '\u201D' },
    ], MIST_BLUE);
  }


  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  ensure(50);
  doc.setFillColor(240, 244, 250);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...LAVENDER);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...DEEP_WATER);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // ── MANTRAS ──
  sectionTitle('The Mantras');
  bullets([
    '\u201CTo soften is to serve.\u201D',
    '\u201CNot the crashing wave, but the gentle mist that reveals the shape of things.\u201D',
    '\u201CI am the threshold where feelings become bearable.\u201D',
    '\u201CTo feel deeply is not to drown \u2014 I can hold the water and stay light.\u201D',
  ], LAVENDER);
  labeledBullets([
    { label: 'Meditation:', text: '\u201CWhat needs to be softened today? Where can I bring calm? What truth is waiting quietly to be named?\u201D' },
  ], MIST_BLUE);
  paragraph('Shadow Balance: The Misty Shore must remember that mist without form eventually evaporates \u2014 or floods. You must learn the art of edges: of gathering into a shape, of speaking your needs, of keeping some of your gentle atmosphere for yourself.', true);

  // ── ONE SENTENCE ──
  sectionTitle('The One Sentence');
  {
    const oneSentenceRows: { context: string; sentence: string }[] = [
      { context: 'To Yourself', sentence: '\u201CI AM the softening of the world.\u201D' },
      { context: 'At Work', sentence: '\u201CI hear what isn\u2019t being said \u2014 let me help us understand.\u201D' },
      { context: 'In Love', sentence: '\u201CYou are safe with me \u2014 you can put it down here.\u201D' },
      { context: 'In Crisis', sentence: '\u201CLet\u2019s slow down and breathe. We can hold this gently.\u201D' },
      { context: 'At Rest', sentence: '\u201CI am learning to keep some of the mist for myself.\u201D' },
    ];
    const ctxW = 120;
    const sentW = cw - ctxW;
    ensure(22);
    doc.setFillColor(...sectionMarker);
    doc.rect(ml, y - 9, cw, 22, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(255, 255, 255);
    doc.text('Context', ml + 10, y + 5);
    doc.text('One Sentence', ml + ctxW, y + 5);
    y += 22;
    oneSentenceRows.forEach((row) => {
      const sentLines = doc.splitTextToSize(row.sentence, sentW - 20) as string[];
      const rowH = Math.max(22, sentLines.length * 13 + 9);
      ensure(rowH);
      doc.setFillColor(244, 247, 251);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(220, 228, 238); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }


  // ── YOUR DIRECTION (Elemental Compass) ──
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', LAVENDER);
  paragraph('Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self: a map not of land, but of soul. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces \u2014 the horizon it is forever turning toward.');

  // ── FOUR CARDINAL DIRECTIONS GRAPHIC (WATER highlighted) ──
  {
    const compR = 72;
    const compH = compR * 2 + 64;
    ensure(compH);
    const cx = ml + cw / 2;
    const cy = y + compR + 18;

    doc.setDrawColor(200, 212, 226); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(224, 232, 242); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');

    doc.setDrawColor(216, 226, 238); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);
    doc.line(cx - compR, cy, cx + compR, cy);

    // West ray (Water) — soft wedge toward the left
    doc.setFillColor(...MIST_BLUE);
    doc.triangle(cx, cy, cx - compR + 6, cy - 14, cx - compR + 6, cy + 14, 'F');
    // leading edge (West-by-Northwest) mist marker
    const wnwX = cx - Math.cos((22.5 * Math.PI) / 180) * (compR - 4);
    const wnwY = cy - Math.sin((22.5 * Math.PI) / 180) * (compR - 4);
    doc.setFillColor(...LAVENDER);
    doc.circle(wnwX, wnwY, 4, 'F');
    doc.setDrawColor(...LAVENDER); doc.setLineWidth(0.8);
    doc.line(cx, cy, wnwX, wnwY);

    doc.setFillColor(...DEEP_WATER);
    doc.circle(cx, cy, 4, 'F');

    doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('EARTH', cx, cy - compR + 6, { align: 'center' });
    doc.text('AIR', cx + compR - 6, cy + 12, { align: 'right' });
    doc.text('FIRE', cx, cy + compR - 6, { align: 'center' });
    // WATER label highlighted
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...MIST_BLUE);
    doc.text('WATER', cx - compR + 10, cy - 6, { align: 'left' });

    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...DEEP_WATER);
    doc.text('The soft edge \u2014 West-by-Northwest', wnwX + 6, wnwY - 4, { align: 'left' });

    y = cy + compR + 28;
  }

  labeledBullets([
    { label: 'Direction', text: 'West-by-Northwest (the soft edge). You face west, into depth, but always at the misty margin \u2014 the place where water becomes air.' },
    { label: 'The Threshold', text: 'The veil between water and sky; the dissolving of hard edges. Your direction is toward the in-between, the liminal, the gentle transition.' },
    { label: 'Orientation', text: 'You seek dissolution and reunion \u2014 the softening of boundaries, the place where separate things merge, the tender meeting of elements.' },
    { label: 'Shadow Orientation', text: 'When lost, you dissolve so completely that you lose your own edges \u2014 you love the merge so much you forget you are also a shore.' },
  ], MIST_BLUE);

  calloutQuote('\u201CI face the mist. I honor the gentle threshold between.\u201D', DEEP_WATER);


  // ── CAREER ──
  sectionTitle('Career');
  chips(p.career.drawnTo, MIST_BLUE);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading('The Sanctuary', MIST_BLUE);
  paragraph('Calm, supportive, and human-centered. A culture that values empathy, care, and thoughtful pace over noise and constant pressure. You need quiet, psychological safety, and permission to work in a gentle rhythm. You thrive in counseling, healthcare, the arts, research, and any space that treats sensitivity as a strength.');
  paragraph('Avoid: Loud, cutthroat, high-pressure environments where feelings are dismissed and stillness is treated as weakness.', true);

  sectionTitle('Your Secret Sauce');
  paragraph('Your gentleness is not weakness; it is psychological safety. You need to know that your soft, harmonizing presence is not \u201Ctoo quiet\u201D or \u201Clacking authority.\u201D You are the emotional infrastructure of any team. People feel safe admitting mistakes, asking questions, and being vulnerable when you are in the room. This is not a soft skill \u2014 it is a leadership competency. Your role is to say \u201CLet\u2019s pause and make sure everyone is okay.\u201D');
  paragraph('Impression: \u201CShe makes the whole team feel calmer and more understood. People do their best, most honest work when she\u2019s present.\u201D', true);

  sectionTitle('Leadership');
  subHeading('The Empathic Facilitator', LAVENDER);
  paragraph('You lead through attunement and psychological safety. You walk into a tense room and, without raising your voice, help people feel heard, lower their defenses, and reconnect. You don\u2019t dominate the direction \u2014 you create the conditions in which the best of everyone can emerge. People follow you because they trust you, and because they feel genuinely seen.');
  paragraph('Blind spots: Your accommodation can blur your authority. You may absorb the team\u2019s stress until you burn out, or avoid necessary confrontation to keep the peace. Pair your empathy with clear boundaries, and practice naming hard truths gently but directly.', true);

  // ── COMMUNICATION ──
  sectionTitle('Communication');
  calloutQuote('The Empathic Translator', MIST_BLUE);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);


  // ── TEAM DYNAMICS ──
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, MIST_BLUE);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // ── CONFLICT STYLE ──
  if (conflict) {
    sectionTitle('Elemental Conflict Style');
    calloutQuote(conflict.name, LAVENDER);
    {
      const labelLine = (label: string, value: string) => {
        ensure(15);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...MIST_BLUE);
        doc.text(label, ml, y);
        const lw = doc.getTextWidth(label) + 4;
        doc.setFont('helvetica', 'normal'); doc.setTextColor(...SLATE);
        const valueLines = doc.splitTextToSize(value, cw - lw) as string[];
        valueLines.forEach((ln, i) => {
          if (i === 0) { doc.text(ln, ml + lw, y); }
          else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
        });
        y += 14.5 + 4;
      };
      labelLine('Archetype: ', conflict.conflictArchetype);
      labelLine('Default response: ', conflict.defaultResponse.toUpperCase());
    }
    paragraph(conflict.defaultResponseDetail);
    subHeading('Triggers', LAVENDER);
    bullets(conflict.triggers, LAVENDER);
    paragraph('Conflict strength: ' + conflict.conflictStrength);
    paragraph('What you need to hear: ' + conflict.whatTheyNeedToHear, true);
  }


  // ── LIFE LESSONS ──
  sectionTitle('Life Lessons');
  paragraph(p.growth.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  bullets(p.growth.coreBlocks, MIST_BLUE);

  // ── WHEN OUT OF BALANCE ──
  sectionTitle('When Out of Balance');
  paragraph(p.growth.imbalance);

  if (imbalance) {
    const imbalancePanel = (
      heading: string,
      body: string,
      accent: [number, number, number],
      fill: [number, number, number],
    ) => {
      const bodyLines = doc.splitTextToSize(body, cw - 28) as string[];
      const boxH = 18 + bodyLines.length * 13 + 12;
      ensure(boxH + 4);
      doc.setFillColor(fill[0], fill[1], fill[2]);
      doc.roundedRect(ml, y - 4, cw, boxH, 6, 6, 'F');
      doc.setFillColor(accent[0], accent[1], accent[2]);
      doc.rect(ml, y - 4, 3, boxH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.text(heading, ml + 14, y + 10);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      let by = y + 24;
      bodyLines.forEach(ln => { doc.text(ln, ml + 14, by); by += 13; });
      y += boxH + 8;
    };

    subHeading('The Misty Shore Imbalance Patterns', LAVENDER);
    imbalancePanel(
      'Excess \u2014 ' + imbalance.excess.title,
      imbalance.excess.description,
      [70, 110, 150],
      [240, 245, 250],
    );
    imbalancePanel(
      'Deficiency \u2014 ' + imbalance.deficiency.title,
      imbalance.deficiency.description,
      [130, 120, 175],
      [246, 244, 251],
    );
  }


  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.growth.healing, MIST_BLUE);

  // ── ELEMENTAL HEALING ──
  sectionTitle('Elemental Healing');
  calloutQuote('Excess: Congestion (Over-Saturated)  /  Deficiency: Dry Fragility (Mist Evaporated)', LAVENDER);

  subHeading('To Clear Excess \u2014 Congestion & Over-Saturation', MIST_BLUE);
  paragraph('When your mist thickens into congestion, heaviness, and absorbed emotion, the goal is to move, drain, and lighten the system:', true);
  labeledBullets([
    { label: 'Herbs', text: 'Nettle & Cleavers \u2014 to support lymphatic drainage and clear stagnant fluid.' },
    { label: 'Nutrients', text: 'Magnesium & gentle diuretic foods (cucumber, celery) to release retained water.' },
    { label: 'Diet', text: 'Warm, light, anti-inflammatory foods; reduce dairy and heavy comfort foods that thicken the mist.' },
    { label: 'Movement', text: 'Dry brushing, gentle rebounding, and swimming to keep the lymph and emotions moving.' },
    { label: 'Boundaries', text: 'Energetic boundaries \u2014 daily solitude to release absorbed feelings that are not yours.' },
  ], MIST_BLUE);

  subHeading('To Rehydrate Deficiency \u2014 Dryness & Fragility', LAVENDER);
  paragraph('When your mist evaporates into dryness, thinness, and disconnection, the goal is to nourish, hydrate, and restore softness:', true);
  labeledBullets([
    { label: 'Herbs', text: 'Marshmallow Root & Slippery Elm \u2014 to soothe and rehydrate mucous membranes.' },
    { label: 'Nourishment', text: 'Warm broths, healthy fats, and mineral-rich waters to restore lubrication and depth.' },
    { label: 'Reconnection', text: 'Gentle water immersion, warm baths, and slow, feeling-based practices to re-enter the body.' },
  ], LAVENDER);

  subHeading('Spiritual Practices for Realignment', MIST_BLUE);
  labeledBullets([
    { label: 'Primary (Resonance)', text: 'Contemplative meditation and quiet reverie. Practices that honor stillness, intuition, and the soft inner world.' },
    { label: 'Balancing (Counter-Energy)', text: 'Grounding and embodiment. Feeling your feet on the earth, gentle strength practices, and naming needs aloud to give the mist form.' },
    { label: 'Ritual', text: 'Water rituals \u2014 blessing water, journaling by the sea, or a warm evening bath as a boundary between the day\u2019s absorption and your own peace.' },
  ], MIST_BLUE);

  {
    const disclaimer =
      'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }


  // ── THE BIORHYTHM ──
  sectionTitle('The Biorhythm');
  subHeading('The Lunar & Tidal Rhythm', LAVENDER);
  paragraph('Chronotype: Variable and tidal \u2014 energy ebbs and flows with emotional and internal states. Needs gentle, unhurried mornings.', true);
  paragraph('Peak Time: Late Morning & Evening. Your energy softens midday and returns as the light grows gentle again.', true);

  subHeading('Your Biorhythm Schedule', MIST_BLUE);
  paragraph('Peak time: 10 AM\u201312 PM & 7\u20139 PM \u2014 gentle waves of intuitive, creative, and connective energy.');
  bullets([
    '7\u20139 AM \u2014 Slow, quiet start. Tea, journaling, gentle stretching. Do not rush the mist awake.',
    '10 AM\u201312 PM \u2014 Soft creative peak. Writing, empathic work, thoughtful conversation.',
    '1\u20134 PM \u2014 Low tide. Honor it: restful, low-stimulation tasks, a nap or a quiet walk.',
    '7\u20139 PM \u2014 Second gentle peak. Deep connection, creative reflection, meaningful conversation.',
    'Evening \u2014 Warm, calming wind-down. A bath, soft music, reading. Release the day\u2019s absorbed weather.',
  ], MIST_BLUE);
  paragraph(p.growth.newYearResolution, true);


  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph('To become the Serene Harmonizer \u2014 whose gentle presence dissolves harshness, heals division, and creates the safe atmosphere in which others can finally be themselves, while learning to keep a shore of one\u2019s own to rest upon.');


  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  paragraph('The Misty Shore is not merely soft \u2014 it is a quiet force of healing. Your gift is not the crash of the wave, but the gentle mist that softens every hard edge. You create safety, translate feeling into understanding, and hold the tender threshold where people can finally exhale. Your purpose is to soften the world \u2014 and in doing so, to make intimacy and healing possible.');
  paragraph('But the deepest truth of your nature is this: the mist must learn to have edges. To soften others without dissolving yourself; to feel deeply without drowning; to give a shore to the world while keeping one for your own rest. When you learn to hold both your gentleness and your boundaries, you become the most quietly powerful presence in any room: the one who makes everyone feel safe, and who is also, at last, safe within herself.');


  // ── CLOSING ──
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, MIST_BLUE, PERIWINKLE, LAVENDER);
  y += 18;
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
  doc.splitTextToSize(p.closing, cw).forEach((ln: string) => { ensure(14); doc.text(ln, ml, y); y += 13.5; });

  // ── FOOTER / PAGE NUMBERS ──
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    gradientBar(doc, ml, ph - 34, cw, 2, heroFrom, heroMid, heroTo);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    doc.text('THE INVISIBLE SELF  \u00B7  WATER + AIR PROFILE', ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save('water-air-misty-shore-profile.pdf');
}
