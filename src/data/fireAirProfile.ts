// Consolidated Fire + Air (The Illuminating Spark / Bright Winter) profile content.
// This pulls together the key narrative content from across the subtype page and
// the various energy & style guides into a single source for the downloadable PDF.

export interface ProfileSection {
  heading: string;
  body: string;
}

export interface ProfileList {
  heading: string;
  items: string[];
}

export const fireAirProfile = {
  subtypeId: 'fire-air',
  name: 'Fire + Air',
  archetype: 'The Illuminating Spark',
  seasonalName: 'Bright Winter',
  combination: 'Fire (primary) lifted by Air',
  tagline: 'A brilliant, shocking spark that ignites and brings a rush of electric creativity and emotion.',

  // ── Essence / Overview ──
  essence:
    'Fire at its most fragile and most powerful. You have the clarity of Fire with the brightness and vibrancy of Air. Your energy is impulsive, galvanizing, and full of potent new beginnings. You are a brilliant, shocking spark that ignites and brings a rush of electric creativity and emotion. You look best in clear, vivid, highly saturated colors with cool undertones that reflect your optimistic and generative state, like bold luminous neon light.',

  inNature:
    'The explosive moment Winter\u2019s lightning meets Spring\u2019s thaw. Like a spectacular fireworks display against the night sky, the electric crackle of a thunderstorm, the brilliant aurora borealis dancing with cosmic energy \u2014 you are fire lifted by air, creating dazzling displays of light and color.',

  themes: ['Brilliance', 'Electricity', 'Vibrancy', 'Innovation', 'Excitement', 'Dynamism'],
  archetypes: ['The Innovator', 'The Electric Performer', 'The Bright Star', 'The Trailblazer'],

  characteristics: [
    'Clear, bright eyes',
    'High contrast coloring',
    'Can wear very bright, saturated colors',
    'Looks washed out in muted tones',
    'Bridges Fire and Air energy',
  ],

  // ── Energy & Vibration ──
  energy:
    'Brilliant intensity with electric clarity. Fire as the primary element brings bold vision, while Air\u2019s influence adds intellectual sparkle and communication prowess. This type is like lightning \u2014 dramatic, illuminating, and impossible to ignore.',
  vibration:
    'High, crackling frequency with dynamic peaks. The vibration is exciting and stimulating, creating an atmosphere of possibility and innovation.',
  blessing: 'You bless the world by igniting creative joy.',

  // ── Life Purpose ──
  lifePurpose: {
    gift:
      'You see potential everywhere. You ignite possibility in others. Your enthusiasm is contagious. You help people believe they can begin.',
    spiritualPurpose:
      'You are here to be an igniter. Your soul came to start things. To plant seeds. To say \u201Cyes\u201D when everyone else says \u201Cwait.\u201D To remind the world that every oak was once an acorn, every cathedral a single stone, every revolution a whispered thought. Your purpose is to call forth what is waiting to be born. But you must also learn to tend \u2014 to stay through the hard middle, to watch your sparks become flames become embers become soil for the next beginning.',
    soulsAssignment:
      '\u201CI am here to call forth what is waiting \u2014 and to stay long enough to see it grow.\u201D',
    inOneSentence:
      'You came to remind the world that everything begins somewhere \u2014 and to learn that beginnings are only sacred when they lead somewhere.',
  },

  // ── Love Language ──
  loveLanguage: {
    receivesLoveThrough:
      'Enthusiastic co-creation and celebration. When someone says \u201CYES! Let\u2019s do it!\u201D to your wild idea. When they remember your favorite song and play it to surprise you. When they amplify your joy by laughing at your jokes and sharing in your excitement. Love is a collaborative project or a spontaneous adventure.',
    nonVerbalCues:
      'Bright eye contact and an animated face when you\u2019re talking. A spontaneous gift of something colorful or fun. Dancing with you.',
  },

  // ── Communication ──
  communication: {
    archetype: 'The Energizing Storyteller',
    preferredMedium:
      'Visual + Verbal. You communicate best through a combination of visual aids and enthusiastic verbal delivery \u2014 whiteboards, sketches, diagrams, and animated presentations are your native language. You think in images and metaphors and need to externalize ideas visually to fully develop them.',
    strengths:
      'Energy, storytelling, and the ability to make any topic feel exciting and relevant. You use metaphors, analogies, and real-world examples that make abstract concepts tangible. You are the presenter people remember.',
    howOthersReachYou:
      'Match your energy. Be enthusiastic, visual, and open to tangents. Use metaphors and stories rather than pure data. Frame critical information as a creative challenge. If they need your focused attention, a whiteboard session beats a formal meeting.',
  },

  // ── Career ──
  career: {
    drawnTo: [
      'Entrepreneur',
      'Motivational Speaker',
      'Creative Director',
      'Event Planner',
      'Broadway Performer',
      'Sports Coach',
      'Inventor',
      'Marketing Genius',
    ],
    why:
      'Careers that are dynamic, people-centric, and allow for enthusiastic expression and inspiration. You need a stage \u2014 literal or metaphorical \u2014 to spark ideas and energy in others.',
  },

  // ── Style & Wardrobe ──
  style: {
    philosophy:
      'The light and sparkling elements of Fire influenced by Air require a true Red or Magenta Pink \u2014 darker tones will swallow you up. Consider your colors as your neutrals, or the light of a spark: White, Silver, and Mid Gray. As Fire, you are the fuel; your wardrobe should mirror your dynamic spirit with the clear, dramatic, high-saturation contrast of your palette.',
    wearThis: [
      'Clear, vivid, highly saturated colors with cool undertones',
      'Neon and electric brights \u2014 think bold luminous light',
      'Bright white, silver, and mid gray as your fresh neutrals',
      'High-contrast, statement combinations',
    ],
    avoidThis: [
      'Muted, dusty, or greyed-down tones that dull your spark',
      'Heavy, dark, earthy colors that swallow you up',
      'Warm, golden palettes that fight your cool brightness',
      'Soft, low-contrast pairings that wash you out',
    ],
  },

  // ── GROWTH PILLAR (Lesson, Blocks, Imbalance, Healing, Biorhythms, Resolutions) ──
  growth: {
    lifeLesson:
      'Your lesson is to learn that beginnings are only sacred when you stay long enough to see them through. The spark that ignites must also learn to tend the flame. Follow-through, not novelty, is your growth edge.',
    coreBlocks: [
      'Starting brilliantly but abandoning projects before they bear fruit',
      'Scattering your electric energy across too many ideas at once',
      'Burning out from running at peak intensity with no rest',
      'Using excitement to avoid the slower, quieter work of completion',
    ],
    imbalance:
      'When out of balance, your spark becomes a wildfire \u2014 frantic, unfocused, and exhausting. Restlessness, impulsivity, and a craving for constant stimulation signal that Fire and Air have overheated. You may leave a trail of half-finished sparks and feel perpetually drained.',
    healing: [
      'Ground your fire: schedule deliberate stillness and single-task focus blocks',
      'Choose one spark to fully tend before lighting the next',
      'Move your body to discharge excess electric energy \u2014 dance, sprint, create',
      'Practice the discipline of the hard middle \u2014 stay through the unglamorous part',
    ],
    biorhythm:
      'Your energy peaks in bright bursts \u2014 mornings and the launch of new things. Honor your natural rhythm of intense activity followed by genuine rest. Forcing constant output dims your light; rhythmic recharging keeps it brilliant.',
    newYearResolution:
      'This year, finish what you start. Pick the spark that matters most and tend it all the way into flame.',
  },

  // ── LIVING PILLAR (Decor, Habitat, Hobbies, Nutrition) ──
  living: {
    decor:
      'Your ideal space is bright, open, and electric \u2014 white walls as a clean canvas, with bold pops of neon pink, electric blue, and violet. Mirrors, glass, and metallics (silver, chrome) amplify light and movement. Keep it uncluttered so your ideas have room to spark.',
    habitat:
      'You thrive in stimulating, social, urban-adjacent environments \u2014 places with energy, light, and the buzz of possibility. Loft-style openness, big windows, and proximity to culture and creativity feed your spirit. Stagnant, dark, or heavy spaces dim your brightness.',
    hobbies: [
      'Performance & improv \u2014 a stage for your electric expression',
      'Brainstorming, inventing, and starting creative projects',
      'High-energy dance, aerobics, or social sports',
      'Travel and novelty-seeking adventures',
      'Visual arts \u2014 bright, bold, experimental work',
    ],
    nutrition:
      'Fresh, vibrant, light foods match your bright energy \u2014 crisp vegetables, citrus, berries, and clean proteins. Avoid heavy, greasy, or sluggish meals that weigh down your spark. Stay hydrated to keep your electric vibration clear, and eat regular small meals to avoid energy crashes.',
  },

  // ── RELATIONSHIPS PILLAR (Love Languages, Relationships, Friendship Compatibility) ──
  relationships: {
    inLove:
      'In relationships you are the spark of excitement and possibility. You love through enthusiastic co-creation, spontaneous adventure, and amplifying your partner\u2019s joy. You need a partner who matches your energy, says \u201Cyes\u201D to your wild ideas, and gives you freedom to shine while gently anchoring you when you scatter.',
    strengthsInRelationship: [
      'Brings excitement, novelty, and contagious enthusiasm',
      'Celebrates and amplifies the people you love',
      'Generous, generative, and quick to forgive',
    ],
    growthInRelationship: [
      'Practice steady presence, not just peak-moment intensity',
      'Follow through on plans and promises, not only ideas',
      'Slow down to truly hear, not just energize',
    ],
    friendshipCompatibility:
      'You spark instantly with fellow Air-influenced and Fire types who match your pace and play. Earth-influenced friends ground and complete you, offering the follow-through you crave. Water-influenced friends teach you depth and stillness. Your best friendships balance your electricity with steadiness.',
  },

  // ── ARTS PILLAR (Cinematic Preferences, Artistic Correspondence) ──
  arts: {
    cinematic:
      'You\u2019re drawn to vivid, high-energy, visually dazzling films \u2014 vibrant musicals, witty fast-paced comedies, bold sci-fi, and stories of inventors and trailblazers who dare to begin. You love spectacle, color, and a contagious sense of wonder and possibility.',
    artisticCorrespondence:
      'Your artistic signature is electric and luminous: think neon abstraction, kinetic art, fireworks, aurora-inspired palettes, and bold pop art. In music you resonate with bright, energizing, danceable sound. Across all art forms you are the burst of color that makes others feel awake and alive.',
  },

  // ── Closing ──
  closing:
    'This is just one of sixteen elemental subtypes. Your Fire + Air nature is a sacred force \u2014 not a problem to be managed, but a spark to be tended. Wear your colors like luminous light, ignite possibility in others, and remember: every great beginning needs someone bright enough to start it.',
};

export type FireAirProfile = typeof fireAirProfile;

