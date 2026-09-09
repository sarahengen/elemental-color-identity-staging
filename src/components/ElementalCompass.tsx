import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Compass, Flame, Droplets, Wind, Mountain, ChevronDown, ChevronUp, Sparkles, MapPin, Eye, AlertTriangle, Quote, ArrowLeftRight, RotateCcw, X } from 'lucide-react';


/* ─── Color scheme matching Spiritual Essence ─── */
const ELEMENT_COLORS: Record<string, { from: string; to: string; accent: string; bg: string; text: string }> = {
  fire:  { from: '#C41E3A', to: '#FF6B35', accent: '#C41E3A', bg: 'from-red-50 to-orange-50',  text: 'text-red-900' },
  water: { from: '#6B8BA4', to: '#B4A7D6', accent: '#6B8BA4', bg: 'from-blue-50 to-violet-50', text: 'text-blue-900' },
  earth: { from: '#8B4513', to: '#228B22', accent: '#8B4513', bg: 'from-amber-50 to-green-50',  text: 'text-amber-900' },
  air:   { from: '#00CED1', to: '#FFE135', accent: '#00CED1', bg: 'from-cyan-50 to-yellow-50',  text: 'text-cyan-900' },
};

/* ─── Subtype data for compass positions ─── */
interface SubtypeCompassData {
  id: string;
  element: string;
  combination: string;
  name: string;
  direction: string;
  meaning: string;
  orientation: string;
  whatYouSeek: string;
  shadowOrientation: string;
  affirmation: string;
  angle: number; // SVG angle (-90 = North)
}

const FIRE_SUBTYPES: SubtypeCompassData[] = [
  {
    id: 'fire-fire',
    element: 'fire',
    combination: 'Fire + Fire',
    name: 'Electric Arc',
    direction: 'South-by-Southeast',
    meaning: 'The edge of fire, where it meets something else. The lightning that connects heaven and earth. The spark that travels between.',
    orientation: 'You face south, but you are always turning\u2014toward the new connection, the unexpected pattern, the thing that hasn\u2019t been linked yet. Your direction is not fixed. You are the arc, and the arc moves.',
    whatYouSeek: 'You seek the place where things meet. The threshold between known and unknown, between people, between ideas. Your spiritual direction is connection.',
    shadowOrientation: 'When lost, you spin\u2014touching everything, landing nowhere. You face all directions at once, which is the same as facing none.',
    affirmation: 'I face the place where things meet. I am the arc between.',
    angle: 72, // SSE
  },
  {
    id: 'fire-water',
    element: 'fire',
    combination: 'Fire + Water',
    name: 'Blue Flame',
    direction: 'True South',
    meaning: 'The sun at its peak. The hottest, purest point of the fire. The moment of perfect clarity.',
    orientation: 'You face south directly. You do not waver. Your direction is singular, focused, precise. You seek the essential, the core, the truth at the center.',
    whatYouSeek: 'You seek clarity. The pure light that burns away illusion, the heat that refines, the precision that reveals what is real.',
    shadowOrientation: 'When lost, you face south so hard you cannot see anything else. The clarity becomes blindness. The focus becomes a cage.',
    affirmation: 'I face the sun at its peak. I seek what is essential.',
    angle: 90, // True South
  },
  {
    id: 'fire-earth',
    element: 'fire',
    combination: 'Fire + Earth',
    name: 'Forge Iron',
    direction: 'South-by-Southwest',
    meaning: 'The fire that works. The forge that shapes what will be used. The heat that transforms raw material into purpose.',
    orientation: 'You face south, but you are always building. Your direction is toward what can be made, what can be shaped, what can be forged from the raw material of the world.',
    whatYouSeek: 'You seek purpose. The fire that serves, the heat that creates, the transformation that results in something lasting.',
    shadowOrientation: 'When lost, you face the forge so long you forget there is anything else. You become a tool, not the one who wields it.',
    affirmation: 'I face the forge. I shape what serves.',
    angle: 108, // SSW
  },
  {
    id: 'fire-air',
    element: 'fire',
    combination: 'Fire + Air',
    name: 'Illuminating Spark',
    direction: 'South-by-Southeast (the leading edge)',
    meaning: 'The first light. The spark that precedes the flame. The beginning of fire.',
    orientation: 'You face south, but you are always at the edge of it\u2014the place where fire begins. Your direction is toward what is starting, what is emerging, what is not yet burning.',
    whatYouSeek: 'You seek beginnings. The first spark that ignites something new, the possibility that precedes actuality, the dawn of fire.',
    shadowOrientation: 'When lost, you face the spark so long you never let it become flame. You love beginnings so much you fear the middle.',
    affirmation: 'I face the spark. I honor what is beginning.',
    angle: 58, // SSE leading edge
  },
];

/* ─── Water subtypes with full directional content ─── */
const WATER_SUBTYPES: SubtypeCompassData[] = [
  {
    id: 'water-air',
    element: 'water',
    combination: 'Water + Air',
    name: 'Misty Shore',
    direction: 'West-by-Northwest',
    meaning: 'The edge where water meets land. The threshold between what is known and what is unknown. The fog that veils the horizon.',
    orientation: 'You face west, but you are always at the edge of it\u2014the place where water becomes land, where release meets return. Your direction is liminal, transitional, neither here nor there.',
    whatYouSeek: 'You seek the threshold. The place between, the moment of transition, the fog that softens the boundary between what is and what was.',
    shadowOrientation: 'When lost, you live entirely on the threshold. You never cross. You are never fully in any place.',
    affirmation: 'I face the threshold. I honor what is between.',
    angle: 162,
  },
  {
    id: 'water-water',
    element: 'water',
    combination: 'Water + Water',
    name: 'Forest Lake',
    direction: 'True West',
    meaning: 'The still water that receives the setting sun. The depth that holds reflection. The release that is also a holding.',
    orientation: 'You face west directly. You do not rush the sunset. Your direction is toward release\u2014but also toward the depth that holds what is released.',
    whatYouSeek: 'You seek the depth of release. Not forgetting, but holding differently. Letting go without losing.',
    shadowOrientation: 'When lost, you face west so long you cannot turn toward the sunrise. The release becomes a holding. The depth becomes a drowning.',
    affirmation: 'I face the setting sun. I release without losing.',
    angle: 180,
  },
  {
    id: 'water-fire',
    element: 'water',
    combination: 'Water + Fire',
    name: 'Sun-Dappled Pond',
    direction: 'West-by-Southwest',
    meaning: 'The water that catches the last light. The joy of release. The sparkle of the setting sun on the surface.',
    orientation: 'You face west, but you are always playing with it. Your direction is toward release, but you find the light in it\u2014the beauty of letting go.',
    whatYouSeek: 'You seek the light in release. The joy of what is ending, the beauty of what is passing, the sparkle of the final moment.',
    shadowOrientation: 'When lost, you face the sparkle so long you cannot feel the depth. The joy becomes a mask, the release becomes avoidance.',
    affirmation: 'I face the setting sun. I find the light in release.',
    angle: 198,
  },
  {
    id: 'water-earth',
    element: 'water',
    combination: 'Water + Earth',
    name: 'Languid River',
    direction: 'West-by-Northwest (following the flow)',
    meaning: 'The river that carries what is released to the sea. The story of letting go. The flow that connects release to return.',
    orientation: 'You face west, but you are always flowing toward it. Your direction is the river itself\u2014the path from source to sea, from beginning to ending.',
    whatYouSeek: 'You seek the story of release. The narrative that carries what is let go into meaning. The flow that connects endings to beginnings.',
    shadowOrientation: 'When lost, you flow so long you forget you can stop. The story becomes a cage, the flow becomes a trap.',
    affirmation: 'I face the sea. I carry what is released into meaning.',
    angle: 148,
  },
];


