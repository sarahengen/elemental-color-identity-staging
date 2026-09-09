import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Download, Printer, X, Link2, Copy, Check, Mail, Share2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { conflictData } from '@/data/conflictData';


// ── Types ──────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  name: string;
  subtypeId: string;
}

interface PairingResult {
  memberA: TeamMember;
  memberB: TeamMember;
  frictionScore: number;
  category: 'ally' | 'compatible' | 'hidden-friction' | 'high-clash';
  categoryLabel: string;
  description: string;
  responseInteraction: string;
  mediationGuide: any;
  guideSwapped: boolean;
}

interface ConflictProtocol {
  title: string;
  steps: string[];
  principles: string[];
  warningSignals: string[];
}

interface TeamConflictShareGuideProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  pairings: PairingResult[];
  groupRiskScore: number;
  groupRiskLabel: { label: string; color: string; bg: string; border: string; description: string };
  responseDistribution: Record<string, { count: number; members: string[] }>;
  groupPatterns: string[];
  conflictProtocol: ConflictProtocol | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const allSubtypes = conflictData.flatMap(el =>
  el.subtypes.map(s => ({
    ...s,
    elementId: el.elementId,
    element: el.element,
    gradientFrom: el.gradientFrom,
    gradientTo: el.gradientTo
  }))
);

const getSubtype = (id: string) => allSubtypes.find(s => s.subtypeId === id);

const responseInfo: Record<string, { label: string; color: string; bg: string; textDark: string }> = {
  fight: { label: 'Fight', color: '#DC2626', bg: '#FEE2E2', textDark: '#991B1B' },
  flight: { label: 'Flight', color: '#D97706', bg: '#FEF3C7', textDark: '#92400E' },
  freeze: { label: 'Freeze', color: '#2563EB', bg: '#DBEAFE', textDark: '#1E40AF' },
  fawn: { label: 'Fawn', color: '#059669', bg: '#D1FAE5', textDark: '#065F46' }
};

