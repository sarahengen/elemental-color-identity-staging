import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronDown, ChevronUp, Sparkles, Heart, Star, BookOpen, PenLine, Compass, Sun } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface ElementalLifePurposeProps {
  userElement: string | null;
  userSubtype: string | null;
  embedInGuideHub?: boolean;
}

interface SubtypePurpose {
  subtypeId: string;
  name: string;
  elementCombo: string;
  gift: string;
  spiritualPurpose: string;
  soulsAssignment: string;
  inOneSentence: string;
  journalPrompts: string[];
}

interface PurposeElement {
  id: string;
  name: string;
  principle: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  subtypes: SubtypePurpose[];
}

const fireSubtypes: SubtypePurpose[] = [
  {
    subtypeId: 'fire-fire',
    name: 'The Electric Arc',
    elementCombo: 'Fire + Fire',
    gift: 'You see connections where others see only gaps. You spark insight, bridge worlds, illuminate what was hidden. Your presence makes things make sense.',
    spiritualPurpose: `You are here to be a bridge.
Not just between ideas—between people. Between worlds. Between what was and what could be. Your soul came to heal the illusion of separation. Every time you show someone how their story connects to another's, how their pain links to someone else's healing, how their isolated moment is part of a larger pattern—you are doing your soul's work.

Your purpose is to reveal the invisible web.

But you must also learn to stay on the bridge. To not cross and disappear. To be present for the connections you create.`,
    soulsAssignment: '"I am here to connect what has been separated—and to remain present for what I have joined."',
    inOneSentence: 'You came to show the world that nothing is truly separate—and to learn that connection requires presence, not just initiation.',
    journalPrompts: [
      'When was the last time you connected two people or ideas—and then stepped back before seeing what grew from it? What would it look like to stay?',
      'Where in your life do you feel most like a bridge? Is that role nourishing you, or are you being walked across?',
      'Write about a time you saw a connection no one else noticed. How did it feel to hold that insight? Did you share it?',
      'What relationships in your life have you sparked into being but never fully inhabited? What would it mean to show up for them now?',
      'If your purpose is to reveal the invisible web, what thread in your own life have you been ignoring?',
    ],
  },
  {
    subtypeId: 'fire-water',
    name: 'The Blue Flame',
    elementCombo: 'Fire + Water',
    gift: 'You see clearly. You cut through noise, illusion, pretense. Your discernment is a gift to those lost in confusion. You know what matters.',
    spiritualPurpose: `You are here to be a lens.

Not to burn, but to focus. Not to destroy, but to clarify. Your soul came to help others see what is essential—to cut through the noise of modern life, the clutter of old stories, the fog of collective confusion.

Your purpose is to reveal what is real.

But you must also learn that reality includes imperfection. That the cracked vase still holds water. That the flawed human still carries light. Your clarity must warm, not wound.`,
    soulsAssignment: '"I am here to reveal what is essential—and to love what is imperfect."',
    inOneSentence: 'You came to help others see clearly—and to learn that clarity without compassion is just another form of blindness.',
    journalPrompts: [
      'Think of a time your clarity hurt someone. What would it have looked like to offer that same truth wrapped in warmth?',
      'Where in your life are you demanding perfection—of yourself or others—when what is needed is acceptance?',
      'Write about something broken in your life that still holds beauty. What does it teach you about imperfection?',
      'When you cut through someone\'s illusion, do you stay to help them rebuild? Or do you move on to the next fog?',
      'What is one truth about yourself that you have been too clear-eyed to face with compassion?',
    ],
  },
  {
    subtypeId: 'fire-earth',
    name: 'The Forge Fire',
    elementCombo: 'Fire + Earth',
    gift: 'You make things that last. You build, shape, transform. Your hands and heart know how to turn raw material into something useful and beautiful.',
    spiritualPurpose: `You are here to be a creator.

Not just of objects—of systems, of communities, of possibilities. Your soul came to build what the world needs. To take raw materials—ideas, people, resources, challenges—and forge them into something that serves.

Your purpose is to manifest what wants to exist.

But you must also learn that you are not your creations. That the forge must cool. That the maker needs making too.`,
    soulsAssignment: '"I am here to build what serves—and to remember that I am not what I build."',
    inOneSentence: 'You came to manifest what the world needs—and to learn that your worth is not in your output but in your being.',
    journalPrompts: [
      'What are you building right now that the world truly needs? And what are you building just to prove your worth?',
      'When was the last time you rested without guilt? What does it feel like to be the maker who is not making?',
      'Write about something you created that failed. What did that failure teach you about who you are beyond your work?',
      'If everything you\'ve ever built disappeared tomorrow, who would you be? Sit with that question before answering.',
      'Where in your life is the forge too hot? What would it look like to let it cool without feeling like you\'re dying?',
    ],
  },
  {
    subtypeId: 'fire-air',
    name: 'The Illuminating Spark',
    elementCombo: 'Fire + Air',
    gift: 'You see potential everywhere. You ignite possibility in others. Your enthusiasm is contagious. You help people believe they can begin.',
    spiritualPurpose: `You are here to be an igniter.

Your soul came to start things. To plant seeds. To say "yes" when everyone else says "wait." To remind the world that every oak was once an acorn, every cathedral a single stone, every revolution a whispered thought.

Your purpose is to call forth what is waiting to be born.

But you must also learn to tend. To stay through the hard middle. To watch your sparks become flames become embers become ash become soil for the next beginning.`,
    soulsAssignment: '"I am here to call forth what is waiting—and to stay long enough to see it grow."',
    inOneSentence: 'You came to remind the world that everything begins somewhere—and to learn that beginnings are only sacred when they lead somewhere.',
    journalPrompts: [
      'How many things have you started and not finished? Pick one. What would it mean to return to it now?',
      'Write about someone whose potential you saw before they did. Did you stay to watch them grow, or did you move on to the next spark?',
      'What is the "hard middle" you are avoiding right now? What scares you about staying?',
      'If your gift is igniting others, who ignites you? Are you letting anyone tend your flame?',
      'Describe a beginning that became something lasting. What was different about that time? What made you stay?',
    ],
  },
];

