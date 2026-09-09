import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, TreePine, ChevronDown, ChevronUp, MapPin, Home, Sparkles, Quote, AlertTriangle } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface HabitatSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  habitatName: string;
  idealLocation: string;
  spaceItself: string[];
  whyItWorks: string;
  comfortMarkers: string[];
  shadowHabitat: string;
}

interface HabitatElement {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: HabitatSubtype[];
}

const habitatData: HabitatElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Habitats of Power & Presence',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        habitatName: 'The Urban Nexus',
        idealLocation: 'Cities at crossroads—transportation hubs, port cities, places where cultures, ideas, and people converge. Think Hong Kong, New York, Istanbul, Singapore.',
        spaceItself: [
          'Open-plan lofts with exposed infrastructure (wires, pipes, structure visible)',
          'Windows facing multiple directions (constant visual stimulation)',
          'Near public transit (the hum of movement)',
          'High-speed internet, smart home technology',
          'Walls that can be written on, changed, reconfigured'
        ],
        whyItWorks: 'The Electric Arc needs stimulus flow—constant input, constant connection. Isolation extinguishes them. They thrive where the unexpected is expected, where every street corner offers a new spark.',
        comfortMarkers: [
          'I can hear the city breathing',
          'Something interesting is always walking past my window',
          'I never know what I\'ll find around the corner'
        ],
        shadowHabitat: 'Too much stimulation without grounding becomes manic chaos. They need one quiet corner—a single chair facing a blank wall—to prevent scattering.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        habitatName: 'The Minimalist Perch',
        idealLocation: 'Clean, elevated spaces with precision and light. High-rise apartments with expansive windows, modernist houses in quiet suburbs, mountain retreats with surgical views. Think Copenhagen, Kyoto, Swiss Alps.',
        spaceItself: [
          'Everything has a place and purpose',
          'Natural light, preferably south-facing (cool, clear light)',
          'Limited color palette (whites, grays, blues, one accent)',
          'Quality over quantity in every object',
          'Workspace separate from living space (ritual boundaries)'
        ],
        whyItWorks: 'The Blue Flame needs clarity—visual, mental, emotional. Clutter is contamination. They thrive where every object has been chosen, every surface serves a function, every line has intention.',
        comfortMarkers: [
          'I can think clearly here',
          'Nothing is demanding my attention unless I choose',
          'This space respects my focus'
        ],
        shadowHabitat: 'Too much purity becomes sterile. They need one "messy" element—a living plant, an imperfect handmade bowl, a window left open to street sounds—to prevent emotional refrigeration.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forge Fire',
        habitatName: 'The Workshop Home',
        idealLocation: 'Industrial-converted spaces, properties with outbuildings, places where living and making coexist. Former factories, farmhouses with barns, urban fringe with studio space. Think Detroit, Berlin industrial neighborhoods, rural craft communities.',
        spaceItself: [
          'Visible evidence of work (tools, materials, projects)',
          'Durable surfaces (concrete, butcher block, metal)',
          'Separation but connection between home and studio',
          'Storage for raw materials',
          'Large windows for natural light, strong task lighting'
        ],
        whyItWorks: 'The Forge Fire needs purpose—space that serves function, that enables making. They thrive where they can move between creation and rest without losing the thread.',
        comfortMarkers: [
          'I can make something here',
          'Everything has a purpose',
          'My work and my life are in conversation'
        ],
        shadowHabitat: 'Too much purpose becomes production-line existence. They need spaces that serve no function—a hammock, a porch with no task, a room with nothing to do—to prevent burnout.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        habitatName: 'The Cozy Nook',
        idealLocation: 'Small, intimate spaces with warmth and protection. Tiny houses, garden studios, attic apartments, cottages. Places that feel like discovered secrets. Think Pacific Northwest cabins, English countryside cottages, Brooklyn brownstone parlors.',
        spaceItself: [
          'Small enough to feel held, not overwhelmed',
          'Multiple light sources (candles, string lights, lamps)',
          'Soft textures (wool blankets, worn cushions)',
          'Evidence of inspiration (books, images, collected objects)',
          'A window seat or reading nook'
        ],
        whyItWorks: 'The Illuminating Spark needs safety—protection for their fragile beginnings. They thrive where the outside world feels distant enough that they can hear their own quiet ideas.',
        comfortMarkers: [
          'I can breathe here',
          'This space holds me without demanding anything',
          'My ideas feel safe to emerge'
        ],
        shadowHabitat: 'Too much safety becomes isolation. They need one window onto the world—a view of passing life, an invitation to occasional engagement—to prevent becoming a sealed ember.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Habitats of Sanctuary & Softness',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        habitatName: 'The Threshold Dwelling',
        idealLocation: 'Places where land meets water, where boundaries blur. Coastal towns, lakefront properties, river bends, foggy valleys. Think Scottish Highlands, Maine coastline, San Francisco fog belt, Norwegian fjords.',
        spaceItself: [
          'Windows facing water (watching transitions)',
          'Layered spaces (inside/outside blur through porches, sunrooms)',
          'Soft, diffused lighting (no harsh overheads)',
          'Sheer curtains, translucent screens',
          'Colors that shift with weather (grays, silvers, soft blues)'
        ],
        whyItWorks: 'The Misty Shore needs liminality—to live where boundaries are permeable, where each day brings different visibility. They thrive where they can watch fog roll in and out, tide rise and fall, the line between elements dissolve and reform.',
        comfortMarkers: [
          'I can watch the weather change',
          'The boundary between inside and outside feels soft',
          'I never know exactly where the horizon is today'
        ],
        shadowHabitat: 'Too much threshold becomes permanent obscurity. They need one clear anchor—a fire pit, a bright interior wall, a daily ritual—to prevent dissolving into the fog entirely.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        habitatName: 'The Still Center',
        idealLocation: 'Deep quiet places with reflective surfaces. Lakeside cabins, forest clearings, properties with ponds, walled gardens with water features. Think Canadian Shield lakes, English Lake District, Japanese garden homes.',
        spaceItself: [
          'Proximity to still water (lake, pond, large reflecting pool)',
          'Deep, quiet rooms with minimal external noise',
          'Dark, polished surfaces that reflect',
          'Windows placed low to capture water and ground views',
          'Heavy, quiet fabrics (velvet, wool) that absorb sound'
        ],
        whyItWorks: 'The Forest Lake needs stillness—not silence, but the kind of quiet that allows reflection without distortion. They thrive where they can sit and watch the same water change slowly, day after day.',
        comfortMarkers: [
          'I can hear myself think here',
          'The water outside is the water inside',
          'Nothing here demands that I move'
        ],
        shadowHabitat: 'Too much stillness becomes stagnation. They need one moving element—a wind chime, a flowing fountain, a visiting bird—to prevent becoming a swamp.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        habitatName: 'The Garden Sanctuary',
        idealLocation: 'Places where light plays on water, where nature is curated but not controlled. Suburban gardens with water features, Mediterranean courtyards with fountains, tropical courtyards, intentional communities with shared ponds. Think Tuscan villas, Bali retreats, Santa Fe courtyards.',
        spaceItself: [
          'Dappled light (trees over water, lattice overhead)',
          'Moving water (fountains, small streams, splashing features)',
          'Abundant plants, flowers, life',
          'Outdoor rooms, shaded seating',
          'Bright colors, playful accents (mosaic, glass, tile)'
        ],
        whyItWorks: 'The Sun-Dappled Pond needs joy in small doses—light fragmented, movement constant, beauty ordinary. They thrive where every glance offers a small delight, where heaviness has difficulty settling.',
        comfortMarkers: [
          'Light dances here',
          'There\'s always something beautiful to look at',
          'Even sorrow feels softer in this light'
        ],
        shadowHabitat: 'Too much delight becomes denial. They need one solemn corner—a dark bench, a still pool, a quiet shadow—to prevent becoming all surface, no depth.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',

        habitatName: 'The Confluence',
        idealLocation: 'Places where waters meet, where stories accumulate. River junctions, historic port towns, cities built on rivers, places with layered histories. Think New Orleans, Rome, Varanasi, London along the Thames.',
        spaceItself: [
          'Views of moving water (rivers, canals, tidal flows)',
          'Old buildings with visible history (layered renovations, exposed past)',
          'Bookshelves, archives, evidence of story',
          'Windows that frame change (tide coming in, boats passing)',
          'A desk facing the water'
        ],
        whyItWorks: 'The Languid River needs narrative flow—to watch stories carried past, to feel time moving, to know they are part of something larger than themselves. They thrive where history is visible in the architecture, where water has carried generations of meaning.',

        comfortMarkers: [
          'I can watch stories float past',
          'This place remembers things',
          'I am part of something flowing'
        ],
        shadowHabitat: 'Too much narrative becomes drowning. They need one silent place—a room with no view of water, a blank wall, an hour of no input—to prevent becoming all archive, no presence.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Habitats of Rootedness & Legacy',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        habitatName: 'The High Place',
        idealLocation: 'Elevated, enduring landscapes with expansive views. Mountains, mesas, high deserts, cliffs overlooking sea. Think Swiss Alps, American Southwest, Scottish Highlands, Tibetan plateau.',
        spaceItself: [
          'Built from local stone (quarried from the place itself)',
          'Thick walls, deep windowsills',
          'Few but expansive views (each window frames a significant prospect)',
          'Minimal but permanent furnishings',
          'Rooted in bedrock—no basement, no crawlspace, just stone on stone'
        ],
        whyItWorks: 'The Mountain Stone needs permanence—to be somewhere that has stood for millennia and will stand for millennia more. They thrive where their home feels like an outcrop of the earth itself, not something temporary built upon it.',
        comfortMarkers: [
          'This house has always been here',
          'I can see forever from this window',
          'Nothing here is new enough to worry about'
        ],
        shadowHabitat: 'Too much permanence becomes petrification. They need one changeable element—a weather vane, a wind-sculpted tree, a seasonal stream—to prevent becoming a monument to dead things.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        habitatName: 'The Woodland Hollow',
        idealLocation: 'Fertile, sheltered places where life teems in the dark. Temperate rainforests, old-growth woodlands, mossy valleys, gardens gone slightly wild. Think Pacific Northwest, English woodlands, Appalachian coves, Japanese forest temples.',
        spaceItself: [
          'Nestled under trees, dappled light',
          'Earthen floors or floors that touch earth',
          'Living roofs (green roofs, moss)',
          'Composting everything, wasting nothing',
          'Dark, rich colors, soft textures',
          'Built from fallen or reclaimed wood'
        ],
        whyItWorks: 'The Forest Floor needs fertility—to live where death visibly becomes life, where rot is not failure but process. They thrive where they can watch mushrooms fruit from fallen logs, where moss covers every surface given enough time.',
        comfortMarkers: [
          'Everything here is becoming something else',
          'The earth breathes beneath this floor',
          'Nothing stays dead for long'
        ],
        shadowHabitat: 'Too much fertility becomes decay without renewal. They need one place of deliberate cultivation—a vegetable bed, a tended flower, a pruned tree—to prevent becoming all compost, no harvest.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        habitatName: 'The Intimate Enclosure',
        idealLocation: 'Small, protected, soft places within larger landscapes. Forest clearings, walled gardens, cottage gardens, cloistered courtyards. Think English cottage gardens, Japanese temple gardens, Provençal walled villages.',
        spaceItself: [
          'Enclosed, protected (walls, hedges, trees)',
          'Intimate scale (everything within arm\'s reach)',
          'Soft underfoot (moss paths, grass, fallen leaves)',
          'Abundant textures (velvet plants, fuzzy leaves, soft stone)',
          'Places to touch things'
        ],
        whyItWorks: 'The Velvet Moss needs intimacy—to live where every surface invites touch, where scale is human and warm. They thrive where they can know every plant by name, every stone by texture, every corner by its feeling.',
        comfortMarkers: [
          'I know every inch of this place by touch',
          'Nothing here feels harsh',
          'I am held by this garden'
        ],
        shadowHabitat: 'Too much intimacy becomes claustrophobia. They need one wide view—a gap in the wall, a glimpse of mountain, a window to distance—to prevent suffocating in softness.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        habitatName: 'The Cultivated Plain',
        idealLocation: 'Productive, seasonal landscapes with visible cycles. Farmlands, vineyards, orchards, market gardens, places where human hands work earth\'s abundance. Think Tuscany, Bordeaux, California wine country, Dutch tulip fields.',
        spaceItself: [
          'Surrounded by cultivated land (fields, vines, orchards)',
          'Visible seasons (what\'s planted, what\'s harvested, what\'s fallow)',
          'Workspaces for processing abundance (kitchens, barns, cellars)',
          'Long views across productive land',
          'Storage that honors what\'s gathered'
        ],
        whyItWorks: 'The Golden Harvest needs cycle—to live where the year has visible rhythm, where work follows season, where abundance is celebrated and emptiness accepted. They thrive where they can watch things grow, harvest, rest, and grow again.',
        comfortMarkers: [
          'I know what season it is without looking',
          'This land feeds more than just me',
          'Every ending here is also a beginning'
        ],
        shadowHabitat: 'Too much cycle becomes anxiety (always next season). They need one permanent thing—an ancient tree, a stone wall, a perennial that never dies—to prevent becoming slaves to the calendar.'
      }

    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Habitats of Light & Possibility',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        habitatName: 'The High Vista',
        idealLocation: 'Elevated, open places with expansive views and clean air. Hilltops, coastal bluffs, high plains, places with more sky than land. Think Tibetan plateau, Outer Hebrides, New Mexico desert, Greek islands.',
        spaceItself: [
          'Minimal walls, maximum windows',
          'Orientation to sky (skylights, roof windows, outdoor rooms)',
          'Simple, sparse furnishings (nothing competing with view)',
          'Pale colors that don\'t interrupt light',
          'Open to breezes, cross-ventilation'
        ],
        whyItWorks: 'The Clear Morning Sky needs space—to live where the horizon is distant and the sky feels like the main event. They thrive where they can watch weather approach from miles away, where nothing crowds their perception.',
        comfortMarkers: [
          'I can see the weather coming',
          'The sky is bigger here than anywhere else',
          'Nothing blocks my view'
        ],
        shadowHabitat: 'Too much space becomes emptiness. They need one intimate detail—a close flower, a personal object, a small enclosed garden—to prevent disappearing into the vastness.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        habitatName: 'The Open Pavilion',
        idealLocation: 'Light, airy, flexible spaces that connect inside and out. Beach houses, lake cottages, Mediterranean villas, places with porches and verandas. Think Greek islands, California coast, Caribbean pavilions.',
        spaceItself: [
          'Indoor/outdoor flow (sliding walls, wide porches)',
          'Light materials (canvas, linen, light wood)',
          'Movement everywhere (curtains stirring, leaves moving)',
          'Multiple sitting areas (follow the breeze, follow the light)',
          'Unpredictable spaces (hammocks, swinging benches, rolling chairs)'
        ],
        whyItWorks: 'The Playful Breeze needs movement—to live where air flows freely, where they can follow comfort around the house, where nothing is too fixed. They thrive where they can eat breakfast where the morning sun hits, read where the afternoon breeze blows, sleep where the night air cools.',
        comfortMarkers: [
          'I can follow the breeze through this house',
          'Everything here moves, including me',
          'No two days feel the same in this space'
        ],
        shadowHabitat: 'Too much movement becomes restlessness. They need one fixed point—a heavy table, a rooted tree, a daily anchor—to prevent scattering into constant motion.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        habitatName: 'The Exquisite Retreat',
        idealLocation: 'Beautiful, curated, atmospheric places with attention to sensory detail. Hill towns with golden light, coastal villas with sunset views, restored historical properties, places where beauty is the point. Think Santorini, Amalfi Coast, Kyoto ryokans, Provençal mas.',
        spaceItself: [
          'Oriented to golden hour (west-facing, sunset views)',
          'Every object beautiful or meaningful',
          'Sensory richness (scented gardens, textured surfaces, music)',
          'Perfect light at certain times of day',
          'Luxurious simplicity (quality, not quantity)'
        ],
        whyItWorks: 'The Gilded Zephyr needs beauty—to live where every glance offers something lovely, where atmosphere is cultivated like a garden. They thrive where light transforms the ordinary into the sacred, at least once a day.',
        comfortMarkers: [
          'This place is a gift to my senses',
          'The light here makes everything sacred',
          'I am surrounded by things that deserve attention'
        ],
        shadowHabitat: 'Too much beauty becomes aesthetic tyranny. They need one ordinary thing—a dish left unwashed, a weed in the garden, an imperfect corner—to prevent becoming prisoners of perfection.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        habitatName: 'The Hidden Sanctuary',
        idealLocation: 'Secret, intimate, protected places within larger landscapes. Hidden courtyards, attic rooms, garden sheds converted to studios, places that feel discovered. Think Charleston garden courtyards, Parisian artist garrets, treehouses, hidden coves.',
        spaceItself: [
          'Hard to find, even harder to access',
          'Small enough to feel like a secret',
          'Soundproof or sound-muffled',
          'Soft, intimate lighting (candles, small lamps)',
          'Evidence of private thoughts (journals, sketches, notes)'
        ],
        whyItWorks: 'The First Whisper needs secrecy—to live where their thoughts are safe from intrusion, where they can speak aloud to no one, where the world cannot find them until they choose to be found. They thrive where their space feels like a discovery, even to themselves.',
        comfortMarkers: [
          'No one can find me here unless I want them to',
          'This space knows my secrets',
          'I can whisper here without being heard'
        ],
        shadowHabitat: 'Too much secrecy becomes isolation. They need one open door—a window onto life, an invitation they can accept, a way back to the world—to prevent becoming a sealed chamber.'
      }
    ]
  }

];

