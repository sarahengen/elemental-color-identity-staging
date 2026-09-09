import React from 'react';
import type { User } from '@supabase/supabase-js';
import {
  Scissors,
  Gem,
  Shirt,
  Sun,
  BookOpen,
  Calendar,
  MessageCircle,
  Gift,
  Target,
  Sparkles,
  Briefcase,
  Building2,
  Zap,
  Shield,
  Users,
  Mail,
  Swords,
  GraduationCap,
  Lock,
  Activity,
  Clock,
  Home,
  TreePine,
  Apple,
  Heart,
  HeartHandshake,
  HandHeart,
  Film,
  Palette,
  Crown,
  Flame,
  Compass,
  Smile,
  Brush,
} from 'lucide-react';
import type { GuideCategorySlug } from '@/lib/guideCategoryRoutes';
import type { SavedHairColor } from './HairColorGuide';
import HairColorGuide from './HairColorGuide';
import JewelryAccessoriesGuide from './JewelryAccessoriesGuide';
import MakeupGuide from './MakeupGuide';
import NailColorGuide from './NailColorGuide';
import ElementalWardrobeReview from './ElementalWardrobeReview';
import SpiritualEssenceGuide from './SpiritualEssenceGuide';
import ElementalPhilosophies from './ElementalPhilosophies';
import ElementalMantras from './ElementalMantras';


import ElementalNewYearResolutions from './ElementalNewYearResolutions';
import ElementalCompass from './ElementalCompass';
import ElementalBlessings from './ElementalBlessings';
import UltimateElementalGoal from './UltimateElementalGoal';
import ElementalLifePurpose from './ElementalLifePurpose';
import CareerAttractions from './CareerAttractions';
import IdealWorkEnvironment from './IdealWorkEnvironment';
import ElementalSecretSauce from './ElementalSecretSauce';
import ElementalLeadershipStyles from './ElementalLeadershipStyles';
import ElementalTeamDynamics from './ElementalTeamDynamics';
import ElementalCommunicationStyles from './ElementalCommunicationStyles';
import ElementalConflictStyles from './ElementalConflictStyles';
import ElementalLesson from './ElementalLesson';
import ElementalBlocks from './ElementalBlocks';
import ElementalImbalance from './ElementalImbalance';
import ElementalBiorhythms from './ElementalBiorhythms';
import ElementalHealing from './ElementalHealing';

import DecorEnvironmentGuide from './DecorEnvironmentGuide';
import ElementalHabitat from './ElementalHabitat';
import ElementalHobbies from './ElementalHobbies';
import ElementalNutrition from './ElementalNutrition';
import ElementalLoveLanguages from './ElementalLoveLanguages';
import ElementalRelationships from './ElementalRelationships';
import ElementalFriendshipCompatibility from './ElementalFriendshipCompatibility';
import FriendGroupCommonElement from './FriendGroupCommonElement';

import CinematicPreferences from './CinematicPreferences';
import ArtisticCorrespondence from './ArtisticCorrespondence';
import PremiumGate from './PremiumGate';


export interface ElementalGuideCategorySectionsProps {
  category: GuideCategorySlug;
  isPremiumMember: () => boolean;
  userElement: string | null;
  userSubtype: string | null;
  user: User | null;
  savedHairColors: SavedHairColor[];
  onSaveHairColor: (color: SavedHairColor) => void | Promise<void>;
  onRemoveHairColor: (colorId: string) => void | Promise<void>;
  onStartQuiz: () => void;
  onUpgrade: () => void;
}

