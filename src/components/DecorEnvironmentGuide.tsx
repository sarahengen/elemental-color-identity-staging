import React, { useState } from 'react';
import { elementalTypes, ElementalType, ElementalSubtype } from '@/data/elementalTypes';
import { elementalDecorData, getDecorData, DecorEnvironment, ElementDecorData } from '@/data/decorData';
import { 
  Home, 
  Palette, 
  Lamp, 
  Sofa, 
  Flower2, 
  Frame, 
  Sparkles, 
  ChevronDown, 
  ChevronRight,
  Check,
  X,
  Lightbulb,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

interface DecorEnvironmentGuideProps {
  userElement?: string | null;
  userSubtype?: string | null;
  onStartQuiz?: () => void;
  embedInGuideHub?: boolean;
}

const DecorEnvironmentGuide: React.FC<DecorEnvironmentGuideProps> = ({
  userElement,
  userSubtype,
  onStartQuiz,
  embedInGuideHub = false,
}) => {
  const [selectedElement, setSelectedElement] = useState<string>(userElement || 'fire');
  const [selectedSubtype, setSelectedSubtype] = useState<string>(userSubtype || 'fire-fire');
  const [expandedSections, setExpandedSections] = useState<string[]>(['colorScheme', 'furniture', 'lighting']);

  // Get the current element and subtype data
  const currentElementData = elementalDecorData.find(e => e.elementId === selectedElement);
  const currentSubtypeData = currentElementData?.subtypes.find(s => s.subtypeId === selectedSubtype);
  const decorData = currentSubtypeData?.decor;

  // Get elemental type for colors
  const elementType = elementalTypes.find(e => e.id === selectedElement);
  const subtypeInfo = elementType?.subtypes.find(s => s.id === selectedSubtype);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleElementChange = (elementId: string) => {
    setSelectedElement(elementId);
    // Set to first subtype of the element
    const element = elementalDecorData.find(e => e.elementId === elementId);
    if (element && element.subtypes.length > 0) {
      setSelectedSubtype(element.subtypes[0].subtypeId);
    }
  };

  // Helper function to check if a color is too light
  const isColorTooLight = (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.7; // If luminance is above 0.7, it's too light
  };

  // Get a suitable display color from the palette (skip colors that are too light)
  const getDisplayColor = (colors: { hex: string }[] | undefined, fallback: string): string => {
    if (!colors || colors.length === 0) return fallback;
    
    // Try to find a color that's not too light
    for (const color of colors) {
      if (!isColorTooLight(color.hex)) {
        return color.hex;
      }
    }
    // If all colors are too light, return a darker fallback based on element
    return fallback;
  };

  // Get appropriate colors for display (avoiding too-light colors)
  const elementFallbackColors: Record<string, string> = {
    'fire': '#C41E3A', // True Red
    'water': '#6B8BA4', // Dusty Blue
    'earth': '#CC4E3E', // Terracotta
    'air': '#FF7F50' // Coral
  };

  const primaryColor = getDisplayColor(subtypeInfo?.colors, elementFallbackColors[selectedElement] || '#6B7280');
  const secondaryColor = getDisplayColor(
    subtypeInfo?.colors?.slice(1), // Skip first color for secondary
    subtypeInfo?.colors?.[1]?.hex || elementType?.colors[1]?.hex || '#9CA3AF'
  );

  const SectionHeader: React.FC<{ 
    title: string; 
    icon: React.ReactNode; 
    sectionKey: string;
    color: string;
  }> = ({ title, icon, sectionKey, color }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="font-medium text-gray-900">{title}</span>
      </div>
      {expandedSections.includes(sectionKey) ? (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );



  if (!decorData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No decor data available for this selection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
            <Home className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">Interior Design Guide</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Your Ideal Environment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect decor, colors, and atmosphere that align with your elemental energy. 
            Create a space that nurtures and reflects your true nature.
          </p>
        </div>
      )}

      {/* Element Selection */}
      <div className="flex flex-wrap justify-center gap-3">
        {elementalDecorData.map((element) => {
          const elType = elementalTypes.find(e => e.id === element.elementId);
          const isSelected = selectedElement === element.elementId;
          const isUserElement = userElement === element.elementId;
          
          return (
            <button
              key={element.elementId}
              onClick={() => handleElementChange(element.elementId)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all ${
                isSelected 
                  ? 'text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              style={isSelected ? { 
                backgroundColor: elType?.colors[0]?.hex,
                boxShadow: `0 4px 14px ${elType?.colors[0]?.hex}40`
              } : {}}
            >
              {element.elementName}
              {isUserElement && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtype Selection */}
      {currentElementData && (
        <div className="flex flex-wrap justify-center gap-2">
          {currentElementData.subtypes.map((subtype) => {
            const isSelected = selectedSubtype === subtype.subtypeId;
            const isUserSubtype = userSubtype === subtype.subtypeId;
            
            return (
              <button
                key={subtype.subtypeId}
                onClick={() => setSelectedSubtype(subtype.subtypeId)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subtype.subtypeName}
                {isUserSubtype && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Hero Image and Overview */}
      <div className="relative rounded-2xl overflow-hidden">
        <img 
          src={currentElementData?.image} 
          alt={`${currentElementData?.elementName} decor`}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
            {currentSubtypeData?.subtypeName}
          </h3>
          <p className="text-white/90 max-w-2xl">
            {decorData.overview}
          </p>
        </div>
      </div>

      {/* Atmosphere & Mood */}
      <div 
        className="rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: `${primaryColor}10` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Sun className="w-6 h-6" style={{ color: primaryColor }} />
          </div>
          <div>
            <h4 className="text-xl font-serif text-gray-900">Atmosphere</h4>
            <p className="text-sm text-gray-500">The feeling your space should evoke</p>
          </div>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {decorData.atmosphere}
        </p>
        <div className="flex flex-wrap gap-2">
          {decorData.moodKeywords.map((keyword, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${primaryColor}15`,
                color: primaryColor
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Room Styles */}
      <div className="grid md:grid-cols-3 gap-4">
        {decorData.roomStyles.map((style, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <Home className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <h5 className="font-medium text-gray-900 mb-2">{style.name}</h5>
            <p className="text-sm text-gray-600">{style.description}</p>
          </div>
        ))}
      </div>

      {/* Color Scheme Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Color Scheme" 
          icon={<Palette className="w-5 h-5" />}
          sectionKey="colorScheme"
          color={primaryColor}
        />
        {expandedSections.includes('colorScheme') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
            {/* Walls */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Wall Colors</h5>
              <div className="flex flex-wrap gap-3">
                {decorData.colorScheme.walls.map((color, idx) => {
                  const hex = color.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888';
                  const name = color.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, '');
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-sm text-gray-600">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Accents */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Accent Colors</h5>
              <div className="flex flex-wrap gap-3">
                {decorData.colorScheme.accents.map((color, idx) => {
                  const hex = color.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888';
                  const name = color.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, '');
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-sm text-gray-600">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Neutrals */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Neutral Colors</h5>
              <div className="flex flex-wrap gap-3">
                {decorData.colorScheme.neutrals.map((color, idx) => {
                  const hex = color.match(/#[A-Fa-f0-9]{6}/)?.[0] || '#888888';
                  const name = color.replace(/\s*\(#[A-Fa-f0-9]{6}\)/, '');
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-sm text-gray-600">{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Materials & Textures */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <Layers className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <h5 className="font-medium text-gray-900">Materials</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {decorData.materials.map((material, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${secondaryColor}15` }}
            >
              <Sparkles className="w-5 h-5" style={{ color: secondaryColor }} />
            </div>
            <h5 className="font-medium text-gray-900">Textures</h5>
          </div>
          <div className="flex flex-wrap gap-2">
            {decorData.textures.map((texture, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {texture}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lighting Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Lighting" 
          icon={<Lamp className="w-5 h-5" />}
          sectionKey="lighting"
          color={primaryColor}
        />
        {expandedSections.includes('lighting') && (
          <div className="grid md:grid-cols-3 gap-4">
            {decorData.lighting.map((light, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Lightbulb className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <h6 className="font-medium text-gray-900 mb-2">{light.type}</h6>
                <p className="text-sm text-gray-600">{light.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Furniture Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Furniture" 
          icon={<Sofa className="w-5 h-5" />}
          sectionKey="furniture"
          color={primaryColor}
        />
        {expandedSections.includes('furniture') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {decorData.furniture.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            {decorData.furniture.tip && (
              <div 
                className="p-4 rounded-lg flex items-start gap-3"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <p className="text-sm" style={{ color: primaryColor }}>{decorData.furniture.tip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Textiles Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Textiles" 
          icon={<Layers className="w-5 h-5" />}
          sectionKey="textiles"
          color={secondaryColor}
        />
        {expandedSections.includes('textiles') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {decorData.textiles.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            {decorData.textiles.tip && (
              <div 
                className="p-4 rounded-lg flex items-start gap-3"
                style={{ backgroundColor: `${secondaryColor}10` }}
              >
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: secondaryColor }} />
                <p className="text-sm" style={{ color: secondaryColor }}>{decorData.textiles.tip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decorative Accents Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Decorative Accents" 
          icon={<Frame className="w-5 h-5" />}
          sectionKey="accents"
          color={primaryColor}
        />
        {expandedSections.includes('accents') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {decorData.accents.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            {decorData.accents.tip && (
              <div 
                className="p-4 rounded-lg flex items-start gap-3"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                <p className="text-sm" style={{ color: primaryColor }}>{decorData.accents.tip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plants Section */}
      <div className="space-y-4">
        <SectionHeader 
          title="Plants & Nature" 
          icon={<Flower2 className="w-5 h-5" />}
          sectionKey="plants"
          color="#22C55E"
        />
        {expandedSections.includes('plants') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {decorData.plants.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Flower2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            {decorData.plants.tip && (
              <div className="p-4 rounded-lg flex items-start gap-3 bg-green-50">
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" />
                <p className="text-sm text-green-700">{decorData.plants.tip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Art Style */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <Frame className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <h5 className="font-medium text-gray-900">Art Styles to Consider</h5>
        </div>
        <div className="flex flex-wrap gap-2">
          {decorData.artStyle.map((style, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${primaryColor}10`,
                color: primaryColor
              }}
            >
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* What to Avoid */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-100">
            <X className="w-5 h-5 text-red-600" />
          </div>
          <h5 className="font-medium text-gray-900">What to Avoid</h5>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {decorData.avoidList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA for users without a type */}
      {!userElement && onStartQuiz && (
        <div className="text-center py-8">
          <div 
            className="inline-block p-8 rounded-2xl"
            style={{ backgroundColor: `${primaryColor}10` }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: primaryColor }} />
            <h4 className="text-xl font-serif text-gray-900 mb-2">
              Discover Your Perfect Environment
            </h4>
            <p className="text-gray-600 mb-6 max-w-md">
              Take the quiz to find your elemental type and get personalized decor recommendations 
              tailored to your unique energy.
            </p>
            <button
              onClick={onStartQuiz}
              className="px-8 py-3 rounded-full font-medium text-white transition-all hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Take the Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecorEnvironmentGuide;
