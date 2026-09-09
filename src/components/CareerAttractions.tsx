import React, { useState } from 'react';
import { Sparkles, Flame, Droplets, Wind, Mountain, ChevronDown, ChevronUp, Briefcase, Target, Heart } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';

interface CareerSubtype {
  id: string;
  combination: string;
  drawnTo: string[];
  why: string;
}

interface CareerElement {
  id: string;
  name: string;
  careerTheme: string;
  needs: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  subtypes: CareerSubtype[];
}

const careerData: CareerElement[] = [
  {
    id: 'fire',
    name: 'Fire',
    careerTheme: 'Careers of Impact, Mastery, and Transformation',
    needs: 'Needs roles with autonomy, high stakes, clear results, and a capacity for decisive action.',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    subtypes: [
      {
        id: 'fire-fire',
        combination: 'Fire + Fire',
        drawnTo: [
          'Surgeon',
          'Litigator',
          'Elite Military Officer',
          'Crisis Manager',
          'Critic',
          'Forensic Scientist',
          'Ethical Hacker',
          'Professional Athlete (combat/individual)'
        ],
        why: 'Fields requiring unflinching precision, rapid decision-making under pressure, and the application of pure will. They thrive where there is a clear enemy (disease, injustice, an opponent) to be conquered.'
      },
      {
        id: 'fire-water',
        combination: 'Fire + Water',
        drawnTo: [
          'Research Scientist (theoretical physics, chemistry)',
          'Master Watchmaker',
          'Intelligence Analyst',
          'Neurosurgeon',
          'Classical Musician (orchestral conductor)',
          'Architect of minimalist spaces'
        ],
        why: 'Careers that merge intense intellectual focus with profound depth and patience. They excel where complexity must be held in a state of cool, contained pressure to produce a flawless result.'
      },
      {
        id: 'fire-earth',
        combination: 'Fire + Earth',
        drawnTo: [
          'CEO of a legacy company',
          'Master Carpenter/Blacksmith',
          'Head of Security',
          'Trial Judge',
          'Construction Project Manager',
          'Military Strategist',
          'Master Sommelier'
        ],
        why: 'Roles that demand enduring strength, strategic depth, and the ability to build or protect substantial, tangible systems. They are drawn to hierarchies where they can earn and wield authority.'
      },
      {
        id: 'fire-air',
        combination: 'Fire + Air',
        drawnTo: [
          'Entrepreneur (inspiring ventures)',
          'Motivational Speaker',
          'Creative Director',
          'Event Planner',
          'Broadway Performer',
          'Sports Coach',
          'Inventor',
          'Marketing Genius'
        ],
        why: 'Careers that are dynamic, people-centric, and allow for enthusiastic expression and inspiration. They need a stage, literal or metaphorical, to spark ideas and energy in others.'
      }
    ]
  },
  {
    id: 'water',
    name: 'Water',
    careerTheme: 'Careers of Connection, Healing, and Depth',
    needs: 'Needs roles with emotional resonance, human connection, and the capacity to nurture, understand, or create atmosphere.',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    subtypes: [
      {
        id: 'water-air',
        combination: 'Water + Air',
        drawnTo: [
          'Pediatric Nurse',
          'Hospice Worker',
          'Montessori Teacher',
          'Art Therapist',
          'Customer Experience Designer',
          'Floral Designer',
          'Curator of quiet museums'
        ],
        why: 'Professions that soften the edges of human experience, providing gentle care, comfort, and beauty. They excel in creating safe, harmonious environments.'
      },
      {
        id: 'water-water',
        combination: 'Water + Water',
        drawnTo: [
          'Psychoanalyst',
          'Depth Psychologist',
          'Historian',
          'Oceanographer',
          'Archivist',
          'Monk/Nun (contemplative orders)',
          'Novelist (literary fiction)',
          'Conflict Mediator'
        ],
        why: 'Careers that involve plumbing emotional, historical, or natural depths to find truth and meaning. They need quiet, reflective space to process and understand complexity.'
      },
      {
        id: 'water-fire',
        combination: 'Water + Fire',
        drawnTo: [
          'Museum Curator (folk/antique)',
          'Narrative Historian',
          'Sommelier or Cheese Monger',
          'Family Therapist',
          'Antique Restorer',
          'Culinary Preservationist',
          'Director of Heritage Sites'
        ],
        why: 'Roles that honor and reinterpret the past with warmth and expertise. They connect people to memory, tradition, and sensory legacy.'
      },
      {
        id: 'water-earth',
        combination: 'Water + Earth',
        drawnTo: [
          'Midwife',
          'Doula',
          'Social Worker (long-term case management)',
          'Gardener/Landscaper',
          'Elementary School Teacher',
          'Occupational Therapist',
          'Community Center Director'
        ],
        why: 'Careers of steady, patient, life-sustaining nurturance. They are the ultimate caregivers, building trust through consistent, reliable support and fostering growth in people or living systems.'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    careerTheme: 'Careers of Substance, Craft, and Sustenance',
    needs: 'Needs roles with tangible outcomes, mastery of material, reliability, and the ability to build, sustain, or provide.',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    subtypes: [
      {
        id: 'earth-fire',
        combination: 'Earth + Fire',

        drawnTo: [
          'Structural Engineer',
          'Banker (investment/wealth management)',
          'Archivist of rare documents',
          'Supreme Court Justice',
          'Geologist',
          'Monument Stonemason',
          'Security Systems Architect'
        ],
        why: 'Professions that are built on unshakeable principles, enduring structures, and the preservation of value. They are drawn to systems that require absolute integrity and long-term foresight.'
      },
      {
        id: 'earth-earth',
        combination: 'Earth + Earth',
        drawnTo: [
          'Farmer',
          'Forester',
          'Chef (farm-to-table)',
          'Physical Therapist',
          'Carpenter',
          'Potter',
          'Sustainability Consultant',
          'Veterinarian (large animal)'
        ],
        why: 'Careers that work directly with the cycles of nature, the body, or raw materials. They thrive on transforming the basic substances of life into nourishment, shelter, or health.'
      },
      {
        id: 'earth-water',
        combination: 'Earth + Water',
        drawnTo: [
          'Interior Designer (cozy/wellness spaces)',
          'Pastry Chef',
          'Bookbinder',
          'Textile Conservator',
          'Spa Director',
          'Sommelier (focusing on mouthfeel)',
          'Kindergarten Teacher'
        ],
        why: 'Roles that create tactile comfort, subtle luxury, and serene environments. They excel in making the physical world feel safe, beautiful, and gently indulgent.'
      },
      {
        id: 'earth-air',
        combination: 'Earth + Air',
        drawnTo: [
          'Restaurateur',
          'Jewelry Designer',
          'Perfumer',
          'Master Chocolatier',
          'Film Production Designer',
          'Fashion Designer (couture)',
          'Real Estate Developer of luxury properties',
          'Festival Director'
        ],
        why: 'Careers that celebrate abundance, sensory richness, and skilled craft. They are drawn to creating experiences and objects that are lavish, beautiful, and speak to the joy of the senses.'
      }
    ]
  },
  {
    id: 'air',
    name: 'Air',
    careerTheme: 'Careers of Intellect, Communication, and Innovation',
    needs: 'Needs roles with mental stimulation, freedom of ideas, communication, and the capacity to analyze, connect, or envision.',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    subtypes: [
      {
        id: 'air-air',
        combination: 'Air + Air',
        drawnTo: [
          'Philosopher',
          'Physicist',
          'Strategy Consultant',
          'Judge',
          'Investigative Journalist',
          'Air Traffic Controller',
          'Software Architect',
          'Urban Planner'
        ],
        why: 'Professions that require detached logic, systemic thinking, and the pursuit of objective truth or elegant structure. They need to work with clean systems and clear principles.'
      },
      {
        id: 'air-fire',
        combination: 'Air + Fire',
        drawnTo: [
          'Advertising Creative',
          'Game Designer',
          'Improv Comedian',
          'Toy Inventor',
          'Podcast Host',
          'Concept Artist',
          'Innovation Workshop Facilitator',
          'Social Media Strategist'
        ],
        why: 'Careers that are fast-paced, idea-driven, and require connecting disparate concepts in novel, engaging ways. They thrive on creative chaos and joyful communication.'
      },
      {
        id: 'air-earth',
        combination: 'Air + Earth',
        drawnTo: [
          'Corporate Trainer',
          'Diplomat',
          'Public Relations Director',
          'University Professor (beloved)',
          'Talk Show Host',
          'Community Organizer',
          'Sales Director for a mission-driven company'
        ],
        why: 'Roles that use warm, persuasive communication to educate, unite, or build consensus. They are drawn to building social structures and inspiring groups toward a shared goal.'
      },
      {
        id: 'air-water',
        combination: 'Air + Water',
        drawnTo: [
          'Poet',
          'Lyricist',
          'Sound Healer',
          'Intuitive Astrologer/Tarot Reader',
          'Museum Exhibit Designer (creating mood)',
          'Ethnomusicologist',
          'Editor of literary magazines',
          'Voice Actor (for animation)'
        ],
        why: 'Careers that work with nuance, subtlety, and the translation of ethereal feeling into form. They excel at capturing the ineffable and creating atmospheric, suggestive experiences.'
      }
    ]
  }
];



interface CareerAttractionsProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

const CareerAttractions: React.FC<CareerAttractionsProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(userSubtype || null);

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const isUserElement = (elementId: string) => userElement === elementId;
  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6">
            <Briefcase className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Workshop Feature</span>
          </div>
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Career Attractions</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Careers are not just jobs; they are environments where elemental energy can be expressed, 
            validated, and exchanged. The ideal career provides the correct "fuel" and "challenge" 
            for your subtype's nature.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {careerData.map((element) => (
          <div
            key={element.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${guideUserElementCardClass(
              isUserElement(element.id)
            )}`}
          >
            {/* Element Header */}
            <button
              onClick={() => toggleElement(element.id)}
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
                    <h3 className="text-2xl font-serif text-gray-900">{element.name}</h3>
                    {isUserElement(element.id) && (
                      <span className={GUIDE_USER_ELEMENT_BADGE_CLASS}>
                        Your Element
                      </span>
                    )}
                  </div>
                  <GuideElementSubtitlePill gradientFrom={element.gradientFrom} gradientTo={element.gradientTo}>
                    {element.careerTheme}
                  </GuideElementSubtitlePill>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {expandedElements.includes(element.id) ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </button>

            {/* Element Needs Banner */}
            {expandedElements.includes(element.id) && (
              <div 
                className="px-6 py-4 border-t border-b"
                style={{
                  background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                  borderColor: `${element.gradientFrom}20`
                }}
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: element.gradientFrom }} />
                  <p className="text-gray-700 italic">{element.needs}</p>
                </div>
              </div>
            )}

            {/* Subtypes Content */}
            {expandedElements.includes(element.id) && (
              <div className="bg-gradient-to-br from-gray-50 to-white">
                <div className="p-6 grid gap-6 md:grid-cols-2">
                  {element.subtypes.map((subtype) => (
                    <div
                      key={subtype.id}
                      className={`rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                        isUserSubtype(subtype.id)
                          ? GUIDE_USER_SUBTYPE_CARD_CLASS
                          : selectedSubtype === subtype.id
                          ? 'bg-white border-2 border-gray-300 shadow-md'
                          : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedSubtype(selectedSubtype === subtype.id ? null : subtype.id)}
                    >
                      {/* Subtype Header */}
                      <div className="mb-4">
                        {/* Element Combination Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span 
                            className="text-sm font-semibold px-2.5 py-1 rounded-md"
                            style={{
                              background: `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`,
                              color: element.gradientFrom
                            }}
                          >
                            {subtype.combination}
                          </span>
                          {isUserSubtype(subtype.id) && (
                            <Sparkles className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      </div>

                      {/* Drawn To Careers */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-4 h-4" style={{ color: element.gradientFrom }} />
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Drawn To</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {subtype.drawnTo.map((career, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                              style={{
                                background: `linear-gradient(135deg, ${element.gradientFrom}10, ${element.gradientTo}10)`,
                                color: element.gradientFrom
                              }}
                            >
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Why Explanation */}
                      <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Why These Careers</span>
                        <p className="text-gray-700 leading-relaxed text-sm">{subtype.why}</p>
                      </div>
                    </div>
                  ))}
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
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Finding Your Career Path</h4>
            <p className="text-gray-600 leading-relaxed">
              These career attractions are not prescriptions but invitations to explore environments 
              where your elemental energy naturally thrives. Success comes not from forcing yourself 
              into a mold, but from finding a professional ecosystem that speaks your elemental 
              language. Consider how your current work aligns with these patterns, and explore new 
              possibilities that resonate with your elemental nature.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAttractions;
