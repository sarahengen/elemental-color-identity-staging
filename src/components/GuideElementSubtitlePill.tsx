import React from 'react';
import { cn } from '@/lib/utils';

export interface GuideElementSubtitlePillProps {
  gradientFrom: string;
  gradientTo: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Horizontal gradient label under the element title (Spiritual Essence reference style).
 */
const GuideElementSubtitlePill: React.FC<GuideElementSubtitlePillProps> = ({
  gradientFrom,
  gradientTo,
  children,
  className = '',
}) => (
  <div
    className={cn(
      'mt-2 inline-flex max-w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm',
      className
    )}
    style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
  >
    <span className="leading-snug">{children}</span>
  </div>
);

export default GuideElementSubtitlePill;
