// Friendship Compatibility Data for all 16 Elemental Subtypes

export interface FriendshipAlly {
  subtypeId: string;
  name: string;
  reason: string;
}

export interface FriendshipProfile {
  subtypeId: string;
  subtypeName: string;
  elementId: string;
  archetypeName: string;
  friendshipStyle: string;
  naturalChemistry: FriendshipAlly[];
  growthFriendships: FriendshipAlly[];
  frictionPoints: FriendshipAlly[];
}

export interface PairwiseCompatibility {
  overallScore: number; // 1-10
  chemistryType: string;
  description: string;
  strengths: string[];
  challenges: string[];
  bridgeAdvice: string[];
  friendshipArchetype: string;
}

export const friendshipProfiles: FriendshipProfile[] = [
  // FIRE SUBTYPES
  {
    subtypeId: 'fire-fire',
    subtypeName: 'Fire + Fire',
    elementId: 'fire',
    archetypeName: 'The Electric Arc',
    friendshipStyle: 'Friendships are arenas of mutual sharpening. You seek companions who can match your intensity without flinching, who will tell you the truth even when it burns, and who understand that loyalty is proven in crisis, not comfort. You don\'t collect friends—you forge alliances.',
    naturalChemistry: [
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'They match your energy without competing for dominance. Their brightness amplifies your intensity into something spectacular rather than overwhelming.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'They share your drive but ground it in purpose. Together you build empires rather than just setting fires.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their immovable strength gives you something to push against productively. They respect your power without being consumed by it.' }
    ],
    growthFriendships: [
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their stillness teaches you that power doesn\'t always require motion. They show you the strength in silence and the wisdom in waiting.' },
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Their ethereal sensitivity reveals the subtleties your intensity can miss. They teach you that the most profound truths arrive as whispers, not declarations.' },
      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their gentle persistence shows you that softness is not weakness. They model a kind of endurance that doesn\'t require combustion.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Two control systems in one room. Your raw intensity meets their surgical precision, and neither wants to yield the thermostat.' },
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Your directness can shatter their carefully maintained emotional atmosphere. They experience your honesty as aggression; you experience their indirectness as evasion.' },
      { subtypeId: 'water-earth', name: 'Water-Earth (The Languid River)', reason: 'They process through narrative; you process through action. By the time they\'ve told the story, you\'ve already moved three cities ahead.' }

    ]
  },
  {
    subtypeId: 'fire-water',
    subtypeName: 'Fire + Water',
    elementId: 'fire',
    archetypeName: 'The Blue Flame',
    friendshipStyle: 'Friendships are curated with surgical precision. You maintain a small circle of deeply trusted individuals who have proven their reliability over time. You offer unwavering loyalty in return for respect of your boundaries. Your friendships are private covenants—deep, quiet, and fiercely protected.',
    naturalChemistry: [
      { subtypeId: 'water-fire', name: 'Water-Fire (The Sun-Dappled Pond)', reason: 'They share your depth but express it with warmth. Together you create a friendship of profound understanding without the need for constant explanation.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual clarity matches your emotional precision. Conversations are efficient, meaningful, and mutually enriching.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their quiet authority mirrors your own. Two people who understand that real power doesn\'t need to announce itself.' }
    ],
    growthFriendships: [
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their spontaneity disrupts your controlled environment in necessary ways. They remind you that not everything needs to be planned to be meaningful.' },
      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'Their generous warmth challenges your tendency toward emotional minimalism. They show you that abundance in friendship doesn\'t mean loss of control.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their vulnerability teaches you that opening up doesn\'t mean losing power. Their gentle fire shows you warmth without combustion.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their raw intensity feels chaotic to your refined sensibility. You see them as undisciplined; they see you as cold.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their need for routine and tradition can feel suffocating to your need for pristine autonomy. Their warmth demands reciprocity you find difficult to perform.' },
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Their emotional diffusion frustrates your need for clarity. You want defined boundaries; they live in the spaces between.' }
    ]
  },
  {
    subtypeId: 'fire-earth',
    subtypeName: 'Fire + Earth',
    elementId: 'fire',
    archetypeName: 'The Forge Fire',
    friendshipStyle: 'Friendships are built through shared labor and proven reliability. You bond over projects, challenges, and the satisfaction of making something together. Your loyalty is demonstrated through action—showing up, building, fixing, protecting. Words matter less than what you do with your hands and your time.',
    naturalChemistry: [
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'They understand the language of making and doing. Together you can build anything—a business, a home, a community—because you both believe in tangible results.' },
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'They bring the vision; you bring the execution. A friendship that turns ideas into reality with remarkable efficiency.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Kindred spirits in endurance and purpose. You both understand that the best things are forged under pressure.' }
    ],
    growthFriendships: [
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Their ethereal nature challenges your material focus. They teach you that not everything valuable can be held in your hands.' },
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Their emotional permeability shows you that vulnerability is its own kind of strength. They soften your edges without weakening your core.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual abstraction pulls you out of the workshop and into the realm of ideas. They remind you that thinking is also a form of making.' }
    ],
    frictionPoints: [
      { subtypeId: 'air-earth', name: 'Air-Earth (The Gilded Zephyr)', reason: 'They want to nurture through comfort; you want to nurture through challenge. Their warmth can feel like interference with your process.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their stillness reads as inaction to you. You want to build; they want to reflect. The timing never quite aligns.' },
      { subtypeId: 'water-fire', name: 'Water-Fire (The Sun-Dappled Pond)', reason: 'Their nostalgic warmth can feel like sentimentality to your pragmatic nature. You\'re building the future; they\'re honoring the past.' }
    ]
  },
  {
    subtypeId: 'fire-air',
    subtypeName: 'Fire + Air',
    elementId: 'fire',
    archetypeName: 'The Illuminating Spark',
    friendshipStyle: 'Friendships are sanctuaries of encouragement and shared wonder. You seek companions who celebrate small discoveries, who protect each other\'s fragile new ideas, and who understand that the best conversations happen in cozy corners. You offer gentle warmth, enthusiastic support, and the gift of seeing potential others miss.',
    naturalChemistry: [
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Two gentle souls who understand the sacred space of emerging ideas. Together you create a friendship that feels like a warm library on a rainy day.' },
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Their dreamy softness harmonizes with your gentle warmth. A friendship of mutual protection and quiet, shared beauty.' },
      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their sensory tenderness matches your need for coziness. Together you create the most nurturing friendship environment imaginable.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their intensity pushes you out of your comfort zone. They show you that your ideas deserve a bigger stage than your reading nook.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their boldness challenges your tendency to keep things small and safe. They dare you to be louder, brighter, more visible.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their immovable confidence teaches you that you don\'t need to be small to be safe. They model quiet power without aggression.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their relentless productivity can overwhelm your need for gentle pacing. They see your contemplation as hesitation; you see their drive as insensitivity.' },
      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'Their social abundance can drain your intimate energy. You want deep connection with one; they want warm connection with many.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual detachment can feel cold to your emotional warmth. You offer your heart; they offer their mind. The exchange can feel unequal.' }
    ]
  },

  // WATER SUBTYPES
  {
    subtypeId: 'water-air',
    subtypeName: 'Water + Air',
    elementId: 'water',
    archetypeName: 'The Misty Shore',
    friendshipStyle: 'Friendships are soft, enveloping atmospheres of acceptance. You create spaces where pretenses dissolve and people can simply be. You bond through shared silences, gentle humor, and the unspoken understanding that everyone is doing their best. You protect your friends by absorbing their stress without them even noticing.',
    naturalChemistry: [
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their gentle warmth penetrates your fog without burning it away. A friendship of mutual tenderness and shared quiet discoveries.' },
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Mirror souls who understand liminal spaces. Together you create a friendship that exists beautifully between worlds.' },
      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their sensory softness matches your emotional softness. A friendship that feels like being wrapped in cashmere.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their blazing clarity forces you to define your own edges. They teach you that having boundaries doesn\'t mean losing your softness.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their grounded practicality gives you roots when you\'re drifting. They show you that commitment to the material world can be an anchor, not a cage.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their dynamic energy pulls you out of your fog into moments of vivid engagement. They remind you that life also happens in bright colors.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their intensity shatters your carefully maintained atmospheric calm. They demand clarity you can\'t always provide; you offer nuance they can\'t always receive.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their relentless purpose feels like a bulldozer through your delicate landscape. They want to build; you want to drift.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their immovable certainty can feel like a wall against your flowing nature. You need permeability; they offer permanence.' }
    ]
  },
  {
    subtypeId: 'water-water',
    subtypeName: 'Water + Water',
    elementId: 'water',
    archetypeName: 'The Forest Lake',
    friendshipStyle: 'Friendships are rare, profound, and wordless. You maintain very few close bonds, but those you keep are oceanic in depth. You communicate through presence, shared silence, and an almost telepathic emotional attunement. You don\'t need to explain yourself to true friends—they already know.',
    naturalChemistry: [
      { subtypeId: 'water-earth', name: 'Water-Earth (The Languid River)', reason: 'They share your depth but add narrative structure. Together you create a friendship rich in meaning, memory, and mutual understanding.' },

      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their gentle earthiness provides a soft container for your depths. A friendship of profound comfort and unspoken devotion.' },
      { subtypeId: 'water-fire', name: 'Water-Fire (The Sun-Dappled Pond)', reason: 'They bring warmth to your stillness without disturbing it. Like sunlight on a lake—they illuminate without agitating.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their volcanic energy forces you to surface. They teach you that depth without expression becomes stagnation.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual clarity gives structure to your emotional depths. They help you articulate what you\'ve always felt but never said.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their playful energy introduces movement into your stillness. They show you that change doesn\'t have to mean loss.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their constant motion disturbs your reflective surface. They see your stillness as passivity; you see their activity as agitation.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their need for novelty and change feels threatening to your need for constancy. They want to rearrange the furniture; you want the lake to remain undisturbed.' },
      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'Their social abundance overwhelms your intimate nature. Their parties feel like floods to your carefully maintained water level.' }
    ]
  },
  {
    subtypeId: 'water-fire',
    subtypeName: 'Water + Fire',
    elementId: 'water',
    archetypeName: 'The Sun-Dappled Pond',
    friendshipStyle: 'Friendships are gardens of shared memory and beauty. You bond through creating traditions, honoring anniversaries, and building a shared mythology. You remember every meaningful moment and weave them into the fabric of the friendship. Your warmth is nostalgic, your loyalty sentimental, your love expressed through the beauty you create together.',
    naturalChemistry: [
      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'They share your love of celebration and beauty. Together you create friendships rich in ritual, feasting, and joyful abundance.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'They provide the depth your warmth needs to rest upon. A friendship of profound emotional understanding lit by golden light.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their gentle enthusiasm matches your warm nostalgia. Together you celebrate the small, beautiful moments others overlook.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their forward momentum challenges your backward gaze. They teach you that the future can be as beautiful as the memories you cherish.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their detached perspective helps you see your nostalgia clearly—what serves you and what holds you back.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their pragmatic drive shows you that beauty can also be functional. They challenge your sentimentality with purposeful creation.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their utilitarian approach to life dismisses the beauty you find essential. They want to build something useful; you want to create something meaningful.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual detachment can feel like emotional abandonment. You offer warmth and memory; they offer analysis and distance.' },
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their emotional minimalism frustrates your expressive warmth. You want to celebrate; they want to observe.' }
    ]
  },
  {
    subtypeId: 'water-earth',
    subtypeName: 'Water + Earth',
    elementId: 'water',
    archetypeName: 'The Languid River',

    friendshipStyle: 'Friendships are rivers of shared story and accumulated wisdom. You bond through the exchange of narratives—your own, others\', the world\'s. You are the friend who remembers the context, who holds the history, who can trace the thread of someone\'s life and help them see the pattern. Your loyalty flows like a river—steady, nourishing, and carrying everything forward.',
    naturalChemistry: [
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'They provide the still depths your narrative needs to pool and deepen. Together you create a friendship of extraordinary emotional and intellectual richness.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'They share your appreciation for cycles, legacy, and the slow accumulation of meaning. A friendship built on shared values and mutual respect for time.' },
      { subtypeId: 'air-earth', name: 'Air-Earth (The Gilded Zephyr)', reason: 'Their warm wisdom complements your flowing narrative. Together you create a friendship that feels like a long, satisfying conversation that never needs to end.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their present-moment intensity pulls you out of your narrative stream. They teach you that sometimes the story needs to stop so life can happen.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their spontaneous creativity shows you that stories can be invented, not just recorded. They bring playfulness to your earnest archiving.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their gentle optimism challenges your tendency toward melancholy narrative. They remind you that stories can also have happy endings.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'They live in the present tense; you live in the narrative arc. By the time you\'ve contextualized the situation, they\'ve already acted and moved on.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their constant reinvention feels like erasure of the history you\'ve carefully preserved. They want a blank page; you want a library.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their focus on making dismisses your focus on meaning. They want to know what it does; you want to know what it means.' }
    ]
  },

  // EARTH SUBTYPES
  {
    subtypeId: 'earth-fire',
    subtypeName: 'Earth + Fire',
    elementId: 'earth',
    archetypeName: 'The Mountain Stone',
    friendshipStyle: 'Friendships are tested alliances built on demonstrated integrity. You don\'t give your loyalty easily, but once given, it is absolute and enduring. You are the friend who shows up in crisis without being asked, who protects without seeking credit, who provides shelter without expecting gratitude. Your friendships are mountains—they take time to form and they last forever.',
    naturalChemistry: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'They bring the vision and intensity; you provide the immovable foundation. A friendship of mutual respect between two forms of power.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Kindred spirits in endurance. You both understand that the most valuable things are created under pressure and proven over time.' },
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their quiet authority mirrors your own. Two people who lead from stillness and understand the weight of responsibility.' }
    ],
    growthFriendships: [
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Their ethereal sensitivity teaches you that strength can also be gentle. They show you the power in vulnerability and the wisdom in yielding.' },
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Their flowing nature challenges your rigidity. They teach you that permanence and flexibility are not opposites.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual lightness lifts the weight you carry. They remind you that not every problem requires a mountain\'s response.' }
    ],
    frictionPoints: [
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Their boundary-less nature feels like structural weakness to you. You offer permanence; they need permeability. The wall meets the fog.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their constant change feels like instability. You build for centuries; they redecorate every season.' },
      { subtypeId: 'air-water', name: 'Air-Water (The First Whisper)', reason: 'Their otherworldly nature can feel impractical to your grounded sensibility. You deal in stone; they deal in starlight.' }
    ]
  },
  {
    subtypeId: 'earth-earth',
    subtypeName: 'Earth + Earth',
    elementId: 'earth',
    archetypeName: 'The Forest Floor',
    friendshipStyle: 'Friendships are practical partnerships rooted in shared labor and seasonal rhythm. You bond through doing things together—cooking, gardening, building, fixing. Your loyalty is expressed through showing up reliably, sharing resources, and weathering life\'s seasons side by side. You are the friend who brings soup when someone is sick, who helps move furniture, who remembers to check in during hard times.',
    naturalChemistry: [
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'They share your love of making and doing. Together you can accomplish anything tangible—the friendship that builds houses and grows gardens.' },
      { subtypeId: 'water-earth', name: 'Water-Earth (The Languid River)', reason: 'They add narrative depth to your practical wisdom. Together you create a friendship rich in both meaning and substance.' },

      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'They share your generous nature but add warmth and celebration. Together you create the most abundant, welcoming friendship circle.' }
    ],
    growthFriendships: [
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual abstraction pulls you out of routine. They show you that thinking about life is also a way of living it.' },
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their transformative energy challenges your preference for stability. They teach you that sometimes the field needs to burn to grow again.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their creative spontaneity disrupts your careful planning in necessary ways. They remind you that the best harvests sometimes come from unplanned seeds.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their emotional minimalism feels cold to your warm, nurturing nature. You offer homemade bread; they prefer to eat alone.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their detachment from the material world baffles you. You plant gardens; they contemplate the philosophy of gardens. The gap can feel unbridgeable.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their restless energy makes you anxious. You need roots; they need runway. Your stability feels like stagnation to them.' }
    ]
  },
  {
    subtypeId: 'earth-water',
    subtypeName: 'Earth + Water',
    elementId: 'earth',
    archetypeName: 'The Velvet Moss',
    friendshipStyle: 'Friendships are sensory sanctuaries of comfort and tenderness. You create the softest, safest spaces for your friends—physically, emotionally, and aesthetically. You bond through shared comfort: cooking together, sitting in gardens, exchanging handmade gifts. Your love language is creating beauty and ease for those you cherish.',
    naturalChemistry: [
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Two soft souls who understand the language of comfort and protection. Together you create a friendship that feels like the safest place on earth.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their gentle warmth matches your tender earthiness. A friendship of shared coziness, mutual encouragement, and quiet delight.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their emotional depth meets your sensory depth. A friendship of profound, wordless understanding and exquisite comfort.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their intensity challenges your comfort zone. They teach you that growth sometimes requires leaving the bower and facing the storm.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'Their dynamic energy introduces necessary disruption. They show you that comfort can become a cage if you never leave it.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their purposeful drive challenges your tendency toward pleasant inertia. They show you that softness can also have direction.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their volcanic energy feels like an assault on your carefully curated peace. They bring intensity; you need gentleness.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their relentless productivity dismisses your contemplative comfort. They want to make; you want to be.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual coolness can feel emotionally distant. You offer a handmade blanket; they offer a theoretical framework.' }
    ]
  },
  {
    subtypeId: 'earth-air',
    subtypeName: 'Earth + Air',
    elementId: 'earth',
    archetypeName: 'The Golden Harvest',
    friendshipStyle: 'Friendships are feasts of generous abundance. You are the host, the gatherer, the one who brings people together around a table. Your friendships are warm, inclusive, and celebratory—you believe that life\'s richness is meant to be shared. You express love through feeding, gifting, creating experiences, and making sure no one at your table goes hungry—physically or emotionally.',
    naturalChemistry: [
      { subtypeId: 'water-fire', name: 'Water-Fire (The Sun-Dappled Pond)', reason: 'They share your love of beauty and celebration. Together you create friendships that are works of art—warm, golden, and memorable.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'They share your practical generosity. Together you create the most abundant, welcoming community imaginable.' },
      { subtypeId: 'air-earth', name: 'Air-Earth (The Gilded Zephyr)', reason: 'They match your warmth with intellectual depth. A friendship that is both nourishing and stimulating—the best dinner party, every time.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their emotional minimalism challenges your generous overflow. They teach you that sometimes the most generous thing is to give someone space.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their profound stillness shows you the value of quiet intimacy over social abundance. They teach you that depth and breadth are different gifts.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'Their intellectual independence challenges your need to nurture. They show you that some people are nourished by ideas, not food.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their controlled precision rejects your abundant warmth. You set a lavish table; they prefer to eat alone in silence.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their need for solitude conflicts with your need to gather. Your invitation feels like intrusion; their refusal feels like rejection.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their intimate scale conflicts with your expansive hospitality. They want a quiet corner; you want a full house.' }
    ]
  },

  // AIR SUBTYPES
  {
    subtypeId: 'air-air',
    subtypeName: 'Air + Air',
    elementId: 'air',
    archetypeName: 'The Clear Morning Sky',
    friendshipStyle: 'Friendships are intellectual partnerships of mutual curiosity. You seek companions who stimulate your mind, respect your independence, and can engage in conversations that range from quantum physics to philosophy to the meaning of a particular shade of blue. You offer clarity, honest perspective, and the rare gift of seeing your friends more clearly than they see themselves.',
    naturalChemistry: [
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their precision matches your clarity. A friendship of two sharp minds who can communicate in shorthand and respect each other\'s boundaries.' },
      { subtypeId: 'air-earth', name: 'Air-Earth (The Gilded Zephyr)', reason: 'They add warmth to your clarity without clouding it. A friendship that is both intellectually rigorous and emotionally nourishing.' },
      { subtypeId: 'air-fire', name: 'Air-Fire (The Playful Breeze)', reason: 'They share your mental agility but add creative spark. Together you generate ideas at a rate that astonishes everyone else.' }
    ],
    growthFriendships: [
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their grounded practicality challenges your tendency toward abstraction. They teach you that ideas need roots to become real.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their emotional depth reveals the limitations of pure intellect. They teach you that some truths can only be felt, never thought.' },
      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their sensory richness shows you that the body also has wisdom. They teach you to feel the texture of life, not just analyze it.' }
    ],
    frictionPoints: [
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their attachment to routine and tradition feels like intellectual stagnation. You want to explore; they want to maintain.' },
      { subtypeId: 'water-fire', name: 'Water-Fire (The Sun-Dappled Pond)', reason: 'Their sentimental warmth can feel like emotional manipulation to your rational mind. You offer analysis; they want appreciation.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their emotional sensitivity can make conversations feel like minefields. You speak truth; they hear criticism.' }
    ]
  },
  {
    subtypeId: 'air-fire',
    subtypeName: 'Air + Fire',
    elementId: 'air',
    archetypeName: 'The Playful Breeze',
    friendshipStyle: 'Friendships are adventures of shared enthusiasm and creative conspiracy. You seek co-conspirators who match your energy, embrace spontaneity, and aren\'t afraid to try something completely new on a Tuesday afternoon. You offer infectious enthusiasm, creative inspiration, and the gift of making everything feel like an exciting possibility.',
    naturalChemistry: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'They match your intensity and raise it. Together you create a friendship that is a perpetual fireworks display of ideas and action.' },
      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'They share your mental agility and add intellectual depth. Together you can solve any puzzle, crack any code, reimagine any system.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'They share your creative spark but add gentle warmth. A friendship of mutual inspiration and joyful discovery.' }
    ],
    growthFriendships: [
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their patient persistence teaches you the value of finishing what you start. They show you that depth comes from staying, not just starting.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their profound stillness challenges your constant motion. They teach you that the most important discoveries happen when you stop moving.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their immovable presence teaches you that some things should not be changed. They model the power of permanence.' }
    ],
    frictionPoints: [
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their rigidity frustrates your need for change. You want to rearrange the world; they want to preserve it.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their stillness feels like resistance to your energy. You bring fireworks; they want candlelight.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their routine-bound nature feels like a cage to your free spirit. They plant roots; you spread wings.' }
    ]
  },
  {
    subtypeId: 'air-earth',
    subtypeName: 'Air + Earth',
    elementId: 'air',
    archetypeName: 'The Gilded Zephyr',
    friendshipStyle: 'Friendships are warm greenhouses of mutual growth. You combine intellectual curiosity with nurturing warmth, creating friendships where people feel both stimulated and cared for. You are the friend who brings both a fascinating book and a homemade meal, who asks the deep questions and then makes sure everyone has a comfortable chair.',
    naturalChemistry: [
      { subtypeId: 'earth-air', name: 'Earth-Air (The Golden Harvest)', reason: 'They match your warmth and add generous abundance. Together you create the most welcoming, intellectually stimulating community.' },
      { subtypeId: 'water-earth', name: 'Water-Earth (The Languid River)', reason: 'They share your love of wisdom and add narrative depth. A friendship of shared stories, warm meals, and meaningful conversation.' },

      { subtypeId: 'air-air', name: 'Air-Air (The Clear Morning Sky)', reason: 'They share your intellectual curiosity and add clarity. Together you explore ideas with both warmth and precision.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their uncompromising intensity challenges your diplomatic warmth. They teach you that sometimes truth requires heat, not just light.' },
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their emotional precision challenges your generous diffusion. They teach you that focused attention is sometimes more valuable than broad warmth.' },
      { subtypeId: 'water-water', name: 'Water-Water (The Forest Lake)', reason: 'Their profound depth challenges your breadth. They show you that one deep root can be stronger than many shallow ones.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their confrontational honesty can feel like aggression to your diplomatic nature. You build bridges; they burn them.' },
      { subtypeId: 'fire-water', name: 'Fire-Water (The Blue Flame)', reason: 'Their emotional austerity rejects your nurturing warmth. You offer a greenhouse; they prefer a laboratory.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their utilitarian focus dismisses your aesthetic sensibility. You want beauty and meaning; they want function and output.' }
    ]
  },
  {
    subtypeId: 'air-water',
    subtypeName: 'Air + Water',
    elementId: 'air',
    archetypeName: 'The First Whisper',
    friendshipStyle: 'Friendships are sacred spaces of shared mystery and creative communion. You seek companions who understand that the most important things cannot be said directly, who appreciate silence as a form of communication, and who honor the thin places where the ordinary becomes luminous. You offer the gift of seeing the sacred in the everyday and reflecting it back to your friends.',
    naturalChemistry: [
      { subtypeId: 'water-air', name: 'Water-Air (The Misty Shore)', reason: 'Mirror souls who live in the liminal spaces. Together you create a friendship that exists in the beautiful threshold between worlds.' },
      { subtypeId: 'fire-air', name: 'Fire-Air (The Illuminating Spark)', reason: 'Their gentle warmth provides safe harbor for your ethereal nature. A friendship of shared wonder and mutual protection of fragile, beautiful things.' },
      { subtypeId: 'earth-water', name: 'Earth-Water (The Velvet Moss)', reason: 'Their sensory tenderness grounds your ethereality without crushing it. They give your visions a soft place to land.' }
    ],
    growthFriendships: [
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their material focus grounds your ethereal nature. They teach you that visions need hands to become real.' },
      { subtypeId: 'earth-earth', name: 'Earth-Earth (The Forest Floor)', reason: 'Their practical wisdom shows you that the sacred also lives in the mundane—in bread, in soil, in the rhythm of daily work.' },
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their blazing presence burns away your tendency toward obscurity. They teach you that your gifts deserve to be seen, not hidden.' }
    ],
    frictionPoints: [
      { subtypeId: 'fire-fire', name: 'Fire-Fire (The Electric Arc)', reason: 'Their intensity feels like a searchlight in your sacred darkness. They demand visibility; you need mystery.' },
      { subtypeId: 'earth-fire', name: 'Earth-Fire (The Mountain Stone)', reason: 'Their immovable practicality dismisses your otherworldly perception. They deal in stone; you deal in starlight.' },
      { subtypeId: 'fire-earth', name: 'Fire-Earth (The Forge Fire)', reason: 'Their relentless making feels like noise in your contemplative silence. They forge; you listen. The rhythms clash.' }
    ]
  }
];

