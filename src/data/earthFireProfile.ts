import type { EarthProfileData } from '@/lib/earthSubtypeProfilePdfBuilder';

// Consolidated Earth + Fire (The Mountain Stone / Deep Autumn) profile content.
export const earthFireProfile: EarthProfileData = {
  subtypeId: 'earth-fire',
  name: 'Earth + Fire',
  archetype: 'The Mountain Stone',
  seasonalName: 'Deep Autumn',
  tagline: 'Immovable strength warmed by an inner fire — enduring, forged, and quietly, powerfully unshakeable.',

  heroLabel: 'THE MOUNTAIN STONE',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  EARTH + FIRE PROFILE',
  fileName: 'earth-fire-mountain-stone-profile.pdf',
  primary: [139, 105, 20],   // Deep Amber / Bronze
  secondary: [122, 46, 34],  // Burnt Umber
  tertiary: [196, 114, 42],  // Warm Copper
  deepAccent: [90, 40, 20],  // Deep Rust

  identityRows: [
    { label: 'Elemental Signature', value: 'Earth + Fire (Earth as Dominant, Fire as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Deep, warm, rich Autumn (Deep Autumn)' },
    { label: 'Core Mantra', value: '\u201CI AM the mountain \u2014 forged by fire, immovable as stone.\u201D' },
  ],

  essence:
    'Earth at its most enduring and forged. You have the immovable groundedness of Earth, warmed and hardened by Fire\u2019s inner heat. Your energy is stable, powerful, and quietly intense \u2014 a mountain of ancient stone with molten fire at its core. You don\u2019t rush and you don\u2019t bend, but there is heat and conviction beneath your calm. You look best in the deepest, warmest, richest earthy colors \u2014 deep bronze, burnt umber, warm copper, and rich rust \u2014 the palette of stone warmed by fire and the deepest turn of autumn.',
  essenceHighlightSentence:
    'You look best in the deepest, warmest, richest earthy colors \u2014 deep bronze, burnt umber, warm copper, and rich rust \u2014 the palette of stone warmed by fire and the deepest turn of autumn.',
  inNature:
    'A great mountain of ancient stone, dark and warm in the low autumn sun; the glow of embers deep within volcanic rock; the deep, rich colors of the forest at the very end of the turn. You are earth that has been forged \u2014 immovable, enduring, with a quiet fire at your core.',
  themes: ['Endurance', 'Strength', 'Stability', 'Conviction', 'Permanence', 'Quiet Intensity'],
  archetypes: ['The Rock', 'The Steadfast Guardian', 'The Forged Elder', 'The Immovable Anchor'],
  feeling: '\u201CI am the mountain \u2014 warmed by fire within, but nothing moves me from my ground.\u201D',
  analogy:
    'Think of a mountain: ancient, immovable, shaped over ages, with molten fire still deep in its heart. It does not rush and it does not yield. It endures storm after storm, season after season, glowing warm in the low light. This is your energy: grounded, powerful, and quietly intense \u2014 unshakeable, but never cold.',

  celebIntro: 'Famous faces who embody the Mountain Stone \u2014 deep, warm, richly grounded coloring that glows in the darkest, spiciest autumnal tones.',
  celebs: [
    { label: 'Eva Mendes', text: 'Deep, warm, richly grounded coloring \u2014 luminous in bronze, rust, and deep amber.' },
    { label: 'Idris Elba', text: 'Grounded, warm depth with quiet intensity \u2014 commanding in rich, earthy tones.' },
    { label: 'The Steadfast Rock', text: 'Anyone whose immovable, warm presence makes others feel utterly safe and anchored.' },
    { label: 'The Forged Elder', text: 'Anyone whose quiet strength has clearly been shaped by heat and time.' },
  ],

  energyParagraphs: [
    'You are Earth made unbreakable. Where pure Earth is soft and fertile, your Earth has been forged by Fire into something dense and enduring \u2014 stone rather than soil. You are the most immovable of all the types: grounded, resolute, and quietly powerful, with conviction burning steadily at your core.',
    'Fire gives your Earth heat and will. You are not passive; beneath your calm stability there is a deep, banked fire of conviction, loyalty, and slow-burning intensity. When you decide, you do not waver. When you commit, you do not leave. Your fire is not a flare \u2014 it is the steady glow of embers that never go out.',
    'You are here to endure and to anchor. People lean on you in the storm because you do not move. You hold the line, keep the promise, and outlast the difficulty. People remember the unshakeable warmth of your presence: solid, loyal, and quietly intense, like a mountain that has always been there and always will be.',
  ],
  vibration:
    'Slow, dense, and deeply grounded, with a warm inner heat \u2014 a low, powerful hum like embers glowing within ancient stone. The vibration is immovable but never cold.',
  blessing: 'You bless the world by witnessing hardship with dignity and standing unmoved.',

  seasonalMatch:
    'Earth types belong to the Autumn seasonal color palette, characterized by warm undertones, rich depth, and earthy colors. As Deep Autumn, your palette is the deepest and richest of all \u2014 dark, warm, and intense, like the forest and stone at the very end of the turn.',
  keyCharacteristics: [
    'Deep, warm, rich coloring',
    'High depth with golden undertones',
    'Handles darker, more intense earthy colors',
    'Looks best in deep bronze, rust, and umber',
    'Immovable, warm, and quietly intense presence',
  ],

  colorPaletteIntro:
    'Your signature Earth + Fire palette \u2014 deep, warm, richly grounded colors from stone, ember, and the darkest turn of autumn. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress in the deep, warm colors of forged stone.\u201D',
  styleBody:
    'The Mountain Stone approaches style as grounded power. You can handle the deepest, richest earthy colors \u2014 deep bronze, burnt umber, rich rust, dark olive \u2014 and you wear them with quiet authority. Your Fire lets you add depth and intensity that softer Earth types can\u2019t. You dress to feel substantial, enduring, and powerful, like stone warmed from within.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t feel deep, warm, and substantial, it\u2019s not for me.\u201D',
  approachTitle: 'How the Mountain Stone Approaches Color',
  approachLeadHeading: 'The Deep, Warm, Forged Palette',
  approachLead: 'Your colors are not light \u2014 they are deep. Not cool \u2014 warm. Not soft \u2014 forged. You are drawn to the darkest, richest, most grounded warm colors:',
  approachItems: [
    { label: 'Signature', text: 'Deep Bronze, Burnt Umber, Rich Rust, Dark Amber: the forged colors of warmed stone and ember.' },
    { label: 'Anchors', text: 'Espresso, Deep Chocolate, Charcoal-Brown, Bark: dense, grounded neutrals that hold your power.' },
    { label: 'Connectors', text: 'Copper, Deep Olive, Warm Ochre: rich, earthy transitions with heat and depth.' },
    { label: 'Grounded', text: 'Brick, Mahogany, Deep Forest: the molten core \u2014 deep, warm, and intense.' },
  ],
  approachRules: [
    { title: 'The Temperature Rule', body: 'Your palette is deeply warm. Cool, icy, or grey-based colors leave you looking hard and lifeless \u2014 you need the golden heat of ember and stone to glow.', rule: 'The Rule: \u201CIf it isn\u2019t warm and deep, it\u2019s not for me.\u201D' },
    { title: 'The Depth Rule', body: 'You can carry more depth and intensity than any other Earth type. Pale, washed-out, or pastel colors disappear on you; you need richness and weight.', rule: 'The Rule: \u201CIf it\u2019s too pale, it\u2019s not speaking my language.\u201D' },
    { title: 'The Substance Rule', body: 'You come alive in substantial, weighty materials and colors. Flimsy, high-shine, or delicate pieces feel wrong against your forged, grounded nature.', rule: 'The Rule: \u201CThe more substantial, the more like me.\u201D' },
  ],
  assembleTitle: 'How the Mountain Stone Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Deep, Warm, Grounded Power',
  assemblePrincipleBody: 'You are about substantial, warm intensity. Your outfit should feel like forged stone \u2014 deep, tonal, and powerful, layered in the richest earthy colors with weighty, tactile fabrics.',
  assembleFormula: [
    'Anchor (60%): A deep, grounded foundation in your dark earth neutrals.',
    'Connector (25%): A rich, tonal layering piece with warmth and depth.',
    'Grounding (15%): One molten accent \u2014 rust, brick, deep copper \u2014 that glows with quiet fire.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Espresso or deep-chocolate trousers + a bronze knit: a grounded, powerful foundation.' },
    { label: 'Connector', text: 'A deep-olive or copper layer: a rich, tonal transition.' },
    { label: 'Grounding', text: 'A rust or brick accessory: the warm, glowing note people find unshakeably reassuring.' },
  ],
  impactIntro: 'For moments when you need grounded authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Deep charcoal-brown or espresso tailoring: a dense, commanding foundation.' },
    { label: 'Connector', text: 'Antique bronze or dark-gold accessory: the forged, refined bridge.' },
    { label: 'Grounding', text: 'A deep mahogany or brick blouse: the molten note that makes you unforgettable.' },
  ],
  eveningIntro: 'For moments of warmth and depth:',
  eveningFormula: [
    { label: 'Anchor', text: 'A dress in deep bronze or dark olive: the grounded, glowing foundation.' },
    { label: 'Connector', text: 'Antique-gold or amber jewelry: the warm, forged transition.' },
    { label: 'Grounding', text: 'A tonal wrap in a deeper spice shade: the layered richness that makes you smolder.' },
  ],
  gettingItRightTitle: 'Getting It Right: The Mountain Stone at Their Best',
  gettingItRight: [
    { heading: 'The Right Depth', body: 'You understand that deep, warm color is your power. A rich, intense, tonal outfit is far more striking on you than anything pale or cool.', right: 'Espresso trousers, a bronze knit, and a rust accessory. The whole look smolders with grounded warmth.', wrong: 'An icy pastel or stark grey. The lack of depth and warmth makes you look hard and lifeless.' },
    { heading: 'The Right Texture', body: 'You understand your colors need substantial, weighty fabrics \u2014 heavy wool, leather, suede, corduroy. Solid and tactile, never flimsy.', right: 'A leather jacket in deep brown with real weight and grain. Powerful and grounded.', wrong: 'Thin, high-shine synthetics that undercut your forged, substantial nature.' },
    { heading: 'The Right Accent', body: 'You understand accessories should be warm and substantial, not cold or delicate. One deep, forged piece beats anything flashy.', right: 'An antique bronze cuff or an amber signet. Warm, weighty, quietly powerful.', wrong: 'A cold, thin, high-shine silver piece that fights your warm depth.' },
  ],
  wearThis: [
    'Deep, warm, rich colors \u2014 bronze, rust, umber, dark amber, brick',
    'Dense grounded neutrals \u2014 espresso, deep chocolate, charcoal-brown, bark',
    'Molten, spicy accents \u2014 copper, mahogany, burnt sienna',
    'Substantial, weighty fabrics \u2014 heavy wool, leather, suede, corduroy',
  ],
  avoidThis: [
    'Cool, icy, or grey-based colors that leave you hard and lifeless',
    'Pale pastels or washed-out tones that disappear on you',
    'Stark, cold high contrast without warmth',
    'Thin, flimsy, high-shine fabrics that undercut your substance',
  ],

  beautyQuote: '\u201CMakeup as Deep, Warm Fire.\u201D',
  beautyLook: 'The Look: Deep, warm, and smoldering. Skin that glows with grounded heat, and makeup drawn from ember, bronze, and the deepest autumn earth.',
  beautyItems: [
    { label: 'The Canvas', text: 'A warm, radiant finish with grounded depth \u2014 luminous and healthy, never flat.' },
    { label: 'The Eyes', text: 'Deep bronze, warm copper, dark olive, and rich espresso. Smoky, warm, forged shadows suit you far better than cool greys.' },
    { label: 'The Brows', text: 'Strongly defined and grounded, in a deep warm brown that frames the whole face.' },
    { label: 'The Lips', text: 'A deep brick, terracotta, or rich spiced brown \u2014 a satin or matte finish. Your signature smoldering lip.' },
    { label: 'The Cheeks', text: 'Warm bronzed terracotta rather than pink. A warm-gold or bronze highlighter \u2014 glowing with heat, never icy.' },
  ],

  hairIntro: 'Your deep, warm coloring calls for rich, dark, golden-warm hair shades. Choose deep chestnuts, rich auburns, warm espressos, and copper tones, and avoid cool, ashy, or flat-black shades that fight your natural warmth and depth.',
  nailIntro: 'Perfect polish colors for your Earth + Fire coloring \u2014 deep, warm, richly grounded shades from ember, bronze, and forged stone that complement your dark, spicy autumnal palette.',
  decorIntro:
    'Your ideal space is deep, warm, and grounded \u2014 rich earth tones, dark wood, stone, leather, and warm firelight. Everything should feel substantial, enduring, and quietly powerful, like a room built to outlast the ages.',

  habitatIntro:
    'You thrive in deep, grounded, substantial spaces \u2014 solid materials, warm light, and things built to last. You need permanence, weight, and warmth around you. Flimsy, temporary, or cold environments unsettle your immovable, forged nature.',
  habitatBullets: [
    'Warm, deep light \u2014 firelight, lamps, low golden glow',
    'Solid, substantial furniture built to last',
    'Natural materials \u2014 dark wood, stone, leather, wrought iron',
    'A grounded, private stronghold to retreat and reflect',
    'Rich, deep earth tones and weighty textures',
  ],
  habitatWhy: 'Why It Works: The Mountain Stone needs enduring permanence \u2014 a deep, substantial sanctuary solid enough to anchor you and warm enough to keep the inner fire glowing.',

  hobbiesTitle: 'The Forge & Anchor Day',
  hobbiesBody:
    'A day of substantial making, endurance, and grounded intensity. A morning of hands-on building or hard, satisfying work. An afternoon in nature, hiking or working the land. An evening by the fire with a few trusted people. You recharge through effort, craft, and the deep satisfaction of building things that last.',
  hobbiesBullets: ['Building & metalwork', 'Hiking & the mountains', 'Cooking over fire & smoking', 'Woodworking & restoration', 'Strength training', 'Collecting & preserving lasting things'],

  loveLanguage: {
    receivesLoveThrough:
      'Loyalty, steadiness, and being chosen for good. When someone stands by you, commits without wavering, and proves through time that they will not leave. When they respect your ground and don\u2019t try to move you. Love, for you, is unwavering loyalty and the quiet, banked fire of a bond that endures.',
    nonVerbalCues: 'A settling, unshakeable steadiness when you feel safe. Fierce, quiet protectiveness. Choosing to stay and endure together as the deepest expression of love.',
  },
  relationships: {
    inLove:
      'In relationships you are the immovable rock \u2014 the one who stays, protects, and endures through anything. You love through loyalty, steadiness, and a deep, banked fire of devotion. You need a partner who values commitment over spectacle, who won\u2019t try to move you off your ground, and who understands that your steadiness is a fierce form of love.',
    strengthsInRelationship: ['Utterly loyal and unshakeably steady', 'Protective, grounding, and enduring through hard times', 'Commits completely and does not waver'],
    growthInRelationship: ['Bend a little \u2014 let steadiness not become rigidity', 'Let your inner fire and feelings be seen and voiced', 'Allow change and new growth rather than fixed positions'],
    friendshipCompatibility:
      'Your friendships are few, deep, and forged for life. You bond slowly but permanently, through loyalty tested by time. You are the friend who never leaves, holds every confidence, and shows up like bedrock when everything else falls apart.',
  },

  animalAffinity:
    'The Mountain Ram of the Mountain Stone. The sure-footed, immovable creature at home on the high, hard ground \u2014 powerful, enduring, and unshakeable. It holds its footing where nothing else can, warmed by its own fierce, quiet strength.',

  cinematic:
    'You\u2019re drawn to grounded, weighty, character-driven films \u2014 stories of endurance, loyalty, honor, and the long game. You love substance, gravity, and works that reward patience and depth over spectacle and speed.',
  artisticCorrespondence:
    'Your artistic signature is deep and warmly forged: think mountain landscapes, dark rich earth tones, forged metal, and the deepest palettes of ember and stone. In music you resonate with deep, warm, grounded, powerful sound. Across all art forms you are the immovable stone, quietly glowing with inner fire.',

  lifePurpose: {
    gift: 'You endure and you anchor. You hold the line when everything else moves. Your loyalty is a stronghold. You make people feel utterly safe, grounded, and protected.',
    spiritualPurpose:
      'You are here to be a rock and a guardian. Your soul came to be the forged mountain \u2014 to endure, to hold the ground, and to protect what matters with a quiet, banked fire. To stay when others leave, to keep the promise, and to remind the world that some things must not move. Your purpose is to be the immovable foundation that outlasts the storm. But you must also learn to bend \u2014 to let your fire and feelings be seen, to allow change, and to soften your stone enough to grow.',
    soulsAssignment: '\u201CI am here to hold the ground and protect what matters \u2014 and to let my stone soften enough to grow.\u201D',
    inOneSentence: 'You came to remind the world that strength means enduring with dignity \u2014 and to learn that even the mountain is changed, gently, by time.',
  },

  mantras: [
    '\u201CTo endure is to serve.\u201D',
    '\u201CNot the flare, but the ember that never goes out.\u201D',
    '\u201CI am the immovable ground \u2014 warmed by fire, unmoved by storm.\u201D',
    '\u201CTo be steady is my nature \u2014 and I can bend without breaking.\u201D',
  ],
  mantraMeditation: '\u201CWhere am I holding my ground rightly, and where has steadiness become rigidity? What fire within me wants to be seen? What is time asking me to let change?\u201D',
  shadowBalance: 'Shadow Balance: The Mountain Stone must remember that stone which never yields eventually cracks under its own weight. You must learn to bend without breaking \u2014 to let your inner fire and feelings be seen, to allow change, and to soften your ground enough to keep growing.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the mountain \u2014 forged by fire, immovable as stone.\u201D' },
    { context: 'At Work', sentence: '\u201CI\u2019ll hold this steady \u2014 build it right, and it will last.\u201D' },
    { context: 'In Love', sentence: '\u201CI will stand by you, unmoved, through anything.\u201D' },
    { context: 'In Crisis', sentence: '\u201CStay grounded. I\u2019ve got us. Nothing moves me from this.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to bend a little, and to let my fire be seen.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'North-by-Northeast \u2014 the forged ground',
  directionAngle: 22.5,
  earthCompassLabel: 'EARTH',
  directionBullets: [
    { label: 'Direction', text: 'North-by-Northeast (the forged ground). You face north, into permanence, but toward the fiery edge where Earth meets Air\u2019s spark and Fire\u2019s heat.' },
    { label: 'The Forged Ground', text: 'The mountain warmed by fire; foundation given heat and will. Your direction is toward the place where stability meets conviction.' },
    { label: 'Orientation', text: 'You seek permanence with power \u2014 the immovable, the enduring, the ground that holds and the fire that holds it in place.' },
    { label: 'Shadow Orientation', text: 'When lost, you root and harden so completely that you cannot move or bend \u2014 stone that cracks rather than grows.' },
  ],
  directionClosingQuote: '\u201CI face the forged ground. I honor the mountain warmed by fire and unmoved by storm.\u201D',

  career: {
    drawnTo: ['Builder / Engineer', 'Craftsperson / Metalworker', 'Operations Leader', 'Firefighter / First Responder', 'Farmer / Rancher', 'Chef', 'Security / Protection', 'Long-Term Steward'],
    why: 'Careers of substance, endurance, and quiet leadership. You need work that produces lasting, tangible results and rewards reliability, strength, and the long game. You thrive where you can hold the ground, protect the work, and build things that endure.',
  },
  idealWorkTitle: 'The Forge',
  idealWorkBody:
    'Grounded, high-stakes, and built to last. A culture that values reliability, endurance, and quiet strength over hype. You need clear stakes, tangible outcomes, and respect for the long game. You thrive in trades, operations, emergency work, agriculture, and any space where steadiness under pressure is honored.',
  idealWorkAvoid: 'Frantic, all-talk, constantly-pivoting environments where nothing lasting is ever built and your endurance is treated as inflexibility.',
  secretSauceBody:
    'Your endurance is not stubbornness; it is the anchor everything relies on. You need to know that your immovable, hold-the-line way of working is a rare strength. You are the one who stays steady when everyone else panics, keeps the promise, and outlasts the crisis. Your role is to say \u201CI\u2019ve got this \u2014 it will hold\u201D and to be the ground the whole team stands on.',
  secretSauceImpression: '\u201CWhen it all goes sideways, he doesn\u2019t move. He holds the line, and somehow that\u2019s enough for the rest of us to hold too.\u201D',
  leadershipTitle: 'The Steadfast Guardian',
  leadershipBody:
    'You lead through steadiness, endurance, and protection. You hold the ground under pressure, keep your people safe, and build things that last. You don\u2019t lead by charisma or urgency; you lead by being utterly reliable \u2014 the one who does not waver and does not leave.',
  leadershipBlindspots: 'Your steadiness can become rigidity, and your banked fire can smolder into stubbornness or unspoken resentment. Pair your grounding with a willingness to bend, to voice what you feel, and to welcome change.',

  communicationCallout: 'The Steadfast Anchor',
  communication: {
    preferredMedium: 'Direct + grounded. You communicate best plainly and in person, with few words and full follow-through. You value substance and loyalty over talk, and you mean exactly what you say.',
    strengths: 'Reliability, honesty, and quiet strength. You keep every confidence, follow through completely, and make people feel utterly safe and anchored.',
    howOthersReachYou: 'Be direct, honest, and patient. Prove yourself over time, respect your ground, and don\u2019t try to rush or move you. Loyalty and follow-through reach you far more than words.',
  },

  lifeLesson:
    'Your lesson is to bend without breaking. The immovable strength that endures so much must also learn to yield \u2014 to let your inner fire and feelings be seen, to allow change, and to soften your stone enough to keep growing rather than cracking.',
  coreBlocks: [
    'Hardening so completely that you cannot bend or grow',
    'Letting steadiness curdle into stubbornness',
    'Banking your fire until it smolders into resentment',
    'Refusing change even when the ground itself is shifting',
  ],
  imbalance:
    'When out of balance, your mountain either overheats or goes cold. Overheated, your banked fire flares into stubbornness, anger, or immovable resistance \u2014 you dig in and crack rather than bend. Gone cold, your inner fire dies out entirely \u2014 leaving you hard, heavy, and numb, a stone with no warmth left.',

  healing: [
    'Practice yielding: let one fixed position soften each week',
    'Let your inner fire be seen \u2014 voice what you actually feel',
    'Welcome one change rather than resisting it',
    'Tend your warmth so your strength never goes cold',
  ],
  healingCallout: 'Excess: Overheated Stone (Stubborn & Immovable)  /  Deficiency: Cold Stone (The Fire Gone Out)',
  calmExcessHeading: 'To Clear Excess \u2014 Stubbornness & Overheating',
  calmExcessIntro: 'When your inner fire flares into stubbornness, rigidity, and heat, the goal is to cool, soften, and release:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Chamomile & Peppermint \u2014 to cool heat and ease the tension of digging in.' },
    { label: 'Nutrients', text: 'Magnesium and cooling, hydrating foods to release the clenched, overheated hold.' },
    { label: 'Diet', text: 'Reduce heavy, heating foods; add fresh, cooling, plant-rich meals to soften intensity.' },
    { label: 'Movement', text: 'Stretching, yin yoga, and grounding walks to release rigidity and let the body yield.' },
    { label: 'Release', text: 'Practice bending \u2014 choose one held position to soften or set down.' },
  ],
  rebuildHeading: 'To Rekindle Deficiency \u2014 Coldness & Numbness',
  rebuildIntro: 'When your inner fire goes out into heaviness, numbness, and cold, the goal is to rewarm, nourish, and reconnect:',
  rebuildItems: [
    { label: 'Herbs', text: 'Ginger & Ashwagandha \u2014 to rekindle inner warmth and restore grounded vitality.' },
    { label: 'Nourishment', text: 'Warm, spiced, mineral-rich meals \u2014 root vegetables, broths, warming spices \u2014 to relight the core.' },
    { label: 'Reconnection', text: 'Firelight, warmth, and trusted company; do something that stirs your banked fire back to life.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Grounding, endurance-based practice \u2014 hiking, building, strength work \u2014 that honors the earth and the forge.' },
    { label: 'Balancing (Counter-Energy)', text: 'Softening and expression. Let yourself bend, feel, and voice; welcome change rather than resisting it.' },
    { label: 'Ritual', text: 'Fire-and-earth rituals \u2014 tending a hearth or fire pit \u2014 to honor the warmth held within the immovable ground.' },
  ],

  biorhythmRhythmHeading: 'The Seasonal & Circadian Rhythm',
  chronotype: 'Steady and enduring \u2014 energy runs deep, even, and powerful through the day, with a slow warm-up and strong staying power.',
  peakTime: 'Late Morning to Late Afternoon. Your grounded power is strongest through the sustained working day.',
  biorhythmScheduleIntro: 'Peak time: 10 AM\u20135 PM \u2014 deep, steady, powerful energy for demanding, enduring work.',
  biorhythmSchedule: [
    'Morning \u2014 Slow, grounded start. Warm up steadily; don\u2019t force the fire awake.',
    '10 AM\u20131 PM \u2014 Deep, powerful peak. Tackle the hardest, most demanding work.',
    '1\u20133 PM \u2014 Sustained strength. Keep building through the afternoon.',
    '3\u20135 PM \u2014 A second enduring window. Finish, complete, and secure the day\u2019s work.',
    'Evening \u2014 Grounded wind-down. Firelight, warmth, trusted company, then deep rest.',
  ],
  newYearResolution: 'This year, bend without breaking. Soften one held position each month, and let your inner fire be seen rather than banked in silence.',

  ultimateGoal:
    'To become the Warmed Mountain \u2014 whose immovable, enduring presence anchors and protects everyone around it, holds the line through any storm, and stays warm at the core, while learning to bend, to feel, and to welcome the change that keeps stone from cracking.',
  finalSummary: [
    'The Mountain Stone is not merely steady \u2014 it is an immovable, enduring force warmed by inner fire. Your gift is not the flare or the storm, but the mountain that holds its ground and outlasts everything. You endure, you anchor, and you protect what matters with a quiet, banked fire that never goes out. Your purpose is to be the foundation the world can trust \u2014 and in doing so, to make endurance and safety possible for everyone who leans on you.',
    'But the deepest truth of your nature is this: even the mountain must be changed, gently, by time. To endure without hardening; to hold your ground without becoming rigid; to keep your fire warm without letting it smolder into stubbornness. When you learn to bend and to feel as well as to endure, you become the most quietly powerful presence in any room: the warmed stone that holds everyone steady, and never goes cold.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Earth + Fire nature is a sacred force \u2014 not stone to be cracked, but a mountain to be honored. Wear your colors like ember glowing within ancient rock, hold your ground wherever you go, and remember: the one who does not move in the storm is often the strongest, warmest presence in the room.',
};
