import React, { useState, useEffect, useRef } from 'react';
import { elementalTypes, ElementalType, ElementalSubtype } from '@/data/elementalTypes';
import { Sparkles, Info, Play, Pause, Palette, Share2 } from 'lucide-react';
import WheelShareCard from './WheelShareCard';

interface ElementalColorWheelProps {
  userElement?: string | null;
  userSubtype?: string | null;
  onSelectType?: (type: ElementalType) => void;
  onSelectSubtype?: (type: ElementalType, subtype: ElementalSubtype) => void;
}

// Color theme definitions
export const colorThemes = {
  original: { name: 'Original', primary: '#C41E3A', description: 'Default elemental color identity' },
  blue: { name: 'Blue', primary: '#2563EB', description: 'Cool ocean tones' },
  red: { name: 'Red', primary: '#DC2626', description: 'Warm fire tones' },
  green: { name: 'Green', primary: '#16A34A', description: 'Natural earth tones' },
  purple: { name: 'Purple', primary: '#9333EA', description: 'Royal mystical tones' },
  yellow: { name: 'Yellow', primary: '#EAB308', description: 'Sunny warm tones' },
  pink: { name: 'Pink', primary: '#EC4899', description: 'Soft romantic tones' }
};

export type ColorTheme = keyof typeof colorThemes;

// Function to shift hue of a hex color
const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Theme hue mappings
const themeHueShifts: Record<ColorTheme, number> = {
  original: 0,
  blue: 210,
  red: 0,
  green: 120,
  purple: 280,
  yellow: 50,
  pink: 330
};

const applyThemeToColor = (hex: string, theme: ColorTheme): string => {
  if (theme === 'original') return hex;
  
  const hsl = hexToHSL(hex);
  const targetHue = themeHueShifts[theme];
  
  // Shift the hue towards the target while preserving some variation
  const hueVariation = (hsl.h % 60) - 30; // Keep some variation within ±30 degrees
  const newHue = (targetHue + hueVariation + 360) % 360;
  
  return hslToHex(newHue, Math.min(hsl.s * 1.1, 100), hsl.l);
};

