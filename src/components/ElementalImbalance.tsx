import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, TrendingUp, TrendingDown, AlertCircle, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  guideUserElementCardClass,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  GUIDE_USER_SUBTYPE_CARD_CLASS,
} from '@/lib/guideElementVisualTheme';


interface ElementalImbalanceProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface ImbalancePattern {
  type: 'excess' | 'deficiency';
  title: string;
  description: string;
}

interface SubtypeImbalance {
  subtype: string;
  subtypeId: string;
  name: string;
  excess: ImbalancePattern;
  deficiency: ImbalancePattern;
}

interface ElementImbalanceData {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  subtypes: SubtypeImbalance[];
}

export const elementalImbalanceData: ElementImbalanceData[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    tagline: 'Burnout, Inflammation, or Stagnation',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        excess: {
          type: 'excess',
          title: 'Hyper-Fire',
          description: 'Adrenal exhaustion. Chronic cortisol elevation → hypertension, thyroid dysfunction (Graves\'), severe insomnia, ulcers, autoimmune flare-ups (attacking the self with own "fire"). Tinnitus, ocular migraines.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Fire Suppressed',
          description: 'Metabolic collapse. Hypothyroidism, chronic fatigue, poor circulation (cold intolerance), slow wound healing, loss of mental sharpness and willpower. Becomes a dulled blade.'
        }
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        excess: {
          type: 'excess',
          title: 'Over-Contained',
          description: 'Frozen stress response. Vasoconstriction becomes chronic → Raynaud\'s, poor peripheral circulation, frozen shoulder, TMJ from clenching. Metabolic rate plummets; body enters a conservation state mimicking hypothyroidism. Emotional flatline.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Crucible Cracked',
          description: 'Nervous system fragmentation. Panic attacks, hormonal volatility (especially cortisol and adrenaline swings), inability to focus or contain emotions. The ice melts into chaotic, cold water.'
        }
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        excess: {
          type: 'excess',
          title: 'Over-Forged',
          description: 'Chronic tension and density. Fibromyalgia, arthritis, calcification of soft tissues (bone spurs), chronic muscle spasms, hypertension from rigid vascular walls. The metal becomes brittle.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Metal Fatigue',
          description: 'Structural collapse. Osteoporosis, ligament laxity, chronic low back pain, anemia, profound exhaustion. Loss of magnetic presence; feels hollow and unsupported.'
        }
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        excess: {
          type: 'excess',
          title: 'Runaway Spark',
          description: 'Manic depletion. Blood sugar dysregulation (hyperglycemia crashes), adrenal burnout from constant "up" state, nervous tics, histamine intolerance (allergic, inflamed), cardiac arrhythmias.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Spark Extinguished',
          description: 'Apathetic lethargy. Clinical depression, low dopamine, poor motivation, compromised immune response (frequent colds), poor digestion from lack of "digestive fire" (enzymatic deficiency).'
        }
      }
    ]
  },
  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    tagline: 'Congestion, Toxicity, or Desiccation',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        excess: {
          type: 'excess',
          title: 'Over-Saturated',
          description: 'Lymphatic and sinus congestion. Chronic sinusitis, allergies, edema, yeast overgrowth (Candida), fibrocystic breasts, fluid retention, brain fog. Becomes a swamp.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Mist Evaporated',
          description: 'Dryness and fragility. Dry eyes/mouth/skin (Sjögren\'s-like), dehydration, vagal nerve dysfunction (anxiety, poor digestion), thinning mucous membranes, easy bruising. Loses all lubricating, protective quality.'
        }
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        excess: {
          type: 'excess',
          title: 'Stagnant Depth',
          description: 'Endocrine and emotional stagnation. Hypothyroidism, ovarian/uterine cysts, kidney stones, chronic UTIs, depression, weight gain that is hard to lose. Toxins are stored, not processed. The water becomes stagnant and toxic.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Lake Drained',
          description: 'Adrenal and electrolyte depletion. Adrenal fatigue, chronic low blood pressure, dehydration despite drinking, electrolyte imbalances, kidney weakness, loss of intuitive sense. The depth is gone, leaving a cracked bed.'
        }
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        excess: {
          type: 'excess',
          title: 'Over-Ripened',
          description: 'Circulatory and glycemic stagnation. Varicose veins, spider veins, poor microcirculation, insulin resistance, diabetic tendencies, liver congestion (fatty liver), sentimental depression. The golden glow becomes a sticky, syrupy stagnation.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Pond Dried Up',
          description: 'Loss of nourishment. Malabsorption, nutrient deficiencies (esp. fat-soluble vitamins), poor memory, dry brittle hair/nails, loss of connective tissue integrity, inability to feel pleasure or warmth from memories.'
        }
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        excess: {
          type: 'excess',
          title: 'Flooded',
          description: 'Lymphatic overload and emotional overwhelm. Lymphedema, chronic fatigue syndrome, fibromyalgia (water-logged tissues), codependency, inability to set boundaries, taking on others\' symptoms (psychosomatic empathy).'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Riverbed Dry',
          description: 'Nurturance failure. Inability to produce breast milk, poor wound healing, dry/aching joints, isolation, touch-aversion, failure to thrive in a caretaking role. The flow of nurturance stops.'
        }
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    tagline: 'Density, Sluggishness, or Fragmentation',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',

        excess: {
          type: 'excess',
          title: 'Petrified',
          description: 'Calcification and immobility. Arthritis, bone spurs, spinal stenosis, atherosclerosis, gallstones, chronic constipation, stubborn weight, clinical depression from rigidity. Becomes a prison of stone.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Eroded',
          description: 'Structural insecurity. Osteoporosis, disc degeneration, knee/hip instability, poor posture (collapse), mineral deficiencies, feeling physically unsafe in the world. The mountain crumbles.'
        }
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        excess: {
          type: 'excess',
          title: 'Over-Composted',
          description: 'Metabolic and toxic stagnation. Obesity, diabetes, sluggish liver/gallbladder, chronic constipation or diarrhea (poor elimination), skin disorders (eczema, psoriasis), fungal overgrowth. The rich soil becomes a dense, clogged muck.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Barren Soil',
          description: 'Malnourishment and depletion. Malabsorption syndromes (Crohn\'s, Celiac), nutrient deficiencies, muscle wasting, rapid aging of tissues, inability to "digest" life experiences. The fertility is gone.'
        }
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        excess: {
          type: 'excess',
          title: 'Overgrown',
          description: 'Insulin resistance and fluid retention. PCOS, metabolic syndrome, water-weight gain, cellulite, chronic fatigue, hypoglycemia crashes, addictive comfort-seeking (food/sleep).'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Moss Scraped Away',
          description: 'Nervous hypersensitivity and insecurity. Fragile immune system, severe environmental allergies, anxious digestion (IBS), poor insulation (always cold), inability to feel comfort or safety in the body.'
        }
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',

        name: 'The Golden Harvest',
        excess: {
          type: 'excess',
          title: 'Over-Indulged',
          description: 'Inflammatory and hepatic overload. Gout, gallstones, hypertension, inflammatory arthritis, acne rosacea, liver congestion, irritable bowel. The feast becomes a poison.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Harvest Failed',
          description: 'Loss of vitality and joy. Anemia, hormonal imbalances (low libido), loss of muscle tone, dull skin/hair, anhedonia (inability to feel pleasure), loss of creative and sensual drive.'
        }
      }
    ]
  },
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#00CED1',
    gradientTo: '#FFE135',
    tagline: 'Dispersion, Overstimulation, or Constriction',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Clear Morning Sky',
        excess: {
          type: 'excess',
          title: 'Over-Exposed',
          description: 'Neurological and sensory overload. Migraines, tinnitus, vertigo, anxiety disorders, insomnia from racing mind, TMJ, upper back/shoulder chronic pain. The clear sky is filled with blinding, chaotic light.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Sky Overcast',
          description: 'Cognitive and respiratory depression. Brain fog, poor memory, asthma, low oxygen saturation, depression, lack of inspiration, slow speech/thought. The clarity is gone, replaced by fog.'
        }
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Playful Breeze',
        excess: {
          type: 'excess',
          title: 'Scattered Gale',
          description: 'Attention and metabolic dysregulation. ADHD, severe insomnia, nervous exhaustion, Tourette\'s-like tics, blood sugar rollercoaster, inability to complete tasks. The breeze becomes a chaotic, scattering wind.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Stagnant Air',
          description: 'Creative and neurological stagnation. Depression, lack of motivation, poor synaptic connection (brain feels "off"), boredom, loss of playfulness and curiosity. The connecting force is absent.'
        }
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Gilded Zephyr',
        excess: {
          type: 'excess',
          title: 'Over-Heated Wind',
          description: 'Cardiac and social burnout. Heart palpitations, hypertension, social anxiety, manic episodes, burnout from over-extension, chronic laryngitis from over-talking. The warm wind becomes a scorching, dehydrating sirocco.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Wind Died Down',
          description: 'Loss of voice and warmth. Social withdrawal, low self-esteem, poor circulation, feeling unloved/unseen, weak voice, poor thermoregulation (always slightly cold). The persuasive, warm energy is gone.'
        }
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The First Whisper',
        excess: {
          type: 'excess',
          title: 'Ethereal Dissociation',
          description: 'Disembodiment and fragility. Severe environmental illness (MCS), fainting spells (vasovagal syncope), eating disorders, ungroundedness, prone to viruses and energetic "picking up" of others\' ailments. The whisper becomes inaudible, the person floats away.'
        },
        deficiency: {
          type: 'deficiency',
          title: 'Whisper Silenced',
          description: 'Collapse and depression. Chronic fatigue, immune deficiency, profound anemia, depression with catatonic features, inability to access intuition or subtle perception. The connection to the ethereal is severed.'
        }
      }
    ]
  }
];

