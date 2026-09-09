import type { NutritionSubtype } from './fireNutritionData';

export const airNutritionSubtypes: NutritionSubtype[] = [
  {
    id: 'air-air',
    elementCombo: 'Air + Air',
    name: 'The Clear Morning Sky',
    iconType: 'cloud',
    gradient: { from: '#00CED1', to: '#87CEEB' },
    badgeColors: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    accentColor: 'cyan',
    pattern:
      "Air + Air gain weight through disembodiment and forgetting. They live in their heads, not their bodies. They forget to eat, then eat whatever's available. They're not connected to hunger cues. Their weight can fluctuate dramatically because they're simply not paying attention. They're surprised when their body changes.",
    bodyWisdom: 'Your body is telling you: "I exist. Please notice me."',
    approach: {
      do: 'Check in with your body daily',
      dont: "Wait until you're uncomfortable to notice",
      key: 'Your body is not a distraction—it\'s you',
    },
    whatWorks: [
      {
        title: 'The Daily Body Scan',
        color: 'cyan',
        items: [
          '5 minutes, eyes closed, scan from head to toe',
          "Just notice. Don't judge.",
          'Build the habit of inhabiting your body',
        ],
      },
      {
        title: 'Meal Alarms',
        color: 'teal',
        items: [
          'Set reminders to eat. Every meal.',
          'Not optional. Not "when you remember."',
          'Your body needs fuel whether you notice or not',
        ],
      },
      {
        title: 'Grounding Movement',
        color: 'emerald',
        items: [
          'Yoga, walking barefoot, any body-focused exercise',
          'Not just cardio (too easy to dissociate)',
          'Movement that requires presence',
        ],
      },
      {
        title: 'Eating with Awareness',
        color: 'blue',
        items: [
          'No screens while eating',
          'Sit at a table. Notice the food. Taste it.',
          'You eat less when you actually experience eating',
        ],
      },
      {
        title: 'The "What Do I Need?" Check',
        color: 'indigo',
        items: [
          'Multiple times daily, pause and ask your body',
          'Not your head—your actual body',
          'Hunger? Thirst? Tired? Stiff?',
        ],
      },
    ],
    mantra: 'I live here, in this body, not above it.',
    eatingRituals: [
      {
        name: 'The Alarm Practice',
        desc: 'Set alarms for meals. When they go off, stop. Eat. No exceptions for one month.',
      },
      {
        name: 'The Table Rule',
        desc: 'No eating at desks. No eating in cars. No eating while walking. Table only.',
      },
      {
        name: 'The Three-Breath Pause',
        desc: 'Before eating, three conscious breaths. Reminds them they have a body.',
      },
      {
        name: 'The Weekly Batch',
        desc: 'Sunday afternoon, prepare simple meals for the week. Removes decision fatigue.',
      },
      {
        name: 'The Body Check',
        desc: 'Before meals, pause and ask: "What does my body actually need right now?"',
      },
    ],
    mealName: 'Clear Morning Sky',
    mealBalanced:
      "A simple roasted chicken thigh with olive oil, salt, pepper. A pile of roasted vegetables—carrots, potatoes, onions. A small portion of quinoa. Everything on one plate. Eaten at a table. No phone. No book. Just food. Takes 20 minutes. They notice they actually taste things. They're surprised.",
    mealShadow:
      "Coffee at 8am. Nothing until 3pm, when they realize they're shaky. Grab a granola bar from the gas station. Eat it while driving. Dinner at 9pm—whatever was fastest (takeout, cereal, toast). Go to bed with stomach unhappy, wake up tired, repeat.",
  },
  {
    id: 'air-fire',
    elementCombo: 'Air + Fire',
    name: 'The Playful Breeze',
    iconType: 'sparkle',
    gradient: { from: '#00CED1', to: '#FF6B35' },
    badgeColors: { bg: 'bg-orange-100', text: 'text-orange-800' },
    accentColor: 'orange',
    pattern:
      "Air + Fire gain weight through inconsistency and distraction. They're always moving, always busy, always doing something—but not necessarily something that supports their body. They graze, snack, eat on the go. They struggle with structure. Their weight reflects their scattered energy and difficulty sitting still.",
    bodyWisdom: 'Your body is telling you: "You can land without dying."',
    approach: {
      do: 'Create structure, even if it feels confining',
      dont: "Wait until you feel like settling",
      key: 'Landing is not trapping',
    },
    whatWorks: [
      {
        title: 'The 3-Meal Minimum',
        color: 'orange',
        items: [
          'Commit to three structured meals a day',
          'Not snacks. Not grazing. Real meals.',
          'You can still move between them, but meals are anchors',
        ],
      },
      {
        title: 'Movement That Moves',
        color: 'amber',
        items: [
          'You need exercise that feels like play',
          'Dance, sports, hiking, anything varied',
          'But commit to regular play, not just when inspired',
        ],
      },
      {
        title: 'The Stillness Practice',
        color: 'teal',
        items: [
          '5 minutes of sitting still daily',
          'No phone, no movement, no distraction',
          'Train your body that stillness is safe',
        ],
      },
      {
        title: 'Snack Awareness',
        color: 'cyan',
        items: [
          "You're prone to constant snacking",
          'If you\'re going to snack, plate it. Sit down. Notice it.',
          'No eating from bags while walking',
        ],
      },
      {
        title: 'The "One Thing" Rule',
        color: 'blue',
        items: [
          'At meals, do just one thing: eat',
          'No phone, no TV, no working',
          'Practice presence with food',
        ],
      },
    ],
    mantra: 'I can move AND land. Both are me.',
    eatingRituals: [
      {
        name: 'The 3-Meal Minimum',
        desc: 'Three structured meals daily. Snacks optional. Meals mandatory.',
      },
      {
        name: 'The Plating Rule',
        desc: "If you're going to snack, plate it. No eating from bags or containers.",
      },
      {
        name: 'The Stillness Practice',
        desc: 'One meal daily, eaten with no distractions. Just food and stillness.',
      },
      {
        name: 'The Solo Date',
        desc: 'Once weekly, make yourself a beautiful meal. Eat alone. Practice self-nourishment.',
      },
      {
        name: 'The Pause Before Seconds',
        desc: 'Wait 10 minutes before going back for more. Often the craving passes.',
      },
    ],
    mealName: 'Playful Breeze',
    mealBalanced:
      "A dinner with friends at a new restaurant. They order a protein-rich main (grilled fish, chicken, tofu), a colorful vegetable side, and something fun (shared appetizer, one glass of wine). They're present, laughing, but also noticing when they're full. They stop when satisfied, not stuffed. They go home feeling connected and nourished.",
    mealShadow:
      "Grazing all day—a latte here, a handful of chips there, someone's leftover fries. By dinner, not really hungry but eat anyway because it's social. Overeat because they're distracted. Go home feeling bloated and disconnected from what they actually ate.",
  },
  {
    id: 'air-earth',
    elementCombo: 'Air + Earth',
    name: 'The Gilded Zephyr',
    iconType: 'mountain',
    gradient: { from: '#00CED1', to: '#DAA520' },
    badgeColors: { bg: 'bg-amber-100', text: 'text-amber-800' },
    accentColor: 'amber',
    pattern:
      "Air + Earth gain weight through aesthetic obsession and perfectionism. They know how they want to look. They've tried every beauty standard. They swing between extreme discipline and giving up entirely. Their weight is tied to their self-worth. They can be very hard on themselves when they don't meet their own standards.",
    bodyWisdom: 'Your body is telling you: "I am beautiful enough already."',
    approach: {
      do: 'Separate worth from weight',
      dont: 'Make your body a project',
      key: 'You are already enough',
    },
    whatWorks: [
      {
        title: 'The Beauty Expansion',
        color: 'amber',
        items: [
          'Expand your definition of beauty',
          'Follow people of all sizes who radiate beauty',
          'Notice beauty in bodies unlike yours',
        ],
      },
      {
        title: 'Intuitive Eating',
        color: 'teal',
        items: [
          "You've tried every external rule",
          'Try listening to your body instead',
          "Eat what you want, when you're hungry, stop when full",
        ],
      },
      {
        title: 'Joyful Movement',
        color: 'cyan',
        items: [
          'Exercise as celebration, not punishment',
          'Dance, beautiful walks, anything that feels good',
          "If it feels like punishment, you won't sustain it",
        ],
      },
      {
        title: 'The Mirror Practice',
        color: 'yellow',
        items: [
          'Look in the mirror and say something kind',
          'Not about how you look—about who you are',
          'Separate your body from your worth',
        ],
      },
      {
        title: 'Self-Care as Beauty',
        color: 'orange',
        items: [
          'Skin care, soft fabrics, beautiful movement',
          'Treat your body as beautiful now, not when it changes',
          'Beauty is a way of treating yourself, not a result',
        ],
      },
    ],
    mantra: 'I am beautiful now. This body is my home, not my project.',
    eatingRituals: [
      {
        name: 'The Imperfect Meal',
        desc: 'Once weekly, eat something "imperfect" on purpose. A bent vegetable. A messy sandwich. Practice acceptance.',
      },
      {
        name: 'The Beauty Within',
        desc: 'Before eating, look at the food and say: "This is enough. I am enough."',
      },
      {
        name: 'The No-Photo Meal',
        desc: 'One meal weekly, not documented. Just eaten. Just enjoyed.',
      },
      {
        name: 'The Fear Food Practice',
        desc: 'The food they\'re most afraid of, eaten with presence, without guilt.',
      },
      {
        name: 'The Self-Compassion Check',
        desc: 'When shame arises, speak to self as beloved friend.',
      },
    ],
    mealName: 'Gilded Zephyr',
    mealBalanced:
      'A beautiful but simple dinner—perfectly roasted salmon, asparagus with lemon, wild rice. Plated with care (a few minutes, not an hour). Eaten slowly, with appreciation. No photo. No guilt. Just pleasure. They notice they\'re full halfway through and stop. They feel nourished, not performative.',
    mealShadow:
      'Spends two hours researching the "perfect" healthy recipe. Shops for special ingredients. Cooks meticulously. Takes 47 photos. Then eats while scrolling through the photos, not tasting the food. Feels empty afterward. Sneaks a secret snack later because the meal didn\'t actually satisfy.',
  },
  {
    id: 'air-water',
    elementCombo: 'Air + Water',
    name: 'The First Whisper',
    iconType: 'droplets',
    gradient: { from: '#00CED1', to: '#6B8BA4' },
    badgeColors: { bg: 'bg-sky-100', text: 'text-sky-800' },
    accentColor: 'sky',
    pattern:
      "Air+Water gain weight through hidden eating and shame. They often eat in secret. They're private about their struggles. They may not tell anyone they're trying to change. Their weight is wrapped in secrecy and sometimes shame. They need intimacy and safety to even talk about it.",
    bodyWisdom: 'Your body is telling you: "You don\'t have to hide from me."',
    approach: {
      do: 'Bring your struggles into the light',
      dont: 'Try to do this alone, in secret',
      key: 'Shame dies in the light',
    },
    whatWorks: [
      {
        title: 'Tell One Person',
        color: 'sky',
        items: [
          'Find one safe person to share your journey with',
          'Accountability partner, coach, trusted friend',
          'What\'s spoken loses its power over you',
        ],
      },
      {
        title: 'The Food Journal',
        color: 'blue',
        items: [
          'Write down what you eat—not for judgment, for awareness',
          'Include feelings, circumstances, context',
          'Notice patterns without shame',
        ],
      },
      {
        title: 'Gentle Accountability',
        color: 'cyan',
        items: [
          "Check-ins with someone who won't shame you",
          'Regular, kind, supportive',
          'You need to know someone sees you',
        ],
      },
      {
        title: 'Safe Movement',
        color: 'teal',
        items: [
          'Exercise that feels private and safe',
          'Not crowded gyms (too exposed)',
          'Home practice, private classes, early morning walks',
        ],
      },
      {
        title: 'The Self-Compassion Practice',
        color: 'indigo',
        items: [
          'When you notice shame, speak to yourself as you would a beloved friend',
          '"It\'s okay. You\'re learning. You\'re human."',
          'Shame blocks change; compassion enables it',
        ],
      },
    ],
    mantra: "I don't have to hide. I am safe in the light.",
    eatingRituals: [
      {
        name: 'The One Person',
        desc: 'Find one safe person. Tell them one thing. Just one. Start there.',
      },
      {
        name: 'The Food Journal',
        desc: 'Not for judgment. For awareness. Write what, when, how felt. No shame, just data.',
      },
      {
        name: 'The Small Light',
        desc: 'Eat one meal a week in daylight, with someone safe, or even alone but not hidden.',
      },
      {
        name: 'The Compassion Note',
        desc: 'When shame rises, write: "I am learning. I am human. I am safe."',
      },
      {
        name: 'The Safe Food List',
        desc: 'Foods that feel genuinely safe, not shameful. Eat those. Build trust.',
      },
    ],
    mealName: 'First Whisper',
    mealBalanced:
      'A meal eaten with one safe person. At a table. In daylight. They chose the food—something they actually wanted, not what they "should" eat. They talk about other things, but the food is there, visible, normal. No one judges. No one even comments. They eat until satisfied. They leave feeling... okay. Maybe even light.',
    mealShadow:
      "Alone, late at night, standing in kitchen. Eating quickly, almost not tasting. Hiding the wrapper at the bottom of the trash. Feeling shame even before finishing. Promising tomorrow will be different. Not sleeping well. Repeating.",
  },
];

