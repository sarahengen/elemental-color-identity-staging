import React, { useState, useMemo } from 'react';
import { 
  Swords, Wind, Shield, Heart, ChevronRight, ChevronLeft, RotateCcw, 
  Target, TrendingUp, AlertCircle, Sparkles, CheckCircle2, Circle,
  Flame, Droplets, Mountain, ArrowRight, BookOpen, Zap, Brain
} from 'lucide-react';
import { conflictData, ConflictSubtype } from '@/data/conflictData';

type ConflictResponse = 'fight' | 'flight' | 'freeze' | 'fawn';

interface QuizQuestion {
  id: number;
  scenario: string;
  context: string;
  options: {
    response: ConflictResponse;
    text: string;
  }[];
}

interface ConflictStyleQuizProps {
  userElement?: string | null;
  userSubtype?: string | null;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: 'Your partner raises their voice during a disagreement about finances.',
    context: 'You\'ve been discussing the monthly budget and they suddenly become visibly frustrated.',
    options: [
      { response: 'fight', text: 'Match their energy and raise your voice too — you refuse to be talked over and want to address this head-on right now.' },
      { response: 'flight', text: 'Suggest taking a break and revisiting the conversation later when emotions have cooled down.' },
      { response: 'freeze', text: 'Go quiet and still, processing internally what just happened while trying to understand the full picture.' },
      { response: 'fawn', text: 'Immediately soften your tone and agree with some of their points to reduce the tension in the room.' }
    ]
  },
  {
    id: 2,
    scenario: 'A colleague takes credit for your idea in a team meeting.',
    context: 'You spent weeks developing a proposal, and your coworker presents it as their own in front of leadership.',
    options: [
      { response: 'fight', text: 'Speak up immediately in the meeting: "Actually, I\'d like to add context — I developed that proposal and can walk through the details."' },
      { response: 'flight', text: 'Say nothing in the meeting but start updating your resume — this workplace clearly doesn\'t value your contributions.' },
      { response: 'freeze', text: 'Sit in stunned silence, replaying what just happened, unable to formulate a response in the moment.' },
      { response: 'fawn', text: 'Compliment their presentation publicly while planning to have a gentle, private conversation later.' }
    ]
  },
  {
    id: 3,
    scenario: 'Your friend cancels plans with you for the third time this month.',
    context: 'Each time they\'ve had a different excuse, and you\'re starting to feel like a low priority.',
    options: [
      { response: 'fight', text: 'Call them out directly: "This is the third time. I need you to be honest — is something going on, or am I not a priority?"' },
      { response: 'flight', text: 'Stop initiating plans altogether. If they want to see you, they can make the effort.' },
      { response: 'freeze', text: 'Feel a wave of hurt but respond with "No worries!" while internally analyzing whether the friendship is changing.' },
      { response: 'fawn', text: 'Respond cheerfully, offer to reschedule around their availability, and ask if there\'s anything you can do to help with whatever came up.' }
    ]
  },
  {
    id: 4,
    scenario: 'Your manager gives you harsh, public criticism about a project you worked hard on.',
    context: 'During a team standup, they single out your work as "not meeting expectations" without prior private feedback.',
    options: [
      { response: 'fight', text: 'Respond professionally but firmly: "I\'d appreciate discussing specific feedback privately. Can we schedule time today?"' },
      { response: 'flight', text: 'Nod, end the meeting as quickly as possible, and immediately start looking for ways to transfer teams or find a new role.' },
      { response: 'freeze', text: 'Feel your face flush and your mind go blank. You can\'t think of what to say, so you just nod and wait for the meeting to end.' },
      { response: 'fawn', text: 'Thank them for the feedback, apologize for falling short, and promise to do better — even though you disagree with their assessment.' }
    ]
  },
  {
    id: 5,
    scenario: 'You discover your roommate has been reading your private journal.',
    context: 'You come home early and catch them in the act. They look embarrassed but don\'t immediately apologize.',
    options: [
      { response: 'fight', text: 'Confront them immediately with clear anger: "That is a massive violation of my privacy. We need to talk about this right now."' },
      { response: 'flight', text: 'Walk out of the room without a word. You need space before you can even begin to process this betrayal.' },
      { response: 'freeze', text: 'Stand in the doorway, unable to move or speak, as your mind races through the implications of what they might have read.' },
      { response: 'fawn', text: 'Downplay it — "Oh, it\'s fine, there\'s nothing interesting in there anyway" — while internally feeling deeply violated.' }
    ]
  },
  {
    id: 6,
    scenario: 'During a family dinner, a relative makes a dismissive comment about your career choice.',
    context: '"When are you going to get a real job?" they say, loud enough for the whole table to hear.',
    options: [
      { response: 'fight', text: 'Respond with confident directness: "My career is real, it\'s fulfilling, and it pays my bills. I\'d appreciate your respect."' },
      { response: 'flight', text: 'Change the subject smoothly or excuse yourself to "help in the kitchen" — this isn\'t worth the family drama.' },
      { response: 'freeze', text: 'Feel a rush of emotions but sit silently, fork suspended, unable to decide whether to defend yourself or let it go.' },
      { response: 'fawn', text: 'Laugh it off and make a self-deprecating joke to ease the tension, even though the comment stung deeply.' }
    ]
  },
  {
    id: 7,
    scenario: 'Your significant other accuses you of not caring enough about the relationship.',
    context: 'After a long week, they say: "You never make time for us anymore. I don\'t think you even care."',
    options: [
      { response: 'fight', text: 'Push back immediately: "That\'s not fair. I\'ve been exhausted. Let me show you everything I\'ve been juggling — I care deeply."' },
      { response: 'flight', text: 'Feel overwhelmed and say you need to go for a walk to clear your head before you can have this conversation.' },
      { response: 'freeze', text: 'Go completely still inside. The accusation hits so deep that you can\'t access words — you just stare, trying to process.' },
      { response: 'fawn', text: 'Immediately apologize and start planning a date night, rearranging your schedule to prove you care.' }
    ]
  },
  {
    id: 8,
    scenario: 'A close friend tells you that another friend has been talking behind your back.',
    context: 'They show you screenshots of messages where someone you trusted is saying unkind things about you.',
    options: [
      { response: 'fight', text: 'Contact the person directly: "I\'ve seen what you\'ve been saying. We need to have an honest conversation about this."' },
      { response: 'flight', text: 'Quietly distance yourself from that person without confrontation. You don\'t need that energy in your life.' },
      { response: 'freeze', text: 'Read the screenshots multiple times, feeling a growing numbness. You need time to sit with this before you know what to do.' },
      { response: 'fawn', text: 'Reach out to the person warmly, as if nothing happened, hoping that being extra kind will change their behavior.' }
    ]
  },
  {
    id: 9,
    scenario: 'You\'re in a group project and one member isn\'t pulling their weight.',
    context: 'The deadline is approaching, their section is incomplete, and the rest of the group is frustrated.',
    options: [
      { response: 'fight', text: 'Address it directly in the group chat: "We need to talk about the workload distribution. Your section needs to be done by tomorrow."' },
      { response: 'flight', text: 'Just do their section yourself. It\'s faster than dealing with the conflict, and at least the project will be done right.' },
      { response: 'freeze', text: 'Stare at the incomplete project, paralyzed between not wanting to cause conflict and knowing something needs to be said.' },
      { response: 'fawn', text: 'Message them privately with gentle encouragement: "Hey! No pressure, but is there anything I can help you with on your section?"' }
    ]
  },
  {
    id: 10,
    scenario: 'Your neighbor confronts you aggressively about a noise complaint you don\'t think is justified.',
    context: 'They knock on your door, visibly angry, accusing you of playing loud music — but you were watching TV at normal volume.',
    options: [
      { response: 'fight', text: 'Stand your ground calmly but firmly: "I understand you\'re frustrated, but I wasn\'t playing loud music. Let\'s figure out where the noise is actually coming from."' },
      { response: 'flight', text: 'Apologize briefly, close the door, and avoid them in the hallway going forward. It\'s not worth the confrontation.' },
      { response: 'freeze', text: 'Stand in the doorway, heart pounding, unable to form a coherent response as they continue their accusation.' },
      { response: 'fawn', text: 'Apologize profusely, offer to keep the volume even lower, and ask if there\'s anything else bothering them that you can fix.' }
    ]
  }
];

