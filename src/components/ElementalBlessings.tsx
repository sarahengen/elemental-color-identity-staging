import React, { useState } from 'react';
import { Heart, Flame, Droplets, Mountain, Wind, ChevronDown, Sparkles } from 'lucide-react';

interface ElementalBlessingsProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface ElementData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  subtypes: {
    id: string;
    name: string;
    blessing: string;
  }[];
}

const elementsData: ElementData[] = [
  {
    id: 'fire',
    name: 'Fire',
    icon: <Flame className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    subtypes: [
      { id: 'fire-fire', name: 'Fire + Fire', blessing: 'blesses by cutting through illusion.' },
      { id: 'fire-water', name: 'Fire + Water', blessing: 'blesses by transmuting in stillness.' },
      { id: 'fire-earth', name: 'Fire + Earth', blessing: 'blesses by providing unbreakable support.' },
      { id: 'fire-air', name: 'Fire + Air', blessing: 'blesses by igniting creative joy.' },
    ],
  },
  {
    id: 'water',
    name: 'Water',
    icon: <Droplets className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    subtypes: [
      { id: 'water-air', name: 'Water + Air', blessing: 'blesses by softening all harshness.' },
      { id: 'water-water', name: 'Water + Water', blessing: 'blesses by reflecting deep truth.' },
      { id: 'water-fire', name: 'Water + Fire', blessing: 'blesses by warming memory into wisdom.' },
      { id: 'water-earth', name: 'Water + Earth', blessing: 'blesses by carrying life forward.' },
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    icon: <Mountain className="w-6 h-6" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
    subtypes: [
      { id: 'earth-fire', name: 'Earth + Fire', blessing: 'blesses by witnessing with dignity.' },
      { id: 'earth-earth', name: 'Earth + Earth', blessing: 'blesses by composting death into life.' },
      { id: 'earth-water', name: 'Earth + Water', blessing: 'blesses by offering sacred comfort.' },
      { id: 'earth-air', name: 'Earth + Air', blessing: 'blesses by celebrating manifested abundance.' },
    ],
  },
  {
    id: 'air',
    name: 'Air',
    icon: <Wind className="w-6 h-6" />,
    color: 'text-sky-600',
    bgColor: 'bg-sky-100',
    borderColor: 'border-sky-300',
    subtypes: [
      { id: 'air-air', name: 'Air + Air', blessing: 'blesses by revealing lucid structure.' },
      { id: 'air-fire', name: 'Air + Fire', blessing: 'blesses by weaving serendipitous connection.' },
      { id: 'air-earth', name: 'Air + Earth', blessing: 'The Gilded Zephyr blesses by inspiring collective hope.' },
      { id: 'air-water', name: 'Air + Water', blessing: 'The First Whisper blesses by channeling the nascent possible.' },
    ],
  },
];

const ElementalBlessings: React.FC<ElementalBlessingsProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  // Set initial selected element based on user's element or default to fire
  const initialElement = userElement || 'fire';
  const [selectedElement, setSelectedElement] = useState<string>(initialElement);
  const [selectedSubtype, setSelectedSubtype] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentElement = elementsData.find(e => e.id === selectedElement) || elementsData[0];

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId);
    setSelectedSubtype('');
    setIsDropdownOpen(false);
  };

  const handleSubtypeSelect = (subtypeId: string) => {
    setSelectedSubtype(subtypeId);
    setIsDropdownOpen(false);
  };

  const selectedSubtypeData = currentElement.subtypes.find(s => s.id === selectedSubtype);

  // Check if user's subtype matches current selection
  const isUserSubtype = (subtypeId: string) => {
    if (!userElement || !userSubtype) return false;
    return subtypeId === `${userElement}-${userSubtype}`;
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 rounded-3xl p-8 md:p-12">
      {!embedInGuideHub && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm mb-4">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">Sacred Blessings</span>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto italic">
            "When you are fully realized and "in your element" you bless and contribute to the whole."
          </p>
        </div>
      )}

      {/* Element Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {elementsData.map((element) => {
          const isSelected = selectedElement === element.id;
          const isUserElement = userElement === element.id;
          
          return (
            <button
              key={element.id}
              onClick={() => handleElementSelect(element.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${isSelected 
                  ? `${element.bgColor} ${element.color} ${element.borderColor} border-2 shadow-md scale-105` 
                  : 'bg-white/80 text-gray-600 border-2 border-transparent hover:bg-white hover:shadow-sm'
                }
                ${isUserElement && !isSelected ? 'ring-2 ring-offset-2 ring-amber-400' : ''}
              `}
            >
              <span className={isSelected ? element.color : 'text-gray-500'}>
                {element.icon}
              </span>
              <span>{element.name}</span>
              {isUserElement && (
                <span className="ml-1 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs rounded-full font-semibold">
                  You
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Element Info */}
      <div className={`${currentElement.bgColor} rounded-2xl p-6 md:p-8 mb-6 border-2 ${currentElement.borderColor}`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <span className={currentElement.color}>{currentElement.icon}</span>
            <h3 className={`text-2xl font-serif ${currentElement.color}`}>
              {currentElement.name} Blessings
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Discover how each {currentElement.name.toLowerCase()} subtype blesses the world
          </p>
        </div>

        {/* Subtype Dropdown */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
            Select a subtype to reveal its blessing:
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border-2 
                ${selectedSubtype ? currentElement.borderColor : 'border-gray-200'} 
                hover:border-gray-300 transition-colors shadow-sm
              `}
            >
              <span className={selectedSubtype ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                {selectedSubtypeData ? selectedSubtypeData.name : 'Choose a subtype...'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                {currentElement.subtypes.map((subtype) => {
                  const isUserSub = isUserSubtype(subtype.id);
                  return (
                    <button
                      key={subtype.id}
                      onClick={() => handleSubtypeSelect(subtype.id)}
                      className={`
                        w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                        ${selectedSubtype === subtype.id ? `${currentElement.bgColor} ${currentElement.color}` : 'text-gray-700'}
                        ${isUserSub ? 'bg-amber-50' : ''}
                      `}
                    >
                      <span className="font-medium">{subtype.name}</span>
                      {isUserSub && (
                        <span className="px-2 py-0.5 bg-amber-400 text-amber-900 text-xs rounded-full font-semibold">
                          Your Type
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Blessing Display */}
        {selectedSubtypeData && (
          <div className="mt-8 text-center animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <p className={`text-sm font-medium ${currentElement.color} mb-3`}>
                {selectedSubtypeData.name}
              </p>
              <p className="text-2xl md:text-3xl font-serif text-gray-900 leading-relaxed">
                "{selectedSubtypeData.blessing}"
              </p>
            </div>
          </div>
        )}

        {/* Prompt when no subtype selected */}
        {!selectedSubtypeData && (
          <div className="mt-8 text-center">
            <div className="bg-white/50 rounded-2xl p-6 border border-white/30">
              <p className="text-gray-500 italic">
                Select a subtype above to reveal its sacred blessing
              </p>
            </div>
          </div>
        )}
      </div>

      {/* User's Blessing Highlight */}
      {userElement && userSubtype && (
        <div className="mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Your Personal Blessing</p>
            {(() => {
              const userElementData = elementsData.find(e => e.id === userElement);
              const userSubtypeData = userElementData?.subtypes.find(s => s.id === `${userElement}-${userSubtype}`);
              if (userSubtypeData && userElementData) {
                return (
                  <div className={`${userElementData.bgColor} rounded-2xl p-6 border-2 ${userElementData.borderColor}`}>
                    <p className={`text-sm font-medium ${userElementData.color} mb-2`}>
                      {userSubtypeData.name}
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-gray-900">
                      "{userSubtypeData.blessing}"
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElementalBlessings;
