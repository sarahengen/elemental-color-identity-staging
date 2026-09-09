import type { NutritionSubtype } from './fireNutritionData';

export const waterNutritionSubtypes: NutritionSubtype[] = [
  {
    id: 'water-air',
    elementCombo: 'Water + Air',
    name: 'The Misty Shore',
    iconType: 'cloud',
    gradient: { from: '#6B8BA4', to: '#A8C8E8' },
    badgeColors: { bg: 'bg-sky-100', text: 'text-sky-700' },
    accentColor: 'blue',
    pattern:
      "Water+Air gain weight through emotional absorption and comfort eating. They absorb others' stress, then soothe with food. They eat to feel safe, to comfort themselves, to fill emotional space. Their weight fluctuates with their emotional state. They often don't notice they're eating—they just find themselves doing it.",
    bodyWisdom: 'Your body is telling you: "I need boundaries, not food, to feel safe."',
    approach: {
      do: 'Create clear boundaries around eating',
      dont: 'Use food as your only comfort',
      key: 'Feelings are not emergencies',
    },
    whatWorks: [
      {
        title: 'The Pause Practice',
        color: 'blue',
        items: [
          'Before eating, pause and ask: "Am I hungry, or am I feeling something?"',
          "Name the feeling. \"I'm anxious. I'm lonely. I'm tired.\"",
          'Then decide if food is actually what you need',
        ],
      },
      {
        title: 'Gentle Movement',
        color: 'teal',
        items: [
          'Yin yoga, walking in nature, swimming',
          'Nothing aggressive—your body needs soothing, not stress',
          'Movement that helps you process emotions',
        ],
      },
      {
        title: 'Boundary Work',
        color: 'indigo',
        items: [
          'Your weight is connected to how much you absorb from others',
          'Practice saying no. Practice protecting your energy.',
          "When you absorb less, you'll need to comfort-eat less",
        ],
      },
      {
        title: 'Comfort Menu',
        color: 'violet',
        items: [
          'Create a list of non-food comforts',
          'Warm bath, weighted blanket, call a friend, journal',
          'When you want to eat for comfort, try one of these first',
        ],
      },
      {
        title: 'Soup as Medicine',
        color: 'emerald',
        items: [
          'Warm, nourishing soups are perfect for you',
          'They comfort, hydrate, and nourish',
          'Make big batches for emotional days',
        ],
      },
    ],
    mantra: 'I can feel without feeding. I am safe in my own body.',
    eatingRituals: [
      {
        name: 'The solo meal',
        desc: "Once a week, eat alone, with attention, noticing own preferences without others' influence.",
      },
      {
        name: 'Blessing the food',
        desc: "A moment of gratitude for the food's journey to your plate.",
      },
      {
        name: 'Cooking for one',
        desc: 'Practice nourishing yourself without an audience.',
      },
      {
        name: 'The boundary meal',
        desc: "Eat something you love that others don't. Practice having preferences.",
      },
    ],
    mealName: 'Misty Shore',
    mealBalanced:
      'A bowl of homemade vegetable soup, made slowly with love, eaten by a window on a gray day, with good bread and butter, no rush, no demands. Warm. Safe. Nourishing.',
    mealShadow:
      "Eating whatever someone else wanted, not really tasting it, absorbing their mood, leaving hungry but not knowing why.",
  },
  {
    id: 'water-water',
    elementCombo: 'Water + Water',
    name: 'The Forest Lake',
    iconType: 'droplets',
    gradient: { from: '#2E5A6B', to: '#5B9EAD' },
    badgeColors: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
    accentColor: 'cyan',
    pattern:
      "Water+Water gain weight through stillness and stagnation. Their natural depth can become physical inertia. They don't move much. They don't feel urgency. They can ignore their body for long periods, then be surprised by changes. Depression often plays a role—when they're down, movement stops entirely.",
    bodyWisdom: 'Your body is telling you: "I need to move, not just feel."',
    approach: {
      do: 'Move daily, even if gently',
      dont: "Wait for motivation—it won't come",
      key: 'Motion creates emotion, not the other way',
    },
    whatWorks: [
      {
        title: 'The Daily Minimum',
        color: 'cyan',
        items: [
          'Commit to 10 minutes of movement. Every day.',
          'Not 30. Not an hour. Ten minutes.',
          "Often those 10 become 20. But if they don't, you still moved.",
        ],
      },
      {
        title: 'Water Movement',
        color: 'blue',
        items: [
          'Swimming, water aerobics, just floating',
          'Water supports your body and matches your element',
          'Being in water can unlock your desire to move',
        ],
      },
      {
        title: 'Body Awareness Practice',
        color: 'indigo',
        items: [
          'You live in your head and heart, not your body',
          'Daily body scan meditation',
          'Notice sensations without judgment',
        ],
      },
      {
        title: 'The Buddy System',
        color: 'teal',
        items: [
          "You'll move for others when you won't for yourself",
          'Walk with a friend. Join a class. Hire a trainer.',
          'External commitment helps bypass internal inertia',
        ],
      },
      {
        title: 'Depression Protocol',
        color: 'violet',
        items: [
          "Know that when you're down, movement is medicine",
          'Have a plan for dark days: 5 minutes of stretching, a short walk, anything',
          'Movement lifts your natural chemistry',
        ],
      },
    ],
    mantra: 'My body is not separate from me. I live here.',
    eatingRituals: [
      {
        name: 'The weekly new food',
        desc: 'One new thing, prepared safely, with no pressure to like it.',
      },
      {
        name: 'Eating with others',
        desc: 'Regular shared meals, even if uncomfortable at first.',
      },
      {
        name: 'The gratitude pause',
        desc: 'Before eating, a moment of presence, acknowledging the food.',
      },
      {
        name: 'Cooking as meditation',
        desc: 'The same meal, prepared with full attention, as practice.',
      },
    ],
    mealName: 'Forest Lake',
    mealBalanced:
      'The same breakfast for 10 years: perfect oatmeal with walnuts and maple syrup, eaten slowly, looking out the window, no phone, no rush. Grounding. True.',
    mealShadow:
      'The same meal, eaten mechanically, tasting nothing, just going through motions, disconnected from body and pleasure.',
  },
  {
    id: 'water-fire',
    elementCombo: 'Water + Fire',
    name: 'The Sun-Dappled Pond',
    iconType: 'waves',
    gradient: { from: '#4A7C8A', to: '#E8A87C' },
    badgeColors: { bg: 'bg-amber-100', text: 'text-amber-700' },
    accentColor: 'amber',
    pattern:
      "Water+Fire gain weight through social eating and joy-seeking. Food is celebration, connection, pleasure. They eat when they're happy, when they're with friends, when something tastes good. They struggle with solitary eating—it feels sad. Their weight reflects their social calendar and their emotional state.",
    bodyWisdom: 'Your body is telling you: "Joy is not just in food."',
    approach: {
      do: 'Find joy in movement, not just eating',
      dont: "Deprive yourself—it backfires",
      key: 'Celebrate with food, but not only with food',
    },
    whatWorks: [
      {
        title: 'The Joyful Movement',
        color: 'amber',
        items: [
          'Dance classes, hiking with friends, playful sports',
          "If it's not fun, you won't do it",
          'Find what lights you up and move that way',
        ],
      },
      {
        title: 'Social Eating Awareness',
        color: 'orange',
        items: [
          'You eat differently with others',
          "Notice portions, pace, how much you're actually enjoying",
          "It's okay to celebrate—just stay present",
        ],
      },
      {
        title: 'The Solo Meal Practice',
        color: 'rose',
        items: [
          'Once a week, make yourself a beautiful meal. Eat alone.',
          'Make it special—candle, nice plate, no phone',
          'Learn that you can nourish yourself too',
        ],
      },
      {
        title: 'Non-Food Celebrations',
        color: 'teal',
        items: [
          'Create a list of ways to celebrate without food',
          'Buy flowers, take a day trip, buy yourself a small gift',
          'Train your brain to associate joy with other things',
        ],
      },
      {
        title: 'Mindful First Bites',
        color: 'indigo',
        items: [
          'The first three bites are the most pleasurable',
          'Eat them slowly, with full attention',
          "After that, you're often eating on autopilot",
        ],
      },
    ],
    mantra: 'I celebrate with my whole life, not just my plate.',
    eatingRituals: [
      {
        name: 'The solo celebration',
        desc: 'Once a week, make yourself a beautiful meal, eat it with attention, alone.',
      },
      {
        name: 'Mindful first bites',
        desc: 'Before the social eating begins, three bites with full attention.',
      },
      {
        name: 'The gratitude pause',
        desc: 'A moment of joy for the food, the company, the beauty.',
      },
      {
        name: 'Cooking as play',
        desc: 'Experiment, have fun, no pressure for perfection.',
      },
    ],
    mealName: 'Sun-Dappled Pond',
    mealBalanced:
      "A dinner party with friends: colorful mezze platters, candles, music, laughter. Everyone builds their own plates, trying new things, sharing bites. Joyful. Connected. Enough.",
    mealShadow:
      "Skipped lunch because alone, then ate too much at dinner because \"it's fun,\" then felt bad, then promised to eat better tomorrow (and didn't).",
  },
  {

    id: 'water-earth',
    elementCombo: 'Water + Earth',
    name: 'The Languid River',
    iconType: 'mountain',
    gradient: { from: '#5B7B6A', to: '#8BA49E' },
    badgeColors: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    accentColor: 'emerald',
    pattern:
      "Water+Earth gain weight through narrative and habit. They eat according to family patterns, cultural traditions, personal history. \"In my family, we always...\" \"My mother fed me...\" Their relationship with food is tangled with memory, identity, and story. Changing how they eat feels like betraying their past.",
    bodyWisdom: 'Your body is telling you: "You can write new stories."',
    approach: {
      do: 'Honor the old stories while writing new ones',
      dont: 'Rebel against your history—integrate it',
      key: 'You are the author now',
    },
    whatWorks: [
      {
        title: 'The Story Audit',
        color: 'emerald',
        items: [
          'Write down your food stories',
          '"In my family, we show love through food."',
          '"I was taught to clean my plate."',
          '"Comfort food means ______."',
          'Then ask: Which stories serve me? Which need editing?',
        ],
      },
      {
        title: 'New Rituals',
        color: 'teal',
        items: [
          'Create new food traditions that honor your health',
          'Sunday meal prep with music and intention',
          'Thursday night healthy dinner with friends',
          'Write new stories through new habits',
        ],
      },
      {
        title: 'The Recipe Project',
        color: 'amber',
        items: [
          'Take family recipes and make them healthier',
          "Honor Grandma's memory while caring for your body",
          'Write down the new versions, with stories attached',
        ],
      },
      {
        title: 'Journal Before Eating',
        color: 'violet',
        items: [
          "When you're reaching for food from habit, pause",
          'Write one sentence: "I\'m eating because..."',
          'Awareness interrupts autopilot',
        ],
      },
      {
        title: 'Movement as Story',
        color: 'blue',
        items: [
          'Your exercise can also carry meaning',
          'Walk the route your grandparents walked',
          'Dance to music from your culture',
          'Connect movement to identity',
        ],
      },
    ],
    mantra: 'I honor my past by choosing my future.',
    eatingRituals: [
      {
        name: 'The recipe inheritance',
        desc: 'Learn a family recipe from an elder. Write it down. Make it. Tell the story.',
      },
      {
        name: 'The new tradition',
        desc: 'Create a new food ritual for your current family, your chosen people.',
      },
      {
        name: 'Eating with ancestors',
        desc: 'A meal honoring those who came before, with their foods, their stories.',
      },
      {
        name: 'The silent meal',
        desc: 'Once a week, eat with no stories, just presence. Notice what\'s there when narrative stops.',
      },
    ],
    mealName: 'Languid River',
    mealBalanced:
      "Making grandmother's holiday bread recipe, hands in flour, remembering her kitchen. Sharing it with friends, telling her stories. The bread is good. She is here. The story continues.",
    mealShadow:
      'Eating the same foods, alone, trapped in memories, unable to make new meals, new memories, new stories.',
  },
];