const ElementalImbalance: React.FC<ElementalImbalanceProps> = ({
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
          <p className="text-lg text-gray-600 leading-relaxed">
            Each subtype's strength contains its potential weakness. When elemental energy is blocked, excessive, or deficient, it manifests in specific, predictable physiological patterns.
          </p>
        </div>
      )}

      {/* Elements Grid */}
      <div className="space-y-6">
        {elementalImbalanceData.map((element) => (
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
                    Imbalance Patterns
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
                  <Activity className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
                  <p className="text-white italic">
                    {element.tagline} — Discover the excess and deficiency patterns for each {element.element} subtype.
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
                            ? GUIDE_USER_SUBTYPE_CARD_CLASS
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        style={{
                          background: !isHighlighted
                            ? `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`
                            : undefined
                        }}
                      >
                        {/* User's Subtype Badge */}
                        {isHighlighted && (
                          <div className="absolute -top-3 right-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Your Imbalance
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

                        {/* Excess Pattern */}
                        <div className="p-4 bg-red-50/80 rounded-lg border border-red-100 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4" style={{ color: element.gradientFrom }} />
                            <span className="font-semibold text-sm" style={{ color: element.gradientFrom }}>
                              Excess — {subtype.excess.title}
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.excess.description}
                          </p>
                        </div>

                        {/* Deficiency Pattern */}
                        <div className="p-4 bg-blue-50/80 rounded-lg border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold text-sm text-blue-700">
                              Deficiency — {subtype.deficiency.title}
                            </span>
                          </div>
                          <p className="leading-relaxed text-sm text-gray-700">
                            {subtype.deficiency.description}
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
      <div className="mt-12 p-6 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 rounded-2xl border border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">Important Note</h4>
            <p className="text-gray-600 leading-relaxed">
              These patterns are energetic tendencies, not medical diagnoses. Understanding your elemental imbalance patterns can help you recognize early warning signs and make lifestyle adjustments that support your natural balance. Always consult healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalImbalance;
