import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Menu,
  X,
  User,
  LogIn,
  Camera,
  Calendar,
  Crown,
  Home,
  Gem,
  Scissors,
  Lock,
  Users,
  GitCompare,
  Sun,
  MessageSquare,
  ChevronDown,
  Compass,
  BookOpen,
  Info,
  Palette,
  Lightbulb,
  MessageCircle,
  PenTool,
  Film,
  Newspaper,
  Mail,
  Wrench,
} from 'lucide-react';
import { isEntryLaunch, isFullLaunch } from '@/lib/launchConfig';

/** Top-level nav links (desktop + mobile); optional flags for premium / subscribe CTA */
type NavItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
  premium?: boolean;
  highlight?: boolean;
};

interface HeaderProps {
  onOpenQuiz: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user?: any;
  profile?: any;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

const ENTRY_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'types', label: 'Elemental Types', icon: Compass },
  { id: 'elemental-workshop', label: 'Workshop', icon: Sparkles },
  { id: 'community', label: 'Community', icon: MessageSquare },
  { id: 'color-tools', label: 'Color Tools', icon: Wrench },
  { id: 'about', label: 'About Us', icon: Info },
  { id: 'contact', label: 'Contact Us', icon: Mail },
  { id: 'press', label: 'Press', icon: Newspaper },
];

const LEGACY_NAV_ROW1: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'types', label: 'Elemental Types' },
  { id: 'community', label: 'Community', icon: MessageSquare, premium: true },
];

const LEGACY_NAV_ROW2: NavItem[] = [
  { id: 'analyzer', label: 'Color Analyzer', icon: Camera },
  { id: 'consultations', label: 'Consultations', icon: User },
  { id: 'classes', label: 'Classes', icon: Calendar },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'about', label: 'About Us', icon: Info },
  { id: 'contact', label: 'Contact Us', icon: Mail },
  { id: 'press', label: 'Press', icon: Newspaper },
  { id: 'membership', label: 'Subscribe', icon: Crown, highlight: true },
];

