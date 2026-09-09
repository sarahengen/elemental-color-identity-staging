import React, { forwardRef } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import {
  giftCardDefaultColors,
  giftCardElementColors,
  giftCardTextClass,
} from '@/lib/giftCardThemes';

interface GiftCardPreviewProps {
  recipientName: string;
  senderName: string;
  personalMessage: string;
  planName: string;
  elementalType: string | null;
  giftCode?: string;
  /** Small label under the brand name. Defaults to "Gift Membership". */
  subtitle?: string;
  /** Optional quiz invite link shown on the card (for downloadable free-quiz gifts). */
  quizLink?: string;
  /** Compact layout for tight modals. */
  compact?: boolean;
}

const GiftCardPreview = forwardRef<HTMLDivElement, GiftCardPreviewProps>(({
  recipientName,
  senderName,
  personalMessage,
  planName,
  elementalType,
  giftCode,
  subtitle = 'Gift Membership',
  quizLink,
  compact = false,
}, ref) => {
  const colors = elementalType ? giftCardElementColors[elementalType] || giftCardDefaultColors : giftCardDefaultColors;
  const elementName = elementalType ? elementalType.charAt(0).toUpperCase() + elementalType.slice(1) : null;
  const light = colors.lightBackground;
  const tx = (tone: Parameters<typeof giftCardTextClass>[1]) => giftCardTextClass(light, tone);
  const decorFill = light ? '#374151' : 'white';

  return (
    <div className={`relative w-full mx-auto ${compact ? 'max-w-sm' : 'max-w-md'}`}>
      {/*
        Height follows content (no fixed aspect-ratio). Fixed aspect + overflow-hidden
        was clipping serif descenders and the personal message in html2canvas exports.

        Ref attaches to the visual card (not this mx-auto wrapper). Capturing the wrapper
        inlined computed centering margins into the PNG and clipped the right edge.
      */}
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} shadow-xl`}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: colors.pattern }}
        />

        <div className="absolute top-0 right-0 w-28 h-28 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill={decorFill}>
            <circle cx="80" cy="20" r="40" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" fill={decorFill}>
            <circle cx="20" cy="80" r="30" />
          </svg>
        </div>

        <div
          className={`relative z-10 flex flex-col ${compact ? 'gap-3 p-4' : 'gap-4 p-5 sm:p-6'}`}
          style={{ lineHeight: 1.35 }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`shrink-0 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg ${compact ? 'w-7 h-7' : 'w-8 h-8'}`}>
                <Sparkles className={compact ? 'w-3.5 h-3.5 text-white' : 'w-4 h-4 text-white'} />
              </div>
              <div className="min-w-0">
                <p className={`${tx('secondary')} text-[10px] sm:text-xs font-medium tracking-wider uppercase truncate`}>
                  Elemental Color Identity
                </p>
                <p className={`${tx('muted')} text-[10px] leading-normal opacity-80`}>{subtitle}</p>
              </div>
            </div>
            <div className={`shrink-0 px-2.5 py-1 rounded-full bg-gradient-to-r ${colors.gradient} shadow-lg`}>
              <span className="text-white text-[10px] sm:text-xs font-bold">{planName}</span>
            </div>
          </div>

          <div className="text-center px-1">
            <Gift className={`${tx('subtle')} mx-auto ${compact ? 'w-5 h-5 mb-0.5' : 'w-6 h-6 mb-1'}`} />
            <p className={`${tx('faint')} text-[10px] uppercase tracking-widest mb-0.5 leading-normal`}>
              A Gift For
            </p>
            <p
              className={`${tx('primary')} font-serif leading-normal ${compact ? 'text-base' : 'text-lg sm:text-xl'}`}
              style={{ overflow: 'visible', paddingBottom: 2 }}
            >
              {recipientName || 'Recipient Name'}
            </p>
            {personalMessage && (
              <p
                className={`${tx('muted')} text-xs mt-1 italic leading-normal max-w-[260px] mx-auto`}
                style={{ overflow: 'visible', paddingBottom: 2 }}
              >
                &ldquo;{personalMessage}&rdquo;
              </p>
            )}
          </div>

          <div className="flex items-end justify-between gap-3 pt-1">
            <div className="min-w-0 flex-1">
              <p className={`${tx('faint')} text-[10px] uppercase tracking-wider leading-normal`}>From</p>
              <p
                className={`${tx('secondary')} text-sm font-medium leading-normal truncate`}
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', paddingBottom: 2 }}
              >
                {senderName || 'Your Name'}
              </p>
              {quizLink && (
                <p className={`${tx('link')} text-[9px] font-mono mt-1 break-all leading-snug`}>
                  {quizLink}
                </p>
              )}
            </div>
            <div className="text-right shrink-0 pb-0.5">
              {elementName && (
                <div className="flex items-center gap-1 justify-end">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <p className={`${tx('muted')} text-[10px] uppercase tracking-wider leading-normal opacity-80`}>
                    {elementName} Element
                  </p>
                </div>
              )}
              {giftCode && (
                <p className={`${tx('code')} text-xs font-mono tracking-wider mt-0.5`}>{giftCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GiftCardPreview.displayName = 'GiftCardPreview';

export default GiftCardPreview;