const waterSubtypes: SubtypePurpose[] = [
  {
    subtypeId: 'water-air',
    name: 'The Misty Shore',
    elementCombo: 'Water + Air',
    gift: 'You hold space for what is unclear. You sit with ambiguity when others demand certainty. Your presence softens hard truths and makes them bearable.',
    spiritualPurpose: `You are here to be a threshold.

Your soul came to stand at the edges—between life and death, between knowing and not-knowing, between what is said and what is unspeakable. You are the one who helps others cross.

Your purpose is to soften the hard passages.

Birth, death, grief, transformation—these are your territory. You hold the fog so others don't have to face the sharp light alone.

But you must also learn to step into clarity. To be seen. To have edges. To say "this is where I end and you begin."`,
    soulsAssignment: '"I am here to soften the hard passages—and to learn that I, too, deserve to be seen."',
    inOneSentence: 'You came to help others through life\'s thresholds—and to learn that you must also cross your own.',
    journalPrompts: [
      'What threshold in your own life have you been helping others cross while refusing to cross yourself?',
      'Where do you hide in the fog? What would it feel like to step into sharp, clear light—even for a moment?',
      'Write about a time you held space for someone\'s grief or confusion. Did anyone hold space for yours?',
      'What boundary do you need to draw that you\'ve been softening instead? What are you afraid will happen if you become clear?',
      'If you stopped being the mist for everyone else, who would you be in the sunlight?',
    ],
  },
  {
    subtypeId: 'water-water',
    name: 'The Forest Lake',
    elementCombo: 'Water + Water',
    gift: 'You hold depth. You reflect truth. Your stillness gives others permission to be still too. You see what is real because you do not rush.',
    spiritualPurpose: `You are here to be a mirror.

Your soul came to show others who they really are—not who they pretend to be, not who they fear they are, but their true face, reflected in your still waters.

Your purpose is to reveal the truth through presence.

You don't need to speak much. You don't need to fix. You just need to be there, still and deep, reflecting back what others cannot see alone.

But you must also learn to move. To flow. To let the waters turn over so they don't stagnate. Your depth needs circulation.`,
    soulsAssignment: '"I am here to reflect truth through stillness—and to learn that even still waters must flow."',
    inOneSentence: 'You came to show others who they really are—and to learn that you must also see yourself.',
    journalPrompts: [
      'When was the last time you looked into your own depths instead of reflecting someone else\'s? What did you see?',
      'Where in your life have your waters grown stagnant? What would it take to let them flow again?',
      'Write about a truth you reflected for someone else that you have not yet faced in yourself.',
      'Do you ever use your stillness as a hiding place? What would it look like to move—even if the waters get muddy?',
      'If you are a mirror, what happens when no one is looking into you? Who are you when you are not reflecting?',
    ],
  },
  {
    subtypeId: 'water-fire',
    name: 'The Sun-Dappled Pond',
    elementCombo: 'Water + Fire',
    gift: 'You find joy everywhere. You scatter light. Your presence makes heavy things lighter. You remind the world that delight is allowed.',
    spiritualPurpose: `You are here to be a light-scatterer.

Your soul came to remind the world that beauty exists in small things—in dappled light, in shared laughter, in the sparkle of ordinary moments. You are the antidote to despair.

Your purpose is to bring joy where it has been forgotten.

But you must also learn to dive. To feel the depth beneath the sparkle. Your joy will become wisdom when it has known sorrow.`,
    soulsAssignment: '"I am here to scatter light in dark places—and to learn that true joy holds the whole of life."',
    inOneSentence: 'You came to remind the world of delight—and to learn that joy is deepest when it has known sorrow.',
    journalPrompts: [
      'Is your joy sometimes a way of avoiding depth? Write about a sorrow you have been sparkling over instead of feeling.',
      'When was the last time you let yourself be sad without trying to lighten the mood? What happened?',
      'Write about a moment of genuine, deep joy—not performance, not distraction, but real delight. What made it different?',
      'Who in your life needs your light right now? And who needs you to sit with them in the dark instead?',
      'If your sparkle disappeared for a day, what would be left? Are you at peace with what lies beneath the surface?',
    ],
  },
  {
    subtypeId: 'water-earth',
    name: 'The Languid River',
    elementCombo: 'Water + Earth',
    gift: 'You carry stories. You make meaning. You help others understand their lives as narrative, as journey, as something that matters.',
    spiritualPurpose: `You are here to be a storyteller.

Your soul came to carry what matters forward—the memories, the wisdom, the pain, the love. You are the one who remembers when everyone else has forgotten.

Your purpose is to weave meaning from experience.

But you must also learn to release. To let some stories end. To let the water carry away what no longer serves. To be present in this moment, not just in the narrative.`,
    soulsAssignment: '"I am here to carry what matters—and to learn that I am more than the stories I carry."',
    inOneSentence: 'You came to help others find meaning in their stories—and to learn that you are the storyteller, not the story.',
    journalPrompts: [
      'What story about yourself have you been carrying that no longer serves you? What would it feel like to set it down?',
      'Write about a memory you hold for someone else. Why is it yours to carry? Is it still?',
      'Where in your life are you living in narrative instead of in the present moment? What are you avoiding by staying in the story?',
      'If you could release one old story and replace it with a new one, what would you let go? What would you begin?',
      'Who are you when you are not making meaning? Can you sit in a meaningless moment and still feel whole?',
    ],
  },
];