// Element-level compatibility matrix for the calculator
export interface ElementCompatibility {
  elements: [string, string];
  baseScore: number;
  dynamic: string;
  naturalGift: string;
  coreChallenge: string;
}

export const elementCompatibilityMatrix: ElementCompatibility[] = [
  // Same element pairings
  { elements: ['fire', 'fire'], baseScore: 7, dynamic: 'Mirror Intensity', naturalGift: 'Mutual understanding of drive and passion', coreChallenge: 'Competition for dominance and attention' },
  { elements: ['water', 'water'], baseScore: 8, dynamic: 'Deep Resonance', naturalGift: 'Profound emotional attunement without words', coreChallenge: 'Mutual withdrawal during difficulty' },
  { elements: ['earth', 'earth'], baseScore: 8, dynamic: 'Shared Foundation', naturalGift: 'Reliable, practical partnership that endures', coreChallenge: 'Resistance to change and mutual stagnation' },
  { elements: ['air', 'air'], baseScore: 7, dynamic: 'Intellectual Symphony', naturalGift: 'Stimulating exchange of ideas and perspectives', coreChallenge: 'Emotional avoidance masked as intellectual discourse' },
  
  // Cross-element pairings
  { elements: ['fire', 'water'], baseScore: 5, dynamic: 'Steam & Transformation', naturalGift: 'Fire brings clarity to Water\'s depths; Water tempers Fire\'s intensity', coreChallenge: 'Fire can evaporate Water\'s sensitivity; Water can extinguish Fire\'s drive' },
  { elements: ['fire', 'earth'], baseScore: 7, dynamic: 'Forge & Foundation', naturalGift: 'Fire provides vision; Earth provides structure to realize it', coreChallenge: 'Fire\'s impatience vs Earth\'s deliberate pace' },
  { elements: ['fire', 'air'], baseScore: 8, dynamic: 'Wildfire & Wind', naturalGift: 'Air amplifies Fire\'s energy; Fire gives Air direction and purpose', coreChallenge: 'Together they can burn too bright and fast, leaving nothing sustained' },
  { elements: ['water', 'earth'], baseScore: 8, dynamic: 'River & Valley', naturalGift: 'Water nourishes Earth\'s growth; Earth gives Water banks and direction', coreChallenge: 'Earth can dam Water\'s flow; Water can erode Earth\'s boundaries' },
  { elements: ['water', 'air'], baseScore: 6, dynamic: 'Cloud & Mist', naturalGift: 'Shared appreciation for subtlety, nuance, and the unseen', coreChallenge: 'Both can become too diffuse—no one anchors the friendship in reality' },
  { elements: ['earth', 'air'], baseScore: 6, dynamic: 'Mountain & Sky', naturalGift: 'Earth grounds Air\'s ideas; Air lifts Earth\'s perspective', coreChallenge: 'Earth finds Air flighty; Air finds Earth heavy and limiting' }
];

