import React, { useState, useEffect } from 'react';
import { ElementalType, ElementalSubtype } from '@/data/elementalTypes';
import { ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES } from '@/data/elementalSubtypeArchetypes';
import { getMakeupPalette } from '@/data/makeupData';
import { getProductsForSubtype, MakeupProduct } from '@/data/makeupProducts';
import { canViewSubtypeGuides } from '@/lib/subtypeProfileAccess';
import { getNailPalette } from '@/data/nailData';
import { getJewelryData, getElementJewelryOverview, metalSwatches } from '@/data/jewelryData';
import { hairColorData } from './HairColorGuide';
import { ArrowLeft, Sparkles, ChevronRight, Share2, Leaf, Palette, Users, Compass, Star, Crown, BookOpen, Eye, Smile, Heart, Droplet, Lightbulb, ExternalLink, ShoppingBag, Lock, Gem, Brush, Calendar, PartyPopper, Watch, Glasses, Check, X, ChevronDown, ChevronUp, Info, Scissors, Camera, Shirt } from 'lucide-react';
import ColorPalette from './ColorPalette';
import SocialShareCard from './SocialShareCard';
import PremiumGate from './PremiumGate';
import LockedOverlay from './LockedOverlay';



/**
 * Conditionally wraps `children` in the workshop {@link LockedOverlay}. Defined
 * at module scope so its component identity is stable across renders — this
 * prevents React from remounting the (large) gated subtree on every render.
 */
type MaybeLockedOverlayProps = { locked: boolean } & React.ComponentProps<typeof LockedOverlay>;

const MaybeLockedOverlay: React.FC<MaybeLockedOverlayProps> = ({ locked, children, ...overlayProps }) =>
  locked ? <LockedOverlay {...overlayProps}>{children}</LockedOverlay> : <>{children}</>;

interface ElementalTypeDetailProps {
  type: ElementalType;
  onBack: () => void;
  isPremium?: boolean;
  onUpgradeToPremium?: () => void;
  onNavigate?: (section: string) => void;
  /** When false, the subtype deep-dive is gated behind the workshop unlock. */
  hasWorkshopAccess?: boolean;
  /** User quiz element/subtype — used to scope profile-only access to their page. */
  userElement?: string | null;
  userSubtype?: string | null;
  /** One-time subtype profile purchase (not workshop). */
  hasSubtypeProfileUnlocked?: boolean;
  /** Profile object for centralized guide access checks. */
  profile?: { membership_tier?: string | null; subtype_profile_unlocked?: boolean | null; workshop_unlocked?: boolean | null } | null;
  /** Triggered from the locked subtype overlay (sign-in or workshop purchase). */
  onUnlockWorkshop?: () => void;
  /** Opens this subtype detail directly on mount (e.g. post-purchase / email deep link). */
  initialSubtypeId?: string | null;
  /** Shows the included-tools banner on the subtype detail (profile owners). */
  showColorToolsBanner?: boolean;
  onOpenColorAnalyzer?: () => void;
  onOpenWardrobeAnalyzer?: () => void;
  onOpenCommunityForum?: () => void;
}


