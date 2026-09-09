import type { WaterProfileData } from '@/lib/waterSubtypeProfilePdfBuilder';

// Consolidated Water + Fire (The Sun-Dappled Pond / Cool Summer) profile content.
// Mirrors the Water + Air profile shape/layout for the downloadable PDF.
export const waterFireProfile: WaterProfileData = {
  subtypeId: 'water-fire',
  name: 'Water + Fire',
  archetype: 'The Sun-Dappled Pond',
  seasonalName: 'Cool Summer',
  tagline: 'Cool, reflective depth with warm flashes beneath the surface — magnetic, nostalgic, and quietly intense.',

  heroLabel: 'THE SUN-DAPPLED POND',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  WATER + FIRE PROFILE',
  fileName: 'water-fire-sun-dappled-pond-profile.pdf',
  primary: [100, 149, 237],   // Cool Blue
  secondary: [218, 112, 214], // Orchid
  tertiary: [196, 100, 124],  // Raspberry
  deepAccent: [61, 79, 111],  // Soft Navy

  identityRows: [
    { label: 'Elemental Signature', value: 'Water + Fire (Water as Dominant, Fire as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Cool Summer at its clearest (Cool Summer)' },
    { label: 'Core Mantra', value: '\u201CI AM the still pond that holds the sun.\u201D' },
  ],

  essence:
    'Water carrying a hidden ember. You have the emotional depth and reflective calm of Water, warmed and defined by Fire\u2019s quiet intensity. Your energy is magnetic \u2014 still on the surface, passionate underneath, like a golden pond warmed by the lingering sun. Your emotion is intense yet bittersweet, your passion mellowed by Water into a calm, grounded maturity. You have the warmest coloring of all Water types, and you look best in the bolder, intense cool tones \u2014 cool blue, orchid, raspberry, and deep berry \u2014 strong but beautifully muted, as though sunlight were glowing deep beneath still water.',
  essenceHighlightSentence:
    'You have the warmest coloring of all Water types, and you look best in the bolder, intense cool tones \u2014 cool blue, orchid, raspberry, and deep berry \u2014 strong but beautifully muted, as though sunlight were glowing deep beneath still water.',
  inNature:
    'The gold-dappled pond at sunset; the bioluminescent waves of summer glowing in the night ocean; a clear mountain spring emerging from volcanic rock. You are Water with Fire\u2019s intensity hidden beneath a calm, nostalgic, warm surface.',
  themes: ['Clarity', 'Depth', 'Intensity', 'Refinement', 'Nostalgia', 'Warmth'],
  archetypes: ['The Reflective Storyteller', 'The Gentle Artist', 'The Mellow Strategist', 'The Hidden Gold'],
  feeling: '\u201CI am the still pond that holds the sun \u2014 calm on top, glowing underneath.\u201D',
  analogy:
    'Think of a pond at golden hour. The surface is calm and cool, but sunlight penetrates deep, warming and illuminating the water from within. It doesn\u2019t blaze; it glows. This is your energy: reflective and cool on the surface, but carrying a warm, passionate intensity that flickers in the depths.',

  celebIntro: 'Famous faces who embody the Sun-Dappled Pond \u2014 cool, clear coloring with refined elegance and a warm, magnetic glow that comes alive in cool blues, roses, and berries.',
  celebs: [
    { label: 'Naomi Watts', text: 'Cool, clear coloring with refined elegance \u2014 beautiful in rose pink and cool blue.' },
    { label: 'Diane Kruger', text: 'Cool Summer with clear undertones and a sophisticated, magnetic warmth.' },
    { label: 'Grace Kelly', text: 'The archetype of cool composure with a warm inner glow \u2014 serene, intense, unforgettable.' },
    { label: 'The Warm-Cool Muse', text: 'Anyone whose calm surface hides a magnetic, passionate depth people can feel but not name.' },
  ],

  energyParagraphs: [
    'You are Water with Fire\u2019s intensity hidden beneath. Where pure Water is still and cool throughout, your Water holds a warm ember at its core \u2014 sunlight glowing deep beneath a calm surface. You do not blaze into a room; you glow steadily, magnetically, drawing people toward a warmth they can sense but not quite see.',
    'Fire gives your Water something the others lack: intensity, definition, and the ability to hold passion within depth. From this emerges your gift for magnetic contrast \u2014 calm surface, passionate core \u2014 and a deep, nostalgic warmth that weaves memory, tradition, and beauty into everything you touch.',
    'You are not here to command or to disappear. You are here to hold the warm depths \u2014 to reflect feeling with a golden intensity, to keep the flame of memory and meaning alive, and to create beauty that lingers. People remember the particular warmth of your presence: reflective, intense, and quietly unforgettable.',
  ],
  vibration:
    'Deep, resonant waves with occasional bursts of warm intensity. The vibration is primarily fluid and reflective but punctuated by moments of passionate clarity, like sunlight suddenly penetrating deep water.',
  blessing: 'You bless the world by warming memory into wisdom.',

  seasonalMatch:
    'Water types belong to the Summer seasonal color palette, characterized by cool undertones, soft contrast, and gentle, muted colors. As Cool Summer, your palette is the clearest and slightly more intense end of Water \u2014 cool, but able to carry more saturation and contrast than the other Water subtypes.',
  keyCharacteristics: [
    'Clear cool undertones',
    'Medium contrast coloring',
    'Can wear slightly brighter, more saturated cool colors',
    'Looks best in cool, clear colors with a warm glow beneath',
    'Refined, elegant, and magnetic appearance',
  ],

  colorPaletteIntro:
    'Your signature Water + Fire palette \u2014 cool, clear, reflective colors that can carry more intensity than other Water subtypes, like sunlight glowing deep beneath still water. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress with depth and a hidden glow.\u201D',
  styleBody:
    'The Sun-Dappled Pond approaches style as reflective warmth. You can handle more contrast and intensity than other Water subtypes \u2014 cornflower blue, deep berry, cool plum \u2014 without ever losing your fundamental coolness. Your Fire influence lets you wear bolder silhouettes and sharper tailoring. A structured cool-toned blouse in deep plum is your power uniform. You dress to glow, not to blaze.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t glow with cool depth, it\u2019s not for me.\u201D',
  approachTitle: 'How the Sun-Dappled Pond Approaches Color',
  approachLeadHeading: 'The Glowing Palette',
  approachLead: 'Your colors are cool but able to glow. Not pastel \u2014 clear. Not stark \u2014 refined. You are drawn to cool colors that carry a warm, magnetic depth:',
  approachItems: [
    { label: 'Signature', text: 'Cool Blue, Orchid, Raspberry, Rose Pink: clear cool colors that hold intensity and glow.' },
    { label: 'Anchors', text: 'Soft Navy, Charcoal, Slate: composed cool foundations that let your glow shine.' },
    { label: 'Connectors', text: 'Wisteria, Teal, Cool Gray: refined cool transitions with a hint of warmth.' },
    { label: 'Statement', text: 'Deep Berry, Cool Plum, Fuchsia, Turquoise: the sunlit depth \u2014 your rare, magnetic intensity.' },
  ],
  approachRules: [
    { title: 'The Temperature Rule', body: 'Your palette is cool at its core, even at its most intense. Warm, golden, or earthy colors clash with your cool clarity. When you want warmth, reach for a cool-leaning raspberry or berry rather than anything golden.', rule: 'The Rule: \u201CIf it isn\u2019t cool and clear, it\u2019s not for me.\u201D' },
    { title: 'The Intensity Rule', body: 'Unlike other Water subtypes, you can carry more saturation and contrast. Deep berry, cool plum, and clear cool blue read as powerful on you rather than overwhelming \u2014 as long as they stay cool.', rule: 'The Rule: \u201CI can go deeper and clearer \u2014 as long as it stays cool.\u201D' },
    { title: 'The Glow Rule', body: 'Your best looks glow from within rather than shout. Reflective, refined, cool-toned pieces let your warm inner intensity emerge without breaking your composure.', rule: 'The Rule: \u201CI glow \u2014 I don\u2019t blaze.\u201D' },
  ],
  assembleTitle: 'How the Sun-Dappled Pond Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Cool Composure, One Warm Glow',
  assemblePrincipleBody: 'You are about magnetic depth. Your outfit should feel like a cool, calm surface with one warm, glowing note \u2014 refined and intense, with nothing that breaks the composed surface.',
  assembleFormula: [
    'Anchor (60%): A cool, composed foundation in your Anchor colors.',
    'Connector (25%): A refined cool-toned layering piece.',
    'Glow (15%): One deep, saturated cool accent \u2014 berry, plum, teal \u2014 that glows like sunlight underwater.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Soft navy trousers + a cool grey knit: a composed, cool foundation.' },
    { label: 'Connector', text: 'A cool-blue or wisteria layer: a refined transition.' },
    { label: 'Glow', text: 'A raspberry scarf or orchid blouse: the warm-cool glow people are drawn to.' },
  ],
  impactIntro: 'For moments when you need magnetic authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Cool charcoal or soft-navy tailoring: a composed foundation of quiet power.' },
    { label: 'Connector', text: 'Silver or cool-toned accessory: the refined bridge.' },
    { label: 'Glow', text: 'A deep-plum or cool-berry blouse: the intense note that makes you unforgettable.' },
  ],
  eveningIntro: 'For moments of intimacy and connection:',
  eveningFormula: [
    { label: 'Anchor', text: 'A fluid dress in cool blue or deep berry: the glowing foundation.' },
    { label: 'Connector', text: 'Cool-toned silver or pearl jewelry: the refined transition.' },
    { label: 'Glow', text: 'A whisper of cool shimmer or a duochrome pearl: the sunlit-water glow.' },
  ],
  gettingItRightTitle: 'Getting It Right: The Sun-Dappled Pond at Their Best',
  gettingItRight: [
    { heading: 'The Right Intensity', body: 'You understand you can carry more depth than other Waters. A deep, cool, saturated color reads as magnetic on you \u2014 not overwhelming \u2014 as long as it stays cool.', right: 'Cool navy trousers with a deep-berry blouse and silver accents. Composed, glowing, powerful.', wrong: 'Warm rust or golden mustard. The warmth fights your cool clarity and dulls your glow.' },
    { heading: 'The Right Texture', body: 'You understand your colors need fluid but refined fabrics \u2014 structured silk, fine knit, satin that drapes with a little more substance than other Water types.', right: 'A structured silk blouse in deep plum with a clean drape. Refined and fluid at once.', wrong: 'Heavy, matte, unstructured fabrics that dull your clarity and mute your glow.' },
    { heading: 'The Right Accent', body: 'You understand accessories can be a touch bolder than other Waters, but should still glow cool rather than shout warm.', right: 'A cool-toned statement earring or a deep-berry lip. Magnetic, refined, intense.', wrong: 'Warm gold or amber accessories that clash with your cool, glowing depth.' },
  ],
  wearThis: [
    'Cool, clear colors that can carry intensity \u2014 cool blue, orchid, raspberry, deep berry',
    'Slightly more contrast and saturation than other Water subtypes',
    'Soft navy, charcoal, and slate as your composed cool neutrals',
    'Refined, fluid fabrics \u2014 structured silk, fine knit, satin',
  ],
  avoidThis: [
    'Warm, golden, or earthy palettes that fight your cool clarity',
    'Muddy or overly muted tones that dull your glow',
    'Stark warm brights that break your cool composure',
    'Heavy, matte fabrics that flatten your reflective depth',
  ],

  beautyQuote: '\u201CMakeup as Depth with a Hidden Flame.\u201D',
  beautyLook: 'The Look: Cool, reflective depth with a warm, magnetic flicker. Skin that glows softly, with makeup that carries a little more intensity than other Water types.',
  beautyItems: [
    { label: 'The Canvas', text: 'A luminous, dewy finish with a hint of warmth beneath the cool \u2014 calm on the surface, glowing underneath.' },
    { label: 'The Eyes', text: 'Deeper plums and cool berries can be pushed further than other Waters. A defined liner in deep navy or cool plum, applied with precision.' },
    { label: 'The Brows', text: 'Softly defined \u2014 a touch more shape than pure Water, but still natural.' },
    { label: 'The Lips', text: 'You can venture into cool-toned red and deep berry with authority \u2014 your signature magnetic lip.' },
    { label: 'The Cheeks', text: 'A richer cool-toned rose or berry blush. A duochrome or warm-cool-shift highlighter that catches the light like sunlit water.' },
  ],

  hairIntro: 'Your clear, cool coloring can carry a little more richness than other Water types. Choose cool, glowing tones \u2014 cool brunettes, soft cool reds, ashy depth \u2014 and avoid warm, brassy, or golden shades that fight your clarity.',
  nailIntro: 'Perfect polish colors for your Water + Fire coloring \u2014 cool, clear shades that can carry more intensity, from soft rose to deep cool berry, all with your signature reflective glow.',
  decorIntro:
    'Your ideal space is cool and reflective with warm, nostalgic touches \u2014 soft blues and mauve grounded by rich, meaningful objects, golden-hour light, and beautiful things that hold memory. A garden-sanctuary feel: calm, but glowing with warmth and story.',

  habitatIntro:
    'You thrive in cool, calm spaces warmed by beauty and memory \u2014 a garden, a room full of meaningful objects, a place near water with golden light. You recharge in still, atmospheric environments that hold both serenity and warmth. Cold, sterile, or chaotic spaces drain your magnetic depth.',
  habitatBullets: [
    'Soft, warm light \u2014 lamps and golden-hour glow, no harsh overheads',
    'A view of water or a garden if possible',
    'Meaningful objects, photographs, and things that hold memory',
    'A calm corner to reflect, create, and remember',
    'Natural sounds \u2014 water, soft music, the hush of evening',
  ],
  habitatWhy: 'Why It Works: The Sun-Dappled Pond needs a sanctuary that is both calm and warm \u2014 still enough to reflect, warm enough to glow, and rich with the beauty and memory you cherish.',

  hobbiesTitle: 'The Nostalgic Pilgrimage',
  hobbiesBody:
    'A day of beauty, memory, and warm reflection. A slow morning revisiting a beloved place or old photographs. An afternoon by the water creating something beautiful. Evening spent sharing stories, cooking a meaningful recipe, or making art. You recharge through beauty, nostalgia, and the warmth of meaningful connection.',
  hobbiesBullets: ['Storytelling & memoir writing', 'Painting & warm-toned visual art', 'Cooking meaningful, traditional recipes', 'Curating photos, keepsakes & memory', 'Swimming & golden-hour walks', 'Listening to music that holds memory'],

  loveLanguage: {
    receivesLoveThrough:
      'The curation of shared memory. When someone helps you sort old photos, revisits a meaningful place with you, or cooks a family recipe together. When they tell a story about you that highlights your warmth. When they create new traditions that feel timeless. Love, for you, is adding a golden thread to the tapestry of a shared life.',
    nonVerbalCues: 'A warm softening when you feel safe. Sharing a treasured memory or object. Choosing to create beauty or tradition together as a quiet act of love.',
  },
  relationships: {
    inLove:
      'In relationships you are the warm, reflective sanctuary \u2014 the one who weaves memory, beauty, and meaning into the bond. You love through nostalgia, shared traditions, and the beauty you create together. You need a partner who honors your depth, cherishes memory as you do, and understands that your calm surface holds a passionate, glowing intensity.',
    strengthsInRelationship: ['Creates deep emotional warmth and lasting meaning', 'Weaves memory, tradition, and beauty into the bond', 'Reflective, loyal, and quietly passionate'],
    growthInRelationship: ['Let go of nostalgia enough to be fully present now', 'Voice the intensity beneath your calm surface', 'Set boundaries before quiet resentment glows into heat'],
    friendshipCompatibility:
      'Your friendships are gardens of shared memory and beauty. You bond by creating traditions, honoring anniversaries, and building a shared mythology. Your warmth is nostalgic, your loyalty sentimental, and your love expressed through the beauty you create together.',
  },

  animalAffinity:
    'The Golden Koi of the Sun-Dappled Pond. The graceful creature that glides through still water with a warm, glowing color \u2014 calm and unhurried on the surface, but carrying a vivid, magnetic warmth beneath. It belongs to the quiet depths, yet it catches and holds the sun.',

  cinematic:
    'You\u2019re drawn to warm, nostalgic, emotionally resonant films \u2014 memory-soaked stories, golden-hued dramas, and works that find beauty and meaning in the passage of time. You love depth, warmth, and bittersweet emotion over cold spectacle.',
  artisticCorrespondence:
    'Your artistic signature is cool depth lit from within: think golden-hour reflections on water, warm light glowing through cool shadow, and richly nostalgic palettes. In music you resonate with soulful, emotionally warm, memory-laden sound. Across all art forms you are the still surface that holds a hidden, glowing warmth.',

  lifePurpose: {
    gift: 'You hold the warmth of memory. You reflect feeling with a golden intensity. Your depth carries a quiet flame that keeps meaning alive. You help people feel cherished and remembered.',
    spiritualPurpose:
      'You are here to be a keeper of warmth and memory. Your soul came to hold the sunlit depths \u2014 the place where feeling, beauty, and meaning glow beneath a calm surface. To weave the threads of memory into wisdom, and to keep the flame of what matters alive. Your purpose is to be the glow that makes depth feel warm. But you must also learn to live fully in the present \u2014 to let the glow be for now, not only for what was.',
    soulsAssignment: '\u201CI am here to warm the depths of the world \u2014 and to let the sun shine on the present, not only the past.\u201D',
    inOneSentence: 'You came to remind the world that depth can be warm \u2014 and to learn that the glow is meant for this moment, too.',
  },

  mantras: [
    '\u201CTo remember is to keep the flame alive.\u201D',
    '\u201CNot the blaze, but the sunlit water that glows from within.\u201D',
    '\u201CI am the calm surface that holds a warm, magnetic depth.\u201D',
    '\u201CTo feel intensely is not to burn \u2014 I can hold the flame beneath still water.\u201D',
  ],
  mantraMeditation: '\u201CWhat memory needs to be honored today? Where can I bring warmth to depth? What is my calm surface hiding that wants to glow?\u201D',
  shadowBalance: 'Shadow Balance: The Sun-Dappled Pond must remember that a pond fixed on the past cannot hold the present sun. You must learn to let the glow be for now \u2014 to live in this moment\u2019s warmth, not only the golden light of memory.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the still pond that holds the sun.\u201D' },
    { context: 'At Work', sentence: '\u201CBefore we move on, let\u2019s honor what we\u2019ve built and learn from it.\u201D' },
    { context: 'In Love', sentence: '\u201CYou are woven into my story \u2014 and I want to keep adding to it.\u201D' },
    { context: 'In Crisis', sentence: '\u201CLet\u2019s slow down, feel the depth, and find the warmth in this.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to let the sun glow on now, not only then.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'West-by-Southwest \u2014 the sunlit deep',
  directionAngle: -22.5,
  waterCompassLabel: 'WATER',
  directionBullets: [
    { label: 'Direction', text: 'West-by-Southwest (the sunlit deep). You face west, into depth, but toward the warm edge where Water meets Fire\u2019s glow.' },
    { label: 'The Sunlit Deep', text: 'The pond lit from within; the warm current beneath the cool surface. Your direction is toward the place where depth and warmth meet.' },
    { label: 'Orientation', text: 'You seek meaning and warmth in depth \u2014 the beauty, memory, and quiet passion that glow beneath a calm surface.' },
    { label: 'Shadow Orientation', text: 'When lost, you sink into the golden past so fully that you miss the sun shining on the present.' },
  ],
  directionClosingQuote: '\u201CI face the sunlit deep. I honor the warmth that glows within the still water.\u201D',

  career: {
    drawnTo: ['Artist / Painter', 'Writer / Storyteller', 'Curator / Archivist', 'Historian', 'Therapist', 'Chef', 'Designer', 'Cultural Steward'],
    why: 'Careers of beauty, memory, and meaningful depth. You need work that honors emotion, tradition, and craft, and lets you translate feeling into something lasting and beautiful. You thrive where warmth and depth are valued together.',
  },
  idealWorkTitle: 'The Hearth',
  idealWorkBody:
    'Warm, human-centered, and meaningful. A culture that values relationships, tradition, and craft over cold efficiency. You need psychological safety, room to reflect, and work that carries meaning. You thrive in the arts, culture, hospitality, counseling, and any space that treats warmth and depth as strengths.',
  idealWorkAvoid: 'Cold, transactional, churn-and-burn environments where memory is dismissed and everything meaningful is treated as sentimentality.',
  secretSauceBody:
    'Your sentimentality is not impracticality; it is cultural continuity. You need to know that your attention to tradition, legacy, and interpersonal history is not \u201Cresistance to change.\u201D You are the keeper of organizational memory and the weaver of cultural cohesion. Your role is to say \u201CBefore we move forward, let\u2019s honor what we\u2019ve built and learn from it\u201D \u2014 which prevents the hubris of forgetting.',
  secretSauceImpression: '\u201CShe holds the soul of this team. People feel remembered and valued around her \u2014 and that\u2019s what keeps everyone loyal.\u201D',
  leadershipTitle: 'The Cultural Steward',
  leadershipBody:
    'You lead through warmth, memory, and meaning. You hold the story of a team \u2014 its history, its values, its relationships \u2014 and you keep the culture warm and cohesive. You don\u2019t drive through force; you glow, and people gather around the warmth. They follow you because they feel cherished and because you keep what matters alive.',
  leadershipBlindspots: 'Your reverence for the past can resist necessary change, and your warmth can blur hard decisions. Pair your loyalty to memory with a willingness to let go and move forward when the moment calls for it.',

  communicationCallout: 'The Narrative Weaver',
  communication: {
    preferredMedium: 'Warm + Story-led. You communicate best through story, memory, and meaningful, unhurried conversation, where feeling and context can be woven in. You reach the truth through narrative, not bullet points.',
    strengths: 'Warmth, storytelling, and the ability to make people feel valued and remembered. You give words to shared meaning and weave people into a common story.',
    howOthersReachYou: 'Approach with warmth and context, not cold efficiency. Honor the history and meaning behind a decision. A meaningful, unhurried conversation reaches you far better than a blunt, transactional exchange.',
  },

  lifeLesson:
    'Your lesson is to let the sun shine on the present. The pond that glows with the memory of past light must also learn to hold today\u2019s sun \u2014 to live fully now, not only in the warm glow of what was. Presence, not only nostalgia, is your growth edge.',
  coreBlocks: [
    'Living in the golden past instead of the present sun',
    'Holding intensity beneath the surface until it quietly resents',
    'Clinging to tradition and memory when change is needed',
    'Letting nostalgia dim your engagement with the now',
  ],
  imbalance:
    'When out of balance, your warm depth becomes stagnant heat \u2014 congested, sentimental, and stuck in the past. You may feel over-saturated with memory and unspoken intensity, unable to move forward. Or your inner glow dims entirely \u2014 leaving you cool, flat, and disconnected from the warmth that makes you magnetic.',

  healing: [
    'Anchor in the present: name one thing you love about now each day',
    'Let the intensity beneath your surface be spoken, not buried',
    'Move with the current \u2014 don\u2019t let warmth stagnate into the past',
    'Return to your still, warm center, then step into today',
  ],
  healingCallout: 'Excess: Circulatory Stagnation (Warmth Stuck in the Past)  /  Deficiency: Dried Up (The Glow Gone Cold)',
  calmExcessHeading: 'To Clear Excess \u2014 Stagnation & Held Intensity',
  calmExcessIntro: 'When your warm depth congests into heaviness, sentimentality, and held intensity, the goal is to move, circulate, and release:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Hawthorn & Ginger \u2014 to support circulation and gently move stagnant warmth.' },
    { label: 'Nutrients', text: 'Omega-3s & magnesium to keep the system flowing and soothe held tension.' },
    { label: 'Diet', text: 'Warm, light, circulation-supporting foods; reduce heavy, comforting foods that deepen stagnation.' },
    { label: 'Movement', text: 'Flowing movement, swimming, and warm walks to keep depth and warmth circulating.' },
    { label: 'Presence', text: 'Present-moment practices \u2014 release the grip of the past and let today\u2019s warmth in.' },
  ],
  rebuildHeading: 'To Rekindle Deficiency \u2014 The Glow Gone Cold',
  rebuildIntro: 'When your inner glow dims into coolness, flatness, and disconnection, the goal is to nourish, warm, and reconnect:',
  rebuildItems: [
    { label: 'Herbs', text: 'Rose & Cinnamon \u2014 to gently rekindle warmth and emotional openness.' },
    { label: 'Nourishment', text: 'Warm broths, healthy fats, and nourishing meals shared with people you love.' },
    { label: 'Reconnection', text: 'Beauty, memory, and warm connection \u2014 revisit what makes you glow and let it warm you now.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Contemplative reflection and creative practice that honors beauty, memory, and feeling.' },
    { label: 'Balancing (Counter-Energy)', text: 'Present-moment grounding and gentle action \u2014 stepping into today\u2019s warmth rather than the past\u2019s glow.' },
    { label: 'Ritual', text: 'Warm water rituals \u2014 a golden-hour bath, tending a garden, or lighting a candle for what you cherish while staying rooted in now.' },
  ],

  biorhythmRhythmHeading: 'The Lunar & Tidal Rhythm',
  chronotype: 'Warm-tidal \u2014 energy rises with the golden light of late afternoon and glows through dusk. Needs gentle, unhurried mornings.',
  peakTime: 'Late Afternoon to Dusk (3\u20137 PM). Your warmth and reflection peak as the light turns golden.',
  biorhythmScheduleIntro: 'Peak time: 3\u20137 PM \u2014 warm, reflective, creative energy that glows as the day\u2019s light softens toward golden hour.',
  biorhythmSchedule: [
    'Morning \u2014 Slow, quiet start. Ease in with tea and reflection; do not rush the glow awake.',
    '10 AM\u201312 PM \u2014 Gentle, reflective energy for calm, meaningful work.',
    '1\u20133 PM \u2014 A softer, lower tide. Honor it with restful, low-stimulation tasks.',
    '3\u20137 PM \u2014 Warm creative peak. Art, storytelling, connection, and your most magnetic work.',
    'Evening \u2014 Golden-hour glow. Beauty, memory, meaningful conversation, then a warm wind-down.',
  ],
  newYearResolution: 'This year, let the sun glow on now. Honor one memory each day, but live fully in today\u2019s warmth.',

  ultimateGoal:
    'To become the Warm Sage \u2014 whose reflective depth glows with warmth, weaves memory into wisdom, and creates the beauty and meaning that endure, while learning to let the sun shine fully on the present moment.',
  finalSummary: [
    'The Sun-Dappled Pond is not merely calm \u2014 it is a magnetic force of warmth and depth. Your gift is not the blaze, but the sunlit water that glows from within. You hold memory, weave meaning, and reflect feeling with a warm intensity that draws people close. Your purpose is to warm the depths of the world \u2014 and in doing so, to keep the flame of what matters alive.',
    'But the deepest truth of your nature is this: the glow is meant for now. To honor memory without living only in it; to feel intensely without burning; to hold the warmth of the past while letting today\u2019s sun shine. When you learn to be fully present as well as deeply reflective, you become the most quietly magnetic presence in any room: the one who makes everyone feel cherished, and who is warmed, at last, by the light of this very moment.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Water + Fire nature is a sacred force \u2014 not a warmth to be cooled, but a glow to be honored. Wear your colors like sunlight on still water, warm the depths wherever you go, and remember: the most magnetic presence in the room is often the calm one glowing quietly from within.',
};
