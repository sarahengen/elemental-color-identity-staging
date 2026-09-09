import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateToDetachedSection } from '@/lib/crossPageNavigation';
import { guideCategoryPath, isGuideCategorySlug } from '@/lib/guideCategoryRoutes';
import { isQuickNavSectionVisible } from '@/lib/launchConfig';
import {

  ChevronRight,
  ChevronLeft,
  Sparkles,
  Flame,
  Compass,
  Camera,
  Shirt,

  Crown,
  LayoutGrid,
  BookOpen,
  Users,
  GitCompare,
  Scissors,
  Gem,
  Home,
  Sun,
  Calendar,
  MessageCircle,
  Gift,
  Briefcase,
  Building2,
  TreePine,
  Zap,
  Shield,
  Mail,
  Swords,
  GraduationCap,
  Lock,
  Activity,
  Clock,
  Heart,
  Film,
  HeartHandshake,
  Target,
  Palette,
  MessageSquare,
  HandHeart,
  Map,
  List,
  X,
  ChevronUp,
  ChevronDown,
  Droplets,
  Coffee,
  Apple,
} from 'lucide-react';





interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
  conditional?: boolean; // If true, only show when the DOM element with this id exists
}

const sections: NavSection[] = [
  { id: 'home', label: 'Home', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'Main' },
  { id: 'color-tools', label: 'Color Tools', icon: <Compass className="w-3.5 h-3.5" />, category: 'Main' },
  { id: 'types', label: 'Four Elements', icon: <Flame className="w-3.5 h-3.5" />, category: 'Main' },

  { id: 'analyzer', label: 'Camera Analyzer', icon: <Camera className="w-3.5 h-3.5" />, category: 'Tools' },
  { id: 'wardrobe', label: 'Wardrobe Analyzer', icon: <Shirt className="w-3.5 h-3.5" />, category: 'Tools' },
  { id: 'elemental-gallery', label: 'Elemental Gallery', icon: <LayoutGrid className="w-3.5 h-3.5" />, category: 'Main' },
  { id: 'color-palette', label: 'Color Palette', icon: <Droplets className="w-3.5 h-3.5" />, category: 'Main', conditional: true },
  { id: 'color-wheel', label: 'Color Compass', icon: <Compass className="w-3.5 h-3.5" />, category: 'Main' },
  { id: 'membership', label: 'Membership', icon: <Crown className="w-3.5 h-3.5" />, category: 'Premium' },

  { id: 'pro-guides', label: 'Pro Guides', icon: <BookOpen className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'consultations', label: 'Consultations', icon: <Users className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'classes', label: 'Classes', icon: <GraduationCap className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'community', label: 'Community', icon: <MessageSquare className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'celebrities', label: 'Famous Faces', icon: <Users className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'compare', label: 'Compare Types', icon: <GitCompare className="w-3.5 h-3.5" />, category: 'Premium' },
  { id: 'hair-color', label: 'Hair Color', icon: <Scissors className="w-3.5 h-3.5" />, category: 'Style' },
  { id: 'jewelry', label: 'Jewelry', icon: <Gem className="w-3.5 h-3.5" />, category: 'Style' },
  { id: 'wardrobe-review', label: 'Wardrobe Review', icon: <Shirt className="w-3.5 h-3.5" />, category: 'Style' },
  { id: 'spiritual-essence', label: 'Essence', icon: <Sun className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'philosophies', label: 'Philosophy', icon: <BookOpen className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'compass', label: 'Compass', icon: <Map className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'mantras', label: 'Mantras', icon: <MessageCircle className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'blessings', label: 'Blessings', icon: <Gift className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'ultimate-goal', label: 'Ultimate Goal', icon: <Target className="w-3.5 h-3.5" />, category: 'Philosophy' },
  { id: 'careers', label: 'Career', icon: <Briefcase className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'work-environment', label: 'Work Environment', icon: <Building2 className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'secret-sauce', label: 'Secret Sauce', icon: <Zap className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'leadership-styles', label: 'Leadership', icon: <Shield className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'team-dynamics', label: 'Team Dynamics', icon: <Users className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'communication-styles', label: 'Communication', icon: <Mail className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'conflict-styles', label: 'Conflict Style', icon: <Swords className="w-3.5 h-3.5" />, category: 'Career' },
  { id: 'resolutions', label: 'Resolutions', icon: <Calendar className="w-3.5 h-3.5" />, category: 'Growth' },
  { id: 'lesson', label: 'Lesson', icon: <GraduationCap className="w-3.5 h-3.5" />, category: 'Growth' },
  { id: 'blocks', label: 'Blocks', icon: <Lock className="w-3.5 h-3.5" />, category: 'Growth' },
  { id: 'imbalance', label: 'Imbalance', icon: <Activity className="w-3.5 h-3.5" />, category: 'Growth' },
  { id: 'healing', label: 'Healing', icon: <Heart className="w-3.5 h-3.5" />, category: 'Growth' },
  { id: 'biorhythms', label: 'Biorhythms', icon: <Clock className="w-3.5 h-3.5" />, category: 'Growth' },

  { id: 'decor', label: 'Decor', icon: <Home className="w-3.5 h-3.5" />, category: 'Living' },
  { id: 'habitat', label: 'Habitat', icon: <TreePine className="w-3.5 h-3.5" />, category: 'Living' },
  { id: 'hobbies', label: 'Hobbies', icon: <Coffee className="w-3.5 h-3.5" />, category: 'Living' },
  { id: 'nutrition', label: 'Nutrition', icon: <Apple className="w-3.5 h-3.5" />, category: 'Living' },


  { id: 'love-languages', label: 'Love Languages', icon: <Heart className="w-3.5 h-3.5" />, category: 'Relationships' },
  { id: 'relationships', label: 'Relationships', icon: <HeartHandshake className="w-3.5 h-3.5" />, category: 'Relationships' },
  { id: 'friendship-compatibility', label: 'Friendship', icon: <HandHeart className="w-3.5 h-3.5" />, category: 'Relationships' },
  { id: 'friend-group', label: 'Friend Group', icon: <Users className="w-3.5 h-3.5" />, category: 'Relationships' },

  { id: 'cinematic', label: 'Cinematic', icon: <Film className="w-3.5 h-3.5" />, category: 'Arts' },
  { id: 'artistic-correspondence', label: 'Art & Creativity', icon: <Palette className="w-3.5 h-3.5" />, category: 'Arts' },
  { id: 'life-purpose', label: 'Life Purpose', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'Philosophy' },

];




