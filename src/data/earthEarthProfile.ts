import type { EarthProfileData } from '@/lib/earthSubtypeProfilePdfBuilder';

// Consolidated Earth + Earth (The Forest Floor / True Autumn) profile content.
// Mirrors the Water subtype profile shape/layout for the downloadable PDF.
export const earthEarthProfile: EarthProfileData = {
  subtypeId: 'earth-earth',
  name: 'Earth + Earth',
  archetype: 'The Forest Floor',
  seasonalName: 'True Autumn',
  tagline: 'Pure, generative groundedness — fertile, nourishing, and quietly turning endings into new beginnings.',

  heroLabel: 'THE FOREST FLOOR',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  EARTH + EARTH PROFILE',
  fileName: 'earth-earth-forest-floor-profile.pdf',
  primary: [107, 142, 35],   // Forest / Olive Green
  secondary: [93, 64, 25],   // Deep Loam Brown
  tertiary: [154, 168, 112], // Soft Moss
  deepAccent: [45, 80, 22],  // Deep Forest

  identityRows: [
    { label: 'Elemental Signature', value: 'Earth + Earth (Earth as Dominant, Earth as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Warm, rich, deep Autumn (True Autumn)' },
    { label: 'Core Mantra', value: '\u201CI AM the fertile ground where all things grow.\u201D' },
  ],

  essence:
    'Earth at its most pure and generative. You are the fertile soil of the forest floor \u2014 patient, nourishing, and quietly alive with the slow work of turning decay into new life. Your energy is grounded, steady, and abundant. You don\u2019t chase; you cultivate. You don\u2019t rush; you provide. Where others burn, flow, or drift, you simply hold, feed, and grow. You look best in the warm, rich, earthy colors of the deep forest \u2014 olive greens, warm browns, rust, amber, and deep terracotta \u2014 the living palette of soil, bark, and turning leaves.',
  essenceHighlightSentence:
    'You look best in the warm, rich, earthy colors of the deep forest \u2014 olive greens, warm browns, rust, amber, and deep terracotta \u2014 the living palette of soil, bark, and turning leaves.',
  inNature:
    'The rich, dark humus of the forest floor; a bed of fallen leaves slowly composting into loam; the quiet, teeming life beneath the moss. You are the ground itself \u2014 fertile, patient, and endlessly generous \u2014 the place from which all growth begins and to which all things return.',
  themes: ['Groundedness', 'Nourishment', 'Fertility', 'Patience', 'Generosity', 'Renewal'],
  archetypes: ['The Nurturer', 'The Master Builder', 'The Gardener', 'The Keeper of the Hearth'],
  feeling: '\u201CI am the fertile ground \u2014 steady, generous, and quietly turning endings into beginnings.\u201D',
  analogy:
    'Think of the forest floor: dark, rich, and teeming with slow life. It takes the fallen leaf and the broken branch and, over seasons, transforms them into the soil that feeds the next great tree. It asks for nothing and gives everything. This is your energy: grounded, generative, and abundant \u2014 the quiet foundation on which everything else grows.',

  celebIntro: 'Famous faces who embody the Forest Floor \u2014 warm, rich, earthy coloring that glows in golden, autumnal, deeply grounded tones.',
  celebs: [
    { label: 'Julia Roberts', text: 'Warm, rich, golden-brown coloring that comes alive in earthy, autumnal shades.' },
    { label: 'Jennifer Lopez', text: 'Warm, glowing, golden depth \u2014 luminous in rich bronze, olive, and amber.' },
    { label: 'The Grounded Provider', text: 'Anyone whose steady, nourishing presence feels like fertile, welcoming ground.' },
    { label: 'The Master Builder', text: 'Anyone who quietly builds lasting things and feeds everyone around them.' },
  ],

  energyParagraphs: [
    'You are Earth made pure. Where mixed Earth types carry the flavor of another element, your Earth is undiluted \u2014 grounded, patient, and endlessly generative. You move at the pace of the seasons: slow, sure, and unstoppable. You do not react; you cultivate. You do not grasp; you provide.',
    'Your gift is fertility \u2014 not only of the body, but of everything you tend. Ideas, gardens, homes, teams, relationships: whatever you give your steady attention to grows. You are the composter of the world, taking what others discard and patiently turning it into new life.',
    'You are here to nourish and to build. People remember the grounded warmth of your presence: steady, generous, and quietly reassuring, like standing on solid ground after a long time adrift. You are the foundation everyone can trust \u2014 the fertile floor from which all growth begins.',
  ],
  vibration:
    'Slow, deep, steady, and warm \u2014 a grounded hum with the richness of fertile soil. The vibration is dense and nourishing, like the quiet, teeming life beneath the forest floor.',
  blessing: 'You bless the world by composting death into new life.',

  seasonalMatch:
    'Earth types belong to the Autumn seasonal color palette, characterized by warm undertones, rich depth, and earthy, muted colors. As True Autumn, your palette is the warmest and richest of all \u2014 golden, spicy, and deeply grounded, like the forest at the height of the turning.',
  keyCharacteristics: [
    'Warm, rich, golden undertones',
    'Deep, grounded coloring',
    'Medium to high depth',
    'Looks best in earthy, spicy, autumnal colors',
    'Nourishing, grounded, and abundant presence',
  ],

  colorPaletteIntro:
    'Your signature Earth + Earth palette \u2014 warm, rich, earthy colors drawn from soil, bark, moss, and turning leaves. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress in the living colors of the earth.\u201D',
  styleBody:
    'The Forest Floor approaches style as grounded richness. You are drawn to natural fabrics, earthy colors, and pieces that feel substantial and enduring. Olive green, warm brown, rust, mustard, and deep terracotta are your language. You dress to feel grounded, warm, and quietly abundant \u2014 like the forest at the height of autumn.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t feel warm, natural, and grounded, it\u2019s not for me.\u201D',
  approachTitle: 'How the Forest Floor Approaches Color',
  approachLeadHeading: 'The Warm, Earthy Palette',
  approachLead: 'Your colors are not cool \u2014 they are warm. Not bright \u2014 rich. Not pale \u2014 grounded. You are drawn to the deep, spicy, living colors of the earth:',
  approachItems: [
    { label: 'Signature', text: 'Olive Green, Warm Brown, Rust, Amber, Terracotta: the living colors of soil and turning leaves.' },
    { label: 'Anchors', text: 'Chocolate, Camel, Warm Taupe, Bark: rich, grounded neutrals that hold your whole palette.' },
    { label: 'Connectors', text: 'Moss, Mustard, Warm Ochre: earthy, golden transitions that keep everything flowing.' },
    { label: 'Grounded', text: 'Deep Forest, Burnt Sienna, Espresso: the deep, fertile floor \u2014 rich, warm, and enduring.' },
  ],
  approachRules: [
    { title: 'The Temperature Rule', body: 'Your palette is warm at its heart. Cool, icy, or blue-based colors drain your natural glow \u2014 you need the golden warmth of the earth to come alive.', rule: 'The Rule: \u201CIf it isn\u2019t warm and earthy, it\u2019s not for me.\u201D' },
    { title: 'The Richness Rule', body: 'Your colors must be rich and grounded, not pale or washed out. Muted-but-deep earthy tones suit you far better than pastels or neons.', rule: 'The Rule: \u201CIf it\u2019s too pale or too bright, it\u2019s not speaking my language.\u201D' },
    { title: 'The Natural Rule', body: 'You come alive in natural materials and organic colors. Synthetic, high-shine, or artificial-looking pieces feel wrong against your grounded nature.', rule: 'The Rule: \u201CThe more natural, the more like me.\u201D' },
  ],
  assembleTitle: 'How the Forest Floor Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Grounded, Earthy Richness',
  assemblePrincipleBody: 'You are about warm, grounded abundance. Your outfit should feel like the forest at autumn \u2014 tonal, rich, and natural, layered in earthy colors with substantial, tactile fabrics.',
  assembleFormula: [
    'Anchor (60%): A warm, grounded foundation in your rich earth neutrals.',
    'Connector (25%): An earthy, tonal layering piece that adds golden depth.',
    'Grounding (15%): One rich, spicy accent \u2014 rust, mustard, terracotta \u2014 that brings it alive.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Camel or warm-brown trousers + an olive knit: a grounded, earthy foundation.' },
    { label: 'Connector', text: 'A moss or ochre layer: a tonal, golden transition.' },
    { label: 'Grounding', text: 'A rust scarf or terracotta accessory: the warm, spicy note people find reassuring.' },
  ],
  impactIntro: 'For moments when you need grounded authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Chocolate or deep-forest tailoring: a substantial, grounded foundation of quiet strength.' },
    { label: 'Connector', text: 'Warm bronze or antique-gold accessory: the earthy, refined bridge.' },
    { label: 'Grounding', text: 'A deep rust or burnt-sienna blouse: the rich, warm note that makes you unforgettable.' },
  ],
  eveningIntro: 'For moments of warmth and connection:',
  eveningFormula: [
    { label: 'Anchor', text: 'A fluid dress in warm bronze or deep olive: the grounded, glowing foundation.' },
    { label: 'Connector', text: 'Antique-gold or amber jewelry: the earthy, warm transition.' },
    { label: 'Grounding', text: 'A tonal wrap in a deeper spice shade: the layered richness that makes you glow.' },
  ],
  gettingItRightTitle: 'Getting It Right: The Forest Floor at Their Best',
  gettingItRight: [
    { heading: 'The Right Warmth', body: 'You understand that warm, golden color is your power. An earthy, tonal outfit is far more beautiful on you than any cool or icy look.', right: 'Camel trousers, an olive knit, and a rust scarf. The whole look glows with grounded warmth.', wrong: 'An icy blue or stark black-and-white. The coolness drains your natural, golden glow.' },
    { heading: 'The Right Texture', body: 'You understand your colors need natural, substantial fabrics \u2014 wool, suede, corduroy, linen. Tactile and grounded, never slick.', right: 'A suede jacket in warm brown with a substantial, tactile feel. Rich and natural at once.', wrong: 'Thin, high-shine synthetics that feel artificial against your earthy nature.' },
    { heading: 'The Right Accent', body: 'You understand accessories should be warm and natural, not cold or flashy. One rich, earthy piece beats anything glossy.', right: 'An antique-gold cuff or an amber pendant. Warm, grounded, quietly lovely.', wrong: 'A cold, high-shine silver statement piece that breaks your warm harmony.' },
  ],
  wearThis: [
    'Warm, rich, earthy colors \u2014 olive, rust, amber, terracotta, warm brown',
    'Grounded neutrals \u2014 camel, chocolate, warm taupe, bark',
    'Golden, spicy accents \u2014 mustard, ochre, burnt sienna',
    'Natural, substantial fabrics \u2014 wool, suede, corduroy, linen',
  ],
  avoidThis: [
    'Cool, icy, or blue-based colors that drain your golden glow',
    'Pale pastels or bright neons that overpower your grounded richness',
    'Stark black-and-white high contrast that reads as cold',
    'Thin, high-shine synthetics that feel artificial against your nature',
  ],

  beautyQuote: '\u201CMakeup as Warm, Grounded Glow.\u201D',
  beautyLook: 'The Look: Warm, earthy, and luminous. Skin that looks healthy and golden, with makeup drawn from spice, bronze, and autumn earth.',
  beautyItems: [
    { label: 'The Canvas', text: 'A warm, radiant finish with a healthy golden glow \u2014 luminous rather than matte.' },
    { label: 'The Eyes', text: 'Warm bronze, olive, copper, and rich brown. Earthy, golden shadows suit you far better than cool greys.' },
    { label: 'The Brows', text: 'Softly defined and natural, in a warm brown that grounds the whole face.' },
    { label: 'The Lips', text: 'A warm terracotta, brick, or spiced brown \u2014 a satin or cream finish. Your signature grounded lip.' },
    { label: 'The Cheeks', text: 'Warm peach, apricot, or bronzed terracotta rather than cool pink. A warm-gold highlighter \u2014 glowing, never icy.' },
  ],

  hairIntro: 'Your warm, rich coloring calls for golden, earthy, autumnal hair shades. Choose warm browns, rich chestnuts, auburns, and golden tones, and avoid cool, ashy, or overly dark shades that fight your natural warmth.',
  nailIntro: 'Perfect polish colors for your Earth + Earth coloring \u2014 warm, earthy, grounded shades from soil, spice, and turning leaves that complement your rich, autumnal palette.',
  decorIntro:
    'Your ideal space is warm, grounded, and abundant \u2014 rich earth tones, natural wood, stone, plants, and layered, tactile textures. Everything should feel rooted, nourishing, and alive, like a home grown slowly from the land itself.',

  habitatIntro:
    'You thrive in warm, natural, grounded spaces \u2014 surrounded by wood, plants, earth tones, and things you can touch and tend. You need permanence, texture, and abundance around you. Sterile, minimal, or rootless environments starve your fertile, nourishing energy.',
  habitatBullets: [
    'Warm, natural light \u2014 lamplight and sun, no cold overheads',
    'Plants, herbs, and growing things to tend',
    'Natural materials \u2014 wood, stone, wool, clay, leather',
    'A warm kitchen or hearth at the heart of the home',
    'Layered, tactile textures and rich earth tones',
  ],
  habitatWhy: 'Why It Works: The Forest Floor needs rooted abundance \u2014 a warm, natural sanctuary rich enough to nourish you and grounded enough to let you tend and grow at your own steady pace.',

  hobbiesTitle: 'The Hands-In-Dirt Day',
  hobbiesBody:
    'A day of nature, making, and nourishing. A morning in the garden with your hands in the soil. An afternoon of cooking, baking, or building something lasting. An evening feeding the people you love around a warm table. You recharge through nature, hands-on craft, and the deep satisfaction of tending and providing.',
  hobbiesBullets: ['Gardening & growing food', 'Cooking, baking & preserving', 'Woodworking & hands-on building', 'Nature walks & foraging', 'Pottery & tactile craft', 'Hosting & feeding loved ones'],

  loveLanguage: {
    receivesLoveThrough:
      'Shared, productive labor and being nourished. When someone gets their hands dirty beside you \u2014 in the garden, the kitchen, the workshop. When they eat what you\u2019ve made with real gusto, or build something lasting with you. Love, for you, is the companionship of shared, useful action and being cared for in return.',
    nonVerbalCues: 'A grounded settling when you feel safe. Steady, practical acts of care. Feeding people, tending shared spaces, and building things together as expressions of devotion.',
  },
  relationships: {
    inLove:
      'In relationships you are the fertile ground \u2014 the steady, nourishing foundation everyone can grow from. You love through provision, presence, and the lasting things you build and tend together. You need a partner who values substance over spectacle, who lets themselves be nourished, and who understands that your steady care is a profound form of love.',
    strengthsInRelationship: ['Creates deep, lasting security and abundance', 'Steady, dependable, and endlessly nourishing', 'Builds and tends a shared life that truly grows'],
    growthInRelationship: ['Let yourself receive as much as you give', 'Voice your own needs instead of only providing', 'Allow change and new growth rather than fixed routines'],
    friendshipCompatibility:
      'Your friendships are warm, loyal, and enduring. You bond through shared meals, shared work, and steady presence over the years. You are the friend who shows up, feeds everyone, and quietly holds the group together season after season.',
  },

  animalAffinity:
    'The Bear of the Forest Floor. The grounded, self-sufficient creature deeply at home in the woods \u2014 patient, nourishing, and quietly powerful. It knows the seasons, gathers abundance, and provides for its own with steady, unhurried care.',

  cinematic:
    'You\u2019re drawn to warm, grounded, humane films \u2014 stories of family, land, craft, and legacy. You love substance, slow richness, and works that honor the enduring rhythms of ordinary life, home, and belonging over spectacle and speed.',
  artisticCorrespondence:
    'Your artistic signature is warm and richly earthy: think autumn landscapes, harvest tables, tactile natural textures, and palettes of soil, bark, and turning leaves. In music you resonate with warm, grounded, organic, rootsy sound. Across all art forms you are the fertile ground from which lasting, nourishing beauty grows.',

  lifePurpose: {
    gift: 'You nourish and you build. You take what others discard and grow new life from it. Your steadiness is a foundation. You make people feel fed, held, and rooted.',
    spiritualPurpose:
      'You are here to be a nurturer and a builder. Your soul came to be the fertile ground \u2014 to nourish what grows, to build lasting things, and to patiently turn endings into new beginnings. To provide abundance, to hold the foundation, and to remind others that all growth begins in humble, grounded soil. Your purpose is to feed the world and root it. But you must also learn to receive \u2014 to let yourself be nourished, to voice your own needs, and to allow new growth rather than only tending the familiar.',
    soulsAssignment: '\u201CI am here to nourish the world and build what lasts \u2014 and to let myself be fed in return.\u201D',
    inOneSentence: 'You came to remind the world that all abundance begins in grounded, generous soil \u2014 and to learn that even the ground must be fed.',
  },

  mantras: [
    '\u201CTo nourish is to serve.\u201D',
    '\u201CNot the storm, but the fertile ground that feeds everything that grows.\u201D',
    '\u201CI am the steady foundation from which all things rise.\u201D',
    '\u201CTo give deeply is my nature \u2014 and I can receive deeply too.\u201D',
  ],
  mantraMeditation: '\u201CWhat am I tending that is ready to grow? What am I holding that needs to be released and composted? Where can I let myself be nourished?\u201D',
  shadowBalance: 'Shadow Balance: The Forest Floor must remember that ground which only gives, and never receives, eventually becomes barren. You must learn to be fed as well as to feed \u2014 to voice your own needs, to receive care, and to allow new growth rather than only tending the familiar.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the fertile ground where all things grow.\u201D' },
    { context: 'At Work', sentence: '\u201CLet\u2019s build something solid that lasts \u2014 and feeds everyone.\u201D' },
    { context: 'In Love', sentence: '\u201CI will nourish and root us \u2014 and let you nourish me too.\u201D' },
    { context: 'In Crisis', sentence: '\u201CLet\u2019s get grounded, take it step by step, and build our way through.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to receive as generously as I give.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'Due North \u2014 the deep foundation',
  directionAngle: 0,
  earthCompassLabel: 'EARTH',
  directionBullets: [
    { label: 'Direction', text: 'Due North (the deep foundation). You face north, into stillness and permanence \u2014 the pure heart of Earth\u2019s grounding.' },
    { label: 'The Deep Foundation', text: 'The fertile forest floor; the bedrock beneath all growth. Your direction is toward rootedness, substance, and enduring provision.' },
    { label: 'Orientation', text: 'You seek permanence and abundance \u2014 the lasting, the nourishing, the solid ground from which everything else can rise.' },
    { label: 'Shadow Orientation', text: 'When lost, you root so deeply that you cannot move \u2014 you tend the familiar until you become stuck, barren, or unable to grow.' },
  ],
  directionClosingQuote: '\u201CI face the deep foundation. I honor the ground that nourishes all growth.\u201D',

  career: {
    drawnTo: ['Builder / Craftsperson', 'Chef / Baker', 'Gardener / Farmer', 'Nurse / Caregiver', 'Teacher', 'Project Manager', 'Naturalist', 'Community Steward'],
    why: 'Careers of substance, craft, and sustenance. You need work that produces real, lasting, useful things and nourishes others. You thrive where patience, reliability, and hands-on mastery are valued, and where you can build and tend something that endures.',
  },
  idealWorkTitle: 'The Working Homestead',
  idealWorkBody:
    'Grounded, stable, and productive. A culture that values reliability, craft, and lasting results over hype and churn. You need steady rhythms, tangible outcomes, and room to build things well. You thrive in trades, hospitality, agriculture, caregiving, education, and any space where patient, hands-on work is honored.',
  idealWorkAvoid: 'Frantic, abstract, all-talk-no-substance environments where nothing lasting is ever built and steadiness is dismissed as slowness.',
  secretSauceBody:
    'Your reliability is not ordinary; it is the foundation everything rests on. You need to know that your steady, grounded, provide-and-build way of working is a rare gift. You are the one who gets it done, keeps it running, and feeds the team. Your role is to say \u201CLet\u2019s build this properly, to last\u201D and to quietly nourish everyone around you.',
  secretSauceImpression: '\u201CShe\u2019s the ground this whole place stands on. Whatever we build, she makes sure it lasts \u2014 and she feeds us all along the way.\u201D',
  leadershipTitle: 'The Master Builder',
  leadershipBody:
    'You lead through steadiness, provision, and lasting construction. You build strong foundations, keep things running reliably, and make sure your people are fed and supported. You don\u2019t lead by charisma; you lead by being the solid ground everyone can trust and grow from.',
  leadershipBlindspots: 'Your steadiness can resist necessary change, and your provision can become over-control or self-neglect. Pair your grounding with openness to new growth and a willingness to let others carry the load too.',

  communicationCallout: 'The Grounded Provider',
  communication: {
    preferredMedium: 'Steady + In-person. You communicate best in warm, practical, face-to-face exchange \u2014 often side by side while doing something useful. You value substance and follow-through over talk.',
    strengths: 'Reliability, warmth, and practical wisdom. You say what you mean, follow through completely, and make people feel grounded and cared for.',
    howOthersReachYou: 'Be warm, direct, and practical. Show up, do real things together, and honor your steady pace. A grounded, in-person conversation over shared work reaches you far better than abstract talk.',
  },

  lifeLesson:
    'Your lesson is to receive and to allow new growth. The ground that only gives eventually depletes; the soil that is never turned grows stagnant. You must learn to be nourished as well as to nourish, to voice your own needs, and to welcome change rather than only tending the familiar.',
  coreBlocks: [
    'Giving so much you deplete yourself and never receive',
    'Rooting so deeply into routine that you cannot grow or change',
    'Neglecting your own needs while providing for everyone else',
    'Mistaking stubbornness for stability when new growth is needed',
  ],
  imbalance:
    'When out of balance, your fertile ground either over-composts or goes barren. Over-composted, you take on too much decay \u2014 everyone\u2019s burdens, everyone\u2019s mess \u2014 until you\u2019re heavy, stuck, and depleted. Barren, you\u2019ve given so much for so long that nothing is left \u2014 flat, dry, and unable to nourish yourself or anyone else.',

  healing: [
    'Let yourself receive care \u2014 be fed, be helped, be tended',
    'Turn the soil: welcome one new change or growth each season',
    'Voice one of your own needs before you attend to others\u2019',
    'Release what isn\u2019t yours to compost \u2014 set down others\u2019 burdens',
  ],
  healingCallout: 'Excess: Over-Composted (Too Much Decay to Hold)  /  Deficiency: Barren Soil (The Ground Run Dry)',
  calmExcessHeading: 'To Clear Excess \u2014 Over-Holding & Stagnation',
  calmExcessIntro: 'When your fertile ground becomes over-composted \u2014 heavy, stuck, and burdened by too much \u2014 the goal is to release, lighten, and move:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Dandelion & Burdock \u2014 to support gentle detox and move stagnant, heavy energy.' },
    { label: 'Nutrients', text: 'Fiber and bitter greens to keep things moving; magnesium to release physical heaviness.' },
    { label: 'Diet', text: 'Lighten heavy comfort foods; add fresh, living, plant-rich meals to clear the density.' },
    { label: 'Movement', text: 'Walking and steady rhythmic movement to keep the grounded body from stagnating.' },
    { label: 'Release', text: 'Set down others\u2019 burdens \u2014 practice returning what is not yours to compost.' },
  ],
  rebuildHeading: 'To Rehydrate Deficiency \u2014 Depletion & Barrenness',
  rebuildIntro: 'When your ground runs barren \u2014 dry, flat, and depleted from over-giving \u2014 the goal is to nourish, replenish, and be fed:',
  rebuildItems: [
    { label: 'Herbs', text: 'Nettle & Oatstraw \u2014 to remineralize, rebuild, and restore deep nourishment.' },
    { label: 'Nourishment', text: 'Warm, mineral-rich, grounding meals \u2014 root vegetables, broths, healthy fats \u2014 to refill the soil.' },
    { label: 'Reconnection', text: 'Let others nourish you; rest in nature; receive care without earning it first.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Grounding, nature-based practice \u2014 gardening, earthing, tending growing things \u2014 that honors the earth.' },
    { label: 'Balancing (Counter-Energy)', text: 'Receiving and renewal. Let yourself be cared for; welcome new growth and change rather than only tending.' },
    { label: 'Ritual', text: 'Earth rituals \u2014 planting seeds, tending soil, a harvest meal \u2014 to honor the cycle of nourishment and renewal.' },
  ],

  biorhythmRhythmHeading: 'The Seasonal & Circadian Rhythm',
  chronotype: 'Steady and consistent \u2014 energy follows natural cycles with reliable, even peaks. Needs regular rhythm and grounding rest.',
  peakTime: 'Mid-Morning to Late Afternoon. Your grounded energy is steadiest and most productive through the working day.',
  biorhythmScheduleIntro: 'Peak time: 9 AM\u20135 PM \u2014 steady, reliable, grounded energy for building, tending, and productive work.',
  biorhythmSchedule: [
    'Morning \u2014 Grounded start. Ease in with routine, warmth, and something nourishing.',
    '9 AM\u201312 PM \u2014 Strong, steady peak. Build, create, and get real things done.',
    '12\u20132 PM \u2014 Nourish and pause. Honor a proper, grounding meal.',
    '2\u20135 PM \u2014 A second reliable window. Hands-on work, tending, and completion.',
    'Evening \u2014 Grounded wind-down. Feed loved ones, tend the home, then deep, restorative rest.',
  ],
  newYearResolution: 'This year, turn the soil. Welcome one new change each season, and let yourself be nourished as generously as you nourish others.',

  ultimateGoal:
    'To become the Fertile Ground \u2014 whose steady, nourishing presence feeds and roots everyone around it, builds the lasting things that endure, and patiently turns endings into new beginnings, while learning to receive and to welcome new growth.',
  finalSummary: [
    'The Forest Floor is not merely steady \u2014 it is a generative, life-giving force. Your gift is not the storm or the spark, but the fertile ground that quietly feeds everything that grows. You nourish, you build, and you turn what others discard into new life. Your purpose is to root and feed the world \u2014 and in doing so, to make lasting abundance possible for everyone around you.',
    'But the deepest truth of your nature is this: even the richest ground must be fed. To give without depleting; to root without becoming stuck; to nourish others while letting yourself be nourished in return. When you learn to receive and to welcome new growth as well as to provide, you become the most quietly powerful presence in any room: the fertile foundation on which everything and everyone can grow.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Earth + Earth nature is a sacred force \u2014 not a ground to be depleted, but a fertile floor to be honored. Wear your colors like the warm richness of the autumn forest, nourish what grows wherever you go, and remember: the ground everyone stands on is often the most generous presence in the room.',
};
