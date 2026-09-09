import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shirt,
  BookOpen,
  Briefcase,
  Zap,
  Home,
  HeartHandshake,
  Palette,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { GUIDE_CATEGORY_SLUGS, guideCategoryPath, type GuideCategorySlug } from '@/lib/guideCategoryRoutes';
import { Sparkles } from 'lucide-react';
import LockedOverlay from './LockedOverlay';

const META: Record<
  GuideCategorySlug,
  { label: string; description: string; icon: React.ReactNode; cardClass: string }
> = {
  style: {
    label: 'Style',
    description: 'Hair color, jewelry, makeup, nails, and wardrobe rituals aligned with your elemental coloring.',
    icon: <Shirt className="w-7 h-7 text-rose-600" />,
    cardClass: 'from-rose-50 to-white border-rose-200/70',
  },
  philosophy: {
    label: 'Philosophy',
    description: 'Essence, philosophies, compass, mantras, blessings, purpose, and the ultimate goal of your type.',
    icon: <BookOpen className="w-7 h-7 text-indigo-600" />,
    cardClass: 'from-indigo-50 to-white border-indigo-200/70',
  },
  career: {
    label: 'Career',
    description: 'Careers, work environments, leadership, teams, communication, and conflict style at work.',
    icon: <Briefcase className="w-7 h-7 text-emerald-600" />,
    cardClass: 'from-emerald-50 to-white border-emerald-200/70',
  },
  growth: {
    label: 'Growth',
    description: 'Resolutions, core lessons, blocks, imbalance patterns, and biorhythms for sustainable integration.',
    icon: <Zap className="w-7 h-7 text-red-600" />,
    cardClass: 'from-red-50 to-white border-red-200/70',
  },
  living: {
    label: 'Living',
    description: 'Decor, habitat, hobbies, and nutrition—daily life tuned to your elemental nature.',
    icon: <Home className="w-7 h-7 text-teal-600" />,
    cardClass: 'from-teal-50 to-white border-teal-200/70',
  },
  relationships: {
    label: 'Relationships',
    description: 'Love languages, partnership dynamics, and friendship compatibility across the 16 subtypes.',
    icon: <HeartHandshake className="w-7 h-7 text-pink-600" />,
    cardClass: 'from-pink-50 to-white border-pink-200/70',
  },
  arts: {
    label: 'Arts',
    description: 'Cinematic resonance and artistic correspondence—creative language for your fusion.',
    icon: <Palette className="w-7 h-7 text-violet-600" />,
    cardClass: 'from-violet-50 to-white border-violet-200/70',
  },
};

export interface ElementalGuidesGatewayProps {
  /** When false, the guide library is gated behind the workshop unlock. */
  hasWorkshopAccess?: boolean;
  /** Triggered from the locked overlay (sign-in or workshop purchase). */
  onUnlock?: () => void;
}

const ElementalGuidesGateway: React.FC<ElementalGuidesGatewayProps> = ({
  hasWorkshopAccess = false,
  onUnlock,
}) => {
  const cardsGrid = (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {GUIDE_CATEGORY_SLUGS.map((slug) => {
        const m = META[slug];
        return (
          <Link
            key={slug}
            to={guideCategoryPath(slug)}
            className={`group flex flex-col rounded-2xl border bg-gradient-to-br ${m.cardClass} p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 shadow-sm">
              {m.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{m.label}</h3>
            <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{m.description}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
              Open guides
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <section id="pro-guides" className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full shadow-sm mb-6">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Workshop members</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Guides</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Deep-dive libraries—choose a theme to open every guide in that collection on its own page.
          </p>
        </div>

        {hasWorkshopAccess ? (
          cardsGrid
        ) : (
          <LockedOverlay
            title="Explore the Elemental Guides"
            description="For all 16 subtypes. 35 guides. Interactive tools. 7 libraries"
            icon={<Sparkles className="h-7 w-7 text-white" />}
            ctaLabel="Reveal the whole map"
            note="Included with Elemental Color Workshop"
            gradientFrom="#f59e0b"
            gradientTo="#ec4899"
            onUnlock={() => onUnlock?.()}
          >
            {cardsGrid}
          </LockedOverlay>
        )}
      </div>
    </section>
  );
};

export default ElementalGuidesGateway;
