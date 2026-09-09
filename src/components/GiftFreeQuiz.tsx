import React, { useRef, useState } from 'react';
import {
  X,
  Gift,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  Copy,
  CheckCircle,
  Download,
  Loader2,
  Send,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase, supabaseUrl, supabaseKey } from '@/lib/supabase';
import { getViteEnv } from '@/lib/env';
import GiftCardPreview from './GiftCardPreview';
import { giftCardThemeOptions } from '@/lib/giftCardThemes';

const PUBLIC_SITE_URL = (
  getViteEnv('VITE_SITE_URL') || 'https://www.elementalcoloridentity.com'
).replace(/\/$/, '');

/** Prefer the live site link so gifted cards/emails work outside localhost. */
function getShareableQuizLink(): string {
  const origin = window.location.origin.replace(/\/$/, '');
  const host = window.location.hostname.toLowerCase();
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
  return `${isLocal ? PUBLIC_SITE_URL : origin}/?quiz=1`;
}

const GIFT_EMAIL_TIMEOUT_MS = 60000;

interface GiftFreeQuizProps {
  user?: any;
  profile?: any;
  onClose: () => void;
}

/**
 * Gift the Free Quiz — preview & create, then share:
 * email (clickable gift-card image → quiz), download, or copy link.
 */
