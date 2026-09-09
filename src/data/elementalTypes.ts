// Elemental Type Data with Elemental Subtypes
export interface ColorSwatch {
  name: string;
  hex: string;
  category: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface ElementalExpression {
  inNature: string;
  themes: string[];
  archetypes: string[];
}

export interface FamousFace {
  name: string;
  image: string;
  description: string;
  category: 'celebrity' | 'historical' | 'fictional';
}

export interface MakeupProduct {
  name: string;
  brand: string;
  price: number;
  url: string;
}

export interface MakeupColor {
  name: string;
  hex: string;
  description?: string;
  products?: MakeupProduct[];
}

export interface MakeupPalette {
  eyeshadow: MakeupColor[];
  mascara: MakeupColor[];
  lipstick: MakeupColor[];
  blush: MakeupColor[];
  foundation: {
    undertone: 'cool' | 'warm' | 'neutral';
    description: string;
    shades: MakeupColor[];
  };
  tips: string[];
}


export interface ElementalSubtype {
  id: string;
  name: string;
  shortName: string;
  seasonalName: string;
  description: string;
  characteristics: string[];
  colors: ColorSwatch[];
  elementalExpression: ElementalExpression;
  famousFaces?: FamousFace[];
  makeup?: MakeupPalette;
}

export interface ElementalType {
  id: string;
  name: string;
  season: string;
  tagline: string;
  description: string;
  nature: string;
  characteristics: string[];
  stylingPhilosophy: string;
  colors: ColorSwatch[];
  image: string;
  subtypes: ElementalSubtype[];
}







export const elementalTypes: ElementalType[] = [
  {
    id: 'fire',
    name: 'Fire',
    season: 'Winter',
    tagline: 'Intense, Energetic, Transformative',
    description: 'Fire types radiate warmth, confidence, and dynamic energy. You possess striking contrast and clarity, like the hot flame of a candle or the light of the burning sun that bring awareness and consciousness. You possess an innate magnetism that draws people towards you and your visible presence commands attention. You\'re not "warm-toned" - you\'re energetically fiery, with an inner voltage that can fuel a room. While your colors may be bold or strong, without them you dull your spark or weaken your energy. You don\'t just wear color; you activate it and vibrate it.',
    nature: 'Your energy is transformative. Fire types metamorphose and ignite change and inspire action in others. You thrive in environments where you can express your creativity and drive. Fire types see possibilities where others see obstacles. Closest to the Winter seasonal color type, your palette reflects your dramatic, high-contrast nature. Yet, your element is not confined to one season and goes beyond surface appearance to the deeper inner landscape to show how you utilize and express your energy. Essentially, do you burn, flow, think, or grow? As Fire, you burn. To find out how you burn, view the subtypes above.',




    characteristics: [
      'Natural charisma and leadership presence',
      'Passionate and enthusiastic approach to life',
      'Bold decision-making and risk-taking',
      'Creative and innovative thinking',
      'Warm and generous with loved ones',
      'High energy and action-oriented'
    ],
    stylingPhilosophy: 'Your wardrobe is how you achieve self alignment, visual coherence and personal sovereignty. For Fire types, your wardrobe should reflect your dynamic spirit using the strong and dramatic contrast of your color palette. Embrace rich, bold, or deep tones that mirror your inner fire—true reds, stark whites, and luxurious blacks. Your clothing should make a statement, featuring bold silhouettes and confident cuts that match your commanding presence. However your elemental subtype manifests, remember as fire you are the fuel. Start by Refueling Your Wardrobe with the Elemental Wardrobe Review.',

    colors: [
      { name: 'True Red', hex: '#C41E3A', category: 'primary' },
      { name: 'Pure White', hex: '#FFFFFF', category: 'primary' },
      { name: 'Jet Black', hex: '#0A0A0A', category: 'primary' },
      { name: 'Magenta', hex: '#C71585', category: 'secondary' },
      { name: 'Royal Blue', hex: '#4169E1', category: 'secondary' },
      { name: 'Emerald', hex: '#046307', category: 'secondary' },
      { name: 'Hot Pink', hex: '#FF1493', category: 'accent' },
      { name: 'Icy Silver', hex: '#C0C0C0', category: 'accent' },
      { name: 'Charcoal', hex: '#36454F', category: 'neutral' },
      { name: 'Navy', hex: '#000080', category: 'neutral' },
      { name: 'Damson', hex: '#4A0E4E', category: 'neutral' },

      { name: 'Cool Gray', hex: '#808080', category: 'neutral' }
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770317400641_8135d746.png',
    subtypes: [
      {
        id: 'fire-fire',
        name: 'Pure Fire',
        shortName: 'Fire-Fire',
        seasonalName: 'True Winter',
        description: 'Brilliant, precise, and commanding, you embody the purest essence of Fire. Your energy is focused, intense, sharp, and radiant. It\'s less about warmth and more about regal power and illumination. You are dramatic, and unapologetic. Striking and classical. You look best in pure, saturated colors with sharp and cool tones. Like a ruby gemstone, you are clear, clean cut, and the most formidable of all Fire subtypes. You wear Crimson Red better than anyone, and red lipstick may have been invented for you.',
        characteristics: [
          'Highest contrast between hair, skin, and eyes',
          'Cool undertones throughout',
          'Can wear pure white and jet black',
          'Looks best in clear, saturated colors',
          'Dramatic and striking appearance'
        ],
        elementalExpression: {
          inNature: 'The Faceted Flame. Fire captured in crystalline form. An arc of light, eternal, unextinguishable. The Olympic torch. The flickering North Star.',


          themes: ['Transformation', 'Intensity', 'Purity', 'Power', 'Clarity', 'Drama'],
          archetypes: ['The Transformer', 'The Visionary Leader', 'The Revolutionary', 'The Catalyst']
        },
        famousFaces: [
          { name: 'Liv Tyler', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Liv_Tyler_2014.jpg/440px-Liv_Tyler_2014.jpg', description: 'Classic True Winter with striking dark hair against porcelain skin, creating dramatic high contrast.', category: 'celebrity' },
          { name: 'Megan Fox', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Megan_Fox_2023.jpg/440px-Megan_Fox_2023.jpg', description: 'Jet black hair and bright blue-green eyes with cool undertones exemplify the Pure Fire intensity.', category: 'celebrity' },
          { name: 'Dita Von Teese', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Dita_Von_Teese_2018.jpg/440px-Dita_Von_Teese_2018.jpg', description: 'The ultimate True Winter icon with her signature black hair, red lips, and porcelain complexion.', category: 'celebrity' },
          { name: 'Snow White', image: 'https://upload.wikimedia.org/wikipedia/en/1/14/Snow_White_Disney.png', description: 'The fairy tale princess with "skin white as snow, lips red as blood, hair black as ebony" - the archetypal True Winter.', category: 'fictional' }
        ],
        colors: [
          { name: 'Pure White', hex: '#FFFFFF', category: 'primary' },
          { name: 'Jet Black', hex: '#000000', category: 'primary' },
          { name: 'True Red', hex: '#C41E3A', category: 'primary' },
          { name: 'Royal Blue', hex: '#4169E1', category: 'secondary' },
          { name: 'Emerald Green', hex: '#158257', category: 'secondary' },
          { name: 'Fuschia', hex: '#C71585', category: 'secondary' },

          { name: 'Hot Pink', hex: '#FF1493', category: 'accent' },
          { name: 'Ice Blue', hex: '#D6FEFF', category: 'accent' },
          { name: 'Navy', hex: '#000080', category: 'neutral' },
          { name: 'Charcoal', hex: '#36454F', category: 'neutral' },
          { name: 'Silver', hex: '#C0C0C0', category: 'neutral' },
          { name: 'Cool Taupe', hex: '#8B8589', category: 'neutral' }
        ]

      },
      {
        id: 'fire-earth',
        name: 'Fire-Earth',
        shortName: 'Fire-Earth',
        seasonalName: 'Deep Winter',
        description: 'Your energy is potent, immense, and smoldering, yet tempered by Earth\'s grounding force. You have a magnetic intensity, and an air of mystery. You have the strength of Fire with the quiet resolve of Earth, and carry weight and influence. You are focus-driven, productive, strategic and on-purpose. You will endure. You have a strong sultry look, and look best in deep, rich colors that honor the intensity of the Fire and Earth elements.',

        characteristics: [
          'Very dark hair and eyes',
          'Medium to deep skin tone',
          'Mix of warm and cool undertones',
          'Looks best in deep, rich colors',
          'Can wear some warm burgundies and olives'
        ],
        elementalExpression: {
          inNature: 'Forged iron and ember glow, you are molten lava flowing through ancient rock, the smoldering embers of a deep forest fire, volcanic obsidian formed under immense pressure. You are fire that has been tempered by earth, gaining depth and endurance.',
          themes: ['Depth', 'Endurance', 'Mystery', 'Intensity', 'Groundedness', 'Power'],
          archetypes: ['The Alchemist', 'The Blacksmith', 'The Powerful Protector', 'The Wise Warrior']
        },
        colors: [
          { name: 'Black', hex: '#0A0A0A', category: 'primary' },
          { name: 'Burgundy', hex: '#732F3D', category: 'primary' },
          { name: 'Dark Emerald', hex: '#0F5E3F', category: 'primary' },
          { name: 'Indigo', hex: '#3D0734', category: 'secondary' },
          { name: 'Pine Green', hex: '#0E4027', category: 'secondary' },
          { name: 'Orange', hex: '#FF5300', category: 'secondary' },

          { name: 'Carmine', hex: '#9C002D', category: 'accent' },
          { name: 'Dark Olive', hex: '#38471D', category: 'accent' },
          { name: 'Espresso', hex: '#3C1414', category: 'neutral' },
          { name: 'Charcoal', hex: '#36454F', category: 'neutral' },
          { name: 'Dark Navy', hex: '#0D0D3D', category: 'neutral' },
          { name: 'Stone', hex: '#F7F1ED', category: 'neutral' }
        ]


      },
      {
        id: 'fire-air',
        name: 'Fire+Air',
        shortName: 'Fire+Air',

        seasonalName: 'Bright Winter',
        description: 'Fire at its most fragile and most powerful. You have the clarity of Fire with the brightness and vibrancy of Air. Your energy is impulsive, galvanizing, and full of potent new beginnings. You are a brilliant, shocking spark that ignites and brings a rush of electric creativity and emotion. You look best in clear, vivid high saturated colors with cool undertones that reflect your optimistic and generative state, like bold luminous neon light.',
        characteristics: [
          'Clear, bright eyes',
          'High contrast coloring',
          'Can wear very bright, saturated colors',
          'Looks washed out in muted tones',
          'Bridges Fire and Air energy'
        ],
        elementalExpression: {
          inNature: 'The explosive moment Winter\'s lightning meets Spring\'s thaw. Like a spectacular fireworks display against the night sky, the electric crackle of a thunderstorm, the brilliant aurora borealis dancing with cosmic energy, you are fire lifted by air, creating dazzling displays of light and color.',
          themes: ['Brilliance', 'Electricity', 'Vibrancy', 'Innovation', 'Excitement', 'Dynamism'],
          archetypes: ['The Innovator', 'The Electric Performer', 'The Bright Star', 'The Trailblazer']
        },
        colors: [
          { name: 'Bright White', hex: '#FAFAFA', category: 'primary' },
          { name: 'Neon Pink', hex: '#FF00FF', category: 'primary' },
          { name: 'Electric Blue', hex: '#0066FF', category: 'primary' },


          { name: 'Lagoon Blue', hex: '#5BD7F5', category: 'secondary' },
          { name: 'Neon Green', hex: '#3BD9A4', category: 'secondary' },
          { name: 'Scarlet', hex: '#DE3163', category: 'secondary' },

          { name: 'Violet', hex: '#8B00FF', category: 'accent' },
          { name: 'Magenta', hex: '#FD3DB5', category: 'accent' },
          { name: 'Denim Blue', hex: '#6EAFFF', category: 'neutral' },
          { name: 'Bright Navy', hex: '#000080', category: 'neutral' },
          { name: 'Cool Gray', hex: '#808080', category: 'neutral' },
          { name: 'Icy Silver', hex: '#D8D8D8', category: 'neutral' }
        ]
      },
      {
        id: 'fire-water',
        name: 'Fire+Water',
        shortName: 'Fire+Water',
        seasonalName: 'Cool Winter',

        description: 'You have the coolness of Fire tempered by Water\'s softness. The ultimate paradox: Fire softened so it reads as cold, yet you are the bluest and hottest part of the flame. No smoke, no soot, no excess. Fire that has burned away its own impurities. Perfection. You have profound calm, laser focus, intent emotional containment, and purposeful reflective stillness. Your coloring is cool and precise, with less dramatic contrast but more stark tints. Instead of pastels - Ice tones. You bridge Fire and Water elements, light to medium saturation and subtle neutrals for more authoritative effect.',
        characteristics: [
          'Cool undertones throughout',
          'Medium contrast coloring',
          'Looks best in cool, clear colors',
          'Can wear softer versions of Fire colors',
          'Bridges Fire and Water palettes'
        ],
        elementalExpression: {
          inNature: 'Steam rising from hot springs at twilight, the cool glow of moonlight on snow, the ethereal mist over a frozen lake at dawn. You are fire cooled by water, creating an atmosphere of refined mystery and elegance.',
          themes: ['Elegance', 'Mystery', 'Refinement', 'Balance', 'Sophistication', 'Serenity'],
          archetypes: ['The Elegant Mystic', 'The Refined Artist', 'The Cool Diplomat', 'The Serene Leader']
        },
        colors: [
          { name: 'Soft White', hex: '#F5F5F5', category: 'primary' },
          { name: 'Shocking Pink', hex: '#FF66B2', category: 'primary' },
          { name: 'Periwinkle', hex: '#8E8EFF', category: 'primary' },
          { name: 'Raspberry', hex: '#E30B5C', category: 'secondary' },
          { name: 'Deep Sea Green', hex: '#016B6B', category: 'secondary' },
          { name: 'Light Damson', hex: '#6E3767', category: 'secondary' },

          { name: 'Acid Lavender', hex: '#CB82FF', category: 'accent' },
          { name: 'Ice Pink', hex: '#FFF0F3', category: 'accent' },
          { name: 'Soft Black', hex: '#1C1C1C', category: 'neutral' },
          { name: 'Mole', hex: '#8B8589', category: 'neutral' },
          { name: 'Cool Mauve', hex: '#949CD1', category: 'neutral' },
          { name: 'Stone', hex: '#F7F1ED', category: 'neutral' }

        ]
      }
    ]

  },
  {
    id: 'water',
    name: 'Water',
    season: 'Summer',
    tagline: 'Intuitive, Flowing, Deeply Connected',
    description: 'Water types possess profound emotional intelligence and an intuitive understanding of the world around them. You flow through life with grace, adapting to circumstances while maintaining your essential nature. Like water itself, you have the power to be both gentle and powerful, from the stillness of a summer lake to the strong current of a fast river. You understand that true strength lies in flexibility and the ability to find your path around obstacles.',
    nature: 'Your energy is empathetic and harmonizing. You bring a sense of calm, depth, and subtle connection. Water types are often healers, artists, and empaths who feel the emotional currents of those around them. Best represented by the Summer season palette, your color signature is soft, blended, and atmospheric like watercolors, using reflective muted colors and passive, cool tones. Indirect and self-sufficient, Water types are feeling-based yet carry their emotions within, acting as a mirror for others. Self-sufficient, you\'re a safe space with strong boundaries, and will distill and release what you can\'t carry, keeping the rest under the surface as you meander along your own journey through life.',

    characteristics: [
      'Deep emotional intelligence and empathy',
      'Intuitive decision-making abilities',
      'Adaptable and flexible in approach',
      'Creative and artistic expression',
      'Calming presence that soothes others',
      'Reflective and introspective nature'
    ],
    stylingPhilosophy: 'Water - Your wardrobe is how you convey calm authority. For Water Types, your wardrobe should reflect your introspective, intuitive and collected nature. It should flow like water—elegant, graceful, and effortlessly beautiful. Embrace soft, muted cool tones that reflect your fluid and gentle nature. Choose fabrics that drape beautifully and colors that evoke the soft haze of a summer morning—dusty roses, soft blues, and gentle lavenders, or the wildflowers in an exquisite garden - mauve, cyclamen, rose. Your wardrobe should be atmospheric, gentle yet powerful. Start by Distilling your Wardrobe with the Elemental Wardrobe Review.',

    colors: [
      { name: 'Soft Rose', hex: '#D4A5A5', category: 'primary' },
      { name: 'Dusty Blue', hex: '#6B8BA4', category: 'primary' },
      { name: 'Soft Plum', hex: '#8E7B8B', category: 'primary' },
      { name: 'Powder Pink', hex: '#E8C4C4', category: 'secondary' },
      { name: 'Soft Teal', hex: '#5F9EA0', category: 'secondary' },
      { name: 'Lavender', hex: '#B4A7D6', category: 'secondary' },
      { name: 'Mauve', hex: '#E0B0FF', category: 'accent' },
      { name: 'Soft Aqua', hex: '#7EC8E3', category: 'accent' },
      { name: 'Cocoa', hex: '#8B7D7B', category: 'neutral' },
      { name: 'Soft Navy', hex: '#3D4F5F', category: 'neutral' },
      { name: 'Rose Beige', hex: '#C4AEAD', category: 'neutral' },
      { name: 'Blue Gray', hex: '#8BA8B7', category: 'neutral' }
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770317712283_5f685b0d.jpg',
    subtypes: [
      {
        id: 'water-water',
        name: 'Pure Water',
        shortName: 'Water-Water',
        seasonalName: 'True Summer',
        description: 'You embody the purest essence of Water (Water-Water) where still water runs deep. Below your tranquil surface lies a hidden, profound activity, a wisdom and complexity that few can fully fathom. You are a deep thinker and prefer to remain invisible, self-contained in your own quiet space. You represent the serene reflective tones of water, cool blues and greens, stronger muted tones that are subtle. You suit one continuous color with a combination of different subtle tones to mirror the reflections of water.',
        characteristics: [
          'Soft, muted coloring throughout',
          'Cool undertones in skin, hair, and eyes',
          'Low to medium contrast',
          'Looks best in dusty, powdery colors',
          'Elegant and refined appearance'
        ],
        elementalExpression: {
          inNature: 'An ancient still forest lake reflecting the soft colors of twilight, and the shadow of the trees. You are water in its most peaceful state, reflecting serene grace, holding the mysteries of the unknown and wisdom of the ages in your depths.',
          themes: ['Serenity', 'Reflection', 'Grace', 'Intuition', 'Harmony', 'Elegance'],
          archetypes: ['The Healer', 'The Empath', 'The Peaceful Sage', 'The Gentle Guide']
        },
        colors: [
          { name: 'Dusty Rose', hex: '#D4A5A5', category: 'primary' },
          { name: 'Soft Blue', hex: '#6B8BA4', category: 'primary' },
          { name: 'Lavender', hex: '#B4A7D6', category: 'primary' },
          { name: 'Powder Pink', hex: '#E8C4C4', category: 'secondary' },
          { name: 'Soft Teal', hex: '#5F9EA0', category: 'secondary' },
          { name: 'Mauve', hex: '#C4A4C4', category: 'secondary' },
          { name: 'Periwinkle', hex: '#CCCCFF', category: 'accent' },
          { name: 'Soft Coral', hex: '#E8B4B8', category: 'accent' },
          { name: 'Cocoa', hex: '#8B7D7B', category: 'neutral' },
          { name: 'Soft Navy', hex: '#3D4F5F', category: 'neutral' },
          { name: 'Rose Taupe', hex: '#B5A4A4', category: 'neutral' },
          { name: 'Blue Gray', hex: '#8BA8B7', category: 'neutral' }
        ]
      },
      {
        id: 'water-air',
        name: 'Water-Air',
        shortName: 'Water-Air',
        seasonalName: 'Light Summer',
        description: 'Like a gentle fog, you have the lightness of Water lifted by Air\'s brightness. You are the protective empath, creating safe emotional atmospheres. You are soft and gentle, dreamy and nostalgic, with a light compassionate touch and tender enveloping energy. You mute your emotions, preferring to insulate and enjoy the quiet, and may appear elusive or hard to pin down. Your appearance is soft-focused, fresh and youthful, bridging Water and Air elements. You look best in light, cool colors with soft contrast and low chroma that capture your delicate, ethereal quality.',
        characteristics: [
          'Light hair, skin or eyes',

          'Delicate, soft coloring',
          'Low contrast appearance',
          'Looks best in light, airy colors',
          'Fresh and youthful energy'
        ],
        elementalExpression: {
          inNature: 'Delicate clouds reflected in a still pond, the iridescent shimmer of light in a gentle fog, the soft rain falling through sunbeams. You are water touched by air, light and ethereal, dancing between elements.',

          themes: ['Lightness', 'Delicacy', 'Youth', 'Dreams', 'Tenderness', 'Cosmic'],
          archetypes: ['The Dreamer', 'The Comforting Spirit', 'The Youthful Muse', 'The Soft Visionary']
        },
        colors: [
          { name: 'Soft Pink', hex: '#F4C2C2', category: 'primary' },
          { name: 'Sky Blue', hex: '#87CEEB', category: 'primary' },
          { name: 'Light Lavender', hex: '#E6E6FA', category: 'primary' },
          { name: 'Powder Blue', hex: '#B0E0E6', category: 'secondary' },
          { name: 'Soft Mint', hex: '#98D8C8', category: 'secondary' },
          { name: 'Pale Rose', hex: '#FFE4E1', category: 'secondary' },
          { name: 'Light Aqua', hex: '#B0E0E6', category: 'accent' },
          { name: 'Soft Peach', hex: '#FFDAB9', category: 'accent' },
          { name: 'Light Gray', hex: '#D3D3D3', category: 'neutral' },
          { name: 'Soft Taupe', hex: '#C4B7A6', category: 'neutral' },
          { name: 'Dove Gray', hex: '#B0B0B0', category: 'neutral' },
          { name: 'Off White', hex: '#FAF0E6', category: 'neutral' }
        ]
      },
      {
        id: 'water-earth',
        name: 'Water-Earth',
        shortName: 'Water-Earth',
        seasonalName: 'Soft Summer',
        description: 'You have the patience and stillness of Water, grounded by Earth\'s stability. Your wisdom comes from the memory of Water\'s passage from the mountains, through the forests, into the streams, depositing, exchanging and transforming along the way. Bridging Water and Earth elements, Your appearance is soft and understated, with colorful favorites you have collected on your journey. Muted, dusty colors infused with the rich and nurturing tones of the earth, while remaining light and cool.',

        characteristics: [
          'Very muted, soft coloring',
          'Blend of warm and cool undertones',
          'Low contrast appearance',
          'Looks best in dusty, greyed colors',
          'Understated and sophisticated'
        ],
        elementalExpression: {
          inNature: 'A quiet stream flowing through moss-covered stones, the soft colors of weathered driftwood on a misty beach, rain-soaked earth in late afternoon light. You are water that has found its path through earth, patient and wise, with warmth and depth from sediment and gentleness of heat from the blue summer sky.',
          themes: ['Wisdom', 'Patience', 'Subtlety', 'Depth', 'Sophistication', 'Groundedness'],
          archetypes: ['The Wise Counselor', 'The Patient Teacher', 'The Quiet Archivist', 'The Grounded Mystic']
        },
        colors: [
          { name: 'Dusty Pink', hex: '#D8B4B4', category: 'primary' },
          { name: 'Army Green', hex: '#5D7A57', category: 'primary' },
          { name: 'Dusty Blue', hex: '#8BA8B7', category: 'primary' },
          { name: 'Soft Mauve', hex: '#C4A4B4', category: 'secondary' },

          { name: 'Muted Teal', hex: '#6B8E8E', category: 'secondary' },
          { name: 'Dusty Rose', hex: '#C4A4A4', category: 'secondary' },
          { name: 'Soft Plum', hex: '#A4879C', category: 'accent' },
          { name: 'Muted Aqua', hex: '#8EB8B8', category: 'accent' },
          { name: 'Mushroom', hex: '#A4978E', category: 'neutral' },
          { name: 'Soft Charcoal', hex: '#6B6B6B', category: 'neutral' },
          { name: 'Greige', hex: '#B8B0A8', category: 'neutral' },
          { name: 'Stone', hex: '#918E85', category: 'neutral' }
        ]
      },
      {
        id: 'water-fire',
        name: 'Water-Fire',
        shortName: 'Water-Fire',
        seasonalName: 'Cool Summer',
        description: 'You have the warmest coloring of all Water types, with Fire\'s intensity adding definition. Like a serene golden pond warmed by the lingering sun, you have a gentle, nostalgic glow, joyful from the light of the golden hour. Your emotional depth is intense yet bittersweet, your passion mellowed by the Water element into a calm, grounded maturity. Both joyful and serious, you are perfectly suited to the bolder, intense warm water tones, strong but beautifully muted by the sun.',

        characteristics: [
          'Clear cool undertones',
          'Medium contrast coloring',
          'Can wear slightly brighter colors',
          'Looks best in cool, clear colors',
          'Refined and elegant appearance'
        ],
        elementalExpression: {
          inNature: 'The gold-dappled pond at sunset, the bioluminescent waves of summer glowing in the night ocean, the clarity of a mountain spring emerging from volcanic rock. You are Water with Fire\'s intensity hidden beneath a calm, nostalgic warm surface.',
          themes: ['Clarity', 'Depth', 'Intensity', 'Refinement', 'Mystery', 'Joyful'],
          archetypes: ['The Reflective Storyteller', 'The Gentle Artist', 'The Mellow Strategist', 'The Hidden Gold']
        },
        colors: [
          { name: 'Rose Pink', hex: '#E8A4B8', category: 'primary' },
          { name: 'Cool Blue', hex: '#6495ED', category: 'primary' },
          { name: 'Orchid', hex: '#DA70D6', category: 'primary' },
          { name: 'Raspberry', hex: '#C4647C', category: 'secondary' },
          { name: 'Teal', hex: '#4A8B8B', category: 'secondary' },
          { name: 'Wisteria', hex: '#C9A0DC', category: 'secondary' },
          { name: 'Fuchsia', hex: '#C4649C', category: 'accent' },
          { name: 'Turquoise', hex: '#40E0D0', category: 'accent' },
          { name: 'Charcoal', hex: '#4A4A4A', category: 'neutral' },
          { name: 'Cool Gray', hex: '#8B8B8B', category: 'neutral' },
          { name: 'Soft Navy', hex: '#3D4F6F', category: 'neutral' },
          { name: 'Slate', hex: '#708090', category: 'neutral' }
        ]
      }
    ]

  },
  {
    id: 'earth',
    name: 'Earth',
    season: 'Autumn',
    tagline: 'Grounded, Nurturing, Steadfast',
    description: 'Earth types embody stability, reliability, and a deep connection to the natural world. You are the foundation upon which others build, offering unwavering support and practical wisdom. You are stable, enduring, and substantive. You are the doers who draw strength from your roots and find peace in the rhythms of nature.',
    nature: 'Earth types are often the ones who create lasting structures—whether in relationships, careers, or communities. Your patience and persistence allow you to achieve goals that others abandon. You suit warm, rich colors with golden undertones, similar to the Autumn seasonal palette which reflects your generous, grounded nature. Nourishing and abundant, your strength is rooted in the material. Organically, you cultivate the world around you, ensuring it is both lasting and deeply beneficial.',

    characteristics: [
      'Reliable and dependable nature',
      'Strong connection to nature and environment',
      'Practical and grounded approach',
      'Nurturing and supportive of others',
      'Patient and persistent in pursuits',
      'Values tradition and authenticity'
    ],
    stylingPhilosophy: 'Earth - Your wardrobe is how you root yourself in the world. For Earth Types, your wardrobe should reflect your grounded, nurturing and steadfast nature. It should feel like the earth itself—rich, textured, and deeply connected to the natural world. Embrace warm, organic tones that mirror the landscapes you are drawn to: the burnt sienna of canyon walls, the deep olive of ancient forests, the golden amber of harvest fields at dusk. Choose fabrics that honor the earth—sumptuous wools, buttery suedes, washed linens, and organic cottons that feel as natural as the soil beneath your feet. Your wardrobe should be an extension of your roots, a living expression of the nurturing strength you carry within. Like the earth that sustains all life, your style should be enduring, authentic, and quietly powerful. Start by Unearthing your Wardrobe with the Elemental Wardrobe Review.',
    colors: [
      { name: 'Terracotta', hex: '#CC4E3E', category: 'primary' },
      { name: 'Olive', hex: '#808000', category: 'primary' },
      { name: 'Warm Brown', hex: '#8B4513', category: 'primary' },
      { name: 'Burnt Orange', hex: '#CC5500', category: 'secondary' },
      { name: 'Moss Green', hex: '#4A5D23', category: 'secondary' },
      { name: 'Mustard', hex: '#FFDB58', category: 'secondary' },
      { name: 'Rust', hex: '#B7410E', category: 'accent' },
      { name: 'Teal', hex: '#008080', category: 'accent' },
      { name: 'Cream', hex: '#FFFDD0', category: 'neutral' },
      { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
      { name: 'Chocolate', hex: '#3D2314', category: 'neutral' },
      { name: 'Khaki', hex: '#C3B091', category: 'neutral' }
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770323187581_69487d2c.jpg',

    subtypes: [
      {
        id: 'earth-earth',
        name: 'Pure Earth',
        shortName: 'Earth-Earth',
        seasonalName: 'True Autumn',
        description: 'You embody Earth at its purest form and represent the fertile soil - rich, warm, and abundant. You understand the core process of transformation and complex, organic life. You see great importance in cycles, legacy and our deep connection with nature. Your appearance is warm and inviting, and you convey substance and endurance. You prevail through all the cycles and seasons.\n\nYou are a natural composter, and cultivate, nourish, discard and regenerate. You consider yourself a steward of nature, your community, your family. You feel at home in earthy, saturated rich colors with golden undertones that are connected to harvest and craft. You are the most grounded and nurturing of all Earth subtypes.',


        characteristics: [
          'Warm undertones throughout',
          'Medium contrast coloring',
          'Golden or auburn highlights',
          'Looks best in warm, earthy colors',
          'Warm and inviting appearance'
        ],
        elementalExpression: {
          inNature: 'The rich soil of an ancient forest floor, golden wheat fields swaying in autumn breeze, the warm glow of amber and honey. You are earth in its most fertile and nurturing form, providing sustenance and stability.',
          themes: ['Nurturing', 'Abundance', 'Stability', 'Warmth', 'Authenticity', 'Tradition'],
          archetypes: ['The Nurturer', 'The Provider', 'The Earth Mother', 'The Steadfast Guardian']
        },
        colors: [
          { name: 'Terracotta', hex: '#CC4E3E', category: 'primary' },
          { name: 'Olive', hex: '#808000', category: 'primary' },
          { name: 'Pumpkin', hex: '#FF7518', category: 'primary' },
          { name: 'Mustard', hex: '#FFDB58', category: 'secondary' },
          { name: 'Moss', hex: '#4A5D23', category: 'secondary' },
          { name: 'Copper', hex: '#B87333', category: 'secondary' },
          { name: 'Rust', hex: '#B7410E', category: 'accent' },
          { name: 'Teal', hex: '#008080', category: 'accent' },
          { name: 'Cream', hex: '#FFFDD0', category: 'neutral' },
          { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
          { name: 'Warm Brown', hex: '#8B4513', category: 'neutral' },
          { name: 'Khaki', hex: '#C3B091', category: 'neutral' }
        ]
      },
      {
        id: 'earth-fire',
        name: 'Earth-Fire',
        shortName: 'Earth-Fire',
        seasonalName: 'Deep Autumn',
        description: 'Like mountain stone, you have the depth and solid foundation of Earth, with Fire\'s blue flame. You are majestic, enduring, and valuable. You have a calm strength, solemn determination, and quiet authority. You are the foundation and the bedrock. You define the landscape for others.\n\nYour coloring is stark or dark and intense with warm undertones. You bridge Earth and Fire elements, looking best in deep, rich evergreens, black browns, and warm blues that honor your powerful presence. Protective and wise, you are immovable and impenetrable.',


        characteristics: [
          'Dark hair and eyes',
          'Warm undertones with depth',
          'High contrast coloring',
          'Looks best in deep, rich colors',
          'Can wear some Fire colors'
        ],
        elementalExpression: {
          inNature: 'The blue slate of the Indigo Hills, the stark greens of majestic pines, the mahogany wood with its hidden fire, the smoldering warmth of dark volcanic soil. You are earth infused with fire\'s passion, creating something both powerful and enduring.',
          themes: ['Passion', 'Depth', 'Power', 'Impenetrable', 'Intensity', 'Endurance'],
          archetypes: ['The Guardian', 'The Deep Root', 'The Volcanic Force', 'The Intense Creator']
        },
        colors: [
          { name: 'Burgundy', hex: '#722F37', category: 'primary' },
          { name: 'Forest Green', hex: '#228B22', category: 'primary' },
          { name: 'Burnt Sienna', hex: '#8A3324', category: 'primary' },
          { name: 'Mahogany', hex: '#4E0707', category: 'secondary' },
          { name: 'Dark Teal', hex: '#014D4E', category: 'secondary' },
          { name: 'Bronze', hex: '#CD7F32', category: 'secondary' },
          { name: 'Oxblood', hex: '#4A0000', category: 'accent' },
          { name: 'Dark Olive', hex: '#556B2F', category: 'accent' },
          { name: 'Espresso', hex: '#3C1414', category: 'neutral' },
          { name: 'Dark Brown', hex: '#3D2314', category: 'neutral' },
          { name: 'Charcoal Brown', hex: '#4A4036', category: 'neutral' },
          { name: 'Warm Black', hex: '#1C1410', category: 'neutral' }
        ]
      },
      {
        id: 'earth-water',
        name: 'Earth-Water',
        shortName: 'Earth-Water',
        seasonalName: 'Soft Autumn',
        description: 'You are Earth at its most gentle. You are patient, enduring and cooperative. You turn hard spaces into soft spaces, like a warm blanket that offers comfort. You make life easier, reminding others that nature has its seasons. Life and relationships change and evolve. Nature heals, even in the hardest of places. You bring gentle optimism and quiet reassurance, just as water finds its way, earth holds space.\n\nYou have the most muted coloring of all Earth types, softened by Water\'s gentle flow. Your appearance is soft, understated, with an element of sophistication. You look best in muted warm colors, earthy yet clean and simple, bridging the Earth and Water elements.',

        characteristics: [
          'Muted, soft coloring',
          'Blend of warm and cool undertones',
          'Low contrast appearance',
          'Looks best in dusty, muted colors',
          'Understated and sophisticated'
        ],
        elementalExpression: {
          inNature: 'Soft clay riverbanks shaped by flowing water, the muted colors of a foggy autumn morning, weathered stone smoothed by centuries of gentle rain. You are earth softened by water, blending strength with gentleness.',
          themes: ['Gentleness', 'Adaptability', 'Softness', 'Wisdom', 'Patience', 'Blending'],
          archetypes: ['The Comforting Presence', 'The Soft Strength', 'The Patient Sculptor', 'The Quiet Wisdom']

        },
        colors: [
          { name: 'Dusty Rose', hex: '#C4A4A4', category: 'primary' },
          { name: 'Army Green', hex: '#5D7A57', category: 'primary' },
          { name: 'Soft Terracotta', hex: '#C4847C', category: 'primary' },

          { name: 'Dusty Coral', hex: '#C4948C', category: 'secondary' },
          { name: 'Muted Olive', hex: '#8B8B6B', category: 'secondary' },
          { name: 'Soft Gold', hex: '#C4B47C', category: 'secondary' },
          { name: 'Dusty Teal', hex: '#6B8B8B', category: 'accent' },
          { name: 'Soft Rust', hex: '#B4847C', category: 'accent' },
          { name: 'Mushroom', hex: '#A4978E', category: 'neutral' },
          { name: 'Greige', hex: '#B8B0A8', category: 'neutral' },
          { name: 'Soft Brown', hex: '#A4948C', category: 'neutral' },
          { name: 'Stone', hex: '#918E85', category: 'neutral' }
        ]
      },
      {
        id: 'earth-air',
        name: 'Earth-Air',
        shortName: 'Earth-Air',
        seasonalName: 'Warm Autumn',
        description: 'You embody Earth at its most vital phase, its peak. You represent the harvest, the abundance of all coming to fruition and renewal. You are generous, the source of nourishment, the giver of bread. You are selfless as you draw others to the hearth. The harvest is for all, not you.\n\nYour appearance is warm and radiant. You have the warmest glow of all Earth types and look best in vibrant golden colors that capture your vitality. The luminosity of Air draws others to you, inspiring prosperity and hope while you remain grounded and earthbound. Rejoice!',
        characteristics: [
          'Strong warm undertones',
          'Golden or red highlights',
          'Medium contrast coloring',
          'Looks best in golden, warm colors',
          'Sunny and vibrant appearance'
        ],
        elementalExpression: {
          inNature: 'Golden sunlight streaming through autumn leaves, fields of sunflowers turning toward the sun, the warm glow of harvest time. You are earth lifted by air, radiating warmth and optimism.',
          themes: ['Radiance', 'Optimism', 'Warmth', 'Joy', 'Generosity', 'Vitality'],
          archetypes: ['The Radiant One', 'The Golden Heart', 'The Joyful Provider', 'The Sunny Soul']
        },
        colors: [
          { name: 'Pumpkin', hex: '#FF7518', category: 'primary' },
          { name: 'Golden Yellow', hex: '#FFD700', category: 'primary' },
          { name: 'Warm Coral', hex: '#FF6F61', category: 'primary' },
          { name: 'Tangerine', hex: '#FF9966', category: 'secondary' },
          { name: 'Chartreuse', hex: '#7FFF00', category: 'secondary' },
          { name: 'Amber', hex: '#FFBF00', category: 'secondary' },
          { name: 'Burnt Orange', hex: '#CC5500', category: 'accent' },
          { name: 'Lime', hex: '#9ACD32', category: 'accent' },
          { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
          { name: 'Warm Beige', hex: '#D4C4A8', category: 'neutral' },
          { name: 'Golden Brown', hex: '#996515', category: 'neutral' },
          { name: 'Cream', hex: '#FFFDD0', category: 'neutral' }
        ]
      }
    ]

  },
  {
    id: 'air',
    name: 'Air',
    season: 'Spring',
    tagline: 'Free-Spirited, Intellectual, Ethereal',
    description: 'Air types are the dreamers and thinkers, moving through life with lightness and grace. Like the wind, you bring fresh perspectives and clarity wherever you go, finding the connections that exist in the spaces between. You possess a brilliant mind that soars above conventional thinking, and your lightness of being allows you to navigate complex situations with ease.',
    nature: 'Air types are often innovators, communicators, and visionaries who inspire others to think differently. Closest to the Spring seasonal type, you have warm, clear coloring with a fresh, luminous appearance. You have a bright, optimistic nature and exude freedom, and new beginnings,like a breath of fresh air. Fast and flighty, you carry sound, scent, seed, and even storm. Do you burn, flow, think, or grow? As Air, you think. To find out how, view the subtypes above.',
    characteristics: [
      'Brilliant and innovative thinking',
      'Excellent communication skills',
      'Free-spirited and independent',
      'Adaptable and quick-thinking',
      'Visionary and forward-looking',
      'Social and connecting of people'
    ],
    stylingPhilosophy: 'Air - Your wardrobe is how you breathe life into the world around you. For Air Types, your wardrobe should reflect your free-spirited, intellectual and luminous nature. It should move like air itself—light, fresh, and full of effortless grace. Embrace warm, clear tones that mirror the bright optimism you carry: the coral of a sunrise breaking through morning clouds, the golden yellow of sunlight streaming through new spring leaves, the soft peach of blossoms carried on a warm breeze. Choose fabrics that flow and breathe—airy silks, soft cottons, delicate chiffons, and light linens that allow your spirit to move freely and without constraint. Your wardrobe should be an invitation to possibility, a living expression of the fresh perspectives and new ideas you bring to every room you enter. Like the wind that carries seeds to new ground and lifts birds into flight, your style should be liberating, joyful, and endlessly renewing. Start by Breathing Into your Wardrobe with the Elemental Wardrobe Review.',
    colors: [
      { name: 'Coral', hex: '#FF7F50', category: 'primary' },
      { name: 'Warm Yellow', hex: '#FFE135', category: 'primary' },
      { name: 'Peach', hex: '#FFCBA4', category: 'primary' },
      { name: 'Aqua', hex: '#00FFFF', category: 'secondary' },
      { name: 'Warm Pink', hex: '#FF6B6B', category: 'secondary' },
      { name: 'Apple Green', hex: '#8DB600', category: 'secondary' },
      { name: 'Tangerine', hex: '#FF9966', category: 'accent' },
      { name: 'Turquoise', hex: '#40E0D0', category: 'accent' },
      { name: 'Ivory', hex: '#FFFFF0', category: 'neutral' },
      { name: 'Warm Beige', hex: '#D4C4A8', category: 'neutral' },
      { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
      { name: 'Warm Gray', hex: '#A9A9A9', category: 'neutral' }
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770318270494_c4c2e512.jpg',
    subtypes: [
      {
        id: 'air-air',
        name: 'Pure Air',
        shortName: 'Air-Air',
        seasonalName: 'True Spring',
        description: 'You embody the purest essence of Air at the most expansive. You are the infinite, empty, potential of a sky before anything has entered it. You are like a blank page, an empty endless horizon. You provide a space that makes everything else possible. You bring clarity, insight, and a fresh perspective.\n\nYou look best in warm light tones, especially aqua blues and violets to reflect your clarity. Your skin is clear, bright, translucent. You appear honest and real, uplifting and unclouded.',

        characteristics: [
          'Warm undertones throughout',
          'Clear, bright or pale eyes or complexion',

          'Medium contrast',
          'Looks best in warm, clear colors',
          'Fresh and vibrant appearance'
        ],
        elementalExpression: {
          inNature: 'The clear blue sky after rain, the clean atmosphere after a storm, you are air in its purest form. Bringing freshness, lucidity, truth and hope.',
          themes: ['Freedom', 'Clarity', 'Hope', 'Optimism', 'Lightness', 'Ethereal'],

          archetypes: ['The Free Spirit', 'The Optimist', 'The Communicator', 'The TruthTeller']

        },
        colors: [
          { name: 'Coral', hex: '#FF7F50', category: 'primary' },
          { name: 'Warm Yellow', hex: '#FFE135', category: 'primary' },
          { name: 'Apple Green', hex: '#8DB600', category: 'primary' },
          { name: 'Peach', hex: '#FFCBA4', category: 'secondary' },
          { name: 'Aqua', hex: '#00CED1', category: 'secondary' },
          { name: 'Warm Pink', hex: '#FF6B6B', category: 'secondary' },
          { name: 'Tangerine', hex: '#FF9966', category: 'accent' },
          { name: 'Turquoise', hex: '#40E0D0', category: 'accent' },
          { name: 'Ivory', hex: '#FFFFF0', category: 'neutral' },
          { name: 'Camel', hex: '#C19A6B', category: 'neutral' },
          { name: 'Warm Beige', hex: '#D4C4A8', category: 'neutral' },
          { name: 'Golden Brown', hex: '#996515', category: 'neutral' }
        ]
      },
      {
        id: 'air-water',
        name: 'Air+Water',
        shortName: 'Air+Water',

        seasonalName: 'Light Spring',
        description: 'You have the lightness of Air softened by Water\'s gentle flow. You are subtle, delicate, almost the faintest shift in pressure, like a whisper on the wind. You convey more from the unspoken. You are intuition itself, the lightest signal from the void, free of words.\n\nYou appear as if in soft-focus - youthful, translucent, delicate, enchanting. You look best in light, warm neutrals with a mere \'hint\' of color. Everything about you is subtle and airy. You don\'t insist, but suggest. You are the most ethereal and serene. Like Aether.',
        characteristics: [
          'Light hair, skin, and eyes',
          'Warm undertones with delicacy',
          'Low contrast appearance',
          'Looks best in light, warm colors',
          'Fresh and youthful energy'
        ],
        elementalExpression: {
          inNature: 'The soft pastels of a spring sunrise, a light drizzle on cherry blossoms. You are air touched by water, creating an atmosphere of delicate beauty and gentle warmth that enchants others.',

          themes: ['Delicacy', 'Gentleness', 'Youth', 'Softness', 'Tenderness', 'Warmth'],
          archetypes: ['The Muse', 'The Soft Touch', 'The Tender Heart', 'The Delicate Soul']
        },
        colors: [
          { name: 'Peach', hex: '#FFCBA4', category: 'primary' },
          { name: 'Light Coral', hex: '#F08080', category: 'primary' },
          { name: 'Soft Yellow', hex: '#FFFACD', category: 'primary' },
          { name: 'Light Aqua', hex: '#E0FFFF', category: 'secondary' },
          { name: 'Blush', hex: '#FFB6C1', category: 'secondary' },
          { name: 'Mint', hex: '#98FB98', category: 'secondary' },
          { name: 'Apricot', hex: '#FBCEB1', category: 'accent' },
          { name: 'Soft Turquoise', hex: '#7FFFD4', category: 'accent' },
          { name: 'Cream', hex: '#FFFDD0', category: 'neutral' },
          { name: 'Light Beige', hex: '#F5F5DC', category: 'neutral' },
          { name: 'Soft Camel', hex: '#D4B896', category: 'neutral' },
          { name: 'Warm White', hex: '#FAF9F6', category: 'neutral' }
        ]
      },
      {
        id: 'air-fire',
        name: 'Air+Fire',
        shortName: 'Air+Fire',
        seasonalName: 'Bright Spring',
        description: 'You have the clarity of Air intensified by Fire\'s brilliance. You are the wind that scatters seeds and pollinates ideas, creating unexpected and fruitful connections. You are intellectually creative. You improvise, perceiving different patterns and connections, like a kaleidoscope. You are an unexpected blast of playful air, a brain \'storm\'.\n\nYour coloring is clear and vivid, bridging Air and Fire elements. You look best in saturated, bright warm colors that capture your electric, vibrant energy. Once you take flight, you can move at the speed of light, whimsically following wherever the wind takes you.',
        characteristics: [
          'Clear, bright eyes',
          'High contrast coloring',
          'Can wear very bright colors',
          'Looks washed out in muted tones',
          'Vibrant and energetic appearance'
        ],
        elementalExpression: {
          inNature: 'A brilliant rainbow after a spring storm, the dazzling colors of tropical birds in flight, the electric energy of a warm wind before a thunderstorm. You are air ignited by fire, creating spectacular displays of energy and color.',
          themes: ['Vibrancy', 'Energy', 'Excitement', 'Brilliance', 'Enthusiasm', 'Dynamism'],
          archetypes: ['The Happy Accident', 'The Brainstorm', 'The Energizer', 'The Whimsical Dynamo']
        },
        colors: [
          { name: 'Hot Coral', hex: '#FF6B6B', category: 'primary' },
          { name: 'Electric Yellow', hex: '#FFFF00', category: 'primary' },
          { name: 'Bright Turquoise', hex: '#00CED1', category: 'primary' },
          { name: 'Vivid Orange', hex: '#FF6600', category: 'secondary' },
          { name: 'Bright Green', hex: '#00FF00', category: 'secondary' },
          { name: 'Hot Pink', hex: '#FF69B4', category: 'secondary' },
          { name: 'Tangerine', hex: '#FF9966', category: 'accent' },
          { name: 'Aquamarine', hex: '#7FFFD4', category: 'accent' },
          { name: 'Pure White', hex: '#FFFFFF', category: 'neutral' },
          { name: 'Warm Black', hex: '#1C1410', category: 'neutral' },
          { name: 'Bright Navy', hex: '#000080', category: 'neutral' },
          { name: 'Clear Gray', hex: '#A0A0A0', category: 'neutral' }
        ]
      },
      {
        id: 'air-earth',
        name: 'Air+Earth',
        shortName: 'Air+Earth',
        seasonalName: 'Warm Spring',
        description: 'You embody the optimism of Air with the conviction of Earth. You convey your thoughts with energy and enthusiasm, adding a golden touch of persuasion. You have an inviting nature that draws others to you. Light-hearted, easy-going, you know how to build consensus and pull people in. You make your ideas seem accessible and relatable. Once you get \'wind\' of something, you want to spread it far and wide. You want to create community and build something where everyone comes along for the ride.\n\nYou have the warmest coloring of all Air types, grounded by Earth\'s richness. Your appearance is sunny and golden, bridging Air and Earth elements. You look best in warm, golden colors that capture your radiant, nurturing energy.',

        characteristics: [
          'Strong warm undertones',
          'Golden highlights in hair',
          'Medium contrast coloring',
          'Looks best in golden, peachy colors',
          'Sunny and warm disposition'
        ],
        elementalExpression: {
          inNature: 'Warm breezes carrying the overwhelming scent of ripe fruit, golden sunlight penetrating your window, the rich warmth of a spring afternoon beating down. You are air warmed by earth, combining lightness and vigor.',

          themes: ['Warmth', 'Nurturing', 'Radiance', 'Growth', 'Abundance', 'Generosity'],
          archetypes: ['The Golden Tongue', 'The Harmonizing Voice', 'The Inspiring Advocate', 'The Generous Spirit']

        },
        colors: [
          { name: 'Warm Coral', hex: '#FF6F61', category: 'primary' },
          { name: 'Golden Yellow', hex: '#FFD700', category: 'primary' },
          { name: 'Warm Peach', hex: '#FFDAB9', category: 'primary' },
          { name: 'Amber', hex: '#FFBF00', category: 'secondary' },
          { name: 'Warm Green', hex: '#9ACD32', category: 'secondary' },
          { name: 'Salmon', hex: '#FA8072', category: 'secondary' },
          { name: 'Mango', hex: '#FF8243', category: 'accent' },
          { name: 'Warm Teal', hex: '#20B2AA', category: 'accent' },
          { name: 'Cream', hex: '#FFFDD0', category: 'neutral' },
          { name: 'Warm Beige', hex: '#D4C4A8', category: 'neutral' },
          { name: 'Caramel', hex: '#FFD59A', category: 'neutral' },
          { name: 'Golden Brown', hex: '#996515', category: 'neutral' }
        ]
      }
    ]
  }
];


// Quiz questions for determining main element
export const quizQuestions = [
  {
    id: 1,
    question: 'When you enter a room full of people, you typically...',
    options: [
      { text: 'Command attention and naturally become the center of conversation', element: 'fire' },
      { text: 'Observe the emotional dynamics and connect deeply with a few people', element: 'water' },
      { text: 'Find a comfortable spot and engage in meaningful, grounded conversations', element: 'earth' },
      { text: 'Float between groups, sparking ideas and making connections', element: 'air' }
    ]
  },
  {
    id: 2,
    question: 'Your ideal vacation would be...',
    options: [
      { text: 'An adventure-filled trip with exciting activities and new experiences', element: 'fire' },
      { text: 'A serene beach retreat or spa getaway near water', element: 'water' },
      { text: 'A cozy cabin in the mountains or countryside', element: 'earth' },
      { text: 'Exploring new cities and cultures, meeting interesting people', element: 'air' }
    ]
  },
  {
    id: 3,
    question: 'When facing a challenge, your first instinct is to...',
    options: [
      { text: 'Take bold action and tackle it head-on', element: 'fire' },
      { text: 'Trust your intuition and feel your way through', element: 'water' },
      { text: 'Create a practical plan and work steadily toward a solution', element: 'earth' },
      { text: 'Brainstorm creative solutions and think outside the box', element: 'air' }
    ]
  },
  {
    id: 4,
    question: 'In your home, you feel most at peace when...',
    options: [
      { text: 'Surrounded by dramatic decor and statement pieces that energize you', element: 'fire' },
      { text: 'Near flowing elements or in a calming, soft-toned space', element: 'water' },
      { text: 'Surrounded by natural materials, plants, and earthy textures', element: 'earth' },
      { text: 'In a light, airy space with fresh colors and minimal clutter', element: 'air' }
    ]
  },
  {
    id: 5,
    question: 'Your communication style is best described as...',
    options: [
      { text: 'Passionate, direct, and inspiring', element: 'fire' },
      { text: 'Empathetic, intuitive, and emotionally attuned', element: 'water' },
      { text: 'Thoughtful, practical, and reassuring', element: 'earth' },
      { text: 'Witty, intellectual, and idea-driven', element: 'air' }
    ]
  },
  {
    id: 6,
    question: 'When choosing an outfit, you prioritize...',
    options: [
      { text: 'Making a bold statement and standing out', element: 'fire' },
      { text: 'Flowing fabrics and colors that feel emotionally right', element: 'water' },
      { text: 'Comfort, quality, and timeless style', element: 'earth' },
      { text: 'Light, effortless pieces that allow freedom of movement', element: 'air' }
    ]
  },
  {
    id: 7,
    question: 'Your energy levels throughout the day are...',
    options: [
      { text: 'High and dynamic, with bursts of intense productivity', element: 'fire' },
      { text: 'Flowing and cyclical, influenced by your emotional state', element: 'water' },
      { text: 'Steady and consistent, with reliable stamina', element: 'earth' },
      { text: 'Variable and spontaneous, following inspiration', element: 'air' }
    ]
  },
  {
    id: 8,
    question: 'In relationships, you value most...',
    options: [
      { text: 'Passion, excitement, and mutual inspiration', element: 'fire' },
      { text: 'Deep emotional connection and understanding', element: 'water' },
      { text: 'Loyalty, stability, and shared values', element: 'earth' },
      { text: 'Intellectual stimulation and freedom', element: 'air' }
    ]
  },
  {
    id: 9,
    question: 'Your approach to decision-making is...',
    options: [
      { text: 'Quick and confident—you trust your instincts', element: 'fire' },
      { text: 'Intuitive—you feel what\'s right', element: 'water' },
      { text: 'Methodical—you weigh all practical considerations', element: 'earth' },
      { text: 'Analytical—you consider all possibilities and perspectives', element: 'air' }
    ]
  },
  {
    id: 10,
    question: 'When stressed, you tend to...',
    options: [
      { text: 'Become restless and need to take action', element: 'fire' },
      { text: 'Withdraw and seek emotional processing time', element: 'water' },
      { text: 'Ground yourself in routine and familiar comforts', element: 'earth' },
      { text: 'Seek distraction through new ideas or social connection', element: 'air' }
    ]
  },
  {
    id: 11,
    question: 'Your creative expression is best described as...',
    options: [
      { text: 'Bold, dramatic, and attention-grabbing', element: 'fire' },
      { text: 'Emotional, flowing, and deeply personal', element: 'water' },
      { text: 'Crafted, detailed, and rooted in tradition', element: 'earth' },
      { text: 'Innovative, conceptual, and boundary-pushing', element: 'air' }
    ]
  },
  {
    id: 12,
    question: 'You feel most alive when...',
    options: [
      { text: 'Leading a project or inspiring others to action', element: 'fire' },
      { text: 'Experiencing deep emotional or spiritual moments', element: 'water' },
      { text: 'Creating something tangible and lasting', element: 'earth' },
      { text: 'Exploring new ideas or having breakthrough insights', element: 'air' }
    ]
  }
];

// Subtype quiz questions - asked after main element is determined
export const subtypeQuizQuestions: Record<string, Array<{
  id: number;
  question: string;
  options: Array<{ text: string; subtype: string }>;
}>> = {
  fire: [
    {
      id: 1,
      question: 'How would you describe your natural coloring contrast?',
      options: [
        { text: 'Very high contrast - dark hair with light skin, or very striking features', subtype: 'fire-fire' },
        { text: 'Deep and rich - dark hair, dark eyes, medium to deep skin', subtype: 'fire-earth' },
        { text: 'Bright and clear - vivid eye color, clear skin, noticeable brightness', subtype: 'fire-air' },
        { text: 'Cool and refined - medium contrast with clearly cool undertones', subtype: 'fire-water' }
      ]
    },
    {
      id: 2,
      question: 'Which colors make you look most vibrant?',
      options: [
        { text: 'Pure white, jet black, true red, royal blue', subtype: 'fire-fire' },
        { text: 'Burgundy, forest green, dark plum, mahogany', subtype: 'fire-earth' },
        { text: 'Electric blue, fuchsia, bright turquoise, vivid green', subtype: 'fire-air' },
        { text: 'Rose pink, periwinkle, soft plum, cool teal', subtype: 'fire-water' }
      ]
    },
    {
      id: 3,
      question: 'How do you look in pure black?',
      options: [
        { text: 'Amazing - it makes my features pop dramatically', subtype: 'fire-fire' },
        { text: 'Great - it complements my deep coloring perfectly', subtype: 'fire-earth' },
        { text: 'Good - especially paired with bright colors', subtype: 'fire-air' },
        { text: 'Okay - but softer dark colors like charcoal suit me better', subtype: 'fire-water' }
      ]
    },
    {
      id: 4,
      question: 'What happens when you wear warm, earthy colors?',
      options: [
        { text: 'They clash with my cool coloring completely', subtype: 'fire-fire' },
        { text: 'Some deep warm colors like burgundy work well', subtype: 'fire-earth' },
        { text: 'They make me look dull - I need brightness', subtype: 'fire-air' },
        { text: 'They feel slightly off but not terrible', subtype: 'fire-water' }
      ]
    },
    {
      id: 5,
      question: 'Which jewelry metal looks best on you?',
      options: [
        { text: 'Bright silver or platinum - high shine', subtype: 'fire-fire' },
        { text: 'Antique silver or pewter - rich and deep', subtype: 'fire-earth' },
        { text: 'White gold or bright silver with sparkle', subtype: 'fire-air' },
        { text: 'Rose gold or soft silver tones', subtype: 'fire-water' }
      ]
    },
    {
      id: 6,
      question: 'How would you describe your overall appearance?',
      options: [
        { text: 'Dramatic and striking with high contrast', subtype: 'fire-fire' },
        { text: 'Rich and intense with depth', subtype: 'fire-earth' },
        { text: 'Vibrant and clear with brightness', subtype: 'fire-air' },
        { text: 'Elegant and refined with cool softness', subtype: 'fire-water' }
      ]
    }
  ],
  water: [
    {
      id: 1,
      question: 'How would you describe your natural coloring?',
      options: [
        { text: 'Soft and muted with cool undertones throughout', subtype: 'water-water' },
        { text: 'Light and delicate with a fresh appearance', subtype: 'water-air' },
        { text: 'Very muted with a blend of warm and cool', subtype: 'water-earth' },
        { text: 'Cool and clear with medium contrast', subtype: 'water-fire' }
      ]
    },
    {
      id: 2,
      question: 'Which colors make you look most harmonious?',
      options: [
        { text: 'Dusty rose, soft blue, lavender, powder pink', subtype: 'water-water' },
        { text: 'Sky blue, soft pink, light lavender, powder blue', subtype: 'water-air' },
        { text: 'Army green, dusty pink, muted teal, soft mauve', subtype: 'water-earth' },

        { text: 'Rose pink, cool blue, orchid, raspberry', subtype: 'water-fire' }
      ]
    },
    {
      id: 3,
      question: 'How do you look in pure white?',
      options: [
        { text: 'Too harsh - off-white or soft white is better', subtype: 'water-water' },
        { text: 'Okay but cream or ivory suits me better', subtype: 'water-air' },
        { text: 'Too stark - I need muted, greyed tones', subtype: 'water-earth' },
        { text: 'Fine, but soft white with cool undertones is ideal', subtype: 'water-fire' }
      ]
    },
    {
      id: 4,
      question: 'What happens when you wear bright, saturated colors?',
      options: [
        { text: 'They overpower my soft coloring', subtype: 'water-water' },
        { text: 'They make me look washed out', subtype: 'water-air' },
        { text: 'They clash with my muted appearance', subtype: 'water-earth' },
        { text: 'Some brighter cool colors can work', subtype: 'water-fire' }
      ]
    },
    {
      id: 5,
      question: 'Which jewelry metal looks best on you?',
      options: [
        { text: 'Soft silver or brushed platinum', subtype: 'water-water' },
        { text: 'Delicate silver or white gold', subtype: 'water-air' },
        { text: 'Antique silver or pewter', subtype: 'water-earth' },
        { text: 'Cool silver or rose gold', subtype: 'water-fire' }
      ]
    },
    {
      id: 6,
      question: 'How would you describe your overall appearance?',
      options: [
        { text: 'Soft and elegant with muted coloring', subtype: 'water-water' },
        { text: 'Light and fresh with delicate features', subtype: 'water-air' },
        { text: 'Understated and sophisticated with very muted tones', subtype: 'water-earth' },
        { text: 'Refined and cool with clear undertones', subtype: 'water-fire' }
      ]
    }
  ],
  earth: [
    {
      id: 1,
      question: 'How would you describe your natural coloring?',
      options: [
        { text: 'Warm and rich with golden undertones', subtype: 'earth-earth' },
        { text: 'Deep and intense with dark features', subtype: 'earth-fire' },
        { text: 'Soft and muted with a blend of warm and cool', subtype: 'earth-water' },
        { text: 'Very warm with strong golden highlights', subtype: 'earth-air' }
      ]
    },
    {
      id: 2,
      question: 'Which colors make you look most vibrant?',
      options: [
        { text: 'Terracotta, olive, pumpkin, mustard', subtype: 'earth-earth' },
        { text: 'Burgundy, forest green, burnt sienna, mahogany', subtype: 'earth-fire' },
        { text: 'Army green, dusty rose, soft terracotta, muted olive', subtype: 'earth-water' },

        { text: 'Golden yellow, warm coral, tangerine, amber', subtype: 'earth-air' }
      ]
    },
    {
      id: 3,
      question: 'How do you look in pure black?',
      options: [
        { text: 'Too harsh - warm browns are much better', subtype: 'earth-earth' },
        { text: 'Good - especially warm black or charcoal brown', subtype: 'earth-fire' },
        { text: 'Too stark - I need soft, muted neutrals', subtype: 'earth-water' },
        { text: 'Not great - I look better in warm, rich browns', subtype: 'earth-air' }
      ]
    },
    {
      id: 4,
      question: 'What happens when you wear cool colors like icy blue or pink?',
      options: [
        { text: 'They clash with my warm coloring', subtype: 'earth-earth' },
        { text: 'Some deep cool colors can work', subtype: 'earth-fire' },
        { text: 'Muted cool colors are okay', subtype: 'earth-water' },
        { text: 'They make me look drained', subtype: 'earth-air' }
      ]
    },
    {
      id: 5,
      question: 'Which jewelry metal looks best on you?',
      options: [
        { text: 'Gold or bronze - warm metals', subtype: 'earth-earth' },
        { text: 'Antique gold or copper', subtype: 'earth-fire' },
        { text: 'Soft gold or brushed bronze', subtype: 'earth-water' },
        { text: 'Bright gold or brass', subtype: 'earth-air' }
      ]
    },
    {
      id: 6,
      question: 'How would you describe your overall appearance?',
      options: [
        { text: 'Warm and inviting with earthy richness', subtype: 'earth-earth' },
        { text: 'Deep and intense with dramatic warmth', subtype: 'earth-fire' },
        { text: 'Soft and understated with muted warmth', subtype: 'earth-water' },
        { text: 'Sunny and golden with vibrant warmth', subtype: 'earth-air' }
      ]
    }
  ],
  air: [
    {
      id: 1,
      question: 'How would you describe your natural coloring?',
      options: [
        { text: 'Warm and clear with fresh, vibrant appearance', subtype: 'air-air' },
        { text: 'Light and delicate with warm undertones', subtype: 'air-water' },
        { text: 'Bright and vivid with high clarity', subtype: 'air-fire' },
        { text: 'Very warm with strong golden undertones', subtype: 'air-earth' }
      ]
    },
    {
      id: 2,
      question: 'Which colors make you look most vibrant?',
      options: [
        { text: 'Coral, warm yellow, apple green, peach', subtype: 'air-air' },
        { text: 'Soft peach, light coral, mint, blush', subtype: 'air-water' },
        { text: 'Hot coral, electric yellow, bright turquoise', subtype: 'air-fire' },
        { text: 'Golden yellow, warm coral, amber, salmon', subtype: 'air-earth' }
      ]
    },
    {
      id: 3,
      question: 'How do you look in pure white?',
      options: [
        { text: 'Good - but ivory or cream is even better', subtype: 'air-air' },
        { text: 'Okay - but soft cream suits me best', subtype: 'air-water' },
        { text: 'Great - I can wear bright white', subtype: 'air-fire' },
        { text: 'Fine - but warm white or cream is ideal', subtype: 'air-earth' }
      ]
    },
    {
      id: 4,
      question: 'What happens when you wear muted, dusty colors?',
      options: [
        { text: 'They make me look tired - I need clarity', subtype: 'air-air' },
        { text: 'Soft colors work but not too muted', subtype: 'air-water' },
        { text: 'They completely wash me out', subtype: 'air-fire' },
        { text: 'Some warmer muted tones can work', subtype: 'air-earth' }
      ]
    },
    {
      id: 5,
      question: 'Which jewelry metal looks best on you?',
      options: [
        { text: 'Warm gold or rose gold', subtype: 'air-air' },
        { text: 'Delicate gold or soft rose gold', subtype: 'air-water' },
        { text: 'Bright gold or mixed metals', subtype: 'air-fire' },
        { text: 'Rich gold or brass', subtype: 'air-earth' }
      ]
    },
    {
      id: 6,
      question: 'How would you describe your overall appearance?',
      options: [
        { text: 'Fresh and vibrant with warm clarity', subtype: 'air-air' },
        { text: 'Light and youthful with delicate warmth', subtype: 'air-water' },
        { text: 'Vivid and energetic with high brightness', subtype: 'air-fire' },
        { text: 'Sunny and golden with rich warmth', subtype: 'air-earth' }
      ]
    }
  ]
};

export const clothingItems = [
  // Fire items (Winter)
  { id: 'f1', name: 'Crimson Silk Blouse', element: 'fire', category: 'tops', price: 189, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969666960_33ab14c8.png', color: '#C41E3A' },
  { id: 'f2', name: 'Royal Blue Dress', element: 'fire', category: 'dresses', price: 275, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969662916_e3c03b95.jpg', color: '#4169E1' },
  { id: 'f3', name: 'Black Statement Jacket', element: 'fire', category: 'outerwear', price: 425, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969663633_9ecee15c.jpg', color: '#0A0A0A' },
  { id: 'f4', name: 'Magenta Cashmere Sweater', element: 'fire', category: 'tops', price: 295, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969682630_7880fd22.png', color: '#C71585' },
  { id: 'f5', name: 'Navy Trousers', element: 'fire', category: 'bottoms', price: 215, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970454892_3fed6247.png', color: '#000080' },
  { id: 'f6', name: 'Emerald Cocktail Dress', element: 'fire', category: 'dresses', price: 365, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970452227_947f58d5.jpg', color: '#046307' },
  // Water items (Summer)
  { id: 'w1', name: 'Dusty Rose Midi Dress', element: 'water', category: 'dresses', price: 245, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969697919_4864e92f.jpg', color: '#D4A5A5' },
  { id: 'w2', name: 'Soft Blue Silk Camisole', element: 'water', category: 'tops', price: 165, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969698568_0842e45f.jpg', color: '#6B8BA4' },
  { id: 'w3', name: 'Lavender Evening Gown', element: 'water', category: 'dresses', price: 595, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969759195_b7fbafee.jpg', color: '#B4A7D6' },
  { id: 'w4', name: 'Soft Navy Blazer', element: 'water', category: 'outerwear', price: 385, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969701581_f4d91136.jpg', color: '#3D4F5F' },
  { id: 'w5', name: 'Mauve Pencil Skirt', element: 'water', category: 'bottoms', price: 175, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970474350_fb9de626.png', color: '#E0B0FF' },
  { id: 'w6', name: 'Powder Pink Blouse', element: 'water', category: 'tops', price: 185, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970531988_b22be26f.jpg', color: '#E8C4C4' },
  // Earth items (Autumn)
  { id: 'e1', name: 'Olive Green Cardigan', element: 'earth', category: 'tops', price: 225, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969774117_a4d22bbf.jpg', color: '#808000' },
  { id: 'e2', name: 'Terracotta Wrap Dress', element: 'earth', category: 'dresses', price: 265, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969800177_ff0790c8.png', color: '#CC4E3E' },
  { id: 'e3', name: 'Brown Leather Jacket', element: 'earth', category: 'outerwear', price: 495, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969775806_1f71c828.jpg', color: '#8B4513' },
  { id: 'e4', name: 'Mustard Linen Pants', element: 'earth', category: 'bottoms', price: 175, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969776949_8aa25eda.jpg', color: '#FFDB58' },
  { id: 'e5', name: 'Moss Green Sweater', element: 'earth', category: 'tops', price: 195, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970453011_b72c0013.jpg', color: '#4A5D23' },
  { id: 'e6', name: 'Rust A-Line Skirt', element: 'earth', category: 'bottoms', price: 155, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970471983_d69686f8.jpg', color: '#B7410E' },
  // Air items (Spring)
  { id: 'a1', name: 'Coral Flowing Blouse', element: 'air', category: 'tops', price: 195, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969818670_c1f1958f.jpg', color: '#FF7F50' },
  { id: 'a2', name: 'Peach Silk Scarf', element: 'air', category: 'accessories', price: 125, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969817198_ccc67559.jpg', color: '#FFCBA4' },
  { id: 'a3', name: 'Warm Yellow Maxi Dress', element: 'air', category: 'dresses', price: 285, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969816544_1d6d3243.jpg', color: '#FFE135' },
  { id: 'a4', name: 'Aqua Cashmere Wrap', element: 'air', category: 'outerwear', price: 345, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969877732_d97b15a7.jpg', color: '#00FFFF' },
  { id: 'a5', name: 'Apple Green Pants', element: 'air', category: 'bottoms', price: 165, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970454291_c790f308.jpg', color: '#8DB600' },
  { id: 'a6', name: 'Ivory Silk Skirt', element: 'air', category: 'bottoms', price: 225, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970474859_05c5e5ec.png', color: '#FFFFF0' }
];

export const decorItems = [
  // Fire decor (Winter)
  { id: 'df1', name: 'True Red Velvet Pillow', element: 'fire', category: 'textiles', price: 89, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969910037_3f5b18f3.png', color: '#C41E3A' },
  { id: 'df2', name: 'Silver Glass Vase', element: 'fire', category: 'accents', price: 145, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969901783_f0dac6ef.jpg', color: '#C0C0C0' },
  { id: 'df3', name: 'Black Marble Lamp', element: 'fire', category: 'lighting', price: 275, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969905420_ed473bf6.jpg', color: '#0A0A0A' },
  // Water decor (Summer)
  { id: 'dw1', name: 'Dusty Rose Ceramic Vase', element: 'water', category: 'accents', price: 165, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969930060_292e270d.jpg', color: '#D4A5A5' },
  { id: 'dw2', name: 'Soft Blue Throw Blanket', element: 'water', category: 'textiles', price: 195, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969927837_14554b7b.jpg', color: '#6B8BA4' },
  { id: 'dw3', name: 'Lavender Mirror Frame', element: 'water', category: 'accents', price: 325, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969932401_7339c4be.png', color: '#B4A7D6' },
  // Earth decor (Autumn)
  { id: 'de1', name: 'Woven Seagrass Basket', element: 'earth', category: 'storage', price: 85, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969948852_05c33dfe.jpg', color: '#8B4513' },
  { id: 'de2', name: 'Terracotta Plant Pot', element: 'earth', category: 'accents', price: 65, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969949670_97d0af78.jpg', color: '#CC4E3E' },
  { id: 'de3', name: 'Natural Wood Tray', element: 'earth', category: 'accents', price: 95, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969952022_429f6db6.jpg', color: '#8B4513' },
  // Air decor (Spring)
  { id: 'da1', name: 'Coral Candle Holder', element: 'air', category: 'accents', price: 125, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969973563_02e9009c.png', color: '#FF7F50' },
  { id: 'da2', name: 'Peach Linen Curtains', element: 'air', category: 'textiles', price: 245, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765970029652_ee4ef212.jpg', color: '#FFCBA4' },
  { id: 'da3', name: 'Aqua Wind Chimes', element: 'air', category: 'accents', price: 75, image: 'https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1765969983257_3b7dbd53.png', color: '#00FFFF' }
];

// Helper function to get subtype display name
export const getSubtypeDisplayName = (elementId: string, subtypeId: string): string => {
  const element = elementalTypes.find(e => e.id === elementId);
  if (!element) return subtypeId;
  const subtype = element.subtypes.find(s => s.id === subtypeId);
  return subtype?.name || subtypeId;
};

// Helper function to get seasonal name for a subtype
export const getSeasonalName = (elementId: string, subtypeId: string): string => {
  const element = elementalTypes.find(e => e.id === elementId);
  if (!element) return '';
  const subtype = element.subtypes.find(s => s.id === subtypeId);
  return subtype?.seasonalName || '';
};
