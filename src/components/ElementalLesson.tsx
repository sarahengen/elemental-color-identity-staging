import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronDown, GraduationCap, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

interface ElementalLessonProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface LessonData {
  subtypeName: string;
  lesson: string;
}

interface ElementData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  lightBg: string;
  subtypes: {
    id: string;
    name: string;
    data: LessonData;
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
    lightBg: 'bg-orange-50',
    subtypes: [
      {
        id: 'fire-fire',
        name: 'Fire + Fire',
        data: {
          subtypeName: 'The Electric Arc',
          lesson: 'must learn to temper lightning with compassion.'
        }
      },
      {
        id: 'fire-water',
        name: 'Fire + Water',
        data: {
          subtypeName: 'The Blue Flame',
          lesson: 'must learn to thaw its core without flooding.'
        }
      },
      {
        id: 'fire-earth',
        name: 'Fire + Earth',
        data: {
          subtypeName: 'The Forged Iron',
          lesson: 'must learn to soften its grip without losing strength.'
        }
      },
      {
        id: 'fire-air',
        name: 'Fire + Air',
        data: {
          subtypeName: 'The Illuminating Spark',
          lesson: 'must learn to burn steadily, not just brightly.'
        }
      },
    ],
  },
  {
    id: 'water',
    name: 'Water',
    icon: <Droplets className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    lightBg: 'bg-blue-50',
    subtypes: [
      {
        id: 'water-air',
        name: 'Water + Air',
        data: {
          subtypeName: 'The Misty Shore',
          lesson: 'must learn to feel without dissolving.'
        }
      },
      {
        id: 'water-water',
        name: 'Water + Water',
        data: {
          subtypeName: 'The Forest Lake',
          lesson: 'must learn to stir its depths without muddying.'
        }
      },
      {
        id: 'water-fire',
        name: 'Water + Fire',
        data: {
          subtypeName: 'The Sun-Dappled Pond',
          lesson: 'must learn to reflect light, not just memory.'
        }
      },
      {
        id: 'water-earth',
        name: 'Water + Earth',
        data: {
          subtypeName: 'The Languid River',
          lesson: 'must learn to nourish its own banks.'
        }
      },
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    icon: <Mountain className="w-6 h-6" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
    lightBg: 'bg-emerald-50',
    subtypes: [
      {
        id: 'earth-fire',
        name: 'Earth + Fire',

        data: {
          subtypeName: 'The Mountain Stone',
          lesson: 'must learn to weather without eroding.'
        }
      },
      {
        id: 'earth-earth',
        name: 'Earth + Earth',
        data: {
          subtypeName: 'The Forest Floor',
          lesson: 'must learn to decay without clinging.'
        }
      },
      {
        id: 'earth-water',
        name: 'Earth + Water',
        data: {
          subtypeName: 'The Velvet Moss',
          lesson: 'must learn to grow beyond its comfort.'
        }
      },
      {
        id: 'earth-air',
        name: 'Earth + Air',

        data: {
          subtypeName: 'The Golden Harvest',
          lesson: 'must learn to feast without hoarding.'
        }
      },
    ],
  },
  {
    id: 'air',
    name: 'Air',
    icon: <Wind className="w-6 h-6" />,
    color: 'text-sky-600',
    bgColor: 'bg-sky-100',
    borderColor: 'border-sky-300',
    lightBg: 'bg-sky-50',
    subtypes: [
      {
        id: 'air-air',
        name: 'Air + Air',
        data: {
          subtypeName: 'The Clear Morning Sky',
          lesson: 'must learn clarity without coldness.'
        }
      },
      {
        id: 'air-fire',
        name: 'Air + Fire',
        data: {
          subtypeName: 'The Playful Breeze',
          lesson: 'must learn connection without scattering.'
        }
      },
      {
        id: 'air-earth',
        name: 'Air + Earth',
        data: {
          subtypeName: 'The Gilded Zephyr',
          lesson: 'must learn to speak and listen in equal measure.'
        }
      },
      {
        id: 'air-water',
        name: 'Air + Water',
        data: {
          subtypeName: 'The First Whisper',
          lesson: 'must learn to be heard without shouting.'
        }
      },
    ],
  },
];

