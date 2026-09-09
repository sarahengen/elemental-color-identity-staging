import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
import { getMakeupPalette } from '@/data/makeupData';
import { getNailPalette } from '@/data/nailData';
import { getJewelryData } from '@/data/jewelryData';
import { getDecorData } from '@/data/decorData';
import { hairColorData } from '@/components/HairColorGuide';
import { friendshipProfiles } from '@/data/friendshipCompatibilityData';
import { airNutritionSubtypes } from '@/data/airNutritionData';
import { conflictData } from '@/data/conflictData';
import { teamDynamicsData } from '@/data/teamDynamicsData';
import { cinematicData } from '@/components/CinematicPreferences';
import { artisticCorrespondenceData } from '@/components/ArtisticCorrespondence';
import { elementalImbalanceData } from '@/components/ElementalImbalance';

// ── Shared types ──
type RGB = [number, number, number];
interface LabeledItem { label: string; text: string }

// The full, self-contained narrative + design config for one Air subtype
// profile. Everything the PDF renders comes from this object (plus cross-guide
// data looked up by subtypeId). Mirrors the Earth/Water subtype profile
// shape/layout, with an East-facing (Air) elemental compass and light,
// airy palette.
export interface AirProfileData {
  subtypeId: string;
  name: string;              // e.g. 'Air + Air'
  archetype: string;         // e.g. 'The Clear Morning Sky'
  seasonalName: string;      // e.g. 'True Spring'
  tagline: string;

  // Design
  heroLabel: string;         // e.g. 'THE CLEAR MORNING SKY'
  footerLabel: string;       // e.g. 'THE INVISIBLE SELF  ·  AIR + AIR PROFILE'
  fileName: string;
  primary: RGB;              // AIR_A role
  secondary: RGB;            // AIR_B role
  tertiary: RGB;             // AIR_C role
  deepAccent: RGB;           // AIR_DEEP role (highlights)

  // Core identity
  identityRows: { label: string; value: string }[];

  // Essence
  essence: string;
  essenceHighlightSentence: string;
  inNature: string;
  themes: string[];
  archetypes: string[];
  feeling: string;
  analogy: string;

  celebIntro: string;
  celebs: LabeledItem[];

  // Energy
  energyParagraphs: string[];
  vibration: string;
  blessing: string;

  seasonalMatch: string;
  keyCharacteristics: string[];

  colorPaletteIntro: string;

  // Style
  styleQuote: string;
  styleBody: string;
  styleMantra: string;
  approachTitle: string;
  approachLeadHeading: string;
  approachLead: string;
  approachItems: LabeledItem[];
  approachRules: { title: string; body: string; rule: string }[];
  assembleTitle: string;
  assemblePrincipleHeading: string;
  assemblePrincipleBody: string;
  assembleFormula: string[];
  everydayFormula: LabeledItem[];
  impactIntro: string;
  impactFormula: LabeledItem[];
  eveningIntro: string;
  eveningFormula: LabeledItem[];
  gettingItRightTitle: string;
  gettingItRight: { heading: string; body: string; right: string; wrong: string }[];
  wearThis: string[];
  avoidThis: string[];

  // Beauty
  beautyQuote: string;
  beautyLook: string;
  beautyItems: LabeledItem[];

  // Intros
  hairIntro: string;
  nailIntro: string;
  decorIntro: string;

  // Habitat
  habitatIntro: string;
  habitatBullets: string[];
  habitatWhy: string;

  // Hobbies
  hobbiesTitle: string;
  hobbiesBody: string;
  hobbiesBullets: string[];

  // Love & relationships
  loveLanguage: { receivesLoveThrough: string; nonVerbalCues: string };
  relationships: { inLove: string; strengthsInRelationship: string[]; growthInRelationship: string[]; friendshipCompatibility: string };

  animalAffinity: string;

  // Arts
  cinematic: string;
  artisticCorrespondence: string;

