import React, { useState, useMemo } from 'react';
import { elementalTypes, ElementalSubtype, ElementalType } from '@/data/elementalTypes';
import { ArrowLeftRight, Sparkles, Palette, User, Shirt, Zap, RotateCcw, ChevronDown, X, Info, Flame, Droplets, Mountain, Wind } from 'lucide-react';

// Get all subtypes flattened
const getAllSubtypes = () => {
  const subtypes: { subtype: ElementalSubtype; element: ElementalType }[] = [];
  elementalTypes.forEach(element => {
    element.subtypes.forEach(subtype => {
      subtypes.push({ subtype, element });
    });
  });
  return subtypes;
};

// Define opposite pairs
const oppositePairs = [
  { pair: ['fire-water', 'water-fire'], description: 'Fire tempered by Water vs Water ignited by Fire' },
  { pair: ['fire-earth', 'earth-fire'], description: 'Fire grounded by Earth vs Earth ignited by Fire' },
  { pair: ['fire-air', 'air-fire'], description: 'Fire lifted by Air vs Air ignited by Fire' },
  { pair: ['water-earth', 'earth-water'], description: 'Water grounded by Earth vs Earth softened by Water' },
  { pair: ['water-air', 'air-water'], description: 'Water lifted by Air vs Air softened by Water' },
  { pair: ['earth-air', 'air-earth'], description: 'Earth lifted by Air vs Air grounded by Earth' },
];