const GiftFreeQuiz: React.FC<GiftFreeQuizProps> = ({ user, profile, onClose }) => {
  const [step, setStep] = useState<'details' | 'preview' | 'success'>('details');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [elementalType, setElementalType] = useState<string | null>(profile?.elemental_type || null);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const senderName = profile?.full_name || user?.email?.split('@')[0] || 'A Friend';
  const quizLink = getShareableQuizLink();
  const hasRecipientEmail = Boolean(recipientEmail.trim());

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim()) {
      setError('Please enter the recipient\u2019s name');
      return;
    }
    if (recipientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setStep('preview');
  };

  const handleCreateGift = () => {
    setEmailSent(false);
    setError(null);
    setStep('success');
    toast({
      title: 'Your gift is ready!',
      description: `Download, copy the link, or email it to ${recipientName}.`,
    });
  };

  const captureCardPng = async (opts?: { pixelRatio?: number }): Promise<string | null> => {
    if (!cardRef.current) return null;
    const { toPng } = await import('html-to-image');
    const el = cardRef.current;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    return toPng(el, {
      // Email uses 1× to keep the request under the gateway/timeout limits.
      pixelRatio: opts?.pixelRatio ?? 2,
      cacheBust: true,
      backgroundColor: undefined,
      width,
      height,
      style: {
        margin: '0',
        marginLeft: '0',
        marginRight: '0',
      },
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(quizLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      toast({ title: 'Copied!', description: 'Free Quiz link copied to clipboard' });
    } catch {
      toast({ title: 'Failed to copy link', variant: 'destructive' });
    }
  };

  const handleDownloadCard = async () => {
    setDownloading(true);
    try {
      const dataUrl = await captureCardPng();
      if (!dataUrl) throw new Error('Could not render gift card');

      const link = document.createElement('a');
      const safeName = recipientName.trim().toLowerCase().replace(/\s+/g, '-') || 'friend';
      link.download = `free-quiz-gift-${safeName}.png`;
      link.href = dataUrl;
      link.click();

      try {
        await navigator.clipboard.writeText(quizLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch {
        // Download still succeeded
      }

      toast({
        title: 'Gift card downloaded!',
        description: 'Image saved — quiz link also copied so you can text both.',
      });
    } catch (err) {
      console.error('Error generating gift card image:', err);
      toast({ title: 'Failed to download image', variant: 'destructive' });
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipientEmail.trim()) {
      setError('Enter their email to send the gift');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setSending(true);
    setError(null);
    try {
      let cardImageBase64: string | undefined;
      try {
        // Smaller PNG for email so the edge-function request finishes reliably.
        const dataUrl = await captureCardPng({ pixelRatio: 1 });
        if (dataUrl) cardImageBase64 = dataUrl;
      } catch (captureErr) {
        console.warn('Gift card capture failed; sending email without image:', captureErr);
      }

      // Bypass the shared 15s Supabase fetch timeout — image + Resend often need longer.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token || supabaseKey;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GIFT_EMAIL_TIMEOUT_MS);

      let response: Response;
      try {
        response = await fetch(`${supabaseUrl}/functions/v1/send-gift-quiz-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            apikey: supabaseKey,
          },
          body: JSON.stringify({
            recipientName: recipientName.trim(),
            recipientEmail: recipientEmail.trim(),
            senderName,
            personalMessage: personalMessage.trim(),
            quizLink,
            cardImageBase64,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      let data: { success?: boolean; error?: string; messageId?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'Email function is not deployed yet. You can still download the card or copy the link.',
          );
        }
        throw new Error(data?.error || `Could not send email (HTTP ${response.status})`);
      }
      if (data && data.success === false) {
        throw new Error(data.error || 'Failed to send gift email');
      }

      setEmailSent(true);
      toast({
        title: 'Gift emailed!',
        description: `${recipientName} can tap the card image to open the quiz.`,
      });
    } catch (err: unknown) {
      console.error('Error sending gift quiz email:', err);
      const aborted =
        err instanceof DOMException && err.name === 'AbortError';
      const message = aborted
        ? 'Email timed out — try again, or download the card and share the link.'
        : err instanceof Error
          ? err.message
          : 'Failed to send gift email';
      setError(message);
      toast({
        title: 'Couldn\u2019t send email',
        description: 'You can still download the card or copy the link.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'details', label: 'Recipient' },
      { key: 'preview', label: 'Preview' },
    ];
    const currentIdx = steps.findIndex((s) => s.key === step);

    return (
      <div className="flex items-center justify-center gap-1 mb-4">
        {steps.map((s, idx) => (
          <React.Fragment key={s.key}>
            <div className={`flex items-center gap-1.5 ${idx <= currentIdx ? 'text-gray-900' : 'text-gray-300'}`}>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx < currentIdx
                    ? 'bg-green-500 text-white'
                    : idx === currentIdx
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-400'
                }`}
              >
                {idx < currentIdx ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span className="text-xs font-medium hidden sm:block">{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-6 sm:w-10 h-0.5 ${idx < currentIdx ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[min(92vh,720px)] flex flex-col overflow-hidden shadow-2xl">
        <div className="shrink-0 bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 px-4 py-3.5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Gift className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-serif leading-tight">Gift the Free Quiz</h3>
              <p className="text-white/80 text-xs truncate">Send a friend their color discovery</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`flex-1 min-h-0 px-4 ${step === 'success' ? 'py-3.5 overflow-y-auto' : 'py-5 overflow-y-auto'}`}>
          {step !== 'success' && renderStepIndicator()}

          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div className="text-center mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Recipient Details</h4>
                <p className="text-sm text-gray-500">Who are you gifting the Free Quiz to?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4 text-gray-400" />
                    Recipient&rsquo;s Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter their name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Recipient&rsquo;s Email <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter their email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    Personal Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a heartfelt message..."
                    rows={3}
                    maxLength={200}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{personalMessage.length}/200</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    Card Theme <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {giftCardThemeOptions.map((el) => (
                      <button
                        key={el.label}
                        type="button"
                        onClick={() => setElementalType(el.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                          elementalType === el.id
                            ? 'border-gray-900 shadow-md'
                            : 'border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ background: el.swatch }}
                        />
                        <span className="text-[10px] font-medium text-gray-600">{el.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">{error}</div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  Preview Gift Card
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'preview' && (
            <div className="space-y-5">
              <div className="text-center mb-2">
                <h4 className="text-lg font-semibold text-gray-900">Gift Card Preview</h4>
                <p className="text-sm text-gray-500">Here&rsquo;s what your gift will look like</p>
              </div>

              <GiftCardPreview
                recipientName={recipientName}
                senderName={senderName}
                personalMessage={personalMessage}
                planName="Free Quiz"
                elementalType={elementalType}
                subtitle="Quiz Invitation"
                quizLink={quizLink}
                compact
              />

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gift</span>
                  <span className="font-medium text-gray-900">The Free Quiz</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Recipient</span>
                  <span className="font-medium text-gray-900">{recipientName}</span>
                </div>
                {hasRecipientEmail && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900 truncate ml-3">{recipientEmail.trim()}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="text-xl font-bold text-emerald-600">Free</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={handleCreateGift}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium flex items-center justify-center gap-2 hover:from-amber-600 hover:to-rose-600 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  Create Gift
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col gap-3 pb-1">
              <div className="text-center">
                {emailSent ? (
                  <>
                    <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-serif text-gray-900">Gift emailed!</h4>
                    <p className="mt-0.5 text-xs text-gray-500 truncate">{recipientEmail.trim()}</p>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="h-5 w-5" />
                    <h4 className="text-lg font-serif text-gray-900">Your gift is ready!</h4>
                  </div>
                )}
              </div>

              <GiftCardPreview
                ref={cardRef}
                recipientName={recipientName}
                senderName={senderName}
                personalMessage={personalMessage}
                planName="Free Quiz"
                elementalType={elementalType}
                subtitle="Quiz Invitation"
                quizLink={quizLink}
                compact
              />

              {!emailSent ? (
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => {
                        setRecipientEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="Recipient email"
                      className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-rose-300"
                    />
                  </div>

                  {error && <p className="text-xs text-red-600">{error}</p>}

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={sending || !recipientEmail.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 py-3 text-sm font-semibold text-white transition-all hover:from-amber-600 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send via Email
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEmailSent(false);
                    setError(null);
                  }}
                  className="text-center text-xs font-medium text-gray-500 hover:text-gray-800"
                >
                  Send to another email
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={downloading}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-60"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 text-gray-500" />
                  )}
                  {downloading ? 'Preparing…' : 'Download'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                >
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-500" />
                  )}
                  {copiedLink ? 'Copied!' : 'Copy link'}
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full bg-gray-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftFreeQuiz;
