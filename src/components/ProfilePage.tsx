import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Sparkles, Palette, Calendar, ArrowLeft, Download, Copy, Check, LogOut, Plus, Crown, Settings, Video, MapPin, Clock, History, Award, Star, Share2, Heart, Scissors, Trash2, Grid, List, RefreshCw, TrendingUp, Briefcase, DollarSign, Users, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Ban, Loader2, Save, X, Phone, Mail, ExternalLink, ChevronDown, Globe, ArrowRight } from 'lucide-react';
import { elementalTypes } from '@/data/elementalTypes';
import { hasSubtypeProfileAccess, getSubtypeProfilePriceUsd } from '@/lib/subtypeProfileAccess';
import { hasWorkshopAccess } from '@/lib/workshopAccess';
import { supabase } from '@/lib/supabase';
import CustomPaletteBuilder from './CustomPaletteBuilder';
import LockedOverlay from './LockedOverlay';
import ProfilePurchaseCheckout from './ProfilePurchaseCheckout';
import ProfileSettings from './ProfileSettings';
import SocialShareCard from './SocialShareCard';
import RetakeQuizSection from './RetakeQuizSection';
import QuizHistory from './QuizHistory';
import { toast } from '@/components/ui/use-toast';
import { SavedHairColor } from './HairColorGuide';
import { SavedPaletteColor } from '@/lib/savedPalette';


// ─────────────────────────────────────────────────────────────────────────────
// ConsultantAvailabilityManager (inlined)
// ─────────────────────────────────────────────────────────────────────────────