const ElementalLesson: React.FC<ElementalLessonProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
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

  const isUserSubtype = (subtypeId: string) => {
    if (!userElement || !userSubtype) return false;
    return subtypeId === `${userElement}-${userSubtype}`;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 rounded-3xl p-8 md:p-12">
      {!embedInGuideHub && (
        <div className="text-center mb-10">
          {/* Lesson Graphic - Book with Light */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl shadow-lg flex items-center justify-center border border-indigo-200">
                <div className="relative">
                  <BookOpen className="w-14 h-14 text-indigo-500" />
                  <div className="absolute -top-3 -right-3">
                    <div className="relative">
                      <Lightbulb className="w-8 h-8 text-amber-500" />
                      <div className="absolute inset-0 animate-pulse">
                        <Lightbulb className="w-8 h-8 text-amber-400 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative sparkles */}
              <Sparkles className="absolute -top-2 -left-2 w-5 h-5 text-violet-400" />
              <Sparkles className="absolute -bottom-1 -right-1 w-4 h-4 text-indigo-400" />
            </div>
          </div>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto italic">
            "The journey for each subtype is to master their primary resonance, so they aren't neutral but integrated, vibrant, and sustainable."
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
          <h3 className={`text-2xl font-serif ${currentElement.color} mb-2`}>
            {currentElement.name} Element
          </h3>
        </div>

        {/* Subtype Dropdown */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
            Select a subtype to reveal its lesson:
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

        {/* Lesson Display */}
        {selectedSubtypeData && (
          <div className="mt-8 animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="text-center">
                {/* Subtype Name with Icon */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full ${currentElement.bgColor} flex items-center justify-center`}>
                    <GraduationCap className={`w-6 h-6 ${currentElement.color}`} />
                  </div>
                </div>
                
                {/* The Lesson */}
                <p className={`text-sm font-medium ${currentElement.color} mb-4`}>
                  {selectedSubtypeData.name}
                </p>
                <p className="text-2xl md:text-3xl font-serif text-gray-900 leading-relaxed">
                  <span className={`${currentElement.color} font-semibold`}>{selectedSubtypeData.data.subtypeName}</span>
                  <br />
                  <span className="text-gray-700">{selectedSubtypeData.data.lesson}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prompt when no subtype selected */}
        {!selectedSubtypeData && (
          <div className="mt-8 text-center">
            <div className="bg-white/50 rounded-2xl p-6 border border-white/30">
              <p className="text-gray-500 italic">
                Select a subtype above to reveal its elemental lesson
              </p>
            </div>
          </div>
        )}
      </div>

      {/* User's Lesson Highlight */}
      {userElement && userSubtype && (
        <div className="mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Your Personal Lesson</p>
            {(() => {
              const userElementData = elementsData.find(e => e.id === userElement);
              const userSubtypeDataFound = userElementData?.subtypes.find(s => s.id === `${userElement}-${userSubtype}`);
              if (userSubtypeDataFound && userElementData) {
                return (
                  <div className={`${userElementData.bgColor} rounded-2xl p-6 border-2 ${userElementData.borderColor}`}>
                    <p className={`text-sm font-medium ${userElementData.color} mb-3`}>
                      {userSubtypeDataFound.name}
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-gray-900">
                      <span className={`${userElementData.color} font-semibold`}>{userSubtypeDataFound.data.subtypeName}</span>
                      {' '}
                      <span className="text-gray-700">{userSubtypeDataFound.data.lesson}</span>
                    </p>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        </div>
      )}

      {/* Closing Wisdom */}
      <div className="mt-10 text-center">
        <div className="bg-gradient-to-r from-indigo-100 via-violet-100 to-purple-100 rounded-2xl p-6 md:p-8 border border-indigo-200">
          <Sparkles className="w-8 h-8 mx-auto text-violet-500 mb-4" />
          <p className="text-gray-700 text-lg md:text-xl font-serif italic leading-relaxed max-w-3xl mx-auto">
            "Ultimately, each subtype must learn to embody its essence without being imprisoned by it, achieving wholeness by integrating the wisdom of its complementary opposite."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElementalLesson;
