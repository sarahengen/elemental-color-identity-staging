import React, { useState } from 'react';
import {
  ArrowLeft,

  Newspaper,
  Download,
  Mail,
  Quote,
  Lightbulb,
  Camera,
  Users,
  Sparkles,
  BookOpen,
  Palette,
  Globe,
  Award,
  Calendar,
  Video,

  Crown,
  MessageSquare,
  Shirt,
  Copy,
  Check,

  FileText,
  Mic,
  Pen,
  Layers,
  Compass,
  Heart,
  Zap,
  Target,

  Shield,
  Loader2,
  GitCompare,
  Clock,
  ShoppingBag,
  Info,
} from 'lucide-react';

import jsPDF from 'jspdf';



interface PressPageProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onNavigate?: (section: string) => void;
}

const PRESS_COVERAGE_IMAGE =
  'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1774880038330_bdff0188.png';

const BRAND_ASSET_IMAGES = {
  logo: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148849729_15edf515.png',
  founderHeadshot: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148857485_89bcf4b9.png',
  fourElements: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775161384171_320255f6.png',
  fire: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148863188_914a713f.png',
  water: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148869121_63101547.png',
  earth: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148874430_fd1f9f00.png',
  air: 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775148880115_88615a94.png',
};



const downloadImageAsPng = async (imageUrl: string, fileName: string) => {
  // Build a list of candidate URLs: original first, then weserv.nl CORS proxy as fallback
  const normalized = imageUrl.replace(/^https?:\/\//, '');
  const candidates = [
    imageUrl,
    `https://images.weserv.nl/?url=${encodeURIComponent(normalized)}&output=png`,
  ];

  let lastError: unknown;

  for (const url of candidates) {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      // Small delay before revoking so the browser can start the download
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      return; // success — stop trying further candidates
    } catch (err) {
      lastError = err;
      // continue to next candidate
    }
  }

  // All candidates failed — throw so the caller shows the error alert
  throw lastError instanceof Error ? lastError : new Error('Download failed');
};




const PRESS_RELEASE_TITLE =
  'ELEMENTAL COLOR IDENTITY LAUNCHES A NEW SYSTEM OF SELF-DISCOVERY THROUGH COLOR';
const PRESS_RELEASE_SUBTITLE = 'For Immediate Release \u2014 August 2026';
const PRESS_RELEASE_LEAD =
  'Ancient Philosophy Meets Modern Psychology in a Groundbreaking Color System That Goes Beyond Skintone';
const PRESS_RELEASE_TAGLINE = 'Color is simply where you become visible.';

type PressReleaseBlock =
  | { type: 'p'; label?: string; text: string }
  | { type: 'quote'; text: string }
  | { type: 'bullets'; items: { label?: string; text: string }[] };

interface PressReleaseSection {
  heading?: string;
  blocks: PressReleaseBlock[];
}

