import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
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

// ── Shared types ──
type RGB = [number, number, number];

interface LabeledItem { label: string; text: string }

// The narrative shape every Fire subtype profile data module provides.
// (Mirrors fireEarthProfile / fireAirProfile.)
export interface FireProfileData {
  subtypeId: string;
  name: string;
  archetype: string;
  seasonalName: string;
  combination: string;
  tagline: string;
  essence: string;
  inNature: string;
  themes: string[];
  archetypes: string[];
  vibration: string;
  lifePurpose: {
    gift: string;
    spiritualPurpose: string;
    soulsAssignment: string;
    inOneSentence: string;
  };
  loveLanguage: { receivesLoveThrough: string; nonVerbalCues: string };
  communication: { preferredMedium: string; strengths: string; howOthersReachYou: string };
  career: { drawnTo: string[]; why: string };
  style: { wearThis: string[]; avoidThis: string[] };
  growth: { lifeLesson: string; imbalance: string; healing: string[]; newYearResolution: string };
  relationships: {
    inLove: string;
    strengthsInRelationship: string[];
    growthInRelationship: string[];
    friendshipCompatibility: string;
  };
  arts: { cinematic: string; artisticCorrespondence: string };
  closing: string;
}

// All the subtype-specific colors, labels and bespoke prose blocks that vary
// between the four Fire subtypes. Centralised here so the document structure
// and section ordering can be defined exactly once.
export interface FireProfileConfig {
  element: 'fire';
  subtypeId: string;
  heroLabel: string;          // e.g. 'THE ELECTRIC ARC'
  title: string;              // e.g. 'Fire + Fire'
  footerLabel: string;        // e.g. 'THE INVISIBLE SELF  ·  FIRE + FIRE PROFILE'
  fileName: string;           // e.g. 'fire-fire-electric-arc-profile.pdf'

  // Role colours (mirror EMBER / PINE / BURGUNDY roles in the originals)
  primary: RGB;               // strongest accent (chips / "ember")
  secondary: RGB;             // supporting accent (pine)
  tertiary: RGB;              // sub-heading / quote accent (burgundy)
  essenceHighlight: RGB;      // colour used for the highlighted essence sentence

  identityRows: { label: string; value: string }[];
  essenceHighlightSentence: string;

  celebIntro: string;
  celebs: LabeledItem[];

  energyParagraphs: string[];
  feeling: string;
  analogy: string;

  seasonalMatch: string;
  keyCharacteristics: string[];

  colorPaletteIntro: string;

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

  beautyPhilosophyTitle: string;
  beautyQuote: string;
  beautyLook: string;
  beautyItems: LabeledItem[];
  beautyTipsHeading: string;

  hairIntro: string;
  nailIntro: string;
  decorIntro: string;

  habitatBullets: string[];
  habitatWhy: string;

  hobbiesTitle: string;
  hobbiesBody: string;
  hobbiesBullets: string[];

  animalAffinity: string;

  mantras: string[];
  mantraMeditation: string;
  shadowBalance: string;

  oneSentenceRows: { context: string; sentence: string }[];

  directionSacredGeo: string;
  directionLabel: string;        // small compass label
  directionAngle: number;        // degrees off South for the secondary dot
  directionBullets: LabeledItem[];
  directionClosingQuote: string;

  idealWorkTitle: string;
  idealWorkBody: string;
  idealWorkAvoid: string;

  secretSauceBody: string;
  secretSauceImpression: string;

  leadershipTitle: string;
  leadershipBody: string;
  leadershipBlindspots: string;

  communicationCallout: string;
  communicationPreferredLabel: string;

  coreBlocksTitle: string;
  coreBlocksBody: string;

  healingCallout: string;
  calmExcessHeading: string;
  calmExcessIntro: string;
  calmExcessItems: LabeledItem[];
  rebuildHeading: string;
  rebuildIntro: string;
  rebuildItems: LabeledItem[];
  spiritualRealignment: LabeledItem[];