interface ElementalHabitatProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const ElementalHabitat: React.FC<ElementalHabitatProps> = ({
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
            Your home is not merely shelter; it is the physical expression of your inner landscape. 
            The right habitat doesn't just house you—it restores you, reflects you, and amplifies 
            the frequency at which you naturally vibrate. Here is the dwelling each subtype truly needs.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {habitatData.map((element) => (
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

            {/* Element Description Banner */}
            {expandedElements.includes(element.elementId) && (
              <div
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  borderColor: `${element.gradientFrom}40`
                }}
              >
                <div className="flex items-start gap-3">
                  <TreePine className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.tagline} — Discover the ideal living habitat for each {element.element} subtype.
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
                              Your Habitat
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

                        {/* Habitat Name */}
                        <div className="flex items-center gap-2 mb-4">
                          <Home className="w-4 h-4" style={{ color: element.gradientFrom }} />
                          <span className="text-base font-semibold italic" style={{ color: element.gradientFrom }}>
                            Habitat: {subtype.habitatName}
                          </span>
                        </div>

                        {/* Ideal Location */}
                        <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Ideal Location
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.idealLocation}
                          </p>
                        </div>

                        {/* The Space Itself */}
                        <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <TreePine className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              The Space Itself
                            </span>
                          </div>
                          <ul className="space-y-1.5">
                            {subtype.spaceItself.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: element.gradientFrom }} />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Why It Works */}
                        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Why It Works
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.whyItWorks}
                          </p>
                        </div>

                        {/* Comfort Markers */}
                        <div className="p-4 bg-violet-50/80 rounded-lg border border-violet-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Quote className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Comfort Markers
                            </span>
                          </div>
                          <div className="space-y-2">
                            {subtype.comfortMarkers.map((marker, idx) => (
                              <p key={idx} className="text-sm text-gray-700 italic pl-3 border-l-2" style={{ borderColor: `${element.gradientFrom}40` }}>
                                "{marker}"
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Shadow Habitat */}
                        <div className="p-4 bg-red-50/80 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="font-semibold text-sm text-red-700">
                              Shadow Habitat
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.shadowHabitat}
                          </p>
                        </div>

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
      <div className="mt-12 p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-emerald-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <TreePine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Finding Your Elemental Habitat</h4>
            <p className="text-gray-600 leading-relaxed">
              Your ideal habitat is not about square footage or market value—it is about resonance. 
              When your living space matches your elemental nature, you don't just come home; you come 
              back to yourself. The walls hold your frequency, the light speaks your language, and the 
              air itself feels like permission to be exactly who you are. Use these insights to evaluate 
              your current home and seek spaces that truly restore you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalHabitat;