  // Life purpose
  lifePurpose: { gift: string; spiritualPurpose: string; soulsAssignment: string; inOneSentence: string };

  // Mantras
  mantras: string[];
  mantraMeditation: string;
  shadowBalance: string;

  oneSentenceRows: { context: string; sentence: string }[];

  // Direction (East-facing compass)
  directionSacredGeo: string;
  directionLabel: string;    // small compass italic label near secondary dot
  directionAngle: number;    // degrees clockwise from North (East = 90)
  airCompassLabel: string;   // e.g. 'AIR' label emphasis text
  directionBullets: LabeledItem[];
  directionClosingQuote: string;

  // Career / work
  career: { drawnTo: string[]; why: string };
  idealWorkTitle: string;
  idealWorkBody: string;
  idealWorkAvoid: string;
  secretSauceBody: string;
  secretSauceImpression: string;
  leadershipTitle: string;
  leadershipBody: string;
  leadershipBlindspots: string;

  // Communication
  communicationCallout: string;
  communication: { preferredMedium: string; strengths: string; howOthersReachYou: string };

  // Growth
  lifeLesson: string;
  coreBlocks: string[];
  imbalance: string;

  // Healing
  healing: string[];
  healingCallout: string;
  calmExcessHeading: string;
  calmExcessIntro: string;
  calmExcessItems: LabeledItem[];
  rebuildHeading: string;
  rebuildIntro: string;
  rebuildItems: LabeledItem[];
  spiritualRealignment: LabeledItem[];

  // Biorhythm
  biorhythmRhythmHeading: string;
  chronotype: string;
  peakTime: string;
  biorhythmScheduleIntro: string;
  biorhythmSchedule: string[];
  newYearResolution: string;

  ultimateGoal: string;
  finalSummary: string[];
  closing: string;
}

