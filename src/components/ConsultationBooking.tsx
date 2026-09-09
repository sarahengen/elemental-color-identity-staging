import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { Calendar, Clock, Star, Video, MapPin, ChevronLeft, ChevronRight, User, Check, X, Download, Sparkles, Crown, MessageCircle, Award, ArrowRight, ChevronDown, Users, Phone, Mail, AlertCircle } from 'lucide-react';

interface Consultant {
  id: string;
  name: string;
  email: string;
  bio: string;
  image_url: string;
  specialties: string[];
  hourly_rate: number;
  years_experience: number;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  timezone: string;
}

interface ConsultationType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  base_price: number;
  is_virtual: boolean;
}

interface ConsultantAvailability {
  id: string;
  consultant_id: string;
  specific_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface Review {
  id: string;
  consultant_id: string;
  rating: number;
  review_text: string;
  created_at: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ConsultationBookingProps {
  user: any;
  onAuthRequired: () => void;
  isPremium?: boolean;
}

interface ContactInfo {
  phone: string;
  location: string;
  email: string;
}

const consultantImage = 'https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1766158265567_beaa3a49.jpeg';

function CheckoutForm({
  onSuccess,
  onCancel,
  amount
}: {
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/consultation-success'
      },
      redirect: 'if_required'
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-rose-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay $${Number(amount).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');
const toDateStr = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  user,
  onAuthRequired,
  isPremium
}) => {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, ConsultantAvailability>>({});
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Contact info state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ phone: '', location: '', email: '' });
  const [contactErrors, setContactErrors] = useState<Partial<ContactInfo>>({});

