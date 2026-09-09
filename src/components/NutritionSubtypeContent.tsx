import React from 'react';
import {
  Flame,
  Zap,
  Sparkles,
  Heart,
  Utensils,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Hammer,
  Cloud,
  Droplets,
  Waves,
  Snowflake,
  Mountain,
  Leaf,
  Sprout,
} from 'lucide-react';
import type { NutritionSubtype } from '../data/fireNutritionData';


interface NutritionSubtypeContentProps {
  subtype: NutritionSubtype;
  isUserSubtype: boolean;
}

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  red: { border: 'border-red-300', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
  orange: { border: 'border-orange-300', bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
  amber: { border: 'border-amber-300', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-400' },
  yellow: { border: 'border-yellow-300', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  green: { border: 'border-green-300', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  emerald: { border: 'border-emerald-300', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  purple: { border: 'border-purple-300', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  blue: { border: 'border-blue-300', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
  indigo: { border: 'border-indigo-300', bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  violet: { border: 'border-violet-300', bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-400' },
  teal: { border: 'border-teal-300', bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-400' },
  cyan: { border: 'border-cyan-300', bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-400' },
  rose: { border: 'border-rose-300', bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-400' },
  pink: { border: 'border-pink-300', bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-400' },
};




const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'zap':
      return <Zap className="w-5 h-5 text-white" />;
    case 'flame-blue':
      return <Flame className="w-5 h-5 text-blue-200" />;
    case 'hammer':
      return <Hammer className="w-5 h-5 text-white" />;
    case 'sparkle':
      return <Sparkles className="w-5 h-5 text-white" />;
    case 'cloud':
      return <Cloud className="w-5 h-5 text-white" />;
    case 'droplets':
      return <Droplets className="w-5 h-5 text-white" />;
    case 'waves':
      return <Waves className="w-5 h-5 text-white" />;
    case 'snowflake':
      return <Snowflake className="w-5 h-5 text-white" />;
    case 'mountain':
      return <Mountain className="w-5 h-5 text-white" />;
    case 'leaf':
      return <Leaf className="w-5 h-5 text-white" />;
    case 'sprout':
      return <Sprout className="w-5 h-5 text-white" />;
    default:
      return <Flame className="w-5 h-5 text-white" />;
  }
};


const NutritionSubtypeContent: React.FC<NutritionSubtypeContentProps> = ({
  subtype,
  isUserSubtype,
}) => {
  const accentColors = colorMap[subtype.accentColor] || colorMap.red;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* User Badge */}
      {isUserSubtype && (
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Your Nutrition Profile
          </span>
        </div>
      )}

      {/* Subtype Header */}
      <div
        className="rounded-xl p-5 text-white text-center"
        style={{ background: `linear-gradient(135deg, ${subtype.gradient.from}, ${subtype.gradient.to})` }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            {getIcon(subtype.iconType)}
          </div>
          <div>
            <span className="text-sm font-semibold px-2.5 py-0.5 rounded-md bg-white/20 text-white">
              {subtype.elementCombo}
            </span>
          </div>
        </div>
        <h4 className="text-2xl font-bold font-serif">{subtype.name}</h4>
      </div>

      {/* The Pattern */}
      <div className={`bg-white rounded-xl p-5 border shadow-sm ${accentColors.border}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-7 h-7 rounded-lg ${accentColors.bg} flex items-center justify-center`}>
            <AlertTriangle className={`w-3.5 h-3.5 ${accentColors.text}`} />
          </div>
          <h5 className="font-semibold text-gray-900">The Pattern</h5>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{subtype.pattern}</p>
      </div>

      {/* Body Wisdom */}
      <div
        className="rounded-xl p-5 border"
        style={{
          background: `linear-gradient(135deg, ${subtype.gradient.from}10, ${subtype.gradient.to}15)`,
          borderColor: `${subtype.gradient.from}30`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className={`w-4 h-4 ${accentColors.text}`} />
          <h5 className="font-semibold text-gray-800">Body Wisdom</h5>
        </div>
        <p className="text-gray-900 italic font-medium text-base">{subtype.bodyWisdom}</p>
      </div>

      {/* The Approach Table */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-7 h-7 rounded-lg ${accentColors.bg} flex items-center justify-center`}>
            <Utensils className={`w-3.5 h-3.5 ${accentColors.text}`} />
          </div>
          <h5 className="font-semibold text-gray-900">The Approach</h5>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2.5 text-left font-semibold text-gray-700 border-b w-28">
                  Element
                </th>
                <th className="px-4 py-2.5 text-left font-semibold text-gray-700 border-b">
                  Strategy
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> DO
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{subtype.approach.do}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-red-600 font-medium">
                    <XCircle className="w-3.5 h-3.5" /> DON'T
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{subtype.approach.dont}</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1.5 ${accentColors.text} font-medium`}>
                    <Zap className="w-3.5 h-3.5" /> KEY
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-700 font-semibold">{subtype.approach.key}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What Works */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
          </div>
          <h5 className="font-semibold text-gray-900">What Works</h5>
        </div>
        <div className="space-y-5">
          {subtype.whatWorks.map((section, idx) => {
            const sectionColors = colorMap[section.color] || colorMap.red;
            return (
              <div key={idx} className={`pl-4 border-l-[3px] ${sectionColors.border}`}>
                <h6 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full ${sectionColors.bg} ${sectionColors.text} flex items-center justify-center text-xs font-bold`}
                  >
                    {idx + 1}
                  </span>
                  {section.title}
                </h6>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${sectionColors.dot} mt-1.5 flex-shrink-0`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Mantra */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: `linear-gradient(135deg, ${subtype.gradient.from}, ${subtype.gradient.to})` }}
      >
        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">The Mantra</p>
        <p className="text-white text-lg font-serif italic">"{subtype.mantra}"</p>
      </div>

      {/* Eating Rituals That Help */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-violet-600" />
          </div>
          <h5 className="font-semibold text-gray-900">Eating Rituals That Help</h5>
        </div>
        <div className="space-y-3">
          {subtype.eatingRituals.map((ritual, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div
                className={`w-6 h-6 rounded-full ${accentColors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
              >
                <span className={`${accentColors.text} text-xs font-bold`}>{idx + 1}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm">{ritual.name}</span>
                <span className="text-gray-600 text-sm"> — {ritual.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What a Meal Looks Like */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-7 h-7 rounded-lg ${accentColors.bg} flex items-center justify-center`}>
            <Utensils className={`w-3.5 h-3.5 ${accentColors.text}`} />
          </div>
          <h5 className="font-semibold text-gray-900">
            What a {subtype.mealName} Meal Looks Like
          </h5>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Balanced */}
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-800 text-sm">Balanced</span>
            </div>
            <p className="text-green-800 text-sm leading-relaxed">{subtype.mealBalanced}</p>
          </div>
          {/* Shadow */}
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="font-semibold text-red-800 text-sm">Shadow</span>
            </div>
            <p className="text-red-800 text-sm leading-relaxed">{subtype.mealShadow}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSubtypeContent;