function hexToRgb(hex: string): RGB {
  const c = hex.replace('#', '');
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function gradientBar(doc: jsPDF, x: number, y: number, w: number, h: number, from: RGB, mid: RGB, to: RGB) {
  const steps = 40;
  const sw = w / steps;
  for (let i = 0; i < steps; i++) {
    const r = i / steps;
    let a: RGB, b: RGB, lr: number;
    if (r < 0.5) { a = from; b = mid; lr = r * 2; } else { a = mid; b = to; lr = (r - 0.5) * 2; }
    const col: RGB = [
      Math.round(a[0] + (b[0] - a[0]) * lr),
      Math.round(a[1] + (b[1] - a[1]) * lr),
      Math.round(a[2] + (b[2] - a[2]) * lr),
    ];
    doc.setFillColor(...col);
    doc.rect(x + i * sw, y, sw + 0.6, h, 'F');
  }
}

export async function buildAirSubtypeProfilePDF(p: AirProfileData): Promise<void> {
  const AIR_A = p.primary;
  const AIR_B = p.secondary;
  const AIR_C = p.tertiary;
  const AIR_DEEP = p.deepAccent;
  // Light, airy ink palette (cool slate blues rather than earthen browns)
  const INK: RGB = [36, 46, 60];
  const SLATE: RGB = [88, 100, 116];
  const GRAY: RGB = [138, 148, 162];

  const air = elementalTypes.find(t => t.id === 'air');
  const subtype = air?.subtypes.find(s => s.id === p.subtypeId);
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette(p.subtypeId);
  const jewelry = getJewelryData('air', p.subtypeId);
  const decor = getDecorData('air', p.subtypeId);
  const hairGuide = hairColorData
    .find(e => e.elementId === 'air')
    ?.subtypeGuides.find(s => s.subtypeId === p.subtypeId);

  const friendship = friendshipProfiles.find(f => f.subtypeId === p.subtypeId);
  const nutrition = airNutritionSubtypes.find(n => n.id === p.subtypeId);
  const conflict = conflictData.find(e => e.elementId === 'air')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const team = teamDynamicsData.find(e => e.elementId === 'air')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const cineFilm = cinematicData.find(e => e.id === 'air')?.films.find(f => f.id === p.subtypeId);
  const artData = artisticCorrespondenceData.air?.find(a => a.subtypeId === p.subtypeId);
  const imbalance = elementalImbalanceData.find(e => e.elementId === 'air')?.subtypes.find(s => s.subtypeId === p.subtypeId);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const ml = 50;
  const cw = pw - 100;
  const mb = 55;
  let y = 0;

  const ensure = (need: number) => { if (y + need > ph - mb) { doc.addPage(); y = 50; } };

  // ── HERO ──
  const blendOverWhite = (hex: string): RGB => {
    const [r, g, b] = hexToRgb(hex);
    const a = 0xdd / 255;
    return [
      Math.round(r * a + 255 * (1 - a)),
      Math.round(g * a + 255 * (1 - a)),
      Math.round(b * a + 255 * (1 - a)),
    ];
  };
  const heroFrom = colors[0] ? blendOverWhite(colors[0].hex) : [255, 255, 255] as RGB;
  const heroTo = colors[1] ? blendOverWhite(colors[1].hex) : heroFrom;
  const heroMid: RGB = [
    Math.round((heroFrom[0] + heroTo[0]) / 2),
    Math.round((heroFrom[1] + heroTo[1]) / 2),
    Math.round((heroFrom[2] + heroTo[2]) / 2),
  ];
  const heroTextColor: RGB = (heroMid[0] + heroMid[1] + heroMid[2]) / 3 > 210 ? [50, 62, 80] : [255, 255, 255];
  gradientBar(doc, 0, 0, pw, 200, heroFrom, heroMid, heroTo);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...heroTextColor);
  doc.text(p.heroLabel, pw / 2, 56, { align: 'center' });

  doc.setFontSize(40);
  doc.text(p.name, pw / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.splitTextToSize(p.tagline, cw - 40).slice(0, 2).forEach((ln: string, i: number) => {
    doc.text(ln, pw / 2, 138 + i * 16, { align: 'center' });
  });

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

  const sectionMarker: RGB = colors[0] ? hexToRgb(colors[0].hex) : AIR_A;
  const safeMarker: RGB = (sectionMarker[0] + sectionMarker[1] + sectionMarker[2]) / 3 > 235 ? AIR_A : sectionMarker;

  const sectionTitle = (label: string) => {
    y += 14;
    ensure(40);
    doc.setFillColor(...safeMarker);
    doc.rect(ml, y - 9, 4, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(label, ml + 12, y + 3);
    y += 22;
  };

  const paragraph = (text: string, italic = false, color: RGB = SLATE) => {
    if (!text) return;
    doc.setFont('helvetica', italic ? 'italic' : 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, cw) as string[];
    lines.forEach(ln => { ensure(15); doc.text(ln, ml, y); y += 14.5; });
    y += 8;
  };

  const chips = (items: string[], from: RGB) => {
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

  const bullets = (items: string[], dot: RGB) => {
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

  const labeledBullets = (items: LabeledItem[], dot: RGB) => {
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

  const subHeading = (label: string, color: RGB = AIR_B) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: RGB = AIR_B) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(243, 248, 252);
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
  const idLabelW = 150;
  const idValueW = cw - idLabelW;
  p.identityRows.forEach((row) => {
    const valueLines = doc.splitTextToSize(row.value, idValueW - 20) as string[];
    const rowH = Math.max(24, valueLines.length * 13 + 11);
    ensure(rowH);
    doc.setFillColor(245, 249, 252);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    doc.setDrawColor(218, 228, 238); doc.setLineWidth(0.5);
    doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
    y += rowH;
  });
  y += 14;

  // ── YOUR ESSENCE ──
  sectionTitle('Your Essence');
  {
    const idx = p.essenceHighlightSentence ? p.essence.indexOf(p.essenceHighlightSentence) : -1;
    if (idx >= 0) {
      paragraph(p.essence.slice(0, idx).trim());
      paragraph(p.essenceHighlightSentence, false, AIR_DEEP);
    } else {
      paragraph(p.essence);
    }
  }
  subHeading('In Nature', AIR_B);
  paragraph(p.inNature, true);
  chips(p.themes, AIR_B);

  sectionTitle('Archetypes');
  chips(p.archetypes, AIR_A);
  paragraph('The Feeling: ' + p.feeling, true);
  paragraph('The Analogy: ' + p.analogy, true);

  subHeading('Celebrities Who Share Your Subtype', AIR_B);
  paragraph(p.celebIntro, true);
  labeledBullets(p.celebs, AIR_A);

  // ── ENERGY & VIBRATION ──
  sectionTitle('Energy & Vibration');
  p.energyParagraphs.forEach(par => paragraph(par));
  paragraph(p.vibration);
  paragraph(p.blessing, true);

  // ── SEASONAL MATCH ──
  sectionTitle('Seasonal Match');
  paragraph(p.seasonalMatch);

  // ── KEY CHARACTERISTICS ──
  sectionTitle('Key Characteristics');
  bullets(p.keyCharacteristics.length ? p.keyCharacteristics : (subtype?.characteristics || []), AIR_B);

  // ── COLOR PALETTE ──
  sectionTitle('Your Color Palette (with Hex Codes)');
  paragraph(p.colorPaletteIntro);
  swatchRow('Primary Colors', colors.filter(c => c.category === 'primary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Secondary Colors', colors.filter(c => c.category === 'secondary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Accent Colors', colors.filter(c => c.category === 'accent').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Neutrals', colors.filter(c => c.category === 'neutral').map(c => ({ name: c.name, hex: c.hex })), true);

  // ── STYLE & PHILOSOPHY ──
  sectionTitle('Style & Philosophy');
  paragraph(p.styleQuote, true);
  paragraph(p.styleBody);
  calloutQuote(p.styleMantra, AIR_B);
  y += 14;

  sectionTitle(p.approachTitle);
  subHeading(p.approachLeadHeading, AIR_A);
  paragraph(p.approachLead);
  labeledBullets(p.approachItems, AIR_A);
  p.approachRules.forEach(rule => {
    subHeading(rule.title, AIR_B);
    paragraph(rule.body);
    paragraph(rule.rule, true);
  });

  sectionTitle(p.assembleTitle);
  subHeading(p.assemblePrincipleHeading, AIR_A);
  paragraph(p.assemblePrincipleBody);
  subHeading('The Formula', AIR_B);
  bullets(p.assembleFormula, AIR_B);
  subHeading('The Everyday Formula', AIR_B);
  labeledBullets(p.everydayFormula, AIR_A);
  subHeading('The Impact Formula', AIR_B);
  paragraph(p.impactIntro);
  labeledBullets(p.impactFormula, AIR_A);
  subHeading('The Evening Formula', AIR_B);
  paragraph(p.eveningIntro);
  labeledBullets(p.eveningFormula, AIR_A);

  sectionTitle(p.gettingItRightTitle);
  p.gettingItRight.forEach(g => {
    subHeading(g.heading, AIR_A);
    paragraph(g.body);
    paragraph('Right Example: ' + g.right);
    paragraph('Wrong Example: ' + g.wrong, true);
  });

  // Wear This / Avoid This
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(20, 120, 80);
  ensure(16); doc.text('WEAR THIS', ml, y); y += 16;
  p.wearThis.forEach(it => {
    ensure(14); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.setTextColor(20, 140, 90); doc.text('+', ml, y);
    doc.setTextColor(...SLATE);
    doc.splitTextToSize(it, cw - 16).forEach((ln: string, i: number) => { doc.text(ln, ml + 14, y + i * 13); });
    y += doc.splitTextToSize(it, cw - 16).length * 13 + 2;
  });
  y += 6;
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(190, 30, 50);
  ensure(16); doc.text('AVOID THIS', ml, y); y += 16;
  p.avoidThis.forEach(it => {
    ensure(14); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
    doc.setTextColor(200, 50, 60); doc.text('\u00D7', ml, y);
    doc.setTextColor(...SLATE);
    doc.splitTextToSize(it, cw - 16).forEach((ln: string, i: number) => { doc.text(ln, ml + 14, y + i * 13); });
    y += doc.splitTextToSize(it, cw - 16).length * 13 + 2;
  });
  y += 10;

  // ── BEAUTY PALETTE ──
  sectionTitle('Beauty Palette');
  subHeading('Make-up Philosophy', AIR_B);
  paragraph(p.beautyQuote, true);
  paragraph(p.beautyLook, true);
  labeledBullets(p.beautyItems, AIR_A);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    if (makeup.tips && makeup.tips.length) {
      subHeading('Makeup Tips for ' + p.name, AIR_B);
      bullets(makeup.tips, AIR_B);
    }
  }

  // ── JEWELRY ──
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for ' + p.name, AIR_A);
    labeledBullets(jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })), AIR_A);
    swatchRow('Best Metals', jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex })), true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', AIR_B);
      labeledBullets(jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })), AIR_B);
    }
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', AIR_A);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })), AIR_A);
    }
    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', AIR_B);
      bullets(jewelry.watchRecommendations, AIR_B);
    }
    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', AIR_A);
      chips(jewelry.eyewearColors, AIR_A);
    }
    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', AIR_B);
      bullets(jewelry.tips, AIR_B);
    }
    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', AIR_B);
      bullets(jewelry.avoidList, AIR_B);
    }
  }

  // ── HAIR COLOR ──
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(p.hairIntro);
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', AIR_B);
      bullets(hairGuide.tips, AIR_B);
    }
    hairGuide.bestColors.forEach(cat => swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex }))));
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', AIR_A);
      swatchRow('Shades to Avoid', hairGuide.avoidColors.map(c => ({ name: c.name, hex: c.hex })));
    }
  }

  // ── NAIL COLOR GUIDE ──
  {
    const nail = getNailPalette(p.subtypeId);
    if (nail) {
      sectionTitle('Nail Color Guide');
      paragraph(p.nailIntro);
      swatchRow('Everyday Neutrals', nail.everydayNeutrals.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Bold Statement', nail.boldStatement.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Seasonal Picks', nail.seasonalPicks.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Special Occasion', nail.specialOccasion.map(c => ({ name: c.name, hex: c.hex })));
      if (nail.recommendedFinishes && nail.recommendedFinishes.length) {
        subHeading('Recommended Finishes', AIR_A);
        chips(nail.recommendedFinishes, AIR_A);
      }
      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', AIR_B);
        labeledBullets(nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })), AIR_B);
      }
      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for ' + p.name, AIR_A);
        bullets(nail.generalTips, AIR_A);
      }
    }
  }

  // ── DECOR ──
  sectionTitle('Decor');
  paragraph(p.decorIntro);
  if (decor) {
    const parseColor = (c: string) => ({
      hex: c.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888',
      name: c.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, ''),
    });
    subHeading('The Atmosphere', AIR_A);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, AIR_A);
    subHeading('Color Scheme', AIR_B);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);
    subHeading('Style', AIR_A);
    labeledBullets(decor.roomStyles.map(s => ({ label: s.name, text: s.description })), AIR_A);
    subHeading('Materials', AIR_B);
    chips(decor.materials, AIR_B);
    subHeading('Textures', AIR_A);
    chips(decor.textures, AIR_A);
    if (decor.artStyle && decor.artStyle.length) {
      subHeading('Art Styles to Consider', AIR_B);
      chips(decor.artStyle, AIR_B);
    }
  }

  // ── HABITAT ──
  sectionTitle('Habitat');
  paragraph(p.habitatIntro);
  subHeading('The Space Itself', AIR_B);
  bullets(p.habitatBullets, AIR_B);
  paragraph(p.habitatWhy, true);

  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote(p.hobbiesTitle, AIR_A);
  paragraph(p.hobbiesBody);
  bullets(p.hobbiesBullets, AIR_A);

  // ── NUTRITION ──
  if (nutrition) {
    sectionTitle('Nutrition');
    paragraph('Pattern: ' + nutrition.pattern);
    paragraph('Body wisdom: ' + nutrition.bodyWisdom, true);
    subHeading('Approach', AIR_B);
    labeledBullets([
      { label: 'Do:', text: nutrition.approach.do },
      { label: 'Don\u2019t:', text: nutrition.approach.dont },
      { label: 'Key:', text: nutrition.approach.key },
    ], AIR_A);
    subHeading('Eating Rituals', AIR_B);
    labeledBullets(nutrition.eatingRituals.map(r => ({ label: r.name, text: r.desc })), AIR_B);
    paragraph('Mantra: \u201C' + nutrition.mantra + '\u201D', true);
  }

  // ── LOVE LANGUAGE ──
  sectionTitle('Love Language');
  paragraph('Receives love through: ' + p.loveLanguage.receivesLoveThrough);
  paragraph('Non-verbal cues: ' + p.loveLanguage.nonVerbalCues);

  // ── RELATIONSHIPS ──
  sectionTitle('Relationships');
  paragraph(p.relationships.inLove);
  subHeading('Your Relationship Strengths', AIR_A);
  bullets(p.relationships.strengthsInRelationship, AIR_A);
  subHeading('Your Relationship Growth Edges', AIR_B);
  bullets(p.relationships.growthInRelationship, AIR_B);

  // ── FRIENDSHIPS ──
  if (friendship) {
    sectionTitle('Friendships');
    paragraph(friendship.friendshipStyle);
    subHeading('Natural Chemistry', AIR_A);
    labeledBullets(friendship.naturalChemistry.map(a => ({ label: a.name, text: a.reason })), AIR_A);
    subHeading('Growth Friendships', AIR_B);
    labeledBullets(friendship.growthFriendships.map(a => ({ label: a.name, text: a.reason })), AIR_B);
    subHeading('Friction Points', AIR_A);
    labeledBullets(friendship.frictionPoints.map(a => ({ label: a.name, text: a.reason })), AIR_A);
  } else {
    paragraph(p.relationships.friendshipCompatibility);
  }

  // ── ANIMAL AFFINITY ──
  sectionTitle('Animal Affinity');
  paragraph(p.animalAffinity);

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');
  subHeading('Cinematic Preferences', AIR_B);
  paragraph(p.cinematic);
  if (cineFilm) {
    calloutQuote('\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')', AIR_B);
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], AIR_B);
  }
  subHeading('Artistic Correspondence', AIR_A);
  paragraph(p.artisticCorrespondence);
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', AIR_A);
    labeledBullets([
      { label: 'Visual Artwork \u2014 \u201C' + artData.visualArtwork.title + '\u201D by ' + artData.visualArtwork.artist, text: artData.visualArtwork.description + '.' },
      { label: 'Movement & Style \u2014 ' + artData.movementStyle.name, text: artData.movementStyle.description + '.' },
      { label: 'Medium Suggestion', text: artData.mediumSuggestion },
      { label: 'Creative Prompt', text: '\u201C' + artData.creativePrompt + '\u201D' },
    ], AIR_A);
  }

  // ── LIFE PURPOSE ──
  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  ensure(50);
  doc.setFillColor(243, 248, 252);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...AIR_B);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...AIR_DEEP);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // ── MANTRAS ──
  sectionTitle('The Mantras');
  bullets(p.mantras, AIR_B);
  labeledBullets([{ label: 'Meditation:', text: p.mantraMeditation }], AIR_A);
  paragraph(p.shadowBalance, true);

  // ── ONE SENTENCE ──
  sectionTitle('The One Sentence');
  {
    const ctxW = 120;
    const sentW = cw - ctxW;
    ensure(22);
    doc.setFillColor(...safeMarker);
    doc.rect(ml, y - 9, cw, 22, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(255, 255, 255);
    doc.text('Context', ml + 10, y + 5);
    doc.text('One Sentence', ml + ctxW, y + 5);
    y += 22;
    p.oneSentenceRows.forEach((row) => {
      const sentLines = doc.splitTextToSize(row.sentence, sentW - 20) as string[];
      const rowH = Math.max(22, sentLines.length * 13 + 9);
      ensure(rowH);
      doc.setFillColor(245, 249, 252);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(218, 228, 238); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }

  // ── YOUR DIRECTION (Elemental Compass — East facing) ──
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', AIR_B);
  paragraph(p.directionSacredGeo);
  {
    const compR = 72;
    const compH = compR * 2 + 64;
    ensure(compH);
    const cx = ml + cw / 2;
    const cy = y + compR + 18;
    doc.setDrawColor(200, 212, 226); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(220, 230, 240); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');
    doc.setDrawColor(212, 224, 236); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);
    doc.line(cx - compR, cy, cx + compR, cy);
    // East ray (Air) — points right, toward the dawn
    doc.setFillColor(...AIR_A);
    doc.triangle(cx, cy, cx + compR - 6, cy - 14, cx + compR - 6, cy + 14, 'F');
    // secondary edge dot toward East-by-(direction)
    const ang = (p.directionAngle * Math.PI) / 180;
    const secX = cx + Math.sin(ang) * (compR - 4);
    const secY = cy - Math.cos(ang) * (compR - 4);
    doc.setFillColor(...AIR_B);
    doc.circle(secX, secY, 4, 'F');
    doc.setDrawColor(...AIR_B); doc.setLineWidth(0.8);
    doc.line(cx, cy, secX, secY);
    doc.setFillColor(...AIR_DEEP);
    doc.circle(cx, cy, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('EARTH', cx, cy - compR + 14, { align: 'center' });
    doc.text('FIRE', cx, cy + compR - 6, { align: 'center' });
    doc.text('WATER', cx - compR + 10, cy + 3, { align: 'left' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...AIR_A);
    doc.text(p.airCompassLabel, cx + compR - 12, cy - 6, { align: 'right' });
    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...AIR_DEEP);
    doc.text(p.directionLabel, secX + 6, secY - 4, { align: 'left' });
    y = cy + compR + 28;
  }
  labeledBullets(p.directionBullets, AIR_A);
  calloutQuote(p.directionClosingQuote, AIR_DEEP);

  // ── CAREER ──
  sectionTitle('Career');
  chips(p.career.drawnTo, AIR_A);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading(p.idealWorkTitle, AIR_A);
  paragraph(p.idealWorkBody);
  paragraph('Avoid: ' + p.idealWorkAvoid, true);

  sectionTitle('Your Secret Sauce');
  paragraph(p.secretSauceBody);
  paragraph('Impression: ' + p.secretSauceImpression, true);

  sectionTitle('Leadership');
  subHeading(p.leadershipTitle, AIR_B);
  paragraph(p.leadershipBody);
  paragraph('Blind spots: ' + p.leadershipBlindspots, true);

  // ── COMMUNICATION ──
  sectionTitle('Communication');
  calloutQuote(p.communicationCallout, AIR_A);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);

  // ── TEAM DYNAMICS ──
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, AIR_A);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // ── CONFLICT STYLE ──
  if (conflict) {
    sectionTitle('Elemental Conflict Style');
    calloutQuote(conflict.name, AIR_B);
    {
      const labelLine = (label: string, value: string) => {
        ensure(15);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...AIR_A);
        doc.text(label, ml, y);
        const lw = doc.getTextWidth(label) + 4;
        doc.setFont('helvetica', 'normal'); doc.setTextColor(...SLATE);
        const valueLines = doc.splitTextToSize(value, cw - lw) as string[];
        valueLines.forEach((ln, i) => {
          if (i === 0) { doc.text(ln, ml + lw, y); } else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
        });
        y += 14.5 + 4;
      };
      labelLine('Archetype: ', conflict.conflictArchetype);
      labelLine('Default response: ', conflict.defaultResponse.toUpperCase());
    }
    paragraph(conflict.defaultResponseDetail);
    subHeading('Triggers', AIR_B);
    bullets(conflict.triggers, AIR_B);
    paragraph('Conflict strength: ' + conflict.conflictStrength);
    paragraph('What you need to hear: ' + conflict.whatTheyNeedToHear, true);
  }

  // ── LIFE LESSONS ──
  sectionTitle('Life Lessons');
  paragraph(p.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  bullets(p.coreBlocks, AIR_A);

  // ── WHEN OUT OF BALANCE ──
  sectionTitle('When Out of Balance');
  paragraph(p.imbalance);
  if (imbalance) {
    const imbalancePanel = (heading: string, body: string, accent: RGB, fill: RGB) => {
      const bodyLines = doc.splitTextToSize(body, cw - 28) as string[];
      const boxH = 18 + bodyLines.length * 13 + 12;
      ensure(boxH + 4);
      doc.setFillColor(fill[0], fill[1], fill[2]);
      doc.roundedRect(ml, y - 4, cw, boxH, 6, 6, 'F');
      doc.setFillColor(accent[0], accent[1], accent[2]);
      doc.rect(ml, y - 4, 3, boxH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.text(heading, ml + 14, y + 10);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      let by = y + 24;
      bodyLines.forEach(ln => { doc.text(ln, ml + 14, by); by += 13; });
      y += boxH + 8;
    };
    subHeading('The ' + p.archetype.replace(/^The /i, '') + ' Imbalance Patterns', AIR_B);
    imbalancePanel('Excess \u2014 ' + imbalance.excess.title, imbalance.excess.description, [70, 110, 160], [237, 244, 250]);
    imbalancePanel('Deficiency \u2014 ' + imbalance.deficiency.title, imbalance.deficiency.description, [150, 125, 70], [250, 246, 238]);
  }

  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.healing, AIR_A);

  // ── ELEMENTAL HEALING ──
  sectionTitle('Elemental Healing');
  calloutQuote(p.healingCallout, AIR_B);
  subHeading(p.calmExcessHeading, AIR_A);
  paragraph(p.calmExcessIntro, true);
  labeledBullets(p.calmExcessItems, AIR_A);
  subHeading(p.rebuildHeading, AIR_B);
  paragraph(p.rebuildIntro, true);
  labeledBullets(p.rebuildItems, AIR_B);
  subHeading('Spiritual Practices for Realignment', AIR_A);
  labeledBullets(p.spiritualRealignment, AIR_A);
  {
    const disclaimer = 'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }

  // ── THE BIORHYTHM ──
  sectionTitle('The Biorhythm');
  subHeading(p.biorhythmRhythmHeading, AIR_B);
  paragraph('Chronotype: ' + p.chronotype, true);
  paragraph('Peak Time: ' + p.peakTime, true);
  subHeading('Your Biorhythm Schedule', AIR_A);
  paragraph(p.biorhythmScheduleIntro);
  bullets(p.biorhythmSchedule, AIR_A);
  paragraph(p.newYearResolution, true);

  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph(p.ultimateGoal);

  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  p.finalSummary.forEach(par => paragraph(par));

  // ── CLOSING ──
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, AIR_A, AIR_C, AIR_B);
  y += 18;
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
  doc.splitTextToSize(p.closing, cw).forEach((ln: string) => { ensure(14); doc.text(ln, ml, y); y += 13.5; });

  // ── FOOTER / PAGE NUMBERS ──
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    gradientBar(doc, ml, ph - 34, cw, 2, heroFrom, heroMid, heroTo);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    doc.text(p.footerLabel, ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save(p.fileName);
}
