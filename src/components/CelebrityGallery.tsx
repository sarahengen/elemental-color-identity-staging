import React, { useState, useMemo } from 'react';
import { elementalTypes, ElementalType, ElementalSubtype, FamousFace } from '@/data/elementalTypes';
import { 
  Search, 
  Filter, 
  X, 
  Crown, 
  BookOpen, 
  Star, 
  Sparkles,
  ChevronRight,
  Palette,
  Heart,
  Users,
  ArrowLeft
} from 'lucide-react';

interface CelebrityWithContext extends FamousFace {
  elementId: string;
  elementName: string;
  subtypeId: string;
  subtypeName: string;
  seasonalName: string;
  colors: { name: string; hex: string; category: string }[];
}

interface CelebrityGalleryProps {
  userElement: string | null;
  userSubtype: string | null;
  onStartQuiz?: () => void;
}

// Extended Famous Faces data for all subtypes
const extendedFamousFaces: Record<string, FamousFace[]> = {
  'fire-fire': [
    { name: 'Liv Tyler', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Liv_Tyler_2014.jpg/440px-Liv_Tyler_2014.jpg', description: 'Classic True Winter with striking dark hair against porcelain skin, creating dramatic high contrast.', category: 'celebrity' },
    { name: 'Megan Fox', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Megan_Fox_2023.jpg/440px-Megan_Fox_2023.jpg', description: 'Jet black hair and bright blue-green eyes with cool undertones exemplify the Pure Fire intensity.', category: 'celebrity' },
    { name: 'Dua Lipa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dua_Lipa_2021.jpg/440px-Dua_Lipa_2021.jpg', description: 'Jet-black hair and bright blue-green eyes with cool undertones exemplify the Pure Fire intensity.', category: 'celebrity' },
    { name: 'Michelle Yeoh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Michelle_Yeoh_2023.jpg/440px-Michelle_Yeoh_2023.jpg', description: 'Regal, commanding, and absolutely present. Her presence is unmistakable and unforgettable.', category: 'celebrity' },
    { name: 'Dita Von Teese', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Dita_Von_Teese_2018.jpg/440px-Dita_Von_Teese_2018.jpg', description: 'The ultimate True Winter icon with her signature black hair, red lips, and porcelain complexion.', category: 'celebrity' },
    { name: 'Snow White', image: 'https://upload.wikimedia.org/wikipedia/en/1/14/Snow_White_Disney.png', description: 'The fairy tale princess with "skin white as snow, lips red as blood, hair black as ebony" - the archetypal True Winter.', category: 'fictional' },
    { name: 'Courteney Cox', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Courteney_Cox_2014.jpg/440px-Courteney_Cox_2014.jpg', description: 'Dark hair with cool undertones and striking features that pop in high-contrast colors.', category: 'celebrity' },
    { name: 'Anne Hathaway', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Anne_Hathaway_2014.jpg/440px-Anne_Hathaway_2014.jpg', description: 'Porcelain skin with dark hair and eyes, stunning in pure white and true red.', category: 'celebrity' }
  ],
  'fire-earth': [
    { name: 'Penélope Cruz', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Penelope_Cruz_2018.jpg/440px-Penelope_Cruz_2018.jpg', description: 'Deep, rich coloring with warm undertones mixed with cool - stunning in burgundy and forest green.', category: 'celebrity' },
    { name: 'Natalie Portman', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Natalie_Portman_2023.jpg/440px-Natalie_Portman_2023.jpg', description: 'Deep, rich coloring with warm undertones mixed with cool — stunning in burgundy and forest green.', category: 'celebrity' },
    { name: 'Sandra Oh', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Sandra_Oh_2019.jpg/440px-Sandra_Oh_2019.jpg', description: 'Depth and substance - dark hair and eyes, radiating warmth and intensity.', category: 'celebrity' },
    { name: 'Angela Bassett', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Angela_Bassett_2023.jpg/440px-Angela_Bassett_2023.jpg', description: 'Regal, magnetic, and enduring. Her presence commands respect without demanding attention.', category: 'celebrity' },
    { name: 'Salma Hayek', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Salma_Hayek_2017.jpg/440px-Salma_Hayek_2017.jpg', description: 'Dark hair and eyes with medium-deep skin, radiating warmth and intensity.', category: 'celebrity' },

    { name: 'Morticia Addams', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Morticia_Addams.jpg/220px-Morticia_Addams.jpg', description: 'The iconic gothic beauty with dramatic dark coloring and mysterious depth.', category: 'fictional' }
  ],
  'fire-air': [
    { name: 'Katy Perry', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Katy_Perry_2019.jpg/440px-Katy_Perry_2019.jpg', description: 'Bright, clear coloring that comes alive in electric blue and vivid fuchsia.', category: 'celebrity' },
    { name: 'Doja Cat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Doja_Cat_2021.jpg/440px-Doja_Cat_2021.jpg', description: 'Bright eyes, clear coloring and dynamic energy.', category: 'celebrity' },
    { name: 'Zooey Deschanel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Zooey_Deschanel_2012.jpg/440px-Zooey_Deschanel_2012.jpg', description: 'Bright blue eyes and dark hair with clear, vivid coloring perfect for saturated brights.', category: 'celebrity' },
    { name: 'Lucy Liu', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lucy_Liu_2019.jpg/440px-Lucy_Liu_2019.jpg', description: 'Clear, bright features that shine in electric colors and high-contrast combinations.', category: 'celebrity' },
    { name: 'Mulan', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Mulan_%28Disney_character%29.jpg/220px-Mulan_%28Disney_character%29.jpg', description: 'The warrior princess with bright, clear coloring and dynamic energy.', category: 'fictional' }
  ],
  'fire-water': [
    { name: 'Cate Blanchett', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Cate_Blanchett_2016.jpg/440px-Cate_Blanchett_2016.jpg', description: 'Cool, refined elegance with medium contrast - stunning in rose pink and periwinkle.', category: 'celebrity' },
    { name: 'Gemma Chan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Gemma_Chan_2019.jpg/440px-Gemma_Chan_2019.jpg', description: 'Cool, precise, and deeply contained. Her presence is felt, not demanded.', category: 'celebrity' },
    { name: "Lupita Nyong'o", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lupita_Nyongo_2019.jpg/440px-Lupita_Nyongo_2019.jpg', description: 'Cool, contained, luminous presence reflects the blue flame.', category: 'celebrity' },

    { name: 'Elsa (Frozen)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Elsa_from_Frozen_2_poster.png/220px-Elsa_from_Frozen_2_poster.png', description: 'The ice queen with cool, ethereal coloring and refined elegance.', category: 'fictional' }
  ],
  'water-water': [

    { name: 'Saoirse Ronan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Saoirse_Ronan_2018.jpg/440px-Saoirse_Ronan_2018.jpg', description: 'Muted coloring with cool undertones — sophisticated in dusty rose and soft blue.', category: 'celebrity' },
    { name: 'Aishwarya Rai', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Aishwarya_Rai_2018.jpg/440px-Aishwarya_Rai_2018.jpg', description: 'Cool, deep tones. Reflective and considered.', category: 'celebrity' },
    { name: 'Kate Middleton', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Catherine_Duchess_of_Cambridge_2019.jpg/440px-Catherine_Duchess_of_Cambridge_2019.jpg', description: 'Classic True Summer with soft, elegant coloring that glows in powder pink and lavender.', category: 'celebrity' },
    { name: 'Jennifer Aniston', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Jennifer_Aniston_2019.jpg/440px-Jennifer_Aniston_2019.jpg', description: 'Soft, muted coloring with a gentle elegance perfect for dusty rose and soft teal.', category: 'celebrity' },
    { name: 'Aurora (Sleeping Beauty)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Aurora_disney.png/220px-Aurora_disney.png', description: 'The sleeping princess with soft, dreamy coloring and gentle grace.', category: 'fictional' }
  ],
  'water-air': [
    { name: 'Taylor Swift', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Taylor_Swift_2019.jpg/440px-Taylor_Swift_2019.jpg', description: 'Light, delicate coloring with a fresh, youthful appearance - beautiful in sky blue and soft pink.', category: 'celebrity' },
    { name: 'Li Bingbing', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Li_Bingbing_2018.jpg/440px-Li_Bingbing_2018.jpg', description: 'Ethereal, gentle, Her presence lowers the volume of a room into a gentler space.', category: 'celebrity' },
    { name: 'Elle Fanning', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elle_Fanning_2019.jpg/440px-Elle_Fanning_2019.jpg', description: 'Ethereal, light coloring with delicate features perfect for powder blue and pale rose.', category: 'celebrity' },
    { name: 'Cinderella', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Cinderella_%28Disney_character%29.png/220px-Cinderella_%28Disney_character%29.png', description: 'The fairy tale princess with light, dreamy coloring and gentle elegance.', category: 'fictional' }
  ],
  'water-earth': [
    { name: 'Sarah Jessica Parker', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sarah_Jessica_Parker_2019.jpg/440px-Sarah_Jessica_Parker_2019.jpg', description: 'Muted, sophisticated coloring that blends warm and cool - stunning in sage and dusty pink.', category: 'celebrity' },
    { name: 'Gabrielle Union', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gabrielle_Union_2019.jpg/440px-Gabrielle_Union_2019.jpg', description: 'Understated, sophisticated coloring that glows in soft muted tones.', category: 'celebrity' },
    { name: 'Rachel McAdams', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Rachel_McAdams_2018.jpg/440px-Rachel_McAdams_2018.jpg', description: 'Calm, cool earthy tones. Sensitive but steady.', category: 'celebrity' },

    { name: 'Rapunzel', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Rapunzel_Tangled.png/220px-Rapunzel_Tangled.png', description: 'The tower princess with soft, muted coloring and natural beauty.', category: 'fictional' }
  ],
  'water-fire': [
    { name: 'Selena Gomez', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Selena_Gomez_2019.jpg/440px-Selena_Gomez_2019.jpg', description: 'The archetype of cool composure with a warm inner glow — serene, intense, unforgettable.', category: 'celebrity' },
    { name: 'Naomi Watts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Naomi_Watts_2019.jpg/440px-Naomi_Watts_2019.jpg', description: 'Cool, clear coloring with refined elegance — beautiful in rose pink and cool blue.', category: 'celebrity' },
    { name: 'Diane Kruger', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Diane_Kruger_2018.jpg/440px-Diane_Kruger_2018.jpg', description: 'Cool Summer with clear undertones and sophisticated elegance.', category: 'celebrity' },
    { name: 'Ariel (The Little Mermaid)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Ariel_disney.png/220px-Ariel_disney.png', description: 'The mermaid princess with cool, vibrant coloring and passionate spirit.', category: 'fictional' }
  ],
  'earth-earth': [
    { name: 'Julia Roberts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Julia_Roberts_2019.jpg/440px-Julia_Roberts_2019.jpg', description: 'Warm, rich coloring with golden undertones - stunning in terracotta and olive.', category: 'celebrity' },
    { name: 'Taraji P. Henson', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Taraji_P._Henson_2019.jpg/440px-Taraji_P._Henson_2019.jpg', description: 'Warm, rich glow. A nourishing presence.', category: 'celebrity' },
    { name: 'Jessica Alba', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Jessica_Alba_2019.jpg/440px-Jessica_Alba_2019.jpg', description: 'True Autumn with warm, earthy coloring that glows in pumpkin and mustard.', category: 'celebrity' },
    { name: 'Lindsay Lohan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Lindsay_Lohan_2019.jpg/440px-Lindsay_Lohan_2019.jpg', description: 'Classic auburn hair with warm undertones perfect for copper and rust.', category: 'celebrity' },
    { name: 'Merida (Brave)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Brave_Merida.png/220px-Brave_Merida.png', description: 'The fiery Scottish princess with warm, rich coloring and wild spirit.', category: 'fictional' }
  ],
  'earth-fire': [
    { name: 'Sofia Vergara', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sofia_Vergara_2019.jpg/440px-Sofia_Vergara_2019.jpg', description: 'Deep, rich coloring with intense warmth - stunning in burgundy and forest green.', category: 'celebrity' },
    { name: 'Frances McDormand', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Frances_McDormand_2015.jpg/440px-Frances_McDormand_2015.jpg', description: 'Depth, intensity, solid as a rock — luminous in bronze, marine, burgundy.', category: 'celebrity' },
    { name: 'Viola Davis', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Viola_Davis_2023.jpg/440px-Viola_Davis_2023.jpg', description: 'Grounded, warm depth with quiet intensity — commanding in warm neutral tones.', category: 'celebrity' },
    { name: 'Priyanka Chopra', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Priyanka_Chopra_2019.jpg/440px-Priyanka_Chopra_2019.jpg', description: 'Deep Autumn with dark, intense coloring that glows in mahogany and bronze.', category: 'celebrity' },
    { name: 'Pocahontas', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Pocahontas_%28Disney_character%29.png/220px-Pocahontas_%28Disney_character%29.png', description: 'The nature princess with deep, rich coloring and powerful presence.', category: 'fictional' }
  ],
  'earth-water': [
    { name: 'Jennifer Lopez', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Jennifer_Lopez_2019.jpg/440px-Jennifer_Lopez_2019.jpg', description: 'Soft, muted warmth with sophisticated elegance - beautiful in sage and dusty coral.', category: 'celebrity' },
    { name: 'Drew Barrymore', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Drew_Barrymore_2019.jpg/440px-Drew_Barrymore_2019.jpg', description: 'Soft, warm, muted coloring — comforting and lovely in gentle, blended earthy tones.', category: 'celebrity' },
    { name: 'Scarlett Johansson', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Scarlett_Johansson_2019.jpg/440px-Scarlett_Johansson_2019.jpg', description: 'Warm, soft-muted depth that glows in sage, taupe, and dusty terracotta.', category: 'celebrity' },
    { name: 'Jada Pinkett Smith', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Jada_Pinkett_Smith_2018.jpg/440px-Jada_Pinkett_Smith_2018.jpg', description: 'Warm, nurturing, —her presence feels like a safe embrace.', category: 'celebrity' },
    { name: 'Eva Mendes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Eva_Mendes_2019.jpg/440px-Eva_Mendes_2019.jpg', description: 'Soft Autumn with muted, warm coloring perfect for soft terracotta and mushroom.', category: 'celebrity' },
    { name: 'Tiana', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Tiana_disney.png/220px-Tiana_disney.png', description: 'The hardworking princess with soft, warm coloring and gentle determination.', category: 'fictional' }
  ],
  'earth-air': [
    { name: 'Blake Lively', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Blake_Lively_2019.jpg/440px-Blake_Lively_2019.jpg', description: 'Warm, bright, golden coloring — radiant in honeyed gold, warm amber, and camel.', category: 'celebrity' },
    { name: 'Beyoncé', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_2023.jpg/440px-Beyonc%C3%A9_2023.jpg', description: 'Warm, luminous, golden depth that glows in bronze, gold, and rich warm tones.', category: 'celebrity' },
    { name: 'Eva Longoria', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Eva_Longoria_2018.jpg/440px-Eva_Longoria_2018.jpg', description: 'Warm, vibrant, spicy, down-to-earth - abundant, life affirming energy.', category: 'celebrity' },
    { name: 'Emma Stone', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Emma_Stone_2019.jpg/440px-Emma_Stone_2019.jpg', description: 'Warm Autumn with golden highlights and sunny warmth perfect for amber and tangerine.', category: 'celebrity' },
    { name: 'Christina Hendricks', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Christina_Hendricks_2019.jpg/440px-Christina_Hendricks_2019.jpg', description: 'Vibrant red hair with warm undertones that glow in pumpkin and chartreuse.', category: 'celebrity' },
    { name: 'Anna (Frozen)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Princess_Anna_Frozen_2.png/220px-Princess_Anna_Frozen_2.png', description: 'The warm-hearted princess with sunny, golden coloring and optimistic spirit.', category: 'fictional' }
  ],
  'air-air': [
    { name: 'Amy Adams', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Amy_Adams_2019.jpg/440px-Amy_Adams_2019.jpg', description: 'Clear, bright, translucent coloring — radiant in aqua, clear violet, and warm light neutrals.', category: 'celebrity' },
    { name: 'Minka Kelly', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Minka_Kelly_2018.jpg/440px-Minka_Kelly_2018.jpg', description: 'Clear, Lucid, present. Warm, honey glow.', category: 'celebrity' },
    { name: 'Emily Blunt', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Emily_Blunt_2018.jpg/440px-Emily_Blunt_2018.jpg', description: 'Bright colors, fresh, open presence makes every room feel bigger and brighter.', category: 'celebrity' },

    { name: 'Reese Witherspoon', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Reese_Witherspoon_2019.jpg/440px-Reese_Witherspoon_2019.jpg', description: 'True Spring with warm, bright coloring that glows in peach and apple green.', category: 'celebrity' },
    { name: 'Cameron Diaz', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Cameron_Diaz_2019.jpg/440px-Cameron_Diaz_2019.jpg', description: 'Fresh, vibrant coloring with warm clarity perfect for aqua and tangerine.', category: 'celebrity' },
    { name: 'Tinker Bell', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Tinker_Bell.png/220px-Tinker_Bell.png', description: 'The fairy with bright, warm coloring and free-spirited energy.', category: 'fictional' }
  ],

  'air-water': [
    { name: 'Amanda Seyfried', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Amanda_Seyfried_2019.jpg/440px-Amanda_Seyfried_2019.jpg', description: 'Light, delicate coloring with warm undertones - beautiful in peach and soft mint.', category: 'celebrity' },

    { name: 'Giselle (Enchanted)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Giselle_Enchanted.jpg/220px-Giselle_Enchanted.jpg', description: 'The fairy tale princess with light, warm coloring and gentle spirit.', category: 'fictional' }
  ],
  'air-fire': [
    { name: 'Amy Poehler', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Amy_Poehler_2019.jpg/440px-Amy_Poehler_2019.jpg', description: 'Clear, vivid coloring with sparkling contrast — The Effervescent Wit.', category: 'celebrity' },
    { name: 'Awkwafina', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Awkwafina_2019.jpg/440px-Awkwafina_2019.jpg', description: 'Clear, bright. Fast, playful, improvisational energy that lights every conversation.', category: 'celebrity' },
    { name: 'Meagan Good', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Meagan_Good_2019.jpg/440px-Meagan_Good_2019.jpg', description: 'Warm, bright, dazzling. A connector and collaborator.', category: 'celebrity' },
    { name: 'Nicole Kidman', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nicole_Kidman_2019.jpg/440px-Nicole_Kidman_2019.jpg', description: 'Warm, soft-focus, translucent coloring — luminous. The Serene Oracle.', category: 'celebrity' },
    { name: 'Bryce Dallas Howard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Bryce_Dallas_Howard_2019.jpg/440px-Bryce_Dallas_Howard_2019.jpg', description: 'Warm, gentle, delicate, dreamlike presence. The Ethereal Muse.', category: 'celebrity' },
    { name: 'Yara Shahidi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Yara_Shahidi_2019.jpg/440px-Yara_Shahidi_2019.jpg', description: 'Soft, light presence calms every space they drift through. The Soft Signal.', category: 'celebrity' },
    { name: 'Margot Robbie', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Margot_Robbie_2019.jpg/440px-Margot_Robbie_2019.jpg', description: 'Bright, vivid coloring with electric energy - stunning in hot coral and bright turquoise.', category: 'celebrity' },
    { name: 'Charlize Theron', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Charlize_Theron_2019.jpg/440px-Charlize_Theron_2019.jpg', description: 'Bright Spring with clear, vivid coloring that glows in electric yellow and vivid orange.', category: 'celebrity' },
    { name: 'Harley Quinn', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Harley_Quinn.png/220px-Harley_Quinn.png', description: 'The chaotic anti-hero with bright, vivid coloring and dynamic energy.', category: 'fictional' }
  ],

  'air-earth': [
    { name: 'Zendaya', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Zendaya_2019.jpg/440px-Zendaya_2019.jpg', description: 'Warm, golden coloring with an easy radiance — luminous in gold, warm turquoise, and apricot.', category: 'celebrity' },
    { name: 'Zoey Deutch', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Zoey_Deutch_2018.jpg/440px-Zoey_Deutch_2018.jpg', description: 'Warm, persuasive, a gatherer of people.', category: 'celebrity' },
    { name: 'Jennifer Lawrence', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Jennifer_Lawrence_2019.jpg/440px-Jennifer_Lawrence_2019.jpg', description: 'Warm, golden coloring with nurturing warmth - beautiful in golden yellow and warm peach.', category: 'celebrity' },
    { name: 'Kate Hudson', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kate_Hudson_2019.jpg/440px-Kate_Hudson_2019.jpg', description: 'Warm Spring with sunny, golden coloring perfect for amber and salmon.', category: 'celebrity' },
    { name: 'Goldie Hawn', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Goldie_Hawn_2019.jpg/440px-Goldie_Hawn_2019.jpg', description: 'Classic golden blonde with warm undertones that glow in mango and warm teal.', category: 'celebrity' },
    { name: 'Belle (Beauty and the Beast)', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Belle_%28Disney_character%29.png/220px-Belle_%28Disney_character%29.png', description: 'The bookish princess with warm, golden coloring and nurturing spirit.', category: 'fictional' }
  ]

};

const CelebrityGallery: React.FC<CelebrityGalleryProps> = ({ 
  userElement, 
  userSubtype,
  onStartQuiz 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCelebrity, setSelectedCelebrity] = useState<CelebrityWithContext | null>(null);
  const [showTwinFeature, setShowTwinFeature] = useState(false);

  // Gather all celebrities with their context
  const allCelebrities = useMemo(() => {
    const celebrities: CelebrityWithContext[] = [];
    
    elementalTypes.forEach(element => {
      element.subtypes.forEach(subtype => {
        const faces = extendedFamousFaces[subtype.id] || subtype.famousFaces || [];
        faces.forEach(face => {
          celebrities.push({
            ...face,
            elementId: element.id,
            elementName: element.name,
            subtypeId: subtype.id,
            subtypeName: subtype.name,
            seasonalName: subtype.seasonalName,
            colors: subtype.colors
          });
        });
      });
    });
    
    return celebrities;
  }, []);

  // Filter celebrities based on search and filters
  const filteredCelebrities = useMemo(() => {
    return allCelebrities.filter(celeb => {
      const matchesSearch = searchQuery === '' || 
        celeb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celeb.subtypeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celeb.seasonalName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesElement = !selectedElement || celeb.elementId === selectedElement;
      const matchesCategory = !selectedCategory || celeb.category === selectedCategory;
      
      return matchesSearch && matchesElement && matchesCategory;
    });
  }, [allCelebrities, searchQuery, selectedElement, selectedCategory]);

  // Get celebrity twins (same subtype as user)
  const celebrityTwins = useMemo(() => {
    if (!userSubtype) return [];
    return allCelebrities.filter(celeb => celeb.subtypeId === userSubtype);
  }, [allCelebrities, userSubtype]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'celebrity': return <Crown className="w-4 h-4" />;
      case 'historical': return <BookOpen className="w-4 h-4" />;
      case 'fictional': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getElementColor = (elementId: string) => {
    switch (elementId) {
      case 'fire': return 'from-red-500 to-rose-600';
      case 'water': return 'from-blue-400 to-indigo-500';
      case 'earth': return 'from-amber-500 to-orange-600';
      case 'air': return 'from-emerald-400 to-teal-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getElementBgColor = (elementId: string) => {
    switch (elementId) {
      case 'fire': return 'bg-red-50 border-red-200';
      case 'water': return 'bg-blue-50 border-blue-200';
      case 'earth': return 'bg-amber-50 border-amber-200';
      case 'air': return 'bg-emerald-50 border-emerald-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  // Celebrity Detail View
  if (selectedCelebrity) {
    return (
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getElementColor(selectedCelebrity.elementId)} p-6 text-white`}>
          <button
            onClick={() => setSelectedCelebrity(null)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </button>
          <h2 className="text-3xl font-serif">{selectedCelebrity.name}</h2>
          <p className="text-white/80 mt-1">
            {selectedCelebrity.subtypeName} • {selectedCelebrity.seasonalName}
          </p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Celebrity Image & Info */}
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                <img
                  src={selectedCelebrity.image}
                  alt={selectedCelebrity.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCelebrity.name)}&size=400&background=random`;
                  }}
                />
              </div>
              
              <div className={`p-4 rounded-xl border ${getElementBgColor(selectedCelebrity.elementId)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(selectedCelebrity.category)}
                  <span className="text-sm font-medium capitalize">{selectedCelebrity.category}</span>
                </div>
                <p className="text-gray-700">{selectedCelebrity.description}</p>
              </div>
            </div>

            {/* Color Palette & Styling Tips */}
            <div className="space-y-6">
              {/* Color Palette */}
              <div>
                <h3 className="text-xl font-serif text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Color Palette Recommendations
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {selectedCelebrity.colors.slice(0, 12).map((color, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className="w-full aspect-square rounded-lg shadow-sm border border-gray-200 mb-1"
                        style={{ backgroundColor: color.hex }}
                      />
                      <p className="text-xs text-gray-600 truncate">{color.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styling Tips */}
              <div>
                <h3 className="text-xl font-serif text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Styling Tips Inspired by {selectedCelebrity.name}
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-1">Best Colors</h4>
                    <p className="text-sm text-gray-600">
                      {selectedCelebrity.name} looks stunning in {selectedCelebrity.colors.slice(0, 3).map(c => c.name.toLowerCase()).join(', ')}. 
                      These colors complement the {selectedCelebrity.seasonalName} palette beautifully.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-1">Signature Look</h4>
                    <p className="text-sm text-gray-600">
                      As a {selectedCelebrity.subtypeName}, {selectedCelebrity.name} often gravitates toward 
                      {selectedCelebrity.elementId === 'fire' ? ' bold, dramatic pieces with high contrast' :
                       selectedCelebrity.elementId === 'water' ? ' soft, flowing fabrics in muted tones' :
                       selectedCelebrity.elementId === 'earth' ? ' rich, textured pieces in warm earth tones' :
                       ' light, airy styles in fresh, clear colors'}.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-1">Makeup Inspiration</h4>
                    <p className="text-sm text-gray-600">
                      For a look inspired by {selectedCelebrity.name}, try 
                      {selectedCelebrity.elementId === 'fire' ? ' bold red lips, dramatic eyes, and flawless porcelain skin' :
                       selectedCelebrity.elementId === 'water' ? ' soft rose lips, subtle smoky eyes, and dewy skin' :
                       selectedCelebrity.elementId === 'earth' ? ' warm nude lips, bronze eyeshadow, and sun-kissed skin' :
                       ' peachy lips, fresh natural eyes, and glowing skin'}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Same Type */}
              {userSubtype === selectedCelebrity.subtypeId && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-medium">You share the same elemental type!</span>
                  </div>
                  <p className="text-sm text-amber-600">
                    You and {selectedCelebrity.name} are both {selectedCelebrity.subtypeName}s. 
                    Use their style as inspiration for your own wardrobe!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Celebrity Twin Feature
  if (showTwinFeature) {
    return (
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-6 text-white">
          <button
            onClick={() => setShowTwinFeature(false)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </button>
          <h2 className="text-3xl font-serif flex items-center gap-3">
            <Users className="w-8 h-8" />
            Find Your Celebrity Twin
          </h2>
          <p className="text-white/80 mt-1">
            Discover famous faces who share your exact elemental subtype
          </p>
        </div>

        <div className="p-8">
          {!userSubtype ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-serif text-gray-900 mb-3">
                Discover Your Celebrity Twins
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Take our elemental quiz to find out which famous faces share your exact color type!
              </p>
              {onStartQuiz && (
                <button
                  onClick={onStartQuiz}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-colors"
                >
                  Take the Quiz
                </button>
              )}
            </div>
          ) : celebrityTwins.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No celebrity twins found for your subtype yet.</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-6">
                You share the <span className="font-medium text-gray-900">{celebrityTwins[0]?.subtypeName}</span> ({celebrityTwins[0]?.seasonalName}) 
                type with these famous faces:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {celebrityTwins.map((celeb, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCelebrity(celeb);
                      setShowTwinFeature(false);
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-1.5">
                      <img
                        src={celeb.image}
                        alt={celeb.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(celeb.name)}&size=200&background=random`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="flex items-center gap-1 text-white/80 text-[9px] mb-0.5">
                          {getCategoryIcon(celeb.category)}
                          <span className="capitalize">{celeb.category}</span>
                        </div>
                        <h3 className="text-white font-medium text-xs leading-tight truncate">{celeb.name}</h3>
                      </div>
                      <div className="absolute top-1.5 right-1.5">
                        <div className="px-1.5 py-0.5 bg-amber-500 text-white text-[9px] rounded-full flex items-center gap-0.5">
                          <Heart className="w-2.5 h-2.5 fill-current" />
                          Twin
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          )}
        </div>
      </div>
    );
  }

  // Determine if any filter/search is active
  const hasActiveFilter = !!selectedElement || !!selectedCategory || searchQuery.trim().length > 0;

  // Main Gallery View
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-serif text-gray-900 mb-4">Celebrity Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse famous faces across all elemental types. Select an element or category below, 
          or search by name to discover celebrities and their color palettes.
        </p>
      </div>

      {/* Find Your Twin CTA */}
      <div 
        onClick={() => setShowTwinFeature(true)}
        className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-2xl p-6 text-white cursor-pointer hover:from-amber-600 hover:to-rose-600 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif">Find Your Celebrity Twin</h3>
              <p className="text-white/80 text-sm">
                {userSubtype 
                  ? `See ${celebrityTwins.length} celebrities who share your elemental type`
                  : 'Take the quiz to discover your celebrity matches'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search celebrities, types, or seasons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Element Filter */}
          <div className="flex gap-2">
            {['fire', 'water', 'earth', 'air'].map(element => (
              <button
                key={element}
                onClick={() => setSelectedElement(selectedElement === element ? null : element)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  selectedElement === element
                    ? `bg-gradient-to-r ${getElementColor(element)} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {element}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {['celebrity', 'historical', 'fictional'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize flex items-center gap-2 transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilter && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedElement && (
              <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 text-white bg-gradient-to-r ${getElementColor(selectedElement)}`}>
                {selectedElement}
                <button onClick={() => setSelectedElement(null)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedElement(null);
                setSelectedCategory(null);
              }}
              className="ml-auto text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Conditional: Show grid only when a filter/search is active */}
      {hasActiveFilter ? (
        <>
          {/* Results Count */}
          <p className="text-gray-500 text-sm">
            Showing {filteredCelebrities.length} of {allCelebrities.length} celebrities
          </p>

          {/* Celebrity Grid */}
          {filteredCelebrities.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filteredCelebrities.map((celeb, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCelebrity(celeb)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1.5">
                    <img
                      src={celeb.image}
                      alt={celeb.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(celeb.name)}&size=120&background=random&font-size=0.33`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-1.5">
                      <h3 className="text-white font-medium text-[10px] leading-tight truncate">{celeb.name}</h3>
                      <p className="text-white/70 text-[8px] truncate">{celeb.seasonalName}</p>
                    </div>
                    <div className={`absolute top-1 left-1 px-1 py-0.5 rounded text-[8px] font-medium text-white bg-gradient-to-r ${getElementColor(celeb.elementId)}`}>
                      {celeb.elementName}
                    </div>
                    {userSubtype === celeb.subtypeId && (
                      <div className="absolute top-1 right-1">
                        <div className="w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center">
                          <Heart className="w-2 h-2 fill-current" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Color Preview */}
                  <div className="flex gap-0.5">
                    {celeb.colors.slice(0, 5).map((color, colorIdx) => (
                      <div
                        key={colorIdx}
                        className="flex-1 h-1 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No celebrities found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedElement(null);
                  setSelectedCategory(null);
                }}
                className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </>
      ) : (
        /* Prompt to select a filter */
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-serif text-gray-900 mb-2">
            Select an element or category to browse
          </h3>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Choose Fire, Water, Earth, or Air above — or search by name — to explore {allCelebrities.length} famous faces and their color palettes.
          </p>
        </div>
      )}
    </div>
  );
};

export default CelebrityGallery;