/* ─── Earth subtypes with full directional content ─── */
const EARTH_SUBTYPES: SubtypeCompassData[] = [
  {
    id: 'earth-fire',
    element: 'earth',
    combination: 'Earth + Fire',
    name: 'Mountain Stone',
    direction: 'True North',
    meaning: 'The mountain that has always been there. The foundation that does not move. The witness at the pole.',
    orientation: 'You face north directly. You do not waver. Your direction is toward what endures, what has always been, what will remain.',
    whatYouSeek: 'You seek permanence. The ground that does not shift, the truth that does not change, the foundation that holds everything else.',
    shadowOrientation: 'When lost, you face north so long you cannot move. The permanence becomes rigidity. The foundation becomes a prison.',
    affirmation: 'I face the mountain. I endure without becoming rigid.',
    angle: -90, // True North
  },
  {
    id: 'earth-earth',
    element: 'earth',
    combination: 'Earth + Earth',
    name: 'Forest Floor',
    direction: 'North-by-Northeast',
    meaning: 'The ground that receives what falls. The darkness where transformation happens. The patience of decay.',
    orientation: 'You face north, but you are always beneath it\u2014the forest floor that receives, transforms, renews. Your direction is toward the hidden work, the underground growth.',
    whatYouSeek: 'You seek transformation in stillness. The life that comes from death, the growth that happens in darkness, the renewal that requires decay.',
    shadowOrientation: 'When lost, you face the darkness so long you forget there is light. The transformation becomes stagnation, the renewal becomes rot.',
    affirmation: 'I face the forest floor. I transform what falls.',
    angle: -72, // NNE
  },
  {
    id: 'earth-water',
    element: 'earth',
    combination: 'Earth + Water',
    name: 'Velvet Moss',
    direction: 'North-by-Northwest',
    meaning: 'The softness that covers hardness. The gentleness that endures. The moss that grows where nothing else will.',
    orientation: 'You face north, but you are always covering it\u2014softening what is hard, making habitable what is inhospitable. Your direction is toward gentleness, toward patience, toward the slow work of covering.',
    whatYouSeek: 'You seek the softness in endurance. The gentleness that outlasts force, the patience that wears down stone, the moss that grows in the cracks.',
    shadowOrientation: 'When lost, you cover so long you forget you can stand alone. The gentleness becomes clinging, the softness becomes absence.',
    affirmation: 'I face the moss. I soften what is hard.',
    angle: -108, // NNW
  },
  {
    id: 'earth-air',
    element: 'earth',
    combination: 'Earth + Air',
    name: 'Golden Harvest',
    direction: 'North-by-Northeast (the turning point)',
    meaning: 'The harvest that comes from winter\u2019s patience. The abundance that follows stillness. The fruit that emerges from darkness.',
    orientation: 'You face north, but you are always turning\u2014from winter to spring, from stillness to growth, from patience to harvest. Your direction is toward the cycle, the return, the abundance that follows endurance.',
    whatYouSeek: 'You seek the harvest. The fruit of patience, the abundance that follows stillness, the gift that emerges from the dark.',
    shadowOrientation: 'When lost, you face the harvest so long you forget the winter. The abundance becomes greed, the giving becomes depletion.',
    affirmation: 'I face the harvest. I receive what I have waited for.',
    angle: -58, // NNE turning point
  },
];


/* ─── Air subtypes with full directional content ─── */
const AIR_SUBTYPES: SubtypeCompassData[] = [
  {
    id: 'air-air',
    element: 'air',
    combination: 'Air + Air',
    name: 'Clear Morning Sky',
    direction: 'True East',
    meaning: 'The sky before the sun rises. The space of possibility. The light that is not yet light.',
    orientation: 'You face east directly. You do not need the sun to be fully risen. Your direction is toward the space itself, the emptiness that holds all possibility.',
    whatYouSeek: 'You seek spaciousness. The emptiness that is also fullness, the silence that is also sound, the dawn that is also the beginning of everything.',
    shadowOrientation: 'When lost, you face east so long you cannot turn toward the day. The space becomes absence, the emptiness becomes nothing.',
    affirmation: 'I face the dawn. I hold space for what is beginning.',
    angle: 0, // True East
  },
  {
    id: 'air-fire',
    element: 'air',
    combination: 'Air + Fire',
    name: 'Playful Breeze',
    direction: 'East-by-Southeast',
    meaning: 'The first movement of air. The breeze that dances at dawn. The play of beginning.',
    orientation: 'You face east, but you are always moving within it\u2014dancing, playing, stirring. Your direction is toward the joy of beginning, the movement of dawn.',
    whatYouSeek: 'You seek the movement of beginning. The play that precedes purpose, the dance that is its own meaning, the breeze that asks nothing but to move.',
    shadowOrientation: 'When lost, you face the movement so long you cannot stop. The play becomes scattering, the dance becomes avoidance.',
    affirmation: 'I face the breeze. I move with what is beginning.',
    angle: 18, // ESE
  },
  {
    id: 'air-earth',
    element: 'air',
    combination: 'Air + Earth',
    name: 'Gilded Zephyr',
    direction: 'East-by-Northeast',
    meaning: 'The light that makes the dawn beautiful. The golden air of sunrise. The atmosphere of beginning.',
    orientation: 'You face east, but you are always illuminating it\u2014finding the beauty, catching the light, making the dawn visible. Your direction is toward the beauty of beginning.',
    whatYouSeek: 'You seek the beauty in beginning. The light that makes the dawn sacred, the gold that transforms ordinary air, the atmosphere that makes possibility visible.',
    shadowOrientation: 'When lost, you face the beauty so long you cannot see what is real. The beauty becomes surface, the gold becomes a cage.',
    affirmation: 'I face the dawn. I see the beauty in what is beginning.',
    angle: -18, // ENE
  },
  {
    id: 'air-water',
    element: 'air',
    combination: 'Air + Water',
    name: 'First Whisper',
    direction: 'East-by-Northeast (the first sound)',
    meaning: 'The first breath that carries the first word. The whisper that precedes speech. The beginning of voice.',
    orientation: 'You face east, but you are always speaking\u2014the first sound, the quiet word, the whisper that begins everything. Your direction is toward the voice, the breath, the truth that emerges.',
    whatYouSeek: 'You seek the truth of beginning. The word that has not yet been spoken, the secret that needs to be told, the whisper that will become song.',
    shadowOrientation: 'When lost, you face the whisper so long you cannot speak. The truth stays hidden, the voice stays silent, the beginning never becomes.',
    affirmation: 'I face the whisper. I speak what is beginning.',
    angle: -32, // ENE (the first sound)
  },
];


