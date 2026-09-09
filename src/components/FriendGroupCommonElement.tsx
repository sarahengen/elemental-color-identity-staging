import React, { useMemo, useState } from 'react';
import {
  Users,
  Plus,
  X,
  Sparkles,
  Flame,
  Droplets,
  Mountain,
  Wind,
  Calendar,
  Share2,
  HeartHandshake,
  RotateCcw,
} from 'lucide-react';
import {
  friendGroupProfiles,
  friendGroupSubtypeOptions,
  buildFriendGroupMember,
  analyzeFriendGroup,
  FRIEND_GROUP_MAX_MEMBERS,
  FRIEND_GROUP_ELEMENT_COLOR,
  type FriendGroupMember,
  type FriendGroupProfile,
} from '@/data/friendGroupData';
import FriendGroupShareCard from '@/components/FriendGroupShareCard';

interface FriendGroupCommonElementProps {
  userSubtype?: string | null;
}

const ELEMENT_ICONS: Record<string, React.ReactNode> = {
  fire: <Flame className="w-5 h-5" />,
  water: <Droplets className="w-5 h-5" />,
  earth: <Mountain className="w-5 h-5" />,
  air: <Wind className="w-5 h-5" />,
};

/** Single source of truth for element dot/bar colors (shared with the share card). */
const ELEMENT_DOT = FRIEND_GROUP_ELEMENT_COLOR;

const groupedOptions = friendGroupProfiles.map(profile => ({
  elementId: profile.elementId,
  elementName: profile.elementName,
  options: friendGroupSubtypeOptions.filter(o => o.elementId === profile.elementId),
}));

