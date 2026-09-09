import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronRight, Sparkles, X, Share2, ShoppingBag, ArrowRight } from 'lucide-react';
import WardrobeReviewPDFGenerator from './WardrobeReviewPDFGenerator';
import ElementalShoppingLists from './ElementalShoppingLists';



interface ElementalWardrobeReviewProps {
  userElement?: string | null;
  userSubtype?: string | null;
  embedInGuideHub?: boolean;
}

interface WardrobeReviewData {
  element: string;
  icon: React.ReactNode;
  theme: string;
  themeVerb: string;
  colors: string[];
  coreDrive: string;
  primaryQuestion: string;
  mantra: string;
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  piles: {
    name: string;
    description: string;
  }[];
  finalAct: string;
  subtypes: {
    id: string;
    name: string;
    test: string;
    guidance: string;
  }[];
}

const wardrobeReviewData: WardrobeReviewData[] = [
  {
    element: 'fire',
    icon: <Flame className="w-8 h-8" />,
    theme: 'REFUEL Your Wardrobe',
    themeVerb: 'REFUEL',
    colors: ['#C41E3A', '#0A0A0A', '#4169E1'],
    coreDrive: 'To Ignite, Energize, and Empower.',
    primaryQuestion: '"Does this item feed or drain my vital spark?"',
    mantra: '"I release what dampens my flame. I keep what fuels my fire."',
    process: [
      {
        step: '1',
        title: 'Create Your "Arena"',
        description: 'Clear a space. Put on energizing music. This is an active ritual.'
      },
      {
        step: '2',
        title: 'The Trial by Fire',
        description: 'Try on every single item. Do not think about cost, occasion, or sentiment. Focus only on the somatic and emotional response.'
      },
      {
        step: '3',
        title: 'The Three Piles',
        description: 'Sort each item into FUEL, ASH, or KINDLING based on how it makes you feel.'
      },
      {
        step: '4',
        title: 'The Final Act',
        description: 'Review your FUEL pile. This is your energetic core. Does it collectively feel like it could power you through your life? If not, what one missing piece would be the ultimate spark?'
      }
    ],
    piles: [
      { name: 'FUEL', description: '"This makes me feel powerful, alive, confident, or radiant." (Keep)' },
      { name: 'ASH', description: '"This makes me feel dull, insecure, tired, or like I\'m in costume." (Discard/Donate)' },
      { name: 'KINDLING', description: '"This has potential but needs a spark." (Alter, tailor, or set aside with a plan to style it with a FUEL item).' }
    ],
    finalAct: 'Review your FUEL pile. This is your energetic core. Does it collectively feel like it could power you through your life? If not, what one missing piece would be the ultimate spark?',
    subtypes: [
      {
        id: 'electric-arc',
        name: 'The Electric Arc (Pure Fire)',
        test: 'Your test is precision.',
        guidance: 'Does it feel sharp, definitive, and impeccably you? If it\'s even 5% off, it\'s ASH. Your wardrobe should feel like a curated arsenal.'
      },
      {
        id: 'blue-flame',
        name: 'The Blue Flame (Fire + Water)',
        test: 'Your test is potency.',
        guidance: 'Does it make you feel intelligently intense, focused, and quietly formidable? Avoid anything fussy or overly decorative. Seek architectural simplicity that contains power.'
      },
      {
        id: 'forged-iron',
        name: 'The Forged Iron (Fire + Earth)',
        test: 'Your test is integrity.',
        guidance: 'Does it feel substantial, reliable, and like it tells a story of strength? Sentiment is valid here if it\'s tied to endurance. Shed anything that feels flimsy or dishonest.'
      },
      {
        id: 'illuminating-spark',
        name: 'The Illuminating Spark (Fire + Air)',
        test: 'Your test is exuberance.',
        guidance: 'Does it make you want to move, connect, and create? Does it spark joy, literally? Your FUEL pile should look and feel like a celebration. Ditch the "serious" items that stifle your play.'
      }
    ]
  },
  {
    element: 'water',
    icon: <Droplets className="w-8 h-8" />,
    theme: 'DISTILL Your Wardrobe',
    themeVerb: 'DISTILL',
    colors: ['#6B8BA4', '#B4A7D6', '#D4A5A5'],
    coreDrive: 'To Connect, Feel, and Honor Essence.',
    primaryQuestion: '"Does this item resonate with my emotional truth and intuitive self?"',
    mantra: '"I release emotional attachments. I keep what holds my essence. I flow towards what feels true."',
    process: [
      {
        step: '1',
        title: 'Set the Atmosphere',
        description: 'Soft lighting, perhaps calming music or silence. This is a reflective, intuitive process.'
      },
      {
        step: '2',
        title: 'The Intuitive Sort',
        description: 'Go through your wardrobe without trying everything on. Hold each item. Close your eyes. What memory, feeling, or sense of self does it evoke?'
      },
      {
        step: '3',
        title: 'The Three Piles',
        description: 'Sort each item into PURE FLOW, STAGNANT WATER, or MURKY DEPTHS based on its emotional resonance.'
      },
      {
        step: '4',
        title: 'The Essence Check',
        description: 'Look at your PURE FLOW collection. What is the overall story, mood, or emotion it conveys? Does it feel like a nurturing, authentic container for your spirit? Does it allow you to move through life with emotional honesty?'
      }
    ],
    piles: [
      { name: 'PURE FLOW', description: '"This feels deeply like me. It holds a positive memory or aligns with my current emotional landscape." (Keep)' },
      { name: 'STAGNANT WATER', description: '"This holds a negative memory, guilt (\'I spent too much\'), or is tied to a past self I\'ve outgrown." (Release)' },
      { name: 'MURKY DEPTHS', description: '"I have no feeling about this. It\'s emotionally blank." (This is often the most important to release—it\'s dead energy).' }
    ],
    finalAct: 'Look at your PURE FLOW collection. What is the overall story, mood, or emotion it conveys? Does it feel like a nurturing, authentic container for your spirit?',
    subtypes: [
      {
        id: 'misty-shore',
        name: 'The Misty Shore (Water + Air)',
        test: 'Distill for gentle harmony.',
        guidance: 'Does it feel soft, blending, and peaceful? "STAGNANT WATER" might be items from a time you felt you had to be harsh or defined. Keep only what feels like a tender hug.'
      },
      {
        id: 'forest-lake',
        name: 'The Forest Lake (Pure Water)',
        test: 'Distill for profound truth.',
        guidance: 'Does it connect to your depths, your mystery, your private self? Release anything that feels superficial, trendy, or meant for performative socializing. Your wardrobe is a sacred, deep well.'
      },
      {
        id: 'sun-dappled-pond',
        name: 'The Sun-Dappled Pond (Water + Fire)',
        test: 'Distill for warm memory.',
        guidance: 'Does it hold the golden light of a positive past or feel like it could become a future heirloom? "STAGNANT WATER" might be gifts you feel obligated to keep. Honor only what genuinely warms your heart.'
      },
      {
        id: 'languid-river',
        name: 'The Languid River (Water + Earth)',
        test: 'Distill for nurturing comfort.',
        guidance: 'Does it feel like it supports and cares for you, body and soul? Release anything that makes you feel anxious, restricted, or like you have to "perform" wellness. Keep what feels like a steady, nurturing embrace.'
      }
    ]
  },
  {
    element: 'earth',
    icon: <Mountain className="w-8 h-8" />,
    theme: 'UNEARTH Your Wardrobe',
    themeVerb: 'UNEARTH',
    colors: ['#CC4E3E', '#808000', '#8B4513'],
    coreDrive: 'To Stabilize, Assess, and Build Foundation.',
    primaryQuestion: '"Is this item sound, functional, and worthy of my resources?"',
    mantra: '"I honor what is real. I repair what is valuable. I release what is decayed."',
    process: [
      {
        step: '1',
        title: 'The Excavation',
        description: 'Empty everything. Lay all items out where you can see and touch them.'
      },
      {
        step: '2',
        title: 'The Tactile Audit',
        description: 'Touch every garment. Examine seams, check for stains, pilling, broken zippers, weak elastics. Feel the weight and quality of the fabric.'
      },
      {
        step: '3',
        title: 'The Three Piles',
        description: 'Sort each item into SOLID GROUND, FERTILE SOIL, or COMPOST based on its condition, fit, and purpose.'
      },
      {
        step: '4',
        title: 'The Foundation Check',
        description: 'Look at your SOLID GROUND pile. Do you have the foundational pieces for your climate and lifestyle (a good coat, sturdy shoes, workhorse pants)? This is about utility and resource management.'
      }
    ],
    piles: [
      { name: 'SOLID GROUND', description: '"This is in perfect condition, fits my body now, and serves a clear purpose." (Keep)' },
      { name: 'FERTILE SOIL', description: '"This is damaged but repairable, or can be altered. Its core material is good." (Mend/Alter)' },
      { name: 'COMPOST', description: '"This is worn out, stained beyond saving, ill-fitting, or serves no purpose in my current life." (Discard/Recycle)' }
    ],
    finalAct: 'Look at your SOLID GROUND pile. Do you have the foundational pieces for your climate and lifestyle (a good coat, sturdy shoes, workhorse pants)? This is about utility and resource management.',
    subtypes: [
      {
        id: 'mountain-stone',
        name: 'The Mountain Stone (Earth + Fire)',
        test: 'Your audit is structural.',
        guidance: 'Does each piece have a defined role in the architecture of your wardrobe? Is it timeless and principled? "COMPOST" anything trendy or poorly constructed.'
      },
      {
        id: 'forest-floor',
        name: 'The Forest Floor (Pure Earth)',
        test: 'Your audit is cyclical.',
        guidance: 'Is it seasonally appropriate? Is it made of natural, breathable fibers? Can it handle real life? Mend with pride. Compost anything synthetic and non-biodegradable that\'s past its use.'
      },
      {
        id: 'velvet-moss',
        name: 'The Velvet Moss (Earth + Water)',
        test: 'Your audit is sensual.',
        guidance: 'Does it feel delicious against your skin? Is it softly worn-in, not threadbare? Your "FERTILE SOIL" pile is for items to be re-softened or luxuriously repaired. Compost anything scratchy or harsh.'
      },
      {
        id: 'golden-harvest',
        name: 'The Golden Harvest (Earth + Air)',
        test: 'Your audit is abundant.',
        guidance: 'Is the fabric rich? Is the color vibrant? Is the craftsmanship evident? "SOLID GROUND" items should feel like treasures. Compost anything that looks cheap, faded, or meager.'
      }
    ]
  },
  {
    element: 'air',
    icon: <Wind className="w-8 h-8" />,
    theme: 'BREATHE INTO Your Wardrobe',
    themeVerb: 'BREATHE',
    colors: ['#FF7F50', '#FFE135', '#FFCBA4'],
    coreDrive: 'To Analyze, Systematize, and Create Space.',
    primaryQuestion: '"Does this item have a logical place and purpose in my life system?"',
    mantra: '"I clarify my options. I create space for new ideas. I organize for ease."',
    process: [
      {
        step: '1',
        title: 'The Mind Map',
        description: 'Before touching a hanger, write or diagram your lifestyle categories (e.g., Work-In Office, Work-From Home, Social-Casual, Social-Formal, Athletic, Creative).'
      },
      {
        step: '2',
        title: 'The Categorization Sort',
        description: 'Place each item into its primary lifestyle category. Be ruthless. If an item doesn\'t have a category, it\'s likely superfluous.'
      },
      {
        step: '3',
        title: 'The Three Piles',
        description: 'Sort each item into CLEAR AIR, CLOUDY, or CLUTTER based on its categorical fit and versatility.'
      },
      {
        step: '4',
        title: 'The System Implementation',
        description: 'For your CLEAR AIR items, organize them by category and then by color within your closet. Create a digital or physical "lookbook" of go-to outfits. This is your operational manual.'
      }
    ],
    piles: [
      { name: 'CLEAR AIR', description: '"This fits a category perfectly, mixes with multiple other items, and I wear it regularly." (Keep)' },
      { name: 'CLOUDY', description: '"This fits a category but is redundant, or I\'m unsure how to style it." (Set aside for a styling session)' },
      { name: 'CLUTTER', description: '"This has no category, doesn\'t mix, or I haven\'t worn it in over a year." (Donate/Sell)' }
    ],
    finalAct: 'For your CLEAR AIR items, organize them by category and then by color within your closet. Create a digital or physical "lookbook" of go-to outfits. This is your operational manual.',
    subtypes: [
      {
        id: 'clear-morning-sky',
        name: 'The Clear Morning Sky (Pure Air)',
        test: 'Your system is minimalist logic.',
        guidance: 'Aim for a uniform-like coherence where everything works together. "CLUTTER" is anything that breaks the system\'s elegance or lacks versatility.'
      },
      {
        id: 'playful-breeze',
        name: 'The Playful Breeze (Air + Fire)',
        test: 'Your system is creative connection.',
        guidance: 'Categories can be by color or mood, not just function. Your "CLOUDY" pile is your playground—host a styling session to invent new, unexpected combinations.'
      },
      {
        id: 'gilded-zephyr',
        name: 'The Gilded Zephyr (Air + Earth)',
        test: 'Your system is social architecture.',
        guidance: 'Categories should reflect your roles (Host, Collaborator, Community Leader). "CLEAR AIR" items are those that make you feel articulate and put-together in social settings.'
      },
      {
        id: 'first-whisper',
        name: 'The First Whisper (Air + Water)',
        test: 'Your system is ethereal flow.',
        guidance: 'Categories might be "Daydreaming," "Quiet Contemplation," "Subtle Social." "CLUTTER" is anything loud, stiff, or demanding. Organization should feel light and effortless.'
      }
    ]
  }

];