const responseConfig: Record<ConflictResponse, {
  label: string;
  bg: string;
  text: string;
  border: string;
  gradient: string;
  icon: React.ReactNode;
  description: string;
  strengths: string[];
  growthAreas: string[];
}> = {
  fight: {
    label: 'Fight',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    gradient: 'from-red-500 to-orange-500',
    icon: <Swords className="w-5 h-5" />,
    description: 'You meet conflict head-on with directness and courage. Your instinct is to name the problem, assert your position, and push for immediate resolution. You believe that honest confrontation, even when uncomfortable, is better than unspoken tension.',
    strengths: [
      'You never let problems fester — issues get addressed immediately',
      'Your directness creates clarity and eliminates ambiguity',
      'You model courage that gives others permission to speak up',
      'Conflicts with you resolve quickly because you push for resolution'
    ],
    growthAreas: [
      'Practice pausing for 10 seconds before responding in heated moments — your first response is often louder than necessary',
      'Ask "What are you feeling right now?" before stating your position — this builds the emotional bridge that makes your directness land better',
      'Learn to recognize when someone\'s silence is processing, not agreement or dismissal',
      'Experiment with writing your thoughts before speaking them — this channels your intensity into precision'
    ]
  },
  flight: {
    label: 'Flight',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-yellow-500',
    icon: <Wind className="w-5 h-5" />,
    description: 'You instinctively create distance when conflict arises — physically, emotionally, or intellectually. This isn\'t cowardice; it\'s a sophisticated self-preservation strategy that protects your energy and gives you space to assess the situation from a safer vantage point.',
    strengths: [
      'You avoid saying things in the heat of the moment that you\'d regret',
      'Your ability to step back gives you perspective others lack',
      'You protect your energy and mental health during high-conflict periods',
      'You often see the bigger picture because you\'re not trapped in the emotional vortex'
    ],
    growthAreas: [
      'Set a specific return time when you need space: "I need 30 minutes, then I\'ll come back to discuss this"',
      'Practice staying in mild discomfort — not every conflict requires retreat',
      'Tell people what you\'re doing: "I\'m stepping back to think, not to avoid you"',
      'Write down your thoughts during your retreat and share them when you return — this bridges the gap between your processing and others\' need for engagement'
    ]
  },
  freeze: {
    label: 'Freeze',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-indigo-500',
    icon: <Shield className="w-5 h-5" />,
    description: 'When conflict strikes, you go still — not from weakness, but from the depth of your processing. Your system takes in everything at once: the words, the emotions, the subtext, the history, the implications. This comprehensive intake can temporarily overwhelm your ability to respond in real-time.',
    strengths: [
      'You process conflict at a depth most people never reach',
      'Your eventual responses are often the most insightful in the room',
      'You rarely escalate situations because you don\'t react impulsively',
      'You notice dynamics and patterns that others miss entirely'
    ],
    growthAreas: [
      'Develop a "placeholder phrase" for when you freeze: "I need a moment to think about this — can you give me a minute?"',
      'Practice body-based grounding: press your feet into the floor, squeeze your hands, take three breaths — this reconnects you to the present',
      'Ask for written communication when possible — you process better when you can read and re-read',
      'Share your processing out loud: "I\'m taking this in. Here\'s what I\'m thinking so far..." — this keeps others connected to you while you process'
    ]
  },
  fawn: {
    label: 'Fawn',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-teal-500',
    icon: <Heart className="w-5 h-5" />,
    description: 'Your first instinct in conflict is to soothe, accommodate, and restore harmony. You prioritize the relationship and the other person\'s emotional state, often before you\'ve even checked in with your own needs. This is not people-pleasing — it\'s a deeply empathic response that values connection above being right.',
    strengths: [
      'You create emotional safety that allows others to be vulnerable',
      'Your empathy helps you understand what others need before they ask',
      'You de-escalate tense situations naturally through warmth',
      'Relationships with you feel safe, which builds deep trust over time'
    ],
    growthAreas: [
      'Before responding to others\' needs, ask yourself: "What do I actually need right now?"',
      'Practice saying "Let me think about that" instead of immediately agreeing — this creates space for your own truth',
      'Notice when you\'re apologizing for things that aren\'t your fault — each unnecessary apology erodes your sense of self',
      'Experiment with expressing disagreement in small, low-stakes situations first — build the muscle gradually'
    ]
  }
};