interface DateAvailability {
  id: string;
  consultant_id: string;
  specific_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface ConsultantAvailabilityManagerProps {
  consultantId: string;
}

type DayStatus = 'available' | 'blocked' | 'none';

interface PendingSlot {
  specific_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const pad = (n: number) => String(n).padStart(2, '0');
const toDateStr = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const formatDisplayDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
};

const formatAvailTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${pad(m)} ${ampm}`;
};

const TIME_OPTIONS: string[] = [];
for (let h = 6; h <= 22; h++) {
  TIME_OPTIONS.push(`${pad(h)}:00`);
  if (h < 22) TIME_OPTIONS.push(`${pad(h)}:30`);
}

function ConsultantAvailabilityManager({ consultantId }: ConsultantAvailabilityManagerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<DateAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [formStart, setFormStart] = useState('09:00');
  const [formEnd, setFormEnd] = useState('17:00');
  const [formAvailable, setFormAvailable] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability();
  }, [consultantId, currentMonth]);

  useEffect(() => {
    if (!selectedDate) return;
    const existing = availability.find(a => a.specific_date === selectedDate);
    if (existing) {
      setFormStart(existing.start_time.slice(0, 5));
      setFormEnd(existing.end_time.slice(0, 5));
      setFormAvailable(existing.is_available);
    } else {
      setFormStart('09:00');
      setFormEnd('17:00');
      setFormAvailable(true);
    }
    setFormError(null);
  }, [selectedDate]);

  const fetchAvailability = async () => {
    setLoading(true);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const from = toDateStr(new Date(year, month - 1, 1));
    const to = toDateStr(new Date(year, month + 2, 0));

    const { data, error } = await supabase
      .from('consultant_availability')
      .select('*')
      .eq('consultant_id', consultantId)
      .not('specific_date', 'is', null)
      .gte('specific_date', from)
      .lte('specific_date', to)
      .order('specific_date');

    if (error) console.error('Failed to fetch availability:', error);
    else setAvailability(data || []);
    setLoading(false);
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1).getDay();
    const last = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = Array(first).fill(null);
    for (let d = 1; d <= last; d++) days.push(new Date(year, month, d));
    return days;
  };

  const getDayStatus = (date: Date): DayStatus => {
    const ds = toDateStr(date);
    const slot = availability.find(a => a.specific_date === ds);
    if (!slot) return 'none';
    return slot.is_available ? 'available' : 'blocked';
  };

  const isPast = (date: Date) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleSave = async () => {
    if (!selectedDate) return;
    setFormError(null);
    if (formAvailable && formStart >= formEnd) {
      setFormError('End time must be after start time.');
      return;
    }
    setSaving(true);
    const existing = availability.find(a => a.specific_date === selectedDate);
    const payload: PendingSlot = {
      specific_date: selectedDate,
      start_time: formStart + ':00',
      end_time: formEnd + ':00',
      is_available: formAvailable
    };
    let error: any = null;
    if (existing) {
      ({ error } = await supabase.from('consultant_availability').update(payload).eq('id', existing.id));
    } else {
      ({ error } = await supabase.from('consultant_availability').insert({ ...payload, consultant_id: consultantId, day_of_week: 0 }));
    }
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Saved', description: `Availability updated for ${formatDisplayDate(selectedDate)}` });
      await fetchAvailability();
      setSelectedDate(null);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedDate) return;
    const existing = availability.find(a => a.specific_date === selectedDate);
    if (!existing) { setSelectedDate(null); return; }
    setSaving(true);
    const { error } = await supabase.from('consultant_availability').delete().eq('id', existing.id);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Removed', description: `Availability cleared for ${formatDisplayDate(selectedDate)}` });
      await fetchAvailability();
      setSelectedDate(null);
    }
    setSaving(false);
  };

  const handleBlockWeekends = async () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const last = new Date(year, month + 1, 0).getDate();
    const rows: PendingSlot[] = [];
    for (let d = 1; d <= last; d++) {
      const date = new Date(year, month, d);
      const dow = date.getDay();
      if ((dow === 0 || dow === 6) && !isPast(date)) {
        const ds = toDateStr(date);
        if (!availability.find(a => a.specific_date === ds)) {
          rows.push({ specific_date: ds, start_time: '09:00:00', end_time: '17:00:00', is_available: false });
        }
      }
    }
    if (!rows.length) { toast({ title: 'Nothing to do', description: 'All weekends already set.' }); return; }
    setSaving(true);
    const { error } = await supabase.from('consultant_availability').insert(rows.map(r => ({ ...r, consultant_id: consultantId, day_of_week: 0 })));
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Done', description: `Blocked ${rows.length} weekend day(s).` }); fetchAvailability(); }
    setSaving(false);
  };

  const days = getDaysInMonth();
  const existingForSelected = selectedDate ? availability.find(a => a.specific_date === selectedDate) : null;
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthStr = `${year}-${pad(month + 1)}`;
  const monthSlots = availability.filter(a => a.specific_date.startsWith(monthStr));
  const openDays = monthSlots.filter(a => a.is_available).length;
  const blockedDays = monthSlots.filter(a => !a.is_available).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Manage Availability
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Click any future date to set or edit your hours</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
            <Check className="w-3.5 h-3.5" /> {openDays} open
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full font-medium">
            <Ban className="w-3.5 h-3.5" /> {blockedDays} blocked
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-base font-semibold text-gray-900">{MONTH_NAMES[month]} {year}</h3>
            <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2 uppercase tracking-wide">{d}</div>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, idx) => {
                if (!date) return <div key={idx} />;
                const ds = toDateStr(date);
                const past = isPast(date);
                const status = getDayStatus(date);
                const sel = selectedDate === ds;
                const today = toDateStr(new Date()) === ds;
                let bg = 'hover:bg-gray-100 text-gray-700';
                if (sel) bg = 'bg-indigo-600 text-white shadow-md';
                else if (status === 'available') bg = 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
                else if (status === 'blocked') bg = 'bg-red-100 text-red-700 hover:bg-red-200';
                else if (past) bg = 'text-gray-300 cursor-not-allowed';
                return (
                  <button
                    key={idx}
                    disabled={past}
                    onClick={() => setSelectedDate(sel ? null : ds)}
                    className={`relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-150 ${bg} ${today && !sel ? 'ring-2 ring-indigo-400 ring-offset-1' : ''}`}
                  >
                    {date.getDate()}
                    {status !== 'none' && !sel && (
                      <span className={`absolute bottom-1 w-1 h-1 rounded-full ${status === 'available' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 inline-block" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-200 inline-block" /> Blocked</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded ring-2 ring-indigo-400 inline-block" /> Today</span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
            <button onClick={handleBlockWeekends} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50">
              <Ban className="w-3.5 h-3.5" /> Block weekends this month
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selectedDate ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{formatDisplayDate(selectedDate)}</h3>
                <button onClick={() => setSelectedDate(null)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 mb-5">
                <button onClick={() => setFormAvailable(true)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${formAvailable ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <Check className="w-4 h-4" /> Available
                </button>
                <button onClick={() => setFormAvailable(false)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${!formAvailable ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                  <Ban className="w-4 h-4" /> Blocked
                </button>
              </div>

              {formAvailable && (
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Start Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select value={formStart} onChange={e => setFormStart(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{formatAvailTime(t + ':00')}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">End Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select value={formEnd} onChange={e => setFormEnd(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{formatAvailTime(t + ':00')}</option>)}
                      </select>
                    </div>
                  </div>
                  {formAvailable && formStart >= formEnd && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> End time must be after start time
                    </p>
                  )}
                </div>
              )}

              {formAvailable && (
                <div className="bg-indigo-50 rounded-xl p-3 mb-5 text-xs text-indigo-700">
                  <span className="font-medium">Hours:</span> {formatAvailTime(formStart + ':00')} – {formatAvailTime(formEnd + ':00')}
                  {formStart < formEnd && (
                    <span className="ml-1 text-indigo-500">
                      ({Math.round((
                        (parseInt(formEnd.split(':')[0]) * 60 + parseInt(formEnd.split(':')[1])) -
                        (parseInt(formStart.split(':')[0]) * 60 + parseInt(formStart.split(':')[1]))
                      ) / 60 * 10) / 10}h window)
                    </span>
                  )}
                </div>
              )}

              {formError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2 mb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {formError}
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={handleSave} disabled={saving || (formAvailable && formStart >= formEnd)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {existingForSelected ? 'Update' : 'Save'}
                </button>
                {existingForSelected && (
                  <button onClick={handleDelete} disabled={saving} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500 font-medium">Select a date</p>
              <p className="text-xs text-gray-400 mt-1">Click any future date on the calendar to set your availability</p>
            </div>
          )}

          {monthSlots.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                {MONTH_NAMES[month]} Schedule
              </h4>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {monthSlots.map(slot => {
                  const [sy, sm, sd] = slot.specific_date.split('-').map(Number);
                  const dateObj = new Date(sy, sm - 1, sd);
                  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                  const isSelected = selectedDate === slot.specific_date;
                  return (
                    <button key={slot.id} onClick={() => setSelectedDate(isSelected ? null : slot.specific_date)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors text-xs ${isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'}`}>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${slot.is_available ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      <span className="flex-1 font-medium text-gray-800">{dayName}</span>
                      {slot.is_available ? (
                        <span className="text-gray-500">{formatAvailTime(slot.start_time)} – {formatAvailTime(slot.end_time)}</span>
                      ) : (
                        <span className="text-red-500 font-medium">Blocked</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// ProfilePage
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps `children` in the {@link LockedOverlay} only when `locked` is true,
 * otherwise renders them as-is. Used to paywall the full profile content for
 * free users while still showing it (blurred) as a preview.
 */
type MaybeLockedOverlayProps = { locked: boolean } & React.ComponentProps<typeof LockedOverlay>;

const MaybeLockedOverlay: React.FC<MaybeLockedOverlayProps> = ({ locked, children, ...overlayProps }) =>
  locked ? <LockedOverlay {...overlayProps}>{children}</LockedOverlay> : <>{children}</>;

interface ProfilePageProps {
  user: any;
  profile: any;
  onBack: () => void;
  onSignOut: () => void;
  onStartQuiz: (mode?: 'full' | 'subtype') => void;
  onProfileUpdate?: () => void;
  savedHairColors?: SavedHairColor[];
  onRemoveHairColor?: (colorId: string) => void;
  savedPaletteColors?: SavedPaletteColor[];
  onRemovePaletteColor?: (colorId: string) => void;
}

interface Subscription {
  id: string;
  status: string;
  plan_id: string;
  billing_cycle: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  membership_plans?: {
    name: string;
    tier: number;
    features: string[];
  };
}

interface ClientProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  location: string | null;
  elemental_type: string | null;
  elemental_subtype: string | null;
  membership_tier: string | null;
  bio: string | null;
  website: string | null;
  created_at: string | null;
}

interface ConsultationBookingData {
  id: string;
  user_id: string;
  booking_date: string | null;
  start_time: string | null;
  end_time: string | null;
  status: string;
  payment_status: string;
  payment_amount: number | null;
  total_price: number;
  meeting_link: string | null;
  location: string | null;
  notes: string | null;
  user_notes: string | null;
  is_in_person_pending?: boolean;
  consultants?: {
    name: string;
    image_url: string;
    specialties: string[];
  };
  consultation_types?: {
    name: string;
    duration_minutes: number;
    is_virtual: boolean;
  };
  user_profiles?: ClientProfile;
}

interface ConsultantProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  bio: string;
  avatar_url: string;
  specialties: string[];
  years_experience: number;
  hourly_rate: number;
  rating: number;
  total_reviews: number;
  total_consultations: number;
  is_active: boolean;
  is_verified: boolean;
}

interface ActivityItem {
  id: string;
  type: 'quiz' | 'consultation' | 'class' | 'palette' | 'membership';
  title: string;
  description: string;
  date: string;
  color: string;
}

// ── Helper: is this booking pending in-person scheduling? ──────────────────
const isInPersonPending = (b: ConsultationBookingData) =>
  !!b.is_in_person_pending || (!b.booking_date && !b.consultation_types?.is_virtual);

// ── Helper: safe date string for display ──────────────────────────────────
const safeBookingDate = (b: ConsultationBookingData) =>
  b.booking_date ?? null;


// ─────────────────────────────────────────────────────────────────────────────
// ClientDetailPanel — expanded view of a booking with client info + actions
// ─────────────────────────────────────────────────────────────────────────────

interface ClientDetailPanelProps {
  booking: ConsultationBookingData;
  onClose: () => void;
  onStatusUpdate: (bookingId: string, status: string) => Promise<void>;
  onConfirmScheduled: (bookingId: string) => Promise<void>;
  isUpdating: boolean;
  formatDate: (d: string | null) => string;
  formatTime: (t: string | null) => string;
}

const ClientDetailPanel: React.FC<ClientDetailPanelProps> = ({
  booking,
  onClose,
  onStatusUpdate,
  onConfirmScheduled,
  isUpdating,
  formatDate,
  formatTime,
}) => {
  const client = booking.user_profiles;
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyField = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const clientElementType = client?.elemental_type
    ? elementalTypes.find(t => t.id === client.elemental_type)
    : null;
  const clientSubtype = clientElementType && client?.elemental_subtype
    ? clientElementType.subtypes.find(s => s.id === client.elemental_subtype)
    : null;

  const getInitials = () => {
    const name = client?.full_name;
    if (name) {
      const parts = name.trim().split(' ');
      return parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
    }
    return booking.user_id?.slice(0, 2).toUpperCase() ?? '??';
  };

  const isPending = !!booking.is_in_person_pending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            Client Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* ── Client Identity ── */}
          <div className="flex items-start gap-5">
            {client?.avatar_url ? (
              <img
                src={client.avatar_url}
                alt={client.full_name || 'Client'}
                className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-200 to-violet-200 flex items-center justify-center text-indigo-700 font-bold text-2xl flex-shrink-0 border-2 border-gray-100">
                {getInitials()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-0.5">
                {client?.full_name || `Client ${booking.user_id?.slice(0, 8)}…`}
              </h3>
              {client?.bio && (
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{client.bio}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {clientElementType && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{ backgroundColor: clientElementType.colors[0]?.hex || '#6366f1' }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {clientSubtype ? clientSubtype.name : clientElementType.name}
                  </span>
                )}
                {client?.membership_tier && client.membership_tier !== 'free' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    <Crown className="w-3 h-3" />
                    {client.membership_tier}
                  </span>
                )}
                {client?.created_at && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    <Calendar className="w-3 h-3" />
                    Member since {new Date(client.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Information</h4>

            {client?.email ? (
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{client.email}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyField(client.email!, 'email')}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`mailto:${client.email}`}
                    className="p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Send email"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 italic">No email provided</p>
              </div>
            )}

            {client?.phone ? (
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">{client.phone}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyField(client.phone!, 'phone')}
                    className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy phone"
                  >
                    {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={`tel:${client.phone}`}
                    className="p-1.5 rounded-lg hover:bg-green-100 text-gray-400 hover:text-green-600 transition-colors"
                    title="Call"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 italic">No phone number provided</p>
              </div>
            )}

            {client?.location && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{client.location}</p>
                </div>
              </div>
            )}

            {client?.website && (
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Website</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{client.website}</p>
                </div>
                <a
                  href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-purple-100 text-gray-400 hover:text-purple-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* ── Booking Details ── */}
          <div className="bg-indigo-50 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Booking Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Service</p>
                <p className="font-semibold text-gray-900">{booking.consultation_types?.name || 'Consultation'}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Type</p>
                <p className="font-semibold text-gray-900 flex items-center gap-1">
                  {booking.consultation_types?.is_virtual
                    ? <><Video className="w-3.5 h-3.5 text-blue-500" />Virtual</>
                    : <><MapPin className="w-3.5 h-3.5 text-green-500" />In-Person</>}
                </p>
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Date &amp; Time</p>
                {isPending ? (
                  <p className="font-semibold text-amber-600 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />Pending
                  </p>
                ) : (
                  <p className="font-semibold text-gray-900">
                    {formatDate(booking.booking_date)}{booking.start_time ? `, ${formatTime(booking.start_time)}` : ''}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Duration</p>
                <p className="font-semibold text-gray-900">
                  {booking.consultation_types?.duration_minutes
                    ? `${booking.consultation_types.duration_minutes} min`
                    : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Amount</p>
                <p className="font-semibold text-gray-900">
                  {Number(booking.total_price) === 0 ? 'Free' : `$${Number(booking.total_price).toFixed(2)}`}
                </p>
              </div>
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-0.5">Payment</p>
                <p className={`font-semibold capitalize ${booking.payment_status === 'paid' ? 'text-green-600' : booking.payment_status === 'free' ? 'text-blue-600' : 'text-amber-600'}`}>
                  {booking.payment_status}
                </p>
              </div>
            </div>

            {(booking.notes || booking.user_notes) && (
              <div className="mt-3 pt-3 border-t border-indigo-100">
                {booking.notes && (
                  <div className="mb-2">
                    <p className="text-xs text-indigo-400 font-medium mb-0.5">Consultant Notes</p>
                    <p className="text-sm text-gray-700 bg-white rounded-lg p-2">{booking.notes}</p>
                  </div>
                )}
                {booking.user_notes && (
                  <div>
                    <p className="text-xs text-indigo-400 font-medium mb-0.5">Client Notes</p>
                    <p className="text-sm text-gray-700 bg-white rounded-lg p-2">{booking.user_notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── In-Person Pending Banner + Confirm Action ── */}
          {isPending && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Action Required: Contact Client</h4>
                  <p className="text-sm text-amber-700">
                    This client booked an in-person session. Call or email them to agree on a convenient date, time, and location. Once you've confirmed the appointment, mark it as scheduled below.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {client?.phone && (
                  <a
                    href={`tel:${client.phone}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Call {client.phone}
                  </a>
                )}
                {client?.email && (
                  <a
                    href={`mailto:${client.email}?subject=Your%20Color%20Consultation%20Appointment&body=Hi%20${encodeURIComponent(client.full_name || 'there')}%2C%0A%0AI%27d%20love%20to%20schedule%20your%20in-person%20color%20consultation.%20When%20would%20work%20best%20for%20you%3F%0A%0ABest%2C`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email Client
                  </a>
                )}
              </div>
              <div className="border-t border-amber-200 pt-4">
                <p className="text-xs text-amber-600 font-medium mb-3">
                  Once you've agreed on a time with the client, click below to mark this booking as scheduled. This will remove it from the "needs scheduling" list.
                </p>
                <button
                  onClick={() => onConfirmScheduled(booking.id)}
                  disabled={isUpdating}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {isUpdating
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <CheckCircle className="w-4 h-4" />}
                  Mark as Scheduled (Call Confirmed)
                </button>
              </div>
            </div>
          )}

          {/* ── Already Confirmed In-Person ── */}
          {!isPending && !booking.consultation_types?.is_virtual && booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-900 text-sm">Appointment Scheduled</p>
                <p className="text-xs text-green-700">You've confirmed this in-person booking with the client.</p>
              </div>
            </div>
          )}

          {/* ── Meeting Link ── */}
          {booking.meeting_link && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-400 font-medium">Meeting Link</p>
                <p className="text-sm font-semibold text-blue-700 truncate">{booking.meeting_link}</p>
              </div>
              <a
                href={booking.meeting_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0"
              >
                Join
              </a>
            </div>
          )}

          {/* ── Status Actions ── */}
          {booking.status === 'confirmed' && (
            <div className="flex gap-3">
              <button
                onClick={() => onStatusUpdate(booking.id, 'completed')}
                disabled={isUpdating}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Mark as Completed
              </button>
              <button
                onClick={() => onStatusUpdate(booking.id, 'cancelled')}
                disabled={isUpdating}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}

          {booking.status === 'pending' && !isPending && (
            <button
              onClick={() => onStatusUpdate(booking.id, 'confirmed')}
              disabled={isUpdating}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Confirm Booking
            </button>
          )}

        </div>
      </div>
    </div>
  );
};


const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  profile,
  onBack,
  onSignOut,
  onStartQuiz,
  onProfileUpdate,
  savedHairColors = [],
  onRemoveHairColor,
  savedPaletteColors = [],
  onRemovePaletteColor
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    'profile' | 'colors' | 'palettes' | 'my-palette' | 'consultations' | 'membership' |
    'settings' | 'activity' | 'hair-colors' | 'retake-quiz' | 'quiz-history' |
    'consultant-dashboard' | 'consultant-bookings' | 'consultant-earnings' |
    'consultant-availability'
  >('profile');

  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [consultations, setConsultations] = useState<ConsultationBookingData[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showProfileCheckout, setShowProfileCheckout] = useState(false);
  const [hairColorFilter, setHairColorFilter] = useState<'all' | 'warm' | 'cool' | 'neutral'>('all');
  const [hairColorView, setHairColorView] = useState<'grid' | 'list'>('grid');

  const [consultantProfile, setConsultantProfile] = useState<ConsultantProfile | null>(null);
  const [loadingConsultantProfile, setLoadingConsultantProfile] = useState(true);
  const [consultantBookings, setConsultantBookings] = useState<ConsultationBookingData[]>([]);
  const [loadingConsultantBookings, setLoadingConsultantBookings] = useState(false);
  const [consultantBookingFilter, setConsultantBookingFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('upcoming');

  // ── New: selected booking for detail panel ────────────────────────────────
  const [selectedBooking, setSelectedBooking] = useState<ConsultationBookingData | null>(null);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);

  const userType = profile?.elemental_type
    ? elementalTypes.find(t => t.id === profile.elemental_type)
    : null;

  const userSubtype = userType && profile?.elemental_subtype
    ? userType.subtypes.find(s => s.id === profile.elemental_subtype)
    : null;

  const activeColors = userSubtype?.colors || userType?.colors || [];
  const isPremium = hasWorkshopAccess(profile);
  const ownsProfile = hasSubtypeProfileAccess(profile);
  const isConsultant = !!consultantProfile;

  useEffect(() => {
    if (user) {
      fetchSubscription();
      fetchConsultations();
      fetchActivities();
      fetchConsultantProfile();
    } else {
      setLoadingSubscription(false);
      setLoadingConsultations(false);
      setLoadingActivities(false);
      setLoadingConsultantProfile(false);
    }
  }, [user]);

  useEffect(() => {
    if (consultantProfile) fetchConsultantBookings(consultantProfile.id);
  }, [consultantProfile]);

  const fetchConsultantProfile = async () => {
    if (!user) { setLoadingConsultantProfile(false); return; }
    setLoadingConsultantProfile(true);
    try {
      const { data, error } = await supabase.from('consultants').select('*').eq('user_id', user.id).single();
      if (error && error.code !== 'PGRST116') console.error('Error fetching consultant profile:', error);
      setConsultantProfile(data || null);
    } catch (error) {
      console.error('Error fetching consultant profile:', error);
    } finally {
      setLoadingConsultantProfile(false);
    }
  };

  const fetchConsultantBookings = async (consultantId: string) => {
    setLoadingConsultantBookings(true);
    try {
      // Step 1: fetch bookings + consultation types
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('consultation_bookings')
        .select('*, consultation_types(*)')
        .eq('consultant_id', consultantId)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching consultant bookings:', bookingsError);
        setLoadingConsultantBookings(false);
        return;
      }

      const bookings: ConsultationBookingData[] = bookingsData || [];

      // Step 2: collect unique user_ids and fetch profiles in one query
      const userIds = [...new Set(bookings.map(b => b.user_id).filter(Boolean))];

      let profilesMap: Record<string, ClientProfile> = {};
      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('user_profiles')
          .select('id, full_name, email, avatar_url, phone, location, elemental_type, elemental_subtype, membership_tier, bio, website, created_at')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching user profiles:', profilesError);
        } else {
          (profilesData || []).forEach(p => { profilesMap[p.id] = p; });
        }
      }

      // Step 3: merge profiles into bookings
      const merged = bookings.map(b => ({
        ...b,
        user_profiles: b.user_id ? (profilesMap[b.user_id] ?? null) : null,
      }));

      setConsultantBookings(merged);

      // Refresh selected booking panel if open
      if (selectedBooking) {
        const refreshed = merged.find(b => b.id === selectedBooking.id);
        if (refreshed) setSelectedBooking(refreshed);
      }
    } catch (error) {
      console.error('Error fetching consultant bookings:', error);
    } finally {
      setLoadingConsultantBookings(false);
    }
  };

  const fetchSubscription = async () => {
    if (!user) { setLoadingSubscription(false); setSubscription(null); return; }
    setLoadingSubscription(true);
    try {
      const { data, error } = await supabase.from('user_subscriptions').select('*, membership_plans(*)').eq('user_id', user.id).single();
      if (error) {
        if (error.code !== 'PGRST116') console.error('Error fetching subscription:', error);
        setSubscription(null);
      } else {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription(null);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const fetchConsultations = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('consultation_bookings')
        .select('*, consultants(*), consultation_types(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) console.error('Error fetching consultations:', error);
      else setConsultations(data || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoadingConsultations(false);
    }
  };

  const fetchActivities = async () => {
    if (!user) return;
    try {
      const activityList: ActivityItem[] = [];
      if (profile?.quiz_completed_at) {
        activityList.push({ id: 'quiz-' + profile.quiz_completed_at, type: 'quiz', title: 'Completed Elemental Quiz', description: `Discovered ${userType?.name || 'your'} elemental type`, date: profile.quiz_completed_at, color: 'purple' });
      }
      if (profile?.subtype_completed_at) {
        activityList.push({ id: 'subtype-' + profile.subtype_completed_at, type: 'quiz', title: 'Discovered Your Subtype', description: `Identified as ${userSubtype?.name || 'your subtype'}`, date: profile.subtype_completed_at, color: 'indigo' });
      }
      consultations.forEach(c => {
        activityList.push({ id: 'consultation-' + c.id, type: 'consultation', title: c.consultation_types?.name || 'Color Consultation', description: `with ${c.consultants?.name || 'Consultant'}`, date: c.booking_date || c.id, color: 'pink' });
      });
      if (profile?.membership_tier && profile.membership_tier !== 'free') {
        activityList.push({ id: 'membership-' + profile.updated_at, type: 'membership', title: 'Upgraded to Premium', description: `${profile.membership_tier} membership activated`, date: profile.updated_at || profile.created_at, color: 'amber' });
      }
      if (profile?.created_at) {
        activityList.push({ id: 'account-' + profile.created_at, type: 'quiz', title: 'Joined Elemental Color', description: 'Created your account', date: profile.created_at, color: 'green' });
      }
      activityList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setActivities(activityList);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-subscription', { body: { action: 'cancel' } });
      if (error) throw error;
      toast({ title: 'Subscription cancelled', description: data.message });
      fetchSubscription();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to cancel subscription', variant: 'destructive' });
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-subscription', { body: { action: 'reactivate' } });
      if (error) throw error;
      toast({ title: 'Subscription reactivated', description: data.message });
      fetchSubscription();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to reactivate subscription', variant: 'destructive' });
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    setUpdatingBookingId(bookingId);
    try {
      const { error } = await supabase.from('consultation_bookings').update({ status }).eq('id', bookingId);
      if (error) throw error;
      toast({ title: 'Booking updated', description: `Booking marked as ${status}` });
      if (consultantProfile) await fetchConsultantBookings(consultantProfile.id);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to update booking', variant: 'destructive' });
    } finally {
      setUpdatingBookingId(null);
    }
  };

  // ── New: confirm in-person booking has been scheduled (set is_in_person_pending = false) ──
  const handleConfirmScheduled = async (bookingId: string) => {
    setUpdatingBookingId(bookingId);
    try {
      const { error } = await supabase
        .from('consultation_bookings')
        .update({ is_in_person_pending: false, status: 'confirmed' })
        .eq('id', bookingId);
      if (error) throw error;
      toast({
        title: 'Appointment Confirmed',
        description: 'The booking has been marked as scheduled. The client will be notified.',
      });
      if (consultantProfile) await fetchConsultantBookings(consultantProfile.id);
      // Update the panel with latest data
      setSelectedBooking(prev =>
        prev?.id === bookingId
          ? { ...prev, is_in_person_pending: false, status: 'confirmed' }
          : prev
      );
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to confirm booking', variant: 'destructive' });
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const downloadPalette = () => {
    if (!activeColors.length) return;
    const name = userSubtype?.name || userType?.name || 'My';
    const paletteText = activeColors.map(c => `${c.name}: ${c.hex}`).join('\n');
    const blob = new Blob([`${name} Color Palette\n\n${paletteText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-')}-color-palette.txt`;
    a.click();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'TBD';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const formatRelativeDate = (dateString: string) => {
    const diffDays = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getClientName = (booking: ConsultationBookingData) =>
    booking.user_profiles?.full_name || booking.user_profiles?.email || `Client ${booking.user_id?.slice(0, 8)}…`;

  const getClientInitials = (booking: ConsultationBookingData) => {
    const name = booking.user_profiles?.full_name;
    if (name) {
      const parts = name.trim().split(' ');
      return parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();
    }
    return booking.user_id?.slice(0, 2).toUpperCase() ?? '??';
  };

  const getClientAvatar = (booking: ConsultationBookingData) =>
    booking.user_profiles?.avatar_url || null;

  const upcomingConsultations = consultations.filter(c => {
    if (c.status === 'cancelled') return false;
    if (isInPersonPending(c)) return true;
    if (!c.booking_date) return false;
    const d = new Date(c.booking_date); const today = new Date(); today.setHours(0, 0, 0, 0);
    return d >= today;
  });

  const pastConsultations = consultations.filter(c => {
    if (isInPersonPending(c)) return false;
    if (c.status === 'cancelled' || c.status === 'completed') return true;
    if (!c.booking_date) return false;
    const d = new Date(c.booking_date); const today = new Date(); today.setHours(0, 0, 0, 0);
    return d < today;
  });

  const filteredConsultantBookings = consultantBookings.filter(b => {
    if (consultantBookingFilter === 'cancelled') return b.status === 'cancelled';
    if (consultantBookingFilter === 'all') return true;
    if (consultantBookingFilter === 'upcoming') {
      if (b.status === 'cancelled') return false;
      if (isInPersonPending(b)) return true;
      if (!b.booking_date) return false;
      const d = new Date(b.booking_date); const today = new Date(); today.setHours(0, 0, 0, 0);
      return d >= today;
    }
    if (consultantBookingFilter === 'past') {
      if (isInPersonPending(b)) return false;
      if (b.status === 'cancelled') return false;
      if (!b.booking_date) return false;
      const d = new Date(b.booking_date); const today = new Date(); today.setHours(0, 0, 0, 0);
      return d < today;
    }
    return true;
  });

  const totalEarnings = consultantBookings
    .filter(b => b.payment_status === 'paid')
    .reduce((sum, b) => sum + Number(b.payment_amount || b.total_price || 0), 0);

  const thisMonthEarnings = consultantBookings
    .filter(b => {
      if (b.payment_status !== 'paid') return false;
      if (!b.booking_date) return false;
      const d = new Date(b.booking_date); const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, b) => sum + Number(b.payment_amount || b.total_price || 0), 0);

  const upcomingConsultantBookings = consultantBookings.filter(b => {
    if (b.status === 'cancelled') return false;
    if (isInPersonPending(b)) return true;
    if (!b.booking_date) return false;
    const d = new Date(b.booking_date); const today = new Date(); today.setHours(0, 0, 0, 0);
    return d >= today;
  });

  const inPersonPendingBookings = consultantBookings.filter(b =>
    b.status !== 'cancelled' && b.status !== 'completed' && isInPersonPending(b)
  );

  const handleProfileUpdate = () => { if (onProfileUpdate) onProfileUpdate(); fetchActivities(); };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return Sparkles; case 'consultation': return Calendar;
      case 'class': return Award; case 'palette': return Palette;
      case 'membership': return Crown; default: return Star;
    }
  };

  const getActivityColor = (color: string) => ({
    purple: 'bg-purple-100 text-purple-600', indigo: 'bg-indigo-100 text-indigo-600',
    pink: 'bg-pink-100 text-pink-600', amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600', blue: 'bg-blue-100 text-blue-600'
  }[color] || 'bg-gray-100 text-gray-600');

  const getStatusIcon = (status: string) => {
    if (status === 'confirmed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (status === 'cancelled') return <XCircle className="w-4 h-4 text-red-500" />;
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-blue-500" />;
    return <AlertCircle className="w-4 h-4 text-amber-500" />;
  };

  const getStatusStyle = (status: string) => ({
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
  }[status] || 'bg-amber-100 text-amber-700');

  const filteredHairColors = savedHairColors.filter(c => hairColorFilter === 'all' || c.undertone === hairColorFilter);
  const groupedHairColors = filteredHairColors.reduce((acc, color) => {
    if (!acc[color.elementId]) acc[color.elementId] = [];
    acc[color.elementId].push(color);
    return acc;
  }, {} as Record<string, SavedHairColor[]>);

  const getElementName = (id: string) => elementalTypes.find(e => e.id === id)?.name || id;
  const getElementColor = (id: string) => elementalTypes.find(e => e.id === id)?.colors[0].hex || '#666';

  // Group saved palette colors by element for display
  const groupedPaletteColors = savedPaletteColors.reduce((acc, color) => {
    if (!acc[color.elementId]) acc[color.elementId] = [];
    acc[color.elementId].push(color);
    return acc;
  }, {} as Record<string, SavedPaletteColor[]>);

  const allTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'quiz-history', label: 'Quiz History', icon: TrendingUp },
    { id: 'retake-quiz', label: 'Retake Quiz', icon: RefreshCw },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'activity', label: 'Activity', icon: History },
    { id: 'colors', label: 'My Colors', icon: Palette },
    { id: 'my-palette', label: 'My Palette', icon: Heart },
    { id: 'hair-colors', label: 'Hair Colors', icon: Scissors },
    { id: 'palettes', label: 'Custom Palettes', icon: Plus },
    // Consultations & Membership hidden — Calendly bookings don't populate the old in-app list;
    // membership plans are off in the current workshop launch. Code preserved below.
    // Consultant dashboard/bookings/availability/earnings hidden — virtual bookings use Calendly.
  ];

  // ── Sub-component: ClientAvatar ───────────────────────────────────────────
  const ClientAvatar = ({ booking, size = 'md' }: { booking: ConsultationBookingData; size?: 'sm' | 'md' | 'lg' }) => {
    const avatarUrl = getClientAvatar(booking);
    const initials = getClientInitials(booking);
    const sizeClass = size === 'sm' ? 'w-10 h-10 text-sm' : size === 'lg' ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-base';
    return avatarUrl ? (
      <img src={avatarUrl} alt={getClientName(booking)} className={`${sizeClass} rounded-full object-cover flex-shrink-0`} />
    ) : (
      <div className={`${sizeClass} rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 flex items-center justify-center text-indigo-700 font-bold flex-shrink-0`}>
        {initials}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Client Detail Panel Modal ── */}
      {selectedBooking && (
        <ClientDetailPanel
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusUpdate={handleUpdateBookingStatus}
          onConfirmScheduled={handleConfirmScheduled}
          isUpdating={updatingBookingId === selectedBooking.id}
          formatDate={formatDate}
          formatTime={formatTime}
        />
      )}

      {/* ── Header ── */}
      <div
        className="relative h-64 overflow-hidden"
        style={{ background: activeColors.length > 0 ? `linear-gradient(135deg, ${activeColors[0].hex}dd, ${activeColors[1]?.hex || activeColors[0].hex}dd)` : 'linear-gradient(135deg, #374151, #1f2937)' }}
      >
        {userType && <img src={userType.image} alt={userType.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 h-full">
          <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <button onClick={onSignOut} className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name || 'Profile'} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-serif border-4 border-white shadow-lg" style={{ backgroundColor: activeColors[0]?.hex || '#374151' }}>
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
              )}
              {isPremium && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
              {isConsultant && (
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center border-2 border-white">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-serif text-gray-900">{profile?.full_name || 'Welcome'}</h1>
                {isPremium && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-rose-500 text-white text-xs font-bold rounded-full">
                    {profile?.membership_tier === 'professional' ? 'PRO' : 'PREMIUM'}
                  </span>
                )}
                {isConsultant && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> CONSULTANT
                  </span>
                )}
              </div>
              <p className="text-gray-500">{user?.email}</p>
              {profile?.bio && <p className="text-gray-600 text-sm mt-1 max-w-md">{profile.bio}</p>}
              {userType ? (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium" style={{ backgroundColor: activeColors[0]?.hex }}>
                    <Sparkles className="w-4 h-4" />{userSubtype ? userSubtype.name : userType.name}
                  </span>
                  <span className="text-sm text-gray-500">{userType.name} Element • {userType.season} Season</span>
                </div>
              ) : (
                <button onClick={onStartQuiz} className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Sparkles className="w-4 h-4" /> Take the Quiz
                </button>
              )}
            </div>

            <div className="flex gap-4 text-center">
              <div className="px-4"><div className="text-2xl font-semibold text-gray-900">{activeColors.length}</div><div className="text-sm text-gray-500">Colors</div></div>
              <div className="px-4 border-l border-gray-200"><div className="text-2xl font-semibold text-gray-900">{savedHairColors.length}</div><div className="text-sm text-gray-500">Saved Hair</div></div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {allTabs.map((tab) => {
            const isConsultantTab = ['consultant-dashboard', 'consultant-bookings', 'consultant-earnings', 'consultant-availability'].includes(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? isConsultantTab ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white'
                    : tab.id === 'hair-colors' ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white'
                      : tab.id === 'retake-quiz' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                        : tab.id === 'quiz-history' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                          : 'bg-gray-900 text-white'
                  : isConsultantTab ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'hair-colors' && savedHairColors.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-rose-500 text-white text-xs rounded-full">{savedHairColors.length}</span>
                )}
                {tab.id === 'my-palette' && savedPaletteColors.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-rose-500 text-white text-xs rounded-full">{savedPaletteColors.length}</span>
                )}
                {tab.id === 'consultant-bookings' && upcomingConsultantBookings.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-indigo-700 text-xs rounded-full font-bold">{upcomingConsultantBookings.length}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ── */}
        <div className="pb-20">

          {/* ══ CONSULTANT DASHBOARD ══ */}
          {activeTab === 'consultant-dashboard' && consultantProfile && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    {consultantProfile.avatar_url ? (
                      <img src={consultantProfile.avatar_url} alt={consultantProfile.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20" />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center border-4 border-white/20">
                        <Briefcase className="w-10 h-10 text-white" />
                      </div>
                    )}
                    {consultantProfile.is_verified && (
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif font-bold mb-1">{consultantProfile.name}</h2>
                    <p className="text-white/70 mb-3">{consultantProfile.email}</p>
                    <div className="flex flex-wrap gap-2">
                      {(consultantProfile.specialties || []).map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold">{Number(consultantProfile.rating).toFixed(1)}</div>
                      <div className="text-white/70 text-sm flex items-center gap-1 justify-center"><Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />Rating</div>
                    </div>
                    <div><div className="text-3xl font-bold">{consultantProfile.total_consultations}</div><div className="text-white/70 text-sm">Sessions</div></div>
                    <div><div className="text-3xl font-bold">{consultantProfile.years_experience}</div><div className="text-white/70 text-sm">Yrs Exp.</div></div>
                  </div>
                </div>
              </div>

              {/* In-person pending bookings alert */}
              {inPersonPendingBookings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 mb-1">
                        {inPersonPendingBookings.length} In-Person Booking{inPersonPendingBookings.length > 1 ? 's' : ''} Need Scheduling
                      </h3>
                      <p className="text-sm text-amber-700 mb-3">
                        These clients are waiting for you to contact them and confirm a convenient appointment time.
                      </p>
                      <div className="space-y-2">
                        {inPersonPendingBookings.slice(0, 3).map(b => (
                          <button
                            key={b.id}
                            onClick={() => { setSelectedBooking(b); setActiveTab('consultant-bookings'); }}
                            className="w-full flex items-center gap-3 bg-white rounded-xl p-3 border border-amber-100 hover:border-amber-300 transition-colors text-left"
                          >
                            <ClientAvatar booking={b} size="sm" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">{getClientName(b)}</p>
                              <p className="text-xs text-gray-500">{b.consultation_types?.name}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              {b.user_profiles?.phone && (
                                <a href={`tel:${b.user_profiles.phone}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors">
                                  <Phone className="w-3.5 h-3.5" />{b.user_profiles.phone}
                                </a>
                              )}
                              {b.user_profiles?.email && (
                                <a href={`mailto:${b.user_profiles.email}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors">
                                  <Mail className="w-3.5 h-3.5" />Email
                                </a>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Upcoming', value: upcomingConsultantBookings.length, suffix: 'sessions', icon: Calendar, colorClass: 'bg-indigo-100', iconColor: 'text-indigo-600' },
                  { label: 'This Month', value: `$${thisMonthEarnings.toFixed(0)}`, suffix: 'earned', icon: DollarSign, colorClass: 'bg-green-100', iconColor: 'text-green-600' },
                  { label: 'Total Clients', value: new Set(consultantBookings.map(b => b.user_id)).size, suffix: 'unique', icon: Users, colorClass: 'bg-purple-100', iconColor: 'text-purple-600' },
                  { label: 'All Time', value: `$${totalEarnings.toFixed(0)}`, suffix: 'earned', icon: TrendingUp, colorClass: 'bg-amber-100', iconColor: 'text-amber-600' },
                ].map(({ label, value, suffix, icon: Icon, colorClass, iconColor }) => (
                  <div key={label} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">{label}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-500 mt-1">{suffix}</div>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Manage Availability</p>
                    <p className="text-xs text-gray-500">Set the specific dates and hours you're open for bookings</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab('consultant-availability')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors">
                  Open Calendar →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-serif text-gray-900">Next Sessions</h3>
                  <button onClick={() => setActiveTab('consultant-bookings')} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All →</button>
                </div>
                {loadingConsultantBookings ? (
                  <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" /></div>
                ) : upcomingConsultantBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingConsultantBookings.slice(0, 5).map((booking) => (
                      <button
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-sm transition-all text-left"
                      >
                        <div className="flex items-center gap-4">
                          <ClientAvatar booking={booking} size="sm" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{getClientName(booking)}</h4>
                            <p className="text-sm text-gray-500">{booking.consultation_types?.name}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                              {isInPersonPending(booking) ? (
                                <span className="flex items-center gap-1 text-amber-600 font-medium">
                                  <Phone className="w-3 h-3" />Contact to schedule
                                </span>
                              ) : (
                                <>
                                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(booking.booking_date)}</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(booking.start_time)}</span>
                                </>
                              )}
                              {booking.consultation_types?.is_virtual
                                ? <span className="flex items-center gap-1 text-blue-500"><Video className="w-3 h-3" />Virtual</span>
                                : <span className="flex items-center gap-1 text-green-500"><MapPin className="w-3 h-3" />In-Person</span>}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-semibold text-gray-900">
                              {Number(booking.total_price) === 0 ? 'Free' : `$${Number(booking.total_price).toFixed(0)}`}
                            </div>
                            <span className="text-xs text-indigo-500 font-medium mt-1">View Details →</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                    <p>No upcoming sessions</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ CONSULTANT AVAILABILITY ══ */}
          {activeTab === 'consultant-availability' && consultantProfile && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ConsultantAvailabilityManager consultantId={consultantProfile.id} />
            </div>
          )}

          {/* ══ CONSULTANT BOOKINGS ══ */}
          {activeTab === 'consultant-bookings' && consultantProfile && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-serif text-gray-900">Client Bookings</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {consultantBookings.length} total booking{consultantBookings.length !== 1 ? 's' : ''}
                    <span className="ml-2 text-indigo-400 font-medium">· Click any booking to view client details</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  {(['upcoming', 'past', 'cancelled', 'all'] as const).map(filter => (
                    <button key={filter} onClick={() => setConsultantBookingFilter(filter)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${consultantBookingFilter === filter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {loadingConsultantBookings ? (
                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" /></div>
              ) : filteredConsultantBookings.length > 0 ? (
                <div className="space-y-3">
                  {filteredConsultantBookings.map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <ClientAvatar booking={booking} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{getClientName(booking)}</h3>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}>
                              {getStatusIcon(booking.status)}{booking.status}
                            </span>
                            {isInPersonPending(booking) && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                <Phone className="w-3 h-3" />Needs Scheduling
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-indigo-600 font-medium mb-2">{booking.consultation_types?.name}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {isInPersonPending(booking) ? (
                              <span className="flex items-center gap-1 text-amber-600 font-medium text-xs">
                                <AlertCircle className="w-3.5 h-3.5" />Contact client to agree on appointment
                              </span>
                            ) : (
                              <>
                                <span className="flex items-center gap-1 text-xs"><Calendar className="w-3.5 h-3.5" />{formatDate(booking.booking_date)}</span>
                                <span className="flex items-center gap-1 text-xs"><Clock className="w-3.5 h-3.5" />{formatTime(booking.start_time)} – {formatTime(booking.end_time)}</span>
                              </>
                            )}
                            {booking.consultation_types?.is_virtual
                              ? <span className="flex items-center gap-1 text-blue-600 text-xs"><Video className="w-3.5 h-3.5" />Virtual</span>
                              : <span className="flex items-center gap-1 text-green-600 text-xs"><MapPin className="w-3.5 h-3.5" />In-Person</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                              {Number(booking.total_price) === 0 ? 'Free' : `$${Number(booking.total_price).toFixed(0)}`}
                            </div>
                            <div className={`text-xs font-medium ${booking.payment_status === 'paid' ? 'text-green-600' : booking.payment_status === 'free' ? 'text-blue-600' : 'text-amber-600'}`}>
                              {booking.payment_status}
                            </div>
                          </div>
                          <span className="text-xs text-indigo-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            View Details <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                  <h3 className="text-lg font-serif text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-500">
                    {consultantBookingFilter === 'upcoming' ? 'You have no upcoming sessions scheduled.' : `No ${consultantBookingFilter} bookings to show.`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ══ CONSULTANT EARNINGS ══ */}
          {activeTab === 'consultant-earnings' && consultantProfile && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                  <DollarSign className="w-8 h-8 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">${totalEarnings.toFixed(2)}</div>
                  <div className="text-green-100 text-sm">Total Earnings</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white">
                  <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">${thisMonthEarnings.toFixed(2)}</div>
                  <div className="text-indigo-100 text-sm">This Month</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                  <Star className="w-8 h-8 mb-3 opacity-80" />
                  <div className="text-3xl font-bold mb-1">${Number(consultantProfile.hourly_rate).toFixed(0)}/hr</div>
                  <div className="text-amber-100 text-sm">Your Rate</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif text-gray-900 mb-6">Payment History</h2>
                {consultantBookings.filter(b => b.payment_status === 'paid').length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 text-gray-500 font-medium">Client</th>
                          <th className="text-left py-3 px-2 text-gray-500 font-medium">Service</th>
                          <th className="text-left py-3 px-2 text-gray-500 font-medium">Date</th>
                          <th className="text-right py-3 px-2 text-gray-500 font-medium">Amount</th>
                          <th className="text-right py-3 px-2 text-gray-500 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {consultantBookings.filter(b => b.payment_status === 'paid').map(booking => (
                          <tr
                            key={booking.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <ClientAvatar booking={booking} size="sm" />
                                <div>
                                  <span className="font-medium text-gray-900 block">{getClientName(booking)}</span>
                                  {booking.user_profiles?.phone && (
                                    <span className="text-xs text-gray-400">{booking.user_profiles.phone}</span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-gray-600">{booking.consultation_types?.name}</td>
                            <td className="py-3 px-2 text-gray-600">
                              {isInPersonPending(booking) ? (
                                <span className="text-amber-600 font-medium">Pending schedule</span>
                              ) : (
                                formatDate(booking.booking_date)
                              )}
                            </td>
                            <td className="py-3 px-2 text-right font-semibold text-gray-900">
                              ${Number(booking.payment_amount || booking.total_price).toFixed(2)}
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <CheckCircle className="w-3 h-3" />Paid
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-gray-200">
                          <td colSpan={3} className="py-3 px-2 font-semibold text-gray-900">Total</td>
                          <td className="py-3 px-2 text-right font-bold text-gray-900 text-base">${totalEarnings.toFixed(2)}</td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                    <p>No payments received yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ PROFILE TAB ══ */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {userType ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-serif text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-500" />Your Elemental Color Type
                    </h2>
                    <button onClick={() => onStartQuiz('full')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <RefreshCw className="w-4 h-4" />Retake Quiz
                    </button>
                  </div>
                  <div className="relative rounded-xl overflow-hidden mb-6" style={{ background: `linear-gradient(135deg, ${activeColors[0]?.hex}30, ${activeColors[1]?.hex || activeColors[0]?.hex}30)` }}>
                    <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: activeColors[0]?.hex }}>
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif text-gray-900 mb-1">{userSubtype ? userSubtype.name : userType.name}</h3>
                        <p className="text-gray-600 mb-2">{userType.name} Element • {userType.season} Season</p>
                        <p className="text-gray-500 text-sm italic">"{userType.tagline}"</p>
                        {profile?.quiz_completed_at && (
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />Quiz completed {formatDate(profile.quiz_completed_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {ownsProfile && userSubtype && profile?.elemental_type && (
                    <div className="mb-6 grid sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate(`/elemental-types?element=${profile.elemental_type}&subtype=${profile.elemental_subtype}`)}
                        className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl text-white font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
                        style={{ background: `linear-gradient(135deg, ${activeColors[0]?.hex}, ${activeColors[1]?.hex || activeColors[0]?.hex})` }}
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Go to My Subtype Profile
                        </span>
                        <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                      <button
                        onClick={() => navigate('/color-tools')}
                        className="group flex items-center justify-between gap-3 px-5 py-4 rounded-xl font-semibold border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Palette className="w-5 h-5 text-fuchsia-600" />
                          Open My Color Tools
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-fuchsia-500 transition-colors" />
                      </button>
                    </div>
                  )}
                  <MaybeLockedOverlay
                    locked={!ownsProfile}
                    title="Your full Elemental Color Profile"
                    description={`Your complete ${userSubtype?.name || userType.name} profile — full color palette, key characteristics, and your shareable color card.`}
                    features={[
                      'Your complete personalized color palette',
                      'Key characteristics & style guidance',
                      'Subtype profile page & Color Tools',
                    ]}
                    icon={<Sparkles className="h-7 w-7 text-white" />}
                    ctaLabel={userSubtype ? 'Get My Full Profile' : 'Start the Free Quiz'}
                    note={userSubtype ? `One-time payment` : 'Complete the Free Quiz to discover your subtype'}
                    gradientFrom={activeColors[0]?.hex ?? '#a855f7'}
                    gradientTo={activeColors[1]?.hex ?? activeColors[0]?.hex ?? '#ec4899'}
                    onUnlock={() => (userSubtype ? setShowProfileCheckout(true) : onStartQuiz('subtype'))}
                  >
                  <p className="text-gray-600 leading-relaxed mb-6">{userSubtype ? userSubtype.description : userType.description}</p>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Your Color Palette</h3>
                      <button onClick={() => setActiveTab('colors')} className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All Colors →</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activeColors.slice(0, 12).map((color, idx) => (
                        <div key={idx} className="group cursor-pointer" onClick={() => copyToClipboard(color.hex)}>
                          <div className="w-12 h-12 rounded-xl shadow-sm border border-gray-100 transition-transform group-hover:scale-110" style={{ backgroundColor: color.hex }} />
                          <p className="text-xs text-gray-500 mt-1 text-center truncate w-12">{color.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Key Characteristics</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {(userSubtype?.characteristics || userType.characteristics).slice(0, 6).map((char, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: activeColors[idx % activeColors.length]?.hex }} />
                          <span className="text-gray-700 text-sm">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                    {[
                      { icon: Palette, colorClass: 'text-purple-500', value: activeColors.length, label: 'Colors' },
                      { icon: Scissors, colorClass: 'text-rose-500', value: savedHairColors.length, label: 'Hair Colors' },
                    ].map(({ icon: Icon, colorClass, value, label }) => (
                      <div key={label} className="text-center p-4 bg-gray-50 rounded-xl">
                        <Icon className={`w-6 h-6 mx-auto ${colorClass} mb-2`} />
                        <div className="text-2xl font-semibold text-gray-900 capitalize">{value}</div>
                        <div className="text-sm text-gray-500">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Share2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Share Your Colors</h3>
                          <p className="text-sm text-gray-500">Create a beautiful card to share on social media</p>
                        </div>
                      </div>
                      <button onClick={() => setShowShareModal(true)} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                        Create Shareable Card
                      </button>
                    </div>
                  </div>
                  </MaybeLockedOverlay>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center py-12">
                  <Sparkles className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-serif text-gray-900 mb-2">Discover Your Elemental Type</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Take our quiz to unlock your personalized color profile.</p>
                  <button onClick={() => onStartQuiz('full')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-rose-700 transition-colors">
                    <Sparkles className="w-5 h-5" />Start the Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ProfileSettings user={user} profile={profile} onProfileUpdate={handleProfileUpdate} />
            </div>
          )}

          {/* ══ ACTIVITY ══ */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-serif text-gray-900 mb-6">Recent Activity</h2>
              {loadingActivities ? (
                <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>
              ) : activities.length > 0 ? (
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    {activities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="relative flex gap-4 pl-2">
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.color)}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{activity.title}</h3>
                                <p className="text-sm text-gray-500">{activity.description}</p>
                              </div>
                              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{formatRelativeDate(activity.date)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-serif text-gray-900 mb-2">No Activity Yet</h3>
                  <p className="text-gray-500">Your activity history will appear here</p>
                </div>
              )}
            </div>
          )}

          {/* ══ COLORS ══ */}
          {activeTab === 'colors' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {activeColors.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-xl font-serif text-gray-900">{userSubtype ? userSubtype.name : userType?.name} Color Palette</h2>
                      <p className="text-gray-500 mt-1">Click any color to copy its hex code</p>
                    </div>
                    <button onClick={downloadPalette} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
                      <Download className="w-4 h-4" />Download
                    </button>
                  </div>
                  {['primary', 'secondary', 'accent', 'neutral'].map((category) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{category} Colors</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {activeColors.filter(c => c.category === category).map((color, idx) => (
                          <div key={idx} className="group cursor-pointer" onClick={() => copyToClipboard(color.hex)}>
                            <div className="aspect-square rounded-xl shadow-sm border border-gray-100 transition-transform group-hover:scale-105 relative overflow-hidden" style={{ backgroundColor: color.hex }}>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                {copiedColor === color.hex ? <Check className="w-6 h-6 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                              </div>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-800 truncate">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase">{color.hex}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Palette className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-serif text-gray-900 mb-2">Your Colors Await</h3>
                  <p className="text-gray-500 mb-6">Complete the quiz to unlock your personalized color palette</p>
                  <button onClick={onStartQuiz} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                    <Sparkles className="w-5 h-5" />Take the Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ MY PALETTE (saved individual colors) ══ */}
          {activeTab === 'my-palette' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-xl font-serif text-gray-900 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />My Saved Palette
                  </h2>
                  <p className="text-gray-500 mt-1">{savedPaletteColors.length} color{savedPaletteColors.length !== 1 ? 's' : ''} hand-picked from your elemental palettes</p>
                </div>
              </div>
              {savedPaletteColors.length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(groupedPaletteColors).map(([elementId, colors]) => (
                    <div key={elementId}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getElementColor(elementId) }} />
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{getElementName(elementId)} Element</h3>
                        <span className="text-xs text-gray-400">({colors.length})</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {colors.map((color) => (
                          <div key={color.id} className="group relative bg-gray-50 rounded-xl p-3 hover:shadow-md transition-shadow">
                            <div
                              className="aspect-square rounded-lg shadow-inner mb-3 cursor-pointer"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => copyToClipboard(color.hex)}
                              title="Click to copy hex"
                            />
                            <p className="font-medium text-gray-900 text-sm truncate">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase">{color.hex}</p>
                            {color.subtypeName && (
                              <p className="text-[11px] text-gray-400 mt-0.5 truncate">{color.subtypeName}</p>
                            )}
                            <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 capitalize">{color.category}</span>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                              <button
                                onClick={() => copyToClipboard(color.hex)}
                                className="p-1.5 rounded-full bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-700 transition-all"
                                title="Copy hex"
                              >
                                {copiedColor === color.hex ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                              {onRemovePaletteColor && (
                                <button
                                  onClick={() => onRemovePaletteColor(color.id)}
                                  className="p-1.5 rounded-full bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all"
                                  title="Remove from My Palette"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-serif text-gray-900 mb-2">No Saved Palette Colors Yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Open your Color Palette tool on the home page and tap the heart on any swatch to save your favorite colors here.
                  </p>
                  <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-violet-600 transition-colors">
                    <Palette className="w-5 h-5" />Explore Your Palette
                  </button>
                </div>
              )}
            </div>
          )}
          {/* ══ HAIR COLORS ══ */}
          {activeTab === 'hair-colors' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-xl font-serif text-gray-900 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />My Saved Hair Colors
                  </h2>
                  <p className="text-gray-500 mt-1">{savedHairColors.length} color{savedHairColors.length !== 1 ? 's' : ''} saved</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                    {(['all', 'warm', 'cool', 'neutral'] as const).map((filter) => (
                      <button key={filter} onClick={() => setHairColorFilter(filter)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${hairColorFilter === filter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                    <button onClick={() => setHairColorView('grid')} className={`p-2 rounded-full transition-colors ${hairColorView === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}><Grid className="w-4 h-4" /></button>
                    <button onClick={() => setHairColorView('list')} className={`p-2 rounded-full transition-colors ${hairColorView === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}><List className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              {savedHairColors.length > 0 ? (
                hairColorView === 'grid' ? (
                  <div className="space-y-8">
                    {Object.entries(groupedHairColors).map(([elementId, colors]) => (
                      <div key={elementId}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getElementColor(elementId) }} />
                          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{getElementName(elementId)} Element</h3>
                          <span className="text-xs text-gray-400">({colors.length})</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {colors.map((color) => (
                            <div key={color.id} className="group relative bg-gray-50 rounded-xl p-3 hover:shadow-md transition-shadow">
                              <div className="aspect-square rounded-lg shadow-inner mb-3" style={{ backgroundColor: color.hex }} />
                              <p className="font-medium text-gray-900 text-sm truncate">{color.name}</p>
                              <p className="text-xs text-gray-500">{color.hex}</p>
                              <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${color.undertone === 'warm' ? 'bg-orange-100 text-orange-700' : color.undertone === 'cool' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{color.undertone}</span>
                              {onRemoveHairColor && (
                                <button onClick={() => onRemoveHairColor(color.id)} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 transition-all">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredHairColors.map((color) => (
                      <div key={color.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow group">
                        <div className="w-14 h-14 rounded-lg shadow-inner flex-shrink-0" style={{ backgroundColor: color.hex }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{color.name}</p>
                          <p className="text-sm text-gray-500 truncate">{color.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${color.undertone === 'warm' ? 'bg-orange-100 text-orange-700' : color.undertone === 'cool' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{color.undertone}</span>
                            <span className="text-xs text-gray-400">{color.hex}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">{getElementName(color.elementId)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => copyToClipboard(color.hex)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                            {copiedColor === color.hex ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                          {onRemoveHairColor && (
                            <button onClick={() => onRemoveHairColor(color.id)} className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors text-gray-400">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-serif text-gray-900 mb-2">No Saved Hair Colors</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Browse the Hair Color Guide and click the heart icon to save colors here.</p>
                  <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-purple-600 transition-colors">
                    <Scissors className="w-5 h-5" />Explore Hair Colors
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ PALETTES ══ */}
          {activeTab === 'palettes' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <CustomPaletteBuilder user={user} profile={profile} />
            </div>
          )}

          {/* ══ CONSULTATIONS ══ */}
          {activeTab === 'consultations' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-serif text-gray-900 mb-6">Upcoming Consultations</h2>
                {loadingConsultations ? (
                  <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>
                ) : upcomingConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {consultation.consultants?.image_url
                            ? <img src={consultation.consultants.image_url} alt={consultation.consultants.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center bg-purple-200"><User className="w-8 h-8 text-purple-600" /></div>}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{consultation.consultation_types?.name || 'Consultation'}</h3>
                          <p className="text-sm text-gray-600">with {consultation.consultants?.name || 'Consultant'}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            {isInPersonPending(consultation) ? (
                              <span className="flex items-center gap-1 text-amber-600 font-medium">
                                <Phone className="w-4 h-4" />Consultant will contact you to confirm time
                              </span>
                            ) : (
                              <>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(consultation.booking_date)}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatTime(consultation.start_time)}</span>
                              </>
                            )}
                            {consultation.consultation_types?.is_virtual
                              ? <span className="flex items-center gap-1 text-blue-600"><Video className="w-4 h-4" />Virtual</span>
                              : <span className="flex items-center gap-1 text-green-600"><MapPin className="w-4 h-4" />In-Person</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${consultation.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {consultation.status}
                          </span>
                          {consultation.meeting_link && (
                            <a href={consultation.meeting_link} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-purple-600 hover:text-purple-700">
                              Join Meeting
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-serif text-gray-900 mb-2">No Upcoming Consultations</h3>
                    <p className="text-gray-500 mb-6">Book a one-on-one session with our color experts</p>
                    <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-rose-700 transition-colors">
                      <Calendar className="w-5 h-5" />Book a Consultation
                    </button>
                  </div>
                )}
              </div>
              {pastConsultations.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-xl font-serif text-gray-900 mb-6">Past Consultations</h2>
                  <div className="space-y-4">
                    {pastConsultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {consultation.consultants?.image_url
                            ? <img src={consultation.consultants.image_url} alt={consultation.consultants.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center bg-gray-300"><User className="w-6 h-6 text-gray-500" /></div>}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{consultation.consultation_types?.name || 'Consultation'}</h3>
                          <p className="text-sm text-gray-500">{formatDate(consultation.booking_date)} • {consultation.consultants?.name}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${consultation.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                          {consultation.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ MEMBERSHIP ══ */}
          {activeTab === 'membership' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPremium ? 'bg-gradient-to-br from-amber-400 to-rose-500' : 'bg-gray-200'}`}>
                  <Crown className={`w-6 h-6 ${isPremium ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-gray-900">{isPremium ? 'Workshop Member' : 'Free Member'}</h2>
                  <p className="text-gray-500">
                    {isPremium
                      ? profile?.workshop_unlocked
                        ? 'Your Elemental Color Workshop access is active'
                        : `Your ${profile?.membership_tier} membership is active`
                      : 'Upgrade to unlock premium features'}
                  </p>
                </div>
              </div>
              {loadingSubscription ? (
                <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>
              ) : subscription?.status === 'active' ? (
                <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-6 border border-amber-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{subscription.membership_plans?.name || 'Premium'} Plan</h3>
                      <p className="text-sm text-gray-600 capitalize">{subscription.billing_cycle} billing</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600">Next billing date</span>
                    <span className="text-gray-900 font-medium">{subscription.current_period_end ? formatDate(subscription.current_period_end) : 'N/A'}</span>
                  </div>
                  <div className="pt-4 border-t border-amber-200">
                    {subscription.cancel_at_period_end
                      ? <button onClick={handleReactivateSubscription} className="w-full py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all">Reactivate Subscription</button>
                      : <button onClick={handleCancelSubscription} className="w-full py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">Cancel Subscription</button>}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                    <Crown className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">Upgrade to Premium</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">Get unlimited wardrobe analyses, exclusive features, and 10% off consultations.</p>
                  <button onClick={onBack} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all">
                    <Crown className="w-5 h-5" />View Membership Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ RETAKE QUIZ ══ */}
          {activeTab === 'retake-quiz' && (
            <RetakeQuizSection user={user} profile={profile} onStartQuiz={onStartQuiz} onProfileUpdate={handleProfileUpdate} />
          )}

          {/* ══ QUIZ HISTORY ══ */}
          {activeTab === 'quiz-history' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <QuizHistory user={user} onStartQuiz={onStartQuiz} />
            </div>
          )}

        </div>
      </div>

      {userType && (
        <SocialShareCard
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          elementalType={userType}
          subtype={userSubtype}
          userName={profile?.full_name}
        />
      )}

      {showProfileCheckout && user && profile?.elemental_type && profile?.elemental_subtype && (
        <ProfilePurchaseCheckout
          user={user}
          elementalType={profile.elemental_type}
          elementalSubtype={profile.elemental_subtype}
          subtypeLabel={userSubtype?.name || userType?.name || 'your subtype'}
          onSuccess={() => {
            setShowProfileCheckout(false);
            handleProfileUpdate();
          }}
          onCancel={() => setShowProfileCheckout(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;