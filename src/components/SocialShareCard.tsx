import React, { useRef, useState, useEffect } from 'react';
import { 
  Share2, 
  Download, 
  X, 
  Copy, 
  Check,
  Sparkles,
  Palette,
  ExternalLink,
  Image,
  Layout,
  Wand2,
  ChevronRight,
  ChevronLeft,
  Shirt,
  Heart,
  Star,
  Droplets,
  Flame,
  Wind,
  Mountain
} from 'lucide-react';
import { ElementalType, ElementalSubtype, ColorSwatch } from '@/data/elementalTypes';
import { toast } from '@/components/ui/use-toast';

interface SocialShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  elementalType: ElementalType;
  subtype?: ElementalSubtype | null;
  userName?: string;
}

// Social media icons as SVG components
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

// Style tips for each element
const styleTips: Record<string, string[]> = {
  fire: [
    "Embrace bold statement pieces that command attention",
    "Layer with confidence using high-contrast combinations",
    "Accessorize with silver or platinum metals for maximum impact",
    "Choose structured silhouettes that project power",
    "Don't shy away from dramatic prints and textures"
  ],
  water: [
    "Flow with soft, draped fabrics that move gracefully",
    "Layer delicate pieces for an ethereal effect",
    "Choose rose gold or soft silver accessories",
    "Embrace romantic, flowing silhouettes",
    "Mix dusty tones for sophisticated depth"
  ],
  earth: [
    "Ground your look with rich, natural textures",
    "Layer warm tones for cozy sophistication",
    "Choose gold or bronze accessories for warmth",
    "Embrace organic fabrics like linen and wool",
    "Mix earthy neutrals with pops of terracotta or olive"
  ],
  air: [
    "Keep it light and fresh with flowing fabrics",
    "Mix warm pastels for a youthful glow",
    "Choose gold or rose gold for sunny radiance",
    "Embrace playful prints and cheerful patterns",
    "Layer light pieces for effortless elegance"
  ]
};

// Pre-written captions for each platform
const getCaptions = (displayName: string, elementName: string, seasonalName: string) => ({
  twitter: `Just discovered I'm a ${displayName}! ✨ My elemental color type is ${elementName} (${seasonalName}). Finally understanding why certain colors make me glow! 🎨\n\nDiscover your colors too 👇`,
  facebook: `I just took the Elemental Color Analysis quiz and discovered I'm a ${displayName}! 🌟\n\nAs a ${elementName} element with a ${seasonalName} palette, I finally understand which colors bring out my natural radiance.\n\nThis explains so much about my style preferences! Anyone else curious about their elemental type?`,
  pinterest: `${displayName} Color Palette | ${elementName} Element | ${seasonalName} Season | Personal Color Analysis | Style Guide | Fashion Colors`,
  instagram: `✨ I'm a ${displayName} ✨\n\n${elementName} Element • ${seasonalName}\n\nFinally discovered my true colors! This elemental color analysis has completely changed how I see my wardrobe. 🎨\n\nSwipe to see my personal color palette →\n\n#ElementalColorIdentity #ColorAnalysis #${elementName} #${seasonalName.replace(' ', '')} #PersonalStyle #ColorPalette #StyleGuide #FashionColors`,
  tiktok: `POV: You just discovered you're a ${displayName} and suddenly your whole wardrobe makes sense 🤯✨ #coloranalysis #${elementName.toLowerCase()} #${seasonalName.toLowerCase().replace(' ', '')} #personalstyle #fashiontiktok`
});

// Background patterns
type BackgroundStyle = 'gradient' | 'geometric' | 'organic' | 'minimal' | 'luxe';
type CardLayout = 'classic' | 'modern' | 'editorial' | 'story' | 'square';

