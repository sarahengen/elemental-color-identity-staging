/**
 * Roots Assessment question bank.
 * Each question maps to one of the four elements and helps users
 * discover their elemental grounding style.
 */

export interface RootsQuestion {
  id: string;
  text: string;
  element: 'fire' | 'water' | 'earth' | 'air';
  options: { label: string; value: number }[];
}

export const rootsAssessmentQuestions: RootsQuestion[] = [
  {
    id: 'r1',
    text: 'When facing a challenge, I prefer to act quickly and decisively.',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r2',
    text: 'I feel most recharged after spending time near water or in quiet reflection.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r3',
    text: 'Routine and consistency are essential to my sense of well-being.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r4',
    text: 'I thrive on new ideas, variety, and intellectual stimulation.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r5',
    text: 'I am drawn to leadership roles and enjoy inspiring others.',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r6',
    text: 'I often sense the emotions of those around me before they speak.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r7',
    text: 'I find deep satisfaction in building or creating something tangible.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r8',
    text: 'I love exploring abstract concepts and seeing connections others miss.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r9',
    text: 'When others are uncertain, I naturally step into the lead role.',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r10',
    text: 'If I feel stuck, I push forward quickly rather than waiting for the “right moment.”',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r11',
    text: 'I’m energized by bold choices and visible progress.',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r12',
    text: 'My passion feels like a compass for what’s true for me.',
    element: 'fire',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r13',
    text: 'I notice emotional shifts before people say anything directly.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r14',
    text: 'I feel safest when emotions can be processed openly and honestly.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r15',
    text: 'I recharge through stillness, rain, and gentle reflections.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r16',
    text: 'Symbols, stories, and dreams carry meaningful guidance for me.',
    element: 'water',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r17',
    text: 'Small routines create a sense of stability I can rely on.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r18',
    text: 'I gain satisfaction from practical problem-solving and tangible results.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r19',
    text: 'I feel called to build responsibly for the long term.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r20',
    text: 'My body’s feedback helps me adjust steadily over time.',
    element: 'earth',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r21',
    text: 'I love asking “why” and “how” until the underlying pattern appears.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r22',
    text: 'I communicate best when I can explain ideas with precision.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r23',
    text: 'In conflict, I can step back and see the situation from a higher perspective.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
  {
    id: 'r24',
    text: 'I learn quickly through connections, comparisons, and new viewpoints.',
    element: 'air',
    options: [
      { label: 'Strongly disagree', value: 1 },
      { label: 'Disagree', value: 2 },
      { label: 'Neutral', value: 3 },
      { label: 'Agree', value: 4 },
      { label: 'Strongly agree', value: 5 },
    ],
  },
];
