// Nail color recommendations for each elemental subtype

export interface NailColor {
  name: string;
  hex: string;
  brand?: string;
  productName?: string;
  finish?: 'cream' | 'shimmer' | 'glitter' | 'matte' | 'metallic' | 'jelly';
}

export interface NailArtTip {
  pattern: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface NailPalette {
  everydayNeutrals: NailColor[];
  boldStatement: NailColor[];
  seasonalPicks: NailColor[];
  specialOccasion: NailColor[];
  recommendedFinishes: string[];
  nailArtTips: NailArtTip[];
  generalTips: string[];
}

export const nailPalettes: Record<string, NailPalette> = {
  // FIRE SUBTYPES (Winter)
  'fire-fire': {
    everydayNeutrals: [
      { name: 'Cool Taupe', hex: '#8B8589', brand: 'Essie', productName: 'Chinchilly', finish: 'cream' },
      { name: 'Greige', hex: '#9F9B96', brand: 'OPI', productName: 'Taupe-less Beach', finish: 'cream' },
      { name: 'Soft Mauve', hex: '#B8A9A9', brand: 'Zoya', productName: 'Rue', finish: 'cream' },
      { name: 'Icy Pink', hex: '#E8D4D4', brand: 'Essie', productName: 'Ballet Slippers', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'True Red', hex: '#C41E3A', brand: 'OPI', productName: 'Big Apple Red', finish: 'cream' },
      { name: 'Deep Plum', hex: '#4A0E4E', brand: 'Zoya', productName: 'Lidia', finish: 'cream' },
      { name: 'Jet Black', hex: '#0A0A0A', brand: 'Essie', productName: 'Licorice', finish: 'cream' },
      { name: 'Hot Pink', hex: '#FF1493', brand: 'OPI', productName: 'Pink Flamenco', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Icy Silver', hex: '#C0C0C0', brand: 'Essie', productName: 'No Place Like Chrome', finish: 'metallic' },
      { name: 'Navy Blue', hex: '#000080', brand: 'Zoya', productName: 'Sailor', finish: 'cream' },
      { name: 'Emerald', hex: '#046307', brand: 'OPI', productName: 'Stay Off the Lawn!!', finish: 'cream' },
      { name: 'Wine', hex: '#722F37', brand: 'Essie', productName: 'Bordeaux', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Silver Glitter', hex: '#D8D8D8', brand: 'Zoya', productName: 'Cosmo', finish: 'glitter' },
      { name: 'Deep Berry Shimmer', hex: '#8E4585', brand: 'OPI', productName: 'Vampsterdam', finish: 'shimmer' },
      { name: 'Platinum', hex: '#E5E4E2', brand: 'Essie', productName: 'Penny Talk', finish: 'metallic' },
      { name: 'Midnight Blue Glitter', hex: '#191970', brand: 'Zoya', productName: 'Dream', finish: 'glitter' }
    ],
    recommendedFinishes: ['High-shine cream', 'Metallic', 'Silver glitter', 'Glass-like shine'],
    nailArtTips: [
      { pattern: 'French Tips with Black', description: 'Classic French manicure with jet black tips instead of white for dramatic contrast', difficulty: 'easy' },
      { pattern: 'Silver Foil Accents', description: 'Apply silver foil strips on accent nails for a modern, edgy look', difficulty: 'medium' },
      { pattern: 'Geometric Lines', description: 'Use striping tape to create sharp geometric patterns in silver and black', difficulty: 'medium' },
      { pattern: 'Ombré Red to Black', description: 'Gradient from true red to black for a dramatic statement', difficulty: 'advanced' }
    ],
    generalTips: [
      'High contrast colors work best for your dramatic coloring',
      'Silver and platinum metallics are more flattering than gold',
      'Avoid warm, orangey nail colors',
      'Black nail polish is a signature look for True Winter types',
      'Cool-toned reds and berries are your power colors'
    ]
  },

  'fire-earth': {
    everydayNeutrals: [
      { name: 'Warm Taupe', hex: '#8B7355', brand: 'Essie', productName: 'Mochacino', finish: 'cream' },
      { name: 'Mushroom', hex: '#A4978E', brand: 'Zoya', productName: 'Normani', finish: 'cream' },
      { name: 'Dusty Rose', hex: '#C4A4A4', brand: 'OPI', productName: 'Tickle My France-y', finish: 'cream' },
      { name: 'Nude Brown', hex: '#A4948C', brand: 'Essie', productName: 'Wild Nude', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Burgundy', hex: '#722F37', brand: 'OPI', productName: 'Malaga Wine', finish: 'cream' },
      { name: 'Forest Green', hex: '#228B22', brand: 'Zoya', productName: 'Hunter', finish: 'cream' },
      { name: 'Oxblood', hex: '#4A0000', brand: 'Essie', productName: 'Wicked', finish: 'cream' },
      { name: 'Deep Plum', hex: '#4A0E4E', brand: 'OPI', productName: 'Lincoln Park After Dark', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Bronze', hex: '#CD7F32', brand: 'Essie', productName: 'Penny Talk', finish: 'metallic' },
      { name: 'Mahogany', hex: '#4E0707', brand: 'Zoya', productName: 'Elisa', finish: 'cream' },
      { name: 'Espresso', hex: '#3C1414', brand: 'OPI', productName: 'Espresso Your Style', finish: 'cream' },
      { name: 'Aubergine', hex: '#3D0734', brand: 'Essie', productName: 'Sole Mate', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Copper Shimmer', hex: '#B87333', brand: 'Zoya', productName: 'Autumn', finish: 'shimmer' },
      { name: 'Burgundy Glitter', hex: '#722F37', brand: 'OPI', productName: 'Bogota Blackberry', finish: 'glitter' },
      { name: 'Pewter', hex: '#8A8D8F', brand: 'Essie', productName: 'For the Twill of It', finish: 'metallic' },
      { name: 'Deep Green Shimmer', hex: '#228B22', brand: 'Zoya', productName: 'Veruschka', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Shimmer', 'Bronze/copper metallic', 'Satin'],
    nailArtTips: [
      { pattern: 'Tortoiseshell', description: 'Create a tortoiseshell pattern using burgundy, brown, and gold', difficulty: 'advanced' },
      { pattern: 'Bronze Foil Tips', description: 'Apply bronze foil to tips for an elegant, warm metallic look', difficulty: 'medium' },
      { pattern: 'Deep Ombré', description: 'Gradient from burgundy to deep plum for rich depth', difficulty: 'medium' },
      { pattern: 'Marble in Earth Tones', description: 'Create marble effect using burgundy, bronze, and cream', difficulty: 'advanced' }
    ],
    generalTips: [
      'Deep, rich colors complement your intense coloring',
      'Bronze and copper metallics are more flattering than silver',
      'Burgundy is your signature nail color',
      'Avoid bright, clear colors - opt for muted depth instead',
      'Brown-based reds work better than blue-based reds'
    ]
  },

  'fire-air': {
    everydayNeutrals: [
      { name: 'Cool Pink', hex: '#FFB6C1', brand: 'Essie', productName: 'Fiji', finish: 'cream' },
      { name: 'Soft Lavender', hex: '#E6E6FA', brand: 'Zoya', productName: 'Miley', finish: 'cream' },
      { name: 'Icy Nude', hex: '#E8D4D4', brand: 'OPI', productName: 'Bubble Bath', finish: 'cream' },
      { name: 'Cool Gray', hex: '#B0B0B0', brand: 'Essie', productName: 'Maximillian Strasse Her', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Electric Blue', hex: '#0066FF', brand: 'OPI', productName: 'Rich Girls & Po-Boys', finish: 'cream' },
      { name: 'Fuchsia', hex: '#FF00FF', brand: 'Zoya', productName: 'Charisma', finish: 'cream' },
      { name: 'Bright Purple', hex: '#8B00FF', brand: 'Essie', productName: 'Play Date', finish: 'cream' },
      { name: 'Cherry Red', hex: '#DE3163', brand: 'OPI', productName: 'Cajun Shrimp', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Turquoise', hex: '#40E0D0', brand: 'Zoya', productName: 'Zuza', finish: 'cream' },
      { name: 'Bright Silver', hex: '#D8D8D8', brand: 'Essie', productName: 'No Place Like Chrome', finish: 'metallic' },
      { name: 'Violet', hex: '#8B00FF', brand: 'OPI', productName: 'Do You Lilac It?', finish: 'cream' },
      { name: 'Hot Pink', hex: '#FF1493', brand: 'Zoya', productName: 'Ali', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Holographic Silver', hex: '#E8E8E8', brand: 'Zoya', productName: 'Alicia', finish: 'glitter' },
      { name: 'Fuchsia Shimmer', hex: '#FD3DB5', brand: 'OPI', productName: 'Pompeii Purple', finish: 'shimmer' },
      { name: 'Blue Glitter', hex: '#0066FF', brand: 'Essie', productName: 'Lots of Lux', finish: 'glitter' },
      { name: 'Iridescent', hex: '#F0F0F0', brand: 'Zoya', productName: 'Leia', finish: 'shimmer' }
    ],
    recommendedFinishes: ['High-shine cream', 'Holographic', 'Silver glitter', 'Iridescent'],
    nailArtTips: [
      { pattern: 'Neon French Tips', description: 'Classic French with neon pink or blue tips', difficulty: 'easy' },
      { pattern: 'Color Block', description: 'Bold geometric color blocking with bright contrasting colors', difficulty: 'medium' },
      { pattern: 'Holographic Accent', description: 'One holographic accent nail with solid bright colors on others', difficulty: 'easy' },
      { pattern: 'Abstract Art', description: 'Freeform abstract designs in bright, clear colors', difficulty: 'advanced' }
    ],
    generalTips: [
      'Bright, saturated colors are your playground',
      'You can wear neon shades that others cannot',
      'Silver and holographic finishes enhance your brightness',
      'Avoid muted, dusty colors - they will dull your look',
      'Clear, vivid colors are always the right choice'
    ]
  },

  'fire-water': {
    everydayNeutrals: [
      { name: 'Soft Rose', hex: '#E8C4C4', brand: 'Essie', productName: 'Mademoiselle', finish: 'cream' },
      { name: 'Dusty Mauve', hex: '#C4A4B4', brand: 'Zoya', productName: 'Brigitte', finish: 'cream' },
      { name: 'Cool Nude', hex: '#C4AEAD', brand: 'OPI', productName: 'Put It in Neutral', finish: 'cream' },
      { name: 'Soft Gray', hex: '#B8B0B0', brand: 'Essie', productName: 'Take It Outside', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Rose Pink', hex: '#FF66B2', brand: 'OPI', productName: 'Shorts Story', finish: 'cream' },
      { name: 'Raspberry', hex: '#E30B5C', brand: 'Zoya', productName: 'Dana', finish: 'cream' },
      { name: 'Soft Plum', hex: '#8E4585', brand: 'Essie', productName: 'Flowerista', finish: 'cream' },
      { name: 'Teal', hex: '#008080', brand: 'OPI', productName: 'Is That a Spear in Your Pocket?', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Periwinkle', hex: '#8E8EFF', brand: 'Zoya', productName: 'Aster', finish: 'cream' },
      { name: 'Lavender', hex: '#B57EDC', brand: 'Essie', productName: 'Lilacism', finish: 'cream' },
      { name: 'Soft Berry', hex: '#8E4585', brand: 'OPI', productName: 'Do You Lilac It?', finish: 'cream' },
      { name: 'Wisteria', hex: '#C9A0DC', brand: 'Zoya', productName: 'Leslie', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Rose Gold Shimmer', hex: '#E8B4B8', brand: 'Essie', productName: 'Penny Talk', finish: 'shimmer' },
      { name: 'Plum Glitter', hex: '#8E4585', brand: 'Zoya', productName: 'Payton', finish: 'glitter' },
      { name: 'Soft Pink Shimmer', hex: '#FFB6C1', brand: 'OPI', productName: 'Princesses Rule!', finish: 'shimmer' },
      { name: 'Orchid Shimmer', hex: '#DA70D6', brand: 'Zoya', productName: 'Zara', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Soft shimmer', 'Rose gold metallic', 'Satin'],
    nailArtTips: [
      { pattern: 'Soft Ombré', description: 'Gentle gradient from soft pink to lavender', difficulty: 'medium' },
      { pattern: 'Delicate Florals', description: 'Small rose or cherry blossom designs in soft colors', difficulty: 'advanced' },
      { pattern: 'Rose Gold Accents', description: 'Rose gold foil or striping tape on soft pink base', difficulty: 'easy' },
      { pattern: 'Watercolor Effect', description: 'Soft, blended watercolor look in rose and lavender', difficulty: 'advanced' }
    ],
    generalTips: [
      'Softer versions of Winter colors work best',
      'Rose and plum tones are particularly flattering',
      'Rose gold metallics complement your coloring',
      'Avoid very bright or very dark extremes',
      'Your nails should look refined and elegant'
    ]
  },

  // WATER SUBTYPES (Summer)
  'water-water': {
    everydayNeutrals: [
      { name: 'Dusty Rose', hex: '#D4A5A5', brand: 'Essie', productName: 'Eternal Optimist', finish: 'cream' },
      { name: 'Soft Mauve', hex: '#C4A4C4', brand: 'Zoya', productName: 'Rue', finish: 'cream' },
      { name: 'Nude Rose', hex: '#C4AEAD', brand: 'OPI', productName: 'Dulce de Leche', finish: 'cream' },
      { name: 'Soft Gray', hex: '#B0B0B0', brand: 'Essie', productName: 'Chinchilly', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Dusty Blue', hex: '#6B8BA4', brand: 'OPI', productName: 'Check Out the Old Geysirs', finish: 'cream' },
      { name: 'Soft Plum', hex: '#8E4585', brand: 'Zoya', productName: 'Landon', finish: 'cream' },
      { name: 'Muted Teal', hex: '#5F9EA0', brand: 'Essie', productName: 'Greenport', finish: 'cream' },
      { name: 'Dusty Berry', hex: '#A4879C', brand: 'OPI', productName: 'Reykjavik Has All the Hot Spots', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Lavender', hex: '#B4A7D6', brand: 'Zoya', productName: 'Julie', finish: 'cream' },
      { name: 'Soft Blue', hex: '#87CEEB', brand: 'Essie', productName: 'Bikini So Teeny', finish: 'cream' },
      { name: 'Rose Pink', hex: '#E8A4B8', brand: 'OPI', productName: 'Mod About You', finish: 'cream' },
      { name: 'Cocoa', hex: '#8B7D7B', brand: 'Zoya', productName: 'Jana', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Soft Silver Shimmer', hex: '#C0C0C0', brand: 'Essie', productName: 'Beyond Cozy', finish: 'shimmer' },
      { name: 'Dusty Rose Shimmer', hex: '#D4A5A5', brand: 'Zoya', productName: 'Addison', finish: 'shimmer' },
      { name: 'Lavender Shimmer', hex: '#B4A7D6', brand: 'OPI', productName: 'One Heckla of a Color!', finish: 'shimmer' },
      { name: 'Soft Pink Glitter', hex: '#FFD1DC', brand: 'Zoya', productName: 'Ginni', finish: 'glitter' }
    ],
    recommendedFinishes: ['Cream', 'Soft shimmer', 'Satin', 'Brushed metallic'],
    nailArtTips: [
      { pattern: 'Soft French', description: 'French manicure with dusty rose tips instead of white', difficulty: 'easy' },
      { pattern: 'Watercolor Wash', description: 'Soft, blended watercolor effect in muted pastels', difficulty: 'advanced' },
      { pattern: 'Subtle Shimmer Accent', description: 'One shimmer accent nail with matte colors on others', difficulty: 'easy' },
      { pattern: 'Delicate Lace', description: 'Soft lace pattern stamping in complementary muted tones', difficulty: 'medium' }
    ],
    generalTips: [
      'Soft, muted colors are your signature',
      'Avoid anything too bright or too dark',
      'Dusty rose is your power color',
      'Brushed silver works better than bright silver',
      'Keep finishes soft - avoid high-shine glitter'
    ]
  },

  'water-air': {
    everydayNeutrals: [
      { name: 'Soft Pink', hex: '#F4C2C2', brand: 'Essie', productName: 'Sugar Daddy', finish: 'cream' },
      { name: 'Light Lavender', hex: '#E6E6FA', brand: 'Zoya', productName: 'Miley', finish: 'cream' },
      { name: 'Sheer Nude', hex: '#FFE4E1', brand: 'OPI', productName: 'Bubble Bath', finish: 'cream' },
      { name: 'Dove Gray', hex: '#B0B0B0', brand: 'Essie', productName: 'Cocktail Bling', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Sky Blue', hex: '#87CEEB', brand: 'OPI', productName: 'Can\'t Find My Czechbook', finish: 'cream' },
      { name: 'Soft Coral', hex: '#E8B4B8', brand: 'Zoya', productName: 'Joey', finish: 'cream' },
      { name: 'Powder Blue', hex: '#B0E0E6', brand: 'Essie', productName: 'Saltwater Happy', finish: 'cream' },
      { name: 'Soft Mint', hex: '#98D8C8', brand: 'OPI', productName: 'Gelato on My Mind', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Blush', hex: '#FFB6C1', brand: 'Zoya', productName: 'Dot', finish: 'cream' },
      { name: 'Soft Peach', hex: '#FFDAB9', brand: 'Essie', productName: 'A Crewed Interest', finish: 'cream' },
      { name: 'Light Mauve', hex: '#D8C4C4', brand: 'OPI', productName: 'Don\'t Bossa Nova Me Around', finish: 'cream' },
      { name: 'Baby Blue', hex: '#89CFF0', brand: 'Zoya', productName: 'Blu', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Opalescent', hex: '#F0F0F0', brand: 'Essie', productName: 'Marshmallow', finish: 'shimmer' },
      { name: 'Soft Pink Shimmer', hex: '#FFD1DC', brand: 'Zoya', productName: 'Leia', finish: 'shimmer' },
      { name: 'Pearl White', hex: '#FFFAFA', brand: 'OPI', productName: 'Funny Bunny', finish: 'shimmer' },
      { name: 'Light Blue Shimmer', hex: '#B0E0E6', brand: 'Zoya', productName: 'Rayne', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Sheer cream', 'Jelly', 'Soft shimmer', 'Opalescent'],
    nailArtTips: [
      { pattern: 'Sheer Jelly', description: 'Layer sheer jelly polishes for a glass-like effect', difficulty: 'easy' },
      { pattern: 'Soft Cloud Nails', description: 'White cloud designs on soft blue base', difficulty: 'medium' },
      { pattern: 'Pearl Accents', description: 'Add small pearl embellishments on sheer pink base', difficulty: 'easy' },
      { pattern: 'Ethereal Gradient', description: 'Soft gradient from pink to lavender to blue', difficulty: 'advanced' }
    ],
    generalTips: [
      'Light, delicate colors suit your ethereal quality',
      'Sheer and jelly finishes are particularly flattering',
      'Avoid anything too dark or too saturated',
      'Soft pink and sky blue are your signature colors',
      'Less is more - keep your nails light and fresh'
    ]
  },

  'water-earth': {
    everydayNeutrals: [
      { name: 'Mushroom', hex: '#A4978E', brand: 'Essie', productName: 'Chinchilly', finish: 'cream' },
      { name: 'Dusty Rose', hex: '#D8B4B4', brand: 'Zoya', productName: 'Rue', finish: 'cream' },
      { name: 'Greige', hex: '#B8B0A8', brand: 'OPI', productName: 'Taupe-less Beach', finish: 'cream' },
      { name: 'Soft Mauve', hex: '#C4A4B4', brand: 'Essie', productName: 'Ladylike', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Sage', hex: '#9CAF88', brand: 'OPI', productName: 'Suzi - The First Lady of Nails', finish: 'cream' },
      { name: 'Dusty Blue', hex: '#8BA8B7', brand: 'Zoya', productName: 'Skylar', finish: 'cream' },
      { name: 'Muted Olive', hex: '#8B8B6B', brand: 'Essie', productName: 'Sew Psyched', finish: 'cream' },
      { name: 'Soft Plum', hex: '#A4879C', brand: 'OPI', productName: 'Parlez-vous OPI?', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Dusty Pink', hex: '#D4A5A5', brand: 'Zoya', productName: 'Addison', finish: 'cream' },
      { name: 'Soft Terracotta', hex: '#C4847C', brand: 'Essie', productName: 'Eternal Optimist', finish: 'cream' },
      { name: 'Muted Teal', hex: '#5F9EA0', brand: 'OPI', productName: 'Alpaca My Bags', finish: 'cream' },
      { name: 'Dusty Coral', hex: '#C4948C', brand: 'Zoya', productName: 'Madeline', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Pewter Shimmer', hex: '#8A8D8F', brand: 'Essie', productName: 'For the Twill of It', finish: 'shimmer' },
      { name: 'Dusty Rose Shimmer', hex: '#D8B4B4', brand: 'Zoya', productName: 'Hermina', finish: 'shimmer' },
      { name: 'Soft Taupe Shimmer', hex: '#B8B0A8', brand: 'OPI', productName: 'Icelanded a Bottle of OPI', finish: 'shimmer' },
      { name: 'Muted Mauve Glitter', hex: '#C4A4B4', brand: 'Zoya', productName: 'Lux', finish: 'glitter' }
    ],
    recommendedFinishes: ['Cream', 'Satin', 'Soft shimmer', 'Matte'],
    nailArtTips: [
      { pattern: 'Matte French', description: 'French manicure with matte top coat for a modern look', difficulty: 'easy' },
      { pattern: 'Subtle Marble', description: 'Soft marble effect in greige and dusty rose', difficulty: 'advanced' },
      { pattern: 'Tone-on-Tone', description: 'Different muted shades on each nail in the same color family', difficulty: 'easy' },
      { pattern: 'Negative Space', description: 'Geometric negative space designs with muted colors', difficulty: 'medium' }
    ],
    generalTips: [
      'Muted, dusty colors are your signature',
      'Greige and mushroom tones are uniquely flattering',
      'Avoid bright, saturated colors',
      'Matte finishes can look very sophisticated on you',
      'Soft metallics like pewter work better than bright silver'
    ]
  },

  'water-fire': {
    everydayNeutrals: [
      { name: 'Rose Pink', hex: '#E8A4B8', brand: 'Essie', productName: 'Eternal Optimist', finish: 'cream' },
      { name: 'Soft Mauve', hex: '#C4A4B4', brand: 'Zoya', productName: 'Brigitte', finish: 'cream' },
      { name: 'Cool Nude', hex: '#D4C4C4', brand: 'OPI', productName: 'Put It in Neutral', finish: 'cream' },
      { name: 'Slate', hex: '#708090', brand: 'Essie', productName: 'Petal Pushers', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Cool Blue', hex: '#6495ED', brand: 'OPI', productName: 'Rich Girls & Po-Boys', finish: 'cream' },
      { name: 'Raspberry', hex: '#C4647C', brand: 'Zoya', productName: 'Dana', finish: 'cream' },
      { name: 'Orchid', hex: '#DA70D6', brand: 'Essie', productName: 'Play Date', finish: 'cream' },
      { name: 'Teal', hex: '#4A8B8B', brand: 'OPI', productName: 'Is That a Spear in Your Pocket?', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Wisteria', hex: '#C9A0DC', brand: 'Zoya', productName: 'Leslie', finish: 'cream' },
      { name: 'Rose', hex: '#FF007F', brand: 'Essie', productName: 'Watermelon', finish: 'cream' },
      { name: 'Cool Berry', hex: '#8E4585', brand: 'OPI', productName: 'Do You Lilac It?', finish: 'cream' },
      { name: 'Periwinkle', hex: '#8E8EFF', brand: 'Zoya', productName: 'Aster', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Silver Shimmer', hex: '#C0C0C0', brand: 'Essie', productName: 'Beyond Cozy', finish: 'shimmer' },
      { name: 'Rose Shimmer', hex: '#E8A4B8', brand: 'Zoya', productName: 'Zara', finish: 'shimmer' },
      { name: 'Orchid Glitter', hex: '#DA70D6', brand: 'OPI', productName: 'Pompeii Purple', finish: 'glitter' },
      { name: 'Blue Shimmer', hex: '#6495ED', brand: 'Zoya', productName: 'Dream', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Shimmer', 'Silver metallic', 'Satin'],
    nailArtTips: [
      { pattern: 'Cool Ombré', description: 'Gradient from rose pink to orchid purple', difficulty: 'medium' },
      { pattern: 'Silver Accent Line', description: 'Thin silver line at the base or tip of each nail', difficulty: 'easy' },
      { pattern: 'Floral Stamping', description: 'Delicate floral stamps in complementary cool tones', difficulty: 'medium' },
      { pattern: 'Geometric Cool Tones', description: 'Angular designs in rose, blue, and silver', difficulty: 'advanced' }
    ],
    generalTips: [
      'You can wear slightly brighter colors than other Summers',
      'Cool pinks and berries are particularly flattering',
      'Silver metallics work well for you',
      'You can handle more contrast than other Water types',
      'Rose and orchid tones are your signature colors'
    ]
  },

  // EARTH SUBTYPES (Autumn)
  'earth-earth': {
    everydayNeutrals: [
      { name: 'Camel', hex: '#C19A6B', brand: 'Essie', productName: 'Picked Perfect', finish: 'cream' },
      { name: 'Warm Taupe', hex: '#8B7355', brand: 'Zoya', productName: 'Flynn', finish: 'cream' },
      { name: 'Nude Beige', hex: '#D4B896', brand: 'OPI', productName: 'Samoan Sand', finish: 'cream' },
      { name: 'Mushroom Brown', hex: '#A4978E', brand: 'Essie', productName: 'Mochacino', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Terracotta', hex: '#CC4E3E', brand: 'OPI', productName: 'It\'s a Piazza Cake', finish: 'cream' },
      { name: 'Olive', hex: '#808000', brand: 'Zoya', productName: 'Arbor', finish: 'cream' },
      { name: 'Rust', hex: '#B7410E', brand: 'Essie', productName: 'Playing Koi', finish: 'cream' },
      { name: 'Mustard', hex: '#FFDB58', brand: 'OPI', productName: 'Sun, Sea, and Sand in My Pants', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Pumpkin', hex: '#FF7518', brand: 'Zoya', productName: 'Thandie', finish: 'cream' },
      { name: 'Moss', hex: '#4A5D23', brand: 'Essie', productName: 'Sew Psyched', finish: 'cream' },
      { name: 'Copper', hex: '#B87333', brand: 'OPI', productName: 'Bronzed to Perfection', finish: 'metallic' },
      { name: 'Warm Coral', hex: '#FF6F61', brand: 'Zoya', productName: 'Maya', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Gold Shimmer', hex: '#FFD700', brand: 'Essie', productName: 'Good as Gold', finish: 'shimmer' },
      { name: 'Bronze Glitter', hex: '#CD7F32', brand: 'Zoya', productName: 'Maria-Luisa', finish: 'glitter' },
      { name: 'Copper Metallic', hex: '#B87333', brand: 'OPI', productName: 'Copper Mountain', finish: 'metallic' },
      { name: 'Amber Shimmer', hex: '#FFBF00', brand: 'Zoya', productName: 'Goldie', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Gold metallic', 'Shimmer', 'Satin'],
    nailArtTips: [
      { pattern: 'Autumn Leaves', description: 'Leaf designs in terracotta, gold, and olive', difficulty: 'advanced' },
      { pattern: 'Gold Foil Accents', description: 'Gold foil strips or flakes on warm nude base', difficulty: 'medium' },
      { pattern: 'Warm Ombré', description: 'Gradient from mustard to rust to terracotta', difficulty: 'medium' },
      { pattern: 'Tortoiseshell', description: 'Classic tortoiseshell pattern in warm browns and gold', difficulty: 'advanced' }
    ],
    generalTips: [
      'Warm, earthy colors are your signature',
      'Gold and bronze metallics are essential',
      'Terracotta is your power color',
      'Avoid cool pinks and blue-based colors',
      'Brown mascara often looks more natural than black'
    ]
  },

  'earth-fire': {
    everydayNeutrals: [
      { name: 'Warm Brown', hex: '#8B4513', brand: 'Essie', productName: 'Mochacino', finish: 'cream' },
      { name: 'Bronze Nude', hex: '#A4846C', brand: 'Zoya', productName: 'Spencer', finish: 'cream' },
      { name: 'Deep Taupe', hex: '#6B5B4F', brand: 'OPI', productName: 'You Don\'t Know Jacques!', finish: 'cream' },
      { name: 'Espresso', hex: '#3C1414', brand: 'Essie', productName: 'Little Brown Dress', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Burgundy', hex: '#722F37', brand: 'OPI', productName: 'Malaga Wine', finish: 'cream' },
      { name: 'Forest Green', hex: '#228B22', brand: 'Zoya', productName: 'Hunter', finish: 'cream' },
      { name: 'Oxblood', hex: '#4A0000', brand: 'Essie', productName: 'Wicked', finish: 'cream' },
      { name: 'Deep Plum', hex: '#4A0E4E', brand: 'OPI', productName: 'Lincoln Park After Dark', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Mahogany', hex: '#4E0707', brand: 'Zoya', productName: 'Elisa', finish: 'cream' },
      { name: 'Bronze', hex: '#CD7F32', brand: 'Essie', productName: 'Penny Talk', finish: 'metallic' },
      { name: 'Deep Berry', hex: '#8B0000', brand: 'OPI', productName: 'Bogota Blackberry', finish: 'cream' },
      { name: 'Olive', hex: '#556B2F', brand: 'Zoya', productName: 'Arbor', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Antique Gold', hex: '#CFB53B', brand: 'Essie', productName: 'Leggy Legend', finish: 'metallic' },
      { name: 'Burgundy Shimmer', hex: '#722F37', brand: 'Zoya', productName: 'India', finish: 'shimmer' },
      { name: 'Bronze Glitter', hex: '#CD7F32', brand: 'OPI', productName: 'Bring on the Bling', finish: 'glitter' },
      { name: 'Deep Green Shimmer', hex: '#228B22', brand: 'Zoya', productName: 'Veruschka', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Antique metallic', 'Shimmer', 'Satin'],
    nailArtTips: [
      { pattern: 'Dark Ombré', description: 'Gradient from burgundy to black for drama', difficulty: 'medium' },
      { pattern: 'Antique Gold Accents', description: 'Gold foil or striping on dark base colors', difficulty: 'easy' },
      { pattern: 'Jewel Tone Mix', description: 'Different jewel tones on each nail - burgundy, emerald, plum', difficulty: 'easy' },
      { pattern: 'Velvet Matte', description: 'Matte top coat on deep colors for a velvet effect', difficulty: 'easy' }
    ],
    generalTips: [
      'Deep, rich colors are your strength',
      'You can wear darker shades than other Autumns',
      'Antique gold and bronze metallics are perfect',
      'Burgundy is your signature color',
      'Avoid pastels and very bright colors'
    ]
  },

  'earth-water': {
    everydayNeutrals: [
      { name: 'Dusty Rose', hex: '#C4A4A4', brand: 'Essie', productName: 'Ladylike', finish: 'cream' },
      { name: 'Mushroom', hex: '#A4978E', brand: 'Zoya', productName: 'Normani', finish: 'cream' },
      { name: 'Soft Terracotta', hex: '#C4847C', brand: 'OPI', productName: 'Barefoot in Barcelona', finish: 'cream' },
      { name: 'Greige', hex: '#B8B0A8', brand: 'Essie', productName: 'Chinchilly', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Sage', hex: '#9CAF88', brand: 'OPI', productName: 'Suzi - The First Lady of Nails', finish: 'cream' },
      { name: 'Dusty Coral', hex: '#C4948C', brand: 'Zoya', productName: 'Madeline', finish: 'cream' },
      { name: 'Muted Olive', hex: '#8B8B6B', brand: 'Essie', productName: 'Sew Psyched', finish: 'cream' },
      { name: 'Soft Rust', hex: '#B4847C', brand: 'OPI', productName: 'Chocolate Moose', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Dusty Pink', hex: '#D8B4B4', brand: 'Zoya', productName: 'Rue', finish: 'cream' },
      { name: 'Muted Teal', hex: '#5F9EA0', brand: 'Essie', productName: 'Greenport', finish: 'cream' },
      { name: 'Soft Mauve', hex: '#C4A4B4', brand: 'OPI', productName: 'Tickle My France-y', finish: 'cream' },
      { name: 'Dusty Peach', hex: '#C4A494', brand: 'Zoya', productName: 'Cathy', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Soft Gold Shimmer', hex: '#D4AF37', brand: 'Essie', productName: 'Good as Gold', finish: 'shimmer' },
      { name: 'Dusty Rose Shimmer', hex: '#C4A4A4', brand: 'Zoya', productName: 'Hermina', finish: 'shimmer' },
      { name: 'Pewter', hex: '#8A8D8F', brand: 'OPI', productName: 'Lucerne-tainly Look Marvelous', finish: 'metallic' },
      { name: 'Soft Mauve Glitter', hex: '#C4A4B4', brand: 'Zoya', productName: 'Lux', finish: 'glitter' }
    ],
    recommendedFinishes: ['Cream', 'Satin', 'Soft shimmer', 'Matte'],
    nailArtTips: [
      { pattern: 'Muted Marble', description: 'Soft marble effect in greige and dusty rose', difficulty: 'advanced' },
      { pattern: 'Tone-on-Tone', description: 'Different muted shades on each nail', difficulty: 'easy' },
      { pattern: 'Soft Metallic Tips', description: 'Brushed gold or pewter tips on nude base', difficulty: 'easy' },
      { pattern: 'Negative Space Geometric', description: 'Geometric shapes with bare nail showing through', difficulty: 'medium' }
    ],
    generalTips: [
      'Muted, dusty colors are your signature',
      'Avoid anything too bright or too saturated',
      'Soft metallics like brushed gold work best',
      'Mushroom and greige tones are uniquely flattering',
      'Matte finishes can look very sophisticated on you'
    ]
  },

  'earth-air': {
    everydayNeutrals: [
      { name: 'Warm Nude', hex: '#D4B896', brand: 'Essie', productName: 'Sand Tropez', finish: 'cream' },
      { name: 'Golden Beige', hex: '#C4A888', brand: 'Zoya', productName: 'Spencer', finish: 'cream' },
      { name: 'Camel', hex: '#C19A6B', brand: 'OPI', productName: 'Samoan Sand', finish: 'cream' },
      { name: 'Soft Peach', hex: '#FFCBA4', brand: 'Essie', productName: 'A Crewed Interest', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Warm Coral', hex: '#FF6F61', brand: 'OPI', productName: 'Toucan Do It If You Try', finish: 'cream' },
      { name: 'Golden Yellow', hex: '#FFD700', brand: 'Zoya', productName: 'Darcy', finish: 'cream' },
      { name: 'Tangerine', hex: '#FF9966', brand: 'Essie', productName: 'Tart Deco', finish: 'cream' },
      { name: 'Warm Green', hex: '#9ACD32', brand: 'OPI', productName: 'I\'m Sooo Swamped!', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Amber', hex: '#FFBF00', brand: 'Zoya', productName: 'Goldie', finish: 'cream' },
      { name: 'Salmon', hex: '#FA8072', brand: 'Essie', productName: 'Peach Side Babe', finish: 'cream' },
      { name: 'Golden Peach', hex: '#FFDAB9', brand: 'OPI', productName: 'Crawfishin\' for a Compliment', finish: 'cream' },
      { name: 'Warm Lime', hex: '#C5E17A', brand: 'Zoya', productName: 'Tilda', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Gold Shimmer', hex: '#FFD700', brand: 'Essie', productName: 'Good as Gold', finish: 'shimmer' },
      { name: 'Coral Shimmer', hex: '#FF6F61', brand: 'Zoya', productName: 'Tinsley', finish: 'shimmer' },
      { name: 'Champagne Glitter', hex: '#F7E7CE', brand: 'OPI', productName: 'Glitzerland', finish: 'glitter' },
      { name: 'Peach Shimmer', hex: '#FFCBA4', brand: 'Zoya', productName: 'Meadow', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Gold metallic', 'Shimmer', 'Dewy'],
    nailArtTips: [
      { pattern: 'Sunny Ombré', description: 'Gradient from golden yellow to coral', difficulty: 'medium' },
      { pattern: 'Gold Foil Accents', description: 'Gold foil on warm nude or coral base', difficulty: 'easy' },
      { pattern: 'Citrus Art', description: 'Lemon or orange slice designs on warm base', difficulty: 'advanced' },
      { pattern: 'Warm French', description: 'French tips in gold or coral instead of white', difficulty: 'easy' }
    ],
    generalTips: [
      'Warm, bright colors are your strength',
      'Gold metallics are essential for you',
      'Coral and peach tones are particularly flattering',
      'Avoid cool colors and very muted tones',
      'Your nails should look sunny and radiant'
    ]
  },

  // AIR SUBTYPES (Spring)
  'air-air': {
    everydayNeutrals: [
      { name: 'Warm Nude', hex: '#D4C4A8', brand: 'Essie', productName: 'Sand Tropez', finish: 'cream' },
      { name: 'Soft Peach', hex: '#FFCBA4', brand: 'Zoya', productName: 'Laurie', finish: 'cream' },
      { name: 'Light Camel', hex: '#C19A6B', brand: 'OPI', productName: 'Samoan Sand', finish: 'cream' },
      { name: 'Warm Pink', hex: '#FFB6C1', brand: 'Essie', productName: 'Fiji', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Coral', hex: '#FF7F50', brand: 'OPI', productName: 'Toucan Do It If You Try', finish: 'cream' },
      { name: 'Warm Yellow', hex: '#FFE135', brand: 'Zoya', productName: 'Darcy', finish: 'cream' },
      { name: 'Apple Green', hex: '#8DB600', brand: 'Essie', productName: 'Mojito Madness', finish: 'cream' },
      { name: 'Turquoise', hex: '#40E0D0', brand: 'OPI', productName: 'Can\'t Find My Czechbook', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Peach', hex: '#FFCBA4', brand: 'Zoya', productName: 'Cole', finish: 'cream' },
      { name: 'Tangerine', hex: '#FF9966', brand: 'Essie', productName: 'Tart Deco', finish: 'cream' },
      { name: 'Warm Pink', hex: '#FF6B6B', brand: 'OPI', productName: 'Cajun Shrimp', finish: 'cream' },
      { name: 'Apricot', hex: '#FBCEB1', brand: 'Zoya', productName: 'Tulip', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Gold Shimmer', hex: '#FFD700', brand: 'Essie', productName: 'Good as Gold', finish: 'shimmer' },
      { name: 'Coral Shimmer', hex: '#FF7F50', brand: 'Zoya', productName: 'Tinsley', finish: 'shimmer' },
      { name: 'Rose Gold', hex: '#B76E79', brand: 'OPI', productName: 'Cozu-Melted in the Sun', finish: 'shimmer' },
      { name: 'Peach Glitter', hex: '#FFCBA4', brand: 'Zoya', productName: 'Bar', finish: 'glitter' }
    ],
    recommendedFinishes: ['Cream', 'Gold/rose gold metallic', 'Shimmer', 'Dewy'],
    nailArtTips: [
      { pattern: 'Coral French', description: 'French tips in coral instead of white', difficulty: 'easy' },
      { pattern: 'Tropical Florals', description: 'Bright tropical flower designs on warm base', difficulty: 'advanced' },
      { pattern: 'Gold Accents', description: 'Gold striping tape or foil on coral or peach', difficulty: 'easy' },
      { pattern: 'Warm Gradient', description: 'Ombré from peach to coral to warm pink', difficulty: 'medium' }
    ],
    generalTips: [
      'Warm, clear colors are your signature',
      'Coral is your power color',
      'Gold and rose gold metallics are perfect',
      'Avoid muted, dusty colors',
      'Keep your nails fresh and light'
    ]
  },

  'air-water': {
    everydayNeutrals: [
      { name: 'Soft Peach', hex: '#FFDAB9', brand: 'Essie', productName: 'A Crewed Interest', finish: 'cream' },
      { name: 'Light Coral', hex: '#F08080', brand: 'Zoya', productName: 'Joey', finish: 'cream' },
      { name: 'Blush Pink', hex: '#FFB6C1', brand: 'OPI', productName: 'Bubble Bath', finish: 'cream' },
      { name: 'Cream', hex: '#FFFDD0', brand: 'Essie', productName: 'Marshmallow', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Soft Coral', hex: '#E8B4B8', brand: 'OPI', productName: 'Suzi Shops & Island Hops', finish: 'cream' },
      { name: 'Mint', hex: '#98FB98', brand: 'Zoya', productName: 'Neely', finish: 'cream' },
      { name: 'Soft Yellow', hex: '#FFFACD', brand: 'Essie', productName: 'Chillato', finish: 'cream' },
      { name: 'Light Turquoise', hex: '#AFEEEE', brand: 'OPI', productName: 'Gelato on My Mind', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Apricot', hex: '#FBCEB1', brand: 'Zoya', productName: 'Tulip', finish: 'cream' },
      { name: 'Blush', hex: '#FFD1DC', brand: 'Essie', productName: 'Sugar Daddy', finish: 'cream' },
      { name: 'Soft Peach', hex: '#FFDAB9', brand: 'OPI', productName: 'Crawfishin\' for a Compliment', finish: 'cream' },
      { name: 'Light Pink', hex: '#FFB6C1', brand: 'Zoya', productName: 'Dot', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Opalescent', hex: '#F0F0F0', brand: 'Essie', productName: 'Marshmallow', finish: 'shimmer' },
      { name: 'Soft Pink Shimmer', hex: '#FFD1DC', brand: 'Zoya', productName: 'Leia', finish: 'shimmer' },
      { name: 'Pearl', hex: '#FFFAFA', brand: 'OPI', productName: 'Funny Bunny', finish: 'shimmer' },
      { name: 'Champagne', hex: '#F7E7CE', brand: 'Zoya', productName: 'Godiva', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Sheer cream', 'Jelly', 'Soft shimmer', 'Opalescent'],
    nailArtTips: [
      { pattern: 'Sheer Jelly Layers', description: 'Layer sheer jelly polishes for glass-like effect', difficulty: 'easy' },
      { pattern: 'Soft Florals', description: 'Delicate flower designs in soft peach and pink', difficulty: 'advanced' },
      { pattern: 'Pearl Accents', description: 'Small pearl embellishments on sheer pink base', difficulty: 'easy' },
      { pattern: 'Soft Gradient', description: 'Gentle ombré from cream to soft peach', difficulty: 'medium' }
    ],
    generalTips: [
      'Light, delicate warm colors suit you best',
      'Sheer and jelly finishes are particularly flattering',
      'Avoid anything too dark or too saturated',
      'Soft peach and blush pink are your signature colors',
      'Less is more - keep your nails light and fresh'
    ]
  },

  'air-fire': {
    everydayNeutrals: [
      { name: 'Warm Nude', hex: '#D4B896', brand: 'Essie', productName: 'Sand Tropez', finish: 'cream' },
      { name: 'Soft Coral', hex: '#FF6B6B', brand: 'Zoya', productName: 'Maya', finish: 'cream' },
      { name: 'Warm Pink', hex: '#FF69B4', brand: 'OPI', productName: 'Shorts Story', finish: 'cream' },
      { name: 'Peach', hex: '#FFCBA4', brand: 'Essie', productName: 'A Crewed Interest', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Hot Coral', hex: '#FF6B6B', brand: 'OPI', productName: 'Cajun Shrimp', finish: 'cream' },
      { name: 'Vivid Orange', hex: '#FF6600', brand: 'Zoya', productName: 'Thandie', finish: 'cream' },
      { name: 'Hot Pink', hex: '#FF69B4', brand: 'Essie', productName: 'Mod Square', finish: 'cream' },
      { name: 'Bright Turquoise', hex: '#00CED1', brand: 'OPI', productName: 'Can\'t Find My Czechbook', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Electric Yellow', hex: '#FFFF00', brand: 'Zoya', productName: 'Darcy', finish: 'cream' },
      { name: 'Bright Red', hex: '#FF0000', brand: 'Essie', productName: 'Geranium', finish: 'cream' },
      { name: 'Tangerine', hex: '#FF9966', brand: 'OPI', productName: 'Toucan Do It If You Try', finish: 'cream' },
      { name: 'Bright Green', hex: '#00FF00', brand: 'Zoya', productName: 'Tilda', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Gold Glitter', hex: '#FFD700', brand: 'Essie', productName: 'Summit of Style', finish: 'glitter' },
      { name: 'Coral Shimmer', hex: '#FF6B6B', brand: 'Zoya', productName: 'Tinsley', finish: 'shimmer' },
      { name: 'Holographic', hex: '#E8E8E8', brand: 'OPI', productName: 'DS Extravagance', finish: 'glitter' },
      { name: 'Orange Shimmer', hex: '#FF6600', brand: 'Zoya', productName: 'Amy', finish: 'shimmer' }
    ],
    recommendedFinishes: ['High-shine cream', 'Gold metallic', 'Glitter', 'Holographic'],
    nailArtTips: [
      { pattern: 'Neon Tips', description: 'French tips in neon coral or orange', difficulty: 'easy' },
      { pattern: 'Color Block', description: 'Bold geometric color blocking with bright colors', difficulty: 'medium' },
      { pattern: 'Tropical Art', description: 'Bright tropical designs - flamingos, palm trees', difficulty: 'advanced' },
      { pattern: 'Glitter Gradient', description: 'Gold glitter gradient on bright base color', difficulty: 'medium' }
    ],
    generalTips: [
      'Bright, saturated warm colors are your playground',
      'You can wear neon shades beautifully',
      'Gold and bright metallics enhance your vibrancy',
      'Avoid muted, dusty colors',
      'Your nails should look energetic and vibrant'
    ]
  },

  'air-earth': {
    everydayNeutrals: [
      { name: 'Warm Nude', hex: '#D4C4A8', brand: 'Essie', productName: 'Sand Tropez', finish: 'cream' },
      { name: 'Golden Beige', hex: '#C4A888', brand: 'Zoya', productName: 'Spencer', finish: 'cream' },
      { name: 'Caramel', hex: '#FFD59A', brand: 'OPI', productName: 'Samoan Sand', finish: 'cream' },
      { name: 'Soft Peach', hex: '#FFDAB9', brand: 'Essie', productName: 'A Crewed Interest', finish: 'cream' }
    ],
    boldStatement: [
      { name: 'Warm Coral', hex: '#FF6F61', brand: 'OPI', productName: 'Toucan Do It If You Try', finish: 'cream' },
      { name: 'Golden Yellow', hex: '#FFD700', brand: 'Zoya', productName: 'Darcy', finish: 'cream' },
      { name: 'Salmon', hex: '#FA8072', brand: 'Essie', productName: 'Peach Side Babe', finish: 'cream' },
      { name: 'Amber', hex: '#FFBF00', brand: 'OPI', productName: 'Sun, Sea, and Sand in My Pants', finish: 'cream' }
    ],
    seasonalPicks: [
      { name: 'Golden Peach', hex: '#FFDAB9', brand: 'Zoya', productName: 'Cole', finish: 'cream' },
      { name: 'Mango', hex: '#FF8243', brand: 'Essie', productName: 'Tart Deco', finish: 'cream' },
      { name: 'Warm Green', hex: '#9ACD32', brand: 'OPI', productName: 'I\'m Sooo Swamped!', finish: 'cream' },
      { name: 'Apricot', hex: '#FBCEB1', brand: 'Zoya', productName: 'Tulip', finish: 'cream' }
    ],
    specialOccasion: [
      { name: 'Gold Shimmer', hex: '#FFD700', brand: 'Essie', productName: 'Good as Gold', finish: 'shimmer' },
      { name: 'Coral Shimmer', hex: '#FF6F61', brand: 'Zoya', productName: 'Tinsley', finish: 'shimmer' },
      { name: 'Champagne Glitter', hex: '#F7E7CE', brand: 'OPI', productName: 'Glitzerland', finish: 'glitter' },
      { name: 'Amber Shimmer', hex: '#FFBF00', brand: 'Zoya', productName: 'Goldie', finish: 'shimmer' }
    ],
    recommendedFinishes: ['Cream', 'Gold metallic', 'Shimmer', 'Satin'],
    nailArtTips: [
      { pattern: 'Golden Ombré', description: 'Gradient from peach to gold to amber', difficulty: 'medium' },
      { pattern: 'Gold Foil Art', description: 'Gold foil accents on warm coral or peach base', difficulty: 'easy' },
      { pattern: 'Warm French', description: 'French tips in gold or coral', difficulty: 'easy' },
      { pattern: 'Sunflower Art', description: 'Sunflower designs on warm nude base', difficulty: 'advanced' }
    ],
    generalTips: [
      'Warm, golden colors are your strength',
      'Gold metallics are essential for you',
      'Coral and peach tones are particularly flattering',
      'Avoid cool colors and very muted tones',
      'Your nails should look warm and radiant'
    ]
  }
};

// Helper function to get nail palette for a subtype
export const getNailPalette = (subtypeId: string): NailPalette | undefined => {
  return nailPalettes[subtypeId];
};
