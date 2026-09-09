import React, { useState, useEffect, useMemo } from 'react';
import {
  Download,
  Search,
  Users,
  Flame,
  Droplets,
  Mountain,
  Wind,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  Calendar,
  Filter,
  BarChart3,
  AlertTriangle,
  ArrowUpDown,
  X,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Globe,
  BookOpen,
  MessageSquare,
  Newspaper,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  UserX,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface NewsletterSubscriber {
  id: string;
  email: string;
  elemental_type: string | null;
  source: string | null;
  is_active: boolean;
  subscribed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

type SortField = 'email' | 'elemental_type' | 'subscribed_at' | 'source' | 'is_active';
type SortDirection = 'asc' | 'desc';

const elementConfig: Record<string, { label: string; color: string; bgColor: string; borderColor: string; icon: React.FC<any>; gradient: string }> = {
  fire: { label: 'Fire', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: Flame, gradient: 'from-red-500 to-amber-500' },
  water: { label: 'Water', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: Droplets, gradient: 'from-blue-500 to-cyan-500' },
  earth: { label: 'Earth', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: Mountain, gradient: 'from-amber-500 to-green-600' },
  air: { label: 'Air', color: 'text-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200', icon: Wind, gradient: 'from-violet-500 to-indigo-500' },
};

const sourceConfig: Record<string, { label: string; icon: React.FC<any>; color: string; bgColor: string }> = {
  blog: { label: 'Blog', icon: BookOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  footer: { label: 'Footer', icon: Globe, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  homepage: { label: 'Homepage', icon: Globe, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  forum: { label: 'Forum', icon: MessageSquare, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  newsletter: { label: 'Newsletter', icon: Newspaper, color: 'text-purple-600', bgColor: 'bg-purple-50' },
};

const getSourceConfig = (source: string | null) => {
  if (!source) return { label: 'Unknown', icon: Globe, color: 'text-gray-500', bgColor: 'bg-gray-50' };
  return sourceConfig[source.toLowerCase()] || { label: source, icon: Globe, color: 'text-gray-500', bgColor: 'bg-gray-50' };
};

const NewsletterAdmin: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterElement, setFilterElement] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('subscribed_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      toast({
        title: 'Error loading data',
        description: 'Could not fetch newsletter subscribers. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSubscribers();
    setRefreshing(false);
    toast({
      title: 'Data refreshed',
      description: 'Newsletter subscriber data has been updated.',
    });
  };

  const handleToggleActive = async (subscriber: NewsletterSubscriber) => {
    setTogglingId(subscriber.id);
    try {
      const newActive = !subscriber.is_active;
      const updatePayload: any = {
        is_active: newActive,
        updated_at: new Date().toISOString(),
      };
      if (!newActive) {
        updatePayload.unsubscribed_at = new Date().toISOString();
      } else {
        updatePayload.unsubscribed_at = null;
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .update(updatePayload)
        .eq('id', subscriber.id);

      if (error) throw error;

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === subscriber.id
            ? { ...s, is_active: newActive, updated_at: updatePayload.updated_at, unsubscribed_at: updatePayload.unsubscribed_at }
            : s
        )
      );

      toast({
        title: newActive ? 'Subscriber reactivated' : 'Subscriber deactivated',
        description: `${subscriber.email} has been ${newActive ? 'reactivated' : 'deactivated'}.`,
      });
    } catch (error) {
      console.error('Error toggling subscriber status:', error);
      toast({
        title: 'Error updating status',
        description: 'Could not update subscriber status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTogglingId(null);
    }
  };

  // Filter and sort
  const filteredSubscribers = useMemo(() => {
    let result = [...subscribers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.email.toLowerCase().includes(q) ||
          (s.elemental_type && s.elemental_type.toLowerCase().includes(q)) ||
          (s.source && s.source.toLowerCase().includes(q))
      );
    }

    if (filterElement !== 'all') {
      if (filterElement === 'unknown') {
        result = result.filter((s) => !s.elemental_type);
      } else {
        result = result.filter((s) => s.elemental_type === filterElement);
      }
    }

    if (filterSource !== 'all') {
      if (filterSource === 'unknown') {
        result = result.filter((s) => !s.source);
      } else {
        result = result.filter((s) => s.source === filterSource);
      }
    }

    if (filterStatus !== 'all') {
      result = result.filter((s) => (filterStatus === 'active' ? s.is_active : !s.is_active));
    }

    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'subscribed_at') {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      } else if (sortField === 'is_active') {
        valA = valA ? 1 : 0;
        valB = valB ? 1 : 0;
      } else {
        valA = (valA || '').toLowerCase();
        valB = (valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [subscribers, searchQuery, filterElement, filterSource, filterStatus, sortField, sortDirection]);

  // Statistics
  const stats = useMemo(() => {
    const total = subscribers.length;
    const active = subscribers.filter((s) => s.is_active).length;
    const inactive = total - active;

    const byElement: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0, unknown: 0 };
    const bySource: Record<string, number> = {};

    subscribers.forEach((s) => {
      // Element breakdown
      if (s.elemental_type && byElement.hasOwnProperty(s.elemental_type)) {
        byElement[s.elemental_type]++;
      } else {
        byElement.unknown++;
      }

      // Source breakdown
      const src = s.source || 'unknown';
      bySource[src] = (bySource[src] || 0) + 1;
    });

    // Recent signups (7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = subscribers.filter(
      (s) => s.subscribed_at && new Date(s.subscribed_at) >= sevenDaysAgo
    ).length;

    // Monthly signups (30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlySignups = subscribers.filter(
      (s) => s.subscribed_at && new Date(s.subscribed_at) >= thirtyDaysAgo
    ).length;

    return { total, active, inactive, byElement, bySource, recentSignups, monthlySignups };
  }, [subscribers]);

  // Unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const sources = new Set<string>();
    subscribers.forEach((s) => {
      if (s.source) sources.add(s.source);
    });
    return Array.from(sources).sort();
  }, [subscribers]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Email', 'Elemental Type', 'Source', 'Status', 'Subscribed Date', 'Unsubscribed Date'];
    const rows = filteredSubscribers.map((s) => [
      s.email,
      s.elemental_type ? (elementConfig[s.elemental_type]?.label || s.elemental_type) : 'Not specified',
      s.source || 'Unknown',
      s.is_active ? 'Active' : 'Inactive',
      s.subscribed_at
        ? new Date(s.subscribed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : '',
      s.unsubscribed_at
        ? new Date(s.unsubscribed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'CSV exported',
      description: `Exported ${filteredSubscribers.length} subscribers to CSV.`,
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeSince = (dateStr: string | null) => {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading newsletter subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Statistics Cards - Row 1: Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/* Total Subscribers */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Mail className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">Total Subscribers</p>
        </div>

        {/* Active */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          <p className="text-xs text-gray-500 mt-1">Active</p>
        </div>

        {/* Inactive */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <UserX className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
          <p className="text-xs text-gray-500 mt-1">Inactive</p>
        </div>

        {/* Last 7 Days */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-teal-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.recentSignups}</p>
          <p className="text-xs text-gray-500 mt-1">Last 7 Days</p>
        </div>

        {/* Last 30 Days */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.monthlySignups}</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 Days</p>
        </div>

        {/* Active Rate */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(0) : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Active Rate</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Element Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">By Elemental Type</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(elementConfig).map(([key, config]) => {
              const count = stats.byElement[key] || 0;
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              const IconComp = config.icon;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${config.color}`} />
                      <span className="text-sm font-medium text-gray-700">{config.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                      style={{ width: `${Math.max(percentage, stats.total > 0 ? 1 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Unknown */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Not Specified</span>
                </div>
                <span className="text-sm text-gray-500">
                  {stats.byElement.unknown} ({stats.total > 0 ? ((stats.byElement.unknown / stats.total) * 100).toFixed(1) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gray-300 transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? Math.max((stats.byElement.unknown / stats.total) * 100, 1) : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">By Source</h3>
          </div>

          {Object.keys(stats.bySource).length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(stats.bySource)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => {
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  const srcConfig = getSourceConfig(source);
                  const IconComp = srcConfig.icon;
                  return (
                    <div key={source}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <IconComp className={`w-4 h-4 ${srcConfig.color}`} />
                          <span className="text-sm font-medium text-gray-700 capitalize">{srcConfig.label}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 1)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Recent Subscribers</h3>
          </div>

          {subscribers.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No subscribers yet</p>
          ) : (
            <div className="space-y-3">
              {subscribers.slice(0, 6).map((sub) => {
                const elConfig = sub.elemental_type ? elementConfig[sub.elemental_type] : null;
                return (
                  <div key={sub.id} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        elConfig ? elConfig.bgColor : 'bg-gray-100'
                      }`}
                    >
                      {elConfig ? (
                        (() => {
                          const IconComp = elConfig.icon;
                          return <IconComp className={`w-4 h-4 ${elConfig.color}`} />;
                        })()
                      ) : (
                        <Mail className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{sub.email}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">{getTimeSince(sub.subscribed_at)}</p>
                        {!sub.is_active && (
                          <span className="text-xs text-red-500 font-medium">Inactive</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Search, Filters, and Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email, element, or source..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />

              {/* Element Filter */}
              <select
                value={filterElement}
                onChange={(e) => setFilterElement(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Elements</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="earth">Earth</option>
                <option value="air">Air</option>
                <option value="unknown">Not Specified</option>
              </select>

              {/* Source Filter */}
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Sources</option>
                {uniqueSources.map((src) => (
                  <option key={src} value={src}>
                    {getSourceConfig(src).label}
                  </option>
                ))}
                <option value="unknown">Unknown</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Results count and actions */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-500">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
              {searchQuery && <span> matching "{searchQuery}"</span>}
              {filterElement !== 'all' && <span> &middot; Element: {filterElement}</span>}
              {filterSource !== 'all' && <span> &middot; Source: {filterSource}</span>}
              {filterStatus !== 'all' && <span> &middot; Status: {filterStatus}</span>}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Email
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort('elemental_type')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Element
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort('source')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Source
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort('subscribed_at')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Subscribed
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => handleSort('is_active')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    Status
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">No subscribers found</p>
                        <p className="text-sm text-gray-400">
                          {searchQuery || filterElement !== 'all' || filterSource !== 'all' || filterStatus !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'No one has subscribed to the newsletter yet'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => {
                  const elConfig = sub.elemental_type ? elementConfig[sub.elemental_type] : null;
                  const srcConfig = getSourceConfig(sub.source);
                  const isExpanded = expandedRow === sub.id;
                  const isToggling = togglingId === sub.id;

                  return (
                    <React.Fragment key={sub.id}>
                      <tr
                        className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          isExpanded ? 'bg-gray-50' : ''
                        } ${!sub.is_active ? 'opacity-70' : ''}`}
                        onClick={() => setExpandedRow(isExpanded ? null : sub.id)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                            <span className="text-sm font-medium text-gray-900">{sub.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {elConfig ? (
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${elConfig.bgColor} ${elConfig.color} ${elConfig.borderColor} border`}
                            >
                              {(() => {
                                const IconComp = elConfig.icon;
                                return <IconComp className="w-3 h-3" />;
                              })()}
                              {elConfig.label}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${srcConfig.bgColor} ${srcConfig.color} border border-transparent`}
                          >
                            {(() => {
                              const IconComp = srcConfig.icon;
                              return <IconComp className="w-3 h-3" />;
                            })()}
                            {srcConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div>
                            <p className="text-sm text-gray-600">{formatDate(sub.subscribed_at)}</p>
                            <p className="text-xs text-gray-400">{getTimeSince(sub.subscribed_at)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {sub.is_active ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                              <CheckCircle2 className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                              <XCircle className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleActive(sub);
                            }}
                            disabled={isToggling}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                              sub.is_active
                                ? 'text-red-600 hover:bg-red-50 border border-red-200'
                                : 'text-green-600 hover:bg-green-50 border border-green-200'
                            }`}
                            title={sub.is_active ? 'Deactivate subscriber' : 'Reactivate subscriber'}
                          >
                            {isToggling ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : sub.is_active ? (
                              <ToggleRight className="w-3.5 h-3.5" />
                            ) : (
                              <ToggleLeft className="w-3.5 h-3.5" />
                            )}
                            {sub.is_active ? 'Deactivate' : 'Reactivate'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Row Detail */}
                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan={6} className="px-4 py-4">
                            <div className="ml-6 grid sm:grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Subscriber Details
                                </p>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-gray-500">Email</p>
                                      <p className="text-sm text-gray-900">{sub.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-gray-500">Elemental Type</p>
                                      <p className="text-sm text-gray-900 capitalize">
                                        {sub.elemental_type || 'Not specified'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-gray-500">Source</p>
                                      <p className="text-sm text-gray-900 capitalize">
                                        {sub.source || 'Unknown'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Dates
                                </p>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-gray-500">Subscribed</p>
                                      <p className="text-sm text-gray-900">{formatDateTime(sub.subscribed_at)}</p>
                                    </div>
                                  </div>
                                  {sub.unsubscribed_at && (
                                    <div className="flex items-start gap-2">
                                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="text-xs text-gray-500">Unsubscribed</p>
                                        <p className="text-sm text-red-600">{formatDateTime(sub.unsubscribed_at)}</p>
                                      </div>
                                    </div>
                                  )}
                                  {sub.updated_at && (
                                    <div className="flex items-start gap-2">
                                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="text-xs text-gray-500">Last Updated</p>
                                        <p className="text-sm text-gray-900">{formatDateTime(sub.updated_at)}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Status
                                </p>
                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    {sub.is_active ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className={`text-sm font-medium ${sub.is_active ? 'text-green-700' : 'text-red-600'}`}>
                                      {sub.is_active ? 'Active Subscriber' : 'Inactive Subscriber'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {sub.is_active
                                      ? 'This subscriber is currently receiving newsletter emails.'
                                      : 'This subscriber has been deactivated and will not receive newsletter emails.'}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleActive(sub);
                                    }}
                                    disabled={isToggling}
                                    className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
                                      sub.is_active
                                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                        : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                    }`}
                                  >
                                    {isToggling ? (
                                      <RefreshCw className="w-3 h-3 animate-spin" />
                                    ) : sub.is_active ? (
                                      <ToggleRight className="w-3.5 h-3.5" />
                                    ) : (
                                      <ToggleLeft className="w-3.5 h-3.5" />
                                    )}
                                    {sub.is_active ? 'Deactivate Subscriber' : 'Reactivate Subscriber'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredSubscribers.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {filteredSubscribers.length} subscriber{filteredSubscribers.length !== 1 ? 's' : ''} shown
              {filteredSubscribers.filter((s) => s.is_active).length !== filteredSubscribers.length && (
                <span className="ml-1">
                  ({filteredSubscribers.filter((s) => s.is_active).length} active, {filteredSubscribers.filter((s) => !s.is_active).length} inactive)
                </span>
              )}
            </p>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterAdmin;
