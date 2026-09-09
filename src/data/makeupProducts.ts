// Makeup product recommendations from popular brands

export interface MakeupProduct {
  name: string;
  brand: string;
  price: number;
  url: string;
  shade?: string;
}

export interface ProductRecommendations {
  eyeshadow: MakeupProduct[];
  mascara: MakeupProduct[];
  lipstick: MakeupProduct[];
  blush: MakeupProduct[];
  foundation: MakeupProduct[];
}

// Product database organized by color type/undertone
export const makeupProducts: Record<string, ProductRecommendations> = {
  // FIRE SUBTYPES (Winter - Cool, High Contrast)
  'fire-fire': {
    eyeshadow: [
      { name: 'Sorrento Eyeshadow Palette', brand: 'NARS', price: 59, url: 'https://www.narscosmetics.com/USA/quad-eyeshadow/999NAC0000081.html?dwvar_999NAC0000081_color=4251180328&cgid=eyeshadow' },
      { name: 'Luxury Palette - The Rock Chick', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-rock-chick' },
      { name: 'Eye Shadow x 9 - Burgundy Times Nine', brand: 'MAC', price: 35, url: 'https://www.maccosmetics.com/product/13835/22507/products/makeup/eyes/eye-palettes-kits/eye-shadow-x-9-burgundy-times-nine' },
      { name: 'Xenon Eyeshadow Palette', brand: 'Natasha Denona', price: 128, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/xenon-eyeshadow-palette' },
      { name: 'Naked Shaped Multi-Tasking Cool', brand: 'Urban Decay', price: 54, url: 'https://www.urbandecay.com/naked-shaped-multi-tasking-eyeshadow-palette-cool/ud1305.html' }
    ],
    mascara: [
      { name: 'Lash Sensational Sky High Mascara', brand: 'Maybelline', price: 13, url: 'https://www.maybelline.com/eye-makeup/mascara/lash-sensational-sky-high-washable-mascara-makeup?variant=Blackest+Black', shade: 'Blackest Black' },
      { name: 'Better Than Sex Mascara', brand: 'Too Faced', price: 29, url: 'https://www.toofaced.com/product/23484/59115/eye-makeup/mascara/better-than-sex-volumizing-mascara#/shade/Black', shade: 'Black' },
      { name: 'Climax Mascara', brand: 'NARS', price: 26, url: 'https://www.narscosmetics.com/USA/uncensored-black-climax-extreme-mascara/999NAC0000113.html' }
    ],
    lipstick: [
      { name: 'Ruby Woo', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/52593/products/makeup/lips/lipstick/retro-matte-lipstick', shade: 'Ruby Woo' },
      { name: 'Luxe Cashmere', brand: 'Bobbi Brown', price: 34, url: 'https://www.bobbibrowncosmetics.com/product/2342/136804/makeup/lips/lipstick/luxe-cashmere-matte-lipstick', shade: 'pink suede' },
      { name: 'Velvet Matte Lip Pencil', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powermatte-high-intensity-lip-pencil/999NAC0000172.html', shade: 'Cruella' },
      { name: 'Rouge Dior', brand: 'Dior', price: 45, url: 'https://www.dior.com/en_us/beauty/products/rouge-dior-Y0356009.html?q=rouge%20dior', shade: '999' },
      { name: 'Lip Cheat - Pillow Talk', brand: 'Charlotte Tilbury', price: 25, url: 'https://www.charlottetilbury.com/us/product/lip-cheat-red-carpet-red', shade: 'Red Carpet' },
      { name: 'Vice Lipstick', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/urban-decay-vice-lipstick-vegan-longwear/ud771.html?dwvar_ud771_color=BAD%20BLOOD%20%28MATTE%29', shade: 'Bad Blood' }
    ],
    blush: [
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Dolce Vita' },
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-pillow-talk', shade: 'Pillow Talk Original' },
      { name: 'Mineralized Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/31094/products/makeup/face/blush-bronzer/mineralize-blush-baked-powder-blush?shade=Gentle', shade: 'Gentle' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829596807', shade: 'Faith' }
    ],
    foundation: [
      { name: 'Pro Filt\'r Soft Matte Foundation', brand: 'Fenty Beauty', price: 40, url: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation-100?variant=35178862444589' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Natural Radiant Longwear Foundation', brand: 'NARS', price: 49, url: 'https://www.narscosmetics.com/USA/natural-matte-longwear-foundation/999NAC0000285.html?dwvar_999NAC0000285_color=4251155135&cgid=foundation' },
      { name: 'Studio Fix Fluid', brand: 'MAC', price: 38, url: 'https://www.maccosmetics.com/product/13847/120613/products/makeup/face/foundation/studio-fix-fluid-spf-15-24hr-matte-foundation-oil-control' }
    ]
  },

  'fire-earth': {
    eyeshadow: [
      { name: 'Soft Glam Eyeshadow Palette', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/soft-glam-palette' },
      { name: 'Luxury Palette - The Dolce Vita', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-dolce-vita' },
      { name: 'Eyes to Mesmerize', brand: 'Charlotte Tilbury', price: 44, url: 'https://www.charlottetilbury.com/us/product/eyes-to-mesmerise-chocolate-bronze', shade: 'Chocolate Bronze' },
      { name: 'Mothership III:Subversive', brand: 'Pat McGrath Labs', price: 59, url: 'https://www.patmcgrath.com/products/mothership-iii-subversive?_pos=11&_sid=c10ae8007&_ss=r' },
      { name: 'Eye Shadow x 9 - Amber Times Nine', brand: 'MAC', price: 35, url: 'https://www.maccosmetics.com/product/13835/22508/products/makeup/eyes/eye-palettes-kits/eye-shadow-x-9-amber-times-nine' },
      { name: 'Tartelette In Bloom', brand: 'Tarte', price: 39, url: 'https://tartecosmetics.com/products/tartelette-in-bloom-amazonian-clay-palette' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982519541', shade: 'Black' },
      { name: 'Legendary Lashes Volume 2', brand: 'Charlotte Tilbury', price: 29, url: 'https://www.charlottetilbury.com/us/product/legendary-lashes-vol2-volumising-mascara' },
      { name: 'In Extreme Dimension', brand: 'MAC', price: 28, url: 'https://www.maccosmetics.com/product/13839/26749/products/makeup/eyes/mascara/in-extreme-dimension-3d-black-lash-mascara' }
    ],
    lipstick: [
      { name: 'Velvet Teddy', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/310/products/makeup/lips/lipstick/matte-lipstick', shade: 'Velvet Teddy' },
      { name: 'Walk of No Shame', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-walk-of-no-shame' },
      { name: 'Powermatte High Intensity', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/powermatte-high-intensity-lip-pencil/999NAC0000172.html?dwvar_999NAC0000172_color=4251139890&cgid=dolce-vita', shade: 'Dolce Vita' },
      { name: 'Happikiss Lipstick', brand: 'Charlotte Tilbury', price: 10, url: 'https://www.charlottetilbury.com/us/product/hyaluronic-happikiss-lipstick-romance-kiss', shade: 'Romance Kiss' },
      { name: 'Stunna Lip Paint', brand: 'Fenty Beauty', price: 26, url: 'https://fentybeauty.com/products/stunna-lip-paint-longwear-fluid-lip-color-uncensored', shade: 'Uncensored' },
      { name: 'Crushed Lipstick', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Cranberry', shade: 'Cranberry' }
    ],
    blush: [
      { name: 'The Multiple', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/the-multiple/999NAC0000269.html', shade: 'Fierce' },
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-walk-of-no-shame', shade: 'Walk of No Shame' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Ruby_Wooed', shade: 'Ruby Wooed' },
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049753333', shade: 'Haze' }
    ],
    foundation: [
      { name: 'Luminous Silk Foundation', brand: 'Giorgio Armani', price: 69, url: 'https://www.giorgioarmanibeauty-usa.com/makeup/face/foundation/luminous-silk-natural-glow-blurring-foundation/ww-01019-arm.html?cgid=foundation' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation#' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Weightless Skin Foundation', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/129115/makeup/face/foundation/weightless-skin-foundation-spf-15#/family/all' }
    ]
  },

  'fire-air': {
    eyeshadow: [
      { name: 'Ethereal Eye Gloss:Supercluster', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/ethereal-eye-gloss?variant=47542006219043' },
      { name: 'Luxury Palette - The Glamour Muse', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-glamour-muse' },
      { name: 'Moondust Eyeshadow', brand: 'Urban Decay', price: 39, url: 'https://www.urbandecay.com/247-moondust-eyeshadow/ud1051.html?dwvar_ud1051_color=COSMIC', shade: 'Cosmic Sheer White' },
      { name: 'Blitz Astral Quad', brand: 'Pat McGrath Labs', price: 128, url: 'https://www.patmcgrath.com/products/blitz-astral-quad', shade: 'Nocturnal Nirvana' },
      { name: 'Snap Shadows Mix & Match Eyeshadow Palette - 2', brand: 'Fenty Beauty', price: 25, url: 'https://fentybeauty.com/products/snap-shadows-mix-match-eyeshadow-palette' },
      { name: 'Roxa Eyeshadow Palette', brand: 'Natasha Denona', price: 65, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/roxa-eyeshadow-palette' }
    ],
    mascara: [
      { name: 'Hello Thicc', brand: 'Fenty Beauty', price: 24, url: 'https://fentybeauty.com/products/hella-thicc-volumizing-mascara-electrip-blue', shade: 'Elec\'trip Blue' },
      { name: 'Tubing Mascara', brand: 'Tarte', price: 5, url: 'https://tartecosmetics.com/products/tartelette-tubing-mascara?variant=58119349534742', shade: 'Magenta' },
      { name: 'Dark Star Volumizing Mascara', brand: 'Pat McGrath Labs', price: 30, url: 'https://www.patmcgrath.com/products/dark-star-mascara' }
    ],
    lipstick: [
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Candy_Yum_Yum', shade: 'Candy Yum Yum' },
      { name: 'Retro Matte Lipstick', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/52593/products/makeup/lips/lipstick/retro-matte-lipstick?shade=Relentlessly_Red', shade: 'Relentlessly Red' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-lip-shine/999NAC0000122.html', shade: 'Spring Fever' },
      { name: 'Poutsicle Lip Stain', brand: 'Fenty Beauty', price: 24, url: 'https://fentybeauty.com/products/poutsicle-hydrating-lip-stain-fuchsia-wife?variant=41593241010221', shade: 'Fuchsia Wife' },
      { name: 'MatteTrance Lipstick - Elson', brand: 'Pat McGrath Labs', price: 38, url: 'https://www.patmcgrath.com/products/mattetrance-lipstick' },
      { name: 'Vice Lipbond Glossy', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/vice-lip-bond-liquid-lipstick/ud1230.html?dwvar_ud1230_color=Crushing', shade: 'Crushing' }
    ],
    blush: [
      { name: 'Exhibit A Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Exhiibit A' },
      { name: 'Cheek Pop', brand: 'Clinique', price: 26, url: 'https://www.clinique.com/product/1593/29770/makeup/blushers/cheek-poptm-powder-blush?shade=Pink_Pop', shade: 'Pink Pop' },
      { name: 'Glow Play', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/126125/products/makeup/face/blush-bronzer/glow-play-cushiony-blush?shade=Heat_Index#', shade: 'Heat Index' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829531271', shade: 'Lucky' }
    ],
    foundation: [
      { name: 'Eaze Drop Blurring Skin Tint', brand: 'Fenty Beauty', price: 32, url: 'https://fentybeauty.com/products/eaze-drop-lightweight-blurring-skin-tint-6?variant=39355630977069' },
      { name: 'Light Reflecting Foundation', brand: 'NARS', price: 49, url: 'https://www.narscosmetics.com/USA/light-reflecting%E2%84%A2-advanced-skincare-foundation/999NAC0000141.html?dwvar_999NAC0000141_color=4251070384&cgid=foundation' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Skin Foundation Stick', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/29723/makeup/face/foundation/skin-foundation-stick#/family/all' }
    ]
  },

  'fire-water': {
    eyeshadow: [
      { name: 'Pillow Talk Instant Eye Palette', brand: 'Charlotte Tilbury', price: 75, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk' },
      { name: 'Sugar Mini EyeshadowPalette', brand: 'Anastasia Beverly Hills', price: 29, url: 'https://www.anastasiabeverlyhills.com/products/sugar-mini-eyeshadow-palette' },
      { name: 'Mothership I: Subliminal', brand: 'Pat McGrath Labs', price: 49, url: 'https://www.patmcgrath.com/products/mothership-i-subliminal?_pos=3&_sid=c10ae8007&_ss=r' },
      { name: 'Afterglow Palette', brand: 'NARS', price: 36, url: 'https://www.narscosmetics.com/USA/afterglow-tempting-eyeshadow-palette/0194251149011.html' },
      { name: 'Rose Metals Eyeshadow Palette', brand: 'Bobbi Brown', price: 55, url: 'https://www.bobbibrowncosmetics.com/product/14460/87706/makeup/eyes/eye-shadow/rose-metals-eyeshadow-palette' },
      { name: 'Glam Palette', brand: 'Natasha Denona', price: 65, url: 'https://www.natashadenona.com/glam-palette' }
    ],
    mascara: [
      { name: 'Legendary Lashes Volume 2', brand: 'Charlotte Tilbury', price: 29, url: 'https://www.charlottetilbury.com/us/product/legendary-lashes-vol2-volumising-mascara' },
      { name: 'Climax Mascara', brand: 'NARS', price: 26, url: 'https://www.narscosmetics.com/USA/uncensored-black-climax-extreme-mascara/999NAC0000113.html' },
      { name: 'Lash Idôle Mascara', brand: 'Lancôme', price: 29, url: 'https://www.lancome-usa.com/makeup/eye-makeup/mascaras/lash-idole-flutter-extension-lengthening-mascara/01102-LAC.html?dwvar_01102-LAC_color=Black&dwvar_01102-LAC_size=Full%20Size', shade: 'Black' }
    ],
    lipstick: [
      { name: 'Pillow Talk', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-lipstick-pillowtalk', shade: 'Original' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Twig_Twist', shade: 'Twig Twist' },
      { name: 'Luxe Lipstick', brand: 'NARS', price: 28, url: 'https://www.bobbibrowncosmetics.com/product/2342/106434/makeup/lips/lipstick/luxe-lipstick/fh22#/family/all', shade: 'Soft Berry' },
      { name: 'Runway Lip Color', brand: 'Tom Ford', price: 58, url: 'https://www.tomfordbeauty.com/products/lip-color?variant=53031540326613', shade: 'Iconic Nude' },
      { name: 'Luxe Lipstick', brand: 'Bobbi Brown', price: 38, url: 'https://www.bobbibrowncosmetics.com/product/2342/106434/makeup/lips/lipstick/luxe-lipstick/fh22#/shade/Wonderland_Rose', shade: 'Wonderland Rose' },
      { name: 'Soft Pinch Tinted Lip Oil - Hope', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-pillow-talk', shade: 'Pillow Talk Original' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Deep Throat' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Blushbaby', shade: 'Blushbaby' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829465735', shade: 'Happy' }
    ],
    foundation: [
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation#' },
      { name: 'Skin Long-Wear Weightless Foundation', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/62673/makeup/face-and-cheek/foundation/skin-long-wear-weightless-foundation-spf-15' },
      { name: 'Luminous Silk Foundation', brand: 'Giorgio Armani', price: 69, url: 'https://www.giorgioarmanibeauty-usa.com/makeup/face/foundation/luminous-silk-natural-glow-blurring-foundation/ww-01019-arm.html?cgid=foundation' }
    ]
  },

  // WATER SUBTYPES (Summer - Cool, Soft)
  'water-water': {
    eyeshadow: [
      { name: 'Denim Palette', brand: 'Charlotte Tilbury', price: 75, url: 'https://www.charlottetilbury.com/us/product/beautifying-eye-trends-palette-denim-dimension' },
      { name: 'Naked 2 Basics', brand: 'Urban Decay', price: 29, url: 'https://www.urbandecay.com/naked-2-basics-palette-by-urban-decay/283.html' },
      { name: 'Quad Eyeshadow', brand: 'NARS', price: 36, url: 'https://www.narscosmetics.com/USA/quad-eyeshadow/0194251173528.html', shade: 'Bloom' },
      { name: 'Eye Shadow - Satin Taupe', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Lidstar - Cub', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lidstar' },
      { name: 'Mini Eye Sculpt Cool', brand: 'Natasha Denona', price: 55, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/mini-eye-sculpt-palette?variant=47278939898030' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982519541', shade: 'Black' },
      { name: 'Lash Princess False Lash Effect', brand: 'Essence', price: 26, url: 'https://essencemakeup.com/collections/mascara/products/lash-princess-false-lash-effect-mascara-black-brown', shade: 'Black Brown' },
      { name: 'Telescopic Mascara', brand: "L'Oréal", price: 12, url: 'https://www.lorealparisusa.com/products/makeup/eye/mascara/telescopic-original-mascara.aspx' }
    ],
    lipstick: [
      { name: 'Pillow Talk', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-lipstick-first-dance', shade: 'First Dance' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Twig_Twist', shade: 'Twig Twist' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-sensual-shine-lipstick/999NAC0000154.html', shade: 'Bright Plum' },
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550819573', shade: 'Fuzz' },
      { name: 'Crushed Oil', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2340/72380/makeup/lips/lip-gloss/crushed-oil-infused-tinted-lip-gloss#/shade/Free_Spirit', shade: 'Free Spirit' },
      { name: 'Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil?variant=43734835101831', shade: 'Wonder' }
    ],
    blush: [
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049556725', shade: 'Wisp' },
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-pillow-talk', shade: 'Pillowtalk' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Blushbaby', shade: 'Blushbaby' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829826183', shade: 'Worth' }
    ],
    foundation: [
      { name: 'Skin Tint', brand: 'Glossier', price: 26, url: 'https://www.glossier.com/products/perfecting-skin-tint?variant=43781992382709' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Studio Radiance Face and Body', brand: 'MAC', price: 36, url: 'https://www.maccosmetics.com/product/13847/86415/products/makeup/face/foundation/studio-radiance-face-and-body-radiant-sheer-foundation?shade=C0' }
    ]
  },

  'water-air': {
    eyeshadow: [
      { name: 'Lidstar', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lidstar?variant=43781990023413', shade: 'Slip' },
      { name: 'Luxury Palette - Pillow Talk', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk' },
      { name: 'Eye Shadow - Naked Lunch', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Shimmer Wash', brand: 'Bobbi Brown', price: 29, url: 'https://www.bobbibrowncosmetics.com/product/2330/53791/makeup/eyes/eyeshadow/luxe-shimmer-eyeshadow#/shade/Melting_Point', shade: 'Melting Pot' },
      { name: 'Luxe Glam Compact', brand: 'Natasha Denona', price: 26, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/luxe-glam-compact?variant=47514559348910', shade: 'Rosy' },
      { name: 'Moondust Eyeshadow', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/eyes/moondust--quad-glitter-eyeshadow-palette-gift/ud1308.html', shade: 'Cosmic' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982519541', shade: 'Black' },
      { name: 'Cabaret Mascara', brand: 'Vivienne Sabó', price: 9, url: 'https://viviennesaboparis.com/products/cabaret-premiere?variant=45385692119218' },
      { name: 'Pillow Talk', brand: 'Charlotte Tilbury', price: 25, url: 'https://www.charlottetilbury.com/us/product/pillow-talk-push-up-lashes-mascara-dream-pop', shade: 'Push Up' }
    ],
    lipstick: [
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550622965', shade: 'Like' },
      { name: 'Pillow Talk Medium', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-lipstick-pillow-talk-medium', shade: 'Medium' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/128593/products/makeup/lips/lipstick/macximal-sleek-satin-lipstick?shade=Cr%C3%ABme_Cup', shade: 'Crème Cup' },
      { name: 'Runway Lip Color', brand: 'Tom Ford', price: 58, url: 'https://www.tomfordbeauty.com/products/lip-color?variant=53031540523221', shade: 'Slip' },
      { name: 'Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil?variant=43734835069063', shade: 'Hope' },
      { name: 'Balm Dotcom', brand: 'Glossier', price: 14, url: 'https://www.glossier.com/products/balm-dotcom?_pos=1&_psq=dotcom&_psid=623c28b01&_ss=e&_v=1.0&variant=46731565859061', shade: 'Cherry' }
    ],
    blush: [
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049589493', shade: 'Beam' },
      { name: 'Cheek Pop', brand: 'Clinique', price: 26, url: 'https://www.clinique.com/product/1593/29770/makeup/blushers/cheek-poptm-powder-blush?shade=Nude_Pop', shade: 'Nude Pop' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Pinch_Me', shade: 'Pinch Me' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829564039', shade: 'Bliss' }
    ],
    foundation: [
      { name: 'Skin Tint', brand: 'Glossier', price: 26, url: 'https://www.glossier.com/products/perfecting-skin-tint?variant=43781992382709' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Even Better Clinical Foundation', brand: 'Clinique', price: 37, url: 'https://www.clinique.com/product/1599/131489/makeup/foundations/even-better-clinicaltm-vitamin-makeup-broad-spectrum-spf-45?shade=LC1_Light_Cool_1' },
      { name: 'Soft Matte Complete Foundation', brand: 'NARS', price: 42, url: 'https://www.narscosmetics.com/USA/soft-matte-complete-foundation/999NAC0000112.html?dwvar_999NAC0000112_color=4251004013&cgid=foundation' }
    ]
  },

  'water-earth': {
    eyeshadow: [
      { name: 'Naked 3 Soft Pink Palette', brand: 'Urban Decay', price: 29, url: 'https://www.urbandecay.com/naked-3-palette-by-urban-decay/409.html' },
      { name: 'Luxury Palette - The Sophisticate', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-sophisticate' },
      { name: 'Eye Shadow - Wedge', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Quad Eyeshadow- Melrose', brand: 'NARS', price: 36, url: 'https://www.narscosmetics.com/USA/quad-eyeshadow/999NAC0000081.html' },
      { name: 'Eye Shadow - Omega', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Biba Palette', brand: 'Natasha Denona', price: 65, url: 'https://www.natashadenona.com/biba-palette' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982388469', shade: 'Brown' },
      { name: 'Liquid Lash Extensions', brand: 'Thrive', price: 21, url: 'https://thrivecausemetics.com/products/liquid-lash-extensions-mascara?queryID=832732472b86dc1a2696f959182f7858&indexName=shopify_products&variant=42231968661594', shade: 'Charcoal' },
      { name: 'Smokey Eye Mascara', brand: 'Bobbi Brown', price: 32, url: 'https://www.bobbibrowncosmetics.com/product/2332/27021/makeup/eyes/mascara/smokey-eye-mascara/ss14' }
    ],
    lipstick: [
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Velvet_Teddy', shade: 'Velvet Teddy' },
      { name: 'Super Nude', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/k-i-s-s-i-n-g-penelope-pink-1', shade: 'Penelope Pink' },
      { name: 'Explicit Lipstick', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/explicit-lipstick/999NAC0000221.html?dwvar_999NAC0000221_color=4251171746&cgid=best-sellers', shade: 'Sidicitious' },
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550655733', shade: 'Zip' },
      { name: 'Crushed Oil Lip Gloss', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2340/72380/makeup/lips/lip-gloss/crushed-oil-infused-tinted-lip-gloss#/shade/Force_of_Nature', shade: 'Force of Nature' },
      { name: 'High Shine Lip Color', brand: 'NYX', price: 8, url: 'https://www.nyxcosmetics.com/lip/lip-gloss/shine-loud-high-shine-lip-color-gloss/NYX_935.html?dwvar_NYX__935_color=OVERNIGHT%20HERO', shade: 'Overnight Hero' }
    ],
    blush: [
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049720565', shade: 'Dusk' },
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-pillow-talk-intense', shade: 'Pillowtalk Deep' },
      { name: 'Glow Play Cushiony Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/126125/products/makeup/face/blush-bronzer/glow-play-cushiony-blush?shade=True_Harmony', shade: 'True Harmony' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829826183', shade: 'Worth' }
    ],
    foundation: [
      { name: 'Stretch Concealer', brand: 'Glossier', price: 22, url: 'https://www.glossier.com/products/stretch-balm-concealer?variant=43957671657717' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Skin Weightless Powder', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/88403/makeup/face/foundation/skin-weightless-powder-foundation/fh21#/shade/Porcelain_%28N-' },
      { name: 'Studio Radiance Face and Body', brand: 'MAC', price: 36, url: 'https://www.maccosmetics.com/product/13847/86415/products/makeup/face/foundation/studio-radiance-face-and-body-radiant-sheer-foundation?shade=C0' }
    ]
  },

  'water-fire': {
    eyeshadow: [
      { name: 'Glow Pot - Metallic Burgundy', brand: 'Tarte', price: 49, url: 'https://tartecosmetics.com/products/glow-pot-eyeshadow?variant=62382752203121' },
      { name: 'Luxury Palette - The Vintage Vamp', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-vintage-vamp' },
      { name: 'Glidr Stick-Ultraplum', brand: 'Anastasia Beverly Hills', price: 36, url: 'https://www.anastasiabeverlyhills.com/products/glidr-eyeshadow-stick?variant=54593120633123' },
      { name: 'Eye Shadow - Sketch', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Mothership X: Moonlit Seduction', brand: 'Pat McGrath Labs', price: 128, url: 'https://www.patmcgrath.com/products/mothership-x-moonlit-seduction' },
      { name: 'Soft Glam II Palette', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/soft-glam-ii-mini-eyeshadow-palette' }
    ],
    mascara: [
      { name: 'Better Than Sex Mascara', brand: 'Too Faced', price: 29, url: 'https://www.toofaced.com/product/23484/59115/eye-makeup/mascara/better-than-sex-volumizing-mascara#/shade/Chocolate' },
      { name: 'Climax Mascara', brand: 'NARS', price: 26, url: 'https://www.narscosmetics.com/USA/explicit-black-climax-mascara/0607845070085.html?cgid=mascara' },
      { name: 'Legendary Lashes Volume 2', brand: 'Charlotte Tilbury', price: 29, url: 'https://www.charlottetilbury.com/us/product/legendary-lashes-vol2-volumising-mascara' }
    ],
    lipstick: [
      { name: 'Pillow Talk Intense', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/k-i-s-s-i-n-g-pillow-talk-intense', shade: 'Pillowtalk Deep' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Captive_Audience', shade: 'Captive Audience' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-sensual-shine-lipstick/999NAC0000154.html', shade: 'Bright Plum' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/80765/makeup/lips/lipstick/mini-crushed-lip-color/ss21', shade: 'Babe' },
      { name: 'Vice Lipstick - Backtalk', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/urban-decay-vice-lipstick-vegan-longwear/ud771.html', shade: 'Backtalk' },
      { name: 'Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil?variant=43734834970759', shade: 'Happy' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-love-is-the-drug', shade: 'Love is the Drug' },
      { name: 'The Multiple', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/the-multiple/999NAC0000269.html', shade: 'Dolce Vita' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Desert_Rose', shade: 'Desert Rose' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829826183', shade: 'Worth' }
    ],
    foundation: [
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Natural Radiant Longwear Foundation', brand: 'NARS', price: 49, url: 'https://www.narscosmetics.com/USA/natural-radiant-longwear-foundation/999NAC0000065.html?dwvar_999NAC0000065_color=7845066279&cgid=foundation' },
      { name: 'Skin Weightless Powder', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/88403/makeup/face/foundation/skin-weightless-powder-foundation/fh21#/shade/Porcelain_%28N-' },
      { name: 'Studio Fix Fluid', brand: 'MAC', price: 38, url: 'https://www.maccosmetics.com/product/13847/120613/products/makeup/face/foundation/studio-fix-fluid-spf-15-24hr-matte-foundation-oil-control' }
    ]
  },

  // EARTH SUBTYPES (Autumn - Warm, Rich)
  'earth-earth': {
    eyeshadow: [
      { name: 'Soft Glam Eyeshadow Palette', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/soft-glam-palette' },
      { name: 'Luxury Palette - The Golden Goddess', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-golden-goddess' },
      { name: 'Naked Half Baked', brand: 'Urban Decay', price: 54, url: 'https://www.urbandecay.com/naked-half--baked-eyeshadow-palette/ud1221.html' },
      { name: 'Eye Shadow x 9 - Amber Times Nine', brand: 'MAC', price: 35, url: 'https://www.maccosmetics.com/product/13835/22508/products/makeup/eyes/eye-palettes-kits/eye-shadow-x-9-amber-times-nine' },
      { name: 'I Need a Warm Palette', brand: 'Natasha Denona', price: 65, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/i-need-a-warm-eyeshadow-palette' },
      { name: 'Tartelette Toasted', brand: 'Tarte', price: 39, url: 'https://tartecosmetics.com/products/tartelette-toasted-eyeshadow-palette' }
    ],
    mascara: [
      { name: 'Extended Play', brand: 'MAC', price: 21, url: 'https://www.maccosmetics.com/product/13839/24962/products/makeup/eyes/mascara/extended-play-gigablack-lash-mascara?shade=Gigablack' },
      { name: 'Smokey Eye Mascara', brand: 'Bobbi Brown', price: 32, url: 'https://www.bobbibrowncosmetics.com/product/2332/27021/makeup/eyes/mascara/smokey-eye-mascara/ss14' },
      { name: 'Lash Sensational - Brown', brand: 'Maybelline', price: 11, url: 'https://www.maybelline.com/eye-makeup/mascara/lash-sensational-washable-mascara' }
    ],
    lipstick: [
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Marrakesh', shade: 'Marrakesh' },
      { name: 'Matte Revolution', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-walk-of-no-shame', shade: 'Walk of No Shame' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-lip-shine/999NAC0000122.html?dwvar_999NAC0000122_color=Orgasm&cgid=lips', shade: 'Abbey Road' },
      { name: 'Runway Lip Color', brand: 'Tom Ford', price: 58, url: 'https://www.tomfordbeauty.com/products/lip-color?variant=53031540588757', shade: 'Scarlet Rouge' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Telluride', shade: 'Telluride' },
      { name: 'Stunna Lip Paint - Unveil', brand: 'Fenty Beauty', price: 26, url: 'https://fentybeauty.com/products/stunna-lip-paint-longwear-fluid-lip-color-unveil?variant=43269264670765' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-ecstasy', shade: 'Ecstasy' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Madly' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Sunbasque', shade: 'Sunbasque' },
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049622261', shade: 'Dawn' }
    ],
    foundation: [
      { name: 'Luminous Silk Foundation', brand: 'Giorgio Armani', price: 69, url: 'https://www.giorgioarmanibeauty-usa.com/makeup/face/foundation/luminous-silk-natural-glow-blurring-foundation/ww-01019-arm.html?cgid=foundation' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Skin Weightless Powder', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/88403/makeup/face/foundation/skin-weightless-powder-foundation/fh21#/shade/Porcelain_%28N-' }
    ]
  },

  'earth-fire': {
    eyeshadow: [
      { name: '24/7 Eyeshadow', brand: 'Urban Decay', price: 54, url: 'https://www.urbandecay.com/urban-decay-eyeshadow-singles-24-7-shadow-gash/ud1316.html', shade: 'Gash' },
      { name: 'Luxury Palette - The Dolce Vita', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-dolce-vita' },
      { name: 'Mothership V: Bronze Seduction', brand: 'Pat McGrath Labs', price: 128, url: 'https://www.patmcgrath.com/products/mothership-v-bronze-seduction?_pos=5&_sid=c10ae8007&_ss=r' },
      { name: 'Embedded in Burgundy', brand: 'MAC', price: 35, url: 'https://www.maccosmetics.com/product/13835/115812/products/makeup/eyes/eye-palettes-kits/connect-in-colour-eye-shadow-palette-embedded-in-burgundy#' },
      { name: 'Quad Eyeshadow', brand: 'NARS', price: 59, url: 'https://www.narscosmetics.com/USA/quad-eyeshadow/0194251180335.html', shade: 'Taj Mahal' },
      { name: 'Sultry Eyeshadow Palette', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/sultry-mini-eyeshadow-palette' }
    ],
    mascara: [
      { name: 'Better Than Sex Mascara', brand: 'Too Faced', price: 29, url: 'https://www.toofaced.com/product/23484/59115/eye-makeup/mascara/better-than-sex-volumizing-mascara#/shade/Chocolate' },
      { name: 'Climax Mascara', brand: 'NARS', price: 26, url: 'https://www.narscosmetics.com/USA/explicit-black-climax-mascara/0607845070085.html?cgid=mascara' },
      { name: 'In Extreme Dimension', brand: 'MAC', price: 28, url: 'https://www.maccosmetics.com/product/13839/26749/products/makeup/eyes/mascara/in-extreme-dimension-3d-black-lash-mascara' }
    ],
    lipstick: [
      { name: 'Diva', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/310/products/makeup/lips/lipstick/matte-lipstick', shade: 'Diva' },
      { name: 'Walk of No Shame', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-walk-of-no-shame' },
      { name: 'Explicit Lipstick', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/explicit-lipstick/999NAC0000221.html?dwvar_999NAC0000221_color=4251171746&cgid=lipstick', shade: 'Cherry Brown' },
      { name: 'Rouge Dior', brand: 'Dior', price: 45, url: 'https://www.dior.com/en_us/beauty/products/rouge-dior-Y0356009.html?q=rouge%20dior', shade: '999' },
      { name: 'MatteTrance Lipstick - Flesh 3', brand: 'Pat McGrath Labs', price: 38, url: 'https://www.patmcgrath.com/products/mattetrance-lipstick' },
      { name: 'Vice Lipbond Glossy', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/vice-lip-bond-liquid-lipstick/ud1230.html?dwvar_ud1230_color=Give%20%27Em%20Backtalk', shade: 'Backtalk' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-walk-of-no-shame', shade: 'Walk of No Shame' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Hot One' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Raizin_The_Roof', shade: 'Raizan the Roof' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829924487', shade: 'Resilence' }
    ],
    foundation: [
      { name: 'Pro Filt\'r Soft Matte Foundation', brand: 'Fenty Beauty', price: 40, url: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation-100?variant=35178862444589' },
      { name: 'Natural Radiant Longwear Foundation', brand: 'NARS', price: 49, url: 'https://www.narscosmetics.com/USA/natural-radiant-longwear-foundation/999NAC0000065.html?dwvar_999NAC0000065_color=7845066279&cgid=foundation' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Studio Fix Fluid', brand: 'MAC', price: 38, url: 'https://www.maccosmetics.com/product/13847/120613/products/makeup/face/foundation/studio-fix-fluid-spf-15-24hr-matte-foundation-oil-control' }
    ]
  },

  'earth-water': {
    eyeshadow: [
      { name: 'Mini Gloom', brand: 'Natasha Denona', price: 29, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/mini-gloom-eyeshadow-palette' },
      { name: 'Luxury Palette - The Sophisticate', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-sophisticate' },
      { name: 'Super Neutral', brand: 'Charlotte Tilbury', price: 36, url: 'https://www.charlottetilbury.com/us/product/beautifying-eye-trends-palette-super-neutral' },
      { name: 'Eye Shadow - Wedge', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Biba Palette', brand: 'Natasha Denona', price: 65, url: 'https://www.natashadenona.com/biba-palette' },
      { name: 'Tartelette Glamazon Toasted Clay', brand: 'Tarte', price: 39, url: 'https://tartecosmetics.com/products/glamazon-amazonian-clay-eyeshadow-palette' }
    ],
    mascara: [
      { name: 'Lash Slick - Brown', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982388469', shade: 'Brown' },
      { name: 'Extended Play', brand: 'MAC', price: 21, url: 'https://www.maccosmetics.com/product/13839/24962/products/makeup/eyes/mascara/extended-play-gigablack-lash-mascara?shade=Gigablack' },
      { name: 'Super Nudes', brand: 'Bobbi Brown', price: 32, url: 'https://www.bobbibrowncosmetics.com/product/2332/27021/makeup/eyes/mascara/smokey-eye-mascara/ss14', shade: 'Nude Kate' }
    ],
    lipstick: [
      { name: 'Velvet Teddy', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/310/products/makeup/lips/lipstick/matte-lipstick', shade: 'Velvet Teddy' },
      { name: 'Super Nude', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/k-i-s-s-i-n-g-nude-kate-1' },
      { name: 'Explicit Lipstick', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/explicit-lipstick/0194251145006.html?gclsrc=aw.ds&gad_source=1&gad_campaignid=19671794632&gbraid=0AAAAADolTK4YzBxKfyMvMpXpMDYIsNHU0&gclid=Cj0KCQjwjvfSBhDpARIsAEiOpSvOJ66jwtQ4Z9yo59GUEkfkR-UuSe3rQpGw9WZjtol91rNi-r0E4YcaAuRpEALw_wcB', shade: 'Bite Me' },
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550557429', shade: 'Cake' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Brownie', shade: 'Brownie' },
      { name: 'Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil?variant=40386673180807', shade: 'Serenity' }
    ],
    blush: [
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049720565', shade: 'Dusk' },
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-pillow-talk-intense', shade: 'Pillowtalk Deep' },
      { name: 'Glow Play Cushiony Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/126125/products/makeup/face/blush-bronzer/glow-play-cushiony-blush?shade=True_Harmony#', shade: 'True Harmony' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829793415', shade: 'Virtue' }
    ],
    foundation: [
      { name: 'Skin Tint', brand: 'Glossier', price: 26, url: 'https://www.glossier.com/products/perfecting-skin-tint?variant=43781992382709' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Skin Weightless Powder', brand: 'Bobbi Brown', price: 52, url: 'https://www.bobbibrowncosmetics.com/product/14017/88403/makeup/face/foundation/skin-weightless-powder-foundation/fh21#/shade/Porcelain_%28N-' }
    ]
  },

  'earth-air': {
    eyeshadow: [
      { name: 'Fall Romance Palette', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/fall-romance-eyeshadow-palette' },
      { name: 'Luxury Palette - The Golden Goddess', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-golden-goddess' },
      { name: 'Toasted Mini Amazon', brand: 'Tarte', price: 49, url: 'https://tartecosmetics.com/products/tartelette-toasted-mini-amazonian-clay-palette' },
      { name: 'Eye Shadow - Goldmine', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Gold Palette', brand: 'Natasha Denona', price: 65, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/golden-eyeshadow-palette' },
      { name: 'Killawatt- Afternoon/Mo Hunny', brand: 'Fenty Beauty', price: 25, url: 'https://fentybeauty.com/products/killawatt-freestyle-highlighter-mo-hunnyafternoon-snack' }
    ],
    mascara: [
      { name: 'Better Than Sex Mascara', brand: 'Too Faced', price: 11, url: 'https://www.toofaced.com/product/23484/59115/eye-makeup/mascara/better-than-sex-volumizing-mascara#/shade/Chocolate', shade: 'Chocolate' },
      { name: 'Extended Play Perm Me Up Lash', brand: 'MAC', price: 21, url: 'https://www.maccosmetics.com/product/13839/60643/products/makeup/eyes/mascara/extended-play-perm-me-up-lash-mascara' },
      { name: 'Smokey Eye Mascara', brand: 'Bobbi Brown', price: 32, url: 'https://www.bobbibrowncosmetics.com/product/2332/27021/makeup/eyes/mascara/smokey-eye-mascara/ss14' }
    ],
    lipstick: [
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Mull_It_To_The_Max', shade: 'Mull It To The Max' },
      { name: 'Sexy Sienna', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-sexy-sienna' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-lip-shine/999NAC0000122.html?dwvar_999NAC0000122_color=Orgasm&cgid=orgasm-collection', shade: 'Orgasm' },
      { name: 'Gloss Bomb - Fenty Glow', brand: 'Fenty Beauty', price: 21, url: 'https://fentybeauty.com/products/gloss-bomb-heat-universal-lip-luminizer-plumper-fenty-glow-heat?variant=39594588274733' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Cabana', shade: 'Cabana' },
      { name: 'Soft Matte Lip Cream', brand: 'NYX', price: 8, url: 'https://www.nyxcosmetics.com/lip/lipstick/soft-matte-lip-cream/NYX_007.html?dwvar_NYX__007_color=Rome', shade: 'Rome' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-ecstasy', shade: 'Ecstasy' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Orgasm' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Peachtwist', shade: 'Peach Twist' },
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint-plush-blush?variant=46966506815733', shade: 'Beam' }
    ],
    foundation: [
      { name: 'Luminous Silk Foundation', brand: 'Giorgio Armani', price: 69, url: 'https://www.giorgioarmanibeauty-usa.com/makeup/face/foundation/luminous-silk-natural-glow-blurring-foundation/ww-01019-arm.html?cgid=foundation' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Eaze Drop Blurring Skin Tint', brand: 'Fenty Beauty', price: 32, url: 'https://fentybeauty.com/products/eaze-drop-lightweight-blurring-skin-tint-6?variant=39355630977069' }
    ]
  },

  // AIR SUBTYPES (Spring - Warm, Bright)
  'air-air': {
    eyeshadow: [
      { name: 'Cosmos', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/cosmos-eyeshadow-palette' },
      { name: 'Luxury Palette - The Golden Goddess', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-golden-goddess' },
      { name: 'Blitz Astral Quad:Ritualistic Rose', brand: 'Pat McGrath Labs', price: 49, url: 'https://www.patmcgrath.com/products/blitz-astral-quad?variant=30270053384261' },
      { name: 'Eye Shadow - All That Glitters', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Sip And Sparkle', brand: 'Fenty Beauty', price: 25, url: 'https://fentybeauty.com/products/shadowstix-longwear-eyeshadow-stick-sip-sparkle?variant=41650131107885' },
      { name: '24/7Eyeshadow Lucid', brand: 'Urban Decay', price: 48, url: 'https://www.urbandecay.com/urban-decay-eyeshadow-singles-24-7-shadow/ud1053.html?dwvar_ud1053_color=LUCID' }
    ],
    mascara: [
      { name: 'Lash Sensational - Brown', brand: 'Maybelline', price: 11, url: 'https://www.maybelline.com/eye-makeup/mascara/lash-sensational-washable-mascara' },
      { name: 'Extended Play', brand: 'MAC', price: 21, url: 'https://www.maccosmetics.com/product/13839/24962/products/makeup/eyes/mascara/extended-play-gigablack-lash-mascara?shade=Gigablack' },
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982388469' }
    ],
    lipstick: [
      { name: 'Lustre Glass Sheer', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/88565/products/makeup/lips/lipstick/lustreglass-sheer-shine-lipstick/mac-bronze?shade=See_Sheer', shade: 'See Sheer' },
      { name: 'Matte Revolution', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-sexy-sienna', shade: 'Sexy Sienna' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-lip-balm/999NAC0000283.html?dwvar_999NAC0000283_color=4251154732&cgid=orgasm-collection', shade: 'Orgasm' },
      { name: 'Gloss Bomb', brand: 'Fenty Beauty', price: 21, url: 'https://fentybeauty.com/products/gloss-bomb-universal-lip-luminizer-fenty-glow', shade: 'Fenty Glow' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Blondie_Pink', shade: 'Blondie Pink' },
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550590197', shade: 'Crush' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-ecstasy', shade: 'Ecstasy' },
      { name: 'Powder blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Orgasm' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Peachykeen', shade: 'Peachykeen' },
      { name: 'Cloud Paint - Beam', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint-plush-blush?variant=46966506815733' }
    ],
    foundation: [
      { name: 'Skin Tint', brand: 'Glossier', price: 26, url: 'https://www.glossier.com/products/perfecting-skin-tint?variant=43781992382709' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Eaze Drop Blurring Skin Tint', brand: 'Fenty Beauty', price: 32, url: 'https://fentybeauty.com/products/eaze-drop-lightweight-blurring-skin-tint-6?variant=39355630977069' }
    ]
  },

  'air-water': {
    eyeshadow: [
      { name: 'Lidstar - Slip', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lidstar' },
      { name: 'Luxury Palette - Pillow Talk', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-pillow-talk' },
      { name: 'Eye Shadow - Naked Lunch', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Shimmer Wash Eye Shadow - Champagne', brand: 'Bobbi Brown', price: 29, url: 'https://www.bobbibrowncosmetics.com/product/14460/7328/makeup/eyes/eye-shadow/shimmer-wash-eye-shadow' },
      { name: 'Ethereal Eye Gloss:Aurora', brand: 'Anastasia Beverly Hills', price: 25, url: 'https://www.anastasiabeverlyhills.com/products/ethereal-eye-gloss?variant=47542319481123' },
      { name: 'Glam Face Palette: Light', brand: 'Natasha Denona', price: 25, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/glam-face-palette?variant=42731155652782' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982519541', shade: 'Black' },
      { name: 'Lash Idol Flutter', brand: 'Lancome', price: 25, url: 'https://www.lancome-usa.com/makeup/eye-makeup/mascaras/lash-idole-flutter-extension-lengthening-mascara/01102-LAC.html?dwvar_01102-LAC_color=Brown&dwvar_01102-LAC_size=Full%20Size', shade: 'Brown' },
      { name: 'Cabaret Mascara', brand: 'Vivienne Sabó', price: 9, url: 'https://viviennesaboparis.com/products/cabaret', shade: 'Brown' }
    ],
    lipstick: [
      { name: 'Generation G', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/generation-g?variant=44209550622965', shade: 'Like' },
      { name: 'Matte Revolution', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-lipstick-pillow-talk-medium', shade: 'Pillow Talk Medium' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/128593/products/makeup/lips/lipstick/macximal-sleek-satin-lipstick?shade=Cr%C3%ABme_Cup', shade: 'Crème Cup' },
      { name: 'Gloss Bomb', brand: 'Fenty Beauty', price: 21, url: 'https://fentybeauty.com/products/gloss-bomb-universal-lip-luminizer-weet-mouth', shade: 'Sweet Mouth' },
      { name: 'Soft Pinch Tinted Lip Oil', brand: 'Rare Beauty', price: 20, url: 'https://www.rarebeauty.com/products/soft-pinch-tinted-lip-oil?variant=40386673180807', shade: 'Serenity' },
      { name: 'Balm Dotcom', brand: 'Glossier', price: 14, url: 'https://www.glossier.com/products/balm-dotcom?variant=46731565859061&_pos=1&_sid=f833603e1&_ss=r', shade: 'Cherry' }
    ],
    blush: [
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint-plush-blush?variant=46966506750197', shade: 'Puff' },
      { name: 'Cheek Pop', brand: 'Clinique', price: 26, url: 'https://www.clinique.com/product/1593/29770/makeup/blushers/cheek-poptm-powder-blush?shade=Peach_Pop', shade: 'Peach Pop' },
      { name: 'Skinfinish Colourstruck Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/143488/products/makeup/face/blush-bronzer/skinfinish-colourstruck-blush?shade=Peachykeen', shade: 'Peachykeen' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=43734829891719', shade: 'Dewy' }
    ],
    foundation: [
      { name: 'Skin Tint', brand: 'Glossier', price: 26, url: 'https://www.glossier.com/products/perfecting-skin-tint?variant=43781992382709' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Even Better Clinical Foundation', brand: 'Clinique', price: 37, url: 'https://www.clinique.com/product/1599/131489/makeup/foundations/even-better-clinicaltm-vitamin-makeup-broad-spectrum-spf-45?shade=LC1_Light_Cool_1' },
      { name: 'Studio Radiance Face and Body', brand: 'MAC', price: 36, url: 'https://www.maccosmetics.com/product/13847/86415/products/makeup/face/foundation/studio-radiance-face-and-body-radiant-sheer-foundation?shade=C0' }
    ]
  },

  'air-fire': {
    eyeshadow: [
      { name: 'Eyestick Sunny', brand: 'Anastasia Beverly Hills', price: 45, url: 'https://www.anastasiabeverlyhills.com/products/glidr-eyeshadow-stick?variant=54593121124643' },
      { name: 'Luxury Palette - The Rebel', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-rebel' },
      { name: 'Circo Loco Palette', brand: 'Natasha Denona', price: 39, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/circo-loco-eyeshadow-palette' },
      { name: 'Eye Shadow - Electric Eel', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Mothership IX: Huetopian Dream', brand: 'Pat McGrath Labs', price: 128, url: 'https://www.patmcgrath.com/products/mothership-ix-huetopian-dream?_pos=4&_sid=c10ae8007&_ss=r' },
      { name: 'Pillow Talk', brand: 'Charlotte Tilbury', price: 25, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-of-pops-pillow-talk' }
    ],
    mascara: [
      { name: 'Better Than Sex Mascara', brand: 'Too Faced', price: 29, url: 'https://www.toofaced.com/product/23484/59115/eye-makeup/mascara/better-than-sex-volumizing-mascara#/shade/Black', shade: 'Black' },
      { name: 'Lash Princess False Lash Effect', brand: 'Essence', price: 5, url: 'https://essencemakeup.com/collections/mascara/products/lash-princess-false-lash-effect-mascara-black-brown', shade: 'black brown' },
      { name: 'Hello Thicc Full Frontal', brand: 'Fenty Beauty', price: 24, url: 'https://fentybeauty.com/products/hella-thicc-volumizing-mascara-cuz-im-black?variant=41531397472301', shade: 'black' }
    ],
    lipstick: [
      { name: 'Lady Danger', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13854/310/products/makeup/lips/lipstick/matte-lipstick', shade: 'Lady Danger' },
      { name: 'Hot Lips', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/hot-lips-lipstick-tell-laura', shade: 'Tell Laura' },
      { name: 'Macximal Silky Matte', brand: 'MAC', price: 28, url: 'https://www.maccosmetics.com/product/13854/123863/products/makeup/lips/lipstick/macximal-silky-matte-lipstick?shade=Lady_Danger', shade: 'Lady Danger' },
      { name: 'Stunna Lip Paint', brand: 'Fenty Beauty', price: 26, url: 'https://fentybeauty.com/products/stunna-lip-paint-longwear-fluid-lip-color-uncensored', shade: 'Uncensored' },
      { name: 'Lip Oil', brand: 'NYX', price: 38, url: 'https://www.nyxcosmetics.com/lip/lip-gloss/fat-oil-lip-drip/NYX_1054.html?dwvar_NYX__1054_color=JUICY-BOO', shade: 'Juicy Boo' },
      { name: 'Vice Lipstick', brand: 'Urban Decay', price: 22, url: 'https://www.urbandecay.com/urban-decay-vice-lipstick-vegan-longwear/ud771.html?dwvar_ud771_color=DRIVE%20IN%20%28CREAM%29', shade: 'Drive In Crème' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-the-climax', shade: 'The Climax' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Exhibit A' },
      { name: 'Glow Play Cushiony Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/126125/products/makeup/face/blush-bronzer/glow-play-cushiony-blush?shade=Groovy', shade: 'Groovy' },
      { name: 'Soft Pinch Liquid Blush', brand: 'Rare Beauty', price: 23, url: 'https://www.rarebeauty.com/products/soft-pinch-liquid-blush?variant=34493780885639', shade: 'Grateful' }
    ],
    foundation: [
      { name: 'Pro Filt\'r Soft Matte Foundation', brand: 'Fenty Beauty', price: 40, url: 'https://fentybeauty.com/products/pro-filtr-soft-matte-longwear-foundation-100?variant=35178862444589' },
      { name: 'Airbrush Flawless Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/airbrush-flawless-foundation-shade-1-cool?from_multi_product_card=true' },
      { name: 'Natural Radiant Longwear Foundation', brand: 'NARS', price: 49, url: 'https://www.narscosmetics.com/USA/natural-radiant-longwear-foundation/999NAC0000065.html?dwvar_999NAC0000065_color=7845066279&cgid=foundation' },
      { name: 'Studio Fix Fluid', brand: 'MAC', price: 38, url: 'https://www.maccosmetics.com/product/13847/120613/products/makeup/face/foundation/studio-fix-fluid-spf-15-24hr-matte-foundation-oil-control' }
    ]
  },

  'air-earth': {
    eyeshadow: [
      { name: 'Mothership VII: Divine Rose', brand: 'Pat McGrath Labs', price: 45, url: 'https://www.patmcgrath.com/products/mothership-vii-divine-rose' },
      { name: 'Luxury Palette - The Golden Goddess', brand: 'Charlotte Tilbury', price: 53, url: 'https://www.charlottetilbury.com/us/product/luxury-palette-the-golden-goddess' },
      { name: 'Hypnotizing Shots-Diamond Eyes', brand: 'Charlotte Tilbury', price: 49, url: 'https://www.charlottetilbury.com/us/product/hypnotising-pop-shot-diamond-eyes' },
      { name: 'Eye Shadow - Amber Lights', brand: 'MAC', price: 22, url: 'https://www.maccosmetics.com/product/13840/363/products/makeup/eyes/shadow/eye-shadow' },
      { name: 'Sunset Palette', brand: 'Natasha Denona', price: 65, url: 'https://natashadenona.com/collections/eyeshadow-palettes/products/sunset-eyeshadow-palette' },
      { name: 'Exposed Amazonian Palette', brand: 'Tarte', price: 39, url: 'https://tartecosmetics.com/products/exposed-amazonian-clay-travel-palette' }
    ],
    mascara: [
      { name: 'Lash Slick', brand: 'Glossier', price: 18, url: 'https://www.glossier.com/products/lash-slick?variant=43781982388469' },
      { name: 'Lash Idol Flutter', brand: 'Lancome', price: 29, url: 'https://www.lancome-usa.com/makeup/eye-makeup/mascaras/lash-idole-flutter-extension-lengthening-mascara/01102-LAC.html?dwvar_01102-LAC_color=Brown&dwvar_01102-LAC_size=Full%20Size', shade: 'Brown' },
      { name: 'Imperial Mascara Ink', brand: 'Shiseido', price: 25, url: 'https://www.shiseido.com/us/en/imperiallash-mascaraink---sumi-black-0730852147706.html?cgid=eyes' }
    ],
    lipstick: [
      { name: 'Lip Glass Cushion Oil', brand: 'MAC', price: 23, url: 'https://www.maccosmetics.com/product/13853/142166/products/makeup/lips/lip-gloss/lipglass-cushion-high-pigment-lip-oil?shade=Slippery', shade: 'Slippery' },
      { name: 'Macximal Silky Matte', brand: 'Charlotte Tilbury', price: 34, url: 'https://www.charlottetilbury.com/us/product/matte-revolution-sexy-sienna', shade: 'Sexy Sienna' },
      { name: 'Afterglow Lip Shine', brand: 'NARS', price: 28, url: 'https://www.narscosmetics.com/USA/afterglow-sensual-shine-lipstick/999NAC0000154.html', shade: 'Last Change' },
      { name: 'Gloss Bomb - Fenty Glow', brand: 'Fenty Beauty', price: 21, url: 'https://fentybeauty.com/products/gloss-bomb-universal-lip-luminizer-fenty-glow' },
      { name: 'Crushed Lip Color', brand: 'Bobbi Brown', price: 31, url: 'https://www.bobbibrowncosmetics.com/product/2342/49493/makeup/lips/lipstick/crushed-lipstick/fh17#/shade/Italian_Rose', shade: 'Italian Rose' },
      { name: 'Smooth Matt Lip Cream', brand: 'NYX', price: 8, url: 'https://www.nyxcosmetics.com/lip/liquid-lipstick/smooth-whip-matte-lip-cream/NYX_1047.html?dwvar_NYX__1047_color=07-Pushin-Cushion', shade: 'Pushin\' Cushion' }
    ],
    blush: [
      { name: 'Cheek to Chic', brand: 'Charlotte Tilbury', price: 40, url: 'https://www.charlottetilbury.com/us/product/cheek-to-chic-ecstasy', shade: 'Ecstasy' },
      { name: 'Powder Blush', brand: 'NARS', price: 30, url: 'https://www.narscosmetics.com/USA/powder-blush/999NAC0000192.html', shade: 'Orgasm' },
      { name: 'Glow Play Cushiony Blush', brand: 'MAC', price: 30, url: 'https://www.maccosmetics.com/product/13842/126125/products/makeup/face/blush-bronzer/glow-play-cushiony-blush?shade=That%27s_Peachy', shade: 'That\'s Peachy' },
      { name: 'Cloud Paint', brand: 'Glossier', price: 20, url: 'https://www.glossier.com/products/cloud-paint?variant=46178049622261', shade: 'Dawn' }
    ],
    foundation: [
      { name: 'Luminous Silk Foundation', brand: 'Giorgio Armani', price: 69, url: 'https://www.giorgioarmanibeauty-usa.com/makeup/face/foundation/luminous-silk-natural-glow-blurring-foundation/ww-01019-arm.html?cgid=foundation' },
      { name: 'Beautiful Skin Foundation', brand: 'Charlotte Tilbury', price: 46, url: 'https://www.charlottetilbury.com/us/product/beautiful-skin-foundation-1-neutral?from_multi_product_card=true' },
      { name: 'Sheer Glow Foundation', brand: 'NARS', price: 47, url: 'https://www.narscosmetics.com/USA/sheer-glow-foundation/999NACSGLWF01.html?dwvar_999NACSGLWF01_color=7845060499&cgid=foundation' },
      { name: 'Eaze Drop Blurring Skin Tint', brand: 'Fenty Beauty', price: 32, url: 'https://fentybeauty.com/products/eaze-drop-lightweight-blurring-skin-tint-6?variant=39355630977069' }
    ]
  }
};

// Helper function to get products for a subtype
export const getProductsForSubtype = (subtypeId: string): ProductRecommendations | undefined => {
  return makeupProducts[subtypeId];
};

