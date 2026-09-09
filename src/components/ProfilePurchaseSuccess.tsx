import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Palette, Map, ArrowRight, Mail, X } from 'lucide-react';
import { elementalTypes } from '@/data/elementalTypes';

interface ProfilePurchaseSuccessProps {
  /** Element id, e.g. "fire". */
  elementalType: string;
  /** Subtype id, e.g. "fire-air". */
  elementalSubtype: string;
  /** Human-readable subtype name for the headline. */
  subtypeLabel?: string;
  /** Buyer email, shown in the receipt note when available. */
  email?: string | null;
  onClose: () => void;
}

/**
 * Post-purchase "next steps" screen shown right after the $37 profile purchase.
 *
 * The path the client asked for is intentionally simple:
 *   set up account (tools access) → purchase → my subtype page → my color tools
 * with a soft workshop upsell ("Want the whole map?").
 * PDF profile and Stripe receipt are separate emails.
 */
const ProfilePurchaseSuccess: React.FC<ProfilePurchaseSuccessProps> = ({
  elementalType,
  elementalSubtype,
  subtypeLabel,
  email,
  onClose,
}) => {
  const navigate = useNavigate();

  const type = elementalTypes.find((t) => t.id === elementalType) ?? null;
  const subtype = type?.subtypes.find((s) => s.id === elementalSubtype) ?? null;
  const displayName = subtypeLabel || subtype?.name || 'Elemental Subtype';
  const gradientFrom = type?.colors?.[0]?.hex ?? '#059669';
  const gradientTo = type?.colors?.[1]?.hex ?? '#0d9488';

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goToSubtype = () => {
    onClose();
    navigate(`/elemental-types?element=${elementalType}&subtype=${elementalSubtype}`);
  };

  const goToColorTools = () => {
    onClose();
    navigate('/color-tools');
  };

  const goToWorkshop = () => {
    onClose();
    navigate('/elemental-color-workshop');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90dvh] overflow-y-auto scrollbar-hide shadow-2xl">
        <div
          className="relative px-6 sm:px-8 pt-8 pb-7 text-center text-white rounded-t-3xl"
          style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
        >
          <button
            onClick={onClose}
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 p-2 hover:bg-white/15 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif mb-1">You&apos;re all set!</h2>
          <p className="text-white/90 text-sm sm:text-base">
            Your full <span className="font-semibold">{displayName}</span> profile is unlocked.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {/* Email delivery — separate from the on-site subtype page CTA */}
          <div className="flex items-start gap-4 rounded-2xl p-4 border border-emerald-200 bg-emerald-50/50">
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-emerald-600 text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-emerald-800">Check your email</p>
              <p className="text-base text-gray-600 leading-snug mt-0.5">
                Your Elemental Type Profile has been sent
                {email ? <> to <strong className="text-gray-800">{email}</strong></> : null}.
              </p>
            </div>
          </div>

          <button
            onClick={goToSubtype}
            className="w-full group flex items-center gap-4 text-left rounded-2xl p-4 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white"
              style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-emerald-800">View your subtype page</p>
              <p className="text-base text-gray-500 leading-snug mt-0.5">
                Explore your {displayName} profile on the site
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors shrink-0" />
          </button>

          <button
            onClick={goToColorTools}
            className="w-full group flex items-center gap-4 text-left rounded-2xl p-4 border border-gray-200 hover:border-fuchsia-300 hover:bg-fuchsia-50/40 transition-colors"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-purple-500 to-fuchsia-500">
              <Palette className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">Open my Color Tools</p>
              <p className="text-base text-gray-500 leading-snug mt-0.5">
                Color Analyzer &amp; Wardrobe Analyzer
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-fuchsia-500 transition-colors shrink-0" />
          </button>

          <button
            onClick={goToWorkshop}
            className="w-full group flex items-center gap-4 text-left rounded-2xl p-4 border border-dashed border-gray-300 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white bg-gradient-to-br from-amber-500 to-orange-500">
              <Map className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">Want the whole map?</p>
              <p className="text-base text-gray-500 leading-snug mt-0.5">
                Explore every element in the Color Workshop
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors shrink-0" />
          </button>

          <div className="flex items-start gap-2 text-xs text-gray-500 pt-1">
            <Mail className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-600" />
            <span className="leading-snug">
              A separate receipt was also sent by Stripe{email ? <> to <strong>{email}</strong></> : null}.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePurchaseSuccess;
