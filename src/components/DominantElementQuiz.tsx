import React, { useState, useMemo } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';

interface DominantElementQuizProps {
  onStartFullQuiz?: () => void;
}

type ElementKey = 'fire' | 'water' | 'earth' | 'air';

interface QuestionData {
  id: number;
  question: string;
  answers: {
    element: ElementKey;
    label: string;
  }[];
  boxGradient: string;
  boxBorder: string;
  iconBg: string;
}

const elementConfig: Record<ElementKey, {
  icon: React.ReactNode;
  color: string;
  bgLight: string;
  bgMedium: string;
  border: string;
  label: string;
  textColor: string;
}> = {
  fire: {
    icon: <Flame className="w-4 h-4" />,
    color: '#C41E3A',
    bgLight: 'rgba(196, 30, 58, 0.08)',
    bgMedium: 'rgba(196, 30, 58, 0.15)',
    border: 'rgba(196, 30, 58, 0.3)',
    label: 'Fire',
    textColor: '#9B1B30',
  },
  water: {
    icon: <Droplets className="w-4 h-4" />,
    color: '#4A7B94',
    bgLight: 'rgba(74, 123, 148, 0.08)',
    bgMedium: 'rgba(74, 123, 148, 0.15)',
    border: 'rgba(74, 123, 148, 0.3)',
    label: 'Water',
    textColor: '#3A6478',
  },
  earth: {
    icon: <Mountain className="w-4 h-4" />,
    color: '#8B6914',
    bgLight: 'rgba(139, 105, 20, 0.08)',
    bgMedium: 'rgba(139, 105, 20, 0.15)',
    border: 'rgba(139, 105, 20, 0.3)',
    label: 'Earth',
    textColor: '#6B5010',
  },
  air: {
    icon: <Wind className="w-4 h-4" />,
    color: '#2E8B7A',
    bgLight: 'rgba(46, 139, 122, 0.08)',
    bgMedium: 'rgba(46, 139, 122, 0.15)',
    border: 'rgba(46, 139, 122, 0.3)',
    label: 'Air',
    textColor: '#1F6B5E',
  },
};

const questions: QuestionData[] = [
  {
    id: 1,
    question: 'In a group project, you naturally...',
    answers: [
      { element: 'fire', label: 'Lead' },
      { element: 'water', label: 'Connect' },
      { element: 'earth', label: 'Organize' },
      { element: 'air', label: 'Analyze' },
    ],
    boxGradient: 'from-amber-50 via-orange-50 to-yellow-50',
    boxBorder: 'border-amber-200/60',
    iconBg: 'bg-amber-100',
  },
  {
    id: 2,
    question: 'Your greatest strength is...',
    answers: [
      { element: 'fire', label: 'Courage' },
      { element: 'water', label: 'Empathy' },
      { element: 'earth', label: 'Reliability' },
      { element: 'air', label: 'Wisdom' },
    ],
    boxGradient: 'from-teal-50 via-emerald-50 to-cyan-50',
    boxBorder: 'border-teal-200/60',
    iconBg: 'bg-teal-100',
  },
  {
    id: 3,
    question: 'Your greatest challenge is...',
    answers: [
      { element: 'fire', label: 'Impatience' },
      { element: 'water', label: 'Overwhelm' },
      { element: 'earth', label: 'Stubbornness' },
      { element: 'air', label: 'Detachment' },
    ],
    boxGradient: 'from-rose-50 via-pink-50 to-fuchsia-50',
    boxBorder: 'border-rose-200/60',
    iconBg: 'bg-rose-100',
  },
  {
    id: 4,
    question: 'You recharge by...',
    answers: [
      { element: 'fire', label: 'Action' },
      { element: 'water', label: 'Solitude' },
      { element: 'earth', label: 'Nature' },
      { element: 'air', label: 'Learning' },
    ],
    boxGradient: 'from-indigo-50 via-violet-50 to-purple-50',
    boxBorder: 'border-indigo-200/60',
    iconBg: 'bg-indigo-100',
  },
  {
    id: 5,
    question: 'Your ideal weekend includes...',
    answers: [
      { element: 'fire', label: 'Accomplishment' },
      { element: 'water', label: 'Connection' },
      { element: 'earth', label: 'Productivity' },
      { element: 'air', label: 'Discovery' },
    ],
    boxGradient: 'from-sky-50 via-blue-50 to-indigo-50',
    boxBorder: 'border-sky-200/60',
    iconBg: 'bg-sky-100',
  },
];

