import React, { useState, useEffect, useRef } from 'react';
import {
  X, MessageSquare, ChevronUp, Calendar, Flame, Droplets, Mountain, Wind,
  Loader2, ArrowRight, User, Award, Clock, FileText, Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ForumUserProfileCardProps {
  userId: string;
  authorName: string;
  authorElement: string | null;
  authorSubtype: string | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAllThreads: (userId: string, authorName: string) => void;
  anchorRect?: DOMRect | null;
}

const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string; gradient: string; cssGradient: string; lightBg: string; accent: string }> = {
  fire: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', gradient: 'from-red-500 to-orange-500', cssGradient: 'linear-gradient(135deg, #991B1B, #C41E3A, #FF6B35)', lightBg: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)', accent: '#C41E3A' },
  water: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-500 to-cyan-500', cssGradient: 'linear-gradient(135deg, #1E40AF, #6B8BA4, #B4A7D6)', lightBg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', accent: '#6B8BA4' },
  earth: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'from-amber-600 to-yellow-600', cssGradient: 'linear-gradient(135deg, #78350F, #8B4513, #CC4E3E)', lightBg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', accent: '#8B4513' },
  air: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-400 to-amber-400', cssGradient: 'linear-gradient(135deg, #C2410C, #FF7F50, #FFE135)', lightBg: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)', accent: '#FF7F50' },
};

const ELEMENT_AVATAR_COLORS: Record<string, string> = {
  fire: '#C41E3A',
  water: '#6B8BA4',
  earth: '#8B4513',
  air: '#FF7F50',
};

const ELEMENT_ICONS: Record<string, React.FC<any>> = {
  fire: Flame,
  water: Droplets,
  earth: Mountain,
  air: Wind,
};

const SUBTYPE_NAMES: Record<string, string> = {
  'fire-fire': 'Pure Fire', 'fire-earth': 'Fire-Earth', 'fire-air': 'Fire-Air', 'fire-water': 'Fire-Water',
  'water-water': 'Pure Water', 'water-air': 'Water-Air', 'water-earth': 'Water-Earth', 'water-fire': 'Water-Fire',
  'earth-earth': 'Pure Earth', 'earth-fire': 'Earth-Fire', 'earth-water': 'Earth-Water', 'earth-air': 'Earth-Air',
  'air-air': 'Pure Air', 'air-water': 'Air+Water', 'air-fire': 'Air+Fire', 'air-earth': 'Air+Earth',

};

const CATEGORY_LABELS: Record<string, { label: string; color: string; gradient: string }> = {
  general: { label: 'General', color: '#6B7280', gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)' },
  results: { label: 'Results', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  'color-matching': { label: 'Color Matching', color: '#EC4899', gradient: 'linear-gradient(135deg, #DB2777, #F472B6)' },
  'outfit-feedback': { label: 'Outfit Feedback', color: '#F59E0B', gradient: 'linear-gradient(135deg, #D97706, #FBBF24)' },
  tips: { label: 'Tips & Tricks', color: '#10B981', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  questions: { label: 'Questions', color: '#3B82F6', gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
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
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function formatJoinDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

interface UserProfile {
  full_name: string | null;
  elemental_type: string | null;
  elemental_subtype: string | null;
  created_at: string;
  forum_thread_count: number;
  forum_reply_count: number;
  membership_tier: string | null;
}

interface RecentActivity {
  type: 'thread' | 'reply';
  id: string;
  title?: string;
  body: string;
  category?: string;
  upvotes_count: number;
  created_at: string;
  thread_id?: string;
}

const ForumUserProfileCard: React.FC<ForumUserProfileCardProps> = ({
  userId,
  authorName,
  authorElement,
  authorSubtype,
  isOpen,
  onClose,
  onViewAllThreads,
  anchorRect,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchProfileData();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('full_name, elemental_type, elemental_subtype, created_at, forum_thread_count, forum_reply_count, membership_tier')
        .eq('user_id', userId)
        .single();

      setProfile(profileData);

      const { data: recentThreads } = await supabase
        .from('forum_threads')
        .select('id, title, body, category, upvotes_count, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: recentReplies } = await supabase
        .from('forum_replies')
        .select('id, body, upvotes_count, created_at, thread_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(3);

      const activities: RecentActivity[] = [
        ...(recentThreads || []).map((t: any) => ({
          type: 'thread' as const,
          id: t.id,
          title: t.title,
          body: t.body,
          category: t.category,
          upvotes_count: t.upvotes_count || 0,
          created_at: t.created_at,
        })),
        ...(recentReplies || []).map((r: any) => ({
          type: 'reply' as const,
          id: r.id,
          body: r.body,
          upvotes_count: r.upvotes_count || 0,
          created_at: r.created_at,
          thread_id: r.thread_id,
        })),
      ];

      activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const element = profile?.elemental_type || authorElement || '';
  const subtype = profile?.elemental_subtype || authorSubtype || '';
  const colors = ELEMENT_COLORS[element] || ELEMENT_COLORS.fire;
  const avatarColor = ELEMENT_AVATAR_COLORS[element] || '#374151';
  const ElementIcon = ELEMENT_ICONS[element] || User;
  const displayName = profile?.full_name || authorName || 'Anonymous';
  const subtypeName = subtype ? (SUBTYPE_NAMES[subtype] || subtype) : (element ? element.charAt(0).toUpperCase() + element.slice(1) : 'Unknown');
  const totalContributions = (profile?.forum_thread_count || 0) + (profile?.forum_reply_count || 0);
  const headerGradient = element ? colors.cssGradient : 'linear-gradient(135deg, #4338CA, #6D28D9, #7C3AED)';

  const getCardStyle = (): React.CSSProperties => {
    if (!anchorRect || window.innerWidth < 768) {
      return {};
    }
    
    const cardWidth = 380;
    const cardHeight = 520;
    const padding = 16;
    
    let left = anchorRect.left + anchorRect.width / 2 - cardWidth / 2;
    let top = anchorRect.bottom + 8;
    
    if (left < padding) left = padding;
    if (left + cardWidth > window.innerWidth - padding) left = window.innerWidth - cardWidth - padding;
    if (top + cardHeight > window.innerHeight - padding) {
      top = anchorRect.top - cardHeight - 8;
    }
    if (top < padding) top = padding;
    
    return {
      position: 'fixed' as const,
      left: `${left}px`,
      top: `${top}px`,
      width: `${cardWidth}px`,
    };
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" onClick={onClose} />

      {/* Card */}
      <div
        ref={cardRef}
        style={anchorRect && window.innerWidth >= 768 ? getCardStyle() : undefined}
        className={`${
          !anchorRect || window.innerWidth < 768
            ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px]'
            : ''
        } bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
      >
        {loading ? (

          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg" style={{ background: headerGradient }}>
              <Loader2 className="w-7 h-7 animate-spin text-white" />
            </div>
            <p className="text-sm font-medium text-violet-600">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Gradient Header */}
            <div
              className="relative px-6 pt-6 pb-10"
              style={{ background: headerGradient }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="absolute bottom-2 left-1/3 w-12 h-12 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-white/20"
                    style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}CC)` }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  {element && (
                    <div
                      className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                      style={{ background: colors.cssGradient }}
                    >
                      <ElementIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Name & type */}
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-lg font-bold text-white truncate">{displayName}</h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {element && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm">
                        {subtypeName}
                      </span>
                    )}
                    {profile?.membership_tier && profile.membership_tier !== 'free' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm">
                        <Award className="w-3 h-3" />
                        {profile.membership_tier === 'premium' ? 'Premium' : profile.membership_tier === 'vip' ? 'VIP' : 'Pro'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 -mt-5 mx-4 gap-2">
              {[
                { label: 'Threads', value: profile?.forum_thread_count || 0, gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)' },
                { label: 'Replies', value: profile?.forum_reply_count || 0, gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
                { label: 'Total', value: totalContributions, gradient: 'linear-gradient(135deg, #059669, #34D399)' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="h-1" style={{ background: stat.gradient }} />
                  <div className="py-2.5 px-2 text-center">
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Join date */}
            <div className="flex items-center gap-2 px-6 mt-4 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {profile?.created_at ? formatJoinDate(profile.created_at) : 'Unknown'}</span>
            </div>

            {/* Recent Activity */}
            <div className="px-6 mt-4">
              <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Recent Activity
              </h4>
              {recentActivity.length === 0 ? (
                <div className="text-center py-6 rounded-xl border-2 border-dashed border-violet-200" style={{ background: 'linear-gradient(135deg, #EDE9FE, #F5F3FF)' }}>
                  <MessageSquare className="w-6 h-6 mx-auto text-violet-300 mb-1.5" />
                  <p className="text-xs text-violet-400 font-medium">No forum activity yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {recentActivity.map((activity) => (
                    <div
                      key={`${activity.type}-${activity.id}`}
                      className="group flex gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {/* Activity type indicator */}
                      <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm"
                        style={{
                          background: activity.type === 'thread'
                            ? 'linear-gradient(135deg, #7C3AED, #A855F7)'
                            : 'linear-gradient(135deg, #2563EB, #60A5FA)'
                        }}
                      >
                        {activity.type === 'thread' ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <MessageSquare className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {activity.type === 'thread' ? 'Thread' : 'Reply'}
                          </span>
                          {activity.category && (
                            <span
                              className="px-1.5 py-0 rounded-full text-[9px] font-bold text-white shadow-sm"
                              style={{ background: CATEGORY_LABELS[activity.category]?.gradient || 'linear-gradient(135deg, #6B7280, #9CA3AF)' }}
                            >
                              {CATEGORY_LABELS[activity.category]?.label || activity.category}
                            </span>
                          )}
                        </div>
                        {activity.title ? (
                          <p className="text-xs font-bold text-gray-800 line-clamp-1">{activity.title}</p>
                        ) : (
                          <p className="text-xs text-gray-600 line-clamp-1">{activity.body}</p>
                        )}
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <ChevronUp className="w-3 h-3" />
                            {activity.upvotes_count}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {timeAgo(activity.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* View All Threads button */}
            <div className="px-6 py-4 mt-2">
              <button
                onClick={() => {
                  onViewAllThreads(userId, displayName);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg"
                style={{ background: headerGradient }}
              >
                View All Threads by {displayName.split(' ')[0]}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForumUserProfileCard;
