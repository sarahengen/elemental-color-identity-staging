import React, { useRef, useState, useEffect } from 'react';
import { 
  Share2, 
  Download, 
  X, 
  Copy, 
  Check,
  Sparkles,
  ExternalLink,
  Link2
} from 'lucide-react';
import { elementalTypes, ElementalType, ElementalSubtype } from '@/data/elementalTypes';
import { toast } from '@/components/ui/use-toast';

// Color theme definitions (matching ElementalColorWheel)
const colorThemes = {
  original: { name: 'Original', primary: '#C41E3A', description: 'Default elemental color identity' },
  blue: { name: 'Blue', primary: '#2563EB', description: 'Cool ocean tones' },
  red: { name: 'Red', primary: '#DC2626', description: 'Warm fire tones' },
  green: { name: 'Green', primary: '#16A34A', description: 'Natural earth tones' },
  purple: { name: 'Purple', primary: '#9333EA', description: 'Royal mystical tones' },
  yellow: { name: 'Yellow', primary: '#EAB308', description: 'Sunny warm tones' },
  pink: { name: 'Pink', primary: '#EC4899', description: 'Soft romantic tones' }
};

type ColorTheme = keyof typeof colorThemes;

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

const applyThemeToColor = (hex: string, theme: ColorTheme): string => {
  if (theme === 'original') return hex;
  
  const hsl = hexToHSL(hex);
  const targetHue = themeHueShifts[theme];
  
  const hueVariation = (hsl.h % 60) - 30;
  const newHue = (targetHue + hueVariation + 360) % 360;
  
  return hslToHex(newHue, Math.min(hsl.s * 1.1, 100), hsl.l);
};

// Social media icons as SVG components
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

interface WheelShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  userElement: string | null;
  userSubtype: string | null;
  selectedTheme: ColorTheme;
  userName?: string;
}