// Fire Door Component - Bold, dramatic with chrome accents
const FireDoor: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-red-400 ring-offset-2' : ''}`}>
    {/* Main door body - sleek black with red gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-950">
      {/* Dramatic red accent glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/10" />
      
      {/* Geometric fire pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C41E3A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M50,150 Q30,100 50,70 Q70,40 50,0 Q80,30 70,70 Q90,100 50,150" fill="url(#fireGrad)" />
          <path d="M30,150 Q20,120 35,90 Q50,60 30,30 Q55,50 45,90 Q60,120 30,150" fill="url(#fireGrad)" opacity="0.6" />
          <path d="M70,150 Q80,120 65,90 Q50,60 70,30 Q45,50 55,90 Q40,120 70,150" fill="url(#fireGrad)" opacity="0.6" />
        </svg>
      </div>
      
      {/* Chrome frame border */}
      <div className="absolute inset-2 border-2 border-zinc-700 rounded-lg">
        <div className="absolute inset-1 border border-zinc-600/50 rounded-md" />
      </div>
      
      {/* Vertical chrome accent line */}
      <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
      
      {/* Modern chrome handle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="w-2 h-16 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-full shadow-lg" />
        <div className="absolute inset-0 w-2 h-16 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
      </div>
      
      {/* Fire icon at top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-lg shadow-red-500/30">
          <Flame className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Ember glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-900/30 via-orange-900/10 to-transparent" />
    </div>
    
    {/* Label plate - modern metallic */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border border-zinc-600 rounded-md px-3 py-2 shadow-lg">
        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-red-400 uppercase tracking-widest text-center">
          Fire
        </p>
      </div>
    </div>
    
    {isUser && (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg">
        Your Element
      </div>
    )}
  </div>
);