const PRESS_RELEASE_SECTIONS: PressReleaseSection[] = [
  {
    blocks: [
      {
        type: 'p',
        text: 'Elemental Color Identity (ECI), a pioneering color and self-discovery platform founded by color analyst and image consultant Sarah J Engen, today announces its official launch \u2014 introducing a system that fundamentally redefines the relationship between color, identity, and the inner self.',
      },
    ],
  },
  {
    heading: 'A New Kind of Color System',
    blocks: [
      {
        type: 'p',
        text: 'For decades, color analysis has focused almost exclusively on the physical \u2014 skin tone, undertone, contrast, and complexion. ECI takes a profoundly different approach. Built on 25 years of work at the intersection of color, archetypes, and elemental philosophy, it is the first system to match color not to the complexion, but to consciousness \u2014 to the elemental nature that is permanently, irreducibly, and uniquely each person\u2019s own.',
      },
      {
        type: 'quote',
        text: '\u201CColor analysis has always asked what suits you,\u201D says Sarah J Engen, founder of ECI. \u201CElemental Color Identity asks what colors are you. There is a profound difference between the two \u2014 and that difference changes everything.\u201D',
      },
    ],
  },
  {
    heading: 'The Philosophy',
    blocks: [
      {
        type: 'p',
        text: 'ECI draws on a lineage of thinkers whose insights into color, consciousness, and human nature have shaped Western philosophy, psychology, and esoteric tradition for over a century.',
      },
      {
        type: 'p',
        text: 'Charles Leadbeater, the influential Theosophist, proposed that the inner life radiates its own color signature \u2014 that color is not decorative but diagnostic, the visible expression of an invisible nature. P.D. Ouspensky observed that color is not a property of matter but of consciousness itself. Gurdjieff taught that beneath the learned personality lies a permanent essence \u2014 the true core of a human being. Carl Jung mapped the four ancient elements \u2014 Fire, Water, Earth, and Air \u2014 to the four dimensions of the psyche. Empedocles named those elemental roots in the fifth century BC.',
      },
      {
        type: 'p',
        text: 'ECI was built on the thread connecting all of them: that every person has an elemental nature, that elemental nature has a color, and that finding it is not an aesthetic exercise \u2014 it is an act of genuine self-recognition.',
      },
      {
        type: 'quote',
        text: '\u201CMy work is exploring the seed, not the flower,\u201D says Engen. \u201CMost color systems work with the flower \u2014 the presented, adapted, external self. I use color to help women connect to the seed. To the nature that existed before the world had opinions about it.\u201D',
      },
    ],
  },
  {
    heading: 'The System',
    blocks: [
      {
        type: 'p',
        text: 'At the heart of ECI is a framework of 16 elemental subtypes \u2014 four elements, each divided into four subtypes \u2014 creating a map of human nature that is at once ancient in its roots and entirely original in its application.',
      },
      {
        type: 'p',
        text: 'Each subtype carries its own elemental signature \u2014 a combination of dominant and influencing elements \u2014 expressed through a specific color palette, archetype, philosophy, spiritual path, relationship style, and way of moving through the world. The system goes far beyond color into a complete picture of who a person is, how they operate, and where they belong in the wider elemental picture.',
      },
      { type: 'p', text: 'The 16 subtypes include:' },
      {
        type: 'bullets',
        items: [
          {
            label: 'The Blue Flame (Fire + Water)',
            text: 'intensity held in stillness. The alchemical crucible.',
          },
          {
            label: 'The Misty Shore (Water + Air)',
            text: 'atmospheric compassion. The space that makes others feel safe.',
          },
          {
            label: 'The Mountain Stone (Earth + Fire)',
            text: 'earth given conviction. Immovable dignity.',
          },
          {
            label: 'The First Whisper (Air + Water)',
            text: 'the thought before the thought. Perception at its most refined.',
          },
        ],
      },
      {
        type: 'p',
        text: 'And ten more \u2014 each one a specific, living expression of elemental nature, with its own color language and its own truth.',
      },
    ],
  },
  {
    heading: 'The Platform',
    blocks: [
      {
        type: 'p',
        text: 'ECI launches as a comprehensive self-discovery platform offering multiple pathways into the system:',
      },
      {
        type: 'p',
        label: 'The Free Quiz',
        text: 'a five-minute elemental type assessment that reveals a person\u2019s subtype and begins the journey of self-recognition.',
      },
      {
        type: 'p',
        label: 'The Full Profile',
        text: 'a detailed downloadable document containing the complete picture of a person\u2019s elemental nature \u2014 colors, archetype, shadow, spiritual path, relationships, body wisdom, and more.',
      },
      {
        type: 'p',
        label: 'The Elemental Color Workshop',
        text: 'a small group experience online using the four elements as a map of the inner self. Exploring all 16 subtypes, the relationships between them, and each participant\u2019s place in the wider elemental picture. Entry online into the guides for all the 16 types from now on.',
      },
      {
        type: 'p',
        label: 'The Personal Consultation',
        text: 'a one-to-one experience with Sarah going deeper than any quiz or group session can reach \u2014 into the nuances of a specific nature, the colors that are genuinely that person\u2019s own, and the questions only they are carrying.',
      },
      {
        type: 'p',
        label: 'The Private Day',
        text: 'Sarah\u2019s most personal offering. A full day of elemental discovery brought entirely to the client, in their own home, in their own light.',
      },
      {
        type: 'p',
        label: 'Interactive Tools',
        text: 'including the Color Analyzer, Wardrobe Analyzer, Color Wheel, Color Compass, Biorhythm Tracker, Relationship Compatibility, and Team Compatibility tools \u2014 making the system practical, living, and applicable to daily life.',
      },
      {
        type: 'p',
        label: 'The Community Forum',
        text: 'a space to connect, share reflections, and explore the elemental dynamics between types.',
      },
    ],
  },
  {
    heading: 'The Founder',
    blocks: [
      {
        type: 'p',
        text: 'Sarah J Engen is a color analyst, image consultant, (referred to also as the \u201CWardrobe Shrink\u201D) and the creator of two original systems of self-discovery.',
      },
      {
        type: 'p',
        text: 'She also created the 36 Image Types \u2014 a typology of the feminine psyche used by hundreds of women across Europe and the United States to connect to their original self that existed before the world began to shape it.',
      },
      {
        type: 'p',
        text: 'With 25 years of experience working at the intersection of color, personality, and elemental philosophy, Engen has developed a body of work that bridges the ancient and the contemporary, while remaining entirely practical and personally accessible.',
      },
      {
        type: 'quote',
        text: '\u201CI have spent years watching what happens when a woman sees herself clearly,\u201D says Engen. \u201CIt is not simply that she looks better \u2014 though she often does. It is that something settles. The outer world begins to reflect the inner one. The mirror finally matches the true reflection. That is what this work is for.\u201D',
      },
    ],
  },
  {
    heading: 'The Market',
    blocks: [
      { type: 'p', text: 'ECI sits at the intersection of three growing markets:' },
      {
        type: 'p',
        label: 'Personal color analysis',
        text: 'a rapidly expanding category driven by social media, with a new resurgence of seasonal color analysis generating significant consumer interest globally.',
      },
      {
        type: 'p',
        label: 'Self-discovery and personality typing',
        text: 'a market driven by the enduring popularity of the Enneagram, Myers-Briggs, Human Design, and astrology among women aged 25\u201365.',
      },
      {
        type: 'p',
        label: 'Conscious style and authentic living',
        text: 'a growing movement away from trend-driven fashion toward personal expression, authenticity, and intentional self-presentation.',
      },
      {
        type: 'p',
        text: 'ECI occupies a unique position at the centre of all three \u2014 offering the depth of a self-discovery system, the practicality of a color tool, and the philosophical grounding of an ancient tradition.',
      },
    ],
  },
  {
    heading: 'What Makes ECI Different',
    blocks: [
      { type: 'p', text: 'Most color systems begin on the surface. ECI begins at the source.' },
      {
        type: 'p',
        text: 'Most self-discovery systems map the inner world but offer no language for the outer one. ECI bridges both.',
      },
      {
        type: 'p',
        text: 'Most color advice tells women what to wear. ECI tells them who they are \u2014 and what that looks like.',
      },
      {
        type: 'quote',
        text: '\u201CMany systems map who you are,\u201D says Engen. \u201CNone of them has shown you what that looks like. That is the gap. That is what ECI closes.\u201D',
      },
    ],
  },
  {
    heading: 'Availability',
    blocks: [
      {
        type: 'p',
        text: 'The Elemental Color Identity platform is available now at www.elementalcoloridentity.com',
      },
      {
        type: 'bullets',
        items: [
          { text: 'The free quiz is available immediately at no cost.' },
          { text: 'Full subtype profiles are available for download at $37 with the interactive color tools.' },
          { text: 'Workshop dates, personal consultations, and private day enquiries are available via the website.' },
        ],
      },
    ],
  },
  {
    heading: 'Media Information',
    blocks: [
      {
        type: 'p',
        text: 'For press enquiries, interview requests, review access, or further information:',
      },
      {
        type: 'p',
        text: 'Contact: Sarah J Engen \u2022 Email: info@elementalcoloridentity.com \u2022 Website: www.elementalcoloridentity.com \u2022 Social: @elementalcoloridentity',
      },
      {
        type: 'p',
        text: 'High-resolution images, founder biography, and additional background material available on request or at website.',
      },
    ],
  },
  {
    heading: 'About Elemental Color Identity',
    blocks: [
      {
        type: 'p',
        text: 'Elemental Color Identity is a color and self-discovery platform founded by Sarah J Engen. Built on 25 years of work at the intersection of color, archetypes, and elemental philosophy, ECI offers a system of 16 elemental subtypes \u2014 each one a specific expression of the four classical elements \u2014 that matches color not to the complexion but to consciousness. ECI is available at www.elementalcoloridentity.com',
      },
    ],
  },
];