// Energy descriptions for opposite types
const oppositeEnergyDescriptions: Record<string, { energy: string; vibration: string; strengths: string[]; challenges: string[] }> = {
  'fire-water': {
    energy: 'Cool intensity with hidden depths. Fire as the primary element brings passion and drive, but Water\'s influence creates a refined, elegant expression. This type burns with a controlled flame, creating steam rather than wildfire.',
    vibration: 'High frequency tempered by fluidity. The vibration oscillates between intense focus and flowing adaptability, creating a sophisticated rhythm that can shift from commanding presence to subtle influence.',
    strengths: ['Strategic passion', 'Elegant intensity', 'Controlled power', 'Emotional intelligence with drive'],
    challenges: ['May suppress natural fire energy', 'Can struggle between action and reflection', 'Risk of internal conflict between passion and calm']
  },
  'water-fire': {
    energy: 'Passionate depth with emotional intensity. Water as the primary element brings intuition and flow, but Fire\'s influence adds spark and determination. This type flows with purpose, like a river carving through rock.',
    vibration: 'Deep, resonant waves with occasional bursts of intensity. The vibration is primarily fluid and intuitive but punctuated by moments of passionate clarity and decisive action.',
    strengths: ['Intuitive passion', 'Emotional depth with courage', 'Creative fire', 'Empathetic leadership'],
    challenges: ['Emotions may overwhelm logic', 'Can be unpredictably intense', 'May struggle with consistency']
  },
  'fire-earth': {
    energy: 'Grounded intensity with enduring power. Fire as the primary element brings transformation and leadership, while Earth\'s influence provides stability and persistence. This type is like volcanic rock—formed by fire but solid and enduring.',
    vibration: 'Strong, steady pulses with underlying heat. The vibration is powerful and consistent, building momentum over time rather than burning out quickly.',
    strengths: ['Sustainable passion', 'Practical vision', 'Enduring leadership', 'Transformative stability'],
    challenges: ['May become too rigid', 'Can be slow to adapt', 'Risk of stubbornness in pursuit of goals']
  },
  'earth-fire': {
    energy: 'Passionate stability with transformative depth. Earth as the primary element brings nurturing and reliability, while Fire\'s influence adds ambition and creative spark. This type is like rich volcanic soil—grounded but fertile with potential.',
    vibration: 'Deep, warm resonance with occasional flares. The vibration is fundamentally stable but carries an undercurrent of passion that emerges when needed.',
    strengths: ['Passionate nurturing', 'Creative building', 'Warm leadership', 'Ambitious reliability'],
    challenges: ['May resist necessary change', 'Can be possessive of creations', 'Risk of burnout from sustained intensity']
  },
  'fire-air': {
    energy: 'Brilliant intensity with electric clarity. Fire as the primary element brings bold vision, while Air\'s influence adds intellectual sparkle and communication prowess. This type is like lightning—dramatic, illuminating, and impossible to ignore.',
    vibration: 'High, crackling frequency with dynamic peaks. The vibration is exciting and stimulating, creating an atmosphere of possibility and innovation.',
    strengths: ['Visionary communication', 'Inspiring presence', 'Quick, passionate thinking', 'Dynamic leadership'],
    challenges: ['May burn too bright too fast', 'Can scatter energy', 'Risk of overwhelming others']
  },
  'air-fire': {
    energy: 'Passionate intellect with warm brilliance. Air as the primary element brings ideas and connection, while Fire\'s influence adds warmth and conviction. This type is like a warm breeze before a storm—refreshing but charged with potential.',
    vibration: 'Light, quick oscillations with warm undertones. The vibration is mentally stimulating but carries emotional warmth that makes ideas feel personal and important.',
    strengths: ['Warm communication', 'Passionate ideas', 'Enthusiastic connection', 'Inspiring innovation'],
    challenges: ['May prioritize excitement over depth', 'Can be inconsistent in focus', 'Risk of promising more than delivering']
  },
  'water-earth': {
    energy: 'Grounded intuition with patient wisdom. Water as the primary element brings emotional depth and flow, while Earth\'s influence adds stability and practical wisdom. This type is like a deep, still pond—calm on the surface but rich with hidden life.',
    vibration: 'Slow, deep waves with grounding undertones. The vibration is calming and centering, creating space for reflection and growth.',
    strengths: ['Patient empathy', 'Practical intuition', 'Nurturing wisdom', 'Stable emotional support'],
    challenges: ['May be too passive', 'Can resist necessary action', 'Risk of stagnation']
  },
  'earth-water': {
    energy: 'Flowing stability with adaptive strength. Earth as the primary element brings reliability and nurturing, while Water\'s influence adds flexibility and emotional attunement. This type is like clay—solid yet shapeable, practical yet creative.',
    vibration: 'Steady rhythm with gentle fluctuations. The vibration is fundamentally stable but responsive to emotional currents, adapting without losing core strength.',
    strengths: ['Flexible reliability', 'Emotionally grounded', 'Adaptive nurturing', 'Practical empathy'],
    challenges: ['May absorb others\' emotions too deeply', 'Can be slow to set boundaries', 'Risk of losing self in service to others']
  },
  'water-air': {
    energy: 'Light intuition with dreamy clarity. Water as the primary element brings emotional depth, while Air\'s influence adds lightness and mental clarity. This type is like morning mist—ethereal, refreshing, and full of possibility.',
    vibration: 'Gentle, floating oscillations with intuitive pulses. The vibration is soft and dreamy but carries moments of crystal clarity.',
    strengths: ['Intuitive communication', 'Gentle wisdom', 'Creative dreaming', 'Soft influence'],
    challenges: ['May lack grounding', 'Can be too idealistic', 'Risk of disconnection from practical reality']
  },
  'air-water': {
    energy: 'Emotional intellect with gentle brilliance. Air as the primary element brings ideas and lightness, while Water\'s influence adds emotional depth and intuition. This type is like a gentle rain—refreshing, nourishing, and softly persistent.',
    vibration: 'Quick, light waves with emotional depth. The vibration is mentally active but carries an undercurrent of feeling that adds meaning to thoughts.',
    strengths: ['Thoughtful empathy', 'Gentle communication', 'Intuitive ideas', 'Soft brilliance'],
    challenges: ['May overthink emotions', 'Can be indecisive', 'Risk of emotional overwhelm from too much thinking']
  },
  'earth-air': {
    energy: 'Grounded lightness with practical optimism. Earth as the primary element brings stability and nurturing, while Air\'s influence adds brightness and social connection. This type is like a sunny meadow—warm, inviting, and full of life.',
    vibration: 'Steady, warm oscillations with bright peaks. The vibration is fundamentally grounding but carries an uplifting quality that inspires growth.',
    strengths: ['Practical optimism', 'Grounded communication', 'Nurturing connection', 'Stable joy'],
    challenges: ['May resist deeper exploration', 'Can prioritize harmony over truth', 'Risk of superficial positivity']
  },
  'air-earth': {
    energy: 'Practical brilliance with grounded innovation. Air as the primary element brings ideas and freedom, while Earth\'s influence adds practicality and follow-through. This type is like seeds carried by wind—full of potential that takes root and grows.',
    vibration: 'Light, quick rhythm with grounding bass notes. The vibration is mentally stimulating but anchored by practical considerations.',
    strengths: ['Practical innovation', 'Grounded ideas', 'Reliable creativity', 'Communicative building'],
    challenges: ['May limit creative vision', 'Can be too cautious with ideas', 'Risk of analysis paralysis']
  }
};

