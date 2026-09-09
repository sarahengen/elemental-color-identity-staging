import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  guideUserElementCardClass,
} from '@/lib/guideElementVisualTheme';

interface ElementalIncantationsProps {
  embedInGuideHub?: boolean;
  userElement?: string | null;
  userSubtype?: string | null;
}

interface Incantation {
  title: string;
  text: string;
  context: string;
}

interface ElementIncantationData {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  lightBg: string;
  lightBorder: string;
  theme: string;
  incantations: Incantation[];
}

const incantationData: ElementIncantationData[] = [
  {
    element: 'FIRE',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#ea580c',
    gradientTo: '#dc2626',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-200',
    theme: 'Ignition & Courage',
    incantations: [
      { title: 'Morning Ignition', text: 'I rise with the sun. My will is forged in flame. Today I act with courage and clarity.', context: 'Speak upon waking, standing tall.' },
      { title: 'Before a Challenge', text: 'I am the spark that cannot be extinguished. Fear is fuel. I move forward now.', context: 'Before presentations, difficult conversations, or competitions.' },
      { title: 'Evening Gratitude', text: 'The fire within me has illuminated this day. I release what no longer serves me and rest in warmth.', context: 'Before sleep, with a candle lit.' },
    ],
  },
  {
    element: 'WATER',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#0ea5e9',
    gradientTo: '#6366f1',
    lightBg: 'bg-blue-50',
    lightBorder: 'border-blue-200',
    theme: 'Flow & Intuition',
    incantations: [
      { title: 'Morning Flow', text: 'I am the river that finds its way. I trust the current of my intuition and move with grace.', context: 'Speak while holding a glass of water or near flowing water.' },
      { title: 'Emotional Reset', text: 'Like the ocean, I am vast and deep. This wave of feeling will pass, and I will remain.', context: 'During moments of emotional overwhelm.' },
      { title: 'Creative Opening', text: 'I open to the wellspring within. Ideas flow through me like rain nourishing the earth.', context: 'Before creative work or journaling.' },
    ],
  },
  {
    element: 'EARTH',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#d97706',
    gradientTo: '#65a30d',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    theme: 'Grounding & Endurance',
    incantations: [
      { title: 'Morning Grounding', text: 'I am rooted in the earth. My foundation is strong. I build with patience and purpose today.', context: 'Speak with bare feet on the ground if possible.' },
      { title: 'Steadfast Resolve', text: 'Like the mountain, I do not move for every wind. I stand firm in my values and my work.', context: 'When facing pressure to compromise or rush.' },
      { title: 'Harvest Reflection', text: 'I honor what I have cultivated. The seeds I planted are growing. I trust the season.', context: 'Evening reflection, hands in soil or holding a stone.' },
    ],
  },
  {
    element: 'AIR',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#0ea5e9',
    gradientTo: '#8b5cf6',
    lightBg: 'bg-sky-50',
    lightBorder: 'border-sky-200',
    theme: 'Clarity & Connection',
    incantations: [
      { title: 'Morning Clarity', text: 'My mind is clear as the open sky. I welcome new perspectives and release rigid thought.', context: 'Speak near an open window or outdoors.' },
      { title: 'Communication Blessing', text: 'My words carry truth and lightness. I speak to connect, to illuminate, to uplift.', context: 'Before important conversations or teaching.' },
      { title: 'Evening Release', text: 'I release the thoughts of this day like leaves on the wind. My mind is free. I rest in stillness.', context: 'Before meditation or sleep.' },
    ],
  },
];

const elementTitle = (elementId: string) =>
  elementId.charAt(0).toUpperCase() + elementId.slice(1);

const ElementalIncantations: React.FC<ElementalIncantationsProps> = ({
  embedInGuideHub = false,
  userElement,
  userSubtype,
}) => {
  const [expandedElement, setExpandedElement] = useState<string | null>(userElement || null);

  const isUserElement = (elementId: string) => userElement === elementId;

  return (
    <div className="space-y-4">
      {!embedInGuideHub && (
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elemental mantras are spoken affirmations aligned with your element&apos;s energy. Use them as daily rituals to
            ground, inspire, and align yourself with your elemental nature.
          </p>
        </div>
      )}

      {incantationData.map((element) => {
        const isExpanded = expandedElement === element.elementId;
        const userEl = isUserElement(element.elementId);

        return (
          <div
            key={element.elementId}
            className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ${guideUserElementCardClass(
              userEl
            )}`}
          >
            <button
              type="button"
              onClick={() => setExpandedElement(isExpanded ? null : element.elementId)}
              className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left min-w-0">
                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                    <h3 className="text-2xl font-serif text-gray-900">{elementTitle(element.elementId)}</h3>
                    {userEl && (
                      <span className={`shrink-0 ${GUIDE_USER_ELEMENT_BADGE_CLASS}`}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill
                    gradientFrom={element.gradientFrom}
                    gradientTo={element.gradientTo}
                    className="mt-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                  >
                    Mantras
                  </GuideElementSubtitlePill>
                  <p className="text-sm text-gray-600 mt-2 italic">{element.theme}</p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-gray-400 shrink-0 ml-2" aria-hidden />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400 shrink-0 ml-2" aria-hidden />
              )}
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden border-t border-gray-100 ${
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`p-6 space-y-5 ${element.lightBg}`}>
                {element.incantations.map((inc, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border ${
                      userEl ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100'
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Quote className="w-4 h-4" style={{ color: element.gradientFrom }} />
                      {inc.title}
                    </h4>
                    <p className="text-gray-800 italic leading-relaxed mb-3">&ldquo;{inc.text}&rdquo;</p>
                    <p className="text-xs text-gray-500 font-medium">{inc.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ElementalIncantations;
