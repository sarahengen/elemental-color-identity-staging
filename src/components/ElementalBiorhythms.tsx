import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Clock, Sun, Moon, Sunrise, Sunset, ChevronDown, Sparkles, Share2 } from 'lucide-react';
import BiorhythmShareGuide from './BiorhythmShareGuide';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  GUIDE_USER_SUBTYPE_CARD_CLASS,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  guideUserElementCardClass,
} from '@/lib/guideElementVisualTheme';

interface ElementalBiorhythmsProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
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
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  lightBg: string;
  lightBorder: string;
  rhythmType: string;
  chronotype: string;
  subtypes: SubtypeBiorhythm[];
}

const elementalBiorhythmData: ElementBiorhythmData[] = [
  {
    element: 'FIRE',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#ea580c',
    gradientTo: '#dc2626',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-200',
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
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#0ea5e9',
    gradientTo: '#6366f1',
    lightBg: 'bg-blue-50',
    lightBorder: 'border-blue-200',
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
        peakTime: 'Late Afternoon to Dusk (3-7 PM)',
        peakDescription: 'The "golden hour" of warmth and reflection.',
        routine: [
          { time: 'Mid-Morning Start (9 AM)', activity: 'Leisurely wake with sunlight. Journaling memories or dreams, reviewing family photos.' },
          { time: 'Late Morning - Afternoon', activity: 'Curatorial work. Research, archiving, planning events or spaces that tell a story.' },
          { time: 'Peak (3-7 PM)', activity: 'Social and creative culmination. Hosting gatherings, giving warm, storytelling presentations, cooking an elaborate meal.' },
          { time: 'Evening', activity: 'Long, conversational dinner. Listening to or playing nostalgic music.' },
          { time: 'Night', activity: 'Reading historical fiction or memoirs. A warm, milky drink before bed.' }
        ]
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        peakTime: 'Steady Mid-Day Flow (11 AM - 4 PM)',
        peakDescription: 'Consistent, nurturing energy.',
        routine: [
          { time: 'Early (6-8 AM)', activity: 'Caregiving routine. Preparing breakfast/lunches for family, walking the dog, light house tidying.' },
          { time: 'Late Morning - Afternoon Peak', activity: '"Nurturing work" hours. Teaching, nursing, counseling, community organizing\u2014roles requiring steady presence.' },
          { time: 'Late Afternoon (4-6 PM)', activity: 'Wind-down from giving. A quiet cup of tea, a slow walk alone or with a trusted companion.' },
          { time: 'Evening', activity: 'Simple, nourishing meal preparation. Hands-on hobbies (gardening, pottery) that replenish through doing.' },
          { time: 'Night', activity: 'Early to bed (9-10 PM) for deep, restorative sleep.' }
        ]
      }
    ]
  },

  {
    element: 'EARTH',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#d97706',
    gradientTo: '#65a30d',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    rhythmType: 'The Diurnal Rhythm',
    chronotype: 'Steady Daytime. Energy is tied to the solid cycle of daylight, meals, and labor.',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        peakTime: 'Late Morning to Mid-Afternoon (10 AM - 3 PM)',
        peakDescription: 'When light is clear and shadows are defined.',
        routine: [
          { time: 'Dawn (5-7 AM)', activity: 'Ritual of discipline. Meditation on principles, reviewing goals, cold shower.' },
          { time: 'Morning (7-12 PM)', activity: 'Building the foundation. Structuring systems, financial planning, writing policy, physical training.' },
          { time: 'Peak (12-3 PM)', activity: 'Decisive Leadership. Holding court, making final judgments, directing projects.' },
          { time: 'Late Afternoon', activity: 'Solo reflection in nature (hiking). Physical decompression.' },
          { time: 'Evening', activity: 'Simple, hearty meal. Reading dense nonfiction or legal texts. In bed by 9:30 PM for unwavering routine.' }
        ]
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        peakTime: 'Mid-Morning to Late Afternoon (9 AM - 5 PM)',
        peakDescription: 'Aligned with the traditional workday.',
        routine: [
          { time: 'Early (6-8 AM)', activity: 'Hands-on start. Gardening, animal care, making bread, fixing something.' },
          { time: 'Core Day (9-5)', activity: 'Productive labor. Farming, physical therapy, carpentry, cooking\u2014tangible, cyclical work with clear results.' },
          { time: 'Meals', activity: 'Sacred anchors. Substantial, home-cooked breakfast, lunch, and dinner.' },
          { time: 'Evening', activity: 'Repetitive, satisfying tasks. Woodworking, knitting, canning. A beer or cider at day\u2019s end.' },
          { time: 'Night', activity: 'Heavy, deep sleep shortly after sunset.' }
        ]
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        peakTime: 'Late Morning & Early Evening (10 AM - 12 PM & 5-7 PM)',
        peakDescription: 'Comfort-oriented peaks.',
        routine: [
          { time: 'Slow, Luxurious Wake (8-9:30 AM)', activity: 'Sensual morning. Soft sheets, good coffee, a warm pastry, gentle music.' },
          { time: 'Late Morning Peak', activity: 'Aesthetic or comfort work. Interior design consultations, baking, textile work, patient client meetings.' },
          { time: 'Afternoon', activity: 'Errands in pleasant environments (farmer\u2019s markets, boutique shops). A nap or rest period.' },
          { time: 'Early Evening Peak', activity: 'Creating coziness. Cooking a comforting meal, arranging flowers, lighting candles.' },
          { time: 'Night', activity: 'Spa-like self-care routine. Early to bed (10 PM) in a perfectly prepared, serene bedroom.' }
        ]
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        peakTime: 'Late Afternoon into Night (4-10 PM)',
        peakDescription: 'The time of feasting and celebration.',
        routine: [
          { time: 'Leisurely Morning (9-11 AM)', activity: 'Sensual awakening. A rich breakfast, planning festive events, browsing beautiful objects online or in catalogues.' },
          { time: 'Day (12-4 PM)', activity: 'Creative and procurement work. Sourcing materials for projects, designing, shopping for ingredients or d\u00e9cor.' },
          { time: 'Peak (4-10 PM)', activity: 'The Main Event. Hosting dinners, studio work bursting with energy, performances, vibrant socializing.' },
          { time: 'Late Night', activity: 'Wind down with richness. A nightcap, listening to lush music, reviewing the day\u2019s pleasures.' },
          { time: 'Sleep', activity: 'Late (midnight-1 AM), requiring a later wake to balance the exuberant output.' }
        ]
      }
    ]
  },
  {
    element: 'AIR',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#0ea5e9',
    gradientTo: '#8b5cf6',
    lightBg: 'bg-sky-50',
    lightBorder: 'border-sky-200',
    rhythmType: 'The Mercurial Rhythm',
    chronotype: 'Variable, often with a sharp morning peak and scattered energy. Needs mental space.',
    subtypes: [
      {

        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        peakTime: 'Sharp Early Morning (5-9 AM)',
        peakDescription: 'The mind is clearest before the world\'s noise begins.',
        routine: [
          { time: 'Pre-Dawn (4-5 AM)', activity: 'Wake. Silent meditation, strategic planning. The most important thinking of the day.' },
          { time: 'Peak (5-9 AM)', activity: 'High-level intellectual work. Writing, coding, solving core problems. No interruptions.' },
          { time: 'Late Morning (10-12 PM)', activity: 'Communicating clear ideas. Teaching, presenting morning\'s work.' },
          { time: 'Afternoon', activity: 'Administrative logic. Organizing, editing, light research.' },
          { time: 'Evening', activity: 'Disengage the mind. Light fiction, puzzles, simple conversation. Early bed to protect the morning clarity.' }
        ]
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        peakTime: 'Mid-Morning & Late Afternoon (10 AM - 12 PM & 3-5 PM)',
        peakDescription: 'Bursts of connected energy.',
        routine: [
          { time: 'Energetic, Unstructured Morning (7-10 AM)', activity: 'Idea capture. Journaling random thoughts, scrolling for inspiration, chatting.' },
          { time: 'Mid-Morning Peak', activity: 'Brainstorming sessions, collaborative creating. This is their most productive structured time.' },
          { time: 'Afternoon Slump (1-2:30 PM)', activity: 'Mandatory movement break. A walk, a change of location, a game.' },
          { time: 'Late Afternoon Peak', activity: 'Social creativity. Networking, improvisation, playful client meetings.' },
          { time: 'Evening', activity: 'Stimulating input. Watching comedy, playing video games, engaging online. Needs a hard cutoff to sleep.' }
        ]
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        peakTime: 'Late Morning & After Dinner (11 AM - 1 PM & 7-9 PM)',
        peakDescription: 'Warm, communicative windows.',
        routine: [
          { time: 'Social Morning (8-10 AM)', activity: 'Connection-based start. Coffee with a friend, team check-ins, uplifting podcasts.' },
          { time: 'Late Morning Peak', activity: 'Persuasive work. Sales calls, training sessions, writing inspiring copy.' },
          { time: 'Afternoon', activity: 'Building social structures. Planning community events, organizing groups, follow-up communications.' },
          { time: 'After-Dinner Peak (7-9 PM)', activity: 'Hosting or attending uplifting gatherings. Book clubs, networking dinners, community meetings.' },
          { time: 'Night', activity: 'Gratitude journaling. Reading inspirational biographies. Winding down with positive reflection.' }
        ]
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        peakTime: 'Very Early Morning & Late Night (4-6 AM & 11 PM - 1 AM)',
        peakDescription: 'The thresholds of day.',
        routine: [
          { time: 'Ghost Hour (4-6 AM)', activity: 'Wake naturally. The most potent intuitive/creative time. Meditation, channeling writing, receiving ideas. Sacred silence.' },
          { time: 'Morning (7-11 AM)', activity: 'Gentle, low-stimulus work. Editing, subtle design, caring for plants/animals.' },
          { time: 'Afternoon', activity: 'Restorative pause. A long nap, lying in a hammock, gentle walking in nature.' },
          { time: 'Evening', activity: 'Light, early dinner. Ambient creative work\u2014curating playlists, arranging photos, light sketching.' },
          { time: 'Late Night Window', activity: 'Another potential burst of ethereal creativity before a very late sleep.' }
        ]
      }
    ]
  }
];


