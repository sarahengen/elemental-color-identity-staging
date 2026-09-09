import React, { useState } from 'react';
import { elementalJewelryData, getJewelryData, metalSwatches } from '../data/jewelryData';
import { elementalTypes } from '../data/elementalTypes';
import { ChevronDown, ChevronUp, Gem, Watch, Glasses, ShoppingBag, Sparkles, Check, X, Info, Flame, Droplets, Mountain, Wind } from 'lucide-react';

interface JewelryAccessoriesGuideProps {
  userElement?: string;
  userSubtype?: string;
  embedInGuideHub?: boolean;
}

const ElementIcon: React.FC<{ element: string; className?: string; style?: React.CSSProperties }> = ({
  element,
  className = 'w-5 h-5',
  style,
}) => {
  switch (element) {
    case 'fire':
      return <Flame className={className} style={style} />;
    case 'water':
      return <Droplets className={className} style={style} />;
    case 'earth':
      return <Mountain className={className} style={style} />;
    case 'air':
      return <Wind className={className} style={style} />;
    default:
      return <Sparkles className={className} style={style} />;
  }
};

const JewelryAccessoriesGuide: React.FC<JewelryAccessoriesGuideProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [selectedElement, setSelectedElement] = useState(userElement || 'fire');
  const [selectedSubtype, setSelectedSubtype] = useState(userSubtype || 'fire-fire');
  const [expandedSections, setExpandedSections] = useState<string[]>(['metals', 'gemstones']);

  const elementData = elementalJewelryData.find(e => e.elementId === selectedElement);
  const subtypeData = elementData?.subtypes.find(s => s.subtypeId === selectedSubtype);
  const jewelryGuide = subtypeData?.jewelry;

  const elementColors: Record<string, { primary: string; secondary: string; accent: string; hex: string }> = {
    fire: { primary: 'from-rose-600 to-red-700', secondary: 'bg-rose-100', accent: 'text-rose-600', hex: '#E11D48' },
    water: { primary: 'from-blue-400 to-indigo-500', secondary: 'bg-blue-100', accent: 'text-blue-600', hex: '#3B82F6' },
    earth: { primary: 'from-amber-500 to-orange-600', secondary: 'bg-amber-100', accent: 'text-amber-600', hex: '#D97706' },
    air: { primary: 'from-emerald-400 to-teal-500', secondary: 'bg-emerald-100', accent: 'text-emerald-600', hex: '#10B981' }
  };

  const seasonMap: Record<string, string> = {
    fire: 'Winter',
    water: 'Summer',
    earth: 'Autumn',
    air: 'Spring'
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleElementChange = (elementId: string) => {
    setSelectedElement(elementId);
    const element = elementalJewelryData.find(e => e.elementId === elementId);
    if (element && element.subtypes.length > 0) {
      setSelectedSubtype(element.subtypes[0].subtypeId);
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'best': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'good': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'avoid': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'best': return <Check className="w-4 h-4" />;
      case 'good': return <Check className="w-4 h-4" />;
      case 'avoid': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!elementData || !jewelryGuide) {
    return <div className="text-center py-12">Loading jewelry guide...</div>;
  }

  const colors = elementColors[selectedElement];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header - with background image of metals and finishes */}
      <div className="relative overflow-hidden p-8 border-b">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770945218506_a9ce4be4.jpg')` }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/65 via-gray-900/55 to-purple-900/50" />
        
        <div className="relative z-10">
          {!embedInGuideHub && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif text-white drop-shadow-md">Jewelry & Accessories Guide</h2>
                <p className="text-amber-100/90 drop-shadow-sm">Find your perfect metals, gemstones & accessories by element</p>
              </div>
            </div>
          )}

          {/* Overview badge */}
          {jewelryGuide.overview && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span className="text-white">{subtypeData?.subtypeName}</span>
            </div>
          )}

          {/* Element Selector */}
          <div className="flex flex-wrap gap-3 mt-6">
            {elementalJewelryData.map((element) => (
              <button
                key={element.elementId}
                onClick={() => handleElementChange(element.elementId)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  selectedElement === element.elementId
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white/90 text-gray-700 hover:bg-white border border-white/30'
                }`}
                style={{
                  backgroundColor: selectedElement === element.elementId ? elementColors[element.elementId].hex : undefined
                }}
              >
                <ElementIcon element={element.elementId} className="w-5 h-5" />
                <span>{element.elementName}</span>
                <span className="text-sm opacity-75">({element.season})</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="p-8">
        {/* Subtype Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Subtype</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {elementData.subtypes.map((subtype) => (
              <button
                key={subtype.subtypeId}
                onClick={() => setSelectedSubtype(subtype.subtypeId)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedSubtype === subtype.subtypeId
                    ? `ring-2 shadow-lg scale-[1.02] ${colors.secondary}`
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
                style={
                  selectedSubtype === subtype.subtypeId
                    ? ({
                        '--tw-ring-color': colors.hex,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors.hex }}
                  />
                  <span className="font-medium text-gray-900">{subtype.subtypeName}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Element Overview */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${colors.hex}20` }}
            >
              <ElementIcon element={selectedElement} className="w-7 h-7" style={{ color: colors.hex }} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">
                {subtypeData?.subtypeName}
              </h3>
              <p className="text-gray-600 leading-relaxed">{jewelryGuide.overview}</p>
            </div>
          </div>
        </div>

        {/* Undertone Explanation Card */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 mb-8 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${colors.secondary}`}>
              <Info className={`w-6 h-6 ${colors.accent}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Understanding Your Undertones</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{jewelryGuide.undertoneExplanation}</p>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 italic">{elementData.metalTheory}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metals Section */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('metals')}
            className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colors.secondary}`}>
                <Sparkles className={`w-6 h-6 ${colors.accent}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Metal Recommendations</h3>
                <p className="text-gray-500">Gold, silver, rose gold, and more</p>
              </div>
            </div>
            {expandedSections.includes('metals') ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
          </button>
          
          {expandedSections.includes('metals') && (
            <div className="mt-4 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jewelryGuide.metals.map((metal, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border-2 ${getRatingColor(metal.rating)}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                        style={{ backgroundColor: metal.hex }}
                      />
                      <div className="flex-1">
                        <h4 className="font-bold">{metal.name}</h4>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          {getRatingIcon(metal.rating)}
                          <span className="capitalize">{metal.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-80">{metal.reason}</p>
                  </div>
                ))}
              </div>

              {/* Visual Metal Comparison */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-4">Quick Metal Reference</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Cool Metals:</span>
                    <div className="flex gap-1">
                      {Object.values(metalSwatches).filter(m => m.undertone === 'cool').map(metal => (
                        <div 
                          key={metal.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: metal.hex }}
                          title={metal.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Warm Metals:</span>
                    <div className="flex gap-1">
                      {Object.values(metalSwatches).filter(m => m.undertone === 'warm').map(metal => (
                        <div 
                          key={metal.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: metal.hex }}
                          title={metal.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gemstones Section */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('gemstones')}
            className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colors.secondary}`}>
                <Gem className={`w-6 h-6 ${colors.accent}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Gemstone Recommendations</h3>
                <p className="text-gray-500">Precious and semi-precious stones for your palette</p>
              </div>
            </div>
            {expandedSections.includes('gemstones') ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
          </button>
          
          {expandedSections.includes('gemstones') && (
            <div className="mt-4 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jewelryGuide.gemstones.map((gem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg shadow-inner"
                        style={{ backgroundColor: gem.hex }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{gem.name}</h4>
                        {gem.occasion && (
                          <span className="text-xs text-gray-500">{gem.occasion}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{gem.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Jewelry Styles Section */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('styles')}
            className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colors.secondary}`}>
                <Sparkles className={`w-6 h-6 ${colors.accent}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Jewelry Styles</h3>
                <p className="text-gray-500">Delicate vs statement and everything in between</p>
              </div>
            </div>
            {expandedSections.includes('styles') ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
          </button>
          
          {expandedSections.includes('styles') && (
            <div className="mt-4 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jewelryGuide.styles.map((style, idx) => (
                  <div key={idx} className={`p-6 rounded-xl ${colors.secondary} border border-gray-200`}>
                    <h4 className={`font-bold text-lg mb-2 ${colors.accent}`}>{style.name}</h4>
                    <p className="text-gray-700 mb-4">{style.description}</p>
                    <div className="space-y-2">
                      {style.examples.map((example, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full bg-current ${colors.accent}`} />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accessory Colors Section */}
        <div className="mb-8">
          <button
            onClick={() => toggleSection('accessories')}
            className="w-full flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${colors.secondary}`}>
                <ShoppingBag className={`w-6 h-6 ${colors.accent}`} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">Accessory Colors</h3>
                <p className="text-gray-500">Bags, belts, shoes, and scarves</p>
              </div>
            </div>
            {expandedSections.includes('accessories') ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
          </button>
          
          {expandedSections.includes('accessories') && (
            <div className="mt-4 bg-white rounded-2xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {jewelryGuide.accessoryColors.map((color, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
                        style={{ backgroundColor: color.hex }}
                      />
                      <h4 className="font-bold text-gray-900">{color.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {color.items.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-white rounded text-xs text-gray-600 border border-gray-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Specific Accessory Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Watch className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Watch Recommendations</h4>
                  </div>
                  <ul className="space-y-2">
                    {jewelryGuide.watchRecommendations.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.accent} bg-current`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Glasses className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Eyewear Colors</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jewelryGuide.eyewearColors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Bag Colors</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jewelryGuide.bagColors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Scarf Colors</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jewelryGuide.scarfColors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips & Avoid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <Check className="w-6 h-6" />
              Pro Tips
            </h3>
            <ul className="space-y-3">
              {jewelryGuide.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-emerald-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <X className="w-6 h-6" />
              What to Avoid
            </h3>
            <ul className="space-y-3">
              {jewelryGuide.avoidList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-red-700">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA for users without type */}
        {!userElement && (
          <div className={`bg-gradient-to-r ${colors.primary} rounded-2xl p-8 text-center text-white`}>
            <h3 className="text-2xl font-bold mb-3">Discover Your Perfect Jewelry</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Take our elemental quiz to find out which metals and gemstones will make you shine brightest!
            </p>
            <button 
              onClick={() => {
                const quizSection = document.getElementById('quiz-section');
                if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Take the Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JewelryAccessoriesGuide;