const ElementalColorWheel: React.FC<ElementalColorWheelProps> = ({
  userElement,
  userSubtype,
  onSelectType,
  onSelectSubtype
}) => {
  const [hoveredSubtype, setHoveredSubtype] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [animatedSegments, setAnimatedSegments] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [seasonalFlowActive, setSeasonalFlowActive] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('original');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const animationRef = useRef<number | null>(null);
  const flowAnimationRef = useRef<number | null>(null);
  const themeSelectorRef = useRef<HTMLDivElement>(null);
  const hoverClearTimeoutRef = useRef<number | null>(null);

  // Define the wheel layout - elements positioned around the circle

  const getElementPositions = () => ({
    fire: { angle: -90, season: 'Winter', color: applyThemeToColor('#C41E3A', selectedTheme), nextElement: 'air' },
    air: { angle: 0, season: 'Spring', color: applyThemeToColor('#00CED1', selectedTheme), nextElement: 'water' },
    water: { angle: 90, season: 'Summer', color: applyThemeToColor('#6B8BA4', selectedTheme), nextElement: 'earth' },
    earth: { angle: 180, season: 'Autumn', color: applyThemeToColor('#228B22', selectedTheme), nextElement: 'fire' }
  });

  const elementPositions = getElementPositions();



  // Helper function to get a representative color for a subtype
  // Avoids whites, blacks, and very light colors to ensure visibility on the wheel
  const getRepresentativeColor = (colors: any[]): string => {
    // First, try to find a primary color that's not white/black
    const primaryColors = colors.filter(c => c.category === 'primary');
    for (const color of primaryColors) {
      const hex = color.hex.toLowerCase();
      // Skip whites, blacks, and very light colors
      if (hex !== '#ffffff' && hex !== '#000000' && hex !== '#0a0a0a' && 
          hex !== '#fafafa' && hex !== '#f5f5f5' && hex !== '#1c1c1c' &&
          !hex.startsWith('#fff') && !hex.startsWith('#faf')) {
        return color.hex;
      }
    }
    // If no suitable primary, try secondary colors
    const secondaryColors = colors.filter(c => c.category === 'secondary');
    for (const color of secondaryColors) {
      const hex = color.hex.toLowerCase();
      if (hex !== '#ffffff' && hex !== '#000000') {
        return color.hex;
      }
    }
    // Fallback to first non-white/black color
    for (const color of colors) {
      const hex = color.hex.toLowerCase();
      if (hex !== '#ffffff' && hex !== '#000000' && hex !== '#0a0a0a' && 
          hex !== '#fafafa' && hex !== '#f5f5f5') {
        return color.hex;
      }
    }
    // Ultimate fallback
    return colors[0]?.hex || '#888888';
  };

  // Get all subtypes in order with theme-adjusted colors
  const getAllSubtypes = () => {
    const subtypes: { id: string; name: string; seasonalName: string; element: string; colors: any[]; themedColor: string }[] = [];
    const elementOrder = ['fire', 'air', 'water', 'earth'];
    
    elementOrder.forEach(elementId => {
      const element = elementalTypes.find(e => e.id === elementId);
      if (element) {
        const pureSubtype = element.subtypes.find(s => s.id === `${elementId}-${elementId}`);
        const otherSubtypes = element.subtypes.filter(s => s.id !== `${elementId}-${elementId}`);
        
        if (pureSubtype) {
          subtypes.push({
            id: pureSubtype.id,
            name: pureSubtype.name,
            seasonalName: pureSubtype.seasonalName,
            element: elementId,
            colors: pureSubtype.colors,
            themedColor: applyThemeToColor(getRepresentativeColor(pureSubtype.colors), selectedTheme)
          });
        }
        
        otherSubtypes.forEach(s => {
          subtypes.push({
            id: s.id,
            name: s.name,
            seasonalName: s.seasonalName,
            element: elementId,
            colors: s.colors,
            themedColor: applyThemeToColor(getRepresentativeColor(s.colors), selectedTheme)
          });
        });
      }
    });
    
    return subtypes;
  };



  const allSubtypes = getAllSubtypes();
  const anglePerSubtype = 360 / allSubtypes.length;

  // Close theme selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
        setShowThemeSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Staggered fade-in animation on mount
  useEffect(() => {
    const animateSegments = async () => {
      for (let i = 0; i < allSubtypes.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setAnimatedSegments(prev => new Set([...prev, i]));
      }
      setTimeout(() => setIsLoaded(true), 300);
    };
    
    animateSegments();
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (flowAnimationRef.current) cancelAnimationFrame(flowAnimationRef.current);
    };
  }, []);

  // Seasonal flow animation when hovering on elements
  useEffect(() => {
    if (hoveredElement && !seasonalFlowActive) {
      setSeasonalFlowActive(true);
      const targetAngle = elementPositions[hoveredElement as keyof typeof elementPositions]?.angle || 0;
      
      const animateToAngle = () => {
        setRotationAngle(prev => {
          const diff = targetAngle - prev;
          const normalizedDiff = ((diff + 540) % 360) - 180;
          
          if (Math.abs(normalizedDiff) < 1) {
            setSeasonalFlowActive(false);
            return targetAngle;
          }
          
          return prev + normalizedDiff * 0.08;
        });
        
        flowAnimationRef.current = requestAnimationFrame(animateToAngle);
      };
      
      flowAnimationRef.current = requestAnimationFrame(animateToAngle);
    }
    
    return () => {
      if (flowAnimationRef.current) cancelAnimationFrame(flowAnimationRef.current);
    };
  }, [hoveredElement]);

  // Auto rotation animation
  useEffect(() => {
    if (isAutoRotating) {
      const animate = () => {
        setRotationAngle(prev => (prev + 0.3) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoRotating]);

  // Calculate position on the wheel
  const getPosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  };

  // Get element data
  const getElementData = (elementId: string) => {
    return elementalTypes.find(e => e.id === elementId);
  };

  // Get subtype data
  const getSubtypeData = (subtypeId: string) => {
    for (const element of elementalTypes) {
      const subtype = element.subtypes.find(s => s.id === subtypeId);
      if (subtype) return { element, subtype };
    }
    return null;
  };

  const centerX = 200;
  const centerY = 200;
  const outerRadius = 170;
  const innerRadius = 100;
  const elementLabelRadius = 60;

  // Get the hovered or user subtype info
  const activeSubtypeId = hoveredSubtype || userSubtype;
  const activeSubtypeData = activeSubtypeId ? getSubtypeData(activeSubtypeId) : null;

  // Calculate flow indicator position
  const flowIndicatorPos = getPosition(rotationAngle - 90, outerRadius + 20);

  // Get themed flow gradient colors
  const getThemedFlowGradient = () => {
    return {
      color1: applyThemeToColor('#C41E3A', selectedTheme),
      color2: applyThemeToColor('#FF7F50', selectedTheme),
      color3: applyThemeToColor('#6B8BA4', selectedTheme),
      color4: applyThemeToColor('#CC4E3E', selectedTheme)
    };
  };

  const flowColors = getThemedFlowGradient();

  const handleSubtypeMouseEnter = (subtypeId: string) => {
    if (hoverClearTimeoutRef.current) {
      window.clearTimeout(hoverClearTimeoutRef.current);
      hoverClearTimeoutRef.current = null;
    }
    setHoveredSubtype(subtypeId);
  };

  const handleSubtypeMouseLeave = () => {
    // Delay clearing to avoid panel flicker when crossing thin segment borders.
    hoverClearTimeoutRef.current = window.setTimeout(() => {
      setHoveredSubtype(null);
      hoverClearTimeoutRef.current = null;
    }, 80);
  };

  useEffect(() => {
    return () => {
      if (hoverClearTimeoutRef.current) {
        window.clearTimeout(hoverClearTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* CSS for animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor);
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 16px currentColor) drop-shadow(0 0 32px currentColor);
            transform: scale(1.1);
          }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes rotateFlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
        
        @keyframes markerPulse {
          0%, 100% {
            r: 12;
            opacity: 1;
          }
          50% {
            r: 16;
            opacity: 0.8;
          }
        }
        
        @keyframes innerPulse {
          0%, 100% {
            r: 6;
          }
          50% {
            r: 8;
          }
        }
        
        .segment-animate {
          animation: fadeInScale 0.4s ease-out forwards;
        }
        
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        .shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .flow-indicator {
          transition: all 0.3s ease-out;
        }
        
        .wheel-segment {
          transition: opacity 0.3s ease, transform 0.2s ease, fill 0.5s ease;
          transform-origin: center;
        }
        
        .wheel-segment:hover {
          filter: brightness(1.1);
        }
      `}</style>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
          <Palette className="w-5 h-5 text-violet-500" />
          <span className="text-sm font-medium bg-gradient-to-r from-emerald-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">Elemental Seasons</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          <span className="bg-gradient-to-r from-emerald-500 via-blue-500 via-violet-500 to-rose-500 bg-clip-text text-transparent">Elemental</span>{' '}
          <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">Color Wheel</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The cycle of seasons and elements. Find where you fit in the elemental spectrum.
        </p>
      </div>


      {/* Prominent Color Theme Selector */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <Palette className="w-6 h-6 text-gray-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Customize Wheel Colors</h3>
                <p className="text-sm text-gray-500">Choose a color theme to personalize your view</p>
              </div>
            </div>
            
            <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-end gap-2">
              {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`group relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                    selectedTheme === theme 
                      ? 'bg-white shadow-md scale-105 ring-2 ring-offset-2' 
                      : 'hover:bg-white/60 hover:scale-105'
                  }`}
                  style={
                    selectedTheme === theme
                      ? ({
                          '--tw-ring-color': colorThemes[theme].primary,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <div 
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedTheme === theme ? 'border-white shadow-lg' : 'border-transparent'
                    }`}
                    style={{ 
                      backgroundColor: colorThemes[theme].primary,
                      boxShadow: selectedTheme === theme ? `0 0 12px ${colorThemes[theme].primary}60` : undefined
                    }}
                  />
                  <span className={`text-xs font-medium transition-colors ${
                    selectedTheme === theme ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
                  }`}>
                    {colorThemes[theme].name}
                  </span>
                  {selectedTheme === theme && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Current theme description */}
          <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">Current theme:</span>
            <span 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: colorThemes[selectedTheme].primary }}
            >
              {colorThemes[selectedTheme].name}
              <span className="text-white/80">—</span>
              <span className="text-white/90">{colorThemes[selectedTheme].description}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <Info className="w-4 h-4" />
          {showInfo ? 'Hide' : 'Show'} how to read the wheel
        </button>
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`inline-flex items-center gap-2 text-sm transition-colors px-4 py-2 rounded-lg ${
            isAutoRotating 
              ? 'text-white bg-rose-500 hover:bg-rose-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAutoRotating ? 'Pause' : 'Animate'} seasonal flow
        </button>
      </div>


      {showInfo && (
        <div className="max-w-2xl mx-auto mb-8 p-6 bg-gray-50 rounded-xl text-sm text-gray-600 animate-in fade-in slide-in-from-top-4 duration-300">
          <h4 className="font-semibold text-gray-900 mb-3">Understanding the Wheel</h4>
          <ul className="space-y-2">
            <li><span className="font-medium">Four Elements:</span> Fire (Winter), Air (Spring), Water (Summer), Earth (Autumn) are positioned at the cardinal points.</li>
            <li><span className="font-medium">16 Subtypes:</span> Each element has 4 subtypes - one pure type and three that blend with neighboring elements.</li>
            <li><span className="font-medium">Seasonal Flow:</span> Hover over element names to see the wheel rotate to that season. Click "Animate" to watch the full cycle.</li>
            <li><span className="font-medium">Color Themes:</span> Use the color selector to view the wheel in different color schemes - Blue, Red, Green, Purple, Yellow, or Pink.</li>
            <li><span className="font-medium">Your Position:</span> Your type is highlighted with a pulsing glow marker showing where you fit in the cycle.</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
        {/* The Wheel */}
        <div className="relative">
          <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-lg">
            {/* Definitions */}
            <defs>
              <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f8f8f8" />
                <stop offset="100%" stopColor="#e8e8e8" />
              </radialGradient>
              
              {/* Animated glow filter for user's position */}
              <filter id="glowPulse" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Standard glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Flow indicator gradient - themed */}
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={flowColors.color1} />
                <stop offset="25%" stopColor={flowColors.color2} />
                <stop offset="50%" stopColor={flowColors.color3} />
                <stop offset="75%" stopColor={flowColors.color4} />
                <stop offset="100%" stopColor={flowColors.color1} />
              </linearGradient>
            </defs>

            {/* Outer ring background */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={outerRadius} 
              fill="url(#wheelGradient)"
              className={isLoaded ? 'opacity-100' : 'opacity-0'}
              style={{ transition: 'opacity 0.5s ease' }}
            />

            {/* Animated flow ring */}
            {(isAutoRotating || seasonalFlowActive) && (
              <circle
                cx={centerX}
                cy={centerY}
                r={outerRadius + 8}
                fill="none"
                stroke="url(#flowGradient)"
                strokeWidth="3"
                strokeDasharray="20 10"
                opacity={0.6}
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transformOrigin: 'center',
                  transition: seasonalFlowActive ? 'none' : 'transform 0.1s linear'
                }}
              />
            )}

            {/* Draw subtype segments with staggered animation */}
            {allSubtypes.map((subtype, index) => {
              const startAngle = -90 + (index * anglePerSubtype);
              const endAngle = startAngle + anglePerSubtype;
              const midAngle = startAngle + anglePerSubtype / 2;
              
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

              const isUserSubtype = userSubtype === subtype.id;
              const isHovered = hoveredSubtype === subtype.id;
              const isAnimated = animatedSegments.has(index);

              // Use themed color
              const primaryColor = subtype.themedColor;

              const path = `
                M ${x1Inner} ${y1Inner}
                L ${x1Outer} ${y1Outer}
                A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}
                L ${x2Inner} ${y2Inner}
                A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner}
              `;

              const markerRadius = (outerRadius + innerRadius) / 2;
              const markerPos = getPosition(midAngle, markerRadius);

              return (
                <g 
                  key={subtype.id}
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transform: isAnimated ? 'scale(1)' : 'scale(0.9)',
                    transformOrigin: `${centerX}px ${centerY}px`,
                    transition: `opacity 0.4s ease ${index * 0.03}s, transform 0.4s ease ${index * 0.03}s`
                  }}
                >
                  <path
                    d={path}
                    fill={primaryColor}
                    stroke="white"
                    strokeWidth={isUserSubtype || isHovered ? 3 : 1}
                    opacity={isUserSubtype || isHovered ? 1 : 0.85}
                    className="wheel-segment cursor-pointer"
                    style={{
                      filter: isHovered ? 'brightness(1.15)' : undefined
                    }}
                    onMouseEnter={() => handleSubtypeMouseEnter(subtype.id)}
                    onMouseLeave={handleSubtypeMouseLeave}
                    onClick={() => {
                      const data = getSubtypeData(subtype.id);
                      if (data && onSelectSubtype) {
                        onSelectSubtype(data.element, data.subtype);
                      }
                    }}
                  />
                  
                  {/* User position marker with pulsing animation */}
                  {isUserSubtype && isLoaded && (
                    <g style={{ color: primaryColor }}>
                      {/* Outer pulsing ring */}
                      <circle
                        cx={centerX + markerPos.x}
                        cy={centerY + markerPos.y}
                        r={18}
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth={2}
                        opacity={0.4}
                        className="shimmer"
                      />
                      {/* Main marker with glow */}
                      <circle
                        cx={centerX + markerPos.x}
                        cy={centerY + markerPos.y}
                        r={12}
                        fill="white"
                        stroke={primaryColor}
                        strokeWidth={3}
                        filter="url(#glowPulse)"
                        className="pulse-glow"
                        style={{ color: primaryColor }}
                      >
                        <animate
                          attributeName="r"
                          values="12;14;12"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Inner dot */}
                      <circle
                        cx={centerX + markerPos.x}
                        cy={centerY + markerPos.y}
                        r={6}
                        fill={primaryColor}
                      >
                        <animate
                          attributeName="r"
                          values="6;7;6"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Inner circle with element labels */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={innerRadius - 5} 
              fill="white"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease 0.5s'
              }}
            />
            
            {/* Element labels in center */}
            {Object.entries(elementPositions).map(([elementId, pos]) => {
              const labelPos = getPosition(pos.angle, elementLabelRadius);
              const element = getElementData(elementId);
              const isUserElement = userElement === elementId;
              const isHoveredEl = hoveredElement === elementId;
              
              return (
                <g 
                  key={elementId}
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.7s'
                  }}
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredElement(elementId);
                    if (!isAutoRotating) {
                      setSeasonalFlowActive(true);
                    }
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <text
                    x={centerX + labelPos.x}
                    y={centerY + labelPos.y - 8}
                    textAnchor="middle"
                    className={`text-sm font-serif transition-all duration-300 ${isUserElement || isHoveredEl ? 'font-bold' : ''}`}
                    fill={isUserElement || isHoveredEl ? pos.color : '#374151'}
                    style={{
                      transform: isHoveredEl ? 'scale(1.1)' : 'scale(1)',
                      transformOrigin: `${centerX + labelPos.x}px ${centerY + labelPos.y}px`
                    }}
                  >
                    {element?.name}
                  </text>
                  <text
                    x={centerX + labelPos.x}
                    y={centerY + labelPos.y + 8}
                    textAnchor="middle"
                    className="text-xs transition-all duration-300"
                    fill={isHoveredEl ? pos.color : '#6B7280'}
                  >
                    {pos.season}
                  </text>
                </g>
              );
            })}

            {/* Center decoration */}
            <circle 
              cx={centerX} 
              cy={centerY} 
              r={20} 
              fill="#f8f8f8" 
              stroke="#e5e5e5" 
              strokeWidth={1}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease 0.8s'
              }}
            />
            {userElement && (
              <circle 
                cx={centerX} 
                cy={centerY} 
                r={15} 
                fill={elementPositions[userElement as keyof typeof elementPositions]?.color || '#888'} 
                opacity={0.2}
                style={{
                  opacity: isLoaded ? 0.2 : 0,
                  transition: 'opacity 0.5s ease 0.9s'
                }}
              />
            )}

            {/* Flow direction indicator */}
            {(isAutoRotating || seasonalFlowActive) && (
              <g
                className="flow-indicator"
                style={{
                  transform: `translate(${centerX + flowIndicatorPos.x}px, ${centerY + flowIndicatorPos.y}px)`,
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={8}
                  fill="white"
                  stroke="url(#flowGradient)"
                  strokeWidth={3}
                  filter="url(#glow)"
                />
                <polygon
                  points="0,-4 4,4 -4,4"
                  fill="url(#flowGradient)"
                  style={{
                    transform: `rotate(${rotationAngle + 90}deg)`,
                    transformOrigin: 'center'
                  }}
                />
              </g>
            )}
          </svg>

          {/* Season labels outside the wheel with animation */}
          {['Winter', 'Spring', 'Summer', 'Autumn'].map((season, idx) => {
            const positions = [
              'absolute -top-2 left-1/2 -translate-x-1/2',
              'absolute top-1/2 -right-2 translate-x-full -translate-y-1/2',
              'absolute -bottom-2 left-1/2 -translate-x-1/2',
              'absolute top-1/2 -left-2 -translate-x-full -translate-y-1/2'
            ];
            const elements = ['fire', 'air', 'water', 'earth'];
            const isActive = hoveredElement === elements[idx];
            
            return (
              <div 
                key={season}
                className={`${positions[idx]} text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive ? 'text-gray-700 scale-110' : 'text-gray-400'
                }`}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.8 + idx * 0.1}s, color 0.3s ease, transform 0.3s ease`,
                  color: isActive ? elementPositions[elements[idx] as keyof typeof elementPositions]?.color : undefined
                }}
              >
                {season}
              </div>
            );
          })}
        </div>

        {/* Info Panel */}
        <div 
          className="w-full lg:w-80 min-h-[490px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s'
          }}
        >
          {activeSubtypeData ? (
            <div>
              <div 
                className="p-6 transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${applyThemeToColor(activeSubtypeData.subtype.colors[0].hex, selectedTheme)}20, ${applyThemeToColor(activeSubtypeData.subtype.colors[1].hex, selectedTheme)}20)` 
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: applyThemeToColor(activeSubtypeData.subtype.colors[0].hex, selectedTheme) }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-gray-900">{activeSubtypeData.subtype.name}</h3>
                    <p className="text-sm text-gray-500">{activeSubtypeData.subtype.seasonalName}</p>
                  </div>
                </div>
                {userSubtype === activeSubtypeData.subtype.id && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Your Type
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{activeSubtypeData.subtype.description}</p>
                
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Color Palette</p>
                  <div className="flex flex-wrap gap-1">
                    {activeSubtypeData.subtype.colors.slice(0, 8).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-lg shadow-sm border border-gray-200 transition-transform duration-200 hover:scale-110 cursor-pointer"
                        style={{ 
                          backgroundColor: applyThemeToColor(color.hex, selectedTheme),
                          animationDelay: `${idx * 0.05}s`
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Characteristics</p>
                  <ul className="space-y-1">
                    {activeSubtypeData.subtype.characteristics.slice(0, 3).map((char, idx) => (
                      <li 
                        key={idx} 
                        className="text-xs text-gray-600 flex items-start gap-2"
                        style={{
                          opacity: isLoaded ? 1 : 0,
                          transform: isLoaded ? 'translateX(0)' : 'translateX(-10px)',
                          transition: `opacity 0.3s ease ${idx * 0.1}s, transform 0.3s ease ${idx * 0.1}s`
                        }}
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                {onSelectType && (
                  <button
                    onClick={() => onSelectType(activeSubtypeData.element)}
                    className="mt-4 w-full py-2 px-4 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    View Full Profile
                  </button>
                )}
              </div>
            </div>
          ) : userElement ? (
            <div className="p-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: elementPositions[userElement as keyof typeof elementPositions]?.color + '20' }}
                >
                  <Sparkles 
                    className="w-8 h-8" 
                    style={{ color: elementPositions[userElement as keyof typeof elementPositions]?.color }}
                  />
                </div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">
                  {getElementData(userElement)?.name} Element
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {elementPositions[userElement as keyof typeof elementPositions]?.season} Season
                </p>
                <p className="text-sm text-gray-600">
                  Hover over the wheel segments to explore subtypes, or take the subtype quiz to find your exact position.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 hover:bg-gray-200">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">Discover Your Type</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Hover over the wheel to explore the 16 elemental subtypes. Take the quiz to find where you belong in the cycle.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Results Section - Prominent CTA */}
      {(userElement || userSubtype) && (
        <div className="mt-10 max-w-xl mx-auto">
          <div 
            className="relative overflow-hidden rounded-2xl p-6 text-center"
            style={{ 
              background: `linear-gradient(135deg, ${colorThemes[selectedTheme].primary}15, ${colorThemes[selectedTheme].primary}30)` 
            }}
          >
            {/* Decorative elements */}
            <div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: colorThemes[selectedTheme].primary }}
            />
            <div 
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ backgroundColor: colorThemes[selectedTheme].primary }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Share2 className="w-5 h-5" style={{ color: colorThemes[selectedTheme].primary }} />
                <h3 className="font-semibold text-gray-900">Share Your Wheel Position</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Create a beautiful shareable card showing your position on the Elemental Color Wheel with your chosen {colorThemes[selectedTheme].name} theme
              </p>
              <button
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: colorThemes[selectedTheme].primary }}
              >
                <Share2 className="w-5 h-5" />
                Share on Social Media
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend with staggered animation */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {elementalTypes.map((element, idx) => (
          <div 
            key={element.id} 
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.4s ease ${0.8 + idx * 0.1}s, transform 0.4s ease ${0.8 + idx * 0.1}s`
            }}
            onMouseEnter={() => {
              setHoveredElement(element.id);
              if (!isAutoRotating) {
                setSeasonalFlowActive(true);
              }
            }}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div 
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                hoveredElement === element.id ? 'scale-125' : ''
              }`}
              style={{ backgroundColor: applyThemeToColor(element.colors[0].hex, selectedTheme) }}
            />
            <span className={`text-sm transition-colors duration-200 ${
              hoveredElement === element.id ? 'text-gray-900 font-medium' : 'text-gray-600'
            }`}>
              {element.name} ({element.season})
            </span>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      <WheelShareCard
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        userElement={userElement || null}
        userSubtype={userSubtype || null}
        selectedTheme={selectedTheme}
      />
    </div>
  );
};

export default ElementalColorWheel;