const SocialShareCard: React.FC<SocialShareCardProps> = ({
  isOpen,
  onClose,
  elementalType,
  subtype,
  userName
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpg'>('png');
  const [selectedTemplate, setSelectedTemplate] = useState<CardLayout>('classic');
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>('gradient');
  const [showCustomize, setShowCustomize] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'captions'>('preview');
  const [copiedCaption, setCopiedCaption] = useState<string | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const activeColors = subtype?.colors || elementalType.colors;
  const displayName = subtype?.name || elementalType.name;
  const seasonalName = subtype?.seasonalName || elementalType.season;
  const tips = styleTips[elementalType.id] || styleTips.fire;
  const captions = getCaptions(displayName, elementalType.name, seasonalName);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareText = `I discovered my elemental color type! I'm a ${displayName} (${elementalType.name} Element, ${seasonalName}). Discover your colors too!`;
  const shareHashtags = ['ElementalColorIdentity', 'ColorAnalysis', elementalType.name, seasonalName.replace(' ', ''), 'StylePersonality'];

  // Rotate style tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  // Get element icon
  const getElementIcon = () => {
    switch (elementalType.id) {
      case 'fire': return <Flame className="w-6 h-6" />;
      case 'water': return <Droplets className="w-6 h-6" />;
      case 'earth': return <Mountain className="w-6 h-6" />;
      case 'air': return <Wind className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  // Generate share URLs for each platform
  const getTwitterShareUrl = () => {
    const text = encodeURIComponent(captions.twitter);
    const url = encodeURIComponent(shareUrl);
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  };

  const getFacebookShareUrl = () => {
    const url = encodeURIComponent(shareUrl);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(captions.facebook)}`;
  };

  const getPinterestShareUrl = () => {
    const url = encodeURIComponent(shareUrl);
    const description = encodeURIComponent(captions.pinterest);
    return `https://pinterest.com/pin/create/button/?url=${url}&description=${description}`;
  };

  const copyCaption = async (platform: string, caption: string) => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedCaption(platform);
      toast({ title: `${platform} caption copied!` });
      setTimeout(() => setCopiedCaption(null), 2000);
    } catch (err) {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ title: 'Failed to copy', variant: 'destructive' });
    }
  };

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    
    setDownloading(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false
      });
      
      const link = document.createElement('a');
      const filename = `${displayName.toLowerCase().replace(/\s+/g, '-')}-color-palette`;
      
      if (downloadFormat === 'jpg') {
        link.download = `${filename}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
      } else {
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL('image/png');
      }
      
      link.click();
      toast({ title: `Image downloaded as ${downloadFormat.toUpperCase()}!` });
    } catch (err) {
      console.error('Error generating image:', err);
      toast({ title: 'Failed to download image', variant: 'destructive' });
    } finally {
      setDownloading(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Elemental Color Type: ${displayName}`,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes');
  };

  // Get background based on style
  const getBackground = () => {
    const primary = activeColors[0]?.hex || '#6366f1';
    const secondary = activeColors[1]?.hex || activeColors[0]?.hex || '#8b5cf6';
    const tertiary = activeColors[2]?.hex || secondary;

    switch (backgroundStyle) {
      case 'gradient':
        return `linear-gradient(135deg, ${primary}, ${secondary}, ${tertiary})`;
      case 'geometric':
        return `linear-gradient(135deg, ${primary} 0%, ${primary} 50%, ${secondary} 50%, ${secondary} 100%)`;
      case 'organic':
        return `radial-gradient(ellipse at 20% 80%, ${primary}90 0%, transparent 50%), 
                radial-gradient(ellipse at 80% 20%, ${secondary}90 0%, transparent 50%), 
                radial-gradient(ellipse at 50% 50%, ${tertiary}90 0%, transparent 70%),
                ${primary}`;
      case 'minimal':
        return `linear-gradient(180deg, ${primary}15, ${secondary}25)`;
      case 'luxe':
        return `linear-gradient(135deg, ${primary} 0%, ${secondary} 50%, ${primary} 100%)`;
      default:
        return `linear-gradient(135deg, ${primary}, ${secondary})`;
    }
  };

  // Get card dimensions based on layout
  const getCardDimensions = () => {
    switch (selectedTemplate) {
      case 'story': return 'aspect-[9/16] max-w-[280px]';
      case 'square': return 'aspect-square max-w-[400px]';
      case 'editorial': return 'aspect-[4/5] max-w-[360px]';
      case 'modern': return 'aspect-[3/4] max-w-[340px]';
      default: return 'aspect-[4/5] max-w-[380px]';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: getBackground() }}
            >
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-serif text-gray-900">Share Your Colors</h2>
              <p className="text-sm text-gray-500">Create & share your beautiful result card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'preview' 
                ? 'text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Image className="w-4 h-4" />
              Design Card
            </div>
          </button>
          <button
            onClick={() => setActiveTab('captions')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'captions' 
                ? 'text-gray-900 border-b-2 border-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Copy className="w-4 h-4" />
              Captions
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'preview' ? (
            <div className="p-4 md:p-6">
              {/* Customization Toggle */}
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Customize Design</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showCustomize ? 'rotate-90' : ''}`} />
              </button>

              {/* Customization Options */}
              {showCustomize && (
                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {/* Layout Selection */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Layout</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'classic', label: 'Classic', icon: Layout },
                        { id: 'modern', label: 'Modern', icon: Sparkles },
                        { id: 'editorial', label: 'Editorial', icon: Image },
                        { id: 'story', label: 'Story', icon: Palette },
                        { id: 'square', label: 'Square', icon: Star }
                      ].map((layout) => (
                        <button
                          key={layout.id}
                          onClick={() => setSelectedTemplate(layout.id as CardLayout)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedTemplate === layout.id
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          <layout.icon className="w-3 h-3" />
                          {layout.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background Style */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Background Style</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'gradient', label: 'Gradient' },
                        { id: 'geometric', label: 'Geometric' },
                        { id: 'organic', label: 'Organic' },
                        { id: 'minimal', label: 'Minimal' },
                        { id: 'luxe', label: 'Luxe' }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setBackgroundStyle(style.id as BackgroundStyle)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            backgroundStyle === style.id
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Download Format */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Download Format</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'png', label: 'PNG (Best Quality)' },
                        { id: 'jpg', label: 'JPG (Smaller Size)' }
                      ].map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setDownloadFormat(format.id as 'png' | 'jpg')}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            downloadFormat === format.id
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Card */}
              <div className="flex justify-center mb-6">
                <div
                  ref={cardRef}
                  className={`w-full ${getCardDimensions()} rounded-2xl overflow-hidden shadow-xl relative`}
                  style={{ background: backgroundStyle === 'minimal' ? '#ffffff' : getBackground() }}
                >
                  {/* Decorative elements for organic style */}
                  {backgroundStyle === 'organic' && (
                    <>
                      <div 
                        className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-30 blur-2xl"
                        style={{ backgroundColor: activeColors[1]?.hex || '#fff' }}
                      />
                      <div 
                        className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full opacity-30 blur-2xl"
                        style={{ backgroundColor: activeColors[2]?.hex || '#fff' }}
                      />
                    </>
                  )}

                  {/* Minimal background overlay */}
                  {backgroundStyle === 'minimal' && (
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: `linear-gradient(180deg, ${activeColors[0]?.hex}10 0%, ${activeColors[1]?.hex}20 100%)` 
                      }}
                    />
                  )}

                  {/* Card Content */}
                  <div className={`relative z-10 h-full flex flex-col ${
                    backgroundStyle === 'minimal' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {/* Header */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {getElementIcon()}
                        <span className={`text-xs font-medium uppercase tracking-wider ${
                          backgroundStyle === 'minimal' ? 'text-gray-500' : 'opacity-80'
                        }`}>
                          Elemental Color Type
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center px-5 md:px-6">
                      <div className={selectedTemplate === 'story' ? 'text-center' : ''}>
                        <p className={`text-sm mb-1 ${backgroundStyle === 'minimal' ? 'text-gray-500' : 'opacity-70'}`}>
                          {userName ? `${userName} is a` : 'I am a'}
                        </p>
                        <h3 className={`font-serif mb-2 ${
                          selectedTemplate === 'story' ? 'text-3xl' : 'text-4xl md:text-5xl'
                        }`}>
                          {displayName}
                        </h3>
                        <p className={`text-sm mb-4 ${backgroundStyle === 'minimal' ? 'text-gray-600' : 'opacity-80'}`}>
                          {elementalType.name} Element • {seasonalName}
                        </p>

                        {/* Tagline */}
                        <p className={`text-sm italic mb-6 ${
                          backgroundStyle === 'minimal' ? 'text-gray-500' : 'opacity-70'
                        } ${selectedTemplate === 'story' ? 'px-4' : ''}`}>
                          "{elementalType.tagline}"
                        </p>

                        {/* Color Palette */}
                        <div className={`${selectedTemplate === 'story' ? 'flex justify-center' : ''}`}>
                          <div className="flex gap-2 mb-4">
                            {activeColors.filter(c => c.category === 'primary').map((color, idx) => (
                              <div key={idx} className="text-center">
                                <div 
                                  className={`rounded-lg shadow-lg border-2 ${
                                    backgroundStyle === 'minimal' ? 'border-gray-200' : 'border-white/30'
                                  } ${selectedTemplate === 'story' ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'}`}
                                  style={{ backgroundColor: color.hex }}
                                />
                                <p className={`text-[10px] mt-1 truncate max-w-[60px] ${
                                  backgroundStyle === 'minimal' ? 'text-gray-500' : 'opacity-70'
                                }`}>
                                  {color.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Secondary Colors */}
                        <div className={`flex gap-1.5 ${selectedTemplate === 'story' ? 'justify-center' : ''}`}>
                          {activeColors.filter(c => c.category === 'secondary' || c.category === 'accent').slice(0, 6).map((color, idx) => (
                            <div 
                              key={idx}
                              className={`rounded-full shadow-md ${
                                selectedTemplate === 'story' ? 'w-6 h-6' : 'w-7 h-7'
                              } ${backgroundStyle === 'minimal' ? 'border border-gray-200' : 'border border-white/20'}`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Style Tip */}
                    <div className={`px-5 md:px-6 py-4 ${
                      backgroundStyle === 'minimal' 
                        ? 'bg-gray-50 border-t border-gray-100' 
                        : 'bg-black/20 backdrop-blur-sm'
                    }`}>
                      <div className="flex items-start gap-2">
                        <Shirt className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          backgroundStyle === 'minimal' ? 'text-gray-400' : 'opacity-60'
                        }`} />
                        <div>
                          <p className={`text-[10px] uppercase tracking-wider mb-1 ${
                            backgroundStyle === 'minimal' ? 'text-gray-400' : 'opacity-60'
                          }`}>
                            Style Tip
                          </p>
                          <p className={`text-xs leading-relaxed ${
                            backgroundStyle === 'minimal' ? 'text-gray-600' : 'opacity-90'
                          }`}>
                            {tips[currentTipIndex]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className={`px-5 md:px-6 py-3 flex items-center justify-between ${
                      backgroundStyle === 'minimal' ? 'border-t border-gray-100' : ''
                    }`}>
                      <span className={`text-[10px] ${
                        backgroundStyle === 'minimal' ? 'text-gray-400' : 'opacity-50'
                      }`}>
                        elementalcoloridentity.com
                      </span>
                      <div className="flex gap-1">
                        {activeColors.slice(0, 4).map((color, idx) => (
                          <div 
                            key={idx}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download & Share Buttons */}
              <div className="space-y-4">
                {/* Download Button */}
                <button
                  onClick={downloadAsImage}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {downloading ? 'Generating...' : `Download as ${downloadFormat.toUpperCase()}`}
                  </span>
                </button>

                {/* Social Share Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    onClick={() => openShareWindow(getTwitterShareUrl())}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <TwitterIcon />
                    <span className="text-sm font-medium">X</span>
                  </button>
                  
                  <button
                    onClick={() => openShareWindow(getFacebookShareUrl())}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors"
                  >
                    <FacebookIcon />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  
                  <button
                    onClick={() => openShareWindow(getPinterestShareUrl())}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#E60023] text-white rounded-xl hover:bg-[#D50C22] transition-colors"
                  >
                    <PinterestIcon />
                    <span className="text-sm font-medium">Pinterest</span>
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Native Share */}
                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">More Sharing Options</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Captions Tab */
            <div className="p-4 md:p-6 space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Copy these pre-written captions optimized for each platform. Download your card image first, then paste the caption when you share!
              </p>

              {/* Instagram */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                  <div className="flex items-center gap-2 text-white">
                    <InstagramIcon />
                    <span className="font-medium text-sm">Instagram</span>
                  </div>
                  <button
                    onClick={() => copyCaption('instagram', captions.instagram)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    {copiedCaption === 'instagram' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCaption === 'instagram' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{captions.instagram}</p>
                </div>
              </div>

              {/* TikTok */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-black">
                  <div className="flex items-center gap-2 text-white">
                    <TikTokIcon />
                    <span className="font-medium text-sm">TikTok</span>
                  </div>
                  <button
                    onClick={() => copyCaption('tiktok', captions.tiktok)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    {copiedCaption === 'tiktok' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCaption === 'tiktok' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{captions.tiktok}</p>
                </div>
              </div>

              {/* Twitter/X */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-black">
                  <div className="flex items-center gap-2 text-white">
                    <TwitterIcon />
                    <span className="font-medium text-sm">X / Twitter</span>
                  </div>
                  <button
                    onClick={() => copyCaption('twitter', captions.twitter)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    {copiedCaption === 'twitter' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCaption === 'twitter' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{captions.twitter}</p>
                </div>
              </div>

              {/* Facebook */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-[#1877F2]">
                  <div className="flex items-center gap-2 text-white">
                    <FacebookIcon />
                    <span className="font-medium text-sm">Facebook</span>
                  </div>
                  <button
                    onClick={() => copyCaption('facebook', captions.facebook)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    {copiedCaption === 'facebook' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCaption === 'facebook' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{captions.facebook}</p>
                </div>
              </div>

              {/* Pinterest */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-[#E60023]">
                  <div className="flex items-center gap-2 text-white">
                    <PinterestIcon />
                    <span className="font-medium text-sm">Pinterest</span>
                  </div>
                  <button
                    onClick={() => copyCaption('pinterest', captions.pinterest)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    {copiedCaption === 'pinterest' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCaption === 'pinterest' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-gray-50">
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{captions.pinterest}</p>
                </div>
              </div>

              {/* Hashtags */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Suggested Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {shareHashtags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(`#${tag}`);
                        toast({ title: `Copied #${tag}` });
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShareCard;
