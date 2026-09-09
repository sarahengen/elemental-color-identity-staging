import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Download, Printer, X, Link2, Copy, Check, Mail, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { teamDynamicsData, teamChemistryRules, frictionPairs } from '@/data/teamDynamicsData';

// ── Types ──────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  name: string;
  element: string;
  subtypeId: string;
  subtypeName: string;
  archetypeName: string;
}

interface PairDetail {
  member1: string;
  member2: string;
  chemistry: string;
  score: number;
  dynamic: string;
}

interface AnalysisData {
  elementCounts: Record<string, number>;
  presentElements: [string, number][];
  missingElements: string[];
  dominantElement: [string, number];
  avgScore: number;
  balanceScore: number;
  overallScore: number;
  pairDetails: PairDetail[];
  strengths: string[];
  risks: string[];
  recommendations: string[];
}

interface TeamCompositionShareGuideProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  analysis: AnalysisData;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const allSubtypes = teamDynamicsData.flatMap(el =>
  el.subtypes.map(s => ({
    ...s,
    elementId: el.elementId,
    element: el.element,
    gradientFrom: el.gradientFrom,
    gradientTo: el.gradientTo,
    tagline: el.tagline
  }))
);

const getSubtype = (id: string) => allSubtypes.find(s => s.subtypeId === id);

const elementColors: Record<string, { primary: string; light: string; text: string; bg: string }> = {
  fire: { primary: '#C41E3A', light: '#FEE2E2', text: '#991B1B', bg: '#FFF5F5' },
  water: { primary: '#6B8BA4', light: '#DBEAFE', text: '#1E40AF', bg: '#F0F9FF' },
  earth: { primary: '#8B4513', light: '#FEF3C7', text: '#92400E', bg: '#FFFBEB' },
  air: { primary: '#00CED1', light: '#CCFBF1', text: '#065F46', bg: '#F0FDFA' }
};

const getScoreColor = (score: number) => {
  if (score >= 85) return { text: '#065F46', bg: '#D1FAE5', border: '#A7F3D0', label: 'Excellent' };
  if (score >= 75) return { text: '#1E40AF', bg: '#DBEAFE', border: '#93C5FD', label: 'Good' };
  if (score >= 65) return { text: '#92400E', bg: '#FEF3C7', border: '#FCD34D', label: 'Moderate' };
  return { text: '#991B1B', bg: '#FEE2E2', border: '#FCA5A5', label: 'Needs Attention' };
};

// ── Component ──────────────────────────────────────────────────────────────────