const ElementalTypeDetail: React.FC<ElementalTypeDetailProps> = ({ 
  type, 
  onBack,
  isPremium = false,
  onUpgradeToPremium,
  onNavigate,
  hasWorkshopAccess = false,
  userElement = null,
  userSubtype = null,
  hasSubtypeProfileUnlocked = false,
  profile = null,
  onUnlockWorkshop,
  initialSubtypeId,
  showColorToolsBanner = false,
  onOpenColorAnalyzer,
  onOpenWardrobeAnalyzer,
  onOpenCommunityForum,
}) => {

  const canAccessAllSubtypes = hasWorkshopAccess || isPremium;
  const profileOwnsElement = hasSubtypeProfileUnlocked && userElement === type.id;

  const canOpenSubtype = (subtypeId: string) =>
    canAccessAllSubtypes ||
    (profileOwnsElement && userSubtype === subtypeId);

  const [selectedSubtype, setSelectedSubtype] = useState<ElementalSubtype | null>(null);

  const canViewGuides = selectedSubtype
    ? canViewSubtypeGuides({
        profile,
        userElement,
        userSubtype,
        typeId: type.id,
        subtypeId: selectedSubtype.id,
      })
    : false;

  // Deep link straight to a subtype detail (post-purchase / email links).
  useEffect(() => {
    if (!initialSubtypeId) return;
    const match = type.subtypes.find((s) => s.id === initialSubtypeId);
    if (match) {
      setSelectedSubtype(match);
      window.scrollTo({ top: 0 });
    }
  }, [initialSubtypeId, type]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeMakeupTab, setActiveMakeupTab] = useState<'eyeshadow' | 'mascara' | 'lipstick' | 'blush' | 'foundation'>('eyeshadow');
  const [showProducts, setShowProducts] = useState(false);
  const [activeNailTab, setActiveNailTab] = useState<'everyday' | 'bold' | 'seasonal' | 'special'>('everyday');
  const [showNailArt, setShowNailArt] = useState(false);
  const [expandedJewelrySections, setExpandedJewelrySections] = useState<string[]>(['metals', 'gemstones']);
  const [activeHairCategory, setActiveHairCategory] = useState<string>('Natural Shades');
  const [showHairAvoid, setShowHairAvoid] = useState(false);


  const makeupPalette = selectedSubtype ? getMakeupPalette(selectedSubtype.id) : null;
  const productRecommendations = selectedSubtype ? getProductsForSubtype(selectedSubtype.id) : null;
  const nailPalette = selectedSubtype ? getNailPalette(selectedSubtype.id) : null;
  const jewelryGuide = selectedSubtype ? getJewelryData(type.id, selectedSubtype.id) : null;
  const elementJewelryOverview = getElementJewelryOverview(type.id);

  const toggleJewelrySection = (section: string) => {
    setExpandedJewelrySections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'best': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'good': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'avoid': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'best': return <Check className="w-4 h-4" />;
      case 'good': return <Check className="w-4 h-4" />;
      case 'avoid': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  const renderSubtypeCards = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {type.subtypes.map((subtype) => {
        const accessible = canOpenSubtype(subtype.id);
        if (!accessible) {
          return (
            <div
              key={subtype.id}
              className="relative text-left bg-white rounded-xl p-5 shadow-sm border border-gray-100 opacity-60"
            >
              <div className="absolute top-3 right-3">
                <Lock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex -space-x-1 mb-3 blur-[2px]">
                {subtype.colors.slice(0, 5).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <h3 className="font-semibold text-gray-400 mb-1">{subtype.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">Included with Elemental Color Workshop</p>
            </div>
          );
        }

        return (
          <button
            key={subtype.id}
            onClick={() => setSelectedSubtype(subtype)}
            className="group text-left bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
          >
            <div className="flex -space-x-1 mb-3">
              {subtype.colors.slice(0, 5).map((color, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700">{subtype.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{subtype.description.slice(0, 80)}...</p>
            <div className="flex items-center text-sm text-gray-400 mt-3 group-hover:text-gray-600">
              <span>View full profile</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        );
      })}
    </div>
  );

  // Color visibility helpers for subtypes with very light colors (e.g. Pure Fire's #FFFFFF)
  const ROYAL_BLUE = '#4169E1';
  const PALE_PURPLE = '#E8E0F0';
  const PALE_PURPLE_BORDER = '#D0C8E0';

  const isLightColor = (hex: string): boolean => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.75;
  };

  const getVisibleIconColor = (hex: string): string => isLightColor(hex) ? ROYAL_BLUE : hex;
  const getVisibleBgTint = (hex: string): string => isLightColor(hex) ? PALE_PURPLE : `${hex}15`;
  const getVisibleBgTintDeep = (hex: string): string => isLightColor(hex) ? PALE_PURPLE : `${hex}20`;
  const getVisibleTextColor = (hex: string): string => isLightColor(hex) ? ROYAL_BLUE : hex;
  const getVisibleBorderTint = (hex: string): string => isLightColor(hex) ? PALE_PURPLE_BORDER : `${hex}30`;
  const getContrastTextOnBg = (bgHex: string): string => isLightColor(bgHex) ? ROYAL_BLUE : '#FFFFFF';
  const getVisibleCircleBg = (hex: string): string => isLightColor(hex) ? ROYAL_BLUE : hex;
  // Get the jewelry guide icon color (uses colors[2] or fallback)
  const jewelryIconColor = selectedSubtype ? (selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex) : type.colors[0].hex;
  const visibleJewelryIconColor = getVisibleIconColor(jewelryIconColor);

  // Nature archetype names for the detail page heading (separate from forum archetype names)
  const NATURE_ARCHETYPE_NAMES: Record<string, string> = {
    'fire-fire': 'The Electric Arc',
    'fire-earth': 'The Forged Iron',

    'fire-air': 'The Illuminating Spark',
    'fire-water': 'The Blue Flame',
    'water-water': 'The Forest Lake',
    'water-air': 'The Misty Shore',
    'water-earth': 'The Languid River',
    'water-fire': 'The Sun-Dappled Pond',
    'earth-earth': 'The Forest Floor',
    'earth-fire': 'The Mountain Stone',
    'earth-water': 'The Velvet Moss',
    'earth-air': 'The Golden Harvest',
    'air-air': 'The Clear Morning Sky',
    'air-water': 'The First Whisper',
    'air-fire': 'The Playful Breeze',
    'air-earth': 'The Gilded Zephyr',

  };

  const selectedNatureArchetype = selectedSubtype
    ? NATURE_ARCHETYPE_NAMES[selectedSubtype.id]
    : null;

  const selectedArchetype = selectedSubtype
    ? ELEMENTAL_SUBTYPE_ARCHETYPE_NAMES[selectedSubtype.id]
    : null;


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${selectedSubtype?.colors[0].hex || type.colors[0].hex}dd, ${selectedSubtype?.colors[1].hex || type.colors[1].hex}dd)` 
        }}
      >
        <img 
          src={type.image} 
          alt={type.name}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <button
            onClick={selectedSubtype ? () => setSelectedSubtype(null) : onBack}
            className="absolute top-8 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {selectedSubtype ? `Back to ${type.name}` : 'Back to Types'}
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="absolute top-8 right-6 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
          
          <p className="text-white/80 text-lg mb-4">{type.season} Season</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-2 drop-shadow-lg">
            {selectedSubtype ? selectedSubtype.name : type.name}
          </h1>
          {!selectedSubtype && (
            <p className="text-2xl text-white/90 italic">{type.tagline}</p>
          )}
          {selectedSubtype && (
            <p className="text-lg text-white/80">{type.name} Element • {type.season} Season</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Subtypes Navigation (when viewing main type) */}
        {!selectedSubtype && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Your {type.name} Subtypes</h2>
            <p className="text-gray-600 mb-6">
              {type.name} is your primary elemental nature. You also have a secondary elemental influence which explains how your energy manifests. Learn which of the four {type.name} subtypes best reflects your Inner Self.
            </p>

            {canAccessAllSubtypes ? (
              renderSubtypeCards()
            ) : profileOwnsElement ? (
              renderSubtypeCards()
            ) : (
              <LockedOverlay
                title={`Explore the ${type.name} subtypes`}
                description={`All four ${type.name} subtypes. Full color palettes. Style, beauty & essence guides.`}
                icon={<Sparkles className="h-7 w-7 text-white" />}
                ctaLabel="Reveal the whole map"
                note="Included with Elemental Color Workshop"
                gradientFrom={type.colors[0].hex}
                gradientTo={type.colors[1]?.hex ?? type.colors[0].hex}
                onUnlock={() => onUnlockWorkshop?.()}
              >
                <div className="p-1">{renderSubtypeCards()}</div>
              </LockedOverlay>
            )}
          </div>
        )}

        <MaybeLockedOverlay
          locked={!canAccessAllSubtypes && !(selectedSubtype && canOpenSubtype(selectedSubtype.id))}
          title={`Explore the full ${type.name} profile`}
          description={`Complete color palette. Key characteristics. Style philosophy. All four subtypes.`}
          icon={<Sparkles className="h-7 w-7 text-white" />}
          ctaLabel="Reveal the whole map"
          note="Included with Elemental Color Workshop"
          gradientFrom={type.colors[0].hex}
          gradientTo={type.colors[1]?.hex ?? type.colors[0].hex}
          onUnlock={() => onUnlockWorkshop?.()}
        >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif text-gray-900 mb-4">
                About {selectedSubtype ? selectedSubtype.name : `${type.name} Types`}
                {selectedNatureArchetype && (
                  <span className="text-gray-400 font-normal"> - {selectedNatureArchetype}</span>
                )}
              </h2>


              {selectedSubtype ? (
                selectedSubtype.description.includes('\n\n') ? (
                  selectedSubtype.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={`text-gray-600 leading-relaxed ${idx > 0 ? 'mt-4' : ''}`}>{paragraph}</p>
                  ))
                ) : (
                  <p className="text-gray-600 leading-relaxed">{selectedSubtype.description}</p>
                )

              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  <p className="text-gray-600 leading-relaxed">{type.nature}</p>
                </>
              )}
            </div>

            {/* Characteristics */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Key Characteristics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedSubtype?.characteristics || type.characteristics).map((char, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div 
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: (selectedSubtype?.colors || type.colors)[idx % (selectedSubtype?.colors || type.colors).length].hex }}
                    />
                    <span className="text-gray-700">{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elemental Expression Section (only for subtypes) */}
            {selectedSubtype && selectedSubtype.elementalExpression && (

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: getVisibleBgTintDeep(selectedSubtype.colors[0].hex) }}
                  >
                    <Compass className="w-6 h-6" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif text-gray-900">Elemental Expression</h2>
                    <p className="text-sm text-gray-500">The essence of your {selectedSubtype.name} nature</p>
                  </div>
                </div>

                {/* In Nature */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="w-5 h-5" style={{ color: selectedSubtype.colors[1].hex }} />
                    <h3 className="text-lg font-semibold text-gray-800">In Nature</h3>
                  </div>
                  <div 
                    className="p-5 rounded-xl border-l-4"
                    style={{ 
                      backgroundColor: `${selectedSubtype.colors[0].hex}08`,
                      borderLeftColor: selectedSubtype.colors[0].hex 
                    }}
                  >
                    <p className="text-gray-700 leading-relaxed italic">
                      "{selectedSubtype.elementalExpression.inNature}"
                    </p>
                  </div>
                </div>

                {/* Themes */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5" style={{ color: selectedSubtype.colors[1].hex }} />
                    <h3 className="text-lg font-semibold text-gray-800">Themes</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedSubtype.elementalExpression.themes.map((theme, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105"
                        style={{ 
                          backgroundColor: getVisibleBgTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex),
                          color: getVisibleTextColor(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex),
                          border: `1px solid ${getVisibleBorderTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex)}`
                        }}

                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Archetypes */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5" style={{ color: selectedSubtype.colors[1].hex }} />
                    <h3 className="text-lg font-semibold text-gray-800">Archetypes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSubtype.elementalExpression.archetypes.map((archetype, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-xl transition-all hover:shadow-md"
                        style={{ 
                          backgroundColor: getVisibleBgTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex),
                          border: `1px solid ${getVisibleBorderTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex)}`
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                          style={{ backgroundColor: getVisibleCircleBg(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex), color: getContrastTextOnBg(getVisibleCircleBg(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex)) }}

                        >
                          {archetype.charAt(4).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{archetype}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Styling Philosophy (only for main type) */}
            {!selectedSubtype && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif text-gray-900 mb-4">Style Philosophy</h2>
                <p className="text-gray-600 leading-relaxed">
                  {type.stylingPhilosophy.includes('Elemental Wardrobe Review') ? (
                    <>
                      {type.stylingPhilosophy.split('Elemental Wardrobe Review')[0]}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) {
                            onNavigate('wardrobe-review');
                          } else {
                            const element = document.getElementById('wardrobe-review');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                        className="font-semibold underline hover:no-underline transition-all inline"
                        style={{ color: type.colors[0].hex }}
                      >
                        Elemental Wardrobe Review
                      </button>
                      {type.stylingPhilosophy.split('Elemental Wardrobe Review')[1]}
                    </>
                  ) : (
                    type.stylingPhilosophy
                  )}


                </p>
              </div>
            )}


            {/* Color Palette — prefer open subtype; else signed-in subtype on this element (like Gallery) */}
            <ColorPalette
              type={type}
              subtype={
                selectedSubtype?.id ??
                (userSubtype && type.subtypes.some((s) => s.id === userSubtype) ? userSubtype : null)
              }
            />


            {/* MAKEUP SECTION - Only for subtypes - PREMIUM FEATURE */}
            {selectedSubtype && makeupPalette && (
              canViewGuides ? (
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-sm border border-pink-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: getVisibleBgTintDeep(selectedSubtype.colors[0].hex) }}
                    >
                      <Smile className="w-6 h-6" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-gray-900">Makeup Guide</h2>
                      <p className="text-sm text-gray-500">Perfect colors for your {selectedSubtype.name} coloring</p>
                    </div>
                  </div>

                  {/* Makeup Category Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { id: 'eyeshadow', label: 'Eyeshadow', icon: Eye },
                      { id: 'mascara', label: 'Mascara', icon: Eye },
                      { id: 'lipstick', label: 'Lipstick', icon: Heart },
                      { id: 'blush', label: 'Blush', icon: Smile },
                      { id: 'foundation', label: 'Foundation', icon: Droplet }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveMakeupTab(id as typeof activeMakeupTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          activeMakeupTab === id
                            ? 'shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                        style={activeMakeupTab === id ? { backgroundColor: selectedSubtype.colors[0].hex, color: getContrastTextOnBg(selectedSubtype.colors[0].hex) } : {}}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>



                  {/* Eyeshadow */}
                  {activeMakeupTab === 'eyeshadow' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Eye className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                        Eyeshadow Palette
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {makeupPalette.eyeshadow.map((color, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div 
                              className="w-full h-16 rounded-lg mb-3 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                            {color.description && (
                              <p className="text-xs text-gray-500">{color.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mascara */}
                  {activeMakeupTab === 'mascara' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Eye className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                        Mascara Colors
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {makeupPalette.mascara.map((color, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div 
                              className="w-full h-16 rounded-lg mb-3 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                            {color.description && (
                              <p className="text-xs text-gray-500">{color.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lipstick */}
                  {activeMakeupTab === 'lipstick' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Heart className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                        Lipstick Shades
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {makeupPalette.lipstick.map((color, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div 
                              className="w-full h-16 rounded-lg mb-3 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                            {color.description && (
                              <p className="text-xs text-gray-500">{color.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blush */}
                  {activeMakeupTab === 'blush' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Smile className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                        Blush Colors
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {makeupPalette.blush.map((color, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div 
                              className="w-full h-16 rounded-lg mb-3 shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                            <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                            {color.description && (
                              <p className="text-xs text-gray-500">{color.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Foundation */}
                  {activeMakeupTab === 'foundation' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                          <Droplet className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                          Foundation Guide
                        </h3>
                        <div 
                          className="p-4 rounded-xl mb-4"
                          style={{ backgroundColor: `${selectedSubtype.colors[0].hex}10` }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                              style={{ backgroundColor: getVisibleCircleBg(selectedSubtype.colors[0].hex), color: getContrastTextOnBg(getVisibleCircleBg(selectedSubtype.colors[0].hex)) }}

                            >
                              {makeupPalette.foundation.undertone} undertone
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{makeupPalette.foundation.description}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Recommended Shades</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                          {makeupPalette.foundation.shades.map((shade, idx) => (
                            <div 
                              key={idx}
                              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                            >
                              <div 
                                className="w-full h-12 rounded-lg mb-3 shadow-inner border border-gray-100"
                                style={{ backgroundColor: shade.hex }}
                              />
                              <p className="font-medium text-gray-800 text-xs">{shade.name}</p>
                              <p className="text-xs text-gray-500 uppercase mb-1">{shade.hex}</p>
                              {shade.description && (
                                <p className="text-xs text-gray-400">{shade.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shop Products Section */}
                  {productRecommendations && (
                    <div className="mt-6 pt-6 border-t border-pink-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <ShoppingBag className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                          Shop {activeMakeupTab.charAt(0).toUpperCase() + activeMakeupTab.slice(1)} Products
                        </h3>
                        <button
                          onClick={() => setShowProducts(!showProducts)}
                          className="text-sm font-medium px-3 py-1 rounded-full transition-all"
                          style={{ 

                            backgroundColor: showProducts ? selectedSubtype.colors[0].hex : getVisibleBgTint(selectedSubtype.colors[0].hex),
                            color: showProducts ? 'white' : getVisibleTextColor(selectedSubtype.colors[0].hex)
                          }}

                        >
                          {showProducts ? 'Hide Products' : 'Show Products'}
                        </button>
                      </div>
                      
                      {showProducts && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {productRecommendations[activeMakeupTab]?.map((product, idx) => (
                            <a
                              key={idx}
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all group"
                            >
                              <div 
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: getVisibleBgTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex) }}
                              >
                                <ShoppingBag className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex) }} />

                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 text-sm truncate group-hover:text-pink-600 transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">{product.brand}</p>
                                {product.shade && (
                                  <p className="text-xs text-gray-400">Shade: {product.shade}</p>
                                )}
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="flex items-center gap-1 text-xs text-pink-500 group-hover:text-pink-600">
                                  <span>Shop</span>
                                  <ExternalLink className="w-3 h-3" />
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                      
                      {!showProducts && (
                        <p className="text-sm text-gray-500 italic">
                          Click "Show Products" to see curated product recommendations from MAC, NARS, Charlotte Tilbury, and more.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Makeup Tips */}
                  <div className="mt-6 pt-6 border-t border-pink-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                      Makeup Tips for {selectedSubtype.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {makeupPalette.tips.map((tip, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100"
                        >
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                            style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                          >
                            {idx + 1}
                          </div>
                          <p className="text-sm text-gray-600">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Premium Gate for Makeup Guide */
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl overflow-hidden shadow-sm border border-pink-100">
                  {/* Preview header */}
                  <div className="p-6 border-b border-pink-100">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${selectedSubtype.colors[0].hex}20` }}
                      >
                        <Smile className="w-6 h-6" style={{ color: selectedSubtype.colors[0].hex }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-serif text-gray-900">Makeup Guide</h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Perfect colors for your {selectedSubtype.name} coloring</p>
                      </div>
                    </div>
                  </div>

                  {/* Blurred preview */}
                  <div className="relative">
                    <div className="p-6 filter blur-sm pointer-events-none">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['Eyeshadow', 'Mascara', 'Lipstick', 'Blush', 'Foundation'].map((tab, idx) => (
                          <div 
                            key={tab}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${idx === 0 ? 'text-white' : 'bg-white text-gray-400 border border-gray-200'}`}
                            style={idx === 0 ? { backgroundColor: selectedSubtype.colors[0].hex } : {}}
                          >
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[...Array(6)].map((_, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div 
                              className="w-full h-16 rounded-lg mb-3"
                              style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                            />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overlay with lock */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-center">
                      <div className="text-center px-6">
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${selectedSubtype.colors[0].hex}, ${selectedSubtype.colors[1].hex})` }}
                        >
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2">Unlock Makeup Guide & Shop</h3>
                        <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                          Get personalized makeup color recommendations and shop curated products for your {selectedSubtype.name} coloring.
                        </p>
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
                          {[
                            'Eyeshadow, lipstick, blush & foundation colors',
                            'Curated product recommendations',
                            'Foundation undertone guidance',
                            'Expert makeup tips for your type'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}20` }}
                              >
                                <Sparkles className="w-3 h-3" style={{ color: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }} />
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={onUpgradeToPremium}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Crown className="w-5 h-5" />
                          Upgrade to Premium
                        </button>
                        <p className="mt-3 text-xs text-gray-500">Starting at $9.99/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}


            {/* NAIL COLOR GUIDE SECTION - Only for subtypes - PREMIUM FEATURE */}
            {selectedSubtype && nailPalette && (
              canViewGuides ? (
                <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-8 shadow-sm border border-rose-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: getVisibleBgTintDeep(selectedSubtype.colors[1].hex) }}
                    >
                      <Gem className="w-6 h-6" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />

                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-gray-900">Nail Color Guide</h2>
                      <p className="text-sm text-gray-500">Perfect polish colors for your {selectedSubtype.name} coloring</p>
                    </div>
                  </div>

                  {/* Nail Category Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      { id: 'everyday', label: 'Everyday Neutrals', icon: Palette },
                      { id: 'bold', label: 'Bold Statement', icon: Sparkles },
                      { id: 'seasonal', label: 'Seasonal Picks', icon: Calendar },
                      { id: 'special', label: 'Special Occasion', icon: PartyPopper }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveNailTab(id as typeof activeNailTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          activeNailTab === id
                            ? 'shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                        style={activeNailTab === id ? { backgroundColor: selectedSubtype.colors[1].hex, color: getContrastTextOnBg(selectedSubtype.colors[1].hex) } : {}}

                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Nail Color Display */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      {activeNailTab === 'everyday' && <Palette className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />}
                      {activeNailTab === 'bold' && <Sparkles className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />}
                      {activeNailTab === 'seasonal' && <Calendar className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />}
                      {activeNailTab === 'special' && <PartyPopper className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />}

                      {activeNailTab === 'everyday' && 'Everyday Neutrals'}
                      {activeNailTab === 'bold' && 'Bold Statement Colors'}
                      {activeNailTab === 'seasonal' && 'Seasonal Picks'}
                      {activeNailTab === 'special' && 'Special Occasion Shades'}
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(activeNailTab === 'everyday' ? nailPalette.everydayNeutrals :
                        activeNailTab === 'bold' ? nailPalette.boldStatement :
                        activeNailTab === 'seasonal' ? nailPalette.seasonalPicks :
                        nailPalette.specialOccasion
                      ).map((color, idx) => (
                        <div 
                          key={idx}
                          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                        >
                          {/* Nail shape swatch */}
                          <div className="relative mb-3">
                            <div 
                              className="w-full h-20 rounded-t-full rounded-b-lg shadow-inner"
                              style={{ backgroundColor: color.hex }}
                            />
                            {color.finish && (
                              <span 
                                className="absolute bottom-1 right-1 px-2 py-0.5 text-xs font-medium rounded-full bg-white/90 text-gray-600 capitalize"
                              >
                                {color.finish}
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                          <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                          {color.brand && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <p className="text-xs text-gray-600 font-medium">{color.brand}</p>
                              {color.productName && (
                                <p className="text-xs text-gray-400 truncate">{color.productName}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Finishes */}
                  <div className="mt-6 pt-6 border-t border-rose-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                      <Brush className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />
                      Recommended Finishes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {nailPalette.recommendedFinishes.map((finish, idx) => (
                        <span 
                          key={idx}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: getVisibleBgTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex),
                            color: getVisibleTextColor(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex),
                            border: `1px solid ${getVisibleBorderTint(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex)}`
                          }}
                        >
                          {finish}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nail Art Tips */}
                  <div className="mt-6 pt-6 border-t border-rose-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />
                        Nail Art Ideas
                      </h3>
                      <button
                        onClick={() => setShowNailArt(!showNailArt)}
                        className="text-sm font-medium px-3 py-1 rounded-full transition-all"
                        style={{ 
                          backgroundColor: showNailArt ? selectedSubtype.colors[1].hex : getVisibleBgTint(selectedSubtype.colors[1].hex),
                          color: showNailArt ? getContrastTextOnBg(selectedSubtype.colors[1].hex) : getVisibleTextColor(selectedSubtype.colors[1].hex)
                        }}
                      >
                        {showNailArt ? 'Hide Ideas' : 'Show Ideas'}
                      </button>
                    </div>

                    
                    {showNailArt && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {nailPalette.nailArtTips.map((tip, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span 
                                className="px-2 py-0.5 text-xs font-medium rounded-full capitalize"
                                style={{ 
                                  backgroundColor: tip.difficulty === 'easy' ? '#10B98120' : 
                                                   tip.difficulty === 'medium' ? '#F59E0B20' : '#EF444420',
                                  color: tip.difficulty === 'easy' ? '#10B981' : 
                                         tip.difficulty === 'medium' ? '#F59E0B' : '#EF4444'
                                }}
                              >
                                {tip.difficulty}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">{tip.pattern}</h4>
                            <p className="text-sm text-gray-600">{tip.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {!showNailArt && (
                      <p className="text-sm text-gray-500 italic">
                        Click "Show Ideas" to see nail art patterns and designs perfect for your elemental type.
                      </p>
                    )}
                  </div>

                  {/* General Tips */}
                  <div className="mt-6 pt-6 border-t border-rose-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5" style={{ color: getVisibleIconColor(selectedSubtype.colors[1].hex) }} />

                      Nail Tips for {selectedSubtype.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {nailPalette.generalTips.map((tip, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100"
                        >
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                            style={{ backgroundColor: getVisibleCircleBg(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex), color: getContrastTextOnBg(getVisibleCircleBg(selectedSubtype.colors[idx % selectedSubtype.colors.length].hex)) }}
                          >
                            {idx + 1}
                          </div>

                          <p className="text-sm text-gray-600">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Premium Gate for Nail Color Guide */
                <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl overflow-hidden shadow-sm border border-rose-100">
                  {/* Preview header */}
                  <div className="p-6 border-b border-rose-100">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${selectedSubtype.colors[1].hex}20` }}
                      >
                        <Gem className="w-6 h-6" style={{ color: selectedSubtype.colors[1].hex }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-serif text-gray-900">Nail Color Guide</h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Perfect polish colors for your {selectedSubtype.name} coloring</p>
                      </div>
                    </div>
                  </div>

                  {/* Blurred preview */}
                  <div className="relative">
                    <div className="p-6 filter blur-sm pointer-events-none">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['Everyday', 'Bold', 'Seasonal', 'Special'].map((tab, idx) => (
                          <div 
                            key={tab}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${idx === 0 ? 'text-white' : 'bg-white text-gray-400 border border-gray-200'}`}
                            style={idx === 0 ? { backgroundColor: selectedSubtype.colors[1].hex } : {}}
                          >
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[...Array(4)].map((_, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div 
                              className="w-full h-20 rounded-t-full rounded-b-lg mb-3"
                              style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                            />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overlay with lock */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-center">
                      <div className="text-center px-6">
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${selectedSubtype.colors[1].hex}, ${selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex})` }}
                        >
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2">Unlock Nail Color Guide</h3>
                        <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                          Get personalized nail polish recommendations from OPI, Essie, Zoya and more for your {selectedSubtype.name} coloring.
                        </p>
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
                          {[
                            'Everyday neutrals & bold statement colors',
                            'Seasonal picks & special occasion shades',
                            'Product recommendations from top brands',
                            'Nail art ideas & finish recommendations'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}20` }}
                              >
                                <Sparkles className="w-3 h-3" style={{ color: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }} />
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={onUpgradeToPremium}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Crown className="w-5 h-5" />
                          Upgrade to Premium
                        </button>
                        <p className="mt-3 text-xs text-gray-500">Starting at $9.99/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}


            {/* HAIR COLOR GUIDE SECTION - Only for subtypes - PREMIUM FEATURE */}
            {selectedSubtype && (() => {
              const elementHairData = hairColorData.find(e => e.elementId === type.id);
              const subtypeHairGuide = elementHairData?.subtypeGuides.find(s => s.subtypeId === selectedSubtype.id);
              
              if (!elementHairData || !subtypeHairGuide) return null;
              
              return canViewGuides ? (
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 shadow-sm border border-amber-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: getVisibleBgTintDeep(selectedSubtype.colors[0].hex) }}
                    >
                      <Scissors className="w-6 h-6" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-serif text-gray-900">Hair Color Guide</h2>
                      <p className="text-sm text-gray-500">Perfect hair colors for your {selectedSubtype.name} coloring</p>
                    </div>
                  </div>

                  {/* Element Overview */}
                  <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${selectedSubtype.colors[0].hex}08` }}>
                    <p className="text-gray-700 text-sm leading-relaxed">{elementHairData.overview}</p>
                  </div>

                  {/* General Tips */}
                  <div className="mb-6 grid sm:grid-cols-2 gap-3">
                    {elementHairData.generalTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subtype Tips */}
                  <div 
                    className="mb-6 p-4 rounded-xl"
                    style={{ backgroundColor: `${selectedSubtype.colors[1].hex}10` }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" style={{ color: selectedSubtype.colors[0].hex }} />
                      Tips for {selectedSubtype.name}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {subtypeHairGuide.tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                          />
                          <span className="text-gray-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                    {subtypeHairGuide.celebrityExamples.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Celebrity Examples:</span>{' '}
                          {subtypeHairGuide.celebrityExamples.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hair Color Category Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {subtypeHairGuide.bestColors.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setActiveHairCategory(category.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          activeHairCategory === category.name
                            ? 'shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                        style={activeHairCategory === category.name ? { backgroundColor: selectedSubtype.colors[0].hex, color: getContrastTextOnBg(selectedSubtype.colors[0].hex) } : {}}

                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Hair Color Display */}
                  {subtypeHairGuide.bestColors.map((category) => (
                    activeHairCategory === category.name && (
                      <div key={category.name} className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
                          <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {category.colors.map((color, idx) => (
                            <div 
                              key={idx}
                              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                            >
                              <div 
                                className="w-full h-16 rounded-lg mb-3 shadow-inner"
                                style={{ backgroundColor: color.hex }}
                              />
                              <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                              <p className="text-xs text-gray-500 uppercase mb-1">{color.hex}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{color.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  color.undertone === 'warm' ? 'bg-orange-100 text-orange-700' :
                                  color.undertone === 'cool' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {color.undertone}
                                </span>
                                <span className="text-xs text-gray-400 capitalize">{color.intensity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}

                  {/* Colors to Avoid */}
                  <div className="mt-6 pt-6 border-t border-amber-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500" />
                        Colors to Avoid
                      </h3>
                      <button
                        onClick={() => setShowHairAvoid(!showHairAvoid)}
                        className="text-sm font-medium px-3 py-1 rounded-full transition-all"
                        style={{ 
                          backgroundColor: showHairAvoid ? '#EF4444' : '#FEE2E2',
                          color: showHairAvoid ? 'white' : '#EF4444'
                        }}
                      >
                        {showHairAvoid ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    {showHairAvoid && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {subtypeHairGuide.avoidColors.map((color, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg shadow-inner flex-shrink-0 relative"
                              style={{ backgroundColor: color.hex }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div 
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: getVisibleCircleBg(color.hex), opacity: 0.85 }}
                                >
                                  <X className="w-4 h-4 drop-shadow-sm" style={{ color: getContrastTextOnBg(getVisibleCircleBg(color.hex)) }} />
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-xs">{color.name}</p>
                              <p className="text-xs text-red-600 line-clamp-2">{color.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {!showHairAvoid && (
                      <p className="text-sm text-gray-500 italic">
                        Click "Show" to see hair colors that may not complement your {selectedSubtype.name} coloring.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Premium Gate for Hair Color Guide */
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl overflow-hidden shadow-sm border border-amber-100">
                  {/* Preview header */}
                  <div className="p-6 border-b border-amber-100">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: getVisibleBgTintDeep(selectedSubtype.colors[0].hex) }}
                      >
                        <Scissors className="w-6 h-6" style={{ color: getVisibleIconColor(selectedSubtype.colors[0].hex) }} />

                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-serif text-gray-900">Hair Color Guide</h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Perfect hair colors for your {selectedSubtype.name} coloring</p>
                      </div>
                    </div>
                  </div>

                  {/* Blurred preview */}
                  <div className="relative">
                    <div className="p-6 filter blur-sm pointer-events-none">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['Natural Shades', 'Fashion Colors', 'Highlights'].map((tab, idx) => (
                          <div 
                            key={tab}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${idx === 0 ? 'text-white' : 'bg-white text-gray-400 border border-gray-200'}`}
                            style={idx === 0 ? { backgroundColor: selectedSubtype.colors[0].hex } : {}}
                          >
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[...Array(4)].map((_, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div 
                              className="w-full h-16 rounded-lg mb-3"
                              style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                            />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overlay with lock */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-center">
                      <div className="text-center px-6">
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${selectedSubtype.colors[0].hex}, ${selectedSubtype.colors[1].hex})` }}
                        >
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2">Unlock Hair Color Guide</h3>
                        <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                          Get personalized hair color recommendations for your {selectedSubtype.name} coloring.
                        </p>
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
                          {[
                            'Natural, fashion & highlight color options',
                            'Warm, cool & neutral undertone guidance',
                            'Celebrity examples for inspiration',
                            'Colors to avoid for your type'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}20` }}
                              >
                                <Sparkles className="w-3 h-3" style={{ color: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }} />
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={onUpgradeToPremium}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Crown className="w-5 h-5" />
                          Upgrade to Premium
                        </button>
                        <p className="mt-3 text-xs text-gray-500">Starting at $9.99/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}


            {/* JEWELRY GUIDE SECTION - Only for subtypes - PREMIUM FEATURE */}
            {selectedSubtype && jewelryGuide && (

              canViewGuides ? (
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-sm border border-pink-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex}20` }}
                    >
                      <Gem className="w-6 h-6" style={{ color: selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-gray-900">Jewelry Guide</h2>
                      <p className="text-sm text-gray-500">Perfect metals, gemstones & accessories for your {selectedSubtype.name} coloring</p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${selectedSubtype.colors[0].hex}08` }}>
                    <p className="text-gray-700 text-sm leading-relaxed">{jewelryGuide.overview}</p>
                  </div>

                  {/* Undertone Explanation */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${visibleJewelryIconColor}15` }}>
                        <Info className="w-5 h-5" style={{ color: visibleJewelryIconColor }} />

                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Understanding Your Undertones</h4>
                        <p className="text-sm text-gray-600">{jewelryGuide.undertoneExplanation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metals Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleJewelrySection('metals')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSubtype.colors[0].hex}15` }}>
                          <Sparkles className="w-5 h-5" style={{ color: selectedSubtype.colors[0].hex }} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Metal Recommendations</h3>
                          <p className="text-xs text-gray-500">Gold, silver, rose gold, and more</p>
                        </div>
                      </div>
                      {expandedJewelrySections.includes('metals') ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {expandedJewelrySections.includes('metals') && (
                      <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {jewelryGuide.metals.map((metal, idx) => (
                            <div key={idx} className={`p-3 rounded-xl border-2 ${getRatingColor(metal.rating)}`}>
                              <div className="flex items-center gap-3 mb-2">
                                <div 
                                  className="w-10 h-10 rounded-full border-4 border-white shadow-md"
                                  style={{ backgroundColor: metal.hex }}
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{metal.name}</h4>
                                  <div className="flex items-center gap-1 text-xs font-medium">
                                    {getRatingIcon(metal.rating)}
                                    <span className="capitalize">{metal.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs opacity-80">{metal.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gemstones Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleJewelrySection('gemstones')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSubtype.colors[1].hex}15` }}>
                          <Gem className="w-5 h-5" style={{ color: selectedSubtype.colors[1].hex }} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Gemstone Recommendations</h3>
                          <p className="text-xs text-gray-500">Precious and semi-precious stones</p>
                        </div>
                      </div>
                      {expandedJewelrySections.includes('gemstones') ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {expandedJewelrySections.includes('gemstones') && (
                      <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {jewelryGuide.gemstones.map((gem, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-3 mb-2">
                                <div 
                                  className="w-8 h-8 rounded-lg shadow-inner"
                                  style={{ backgroundColor: gem.hex }}
                                />
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900">{gem.name}</h4>
                                  {gem.occasion && (
                                    <span className="text-xs text-gray-500">{gem.occasion}</span>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{gem.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Jewelry Styles Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleJewelrySection('styles')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex}15` }}>
                          <Sparkles className="w-5 h-5" style={{ color: selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex }} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Jewelry Styles</h3>
                          <p className="text-xs text-gray-500">Delicate vs statement and more</p>
                        </div>
                      </div>
                      {expandedJewelrySections.includes('styles') ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {expandedJewelrySections.includes('styles') && (
                      <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {jewelryGuide.styles.map((style, idx) => (
                            <div 
                              key={idx} 
                              className="p-4 rounded-xl border border-gray-200"
                              style={{ backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}08` }}
                            >
                              <h4 className="font-semibold text-gray-900 mb-2">{style.name}</h4>
                              <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                              <div className="space-y-1">
                                {style.examples.map((example, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div 
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                                    />
                                    {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accessories Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => toggleJewelrySection('accessories')}
                      className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${visibleJewelryIconColor}15` }}>
                          <ShoppingBag className="w-5 h-5" style={{ color: visibleJewelryIconColor }} />

                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Accessory Colors</h3>
                          <p className="text-xs text-gray-500">Bags, watches, eyewear & more</p>
                        </div>
                      </div>
                      {expandedJewelrySections.includes('accessories') ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {expandedJewelrySections.includes('accessories') && (
                      <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
                        {/* Accessory Colors */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                          {jewelryGuide.accessoryColors.map((color, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-10 h-10 rounded-lg shadow-md border-2 border-white"
                                  style={{ backgroundColor: color.hex }}
                                />
                                <h4 className="font-semibold text-sm text-gray-900">{color.name}</h4>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {color.items.map((item, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Watch & Eyewear */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                              <Watch className="w-4 h-4 text-gray-600" />
                              <h4 className="font-semibold text-sm text-gray-900">Watch Recommendations</h4>
                            </div>
                            <ul className="space-y-1">
                              {jewelryGuide.watchRecommendations.map((item, idx) => (
                                <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                  <div 
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-2 mb-2">
                              <Glasses className="w-4 h-4 text-gray-600" />
                              <h4 className="font-semibold text-sm text-gray-900">Eyewear Colors</h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {jewelryGuide.eyewearColors.map((color, idx) => (
                                <span key={idx} className="px-2 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200">
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tips & Avoid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Pro Tips
                      </h3>
                      <ul className="space-y-2">
                        {jewelryGuide.tips.slice(0, 4).map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-emerald-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <X className="w-5 h-5" />
                        What to Avoid
                      </h3>
                      <ul className="space-y-2">
                        {jewelryGuide.avoidList.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-red-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* Premium Gate for Jewelry Guide */
                <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl overflow-hidden shadow-sm border border-pink-100">
                  {/* Preview header */}
                  <div className="p-6 border-b border-pink-100">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex}20` }}
                      >
                        <Gem className="w-6 h-6" style={{ color: selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-serif text-gray-900">Jewelry Guide</h2>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                            <Crown className="w-3 h-3" />
                            Premium
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Perfect metals, gemstones & accessories for your {selectedSubtype.name} coloring</p>
                      </div>
                    </div>
                  </div>

                  {/* Blurred preview */}
                  <div className="relative">
                    <div className="p-6 filter blur-sm pointer-events-none">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-8 h-8 rounded-full"
                                style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                              />
                              <div className="h-4 bg-gray-200 rounded w-16" />
                            </div>
                            <div className="h-3 bg-gray-100 rounded w-full" />
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[...Array(4)].map((_, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-6 h-6 rounded-lg"
                                style={{ backgroundColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                              />
                              <div className="h-3 bg-gray-200 rounded w-20" />
                            </div>
                            <div className="h-2 bg-gray-100 rounded w-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Overlay with lock */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent flex items-center justify-center">
                      <div className="text-center px-6">
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${selectedSubtype.colors[2]?.hex || selectedSubtype.colors[0].hex}, ${selectedSubtype.colors[0].hex})` }}
                        >
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-serif text-gray-900 mb-2">Unlock Jewelry Guide</h3>
                        <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                          Get personalized jewelry recommendations for your {selectedSubtype.name} coloring.
                        </p>
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
                          {[
                            'Metal recommendations (gold, silver, rose gold)',
                            'Gemstone guide for your undertone',
                            'Jewelry style recommendations',
                            'Watch, eyewear & accessory colors'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}20` }}
                              >
                                <Sparkles className="w-3 h-3" style={{ color: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }} />
                              </div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={onUpgradeToPremium}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Crown className="w-5 h-5" />
                          Upgrade to Premium
                        </button>
                        <p className="mt-3 text-xs text-gray-500">Starting at $9.99/month</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}



            {/* Famous Faces Section (only for subtypes with famousFaces data) */}
            {selectedSubtype && selectedSubtype.famousFaces && selectedSubtype.famousFaces.length > 0 && (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#00000015' }}
                  >
                    <Star className="w-6 h-6" style={{ color: '#000000' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-gray-900">Famous Faces</h2>
                    <p className="text-sm text-gray-500">Celebrities and characters who share your coloring</p>
                  </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedSubtype.famousFaces.map((face, idx) => (
                    <div 
                      key={idx}
                      className="flex gap-4 p-4 rounded-xl transition-all hover:shadow-md"
                      style={{ 
                        backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}08`,
                        border: `1px solid ${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}15`
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div 
                          className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-md"
                          style={{ borderColor: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex }}
                        >
                          <img 
                            src={face.image} 
                            alt={face.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"><span class="text-2xl font-bold text-gray-400">${face.name.charAt(0)}</span></div>`;
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">{face.name}</h4>
                          {face.category === 'celebrity' && (
                            <Crown className="w-4 h-4 flex-shrink-0" style={{ color: selectedSubtype.colors[0].hex }} />
                          )}
                          {face.category === 'fictional' && (
                            <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: selectedSubtype.colors[0].hex }} />
                          )}
                          {face.category === 'historical' && (
                            <Star className="w-4 h-4 flex-shrink-0" style={{ color: selectedSubtype.colors[0].hex }} />
                          )}
                        </div>
                        <span 
                          className="inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 capitalize"
                          style={{ 
                            backgroundColor: `${selectedSubtype.colors[idx % selectedSubtype.colors.length].hex}15`,
                            color: selectedSubtype.colors[idx % selectedSubtype.colors.length].hex
                          }}
                        >
                          {face.category}
                        </span>
                        <p className="text-sm text-gray-600 line-clamp-3">{face.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included tools banner — bottom of page so it feels like "there's more" */}
            {selectedSubtype && showColorToolsBanner && (() => {
              const c0 = selectedSubtype.colors[0].hex;
              return (
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm">
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-60"
                  style={{ background: `radial-gradient(circle, ${c0}22, transparent 70%)` }}
                  aria-hidden="true"
                />
                <div className="relative p-6 md:p-9">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-white border border-gray-200 shadow-sm">
                      <Sparkles className="w-4 h-4" style={{ color: c0 }} />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Included with your profile
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">
                      Your reflection doesn&apos;t stop here.
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      Test any color instantly with the Color Analyzer, or let the Wardrobe Analyzer show you what in your closet already speaks your elemental language — and what&apos;s been quietly working against you.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => onOpenColorAnalyzer?.()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:-translate-y-0.5 transition-all"
                      >
                        <Camera className="w-4 h-4" style={{ color: c0 }} />
                        Try the Color Analyzer
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenWardrobeAnalyzer?.()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:-translate-y-0.5 transition-all"
                      >
                        <Shirt className="w-4 h-4" style={{ color: c0 }} />
                        Try the Wardrobe Analyzer
                      </button>
                    </div>
                  </div>

                  <div className="mt-7 pt-7 border-t border-gray-200 max-w-2xl">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                      Connect with others on the same elemental path — share your reflection, and see theirs.
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenCommunityForum?.()}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 transition-all"
                    >
                      <Users className="w-4 h-4" style={{ color: c0 }} />
                      Explore the Community Forum
                    </button>
                  </div>
                </div>
              </div>
              );
            })()}
          </div>



          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Share Your Colors</h3>
                  <p className="text-sm text-gray-500">Show off your elemental type</p>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Create Shareable Card
              </button>
            </div>

            {/* Quick Colors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {selectedSubtype ? `${selectedSubtype.name} Signature Colors` : 'Your Signature Colors'}
              </h3>
              <div className="space-y-3">
                {(selectedSubtype?.colors || type.colors).filter(c => c.category === 'primary').map((color, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg shadow-sm border border-gray-100"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{color.name}</p>
                      <p className="text-xs text-gray-400 uppercase">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Best Worn With</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedSubtype?.colors || type.colors).filter(c => c.category === 'neutral').map((color, idx) => (
                    <div 
                      key={idx}
                      className="w-8 h-8 rounded-full shadow-sm border border-gray-100"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Accent Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedSubtype?.colors || type.colors).filter(c => c.category === 'accent').map((color, idx) => (
                    <div 
                      key={idx}
                      className="w-8 h-8 rounded-full shadow-sm border border-gray-100"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Season info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{type.season} Season</h4>
                  <p className="text-sm text-gray-600">
                    {type.name} types belong to the {type.season} seasonal color palette, characterized by 
                    {type.season === 'Winter' && ' cool undertones, high contrast, and clear, saturated colors.'}
                    {type.season === 'Summer' && ' cool undertones, soft contrast, and muted, dusty colors.'}
                    {type.season === 'Autumn' && ' warm undertones, rich depth, and earthy, muted colors.'}
                    {type.season === 'Spring' && ' warm undertones, clear brightness, and fresh, vibrant colors.'}
                  </p>
                </div>
              </div>

              {/* Other subtypes */}
              {selectedSubtype && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-gray-800 mb-3">Other {type.name} Subtypes</h4>
                  <div className="space-y-2">
                    {type.subtypes.filter(s => s.id !== selectedSubtype.id).map((subtype) => (
                      <button
                        key={subtype.id}
                        onClick={() => setSelectedSubtype(subtype)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex -space-x-1">
                          {subtype.colors.slice(0, 3).map((color, idx) => (
                            <div 
                              key={idx}
                              className="w-5 h-5 rounded-full border border-white"
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-700">{subtype.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </MaybeLockedOverlay>
      </div>

      {/* Social Share Modal */}
      <SocialShareCard
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        elementalType={type}
        subtype={selectedSubtype}
      />
    </div>
  );
};

export default ElementalTypeDetail;
