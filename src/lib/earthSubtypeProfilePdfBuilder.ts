import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
import { getMakeupPalette } from '@/data/makeupData';
import { getNailPalette } from '@/data/nailData';
import { getJewelryData } from '@/data/jewelryData';
import { getDecorData } from '@/data/decorData';
import { hairColorData } from '@/components/HairColorGuide';
import { friendshipProfiles } from '@/data/friendshipCompatibilityData';
import { earthNutritionSubtypes } from '@/data/earthNutritionData';
import { conflictData } from '@/data/conflictData';
import { teamDynamicsData } from '@/data/teamDynamicsData';
import { cinematicData } from '@/components/CinematicPreferences';
import { artisticCorrespondenceData } from '@/components/ArtisticCorrespondence';
import { elementalImbalanceData } from '@/components/ElementalImbalance';

// ── Shared types ──
type RGB = [number, number, number];
interface LabeledItem { label: string; text: string }

// The full, self-contained narrative + design config for one Earth subtype
// profile. Everything the PDF renders comes from this object (plus cross-guide
// data looked up by subtypeId). Mirrors the Water subtype profile shape/layout,
// with a North-facing (Earth) elemental compass.
export interface EarthProfileData {
  subtypeId: string;
  name: string;              // e.g. 'Earth + Earth'
  archetype: string;         // e.g. 'The Forest Floor'
  seasonalName: string;      // e.g. 'True Autumn'
  tagline: string;

  // Design
  heroLabel: string;         // e.g. 'THE FOREST FLOOR'
  footerLabel: string;       // e.g. 'THE INVISIBLE SELF  ·  EARTH + EARTH PROFILE'
  fileName: string;
  primary: RGB;              // EARTH_A role
  secondary: RGB;            // EARTH_B role
  tertiary: RGB;             // EARTH_C role
  deepAccent: RGB;           // EARTH_DEEP role (highlights)

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

