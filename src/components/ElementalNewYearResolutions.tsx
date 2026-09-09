import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronDown, Calendar, Sparkles } from 'lucide-react';

interface ElementalNewYearResolutionsProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface ResolutionData {
  resolution: string;
  practice: string;
}

interface ElementData {
  id: string;
  name: string;
  theme: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  lightBg: string;
  subtypes: {
    id: string;
    name: string;
    data: ResolutionData;
  }[];
}

const elementsData: ElementData[] = [
  {
    id: 'fire',
    name: 'Fire',
    theme: 'To Burn Brighter & Cleaner',
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
          resolution: "I will make one less argument this year, and build one more undeniable proof.",
          practice: "Channel the need to be right into creating something so impeccably correct it silences debate—a flawless project, a masterful skill, an unimpeachable piece of work."
        }
      },
      {
        id: 'fire-water',
        name: 'Fire + Water',
        data: {
          resolution: "I will allow one thing to thaw, just a little, and share its warmth.",
          practice: "Choose one piece of hard-won wisdom or one intense passion, and express it in a slightly more accessible form—teach it, write about it, create art from it."
        }
      },
      {
        id: 'fire-earth',
        name: 'Fire + Earth',
        data: {
          resolution: "I will let one thing rest, so my strength can be applied elsewhere with greater precision.",
          practice: "Identify one burden, duty, or grudge you've been carrying out of sheer stubbornness, and ceremonially set it down. Reallocate that energy to a chosen legacy project."
        }
      },
      {
        id: 'fire-air',
        name: 'Fire + Air',
        data: {
          resolution: "I will build a hearth for my spark, not just scatter it.",
          practice: "Choose one creative joy (painting, music, comedy) and commit to a consistent practice or platform for it, turning sporadic sparks into a sustained, warming fire."
        }
      },
    ],
  },
  {
    id: 'water',
    name: 'Water',
    theme: 'To Flow Deeper & More Clearly',
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
          resolution: "I will draw one clear boundary in the sand, and defend it with gentleness.",
          practice: "Identify one relationship or situation where your empathy is being drained. Define a limit, communicate it softly but unambiguously, and practice maintaining it."
        }
      },
      {
        id: 'water-water',
        name: 'Water + Water',
        data: {
          resolution: "I will bring one treasure up from the depths and offer it to the light.",
          practice: "Select one profound insight, story, or piece of art from your private world, and share it with one trusted person or through one guarded creative outlet."
        }
      },
      {
        id: 'water-fire',
        name: 'Water + Fire',
        data: {
          resolution: "I will not just remember the past; I will invite it to dinner.",
          practice: "Revive one fading family tradition, recipe, or story. Host an evening centered around it, actively weaving that golden thread into the present."
        }
      },
      {
        id: 'water-earth',
        name: 'Water + Earth',
        data: {
          resolution: "I will dig one new channel for my care, leading directly to my own garden.",
          practice: "Institute one non-negotiable, nurturing ritual for yourself—a weekly bath, a quiet morning hour, a curated comfort—and protect it as diligently as you protect others."
        }
      },
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    theme: 'To Grow More Fertile & Resilient',
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
          resolution: "I will allow one new path to be carved up my side.",
          practice: "Choose one rigid opinion or principle and deliberately seek out the most compelling, intelligent counter-argument. Don't change your mind, but expand its foundation."
        }
      },
      {
        id: 'earth-earth',
        name: 'Earth + Earth',
        data: {
          resolution: "I will plant one thing that I may not live to see fully grown.",
          practice: "Start a long-term, physical legacy project: a tree, a perennial garden, teaching a durable craft to a younger person. Invest in a cycle beyond your own harvest."
        }
      },
      {
        id: 'earth-water',
        name: 'Earth + Water',
        data: {
          resolution: "I will let one beautiful, impractical thing thrive in my space.",
          practice: "Make room for one purely aesthetic, comforting, \"unproductive\" element in your home or routine—a flowering plant, a luxurious throw, five minutes of idle cloud gazing."
        }
      },
      {
        id: 'earth-air',
        name: 'Earth + Air',
        data: {
          resolution: "I will create one masterpiece and give it away.",
          practice: "Use your skill for abundance (cooking, crafting, arranging) to create something extraordinary not for sale or social credit, but as a pure, anonymous gift."
        }
      },
    ],
  },

  {
    id: 'air',
    name: 'Air',
    theme: 'To See Further & Connect Truer',
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
          resolution: "I will map one messy feeling with the precision of a star chart.",
          practice: "When a strong emotion arises, don't analyze it away. Instead, journal it with the detachment of a scientist: \"Trigger: X. Physiological response: Y. Underlying belief: Z.\""
        }
      },
      {
        id: 'air-fire',
        name: 'Air + Fire',
        data: {
          resolution: "I will follow one whimsical thread all the way to a finished tapestry.",
          practice: "Pick one of your many \"what if\" ideas and see it through to a complete, however small, creation—a finished short story, a built model, a produced podcast episode."
        }
      },
      {
        id: 'air-earth',
        name: 'Air + Earth',
        data: {
          resolution: "I will use my words to build one small, real thing.",
          practice: "Move from inspiration to institution. Use your persuasive warmth not just to motivate, but to actually found something—a club, a community initiative, a small business plan."
        }
      },
      {
        id: 'air-water',
        name: 'Air + Water',
        data: {
          resolution: "I will give one whisper a megaphone made of silence.",
          practice: "Choose one subtle intuition you often ignore and design a ritual to honor it (light a candle for it, create a symbol, spend 10 minutes in silence feeling its shape). Trust."
        }
      },
    ],
  },
];