const TeamCompositionShareGuide: React.FC<TeamCompositionShareGuideProps> = ({
  isOpen,
  onClose,
  members,
  analysis
}) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Generate shareable link
  const shareableLink = useMemo(() => {
    const teamData = members.map(m => ({ n: m.name, e: m.element, s: m.subtypeId }));
    const encoded = btoa(encodeURIComponent(JSON.stringify(teamData)));
    return `${window.location.origin}${window.location.pathname}?teamcomp=${encoded}`;
  }, [members]);

  // Find relevant friction pairs for the team
  const relevantFrictionPairs = useMemo(() => {
    const results: { pair: typeof frictionPairs[0]; member1: string; member2: string }[] = [];
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const m1 = members[i];
        const m2 = members[j];
        const fp = frictionPairs.find(f =>
          (f.pair[0] === m1.subtypeId && f.pair[1] === m2.subtypeId) ||
          (f.pair[1] === m1.subtypeId && f.pair[0] === m2.subtypeId)
        );
        if (fp) {
          results.push({ pair: fp, member1: m1.name, member2: m2.name });
        }
      }
    }
    return results;
  }, [members]);

  // Generate plain text summary
  const textSummary = useMemo(() => {
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push('     TEAM CHEMISTRY REPORT');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');

    lines.push('── TEAM MEMBERS ──');
    members.forEach((m, i) => {
      const s = getSubtype(m.subtypeId);
      if (s) {
        lines.push(`  ${i + 1}. ${m.name} — ${s.subtype} "${s.name}" (${s.teamRole})`);
      }
    });
    lines.push('');

    lines.push('── SCORES ──');
    lines.push(`  Overall Team Score: ${analysis.overallScore}/100`);
    lines.push(`  Average Chemistry: ${analysis.avgScore}/100`);
    lines.push(`  Element Balance: ${analysis.balanceScore}/100`);
    lines.push('');

    lines.push('── ELEMENT DISTRIBUTION ──');
    (['fire', 'water', 'earth', 'air'] as const).forEach(el => {
      const count = analysis.elementCounts[el] || 0;
      const pct = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
      lines.push(`  ${el.charAt(0).toUpperCase() + el.slice(1)}: ${count} member${count !== 1 ? 's' : ''} (${pct}%)`);
    });
    if (analysis.missingElements.length > 0) {
      lines.push(`  Missing: ${analysis.missingElements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')}`);
    }
    lines.push('');

    if (analysis.strengths.length > 0) {
      lines.push('── TEAM STRENGTHS ──');
      analysis.strengths.forEach((s, i) => {
        lines.push(`  ${i + 1}. ${s}`);
      });
      lines.push('');
    }

    if (analysis.risks.length > 0) {
      lines.push('── POTENTIAL RISKS ──');
      analysis.risks.forEach((r, i) => {
        lines.push(`  ${i + 1}. ${r}`);
      });
      lines.push('');
    }

    lines.push('── PAIR DYNAMICS ──');
    analysis.pairDetails.forEach(p => {
      lines.push(`  [${p.score}/100] ${p.member1} + ${p.member2} — ${p.chemistry}`);
      lines.push(`       ${p.dynamic}`);
      lines.push('');
    });

    if (relevantFrictionPairs.length > 0) {
      lines.push('── KNOWN FRICTION POINTS ──');
      relevantFrictionPairs.forEach(fp => {
        lines.push(`  ${fp.member1} vs ${fp.member2} (${fp.pair.pairNames[0]} + ${fp.pair.pairNames[1]})`);
        lines.push(`  Friction: ${fp.pair.frictionPoint}`);
        lines.push(`  Resolution: ${fp.pair.resolution}`);
        lines.push('');
      });
    }

    if (analysis.recommendations.length > 0) {
      lines.push('── RECOMMENDATIONS ──');
      analysis.recommendations.forEach((r, i) => {
        lines.push(`  ${i + 1}. ${r}`);
      });
      lines.push('');
    }

    lines.push('═══════════════════════════════════════════');
    lines.push('  Generated from Elemental Color Analysis');
    lines.push('═══════════════════════════════════════════');

    return lines.join('\n');
  }, [members, analysis, relevantFrictionPairs]);

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
      link.download = `team-chemistry-report-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

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
          <title>Team Chemistry Report</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }, []);

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
    const subject = encodeURIComponent('Team Chemistry Report — Elemental Color Analysis');
    const body = encodeURIComponent(
      `I've generated a Team Chemistry Report for our group. Here's a summary:\n\n` +
      `Overall Team Score: ${analysis.overallScore}/100\n` +
      `Average Chemistry: ${analysis.avgScore}/100\n` +
      `Element Balance: ${analysis.balanceScore}/100\n\n` +
      `Team Members: ${members.map(m => m.name).join(', ')}\n\n` +
      `View the full interactive report here:\n${shareableLink}\n\n` +
      `--- Full Text Report ---\n\n${textSummary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [analysis, members, shareableLink, textSummary]);

  if (!isOpen) return null;

  const overallColor = getScoreColor(analysis.overallScore);
  const chemColor = getScoreColor(analysis.avgScore);
  const balColor = getScoreColor(analysis.balanceScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-700 to-violet-700 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Share Chemistry Report</h2>
              <p className="text-sm text-white/60">Download, print, or share your team analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b flex-shrink-0">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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

        {/* Shareable Link Preview */}
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
              className="text-xs text-indigo-600 font-medium hover:text-indigo-700 flex-shrink-0"
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 px-1">
            Anyone with this link can view the team composition and auto-generate the same chemistry report.
          </p>
        </div>

        {/* Scrollable Document Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div
            ref={guideRef}
            className="bg-white shadow-lg mx-auto"
            style={{ width: '816px', minHeight: '1056px', padding: '40px' }}
          >
            {/* ── Document Header ── */}
            <div
              style={{
                background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 50%, #7C3AED 100%)',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative shapes */}
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '140px', height: '140px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)'
              }} />
              <div style={{
                position: 'absolute', bottom: '-20px', left: '30%',
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)'
              }} />
              <div style={{
                position: 'absolute', top: '50%', right: '20%',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', position: 'relative' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Georgia, serif', margin: 0 }}>
                    Team Chemistry Report
                  </h1>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
                    Elemental Composition Analysis — {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Team member pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', position: 'relative' }}>
                {members.map(m => {
                  const s = getSubtype(m.subtypeId);
                  const ec = elementColors[m.element];
                  return (
                    <div key={m.id} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                      padding: '4px 12px 4px 8px', fontSize: '12px'
                    }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '4px',
                        background: ec ? ec.primary : '#666',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          {m.element === 'fire' && <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />}
                          {m.element === 'water' && <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />}
                          {m.element === 'earth' && <path d="m8 3 4 8 5-5 5 15H2L8 3z" />}
                          {m.element === 'air' && <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>}
                        </svg>
                      </div>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                      {s && (
                        <span style={{ opacity: 0.7, fontSize: '10px' }}>{s.teamRole}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Score Overview ── */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px',
              marginBottom: '24px'
            }}>
              {[
                { label: 'Overall Team Score', value: analysis.overallScore, color: overallColor },
                { label: 'Average Chemistry', value: analysis.avgScore, color: chemColor },
                { label: 'Element Balance', value: analysis.balanceScore, color: balColor }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '20px', borderRadius: '12px', textAlign: 'center',
                  background: item.color.bg, border: `1px solid ${item.color.border}`
                }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    {item.label}
                  </p>
                  <div style={{ position: 'relative', width: '72px', height: '72px', margin: '0 auto 8px' }}>
                    <svg width="72" height="72" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="#E5E7EB" strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke={item.color.text} strokeWidth="3"
                        strokeDasharray={`${item.value}, 100`} strokeLinecap="round"
                      />
                    </svg>
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>{item.value}</span>
                    </div>
                  </div>
                  <span style={{
                    padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 700,
                    background: 'white', color: item.color.text, border: `1px solid ${item.color.border}`
                  }}>
                    {item.color.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Element Distribution ── */}
            <div style={{
              background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB',
              padding: '20px', marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                Element Distribution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
                {(['fire', 'water', 'earth', 'air'] as const).map(el => {
                  const count = analysis.elementCounts[el] || 0;
                  const pct = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
                  const ec = elementColors[el];
                  const elMembers = members.filter(m => m.element === el);
                  return (
                    <div key={el} style={{
                      padding: '14px', borderRadius: '10px',
                      background: ec.bg, border: `1px solid ${ec.light}`,
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: ec.primary, margin: '0 auto 8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {el === 'fire' && <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />}
                          {el === 'water' && <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />}
                          {el === 'earth' && <path d="m8 3 4 8 5-5 5 15H2L8 3z" />}
                          {el === 'air' && <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>}
                        </svg>
                      </div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: ec.text, textTransform: 'capitalize', marginBottom: '2px' }}>
                        {el}
                      </p>
                      <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1F2937', marginBottom: '2px' }}>
                        {count}
                      </p>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.06)', borderRadius: '2px', marginBottom: '6px' }}>
                        <div style={{ width: `${Math.max(pct, count > 0 ? 10 : 0)}%`, height: '100%', borderRadius: '2px', background: ec.primary, transition: 'width 0.5s' }} />
                      </div>
                      <p style={{ fontSize: '10px', color: '#6B7280' }}>{pct}%</p>
                      {elMembers.length > 0 && (
                        <p style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '4px' }}>
                          {elMembers.map(m => m.name).join(', ')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {analysis.missingElements.length > 0 && (
                <div style={{
                  marginTop: '12px', padding: '8px 12px', borderRadius: '8px',
                  background: '#FEF3C7', border: '1px solid #FCD34D',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p style={{ fontSize: '11px', color: '#92400E' }}>
                    Missing: {analysis.missingElements.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(', ')} — consider how to fill these elemental gaps
                  </p>
                </div>
              )}
            </div>

            {/* ── Team Member Profiles ── */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Team Member Profiles
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {members.map(m => {
                  const s = getSubtype(m.subtypeId);
                  if (!s) return null;
                  const ec = elementColors[m.element];
                  return (
                    <div key={m.id} style={{
                      padding: '14px', borderRadius: '10px',
                      background: ec.bg, border: `1px solid ${ec.light}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '7px',
                          background: ec.primary,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            {m.element === 'fire' && <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />}
                            {m.element === 'water' && <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />}
                            {m.element === 'earth' && <path d="m8 3 4 8 5-5 5 15H2L8 3z" />}
                            {m.element === 'air' && <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /></>}
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937', margin: 0 }}>{m.name}</p>
                          <p style={{ fontSize: '10px', color: '#6B7280', margin: 0 }}>{s.subtype} — "{s.name}"</p>
                        </div>
                      </div>
                      <div style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: '10px',
                        background: 'white', border: `1px solid ${ec.light}`,
                        fontSize: '10px', fontWeight: 700, color: ec.text, marginBottom: '6px'
                      }}>
                        {s.teamRole}
                      </div>
                      <p style={{ fontSize: '10px', color: '#4B5563', lineHeight: '1.5', marginTop: '4px' }}>
                        <strong style={{ color: '#059669' }}>Strength:</strong> {s.strengthInTeams.length > 120 ? s.strengthInTeams.substring(0, 120) + '...' : s.strengthInTeams}
                      </p>
                      <p style={{ fontSize: '10px', color: '#4B5563', lineHeight: '1.5', marginTop: '4px' }}>
                        <strong style={{ color: '#D97706' }}>Challenge:</strong> {s.challengeInTeams.length > 120 ? s.challengeInTeams.substring(0, 120) + '...' : s.challengeInTeams}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Strengths & Risks ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div style={{
                  padding: '16px', borderRadius: '12px',
                  background: '#ECFDF5', border: '1px solid #A7F3D0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#065F46', fontFamily: 'Georgia, serif' }}>
                      Team Strengths
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {analysis.strengths.map((s, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '6px 8px', borderRadius: '6px', background: 'white'
                      }}>
                        <div style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: '#10B981', flexShrink: 0, marginTop: '5px'
                        }} />
                        <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5' }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Risks */}
              {analysis.risks.length > 0 && (
                <div style={{
                  padding: '16px', borderRadius: '12px',
                  background: '#FFFBEB', border: '1px solid #FCD34D'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#92400E', fontFamily: 'Georgia, serif' }}>
                      Potential Risks
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {analysis.risks.map((r, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '6px 8px', borderRadius: '6px', background: 'white'
                      }}>
                        <div style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: '#F59E0B', flexShrink: 0, marginTop: '5px'
                        }} />
                        <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5' }}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Pair Dynamics ── */}
            {analysis.pairDetails.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Pair Chemistry Dynamics
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysis.pairDetails.map((pair, idx) => {
                    const sc = getScoreColor(pair.score);
                    return (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 14px', borderRadius: '10px',
                        background: sc.bg, border: `1px solid ${sc.border}`
                      }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px',
                          background: 'white', border: `1px solid ${sc.border}`,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{ fontSize: '15px', fontWeight: 'bold', color: sc.text, lineHeight: 1 }}>{pair.score}</span>
                          <span style={{ fontSize: '7px', color: '#9CA3AF', textTransform: 'uppercase' }}>score</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>{pair.member1}</span>
                            <span style={{ fontSize: '10px', color: '#9CA3AF' }}>+</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>{pair.member2}</span>
                            <span style={{
                              padding: '1px 8px', borderRadius: '8px', fontSize: '9px', fontWeight: 700,
                              background: 'white', color: sc.text, border: `1px solid ${sc.border}`
                            }}>
                              {pair.chemistry}
                            </span>
                          </div>
                          <p style={{ fontSize: '10px', color: '#6B7280', lineHeight: '1.5' }}>
                            {pair.dynamic.length > 180 ? pair.dynamic.substring(0, 180) + '...' : pair.dynamic}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Known Friction Points ── */}
            {relevantFrictionPairs.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Known Friction Points & Resolutions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {relevantFrictionPairs.map((fp, idx) => (
                    <div key={idx} style={{
                      borderRadius: '10px', overflow: 'hidden',
                      border: '1px solid #FCA5A5'
                    }}>
                      <div style={{
                        background: '#FEF2F2', padding: '10px 14px',
                        borderBottom: '1px solid #FCA5A5'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                            {fp.member1} vs {fp.member2}
                          </span>
                          <span style={{ fontSize: '9px', color: '#9CA3AF' }}>
                            ({fp.pair.pairNames[0]} + {fp.pair.pairNames[1]})
                          </span>
                        </div>
                        <p style={{ fontSize: '10px', color: '#7F1D1D', lineHeight: '1.5' }}>
                          {fp.pair.frictionPoint.length > 200 ? fp.pair.frictionPoint.substring(0, 200) + '...' : fp.pair.frictionPoint}
                        </p>
                      </div>
                      <div style={{ background: '#F0FDF4', padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolution</span>
                        </div>
                        <p style={{ fontSize: '10px', color: '#166534', lineHeight: '1.5' }}>
                          {fp.pair.resolution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Recommendations ── */}
            {analysis.recommendations.length > 0 && (
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid #C7D2FE', marginBottom: '20px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #4338CA, #6D28D9)',
                  padding: '14px 20px', color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      <path d="M19 3v4" />
                      <path d="M21 5h-4" />
                    </svg>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                      Recommendations
                    </h3>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', background: '#EEF2FF' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {analysis.recommendations.map((r, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px',
                        background: 'white', border: '1px solid #E0E7FF'
                      }}>
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: '#C7D2FE', color: '#4338CA',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '10px', fontWeight: 'bold', flexShrink: 0, marginTop: '1px'
                        }}>
                          {idx + 1}
                        </div>
                        <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.6' }}>{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Sharing Note ── */}
            <div style={{
              background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF, #FDF4FF)',
              borderRadius: '12px', padding: '16px 20px',
              border: '1px solid #DDD6FE', marginBottom: '20px'
            }}>
              <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.6', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                This report is designed to be shared with team members, collaborators, managers, or coaches
                to foster mutual understanding of each person's elemental contribution to the group. Understanding
                your team's elemental chemistry is the first step toward building a group that is not just productive,
                but genuinely cohesive — where each person's natural strengths are recognized, leveraged, and celebrated.
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
                {members.length} team members — {analysis.pairDetails.length} pairings analyzed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCompositionShareGuide;
