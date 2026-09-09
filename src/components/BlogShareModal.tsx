import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Copy, Check, Mail, ExternalLink, Download, Flame, Droplets, Mountain, Wind, Sparkles } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: 'Fire' | 'Water' | 'Earth' | 'Air' | 'General';
  tags: string[];
  image: string;
  featured?: boolean;
}

interface BlogShareModalProps {
  article: BlogArticle;
  onClose: () => void;
}

const categoryGradients: Record<string, { from: string; to: string; accent: string }> = {
  Fire: { from: '#dc2626', to: '#f97316', accent: '#fbbf24' },
  Water: { from: '#2563eb', to: '#06b6d4', accent: '#67e8f9' },
  Earth: { from: '#92400e', to: '#65a30d', accent: '#a3e635' },
  Air: { from: '#7c3aed', to: '#c084fc', accent: '#e9d5ff' },
  General: { from: '#374151', to: '#6b7280', accent: '#d1d5db' },
};

const categoryIcons: Record<string, React.ReactNode> = {
  Fire: <Flame className="w-4 h-4" />,
  Water: <Droplets className="w-4 h-4" />,
  Earth: <Mountain className="w-4 h-4" />,
  Air: <Wind className="w-4 h-4" />,
  General: <Sparkles className="w-4 h-4" />,
};

const BlogShareModal: React.FC<BlogShareModalProps> = ({ article, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'preview'>('share');
  const [cardDownloading, setCardDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradient = categoryGradients[article.category];

  // Generate the shareable URL
  const shareUrl = `${window.location.origin}${window.location.pathname}?article=${article.id}`;
  const shareTitle = article.title;
  const shareText = `${article.excerpt} — Read on Elemental Color Identity Blog`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [shareUrl]);

  const handleShareTwitter = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [shareTitle, shareUrl]);

  const handleShareFacebook = useCallback(() => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  }, [shareTitle, shareUrl]);

  const handleShareEmail = useCallback(() => {
    const subject = encodeURIComponent(`Check out: ${shareTitle}`);
    const body = encodeURIComponent(`I thought you'd enjoy this article from Elemental Color Identity:\n\n${shareTitle}\n\n${article.excerpt}\n\nRead more: ${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [shareTitle, shareUrl, article.excerpt]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    }
  }, [shareTitle, shareUrl, article.excerpt]);

  // Generate shareable card image on canvas
  const generateShareCard = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCardDownloading(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, gradient.from);
    grad.addColorStop(1, gradient.to);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Semi-transparent overlay for text readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, width, height);

    // Try to load the article image
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = article.image;
      });

      // Draw image on the right side
      const imgWidth = 480;
      const imgHeight = height;
      const imgX = width - imgWidth;
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.drawImage(img, imgX, 0, imgWidth, imgHeight);
      ctx.globalAlpha = 1;

      // Gradient overlay on image
      const imgGrad = ctx.createLinearGradient(imgX - 100, 0, imgX + 200, 0);
      imgGrad.addColorStop(0, gradient.from);
      imgGrad.addColorStop(0.5, `${gradient.from}88`);
      imgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = imgGrad;
      ctx.fillRect(imgX - 100, 0, imgWidth + 100, imgHeight);
      ctx.restore();
    } catch {
      // Image failed to load, continue without it
    }

    // Category badge
    const badgeY = 60;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    const badgeText = `${article.category.toUpperCase()} · ${article.readTime.toUpperCase()}`;
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    const badgeWidth = ctx.measureText(badgeText).width + 32;
    roundRect(ctx, 60, badgeY, badgeWidth, 36, 18);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(badgeText, 76, badgeY + 24);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Georgia, serif';
    const maxTitleWidth = 640;
    const titleLines = wrapText(ctx, article.title, maxTitleWidth);
    let titleY = 140;
    titleLines.forEach((line) => {
      ctx.fillText(line, 60, titleY);
      titleY += 52;
    });

    // Excerpt
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '20px system-ui, -apple-system, sans-serif';
    const excerptLines = wrapText(ctx, article.excerpt, maxTitleWidth);
    let excerptY = titleY + 20;
    excerptLines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, 60, excerptY);
      excerptY += 28;
    });

    // Author and date
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '18px system-ui, -apple-system, sans-serif';
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    ctx.fillText(`${article.author} · ${formattedDate}`, 60, height - 100);

    // Brand
    ctx.fillStyle = gradient.accent;
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText('Elemental Color Identity', 60, height - 50);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillText('www.elementalcoloridentity.com', 260, height - 50);

    // Download the image
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `elemental-colors-${article.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Canvas tainted by cross-origin image
      console.log('Could not download - cross-origin image restriction');
    }

    setCardDownloading(false);
  }, [article, gradient]);

  // Helper: wrap text to fit within maxWidth
  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Helper: draw rounded rectangle
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-5 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                  {categoryIcons[article.category]}
                  {article.category}
                </span>
              </div>
              <h3 className="text-lg font-serif leading-snug line-clamp-2">{article.title}</h3>
              <p className="text-sm text-white/70 mt-1">{article.author} · {formatDate(article.date)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'share'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Share Article
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Preview Card
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'share' ? (
            <div className="space-y-4">
              {/* Copy Link */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">Article Link</p>
                  <p className="text-sm text-gray-700 truncate font-mono">{shareUrl}</p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {/* Twitter/X */}
                <button
                  onClick={handleShareTwitter}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Twitter / X</p>
                    <p className="text-xs text-gray-400">Share on X</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Facebook */}
                <button
                  onClick={handleShareFacebook}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Facebook</p>
                    <p className="text-xs text-gray-400">Share on Facebook</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Email */}
                <button
                  onClick={handleShareEmail}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-xs text-gray-400">Send via email</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Native Share (if supported) */}
                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">More Options</p>
                      <p className="text-xs text-gray-400">System share menu</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>

              {/* Tags */}
              <div className="pt-2">
                <p className="text-xs text-gray-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Shareable Card Preview */}
              <div
                className="rounded-xl overflow-hidden shadow-lg relative"
                style={{ aspectRatio: '1200/630' }}
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
                />

                {/* Article image overlay */}
                <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${gradient.from}, transparent)`,
                    }}
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/20 backdrop-blur-sm mb-2">
                      {categoryIcons[article.category]}
                      {article.category} · {article.readTime}
                    </span>
                    <h4 className="text-base md:text-lg font-serif leading-snug line-clamp-2 mb-1.5">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-white/50">
                      {article.author} · {formatDate(article.date)}
                    </p>
                    <p className="text-[10px] font-serif" style={{ color: gradient.accent }}>
                      Elemental Color Identity
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Preview of how the shared card will appear on social platforms
              </p>

              {/* Download Card Button */}
              <button
                onClick={generateShareCard}
                disabled={cardDownloading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cardDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Share Card Image
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Hidden canvas for image generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default BlogShareModal;
