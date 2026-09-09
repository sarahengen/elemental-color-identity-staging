import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Scissors,
  BookOpen,
  Briefcase,
  TrendingUp,
  Home,
  Heart,
  Music,
  type LucideIcon,
} from 'lucide-react';
import {
  GUIDE_CATEGORY_SLUGS,
  guideCategoryPath,
  type GuideCategorySlug,
} from '@/lib/guideCategoryRoutes';

interface GuideCrossPillarLinksProps {
  currentCategory: GuideCategorySlug;
  className?: string;
}

const PILLAR_META: Record<
  GuideCategorySlug,
  {
    label: string;
    description: string;
    icon: LucideIcon;
    gradientFrom: string;
    gradientTo: string;
  }
> = {
  style: {
    label: 'Style',
    description: 'Hair, jewelry, wardrobe review & your color story',
    icon: Scissors,
    gradientFrom: '#FB923C',
    gradientTo: '#FDBA74',
  },
  philosophy: {
    label: 'Philosophy',
    description: 'Essence, philosophies, compass, mantras, blessings & purpose',
    icon: BookOpen,
    gradientFrom: '#7C3AED',
    gradientTo: '#A78BFA',
  },
  career: {
    label: 'Career growth',
    description: 'Careers, work culture, teams, communication & conflict',
    icon: Briefcase,
    gradientFrom: '#2563EB',
    gradientTo: '#7C3AED',
  },
  growth: {
    label: 'Growth',
    description: 'Resolutions, core lessons, blocks, imbalance patterns & biorhythms',
    icon: TrendingUp,
    gradientFrom: '#059669',
    gradientTo: '#34D399',
  },
  living: {
    label: 'Living',
    description: 'Decor, habitat, hobbies & nutrition',
    icon: Home,
    gradientFrom: '#D97706',
    gradientTo: '#FBBF24',
  },
  relationships: {
    label: 'Relationships',
    description: 'Love languages, partnership dynamics & friendship compatibility',
    icon: Heart,
    gradientFrom: '#DC2626',
    gradientTo: '#F87171',
  },
  arts: {
    label: 'Arts',
    description: 'Cinematic resonance & artistic correspondence',
    icon: Music,
    gradientFrom: '#0891B2',
    gradientTo: '#67E8F9',
  },
};

const GuideCrossPillarLinks: React.FC<GuideCrossPillarLinksProps> = ({
  currentCategory,
  className = '',
}) => {
  const ordered: GuideCategorySlug[] = [
    currentCategory,
    ...GUIDE_CATEGORY_SLUGS.filter((s) => s !== currentCategory),
  ];

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center sm:text-left">
        More workshop guides
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {ordered.map((slug) => {
          const meta = PILLAR_META[slug];
          const Icon = meta.icon;
          const isCurrent = slug === currentCategory;

          const inner = (
            <>
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={
                  isCurrent
                    ? {
                        background:
                          'linear-gradient(90deg, #FB923C 0%, #F472B6 45%, #38BDF8 100%)',
                      }
                    : {
                        background: `linear-gradient(90deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
                      }
                }
              />
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-2 shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${meta.gradientFrom}, ${meta.gradientTo})`,
                }}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <h3 className="text-sm font-serif font-semibold text-gray-900 leading-tight mb-1 pr-6">
                {meta.label}
              </h3>
              {isCurrent ? (
                <span className="text-[11px] text-gray-500 leading-tight">You&apos;re here</span>
              ) : (
                <span
                  className="inline-flex items-center gap-0.5 text-xs font-medium"
                  style={{ color: meta.gradientFrom }}
                >
                  Go
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
              {isCurrent ? (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-sky-100 text-sky-900 text-[9px] font-bold rounded-full uppercase">
                  Current
                </span>
              ) : (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-[9px] font-bold rounded-full uppercase">
                  Guide
                </span>
              )}
            </>
          );

          const shellClass = isCurrent
            ? 'relative flex-shrink-0 snap-start w-[148px] sm:w-[160px] rounded-xl border-2 border-sky-200/90 bg-white p-3 shadow-sm text-left'
            : 'group relative flex-shrink-0 snap-start w-[148px] sm:w-[160px] rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-left';

          if (isCurrent) {
            return (
              <div
                key={slug}
                className={shellClass}
                aria-current="page"
                role="region"
                aria-label={`${meta.label} guide (current)`}
                title={meta.description}
              >
                {inner}
              </div>
            );
          }

          return (
            <Link
              key={slug}
              to={guideCategoryPath(slug)}
              className={shellClass}
              aria-label={`Open ${meta.label} guide`}
              title={meta.description}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GuideCrossPillarLinks;
