import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Download, Printer, X, Link2, Copy, Check, Mail, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';

// ── Types ──────────────────────────────────────────────────────────────────────

interface WardrobeReviewPDFGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  userElement: string;
  userSubtype?: string | null;
}

interface WardrobeReviewData {
  element: string;
  theme: string;
  themeVerb: string;
  colors: string[];
  coreDrive: string;
  primaryQuestion: string;
  mantra: string;
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  piles: {
    name: string;
    description: string;
  }[];
  finalAct: string;
  subtypes: {
    id: string;
    name: string;
    test: string;
    guidance: string;
  }[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const wardrobeReviewData: Record<string, WardrobeReviewData> = {
  fire: {
    element: 'fire',
    theme: 'REFUEL Your Wardrobe',
    themeVerb: 'REFUEL',
    colors: ['#C41E3A', '#0A0A0A', '#FF6B35'],
    coreDrive: 'To Ignite, Energize, and Empower.',
    primaryQuestion: '"Does this item feed or drain my vital spark?"',
    mantra: '"I release what dampens my flame. I keep what fuels my fire."',
    process: [
      { step: '1', title: 'Create Your "Arena"', description: 'Clear a space. Put on energizing music. This is an active ritual.' },
      { step: '2', title: 'The Trial by Fire', description: 'Try on every single item. Do not think about cost, occasion, or sentiment. Focus only on the somatic and emotional response.' },
      { step: '3', title: 'The Three Piles', description: 'Sort each item into FUEL, ASH, or KINDLING based on how it makes you feel.' },
      { step: '4', title: 'The Final Act', description: 'Review your FUEL pile. This is your energetic core. Does it collectively feel like it could power you through your life? If not, what one missing piece would be the ultimate spark?' }
    ],
    piles: [
      { name: 'FUEL', description: '"This makes me feel powerful, alive, confident, or radiant." (Keep)' },
      { name: 'ASH', description: '"This makes me feel dull, insecure, tired, or like I\'m in costume." (Discard/Donate)' },
      { name: 'KINDLING', description: '"This has potential but needs a spark." (Alter, tailor, or set aside with a plan to style it with a FUEL item).' }
    ],
    finalAct: 'Review your FUEL pile. This is your energetic core. Does it collectively feel like it could power you through your life?',
    subtypes: [
      { id: 'electric-arc', name: 'The Electric Arc (Pure Fire)', test: 'Your test is precision.', guidance: 'Does it feel sharp, definitive, and impeccably you? If it\'s even 5% off, it\'s ASH. Your wardrobe should feel like a curated arsenal.' },
      { id: 'blue-flame', name: 'The Blue Flame (Fire + Water)', test: 'Your test is potency.', guidance: 'Does it make you feel intelligently intense, focused, and quietly formidable? Avoid anything fussy or overly decorative. Seek architectural simplicity that contains power.' },
      { id: 'forged-iron', name: 'The Forged Iron (Fire + Earth)', test: 'Your test is integrity.', guidance: 'Does it feel substantial, reliable, and like it tells a story of strength? Sentiment is valid here if it\'s tied to endurance. Shed anything that feels flimsy or dishonest.' },
      { id: 'illuminating-spark', name: 'The Illuminating Spark (Fire + Air)', test: 'Your test is exuberance.', guidance: 'Does it make you want to move, connect, and create? Does it spark joy, literally? Your FUEL pile should look and feel like a celebration. Ditch the "serious" items that stifle your play.' }
    ]
  },
  water: {
    element: 'water',
    theme: 'DISTILL Your Wardrobe',
    themeVerb: 'DISTILL',
    colors: ['#6B8BA4', '#B4A7D6', '#D4A5A5'],
    coreDrive: 'To Connect, Feel, and Honor Essence.',
    primaryQuestion: '"Does this item resonate with my emotional truth and intuitive self?"',
    mantra: '"I release emotional attachments. I keep what holds my essence. I flow towards what feels true."',
    process: [
      { step: '1', title: 'Set the Atmosphere', description: 'Soft lighting, perhaps calming music or silence. This is a reflective, intuitive process.' },
      { step: '2', title: 'The Intuitive Sort', description: 'Go through your wardrobe without trying everything on. Hold each item. Close your eyes. What memory, feeling, or sense of self does it evoke?' },
      { step: '3', title: 'The Three Piles', description: 'Sort each item into PURE FLOW, STAGNANT WATER, or MURKY DEPTHS based on its emotional resonance.' },
      { step: '4', title: 'The Essence Check', description: 'Look at your PURE FLOW collection. What is the overall story, mood, or emotion it conveys? Does it feel like a nurturing, authentic container for your spirit?' }
    ],
    piles: [
      { name: 'PURE FLOW', description: '"This feels deeply like me. It holds a positive memory or aligns with my current emotional landscape." (Keep)' },
      { name: 'STAGNANT WATER', description: '"This holds a negative memory, guilt (\'I spent too much\'), or is tied to a past self I\'ve outgrown." (Release)' },
      { name: 'MURKY DEPTHS', description: '"I have no feeling about this. It\'s emotionally blank." (This is often the most important to release—it\'s dead energy).' }
    ],
    finalAct: 'Look at your PURE FLOW collection. What is the overall story, mood, or emotion it conveys?',
    subtypes: [
      { id: 'misty-shore', name: 'The Misty Shore (Water + Air)', test: 'Distill for gentle harmony.', guidance: 'Does it feel soft, blending, and peaceful? "STAGNANT WATER" might be items from a time you felt you had to be harsh or defined. Keep only what feels like a tender hug.' },
      { id: 'forest-lake', name: 'The Forest Lake (Pure Water)', test: 'Distill for profound truth.', guidance: 'Does it connect to your depths, your mystery, your private self? Release anything that feels superficial, trendy, or meant for performative socializing.' },
      { id: 'sun-dappled-pond', name: 'The Sun-Dappled Pond (Water + Fire)', test: 'Distill for warm memory.', guidance: 'Does it hold the golden light of a positive past or feel like it could become a future heirloom? Honor only what genuinely warms your heart.' },
      { id: 'languid-river', name: 'The Languid River (Water + Earth)', test: 'Distill for nurturing comfort.', guidance: 'Does it feel like it supports and cares for you, body and soul? Release anything that makes you feel anxious, restricted, or like you have to "perform" wellness.' }
    ]
  },
  earth: {
    element: 'earth',
    theme: 'UNEARTH Your Wardrobe',
    themeVerb: 'UNEARTH',
    colors: ['#CC4E3E', '#808000', '#8B4513'],
    coreDrive: 'To Stabilize, Assess, and Build Foundation.',
    primaryQuestion: '"Is this item sound, functional, and worthy of my resources?"',
    mantra: '"I honor what is real. I repair what is valuable. I release what is decayed."',
    process: [
      { step: '1', title: 'The Excavation', description: 'Empty everything. Lay all items out where you can see and touch them.' },
      { step: '2', title: 'The Tactile Audit', description: 'Touch every garment. Examine seams, check for stains, pilling, broken zippers, weak elastics. Feel the weight and quality of the fabric.' },
      { step: '3', title: 'The Three Piles', description: 'Sort each item into SOLID GROUND, FERTILE SOIL, or COMPOST based on its condition, fit, and purpose.' },
      { step: '4', title: 'The Foundation Check', description: 'Look at your SOLID GROUND pile. Do you have the foundational pieces for your climate and lifestyle (a good coat, sturdy shoes, workhorse pants)? This is about utility and resource management.' }
    ],
    piles: [
      { name: 'SOLID GROUND', description: '"This is in perfect condition, fits my body now, and serves a clear purpose." (Keep)' },
      { name: 'FERTILE SOIL', description: '"This is damaged but repairable, or can be altered. Its core material is good." (Mend/Alter)' },
      { name: 'COMPOST', description: '"This is worn out, stained beyond saving, ill-fitting, or serves no purpose in my current life." (Discard/Recycle)' }
    ],
    finalAct: 'Look at your SOLID GROUND pile. Do you have the foundational pieces for your climate and lifestyle?',
    subtypes: [
      { id: 'mountain-stone', name: 'The Mountain Stone (Earth + Fire)', test: 'Your audit is structural.', guidance: 'Does each piece have a defined role in the architecture of your wardrobe? Is it timeless and principled? "COMPOST" anything trendy or poorly constructed.' },
      { id: 'forest-floor', name: 'The Forest Floor (Pure Earth)', test: 'Your audit is cyclical.', guidance: 'Is it seasonally appropriate? Is it made of natural, breathable fibers? Can it handle real life? Mend with pride. Compost anything synthetic and non-biodegradable that\'s past its use.' },
      { id: 'velvet-moss', name: 'The Velvet Moss (Earth + Water)', test: 'Your audit is sensual.', guidance: 'Does it feel delicious against your skin? Is it softly worn-in, not threadbare? Your "FERTILE SOIL" pile is for items to be re-softened or luxuriously repaired. Compost anything scratchy or harsh.' },
      { id: 'golden-harvest', name: 'The Golden Harvest (Earth + Air)', test: 'Your audit is abundant.', guidance: 'Is the fabric rich? Is the color vibrant? Is the craftsmanship evident? "SOLID GROUND" items should feel like treasures. Compost anything that looks cheap, faded, or meager.' }
    ]
  },
  air: {
    element: 'air',
    theme: 'BREATHE INTO Your Wardrobe',
    themeVerb: 'BREATHE',
    colors: ['#FF7F50', '#FFE135', '#FFCBA4'],
    coreDrive: 'To Analyze, Systematize, and Create Space.',
    primaryQuestion: '"Does this item have a logical place and purpose in my life system?"',
    mantra: '"I clarify my options. I create space for new ideas. I organize for ease."',
    process: [
      { step: '1', title: 'The Mind Map', description: 'Before touching a hanger, write or diagram your lifestyle categories (e.g., Work-In Office, Work-From Home, Social-Casual, Social-Formal, Athletic, Creative).' },
      { step: '2', title: 'The Categorization Sort', description: 'Place each item into its primary lifestyle category. Be ruthless. If an item doesn\'t have a category, it\'s likely superfluous.' },
      { step: '3', title: 'The Three Piles', description: 'Sort each item into CLEAR AIR, CLOUDY, or CLUTTER based on its categorical fit and versatility.' },
      { step: '4', title: 'The System Implementation', description: 'For your CLEAR AIR items, organize them by category and then by color within your closet. Create a digital or physical "lookbook" of go-to outfits. This is your operational manual.' }
    ],
    piles: [
      { name: 'CLEAR AIR', description: '"This fits a category perfectly, mixes with multiple other items, and I wear it regularly." (Keep)' },
      { name: 'CLOUDY', description: '"This fits a category but is redundant, or I\'m unsure how to style it." (Set aside for a styling session)' },
      { name: 'CLUTTER', description: '"This has no category, doesn\'t mix, or I haven\'t worn it in over a year." (Donate/Sell)' }
    ],
    finalAct: 'For your CLEAR AIR items, organize them by category and then by color within your closet.',
    subtypes: [
      { id: 'clear-morning-sky', name: 'The Clear Morning Sky (Pure Air)', test: 'Your system is minimalist logic.', guidance: 'Aim for a uniform-like coherence where everything works together. "CLUTTER" is anything that breaks the system\'s elegance or lacks versatility.' },
      { id: 'playful-breeze', name: 'The Playful Breeze (Air + Fire)', test: 'Your system is creative connection.', guidance: 'Categories can be by color or mood, not just function. Your "CLOUDY" pile is your playground—host a styling session to invent new, unexpected combinations.' },
      { id: 'gilded-zephyr', name: 'The Gilded Zephyr (Air + Earth)', test: 'Your system is social architecture.', guidance: 'Categories should reflect your roles (Host, Collaborator, Community Leader). "CLEAR AIR" items are those that make you feel articulate and put-together in social settings.' },
      { id: 'first-whisper', name: 'The First Whisper (Air + Water)', test: 'Your system is ethereal flow.', guidance: 'Categories might be "Daydreaming," "Quiet Contemplation," "Subtle Social." "CLUTTER" is anything loud, stiff, or demanding. Organization should feel light and effortless.' }
    ]
  }
};

// ── Element Styling ────────────────────────────────────────────────────────────

const elementConfig: Record<string, {
  label: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  lightBg: string;
  borderColor: string;
  textDark: string;
  iconPath: string;
  seasonLabel: string;
}> = {
  fire: {
    label: 'Fire',
    gradient: 'linear-gradient(135deg, #991B1B 0%, #C41E3A 40%, #FF6B35 100%)',
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    accentColor: '#C41E3A',
    lightBg: '#FEF2F2',
    borderColor: '#FCA5A5',
    textDark: '#991B1B',
    iconPath: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
    seasonLabel: 'Winter'
  },
  water: {
    label: 'Water',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #6B8BA4 40%, #B4A7D6 100%)',
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    accentColor: '#6B8BA4',
    lightBg: '#EFF6FF',
    borderColor: '#93C5FD',
    textDark: '#1E40AF',
    iconPath: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
    seasonLabel: 'Summer'
  },
  earth: {
    label: 'Earth',
    gradient: 'linear-gradient(135deg, #78350F 0%, #8B4513 40%, #CC4E3E 100%)',
    gradientFrom: '#8B4513',
    gradientTo: '#CC4E3E',
    accentColor: '#8B4513',
    lightBg: '#FFFBEB',
    borderColor: '#FCD34D',
    textDark: '#92400E',
    iconPath: 'm8 3 4 8 5-5 5 15H2L8 3z',
    seasonLabel: 'Autumn'
  },
  air: {
    label: 'Air',
    gradient: 'linear-gradient(135deg, #C2410C 0%, #FF7F50 40%, #FFE135 100%)',
    gradientFrom: '#FF7F50',
    gradientTo: '#FFE135',
    accentColor: '#FF7F50',
    lightBg: '#FFF7ED',
    borderColor: '#FDBA74',
    textDark: '#C2410C',
    iconPath: 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2',
    seasonLabel: 'Spring'
  }
};

// ── Component ──────────────────────────────────────────────────────────────────

const WardrobeReviewPDFGenerator: React.FC<WardrobeReviewPDFGeneratorProps> = ({
  isOpen,
  onClose,
  userElement,
  userSubtype
}) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const data = wardrobeReviewData[userElement];
  const config = elementConfig[userElement] || elementConfig.fire;
  const userSubtypeData = data?.subtypes.find(s => s.id === userSubtype);

  // Generate shareable link
  const shareableLink = useMemo(() => {
    const payload = { e: userElement, s: userSubtype || '' };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    return `${window.location.origin}${window.location.pathname}?wardrobe=${encoded}`;
  }, [userElement, userSubtype]);

  // Generate plain text summary
  const textSummary = useMemo(() => {
    if (!data) return '';
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push(`     ${data.theme.toUpperCase()}`);
    lines.push('     Elemental Wardrobe Review Guide');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Element: ${config.label} (${config.seasonLabel})`);
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');

    lines.push('── CORE PHILOSOPHY ──');
    lines.push(`  Core Drive: ${data.coreDrive}`);
    lines.push(`  Primary Question: ${data.primaryQuestion}`);
    lines.push(`  Mantra: ${data.mantra}`);
    lines.push('');

    lines.push('── THE PROCESS ──');
    data.process.forEach(step => {
      lines.push(`  Step ${step.step}: ${step.title}`);
      lines.push(`    ${step.description}`);
      lines.push('');
    });

    lines.push('── THE THREE PILES ──');
    data.piles.forEach(pile => {
      lines.push(`  ${pile.name}`);
      lines.push(`    ${pile.description}`);
      lines.push('');
    });

    if (userSubtypeData) {
      lines.push('── YOUR SUBTYPE GUIDANCE ──');
      lines.push(`  ${userSubtypeData.name}`);
      lines.push(`  ${userSubtypeData.test}`);
      lines.push(`  ${userSubtypeData.guidance}`);
      lines.push('');
    }

    lines.push('── ALL SUBTYPES REFERENCE ──');
    data.subtypes.forEach(sub => {
      const isYou = sub.id === userSubtype;
      lines.push(`  ${isYou ? '→ ' : '  '}${sub.name}${isYou ? ' (YOU)' : ''}`);
      lines.push(`    ${sub.test}`);
      lines.push(`    ${sub.guidance}`);
      lines.push('');
    });

    lines.push('── CLOSING REFLECTION ──');
    lines.push('  "By engaging in your elemental review, you don\'t just clean a closet.');
    lines.push('  You perform an act of self-definition. You align your external shell');
    lines.push('  with the internal truth of your energy, creating a wardrobe that is');
    lines.push('  less about fashion and more about functional, resonant being."');
    lines.push('');
    lines.push('═══════════════════════════════════════════');
    lines.push('  Generated from Elemental Color Analysis');
    lines.push('═══════════════════════════════════════════');

    return lines.join('\n');
  }, [data, config, userSubtype, userSubtypeData]);

  // Download as image
  const handleDownload = useCallback(async () => {
    if (!guideRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(guideRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 900
      });
      const link = document.createElement('a');
      link.download = `${userElement}-wardrobe-review-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [userElement]);

  // Print
  const handlePrint = useCallback(() => {
    const printContent = guideRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data?.theme || 'Wardrobe Review Guide'}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }, [data]);

  // Copy link
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  }, [shareableLink]);

  // Copy text
  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(textSummary).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  }, [textSummary]);

  // Email
  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(`${data?.theme || 'Wardrobe Review'} — Elemental Guide`);
    const body = encodeURIComponent(
      `I've generated a personalized Elemental Wardrobe Review Guide. Here's the summary:\n\n` +
      `Element: ${config.label} (${config.seasonLabel})\n` +
      `Theme: ${data?.theme}\n` +
      (userSubtypeData ? `Subtype: ${userSubtypeData.name}\n` : '') +
      `\nView the full interactive guide here:\n${shareableLink}\n\n` +
      `--- Full Text Guide ---\n\n${textSummary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [data, config, userSubtypeData, shareableLink, textSummary]);

  if (!isOpen || !data) return null;

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* ── Modal Header ── */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0" style={{ background: config.gradient }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Share Wardrobe Review Guide</h2>
              <p className="text-sm text-white/60">Download, print, or share your {config.label} element guide</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* ── Action Buttons Bar ── */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b flex-shrink-0">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 hover:brightness-110"
            style={{ background: config.gradient }}
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Download Image'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors shadow-md"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedLink
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleCopyText}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedText
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedText ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* ── Shareable Link Preview ── */}
        <div className="px-4 py-3 bg-gray-50 border-b flex-shrink-0">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={handleCopyLink}
              className="text-xs font-medium flex-shrink-0 hover:opacity-80"
              style={{ color: config.accentColor }}
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 px-1">
            Anyone with this link can view the wardrobe review guide for your element and subtype.
          </p>
        </div>

        {/* ── Scrollable Document Preview ── */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div
            ref={guideRef}
            className="bg-white shadow-lg mx-auto"
            style={{ width: '816px', minHeight: '1056px', padding: '40px' }}
          >
            {/* ── Document Header ── */}
            <div
              style={{
                background: config.gradient,
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative circles */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)'
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', left: '40%',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={config.iconPath} />
                    {userElement === 'air' && (
                      <>
                        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
                      </>
                    )}
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', margin: 0 }}>
                    {data.theme}
                  </h1>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
                    Elemental Wardrobe Review — {config.label} ({config.seasonLabel}) — {dateStr}
                  </p>
                </div>
              </div>

              {/* Element + Subtype pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                  padding: '4px 12px 4px 8px', fontSize: '12px'
                }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '4px',
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={config.iconPath} />
                    </svg>
                  </div>
                  <span style={{ fontWeight: 600 }}>{config.label} Element</span>
                </div>
                {userSubtypeData && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                    padding: '4px 12px', fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 600 }}>{userSubtypeData.name}</span>
                  </div>
                )}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.08)', borderRadius: '20px',
                  padding: '4px 12px', fontSize: '11px', opacity: 0.8
                }}>
                  <span>Verb: {data.themeVerb}</span>
                </div>
              </div>
            </div>

            {/* ── Core Philosophy Section ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                Core Philosophy
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {/* Core Drive */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.lightBg, border: `1px solid ${config.borderColor}`
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700, color: config.textDark,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                  }}>
                    Core Drive
                  </div>
                  <p style={{ fontSize: '12px', color: '#1F2937', fontWeight: 600, lineHeight: '1.5' }}>
                    {data.coreDrive}
                  </p>
                </div>
                {/* Primary Question */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.lightBg, border: `1px solid ${config.borderColor}`
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700, color: config.textDark,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                  }}>
                    Primary Question
                  </div>
                  <p style={{ fontSize: '12px', color: '#374151', fontStyle: 'italic', lineHeight: '1.5' }}>
                    {data.primaryQuestion}
                  </p>
                </div>
                {/* Mantra */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.gradient, color: 'white'
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px',
                    opacity: 0.7
                  }}>
                    Mantra
                  </div>
                  <p style={{ fontSize: '12px', fontStyle: 'italic', lineHeight: '1.5', fontFamily: 'Georgia, serif' }}>
                    {data.mantra}
                  </p>
                </div>
              </div>
            </div>

            {/* ── The Process ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                The Process
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.process.map((step, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '12px 14px', borderRadius: '10px',
                    background: config.lightBg, border: `1px solid ${config.borderColor}`
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: config.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 'bold', color: 'white', flexShrink: 0, marginTop: '1px'
                    }}>
                      {step.step}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', marginBottom: '2px' }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.5' }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── The Three Piles ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                The Three Piles
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {data.piles.map((pile, idx) => {
                  const pileColor = data.colors[idx] || config.accentColor;
                  return (
                    <div key={idx} style={{
                      padding: '14px', borderRadius: '10px',
                      background: '#F9FAFB',
                      borderLeft: `4px solid ${pileColor}`,
                      border: `1px solid #E5E7EB`,
                      borderLeftWidth: '4px',
                      borderLeftColor: pileColor
                    }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '2px',
                          background: pileColor
                        }} />
                        <h4 style={{
                          fontSize: '13px', fontWeight: 700, color: pileColor,
                          textTransform: 'uppercase', letterSpacing: '0.03em'
                        }}>
                          {pile.name}
                        </h4>
                      </div>
                      <p style={{ fontSize: '10px', color: '#6B7280', lineHeight: '1.6' }}>
                        {pile.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Color Palette Preview ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                Your Element Color Palette
              </h3>
              <div style={{
                display: 'flex', gap: '4px', borderRadius: '10px', overflow: 'hidden',
                height: '40px', border: '1px solid #E5E7EB'
              }}>
                {data.colors.map((color, idx) => (
                  <div key={idx} style={{
                    flex: 1, background: color,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    paddingBottom: '4px'
                  }}>
                    <span style={{
                      fontSize: '7px', fontWeight: 600,
                      color: idx === 1 ? '#fff' : '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      letterSpacing: '0.03em'
                    }}>
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Your Subtype Guidance (highlighted) ── */}
            {userSubtypeData && (
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                marginBottom: '24px', border: `2px solid ${config.accentColor}`
              }}>
                <div style={{
                  background: config.gradient,
                  padding: '16px 20px', color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                        Your Subtype Guidance
                      </h3>
                      <p style={{ fontSize: '11px', opacity: 0.7 }}>{userSubtypeData.name}</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', background: config.lightBg }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'
                  }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700,
                      background: config.gradient, color: 'white'
                    }}>
                      YOUR TYPE
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: config.textDark }}>
                      {userSubtypeData.test}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6' }}>
                    {userSubtypeData.guidance}
                  </p>
                </div>
              </div>
            )}

            {/* ── All Subtypes Reference ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                All {config.label} Subtypes Reference
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {data.subtypes.map((sub) => {
                  const isYou = sub.id === userSubtype;
                  return (
                    <div key={sub.id} style={{
                      padding: '12px', borderRadius: '10px',
                      background: isYou ? `${config.lightBg}` : '#F9FAFB',
                      border: isYou ? `2px solid ${config.accentColor}` : '1px solid #E5E7EB',
                      position: 'relative'
                    }}>
                      {isYou && (
                        <div style={{
                          position: 'absolute', top: '-1px', right: '12px',
                          padding: '1px 8px', borderRadius: '0 0 6px 6px',
                          background: config.gradient, color: 'white',
                          fontSize: '8px', fontWeight: 700, letterSpacing: '0.05em'
                        }}>
                          YOU
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '6px',
                          background: isYou ? config.gradient : '#E5E7EB',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isYou ? 'white' : '#9CA3AF'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d={config.iconPath} />
                          </svg>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>
                          {sub.name}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '10px', fontWeight: 600, marginBottom: '4px',
                        color: isYou ? config.textDark : '#6B7280'
                      }}>
                        {sub.test}
                      </p>
                      <p style={{ fontSize: '10px', color: '#6B7280', lineHeight: '1.5' }}>
                        {sub.guidance.length > 180 ? sub.guidance.substring(0, 180) + '...' : sub.guidance}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Closing Quote ── */}
            <div style={{
              background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
              borderRadius: '12px', padding: '20px 24px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '12px', color: '#D1D5DB', lineHeight: '1.7',
                fontStyle: 'italic', fontFamily: 'Georgia, serif', textAlign: 'center'
              }}>
                "By engaging in your elemental review, you don't just clean a closet. You perform an act of
                self-definition. You align your external shell with the internal truth of your energy, creating
                a wardrobe that is less about fashion and more about{' '}
                <span style={{ color: '#FBBF24', fontWeight: 600 }}>functional, resonant being</span>."
              </p>
            </div>

            {/* ── Sharing Note ── */}
            <div style={{
              background: `linear-gradient(135deg, ${config.lightBg}, #FFF7ED, #FFFBEB)`,
              borderRadius: '12px', padding: '16px 20px',
              border: `1px solid ${config.borderColor}`, marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '11px', color: '#6B7280', lineHeight: '1.6',
                fontStyle: 'italic', fontFamily: 'Georgia, serif'
              }}>
                This guide is designed to be shared with friends, partners, stylists, or anyone who wants
                to understand your elemental approach to wardrobe curation. Understanding your element's
                relationship with clothing is the first step toward building a wardrobe that truly resonates
                with your inner energy. Share it freely — the more people who understand their elemental
                style, the more authentic and aligned we all become.
              </p>
            </div>

            {/* ── Footer ── */}
            <div style={{
              borderTop: '1px solid #E5E7EB', paddingTop: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <p style={{ fontSize: '9px', color: '#9CA3AF' }}>
                Generated from Elemental Color Analysis — {new Date().toLocaleDateString()}
              </p>
              <p style={{ fontSize: '9px', color: '#9CA3AF' }}>
                {config.label} Element — {data.subtypes.length} subtypes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeReviewPDFGenerator;