const drawVerticalGradient = (
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  startRgb: [number, number, number],
  endRgb: [number, number, number],
) => {
  const steps = 80;
  const stepHeight = height / steps;
  for (let i = 0; i < steps; i++) {
    const ratio = i / steps;
    const r = Math.round(startRgb[0] + (endRgb[0] - startRgb[0]) * ratio);
    const g = Math.round(startRgb[1] + (endRgb[1] - startRgb[1]) * ratio);
    const b = Math.round(startRgb[2] + (endRgb[2] - startRgb[2]) * ratio);
    doc.setFillColor(r, g, b);
    doc.rect(x, y + i * stepHeight, width, stepHeight + 0.6, 'F');
  }
};

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Unable to load image: ${url}`));
    img.src = url;
  });

const imageToDataUrlViaBlob = async (url: string): Promise<{ dataUrl: string; width: number; height: number }> => {
  const response = await fetch(url, { mode: 'cors' });
  if (!response.ok) {
    throw new Error(`Image fetch failed: ${response.status}`);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await loadImage(objectUrl);
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Failed to read image blob'));
      reader.readAsDataURL(blob);
    });
    return {
      dataUrl,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const buildImageCandidates = (url: string) => {
  const normalized = url.replace(/^https?:\/\//, '');
  return [
    url,
    `https://images.weserv.nl/?url=${encodeURIComponent(normalized)}&output=jpg`,
  ];
};

