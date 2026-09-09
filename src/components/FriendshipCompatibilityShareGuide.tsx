import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Download, Printer, X, Link2, Copy, Check, Mail, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { type PairwiseCompatibility } from '@/data/friendshipCompatibilityData';
import { elementalTypes } from '@/data/elementalTypes';

// ── Types ──────────────────────────────────────────────────────────────────────

interface FriendshipCompatibilityShareGuideProps {
  isOpen: boolean;
  onClose: () => void;
  subtype1Id: string;
  subtype2Id: string;
  report: PairwiseCompatibility;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const allSubtypes = elementalTypes.flatMap(et =>
  et.subtypes.map(st => ({
    id: st.id,
    name: st.name,
    shortName: st.shortName,
    elementId: et.id,
    elementName: et.name
  }))
);

const getSubtype = (id: string) => allSubtypes.find(s => s.id === id);

const elementStyles: Record<string, {
  primary: string;
  secondary: string;
  gradient: string;
  lightBg: string;
  border: string;
  textDark: string;
  iconPath: string;
  extraPaths?: string[];
}> = {
  fire: {
    primary: '#C41E3A',
    secondary: '#FF6B35',
    gradient: 'linear-gradient(135deg, #991B1B 0%, #C41E3A 40%, #FF6B35 100%)',
    lightBg: '#FEF2F2',
    border: '#FCA5A5',
    textDark: '#991B1B',
    iconPath: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'
  },
  water: {
    primary: '#6B8BA4',
    secondary: '#B4A7D6',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #6B8BA4 40%, #B4A7D6 100%)',
    lightBg: '#EFF6FF',
    border: '#93C5FD',
    textDark: '#1E40AF',
    iconPath: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'
  },
  earth: {
    primary: '#8B4513',
    secondary: '#CC4E3E',
    gradient: 'linear-gradient(135deg, #78350F 0%, #8B4513 40%, #CC4E3E 100%)',
    lightBg: '#FFFBEB',
    border: '#FCD34D',
    textDark: '#92400E',
    iconPath: 'm8 3 4 8 5-5 5 15H2L8 3z'
  },
  air: {
    primary: '#FF7F50',
    secondary: '#FFE135',
    gradient: 'linear-gradient(135deg, #C2410C 0%, #FF7F50 40%, #FFE135 100%)',
    lightBg: '#FFF7ED',
    border: '#FDBA74',
    textDark: '#C2410C',
    iconPath: 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2',
    extraPaths: ['M9.6 4.6A2 2 0 1 1 11 8H2', 'M12.6 19.4A2 2 0 1 0 14 16H2']
  }
};

const getScoreColor = (score: number) => {
  if (score >= 8) return { hex: '#10b981', bg: '#D1FAE5', border: '#A7F3D0', text: '#065F46', label: 'Extraordinary' };
  if (score >= 6) return { hex: '#f59e0b', bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', label: 'Strong' };
  if (score >= 4) return { hex: '#f97316', bg: '#FFEDD5', border: '#FDBA74', text: '#9A3412', label: 'Moderate' };
  return { hex: '#ef4444', bg: '#FEE2E2', border: '#FCA5A5', text: '#991B1B', label: 'Challenging' };
};

// ── Component ──────────────────────────────────────────────────────────────────

const FriendshipCompatibilityShareGuide: React.FC<FriendshipCompatibilityShareGuideProps> = ({
  isOpen,
  onClose,
  subtype1Id,
  subtype2Id,
  report
}) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const st1 = getSubtype(subtype1Id);
  const st2 = getSubtype(subtype2Id);
  const el1 = subtype1Id.split('-')[0];
  const el2 = subtype2Id.split('-')[0];
  const style1 = elementStyles[el1] || elementStyles.fire;
  const style2 = elementStyles[el2] || elementStyles.fire;

  // Combined gradient for the header
  const headerGradient = `linear-gradient(135deg, ${style1.primary} 0%, #7C3AED 50%, ${style2.primary} 100%)`;

  // Shareable link
  const shareableLink = useMemo(() => {
    const payload = { s1: subtype1Id, s2: subtype2Id };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    return `${window.location.origin}${window.location.pathname}?friendship=${encoded}`;
  }, [subtype1Id, subtype2Id]);

  // Plain text summary
  const textSummary = useMemo(() => {
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push('   FRIENDSHIP COMPATIBILITY REPORT');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');
    lines.push('── THE PAIRING ──');
    lines.push(`  ${st1?.name || subtype1Id} (${st1?.shortName || subtype1Id})`);
    lines.push(`  ${st2?.name || subtype2Id} (${st2?.shortName || subtype2Id})`);
    lines.push('');
    lines.push('── COMPATIBILITY SCORE ──');
    lines.push(`  Overall: ${report.overallScore}/10 — ${report.chemistryType}`);
    lines.push(`  Archetype: ${report.friendshipArchetype}`);
    lines.push('');
    lines.push('── DESCRIPTION ──');
    lines.push(`  ${report.description}`);
    lines.push('');
    lines.push('── WHAT WORKS ──');
    report.strengths.forEach((s, i) => {
      lines.push(`  ${i + 1}. ${s}`);
    });
    lines.push('');
    lines.push('── WHERE TENSION LIVES ──');
    report.challenges.forEach((c, i) => {
      lines.push(`  ${i + 1}. ${c}`);
    });
    lines.push('');
    lines.push('── HOW TO BRIDGE THE GAP ──');
    report.bridgeAdvice.forEach((a, i) => {
      lines.push(`  ${i + 1}. ${a}`);
    });
    lines.push('');
    lines.push('── FRIENDSHIP WISDOM ──');
    lines.push('  No compatibility score determines the fate of a friendship. The most');
    lines.push('  transformative relationships often come from the most unexpected pairings.');
    lines.push('  What matters is not whether your elements naturally harmonize, but whether');
    lines.push('  both friends are willing to learn each other\'s elemental language.');
    lines.push('');
    lines.push('═══════════════════════════════════════════');
    lines.push('  Generated from Elemental Color Analysis');
    lines.push('═══════════════════════════════════════════');
    return lines.join('\n');
  }, [st1, st2, subtype1Id, subtype2Id, report]);

  // Download as image
  const handleDownload = useCallback(async () => {
    if (!guideRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(guideRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 900
      });
      const link = document.createElement('a');
      const name1 = st1?.shortName?.toLowerCase().replace(/[\s+]/g, '-') || 'type1';
      const name2 = st2?.shortName?.toLowerCase().replace(/[\s+]/g, '-') || 'type2';
      link.download = `friendship-compatibility-${name1}-${name2}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [st1, st2]);

  // Print
  const handlePrint = useCallback(() => {
    const printContent = guideRef.current;
    if (!printContent) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Friendship Compatibility Report — ${st1?.name || ''} & ${st2?.name || ''}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }, [st1, st2]);

  // Copy link
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  }, [shareableLink]);

  // Copy text
  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(textSummary).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  }, [textSummary]);

  // Email
  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(`Friendship Compatibility Report — ${st1?.name || subtype1Id} & ${st2?.name || subtype2Id}`);
    const body = encodeURIComponent(
      `I've generated a Friendship Compatibility Report. Here's a summary:\n\n` +
      `Pairing: ${st1?.name || subtype1Id} & ${st2?.name || subtype2Id}\n` +
      `Score: ${report.overallScore}/10 — ${report.chemistryType}\n` +
      `Archetype: ${report.friendshipArchetype}\n\n` +
      `View the full interactive report here:\n${shareableLink}\n\n` +
      `--- Full Text Report ---\n\n${textSummary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [st1, st2, subtype1Id, subtype2Id, report, shareableLink, textSummary]);

  if (!isOpen) return null;

  const scoreColor = getScoreColor(report.overallScore);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* ── Modal Header ── */}
        <div
          className="flex items-center justify-between p-4 border-b flex-shrink-0"
          style={{ background: headerGradient }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Share Compatibility Report</h2>
              <p className="text-sm text-white/60">
                Download, print, or share your friendship compatibility analysis
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* ── Action Buttons Bar ── */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b flex-shrink-0">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 hover:brightness-110"
            style={{ background: headerGradient }}
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Download Image'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors shadow-md"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedLink
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </button>
          <button
            onClick={handleCopyText}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
              copiedText
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedText ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-gray-700 border border-gray-200 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* ── Shareable Link Preview ── */}
        <div className="px-4 py-3 bg-gray-50 border-b flex-shrink-0">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <Link2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 text-xs text-gray-500 bg-transparent border-none outline-none truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={handleCopyLink}
              className="text-xs font-medium flex-shrink-0 hover:opacity-80"
              style={{ color: '#7C3AED' }}
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 px-1">
            Anyone with this link can view the friendship compatibility report for this pairing.
          </p>
        </div>

        {/* ── Scrollable Document Preview ── */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div
            ref={guideRef}
            className="bg-white shadow-lg mx-auto"
            style={{ width: '816px', minHeight: '1056px', padding: '40px' }}
          >
            {/* ── Document Header ── */}
            <div
              style={{
                background: headerGradient,
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative circles */}
              <div style={{
                position: 'absolute', top: '-25px', right: '-25px',
                width: '130px', height: '130px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)'
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', left: '35%',
                width: '90px', height: '90px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)'
              }} />
              <div style={{
                position: 'absolute', top: '40%', right: '18%',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {/* Heart handshake icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                    <path d="m18 15-2-2" />
                    <path d="m15 18-2-2" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', margin: 0 }}>
                    Friendship Compatibility Report
                  </h1>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
                    Elemental Friendship Analysis — {dateStr}
                  </p>
                </div>
              </div>

              {/* Subtype pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', position: 'relative' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                  padding: '4px 12px 4px 8px', fontSize: '12px'
                }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '4px',
                    background: style1.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={style1.iconPath} />
                      {style1.extraPaths?.map((p, i) => <path key={i} d={p} />)}
                    </svg>
                  </div>
                  <span style={{ fontWeight: 600 }}>{st1?.name || subtype1Id}</span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  background: 'rgba(255,255,255,0.08)', borderRadius: '20px',
                  padding: '4px 10px', fontSize: '11px', opacity: 0.8
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                  </svg>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                  padding: '4px 12px 4px 8px', fontSize: '12px'
                }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '4px',
                    background: style2.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={style2.iconPath} />
                      {style2.extraPaths?.map((p, i) => <path key={i} d={p} />)}
                    </svg>
                  </div>
                  <span style={{ fontWeight: 600 }}>{st2?.name || subtype2Id}</span>
                </div>
              </div>
            </div>

            {/* ── Score Overview ── */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
              marginBottom: '24px'
            }}>
              {/* Overall Score */}
              <div style={{
                padding: '20px', borderRadius: '12px', textAlign: 'center',
                background: scoreColor.bg, border: `1px solid ${scoreColor.border}`
              }}>
                <p style={{
                  fontSize: '10px', fontWeight: 600, color: '#6B7280',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                }}>
                  Compatibility Score
                </p>
                <div style={{ position: 'relative', width: '72px', height: '72px', margin: '0 auto 8px' }}>
                  <svg width="72" height="72" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#E5E7EB" strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke={scoreColor.hex} strokeWidth="3"
                      strokeDasharray={`${(report.overallScore / 10) * 100}, 100`} strokeLinecap="round"
                    />
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{report.overallScore}</span>
                    <span style={{ fontSize: '8px', color: '#9CA3AF' }}>/10</span>
                  </div>
                </div>
                <span style={{
                  padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                  background: 'white', color: scoreColor.text, border: `1px solid ${scoreColor.border}`
                }}>
                  {scoreColor.label}
                </span>
              </div>

              {/* Chemistry Type */}
              <div style={{
                padding: '20px', borderRadius: '12px', textAlign: 'center',
                background: '#F5F3FF', border: '1px solid #DDD6FE'
              }}>
                <p style={{
                  fontSize: '10px', fontWeight: 600, color: '#6B7280',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                }}>
                  Chemistry Type
                </p>
                <div style={{
                  width: '72px', height: '72px', margin: '0 auto 8px',
                  borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#5B21B6', lineHeight: '1.3' }}>
                  {report.chemistryType}
                </p>
              </div>

              {/* Friendship Archetype */}
              <div style={{
                padding: '20px', borderRadius: '12px', textAlign: 'center',
                background: '#FDF4FF', border: '1px solid #F0ABFC'
              }}>
                <p style={{
                  fontSize: '10px', fontWeight: 600, color: '#6B7280',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px'
                }}>
                  Friendship Archetype
                </p>
                <div style={{
                  width: '72px', height: '72px', margin: '0 auto 8px',
                  borderRadius: '50%', background: 'linear-gradient(135deg, #C026D3, #E879F9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#86198F', lineHeight: '1.3' }}>
                  {report.friendshipArchetype}
                </p>
              </div>
            </div>

            {/* ── The Pairing ── */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px',
              marginBottom: '24px', alignItems: 'center'
            }}>
              {/* Person 1 */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: style1.lightBg, border: `1px solid ${style1.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: style1.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={style1.iconPath} />
                      {style1.extraPaths?.map((p, i) => <path key={i} d={p} />)}
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                      {st1?.name || subtype1Id}
                    </p>
                    <p style={{ fontSize: '10px', color: '#6B7280', margin: 0 }}>
                      {st1?.shortName || subtype1Id} — {st1?.elementName || el1}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #F5F3FF, #FDF4FF)',
                border: '2px solid #DDD6FE',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </div>

              {/* Person 2 */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: style2.lightBg, border: `1px solid ${style2.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: style2.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={style2.iconPath} />
                      {style2.extraPaths?.map((p, i) => <path key={i} d={p} />)}
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                      {st2?.name || subtype2Id}
                    </p>
                    <p style={{ fontSize: '10px', color: '#6B7280', margin: 0 }}>
                      {st2?.shortName || subtype2Id} — {st2?.elementName || el2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Description ── */}
            <div style={{
              background: 'linear-gradient(135deg, #F5F3FF, #FDF4FF, #FFF1F2)',
              borderRadius: '12px', padding: '20px',
              border: '1px solid #DDD6FE', marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '12px', color: '#374151', lineHeight: '1.7',
                fontStyle: 'italic', fontFamily: 'Georgia, serif'
              }}>
                {report.description}
              </p>
            </div>

            {/* ── Compatibility Spectrum ── */}
            <div style={{
              padding: '20px', borderRadius: '12px',
              background: '#F9FAFB', border: '1px solid #E5E7EB',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#6B7280',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px',
                textAlign: 'center'
              }}>
                Compatibility Spectrum
              </h3>
              <div style={{
                position: 'relative', height: '16px',
                background: 'linear-gradient(to right, #FEE2E2, #FFEDD5, #FEF3C7, #D1FAE5)',
                borderRadius: '8px', overflow: 'visible', marginBottom: '8px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%', transform: 'translateY(-50%)',
                  left: `calc(${(report.overallScore / 10) * 100}% - 14px)`,
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: scoreColor.hex,
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.5s'
                }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'white' }}>
                    {report.overallScore}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>Challenging</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>Growth</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>Natural</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF' }}>Extraordinary</span>
              </div>
            </div>

            {/* ── Strengths & Challenges ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {/* What Works */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: '#ECFDF5', border: '1px solid #A7F3D0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#065F46', fontFamily: 'Georgia, serif' }}>
                    What Works
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {report.strengths.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '8px',
                      padding: '8px 10px', borderRadius: '8px', background: 'white'
                    }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: '#10B981', flexShrink: 0, marginTop: '5px'
                      }} />
                      <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6' }}>{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where Tension Lives */}
              <div style={{
                padding: '16px', borderRadius: '12px',
                background: '#FFFBEB', border: '1px solid #FCD34D'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#92400E', fontFamily: 'Georgia, serif' }}>
                    Where Tension Lives
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {report.challenges.map((c, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '8px',
                      padding: '8px 10px', borderRadius: '8px', background: 'white'
                    }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: '#F59E0B', flexShrink: 0, marginTop: '5px'
                      }} />
                      <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.6' }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── How to Bridge the Gap ── */}
            <div style={{
              borderRadius: '12px', overflow: 'hidden',
              border: '1px solid #C7D2FE', marginBottom: '20px'
            }}>
              <div style={{
                background: headerGradient,
                padding: '14px 20px', color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                    How to Bridge the Gap
                  </h3>
                </div>
              </div>
              <div style={{ padding: '16px 20px', background: '#EEF2FF' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {report.bridgeAdvice.map((advice, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '12px 14px', borderRadius: '10px',
                      background: 'white', border: '1px solid #E0E7FF'
                    }}>
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '50%',
                        background: headerGradient, color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 'bold', flexShrink: 0, marginTop: '1px'
                      }}>
                        {idx + 1}
                      </div>
                      <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.7' }}>{advice}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Closing Quote ── */}
            <div style={{
              background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
              borderRadius: '12px', padding: '20px 24px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '12px', color: '#D1D5DB', lineHeight: '1.7',
                fontStyle: 'italic', fontFamily: 'Georgia, serif', textAlign: 'center'
              }}>
                "No compatibility score determines the fate of a friendship. The most transformative
                relationships often come from the most unexpected pairings. What matters is not whether
                your elements naturally harmonize, but whether both friends are willing to learn each
                other's{' '}
                <span style={{ color: '#A78BFA', fontWeight: 600 }}>elemental language</span>."
              </p>
            </div>

            {/* ── Sharing Note ── */}
            <div style={{
              background: 'linear-gradient(135deg, #F5F3FF, #FDF4FF, #FFF1F2)',
              borderRadius: '12px', padding: '16px 20px',
              border: '1px solid #DDD6FE', marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '11px', color: '#6B7280', lineHeight: '1.6',
                fontStyle: 'italic', fontFamily: 'Georgia, serif'
              }}>
                This friendship compatibility report is designed to be shared with the friend in question.
                Understanding each other's elemental nature is the first step toward a friendship that
                honors both people's authentic selves. When you know your friend's elemental language,
                you can translate your care into a form they can truly receive — and they can do the same
                for you. Share it freely and openly.
              </p>
            </div>

            {/* ── Footer ── */}
            <div style={{
              borderTop: '1px solid #E5E7EB', paddingTop: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <p style={{ fontSize: '9px', color: '#9CA3AF' }}>
                Generated from Elemental Color Analysis — {new Date().toLocaleDateString()}
              </p>
              <p style={{ fontSize: '9px', color: '#9CA3AF' }}>
                {st1?.shortName || subtype1Id} + {st2?.shortName || subtype2Id} — Score: {report.overallScore}/10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendshipCompatibilityShareGuide;
