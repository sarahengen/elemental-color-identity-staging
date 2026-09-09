import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronUp, MessageSquare, Clock, Send, Loader2, Trash2, Image as ImageIcon, Sparkles, Lock, Flame, Droplets, Mountain, Wind } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import ForumUserProfileCard from './ForumUserProfileCard';
import { getForumCategoryDisplay } from '@/lib/forumCategoryLabels';
import { parseRootsThreadCategoryId } from '@/data/rootsForumConfig';

interface ForumThreadDetailProps {
  threadId: string;
  user: any;
  profile: any;
  onBack: () => void;
  onAuthRequired: () => void;
  forumMode?: 'public' | 'roots';
  rootsAccessibleRootCategoryIds?: string[];
  onRequestDayPassRoot?: (rootCategoryId: string) => void;
  onViewUserProfile?: (userId: string, authorName: string, authorElement: string | null, authorSubtype: string | null) => void;
  onViewAllThreadsByUser?: (userId: string, authorName: string) => void;
}

const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; accent: string }> = {
  fire: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', gradient: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)', accent: '#C41E3A' },
  water: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)', accent: '#6B8BA4' },
  earth: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)', accent: '#8B4513' },
  air: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'linear-gradient(135deg, #C2410C, #FF7F50, #FFE135)', accent: '#FF7F50' },
};

const SUBTYPE_NAMES: Record<string, string> = {
  'fire-fire': 'Pure Fire', 'fire-earth': 'Fire-Earth', 'fire-air': 'Fire-Air', 'fire-water': 'Fire-Water',
  'water-water': 'Pure Water', 'water-air': 'Water-Air', 'water-earth': 'Water-Earth', 'water-fire': 'Water-Fire',
  'earth-earth': 'Pure Earth', 'earth-fire': 'Earth-Fire', 'earth-water': 'Earth-Water', 'earth-air': 'Earth-Air',
  'air-air': 'Pure Air', 'air-water': 'Air+Water', 'air-fire': 'Air+Fire', 'air-earth': 'Air+Earth',

};