const ALL_SUBTYPES = [...FIRE_SUBTYPES, ...WATER_SUBTYPES, ...EARTH_SUBTYPES, ...AIR_SUBTYPES];

/* ─── Element icons (matching Spiritual Essence) ─── */
const elementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-5 h-5" />,
  water: <Droplets className="w-5 h-5" />,
  earth: <Mountain className="w-5 h-5" />,
  air: <Wind className="w-5 h-5" />,
};

const elementIconsLg: Record<string, React.ReactNode> = {
  fire: <Flame className="w-6 h-6" />,
  water: <Droplets className="w-6 h-6" />,
  earth: <Mountain className="w-6 h-6" />,
  air: <Wind className="w-6 h-6" />,
};

/* ─── Quadrant data ─── */
const QUADRANTS = [
  { element: 'Fire', direction: 'South', season: 'Winter', time: 'Noon', quality: 'Fullness, action, transformation' },
  { element: 'Water', direction: 'West', season: 'Summer', time: 'Dusk', quality: 'Release, flow, letting go' },
  { element: 'Earth', direction: 'North', season: 'Autumn', time: 'Midnight', quality: 'Stillness, endurance, foundation' },
  { element: 'Air', direction: 'East', season: 'Spring', time: 'Dawn', quality: 'Beginning, breath, emergence' },
];

/* ─── Main compass points ─── */
interface CompassElement {
  element: string;
  elementKey: string;
  direction: string;
  mantra: string;
  angle: number;
  description: string;
}

const COMPASS_ELEMENTS: CompassElement[] = [
  { element: 'Earth', elementKey: 'earth', direction: 'North', mantra: '"I endure."', angle: -90, description: 'Grounded, steadfast, the foundation of all things.' },
  { element: 'Air', elementKey: 'air', direction: 'East', mantra: '"I begin."', angle: 0, description: 'Expansive, visionary, the breath of new beginnings.' },
  { element: 'Fire', elementKey: 'fire', direction: 'South', mantra: '"I transform."', angle: 90, description: 'Passionate, transformative, the spark of creation.' },
  { element: 'Water', elementKey: 'water', direction: 'West', mantra: '"I release."', angle: 180, description: 'Fluid, intuitive, the depth of feeling.' },
];

/* ─── Component ─── */
interface ElementalCompassProps {
  /** When true, omits the large page title (used inside the Philosophy guide page). */
  embedded?: boolean;
}

