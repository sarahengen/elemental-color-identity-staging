import React, { useState } from 'react';
import { Flame, Droplets, Mountain, Wind, ChevronRight, ChevronDown, ShoppingBag, Sparkles, AlertTriangle, X, ArrowRight, Download, Loader2 } from 'lucide-react';
import { generateShoppingListPDF } from '@/lib/shoppingListPdfGenerator';
interface ElementalShoppingListsProps {
  userElement?: string | null;
  userSubtype?: string | null;
}

interface ShoppingItem {
  category: string;
  recommendation: string;
  whyItWorks: string;
  pieceType: string;
}

interface SubtypeShoppingList {
  id: string;
  name: string;
  subtitle: string;
  philosophy: string;
  principles: string[];
  items: ShoppingItem[];
  avoid: string[];
}

interface ElementShoppingData {
  element: string;
  icon: React.ReactNode;
  verb: string;
  verbDescription: string;
  colors: { bg: string; accent: string; text: string; border: string; gradient: string; lightBg: string; };
  subtypes: SubtypeShoppingList[];
  comingSoon?: boolean;
}

const shoppingData: ElementShoppingData[] = [
  {
    element: 'fire',
    icon: <Flame className="w-6 h-6" />,
    verb: 'REFUEL',
    verbDescription: 'Replenish what you burn through. Bold, dynamic, energizing pieces.',
    colors: {
      bg: 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50',
      accent: 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500',
      text: 'text-red-600',
      border: 'border-red-200',
      gradient: 'from-red-600 to-orange-500',
      lightBg: 'bg-red-50',
    },
    subtypes: [
      {
        id: 'electric-arc',
        name: 'Fire+Fire — THE ELECTRIC ARC',
        subtitle: 'Pure Fire',
        philosophy: 'You burn bright and fast. Your shopping list should include pieces that energize you without exhausting your attention. You need options that work together in unexpected combinations—because you hate being predictable.',
        principles: [
          'Look for pieces that can be mixed in unexpected ways',
          'Prioritize comfort—if it restricts movement, you won\'t wear it',
          'Invest in versatile pieces that work for multiple contexts (you hate changing outfits)',
          'Keep accessories bold and few—too many choices overwhelm you',
        ],
        items: [
          { category: 'Top', recommendation: 'Asymmetric knit sweater in electric blue or silver', whyItWorks: 'Unexpected silhouette, easy to throw on, catches light', pieceType: 'Signature piece' },
          { category: 'Bottom', recommendation: 'High-waisted trousers in charcoal or black', whyItWorks: 'Grounding foundation for your chaotic tops', pieceType: 'Foundation item' },
          { category: 'Outerwear', recommendation: 'Metallic or iridescent bomber jacket', whyItWorks: 'Portable energy—instant shine when you need it', pieceType: 'Statement piece' },
          { category: 'Shoe', recommendation: 'Sleek sneakers with metallic detail', whyItWorks: 'Comfort + visual interest, works with everything', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Interlocking geometric earrings', whyItWorks: 'Reflects your pattern-seeking mind', pieceType: 'Signature touch' },
          { category: 'Bag', recommendation: 'Convertible crossbody (can be clutch, backpack, shoulder)', whyItWorks: 'Adapts to your ever-changing needs', pieceType: 'Versatile' },
        ],
        avoid: [
          'Heavy, structured pieces that restrict movement',
          'Neutral-only palettes (you need color)',
          'Delicate pieces you\'ll forget to care for',
        ],
      },
      {
        id: 'blue-flame',
        name: 'Fire+Water — THE BLUE FLAME',
        subtitle: 'Fire + Water',
        philosophy: 'You need pieces that are precise. Not fussy—precise. Your shopping list should honor your standards without imprisoning you. You want fewer things, each one perfect in its way.',
        principles: [
          'Quality over quantity. Always.',
          'Clean lines, no extraneous details',
          'Fit is everything—tailor if needed',
          'Your palette is cool, clean, essential',
        ],
        items: [
          { category: 'Top', recommendation: 'Perfect white button-down, crisp, excellent fabric', whyItWorks: 'The ultimate canvas—clean, precise, essential', pieceType: 'Foundation' },
          { category: 'Bottom', recommendation: 'Tailored trousers in navy or charcoal', whyItWorks: 'Structure that supports without restricting', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Wool coat in charcoal or navy, impeccable fit', whyItWorks: 'Architecture for your body, worn daily', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Simple leather loafer or oxford in black or navy', whyItWorks: 'Quiet quality, no unnecessary detail', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Single strand of pearls or minimalist metal necklace', whyItWorks: 'One perfect thing, worn always', pieceType: 'Signature piece' },
          { category: 'Bag', recommendation: 'Structured leather tote in black or navy', whyItWorks: 'Holds what you need, nothing more', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Trend-driven pieces that won\'t last',
          'Loud logos or branding',
          'Compromises on fit or fabric',
        ],
      },
      {
        id: 'forged-iron',
        name: 'Fire+Earth — THE FORGE FIRE',
        subtitle: 'Fire + Iron',
        philosophy: 'You need pieces that work. Clothing is not decoration for you—it\'s equipment for the work of living. Your shopping list should honor your practicality without sacrificing your presence.',
        principles: [
          'Durability first—pieces that can handle your life',
          'Function matters as much as form',
          'Invest in materials that age well',
          'You want to reach for the same pieces daily',
        ],
        items: [
          { category: 'Top', recommendation: 'Heavyweight cotton t-shirt in deep burgundy or rust', whyItWorks: 'Substantial, durable, gets better with age', pieceType: 'Workhorse' },
          { category: 'Bottom', recommendation: 'Well-worn jeans or canvas work pants', whyItWorks: 'Purpose-built, comfortable, authentic', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Leather jacket or denim jacket', whyItWorks: 'Protective, gets better with wear, instantly you', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Sturdy leather boot, lace-up, broken-in', whyItWorks: 'Made for walking, made for work, made for you', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Simple metal watch or leather bracelet', whyItWorks: 'Utility + presence, marks time', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Canvas tote or leather messenger', whyItWorks: 'Carries what you need, no fuss', pieceType: 'Utility' },
        ],
        avoid: [
          'Delicate fabrics that require special care',
          'Pieces without pockets (you need pockets)',
          'Anything you can\'t move in',
        ],
      },
      {
        id: 'illuminating-spark',
        name: 'Fire+Air — THE ILLUMINATING SPARK',
        subtitle: 'Fire + Air',
        philosophy: 'You need pieces that begin. Your shopping list should include items that spark joy, that make you want to get dressed, that feel like possibility. You need options, not obligations.',
        principles: [
          'Choose pieces that light you up when you see them',
          'Variety is essential—you get bored easily',
          'Keep silhouettes simple so colors can shine',
          'Prioritize comfort—you won\'t wear it if it\'s not easy',
        ],
        items: [
          { category: 'Top', recommendation: 'Soft sweater in your signature bright color', whyItWorks: 'Instant mood lift, easy, comforting', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Simple jeans or trousers in neutral', whyItWorks: 'Foundation that lets your top shine', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Colorful jacket or coat', whyItWorks: 'First impression, visible, joyful', pieceType: 'Statement' },
          { category: 'Shoe', recommendation: 'Playful sneaker or flat in accent color', whyItWorks: 'Moves with you, doesn\'t demand attention', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Simple rose gold hoops or colorful scarf', whyItWorks: 'Easy, versatile, adds spark', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Crossbody in a color that makes you smile', whyItWorks: 'Hands-free, always with you, touch of color', pieceType: 'Workhorse' },
        ],
        avoid: [
          'All-neutral palettes (you need color)',
          'Pieces that require dry cleaning (too much commitment)',
          'Anything that makes you feel restricted',
        ],
      },

    ],
  },
  {
    element: 'water',
    icon: <Droplets className="w-6 h-6" />,
    verb: 'DISTILL',
    verbDescription: 'Clarify, concentrate, purify. Soft, flowing, essential pieces.',
    colors: {
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      accent: 'bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-indigo-500',
      lightBg: 'bg-blue-50',
    },
    subtypes: [
      {
        id: 'misty-shore',
        name: 'Water+Air — THE MISTY SHORE',
        subtitle: 'Water + Air',
        philosophy: 'You need pieces that soften. Your shopping list should honor your subtlety without letting you disappear. You want clothing that feels like a gentle boundary—present, protective, permeable.',
        principles: [
          'Choose pieces with soft textures and blurred edges',
          'Look for subtle color shifts, not bold contrasts',
          'Prioritize comfort and sensory pleasure',
          'You want to be remembered, not noticed',
        ],
        items: [
          { category: 'Top', recommendation: 'Soft cashmere or alpaca sweater in dove gray or misty blue', whyItWorks: 'Feels like being held, color that almost disappears', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Wide-leg trousers in soft gray or taupe', whyItWorks: 'Flowing, gentle, allows movement', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Long cardigan or wrap coat in soft gray', whyItWorks: 'Wraps around you, soft boundary, easy', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Soft leather flat or suede boot in taupe or gray', whyItWorks: 'Quiet, comfortable, doesn\'t announce itself', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Long, soft scarf in blended tones and fine fabric', whyItWorks: 'Versatile, comforting, can hide behind if needed', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Soft leather hobo or clutch in muted tone', whyItWorks: 'Holds things close, gentle shape', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Sharp lines and harsh colors',
          'Anything that feels like armor',
          'Loud patterns or logos',
        ],
      },
      {
        id: 'forest-lake',
        name: 'Water+Water — THE FOREST LAKE',
        subtitle: 'Pure Water',
        philosophy: 'You need pieces that hold depth. Your shopping list should honor your stillness without trapping you. You want clothing that reflects your interior—deep, quiet, true.',
        principles: [
          'Look for rich, saturated colors in your palette',
          'Choose pieces with presence and weight',
          'Invest in quality that deepens with time',
          'You want to be noticed when you arrive, not before',
        ],
        items: [
          { category: 'Top', recommendation: 'Deeply saturated sweater in forest green, burgundy, or navy', whyItWorks: 'Rich, grounding, draws people in', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Well-fitted dark jeans or trousers', whyItWorks: 'Quiet foundation, lets top speak', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Long wool coat in charcoal or deep green', whyItWorks: 'Presence, protection, timeless', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Simple leather boot or loafer in black or dark brown', whyItWorks: 'Grounded, unadorned, essential', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Single statement piece—silver ring, simple necklace', whyItWorks: 'One thing, worn always', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Structured leather tote in dark color', whyItWorks: 'Contains what you carry, quietly', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Trend-driven pieces that will feel wrong in a year',
          'Loud patterns (distract from your depth)',
          'Anything that feels insubstantial',
        ],
      },
      {
        id: 'sun-dappled-pond',
        name: 'Water+Fire — THE SUN-DAPPLED POND',
        subtitle: 'Water + Fire',
        philosophy: 'You need pieces that dance. Your shopping list should honor your lightness without dismissing your depth. You want clothing that catches light, that moves, that makes you smile.',
        principles: [
          'Look for pieces with movement—pleats, ruffles, flowing fabrics',
          'Choose colors that shimmer, sparkle, or glow',
          'Prioritize joy—if it doesn\'t make you happy, don\'t wear it',
          'You want to be remembered as the one who brought light',
        ],
        items: [
          { category: 'Top', recommendation: 'Silk blouse in champagne, soft coral, or pale gold', whyItWorks: 'Catches light, moves beautifully, feels special', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Flowing skirt or cropped trousers in cream or soft color', whyItWorks: 'Movement, lightness, unexpected joy', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Lightweight trench or cropped jacket in bright accent', whyItWorks: 'Visible happiness, easy to remove', pieceType: 'Statement piece' },
          { category: 'Shoe', recommendation: 'Ballet flat or metallic sandal in gold, rose gold, or bright', whyItWorks: 'Delicate, joyful, catch light', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Sparkly earrings or bracelet—small, joyful', whyItWorks: 'Tiny light sources, worn always', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Small crossbody in bright or metallic', whyItWorks: 'Light touch, hands-free, smile-inducing', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Heavy, dark colors (they weigh you down)',
          'Stiff fabrics that don\'t move',
          'Anything that feels like a uniform',
        ],
      },
      {
        id: 'languid-river',
        name: 'Water+Earth — THE LANGUID RIVER',
        subtitle: 'Water + Earth',
        philosophy: 'You need pieces that carry meaning. Your shopping list should honor your narrative without trapping you in it. You want clothing that tells your story—but leaves room for new chapters.',
        principles: [
          'Look for pieces with history—vintage, heirloom, meaningful',
          'Choose colors that hold memory—jewel tones, deep hues',
          'Invest in pieces you\'ll keep, not trends you\'ll discard',
          'You want to be remembered as the one who carries stories',
        ],
        items: [
          { category: 'Top', recommendation: 'Vintage-inspired blouse in jewel tone—sapphire, emerald, amethyst', whyItWorks: 'Carries history, rich color, tells a story', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Well-made trousers or skirt in deep neutral', whyItWorks: 'Anchors the narrative, lets top speak', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Vintage or vintage-style coat with interesting detail', whyItWorks: 'Layers of story, visible history, protection', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Quality leather boot or shoe with character', whyItWorks: 'Walks your path, develops patina over time', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Heirloom or vintage-style brooch, locket, or ring', whyItWorks: 'Carries meaning, sparks conversation, connects past to present', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Vintage leather satchel or embroidered bag', whyItWorks: 'A vessel for your stories, ages beautifully', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Fast fashion with no soul or story',
          'Disposable trends that won\'t age well',
          'Anything mass-produced that feels generic',
        ],
      },
    ],
  },

  {
    element: 'earth',
    icon: <Mountain className="w-6 h-6" />,
    verb: 'UNEARTH',
    verbDescription: 'Dig deeper, reveal what\'s buried. Natural, grounded, enduring pieces.',
    colors: {
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
      accent: 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700',
      text: 'text-amber-700',
      border: 'border-amber-200',
      gradient: 'from-amber-600 to-orange-600',
      lightBg: 'bg-amber-50',
    },
    subtypes: [
      {
        id: 'mountain-stone',
        name: 'Earth+Fire — THE MOUNTAIN STONE',
        subtitle: 'Earth + Fire',
        philosophy: 'You need pieces that endure. Your shopping list should honor your permanence without becoming rigid. You want clothing that feels like bedrock—steady, reliable, unchanging.',
        principles: [
          'Choose pieces that will last a decade or more',
          'Look for natural materials that age beautifully',
          'Invest in quality, not quantity',
          'You want to be recognized, not changed',
        ],
        items: [
          { category: 'Top', recommendation: 'Heavyweight wool or cashmere sweater in heather gray, charcoal, or oatmeal', whyItWorks: 'Durable, timeless, grounding', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Well-cut trousers or jeans in dark wash', whyItWorks: 'Foundation that never changes, always reliable', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Classic wool coat in charcoal or navy', whyItWorks: 'Architecture for your body, worn for years', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Sturdy leather boot or oxford in black or brown', whyItWorks: 'Worn daily, lasts decades', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Simple metal watch or signet ring', whyItWorks: 'One thing, worn always, marks time', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Quality leather tote or briefcase', whyItWorks: 'Carries your life, ages with you', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Trend-driven pieces',
          'Delicate fabrics that won\'t hold up',
          'Anything you wouldn\'t wear for years',
        ],
      },
      {
        id: 'forest-floor',
        name: 'Earth+Earth — THE FOREST FLOOR',
        subtitle: 'Pure Earth',
        philosophy: 'You need pieces that layer. Your shopping list should honor your depth without burying you. You want clothing with texture, history, richness—pieces that reveal themselves over time.',
        principles: [
          'Look for natural, textured fabrics—wool, linen, cotton, leather',
          'Choose colors found in earth—browns, ochres, rusts, deep greens',
          'Invest in pieces you can layer and combine',
          'You want to be discovered, not announced',
        ],
        items: [
          { category: 'Top', recommendation: 'Layering pieces—linen shirt, wool sweater, cotton t-shirt in earth tones', whyItWorks: 'Texture, depth, can be worn alone or layered', pieceType: 'Workhorse' },
          { category: 'Bottom', recommendation: 'Well-worn jeans or work pants in olive, brown, or indigo', whyItWorks: 'Grounded, durable, gets better with wear', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Textured jacket—waxed canvas, wool, leather in earth tones', whyItWorks: 'Protective, layered, holds memory', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Work boot or hiker in brown or tan', whyItWorks: 'Made for walking, durable, honest', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Piece made from natural materials—leather cord, stone, wood', whyItWorks: 'Earth itself, worn close', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Canvas or leather backpack', whyItWorks: 'Carries what you gather, hands-free', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Synthetic fabrics (they don\'t breathe or age)',
          'Perfect, unmarked pieces (you need texture)',
          'Anything that feels disposable',
        ],
      },
      {
        id: 'velvet-moss',
        name: 'Earth+Water — THE VELVET MOSS',
        subtitle: 'Earth + Water',
        philosophy: 'You need pieces that soften. Your shopping list should honor your gentleness without making you disappear. You want clothing that feels like a hug—comforting, present, warm.',
        principles: [
          'Look for the softest fabrics—cashmere, velvet, brushed cotton, alpaca',
          'Choose colors that feel like comfort—moss, sage, rose, cream',
          'Prioritize sensory pleasure—if it doesn\'t feel good, don\'t wear it',
          'You want to be approached, not confronted',
        ],
        items: [
          { category: 'Top', recommendation: 'Cashmere or alpaca sweater in soft green, rose, or cream', whyItWorks: 'Soft as moss, worn next to skin', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Soft trousers or skirt in velvet, corduroy, or soft cotton', whyItWorks: 'Gentle, comforting, allows movement', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Soft cardigan or wrap coat in wool or cashmere', whyItWorks: 'Wraps around you, soft boundary', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Soft leather flat or slipper in muted tone', whyItWorks: 'Quiet, comfortable, doesn\'t demand attention', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Soft scarf or wrap in your colors', whyItWorks: 'Can be held, wrapped, comforted', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Soft leather or fabric bag in muted tone', whyItWorks: 'Holds what you need, doesn\'t shout', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Stiff, scratchy fabrics',
          'Harsh colors or stark contrasts',
          'Anything that doesn\'t feel good to touch',
        ],
      },
      {
        id: 'golden-harvest',
        name: 'Earth+Air — THE GOLDEN HARVEST',
        subtitle: 'Earth + Air',
        philosophy: 'You need pieces that share. Your shopping list should honor your generosity without depleting you. You want clothing that welcomes—others to you, you to yourself.',
        principles: [
          'Look for pieces in warm, abundant colors—gold, ochre, rust, deep orange',
          'Choose fabrics that feel generous—velvet, silk, soft wool',
          'Invest in pieces that can be worn for many occasions',
          'You want to be known as the one who welcomes',
        ],
        items: [
          { category: 'Top', recommendation: 'Soft sweater or silk blouse in gold, ochre, rust, or deep orange', whyItWorks: 'Warm, welcoming, catches light', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Well-fitted trousers or skirt in warm neutral', whyItWorks: 'Foundation that lets top shine', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Coat in warm camel, rust, or gold', whyItWorks: 'Visible warmth, welcomes from a distance', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Comfortable boot or flat in warm neutral', whyItWorks: 'Welcomes walking, talking, being together', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Gold jewelry—earrings, necklace, bracelet', whyItWorks: 'Small warmth, worn always', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Spacious tote in warm neutral', whyItWorks: 'Room to carry what you gather, what you give', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Cool, distant colors (they don\'t reflect your warmth)',
          'Restrictive silhouettes (you need to move freely)',
          'Anything that feels exclusive or ungenerous',
        ],

      },
    ],
  },

  {
    element: 'air',
    icon: <Wind className="w-6 h-6" />,
    verb: 'BREATHE',
    verbDescription: 'Create space, lighten, release. Light, minimal, freeing pieces.',
    colors: {
      bg: 'bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50',
      accent: 'bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300',
      text: 'text-orange-600',
      border: 'border-orange-200',
      gradient: 'from-orange-400 to-yellow-400',
      lightBg: 'bg-orange-50',
    },
    subtypes: [
      {
        id: 'clear-morning-sky',
        name: 'Air+Air — THE CLEAR MORNING SKY',
        subtitle: 'Pure Air',
        philosophy: 'You need pieces that create space. Your shopping list should honor your spaciousness without leaving you empty. You want clothing that feels like air—present, supportive, invisible.',
        principles: [
          'Look for pieces in light, airy colors—white, pale blue, dove gray',
          'Choose fabrics that breathe—linen, cotton, lightweight wool',
          'Prioritize minimalism—fewer pieces, each essential',
          'You want to be remembered as the one who made room',
        ],
        items: [
          { category: 'Top', recommendation: 'Lightweight linen or cotton shirt in white, pale blue, or cream', whyItWorks: 'Breathes, minimal, essential', pieceType: 'Foundation' },
          { category: 'Bottom', recommendation: 'Simple trousers or skirt in light neutral', whyItWorks: 'Unobtrusive, foundational, freeing', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Lightweight trench or minimalist jacket in light neutral', whyItWorks: 'Protection without weight', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Simple leather flat or sneaker in white or cream', whyItWorks: 'Unnoticeable, comfortable, clean', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Minimalist necklace or watch—silver, white metal', whyItWorks: 'Small presence, doesn\'t compete', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Simple tote or crossbody in light neutral', whyItWorks: 'Holds what you need, doesn\'t demand attention', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Heavy, dark colors (they weigh you down)',
          'Loud patterns or logos',
          'Anything that feels cluttered or complicated',
        ],
      },
      {
        id: 'playful-breeze',
        name: 'Air+Fire — THE PLAYFUL BREEZE',
        subtitle: 'Air + Fire',
        philosophy: 'You need pieces that move. Your shopping list should honor your energy without scattering it. You want clothing that dances with you—light, flexible, joyful.',
        principles: [
          'Look for pieces with movement—pleats, ruffles, flowing fabrics',
          'Choose colors that feel like air—sky blue, seafoam, white',
          'Prioritize comfort and flexibility',
          'You want to be known as the one who brings movement',
        ],
        items: [
          { category: 'Top', recommendation: 'Flowing blouse or soft t-shirt in sky blue, seafoam, white', whyItWorks: 'Moves with you, easy, joyful', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Cropped trousers or flared skirt in light neutral', whyItWorks: 'Movement, lightness, fun', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Light jacket or cardigan in bright accent', whyItWorks: 'Easy to remove, visible energy', pieceType: 'Statement piece' },
          { category: 'Shoe', recommendation: 'Playful sneaker or flat in bright or metallic', whyItWorks: 'Moves with you, doesn\'t slow you down', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Hoop earrings or colorful scarf', whyItWorks: 'Moves when you move, visible joy', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Crossbody in bright or light color', whyItWorks: 'Hands-free, lets you move', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Heavy, structured pieces',
          'Dark colors (they don\'t reflect your energy)',
          'Anything you can\'t move in',
        ],
      },
      {
        id: 'gilded-zephyr',
        name: 'Air+Earth — THE GILDED ZEPHYR',
        subtitle: 'Air + Earth',
        philosophy: 'You need pieces that glow. Your shopping list should honor your beauty without imprisoning you in it. You want clothing that catches light, that feels special, that makes ordinary moments sacred.',
        principles: [
          'Look for pieces in warm, luminous colors—gold, champagne, rose, soft amber',
          'Choose fabrics that catch light—silk, velvet, cashmere, metallic',
          'Invest in quality over quantity',
          'You want to be known as the one who makes everything beautiful',
        ],
        items: [
          { category: 'Top', recommendation: 'Silk blouse or cashmere sweater in champagne, gold, rose', whyItWorks: 'Luminous, luxurious, timeless', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Well-fitted trousers or skirt in warm neutral', whyItWorks: 'Foundation that lets top shine', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Coat in warm camel, gold, or rose', whyItWorks: 'Visible beauty, wraps you in light', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Elegant flat or heel in metallic or warm neutral', whyItWorks: 'Beautiful, comfortable enough to wear', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Gold jewelry—something that catches light', whyItWorks: 'Small glow, worn always', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Quality leather bag in warm tone', whyItWorks: 'Beautiful, functional, timeless', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Synthetic fabrics that don\'t breathe',
          'Cool, flat colors (they don\'t reflect your light)',
          'Anything that feels ordinary',
        ],
      },
      {
        id: 'first-whisper',
        name: 'Air+Water — THE FIRST WHISPER',
        subtitle: 'Air + Water',
        philosophy: 'You need pieces that protect and reveal. Your shopping list should honor your privacy without hiding you. You want clothing that feels like a secret—intimate, personal, true.',
        principles: [
          'Look for pieces in soft, muted colors—dove gray, soft violet, pale blue, cream',
          'Choose fabrics that feel intimate—soft cotton, cashmere, silk',
          'Prioritize pieces that feel like you, not what you think you should wear',
          'You want to be discovered, not announced',
        ],
        items: [
          { category: 'Top', recommendation: 'Soft cotton or cashmere sweater in dove gray, soft violet, cream', whyItWorks: 'Soft against skin, private, true', pieceType: 'Signature' },
          { category: 'Bottom', recommendation: 'Simple trousers or skirt in muted neutral', whyItWorks: 'Quiet foundation, doesn\'t compete', pieceType: 'Foundation' },
          { category: 'Outerwear', recommendation: 'Soft cardigan or wrap in muted tone', whyItWorks: 'Protective, can wrap around you, intimate', pieceType: 'Signature' },
          { category: 'Shoe', recommendation: 'Soft leather flat or slipper in muted tone', whyItWorks: 'Quiet, doesn\'t announce your arrival', pieceType: 'Workhorse' },
          { category: 'Accessory', recommendation: 'Small, personal piece—something only you know the meaning of', whyItWorks: 'Your secret, worn close', pieceType: 'Signature' },
          { category: 'Bag', recommendation: 'Small, soft bag in muted tone', whyItWorks: 'Holds what matters, close to you', pieceType: 'Workhorse' },
        ],
        avoid: [
          'Loud patterns or logos (they feel like shouting)',
          'Anything that doesn\'t feel like you',
          'Pieces chosen for others, not for yourself',
        ],
      },
    ],
  },

];

const getPieceTypeColor = (pieceType: string) => {
  const lower = pieceType.toLowerCase();
  if (lower.includes('signature')) return 'bg-red-100 text-red-700 border-red-200';
  if (lower.includes('foundation')) return 'bg-slate-100 text-slate-700 border-slate-200';
  if (lower.includes('statement')) return 'bg-purple-100 text-purple-700 border-purple-200';
  if (lower.includes('workhorse')) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (lower.includes('versatile')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (lower.includes('utility')) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const ElementalShoppingLists: React.FC<ElementalShoppingListsProps> = ({ userElement, userSubtype }) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(userElement || null);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);

  const handleDownloadPDF = async (subtype: SubtypeShoppingList, element: string) => {
    setGeneratingPdf(subtype.id);
    try {
      // Small delay to allow the loading state to render
      await new Promise(resolve => setTimeout(resolve, 100));
      generateShoppingListPDF(subtype, element);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGeneratingPdf(null);
    }
  };

  const selectedData = selectedElement ? shoppingData.find(d => d.element === selectedElement) : null;

  const isUserElement = (element: string) => userElement === element;
  const isUserSubtype = (subtypeId: string) => userSubtype === subtypeId;

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-5 h-5" />;
      case 'water': return <Droplets className="w-5 h-5" />;
      case 'earth': return <Mountain className="w-5 h-5" />;
      case 'air': return <Wind className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction - Next Step Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 w-32 h-32 rounded-full bg-amber-500 blur-3xl" />
          <div className="absolute bottom-4 right-8 w-24 h-24 rounded-full bg-rose-500 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 rounded-full mb-4">
            <ArrowRight className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">Next Step After Your Review</span>
          </div>
          <ShoppingBag className="w-10 h-10 mx-auto text-amber-400 mb-4" />
           <h3 className="text-2xl font-serif text-white mb-4">Elemental Shopping List</h3>

          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Each subtype's shopping list is not a prescription—it's an <span className="text-amber-400 font-medium">invitation</span>. 
            A collection of pieces, textures, and colors that resonate with your Elemental nature. 
            Not trends to follow, but <span className="text-amber-400 font-medium">frequencies to recognize</span>.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm italic">
            What follows are shopping suggestions for each of the 16 subtypes—a starting point for building 
            an Elemental wardrobe that feels like coming home.
          </p>
        </div>
      </div>

      {/* The Four Processes */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h4 className="text-xl font-serif text-gray-900 mb-2 text-center">The Four Wardrobe Processes</h4>
        <p className="text-gray-500 text-sm text-center mb-6 max-w-2xl mx-auto">
          Each element's process reminds us what it needs most.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shoppingData.map((data) => (
            <button
              key={data.element}
              onClick={() => setSelectedElement(data.element)}
              className={`group relative rounded-xl p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 ${
                selectedElement === data.element
                  ? `${data.colors.border} ${data.colors.lightBg} shadow-md`
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              {isUserElement(data.element) && (
                <span className="absolute -top-2 right-3 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Your Element
                </span>
              )}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${data.colors.accent} text-white mb-3`}>
                {data.icon}
              </div>
              <h5 className="font-bold text-gray-900 mb-1">
                {data.element.charAt(0).toUpperCase() + data.element.slice(1)}: <span className={data.colors.text}>{data.verb}</span>
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed">{data.verbDescription}</p>
              {data.comingSoon && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Element Content */}
      {selectedData && !selectedData.comingSoon && (
        <div className={`${selectedData.colors.bg} rounded-2xl p-8 border border-gray-200 relative`}>
          {/* Close button */}
          <button
            onClick={() => { setSelectedElement(null); setExpandedSubtype(null); }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Element Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${selectedData.colors.accent} text-white mb-4`}>
              {selectedData.icon}
              <span className="text-xl font-bold uppercase tracking-wide">
                {selectedData.element} — {selectedData.verb}
              </span>
            </div>
            <p className="text-gray-600 max-w-xl mx-auto">{selectedData.verbDescription}</p>
          </div>

          {/* Subtypes */}
          <div className="space-y-4">
            {selectedData.subtypes.map((subtype) => {
              const isExpanded = expandedSubtype === subtype.id;
              const isUser = isUserSubtype(subtype.id);

              return (
                <div
                  key={subtype.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all shadow-sm ${
                    isUser ? 'ring-2 ring-amber-400 shadow-amber-100' : ''
                  }`}
                >
                  {/* Subtype Header */}
                  <button
                    onClick={() => setExpandedSubtype(isExpanded ? null : subtype.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isUser && (
                        <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold rounded-full">
                          You
                        </span>
                      )}
                      <div className="text-left">
                        <span className="font-bold text-gray-900 block">{subtype.name}</span>
                        <span className="text-gray-500 text-sm">{subtype.subtitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${selectedData.colors.text} hidden sm:block`}>
                        {subtype.items.length} pieces
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 border-t border-gray-100">
                      {/* Download PDF Button - Top */}
                      <div className="mt-4 mb-5 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(subtype, selectedData.element);
                          }}
                          disabled={generatingPdf === subtype.id}
                          className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
                            generatingPdf === subtype.id
                              ? 'bg-gray-100 text-gray-400 cursor-wait'
                              : `bg-gradient-to-r ${selectedData.colors.gradient} text-white hover:scale-[1.02] active:scale-[0.98]`
                          }`}
                        >
                          {generatingPdf === subtype.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Generating PDF...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                              <span>Download Shopping List PDF</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Philosophy */}
                      <div className="mt-1 mb-6">
                        <h5 className={`font-semibold ${selectedData.colors.text} mb-2 text-sm uppercase tracking-wider`}>
                          The {selectedData.verb} Philosophy
                        </h5>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{subtype.philosophy}"
                        </p>
                      </div>

                      {/* Core Shopping Principles */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                          Core Shopping Principles
                        </h5>
                        <div className="space-y-2">
                          {subtype.principles.map((principle, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r ${selectedData.colors.gradient}`} />
                              <p className="text-gray-600 text-sm">{principle}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Starter Shopping List */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          Starter Shopping List
                        </h5>
                        <div className="space-y-3">
                          {subtype.items.map((item, idx) => (
                            <div
                              key={idx}
                              className={`rounded-lg border ${selectedData.colors.border} bg-white p-4 hover:shadow-sm transition-shadow`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${selectedData.colors.gradient} text-white text-xs font-bold`}>
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <span className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.category}</span>
                                    <span className={`ml-2 inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getPieceTypeColor(item.pieceType)}`}>
                                      {item.pieceType}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-800 font-medium">{item.recommendation}</p>
                                  <p className="text-gray-500 text-sm mt-1">{item.whyItWorks}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What to Avoid */}
                      <div className="bg-red-50/60 rounded-xl p-5 border border-red-100">
                        <h5 className="font-semibold text-red-700 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          What to Avoid
                        </h5>
                        <div className="space-y-2">
                          {subtype.avoid.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                              <p className="text-red-700 text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Download PDF Button - Bottom */}
                      <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-xs italic text-center sm:text-left">
                          Save this shopping list as a beautifully formatted PDF to take with you while shopping.
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(subtype, selectedData.element);
                          }}
                          disabled={generatingPdf === subtype.id}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                            generatingPdf === subtype.id
                              ? 'bg-gray-100 text-gray-400 cursor-wait'
                              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md active:scale-[0.98]'
                          }`}
                        >
                          {generatingPdf === subtype.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Generating...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Coming Soon State */}
      {selectedData && selectedData.comingSoon && (
        <div className={`${selectedData.colors.bg} rounded-2xl p-8 border border-gray-200 relative`}>
          <button
            onClick={() => { setSelectedElement(null); setExpandedSubtype(null); }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-center py-12">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${selectedData.colors.accent} text-white mb-6`}>
              {selectedData.icon}
              <span className="text-xl font-bold uppercase tracking-wide">
                {selectedData.element} — {selectedData.verb}
              </span>
            </div>
            <h3 className="text-2xl font-serif text-gray-900 mb-3">Coming Soon</h3>
            <p className="text-gray-600 max-w-lg mx-auto leading-relaxed mb-2">
              {selectedData.verbDescription}
             </p>
             <p className="text-gray-500 text-sm max-w-md mx-auto">
               The {selectedData.element.charAt(0).toUpperCase() + selectedData.element.slice(1)} element shopping list 
               is being carefully curated. Check back soon for personalized shopping recommendations 
               for all four {selectedData.element.charAt(0).toUpperCase() + selectedData.element.slice(1)} subtypes.
             </p>

          </div>
        </div>
      )}

      {/* Prompt to select if nothing selected */}
      {!selectedElement && (
        <div className="text-center py-8">
           <p className="text-gray-500">
             Select an element above to explore its shopping list

          </p>
        </div>
      )}



      {/* The Deeper Truth */}
      <div className="bg-gradient-to-br from-gray-50 via-amber-50/30 to-gray-50 rounded-2xl p-10 text-center border border-amber-100/60 shadow-sm">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4">The Deeper Truth</p>
        <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed italic text-lg font-serif">
          "The perfect piece is not perfect because it matches a list. It is perfect because, when you wear it, 
          <span className="text-amber-600 font-medium not-italic"> you recognize yourself</span>."
        </p>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6" />
      </div>

    </div>
  );
};

export default ElementalShoppingLists;
