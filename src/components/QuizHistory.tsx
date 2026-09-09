import React, { useState, useEffect } from 'react';
import { History, Calendar, Sparkles, ChevronDown, ChevronUp, GitCompare, Trash2, ArrowRight, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { elementalTypes, ElementalType } from '@/data/elementalTypes';
import { toast } from '@/components/ui/use-toast';

interface QuizHistoryEntry {
  id: string;
  user_id: string;
  elemental_type: string;
  elemental_subtype: string | null;
  quiz_mode: string;
  completed_at: string;
  quiz_answers: any;
  created_at: string;
}

interface QuizHistoryProps {
  user: any;
  onStartQuiz: (mode?: 'full' | 'subtype') => void;
}

const QuizHistory: React.FC<QuizHistoryProps> = ({ user, onStartQuiz }) => {
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('quiz_history')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) {
        // If table doesn't exist yet, just show empty state instead of error
        if (error.code === '42P01' || error.message?.includes('does not exist') || error.code === 'PGRST204') {
          console.warn('quiz_history table not found — showing empty state.');
          setHistory([]);
        } else {
          console.error('Error fetching quiz history:', error);
          toast({
            title: 'Error',
            description: 'Failed to load quiz history',
            variant: 'destructive'
          });
        }
      } else {
        setHistory(data || []);
      }
    } catch (error) {
      console.error('Error fetching quiz history:', error);
    } finally {
      setLoading(false);
    }
  };


  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('quiz_history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory(prev => prev.filter(entry => entry.id !== id));
      setSelectedForCompare(prev => prev.filter(entryId => entryId !== id));
      
      toast({
        title: 'Entry deleted',
        description: 'Quiz history entry has been removed.'
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete entry',
        variant: 'destructive'
      });
    }
  };

  const getElementalType = (typeId: string): ElementalType | undefined => {
    return elementalTypes.find(t => t.id === typeId);
  };

  const getSubtype = (typeId: string, subtypeId: string | null) => {
    if (!subtypeId) return null;
    const type = getElementalType(typeId);
    return type?.subtypes.find(s => s.id === subtypeId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const toggleCompareSelection = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(entryId => entryId !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const getEvolutionInsight = () => {
    if (history.length < 2) return null;

    const typeChanges = new Map<string, number>();
    history.forEach(entry => {
      const key = entry.elemental_subtype || entry.elemental_type;
      typeChanges.set(key, (typeChanges.get(key) || 0) + 1);
    });

    const mostCommon = [...typeChanges.entries()].sort((a, b) => b[1] - a[1])[0];
    const consistency = (mostCommon[1] / history.length) * 100;

    const firstEntry = history[history.length - 1];
    const latestEntry = history[0];
    const hasChanged = firstEntry.elemental_type !== latestEntry.elemental_type ||
                       firstEntry.elemental_subtype !== latestEntry.elemental_subtype;

    return {
      mostCommonType: mostCommon[0],
      consistency: Math.round(consistency),
      hasChanged,
      totalQuizzes: history.length
    };
  };

  const selectedEntries = selectedForCompare.map(id => history.find(h => h.id === id)).filter(Boolean) as QuizHistoryEntry[];

  const insight = getEvolutionInsight();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <History className="w-6 h-6 text-purple-500" />
            Quiz History
          </h2>
          <p className="text-gray-500 mt-1">
            Track how your elemental type has evolved over time
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {history.length >= 2 && (
            <button
              onClick={() => {
                setCompareMode(!compareMode);
                if (!compareMode) {
                  setSelectedForCompare([]);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                compareMode
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              {compareMode ? 'Exit Compare' : 'Compare Results'}
            </button>
          )}
          <button
            onClick={() => onStartQuiz('full')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>

      {/* Evolution Insight Card */}
      {insight && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Your Color Journey</h3>
              <p className="text-sm text-gray-500">Insights from {insight.totalQuizzes} quiz{insight.totalQuizzes > 1 ? 'zes' : ''}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{insight.totalQuizzes}</div>
              <div className="text-xs text-gray-500">Total Quizzes</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-indigo-600">{insight.consistency}%</div>
              <div className="text-xs text-gray-500">Consistency</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-gray-900 capitalize">{insight.mostCommonType.replace(/-/g, ' ')}</div>
              <div className="text-xs text-gray-500">Most Common</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className={`text-lg font-bold ${insight.hasChanged ? 'text-amber-600' : 'text-green-600'}`}>
                {insight.hasChanged ? 'Evolved' : 'Stable'}
              </div>
              <div className="text-xs text-gray-500">Journey Status</div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Mode Selection */}
      {compareMode && selectedForCompare.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                {selectedForCompare.length}/2 selected for comparison
              </span>
            </div>
            {selectedForCompare.length === 2 && (
              <span className="text-sm text-purple-600">Scroll down to see comparison</span>
            )}
          </div>
        </div>
      )}

      {/* History List */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((entry, index) => {
            const type = getElementalType(entry.elemental_type);
            const subtype = getSubtype(entry.elemental_type, entry.elemental_subtype);
            const colors = subtype?.colors || type?.colors || [];
            const isExpanded = expandedEntry === entry.id;
            const isSelected = selectedForCompare.includes(entry.id);
            const isLatest = index === 0;

            return (
              <div
                key={entry.id}
                className={`bg-white rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-purple-400 ring-2 ring-purple-200' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${compareMode ? 'cursor-pointer' : ''}`}
                onClick={() => compareMode && toggleCompareSelection(entry.id)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Color indicator */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: colors.length > 0 
                          ? `linear-gradient(135deg, ${colors[0].hex}, ${colors[1]?.hex || colors[0].hex})`
                          : '#e5e7eb'
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">
                          {subtype?.name || type?.name || 'Unknown Type'}
                        </h3>
                        {isLatest && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                          {entry.quiz_mode} quiz
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {type?.name} Element • {type?.season} Season
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeDate(entry.completed_at)}</span>
                        <span>•</span>
                        <span>{formatDate(entry.completed_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {compareMode ? (
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-purple-600 border-purple-600' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <span className="text-white text-xs font-bold">
                              {selectedForCompare.indexOf(entry.id) + 1}
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedEntry(isExpanded ? null : entry.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Delete this quiz history entry?')) {
                                deleteEntry(entry.id);
                              }
                            }}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && !compareMode && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {/* Color Palette Preview */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Color Palette</p>
                        <div className="flex gap-2 flex-wrap">
                          {colors.slice(0, 8).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-10 h-10 rounded-lg shadow-sm"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                          {colors.length > 8 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                              +{colors.length - 8}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Characteristics */}
                      {(subtype?.characteristics || type?.characteristics) && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Characteristics</p>
                          <div className="flex flex-wrap gap-2">
                            {(subtype?.characteristics || type?.characteristics || []).slice(0, 4).map((char, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <History className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-serif text-gray-900 mb-2">No Quiz History Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Take the elemental color quiz to start tracking your color journey over time.
          </p>
          <button
            onClick={() => onStartQuiz('full')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Take the Quiz
          </button>
        </div>
      )}

      {/* Comparison View */}
      {compareMode && selectedEntries.length === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-serif text-gray-900 mb-6 flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-purple-500" />
            Comparison View
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {selectedEntries.map((entry, idx) => {
              const type = getElementalType(entry.elemental_type);
              const subtype = getSubtype(entry.elemental_type, entry.elemental_subtype);
              const colors = subtype?.colors || type?.colors || [];

              return (
                <div key={entry.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: colors.length > 0 
                          ? `linear-gradient(135deg, ${colors[0].hex}, ${colors[1]?.hex || colors[0].hex})`
                          : '#e5e7eb'
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {subtype?.name || type?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatRelativeDate(entry.completed_at)}
                      </p>
                    </div>
                  </div>

                  {/* Element & Season */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Element:</span>
                        <span className="ml-2 font-medium text-gray-900">{type?.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Season:</span>
                        <span className="ml-2 font-medium text-gray-900">{type?.season}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Palette</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {colors.slice(0, 6).map((color, colorIdx) => (
                        <div
                          key={colorIdx}
                          className="w-8 h-8 rounded-lg shadow-sm"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Characteristics</p>
                    <div className="space-y-1">
                      {(subtype?.characteristics || type?.characteristics || []).slice(0, 3).map((char, charIdx) => (
                        <div key={charIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: colors[0]?.hex || '#666' }}
                          />
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Summary */}
          {selectedEntries[0].elemental_type !== selectedEntries[1].elemental_type || 
           selectedEntries[0].elemental_subtype !== selectedEntries[1].elemental_subtype ? (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Your type has evolved!</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Your elemental type changed from{' '}
                  <strong>
                    {getSubtype(selectedEntries[1].elemental_type, selectedEntries[1].elemental_subtype)?.name || 
                     getElementalType(selectedEntries[1].elemental_type)?.name}
                  </strong>
                  {' '}to{' '}
                  <strong>
                    {getSubtype(selectedEntries[0].elemental_type, selectedEntries[0].elemental_subtype)?.name || 
                     getElementalType(selectedEntries[0].elemental_type)?.name}
                  </strong>
                  . This could reflect personal growth or changes in your preferences.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Consistent results!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your elemental type has remained consistent across these quizzes. 
                  This suggests a strong alignment with your{' '}
                  <strong>
                    {getSubtype(selectedEntries[0].elemental_type, selectedEntries[0].elemental_subtype)?.name || 
                     getElementalType(selectedEntries[0].elemental_type)?.name}
                  </strong>
                  {' '}colors.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