const ElementalNewYearResolutions: React.FC<ElementalNewYearResolutionsProps> = ({
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
    <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 rounded-3xl p-8 md:p-12">
      {!embedInGuideHub && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">New Year's Resolutions</span>
          </div>
          
          {/* January 1st Graphic */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-28 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs font-bold py-1.5 text-center uppercase tracking-wider">
                  January
                </div>
                <div className="flex items-center justify-center h-20">
                  <span className="text-5xl font-bold text-gray-800">1</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto italic">
            "A true resolution for a subtype isn't about fixing a flaw, but channeling their core energy more deliberately, beautifully, and sustainably into the world."
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
            {currentElement.name} — {currentElement.theme}
          </h3>
        </div>

        {/* Subtype Dropdown */}
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
            Select a subtype to reveal its resolution:
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

        {/* Resolution Display */}
        {selectedSubtypeData && (
          <div className="mt-8 animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
              <p className={`text-sm font-medium ${currentElement.color} mb-4 text-center`}>
                {selectedSubtypeData.name}
              </p>
              
              {/* The Resolution */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full ${currentElement.bgColor} flex items-center justify-center`}>
                    <Sparkles className={`w-4 h-4 ${currentElement.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Resolution</h4>
                </div>
                <p className="text-xl md:text-2xl font-serif text-gray-900 leading-relaxed pl-10">
                  "{selectedSubtypeData.data.resolution}"
                </p>
              </div>

              {/* The Practice */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full ${currentElement.lightBg} flex items-center justify-center`}>
                    <Calendar className={`w-4 h-4 ${currentElement.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-800">The Practice</h4>
                </div>
                <p className="text-gray-700 leading-relaxed pl-10">
                  {selectedSubtypeData.data.practice}
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
                Select a subtype above to reveal its New Year's resolution and practice
              </p>
            </div>
          </div>
        )}
      </div>

      {/* User's Resolution Highlight */}
      {userElement && userSubtype && (
        <div className="mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Your Personal Resolution</p>
            {(() => {
              const userElementData = elementsData.find(e => e.id === userElement);
              const userSubtypeData = userElementData?.subtypes.find(s => s.id === `${userElement}-${userSubtype}`);
              if (userSubtypeData && userElementData) {
                return (
                  <div className={`${userElementData.bgColor} rounded-2xl p-6 border-2 ${userElementData.borderColor}`}>
                    <p className={`text-sm font-medium ${userElementData.color} mb-3`}>
                      {userSubtypeData.name}
                    </p>
                    <p className="text-xl md:text-2xl font-serif text-gray-900 mb-4">
                      "{userSubtypeData.data.resolution}"
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-semibold">Practice: </span>
                      {userSubtypeData.data.practice}
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

export default ElementalNewYearResolutions;
