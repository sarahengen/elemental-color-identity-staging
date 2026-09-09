import React, { useState, useEffect, useRef } from 'react';
import { quizQuestions, subtypeQuizQuestions, elementalTypes } from '@/data/elementalTypes';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight, Share2, Crown, Loader2, Camera, FileText, Check, Lock, Shirt, Smile } from 'lucide-react';
import SocialShareCard from './SocialShareCard';
import ProfilePurchaseCheckout from './ProfilePurchaseCheckout';
import ProfilePurchaseSuccess from './ProfilePurchaseSuccess';
import { User } from '@supabase/supabase-js';
import type { ColorSwatch } from '@/data/elementalTypes';
import { useAuth } from '@/contexts/AuthContext';
import { getSubtypeProfilePriceUsd, hasSubtypeProfileAccess } from '@/lib/subtypeProfileAccess';
import { subscribeToMailchimp, subtypeMailchimpTag } from '@/lib/mailchimp';

function hexLuminance(hex: string): number {
  const h = hex.replace ('#', '');
  if (h.length < 6) return 1;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function subtypeDotColor(colors: ColorSwatch[]): string {
  const visible = colors.find((c) => hexLuminance(c.hex) < 0.85);
  return visible?.hex ?? colors[1]?.hex ?? colors[0].hex;
}

function isLightDotColor(hex: string): boolean {
  return hexLuminance(hex) >= 0.85;
}

interface QuizProps {
  onComplete: (elementType: string, subtype?: string) => void;
  onClose: () => void;
  initialElement?: string | null;
  /** Open directly on the results screen (e.g. "Get My Full Profile" email link). */
  initialResults?: { element: string; subtype: string } | null;
  user?: User | null;
  onOpenAuth?: () => void;
  onSaveResult?: (element: string, subtype: string) => Promise<void>;
}

type QuizStage = 'element' | 'subtype-intro' | 'email-capture' | 'subtype';

const Quiz: React.FC<QuizProps> = ({ onComplete, onClose, initialElement, initialResults, user, onOpenAuth, onSaveResult }) => {
  const { profile, refreshProfile } = useAuth();

  // ── Quiz progress ──
  const [stage, setStage] = useState<QuizStage>(initialElement ? 'subtype-intro' : 'element');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [subtypeAnswers, setSubtypeAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [resultElement, setResultElement] = useState<string | null>(initialElement || null);
  const [resultSubtype, setResultSubtype] = useState<string | null>(null);

  // ── Email capture ──
  const [captureFirstName, setCaptureFirstName] = useState('');
  const [captureLastName, setCaptureLastName] = useState('');
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureLoading, setCaptureLoading] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // ── Purchase / share ──
  const [showShareModal, setShowShareModal] = useState(false);
  const [showProfileCheckout, setShowProfileCheckout] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const autoSaveAttempted = useRef(false);

  const profilePriceUsd = getSubtypeProfilePriceUsd();
  const hasProfileAccess = hasSubtypeProfileAccess(profile);

  // ── Answer selection ──
  const handleAnswer = (value: string) => {
    if (stage === 'element') {
      setAnswers({ ...answers, [currentQuestion]: value });
    } else {
      setSubtypeAnswers({ ...subtypeAnswers, [currentQuestion]: value });
    }
  };

  const goNext = () => {
    if (stage === 'element') {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateElementResults();
      }
    } else if (stage === 'subtype') {
      const subtypeQs = subtypeQuizQuestions[resultElement!];
      if (currentQuestion < subtypeQs.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateSubtypeResults();
      }
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateElementResults = () => {
    const counts: Record<string, number> = { fire: 0, water: 0, earth: 0, air: 0 };
    Object.values(answers).forEach((el) => { counts[el] = (counts[el] || 0) + 1; });
    const maxElement = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    setResultElement(maxElement);
    setStage('subtype-intro');
  };

  const calculateSubtypeResults = () => {
    const counts: Record<string, number> = {};
    Object.values(subtypeAnswers).forEach((s) => { counts[s] = (counts[s] || 0) + 1; });
    const maxSubtype = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    setResultSubtype(maxSubtype);
    setShowResults(true);
    if (resultElement) {
      localStorage.setItem('pendingElementalType', resultElement);
      localStorage.setItem('pendingSubtype', maxSubtype);
      localStorage.setItem('pendingQuizMode', initialElement ? 'subtype' : 'full');
    }
    sendResultEmail(maxSubtype);
  };

  // ── Email "Get My Full Profile" link — show saved results without retaking ──
  useEffect(() => {
    if (!initialResults) return;
    setResultElement(initialResults.element);
    setResultSubtype(initialResults.subtype);
    setShowResults(true);
  }, [initialResults]);

  // Sends the quiz-result email (Mandrill) + marketing upsert for guests and
  // signed-in users who have not purchased yet. Skips users who already have
  // profile or premium access — they do not need the upsell email. Fire-and-forget.
  const sendResultEmail = (subtypeId: string) => {
    if (!resultElement) return;
    if (user && hasProfileAccess) return;

    const metaName = (user?.user_metadata?.full_name as string | undefined) ?? '';
    const profileName = profile?.full_name ?? metaName;
    const [profileFirst, ...profileRest] = profileName.trim().split(/\s+/);

    const email =
      submittedEmail || user?.email || localStorage.getItem('pendingEmail') || '';
    const firstName =
      captureFirstName || profileFirst || localStorage.getItem('pendingFirstName') || '';
    const lastName =
      captureLastName || profileRest.join(' ') || localStorage.getItem('pendingLastName') || '';

    if (!email) return;

    const typeData = elementalTypes.find((t) => t.id === resultElement);
    const subData = typeData?.subtypes.find((s) => s.id === subtypeId);
    if (!subData) return;

    subscribeToMailchimp({
      email,
      firstName,
      lastName,
      elementalType: resultElement,
      subtypeName: subData.name,
      subtypeShortName: subData.shortName,
      subtypeDescription: subData.description,
      tags: ['quiz_taker', 'quiz_complete', 'profile_not_purchased', subtypeMailchimpTag(subtypeId)],
    }).catch((err) => console.error('Result email / subscribe failed:', err));
  };

  // ── Proceed to 6 subtype questions (called after email capture or if already logged in) ──
  const proceedToSubtype = () => {
    setCurrentQuestion(0);
    setSubtypeAnswers({});
    setStage('subtype');
  };

  // ── From subtype-intro "Continue to subtype" ──
  const handleContinueToSubtype = () => {
    if (user) {
      // Already logged in — skip capture
      proceedToSubtype();
    } else {
      setStage('email-capture');
    }
  };

  // ── Email capture submit ──
  // We only collect the email here — no auth email is sent. The personalised
  // result email (Mandrill) fires once after the subtype results are known.
  // Authentication (magic link) is deferred until the user actually clicks Buy.
  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = captureEmail.trim();
    const trimmedFirst = captureFirstName.trim();
    const trimmedLast = captureLastName.trim();
    if (!trimmedEmail || !trimmedFirst) return;

    setCaptureLoading(true);
    setCaptureError(null);

    try {
      // Persist name/email for the result email (Mailchimp/Mandrill) sent after subtype results
      setSubmittedEmail(trimmedEmail);
      localStorage.setItem('pendingEmail', trimmedEmail);
      localStorage.setItem('pendingFirstName', trimmedFirst);
      localStorage.setItem('pendingLastName', trimmedLast);
      if (resultElement) localStorage.setItem('pendingElementalType', resultElement);

      // Proceed to 6 subtype questions immediately (result email fires after results)
      proceedToSubtype();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setCaptureError(msg);
    } finally {
      setCaptureLoading(false);
    }
  };

  // ── Store pending quiz results before checkout / auth ──
  const storePendingQuizResults = () => {
    if (resultElement) localStorage.setItem('pendingElementalType', resultElement);
    if (resultSubtype) localStorage.setItem('pendingSubtype', resultSubtype);
    localStorage.setItem('pendingQuizMode', initialElement ? 'subtype' : 'full');
  };

  // ── BUY button ──
  // Authentication happens here (and only here): a guest who wants to purchase
  // is prompted to set up an account / sign in via the auth modal so they get
  // access to all their tools — then checkout, then the success screen.
  const handleBuyProfile = () => {
    storePendingQuizResults();
    if (!user) {
      localStorage.setItem('pendingProfilePurchase', 'true');
      onOpenAuth?.();
      return;
    }
    setShowProfileCheckout(true);
  };

  const handleProfilePurchaseSuccess = async () => {
    setShowProfileCheckout(false);
    setShowPurchaseSuccess(true);
    await refreshProfile();
  };

  // ── Auto-save quiz results for logged-in users ──
  useEffect(() => {
    if (!showResults || !user || !resultElement || !resultSubtype || !onSaveResult || autoSaveAttempted.current) return;
    autoSaveAttempted.current = true;
    onSaveResult(resultElement, resultSubtype).catch((err) => {
      console.error('Auto-save quiz result failed:', err);
    });
  }, [showResults, user, resultElement, resultSubtype, onSaveResult]);

  // ── Resume checkout after magic-link login ──
  useEffect(() => {
    if (!showResults || !user || !resultElement || !resultSubtype) return;
    if (localStorage.getItem('pendingProfilePurchase') !== 'true') return;
    localStorage.removeItem('pendingProfilePurchase');
    if (!hasSubtypeProfileAccess(profile)) setShowProfileCheckout(true);
  }, [showResults, user, resultElement, resultSubtype, profile]);

  const resultData = resultElement ? elementalTypes.find((t) => t.id === resultElement) : null;
  const subtypeData = resultSubtype && resultData ? resultData.subtypes.find((s) => s.id === resultSubtype) : null;

  const progress = stage === 'element'
    ? ((currentQuestion + 1) / quizQuestions.length) * 100
    : stage === 'subtype' && resultElement
    ? ((currentQuestion + 1) / subtypeQuizQuestions[resultElement].length) * 100
    : 0;

  // ══════════════════════════════════════════════
  // RESULTS SCREEN
  // ══════════════════════════════════════════════
  if (showResults && resultData && subtypeData) {
    const displayEmail =
      submittedEmail || localStorage.getItem('pendingEmail') || user?.email || 'your email';

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl">

          <div
            className="relative h-36 sm:h-44 shrink-0 rounded-t-3xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${resultData.colors[0].hex}dd, ${resultData.colors[1].hex}dd)` }}
          >
            <img
              src={resultData.image}
              alt={resultData.name}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">
                  {subtypeData.name}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium text-white mt-1.5 drop-shadow-md">
                  {resultData.name} Element • {resultData.season} Season
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 pt-5 sm:pt-6 pb-6 sm:pb-8">
            <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">{subtypeData.description}</p>

            <h3 className="font-semibold text-base sm:text-lg mb-2.5">Your Characteristics</h3>
            <ul className="space-y-2 mb-4">
              {subtypeData.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: subtypeData.colors[0].hex }} />
                  {char}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-base sm:text-lg mb-2.5">Your Color Palette</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {subtypeData.colors.slice(0, 8).map((color, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-white"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-gray-500 mt-1 block">{color.name}</span>
                </div>
              ))}
            </div>

            {hasProfileAccess ? (
              <p className="text-sm font-medium text-emerald-700 bg-emerald-100/60 rounded-xl px-4 py-3 text-center mb-4">
                You have full profile access.
              </p>
            ) : (
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50/80 to-emerald-50 rounded-3xl p-5 sm:p-7 mb-4 border border-emerald-100">
                <div className="flex items-start gap-3 sm:gap-4 mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-md">
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-serif leading-snug">
                      You&apos;ve met your elemental type.{' '}
                      <span className="font-bold text-emerald-800">Want the full picture?</span>
                    </p>
                    <p className="text-gray-700 mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base md:text-lg">
                      Your{' '}
                      <span className="font-semibold text-emerald-900 bg-emerald-100/80 rounded px-1.5 py-0.5">
                        19-page Elemental Color Profile
                      </span>
                      {' '}— color guides, archetypes, philosophy, and your path.
                    </p>
                    <p className="text-emerald-900 mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base md:text-lg font-semibold">
                      The interactive Color Camera Analyzer — point your camera at clothes or decor and see what matches your palette in real time.
                    </p>
                  </div>
                </div>

                {/* Product visuals — dark/neutral so they don't clash with the palette */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div className="group rounded-2xl overflow-hidden border border-slate-700/40 bg-white shadow-sm">
                    <div className="h-24 sm:h-28 md:h-32 relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center p-3 overflow-hidden">
                      <div
                        className="w-14 h-[4.5rem] md:w-16 md:h-20 rounded-lg shadow-lg border border-white/20 relative overflow-hidden flex flex-col justify-end p-2"
                        style={{
                          background: `linear-gradient(150deg, ${subtypeData.colors[0]?.hex ?? resultData.colors[0].hex}, ${subtypeData.colors[1]?.hex ?? resultData.colors[1].hex})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
                        <FileText className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-white/80" aria-hidden="true" />
                        <span className="relative text-white text-[9px] md:text-[10px] font-serif font-semibold leading-tight drop-shadow">
                          {subtypeData.name}
                        </span>
                      </div>
                    </div>
                    <div className="px-3.5 py-3 bg-white">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">19-page PDF profile</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-5">Full color guides &amp; path</p>
                    </div>
                  </div>

                  <div className="group rounded-2xl overflow-hidden border border-slate-700/40 bg-white shadow-sm">
                    <div className="h-24 sm:h-28 md:h-32 relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-3 overflow-hidden">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex gap-1 mt-2.5">
                        {subtypeData.colors.slice(0, 5).map((c) => (
                          <span
                            key={c.hex}
                            className="w-2.5 h-2.5 rounded-full border border-white/50"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="px-3.5 py-3 bg-white">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">Live match to your palette</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-5">Interactive camera analyzer</p>
                    </div>
                  </div>

                  <div className="group rounded-2xl overflow-hidden border border-slate-700/40 bg-white shadow-sm">
                    <div className="h-24 sm:h-28 md:h-32 relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center p-3 overflow-hidden">
                      <div className="relative">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Shirt className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <span className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-white text-slate-700 text-[9px] font-bold shadow-sm border border-slate-200">
                          92%
                        </span>
                      </div>
                    </div>
                    <div className="px-3.5 py-3 bg-white">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">Wardrobe analyzer</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-5">Score outfits from your closet</p>
                    </div>
                  </div>

                  <div className="group rounded-2xl overflow-hidden border border-slate-700/40 bg-white shadow-sm">
                    <div className="h-24 sm:h-28 md:h-32 relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-3 overflow-hidden">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <Smile className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div className="flex gap-1 mt-2.5">
                        {subtypeData.colors.slice(0, 4).map((c) => (
                          <span
                            key={`makeup-${c.hex}`}
                            className="w-2.5 h-2.5 rounded-full border border-white/50"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="px-3.5 py-3 bg-white">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900">Makeup guide</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-5">Shades &amp; products for you</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBuyProfile}
                  className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-base sm:text-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-600/20"
                >
                  Full picture — ${profilePriceUsd.toFixed(0)}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Secure checkout
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    One-time · instant access
                  </span>
                </div>

                {!user && (
                  <p className="mt-3 text-center text-xs text-gray-500">
                    You&apos;ll set up a free account so you get access to all your tools — takes a moment.
                  </p>
                )}

                <p className="mt-2 text-center text-[11px] text-gray-400 leading-snug">
                  A copy of your result was also emailed to {displayEmail} so you can return later.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                onComplete(resultElement!, resultSubtype!);
                onClose();
              }}
              className="w-full py-2.5 sm:py-3 border border-gray-300 rounded-full font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share your results
              </button>
            </div>
          </div>
        </div>

        <SocialShareCard
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          elementalType={resultData}
          subtype={subtypeData}
        />

        {showProfileCheckout && user && resultElement && resultSubtype && (
          <ProfilePurchaseCheckout
            user={user}
            elementalType={resultElement}
            elementalSubtype={resultSubtype}
            subtypeLabel={subtypeData.name}
            onSuccess={handleProfilePurchaseSuccess}
            onCancel={() => setShowProfileCheckout(false)}
          />
        )}

        {showPurchaseSuccess && resultElement && resultSubtype && (
          <ProfilePurchaseSuccess
            elementalType={resultElement}
            elementalSubtype={resultSubtype}
            subtypeLabel={subtypeData.name}
            email={user?.email}
            onClose={() => {
              setShowPurchaseSuccess(false);
              onClose();
            }}
          />
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // EMAIL CAPTURE SCREEN
  // ══════════════════════════════════════════════
  if (stage === 'email-capture' && resultData) {
    const accentHex = resultData.colors[0].hex;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">

          {/* Accent bar */}
          <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${resultData.colors[0].hex}, ${resultData.colors[1]?.hex ?? resultData.colors[0].hex})` }} />

          <div className="p-8">
            <p
              className="text-sm font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: accentHex }}
            >
              Your elemental type is nearly ready.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 mb-1">
              Where should we send it?
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Just your result — and the occasional invitation to go deeper. Nothing more.
            </p>

            <form onSubmit={handleCaptureSubmit} className="space-y-4">
              {/* First name + Last name side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="quiz-capture-first" className="block text-sm font-medium text-gray-700 mb-1.5">
                    First name
                  </label>
                  <input
                    id="quiz-capture-first"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={captureFirstName}
                    onChange={(e) => setCaptureFirstName(e.target.value)}
                    placeholder="First"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="quiz-capture-last" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Last name
                  </label>
                  <input
                    id="quiz-capture-last"
                    type="text"
                    autoComplete="family-name"
                    value={captureLastName}
                    onChange={(e) => setCaptureLastName(e.target.value)}
                    placeholder="Last"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quiz-capture-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="quiz-capture-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={captureEmail}
                  onChange={(e) => setCaptureEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>

              {captureError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{captureError}</p>
              )}

              <button
                type="submit"
                disabled={captureLoading || !captureEmail.trim() || !captureFirstName.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {captureLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Me My Result
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // SUBTYPE INTRO SCREEN
  // ══════════════════════════════════════════════
  if (stage === 'subtype-intro' && resultData) {
    const accentHex = resultData.colors[0].hex;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl">
          <div
            className="relative h-36 sm:h-44 shrink-0 rounded-t-3xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${resultData.colors[0].hex}dd, ${resultData.colors[1].hex}dd)` }}
          >
            <img
              src={resultData.image}
              alt={resultData.name}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">
                  You are {resultData.name}
                </h2>
                <p className="text-base sm:text-lg md:text-xl font-medium text-white mt-1.5 drop-shadow-md">
                  {resultData.season} Season
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 pt-5 sm:pt-6 pb-2">
            <p className="text-lg sm:text-xl text-gray-600 italic mb-3">{resultData.tagline}</p>
            <p className="text-gray-700 mb-5 leading-relaxed text-sm sm:text-base">{resultData.description}</p>

            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accentHex }}>
              One step left
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 mb-2">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Discover your Elemental Subtype</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                As a {resultData.name} ({resultData.season}) type, there are four subtypes that further refine
                your color palette.{' '}
                <span className="font-semibold text-gray-900">
                  Answer 6 questions to discover your specific subtype and get an even more personalized palette
                  and profile.
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {resultData.subtypes.map((subtype) => {
                  const dotColor = subtypeDotColor(subtype.colors);
                  return (
                    <div key={subtype.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${isLightDotColor(dotColor) ? 'border border-gray-400' : ''}`}
                        style={{ backgroundColor: dotColor }}
                      />
                      {subtype.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint that more content may sit above the sticky CTA */}
            <div className="flex items-center justify-center gap-1.5 pt-2 pb-1 text-xs text-gray-400 sm:hidden">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll for details</span>
            </div>
          </div>

          {/* Sticky CTA — always visible so people don't miss the next step */}
          <div className="shrink-0 border-t border-gray-100 bg-white px-5 sm:px-8 py-3 sm:py-4 rounded-b-3xl">
            <button
              onClick={handleContinueToSubtype}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 sm:py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continue to subtype
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // QUIZ QUESTIONS
  // ══════════════════════════════════════════════
  const questions = stage === 'element' ? quizQuestions : subtypeQuizQuestions[resultElement!];
  const question = questions[currentQuestion];
  const currentAnswers = stage === 'element' ? answers : subtypeAnswers;
  const accentHex = resultData?.colors[0].hex;
  const accentHex2 = resultData?.colors[1]?.hex ?? accentHex;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">

        {stage === 'subtype' && resultData && accentHex ? (
          <div
            className="relative h-36 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accentHex}dd, ${accentHex2}dd)` }}
          >
            <img
              src={resultData.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-black/10" aria-hidden="true" />
            <button
              onClick={onClose}
              className="absolute top-5 right-6 z-10 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-full px-8 flex flex-col justify-end pb-5">
              <h2 className="text-3xl font-serif font-bold text-white drop-shadow-md">
                {resultData.name}
              </h2>
              <p className="text-sm font-medium text-white/90 mt-1 drop-shadow-sm">
                Subtype Quiz • Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/25">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-teal-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="p-8">
          {/* Header — element quiz only; subtype uses colored band above */}
          {stage === 'element' && (
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm text-gray-500">
                Element Quiz • Question {currentQuestion + 1} of {questions.length}
              </span>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Question */}
          <h2 className="text-2xl font-serif text-gray-900 mb-8">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => {
              const value = stage === 'element' ? (option as any).element : (option as any).subtype;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    currentAnswers[currentQuestion] === value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-700">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={goPrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                currentQuestion === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={goNext}
              disabled={!currentAnswers[currentQuestion]}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                currentAnswers[currentQuestion]
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
