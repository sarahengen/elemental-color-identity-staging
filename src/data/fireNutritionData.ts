export interface NutritionSubtype {
  id: string;
  elementCombo: string;
  name: string;
  iconType: 'zap' | 'flame-blue' | 'hammer' | 'sparkle' | 'waves' | 'cloud' | 'droplets' | 'snowflake' | 'mountain' | 'leaf' | 'sprout';

  gradient: { from: string; to: string };
  badgeColors: { bg: string; text: string };
  accentColor: string;
  pattern: string;
  bodyWisdom: string;
  approach: {
    do: string;
    dont: string;
    key: string;
  };
  whatWorks: {
    title: string;
    color: string;
    items: string[];
  }[];
  mantra: string;
  eatingRituals: {
    name: string;
    desc: string;
  }[];
  mealName: string;
  mealBalanced: string;
  mealShadow: string;
}

export const fireNutritionSubtypes: NutritionSubtype[] = [
  {
    id: 'fire-fire',
    elementCombo: 'Fire + Fire',
    name: 'The Electric Arc',
    iconType: 'zap',
    gradient: { from: '#C41E3A', to: '#FF6B35' },
    badgeColors: { bg: 'bg-red-100', text: 'text-red-700' },
    accentColor: 'red',
    pattern:
      'Fire+Fire gain weight through inconsistency and chaos. They forget to eat, then binge. They start diets passionately, then abandon them. Their metabolism is erratic—spiking and crashing like their energy. Stress lives in their nervous system, and they often carry tension in their shoulders, jaw, and digestive system.',
    bodyWisdom: 'Your body is telling you: "I need rhythm, not fireworks."',
    approach: {
      do: 'Create simple, repeatable routines',
      dont: "Start another intense diet you'll abandon",
      key: 'Consistency > Intensity',
    },
    whatWorks: [
      {
        title: 'The 5-Meal Rhythm',
        color: 'red',
        items: [
          'Eat every 3-4 hours, whether you\'re "sparking" or not',
          'Small meals prevent the crashes that lead to bingeing',
          "Set alarms—your body doesn't remind you",
        ],
      },
      {
        title: 'Protein First',
        color: 'orange',
        items: [
          'Protein at every meal stabilizes your erratic energy',
          "Eggs, nuts, lean meats, protein shakes (easy when you're busy)",
          'Without protein, you crash and crave sugar',
        ],
      },
      {
        title: 'Movement That Sparks',
        color: 'amber',
        items: [
          'You need variety—same workout every day = death',
          'Rotate: HIIT, dance, rock climbing, anything that changes',
          'But commit to something daily, even if it changes',
        ],
      },
      {
        title: 'Nervous System Support',
        color: 'purple',
        items: [
          "Magnesium at night (you're probably deficient)",
          'Adaptogenic herbs (ashwagandha, rhodiola) for adrenal health',
          'Your stress is stored in your body—move it daily',
        ],
      },
      {
        title: 'The Kitchen Hack',
        color: 'emerald',
        items: [
          'Keep healthy food visible—you forget it exists otherwise',
          'Prepped veggies at eye level in fridge',
          'Protein bars in your bag, car, desk',
        ],
      },
    ],
    mantra: "I don't need another spark. I need a steady flame.",
    eatingRituals: [
      {
        name: 'The 10-minute rule',
        desc: 'Sit down for 10 minutes before eating. No phone. No sparking. Just food.',
      },
      {
        name: 'Visible food',
        desc: "Keep healthy options where you'll see them. Out of sight = out of mind for Electric Arc.",
      },
      {
        name: 'Eating with others',
        desc: 'Use your connection need to fuel nourishment. Eat with someone.',
      },
      {
        name: 'The pantry system',
        desc: 'Organize by "grab now" (healthy fast options) and "cook later" (projects).',
      },
    ],
    mealName: 'Electric Arc',
    mealBalanced:
      'A colorful grain bowl with quinoa, roasted vegetables (red pepper, carrot, beet), grilled chicken, fresh herbs, and a bright lemon-tahini dressing. Served with sparkling water and berries for dessert.',
    mealShadow:
      "Forgot to eat all day, now 9pm, eating cold pizza while standing, then can't sleep, then exhausted tomorrow.",
  },
  {
    id: 'fire-water',
    elementCombo: 'Fire + Water',
    name: 'The Blue Flame',
    iconType: 'flame-blue',
    gradient: { from: '#1E3A5F', to: '#6B8BA4' },
    badgeColors: { bg: 'bg-blue-100', text: 'text-blue-700' },
    accentColor: 'blue',
    pattern:
      'Fire+Water gain weight through perfectionism and rigidity. They\'ve tried every diet, every protocol, every "perfect" system. They know more about nutrition than anyone. But they swing between extreme control and complete collapse. When they can\'t be perfect, they often give up entirely. Their metabolism slows from chronic restriction.',
    bodyWisdom: 'Your body is telling you: "I need grace, not perfection."',
    approach: {
      do: 'Practice "good enough" consistently',
      dont: 'Wait for the perfect plan',
      key: 'Progress > Perfection',
    },
    whatWorks: [
      {
        title: 'The 80/20 Rule',
        color: 'blue',
        items: [
          '80% of the time, eat according to your knowledge',
          '20% of the time, eat without rules',
          'This prevents the "all or nothing" cycle',
        ],
      },
      {
        title: 'One Change at a Time',
        color: 'indigo',
        items: [
          'Your tendency: change everything at once, then crash',
          'Pick ONE habit. Master it for a month. Then add another.',
          'This honors your precision without overwhelming your system',
        ],
      },
      {
        title: 'Intuitive Eating Practice',
        color: 'violet',
        items: [
          'Once a week, eat without tracking, measuring, or judging',
          'Notice what your body actually wants, not what the plan says',
          'Reconnect pleasure to eating',
        ],
      },
      {
        title: 'Strength Training',
        color: 'teal',
        items: [
          'You need resistance work—it builds metabolic fire',
          'Perfect form matters to you (good), but done is better than perfect',
          'Progressive overload (slow, steady improvement) suits your nature',
        ],
      },
      {
        title: 'The Imperfect Meal',
        color: 'rose',
        items: [
          'Once a week, eat something "imperfect" on purpose',
          'A meal someone else cooked. A restaurant without nutrition info.',
          'Practice being okay with not knowing exact macros',
        ],
      },
    ],
    mantra: 'Good enough, consistently, is better than perfect occasionally.',

    eatingRituals: [
      {
        name: 'The imperfect meal',
        desc: 'Once a week, eat something "imperfect" on purpose. A bent vegetable. A slightly burned toast. Practice acceptance.',
      },
      {
        name: 'Eating with hands',
        desc: 'Reconnect to food as sensory experience, not just rules.',
      },
      {
        name: 'Cooking together',
        desc: 'Let someone else lead; practice receiving imperfectly prepared food.',
      },
      {
        name: 'The "no judgment" meal',
        desc: 'Eat with someone who explicitly does not comment on food choices.',
      },
    ],
    mealName: 'Blue Flame',
    mealBalanced:
      'A perfectly arranged plate: wild salmon grilled exactly 7 minutes, skin crisp; asparagus roasted with good olive oil and sea salt; quinoa fluffy and perfectly cooked; a small dish of perfect berries. Eaten slowly, with appreciation.',
    mealShadow:
      'Ate only a protein bar because "real food" wasn\'t available in the right way. Or, obsessed over the menu for an hour before ordering. Or, ate the "perfect" meal but felt nothing.',
  },
  {
    id: 'fire-earth',
    elementCombo: 'Fire + Earth',
    name: 'The Forge Fire',
    iconType: 'hammer',
    gradient: { from: '#8B4513', to: '#C41E3A' },
    badgeColors: { bg: 'bg-amber-100', text: 'text-amber-800' },
    accentColor: 'amber',
    pattern:
      'Fire+Earth gain weight through overwork and neglect. They prioritize productivity over self-care. They eat at desks, in cars, while working. They skip meals when busy, then eat whatever\'s fast late at night. Their body stores stress as belly fat. They see self-care as "unproductive" until their body forces them to stop.',
    bodyWisdom: 'Your body is telling you: "I am not a machine."',
    approach: {
      do: 'Schedule self-care like a work meeting',
      dont: "Wait until you're burned out to start",
      key: 'Rest is productive',
    },
    whatWorks: [
      {
        title: 'Meals as Non-Negotiable',
        color: 'amber',
        items: [
          'Schedule lunch in your calendar. Every day.',
          'No meetings during meals. No working while eating.',
          'Treat feeding yourself as importantly as any client',
        ],
      },
      {
        title: 'Batch Cooking Sunday',
        color: 'orange',
        items: [
          'Your love of efficiency works for you here',
          '2 hours on Sunday = meals for the week',
          'Prepped food means you eat well even when busy',
        ],
      },
      {
        title: 'Strength Training for Function',
        color: 'red',
        items: [
          'You need exercise that feels useful',
          'Heavy lifting, carrying, functional movement',
          'Not "exercise for its own sake" but "training to be stronger for life"',
        ],
      },
      {
        title: 'Sleep as Foundation',
        color: 'purple',
        items: [
          'You probably sacrifice sleep for work',
          'Sleep is when your body repairs and metabolizes',
          "7-8 hours is not lazy—it's strategic",
        ],
      },
      {
        title: 'The Walk Meeting',
        color: 'emerald',
        items: [
          'Take meetings on foot when possible',
          'Movement without "wasting time"',
          'Fresh air, steps, and productivity combined',
        ],
      },
    ],
    mantra: 'My body is not a tool. It is me.',
    eatingRituals: [
      {
        name: 'The sacred meal',
        desc: 'Once a day, eat with no screens, no work, no multitasking. Just food.',
      },
      {
        name: 'Batch cooking ritual',
        desc: 'Make cooking a productive pleasure, not just a task.',
      },
      {
        name: 'Eating with others',
        desc: 'Connection around food reminds them food is also relationship.',
      },
      {
        name: 'The slow food experiment',
        desc: 'Once a week, eat something that takes time to prepare and eat.',
      },
    ],
    mealName: 'Forge Fire',
    mealBalanced:
      'A hearty stew made Sunday, portioned for the week: grass-fed beef, root vegetables, beans, rich broth. Eaten at desk Monday (okay), but Wednesday eaten sitting down, actually tasting it, with a colleague.',
    mealShadow:
      "Coffee for breakfast, granola bar at 2pm, huge dinner at 9pm, can't sleep, exhausted tomorrow.",
  },
  {
    id: 'fire-air',
    elementCombo: 'Fire + Air',
    name: 'The Illuminating Spark',
    iconType: 'sparkle',
    gradient: { from: '#FF6B35', to: '#FFD700' },
    badgeColors: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    accentColor: 'yellow',
    pattern:
      "Fire+Air gain weight through inconsistent effort and emotional eating. They start diets with enthusiasm, then lose interest. They eat for comfort, for celebration, for connection—but not always for nourishment. Their weight fluctuates with their moods and their relationships. They often don't notice gradual gain until it's significant.",
    bodyWisdom: 'Your body is telling you: "I need depth, not just sparkle."',
    approach: {
      do: 'Make self-care a daily practice, not a project',
      dont: 'Wait for motivation to strike',
      key: 'Consistency over enthusiasm',
    },
    whatWorks: [
      {
        title: 'The 10-Minute Rule',
        color: 'yellow',
        items: [
          'When you want to quit a workout, do 10 more minutes',
          'When you want to binge, wait 10 minutes first',
          "The spark often returns if you don't extinguish it immediately",
        ],
      },
      {
        title: 'Buddy System',
        color: 'orange',
        items: [
          'You need connection to stay motivated',
          'Workout partner, accountability group, coach',
          "You'll show up for others even when you won't for yourself",
        ],
      },
      {
        title: 'Pleasure First',
        color: 'pink',
        items: [
          'Find movement you actually enjoy',
          "If you hate running, don't run. Dance. Hike. Play.",
          'Joyful movement is sustainable movement',
        ],
      },
      {
        title: 'The Completion Practice',
        color: 'amber',
        items: [
          "You're great at starting, not always at finishing",
          "Finish what you start, even if it's small",
          'Complete a 30-day challenge. All 30 days.',
        ],
      },
      {
        title: 'Emotional Awareness',
        color: 'rose',
        items: [
          "Notice when you're eating for feelings",
          'Pause and ask: "What do I really need right now?"',
          "Often it's connection, rest, or comfort—not food",
        ],
      },
    ],
    mantra: 'I finish what I start—including taking care of myself.',
    eatingRituals: [
      {
        name: 'The weekly meal adventure',
        desc: 'One new recipe per week. Planned. Executed. Celebrated.',
      },
      {
        name: 'Leftover transformation',
        desc: "Learn to make yesterday's food into today's new adventure.",
      },
      {
        name: 'Eating with a friend',
        desc: 'Accountability and connection around food.',
      },
      {
        name: 'The "enough" practice',
        desc: 'Notice when spark wanes and choose to stay anyway.',
      },
    ],
    mealName: 'Illuminating Spark',
    mealBalanced:
      'Monday: excitedly shops for Thai ingredients. Tuesday: makes amazing green curry, eats with delight. Wednesday: transforms leftover curry into quick noodle soup. Thursday: new inspiration—Mexican night.',
    mealShadow:
      'Monday: excited, buys ingredients. Tuesday: loses interest, orders pizza. Ingredients rot.',
  },
];