const FriendGroupCommonElement: React.FC<FriendGroupCommonElementProps> = ({ userSubtype }) => {
  const [members, setMembers] = useState<FriendGroupMember[]>([]);
  const [name, setName] = useState('');
  const [subtypeId, setSubtypeId] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [error, setError] = useState('');


  const analysis = useMemo(() => analyzeFriendGroup(members), [members]);
  const isFull = members.length >= FRIEND_GROUP_MAX_MEMBERS;

  const addMember = () => {
    setError('');
    if (isFull) {
      setError(`You can add up to ${FRIEND_GROUP_MAX_MEMBERS} people.`);
      return;
    }
    const option = friendGroupSubtypeOptions.find(o => o.subtypeId === subtypeId);
    if (!option) {
      setError('Choose an elemental subtype for this friend.');
      return;
    }
    const trimmed = name.trim();
    const member = buildFriendGroupMember(
      option,
      trimmed || `Friend ${members.length + 1}`,
      `${Date.now()}-${members.length}`
    );
    setMembers(prev => [...prev, member]);
    setName('');
    setSubtypeId('');
  };

  const addMe = () => {
    const option = friendGroupSubtypeOptions.find(o => o.subtypeId === userSubtype);
    if (!option || isFull) return;
    setMembers(prev => [
      ...prev,
      buildFriendGroupMember(option, 'Me', `me-${Date.now()}`),
    ]);
    setError('');
  };

  const removeMember = (id: string) => {
    setMembers(prev => {
      const next = prev.filter(m => m.id !== id);
      if (next.length < 2) {
        setShowResult(false);
        setShowShare(false);
      }
      return next;
    });
  };

  const resetGroup = () => {
    setMembers([]);
    setShowResult(false);
    setShowShare(false);
    setName('');
    setSubtypeId('');
    setError('');
  };


  const canAddMe =
    !!userSubtype &&
    friendGroupSubtypeOptions.some(o => o.subtypeId === userSubtype) &&
    !members.some(m => m.name === 'Me') &&
    !isFull;

  return (
    <div className="mt-12">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Find Your Group&apos;s Common Element</h3>
          </div>
          <p className="text-white/90 text-sm max-w-2xl">
            Add up to {FRIEND_GROUP_MAX_MEMBERS} people with their name and elemental subtype. The system
            analyzes your group&apos;s elemental composition and identifies the most recurring element — the
            common element that best represents your collective energy.
          </p>
        </div>

        {/* Add form */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addMember();
              }}
              placeholder="Name (e.g. Maya)"
              disabled={isFull}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 disabled:bg-gray-50 disabled:text-gray-400"
            />
            <select
              value={subtypeId}
              onChange={e => setSubtypeId(e.target.value)}
              disabled={isFull}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">Select their subtype...</option>
              {groupedOptions.map(group => (
                <optgroup key={group.elementId} label={group.elementName}>
                  {group.options.map(o => (
                    <option key={o.subtypeId} value={o.subtypeId}>
                      {o.subtypeName} — {o.archetypeName}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              onClick={addMember}
              disabled={isFull || !subtypeId}
              className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-xs text-gray-500">
              {members.length} of {FRIEND_GROUP_MAX_MEMBERS} added
              {isFull && ' — group is full'}
            </p>
            {canAddMe && (
              <button
                onClick={addMe}
                className="text-xs font-medium text-violet-600 hover:text-violet-800 underline underline-offset-2"
              >
                Add me with my subtype
              </button>
            )}
            {members.length > 0 && (
              <button
                onClick={resetGroup}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Start over
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}
        </div>

        {/* Members */}
        {members.length > 0 && (
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Your Friend Group</h4>
            <div className="flex flex-wrap gap-2">
              {members.map(m => (
                <div
                  key={m.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm"
                  style={{
                    borderColor: `${ELEMENT_DOT[m.elementId]}40`,
                    backgroundColor: `${ELEMENT_DOT[m.elementId]}10`,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: ELEMENT_DOT[m.elementId] }}
                  />
                  <span className="font-medium text-gray-800">{m.name}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-xs text-gray-500">{m.subtypeName}</span>
                  <button
                    onClick={() => removeMember(m.id)}
                    aria-label={`Remove ${m.name}`}
                    className="ml-1 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {members.length >= 2 ? (
              <button
                onClick={() => setShowResult(v => !v)}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {showResult ? 'Hide Common Element' : 'Find Our Common Element'}
              </button>
            ) : (
              <p className="mt-3 text-xs text-gray-500 italic">
                Add at least one more person to find your group&apos;s common element.
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {members.length === 0 && (
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-violet-400" />
            </div>
            <p className="text-gray-500 text-sm">
              Add your friends above to discover the element your group shares.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Two people minimum, up to {FRIEND_GROUP_MAX_MEMBERS}.
            </p>
          </div>
        )}

        {/* Result */}
        {showResult && analysis && (
          <div className="p-6 md:p-8 space-y-6">
            <FriendGroupResult
              profile={analysis.commonElement}
              counts={analysis.counts}
              total={members.length}
              summary={analysis.summary}
              missingElements={analysis.missingElements}
              wasTie={analysis.wasTie}
            />

            {/* Share result */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowShare(true)}
                className="px-5 py-2.5 rounded-lg text-white text-sm font-medium shadow-md hover:brightness-110 transition-all flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${analysis.commonElement.gradientFrom}, ${analysis.commonElement.gradientTo})`,
                }}
              >
                <Share2 className="w-4 h-4" />
                Share Our Result
              </button>
              <p className="text-xs text-gray-500">
                Download a shareable card with your common element, group name, and crew.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Share modal */}
      {analysis && (
        <FriendGroupShareCard
          isOpen={showShare}
          onClose={() => setShowShare(false)}
          members={members}
          analysis={analysis}
        />
      )}


      {/* Reference: all four friend groups */}
      <div className="mt-10">
        <h4 className="text-lg font-serif text-gray-900 mb-4 text-center">
          The Four Elemental Friend Groups
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {friendGroupProfiles.map(profile => (
            <FriendGroupCard key={profile.elementId} profile={profile} />
          ))}
        </div>
      </div>

      {/* Closing philosophy */}
      <div className="mt-10 rounded-2xl border border-violet-100 bg-gradient-to-br from-rose-50 via-violet-50 to-cyan-50 p-8 md:p-10 text-center">
        <p className="text-lg md:text-xl font-serif text-gray-800 italic leading-relaxed max-w-3xl mx-auto">
          &ldquo;Every friendship has its own elemental signature. When you know what yours is, you know
          how to feed it, nurture it, and let it flourish.&rdquo;
        </p>
      </div>
    </div>

  );
};

// ── Result panel ───────────────────────────────────────────────────────────────

interface FriendGroupResultProps {
  profile: FriendGroupProfile;
  counts: Record<string, number>;
  total: number;
  summary: string;
  missingElements: string[];
  wasTie: boolean;
}

const FriendGroupResult: React.FC<FriendGroupResultProps> = ({
  profile,
  counts,
  total,
  summary,
  missingElements,
  wasTie,
}) => (
  <>
    <div
      className="rounded-2xl overflow-hidden border shadow-sm"
      style={{ borderColor: `${profile.accent}40` }}
    >
      <div
        className="p-6 md:p-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`,
        }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 mb-2">
          {ELEMENT_ICONS[profile.elementId]}
          <span>Common Element: {profile.elementName}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-serif mb-2">{profile.groupName}</h3>
        <p className="text-white/90 italic">&ldquo;{profile.tagline}&rdquo;</p>
      </div>

      <div className={`p-6 md:p-8 bg-gradient-to-br ${profile.soft}`}>
        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        {wasTie && (
          <p className="mt-2 text-xs text-gray-500 italic">
            Your group is elementally balanced — the influencing elements decided the tie.
          </p>
        )}

        {/* Distribution */}
        <div className="mt-6 grid grid-cols-4 gap-3">
          {friendGroupProfiles.map(p => {
            const count = counts[p.elementId] || 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={p.elementId} className="text-center">
                <div className="w-full h-2 rounded-full bg-white/70 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: ELEMENT_DOT[p.elementId],
                      minWidth: count > 0 ? '10%' : '0%',
                    }}
                  />
                </div>
                <p className="text-xs font-medium" style={{ color: ELEMENT_DOT[p.elementId] }}>
                  {p.elementName}
                </p>
                <p className="text-xs text-gray-500">
                  {count} ({pct}%)
                </p>
              </div>
            );
          })}
        </div>
        {missingElements.length > 0 && (
          <p className="mt-3 text-xs text-gray-500">
            Not represented:{' '}
            {missingElements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}
          </p>
        )}
      </div>
    </div>

    <FriendGroupDetail profile={profile} />
  </>
);

// ── Shared detail blocks ───────────────────────────────────────────────────────

const FriendGroupDetail: React.FC<{ profile: FriendGroupProfile }> = ({ profile }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4" style={{ color: profile.accent }} />
        Core Qualities
      </h4>
      <ul className="space-y-3">
        {profile.coreQualities.map(q => (
          <li key={q.label} className="text-sm">
            <span className="font-semibold text-gray-900">{q.label}:</span>{' '}
            <span className="text-gray-600">{q.description}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4" style={{ color: profile.accent }} />

        Recommended Activities
      </h4>
      <ul className="space-y-2">
        {profile.activities.map(a => (
          <li key={a} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: profile.accent }} />
            {a}
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <HeartHandshake className="w-4 h-4" style={{ color: profile.accent }} />
        How to Thrive
      </h4>
      <ul className="space-y-2">
        {profile.thrive.map(t => (
          <li key={t} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: profile.accent }} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FriendGroupCard: React.FC<{ profile: FriendGroupProfile }> = ({ profile }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border ${profile.border} bg-white overflow-hidden`}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors"
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`,
          }}
        >
          {ELEMENT_ICONS[profile.elementId]}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: profile.accent }}>
            {profile.elementName}
          </p>
          <h5 className="text-lg font-serif text-gray-900">{profile.groupName}</h5>
          <p className="text-sm text-gray-500 italic">&ldquo;{profile.tagline}&rdquo;</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{open ? 'Hide' : 'View'}</span>
      </button>
      {open && (
        <div className={`p-5 pt-0 bg-gradient-to-br ${profile.soft}`}>
          <div className="pt-5">
            <FriendGroupDetail profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendGroupCommonElement;
