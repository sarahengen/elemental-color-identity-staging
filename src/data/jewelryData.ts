// Jewelry and Accessories Data for Elemental Types

export interface MetalRecommendation {
  name: string;
  hex: string;
  rating: 'best' | 'good' | 'avoid';
  reason: string;
}

export interface GemstoneRecommendation {
  name: string;
  hex: string;
  description: string;
  occasion?: string;
}

export interface JewelryStyle {
  name: string;
  description: string;
  examples: string[];
}

export interface AccessoryColor {
  name: string;
  hex: string;
  items: string[];
}

export interface JewelryGuide {
  overview: string;
  undertoneExplanation: string;
  metals: MetalRecommendation[];
  gemstones: GemstoneRecommendation[];
  styles: JewelryStyle[];
  accessoryColors: AccessoryColor[];
  watchRecommendations: string[];
  eyewearColors: string[];
  bagColors: string[];
  scarfColors: string[];
  tips: string[];
  avoidList: string[];
}

export interface ElementJewelryData {
  elementId: string;
  elementName: string;
  season: string;
  image: string;
  undertoneType: 'cool' | 'warm' | 'neutral';
  generalDescription: string;
  metalTheory: string;
  subtypes: {
    subtypeId: string;
    subtypeName: string;
    jewelry: JewelryGuide;
  }[];
}

