import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MessageSquare, ChevronUp, Search, Plus, Filter, Clock,
  TrendingUp, Flame, Droplets, Mountain, Wind, Loader2,
  Users, Image as ImageIcon, ArrowRight, X, UserCircle, Sparkles, Star, TreePine, Sprout, Lock
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import ForumCreateThread from './ForumCreateThread';
import ForumThreadDetail from './ForumThreadDetail';
import ForumUserProfileCard from './ForumUserProfileCard';
import { getForumCategoryDisplay } from '@/lib/forumCategoryLabels';
import {
  getRootsCategoriesForElementFilter,
  getAllRootsCategoryOptions,
  getRootsCategoryIdsForQuery,
} from '@/data/rootsForumConfig';

interface CommunityForumProps {
  user: any;
  profile: any;
  onAuthRequired: () => void;
  /** Public forum excludes roots categories; Roots forum only lists sacred-space threads. */
  forumMode?: 'public' | 'roots';
}

const CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: MessageSquare, color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
  { id: 'general', label: 'General', icon: MessageSquare, color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
  { id: 'results', label: 'Share Results', icon: TrendingUp, color: '#8B5CF6', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  { id: 'color-matching', label: 'Color Matching', icon: Filter, color: '#EC4899', gradient: 'linear-gradient(135deg, #DB2777, #F472B6)' },
  { id: 'outfit-feedback', label: 'Outfit Feedback', icon: ImageIcon, color: '#F59E0B', gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
  { id: 'tips', label: 'Tips & Tricks', icon: TrendingUp, color: '#10B981', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  { id: 'questions', label: 'Questions', icon: MessageSquare, color: '#3B82F6', gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
];

const ELEMENT_FILTERS = [
  { id: 'all', label: 'All Elements', icon: Users, gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)', color: '#6B7280' },
  { id: 'fire', label: 'Fire', icon: Flame, gradient: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)', color: '#C41E3A' },
  { id: 'water', label: 'Water', icon: Droplets, gradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)', color: '#6B8BA4' },
  { id: 'earth', label: 'Earth', icon: Mountain, gradient: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)', color: '#8B4513' },
  { id: 'air', label: 'Air', icon: Wind, gradient: 'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)', color: '#00CED1' },
];

const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; lightGradient: string; accent: string }> = {
  fire: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', gradient: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)', lightGradient: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)', accent: '#C41E3A' },
  water: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)', lightGradient: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', accent: '#6B8BA4' },
  earth: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)', lightGradient: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', accent: '#8B4513' },
  air: { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-200', gradient: 'linear-gradient(135deg, #0891B2, #00CED1, #FFE135)', lightGradient: 'linear-gradient(135deg, #ECFEFF, #CFFAFE)', accent: '#00CED1' },
};

const SUBTYPE_NAMES: Record<string, string> = {
  'fire-fire': 'Pure Fire', 'fire-earth': 'Fire-Earth', 'fire-air': 'Fire+Air', 'fire-water': 'Fire+Water',
  'water-water': 'Pure Water', 'water-air': 'Water-Air', 'water-earth': 'Water-Earth', 'water-fire': 'Water-Fire',
  'earth-earth': 'Pure Earth', 'earth-fire': 'Earth-Fire', 'earth-water': 'Earth-Water', 'earth-air': 'Earth-Air',
  'air-air': 'Pure Air', 'air-water': 'Air+Water', 'air-fire': 'Air+Fire', 'air-earth': 'Air+Earth',

};


const ELEMENT_AVATAR_COLORS: Record<string, string> = {
  fire: '#C41E3A',
  water: '#6B8BA4',
  earth: '#8B4513',
  air: '#00CED1',
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function getIsoWeekNumber(date: Date): number {
  // ISO week date weeks start on Monday.
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const CommunityForum: React.FC<CommunityForumProps> = ({ user, profile, onAuthRequired, forumMode = 'public' }) => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeElement, setActiveElement] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'top' | 'active'>('newest');
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());
  const [threadCount, setThreadCount] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDayPassModal, setShowDayPassModal] = useState(false);
  const [dayPassTargetRootCategoryId, setDayPassTargetRootCategoryId] = useState<string | null>(null);
  const [dayPassTick, setDayPassTick] = useState(0);
  const [dayPassQuestion, setDayPassQuestion] = useState('');

  const [showRitualModal, setShowRitualModal] = useState(false);
  const [ritualDraft, setRitualDraft] = useState('');
  const [ritualMarking, setRitualMarking] = useState(false);
  const [ritualCompletedThisWeek, setRitualCompletedThisWeek] = useState(false);
  const [rootsOathAgreed, setRootsOathAgreed] = useState(false);

  const rootsAccessibleRootCategoryIds = useMemo(() => {
    if (forumMode !== 'roots') return [];

    const tier = profile?.membership_tier?.toLowerCase();
    const hasRootsAccess =
      tier === 'expression' ||
      tier === 'pro' ||
      tier === 'discovery' ||
      tier === 'premium' ||
      tier === 'professional' ||
      profile?.workshop_unlocked === true ||
      profile?.subtype_profile_unlocked === true;

    if (!hasRootsAccess) return [];

    return getAllRootsCategoryOptions().map((o) => o.id);
  }, [
    forumMode,
    profile?.membership_tier,
    profile?.subtype_profile_unlocked,
    profile?.workshop_unlocked,
  ]);

  const rootsTopicCategories = useMemo(() => {
    const spaces =
      activeElement === 'all'
        ? getAllRootsCategoryOptions()
        : getRootsCategoriesForElementFilter(activeElement as 'fire' | 'water' | 'earth' | 'air');
    const allRow = {
      id: 'all',
      label: 'All Root Forums',
      icon: TreePine,
      color: '#059669',
      gradient: 'linear-gradient(135deg, #065F46, #10B981, #34D399)',
    };
    return [
      allRow,
      ...spaces.map((o) => ({
        id: o.id,
        label: o.shortLabel,
        icon: Sprout,
        color: '#6B7280',
        gradient: o.gradient,
        locked: forumMode === 'roots' && !rootsAccessibleRootCategoryIds.includes(o.id),
      })),
    ];
  }, [activeElement, forumMode, rootsAccessibleRootCategoryIds]);

  const topicCategories = forumMode === 'roots' ? rootsTopicCategories : CATEGORIES;
  const rootsReadOnlyForActiveRoot =
    forumMode === 'roots' && activeCategory !== 'all' && !rootsAccessibleRootCategoryIds.includes(activeCategory);

  const ritualWeekNumber = getIsoWeekNumber(new Date());
  const rawRitualElement =
    forumMode === 'roots'
      ? activeCategory !== 'all'
        ? activeCategory.split('-')[1]
        : activeElement !== 'all'
          ? activeElement
          : profile?.elemental_type
      : 'earth';

  const ritualElement = (['fire', 'water', 'earth', 'air'] as const).includes(rawRitualElement as any)
    ? (rawRitualElement as 'fire' | 'water' | 'earth' | 'air')
    : 'earth';

  const ritualInfo = useMemo(() => {
    const elementTitleMap: Record<string, { title: string; schedule?: string; vibe: string; focusLine: string }> = {
      earth: {
        title: 'Grounding Check-In',
        schedule: 'Monday',
        vibe: 'Return to your body. Slow down. Listen for truth under the surface.',
        focusLine: 'Earth Root',
      },
      fire: {
        title: 'Spark Ignition',
        vibe: 'Name the intention. Light what matters. Move with brave clarity.',
        focusLine: 'Fire Root',
      },
      water: {
        title: 'Tide Release',
        vibe: 'Release what you’ve been carrying. Let emotion move through safely.',
        focusLine: 'Water Root',
      },
      air: {
        title: 'Mind-Sweep',
        vibe: 'Clear mental clutter. Choose one insight. Speak it gently but clearly.',
        focusLine: 'Air Root',
      },
    };

    return elementTitleMap[ritualElement];
  }, [ritualElement]);

  const ritualCompletionKey = user?.id
    ? `elemental-color-roots-ritual-complete-${user.id}-${ritualElement}-${ritualWeekNumber}`
    : null;

  useEffect(() => {
    if (forumMode !== 'roots' || !ritualCompletionKey) return;
    try {
      setRitualCompletedThisWeek(localStorage.getItem(ritualCompletionKey) === '1');
    } catch {
      setRitualCompletedThisWeek(false);
    }
  }, [forumMode, ritualCompletionKey, dayPassTick]);

  const rootsOathKey = user?.id ? `elemental-color-roots-confidentiality-oath-${user.id}` : null;
  useEffect(() => {
    if (forumMode !== 'roots' || !rootsOathKey) return;
    try {
      setRootsOathAgreed(localStorage.getItem(rootsOathKey) === '1');
    } catch {
      setRootsOathAgreed(false);
    }
  }, [forumMode, rootsOathKey, dayPassTick]);

  useEffect(() => {
    if (forumMode === 'roots') {
      setActiveCategory('all');
    }
  }, [activeElement, forumMode]);

  // Profile card state
  const [profileCardUser, setProfileCardUser] = useState<{
    userId: string;
    authorName: string;
    authorElement: string | null;
    authorSubtype: string | null;
  } | null>(null);
  const [profileCardAnchor, setProfileCardAnchor] = useState<DOMRect | null>(null);

  // Filter by user state
  const [filterByUserId, setFilterByUserId] = useState<string | null>(null);
  const [filterByUserName, setFilterByUserName] = useState<string | null>(null);

  const fetchThreads = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('forum_threads')
        .select('*', { count: 'exact' });

      if (filterByUserId) {
        query = query.eq('user_id', filterByUserId);
      }

      if (forumMode === 'roots') {
        if (activeCategory !== 'all') {
          const rootIds = getRootsCategoryIdsForQuery(activeCategory);
          query = query.in('category', rootIds);
        } else if (activeElement !== 'all') {
          query = query.like('category', `roots-${activeElement}-%`);
        } else {
          query = query.like('category', 'roots-%');
        }
      } else {
        if (activeCategory !== 'all') {
          query = query.eq('category', activeCategory);
        } else {
          query = query.not('category', 'like', 'roots-%');
        }
        if (activeElement !== 'all') {
          query = query.eq('elemental_type', activeElement);
        }
      }
      if (searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery.trim()}%,body.ilike.%${searchQuery.trim()}%`);
      }

      if (sortBy === 'top') {
        query = query.order('upvotes_count', { ascending: false });
      } else if (sortBy === 'active') {
        query = query.order('replies_count', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      query = query.limit(50);

      const { data, error, count } = await query;
      if (error) throw error;
      setThreads(data || []);
      setThreadCount(count || 0);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeElement, searchQuery, sortBy, filterByUserId, forumMode]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  useEffect(() => {
    if (user) fetchUserUpvotes();
  }, [user]);

  const fetchUserUpvotes = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('forum_upvotes')
        .select('thread_id, reply_id')
        .eq('user_id', user.id);
      const upvoteSet = new Set<string>();
      data?.forEach((u: any) => {
        if (u.thread_id) upvoteSet.add(`thread-${u.thread_id}`);
        if (u.reply_id) upvoteSet.add(`reply-${u.reply_id}`);
      });
      setUserUpvotes(upvoteSet);
    } catch (error) {
      console.error('Error fetching upvotes:', error);
    }
  };

  const handleUpvoteThread = async (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    if (!user) { onAuthRequired(); return; }
    const key = `thread-${threadId}`;
    const hasUpvoted = userUpvotes.has(key);

    try {
      if (hasUpvoted) {
        const { error } = await supabase.from('forum_upvotes').delete()
          .eq('user_id', user.id).eq('thread_id', threadId);
        if (error) throw error;
        setUserUpvotes(prev => { const n = new Set(prev); n.delete(key); return n; });
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, upvotes_count: Math.max(0, (t.upvotes_count || 0) - 1) } : t));
      } else {
        const { error } = await supabase.from('forum_upvotes').insert({
          user_id: user.id, thread_id: threadId,
        });
        if (error) throw error;
        setUserUpvotes(prev => new Set(prev).add(key));
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, upvotes_count: (t.upvotes_count || 0) + 1 } : t));
      }
    } catch (error) {
      console.error('Error toggling upvote:', error);
      toast({ title: 'Error', description: 'Failed to update upvote. Please try again.', variant: 'destructive' });
    }
  };


  const handleAuthorClick = (e: React.MouseEvent, thread: any) => {
    e.stopPropagation();
    if (!thread.user_id) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setProfileCardAnchor(rect);
    setProfileCardUser({
      userId: thread.user_id,
      authorName: thread.author_name || 'Anonymous',
      authorElement: thread.author_element || null,
      authorSubtype: thread.author_subtype || null,
    });
  };

  const handleViewAllThreads = (userId: string, authorName: string) => {
    setFilterByUserId(userId);
    setFilterByUserName(authorName);
    setProfileCardUser(null);
    setProfileCardAnchor(null);
  };

  const clearUserFilter = () => {
    setFilterByUserId(null);
    setFilterByUserName(null);
  };

  const renderAuthorBadge = (element: string | null, subtype: string | null) => {
    if (!element) return null;
    const elColors = ELEMENT_COLORS[element] || ELEMENT_COLORS.fire;
    const subtypeName = subtype ? SUBTYPE_NAMES[subtype] : element.charAt(0).toUpperCase() + element.slice(1);
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
        style={{ background: elColors.gradient }}
      >
        {subtypeName}
      </span>
    );
  };

  // If viewing a thread detail
  if (selectedThreadId) {
    return (
      <ForumThreadDetail
        threadId={selectedThreadId}
        user={user}
        profile={profile}
        onBack={() => { setSelectedThreadId(null); fetchThreads(); }}
        onAuthRequired={onAuthRequired}
        forumMode={forumMode}
        rootsAccessibleRootCategoryIds={forumMode === 'roots' ? rootsAccessibleRootCategoryIds : undefined}
        onRequestDayPassRoot={(rootCategoryId) => {
          setDayPassTargetRootCategoryId(rootCategoryId);
          setDayPassQuestion('');
          setShowDayPassModal(true);
        }}
        onViewUserProfile={(userId, authorName, authorElement, authorSubtype) => {
          setProfileCardUser({ userId, authorName, authorElement, authorSubtype });
          setProfileCardAnchor(null);
        }}
        onViewAllThreadsByUser={(userId, authorName) => {
          setSelectedThreadId(null);
          handleViewAllThreads(userId, authorName);
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* ── Forum Banner ── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-8 border border-gray-200 shadow-sm"
        style={{
          background: '#ffffff',
          padding: '32px 36px',
        }}
      >
        <div className="relative flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center">
            {forumMode === 'roots' ? (
              <TreePine className="w-7 h-7 text-emerald-600" />
            ) : (
              <MessageSquare className="w-7 h-7 text-violet-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              {forumMode === 'roots' ? 'Roots Forum' : 'Elemental Community Forum'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {forumMode === 'roots'
                ? 'Threads organized by element and the sixteen elemental archetypes.'
                : 'Connect, share, and explore with fellow elemental types'}
            </p>
          </div>
        </div>

        {/* Element pills in the banner */}
        <div className="relative flex flex-wrap gap-2 mt-4">
          {[
            { label: 'Fire', icon: Flame, bg: '#FEE2E2', border: '#FECACA', text: 'text-red-700' },
            { label: 'Water', icon: Droplets, bg: '#DBEAFE', border: '#BFDBFE', text: 'text-blue-700' },
            { label: 'Earth', icon: Mountain, bg: '#FEF3C7', border: '#FDE68A', text: 'text-amber-800' },
            { label: 'Air', icon: Wind, bg: '#CFFAFE', border: '#A5F3FC', text: 'text-cyan-800' },
          ].map((el) => (
            <div
              key={el.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${el.text}`}
              style={{ background: el.bg, border: `1px solid ${el.border}` }}
            >
              <el.icon className="w-3.5 h-3.5" />
              {el.label}
            </div>
          ))}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700"
            style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {threadCount} Threads
          </div>
        </div>
      </div>

      {/* User filter banner */}
      {filterByUserId && filterByUserName && (
        <div
          className="mb-6 flex items-center gap-3 p-4 rounded-xl border-2 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #EDE9FE, #F5F3FF)',
            borderColor: '#C4B5FD',
          }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}>
            <UserCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-violet-900">
              Showing threads by <span className="font-bold">{filterByUserName}</span>
            </p>
            <p className="text-xs text-violet-600">{threadCount} thread{threadCount !== 1 ? 's' : ''} found</p>
          </div>
          <button
            onClick={clearUserFilter}
            className="flex items-center gap-1.5 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}
          >
            <X className="w-3.5 h-3.5" />
            Clear Filter
          </button>
        </div>
      )}

      {/* ── Stats Bar with Colorful Gradients ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Threads', value: threadCount, icon: MessageSquare, gradient: 'linear-gradient(135deg, #4338CA, #7C3AED)', lightBg: '#EDE9FE', borderColor: '#C4B5FD', textColor: '#5B21B6' },
          { label: 'Fire Members', value: threads.filter(t => t.author_element === 'fire').length, icon: Flame, gradient: 'linear-gradient(135deg, #991B1B, #C41E3A)', lightBg: '#FEF2F2', borderColor: '#FCA5A5', textColor: '#991B1B' },
          { label: 'Water Members', value: threads.filter(t => t.author_element === 'water').length, icon: Droplets, gradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4)', lightBg: '#EFF6FF', borderColor: '#93C5FD', textColor: '#1E40AF' },
          { label: 'Earth Members', value: threads.filter(t => t.author_element === 'earth').length, icon: Mountain, gradient: 'linear-gradient(135deg, #78350F, #8B4513)', lightBg: '#FFFBEB', borderColor: '#FCD34D', textColor: '#92400E' },
        ].map((stat, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            style={{ background: stat.lightBg, border: `2px solid ${stat.borderColor}` }}
          >
            {/* Gradient accent bar at top */}
            <div className="h-1.5" style={{ background: stat.gradient }} />
            <div className="p-4 text-center">
              <div
                className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-sm"
                style={{ background: stat.gradient }}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold" style={{ color: stat.textColor, fontFamily: 'Georgia, serif' }}>{stat.value}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: stat.textColor, opacity: 0.7 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search & Create ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6B7280, #9CA3AF)' }}>
            <Search className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search threads..."
            className="w-full pl-14 pr-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 bg-white shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            if (!user) { onAuthRequired(); return; }
            setShowCreateThread(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap shadow-lg hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED, #A855F7)' }}
        >
          <Plus className="w-4 h-4" />
          New Thread
        </button>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex md:hidden items-center justify-center gap-2 px-4 py-3.5 border-2 border-violet-200 rounded-xl text-sm font-medium text-violet-700 hover:bg-violet-50 transition-colors shadow-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* ── Sidebar Filters - Desktop ── */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-5">
            {/* Category Filter */}
            <div className="rounded-xl overflow-hidden shadow-md border-2 border-violet-100">
              <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #4338CA, #6D28D9)' }}>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" />
                  {forumMode === 'roots' ? 'Root forums' : 'Topics'}
                </h3>
              </div>
              <div className="bg-white p-3 space-y-1">
                {topicCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const locked = Boolean((cat as any).locked);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all font-medium ${
                        isActive
                          ? 'text-white shadow-md'
                          : locked
                            ? 'text-gray-500 bg-gray-50 border border-gray-100 opacity-90'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={isActive ? { background: cat.gradient } : undefined}
                    >
                      {locked ? <Lock className="w-4 h-4 text-gray-400" /> : <cat.icon className="w-4 h-4" />}
                      <span className={`${locked ? 'truncate' : ''}`}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Element Filter */}
            <div className="rounded-xl overflow-hidden shadow-md border-2 border-violet-100">
              <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Element
                </h3>
              </div>
              <div className="bg-white p-3 space-y-1">
                {ELEMENT_FILTERS.map((el) => {
                  const isActive = activeElement === el.id;
                  return (
                    <button
                      key={el.id}
                      onClick={() => setActiveElement(el.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all font-medium ${
                        isActive ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={isActive ? { background: el.gradient } : undefined}
                    >
                      <el.icon className="w-4 h-4" />
                      {el.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort */}
            <div className="rounded-xl overflow-hidden shadow-md border-2 border-violet-100">
              <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Sort By
                </h3>
              </div>
              <div className="bg-white p-3 space-y-1">
                {[
                  { id: 'newest' as const, label: 'Newest', icon: Clock, gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
                  { id: 'top' as const, label: 'Most Upvoted', icon: ChevronUp, gradient: 'linear-gradient(135deg, #059669, #34D399)' },
                  { id: 'active' as const, label: 'Most Active', icon: MessageSquare, gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
                ].map((s) => {
                  const isActive = sortBy === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all font-medium ${
                        isActive ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={isActive ? { background: s.gradient } : undefined}
                    >
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Filters Dropdown ── */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif', color: '#4338CA' }}>Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-bold text-violet-800 mb-2">{forumMode === 'roots' ? 'Root forum' : 'Topic'}</p>
                  <div className="flex flex-wrap gap-2">
                    {topicCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        disabled={false}
                        className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                          activeCategory === cat.id ? 'text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                        style={activeCategory === cat.id ? { background: cat.gradient } : undefined}
                      >
                        <span className="inline-flex items-center gap-2">
                          {Boolean((cat as any).locked) ? <Lock className="w-3.5 h-3.5 text-gray-500" /> : null}
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-violet-800 mb-2">Element</p>
                  <div className="flex flex-wrap gap-2">
                    {ELEMENT_FILTERS.map((el) => (
                      <button
                        key={el.id}
                        onClick={() => setActiveElement(el.id)}
                        className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                          activeElement === el.id ? 'text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                        style={activeElement === el.id ? { background: el.gradient } : undefined}
                      >
                        {el.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-violet-800 mb-2">Sort</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'newest' as const, label: 'Newest', gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' },
                      { id: 'top' as const, label: 'Most Upvoted', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
                      { id: 'active' as const, label: 'Most Active', gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSortBy(s.id)}
                        className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                          sortBy === s.id ? 'text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                        style={sortBy === s.id ? { background: s.gradient } : undefined}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-6 py-3.5 text-white rounded-xl text-sm font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* ── Thread List ── */}
        <div className="flex-1 min-w-0">
          {forumMode === 'roots' && (
            <div
              className="mb-4 rounded-xl border border-violet-100 shadow-sm bg-white p-4"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(52,211,153,0.05))' }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-violet-700">Weekly Root Ritual</p>
                  <h3 className="text-lg font-bold text-gray-900">{ritualInfo.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {ritualInfo.schedule ? `${ritualInfo.title} • every ${ritualInfo.schedule}` : ritualInfo.vibe}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Focus: {ritualInfo.focusLine}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRitualDraft('');
                    setShowRitualModal(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all"
                  style={{ background: ritualCompletedThisWeek ? 'linear-gradient(135deg, #059669, #34D399)' : 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                >
                  {ritualCompletedThisWeek ? 'Ritual Completed' : 'Start Ritual'}
                </button>
              </div>
              {rootsReadOnlyForActiveRoot && (
                <p className="text-xs text-amber-700 mt-3">
                  This Root is read-only for your tier. Request a day pass to post replies.
                </p>
              )}

              {forumMode === 'roots' && user?.id && !rootsOathAgreed && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-sm font-bold text-amber-900">Confidentiality Oath</p>
                  <p className="text-xs text-amber-900/80 mt-1">
                    What&apos;s shared in the Roots stays in the Roots.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!rootsOathKey) return;
                      try {
                        localStorage.setItem(rootsOathKey, '1');
                        setRootsOathAgreed(true);
                        toast({
                          title: 'Oath acknowledged',
                          description: 'Thank you for honoring the sacred boundary.',
                        });
                      } catch {
                        toast({
                          title: 'Could not save oath',
                          description: 'Please try again.',
                        });
                      }
                    }}
                    className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)' }}
                  >
                    I agree
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Active Filters */}
          {(activeCategory !== 'all' || activeElement !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-violet-600">Active filters:</span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all"
                  style={{ background: getForumCategoryDisplay(activeCategory).gradient }}
                >
                  {getForumCategoryDisplay(activeCategory).label}
                  <X className="w-3 h-3" />
                </button>
              )}
              {activeElement !== 'all' && (
                <button
                  onClick={() => setActiveElement('all')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all"
                  style={{ background: ELEMENT_COLORS[activeElement]?.gradient || 'linear-gradient(135deg, #6B7280, #9CA3AF)' }}
                >
                  {activeElement.charAt(0).toUpperCase() + activeElement.slice(1)}
                  <X className="w-3 h-3" />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-violet-100 rounded-full text-xs font-bold text-violet-700 hover:bg-violet-200 transition-colors"
                >
                  "{searchQuery}"
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}>
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
              <p className="text-sm font-medium text-violet-600">Loading threads...</p>
            </div>
          ) : threads.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl shadow-lg border-2 overflow-hidden"
              style={{ borderColor: '#C4B5FD' }}
            >
              {/* Gradient header for empty state */}
              <div className="h-2" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED, #EC4899, #F59E0B)' }} />
              <div className="px-8 py-12">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#4338CA' }}>
                  {filterByUserId ? 'No threads by this user' : 'No threads yet'}
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                  {searchQuery
                    ? `No threads found matching "${searchQuery}". Try a different search.`
                    : filterByUserId
                    ? `${filterByUserName || 'This user'} hasn't created any threads yet.`
                    : forumMode === 'roots'
                      ? 'Be the first to plant a thread in Roots.'
                      : 'Be the first to start a conversation in the community!'}
                </p>
                {filterByUserId ? (
                  <button
                    onClick={clearUserFilter}
                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                  >
                    View All Threads
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!user) { onAuthRequired(); return; }
                      setShowCreateThread(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                  >
                    <Plus className="w-4 h-4" />
                    Create First Thread
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {threads.map((thread) => {
                const catDisp = getForumCategoryDisplay(thread.category);
                const hasUpvoted = userUpvotes.has(`thread-${thread.id}`);
                const elColors = thread.elemental_type ? ELEMENT_COLORS[thread.elemental_type] : null;
                const threadAccent = elColors?.accent || '#7C3AED';

                return (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden border-2"
                    style={{
                      borderColor: 'transparent',
                      borderLeftColor: threadAccent,
                      borderLeftWidth: '4px',
                    }}
                  >
                    <div className="flex gap-4 p-4 md:p-5">
                      {/* Upvote column */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button
                          onClick={(e) => handleUpvoteThread(e, thread.id)}
                          className="flex flex-col items-center p-2 rounded-xl transition-all"
                          style={
                            hasUpvoted
                              ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)', color: 'white', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }
                              : { background: '#F3F4F6', color: '#9CA3AF' }
                          }
                        >
                          {forumMode === 'roots' ? (
                            <>
                              {thread.elemental_type === 'fire' && <Flame className="w-5 h-5" />}
                              {thread.elemental_type === 'water' && <Droplets className="w-5 h-5" />}
                              {thread.elemental_type === 'earth' && <Mountain className="w-5 h-5" />}
                              {thread.elemental_type === 'air' && <Wind className="w-5 h-5" />}
                              {!thread.elemental_type && <ChevronUp className="w-5 h-5" />}
                              <span className="text-[10px] font-bold -mt-0.5">
                                {thread.elemental_type === 'earth'
                                  ? 'Nourished'
                                  : thread.elemental_type === 'fire'
                                    ? 'Ignited'
                                    : thread.elemental_type === 'water'
                                      ? 'Resonates'
                                      : 'Expanded'}
                              </span>
                              <span className="text-xs font-bold">{thread.upvotes_count || 0}</span>
                            </>
                          ) : (
                            <>
                              <ChevronUp className="w-5 h-5" />
                              <span className="text-xs font-bold">{thread.upvotes_count || 0}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                            style={{ background: catDisp.gradient }}
                          >
                            {catDisp.label}
                          </span>
                          {thread.elemental_type && elColors && (
                            <span
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                              style={{ background: elColors.gradient }}
                            >
                              {thread.elemental_type.charAt(0).toUpperCase() + thread.elemental_type.slice(1)}
                            </span>
                          )}
                          {thread.image_url && (
                            <span
                              className="flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                              style={{ background: 'linear-gradient(135deg, #D97706, #FBBF24)' }}
                            >
                              <ImageIcon className="w-3 h-3" />
                              Photo
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-1 mb-1">
                          {thread.title}
                        </h3>

                        {/* Preview */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{thread.body}</p>

                        {/* Footer */}
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <button
                            onClick={(e) => handleAuthorClick(e, thread)}
                            className="flex items-center gap-1.5 hover:bg-gray-100 rounded-full px-1.5 py-0.5 -ml-1.5 transition-colors group/author"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                              style={{ background: `linear-gradient(135deg, ${ELEMENT_AVATAR_COLORS[thread.author_element] || '#374151'}, ${ELEMENT_AVATAR_COLORS[thread.author_element] ? ELEMENT_AVATAR_COLORS[thread.author_element] + 'CC' : '#6B7280'})` }}
                            >
                              {(thread.author_name || 'A').charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-600 group-hover/author:text-violet-600 transition-colors">
                              {thread.author_name || 'Anonymous'}
                            </span>
                            {renderAuthorBadge(thread.author_element, thread.author_subtype)}
                          </button>
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3" />
                            {timeAgo(thread.created_at)}
                          </span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <MessageSquare className="w-3 h-3" />
                            {thread.replies_count || 0}
                          </span>
                        </div>
                      </div>

                      {/* Thumbnail */}
                      {thread.image_url && (
                        <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md border-2" style={{ borderColor: threadAccent + '40' }}>
                          <img
                            src={thread.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Thread Modal */}
      <ForumCreateThread
        isOpen={showCreateThread}
        onClose={() => setShowCreateThread(false)}
        user={user}
        profile={profile}
        forumMode={forumMode}
        rootsDefaultRootCategoryId={forumMode === 'roots' && activeCategory !== 'all' ? activeCategory : undefined}
        rootsAllowedRootCategoryIds={forumMode === 'roots' ? rootsAccessibleRootCategoryIds : undefined}
        rootsReadOnly={forumMode === 'roots' ? rootsReadOnlyForActiveRoot : false}
        onRequestDayPass={(rootCategoryId) => {
          setDayPassTargetRootCategoryId(rootCategoryId);
          setDayPassQuestion('');
          setShowDayPassModal(true);
        }}
        onThreadCreated={() => {
          fetchThreads();
          toast({
            title: 'Thread created!',
            description:
              forumMode === 'roots'
                ? 'Your thread has been posted to Roots.'
                : 'Your thread has been posted to the community.',
          });
        }}
      />

      {/* Day Pass Modal (Premium visitors to other Roots) */}
      {showDayPassModal && forumMode === 'roots' && dayPassTargetRootCategoryId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div
              className="px-6 py-5 text-white flex items-start justify-between gap-4"
              style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
            >
              <div>
                <h3 className="text-xl font-bold">Request Day Pass</h3>
                <p className="text-white/80 text-sm mt-1">Post in this Root for the next 24 hours.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowDayPassModal(false);
                  setDayPassTargetRootCategoryId(null);
                }}
                className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-900">
                  Root: {getForumCategoryDisplay(dayPassTargetRootCategoryId).label}
                </p>
                <p className="text-xs text-green-800/80 mt-1">
                  Premium visitors request a day pass to ask a specific question without losing sacred access boundaries.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Your question (optional)</label>
                <textarea
                  value={dayPassQuestion}
                  onChange={(e) => setDayPassQuestion(e.target.value)}
                  placeholder="What do you want to ask or share in this Root forum?"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-emerald-400 bg-gray-50 resize-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDayPassModal(false);
                    setDayPassTargetRootCategoryId(null);
                  }}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const expiry = Date.now() + 24 * 60 * 60 * 1000;
                    localStorage.setItem(
                      `elemental-color-roots-day-pass-${dayPassTargetRootCategoryId}`,
                      String(expiry)
                    );
                    setDayPassTick((t) => t + 1);
                    setShowDayPassModal(false);
                    setDayPassTargetRootCategoryId(null);
                    toast({
                      title: 'Day pass activated',
                      description: 'You can post in this Root forum for the next 24 hours.',
                    });
                  }}
                  className="flex-1 py-3 px-4 rounded-full font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
                >
                  Activate Day Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Ritual Modal */}
      {showRitualModal && forumMode === 'roots' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div
              className="px-6 py-5 text-white flex items-start justify-between gap-4"
              style={{ background: ritualElement === 'earth' ? 'linear-gradient(135deg, #059669, #34D399)' : 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
            >
              <div>
                <h3 className="text-xl font-bold">{ritualInfo.title}</h3>
                <p className="text-white/80 text-sm mt-1">A guided private check-in for this week — saved only on your device.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowRitualModal(false)}
                className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
                <p className="text-sm font-semibold text-violet-900">{ritualInfo.vibe}</p>
                <p className="text-xs text-violet-800/80 mt-1">Focus line: {ritualInfo.focusLine}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-800">Write one truthful sentence</p>
                <textarea
                  value={ritualDraft}
                  onChange={(e) => setRitualDraft(e.target.value)}
                  placeholder="Example: This week I will begin again by..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-gray-50 resize-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRitualModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 rounded-full font-medium hover:bg-gray-50"
                >
                  Later
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!ritualCompletionKey) {
                      setShowRitualModal(false);
                      return;
                    }
                    setRitualMarking(true);
                    try {
                      localStorage.setItem(ritualCompletionKey, '1');
                      setRitualCompletedThisWeek(true);
                      toast({
                        title: 'Ritual marked complete',
                        description: 'Your weekly Root ritual has been saved for this week.',
                      });
                      setShowRitualModal(false);
                      setRitualDraft('');
                    } finally {
                      setRitualMarking(false);
                    }
                  }}
                  disabled={ritualMarking}
                  className="flex-1 py-3 px-4 rounded-full font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                >
                  {ritualMarking ? 'Marking...' : ritualCompletedThisWeek ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Card Popup */}
      {profileCardUser && (
        <ForumUserProfileCard
          userId={profileCardUser.userId}
          authorName={profileCardUser.authorName}
          authorElement={profileCardUser.authorElement}
          authorSubtype={profileCardUser.authorSubtype}
          isOpen={true}
          onClose={() => {
            setProfileCardUser(null);
            setProfileCardAnchor(null);
          }}
          onViewAllThreads={handleViewAllThreads}
          anchorRect={profileCardAnchor}
        />
      )}
    </div>
  );
};

export default CommunityForum;
