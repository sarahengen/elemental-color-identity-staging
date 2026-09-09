import type { AirProfileData } from '@/lib/airSubtypeProfilePdfBuilder';

// Consolidated Air + Water (The First Whisper / Light Spring) profile content.
export const airWaterProfile: AirProfileData = {
  subtypeId: 'air-water',
  name: 'Air + Water',
  archetype: 'The First Whisper',
  seasonalName: 'Light Spring',
  tagline: 'Lightness softened by intuition \u2014 subtle, delicate, and ethereal, the gentlest signal on the wind.',

  heroLabel: 'THE FIRST WHISPER',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  AIR + WATER PROFILE',
  fileName: 'air-water-first-whisper-profile.pdf',
  primary: [154, 180, 208],   // Powder Sky
  secondary: [183, 168, 202], // Soft Lavender
  tertiary: [214, 226, 235],  // Pale Mist
  deepAccent: [110, 135, 170],// Dusk Periwinkle

  identityRows: [
    { label: 'Elemental Signature', value: 'Air + Water (Air as Dominant, Water as Influencer)' },
    { label: 'Seasonal Anchor', value: 'Soft, luminous, delicate Spring (Light Spring)' },
    { label: 'Core Mantra', value: '\u201CI AM the first whisper \u2014 subtle, intuitive, and gently free.\u201D' },
  ],

  essence:
    'Air at its softest and most subtle. You have the lightness of Air, gentled and deepened by Water\u2019s intuitive flow. You are the faintest shift in pressure, a whisper on the wind \u2014 conveying more through the unspoken than others manage with speeches. You are intuition itself: the lightest signal from the void, free of words. You look best in light, warm neutrals with the merest hint of color \u2014 soft pastels, pale aquas, and whispered lavenders \u2014 the ethereal palette of first light through mist.',
  essenceHighlightSentence:
    'You look best in light, warm neutrals with the merest hint of color \u2014 soft pastels, pale aquas, and whispered lavenders \u2014 the ethereal palette of first light through mist.',
  inNature:
    'The first breath of dawn air before the world wakes; a whisper of breeze that stirs a single leaf; morning mist thinning into light. You are air in its most tender register \u2014 delicate, suggestive, and serene, the quiet signal that precedes all speech.',
  themes: ['Subtlety', 'Intuition', 'Delicacy', 'Serenity', 'Suggestion', 'Etherealness'],
  archetypes: ['The Intuitive', 'The Gentle Muse', 'The Quiet Oracle', 'The Soft Signal'],
  feeling: '\u201CI am the first whisper \u2014 the gentlest signal, sensing what has not yet been spoken.\u201D',
  analogy:
    'Think of the first whisper of dawn wind: so soft it barely exists, yet it carries the whole morning within it. It does not insist \u2014 it suggests. It touches everything and disturbs nothing. This is your energy: subtle, intuitive, and quietly enchanting \u2014 the presence that is felt long before it is understood.',

  celebIntro: 'Famous faces who embody the First Whisper \u2014 soft, luminous, delicate coloring that glows in light, warm, whispered pastel tones.',
  celebs: [
    { label: 'The Ethereal Muse', text: 'Soft-focus, translucent coloring \u2014 luminous in pale aqua, whispered lavender, and warm light neutrals.' },
    { label: 'The Gentle Enchanter', text: 'Delicate, dreamlike presence that suggests rather than insists \u2014 quietly magnetic.' },
    { label: 'The Quiet Intuitive', text: 'Anyone who reads a room without a word and answers questions before they\u2019re asked.' },
    { label: 'The Serene Presence', text: 'Anyone whose soft, light presence calms every space they drift through.' },
  ],

  energyParagraphs: [
    'You are Air made tender. Where pure Air is vast and lucid, your Air has been softened by Water into something intimate and intuitive \u2014 a whisper rather than a wind. You are the gentlest and most perceptive of all the Air types: light and free, but feeling everything.',
    'Water gives your Air empathy, nuance, and depth. You sense the emotional undercurrents in every room, hear what is meant beneath what is said, and communicate in suggestion, atmosphere, and grace. But unlike pure Water, you do not sink into the depths \u2014 your Air keeps you light, serene, and softly free.',
    'You are here to sense and to suggest. People come to you for gentleness, intuition, and the feeling of being understood without having to explain. People remember the softness of your presence: light, tender, and quietly luminous, like a whisper that stays with them all day. You are the signal before the sound.',
  ],
  vibration:
    'Soft, light, and shimmering \u2014 a barely-there hum like mist lifting off morning water. The vibration is delicate and serene, subtle but unmistakably present, like breath on glass.',
  blessing: 'You bless the world by channeling the nascent possible.',

  seasonalMatch:
    'Air types belong to the Spring seasonal color palette, characterized by warm undertones, clear brightness, and fresh colors. As Light Spring, your palette is the softest and most delicate of all \u2014 light, warm, and luminous, like dawn light through thin mist.',
  keyCharacteristics: [
    'Soft, light, translucent coloring',
    'Warm, delicate, luminous undertones',
    'Light depth with gentle, low contrast',
    'Looks best in light, soft, whispered colors',
    'Ethereal, serene, gently enchanting presence',
  ],

  colorPaletteIntro:
    'Your signature Air + Water palette \u2014 light, warm, whispered colors from dawn mist, pale aqua, and soft lavender light. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress in whispers, not statements.\u201D',
  styleBody:
    'The First Whisper approaches style as gentle suggestion. You are drawn to soft, light colors and fluid, delicate silhouettes. Pale aqua, whispered lavender, warm ivory, and the faintest pinks are your language. You dress to feel light, soft, and serene \u2014 subtly lovely, like mist catching first light.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t feel soft, light, and subtle, it\u2019s not for me.\u201D',
  approachTitle: 'How the First Whisper Approaches Color',
  approachLeadHeading: 'The Soft, Light, Whispered Palette',
  approachLead: 'Your colors are not loud \u2014 they are whispered. Not saturated \u2014 suggested. Not dark \u2014 luminous. You are drawn to the palest, most delicate colors of early light:',
  approachItems: [
    { label: 'Signature', text: 'Pale Aqua, Whispered Lavender, Powder Blue, Blush Mist: the barely-there colors of first light.' },
    { label: 'Anchors', text: 'Warm Ivory, Soft Cream, Pale Dove, Light Sand: gentle, light neutrals that hold your softness.' },
    { label: 'Connectors', text: 'Soft Peach, Pale Pistachio, Light Periwinkle: tender, luminous transitions that keep everything gentle.' },
    { label: 'Grounded', text: 'Dusk Periwinkle, Soft Wisteria, Misty Blue: your deepest notes \u2014 still soft, never heavy.' },
  ],
  approachRules: [
    { title: 'The Softness Rule', body: 'Your palette is delicately soft. Loud, saturated, or harsh colors shout over your natural whisper \u2014 you need gentleness to be seen.', rule: 'The Rule: \u201CIf it shouts, it\u2019s not speaking my language.\u201D' },
    { title: 'The Lightness Rule', body: 'Your colors should be light and luminous, never dark or dense. You carry a translucence that heavy colors would erase.', rule: 'The Rule: \u201CIf it\u2019s heavier than mist, it\u2019s too heavy for me.\u201D' },
    { title: 'The Suggestion Rule', body: 'You come alive in hints of color rather than blocks of it \u2014 a whisper of lavender, a breath of aqua. Total color saturation feels wrong against your subtle nature.', rule: 'The Rule: \u201CA hint of color says more than a shout of it.\u201D' },
  ],
  assembleTitle: 'How the First Whisper Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Soft, Light, Ethereal Layering',
  assemblePrincipleBody: 'You are about gentle luminosity. Your outfit should feel like dawn mist \u2014 light, fluid, and tonal, layered in soft textures and whispered colors that seem to float.',
  assembleFormula: [
    'Anchor (60%): A soft, light foundation in your warm ivory neutrals.',
    'Connector (25%): A delicate, tonal layering piece that adds gentle luminosity.',
    'Grounding (15%): One whispered accent \u2014 pale aqua, soft lavender \u2014 that suggests rather than states.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Warm-ivory trousers + a soft cream knit: a gentle, luminous foundation.' },
    { label: 'Connector', text: 'A pale-aqua or powder-blue layer: a whispered, tonal transition.' },
    { label: 'Grounding', text: 'A soft lavender scarf or pearl accessory: the delicate note that enchants quietly.' },
  ],
  impactIntro: 'For moments when you need gentle authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Pale dove-grey or warm cream tailoring: a soft yet composed foundation.' },
    { label: 'Connector', text: 'A luminous pearl or white-gold accessory: the serene, refined bridge.' },
    { label: 'Grounding', text: 'A dusk-periwinkle blouse: the soft depth that makes you quietly unforgettable.' },
  ],
  eveningIntro: 'For moments of softness and celebration:',
  eveningFormula: [
    { label: 'Anchor', text: 'A dress in whispered lavender or pale aqua: the ethereal, floating foundation.' },
    { label: 'Connector', text: 'Delicate pearl or moonstone jewelry: the luminous, weightless transition.' },
    { label: 'Grounding', text: 'A sheer, floating wrap in blush mist: the dreamlike layer that makes you glow.' },
  ],
  gettingItRightTitle: 'Getting It Right: The First Whisper at Their Best',
  gettingItRight: [
    { heading: 'The Right Softness', body: 'You understand that soft, whispered color is your power. A delicate, tonal outfit is far more beautiful on you than any bold statement.', right: 'Ivory trousers, a soft cream knit, and a pale aqua scarf. The whole look floats like mist.', wrong: 'A saturated red or hard black. The loudness erases your delicate luminosity.' },
    { heading: 'The Right Fluidity', body: 'You understand your silhouettes should drift, not grip. Stiff, sharp tailoring fights the gentle movement you carry.', right: 'A floating silk blouse that moves like breath \u2014 soft, fluid, alive.', wrong: 'A rigid, structured jacket that pins your whisper to the ground.' },
    { heading: 'The Right Shimmer', body: 'You understand accessories should be luminous and delicate, not hard or heavy. One pearl beats a statement necklace.', right: 'A single pearl pendant or fine moonstone stud. Soft, glowing, quietly magical.', wrong: 'Chunky, hard, high-shine metal that clangs against your subtlety.' },
  ],
  wearThis: [
    'Light, soft, whispered colors \u2014 pale aqua, powder blue, soft lavender, blush',
    'Warm light neutrals \u2014 ivory, cream, pale dove, light sand',
    'Delicate luminous accents \u2014 pearl, soft peach, light periwinkle',
    'Floating, fluid fabrics \u2014 chiffon, fine silk, soft jersey, gauze',
  ],
  avoidThis: [
    'Loud, saturated, or harsh colors that shout over your whisper',
    'Dark, dense, heavy tones that erase your translucence',
    'Stiff, sharp, structured pieces that pin down your lightness',
    'Hard, chunky, high-contrast accessories that break your soft spell',
  ],

  beautyQuote: '\u201CMakeup as Soft-Focus Enchantment.\u201D',
  beautyLook: 'The Look: Soft, luminous, and dreamlike. Skin that looks lit from within, with makeup drawn from dawn mist, pearl, and whispered pastels.',
  beautyItems: [
    { label: 'The Canvas', text: 'A sheer, dewy finish with a soft-focus glow \u2014 translucent and tender, never matte or heavy.' },
    { label: 'The Eyes', text: 'Pearl, pale champagne, whispered lilac, and soft aqua. Luminous, delicate washes suit you far better than defined smokiness.' },
    { label: 'The Brows', text: 'Feathered and soft, in a light warm tone that keeps the face open and gentle.' },
    { label: 'The Lips', text: 'A sheer rose, soft peach, or barely-there pink \u2014 a glossy or balm finish. Your signature whispered lip.' },
    { label: 'The Cheeks', text: 'A soft, cool-warm pink like a natural flush. A pearl highlighter \u2014 misty and luminous, never glittery.' },
  ],

  hairIntro: 'Your soft, light coloring calls for delicate, luminous, warm hair shades. Choose light golden and beige blondes, soft honey tones, and light warm browns, and avoid dark, harsh, or heavily saturated shades that overwhelm your natural delicacy.',
  nailIntro: 'Perfect polish colors for your Air + Water coloring \u2014 soft, light, luminous shades from pearl, pale aqua, and whispered pastels that complement your delicate, ethereal palette.',
  decorIntro:
    'Your ideal space is soft, light, and dreamlike \u2014 pale luminous colors, sheer fabrics, gentle curves, and diffused light everywhere. Everything should feel serene, tender, and slightly enchanted, like a room made of morning mist.',

  habitatIntro:
    'You thrive in soft, quiet, light-filled spaces \u2014 diffused daylight, gentle colors, flowing curtains, and calm. You need serenity, subtlety, and beauty around you. Loud, harsh, or chaotic environments bruise your delicate, receptive energy.',
  habitatBullets: [
    'Soft, diffused natural light \u2014 sheer curtains and gentle glow',
    'Pale, tonal colors \u2014 ivories, pale blues, whispered lavenders',
    'Flowing textiles \u2014 gauze, linen, soft layers that move with air',
    'Quiet corners for dreaming, reading, and reflection',
    'A sense of calm enchantment \u2014 candles, blossoms, gentle music',
  ],
  habitatWhy: 'Why It Works: The First Whisper needs gentleness \u2014 a soft, luminous sanctuary quiet enough to hear your own intuition and light enough to keep your spirit floating.',

  hobbiesTitle: 'The Gentle Drift Day',
  hobbiesBody:
    'A day of softness, intuition, and unhurried beauty. A slow morning with tea and a poem. An afternoon drifting \u2014 sketching, daydreaming, wandering a garden or gallery with no agenda. An evening of quiet closeness with one gentle soul, or solitude wrapped in music and candlelight. You recharge through stillness, beauty, and unstructured dreaming.',
  hobbiesBullets: ['Poetry & journaling', 'Daydreaming & visualization', 'Gentle walks & gardens', 'Watercolor & soft crafts', 'Ambient music & sound baths', 'Cloud-watching & quiet wonder'],

  loveLanguage: {
    receivesLoveThrough:
      'Gentle attunement and unspoken understanding. When someone senses your mood without being told, protects your quiet, and loves you in soft gestures rather than grand declarations. When they leave you a note, touch your shoulder gently, or simply sit with you in peaceful silence. Love, for you, is the tenderness of being sensed.',
    nonVerbalCues: 'A soft, lingering glance that says everything. Growing quieter and more luminous when you feel safe. Small, delicate gestures \u2014 a flower left on a desk \u2014 as your natural language of love.',
  },
  relationships: {
    inLove:
      'In relationships you are the gentle intuitive \u2014 the one who senses, soothes, and enchants. You love through subtlety, atmosphere, and deep attunement. You need a partner who is gentle with you, who listens for your whisper rather than demanding your shout, and who understands that your softness is not weakness \u2014 it is your deepest form of perception.',
    strengthsInRelationship: ['Deeply attuned, gentle, and perceptive', 'Creates serenity, tenderness, and quiet magic', 'Loves in subtle, thoughtful, poetic ways'],
    growthInRelationship: ['Speak your needs aloud rather than only hinting', 'Stay present in conflict instead of dissolving away', 'Let yourself take up space \u2014 your whisper deserves volume too'],
    friendshipCompatibility:
      'Your friendships are gentle, intuitive, and quietly deep. You are the friend who senses when something is wrong before a word is spoken and answers with softness. You bond through quiet presence, shared beauty, and the safety of unhurried understanding.',
  },

  animalAffinity:
    'The Luna Moth of the Dawn. The delicate, ethereal creature of soft light \u2014 rarely seen, gently luminous, drawn to glow rather than glare, and unforgettable to anyone lucky enough to notice it.',

  cinematic:
    'You\u2019re drawn to soft, dreamlike, atmospheric films \u2014 poetic imagery, gentle pacing, and stories told in mood and suggestion rather than plot. You love beauty, longing, and works that feel like remembered dreams.',
  artisticCorrespondence:
    'Your artistic signature is misted and luminous: think pale watercolors, soft-focus light, impressionist dawns, and imagery that suggests more than it shows. In music you resonate with ambient, delicate, floating sound. Across all art forms you are the first whisper \u2014 the almost-spoken made beautiful.',

  lifePurpose: {
    gift: 'You sense. You perceive what has not yet been spoken and gently give it a place to land. Your presence makes people feel understood without effort.',
    spiritualPurpose:
      'You are here to be a sensor and a soother. Your soul came to be the first whisper \u2014 to catch the nascent possible before it has words, to soften harsh rooms with gentle presence, and to remind others that the quietest signal often carries the deepest truth. Your purpose is to perceive and to gently reveal. But you must also learn to speak \u2014 to give your whisper enough voice to be heard, and to trust that your presence deserves space.',
    soulsAssignment: '\u201CI am here to hear what has not yet been spoken \u2014 and to learn that my own voice deserves the air too.\u201D',
    inOneSentence: 'You came to remind the world that the softest signal carries the deepest truth \u2014 and to learn that even a whisper must sometimes be spoken aloud.',
  },

  mantras: [
    '\u201CTo sense is to serve.\u201D',
    '\u201CNot the shout, but the whisper that precedes all speech.\u201D',
    '\u201CI am the lightest signal, carrying the deepest truth.\u201D',
    '\u201CMy softness is perception \u2014 and my voice deserves air.\u201D',
  ],
  mantraMeditation: '\u201CWhat am I sensing that no one has said aloud? Where am I hinting when I need to speak? What is one truth I will give voice to today?\u201D',
  shadowBalance: 'Shadow Balance: The First Whisper must remember that a signal too soft to be heard cannot help anyone. You must learn to speak as well as sense \u2014 to say your needs plainly, to stay present when things get loud, and to trust that your voice will not break the spell.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the first whisper \u2014 subtle, intuitive, and gently free.\u201D' },
    { context: 'At Work', sentence: '\u201CI\u2019m sensing something beneath the surface here \u2014 let\u2019s listen to it before we decide.\u201D' },
    { context: 'In Love', sentence: '\u201CI will sense you deeply \u2014 and I am learning to let you hear me too.\u201D' },
    { context: 'In Crisis', sentence: '\u201CSoftly now. Let\u2019s quiet the noise and listen for what\u2019s true.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to speak my whisper aloud.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. East is Air (thought, the rising dawn), North is Earth (stillness, foundation), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'East-by-Northeast \u2014 the first sound',
  directionAngle: 67.5,
  airCompassLabel: 'AIR',
  directionBullets: [
    { label: 'Direction', text: 'East-by-Northeast (the first sound). You face east, into beginning, but toward the still edge where Air meets Earth\u2019s quiet \u2014 the breath before the word.' },
    { label: 'The First Sound', text: 'The whisper that precedes speech; the breath that carries the first word. Your direction is toward the tender moment where voice begins.' },
    { label: 'Orientation', text: 'You seek gentle emergence \u2014 the subtle, the nascent, the almost-spoken truth waiting to be sensed and given air.' },
    { label: 'Shadow Orientation', text: 'When lost, you fade into pure suggestion \u2014 hinting, dissolving, and drifting so softly that no one, including you, can hear what you need.' },
  ],
  directionClosingQuote: '\u201CI face the first sound. I honor the whisper that begins everything.\u201D',

  career: {
    drawnTo: ['Counselor / Therapist', 'Poet / Writer', 'Designer / Aesthetician', 'Researcher / Sensemaker', 'Healer / Bodyworker', 'Curator / Archivist', 'UX / Experience Designer', 'Spiritual Guide'],
    why: 'Careers of perception, gentleness, and subtle insight. You need work that honors nuance and atmosphere, rewards deep listening, and gives you quiet space to sense. You thrive where empathy, subtlety, and intuition are valued over volume and speed.',
  },
  idealWorkTitle: 'The Quiet Studio',
  idealWorkBody:
    'Calm, gentle, and unhurried. A culture that values depth over noise, listening over posturing, and quality of attention over speed. You need soft-spoken collaboration, protected quiet time, and work where your perception is treated as expertise. You thrive in counseling, writing, design, research, and any space where subtlety is the skill.',
  idealWorkAvoid: 'Loud, aggressive, high-pressure environments where the loudest voice wins and sensitivity is dismissed as fragility.',
  secretSauceBody:
    'Your subtlety is not vagueness; it is precision at a frequency others can\u2019t hear. You need to know that your ability to sense the unspoken \u2014 the client\u2019s real worry, the team\u2019s unnamed tension, the idea beneath the idea \u2014 is a rare instrument. Your role is to say \u201CThere\u2019s something here we haven\u2019t named yet\u201D and to be the room\u2019s finest listener.',
  secretSauceImpression: '\u201CShe notices what everyone else misses. Somehow she always knows what\u2019s really going on.\u201D',
  leadershipTitle: 'The Gentle Attuner',
  leadershipBody:
    'You lead through attunement, gentleness, and quiet insight. You sense what your people need before they ask, create calm where there was tension, and guide with suggestion rather than command. You don\u2019t lead by force; you lead by making everyone feel deeply seen and softly steadied.',
  leadershipBlindspots: 'Your gentleness can avoid necessary confrontation, and your subtlety can leave people unsure of direction. Pair your attunement with clear decisions, plain words, and the courage to be direct when it matters.',

  communicationCallout: 'The Whispered Truth',
  communication: {
    preferredMedium: 'Soft + written. You communicate best in gentle one-on-one conversation, thoughtful notes, and quiet moments \u2014 where nuance can breathe and nothing has to be shouted.',
    strengths: 'Attunement, delicacy, and depth. You hear what is meant beneath what is said, choose words with poetic precision, and make hard truths land softly.',
    howOthersReachYou: 'Be gentle and unhurried. Speak softly, listen fully, and leave room for silence. Quiet, sincere connection reaches you far more than volume, pressure, or performance.',
  },

  lifeLesson:
    'Your lesson is to speak and be heard. The whisper that senses everything must also say something; the intuitive who understands everyone must let herself be understood. You must learn to give your perceptions voice, your needs words, and your presence weight.',
  coreBlocks: [
    'Hinting at needs instead of naming them',
    'Dissolving or drifting away in conflict',
    'Absorbing every atmosphere until you lose your own',
    'Believing your voice is too small to matter',
  ],
  imbalance:
    'When out of balance, your whisper either scatters or falls silent. Scattered, you become anxiously porous \u2014 absorbing every mood, over-sensing and overwhelmed, a wind chime in a storm. Silent, you fade \u2014 unheard, unexpressed, and drifting through your own life like mist, present everywhere and solid nowhere.',

  healing: [
    'Practice saying one need plainly each day \u2014 no hints, no softening',
    'Protect your porousness: limit noise, crowds, and chaotic energy',
    'Ground gently \u2014 warm baths, soft blankets, slow barefoot walks',
    'Keep a voice journal: write the unspoken, then speak one line aloud',
  ],
  healingCallout: 'Excess: Storm-Tossed Chime (Porous & Overwhelmed)  /  Deficiency: Faded Mist (Silent & Unseen)',
  calmExcessHeading: 'To Calm Excess \u2014 Porousness & Overwhelm',
  calmExcessIntro: 'When your whisper scatters \u2014 absorbing every mood, over-sensing, anxious and overwhelmed \u2014 the goal is to soften input, boundary, and settle:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Chamomile & Passionflower \u2014 to quiet an over-receiving nervous system and restore calm.' },
    { label: 'Nutrients', text: 'Magnesium and B-vitamins to steady sensitivity and support gentle resilience.' },
    { label: 'Diet', text: 'Warm, soft, regular meals; reduce caffeine and stimulation that amplify your porousness.' },
    { label: 'Movement', text: 'Slow, flowing movement \u2014 gentle yoga, swimming, tai chi \u2014 to settle the drifting mind into the body.' },
    { label: 'Containment', text: 'Quiet hours, fewer feeds, and one protected sanctuary space that is yours alone.' },
  ],
  rebuildHeading: 'To Rebuild Deficiency \u2014 Fading & Silence',
  rebuildIntro: 'When your whisper fades \u2014 unheard, unexpressed, drifting through your own life \u2014 the goal is to embody, voice, and gently solidify:',
  rebuildItems: [
    { label: 'Herbs', text: 'Ashwagandha & Ginger \u2014 to warm, root, and restore quiet strength to your presence.' },
    { label: 'Nourishment', text: 'Warm, substantial, comforting meals eaten slowly \u2014 nourishment as self-recognition.' },
    { label: 'Reconnection', text: 'Speak daily \u2014 read a poem aloud, voice one opinion, let one safe person hear your true thoughts.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Gentle, receptive practice \u2014 breath meditation, sound baths, dawn stillness \u2014 that honors your subtle perception.' },
    { label: 'Balancing (Counter-Energy)', text: 'Voice and embodiment. Chanting, singing, speaking practices \u2014 anything that gives your whisper resonance.' },
    { label: 'Ritual', text: 'A morning voice ritual \u2014 one true sentence spoken aloud to the dawn \u2014 to join your sensing with your speaking.' },
  ],

  biorhythmRhythmHeading: 'The Seasonal & Circadian Rhythm',
  chronotype: 'Gentle and liminal \u2014 most alive at the soft edges of the day: early morning and dusk. Needs unhurried transitions and quiet buffers between activities.',
  peakTime: 'Early Morning & Dusk. Your intuition is clearest in the liminal, in-between hours.',
  biorhythmScheduleIntro: 'Peak time: 6\u20139 AM & 5\u20137 PM \u2014 soft, liminal energy for sensing, creating, and gentle connection.',
  biorhythmSchedule: [
    'Dawn \u2014 The whisper hour. Stillness, journaling, and listening to your intuition.',
    '8\u201311 AM \u2014 Gentle peak. Sensitive creative work, writing, and one-on-one depth.',
    'Midday \u2014 Soft maintenance. Light tasks, gentle walks, and quiet recovery from input.',
    '5\u20137 PM \u2014 The dusk window. Reflection, beauty, and tender connection.',
    'Evening \u2014 Wind down early and softly \u2014 candlelight, quiet, and gentle rituals before sleep.',
  ],
  newYearResolution: 'This year, give your whisper a voice. Name one need aloud each day, and let the people who love you actually hear you.',

  ultimateGoal:
    'To become the Voice of the Almost-Spoken \u2014 whose gentle, intuitive presence senses the nascent truth in every room and gives it air, while learning to speak, to take up space, and to let the world hear the whisper that has always understood it.',
  finalSummary: [
    'The First Whisper is not merely quiet \u2014 it is a subtle, perceptive force of gentle knowing. Your gift is not the shout or the storm, but the whispered signal that precedes all speech. You sense, you soothe, and you catch the possible before it has words. Your purpose is to perceive and gently reveal \u2014 and in doing so, to make the world softer, kinder, and more deeply heard.',
    'But the deepest truth of your nature is this: a whisper is still a voice. To sense without disappearing; to soften without silencing yourself; to suggest and also, sometimes, to say. When you learn to speak as tenderly as you listen, you become the most quietly powerful presence in any room: the gentle knowing that is finally, fully heard.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Air + Water nature is a sacred force \u2014 not a faintness to be fixed, but a subtlety to be honored. Wear your colors like dawn mist catching first light, sense what the world has not yet spoken, and remember: the one who hears everyone deserves to be heard as well.',
};