const WheelShareCard: React.FC<WheelShareCardProps> = ({
  isOpen,
  onClose,
  userElement,
  userSubtype,
  selectedTheme,
  userName
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Get element and subtype data
  const elementData = elementalTypes.find(e => e.id === userElement);
  const subtypeData = userSubtype ? (() => {
    for (const element of elementalTypes) {
      const subtype = element.subtypes.find(s => s.id === userSubtype);
      if (subtype) return { element, subtype };
    }
    return null;
  })() : null;

  const displayName = subtypeData?.subtype.name || elementData?.name || 'Unknown';
  const seasonalName = subtypeData?.subtype.seasonalName || elementData?.season || '';
  const elementName = elementData?.name || '';

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = `I discovered my position on the Elemental Color Wheel! I'm a ${displayName} (${elementName} Element). My wheel theme: ${colorThemes[selectedTheme].name}. Discover your colors too!`;

  // Element positions for the mini wheel
  const elementPositions = {
    fire: { angle: -90, color: applyThemeToColor('#C41E3A', selectedTheme) },
    air: { angle: 0, color: applyThemeToColor('#FF7F50', selectedTheme) },
    water: { angle: 90, color: applyThemeToColor('#6B8BA4', selectedTheme) },
    earth: { angle: 180, color: applyThemeToColor('#CC4E3E', selectedTheme) }
  };

  // Get all subtypes for the wheel
  const getAllSubtypes = () => {
    const subtypes: { id: string; element: string; color: string }[] = [];
    const elementOrder = ['fire', 'air', 'water', 'earth'];
    
    elementOrder.forEach(elementId => {
      const element = elementalTypes.find(e => e.id === elementId);
      if (element) {
        element.subtypes.forEach(s => {
          subtypes.push({
            id: s.id,
            element: elementId,
            color: applyThemeToColor(s.colors[0]?.hex || '#888', selectedTheme)
          });
        });
      }
    });
    
    return subtypes;
  };

  const allSubtypes = getAllSubtypes();
  const anglePerSubtype = 360 / allSubtypes.length;

  // Find user's position on the wheel
  const userSubtypeIndex = allSubtypes.findIndex(s => s.id === userSubtype);
  const userAngle = userSubtypeIndex >= 0 ? -90 + (userSubtypeIndex * anglePerSubtype) + (anglePerSubtype / 2) : 0;

  const getPosition = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  };

  // Share URLs
  const getTwitterShareUrl = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  };

  const getFacebookShareUrl = () => {
    const url = encodeURIComponent(shareUrl);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(shareText)}`;
  };

  const getPinterestShareUrl = () => {
    const url = encodeURIComponent(shareUrl);
    const description = encodeURIComponent(`${displayName} - ${elementName} Element - Elemental Color Wheel Result - ${colorThemes[selectedTheme].name} Theme`);
    return `https://pinterest.com/pin/create/button/?url=${url}&description=${description}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast({ title: 'Link copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `elemental-wheel-${displayName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast({ title: 'Image downloaded!' });
    } catch (err) {
      console.error('Error generating image:', err);
      toast({ title: 'Failed to download image', variant: 'destructive' });
    } finally {
      setDownloading(false);
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
  };

  if (!isOpen) return null;

  const centerX = 120;
  const centerY = 120;
  const outerRadius = 100;
  const innerRadius = 55;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: colorThemes[selectedTheme].primary }}
            >
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-serif text-gray-900">Share Your Wheel Position</h2>
              <p className="text-sm text-gray-500">Share your elemental color wheel results</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
          {/* Preview Card */}
          <div className="flex justify-center mb-6">
            <div
              ref={cardRef}
              className="w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-xl relative"
              style={{ 
                background: `linear-gradient(135deg, ${colorThemes[selectedTheme].primary}15, ${colorThemes[selectedTheme].primary}30)` 
              }}
            >
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, ${colorThemes[selectedTheme].primary} 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 20%, ${colorThemes[selectedTheme].primary} 0%, transparent 50%)`
                }}
              />

              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col p-5">
                {/* Header */}
                <div className="text-center mb-2">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4" style={{ color: colorThemes[selectedTheme].primary }} />
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Elemental Color Wheel
                    </span>
                    <Sparkles className="w-4 h-4" style={{ color: colorThemes[selectedTheme].primary }} />
                  </div>
                  <p className="text-xs text-gray-400">
                    {userName ? `${userName}'s Position` : 'My Position'}
                  </p>
                </div>

                {/* Mini Wheel */}
                <div className="flex-1 flex items-center justify-center">
                  <svg width="240" height="240" viewBox="0 0 240 240">
                    <defs>
                      <filter id="wheelGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Draw segments */}
                    {allSubtypes.map((subtype, index) => {
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

                      const isUserSubtype = userSubtype === subtype.id;

                      const path = `
                        M ${x1Inner} ${y1Inner}
                        L ${x1Outer} ${y1Outer}
                        A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}
                        L ${x2Inner} ${y2Inner}
                        A ${innerRadius} ${innerRadius} 0 0 0 ${x1Inner} ${y1Inner}
                      `;

                      return (
                        <path
                          key={subtype.id}
                          d={path}
                          fill={subtype.color}
                          stroke="white"
                          strokeWidth={isUserSubtype ? 2 : 0.5}
                          opacity={isUserSubtype ? 1 : 0.85}
                        />
                      );
                    })}

                    {/* Inner circle */}
                    <circle 
                      cx={centerX} 
                      cy={centerY} 
                      r={innerRadius - 3} 
                      fill="white"
                    />

                    {/* Element labels */}
                    {Object.entries(elementPositions).map(([elementId, pos]) => {
                      const labelPos = getPosition(pos.angle, 35);
                      const element = elementalTypes.find(e => e.id === elementId);
                      const isUserElement = userElement === elementId;
                      
                      return (
                        <text
                          key={elementId}
                          x={centerX + labelPos.x}
                          y={centerY + labelPos.y + 4}
                          textAnchor="middle"
                          className={`text-[9px] ${isUserElement ? 'font-bold' : 'font-medium'}`}
                          fill={isUserElement ? pos.color : '#374151'}
                        >
                          {element?.name}
                        </text>
                      );
                    })}

                    {/* User position marker */}
                    {userSubtypeIndex >= 0 && (
                      <g>
                        {/* Pulsing outer ring */}
                        <circle
                          cx={centerX + getPosition(userAngle, (outerRadius + innerRadius) / 2).x}
                          cy={centerY + getPosition(userAngle, (outerRadius + innerRadius) / 2).y}
                          r={14}
                          fill="none"
                          stroke={allSubtypes[userSubtypeIndex]?.color || '#888'}
                          strokeWidth={2}
                          opacity={0.5}
                        >
                          <animate
                            attributeName="r"
                            values="14;18;14"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.5;0.2;0.5"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        {/* Main marker */}
                        <circle
                          cx={centerX + getPosition(userAngle, (outerRadius + innerRadius) / 2).x}
                          cy={centerY + getPosition(userAngle, (outerRadius + innerRadius) / 2).y}
                          r={10}
                          fill="white"
                          stroke={allSubtypes[userSubtypeIndex]?.color || '#888'}
                          strokeWidth={3}
                          filter="url(#wheelGlow)"
                        />
                        {/* Inner dot */}
                        <circle
                          cx={centerX + getPosition(userAngle, (outerRadius + innerRadius) / 2).x}
                          cy={centerY + getPosition(userAngle, (outerRadius + innerRadius) / 2).y}
                          r={5}
                          fill={allSubtypes[userSubtypeIndex]?.color || '#888'}
                        />
                      </g>
                    )}
                  </svg>
                </div>

                {/* Type Info */}
                <div className="text-center mt-2">
                  <h3 className="font-serif text-2xl text-gray-900 mb-1">{displayName}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {elementName} Element • {seasonalName}
                  </p>
                  
                  {/* Theme Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 shadow-sm">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorThemes[selectedTheme].primary }}
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {colorThemes[selectedTheme].name} Theme
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-3 pt-3 border-t border-gray-200/50 flex items-center justify-center">
                  <span className="text-[10px] text-gray-400">
                    elementalcoloridentity.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Download Button */}
            <button
              onClick={downloadAsImage}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span className="font-medium">
                {downloading ? 'Generating...' : 'Download Image'}
              </span>
            </button>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => openShareWindow(getTwitterShareUrl())}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <TwitterIcon />
                <span className="text-xs font-medium">X</span>
              </button>
              
              <button
                onClick={() => openShareWindow(getFacebookShareUrl())}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors"
              >
                <FacebookIcon />
                <span className="text-xs font-medium">Facebook</span>
              </button>
              
              <button
                onClick={() => openShareWindow(getPinterestShareUrl())}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-[#E60023] text-white rounded-xl hover:bg-[#D50C22] transition-colors"
              >
                <PinterestIcon />
                <span className="text-xs font-medium">Pinterest</span>
              </button>
              
              <button
                onClick={copyToClipboard}
                className="flex flex-col items-center justify-center gap-1.5 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Link2 className="w-5 h-5" />}
                <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Native Share (mobile) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: `My Elemental Color Wheel Position: ${displayName}`,
                      text: shareText,
                      url: shareUrl
                    });
                  } catch (err) {
                    // User cancelled
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">More Sharing Options</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelShareCard;
