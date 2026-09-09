import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Download,
  Search,
  Users,
  Flame,
  Droplets,
  Mountain,
  Wind,
  BookOpen,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  Calendar,
  Filter,
  BarChart3,
  Shield,
  AlertTriangle,
  ArrowUpDown,
  X,
  FileText,
  Clock,
  TrendingUp,
  Newspaper,
  MessageSquareQuote,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import NewsletterAdmin from '@/components/NewsletterAdmin';
import TestimonialAdmin from '@/components/TestimonialAdmin';

// Admin emails that can access this dashboard
const ADMIN_EMAILS = ['sarahjengen@gmail.com', 'beymustcode@gmail.com'];

interface WaitlistEntry {
  id: string;
  email: string;
  full_name: string | null;
  elemental_type: string | null;
  interest_reason: string | null;
  created_at: string | null;
}

interface AdminDashboardProps {
  user: any;
  onBack: () => void;
}

type SortField = 'created_at' | 'full_name' | 'email' | 'elemental_type';
type SortDirection = 'asc' | 'desc';
type AdminTab = 'waitlist' | 'newsletter' | 'testimonials';

const elementConfig: Record<string, { label: string; color: string; bgColor: string; borderColor: string; icon: React.FC<any>; gradient: string }> = {
  fire: { label: 'Fire', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: Flame, gradient: 'from-red-500 to-amber-500' },
  water: { label: 'Water', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: Droplets, gradient: 'from-blue-500 to-cyan-500' },
  earth: { label: 'Earth', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', icon: Mountain, gradient: 'from-amber-500 to-green-600' },
  air: { label: 'Air', color: 'text-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200', icon: Wind, gradient: 'from-violet-500 to-indigo-500' },
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('waitlist');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterElement, setFilterElement] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Check if user is admin
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  // Fetch waitlist entries
  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('book_waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      toast({
        title: 'Error loading data',
        description: 'Could not fetch waitlist entries. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchEntries();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
    toast({
      title: 'Data refreshed',
      description: 'Waitlist data has been updated.',
    });
  };

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.email.toLowerCase().includes(q) ||
          (e.full_name && e.full_name.toLowerCase().includes(q)) ||
          (e.elemental_type && e.elemental_type.toLowerCase().includes(q)) ||
          (e.interest_reason && e.interest_reason.toLowerCase().includes(q))
      );
    }

    // Element filter
    if (filterElement !== 'all') {
      if (filterElement === 'unknown') {
        result = result.filter((e) => !e.elemental_type);
      } else {
        result = result.filter((e) => e.elemental_type === filterElement);
      }
    }

    // Sort
    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'created_at') {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      } else {
        valA = (valA || '').toLowerCase();
        valB = (valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [entries, searchQuery, filterElement, sortField, sortDirection]);

  // Statistics
  const stats = useMemo(() => {
    const total = entries.length;
    const byElement: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0, unknown: 0 };

    entries.forEach((e) => {
      if (e.elemental_type && byElement.hasOwnProperty(e.elemental_type)) {
        byElement[e.elemental_type]++;
      } else {
        byElement.unknown++;
      }
    });

    const withName = entries.filter((e) => e.full_name).length;
    const withReason = entries.filter((e) => e.interest_reason).length;

    // Signups in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = entries.filter(
      (e) => e.created_at && new Date(e.created_at) >= sevenDaysAgo
    ).length;

    // Signups in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlySignups = entries.filter(
      (e) => e.created_at && new Date(e.created_at) >= thirtyDaysAgo
    ).length;

    return { total, byElement, withName, withReason, recentSignups, monthlySignups };
  }, [entries]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Elemental Type', 'Interest Reason', 'Signup Date'];
    const rows = filteredEntries.map((e) => [
      e.full_name || '',
      e.email,
      e.elemental_type ? elementConfig[e.elemental_type]?.label || e.elemental_type : 'Not specified',
      e.interest_reason ? `"${e.interest_reason.replace(/"/g, '""')}"` : '',
      e.created_at ? new Date(e.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `book-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'CSV exported',
      description: `Exported ${filteredEntries.length} entries to CSV.`,
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
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
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

  // Unauthorized access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-serif text-gray-900 mb-3">Access Restricted</h1>
          <p className="text-gray-600 mb-8">
            This admin dashboard is only accessible to authorized administrators.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 leading-tight">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500 leading-tight">
                    {activeTab === 'waitlist' ? 'Book Waitlist Management' : activeTab === 'newsletter' ? 'Newsletter Subscribers' : 'Testimonials'}
                  </p>

                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === 'waitlist' && (
                <>
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 -mb-px">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'waitlist'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Book Waitlist
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'waitlist' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {entries.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'newsletter'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              Newsletter Subscribers
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'testimonials'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              Testimonials
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && <NewsletterAdmin />}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && <TestimonialAdmin />}

        {/* Waitlist Tab */}
        {activeTab === 'waitlist' && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {/* Total Signups */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">Total Signups</p>
              </div>

              {/* Recent (7 days) */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.recentSignups}</p>
                <p className="text-xs text-gray-500 mt-1">Last 7 Days</p>
              </div>

              {/* Fire */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.byElement.fire}</p>
                <p className="text-xs text-gray-500 mt-1">Fire Types</p>
              </div>

              {/* Water */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.byElement.water}</p>
                <p className="text-xs text-gray-500 mt-1">Water Types</p>
              </div>

              {/* Earth */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Mountain className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.byElement.earth}</p>
                <p className="text-xs text-gray-500 mt-1">Earth Types</p>
              </div>

              {/* Air */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Wind className="w-4 h-4 text-violet-500" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.byElement.air}</p>
                <p className="text-xs text-gray-500 mt-1">Air Types</p>
              </div>
            </div>

            {/* Elemental Breakdown Chart */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Visual Breakdown */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Element Breakdown</h3>
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
                            style={{ width: `${Math.max(percentage, 1)}%` }}
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
                        style={{ width: `${stats.total > 0 ? Math.max((stats.byElement.unknown / stats.total) * 100, 1) : 1}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion Stats */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Form Completion</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Provided Name</span>
                      <span className="text-sm font-medium text-gray-900">
                        {stats.withName} / {stats.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${stats.total > 0 ? (stats.withName / stats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stats.total > 0 ? ((stats.withName / stats.total) * 100).toFixed(0) : 0}% completion rate
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Selected Element</span>
                      <span className="text-sm font-medium text-gray-900">
                        {stats.total - stats.byElement.unknown} / {stats.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${stats.total > 0 ? ((stats.total - stats.byElement.unknown) / stats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stats.total > 0 ? (((stats.total - stats.byElement.unknown) / stats.total) * 100).toFixed(0) : 0}% completion rate
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Wrote Interest Reason</span>
                      <span className="text-sm font-medium text-gray-900">
                        {stats.withReason} / {stats.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                        style={{ width: `${stats.total > 0 ? (stats.withReason / stats.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stats.total > 0 ? ((stats.withReason / stats.total) * 100).toFixed(0) : 0}% completion rate
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Recent Signups</h3>
                </div>

                {entries.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">No signups yet</p>
                ) : (
                  <div className="space-y-3">
                    {entries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          entry.elemental_type && elementConfig[entry.elemental_type]
                            ? elementConfig[entry.elemental_type].bgColor
                            : 'bg-gray-100'
                        }`}>
                          {entry.elemental_type && elementConfig[entry.elemental_type] ? (
                            (() => {
                              const IconComp = elementConfig[entry.elemental_type!].icon;
                              return <IconComp className={`w-4 h-4 ${elementConfig[entry.elemental_type!].color}`} />;
                            })()
                          ) : (
                            <Mail className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {entry.full_name || entry.email}
                          </p>
                          <p className="text-xs text-gray-500">{getTimeSince(entry.created_at)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
              <div className="p-4 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, or interest reason..."
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

                  {/* Element Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
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
                  </div>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-gray-500">
                    Showing {filteredEntries.length} of {entries.length} entries
                    {searchQuery && <span> matching "{searchQuery}"</span>}
                  </p>
                  <button
                    onClick={exportToCSV}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Export filtered results
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3">
                        <button
                          onClick={() => handleSort('full_name')}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        >
                          Name
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
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
                      <th className="text-left px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Interest Reason
                        </span>
                      </th>
                      <th className="text-left px-4 py-3">
                        <button
                          onClick={() => handleSort('created_at')}
                          className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                        >
                          Signup Date
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-gray-600 font-medium">No entries found</p>
                              <p className="text-sm text-gray-400">
                                {searchQuery || filterElement !== 'all'
                                  ? 'Try adjusting your search or filters'
                                  : 'No one has signed up for the waitlist yet'}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEntries.map((entry) => {
                        const elConfig = entry.elemental_type ? elementConfig[entry.elemental_type] : null;
                        const isExpanded = expandedRow === entry.id;

                        return (
                          <React.Fragment key={entry.id}>
                            <tr
                              className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                                isExpanded ? 'bg-gray-50' : ''
                              }`}
                              onClick={() => setExpandedRow(isExpanded ? null : entry.id)}
                            >
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-2">
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  )}
                                  <span className="text-sm font-medium text-gray-900">
                                    {entry.full_name || (
                                      <span className="text-gray-400 italic">No name</span>
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className="text-sm text-gray-600">{entry.email}</span>
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
                              <td className="px-4 py-3.5 hidden lg:table-cell">
                                {entry.interest_reason ? (
                                  <p className="text-sm text-gray-600 truncate max-w-xs">
                                    {entry.interest_reason}
                                  </p>
                                ) : (
                                  <span className="text-xs text-gray-400 italic">None</span>
                                )}
                              </td>
                              <td className="px-4 py-3.5">
                                <div>
                                  <p className="text-sm text-gray-600">{formatDate(entry.created_at)}</p>
                                  <p className="text-xs text-gray-400">{getTimeSince(entry.created_at)}</p>
                                </div>
                              </td>
                            </tr>

                            {/* Expanded Row Detail */}
                            {isExpanded && (
                              <tr className="bg-gray-50">
                                <td colSpan={5} className="px-4 py-4">
                                  <div className="ml-6 grid sm:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                        Full Details
                                      </p>
                                      <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                          <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                          <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm text-gray-900">{entry.email}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                          <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="text-sm text-gray-900">
                                              {entry.full_name || 'Not provided'}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                          <div>
                                            <p className="text-xs text-gray-500">Signed Up</p>
                                            <p className="text-sm text-gray-900">
                                              {formatDateTime(entry.created_at)}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                        Interest Reason
                                      </p>
                                      {entry.interest_reason ? (
                                        <p className="text-sm text-gray-700 leading-relaxed bg-white rounded-lg p-3 border border-gray-200">
                                          {entry.interest_reason}
                                        </p>
                                      ) : (
                                        <p className="text-sm text-gray-400 italic">
                                          No interest reason provided
                                        </p>
                                      )}
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
              {filteredEntries.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {filteredEntries.length} total entries
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
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