const earthSubtypes: SubtypePurpose[] = [
  {
    subtypeId: 'earth-fire',
    name: 'The Mountain Stone',
    elementCombo: 'Earth + Fire',
    gift: 'You endure. You witness. Your presence gives others something solid to build against. You remember what others forget.',
    spiritualPurpose: `You are here to be a witness.

Your soul came to hold memory for the world. To remember what was, so that what is can be understood. To provide perspective in a frantic age.

Your purpose is to offer stability without rigidity.

But you must also learn to shift. To let the wind and water wear you into new shapes. To allow yourself to be changed by time.`,
    soulsAssignment: '"I am here to witness and endure—and to learn that true strength includes yielding."',
    inOneSentence: 'You came to be a foundation for others—and to learn that even foundations must shift with the earth.',
    journalPrompts: [
      'What are you holding onto that time is asking you to release? Where has your endurance become rigidity?',
      'Write about a moment when you witnessed something no one else noticed. What did it cost you to hold that memory?',
      'Where in your life are you being a foundation for others at the expense of your own growth? What would yielding look like?',
      'If strength includes softening, what is one place in your life where you could let yourself be shaped by change?',
      'What memory are you carrying for the world that the world has forgotten? Does it still need to be held?',
    ],
  },
  {
    subtypeId: 'earth-earth',
    name: 'The Forest Floor',
    elementCombo: 'Earth + Earth',
    gift: 'You transform death into life. You see value in what others discard. Your presence makes decay holy.',
    spiritualPurpose: `You are here to be a transformer.

Your soul came to show that nothing is wasted. That endings are beginnings. That death feeds life. You are the one who finds treasure in trash, meaning in loss, growth in grief.

Your purpose is to heal through transformation.

But you must also learn to receive. To let yourself be nourished. To stand in sunlight, not just shadow.`,
    soulsAssignment: '"I am here to transform what seems dead—and to learn that I also deserve to live."',
    inOneSentence: 'You came to show that nothing is wasted—and to learn that you are not waste.',
    journalPrompts: [
      'What in your life feels like it is dying or decaying right now? Can you see the seed of something new within it?',
      'Where have you been standing in shadow when sunlight was available? What keeps you in the dark?',
      'Write about something you once considered a loss that later became a gift. What did the transformation teach you?',
      'Do you find it easier to nourish others than to receive nourishment yourself? Why? What are you afraid of?',
      'If nothing is truly wasted, what part of your own story have you been treating as waste? How might you reclaim it?',
    ],
  },
  {
    subtypeId: 'earth-water',
    name: 'The Velvet Moss',
    elementCombo: 'Earth + Water',
    gift: 'You soften what is hard. You make spaces habitable. Your gentleness gives others permission to be gentle too.',
    spiritualPurpose: `You are here to be a softener.

Your soul came to make the world more gentle. To cover sharp edges with kindness. To show that strength can be soft.

Your purpose is to heal through gentleness.

But you must also learn to stand alone. To grow on your own stone. To be soft without clinging.`,
    soulsAssignment: '"I am here to soften what is hard—and to learn that I can be soft AND strong."',
    inOneSentence: 'You came to make the world gentler—and to learn that true gentleness includes boundaries.',
    journalPrompts: [
      'Where in your life are you softening someone else\'s edges at the cost of your own boundaries?',
      'Write about a time your gentleness was mistaken for weakness. How did it feel? How did you respond?',
      'What does it mean to you to be soft AND strong? Where do those two qualities meet in your daily life?',
      'Are you clinging to someone or something because letting go feels too hard? What would growing on your own stone look like?',
      'Describe a boundary you need to set that feels ungentile. How can you hold that boundary with softness?',
    ],
  },
  {
    subtypeId: 'earth-air',
    name: 'The Golden Harvest',
    elementCombo: 'Earth + Air',
    gift: 'You create abundance. You offer generously. Your presence makes others feel provided for, celebrated, fed.',
    spiritualPurpose: `You are here to be a giver.

Your soul came to show that there is enough—enough love, enough food, enough time, enough for everyone. You are the one who makes abundance visible.

Your purpose is to manifest generosity.

But you must also learn to receive. To let others give to you. To rest in the fallow season. To know that you are part of the abundance, not just its distributor.`,
    soulsAssignment: '"I am here to give abundantly—and to learn that I am worthy of receiving."',
    inOneSentence: 'You came to show that there is enough—and to learn that you are included in enough.',
    journalPrompts: [
      'When was the last time you truly received something—a gift, a compliment, help—without deflecting or minimizing it?',
      'Where in your life are you giving from an empty well? What would a fallow season look like for you?',
      'Write about your relationship with "enough." Do you believe there is enough for you, or only enough for others?',
      'If you stopped giving for one week, what are you afraid would happen? What does that fear tell you about your identity?',
      'Describe a moment when someone gave to you and it felt uncomfortable. Why? What would it take to let yourself be fed?',
    ],
  },
];

const airSubtypes: SubtypePurpose[] = [
  {
    subtypeId: 'air-air',
    name: 'The Clear Morning Sky',
    elementCombo: 'Air + Air',
    gift: 'You make space. Your presence allows others to breathe, to think, to be. You don\'t crowd or demand.',
    spiritualPurpose: `You are here to be a space-holder.

Your soul came to remind the world that emptiness is not absence—it is possibility. That the space between notes makes music. That the silence between words holds meaning.

Your purpose is to create room for what matters.

But you must also learn to inhabit. To take up space. To be present, not just permissive.`,
    soulsAssignment: '"I am here to hold space for what matters—and to learn that I also deserve to fill it."',
    inOneSentence: 'You came to remind the world of the sacredness of space—and to learn that you, too, are allowed to take up room.',
    journalPrompts: [
      'Where in your life are you holding space for others but not for yourself? What would it look like to fill that space with your own presence?',
      'Write about a time you made yourself small so someone else could be big. Was that a gift—or a disappearance?',
      'What does "taking up room" feel like in your body? Do you resist it? Why?',
      'If emptiness is possibility, what possibility are you holding open right now that you\'re afraid to fill?',
      'Describe what it would feel like to walk into a room and claim your space without apology. What stops you?',
    ],
  },
  {
    subtypeId: 'air-fire',
    name: 'The Playful Breeze',
    elementCombo: 'Air + Fire',
    gift: 'You bring movement. Your presence animates, lightens, refreshes. You remind the world it can dance.',
    spiritualPurpose: `You are here to be a mover.

Your soul came to shake things loose—to stir stagnation, to lift heaviness, to remind the world that life is meant to move.

Your purpose is to bring joy through movement.

But you must also learn to land. To rest. To be still without dying. Your movement needs anchors.`,
    soulsAssignment: '"I am here to stir what has grown still—and to learn that landing is not trapping."',
    inOneSentence: 'You came to remind the world to move—and to learn that true movement includes rest.',
    journalPrompts: [
      'When was the last time you were truly still—not restless, not planning your next move, but genuinely at rest? What came up?',
      'What are you running from when you keep moving? Name it, even if it scares you.',
      'Write about a time stillness felt like death to you. What would it mean to redefine rest as a form of movement?',
      'Where in your life do you need an anchor right now? What or who could ground you without trapping you?',
      'If you stopped dancing for a day, who would you be? Are you at peace with that person?',
    ],
  },
  {
    subtypeId: 'air-earth',
    name: 'The Gilded Zephyr',
    elementCombo: 'Air + Earth',
    gift: 'You see beauty. Your presence elevates the ordinary. You help others notice what they\'ve stopped seeing.',
    spiritualPurpose: `You are here to be a beautifier.

Your soul came to remind the world that life is meant to be beautiful—not decorative, but attended to. That attention itself is a form of love.

Your purpose is to reveal the sacred in the ordinary.

But you must also learn to see beauty in imperfection. In age. In decay. In the perfectly ordinary.`,
    soulsAssignment: '"I am here to reveal beauty in all things—and to learn that I am beautiful too, even imperfect."',
    inOneSentence: 'You came to remind the world of beauty—and to learn that true beauty includes the broken.',
    journalPrompts: [
      'Where in your life are you chasing perfection when what is needed is presence? What would it look like to attend to what is already here?',
      'Write about something imperfect that you find deeply beautiful. What does it teach you about your own imperfections?',
      'Do you use beauty as a shield—making things lovely so you don\'t have to feel what is ugly? What are you decorating over?',
      'Describe an ordinary moment from today that held something sacred. What did you almost miss?',
      'If you are beautiful even when imperfect, what imperfection are you most afraid to let others see? Why?',
    ],
  },
  {
    subtypeId: 'air-water',
    name: 'The First Whisper',
    elementCombo: 'Air + Water',
    gift: 'You speak what is too tender for shouting. Your presence invites truth. People tell you things they tell no one else.',
    spiritualPurpose: `You are here to be a truth-teller.

Your soul came to speak what cannot be shouted—the secrets, the shame, the sacred, the unspeakable. You are the one who makes intimacy possible.

Your purpose is to hold space for the unspoken.

But you must also learn to speak. To let your whisper become voice. To trust that the world needs to hear you.`,
    soulsAssignment: '"I am here to hold what is unspoken—and to learn that my voice, too, deserves to be heard."',
    inOneSentence: 'You came to make intimacy possible—and to learn that you also deserve to be truly known.',
    journalPrompts: [
      'What truth are you holding for someone else that you have never spoken aloud for yourself?',
      'Write about a time someone trusted you with a secret. How did it feel to hold it? Did it cost you something?',
      'Where in your life is your whisper asking to become a voice? What would you say if you knew you would be heard?',
      'Do you make intimacy possible for others while keeping yourself hidden? What would it feel like to be truly known?',
      'If your voice deserves to be heard, what is the one thing you most need to say right now—and to whom?',
    ],
  },
];