const ElementalGuideCategorySections: React.FC<ElementalGuideCategorySectionsProps> = ({
  category,
  isPremiumMember,
  userElement,
  userSubtype,
  user,
  savedHairColors,
  onSaveHairColor,
  onRemoveHairColor,
  onStartQuiz,
  onUpgrade,
}) => {
  const premium = isPremiumMember();

  const styleSections = (
    <>
      <section id="hair-color" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Scissors className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Hair Color</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover which hair dye colors will complement your elemental type and make your natural coloring shine.
              Organized by element and subtype for personalized recommendations.
            </p>
          </div>
          {premium ? (
            <HairColorGuide
              userElement={userElement}
              userSubtype={userSubtype}
              user={user}
              savedHairColors={savedHairColors}
              onSaveColor={onSaveHairColor}
              onRemoveColor={onRemoveHairColor}
            />
          ) : (
            <PremiumGate
              title="Hair Color Recommendations"
              description="Get personalized hair color recommendations based on your elemental type and undertone."
              features={[
                'Curated hair colors for each elemental subtype',
                'Warm, cool, and neutral undertone guidance',
                'Save your favorite colors to your profile',
                'Professional salon color formulas',
                'Before & after visualization tips',
              ]}
              icon={<Scissors className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#ec4899"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="jewelry" className="py-20 px-6 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Gem className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Jewelry</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover which metals, gemstones, and accessory colors complement your elemental type.
            </p>
          </div>
          {premium ? (
            <JewelryAccessoriesGuide embedInGuideHub userElement={userElement || undefined} userSubtype={userSubtype || undefined} />
          ) : (
            <PremiumGate
              title="Jewelry & Accessories Guide"
              description="Find the perfect metals, gemstones, and accessories that complement your natural coloring."
              features={[
                'Gold, silver, and rose gold recommendations',
                'Gemstone guide for your undertone',
                'Delicate vs statement jewelry styles',
                'Accessory color matching',
                'Watch and eyewear suggestions',
              ]}
              icon={<Gem className="w-4 h-4 text-white" />}
              gradientFrom="#ec4899"
              gradientTo="#f59e0b"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="wardrobe-review" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Shirt className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Wardrobe Review</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A ritual of elemental realignment—discover the unique wardrobe review process tailored to your element&apos;s
              mode of interaction with the material world.
            </p>
          </div>
          {premium ? (
            <ElementalWardrobeReview embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Wardrobe Review"
              description="Discover your element's unique approach to curating a wardrobe that truly resonates with your nature."
              features={[
                'Element-specific wardrobe review processes',
                'REFUEL (Fire), DISTILL (Water), UNEARTH (Earth), BREATHE INTO (Air)',
                'Subtype-specific guidance for all 16 types',
                'Core mantras and primary questions',
                'Three-pile sorting systems tailored to your element',
              ]}
              icon={<Shirt className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#f97316"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="makeup" className="py-20 px-6 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Smile className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Makeup</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the eyeshadow, lipstick, blush, and foundation shades that flatter your elemental coloring &mdash;
              with curated product recommendations for your subtype.
            </p>
          </div>
          {premium ? (
            <MakeupGuide embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Makeup Guide & Shop"
              description="Get personalized makeup color recommendations and shop curated products for your coloring."
              features={[
                'Eyeshadow, lipstick, blush & foundation colors',
                'Foundation undertone and shade guidance',
                'Curated product recommendations to shop',
                'Expert makeup tips for your subtype',
                'Personalized for all 16 elemental subtypes',
              ]}
              icon={<Smile className="w-4 h-4 text-white" />}
              gradientFrom="#ec4899"
              gradientTo="#d946ef"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="nails" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Brush className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Nail Color</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the polish shades, finishes, and nail art styles that harmonize with your elemental type &mdash;
              from everyday neutrals to special-occasion statements.
            </p>
          </div>
          {premium ? (
            <NailColorGuide embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Nail Color Guide"
              description="Discover nail polish shades and nail art styles that harmonize with your elemental type."
              features={[
                'Everyday neutrals and bold statement shades',
                'Seasonal and special-occasion picks',
                'Recommended finishes for your coloring',
                'Nail art ideas by difficulty level',
                'Personalized for all 16 elemental subtypes',
              ]}
              icon={<Brush className="w-4 h-4 text-white" />}
              gradientFrom="#f472b6"
              gradientTo="#c084fc"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  const philosophySections = (
    <>
      <section id="spiritual-essence" className="py-20 px-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Sun className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Essence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the deeper spiritual meaning behind your elemental type. Discover your soul&apos;s purpose, lessons,
              and practices for connecting with your elemental essence.
            </p>
          </div>
          {premium ? (
            <SpiritualEssenceGuide embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Spiritual Essence Guide"
              description="Discover the deeper spiritual meaning and practices associated with your elemental type."
              features={[
                'Spiritual essence for all 16 subtypes',
                'Soul purpose and life lessons',
                'Elemental practices and rituals',
                'Principle of each element',
                'Integration guidance for daily life',
              ]}
              icon={<Sun className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="philosophies" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Philosophy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the lived philosophy of your elemental type—a way of being, perceiving, and interacting with
              reality that defines your unique function in the world.
            </p>
          </div>
          {premium ? (
            <ElementalPhilosophies embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Philosophies"
              description="Understand your elemental type as a lived philosophy with core tenets and ethical imperatives."
              features={[
                'Philosophy for all 16 subtypes',
                'Core tenets for each element combination',
                'Ethical imperatives and life purpose',
                'Understanding your unique function',
                'Guidance for living your philosophy',
              ]}
              icon={<BookOpen className="w-4 h-4 text-white" />}
              gradientFrom="#6366f1"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="compass" className="py-20 px-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Compass className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Compass</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore how each subtype is oriented on the elemental compass—directions as soul geography, with Compare
              Directions to see how two types relate.
            </p>
          </div>
          {premium ? (
            <ElementalCompass embedded />
          ) : (
            <PremiumGate
              title="Elemental Compass"
              description="Navigate sixteen orientations on the compass, read full directional meaning for each subtype, and compare two directions side by side."
              features={[
                'Interactive compass dial with Spiritual Essence color harmony',
                'Subtype meaning, orientation, shadow, and affirmation',
                'Compare Directions: angular relationship between any two subtypes',
                'Cardinal reference for Fire, Water, Earth, and Air',
                'Sacred geography and quadrant reference',
              ]}
              icon={<Compass className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="mantras" className="py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Flame className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Mantras</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The four sacred imperatives — To Burn, To Flow, To Think, To Grow — and the subtype archetypes each elemental fusion carries as its invocation of purpose.
            </p>
          </div>
          {premium ? (
            <ElementalMantras userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Mantras"
              description="Discover the four sacred imperatives and the subtype archetypes each elemental fusion carries as its invocation of purpose."
              features={[
                'The four imperatives: To Burn, To Flow, To Think, To Grow',
                'Shadow of each imperative and balance guidance',
                'A Ritual of Wholeness with all four elements',
                'Fire & Water subtype archetypes with meditations',
                'Air & Earth subtypes coming soon',
              ]}
              icon={<Flame className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>


      <section id="blessings" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Gift className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Blessings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the unique blessing you bring to the world when you are fully realized and &quot;in your
              element.&quot;
            </p>
          </div>
          {premium ? (
            <ElementalBlessings embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Blessings"
              description="Discover how you bless and contribute to the whole when fully realized in your element."
              features={[
                'Blessings for all 16 subtypes',
                'Understanding your unique contribution',
                'How you serve the whole',
                'Your gift to the world',
                'Click-to-reveal blessing discovery',
              ]}
              icon={<Gift className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#d946ef"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="ultimate-goal" className="py-20 px-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Target className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Ultimate Goal</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover your highest potential and unique form of wholeness. The goal is not to change your nature, but to
              fulfill it completely.
            </p>
          </div>
          {premium ? (
            <UltimateElementalGoal embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Ultimate Elemental Goal"
              description="Discover your highest potential and the unique form of wholeness your elemental nature seeks."
              features={[
                'Ultimate goals for all 16 subtypes',
                'Understanding your highest potential',
                'Your unique form of wholeness',
                'Fulfilling your elemental nature',
                'Guidance for achieving your purpose',
              ]}
              icon={<Target className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="life-purpose" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Life Purpose</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The spiritual calling of each subtype. Not your job. Not your role. Not what you do. Your spiritual purpose
              is what your soul came here to learn, to embody, and to offer.
            </p>
          </div>
          {premium ? (
            <ElementalLifePurpose embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Life Purpose"
              description="Discover the spiritual calling of your elemental subtype—what your soul came here to learn, embody, and offer."
              features={[
                'Spiritual purpose for all 16 subtypes',
                'Your unique gift and soul assignment',
                'The deeper meaning behind your element combination',
                'One-sentence life purpose distillation',
                'Interactive element and subtype exploration',
              ]}
              icon={<Sparkles className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  const careerSections = (
    <>
      <section id="careers" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Career</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the careers and professional environments where your elemental energy naturally thrives.
            </p>
          </div>
          {premium ? (
            <CareerAttractions embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Career Attractions"
              description="Discover careers where your elemental energy can be expressed, validated, and exchanged."
              features={[
                'Career recommendations for all 16 subtypes',
                'Understanding why certain careers attract you',
                'Element-specific professional environments',
                'Role types that match your energy',
                'Guidance for career alignment',
              ]}
              icon={<Briefcase className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#f97316"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="work-environment" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Building2 className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Work Environment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the work environment that amplifies your elemental gifts rather than suffocating them.
            </p>
          </div>
          {premium ? (
            <IdealWorkEnvironment embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Ideal Work Environment"
              description="Discover the work environment that is oxygen for your elemental nature—where your gifts are amplified, not suffocated."
              features={[
                'Ideal work environments for all 16 subtypes',
                'Named environment archetypes (The Arena, The Laboratory, The Sanctuary, etc.)',
                'Specific cultures and organizations where you thrive',
                'Environments to avoid that drain your energy',
                'Element-specific workplace guidance',
              ]}
              icon={<Building2 className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#f97316"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="secret-sauce" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Secret Sauce</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understand the specific, inherent gift you bring to a professional ecosystem and learn to deploy it
              consciously, without dilution or apology.
            </p>
          </div>
          {premium ? (
            <ElementalSecretSauce embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Secret Sauce"
              description="Discover the specific gift you bring to a professional ecosystem and the impression you naturally create."
              features={[
                'Secret sauce for all 16 subtypes',
                'Your unique workplace impression',
                'Understanding your inherent professional gift',
                'How others perceive your contribution',
                'Deploying your gift consciously and without apology',
              ]}
              icon={<Zap className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="leadership-styles" className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Leadership Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental type naturally leads—your default leadership approach, your blind spots, and how
              to develop your leadership capacity without betraying your nature.
            </p>
          </div>
          {premium ? (
            <ElementalLeadershipStyles embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Leadership Styles"
              description="Explore how each of the 16 subtypes naturally leads, their blind spots as leaders, and practical advice for developing authentic leadership capacity."
              features={[
                'Leadership styles for all 16 subtypes',
                'Default leadership approach for your type',
                'Blind spots and shadow patterns as a leader',
                'Practical development path for growth',
                'Real-world leadership scenarios',
                'Actionable advice for management roles',
              ]}
              icon={<Shield className="w-4 h-4 text-white" />}
              gradientFrom="#6366f1"
              gradientTo="#3b82f6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="team-dynamics" className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Users className="w-5 h-5 text-teal-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Team Dynamic</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental subtype interacts in team settings—your natural team role, collaboration
              patterns, friction points, and strategies for building high-performing elemental teams.
            </p>
          </div>
          {premium ? (
            <ElementalTeamDynamics embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Team Dynamics"
              description="Explore how each of the 16 subtypes interacts in team settings, with a team composition analyzer for chemistry reports."
              features={[
                'Natural team role for all 16 subtypes',
                'Collaboration patterns with each element',
                'Friction points between specific subtype pairings',
                'Strategies for building high-performing elemental teams',
                'Interactive team composition analyzer',
                'Team chemistry reports with scores and recommendations',
              ]}
              icon={<Users className="w-4 h-4 text-white" />}
              gradientFrom="#14b8a6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="communication-styles" className="py-20 px-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Communication Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental subtype naturally communicates—your preferred medium, email and meeting styles,
              how you give and receive feedback, and practical templates for cross-elemental communication.
            </p>
          </div>
          {premium ? (
            <ElementalCommunicationStyles embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Communication Styles"
              description="Explore how each of the 16 subtypes naturally communicates, with practical templates for translating your message across elemental frequencies."
              features={[
                'Communication profiles for all 16 subtypes',
                'Preferred medium, email style, and meeting behavior',
                'How you give and receive feedback',
                'Presentation strengths for your type',
                'Cross-elemental communication templates',
                'Interactive message translator tool',
              ]}
              icon={<Mail className="w-4 h-4 text-white" />}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="conflict-styles" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Swords className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Conflict Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental subtype naturally handles conflict—your default response, triggers, escalation
              and de-escalation, and scripts for resolving conflicts between different elemental pairings.
            </p>
          </div>
          {premium ? (
            <ElementalConflictStyles embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Conflict Styles"
              description="Explore how each of the 16 subtypes naturally handles conflict, with mediation scripts and an interactive conflict resolution simulator."
              features={[
                'Default conflict response (fight, flight, freeze, fawn) for all 16 subtypes',
                'Triggers, escalation patterns, and de-escalation strategies',
                'Blind spots and strengths in conflict for each type',
                'Step-by-step mediation guides for cross-elemental pairings',
                'Copyable resolution scripts for each party',
                'Interactive conflict resolution simulator',
              ]}
              icon={<Swords className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#f59e0b"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  const growthSections = (
    <>
      <section id="resolutions" className="py-20 px-6 bg-gradient-to-br from-cyan-50 via-emerald-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental New Year&apos;s Resolutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover resolutions that channel your core energy more deliberately, beautifully, and sustainably into the
              world.
            </p>
          </div>
          {premium ? (
            <ElementalNewYearResolutions embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental New Year's Resolutions"
              description="Discover resolutions tailored to your elemental type—not about fixing flaws, but channeling your core energy."
              features={[
                'Resolutions for all 16 subtypes',
                'Practical exercises for each resolution',
                'Element-specific themes (Burn Brighter, Flow Deeper, Grow Fertile, See Further)',
                'Your personal resolution highlighted',
                'Interactive element and subtype selection',
              ]}
              icon={<Calendar className="w-4 h-4 text-white" />}
              gradientFrom="#10b981"
              gradientTo="#f59e0b"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="lesson" className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Lesson</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The journey for each subtype is to master their primary resonance, so they aren&apos;t neutral but
              integrated, vibrant, and sustainable.
            </p>
          </div>
          {premium ? (
            <ElementalLesson embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Lesson"
              description="Discover the core lesson your elemental subtype must learn to achieve wholeness and integration."
              features={[
                'Life lessons for all 16 subtypes',
                'Understanding your path to mastery',
                'Integrating your primary resonance',
                'Achieving wholeness through your element',
                'Wisdom of complementary opposites',
              ]}
              icon={<GraduationCap className="w-4 h-4 text-white" />}
              gradientFrom="#6366f1"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="blocks" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Lock className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Blocks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understand your greatest obstacle—how your primary strength, when inverted or blocked, can become your
              primary prison.
            </p>
          </div>
          {premium ? (
            <ElementalBlocks embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Blocks"
              description="Discover what happens when your elemental gift becomes your greatest obstacle."
              features={[
                'Understanding your primary fear',
                'Recognizing blocked environments',
                'Liberation from elemental prisons',
                'Transforming weakness into strength',
                'Environmental awareness guidance',
              ]}
              icon={<Lock className="w-4 h-4 text-white" />}
              gradientFrom="#ef4444"
              gradientTo="#7c3aed"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="imbalance" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Activity className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Imbalance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understand how your elemental energy manifests when blocked, excessive, or deficient—and recognize the
              physiological patterns that signal imbalance.
            </p>
          </div>
          {premium ? (
            <ElementalImbalance embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Imbalance Guide"
              description="Learn how your elemental strength can become weakness when energy is blocked or unbalanced."
              features={[
                'Excess and deficiency patterns for all 16 subtypes',
                'Physiological manifestations of imbalance',
                'Recognizing early warning signs',
                'Understanding your elemental vulnerabilities',
                'Guidance for restoring balance',
              ]}
              icon={<Activity className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="healing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Healing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Restore the natural flow and expression of your core elemental energy. True healing honors your elemental
              nature while restoring its equilibrium.
            </p>
          </div>
          {premium ? (
            <ElementalHealing embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Healing"
              description="Discover complementary healing solutions tailored to your elemental subtype—herbs, nutrients, bodywork, and lifestyle practices."
              features={[
                'Excess and deficiency healing solutions for each subtype',
                'Adaptogens, herbs, and nutrient recommendations',
                'Bodywork and movement therapies',
                'Lifestyle practices for elemental equilibrium',
                'Solutions that honor your elemental nature',
              ]}
              icon={<Heart className="w-4 h-4 text-white" />}
              gradientFrom="#ef4444"
              gradientTo="#ec4899"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>


      <section id="biorhythms" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Clock className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Biorhythms</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover your innate biorhythmic signature aligned with your element. Structure your day to support your
              peak energy times and honor your restoration needs.
            </p>
          </div>
          {premium ? (
            <ElementalBiorhythms embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Biorhythms"
              description="Discover your ideal daily routine based on your elemental energy patterns."
              features={[
                'Peak energy times for all 16 subtypes',
                'Ideal daily routines for your element',
                'Understanding your chronotype',
                'Restoration and recovery guidance',
                'Structuring your day in elemental language',
              ]}
              icon={<Clock className="w-4 h-4 text-white" />}
              gradientFrom="#10b981"
              gradientTo="#14b8a6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  const livingSections = (
    <>
      <section id="decor" className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Home className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Decor</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the colors, materials, and design styles that create your perfect living and working spaces.
            </p>
          </div>
          {premium ? (
            <DecorEnvironmentGuide embedInGuideHub userElement={userElement} userSubtype={userSubtype} onStartQuiz={onStartQuiz} />
          ) : (
            <PremiumGate
              title="Environment & Decor Guide"
              description="Create spaces that energize and inspire you with colors tailored to your elemental type."
              features={[
                'Room-by-room color recommendations',
                'Material and texture guidance',
                'Lighting suggestions for your palette',
                'Furniture style recommendations',
                'Accent color combinations',
              ]}
              icon={<Home className="w-4 h-4 text-white" />}
              gradientFrom="#10b981"
              gradientTo="#06b6d4"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="habitat" className="py-20 px-6 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <TreePine className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Habitat</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the ideal living space that resonates with your elemental nature—the home that doesn&apos;t just
              shelter you, but restores you, reflects you, and amplifies who you truly are.
            </p>
          </div>
          {premium ? (
            <ElementalHabitat embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Habitat"
              description="Discover the ideal living space for your elemental nature—where your home becomes a physical expression of your inner landscape."
              features={[
                'Ideal habitats for all 16 subtypes',
                'Named habitat archetypes (The Urban Nexus, The Still Center, The Homestead, The Observatory, etc.)',
                'Ideal locations, space descriptions, and why each habitat works',
                "Comfort markers—the phrases that signal you're home",
                'Shadow habitats and what to watch for',
                'Sensory and aesthetic recommendations for your space',
              ]}
              icon={<TreePine className="w-4 h-4 text-white" />}
              gradientFrom="#10b981"
              gradientTo="#f59e0b"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="hobbies" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Hobbies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental type truly restores itself. Your day off is sacred recovery time that must be
              spent in alignment with your nature.
            </p>
          </div>
          {premium ? (
            <ElementalHobbies embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Hobbies"
              description="Discover the ideal day off and pastimes for your elemental nature—sacred recovery time aligned with who you truly are."
              features={[
                'Ideal day off descriptions for all 16 subtypes',
                'Named day-off archetypes (The Mastery Day, The Sanctuary Day, The Harvest Day, etc.)',
                'Curated pastimes for each elemental fusion',
                'Understanding why certain activities restore you',
                'Element-specific restoration principles',
                'Guidance for honoring your elemental rest',
              ]}
              icon={<Sun className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#8b5cf6"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="nutrition" className="py-20 px-6 bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Apple className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Nutrition</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your Body&apos;s Natural Balance and understand your relationship with food.
            </p>
          </div>
          {premium ? (
            <ElementalNutrition embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Nutrition"
              description="Find your body's natural balance and understand your relationship with food through your elemental lens."
              features={[
                'Core relationship with food for each element',
                'Subtype-specific nutrition patterns and challenges',
                "Personalized eating strategies (DO / DON'T / KEY)",
                'Movement and exercise recommendations',
                'Eating rituals and kitchen hacks for your type',
                'Mantras for a healthier relationship with food',
              ]}
              icon={<Apple className="w-4 h-4 text-white" />}
              gradientFrom="#10b981"
              gradientTo="#f59e0b"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  const relationshipsSections = (
    <>
      <section id="love-languages" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Love Language</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how your elemental type receives and expresses love through somatic, environmental, and energetic
              languages unique to your nature.
            </p>
          </div>
          {premium ? (
            <ElementalLoveLanguages embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Love Languages"
              description="Understand how your elemental type receives love through somatic, environmental, and energetic languages."
              features={[
                'Love languages for all 16 subtypes',
                'Non-verbal cues that speak to your soul',
                'Understanding how you receive love',
                'Environmental and energetic resonance',
                'Guidance for deeper connections',
              ]}
              icon={<Heart className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#ec4899"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="relationships" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <HeartHandshake className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Relationship</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understand how your elemental type approaches friendship, love, and partnership. Learn to translate your
              love into the native tongue of others.
            </p>
          </div>
          {premium ? (
            <ElementalRelationships embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Relationships"
              description="Discover how your elemental type expresses and receives love, friendship, and partnership."
              features={[
                'Relationship styles for all 16 subtypes',
                'Understanding elemental love languages',
                'What you need from partners',
                'How you express love and friendship',
                'Guidance for harmonious relationships',
              ]}
              icon={<HeartHandshake className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#a855f7"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="friendship-compatibility" className="py-20 px-6 bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <HandHeart className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Friendship Compatibility</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover which subtypes are your natural allies, which challenge you to grow, and how to bridge the gap
              with any elemental type.
            </p>
          </div>
          {premium ? (
            <ElementalFriendshipCompatibility embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Friendship Compatibility"
              description="Explore detailed friendship dynamics between all 16 elemental subtypes with an interactive compatibility calculator."
              features={[
                'Natural Chemistry — discover your natural allies among all 16 subtypes',
                'Growth Friendships — which subtypes challenge you to expand',
                'Friction Points — understand where tension lives and why',
                'How to Bridge the Gap — practical advice for every pairing',
                'Interactive Compatibility Calculator with detailed reports',
                'Friendship archetypes, scores, and bridge-building strategies',
              ]}
              icon={<HandHeart className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#f43f5e"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="friend-group" className="py-20 px-6 bg-gradient-to-br from-rose-50 via-violet-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Users className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Elemental Friend Group</h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Add up to six friends with their names and subtypes. The system analyzes your group&apos;s elemental
              composition and identifies the common element that best represents your collective energy &mdash; along
              with your group&apos;s core qualities, best activities, and how to thrive together.
            </p>
          </div>
          {premium ? (
            <FriendGroupCommonElement userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Elemental Friend Group"
              description="Add up to six friends and discover the element that represents your group's collective energy."

              features={[
                'Add up to six people with their name and elemental subtype',
                "Automatic analysis of your group's elemental composition",
                'The most recurring element becomes your common element',
                'Your group name and motto: Fire Keepers, Deep Souls, Foundations, Idea Dancers',
                'Core qualities, recommended activities, and how to thrive',
                'Element distribution breakdown for the whole group',
              ]}
              icon={<Users className="w-4 h-4 text-white" />}
              gradientFrom="#f43f5e"
              gradientTo="#06b6d4"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );


  const artsSections = (
    <>
      <section id="cinematic" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full shadow-sm mb-6">
              <Film className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Cinematic Preferences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover films that resonate with your core energy, validate your worldview, and provide the specific
              emotional or intellectual &quot;nutrient&quot; you crave.
            </p>
          </div>
          {premium ? (
            <CinematicPreferences embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Cinematic Preferences"
              description="Discover films that resonate deeply with your elemental nature—cinematic resonance therapy."
              features={[
                'Film recommendations for all 16 subtypes',
                'Understanding why certain films resonate with you',
                'Director and year information',
                'Detailed analysis of cinematic resonance',
                'Curated by elemental energy type',
              ]}
              icon={<Film className="w-4 h-4 text-white" />}
              gradientFrom="#f59e0b"
              gradientTo="#f43f5e"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>

      <section id="artistic-correspondence" className="py-20 px-6 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Palette className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Workshop Feature</span>
              {!premium && <Crown className="w-4 h-4 text-amber-500" />}
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Artistic Correspondence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the artistic movements, visual artworks, creative mediums, and prompts that resonate with your
              elemental fusion—your unique creative language.
            </p>
          </div>
          {premium ? (
            <ArtisticCorrespondence embedInGuideHub userElement={userElement} userSubtype={userSubtype} />
          ) : (
            <PremiumGate
              title="Artistic Correspondence"
              description="Discover the artistic movements, mediums, and creative prompts that resonate with your elemental nature."
              features={[
                'Artistic correspondences for all 16 subtypes',
                'Visual artwork recommendations',
                'Movement and style associations',
                'Medium suggestions for creative expression',
                'Personalized creative prompts',
              ]}
              icon={<Palette className="w-4 h-4 text-white" />}
              gradientFrom="#8b5cf6"
              gradientTo="#6366f1"
              onUpgrade={onUpgrade}
            />
          )}
        </div>
      </section>
    </>
  );

  switch (category) {
    case 'style':
      return styleSections;
    case 'philosophy':
      return philosophySections;
    case 'career':
      return careerSections;
    case 'growth':
      return growthSections;
    case 'living':
      return livingSections;
    case 'relationships':
      return relationshipsSections;
    case 'arts':
      return artsSections;
    default:
      return null;
  }
};

export default ElementalGuideCategorySections;
