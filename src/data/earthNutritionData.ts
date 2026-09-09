import type { NutritionSubtype } from './fireNutritionData';

export const earthNutritionSubtypes: NutritionSubtype[] = [
  {
    id: 'earth-fire',
    elementCombo: 'Earth + Fire',
    name: 'The Mountain Stone',
    iconType: 'mountain',
    gradient: { from: '#8B6914', to: '#C4722A' },
    badgeColors: { bg: 'bg-amber-100', text: 'text-amber-800' },
    accentColor: 'amber',
    pattern:
      "Earth+Fire gain weight through inertia and resistance to change. They've eaten the same way for decades. Change feels like erosion—threatening. Their weight creeps up slowly, over years, and they may not notice until it's significant. They resist \"diets\" as temporary and fussy. They value permanence, even in habits that don't serve them.",
    bodyWisdom: 'Your body is telling you: "Even mountains move—slowly."',
    approach: {
      do: 'Make one small, permanent change at a time',
      dont: 'Try to change everything at once',
      key: 'Slow and steady wins this race',
    },
    whatWorks: [
      {
        title: 'The One Change Rule',
        color: 'amber',
        items: [
          'Pick ONE thing. Change it forever.',
          'No end date. No "diet." Just a new permanent habit.',
          'When that\'s solid (6-8 weeks), add another.',
        ],
      },
      {
        title: 'Walk Daily',
        color: 'emerald',
        items: [
          'The most sustainable movement for you',
          'Same time, same route, every day',
          '20-30 minutes. No excuses. Like the sun rising.',
        ],
      },
      {
        title: "Reduce, Don't Eliminate",
        color: 'orange',
        items: [
          "You won't tolerate deprivation",
          'Eat what you always eat, but slightly less',
          'Smaller portions, one less treat per week',
        ],
      },
      {
        title: 'Strength Training',
        color: 'red',
        items: [
          'You need to feel stronger, not just lighter',
          'Lift heavy things. Feel your power increase.',
          'This motivates you to nourish that strength',
        ],
      },
      {
        title: 'The Long View',
        color: 'teal',
        items: [
          'This is not a 3-month project',
          'This is the rest of your life',
          'Choose changes you can keep forever',
        ],
      },
    ],
    mantra: "I don't need to become someone else. I need to become more myself.",
    eatingRituals: [
      {
        name: 'The weekly new thing',
        desc: 'One new food, prepared alongside familiar ones. No pressure to like.',
      },
      {
        name: 'Eating with others',
        desc: 'Regular shared meals, their food, their way, but with company.',
      },
      {
        name: 'The gratitude pause',
        desc: 'Before eating, a moment of thanks for the steadiness of this meal, this table, this life.',
      },
      {
        name: 'Cooking with someone',
        desc: 'Let another person into their kitchen, their routine.',
      },
    ],
    mealName: 'Mountain Stone',
    mealBalanced:
      'Sunday roast chicken (the same recipe for 20 years), potatoes, carrots, gravy. Eaten at 6pm sharp, at the same table, in the same chair. Reliable. Good. Enough.',
    mealShadow:
      'The same meal, eaten mechanically, alone, tasting nothing, just fuel. Resisting any suggestion of change, even when health suffers.',
  },
  {
    id: 'earth-earth',
    elementCombo: 'Earth + Earth',
    name: 'The Forest Floor',
    iconType: 'leaf',
    gradient: { from: '#2D5016', to: '#6B8E23' },
    badgeColors: { bg: 'bg-green-100', text: 'text-green-800' },
    accentColor: 'emerald',
    pattern:
      "Earth+Earth gain weight through self-neglect and giving too much. They nourish everyone else and forget themselves. They eat leftovers, scraps, whatever's easiest. They put themselves last. Their body stores the weight of everyone else's needs. They often don't feel entitled to take up space.",
    bodyWisdom: 'Your body is telling you: "You deserve to be nourished too."',
    approach: {
      do: 'Put yourself first, at least sometimes',
      dont: "Wait until everyone else is taken care of",
      key: "You can't pour from an empty cup",
    },
    whatWorks: [
      {
        title: 'Cook for Yourself First',
        color: 'emerald',
        items: [
          'Before cooking for others, make your plate',
          'Or cook extra, but serve yourself first',
          'Practice receiving before giving',
        ],
      },
      {
        title: 'The "Worthy" Meal',
        color: 'green',
        items: [
          'Once a day, eat something just for you',
          'Not leftovers, not scraps, not what no one else wanted',
          'Something you genuinely want and enjoy',
        ],
      },
      {
        title: 'Movement as Self-Care, Not Service',
        color: 'teal',
        items: [
          'Exercise for you, not to be smaller for others',
          'Walk alone, not pushing a stroller or waiting for someone',
          'This is your time',
        ],
      },
      {
        title: 'Boundary Work',
        color: 'amber',
        items: [
          'Your weight is connected to what you carry for others',
          'Practice saying no. Practice letting others feed you.',
          "Release the weight of others' expectations",
        ],
      },
      {
        title: 'The Compost Practice',
        color: 'orange',
        items: [
          "You're good at transforming waste into growth",
          'Apply this to your own patterns',
          'Old habits of self-neglect can compost into self-care',
        ],
      },
    ],
    mantra: 'I deserve to be nourished. I am not last.',
    eatingRituals: [
      {
        name: 'The perfect meal',
        desc: 'Once a week, something just for you, not rescued, not leftover, just for pleasure.',
      },
      {
        name: 'Receiving from others',
        desc: 'Let someone cook for you. Practice being nourished.',
      },
      {
        name: 'Celebrating abundance',
        desc: 'A feast, with no guilt, with gratitude.',
      },
      {
        name: 'The compost blessing',
        desc: 'A ritual for food scraps, honoring the cycle.',
      },
    ],
    mealName: 'Forest Floor',
    mealBalanced:
      "Sunday: roasts chicken. Makes stock from bones. Monday: soup from stock with leftover meat and sad vegetables from fridge. Tuesday: transforms soup into casserole. Nothing wasted. Everything honored. Nourished by the cycle.",
    mealShadow:
      'Eats only what others don\'t want, feels virtuous and empty, resists receiving anything "too good," slowly depletes.',
  },
  {
    id: 'earth-water',
    elementCombo: 'Earth + Water',
    name: 'The Velvet Moss',
    iconType: 'droplets',
    gradient: { from: '#2E7D32', to: '#5C9DC0' },
    badgeColors: { bg: 'bg-teal-100', text: 'text-teal-800' },
    accentColor: 'teal',
    pattern:
      'Earth + Water gain weight through comfort seeking and softness. They love soft, warm, comforting foods. They eat to feel safe, to soothe, to feel held. Their body reflects their desire for softness—and sometimes they use weight as a buffer against the world, as protection.',
    bodyWisdom: 'Your body is telling you: "You can be soft AND strong."',
    approach: {
      do: 'Find comfort in non-food places too',
      dont: "Try to become hard—you're not",
      key: 'Softness is not weakness',
    },
    whatWorks: [
      {
        title: 'The Comfort Menu',
        color: 'teal',
        items: [
          'Create a list of non-food comforts',
          'Weighted blanket, warm bath, soft sweater, gentle music',
          'When you want to eat for comfort, try these first',
        ],
      },
      {
        title: 'Softer Movement',
        color: 'green',
        items: [
          'Gentle yoga, stretching, walking',
          "Nothing aggressive—you'll hate it",
          'Movement that feels like self-care, not punishment',
        ],
      },
      {
        title: 'The Protection Question',
        color: 'blue',
        items: [
          'Ask yourself: "Is this weight protecting me from something?"',
          'Sometimes extra weight feels like armor',
          'If so, what else could protect you? (Boundaries, therapy, self-advocacy)',
        ],
      },
      {
        title: 'Warmth Without Calories',
        color: 'amber',
        items: [
          'You crave warmth as much as food',
          'Warm baths, heating pads, hot tea, cozy spaces',
          'Meet the need for warmth directly',
        ],
      },
      {
        title: 'Gentle Nutrition',
        color: 'emerald',
        items: [
          "Add nourishing foods, don't just remove comforting ones",
          'Make your comfort foods healthier (cauliflower in mac and cheese)',
          "Blend, don't eliminate",
        ],
      },
    ],
    mantra: 'I can be soft and safe without being soft in body.',
    eatingRituals: [
      {
        name: 'The gentle challenge',
        desc: 'Once a week, one new texture, one new flavor, no pressure.',
      },
      {
        name: 'Eating with others',
        desc: 'Share your soft foods, let others share theirs.',
      },
      {
        name: 'Cooking for someone',
        desc: 'Prepare a gentle meal for another. Practice nourishing.',
      },
      {
        name: 'The sensory meal',
        desc: 'Eat with full attention to texture, warmth, comfort. Let it be medicine.',
      },
    ],
    mealName: 'Velvet Moss',
    mealBalanced:
      'A bowl of creamy tomato soup, made with love, served with soft grilled cheese (crusts off if needed), eaten wrapped in a blanket by the fire. Comforting. Safe. Enough.',
    mealShadow:
      'Only mashed potatoes, every day, alone, disconnected, using food as the only comfort in an un-soft world.',
  },
  {
    id: 'earth-air',
    elementCombo: 'Earth + Air',
    name: 'The Golden Harvest',
    iconType: 'sprout',
    gradient: { from: '#8B6914', to: '#DAA520' },
    badgeColors: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    accentColor: 'amber',
    pattern:
      "Golden Harvests gain weight through abundance and giving. They cook for others, bake for others, provide for others. They're surrounded by food. They taste as they cook. They eat what's left. They struggle to receive, so they give through food—and then eat their own giving. Their weight reflects their generosity and their difficulty receiving.",
    bodyWisdom: 'Your body is telling you: "You can receive too."',
    approach: {
      do: 'Let others feed you sometimes',
      dont: 'Make yourself the exception to your own generosity',
      key: 'You deserve your own harvest',
    },
    whatWorks: [
      {
        title: 'The Receiving Practice',
        color: 'amber',
        items: [
          'Once a week, let someone else cook for you',
          "Restaurant, friend's house, anything where you're not in charge",
          'Practice receiving nourishment',
        ],
      },
      {
        title: 'Portion Before Serving',
        color: 'yellow',
        items: [
          'Plate your food before you sit down',
          'Not family style, not grazing while cooking',
          'Your portion, on your plate, eaten mindfully',
        ],
      },
      {
        title: "The Cook's Tally",
        color: 'orange',
        items: [
          'Notice how much you eat while cooking',
          'Those bites add up',
          'Chew gum, sip water, or intentionally wait until you sit',
        ],
      },
      {
        title: 'Abundance Mindset for Self',
        color: 'emerald',
        items: [
          'You believe in abundance for others',
          "Apply that to yourself: there's enough for you too",
          "You don't have to eat less—just eat with intention",
        ],
      },
      {
        title: 'Movement as Harvest',
        color: 'green',
        items: [
          "You're good at cyclical thinking",
          'Think of movement as preparing the field for future health',
          'Not punishment, but cultivation',
        ],
      },
    ],
    mantra: 'I am part of the abundance. I deserve my own harvest.',
    eatingRituals: [
      {
        name: 'The solo feast',
        desc: "Once a week, cook yourself a beautiful meal, as lovingly as you'd cook for others.",
      },
      {
        name: 'Receiving night',
        desc: 'Let someone else cook for you. Receive without helping.',
      },
      {
        name: 'The gratitude circle',
        desc: "Before a shared meal, each person says what they're grateful for.",
      },
      {
        name: 'The fallow meal',
        desc: 'Once a week, the simplest meal—honoring rest as part of the cycle.',
      },
    ],
    mealName: 'Golden Harvest',
    mealBalanced:
      "Sunday supper: roast chicken, mashed potatoes, gravy, roasted vegetables, salad, bread, pie. Friends around the table, laughter, seconds, leftovers sent home. Abundant. Generous. Love.",
    mealShadow:
      "Cooks all day, eats last, eats least, exhausted, wonders why no one cooks for them, too tired to enjoy the feast they made.",
  },
];

