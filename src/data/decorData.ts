// Decor and Environment Data for Elemental Types

export interface DecorRecommendation {
  category: string;
  items: string[];
  tip?: string;
}

export interface RoomStyle {
  name: string;
  description: string;
  image?: string;
}

export interface DecorEnvironment {
  overview: string;
  atmosphere: string;
  roomStyles: RoomStyle[];
  colorScheme: {
    walls: string[];
    accents: string[];
    neutrals: string[];
  };
  materials: string[];
  textures: string[];
  lighting: {
    type: string;
    description: string;
  }[];
  furniture: DecorRecommendation;
  textiles: DecorRecommendation;
  accents: DecorRecommendation;
  plants: DecorRecommendation;
  artStyle: string[];
  avoidList: string[];
  moodKeywords: string[];
}

export interface ElementDecorData {
  elementId: string;
  elementName: string;
  season: string;
  image: string;
  generalDescription: string;
  subtypes: {
    subtypeId: string;
    subtypeName: string;
    decor: DecorEnvironment;
  }[];
}

export const elementalDecorData: ElementDecorData[] = [
  {
    elementId: 'fire',
    elementName: 'Fire',
    season: 'Winter',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766034853942_daf82975.jpg',
    generalDescription: 'Fire types thrive in dramatic, high-contrast environments that reflect their bold and passionate nature. Winter palettes with striking contrasts, luxurious materials, and statement pieces create the perfect backdrop for Fire energy.',
    subtypes: [
      {
        subtypeId: 'fire-fire',
        subtypeName: 'Pure Fire (True Winter)',
        decor: {
          overview: 'Your space should be as dramatic and striking as you are. Embrace high contrast, pure colors, and bold statements that command attention.',
          atmosphere: 'Dramatic, sophisticated, and unapologetically bold. Your home should feel like a gallery of curated excellence.',
          roomStyles: [
            { name: 'Modern Glamour', description: 'Sleek lines with luxurious materials and dramatic lighting' },
            { name: 'Art Deco Revival', description: 'Bold geometric patterns with metallic accents and rich jewel tones' },
            { name: 'Contemporary Minimalist', description: 'Clean spaces with strategic pops of pure, saturated color' }
          ],
          colorScheme: {
            walls: ['Pure White (#FFFFFF)', 'Jet Black (#000000)', 'Deep Navy (#000080)'],
            accents: ['True Red (#C41E3A)', 'Emerald Green (#046307)', 'Royal Blue (#4169E1)', 'Magenta (#C71585)'],
            neutrals: ['Charcoal (#36454F)', 'Silver (#C0C0C0)', 'Cool Gray (#808080)']
          },
          materials: ['Polished marble', 'Chrome', 'Glass', 'Lacquered wood', 'Velvet', 'Silk', 'Patent leather'],
          textures: ['High-gloss finishes', 'Smooth velvet', 'Polished stone', 'Crisp cotton', 'Sleek metals'],
          lighting: [
            { type: 'Statement Chandeliers', description: 'Crystal or modern sculptural pieces that become focal points' },
            { type: 'Dramatic Spotlights', description: 'Directional lighting to highlight art and architectural features' },
            { type: 'Cool White LEDs', description: 'Crisp, clear light that enhances the high-contrast palette' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Black lacquered tables', 'White leather sofas', 'Chrome-framed chairs', 'Mirrored consoles', 'Geometric bookcases', 'Sculptural accent chairs'],
            tip: 'Choose pieces with clean lines and bold silhouettes. Avoid fussy details or rustic finishes.'
          },
          textiles: {
            category: 'Textiles',
            items: ['White crisp bedding', 'Black velvet throw pillows', 'Silver silk curtains', 'Red accent throws', 'Geometric patterned rugs'],
            tip: 'Stick to solid colors or bold geometric patterns. Avoid florals and organic prints.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Crystal vases', 'Silver picture frames', 'Abstract sculptures', 'Black and white photography', 'Geometric candle holders', 'Mirrored trays'],
            tip: 'Less is more. Choose a few statement pieces rather than many small items.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Architectural plants like snake plants', 'White orchids', 'Black planters', 'Single dramatic branches', 'Monstera in white pots'],
            tip: 'Choose plants with strong structural forms. Display in sleek, modern containers.'
          },
          artStyle: ['Abstract expressionism', 'Black and white photography', 'Bold contemporary art', 'Geometric prints', 'Pop art'],
          avoidList: ['Rustic or distressed finishes', 'Warm wood tones', 'Muted or dusty colors', 'Cluttered displays', 'Floral patterns', 'Bohemian elements'],
          moodKeywords: ['Dramatic', 'Sophisticated', 'Bold', 'Luxurious', 'Striking', 'Powerful']
        }
      },
      {
        subtypeId: 'fire-earth',
        subtypeName: 'Fire-Earth (Deep Winter)',
        decor: {
          overview: 'Your space blends Fire\'s drama with Earth\'s depth. Rich, saturated colors and luxurious natural materials create an atmosphere of powerful elegance.',
          atmosphere: 'Deep, mysterious, and intensely sophisticated. Your home should feel like a private sanctuary of refined luxury.',
          roomStyles: [
            { name: 'Dark Academia', description: 'Rich wood, leather, and deep jewel tones with intellectual charm' },
            { name: 'Modern Gothic', description: 'Dark elegance with contemporary touches and dramatic lighting' },
            { name: 'Luxe Library', description: 'Warm woods, deep colors, and curated collections' }
          ],
          colorScheme: {
            walls: ['Deep Burgundy (#722F37)', 'Forest Green (#228B22)', 'Espresso (#3C1414)'],
            accents: ['Mahogany (#4E0707)', 'Dark Teal (#014D4E)', 'Aubergine (#3D0734)'],
            neutrals: ['Charcoal Brown (#4A4036)', 'Pewter (#8A8D8F)', 'Dark Navy (#0D0D3D)']
          },
          materials: ['Dark walnut wood', 'Aged leather', 'Bronze', 'Velvet', 'Marble', 'Antiqued brass'],
          textures: ['Rich leather', 'Plush velvet', 'Woven wool', 'Polished wood grain', 'Hammered metal'],
          lighting: [
            { type: 'Warm Ambient Lighting', description: 'Layered lighting with dimmers for atmosphere' },
            { type: 'Brass Fixtures', description: 'Antique or brushed brass pendants and sconces' },
            { type: 'Candlelight', description: 'Strategic candles in dark metal holders for warmth' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Chesterfield sofas in deep leather', 'Dark wood bookcases', 'Velvet armchairs', 'Marble-topped tables', 'Antique desks', 'Tufted ottomans'],
            tip: 'Invest in substantial, well-crafted pieces with rich materials and classic silhouettes.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Burgundy velvet curtains', 'Dark plaid throws', 'Persian-style rugs', 'Leather pillows', 'Heavy wool blankets'],
            tip: 'Layer textures for depth. Mix velvet, leather, and wool for a rich, tactile experience.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Antique globes', 'Brass candlesticks', 'Vintage books', 'Dark wood frames', 'Crystal decanters', 'Botanical prints'],
            tip: 'Curate collections that tell a story. Quality over quantity.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Fiddle leaf figs', 'Dark-leafed plants', 'Dried botanicals', 'Preserved moss', 'Ferns in brass planters'],
            tip: 'Choose plants with deep green foliage. Display in antique or brass containers.'
          },
          artStyle: ['Classical paintings', 'Botanical illustrations', 'Dark moody photography', 'Vintage maps', 'Oil portraits'],
          avoidList: ['Bright primary colors', 'Light or bleached woods', 'Minimalist stark spaces', 'Plastic or synthetic materials', 'Trendy fast-decor'],
          moodKeywords: ['Deep', 'Mysterious', 'Luxurious', 'Intellectual', 'Powerful', 'Timeless']
        }
      },
      {
        subtypeId: 'fire-air',
        subtypeName: 'Fire-Air (Bright Winter)',
        decor: {
          overview: 'Your space should crackle with electric energy. Bright, saturated colors against crisp neutrals create an environment that\'s both dynamic and sophisticated.',
          atmosphere: 'Vibrant, energetic, and brilliantly modern. Your home should feel like a celebration of color and light.',
          roomStyles: [
            { name: 'Contemporary Bold', description: 'Clean lines with strategic pops of vivid color' },
            { name: 'Modern Eclectic', description: 'Mix of styles united by a bold color story' },
            { name: 'Urban Chic', description: 'Industrial elements softened with bright accents' }
          ],
          colorScheme: {
            walls: ['Bright White (#FAFAFA)', 'Soft Black (#1C1C1C)', 'Bright Navy (#000080)'],
            accents: ['Electric Blue (#0066FF)', 'Fuchsia (#FF00FF)', 'Cherry Red (#DE3163)', 'Violet (#8B00FF)'],
            neutrals: ['Cool Gray (#808080)', 'Icy Silver (#D8D8D8)', 'Black (#000000)']
          },
          materials: ['Acrylic', 'Chrome', 'Glass', 'High-gloss lacquer', 'Polished concrete', 'Neon'],
          textures: ['Smooth glossy surfaces', 'Clear lucite', 'Polished metal', 'Crisp fabrics', 'Sleek leather'],
          lighting: [
            { type: 'LED Color Accents', description: 'Strategic colored lighting for drama' },
            { type: 'Modern Pendants', description: 'Sculptural fixtures in chrome or colored glass' },
            { type: 'Natural Daylight', description: 'Maximize windows for bright, clear light' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Lucite chairs', 'White lacquered tables', 'Colorful accent chairs', 'Chrome shelving', 'Modular sofas', 'Glass coffee tables'],
            tip: 'Choose furniture with clean lines that won\'t compete with your bold color choices.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Bright colored pillows', 'White bedding with colorful accents', 'Geometric rugs', 'Sheer white curtains', 'Faux fur throws in white'],
            tip: 'Use textiles as your color delivery system. Keep furniture neutral, add color through accessories.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Colored glass vases', 'Modern sculptures', 'Neon signs', 'Pop art prints', 'Chrome accessories', 'Geometric objects'],
            tip: 'Don\'t be afraid of bold color. One statement piece per area creates impact without chaos.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Air plants in geometric holders', 'Succulents in colored pots', 'Bird of paradise', 'White planters', 'Hanging plants'],
            tip: 'Choose architectural plants. Display in modern, colorful containers.'
          },
          artStyle: ['Pop art', 'Color field painting', 'Modern graphic prints', 'Neon art', 'Bold photography'],
          avoidList: ['Muted or dusty colors', 'Rustic elements', 'Heavy traditional furniture', 'Busy patterns', 'Warm earthy tones'],
          moodKeywords: ['Electric', 'Vibrant', 'Dynamic', 'Modern', 'Bold', 'Energetic']
        }
      },
      {
        subtypeId: 'fire-water',
        subtypeName: 'Fire-Water (Cool Winter)',
        decor: {
          overview: 'Your space balances Fire\'s clarity with Water\'s softness. Cool, refined colors create an atmosphere of elegant sophistication.',
          atmosphere: 'Refined, serene, and elegantly cool. Your home should feel like a peaceful retreat with subtle drama.',
          roomStyles: [
            { name: 'Soft Modern', description: 'Clean contemporary lines with gentle color palette' },
            { name: 'Romantic Contemporary', description: 'Modern furniture with soft, romantic colors' },
            { name: 'Scandinavian Luxe', description: 'Nordic simplicity with touches of cool luxury' }
          ],
          colorScheme: {
            walls: ['Soft White (#F5F5F5)', 'Pale Gray (#E8E8E8)', 'Soft Navy (#3D4F6F)'],
            accents: ['Rose Pink (#FF66B2)', 'Periwinkle (#8E8EFF)', 'Raspberry (#E30B5C)', 'Plum (#8E4585)'],
            neutrals: ['Slate (#708090)', 'Blue Gray (#6699CC)', 'Cool Mauve (#915F6D)']
          },
          materials: ['Brushed silver', 'Soft velvet', 'Silk', 'Frosted glass', 'Light marble', 'Rose gold'],
          textures: ['Soft velvet', 'Smooth silk', 'Brushed metals', 'Plush fabrics', 'Matte finishes'],
          lighting: [
            { type: 'Soft Diffused Light', description: 'Frosted fixtures that create gentle illumination' },
            { type: 'Rose Gold Fixtures', description: 'Warm metallic accents in cool-toned spaces' },
            { type: 'Layered Ambient', description: 'Multiple soft light sources for atmosphere' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Gray velvet sofas', 'Rose gold accent tables', 'Soft curved chairs', 'Mirrored furniture', 'Upholstered beds', 'Lucite pieces'],
            tip: 'Choose furniture with soft curves and gentle silhouettes. Avoid harsh angles.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Lavender throws', 'Soft pink pillows', 'Gray silk curtains', 'Plush area rugs', 'Velvet bedding'],
            tip: 'Layer soft textures in your cool color palette. Mix matte and subtle sheen.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Crystal objects', 'Rose gold frames', 'Soft pink florals', 'Mercury glass', 'Delicate sculptures', 'Frosted vases'],
            tip: 'Choose accessories with a soft, romantic quality. Avoid anything too bold or harsh.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Pink orchids', 'Lavender plants', 'Soft ferns', 'White roses', 'Eucalyptus'],
            tip: 'Choose plants with soft, romantic appeal. Display in silver or white containers.'
          },
          artStyle: ['Soft abstract art', 'Watercolor paintings', 'Romantic photography', 'Impressionist prints', 'Delicate illustrations'],
          avoidList: ['Harsh primary colors', 'Heavy dark furniture', 'Rustic or rough textures', 'Warm earthy tones', 'Industrial elements'],
          moodKeywords: ['Refined', 'Elegant', 'Serene', 'Romantic', 'Sophisticated', 'Cool']
        }
      }
    ]
  },
  {
    elementId: 'water',
    elementName: 'Water',
    season: 'Summer',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766034871239_51f1226f.jpg',
    generalDescription: 'Water types flourish in soft, flowing environments that reflect their intuitive and graceful nature. Summer palettes with muted, dusty tones and gentle textures create the perfect sanctuary for Water energy.',
    subtypes: [
      {
        subtypeId: 'water-water',
        subtypeName: 'Pure Water (True Summer)',
        decor: {
          overview: 'Your space should flow like water itself—soft, graceful, and deeply calming. Muted, dusty colors create a serene sanctuary.',
          atmosphere: 'Peaceful, elegant, and softly romantic. Your home should feel like a gentle embrace.',
          roomStyles: [
            { name: 'Soft Romantic', description: 'Gentle curves, flowing fabrics, and muted colors' },
            { name: 'French Country Soft', description: 'Elegant simplicity with dusty pastels' },
            { name: 'Coastal Serene', description: 'Soft blues and sandy neutrals with flowing textures' }
          ],
          colorScheme: {
            walls: ['Dusty Rose (#D4A5A5)', 'Soft Blue (#6B8BA4)', 'Lavender (#B4A7D6)'],
            accents: ['Powder Pink (#E8C4C4)', 'Soft Teal (#5F9EA0)', 'Mauve (#C4A4C4)'],
            neutrals: ['Cocoa (#8B7D7B)', 'Soft Navy (#3D4F5F)', 'Rose Taupe (#B5A4A4)']
          },
          materials: ['Soft velvet', 'Linen', 'Silk', 'Brushed silver', 'Weathered wood', 'Soft cotton'],
          textures: ['Flowing fabrics', 'Soft velvet', 'Gentle linen', 'Plush carpets', 'Smooth ceramics'],
          lighting: [
            { type: 'Soft Ambient Glow', description: 'Diffused lighting that creates a gentle atmosphere' },
            { type: 'Sheer-Filtered Light', description: 'Natural light softened through flowing curtains' },
            { type: 'Candles', description: 'Soft candlelight for evening ambiance' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Curved sofas', 'Upholstered headboards', 'Soft armchairs', 'Round tables', 'Tufted ottomans', 'Slipcovered pieces'],
            tip: 'Choose furniture with soft edges and comfortable proportions. Avoid sharp angles.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Sheer curtains', 'Velvet pillows', 'Soft throws', 'Plush rugs', 'Linen bedding', 'Silk accents'],
            tip: 'Layer soft textures generously. Your space should invite touch.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Ceramic vases', 'Soft florals', 'Silver frames', 'Delicate figurines', 'Soft artwork', 'Crystal objects'],
            tip: 'Choose accessories with soft, rounded forms. Avoid harsh or angular pieces.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Soft ferns', 'Hydrangeas', 'Roses in soft colors', 'Trailing ivy', 'Lavender'],
            tip: 'Choose plants with soft, flowing forms. Display in ceramic or glass containers.'
          },
          artStyle: ['Impressionist paintings', 'Soft watercolors', 'Romantic photography', 'Floral prints', 'Soft abstracts'],
          avoidList: ['Bold primary colors', 'Sharp geometric patterns', 'Industrial materials', 'High contrast', 'Harsh lighting'],
          moodKeywords: ['Serene', 'Soft', 'Romantic', 'Peaceful', 'Graceful', 'Flowing']
        }
      },
      {
        subtypeId: 'water-air',
        subtypeName: 'Water-Air (Light Summer)',
        decor: {
          overview: 'Your space should feel light, airy, and delicately beautiful. Soft pastels and gentle light create an ethereal atmosphere.',
          atmosphere: 'Light, dreamy, and youthfully fresh. Your home should feel like a soft cloud.',
          roomStyles: [
            { name: 'Ethereal Light', description: 'Pale colors, sheer fabrics, and delicate details' },
            { name: 'Scandinavian Soft', description: 'Light woods, white walls, and soft pastel accents' },
            { name: 'Romantic Cottage', description: 'Soft florals, light colors, and vintage charm' }
          ],
          colorScheme: {
            walls: ['Soft Pink (#F4C2C2)', 'Sky Blue (#87CEEB)', 'Light Lavender (#E6E6FA)'],
            accents: ['Powder Blue (#B0E0E6)', 'Soft Mint (#98D8C8)', 'Pale Rose (#FFE4E1)'],
            neutrals: ['Light Gray (#D3D3D3)', 'Soft Taupe (#C4B7A6)', 'Off White (#FAF0E6)']
          },
          materials: ['Light linen', 'Soft cotton', 'Pale wood', 'Frosted glass', 'Delicate metals', 'Sheer fabrics'],
          textures: ['Light and airy', 'Soft and delicate', 'Gentle weaves', 'Smooth surfaces', 'Flowing sheers'],
          lighting: [
            { type: 'Natural Daylight', description: 'Maximize soft natural light through sheer curtains' },
            { type: 'Delicate Fixtures', description: 'Light, airy chandeliers and pendants' },
            { type: 'Soft White Light', description: 'Gentle illumination that doesn\'t overpower' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Light wood pieces', 'White painted furniture', 'Delicate chairs', 'Soft upholstery', 'Glass tables', 'Wicker accents'],
            tip: 'Choose light, delicate pieces that don\'t overwhelm the space.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Sheer white curtains', 'Soft pastel bedding', 'Light throws', 'Delicate lace', 'Soft cotton rugs'],
            tip: 'Keep textiles light and airy. Avoid heavy or dark fabrics.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Delicate vases', 'Soft florals', 'Light frames', 'Crystal pieces', 'Vintage mirrors', 'Soft artwork'],
            tip: 'Choose delicate, feminine accessories. Less is more in light spaces.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Baby\'s breath', 'Soft ferns', 'White flowers', 'Trailing plants', 'Soft greenery'],
            tip: 'Choose delicate plants with soft forms. Display in white or glass containers.'
          },
          artStyle: ['Soft watercolors', 'Light photography', 'Delicate illustrations', 'Impressionist prints', 'Botanical art'],
          avoidList: ['Dark colors', 'Heavy furniture', 'Bold patterns', 'Industrial elements', 'Harsh lighting'],
          moodKeywords: ['Light', 'Airy', 'Delicate', 'Dreamy', 'Fresh', 'Ethereal']
        }
      },
      {
        subtypeId: 'water-earth',
        subtypeName: 'Water-Earth (Soft Summer)',
        decor: {
          overview: 'Your space blends Water\'s softness with Earth\'s groundedness. Muted, dusty tones create a sophisticated and calming environment.',
          atmosphere: 'Understated, sophisticated, and quietly elegant. Your home should feel like a refined retreat.',
          roomStyles: [
            { name: 'Soft Modern', description: 'Clean lines softened with muted colors and textures' },
            { name: 'Organic Contemporary', description: 'Natural materials in soft, muted tones' },
            { name: 'Quiet Luxury', description: 'Understated elegance with quality materials' }
          ],
          colorScheme: {
            walls: ['Dusty Pink (#D8B4B4)', 'Sage (#9CAF88)', 'Dusty Blue (#8BA8B7)'],
            accents: ['Soft Mauve (#C4A4B4)', 'Muted Teal (#6B8E8E)', 'Dusty Rose (#C4A4A4)'],
            neutrals: ['Mushroom (#A4978E)', 'Soft Charcoal (#6B6B6B)', 'Greige (#B8B0A8)']
          },
          materials: ['Natural linen', 'Soft wool', 'Matte ceramics', 'Weathered wood', 'Soft leather', 'Natural stone'],
          textures: ['Soft matte finishes', 'Gentle weaves', 'Natural grains', 'Plush but understated', 'Organic textures'],
          lighting: [
            { type: 'Soft Ambient', description: 'Gentle, diffused lighting throughout' },
            { type: 'Natural Materials', description: 'Fixtures in natural materials like wood or ceramic' },
            { type: 'Layered Light', description: 'Multiple soft sources for depth' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Low-profile sofas', 'Natural wood tables', 'Soft upholstered chairs', 'Organic shapes', 'Quality basics', 'Comfortable seating'],
            tip: 'Invest in quality, comfortable pieces in muted tones. Avoid trendy or flashy items.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Linen curtains', 'Wool throws', 'Soft cotton bedding', 'Natural fiber rugs', 'Muted pillows'],
            tip: 'Choose natural fibers in soft, muted colors. Layer for comfort and depth.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Ceramic vessels', 'Natural objects', 'Soft artwork', 'Woven baskets', 'Muted frames', 'Organic sculptures'],
            tip: 'Choose accessories with natural, organic qualities. Avoid anything too bright or shiny.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Soft ferns', 'Olive branches', 'Eucalyptus', 'Dried florals', 'Soft greenery'],
            tip: 'Choose plants with soft, muted green tones. Display in natural containers.'
          },
          artStyle: ['Soft abstract art', 'Nature photography', 'Muted landscapes', 'Organic prints', 'Subtle textures'],
          avoidList: ['Bright colors', 'Shiny surfaces', 'Bold patterns', 'High contrast', 'Synthetic materials'],
          moodKeywords: ['Understated', 'Sophisticated', 'Calm', 'Natural', 'Refined', 'Grounded']
        }
      },
      {
        subtypeId: 'water-fire',
        subtypeName: 'Water-Fire (Cool Summer)',
        decor: {
          overview: 'Your space balances Water\'s coolness with Fire\'s clarity. Cool, clear colors create an atmosphere of refined elegance.',
          atmosphere: 'Cool, refined, and elegantly clear. Your home should feel like a sophisticated sanctuary.',
          roomStyles: [
            { name: 'Cool Contemporary', description: 'Modern lines with cool, clear color palette' },
            { name: 'Elegant Traditional', description: 'Classic furniture in cool, refined tones' },
            { name: 'Artistic Modern', description: 'Clean spaces with artistic cool-toned accents' }
          ],
          colorScheme: {
            walls: ['Rose Pink (#E8A4B8)', 'Cool Blue (#6495ED)', 'Soft White (#F8F8F8)'],
            accents: ['Orchid (#DA70D6)', 'Raspberry (#C4647C)', 'Teal (#4A8B8B)', 'Wisteria (#C9A0DC)'],
            neutrals: ['Charcoal (#4A4A4A)', 'Cool Gray (#8B8B8B)', 'Slate (#708090)']
          },
          materials: ['Cool metals', 'Glass', 'Polished stone', 'Silk', 'Velvet', 'Crystal'],
          textures: ['Smooth and polished', 'Soft velvet', 'Cool silk', 'Clear glass', 'Refined finishes'],
          lighting: [
            { type: 'Clear Cool Light', description: 'Crisp lighting that enhances cool tones' },
            { type: 'Crystal Fixtures', description: 'Elegant crystal chandeliers and pendants' },
            { type: 'Accent Lighting', description: 'Strategic lighting to highlight art and features' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Velvet sofas in cool tones', 'Glass tables', 'Elegant chairs', 'Mirrored pieces', 'Silver accents', 'Refined classics'],
            tip: 'Choose elegant pieces with refined lines. Mix traditional and modern for sophistication.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Silk curtains', 'Velvet pillows', 'Cool-toned bedding', 'Elegant rugs', 'Soft throws'],
            tip: 'Choose luxurious fabrics in cool, clear colors. Avoid warm or muted tones.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Crystal vases', 'Silver frames', 'Cool artwork', 'Elegant sculptures', 'Mirrored accessories', 'Fresh flowers'],
            tip: 'Choose elegant accessories with cool, refined qualities. Quality over quantity.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Orchids', 'Cool-toned flowers', 'Elegant greenery', 'White blooms', 'Structured plants'],
            tip: 'Choose elegant plants with cool-toned blooms. Display in crystal or silver containers.'
          },
          artStyle: ['Cool abstract art', 'Elegant photography', 'Classical prints', 'Cool-toned paintings', 'Refined illustrations'],
          avoidList: ['Warm colors', 'Rustic elements', 'Muted dusty tones', 'Heavy furniture', 'Casual styling'],
          moodKeywords: ['Cool', 'Refined', 'Elegant', 'Clear', 'Sophisticated', 'Artistic']
        }
      }
    ]
  },
  {
    elementId: 'earth',
    elementName: 'Earth',
    season: 'Autumn',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766034889946_5ebc8bef.jpg',
    generalDescription: 'Earth types thrive in warm, grounded environments that reflect their nurturing and stable nature. Autumn palettes with rich, organic tones and natural materials create the perfect foundation for Earth energy.',
    subtypes: [
      {
        subtypeId: 'earth-earth',
        subtypeName: 'Pure Earth (True Autumn)',
        decor: {
          overview: 'Your space should feel like a warm embrace from nature itself. Rich, earthy colors and natural materials create a nurturing sanctuary.',
          atmosphere: 'Warm, inviting, and deeply comforting. Your home should feel like a cozy retreat in nature.',
          roomStyles: [
            { name: 'Organic Modern', description: 'Clean lines with warm natural materials' },
            { name: 'Rustic Refined', description: 'Natural elements elevated with quality craftsmanship' },
            { name: 'Bohemian Warm', description: 'Layered textures and warm, earthy colors' }
          ],
          colorScheme: {
            walls: ['Terracotta (#CC4E3E)', 'Olive (#808000)', 'Warm Brown (#8B4513)'],
            accents: ['Pumpkin (#FF7518)', 'Mustard (#FFDB58)', 'Moss (#4A5D23)', 'Copper (#B87333)'],
            neutrals: ['Cream (#FFFDD0)', 'Camel (#C19A6B)', 'Khaki (#C3B091)']
          },
          materials: ['Natural wood', 'Leather', 'Wool', 'Terracotta', 'Copper', 'Woven fibers', 'Natural stone'],
          textures: ['Rough wood grain', 'Soft leather', 'Woven textiles', 'Natural fibers', 'Organic patterns'],
          lighting: [
            { type: 'Warm Ambient', description: 'Golden-toned lighting for cozy atmosphere' },
            { type: 'Natural Materials', description: 'Fixtures in wood, copper, or woven materials' },
            { type: 'Firelight', description: 'Fireplaces or candles for authentic warmth' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Leather sofas', 'Wooden tables', 'Woven chairs', 'Upholstered pieces in warm tones', 'Antique wood pieces', 'Comfortable seating'],
            tip: 'Choose substantial, well-crafted pieces in natural materials. Comfort is key.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Wool throws', 'Leather pillows', 'Natural fiber rugs', 'Linen curtains', 'Woven blankets'],
            tip: 'Layer natural textures generously. Mix leather, wool, and linen for depth.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Terracotta pots', 'Copper vessels', 'Woven baskets', 'Natural objects', 'Wooden frames', 'Handcrafted items'],
            tip: 'Choose handmade and natural accessories. Display collections of natural objects.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Fiddle leaf figs', 'Pothos', 'Dried flowers', 'Succulents', 'Herbs', 'Autumn branches'],
            tip: 'Bring nature indoors abundantly. Use terracotta or woven containers.'
          },
          artStyle: ['Landscape paintings', 'Botanical prints', 'Nature photography', 'Folk art', 'Handcrafted pieces'],
          avoidList: ['Cool colors', 'Synthetic materials', 'High-gloss finishes', 'Minimalist stark spaces', 'Chrome or silver'],
          moodKeywords: ['Warm', 'Nurturing', 'Natural', 'Cozy', 'Grounded', 'Authentic']
        }
      },
      {
        subtypeId: 'earth-fire',
        subtypeName: 'Earth-Fire (Deep Autumn)',
        decor: {
          overview: 'Your space combines Earth\'s warmth with Fire\'s intensity. Deep, rich colors and luxurious natural materials create a powerful sanctuary.',
          atmosphere: 'Rich, intense, and deeply luxurious. Your home should feel like a sophisticated lodge.',
          roomStyles: [
            { name: 'Luxe Lodge', description: 'Rich woods, deep colors, and sophisticated comfort' },
            { name: 'Moody Organic', description: 'Dark, rich tones with natural materials' },
            { name: 'Refined Rustic', description: 'Elevated natural elements with deep color palette' }
          ],
          colorScheme: {
            walls: ['Burgundy (#722F37)', 'Forest Green (#228B22)', 'Burnt Sienna (#8A3324)'],
            accents: ['Mahogany (#4E0707)', 'Dark Teal (#014D4E)', 'Bronze (#CD7F32)'],
            neutrals: ['Espresso (#3C1414)', 'Dark Brown (#3D2314)', 'Warm Black (#1C1410)']
          },
          materials: ['Dark wood', 'Rich leather', 'Bronze', 'Velvet', 'Natural stone', 'Aged metals'],
          textures: ['Rich leather', 'Deep velvet', 'Rough stone', 'Aged wood', 'Heavy wool'],
          lighting: [
            { type: 'Warm Low Light', description: 'Moody, atmospheric lighting' },
            { type: 'Bronze Fixtures', description: 'Aged metal fixtures with warm glow' },
            { type: 'Fireplace', description: 'Real or gas fireplace as focal point' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Dark leather sofas', 'Heavy wood tables', 'Velvet armchairs', 'Antique pieces', 'Substantial seating', 'Dark wood bookcases'],
            tip: 'Choose substantial, high-quality pieces with rich materials. Invest in classics.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Velvet curtains', 'Leather pillows', 'Persian rugs', 'Heavy throws', 'Rich bedding'],
            tip: 'Layer rich, heavy textures. Deep colors and luxurious materials.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Bronze sculptures', 'Antique objects', 'Dark frames', 'Vintage books', 'Crystal decanters', 'Aged metals'],
            tip: 'Choose substantial, quality accessories with history and character.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Dark-leafed plants', 'Dried botanicals', 'Preserved moss', 'Branches', 'Ferns'],
            tip: 'Choose plants with deep green foliage. Display in bronze or dark containers.'
          },
          artStyle: ['Dark landscapes', 'Classical paintings', 'Moody photography', 'Antique maps', 'Rich still lifes'],
          avoidList: ['Light colors', 'Bright accents', 'Minimalist styling', 'Chrome or silver', 'Synthetic materials'],
          moodKeywords: ['Rich', 'Intense', 'Luxurious', 'Powerful', 'Sophisticated', 'Deep']
        }
      },
      {
        subtypeId: 'earth-water',
        subtypeName: 'Earth-Water (Soft Autumn)',
        decor: {
          overview: 'Your space blends Earth\'s warmth with Water\'s softness. Muted, dusty warm tones create a gentle, sophisticated environment.',
          atmosphere: 'Soft, sophisticated, and quietly elegant. Your home should feel like a peaceful retreat.',
          roomStyles: [
            { name: 'Soft Organic', description: 'Natural materials in muted, soft tones' },
            { name: 'Quiet Bohemian', description: 'Layered textures in understated colors' },
            { name: 'Gentle Modern', description: 'Clean lines softened with muted warmth' }
          ],
          colorScheme: {
            walls: ['Dusty Rose (#C4A4A4)', 'Sage (#9CAF88)', 'Soft Terracotta (#C4847C)'],
            accents: ['Dusty Coral (#C4948C)', 'Muted Olive (#8B8B6B)', 'Soft Gold (#C4B47C)'],
            neutrals: ['Mushroom (#A4978E)', 'Greige (#B8B0A8)', 'Stone (#918E85)']
          },
          materials: ['Soft linen', 'Natural wool', 'Matte ceramics', 'Weathered wood', 'Soft leather', 'Natural fibers'],
          textures: ['Soft matte finishes', 'Gentle weaves', 'Natural grains', 'Plush but understated', 'Organic textures'],
          lighting: [
            { type: 'Soft Warm Light', description: 'Gentle, diffused warm lighting' },
            { type: 'Natural Fixtures', description: 'Ceramic, wood, or linen lamp shades' },
            { type: 'Candles', description: 'Soft candlelight for atmosphere' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Soft upholstered sofas', 'Natural wood tables', 'Comfortable chairs', 'Organic shapes', 'Quality basics'],
            tip: 'Choose comfortable, quality pieces in soft, muted tones.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Linen curtains', 'Soft wool throws', 'Natural fiber rugs', 'Muted pillows', 'Soft bedding'],
            tip: 'Layer soft, natural textures in muted warm tones.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Ceramic vessels', 'Woven baskets', 'Soft artwork', 'Natural objects', 'Muted frames'],
            tip: 'Choose accessories with soft, natural qualities. Understated elegance.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Soft ferns', 'Dried flowers', 'Eucalyptus', 'Olive branches', 'Soft greenery'],
            tip: 'Choose plants with soft, muted tones. Display in natural containers.'
          },
          artStyle: ['Soft landscapes', 'Muted abstracts', 'Nature photography', 'Botanical prints', 'Gentle watercolors'],
          avoidList: ['Bright colors', 'High contrast', 'Shiny surfaces', 'Bold patterns', 'Cool tones'],
          moodKeywords: ['Soft', 'Sophisticated', 'Gentle', 'Natural', 'Peaceful', 'Understated']
        }
      },
      {
        subtypeId: 'earth-air',
        subtypeName: 'Earth-Air (Warm Autumn)',
        decor: {
          overview: 'Your space radiates with golden warmth. Bright, warm colors and natural materials create a sunny, optimistic environment.',
          atmosphere: 'Sunny, warm, and joyfully inviting. Your home should feel like eternal golden hour.',
          roomStyles: [
            { name: 'Sunny Organic', description: 'Bright natural materials with golden tones' },
            { name: 'Warm Modern', description: 'Clean lines with warm, vibrant accents' },
            { name: 'Golden Bohemian', description: 'Layered warmth with sunny colors' }
          ],
          colorScheme: {
            walls: ['Pumpkin (#FF7518)', 'Golden Yellow (#FFD700)', 'Warm Coral (#FF6F61)'],
            accents: ['Tangerine (#FF9966)', 'Amber (#FFBF00)', 'Chartreuse (#7FFF00)'],
            neutrals: ['Camel (#C19A6B)', 'Warm Beige (#D4C4A8)', 'Cream (#FFFDD0)']
          },
          materials: ['Golden wood', 'Brass', 'Natural fibers', 'Warm leather', 'Rattan', 'Woven materials'],
          textures: ['Warm wood grain', 'Natural weaves', 'Soft leather', 'Organic patterns', 'Sunny fabrics'],
          lighting: [
            { type: 'Golden Light', description: 'Warm, sunny lighting throughout' },
            { type: 'Brass Fixtures', description: 'Polished or brushed brass pendants and lamps' },
            { type: 'Natural Light', description: 'Maximize warm natural daylight' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Light wood furniture', 'Rattan pieces', 'Warm upholstery', 'Brass accents', 'Comfortable seating', 'Natural materials'],
            tip: 'Choose furniture in warm, golden tones. Mix natural materials freely.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Golden throws', 'Warm pillows', 'Natural fiber rugs', 'Sunny curtains', 'Warm bedding'],
            tip: 'Use textiles to add pops of warm, sunny color throughout.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Brass objects', 'Golden frames', 'Woven baskets', 'Sunny artwork', 'Natural objects', 'Warm ceramics'],
            tip: 'Choose accessories that radiate warmth. Brass and gold are your friends.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Sunflowers', 'Golden pothos', 'Citrus trees', 'Warm-toned flowers', 'Abundant greenery'],
            tip: 'Fill your space with plants. Use brass or terracotta containers.'
          },
          artStyle: ['Sunny landscapes', 'Warm abstracts', 'Golden photography', 'Botanical prints', 'Joyful art'],
          avoidList: ['Cool colors', 'Gray tones', 'Dark heavy furniture', 'Minimalist stark spaces', 'Chrome or silver'],
          moodKeywords: ['Sunny', 'Warm', 'Joyful', 'Golden', 'Optimistic', 'Radiant']
        }
      }
    ]
  },
  {
    elementId: 'air',
    elementName: 'Air',
    season: 'Spring',
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1766034910588_e5ef0847.png',
    generalDescription: 'Air types flourish in light, bright environments that reflect their free-spirited and optimistic nature. Spring palettes with warm, clear colors and fresh materials create the perfect atmosphere for Air energy.',
    subtypes: [
      {
        subtypeId: 'air-air',
        subtypeName: 'Pure Air (True Spring)',
        decor: {
          overview: 'Your space should feel fresh, bright, and full of possibility. Clear, warm colors and light materials create an optimistic sanctuary.',
          atmosphere: 'Fresh, vibrant, and joyfully alive. Your home should feel like a spring morning.',
          roomStyles: [
            { name: 'Fresh Modern', description: 'Clean lines with warm, clear color accents' },
            { name: 'Cheerful Contemporary', description: 'Light spaces with pops of vibrant color' },
            { name: 'Organic Light', description: 'Natural materials in bright, fresh tones' }
          ],
          colorScheme: {
            walls: ['Coral (#FF7F50)', 'Warm Yellow (#FFE135)', 'Apple Green (#8DB600)'],
            accents: ['Peach (#FFCBA4)', 'Aqua (#00CED1)', 'Warm Pink (#FF6B6B)'],
            neutrals: ['Ivory (#FFFFF0)', 'Camel (#C19A6B)', 'Warm Beige (#D4C4A8)']
          },
          materials: ['Light wood', 'Natural fibers', 'Glass', 'Brass', 'Cotton', 'Linen'],
          textures: ['Light and airy', 'Natural weaves', 'Smooth surfaces', 'Fresh fabrics', 'Organic patterns'],
          lighting: [
            { type: 'Natural Daylight', description: 'Maximize bright, natural light' },
            { type: 'Warm White Light', description: 'Clear, warm artificial lighting' },
            { type: 'Brass Fixtures', description: 'Warm metallic accents in lighting' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Light wood pieces', 'Comfortable upholstery', 'Glass tables', 'Brass accents', 'Fresh colored chairs', 'Natural materials'],
            tip: 'Choose light, fresh furniture that doesn\'t weigh down the space.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Colorful pillows', 'Light curtains', 'Fresh bedding', 'Natural fiber rugs', 'Cotton throws'],
            tip: 'Use textiles to add pops of your clear, warm colors.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Fresh flowers', 'Colorful vases', 'Brass objects', 'Cheerful artwork', 'Natural objects', 'Glass pieces'],
            tip: 'Choose accessories that feel fresh and alive. Fresh flowers are essential.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Fresh flowers', 'Herbs', 'Bright green plants', 'Flowering plants', 'Citrus trees'],
            tip: 'Fill your space with living plants. Fresh flowers always.'
          },
          artStyle: ['Bright abstracts', 'Floral prints', 'Cheerful photography', 'Botanical art', 'Colorful illustrations'],
          avoidList: ['Dark colors', 'Heavy furniture', 'Muted tones', 'Cool grays', 'Cluttered spaces'],
          moodKeywords: ['Fresh', 'Bright', 'Optimistic', 'Vibrant', 'Joyful', 'Alive']
        }
      },
      {
        subtypeId: 'air-water',
        subtypeName: 'Air-Water (Light Spring)',
        decor: {
          overview: 'Your space should feel light, delicate, and softly warm. Gentle pastels and light materials create a tender, nurturing environment.',
          atmosphere: 'Light, gentle, and tenderly warm. Your home should feel like a soft spring breeze.',
          roomStyles: [
            { name: 'Soft Light', description: 'Delicate colors with gentle warmth' },
            { name: 'Romantic Fresh', description: 'Light, feminine touches with warm undertones' },
            { name: 'Gentle Modern', description: 'Clean lines softened with delicate colors' }
          ],
          colorScheme: {
            walls: ['Peach (#FFCBA4)', 'Light Coral (#F08080)', 'Soft Yellow (#FFFACD)'],
            accents: ['Light Aqua (#E0FFFF)', 'Blush (#FFB6C1)', 'Mint (#98FB98)'],
            neutrals: ['Cream (#FFFDD0)', 'Light Beige (#F5F5DC)', 'Warm White (#FAF9F6)']
          },
          materials: ['Light linen', 'Soft cotton', 'Pale wood', 'Delicate metals', 'Sheer fabrics', 'Natural fibers'],
          textures: ['Light and delicate', 'Soft and gentle', 'Smooth surfaces', 'Airy fabrics', 'Subtle patterns'],
          lighting: [
            { type: 'Soft Natural Light', description: 'Gentle daylight through sheer curtains' },
            { type: 'Delicate Fixtures', description: 'Light, airy pendants and lamps' },
            { type: 'Warm Soft Glow', description: 'Gentle, warm artificial light' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Light wood pieces', 'Soft upholstery', 'Delicate chairs', 'Glass accents', 'Comfortable seating', 'Gentle curves'],
            tip: 'Choose light, delicate pieces that feel soft and welcoming.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Soft pastel pillows', 'Sheer curtains', 'Light throws', 'Delicate bedding', 'Soft rugs'],
            tip: 'Layer soft, light textiles in gentle warm tones.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Soft florals', 'Delicate vases', 'Light frames', 'Gentle artwork', 'Natural objects', 'Soft ceramics'],
            tip: 'Choose delicate, feminine accessories with soft warmth.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Soft flowers', 'Delicate ferns', 'Trailing plants', 'Soft greenery', 'Fresh blooms'],
            tip: 'Choose soft, delicate plants. Display in light, pretty containers.'
          },
          artStyle: ['Soft watercolors', 'Delicate illustrations', 'Gentle photography', 'Floral prints', 'Light abstracts'],
          avoidList: ['Dark colors', 'Heavy furniture', 'Bold patterns', 'Cool tones', 'Harsh lighting'],
          moodKeywords: ['Light', 'Gentle', 'Soft', 'Tender', 'Delicate', 'Warm']
        }
      },
      {
        subtypeId: 'air-fire',
        subtypeName: 'Air-Fire (Bright Spring)',
        decor: {
          overview: 'Your space should crackle with vibrant energy. Bright, saturated warm colors create an exciting, dynamic environment.',
          atmosphere: 'Vibrant, energetic, and brilliantly alive. Your home should feel like a celebration.',
          roomStyles: [
            { name: 'Bold Fresh', description: 'Clean spaces with vivid color statements' },
            { name: 'Energetic Modern', description: 'Contemporary design with bright accents' },
            { name: 'Playful Contemporary', description: 'Fun, colorful spaces with modern lines' }
          ],
          colorScheme: {
            walls: ['Hot Coral (#FF6B6B)', 'Electric Yellow (#FFFF00)', 'Bright Turquoise (#00CED1)'],
            accents: ['Vivid Orange (#FF6600)', 'Bright Green (#00FF00)', 'Hot Pink (#FF69B4)'],
            neutrals: ['Pure White (#FFFFFF)', 'Warm Black (#1C1410)', 'Clear Gray (#A0A0A0)']
          },
          materials: ['Glass', 'Acrylic', 'Polished metals', 'High-gloss surfaces', 'Bright fabrics', 'Modern materials'],
          textures: ['Smooth and glossy', 'Clean surfaces', 'Crisp fabrics', 'Polished finishes', 'Bold patterns'],
          lighting: [
            { type: 'Bright Clear Light', description: 'Maximum bright, clear lighting' },
            { type: 'Statement Fixtures', description: 'Bold, modern lighting as art' },
            { type: 'Color Accents', description: 'Strategic colored lighting for drama' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Modern pieces', 'Colorful chairs', 'Glass tables', 'Bold sofas', 'Statement furniture', 'Clean lines'],
            tip: 'Choose furniture that can handle bold color. Keep shapes clean and modern.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Bright pillows', 'Bold rugs', 'Colorful throws', 'Graphic patterns', 'Statement curtains'],
            tip: 'Use textiles as your color delivery system. Go bold!'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Colorful art', 'Bold vases', 'Modern sculptures', 'Graphic prints', 'Statement objects', 'Bright ceramics'],
            tip: 'Choose accessories that make a statement. Bold and bright.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Tropical plants', 'Colorful flowers', 'Bold greenery', 'Bird of paradise', 'Bright blooms'],
            tip: 'Choose dramatic, tropical plants. Display in colorful containers.'
          },
          artStyle: ['Pop art', 'Bold abstracts', 'Graphic prints', 'Colorful photography', 'Modern art'],
          avoidList: ['Muted colors', 'Heavy traditional furniture', 'Dusty tones', 'Cool grays', 'Cluttered spaces'],
          moodKeywords: ['Vibrant', 'Energetic', 'Bold', 'Exciting', 'Dynamic', 'Alive']
        }
      },
      {
        subtypeId: 'air-earth',
        subtypeName: 'Air-Earth (Warm Spring)',
        decor: {
          overview: 'Your space radiates golden warmth with natural elements. Warm, sunny colors and organic materials create a nurturing, optimistic environment.',
          atmosphere: 'Warm, nurturing, and radiantly golden. Your home should feel like sunshine.',
          roomStyles: [
            { name: 'Golden Organic', description: 'Natural materials in warm, sunny tones' },
            { name: 'Warm Modern', description: 'Clean lines with golden accents' },
            { name: 'Sunny Natural', description: 'Bright, warm spaces with organic elements' }
          ],
          colorScheme: {
            walls: ['Warm Coral (#FF6F61)', 'Golden Yellow (#FFD700)', 'Warm Peach (#FFDAB9)'],
            accents: ['Amber (#FFBF00)', 'Warm Green (#9ACD32)', 'Salmon (#FA8072)'],
            neutrals: ['Cream (#FFFDD0)', 'Warm Beige (#D4C4A8)', 'Caramel (#FFD59A)']
          },
          materials: ['Golden wood', 'Brass', 'Natural fibers', 'Warm leather', 'Rattan', 'Organic materials'],
          textures: ['Warm wood grain', 'Natural weaves', 'Soft leather', 'Organic patterns', 'Golden finishes'],
          lighting: [
            { type: 'Golden Warm Light', description: 'Warm, sunny lighting throughout' },
            { type: 'Brass Fixtures', description: 'Polished brass pendants and lamps' },
            { type: 'Natural Daylight', description: 'Maximize warm natural light' }
          ],
          furniture: {
            category: 'Furniture',
            items: ['Light wood furniture', 'Rattan pieces', 'Warm upholstery', 'Brass accents', 'Natural materials', 'Comfortable seating'],
            tip: 'Choose furniture in warm, golden tones with natural materials.'
          },
          textiles: {
            category: 'Textiles',
            items: ['Golden throws', 'Warm pillows', 'Natural fiber rugs', 'Sunny curtains', 'Organic bedding'],
            tip: 'Layer warm, natural textiles. Golden and peachy tones.'
          },
          accents: {
            category: 'Decorative Accents',
            items: ['Brass objects', 'Golden frames', 'Woven baskets', 'Warm artwork', 'Natural objects', 'Sunny ceramics'],
            tip: 'Choose accessories that radiate warmth and natural beauty.'
          },
          plants: {
            category: 'Plants & Nature',
            items: ['Sunflowers', 'Golden pothos', 'Citrus trees', 'Warm flowers', 'Abundant greenery'],
            tip: 'Fill your space with living plants. Brass and terracotta containers.'
          },
          artStyle: ['Warm landscapes', 'Golden abstracts', 'Botanical prints', 'Sunny photography', 'Nature art'],
          avoidList: ['Cool colors', 'Gray tones', 'Dark furniture', 'Minimalist stark spaces', 'Chrome or silver'],
          moodKeywords: ['Warm', 'Golden', 'Nurturing', 'Sunny', 'Natural', 'Radiant']
        }
      }
    ]
  }
];

// Helper function to get decor data for a specific element and subtype
export const getDecorData = (elementId: string, subtypeId?: string): DecorEnvironment | null => {
  const elementData = elementalDecorData.find(e => e.elementId === elementId);
  if (!elementData) return null;
  
  if (subtypeId) {
    const subtypeData = elementData.subtypes.find(s => s.subtypeId === subtypeId);
    return subtypeData?.decor || null;
  }
  
  // Return the first subtype's decor as default
  return elementData.subtypes[0]?.decor || null;
};

// Helper function to get element decor overview
export const getElementDecorOverview = (elementId: string): ElementDecorData | null => {
  return elementalDecorData.find(e => e.elementId === elementId) || null;
};