  biorhythmRhythmHeading: string;
  chronotype: string;
  peakTime: string;
  biorhythmScheduleIntro: string;
  biorhythmSchedule: string[];

  ultimateGoal: string;
  finalSummary: string[];
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

export async function buildFireSubtypeProfilePDF(p: FireProfileData, cfg: FireProfileConfig): Promise<void> {
  const EMBER = cfg.primary;
  const PINE = cfg.secondary;
  const BURGUNDY = cfg.tertiary;
  const INK: RGB = [22, 14, 14];
  const SLATE: RGB = [71, 64, 60];
  const GRAY: RGB = [130, 120, 112];

  const fire = elementalTypes.find(t => t.id === cfg.element);
  const subtype = fire?.subtypes.find(s => s.id === cfg.subtypeId);
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette(cfg.subtypeId);
  const jewelry = getJewelryData('fire', cfg.subtypeId);
  const decor = getDecorData('fire', cfg.subtypeId);
  const hairGuide = hairColorData
    .find(e => e.elementId === 'fire')
    ?.subtypeGuides.find(s => s.subtypeId === cfg.subtypeId);

  const friendship = friendshipProfiles.find(f => f.subtypeId === cfg.subtypeId);
  const nutrition = fireNutritionSubtypes.find(n => n.id === cfg.subtypeId);
  const conflict = conflictData.find(e => e.elementId === 'fire')?.subtypes.find(s => s.subtypeId === cfg.subtypeId);
  const team = teamDynamicsData.find(e => e.elementId === 'fire')?.subtypes.find(s => s.subtypeId === cfg.subtypeId);
  const cineFilm = cinematicData.find(e => e.id === 'fire')?.films.find(f => f.id === cfg.subtypeId);
  const artData = artisticCorrespondenceData.fire?.find(a => a.subtypeId === cfg.subtypeId);
  const imbalance = elementalImbalanceData.find(e => e.elementId === 'fire')?.subtypes.find(s => s.subtypeId === cfg.subtypeId);

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
  // For very light palettes (e.g. Pure Fire white), darken the hero text band slightly.
  const heroTextColor: RGB = (heroMid[0] + heroMid[1] + heroMid[2]) / 3 > 210 ? [60, 60, 70] : [255, 255, 255];
  gradientBar(doc, 0, 0, pw, 200, heroFrom, heroMid, heroTo);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...heroTextColor);
  doc.text(cfg.heroLabel, pw / 2, 56, { align: 'center' });