const getImageDataUrl = async (url: string): Promise<{ dataUrl: string; width: number; height: number }> => {
  const candidates = buildImageCandidates(url);
  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      const img = await loadImage(candidate);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context is unavailable');
      ctx.drawImage(img, 0, 0);
      return {
        dataUrl: canvas.toDataURL('image/jpeg', 0.95),
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
    } catch (canvasError) {
      lastError = canvasError;
      try {
        return await imageToDataUrlViaBlob(candidate);
      } catch (blobError) {
        lastError = blobError;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Unable to process image for PDF');
};

const saveImagePdf = async ({
  title,
  imageUrl,
  fileName,
  gradient,
}: {
  title: string;
  imageUrl: string;
  fileName: string;
  gradient?: { from: [number, number, number]; to: [number, number, number] };
}) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const imageAreaY = 95;

  if (gradient) {
    drawVerticalGradient(doc, 0, 0, pageWidth, pageHeight, gradient.from, gradient.to);
  } else {
    doc.setFillColor(250, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(17, 24, 39);
  doc.text(title, pageWidth / 2, 55, { align: 'center' });

  const { dataUrl, width, height } = await getImageDataUrl(imageUrl);
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - imageAreaY - margin;
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  const renderWidth = width * ratio;
  const renderHeight = height * ratio;
  const x = (pageWidth - renderWidth) / 2;
  const y = imageAreaY + (maxHeight - renderHeight) / 2;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x - 8, y - 8, renderWidth + 16, renderHeight + 16, 8, 8, 'F');
  doc.addImage(dataUrl, 'JPEG', x, y, renderWidth, renderHeight);

  doc.save(fileName);
};

const savePressReleasePdf = async () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 46;
  const contentWidth = pageWidth - margin * 2;
  let y = 40;

  const ensureRoom = (requiredHeight: number) => {
    if (y + requiredHeight > pageHeight - 50) {
      doc.addPage();
      y = 54;
    }
  };

  // ── Logo at the top ──
  try {
    const logoUrl = 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1775161035534_0468f561.png';


    const { dataUrl, width, height } = await getImageDataUrl(logoUrl);
    // Render logo centered, max 260pt wide
    const maxLogoWidth = 260;
    const logoRatio = Math.min(maxLogoWidth / width, 120 / height);
    const logoW = width * logoRatio;
    const logoH = height * logoRatio;
    const logoX = (pageWidth - logoW) / 2;
    doc.addImage(dataUrl, 'PNG', logoX, y, logoW, logoH);
    y += logoH + 18;
  } catch (err) {
    // If logo fails to load, skip it gracefully and continue with text
    console.warn('Could not embed logo in PDF:', err);
    y += 10;
  }

  // ── Divider line below logo ──
  doc.setDrawColor(226, 232, 240);
  doc.line(margin + 60, y, pageWidth - margin - 60, y);
  y += 22;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(79, 70, 229);
  doc.text('PRESS RELEASE', pageWidth / 2, y, { align: 'center' });
  y += 28;

  doc.setFont('times', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(17, 24, 39);
  const titleLines = doc.splitTextToSize(PRESS_RELEASE_TITLE, contentWidth) as string[];
  titleLines.forEach((line) => {
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 25;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  const leadLines = doc.splitTextToSize(PRESS_RELEASE_LEAD, contentWidth) as string[];
  leadLines.forEach((line) => {
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += 18;
  });
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text(PRESS_RELEASE_SUBTITLE, pageWidth / 2, y, { align: 'center' });
  y += 30;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 26;

  const writeParagraph = (text: string, style: 'normal' | 'italic' = 'normal') => {
    doc.setFont('helvetica', style);
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    ensureRoom(lines.length * 16 + 10);
    lines.forEach((line) => {
      doc.text(line, margin, y);
      y += 16;
    });
    y += 10;
  };

  PRESS_RELEASE_SECTIONS.forEach((section) => {
    if (section.heading) {
      ensureRoom(34);
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(31, 41, 55);
      doc.text(section.heading, margin, y);
      y += 20;
    }

    section.blocks.forEach((block) => {
      if (block.type === 'quote') {
        writeParagraph(block.text, 'italic');
        return;
      }
      if (block.type === 'bullets') {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        block.items.forEach((item) => {
          const bulletText = item.label ? `${item.label} \u2014 ${item.text}` : item.text;
          const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 20) as string[];
          ensureRoom(bulletLines.length * 15 + 8);
          doc.setFillColor(124, 58, 237);
          doc.circle(margin + 4, y - 4, 2, 'F');
          bulletLines.forEach((line, index) => {
            doc.text(line, margin + 16, y + index * 15);
          });
          y += bulletLines.length * 15 + 6;
        });
        y += 6;
        return;
      }
      const paragraphText = block.label ? `${block.label} \u2014 ${block.text}` : block.text;
      writeParagraph(paragraphText);
    });
  });

  // ── Closing tagline ──
  ensureRoom(50);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  doc.text(PRESS_RELEASE_TAGLINE, pageWidth / 2, y, { align: 'center' });


  doc.save('elemental-color-identity-press-release.pdf');
};




const PressPage: React.FC<PressPageProps> = ({ onBack, onStartQuiz, onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [downloadingAsset, setDownloadingAsset] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('info@elementalcoloridentity.com');

    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };


  const downloadAsset = async (assetId: string, run: () => Promise<void> | void) => {
    try {
      setDownloadingAsset(assetId);
      await run();
    } catch (error) {
      console.error('Asset download failed:', error);
      window.alert(
        'Unable to download this asset right now. Please try again later, or email us at info@elementalcoloridentity.com for direct access.',
      );
    } finally {
      setDownloadingAsset(null);
    }
  };


  const editorialIdeas = [
    {
      icon: Palette,
      title: 'Beyond Seasonal Color Analysis',
      angle:
        'How Elemental Color Identity redefines personal color by connecting palette to personality, philosophy, and inner nature — not just skin tone and undertone.',
      tags: ['Trend', 'Beauty', 'Psychology'],
    },
    {
      icon: Compass,
      title: 'The Four Elements as a Modern Typology',
      angle:
        'Fire, Water, Earth, and Air as archetypes of consciousness: how an ancient framework is being reimagined for self-discovery in the digital age.',
      tags: ['Culture', 'Wellness', 'Self-Help'],
    },
    {
      icon: Camera,
      title: 'AI Meets Personal Style',
      angle:
        'A look at the platform\'s real-time camera color analyzer and AI-powered wardrobe audit tools — where technology meets personal expression.',
      tags: ['Tech', 'Innovation', 'Fashion'],
    },
    {

      icon: Users,
      title: 'How I Found My Element: Stories from the Community',
      angle:
        'Real people, real stories. The moment they recognized themselves and how learning their subtype impacted them personally.',
      tags: ['Community', 'Human Interest', 'Lifestyle'],
    },

    {
      icon: Heart,
      title: 'Color as a Path to Self-Understanding',
      angle:
        'From elemental mantras and philosophies to spiritual essence guides — how color becomes a gateway to deeper self-knowledge and personal growth.',
      tags: ['Wellness', 'Spirituality', 'Feature'],
    },
    {
      icon: Shirt,
      title: 'Wardrobe Revolution: Dressing from the Inside Out',
      angle:
        'How Elemental Color Identity helps people build wardrobes that reflect who they truly are — featuring the wardrobe analyzer, shopping lists, and decor guides.',
      tags: ['Fashion', 'Lifestyle', 'Sustainability'],
    },
    {
      icon: Quote,
      title: '"Color is the soul element of nature." — Steiner',
      angle:
        'Exploring how \'being in your element\' requires a new perspective towards image and identity — one that moves beyond surface aesthetics to understand color as a living expression of who we are.',
      tags: ['Philosophy', 'Identity', 'Feature'],
      context: 'Rudolf Steiner (1861–1925) was an Austrian philosopher and educator whose color theory linked color to spiritual and elemental forces in nature — a foundational influence on the Elemental Color Identity system.',
    },


    {
      icon: Zap,
      title: 'Corporate Color: Introducing the Elements in the Boardroom',
      angle:
        'How businesses can use Elemental Color Identity to bring not just color but authenticity into the corporate wardrobe and business interactions.',
      tags: ['Business', 'Corporate', 'Wellness'],

    },

  ];

  const platformFeatures = [
    {
      icon: Sparkles,
      title: 'Elemental Type Quiz',
      description:
        'A research-informed personality quiz that maps users to one of four elements (Fire, Water, Earth, Air) and one of 16 subtypes.',
    },
    {
      icon: Camera,
      title: 'Real-Time Camera Color Analyzer',
      description:
        'AI-powered tool that uses the device camera to instantly match clothing colors against the user\'s personal elemental palette.',
    },
    {
      icon: Shirt,
      title: 'Wardrobe Analyzer',
      description:
        'Upload photos of existing clothing to receive a compatibility score and recommendations aligned with the user\'s elemental colors.',
    },
    {
      icon: Palette,
      title: 'Personalized Color Palettes',
      description:
        '12+ curated colors per subtype with hex codes, downloadable swatches, and real-world application guidance.',
    },
    {
      icon: Layers,
      title: '35 Guides Across 7 Pillars',
      description:
        'Comprehensive guides spanning style, beauty, nutrition, relationships, philosophy, home decor, and spiritual essence.',
    },
    {
      icon: MessageSquare,
      title: 'Community Forum & Roots',
      description:
        'A vibrant discussion space plus sacred elemental gathering rooms for deeper exploration and connection.',
    },
    {
      icon: Target,
      title: 'Conflict Style Quiz',
      description:
        'An interactive quiz that reveals how your elemental type handles tension — your instinctive conflict style, triggers, and the repair strategies that work best for you.',
    },
    {
      icon: Globe,
      title: 'Interactive Elemental Color Wheel',
      description:
        'A visual, clickable wheel mapping all 16 subtypes with their signature palettes — explore relationships between types at a glance.',
    },
    {
      icon: Compass,
      title: 'Color Compass',
      description:
        'An interactive compass that places all 16 subtypes on the four cardinal directions — see your elemental orientation, its mantra, and compare any two directions side by side.',
    },


    {
      icon: Crown,
      title: 'Celebrity Twin Finder',
      description:
        'An interactive gallery that matches users with famous faces who share their elemental subtype — discover your celebrity color twin.',
    },
    {
      icon: Heart,
      title: 'Friendship & Romantic Compatibility',
      description:
        'A pairwise compatibility calculator that reveals how any two elemental subtypes relate — covering friendship dynamics, romantic chemistry, and communication styles.',
    },
    {
      icon: Shield,
      title: 'Team Conflict Map',
      description:
        'Build a team roster by elemental type and visualize potential friction points, mediation strategies, and conflict resolution pathways between members.',
    },
    {
      icon: Users,
      title: 'Team Composition Analyzer',
      description:
        'Assemble a team of elemental subtypes and receive a full analysis of strengths, blind spots, collaboration dynamics, and balance recommendations.',
    },
    {
      icon: GitCompare,
      title: 'Subtype Comparison Tool',
      description:
        'Select any two of the 16 subtypes and compare them side-by-side across personality traits, color palettes, strengths, and lifestyle preferences.',
    },
    {
      icon: Compass,
      title: 'Dominant Element Quiz',
      description:
        'A quick, visual mini-quiz that reveals your dominant element through scenario-based questions — a lighter introduction to the full typology.',
    },
    {
      icon: Zap,
      title: 'Elemental Biorhythm Tracker',
      description:
        'Explore your energy cycles and daily rhythms through the lens of your elemental type — from peak productivity windows to ideal rest patterns.',
    },
    {
      icon: Clock,
      title: 'Hobbies & Time Map',
      description:
        'An interactive planner that maps recommended pastimes and hobbies to your weekly schedule based on your elemental subtype\u2019s natural energy flow.',
    },

    {
      icon: ShoppingBag,
      title: 'Elemental Shopping Lists',
      description:
        'Curated, downloadable shopping lists tailored to each subtype — covering wardrobe essentials, home accents, and lifestyle items with PDF export.',
    },
  ];


  const keyFacts: { label: string; value: string; detail: string; detail2?: string }[] = [
    { label: 'Elemental Types', value: '4 elements, 16 subtypes', detail: 'Fire, Water, Earth, Air — each with 4 subtypes.', detail2: 'Sample types: Fire+Water - The Blue Flame, Water+Air - The Misty Shore' },
    { label: 'Quiz', value: 'Dominant + influencer = elemental subtype', detail: '12 questions for element, 6 questions for subtype.' },
    { label: 'Subtype Profile', value: 'Download profile - $37', detail: 'Access to color tools and color guides online.' },
    { label: 'Color Palettes', value: '192 colors across 16 subtypes', detail: 'From make-up, hair, to nails and jewelry.', detail2: 'Shop make-up recommendations.' },

    { label: 'Guide Categories', value: '35 guides', detail: 'For key areas: Style, Philosophy, Career, Relationships, Growth, Arts, Living' },
    { label: 'Interactive Tools', value: '4 AI-powered tools / 12 Interactive tools', detail: 'Quiz, Camera Analyzer, Wardrobe Audit, Color Wheel. Celebrity Twin, Color Compass, Dominant Element Quiz, and more.' },
    { label: 'Workshop', value: 'Small Group experience', detail: '', detail2: '15-20 people. All 16 Types. Access to all the online guides for all subtypes.' },
    { label: 'Consultation Types', value: 'Virtual & In-Person', detail: 'Private sessions with the founder, Sarah J Engen' },
  ];






  return (
    <div className="bg-white">
      {/* ─── Back Button ─── */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full shadow-sm mb-6">
                <Newspaper className="w-5 h-5 text-violet-600" />
                <span className="text-sm font-semibold text-violet-800">Press &amp; Media</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                Press Kit &amp;<br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Media Resources
                </span>
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                For journalists, editors, bloggers, and content creators.
              </p>



              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@elementalcoloridentity.com"

                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Contact Press Team
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('press-release');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Read Press Release
                </button>
              </div>
            </div>

            {/* Right — press coverage image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-200/30 to-indigo-200/30 rounded-3xl blur-2xl scale-105" />
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/80 shadow-xl">
                <img
                  src={PRESS_COVERAGE_IMAGE}
                  alt="Elemental Color Identity press coverage — magazine features and editorial mentions"
                  className="w-full h-auto rounded-2xl"
                />
                <p className="text-center text-sm text-gray-500 mt-4 font-medium">
                  Previous press coverage &amp; editorial features for Image &amp; Identity: <em>Sunday Times Style Magazine</em>, <em>Psychology Today</em>, <em>Marie Claire</em>.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRESS RELEASE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="press-release" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 uppercase tracking-wider mb-4">
              Press Release
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3 tracking-wide">
              {PRESS_RELEASE_TITLE}
            </h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto mb-2">
              {PRESS_RELEASE_LEAD}
            </p>
            <p className="text-gray-500 text-sm">{PRESS_RELEASE_SUBTITLE}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-5 text-gray-700 leading-relaxed">
            {PRESS_RELEASE_SECTIONS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                {section.heading && (
                  <h3 className="text-xl font-serif text-gray-900 pt-3">{section.heading}</h3>
                )}
                {section.blocks.map((block, bIdx) => {
                  if (block.type === 'quote') {
                    return (
                      <p
                        key={bIdx}
                        className="italic border-l-4 border-violet-300 pl-5 py-1 text-gray-800"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'bullets') {
                    return (
                      <ul key={bIdx} className="space-y-2 pl-6">
                        {block.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                            <span>
                              {item.label ? (
                                <>
                                  <strong>{item.label}</strong> &mdash; {item.text}
                                </>
                              ) : (
                                item.text
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={bIdx}>
                      {block.label ? (
                        <>
                          <strong>{block.label}</strong> &mdash; {block.text}
                        </>
                      ) : (
                        block.text
                      )}
                    </p>
                  );
                })}
              </div>
            ))}

            <p className="pt-6 border-t border-gray-100 text-center font-serif text-lg italic text-gray-800">
              {PRESS_RELEASE_TAGLINE}
            </p>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════
          WHAT MAKES IT UNIQUE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 uppercase tracking-wider mb-4">
              What Sets Us Apart
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              The Uniqueness of the Typology
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most color systems match colors to your complexion. Elemental Color Identity goes deeper.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Personality-First, Not Skin-First',
                text: 'The quiz measures inner nature — energy, temperament, values — to determine your element. Your palette reflects who you are, not just what matches your undertone.',
              },
              {
                icon: Layers,
                title: '16 Subtypes for True Personalization',
                text: 'Each element has four subtypes (e.g., Fire-Water, Earth-Air), creating nuanced profiles that capture the complexity of real people rather than broad categories.',
              },
              {
                icon: Globe,
                title: 'Elemental Lifestyle Integration',
                text: 'Not just color palettes. 35 Elemental guides that take your subtype into every area of life: style, beauty, career, relationships, philosophy, home decor, and spiritual essence.',
              },

              {
                icon: Zap,
                title: 'AI-Powered Tools',
                text: 'Real-time camera matching, wardrobe auditing bring the typology to life with technology — not just theory.',
              },

              {
                icon: Heart,
                title: 'Depth Beyond Aesthetics',
                text: 'Focus is on the internal - the Inner \'Root\' Self, and not the external. Elemental mantras, philosophical frameworks, communication styles, and life purpose guides make this a tool for self-understanding, not just outfit planning.',

              },
              {
                icon: Lightbulb,

                title: 'Vertical Knowledge',
                text: 'Uses \'Vertical\' knowledge to illuminate. Not \'Horizontal\' knowledge which labels without understanding. More than the \'what\' but also the why.',
              },

            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          KEY FACTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-white text-center mb-12">Key Facts at a Glance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <p className="text-sm font-semibold text-violet-200 mb-1">{fact.label}</p>
                <p className="text-xl font-bold text-white mb-2">{fact.value}</p>
                <p className="text-sm text-white/60">{fact.detail}</p>
                {fact.detail2 && (
                  <p className="text-sm text-white/60 mt-3">{fact.detail2}</p>
                )}

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PLATFORM FEATURES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 uppercase tracking-wider mb-4">
              Platform Overview
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Website Functionality
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What the Elemental Color Identity platform offers.

            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════
          EDITORIAL IDEAS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 uppercase tracking-wider mb-4">
              For Journalists
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              Editorial &amp; Story Ideas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&rsquo;re happy to explore ideas and are looking for opportunities to share our story.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {editorialIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                    <idea.icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 flex-wrap">
                      <span>{idea.title}</span>
                      {'context' in idea && idea.context && (
                        <span className="relative inline-flex group/tip">
                          <Info className="w-4 h-4 text-amber-500 cursor-help flex-shrink-0" />
                          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-xl bg-gray-900 text-white text-xs leading-relaxed px-4 py-3 shadow-xl opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 z-30">
                            <span className="block font-semibold text-amber-300 mb-1">Who is Steiner?</span>
                            {idea.context}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-gray-900" />
                          </span>
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{idea.angle}</p>
                    {'context' in idea && idea.context && (
                      <div className="flex items-start gap-2 mb-3 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
                        <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                          <span className="font-semibold">Context:</span> {idea.context}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════
          BRAND ASSETS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-4">
              Downloads
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Brand Assets</h2>
            <p className="text-gray-600">
              Download logos, screenshots, and brand guidelines for your coverage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                id: 'logo',
                name: 'Logo (PNG)',
                icon: Download,
                desc: 'Elemental Color Identity logo export',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.logo,
                    'elemental-color-identity-logo.png',
                  ),
              },
              {
                id: 'headshot',
                name: 'Founder Headshot (PNG)',
                icon: Users,
                desc: 'Founder profile image in high resolution',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.founderHeadshot,
                    'sarah-j-engen-headshot.png',
                  ),
              },
              {
                id: 'four-elements',
                name: 'Four Elements (PNG)',
                icon: Layers,
                desc: 'All four elemental type cards — Fire, Water, Earth, Air',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.fourElements,
                    'elemental-color-identity-four-elements.png',
                  ),
              },

              {
                id: 'fire',
                name: 'Element - Fire (PNG)',
                icon: Palette,
                desc: 'Fire element visual card',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.fire,
                    'elemental-visual-fire.png',
                  ),
              },
              {
                id: 'water',
                name: 'Element - Water (PNG)',
                icon: Palette,
                desc: 'Water element visual card',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.water,
                    'elemental-visual-water.png',
                  ),
              },
              {
                id: 'earth',
                name: 'Element - Earth (PNG)',
                icon: Palette,
                desc: 'Earth element visual card',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.earth,
                    'elemental-visual-earth.png',
                  ),
              },
              {
                id: 'air',
                name: 'Element - Air (PNG)',
                icon: Palette,
                desc: 'Air element visual card',
                action: () =>
                  downloadImageAsPng(
                    BRAND_ASSET_IMAGES.air,
                    'elemental-visual-air.png',
                  ),
              },
              {
                id: 'press-release',
                name: 'Press Release (PDF)',
                icon: FileText,
                desc: 'Formatted press release for media coverage',
                action: () => savePressReleasePdf(),
              },
            ].map((asset) => (
              <button
                key={asset.id}
                onClick={() => downloadAsset(asset.id, asset.action)}
                disabled={downloadingAsset === asset.id}
                className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-left bg-white group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                  {downloadingAsset === asset.id ? (
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                  ) : (
                    <asset.icon className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block mb-0.5">{asset.name}</span>
                  <span className="text-sm text-gray-500">{asset.desc}</span>
                </div>
              </button>
            ))}
          </div>


          <p className="text-center text-sm text-gray-400 mt-8">
            Need a specific asset or format? Email us at{' '}
            <a
              href="mailto:info@elementalcoloridentity.com"
              className="text-blue-700 hover:text-blue-800 underline underline-offset-2"
            >
              info@elementalcoloridentity.com
            </a>
          </p>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════════
          MEDIA CONTACT CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white px-8 py-10 md:px-12 md:py-12">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-700 mb-3">
                Press contact
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
                Media Inquiries
              </h2>
              <p className="text-stone-600 leading-relaxed max-w-lg mx-auto">
                For interviews, features, review copies, partnership inquiries, or any press-related questions, please reach out to our media team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-stone-200 bg-stone-50/80 px-4 py-3.5 mb-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white border border-stone-200 text-stone-700">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="min-w-0 text-sm sm:text-base font-semibold text-stone-900 truncate" title="info@elementalcoloridentity.com">
                  info@elementalcoloridentity.com
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-stone-500 mb-8">
              Or{' '}
              <a
                href="mailto:info@elementalcoloridentity.com"
                className="font-medium text-stone-800 underline underline-offset-2 hover:text-stone-950 transition-colors"
              >
                open in your mail app
              </a>
            </p>

            <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 sm:gap-x-8 sm:gap-y-2 text-sm text-stone-600">
              <li className="flex items-center justify-center gap-2">
                <Mic className="w-3.5 h-3.5 text-emerald-700" />
                Available for interviews
              </li>
              <li className="flex items-center justify-center gap-2">
                <Pen className="w-3.5 h-3.5 text-emerald-700" />
                Expert commentary
              </li>
              <li className="flex items-center justify-center gap-2">
                <Camera className="w-3.5 h-3.5 text-emerald-700" />
                Photo assets available
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPLORE CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-serif text-gray-900 mb-4">Experience It Yourself</h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            The best way to understand Elemental Color Identity is to try it. Take the free quiz and explore the platform firsthand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Take the Free Quiz
            </button>
            <button
              onClick={() => onNavigate?.('about')}
              className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              About Us
            </button>
            <button
              onClick={() => onNavigate?.('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;