const Header: React.FC<HeaderProps> = ({
  onOpenQuiz,
  activeSection,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  user,
  profile,
  onOpenAuth,
  onOpenProfile,
  isAdmin,
  onOpenAdmin,
}) => {
  const isPremium = profile?.membership_tier === 'expression' || profile?.membership_tier === 'discovery';
  const entryLaunch = isEntryLaunch();
  const fullLaunch = isFullLaunch();

  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [expressionOpen, setExpressionOpen] = useState(false);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const expressionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entryLaunch) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (discoveryRef.current && !discoveryRef.current.contains(event.target as Node)) {
        setDiscoveryOpen(false);
      }
      if (expressionRef.current && !expressionRef.current.contains(event.target as Node)) {
        setExpressionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [entryLaunch]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const discoveryItems = [
    { id: 'hair-color', label: 'Hair Guide', icon: Scissors, premium: true },
    { id: 'decor', label: 'Decor Guide', icon: Home, premium: true },
    { id: 'jewelry', label: 'Jewelry Guide', icon: Gem, premium: true },
    { id: 'celebrities', label: 'Famous Faces', icon: Users, premium: true },
    { id: 'compare', label: 'Compare Types', icon: GitCompare, premium: true },
  ];

  const expressionItems = [
    { id: 'spiritual-essence', label: 'Spiritual Essence', icon: Sun, premium: true },
    { id: 'philosophies', label: 'Elemental Philosophies', icon: Lightbulb, premium: true },
    { id: 'compass', label: 'Elemental Compass', icon: Compass, premium: true },
    { id: 'mantras', label: 'Elemental Mantras', icon: MessageCircle, premium: true },
    { id: 'artistic-correspondence', label: 'Artistic Correspondence', icon: PenTool, premium: true },
    { id: 'cinematic', label: 'Cinematic Preferences', icon: Film, premium: true },
  ];

  const isDiscoveryActive = discoveryItems.some((item) => activeSection === item.id);
  const isExpressionActive = expressionItems.some((item) => activeSection === item.id);

  const publicNavItems = useMemo(() => {
    if (fullLaunch) {
      return [...LEGACY_NAV_ROW1, ...LEGACY_NAV_ROW2];
    }
    return [...ENTRY_NAV_ITEMS];
  }, [fullLaunch]);

  const getAvatarColor = () => {
    if (!profile?.elemental_type) return '#374151';
    const colors: Record<string, string> = {
      fire: '#C41E3A',
      water: '#6B8BA4',
      earth: '#CC4E3E',
      air: '#FF7F50',
    };
    return colors[profile.elemental_type] || '#374151';
  };

  const getSubtypeName = () => {
    if (!profile?.elemental_subtype || !profile?.elemental_type) return null;
    const subtypeMap: Record<string, Record<string, string>> = {
      fire: {
        'fire-fire': 'Pure Fire',
        'fire-earth': 'Fire-Earth',
        'fire-air': 'Fire-Air',
        'fire-water': 'Fire-Water',
      },
      water: {
        'water-water': 'Pure Water',
        'water-air': 'Water-Air',
        'water-earth': 'Water-Earth',
        'water-fire': 'Water-Fire',
      },
      earth: {
        'earth-earth': 'Pure Earth',
        'earth-fire': 'Earth-Fire',
        'earth-water': 'Earth-Water',
        'earth-air': 'Earth-Air',
      },
      air: {
        'air-air': 'Pure Air',
        'air-water': 'Air+Water',
        'air-fire': 'Air+Fire',
        'air-earth': 'Air+Earth',
      },
    };
    return subtypeMap[profile.elemental_type]?.[profile.elemental_subtype] || null;
  };

  const renderNavItem = (item: NavItem) => (
    <button
      key={item.id}
      onClick={() => onNavigate(item.id)}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
        item.highlight && !isPremium
          ? 'text-amber-600 hover:text-amber-700'
          : item.premium && !isPremium
            ? 'text-gray-400 hover:text-gray-600'
            : activeSection === item.id
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {item.icon && <item.icon className="w-4 h-4" />}
      {item.label}
      {item.premium && !isPremium && <Lock className="w-3 h-3 text-amber-500" />}
      {item.premium && isPremium && (
        <span className="ml-0.5 px-1 py-0.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-[10px] rounded">
          Expression
        </span>
      )}
      {item.highlight && isPremium && (
        <span className="ml-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-xs rounded-full">
          Expression
        </span>
      )}
    </button>
  );

  const renderDiscoveryDropdown = () => (
    <div className="relative" ref={discoveryRef}>
      <button
        onClick={() => {
          setDiscoveryOpen(!discoveryOpen);
          setExpressionOpen(false);
        }}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
          isDiscoveryActive ? 'text-gray-900' : discoveryOpen ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Compass className="w-4 h-4" />
        Discovery
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${discoveryOpen ? 'rotate-180' : ''}`} />
      </button>

      {discoveryOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
          <div className="relative">
            <div className="px-3 py-1.5 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Explore Guides</p>
            </div>
            {discoveryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setDiscoveryOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : item.premium && !isPremium
                      ? 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeSection === item.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {item.premium && !isPremium && <Lock className="w-3 h-3 text-amber-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderExpressionDropdown = () => (
    <div className="relative" ref={expressionRef}>
      <button
        onClick={() => {
          setExpressionOpen(!expressionOpen);
          setDiscoveryOpen(false);
        }}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
          isExpressionActive ? 'text-gray-900' : expressionOpen ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Palette className="w-4 h-4" />
        Expression
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expressionOpen ? 'rotate-180' : ''}`} />
      </button>

      {expressionOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
          <div className="relative">
            <div className="px-3 py-1.5 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Express Yourself</p>
            </div>
            {expressionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setExpressionOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : item.premium && !isPremium
                      ? 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeSection === item.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {item.premium && !isPremium && <Lock className="w-3 h-3 text-amber-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderMobileNavItem = (item: NavItem) => (
    <button
      key={item.id}
      onClick={() => {
        onNavigate(item.id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
        item.highlight && !isPremium
          ? 'bg-gradient-to-r from-amber-50 to-rose-50 text-amber-700'
          : item.premium && !isPremium
            ? 'bg-gray-50 text-gray-400'
            : activeSection === item.id
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {item.icon && <item.icon className="w-4 h-4" />}
      {item.label}
      {item.premium && !isPremium && (
        <span className="ml-auto flex items-center gap-1 text-xs text-amber-600">
          <Lock className="w-3 h-3" />
          Discovery
        </span>
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24 sm:h-32 lg:h-40">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69428c6cfda5b89aa535d35c_1773155852045_e68d16f9.png"
              alt="Elemental Color Identity"
              className="h-28 sm:h-32 lg:h-40 w-auto object-contain"
            />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-stretch gap-1.5">
              <button
                onClick={onOpenQuiz}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Take Quiz
              </button>
            </div>

            {user ? (
              <button onClick={onOpenProfile} className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm transition-transform hover:scale-105"
                    style={{ backgroundColor: getAvatarColor() }}
                  >
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  {isPremium && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                {getSubtypeName() && (
                  <span className="hidden xl:block text-xs text-gray-500">{getSubtypeName()}</span>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100">
          {fullLaunch ? (
            <>
              <nav className="flex items-center justify-center gap-6 xl:gap-8 py-2">
                {LEGACY_NAV_ROW1.map(renderNavItem)}
                {renderDiscoveryDropdown()}
                {renderExpressionDropdown()}
              </nav>
              <nav className="flex items-center justify-center gap-6 xl:gap-8 py-2 border-t border-gray-50">
                {LEGACY_NAV_ROW2.map(renderNavItem)}
              </nav>
            </>
          ) : (
            <nav className="flex items-center justify-center gap-6 xl:gap-8 py-2.5">
              {publicNavItems.map(renderNavItem)}
            </nav>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 pb-6 border-t border-gray-100 max-h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            <nav className="flex flex-col gap-2">
              {publicNavItems.map(renderMobileNavItem)}

              {user ? (
                <button
                  onClick={() => {
                    onOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg font-medium"
                >
                  <User className="w-4 h-4" />
                  My Profile
                  {!isPremium && getSubtypeName() && (
                    <span className="text-xs text-gray-500 ml-auto">{getSubtypeName()}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}

              <button
                onClick={() => {
                  onOpenQuiz();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Take the Quiz
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