// Generate a detailed pairwise compatibility report
export function generateCompatibilityReport(subtype1Id: string, subtype2Id: string): PairwiseCompatibility {
  const element1 = subtype1Id.split('-')[0];
  const element2 = subtype2Id.split('-')[0];
  const secondary1 = subtype1Id.split('-')[1];
  const secondary2 = subtype2Id.split('-')[1];
  
  // Find base element compatibility
  const elementCompat = elementCompatibilityMatrix.find(
    ec => (ec.elements[0] === element1 && ec.elements[1] === element2) ||
          (ec.elements[0] === element2 && ec.elements[1] === element1)
  );
  
  let baseScore = elementCompat?.baseScore || 6;
  
  // Adjust score based on secondary elements
  // If secondary elements are compatible, boost score
  const secondaryCompat = elementCompatibilityMatrix.find(
    ec => (ec.elements[0] === secondary1 && ec.elements[1] === secondary2) ||
          (ec.elements[0] === secondary2 && ec.elements[1] === secondary1)
  );
  
  if (secondaryCompat) {
    baseScore = Math.round((baseScore * 0.7) + (secondaryCompat.baseScore * 0.3));
  }
  
  // Same subtype bonus
  if (subtype1Id === subtype2Id) {
    baseScore = Math.min(10, baseScore + 1);
  }
  
  // Complementary opposites bonus (fire-water with water-fire, etc.)
  if (element1 === secondary2 && element2 === secondary1) {
    baseScore = Math.min(10, baseScore + 1);
  }
  
  // Clamp score
  baseScore = Math.max(1, Math.min(10, baseScore));
  
  // Get profiles for detailed info
  const profile1 = friendshipProfiles.find(p => p.subtypeId === subtype1Id);
  const profile2 = friendshipProfiles.find(p => p.subtypeId === subtype2Id);
  
  // Check if they appear in each other's natural chemistry
  const isNaturalAlly1 = profile1?.naturalChemistry.some(a => a.subtypeId === subtype2Id);
  const isNaturalAlly2 = profile2?.naturalChemistry.some(a => a.subtypeId === subtype1Id);
  if (isNaturalAlly1 || isNaturalAlly2) {
    baseScore = Math.min(10, baseScore + 1);
  }
  
  // Check if they appear in each other's friction points
  const isFriction1 = profile1?.frictionPoints.some(f => f.subtypeId === subtype2Id);
  const isFriction2 = profile2?.frictionPoints.some(f => f.subtypeId === subtype1Id);
  if (isFriction1 || isFriction2) {
    baseScore = Math.max(1, baseScore - 1);
  }
  
  // Determine friendship archetype
  let friendshipArchetype = '';
  let chemistryType = '';
  
  if (baseScore >= 9) {
    friendshipArchetype = 'Soul Companions';
    chemistryType = 'Extraordinary Natural Affinity';
  } else if (baseScore >= 7) {
    friendshipArchetype = 'Kindred Spirits';
    chemistryType = 'Strong Natural Chemistry';
  } else if (baseScore >= 5) {
    friendshipArchetype = 'Growth Partners';
    chemistryType = 'Complementary Growth Potential';
  } else if (baseScore >= 3) {
    friendshipArchetype = 'Creative Tension';
    chemistryType = 'Challenging but Transformative';
  } else {
    friendshipArchetype = 'Elemental Opposites';
    chemistryType = 'Requires Conscious Bridge-Building';
  }
  
  // Generate description
  const name1 = profile1?.archetypeName || subtype1Id;
  const name2 = profile2?.archetypeName || subtype2Id;
  
  const descriptions: Record<string, string> = {
    'Extraordinary Natural Affinity': `${name1} and ${name2} share a rare and immediate recognition—the kind of friendship that feels like coming home. Their energies don't just coexist; they amplify each other in ways that make both people more fully themselves. This is a friendship that others notice and envy for its effortless depth.`,
    'Strong Natural Chemistry': `${name1} and ${name2} find in each other a natural complement—different enough to be interesting, similar enough to be comfortable. Their friendship has an easy rhythm, a shared language that develops quickly, and a mutual respect that deepens with time.`,
    'Complementary Growth Potential': `${name1} and ${name2} offer each other something they can't find alone. This friendship requires more conscious effort than pure chemistry, but the rewards are proportional to the investment. Each challenges the other to expand beyond their elemental comfort zone.`,
    'Challenging but Transformative': `${name1} and ${name2} operate on fundamentally different frequencies. This friendship is not easy, but it is potentially the most transformative either will experience. The friction between them generates heat—and heat, properly channeled, creates diamonds.`,
    'Requires Conscious Bridge-Building': `${name1} and ${name2} speak different elemental languages entirely. Without conscious effort, they will simply talk past each other. But if both commit to learning the other's frequency, this friendship becomes a masterclass in empathy and expansion.`
  };
  
  const description = descriptions[chemistryType] || `${name1} and ${name2} bring unique elemental energies to their friendship, creating a dynamic that requires understanding and appreciation of their differences.`;
  
  // Generate strengths
  const strengths: string[] = [];
  if (elementCompat) {
    strengths.push(elementCompat.naturalGift);
  }
  if (secondary1 === secondary2) {
    strengths.push(`Shared secondary ${secondary1} energy creates common ground and mutual understanding`);
  }
  if (element1 === element2) {
    strengths.push(`Same primary element means intuitive understanding of core drives and needs`);
  }
  if (isNaturalAlly1) {
    const ally = profile1?.naturalChemistry.find(a => a.subtypeId === subtype2Id);
    if (ally) strengths.push(ally.reason);
  }
  if (isNaturalAlly2 && !isNaturalAlly1) {
    const ally = profile2?.naturalChemistry.find(a => a.subtypeId === subtype1Id);
    if (ally) strengths.push(ally.reason);
  }
  if (strengths.length < 2) {
    strengths.push(`Both types bring unique perspectives that, when combined, create a more complete picture of reality`);
  }
  
  // Generate challenges
  const challenges: string[] = [];
  if (elementCompat) {
    challenges.push(elementCompat.coreChallenge);
  }
  if (isFriction1) {
    const friction = profile1?.frictionPoints.find(f => f.subtypeId === subtype2Id);
    if (friction) challenges.push(friction.reason);
  }
  if (isFriction2 && !isFriction1) {
    const friction = profile2?.frictionPoints.find(f => f.subtypeId === subtype1Id);
    if (friction) challenges.push(friction.reason);
  }
  if (challenges.length < 2) {
    challenges.push(`Different processing speeds and communication styles may require patience and translation`);
  }
  
  // Generate bridge advice
  const bridgeAdvice = generateBridgeAdvice(element1, element2, secondary1, secondary2, baseScore);
  
  return {
    overallScore: baseScore,
    chemistryType,
    description,
    strengths,
    challenges,
    bridgeAdvice,
    friendshipArchetype
  };
}

