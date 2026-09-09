import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  History, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Calendar,
  TrendingUp,
  GitCompare,
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { elementalTypes } from '@/data/elementalTypes';
import { toast } from '@/components/ui/use-toast';

interface QuizHistoryItem {
  id: string;
  elemental_type: string;
  elemental_subtype: string | null;
  quiz_type: 'full' | 'subtype_only';
  completed_at: string;
  answers: any;
}

interface RetakeQuizSectionProps {
  user: any;
  profile: any;
  onStartQuiz: (mode: 'full' | 'subtype') => void;
  onProfileUpdate?: () => void;
}

const RetakeQuizSection: React.FC<RetakeQuizSectionProps> = ({
  user,
  profile,
  onStartQuiz,
  onProfileUpdate
}) => {
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);

  const currentType = profile?.elemental_type 
    ? elementalTypes.find(t => t.id === profile.elemental_type) 
    : null;

  const currentSubtype = currentType && profile?.elemental_subtype
    ? currentType.subtypes.find(s => s.id === profile.elemental_subtype)
    : null;

  useEffect(() => {
    if (user) {
      fetchQuizHistory();
    }
  }, [user]);

  const fetchQuizHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_history')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) {
        // Gracefully handle missing table — just show empty history
        console.warn('Could not fetch quiz history:', error.message);
        setQuizHistory([]);
      } else {
        setQuizHistory(data || []);
      }
    } catch (error) {
      console.error('Error fetching quiz history:', error);
      setQuizHistory([]);
    } finally {
      setLoading(false);
    }
  };


  const getTypeData = (typeId: string) => {
    return elementalTypes.find(t => t.id === typeId);
  };

  const getSubtypeData = (typeId: string, subtypeId: string) => {
    const type = getTypeData(typeId);
    return type?.subtypes.find(s => s.id === subtypeId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getTypeChanges = () => {
    if (quizHistory.length < 2) return null;

    const changes: { from: QuizHistoryItem; to: QuizHistoryItem; changeType: 'element' | 'subtype' }[] = [];
    
    for (let i = 0; i < quizHistory.length - 1; i++) {
      const current = quizHistory[i];
      const previous = quizHistory[i + 1];
      
      if (current.elemental_type !== previous.elemental_type) {
        changes.push({ from: previous, to: current, changeType: 'element' });
      } else if (current.elemental_subtype !== previous.elemental_subtype && current.elemental_subtype && previous.elemental_subtype) {
        changes.push({ from: previous, to: current, changeType: 'subtype' });
      }
    }

    return changes;
  };

  const typeChanges = getTypeChanges();
  const comparisonItem = selectedComparison 
    ? quizHistory.find(h => h.id === selectedComparison) 
    : null;

  if (!currentType) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center py-8">
          <Sparkles className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-serif text-gray-900 mb-2">Take Your First Quiz</h3>
          <p className="text-gray-500 mb-6">Discover your elemental type and personalized color palette</p>
          <button
            onClick={() => onStartQuiz('full')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-rose-700 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Start the Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Type Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-serif text-gray-900 mb-1">Your Elemental Type</h2>
            <p className="text-gray-500 text-sm">Retake the quiz to see if your type has evolved</p>
          </div>
          {quizHistory.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <History className="w-4 h-4" />
              History ({quizHistory.length})
              {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Current Type Card */}
        <div 
          className="relative rounded-xl overflow-hidden mb-6"
          style={{ 
            background: `linear-gradient(135deg, ${currentType.colors[0].hex}20, ${currentType.colors[1].hex}20)` 
          }}
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentType.colors[0].hex }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif text-gray-900">
                  {currentSubtype ? currentSubtype.name : currentType.name}
                </h3>
                <p className="text-gray-600">
                  {currentType.name} Element • {currentType.season} Season
                </p>
                {profile?.quiz_completed_at && (
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last taken {formatRelativeDate(profile.quiz_completed_at)}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {currentType.colors.slice(0, 4).map((color, idx) => (
                  <div 
                    key={idx}
                    className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Retake Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => onStartQuiz('full')}
            className="flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:border-purple-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-semibold text-gray-900">Retake Full Quiz</h4>
              <p className="text-sm text-gray-500">Start fresh and discover if your element has changed</p>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onStartQuiz('subtype')}
            className="flex items-center gap-4 p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-100 hover:border-rose-200 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-semibold text-gray-900">Retake Subtype Quiz</h4>
              <p className="text-sm text-gray-500">Keep your element, refine your subtype</p>
            </div>
            <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Your color preferences may evolve over time</p>
            <p className="text-amber-600 mt-1">
              Seasonal changes, lifestyle shifts, and personal growth can all influence your ideal colors. 
              We recommend retaking the quiz every 6-12 months.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz History */}
      {showHistory && quizHistory.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-serif text-gray-900 mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-gray-400" />
            Quiz History
          </h3>

          {/* Type Changes Summary */}
          {typeChanges && typeChanges.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <h4 className="font-semibold text-gray-900">Your Color Journey</h4>
              </div>
              <div className="space-y-3">
                {typeChanges.slice(0, 3).map((change, idx) => {
                  const fromType = getTypeData(change.from.elemental_type);
                  const toType = getTypeData(change.to.elemental_type);
                  const fromSubtype = change.from.elemental_subtype 
                    ? getSubtypeData(change.from.elemental_type, change.from.elemental_subtype)
                    : null;
                  const toSubtype = change.to.elemental_subtype 
                    ? getSubtypeData(change.to.elemental_type, change.to.elemental_subtype)
                    : null;

                  return (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">{formatDate(change.to.completed_at)}</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-1 rounded-full text-white text-xs font-medium"
                          style={{ backgroundColor: fromType?.colors[0].hex }}
                        >
                          {change.changeType === 'element' 
                            ? fromType?.name 
                            : fromSubtype?.name || fromType?.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span 
                          className="px-2 py-1 rounded-full text-white text-xs font-medium"
                          style={{ backgroundColor: toType?.colors[0].hex }}
                        >
                          {change.changeType === 'element' 
                            ? toType?.name 
                            : toSubtype?.name || toType?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* History Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="space-y-4">
              {quizHistory.map((item, idx) => {
                const typeData = getTypeData(item.elemental_type);
                const subtypeData = item.elemental_subtype 
                  ? getSubtypeData(item.elemental_type, item.elemental_subtype)
                  : null;
                const isSelected = selectedComparison === item.id;
                const isCurrent = idx === 0;

                return (
                  <div 
                    key={item.id} 
                    className={`relative flex gap-4 pl-2 cursor-pointer group ${
                      isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedComparison(isSelected ? null : item.id)}
                  >
                    <div 
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: typeData?.colors[0].hex }}
                    >
                      {isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Calendar className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 rounded-xl p-4 transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200' 
                        : 'bg-gray-50 border border-transparent group-hover:border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">
                              {subtypeData ? subtypeData.name : typeData?.name}
                            </h4>
                            {isCurrent && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {typeData?.name} Element • {item.quiz_type === 'full' ? 'Full Quiz' : 'Subtype Only'}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {formatRelativeDate(item.completed_at)}
                        </span>
                      </div>
                      
                      {/* Color preview */}
                      <div className="flex gap-1 mt-3">
                        {(subtypeData?.colors || typeData?.colors)?.slice(0, 6).map((color, cidx) => (
                          <div 
                            key={cidx}
                            className="w-6 h-6 rounded-full shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>

                      {isSelected && !isCurrent && (
                        <div className="mt-4 pt-4 border-t border-purple-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Could implement comparison view here
                            }}
                            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                          >
                            <GitCompare className="w-4 h-4" />
                            Compare with current type
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Comparison View */}
      {comparisonItem && selectedComparison && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-serif text-gray-900 mb-4 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-purple-500" />
            Comparison View
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Previous Type */}
            {(() => {
              const prevType = getTypeData(comparisonItem.elemental_type);
              const prevSubtype = comparisonItem.elemental_subtype 
                ? getSubtypeData(comparisonItem.elemental_type, comparisonItem.elemental_subtype)
                : null;

              return (
                <div 
                  className="rounded-xl p-5 border-2"
                  style={{ 
                    borderColor: prevType?.colors[0].hex + '40',
                    background: `linear-gradient(135deg, ${prevType?.colors[0].hex}10, ${prevType?.colors[1]?.hex || prevType?.colors[0].hex}10)` 
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</span>
                    <span className="text-xs text-gray-400">{formatDate(comparisonItem.completed_at)}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: prevType?.colors[0].hex }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {prevSubtype ? prevSubtype.name : prevType?.name}
                      </h4>
                      <p className="text-sm text-gray-500">{prevType?.name} • {prevType?.season}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(prevSubtype?.colors || prevType?.colors)?.slice(0, 8).map((color, idx) => (
                      <div key={idx} className="text-center">
                        <div 
                          className="w-10 h-10 rounded-lg shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs text-gray-400 mt-1 block truncate w-10">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Current Type */}
            <div 
              className="rounded-xl p-5 border-2"
              style={{ 
                borderColor: currentType.colors[0].hex + '40',
                background: `linear-gradient(135deg, ${currentType.colors[0].hex}10, ${currentType.colors[1]?.hex || currentType.colors[0].hex}10)` 
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Current</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentType.colors[0].hex }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {currentSubtype ? currentSubtype.name : currentType.name}
                  </h4>
                  <p className="text-sm text-gray-500">{currentType.name} • {currentType.season}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(currentSubtype?.colors || currentType.colors).slice(0, 8).map((color, idx) => (
                  <div key={idx} className="text-center">
                    <div 
                      className="w-10 h-10 rounded-lg shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs text-gray-400 mt-1 block truncate w-10">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Insights */}
          {comparisonItem.elemental_type !== profile?.elemental_type && (
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <h4 className="font-semibold text-gray-900 mb-2">What Changed?</h4>
              <p className="text-sm text-gray-600">
                Your elemental type shifted from <strong>{getTypeData(comparisonItem.elemental_type)?.name}</strong> to <strong>{currentType.name}</strong>. 
                This could reflect changes in your lifestyle, preferences, or how you perceive yourself. 
                Both palettes contain beautiful colors that suit you!
              </p>
            </div>
          )}

          {comparisonItem.elemental_type === profile?.elemental_type && 
           comparisonItem.elemental_subtype !== profile?.elemental_subtype && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">Subtype Evolution</h4>
              <p className="text-sm text-gray-600">
                While your core element ({currentType.name}) remained the same, your subtype has refined. 
                This suggests you've developed a more nuanced understanding of which specific shades work best for you.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RetakeQuizSection;
