import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Sparkles, ChevronDown, ChevronUp, MessageSquare, Mail, Users, Megaphone, MessageCircle, ArrowRight, Copy, Check, Mic, PenTool, Eye, Send } from 'lucide-react';
import { communicationData, crossElementTemplates, CommunicationElement, CrossElementTemplate } from '@/data/communicationData';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface ElementalCommunicationStylesProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const elementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-6 h-6" />,
  water: <Droplets className="w-6 h-6" />,
  earth: <Mountain className="w-6 h-6" />,
  air: <Wind className="w-6 h-6" />
};

const smallElementIcons: Record<string, React.ReactNode> = {
  fire: <Flame className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  earth: <Mountain className="w-4 h-4" />,
  air: <Wind className="w-4 h-4" />
};

const mediumIcons: Record<string, React.ReactNode> = {
  'Verbal': <Mic className="w-4 h-4" />,
  'Written': <PenTool className="w-4 h-4" />,
  'Visual': <Eye className="w-4 h-4" />,
  'In-Person': <Users className="w-4 h-4" />
};

const getMediumIcon = (medium: string) => {
  if (medium.startsWith('Verbal')) return mediumIcons['Verbal'];
  if (medium.startsWith('Written')) return mediumIcons['Written'];
  if (medium.startsWith('Visual')) return mediumIcons['Visual'];
  if (medium.startsWith('In-Person')) return mediumIcons['In-Person'];
  return <MessageSquare className="w-4 h-4" />;
};

