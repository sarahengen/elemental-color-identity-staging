import React, { useState } from 'react';
import { Heart, Flame, Droplets, Mountain, Wind, ChevronDown, Plus, Minus, Leaf, Dumbbell, Sun as SunIcon } from 'lucide-react';
import GuideElementSubtitlePill from './GuideElementSubtitlePill';
import {
  GUIDE_USER_SUBTYPE_CARD_CLASS,
  GUIDE_USER_ELEMENT_BADGE_CLASS,
  guideUserElementCardClass,
} from '@/lib/guideElementVisualTheme';

interface ElementalHealingProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface SolutionCategory {
  label: string;
  items: string[];
}

interface HealingSolution {
  type: 'excess' | 'deficiency';
  title: string;
  categories: SolutionCategory[];
}

interface HealingSubtype {
  subtype: string;
  subtypeId: string;
  name: string;
  condition: string;
  solutions: HealingSolution[];
}

interface HealingElementData {
  element: string;
  elementId: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  generalApproach: string;
  subtitle: string;
  subtypes: HealingSubtype[];
}

const healingData: HealingElementData[] = [
  {
    element: 'Fire',
    elementId: 'fire',
    icon: <Flame className="w-6 h-6" />,
    gradientFrom: '#C41E3A',
    gradientTo: '#FF6B35',
    generalApproach: 'Regulate metabolic rate, support adrenal resilience, channel excess fire into productive outlets, rekindle deficient fire.',
    subtitle: 'Solutions for Over-Burn & Extinguishment',
    subtypes: [
      {
        subtype: 'Fire + Fire',
        subtypeId: 'fire-fire',
        name: 'The Electric Arc',
        condition: 'Excess: Adrenal Burnout / Deficiency: Metabolic Collapse',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Adaptogens',
                items: [
                  'Ashwagandha, Rhodiola (to modulate cortisol, not sedate). Holy Basil (Tulsi) for nervous system cooling.'
                ]
              },
              {
                label: 'Nutrients',
                items: [
                  'High-dose Magnesium Glycinate, Phosphatidylserine, Omega-3s for neuronal inflammation.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Cranial-sacral therapy to calm the CNS. Yin Yoga with long holds to cultivate stillness.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Digital sunset, strict sleep hygiene. Replace high-intensity cardio with swimming or walking in nature.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Ginseng (Panax), Cordyceps to rebuild metabolic jing. Ginger to stoke digestive fire.'
                ]
              },
              {
                label: 'Nutrients',
                items: [
                  'B-Complex, Iron, Iodine (if thyroid-linked), Vitamin D.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Acupuncture to stimulate Kidney and Spleen meridians. Dry brushing to stimulate circulation.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Morning sun gazing, cold showers followed by vigorous rubbing. Setting and achieving small, concrete goals to rebuild will.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Fire + Water',
        subtypeId: 'fire-water',
        name: 'The Blue Flame',
        condition: 'Excess: Frozen Stress / Deficiency: Fragmentation',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Kava (for acute tension), Milky Oat to nourish frazzled nerves. Cinnamon & Ginger to warm the core.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Deep tissue massage focused on psoas and jaw. Sauna therapy to force vasodilation and sweating.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Qi Gong, Tai Chi—slow, flowing movement to melt frozen energy. Singing or toning to vibrate the body.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Adaptogens',
                items: [
                  'Licorice root (short-term for adrenal support), Schisandra to hold energy.'
                ]
              },
              {
                label: 'Nutrients',
                items: [
                  'Magnesium L-Threonate (for brain), electrolytes.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Somatic Experiencing or EMDR to process and integrate fragmented stress.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Weighted blankets, "earthing" (barefoot on ground). Creating small, beautiful, and highly structured rituals.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Fire + Earth',
        subtypeId: 'fire-earth',
        name: 'The Forged Iron',
        condition: 'Excess: Chronic Tension / Deficiency: Structural Collapse',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Turmeric, Boswellia for musculoskeletal inflammation. Valerian root at night for muscular tension.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Rolfing or Structural Integration to break fascial holding patterns. Myofascial release.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Swimming, restorative yoga to create space without impact. Forest bathing to soften focus.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'Silica, Vitamin K2, Calcium, Collagen peptides for connective tissue and bone.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Osteopathy to align structure. Resistance training with perfect form to rebuild density safely.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Bone broths, mineral-rich foods. Carrying moderate weight (e.g., backpacking) to signal the body to strengthen.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Fire + Air',
        subtypeId: 'fire-air',
        name: 'The Illuminating Spark',
        condition: 'Excess: Manic Depletion / Deficiency: Apathetic Lethargy',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Lemon Balm, Passionflower to calm without sedation. Chromium for blood sugar balance.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Low-glycemic, high-protein diet to prevent crashes. Elimination of stimulants.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Scheduled "downtime" enforced like a medicine. Color therapy with cooling blues/greens in environment.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'St. John\'s Wort (for dopamine support), Maca for energy and mood.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Dance therapy, improvisational movement to reconnect with spontaneous joy.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Play therapy, engaging in hobbies with no goal. Social prescribing—joining a fun, low-pressure group activity.'
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    element: 'Water',
    elementId: 'water',
    icon: <Droplets className="w-6 h-6" />,
    gradientFrom: '#6B8BA4',
    gradientTo: '#B4A7D6',
    generalApproach: 'Move lymph, support kidney/adrenal function, balance fluids, nourish emotional body.',
    subtitle: 'Solutions for Congestion & Desiccation',
    subtypes: [
      {
        subtype: 'Water + Air',
        subtypeId: 'water-air',
        name: 'The Misty Shore',
        condition: 'Excess: Congestion / Deficiency: Dry Fragility',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Elderberry, Echinacea, Goldenseal (short-term) for sinus/lymph. Nettles as a daily anti-allergy tonic.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Lymphatic drainage massage. Neti pot with saline.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Reduce dairy and refined sugars. Increase bitter greens (arugula, dandelion).'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Marshmallow root, Slippery Elm to moisten membranes. Rehmannia (in TCM) to nourish yin fluids.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Healthy fats (avocado, olive oil), bone broths, hydration with electrolyte balance.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Humidifier at home. Protective boundaries to prevent energetic drainage.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Water + Water',
        subtypeId: 'water-water',
        name: 'The Forest Lake',
        condition: 'Excess: Stagnant Depth / Deficiency: Drained Depletion',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Dandelion root for liver/kidney decongestion. Burdock for blood purification.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Rebounding (mini-trampoline) to move lymph and fluids. Twisting yoga poses for organ massage.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Depth psychotherapy (Jungian) to process stored emotion.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Adaptogens',
                items: [
                  'He Shou Wu (for kidney jing), Siberian Ginseng.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Sea vegetables, miso, mineral-rich foods. Small, frequent meals.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Sleep before 11pm to support adrenal recovery. Float tank therapy for profound rest.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Water + Fire',
        subtypeId: 'water-fire',
        name: 'The Sun-Dappled Pond',
        condition: 'Excess: Circulatory Stagnation / Deficiency: Dried Up',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Ginkgo Biloba, Butcher\'s Broom for microcirculation. Milk Thistle for liver.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Contrast hydrotherapy (hot/cold showers) to stimulate circulation.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Walking, especially on uneven terrain, to engage calf pump for venous return.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Nutrition',
                items: [
                  'Beetroot, pomegranate for blood building. Fat-soluble vitamins (A, D, E, K).'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Art therapy to reconnect with personal narrative and beauty.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Gentle sun exposure, collecting and revisiting positive mementos.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Water + Earth',
        subtypeId: 'water-earth',
        name: 'The Languid River',
        condition: 'Excess: Flooded / Deficiency: Dry Riverbed',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Cleavers for lymphatic decongestion. Probiotic therapy for gut-immune axis.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Dry brushing before showering. Abdominal massage for ileocecal valve.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Energetic hygiene practices (salt baths, visualization). Learning to say "no."'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Fenugreek to support lactation/mucous membranes. Aloe Vera juice internally.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Craniosacral therapy for deep nourishment. Self-massage with rich oils.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Self-care prescribed as non-negotiable. Being nurtured by others.'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    element: 'Earth',
    elementId: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    gradientFrom: '#8B4513',
    gradientTo: '#228B22',
    generalApproach: 'Improve digestion/elimination, support structural integrity, ground energy, modulate blood sugar.',
    subtitle: 'Solutions for Density & Fragility',
    subtypes: [
      {
        subtype: 'Earth + Fire',
        subtypeId: 'earth-fire',
        name: 'The Mountain Stone',
        condition: 'Excess: Petrified / Deficiency: Eroded',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Celery seed, Horsetail (for calcification). Apple Cider Vinegar to alkalize and break down deposits.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Deep tissue, Gua Sha to break up fascial adhesions. Chiropractic adjustments.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Vinyasa flow yoga, dynamic stretching to create movement in joints.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'Bioavailable minerals (colloidal, plant-based), Vitamin D3 + K2, Boron.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Pilates, functional strength training to rebuild core structural support.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Gardening, pottery—working directly with earth/clay.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Earth + Earth',
        subtypeId: 'earth-earth',
        name: 'The Forest Floor',
        condition: 'Excess: Over-Composted / Deficiency: Barren Soil',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Berberine-containing herbs (Oregon Grape, Goldenseal) for microbial balance. Triphala for gentle daily detox.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Intermittent fasting to rest digestion. High-fiber, plant-forward diet.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Sweating exercise (sauna, cardio) to open elimination pathways.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Digestive bitters before meals. Slippery Elm, Marshmallow to soothe gut lining.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Bone broth, fermented foods, easily digestible proteins. Elimination diets to find triggers.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Mindful, slow eating. Chewing thoroughly.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Earth + Water',
        subtypeId: 'earth-water',
        name: 'The Velvet Moss',
        condition: 'Excess: Overgrown / Deficiency: Hypersensitive',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Cinnamon, Gymnema for blood sugar balance. Dandelion leaf as a gentle diuretic.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Low-glycemic, high-fiber diet. Prioritizing protein and healthy fat at each meal.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Regular, gentle movement like walking after meals.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'Zinc, Quercetin, Vitamin C for immune/integrity. Probiotics.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Neurofeedback to calm hypersensitive nervous system.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Creating a "nest"—a perfectly safe, comfortable home environment.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Earth + Air',
        subtypeId: 'earth-air',

        name: 'The Golden Harvest',
        condition: 'Excess: Inflammatory Overload / Deficiency: Failed Harvest',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Turmeric, Devil\'s Claw for inflammation. Milk Thistle, Artichoke for liver.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'Anti-inflammatory diet (Mediterranean). Reducing red meat, alcohol, nightshades if sensitive.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Scheduled feasting and fasting cycles. Digital detoxes to reduce sensory overload.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'Iron, B12, Folate for anemia. Hyaluronic Acid, Collagen for skin/joints.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Sensate focus exercises to re-awaken pleasure pathways.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Engaging in creative, sensuous projects (cooking, gardening, painting).'
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // AIR ELEMENT
  {
    element: 'Air',
    elementId: 'air',
    icon: <Wind className="w-6 h-6" />,
    gradientFrom: '#5B8FB9',
    gradientTo: '#87CEEB',
    generalApproach: 'Ground energy, regulate nervous system, support lung function, improve focus.',
    subtitle: 'Solutions for Dispersion & Constriction',
    subtypes: [
      {
        subtype: 'Air + Air',
        subtypeId: 'air-air',
        name: 'The Open Sky',
        condition: 'Excess: Over-Exposed / Deficiency: Overcast',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Skullcap, Hops for neurological calm. Feverfew for migraine prophylaxis.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Upper cervical chiropractic. Eye exercises and reducing screen blue light.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Sensory deprivation periods. Box breathing (4-7-8) to regulate nervous system.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Bacopa Monnieri for memory/cognition. Ginkgo for cerebral circulation.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Pranayama (breathwork) like Kapalabhati to energize.'
                ]
              },
              {
                label: 'Nutrition',
                items: [
                  'MCT oil, phospholipids for brain fuel. Ensuring adequate caloric intake.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Air + Fire',
        subtypeId: 'air-fire',
        name: 'The Lightning Bolt',
        condition: 'Excess: Scattered Gale / Deficiency: Stagnant Air',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'L-Theanine, Magnesium to calm excitatory neurotransmitters. Zinc for focus.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Weighted vests or lap pads. Deep pressure massage.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Strict routines and external structures (planners, timers). Nature immersion without devices.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Gotu Kola for cognitive connection. Peppermint or Rosemary aromatherapy for alertness.'
                ]
              },
              {
                label: 'Movement',
                items: [
                  'Improvisational dance, juggling—activities requiring split-second neural connection.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Novelty in small doses—taking a new route, trying a new hobby.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Air + Earth',
        subtypeId: 'air-earth',
        name: 'The Warm Breeze',
        condition: 'Excess: Over-Heated Wind / Deficiency: Wind Died',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Hawthorn for cardiac support. Lemon Balm for social anxiety.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Voice rest. Scheduling mandatory solitude. Cooling pranayama (Sitali).'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Herbs',
                items: [
                  'Shatavari for female vitality (or Ashwagandha for males). Oat straw as a nervous system nutritive.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Voice coaching, drama therapy to reclaim expression.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Warming spices (cinnamon, cardamom) in diet. Volunteering in a role that provides positive feedback.'
                ]
              }
            ]
          }
        ]
      },
      {
        subtype: 'Air + Water',
        subtypeId: 'air-water',
        name: 'The Morning Mist',
        condition: 'Excess: Ethereal Dissociation / Deficiency: Silenced',
        solutions: [
          {
            type: 'excess',
            title: 'Excess Solutions',
            categories: [
              {
                label: 'Nutrients',
                items: [
                  'Methylated B-Complex for nervous system support. Iron if anemic.'
                ]
              },
              {
                label: 'Bodywork',
                items: [
                  'Grounding bodywork—foot reflexology, earthing.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Heavy, grounding foods (root vegetables, proteins). Limit exposure to crowds/chaos.'
                ]
              }
            ]
          },
          {
            type: 'deficiency',
            title: 'Deficiency Solutions',
            categories: [
              {
                label: 'Adaptogens',
                items: [
                  'Rhodiola for fatigue and mental stamina. Reishi mushroom for immune support.'
                ]
              },
              {
                label: 'Therapies',
                items: [
                  'Gentle trauma therapy (IFS, Somatic). Spending time with infants or animals to reconnect with innocence.'
                ]
              },
              {
                label: 'Lifestyle',
                items: [
                  'Keeping a dream journal. Gentle connection to subtle arts (poetry, ambient music).'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];



const ElementalHealing: React.FC<ElementalHealingProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [expandedElements, setExpandedElements] = useState<string[]>(
    userElement ? [userElement] : ['fire']
  );
  const [expandedSubtypes, setExpandedSubtypes] = useState<string[]>(
    userSubtype ? [userSubtype] : []
  );

  const toggleElement = (elementId: string) => {
    setExpandedElements(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const toggleSubtype = (subtypeId: string) => {
    setExpandedSubtypes(prev =>
      prev.includes(subtypeId)
        ? prev.filter(id => id !== subtypeId)
        : [...prev, subtypeId]
    );
  };

  const isUserSubtype = (subtypeId: string) => {
    return userSubtype === subtypeId;
  };

  const isUserElement = (elementId: string) => {
    return userElement === elementId;
  };

  const getSolutionIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('herb') || lower.includes('adaptogen')) return <Leaf className="w-3.5 h-3.5" />;
    if (lower.includes('nutrient') || lower.includes('nutrition')) return <Plus className="w-3.5 h-3.5" />;
    if (lower.includes('bodywork') || lower.includes('movement') || lower.includes('therapies')) return <Dumbbell className="w-3.5 h-3.5" />;
    if (lower.includes('lifestyle')) return <SunIcon className="w-3.5 h-3.5" />;
    return <Heart className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-8">
      {!embedInGuideHub && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Healing is not about suppressing symptoms, but restoring the natural flow and expression of the core elemental energy. Treatment should be complementary, not contradictory, to the subtype's nature. True healing honors the elemental nature while restoring its equilibrium.
          </p>
        </div>
      )}

      {/* Elements list — white cards, accordion style matching Blocks */}
      <div className="space-y-4">
        {healingData.map((element) => {
          const isOpen = expandedElements.includes(element.elementId);
          return (
            <div
              key={element.element}
              className={`rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ${guideUserElementCardClass(
                isUserElement(element.elementId)
              )}`}
            >
              {/* Element Header */}
              <button
                type="button"
                onClick={() => toggleElement(element.elementId)}
                className="w-full p-5 sm:p-6 flex items-center justify-between bg-white hover:bg-gray-50/80 transition-colors text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                    }}
                  >
                    {element.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2 gap-y-1">
                      <h3 className="text-2xl font-serif text-gray-900">{element.element}</h3>
                      {isUserElement(element.elementId) && (
                        <span className={`shrink-0 ${GUIDE_USER_ELEMENT_BADGE_CLASS}`}>
                          Your Element
                        </span>
                      )}
                    </div>
                    <GuideElementSubtitlePill
                      gradientFrom={element.gradientFrom}
                      gradientTo={element.gradientTo}
                      className="mt-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                    >
                      Healing
                    </GuideElementSubtitlePill>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 shrink-0 ml-2 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="border-t border-gray-100 bg-white">
                  {/* General Approach */}
                  <div className="px-6 pt-6 pb-2">
                    <div
                      className="rounded-xl p-5 border"
                      style={{
                        background: `linear-gradient(135deg, ${element.gradientFrom}08, ${element.gradientTo}08)`,
                        borderColor: `${element.gradientFrom}20`
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5"
                          style={{
                            background: `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                          }}
                        >
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: element.gradientFrom }}>
                            {element.subtitle}
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold text-gray-900">General Approach: </span>
                            {element.generalApproach}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtypes */}
                  <div className="p-6 space-y-4">
                    {element.subtypes.map((subtype) => {
                      const isHighlighted = isUserSubtype(subtype.subtypeId);
                      const isSubtypeOpen = expandedSubtypes.includes(subtype.subtypeId);

                      return (
                        <div
                          key={subtype.subtype}
                          className={`relative rounded-xl transition-all duration-300 overflow-hidden ${
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
                          {/* User's Subtype Badge */}
                          {isHighlighted && (
                            <div className="absolute -top-3 right-4 z-10">
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                Your Healing
                              </span>
                            </div>
                          )}

                          {/* Subtype Header — clickable */}
                          <button
                            type="button"
                            onClick={() => toggleSubtype(subtype.subtypeId)}
                            className="w-full p-5 flex items-center justify-between text-left hover:bg-white/60 transition-colors"
                          >
                            <div className="min-w-0">
                              {/* Subtype Label */}
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span
                                  className="text-sm font-semibold px-2.5 py-1 rounded-md"
                                  style={{
                                    background: `linear-gradient(135deg, ${element.gradientFrom}20, ${element.gradientTo}20)`,
                                    color: element.gradientFrom
                                  }}
                                >
                                  {subtype.subtype}
                                </span>
                                <span className="text-sm font-medium text-gray-500">—</span>
                                <span className="text-sm font-semibold text-gray-800">{subtype.name}</span>
                              </div>
                              {/* Condition */}
                              <p className="text-xs text-gray-500 font-medium mt-1">
                                {subtype.condition}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 shrink-0 ml-3 transition-transform duration-300 ${
                                isSubtypeOpen ? 'rotate-180' : ''
                              }`}
                              aria-hidden
                            />
                          </button>

                          {/* Expanded Solutions */}
                          {isSubtypeOpen && (
                            <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-5">
                              {subtype.solutions.map((solution) => (
                                <div key={solution.type} className="space-y-3">
                                  {/* Solution Type Header */}
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                                      style={{
                                        background: solution.type === 'excess'
                                          ? `linear-gradient(135deg, ${element.gradientFrom}, ${element.gradientTo})`
                                          : `linear-gradient(135deg, ${element.gradientFrom}90, ${element.gradientTo}90)`
                                      }}
                                    >
                                      {solution.type === 'excess' ? (
                                        <Minus className="w-3.5 h-3.5" />
                                      ) : (
                                        <Plus className="w-3.5 h-3.5" />
                                      )}
                                    </div>
                                    <h5 className="text-sm font-bold" style={{ color: element.gradientFrom }}>
                                      {solution.title}
                                    </h5>
                                  </div>

                                  {/* Categories */}
                                  <div className="space-y-2.5 ml-2">
                                    {solution.categories.map((cat, catIdx) => (
                                      <div
                                        key={catIdx}
                                        className="rounded-lg p-3.5 bg-white/80 border border-gray-100"
                                      >
                                        <div className="flex items-center gap-2 mb-1.5">
                                          <div
                                            className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                                            style={{
                                              background: `linear-gradient(135deg, ${element.gradientFrom}15, ${element.gradientTo}15)`,
                                              color: element.gradientFrom
                                            }}
                                          >
                                            {getSolutionIcon(cat.label)}
                                          </div>
                                          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: element.gradientFrom }}>
                                            {cat.label}
                                          </span>
                                        </div>
                                        {cat.items.map((item, itemIdx) => (
                                          <p key={itemIdx} className="text-sm text-gray-700 leading-relaxed pl-7">
                                            {item}
                                          </p>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Decorative corner accent */}
                          <div
                            className="absolute top-0 right-0 w-16 h-16 opacity-20 rounded-tr-xl rounded-bl-full pointer-events-none"
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
          );
        })}
      </div>

      {/* Bottom Note */}
      <div className="mt-12 p-6 bg-gradient-to-br from-red-50 via-purple-50 to-blue-50 rounded-2xl border border-red-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-serif text-gray-900 mb-2">The Philosophy of Elemental Healing</h4>
            <p className="text-gray-600 leading-relaxed">
              Healing is not about suppressing symptoms, but restoring the natural flow and expression of the core elemental energy. Treatment should be complementary, not contradictory, to the subtype's nature. True healing honors the elemental nature while restoring its equilibrium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalHealing;
