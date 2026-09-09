import React from 'react';
import { Users, GitCompare, Droplets, Compass, Crown, Sparkles } from 'lucide-react';
import { elementalTypes, ElementalType } from '@/data/elementalTypes';
import DominantElementQuiz from './DominantElementQuiz';
import CelebrityGallery from './CelebrityGallery';
import ComparisonTool from './ComparisonTool';
import ColorPalette from './ColorPalette';
import ElementalColorWheel from './ElementalColorWheel';
import PremiumGate from './PremiumGate';

export interface ElementalGallerySectionsProps {
  isPremiumMember: () => boolean;
  userElement: string | null;
  userSubtype: string | null;
  onStartFullQuiz: () => void;
  onStartSubtypeQuiz?: () => void;
  onSelectType: (type: ElementalType) => void;
  onUpgrade: () => void;
}

const ElementalGallerySections: React.FC<ElementalGallerySectionsProps> = ({
  isPremiumMember,
  userElement,
  userSubtype,
  onStartFullQuiz,
  onStartSubtypeQuiz,
  onSelectType,
  onUpgrade,
}) => {
  const premium = isPremiumMember();
  const userType = userElement ? elementalTypes.find((t) => t.id === userElement) : null;

  return (
    <>
      <section
        id="dominant-element"
        className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50"
      >
        <div className="max-w-3xl mx-auto">
          <DominantElementQuiz onStartFullQuiz={onStartFullQuiz} />
        </div>
      </section>

      <section
        id="celebrities"
        className="py-20 px-6 bg-gradient-to-br from-rose-50 via-amber-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Users className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Famous Faces</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore celebrities, historical figures, and fictional characters across all elemental types.
              Find your celebrity twin and get styling inspiration from famous faces who share your coloring.
            </p>
          </div>

          {premium ? (
            <CelebrityGallery
              userElement={userElement}
              userSubtype={userSubtype}
              onStartQuiz={onStartFullQuiz}
            />
          ) : (
            <PremiumGate
              title="Unlock Celebrity Gallery & Twin Finder"
              description="Discover which celebrities share your elemental coloring and get styling inspiration from famous faces."
              features={[
                'Browse celebrities by elemental type',
                'Find your celebrity color twin',
                'Get styling inspiration from famous faces',
                'Explore historical figures and fictional characters',
                'Search by name or filter by category',
              ]}
              icon={<Users className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#a855f7"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section
        id="compare"
        className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <GitCompare className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Compare Elemental Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how different elemental types compare side by side. Explore color palettes, characteristics, and find
              the perfect combinations for couples, friends, or teams—including opposites.
            </p>
          </div>

          {premium ? (
            <ComparisonTool />
          ) : (
            <PremiumGate
              title="Unlock Type Comparison Tool"
              description="Compare elemental types side by side to understand color harmonies and find complementary palettes."
              features={[
                'Side-by-side type comparison',
                'Color palette harmony analysis',
                'Complementary type suggestions',
                'Perfect for couples and teams',
                'Discover type compatibility',
              ]}
              icon={<GitCompare className="w-4 h-4 text-white" />}
              gradientFrom="#6366f1"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section
        id="color-palette"
        className="py-20 px-6 bg-gradient-to-br from-teal-50 via-white to-cyan-50 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Droplets className="w-5 h-5 text-teal-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Color Palette</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Color Palette per element and subtype.
            </p>
          </div>

          {premium ? (
            userType ? (
              <ColorPalette type={userType} subtype={userSubtype} />
            ) : (
              <div className="text-center rounded-2xl border border-teal-100 bg-white p-10 shadow-sm">
                <p className="text-gray-600 mb-6">
                  Take the quiz to unlock your personal color palette for your elemental type.
                </p>
                <button
                  type="button"
                  onClick={onStartFullQuiz}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Find My Element
                </button>
              </div>
            )
          ) : (
            <PremiumGate
              title="Unlock Your Color Palette"
              description="See the colors that flatter your element and subtype."
              features={[
                'Personal palette by element and subtype',
                'Copy hex codes instantly',
                'Browse all subtype variations',
                'Download your palette',
              ]}
              icon={<Droplets className="w-4 h-4 text-white" />}
              gradientFrom="#14b8a6"
              gradientTo="#06b6d4"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section
        id="color-wheel"
        className="py-20 px-6 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Compass className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Color Compass</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Navigate all 16 subtypes on the elemental color wheel and see exactly where you sit in the spectrum.
            </p>
          </div>

          {premium ? (
            <>
              <ElementalColorWheel
                userElement={userElement}
                userSubtype={userSubtype}
                onSelectType={(type) => onSelectType(type)}
                onSelectSubtype={(type) => onSelectType(type)}
              />

              {!userElement && (
                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-4">
                    Take the quiz to discover your position on the elemental color wheel
                  </p>
                  <button
                    type="button"
                    onClick={onStartFullQuiz}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    Find My Element
                  </button>
                </div>
              )}

              {userElement && !userSubtype && onStartSubtypeQuiz && (
                <div className="mt-12 text-center">
                  <p className="text-gray-600 mb-4">
                    You&apos;ve discovered your element! Take the subtype quiz to find your exact position on the wheel.
                  </p>
                  <button
                    type="button"
                    onClick={onStartSubtypeQuiz}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    Find My Subtype
                  </button>
                </div>
              )}
            </>
          ) : (
            <PremiumGate
              title="Unlock the Color Compass"
              description="Navigate all 16 subtypes on the elemental color wheel."
              features={[
                'Interactive 16-subtype color wheel',
                'See your exact position',
                'Explore neighboring types',
                'Share your wheel position',
              ]}
              icon={<Compass className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#ec4899"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default ElementalGallerySections;
