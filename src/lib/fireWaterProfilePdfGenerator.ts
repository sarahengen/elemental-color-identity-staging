import { fireWaterProfile } from '@/data/fireWaterProfile';
import { buildFireSubtypeProfilePDF, FireProfileConfig } from './fireSubtypeProfilePdfBuilder';

export async function generateFireWaterProfilePDF(): Promise<void> {
  const cfg: FireProfileConfig = {
    element: 'fire',
    subtypeId: 'fire-water',
    heroLabel: 'THE BLUE FLAME',
    title: 'Fire + Water',
    footerLabel: 'THE INVISIBLE SELF  \u00B7  FIRE + WATER PROFILE',
    fileName: 'fire-water-blue-flame-profile.pdf',

    primary: [227, 11, 92],     // Raspberry (ember)
    secondary: [1, 107, 107],   // Deep Sea Green (pine role)
    tertiary: [110, 55, 103],   // Light Damson (burgundy role)
    essenceHighlight: [1, 107, 107],

    identityRows: [
      { label: 'Elemental Signature', value: 'Fire + Water (Fire as Dominant, Water as Influencer)' },
      { label: 'Seasonal Anchor', value: 'Cool Winter' },
      { label: 'Core Mantra', value: '\u201CI AM the bluest, hottest flame.\u201D' },
    ],
    essenceHighlightSentence:
      'Fire that has burned away its own impurities.',

    celebIntro:
      'Famous faces who embody the Blue Flame \u2014 cool, refined, medium-contrast coloring that glows in rose pink, periwinkle, and icy tones.',
    celebs: [
      { label: 'Cate Blanchett', text: 'Cool, refined elegance with medium contrast \u2014 stunning in rose pink and periwinkle.' },
      { label: 'Nicole Kidman', text: 'Porcelain skin with cool undertones, elegant in soft plum and icy pink.' },
      { label: 'Tilda Swinton', text: 'The archetype of cool, contained intensity \u2014 ethereal, precise, and otherworldly.' },
      { label: 'Elsa (fictional)', text: 'The icy queen whose contained power glows blue \u2014 the literal blue flame made character.' },
    ],

    energyParagraphs: [
      'You are fire refined into stillness \u2014 the hottest part of the flame, burning blue. Your intensity is not loud; it is contained, focused, and precise. Where other Fire subtypes flare and crackle, yours has burned away every impurity, leaving only clear, cool heat. You see with great discernment, you hold your emotion with intention, and your calm surface conceals a powerful inner fire.',
      'You are the one others turn to for clarity without chaos \u2014 the calm, discerning presence who cuts through confusion with quiet authority. You listen deeply, then speak with weight. You refine, you focus, you reveal what matters. And the people around you feel both soothed by your stillness and aware of the formidable heat held just beneath your composed, blue-lit surface.',
    ],
    feeling: '\u201CI am the still flame that burns hottest.\u201D',
    analogy:
      'Think of the blue core of a flame \u2014 the part with no smoke and no soot, hotter than the visible fire around it. This is your energy: fire purified, contained, and burning at its most precise and powerful.',

    seasonalMatch:
      'Fire types belong to the Winter seasonal color palette, characterized by cool undertones and clarity. As Fire cooled by Water, your Cool Winter palette leans into the cooler, softer, more refined of these tones \u2014 clear but never harsh, intense but contained.',

    keyCharacteristics: [
      'Cool undertones throughout',
      'Medium contrast coloring',
      'Looks best in cool, clear colors',
      'Can wear softer versions of Fire colors',
      'Bridges Fire and Water palettes',
    ],

    colorPaletteIntro:
      'Your signature Fire + Water palette \u2014 cool, clear, refined colors that honor the elegance of fire cooled by water. Each swatch includes its exact hex code.',

    styleQuote: '\u201CI dress to be composed, not loud.\u201D',
    styleBody:
      'The Blue Flame approaches style as a study in refined restraint. Your clothing is about coolness, precision, and quiet luminosity \u2014 the contained expression of your blue-lit intensity. You dress to convey composure and depth, to be the elegant, unmistakable stillness in any room.',
    styleMantra: 'Your Style Mantra: \u201CIf it isn\u2019t cool, clear, and considered, it isn\u2019t mine.\u201D',

    approachTitle: 'How the Blue Flame Approaches Color',
    approachLeadHeading: 'The Cool, Clear Palette',
    approachLead:
      'Your colors are not warm \u2014 they are cool. Not muddy \u2014 clear. Not loud \u2014 refined. You are drawn to colors that glow like ice with heat beneath:',
    approachItems: [
      { label: 'Signature', text: 'Periwinkle, Raspberry, Deep Sea Green, Shocking Pink: Cool, clear colors with refined intensity.' },
      { label: 'Anchors', text: 'Soft Black, Stone, Cool Mauve: Composed, luminous foundations that hold your coolness.' },
      { label: 'Connectors', text: 'Mole, Cool Mauve: Refined neutral transitions that keep everything elegant.' },
      { label: 'Spark', text: 'Acid Lavender, Ice Pink: The single cool accent \u2014 fire seen as blue light.' },
    ],
    approachRules: [
      { title: 'The Coolness Rule', body: 'Your palette is cool. Warm, golden, earthy tones fight your nature and dull your luminosity. You need colors with a clear, cool cast that match your refined heat.', rule: 'The Rule: \u201CIf it isn\u2019t cool, it isn\u2019t mine.\u201D' },
      { title: 'The Clarity Rule', body: 'Your colors are clear, not muddy. Dusty, greyed-warm tones cloud your blue luminosity. You shine in clean, cool tones \u2014 the kind that look like ice catching light.', rule: 'The Rule: \u201CGive me the clarity of ice and the heat held within.\u201D' },
      { title: 'The Refinement Rule', body: 'You carry contained contrast. A composed cool base with one refined accent \u2014 soft black with raspberry, stone with periwinkle \u2014 creates the elegant intensity that feels like you.', rule: 'The Rule: \u201COne cool note against the calm \u2014 that is all the drama I need.\u201D' },
    ],

    assembleTitle: 'How the Blue Flame Assembles an Outfit',
    assemblePrincipleHeading: 'The Principle: Composed Foundation, One Cool Note',
    assemblePrincipleBody:
      'You are not a bonfire. You are a blue core. Your outfit should be built on a cool, composed foundation \u2014 with one refined, cool point of color that signals the heat within.',
    assembleFormula: [
      'Foundation (60%): A cool, refined base in your Anchor colors \u2014 soft black, stone, or cool mauve.',
      'Connector (25%): A composed neutral layer that keeps the elegance.',
      'Spark (15%): One cool, clear statement \u2014 the blue-lit note that defines the look.',
    ],
    everydayFormula: [
      { label: 'Foundation', text: 'Soft-black trousers + a stone knit: Cool, composed, refined.' },
      { label: 'Connector', text: 'A cool-mauve or grey layer: Elegant depth that stays quiet.' },
      { label: 'Spark', text: 'A raspberry scarf or periwinkle accessory: The cool note that signals the fire.' },
    ],
    impactIntro: 'For moments when you need quiet authority:',
    impactFormula: [
      { label: 'Foundation', text: 'A soft-black or deep-navy suit in clean, fine cloth: The composed foundation.' },
      { label: 'Connector', text: 'A cool silver or platinum accent: The refined, luminous bridge.' },
      { label: 'Spark', text: 'A raspberry detail or deep-sea-green tie: The unmistakable cool heat within.' },
    ],
    eveningIntro: 'For moments of depth and elegance:',
    eveningFormula: [
      { label: 'Foundation', text: 'A periwinkle or soft-black dress in a refined cut: The composed base.' },
      { label: 'Connector', text: 'Cool silver or pearl jewelry: The luminous, cool transition.' },
      { label: 'Spark', text: 'A cool raspberry lip or a single icy gem: The blue-lit point that makes you unforgettable.' },
    ],

    gettingItRightTitle: 'Getting It Right: The Blue Flame at Their Best',
    gettingItRight: [
      { heading: 'The Right Coolness', body: 'You understand that coolness is your power. A clear, cool palette does more for you than any warm tone ever could.', right: 'Soft-black trousers, a stone knit, and a periwinkle accent. Cool, refined, quietly commanding.', wrong: 'Warm camel, golden brown, and rust. The coolness is gone, and so is the luminosity.' },
      { heading: 'The Right Refinement', body: 'You understand that restraint reads as elegance. Composed, considered pieces serve you better than anything loud.', right: 'A clean, fine-cloth base with one cool accent. Quiet, intentional, and refined.', wrong: 'Busy, loud, over-warm looks that break your composed calm.' },
      { heading: 'The Right Accent', body: 'You understand that one cool note is enough. A single refined point of color against the calm is more powerful than scattered brights.', right: 'A single raspberry detail against an all-cool outfit. Focused and elegant.', wrong: 'Many competing warm brights that fracture your cool clarity.' },
    ],

    beautyPhilosophyTitle: 'Make-up Philosophy',
    beautyQuote: '\u201CMakeup as Cool Luminosity.\u201D',
    beautyLook: 'The Look: Cool, clear, and refined. Like moonlight on still water.',
    beautyItems: [
      { label: 'The Canvas', text: 'Luminous, even finish with a cool, dewy glow. Your skin should look clear and cool-toned, like fine porcelain catching soft light.' },
      { label: 'The Eyes', text: 'Cool definition \u2014 soft greys, cool taupes, icy lilacs, and clean liner. Smoked but never warm, refined rather than dramatic.' },
      { label: 'The Brows', text: 'Soft, defined, and natural \u2014 clean lines that frame without harshness.' },
      { label: 'The Lips', text: 'Cool reds, raspberry, soft berry, and cool rose. Refined, never orange-based. Satin or soft-matte finish.' },
      { label: 'The Cheeks', text: 'Cool, sculpting contour and a cool-rose or raspberry flush. Cool, pearlescent highlight \u2014 silver, never gold.' },
    ],
    beautyTipsHeading: 'Make-up Tips for Fire + Water',

    hairIntro:
      'Your cool, medium-contrast coloring calls for clear, cool-toned hair shades. Choose ashy brunettes, cool blacks, and soft cool tones with clean dimension, and avoid anything warm, golden, or brassy that fights your blue-cool clarity.',
    nailIntro:
      'Perfect polish colors for your Fire + Water coloring \u2014 cool, refined shades from raspberry and periwinkle to icy neutrals that complement your composed palette.',
    decorIntro:
      'Your space blends Fire\u2019s focus with Water\u2019s serenity. Cool, refined color and clean, luminous materials create an atmosphere of elegant, contained calm.',

    habitatBullets: [
      'Calm, refined, and impeccably composed',
      'A minimalist sanctuary built for deep focus',
      'Cool, luminous materials \u2014 glass, stone, still water, pale wood',
      'Quiet elegance over clutter and noise',
      'A serene setting that holds your stillness and depth',
    ],
    habitatWhy:
      'Why It Works: The Blue Flame needs to be where things are calm and considered \u2014 a place that mirrors your composed mind. You need spaces that feel serene, refined, and uncluttered, the way your presence is.',

    hobbiesTitle: 'The Solo Immersion',
    hobbiesBody:
      'A day of quiet, refined depth. A morning of focused study or research. An afternoon of mastery-driven craft \u2014 photography, design, music. Evening of culture or stillness with one or two trusted people. You recharge through solitude, depth, and the appreciation of a single perfect thing.',
    hobbiesBullets: ['Reading & deep study', 'Photography & design', 'Swimming & cool-water practice', 'Curating & collecting', 'Strategy & contemplation', 'Refined creative craft'],

    animalAffinity:
      'Heron. The epitome of patient, contained precision \u2014 still, focused, and elegant, then striking with sudden, exact intensity. It stands calm in cool water, all composure on the surface and sharp purpose beneath.',

    mantras: [
      '\u201CTo see clearly is to serve.\u201D',
      '\u201CNot the noise, but the still flame that endures.\u201D',
      '\u201CI am the calm others think clearly within.\u201D',
      '\u201CTo reveal what is essential is my purpose.\u201D',
    ],
    mantraMeditation: '\u201CWhat is essential here? Where can I bring calm clarity? What truth can I reveal with warmth?\u201D',
    shadowBalance:
      'Shadow Balance: The Blue Flame must remember that contained heat can freeze. You must learn the art of opening \u2014 of letting people past the composed surface, of accepting the imperfect, of letting your clarity become warmth rather than distance.',

    oneSentenceRows: [
      { context: 'To Yourself', sentence: '\u201CI AM the bluest, hottest flame.\u201D' },
      { context: 'At Work', sentence: '\u201CLet me consider \u2014 then I will give you clarity.\u201D' },
      { context: 'In Love', sentence: '\u201CI feel more than I show, and I am letting you in.\u201D' },
      { context: 'In Crisis', sentence: '\u201CStay calm \u2014 I can see what matters here.\u201D' },
      { context: 'At Rest', sentence: '\u201CI am learning to open and to feel.\u201D' },
    ],

    directionSacredGeo:
      'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self: a map not of land, but of soul. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
    directionLabel: 'The cool edge \u2014 South-by-Southwest',
    directionAngle: 22.5,
    directionBullets: [
      { label: 'Direction', text: 'South-by-Southwest (the cool edge). You face south, toward fire, but you lean always toward Water \u2014 the place where fire becomes still, cool light.' },
      { label: 'The Cool Glow', text: 'The blue core of the flame; fire that has become refined and contained. Your direction is toward what is clear, essential, and quietly powerful.' },
      { label: 'Orientation', text: 'You seek clarity and depth \u2014 the still surface that reveals what is real, the contained heat that endures without burning out.' },
      { label: 'Shadow Orientation', text: 'When lost, you cool too far \u2014 stillness freezes into detachment, and the warmth held inside never reaches anyone.' },
    ],
    directionClosingQuote: '\u201CI face the cool glow. I honor what is essential.\u201D',

    idealWorkTitle: 'The Laboratory',
    idealWorkBody:
      'Calm, precise, and depth-driven. A culture that values discernment, refinement, and considered judgement. You need the quiet to think deeply, the autonomy to refine, and the respect for quality over speed. You thrive in research, strategy, design, diplomacy, and any field that rewards calm, exact insight.',
    idealWorkAvoid:
      'Loud, frantic, brainstorm-everything environments where depth is sacrificed for noise and nothing is ever refined.',

    secretSauceBody:
      'Your silence is not disengagement; it is processing. You need to know that your quiet, focused demeanor reads as depth, not distance. When you speak after extended listening, your words carry disproportionate weight. Don\u2019t force participation in rapid brainstorming \u2014 signal your engagement with a nod, a note, a steady gaze. Then deliver the synthesized insight that no one else could have formulated.',
    secretSauceImpression:
      '\u201CWhen you finally speak, everyone leans in \u2014 because you only say what truly matters.\u201D',

    leadershipTitle: 'The Strategic Sage',
    leadershipBody:
      'You lead through calm, discernment, and considered authority. You are the leader who stays composed under pressure, who sees the deeper pattern, and who guides with quiet, precise wisdom. You don\u2019t dominate the room \u2014 you bring the still clarity that lets everyone else find their footing.',
    leadershipBlindspots:
      'Your composure can read as coldness, and your restraint can leave others guessing. You may withhold warmth or wait too long to act. Practice visible warmth, share your reasoning, and let people feel the heat beneath your calm \u2014 leadership includes connection, not just clarity.',

    communicationCallout: 'The Considered Authority',
    communicationPreferredLabel: 'Considered (Refined)',

    coreBlocksTitle: 'The Fear of Spilling Over',
    coreBlocksBody:
      'Losing your composure, being overwhelmed by feeling, or being forced into chaotic noise that breaks your calm. A context where depth is unwelcome, stillness is mistaken for coldness, and your refined clarity has no room to breathe.',

    healingCallout: 'Excess: Frozen Stress  /  Deficiency: Fragmentation',
    calmExcessHeading: 'To Calm Excess \u2014 Frozen Stress',
    calmExcessIntro:
      'When your contained flame freezes under pressure into rigidity and emotional shutdown, the goal is to thaw, soften, and restore flow:',
    calmExcessItems: [
      { label: 'Herbs', text: 'Warming, circulating botanicals such as ginger and cinnamon \u2014 to gently thaw frozen tension.' },
      { label: 'Nutrients', text: 'Omega-3s and magnesium \u2014 to support a contained, over-controlled nervous system.' },
      { label: 'Bodywork', text: 'Warm baths, gentle flowing movement, and breathwork to release frozen stress.' },
      { label: 'Release', text: 'Letting trusted people in \u2014 expressing feeling rather than containing it \u2014 practiced like medicine.' },
      { label: 'Environment', text: 'Warm, soft, soothing surroundings that invite the surface to soften.' },
    ],
    rebuildHeading: 'To Rebuild Deficiency \u2014 Fragmentation',
    rebuildIntro:
      'When your focus scatters and you feel fragmented and depleted, the goal is to gently restore coherence, calm, and clarity:',
    rebuildItems: [
      { label: 'Herbs', text: 'Centering adaptogens such as ashwagandha and holy basil \u2014 to restore steadiness.' },
      { label: 'Nourishment', text: 'Warm, simple, grounding meals to refuel a scattered system.' },
      { label: 'Restorative Rest', text: 'Protected solitude and deep, quiet rest \u2014 treating stillness as essential repair.' },
    ],
    spiritualRealignment: [
      { label: 'Primary (Resonance)', text: 'Water-based and reflective practices \u2014 swimming, still-water meditation, and quiet contemplation that honor your cool, deep nature.' },
      { label: 'Balancing (Counter-Energy)', text: 'Warming, expressive practices \u2014 gentle heat, candle gazing, and emotional expression \u2014 that teach you to open and feel.' },
      { label: 'Ritual', text: 'Sitting with a single flame or a still bowl of water; \u201Copening\u201D rituals where you deliberately share something you would normally contain.' },
    ],

    biorhythmRhythmHeading: 'The Cool, Focused Rhythm',
    chronotype: 'Calm and contained, with two clear, focused peaks \u2014 a refined late-morning window and a deep late-evening one.',
    peakTime: 'Late Morning (10 AM\u201312 PM) & Late Evening (10 PM\u20131 AM). Deep, refined, focused work in quiet stretches.',
    biorhythmScheduleIntro: 'Two cool, focused peaks frame your day, with quiet, restorative stretches between them.',
    biorhythmSchedule: [
      '7\u201310 AM \u2014 Calm, deliberate start. Quiet routine, reflection, easing into focus.',
      '10 AM\u201312 PM \u2014 First clarity peak. Your most refined, considered work.',
      '12\u20136 PM \u2014 Steady, measured output with protected quiet time to recover.',
      '6\u201310 PM \u2014 Restorative evening. Solitude, culture, deep rest, and connection with a trusted few.',
      '10 PM\u20131 AM \u2014 Second deep peak. Reflective, creative, late-night focus when the world is still.',
    ],

    ultimateGoal:
      'To become the Still Beacon \u2014 a clarity so calm and so warm that it reveals what is essential, soothes the chaos around it, and lets others both see clearly and feel safe.',
    finalSummary: [
      'The Blue Flame is not merely cool \u2014 it is refined fire at its most precise. Your gift is not the flare of the flame, but the clear, contained heat at its core. You see what is essential, you bring calm to chaos, and you reveal what is real. Your purpose is to clarify with discernment \u2014 and in doing so, to give the world the steady, refined clarity it cannot find in the noise.',
      'But the deepest truth of your nature is this: the bluest flame burns hottest, and it warms most when it lets itself be felt. You are not just the cool clarity that reveals \u2014 you are the contained heat that, once shared, transforms. And when you learn to open without losing your composure, to warm without burning out, you become the most powerful force in any room: the one who sees clearly, and who lets others feel held in the stillness.',
    ],
  };

  await buildFireSubtypeProfilePDF(fireWaterProfile, cfg);
}
