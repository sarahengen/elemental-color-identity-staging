import type { WaterProfileData } from '@/lib/waterSubtypeProfilePdfBuilder';

// Consolidated Water + Water (The Forest Lake / True Summer) profile content.
// Mirrors the Water + Air profile shape/layout for the downloadable PDF.
export const waterWaterProfile: WaterProfileData = {
  subtypeId: 'water-water',
  name: 'Water + Water',
  archetype: 'The Forest Lake',
  seasonalName: 'True Summer',
  tagline: 'Still water that runs infinitely deep — reflective, intuitive, and endlessly, wisely calm.',

  heroLabel: 'THE FOREST LAKE',
  footerLabel: 'THE INVISIBLE SELF  \u00B7  WATER + WATER PROFILE',
  fileName: 'water-water-forest-lake-profile.pdf',
  primary: [107, 139, 164],   // Dusty Blue
  secondary: [180, 167, 214], // Lavender
  tertiary: [143, 168, 204],  // Periwinkle
  deepAccent: [70, 104, 140], // Deep still-water

  identityRows: [
    { label: 'Elemental Signature', value: 'Water + Water (Water as Dominant and Influencer)' },
    { label: 'Seasonal Anchor', value: 'Deep Summer (True Summer)' },
    { label: 'Core Mantra', value: '\u201CI AM the depth that reflects all truth.\u201D' },
  ],

  essence:
    'Water in its purest, most undiluted form. There is no secondary element tempering or redirecting your inner nature \u2014 you are pure depth, pure reflection, pure intuition. This makes you the most deeply intuitive and emotionally complex of all sixteen subtypes. Below your tranquil surface lies a hidden, profound activity, a wisdom few can fully fathom. You look best in the serene reflective mid-tones of water \u2014 soft, muted, cool blues, greens, and mauves, subtle and dusty, as though still water were reflecting the colors of twilight.',
  essenceHighlightSentence:
    'You look best in the serene reflective mid-tones of water \u2014 soft, muted, cool blues, greens, and mauves, subtle and dusty, as though still water were reflecting the colors of twilight.',
  inNature:
    'An ancient, still forest lake reflecting the soft colors of twilight and the shadow of the trees. You are water in its most peaceful state \u2014 serene on the surface, holding the mysteries of the unknown and the wisdom of ages in your depths.',
  themes: ['Serenity', 'Reflection', 'Depth', 'Intuition', 'Harmony', 'Wisdom'],
  archetypes: ['The Healer', 'The Empath', 'The Peaceful Sage', 'The Gentle Guide'],
  feeling: '\u201CI am the still lake \u2014 calm on the surface, infinite underneath.\u201D',
  analogy:
    'Think of a forest lake at dusk. Nothing on it moves, yet everything is happening below. It doesn\u2019t chase; it reflects. It doesn\u2019t announce its depth; it simply is deep. People are drawn to sit beside it because in its stillness they finally hear themselves. This is your energy: quiet, reflective, and unfathomably deep.',

  celebIntro: 'Famous faces who embody the Forest Lake \u2014 soft, muted, cool-toned coloring that glows in dusty, powdery, low-contrast colors.',
  celebs: [
    { label: 'Emily Blunt', text: 'Soft, muted coloring with cool undertones \u2014 elegant in dusty rose and soft blue.' },
    { label: 'Kate Middleton', text: 'Classic True Summer with soft, refined coloring that glows in powder pink and lavender.' },
    { label: 'Jacqueline Kennedy', text: 'The archetype of quiet, timeless elegance \u2014 cool, composed, endlessly poised.' },
    { label: 'The Still Presence', text: 'Anyone whose calm makes a room quieter and whose few words carry unusual weight.' },
  ],

  energyParagraphs: [
    'You are water at its deepest and most self-contained. Where other Waters are lifted by air or warmed by fire, your Water is undiluted \u2014 a deep, still lake rather than a mist or a stream. You do not rush toward people; you let them come to you, and when they do, they find a depth they did not expect.',
    'Pure Water gives you an almost telepathic emotional attunement. You feel the currents beneath a conversation long before they surface. You are the most intuitive of all the subtypes, reading the unspoken with uncanny accuracy \u2014 not through analysis, but through pure, reflective feeling.',
    'You are not here to perform or persuade. You are here to hold depth, to reflect truth back to others, and to be the still center others orbit when the world spins too fast. People may not always notice you in the moment \u2014 you prefer to remain invisible \u2014 but they remember the profound sense of being truly seen in your presence.',
  ],
  vibration:
    'Deep, slow, resonant oscillations. The vibration is still and reflective, like the smooth surface of a lake at dawn, holding immense depth beneath a perfectly calm exterior.',
  blessing: 'You bless the world by reflecting deep truth.',

  seasonalMatch:
    'Water types belong to the Summer seasonal color palette, characterized by cool undertones, soft contrast, and gentle, muted, low-saturation colors. As True Summer, you sit at the heart of this palette \u2014 the coolest, softest, most reflective mid-tones.',
  keyCharacteristics: [
    'Soft, muted coloring throughout',
    'Cool undertones in skin, hair, and eyes',
    'Low to medium contrast',
    'Looks best in dusty, powdery colors',
    'Elegant, refined, and self-contained appearance',
  ],

  colorPaletteIntro:
    'Your signature Water + Water palette \u2014 soft, muted, cool mid-tones that reflect the serene surface of a forest lake at twilight. Tonal and layered rather than contrasting. Each swatch includes its exact hex code.',

  styleQuote: '\u201CI dress in layers of depth, not statements.\u201D',
  styleBody:
    'The Forest Lake approaches style as reflection, not declaration. Your clothing is not about contrast or drama \u2014 it is about tonal depth. Monochromatic and layered dressing was made for you: varying shades of the same cool color create the complexity and depth that mirror your nature. You dress to feel like still water, quietly composed and endlessly deep.',
  styleMantra: 'Your Style Mantra: \u201CIf it doesn\u2019t feel deep and calm, it\u2019s not for me.\u201D',
  approachTitle: 'How the Forest Lake Approaches Color',
  approachLeadHeading: 'The Reflective Palette',
  approachLead: 'Your colors are not bold \u2014 they are reflective. Not sharp \u2014 soft. Not contrasting \u2014 layered. You are drawn to cool mid-tones that seem to hold depth:',
  approachItems: [
    { label: 'Signature', text: 'Dusty Rose, Soft Blue, Lavender, Soft Teal: cool, muted mid-tones that reflect twilight on water.' },
    { label: 'Anchors', text: 'Soft Navy, Blue Gray, Rose Taupe: gentle cool foundations that hold your palette together.' },
    { label: 'Connectors', text: 'Mauve, Periwinkle, Soft Coral: quiet cool transitions that keep everything flowing.' },
    { label: 'Reflective', text: 'Pearl, Moonstone, Silver: the still-water shimmer \u2014 muted, cool, and quietly luminous.' },
  ],
  approachRules: [
    { title: 'The Temperature Rule', body: 'Your palette is cool and soft. Warm, golden, or earthy colors turn muddy on you and drain your reflective glow. When you need warmth, reach for a cool-leaning rose or soft mauve rather than anything golden.', rule: 'The Rule: \u201CIf it isn\u2019t cool and soft, it\u2019s not for me.\u201D' },
    { title: 'The Depth Rule', body: 'Your colors are muted and mid-toned \u2014 not too light, not too dark. High-saturation brights overpower your softness, and stark blacks and whites are too harsh. You need colors that hold depth without shouting.', rule: 'The Rule: \u201CI live in the reflective mid-tones \u2014 never too bright, never too stark.\u201D' },
    { title: 'The Layering Rule', body: 'Where other subtypes add contrast, you add layers. Tonal, monochromatic dressing \u2014 blue on softer blue, mauve on grey \u2014 creates the depth and complexity that feels like you.', rule: 'The Rule: \u201CI don\u2019t contrast \u2014 I deepen.\u201D' },
  ],
  assembleTitle: 'How the Forest Lake Assembles an Outfit',
  assemblePrincipleHeading: 'The Principle: Tonal Depth, One Still Surface',
  assemblePrincipleBody: 'You are not about statement pieces. You are about depth. Your outfit should feel like layers of still water \u2014 tonal, fluid, and quietly reflective, with nothing that breaks the calm surface.',
  assembleFormula: [
    'Anchor (60%): A soft, cool, fluid foundation in your Anchor colors.',
    'Connector (25%): A tonal layering piece that deepens rather than contrasts.',
    'Reflection (15%): One muted, pearly accent that catches the light like still water.',
  ],
  everydayFormula: [
    { label: 'Anchor', text: 'Soft blue-grey trousers + a dusty rose knit: a calm, cool foundation.' },
    { label: 'Connector', text: 'A lavender or soft-teal cardigan: a tonal transition that adds depth.' },
    { label: 'Reflection', text: 'A moonstone pendant or pearl earrings: the quiet luminosity people notice without knowing why.' },
  ],
  impactIntro: 'For moments when you need quiet authority:',
  impactFormula: [
    { label: 'Anchor', text: 'Soft navy tailoring: a composed, cool foundation of calm command.' },
    { label: 'Connector', text: 'Silver or pearl accessory: the gentle, refined bridge.' },
    { label: 'Reflection', text: 'A dusty-blue or soft-teal blouse: the reflective note that makes you unforgettable without effort.' },
  ],
  eveningIntro: 'For moments of intimacy and connection:',
  eveningFormula: [
    { label: 'Anchor', text: 'A fluid dress in soft blue-grey or dusty mauve: the still foundation.' },
    { label: 'Connector', text: 'Pearl or moonstone jewelry: the soft, luminous transition.' },
    { label: 'Reflection', text: 'A tonal wrap in a deeper shade of the same color: the layered depth that makes you glow.' },
  ],
  gettingItRightTitle: 'Getting It Right: The Forest Lake at Their Best',
  gettingItRight: [
    { heading: 'The Right Depth', body: 'You understand that tonal layering is your power. A monochromatic outfit built in varying cool mid-tones is far more beautiful on you than any bold, high-contrast look.', right: 'Dusty blue trousers, a softer blue-grey blouse, and a lavender wrap. The whole look has quiet depth.', wrong: 'Black blazer with a bright white shirt. The hard contrast overwhelms your softness and flattens your reflective depth.' },
    { heading: 'The Right Texture', body: 'You understand your colors need fluid, draping fabrics. Your outfit should move like water \u2014 fine knit, silk, soft jersey.', right: 'A flowing silk blouse in soft teal with a gentle drape. The fabric lets your fluidity show.', wrong: 'Stiff, structured, heavy fabrics that fight your fluid nature. You need drape, not architecture.' },
    { heading: 'The Right Accent', body: 'You understand accessories should reflect softly, not shout. One muted, luminous piece is better than anything bold.', right: 'A single moonstone pendant or delicate pearl earrings. Soft, reflective, quietly lovely.', wrong: 'A heavy, high-shine statement piece that breaks the still surface and competes with your calm depth.' },
  ],
  wearThis: [
    'Soft, muted, cool mid-tones \u2014 dusty rose, soft blue, lavender, soft teal',
    'Tonal, monochromatic layering that builds depth',
    'Soft navy, blue gray, and rose taupe as your cool neutrals',
    'Fluid, draping fabrics \u2014 fine knit, silk, soft jersey',
  ],
  avoidThis: [
    'Highly saturated brights that overpower your softness',
    'Stark black-and-white high contrast that reads as harsh',
    'Warm, golden, or earthy palettes that muddy your cool tones',
    'Stiff, structured fabrics that break your fluid drape',
  ],

  beautyQuote: '\u201CMakeup as Reflection.\u201D',
  beautyLook: 'The Look: Soft, tonal, and cool. Skin that looks calm and dewy, with makeup built in ever-deepening layers of the same cool tone rather than contrast.',
  beautyItems: [
    { label: 'The Canvas', text: 'A soft, natural finish \u2014 luminous but never heavy. Your skin should look like a calm surface reflecting light.' },
    { label: 'The Eyes', text: 'Cool plum, blue-grey, lavender, and silver layered tonally. Build depth with layers of the same cool family rather than sharp contrast.' },
    { label: 'The Brows', text: 'Soft and natural, brushed rather than drawn \u2014 unforced and quietly defined.' },
    { label: 'The Lips', text: 'A satin mauve or sheer berry \u2014 your signature cool, muted lip.' },
    { label: 'The Cheeks', text: 'A true cool pink or soft mauve, perfectly balanced. A pure silver or icy-pearl highlighter on the highest points, placed with precision.' },
  ],

  hairIntro: 'Your soft, cool, low-contrast coloring calls for gentle, muted, ashy hair shades. Choose cool mid-tones and avoid anything too dark, warm, or brassy that overpowers your reflective softness.',
  nailIntro: 'Perfect polish colors for your Water + Water coloring \u2014 soft, cool, muted mid-tones with a gentle depth that mirror your reflective palette.',
  decorIntro:
    'Your ideal space is soft, cool, and reflective \u2014 muted blues, dove grey, and mauve, with water elements, mirrors, and gentle uncluttered surfaces. Everything should feel like the calm surface of a still lake, lowering your shoulders the moment you walk in.',

  habitatIntro:
    'You thrive in quiet, still, atmospheric spaces \u2014 a deep, private retreat near water or in nature, with soft light and room to reflect. Loud, cluttered, high-stimulation environments quickly drain your deep, self-contained energy. You need a still center you can return to.',
  habitatBullets: [
    'Soft, diffused light \u2014 lamps and sheer curtains, no harsh overheads',
    'A view of, or proximity to, still water',
    'Calm, uncluttered surfaces and gentle, natural textures',
    'A deep, private corner to withdraw and reflect',
    'Natural sounds \u2014 rain, still water, soft ambient music',
  ],
  habitatWhy: 'Why It Works: The Forest Lake needs a still center \u2014 a private, quiet sanctuary deep enough to let your guard down and calm enough to hear the depths of your own feeling.',

  hobbiesTitle: 'The Deep Stillness',
  hobbiesBody:
    'A day of quiet depth, water, and reflection. A slow morning with tea and a journal. An afternoon by still water \u2014 swimming, floating, or simply watching the surface. Evening spent reading, meditating, or making quiet art. You recharge through stillness, solitude, and the depths of your own inner world.',
  hobbiesBullets: ['Journaling & reflective writing', 'Watercolor & other soft, tonal art', 'Swimming, floating & still-water immersion', 'Meditation & deep restorative practice', 'Reading, especially poetry & inner-world stories', 'Listening to ambient, contemplative music'],

  loveLanguage: {
    receivesLoveThrough:
      'Being given the key to your own depths. When someone shares a vulnerable secret or a profound dream with you. When they sit with you in emotional silence without trying to \u201Cfix\u201D it. When they honor your need for solitary recharging without taking it personally. Love, for you, is being someone\u2019s chosen confessional \u2014 trusted with what they show no one else.',
    nonVerbalCues: 'A softening and steadiness in your presence when you feel safe. Long, comfortable silences. Choosing to stay near someone quietly, needing no words to feel connected.',
  },
  relationships: {
    inLove:
      'In relationships you are the deep, still sanctuary \u2014 the one who holds space for the most vulnerable truths. You love through profound attunement, quiet presence, and unconditional emotional depth. You need a partner who respects your need for solitude, doesn\u2019t take your quiet personally, and understands that your stillness is not distance but depth.',
    strengthsInRelationship: ['Creates profound emotional safety and depth', 'Deeply intuitive \u2014 understands without being told', 'Loyal, forgiving, and endlessly patient'],
    growthInRelationship: ['Surface your own needs instead of only holding theirs', 'Let others into your depths rather than processing alone', 'Voice a difficulty before it sinks below the surface'],
    friendshipCompatibility:
      'You keep very few close bonds, but those you keep are oceanic in depth. You communicate through presence, shared silence, and near-telepathic attunement. Your best friendships are wordless and profound \u2014 you don\u2019t need to explain yourself to a true friend, because they already know.',
  },

  animalAffinity:
    'The Still Heron of the Forest Lake. The patient, watchful creature that stands motionless at the water\u2019s edge \u2014 utterly calm, deeply attuned, seeing everything beneath the surface. It moves only when it must, and belongs completely to the still, deep places.',

  cinematic:
    'You\u2019re drawn to slow, contemplative, emotionally profound films \u2014 quiet character studies, meditative stories, and works that find deep truth in stillness. You love subtlety, interiority, and the sacred depth beneath ordinary life over spectacle and noise.',
  artisticCorrespondence:
    'Your artistic signature is deep and reflective: think tonal watercolor washes, still-water reflections, and cool, layered palettes where depth emerges through subtlety rather than contrast. In music you resonate with ambient, meditative, contemplative sound. Across all art forms you are the still surface that reveals infinite depth to those who look closely.',

  lifePurpose: {
    gift: 'You perceive the depths others cannot reach. You hold space for the unspeakable. Your stillness dissolves pretense. You help people feel truly seen \u2014 all the way down.',
    spiritualPurpose:
      'You are here to be a mirror and a keeper of depth. Your soul came to hold the still center \u2014 the deep, safe place where the truest feelings can finally surface and be witnessed. To reflect people back to themselves so clearly that they remember who they are. Your purpose is to be the depth that makes real understanding possible. But you must also learn to be seen yourself \u2014 to surface your own depths, to let others witness you, and to speak the truths you hold beneath the surface.',
    soulsAssignment: '\u201CI am here to hold the depths of the world \u2014 and to let myself be seen within them.\u201D',
    inOneSentence: 'You came to remind the world that stillness holds the deepest truth \u2014 and to learn that being witnessed is also a form of love.',
  },

  mantras: [
    '\u201CTo reflect is to reveal.\u201D',
    '\u201CNot the crashing wave, but the still lake that shows the sky its own face.\u201D',
    '\u201CI am the depth where truth finally surfaces.\u201D',
    '\u201CTo feel deeply is not to drown \u2014 I can hold the depths and stay calm.\u201D',
  ],
  mantraMeditation: '\u201CWhat truth is waiting quietly in my depths? What am I holding for others? What do I need to let surface today?\u201D',
  shadowBalance: 'Shadow Balance: The Forest Lake must remember that a lake with no outlet grows stagnant. You must learn to let your depths surface \u2014 to be seen, to release what you hold, and to move rather than only reflect.',

  oneSentenceRows: [
    { context: 'To Yourself', sentence: '\u201CI AM the depth that reflects all truth.\u201D' },
    { context: 'At Work', sentence: '\u201CLet\u2019s pause and consider what we\u2019re not yet seeing.\u201D' },
    { context: 'In Love', sentence: '\u201CYou are safe in my depths \u2014 you can show me all of it.\u201D' },
    { context: 'In Crisis', sentence: '\u201CLet\u2019s be still and feel our way to the truth of this.\u201D' },
    { context: 'At Rest', sentence: '\u201CI am learning to let my own depths surface.\u201D' },
  ],

  directionSacredGeo:
    'Every element holds a place on the wheel of the world \u2014 a cardinal direction that anchors its meaning. This is the sacred geography of the self. North is Earth (stillness, foundation), East is Air (thought, the rising dawn), West is Water (depth, the descending tide), and South is Fire (passion, the blazing noon). To know your direction is to know where your spirit naturally faces.',
  directionLabel: 'Due West \u2014 the deepest tide',
  directionAngle: 0,
  waterCompassLabel: 'WATER',
  directionBullets: [
    { label: 'Direction', text: 'Due West (the deepest tide). You face fully west, into depth itself \u2014 the pure descent into the still, reflective interior.' },
    { label: 'The Depths', text: 'The still lake, the reflective surface, the descent into feeling. Your direction is toward the deep interior, the place where truth is held.' },
    { label: 'Orientation', text: 'You seek depth and reflection \u2014 the descent beneath the surface, the still center where all things are witnessed and understood.' },
    { label: 'Shadow Orientation', text: 'When lost, you sink so deep you forget to surface \u2014 you reflect everyone else so completely that you disappear from your own life.' },
  ],
  directionClosingQuote: '\u201CI face the deep. I honor the still center where truth is held.\u201D',

  career: {
    drawnTo: ['Therapist / Counselor', 'Psychologist', 'Artist / Poet', 'Researcher', 'Spiritual Guide', 'Writer', 'Healer', 'Archivist'],
    why: 'Careers of depth, reflection, and healing. You need work that honors interiority, allows for quiet, and lets you translate deep feeling into understanding. You thrive where your intuition and depth are treated as competencies, not liabilities.',
  },
  idealWorkTitle: 'The Deep Well',
  idealWorkBody:
    'Calm, autonomous, and depth-honoring. A culture that values reflection, intuition, and thoughtful pace over noise and constant motion. You need quiet, psychological safety, and permission to process deeply before acting. You thrive in counseling, research, the arts, and any space that treats depth as strength.',
  idealWorkAvoid: 'Loud, frantic, high-churn environments where depth is dismissed as slowness and stillness is treated as disengagement.',
  secretSauceBody:
    'Your depth is not slowness; it is discernment. You need to know that your need to process, reflect, and understand the subtext before acting is not a liability. You are the organization\u2019s wisdom keeper \u2014 you perceive the underlying currents (political, emotional, ethical) that others miss. Your role is to ask \u201CWhat are we not talking about?\u201D and to hold space for the answer.',
  secretSauceImpression: '\u201CShe sees what everyone else misses. When she finally speaks, the whole room leans in \u2014 because she\u2019s usually right.\u201D',
  leadershipTitle: 'The Intuitive Oracle',
  leadershipBody:
    'You lead through depth and perception. You sense the truth of a situation long before it is spoken, and you hold a calm, reflective space in which the best insight can emerge. You don\u2019t dominate; you deepen. People follow you because they trust your read on things and feel profoundly understood in your presence.',
  leadershipBlindspots: 'Your depth can become withdrawal. You may process alone until the team feels shut out, or hold insight so long it arrives too late. Pair your reflection with the courage to surface your read early and often.',

  communicationCallout: 'The Deep Listener',
  communication: {
    preferredMedium: 'Quiet + Written. You communicate best in unhurried, one-on-one conversation and in reflective writing, where you can reach the depth of a feeling before naming it. You need space and stillness to translate the deep current into language.',
    strengths: 'Profound listening, intuition, and the ability to name the deep truth no one else has reached. People feel truly heard \u2014 all the way down \u2014 in your presence.',
    howOthersReachYou: 'Slow down and go one-on-one. Give you time and quiet to reach your depths before responding. Ask what you actually feel, not just what you think. A reflective conversation reaches you far better than a fast, public exchange.',
  },

  lifeLesson:
    'Your lesson is to learn that depth must also surface. The still lake that reflects everything must also learn to have an outlet \u2014 to be seen, to speak its own truth, and to move rather than only reflect. Being witnessed, not just witnessing, is your growth edge.',
  coreBlocks: [
    'Sinking so deep into reflection that you disappear from your own life',
    'Holding everyone\u2019s truths while never surfacing your own',
    'Withdrawing into your depths instead of letting others in',
    'Mistaking stillness for safety until the water grows stagnant',
  ],
  imbalance:
    'When out of balance, your still depth becomes stagnation \u2014 heavy, isolated, and unable to move. You may feel over-saturated: weighed down by feelings that are not even yours, sunk too deep to surface. Or your depth drains entirely \u2014 leaving you numb, disconnected, and hollow.',

  healing: [
    'Practice surfacing: name one of your own truths aloud each day',
    'Create movement \u2014 don\u2019t let the still water grow stagnant',
    'Let a trusted person witness your depths, not just witness theirs',
    'Return to your still center daily, then choose to move from it',
  ],
  healingCallout: 'Excess: Stagnant Depth (Over-Saturated)  /  Deficiency: Drained Depletion (The Lake Run Dry)',
  calmExcessHeading: 'To Clear Excess \u2014 Stagnation & Over-Saturation',
  calmExcessIntro: 'When your still depth thickens into stagnation, heaviness, and absorbed emotion, the goal is to move, drain, and circulate the system:',
  calmExcessItems: [
    { label: 'Herbs', text: 'Nettle & Cleavers \u2014 to support lymphatic drainage and clear stagnant fluid.' },
    { label: 'Nutrients', text: 'Magnesium & gentle diuretic foods (cucumber, celery) to release retained water and heaviness.' },
    { label: 'Diet', text: 'Warm, light, anti-inflammatory foods; reduce heavy comfort foods that deepen stagnation.' },
    { label: 'Movement', text: 'Swimming, walking, and gentle flowing movement to keep the depths circulating.' },
    { label: 'Boundaries', text: 'Energetic boundaries \u2014 release the feelings you\u2019ve absorbed that are not your own.' },
  ],
  rebuildHeading: 'To Rehydrate Deficiency \u2014 Depletion & Dryness',
  rebuildIntro: 'When your lake runs dry into numbness, hollowness, and disconnection, the goal is to nourish, hydrate, and restore depth:',
  rebuildItems: [
    { label: 'Herbs', text: 'Marshmallow Root & Slippery Elm \u2014 to soothe and rehydrate.' },
    { label: 'Nourishment', text: 'Warm broths, healthy fats, and mineral-rich waters to restore depth and lubrication.' },
    { label: 'Reconnection', text: 'Gentle water immersion and slow, feeling-based practices to re-enter your own depths.' },
  ],
  spiritualRealignment: [
    { label: 'Primary (Resonance)', text: 'Deep contemplative meditation and stillness. Practices that honor silence, intuition, and the inner world.' },
    { label: 'Balancing (Counter-Energy)', text: 'Grounding and expression. Naming your truth aloud, gentle movement, and letting yourself be witnessed to give the depths an outlet.' },
    { label: 'Ritual', text: 'Water rituals \u2014 blessing still water, journaling by a lake, or a slow evening bath as a passage from the day\u2019s absorption to your own peace.' },
  ],

  biorhythmRhythmHeading: 'The Lunar & Tidal Rhythm',
  chronotype: 'Nocturnal and tidal \u2014 energy runs deepest late at night and in the still early hours. Needs slow, unhurried transitions.',
  peakTime: 'Late Night & Early Morning (10 PM\u20132 AM & 4\u20136 AM). Your depth surfaces when the world grows quiet.',
  biorhythmScheduleIntro: 'Peak time: 10 PM\u20132 AM & 4\u20136 AM \u2014 deep, reflective, intuitive energy that rises when the world is still.',
  biorhythmSchedule: [
    'Morning \u2014 Slow, quiet start. Do not rush the depths awake; ease in with tea and stillness.',
    '10 AM\u201312 PM \u2014 Gentle surface energy for calm, reflective work.',
    '1\u20134 PM \u2014 Low, still tide. Honor it: restful, low-stimulation tasks or a quiet pause.',
    '10 PM\u20132 AM \u2014 Deep creative and reflective peak. Writing, art, meditation, profound thought.',
    '4\u20136 AM \u2014 A second still, intuitive window \u2014 the quietest, clearest depths of all.',
  ],
  newYearResolution: 'This year, let your depths surface. Speak one of your own truths each day, and build an outlet so the still water keeps moving.',

  ultimateGoal:
    'To become the Serene Sage \u2014 whose still depth reflects truth, heals division, and holds the safe, quiet center in which others can finally understand themselves, while learning to surface, be witnessed, and keep the deep water moving.',
  finalSummary: [
    'The Forest Lake is not merely calm \u2014 it is a profound force of reflection and healing. Your gift is not the crashing wave, but the still surface that shows people their own truth. You hold depth, witness the unspeakable, and reflect others back to themselves so clearly they remember who they are. Your purpose is to hold the depths of the world \u2014 and in doing so, to make real understanding possible.',
    'But the deepest truth of your nature is this: the lake must have an outlet. To reflect others without disappearing; to feel deeply without drowning; to hold the depths while still surfacing your own. When you learn to be witnessed as well as to witness, you become the most quietly powerful presence in any room: the one who sees all the way down, and who at last lets herself be seen.',
  ],
  closing:
    'This is just one of sixteen elemental subtypes. Your Water + Water nature is a sacred force \u2014 not a stillness to be stirred, but a depth to be honored. Wear your colors like reflections on still water, hold depth wherever you go, and remember: the stillest presence in the room is often the one that sees the most.',
};
