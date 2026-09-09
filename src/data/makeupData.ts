// Makeup recommendations for each elemental subtype
import { MakeupPalette } from './elementalTypes';

export const makeupPalettes: Record<string, MakeupPalette> = {
  // FIRE SUBTYPES (Winter)
  'fire-fire': {
    eyeshadow: [
      { name: 'Jet Black', hex: '#0A0A0A', description: 'Perfect for dramatic smoky eyes' },
      { name: 'Icy Silver', hex: '#C0C0C0', description: 'Stunning highlight shade' },
      { name: 'Deep Plum', hex: '#4A0E4E', description: 'Rich and mysterious' },
      { name: 'Navy Blue', hex: '#000080', description: 'Intense and sophisticated' },
      { name: 'Emerald', hex: '#046307', description: 'Bold jewel tone' },
      { name: 'Cool Taupe', hex: '#8B8589', description: 'Perfect neutral base' }
    ],
    mascara: [
      { name: 'Jet Black', hex: '#000000', description: 'Your signature color - maximum drama' },
      { name: 'Navy Blue', hex: '#000080', description: 'Subtle alternative for softer looks' }
    ],
    lipstick: [
      { name: 'True Red', hex: '#C41E3A', description: 'Your power color - classic and striking' },
      { name: 'Deep Berry', hex: '#8E4585', description: 'Sophisticated evening shade' },
      { name: 'Hot Pink', hex: '#FF1493', description: 'Bold and playful' },
      { name: 'Wine', hex: '#722F37', description: 'Deep and dramatic' },
      { name: 'Cool Nude', hex: '#C4AEAD', description: 'Subtle daytime option' },
      { name: 'Fuchsia', hex: '#C71585', description: 'Vibrant statement color' }
    ],
    blush: [
      { name: 'Cool Pink', hex: '#FFB6C1', description: 'Fresh and natural' },
      { name: 'Berry', hex: '#8E4585', description: 'Adds depth and drama' },
      { name: 'Plum', hex: '#DDA0DD', description: 'Sophisticated flush' },
      { name: 'Rose', hex: '#FF007F', description: 'Classic True Winter pink' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for foundations with pink or neutral-cool undertones. Avoid anything with yellow or golden tones.',
      shades: [
        { name: 'Porcelain Cool', hex: '#F5E6E0', description: 'Fair with pink undertones' },
        { name: 'Ivory Cool', hex: '#F0E0D6', description: 'Light with cool undertones' },
        { name: 'Beige Cool', hex: '#E8D4C4', description: 'Medium-light cool' },
        { name: 'Sand Cool', hex: '#D4B8A0', description: 'Medium with pink undertones' },
        { name: 'Toffee Cool', hex: '#C49A7C', description: 'Medium-deep with cool pink base' },
        { name: 'Chestnut Cool', hex: '#A67B5B', description: 'Deep with cool undertones' },
        { name: 'Cocoa Cool', hex: '#8B6544', description: 'Rich deep with cool-neutral base' },
        { name: 'Espresso Cool', hex: '#6B4226', description: 'Very deep with cool red undertones' },
        { name: 'Deep Ebony Cool', hex: '#4A2D14', description: 'Deepest with cool undertones' }
      ]
    },

    tips: [
      'Embrace high contrast - pair bold lips with dramatic eyes for evening',
      'Your skin can handle the most saturated, pure colors',
      'Silver and platinum metallics are your best friends',
      'Avoid warm, orangey tones in all makeup categories',
      'Black eyeliner is essential - it makes your eyes pop',
      'Cool-toned bronzers work better than warm ones'
    ]
  },
  
  'fire-earth': {
    eyeshadow: [
      { name: 'Deep Burgundy', hex: '#722F37', description: 'Rich and intense' },
      { name: 'Forest Green', hex: '#228B22', description: 'Deep jewel tone' },
      { name: 'Espresso', hex: '#3C1414', description: 'Warm-leaning neutral' },
      { name: 'Aubergine', hex: '#3D0734', description: 'Mysterious depth' },
      { name: 'Bronze', hex: '#CD7F32', description: 'Subtle warmth' },
      { name: 'Pewter', hex: '#8A8D8F', description: 'Cool metallic' }
    ],
    mascara: [
      { name: 'Black-Brown', hex: '#1C1410', description: 'Softer than pure black' },
      { name: 'Deep Black', hex: '#000000', description: 'For dramatic looks' }
    ],
    lipstick: [
      { name: 'Burgundy', hex: '#722F37', description: 'Your signature shade' },
      { name: 'Deep Plum', hex: '#4A0E4E', description: 'Evening glamour' },
      { name: 'Mahogany', hex: '#4E0707', description: 'Rich and sophisticated' },
      { name: 'Berry Wine', hex: '#8B0000', description: 'Deep and dramatic' },
      { name: 'Nude Brown', hex: '#A4948C', description: 'Natural daytime' },
      { name: 'Oxblood', hex: '#4A0000', description: 'Bold statement' }
    ],
    blush: [
      { name: 'Deep Rose', hex: '#C4647C', description: 'Natural flush' },
      { name: 'Plum', hex: '#8E4585', description: 'Adds depth' },
      { name: 'Warm Berry', hex: '#722F37', description: 'Rich color' },
      { name: 'Dusty Mauve', hex: '#915F6D', description: 'Subtle warmth' }
    ],
    foundation: {
      undertone: 'neutral',
      description: 'Look for foundations with neutral to slightly warm undertones. You can handle some warmth but avoid very yellow bases.',
      shades: [
        { name: 'Warm Ivory', hex: '#F0E6D4', description: 'Light with neutral warmth' },
        { name: 'Natural Beige', hex: '#E0D0B8', description: 'Medium-light neutral' },
        { name: 'Warm Sand', hex: '#D4B896', description: 'Medium with warmth' },
        { name: 'Deep Beige', hex: '#C4A080', description: 'Medium-deep neutral' },
        { name: 'Toffee Neutral', hex: '#A68B6B', description: 'Deep with neutral-warm undertones' },
        { name: 'Chestnut Warm', hex: '#8B7355', description: 'Rich deep with warm-neutral base' },
        { name: 'Mahogany', hex: '#75553B', description: 'Very deep with warm olive undertones' },
        { name: 'Deep Espresso', hex: '#5C3D28', description: 'Deep rich with neutral-warm base' },
        { name: 'Ebony Neutral', hex: '#3E2A1A', description: 'Deepest with neutral undertones' }
      ]
    },

    tips: [
      'Deep, rich colors are your strength - embrace burgundies and forest greens',
      'You can wear some warm tones that other Winters cannot',
      'Bronze and copper metallics work beautifully on you',
      'Avoid pastels and very bright colors',
      'Brown-black mascara can be softer than pure black',
      'Contour with cool-toned bronzers'
    ]
  },
  
  'fire-air': {
    eyeshadow: [
      { name: 'Electric Blue', hex: '#0066FF', description: 'Vibrant and striking' },
      { name: 'Fuchsia', hex: '#FF00FF', description: 'Bold and bright' },
      { name: 'Bright Silver', hex: '#D8D8D8', description: 'Icy highlight' },
      { name: 'Violet', hex: '#8B00FF', description: 'Vivid purple' },
      { name: 'Turquoise', hex: '#40E0D0', description: 'Fresh and bright' },
      { name: 'Cool Gray', hex: '#808080', description: 'Neutral base' }
    ],
    mascara: [
      { name: 'Jet Black', hex: '#000000', description: 'Essential for definition' },
      { name: 'Electric Blue', hex: '#0066FF', description: 'Fun pop of color' }
    ],
    lipstick: [
      { name: 'Hot Pink', hex: '#FF1493', description: 'Your signature bright' },
      { name: 'Fuchsia', hex: '#FD3DB5', description: 'Vibrant and fun' },
      { name: 'Cherry Red', hex: '#DE3163', description: 'Classic bright red' },
      { name: 'Magenta', hex: '#FF00FF', description: 'Bold statement' },
      { name: 'Cool Pink Nude', hex: '#E8C4C4', description: 'Subtle option' },
      { name: 'Bright Coral', hex: '#FF6B6B', description: 'Fresh and lively' }
    ],
    blush: [
      { name: 'Bright Pink', hex: '#FF69B4', description: 'Fresh and vibrant' },
      { name: 'Cool Coral', hex: '#FF6B6B', description: 'Lively flush' },
      { name: 'Fuchsia', hex: '#FD3DB5', description: 'Bold color' },
      { name: 'Rose', hex: '#FF007F', description: 'Classic bright' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for foundations with cool pink undertones. Your skin has clarity that needs clean, bright bases.',
      shades: [
        { name: 'Porcelain', hex: '#F5E6E0', description: 'Fair with pink undertones' },
        { name: 'Light Cool', hex: '#F0E0D6', description: 'Light with clarity' },
        { name: 'Medium Cool', hex: '#E0D0C0', description: 'Medium with cool base' },
        { name: 'Tan Cool', hex: '#D0B8A0', description: 'Medium-deep cool' },
        { name: 'Caramel Cool', hex: '#B89878', description: 'Deep with cool-pink clarity' },
        { name: 'Toffee Bright', hex: '#9C7C5C', description: 'Rich deep with bright cool undertones' },
        { name: 'Cocoa Bright', hex: '#7D5E42', description: 'Very deep with clear cool-red base' },
        { name: 'Espresso Bright', hex: '#5E3F28', description: 'Deep rich with vibrant cool undertones' },
        { name: 'Ebony Cool', hex: '#402A18', description: 'Deepest with cool clarity' }
      ]
    },

    tips: [
      'Bright, saturated colors are your playground',
      'You can wear neon and electric shades beautifully',
      'Silver and white gold metallics enhance your brightness',
      'Avoid muted, dusty colors - they will dull you',
      'Bright eyeliner colors can be fun for you',
      'Your skin needs clear, bright makeup - no muddy tones'
    ]
  },
  
  'fire-water': {
    eyeshadow: [
      { name: 'Soft Plum', hex: '#8E4585', description: 'Elegant and refined' },
      { name: 'Rose Pink', hex: '#FF66B2', description: 'Soft and pretty' },
      { name: 'Periwinkle', hex: '#8E8EFF', description: 'Cool and dreamy' },
      { name: 'Teal', hex: '#008080', description: 'Sophisticated depth' },
      { name: 'Lavender', hex: '#B57EDC', description: 'Soft and romantic' },
      { name: 'Slate', hex: '#708090', description: 'Cool neutral' }
    ],
    mascara: [
      { name: 'Soft Black', hex: '#1C1C1C', description: 'Slightly softer than jet black' },
      { name: 'Plum', hex: '#8E4585', description: 'Subtle color option' }
    ],
    lipstick: [
      { name: 'Rose Pink', hex: '#FF66B2', description: 'Your signature shade' },
      { name: 'Raspberry', hex: '#E30B5C', description: 'Rich and elegant' },
      { name: 'Soft Berry', hex: '#8E4585', description: 'Sophisticated' },
      { name: 'Mauve', hex: '#915F6D', description: 'Subtle and refined' },
      { name: 'Cool Nude', hex: '#C4AEAD', description: 'Natural look' },
      { name: 'Plum Rose', hex: '#C4649C', description: 'Evening elegance' }
    ],
    blush: [
      { name: 'Soft Rose', hex: '#FFB6C1', description: 'Natural flush' },
      { name: 'Cool Pink', hex: '#FFD1DC', description: 'Delicate color' },
      { name: 'Mauve', hex: '#E0B0FF', description: 'Sophisticated' },
      { name: 'Soft Plum', hex: '#DDA0DD', description: 'Subtle depth' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for foundations with cool pink undertones but slightly softer than True Winter shades.',
      shades: [
        { name: 'Soft Porcelain', hex: '#F8EDE8', description: 'Fair with soft pink' },
        { name: 'Light Rose', hex: '#F0E4DC', description: 'Light with rosy undertones' },
        { name: 'Medium Rose', hex: '#E4D4C8', description: 'Medium with cool base' },
        { name: 'Soft Beige', hex: '#D8C4B4', description: 'Medium with pink undertones' },
        { name: 'Rose Toffee', hex: '#C0A08C', description: 'Medium-deep with soft rosy undertones' },
        { name: 'Plum Chestnut', hex: '#A08068', description: 'Deep with cool rose-brown base' },
        { name: 'Cocoa Rose', hex: '#856450', description: 'Rich deep with soft cool-red undertones' },
        { name: 'Espresso Rose', hex: '#6A4838', description: 'Very deep with muted cool-plum base' },
        { name: 'Deep Ebony Rose', hex: '#4E3425', description: 'Deepest with soft cool undertones' }
      ]
    },

    tips: [
      'Softer versions of Winter colors work best for you',
      'Rose and plum tones are particularly flattering',
      'Avoid very bright or very dark extremes',
      'Rose gold metallics can work for you',
      'Soft smoky eyes suit you better than harsh lines',
      'Your makeup should look refined and elegant, not dramatic'
    ]
  },

  // WATER SUBTYPES (Summer)
  'water-water': {
    eyeshadow: [
      { name: 'Dusty Rose', hex: '#D4A5A5', description: 'Soft and romantic' },
      { name: 'Soft Blue', hex: '#6B8BA4', description: 'Cool and serene' },
      { name: 'Lavender', hex: '#B4A7D6', description: 'Dreamy and soft' },
      { name: 'Mauve', hex: '#C4A4C4', description: 'Elegant neutral' },
      { name: 'Soft Teal', hex: '#5F9EA0', description: 'Subtle depth' },
      { name: 'Cocoa', hex: '#8B7D7B', description: 'Soft neutral' }
    ],
    mascara: [
      { name: 'Soft Black', hex: '#2C2C2C', description: 'Softer than jet black' },
      { name: 'Brown-Black', hex: '#3D2314', description: 'Natural definition' },
      { name: 'Plum', hex: '#8E4585', description: 'Subtle color' }
    ],
    lipstick: [
      { name: 'Dusty Rose', hex: '#D4A5A5', description: 'Your signature shade' },
      { name: 'Soft Mauve', hex: '#C4A4C4', description: 'Elegant and refined' },
      { name: 'Rose Pink', hex: '#E8A4B8', description: 'Pretty and soft' },
      { name: 'Soft Berry', hex: '#A4879C', description: 'Subtle depth' },
      { name: 'Nude Rose', hex: '#C4AEAD', description: 'Natural beauty' },
      { name: 'Soft Plum', hex: '#B5A4A4', description: 'Sophisticated' }
    ],
    blush: [
      { name: 'Soft Rose', hex: '#E8C4C4', description: 'Natural flush' },
      { name: 'Dusty Pink', hex: '#D4A5A5', description: 'Signature color' },
      { name: 'Soft Mauve', hex: '#C4A4C4', description: 'Elegant' },
      { name: 'Powder Pink', hex: '#FFE4E1', description: 'Delicate' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for foundations with soft pink or neutral-cool undertones. Avoid anything too warm or too stark.',
      shades: [
        { name: 'Soft Ivory', hex: '#F8F0E8', description: 'Fair with soft cool tones' },
        { name: 'Light Rose', hex: '#F0E4DC', description: 'Light with pink undertones' },
        { name: 'Soft Beige', hex: '#E8DCD0', description: 'Medium-light cool' },
        { name: 'Rose Beige', hex: '#DCD0C4', description: 'Medium with rosy base' },
        { name: 'Dusty Toffee', hex: '#C8B4A8', description: 'Medium-deep with soft cool-pink undertones' },
        { name: 'Rose Chestnut', hex: '#A89484', description: 'Deep with muted cool-rose base' },
        { name: 'Soft Cocoa', hex: '#8C7868', description: 'Rich deep with soft cool undertones' },
        { name: 'Muted Espresso', hex: '#705C4C', description: 'Very deep with quiet cool-pink base' },
        { name: 'Deep Ebony Rose', hex: '#584438', description: 'Deepest with soft cool undertones' }
      ]
    },
    tips: [
      'Soft, muted colors are your strength',
      'Avoid anything too bright or too dark',
      'Dusty rose is your power color across all categories',
      'Brushed silver and soft metallics work best',
      'Keep your makeup soft and blended - no harsh lines',
      'Powder formulas often work better than high-shine'
    ]
  },
  
  'water-air': {
    eyeshadow: [
      { name: 'Soft Pink', hex: '#F4C2C2', description: 'Light and pretty' },
      { name: 'Sky Blue', hex: '#87CEEB', description: 'Fresh and airy' },
      { name: 'Light Lavender', hex: '#E6E6FA', description: 'Delicate and dreamy' },
      { name: 'Soft Mint', hex: '#98D8C8', description: 'Fresh highlight' },
      { name: 'Dove Gray', hex: '#B0B0B0', description: 'Soft neutral' },
      { name: 'Powder Blue', hex: '#B0E0E6', description: 'Light and cool' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Soft and natural' },
      { name: 'Soft Black', hex: '#2C2C2C', description: 'For more definition' },
      { name: 'Navy', hex: '#000080', description: 'Subtle color' }
    ],
    lipstick: [
      { name: 'Soft Pink', hex: '#F4C2C2', description: 'Your signature shade' },
      { name: 'Light Rose', hex: '#FFE4E1', description: 'Barely there' },
      { name: 'Soft Coral', hex: '#E8B4B8', description: 'Gentle warmth' },
      { name: 'Pink Nude', hex: '#E8D4D4', description: 'Natural beauty' },
      { name: 'Light Mauve', hex: '#D8C4C4', description: 'Subtle elegance' },
      { name: 'Soft Peach', hex: '#FFDAB9', description: 'Delicate color' }
    ],
    blush: [
      { name: 'Soft Pink', hex: '#FFE4E1', description: 'Delicate flush' },
      { name: 'Light Rose', hex: '#F4C2C2', description: 'Natural glow' },
      { name: 'Soft Peach', hex: '#FFDAB9', description: 'Gentle warmth' },
      { name: 'Baby Pink', hex: '#FFD1DC', description: 'Fresh and youthful' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for light foundations with soft pink undertones. Your delicate coloring needs gentle, light coverage.',
      shades: [
        { name: 'Porcelain', hex: '#FFF8F0', description: 'Very fair with pink' },
        { name: 'Light Ivory', hex: '#F8F0E8', description: 'Fair with soft cool' },
        { name: 'Soft Beige', hex: '#F0E8E0', description: 'Light with cool base' },
        { name: 'Light Sand', hex: '#E8E0D8', description: 'Light-medium cool' },
        { name: 'Rose Caramel', hex: '#D4CCC0', description: 'Medium with delicate cool-pink undertones' },
        { name: 'Soft Toffee', hex: '#B8A89C', description: 'Medium-deep with gentle cool-rose base' },
        { name: 'Cool Cocoa', hex: '#9C8C7C', description: 'Deep with soft cool undertones' },
        { name: 'Gentle Espresso', hex: '#807060', description: 'Rich deep with light cool-pink base' },
        { name: 'Deep Ebony Soft', hex: '#645448', description: 'Deepest with delicate cool undertones' }
      ]
    },
    tips: [
      'Light, delicate colors suit your ethereal quality',
      'Avoid anything too dark or too saturated',
      'Soft pink and sky blue are your best friends',
      'Keep makeup light and fresh - less is more',
      'Cream and liquid formulas give a dewy finish',
      'Brown mascara often looks more natural than black'
    ]
  },
  
  'water-earth': {
    eyeshadow: [
      { name: 'Dusty Pink', hex: '#D8B4B4', description: 'Soft and muted' },
      { name: 'Sage', hex: '#9CAF88', description: 'Earthy and soft' },
      { name: 'Dusty Blue', hex: '#8BA8B7', description: 'Cool and muted' },
      { name: 'Mushroom', hex: '#A4978E', description: 'Perfect neutral' },
      { name: 'Soft Mauve', hex: '#C4A4B4', description: 'Elegant' },
      { name: 'Greige', hex: '#B8B0A8', description: 'Versatile base' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Natural and soft' },
      { name: 'Soft Black', hex: '#2C2C2C', description: 'More definition' },
      { name: 'Charcoal', hex: '#4A4A4A', description: 'Softer alternative' }
    ],
    lipstick: [
      { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Your signature' },
      { name: 'Soft Mauve', hex: '#C4A4B4', description: 'Elegant choice' },
      { name: 'Mushroom Pink', hex: '#B5A4A4', description: 'Muted and sophisticated' },
      { name: 'Dusty Coral', hex: '#C4948C', description: 'Subtle warmth' },
      { name: 'Greige Nude', hex: '#B8B0A8', description: 'Natural' },
      { name: 'Soft Plum', hex: '#A4879C', description: 'Depth without drama' }
    ],
    blush: [
      { name: 'Dusty Rose', hex: '#D8B4B4', description: 'Signature flush' },
      { name: 'Soft Mauve', hex: '#C4A4B4', description: 'Elegant' },
      { name: 'Mushroom', hex: '#B5A4A4', description: 'Muted and natural' },
      { name: 'Dusty Peach', hex: '#C4A494', description: 'Subtle warmth' }
    ],
    foundation: {
      undertone: 'neutral',
      description: 'Look for foundations with neutral undertones - neither too pink nor too yellow. Muted, soft bases work best.',
      shades: [
        { name: 'Soft Ivory', hex: '#F0E8E0', description: 'Light neutral' },
        { name: 'Natural Beige', hex: '#E8DCD0', description: 'Light-medium neutral' },
        { name: 'Soft Sand', hex: '#DCD0C4', description: 'Medium neutral' },
        { name: 'Mushroom Beige', hex: '#D0C4B8', description: 'Medium with muted tone' },
        { name: 'Muted Toffee', hex: '#B8AC9C', description: 'Medium-deep with soft neutral undertones' },
        { name: 'Dusty Chestnut', hex: '#9C8C7C', description: 'Deep with muted neutral base' },
        { name: 'Soft Cocoa', hex: '#807060', description: 'Rich deep with quiet neutral undertones' },
        { name: 'Muted Espresso', hex: '#645448', description: 'Very deep with soft neutral-cool base' },
        { name: 'Deep Ebony Neutral', hex: '#4C3C34', description: 'Deepest with muted neutral undertones' }
      ]
    },
    tips: [
      'Muted, dusty colors are your strength',
      'Avoid anything too bright, too dark, or too saturated',
      'Greige and mushroom tones are uniquely flattering',
      'Soft metallics like pewter work better than bright silver',
      'Keep everything soft and blended',
      'Your makeup should look effortless and understated'
    ]
  },
  
  'water-fire': {
    eyeshadow: [
      { name: 'Rose Pink', hex: '#E8A4B8', description: 'Cool and pretty' },
      { name: 'Cool Blue', hex: '#6495ED', description: 'Clear and refined' },
      { name: 'Orchid', hex: '#DA70D6', description: 'Vibrant but soft' },
      { name: 'Teal', hex: '#4A8B8B', description: 'Sophisticated depth' },
      { name: 'Wisteria', hex: '#C9A0DC', description: 'Romantic' },
      { name: 'Slate', hex: '#708090', description: 'Cool neutral' }
    ],
    mascara: [
      { name: 'Black', hex: '#000000', description: 'For definition' },
      { name: 'Plum', hex: '#8E4585', description: 'Subtle color' },
      { name: 'Navy', hex: '#000080', description: 'Cool alternative' }
    ],
    lipstick: [
      { name: 'Rose Pink', hex: '#E8A4B8', description: 'Your signature' },
      { name: 'Raspberry', hex: '#C4647C', description: 'Rich and cool' },
      { name: 'Orchid', hex: '#DA70D6', description: 'Vibrant option' },
      { name: 'Cool Berry', hex: '#8E4585', description: 'Sophisticated' },
      { name: 'Soft Fuchsia', hex: '#C4649C', description: 'Bold but refined' },
      { name: 'Mauve', hex: '#915F6D', description: 'Elegant neutral' }
    ],
    blush: [
      { name: 'Rose Pink', hex: '#E8A4B8', description: 'Signature flush' },
      { name: 'Cool Pink', hex: '#FFB6C1', description: 'Fresh and pretty' },
      { name: 'Soft Berry', hex: '#C4647C', description: 'Adds depth' },
      { name: 'Orchid', hex: '#DA70D6', description: 'Vibrant' }
    ],
    foundation: {
      undertone: 'cool',
      description: 'Look for foundations with clear cool undertones. You can handle slightly more saturation than other Summers.',
      shades: [
        { name: 'Cool Ivory', hex: '#F5E8E0', description: 'Fair with cool pink' },
        { name: 'Light Rose', hex: '#EDE0D8', description: 'Light with clarity' },
        { name: 'Cool Beige', hex: '#E0D4C8', description: 'Medium-light cool' },
        { name: 'Rose Sand', hex: '#D4C4B8', description: 'Medium with pink base' },
        { name: 'Rose Toffee', hex: '#C0A898', description: 'Medium-deep with clear cool-pink undertones' },
        { name: 'Cool Chestnut', hex: '#A08878', description: 'Deep with cool rose-brown base' },
        { name: 'Berry Cocoa', hex: '#846C5C', description: 'Rich deep with cool-red undertones' },
        { name: 'Deep Rose Espresso', hex: '#685040', description: 'Very deep with cool berry-plum base' },
        { name: 'Ebony Cool', hex: '#50382C', description: 'Deepest with clear cool undertones' }
      ]
    },
    tips: [
      'You can wear slightly brighter colors than other Summers',
      'Cool pinks and berries are particularly flattering',
      'Silver metallics work well for you',
      'You can handle more contrast than other Water types',
      'Black mascara works well for you',
      'Your makeup can be more defined than other Summers'
    ]
  },

  // EARTH SUBTYPES (Autumn)
  'earth-earth': {
    eyeshadow: [
      { name: 'Terracotta', hex: '#CC4E3E', description: 'Warm and earthy' },
      { name: 'Olive', hex: '#808000', description: 'Natural and rich' },
      { name: 'Copper', hex: '#B87333', description: 'Warm metallic' },
      { name: 'Mustard', hex: '#FFDB58', description: 'Golden warmth' },
      { name: 'Moss', hex: '#4A5D23', description: 'Deep green' },
      { name: 'Camel', hex: '#C19A6B', description: 'Warm neutral' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Your signature color' },
      { name: 'Black-Brown', hex: '#1C1410', description: 'For more drama' },
      { name: 'Auburn', hex: '#8B4513', description: 'Warm alternative' }
    ],
    lipstick: [
      { name: 'Terracotta', hex: '#CC4E3E', description: 'Your power color' },
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Fresh and warm' },
      { name: 'Rust', hex: '#B7410E', description: 'Rich autumn shade' },
      { name: 'Pumpkin', hex: '#FF7518', description: 'Vibrant warmth' },
      { name: 'Nude Camel', hex: '#C19A6B', description: 'Natural beauty' },
      { name: 'Copper Rose', hex: '#B87333', description: 'Warm and sophisticated' }
    ],
    blush: [
      { name: 'Terracotta', hex: '#CC4E3E', description: 'Signature warmth' },
      { name: 'Warm Peach', hex: '#FFCBA4', description: 'Natural glow' },
      { name: 'Copper', hex: '#B87333', description: 'Rich flush' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Soft warmth' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with golden or peachy undertones. Avoid pink-based foundations.',
      shades: [
        { name: 'Warm Ivory', hex: '#F5E8D8', description: 'Fair with golden undertones' },
        { name: 'Golden Beige', hex: '#E8D8C4', description: 'Light with warmth' },
        { name: 'Warm Sand', hex: '#DCC8B0', description: 'Medium with golden base' },
        { name: 'Caramel', hex: '#C4A888', description: 'Medium-deep warm' },
        { name: 'Warm Toffee', hex: '#A8906C', description: 'Medium-deep with rich golden-earthy undertones' },
        { name: 'Golden Chestnut', hex: '#8C7454', description: 'Deep with warm golden-olive base' },
        { name: 'Amber Cocoa', hex: '#745C3C', description: 'Rich deep with warm amber undertones' },
        { name: 'Deep Bronze', hex: '#5C4428', description: 'Very deep with warm bronze-golden base' },
        { name: 'Rich Ebony Warm', hex: '#44301C', description: 'Deepest with warm golden undertones' }
      ]
    },
    tips: [
      'Warm, earthy colors are your strength',
      'Gold and bronze metallics are essential',
      'Brown mascara often looks more natural than black',
      'Avoid cool pinks and blue-based colors',
      'Cream and satin finishes suit your warm coloring',
      'Terracotta is your signature color across all categories'
    ]
  },
  

  'earth-fire': {
    eyeshadow: [
      { name: 'Burgundy', hex: '#722F37', description: 'Deep and rich' },
      { name: 'Forest Green', hex: '#228B22', description: 'Intense depth' },
      { name: 'Bronze', hex: '#CD7F32', description: 'Warm metallic' },
      { name: 'Mahogany', hex: '#4E0707', description: 'Dark and dramatic' },
      { name: 'Espresso', hex: '#3C1414', description: 'Deep neutral' },
      { name: 'Copper', hex: '#B87333', description: 'Rich warmth' }
    ],
    mascara: [
      { name: 'Black-Brown', hex: '#1C1410', description: 'Rich and deep' },
      { name: 'Black', hex: '#000000', description: 'For drama' },
      { name: 'Deep Brown', hex: '#3D2314', description: 'Warm depth' }
    ],
    lipstick: [
      { name: 'Burgundy', hex: '#722F37', description: 'Your signature' },
      { name: 'Oxblood', hex: '#4A0000', description: 'Deep and dramatic' },
      { name: 'Deep Plum', hex: '#4A0E4E', description: 'Rich evening shade' },
      { name: 'Mahogany', hex: '#4E0707', description: 'Sophisticated depth' },
      { name: 'Warm Berry', hex: '#8B0000', description: 'Rich and warm' },
      { name: 'Bronze Nude', hex: '#A4846C', description: 'Natural warmth' }
    ],
    blush: [
      { name: 'Deep Rose', hex: '#C4647C', description: 'Rich flush' },
      { name: 'Warm Plum', hex: '#8E4585', description: 'Depth and warmth' },
      { name: 'Bronze', hex: '#CD7F32', description: 'Warm glow' },
      { name: 'Berry', hex: '#722F37', description: 'Deep color' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with warm, olive, or golden undertones. You can handle deeper, richer bases.',
      shades: [
        { name: 'Warm Beige', hex: '#E8D4C0', description: 'Light with warmth' },
        { name: 'Golden Sand', hex: '#D8C4A8', description: 'Medium-light warm' },
        { name: 'Olive Beige', hex: '#C8B494', description: 'Medium with olive' },
        { name: 'Deep Golden', hex: '#B89C78', description: 'Medium-deep warm' },
        { name: 'Warm Toffee', hex: '#A08460', description: 'Medium-deep with rich warm-olive undertones' },
        { name: 'Bronze Chestnut', hex: '#886C48', description: 'Deep with warm bronze-olive base' },
        { name: 'Deep Olive', hex: '#705434', description: 'Rich deep with warm olive-golden undertones' },
        { name: 'Rich Espresso', hex: '#5C4024', description: 'Very deep with warm amber-olive base' },
        { name: 'Ebony Warm', hex: '#442C18', description: 'Deepest with warm golden-olive undertones' }
      ]
    },
    tips: [

      'Deep, rich colors are your strength',
      'You can wear darker shades than other Autumns',
      'Bronze and antique gold metallics are perfect',
      'Burgundy is your power color',
      'Avoid pastels and very bright colors',
      'Smoky eyes in warm browns and burgundies suit you'
    ]
  },
  
  'earth-water': {
    eyeshadow: [
      { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Soft and muted' },
      { name: 'Sage', hex: '#9CAF88', description: 'Muted green' },
      { name: 'Soft Terracotta', hex: '#C4847C', description: 'Warm and soft' },
      { name: 'Mushroom', hex: '#A4978E', description: 'Perfect neutral' },
      { name: 'Muted Olive', hex: '#8B8B6B', description: 'Soft earth tone' },
      { name: 'Greige', hex: '#B8B0A8', description: 'Versatile base' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Natural and soft' },
      { name: 'Soft Black', hex: '#2C2C2C', description: 'More definition' },
      { name: 'Taupe', hex: '#8B8589', description: 'Very soft' }
    ],
    lipstick: [
      { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Your signature' },
      { name: 'Soft Terracotta', hex: '#C4847C', description: 'Muted warmth' },
      { name: 'Dusty Coral', hex: '#C4948C', description: 'Soft and warm' },
      { name: 'Mushroom Pink', hex: '#B5A4A4', description: 'Sophisticated' },
      { name: 'Soft Rust', hex: '#B4847C', description: 'Muted depth' },
      { name: 'Nude Beige', hex: '#C4B4A4', description: 'Natural' }
    ],
    blush: [
      { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Signature flush' },
      { name: 'Soft Terracotta', hex: '#C4847C', description: 'Warm and muted' },
      { name: 'Dusty Peach', hex: '#C4A494', description: 'Gentle warmth' },
      { name: 'Mushroom', hex: '#B5A4A4', description: 'Very soft' }
    ],
    foundation: {
      undertone: 'neutral',
      description: 'Look for foundations with neutral to slightly warm undertones. Avoid anything too saturated or too cool.',
      shades: [
        { name: 'Soft Ivory', hex: '#F0E8DC', description: 'Light neutral-warm' },
        { name: 'Natural Beige', hex: '#E4D8C8', description: 'Light-medium neutral' },
        { name: 'Soft Sand', hex: '#D8C8B8', description: 'Medium neutral' },
        { name: 'Mushroom Beige', hex: '#C8B8A8', description: 'Medium muted' },
        { name: 'Muted Toffee', hex: '#B0A090', description: 'Medium-deep with soft neutral undertones' },
        { name: 'Soft Chestnut', hex: '#988474', description: 'Deep with muted neutral-warm base' },
        { name: 'Mushroom Cocoa', hex: '#7C6C5C', description: 'Rich deep with soft neutral undertones' },
        { name: 'Muted Espresso', hex: '#645448', description: 'Very deep with quiet neutral-warm base' },
        { name: 'Deep Ebony Neutral', hex: '#4C3C34', description: 'Deepest with muted neutral undertones' }
      ]
    },

    tips: [
      'Muted, dusty colors are your strength',
      'Avoid anything too bright or too saturated',
      'Soft metallics like brushed gold work best',
      'Keep makeup soft and blended',
      'Mushroom and greige tones are uniquely flattering',
      'Your makeup should look effortless and natural'
    ]
  },
  
  'earth-air': {
    eyeshadow: [
      { name: 'Golden Yellow', hex: '#FFD700', description: 'Bright and warm' },
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Fresh and vibrant' },
      { name: 'Amber', hex: '#FFBF00', description: 'Rich gold' },
      { name: 'Tangerine', hex: '#FF9966', description: 'Warm and bright' },
      { name: 'Warm Green', hex: '#9ACD32', description: 'Fresh lime' },
      { name: 'Camel', hex: '#C19A6B', description: 'Warm neutral' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Natural warmth' },
      { name: 'Black-Brown', hex: '#1C1410', description: 'More definition' },
      { name: 'Auburn', hex: '#8B4513', description: 'Warm alternative' }
    ],
    lipstick: [
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Your signature' },
      { name: 'Tangerine', hex: '#FF9966', description: 'Bright and warm' },
      { name: 'Golden Peach', hex: '#FFCBA4', description: 'Fresh and natural' },
      { name: 'Amber', hex: '#FFBF00', description: 'Bold gold' },
      { name: 'Warm Nude', hex: '#D4B896', description: 'Natural beauty' },
      { name: 'Salmon', hex: '#FA8072', description: 'Fresh warmth' }
    ],
    blush: [
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Signature flush' },
      { name: 'Golden Peach', hex: '#FFCBA4', description: 'Sunny glow' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Fresh warmth' },
      { name: 'Tangerine', hex: '#FF9966', description: 'Vibrant' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with golden or peachy undertones. Your warm coloring needs sunny, bright bases.',
      shades: [
        { name: 'Golden Ivory', hex: '#F8E8D4', description: 'Fair with golden glow' },
        { name: 'Warm Beige', hex: '#ECD8C0', description: 'Light with warmth' },
        { name: 'Golden Sand', hex: '#DCC8A8', description: 'Medium-light warm' },
        { name: 'Sunny Beige', hex: '#CCB890', description: 'Medium with golden base' },
        { name: 'Warm Caramel', hex: '#B8A074', description: 'Medium-deep with sunny golden warmth' },
        { name: 'Golden Toffee', hex: '#A0885C', description: 'Deep with bright warm-golden undertones' },
        { name: 'Amber Cocoa', hex: '#886C44', description: 'Rich deep with warm amber-golden base' },
        { name: 'Deep Bronze', hex: '#6C5430', description: 'Very deep with warm bronze undertones' },
        { name: 'Rich Ebony Warm', hex: '#503C22', description: 'Deepest with warm golden undertones' }
      ]
    },

    tips: [
      'Warm, bright colors are your strength',
      'Gold metallics are essential for you',
      'Coral and peach tones are particularly flattering',
      'Avoid cool colors and muted tones',
      'Your makeup should look sunny and radiant',
      'Cream and dewy finishes enhance your glow'
    ]
  },

  // AIR SUBTYPES (Spring)
  'air-air': {
    eyeshadow: [
      { name: 'Coral', hex: '#FF7F50', description: 'Warm and vibrant' },
      { name: 'Warm Yellow', hex: '#FFE135', description: 'Sunny and bright' },
      { name: 'Apple Green', hex: '#8DB600', description: 'Fresh and lively' },
      { name: 'Peach', hex: '#FFCBA4', description: 'Soft warmth' },
      { name: 'Turquoise', hex: '#40E0D0', description: 'Clear and bright' },
      { name: 'Camel', hex: '#C19A6B', description: 'Warm neutral' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Natural and warm' },
      { name: 'Black-Brown', hex: '#1C1410', description: 'More definition' },
      { name: 'Navy', hex: '#000080', description: 'Subtle color' }
    ],
    lipstick: [
      { name: 'Coral', hex: '#FF7F50', description: 'Your signature shade' },
      { name: 'Warm Pink', hex: '#FF6B6B', description: 'Fresh and pretty' },
      { name: 'Peach', hex: '#FFCBA4', description: 'Natural beauty' },
      { name: 'Tangerine', hex: '#FF9966', description: 'Bright and warm' },
      { name: 'Warm Nude', hex: '#D4C4A8', description: 'Subtle warmth' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Soft and fresh' }
    ],
    blush: [
      { name: 'Coral', hex: '#FF7F50', description: 'Signature flush' },
      { name: 'Peach', hex: '#FFCBA4', description: 'Natural glow' },
      { name: 'Warm Pink', hex: '#FF6B6B', description: 'Fresh color' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Soft warmth' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with golden or peachy undertones. Your clear coloring needs fresh, warm bases.',
      shades: [
        { name: 'Warm Ivory', hex: '#F8F0E0', description: 'Fair with golden glow' },
        { name: 'Light Peach', hex: '#F0E4D4', description: 'Light with warmth' },
        { name: 'Golden Beige', hex: '#E4D4C0', description: 'Medium-light warm' },
        { name: 'Warm Sand', hex: '#D8C4A8', description: 'Medium with golden base' },
        { name: 'Warm Caramel', hex: '#C8B08C', description: 'Medium-deep with clear golden warmth' },
        { name: 'Golden Toffee', hex: '#B09470', description: 'Deep with fresh warm-golden undertones' },
        { name: 'Peach Cocoa', hex: '#987858', description: 'Rich deep with warm peach-golden base' },
        { name: 'Warm Espresso', hex: '#7C5C40', description: 'Very deep with clear warm undertones' },
        { name: 'Deep Ebony Golden', hex: '#604430', description: 'Deepest with warm golden undertones' }
      ]
    },

    tips: [
      'Warm, clear colors are your strength',
      'Coral is your power color across all categories',
      'Gold and rose gold metallics are perfect',
      'Avoid muted, dusty colors - they will dull you',
      'Keep makeup fresh and light',
      'Cream and dewy finishes enhance your glow'
    ]
  },
  
  'air-water': {
    eyeshadow: [
      { name: 'Peach', hex: '#FFCBA4', description: 'Soft and warm' },
      { name: 'Light Coral', hex: '#F08080', description: 'Gentle warmth' },
      { name: 'Soft Yellow', hex: '#FFFACD', description: 'Light and sunny' },
      { name: 'Mint', hex: '#98FB98', description: 'Fresh and light' },
      { name: 'Blush', hex: '#FFB6C1', description: 'Soft pink' },
      { name: 'Cream', hex: '#FFFDD0', description: 'Neutral base' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Soft and natural' },
      { name: 'Soft Black', hex: '#2C2C2C', description: 'For more definition' },
      { name: 'Auburn', hex: '#8B4513', description: 'Warm alternative' }
    ],
    lipstick: [
      { name: 'Soft Peach', hex: '#FFDAB9', description: 'Your signature' },
      { name: 'Light Coral', hex: '#F08080', description: 'Gentle warmth' },
      { name: 'Blush Pink', hex: '#FFB6C1', description: 'Soft and pretty' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Fresh and light' },
      { name: 'Nude Pink', hex: '#E8D4D4', description: 'Natural beauty' },
      { name: 'Soft Coral', hex: '#E8B4B8', description: 'Delicate warmth' }
    ],
    blush: [
      { name: 'Soft Peach', hex: '#FFDAB9', description: 'Signature flush' },
      { name: 'Light Coral', hex: '#F08080', description: 'Gentle glow' },
      { name: 'Blush Pink', hex: '#FFB6C1', description: 'Soft and fresh' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Natural warmth' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for light foundations with soft golden or peachy undertones. Your delicate coloring needs gentle, warm bases.',
      shades: [
        { name: 'Porcelain Warm', hex: '#FFF8F0', description: 'Very fair with warmth' },
        { name: 'Light Ivory', hex: '#F8F0E4', description: 'Fair with soft golden' },
        { name: 'Soft Beige', hex: '#F0E4D8', description: 'Light with warmth' },
        { name: 'Light Sand', hex: '#E8DCD0', description: 'Light-medium warm' },
        { name: 'Warm Caramel', hex: '#D8C8B4', description: 'Medium with soft golden warmth' },
        { name: 'Soft Toffee', hex: '#C0AC94', description: 'Medium-deep with gentle peachy-golden base' },
        { name: 'Honey Cocoa', hex: '#A4907C', description: 'Deep with soft warm undertones' },
        { name: 'Warm Espresso', hex: '#887460', description: 'Rich deep with gentle golden-peach base' },
        { name: 'Deep Ebony Soft', hex: '#6C5848', description: 'Deepest with soft warm undertones' }

      ]
    },
    tips: [
      'Light, delicate warm colors suit you best',
      'Avoid anything too dark or too saturated',
      'Soft peach and blush pink are your friends',
      'Keep makeup light and fresh - less is more',
      'Cream formulas give a natural, dewy finish',
      'Brown mascara often looks more natural than black'
    ]
  },
  
  'air-fire': {
    eyeshadow: [
      { name: 'Hot Coral', hex: '#FF6B6B', description: 'Bright and warm' },
      { name: 'Electric Yellow', hex: '#FFFF00', description: 'Vivid and bold' },
      { name: 'Bright Turquoise', hex: '#00CED1', description: 'Clear and vibrant' },
      { name: 'Hot Pink', hex: '#FF69B4', description: 'Bold and fun' },
      { name: 'Vivid Orange', hex: '#FF6600', description: 'Energetic' },
      { name: 'Bright Green', hex: '#00FF00', description: 'Electric' }
    ],
    mascara: [
      { name: 'Black', hex: '#000000', description: 'For maximum definition' },
      { name: 'Navy', hex: '#000080', description: 'Subtle color' },
      { name: 'Brown-Black', hex: '#1C1410', description: 'Softer option' }
    ],
    lipstick: [
      { name: 'Hot Coral', hex: '#FF6B6B', description: 'Your signature' },
      { name: 'Vivid Orange', hex: '#FF6600', description: 'Bold and bright' },
      { name: 'Hot Pink', hex: '#FF69B4', description: 'Fun and vibrant' },
      { name: 'Bright Red', hex: '#FF0000', description: 'Classic bold' },
      { name: 'Tangerine', hex: '#FF9966', description: 'Fresh and bright' },
      { name: 'Warm Nude', hex: '#D4B896', description: 'Subtle option' }
    ],
    blush: [
      { name: 'Hot Coral', hex: '#FF6B6B', description: 'Signature flush' },
      { name: 'Bright Pink', hex: '#FF69B4', description: 'Vibrant glow' },
      { name: 'Vivid Peach', hex: '#FF9966', description: 'Fresh and bright' },
      { name: 'Warm Red', hex: '#FF6347', description: 'Bold color' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with clear, warm undertones. Your bright coloring needs fresh, clear bases.',
      shades: [
        { name: 'Warm Ivory', hex: '#F8F0E0', description: 'Fair with clarity' },
        { name: 'Golden Light', hex: '#F0E4D0', description: 'Light with warmth' },
        { name: 'Clear Beige', hex: '#E4D4BC', description: 'Medium-light warm' },
        { name: 'Warm Sand', hex: '#D8C4A4', description: 'Medium with golden base' },
        { name: 'Bright Toffee', hex: '#C4A880', description: 'Medium-deep with clear warm golden tones' },
        { name: 'Golden Deep', hex: '#A88C64', description: 'Deep with vivid warm-golden undertones' },
        { name: 'Warm Cocoa', hex: '#8C7048', description: 'Rich deep with bright warm-amber base' },
        { name: 'Vivid Espresso', hex: '#705430', description: 'Very deep with clear warm undertones' },
        { name: 'Deep Ebony Warm', hex: '#543C20', description: 'Deepest with warm golden clarity' }

      ]
    },
    tips: [
      'Bright, saturated warm colors are your playground',
      'You can wear neon and electric shades beautifully',
      'Gold and bright metallics enhance your vibrancy',
      'Avoid muted, dusty colors - they will dull you',
      'Black mascara and eyeliner work well for you',
      'Your makeup should look energetic and vibrant'
    ]
  },
  
  'air-earth': {
    eyeshadow: [
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Rich warmth' },
      { name: 'Golden Yellow', hex: '#FFD700', description: 'Sunny and warm' },
      { name: 'Amber', hex: '#FFBF00', description: 'Deep gold' },
      { name: 'Salmon', hex: '#FA8072', description: 'Warm pink' },
      { name: 'Warm Green', hex: '#9ACD32', description: 'Fresh lime' },
      { name: 'Caramel', hex: '#FFD59A', description: 'Warm neutral' }
    ],
    mascara: [
      { name: 'Brown', hex: '#5C4033', description: 'Natural warmth' },
      { name: 'Black-Brown', hex: '#1C1410', description: 'More definition' },
      { name: 'Auburn', hex: '#8B4513', description: 'Warm alternative' }
    ],
    lipstick: [
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Your signature' },
      { name: 'Golden Peach', hex: '#FFDAB9', description: 'Sunny and warm' },
      { name: 'Salmon', hex: '#FA8072', description: 'Fresh warmth' },
      { name: 'Amber', hex: '#FFBF00', description: 'Bold gold' },
      { name: 'Warm Nude', hex: '#D4C4A8', description: 'Natural beauty' },
      { name: 'Mango', hex: '#FF8243', description: 'Vibrant warmth' }
    ],
    blush: [
      { name: 'Warm Coral', hex: '#FF6F61', description: 'Signature flush' },
      { name: 'Golden Peach', hex: '#FFDAB9', description: 'Sunny glow' },
      { name: 'Salmon', hex: '#FA8072', description: 'Fresh warmth' },
      { name: 'Apricot', hex: '#FBCEB1', description: 'Natural' }
    ],
    foundation: {
      undertone: 'warm',
      description: 'Look for foundations with rich golden or peachy undertones. Your warm coloring needs sunny, radiant bases.',
      shades: [
        { name: 'Golden Ivory', hex: '#F8E8D0', description: 'Fair with golden glow' },
        { name: 'Warm Beige', hex: '#ECD8BC', description: 'Light with warmth' },
        { name: 'Golden Sand', hex: '#DCC8A4', description: 'Medium-light warm' },
        { name: 'Sunny Beige', hex: '#CCB88C', description: 'Medium with golden base' },
        { name: 'Warm Caramel', hex: '#B89C70', description: 'Medium-deep with rich golden warmth' },
        { name: 'Golden Toffee', hex: '#9C8058', description: 'Deep with warm golden undertones' },
        { name: 'Amber Cocoa', hex: '#806440', description: 'Rich deep with warm amber base' },
        { name: 'Deep Bronze', hex: '#64482C', description: 'Very deep with warm bronze undertones' },
        { name: 'Rich Ebony Warm', hex: '#4A3420', description: 'Deepest with warm golden undertones' }

      ]
    },
    tips: [
      'Warm, golden colors are your strength',
      'Gold metallics are essential for you',
      'Coral and peach tones are particularly flattering',
      'Avoid cool colors and very muted tones',
      'Your makeup should look warm and radiant',
      'Cream and satin finishes enhance your glow'
    ]
  }
};

// Helper function to get makeup palette for a subtype
export const getMakeupPalette = (subtypeId: string): MakeupPalette | undefined => {
  return makeupPalettes[subtypeId];
};
