import jsPDF from 'jspdf';

interface ShoppingItem {
  category: string;
  recommendation: string;
  whyItWorks: string;
  pieceType: string;
}

interface SubtypeData {
  name: string;
  subtitle: string;
  philosophy: string;
  principles: string[];
  items: ShoppingItem[];
  avoid: string[];
}

interface ElementColors {
  primary: [number, number, number];
  secondary: [number, number, number];
  accent: [number, number, number];
  light: [number, number, number];
}

const ELEMENT_COLORS: Record<string, ElementColors> = {
  fire: {
    primary: [185, 28, 28],
    secondary: [234, 88, 12],
    accent: [245, 158, 11],
    light: [254, 242, 242],
  },
  water: {
    primary: [29, 78, 216],
    secondary: [79, 70, 229],
    accent: [139, 92, 246],
    light: [239, 246, 255],
  },
  earth: {
    primary: [180, 83, 9],
    secondary: [194, 65, 12],
    accent: [217, 119, 6],
    light: [255, 251, 235],
  },
  air: {
    primary: [194, 65, 12],
    secondary: [234, 179, 8],
    accent: [251, 146, 60],
    light: [255, 247, 237],
  },
};

const ELEMENT_VERBS: Record<string, string> = {
  fire: 'REFUEL',
  water: 'DISTILL',
  earth: 'UNEARTH',
  air: 'BREATHE',
};

function drawGradientLine(doc: jsPDF, x: number, y: number, width: number, colors: ElementColors) {
  const steps = 20;
  const stepWidth = width / steps;
  for (let i = 0; i < steps; i++) {
    const ratio = i / steps;
    const r = Math.round(colors.primary[0] + (colors.secondary[0] - colors.primary[0]) * ratio);
    const g = Math.round(colors.primary[1] + (colors.secondary[1] - colors.primary[1]) * ratio);
    const b = Math.round(colors.primary[2] + (colors.secondary[2] - colors.primary[2]) * ratio);
    doc.setFillColor(r, g, b);
    doc.rect(x + i * stepWidth, y, stepWidth + 0.5, 1.5, 'F');
  }
}

function checkPageBreak(doc: jsPDF, currentY: number, needed: number, pageHeight: number, margin: number): number {
  if (currentY + needed > pageHeight - margin) {
    doc.addPage();
    return 40;
  }
  return currentY;
}

function getPieceTypeColors(pieceType: string): { bg: [number, number, number]; text: [number, number, number] } {
  const lower = pieceType.toLowerCase();
  if (lower.includes('signature')) return { bg: [254, 226, 226], text: [185, 28, 28] };
  if (lower.includes('foundation')) return { bg: [241, 245, 249], text: [71, 85, 105] };
  if (lower.includes('statement')) return { bg: [243, 232, 255], text: [126, 34, 206] };
  if (lower.includes('workhorse')) return { bg: [219, 234, 254], text: [29, 78, 216] };
  if (lower.includes('versatile')) return { bg: [209, 250, 229], text: [4, 120, 87] };
  if (lower.includes('utility')) return { bg: [254, 243, 199], text: [180, 83, 9] };
  return { bg: [243, 244, 246], text: [75, 85, 99] };
}