  doc.setFontSize(40);
  doc.text(cfg.title, pw / 2, 110, { align: 'center' });

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
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.roundedRect(dx, 168, dotW, 16, 4, 4, 'FD');
    dx += dotW + gap;
  });

  y = 228;

  const sectionMarker: RGB = colors[0] ? hexToRgb(colors[0].hex) : BURGUNDY;
  // Guard against near-white markers being invisible on white paper
  const safeMarker: RGB = (sectionMarker[0] + sectionMarker[1] + sectionMarker[2]) / 3 > 235 ? BURGUNDY : sectionMarker;

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

  const subHeading = (label: string, color: RGB = BURGUNDY) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: RGB = BURGUNDY) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(247, 244, 247);
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
      doc.setDrawColor(220, 216, 212); doc.setLineWidth(0.4);
      doc.roundedRect(sx, y, sw, sh, 4, 4, 'FD');
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
  cfg.identityRows.forEach((row) => {
    const valueLines = doc.splitTextToSize(row.value, idValueW - 20) as string[];
    const rowH = Math.max(24, valueLines.length * 13 + 11);
    ensure(rowH);
    doc.setFillColor(247, 244, 247);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    doc.setDrawColor(226, 220, 224); doc.setLineWidth(0.5);
    doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
    y += rowH;
  });
  y += 14;

  // ── YOUR ESSENCE ──
  sectionTitle('Your Essence');
  {
    const idx = cfg.essenceHighlightSentence ? p.essence.indexOf(cfg.essenceHighlightSentence) : -1;
    if (idx >= 0) {
      paragraph(p.essence.slice(0, idx).trim());
      paragraph(cfg.essenceHighlightSentence, false, cfg.essenceHighlight);
    } else {
      paragraph(p.essence);
    }
  }
  subHeading('In Nature', BURGUNDY);
  paragraph(p.inNature, true);
  chips(p.themes, BURGUNDY);

  sectionTitle('Archetypes');
  chips(p.archetypes, EMBER);

  subHeading('Celebrities Who Share Your Subtype', BURGUNDY);
  paragraph(cfg.celebIntro, true);
  labeledBullets(cfg.celebs, EMBER);

  // ── ENERGY & VIBRATION ──
  sectionTitle('Energy & Vibration');
  cfg.energyParagraphs.forEach(par => paragraph(par));
  paragraph(p.vibration);
  {
    const feelLine = (label: string, value: string) => {
      ensure(15);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...EMBER);
      doc.text(label, ml, y);
      const lw = doc.getTextWidth(label) + 4;
      doc.setFont('helvetica', 'italic'); doc.setTextColor(...SLATE);
      const valueLines = doc.splitTextToSize(value, cw - lw) as string[];
      valueLines.forEach((ln, i) => {
        if (i === 0) { doc.text(ln, ml + lw, y); } else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
      });
      y += 14.5 + 6;
    };
    feelLine('The Feeling: ', cfg.feeling);
    feelLine('The Analogy: ', cfg.analogy);
  }

  // ── SEASONAL MATCH ──
  sectionTitle('Seasonal Match');
  paragraph(cfg.seasonalMatch);

  // ── KEY CHARACTERISTICS (own section) ──
  sectionTitle('Key Characteristics');
  bullets(cfg.keyCharacteristics, BURGUNDY);

  // ── COLOR PALETTE ──
  sectionTitle('Your Color Palette (with Hex Codes)');
  paragraph(cfg.colorPaletteIntro);
  swatchRow('Primary Colors', colors.filter(c => c.category === 'primary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Secondary Colors', colors.filter(c => c.category === 'secondary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Accent Colors', colors.filter(c => c.category === 'accent').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Neutrals', colors.filter(c => c.category === 'neutral').map(c => ({ name: c.name, hex: c.hex })), true);

  // ── STYLE & PHILOSOPHY ──
  sectionTitle('Style & Philosophy');
  paragraph(cfg.styleQuote, true);
  paragraph(cfg.styleBody);
  calloutQuote(cfg.styleMantra, BURGUNDY);
  y += 14;

  // ── HOW THIS SUBTYPE APPROACHES COLOR ──
  sectionTitle(cfg.approachTitle);
  subHeading(cfg.approachLeadHeading, EMBER);
  paragraph(cfg.approachLead);
  labeledBullets(cfg.approachItems, EMBER);
  cfg.approachRules.forEach(rule => {
    subHeading(rule.title, BURGUNDY);
    paragraph(rule.body);
    paragraph(rule.rule, true);
  });

  // ── HOW THIS SUBTYPE ASSEMBLES AN OUTFIT ──
  sectionTitle(cfg.assembleTitle);
  subHeading(cfg.assemblePrincipleHeading, EMBER);
  paragraph(cfg.assemblePrincipleBody);
  subHeading('The Formula', BURGUNDY);
  bullets(cfg.assembleFormula, BURGUNDY);
  subHeading('The Everyday Formula', BURGUNDY);
  labeledBullets(cfg.everydayFormula, PINE);
  subHeading('The Impact Formula', BURGUNDY);
  paragraph(cfg.impactIntro);
  labeledBullets(cfg.impactFormula, PINE);
  subHeading('The Evening Formula', BURGUNDY);
  paragraph(cfg.eveningIntro);
  labeledBullets(cfg.eveningFormula, PINE);

  // ── GETTING IT RIGHT ──
  sectionTitle(cfg.gettingItRightTitle);
  cfg.gettingItRight.forEach(g => {
    subHeading(g.heading, EMBER);
    paragraph(g.body);
    paragraph('Right Example: ' + g.right);
    paragraph('Wrong Example: ' + g.wrong, true);
  });

  // Wear This / Avoid This
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(20, 120, 80);
  ensure(16); doc.text('WEAR THIS', ml, y); y += 16;
  p.style.wearThis.forEach(it => {
    ensure(14); doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
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
  subHeading('Make-up Philosophy', BURGUNDY);
  paragraph(cfg.beautyQuote, true);
  paragraph(cfg.beautyLook, true);
  labeledBullets(cfg.beautyItems, EMBER);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    if (makeup.tips && makeup.tips.length) {
      subHeading(cfg.beautyTipsHeading, BURGUNDY);
      bullets(makeup.tips, BURGUNDY);
    }
  }

  // ── JEWELRY / METALS ──
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for ' + cfg.title, PINE);
    labeledBullets(jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })), PINE);
    const bestMetals = jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex }));
    swatchRow('Best Metals', bestMetals, true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', EMBER);
      labeledBullets(jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })), EMBER);
    }
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', BURGUNDY);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })), BURGUNDY);
    }
    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', PINE);
      bullets(jewelry.watchRecommendations, PINE);
    }
    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', BURGUNDY);
      chips(jewelry.eyewearColors, BURGUNDY);
    }
    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', EMBER);
      bullets(jewelry.tips, EMBER);
    }
    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', EMBER);
      bullets(jewelry.avoidList, EMBER);
    }
  }

  // ── HAIR COLOR ──
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(cfg.hairIntro);
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', BURGUNDY);
      bullets(hairGuide.tips, BURGUNDY);
    }
    hairGuide.bestColors.forEach(cat => swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex }))));
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', EMBER);
      swatchRow('Shades to Avoid', hairGuide.avoidColors.map(c => ({ name: c.name, hex: c.hex })));
    }
  }

  // ── NAIL COLOR GUIDE ──
  {
    const nail = getNailPalette(cfg.subtypeId);
    if (nail) {
      sectionTitle('Nail Color Guide');
      paragraph(cfg.nailIntro);
      swatchRow('Everyday Neutrals', nail.everydayNeutrals.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Bold Statement', nail.boldStatement.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Seasonal Picks', nail.seasonalPicks.map(c => ({ name: c.name, hex: c.hex })));
      swatchRow('Special Occasion', nail.specialOccasion.map(c => ({ name: c.name, hex: c.hex })));
      if (nail.recommendedFinishes && nail.recommendedFinishes.length) {
        subHeading('Recommended Finishes', PINE);
        chips(nail.recommendedFinishes, PINE);
      }
      if (nail.nailArtTips && nail.nailArtTips.length) {
        subHeading('Nail Art Ideas', BURGUNDY);
        labeledBullets(nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })), BURGUNDY);
      }
      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for ' + cfg.title, EMBER);
        bullets(nail.generalTips, EMBER);
      }
    }
  }

  // ── DECOR ──
  sectionTitle('Decor');
  paragraph(cfg.decorIntro);
  if (decor) {
    const parseColor = (c: string) => ({
      hex: c.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888',
      name: c.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, ''),
    });
    subHeading('The Atmosphere', EMBER);
    paragraph(decor.atmosphere, true);
    chips(decor.moodKeywords, EMBER);
    subHeading('Color Scheme', BURGUNDY);
    swatchRow('Walls', decor.colorScheme.walls.map(parseColor), true);
    swatchRow('Accents', decor.colorScheme.accents.map(parseColor), true);
    swatchRow('Neutrals', decor.colorScheme.neutrals.map(parseColor), true);
    subHeading('Style', PINE);
    labeledBullets(decor.roomStyles.map(s => ({ label: s.name, text: s.description })), PINE);
    subHeading('Materials', BURGUNDY);
    chips(decor.materials, BURGUNDY);
    subHeading('Textures', PINE);
    chips(decor.textures, PINE);
    if (decor.artStyle && decor.artStyle.length) {
      subHeading('Art Styles to Consider', EMBER);
      chips(decor.artStyle, EMBER);
    }
  }

  // ── HABITAT ──
  sectionTitle('Habitat');
  subHeading('The Space Itself', BURGUNDY);
  bullets(cfg.habitatBullets, BURGUNDY);
  paragraph(cfg.habitatWhy, true);

  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote(cfg.hobbiesTitle, EMBER);
  paragraph(cfg.hobbiesBody);
  bullets(cfg.hobbiesBullets, EMBER);

  // ── NUTRITION ──
  if (nutrition) {
    sectionTitle('Nutrition');
    paragraph('Pattern: ' + nutrition.pattern);
    paragraph('Body wisdom: ' + nutrition.bodyWisdom, true);
    subHeading('Approach', BURGUNDY);
    labeledBullets([
      { label: 'Do:', text: nutrition.approach.do },
      { label: 'Don\u2019t:', text: nutrition.approach.dont },
      { label: 'Key:', text: nutrition.approach.key },
    ], PINE);
    subHeading('Eating Rituals', BURGUNDY);
    labeledBullets(nutrition.eatingRituals.map(r => ({ label: r.name, text: r.desc })), BURGUNDY);
    paragraph('Mantra: \u201C' + nutrition.mantra + '\u201D', true);
  }

  // ── LOVE LANGUAGE ──
  sectionTitle('Love Language');
  paragraph('Receives love through: ' + p.loveLanguage.receivesLoveThrough);
  paragraph('Non-verbal cues: ' + p.loveLanguage.nonVerbalCues);

  // ── RELATIONSHIPS ──
  sectionTitle('Relationships');
  paragraph(p.relationships.inLove);
  subHeading('Your Relationship Strengths', PINE);
  bullets(p.relationships.strengthsInRelationship, PINE);
  subHeading('Your Relationship Growth Edges', EMBER);
  bullets(p.relationships.growthInRelationship, EMBER);

  // ── FRIENDSHIPS ──
  if (friendship) {
    sectionTitle('Friendships');
    paragraph(friendship.friendshipStyle);
    subHeading('Natural Chemistry', PINE);
    labeledBullets(friendship.naturalChemistry.map(a => ({ label: a.name, text: a.reason })), PINE);
    subHeading('Growth Friendships', EMBER);
    labeledBullets(friendship.growthFriendships.map(a => ({ label: a.name, text: a.reason })), EMBER);
    subHeading('Friction Points', BURGUNDY);
    labeledBullets(friendship.frictionPoints.map(a => ({ label: a.name, text: a.reason })), BURGUNDY);
  } else {
    paragraph(p.relationships.friendshipCompatibility);
  }

  // ── ANIMAL AFFINITY ──
  sectionTitle('Animal Affinity');
  paragraph(cfg.animalAffinity);

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');
  subHeading('Cinematic Preferences', BURGUNDY);
  paragraph(p.arts.cinematic);
  if (cineFilm) {
    calloutQuote('\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')', BURGUNDY);
    labeledBullets([
      { label: cineFilm.combination + ' \u2014 ' + cineFilm.name, text: 'Your cinematic match.' },
      { label: 'Why it resonates', text: cineFilm.whyItResonates },
    ], BURGUNDY);
  }
  subHeading('Artistic Correspondence', EMBER);
  paragraph(p.arts.artisticCorrespondence);
  if (artData) {
    calloutQuote('\u201C' + artData.essence + '\u201D', EMBER);
    labeledBullets([
      { label: 'Visual Artwork \u2014 \u201C' + artData.visualArtwork.title + '\u201D by ' + artData.visualArtwork.artist, text: artData.visualArtwork.description + '.' },
      { label: 'Movement & Style \u2014 ' + artData.movementStyle.name, text: artData.movementStyle.description + '.' },
      { label: 'Medium Suggestion', text: artData.mediumSuggestion },
      { label: 'Creative Prompt', text: '\u201C' + artData.creativePrompt + '\u201D' },
    ], EMBER);
  }

  // ── LIFE PURPOSE ──
  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  ensure(50);
  doc.setFillColor(247, 244, 247);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...BURGUNDY);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...BURGUNDY);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // ── MANTRAS ──
  sectionTitle('The Mantras');
  bullets(cfg.mantras, BURGUNDY);
  labeledBullets([{ label: 'Meditation:', text: cfg.mantraMeditation }], EMBER);
  paragraph(cfg.shadowBalance, true);

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
    cfg.oneSentenceRows.forEach((row) => {
      const sentLines = doc.splitTextToSize(row.sentence, sentW - 20) as string[];
      const rowH = Math.max(22, sentLines.length * 13 + 9);
      ensure(rowH);
      doc.setFillColor(247, 244, 247);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(226, 220, 224); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }

  // ── YOUR DIRECTION (Elemental Compass) ──
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', BURGUNDY);
  paragraph(cfg.directionSacredGeo);
  {
    const compR = 72;
    const compH = compR * 2 + 64;
    ensure(compH);
    const cx = ml + cw / 2;
    const cy = y + compR + 18;
    doc.setDrawColor(214, 202, 210); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(232, 224, 228); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');
    doc.setDrawColor(226, 220, 224); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);
    doc.line(cx - compR, cy, cx + compR, cy);
    // South ray (Fire)
    doc.setFillColor(...EMBER);
    doc.triangle(cx, cy, cx - 14, cy + compR - 6, cx + 14, cy + compR - 6, 'F');
    // secondary edge dot
    const ang = (cfg.directionAngle * Math.PI) / 180;
    const dotX = cx - Math.sin(ang) * (compR - 4);
    const dotY = cy + Math.cos(ang) * (compR - 4);
    doc.setFillColor(...PINE);
    doc.circle(dotX, dotY, 4, 'F');
    doc.setDrawColor(...PINE); doc.setLineWidth(0.8);
    doc.line(cx, cy, dotX, dotY);
    doc.setFillColor(...BURGUNDY);
    doc.circle(cx, cy, 4, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...SLATE);
    doc.text('N', cx, cy - compR - 6, { align: 'center' });
    doc.text('S', cx, cy + compR + 14, { align: 'center' });
    doc.text('E', cx + compR + 8, cy + 3, { align: 'left' });
    doc.text('W', cx - compR - 8, cy + 3, { align: 'right' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(...GRAY);
    doc.text('EARTH', cx, cy - compR + 6, { align: 'center' });
    doc.text('AIR', cx + compR - 6, cy + 12, { align: 'right' });
    doc.text('WATER', cx - compR + 6, cy + 12, { align: 'left' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...EMBER);
    doc.text('FIRE', cx, cy + compR - 14, { align: 'center' });
    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...PINE);
    doc.text(cfg.directionLabel, dotX - 6, dotY + 2, { align: dotX < cx ? 'right' : 'left' });
    y = cy + compR + 28;
  }
  labeledBullets(cfg.directionBullets, EMBER);
  calloutQuote(cfg.directionClosingQuote, PINE);

  // ── CAREER ──
  sectionTitle('Career');
  chips(p.career.drawnTo, PINE);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading(cfg.idealWorkTitle, PINE);
  paragraph(cfg.idealWorkBody);
  paragraph('Avoid: ' + cfg.idealWorkAvoid, true);

  sectionTitle('Your Secret Sauce');
  paragraph(cfg.secretSauceBody);
  paragraph('Impression: ' + cfg.secretSauceImpression, true);

  sectionTitle('Leadership');
  subHeading(cfg.leadershipTitle, BURGUNDY);
  paragraph(cfg.leadershipBody);
  paragraph('Blind spots: ' + cfg.leadershipBlindspots, true);

  // ── COMMUNICATION ──
  sectionTitle('Communication');
  calloutQuote(cfg.communicationCallout, PINE);
  paragraph('Preferred: ' + cfg.communicationPreferredLabel, true);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);

  // ── TEAM DYNAMICS ──
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, PINE);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // ── CONFLICT STYLE ──
  if (conflict) {
    sectionTitle('Elemental Conflict Style');
    calloutQuote(conflict.name, EMBER);
    {
      const labelLine = (label: string, value: string) => {
        ensure(15);
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...EMBER);
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
    subHeading('Triggers', EMBER);
    bullets(conflict.triggers, EMBER);
    paragraph('Conflict strength: ' + conflict.conflictStrength);
    paragraph('What you need to hear: ' + conflict.whatTheyNeedToHear, true);
  }

  // ── LIFE LESSONS ──
  sectionTitle('Life Lessons');
  paragraph(p.growth.lifeLesson);

  // ── CORE BLOCKS ──
  sectionTitle('Core Blocks');
  subHeading(cfg.coreBlocksTitle, EMBER);
  paragraph(cfg.coreBlocksBody);

  // ── WHEN OUT OF BALANCE ──
  sectionTitle('When Out of Balance');
  paragraph(p.growth.imbalance);
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
    subHeading('The ' + cfg.heroLabel.replace(/^THE /, '').replace(/^the /, '') + ' Imbalance Patterns', BURGUNDY);
    imbalancePanel('Excess \u2014 ' + imbalance.excess.title, imbalance.excess.description, [200, 50, 60], [253, 242, 243]);
    imbalancePanel('Deficiency \u2014 ' + imbalance.deficiency.title, imbalance.deficiency.description, [37, 99, 235], [240, 245, 253]);
  }

  // ── HEALING PRACTICES ──
  sectionTitle('Healing Practices');
  bullets(p.growth.healing, PINE);

  // ── ELEMENTAL HEALING ──
  sectionTitle('Elemental Healing');
  calloutQuote(cfg.healingCallout, BURGUNDY);
  subHeading(cfg.calmExcessHeading, EMBER);
  paragraph(cfg.calmExcessIntro, true);
  labeledBullets(cfg.calmExcessItems, EMBER);
  subHeading(cfg.rebuildHeading, PINE);
  paragraph(cfg.rebuildIntro, true);
  labeledBullets(cfg.rebuildItems, PINE);
  subHeading('Spiritual Practices for Realignment', BURGUNDY);
  labeledBullets(cfg.spiritualRealignment, BURGUNDY);
  {
    const disclaimer = 'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }

  // ── THE BIORHYTHM ──
  sectionTitle('The Biorhythm');
  subHeading(cfg.biorhythmRhythmHeading, BURGUNDY);
  paragraph('Chronotype: ' + cfg.chronotype, true);
  paragraph('Peak Time: ' + cfg.peakTime, true);
  subHeading('Your Biorhythm Schedule', PINE);
  paragraph(cfg.biorhythmScheduleIntro);
  bullets(cfg.biorhythmSchedule, PINE);
  paragraph(p.growth.newYearResolution, true);

  // ── THE ULTIMATE ELEMENTAL GOAL ──
  sectionTitle('The Ultimate Elemental Goal');
  paragraph(cfg.ultimateGoal);

  // ── FINAL SUMMARY ──
  sectionTitle('Final Summary');
  cfg.finalSummary.forEach(par => paragraph(par));

  // ── CLOSING ──
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, PINE, EMBER, BURGUNDY);
  y += 18;
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
  doc.splitTextToSize(p.closing, cw).forEach((ln: string) => { ensure(14); doc.text(ln, ml, y); y += 13.5; });

  // ── FOOTER / PAGE NUMBERS ──
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    gradientBar(doc, ml, ph - 34, cw, 2, heroFrom, heroMid, heroTo);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    doc.text(cfg.footerLabel, ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save(cfg.fileName);
}