const ElementalCommunicationStyles: React.FC<ElementalCommunicationStylesProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [activeTab, setActiveTab] = useState<'profiles' | 'templates' | 'translator'>('profiles');
  const [copiedTemplate, setCopiedTemplate] = useState<number | null>(null);
  const [translatorFrom, setTranslatorFrom] = useState<string>(userElement || 'fire');
  const [translatorTo, setTranslatorTo] = useState<string>(
    userElement === 'water' ? 'fire' : 'water'
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;
  const isUserElement = (elementId: string) => userElement === elementId;

  const copyTemplate = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTemplate(index);
      setTimeout(() => setCopiedTemplate(null), 2000);
    });
  };

  const getFilteredTemplates = (): CrossElementTemplate[] => {
    return crossElementTemplates.filter(
      t => t.fromId === translatorFrom && t.toId === translatorTo
    );
  };

  const elementNames: Record<string, string> = {
    fire: 'Fire', water: 'Water', earth: 'Earth', air: 'Air'
  };

  const elementGradients: Record<string, { from: string; to: string }> = {
    fire: { from: '#C41E3A', to: '#FF6B35' },
    water: { from: '#6B8BA4', to: '#B4A7D6' },
    earth: { from: '#8B4513', to: '#228B22' },
    air: { from: '#00CED1', to: '#FFE135' }
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            Communication is not just the transfer of information. It is the translation of one consciousness into the 
            language of another. Every elemental type has a native communication frequency—a way of encoding meaning that 
            feels natural and effortless. The friction in most teams is not about disagreement. It is about translation failure. 
            Learn to speak every element's language, and you unlock the full intelligence of every person you work with.
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 'profiles' as const, label: 'Communication Profiles', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'templates' as const, label: 'Cross-Element Templates', icon: <Mail className="w-4 h-4" /> },
          { id: 'translator' as const, label: 'Message Translator', icon: <ArrowRight className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Communication Profiles */}
      {activeTab === 'profiles' && (
        <div className="space-y-6">
          {communicationData.map((element) => (
            <div
              key={element.element}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
                isUserElement(element.elementId)
              )}`}
            >
              {/* Element Header */}
              <button
                onClick={() => toggleElement(element.elementId)}
                className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                    }}
                  >
                    {elementIcons[element.elementId]}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                      {isUserElement(element.elementId) && (
                        <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                          Your Element
                        </span>
                      )}
                    </div>
                    <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                      {element.tagline}
                    </GuideElementSubtitlePill>
                  </div>
                </div>
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Subtypes Content */}
              {expandedElements.includes(element.elementId) && (
                <div className="bg-gradient-to-br from-gray-50 to-white">
                  <div className="p-6 space-y-8">
                    {element.subtypes.map((subtype) => {
                      const isHighlighted = isUserSubtype(subtype.subtypeId);

                      return (
                        <div
                          key={subtype.subtype}
                          className={`relative rounded-xl p-6 md:p-8 transition-all duration-300 ${
                            isHighlighted
                              ? GUIDE_USER_SUBTYPE_CARD_CLASS
                              : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          style={{
                            background: !isHighlighted
                              ? `linear-gradient(135deg, ${element.gradientFrom}06, ${element.gradientTo}06)`
                              : undefined
                          }}
                        >
                          {/* User Badge */}
                          {isHighlighted && (
                            <div className="absolute -top-3 right-4">
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Your Communication Style
                              </span>
                            </div>
                          )}

                          {/* Subtype Header */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span
                              className="text-sm font-semibold px-2.5 py-1 rounded-md"
                              style={{
                                background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                                color: element.gradientFrom
                              }}
                            >
                              {subtype.subtype}
                            </span>
                            <span className="text-gray-400">|</span>
                            <span className="text-sm text-gray-500 italic">{subtype.name}</span>
                          </div>

                          {/* Communication Archetype Title */}
                          <h4 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" style={{ color: element.gradientFrom }} />
                            {subtype.communicationArchetype}
                          </h4>

                          {/* Preferred Medium Badge */}
                          <div className="flex items-center gap-2 mb-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-700">
                              {getMediumIcon(subtype.preferredMedium)}
                              Preferred: {subtype.preferredMedium}
                            </span>
                          </div>

                          {/* Preferred Medium Detail */}
                          <div className="p-4 md:p-5 bg-indigo-50/80 rounded-lg border border-indigo-100 mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              {getMediumIcon(subtype.preferredMedium)}
                              <span className="font-semibold text-sm text-indigo-700">Preferred Communication Medium</span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.preferredMediumDetail}</p>
                          </div>

                          {/* Email & Meeting Styles - Side by Side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 md:p-5 bg-blue-50/80 rounded-lg border border-blue-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-sm text-blue-700">Email Style</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.emailStyle}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-violet-50/80 rounded-lg border border-violet-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-violet-600" />
                                <span className="font-semibold text-sm text-violet-700">Meeting Style</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.meetingStyle}</p>
                            </div>
                          </div>

                          {/* Giving & Receiving Feedback - Side by Side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-4 md:p-5 bg-emerald-50/80 rounded-lg border border-emerald-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Megaphone className="w-4 h-4 text-emerald-600" />
                                <span className="font-semibold text-sm text-emerald-700">Giving Feedback</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.givingFeedback}</p>
                            </div>
                            <div className="p-4 md:p-5 bg-amber-50/80 rounded-lg border border-amber-100">
                              <div className="flex items-center gap-2 mb-3">
                                <MessageCircle className="w-4 h-4 text-amber-600" />
                                <span className="font-semibold text-sm text-amber-700">Receiving Feedback</span>
                              </div>
                              <p className="leading-relaxed text-xs text-gray-700">{subtype.receivingFeedback}</p>
                            </div>
                          </div>

                          {/* Presentation Strengths */}
                          <div className="p-4 md:p-5 bg-rose-50/80 rounded-lg border border-rose-100 mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Megaphone className="w-4 h-4 text-rose-600" />
                              <span className="font-semibold text-sm text-rose-700">Presentation Strengths</span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.presentationStrengths}</p>
                          </div>

                          {/* How to Reach Them */}
                          <div
                            className="p-4 md:p-5 rounded-lg border"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                              borderColor: `${element.gradientFrom}25`
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Send className="w-4 h-4" style={{ color: element.gradientFrom }} />
                              <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                                How to Reach This Type
                              </span>
                            </div>
                            <p className="leading-relaxed text-sm text-gray-700">{subtype.howToReachThem}</p>
                          </div>

                          {/* Decorative accent */}
                          <div
                            className="absolute top-0 right-0 w-20 h-20 opacity-15 rounded-tr-xl rounded-bl-full"
                            style={{
                              background: `linear-gradient(to bottom left, ${element.gradientFrom}40, transparent)`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB: Cross-Element Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              These templates are not scripts—they are translation guides. Use them to adapt your natural 
              communication style when speaking to someone whose elemental frequency differs from yours. 
              The goal is not to become someone else, but to make your message receivable.
            </p>
          </div>

          <div className="space-y-4">
            {crossElementTemplates.map((template, idx) => {
              const fromGrad = elementGradients[template.fromId];
              const toGrad = elementGradients[template.toId];

              return (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5 md:p-6">
                    {/* Pair Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: `linear-gradient(135deg, ${fromGrad.from}, ${fromGrad.to})` }}
                      >
                        {smallElementIcons[template.fromId]}
                        {template.from}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: `linear-gradient(135deg, ${toGrad.from}, ${toGrad.to})` }}
                      >
                        {smallElementIcons[template.toId]}
                        {template.to}
                      </span>
                    </div>

                    {/* Core Principle */}
                    <div className="p-4 bg-indigo-50/80 rounded-lg border border-indigo-100 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        <span className="font-semibold text-sm text-indigo-700">Core Principle</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{template.principle}</p>
                    </div>

                    {/* Do / Avoid Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-xs text-emerald-700">Do This</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{template.doThis}</p>
                      </div>
                      <div className="p-4 bg-red-50/80 rounded-lg border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-4 h-4 flex items-center justify-center text-red-600 font-bold text-xs">X</span>
                          <span className="font-semibold text-xs text-red-700">Avoid This</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{template.avoidThis}</p>
                      </div>
                    </div>

                    {/* Email Template */}
                    <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-xs text-blue-700">Email Template</span>
                        </div>
                        <button
                          onClick={() => copyTemplate(template.emailTemplate, idx)}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        >
                          {copiedTemplate === idx ? (
                            <><Check className="w-3 h-3" /> Copied</>
                          ) : (
                            <><Copy className="w-3 h-3" /> Copy</>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-mono bg-white/60 p-3 rounded border border-blue-100">
                        {template.emailTemplate}
                      </p>
                    </div>

                    {/* Meeting Tip */}
                    <div className="p-4 bg-violet-50/80 rounded-lg border border-violet-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-violet-600" />
                        <span className="font-semibold text-xs text-violet-700">Meeting Tip</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{template.meetingTip}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Message Translator */}
      {activeTab === 'translator' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-sm text-gray-600">
              Select your element and the element of the person you need to communicate with. 
              Get tailored guidance for translating your message into their communication language.
            </p>
          </div>

          {/* Element Selectors */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center mb-8">
              {/* From Selector */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Element</p>
                <div className="flex gap-2">
                  {(['fire', 'water', 'earth', 'air'] as const).map(el => {
                    const grad = elementGradients[el];
                    return (
                      <button
                        key={el}
                        onClick={() => {
                          setTranslatorFrom(el);
                          if (el === translatorTo) {
                            const others = ['fire', 'water', 'earth', 'air'].filter(e => e !== el);
                            setTranslatorTo(others[0]);
                          }
                        }}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all ${
                          translatorFrom === el
                            ? 'ring-3 ring-offset-2 ring-indigo-400 scale-110 shadow-lg'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                        style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                        title={elementNames[el]}
                      >
                        {elementIcons[el]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">{elementNames[translatorFrom]}</p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center">
                <ArrowRight className="w-8 h-8 text-indigo-400 hidden md:block" />
                <ChevronDown className="w-8 h-8 text-indigo-400 md:hidden" />
                <p className="text-xs text-gray-400 mt-1">speaking to</p>
              </div>

              {/* To Selector */}
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Their Element</p>
                <div className="flex gap-2">
                  {(['fire', 'water', 'earth', 'air'] as const).filter(el => el !== translatorFrom).map(el => {
                    const grad = elementGradients[el];
                    return (
                      <button
                        key={el}
                        onClick={() => setTranslatorTo(el)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all ${
                          translatorTo === el
                            ? 'ring-3 ring-offset-2 ring-indigo-400 scale-110 shadow-lg'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                        style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                        title={elementNames[el]}
                      >
                        {elementIcons[el]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">{elementNames[translatorTo]}</p>
              </div>
            </div>

            {/* Filtered Results */}
            {getFilteredTemplates().length > 0 ? (
              getFilteredTemplates().map((template, idx) => {
                const fromGrad = elementGradients[template.fromId];
                const toGrad = elementGradients[template.toId];

                return (
                  <div key={idx} className="space-y-4">
                    {/* Header */}
                    <div
                      className="p-5 rounded-xl text-white"
                      style={{
                        background: `linear-gradient(135deg, ${fromGrad.from}, ${toGrad.to})`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {elementIcons[template.fromId]}
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60" />
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {elementIcons[template.toId]}
                        </div>
                      </div>
                      <h4 className="text-lg font-serif mb-1">
                        {template.from} Speaking to {template.to}
                      </h4>
                      <p className="text-white/90 text-sm font-medium">{template.principle}</p>
                    </div>

                    {/* Do / Avoid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-3">
                          <Check className="w-5 h-5 text-emerald-600" />
                          <span className="font-semibold text-emerald-700">Do This</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{template.doThis}</p>
                      </div>
                      <div className="p-5 bg-red-50 rounded-xl border border-red-100">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-5 h-5 flex items-center justify-center text-red-600 font-bold">X</span>
                          <span className="font-semibold text-red-700">Avoid This</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{template.avoidThis}</p>
                      </div>
                    </div>

                    {/* Email Template */}
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-700">Email Template</span>
                        </div>
                        <button
                          onClick={() => copyTemplate(template.emailTemplate, 100 + idx)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          {copiedTemplate === 100 + idx ? (
                            <><Check className="w-4 h-4" /> Copied!</>
                          ) : (
                            <><Copy className="w-4 h-4" /> Copy Template</>
                          )}
                        </button>
                      </div>
                      <div className="bg-white/70 p-4 rounded-lg border border-blue-100 font-mono text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {template.emailTemplate}
                      </div>
                    </div>

                    {/* Meeting Tip */}
                    <div className="p-5 bg-violet-50 rounded-xl border border-violet-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-violet-600" />
                        <span className="font-semibold text-violet-700">Meeting Strategy</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{template.meetingTip}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Select different elements to see the translation guide.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* The Communication Truth */}
      <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 rounded-2xl border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Communication Truth</h4>
            <p className="text-gray-600 leading-relaxed">
              The greatest communicators are not the most eloquent speakers or the most polished writers. They are 
              the people who have learned to translate their native frequency into the language of whoever they are 
              speaking to—without losing their own voice in the process. This is not manipulation. It is respect. 
              It is the recognition that every person deserves to receive information in a form they can actually use. 
              When you learn to speak Fire to Fire types, Water to Water types, Earth to Earth types, and Air to Air 
              types, you do not become a chameleon. You become a polyglot. And in a world of elemental diversity, 
              the polyglot is the one who builds the bridges that everyone else walks across.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalCommunicationStyles;