export function generateShoppingListPDF(subtype: SubtypeData, element: string): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const ml = 50; // margin left
  const cw = pageWidth - 100; // content width
  const mb = 60; // margin bottom

  const colors = ELEMENT_COLORS[element] || ELEMENT_COLORS.fire;
  const verb = ELEMENT_VERBS[element] || 'DISCOVER';

  // ===== HEADER BANNER =====
  doc.setFillColor(17, 24, 39);
  doc.rect(0, 0, pageWidth, 120, 'F');
  drawGradientLine(doc, 0, 118, pageWidth, colors);

  // Element + Verb label
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  doc.text(`${element.toUpperCase()} \u2014 ${verb}`, pageWidth / 2, 38, { align: 'center' });

  // Subtype name
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  const subtypeParts = subtype.name.split(' \u2014 ');
  const displayName = subtypeParts.length > 1 ? subtypeParts[1] : subtype.name;
  doc.text(displayName, pageWidth / 2, 68, { align: 'center' });

  // Subtitle
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(156, 163, 175);
  doc.text(subtype.subtitle, pageWidth / 2, 88, { align: 'center' });

  // Label
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(107, 114, 128);
  doc.text('ELEMENTAL SHOPPING LIST', pageWidth / 2, 108, { align: 'center' });

  let y = 145;

  // ===== PHILOSOPHY SECTION =====
  const fullPhiloText = `\u201C${subtype.philosophy}\u201D`;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  const philoLines = doc.splitTextToSize(fullPhiloText, cw - 40) as string[];
  const philoBoxH = philoLines.length * 15 + 55;

  doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
  doc.roundedRect(ml, y, cw, philoBoxH, 6, 6, 'F');

  // Accent line
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(ml + 20, y + 15, 30, 2, 'F');

  // Section title
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(`THE ${verb} PHILOSOPHY`, ml + 20, y + 30);

  // Philosophy text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(55, 65, 81);
  let philoY = y + 48;
  philoLines.forEach((line: string) => {
    doc.text(line, ml + 20, philoY);
    philoY += 15;
  });

  y += philoBoxH + 20;

  // ===== CORE SHOPPING PRINCIPLES =====
  y = checkPageBreak(doc, y, 30 + subtype.principles.length * 20, pageHeight, mb);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('CORE SHOPPING PRINCIPLES', ml, y);
  y += 18;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);

  subtype.principles.forEach((principle) => {
    y = checkPageBreak(doc, y, 20, pageHeight, mb);
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.circle(ml + 5, y - 3, 2.5, 'F');
    const lines = doc.splitTextToSize(principle, cw - 20) as string[];
    lines.forEach((line: string, i: number) => {
      doc.text(line, ml + 16, y + i * 14);
    });
    y += lines.length * 14 + 4;
  });

  y += 12;

  // ===== DIVIDER =====
  drawGradientLine(doc, ml, y, cw, colors);
  y += 18;

  // ===== STARTER SHOPPING LIST =====
  y = checkPageBreak(doc, y, 40, pageHeight, mb);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Starter Shopping List', ml, y);
  y += 8;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`${subtype.items.length} curated pieces for your elemental wardrobe`, ml, y + 10);
  y += 25;

  subtype.items.forEach((item, idx) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const recLines = doc.splitTextToSize(item.recommendation, cw - 80) as string[];
    doc.setFontSize(9);
    const whyLines = doc.splitTextToSize(item.whyItWorks, cw - 80) as string[];
    const itemH = 30 + recLines.length * 13 + whyLines.length * 12 + 10;

    y = checkPageBreak(doc, y, itemH, pageHeight, mb);

    // Card background
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(ml, y - 5, cw, itemH, 4, 4, 'F');

    // Left accent border
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.roundedRect(ml, y - 5, 3, itemH, 1.5, 1.5, 'F');

    // Number circle
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.circle(ml + 20, y + 8, 10, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(String(idx + 1), ml + 20, y + 12, { align: 'center' });

    // Category
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    const catText = item.category.toUpperCase();
    doc.text(catText, ml + 38, y + 12);

    // Piece type badge
    const catW = doc.getTextWidth(catText);
    const badgeColors = getPieceTypeColors(item.pieceType);
    const badgeText = item.pieceType.toUpperCase();
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    const badgeTextW = doc.getTextWidth(badgeText);
    const bx = ml + 42 + catW;
    doc.setFillColor(...badgeColors.bg);
    doc.roundedRect(bx, y + 5, badgeTextW + 8, 10, 2, 2, 'F');
    doc.setTextColor(...badgeColors.text);
    doc.text(badgeText, bx + 4, y + 12);

    // Recommendation
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    let iy = y + 28;
    recLines.forEach((line: string) => {
      doc.text(line, ml + 38, iy);
      iy += 13;
    });

    // Why it works
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(107, 114, 128);
    iy += 2;
    whyLines.forEach((line: string) => {
      doc.text(line, ml + 38, iy);
      iy += 12;
    });

    y += itemH + 6;
  });

  y += 10;

  // ===== WHAT TO AVOID =====
  const avoidH = 35 + subtype.avoid.length * 22;
  y = checkPageBreak(doc, y, avoidH, pageHeight, mb);

  // Red background
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(ml, y - 5, cw, avoidH, 6, 6, 'F');

  // Red left border
  doc.setFillColor(239, 68, 68);
  doc.roundedRect(ml, y - 5, 3, avoidH, 1.5, 1.5, 'F');

  // Title
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(185, 28, 28);
  doc.text('WHAT TO AVOID', ml + 16, y + 10);
  y += 25;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(153, 27, 27);

  subtype.avoid.forEach((avoidItem) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(239, 68, 68);
    doc.text('\u00D7', ml + 18, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(153, 27, 27);
    const lines = doc.splitTextToSize(avoidItem, cw - 45) as string[];
    lines.forEach((line: string, i: number) => {
      doc.text(line, ml + 32, y + i * 14);
    });
    y += lines.length * 14 + 6;
  });

  y += 20;

  // ===== FOOTER =====
  y = checkPageBreak(doc, y, 60, pageHeight, mb);

  drawGradientLine(doc, ml, y, cw, colors);
  y += 15;

  // Closing quote
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(107, 114, 128);
  const closingQuote = '\u201CThe perfect piece is not perfect because it matches a list. It is perfect because, when you wear it, you recognize yourself.\u201D';
  const closingLines = doc.splitTextToSize(closingQuote, cw - 40) as string[];
  closingLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 13;
  });

  y += 10;

  // Branding
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(156, 163, 175);
  doc.text('THE INVISIBLE SELF  |  ELEMENTAL SHOPPING LIST', pageWidth / 2, y, { align: 'center' });

  // ===== PAGE NUMBERS =====
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 25, { align: 'center' });
    drawGradientLine(doc, ml, pageHeight - 35, cw, colors);
  }

  // ===== SAVE =====
  const safeName = subtype.name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  doc.save(`elemental-shopping-list-${safeName}.pdf`);
}