const DominantElementQuiz: React.FC<DominantElementQuizProps> = ({ onStartFullQuiz }) => {
  const [answers, setAnswers] = useState<Record<number, ElementKey>>({});

  const handleSelect = (questionId: number, element: ElementKey) => {
    setAnswers(prev => {
      // Toggle off if same answer clicked
      if (prev[questionId] === element) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return { ...prev, [questionId]: element };
    });
  };

  const handleReset = () => {
    setAnswers({});
  };

  const scores = useMemo(() => {
    const s: Record<ElementKey, number> = { fire: 0, water: 0, earth: 0, air: 0 };
    Object.values(answers).forEach(el => {
      s[el]++;
    });
    return s;
  }, [answers]);

  const totalAnswered = Object.keys(answers).length;

  const dominantElement = useMemo(() => {
    if (totalAnswered === 0) return null;
    const max = Math.max(...Object.values(scores));
    if (max === 0) return null;
    const dominants = (Object.entries(scores) as [ElementKey, number][]).filter(([, v]) => v === max);
    if (dominants.length === 1) return dominants[0][0];
    // Tie — return null to show tie message
    return null;
  }, [scores, totalAnswered]);

  const tiedElements = useMemo(() => {
    if (totalAnswered === 0) return [];
    const max = Math.max(...Object.values(scores));
    if (max === 0) return [];
    return (Object.entries(scores) as [ElementKey, number][])
      .filter(([, v]) => v === max)
      .map(([k]) => k);
  }, [scores, totalAnswered]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 via-rose-100 to-violet-100 rounded-full mb-5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-gray-700">Quick Quiz</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
          Your Dominant Elemental Energy
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Still uncertain of your dominant elemental energy? Ask yourself these five quick questions. 
          Answer quickly—don't overthink.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {questions.map((q) => {
          const selectedElement = answers[q.id];
          return (
            <div
              key={q.id}
              className={`rounded-2xl border bg-gradient-to-br ${q.boxGradient} ${q.boxBorder} p-5 md:p-6 transition-all duration-300 ${
                selectedElement ? 'shadow-md' : 'shadow-sm hover:shadow-md'
              }`}
            >
              {/* Question header */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${q.iconBg} flex items-center justify-center`}>
                  <span className="text-sm font-bold text-gray-700">{q.id}</span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800 pt-0.5">
                  {q.question}
                </h3>
              </div>

              {/* Answer options */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
                {q.answers.map((a) => {
                  const config = elementConfig[a.element];
                  const isSelected = selectedElement === a.element;
                  return (
                    <button
                      key={a.element}
                      onClick={() => handleSelect(q.id, a.element)}
                      className={`group relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'shadow-md scale-[1.02]'
                          : 'bg-white/70 border-gray-200/60 hover:border-gray-300 hover:bg-white hover:shadow-sm'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: config.bgMedium,
                              borderColor: config.color,
                              boxShadow: `0 4px 14px ${config.border}`,
                            }
                          : undefined
                      }
                    >
                      {/* Element icon */}
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected ? '' : 'bg-gray-100 text-gray-400 group-hover:text-gray-600'
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: config.color,
                                color: '#FFFFFF',
                              }
                            : undefined
                        }
                      >
                        {config.icon}
                      </div>

                      {/* Label and element name */}
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
                            isSelected ? '' : 'text-gray-700'
                          }`}
                          style={isSelected ? { color: config.textColor } : undefined}
                        >
                          {a.label}
                        </div>
                        <div
                          className={`text-xs leading-tight mt-0.5 transition-colors duration-200 ${
                            isSelected ? '' : 'text-gray-400'
                          }`}
                          style={isSelected ? { color: config.color, opacity: 0.7 } : undefined}
                        >
                          {config.label}
                        </div>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div
                          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scoring Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-serif font-semibold text-gray-900">Scoring</h3>
            <p className="text-sm text-gray-500 mt-1">
              Count your answers. The element with the highest score is your dominant energy.
            </p>
          </div>
          {totalAnswered > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Score bars */}
        <div className="space-y-3">
          {(Object.entries(elementConfig) as [ElementKey, typeof elementConfig[ElementKey]][]).map(
            ([element, config]) => {
              const score = scores[element];
              const percentage = totalAnswered > 0 ? (score / 5) * 100 : 0;
              const isDominant = dominantElement === element;
              return (
                <div key={element} className="flex items-center gap-3">
                  {/* Element icon + label */}
                  <div className="flex items-center gap-2 w-20 flex-shrink-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: config.color, color: '#fff' }}
                    >
                      {config.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{config.label}</span>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.max(percentage, 0)}%`,
                        backgroundColor: score > 0 ? config.color : 'transparent',
                        opacity: isDominant ? 1 : 0.6,
                      }}
                    />
                    {score > 0 && (
                      <span
                        className="absolute inset-y-0 flex items-center text-xs font-bold"
                        style={{
                          left: percentage > 15 ? '12px' : `${percentage + 2}%`,
                          color: percentage > 15 ? '#fff' : config.textColor,
                        }}
                      >
                        {score}
                      </span>
                    )}
                  </div>

                  {/* Score number */}
                  <div className="w-8 text-right">
                    <span
                      className={`text-sm font-bold ${
                        isDominant ? '' : 'text-gray-400'
                      }`}
                      style={isDominant ? { color: config.color } : undefined}
                    >
                      {score}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Result message */}
        {totalAnswered > 0 && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            {totalAnswered < 5 ? (
              <p className="text-sm text-gray-500 text-center">
                Answer all 5 questions to see your dominant element.{' '}
                <span className="font-medium text-gray-700">{5 - totalAnswered} remaining</span>
              </p>
            ) : dominantElement ? (
              <div className="text-center">
                <div
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-3"
                  style={{
                    backgroundColor: elementConfig[dominantElement].bgMedium,
                    border: `2px solid ${elementConfig[dominantElement].border}`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: elementConfig[dominantElement].color,
                      color: '#fff',
                    }}
                  >
                    {elementConfig[dominantElement].icon}
                  </div>
                  <span
                    className="font-semibold text-base"
                    style={{ color: elementConfig[dominantElement].textColor }}
                  >
                    Your dominant energy is {elementConfig[dominantElement].label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  This quick assessment suggests {elementConfig[dominantElement].label} as your primary elemental energy. 
                  Take the full quiz for a comprehensive analysis including your subtype.
                </p>
              </div>
            ) : tiedElements.length > 1 ? (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  {tiedElements.map((el) => (
                    <div
                      key={el}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: elementConfig[el].bgMedium,
                        border: `1.5px solid ${elementConfig[el].border}`,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: elementConfig[el].color, color: '#fff' }}
                      >
                        {elementConfig[el].icon}
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: elementConfig[el].textColor }}
                      >
                        {elementConfig[el].label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  It's a tie! You have equal {tiedElements.map(el => elementConfig[el].label).join(' and ')} energy.
                </p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  A tie often means you carry a strong blend of elemental energies. 
                  Take the full quiz for a deeper, more nuanced analysis.
                </p>
              </div>
            ) : null}

            {/* CTA to full quiz */}
            {totalAnswered === 5 && onStartFullQuiz && (
              <div className="mt-5 text-center">
                <button
                  onClick={onStartFullQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  Take the Full Quiz
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {totalAnswered === 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-400 text-center italic">
              Select an answer for each question above to discover your dominant elemental energy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DominantElementQuiz;