// Element icons
const ElementIcon: React.FC<{ element: string; className?: string }> = ({ element, className = "w-5 h-5" }) => {
  switch (element) {
    case 'fire': return <Flame className={className} />;
    case 'water': return <Droplets className={className} />;
    case 'earth': return <Mountain className={className} />;
    case 'air': return <Wind className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Color swatch component
const ColorSwatch: React.FC<{ hex: string; name: string; size?: 'sm' | 'md' }> = ({ hex, name, size = 'md' }) => (
  <div className="group relative">
    <div 
      className={`rounded-lg shadow-sm border border-gray-200 transition-transform duration-200 hover:scale-110 cursor-pointer ${
        size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
      }`}
      style={{ backgroundColor: hex }}
    />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
      {name}
    </div>
  </div>
);

// Mini wheel visualization
const MiniWheel: React.FC<{ 
  type1Id: string | null; 
  type2Id: string | null;
  showOverlap?: boolean;
}> = ({ type1Id, type2Id, showOverlap = true }) => {
  const allSubtypes = getAllSubtypes();
  const anglePerSubtype = 360 / allSubtypes.length;
  
  const getSubtypeIndex = (id: string) => allSubtypes.findIndex(s => s.subtype.id === id);
  
  const type1Index = type1Id ? getSubtypeIndex(type1Id) : -1;
  const type2Index = type2Id ? getSubtypeIndex(type2Id) : -1;
  
  const centerX = 80;
  const centerY = 80;
  const outerRadius = 70;
  const innerRadius = 40;
  
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto">
      <defs>
        <filter id="miniGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Draw segments */}
      {allSubtypes.map((item, index) => {
        const startAngle = -90 + (index * anglePerSubtype);
        const endAngle = startAngle + anglePerSubtype;
        
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        
        const x1Outer = centerX + outerRadius * Math.cos(startRad);
        const y1Outer = centerY + outerRadius * Math.sin(startRad);
        const x2Outer = centerX + outerRadius * Math.cos(endRad);
        const y2Outer = centerY + outerRadius * Math.sin(endRad);
        
        const x1Inner = centerX + innerRadius * Math.cos(startRad);
        const y1Inner = centerY + innerRadius * Math.sin(startRad);
        const x2Inner = centerX + innerRadius * Math.cos(endRad);
        const y2Inner = centerY + innerRadius * Math.sin(endRad);
        
        const isType1 = index === type1Index;
        const isType2 = index === type2Index;
        const isHighlighted = isType1 || isType2;
        
        // Check if this segment is between the two selected types (for overlap visualization)
        let isInOverlap = false;
        if (showOverlap && type1Index >= 0 && type2Index >= 0) {
          const minIdx = Math.min(type1Index, type2Index);
          const maxIdx = Math.max(type1Index, type2Index);
          const directDistance = maxIdx - minIdx;
          const wrapDistance = allSubtypes.length - directDistance;
          
          if (directDistance <= wrapDistance) {
            isInOverlap = index > minIdx && index < maxIdx;
          } else {
            isInOverlap = index > maxIdx || index < minIdx;
          }
        }
        
        const path = `
          M ${x1Inner} ${y1Inner}
          L ${x1Outer} ${y1Outer}
          A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}
          L ${x2Inner} ${y2Inner}
          A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner}
        `;
        
        return (
          <path
            key={item.subtype.id}
            d={path}
            fill={item.subtype.colors[0]?.hex || '#888'}
            stroke="white"
            strokeWidth={isHighlighted ? 2 : 0.5}
            opacity={isHighlighted ? 1 : isInOverlap ? 0.7 : 0.4}
            filter={isHighlighted ? "url(#miniGlow)" : undefined}
          />
        );
      })}
      
      {/* Center circle */}
      <circle cx={centerX} cy={centerY} r={innerRadius - 3} fill="white" />
      
      {/* Position markers */}
      {type1Index >= 0 && (
        <g>
          <circle
            cx={centerX + ((outerRadius + innerRadius) / 2) * Math.cos(((-90 + type1Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            cy={centerY + ((outerRadius + innerRadius) / 2) * Math.sin(((-90 + type1Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            r={8}
            fill="white"
            stroke={allSubtypes[type1Index].subtype.colors[0]?.hex}
            strokeWidth={3}
          />
          <text
            x={centerX + ((outerRadius + innerRadius) / 2) * Math.cos(((-90 + type1Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            y={centerY + ((outerRadius + innerRadius) / 2) * Math.sin(((-90 + type1Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-bold"
            fill={allSubtypes[type1Index].subtype.colors[0]?.hex}
          >
            1
          </text>
        </g>
      )}
      
      {type2Index >= 0 && (
        <g>
          <circle
            cx={centerX + ((outerRadius + innerRadius) / 2) * Math.cos(((-90 + type2Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            cy={centerY + ((outerRadius + innerRadius) / 2) * Math.sin(((-90 + type2Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            r={8}
            fill="white"
            stroke={allSubtypes[type2Index].subtype.colors[0]?.hex}
            strokeWidth={3}
          />
          <text
            x={centerX + ((outerRadius + innerRadius) / 2) * Math.cos(((-90 + type2Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            y={centerY + ((outerRadius + innerRadius) / 2) * Math.sin(((-90 + type2Index * anglePerSubtype + anglePerSubtype / 2) * Math.PI) / 180)}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-bold"
            fill={allSubtypes[type2Index].subtype.colors[0]?.hex}
          >
            2
          </text>
        </g>
      )}
      
      {/* Overlap arc indicator */}
      {showOverlap && type1Index >= 0 && type2Index >= 0 && (
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRadius + 5}
          fill="none"
          stroke="url(#overlapGradient)"
          strokeWidth={3}
          strokeDasharray="4 2"
          opacity={0.6}
        />
      )}
    </svg>
  );
};

// Type selector dropdown
const TypeSelector: React.FC<{
  value: string | null;
  onChange: (value: string) => void;
  label: string;
  color?: string;
}> = ({ value, onChange, label, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allSubtypes = getAllSubtypes();
  const selectedSubtype = value ? allSubtypes.find(s => s.subtype.id === value) : null;
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
        style={{ borderColor: color }}
      >
        {selectedSubtype ? (
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: selectedSubtype.subtype.colors[0]?.hex }}
            />
            <div className="text-left">
              <div className="font-medium text-gray-900">{selectedSubtype.subtype.name}</div>
              <div className="text-xs text-gray-500">{selectedSubtype.subtype.seasonalName}</div>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Select a type...</span>
        )}
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
          {elementalTypes.map(element => (
            <div key={element.id}>
              <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <ElementIcon element={element.id} className="w-4 h-4" />
                {element.name} ({element.season})
              </div>
              {element.subtypes.map(subtype => (
                <button
                  key={subtype.id}
                  onClick={() => {
                    onChange(subtype.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    value === subtype.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: subtype.colors[0]?.hex }}
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{subtype.name}</div>
                    <div className="text-xs text-gray-500">{subtype.seasonalName}</div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Comparison section component
const ComparisonSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  type1Content: React.ReactNode;
  type2Content: React.ReactNode;
  type1Color: string;
  type2Color: string;
}> = ({ title, icon, type1Content, type2Content, type1Color, type2Color }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
      {icon}
      <h4 className="font-medium text-gray-900">{title}</h4>
    </div>
    <div className="grid grid-cols-2 divide-x divide-gray-100">
      <div className="p-4" style={{ borderTop: `3px solid ${type1Color}` }}>
        {type1Content}
      </div>
      <div className="p-4" style={{ borderTop: `3px solid ${type2Color}` }}>
        {type2Content}
      </div>
    </div>
  </div>
);

const ComparisonTool: React.FC = () => {
  const [type1Id, setType1Id] = useState<string | null>(null);
  const [type2Id, setType2Id] = useState<string | null>(null);
  const [mode, setMode] = useState<'compare' | 'opposites'>('compare');
  const [selectedOppositePair, setSelectedOppositePair] = useState<number | null>(null);
  
  const allSubtypes = getAllSubtypes();
  
  const type1Data = useMemo(() => {
    if (!type1Id) return null;
    return allSubtypes.find(s => s.subtype.id === type1Id);
  }, [type1Id, allSubtypes]);
  
  const type2Data = useMemo(() => {
    if (!type2Id) return null;
    return allSubtypes.find(s => s.subtype.id === type2Id);
  }, [type2Id, allSubtypes]);
  
  // For opposite mode
  const oppositeData = useMemo(() => {
    if (selectedOppositePair === null) return null;
    const pair = oppositePairs[selectedOppositePair];
    const type1 = allSubtypes.find(s => s.subtype.id === pair.pair[0]);
    const type2 = allSubtypes.find(s => s.subtype.id === pair.pair[1]);
    const energy1 = oppositeEnergyDescriptions[pair.pair[0]];
    const energy2 = oppositeEnergyDescriptions[pair.pair[1]];
    return { pair, type1, type2, energy1, energy2 };
  }, [selectedOppositePair, allSubtypes]);
  
  const handleSwap = () => {
    const temp = type1Id;
    setType1Id(type2Id);
    setType2Id(temp);
  };
  
  const handleReset = () => {
    setType1Id(null);
    setType2Id(null);
    setSelectedOppositePair(null);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-gray-900 mb-3">Type Comparison Tool</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare different elemental types side by side to understand their unique characteristics, 
          color palettes, and how they relate to each other on the wheel.
        </p>
      </div>
      
      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode('compare')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'compare' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Compare Any Types
            </span>
          </button>
          <button
            onClick={() => setMode('opposites')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'opposites' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Opposite Types Energy
            </span>
          </button>
        </div>
      </div>
      
      {mode === 'compare' ? (
        <>
          {/* Type Selectors */}
          <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
              <TypeSelector
                value={type1Id}
                onChange={setType1Id}
                label="First Type"
                color={type1Data?.subtype.colors[0]?.hex}
              />
              
              <div className="flex items-center justify-center gap-2 py-3">
                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all hover:scale-110"
                  title="Swap types"
                >
                  <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all hover:scale-110"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <TypeSelector
                value={type2Id}
                onChange={setType2Id}
                label="Second Type"
                color={type2Data?.subtype.colors[0]?.hex}
              />
            </div>
          </div>
          
          {/* Comparison Content */}
          {type1Data && type2Data ? (
            <div className="space-y-6">
              {/* Wheel Position Visualization */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Position on the Wheel</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <MiniWheel type1Id={type1Id} type2Id={type2Id} />
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: type1Data.subtype.colors[0]?.hex }}>1</div>
                      <div>
                        <div className="font-medium text-gray-900">{type1Data.subtype.name}</div>
                        <div className="text-sm text-gray-500">{type1Data.subtype.seasonalName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: type2Data.subtype.colors[0]?.hex }}>2</div>
                      <div>
                        <div className="font-medium text-gray-900">{type2Data.subtype.name}</div>
                        <div className="text-sm text-gray-500">{type2Data.subtype.seasonalName}</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Distance:</span> These types are{' '}
                        {Math.abs(allSubtypes.findIndex(s => s.subtype.id === type1Id) - allSubtypes.findIndex(s => s.subtype.id === type2Id))} positions apart on the wheel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Type Headers */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-6 rounded-xl text-white"
                  style={{ backgroundColor: type1Data.subtype.colors[0]?.hex }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ElementIcon element={type1Data.element.id} className="w-6 h-6" />
                    <h3 className="text-xl font-serif">{type1Data.subtype.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{type1Data.subtype.seasonalName} • {type1Data.element.season}</p>
                </div>
                <div 
                  className="p-6 rounded-xl text-white"
                  style={{ backgroundColor: type2Data.subtype.colors[0]?.hex }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ElementIcon element={type2Data.element.id} className="w-6 h-6" />
                    <h3 className="text-xl font-serif">{type2Data.subtype.name}</h3>
                  </div>
                  <p className="text-sm opacity-90">{type2Data.subtype.seasonalName} • {type2Data.element.season}</p>
                </div>
              </div>
              
              {/* Description Comparison */}
              <ComparisonSection
                title="Description"
                icon={<Info className="w-5 h-5 text-gray-500" />}
                type1Content={<p className="text-sm text-gray-600">{type1Data.subtype.description}</p>}
                type2Content={<p className="text-sm text-gray-600">{type2Data.subtype.description}</p>}
                type1Color={type1Data.subtype.colors[0]?.hex}
                type2Color={type2Data.subtype.colors[0]?.hex}
              />
              
              {/* Color Palette Comparison */}
              <ComparisonSection
                title="Color Palette"
                icon={<Palette className="w-5 h-5 text-gray-500" />}
                type1Content={
                  <div className="flex flex-wrap gap-2">
                    {type1Data.subtype.colors.map((color, idx) => (
                      <ColorSwatch key={idx} hex={color.hex} name={color.name} />
                    ))}
                  </div>
                }
                type2Content={
                  <div className="flex flex-wrap gap-2">
                    {type2Data.subtype.colors.map((color, idx) => (
                      <ColorSwatch key={idx} hex={color.hex} name={color.name} />
                    ))}
                  </div>
                }
                type1Color={type1Data.subtype.colors[0]?.hex}
                type2Color={type2Data.subtype.colors[0]?.hex}
              />
              
              {/* Characteristics Comparison */}
              <ComparisonSection
                title="Characteristics"
                icon={<User className="w-5 h-5 text-gray-500" />}
                type1Content={
                  <ul className="space-y-2">
                    {type1Data.subtype.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" 
                          style={{ backgroundColor: type1Data.subtype.colors[0]?.hex }} />
                        {char}
                      </li>
                    ))}
                  </ul>
                }
                type2Content={
                  <ul className="space-y-2">
                    {type2Data.subtype.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" 
                          style={{ backgroundColor: type2Data.subtype.colors[0]?.hex }} />
                        {char}
                      </li>
                    ))}
                  </ul>
                }
                type1Color={type1Data.subtype.colors[0]?.hex}
                type2Color={type2Data.subtype.colors[0]?.hex}
              />
              
              {/* Elemental Expression Comparison */}
              <ComparisonSection
                title="Elemental Expression"
                icon={<Sparkles className="w-5 h-5 text-gray-500" />}
                type1Content={
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">In Nature</p>
                      <p className="text-sm text-gray-600">{type1Data.subtype.elementalExpression.inNature}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Themes</p>
                      <div className="flex flex-wrap gap-1">
                        {type1Data.subtype.elementalExpression.themes.map((theme, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{theme}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Archetypes</p>
                      <div className="flex flex-wrap gap-1">
                        {type1Data.subtype.elementalExpression.archetypes.map((arch, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-xs text-white"
                            style={{ backgroundColor: type1Data.subtype.colors[0]?.hex }}>{arch}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                type2Content={
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">In Nature</p>
                      <p className="text-sm text-gray-600">{type2Data.subtype.elementalExpression.inNature}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Themes</p>
                      <div className="flex flex-wrap gap-1">
                        {type2Data.subtype.elementalExpression.themes.map((theme, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{theme}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Archetypes</p>
                      <div className="flex flex-wrap gap-1">
                        {type2Data.subtype.elementalExpression.archetypes.map((arch, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-xs text-white"
                            style={{ backgroundColor: type2Data.subtype.colors[0]?.hex }}>{arch}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                type1Color={type1Data.subtype.colors[0]?.hex}
                type2Color={type2Data.subtype.colors[0]?.hex}
              />
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <ArrowLeftRight className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select Two Types to Compare</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Choose two elemental types from the dropdowns above to see a detailed side-by-side comparison of their characteristics, colors, and expressions.
              </p>
            </div>
          )}
        </>
      ) : (
        /* Opposites Mode */
        <div className="space-y-8">
          {/* Opposite Pairs Selector */}
          <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-violet-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Select an Opposite Pair</h3>
            <p className="text-sm text-gray-600 text-center mb-6 max-w-2xl mx-auto">
              Opposite types share the same two elements but with reversed primary and secondary influences. 
              This creates fundamentally different energies and vibrations despite the shared elemental composition.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {oppositePairs.map((pair, idx) => {
                const type1 = allSubtypes.find(s => s.subtype.id === pair.pair[0]);
                const type2 = allSubtypes.find(s => s.subtype.id === pair.pair[1]);
                const isSelected = selectedOppositePair === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOppositePair(isSelected ? null : idx)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-gray-900 bg-white shadow-lg' 
                        : 'border-transparent bg-white/60 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: type1?.subtype.colors[0]?.hex }} />
                      <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: type2?.subtype.colors[0]?.hex }} />
                    </div>
                    <div className="font-medium text-gray-900 text-sm">
                      {type1?.subtype.shortName} vs {type2?.subtype.shortName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{pair.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Opposite Analysis */}
          {oppositeData ? (
            <div className="space-y-6">
              {/* Visual Header */}
              <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
                    style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex }} />
                  <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl"
                    style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex }} />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full mb-3 flex items-center justify-center"
                        style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex }}>
                        <ElementIcon element={oppositeData.type1?.element.id || ''} className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-serif">{oppositeData.type1?.subtype.name}</h3>
                      <p className="text-sm opacity-80">{oppositeData.type1?.subtype.seasonalName}</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-light opacity-40">vs</div>
                      <Zap className="w-8 h-8 text-yellow-400 my-2" />
                      <div className="text-xs uppercase tracking-wider opacity-60">Opposite Energy</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full mb-3 flex items-center justify-center"
                        style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex }}>
                        <ElementIcon element={oppositeData.type2?.element.id || ''} className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-serif">{oppositeData.type2?.subtype.name}</h3>
                      <p className="text-sm opacity-80">{oppositeData.type2?.subtype.seasonalName}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Energy Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type 1 Energy */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 text-white" style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex }}>
                    <h4 className="font-semibold flex items-center gap-2">
                      <ElementIcon element={oppositeData.type1?.element.id || ''} className="w-5 h-5" />
                      {oppositeData.type1?.subtype.name} Energy
                    </h4>
                    <p className="text-sm opacity-90 mt-1">Primary: {oppositeData.type1?.element.name}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Energy Pattern
                      </h5>
                      <p className="text-sm text-gray-600">{oppositeData.energy1?.energy}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Vibration
                      </h5>
                      <p className="text-sm text-gray-600">{oppositeData.energy1?.vibration}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        {oppositeData.energy1?.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Challenges</h5>
                      <ul className="space-y-1">
                        {oppositeData.energy1?.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Type 2 Energy */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 text-white" style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex }}>
                    <h4 className="font-semibold flex items-center gap-2">
                      <ElementIcon element={oppositeData.type2?.element.id || ''} className="w-5 h-5" />
                      {oppositeData.type2?.subtype.name} Energy
                    </h4>
                    <p className="text-sm opacity-90 mt-1">Primary: {oppositeData.type2?.element.name}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" /> Energy Pattern
                      </h5>
                      <p className="text-sm text-gray-600">{oppositeData.energy2?.energy}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Vibration
                      </h5>
                      <p className="text-sm text-gray-600">{oppositeData.energy2?.vibration}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        {oppositeData.energy2?.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Challenges</h5>
                      <ul className="space-y-1">
                        {oppositeData.energy2?.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Differences Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Understanding the Difference</h4>
                <div className="max-w-3xl mx-auto">
                  <p className="text-gray-600 text-center mb-6">
                    While both types share the same two elements, the <strong>primary element</strong> determines the core nature, 
                    while the <strong>secondary element</strong> modifies and influences that core. This creates fundamentally different 
                    approaches to life, relationships, and self-expression.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-white rounded-xl">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex + '20' }}>
                        <ElementIcon element={oppositeData.type1?.element.id || ''} className="w-6 h-6"
                          style={{ color: oppositeData.type1?.subtype.colors[0]?.hex }} />
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>{oppositeData.type1?.subtype.name}</strong> leads with {oppositeData.type1?.element.name} energy, 
                        using {oppositeData.type2?.element.name} as a supporting influence.
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex + '20' }}>
                        <ElementIcon element={oppositeData.type2?.element.id || ''} className="w-6 h-6"
                          style={{ color: oppositeData.type2?.subtype.colors[0]?.hex }} />
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>{oppositeData.type2?.subtype.name}</strong> leads with {oppositeData.type2?.element.name} energy, 
                        using {oppositeData.type1?.element.name} as a supporting influence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Color Palette Comparison for Opposites */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Color Palette Comparison</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: oppositeData.type1?.subtype.colors[0]?.hex }} />
                      <span className="font-medium text-gray-900">{oppositeData.type1?.subtype.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {oppositeData.type1?.subtype.colors.map((color, idx) => (
                        <ColorSwatch key={idx} hex={color.hex} name={color.name} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: oppositeData.type2?.subtype.colors[0]?.hex }} />
                      <span className="font-medium text-gray-900">{oppositeData.type2?.subtype.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {oppositeData.type2?.subtype.colors.map((color, idx) => (
                        <ColorSwatch key={idx} hex={color.hex} name={color.name} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Zap className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Opposite Pair</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Choose one of the opposite pairs above to explore how the same two elements create different energies 
                depending on which element is primary.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
