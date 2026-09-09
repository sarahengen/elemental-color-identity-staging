import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Star, Check, X, Sparkles, Download, Receipt, ChevronDown, ChevronUp, GraduationCap, BookOpen, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface ColorClass {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructor_image: string | null;
  duration_minutes: number;
  max_participants: number;
  current_participants: number;
  price: string;
  class_type: string;
  skill_level: string;
  topics: string | string[];
  schedule: string | ScheduleItem[];
  is_active: boolean;
}

interface ScheduleItem {
  date: string;
  time: string;
  available_spots: number;
}

interface ClassBooking {
  id: string;
  class_id: string;
  booking_date: string;
  booking_time: string;
  booking_status: string;
  payment_status?: string;
  payment_amount?: number;
  payment_intent_id?: string;
  paid_at?: string;
  created_at: string;
}

interface ColorClassBookingProps {
  user: any;
  onAuthRequired: () => void;
}

const ColorClassBooking: React.FC<ColorClassBookingProps> = ({ user, onAuthRequired }) => {
  const [classes, setClasses] = useState<ColorClass[]>([]);
  const [userBookings, setUserBookings] = useState<ClassBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ColorClass | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [filter, setFilter] = useState<'all' | 'workshop' | 'masterclass' | 'webinar'>('all');
  const [viewReceipt, setViewReceipt] = useState<ClassBooking | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchClasses();
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('color_classes')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching classes:', error);
        toast({
          title: 'Error',
          description: 'Failed to load classes',
          variant: 'destructive'
        });
      } else {
        const parsedClasses = (data || []).map(cls => ({
          ...cls,
          topics: typeof cls.topics === 'string' ? JSON.parse(cls.topics) : cls.topics,
          schedule: typeof cls.schedule === 'string' ? JSON.parse(cls.schedule) : cls.schedule
        }));
        setClasses(parsedClasses);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('class_bookings')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setUserBookings(data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleBookClass = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (!selectedClass || !selectedSchedule) return;

    if (userBookings.some(b => b.class_id === selectedClass.id && b.booking_status === 'confirmed')) {
      toast({ 
        title: 'Already booked', 
        description: 'You have already booked this class',
        variant: 'destructive'
      });
      return;
    }

    setBookingInProgress(true);

    try {
      const { error } = await supabase
        .from('class_bookings')
        .insert({
          user_id: user.id,
          class_id: selectedClass.id,
          booking_date: selectedSchedule.date,
          booking_time: selectedSchedule.time,
          booking_status: 'confirmed',
          payment_status: 'paid',
          payment_amount: parseFloat(selectedClass.price),
          paid_at: new Date().toISOString()
        });

      if (error) throw error;

      await supabase
        .from('color_classes')
        .update({ 
          current_participants: selectedClass.current_participants + 1 
        })
        .eq('id', selectedClass.id);

      toast({
        title: 'Booking confirmed!',
        description: `You're registered for ${selectedClass.title}`
      });

      setSelectedClass(null);
      setSelectedSchedule(null);
      fetchClasses();
      fetchUserBookings();
    } catch (error: any) {
      console.error('Error booking class:', error);
      toast({
        title: 'Booking failed',
        description: error.message || 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleCancelBooking = async (booking: ClassBooking) => {
    if (booking.booking_status !== 'confirmed') {
      toast({ 
        title: 'Cannot cancel', 
        description: 'This booking cannot be cancelled', 
        variant: 'destructive' 
      });
      return;
    }

    const classItem = classes.find(c => c.id === booking.class_id);
    const classDate = booking.booking_date ? new Date(booking.booking_date) : new Date();
    const now = new Date();
    const hoursUntilClass = (classDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilClass < 24) {
      toast({ 
        title: 'Cannot cancel', 
        description: 'Bookings cannot be cancelled within 24 hours of the class', 
        variant: 'destructive' 
      });
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('class_bookings')
        .update({ 
          booking_status: 'cancelled'
        })
        .eq('id', booking.id);

      if (updateError) throw updateError;

      if (classItem) {
        await supabase
          .from('color_classes')
          .update({ 
            current_participants: Math.max(0, classItem.current_participants - 1) 
          })
          .eq('id', booking.class_id);
      }

      toast({ 
        title: 'Booking cancelled', 
        description: 'Your booking has been cancelled successfully.' 
      });
      
      fetchClasses();
      fetchUserBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to cancel booking', 
        variant: 'destructive' 
      });
    }
  };

  const getNextAvailableDate = (schedule: ScheduleItem[]) => {
    if (!schedule || schedule.length === 0) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const future = schedule.filter(s => {
      const scheduleDate = new Date(s.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate >= today;
    });
    return future.length > 0 ? future[0] : null;
  };

  const hasScheduledDates = (schedule: ScheduleItem[]) => {
    return schedule && schedule.length > 0;
  };

  const isBooked = (classId: string) => {
    return userBookings.some(b => b.class_id === classId && b.booking_status === 'confirmed');
  };

  const getCardHeaderGradient = (classType: string) => {
    switch (classType) {
      case 'workshop':
        return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'masterclass':
        return 'bg-gradient-to-br from-rose-500 to-red-600';
      case 'webinar':
        return 'bg-gradient-to-br from-teal-500 to-cyan-600';
      default:
        return 'bg-gradient-to-br from-amber-500 to-orange-600';
    }
  };

  // Explicit display order for the class cards (DB has no ordering of its own).
  const CLASS_DISPLAY_ORDER = [
    'Building Your Elemental Wardrobe',
    'Archetypal Color Harmony',
    'Discover Your Elemental Type',
    'Elemental Makeup Colors That Flatter',
  ];

  const orderedClasses = [...classes].sort((a, b) => {
    const ai = CLASS_DISPLAY_ORDER.indexOf(a.title);
    const bi = CLASS_DISPLAY_ORDER.indexOf(b.title);
    return (ai === -1 ? Number.MAX_SAFE_INTEGER : ai) - (bi === -1 ? Number.MAX_SAFE_INTEGER : bi);
  });

  const filteredClasses = filter === 'all' 
    ? orderedClasses 
    : orderedClasses.filter(c => c.class_type === filter);

  const confirmedBookings = userBookings.filter(b => b.booking_status === 'confirmed');
  const workshopCount = classes.filter(c => c.class_type === 'workshop').length;
  const masterclassCount = classes.filter(c => c.class_type === 'masterclass').length;
  const webinarCount = classes.filter(c => c.class_type === 'webinar').length;

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* BANNER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group focus:outline-none"
      >
        <div className={`relative overflow-hidden rounded-2xl ${isExpanded ? 'rounded-b-none' : ''} transition-all duration-300`}>
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Sparkle accents */}
          <div className="absolute top-4 right-8 opacity-20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-4 left-12 opacity-15">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left side - Title & Info */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20">
                  <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl md:text-3xl font-serif text-white font-bold">
                      Color Analysis Classes
                    </h2>
                    {confirmedBookings.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-400/20 backdrop-blur-sm border border-green-300/30 rounded-full text-green-100 text-xs font-medium">
                        <Check className="w-3 h-3" />
                        {confirmedBookings.length} Booked
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-sm md:text-base max-w-xl">
                    Learn from expert color analysts in interactive workshops, masterclasses, and webinars. 
                    Master your elemental palette with hands-on guidance.
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    {!loading && classes.length > 0 && (
                      <>
                        <div className="flex items-center gap-1.5 text-white/70 text-sm">
                          <BookOpen className="w-4 h-4" />
                          <span>{classes.length} Classes Available</span>
                        </div>
                        {workshopCount > 0 && (
                          <div className="flex items-center gap-1.5 text-amber-200/80 text-sm">
                            <Zap className="w-3.5 h-3.5" />
                            <span>{workshopCount} Workshop{workshopCount !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {masterclassCount > 0 && (
                          <div className="flex items-center gap-1.5 text-pink-200/80 text-sm">
                            <Star className="w-3.5 h-3.5" />
                            <span>{masterclassCount} Masterclass{masterclassCount !== 1 ? 'es' : ''}</span>
                          </div>
                        )}
                        {webinarCount > 0 && (
                          <div className="flex items-center gap-1.5 text-purple-200/80 text-sm">
                            <Video className="w-3.5 h-3.5" />
                            <span>{webinarCount} Webinar{webinarCount !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </>
                    )}
                    {loading && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                        Loading classes...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Expand toggle */}
              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-white/70 text-sm font-medium hidden sm:block group-hover:text-white transition-colors">
                  {isExpanded ? 'Hide Classes' : 'View Classes'}
                </span>
                <div className={`w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/25 ${isExpanded ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* EXPANDABLE DROPDOWN CONTENT */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border border-t-0 border-gray-200 rounded-b-2xl shadow-lg">
          <div className="p-6 md:p-8 space-y-8">

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Browse Classes
              </h3>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'workshop', 'masterclass', 'webinar'] as const).map(type => (
                  <button
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilter(type);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === type
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Your Bookings */}
            {user && confirmedBookings.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Your Bookings
                </h3>
                <div className="space-y-3">
                  {confirmedBookings.map((booking) => {
                    const classItem = classes.find(c => c.id === booking.class_id);
                    if (!classItem) return null;
                    
                    return (
                      <div key={booking.id} className="flex items-center justify-between bg-white rounded-xl p-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{classItem.title}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                              Confirmed
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'Date TBA'} {booking.booking_time ? `at ${booking.booking_time}` : ''}
                          </p>
                          {booking.payment_amount && (
                            <p className="text-sm text-gray-500 mt-1">
                              Paid: ${Number(booking.payment_amount).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewReceipt(booking);
                            }}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Receipt className="w-4 h-4" />
                            Receipt
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelBooking(booking);
                            }}
                            className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}

            {/* Classes Grid */}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredClasses.map(cls => {
                  const schedule = cls.schedule as ScheduleItem[];
                  const nextDate = getNextAvailableDate(schedule);
                  const hasSchedule = hasScheduledDates(schedule);
                  const spotsLeft = cls.max_participants - cls.current_participants;
                  const userHasBooked = isBooked(cls.id);

                  return (
                    <div
                      key={cls.id}
                      className={`bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-shadow ${
                        userHasBooked ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                      }`}
                    >
                      {/* Card Header */}
                      <div className={`${getCardHeaderGradient(cls.class_type)} p-6 text-white`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-2">
                              {cls.class_type}
                            </span>
                            <h3 className="text-xl font-bold">{cls.title}</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${parseFloat(cls.price).toFixed(0)}</div>
                            <div className="text-xs opacity-80">per person</div>
                          </div>
                        </div>
                        <p className="text-sm text-white/90">{cls.description}</p>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        {/* Instructor */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {cls.instructor_image ? (
                              <img src={cls.instructor_image} alt={cls.instructor} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <Users className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{cls.instructor}</p>
                            <p className="text-xs text-gray-500">Instructor</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {cls.duration_minutes} minutes
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {cls.max_participants} max participants
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Star className="w-4 h-4" />
                            {cls.skill_level.charAt(0).toUpperCase() + cls.skill_level.slice(1)} level
                          </div>
                          {hasSchedule && nextDate ? (
                            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                              <Calendar className="w-4 h-4" />
                              Next: {new Date(nextDate.date).toLocaleDateString()} at {nextDate.time}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-amber-600">
                              <Calendar className="w-4 h-4" />
                              Dates to be announced
                            </div>
                          )}
                        </div>

                        {/* Topics */}
                        {cls.topics && (cls.topics as string[]).length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Topics Covered</p>
                            <div className="flex flex-wrap gap-1">
                              {(cls.topics as string[]).slice(0, 3).map((topic, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                                  {topic}
                                </span>
                              ))}
                              {(cls.topics as string[]).length > 3 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                                  +{(cls.topics as string[]).length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        {userHasBooked ? (
                          <div className="flex items-center justify-center gap-2 py-3 bg-green-100 text-green-700 rounded-full font-medium">
                            <Check className="w-5 h-5" />
                            Booked
                          </div>
                        ) : hasSchedule ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!user) {
                                onAuthRequired();
                                return;
                              }
                              setSelectedClass(cls);
                              if (nextDate) setSelectedSchedule(nextDate);
                            }}
                            disabled={spotsLeft === 0}
                            className={`w-full py-3 rounded-full font-medium transition-colors ${
                              spotsLeft === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 text-white hover:bg-orange-600'
                            }`}
                          >
                            {spotsLeft === 0 ? 'Fully Booked' : 'Book This Class'}
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!user) {
                                onAuthRequired();
                                return;
                              }
                              toast({
                                title: 'Coming Soon',
                                description: 'Dates for this class will be announced soon. We\'ll notify you when booking opens!',
                              });
                            }}
                            className="w-full py-3 rounded-full font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                          >
                            Notify Me When Available
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-serif text-gray-900 mb-2">No Classes Available</h3>
                <p className="text-gray-500">Check back soon for upcoming classes</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* BOOKING CONFIRMATION MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {selectedClass && selectedSchedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Confirm Booking</h3>
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedSchedule(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-gray-900">{selectedClass.title}</p>
                <p className="text-sm text-gray-500">{selectedClass.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {new Date(selectedSchedule.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {selectedSchedule.time}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  {selectedSchedule.available_spots} spots available
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${parseFloat(selectedClass.price).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedSchedule(null);
                }}
                className="flex-1 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBookClass}
                disabled={bookingInProgress}
                className="flex-1 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 disabled:opacity-50"
              >
                {bookingInProgress ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* RECEIPT MODAL */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {viewReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-serif mb-1">Booking Receipt</h3>
                  <p className="text-gray-300 text-sm">Elemental Color</p>
                </div>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {(() => {
                const classItem = classes.find(c => c.id === viewReceipt.class_id);
                if (!classItem) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-1">{classItem.title}</h4>
                      <p className="text-sm text-gray-500">{classItem.instructor}</p>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="text-gray-900">
                          {viewReceipt.booking_date ? new Date(viewReceipt.booking_date).toLocaleDateString() : 'TBA'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time</span>
                        <span className="text-gray-900">{viewReceipt.booking_time || 'TBA'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Booking Status</span>
                        <span className="text-green-600 font-medium">Confirmed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold text-gray-900">
                          ${(viewReceipt.payment_amount || parseFloat(classItem.price)).toFixed(2)}
                        </span>
                      </div>
                      {viewReceipt.payment_intent_id && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transaction ID</span>
                          <span className="text-gray-600 font-mono text-xs">
                            {viewReceipt.payment_intent_id.slice(-12)}
                          </span>
                        </div>
                      )}
                      {viewReceipt.paid_at && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Paid On</span>
                          <span className="text-gray-900">
                            {new Date(viewReceipt.paid_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => {
                        const receiptContent = `
ELEMENTAL COLOR
Booking Receipt
------------------------
Class: ${classItem.title}
Instructor: ${classItem.instructor}
Date: ${viewReceipt.booking_date ? new Date(viewReceipt.booking_date).toLocaleDateString() : 'TBA'}
Time: ${viewReceipt.booking_time || 'TBA'}
------------------------
Amount Paid: $${(viewReceipt.payment_amount || parseFloat(classItem.price)).toFixed(2)}
Transaction: ${viewReceipt.payment_intent_id || 'N/A'}
Paid On: ${viewReceipt.paid_at ? new Date(viewReceipt.paid_at).toLocaleDateString() : 'N/A'}
------------------------
Thank you for your booking!
                        `;
                        const blob = new Blob([receiptContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `receipt-${classItem.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorClassBooking;