const ELEMENT_AVATAR_COLORS: Record<string, string> = {
  fire: '#C41E3A',
  water: '#6B8BA4',
  earth: '#8B4513',
  air: '#FF7F50',
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

const ForumThreadDetail: React.FC<ForumThreadDetailProps> = ({
  threadId,
  user,
  profile,
  onBack,
  onAuthRequired,
  forumMode = 'public',
  rootsAccessibleRootCategoryIds,
  onRequestDayPassRoot,
  onViewUserProfile,
  onViewAllThreadsByUser,
}) => {
  const [thread, setThread] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'top'>('newest');

  const threadRootCategoryId = thread ? parseRootsThreadCategoryId(thread.category)?.rootCategoryId ?? null : null;
  const isReplyLockedForRoots =
    forumMode === 'roots' &&
    threadRootCategoryId &&
    Boolean(rootsAccessibleRootCategoryIds) &&
    !rootsAccessibleRootCategoryIds!.includes(threadRootCategoryId);

  // Profile card state
  const [profileCardUser, setProfileCardUser] = useState<{
    userId: string;
    authorName: string;
    authorElement: string | null;
    authorSubtype: string | null;
  } | null>(null);
  const [profileCardAnchor, setProfileCardAnchor] = useState<DOMRect | null>(null);

  useEffect(() => {
    fetchThread();
    fetchReplies();
    if (user) fetchUserUpvotes();
  }, [threadId, user]);

  const fetchThread = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_threads')
        .select('*')
        .eq('id', threadId)
        .single();
      if (error) throw error;
      setThread(data);
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpvoteThread = async () => {
    if (!user) { onAuthRequired(); return; }
    const key = `thread-${threadId}`;
    const hasUpvoted = userUpvotes.has(key);

    try {
      if (hasUpvoted) {
        const { error } = await supabase.from('forum_upvotes').delete()
          .eq('user_id', user.id).eq('thread_id', threadId);
        if (error) throw error;
        setUserUpvotes(prev => { const n = new Set(prev); n.delete(key); return n; });
        setThread((prev: any) => prev ? { ...prev, upvotes_count: Math.max(0, (prev.upvotes_count || 0) - 1) } : prev);
      } else {
        const { error } = await supabase.from('forum_upvotes').insert({
          user_id: user.id, thread_id: threadId,
        });
        if (error) throw error;
        setUserUpvotes(prev => new Set(prev).add(key));
        setThread((prev: any) => prev ? { ...prev, upvotes_count: (prev.upvotes_count || 0) + 1 } : prev);
      }
    } catch (error) {
      console.error('Error toggling upvote:', error);
      toast({ title: 'Error', description: 'Failed to update upvote. Please try again.', variant: 'destructive' });
    }
  };

  const handleUpvoteReply = async (replyId: string) => {
    if (!user) { onAuthRequired(); return; }
    const key = `reply-${replyId}`;
    const hasUpvoted = userUpvotes.has(key);

    try {
      if (hasUpvoted) {
        const { error } = await supabase.from('forum_upvotes').delete()
          .eq('user_id', user.id).eq('reply_id', replyId);
        if (error) throw error;
        setUserUpvotes(prev => { const n = new Set(prev); n.delete(key); return n; });
        setReplies(prev => prev.map(r => r.id === replyId ? { ...r, upvotes_count: Math.max(0, (r.upvotes_count || 0) - 1) } : r));
      } else {
        const { error } = await supabase.from('forum_upvotes').insert({
          user_id: user.id, reply_id: replyId,
        });
        if (error) throw error;
        setUserUpvotes(prev => new Set(prev).add(key));
        setReplies(prev => prev.map(r => r.id === replyId ? { ...r, upvotes_count: (r.upvotes_count || 0) + 1 } : r));
      }
    } catch (error) {
      console.error('Error toggling reply upvote:', error);
      toast({ title: 'Error', description: 'Failed to update upvote. Please try again.', variant: 'destructive' });
    }
  };


  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onAuthRequired(); return; }
    if (!replyText.trim() || replyText.trim().length < 3) return;

    setSubmittingReply(true);
    try {
      const { data, error } = await supabase.from('forum_replies').insert({
        thread_id: threadId,
        user_id: user.id,
        body: replyText.trim(),
        author_name: profile?.full_name || user.email?.split('@')[0] || 'Anonymous',
        author_element: profile?.elemental_type || null,
        author_subtype: profile?.elemental_subtype || null,
      }).select().single();

      if (error) throw error;
      setReplies(prev => [data, ...prev]);
      setThread((prev: any) => prev ? { ...prev, replies_count: (prev.replies_count || 0) + 1 } : prev);
      setReplyText('');
      toast({ title: 'Reply posted!', description: 'Your reply has been added to the thread.' });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({ title: 'Error', description: 'Failed to post reply. Please try again.', variant: 'destructive' });
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!user) return;
    try {
      await supabase.from('forum_replies').delete().eq('id', replyId).eq('user_id', user.id);
      setReplies(prev => prev.filter(r => r.id !== replyId));
      setThread((prev: any) => prev ? { ...prev, replies_count: Math.max(0, (prev.replies_count || 0) - 1) } : prev);
      toast({ title: 'Reply deleted' });
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const handleAuthorClick = (e: React.MouseEvent, authorData: { user_id: string; author_name: string; author_element: string | null; author_subtype: string | null }) => {
    e.stopPropagation();
    if (!authorData.user_id) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setProfileCardAnchor(rect);
    setProfileCardUser({
      userId: authorData.user_id,
      authorName: authorData.author_name || 'Anonymous',
      authorElement: authorData.author_element || null,
      authorSubtype: authorData.author_subtype || null,
    });
  };

  const handleViewAllThreads = (userId: string, authorName: string) => {
    setProfileCardUser(null);
    setProfileCardAnchor(null);
    if (onViewAllThreadsByUser) {
      onViewAllThreadsByUser(userId, authorName);
    }
  };

  const sortedReplies = [...replies].sort((a, b) => {
    if (sortBy === 'top') return (b.upvotes_count || 0) - (a.upvotes_count || 0);
    if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const renderAuthorBadge = (element: string | null, subtype: string | null) => {
    if (!element) return null;
    const colors = ELEMENT_COLORS[element] || ELEMENT_COLORS.fire;
    const subtypeName = subtype ? SUBTYPE_NAMES[subtype] : element.charAt(0).toUpperCase() + element.slice(1);
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
        style={{ background: colors.gradient }}
      >
        {subtypeName}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}>
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
        <p className="text-sm font-medium text-violet-600">Loading thread...</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)' }}>
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-500 font-medium">Thread not found</p>
        <button onClick={onBack} className="mt-4 px-5 py-2 text-white rounded-full text-sm font-bold shadow-md" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}>Go back</button>
      </div>
    );
  }

  const catInfo = getForumCategoryDisplay(thread.category);
  const threadElColors = thread.author_element ? ELEMENT_COLORS[thread.author_element] : null;
  const threadGradient = threadElColors?.gradient || 'linear-gradient(135deg, #4338CA, #6D28D9, #7C3AED)';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md hover:opacity-90 transition-all"
        style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forum
      </button>

      {/* Thread */}
      <div className="rounded-2xl overflow-hidden shadow-lg border-2" style={{ borderColor: threadElColors?.accent || '#C4B5FD' }}>
        {/* Gradient header bar */}
        <div className="relative h-3" style={{ background: threadGradient }} />

        <div className="bg-white p-6 md:p-8">
          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
              style={{ background: catInfo.gradient }}
            >
              {catInfo.label}
            </span>
            {thread.elemental_type && (
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{ background: ELEMENT_COLORS[thread.elemental_type]?.gradient || catInfo.gradient }}
              >
                {thread.elemental_type.charAt(0).toUpperCase() + thread.elemental_type.slice(1)}
              </span>
            )}
            {thread.image_url && (
              <span
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{ background: 'linear-gradient(135deg, #D97706, #FBBF24)' }}
              >
                <ImageIcon className="w-3 h-3" />
                Photo
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>{thread.title}</h1>

          {/* Author info - clickable */}
          <button
            onClick={(e) => handleAuthorClick(e, thread)}
            className="flex items-center gap-3 mb-6 group/author hover:bg-gray-50 rounded-xl px-3 py-2 -ml-3 transition-colors"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white"
              style={{ background: `linear-gradient(135deg, ${ELEMENT_AVATAR_COLORS[thread.author_element] || '#374151'}, ${ELEMENT_AVATAR_COLORS[thread.author_element] ? ELEMENT_AVATAR_COLORS[thread.author_element] + 'CC' : '#6B7280'})` }}
            >
              {(thread.author_name || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm group-hover/author:text-violet-600 transition-colors">
                  {thread.author_name || 'Anonymous'}
                </span>
                {renderAuthorBadge(thread.author_element, thread.author_subtype)}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <Clock className="w-3 h-3" />
                {timeAgo(thread.created_at)}
              </div>
            </div>
          </button>

          {/* Body */}
          <div className="prose prose-gray max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{thread.body}</p>
          </div>

          {/* Image */}
          {thread.image_url && (
            <div className="mb-6 rounded-xl overflow-hidden border-2 shadow-md" style={{ borderColor: (threadElColors?.accent || '#C4B5FD') + '40' }}>
              <img src={thread.image_url} alt="Thread attachment" className="w-full max-h-96 object-cover" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-5 border-t-2" style={{ borderColor: '#F3F4F6' }}>
            <button
              onClick={handleUpvoteThread}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
              style={
                userUpvotes.has(`thread-${threadId}`)
                  ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)', color: 'white', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }
                  : { background: '#F3F4F6', color: '#6B7280' }
              }
            >
              {forumMode === 'roots' ? (
                <>
                  {thread.elemental_type === 'fire' && <Flame className="w-4 h-4" />}
                  {thread.elemental_type === 'water' && <Droplets className="w-4 h-4" />}
                  {thread.elemental_type === 'earth' && <Mountain className="w-4 h-4" />}
                  {thread.elemental_type === 'air' && <Wind className="w-4 h-4" />}
                  {!thread.elemental_type && <ChevronUp className="w-4 h-4" />}
                  <span className="text-[11px] font-extrabold opacity-90">
                    {thread.elemental_type === 'earth'
                      ? 'Nourished'
                      : thread.elemental_type === 'fire'
                        ? 'Ignited'
                        : thread.elemental_type === 'water'
                          ? 'Resonates'
                          : 'Expanded'}
                  </span>
                  <span className="ml-1">{thread.upvotes_count || 0}</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" />
                  {thread.upvotes_count || 0}
                </>
              )}
            </button>
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
              <MessageSquare className="w-4 h-4" />
              {thread.replies_count || 0} replies
            </div>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border-2 border-violet-100">
        <div className="px-6 py-4" style={{ background: 'linear-gradient(135deg, #4338CA, #6D28D9)' }}>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Leave a Reply
          </h3>
        </div>
        <div className="bg-white p-6">
          {user ? (
            isReplyLockedForRoots ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}>
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-700 font-semibold mb-2">Posting is locked in this Root.</p>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Request a 24-hour day pass to leave a reply in this sacred space.
                </p>
                <button
                  type="button"
                  onClick={() => (threadRootCategoryId ? onRequestDayPassRoot?.(threadRootCategoryId) : null)}
                  className="px-6 py-2.5 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
                >
                  Request Day Pass
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReply}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 bg-gray-50 resize-none transition-all"
                  maxLength={3000}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400 font-medium">{replyText.length}/3000</span>
                  <button
                    type="submit"
                    disabled={submittingReply || replyText.trim().length < 3}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
                  >
                    {submittingReply ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Reply</>
                    )}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}>
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-4 font-medium">Sign in to join the conversation</p>
              <button
                onClick={onAuthRequired}
                className="px-6 py-2.5 text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif', color: '#4338CA' }}>
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border-2 border-violet-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-violet-100 focus:border-violet-400 font-medium text-violet-700 transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="top">Most Upvoted</option>
          </select>
        </div>

        <div className="space-y-4">
          {sortedReplies.map((reply) => {
            const replyElColors = reply.author_element ? ELEMENT_COLORS[reply.author_element] : null;
            const replyAccent = replyElColors?.accent || '#C4B5FD';

            return (
              <div
                key={reply.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-2"
                style={{ borderColor: 'transparent', borderLeftColor: replyAccent, borderLeftWidth: '4px' }}
              >
                <div className="p-5">
                  {/* Reply author - clickable */}
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={(e) => handleAuthorClick(e, reply)}
                      className="flex items-center gap-3 group/author hover:bg-gray-50 rounded-lg px-1.5 py-1 -ml-1.5 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${ELEMENT_AVATAR_COLORS[reply.author_element] || '#374151'}, ${ELEMENT_AVATAR_COLORS[reply.author_element] ? ELEMENT_AVATAR_COLORS[reply.author_element] + 'CC' : '#6B7280'})` }}
                      >
                        {(reply.author_name || 'A').charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm group-hover/author:text-violet-600 transition-colors">
                            {reply.author_name || 'Anonymous'}
                          </span>
                          {renderAuthorBadge(reply.author_element, reply.author_subtype)}
                        </div>
                        <span className="text-xs text-gray-400">{timeAgo(reply.created_at)}</span>
                      </div>
                    </button>
                    <div className="flex-1" />
                    {user && reply.user_id === user.id && (
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete reply"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Reply body */}
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-3">{reply.body}</p>

                  {/* Reply actions */}
                  <button
                    onClick={() => handleUpvoteReply(reply.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={
                      userUpvotes.has(`reply-${reply.id}`)
                        ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)', color: 'white', boxShadow: '0 2px 6px rgba(124,58,237,0.25)' }
                        : { background: '#F3F4F6', color: '#6B7280' }
                    }
                  >
                    {forumMode === 'roots' ? (
                      <>
                        {reply.author_element === 'fire' && <Flame className="w-3.5 h-3.5" />}
                        {reply.author_element === 'water' && <Droplets className="w-3.5 h-3.5" />}
                        {reply.author_element === 'earth' && <Mountain className="w-3.5 h-3.5" />}
                        {reply.author_element === 'air' && <Wind className="w-3.5 h-3.5" />}
                        {!reply.author_element && <ChevronUp className="w-3.5 h-3.5" />}
                        <span className="text-[11px] font-extrabold opacity-90">
                          {reply.author_element === 'earth'
                            ? 'Nourished'
                            : reply.author_element === 'fire'
                              ? 'Ignited'
                              : reply.author_element === 'water'
                                ? 'Resonates'
                                : 'Expanded'}
                        </span>
                        <span className="ml-1">{reply.upvotes_count || 0}</span>
                      </>
                    ) : (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        {reply.upvotes_count || 0}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {sortedReplies.length === 0 && (
            <div className="text-center py-14 rounded-2xl shadow-sm border-2 overflow-hidden" style={{ borderColor: '#C4B5FD' }}>
              <div className="h-2" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED, #EC4899, #F59E0B)' }} />
              <div className="px-8 py-10">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #4338CA, #7C3AED)' }}>
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No replies yet. Be the first to respond!</p>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default ForumThreadDetail;
