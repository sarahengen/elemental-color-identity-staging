import { fireFireProfile } from '@/data/fireFireProfile';
import { buildFireSubtypeProfilePDF, FireProfileConfig } from './fireSubtypeProfilePdfBuilder';

export async function generateFireFireProfilePDF(): Promise<void> {
  const cfg: FireProfileConfig = {
    element: 'fire',
    subtypeId: 'fire-fire',
    heroLabel: 'THE ELECTRIC ARC',
    title: 'Fire + Fire',
    footerLabel: 'THE INVISIBLE SELF  \u00B7  FIRE + FIRE PROFILE',
    fileName: 'fire-fire-electric-arc-profile.pdf',

    primary: [196, 30, 58],     // True Red (ember)
    secondary: [65, 105, 225],  // Royal Blue (pine role)
    tertiary: [21, 130, 87],    // Emerald (burgundy role)
    essenceHighlight: [65, 105, 225],

    identityRows: [
      { label: 'Elemental Signature', value: 'Fire + Fire (Fire as Dominant and Influencer)' },
      { label: 'Seasonal Anchor', value: 'True Winter' },
      { label: 'Core Mantra', value: '\u201CI AM the clearest flame.\u201D' },
    ],
    essenceHighlightSentence:
      'You wear Crimson Red better than anyone, and red lipstick may have been invented for you.',

    celebIntro:
      'Famous faces who embody the Electric Arc \u2014 striking, high-contrast coloring that glows in pure white, jet black, and true red.',
    celebs: [
      { label: 'Liv Tyler', text: 'Classic True Winter with striking dark hair against porcelain skin, creating dramatic high contrast.' },
      { label: 'Megan Fox', text: 'Jet-black hair and bright blue-green eyes with cool undertones exemplify the Pure Fire intensity.' },
      { label: 'Dita Von Teese', text: 'The ultimate True Winter icon \u2014 signature black hair, red lips, and a porcelain complexion.' },
      { label: 'Snow White (fictional)', text: '\u201CSkin white as snow, lips red as blood, hair black as ebony\u201D \u2014 the archetypal True Winter.' },
    ],

    energyParagraphs: [
      'You are fire at its purest \u2014 not warmth but light, not smolder but blaze. Your will is focused to a point, your vision sharp enough to cut. Where other Fire subtypes diffuse or temper their flame, yours burns clean and concentrated. You see the heart of a matter instantly, and you say it plainly. Your presence is electric and exact, and people orient toward you the way a needle finds north.',
      'You are the one others look to when a decision must be made and the fog must lift. You name what is true. You hold the highest standard in the room. You illuminate the path forward. And the people around you trust that with you, there will be no pretense, no muddle, no wasted motion \u2014 only clarity, conviction, and the clean, commanding light of the purest flame.',
    ],
    feeling: '\u201CI am the light that cannot be dimmed.\u201D',
    analogy:
      'Think of a faceted ruby catching a beam of light \u2014 clear, cut, and brilliant, throwing sharp color in every direction. This is your energy: fire crystallized into pure, unwavering illumination.',

    seasonalMatch:
      'Fire types belong to the Winter seasonal color palette, characterized by cool undertones, high contrast, and clear, saturated colors. As the purest Fire, your True Winter palette is the clearest and most saturated of all \u2014 pure white, jet black, and true, electric color.',

    keyCharacteristics: [
      'Highest contrast between hair, skin, and eyes',
      'Cool undertones throughout',
      'Can wear pure white and jet black',
      'Looks best in clear, saturated colors',
      'Dramatic and striking appearance',
    ],

    colorPaletteIntro:
      'Your signature Fire + Fire palette \u2014 pure, saturated, high-contrast colors that honor the crystalline clarity of the purest flame. Each swatch includes its exact hex code.',

    styleQuote: '\u201CI dress to be unmistakable.\u201D',
    styleBody:
      'The Electric Arc approaches style as a statement of clarity. Your clothing is about contrast, precision, and conviction \u2014 the clean, dramatic expression of your crystalline strength. You dress to command, to be the sharp, unmistakable presence that defines a room.',
    styleMantra: 'Your Style Mantra: \u201CIf it isn\u2019t clear and intentional, it isn\u2019t mine.\u201D',

    approachTitle: 'How the Electric Arc Approaches Color',
    approachLeadHeading: 'The Crystalline Palette',
    approachLead:
      'Your colors are not soft \u2014 they are clear. Not muted \u2014 saturated. Not warm \u2014 cool and sharp. You are drawn to colors that look cut from gemstone and lit from within:',
    approachItems: [
      { label: 'Signature', text: 'True Red, Royal Blue, Emerald, Fuchsia: Pure, saturated colors with electric clarity.' },
      { label: 'Anchors', text: 'Pure White, Jet Black, Navy: Stark, high-contrast foundations that sharpen everything.' },
      { label: 'Connectors', text: 'Charcoal, Cool Taupe, Silver: Cool, clean transitions that keep the crispness intact.' },
      { label: 'Spark', text: 'Hot Pink, Ice Blue: The single electric accent \u2014 fire seen as pure light.' },
    ],
    approachRules: [
      { title: 'The Clarity Rule', body: 'Your palette is clear and saturated. You cannot wear muddy, dusty, or chalky tones \u2014 they cloud your sharp brilliance. You need colors that look clean-cut and lit from within.', rule: 'The Rule: \u201CIf it isn\u2019t clear, it isn\u2019t mine.\u201D' },
      { title: 'The Contrast Rule', body: 'You carry your own contrast. The combination of a stark base with one pure accent \u2014 white with true red, black with royal blue \u2014 creates the dramatic clarity that feels like you.', rule: 'The Rule: \u201COne pure note against the stark \u2014 that is my power.\u201D' },
      { title: 'The Temperature Rule', body: 'Your palette is cool. Warm, golden, earthy tones fight your clarity and dull your shine. Keep your colors crisp and cool to stay luminous.', rule: 'The Rule: \u201CCool and clear, never warm and muddy.\u201D' },
    ],

    assembleTitle: 'How the Electric Arc Assembles an Outfit',
    assemblePrincipleHeading: 'The Principle: Stark Foundation, One Pure Note',
    assemblePrincipleBody:
      'You are not a watercolor. You are a cut gem. Your outfit should be built on a clean, high-contrast foundation \u2014 with one pure, saturated point of color that signals the fire within.',
    assembleFormula: [
      'Foundation (60%): A stark, well-cut base in your Anchor colors \u2014 white, black, or navy.',
      'Connector (25%): A cool, clean transitional layer that keeps the crispness.',
      'Spark (15%): One pure, saturated statement \u2014 the electric note that defines the look.',
    ],
    everydayFormula: [
      { label: 'Foundation', text: 'Black trousers + a crisp white shirt: Stark, clean, commanding.' },
      { label: 'Connector', text: 'A charcoal or silver-grey layer: Cool depth that keeps the lines sharp.' },
      { label: 'Spark', text: 'A true-red bag or scarf: The single pure note that signals the fire.' },
    ],
    impactIntro: 'For moments when you need to command the room:',
    impactFormula: [
      { label: 'Foundation', text: 'A jet-black or navy suit in sharp, structured cloth: The faceted foundation.' },
      { label: 'Connector', text: 'A cool silver accessory: The clean, crystalline bridge.' },
      { label: 'Spark', text: 'A true-red tie or royal-blue detail: The unmistakable electric charge.' },
    ],
    eveningIntro: 'For moments of drama and presence:',
    eveningFormula: [
      { label: 'Foundation', text: 'A pure white or jet-black dress in a clean, architectural cut: The striking base.' },
      { label: 'Connector', text: 'Bright silver or platinum jewelry: The cool, brilliant transition.' },
      { label: 'Spark', text: 'A true-red lip or a single bold gem: The pure point that makes you unforgettable.' },
    ],

    gettingItRightTitle: 'Getting It Right: The Electric Arc at Their Best',
    gettingItRight: [
      { heading: 'The Right Clarity', body: 'You understand that clarity is your power. A clean, high-contrast outfit does more for you than any muted blend ever could.', right: 'White shirt, black trousers, true-red accessory. Sharp, clear, and commanding.', wrong: 'Beige, taupe, and dusty rose. The clarity is gone, and so is the impact.' },
      { heading: 'The Right Contrast', body: 'You understand that contrast reads as authority. Stark pairings make your features pop dramatically.', right: 'Jet black against pure white, with one electric accent. Striking and intentional.', wrong: 'Tonal, low-contrast layering that blurs your edges into softness.' },
      { heading: 'The Right Accent', body: 'You understand that one pure note is enough. A single saturated point of color against the stark is more powerful than scattered brights.', right: 'A single true-red detail against an all-monochrome outfit. Focused and unmistakable.', wrong: 'Many competing colors that fracture your clean, clear signal.' },
    ],

    beautyPhilosophyTitle: 'Make-up Philosophy',
    beautyQuote: '\u201CMakeup as Statement.\u201D',
    beautyLook: 'The Look: Clean, bold, and high-impact. Like a struck match against snow.',
    beautyItems: [
      { label: 'The Canvas', text: 'Flawless, even finish with a luminous (not warm) glow. Your skin should look clear and cool-toned, like fine porcelain.' },
      { label: 'The Eyes', text: 'Crisp definition. Cool-toned smoke, jet liner, and a clean wing. Silvers, charcoals, and icy tones over warm browns.' },
      { label: 'The Brows', text: 'Defined and groomed \u2014 clean, deliberate lines that frame your high contrast.' },
      { label: 'The Lips', text: 'Your signature: true blue-red. Crisp edges, full saturation. Red lipstick was made for you.' },
      { label: 'The Cheeks', text: 'Cool sculpting and a cool-toned flush \u2014 raspberry or cool rose. Silvery highlight, never gold.' },
    ],
    beautyTipsHeading: 'Make-up Tips for Fire + Fire',

    hairIntro:
      'Your high-contrast, cool coloring calls for clear, defined hair shades. Choose pure, cool-toned colors with sharp dimension \u2014 jet black, true brunette, or icy cool tones \u2014 and avoid anything warm, golden, or muddy that softens your striking contrast.',
    nailIntro:
      'Perfect polish colors for your Fire + Fire coloring \u2014 clear, cool, saturated shades from true red to crisp neutrals that match your high-contrast palette.',
    decorIntro:
      'Your space blends Fire\u2019s drama with crystalline precision. Stark, high-contrast color and clean, gleaming materials create an atmosphere of commanding clarity.',

    habitatBullets: [
      'Striking, high-contrast, and impeccably ordered',
      'A clean, gallery-like space with bold focal points',
      'Gleaming materials \u2014 glass, polished metal, lacquer',
      'Drama and precision over clutter and cosiness',
      'A composed setting that holds and amplifies your clarity',
    ],
    habitatWhy:
      'Why It Works: The Electric Arc needs to be where things are clear and intentional \u2014 a place that mirrors your sharp mind. You need spaces that feel composed, dramatic, and luminous, the way your presence is.',

    hobbiesTitle: 'The Mastery Day',
    hobbiesBody:
      'A day of focused, high-clarity challenge. A morning of demanding mental work or training. An afternoon of mastery-driven craft \u2014 chess, music, photography. Evening of sharp culture or spirited debate with people who can keep up. You recharge by achieving and by cutting through hard problems.',
    hobbiesBullets: ['Chess & strategy', 'Classical music & performance', 'Fencing & precision sport', 'Photography & design', 'Debate & public speaking', 'High-stakes problem solving'],

    animalAffinity:
      'Falcon. The epitome of focused, high-velocity precision \u2014 keen-eyed, decisive, and unmatched in clarity of purpose. It sees its target from a great height and strikes without hesitation, all sharpness and intent.',

    mantras: [
      '\u201CTo see clearly is to serve.\u201D',
      '\u201CNot the muddle, but the cut that reveals.\u201D',
      '\u201CI am the light others steer by.\u201D',
      '\u201CTo name the truth is my purpose.\u201D',
    ],
    mantraMeditation: '\u201CWhat needs to be made clear today? Where can I cut through the fog? What truth am I here to illuminate?\u201D',
    shadowBalance:
      'Shadow Balance: The Electric Arc must remember that the brightest light can blind. You must learn the art of warmth \u2014 of softening your clarity with compassion, of staying close after you have cut through, so your light guides rather than scorches.',

    oneSentenceRows: [
      { context: 'To Yourself', sentence: '\u201CI AM the clearest flame.\u201D' },
      { context: 'At Work', sentence: '\u201CI will name what is true \u2014 you can build on it.\u201D' },
      { context: 'In Love', sentence: '\u201CI see you clearly, and I choose you.\u201D' },
      { context: 'In Crisis', sentence: '\u201CStay calm \u2014 I can see the way through.\u201D' },
      { context: 'At Rest', sentence: '\u201CI am learning to warm as well as illuminate.\u201D' },
    ],

    directionSacredGeo:
      'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self: a map not of land, but of soul. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
    directionLabel: 'Due South \u2014 the blazing noon',
    directionAngle: 0,
    directionBullets: [
      { label: 'Direction', text: 'Due South (the blazing noon). You face fully toward fire \u2014 the place of pure light, clarity, and illumination.' },
      { label: 'The Clear Light', text: 'The flame seen at its purest; fire as light itself. Your direction is toward what is true, what is revealed, what is made clear.' },
      { label: 'Orientation', text: 'You seek clarity \u2014 the truth beneath the noise, the standard worth holding, the light that lets others see.' },
      { label: 'Shadow Orientation', text: 'When lost, you let the light burn too hot \u2014 clarity hardens into harshness, and you scorch what you meant to illuminate.' },
    ],
    directionClosingQuote: '\u201CI face the clear light. I honor what is true.\u201D',

    idealWorkTitle: 'The Arena',
    idealWorkBody:
      'High-stakes, high-standards, and decisive. A culture that values clarity, excellence, and bold leadership. You need the room to set the bar, make the call, and be the definitive expert. You thrive in leadership, surgery, law, design direction, and any field that rewards sharp judgement and command.',
    idealWorkAvoid:
      'Vague, consensus-by-committee, low-standards environments where nothing is decided and clarity is treated as rudeness.',

    secretSauceBody:
      'Your clarity is not harshness; it is efficiency. You need to know that your rapid diagnosis and direct communication are time-saving and trust-building, not intimidating. People don\u2019t need you to soften your conclusions \u2014 they need you to invite them into your logic. \u201CHere is what I see \u2014 am I missing anything?\u201D turns your precision from a verdict into a collaboration.',
    secretSauceImpression:
      '\u201CWhen you speak, the fog lifts. The whole team thinks more clearly with you in the room.\u201D',

    leadershipTitle: 'The Commander',
    leadershipBody:
      'You lead through clarity, conviction, and decisive command. You are the leader who names the goal, sets the standard, and makes the hard call without flinching. You don\u2019t chase consensus \u2014 you bring the clear vision that lets everyone else move with confidence.',
    leadershipBlindspots:
      'Your decisiveness can harden into impatience, and your clarity into harshness. You may move faster than the team can follow or treat questions as obstacles. Practice warmth, invite challenge, and slow down to bring people with you \u2014 command includes the art of carrying people, not just leading them.',

    communicationCallout: 'The Direct Charge',
    communicationPreferredLabel: 'Direct (Precise)',

    coreBlocksTitle: 'The Fear of Being Blunted',
    coreBlocksBody:
      'Being dulled, muddled, or forced to soften your clarity into vagueness. A context where truth is unwelcome, standards are low, and your sharp edge is treated as a flaw rather than a gift.',

    healingCallout: 'Excess: Burnout from Over-Intensity  /  Deficiency: Cold Detachment',
    calmExcessHeading: 'To Calm Excess \u2014 Burnout from Over-Intensity',
    calmExcessIntro:
      'When your clear flame blazes too hot and burns toward exhaustion, the goal is to cool, soften, and restore:',
    calmExcessItems: [
      { label: 'Herbs', text: 'Adaptogens such as ashwagandha and reishi \u2014 to temper an over-revved system.' },
      { label: 'Nutrients', text: 'Magnesium and B-vitamins \u2014 to support a nervous system run at high voltage.' },
      { label: 'Practice', text: 'Deliberate rest, cool-down rituals, and single-tasking to keep the flame from consuming itself.' },
      { label: 'Warmth', text: 'Pairing every sharp truth with a moment of warmth \u2014 practiced like medicine.' },
      { label: 'Environment', text: 'Cooling, uncluttered, calm spaces that let the intensity settle.' },
    ],
    rebuildHeading: 'To Rebuild Deficiency \u2014 Cold Detachment',
    rebuildIntro:
      'When the flame has cooled into detachment and isolation, the goal is to gently rekindle warmth, connection, and feeling:',
    rebuildItems: [
      { label: 'Herbs', text: 'Warming, circulating botanicals such as ginger and rhodiola \u2014 to restore vitality.' },
      { label: 'Connection', text: 'Deliberate, warm time with trusted people \u2014 letting them past the composed surface.' },
      { label: 'Restorative Rest', text: 'Protected downtime and play \u2014 treating warmth and connection as essential fuel.' },
    ],
    spiritualRealignment: [
      { label: 'Primary (Resonance)', text: 'Candle gazing, sun salutations, and light-based meditation. Practices that honor your connection to clarity and flame.' },
      { label: 'Balancing (Counter-Energy)', text: 'Soft, receptive practices \u2014 gentle yin yoga, water immersion, loving-kindness meditation \u2014 that teach warmth and acceptance.' },
      { label: 'Ritual', text: 'Lighting a flame with intention; \u201Csoftening\u201D rituals where you deliberately offer warmth before truth.' },
    ],

    biorhythmRhythmHeading: 'The Brilliant Rhythm',
    chronotype: 'Sharp and high-voltage, with a strong, clear daytime peak. You ignite quickly and burn bright.',
    peakTime: 'Late Morning to Early Afternoon (10 AM\u20132 PM). Decisive, high-clarity, high-output work.',
    biorhythmScheduleIntro: 'Peak time: 10 AM\u20132 PM \u2014 sharp, decisive, high-clarity energy. Your most commanding window.',
    biorhythmSchedule: [
      '6\u20139 AM \u2014 Clean, deliberate start. Movement, light, and a clear plan for the day.',
      '9\u201310 AM \u2014 Sharpening. Reviewing, prioritizing, setting the standard.',
      '10 AM\u20122 PM \u2014 Peak clarity. Your most decisive, high-impact work and key decisions.',
      '2\u20135 PM \u2014 Sustained execution. Driving things to completion with precision.',
      'Evening \u2014 Deliberate cool-down. Culture, connection, and genuine rest to bank your fire.',
    ],

    ultimateGoal:
      'To become the Unwavering Beacon \u2014 a clarity so true and so warm that it not only reveals the way forward, but lights it for everyone willing to follow.',
    finalSummary: [
      'The Electric Arc is not merely sharp \u2014 it is illuminating. Your gift is not the heat of the flame, but the clarity of its light. You cut through illusion, name what is true, and hold the highest standard. Your purpose is to reveal what is real \u2014 and in doing so, to give the world the clarity it cannot find on its own.',
      'But the deepest truth of your nature is this: the brightest light is the one that warms. You are not just the flame that reveals \u2014 you are the warmth that invites people closer. And when you learn to soften without dimming, to stay close after you have cut through, you become the most powerful force in any room: the one who sees clearly, and who lets others feel safe in the light.',
    ],
  };

  await buildFireSubtypeProfilePDF(fireFireProfile, cfg);
}
