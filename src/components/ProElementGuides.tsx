import React, { useState } from 'react';
import { Crown, Sun, BookOpen, Calendar, MessageCircle, Gift, Briefcase, GraduationCap, Lock, Activity, Clock, Heart, Film, HeartHandshake, Target, Palette, Shirt, Scissors, Gem, Home, Users, GitCompare, MessageSquare, Sparkles, ArrowRight, ChevronDown, ChevronUp, Star, Zap, Droplets, Building2, TreePine, Shield, Mail, Swords, HandHeart, Compass } from 'lucide-react';
interface ProElementGuidesProps {
  isPremium: boolean;
  onNavigate: (section: string) => void;
  onUpgrade: () => void;
}
interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  category: 'essence' | 'lifestyle' | 'growth' | 'creative' | 'tools' | 'professional';
}
const guideItems: GuideItem[] = [
// Essence & Philosophy
{
  id: 'spiritual-essence',
  title: 'Spiritual Essence',
  description: 'Explore the deeper spiritual meaning behind your elemental type and discover your soul\'s purpose.',
  icon: <Sun className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'essence'
}, {
  id: 'philosophies',
  title: 'Elemental Philosophies',
  description: 'Discover the lived philosophy of your elemental type—a way of being and perceiving reality.',
  icon: <BookOpen className="w-5 h-5" />,
  gradientFrom: '#6366f1',
  gradientTo: '#8b5cf6',
  category: 'essence'
}, {
  id: 'compass',
  title: 'Elemental Compass',
  description: 'Directions as soul geography—sixteen orientations, Compare Directions, and cardinal reference.',
  icon: <Compass className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'essence'
}, {
  id: 'mantras',
  title: 'Elemental Mantras',
  description: 'The four sacred imperatives and the mantra each subtype carries as its invocation of purpose.',
  icon: <MessageCircle className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'essence'
}, {
  id: 'blessings',
  title: 'Elemental Blessings',
  description: 'Discover the unique blessing you bring to the world when fully realized in your element.',
  icon: <Gift className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#d946ef',
  category: 'essence'
}, {
  id: 'ultimate-goal',
  title: 'Ultimate Elemental Goal',
  description: 'Your highest potential and unique form of wholeness—fulfilling your nature completely.',
  icon: <Target className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'essence'
},
// Lifestyle & Relationships
{
  id: 'love-languages',
  title: 'Elemental Love Languages',
  description: 'How your elemental type receives and expresses love through somatic and energetic languages.',
  icon: <Heart className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#ec4899',
  category: 'lifestyle'
}, {
  id: 'relationships',
  title: 'Elemental Relationships',
  description: 'How your elemental type approaches friendship, love, and partnership.',
  icon: <HeartHandshake className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#a855f7',
  category: 'lifestyle'
}, {
  id: 'friendship-compatibility',
  title: 'Friendship Compatibility',
  description: 'Discover which subtypes are your natural allies, which challenge you to grow, and how to bridge the gap.',
  icon: <HandHeart className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#f43f5e',
  category: 'lifestyle'
}, {
  id: 'friend-group',
  title: 'Friend Group: Common Element',
  description: 'Add up to six friends and discover the element that represents your group\'s collective energy.',
  icon: <Users className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#06b6d4',
  category: 'lifestyle'
}, {

  id: 'biorhythms',
  title: 'Elemental Biorhythms',
  description: 'Your innate biorhythmic signature—structure your day to support peak energy times.',
  icon: <Clock className="w-5 h-5" />,
  gradientFrom: '#10b981',
  gradientTo: '#14b8a6',
  category: 'lifestyle'
}, {
  id: 'habitat',
  title: 'Elemental Habitat',
  description: 'The ideal living space that restores you, reflects you, and amplifies who you truly are.',
  icon: <TreePine className="w-5 h-5" />,
  gradientFrom: '#10b981',
  gradientTo: '#f59e0b',
  category: 'lifestyle'
}, {
  id: 'hobbies',
  title: 'Elemental Hobbies',
  description: 'How your elemental type truly restores itself—sacred recovery time aligned with your nature.',
  icon: <Sun className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#8b5cf6',
  category: 'lifestyle'
},
// Professional & Career
{
  id: 'careers',
  title: 'Career Attractions',
  description: 'Careers and professional environments where your elemental energy naturally thrives.',
  icon: <Briefcase className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#f97316',
  category: 'professional'
}, {
  id: 'work-environment',
  title: 'Ideal Work Environment',
  description: 'The work environment that amplifies your elemental gifts rather than suffocating them.',
  icon: <Building2 className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#f97316',
  category: 'professional'
}, {
  id: 'secret-sauce',
  title: 'Elemental Secret Sauce',
  description: 'Your specific, inherent gift you bring to a professional ecosystem—deploy it without apology.',
  icon: <Zap className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#8b5cf6',
  category: 'professional'
}, {
  id: 'leadership-styles',
  title: 'Leadership Style',
  description: 'How your elemental type naturally leads—your default approach, blind spots, and growth path.',
  icon: <Shield className="w-5 h-5" />,
  gradientFrom: '#6366f1',
  gradientTo: '#3b82f6',
  category: 'professional'
}, {
  id: 'team-dynamics',
  title: 'Team Dynamics',
  description: 'Your natural team role, collaboration patterns, friction points, and strategies for high-performing teams.',
  icon: <Users className="w-5 h-5" />,
  gradientFrom: '#14b8a6',
  gradientTo: '#6366f1',
  category: 'professional'
}, {
  id: 'communication-styles',
  title: 'Communication Style',
  description: 'How your subtype naturally communicates—preferred medium, email style, meeting behavior, and feedback.',
  icon: <Mail className="w-5 h-5" />,
  gradientFrom: '#3b82f6',
  gradientTo: '#8b5cf6',
  category: 'professional'
},
// Growth & Challenges
{
  id: 'resolutions',
  title: 'New Year\'s Resolutions',
  description: 'Resolutions that channel your core energy more deliberately and sustainably.',
  icon: <Calendar className="w-5 h-5" />,
  gradientFrom: '#10b981',
  gradientTo: '#f59e0b',
  category: 'growth'
}, {
  id: 'lesson',
  title: 'Elemental Lesson',
  description: 'The core lesson your subtype must learn to achieve wholeness and integration.',
  icon: <GraduationCap className="w-5 h-5" />,
  gradientFrom: '#6366f1',
  gradientTo: '#8b5cf6',
  category: 'growth'
}, {
  id: 'blocks',
  title: 'Elemental Blocks',
  description: 'How your primary strength, when inverted or blocked, can become your primary prison.',
  icon: <Lock className="w-5 h-5" />,
  gradientFrom: '#ef4444',
  gradientTo: '#7c3aed',
  category: 'growth'
}, {
  id: 'imbalance',
  title: 'Elemental Imbalance',
  description: 'How your energy manifests when blocked, excessive, or deficient.',
  icon: <Activity className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'growth'
}, {
  id: 'conflict-styles',
  title: 'Conflict Style',
  description: 'How your subtype handles conflict—default response, triggers, escalation, and resolution scripts.',
  icon: <Swords className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#f59e0b',
  category: 'growth'
},
// Creative Expression
{
  id: 'cinematic',
  title: 'Cinematic Preferences',
  description: 'Films that resonate with your core energy and provide emotional nourishment.',
  icon: <Film className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#f43f5e',
  category: 'creative'
}, {
  id: 'artistic-correspondence',
  title: 'Artistic Correspondence',
  description: 'Artistic movements, visual artworks, and creative mediums that resonate with your fusion.',
  icon: <Palette className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'creative'
},
// Style & Tools
{
  id: 'wardrobe-review',
  title: 'Elemental Wardrobe Review',
  description: 'A ritual of elemental realignment—your unique wardrobe review process.',
  icon: <Shirt className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#f97316',
  category: 'tools'
}, {
  id: 'hair-color',
  title: 'Hair Color Guide',
  description: 'Personalized hair dye colors that complement your elemental type and undertone.',
  icon: <Scissors className="w-5 h-5" />,
  gradientFrom: '#f59e0b',
  gradientTo: '#ec4899',
  category: 'tools'
}, {
  id: 'jewelry',
  title: 'Jewelry & Accessories',
  description: 'Metals, gemstones, and accessory colors that complement your elemental type.',
  icon: <Gem className="w-5 h-5" />,
  gradientFrom: '#ec4899',
  gradientTo: '#f59e0b',
  category: 'tools'
}, {
  id: 'decor',
  title: 'Decor & Environment',
  description: 'Colors, materials, and design styles for your perfect living and working spaces.',
  icon: <Home className="w-5 h-5" />,
  gradientFrom: '#10b981',
  gradientTo: '#06b6d4',
  category: 'tools'
}, {
  id: 'celebrities',
  title: 'Famous Faces',
  description: 'Explore celebrities, historical figures, and fictional characters across all elemental types.',
  icon: <Users className="w-5 h-5" />,
  gradientFrom: '#f43f5e',
  gradientTo: '#a855f7',
  category: 'tools'
}, {
  id: 'compare',
  title: 'Compare Types',
  description: 'See how different elemental types compare side by side with color palette harmony analysis.',
  icon: <GitCompare className="w-5 h-5" />,
  gradientFrom: '#6366f1',
  gradientTo: '#8b5cf6',
  category: 'tools'
}, {
  id: 'community',
  title: 'Community Forum',
  description: 'Connect with fellow elemental types, share results, and get outfit feedback.',
  icon: <MessageSquare className="w-5 h-5" />,
  gradientFrom: '#8b5cf6',
  gradientTo: '#6366f1',
  category: 'tools'
}, {
  id: 'makeup',
  title: 'Make-Up Guide',
  description: 'Curated make-up palettes and product recommendations tailored to your elemental coloring.',
  icon: <Palette className="w-5 h-5" />,
  gradientFrom: '#d946ef',
  gradientTo: '#f43f5e',
  category: 'tools'
}, {
  id: 'nails',
  title: 'Nail Color Guide',
  description: 'Discover nail polish shades and nail art styles that harmonize with your elemental type.',
  icon: <Droplets className="w-5 h-5" />,
  gradientFrom: '#f472b6',
  gradientTo: '#c084fc',
  category: 'tools'
}];
const categories = [{
  id: 'all',
  label: 'All Guides',
  icon: <Sparkles className="w-4 h-4" />
}, {
  id: 'essence',
  label: 'Essence & Philosophy',
  icon: <Sun className="w-4 h-4" />
}, {
  id: 'lifestyle',
  label: 'Lifestyle & Relationships',
  icon: <Heart className="w-4 h-4" />
}, {
  id: 'professional',
  label: 'Professional & Career',
  icon: <Briefcase className="w-4 h-4" />
}, {
  id: 'growth',
  label: 'Growth & Challenges',
  icon: <Zap className="w-4 h-4" />
}, {
  id: 'creative',
  label: 'Creative Expression',
  icon: <Palette className="w-4 h-4" />
}, {
  id: 'tools',
  label: 'Style & Tools',
  icon: <Gem className="w-4 h-4" />
}];
const ProElementGuides: React.FC<ProElementGuidesProps> = ({
  isPremium,
  onNavigate,
  onUpgrade
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const filteredGuides = activeCategory === 'all' ? guideItems : guideItems.filter(g => g.category === activeCategory);
  const displayedGuides = showAll ? filteredGuides : filteredGuides.slice(0, 9);
  const hasMore = filteredGuides.length > 9;
  return <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full shadow-sm mb-6">
          <Crown className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-semibold text-amber-800">Exclusive Collection</span>
          <Star className="w-4 h-4 text-amber-500" />
        </div>
        <h2 className="text-4xl font-serif text-gray-900 mb-4">Expression-Only Elemental Guides</h2>

        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto" data-mixed-content="true">
          Unlock the full depth of your elemental identity with {guideItems.length} exclusive guides 
          covering spirituality, philosophy, relationships, career, creativity, and personal growth.
        </p>

      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[{
        label: 'Exclusive Guides',
        value: guideItems.length.toString(),
        icon: <BookOpen className="w-4 h-4" />
      }, {
        label: 'Life Categories',
        value: '6',
        icon: <Sparkles className="w-4 h-4" />
      }, {
        label: 'Subtypes Covered',
        value: '16',
        icon: <Users className="w-4 h-4" />
      }, {
        label: 'Unique Insights',
        value: '500+',
        icon: <Star className="w-4 h-4" />
      }].map((stat, idx) => <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1">
              {stat.icon}
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
          </div>)}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => <button key={cat.id} onClick={() => {
        setActiveCategory(cat.id);
        setShowAll(false);
      }} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
            {cat.icon}
            {cat.label}
          </button>)}
      </div>

      {/* Guides Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedGuides.map(guide => <button key={guide.id} onClick={() => onNavigate(guide.id)} className="group relative bg-white rounded-2xl border border-gray-100 p-6 text-left hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
            {/* Gradient accent top */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{
          background: `linear-gradient(90deg, ${guide.gradientFrom}, ${guide.gradientTo})`
        }} />

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300" style={{
          background: `linear-gradient(135deg, ${guide.gradientFrom}, ${guide.gradientTo})`
        }}>
              {guide.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {guide.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {guide.description}
            </p>

            {/* Action */}
            <div className="flex items-center gap-1.5 text-sm font-medium" style={{
          color: guide.gradientFrom
        }}>
              {isPremium ? <>
                  <span>Explore Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </> : <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Premium Only</span>
                </>}
            </div>

            {/* PRO badge */}
            <div className="absolute top-4 right-4">
              <span className="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                Expression
              </span>
            </div>

          </button>)}
      </div>

      {/* Show More / Show Less */}
      {hasMore && <div className="text-center">
          <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
            {showAll ? <>
                Show Less
                <ChevronUp className="w-4 h-4" />
              </> : <>
                View All {filteredGuides.length} Guides
                <ChevronDown className="w-4 h-4" />
              </>}
          </button>
        </div>}

      {/* Upgrade CTA (for non-premium users) */}
      {!isPremium && <div className="relative mt-8 rounded-3xl overflow-hidden">
          {/* White background */}
          <div className="absolute inset-0 bg-white" />
          
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-100/40 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10 px-8 py-12 md:py-16 text-center border border-gray-200 rounded-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
              <Crown className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-900">Unlock Everything</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4" data-mixed-content="true">
              Get Full Access to All {guideItems.length} Guides
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Upgrade to Premium and unlock the complete elemental experience—spirituality, 
              philosophy, relationships, career guidance, and so much more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onUpgrade} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Crown className="w-5 h-5" />
                Upgrade to Premium
              </button>
              <button onClick={() => onNavigate('membership')} className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">
                View Plans
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="mt-5 text-sm text-gray-500">
              Starting at $9.99/month · Cancel anytime · Instant access
            </p>
          </div>
        </div>}


      {/* Premium user encouragement */}
      {isPremium && <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 rounded-2xl border border-amber-100 p-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">Premium Member</span>
          </div>
          <h4 className="text-xl font-serif text-gray-900 mb-2">
            You have full access to all guides
          </h4>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Explore each guide below to deepen your understanding of your elemental identity. 
            Click any card above to jump directly to that section.
          </p>
        </div>}
    </div>;
};
export default ProElementGuides;