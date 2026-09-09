import React from 'react';
import { Lock, Check, ArrowRight } from 'lucide-react';

interface LockedOverlayProps {
  /** Real content rendered (blurred + non-interactive) behind the unlock card. */
  children: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  /** Small icon shown in the gradient lock badge. Defaults to a lock. */
  icon?: React.ReactNode;
  ctaLabel: string;
  onUnlock: () => void;
  /** Optional secondary line under the CTA (e.g. pricing / "one-time payment"). */
  note?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * Gates `children` behind a polished "locked" overlay. The real content stays
 * visible (blurred, dimmed, non-interactive) so users can see what they'd
 * unlock, while a centered card explains the offer and drives the unlock CTA.
 *
 * Layout note: the unlock card sits in normal flow so it always defines the
 * container height — the card can never be clipped. The blurred preview is
 * absolutely positioned to fill behind it.
 */
const LockedOverlay: React.FC<LockedOverlayProps> = ({
  children,
  title,
  description,
  features = [],
  icon,
  ctaLabel,
  onUnlock,
  note,
  gradientFrom = '#f59e0b',
  gradientTo = '#ec4899',
}) => {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm">
      {/* Real content — visible but blurred, dimmed, and inert. Fills behind the card. */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden blur-[6px] saturate-[0.85]"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Legibility wash over the preview. */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/85 to-white" aria-hidden="true" />

      {/* Unlock card — in normal flow, so it defines the height (never clipped). */}
      <div className="relative flex items-center justify-center px-6 py-14 sm:py-16">
        <div className="w-full max-w-md text-center">
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            {icon ?? <Lock className="h-8 w-8 text-white" />}
          </div>

          <h3 className="mb-2 font-serif text-2xl text-gray-900">{title}</h3>
          <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-gray-600">{description}</p>

          {features.length > 0 && (
            <ul className="mx-auto mb-7 inline-flex max-w-xs flex-col gap-2.5 text-left">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div>
            <button
              type="button"
              onClick={onUnlock}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {note && <p className="mt-4 text-xs text-gray-400">{note}</p>}
        </div>
      </div>
    </div>
  );
};

export default LockedOverlay;
