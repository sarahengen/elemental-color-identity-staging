import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Sparkles, Quote, Sun, Coffee, Music, Palette as PaletteIcon, BookOpen, Heart } from 'lucide-react';
import HobbiesTimeMap from './HobbiesTimeMap';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';


interface HobbySubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  idealDayOff: string;
  idealDayOffDescription: string;
  pastimes: string[];
}

interface HobbyElement {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  principle: string;
  subtypes: HobbySubtype[];
}

const hobbiesData: HobbyElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'The Active Restoration',
    principle: 'Rest is not stillness; rest is a different kind of fire.',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        idealDayOff: 'The Mastery Day',
        idealDayOffDescription: 'They spend the day pursuing excellence in a chosen skill—not for work, but for the sheer satisfaction of mastery. A morning of intense physical training (martial arts, fencing, precision climbing). An afternoon of strategic gaming (chess, high-level video games, competitive sport). Evening with a documentary on a genius or battle. They recharge by feeling sharp and capable.',
        pastimes: ['Sailing (single-handed)', 'Marksmanship', 'Coding challenges', 'Debate clubs', 'Building something that requires exacting precision']
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        idealDayOff: 'The Solo Immersion',
        idealDayOffDescription: 'A day spent in quiet, focused intensity—alone, or with one trusted companion who understands silence. A morning hiking to a remote viewpoint or visiting a planetarium. An afternoon lost in a museum (natural history, science, art) with headphones and no agenda. Evening cooking a complex, beautiful meal with a glass of wine and instrumental music.',
        pastimes: ['Deep-sea fishing', 'Stargazing', 'Building intricate models', 'Collecting rare specimens', 'Perfumery', 'Solo travel to places of natural wonder']
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        idealDayOff: 'The Productive Hearth',
        idealDayOffDescription: 'A day of tangible, useful work that is not their job. A morning building something (a piece of furniture, a garden bed, repairing something). An afternoon with a small, trusted group—a barbecue, a poker game, a collaborative project. Evening around a fire pit with good whiskey and stories. They recharge by doing and by belonging.',
        pastimes: ['Woodworking', 'Restoring old tools', 'Smoking meat', 'Target shooting', 'Coaching a youth sports team', 'Hosting a weekly gathering']
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        idealDayOff: 'The Festival Day',
        idealDayOffDescription: 'A day of color, movement, and people. A morning trying something new (a pop-up class, an immersive experience). An afternoon with friends—brunch, wandering a street fair, exploring a new neighborhood. Evening live music, dancing, or a comedy show. They recharge by experiencing and by connecting.',
        pastimes: ['Improv classes', 'Discovering new restaurants', 'Planning group adventures', 'Attending festivals', 'Spontaneous road trips', 'TikTok creation']
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'The Receptive Restoration',
    principle: 'Rest is gentle, flowing, and deeply felt.',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        idealDayOff: 'The Sanctuary Day',
        idealDayOffDescription: 'A day of gentle, sensory comfort. A slow morning with tea, soft music, and a window to look out of. A midday walk in a beautiful, quiet place (botanical garden, arboretum, shoreline). An afternoon curating their space—arranging flowers, tidying with intention, lighting candles. Evening with a soft film and a cozy blanket. They recharge by feeling safe and held.',
        pastimes: ['Flower arranging', 'Gentle yoga', 'Reading literary fiction', 'Taking baths', 'Tending houseplants', 'Listening to ambient soundscapes']
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        idealDayOff: 'The Deep Stillness',
        idealDayOffDescription: 'A day of profound solitude and introspection. A morning lying in bed with a book (poetry, philosophy, depth psychology). An afternoon alone in nature—sitting by a lake, walking a forest path, watching the sky. Evening journaling, drawing, or listening to haunting music. They recharge by descending into themselves.',
        pastimes: ['Writing poetry', 'Playing a single instrument alone', 'Long drives with no destination', 'Visiting cemeteries', 'Studying tarot or astrology', 'Silent retreats']
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        idealDayOff: 'The Nostalgic Pilgrimage',
        idealDayOffDescription: 'A day of warm, memory-soaked connection. A morning visiting a place from their past (childhood home, old neighborhood). An afternoon with family or old friends—looking through photo albums, cooking family recipes, telling stories. Evening watching a classic film or listening to music from their youth. They recharge by remembering who they are.',
        pastimes: ['Genealogy research', 'Antiquing', 'Restoring old photographs', 'Hosting themed dinner parties', 'Visiting historical sites', 'Folk music']
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        idealDayOff: 'The Nurturing Circuit',
        idealDayOffDescription: 'A day of gentle, practical care. A morning cooking a slow, nourishing meal. An afternoon in the garden or helping a friend with something. A long, hot bath with salts and oils. Evening knitting, mending, or a quiet film with a loved one. They recharge by giving and receiving gentle care.',
        pastimes: ['Baking bread', 'Tending a vegetable garden', 'Volunteering at an animal shelter', 'Making handmade gifts', 'Picnics', 'Gentle swimming']
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'The Substantial Restoration',
    principle: 'Rest is tangible, grounding, and deeply satisfying.',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        idealDayOff: 'The Fortress Day',
        idealDayOffDescription: 'A day of structured, principled restoration. A morning physical training (heavy lifting, hiking with weight, endurance work). An afternoon with a classic text (history, philosophy, law) or a documentary on leadership. Evening a simple, hearty meal and an early night. They recharge by feeling solid and in control.',
        pastimes: ['Mountaineering', 'Collecting rare books', 'Competitive shooting', 'Historical reenactment', 'Chess', 'Studying military history']
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        idealDayOff: 'The Hands-In-Dirt Day',
        idealDayOffDescription: 'A day of tangible, physical connection to the earth. A morning in the garden (planting, weeding, harvesting). An afternoon foraging, fishing, or a long hike with a purpose (berry picking, mushroom hunting). Evening cooking what they gathered and repairing something by hand. They recharge by making and growing.',
        pastimes: ['Permaculture', 'Beekeeping', 'Canning and preserving', 'Building with stone or wood', 'Composting', 'Studying edible plants']
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        idealDayOff: 'The Sensory Cocoon',
        idealDayOffDescription: 'A day of luxurious, tactile comfort. A morning in bed with high-thread-count sheets, coffee, and a beautiful magazine. An afternoon at a spa or a long, slow browse through a beautiful store (touching fabrics, smelling candles). Evening a bath with essential oils, soft music, and a plush robe. They recharge by feeling beautiful and comfortable.',
        pastimes: ['Textile arts (knitting with luxurious yarn)', 'Pottery', 'Visiting greenhouses', 'Perfume mixing', 'Slow baking', 'Creating cozy spaces']
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        idealDayOff: 'The Curator\'s Day',
        idealDayOffDescription: 'A day of aesthetic pleasure and beautiful consumption. A morning visiting a museum, gallery opening, or design show. An afternoon lunch at a beautiful restaurant followed by browsing antique shops or high-end boutiques. Evening cooking an elaborate, beautiful meal or attending a performance. They recharge by surrounding themselves with beauty.',
        pastimes: ['Collecting art', 'Wine tasting', 'Interior design projects', 'Hosting elegant dinners', 'Visiting architectural landmarks', 'Studying fashion history']
      }
    ]
  },

  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'The Expansive Restoration',
    principle: 'Rest is mental space, new ideas, and freedom.',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        idealDayOff: 'The Learning Day',
        idealDayOffDescription: 'A day of intellectual expansion without pressure. A morning with a dense book or online course on a fascinating topic. An afternoon visiting a lecture, a science museum, or a planetarium. Evening a documentary and a complex conversation with one intellectually stimulating friend. They recharge by knowing more.',
        pastimes: ['Learning new languages', 'Coding for fun', 'Attending academic lectures', 'Solving complex puzzles', 'Reading philosophy', 'Data visualization projects']
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        idealDayOff: 'The Discovery Crawl',
        idealDayOffDescription: 'A day of unstructured exploration and novelty. A morning wandering a new neighborhood with no plan. An afternoon trying three different things—a vintage store, a weird museum, a new cuisine. Evening a game night or improv show with friends. They recharge by being surprised.',
        pastimes: ['Geocaching', 'Escape rooms', 'Learning random skills', 'Going to odd local events', 'Creating multimedia projects', 'Collecting trivia']
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        idealDayOff: 'The Connection Circuit',
        idealDayOffDescription: 'A day of warm, meaningful social interaction. A morning coffee with a friend and a good conversation. An afternoon hosting a small gathering (brunch, book club, garden party). Evening a dinner party where they can connect people from different parts of their life. They recharge by weaving community.',
        pastimes: ['Hosting', 'Public speaking clubs (Toastmasters)', 'Attending networking events for fun', 'Leading community initiatives', 'Dinner party planning']
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        idealDayOff: 'The Dreamtime',
        idealDayOffDescription: 'A day of gentle, intuitive wandering. A morning lying in bed, drifting in and out of sleep, capturing dreams. An afternoon wandering without destination—a park, a quiet beach, a beautiful library. Evening ambient music, candlelight, and poetry or a dreamlike film. They recharge by being porous to the subtle world.',
        pastimes: ['Cloud-watching', 'Lucid dreaming practice', 'Automatic writing', 'Visiting sensory deprivation tanks', 'Creating ambient playlists', 'Stargazing']
      }
    ]
  }

];

