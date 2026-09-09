import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Sprout, CheckCircle, Sparkles } from 'lucide-react';
import { rootsAssessmentQuestions, type RootsQuestion } from '@/data/rootsAssessmentQuestions';
import {
  ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES,
} from '@/data/elementalSubtypeArchetypes';
import {
  getRootsCategoryIdForSubtype,
} from '@/data/rootsForumConfig';

interface RootsAssessmentProps {
  onBack: () => void;
  onSaveRoots?: (primaryElement: string, primarySubtypeId: string) => Promise<void> | void;
}

const ELEMENT_LABELS: Record<string, { label: string; gradient: string }> = {
  fire:  { label: 'Fire',  gradient: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)' },
  water: { label: 'Water', gradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)' },
  earth: { label: 'Earth', gradient: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)' },
  air:   { label: 'Air',   gradient: 'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)' },
};

const RootsAssessment: React.FC<RootsAssessmentProps> = ({ onBack, onSaveRoots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedBlendedSubtypeId, setSelectedBlendedSubtypeId] = useState<string | null>(null);

  const questions = rootsAssessmentQuestions;
  const current: RootsQuestion | undefined = questions[currentIndex];

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  // Tally scores per element
  const getResults = () => {
    const scores: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };
    questions.forEach((q) => {
      if (answers[q.id]) scores[q.element] += answers[q.id];
    });
    return scores;
  };

  const computedResults = useMemo(() => {
    if (!finished) return null;
    const scores = getResults();
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryElement = ranked[0]?.[0] ?? 'earth';
    const primarySecondary = ranked[1]?.[0] ?? primaryElement;
    const primarySubtypeId = `${primaryElement}-${primarySecondary}`;

    const secondaryCandidates = ranked.map(([el]) => el);
    const suggestedSubtypeIds: string[] = [];
    for (const sec of secondaryCandidates) {
      if (suggestedSubtypeIds.length >= 2) break;
      const subtypeId = `${primaryElement}-${sec}`;
      if (subtypeId === primarySubtypeId) continue;
      if (!suggestedSubtypeIds.includes(subtypeId)) suggestedSubtypeIds.push(subtypeId);
    }

    return {
      scores,
      primaryElement,
      primarySecondary,
      primarySubtypeId,
      suggestedSubtypeIds,
    };
  }, [answers, finished]);

  useEffect(() => {
    if (!finished || !computedResults) return;
    const defaultBlend = computedResults.suggestedSubtypeIds[0] ?? computedResults.primarySubtypeId;
    setSelectedBlendedSubtypeId(defaultBlend);
  }, [finished, computedResults]);

  if (finished) {
    if (!computedResults) return null;
    const { primaryElement, primarySubtypeId, suggestedSubtypeIds, scores } = computedResults;
    const primaryInfo = ELEMENT_LABELS[primaryElement];
    const primaryArchetypeName = ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES[primarySubtypeId] ?? primarySubtypeId;
    const primaryRootCategoryId = getRootsCategoryIdForSubtype(primarySubtypeId);

    const blendedCategoryId = selectedBlendedSubtypeId
      ? getRootsCategoryIdForSubtype(selectedBlendedSubtypeId)
      : null;

    const handleSaveAndContinue = async () => {
      setSaving(true);
      try {
        if (selectedBlendedSubtypeId) {
          // Premium: one blended Root. We store it client-side until we add a DB column.
          if (blendedCategoryId) {
            localStorage.setItem('elemental-color-roots-preferred-blend', blendedCategoryId);
          }
        }

        if (primaryRootCategoryId && onSaveRoots) {
          await onSaveRoots(primaryElement, primarySubtypeId);
        }
      } finally {
        setSaving(false);
        onBack();
      }
    };

    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6">
        <div
          className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
          style={{ background: primaryInfo.gradient }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Your Primary Root
        </h2>

        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          <strong className="text-gray-900">{primaryArchetypeName}</strong> ({primaryInfo.label})
        </p>

        <div className="mb-8 rounded-2xl overflow-hidden border border-violet-100 shadow-sm bg-gradient-to-br from-violet-50 to-white">
          <div className="px-5 py-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <p className="text-sm font-semibold text-gray-800">Root resonance snapshot</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-5 pb-5">
            {Object.entries(scores)
              .sort((a, b) => b[1] - a[1])
              .map(([el, score]) => {
                const elInfo = ELEMENT_LABELS[el as keyof typeof ELEMENT_LABELS];
                return (
                  <div
                    key={el}
                    className="rounded-xl p-3 text-white text-center shadow-sm"
                    style={{ background: elInfo.gradient }}
                  >
                    <p className="text-lg font-bold">{score}</p>
                    <p className="text-[11px] font-semibold opacity-90">{elInfo.label}</p>
                  </div>
                );
              })}
          </div>
        </div>

        {suggestedSubtypeIds.length > 0 && (
          <div className="text-left mb-6">
            <p className="text-sm font-bold text-gray-800 mb-2">Suggested secondary Roots</p>
            <div className="space-y-3">
              {suggestedSubtypeIds.map((subtypeId) => {
                const el = subtypeId.split('-')[0];
                const info = ELEMENT_LABELS[el as keyof typeof ELEMENT_LABELS];
                const archetypeName = ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES[subtypeId] ?? subtypeId;
                const categoryId = getRootsCategoryIdForSubtype(subtypeId);
                const isSelected = selectedBlendedSubtypeId === subtypeId;

                return (
                  <button
                    key={subtypeId}
                    type="button"
                    onClick={() => setSelectedBlendedSubtypeId(subtypeId)}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all ${
                      isSelected
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900">{archetypeName}</p>
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">{info.label}</p>
                      </div>
                      <span
                        className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm"
                        style={{ background: info.gradient }}
                      >
                        {categoryId ? 'Pick as blended Root' : 'Suggested'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Premium members get access to your primary Root + one blended Root of choice.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gray-700 font-semibold shadow-sm hover:bg-gray-50 transition-all border border-gray-200"
            disabled={saving}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handleSaveAndContinue}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
            disabled={saving}
          >
            {saving ? (
              'Saving...'
            ) : (
              <>
                Save to My Roots
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roots Forum
      </button>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Roots Assessment</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          Question {currentIndex + 1} of {questions.length}
        </h2>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            background: 'linear-gradient(135deg, #059669, #34D399)',
          }}
        />
      </div>

      <p className="text-lg text-gray-800 font-medium text-center mb-8">{current.text}</p>

      <div className="space-y-3 mb-10">
        {current.options.map((opt) => {
          const selected = answers[current.id] === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleAnswer(current.id, opt.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                selected
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!answers[current.id]}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
        >
          {currentIndex === questions.length - 1 ? 'See Results' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RootsAssessment;