const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'ally': { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0', dot: '#10B981' },
  'compatible': { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD', dot: '#3B82F6' },
  'hidden-friction': { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D', dot: '#F59E0B' },
  'high-clash': { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5', dot: '#EF4444' }
};

// ── Component ──────────────────────────────────────────────────────────────────

const TeamConflictShareGuide: React.FC<TeamConflictShareGuideProps> = ({
  isOpen,
  onClose,
  members,
  pairings,
  groupRiskScore,
  groupRiskLabel,
  responseDistribution,
  groupPatterns,
  conflictProtocol
}) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Generate shareable link
  const shareableLink = useMemo(() => {
    const teamData = members.map(m => ({ n: m.name, s: m.subtypeId }));
    const encoded = btoa(encodeURIComponent(JSON.stringify(teamData)));
    return `${window.location.origin}${window.location.pathname}?teammap=${encoded}`;
  }, [members]);

  // Generate plain text summary
  const textSummary = useMemo(() => {
    const lines: string[] = [];
    lines.push('═══════════════════════════════════════════');
    lines.push('     TEAM CONFLICT DYNAMICS REPORT');
    lines.push('═══════════════════════════════════════════');
    lines.push('');
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
    lines.push('');

    lines.push('── TEAM MEMBERS ──');
    members.forEach((m, i) => {
      const s = getSubtype(m.subtypeId);
      if (s) {
        lines.push(`  ${i + 1}. ${m.name} — ${s.subtype} (${s.conflictArchetype}) [${responseInfo[s.defaultResponse].label}]`);
      }
    });
    lines.push('');

    lines.push(`── GROUP CONFLICT RISK SCORE: ${groupRiskScore}/100 (${groupRiskLabel.label}) ──`);
    lines.push(groupRiskLabel.description);
    lines.push('');

    lines.push('── RESPONSE DISTRIBUTION ──');
    (['fight', 'flight', 'freeze', 'fawn'] as const).forEach(r => {
      const d = responseDistribution[r];
      const pct = members.length > 0 ? Math.round((d.count / members.length) * 100) : 0;
      lines.push(`  ${responseInfo[r].label}: ${d.count} (${pct}%) — ${d.members.join(', ') || 'None'}`);
    });
    lines.push('');

    lines.push('── ALL PAIRINGS (Ranked by Friction) ──');
    pairings.forEach(p => {
      lines.push(`  [${p.frictionScore}] ${p.memberA.name} vs ${p.memberB.name} — ${p.categoryLabel}`);
      lines.push(`       ${p.responseInteraction}`);
      lines.push('');
    });

    if (groupPatterns.length > 0) {
      lines.push('── PREDICTED GROUP CONFLICT PATTERNS ──');
      groupPatterns.forEach((p, i) => {
        lines.push(`  ${i + 1}. ${p}`);
        lines.push('');
      });
    }

    if (conflictProtocol) {
      lines.push(`── CONFLICT PROTOCOL: ${conflictProtocol.title} ──`);
      lines.push('');
      lines.push('Steps:');
      conflictProtocol.steps.forEach((s, i) => {
        lines.push(`  ${i + 1}. ${s}`);
      });
      lines.push('');
      lines.push('Principles:');
      conflictProtocol.principles.forEach(p => {
        lines.push(`  • ${p}`);
      });
      lines.push('');
      lines.push('Warning Signals:');
      conflictProtocol.warningSignals.forEach(w => {
        lines.push(`  ⚠ ${w}`);
      });
    }

    lines.push('');
    lines.push('═══════════════════════════════════════════');
    lines.push('  Generated from Elemental Color Analysis');
    lines.push('═══════════════════════════════════════════');

    return lines.join('\n');
  }, [members, pairings, groupRiskScore, groupRiskLabel, responseDistribution, groupPatterns, conflictProtocol]);

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
      link.download = `team-conflict-map-${new Date().toISOString().slice(0, 10)}.png`;
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
          <title>Team Conflict Dynamics Report</title>
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
    const subject = encodeURIComponent('Team Conflict Dynamics Report');
    const body = encodeURIComponent(
      `I've generated a Team Conflict Dynamics Report for our group. Here's the summary:\n\n` +
      `Group Risk Score: ${groupRiskScore}/100 (${groupRiskLabel.label})\n` +
      `Team Members: ${members.map(m => m.name).join(', ')}\n\n` +
      `View the full interactive report here:\n${shareableLink}\n\n` +
      `--- Full Text Report ---\n\n${textSummary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [groupRiskScore, groupRiskLabel.label, members, shareableLink, textSummary]);

  if (!isOpen) return null;

  const highClashPairings = pairings.filter(p => p.category === 'high-clash');
  const hiddenFrictionPairings = pairings.filter(p => p.category === 'hidden-friction');
  const allyPairings = pairings.filter(p => p.category === 'ally');
  const compatiblePairings = pairings.filter(p => p.category === 'compatible');

  const riskStrokeColor = groupRiskScore <= 35 ? '#22c55e' : groupRiskScore <= 50 ? '#0ea5e9' : groupRiskScore <= 65 ? '#f59e0b' : '#ef4444';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-900 to-gray-800 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Share Team Conflict Guide</h2>
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white text-sm font-medium hover:from-rose-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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
              className="text-xs text-rose-600 font-medium hover:text-rose-700 flex-shrink-0"
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 px-1">
            Anyone with this link can view the team composition and auto-generate the same analysis.
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
                background: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)',
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
                position: 'absolute', top: '-20px', right: '-20px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)'
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', left: '40%',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.03)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
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
                    Team Conflict Dynamics Report
                  </h1>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
                    Elemental Conflict Analysis — {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Team member pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {members.map(m => {
                  const s = getSubtype(m.subtypeId);
                  return (
                    <div key={m.id} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                      padding: '4px 12px 4px 8px', fontSize: '12px'
                    }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '4px',
                        background: s ? `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})` : '#666',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          {s?.elementId === 'fire' && <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></>}
                          {s?.elementId === 'water' && <><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></>}
                          {s?.elementId === 'earth' && <><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></>}
                          {s?.elementId === 'air' && <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></>}
                        </svg>
                      </div>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                      {s && (
                        <span style={{
                          background: responseInfo[s.defaultResponse].bg,
                          color: responseInfo[s.defaultResponse].textDark,
                          padding: '1px 6px', borderRadius: '8px', fontSize: '9px', fontWeight: 700
                        }}>
                          {responseInfo[s.defaultResponse].label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Group Risk Score ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px',
              padding: '20px', marginBottom: '20px'
            }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                <svg width="80" height="80" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="#E5E7EB" strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke={riskStrokeColor} strokeWidth="3"
                    strokeDasharray={`${groupRiskScore}, 100`} strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>{groupRiskScore}</span>
                  <span style={{ fontSize: '8px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Risk</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937', fontFamily: 'Georgia, serif' }}>
                    Group Conflict Risk Score
                  </span>
                  <span style={{
                    padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
                    background: groupRiskScore <= 35 ? '#D1FAE5' : groupRiskScore <= 50 ? '#DBEAFE' : groupRiskScore <= 65 ? '#FEF3C7' : '#FEE2E2',
                    color: groupRiskScore <= 35 ? '#065F46' : groupRiskScore <= 50 ? '#1E40AF' : groupRiskScore <= 65 ? '#92400E' : '#991B1B'
                  }}>
                    {groupRiskLabel.label}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.5' }}>{groupRiskLabel.description}</p>
              </div>
            </div>

            {/* ── Response Distribution ── */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Group Response Distribution
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                {(['fight', 'flight', 'freeze', 'fawn'] as const).map(r => {
                  const d = responseDistribution[r];
                  const pct = members.length > 0 ? Math.round((d.count / members.length) * 100) : 0;
                  const info = responseInfo[r];
                  return (
                    <div key={r} style={{
                      padding: '12px', borderRadius: '8px',
                      background: info.bg, border: `1px solid ${info.bg}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: info.textDark }}>{info.label}</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>{d.count}</div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px', marginBottom: '4px' }}>
                        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '2px', background: info.color }} />
                      </div>
                      {d.members.length > 0 && (
                        <p style={{ fontSize: '9px', color: '#6B7280' }}>{d.members.join(', ')}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Team Members Detail ── */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Team Member Profiles
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {members.map(m => {
                  const s = getSubtype(m.subtypeId);
                  if (!s) return null;
                  return (
                    <div key={m.id} style={{
                      padding: '12px', borderRadius: '8px',
                      background: `linear-gradient(135deg, ${s.gradientFrom}08, ${s.gradientTo}08)`,
                      border: `1px solid ${s.gradientFrom}20`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '6px',
                          background: `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            {s.elementId === 'fire' && <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />}
                            {s.elementId === 'water' && <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />}
                            {s.elementId === 'earth' && <path d="m8 3 4 8 5-5 5 15H2L8 3z" />}
                            {s.elementId === 'air' && <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /></>}
                          </svg>
                        </div>
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1F2937' }}>{m.name}</span>
                          <span style={{ fontSize: '10px', color: '#6B7280', marginLeft: '6px' }}>{s.subtype}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', color: '#4B5563', fontStyle: 'italic' }}>{s.conflictArchetype}</span>
                        <span style={{
                          padding: '1px 6px', borderRadius: '8px', fontSize: '9px', fontWeight: 700,
                          background: responseInfo[s.defaultResponse].bg,
                          color: responseInfo[s.defaultResponse].textDark
                        }}>
                          {responseInfo[s.defaultResponse].label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Compatibility Matrix (simplified) ── */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                Conflict Compatibility — All Pairings
              </h3>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {[
                  { cat: 'ally', label: 'Natural Allies (0-32)' },
                  { cat: 'compatible', label: 'Compatible (33-52)' },
                  { cat: 'hidden-friction', label: 'Hidden Friction (53-68)' },
                  { cat: 'high-clash', label: 'High Clash Risk (69-100)' }
                ].map(item => (
                  <div key={item.cat} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: categoryColors[item.cat].dot }} />
                    <span style={{ fontSize: '9px', color: '#6B7280' }}>{item.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {pairings.map((p, idx) => {
                  const colors = categoryColors[p.category];
                  const sA = getSubtype(p.memberA.subtypeId);
                  const sB = getSubtype(p.memberB.subtypeId);
                  return (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 12px', borderRadius: '8px',
                      background: colors.bg, border: `1px solid ${colors.border}`
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'white', border: `1px solid ${colors.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '13px', fontWeight: 'bold', color: colors.text, flexShrink: 0
                      }}>
                        {p.frictionScore}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>{p.memberA.name}</span>
                          {sA && <span style={{ fontSize: '9px', color: '#9CA3AF' }}>({sA.subtype})</span>}
                          <span style={{ fontSize: '10px', color: '#9CA3AF' }}>vs</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F2937' }}>{p.memberB.name}</span>
                          {sB && <span style={{ fontSize: '9px', color: '#9CA3AF' }}>({sB.subtype})</span>}
                        </div>
                        <p style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px', lineHeight: '1.4' }}>
                          {p.responseInteraction.length > 160 ? p.responseInteraction.substring(0, 160) + '...' : p.responseInteraction}
                        </p>
                      </div>
                      <span style={{
                        padding: '2px 8px', borderRadius: '10px', fontSize: '9px', fontWeight: 700,
                        background: 'white', color: colors.text, border: `1px solid ${colors.border}`,
                        flexShrink: 0, whiteSpace: 'nowrap'
                      }}>
                        {p.categoryLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Predicted Patterns ── */}
            {groupPatterns.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Predicted Group Conflict Patterns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {groupPatterns.map((pattern, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      padding: '10px 12px', borderRadius: '8px',
                      background: '#F5F3FF', border: '1px solid #E9D5FF'
                    }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        background: '#DDD6FE', color: '#6D28D9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 'bold', flexShrink: 0, marginTop: '1px'
                      }}>
                        {idx + 1}
                      </div>
                      <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.5' }}>{pattern}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Conflict Protocol ── */}
            {conflictProtocol && (
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid #E5E7EB', marginBottom: '20px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1F2937, #374151)',
                  padding: '16px 20px', color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                        {conflictProtocol.title}
                      </h3>
                      <p style={{ fontSize: '11px', opacity: 0.6 }}>Customized conflict protocol for your group</p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px 20px' }}>
                  {/* Steps */}
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    When Conflict Arises — Follow These Steps
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {conflictProtocol.steps.map((step, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '8px 10px', borderRadius: '8px',
                        background: '#EEF2FF', border: '1px solid #E0E7FF'
                      }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: '#C7D2FE', color: '#4338CA',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '9px', fontWeight: 'bold', flexShrink: 0, marginTop: '1px'
                        }}>
                          {idx + 1}
                        </div>
                        <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5' }}>{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Principles */}
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Group Conflict Principles
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                    {conflictProtocol.principles.map((p, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '6px 10px', borderRadius: '6px',
                        background: '#FFFBEB', border: '1px solid #FDE68A'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5' }}>{p}</p>
                      </div>
                    ))}
                  </div>

                  {/* Warning Signals */}
                  <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Warning Signals — Intervene When You See These
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {conflictProtocol.warningSignals.map((w, idx) => (
                      <div key={idx} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '8px',
                        padding: '6px 10px', borderRadius: '6px',
                        background: '#FEF2F2', border: '1px solid #FECACA'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <p style={{ fontSize: '10px', color: '#374151', lineHeight: '1.5' }}>{w}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Sharing Note ── */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF1F2, #FFF7ED, #FFFBEB)',
              borderRadius: '12px', padding: '16px 20px',
              border: '1px solid #FECDD3', marginBottom: '20px'
            }}>
              <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.6', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                This report is designed to be shared with all team members, partners, family members, or therapists 
                involved in the conflict dynamics described above. Understanding each person's elemental conflict style 
                is the first step toward choosing responses rather than being chosen by them. The goal is not to eliminate 
                conflict but to transform it from a destructive force into a generative one.
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
                {members.length} team members — {pairings.length} pairings analyzed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConflictShareGuide;