const ElementalBiorhythms: React.FC<ElementalBiorhythmsProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [showShareGuide, setShowShareGuide] = useState(false);


  // Check if a subtype matches the user's subtype
  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  // Check if an element matches the user's element
  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  const toggleExpanded = (subtypeId: string) => {
    setExpandedSubtype(expandedSubtype === subtypeId ? null : subtypeId);
  };

  const getTimeIcon = (time: string) => {
    const lowerTime = time.toLowerCase();
    if (lowerTime.includes('am') && (lowerTime.includes('5') || lowerTime.includes('6') || lowerTime.includes('7'))) {
      return <Sunrise className="w-4 h-4 text-amber-500" />;
    } else if (lowerTime.includes('pm') && (lowerTime.includes('8') || lowerTime.includes('9') || lowerTime.includes('10') || lowerTime.includes('11'))) {
      return <Moon className="w-4 h-4 text-indigo-500" />;
    } else if (lowerTime.includes('evening') || lowerTime.includes('night') || lowerTime.includes('late') || lowerTime.includes('sleep')) {
      return <Sunset className="w-4 h-4 text-purple-500" />;
    } else {
      return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };



  // Find user's biorhythm data for the download button
  const getUserBiorhythmData = () => {
    if (!userSubtype) return null;
    
    for (const element of elementalBiorhythmData) {
      const subtype = element.subtypes.find(s => s.subtypeId === userSubtype);
      if (subtype) {
        return { element, subtype };
      }
    }
    return null;
  };

  const userBiorhythmData = getUserBiorhythmData();

  const elementTitle = (elementId: string) =>
    elementId.charAt(0).toUpperCase() + elementId.slice(1);

  return (
    <div className="space-y-12">
      {!embedInGuideHub && (
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Each subtype has an innate biorhythmic signature aligned with their element. The ideal routine supports their peak energy times, honors their restoration needs, and structures the day in their elemental language.
          </p>
        </div>
      )}

      {/* Share / Download Button for User's Biorhythm */}
      {userBiorhythmData && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowShareGuide(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            Share / Download Your {userBiorhythmData.subtype.name} Biorhythm
          </button>
        </div>
      )}


      {/* Elements Grid */}
      {elementalBiorhythmData.map((element) => (
        <div 
          key={element.element} 
          className={`space-y-6 ${isUserElement(element.elementId) ? 'relative' : ''}`}
        >
          {/* Element header — white card (matches other guide accordions) */}
          <div
            className={`rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.elementId)
            )}`}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                }}
              >
                {element.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 gap-y-1">
                  <h3 className="text-2xl font-serif text-gray-900">
                    {elementTitle(element.elementId)}
                  </h3>
                  {isUserElement(element.elementId) && (
                    <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>Your Element</span>
                  )}
                </div>
                <p className="text-base font-medium text-gray-800 mt-1">{element.rhythmType}</p>
                <GuideElementSubtitlePill
                  gradientFrom={element.gradientFrom}
                  gradientTo={element.gradientTo}
                  className="mt-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                >
                  Biorhythms
                </GuideElementSubtitlePill>
                <p className="text-sm text-gray-600 mt-2 italic flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 text-gray-400" />
                  {element.chronotype}
                </p>
              </div>
            </div>
          </div>

          {/* Subtypes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {element.subtypes.map((subtype) => {
              const isHighlighted = isUserSubtype(subtype.subtypeId);
              const isExpanded = expandedSubtype === subtype.subtypeId || isHighlighted;
              
              return (
                <div
                  key={subtype.subtype}
                  className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${
                    isHighlighted
                      ? GUIDE_USER_SUBTYPE_CARD_CLASS
                      : `border-2 ${element.lightBorder} hover:shadow-md ${element.lightBg}`
                  }`}
                >
                  {/* User's Subtype Badge */}
                  {isHighlighted && (
                    <div className="absolute -top-0 right-4 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-b-lg shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Your Biorhythm
                      </span>
                    </div>
                  )}

                  {/* Header Section */}
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => toggleExpanded(subtype.subtypeId)}
                  >
                    {/* Subtype Label */}
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                        style={{
                          background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                        }}
                      >
                        {subtype.subtype}
                      </span>
                      <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </span>
                    </div>

                    {/* Subtype Name */}
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {subtype.name}
                    </h4>

                    {/* Peak Time Summary */}
                    <div className={`p-3 rounded-xl ${isHighlighted ? 'bg-emerald-100 border border-emerald-200' : 'bg-white border border-gray-200'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className={`w-4 h-4 ${isHighlighted ? 'text-emerald-600' : 'text-gray-600'}`} />
                        <span className={`font-semibold ${isHighlighted ? 'text-emerald-700' : 'text-gray-700'}`}>Peak Time:</span>
                        <span className="text-gray-900 font-medium">{subtype.peakTime}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{subtype.peakDescription}</p>
                    </div>
                  </div>

                  {/* Expandable Routine Content */}
                  <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className="px-5 pb-5">
                      <h5 
                        className="text-sm font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: element.gradientFrom }}
                      >
                        Ideal Daily Routine
                      </h5>
                      <div className="space-y-3">
                        {subtype.routine.map((item, index) => (
                          <div 
                            key={index}
                            className={`p-3 rounded-xl ${isHighlighted ? 'bg-emerald-50 border border-emerald-100' : 'bg-white border border-gray-100'}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {getTimeIcon(item.time)}
                              </div>
                              <div>
                                <span className={`font-semibold ${isHighlighted ? 'text-emerald-700' : 'text-gray-900'}`}>
                                  {item.time}
                                </span>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                  {item.activity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Share / Download button inside the card for user's subtype */}
                      {isHighlighted && (
                        <div className="mt-4 pt-4 border-t border-emerald-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowShareGuide(true);
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                          >
                            <Share2 className="w-5 h-5" />
                            Share / Download This Biorhythm
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Bottom Note */}
      <div className="mt-12 text-center">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-100">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Biorhythm Wisdom</span>
          </div>
          <p className="text-gray-600 text-sm italic max-w-2xl">
            These rhythms are your natural energetic blueprint. While modern life may require adaptation, honoring your peak times for important work and protecting your restoration periods will help you thrive in alignment with your elemental nature.
          </p>
        </div>
      </div>

      {/* Biorhythm Share Guide Modal */}
      {userElement && (
        <BiorhythmShareGuide
          isOpen={showShareGuide}
          onClose={() => setShowShareGuide(false)}
          userElement={userElement}
          userSubtype={userSubtype}
        />
      )}
    </div>

  );
};

export default ElementalBiorhythms;
