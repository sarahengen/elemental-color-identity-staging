import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, Building2, ChevronDown, ChevronUp, ShieldAlert, Sparkles } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
} from '@/lib/guideElementVisualTheme';

interface WorkEnvironmentSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  idealLabel: string;
  idealEnvironment: string;
  avoid: string;
}

interface WorkEnvironmentElement {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: WorkEnvironmentSubtype[];
}

const workEnvironmentData: WorkEnvironmentElement[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Environments of Agency & Impact',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        idealLabel: 'The Arena',
        idealEnvironment: 'High stakes, clear metrics, and autonomy. A culture that values decisive action, direct communication, and measurable results. Bureaucracy is minimal; competence is rewarded. They thrive in crisis, turnarounds, startups, and elite teams where excellence is the baseline.',
        avoid: 'Consensus-driven cultures with endless meetings, performative collaboration, and rewards based on tenure rather than impact.'
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        idealLabel: 'The Laboratory',
        idealEnvironment: 'Quiet, focused, and intellectually rigorous. A culture that values deep work, specialized expertise, and long-term thinking. They need uninterrupted blocks of time, access to complex problems, and respect for their need to process before speaking. They thrive in R&D, think tanks, advanced analytics, and strategic advisory roles.',
        avoid: 'Open-plan chaos, constant interruption, cultures that prioritize speed over accuracy, and environments that demand constant performative enthusiasm.'
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        idealLabel: 'The Fortress',
        idealEnvironment: 'A stable, established organization with clear hierarchies, defined responsibilities, and a strong sense of mission. They need to feel that their work has enduring value and that their loyalty will be reciprocated. They thrive in operations, security, project management, and legacy institutions where reliability is honored.',
        avoid: 'Pivot-driven startups, cultures of constant reorganization, environments where tenure is viewed with suspicion.'
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        idealLabel: 'The Playground',
        idealEnvironment: 'Dynamic, creative, and socially vibrant. A culture that values enthusiasm, experimentation, and cross-pollination. They need variety, human interaction, and permission to be playful. They thrive in marketing, creative agencies, event production, edtech, and innovation labs.',
        avoid: 'Rigid, siloed, joyless environments where fun is viewed as unprofessional and curiosity is discouraged.'
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Environments of Connection & Depth',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        idealLabel: 'The Sanctuary',
        idealEnvironment: 'Psychologically safe, aesthetically gentle, and interpersonally warm. A culture that values kindness, work-life harmony, and emotional intelligence. They need managers who check in, colleagues who collaborate rather than compete, and spaces with soft lighting and quiet corners.',
        avoid: 'Aggressive, high-confrontation cultures, open warfare politics, environments that mock sensitivity as weakness.'
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        idealLabel: 'The Deep Well',
        idealEnvironment: 'Private, autonomous, and rich with meaning. A culture that values introspection, expertise, and the long view. They need minimal social demands, trust in their process, and work that touches something profound. They thrive in research, counseling, archival work, user experience research, and roles requiring deep empathy.',
        avoid: 'Performative corporate cultures, constant "culture fit" events, shallow metrics, and environments that pathologize introversion.'
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        idealLabel: 'The Hearth',
        idealEnvironment: 'Relationship-centric, values-driven, and warm. A culture that honors history, celebrates milestones, and invests in community. They need work that connects to something larger than profit, colleagues who become family, and rituals that mark shared achievement. They thrive in non-profits, family businesses, HR, alumni relations, and mission-driven organizations.',
        avoid: 'Transactional, disposable cultures with high turnover and no memory.'
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        idealLabel: 'The Nest',
        idealEnvironment: 'Supportive, stable, and practically focused. A culture that values service, reliability, and genuine care for employees. They need predictable schedules, appreciation for behind-the-scenes work, and a tangible sense that they are helping real people. They thrive in healthcare, education, social work, administrative roles that serve others, and operations that require patient, steady coordination.',
        avoid: 'Cutthroat competitiveness, cultures that demean support roles, environments that demand they sacrifice caregiving responsibilities.'
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Environments of Substance & Legacy',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        idealLabel: 'The Citadel',
        idealEnvironment: 'A place of authority, tradition, and clear ethical standards. They need to feel that their leadership is respected, their decisions carry weight, and the organization stands for something unshakeable. They thrive in law, governance, military, executive leadership, and institutions that prize integrity and long-term vision.',
        avoid: 'Chaotic environments without clear authority, organizations that shift values with trends, and cultures where leadership is undermined by constant second-guessing.'
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        idealLabel: 'The Workshop',
        idealEnvironment: 'Hands-on, grounded, and connected to tangible outcomes. A culture that values craftsmanship, patience, and the slow mastery of material. They need to see the direct results of their labor, work with their hands or with the land, and feel the rhythm of natural cycles. They thrive in agriculture, woodworking, physical therapy, veterinary medicine, and sustainability work.',
        avoid: 'Purely abstract or digital environments disconnected from the physical world, cultures that reward speed over quality, and workplaces that devalue manual skill.'
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        idealLabel: 'The Cocoon',
        idealEnvironment: 'Aesthetically pleasing, sensorally comfortable, and human-scaled. A culture that values well-being, beauty, and the quality of daily experience. They need spaces that feel good to inhabit—natural light, soft textures, plants, quiet. They thrive in interior design, hospitality, spa and wellness, user experience, and any organization that genuinely invests in workplace quality.',
        avoid: 'Soulless, harsh, fluorescent-lit environments that feel like warehouses for human labor.'
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',
        name: 'The Golden Harvest',
        idealLabel: 'The Atelier',
        idealEnvironment: 'A place of excellence, taste, and visible quality. They need to work alongside other craftspeople and creatives who share their obsession with getting it right. A culture that celebrates beauty, invests in materials, and refuses to compromise on presentation. They thrive in luxury goods, architecture, publishing, fine dining, museum curation, and any field where aesthetics are a competitive advantage.',
        avoid: 'Penny-wise, pound-foolish cultures that sacrifice quality for speed, environments that view beauty as frivolous.'
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Environments of Ideas & Freedom',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        idealLabel: 'The Observatory',
        idealEnvironment: 'A place of intellectual rigor, systems thinking, and evidence-based decision making. They need access to data, freedom from political interference, and colleagues who value logic over intuition. They thrive in technology, engineering, quantitative analysis, strategic planning, and any field where being correct matters more than being liked.',
        avoid: 'Emotion-driven cultures, organizations that routinely ignore data, environments that punish dissent.'
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        idealLabel: 'The Sandbox',
        idealEnvironment: 'Dynamic, interdisciplinary, and improvisational. A culture that values curiosity, rapid prototyping, and intellectual play. They need permission to explore, colleagues from different disciplines, and work that never feels repetitive. They thrive in innovation labs, creative agencies, gaming, design thinking consultancies, and roles that require constant learning.',
        avoid: 'Rigid hierarchies, micromanagement, cultures that demand specialization and penalize broad curiosity.'
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        idealLabel: 'The Forum',
        idealEnvironment: 'Collaborative, communicative, and community-oriented. A culture that values relationship-building, clear communication, and shared purpose. They need to work with people, facilitate connections, and feel that their words create positive change. They thrive in public relations, development, community management, diplomacy, learning and development, and mission-driven leadership.',
        avoid: 'Isolated, siloed roles with minimal human contact; cynical cultures that mock enthusiasm and collaboration.'
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        idealLabel: 'The Sanctuary of Subtlety',
        idealEnvironment: 'Quiet, beautiful, and minimally intrusive. A culture that values depth, intuition, and the long germination of ideas. They need freedom from noise, respect for their non-linear process, and work that feels meaningful rather than transactional. They thrive in poetry (yes, as a profession), user research, trend forecasting, ethical hacking, acoustic engineering, and any field that rewards sensitivity to subtle signals.',
        avoid: 'Open offices, constant interruptions, cultures that mistake volume for confidence and speed for intelligence.'
      }
    ]
  }
];



interface IdealWorkEnvironmentProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const IdealWorkEnvironment: React.FC<IdealWorkEnvironmentProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            The right environment is not a luxury; it is oxygen for your elemental nature. It either amplifies your gifts or slowly suffocates them. Here is what each subtype needs to thrive, not just survive.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {workEnvironmentData.map((element) => (
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
                  {element.icon}
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
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.elementId) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Element Description Banner */}
            {expandedElements.includes(element.elementId) && (
              <div
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`,
                  borderColor: `${element.gradientFrom}40`
                }}
              >
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.tagline} — Discover the ideal work environment for each {element.element} subtype.
                  </p>
                </div>
              </div>
            )}

            {/* Subtypes Content */}
            {expandedElements.includes(element.elementId) && (
              <div className="bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => {
                    const isHighlighted = isUserSubtype(subtype.subtypeId);

                    return (
                      <div
                        key={subtype.subtype}
                        className={`relative rounded-xl p-6 transition-all duration-300 ${
                          isHighlighted
                            ? 'border-2 border-amber-400 shadow-md'
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        style={{
                          background: isHighlighted
                            ? `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`
                            : `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`
                        }}
                      >
                        {/* User's Subtype Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-3 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Your Environment
                            </span>
                          </div>
                        )}

                        {/* Subtype Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                              color: element.gradientFrom
                            }}
                          >
                            {subtype.subtype}
                          </span>
                        </div>

                        {/* Subtype Name */}
                        <h4 className="text-xl font-bold mb-4 text-gray-900">
                          {subtype.name}
                        </h4>

                        {/* Ideal Environment */}
                        <div className="p-4 bg-emerald-50/80 rounded-lg border border-emerald-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Ideal Environment — {subtype.idealLabel}
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.idealEnvironment}
                          </p>
                        </div>

                        {/* Avoid */}
                        <div className="p-4 bg-red-50/80 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2">
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                            <span className="font-semibold text-sm text-red-700">
                              Avoid
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.avoid}
                          </p>
                        </div>

                        {/* Decorative corner accent */}
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-tr-xl rounded-bl-full"
                          style={{
                            background: `linear-gradient(to bottom left, ${element.gradientFrom}30, transparent)`
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

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-2xl border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Finding Your Ideal Environment</h4>
            <p className="text-gray-600 leading-relaxed">
              Your ideal work environment is not about comfort alone—it is about alignment. When your 
              environment matches your elemental nature, your gifts are amplified, your energy is 
              sustained, and your work becomes an expression of who you truly are. The right environment 
              does not guarantee success, but the wrong environment guarantees slow erosion, your energy 
              may turn static and your gifts can curdle into coping mechanisms. Use these insights to 
              evaluate your current workplace and seek environments that let you thrive.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IdealWorkEnvironment;