  // Direction (North-facing compass)
  directionSacredGeo: string;
  directionLabel: string;    // small compass italic label near secondary dot
  directionAngle: number;    // degrees off North (toward NE positive)
  earthCompassLabel: string; // e.g. 'EARTH' label emphasis text
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

export async function buildEarthSubtypeProfilePDF(p: EarthProfileData): Promise<void> {
  const EARTH_A = p.primary;
  const EARTH_B = p.secondary;
  const EARTH_C = p.tertiary;
  const EARTH_DEEP = p.deepAccent;
  const INK: RGB = [40, 32, 20];
  const SLATE: RGB = [92, 82, 66];
  const GRAY: RGB = [140, 130, 112];

  const earth = elementalTypes.find(t => t.id === 'earth');
  const subtype = earth?.subtypes.find(s => s.id === p.subtypeId);
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette(p.subtypeId);
  const jewelry = getJewelryData('earth', p.subtypeId);
  const decor = getDecorData('earth', p.subtypeId);
  const hairGuide = hairColorData
    .find(e => e.elementId === 'earth')
    ?.subtypeGuides.find(s => s.subtypeId === p.subtypeId);

  const friendship = friendshipProfiles.find(f => f.subtypeId === p.subtypeId);
  const nutrition = earthNutritionSubtypes.find(n => n.id === p.subtypeId);
  const conflict = conflictData.find(e => e.elementId === 'earth')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const team = teamDynamicsData.find(e => e.elementId === 'earth')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const cineFilm = cinematicData.find(e => e.id === 'earth')?.films.find(f => f.id === p.subtypeId);
  const artData = artisticCorrespondenceData.earth?.find(a => a.subtypeId === p.subtypeId);
  const imbalance = elementalImbalanceData.find(e => e.elementId === 'earth')?.subtypes.find(s => s.subtypeId === p.subtypeId);

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
  const heroTextColor: RGB = (heroMid[0] + heroMid[1] + heroMid[2]) / 3 > 210 ? [60, 55, 40] : [255, 255, 255];
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

  const sectionMarker: RGB = colors[0] ? hexToRgb(colors[0].hex) : EARTH_A;
  const safeMarker: RGB = (sectionMarker[0] + sectionMarker[1] + sectionMarker[2]) / 3 > 235 ? EARTH_A : sectionMarker;

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

  const subHeading = (label: string, color: RGB = EARTH_B) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: RGB = EARTH_B) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(248, 245, 238);
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
    doc.setFillColor(249, 246, 240);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    doc.setDrawColor(232, 224, 210); doc.setLineWidth(0.5);
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
      paragraph(p.essenceHighlightSentence, false, EARTH_DEEP);
    } else {
      paragraph(p.essence);
    }
  }
  subHeading('In Nature', EARTH_B);
  paragraph(p.inNature, true);
  chips(p.themes, EARTH_B);

  sectionTitle('Archetypes');
  chips(p.archetypes, EARTH_A);
  paragraph('The Feeling: ' + p.feeling, true);
  paragraph('The Analogy: ' + p.analogy, true);

  subHeading('Celebrities Who Share Your Subtype', EARTH_B);
  paragraph(p.celebIntro, true);
  labeledBullets(p.celebs, EARTH_A);

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
  bullets(p.keyCharacteristics.length ? p.keyCharacteristics : (subtype?.characteristics || []), EARTH_B);

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
  calloutQuote(p.styleMantra, EARTH_B);
  y += 14;

  sectionTitle(p.approachTitle);
  subHeading(p.approachLeadHeading, EARTH_A);
  paragraph(p.approachLead);
  labeledBullets(p.approachItems, EARTH_A);
  p.approachRules.forEach(rule => {
    subHeading(rule.title, EARTH_B);
    paragraph(rule.body);
    paragraph(rule.rule, true);
  });

  sectionTitle(p.assembleTitle);
  subHeading(p.assemblePrincipleHeading, EARTH_A);
  paragraph(p.assemblePrincipleBody);
  subHeading('The Formula', EARTH_B);
  bullets(p.assembleFormula, EARTH_B);
  subHeading('The Everyday Formula', EARTH_B);
  labeledBullets(p.everydayFormula, EARTH_A);
  subHeading('The Impact Formula', EARTH_B);
  paragraph(p.impactIntro);
  labeledBullets(p.impactFormula, EARTH_A);
  subHeading('The Evening Formula', EARTH_B);
  paragraph(p.eveningIntro);
  labeledBullets(p.eveningFormula, EARTH_A);

  sectionTitle(p.gettingItRightTitle);
  p.gettingItRight.forEach(g => {
    subHeading(g.heading, EARTH_A);
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
  subHeading('Make-up Philosophy', EARTH_B);
  paragraph(p.beautyQuote, true);
  paragraph(p.beautyLook, true);
  labeledBullets(p.beautyItems, EARTH_A);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    if (makeup.tips && makeup.tips.length) {
      subHeading('Makeup Tips for ' + p.name, EARTH_B);
      bullets(makeup.tips, EARTH_B);
    }
  }

  // ── JEWELRY ──
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for ' + p.name, EARTH_A);
    labeledBullets(jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })), EARTH_A);
    swatchRow('Best Metals', jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex })), true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', EARTH_B);
      labeledBullets(jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })), EARTH_B);
    }
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', EARTH_A);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })), EARTH_A);
    }
    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', EARTH_B);
      bullets(jewelry.watchRecommendations, EARTH_B);
    }
    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', EARTH_A);
      chips(jewelry.eyewearColors, EARTH_A);
    }
    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', EARTH_B);
      bullets(jewelry.tips, EARTH_B);
    }
    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', EARTH_B);
      bullets(jewelry.avoidList, EARTH_B);
    }
  }

  // ── HAIR COLOR ──
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(p.hairIntro);
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', EARTH_B);
      bullets(hairGuide.tips, EARTH_B);
    }
    hairGuide.bestColors.forEach(cat => swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex }))));
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', EARTH_A);
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
        subHeading('Recommended Finishes', EARTH_A);
        chips(nail.recommendedFinishes, EARTH_A);
      }
      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', EARTH_B);
        labeledBullets(nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })), EARTH_B);
      }
      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for ' + p.name, EARTH_A);
        bullets(nail.generalTips, EARTH_A);
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
    subHeading('The Atmosphere', EARTH_A);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, EARTH_A);
    subHeading('Color Scheme', EARTH_B);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);
    subHeading('Style', EARTH_A);
    labeledBullets(decor.roomStyles.map(s => ({ label: s.name, text: s.description })), EARTH_A);
    subHeading('Materials', EARTH_B);
    chips(decor.materials, EARTH_B);
    subHeading('Textures', EARTH_A);
    chips(decor.textures, EARTH_A);
    if (decor.artStyle && decor.artStyle.length) {
      subHeading('Art Styles to Consider', EARTH_B);
      chips(decor.artStyle, EARTH_B);
    }
  }

  // ── HABITAT ──
  sectionTitle('Habitat');
  paragraph(p.habitatIntro);
  subHeading('The Space Itself', EARTH_B);
  bullets(p.habitatBullets, EARTH_B);
  paragraph(p.habitatWhy, true);

  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote(p.hobbiesTitle, EARTH_A);
  paragraph(p.hobbiesBody);
  bullets(p.hobbiesBullets, EARTH_A);

  // ── NUTRITION ──
  if (nutrition) {
    sectionTitle('Nutrition');
    paragraph('Pattern: ' + nutrition.pattern);
    paragraph('Body wisdom: ' + nutrition.bodyWisdom, true);
    subHeading('Approach', EARTH_B);
    labeledBullets([
      { label: 'Do:', text: nutrition.approach.do },
      { label: 'Don\u2019t:', text: nutrition.approach.dont },
      { label: 'Key:', text: nutrition.approach.key },
    ], EARTH_A);
    subHeading('Eating Rituals', EARTH_B);
    labeledBullets(nutrition.eatingRituals.map(r => ({ label: r.name, text: r.desc })), EARTH_B);
    paragraph('Mantra: \u201C' + nutrition.mantra + '\u201D', true);
  }

  // ── LOVE LANGUAGE ──
  sectionTitle('Love Language');
  paragraph('Receives love through: ' + p.loveLanguage.receivesLoveThrough);
  paragraph('Non-verbal cues: ' + p.loveLanguage.nonVerbalCues);

  // ── RELATIONSHIPS ──
  sectionTitle('Relationships');
  paragraph(p.relationships.inLove);
  subHeading('Your Relationship Strengths', EARTH_A);
  bullets(p.relationships.strengthsInRelationship, EARTH_A);
  subHeading('Your Relationship Growth Edges', EARTH_B);
  bullets(p.relationships.growthInRelationship, EARTH_B);

  // ── FRIENDSHIPS ──
  if (friendship) {
    sectionTitle('Friendships');
    paragraph(friendship.friendshipStyle);
    subHeading('Natural Chemistry', EARTH_A);
    labeledBullets(friendship.naturalChemistry.map(a => ({ label: a.name, text: a.reason })), EARTH_A);
    subHeading('Growth Friendships', EARTH_B);
    labeledBullets(friendship.growthFriendships.map(a => ({ label: a.name, text: a.reason })), EARTH_B);
    subHeading('Friction Points', EARTH_A);
    labeledBullets(friendship.frictionPoints.map(a => ({ label: a.name, text: a.reason })), EARTH_A);
  } else {
    paragraph(p.relationships.friendshipCompatibility);
  }

  // ── ANIMAL AFFINITY ──
  sectionTitle('Animal Affinity');
  paragraph(p.animalAffinity);

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');
  subHeading('Cinematic Preferences', EARTH_B);
  paragraph(p.cinematic);
  if (cineFilm) {
    calloutQuote('\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')', EARTH_B);
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], EARTH_B);
  }
  subHeading('Artistic Correspondence', EARTH_A);
  paragraph(p.artisticCorrespondence);
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', EARTH_A);
    labeledBullets([
      { label: 'Visual Artwork \u2014 \u201C' + artData.visualArtwork.title + '\u201D by ' + artData.visualArtwork.artist, text: artData.visualArtwork.description + '.' },
      { label: 'Movement & Style \u2014 ' + artData.movementStyle.name, text: artData.movementStyle.description + '.' },
      { label: 'Medium Suggestion', text: artData.mediumSuggestion },
      { label: 'Creative Prompt', text: '\u201C' + artData.creativePrompt + '\u201D' },
    ], EARTH_A);
  }

  // ── LIFE PURPOSE ──
  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  ensure(50);
  doc.setFillColor(248, 245, 238);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...EARTH_B);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...EARTH_DEEP);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // ── MANTRAS ──
  sectionTitle('The Mantras');
  bullets(p.mantras, EARTH_B);
  labeledBullets([{ label: 'Meditation:', text: p.mantraMeditation }], EARTH_A);
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
      doc.setFillColor(249, 246, 240);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(232, 224, 210); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }

  // ── YOUR DIRECTION (Elemental Compass — North facing) ──
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', EARTH_B);
  paragraph(p.directionSacredGeo);
  {
    const compR = 72;
    const compH = compR * 2 + 64;
    ensure(compH);
    const cx = ml + cw / 2;
    const cy = y + compR + 18;
    doc.setDrawColor(214, 204, 186); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(232, 224, 210); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');
    doc.setDrawColor(226, 216, 200); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);
    doc.line(cx - compR, cy, cx + compR, cy);
    // North ray (Earth) — points up
    doc.setFillColor(...EARTH_A);
    doc.triangle(cx, cy, cx - 14, cy - compR + 6, cx + 14, cy - compR + 6, 'F');
    // secondary edge dot toward North-by-(direction)
    const ang = (p.directionAngle * Math.PI) / 180;
    const secX = cx + Math.sin(ang) * (compR - 4);
    const secY = cy - Math.cos(ang) * (compR - 4);
    doc.setFillColor(...EARTH_B);
    doc.circle(secX, secY, 4, 'F');
    doc.setDrawColor(...EARTH_B); doc.setLineWidth(0.8);
    doc.line(cx, cy, secX, secY);
    doc.setFillColor(...EARTH_DEEP);
    doc.circle(cx, cy, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('AIR', cx + compR - 6, cy - 12, { align: 'right' });
    doc.text('FIRE', cx, cy + compR - 6, { align: 'center' });
    doc.text('WATER', cx - compR + 10, cy - 12, { align: 'left' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...EARTH_A);
    doc.text('EARTH', cx, cy - compR + 16, { align: 'center' });
    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...EARTH_DEEP);
    doc.text(p.directionLabel, secX + 6, secY - 4, { align: 'left' });
    y = cy + compR + 28;
  }
  labeledBullets(p.directionBullets, EARTH_A);
  calloutQuote(p.directionClosingQuote, EARTH_DEEP);

  // ── CAREER ──
  sectionTitle('Career');
  chips(p.career.drawnTo, EARTH_A);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading(p.idealWorkTitle, EARTH_A);
  paragraph(p.idealWorkBody);
  paragraph('Avoid: ' + p.idealWorkAvoid, true);

  sectionTitle('Your Secret Sauce');
  paragraph(p.secretSauceBody);
  paragraph('Impression: ' + p.secretSauceImpression, true);

  sectionTitle('Leadership');
  subHeading(p.leadershipTitle, EARTH_B);
  paragraph(p.leadershipBody);
  paragraph('Blind spots: ' + p.leadershipBlindspots, true);

  // ── COMMUNICATION ──
  sectionTitle('Communication');
  calloutQuote(p.communicationCallout, EARTH_A);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);

  // ── TEAM DYNAMICS ──
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, EARTH_A);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // ── CONFLICT STYLE ──
  if (conflict) {
    sectionTitle('Elemental Conflict Style');
    calloutQuote(conflict.name, EARTH_B);
    {
      const labelLine = (label: string, value: string) => {
        ensure(15);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...EARTH_A);
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
    subHeading('Triggers', EARTH_B);
    bullets(conflict.triggers, EARTH_B);
    paragraph('Conflict strength: ' + conflict.conflictStrength);
    paragraph('What you need to hear: ' + conflict.whatTheyNeedToHear, true);
  }

  // ── LIFE LESSONS ──
  sectionTitle('Life Lessons');
  paragraph(p.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  bullets(p.coreBlocks, EARTH_A);

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
    subHeading('The ' + p.archetype.replace(/^The /i, '') + ' Imbalance Patterns', EARTH_B);
    imbalancePanel('Excess \u2014 ' + imbalance.excess.title, imbalance.excess.description, [120, 90, 40], [249, 244, 234]);
    imbalancePanel('Deficiency \u2014 ' + imbalance.deficiency.title, imbalance.deficiency.description, [95, 110, 70], [244, 247, 238]);
  }

  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.healing, EARTH_A);

  // ── ELEMENTAL HEALING ──
  sectionTitle('Elemental Healing');
  calloutQuote(p.healingCallout, EARTH_B);
  subHeading(p.calmExcessHeading, EARTH_A);
  paragraph(p.calmExcessIntro, true);
  labeledBullets(p.calmExcessItems, EARTH_A);
  subHeading(p.rebuildHeading, EARTH_B);
  paragraph(p.rebuildIntro, true);
  labeledBullets(p.rebuildItems, EARTH_B);
  subHeading('Spiritual Practices for Realignment', EARTH_A);
  labeledBullets(p.spiritualRealignment, EARTH_A);
  {
    const disclaimer = 'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }

  // ── THE BIORHYTHM ──
  sectionTitle('The Biorhythm');
  subHeading(p.biorhythmRhythmHeading, EARTH_B);
  paragraph('Chronotype: ' + p.chronotype, true);
  paragraph('Peak Time: ' + p.peakTime, true);
  subHeading('Your Biorhythm Schedule', EARTH_A);
  paragraph(p.biorhythmScheduleIntro);
  bullets(p.biorhythmSchedule, EARTH_A);
  paragraph(p.newYearResolution, true);

  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph(p.ultimateGoal);

  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  p.finalSummary.forEach(par => paragraph(par));

  // ── CLOSING ──
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, EARTH_A, EARTH_C, EARTH_B);
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
