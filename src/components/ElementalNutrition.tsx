import React, { useState } from 'react';
import {
  Flame,
  Droplets,
  Mountain,
  Wind,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Quote,
  AlertTriangle,
  Zap,
  Hammer,
  Cloud,
  Waves,
  Leaf,
} from 'lucide-react';


import { fireNutritionSubtypes } from '../data/fireNutritionData';
import { waterNutritionSubtypes } from '../data/waterNutritionData';
import { earthNutritionSubtypes } from '../data/earthNutritionData';
import { airNutritionSubtypes } from '../data/airNutritionData';
import NutritionSubtypeContent from './NutritionSubtypeContent';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';

const NUTR_GRAD = {
  fire: { from: '#C41E3A', to: '#FF6B35' },
  water: { from: '#6B8BA4', to: '#B4A7D6' },
  earth: { from: '#8B4513', to: '#228B22' },
  air: { from: '#00CED1', to: '#FFE135' },
} as const;

interface ElementalNutritionProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const subtypeTabIcons: Record<string, React.ReactNode> = {
  'fire-fire': <Zap className="w-4 h-4" />,
  'fire-water': <Flame className="w-4 h-4" />,
  'fire-earth': <Hammer className="w-4 h-4" />,
  'fire-air': <Sparkles className="w-4 h-4" />,
  'water-air': <Cloud className="w-4 h-4" />,
  'water-water': <Droplets className="w-4 h-4" />,
  'water-fire': <Waves className="w-4 h-4" />,
  'water-earth': <Mountain className="w-4 h-4" />,
  'earth-fire': <Mountain className="w-4 h-4" />,
  'earth-earth': <Leaf className="w-4 h-4" />,
  'earth-water': <Droplets className="w-4 h-4" />,
  'earth-air': <Wind className="w-4 h-4" />,
  'air-air': <Cloud className="w-4 h-4" />,
  'air-fire': <Sparkles className="w-4 h-4" />,
  'air-earth': <Mountain className="w-4 h-4" />,
  'air-water': <Droplets className="w-4 h-4" />,
};