const categoryColors: Record<string, string> = {
  Main: 'text-amber-600',
  Tools: 'text-blue-600',
  Premium: 'text-purple-600',
  Style: 'text-rose-600',
  Philosophy: 'text-indigo-600',
  Career: 'text-emerald-600',
  Growth: 'text-red-600',
  Living: 'text-teal-600',
  Relationships: 'text-pink-600',
  Arts: 'text-violet-600',
};

const categoryBgColors: Record<string, string> = {
  Main: 'bg-amber-50 border-amber-200',
  Tools: 'bg-blue-50 border-blue-200',
  Premium: 'bg-purple-50 border-purple-200',
  Style: 'bg-rose-50 border-rose-200',
  Philosophy: 'bg-indigo-50 border-indigo-200',
  Career: 'bg-emerald-50 border-emerald-200',
  Growth: 'bg-red-50 border-red-200',
  Living: 'bg-teal-50 border-teal-200',
  Relationships: 'bg-pink-50 border-pink-200',
  Arts: 'bg-violet-50 border-violet-200',
};



const QuickNavMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set(['Premium', 'Style', 'Philosophy', 'Career', 'Growth', 'Living', 'Relationships', 'Arts']));
  const [visibleConditionalIds, setVisibleConditionalIds] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Track which conditional sections exist in the DOM
  useEffect(() => {
    const checkConditionalSections = () => {
      const conditionalSections = sections.filter(s => s.conditional);
      const newVisible = new Set<string>();
      conditionalSections.forEach(s => {
        if (document.getElementById(s.id)) {
          newVisible.add(s.id);
        }
      });
      setVisibleConditionalIds(prev => {
        // Only update if changed to avoid unnecessary re-renders
        const prevArr = Array.from(prev).sort().join(',');
        const newArr = Array.from(newVisible).sort().join(',');
        if (prevArr !== newArr) return newVisible;
        return prev;
      });
    };

    // Initial check
    checkConditionalSections();

    // Use MutationObserver to detect DOM changes (e.g., when user completes quiz)
    const observer = new MutationObserver(() => {
      checkConditionalSections();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Filter sections to only include visible ones
  const visibleSections = sections.filter(
    (s) => isQuickNavSectionVisible(s.id) && (!s.conditional || visibleConditionalIds.has(s.id))
  );

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use IntersectionObserver to track which section is in view
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    visibleSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [visibleSections]);

  // Auto-scroll the nav to keep active item visible
  useEffect(() => {
    if (isOpen && activeItemRef.current && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItemRef.current.getBoundingClientRect();
      
      if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
        activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeSection, isOpen]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (navigateToDetachedSection(navigate, sectionId)) {
        return;
      }
      // For sections that live on the current page, scroll to them
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [navigate]
  );

  // Map category names to guide slugs for navigation
  const categoryToGuideSlug: Record<string, string> = {
    Style: 'style',
    Philosophy: 'philosophy',
    Career: 'career',
    Growth: 'growth',
    Living: 'living',
    Relationships: 'relationships',
    Arts: 'arts',
  };

  const handleCategoryClick = (category: string) => {
    const isCollapsed = collapsedCategories.has(category);

    // Always toggle the collapse state
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });

    // If the category was collapsed (i.e. we're now expanding it),
    // also navigate to the corresponding page
    if (isCollapsed) {
      const guideSlug = categoryToGuideSlug[category];
      if (guideSlug && isGuideCategorySlug(guideSlug)) {
        navigate(guideCategoryPath(guideSlug as any));
        return;
      }
      // Premium category → scroll to membership section on main page
      if (category === 'Premium') {
        const el = document.getElementById('membership');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }
  };



  // Group visible sections by category
  const categories = visibleSections.reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, NavSection[]>);

  const activeSectionData = visibleSections.find((s) => s.id === activeSection);
  const activeIndex = visibleSections.findIndex((s) => s.id === activeSection);
  const totalSections = visibleSections.length;

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button - visible when nav is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group"
          aria-label="Open quick navigation"
        >
          <div className="relative">
            {/* Progress ring around the button */}
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:bg-gray-800 transition-colors">
                <List className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Quick Navigation
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </button>
      )}

      {/* Navigation Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200 flex flex-col">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">Quick Navigation</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Section {activeIndex + 1} of {totalSections}
                </span>
                <span className="text-gray-400 font-medium">{Math.round(scrollProgress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              {/* Current section indicator */}
              {activeSectionData && (
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 animate-pulse" />
                  <span className="text-xs font-medium text-gray-700 truncate">
                    {activeSectionData.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Section List */}
          <div ref={navRef} className="flex-1 overflow-y-auto py-2 px-2 scrollbar-thin">
            {Object.entries(categories).map(([category, categorySections]) => {
              const isCollapsed = collapsedCategories.has(category);
              const hasActive = categorySections.some((s) => s.id === activeSection);

              return (
                <div key={category} className="mb-1">
                  {/* Category Header */}
                  <button
                    onClick={() => handleCategoryClick(category)}

                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                      hasActive
                        ? `${categoryBgColors[category]} border`
                        : 'text-gray-400 hover:bg-gray-50'
                    } ${categoryColors[category]}`}
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-1">
                      {hasActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      )}
                      {isCollapsed ? (
                        <ChevronRight className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </button>

                  {/* Section Items */}
                  {!isCollapsed && (
                    <div className="mt-0.5 space-y-0.5">
                      {categorySections.map((section) => {
                        const isActive = section.id === activeSection;
                        return (
                          <button
                            key={section.id}
                            ref={isActive ? activeItemRef : null}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                              isActive
                                ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {/* Active indicator dot */}
                            <div
                              className={`flex-shrink-0 transition-all duration-200 ${
                                isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-gray-600'
                              }`}
                            >
                              {section.icon}
                            </div>
                            <span
                              className={`text-sm truncate ${
                                isActive ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {section.label}
                            </span>
                            {isActive && (
                              <div className="ml-auto flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer with quick actions */}
          <div className="px-3 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                Top
              </button>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  })
                }
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                Bottom
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mini progress bar at the very top of the page */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};

export default QuickNavMenu;
