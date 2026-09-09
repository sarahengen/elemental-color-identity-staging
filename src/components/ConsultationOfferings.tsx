import React, { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  Video,
  Home,
  ArrowRight,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  Check,
  Clock,
  Crown,
  Phone,
  MapPin,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getViteEnv } from '@/lib/env';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

/** Calendly event URL for the Virtual Elemental Color Consultation. */
function getCalendlyConsultUrl(): string | undefined {
  return getViteEnv('VITE_CALENDLY_CONSULT_URL');
}

function calendlyEmbedSrc(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('hide_gdpr_banner', '1');
    return u.toString();
  } catch {
    return url;
  }
}

interface ConsultationOfferingsProps {
  user?: User | null;
}

const ConsultationOfferings: React.FC<ConsultationOfferingsProps> = ({ user }) => {
  const calendlyUrl = getCalendlyConsultUrl();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  // Auto-expand when linked directly (e.g. #book-consultation)
  useEffect(() => {
    if (window.location.hash === '#book-consultation') {
      setIsExpanded(true);
    }
  }, []);

  // Pre-fill name and email from the logged-in user. Phone stays empty (placeholder only).
  const prefillIdentity = () => {
    if (!user) return;
    setEmail(user.email || '');
    const metaName = (user.user_metadata?.full_name as string | undefined) || '';
    if (metaName) setName(metaName);

    void (async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single();
      if (!data) return;
      if (data.full_name) setName(data.full_name);
      if (data.email) setEmail(data.email);
    })();
  };

  useEffect(() => {
    prefillIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when auth user changes
  }, [user]);

  const openEnquiry = () => {
    setStatus('idle');
    setErrors({});
    setPhone('');
    setLocation('');
    setMessage('');
    prefillIdentity();
    setShowEnquiry(true);
  };
  const validateEnquiry = () => {
    const next: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) next.name = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email';
    }
    if (!phone.trim()) {
      next.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(phone.trim())) {
      next.phone = 'Please enter a valid phone number';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEnquiry()) return;

    setSubmitting(true);
    setStatus('idle');
    try {
      const notes = message.trim() || '(No additional notes)';
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          name: name.trim(),
          email: email.trim(),
          subject: 'consultation',
          form_type: 'private_day',
          phone: phone.trim(),
          location: location.trim() || null,
          notes: message.trim() || null,
          message: `[The Private Day enquiry]\n\nPhone: ${phone.trim()}${location.trim() ? `\nLocation: ${location.trim()}` : ''}\n\n${notes}`,
        },
      });
      if (error || !data?.success) {
        setStatus('error');
      } else {
        setStatus('success');
        setPhone('');
        setLocation('');
        setMessage('');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const openCalendly = () => {
    if (!calendlyUrl) return;
    setShowCalendly(true);
  };

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

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative bg-gradient-to-b from-white to-gray-50/60 border border-gray-200 rounded-3xl shadow-xl">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" /> Close
          </button>

          <div className="px-6 pt-12 pb-10 md:px-10 md:pt-14 md:pb-14">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
              {/* Virtual consultation */}
              <div className="group relative rounded-3xl border border-violet-100 bg-white p-8 md:p-9 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center ring-1 ring-violet-100">
                    <Video className="w-6 h-6 text-violet-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 leading-none">$497</p>
                    <p className="text-xs text-gray-400 mt-1">one-time</p>
                  </div>
                </div>

                <h4 className="font-serif text-xl md:text-2xl text-gray-900 mb-2 leading-snug">
                  Elemental Color Consultation
                  <span className="block text-violet-600 text-base font-sans font-medium mt-0.5">
                    Virtual
                  </span>
                </h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  A personal experience with Color &amp; Image expert and founder of ECI.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {[
                    'One-to-one session, focused entirely on you',
                    'A private space to explore and be yourself',
                    'Live video call from anywhere',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 90 min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Web conferencing
                  </span>
                </div>

                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={openCalendly}
                    disabled={!calendlyUrl}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-hover:gap-3"
                  >
                    Book a Consultation
                    <ArrowRight className="w-4 h-4 transition-all" />
                  </button>
                  {!calendlyUrl && (
                    <p className="text-xs text-amber-700 mt-3 text-center">
                      Booking link coming soon.
                    </p>
                  )}
                </div>
              </div>

              {/* Private Day */}
              <div className="group relative rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-white to-rose-50/40 p-8 md:p-9 pt-10 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-[11px] font-semibold tracking-wide shadow-sm">
                    <Crown className="w-3 h-3 text-amber-300" /> Most complete experience
                  </span>
                </div>

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center ring-1 ring-amber-100">
                    <Home className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-amber-700 leading-none">By enquiry</p>
                    <p className="text-xs text-gray-400 mt-1">virtual optional</p>
                  </div>
                </div>

                <h4 className="font-serif text-xl md:text-2xl text-gray-900 mb-2 leading-snug">
                  The Private Day
                </h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  A full day of personal discovery in your own home — unhurried, intimate, and completely
                  personal. The most complete Elemental Color Identity experience available, brought to you
                  in your own light.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {[
                    'Your elemental type, true palette & archetype',
                    'Your home. Your wardrobe. Your lifestyle. Your questions',
                    'A full day, entirely dedicated to you',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5" /> In your own home
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Full day
                  </span>
                </div>

                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={openEnquiry}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors group-hover:gap-3"
                  >
                    Begin the Conversation
                    <ArrowRight className="w-4 h-4 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly embed */}
      <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
        <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0 overflow-hidden sm:rounded-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Book a Consultation</DialogTitle>
            <DialogDescription>Schedule your Virtual Elemental Color Consultation</DialogDescription>
          </DialogHeader>
          {calendlyUrl && (
            <iframe
              title="Book Elemental Color Consultation"
              src={calendlyEmbedSrc(calendlyUrl)}
              className="w-full h-full border-0"
              allow="payment *"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Private Day enquiry */}
      <Dialog
        open={showEnquiry}
        onOpenChange={(open) => {
          setShowEnquiry(open);
          if (!open) setStatus('idle');
        }}
      >
        <DialogContent className="max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">The Private Day</DialogTitle>
            <DialogDescription>
              Share a little about yourself and we&rsquo;ll begin the conversation.
            </DialogDescription>
          </DialogHeader>

          {status === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-gray-800 font-medium">Thank you — we&rsquo;ll be in touch soon.</p>
              <button
                type="button"
                onClick={() => setShowEnquiry(false)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="City, State (or preferred area)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  placeholder="Any specific questions or topics you'd like to discuss..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Something went wrong. Please try again, or email info@elementalcoloridentity.com.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {submitting ? 'Sending…' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send enquiry
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">We&rsquo;ll reply within 24 hours</p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationOfferings;
