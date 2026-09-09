import React, { useState } from 'react';
import { Mail, BookOpen, Sparkles, Check, AlertCircle, Loader2, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { subscribeToMailchimp } from '@/lib/mailchimp';
import { useAuth } from '@/contexts/AuthContext';

interface NewsletterSignupProps {
  source?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ source = 'blog' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Get the user's elemental type from auth context
  const { profile } = useAuth();
  const profileElementalType = profile?.elemental_type || null;

  // Also check localStorage for non-logged-in users who have taken the quiz
  const elementalType = profileElementalType || (() => {
    try {
      return localStorage.getItem('pendingElementalType') || null;
    } catch {
      return null;
    }
  })();

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await subscribeToMailchimp({
        email: trimmedEmail,
        elementalType,
      });
      if (result.ok === false) {
        setStatus('error');
        setErrorMessage(result.message);
      } else {
        // Mirror to Supabase for in-app admin / analytics (non-blocking failures)
        const insertPayload: {
          email: string;
          source: string;
          elemental_type?: string;
          subscribed_at: string;
        } = {
          email: trimmedEmail,
          source,
          subscribed_at: new Date().toISOString(),
        };
        if (elementalType) {
          insertPayload.elemental_type = elementalType;
        }

        const { error } = await supabase.from('newsletter_subscribers').insert([insertPayload]);

        if (error) {
          if (error.code === '23505' && elementalType) {
            await supabase
              .from('newsletter_subscribers')
              .update({ elemental_type: elementalType, updated_at: new Date().toISOString() })
              .eq('email', trimmedEmail);
          } else if (error.code !== '23505') {
            console.warn('Newsletter Supabase mirror:', error);
          }
        }

        setStatus('success');
        setEmail('');
      }
    } catch (err: unknown) {
      console.error('Newsletter signup error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setErrorMessage('');
  };

  return (
    <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-teal-400/20 to-violet-400/20 border border-white/10 mb-6">
          <BookOpen className="w-7 h-7 text-amber-400" />
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3">
          Never Miss an Article
        </h3>
        <p className="text-gray-400 max-w-lg mx-auto mb-8 text-base md:text-lg leading-relaxed">
          Get the latest color theory insights, styling tips, and elemental guides delivered straight to your inbox. Join our community of color-conscious readers.
        </p>

        {/* Success State */}
        {status === 'success' ? (
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-8">
              <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                <Check className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">You're subscribed!</h4>
                <p className="text-sm text-gray-400">
                  Welcome to the Elemental Color Identity community. Check your inbox for a confirmation.
                </p>
                {elementalType && (
                  <p className="text-xs text-gray-500 mt-2">
                    Your elemental type ({elementalType}) has been saved with your subscription for personalized content.
                  </p>
                )}
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors mt-2"
              >
                Subscribe another email
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            {/* Elemental type indicator */}
            {elementalType && (
              <div className="mb-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-gray-400">
                  Your elemental type <span className="text-white font-medium capitalize">{elementalType}</span> will be linked to your subscription
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  aria-label="Email address"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'full-email-error' : undefined}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-sm placeholder-gray-500 border transition-all focus:outline-none focus:ring-2 disabled:opacity-60 ${
                    status === 'error'
                      ? 'border-red-400/50 focus:ring-red-400/30'
                      : 'border-white/10 focus:ring-white/20 focus:border-white/20'
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all whitespace-nowrap flex-shrink-0 shadow-lg shadow-white/10"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <div id="full-email-error" role="alert" className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Trust indicators */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Weekly elemental insights
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
                Unsubscribe anytime
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