  const [step, setStep] = useState<'consultants' | 'type' | 'contact' | 'calendar' | 'checkout' | 'confirmation'>('consultants');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Auto-expand when linked directly to the booking section (e.g. from the
  // profile email's "Book a Consultation" link → #book-consultation).
  useEffect(() => {
    if (window.location.hash === '#book-consultation') {
      setIsExpanded(true);
    }
  }, []);

  // Pre-fill contact info from user profile
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConsultant) {
      loadConsultantAvailability(selectedConsultant.id);
      loadExistingBookings(selectedConsultant.id);
    }
  }, [selectedConsultant]);

  useEffect(() => {
    if (selectedConsultant) {
      loadConsultantAvailability(selectedConsultant.id);
    }
  }, [currentMonth]);

  const loadUserProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_profiles')
      .select('email, phone, location')
      .eq('id', user.id)
      .single();

    if (data) {
      setContactInfo({
        phone: data.phone || '',
        location: data.location || '',
        email: data.email || user.email || ''
      });
    } else {
      setContactInfo(prev => ({ ...prev, email: user.email || '' }));
    }
  };

  const loadData = async () => {
    const [consultantsRes, typesRes, reviewsRes] = await Promise.all([
      supabase.from('consultants').select('*').eq('is_active', true).limit(1),
      supabase.from('consultation_types').select('*').eq('is_active', true).order('name', { ascending: true }),
      supabase.from('consultant_reviews').select('*').order('created_at', { ascending: false })
    ]);

    if (consultantsRes.data) {
      const consultantsWithImages = consultantsRes.data.map(c => ({
        ...c,
        image_url: consultantImage
      }));
      setConsultants(consultantsWithImages);
    }
    if (typesRes.data) setConsultationTypes(typesRes.data);
    if (reviewsRes.data) setReviews(reviewsRes.data);
  };

  const loadConsultantAvailability = async (consultantId: string) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const from = toDateStr(new Date(year, month - 1, 1));
    const to = toDateStr(new Date(year, month + 2, 0));

    const { data, error } = await supabase
      .from('consultant_availability')
      .select('*')
      .eq('consultant_id', consultantId)
      .not('specific_date', 'is', null)
      .eq('is_available', true)
      .gte('specific_date', from)
      .lte('specific_date', to);

    if (error) {
      console.error('Error loading availability:', error);
      return;
    }

    const map: Record<string, ConsultantAvailability> = {};
    (data || []).forEach(row => {
      map[row.specific_date] = row;
    });
    setAvailabilityMap(map);
  };

  const loadExistingBookings = async (consultantId: string) => {
    const { data } = await supabase
      .from('consultation_bookings')
      .select('*')
      .eq('consultant_id', consultantId)
      .in('status', ['pending', 'confirmed']);
    if (data) setExistingBookings(data);
  };

  const getConsultantReviews = (consultantId: string) => {
    return reviews.filter(r => r.consultant_id === consultantId);
  };

  const calculatePrice = () => {
    if (!selectedType) return 0;
    const basePrice = Number(selectedType.base_price);
    return isPremium ? basePrice * 0.9 : basePrice;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    return !!availabilityMap[toDateStr(date)];
  };

  const getTimeSlots = (date: Date): TimeSlot[] => {
    const ds = toDateStr(date);
    const row = availabilityMap[ds];
    if (!row) return [];

    const slots: TimeSlot[] = [];
    const startHour = parseInt(row.start_time.split(':')[0]);
    const endHour = parseInt(row.end_time.split(':')[0]);
    const duration = selectedType?.duration_minutes || 60;
    const bookedSlots = existingBookings
      .filter(b => b.booking_date === ds)
      .map(b => b.start_time);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const timeStr = `${pad(hour)}:${pad(min)}`;
        const endMin = min + duration;
        const endHourCalc = hour + Math.floor(endMin / 60);
        if (endHourCalc <= endHour) {
          const isBooked = bookedSlots.includes(timeStr + ':00');
          slots.push({ time: timeStr, available: !isBooked });
        }
      }
    }
    return slots;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const validateContactInfo = (): boolean => {
    const errors: Partial<ContactInfo> = {};
    if (!contactInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(contactInfo.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!contactInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    // location is optional but recommended for in-person
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveContactInfoToProfile = async () => {
    if (!user) return;
    const updates: any = {
      phone: contactInfo.phone.trim() || null,
      email: contactInfo.email.trim() || null,
      updated_at: new Date().toISOString()
    };
    if (contactInfo.location.trim()) {
      updates.location = contactInfo.location.trim();
    }
    await supabase.from('user_profiles').update(updates).eq('id', user.id);
  };

  const handleSelectConsultant = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setStep('type');
  };

  const handleSelectType = (type: ConsultationType) => {
    setSelectedType(type);
    setStep('contact');
  };

  const handleContactNext = async () => {
    if (!validateContactInfo()) return;
    if (!user) { onAuthRequired(); return; }

    // Save contact info to profile
    await saveContactInfoToProfile();

    // For in-person: skip calendar, go straight to checkout
    if (selectedType && !selectedType.is_virtual) {
      await handleProceedToCheckout(true);
    } else {
      setStep('calendar');
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleProceedToCheckout = async (skipDateTime = false) => {
    if (!user) { onAuthRequired(); return; }
    if (!selectedConsultant || !selectedType) return;

    // For virtual, date and time are required
    if (!skipDateTime && selectedType.is_virtual && (!selectedDate || !selectedTime)) return;

    setLoading(true);
    setError(null);

    try {
      const totalPrice = calculatePrice();

      // For in-person: use placeholder date/time (consultant will confirm separately)
      const bookingDate = skipDateTime ? null : toDateStr(selectedDate!);
      const startTime = skipDateTime ? '00:00:00' : selectedTime! + ':00';
      const endTime = skipDateTime
        ? '00:00:00'
        : calculateEndTime(selectedTime!, selectedType.duration_minutes) + ':00';

      const { data, error: fnError } = await supabase.functions.invoke('create-consultation-payment', {
        body: {
          consultant_id: selectedConsultant.id,
          consultation_type_id: selectedType.id,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime,
          total_price: totalPrice,
          user_email: contactInfo.email || user.email,
          user_phone: contactInfo.phone,
          user_location: contactInfo.location,
          notes,
          is_in_person_pending: skipDateTime
        }
      });

      if (fnError) throw fnError;

      if (data?.freeBooking) {
        setBookingResult({
          bookingId: data.bookingId,
          message: skipDateTime
            ? 'Your in-person consultation request has been received! The consultant will contact you to confirm a time.'
            : 'Your consultation has been booked for free!',
          calendarInvite: null,
          isInPersonPending: skipDateTime
        });
        setStep('confirmation');
        return;
      }

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
      setStep('checkout');
    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${pad(endHours)}:${pad(endMinutes)}`;
  };

  const handlePaymentSuccess_ = async () => {
    if (!selectedConsultant || !selectedType || !paymentIntentId) return;

    const isInPerson = !selectedType.is_virtual;

    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('confirm-consultation-booking', {
        body: {
          payment_intent_id: paymentIntentId,
          user_id: user.id,
          consultant_id: selectedConsultant.id,
          consultation_type_id: selectedType.id,
          booking_date: isInPerson ? null : toDateStr(selectedDate!),
          start_time: isInPerson ? '00:00:00' : selectedTime! + ':00',
          end_time: isInPerson
            ? '00:00:00'
            : calculateEndTime(selectedTime!, selectedType.duration_minutes) + ':00',
          total_price: calculatePrice(),
          user_email: contactInfo.email || user.email,
          user_phone: contactInfo.phone,
          user_location: contactInfo.location,
          user_name: user.user_metadata?.full_name || user.email,
          consultant_name: selectedConsultant.name,
          consultant_email: selectedConsultant.email,
          consultation_type_name: selectedType.name,
          is_virtual: selectedType.is_virtual,
          is_in_person_pending: isInPerson,
          notes
        }
      });

      if (fnError) throw fnError;
      setBookingResult({
        ...data,
        isInPersonPending: isInPerson
      });
      setStep('confirmation');
    } catch (err: any) {
      setError(err.message || 'Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!selectedConsultant || !selectedType || !paymentIntentId) return;

    const isInPerson = !selectedType.is_virtual;

    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('confirm-consultation-booking', {
        body: {
          payment_intent_id: paymentIntentId,
          user_id: user.id,
          consultant_id: selectedConsultant.id,
          consultation_type_id: selectedType.id,
          booking_date: isInPerson ? null : toDateStr(selectedDate!),
          start_time: isInPerson ? null : selectedTime! + ':00',
          end_time: isInPerson ? null : calculateEndTime(selectedTime!, selectedType.duration_minutes) + ':00',
          total_price: calculatePrice(),
          user_email: contactInfo.email || user.email,
          user_phone: contactInfo.phone,
          user_location: contactInfo.location,
          user_name: user.user_metadata?.full_name || user.email,
          consultant_name: selectedConsultant.name,
          consultant_email: selectedConsultant.email,
          consultation_type_name: selectedType.name,
          is_virtual: selectedType.is_virtual,
          is_in_person_pending: isInPerson,
          notes
        }
      });

      if (fnError) throw fnError;
      setBookingResult({
        ...data,
        isInPersonPending: isInPerson
      });
      setStep('confirmation');
    } catch (err: any) {
      setError(err.message || 'Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  const downloadCalendarInvite = () => {
    if (!bookingResult?.calendarInvite) return;
    const blob = new Blob([bookingResult.calendarInvite], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-consultation.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetBooking = () => {
    setSelectedConsultant(null);
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setNotes('');
    setClientSecret(null);
    setPaymentIntentId(null);
    setBookingResult(null);
    setContactErrors({});
    setStep('consultants');
  };

  const getNextAvailableSlotText = (): string => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const futureDates = Object.keys(availabilityMap)
      .filter(ds => new Date(ds + 'T00:00:00') >= today)
      .sort();

    if (!futureDates.length) return 'Check availability';

    const [y, m, d] = futureDates[0].split('-').map(Number);
    const next = new Date(y, m - 1, d);
    const diffDays = Math.round((next.getTime() - today.getTime()) / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return dayNames[next.getDay()];
  };

  const virtualCount = consultationTypes.filter(t => t.is_virtual).length;
  const inPersonCount = consultationTypes.filter(t => !t.is_virtual).length;

  // ─── Render helpers ──────────────────────────────────────────────────────

  const renderConsultants = () => {
    const consultant = consultants[0];
    const consultantReviews = consultant ? getConsultantReviews(consultant.id) : [];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full">
            <User className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Expert Consultant</span>
          </div>
          {isPremium && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full">
              <Crown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Premium members get 10% off all consultations!</span>
            </div>
          )}
        </div>

        {consultant && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full">
                    <img src={consultant.image_url} alt={consultant.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="md:w-3/5 p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-serif text-gray-900 mb-1">{consultant.name}</h3>
                    <p className="text-indigo-600 font-medium">{consultant.years_experience} years experience</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {consultant.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{consultant.bio}</p>

                  {consultantReviews.length > 0 && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">Recent Review</span>
                      </div>
                      <p className="text-sm text-gray-600 italic">
                        &quot;{consultantReviews[0].review_text}&quot;
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    {isPremium ? (
                      <p className="text-xs text-amber-600">10% premium discount applies</p>
                    ) : (
                      <span />
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSelectConsultant(consultant); }}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-violet-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      Book Consultation
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!consultant && (
          <div className="text-center py-12 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No consultants available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    );
  };

  const renderTypeSelection = () => (
    <div className="space-y-8">
      <button onClick={(e) => { e.stopPropagation(); setStep('consultants'); }} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Consultants
      </button>

      {selectedConsultant && (
        <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
          <img src={selectedConsultant.image_url} alt={selectedConsultant.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="font-medium text-gray-900">{selectedConsultant.name}</h3>
            <p className="text-sm text-gray-600">{selectedConsultant.specialties.join(', ')}</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">Choose Your Consultation Type</h2>
        <p className="text-gray-600">Select the format and duration that works best for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {consultationTypes.map(type => {
          const price = type.base_price || 0;
          const discountedPrice = isPremium ? price * 0.9 : price;

          return (
            <div
              key={type.id}
              className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-300 transition-colors cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); handleSelectType(type); }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {type.is_virtual ? (
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"><Video className="w-6 h-6 text-blue-600" /></div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><MapPin className="w-6 h-6 text-green-600" /></div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-500">{type.duration_minutes} minutes</p>
                  </div>
                </div>
                <div className="text-right">
                  {isPremium && <p className="text-sm text-gray-400 line-through">${price.toFixed(0)}</p>}
                  <p className="text-2xl font-bold text-gray-900">${discountedPrice.toFixed(0)}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{type.description}</p>
              {!type.is_virtual && (
                <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-xs text-green-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    The consultant will contact you to schedule a convenient time
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${type.is_virtual ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {type.is_virtual ? 'Virtual Session' : 'In-Person'}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Contact Info Step ─────────────────────────────────────────────────────
  const renderContactInfo = () => (
    <div className="space-y-8">
      <button
        onClick={(e) => { e.stopPropagation(); setStep('type'); }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Consultation Types
      </button>

      {selectedConsultant && selectedType && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-indigo-50 rounded-xl">
          <img src={selectedConsultant.image_url} alt={selectedConsultant.name} className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{selectedConsultant.name}</h3>
            <p className="text-sm text-gray-600">
              {selectedType.name} &bull;
              <span className={`ml-1 ${selectedType.is_virtual ? 'text-blue-600' : 'text-green-600'}`}>
                {selectedType.is_virtual ? 'Virtual' : 'In-Person'}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${calculatePrice().toFixed(2)}</p>
            {isPremium && <p className="text-xs text-amber-600">10% premium discount applied</p>}
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-2">Your Contact Details</h2>
          <p className="text-gray-600">
            {selectedType?.is_virtual
              ? 'Please confirm your contact information before selecting a time slot.'
              : 'The consultant will use these details to reach out and confirm your appointment time.'}
          </p>
        </div>

        {!selectedType?.is_virtual && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800 text-sm">How In-Person Booking Works</p>
              <p className="text-sm text-green-700 mt-1">
                After payment, your consultant will review your details and contact you directly to schedule a time that works for both of you.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={e => {
                  setContactInfo(prev => ({ ...prev, phone: e.target.value }));
                  if (contactErrors.phone) setContactErrors(prev => ({ ...prev, phone: undefined }));
                }}
                onClick={e => e.stopPropagation()}
                placeholder="+1 (555) 000-0000"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${contactErrors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
            </div>
            {contactErrors.phone && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />{contactErrors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={contactInfo.email}
                onChange={e => {
                  setContactInfo(prev => ({ ...prev, email: e.target.value }));
                  if (contactErrors.email) setContactErrors(prev => ({ ...prev, email: undefined }));
                }}
                onClick={e => e.stopPropagation()}
                placeholder="you@example.com"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${contactErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
            </div>
            {contactErrors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />{contactErrors.email}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
              {!selectedType?.is_virtual && <span className="text-green-600 ml-1 text-xs font-normal">(recommended for in-person)</span>}
              {selectedType?.is_virtual && <span className="text-gray-400 ml-1 text-xs font-normal">(optional)</span>}
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={contactInfo.location}
                onChange={e => setContactInfo(prev => ({ ...prev, location: e.target.value }))}
                onClick={e => e.stopPropagation()}
                placeholder="City, State / Country"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes <span className="text-gray-400 text-xs font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => { e.stopPropagation(); setNotes(e.target.value); }}
              onClick={e => e.stopPropagation()}
              placeholder="Any specific questions or topics you'd like to discuss..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-400 mb-4">
              Your contact information will be saved to your profile and shared with the consultant for booking purposes only.
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); handleContactNext(); }}
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading
                ? 'Processing...'
                : selectedType?.is_virtual
                  ? <><Calendar className="w-5 h-5" />Choose Date & Time</>
                  : <><ArrowRight className="w-5 h-5" />Continue to Payment</>
              }
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthStr = `${currentMonth.getFullYear()}-${pad(currentMonth.getMonth() + 1)}`;
    const openCount = Object.keys(availabilityMap).filter(d => d.startsWith(monthStr)).length;

    return (
      <div className="space-y-8">
        <button onClick={(e) => { e.stopPropagation(); setStep('contact'); }} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Contact Details
        </button>

        <div className="flex flex-wrap items-center gap-4 p-4 bg-indigo-50 rounded-xl">
          <img src={selectedConsultant?.image_url} alt={selectedConsultant?.name} className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{selectedConsultant?.name}</h3>
            <p className="text-sm text-gray-600">{selectedType?.name} &bull; {selectedType?.duration_minutes} min</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${calculatePrice().toFixed(2)}</p>
            {isPremium && <p className="text-xs text-amber-600">10% premium discount applied</p>}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-2">Select Date & Time</h2>
          {openCount > 0
            ? <p className="text-gray-600">{openCount} day{openCount !== 1 ? 's' : ''} available this month — choose one below</p>
            : <p className="text-amber-600 text-sm">No availability set for this month. Try another month.</p>
          }
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <button onClick={(e) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-medium text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button onClick={(e) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)); }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, idx) => {
                if (!date) return <div key={idx} className="aspect-square" />;
                const isAvailable = isDateAvailable(date);
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <button key={idx}
                    onClick={(e) => { e.stopPropagation(); isAvailable && handleSelectDate(date); }}
                    disabled={!isAvailable}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                      isSelected ? 'bg-indigo-600 text-white'
                        : isAvailable ? 'hover:bg-indigo-100 text-gray-900 bg-emerald-50'
                          : 'text-gray-300 cursor-not-allowed'
                    } ${isToday && !isSelected ? 'ring-2 ring-indigo-300' : ''}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 inline-block" />Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100 inline-block" />Unavailable</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" /> Available Times
            </h3>

            {selectedDate ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                    {timeSlots.map(slot => (
                      <button key={slot.time}
                        onClick={(e) => { e.stopPropagation(); slot.available && handleSelectTime(slot.time); }}
                        disabled={!slot.available}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === slot.time ? 'bg-indigo-600 text-white'
                            : slot.available ? 'bg-gray-100 hover:bg-indigo-100 text-gray-900'
                              : 'bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {formatTime(slot.time)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No available slots for this date</p>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a date to see available times</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={(e) => { e.stopPropagation(); handleProceedToCheckout(false); }}
            disabled={!selectedDate || !selectedTime || loading}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? 'Processing...' : 'Continue to Payment'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">{error}</div>
        )}
      </div>
    );
  };

  const renderCheckout = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setClientSecret(null);
          setStep(selectedType?.is_virtual ? 'calendar' : 'contact');
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>

      <div className="text-center">
        <h2 className="text-3xl font-serif text-gray-900 mb-4">Complete Your Booking</h2>
        <p className="text-gray-600">Review your consultation details and complete payment</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={selectedConsultant?.image_url} alt={selectedConsultant?.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="font-medium text-gray-900">{selectedConsultant?.name}</h4>
              <p className="text-sm text-gray-600">{selectedType?.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {selectedType?.is_virtual ? (
              <>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">
                    {selectedTime && formatTime(selectedTime)} ({selectedType?.duration_minutes} min)
                  </p>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Scheduling</p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  Consultant will contact you to confirm time
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Format</p>
              <p className="font-medium text-gray-900 flex items-center gap-2">
                {selectedType?.is_virtual
                  ? <><Video className="w-4 h-4 text-blue-600" />Virtual Session</>
                  : <><MapPin className="w-4 h-4 text-green-600" />In-Person</>}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">${calculatePrice().toFixed(2)}</p>
              {isPremium && <p className="text-xs text-amber-600">10% premium discount</p>}
            </div>
          </div>

          {/* Contact summary */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Your Contact Details</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" />{contactInfo.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" />{contactInfo.email}</span>
              {contactInfo.location && (
                <span className="flex items-center gap-1.5 col-span-2"><MapPin className="w-3.5 h-3.5 text-gray-400" />{contactInfo.location}</span>
              )}
            </div>
          </div>

          {notes && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="text-gray-700">{notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              onSuccess={handlePaymentSuccess}
              onCancel={() => { setClientSecret(null); setStep(selectedType?.is_virtual ? 'calendar' : 'contact'); }}
              amount={calculatePrice()}
            />
          </Elements>
        )}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div>
        <h2 className="text-3xl font-serif text-gray-900 mb-4">
          {bookingResult?.isInPersonPending ? 'Request Received!' : 'Booking Confirmed!'}
        </h2>
        <p className="text-gray-600">
          {bookingResult?.isInPersonPending
            ? `Your in-person consultation request with ${selectedConsultant?.name} has been submitted. They will contact you at ${contactInfo.phone} or ${contactInfo.email} to confirm a convenient time.`
            : `Your consultation with ${selectedConsultant?.name} has been scheduled. A confirmation email will be sent to ${contactInfo.email}.`}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200 text-left">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={selectedConsultant?.image_url} alt={selectedConsultant?.name} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <h4 className="font-medium text-gray-900">{selectedConsultant?.name}</h4>
              <p className="text-sm text-gray-600">{selectedType?.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {!bookingResult?.isInPersonPending && selectedDate && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">{selectedTime && formatTime(selectedTime)}</p>
                </div>
              </>
            )}
            <div>
              <p className="text-sm text-gray-500">Contact Phone</p>
              <p className="font-medium text-gray-900">{contactInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="font-medium text-gray-900">{contactInfo.email}</p>
            </div>
            {contactInfo.location && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{contactInfo.location}</p>
              </div>
            )}
          </div>

          {bookingResult?.isInPersonPending && (
            <div className="pt-4 border-t border-gray-100 p-3 bg-green-50 rounded-xl">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <strong>What's next:</strong> Your consultant will reach out within 24–48 hours to confirm your appointment time.
              </p>
            </div>
          )}

          {bookingResult?.meetingLink && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Meeting Link</p>
              <a href={bookingResult.meetingLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 font-medium">
                {bookingResult.meetingLink}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {bookingResult?.calendarInvite && (
          <button
            onClick={(e) => { e.stopPropagation(); downloadCalendarInvite(); }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Download className="w-5 h-5" /> Add to Calendar
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); resetBooking(); }}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Book Another Consultation
        </button>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-0">
      {!isExpanded && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-full font-semibold tracking-wide hover:bg-gray-800 transition-colors shadow-lg focus:outline-none"
          >
            Explore Consultations
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="flex justify-end px-6 pt-6 md:px-8">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>
          <div className="px-6 pb-6 md:px-8 md:pb-8" onClick={e => e.stopPropagation()}>
            {step === 'consultants' && renderConsultants()}
            {step === 'type' && renderTypeSelection()}
            {step === 'contact' && renderContactInfo()}
            {step === 'calendar' && renderCalendar()}
            {step === 'checkout' && renderCheckout()}
            {step === 'confirmation' && renderConfirmation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationBooking;