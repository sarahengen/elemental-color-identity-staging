import React, { useState } from 'react';
import { Bookmark, ChevronDown, Trash2, Loader2 } from 'lucide-react';
import type {
  ColorAnalyzerScan,
  ColorScanScoreFilter,
} from '@/hooks/useSavedColorScans';

const FILTERS: { id: ColorScanScoreFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'strong', label: 'Strong (70+)' },
  { id: 'okay', label: 'Okay (50–69)' },
  { id: 'weak', label: 'Weak (<50)' },
];

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function scoreTone(score: number): string {
  if (score >= 70) return 'bg-green-100 text-green-800';
  if (score >= 50) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

interface SavedColorScansProps {
  signedIn: boolean;
  scans: ColorAnalyzerScan[];
  filteredScans: ColorAnalyzerScan[];
  loading: boolean;
  scoreFilter: ColorScanScoreFilter;
  onFilterChange: (filter: ColorScanScoreFilter) => void;
  onDelete: (scanId: string) => void;
  onRevisit: (scan: ColorAnalyzerScan) => void;
  onRequestAuth?: () => void;
}

const SavedColorScans: React.FC<SavedColorScansProps> = ({
  signedIn,
  scans,
  filteredScans,
  loading,
  scoreFilter,
  onFilterChange,
  onDelete,
  onRevisit,
  onRequestAuth,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!signedIn) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6 text-center">
        <p className="text-sm text-gray-600">
          Sign in to save and sync Color Analyzer scans across mobile and desktop.
        </p>
        {onRequestAuth && (
          <button
            type="button"
            onClick={onRequestAuth}
            className="mt-3 text-sm font-medium text-gray-900 underline underline-offset-2"
          >
            Sign in
          </button>
        )}
      </div>
    );
  }

  const handleDelete = async (scanId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved scan?')) return;
    setDeletingId(scanId);
    await onDelete(scanId);
    setDeletingId(null);
    if (expandedId === scanId) setExpandedId(null);
  };

  return (
    <div id="saved-scans" className="mt-10 scroll-mt-24">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-serif text-gray-900">My Saved Scans</h3>
          <span className="text-sm text-gray-500">({scans.length})</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              scoreFilter === f.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Loading scans…</span>
        </div>
      )}

      {!loading && scans.length === 0 && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-8 text-center">
          <p className="text-sm text-gray-600">
            No saved scans yet — analyze a color and tap Save scan.
          </p>
        </div>
      )}

      {!loading && scans.length > 0 && filteredScans.length === 0 && (
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-8 text-center">
          <p className="text-sm text-gray-600">No scans match this filter.</p>
        </div>
      )}

      {!loading && filteredScans.length > 0 && (
        <ul className="space-y-3">
          {filteredScans.map((scan) => {
            const expanded = expandedId === scan.id;
            return (
              <li
                key={scan.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : scan.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    {scan.imageUrl ? (
                      <img
                        src={scan.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: scan.hex }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${scoreTone(scan.score)}`}
                      >
                        {scan.score}% · {scan.verdict}
                      </span>
                      <span className="text-xs text-gray-500">{relativeTime(scan.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-3 h-3 rounded-full border border-gray-200 shrink-0"
                        style={{ backgroundColor: scan.hex }}
                      />
                      <span className="text-sm text-gray-700 font-mono">{scan.hex}</span>
                    </div>
                    {scan.note && (
                      <p className="text-sm text-gray-500 truncate mt-0.5">{scan.note}</p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {expanded && (
                  <div className="px-3 pb-3 pt-0 border-t border-gray-100 space-y-3">
                    <div className="pt-3 text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium text-gray-800">Detected:</span>{' '}
                        <span className="font-mono">{scan.hex}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">Saved:</span>{' '}
                        {new Date(scan.created_at).toLocaleString()}
                      </p>
                      {scan.note && (
                        <p>
                          <span className="font-medium text-gray-800">Note:</span> {scan.note}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onRevisit(scan)}
                        className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        View again
                      </button>
                      <button
                        type="button"
                        onClick={(e) => void handleDelete(scan.id, e)}
                        disabled={deletingId === scan.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        {deletingId === scan.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavedColorScans;
