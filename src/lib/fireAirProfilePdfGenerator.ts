import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
import { fireAirProfile } from '@/data/fireAirProfile';
import { getMakeupPalette } from '@/data/makeupData';
import { getNailPalette } from '@/data/nailData';
import { getJewelryData } from '@/data/jewelryData';
import { getDecorData } from '@/data/decorData';
import { hairColorData } from '@/components/HairColorGuide';
import { friendshipProfiles } from '@/data/friendshipCompatibilityData';
import { fireNutritionSubtypes } from '@/data/fireNutritionData';
import { conflictData } from '@/data/conflictData';
import { teamDynamicsData } from '@/data/teamDynamicsData';
import { cinematicData } from '@/components/CinematicPreferences';
import { artisticCorrespondenceData } from '@/components/ArtisticCorrespondence';
import { elementalImbalanceData } from '@/components/ElementalImbalance';

// Fire+Air electric / neon palette
const NEON_PINK: [number, number, number] = [255, 0, 255];
const ELECTRIC_BLUE: [number, number, number] = [0, 102, 255];
const VIOLET: [number, number, number] = [139, 0, 255];
const INK: [number, number, number] = [12, 14, 30];
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

export async function generateFireAirProfilePDF(): Promise<void> {
  const p = fireAirProfile;

  const fire = elementalTypes.find(t => t.id === 'fire');
  const subtype = fire?.subtypes.find(s => s.id === 'fire-air');
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette('fire-air');
  const jewelry = getJewelryData('fire', 'fire-air');
  const decor = getDecorData('fire', 'fire-air');
  const hairGuide = hairColorData
    .find(e => e.elementId === 'fire')
    ?.subtypeGuides.find(s => s.subtypeId === 'fire-air');

  // Cross-guide Fire+Air content (single source of truth — pulled from each guide's data)
  const friendship = friendshipProfiles.find(f => f.subtypeId === 'fire-air');
  const nutrition = fireNutritionSubtypes.find(n => n.id === 'fire-air');
  const fireConflict = conflictData.find(e => e.elementId === 'fire');
  const conflict = fireConflict?.subtypes.find(s => s.subtypeId === 'fire-air');
  const fireTeam = teamDynamicsData.find(e => e.elementId === 'fire');
  const team = fireTeam?.subtypes.find(s => s.subtypeId === 'fire-air');
  // Arts — actual Fire+Air film recommendation & suggested artwork (single source of truth)
  const fireFilms = cinematicData.find(e => e.id === 'fire');
  const cineFilm = fireFilms?.films.find(f => f.id === 'fire-air');
  const fireArt = artisticCorrespondenceData.fire;
  const artData = fireArt?.find(a => a.subtypeId === 'fire-air');
  // Out of Balance — actual Fire+Air imbalance patterns (single source of truth)
  const fireImbalance = elementalImbalanceData.find(e => e.elementId === 'fire');
  const imbalance = fireImbalance?.subtypes.find(s => s.subtypeId === 'fire-air');


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
  // Banner uses: linear-gradient(135deg, colors[0].hex + "dd", colors[1].hex + "dd")
  // The "dd" alpha (~0.867) is composited over the white page, so replicate that blend here.
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
  doc.text('THE ILLUMINATING SPARK', pw / 2, 56, { align: 'center' });

  doc.setFontSize(40);
  doc.setTextColor(255, 255, 255);
  doc.text('Fire + Air', pw / 2, 110, { align: 'center' });

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

  // ── ESSENCE ──
  // Section title marker bars are tinted with the subtype's colors[0] hex
  // so the document's accent is driven by the subtype palette.
  const sectionMarker: [number, number, number] = colors[0] ? hexToRgb(colors[0].hex) : ELECTRIC_BLUE;
  const sectionTitle = (label: string) => {
    // Extra breathing room between main sections
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
    y += 32; // extra space after the chip graphics
  };

  // Bullet list helper with a colored dot marker
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

  // Bullet list with a bold lead-in label per item
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

  // Sub-heading helper (smaller than sectionTitle)
  const subHeading = (label: string, color: [number, number, number] = VIOLET) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  // Italic callout block (used for mantras / pull quotes)
  const calloutQuote = (text: string, accent: [number, number, number] = VIOLET) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(245, 240, 255);
    doc.roundedRect(ml, y - 6, cw, qLines.length * 14 + 18, 6, 6, 'F');
    doc.setFillColor(accent[0], accent[1], accent[2]);
    doc.rect(ml, y - 6, 3, qLines.length * 14 + 18, 'F');
    doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(accent[0], accent[1], accent[2]);
    let qy = y + 8;
    qLines.forEach(ln => { doc.text(ln, ml + 14, qy); qy += 14; });
    y = qy + 12;
  };

  // ── BEAUTY / COLOR SWATCH ROW ──
  // (Defined up here so the relocated Color/Beauty/Jewelry/Hair sections can use it.)
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
    y += sh + (showHex ? 40 : 32); // extra trailing space after the swatch graphics
  };


  // ── CORE ELEMENTAL IDENTITY (summary at the top, under the header) ──
  sectionTitle('Core Elemental Identity');
  const identityRows: { label: string; value: string }[] = [
    { label: 'Elemental Signature', value: 'Fire + Air (Fire as Dominant, Air as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Winter into Spring' },
    { label: 'Core Mantra', value: '\u201CI AM the shock of new life.\u201D' },
  ];
  const idLabelW = 150;
  const idValueW = cw - idLabelW;
  identityRows.forEach((row, i) => {
    const valueLines = doc.splitTextToSize(row.value, idValueW - 20) as string[];
    const rowH = Math.max(24, valueLines.length * 13 + 11);
    ensure(rowH);
    // alternating soft tint background (matches the screenshot's cream rows)
    doc.setFillColor(253, 248, 240);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    // label cell
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    // value cell
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    // divider line
    doc.setDrawColor(230, 222, 210); doc.setLineWidth(0.5);
    doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
    y += rowH;
  });
  y += 14;


  sectionTitle('Your Essence');
  // Render the essence, but highlight the closing color-advice sentence in a different text color.
  {
    const highlightSentence =
      'You look best in clear, vivid, highly saturated colors with cool undertones that reflect your optimistic and generative state, like bold luminous neon light.';
    const idx = p.essence.indexOf(highlightSentence);
    if (idx >= 0) {
      const leadText = p.essence.slice(0, idx).trim();
      paragraph(leadText);
      // Highlighted sentence in a different color (electric blue)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...ELECTRIC_BLUE);
      const hLines = doc.splitTextToSize(highlightSentence, cw) as string[];
      hLines.forEach(ln => { ensure(15); doc.text(ln, ml, y); y += 14.5; });
      y += 8;
    } else {
      paragraph(p.essence);
    }
  }

  subHeading('In Nature', VIOLET);
  paragraph(p.inNature, true);
  chips(p.themes, VIOLET);

  sectionTitle('Archetypes');
  chips(p.archetypes, NEON_PINK);

  // Overview paragraph above the Energy & Vibration section
  paragraph('The Feeling: \u201CI am the moment before the storm breaks \u2014 and the thunder that follows.\u201D', true);
  paragraph('The Analogy: Think of a lightning bolt \u2014 sudden, brilliant, transformative. It doesn\u2019t ask permission; it simply strikes. It illuminates the landscape for an instant, revealing what was hidden in darkness. This is your energy: catalytic, illuminating, and impossible to ignore.', true);

  // ── CELEBRITIES WHO SHARE THIS SUBTYPE (under The Analogy) ──
  subHeading('Celebrities Who Share Your Subtype', VIOLET);
  paragraph('Famous faces who embody the Illuminating Spark \u2014 bright, clear, electric coloring that comes alive in vivid, saturated colors.', true);
  labeledBullets([
    { label: 'Katy Perry', text: 'Bright, clear coloring that comes alive in electric blue and vivid fuchsia.' },
    { label: 'Zooey Deschanel', text: 'Bright blue eyes and dark hair with clear, vivid coloring perfect for saturated brights.' },
    { label: 'Lucy Liu', text: 'Clear, bright features that shine in electric colors and high-contrast combinations.' },
    { label: 'Mulan (fictional)', text: 'The warrior princess with bright, clear coloring and dynamic energy.' },
  ], NEON_PINK);


  sectionTitle('Energy & Vibration');
  paragraph(p.energy);
  paragraph(p.vibration);
  paragraph(p.blessing, true);
  paragraph('You are fire given reach. Where Fire alone burns in one place, your Fire has been carried by Air into motion \u2014 sudden, electric, impossible to ignore. You arrive the way a current arrives: fast, charged, and immediately felt. Where other fires warm a room, you galvanize it. Your presence does not invite people to relax \u2014 it wakes them up, often before they realize they were asleep.');
  paragraph('Air gives your Fire something pure Fire alone does not have: distance, perspective, the ability to see the whole field before acting. From that combination, something extraordinary emerges \u2014 the courage to act first. While others are still deliberating, still waiting for permission, still circling the question of whether change is really necessary, you have already seen it. Your clarity is not slow or considered. It is instant \u2014 a flash that illuminates the entire landscape in a single strike, leaving no question about what needs to happen next.');
  paragraph('You are not here to comfort. You are here to catalyze. Your gift is revelation \u2014 the particular, electrifying capacity to show people what they could not yet see, to wake what has gone dormant, to break through stagnation and hesitation. This is rare and it is not always comfortable. People may not always thank you in the moment for the shock of your clarity. But they will remember the moment everything changed \u2014 and they will know it began with you.');
  paragraph('You are here to illuminate. To awaken. To carry Fire\u2019s force on Air\u2019s currents, wherever it is needed most.');


  // ── COLOR & BEAUTY PILLAR (relocated to sit under Energy & Vibration) ──

  // ── SEASONAL MATCH (from the subtype page sidebar "Winter Season" panel) ──
  sectionTitle('Seasonal Match');
  paragraph(
    'Fire types belong to the ' + (fire?.season || 'Winter') +
    ' seasonal color palette, characterized by cool undertones, high contrast, and clear, saturated colors.',
  );

  // ── KEY CHARACTERISTICS (its own main section) ──
  sectionTitle('Key Characteristics');
  bullets(subtype?.characteristics || [], VIOLET);


  // ── THE COLOR PALETTE (full palette with hex codes) ──
  sectionTitle('Your Color Palette (with Hex Codes)');
  paragraph('Your signature Fire + Air palette \u2014 clear, vivid, highly saturated colors with cool undertones, like bold luminous neon light. Each swatch includes its exact hex code.');
  swatchRow('Primary Colors', colors.filter(c => c.category === 'primary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Secondary Colors', colors.filter(c => c.category === 'secondary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Accent Colors', colors.filter(c => c.category === 'accent').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Neutrals', colors.filter(c => c.category === 'neutral').map(c => ({ name: c.name, hex: c.hex })), true);

  // ── STYLE & PHILOSOPHY (relocated to sit above the Beauty Palette) ──
  sectionTitle('Style & Philosophy');


  paragraph('\u201CI dress to illuminate, not to warm.\u201D', true);
  paragraph('The Illuminating Spark approaches style as a form of revelation. Your clothing is not about comfort, tradition, or fitting in. It is about catalytic clarity\u2014the sudden, unmistakable expression of your electric nature. You dress to wake people up, to make them see something new, to be the spark that shifts the energy of any room.');
  calloutQuote('Your Style Mantra: \u201CIf it doesn\u2019t feel like a revelation, it\u2019s not for me.\u201D', VIOLET);
  y += 14; // extra space under the style mantra


  // How the Illuminating Spark Approaches Color
  sectionTitle('How the Illuminating Spark Approaches Color');
  subHeading('The Electric Palette', NEON_PINK);
  paragraph('Your colors are not warm\u2014they are brilliant. Not soft\u2014sharp. Not comforting\u2014illuminating. You are drawn to colors that seem to hum with their own energy:');
  labeledBullets([
    { label: 'Signature', text: 'Electric Fuchsia, Hot Pink, Sharp Coral, Electric Purple: Colors that demand attention\u2014the visual equivalent of a spark.' },
    { label: 'Anchors', text: 'Cool Charcoal, Deep Navy, Crisp White, Soft Grey: Clean, cool foundations that let your electric colors sing.' },
    { label: 'Connectors', text: 'Icy Lavender, Cool Mint, Pale Turquoise: Cool, crisp transitions that keep the energy flowing.' },
    { label: 'Luminous', text: 'Silver, Platinum, Diamond White, Iridescent: The light of the spark itself\u2014pure, unmediated, brilliant.' },
  ], NEON_PINK);

  subHeading('The Temperature Rule', VIOLET);
  paragraph('Your palette is cool-to-neutral. You do not wear warm colors unless they are sharpened by a cool undertone (like a coral that leans into pink rather than orange). Warm, earthy tones feel heavy, muddy, and deadening on you.');
  paragraph('The Rule: \u201CIf it doesn\u2019t feel like it could spark, it\u2019s not for me.\u201D', true);

  subHeading('The Clarity Rule', VIOLET);
  paragraph('Your colors are clear and saturated. You cannot wear muted, dusty, or greyed-out tones. They feel like fog on your clarity. You need colors that are unmistakable\u2014that announce themselves without apology.');
  paragraph('The Rule: \u201CIf it\u2019s not crystal clear, it\u2019s not speaking my language.\u201D', true);

  subHeading('The Contrast Rule', VIOLET);
  paragraph('You need high contrast. Your energy is electric, and your colors must match that energy. The combination of crisp white with deep charcoal, or electric fuchsia with cool navy, creates the visual tension that feels like you.');
  paragraph('The Rule: \u201CI need the spark of opposition\u2014light against dark, bright against cool.\u201D', true);

  // How the Illuminating Spark Assembles an Outfit
  sectionTitle('How the Illuminating Spark Assembles an Outfit');
  subHeading('The Principle: One Spark, One Foundation', NEON_PINK);
  paragraph('You are not a maximalist. You are a precisionist. Your outfit should have one clear focal point\u2014the \u201Cspark\u201D\u2014and everything else should support it.');
  subHeading('The Formula', VIOLET);
  bullets([
    'Anchor (60%): A clean, cool, architectural foundation in your Anchor colors.',
    'Connector (25%): A transitional piece that bridges the anchor to the spark.',
    'Spark (15%): One electric statement piece that demands attention.',
  ], VIOLET);

  subHeading('The Everyday Formula', VIOLET);
  labeledBullets([
    { label: 'Anchor', text: 'Crisp white shirt + charcoal trousers: Clean, cool foundation.' },
    { label: 'Connector', text: 'Silver necklace or icy lavender cardigan: Transition that keeps the energy flowing.' },
    { label: 'Spark', text: 'Electric fuchsia heels or a magenta scarf: The moment of ignition\u2014the thing people notice.' },
  ], ELECTRIC_BLUE);

  subHeading('The Impact Formula', VIOLET);
  paragraph('For moments when you need to command attention:');
  labeledBullets([
    { label: 'Anchor', text: 'Deep navy or cool charcoal suit: The clean, sharp foundation of authority.' },
    { label: 'Connector', text: 'Silver or platinum accessory: The cool, precise bridge.' },
    { label: 'Spark', text: 'Electric blue blouse or hot pink bag: The unforgettable moment of clarity.' },
  ], ELECTRIC_BLUE);

  subHeading('The Evening Formula', VIOLET);
  paragraph('For moments of revelation and connection:');
  labeledBullets([
    { label: 'Anchor', text: 'Little black dress in a sharp, architectural cut: The clean foundation.' },
    { label: 'Connector', text: 'Silver or diamond jewelry: The refined transition.' },
    { label: 'Spark', text: 'Electric fuchsia lipstick or a clutch in an unexpected bright: The spark that makes you unforgettable.' },
  ], ELECTRIC_BLUE);

  // Getting It Right
  sectionTitle('Getting It Right: The Illuminating Spark at Their Best');

  subHeading('The Right Proportion', NEON_PINK);
  paragraph('You understand that one spark is enough. A single electric accessory in an otherwise clean, architectural outfit is more powerful than head-to-toe chaos.');
  paragraph('Right Example: Charcoal trousers, crisp white shirt, and electric blue heels. The outfit is clean, the spark is unmistakable.');
  paragraph('Wrong Example: Electric fuchsia top, bright yellow skirt, and magenta shoes. The eye doesn\u2019t know where to land. The spark is scattered.', true);

  subHeading('The Right Architecture', NEON_PINK);
  paragraph('You understand that your colors need a clean structure. Your outfit should have clear lines, sharp tailoring, and a sense of precision.');
  paragraph('Right Example: A crisp, architectural blazer in cool charcoal with clean-cut trousers. The structure lets the spark shine.');
  paragraph('Wrong Example: Soft, flowing, unstructured pieces that blur the lines. You need definition, not draping.', true);

  subHeading('The Right Accessory', NEON_PINK);
  paragraph('You understand that accessories are not decoration\u2014they are amplifiers. One perfect piece is better than many.');
  paragraph('Right Example: A single, architectural silver cuff or a minimalist geometric watch. Clean, precise, unmistakable.');
  paragraph('Wrong Example: Layering many small pieces that compete with one another and dull the spark.', true);

  // Wear This / Avoid This (kept from the original style section)
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

  // Make-up Philosophy (under the Beauty Palette)
  subHeading('Make-up Philosophy', VIOLET);
  paragraph('\u201CMakeup as Charge.\u201D', true);
  paragraph('The Look: Luminous, awake, electric. Skin that looks like it\u2019s catching light from somewhere just out of view.', true);
  labeledBullets([
    { label: 'The Canvas', text: 'Dewy, luminous finish. Light coverage that lets the skin breathe and glow \u2014 never matte, never flat.' },
    { label: 'The Eyes', text: 'One unexpected flash of color \u2014 electric coral, lightning yellow, or vivid orange \u2014 swept once across the lid or as eyeliner. Clean black liner, sharp and quick.' },
    { label: 'The Brows', text: 'Bold, defined, slightly lifted. A brow that looks like it\u2019s already mid-thought.' },
    { label: 'The Lips', text: 'A bright, clean magenta or cool bright red. Glossy rather than matte \u2014 movement, not stillness.' },
    { label: 'The Cheeks', text: 'A flush of bright red or pink high on the cheekbone, as if just having run somewhere important. Highlighter on the high points only \u2014 catch the light, don\u2019t flood it.' },
  ], NEON_PINK);
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
    subHeading('Metals for Fire + Air', ELECTRIC_BLUE);
    labeledBullets(
      jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })),
      ELECTRIC_BLUE,
    );
    // Best metals plus the Antique Gold accent swatch (if present for this subtype)
    const bestMetals = jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex }));
    const antiqueGold = jewelry.metals.find(m => m.name === 'Antique Gold');
    if (antiqueGold) bestMetals.push({ name: antiqueGold.name, hex: antiqueGold.hex });
    swatchRow('Best Metals', bestMetals, true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));

    // Jewelry styles
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', NEON_PINK);
      labeledBullets(
        jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })),
        NEON_PINK,
      );
    }

    // Accessory styles & color palette
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', VIOLET);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(
        jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })),
        VIOLET,
      );
    }

    // Watch recommendations
    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', ELECTRIC_BLUE);
      bullets(jewelry.watchRecommendations, ELECTRIC_BLUE);
    }

    // Eyewear colors
    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', VIOLET);
      chips(jewelry.eyewearColors, VIOLET);
    }

    // Pro tips
    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', NEON_PINK);
      bullets(jewelry.tips, NEON_PINK);
    }

    // What to avoid
    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', NEON_PINK);
      bullets(jewelry.avoidList, NEON_PINK);
    }
  }

  // ── HAIR COLOR ──
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(
      'Your bright, high-contrast coloring calls for clear, vivid hair shades. Choose brilliant, glossy colors and avoid anything muted, dusty, or warm that dulls your spark.',
    );
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', VIOLET);
      bullets(hairGuide.tips, VIOLET);
    }
    hairGuide.bestColors.forEach(cat => {
      swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex })));
    });
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', NEON_PINK);
      swatchRow('Shades to Avoid', hairGuide.avoidColors.map(c => ({ name: c.name, hex: c.hex })));
    }

  }

  // ── NAIL COLOR GUIDE ──
  {
    const nail = getNailPalette('fire-air');
    if (nail) {
      sectionTitle('Nail Color Guide');
      paragraph('Perfect polish colors for your Fire + Air coloring \u2014 clear, bright, saturated shades with electric energy that complement your vivid palette.');

      swatchRow('Everyday Neutrals', nail.everydayNeutrals.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Bold Statement', nail.boldStatement.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Seasonal Picks', nail.seasonalPicks.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Special Occasion', nail.specialOccasion.map(c => ({ name: c.name, hex: c.hex })));

      if (nail.recommendedFinishes && nail.recommendedFinishes.length) {
        subHeading('Recommended Finishes', ELECTRIC_BLUE);
        chips(nail.recommendedFinishes, ELECTRIC_BLUE);
      }

      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', VIOLET);
        labeledBullets(
          nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })),
          VIOLET,
        );
      }

      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for Fire + Air', NEON_PINK);
        bullets(nail.generalTips, NEON_PINK);
      }
    }
  }


  // NOTE: "Your Direction" (Elemental Compass) has been relocated to sit
  // directly under "The One Sentence" section further below.





  // ── DECOR ──
  sectionTitle('Decor');
  paragraph(p.living.decor);

  if (decor) {
    // Parse "Name (#RRGGBB)" strings into { name, hex } for swatchRow
    const parseColor = (c: string) => ({
      hex: c.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888',
      name: c.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, ''),
    });

    // Atmosphere graphic (mood expressed in text + keyword chips)
    subHeading('The Atmosphere', NEON_PINK);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, NEON_PINK);

    // Color Scheme (walls / accents / neutrals as swatches)
    subHeading('Color Scheme', VIOLET);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);

    // Style (room styles)
    subHeading('Style', ELECTRIC_BLUE);
    labeledBullets(
      decor.roomStyles.map(s => ({ label: s.name, text: s.description })),
      ELECTRIC_BLUE,
    );

    // Materials & Textures
    subHeading('Materials', VIOLET);
    chips(decor.materials, VIOLET);
    subHeading('Textures', ELECTRIC_BLUE);
    chips(decor.textures, ELECTRIC_BLUE);

    // ── ART STYLES TO CONSIDER (rendered as keyword chips, matching the
    //    Materials / Textures graphics above) ──
    if (decor.artStyle && decor.artStyle.length) {
      subHeading('Art Styles to Consider', NEON_PINK);
      chips(decor.artStyle, NEON_PINK);
    }

  }



  // ── HABITAT ──
  sectionTitle('Habitat');
  paragraph(p.living.habitat);
  subHeading('The Space Itself', VIOLET);
  bullets([
    'Open, adaptable, inspiring',
    'Whiteboards everywhere (ideas must be captured)',
    'Natural light, vibrant colors, unexpected art',
    'A space for connecting people (open kitchen, communal table)',
    'Technology that works seamlessly',
  ], VIOLET);
  paragraph('Why It Works: The Illuminating Spark needs to be where the energy is \u2014 where ideas are born and connections are made. You need spaces that don\u2019t limit you, that adapt to your changing focus.', true);


  // ── HOBBIES (Ideal Day Off, from the Hobbies guide) ──
  sectionTitle('Hobbies');
  calloutQuote('The Festival Day', NEON_PINK);

  paragraph('A day of color, movement, and people. A morning trying something new (a pop-up class, an immersive experience). An afternoon with friends \u2014 brunch, wandering a street fair, exploring a new neighborhood. Evening live music, dancing, or a comedy show. You recharge by experiencing and by connecting.');
  bullets(['Improv classes', 'Discovering new restaurants', 'Planning group adventures', 'Attending festivals', 'Spontaneous road trips', 'TikTok creation'], NEON_PINK);

  // Nutrition (from the Nutrition guide)
  if (nutrition) {
    sectionTitle('Nutrition');
    paragraph('Pattern: ' + nutrition.pattern);
    paragraph('Body wisdom: ' + nutrition.bodyWisdom, true);
    subHeading('Approach', VIOLET);
    labeledBullets([
      { label: 'Do:', text: nutrition.approach.do },
      { label: 'Don\u2019t:', text: nutrition.approach.dont },
      { label: 'Key:', text: nutrition.approach.key },
    ], ELECTRIC_BLUE);
    subHeading('Eating Rituals', VIOLET);
    labeledBullets(nutrition.eatingRituals.map(r => ({ label: r.name, text: r.desc })), VIOLET);
    paragraph('Mantra: \u201C' + nutrition.mantra + '\u201D', true);
  } else {
    paragraph(p.living.nutrition);
  }

  // ── LOVE LANGUAGE (relocated to sit above Relationships & Friendship) ──
  sectionTitle('Love Language');
  paragraph('Receives love through: ' + p.loveLanguage.receivesLoveThrough);
  paragraph('Non-verbal cues: ' + p.loveLanguage.nonVerbalCues);

  // ── RELATIONSHIPS ──
  sectionTitle('Relationships');

  paragraph(p.relationships.inLove);
  subHeading('Your Relationship Strengths', ELECTRIC_BLUE);
  bullets(p.relationships.strengthsInRelationship, ELECTRIC_BLUE);
  subHeading('Your Relationship Growth Edges', NEON_PINK);
  bullets(p.relationships.growthInRelationship, NEON_PINK);

  // Friendship Compatibility (from the Elemental Friendship Compatibility section)
  if (friendship) {
    sectionTitle('Friendships');
    paragraph(friendship.friendshipStyle);
    subHeading('Natural Chemistry', ELECTRIC_BLUE);
    labeledBullets(friendship.naturalChemistry.map(a => ({ label: a.name, text: a.reason })), ELECTRIC_BLUE);
    subHeading('Growth Friendships', NEON_PINK);
    labeledBullets(friendship.growthFriendships.map(a => ({ label: a.name, text: a.reason })), NEON_PINK);
    subHeading('Friction Points', VIOLET);
    labeledBullets(friendship.frictionPoints.map(a => ({ label: a.name, text: a.reason })), VIOLET);
  } else {
    paragraph(p.relationships.friendshipCompatibility);
  }

  // ── ANIMAL AFFINITY ──
  sectionTitle('Animal Affinity');
  paragraph('Firefly / Lightning Bug. The creature that brings light to darkness \u2014 not through heat, but through its own internal, electric illumination. It is delicate but radiant, appearing at the threshold between seasons.');

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');

  subHeading('Cinematic Preferences', VIOLET);
  paragraph(p.arts.cinematic);
  // Your Fire + Air film recommendation (actual film from the Cinematic Preferences guide)
  if (cineFilm) {
    calloutQuote(
      '\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')',
      VIOLET,
    );
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], VIOLET);
  }

  subHeading('Artistic Correspondence', NEON_PINK);
  paragraph(p.arts.artisticCorrespondence);
  // Your suggested art (actual artwork, movement, medium & prompt from the Artistic Correspondence guide)
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', NEON_PINK);

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
    ], NEON_PINK);
  }


  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  // soul's assignment callout
  ensure(50);
  doc.setFillColor(245, 240, 255);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...VIOLET);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...VIOLET);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // ── MANTRAS (under Life Purpose) ──
  sectionTitle('The Mantras');
  bullets([
    '\u201CTo ignite is to serve.\u201D',
    '\u201CNot the sustained flame, but the sudden flash that reveals the path.\u201D',
    '\u201CI am the moment of recognition \u2014 the instant everything changes.\u201D',
    '\u201CTo see clearly is to be responsible for what I see.\u201D',
  ], VIOLET);
  // Meditation lead-in
  labeledBullets([
    { label: 'Meditation:', text: '\u201CWhat needs to be awakened today? Where can I be the spark? What requires sudden clarity?\u201D' },
  ], NEON_PINK);
  paragraph('Shadow Balance: The Illuminating Spark must remember that lightning does not sustain \u2014 it only reveals. You must learn the art of grounding, of nurturing what you have awakened, of moving from revelation to realization.', true);

  // ── ONE SENTENCE (under the Mantras section) ──
  sectionTitle('The One Sentence');
  {
    const oneSentenceRows: { context: string; sentence: string }[] = [
      { context: 'To Yourself', sentence: '\u201CI AM the shock of new life.\u201D' },
      { context: 'At Work', sentence: '\u201CI see the path forward \u2014 let me show you.\u201D' },
      { context: 'In Love', sentence: '\u201CI see who you truly are \u2014 and I am not afraid.\u201D' },
      { context: 'In Crisis', sentence: '\u201CThis is the moment. I will act.\u201D' },
      { context: 'At Rest', sentence: '\u201CI am learning to sustain what I ignite.\u201D' },
    ];
    const ctxW = 120;
    const sentW = cw - ctxW;
    // header row
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
      doc.setFillColor(253, 248, 240);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(230, 222, 210); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }


  // ── YOUR DIRECTION (Elemental Compass — relocated to sit under The One Sentence) ──
  sectionTitle('Your Direction');

  // The Sacred Geography of the Self — framing for the compass below
  subHeading('The Sacred Geography of the Self', VIOLET);
  paragraph('Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self: a map not of land, but of soul. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces \u2014 the horizon it is forever turning toward.');

  // ── FOUR CARDINAL DIRECTIONS GRAPHIC (FIRE highlighted) ──
  {
    const compR = 72;                       // compass radius
    const compH = compR * 2 + 64;           // total block height (incl. labels)
    ensure(compH);
    const cx = ml + cw / 2;                 // compass center x
    const cy = y + compR + 18;              // compass center y

    // outer ring
    doc.setDrawColor(210, 200, 225); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(232, 226, 242); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');

    // cross axes
    doc.setDrawColor(225, 218, 235); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);          // N–S
    doc.line(cx - compR, cy, cx + compR, cy);          // E–W

    // South ray (Fire) — neon gradient wedge toward the bottom
    doc.setFillColor(...NEON_PINK);
    doc.triangle(cx, cy, cx - 14, cy + compR - 6, cx + 14, cy + compR - 6, 'F');
    // leading edge (South-by-Southeast) spark marker
    const sseX = cx + Math.sin((22.5 * Math.PI) / 180) * (compR - 4);
    const sseY = cy + Math.cos((22.5 * Math.PI) / 180) * (compR - 4);
    doc.setFillColor(...ELECTRIC_BLUE);
    doc.circle(sseX, sseY, 4, 'F');
    doc.setDrawColor(...ELECTRIC_BLUE); doc.setLineWidth(0.8);
    doc.line(cx, cy, sseX, sseY);

    // center node
    doc.setFillColor(...VIOLET);
    doc.circle(cx, cy, 4, 'F');

    // cardinal labels — direction + element
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('EARTH', cx, cy - compR + 6, { align: 'center' });
    doc.text('AIR', cx + compR - 6, cy + 12, { align: 'right' });
    doc.text('WATER', cx - compR + 6, cy + 12, { align: 'left' });
    // FIRE label highlighted in neon
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...NEON_PINK);
    doc.text('FIRE', cx, cy + compR - 14, { align: 'center' });

    // leading-edge caption
    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...ELECTRIC_BLUE);
    doc.text('The leading edge \u2014 South-by-Southeast', sseX + 6, sseY + 2, { align: 'left' });

    y = cy + compR + 28;
  }

  // Emphasized direction labels (bold lead-ins) + highlighted quote
  labeledBullets([
    { label: 'Direction', text: 'South-by-Southeast (the leading edge). You face south, but you are always at the very edge of it \u2014 the place where fire begins.' },
    { label: 'The First Light', text: 'The spark that precedes the flame; the beginning of fire. Your direction is toward what is starting, what is emerging, what is not yet burning.' },
    { label: 'Orientation', text: 'You seek beginnings \u2014 the first spark that ignites something new, the possibility that precedes actuality, the dawn of fire.' },
    { label: 'Shadow Orientation', text: 'When lost, you face the spark so long you never let it become flame. You love beginnings so much you fear the middle.' },
  ], NEON_PINK);

  // Highlighted quote
  calloutQuote('\u201CI face the spark. I honor what is beginning.\u201D', ELECTRIC_BLUE);


  // ── CAREER (expanded) ──

  sectionTitle('Career');
  chips(p.career.drawnTo, ELECTRIC_BLUE);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading('The Playground', ELECTRIC_BLUE);
  paragraph('Dynamic, creative, and socially vibrant. A culture that values enthusiasm, experimentation, and cross-pollination. You need variety, human interaction, and permission to be playful. You thrive in marketing, creative agencies, event production, edtech, and innovation labs.');
  paragraph('Avoid: Rigid, siloed, joyless environments where fun is viewed as unprofessional and curiosity is discouraged.', true);

  sectionTitle('Your Secret Sauce');
  paragraph('Your enthusiasm is not naivete; it is catalytic. You need to know that your optimism and creative energy are not \u201Cunserious.\u201D You are the innovation catalyst who prevents teams from stagnating in risk-averse cynicism. Your role is to ask \u201CWhat if we tried something different?\u201D and to make the answer feel exciting, not threatening. Your joy is a professional asset.');
  paragraph('Impression: \u201CHe makes hard problems feel like exciting puzzles. The team works better when he\u2019s present.\u201D', true);

  sectionTitle('Leadership');
  subHeading('The Inspirational Catalyst', VIOLET);
  paragraph('You lead through infectious enthusiasm and creative vision. You walk into a demoralized room and, within 20 minutes, have the team laughing, brainstorming, and believing the impossible is merely difficult. You don\u2019t just set direction \u2014 you generate the emotional fuel for the journey, making people want to do their best work because the work itself feels exciting.');
  paragraph('Blind spots: Your enthusiasm can overwhelm your follow-through. You may launch five initiatives with genuine passion, then struggle to sustain attention on any single one. Pair every inspiration with an implementation partner, and adopt a \u201Cone in, one out\u201D discipline so the team never feels initiative fatigue.', true);

  // ── COMMUNICATION (relocated to sit under Leadership) ──
  sectionTitle('Communication');
  calloutQuote('The Energizing Storyteller', ELECTRIC_BLUE);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);


  // ── TEAM DYNAMICS ──
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, ELECTRIC_BLUE);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // ── CONFLICT STYLE ──
  if (conflict) {
    sectionTitle('Elemental Conflict Style');
    calloutQuote(conflict.name, NEON_PINK);
    {
      const labelLine = (label: string, value: string) => {
        ensure(15);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...NEON_PINK);
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
    subHeading('Triggers', NEON_PINK);
    bullets(conflict.triggers, NEON_PINK);
    paragraph('Conflict strength: ' + conflict.conflictStrength);
    paragraph('What you need to hear: ' + conflict.whatTheyNeedToHear, true);
  }


  // ── LIFE LESSONS ──
  sectionTitle('Life Lessons');
  paragraph(p.growth.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  bullets(p.growth.coreBlocks, NEON_PINK);

  // ── WHEN OUT OF BALANCE ──
  sectionTitle('When Out of Balance');
  paragraph(p.growth.imbalance);

  // Actual Fire+Air imbalance patterns (from the Elemental Imbalance guide),
  // rendered as tinted graphic panels matching the on-screen excess/deficiency cards.
  if (imbalance) {
    // Tinted panel helper: colored heading bar + wrapped description in a soft-fill box
    const imbalancePanel = (
      heading: string,
      body: string,
      accent: [number, number, number],
      fill: [number, number, number],
    ) => {
      const bodyLines = doc.splitTextToSize(body, cw - 28) as string[];
      const boxH = 18 + bodyLines.length * 13 + 12;
      ensure(boxH + 4);
      // soft-fill rounded box with a colored left bar
      doc.setFillColor(fill[0], fill[1], fill[2]);
      doc.roundedRect(ml, y - 4, cw, boxH, 6, 6, 'F');
      doc.setFillColor(accent[0], accent[1], accent[2]);
      doc.rect(ml, y - 4, 3, boxH, 'F');
      // colored heading
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.text(heading, ml + 14, y + 10);
      // body
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      let by = y + 24;
      bodyLines.forEach(ln => { doc.text(ln, ml + 14, by); by += 13; });
      y += boxH + 8;
    };

    subHeading('The Illuminating Spark Imbalance Patterns', VIOLET);
    // Excess — Runaway Spark (red-tinted, matches the on-screen excess card)
    imbalancePanel(
      'Excess \u2014 ' + imbalance.excess.title,
      imbalance.excess.description,
      [200, 50, 60],
      [253, 242, 243],
    );
    // Deficiency — Spark Extinguished (blue-tinted, matches the on-screen deficiency card)
    imbalancePanel(
      'Deficiency \u2014 ' + imbalance.deficiency.title,
      imbalance.deficiency.description,
      [37, 99, 235],
      [240, 245, 253],
    );
  }


  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.growth.healing, ELECTRIC_BLUE);

  // ── ELEMENTAL HEALING (from the Healing guide) ──
  // Each suggestion is broken out individually with a bold lead-in label so the
  // remedies are easy to scan rather than buried in a single run-on sentence.
  sectionTitle('Elemental Healing');
  calloutQuote('Excess: Manic Depletion  /  Deficiency: Apathetic Lethargy', VIOLET);

  // To Calm Excess (Manic Depletion)
  subHeading('To Calm Excess \u2014 Manic Depletion', NEON_PINK);
  paragraph('When your spark overheats into frantic, manic depletion, the goal is to cool, ground, and steady the system:', true);
  labeledBullets([
    { label: 'Herbs', text: 'Lemon Balm & Passionflower \u2014 to calm the nervous system without sedation.' },
    { label: 'Nutrients', text: 'Chromium \u2014 to support blood sugar balance and even out energy spikes.' },
    { label: 'Diet', text: 'A low-glycemic, high-protein diet to prevent the crashes that fuel mania.' },
    { label: 'Rest', text: 'Scheduled \u201Cdowntime\u201D enforced like medicine \u2014 non-negotiable recovery built into your week.' },
    { label: 'Environment', text: 'Cooling blues and greens in your surroundings to soothe an overstimulated mind.' },
  ], NEON_PINK);

  // To Rekindle Deficiency (Apathetic Lethargy)
  subHeading('To Rekindle Deficiency \u2014 Apathetic Lethargy', ELECTRIC_BLUE);
  paragraph('When your spark dims into apathy and lethargy, the goal is to gently reignite mood, movement, and joy:', true);
  labeledBullets([
    { label: 'Herbs', text: 'St. John\u2019s Wort & Maca \u2014 to support dopamine and lift mood.' },
    { label: 'Movement', text: 'Dance or improvisational movement to reconnect with spontaneous joy.' },
    { label: 'Play Therapy', text: 'Joining a fun, low-pressure group activity to rekindle social energy and lightness.' },
  ], ELECTRIC_BLUE);

  // ── SPIRITUAL PRACTICES FOR REALIGNMENT (under Elemental Healing) ──
  subHeading('Spiritual Practices for Realignment', VIOLET);
  labeledBullets([
    { label: 'Primary (Resonance)', text: 'Lucid dreaming or creative visualization. Practices that engage the imagination\u2019s connective power and allow playful exploration of inner realms.' },
    { label: 'Balancing (Counter-Energy)', text: 'Single-pointed concentration (Samatha). Focusing on the breath or a single object \u2014 a candle, a mantra \u2014 to train the mind to stay, building \u201Cmental muscle.\u201D' },
    { label: 'Ritual', text: 'Creating intuitive, non-representational art as a form of prayer. \u201CIdea composting\u201D \u2014 mixing two random concepts in a journal to see what grows.' },
  ], VIOLET);

  // Small-print medical disclaimer for the Elemental Healing section
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
  subHeading('The Mercurial Rhythm', VIOLET);
  paragraph('Chronotype: Variable, often with a sharp morning peak and scattered energy. Needs mental space.', true);
  paragraph('Peak Time: Sharp Early Morning (5\u20139 AM). The mind is clearest before the world\u2019s noise begins.', true);

  subHeading('Your Biorhythm Schedule', ELECTRIC_BLUE);

  paragraph('Peak time: 8\u201311 AM & 4\u20137 PM \u2014 bursts of social, creative energy. Morning and early evening peaks.');
  bullets([
    '7\u20139 AM \u2014 Energetic, social morning. Dance workout, chatting with family/roommates, upbeat music.',
    '9\u201312 PM \u2014 Creative brainstorming and collaborative meetings. Generating ideas, pitching concepts.',
    '1\u20133 PM \u2014 Afternoon slump. Accept and schedule for it: light admin, errands, change of scenery.',
    '4\u20137 PM \u2014 Second social/creative peak. Networking, teaching, rehearsals, hosting.',
    'Evening \u2014 Light, fun dinner. Unstructured play (games, improv). You need active relaxation.',
  ], ELECTRIC_BLUE);
  paragraph(p.growth.newYearResolution, true);



  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph('To become the Eternal Awakener \u2014 whose presence and insight ignite the dormant potential in others, catalyzing change that ripples outward, while learning the patience to sustain what you have awakened.');


  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  paragraph('The Illuminating Spark is not merely a spark \u2014 it is a catalyst for transformation. Your gift is not the warmth of the flame, but the sudden clarity of the lightning bolt. You show people what is possible, reveal the path forward, and awaken the dormant potential in others. Your purpose is to illuminate what was hidden \u2014 and in doing so, to transform everything that follows.');
  paragraph('But the deepest truth of your nature is this: the spark must become the fire, the fire must become the ember, the ember must become the ash, and the ash must become the seed. You are not just the moment of ignition \u2014 you are the beginning of the cycle. And when you learn to tend what you have ignited, you become the most powerful force of transformation in any room: the one who shows the way, and then walks it.');



  // ── CLOSING ──
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, ELECTRIC_BLUE, NEON_PINK, VIOLET);
  y += 18;
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
  doc.splitTextToSize(p.closing, cw).forEach((ln: string) => { ensure(14); doc.text(ln, ml, y); y += 13.5; });

  // ── FOOTER / PAGE NUMBERS ──
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    gradientBar(doc, ml, ph - 34, cw, 2, heroFrom, heroMid, heroTo);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    doc.text('THE INVISIBLE SELF  \u00B7  FIRE + AIR PROFILE', ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save('fire-air-illuminating-spark-profile.pdf');
}