function generateBridgeAdvice(el1: string, el2: string, sec1: string, sec2: string, score: number): string[] {
  const advice: string[] = [];
  
  // Element-specific bridge advice
  if (el1 === 'fire' || el2 === 'fire') {
    if (el1 === 'water' || el2 === 'water') {
      advice.push('Create structured time for both intensity and reflection. Alternate between Fire\'s active adventures and Water\'s contemplative spaces.');
      advice.push('Fire: practice listening without solving. Water: practice expressing needs directly rather than hoping they\'ll be intuited.');
      advice.push('Find shared activities that honor both energies—cooking together (Fire\'s transformation + Water\'s nourishment), or hiking near water.');
    }
    if (el1 === 'earth' || el2 === 'earth') {
      advice.push('Channel shared energy into collaborative projects. Fire provides vision and urgency; Earth provides structure and follow-through.');
      advice.push('Fire: honor Earth\'s need for predictability by keeping commitments. Earth: honor Fire\'s need for spontaneity by leaving some plans open.');
      advice.push('Celebrate completed milestones together—this feeds both Fire\'s need for achievement and Earth\'s need for tangible results.');
    }
    if (el1 === 'air' || el2 === 'air') {
      advice.push('Feed the friendship with new experiences, ideas, and adventures. Both types thrive on stimulation and novelty.');
      advice.push('Build in reflection time after shared adventures. Air needs to process intellectually; Fire needs to process through action.');
      advice.push('Create something together—a project, a tradition, a shared creative endeavor—that gives your combined energy a constructive outlet.');
    }
  }
  if (el1 === 'water' || el2 === 'water') {
    if (el1 === 'earth' || el2 === 'earth') {
      advice.push('Honor the slow pace of this friendship. Both types deepen over time rather than igniting quickly.');
      advice.push('Create shared rituals—weekly walks, seasonal celebrations, regular check-ins—that honor both Water\'s emotional needs and Earth\'s love of routine.');
      advice.push('Water: appreciate Earth\'s practical expressions of love. Earth: appreciate Water\'s emotional expressions of support.');
    }
    if ((el1 === 'air' || el2 === 'air') && !(el1 === 'fire' || el2 === 'fire')) {
      advice.push('Ground the friendship in regular, gentle contact. Both types can drift apart without meaning to.');
      advice.push('Share creative or intellectual pursuits that honor both Air\'s curiosity and Water\'s emotional depth—art, music, meaningful conversation.');
      advice.push('Air: make space for Water\'s emotional processing without trying to analyze it. Water: appreciate Air\'s perspective without requiring emotional validation.');
    }
  }
  if ((el1 === 'earth' || el2 === 'earth') && (el1 === 'air' || el2 === 'air') && !(el1 === 'fire' || el2 === 'fire') && !(el1 === 'water' || el2 === 'water')) {
    advice.push('Find the intersection of ideas and action. Air brings the vision; Earth brings the execution. Celebrate both contributions equally.');
    advice.push('Earth: be open to Air\'s need for change and variety. Air: respect Earth\'s need for stability and follow-through.');
    advice.push('Create a shared space that honors both—a garden (Earth) with a reading nook (Air), or a workshop (Earth) with an inspiration board (Air).');
  }
  
  // Same element advice
  if (el1 === el2) {
    advice.push(`As same-element friends, your greatest strength is mutual understanding—and your greatest risk is reinforcing each other's blind spots. Intentionally seek experiences outside your shared comfort zone.`);
    if (advice.length < 3) {
      advice.push('Introduce friends from other elements into your dynamic to prevent the echo chamber effect.');
    }
  }
  
  // Universal advice based on score
  if (score <= 4) {
    advice.push('Schedule regular, low-pressure check-ins. This friendship needs consistent small deposits, not occasional grand gestures.');
    advice.push('When conflict arises, name the elemental difference explicitly: "I think this is a Fire-Water moment—I need action and you need space. How do we honor both?"');
  }
  
  if (advice.length < 3) {
    advice.push('Practice the art of elemental translation: before expressing a need, consider how it sounds in your friend\'s elemental language.');
  }
  if (advice.length < 3) {
    advice.push('Remember that the goal is not to become the same—it is to create a friendship spacious enough to hold both of your elemental natures without either having to shrink.');
  }
  
  return advice.slice(0, 3);
}