interface ElementalHobbiesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const ElementalHobbies: React.FC<ElementalHobbiesProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            A day off is not "free time"—it is sacred recovery time that must be spent in alignment 
            with one's elemental nature. The wrong day off can be as depleting as work. The right day 
            off restores the soul.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {hobbiesData.map((element) => (
          <div
            key={element.element}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.elementId)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.elementId)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                    {isUserElement(element.elementId) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.tagline}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Element Principle Banner */}
            {expandedElements.includes(element.elementId) && (
              <div
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  borderColor: `${element.gradientFrom}40`
                }}
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.principle}
                  </p>
                </div>
              </div>
            )}

            {/* Subtypes Content */}
            {expandedElements.includes(element.elementId) && (
              <div className="bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => {
                    const isHighlighted = isUserSubtype(subtype.subtypeId);

                    return (
                      <div
                        key={subtype.subtype}
                        className={`relative rounded-xl p-6 transition-all duration-300 ${
                          isHighlighted
                            ? GUIDE_USER_SUBTYPE_CARD_CLASS
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        style={{
                          background: !isHighlighted
                            ? `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`
                            : undefined
                        }}
                      >
                        {/* User's Subtype Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-3 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Your Hobbies
                            </span>
                          </div>
                        )}

                        {/* Subtype Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                              color: element.gradientFrom
                            }}
                          >
                            {subtype.subtype}
                          </span>
                        </div>

                        {/* Subtype Name */}
                        <h4 className="text-xl font-bold mb-1 text-gray-900">
                          {subtype.name}
                        </h4>

                        {/* Ideal Day Off Name */}
                        <div className="flex items-center gap-2 mb-4">
                          <Sun className="w-4 h-4" style={{ color: element.gradientFrom }} />
                          <span className="text-base font-semibold italic" style={{ color: element.gradientFrom }}>
                            Ideal Day Off: {subtype.idealDayOff}
                          </span>
                        </div>

                        {/* Ideal Day Off Description */}
                        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Coffee className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              How They Spend It
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.idealDayOffDescription}
                          </p>
                        </div>

                        {/* Pastimes */}
                        <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Pastimes
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {subtype.pastimes.map((pastime, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border"
                                style={{
                                  background: `linear-gradient(135deg, ${element.gradientFrom}10, ${element.gradientTo}10)`,
                                  borderColor: `${element.gradientFrom}25`,
                                  color: element.gradientFrom
                                }}
                              >
                                {pastime}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Time Map */}
                        <HobbiesTimeMap
                          pastimes={subtype.pastimes}
                          subtypeName={subtype.name}
                          subtypeLabel={subtype.subtype}
                          elementGradientFrom={element.gradientFrom}
                          elementGradientTo={element.gradientTo}
                          elementId={element.elementId}
                        />


                        {/* Decorative corner accent */}
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-tr-xl rounded-bl-full"
                          style={{
                            background: `linear-gradient(to bottom left, ${element.gradientFrom}30, transparent)`
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 rounded-2xl border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Honoring Your Elemental Rest</h4>
            <p className="text-gray-600 leading-relaxed">
              A day off is not a luxury. It is a non-negotiable elemental requirement. When a subtype 
              honors their natural restoration rhythm, they return to the world not just rested, but 
              more themselves. When they ignore it, they slowly erode. The best gift you can give 
              yourself is the permission to restore in your own elemental language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ElementalHobbies;
