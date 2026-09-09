import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Download, Printer, X, Link2, Copy, Check, Mail, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';

// ── Types ──────────────────────────────────────────────────────────────────────

interface BiorhythmShareGuideProps {
  isOpen: boolean;
  onClose: () => void;
  userElement: string;
  userSubtype?: string | null;
}

interface RoutineItem {
  time: string;
  activity: string;
}

interface SubtypeBiorhythm {
  subtype: string;
  subtypeId: string;
  name: string;
  peakTime: string;
  peakDescription: string;
  routine: RoutineItem[];
}

interface ElementBiorhythmData {
  element: string;
  elementId: string;
  rhythmType: string;
  chronotype: string;
  subtypes: SubtypeBiorhythm[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const elementalBiorhythmData: ElementBiorhythmData[] = [
  {
    element: 'FIRE',
    elementId: 'fire',
    rhythmType: 'The Solar Rhythm',
    chronotype: 'Early to Mid-Day Peak. Energy follows the sun.',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        peakTime: '10 AM - 2 PM',
        peakDescription: 'The zenith of the sun. Mental and physical sharpness is maximum.',
        routine: [
          { time: '5:30-7 AM', activity: 'Awake before dawn. Cold exposure (shower, plunge). Brief, intense calisthenics. Planning the day\'s "strikes."' },
          { time: '7-10 AM', activity: 'Deep, focused work. Tackle the most complex, high-stakes task requiring absolute clarity. No meetings.' },
          { time: '10-2 PM', activity: 'Peak Performance Window. Strategic meetings, decisive actions, presentations. High-protein lunch.' },
          { time: '2-5 PM', activity: 'Administrative follow-through. Logic-based tasks, cleaning up details from the morning\'s work.' },
          { time: 'Evening', activity: 'Mandatory wind-down. No stimulating input after 8 PM. Reading philosophy/history. Digital sunset by 9 PM. In bed by 10.' }
        ]
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        peakTime: '10 AM - 12 PM & 10 PM - 1 AM',
        peakDescription: 'A bimodal rhythm of cool focus. Late morning and deep night.',
        routine: [
          { time: '7-9 AM', activity: 'Slow, deliberate wake-up. Hot tea, stretching, journaling. No rush.' },
          { time: '9-12 PM', activity: 'Analytical, deep-dive work. Research, coding, writing, intricate craft.' },
          { time: 'Afternoon', activity: '"Peripheral focus" tasks. Walking meetings, problem-solving in nature, visiting museums/labs for inspiration.' },
          { time: 'Evening', activity: 'Light meal. Second wind from 8-11 PM for creative or intellectual work in perfect quiet.' },
          { time: 'Late Night', activity: 'Contemplation or star-gazing before a late sleep (midnight-1 AM).' }
        ]
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        peakTime: '11 AM - 5 PM',
        peakDescription: 'Energy builds steadily and endures. Late morning to late afternoon.',
        routine: [
          { time: '6-8 AM', activity: 'Substantial breakfast. Strength training or manual labor. Grounding the body.' },
          { time: '8-12 PM', activity: 'Project-based work. Building, managing teams, long-term strategy sessions.' },
          { time: '12-5 PM', activity: 'Peak Endurance Window. Negotiations, overseeing operations, physical leadership.' },
          { time: 'Evening', activity: 'Hearty, communal dinner. Debriefing the day, storytelling. Sauna or hot bath for muscle recovery.' },
          { time: 'Night', activity: 'Reading biographies or epic tales. Early to bed to rebuild physical resources.' }
        ]
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        peakTime: '8-11 AM & 4-7 PM',
        peakDescription: 'Bursts of social, creative energy. Morning and early evening peaks.',
        routine: [
          { time: '7-9 AM', activity: 'Energetic, social morning. Dance workout, chatting with family/roommates, listening to upbeat music.' },
          { time: '9-12 PM', activity: 'Creative brainstorming, collaborative meetings. Generating ideas, pitching concepts.' },
          { time: '1-3 PM', activity: 'Afternoon Slump. Accept and schedule for it. Light administrative tasks, errands, change of scenery.' },
          { time: '4-7 PM', activity: 'Second Social/Creative Peak. Networking events, teaching, rehearsals, hosting.' },
          { time: 'Evening', activity: 'Light, fun dinner. Unstructured play—games, improv, social media engagement. Needs active relaxation.' }
        ]
      }
    ]
  },
  {
    element: 'WATER',
    elementId: 'water',
    rhythmType: 'The Lunar & Tidal Rhythm',
    chronotype: 'Late Morning & Night. Energy ebbs and flows with emotional and internal tides.',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        peakTime: '10 AM - 12 PM & 7-9 PM',
        peakDescription: 'Soft, receptive windows. Mid-morning and after dinner.',
        routine: [
          { time: '8-9 AM', activity: 'Gentle Wake. No alarm if possible. Hydration, gentle yoga, making a soothing drink.' },
          { time: '10-12 PM', activity: 'Receptive Work. Client consultations (therapy, coaching), creative writing, design work requiring a soft eye.' },
          { time: 'Afternoon', activity: 'Tasks in soothing environments. Working from a café, garden, or softly lit room. Walking while listening to podcasts/audiobooks.' },
          { time: '7-9 PM', activity: 'Evening Peak. Socializing in intimate settings (small dinner parties, book clubs) or creative hobbies (painting, knitting).' },
          { time: 'Night', activity: 'Bath ritual. Reading poetry or light fiction. Early to bed to protect sensitivity.' }
        ]
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        peakTime: '10 PM - 2 AM & 4-6 AM',
        peakDescription: 'The depth of silence. Night and very early morning.',
        routine: [
          { time: '9-10 AM', activity: 'Late Start. Honor their natural late sleep. No morning pressure.' },
          { time: '11-5 PM', activity: 'Deep, uninterrupted work blocks. Writing, analysis, therapy sessions, any work requiring profound focus. Lunch alone for recharging.' },
          { time: 'Evening', activity: 'Light meal. Slow transition into night.' },
          { time: '10 PM - 1 AM', activity: 'Peak Creative Hours. Producing their best work in total quiet and privacy.' },
          { time: 'Sleep', activity: 'Very late (1-2 AM) to very late wake, or a segmented sleep pattern (awake for a "watch" in the deep night).' }
        ]
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        peakTime: '3-7 PM',
        peakDescription: 'The "golden hour" of warmth and reflection. Late afternoon to dusk.',
        routine: [
          { time: '9 AM', activity: 'Mid-Morning Start. Leisurely wake with sunlight. Journaling memories or dreams, reviewing family photos.' },
          { time: 'Late Morning - Afternoon', activity: 'Curatorial work. Research, archiving, planning events or spaces that evoke nostalgia and warmth.' },
          { time: '3-7 PM', activity: 'Golden Hour Peak. Hosting gatherings, cooking elaborate meals, mentoring, creating warm atmospheres.' },
          { time: 'Evening', activity: 'Lingering dinners with loved ones. Sharing stories, looking through old albums, creating new memories.' },
          { time: 'Night', activity: 'Gentle wind-down with warm drinks. Comfortable sleep surrounded by meaningful objects.' }
        ]
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        peakTime: '9-11 AM & 2-4 PM',
        peakDescription: 'Gentle, nurturing windows. Mid-morning and mid-afternoon.',
        routine: [
          { time: '7-8 AM', activity: 'Slow, nurturing wake. Preparing breakfast for others, tending to plants or pets, gentle stretching.' },
          { time: '9-11 AM', activity: 'Caregiving Peak. Attending to others\' needs, nurturing tasks, creating comfortable environments.' },
          { time: '12-2 PM', activity: 'Rest and replenishment. Light lunch, quiet time, perhaps a short nap to restore.' },
          { time: '2-4 PM', activity: 'Second Nurturing Window. Cooking, crafting, gardening, hands-on care work.' },
          { time: 'Evening', activity: 'Communal dinner preparation. Creating cozy atmospheres. Early, restful bedtime with soft textures and warmth.' }
        ]
      }
    ]
  },
  {
    element: 'EARTH',
    elementId: 'earth',
    rhythmType: 'The Seasonal & Circadian Rhythm',
    chronotype: 'Steady and Consistent. Energy follows natural cycles with reliable peaks.',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',

        name: 'The Mountain Stone',
        peakTime: '8 AM - 12 PM',
        peakDescription: 'Clear morning clarity. When the mind is sharpest and principles are clearest.',
        routine: [
          { time: '6 AM', activity: 'Early, disciplined wake. Cold water on face, reviewing principles or ethical texts, setting intentions.' },
          { time: '7-8 AM', activity: 'Physical grounding. Hiking, walking meditation, or structured exercise routine.' },
          { time: '8-12 PM', activity: 'Peak Clarity Window. Decision-making, policy work, teaching, writing about principles and systems.' },
          { time: 'Afternoon', activity: 'Implementation work. Building structures, organizing, creating lasting frameworks.' },
          { time: 'Evening', activity: 'Reflection and study. Reading philosophy, discussing ethics, preparing for tomorrow\'s clarity.' }
        ]
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        peakTime: '10 AM - 3 PM',
        peakDescription: 'The fertile hours. When the body is most connected to natural rhythms.',
        routine: [
          { time: '6-7 AM', activity: 'Wake with natural light. Barefoot grounding, tending to garden or animals, preparing whole foods breakfast.' },
          { time: '8-10 AM', activity: 'Physical work. Gardening, building, hands-on crafts, anything connecting to materials.' },
          { time: '10 AM - 3 PM', activity: 'Peak Productivity. Sustained physical or creative work, teaching practical skills, managing resources.' },
          { time: 'Late Afternoon', activity: 'Harvest and preparation. Cooking, preserving, organizing the fruits of the day\'s labor.' },
          { time: 'Evening', activity: 'Early dinner with seasonal foods. Storytelling, crafts by firelight. Sleep with natural darkness.' }
        ]
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        peakTime: '11 AM - 2 PM & 8-10 PM',
        peakDescription: 'Soft, sensory windows. Late morning and evening comfort hours.',
        routine: [
          { time: '8-9 AM', activity: 'Luxurious wake. Soft sheets, gentle light, slow stretching in comfortable surroundings.' },
          { time: '10-11 AM', activity: 'Sensory preparation. Creating beautiful environments, selecting textures and scents for the day.' },
          { time: '11 AM - 2 PM', activity: 'Peak Comfort Creation. Interior design work, spa treatments, creating beautiful, comfortable spaces.' },
          { time: 'Afternoon', activity: 'Gentle tasks in beautiful settings. Shopping for quality items, visiting gardens or galleries.' },
          { time: '8-10 PM', activity: 'Evening Sensory Peak. Candlelit dinners, soft music, massage, creating intimate atmospheres.' }
        ]
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',

        name: 'The Golden Harvest',
        peakTime: '12-6 PM',
        peakDescription: 'The abundant hours. When generosity and celebration flow most naturally.',
        routine: [
          { time: '7-8 AM', activity: 'Hearty wake. Substantial breakfast, planning the day\'s feasts and gatherings.' },
          { time: '9-12 PM', activity: 'Preparation and procurement. Shopping for quality ingredients, setting tables, preparing spaces for hosting.' },
          { time: '12-6 PM', activity: 'Peak Abundance Window. Hosting lunches, cooking elaborate meals, celebrating, sharing bounty.' },
          { time: 'Evening', activity: 'Extended dinner parties. Wine, rich foods, laughter, generous hospitality.' },
          { time: 'Night', activity: 'Satisfied rest. Comfortable sleep after a day of giving and receiving pleasure.' }
        ]
      }
    ]
  },
  {
    element: 'AIR',
    elementId: 'air',
    rhythmType: 'The Variable & Inspired Rhythm',
    chronotype: 'Flexible and Idea-Driven. Energy follows inspiration and mental stimulation.',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        peakTime: '6-10 AM & 3-5 PM',
        peakDescription: 'Crystal clarity windows. Early morning freshness and afternoon mental renewal.',
        routine: [
          { time: '5:30-6 AM', activity: 'Early wake for maximum clarity. Fresh air, clear water, reviewing yesterday\'s insights.' },
          { time: '6-10 AM', activity: 'Peak Clarity Window. Writing, analysis, truth-seeking work, editing, fact-checking.' },
          { time: '10-2 PM', activity: 'Communication tasks. Meetings, teaching, sharing discoveries, collaborative analysis.' },
          { time: '3-5 PM', activity: 'Second Clarity Peak. Review and synthesis, connecting dots, preparing insights for sharing.' },
          { time: 'Evening', activity: 'Light dinner, documentary watching, reading non-fiction. Early sleep to preserve morning clarity.' }
        ]
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        peakTime: '9-11 AM & 2-6 PM',
        peakDescription: 'Spontaneous energy bursts. Mid-morning and afternoon creative windows.',
        routine: [
          { time: '7-8 AM', activity: 'Playful wake. Music, dancing, quick creative exercises, checking in with multiple projects.' },
          { time: '9-11 AM', activity: 'First Creative Burst. Brainstorming, starting new projects, making unexpected connections.' },
          { time: '12-2 PM', activity: 'Social lunch. Networking, casual meetings, gathering new stimuli and ideas.' },
          { time: '2-6 PM', activity: 'Peak Play Window. Cross-pollinating ideas, visiting different environments, spontaneous collaborations.' },
          { time: 'Evening', activity: 'Social events, games, improv, parties. Late, variable bedtime following energy.' }
        ]
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        peakTime: '10 AM - 1 PM & 5-8 PM',
        peakDescription: 'Persuasive windows. Late morning and early evening when warmth and influence peak.',
        routine: [
          { time: '7-8 AM', activity: 'Warm, social wake. Breakfast with others, morning calls, setting the emotional tone.' },
          { time: '9-10 AM', activity: 'Preparation for influence. Grooming, reviewing talking points, warming up the voice.' },
          { time: '10 AM - 1 PM', activity: 'Peak Persuasion Window. Presentations, sales, teaching, inspiring others, public speaking.' },
          { time: '2-4 PM', activity: 'Relationship maintenance. Follow-up calls, thank-you notes, nurturing connections.' },
          { time: '5-8 PM', activity: 'Second Influence Peak. Dinner speeches, evening events, intimate persuasion, mentoring.' },
          { time: 'Night', activity: 'Warm wind-down with loved ones. Gratitude practice, comfortable sleep.' }
        ]
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        peakTime: '4-6 AM & 9-11 PM',
        peakDescription: 'Liminal hours. The threshold times when the veil is thinnest.',
        routine: [
          { time: '4-6 AM', activity: 'Pre-Dawn Peak. If awake, this is the most intuitive, creative time. Dream journaling, meditation, receiving whispers.' },
          { time: '8-10 AM', activity: 'Gentle emergence. Slow wake, protecting sensitivity, easing into the day.' },
          { time: '11-3 PM', activity: 'Subtle work. Writing poetry, composing music, therapeutic sessions, anything requiring nuance.' },
          { time: 'Afternoon', activity: 'Rest and protection. Quiet environments, avoiding harsh stimuli, gentle movement.' },
          { time: '9-11 PM', activity: 'Evening Whisper Peak. Creative work, spiritual practice, intimate conversations, channeling.' },
          { time: 'Night', activity: 'Dreaming as work. Intentional sleep, lucid dreaming practice, keeping dream journal by bed.' }
        ]
      }
    ]
  }
];

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
  extraPaths?: string[];
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
    extraPaths: ['M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2'],
    seasonLabel: 'Spring'
  }
};