const purposeElements: PurposeElement[] = [
  {
    id: 'fire',
    name: 'Fire',
    principle: 'The Bridge-Builders & Igniters',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    subtypes: fireSubtypes,
  },
  {
    id: 'water',
    name: 'Water',
    principle: 'The Thresholds & Mirror-Holders',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    subtypes: waterSubtypes,
  },
  {
    id: 'air',
    name: 'Air',
    principle: 'The Space-Holders & Truth-Tellers',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    subtypes: airSubtypes,
  },
  {
    id: 'earth',
    name: 'Earth',
    principle: 'The Witnesses & Transformers',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    subtypes: earthSubtypes,
  },
];

/* ── Journal Prompts (collapsible) ── */
const JournalPromptsSection: React.FC<{ prompts: string[]; gradientFrom: string; gradientTo: string }> = ({
  prompts,
  gradientFrom,
  gradientTo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h5 className="text-sm font-bold text-gray-800">Journal Prompts</h5>
            <p className="text-xs text-gray-500">{prompts.length} reflective writing prompts</p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="p-5 bg-white space-y-4">
          <p className="text-xs text-gray-500 italic leading-relaxed">
            Find a quiet moment. Choose one prompt that speaks to you. Write without editing, without judgment—let the words come as they will.
          </p>
          <div className="space-y-3">
            {prompts.map((prompt, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-sm"
                style={{ background: `linear-gradient(135deg, ${gradientFrom}08, ${gradientTo}08)` }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                  >
                    <PenLine className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ElementalLifePurpose: React.FC<ElementalLifePurposeProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(userSubtype || null);

  const toggleElement = (elementId: string) => {
    setExpandedElements((prev) =>
      prev.includes(elementId) ? prev.filter((id) => id !== elementId) : [...prev, elementId]
    );
  };

  const isUserElement = (elementId: string) => userElement === elementId;
  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Elemental Life Purpose</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Why you are here — the soul's assignment for each elemental subtype.
          </p>
          <p className="text-gray-500 mt-4">
            Your spiritual purpose is what your soul came here to <em>learn</em>, to <em>embody</em>, and to <em>offer</em>.
            Your element is not accidental. Your subtype is not random.
          </p>
        </div>
      )}

      {/* Elements Accordion */}
      <div className="space-y-6">
        {purposeElements.map((element) => (
          <div
            key={element.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.id)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.id)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  }}
                >
                  {element.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-serif text-gray-900">{element.name}</h3>
                    {isUserElement(element.id) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>Your Element</span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.principle}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.id) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Subtypes Content */}
            {expandedElements.includes(element.id) && (
              <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => {
                    const isExpanded = selectedSubtype === subtype.subtypeId;

                    return (
                      <div
                        key={subtype.subtypeId}
                        className={`rounded-xl transition-all duration-300 ${
                          isExpanded ? 'md:col-span-2' : ''
                        } ${
                          isUserSubtype(subtype.subtypeId)
                            ? GUIDE_USER_SUBTYPE_CARD_CLASS
                            : isExpanded
                            ? 'bg-white border-2 border-gray-300 shadow-md'
                            : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Subtype Header (always visible) */}
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() =>
                            setSelectedSubtype(isExpanded ? null : subtype.subtypeId)
                          }
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                              {/* Element Combination Label */}
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className="text-sm font-semibold px-2.5 py-1 rounded-md"
                                  style={{
                                    background: `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`,
                                    color: element.gradientFrom,
                                  }}
                                >
                                  {subtype.elementCombo}
                                </span>
                                {isUserSubtype(subtype.subtypeId) && (
                                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                )}
                              </div>

                              {/* Subtype Name */}
                              <h4 className="text-xl font-serif text-gray-900 mb-2">{subtype.name}</h4>

                              {/* Gift Badge */}
                              <div
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{
                                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                                }}
                              >
                                <Compass className="w-3.5 h-3.5" />
                                Soul's Purpose
                              </div>
                            </div>
                            <div className="flex-shrink-0 ml-2 mt-1">
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>

                          {/* Gift (always visible) */}
                          <p className="text-gray-700 leading-relaxed">{subtype.gift}</p>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="px-6 pb-6 space-y-5">
                            {/* Spiritual Purpose */}
                            <div
                              className="rounded-xl p-5"
                              style={{
                                background: `linear-gradient(135deg, ${element.gradientFrom}06, ${element.gradientTo}06)`,
                              }}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                  style={{
                                    background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                                  }}
                                >
                                  <Star className="w-4 h-4" />
                                </div>
                                <h5 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                                  The Spiritual Purpose
                                </h5>
                              </div>
                              <div
                                className="text-gray-700 leading-relaxed whitespace-pre-line text-sm pl-4 border-l-2"
                                style={{ borderColor: element.gradientFrom }}
                              >
                                {subtype.spiritualPurpose}
                              </div>
                            </div>

                            {/* Soul's Assignment */}
                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                style={{
                                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                                }}
                              >
                                <Heart className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                                  Your Soul's Assignment
                                </span>
                                <p className="text-amber-900 font-serif italic leading-relaxed mt-1">
                                  {subtype.soulsAssignment}
                                </p>
                              </div>
                            </div>

                            {/* In One Sentence */}
                            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                style={{
                                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                                }}
                              >
                                <Sun className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                                  In One Sentence
                                </span>
                                <p className="text-emerald-900 font-medium leading-relaxed mt-1">
                                  {subtype.inOneSentence}
                                </p>
                              </div>
                            </div>

                            {/* Journal Prompts */}
                            <JournalPromptsSection
                              prompts={subtype.journalPrompts}
                              gradientFrom={element.gradientFrom}
                              gradientTo={element.gradientTo}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-2xl border border-violet-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Your Purpose Is a Direction</h4>
            <p className="text-gray-600 leading-relaxed">
              Your purpose is not a destination. It is a direction. Your element is not accidental, and your subtype is not random.
              By understanding the soul's assignment written into your elemental nature, you can align your daily choices, relationships,
              and creative expressions with what you came here to learn, embody, and offer. Remember: every element contains all others
              within it—your dominant essence simply indicates where your gifts flow most naturally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalLifePurpose;