const ElementalNutrition: React.FC<ElementalNutritionProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );

  // Default to user's subtype tab, or first subtype
  const [activeFireTab, setActiveFireTab] = useState<string>(
    userSubtype && userSubtype.startsWith('fire') ? userSubtype : 'fire-fire'
  );

  const [activeWaterTab, setActiveWaterTab] = useState<string>(
    userSubtype && userSubtype.startsWith('water') ? userSubtype : 'water-air'
  );

  const [activeEarthTab, setActiveEarthTab] = useState<string>(
    userSubtype && userSubtype.startsWith('earth') ? userSubtype : 'earth-fire'
  );

  const [activeAirTab, setActiveAirTab] = useState<string>(
    userSubtype && userSubtype.startsWith('air') ? userSubtype : 'air-air'
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements((prev) =>
      prev.includes(elementId)
        ? prev.filter((id) => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;
  const isUserElement = (elementId: string) => userElement === elementId;

  const activeSubtype = fireNutritionSubtypes.find((s) => s.id === activeFireTab);
  const activeWaterSubtype = waterNutritionSubtypes.find((s) => s.id === activeWaterTab);
  const activeEarthSubtype = earthNutritionSubtypes.find((s) => s.id === activeEarthTab);
  const activeAirSubtype = airNutritionSubtypes.find((s) => s.id === activeAirTab);

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            Find your Body's Natural Balance and understand your relationship with food.
          </p>
        </div>
      )}

      {/* FIRE Element */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
          isUserElement('fire')
        )}`}
      >
        {/* Element Header */}
        <button
          onClick={() => toggleElement('fire')}
          className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #C41E3A, #FF6B35)' }}
            >
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif text-gray-900">Fire</h3>
                {isUserElement('fire') && (
                  <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                    Your Element
                  </span>
                )}
              </div>
              <GuideElementSubtitlePill gradientFrom={NUTR_GRAD.fire.from} gradientTo={NUTR_GRAD.fire.to}>
                Core Relationship with Food
              </GuideElementSubtitlePill>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedElements.includes('fire') ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </button>

        {/* Fire Element Content */}
        {expandedElements.includes('fire') && (
          <>
            {/* Core Relationship Banner */}
            <div
              className="px-6 py-4 border-t border-b"
              style={{
                background: 'linear-gradient(135deg, #C41E3A, #FF6B35)',
                borderColor: '#C41E3A40',
              }}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <p className="text-white italic">
                  Fire types approach food with intensity, passion, and inconsistency.
                </p>
              </div>
            </div>

            {/* Core Description */}
            <div className="bg-gradient-to-br from-red-50/50 to-orange-50/50 p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Core Relationship Text */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    Fire types approach food with intensity, passion, and inconsistency. Eating is
                    either completely engaging or completely forgotten. They can go hours without
                    noticing hunger, then suddenly need fuel NOW. They're drawn to bold flavors,
                    bright colors, and foods that match their energy.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Food is experience—sometimes a passionate one, sometimes an obstacle. They love
                    trying new things, hate routine meals, and can swing between meticulous healthy
                    eating and complete abandon.
                  </p>
                </div>

                {/* Challenge & Gift Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* The Fire Challenge */}
                  <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Fire Challenge</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Inconsistency. Feast or famine. Starting diets with passion, abandoning them
                      with equal passion. Their metabolism mirrors their energy—erratic, responsive,
                      easily thrown off.
                    </p>
                  </div>

                  {/* The Fire Gift */}
                  <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Fire Gift</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      When present, Fire types eat with genuine pleasure and passion. They know how
                      to enjoy food.
                    </p>
                  </div>
                </div>

                {/* ─── Subtype Tabs ─── */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Explore Your Fire Subtype
                  </h4>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {fireNutritionSubtypes.map((sub) => {
                      const isActive = activeFireTab === sub.id;
                      const isUser = isUserSubtype(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveFireTab(sub.id)}
                          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            isActive
                              ? 'text-white shadow-lg scale-[1.02]'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, ${sub.gradient.from}, ${sub.gradient.to})`,
                                  borderColor: 'transparent',
                                }
                              : undefined
                          }
                        >
                          <span className={isActive ? 'text-white' : ''}>
                            {subtypeTabIcons[sub.id]}
                          </span>
                          <span className="hidden sm:inline">{sub.elementCombo}</span>
                          <span className="sm:hidden">{sub.elementCombo.split(' + ')[1]}</span>
                          {isUser && (
                            <span
                              className={`ml-1 w-2 h-2 rounded-full ${
                                isActive ? 'bg-white' : 'bg-amber-400'
                              }`}
                            />
                          )}
                          {isUser && !isActive && (
                            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full leading-none">
                              You
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Content */}
                  {activeSubtype && (
                    <NutritionSubtypeContent
                      key={activeSubtype.id}
                      subtype={activeSubtype}
                      isUserSubtype={isUserSubtype(activeSubtype.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* WATER Element */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
          isUserElement('water')
        )}`}
      >
        {/* Element Header */}
        <button
          onClick={() => toggleElement('water')}
          className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #6B8BA4, #B4A7D6)' }}
            >
              <Droplets className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif text-gray-900">Water</h3>
                {isUserElement('water') && (
                  <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                    Your Element
                  </span>
                )}
              </div>
              <GuideElementSubtitlePill gradientFrom={NUTR_GRAD.water.from} gradientTo={NUTR_GRAD.water.to}>
                Core Relationship with Food
              </GuideElementSubtitlePill>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedElements.includes('water') ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </button>

        {/* Water Element Content */}
        {expandedElements.includes('water') && (
          <>
            {/* Core Relationship Banner */}
            <div
              className="px-6 py-4 border-t border-b"
              style={{
                background: 'linear-gradient(135deg, #6B8BA4, #B4A7D6)',
                borderColor: '#6B8BA440',
              }}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <p className="text-white italic">
                  Water types approach food with emotion, intuition, and connection. Eating is never just eating—it's feeling, relating, comforting.
                </p>
              </div>
            </div>

            {/* Core Description */}
            <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Core Relationship Text */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    Water types approach food with emotion, intuition, and connection. Eating is never just eating—it's feeling, relating, comforting. They're deeply influenced by who they're with, what mood they're in, what the atmosphere holds. Food is emotional currency.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    They're drawn to soothing, comforting foods. They eat differently alone than with others. They absorb the emotional content of meals—food made with love tastes different than food made with resentment.
                  </p>
                </div>

                {/* Challenge & Gift Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* The Water Challenge */}
                  <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Water Challenge</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Emotional eating. Boundarylessness around food. Using food to manage feelings, fill emptiness, or connect when connection feels scarce.
                    </p>
                  </div>

                  {/* The Water Gift */}
                  <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Water Gift</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      When balanced, Water types eat with profound presence and enjoyment. They know how to savor.
                    </p>
                  </div>
                </div>

                {/* ─── Subtype Tabs ─── */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Explore Your Water Subtype
                  </h4>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {waterNutritionSubtypes.map((sub) => {
                      const isActive = activeWaterTab === sub.id;
                      const isUser = isUserSubtype(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveWaterTab(sub.id)}
                          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            isActive
                              ? 'text-white shadow-lg scale-[1.02]'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, ${sub.gradient.from}, ${sub.gradient.to})`,
                                  borderColor: 'transparent',
                                }
                              : undefined
                          }
                        >
                          <span className={isActive ? 'text-white' : ''}>
                            {subtypeTabIcons[sub.id]}
                          </span>
                          <span className="hidden sm:inline">{sub.elementCombo}</span>
                          <span className="sm:hidden">{sub.elementCombo.split(' + ')[1]}</span>
                          {isUser && (
                            <span
                              className={`ml-1 w-2 h-2 rounded-full ${
                                isActive ? 'bg-white' : 'bg-blue-400'
                              }`}
                            />
                          )}
                          {isUser && !isActive && (
                            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full leading-none">
                              You
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Content */}
                  {activeWaterSubtype && (
                    <NutritionSubtypeContent
                      key={activeWaterSubtype.id}
                      subtype={activeWaterSubtype}
                      isUserSubtype={isUserSubtype(activeWaterSubtype.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* EARTH Element */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
          isUserElement('earth')
        )}`}
      >
        {/* Element Header */}
        <button
          onClick={() => toggleElement('earth')}
          className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8B4513, #228B22)' }}
            >
              <Mountain className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif text-gray-900">Earth</h3>
                {isUserElement('earth') && (
                  <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                    Your Element
                  </span>
                )}
              </div>
              <GuideElementSubtitlePill gradientFrom={NUTR_GRAD.earth.from} gradientTo={NUTR_GRAD.earth.to}>
                Core Relationship with Food
              </GuideElementSubtitlePill>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedElements.includes('earth') ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </button>

        {/* Earth Element Content */}
        {expandedElements.includes('earth') && (
          <>
            {/* Core Relationship Banner */}
            <div
              className="px-6 py-4 border-t border-b"
              style={{
                background: 'linear-gradient(135deg, #8B4513, #228B22)',
                borderColor: '#8B451340',
              }}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <p className="text-white italic">
                  Earth types approach food with steadiness, tradition, and practicality. Food is fuel, routine, reliability.
                </p>
              </div>
            </div>

            {/* Core Description */}
            <div className="bg-gradient-to-br from-amber-50/50 to-green-50/50 p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Core Relationship Text */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    Earth types approach food with steadiness, tradition, and practicality. Food is fuel, routine, reliability. They eat the same things, at the same times, year after year. They're not interested in trends or novelty. Good, honest food, prepared simply, eaten consistently—this is nourishment.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Food is also memory and connection—family recipes, harvest celebrations, the foods of their people. They value what lasts, what sustains, what has fed generations.
                  </p>
                </div>

                {/* Challenge & Gift Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* The Earth Challenge */}
                  <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Earth Challenge</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Rigidity. Resistance to change. Eating the same way even when it no longer serves them. Weight that creeps up slowly and stays.
                    </p>
                  </div>

                  {/* The Earth Gift */}
                  <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Earth Gift</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      When balanced, Earth types have the most sustainable, peaceful relationship with food. No drama. No chaos. Just steady nourishment.
                    </p>
                  </div>
                </div>

                {/* ─── Subtype Tabs ─── */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Explore Your Earth Subtype
                  </h4>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {earthNutritionSubtypes.map((sub) => {
                      const isActive = activeEarthTab === sub.id;
                      const isUser = isUserSubtype(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveEarthTab(sub.id)}
                          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            isActive
                              ? 'text-white shadow-lg scale-[1.02]'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, ${sub.gradient.from}, ${sub.gradient.to})`,
                                  borderColor: 'transparent',
                                }
                              : undefined
                          }
                        >
                          <span className={isActive ? 'text-white' : ''}>
                            {subtypeTabIcons[sub.id]}
                          </span>
                          <span className="hidden sm:inline">{sub.elementCombo}</span>
                          <span className="sm:hidden">{sub.elementCombo.split(' + ')[1]}</span>
                          {isUser && (
                            <span
                              className={`ml-1 w-2 h-2 rounded-full ${
                                isActive ? 'bg-white' : 'bg-green-400'
                              }`}
                            />
                          )}
                          {isUser && !isActive && (
                            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full leading-none">
                              You
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Content */}
                  {activeEarthSubtype && (
                    <NutritionSubtypeContent
                      key={activeEarthSubtype.id}
                      subtype={activeEarthSubtype}
                      isUserSubtype={isUserSubtype(activeEarthSubtype.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AIR Element */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
          isUserElement('air')
        )}`}
      >
        {/* Element Header */}
        <button
          onClick={() => toggleElement('air')}
          className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #00CED1, #FFE135)' }}
            >
              <Wind className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-serif text-gray-900">Air</h3>
                {isUserElement('air') && (
                  <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                    Your Element
                  </span>
                )}
              </div>
              <GuideElementSubtitlePill gradientFrom={NUTR_GRAD.air.from} gradientTo={NUTR_GRAD.air.to}>
                Core Relationship with Food
              </GuideElementSubtitlePill>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedElements.includes('air') ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </button>

        {/* Air Element Content */}
        {expandedElements.includes('air') && (
          <>
            {/* Core Relationship Banner */}
            <div
              className="px-6 py-4 border-t border-b"
              style={{
                background: 'linear-gradient(135deg, #00CED1, #FFE135)',
                borderColor: '#00CED140',
              }}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                <p className="text-white italic" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
                  Air types approach food as incidental, conceptual, or aesthetic. Eating is rarely the main event—it's what happens while thinking, while moving, while creating, while socializing.
                </p>
              </div>
            </div>

            {/* Core Description */}
            <div className="bg-gradient-to-br from-cyan-50/50 to-yellow-50/50 p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Core Relationship Text */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    Air types approach food as incidental, conceptual, or aesthetic. Eating is rarely the main event—it's what happens while thinking, while moving, while creating, while socializing. They can forget to eat for hours, then suddenly realize they're starving. They're the ones who say "I forgot to eat lunch" with genuine confusion—how did that happen?
                  </p>
                </div>

                {/* Challenge & Gift Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* The Air Challenge */}
                  <div className="bg-white rounded-xl p-5 border border-cyan-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-cyan-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Air Challenge</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Disembodiment. Living in the head, not the body. Food becomes abstract—calories to count, fuel to consume, or fuel to forget.
                    </p>
                  </div>

                  {/* The Air Gift */}
                  <div className="bg-white rounded-xl p-5 border border-yellow-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">The Air Gift</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      When present, Air types can have the most joyful, creative, liberated relationship with food—eating as celebration, as art, as connection.
                    </p>
                  </div>
                </div>

                {/* ─── Subtype Tabs ─── */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Explore Your Air Subtype
                  </h4>

                  {/* Tab Navigation */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {airNutritionSubtypes.map((sub) => {
                      const isActive = activeAirTab === sub.id;
                      const isUser = isUserSubtype(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setActiveAirTab(sub.id)}
                          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            isActive
                              ? 'text-white shadow-lg scale-[1.02]'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                          style={
                            isActive
                              ? {
                                  background: `linear-gradient(135deg, ${sub.gradient.from}, ${sub.gradient.to})`,
                                  borderColor: 'transparent',
                                }
                              : undefined
                          }
                        >
                          <span className={isActive ? 'text-white' : ''}>
                            {subtypeTabIcons[sub.id]}
                          </span>
                          <span className="hidden sm:inline">{sub.elementCombo}</span>
                          <span className="sm:hidden">{sub.elementCombo.split(' + ')[1]}</span>
                          {isUser && (
                            <span
                              className={`ml-1 w-2 h-2 rounded-full ${
                                isActive ? 'bg-white' : 'bg-cyan-400'
                              }`}
                            />
                          )}
                          {isUser && !isActive && (
                            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-cyan-500 text-white text-[10px] font-bold rounded-full leading-none">
                              You
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Content */}
                  {activeAirSubtype && (
                    <NutritionSubtypeContent
                      key={activeAirSubtype.id}
                      subtype={activeAirSubtype}
                      isUserSubtype={isUserSubtype(activeAirSubtype.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* A FINAL NOTE */}
      <div className="mt-12 mb-4">
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                'linear-gradient(135deg, #C41E3A 0%, #6B8BA4 33%, #8B4513 66%, #00CED1 100%)',
            }}
          />
          <div className="relative px-8 py-10 text-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">A Final Note</h3>
            <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto italic">
              And when you align—
              <br />
              When your body, your element, and your soul are in conversation—
              <br />
              Your body finds its natural state.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ElementalNutrition;
