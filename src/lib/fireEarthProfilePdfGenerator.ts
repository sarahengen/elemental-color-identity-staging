import jsPDF from 'jspdf';
import { elementalTypes } from '@/data/elementalTypes';
import { fireEarthProfile } from '@/data/fireEarthProfile';
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

// Fire+Earth deep / forged palette (mirrors the Fire+Air generator's role colors,
// but uses the smoldering, grounded tones of the Fire+Earth subtype)
const EMBER: [number, number, number] = [156, 0, 45];       // Carmine
const PINE: [number, number, number] = [15, 94, 63];        // Dark Emerald
const BURGUNDY: [number, number, number] = [115, 47, 61];   // Burgundy
const INK: [number, number, number] = [22, 14, 14];
const SLATE: [number, number, number] = [71, 64, 60];
const GRAY: [number, number, number] = [130, 120, 112];

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

export async function generateFireEarthProfilePDF(): Promise<void> {
  const p = fireEarthProfile;

  const fire = elementalTypes.find(t => t.id === 'fire');
  const subtype = fire?.subtypes.find(s => s.id === 'fire-earth');
  const colors = subtype?.colors || [];
  const makeup = getMakeupPalette('fire-earth');
  const jewelry = getJewelryData('fire', 'fire-earth');
  const decor = getDecorData('fire', 'fire-earth');
  const hairGuide = hairColorData
    .find(e => e.elementId === 'fire')
    ?.subtypeGuides.find(s => s.subtypeId === 'fire-earth');

  // Cross-guide Fire+Earth content (single source of truth)
  const friendship = friendshipProfiles.find(f => f.subtypeId === 'fire-earth');
  const nutrition = fireNutritionSubtypes.find(n => n.id === 'fire-earth');
  const fireConflict = conflictData.find(e => e.elementId === 'fire');
  const conflict = fireConflict?.subtypes.find(s => s.subtypeId === 'fire-earth');
  const fireTeam = teamDynamicsData.find(e => e.elementId === 'fire');
  const team = fireTeam?.subtypes.find(s => s.subtypeId === 'fire-earth');
  const fireFilms = cinematicData.find(e => e.id === 'fire');
  const cineFilm = fireFilms?.films.find(f => f.id === 'fire-earth');
  const fireArt = artisticCorrespondenceData.fire;
  const artData = fireArt?.find(a => a.subtypeId === 'fire-earth');
  const fireImbalance = elementalImbalanceData.find(e => e.elementId === 'fire');
  const imbalance = fireImbalance?.subtypes.find(s => s.subtypeId === 'fire-earth');

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

  // \u2500\u2500 HERO (gradient background matching the download banner) \u2500\u2500
  const blendOverWhite = (hex: string): [number, number, number] => {
    const [r, g, b] = hexToRgb(hex);
    const a = 0xdd / 255;
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
  doc.text('THE FORGED IRON', pw / 2, 56, { align: 'center' });

  doc.setFontSize(40);
  doc.setTextColor(255, 255, 255);
  doc.text('Fire + Earth', pw / 2, 110, { align: 'center' });

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

  // Section title marker tinted with the subtype's colors[0]
  const sectionMarker: [number, number, number] = colors[0] ? hexToRgb(colors[0].hex) : BURGUNDY;
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

  const subHeading = (label: string, color: [number, number, number] = BURGUNDY) => {
    ensure(20);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(color[0], color[1], color[2]);
    doc.text(label.toUpperCase(), ml, y); y += 15;
  };

  const calloutQuote = (text: string, accent: [number, number, number] = BURGUNDY) => {
    const qLines = doc.splitTextToSize(text, cw - 30) as string[];
    ensure(qLines.length * 14 + 24);
    doc.setFillColor(247, 241, 237);
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

  // \u2500\u2500 CORE ELEMENTAL IDENTITY \u2500\u2500
  sectionTitle('Core Elemental Identity');
  const identityRows: { label: string; value: string }[] = [
    { label: 'Elemental Signature', value: 'Fire + Earth (Fire as Dominant, Earth as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Deep Winter' },
    { label: 'Core Mantra', value: '\u201CI AM the forge that endures.\u201D' },
  ];
  const idLabelW = 150;
  const idValueW = cw - idLabelW;
  identityRows.forEach((row) => {
    const valueLines = doc.splitTextToSize(row.value, idValueW - 20) as string[];
    const rowH = Math.max(24, valueLines.length * 13 + 11);
    ensure(rowH);
    doc.setFillColor(247, 241, 237);
    doc.rect(ml, y - 9, cw, rowH, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
    doc.text(row.label, ml + 10, y + 4);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
    valueLines.forEach((ln, li) => { doc.text(ln, ml + idLabelW, y + 4 + li * 13); });
    doc.setDrawColor(226, 216, 208); doc.setLineWidth(0.5);
    doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
    y += rowH;
  });
  y += 14;

  sectionTitle('Your Essence');
  {
    const highlightSentence =
      'You have a strong, sultry look, and look best in deep, rich colors that honor the intensity of the Fire and Earth elements.';
    const idx = p.essence.indexOf(highlightSentence);
    if (idx >= 0) {
      const leadText = p.essence.slice(0, idx).trim();
      paragraph(leadText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...PINE);
      const hLines = doc.splitTextToSize(highlightSentence, cw) as string[];
      hLines.forEach(ln => { ensure(15); doc.text(ln, ml, y); y += 14.5; });
      y += 8;
    } else {
      paragraph(p.essence);
    }
  }

  subHeading('In Nature', BURGUNDY);
  paragraph(p.inNature, true);
  chips(p.themes, BURGUNDY);

  sectionTitle('Archetypes');
  chips(p.archetypes, EMBER);


  // \u2500\u2500 CELEBRITIES WHO SHARE THIS SUBTYPE (under The Analogy) \u2500\u2500
  subHeading('Celebrities Who Share Your Subtype', BURGUNDY);
  paragraph('Famous faces who embody the Forged Iron \u2014 deep, rich, sultry coloring that glows in burgundy, forest green, and other smoldering tones.', true);
  labeledBullets([
    { label: 'Pen\u00E9lope Cruz', text: 'Deep, rich coloring with warm undertones mixed with cool \u2014 stunning in burgundy and forest green.' },
    { label: 'Salma Hayek', text: 'Dark hair and eyes with medium-deep skin, radiating warmth and intensity.' },
    { label: 'Eva Longoria', text: 'Deep Winter coloring with rich, dark features that glow in mahogany and deep teal.' },
    { label: 'Morticia Addams (fictional)', text: 'The iconic gothic beauty with dramatic dark coloring and mysterious depth.' },
  ], EMBER);


  sectionTitle('Energy & Vibration');
  paragraph('You are fire cooled into enduring strength. Your will is not a flash in the pan \u2014 it is the steady, deliberate heat of a forge, shaping substance into lasting form. Fire gives you your drive and your will; Earth gives that will a place to land, material to shape, weight to carry. You build, protect, and endure. Your presence is substantial, magnetic, and deeply reliable. When you speak, people listen \u2014 not because you demand it, but because you have earned the weight of your words through consistent, demonstrated integrity.');
  paragraph('You are the person others turn to when the stakes are high. You absorb pressure without breaking. You protect the vulnerable without hesitation. You build things that last \u2014 that stand long after the moment of their making. You do not bend. You do not waver. And the people who have you in their lives know, at the deepest level, that they are safe. Where pure Fire burns and moves on, your Fire has been given somewhere to stay.');
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
        if (i === 0) { doc.text(ln, ml + lw, y); }
        else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
      });
      y += 14.5 + 6;
    };
    feelLine('The Feeling: ', '\u201CI am the anvil that weathers every storm.\u201D');
    feelLine('The Analogy: ', 'Think of a blacksmith\u2019s forge \u2014 the fire that tempers metal, the anvil that shapes it, the hands that wield the hammer. This is your energy: fire meeting earth, heat meeting substance, will meeting form.');
  }

  // \u2500\u2500 SEASONAL MATCH \u2500\u2500
  sectionTitle('Seasonal Match');
  paragraph(
    'Fire types belong to the ' + (fire?.season || 'Winter') +
    ' seasonal color palette, characterized by cool undertones, high contrast, and clear, saturated colors. As Fire grounded by Earth, your Deep Winter palette leans into the richest, deepest, most saturated of these tones.',
  );

  // \u2500\u2500 KEY CHARACTERISTICS (its own main section) \u2500\u2500
  sectionTitle('Key Characteristics');
  bullets([
    'Dark hair and eyes',
    'Medium to deep skin tone',
    'Mix of warm and cool undertones',
    'Looks best in deep, rich colors',
    'Can wear some warm burgundies and olives',
  ], BURGUNDY);

  // \u2500\u2500 COLOR PALETTE \u2500\u2500
  sectionTitle('Your Color Palette (with Hex Codes)');
  paragraph('Your signature Fire + Earth palette \u2014 deep, rich, saturated colors that honor the intensity of fire tempered by earth. Each swatch includes its exact hex code.');
  swatchRow('Primary Colors', colors.filter(c => c.category === 'primary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Secondary Colors', colors.filter(c => c.category === 'secondary').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Accent Colors', colors.filter(c => c.category === 'accent').map(c => ({ name: c.name, hex: c.hex })), true);
  swatchRow('Neutrals', colors.filter(c => c.category === 'neutral').map(c => ({ name: c.name, hex: c.hex })), true);

  // \u2500\u2500 STYLE & PHILOSOPHY \u2500\u2500
  sectionTitle('Style & Philosophy');
  paragraph('\u201CI dress to endure, not to dazzle.\u201D', true);
  paragraph('The Forged Iron approaches style as a form of foundation. Your clothing is not about flash, trend, or attention. It is about depth and durability \u2014 the quiet, unmistakable expression of your smoldering, grounded strength. You dress to convey substance, to be the steady presence that anchors any room.');
  calloutQuote('Your Style Mantra: \u201CIf it isn\u2019t built to last, it\u2019s not for me.\u201D', BURGUNDY);
  y += 14;

  // \u2500\u2500 HOW THE FORGED IRON APPROACHES COLOR \u2500\u2500
  sectionTitle('How the Forged Iron Approaches Color');
  subHeading('The Smoldering Palette', EMBER);
  paragraph('Your colors are not bright \u2014 they are deep. Not light \u2014 saturated. Not loud \u2014 rich. You are drawn to colors that seem to hold heat beneath the surface:');
  labeledBullets([
    { label: 'Signature', text: 'Burgundy, Dark Emerald, Indigo, Pine Green: Deep, smoldering colors with weight and intensity.' },
    { label: 'Anchors', text: 'Espresso, Charcoal, Dark Navy: Grounded, substantial foundations that hold your richness.' },
    { label: 'Connectors', text: 'Dark Olive, deep stone tones: Earthy transitions that keep the depth consistent.' },
    { label: 'Ember', text: 'Carmine, Molten Orange: The single glowing accent \u2014 fire seen through forged iron.' },
  ], EMBER);

  subHeading('The Depth Rule', BURGUNDY);
  paragraph('Your palette is deep and saturated. You cannot wear pale, washed-out, or chalky tones \u2014 they make you look drained. You need colors with substance, richness, and weight that match your enduring presence.');
  paragraph('The Rule: \u201CIf it doesn\u2019t have depth, it doesn\u2019t have me.\u201D', true);

  subHeading('The Richness Rule', BURGUNDY);
  paragraph('Your colors are rich, not bright. Neon and pastels both fight your nature. You shine in jewel-deep tones \u2014 the kind that look forged, mined, or grown rather than printed.');
  paragraph('The Rule: \u201CGive me the depth of the earth and the glow of the ember.\u201D', true);

  subHeading('The Contrast Rule', BURGUNDY);
  paragraph('You carry your own contrast through depth and warmth. The combination of a deep base with one smoldering accent \u2014 espresso with carmine, charcoal with molten orange \u2014 creates the grounded intensity that feels like you.');
  paragraph('The Rule: \u201COne ember against the deep \u2014 that is all the contrast I need.\u201D', true);

  subHeading('The Temperature Rule', BURGUNDY);
  paragraph('Your palette has a lot of Heat. You do not wear cool colors unless they are grounded by some \u2018hot\u2019 like hot embers. Too Cool, icy, or greyed-out tones feel hollow, insubstantial, and separate from your nature.');
  paragraph('The Rule: \u201CIf it doesn\u2019t have some heat, you don\u2019t smolder.\u201D', true);

  // \u2500\u2500 HOW THE FORGED IRON ASSEMBLES AN OUTFIT \u2500\u2500
  sectionTitle('How the Forged Iron Assembles an Outfit');
  subHeading('The Principle: Deep Foundation, One Ember', EMBER);
  paragraph('You are not a peacock. You are a craftsperson. Your outfit should be built on a deep, substantial foundation \u2014 with one smoldering point of warmth that signals the fire within.');
  subHeading('The Formula', BURGUNDY);
  bullets([
    'Foundation (60%): A deep, rich, well-made base in your Anchor colors.',
    'Connector (25%): An earthy transitional layer that adds depth and texture.',
    'Ember (15%): One smoldering statement \u2014 the glow of fire through iron.',
  ], BURGUNDY);

  subHeading('The Everyday Formula', BURGUNDY);
  labeledBullets([
    { label: 'Foundation', text: 'Espresso trousers + a charcoal knit: Deep, grounded, substantial.' },
    { label: 'Connector', text: 'A dark olive or pine-green jacket: Earthy depth that layers richly.' },
    { label: 'Ember', text: 'A carmine scarf or burgundy boots: The single glow that signals the fire.' },
  ], PINE);

  subHeading('The Impact Formula', BURGUNDY);
  paragraph('For moments when you need to command quiet authority:');
  labeledBullets([
    { label: 'Foundation', text: 'A dark navy or black suit in heavy, quality cloth: The forged foundation.' },
    { label: 'Connector', text: 'A deep burgundy or pine accessory: The rich, grounded bridge.' },
    { label: 'Ember', text: 'A molten-orange pocket detail or carmine tie: The unmistakable heat within.' },
  ], PINE);

  subHeading('The Evening Formula', BURGUNDY);
  paragraph('For moments of depth and connection:');
  labeledBullets([
    { label: 'Foundation', text: 'A deep emerald or oxblood dress in a structured cut: The substantial base.' },
    { label: 'Connector', text: 'Antique gold or bronze jewelry: The warm, earthen transition.' },
    { label: 'Ember', text: 'A rich carmine lip or a single bold gem: The smoldering point that makes you unforgettable.' },
  ], PINE);

  // \u2500\u2500 GETTING IT RIGHT \u2500\u2500
  sectionTitle('Getting It Right: The Forged Iron at Their Best');

  subHeading('The Right Depth', EMBER);
  paragraph('You understand that depth is your power. A deeply saturated foundation does more for you than any bright color ever could.');
  paragraph('Right Example: Espresso trousers, a dark emerald knit, and burgundy boots. Deep, rich, and quietly commanding.');
  paragraph('Wrong Example: Pale beige, washed denim, and a pastel top. The depth is gone, and so is the presence.', true);

  subHeading('The Right Substance', EMBER);
  paragraph('You understand that your clothes need weight and quality. Heavy wools, rich leathers, dense knits \u2014 materials that feel forged and built to last.');
  paragraph('Right Example: A substantial wool coat over a structured base. The weight reads as authority.');
  paragraph('Wrong Example: Thin, flimsy, throwaway fabrics that undercut your solidity.', true);

  subHeading('The Right Accent', EMBER);
  paragraph('You understand that one ember is enough. A single smoldering point of warmth against the deep is more powerful than scattered brights.');
  paragraph('Right Example: A single carmine detail or a warm bronze cuff against an all-deep outfit. Focused, intentional, unmistakable.');
  paragraph('Wrong Example: Many competing brights that fracture your grounded depth.', true);

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

  // \u2500\u2500 BEAUTY PALETTE \u2500\u2500
  sectionTitle('Beauty Palette');
  subHeading('Make-up Philosophy', BURGUNDY);
  paragraph('\u201CMakeup as Smolder.\u201D', true);
  paragraph('The Look: Deep, smoldering, magnetic. Like embers banked for the night.', true);
  labeledBullets([
    { label: 'The Canvas', text: 'Natural finish, medium coverage. Your skin should look like skin \u2014 healthy, warm, real. A touch of cool-toned bronzer where the sun naturally hits.' },
    { label: 'The Eyes', text: 'Deep, smoldering tones. Burnt orange, oxidized bronze, deep gold, cool brown. Apply a wash of bronze over the lid, then deepen the outer corner with a cool brown or burgundy. Everything should be smoked out \u2014 no harsh lines.' },
    { label: 'The Brows', text: 'Natural, full, slightly untamed. Use a powder or pomade to fill, keeping texture visible.' },
    { label: 'The Lips', text: 'Cream or satin in cool brown, dark red, cool orange, or deep mole. Soft edges, not sharp. Your mouth is generous.' },
    { label: 'The Cheeks', text: 'Cool, sculpting bronzer to define bone structure. Deep red or burgundy blush, blended back toward the hairline. Gold or bronze highlighter, subtle and sunkissed.' },
  ], EMBER);
  if (makeup) {
    swatchRow('Lipstick', makeup.lipstick);
    swatchRow('Eyeshadow', makeup.eyeshadow);
    swatchRow('Blush', makeup.blush);
    swatchRow('Mascara', makeup.mascara);
    if (makeup.foundation) {
      swatchRow('Foundation', makeup.foundation.shades.map(s => ({ name: s.name, hex: s.hex })));
    }
    if (makeup.tips && makeup.tips.length) {
      subHeading('Make-up Tips for Fire + Earth', BURGUNDY);
      bullets(makeup.tips, BURGUNDY);
    }
  }

  // \u2500\u2500 JEWELRY / METALS \u2500\u2500
  if (jewelry) {
    sectionTitle('Jewelry \u2014 Metals & Gemstones');
    paragraph(jewelry.overview);
    subHeading('Metals for Fire + Earth', PINE);
    labeledBullets(
      jewelry.metals.map(m => ({ label: m.name + ' (' + m.rating + ')', text: m.reason })),
      PINE,
    );
    // Best metals plus the Antique Gold accent swatch
    const bestMetals = jewelry.metals.filter(m => m.rating === 'best').map(m => ({ name: m.name, hex: m.hex }));
    const antiqueGold = jewelry.metals.find(m => m.name === 'Antique Gold');
    if (antiqueGold) bestMetals.push({ name: antiqueGold.name, hex: antiqueGold.hex });
    swatchRow('Best Metals', bestMetals, true);
    swatchRow('Gemstones', jewelry.gemstones.map(g => ({ name: g.name, hex: g.hex })));

    // Jewelry styles
    if (jewelry.styles && jewelry.styles.length) {
      subHeading('Jewelry Styles', EMBER);
      labeledBullets(
        jewelry.styles.map(s => ({ label: s.name, text: s.description + ' \u2014 ' + s.examples.join(', ') + '.' })),
        EMBER,
      );
    }

    // Accessory styles & color palette
    if (jewelry.accessoryColors && jewelry.accessoryColors.length) {
      subHeading('Accessory Styles & Color Palette', BURGUNDY);
      swatchRow('Accessory Colors', jewelry.accessoryColors.map(c => ({ name: c.name, hex: c.hex })), true);
      labeledBullets(
        jewelry.accessoryColors.map(c => ({ label: c.name, text: c.items.join(', ') })),
        BURGUNDY,
      );
    }

    // Watch recommendations
    if (jewelry.watchRecommendations && jewelry.watchRecommendations.length) {
      subHeading('Watch Recommendations', PINE);
      bullets(jewelry.watchRecommendations, PINE);
    }

    // Eyewear colors
    if (jewelry.eyewearColors && jewelry.eyewearColors.length) {
      subHeading('Eyewear Colors', BURGUNDY);
      chips(jewelry.eyewearColors, BURGUNDY);
    }

    // Pro tips
    if (jewelry.tips && jewelry.tips.length) {
      subHeading('Pro Tips', EMBER);
      bullets(jewelry.tips, EMBER);
    }

    // What to avoid
    if (jewelry.avoidList && jewelry.avoidList.length) {
      subHeading('What to Avoid', EMBER);
      bullets(jewelry.avoidList, EMBER);
    }
  }

  // \u2500\u2500 HAIR COLOR \u2500\u2500
  if (hairGuide) {
    sectionTitle('Hair Color');
    paragraph(
      'Your deep, rich coloring calls for dark, saturated hair shades. Choose deep, glossy colors with warmth and dimension, and avoid anything pale, ashy, or washed out that drains your depth.',
    );
    if (hairGuide.tips && hairGuide.tips.length) {
      subHeading('Hair Color Tips', BURGUNDY);
      bullets(hairGuide.tips, BURGUNDY);
    }
    hairGuide.bestColors.forEach(cat => {
      swatchRow(cat.name, cat.colors.map(c => ({ name: c.name, hex: c.hex })));
    });
    if (hairGuide.avoidColors && hairGuide.avoidColors.length) {
      subHeading('Colors to Avoid', EMBER);
      swatchRow('Shades to Avoid', hairGuide.avoidColors.map(c => ({ name: c.name, hex: c.hex })));
    }

  }

  // \u2500\u2500 NAIL COLOR GUIDE \u2500\u2500
  {
    const nail = getNailPalette('fire-earth');
    if (nail) {
      sectionTitle('Nail Color Guide');
      paragraph('Perfect polish colors for your Fire + Earth coloring \u2014 deep, rich shades with bronze and copper warmth that complement your intense palette.');

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
        labeledBullets(
          nail.nailArtTips.map(t => ({ label: t.pattern + ' (' + t.difficulty + ')', text: t.description })),
          BURGUNDY,
        );
      }

      if (nail.generalTips && nail.generalTips.length) {
        subHeading('Nail Tips for Fire + Earth', EMBER);
        bullets(nail.generalTips, EMBER);
      }
    }
  }

  // ── DECOR ──
  sectionTitle('Decor');
  paragraph('Your space blends Fire\u2019s drama with Earth\u2019s depth. Rich, saturated colors and luxurious natural materials create an atmosphere of powerful elegance.');

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
    labeledBullets(
      decor.roomStyles.map(s => ({ label: s.name, text: s.description })),
      PINE,
    );

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
  paragraph(p.living.habitat);
  subHeading('The Space Itself', BURGUNDY);
  bullets([
    'Grounded, substantial, and built to last',
    'A workshop, hearth, or place of focused craft',
    'Natural materials \u2014 wood, stone, forged metal, leather',
    'Warmth and weight over trend and flash',
    'A sanctuary for deep, uninterrupted work',
  ], BURGUNDY);
  paragraph('Why It Works: The Forged Iron needs to be where things are made and kept \u2014 a place of permanence and craft. You need spaces that feel solid, warm, and enduring, that hold steady the way you do.', true);

  // ── HOBBIES ──
  sectionTitle('Hobbies');
  calloutQuote('The Productive Hearth', EMBER);
  paragraph('A day of grounded, satisfying work and warmth. A morning building or repairing something with your hands. An afternoon of slow, mastery-driven craft \u2014 woodworking, cooking, restoring. Evening by the fire with good food and a few trusted people. You recharge by making and by tending what lasts.');
  bullets(['Woodworking & metalwork', 'Slow, hearty cooking', 'Strength training & hiking', 'Restoring and repairing', 'Strategy games', 'Building lasting things'], EMBER);

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
  paragraph('Wolf (Alpha). The epitome of enduring strength, pack loyalty, and strategic resilience. It combines fierce predatory instinct with a deep, earthy connection to territory and family. Its howl is a declaration of presence and boundary.');

  // ── ARTS ──
  sectionTitle('Arts & Aesthetics');
  subHeading('Cinematic Preferences', BURGUNDY);
  paragraph(p.arts.cinematic);
  if (cineFilm) {
    calloutQuote(
      '\u201C' + cineFilm.filmTitle + '\u201D (' + cineFilm.year + ', dir. ' + cineFilm.director + ')',
      BURGUNDY,
    );
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
    ], EMBER);
  }

  // \u2500\u2500 LIFE PURPOSE \u2500\u2500
  sectionTitle('Life Purpose');
  paragraph(p.lifePurpose.gift);
  paragraph(p.lifePurpose.spiritualPurpose);
  ensure(50);
  doc.setFillColor(247, 241, 237);
  const saLines = doc.splitTextToSize(p.lifePurpose.soulsAssignment, cw - 30) as string[];
  doc.roundedRect(ml, y - 6, cw, saLines.length * 14 + 18, 6, 6, 'F');
  doc.setFillColor(...BURGUNDY);
  doc.rect(ml, y - 6, 3, saLines.length * 14 + 18, 'F');
  doc.setFont('helvetica', 'italic'); doc.setFontSize(10.5); doc.setTextColor(...BURGUNDY);
  let sy = y + 8;
  saLines.forEach(ln => { doc.text(ln, ml + 14, sy); sy += 14; });
  y = sy + 12;
  paragraph(p.lifePurpose.inOneSentence, true);

  // \u2500\u2500 MANTRAS \u2500\u2500
  sectionTitle('The Mantras');
  bullets([
    '\u201CTo endure is to serve.\u201D',
    '\u201CNot the flash that fades, but the foundation that holds.\u201D',
    '\u201CI am the ground others build upon.\u201D',
    '\u201CTo protect what matters is my purpose.\u201D',
  ], BURGUNDY);
  labeledBullets([
    { label: 'Meditation:', text: '\u201CWhat needs to be held today? Where can I be the foundation? What requires enduring strength?\u201D' },
  ], EMBER);
  paragraph('Shadow Balance: The Forged Iron must remember that even iron must be reheated to be reshaped. You must learn the art of flexibility, of releasing your grip, of letting the fire breathe so the structure does not become a prison.', true);

  // \u2500\u2500 ONE SENTENCE \u2500\u2500
  sectionTitle('The One Sentence');
  {
    const oneSentenceRows: { context: string; sentence: string }[] = [
      { context: 'To Yourself', sentence: '\u201CI AM the forge that endures.\u201D' },
      { context: 'At Work', sentence: '\u201CI will hold this steady \u2014 you can build on me.\u201D' },
      { context: 'In Love', sentence: '\u201CI am here, and I will stay.\u201D' },
      { context: 'In Crisis', sentence: '\u201CI will not break. We will hold the line.\u201D' },
      { context: 'At Rest', sentence: '\u201CI am learning to soften without breaking.\u201D' },
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
      doc.setFillColor(247, 241, 237);
      doc.rect(ml, y - 9, cw, rowH, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5); doc.setTextColor(...INK);
      doc.text(row.context, ml + 10, y + 4);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
      sentLines.forEach((ln, li) => { doc.text(ln, ml + ctxW, y + 4 + li * 13); });
      doc.setDrawColor(226, 216, 208); doc.setLineWidth(0.5);
      doc.line(ml, y - 9 + rowH, ml + cw, y - 9 + rowH);
      y += rowH;
    });
    y += 14;
  }

  // \u2500\u2500 YOUR DIRECTION (Elemental Compass) \u2500\u2500
  sectionTitle('Your Direction');
  subHeading('The Sacred Geography of the Self', BURGUNDY);
  paragraph('Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self: a map not of land, but of soul. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces \u2014 the horizon it is forever turning toward.');

  {
    const compR = 72;
    const compH = compR * 2 + 64;
    ensure(compH);
    const cx = ml + cw / 2;
    const cy = y + compR + 18;

    doc.setDrawColor(214, 202, 194); doc.setLineWidth(1);
    doc.circle(cx, cy, compR, 'S');
    doc.setDrawColor(232, 224, 216); doc.setLineWidth(0.5);
    doc.circle(cx, cy, compR - 8, 'S');

    doc.setDrawColor(226, 216, 208); doc.setLineWidth(0.5);
    doc.line(cx, cy - compR, cx, cy + compR);
    doc.line(cx - compR, cy, cx + compR, cy);

    // South ray (Fire) \u2014 deep wedge toward the bottom
    doc.setFillColor(...EMBER);
    doc.triangle(cx, cy, cx - 14, cy + compR - 6, cx + 14, cy + compR - 6, 'F');
    // grounded edge (South-by-Southwest, leaning toward North/Earth)
    const sswX = cx - Math.sin((22.5 * Math.PI) / 180) * (compR - 4);
    const sswY = cy + Math.cos((22.5 * Math.PI) / 180) * (compR - 4);
    doc.setFillColor(...PINE);
    doc.circle(sswX, sswY, 4, 'F');
    doc.setDrawColor(...PINE); doc.setLineWidth(0.8);
    doc.line(cx, cy, sswX, sswY);

    doc.setFillColor(...BURGUNDY);
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
    doc.text('WATER', cx - compR + 6, cy + 12, { align: 'left' });
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7); doc.setTextColor(...EMBER);
    doc.text('FIRE', cx, cy + compR - 14, { align: 'center' });

    doc.setFont('helvetica', 'italic'); doc.setFontSize(6.5); doc.setTextColor(...PINE);
    doc.text('The grounded edge \u2014 South-by-Southwest', sswX - 6, sswY + 2, { align: 'right' });

    y = cy + compR + 28;
  }

  labeledBullets([
    { label: 'Direction', text: 'South-by-Southwest (the grounded edge). You face south, toward fire, but you lean always toward Earth \u2014 the place where fire becomes form.' },
    { label: 'The Deep Glow', text: 'The ember held within rock; fire that has become foundation. Your direction is toward what endures, what holds, what is built to last.' },
    { label: 'Orientation', text: 'You seek permanence \u2014 the structure that outlasts the spark, the strength that protects, the heat that becomes a hearth.' },
    { label: 'Shadow Orientation', text: 'When lost, you grip the form so tightly that the fire suffocates. You love endurance so much you fear all change.' },
  ], EMBER);

  calloutQuote('\u201CI face the deep glow. I honor what endures.\u201D', PINE);

  // \u2500\u2500 CAREER \u2500\u2500


  sectionTitle('Career');
  chips(p.career.drawnTo, PINE);
  paragraph(p.career.why);

  sectionTitle('Ideal Work Environment');
  subHeading('The Fortress', PINE);
  paragraph('Stable, substantive, and mastery-driven. A culture that values depth, reliability, craftsmanship, and long-term results. You need the space to focus deeply, build expertise, and become the indispensable expert. You thrive in engineering, operations, architecture, skilled trades, and any field that rewards endurance and quality.');
  paragraph('Avoid: Chaotic, hype-driven, constantly-pivoting environments where depth is sacrificed for speed and nothing is ever finished.', true);

  sectionTitle('Your Secret Sauce');
  paragraph('Your steadiness is not stubbornness; it is the foundation of trust. You need to know that your consistent reliability and protective instincts are not \u201Cunambitious\u201D or \u201Cresistant to change.\u201D You are the ballast that allows the organization to take calculated risks. Your role is to ask \u201CHow do we make sure this lasts?\u201D and to be the one others can always count on.');
  paragraph('Impression: \u201CWhen you commit, it gets done \u2014 completely, and it holds. The whole team rests easier knowing you\u2019re on it.\u201D', true);


  sectionTitle('Leadership');
  subHeading('The Steadfast Guardian', BURGUNDY);
  paragraph('You lead through unshakeable reliability and protective strength. You are the leader who stays calm in the storm, who holds the standard when others waver, who protects the team and the mission with quiet, relentless commitment. You don\u2019t chase the spotlight \u2014 you build the structure that lets everyone else succeed.');
  paragraph('Blind spots: Your steadiness can harden into rigidity. You may resist necessary change or carry too much alone rather than delegating. Practice flexibility, invite challenge to your positions, and let others share the load \u2014 strength includes knowing when to bend and when to lean on others.', true);

  // \u2500\u2500 COMMUNICATION (under Leadership) \u2500\u2500
  sectionTitle('Communication');
  calloutQuote('The Reliable Signal', PINE);
  paragraph('Preferred: Verbal (Structured)', true);
  paragraph(p.communication.preferredMedium);
  paragraph('Strengths: ' + p.communication.strengths);
  paragraph('How others reach you: ' + p.communication.howOthersReachYou);

  // \u2500\u2500 TEAM DYNAMICS \u2500\u2500
  if (team) {
    sectionTitle('Team Dynamics');
    subHeading('Your Team Role \u2014 ' + team.teamRole, PINE);
    paragraph(team.teamRoleDescription);
    paragraph('Strength in teams: ' + team.strengthInTeams);
    paragraph('Challenge in teams: ' + team.challengeInTeams, true);
  }

  // \u2500\u2500 CONFLICT STYLE \u2500\u2500
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
          if (i === 0) { doc.text(ln, ml + lw, y); }
          else { y += 14.5; ensure(15); doc.text(ln, ml, y); }
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

  // \u2500\u2500 LIFE LESSONS \u2500\u2500
  sectionTitle('Life Lessons');
  paragraph(p.growth.lifeLesson);

  // \u2500\u2500 CORE BLOCKS \u2500\u2500
  sectionTitle('Core Blocks');
  subHeading('The Fear of Being Unmanned/Unmade', EMBER);
  paragraph('Being rendered useless, having their strength and reliability taken for granted or disrespected. A context where endurance has no purpose and authority is undermined.');

  // \u2500\u2500 WHEN OUT OF BALANCE \u2500\u2500
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

    subHeading('The Forged Iron Imbalance Patterns', BURGUNDY);
    imbalancePanel(
      'Excess \u2014 ' + imbalance.excess.title,
      imbalance.excess.description,
      [200, 50, 60],
      [253, 242, 243],
    );
    imbalancePanel(
      'Deficiency \u2014 ' + imbalance.deficiency.title,
      imbalance.deficiency.description,
      [37, 99, 235],
      [240, 245, 253],
    );
  }

  // \u2500\u2500 HEALING PRACTICES \u2500\u2500
  sectionTitle('Healing Practices');
  bullets(p.growth.healing, PINE);

  // \u2500\u2500 ELEMENTAL HEALING \u2500\u2500
  sectionTitle('Elemental Healing');
  calloutQuote('Excess: Chronic Tension  /  Deficiency: Structural Collapse', BURGUNDY);

  subHeading('To Calm Excess \u2014 Chronic Tension', EMBER);
  paragraph('When your steady fire hardens into chronic tension and rigidity, the goal is to release, soften, and restore flexibility:', true);
  labeledBullets([
    { label: 'Herbs', text: 'Ashwagandha & Magnesium-rich botanicals \u2014 to ease tension held in the body.' },
    { label: 'Nutrients', text: 'Magnesium \u2014 to relax muscles and calm an over-braced nervous system.' },
    { label: 'Bodywork', text: 'Deep-tissue massage, stretching, or yin yoga to release stored physical tension.' },
    { label: 'Release', text: 'Deliberately delegating and letting others carry weight \u2014 practiced like medicine.' },
    { label: 'Environment', text: 'Warm, soft textures and gentle light to invite the body to unclench.' },
  ], EMBER);

  subHeading('To Rebuild Deficiency \u2014 Structural Collapse', PINE);
  paragraph('When your strength has been ground down to collapse and depletion, the goal is to gently rebuild foundation, energy, and resilience:', true);
  labeledBullets([
    { label: 'Herbs', text: 'Rhodiola & Maca \u2014 to restore stamina and rebuild adrenal reserves.' },
    { label: 'Nourishment', text: 'Hearty, mineral-rich, grounding meals to refuel a depleted system.' },
    { label: 'Restorative Rest', text: 'Deep, protected sleep and slow rebuilding \u2014 treating recovery as essential structural work.' },
  ], PINE);

  // \u2500\u2500 SPIRITUAL PRACTICES FOR REALIGNMENT \u2500\u2500
  subHeading('Spiritual Practices for Realignment', BURGUNDY);
  labeledBullets([
    { label: 'Primary (Resonance)', text: 'Grounding meditation and earthing practices. Walking barefoot on the earth, working with stone or clay, and body-based stillness that honors your connection to the ground.' },
    { label: 'Balancing (Counter-Energy)', text: 'Flowing, fluid movement (Tai Chi, gentle dance). Practices that loosen rigidity and teach the body to bend, reminding you that strength includes flexibility.' },
    { label: 'Ritual', text: 'Working with your hands as a form of prayer \u2014 crafting, forging, building, or tending a fire. \u201CReleasing\u201D rituals \u2014 deliberately setting down a burden you have carried too long.' },
  ], BURGUNDY);

  // Small-print medical disclaimer for the Elemental Healing section
  {
    const disclaimer =
      'Always consult a qualified doctor or healthcare professional before using any supplements, herbs, or remedies.';
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    const dLines = doc.splitTextToSize(disclaimer, cw) as string[];
    dLines.forEach(ln => { ensure(11); doc.text(ln, ml, y); y += 10.5; });
    y += 8;
  }

  // \u2500\u2500 THE BIORHYTHM \u2500\u2500
  sectionTitle('The Biorhythm');
  subHeading('The Enduring Rhythm', BURGUNDY);
  paragraph('Chronotype: Steady and sustained, with a strong, reliable midday peak. You build momentum and hold it.', true);
  paragraph('Peak Time: Late Morning to Mid-Afternoon (11 AM\u20135 PM). Deep, focused, productive work in long, uninterrupted blocks.', true);

  subHeading('Your Biorhythm Schedule', PINE);
  paragraph('Peak time: 11 AM\u20135 PM \u2014 sustained, focused, productive energy. A long, steady working peak.');
  bullets([
    '6\u20139 AM \u2014 Slow, deliberate start. Hearty breakfast, grounding routine, easing into the day.',
    '9\u201311 AM \u2014 Warming up. Planning, organizing, preparing the work that matters.',
    '11 AM\u20132 PM \u2014 Deep focus peak. Your most productive, mastery-driven work.',
    '2\u20135 PM \u2014 Sustained output. Building, completing, holding steady through the long stretch.',
    'Evening \u2014 Grounding wind-down. A hearty meal, working with your hands, genuine rest to rebuild your heat.',
  ], PINE);
  paragraph(p.growth.newYearResolution, true);


  // \u2500\u2500 THE ULTIMATE ELEMENTAL GOAL \u2500\u2500
  sectionTitle('The Ultimate Elemental Goal');
  paragraph('To become the Unshakable Anvil of Legacy \u2014 a tempered strength upon which worthy things are built and sustained, providing a dependable foundation for generations.');

  // \u2500\u2500 FINAL SUMMARY \u2500\u2500
  sectionTitle('Final Summary');
  paragraph('The Forged Iron is not merely strong \u2014 it is a foundation for transformation. Your gift is not the flash of the flame, but the enduring strength of tempered iron. You hold steady when others waver, protect what is vulnerable, and build what will outlast you. Your purpose is to forge passion into permanence \u2014 and in doing so, to give the world something it can depend on.');
  paragraph('But the deepest truth of your nature is this: the iron that cannot be reheated cannot be reshaped. You are not just the strength that holds \u2014 you are the fire that lives within the form. And when you learn to soften without breaking, to bend without collapsing, you become the most powerful force in any room: the one who endures, and who knows when to let the fire breathe.');

  // \u2500\u2500 CLOSING \u2500\u2500
  ensure(70);
  gradientBar(doc, ml, y, cw, 3, PINE, EMBER, BURGUNDY);
  y += 18;
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9.5); doc.setTextColor(...SLATE);
  doc.splitTextToSize(p.closing, cw).forEach((ln: string) => { ensure(14); doc.text(ln, ml, y); y += 13.5; });

  // \u2500\u2500 FOOTER / PAGE NUMBERS \u2500\u2500
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    gradientBar(doc, ml, ph - 34, cw, 2, heroFrom, heroMid, heroTo);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5); doc.setTextColor(...GRAY);
    doc.text('THE INVISIBLE SELF  \u00B7  FIRE + EARTH PROFILE', ml, ph - 22);
    doc.text(`Page ${i} of ${total}`, pw - ml, ph - 22, { align: 'right' });
  }

  doc.save('fire-earth-forged-iron-profile.pdf');
}
