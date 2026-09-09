import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Share2, Download, X, Check, Link2, Copy, Mail } from 'lucide-react';
import {
  friendGroupProfiles,
  FRIEND_GROUP_ELEMENT_COLOR,
  FRIEND_GROUP_ELEMENT_ICON_PATHS,
  type FriendGroupMember,
  type FriendGroupAnalysis,
} from '@/data/friendGroupData';

// ── Social icons ───────────────────────────────────────────────────────────────

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.058-.52-.115-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────

interface FriendGroupShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  members: FriendGroupMember[];
  analysis: FriendGroupAnalysis;
}

const ElementGlyph: React.FC<{ elementId: string; size?: number; stroke?: string; strokeWidth?: number }> = ({
  elementId,
  size = 16,
  stroke = 'white',
  strokeWidth = 2.5,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {(FRIEND_GROUP_ELEMENT_ICON_PATHS[elementId] || []).map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

const FriendGroupShareCard: React.FC<FriendGroupShareCardProps> = ({
  isOpen,
  onClose,
  members,
  analysis,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const profile = analysis.commonElement;
  const total = members.length;
  const headerGradient = `linear-gradient(135deg, ${profile.gradientFrom} 0%, ${profile.gradientTo} 100%)`;

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  // Shareable link that encodes the group so it can be revisited
  const shareableLink = useMemo(() => {
    if (typeof window === 'undefined') return '';
    try {
      const payload = members.map(m => ({ n: m.name, s: m.subtypeId }));
      const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
      return `${window.location.origin}${window.location.pathname}?friendgroup=${encoded}`;
    } catch {
      return `${window.location.origin}${window.location.pathname}`;
    }
  }, [members]);

  // Plain-text share copy
  const shareText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Our friend group's common element is ${profile.elementName}!`);
    lines.push(`We are ${profile.groupName} — "${profile.tagline}"`);
    lines.push('');
    lines.push('The crew:');
    members.forEach(m => {
      lines.push(`  • ${m.name} — ${m.subtypeName} (${m.archetypeName})`);
    });
    lines.push('');
    lines.push('Element distribution:');
    friendGroupProfiles.forEach(p => {
      const count = analysis.counts[p.elementId] || 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      lines.push(`  ${p.elementName}: ${count}/${total} (${pct}%)`);
    });
    lines.push('');
    lines.push(
      '"Every friendship has its own elemental signature. When you know what yours is, you know how to feed it, nurture it, and let it flourish."'
    );
    lines.push('');
    lines.push('Find your group\u2019s common element at Elemental Color Analysis.');
    return lines.join('\n');
  }, [profile, members, analysis, total]);

  const socialCaption = `Our friend group's common element is ${profile.elementName} — we're ${profile.groupName}: "${profile.tagline}" Find your group's elemental signature!`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    socialCaption
  )}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}&quote=${encodeURIComponent(socialCaption)}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    shareUrl
  )}&description=${encodeURIComponent(socialCaption)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${socialCaption}\n${shareUrl}`
  )}`;

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `elemental-friend-group-${profile.elementId}-${new Date()
        .toISOString()
        .slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating friend group image:', err);
    } finally {
      setDownloading(false);
    }
  }, [profile]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  }, [shareText, shareUrl]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  }, [shareableLink]);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(
      `Our friend group is ${profile.groupName} (${profile.elementName} element)`
    );
    const body = encodeURIComponent(`${shareText}\n\nView our group:\n${shareableLink}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [profile, shareText, shareableLink]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[94vh] overflow-hidden flex flex-col">
        {/* Modal header */}
        <div
          className="flex items-center justify-between p-4 border-b flex-shrink-0"
          style={{ background: headerGradient }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Share Your Friend Group Result</h2>
              <p className="text-sm text-white/70">
                Download the card, copy the text, or post it anywhere
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close share card"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b flex-shrink-0">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium shadow-md hover:brightness-110 transition-all disabled:opacity-50"
            style={{ background: headerGradient }}
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generating...' : 'Download PNG'}
          </button>
          <button
            onClick={handleCopyText}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedText
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedText ? 'Copied!' : 'Copy Share Text'}
          </button>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedLink
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-gray-50 border-b flex-shrink-0">
          <button
            onClick={() => openShareWindow(twitterUrl)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
          >
            <TwitterIcon />
            <span>X</span>
          </button>
          <button
            onClick={() => openShareWindow(facebookUrl)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-medium hover:bg-[#166FE5] transition-colors"
          >
            <FacebookIcon />
            <span>Facebook</span>
          </button>
          <button
            onClick={() => openShareWindow(pinterestUrl)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#E60023] text-white text-xs font-medium hover:bg-[#D50C22] transition-colors"
          >
            <PinterestIcon />
            <span>Pinterest</span>
          </button>
          <button
            onClick={() => openShareWindow(whatsappUrl)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-medium hover:bg-[#1FB855] transition-colors"
          >
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Card preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div
            ref={cardRef}
            style={{
              width: '640px',
              maxWidth: '100%',
              margin: '0 auto',
              background: '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            }}
          >
            {/* Card header */}
            <div
              style={{
                background: headerGradient,
                padding: '32px 32px 28px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-30px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '30%',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                }}
              />
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    opacity: 0.85,
                    marginBottom: '10px',
                  }}
                >
                  <ElementGlyph elementId={profile.elementId} size={16} strokeWidth={2.5} />
                  <span>Common Element: {profile.elementName}</span>
                </div>
                <h1
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '34px',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    margin: 0,
                  }}
                >
                  {profile.groupName}
                </h1>
                <p
                  style={{
                    fontSize: '14px',
                    fontStyle: 'italic',
                    opacity: 0.92,
                    marginTop: '8px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  &ldquo;{profile.tagline}&rdquo;
                </p>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '14px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.18)',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {total} friends · {analysis.dominancePercent}% {profile.elementName}
                </div>
              </div>
            </div>

            <div style={{ padding: '24px 32px 28px' }}>
              {/* Summary */}
              <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.7, marginBottom: '20px' }}>
                {analysis.summary}
              </p>

              {/* Members */}
              <h3
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                The Crew
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '22px',
                }}
              >
                {members.map(m => {
                  const color = FRIEND_GROUP_ELEMENT_COLOR[m.elementId] || '#6B7280';
                  return (
                    <div
                      key={m.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        background: `${color}0F`,
                        border: `1px solid ${color}33`,
                      }}
                    >
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '8px',
                          background: color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <ElementGlyph elementId={m.elementId} size={14} strokeWidth={2.5} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#1F2937',
                            margin: 0,
                          }}
                        >
                          {m.name}
                        </p>
                        <p style={{ fontSize: '10px', color: '#6B7280', margin: 0 }}>
                          {m.subtypeName} — {m.archetypeName}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Element distribution */}
              <h3
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                Element Distribution
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: '12px',
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  marginBottom: '18px',
                }}
              >
                {friendGroupProfiles.map(p => {
                  const count = analysis.counts[p.elementId] || 0;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const color = FRIEND_GROUP_ELEMENT_COLOR[p.elementId];
                  return (
                    <div key={p.elementId} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: color,
                          margin: '0 auto 6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: count > 0 ? 1 : 0.35,
                        }}
                      >
                        <ElementGlyph elementId={p.elementId} size={14} strokeWidth={2.5} />
                      </div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color, margin: 0 }}>
                        {p.elementName}
                      </p>
                      <p
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#1F2937',
                          margin: '2px 0 4px',
                        }}
                      >
                        {count}
                      </p>
                      <div
                        style={{
                          width: '100%',
                          height: '4px',
                          borderRadius: '2px',
                          background: 'rgba(0,0,0,0.07)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${count > 0 ? Math.max(pct, 10) : 0}%`,
                            height: '100%',
                            borderRadius: '2px',
                            background: color,
                          }}
                        />
                      </div>
                      <p style={{ fontSize: '9px', color: '#6B7280', marginTop: '4px' }}>{pct}%</p>
                    </div>
                  );
                })}
              </div>

              {analysis.missingElements.length > 0 && (
                <p style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '16px' }}>
                  Not represented:{' '}
                  {analysis.missingElements
                    .map(e => e.charAt(0).toUpperCase() + e.slice(1))
                    .join(', ')}
                </p>
              )}

              {/* Philosophy quote */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFF1F2, #F5F3FF, #ECFEFF)',
                  border: '1px solid #E9D5FF',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: '#374151',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    fontFamily: 'Georgia, serif',
                    textAlign: 'center',
                    margin: 0,
                  }}
                >
                  &ldquo;Every friendship has its own elemental signature. When you know what yours is,
                  you know how to feed it, nurture it, and let it flourish.&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>
                  Elemental Friend Group — {new Date().toLocaleDateString()}
                </span>
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>
                  elementalcoloridentity.com
                </span>
              </div>
            </div>
          </div>

          {/* Share text preview */}
          <div className="mt-4 max-w-[640px] mx-auto">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
              Share text
            </p>
            <textarea
              readOnly
              value={shareText}
              rows={6}
              onClick={e => (e.target as HTMLTextAreaElement).select()}
              className="w-full text-[11px] leading-relaxed text-gray-600 bg-white border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendGroupShareCard;
