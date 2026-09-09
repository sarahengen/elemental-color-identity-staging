import React, { useState, useMemo } from 'react';
import { Clock, BarChart3, Plus, X, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Sparkles, AlertTriangle, CheckCircle, Target, Flame, Droplets, Mountain, Wind } from 'lucide-react';

interface TimeEntry {
  id: string;
  name: string;
  hoursPerWeek: number;
  isAligned: boolean;
  isCustom: boolean;
}

interface HobbiesTimeMapProps {
  pastimes: string[];
  subtypeName: string;
  subtypeLabel: string;
  elementGradientFrom: string;
  elementGradientTo: string;
  elementId: string;
}

const TOTAL_FREE_HOURS_PER_WEEK = 40; // Approximate free hours per week

const HobbiesTimeMap: React.FC<HobbiesTimeMapProps> = ({
  pastimes,
  subtypeName,
  subtypeLabel,
  elementGradientFrom,
  elementGradientTo,
  elementId,
}) => {
  const [entries, setEntries] = useState<TimeEntry[]>(() =>
    pastimes.map((p, i) => ({
      id: `aligned-${i}`,
      name: p,
      hoursPerWeek: 0,
      isAligned: true,
      isCustom: false,
    }))
  );

  const [customActivityName, setCustomActivityName] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const addCustomActivity = () => {
    if (!customActivityName.trim()) return;
    setEntries(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customActivityName.trim(),
        hoursPerWeek: 0,
        isAligned: false,
        isCustom: true,
      },
    ]);
    setCustomActivityName('');
    setShowAddCustom(false);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const updateHours = (id: string, hours: number) => {
    setEntries(prev =>
      prev.map(e => (e.id === id ? { ...e, hoursPerWeek: Math.max(0, Math.min(20, hours)) } : e))
    );
  };

  const stats = useMemo(() => {
    const alignedEntries = entries.filter(e => e.isAligned);
    const unalignedEntries = entries.filter(e => !e.isAligned);
    const alignedHours = alignedEntries.reduce((sum, e) => sum + e.hoursPerWeek, 0);
    const unalignedHours = unalignedEntries.reduce((sum, e) => sum + e.hoursPerWeek, 0);
    const totalTracked = alignedHours + unalignedHours;
    const activeAligned = alignedEntries.filter(e => e.hoursPerWeek > 0).length;
    const totalAligned = alignedEntries.length;
    const alignmentPercentage = totalTracked > 0 ? Math.round((alignedHours / totalTracked) * 100) : 0;
    const unaccountedHours = Math.max(0, TOTAL_FREE_HOURS_PER_WEEK - totalTracked);

    // Score from 0-100
    let alignmentScore = 0;
    if (totalTracked > 0) {
      // Weighted: percentage of aligned time + bonus for variety
      const percentageScore = (alignedHours / totalTracked) * 60;
      const varietyScore = Math.min(30, (activeAligned / Math.max(1, totalAligned)) * 30);
      const volumeScore = Math.min(10, (alignedHours / 10) * 10);
      alignmentScore = Math.round(percentageScore + varietyScore + volumeScore);
    }

    return {
      alignedHours,
      unalignedHours,
      totalTracked,
      activeAligned,
      totalAligned,
      alignmentPercentage,
      unaccountedHours,
      alignmentScore,
    };
  }, [entries]);

  const getScoreLabel = (score: number) => {
    if (score === 0) return { label: 'Not Yet Tracked', color: 'text-gray-400', bg: 'bg-gray-100' };
    if (score < 25) return { label: 'Deeply Misaligned', color: 'text-red-600', bg: 'bg-red-50' };
    if (score < 45) return { label: 'Drifting', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score < 65) return { label: 'Finding Your Way', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (score < 80) return { label: 'Coming Into Alignment', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    return { label: 'Elementally Restored', color: 'text-green-700', bg: 'bg-green-50' };
  };

  const getScoreMessage = (score: number) => {
    if (score === 0) return 'Use the sliders below to log how many hours per week you spend on each activity. Be honest—this is for you.';
    if (score < 25) return 'Your free time is mostly spent on activities that don\'t restore your elemental nature. Consider shifting even one hour toward an aligned pastime this week.';
    if (score < 45) return 'You\'re spending some time on aligned activities, but most of your restoration time is going elsewhere. Your element is whispering—can you hear it?';
    if (score < 65) return 'You\'re beginning to honor your elemental nature in how you rest. Keep leaning into the pastimes that make you feel truly restored.';
    if (score < 80) return 'Your free time is increasingly aligned with your elemental nature. You\'re likely noticing that your days off actually leave you feeling renewed.';
    return 'You are spending your sacred recovery time in deep alignment with your elemental nature. This is how the soul restores itself.';
  };

  const scoreInfo = getScoreLabel(stats.alignmentScore);

  const getElementIcon = () => {
    switch (elementId) {
      case 'fire': return <Flame className="w-4 h-4" />;
      case 'water': return <Droplets className="w-4 h-4" />;
      case 'earth': return <Mountain className="w-4 h-4" />;
      case 'air': return <Wind className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const alignedEntries = entries.filter(e => e.isAligned);
  const unalignedEntries = entries.filter(e => !e.isAligned);

  return (
    <div className="mt-6 rounded-xl border-2 overflow-hidden" style={{ borderColor: `${elementGradientFrom}30` }}>
      {/* Header */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full px-5 py-4 flex items-center justify-between transition-colors hover:opacity-90"
        style={{
          background: `linear-gradient(135deg, ${elementGradientFrom}12, ${elementGradientTo}12)`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${elementGradientFrom}, ${elementGradientTo})` }}
          >
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h5 className="font-bold text-gray-900 text-sm">Time Map: How Aligned Is Your Rest?</h5>
            <p className="text-xs text-gray-500">Track how you spend your free time vs. your elemental pastimes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {stats.alignmentScore > 0 && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${scoreInfo.bg} ${scoreInfo.color}`}>
              {stats.alignmentScore}/100
            </div>
          )}
          {showDetails ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {showDetails && (
        <div className="p-5 bg-white space-y-6">
          {/* Score Dashboard */}
          <div
            className="rounded-xl p-5"
            style={{ background: `linear-gradient(135deg, ${elementGradientFrom}08, ${elementGradientTo}08)` }}
          >
            <div className="flex flex-col md:flex-row gap-5">
              {/* Score Circle */}
              <div className="flex flex-col items-center justify-center min-w-[140px]">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={elementGradientFrom}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(stats.alignmentScore / 100) * 327} 327`}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: elementGradientFrom }}>
                      {stats.alignmentScore}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">ALIGNMENT</span>
                  </div>
                </div>
                <span className={`mt-2 text-xs font-bold ${scoreInfo.color}`}>{scoreInfo.label}</span>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: elementGradientFrom }} />
                    <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Aligned Hours</span>
                  </div>
                  <p className="text-xl font-bold" style={{ color: elementGradientFrom }}>
                    {stats.alignedHours}
                    <span className="text-xs font-normal text-gray-400">/wk</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Other Hours</span>
                  </div>
                  <p className="text-xl font-bold text-gray-600">
                    {stats.unalignedHours}
                    <span className="text-xs font-normal text-gray-400">/wk</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Target className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Active Pastimes</span>
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {stats.activeAligned}
                    <span className="text-xs font-normal text-gray-400">/{stats.totalAligned}</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">Alignment %</span>
                  </div>
                  <p className="text-xl font-bold text-purple-600">
                    {stats.alignmentPercentage}
                    <span className="text-xs font-normal text-gray-400">%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4 p-3 rounded-lg bg-white/80 border border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed italic">{getScoreMessage(stats.alignmentScore)}</p>
            </div>
          </div>

          {/* Visual Time Bar */}
          {stats.totalTracked > 0 && (
            <div>
              <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Your Weekly Free Time Breakdown
              </h6>
              <div className="h-8 rounded-full overflow-hidden flex bg-gray-100 shadow-inner">
                {stats.alignedHours > 0 && (
                  <div
                    className="h-full flex items-center justify-center text-white text-[10px] font-bold transition-all duration-500 min-w-[2px]"
                    style={{
                      width: `${(stats.alignedHours / TOTAL_FREE_HOURS_PER_WEEK) * 100}%`,
                      background: `linear-gradient(135deg, ${elementGradientFrom}, ${elementGradientTo})`,
                    }}
                  >
                    {stats.alignedHours >= 3 && `${stats.alignedHours}h aligned`}
                  </div>
                )}
                {stats.unalignedHours > 0 && (
                  <div
                    className="h-full flex items-center justify-center text-white text-[10px] font-bold bg-gray-400 transition-all duration-500 min-w-[2px]"
                    style={{ width: `${(stats.unalignedHours / TOTAL_FREE_HOURS_PER_WEEK) * 100}%` }}
                  >
                    {stats.unalignedHours >= 3 && `${stats.unalignedHours}h other`}
                  </div>
                )}
                {stats.unaccountedHours > 0 && (
                  <div
                    className="h-full flex items-center justify-center text-gray-400 text-[10px] font-medium transition-all duration-500"
                    style={{ width: `${(stats.unaccountedHours / TOTAL_FREE_HOURS_PER_WEEK) * 100}%` }}
                  >
                    {stats.unaccountedHours >= 5 && `${stats.unaccountedHours}h untracked`}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: elementGradientFrom }} />
                  Aligned pastimes
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  Other activities
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  Untracked (~{TOTAL_FREE_HOURS_PER_WEEK}h/wk total)
                </div>
              </div>
            </div>
          )}

          {/* Aligned Pastimes Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {getElementIcon()}
              <h6 className="text-sm font-bold" style={{ color: elementGradientFrom }}>
                Aligned Pastimes — {subtypeLabel}
              </h6>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              These are the pastimes that restore your {subtypeName} nature. How many hours per week do you currently spend on each?
            </p>
            <div className="space-y-2">
              {alignedEntries.map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 rounded-lg border transition-all"
                  style={{
                    borderColor: entry.hoursPerWeek > 0 ? `${elementGradientFrom}40` : '#e5e7eb',
                    background: entry.hoursPerWeek > 0 ? `${elementGradientFrom}06` : 'white',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: entry.hoursPerWeek > 0 ? elementGradientFrom : '#d1d5db' }}
                  />
                  <span className={`flex-1 text-sm ${entry.hoursPerWeek > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {entry.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateHours(entry.id, entry.hoursPerWeek - 0.5)}
                      className="w-7 h-7 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-16 text-center">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={entry.hoursPerWeek}
                        onChange={e => updateHours(entry.id, parseFloat(e.target.value) || 0)}
                        className="w-full text-center text-sm font-bold bg-transparent border-none outline-none"
                        style={{ color: entry.hoursPerWeek > 0 ? elementGradientFrom : '#9ca3af' }}
                      />
                      <span className="text-[9px] text-gray-400 uppercase">hrs/wk</span>
                    </div>
                    <button
                      onClick={() => updateHours(entry.id, entry.hoursPerWeek + 0.5)}
                      className="w-7 h-7 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unaligned / Custom Activities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-gray-400" />
                <h6 className="text-sm font-bold text-gray-600">Other Activities (Non-Aligned)</h6>
              </div>
              <button
                onClick={() => setShowAddCustom(!showAddCustom)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
              >
                <Plus className="w-3 h-3" />
                Add Activity
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add activities you spend time on that aren't in your aligned pastimes list. This helps measure your overall alignment.
            </p>

            {showAddCustom && (
              <div className="flex items-center gap-2 mb-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <input
                  type="text"
                  value={customActivityName}
                  onChange={e => setCustomActivityName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustomActivity()}
                  placeholder="e.g., Scrolling social media, Watching TV..."
                  className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-gray-400"
                />
                <button
                  onClick={addCustomActivity}
                  disabled={!customActivityName.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-40"
                  style={{ background: elementGradientFrom }}
                >
                  Add
                </button>
                <button
                  onClick={() => { setShowAddCustom(false); setCustomActivityName(''); }}
                  className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {unalignedEntries.length > 0 ? (
              <div className="space-y-2">
                {unalignedEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white transition-all"
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0 bg-gray-300" />
                    <span className="flex-1 text-sm text-gray-600">{entry.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateHours(entry.id, entry.hoursPerWeek - 0.5)}
                        className="w-7 h-7 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <div className="w-16 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          value={entry.hoursPerWeek}
                          onChange={e => updateHours(entry.id, parseFloat(e.target.value) || 0)}
                          className="w-full text-center text-sm font-bold bg-transparent border-none outline-none text-gray-500"
                        />
                        <span className="text-[9px] text-gray-400 uppercase">hrs/wk</span>
                      </div>
                      <button
                        onClick={() => updateHours(entry.id, entry.hoursPerWeek + 0.5)}
                        className="w-7 h-7 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {entry.isCustom && (
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-gray-200 text-center">
                <p className="text-xs text-gray-400">
                  No other activities added yet. Add activities like scrolling social media, watching TV, or other pastimes to see your full picture.
                </p>
              </div>
            )}
          </div>

          {/* Individual Pastime Bars */}
          {stats.totalTracked > 0 && (
            <div>
              <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Activity Breakdown
              </h6>
              <div className="space-y-2">
                {entries
                  .filter(e => e.hoursPerWeek > 0)
                  .sort((a, b) => b.hoursPerWeek - a.hoursPerWeek)
                  .map(entry => {
                    const maxHours = Math.max(...entries.map(e => e.hoursPerWeek), 1);
                    const widthPercent = (entry.hoursPerWeek / maxHours) * 100;
                    return (
                      <div key={entry.id} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-32 truncate text-right flex-shrink-0" title={entry.name}>
                          {entry.name}
                        </span>
                        <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                            style={{
                              width: `${Math.max(widthPercent, 8)}%`,
                              background: entry.isAligned
                                ? `linear-gradient(135deg, ${elementGradientFrom}, ${elementGradientTo})`
                                : '#9ca3af',
                            }}
                          >
                            <span className="text-[9px] font-bold text-white">{entry.hoursPerWeek}h</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Insight / Recommendation */}
          {stats.totalTracked > 0 && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: `linear-gradient(135deg, ${elementGradientFrom}06, ${elementGradientTo}06)`,
                borderColor: `${elementGradientFrom}20`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: `linear-gradient(135deg, ${elementGradientFrom}, ${elementGradientTo})` }}
                >
                  {stats.alignmentScore >= 65 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : stats.alignmentScore >= 35 ? (
                    <Target className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h6 className="text-sm font-bold text-gray-900 mb-1">
                    {stats.alignmentScore >= 65
                      ? 'Your Rest Is Working'
                      : stats.alignmentScore >= 35
                      ? 'A Gentle Shift Would Help'
                      : 'Your Element Needs Attention'}
                  </h6>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stats.alignmentScore >= 65 ? (
                      <>
                        You're spending <strong>{stats.alignedHours} hours per week</strong> on pastimes aligned with your {subtypeName} nature.
                        {stats.activeAligned === stats.totalAligned
                          ? ' Remarkably, you\'re engaging with every single one of your aligned pastimes. This is rare and beautiful.'
                          : ` You're actively practicing ${stats.activeAligned} of your ${stats.totalAligned} aligned pastimes. Consider exploring the others when you feel ready.`}
                      </>
                    ) : stats.alignmentScore >= 35 ? (
                      <>
                        You're spending <strong>{stats.unalignedHours} hours</strong> on non-aligned activities vs. <strong>{stats.alignedHours} hours</strong> on aligned ones.
                        Try moving just <strong>2 hours</strong> from a non-aligned activity to one of your untouched pastimes this week.
                        {stats.activeAligned < stats.totalAligned && (
                          <> You have {stats.totalAligned - stats.activeAligned} aligned pastimes you haven't tried yet—start with just 30 minutes.</>
                        )}
                      </>
                    ) : (
                      <>
                        Most of your free time ({stats.unalignedHours} hours) is going to activities that don't restore your elemental nature.
                        This week, try replacing just <strong>one hour</strong> of a non-aligned activity with any pastime from your aligned list.
                        Even small shifts can begin to restore what's been depleted.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HobbiesTimeMap;
