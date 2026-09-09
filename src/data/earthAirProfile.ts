import type { EarthProfileData } from '@/lib/earthSubtypeProfilePdfBuilder';

// Consolidated Earth + Air (The Golden Harvest / Warm Autumn) profile content.
export const earthAirProfile: EarthProfileData = {
  subtypeId: 'earth-air',
  name: 'Earth + Air',
  archetype: 'The Golden Harvest',
  seasonalName: 'Warm Autumn',
  tagline: 'Grounded abundance with a light, bright spirit — generous, radiant, and warmly, cleverly alive.',

  heroLabel: 'THE GOLDEN HARVEST',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  EARTH + AIR PROFILE',
  fileName: 'earth-air-golden-harvest-profile.pdf',
  primary: [193, 143, 40],   // Golden Wheat / Amber
  secondary: [122, 92, 40],  // Warm Bronze-Brown
  tertiary: [214, 180, 100],  // Soft Gold
  deepAccent: [150, 100, 30], // Deep Amber

  identityRows: [
    { label: 'Elemental Signature', value: 'Earth + Air (Earth as Dominant, Air as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Warm, golden, clear Autumn (Warm Autumn)' },
    { label: 'Core Mantra', value: '\u201CI AM the golden harvest \u2014 grounded, abundant, and freely giving.\u201D' },
  ],

  essence:
    'Earth at its brightest and most abundant. You have the grounded generosity of Earth, lifted and lightened by Air\u2019s brightness and sociability. Your energy is warm, radiant, and openhandedly giving \u2014 a field of golden wheat swaying in a bright autumn breeze. You don\u2019t hoard; you share. You don\u2019t withdraw; you gather people in. You look best in the warmest, brightest, most golden earthy colors \u2014 golden wheat, warm amber, soft gold, and honeyed bronze \u2014 the luminous palette of a sunlit harvest.',
  essenceHighlightSentence:
    'You look best in the warmest, brightest, most golden earthy colors \u2014 golden wheat, warm amber, soft gold, and honeyed bronze \u2014 the luminous palette of a sunlit harvest.',
  inNature:
    'A golden field of wheat swaying in a clear autumn breeze; the warm, bright light of a harvest afternoon; the abundance of a laden orchard, generous and open to the sky. You are earth in its bright, giving season \u2014 grounded and abundant, but lifted by light and air.',
  themes: ['Abundance', 'Generosity', 'Warmth', 'Radiance', 'Sociability', 'Groundedness'],
  archetypes: ['The Provider', 'The Gracious Host', 'The Bright Cultivator', 'The Generous Giver'],
  feeling: '\u201CI am the golden harvest \u2014 grounded and abundant, sharing my warmth freely with the world.\u201D',
  analogy:
    'Think of a golden harvest field under a bright autumn sky: rooted deep in the earth, yet swaying with light and air, laden with abundance and generous to all who gather. It gives its fruit freely, gathers people to the table, and glows warm in the clear light. This is your energy: grounded, radiant, and openhandedly abundant \u2014 the provider who lights up the room.',

  celebIntro: 'Famous faces who embody the Golden Harvest \u2014 warm, bright, golden coloring that glows in luminous, radiant, generous autumnal tones.',
  celebs: [
    { label: 'Blake Lively', text: 'Warm, bright, golden coloring \u2014 radiant in honeyed gold, warm amber, and camel.' },
    { label: 'Beyonc\u00E9', text: 'Warm, luminous, golden depth that glows in bronze, gold, and rich warm tones.' },
    { label: 'The Gracious Host', text: 'Anyone whose warm, bright presence gathers people in and makes them feel abundant.' },
    { label: 'The Generous Provider', text: 'Anyone who gives freely, feeds everyone, and lights up the room while doing it.' },
  ],

  energyParagraphs: [
    'You are Earth made bright. Where pure Earth is deep and steady, your Earth has been lifted by Air into something radiant and social \u2014 a harvest field rather than a forest floor. You are the warmest and most outgoing of all the Earth types: grounded and abundant, but bright, generous, and gathering.',
    'Air gives your Earth lightness, wit, and connection. You love to gather people, share what you have, and light up a table with warmth and conversation. But unlike pure Air, you are not scattered \u2014 your Earth keeps you rooted, reliable, and truly generous. Your brightness has substance; your generosity has ground.',
    'You are here to provide and to gather. People come to you for warmth, abundance, and the feeling of being welcomed and fed. People remember the golden warmth of your presence: bright, generous, and grounding all at once, like a harvest table laden with plenty and surrounded by good company. You are the provider who lights up the room.',
  ],
  vibration:
    'Warm, bright, and golden, with a grounded steadiness beneath \u2014 a radiant, generous hum like a sunlit field swaying in a clear breeze. The vibration is abundant and warm, rooted but lifted by light.',
  blessing: 'You bless the world by celebrating manifested abundance.',

  seasonalMatch:
    'Earth types belong to the Autumn seasonal color palette, characterized by warm undertones, rich depth, and earthy colors. As Warm Autumn, your palette is the most golden and luminous of all \u2014 warm, bright, and clear, like a sunlit harvest field.',
  keyCharacteristics: [
    'Warm, bright, golden coloring',
    'Luminous, honeyed undertones',
    'Medium depth with warmth and clarity',
    'Looks best in golden, warm, abundant colors',
    'Radiant, generous, and grounded presence',
  ],

  colorPaletteIntro:
    'Your signature Earth + Air palette \u2014 warm, bright, golden earthy colors from wheat, amber, honey, and sunlit harvest. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress in warm, golden abundance.\u201D',
  styleBody:
    'The Golden Harvest approaches style as warm radiance. You are drawn to golden, honeyed, warm colors and pieces that feel generous, bright, and grounded. Golden wheat, warm amber, honey, camel, and terracotta are your language. You dress to feel warm, radiant, and abundant \u2014 grounded but glowing, like a harvest field in the sun.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t feel warm, golden, and generous, it\u2019s not for me.\u201D',
  approachTitle: 'How the Golden Harvest Approaches Color',
  approachLeadHeading: 'The Warm, Golden, Bright Palette',
  approachLead: 'Your colors are not cool \u2014 they are golden. Not muddy \u2014 luminous. Not pale \u2014 warm and clear. You are drawn to the bright, honeyed, abundant colors of the harvest:',
  approachItems: [
    { label: 'Signature', text: 'Golden Wheat, Warm Amber, Honey, Soft Gold: the luminous colors of a sunlit harvest.' },
    { label: 'Anchors', text: 'Camel, Warm Cream, Golden Beige, Honey-Brown: bright, grounded neutrals that hold your glow.' },
    { label: 'Connectors', text: 'Warm Ochre, Apricot, Golden Olive: warm, radiant transitions that keep everything bright.' },
    { label: 'Grounded', text: 'Bronze, Terracotta, Deep Amber: the abundant roots \u2014 warm, golden, and generous.' },
  ],
  approachRules: [
    { title: 'The Temperature Rule', body: 'Your palette is brightly warm. Cool, icy, or grey-based colors dull your natural glow \u2014 you need the golden warmth of sunlight and harvest to radiate.', rule: 'The Rule: \u201CIf it isn\u2019t warm and golden, it\u2019s not for me.\u201D' },
    { title: 'The Clarity Rule', body: 'Your colors should be warm and clear, not muddy or heavily greyed. You carry brightness and luminosity that muted, dull colors would smother.', rule: 'The Rule: \u201CIf it\u2019s too muddy or dull, it\u2019s not speaking my language.\u201D' },
    { title: 'The Abundance Rule', body: 'You come alive in warm, generous, glowing colors and inviting textures. Cold, sparse, or austere pieces feel wrong against your abundant nature.', rule: 'The Rule: \u201CThe more warm and generous, the more like me.\u201D' },
  ],
  assembleTitle: 'How the Golden Harvest Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Warm, Golden, Grounded Abundance',
  assemblePrincipleBody: 'You are about warm, radiant generosity. Your outfit should feel like a sunlit harvest \u2014 golden, warm, and inviting, layered in luminous earth tones with warm, tactile fabrics.',
  assembleFormula: [
    'Anchor (60%): A warm, grounded foundation in your golden neutrals.',
    'Connector (25%): A radiant, tonal layering piece that adds golden warmth.',
    'Grounding (15%): One glowing accent \u2014 amber, terracotta, deep gold \u2014 that lights it up.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Camel or golden-beige trousers + a honey knit: a warm, glowing foundation.' },
    { label: 'Connector', text: 'A warm-ochre or golden-olive layer: a radiant, tonal transition.' },
    { label: 'Grounding', text: 'An amber scarf or bronze accessory: the warm, generous note that draws people in.' },
  ],
  impactIntro: 'For moments when you need warm authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Warm camel or honey-brown tailoring: a grounded yet radiant foundation.' },
    { label: 'Connector', text: 'Warm gold or bronze accessory: the glowing, refined bridge.' },
    { label: 'Grounding', text: 'A deep amber or terracotta blouse: the warm, luminous note that makes you unforgettable.' },
  ],
  eveningIntro: 'For moments of warmth and celebration:',
  eveningFormula: [
    { label: 'Anchor', text: 'A dress in warm gold or honeyed bronze: the radiant, grounded foundation.' },
    { label: 'Connector', text: 'Warm-gold or amber jewelry: the glowing, generous transition.' },
    { label: 'Grounding', text: 'A tonal wrap in deep amber: the warm richness that makes you positively glow.' },
  ],
  gettingItRightTitle: 'Getting It Right: The Golden Harvest at Their Best',
  gettingItRight: [
    { heading: 'The Right Warmth', body: 'You understand that warm, golden color is your power. A radiant, honeyed outfit is far more beautiful on you than any cool or muted look.', right: 'Camel trousers, a honey knit, and an amber scarf. The whole look glows with golden warmth.', wrong: 'An icy blue or dull grey. The coolness dulls your natural, radiant glow.' },
    { heading: 'The Right Clarity', body: 'You understand your colors should be warm and clear, with luminosity. Muddy, over-greyed tones smother the brightness you carry.', right: 'A clear golden amber that catches the light. Warm and radiant at once.', wrong: 'A heavily greyed, muddy tone that dulls your glow and flattens your warmth.' },
    { heading: 'The Right Accent', body: 'You understand accessories should be warm and glowing, not cold or austere. One radiant, golden piece beats anything icy.', right: 'A warm-gold cuff or an amber pendant. Bright, warm, quietly generous.', wrong: 'A cold, sharp silver piece that fights your golden warmth.' },
  ],
  wearThis: [
    'Warm, golden, luminous colors \u2014 wheat, amber, honey, soft gold',
    'Bright grounded neutrals \u2014 camel, warm cream, golden beige, honey-brown',
    'Radiant warm accents \u2014 warm ochre, apricot, terracotta, bronze',
    'Warm, inviting fabrics \u2014 soft wool, warm knits, suede, linen',
  ],
  avoidThis: [
    'Cool, icy, or grey-based colors that dull your golden glow',
    'Muddy, over-greyed, or dull tones that smother your brightness',
    'Stark black-and-white or cold high contrast',
    'Cold, sparse, austere pieces that fight your abundant warmth',
  ],

  beautyQuote: '\u201CMakeup as Warm, Golden Radiance.\u201D',
  beautyLook: 'The Look: Warm, glowing, and luminous. Skin that looks golden and abundant, with makeup drawn from honey, gold, and warm harvest earth.',
  beautyItems: [
    { label: 'The Canvas', text: 'A warm, radiant finish with a luminous golden glow \u2014 abundant and healthy, never flat.' },
    { label: 'The Eyes', text: 'Warm gold, honeyed bronze, soft copper, and golden olive. Radiant, warm shadows suit you far better than cool greys.' },
    { label: 'The Brows', text: 'Softly defined and warm, in a golden-brown that keeps the face bright.' },
    { label: 'The Lips', text: 'A warm coral, honeyed terracotta, or golden brick \u2014 a satin or glossy finish. Your signature radiant lip.' },
    { label: 'The Cheeks', text: 'Warm peach, apricot, or golden terracotta rather than cool pink. A warm-gold highlighter \u2014 glowing brightly, never icy.' },
  ],

  hairIntro: 'Your warm, golden coloring calls for bright, honeyed, warm hair shades. Choose golden blondes, warm honey browns, rich caramels, and copper-golds, and avoid cool, ashy, or flat shades that dull your natural golden radiance.',
  nailIntro: 'Perfect polish colors for your Earth + Air coloring \u2014 warm, golden, luminous shades from honey, amber, and sunlit harvest that complement your bright, radiant autumnal palette.',
  decorIntro:
    'Your ideal space is warm, bright, and abundant \u2014 golden light, warm earth tones, natural materials, and generous, welcoming spaces made for gathering. Everything should feel radiant, open, and grounded, like a sunlit harvest home with the table always set.',

  habitatIntro:
    'You thrive in warm, bright, sociable spaces \u2014 golden light, natural materials, open rooms made for gathering, and abundance to share. You need warmth, brightness, and company around you. Cold, dark, or isolating environments dim your radiant, generous energy.',
  habitatBullets: [
    'Warm, bright, golden light \u2014 sunlight and warm lamps',
    'Open, welcoming spaces made for gathering people',
    'Natural materials \u2014 warm wood, woven textures, brass',
    'A generous kitchen and table at the heart of the home',
    'Abundance to share \u2014 food, warmth, and good company',
  ],
  habitatWhy: 'Why It Works: The Golden Harvest needs warm, abundant openness \u2014 a bright, welcoming space radiant enough to fill you with warmth and grounded enough to gather everyone you love around the table.',

  hobbiesTitle: 'The Gather & Give Day',
  hobbiesBody:
    'A day of warmth, abundance, and joyful sharing. A morning at the market gathering the makings of a feast. An afternoon cooking generously and preparing to host. An evening surrounded by good company around a full, warm table. You recharge through gathering people, sharing abundance, and the bright joy of hosting and connection.',
  hobbiesBullets: ['Cooking & hosting feasts', 'Entertaining & gathering people', 'Gardening & harvesting', 'Baking & sharing treats', 'Markets, fairs & food culture', 'Crafting gifts for others'],

  loveLanguage: {
    receivesLoveThrough:
      'Being received and celebrated. When someone lets you give \u2014 and then gives back generously in return. When they gather with you, celebrate abundance together, and truly receive your warmth. Love, for you, is shared abundance, warm company, and the joy of a full table surrounded by the people you cherish.',
    nonVerbalCues: 'A warm, bright openness when you feel safe. Generous, joyful acts of provision. Gathering and feeding people, and beaming when they receive it, as your natural language of love.',
  },
  relationships: {
    inLove:
      'In relationships you are the generous provider \u2014 the one who gathers, gives, and celebrates. You love through abundance, warmth, and joyful hosting. You need a partner who receives your generosity fully, gives back in kind, and understands that your open-handed warmth is a deep and grounding form of love.',
    strengthsInRelationship: ['Warm, generous, and joyfully abundant', 'Gathers, celebrates, and creates warmth', 'Grounded and reliable beneath the brightness'],
    growthInRelationship: ['Let yourself receive as freely as you give', 'Ask for what you need rather than only providing', 'Slow down and rest instead of always hosting'],
    friendshipCompatibility:
      'Your friendships are warm, wide, and generous. You are the friend who hosts, connects everyone, and makes people feel welcomed and fed. You bond through gathering, sharing, and the bright, warm joy of good company \u2014 grounded by real loyalty beneath the sparkle.',
  },

  animalAffinity:
    'The Honeybee of the Golden Harvest. The warm, industrious, generous creature that gathers golden abundance and shares it with the whole hive \u2014 social, purposeful, and grounded in tireless, warmhearted work.',

  cinematic:
    'You\u2019re drawn to warm, bright, life-affirming films \u2014 stories of family, feasting, community, and joyful abundance. You love warmth, generosity, and works that celebrate connection, gathering, and the bright, grounded joy of shared life.',
  artisticCorrespondence:
    'Your artistic signature is warm and golden: think sunlit harvest scenes, laden tables, warm golden light, and luminous palettes of wheat, amber, and honey. In music you resonate with warm, bright, uplifting, communal sound. Across all art forms you are the golden harvest \u2014 grounded abundance, shared with joy.',

  lifePurpose: {
    gift: 'You provide and you gather. You share abundance freely and light up the room. Your generosity is a feast. You make people feel welcomed, fed, and celebrated.',
    spiritualPurpose:
      'You are here to be a provider and a gatherer. Your soul came to be the golden harvest \u2014 to grow abundance, to share it freely, and to gather people into warmth and celebration. To feed the world with generosity, to bring light to the table, and to remind others that abundance is meant to be shared. Your purpose is to be the warm, giving heart that fills the room. But you must also learn to receive \u2014 to let yourself be given to, to ask for what you need, and to rest instead of always hosting.',
    soulsAssignment: '\u201CI am here to grow abundance and share it freely \u2014 and to let myself be given to and celebrated in return.\u201D',
    inOneSentence: 'You came to remind the world that abundance is meant to be shared with joy \u2014 and to learn that the one who feeds everyone must also let themselves be fed.',
  },

  mantras: [
    '\u201CTo give abundantly is to serve.\u201D',
    '\u201CNot the empty field, but the golden harvest laden with plenty to share.\u201D',
    '\u201CI am grounded abundance, radiating warmth to all.\u201D',
    '\u201CTo provide is my joy \u2014 and I can receive with joy too.\u201D',
  ],
  mantraMeditation: '\u201CWhat abundance am I sharing, and am I letting any of it nourish me? Where am I giving so much that I\u2019ve forgotten to receive? What do I need that I haven\u2019t asked for?\u201D',
  shadowBalance: 'Shadow Balance: The Golden Harvest must remember that a field that only gives its grain and is never replenished eventually lies fallow. You must learn to receive as well as to give \u2014 to ask for what you need, to let yourself be fed, and to rest instead of endlessly hosting.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the golden harvest \u2014 grounded, abundant, and freely giving.\u201D' },
    { context: 'At Work', sentence: '\u201CLet\u2019s make this generous and warm \u2014 and build it to last.\u201D' },
    { context: 'In Love', sentence: '\u201CI will gather and give to you \u2014 and let you give to me too.\u201D' },
    { context: 'In Crisis', sentence: '\u201CCome to the table. We\u2019ll gather, share, and get through this together.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to receive as freely and joyfully as I give.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'North-by-Northeast \u2014 the bright ground',
  directionAngle: 45,
  earthCompassLabel: 'EARTH',
  directionBullets: [
    { label: 'Direction', text: 'North-by-Northeast (the bright ground). You face north, into abundance, but toward the airy edge where Earth meets Air\u2019s light and connection.' },
    { label: 'The Bright Ground', text: 'The sunlit harvest field; foundation lifted by light. Your direction is toward the place where grounded abundance meets warmth and sharing.' },
    { label: 'Orientation', text: 'You seek abundant permanence \u2014 the generous, the radiant, the grounded plenty that gathers people into warmth and celebration.' },
    { label: 'Shadow Orientation', text: 'When lost, you give so much and gather so tirelessly that you empty your own field \u2014 hosting everyone until nothing is left for you.' },
  ],
  directionClosingQuote: '\u201CI face the bright ground. I honor the harvest that shares its golden abundance with all.\u201D',

  career: {
    drawnTo: ['Chef / Restaurateur', 'Event Host / Planner', 'Teacher / Trainer', 'Community Builder', 'Hospitality Leader', 'Marketer / Communicator', 'Farmer / Grower', 'Nonprofit / Fundraiser'],
    why: 'Careers of provision, gathering, and warm connection. You need work that produces abundance and brings people together, blending grounded reliability with bright sociability. You thrive where generosity, warmth, and hands-on results are valued, and where you can host, feed, and connect.',
  },
  idealWorkTitle: 'The Harvest Table',
  idealWorkBody:
    'Warm, abundant, and people-centered. A culture that values generosity, connection, and tangible results over cold efficiency. You need warmth, social energy, and room to gather and provide. You thrive in hospitality, food, community work, education, and any space where warmth and abundance are honored.',
  idealWorkAvoid: 'Cold, isolating, austere environments with no warmth or gathering, where generosity is treated as a distraction.',
  secretSauceBody:
    'Your generosity is not excess; it is the abundance that makes everything flourish. You need to know that your gather-and-give, warm-and-grounded way of working is a rare gift. You are the one who feeds the team, connects everyone, and creates the warmth that makes people want to stay. Your role is to say \u201CLet\u2019s make this abundant and warm\u201D and to be the golden heart of the table.',
  secretSauceImpression: '\u201CShe\u2019s the reason we all show up. She feeds us, connects us, makes it warm \u2014 and somehow it\u2019s all grounded and gets done.\u201D',
  leadershipTitle: 'The Gracious Host',
  leadershipBody:
    'You lead through warmth, generosity, and grounded gathering. You bring people together, share abundance, and create a warm, welcoming culture that everyone wants to belong to. You don\u2019t lead by pressure; you lead by making people feel welcomed, fed, and part of something abundant.',
  leadershipBlindspots: 'Your generosity can become over-giving and self-neglect, and your warmth can avoid hard truths. Pair your hosting with clear boundaries, honest feedback, and attention to your own replenishment.',

  communicationCallout: 'The Warm Gatherer',
  communication: {
    preferredMedium: 'Warm + social. You communicate best in bright, in-person, gathering settings \u2014 often around food or shared warmth. You connect, include, and put people at ease.',
    strengths: 'Warmth, generosity, and connection. You make everyone feel welcomed and included, communicate with bright ease, and gather people together effortlessly.',
    howOthersReachYou: 'Be warm and receive your generosity graciously. Show up, gather, and give back. Warm, in-person, shared-table connection reaches you far more than cold or transactional exchange.',
  },

  lifeLesson:
    'Your lesson is to receive and to rest. The golden field that feeds everyone must also be replenished; the host who gathers everyone must also be gathered. You must learn to receive as freely as you give, to ask for what you need, and to rest instead of always providing.',
  coreBlocks: [
    'Giving so much you empty your own field',
    'Hosting and providing until there\u2019s nothing left for you',
    'Struggling to receive or ask for what you need',
    'Using warmth to avoid hard truths and boundaries',
  ],
  imbalance:
    'When out of balance, your golden field either over-yields or lies fallow. Over-yielding, you give and host so relentlessly that you deplete \u2014 scattered, spread thin, running on empty. Fallow, you\u2019ve given so long without replenishment that the field goes dry \u2014 dimmed, depleted, and unable to share the warmth that is your gift.',

  healing: [
    'Let yourself receive \u2014 be given to without giving back first',
    'Ask for one thing you need each day',
    'Rest and lie fallow rather than always hosting',
    'Replenish your own field before sharing its abundance',
  ],
  healingCallout: 'Excess: Over-Yielded Field (Spread Too Thin)  /  Deficiency: Fallow Field (The Golden Field Run Dry)',
  calmExcessHeading: 'To Clear Excess \u2014 Over-Giving & Scattering',
  calmExcessIntro: 'When your golden field over-yields \u2014 scattered, spread thin, and depleted from endless giving \u2014 the goal is to gather, ground, and contain:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Ashwagandha & Holy Basil \u2014 to steady scattered energy and restore grounded calm.' },
    { label: 'Nutrients', text: 'B-vitamins and steadying, grounding foods to refill depleted, over-spent reserves.' },
    { label: 'Diet', text: 'Regular, grounding meals; stop grazing and giving your own food away \u2014 sit and be nourished.' },
    { label: 'Movement', text: 'Grounding, rhythmic movement rather than scattered busyness to gather your energy back.' },
    { label: 'Containment', text: 'Practice saying no and keeping some of the harvest for yourself.' },
  ],
  rebuildHeading: 'To Replenish Deficiency \u2014 Fallow & Depletion',
  rebuildIntro: 'When your field lies fallow \u2014 dimmed, dry, and depleted from over-provision \u2014 the goal is to replenish, receive, and restore warmth:',
  rebuildItems: [
    { label: 'Herbs', text: 'Nettle & Oatstraw \u2014 to remineralize, rebuild, and restore your depleted golden warmth.' },
    { label: 'Nourishment', text: 'Warm, abundant, mineral-rich meals \u2014 let someone else cook for you and refill the field.' },
    { label: 'Reconnection', text: 'Let yourself be hosted, fed, and celebrated; receive care without earning it first.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Generous, gathering, nature-based practice \u2014 hosting, feeding, harvesting \u2014 that honors abundance and the earth.' },
    { label: 'Balancing (Counter-Energy)', text: 'Receiving and rest. Let yourself be given to; lie fallow; ask for what you need.' },
    { label: 'Ritual', text: 'Harvest rituals \u2014 a gratitude feast where you also let yourself be served \u2014 to honor giving and receiving alike.' },
  ],

  biorhythmRhythmHeading: 'The Seasonal & Circadian Rhythm',
  chronotype: 'Warm and social \u2014 energy runs bright and steady through the day, peaking in warm, gathering, midday-to-evening hours. Needs replenishing rest between giving.',
  peakTime: 'Midday to Early Evening. Your warm, generous energy is brightest when gathering and providing.',
  biorhythmScheduleIntro: 'Peak time: 11 AM\u20136 PM \u2014 warm, bright, generous energy for gathering, providing, and connecting.',
  biorhythmSchedule: [
    'Morning \u2014 Warm, grounded start. Ease in with warmth and a nourishing meal for yourself.',
    '11 AM\u20132 PM \u2014 Bright, generous peak. Gathering, providing, and warm connection.',
    '2\u20134 PM \u2014 A sustained warm window. Hands-on abundance and hosting prep.',
    '4\u20136 PM \u2014 The golden gathering hour. Feeding, celebrating, and bringing people together.',
    'Evening \u2014 Warm wind-down \u2014 and crucially, rest. Let the field lie fallow and be replenished.',
  ],
  newYearResolution: 'This year, replenish your field. Receive as freely as you give, ask for what you need, and let yourself rest between harvests.',

  ultimateGoal:
    'To become the Abundant Provider \u2014 whose warm, generous presence gathers and feeds everyone around it, radiates grounded abundance, and celebrates the harvest of life, while learning to receive, to rest, and to replenish the golden field that gives so much.',
  finalSummary: [
    'The Golden Harvest is not merely warm \u2014 it is a generous, abundant force of grounded radiance. Your gift is not the empty field or the fleeting spark, but the golden harvest laden with plenty to share. You provide, you gather, and you light up the room with warmth. Your purpose is to grow abundance and share it freely \u2014 and in doing so, to make the world warmer, fuller, and more connected for everyone at your table.',
    'But the deepest truth of your nature is this: even the golden field must be replenished. To give without depleting; to gather without emptying yourself; to feed others while letting yourself be fed. When you learn to receive and rest as well as to provide, you become the most radiant presence in any room: the abundant, grounded heart that gathers everyone into warmth \u2014 and stays golden and full.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Earth + Air nature is a sacred force \u2014 not a field to be exhausted, but a golden harvest to be honored. Wear your colors like a sunlit harvest at its peak, share your warmth wherever you go, and remember: the one who gathers and feeds everyone deserves to be gathered and fed in return.',
};