// ── Time-of-day icon helpers ───────────────────────────────────────────────────

const getTimeColor = (time: string): string => {
  const t = time.toLowerCase();
  if (t.includes('sleep') || t.includes('late night') || t.includes('night')) return '#6366F1';
  if (t.includes('evening')) return '#8B5CF6';
  if (t.includes('am') && (t.includes('5') || t.includes('6') || t.includes('7'))) return '#F59E0B';
  if (t.includes('afternoon') || t.includes('late')) return '#EC4899';
  return '#F97316';
};

const getTimeLabel = (time: string): string => {
  const t = time.toLowerCase();
  if (t.includes('sleep') || t.includes('late night')) return 'NIGHT';
  if (t.includes('night')) return 'NIGHT';
  if (t.includes('evening')) return 'EVE';
  if (t.includes('am') && (t.includes('5') || t.includes('6') || t.includes('7'))) return 'DAWN';
  if (t.includes('afternoon') || t.includes('late')) return 'PM';
  return 'DAY';
};

// ── Component ──────────────────────────────────────────────────────────────────

const BiorhythmShareGuide: React.FC<BiorhythmShareGuideProps> = ({
  isOpen,
  onClose,
  userElement,
  userSubtype
}) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const config = elementConfig[userElement] || elementConfig.fire;

  // Find user's element data and subtype data
  const elementData = elementalBiorhythmData.find(e => e.elementId === userElement);
  const subtypeData = elementData?.subtypes.find(s => s.subtypeId === userSubtype);

  // Generate shareable link
  const shareableLink = useMemo(() => {
    const payload = { e: userElement, s: userSubtype || '' };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    return `${window.location.origin}${window.location.pathname}?biorhythm=${encoded}`;
  }, [userElement, userSubtype]);

  // Generate plain text summary
  const textSummary = useMemo(() => {
    if (!elementData || !subtypeData) return '';
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push('     YOUR ELEMENTAL BIORHYTHM');
    lines.push('     Daily Rhythm & Routine Guide');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Element: ${config.label} (${config.seasonLabel})`);
    lines.push(`Rhythm Type: ${elementData.rhythmType}`);
    lines.push(`Chronotype: ${elementData.chronotype}`);
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');

    lines.push('── YOUR SUBTYPE ──');
    lines.push(`  ${subtypeData.subtype} — "${subtypeData.name}"`);
    lines.push('');

    lines.push('── PEAK TIME ──');
    lines.push(`  ${subtypeData.peakTime}`);
    lines.push(`  ${subtypeData.peakDescription}`);
    lines.push('');

    lines.push('── IDEAL DAILY ROUTINE ──');
    subtypeData.routine.forEach((item, idx) => {
      lines.push(`  ${idx + 1}. ${item.time}`);
      lines.push(`     ${item.activity}`);
      lines.push('');
    });

    lines.push('── ALL SUBTYPES IN YOUR ELEMENT ──');
    elementData.subtypes.forEach(sub => {
      const isYou = sub.subtypeId === userSubtype;
      lines.push(`  ${isYou ? '→ ' : '  '}${sub.subtype} — "${sub.name}"${isYou ? ' (YOU)' : ''}`);
      lines.push(`    Peak: ${sub.peakTime}`);
      lines.push(`    ${sub.peakDescription}`);
      lines.push('');
    });

    lines.push('── BIORHYTHM WISDOM ──');
    lines.push('  These rhythms are your natural energetic blueprint. While modern life');
    lines.push('  may require adaptation, honoring your peak times for important work');
    lines.push('  and protecting your restoration periods will help you thrive in');
    lines.push('  alignment with your elemental nature.');
    lines.push('');
    lines.push('═══════════════════════════════════════════');
    lines.push('  Generated from Elemental Color Analysis');
    lines.push('═══════════════════════════════════════════');

    return lines.join('\n');
  }, [elementData, subtypeData, config, userSubtype]);

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
      link.download = `${subtypeData?.name.toLowerCase().replace(/\s+/g, '-') || 'biorhythm'}-guide-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [subtypeData]);

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
          <title>Elemental Biorhythm Guide — ${subtypeData?.name || 'Your Rhythm'}</title>
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
  }, [subtypeData]);

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
    const subject = encodeURIComponent(`Elemental Biorhythm Guide — ${subtypeData?.name || 'Your Rhythm'}`);
    const body = encodeURIComponent(
      `I've generated a personalized Elemental Biorhythm Guide. Here's the summary:\n\n` +
      `Element: ${config.label} (${config.seasonLabel})\n` +
      `Rhythm Type: ${elementData?.rhythmType}\n` +
      (subtypeData ? `Subtype: ${subtypeData.subtype} — "${subtypeData.name}"\n` : '') +
      (subtypeData ? `Peak Time: ${subtypeData.peakTime}\n` : '') +
      `\nView the full interactive guide here:\n${shareableLink}\n\n` +
      `--- Full Text Guide ---\n\n${textSummary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [elementData, subtypeData, config, shareableLink, textSummary]);

  if (!isOpen || !elementData || !subtypeData) return null;

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
              <h2 className="text-lg font-bold text-white">Share Biorhythm Guide</h2>
              <p className="text-sm text-white/60">Download, print, or share your {config.label} element biorhythm</p>
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
            Anyone with this link can view the biorhythm guide for your element and subtype.
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
              <div style={{
                position: 'absolute', top: '50%', right: '15%',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', margin: 0 }}>
                    Your Elemental Biorhythm
                  </h1>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
                    Daily Rhythm & Routine Guide — {config.label} ({config.seasonLabel}) — {dateStr}
                  </p>
                </div>
              </div>

              {/* Element + Subtype pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', position: 'relative' }}>
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
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                  padding: '4px 12px', fontSize: '12px'
                }}>
                  <span style={{ fontWeight: 600 }}>{subtypeData.name}</span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.08)', borderRadius: '20px',
                  padding: '4px 12px', fontSize: '11px', opacity: 0.8
                }}>
                  <span>{elementData.rhythmType}</span>
                </div>
              </div>
            </div>

            {/* ── Rhythm Overview Section ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                Rhythm Overview
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {/* Rhythm Type */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.lightBg, border: `1px solid ${config.borderColor}`
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700, color: config.textDark,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                  }}>
                    Rhythm Type
                  </div>
                  <p style={{ fontSize: '12px', color: '#1F2937', fontWeight: 600, lineHeight: '1.5' }}>
                    {elementData.rhythmType}
                  </p>
                </div>
                {/* Chronotype */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.lightBg, border: `1px solid ${config.borderColor}`
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700, color: config.textDark,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                  }}>
                    Chronotype
                  </div>
                  <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.5' }}>
                    {elementData.chronotype}
                  </p>
                </div>
                {/* Peak Time */}
                <div style={{
                  padding: '16px', borderRadius: '10px',
                  background: config.gradient, color: 'white'
                }}>
                  <div style={{
                    fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px',
                    opacity: 0.7
                  }}>
                    Your Peak Time
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.5', fontFamily: 'Georgia, serif' }}>
                    {subtypeData.peakTime}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Your Subtype Profile (highlighted) ── */}
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                      {subtypeData.subtype} — "{subtypeData.name}"
                    </h3>
                    <p style={{ fontSize: '11px', opacity: 0.7 }}>Your Personal Biorhythm Profile</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px 20px', background: config.lightBg }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
                }}>
                  <span style={{
                    padding: '2px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700,
                    background: config.gradient, color: 'white'
                  }}>
                    YOUR TYPE
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: config.textDark }}>
                    Peak: {subtypeData.peakTime}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#374151', lineHeight: '1.6', marginBottom: '4px' }}>
                  {subtypeData.peakDescription}
                </p>
              </div>
            </div>

            {/* ── Ideal Daily Routine ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                Your Ideal Daily Routine
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {subtypeData.routine.map((item, idx) => {
                  const timeColor = getTimeColor(item.time);
                  const timeLabel = getTimeLabel(item.time);
                  return (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '14px 16px', borderRadius: '10px',
                      background: config.lightBg, border: `1px solid ${config.borderColor}`
                    }}>
                      <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                        flexShrink: 0, minWidth: '40px'
                      }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: config.gradient,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '13px', fontWeight: 'bold', color: 'white'
                        }}>
                          {idx + 1}
                        </div>
                        <span style={{
                          fontSize: '7px', fontWeight: 700, color: timeColor,
                          textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}>
                          {timeLabel}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', marginBottom: '3px' }}>
                          {item.time}
                        </h4>
                        <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.6' }}>
                          {item.activity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Visual Energy Timeline ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                Energy Flow Timeline
              </h3>
              <div style={{
                padding: '20px', borderRadius: '12px',
                background: '#F9FAFB', border: '1px solid #E5E7EB'
              }}>
                {/* Timeline bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '8px' }}>
                  {Array.from({ length: 24 }, (_, i) => {
                    const peakText = subtypeData.peakTime.toLowerCase();
                    let isPeak = false;
                    // Simple heuristic to highlight peak hours
                    const peakRanges = peakText.split('&').map(s => s.trim());
                    for (const range of peakRanges) {
                      const nums = range.match(/\d+/g);
                      if (nums && nums.length >= 2) {
                        let start = parseInt(nums[0]);
                        let end = parseInt(nums[1]);
                        const isPM = range.includes('pm');
                        const hasAM = range.includes('am');
                        if (isPM && start < 12) start += 12;
                        if (isPM && end < 12 && !hasAM) end += 12;
                        if (start <= i && i <= end) isPeak = true;
                      }
                    }
                    return (
                      <div key={i} style={{
                        flex: 1, height: isPeak ? '24px' : '12px',
                        borderRadius: '3px',
                        background: isPeak ? config.gradient : '#E5E7EB',
                        transition: 'all 0.3s',
                        opacity: isPeak ? 1 : 0.4
                      }} />
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>12 AM</span>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>6 AM</span>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>12 PM</span>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>6 PM</span>
                  <span style={{ fontSize: '9px', color: '#9CA3AF' }}>12 AM</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <span style={{
                    padding: '3px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                    background: config.gradient, color: 'white'
                  }}>
                    Peak: {subtypeData.peakTime}
                  </span>
                </div>
              </div>
            </div>

            {/* ── All Subtypes Reference ── */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px'
              }}>
                All {config.label} Biorhythm Subtypes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {elementData.subtypes.map((sub) => {
                  const isYou = sub.subtypeId === userSubtype;
                  return (
                    <div key={sub.subtypeId} style={{
                      padding: '12px', borderRadius: '10px',
                      background: isYou ? config.lightBg : '#F9FAFB',
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
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
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
                        {sub.subtype} — Peak: {sub.peakTime}
                      </p>
                      <p style={{ fontSize: '10px', color: '#6B7280', lineHeight: '1.5' }}>
                        {sub.peakDescription.length > 120 ? sub.peakDescription.substring(0, 120) + '...' : sub.peakDescription}
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
                "These rhythms are your natural energetic blueprint. While modern life may require adaptation,
                honoring your peak times for important work and protecting your restoration periods will help
                you thrive in alignment with your{' '}
                <span style={{ color: '#FBBF24', fontWeight: 600 }}>elemental nature</span>."
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
                This biorhythm guide is designed to be shared with partners, colleagues, roommates, or
                anyone who benefits from understanding your natural energy patterns. When those around you
                know your peak times and restoration needs, they can support your rhythm rather than
                disrupting it — and you can do the same for them. Share it freely.
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
                {config.label} Element — {subtypeData.name} — {subtypeData.peakTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiorhythmShareGuide;
