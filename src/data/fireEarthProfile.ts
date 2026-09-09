// Consolidated Fire + Earth (The Forged Iron / Deep Winter) profile content.
// This mirrors the Fire + Air profile, pulling the key narrative content from
// across the subtype page and the various energy & style guides into a single
// source for the downloadable PDF.

export interface ProfileSection {
  heading: string;
  body: string;
}

export interface ProfileList {
  heading: string;
  items: string[];
}

export const fireEarthProfile = {
  subtypeId: 'fire-earth',
  name: 'Fire + Earth',
  archetype: 'The Forged Iron',
  seasonalName: 'Deep Winter',
  combination: 'Fire (primary) grounded by Earth',
  tagline: 'A smoldering, immovable strength \u2014 fire tempered by earth into enduring, forged power.',

  // \u2500\u2500 Essence / Overview \u2500\u2500
  essence:
    'Your energy is potent, immense, and smoldering, yet tempered by Earth\u2019s grounding force. You have a magnetic intensity, and an air of mystery. You have the strength of Fire with the quiet resolve of Earth, and carry weight and influence. You are focus-driven, productive, strategic and on-purpose. You will endure. You have a strong, sultry look, and look best in deep, rich colors that honor the intensity of the Fire and Earth elements.',

  inNature:
    'Forged iron and ember glow. You are molten lava flowing through ancient rock, the smoldering embers of a deep forest fire, volcanic obsidian formed under immense pressure. You are fire that has been tempered by earth, gaining depth and endurance \u2014 strength that does not flicker, but holds.',

  themes: ['Depth', 'Endurance', 'Mystery', 'Intensity', 'Groundedness', 'Power'],
  archetypes: ['The Alchemist', 'The Blacksmith', 'The Powerful Protector', 'The Wise Warrior'],

  characteristics: [
    'Very dark hair and eyes',
    'Medium to deep skin tone',
    'Mix of warm and cool undertones',
    'Looks best in deep, rich colors',
    'Can wear some warm burgundies and olives',
  ],

  // \u2500\u2500 Energy & Vibration \u2500\u2500
  energy:
    'Grounded intensity with enduring power. Fire as the primary element brings transformation and leadership, while Earth\u2019s influence provides stability and persistence. This type is like volcanic rock \u2014 formed by fire but solid and enduring. You burn slow and deep, not bright and fast.',
  vibration:
    'Strong, steady pulses with underlying heat. The vibration is powerful and consistent, building momentum over time rather than burning out quickly. Others feel safe in your presence \u2014 grounded by your reliable, smoldering strength.',
  blessing: 'You bless the world by providing unbreakable support.',

  // \u2500\u2500 Life Purpose \u2500\u2500
  lifePurpose: {
    gift:
      'You forge and you fortify. You take raw heat and turn it into structure that lasts. You are the one others lean on when the ground shakes \u2014 the steady cornerstone, the protector, the keeper of what matters.',
    spiritualPurpose:
      'You are here to be a forger. Your soul came to temper passion into purpose, to transform fire into form. To stay when others flee. To build what endures long after the spark that started it has gone. Your purpose is to hold the line \u2014 to be the foundation upon which others build their dreams. But you must also learn to let the fire breathe \u2014 to soften your grip, to allow change, to remember that even iron must be reheated to be reshaped.',
    soulsAssignment:
      '\u201CI am here to forge what endures \u2014 and to remember that strength includes the wisdom to bend.\u201D',
    inOneSentence:
      'You came to remind the world that some things are meant to last \u2014 and to learn that endurance without flexibility becomes rigidity.',
  },

  // \u2500\u2500 Love Language \u2500\u2500
  loveLanguage: {
    receivesLoveThrough:
      'Being relied upon and having that reliance honored. When someone asks for your help with something substantial and then follows through on your advice. When they celebrate your endurance \u2014 \u201CI don\u2019t know how you held it together.\u201D When they feed you a hearty meal after your labor. Love is being the cornerstone of a stable structure.',
    nonVerbalCues:
      'Steady, unwavering eye contact. Acts of practical service rendered without fuss. A protective hand at your back. Showing up \u2014 consistently, dependably, without needing to be asked twice.',
  },

  // \u2500\u2500 Communication \u2500\u2500
  communication: {
    archetype: 'The Reliable Signal',
    preferredMedium:
      'Direct + Substantive. You communicate best through clear, grounded, well-considered statements. You don\u2019t waste words or scatter energy across tangents \u2014 you say what you mean, mean what you say, and prefer conversations that lead somewhere durable. Written follow-up and concrete plans are your native language.',
    strengths:
      'Steadiness, depth, and unshakeable consistency. People trust what you tell them because you don\u2019t exaggerate and you don\u2019t flinch. You hold a position with quiet authority and provide the calm signal in a noisy room.',
    howOthersReachYou:
      'Be direct, honest, and concrete. Bring substance, not hype. Respect your need to consider before responding \u2014 don\u2019t rush you. Frame requests in terms of what is durable and worth doing. If they want your buy-in, show them the long game, not the quick win.',
  },

  // \u2500\u2500 Career \u2500\u2500
  career: {
    drawnTo: [
      'Master Craftsperson',
      'Architect',
      'Surgeon',
      'Strategist',
      'Operations Leader',
      'Engineer',
      'Builder / Developer',
      'Trusted Advisor',
    ],
    why:
      'Careers that reward depth, mastery, endurance, and tangible results. You need work where your focus and reliability build something lasting \u2014 where you can become the indispensable expert and the steady hand others depend on.',
  },

  // \u2500\u2500 Style & Wardrobe \u2500\u2500
  style: {
    philosophy:
      'Ground your Fire energy by opting for deeper, darker, and rich burnished tones. Damson or Burgundy Red reflect your Fiery and Earthy nature, while retaining that solid iron strength. Choose Charcoal or Mole as your neutral. As Fire grounded by Earth, you are the fuel and the forge; your wardrobe should mirror your smoldering, enduring spirit with deep, saturated, high-quality richness.',
    wearThis: [
      'Deep, rich, saturated colors that honor your intensity',
      'Burgundy, dark emerald, indigo, and pine green',
      'Espresso, charcoal, and dark navy as your grounding neutrals',
      'A single smoldering accent \u2014 carmine or molten orange \u2014 against a deep base',
    ],
    avoidThis: [
      'Pale, washed-out pastels that dilute your depth',
      'Bright, light, neon brights that fight your smolder',
      'Cold, stark high-shine tones with no warmth or weight',
      'Flimsy, insubstantial fabrics that undercut your solidity',
    ],
  },

  // \u2500\u2500 GROWTH PILLAR \u2500\u2500
  growth: {
    lifeLesson:
      'Your lesson is to learn that strength includes the wisdom to bend. The iron that cannot be reheated cannot be reshaped. Flexibility, not just endurance, is your growth edge \u2014 knowing when to hold firm and when to let the fire breathe.',
    coreBlocks: [
      'Becoming rigid and immovable when adaptation is needed',
      'Carrying too much, for too long, without asking for help',
      'Mistaking stubbornness for strength',
      'Resisting change even when the old structure no longer serves',
    ],
    imbalance:
      'When out of balance, your steady fire becomes hardened and brittle \u2014 chronic tension, stubbornness, and an unwillingness to bend. You may grind yourself down carrying weight that was never yours alone, until the structure collapses from within.',
    healing: [
      'Release control: deliberately delegate and let others carry weight',
      'Move stagnant energy \u2014 strength training, hiking, working with your hands',
      'Schedule rest as maintenance, not reward \u2014 even iron needs cooling',
      'Practice flexibility \u2014 say yes to one change you would normally resist',
    ],
    biorhythm:
      'Your energy is steady and enduring, building through the day with a strong midday peak. You sustain effort where others flag. Honor your need for genuine recovery \u2014 your slow, deep burn keeps its heat only when you allow it to cool and rebuild.',
    newYearResolution:
      'This year, loosen your grip. Hold what truly matters and let the rest move \u2014 strength is knowing the difference.',
  },

  // \u2500\u2500 LIVING PILLAR \u2500\u2500
  living: {
    decor:
      'Your ideal space is warm, grounded, and substantial \u2014 deep earthy walls, rich woods, forged metals, leather, and stone. Layered textures and heirloom-quality pieces that feel built to last. A hearth, a workshop corner, a place of focused craft. Warmth and weight over trend and flash.',
    habitat:
      'You thrive in stable, rooted, characterful environments \u2014 places with history, craftsmanship, and a sense of permanence. A home that doubles as a workshop or sanctuary. Natural materials, fireplaces, and spaces built for deep, uninterrupted focus feed your spirit.',
    hobbies: [
      'Craftsmanship \u2014 woodworking, metalwork, building with your hands',
      'Cooking hearty, slow-made meals',
      'Strength training, hiking, and grounding physical work',
      'Restoring, repairing, and improving the things you own',
      'Strategy games and deep, mastery-driven pursuits',
    ],
    nutrition:
      'Hearty, grounding, nourishing foods match your enduring energy \u2014 rich proteins, root vegetables, slow-cooked meals, and warming spices. Avoid skipping meals or running on empty; your steady burn needs reliable, substantial fuel. Honor regular mealtimes as the rhythm that sustains your strength.',
  },

  // \u2500\u2500 RELATIONSHIPS PILLAR \u2500\u2500
  relationships: {
    inLove:
      'In relationships you are the rock \u2014 steadfast, protective, and deeply loyal. You love through reliability, provision, and unwavering presence. You need a partner who honors your dependability, doesn\u2019t take your strength for granted, and gently invites you to soften and share the weight you instinctively carry alone.',
    strengthsInRelationship: [
      'Brings stability, loyalty, and a sense of safety',
      'Shows up consistently and follows through',
      'Protective, grounded, and deeply dependable',
    ],
    growthInRelationship: [
      'Share vulnerability, not just strength',
      'Allow your partner to support you, too',
      'Stay open to change instead of digging in',
    ],
    friendshipCompatibility:
      'You build slow, lifelong friendships rooted in trust and proven reliability. Fellow Fire and Earth-influenced friends share your depth and steadiness. Air-influenced friends bring lightness and movement that loosen your grip. Water-influenced friends teach you to flow and feel. Your best friendships balance your solidity with room to breathe.',
  },

  // \u2500\u2500 ARTS PILLAR \u2500\u2500
  arts: {
    cinematic:
      'You\u2019re drawn to deep, weighty, character-driven films \u2014 epic sagas, stories of endurance and craft, slow-burning dramas, and tales of protectors and quiet warriors who hold the line. You love substance, atmosphere, and a sense of earned, hard-won meaning.',
    artisticCorrespondence:
      'Your artistic signature is deep, textured, and elemental: think forged metal sculpture, chiaroscuro oil painting, rich earthen tones, and the smolder of molten glass. In music you resonate with grounded, powerful, resonant sound. Across all art forms you are the depth and weight that gives the work its gravity.',
  },

  // \u2500\u2500 Closing \u2500\u2500
  closing:
    'This is just one of sixteen elemental subtypes. Your Fire + Earth nature is a sacred force \u2014 not a burden to be carried, but a strength to be tempered. Wear your colors like forged iron, hold steady for those who need you, and remember: the strongest structures are the ones wise enough to bend before they break.',
};

export type FireEarthProfile = typeof fireEarthProfile;
