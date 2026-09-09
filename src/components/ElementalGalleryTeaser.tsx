import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, GitCompare, Droplets, Compass, ArrowRight, Crown } from 'lucide-react';
import { elementalGalleryPath } from '@/lib/guideCategoryRoutes';
import LockedOverlay from './LockedOverlay';

export interface ElementalGalleryTeaserProps {
  hasWorkshopAccess?: boolean;
  onUnlock?: () => void;
}

const ElementalGalleryTeaser: React.FC<ElementalGalleryTeaserProps> = ({
  hasWorkshopAccess = false,
  onUnlock,
}) => {
  const cards = [
    {
      hash: 'dominant-element' as const,
      title: 'Dominant Element Quiz',
      description:
        'Quick quiz and the full quiz—find your dominant element and subtype, then see how it shows up in color and style.',
      icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      accent: 'from-amber-100 to-orange-50 border-amber-200/80',
    },
    {
      hash: 'celebrities' as const,
      title: 'Famous Faces & Celebrity Twin',
      description:
        'Browse celebrities and characters by type and find your celebrity color twin for styling inspiration.',
      icon: <Users className="w-8 h-8 text-rose-600" />,
      accent: 'from-rose-100 to-fuchsia-50 border-rose-200/80',
    },
    {
      hash: 'compare' as const,
      title: 'Compare Types & Opposites',
      description:
        'Side-by-side comparisons, harmonies, and opposites—perfect for couples, friends, and creative pairing.',
      icon: <GitCompare className="w-8 h-8 text-indigo-600" />,
      accent: 'from-indigo-100 to-violet-50 border-indigo-200/80',
    },
    {
      hash: 'color-palette' as const,
      title: 'Color Palette',
      description: 'Color Palette per element and subtype.',
      icon: <Droplets className="w-8 h-8 text-teal-600" />,
      accent: 'from-teal-100 to-cyan-50 border-teal-200/80',
    },
    {
      hash: 'color-wheel' as const,
      title: 'Color Compass',
      description:
        'Navigate all 16 subtypes on the elemental color wheel and see exactly where you sit in the spectrum.',
      icon: <Compass className="w-8 h-8 text-violet-600" />,
      accent: 'from-violet-100 to-fuchsia-50 border-violet-200/80',
    },
  ];

  const galleryContent = (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link
            key={card.hash}
            to={elementalGalleryPath(card.hash)}
            className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br ${card.accent} p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/90 shadow-sm">
              {card.icon}
            </div>
            <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:text-gray-950">{card.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">{card.description}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
              Open in gallery
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to={elementalGalleryPath()}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
        >
          View full Elemental Gallery
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  );

  return (
    <section
      id="elemental-gallery"
      className="py-20 px-6 bg-gradient-to-br from-stone-50 via-white to-amber-50/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-amber-100 mb-6">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-800">Workshop members</span>
            <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white">
              Workshop
            </span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Gallery</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Quiz paths, famous faces, type comparisons, your palette, and the color compass—all in one place for
            Workshop members. Tap a card to open the full gallery page.
          </p>
        </div>

        {hasWorkshopAccess ? (
          galleryContent
        ) : (
          <LockedOverlay
            title="Explore the Elemental Gallery"
            description="All 16 subtypes. Dominant element quiz. Famous faces. Celebrity Color Twin. Comparisons. Palette & Color Compass."
            icon={<Sparkles className="h-7 w-7 text-white" />}
            ctaLabel="Go Deeper"
            note="Included with Elemental Color Workshop"
            gradientFrom="#f59e0b"
            gradientTo="#ec4899"
            onUnlock={() => onUnlock?.()}
          >
            {galleryContent}
          </LockedOverlay>
        )}
      </div>
    </section>
  );
};

export default ElementalGalleryTeaser;
