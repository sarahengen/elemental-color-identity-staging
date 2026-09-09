import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
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

// ── Shared types ──
type RGB = [number, number, number];
interface LabeledItem { label: string; text: string }

// The full, self-contained narrative + design config for one Water subtype
// profile. Everything the PDF renders comes from this object (plus cross-guide
// data looked up by subtypeId). Mirrors the Water + Air profile shape/layout.
export interface WaterProfileData {
  subtypeId: string;
  name: string;              // e.g. 'Water + Water'
  archetype: string;         // e.g. 'The Forest Lake'
  seasonalName: string;      // e.g. 'True Summer'
  tagline: string;

  // Design
  heroLabel: string;         // e.g. 'THE FOREST LAKE'
  footerLabel: string;       // e.g. 'THE INVISIBLE SELF  ·  WATER + WATER PROFILE'
  fileName: string;
  primary: RGB;              // MIST_BLUE role
  secondary: RGB;            // LAVENDER role
  tertiary: RGB;             // PERIWINKLE role
  deepAccent: RGB;           // DEEP_WATER role (highlights)

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

  // Direction (West-facing compass)
  directionSacredGeo: string;
  directionLabel: string;    // small compass italic label near secondary dot
  directionAngle: number;    // degrees off West (toward NW positive up)
  waterCompassLabel: string; // e.g. 'WATER' label emphasis text
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

export async function buildWaterSubtypeProfilePDF(p: WaterProfileData): Promise<void> {
  const MIST_BLUE = p.primary;
  const LAVENDER = p.secondary;
  const PERIWINKLE = p.tertiary;
  const DEEP_WATER = p.deepAccent;
  const INK: RGB = [20, 28, 44];
  const SLATE: RGB = [71, 85, 105];
  const GRAY: RGB = [120, 130, 150];

  const water = elementalTypes.find(t => t.id === 'water');
  const subtype = water?.subtypes.find(s => s.id === p.subtypeId);
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette(p.subtypeId);
  const jewelry = getJewelryData('water', p.subtypeId);
  const decor = getDecorData('water', p.subtypeId);
  const hairGuide = hairColorData
    .find(e => e.elementId === 'water')
    ?.subtypeGuides.find(s => s.subtypeId === p.subtypeId);

  const friendship = friendshipProfiles.find(f => f.subtypeId === p.subtypeId);
  const nutrition = waterNutritionSubtypes.find(n => n.id === p.subtypeId);
  const conflict = conflictData.find(e => e.elementId === 'water')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const team = teamDynamicsData.find(e => e.elementId === 'water')?.subtypes.find(s => s.subtypeId === p.subtypeId);
  const cineFilm = cinematicData.find(e => e.id === 'water')?.films.find(f => f.id === p.subtypeId);
  const artData = artisticCorrespondenceData.water?.find(a => a.subtypeId === p.subtypeId);
  const imbalance = elementalImbalanceData.find(e => e.elementId === 'water')?.subtypes.find(s => s.subtypeId === p.subtypeId);

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
  const heroTextColor: RGB = (heroMid[0] + heroMid[1] + heroMid[2]) / 3 > 210 ? [60, 60, 70] : [255, 255, 255];
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

  const sectionMarker: RGB = colors[0] ? hexToRgb(colors[0].hex) : MIST_BLUE;
  const safeMarker: RGB = (sectionMarker[0] + sectionMarker[1] + sectionMarker[2]) / 3 > 235 ? MIST_BLUE : sectionMarker;

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

  const subHeading = (label: string, color: RGB = LAVENDER) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: RGB = LAVENDER) => {
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
  const idLabelW = 150;
  const idValueW = cw - idLabelW;
  p.identityRows.forEach((row) => {
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

  // ── YOUR ESSENCE ──
  sectionTitle('Your Essence');
  {
    const idx = p.essenceHighlightSentence ? p.essence.indexOf(p.essenceHighlightSentence) : -1;
    if (idx >= 0) {
      paragraph(p.essence.slice(0, idx).trim());
      paragraph(p.essenceHighlightSentence, false, DEEP_WATER);
    } else {
      paragraph(p.essence);
    }
  }
  subHeading('In Nature', LAVENDER);
  paragraph(p.inNature, true);
  chips(p.themes, LAVENDER);

  sectionTitle('Archetypes');
  chips(p.archetypes, MIST_BLUE);
  paragraph('The Feeling: ' + p.feeling, true);
  paragraph('The Analogy: ' + p.analogy, true);

  subHeading('Celebrities Who Share Your Subtype', LAVENDER);
  paragraph(p.celebIntro, true);
  labeledBullets(p.celebs, MIST_BLUE);

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
  bullets(p.keyCharacteristics.length ? p.keyCharacteristics : (subtype?.characteristics || []), LAVENDER);

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
  calloutQuote(p.styleMantra, LAVENDER);
  y += 14;

  sectionTitle(p.approachTitle);
  subHeading(p.approachLeadHeading, MIST_BLUE);
  paragraph(p.approachLead);
  labeledBullets(p.approachItems, MIST_BLUE);
  p.approachRules.forEach(rule => {
    subHeading(rule.title, LAVENDER);
    paragraph(rule.body);
    paragraph(rule.rule, true);
  });

  sectionTitle(p.assembleTitle);
  subHeading(p.assemblePrincipleHeading, MIST_BLUE);
  paragraph(p.assemblePrincipleBody);
  subHeading('The Formula', LAVENDER);
  bullets(p.assembleFormula, LAVENDER);
  subHeading('The Everyday Formula', LAVENDER);
  labeledBullets(p.everydayFormula, MIST_BLUE);
  subHeading('The Impact Formula', LAVENDER);
  paragraph(p.impactIntro);
  labeledBullets(p.impactFormula, MIST_BLUE);
  subHeading('The Evening Formula', LAVENDER);
  paragraph(p.eveningIntro);
  labeledBullets(p.eveningFormula, MIST_BLUE);

  sectionTitle(p.gettingItRightTitle);
  p.gettingItRight.forEach(g => {
    subHeading(g.heading, MIST_BLUE);
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
  subHeading('Make-up Philosophy', LAVENDER);
  paragraph(p.beautyQuote, true);
  paragraph(p.beautyLook, true);
  labeledBullets(p.beautyItems, MIST_BLUE);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    if (makeup.tips && makeup.tips.length) {
      subHeading('Makeup Tips for ' + p.name, LAVENDER);
      bullets(makeup.tips, LAVENDER);
    }
  }

  // ── JEWELRY ──
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for ' + p.name, MIST_BLUE);
    labeledBullets(jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })), MIST_BLUE);
    swatchRow('Best Metals', jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex })), true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', LAVENDER);
      labeledBullets(jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })), LAVENDER);
    }
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', MIST_BLUE);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })), MIST_BLUE);
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
    paragraph(p.hairIntro);
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', LAVENDER);
      bullets(hairGuide.tips, LAVENDER);
    }
    hairGuide.bestColors.forEach(cat => swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex }))));
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', MIST_BLUE);
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
        subHeading('Recommended Finishes', MIST_BLUE);
        chips(nail.recommendedFinishes, MIST_BLUE);
      }
      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', LAVENDER);
        labeledBullets(nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })), LAVENDER);
      }
      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for ' + p.name, MIST_BLUE);
        bullets(nail.generalTips, MIST_BLUE);
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
    subHeading('The Atmosphere', MIST_BLUE);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, MIST_BLUE);
    subHeading('Color Scheme', LAVENDER);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);
    subHeading('Style', MIST_BLUE);
    labeledBullets(decor.roomStyles.map(s => ({ label: s.name, text: s.description })), MIST_BLUE);
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
  paragraph(p.habitatIntro);
  subHeading('The Space Itself', LAVENDER);
  bullets(p.habitatBullets, LAVENDER);
  paragraph(p.habitatWhy, true);

  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote(p.hobbiesTitle, MIST_BLUE);
  paragraph(p.hobbiesBody);
  bullets(p.hobbiesBullets, MIST_BLUE);

  // ── NUTRITION ──
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

  // ── FRIENDSHIPS ──
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
  paragraph(p.animalAffinity);

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');
  subHeading('Cinematic Preferences', LAVENDER);
  paragraph(p.cinematic);
  if (cineFilm) {
    calloutQuote('\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')', LAVENDER);
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], LAVENDER);
  }
  subHeading('Artistic Correspondence', MIST_BLUE);
  paragraph(p.artisticCorrespondence);
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', MIST_BLUE);
    labeledBullets([
      { label: 'Visual Artwork \u2014 \u201C' + artData.visualArtwork.title + '\u201D by ' + artData.visualArtwork.artist, text: artData.visualArtwork.description + '.' },
      { label: 'Movement & Style \u2014 ' + artData.movementStyle.name, text: artData.movementStyle.description + '.' },
      { label: 'Medium Suggestion', text: artData.mediumSuggestion },
      { label: 'Creative Prompt', text: '\u201C' + artData.creativePrompt + '\u201D' },
    ], MIST_BLUE);
  }

  // ── LIFE PURPOSE ──
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
  bullets(p.mantras, LAVENDER);
  labeledBullets([{ label: 'Meditation:', text: p.mantraMeditation }], MIST_BLUE);
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

  // ── YOUR DIRECTION (Elemental Compass — West facing) ──
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', LAVENDER);
  paragraph(p.directionSacredGeo);
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
    // West ray (Water)
    doc.setFillColor(...MIST_BLUE);
    doc.triangle(cx, cy, cx - compR + 6, cy - 14, cx - compR + 6, cy + 14, 'F');
    // secondary edge dot toward West-by-(direction)
    const ang = (p.directionAngle * Math.PI) / 180;
    const secX = cx - Math.cos(ang) * (compR - 4);
    const secY = cy - Math.sin(ang) * (compR - 4);
    doc.setFillColor(...LAVENDER);
    doc.circle(secX, secY, 4, 'F');
    doc.setDrawColor(...LAVENDER); doc.setLineWidth(0.8);
    doc.line(cx, cy, secX, secY);
    doc.setFillColor(...DEEP_WATER);
    doc.circle(cx, cy, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('EARTH', cx, cy - compR + 6, { align: 'center' });
    doc.text('AIR', cx + compR - 6, cy + 12, { align: 'right' });
    doc.text('FIRE', cx, cy + compR - 6, { align: 'center' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...MIST_BLUE);
    doc.text('WATER', cx - compR + 10, cy - 6, { align: 'left' });
    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...DEEP_WATER);
    doc.text(p.directionLabel, secX + 6, secY - 4, { align: 'left' });
    y = cy + compR + 28;
  }
  labeledBullets(p.directionBullets, MIST_BLUE);
  calloutQuote(p.directionClosingQuote, DEEP_WATER);

  // ── CAREER ──
  sectionTitle('Career');
  chips(p.career.drawnTo, MIST_BLUE);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading(p.idealWorkTitle, MIST_BLUE);
  paragraph(p.idealWorkBody);
  paragraph('Avoid: ' + p.idealWorkAvoid, true);

  sectionTitle('Your Secret Sauce');
  paragraph(p.secretSauceBody);
  paragraph('Impression: ' + p.secretSauceImpression, true);

  sectionTitle('Leadership');
  subHeading(p.leadershipTitle, LAVENDER);
  paragraph(p.leadershipBody);
  paragraph('Blind spots: ' + p.leadershipBlindspots, true);

  // ── COMMUNICATION ──
  sectionTitle('Communication');
  calloutQuote(p.communicationCallout, MIST_BLUE);
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
          if (i === 0) { doc.text(ln, ml + lw, y); } else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
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
  paragraph(p.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  bullets(p.coreBlocks, MIST_BLUE);

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
    subHeading('The ' + p.archetype.replace(/^The /i, '') + ' Imbalance Patterns', LAVENDER);
    imbalancePanel('Excess \u2014 ' + imbalance.excess.title, imbalance.excess.description, [70, 110, 150], [240, 245, 250]);
    imbalancePanel('Deficiency \u2014 ' + imbalance.deficiency.title, imbalance.deficiency.description, [130, 120, 175], [246, 244, 251]);
  }

  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.healing, MIST_BLUE);

  // ── ELEMENTAL HEALING ──
  sectionTitle('Elemental Healing');
  calloutQuote(p.healingCallout, LAVENDER);
  subHeading(p.calmExcessHeading, MIST_BLUE);
  paragraph(p.calmExcessIntro, true);
  labeledBullets(p.calmExcessItems, MIST_BLUE);
  subHeading(p.rebuildHeading, LAVENDER);
  paragraph(p.rebuildIntro, true);
  labeledBullets(p.rebuildItems, LAVENDER);
  subHeading('Spiritual Practices for Realignment', MIST_BLUE);
  labeledBullets(p.spiritualRealignment, MIST_BLUE);
  {
    const disclaimer = 'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }

  // ── THE BIORHYTHM ──
  sectionTitle('The Biorhythm');
  subHeading(p.biorhythmRhythmHeading, LAVENDER);
  paragraph('Chronotype: ' + p.chronotype, true);
  paragraph('Peak Time: ' + p.peakTime, true);
  subHeading('Your Biorhythm Schedule', MIST_BLUE);
  paragraph(p.biorhythmScheduleIntro);
  bullets(p.biorhythmSchedule, MIST_BLUE);
  paragraph(p.newYearResolution, true);

  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph(p.ultimateGoal);

  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  p.finalSummary.forEach(par => paragraph(par));

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
    doc.text(p.footerLabel, ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save(p.fileName);
}