// Get growth recommendations based on dominant response and underused responses
const getGrowthRecommendations = (
  dominant: ConflictResponse,
  scores: Record<ConflictResponse, number>,
  predictedResponse: ConflictResponse | null
): string[] => {
  const recommendations: string[] = [];
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  
  // Find the least-used response
  const sortedResponses = (Object.entries(scores) as [ConflictResponse, number][])
    .sort((a, b) => a[1] - b[1]);
  const leastUsed = sortedResponses[0][0];
  const secondLeast = sortedResponses[1][0];

  // Recommendation based on expanding into least-used response
  const expansionMap: Record<ConflictResponse, Record<ConflictResponse, string>> = {
    fight: {
      freeze: 'Your directness is a strength, but practicing the "pause before response" of the Freeze style would make your confrontations more precise and less reactive. Try counting to five before speaking in your next disagreement.',
      flight: 'You rarely step back from conflict, which means you sometimes fight battles that don\'t need fighting. Practice strategic withdrawal: ask yourself "Is this the hill I want to die on?" before engaging.',
      fawn: 'Your courage in conflict is admirable, but learning to lead with empathy (the Fawn strength) before asserting your position would make others more receptive to your message. Try asking "How are you feeling about this?" before stating your case.'
    },
    flight: {
      fight: 'Your ability to step back is wise, but some conflicts require your presence. Practice staying in the room for one more exchange before retreating. The discomfort is temporary; the resolution is permanent.',
      freeze: 'You\'re skilled at creating distance, but sometimes the best move is to stay still and process in place. Practice sitting with conflict without leaving — physically or emotionally — for just two minutes longer each time.',
      fawn: 'Your independence in conflict is valuable, but learning to stay connected (the Fawn strength) while you process would help others feel less abandoned by your withdrawal. Try saying "I care about this and I need space to think" before stepping away.'
    },
    freeze: {
      fight: 'Your depth of processing is remarkable, but some situations need a faster response. Practice having 2-3 "ready phrases" for conflict: "I disagree and here\'s why..." or "That doesn\'t work for me because..." — these bridge the gap between your processing and the moment.',
      flight: 'When you freeze, you\'re stuck in place — but sometimes the wisest move is to consciously step away. Practice saying "I need to step out for a few minutes" instead of going silent. Movement can restart your processing.',
      fawn: 'Your stillness in conflict can feel cold to others. Practice small warmth signals even while processing: a nod, a "I hear you," or a hand on someone\'s arm. These keep the connection alive while you think.'
    },
    fawn: {
      fight: 'Your empathy is a superpower, but it needs the backbone of the Fight response to be sustainable. Practice one direct statement per conflict: "I see your perspective, AND here\'s what I need." The "and" is crucial — it honors both truths.',
      flight: 'You tend to stay in conflicts long past the point of productivity, absorbing others\' emotions. Practice the Flight skill of strategic withdrawal: "I want to help, but I need to check in with myself first." Your needs matter too.',
      freeze: 'Your instinct to immediately soothe is generous but sometimes premature. Practice the Freeze skill of pausing before accommodating: sit with the discomfort for 30 seconds before responding. Your first impulse to fix may not be what\'s actually needed.'
    }
  };

  if (expansionMap[dominant]?.[leastUsed]) {
    recommendations.push(expansionMap[dominant][leastUsed]);
  }
  if (expansionMap[dominant]?.[secondLeast]) {
    recommendations.push(expansionMap[dominant][secondLeast]);
  }

  // Add alignment-specific recommendation
  if (predictedResponse && dominant !== predictedResponse) {
    const alignmentRecs: Record<string, string> = {
      'fight-flight': 'Your elemental type predicts a Fight response, but you tend toward Flight. This suggests you\'ve developed sophisticated self-regulation — you\'ve learned to channel your natural intensity into strategic retreat. The growth edge: trust your Fire instinct more in situations that genuinely need direct confrontation.',
      'fight-freeze': 'Your elemental type predicts a Fight response, but you tend toward Freeze. This suggests deep internal processing is overriding your natural assertiveness. The growth edge: practice expressing your initial reaction before your analytical mind takes over — your first instinct often carries important truth.',
      'fight-fawn': 'Your elemental type predicts a Fight response, but you tend toward Fawn. This suggests you\'ve learned to prioritize relationships over confrontation. The growth edge: remember that honest disagreement IS relational care — people who matter can handle your truth.',
      'flight-fight': 'Your elemental type predicts a Flight response, but you tend toward Fight. This suggests you\'ve pushed past your natural withdrawal instinct to engage directly. The growth edge: honor your need for space sometimes — not every battle needs to be fought in the moment.',
      'flight-freeze': 'Your elemental type predicts a Flight response, but you tend toward Freeze. Instead of leaving the situation, you stay but go internal. The growth edge: when you notice yourself freezing, ask whether movement (your natural Flight instinct) might actually serve you better.',
      'flight-fawn': 'Your elemental type predicts a Flight response, but you tend toward Fawn. Instead of creating distance, you collapse the distance entirely by accommodating. The growth edge: your instinct to step back is actually healthy — practice honoring it before defaulting to people-pleasing.',
      'freeze-fight': 'Your elemental type predicts a Freeze response, but you tend toward Fight. You\'ve learned to override your processing pause with direct action. The growth edge: your natural depth of analysis is a gift — let yourself pause before engaging, and your confrontations will be more precise.',
      'freeze-flight': 'Your elemental type predicts a Freeze response, but you tend toward Flight. Instead of going still, you go away. The growth edge: sometimes staying still and processing in place (your natural Freeze) reveals insights that distance cannot provide.',
      'freeze-fawn': 'Your elemental type predicts a Freeze response, but you tend toward Fawn. Instead of going inward, you go outward — toward the other person\'s needs. The growth edge: your natural processing depth is valuable — give yourself permission to pause before accommodating.',
      'fawn-fight': 'Your elemental type predicts a Fawn response, but you tend toward Fight. You\'ve developed the assertiveness that your natural empathy sometimes suppresses. The growth edge: your empathic instinct is a strength, not a weakness — let it inform your directness rather than replacing it.',
      'fawn-flight': 'Your elemental type predicts a Fawn response, but you tend toward Flight. Instead of accommodating, you withdraw. The growth edge: your natural warmth and connection-seeking is valuable — practice staying present while also honoring your need for space.',
      'fawn-freeze': 'Your elemental type predicts a Fawn response, but you tend toward Freeze. Instead of immediately soothing, you go still. The growth edge: your natural empathy combined with your processing depth could make you an exceptional mediator — practice channeling your freeze into thoughtful, caring responses.'
    };
    const key = `${predictedResponse}-${dominant}`;
    if (alignmentRecs[key]) {
      recommendations.push(alignmentRecs[key]);
    }
  } else if (predictedResponse && dominant === predictedResponse) {
    recommendations.push(
      `Your quiz results align with your elemental type\'s predicted ${responseConfig[predictedResponse].label} response. This means you\'re operating from your natural default — which is comfortable but can become a rut. The growth edge: deliberately practice the response style you scored lowest in (${responseConfig[leastUsed].label}). Not to replace your default, but to expand your repertoire so you can choose the response that serves each unique situation.`
    );
  }

  return recommendations;
};