export const elementalJewelryData: ElementJewelryData[] = [
  {
    elementId: 'fire',
    elementName: 'Fire',
    season: 'Winter',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766035982841_c0f85e29.png',
    undertoneType: 'cool',
    generalDescription: 'Fire types (Winter) have cool undertones that are beautifully complemented by silver, white gold, and platinum. These cool metals create harmony with your striking, high-contrast coloring.',
    metalTheory: 'Cool undertones contain blue and pink pigments in the skin. Silver and white metals reflect these same cool tones, creating a harmonious glow. Gold can appear too yellow and clash with cool skin, making it look sallow.',
    subtypes: [
      {
        subtypeId: 'fire-fire',
        subtypeName: 'Pure Fire (True Winter)',
        jewelry: {
          overview: 'Your dramatic, high-contrast coloring calls for equally bold jewelry. Silver, platinum, and white gold enhance your striking features, while clear, brilliant gemstones mirror your clarity.',
          undertoneExplanation: 'As a True Winter, you have the coolest and clearest undertones. Your skin has blue-pink undertones that harmonize beautifully with cool metals. Warm metals like yellow gold can make your skin appear sallow or dull.',
          metals: [
            { name: 'Platinum', hex: '#E5E4E2', rating: 'best', reason: 'The ultimate cool metal that enhances your dramatic clarity' },
            { name: 'White Gold', hex: '#F5F5F5', rating: 'best', reason: 'Bright and clear, perfect for your high-contrast coloring' },
            { name: 'Sterling Silver', hex: '#C0C0C0', rating: 'best', reason: 'Classic cool metal that complements your cool undertones' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'good', reason: 'The pink tones can work as they\'re cool-leaning' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too warm for your cool undertones, can look jarring' }
          ],
          gemstones: [
            { name: 'Diamond', hex: '#B9F2FF', description: 'The ultimate True Winter stone - clear, brilliant, and dramatic', occasion: 'All occasions' },
            { name: 'Sapphire', hex: '#0F52BA', description: 'Deep royal blue mirrors your Winter palette perfectly', occasion: 'Evening & formal' },
            { name: 'Emerald', hex: '#046307', description: 'Rich, clear green that complements your dramatic coloring', occasion: 'Special occasions' },
            { name: 'Ruby', hex: '#E0115F', description: 'True red with cool undertones, stunning against your skin', occasion: 'Statement pieces' },
            { name: 'Amethyst', hex: '#9966CC', description: 'Cool purple that enhances your Winter palette', occasion: 'Everyday elegance' },
            { name: 'Black Onyx', hex: '#353839', description: 'Dramatic and bold, perfect for your high-contrast look', occasion: 'Modern statements' },
            { name: 'White Pearl', hex: '#FDEEF4', description: 'Classic and elegant, with cool overtones', occasion: 'Timeless elegance' }
          ],
          styles: [
            { name: 'Statement Pieces', description: 'Bold, dramatic jewelry that commands attention', examples: ['Large cocktail rings', 'Chandelier earrings', 'Chunky cuffs', 'Dramatic pendants'] },
            { name: 'Geometric Designs', description: 'Clean, angular shapes that echo your clarity', examples: ['Art deco pieces', 'Angular earrings', 'Structured bangles', 'Modern geometric necklaces'] },
            { name: 'High-Contrast Combinations', description: 'Black and white or silver and onyx pairings', examples: ['Onyx and diamond', 'Black pearl with silver', 'Crystal and jet'] }
          ],
          accessoryColors: [
            { name: 'Pure Black', hex: '#000000', items: ['Handbags', 'Belts', 'Shoes', 'Gloves'] },
            { name: 'Bright White', hex: '#FFFFFF', items: ['Scarves', 'Hats', 'Summer bags'] },
            { name: 'True Red', hex: '#C41E3A', items: ['Statement bags', 'Shoes', 'Scarves'] },
            { name: 'Royal Blue', hex: '#4169E1', items: ['Bags', 'Scarves', 'Hair accessories'] },
            { name: 'Silver', hex: '#C0C0C0', items: ['Metallic bags', 'Belts', 'Shoes'] }
          ],
          watchRecommendations: ['Silver or platinum watches', 'White dial faces', 'Black leather straps', 'Diamond bezels'],
          eyewearColors: ['Black frames', 'Silver metal frames', 'Clear crystal', 'Deep navy'],
          bagColors: ['Black leather', 'White leather', 'Silver metallic', 'True red'],
          scarfColors: ['Black and white prints', 'Royal blue', 'Emerald green', 'Hot pink'],
          tips: [
            'Invest in quality silver and platinum pieces',
            'Choose clear, brilliant gemstones over cloudy or muted ones',
            'Don\'t be afraid of large, statement pieces - you can carry them',
            'Stick to cool-toned pearls (white, silver, or black)',
            'Mix metals sparingly - keep it predominantly cool'
          ],
          avoidList: ['Yellow gold', 'Brass', 'Copper', 'Muted or dusty gemstones', 'Warm-toned pearls (cream, golden)']
        }
      },
      {
        subtypeId: 'fire-earth',
        subtypeName: 'Fire-Earth (Deep Winter)',
        jewelry: {
          overview: 'Your deep, rich coloring bridges cool and warm, allowing for more metal versatility. Antique silver, pewter, and even some gold can work beautifully with your intense palette.',
          undertoneExplanation: 'As a Deep Winter, you have predominantly cool undertones with some neutral warmth. This allows you to wear both cool metals and some warmer options like antique gold or bronze.',
          metals: [
            { name: 'Antique Silver', hex: '#A8A9AD', rating: 'best', reason: 'Rich and deep, perfect for your intense coloring' },
            { name: 'Pewter', hex: '#8A8D8F', rating: 'best', reason: 'The depth complements your dark, rich appearance' },
            { name: 'Gunmetal', hex: '#536267', rating: 'best', reason: 'Dramatic and sophisticated for your deep palette' },
            { name: 'Antique Gold', hex: '#CFB53B', rating: 'good', reason: 'Aged gold has enough depth to work with your coloring' },
            { name: 'Bright Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too bright and warm for your cool-leaning undertones' }
          ],
          gemstones: [
            { name: 'Garnet', hex: '#722F37', description: 'Deep burgundy that echoes your rich palette', occasion: 'Evening wear' },
            { name: 'Dark Sapphire', hex: '#082567', description: 'Intense blue with depth and mystery', occasion: 'Formal occasions' },
            { name: 'Emerald', hex: '#046307', description: 'Rich green that complements your depth', occasion: 'Special events' },
            { name: 'Black Diamond', hex: '#3B3B3B', description: 'Mysterious and powerful', occasion: 'Statement pieces' },
            { name: 'Deep Amethyst', hex: '#4B0082', description: 'Rich purple with depth', occasion: 'Elegant occasions' },
            { name: 'Smoky Quartz', hex: '#696969', description: 'Sophisticated neutral with depth', occasion: 'Everyday luxury' }
          ],
          styles: [
            { name: 'Vintage-Inspired', description: 'Antique and heirloom-style pieces', examples: ['Victorian-style rings', 'Art nouveau pendants', 'Vintage brooches'] },
            { name: 'Bold & Substantial', description: 'Weighty, significant pieces', examples: ['Chunky chains', 'Large gemstone rings', 'Statement cuffs'] },
            { name: 'Dark Romance', description: 'Gothic-inspired elegance', examples: ['Dark gemstone clusters', 'Oxidized silver', 'Intricate metalwork'] }
          ],
          accessoryColors: [
            { name: 'Burgundy', hex: '#722F37', items: ['Bags', 'Shoes', 'Belts'] },
            { name: 'Forest Green', hex: '#228B22', items: ['Scarves', 'Bags'] },
            { name: 'Deep Plum', hex: '#3D0734', items: ['Accessories', 'Evening bags'] },
            { name: 'Espresso', hex: '#3C1414', items: ['Leather goods', 'Belts'] },
            { name: 'Pewter', hex: '#8A8D8F', items: ['Metallic accessories'] }
          ],
          watchRecommendations: ['Gunmetal watches', 'Dark leather straps', 'Antique gold faces', 'Deep colored dials'],
          eyewearColors: ['Dark tortoiseshell', 'Deep burgundy', 'Gunmetal', 'Black'],
          bagColors: ['Burgundy leather', 'Dark brown', 'Forest green', 'Black'],
          scarfColors: ['Deep jewel tones', 'Burgundy', 'Dark teal', 'Plum'],
          tips: [
            'Embrace antique and vintage-style jewelry',
            'Look for depth and richness in gemstones',
            'Oxidized silver adds beautiful dimension',
            'Layer pieces for a collected, curated look',
            'Dark pearls (black, peacock) are stunning on you'
          ],
          avoidList: ['Bright, shiny gold', 'Pastel gemstones', 'Delicate, dainty pieces', 'Light-colored metals']
        }
      },
      {
        subtypeId: 'fire-air',
        subtypeName: 'Fire-Air (Bright Winter)',
        jewelry: {
          overview: 'Your bright, clear coloring loves sparkle and shine! White gold and silver with brilliant, saturated gemstones create the electric energy that matches your vibrant personality.',
          undertoneExplanation: 'As a Bright Winter, you have cool undertones with exceptional clarity. Your skin has a brightness that\'s enhanced by polished, reflective metals and clear, saturated gemstones.',
          metals: [
            { name: 'Polished White Gold', hex: '#F5F5F5', rating: 'best', reason: 'Bright and reflective, matches your clarity' },
            { name: 'Bright Silver', hex: '#E8E8E8', rating: 'best', reason: 'High-shine silver enhances your vibrant coloring' },
            { name: 'Rhodium', hex: '#D8D8D8', rating: 'best', reason: 'Ultra-bright finish perfect for your clarity' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'good', reason: 'The pink brightness can complement your palette' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too warm and can dull your bright coloring' }
          ],
          gemstones: [
            { name: 'Blue Topaz', hex: '#00CED1', description: 'Electric blue that matches your vibrancy', occasion: 'Everyday sparkle' },
            { name: 'Pink Sapphire', hex: '#FF69B4', description: 'Bright, saturated pink for statement pieces', occasion: 'Special occasions' },
            { name: 'Paraiba Tourmaline', hex: '#00FFFF', description: 'Electric neon blue-green, incredibly striking', occasion: 'Show-stopping moments' },
            { name: 'Tanzanite', hex: '#8B00FF', description: 'Vivid violet-blue with exceptional clarity', occasion: 'Evening elegance' },
            { name: 'White Sapphire', hex: '#F0F0F0', description: 'Brilliant and clear, affordable diamond alternative', occasion: 'Daily wear' },
            { name: 'Aquamarine', hex: '#7FFFD4', description: 'Clear, bright blue-green', occasion: 'Spring/summer' }
          ],
          styles: [
            { name: 'Modern Sparkle', description: 'Contemporary designs with maximum brilliance', examples: ['Pave settings', 'Halo designs', 'Tennis bracelets'] },
            { name: 'Color Pop', description: 'Bright, saturated gemstone statements', examples: ['Colored gemstone cocktail rings', 'Bright drop earrings', 'Colorful pendant necklaces'] },
            { name: 'Sleek & Shiny', description: 'Polished, reflective surfaces', examples: ['Mirror-finish bangles', 'Polished chain necklaces', 'Sleek hoop earrings'] }
          ],
          accessoryColors: [
            { name: 'Electric Blue', hex: '#0066FF', items: ['Bags', 'Shoes', 'Scarves'] },
            { name: 'Fuchsia', hex: '#FF00FF', items: ['Statement bags', 'Accessories'] },
            { name: 'Bright White', hex: '#FFFFFF', items: ['Bags', 'Belts', 'Shoes'] },
            { name: 'Black', hex: '#000000', items: ['Classic pieces', 'Everyday bags'] },
            { name: 'Silver', hex: '#C0C0C0', items: ['Metallic accessories', 'Evening bags'] }
          ],
          watchRecommendations: ['Silver sport watches', 'White ceramic', 'Crystal-embellished', 'Bright colored straps'],
          eyewearColors: ['Clear crystal frames', 'Bright blue', 'Black with silver', 'Fuchsia'],
          bagColors: ['White leather', 'Black patent', 'Electric blue', 'Silver metallic'],
          scarfColors: ['Bright geometric prints', 'Electric blue', 'Hot pink', 'Black and white'],
          tips: [
            'Choose highly polished, reflective metals',
            'Look for gemstones with exceptional clarity and saturation',
            'Don\'t shy away from bright, bold colors',
            'Sparkle is your friend - embrace it!',
            'Mix bright gemstone colors for maximum impact'
          ],
          avoidList: ['Matte finishes', 'Muted gemstones', 'Antique or oxidized metals', 'Warm, earthy tones']
        }
      },
      {
        subtypeId: 'fire-water',
        subtypeName: 'Fire-Water (Cool Winter)',
        jewelry: {
          overview: 'Your refined, cool coloring is beautifully enhanced by soft silver tones and rose gold. Delicate to medium-sized pieces with cool-toned gemstones create elegant harmony.',
          undertoneExplanation: 'As a Cool Winter, you have cool undertones with a softer quality than True Winter. Rose gold\'s pink tones work beautifully, and soft silver is more flattering than bright, harsh metals.',
          metals: [
            { name: 'Rose Gold', hex: '#B76E79', rating: 'best', reason: 'The cool pink tones are perfect for your refined coloring' },
            { name: 'Soft Silver', hex: '#D3D3D3', rating: 'best', reason: 'Gentle silver complements your softer cool tones' },
            { name: 'White Gold', hex: '#F5F5F5', rating: 'best', reason: 'Classic and elegant for your cool palette' },
            { name: 'Platinum', hex: '#E5E4E2', rating: 'good', reason: 'Beautiful but may be slightly too bright' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too warm for your cool undertones' }
          ],
          gemstones: [
            { name: 'Rose Quartz', hex: '#F7CAC9', description: 'Soft pink that echoes your refined palette', occasion: 'Everyday elegance' },
            { name: 'Morganite', hex: '#EBBAB9', description: 'Peachy-pink perfection for your coloring', occasion: 'Romantic occasions' },
            { name: 'Lavender Jade', hex: '#B4A7D6', description: 'Soft purple with cool undertones', occasion: 'Unique pieces' },
            { name: 'Kunzite', hex: '#E6A8D7', description: 'Delicate pink-violet, very romantic', occasion: 'Special moments' },
            { name: 'Blue Lace Agate', hex: '#89CFF0', description: 'Soft, dreamy blue', occasion: 'Casual elegance' },
            { name: 'Pink Pearl', hex: '#E8C4C4', description: 'Soft pink overtones, very flattering', occasion: 'Classic occasions' }
          ],
          styles: [
            { name: 'Romantic Elegance', description: 'Soft, feminine designs with gentle curves', examples: ['Floral motifs', 'Delicate chains', 'Soft curved earrings'] },
            { name: 'Refined Classic', description: 'Timeless pieces with understated elegance', examples: ['Pearl studs', 'Simple pendants', 'Elegant tennis bracelets'] },
            { name: 'Soft Sparkle', description: 'Gentle shimmer rather than bold bling', examples: ['Pave rose gold', 'Soft pink gemstones', 'Delicate diamond accents'] }
          ],
          accessoryColors: [
            { name: 'Soft Pink', hex: '#FFB6C1', items: ['Bags', 'Scarves', 'Accessories'] },
            { name: 'Lavender', hex: '#B4A7D6', items: ['Scarves', 'Light accessories'] },
            { name: 'Soft Navy', hex: '#3D4F5F', items: ['Bags', 'Belts', 'Shoes'] },
            { name: 'Rose', hex: '#C08081', items: ['Bags', 'Accessories'] },
            { name: 'Silver', hex: '#C0C0C0', items: ['Metallic pieces', 'Evening accessories'] }
          ],
          watchRecommendations: ['Rose gold watches', 'Soft pink straps', 'Pearl faces', 'Delicate designs'],
          eyewearColors: ['Soft pink', 'Lavender', 'Silver', 'Soft gray'],
          bagColors: ['Soft pink leather', 'Lavender', 'Soft gray', 'Rose gold metallic'],
          scarfColors: ['Soft florals', 'Pink and gray', 'Lavender prints', 'Soft watercolor patterns'],
          tips: [
            'Rose gold is your signature metal',
            'Choose soft, romantic gemstone colors',
            'Delicate to medium-sized pieces suit you best',
            'Pink pearls are incredibly flattering',
            'Layer delicate pieces for a refined look'
          ],
          avoidList: ['Bright yellow gold', 'Harsh, bright metals', 'Oversized statement pieces', 'Warm, earthy gemstones']
        }
      }
    ]
  },
  {
    elementId: 'water',
    elementName: 'Water',
    season: 'Summer',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766035985144_b9f78535.png',
    undertoneType: 'cool',
    generalDescription: 'Water types (Summer) have cool, muted undertones that are beautifully complemented by soft silver, brushed metals, and rose gold. These gentle metals create harmony with your soft, elegant coloring.',
    metalTheory: 'Summer undertones are cool but muted, with a soft, dusty quality. Brushed or matte silver and rose gold complement this softness, while bright, shiny metals can be too harsh.',
    subtypes: [
      {
        subtypeId: 'water-water',
        subtypeName: 'Pure Water (True Summer)',
        jewelry: {
          overview: 'Your soft, muted coloring calls for gentle, elegant jewelry. Brushed silver and rose gold with soft-colored gemstones create beautiful harmony with your refined appearance.',
          undertoneExplanation: 'As a True Summer, you have cool, muted undertones. Your skin has a soft, dusty quality that\'s overwhelmed by bright, shiny metals but beautifully enhanced by brushed finishes and soft colors.',
          metals: [
            { name: 'Brushed Silver', hex: '#C0C0C0', rating: 'best', reason: 'Soft finish complements your muted coloring' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'best', reason: 'Soft pink tones harmonize with your cool palette' },
            { name: 'White Gold (matte)', hex: '#E8E8E8', rating: 'best', reason: 'Soft white metal enhances your gentle coloring' },
            { name: 'Platinum (brushed)', hex: '#E5E4E2', rating: 'good', reason: 'Works if not too bright or polished' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too warm and bright for your soft, cool tones' }
          ],
          gemstones: [
            { name: 'Rose Quartz', hex: '#F7CAC9', description: 'Soft pink, the quintessential Summer stone', occasion: 'Everyday wear' },
            { name: 'Aquamarine', hex: '#7FFFD4', description: 'Soft blue-green that echoes your palette', occasion: 'Spring/summer' },
            { name: 'Lavender Amethyst', hex: '#B4A7D6', description: 'Soft purple, very flattering', occasion: 'Elegant occasions' },
            { name: 'Moonstone', hex: '#F0F0F0', description: 'Ethereal glow perfect for your soft coloring', occasion: 'Romantic pieces' },
            { name: 'Pink Pearl', hex: '#E8C4C4', description: 'Soft pink overtones, incredibly flattering', occasion: 'Classic elegance' },
            { name: 'Blue Chalcedony', hex: '#8BA8B7', description: 'Soft, dusty blue', occasion: 'Everyday sophistication' }
          ],
          styles: [
            { name: 'Soft & Feminine', description: 'Delicate, romantic designs', examples: ['Floral earrings', 'Delicate chains', 'Soft curved pendants'] },
            { name: 'Classic Elegance', description: 'Timeless, understated pieces', examples: ['Pearl strands', 'Simple studs', 'Elegant bangles'] },
            { name: 'Flowing Designs', description: 'Organic, water-inspired shapes', examples: ['Wave motifs', 'Fluid curves', 'Organic forms'] }
          ],
          accessoryColors: [
            { name: 'Dusty Rose', hex: '#D4A5A5', items: ['Bags', 'Scarves', 'Shoes'] },
            { name: 'Soft Blue', hex: '#6B8BA4', items: ['Bags', 'Accessories'] },
            { name: 'Lavender', hex: '#B4A7D6', items: ['Scarves', 'Light accessories'] },
            { name: 'Soft Navy', hex: '#3D4F5F', items: ['Bags', 'Belts', 'Shoes'] },
            { name: 'Rose Beige', hex: '#C4AEAD', items: ['Neutral accessories'] }
          ],
          watchRecommendations: ['Rose gold with soft face', 'Silver with pink accents', 'Soft leather straps', 'Pearl details'],
          eyewearColors: ['Soft rose', 'Dusty blue', 'Soft gray', 'Lavender'],
          bagColors: ['Dusty rose leather', 'Soft blue', 'Lavender', 'Soft gray'],
          scarfColors: ['Soft florals', 'Watercolor prints', 'Dusty pastels', 'Soft abstract patterns'],
          tips: [
            'Choose brushed or matte finishes over high polish',
            'Soft, muted gemstones are more flattering than bright ones',
            'Delicate pieces suit your refined appearance',
            'Layer soft pieces for depth without harshness',
            'Pink and lavender pearls are especially beautiful'
          ],
          avoidList: ['Bright, shiny metals', 'Bold, saturated gemstones', 'Chunky statement pieces', 'Yellow gold', 'Harsh contrasts']
        }
      },
      {
        subtypeId: 'water-air',
        subtypeName: 'Water-Air (Light Summer)',
        jewelry: {
          overview: 'Your light, delicate coloring is enhanced by fine, delicate jewelry. Soft silver and white gold with pale gemstones create an ethereal look that matches your gentle beauty.',
          undertoneExplanation: 'As a Light Summer, you have the lightest, most delicate coloring. Your skin has cool undertones with a light, airy quality. Heavy jewelry overwhelms you, while delicate pieces enhance your natural grace.',
          metals: [
            { name: 'Delicate Silver', hex: '#D8D8D8', rating: 'best', reason: 'Light and airy, perfect for your delicate coloring' },
            { name: 'White Gold (fine)', hex: '#F5F5F5', rating: 'best', reason: 'Delicate white gold enhances your light appearance' },
            { name: 'Rose Gold (light)', hex: '#E8C4C4', rating: 'best', reason: 'Soft pink tones in fine pieces' },
            { name: 'Platinum (fine)', hex: '#E5E4E2', rating: 'good', reason: 'Beautiful in delicate designs' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too heavy and warm for your light coloring' }
          ],
          gemstones: [
            { name: 'Light Aquamarine', hex: '#B0E0E6', description: 'Pale blue, ethereal and light', occasion: 'Everyday elegance' },
            { name: 'Pink Morganite', hex: '#FFE4E1', description: 'Pale peachy-pink, very delicate', occasion: 'Romantic occasions' },
            { name: 'Light Amethyst', hex: '#E6E6FA', description: 'Pale lavender, soft and pretty', occasion: 'Gentle statements' },
            { name: 'White Pearl', hex: '#FDEEF4', description: 'Classic with soft overtones', occasion: 'Timeless pieces' },
            { name: 'Clear Quartz', hex: '#F8F8F8', description: 'Light and ethereal', occasion: 'Minimalist looks' },
            { name: 'Light Blue Topaz', hex: '#87CEEB', description: 'Soft sky blue', occasion: 'Spring/summer' }
          ],
          styles: [
            { name: 'Delicate & Fine', description: 'Thin, lightweight pieces', examples: ['Fine chain necklaces', 'Tiny studs', 'Delicate rings'] },
            { name: 'Ethereal', description: 'Light, dreamy designs', examples: ['Floating pendants', 'Airy earrings', 'Whisper-thin bangles'] },
            { name: 'Minimalist', description: 'Simple, understated elegance', examples: ['Single stone pieces', 'Simple hoops', 'Bare essentials'] }
          ],
          accessoryColors: [
            { name: 'Soft Pink', hex: '#F4C2C2', items: ['Bags', 'Scarves'] },
            { name: 'Sky Blue', hex: '#87CEEB', items: ['Accessories', 'Scarves'] },
            { name: 'Light Lavender', hex: '#E6E6FA', items: ['Scarves', 'Light bags'] },
            { name: 'Soft Taupe', hex: '#C4B7A6', items: ['Neutral accessories'] },
            { name: 'Off White', hex: '#FAF0E6', items: ['Bags', 'Shoes'] }
          ],
          watchRecommendations: ['Delicate silver watches', 'Thin rose gold', 'Light colored straps', 'Minimalist faces'],
          eyewearColors: ['Clear crystal', 'Soft pink', 'Light blue', 'Soft gray'],
          bagColors: ['Soft pink', 'Light blue', 'Cream', 'Soft lavender'],
          scarfColors: ['Soft pastels', 'Light florals', 'Delicate prints', 'Watercolor effects'],
          tips: [
            'Choose the most delicate, fine pieces',
            'Pale gemstones are more flattering than saturated ones',
            'Less is more - don\'t over-accessorize',
            'Thin chains and small stones suit you best',
            'Avoid anything that looks heavy or chunky'
          ],
          avoidList: ['Heavy jewelry', 'Bold statement pieces', 'Dark gemstones', 'Chunky metals', 'High contrast']
        }
      },
      {
        subtypeId: 'water-earth',
        subtypeName: 'Water-Earth (Soft Summer)',
        jewelry: {
          overview: 'Your muted, sophisticated coloring is enhanced by soft, understated jewelry. Brushed metals and muted gemstones in organic designs create elegant harmony.',
          undertoneExplanation: 'As a Soft Summer, you have the most muted coloring with a blend of cool and slightly warm undertones. Soft, brushed metals and muted gemstones complement your sophisticated, understated beauty.',
          metals: [
            { name: 'Brushed Silver', hex: '#A8A9AD', rating: 'best', reason: 'Matte finish complements your soft coloring' },
            { name: 'Pewter', hex: '#8A8D8F', rating: 'best', reason: 'Soft gray metal perfect for your muted palette' },
            { name: 'Soft Rose Gold', hex: '#C4A4A4', rating: 'best', reason: 'Muted pink tones harmonize beautifully' },
            { name: 'Antique Silver', hex: '#B0B0B0', rating: 'good', reason: 'Aged finish adds soft depth' },
            { name: 'Bright Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too bright and warm for your muted coloring' }
          ],
          gemstones: [
            { name: 'Smoky Quartz', hex: '#918E85', description: 'Muted gray-brown, sophisticated', occasion: 'Everyday elegance' },
            { name: 'Soft Jade', hex: '#9CAF88', description: 'Muted sage green', occasion: 'Natural beauty' },
            { name: 'Dusty Rose Tourmaline', hex: '#C4A4A4', description: 'Soft, muted pink', occasion: 'Romantic pieces' },
            { name: 'Gray Pearl', hex: '#B0B0B0', description: 'Sophisticated and understated', occasion: 'Classic elegance' },
            { name: 'Soft Amethyst', hex: '#A4879C', description: 'Muted purple', occasion: 'Gentle statements' },
            { name: 'Labradorite', hex: '#6B8E8E', description: 'Mysterious gray with subtle flash', occasion: 'Unique pieces' }
          ],
          styles: [
            { name: 'Organic & Natural', description: 'Nature-inspired, flowing designs', examples: ['Leaf motifs', 'Organic shapes', 'Natural textures'] },
            { name: 'Understated Elegance', description: 'Quietly sophisticated pieces', examples: ['Simple pendants', 'Subtle earrings', 'Refined bangles'] },
            { name: 'Soft Texture', description: 'Matte and brushed finishes', examples: ['Hammered metals', 'Brushed surfaces', 'Soft patinas'] }
          ],
          accessoryColors: [
            { name: 'Mushroom', hex: '#A4978E', items: ['Bags', 'Shoes', 'Belts'] },
            { name: 'Sage', hex: '#9CAF88', items: ['Scarves', 'Accessories'] },
            { name: 'Dusty Pink', hex: '#D8B4B4', items: ['Bags', 'Scarves'] },
            { name: 'Soft Charcoal', hex: '#6B6B6B', items: ['Bags', 'Belts'] },
            { name: 'Greige', hex: '#B8B0A8', items: ['Neutral accessories'] }
          ],
          watchRecommendations: ['Brushed silver', 'Soft leather straps', 'Muted face colors', 'Understated designs'],
          eyewearColors: ['Soft tortoiseshell', 'Muted gray', 'Soft brown', 'Sage green'],
          bagColors: ['Mushroom leather', 'Soft gray', 'Dusty rose', 'Sage'],
          scarfColors: ['Muted nature prints', 'Soft abstract', 'Dusty florals', 'Tone-on-tone'],
          tips: [
            'Choose matte and brushed finishes',
            'Muted gemstones are more flattering than bright ones',
            'Natural, organic designs suit your aesthetic',
            'Layer subtle pieces for depth',
            'Gray pearls are especially beautiful on you'
          ],
          avoidList: ['Bright, shiny metals', 'Saturated gemstones', 'Bold statement pieces', 'High contrast', 'Bright colors']
        }
      },
      {
        subtypeId: 'water-fire',
        subtypeName: 'Water-Fire (Cool Summer)',
        jewelry: {
          overview: 'Your cool, clear coloring bridges Summer and Winter. You can wear slightly brighter cool metals and clearer gemstones than other Summers, with elegant, refined designs.',
          undertoneExplanation: 'As a Cool Summer, you have cool undertones with more clarity than other Summers. This allows you to wear slightly brighter silver and clearer gemstones while maintaining elegance.',
          metals: [
            { name: 'Sterling Silver', hex: '#C0C0C0', rating: 'best', reason: 'Cool and clear, perfect for your undertones' },
            { name: 'White Gold', hex: '#F5F5F5', rating: 'best', reason: 'Bright enough for your clarity' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'best', reason: 'Cool pink tones complement beautifully' },
            { name: 'Platinum', hex: '#E5E4E2', rating: 'good', reason: 'Elegant and cool' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'avoid', reason: 'Too warm for your cool undertones' }
          ],
          gemstones: [
            { name: 'Pink Sapphire', hex: '#E8A4B8', description: 'Cool pink with clarity', occasion: 'Special occasions' },
            { name: 'Tanzanite', hex: '#8B8EFF', description: 'Cool violet-blue', occasion: 'Evening elegance' },
            { name: 'Aquamarine', hex: '#7FFFD4', description: 'Clear cool blue-green', occasion: 'Everyday luxury' },
            { name: 'Cool Amethyst', hex: '#9966CC', description: 'Clear purple', occasion: 'Elegant statements' },
            { name: 'White Sapphire', hex: '#F0F0F0', description: 'Clear and brilliant', occasion: 'Classic pieces' },
            { name: 'Blue Topaz', hex: '#6495ED', description: 'Cool, clear blue', occasion: 'Fresh elegance' }
          ],
          styles: [
            { name: 'Elegant Classic', description: 'Refined, timeless designs', examples: ['Solitaire pieces', 'Classic studs', 'Elegant pendants'] },
            { name: 'Cool Sophistication', description: 'Polished, refined pieces', examples: ['Tennis bracelets', 'Drop earrings', 'Sleek bangles'] },
            { name: 'Artistic Elegance', description: 'Creative yet refined designs', examples: ['Sculptural pieces', 'Artistic pendants', 'Unique settings'] }
          ],
          accessoryColors: [
            { name: 'Rose Pink', hex: '#E8A4B8', items: ['Bags', 'Scarves'] },
            { name: 'Cool Blue', hex: '#6495ED', items: ['Accessories', 'Scarves'] },
            { name: 'Orchid', hex: '#DA70D6', items: ['Statement pieces'] },
            { name: 'Charcoal', hex: '#4A4A4A', items: ['Bags', 'Belts', 'Shoes'] },
            { name: 'Slate', hex: '#708090', items: ['Neutral accessories'] }
          ],
          watchRecommendations: ['Silver with cool face', 'Rose gold accents', 'Cool colored straps', 'Elegant designs'],
          eyewearColors: ['Cool gray', 'Soft purple', 'Rose', 'Silver'],
          bagColors: ['Cool gray leather', 'Rose pink', 'Soft navy', 'Silver metallic'],
          scarfColors: ['Cool florals', 'Blue and pink', 'Purple tones', 'Elegant prints'],
          tips: [
            'You can wear slightly brighter metals than other Summers',
            'Clear gemstones with cool undertones are ideal',
            'Elegant, refined designs suit your sophisticated look',
            'Mix silver and rose gold for interest',
            'Cool-toned pearls are beautiful on you'
          ],
          avoidList: ['Yellow gold', 'Warm gemstones', 'Muted, dusty colors', 'Rustic or bohemian styles']
        }
      }
    ]
  },
  {
    elementId: 'earth',
    elementName: 'Earth',
    season: 'Autumn',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766035979849_09fdb99a.jpg',
    undertoneType: 'warm',
    generalDescription: 'Earth types (Autumn) have warm undertones that are beautifully complemented by gold, bronze, and copper. These warm metals create harmony with your rich, earthy coloring.',
    metalTheory: 'Warm undertones contain yellow and golden pigments in the skin. Gold and warm metals reflect these same warm tones, creating a healthy, radiant glow. Silver can look too cold and harsh against warm skin.',
    subtypes: [
      {
        subtypeId: 'earth-earth',
        subtypeName: 'Pure Earth (True Autumn)',
        jewelry: {
          overview: 'Your warm, rich coloring is beautifully enhanced by gold, bronze, and copper. Earthy gemstones in organic designs create perfect harmony with your natural beauty.',
          undertoneExplanation: 'As a True Autumn, you have warm, golden undertones throughout. Gold metals enhance your natural warmth and create a healthy glow, while silver can look cold and harsh.',
          metals: [
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'best', reason: 'Enhances your warm, golden undertones beautifully' },
            { name: 'Bronze', hex: '#CD7F32', rating: 'best', reason: 'Rich warm metal perfect for your earthy palette' },
            { name: 'Copper', hex: '#B87333', rating: 'best', reason: 'Warm and earthy, complements your coloring' },
            { name: 'Brass', hex: '#B5A642', rating: 'good', reason: 'Warm golden tone works well' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm undertones' }
          ],
          gemstones: [
            { name: 'Citrine', hex: '#E4A010', description: 'Golden yellow, quintessential Autumn stone', occasion: 'Everyday warmth' },
            { name: 'Amber', hex: '#FFBF00', description: 'Warm, organic, and earthy', occasion: 'Natural beauty' },
            { name: 'Tiger\'s Eye', hex: '#B87333', description: 'Rich brown with golden shimmer', occasion: 'Grounded elegance' },
            { name: 'Carnelian', hex: '#CC4E3E', description: 'Warm orange-red', occasion: 'Bold statements' },
            { name: 'Peridot', hex: '#9ACD32', description: 'Warm yellow-green', occasion: 'Fresh accent' },
            { name: 'Golden Pearl', hex: '#F0E68C', description: 'Warm cream with golden overtones', occasion: 'Classic warmth' }
          ],
          styles: [
            { name: 'Organic & Natural', description: 'Nature-inspired designs with texture', examples: ['Leaf motifs', 'Branch designs', 'Natural textures', 'Organic shapes'] },
            { name: 'Artisan & Handcrafted', description: 'Unique, handmade pieces', examples: ['Hammered gold', 'Woven designs', 'Artisan rings'] },
            { name: 'Bohemian Luxe', description: 'Layered, collected look', examples: ['Stacked rings', 'Layered necklaces', 'Mixed metals (warm)'] }
          ],
          accessoryColors: [
            { name: 'Terracotta', hex: '#CC4E3E', items: ['Bags', 'Shoes', 'Belts'] },
            { name: 'Olive', hex: '#808000', items: ['Bags', 'Scarves'] },
            { name: 'Mustard', hex: '#FFDB58', items: ['Scarves', 'Accessories'] },
            { name: 'Warm Brown', hex: '#8B4513', items: ['Leather goods', 'Belts', 'Shoes'] },
            { name: 'Cream', hex: '#FFFDD0', items: ['Bags', 'Scarves'] }
          ],
          watchRecommendations: ['Gold watches', 'Brown leather straps', 'Warm dial colors', 'Bronze accents'],
          eyewearColors: ['Warm tortoiseshell', 'Golden brown', 'Olive', 'Warm amber'],
          bagColors: ['Tan leather', 'Cognac', 'Olive', 'Terracotta'],
          scarfColors: ['Warm paisley', 'Earth tones', 'Autumn leaves', 'Golden prints'],
          tips: [
            'Gold is your signature metal - embrace it',
            'Look for gemstones with warm, earthy tones',
            'Organic, nature-inspired designs suit you perfectly',
            'Layer warm metals for a collected look',
            'Golden and cream pearls are beautiful on you'
          ],
          avoidList: ['Silver', 'Platinum', 'Cool-toned gemstones', 'Bright, icy colors', 'Stark white metals']
        }
      },
      {
        subtypeId: 'earth-fire',
        subtypeName: 'Earth-Fire (Deep Autumn)',
        jewelry: {
          overview: 'Your deep, intense coloring calls for rich, substantial jewelry. Antique gold, bronze, and deep gemstones create powerful elegance.',
          undertoneExplanation: 'As a Deep Autumn, you have warm undertones with exceptional depth. Rich, aged metals and deep gemstones complement your intense coloring better than bright, shiny pieces.',
          metals: [
            { name: 'Antique Gold', hex: '#CFB53B', rating: 'best', reason: 'Rich, aged gold complements your depth' },
            { name: 'Bronze', hex: '#CD7F32', rating: 'best', reason: 'Deep warm metal perfect for your intensity' },
            { name: 'Copper (aged)', hex: '#8B4513', rating: 'best', reason: 'Rich patina adds depth' },
            { name: 'Brass (antiqued)', hex: '#8B7355', rating: 'good', reason: 'Aged finish works well' },
            { name: 'Bright Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool and bright for your warm, deep coloring' }
          ],
          gemstones: [
            { name: 'Garnet', hex: '#722F37', description: 'Deep burgundy, rich and powerful', occasion: 'Evening elegance' },
            { name: 'Smoky Topaz', hex: '#8B4513', description: 'Deep brown with warmth', occasion: 'Sophisticated statements' },
            { name: 'Deep Citrine', hex: '#B8860B', description: 'Rich golden-brown', occasion: 'Warm luxury' },
            { name: 'Mahogany Obsidian', hex: '#4E0707', description: 'Deep red-brown', occasion: 'Powerful pieces' },
            { name: 'Tiger Iron', hex: '#5C4033', description: 'Rich earth tones', occasion: 'Grounded strength' },
            { name: 'Chocolate Pearl', hex: '#3C1414', description: 'Deep brown with warm overtones', occasion: 'Unique elegance' }
          ],
          styles: [
            { name: 'Substantial & Bold', description: 'Weighty, significant pieces', examples: ['Large cocktail rings', 'Chunky cuffs', 'Statement pendants'] },
            { name: 'Vintage & Antique', description: 'Heirloom-quality pieces', examples: ['Victorian-inspired', 'Antique reproductions', 'Estate jewelry'] },
            { name: 'Dark Romance', description: 'Rich, mysterious designs', examples: ['Dark gemstone clusters', 'Intricate metalwork', 'Gothic elegance'] }
          ],
          accessoryColors: [
            { name: 'Burgundy', hex: '#722F37', items: ['Bags', 'Shoes', 'Belts'] },
            { name: 'Forest Green', hex: '#228B22', items: ['Bags', 'Scarves'] },
            { name: 'Espresso', hex: '#3C1414', items: ['Leather goods'] },
            { name: 'Dark Teal', hex: '#014D4E', items: ['Scarves', 'Accessories'] },
            { name: 'Bronze', hex: '#CD7F32', items: ['Metallic accessories'] }
          ],
          watchRecommendations: ['Antique gold', 'Dark leather straps', 'Bronze cases', 'Deep dial colors'],
          eyewearColors: ['Dark tortoiseshell', 'Deep burgundy', 'Bronze', 'Dark brown'],
          bagColors: ['Burgundy leather', 'Dark brown', 'Forest green', 'Bronze metallic'],
          scarfColors: ['Rich jewel tones', 'Dark paisley', 'Deep florals', 'Burgundy and gold'],
          tips: [
            'Choose substantial, weighty pieces',
            'Antique and aged finishes suit you best',
            'Deep, rich gemstones are more flattering than bright ones',
            'Invest in quality vintage or antique pieces',
            'Dark pearls (chocolate, bronze) are stunning'
          ],
          avoidList: ['Bright silver', 'Delicate, dainty pieces', 'Pastel gemstones', 'Light, bright metals']
        }
      },
      {
        subtypeId: 'earth-water',
        subtypeName: 'Earth-Water (Soft Autumn)',
        jewelry: {
          overview: 'Your soft, muted coloring is enhanced by gentle warm metals and muted gemstones. Brushed gold and soft earth tones create understated elegance.',
          undertoneExplanation: 'As a Soft Autumn, you have warm undertones with a muted, soft quality. Brushed and matte gold finishes complement your softness better than bright, shiny metals.',
          metals: [
            { name: 'Brushed Gold', hex: '#D4AF37', rating: 'best', reason: 'Soft finish complements your muted coloring' },
            { name: 'Matte Bronze', hex: '#A67B5B', rating: 'best', reason: 'Soft warm metal perfect for your palette' },
            { name: 'Soft Rose Gold', hex: '#C4A484', rating: 'best', reason: 'Muted pink-gold harmonizes beautifully' },
            { name: 'Antique Brass', hex: '#9C8B6E', rating: 'good', reason: 'Soft, aged finish works well' },
            { name: 'Bright Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool and bright for your soft, warm tones' }
          ],
          gemstones: [
            { name: 'Soft Citrine', hex: '#C4B47C', description: 'Muted golden yellow', occasion: 'Everyday warmth' },
            { name: 'Smoky Quartz', hex: '#918E85', description: 'Soft gray-brown', occasion: 'Understated elegance' },
            { name: 'Soft Jade', hex: '#9CAF88', description: 'Muted sage green', occasion: 'Natural beauty' },
            { name: 'Champagne Pearl', hex: '#F5DEB3', description: 'Soft warm cream', occasion: 'Classic softness' },
            { name: 'Soft Coral', hex: '#C4948C', description: 'Muted peachy-pink', occasion: 'Gentle warmth' },
            { name: 'Moonstone', hex: '#E8E4D9', description: 'Soft, ethereal glow', occasion: 'Romantic pieces' }
          ],
          styles: [
            { name: 'Soft & Natural', description: 'Gentle, organic designs', examples: ['Soft curves', 'Natural motifs', 'Gentle textures'] },
            { name: 'Understated Elegance', description: 'Quietly sophisticated pieces', examples: ['Simple pendants', 'Subtle earrings', 'Refined basics'] },
            { name: 'Soft Bohemian', description: 'Gentle, layered look', examples: ['Soft stacking rings', 'Delicate layers', 'Muted mixed metals'] }
          ],
          accessoryColors: [
            { name: 'Dusty Rose', hex: '#C4A4A4', items: ['Bags', 'Scarves'] },
            { name: 'Sage', hex: '#9CAF88', items: ['Scarves', 'Accessories'] },
            { name: 'Soft Terracotta', hex: '#C4847C', items: ['Bags', 'Shoes'] },
            { name: 'Mushroom', hex: '#A4978E', items: ['Neutral accessories'] },
            { name: 'Soft Gold', hex: '#C4B47C', items: ['Metallic pieces'] }
          ],
          watchRecommendations: ['Brushed gold', 'Soft leather straps', 'Muted face colors', 'Understated designs'],
          eyewearColors: ['Soft tortoiseshell', 'Muted brown', 'Soft olive', 'Warm taupe'],
          bagColors: ['Soft tan', 'Mushroom', 'Dusty rose', 'Soft olive'],
          scarfColors: ['Soft earth tones', 'Muted florals', 'Gentle patterns', 'Tone-on-tone'],
          tips: [
            'Choose matte and brushed finishes',
            'Muted gemstones are more flattering than bright ones',
            'Soft, gentle designs suit your aesthetic',
            'Layer subtle pieces for depth',
            'Champagne and soft pearls are especially beautiful'
          ],
          avoidList: ['Bright, shiny metals', 'Saturated gemstones', 'Bold statement pieces', 'Cool metals', 'High contrast']
        }
      },
      {
        subtypeId: 'earth-air',
        subtypeName: 'Earth-Air (Warm Autumn)',
        jewelry: {
          overview: 'Your sunny, golden coloring loves bright warm metals! Polished gold and brass with warm, vibrant gemstones create joyful radiance.',
          undertoneExplanation: 'As a Warm Autumn, you have the warmest, most golden undertones. Bright, polished gold enhances your sunny coloring and creates a radiant glow.',
          metals: [
            { name: 'Polished Gold', hex: '#FFD700', rating: 'best', reason: 'Bright gold enhances your sunny warmth' },
            { name: 'Brass', hex: '#B5A642', rating: 'best', reason: 'Warm golden tone complements beautifully' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'good', reason: 'Warm pink tones can work well' },
            { name: 'Copper', hex: '#B87333', rating: 'good', reason: 'Warm and vibrant' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm, golden undertones' }
          ],
          gemstones: [
            { name: 'Golden Citrine', hex: '#FFD700', description: 'Bright golden yellow, your signature stone', occasion: 'Everyday radiance' },
            { name: 'Coral', hex: '#FF7F50', description: 'Warm orange, vibrant and joyful', occasion: 'Summer statements' },
            { name: 'Peridot', hex: '#9ACD32', description: 'Bright yellow-green', occasion: 'Fresh accent' },
            { name: 'Golden Topaz', hex: '#FFBF00', description: 'Rich golden amber', occasion: 'Warm luxury' },
            { name: 'Carnelian', hex: '#FF6F61', description: 'Warm orange-red', occasion: 'Bold warmth' },
            { name: 'Golden Pearl', hex: '#F0E68C', description: 'Warm cream with golden glow', occasion: 'Classic radiance' }
          ],
          styles: [
            { name: 'Sunny & Bright', description: 'Joyful, radiant designs', examples: ['Bright gold hoops', 'Sunny pendants', 'Cheerful earrings'] },
            { name: 'Bohemian Gold', description: 'Layered, collected warmth', examples: ['Stacked gold rings', 'Layered chains', 'Mixed warm metals'] },
            { name: 'Natural Luxe', description: 'Organic designs in bright gold', examples: ['Leaf earrings', 'Floral rings', 'Nature-inspired pieces'] }
          ],
          accessoryColors: [
            { name: 'Pumpkin', hex: '#FF7518', items: ['Bags', 'Scarves'] },
            { name: 'Golden Yellow', hex: '#FFD700', items: ['Scarves', 'Accessories'] },
            { name: 'Warm Coral', hex: '#FF6F61', items: ['Bags', 'Shoes'] },
            { name: 'Camel', hex: '#C19A6B', items: ['Leather goods'] },
            { name: 'Cream', hex: '#FFFDD0', items: ['Bags', 'Scarves'] }
          ],
          watchRecommendations: ['Bright gold', 'Tan leather straps', 'Warm dial colors', 'Cheerful designs'],
          eyewearColors: ['Golden tortoiseshell', 'Warm amber', 'Golden brown', 'Coral'],
          bagColors: ['Tan leather', 'Golden brown', 'Coral', 'Cream'],
          scarfColors: ['Sunny prints', 'Warm florals', 'Golden patterns', 'Coral and gold'],
          tips: [
            'Embrace bright, polished gold',
            'Warm, vibrant gemstones enhance your glow',
            'Don\'t be afraid of sunny, cheerful pieces',
            'Layer gold pieces for maximum warmth',
            'Golden pearls are especially radiant on you'
          ],
          avoidList: ['Silver', 'Cool gemstones', 'Muted colors', 'Stark white metals', 'Dark, heavy pieces']
        }
      }
    ]
  },
  {
    elementId: 'air',
    elementName: 'Air',
    season: 'Spring',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766035983771_e83a88cb.jpg',
    undertoneType: 'warm',
    generalDescription: 'Air types (Spring) have warm, clear undertones that are beautifully complemented by gold, rose gold, and warm metals. These bright, warm metals create harmony with your fresh, vibrant coloring.',
    metalTheory: 'Spring undertones are warm and clear, with golden and peachy pigments in the skin. Gold and rose gold reflect these warm tones, creating a fresh, youthful glow. Silver can look too cold against warm skin.',
    subtypes: [
      {
        subtypeId: 'air-air',
        subtypeName: 'Pure Air (True Spring)',
        jewelry: {
          overview: 'Your fresh, vibrant coloring is enhanced by bright warm metals and clear, colorful gemstones. Gold and rose gold with lively stones create joyful harmony.',
          undertoneExplanation: 'As a True Spring, you have warm, clear undertones. Your skin has golden-peachy tones that are enhanced by bright gold and warm metals. Silver can look too cold and harsh.',
          metals: [
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'best', reason: 'Bright gold enhances your warm, clear coloring' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'best', reason: 'Warm pink tones complement your freshness' },
            { name: 'Brass', hex: '#B5A642', rating: 'good', reason: 'Warm golden tone works well' },
            { name: 'Copper', hex: '#B87333', rating: 'good', reason: 'Warm and vibrant' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm undertones' }
          ],
          gemstones: [
            { name: 'Coral', hex: '#FF7F50', description: 'Your signature Spring color', occasion: 'Everyday joy' },
            { name: 'Peridot', hex: '#9ACD32', description: 'Fresh yellow-green, very Spring', occasion: 'Fresh statements' },
            { name: 'Aquamarine', hex: '#7FFFD4', description: 'Clear warm blue-green', occasion: 'Elegant freshness' },
            { name: 'Golden Citrine', hex: '#FFE135', description: 'Bright, sunny yellow', occasion: 'Cheerful pieces' },
            { name: 'Pink Tourmaline', hex: '#FF6B6B', description: 'Warm, clear pink', occasion: 'Romantic moments' },
            { name: 'Cream Pearl', hex: '#FFFDD0', description: 'Warm ivory with golden overtones', occasion: 'Classic warmth' }
          ],
          styles: [
            { name: 'Fresh & Lively', description: 'Bright, cheerful designs', examples: ['Colorful gemstone pieces', 'Fun earrings', 'Playful pendants'] },
            { name: 'Classic with Color', description: 'Timeless shapes in warm metals', examples: ['Gold hoops', 'Simple chains', 'Elegant studs'] },
            { name: 'Nature-Inspired', description: 'Floral and organic motifs', examples: ['Flower earrings', 'Leaf pendants', 'Butterfly designs'] }
          ],
          accessoryColors: [
            { name: 'Coral', hex: '#FF7F50', items: ['Bags', 'Scarves', 'Shoes'] },
            { name: 'Warm Yellow', hex: '#FFE135', items: ['Scarves', 'Accessories'] },
            { name: 'Peach', hex: '#FFCBA4', items: ['Bags', 'Scarves'] },
            { name: 'Aqua', hex: '#00CED1', items: ['Scarves', 'Accessories'] },
            { name: 'Ivory', hex: '#FFFFF0', items: ['Bags', 'Shoes'] }
          ],
          watchRecommendations: ['Gold watches', 'Colorful straps', 'Warm dial colors', 'Fun, fresh designs'],
          eyewearColors: ['Light tortoiseshell', 'Coral', 'Warm brown', 'Golden'],
          bagColors: ['Coral leather', 'Tan', 'Peach', 'Ivory'],
          scarfColors: ['Bright florals', 'Coral and turquoise', 'Warm prints', 'Fresh patterns'],
          tips: [
            'Gold and rose gold are your best metals',
            'Choose clear, bright gemstones',
            'Fresh, lively designs suit your energy',
            'Don\'t be afraid of color in your jewelry',
            'Cream and golden pearls are beautiful on you'
          ],
          avoidList: ['Silver', 'Cool gemstones', 'Muted colors', 'Heavy, dark pieces', 'Stark white metals']
        }
      },
      {
        subtypeId: 'air-water',
        subtypeName: 'Air-Water (Light Spring)',
        jewelry: {
          overview: 'Your light, delicate coloring is enhanced by fine, delicate jewelry in warm metals. Rose gold and light gold with soft, warm gemstones create gentle harmony.',
          undertoneExplanation: 'As a Light Spring, you have the lightest, most delicate warm coloring. Your skin has soft peachy-golden tones that are enhanced by delicate warm metals.',
          metals: [
            { name: 'Light Rose Gold', hex: '#E8C4C4', rating: 'best', reason: 'Delicate warm pink perfect for your light coloring' },
            { name: 'Light Gold', hex: '#F0E68C', rating: 'best', reason: 'Soft gold enhances your delicate warmth' },
            { name: 'Champagne Gold', hex: '#F7E7CE', rating: 'best', reason: 'Soft, warm, and delicate' },
            { name: 'Yellow Gold', hex: '#FFD700', rating: 'good', reason: 'Works in delicate pieces' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm undertones' }
          ],
          gemstones: [
            { name: 'Morganite', hex: '#EBBAB9', description: 'Soft peachy-pink, perfect for you', occasion: 'Romantic elegance' },
            { name: 'Light Peridot', hex: '#ADFF2F', description: 'Soft yellow-green', occasion: 'Fresh accent' },
            { name: 'Rose Quartz', hex: '#F7CAC9', description: 'Soft pink with warm undertones', occasion: 'Gentle beauty' },
            { name: 'Light Citrine', hex: '#FFFACD', description: 'Pale sunny yellow', occasion: 'Soft warmth' },
            { name: 'Cream Pearl', hex: '#FFFDD0', description: 'Soft warm cream', occasion: 'Classic delicacy' },
            { name: 'Light Coral', hex: '#F08080', description: 'Soft peachy-coral', occasion: 'Gentle statements' }
          ],
          styles: [
            { name: 'Delicate & Fine', description: 'Thin, lightweight pieces', examples: ['Fine chain necklaces', 'Tiny studs', 'Delicate rings'] },
            { name: 'Soft & Feminine', description: 'Gentle, romantic designs', examples: ['Floral motifs', 'Soft curves', 'Dainty pendants'] },
            { name: 'Light & Airy', description: 'Barely-there elegance', examples: ['Floating stones', 'Whisper-thin pieces', 'Minimalist designs'] }
          ],
          accessoryColors: [
            { name: 'Peach', hex: '#FFCBA4', items: ['Bags', 'Scarves'] },
            { name: 'Light Coral', hex: '#F08080', items: ['Accessories', 'Scarves'] },
            { name: 'Soft Yellow', hex: '#FFFACD', items: ['Scarves', 'Light accessories'] },
            { name: 'Cream', hex: '#FFFDD0', items: ['Bags', 'Shoes'] },
            { name: 'Light Beige', hex: '#F5F5DC', items: ['Neutral accessories'] }
          ],
          watchRecommendations: ['Delicate rose gold', 'Light leather straps', 'Soft face colors', 'Minimalist designs'],
          eyewearColors: ['Light tortoiseshell', 'Soft pink', 'Light brown', 'Cream'],
          bagColors: ['Soft pink', 'Cream', 'Light peach', 'Soft tan'],
          scarfColors: ['Soft florals', 'Light pastels', 'Delicate prints', 'Watercolor patterns'],
          tips: [
            'Choose the most delicate, fine pieces',
            'Soft, warm gemstones are more flattering than bright ones',
            'Less is more - don\'t over-accessorize',
            'Rose gold is especially beautiful on you',
            'Cream pearls are perfect for your coloring'
          ],
          avoidList: ['Heavy jewelry', 'Bold statement pieces', 'Cool metals', 'Dark gemstones', 'Chunky designs']
        }
      },
      {
        subtypeId: 'air-fire',
        subtypeName: 'Air-Fire (Bright Spring)',
        jewelry: {
          overview: 'Your bright, vivid coloring loves sparkle and color! Polished gold with brilliant, saturated warm gemstones creates the vibrant energy that matches your dynamic personality.',
          undertoneExplanation: 'As a Bright Spring, you have warm undertones with exceptional clarity and brightness. Polished, reflective gold and clear, saturated gemstones enhance your vibrant coloring.',
          metals: [
            { name: 'Polished Gold', hex: '#FFD700', rating: 'best', reason: 'Bright, reflective gold matches your clarity' },
            { name: 'Bright Rose Gold', hex: '#B76E79', rating: 'best', reason: 'Warm pink with brightness' },
            { name: 'Brass (polished)', hex: '#B5A642', rating: 'good', reason: 'Bright warm metal' },
            { name: 'Mixed Warm Metals', hex: '#D4AF37', rating: 'good', reason: 'Adds visual interest' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm, bright coloring' }
          ],
          gemstones: [
            { name: 'Bright Coral', hex: '#FF6B6B', description: 'Vivid warm coral', occasion: 'Statement pieces' },
            { name: 'Turquoise', hex: '#40E0D0', description: 'Bright blue-green with warmth', occasion: 'Bold statements' },
            { name: 'Golden Topaz', hex: '#FFBF00', description: 'Brilliant golden amber', occasion: 'Warm luxury' },
            { name: 'Hot Pink Sapphire', hex: '#FF69B4', description: 'Vivid warm pink', occasion: 'Dramatic moments' },
            { name: 'Bright Peridot', hex: '#9ACD32', description: 'Vivid yellow-green', occasion: 'Fresh pop' },
            { name: 'Tangerine Garnet', hex: '#FF9966', description: 'Bright orange', occasion: 'Unique statements' }
          ],
          styles: [
            { name: 'Bold & Bright', description: 'Vivid, eye-catching pieces', examples: ['Large gemstone rings', 'Colorful drop earrings', 'Statement necklaces'] },
            { name: 'Modern Sparkle', description: 'Contemporary with maximum shine', examples: ['Pave settings', 'Multi-stone pieces', 'Sparkling designs'] },
            { name: 'Playful Luxe', description: 'Fun, high-end pieces', examples: ['Colorful cocktail rings', 'Mixed gemstone pieces', 'Playful pendants'] }
          ],
          accessoryColors: [
            { name: 'Hot Coral', hex: '#FF6B6B', items: ['Bags', 'Shoes', 'Scarves'] },
            { name: 'Turquoise', hex: '#40E0D0', items: ['Accessories', 'Scarves'] },
            { name: 'Bright Yellow', hex: '#FFFF00', items: ['Scarves', 'Statement pieces'] },
            { name: 'Hot Pink', hex: '#FF69B4', items: ['Bags', 'Accessories'] },
            { name: 'White', hex: '#FFFFFF', items: ['Bags', 'Shoes'] }
          ],
          watchRecommendations: ['Bright gold', 'Colorful straps', 'Crystal accents', 'Bold designs'],
          eyewearColors: ['Bright tortoiseshell', 'Coral', 'Turquoise', 'Hot pink'],
          bagColors: ['Bright coral', 'Turquoise', 'Hot pink', 'White'],
          scarfColors: ['Bright prints', 'Bold colors', 'Graphic patterns', 'Vivid florals'],
          tips: [
            'Choose highly polished, reflective gold',
            'Bright, saturated gemstones are your best friends',
            'Don\'t be afraid of bold, colorful pieces',
            'Sparkle enhances your natural brightness',
            'Mix bright gemstone colors for maximum impact'
          ],
          avoidList: ['Matte finishes', 'Muted gemstones', 'Silver', 'Dark, heavy pieces', 'Understated designs']
        }
      },
      {
        subtypeId: 'air-earth',
        subtypeName: 'Air-Earth (Warm Spring)',
        jewelry: {
          overview: 'Your sunny, golden coloring is enhanced by rich warm metals and golden gemstones. Gold with warm, radiant stones creates nurturing warmth.',
          undertoneExplanation: 'As a Warm Spring, you have the warmest undertones of the Spring types. Rich gold and warm gemstones enhance your sunny, golden coloring beautifully.',
          metals: [
            { name: 'Rich Gold', hex: '#FFD700', rating: 'best', reason: 'Warm gold enhances your golden undertones' },
            { name: 'Rose Gold', hex: '#B76E79', rating: 'best', reason: 'Warm pink complements your warmth' },
            { name: 'Brass', hex: '#B5A642', rating: 'best', reason: 'Rich warm metal' },
            { name: 'Bronze', hex: '#CD7F32', rating: 'good', reason: 'Warm and earthy' },
            { name: 'Silver', hex: '#C0C0C0', rating: 'avoid', reason: 'Too cool for your warm, golden coloring' }
          ],
          gemstones: [
            { name: 'Golden Citrine', hex: '#FFD700', description: 'Rich golden yellow', occasion: 'Everyday radiance' },
            { name: 'Warm Coral', hex: '#FF6F61', description: 'Peachy-coral warmth', occasion: 'Joyful pieces' },
            { name: 'Amber', hex: '#FFBF00', description: 'Warm, organic golden', occasion: 'Natural beauty' },
            { name: 'Warm Peridot', hex: '#9ACD32', description: 'Golden-green', occasion: 'Fresh warmth' },
            { name: 'Golden Pearl', hex: '#F0E68C', description: 'Warm cream with golden glow', occasion: 'Classic warmth' },
            { name: 'Carnelian', hex: '#FF6F61', description: 'Warm orange-red', occasion: 'Bold statements' }
          ],
          styles: [
            { name: 'Warm & Radiant', description: 'Sunny, glowing designs', examples: ['Golden hoops', 'Warm pendants', 'Radiant earrings'] },
            { name: 'Nature-Inspired', description: 'Organic, natural motifs', examples: ['Leaf designs', 'Floral pieces', 'Natural textures'] },
            { name: 'Bohemian Warmth', description: 'Layered, collected look', examples: ['Stacked rings', 'Layered chains', 'Mixed warm metals'] }
          ],
          accessoryColors: [
            { name: 'Warm Coral', hex: '#FF6F61', items: ['Bags', 'Scarves'] },
            { name: 'Golden Yellow', hex: '#FFD700', items: ['Scarves', 'Accessories'] },
            { name: 'Warm Peach', hex: '#FFDAB9', items: ['Bags', 'Scarves'] },
            { name: 'Camel', hex: '#C19A6B', items: ['Leather goods'] },
            { name: 'Cream', hex: '#FFFDD0', items: ['Bags', 'Shoes'] }
          ],
          watchRecommendations: ['Rich gold', 'Tan leather straps', 'Warm dial colors', 'Natural designs'],
          eyewearColors: ['Warm tortoiseshell', 'Golden brown', 'Coral', 'Amber'],
          bagColors: ['Tan leather', 'Coral', 'Warm peach', 'Cream'],
          scarfColors: ['Warm florals', 'Golden prints', 'Coral and gold', 'Nature patterns'],
          tips: [
            'Rich gold is your signature metal',
            'Warm, golden gemstones enhance your glow',
            'Natural, organic designs suit you beautifully',
            'Layer warm metals for a collected look',
            'Golden pearls are especially radiant on you'
          ],
          avoidList: ['Silver', 'Cool gemstones', 'Stark white metals', 'Cool, icy colors', 'Minimalist cold designs']
        }
      }
    ]
  }
];

// Helper function to get jewelry data for a specific element and subtype
export const getJewelryData = (elementId: string, subtypeId?: string): JewelryGuide | null => {
  const elementData = elementalJewelryData.find(e => e.elementId === elementId);
  if (!elementData) return null;
  
  if (subtypeId) {
    const subtypeData = elementData.subtypes.find(s => s.subtypeId === subtypeId);
    return subtypeData?.jewelry || null;
  }
  
  // Return the first subtype's jewelry as default
  return elementData.subtypes[0]?.jewelry || null;
};

// Helper function to get element jewelry overview
export const getElementJewelryOverview = (elementId: string): ElementJewelryData | null => {
  return elementalJewelryData.find(e => e.elementId === elementId) || null;
};

// Metal color swatches for visual display
export const metalSwatches = {
  platinum: { name: 'Platinum', hex: '#E5E4E2', undertone: 'cool' },
  whiteGold: { name: 'White Gold', hex: '#F5F5F5', undertone: 'cool' },
  silver: { name: 'Sterling Silver', hex: '#C0C0C0', undertone: 'cool' },
  roseGold: { name: 'Rose Gold', hex: '#B76E79', undertone: 'neutral' },
  yellowGold: { name: 'Yellow Gold', hex: '#FFD700', undertone: 'warm' },
  bronze: { name: 'Bronze', hex: '#CD7F32', undertone: 'warm' },
  copper: { name: 'Copper', hex: '#B87333', undertone: 'warm' },
  brass: { name: 'Brass', hex: '#B5A642', undertone: 'warm' }
};