// Water Door Component - Flowing, ethereal with glass effect
const WaterDoor: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-blue-300 ring-offset-2' : ''}`}>
    {/* Main door body - soft gradient blues and lavenders */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-blue-100 to-indigo-200">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/20" />
      
      {/* Water ripple pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6B8BA4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#B4A7D6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4A5A5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={i}
              cx="50"
              cy={30 + i * 20}
              rx={40 - i * 3}
              ry={8 - i * 0.5}
              fill="none"
              stroke="url(#waterGrad)"
              strokeWidth="1.5"
              opacity={1 - i * 0.15}
            />
          ))}
        </svg>
      </div>
      
      {/* Soft flowing curves */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 150" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 L100,150 L0,150 Z" fill="#6B8BA4" />
          <path d="M0,80 Q25,60 50,80 T100,80 L100,150 L0,150 Z" fill="#B4A7D6" opacity="0.5" />
          <path d="M0,110 Q25,90 50,110 T100,110 L100,150 L0,150 Z" fill="#D4A5A5" opacity="0.3" />
        </svg>
      </div>
      
      {/* Elegant frame */}
      <div className="absolute inset-3 border border-blue-200/60 rounded-lg">
        <div className="absolute inset-2 border border-lavender-200/40 rounded-md" style={{ borderColor: 'rgba(180, 167, 214, 0.4)' }} />
      </div>
      
      {/* Crystal handle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="w-2.5 h-14 bg-gradient-to-b from-blue-100 via-white to-blue-200 rounded-full shadow-lg border border-blue-200/50" />
        <div className="absolute inset-0 w-2.5 h-14 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
      </div>
      
      {/* Water icon at top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 shadow-lg shadow-blue-300/40">
          <Droplets className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Soft reflection at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-300/20 to-transparent" />
    </div>
    
    {/* Label plate - soft and elegant */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-md px-3 py-2 shadow-md">
        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 uppercase tracking-widest text-center">
          Water
        </p>
      </div>
    </div>
    
    {isUser && (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-xs font-medium rounded-full shadow-lg">
        Your Element
      </div>
    )}
  </div>
);

// Earth Door Component - Natural wood with organic textures
const EarthDoor: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-amber-500 ring-offset-2' : ''}`}>
    {/* Main door body - rich wood tones */}
    <div className="absolute inset-0 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900">
      {/* Wood grain texture */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-gradient-to-r from-transparent via-amber-950/30 to-transparent"
            style={{
              top: `${8 + i * 8}%`,
              height: '2px',
              transform: `scaleX(${0.8 + Math.random() * 0.4})`,
            }}
          />
        ))}
      </div>
      
      {/* Terracotta and olive accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-700/10 via-transparent to-green-800/10" />
      
      {/* Carved panel effect */}
      <div className="absolute inset-4 rounded-lg border-4 border-amber-950/40 shadow-inner">
        <div className="absolute inset-2 rounded border-2 border-amber-600/30" />
        {/* Inner carved detail */}
        <div className="absolute inset-6 rounded border border-amber-950/20 bg-gradient-to-b from-amber-800/50 to-amber-900/50" />
      </div>
      
      {/* Leaf/nature motif */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <svg className="absolute w-full h-full" viewBox="0 0 100 150" preserveAspectRatio="none">
          <path d="M20,100 Q30,80 25,60 Q35,70 30,90 Q25,100 20,100" fill="#808000" />
          <path d="M80,110 Q70,90 75,70 Q65,80 70,100 Q75,110 80,110" fill="#4A5D23" />
          <path d="M50,130 Q55,110 50,90 Q60,100 55,120 Q52,130 50,130" fill="#CC4E3E" />
        </svg>
      </div>
      
      {/* Rustic brass handle */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2">
        <div className="w-3 h-12 bg-gradient-to-b from-yellow-600 via-amber-500 to-yellow-700 rounded-sm shadow-lg" />
        <div className="absolute top-0 left-0 w-3 h-12 bg-gradient-to-r from-yellow-400/40 via-transparent to-amber-800/30 rounded-sm" />
        {/* Handle mounting plates */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-600 rounded-sm" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-amber-600 rounded-sm" />
      </div>
      
      {/* Earth icon at top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 shadow-lg shadow-amber-600/30">
          <Mountain className="w-6 h-6 text-amber-100" />
        </div>
      </div>
      
      {/* Rich shadow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-950/40 to-transparent" />
    </div>
    
    {/* Label plate - carved wood style */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-2 border-amber-700 rounded px-3 py-2 shadow-md">
        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 uppercase tracking-widest text-center">
          Earth
        </p>
      </div>
    </div>
    
    {isUser && (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg">
        Your Element
      </div>
    )}
  </div>
);

// Air Door Component - Light, ethereal with floating elements
const AirDoor: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-coral-400 ring-offset-2' : ''}`} style={{ '--tw-ring-color': '#FF7F50' } as React.CSSProperties}>
    {/* Main door body - warm, light pastels */}
    <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-yellow-50 to-pink-50">
      {/* Soft coral and peach overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-transparent to-yellow-200/20" />
      
      {/* Floating cloud/breeze elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="airGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7F50" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFE135" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFCBA4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Swirling air currents */}
          <path d="M10,40 Q30,20 50,40 Q70,60 90,40" fill="none" stroke="url(#airGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M5,70 Q25,50 45,70 Q65,90 85,70" fill="none" stroke="url(#airGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M15,100 Q35,80 55,100 Q75,120 95,100" fill="none" stroke="url(#airGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          {/* Floating dots/particles */}
          <circle cx="25" cy="30" r="3" fill="#FF7F50" opacity="0.4" />
          <circle cx="75" cy="50" r="2" fill="#FFE135" opacity="0.5" />
          <circle cx="40" cy="80" r="2.5" fill="#FFCBA4" opacity="0.4" />
          <circle cx="60" cy="110" r="2" fill="#FF7F50" opacity="0.3" />
          <circle cx="20" cy="120" r="1.5" fill="#FFE135" opacity="0.4" />
        </svg>
      </div>
      
      {/* Delicate frame */}
      <div className="absolute inset-3 border border-orange-200/60 rounded-lg">
        <div className="absolute inset-2 border border-yellow-200/40 rounded-md" />
      </div>
      
      {/* Decorative arch at top */}
      <div className="absolute top-8 left-6 right-6">
        <svg className="w-full h-12 opacity-40" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d="M0,30 Q50,0 100,30" fill="none" stroke="#FF7F50" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Light golden handle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="w-2 h-12 bg-gradient-to-b from-yellow-300 via-orange-200 to-yellow-300 rounded-full shadow-md border border-orange-200/50" />
        <div className="absolute inset-0 w-2 h-12 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
      </div>
      
      {/* Air icon at top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg shadow-orange-300/40">
          <Wind className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Warm glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-100/50 to-transparent" />
    </div>
    
    {/* Label plate - light and airy */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-md px-3 py-2 shadow-md">
        <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400 uppercase tracking-widest text-center">
          Air
        </p>
      </div>
    </div>
    
    {isUser && (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-xs font-medium rounded-full shadow-lg">
        Your Element
      </div>
    )}
  </div>
);

const ElementalWardrobeReview: React.FC<ElementalWardrobeReviewProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState<'review' | 'shopping'>('review');

  const selectedData = selectedElement ? wardrobeReviewData.find(d => d.element === selectedElement) : null;

  const getElementGradient = (element: string) => {
    switch (element) {
      case 'fire': return 'from-red-600 via-orange-500 to-amber-500';
      case 'water': return 'from-blue-500 via-indigo-400 to-purple-400';
      case 'earth': return 'from-amber-600 via-orange-600 to-amber-700';
      case 'air': return 'from-orange-400 via-yellow-400 to-orange-300';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getElementBg = (element: string) => {
    switch (element) {
      case 'fire': return 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50';
      case 'water': return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';
      case 'earth': return 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50';
      case 'air': return 'bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50';
      default: return 'bg-gray-100';
    }
  };

  const getElementTextColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-red-600';
      case 'water': return 'text-blue-600';
      case 'earth': return 'text-amber-700';
      case 'air': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const isUserElement = (element: string) => userElement === element;

  const renderDoor = (element: string) => {
    const isSelected = selectedElement === element;
    const isUser = isUserElement(element);
    
    switch (element) {
      case 'fire':
        return <FireDoor isSelected={isSelected} isUser={isUser} />;
      case 'water':
        return <WaterDoor isSelected={isSelected} isUser={isUser} />;
      case 'earth':
        return <EarthDoor isSelected={isSelected} isUser={isUser} />;
      case 'air':
        return <AirDoor isSelected={isSelected} isUser={isUser} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setActiveTab('review')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-5 font-semibold text-sm transition-all relative ${
              activeTab === 'review'
                ? 'text-gray-900 bg-white'
                : 'text-gray-500 bg-gray-50 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${activeTab === 'review' ? 'text-amber-500' : 'text-gray-400'}`} />
            <span>Wardrobe Review</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'review' 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-gray-200 text-gray-500'
            }`}>Step 1</span>
            {activeTab === 'review' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500" />
            )}
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-5 font-semibold text-sm transition-all relative ${
              activeTab === 'shopping'
                ? 'text-gray-900 bg-white'
                : 'text-gray-500 bg-gray-50 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'shopping' ? 'text-amber-500' : 'text-gray-400'}`} />
             <span>Elemental Shopping List</span>

            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'shopping' 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-gray-200 text-gray-500'
            }`}>Step 2</span>
            {activeTab === 'shopping' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'review' ? (
        <>
          {!embedInGuideHub && (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
              <Sparkles className="w-10 h-10 mx-auto text-amber-500 mb-4" />
              <h3 className="text-2xl font-serif text-black mb-4">A Philosophy of Focus</h3>
              <p className="text-gray-800 max-w-3xl mx-auto leading-relaxed">
                Each elemental energy has a unique mode of interaction with the material world. This review process 
                isolates that mode to allow for a pure, resonant engagement with your wardrobe. The goal is not a 
                generic "clean out," but a <span className="text-amber-600 font-medium">ritual of elemental realignment</span>.
              </p>
            </div>
          )}

          {/* Wardrobe Doors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wardrobeReviewData.map((data) => (
              <button
                key={data.element}
                onClick={() => setSelectedElement(data.element)}
                className="group transition-all duration-300 hover:scale-105 focus:outline-none"
              >
                {renderDoor(data.element)}
                
                {/* Theme label below door */}
                <p className={`mt-4 text-sm font-semibold ${getElementTextColor(data.element)} text-center transition-all group-hover:scale-105`}>
                  {data.theme}
                </p>
              </button>
            ))}
          </div>

          {/* Selected Element Detail */}
          {selectedData && (
            <div className={`${getElementBg(selectedData.element)} rounded-2xl p-8 border border-gray-200 relative`}>
              {/* Close button */}
              <button 
                onClick={() => setSelectedElement(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${getElementGradient(selectedData.element)} text-white mb-4`}>
                  {selectedData.icon}
                  <span className="text-xl font-bold uppercase tracking-wide">{selectedData.element} Wardrobe Review</span>
                </div>
                <h3 className="text-3xl font-serif text-gray-900 mb-2">{selectedData.theme}</h3>
              </div>

              {/* Core Drive, Question, Mantra */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Core Drive</p>
                  <p className={`font-medium ${getElementTextColor(selectedData.element)}`}>{selectedData.coreDrive}</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Primary Question</p>
                  <p className="font-medium text-gray-700 italic">{selectedData.primaryQuestion}</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Mantra</p>
                  <p className="font-medium text-gray-700 italic">{selectedData.mantra}</p>
                </div>
              </div>

              {/* The Process */}
              <div className="mb-8">
                <h4 className="text-xl font-serif text-gray-900 mb-4">The Process</h4>
                <div className="space-y-4">
                  {selectedData.process.map((step, idx) => (
                    <div key={idx} className="flex gap-4 bg-white/60 rounded-xl p-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${getElementGradient(selectedData.element)} flex items-center justify-center text-white font-bold`}>
                        {step.step}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">{step.title}</h5>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Three Piles */}
              <div className="mb-8">
                <h4 className="text-xl font-serif text-gray-900 mb-4">The Three Piles</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedData.piles.map((pile, idx) => (
                    <div key={idx} className="bg-white/80 rounded-xl p-4 border-l-4" style={{ borderColor: selectedData.colors[idx] || '#888' }}>
                      <h5 className="font-bold text-gray-900 mb-2">{pile.name}</h5>
                      <p className="text-gray-600 text-sm">{pile.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtype-Specific Guidance */}
              <div>
                <h4 className="text-xl font-serif text-gray-900 mb-4">
                  Subtype-Specific {selectedData.themeVerb === 'REFUEL' ? 'Refueling' : selectedData.themeVerb === 'DISTILL' ? 'Distilling' : selectedData.themeVerb === 'UNEARTH' ? 'Unearthing' : 'Breathing'}
                </h4>
                <div className="space-y-3">
                  {selectedData.subtypes.map((subtype) => {
                    const isUserSub = userSubtype === subtype.id;
                    const isExpanded = expandedSubtype === subtype.id;
                    
                    return (
                      <div 
                        key={subtype.id}
                        className={`bg-white/80 rounded-xl overflow-hidden transition-all ${isUserSub ? 'ring-2 ring-amber-400' : ''}`}
                      >
                        <button
                          onClick={() => setExpandedSubtype(isExpanded ? null : subtype.id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {isUserSub && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                                You
                              </span>
                            )}
                            <span className="font-bold text-gray-900">{subtype.name}</span>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-gray-100">
                            <div className="pt-4 space-y-3">
                              <div>
                                <p className={`font-semibold ${getElementTextColor(selectedData.element)}`}>{subtype.test}</p>
                              </div>
                              <p className="text-gray-600 leading-relaxed">{subtype.guidance}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Prompt to select if nothing selected */}
          {!selectedElement && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Click on a wardrobe door above to explore the review process for that element
              </p>
            </div>
          )}

          {/* Share Guide Button - Only show if user has an element */}
          {userElement && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center border border-gray-700">
              <Share2 className="w-8 h-8 mx-auto text-amber-400 mb-3" />
              <h4 className="text-xl font-serif text-white mb-2">Share Your Wardrobe Review Guide</h4>
              <p className="text-gray-400 text-sm mb-5 max-w-lg mx-auto">
                Download, print, copy, or email your personalized wardrobe review guide. Share it with friends, stylists, or keep a copy for yourself.
              </p>
              <button
                onClick={() => setShowPDFGenerator(true)}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                Share Your Wardrobe Review Guide
              </button>
            </div>
          )}

           {/* Next Step CTA - Navigate to Shopping List */}
           <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 rounded-2xl p-8 border border-amber-200/60 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full mb-4">
               <ArrowRight className="w-4 h-4 text-amber-600" />
               <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Ready for the Next Step?</span>
             </div>
             <h4 className="text-xl font-serif text-gray-900 mb-3">Build Your Elemental Wardrobe</h4>
             <p className="text-gray-600 max-w-lg mx-auto mb-5 text-sm leading-relaxed">
               Now that you've reviewed what you have, discover a curated shopping list for your elemental subtype—
               pieces that resonate with your nature and feel like coming home.
             </p>
             <button
               onClick={() => setActiveTab('shopping')}
               className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
             >
               <ShoppingBag className="w-5 h-5" />
               View Elemental Shopping List
               <ArrowRight className="w-4 h-4" />

            </button>
          </div>

          {/* Closing Quote */}
          <div className="bg-white rounded-2xl p-8 text-center mt-8 border border-gray-200 shadow-sm">
            <p className="text-gray-800 max-w-3xl mx-auto leading-relaxed italic text-lg">
              "By engaging in your elemental review, you don't just clean a closet. You perform an act of self-definition. 
              You align your external shell with the internal truth of your energy, creating a wardrobe that is less about 
              fashion and more about <span className="text-amber-600 font-medium">functional, resonant being</span>."
            </p>
          </div>
        </>
      ) : (
        /* Shopping Lists Tab */
        <ElementalShoppingLists userElement={userElement} userSubtype={userSubtype} />
      )}

      {/* PDF Generator Modal */}
      {userElement && (
        <WardrobeReviewPDFGenerator
          isOpen={showPDFGenerator}
          onClose={() => setShowPDFGenerator(false)}
          userElement={userElement}
          userSubtype={userSubtype}
        />
      )}
    </div>
  );
};

export default ElementalWardrobeReview;