const ConflictStyleQuiz: React.FC<ConflictStyleQuizProps> = ({ userElement, userSubtype }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ConflictResponse>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ConflictResponse | null>(null);

  // Find user's subtype data
  const userSubtypeData = useMemo((): ConflictSubtype | null => {
    if (!userSubtype) return null;
    for (const element of conflictData) {
      const found = element.subtypes.find(s => s.subtypeId === userSubtype);
      if (found) return found;
    }
    return null;
  }, [userSubtype]);

  const predictedResponse = userSubtypeData?.defaultResponse || null;

  // Calculate scores
  const scores = useMemo((): Record<ConflictResponse, number> => {
    const s: Record<ConflictResponse, number> = { fight: 0, flight: 0, freeze: 0, fawn: 0 };
    Object.values(answers).forEach(r => { s[r]++; });
    return s;
  }, [answers]);

  const dominantResponse = useMemo((): ConflictResponse => {
    const entries = Object.entries(scores) as [ConflictResponse, number][];
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }, [scores]);

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = quizQuestions.length;

  const alignmentPercentage = useMemo((): number => {
    if (!predictedResponse || totalAnswered === 0) return 0;
    const predictedCount = scores[predictedResponse];
    return Math.round((predictedCount / totalAnswered) * 100);
  }, [predictedResponse, scores, totalAnswered]);

  const handleSelectOption = (response: ConflictResponse) => {
    setSelectedOption(response);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = { ...answers, [currentQuestion]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedOption(null);
  };

  const growthRecommendations = useMemo(() => {
    if (!showResults) return [];
    return getGrowthRecommendations(dominantResponse, scores, predictedResponse);
  }, [showResults, dominantResponse, scores, predictedResponse]);

  // Option styling based on response type
  const getOptionStyle = (response: ConflictResponse, isSelected: boolean) => {
    if (isSelected) {
      const config = responseConfig[response];
      return `${config.bg} ${config.border} border-2 shadow-md ring-2 ring-offset-1 ring-${response === 'fight' ? 'red' : response === 'flight' ? 'amber' : response === 'freeze' ? 'blue' : 'emerald'}-300`;
    }
    return 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm';
  };

  if (showResults) {
    const dominant = responseConfig[dominantResponse];
    const sortedScores = (Object.entries(scores) as [ConflictResponse, number][])
      .sort((a, b) => b[1] - a[1]);

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Results Header */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${dominant.gradient} p-8 text-white`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                {dominant.icon}
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Your Dominant Conflict Response</p>
                <h3 className="text-3xl font-bold">{dominant.label}</h3>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed max-w-2xl">{dominant.description}</p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-gray-600" />
            Your Conflict Response Breakdown
          </h4>
          <div className="space-y-4">
            {sortedScores.map(([response, count]) => {
              const config = responseConfig[response];
              const percentage = Math.round((count / totalQuestions) * 100);
              const isPredicted = response === predictedResponse;
              const isDominant = response === dominantResponse;

              return (
                <div key={response} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${config.bg} ${config.text} flex items-center justify-center`}>
                        {config.icon}
                      </div>
                      <span className="font-medium text-gray-800">{config.label}</span>
                      <div className="flex gap-1.5">
                        {isDominant && (
                          <span className="px-2 py-0.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                            Dominant
                          </span>
                        )}
                        {isPredicted && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Predicted
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{count}/{totalQuestions} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-700 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actual vs Predicted Comparison */}
        {predictedResponse && userSubtypeData && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-gray-600" />
              Actual vs. Predicted Conflict Style
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Actual */}
              <div className={`p-5 rounded-xl border-2 ${dominant.border} ${dominant.bg}`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Actual Response</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dominant.gradient} text-white flex items-center justify-center`}>
                    {dominant.icon}
                  </div>
                  <span className={`text-xl font-bold ${dominant.text}`}>{dominant.label}</span>
                </div>
                <p className="text-xs text-gray-600">Based on your quiz responses</p>
              </div>

              {/* Alignment */}
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-2">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={alignmentPercentage >= 50 ? '#22c55e' : alignmentPercentage >= 25 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="3"
                      strokeDasharray={`${alignmentPercentage}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">{alignmentPercentage}%</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Alignment</p>
                <p className="text-xs text-gray-500 mt-1">
                  {alignmentPercentage >= 70 ? 'Strong match' : alignmentPercentage >= 40 ? 'Moderate match' : 'Divergent pattern'}
                </p>
              </div>

              {/* Predicted */}
              <div className={`p-5 rounded-xl border-2 ${responseConfig[predictedResponse].border} ${responseConfig[predictedResponse].bg}`}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Predicted Response</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${responseConfig[predictedResponse].gradient} text-white flex items-center justify-center`}>
                    {responseConfig[predictedResponse].icon}
                  </div>
                  <span className={`text-xl font-bold ${responseConfig[predictedResponse].text}`}>{responseConfig[predictedResponse].label}</span>
                </div>
                <p className="text-xs text-gray-600">Based on {userSubtypeData.subtype} profile</p>
              </div>
            </div>

            {/* Alignment Interpretation */}
            <div className={`p-5 rounded-xl border ${
              dominantResponse === predictedResponse 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                {dominantResponse === predictedResponse ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold text-sm mb-1 ${
                    dominantResponse === predictedResponse ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {dominantResponse === predictedResponse
                      ? 'Your conflict style matches your elemental prediction'
                      : 'Your conflict style diverges from your elemental prediction'
                    }
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {dominantResponse === predictedResponse
                      ? `As a ${userSubtypeData.subtype}, your predicted default conflict response is ${responseConfig[predictedResponse].label} — and your quiz results confirm this. You are operating from your elemental nature. This is your comfort zone, which means it\'s both your greatest strength and the place where you\'re most likely to get stuck. The key to growth is not abandoning your default but expanding your range.`
                      : `As a ${userSubtypeData.subtype}, your predicted default conflict response is ${responseConfig[predictedResponse].label}, but your quiz results show a dominant ${dominant.label} response. This divergence is fascinating — it suggests that life experience, conscious growth, or environmental adaptation has shaped your conflict style beyond your elemental default. This is neither better nor worse; it simply means you\'ve developed a conflict repertoire that goes beyond your natural wiring.`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gray-600" />
            Your {dominant.label} Response Strengths
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dominant.strengths.map((strength, idx) => (
              <div key={idx} className={`p-4 rounded-xl ${dominant.bg} border ${dominant.border}`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-4 h-4 ${dominant.text} mt-0.5 flex-shrink-0`} />
                  <p className="text-sm text-gray-700 leading-relaxed">{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Recommendations */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            Personalized Growth Recommendations
          </h4>
          <p className="text-sm text-gray-500 mb-6">
            Expanding your conflict repertoire beyond your {dominant.label} default
          </p>

          {/* Default growth areas for dominant type */}
          <div className="space-y-4 mb-6">
            <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Core Growth Practices for {dominant.label} Responders
            </h5>
            {dominant.growthAreas.map((area, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50/80 rounded-xl border border-violet-100">
                <div className="w-6 h-6 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{area}</p>
              </div>
            ))}
          </div>

          {/* Personalized recommendations based on alignment */}
          {growthRecommendations.length > 0 && (
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Personalized Insights Based on Your Elemental Profile
              </h5>
              {growthRecommendations.map((rec, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Retake Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleRetake}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Questions View
  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          Answer these 10 scenario-based questions honestly — choose the response that feels most natural to you, 
          not the one you think is "correct." There are no right or wrong answers. Your instinctive reaction 
          reveals your default conflict pattern.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {quizQuestions.map((_, idx) => {
            const isAnswered = answers[idx] !== undefined;
            const isCurrent = idx === currentQuestion;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isAnswered || idx === currentQuestion) {
                    setCurrentQuestion(idx);
                    setSelectedOption(answers[idx] || null);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'bg-rose-500 scale-125 ring-2 ring-rose-200'
                    : isAnswered
                    ? 'bg-rose-300 hover:bg-rose-400 cursor-pointer'
                    : 'bg-gray-200'
                }`}
                disabled={!isAnswered && idx !== currentQuestion}
              />
            );
          })}
        </div>

        {/* Scenario */}
        <div className="mb-8">
          <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{question.scenario}</h4>
                <p className="text-sm text-gray-500 italic">{question.context}</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === option.response;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.response)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${getOptionStyle(option.response, isSelected)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? `${responseConfig[option.response].border} ${responseConfig[option.response].bg}`
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${responseConfig[option.response].gradient}`} />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{option.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentQuestion === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
              selectedOption === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 shadow-md hover:shadow-lg'
            }`}
          >
            {currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictStyleQuiz;