const ElementalCompass: React.FC<ElementalCompassProps> = ({ embedded = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeElement, setActiveElement] = useState<string>('fire');
  const [selectedSubtype, setSelectedSubtype] = useState<SubtypeCompassData | null>(FIRE_SUBTYPES[0]);
  const [hoveredSubtype, setHoveredSubtype] = useState<string | null>(null);
  const [expandedSacred, setExpandedSacred] = useState(true);
  const [expandedQuadrants, setExpandedQuadrants] = useState(false);
  const hoverClearRef = useRef<number | null>(null);
  const [compareA, setCompareA] = useState<SubtypeCompassData | null>(null);
  const [compareB, setCompareB] = useState<SubtypeCompassData | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const compareRef = useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => {
      clearTimeout(timer);
      if (hoverClearRef.current) window.clearTimeout(hoverClearRef.current);
    };
  }, []);

  const handleElementSelect = useCallback((elementKey: string) => {
    setActiveElement(elementKey);
    const subtypes = elementKey === 'fire' ? FIRE_SUBTYPES
      : elementKey === 'water' ? WATER_SUBTYPES
      : elementKey === 'earth' ? EARTH_SUBTYPES
      : AIR_SUBTYPES;
    setSelectedSubtype(subtypes[0]);
  }, []);

  const handleSubtypeClick = useCallback((subtype: SubtypeCompassData) => {
    setSelectedSubtype(subtype);
    setActiveElement(subtype.element);
  }, []);

  const activeSubtypes = activeElement === 'fire' ? FIRE_SUBTYPES
    : activeElement === 'water' ? WATER_SUBTYPES
    : activeElement === 'earth' ? EARTH_SUBTYPES
    : AIR_SUBTYPES;

  const colors = ELEMENT_COLORS[activeElement];

  /* SVG helpers */
  const centerX = 220;
  const centerY = 220;
  const outerRadius = 175;
  const mainRadius = 115;
  const subtypeRadius = 155;

  const getPos = (angle: number, radius: number) => {
    const rad = angle * Math.PI / 180;
    return { x: centerX + Math.cos(rad) * radius, y: centerY + Math.sin(rad) * radius };
  };

  const dirLabels = [
    { label: 'N', x: centerX, y: 22, color: ELEMENT_COLORS.earth.from },
    { label: 'E', x: 424, y: centerY + 5, color: ELEMENT_COLORS.air.from },
    { label: 'S', x: centerX, y: 430, color: ELEMENT_COLORS.fire.from },
    { label: 'W', x: 16, y: centerY + 5, color: ELEMENT_COLORS.water.from },
  ];

  /* ─── Comparison helpers ─── */
  const normalizeAngle = (a: number) => ((a % 360) + 360) % 360;

  const getAngularDiff = (a1: number, a2: number) => {
    const n1 = normalizeAngle(a1);
    const n2 = normalizeAngle(a2);
    const diff = Math.abs(n1 - n2);
    return diff > 180 ? 360 - diff : diff;
  };

  const getRelationship = (a: SubtypeCompassData | null, b: SubtypeCompassData | null) => {
    if (!a || !b) return null;
    if (a.id === b.id) return { type: 'same' as const, label: 'Same Direction', description: 'These are the same subtype\u2014they face the same way.', color: '#6b7280', bgColor: 'from-gray-50 to-gray-100' };
    const diff = getAngularDiff(a.angle, b.angle);
    if (diff >= 150) return { type: 'opposing' as const, label: 'Opposing', description: `These subtypes face nearly opposite directions (${Math.round(diff)}\u00B0 apart). They represent a fundamental tension\u2014what one faces, the other turns away from. This is the axis of transformation: each holds what the other needs.`, color: '#9333ea', bgColor: 'from-purple-50 to-violet-50' };
    if (diff >= 75) return { type: 'complementary' as const, label: 'Complementary', description: `These subtypes face perpendicular directions (${Math.round(diff)}\u00B0 apart). They do not oppose each other\u2014they complete each other. Where one faces forward, the other faces sideways, seeing what the first cannot.`, color: '#2563eb', bgColor: 'from-blue-50 to-indigo-50' };
    if (diff >= 30) return { type: 'adjacent' as const, label: 'Adjacent', description: `These subtypes face nearby but distinct directions (${Math.round(diff)}\u00B0 apart). They share a general orientation but seek different nuances of the same horizon. They understand each other intuitively.`, color: '#059669', bgColor: 'from-emerald-50 to-green-50' };
    return { type: 'neighboring' as const, label: 'Neighboring', description: `These subtypes face nearly the same direction (${Math.round(diff)}\u00B0 apart). They are kindred spirits\u2014oriented toward the same horizon, seeking similar truths through different elemental lenses.`, color: '#d97706', bgColor: 'from-amber-50 to-yellow-50' };
  };

  const relationship = useMemo(() => getRelationship(compareA, compareB), [compareA, compareB]);

  const handleCompareSelect = (slot: 'A' | 'B', subtypeId: string) => {
    const st = ALL_SUBTYPES.find(s => s.id === subtypeId) || null;
    if (slot === 'A') setCompareA(st);
    else setCompareB(st);
  };

  const handleResetCompare = () => {
    setCompareA(null);
    setCompareB(null);
  };

  const handleSwapCompare = () => {
    setCompareA(compareB);
    setCompareB(compareA);
  };


  return (
    <div className="w-full">
      {/* ─── Title (standalone home page only) ─── */}
      {!embedded && (
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-violet-100 mb-6">
            <Compass className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Elemental Directions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Elemental Directions:{' '}
            <span className="block sm:inline bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Where Each Subtype Is Oriented
            </span>
          </h2>
        </div>
      )}

      {/* ─── Sacred Geography of the Self ─── */}
      <div className="max-w-4xl mx-auto mb-14">
        <button
          onClick={() => setExpandedSacred(!expandedSacred)}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-violet-50 via-indigo-50/80 to-purple-50 rounded-2xl border border-violet-200/80 hover:border-violet-300 shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-gray-900">The Sacred Geography of the Self</h3>
          </div>
          {expandedSacred ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {expandedSacred && (
          <div className="mt-4 p-6 md:p-10 bg-white rounded-2xl border border-violet-100 shadow-sm space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-gray-700 leading-relaxed text-lg font-serif italic">
              In every ancient tradition, the elements are tied to directions. Not arbitrary&mdash;essential. The directions are not just points on a compass. They are orientations of the soul.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { dir: 'North', text: 'North is not just cold. It is the place of stillness, of endurance, of the ancestors watching from the dark.', color: ELEMENT_COLORS.earth },
                { dir: 'South', text: 'South is not just warm. It is the place of fire, of action, of the noonday sun at its peak.', color: ELEMENT_COLORS.fire },
                { dir: 'East', text: 'East is not just sunrise. It is the place of beginning, of breath, of light first touching the horizon.', color: ELEMENT_COLORS.air },
                { dir: 'West', text: 'West is not just sunset. It is the place of release, of letting go, of water meeting the great unknown.', color: ELEMENT_COLORS.water },
              ].map(item => (
                <div key={item.dir} className="p-4 rounded-xl border border-gray-100" style={{ background: `linear-gradient(135deg, ${item.color.from}08, ${item.color.to}08)` }}>
                  <span className="text-sm font-bold uppercase tracking-wider mb-1 block" style={{ color: item.color.from }}>{item.dir}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
              <p className="text-gray-700 leading-relaxed font-serif italic text-center">
                <span className="font-bold not-italic text-violet-800">Center</span> is not a direction. It is the place where all directions meet. It is you, standing at the axis, choosing which way to face.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Elemental Quadrants Table ─── */}
      <div className="max-w-4xl mx-auto mb-14">
        <button
          onClick={() => setExpandedQuadrants(!expandedQuadrants)}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-br from-white to-violet-50/50 rounded-2xl border border-violet-100 hover:border-violet-200 shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-serif text-gray-900">The Elemental Quadrants</h3>
          </div>
          {expandedQuadrants ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>

        {expandedQuadrants && (
          <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 p-4">
              <span>Element</span>
              <span>Direction</span>
              <span>Season</span>
              <span>Time of Day</span>
              <span>Quality</span>
            </div>
            {QUADRANTS.map((q) => {
              const c = ELEMENT_COLORS[q.element.toLowerCase()];
              return (
                <div key={q.element} className="grid grid-cols-5 p-4 border-b border-gray-100 last:border-0 items-center hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                      {elementIcons[q.element.toLowerCase()]}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{q.element}</span>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{q.direction}</span>
                  <span className="text-gray-600 text-sm">{q.season}</span>
                  <span className="text-gray-600 text-sm">{q.time}</span>
                  <span className="text-gray-600 text-sm">{q.quality}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Interactive Compass + Detail Panel ─── */}
      <div className="flex flex-col xl:flex-row items-start justify-center gap-8 mb-14">
        {/* Compass */}
        <div className="flex-shrink-0 mx-auto xl:mx-0" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'scale(1)' : 'scale(0.92)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
          {/* Element selector tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {COMPASS_ELEMENTS.map(ce => {
              const c = ELEMENT_COLORS[ce.elementKey];
              const isActive = activeElement === ce.elementKey;
              return (
                <button
                  key={ce.elementKey}
                  onClick={() => handleElementSelect(ce.elementKey)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${isActive ? 'text-white shadow-lg scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                  style={isActive ? { background: `linear-gradient(135deg, ${c.from}, ${c.to})`, borderColor: c.from } : undefined}
                >
                  {elementIcons[ce.elementKey]}
                  <span className="hidden sm:inline">{ce.element}</span>
                </button>
              );
            })}
          </div>

          <svg width="440" height="440" viewBox="0 0 440 440" className="drop-shadow-xl">
            <defs>
              <radialGradient id="cBg2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#f5f3ff" />
                <stop offset="100%" stopColor="#ede9fe" />
              </radialGradient>
              {Object.entries(ELEMENT_COLORS).map(([key, c]) => (
                <linearGradient key={`g-${key}`} id={`cGrad-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={c.from} />
                  <stop offset="100%" stopColor={c.to} />
                </linearGradient>
              ))}
              {Object.entries(ELEMENT_COLORS).map(([key, c]) => (
                <filter key={`glow-${key}`} id={`cGlow-${key}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feFlood floodColor={c.from} floodOpacity="0.5" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              ))}
              <filter id="cShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Outer rings */}
            <circle cx={centerX} cy={centerY} r={205} fill="none" stroke="#c4b5d6" strokeWidth="1.5" opacity="0.4" />
            <circle cx={centerX} cy={centerY} r={200} fill="url(#cBg2)" stroke="#c4b5fd" strokeWidth="2" />

            {/* Tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 - 90) * (Math.PI / 180);
              const isCardinal = i % 9 === 0;
              const innerR = isCardinal ? 182 : 192;
              const outerR = 200;
              const cardinalColors = [ELEMENT_COLORS.earth.from, ELEMENT_COLORS.air.from, ELEMENT_COLORS.fire.from, ELEMENT_COLORS.water.from];
              const tickColor = isCardinal ? cardinalColors[Math.floor(i / 9)] : '#d4ccd6';
              return <line key={`t-${i}`} x1={centerX + Math.cos(angle) * innerR} y1={centerY + Math.sin(angle) * innerR} x2={centerX + Math.cos(angle) * outerR} y2={centerY + Math.sin(angle) * outerR} stroke={tickColor} strokeWidth={isCardinal ? 2.5 : 0.8} />;
            })}

            {/* Cross lines */}
            <line x1={centerX} y1={centerY - outerRadius} x2={centerX} y2={centerY + outerRadius} stroke="#d4ccd6" strokeWidth="0.5" opacity="0.35" />
            <line x1={centerX - outerRadius} y1={centerY} x2={centerX + outerRadius} y2={centerY} stroke="#d4ccd6" strokeWidth="0.5" opacity="0.35" />
            {[45, 135, 225, 315].map(deg => {
              const rad = deg * Math.PI / 180;
              const r = outerRadius * 0.55;
              return <line key={`d-${deg}`} x1={centerX + Math.cos((deg - 180) * Math.PI / 180) * r} y1={centerY + Math.sin((deg - 180) * Math.PI / 180) * r} x2={centerX + Math.cos(rad) * r} y2={centerY + Math.sin(rad) * r} stroke="#ddd4de" strokeWidth="0.5" opacity="0.25" />;
            })}

            {/* Inner circles */}
            <circle cx={centerX} cy={centerY} r={80} fill="none" stroke="#ddd4de" strokeWidth="0.5" opacity="0.35" />
            <circle cx={centerX} cy={centerY} r={45} fill="none" stroke="#ddd4de" strokeWidth="0.5" opacity="0.25" />

            {/* Quadrant color washes */}
            {COMPASS_ELEMENTS.map(ce => {
              const c = ELEMENT_COLORS[ce.elementKey];
              const startAngle = ce.angle - 45;
              const endAngle = ce.angle + 45;
              const startRad = startAngle * Math.PI / 180;
              const endRad = endAngle * Math.PI / 180;
              const r = outerRadius;
              const x1 = centerX + Math.cos(startRad) * r;
              const y1 = centerY + Math.sin(startRad) * r;
              const x2 = centerX + Math.cos(endRad) * r;
              const y2 = centerY + Math.sin(endRad) * r;
              const isActive = activeElement === ce.elementKey;
              return <path key={`q-${ce.elementKey}`} d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`} fill={c.from} opacity={isActive ? 0.18 : 0.06} className="transition-opacity duration-500 cursor-pointer" onClick={() => handleElementSelect(ce.elementKey)} />;
            })}

            {/* Main element circles */}
            {COMPASS_ELEMENTS.map((ce, idx) => {
              const pos = getPos(ce.angle, mainRadius);
              const c = ELEMENT_COLORS[ce.elementKey];
              const isActive = activeElement === ce.elementKey;
              return (
                <g key={`el-${ce.elementKey}`} className="cursor-pointer" onClick={() => handleElementSelect(ce.elementKey)} style={{ opacity: isLoaded ? 1 : 0, transition: `opacity 0.5s ease ${0.3 + idx * 0.12}s` }}>
                  {isActive && <circle cx={pos.x} cy={pos.y} r={36} fill="none" stroke={c.from} strokeWidth="2" opacity="0.4" className="animate-pulse" />}
                  <circle cx={pos.x} cy={pos.y} r={28} fill="white" stroke={c.from} strokeWidth={isActive ? 3 : 1.5} filter={isActive ? `url(#cGlow-${ce.elementKey})` : 'url(#cShadow)'} className="transition-all duration-300" />
                  <circle cx={pos.x} cy={pos.y} r={isActive ? 25 : 23} fill={`url(#cGrad-${ce.elementKey})`} opacity={isActive ? 0.3 : 0.12} className="transition-all duration-300" />
                  <foreignObject x={pos.x - 15} y={pos.y - 15} width="30" height="30" className="pointer-events-none">
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform duration-300"
                      style={{ color: c.from, transform: isActive ? 'scale(1.15)' : 'scale(1)', filter: isActive ? `drop-shadow(0 0 5px ${c.from}80)` : 'none' }}
                    >
                      {elementIconsLg[ce.elementKey]}
                    </div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Subtype dots for active element */}
            {activeSubtypes.map((st, idx) => {
              const pos = getPos(st.angle, subtypeRadius);
              const c = ELEMENT_COLORS[st.element];
              const isSelected = selectedSubtype?.id === st.id;
              const isHovered = hoveredSubtype === st.id;
              const highlight = isSelected || isHovered;
              return (
                <g
                  key={st.id}
                  className="cursor-pointer"
                  onClick={() => handleSubtypeClick(st)}
                  onMouseEnter={() => { if (hoverClearRef.current) { window.clearTimeout(hoverClearRef.current); hoverClearRef.current = null; } setHoveredSubtype(st.id); }}
                  onMouseLeave={() => { hoverClearRef.current = window.setTimeout(() => { setHoveredSubtype(null); hoverClearRef.current = null; }, 80); }}
                  style={{ opacity: isLoaded ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + idx * 0.1}s` }}
                >
                  {highlight && <circle cx={pos.x} cy={pos.y} r={22} fill="none" stroke={c.from} strokeWidth="2" opacity="0.5" className="animate-pulse" />}
                  <circle cx={pos.x} cy={pos.y} r={16} fill="white" stroke={c.from} strokeWidth={highlight ? 2.5 : 1.5} filter={highlight ? `url(#cGlow-${st.element})` : 'url(#cShadow)'} className="transition-all duration-300" />
                  <circle cx={pos.x} cy={pos.y} r={highlight ? 13 : 11} fill={`url(#cGrad-${st.element})`} opacity={highlight ? 0.45 : 0.2} className="transition-all duration-300" />
                  {/* Subtype initial */}
                  <text x={pos.x} y={pos.y + 4.5} textAnchor="middle" fill={c.from} fontSize={highlight ? '12' : '10'} fontWeight="700" className="font-serif pointer-events-none transition-all duration-200">
                    {st.name.split(' ').map(w => w[0]).join('')}
                  </text>
                </g>
              );
            })}

            {/* Subtype name labels */}
            {activeSubtypes.map((st) => {
              const pos = getPos(st.angle, subtypeRadius + 24);
              const c = ELEMENT_COLORS[st.element];
              const isSelected = selectedSubtype?.id === st.id;
              // Determine text anchor based on angle
              let anchor = 'middle';
              if (st.angle > -80 && st.angle < 80) anchor = 'start';
              if (st.angle > 100 || st.angle < -100) anchor = 'end';
              return (
                <text
                  key={`lbl-${st.id}`}
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor={anchor as any}
                  fill={isSelected ? c.from : '#6b7280'}
                  fontSize="10"
                  fontWeight={isSelected ? '700' : '500'}
                  className="font-serif pointer-events-none transition-all duration-200"
                  opacity={isSelected ? 1 : 0.8}
                >
                  {st.name}
                </text>
              );
            })}

            {/* Cardinal direction letters */}
            {dirLabels.map(d => (
              <text key={d.label} x={d.x} y={d.y} textAnchor="middle" fill={d.color} fontSize="15" fontWeight="700" className="font-serif" opacity="0.85">{d.label}</text>
            ))}

            {/* Center compass rose */}
            <g>
              <polygon points={`${centerX},${centerY - 28} ${centerX - 8},${centerY} ${centerX + 8},${centerY}`} fill={ELEMENT_COLORS.earth.from} opacity="0.85" />
              <polygon points={`${centerX},${centerY + 28} ${centerX - 8},${centerY} ${centerX + 8},${centerY}`} fill={ELEMENT_COLORS.fire.from} opacity="0.85" />
              <polygon points={`${centerX + 28},${centerY} ${centerX},${centerY - 8} ${centerX},${centerY + 8}`} fill={ELEMENT_COLORS.air.from} opacity="0.8" />
              <polygon points={`${centerX - 28},${centerY} ${centerX},${centerY - 8} ${centerX},${centerY + 8}`} fill={ELEMENT_COLORS.water.from} opacity="0.8" />
              <circle cx={centerX} cy={centerY} r={8} fill="white" stroke={colors.from} strokeWidth="2" />
              <circle cx={centerX} cy={centerY} r={4} fill={colors.from} />
            </g>
          </svg>

          {/* Compass legend */}
          <p className="text-xs text-gray-400 text-center mt-3 italic">
            Click an element tab to explore its subtypes on the compass. Click a subtype dot for details.
          </p>
        </div>

        {/* ─── Detail Panel ─── */}
        <div className="w-full xl:w-[420px] min-h-[400px]" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateX(0)' : 'translateX(20px)', transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s' }}>
          {/* Selected subtype detail — selection is on the wheel (no duplicate subtype grid) */}
          {selectedSubtype && (
            <div className="rounded-2xl border-2 bg-white shadow-md overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300" style={{ borderColor: `${ELEMENT_COLORS[selectedSubtype.element].from}40` }}>
              {/* Header */}
              <div className="p-5 text-white" style={{ background: `linear-gradient(135deg, ${ELEMENT_COLORS[selectedSubtype.element].from}, ${ELEMENT_COLORS[selectedSubtype.element].to})` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-white/20 rounded-md text-xs font-semibold backdrop-blur-sm">{selectedSubtype.combination}</span>
                  <MapPin className="w-4 h-4 opacity-80" />
                  <span className="text-xs opacity-90">{selectedSubtype.direction}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold">The {selectedSubtype.name}</h3>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {selectedSubtype.meaning ? (
                  <>
                    {/* Meaning */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className="w-4 h-4" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }}>Meaning</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedSubtype.meaning}</p>
                    </div>

                    {/* Orientation */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Compass className="w-4 h-4" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }}>Orientation</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedSubtype.orientation}</p>
                    </div>

                    {/* What You Seek */}
                    <div className="p-3.5 rounded-xl" style={{ background: `linear-gradient(135deg, ${ELEMENT_COLORS[selectedSubtype.element].from}08, ${ELEMENT_COLORS[selectedSubtype.element].to}08)` }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Eye className="w-4 h-4" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }}>What You Seek</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{selectedSubtype.whatYouSeek}</p>
                    </div>

                    {/* Shadow Orientation */}
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Shadow Orientation</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">{selectedSubtype.shadowOrientation}</p>
                    </div>

                    {/* Affirmation */}
                    <div className="p-4 rounded-xl border-2 text-center" style={{ borderColor: `${ELEMENT_COLORS[selectedSubtype.element].from}30`, background: `linear-gradient(135deg, ${ELEMENT_COLORS[selectedSubtype.element].from}05, ${ELEMENT_COLORS[selectedSubtype.element].to}05)` }}>
                      <Quote className="w-5 h-5 mx-auto mb-2" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }} />
                      <p className="font-serif text-base font-semibold italic" style={{ color: ELEMENT_COLORS[selectedSubtype.element].from }}>
                        "{selectedSubtype.affirmation}"
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ELEMENT_COLORS[selectedSubtype.element].from}15, ${ELEMENT_COLORS[selectedSubtype.element].to}15)` }}>
                      {elementIconsLg[selectedSubtype.element]}
                    </div>
                    <p className="text-gray-500 text-sm italic">Detailed orientation content for {selectedSubtype.name} coming soon.</p>
                    <p className="text-gray-400 text-xs mt-1">Direction: {selectedSubtype.direction}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ─── COMPARE DIRECTIONS ─── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto mb-14" ref={compareRef}>
        <button
          onClick={() => { setCompareOpen(!compareOpen); if (!compareOpen && !compareA) { setCompareA(FIRE_SUBTYPES[1]); setCompareB(EARTH_SUBTYPES[0]); } }}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-violet-50 via-purple-50/60 to-indigo-50 rounded-2xl border border-violet-200 hover:border-violet-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-serif text-gray-900">Compare Directions</h3>
              <p className="text-sm text-gray-500 mt-0.5">Select two subtypes to see how their orientations relate</p>
            </div>
          </div>
          {compareOpen ? <ChevronUp className="w-5 h-5 text-violet-400" /> : <ChevronDown className="w-5 h-5 text-violet-400" />}
        </button>

        {compareOpen && (
          <div className="mt-4 bg-white rounded-2xl border border-violet-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Selectors row */}
            <div className="p-5 md:p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
                {/* Selector A */}
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">First Subtype</label>
                  <select
                    value={compareA?.id || ''}
                    onChange={(e) => handleCompareSelect('A', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:border-violet-400 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Choose a subtype...</option>
                    {[{ label: 'Fire — South', items: FIRE_SUBTYPES }, { label: 'Water — West', items: WATER_SUBTYPES }, { label: 'Earth — North', items: EARTH_SUBTYPES }, { label: 'Air — East', items: AIR_SUBTYPES }].map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.items.map(st => (
                          <option key={st.id} value={st.id}>{st.name} ({st.combination})</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Swap + Reset buttons */}
                <div className="flex items-center gap-2 md:pb-0.5">
                  <button onClick={handleSwapCompare} className="p-2.5 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50 transition-all" title="Swap subtypes">
                    <ArrowLeftRight className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={handleResetCompare} className="p-2.5 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all" title="Reset comparison">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Selector B */}
                <div className="flex-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Second Subtype</label>
                  <select
                    value={compareB?.id || ''}
                    onChange={(e) => handleCompareSelect('B', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-medium text-sm focus:outline-none focus:border-violet-400 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Choose a subtype...</option>
                    {[{ label: 'Fire — South', items: FIRE_SUBTYPES }, { label: 'Water — West', items: WATER_SUBTYPES }, { label: 'Earth — North', items: EARTH_SUBTYPES }, { label: 'Air — East', items: AIR_SUBTYPES }].map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.items.map(st => (
                          <option key={st.id} value={st.id}>{st.name} ({st.combination})</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Comparison result */}
            {compareA && compareB && (
              <div className="p-5 md:p-6">
                {/* Relationship badge + Mini compass */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  {/* Mini compass showing both directions */}
                  <div className="flex-shrink-0">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-md">
                      <defs>
                        <radialGradient id="cmpBg" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#f3f0f7" />
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="100" r="95" fill="url(#cmpBg)" stroke="#d4ccd6" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e0ea" strokeWidth="0.8" />
                      {/* Tick marks */}
                      {[0, 90, 180, 270].map(deg => {
                        const rad = (deg - 90) * Math.PI / 180;
                        return <line key={deg} x1={100 + Math.cos(rad) * 82} y1={100 + Math.sin(rad) * 82} x2={100 + Math.cos(rad) * 95} y2={100 + Math.sin(rad) * 95} stroke="#bbb0c8" strokeWidth="2" />;
                      })}
                      {/* Cardinal labels */}
                      <text x="100" y="16" textAnchor="middle" fill={ELEMENT_COLORS.earth.from} fontSize="11" fontWeight="700" className="font-serif">N</text>
                      <text x="100" y="196" textAnchor="middle" fill={ELEMENT_COLORS.fire.from} fontSize="11" fontWeight="700" className="font-serif">S</text>
                      <text x="192" y="104" textAnchor="middle" fill={ELEMENT_COLORS.air.from} fontSize="11" fontWeight="700" className="font-serif">E</text>
                      <text x="8" y="104" textAnchor="middle" fill={ELEMENT_COLORS.water.from} fontSize="11" fontWeight="700" className="font-serif">W</text>
                      {/* Arc between the two directions */}
                      {(() => {
                        const cA = ELEMENT_COLORS[compareA.element];
                        const cB = ELEMENT_COLORS[compareB.element];
                        const r = 65;
                        const a1 = compareA.angle * Math.PI / 180;
                        const a2 = compareB.angle * Math.PI / 180;
                        const x1 = 100 + Math.cos(a1) * r;
                        const y1 = 100 + Math.sin(a1) * r;
                        const x2 = 100 + Math.cos(a2) * r;
                        const y2 = 100 + Math.sin(a2) * r;
                        const diff = getAngularDiff(compareA.angle, compareB.angle);
                        const largeArc = diff > 180 ? 1 : 0;
                        // Determine sweep direction
                        const nA = normalizeAngle(compareA.angle);
                        const nB = normalizeAngle(compareB.angle);
                        const clockwise = ((nB - nA + 360) % 360) <= 180 ? 1 : 0;
                        return (
                          <>
                            {/* Arc */}
                            <path
                              d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${clockwise} ${x2} ${y2}`}
                              fill="none"
                              stroke={relationship?.color || '#9333ea'}
                              strokeWidth="2.5"
                              strokeDasharray="6 3"
                              opacity="0.6"
                            />
                            {/* Angle label at midpoint of arc */}
                            {(() => {
                              const midAngle = (compareA.angle + compareB.angle) / 2;
                              // Adjust if they're on opposite sides
                              const adjustedMid = diff > 180 ? midAngle + 180 : midAngle;
                              const midRad = adjustedMid * Math.PI / 180;
                              const labelR = r - 18;
                              return (
                                <text
                                  x={100 + Math.cos(midRad) * labelR}
                                  y={100 + Math.sin(midRad) * labelR + 4}
                                  textAnchor="middle"
                                  fill={relationship?.color || '#6b7280'}
                                  fontSize="11"
                                  fontWeight="700"
                                  className="font-serif"
                                >
                                  {Math.round(diff)}°
                                </text>
                              );
                            })()}
                            {/* Direction A needle */}
                            <line x1="100" y1="100" x2={100 + Math.cos(a1) * 78} y2={100 + Math.sin(a1) * 78} stroke={cA.from} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                            <circle cx={100 + Math.cos(a1) * 78} cy={100 + Math.sin(a1) * 78} r="6" fill="white" stroke={cA.from} strokeWidth="2" />
                            <text x={100 + Math.cos(a1) * 78} y={100 + Math.sin(a1) * 78 + 3.5} textAnchor="middle" fill={cA.from} fontSize="8" fontWeight="700" className="font-serif">
                              {compareA.name.split(' ').map(w => w[0]).join('')}
                            </text>
                            {/* Direction B needle */}
                            <line x1="100" y1="100" x2={100 + Math.cos(a2) * 78} y2={100 + Math.sin(a2) * 78} stroke={cB.from} strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                            <circle cx={100 + Math.cos(a2) * 78} cy={100 + Math.sin(a2) * 78} r="6" fill="white" stroke={cB.from} strokeWidth="2" />
                            <text x={100 + Math.cos(a2) * 78} y={100 + Math.sin(a2) * 78 + 3.5} textAnchor="middle" fill={cB.from} fontSize="8" fontWeight="700" className="font-serif">
                              {compareB.name.split(' ').map(w => w[0]).join('')}
                            </text>
                            {/* Center dot */}
                            <circle cx="100" cy="100" r="5" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
                            <circle cx="100" cy="100" r="2.5" fill="#9ca3af" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Relationship info */}
                  {relationship && (
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" style={{ background: `${relationship.color}12`, border: `2px solid ${relationship.color}30` }}>
                        <div className="w-3 h-3 rounded-full" style={{ background: relationship.color }} />
                        <span className="text-sm font-bold" style={{ color: relationship.color }}>{relationship.label}</span>
                        {compareA && compareB && compareA.id !== compareB.id && (
                          <span className="text-xs font-medium text-gray-500">
                            {Math.round(getAngularDiff(compareA.angle, compareB.angle))}° apart
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed font-serif italic">{relationship.description}</p>
                    </div>
                  )}
                </div>

                {/* Split-view comparison cards */}
                <div className="grid md:grid-cols-2 gap-5">
                  {[compareA, compareB].map((st, idx) => {
                    if (!st) return null;
                    const c = ELEMENT_COLORS[st.element];
                    return (
                      <div key={st.id + '-cmp-' + idx} className="rounded-2xl border overflow-hidden" style={{ borderColor: `${c.from}30` }}>
                        {/* Header */}
                        <div className="p-4 text-white" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-semibold">{st.combination}</span>
                            <span className="text-xs opacity-80">{st.direction}</span>
                          </div>
                          <h4 className="text-lg font-serif font-bold">The {st.name}</h4>
                        </div>
                        {/* Content */}
                        <div className="p-4 space-y-3 bg-white">
                          {/* Meaning */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Sparkles className="w-3.5 h-3.5" style={{ color: c.from }} />
                              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.from }}>Meaning</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{st.meaning}</p>
                          </div>
                          {/* Orientation */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Compass className="w-3.5 h-3.5" style={{ color: c.from }} />
                              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.from }}>Orientation</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{st.orientation}</p>
                          </div>
                          {/* What You Seek */}
                          <div className="p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${c.from}08, ${c.to}08)` }}>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Eye className="w-3.5 h-3.5" style={{ color: c.from }} />
                              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.from }}>What You Seek</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{st.whatYouSeek}</p>
                          </div>
                          {/* Shadow */}
                          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-1.5 mb-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-gray-500" />
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Shadow Orientation</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed italic">{st.shadowOrientation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty state */}
            {(!compareA || !compareB) && (
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100">
                  <ArrowLeftRight className="w-7 h-7 text-violet-500" />
                </div>
                <p className="text-gray-600 font-serif italic text-lg mb-2">Select two subtypes above to compare their directions.</p>
                <p className="text-gray-400 text-sm">See how different elemental orientations relate to each other on the compass.</p>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Cardinal directions — reference (subtype detail is in the panel & compare tool above) */}
      <div className="max-w-5xl mx-auto mt-6">
        <h3 className="text-lg font-serif text-gray-900 mb-4 text-center">The four cardinal directions</h3>
        <p className="text-center text-gray-600 text-sm mb-8 max-w-2xl mx-auto">
          Each point on the compass carries a quality and a mantra. Subtype stories live in the interactive panel—this is the map of the whole.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMPASS_ELEMENTS.map((ce) => {
            const c = ELEMENT_COLORS[ce.elementKey];
            const q = QUADRANTS.find((x) => x.element === ce.element);
            return (
              <div
                key={ce.elementKey}
                className="rounded-2xl border overflow-hidden bg-white p-5 shadow-sm"
                style={{ borderColor: `${c.from}30` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                    {elementIconsLg[ce.elementKey]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{ce.direction}</p>
                    <p className="font-serif font-bold text-gray-900">{ce.element}</p>
                  </div>
                </div>
                <p className="text-sm font-serif italic mb-2" style={{ color: c.from }}>{ce.mantra}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{ce.description}</p>
                {q && (
                  <p className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                    <span className="font-medium text-gray-700">{q.season}</span> · {q.time} · {q.quality}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom note — all four elements complete */}
      <div className="max-w-4xl mx-auto mt-14 p-6 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-purple-50 rounded-2xl border border-violet-200/80 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Compass Is Complete</h4>
            <p className="text-gray-600 leading-relaxed">
              All four directions have been mapped. Fire faces south, Water faces west, Earth faces north, and Air faces east. Sixteen subtypes, sixteen orientations, sixteen ways the soul turns toward what it seeks. The compass is not a cage. It is a mirror. Your elemental direction tells you where your soul naturally faces&mdash;but you are always free to turn. Understanding your orientation is the first step toward choosing it consciously.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ElementalCompass;
