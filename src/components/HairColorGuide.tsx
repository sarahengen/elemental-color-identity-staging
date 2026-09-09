import React, { useState, useEffect } from 'react';
import { elementalTypes, ElementalType, ElementalSubtype } from '@/data/elementalTypes';
import { Sparkles, ChevronDown, ChevronUp, Info, Star, Droplets, Flame, Mountain, Wind, Check, X, Heart, Scissors } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface HairColor {
  name: string;
  hex: string;
  description: string;
  undertone: 'cool' | 'warm' | 'neutral';
  intensity: 'light' | 'medium' | 'dark' | 'vivid';
}

export interface SavedHairColor {
  id: string;
  name: string;
  hex: string;
  description: string;
  undertone: 'cool' | 'warm' | 'neutral';
  intensity: 'light' | 'medium' | 'dark' | 'vivid';
  category: string;
  elementId: string;
  subtypeId: string;
  savedAt: string;
}

interface HairColorCategory {
  name: string;
  description: string;
  colors: HairColor[];
}

interface SubtypeHairGuide {
  subtypeId: string;
  bestColors: HairColorCategory[];
  avoidColors: HairColor[];
  tips: string[];
  celebrityExamples: string[];
}

interface ElementHairGuide {
  elementId: string;
  overview: string;
  generalTips: string[];
  subtypeGuides: SubtypeHairGuide[];
}

// Comprehensive hair color data for each element and subtype
const hairColorData: ElementHairGuide[] = [
  {
    elementId: 'fire',
    overview: 'Fire types (Winter) look best with high-contrast, cool-toned hair colors. Your dramatic coloring can handle bold, striking shades that would overwhelm other types. Avoid warm, golden tones that clash with your cool undertones.',
    generalTips: [
      'Stick to cool undertones - ash, violet, and blue-based colors',
      'High contrast works beautifully - consider dramatic dark or icy light shades',
      'Avoid brassy, golden, or orange tones',
      'Glossy, high-shine finishes enhance your dramatic nature'
    ],
    subtypeGuides: [
      {
        subtypeId: 'fire-fire',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Classic, sophisticated colors that enhance your striking contrast',
            colors: [
              { name: 'Blue-Black', hex: '#0C0C1E', description: 'The most dramatic dark shade with cool blue undertones', undertone: 'cool', intensity: 'dark' },
              { name: 'Espresso', hex: '#1C1008', description: 'Rich, deep brown with cool undertones', undertone: 'cool', intensity: 'dark' },
              { name: 'Dark Chocolate', hex: '#2C1810', description: 'Deep brown without any warmth', undertone: 'cool', intensity: 'dark' },
              { name: 'Platinum Blonde', hex: '#E8E4E1', description: 'Icy, cool blonde for maximum contrast', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Bold, statement-making shades for the adventurous',
            colors: [
              { name: 'Jet Black', hex: '#0A0A0A', description: 'Pure, intense black for ultimate drama', undertone: 'neutral', intensity: 'dark' },
              { name: 'Silver', hex: '#C0C0C0', description: 'Metallic silver for an edgy, modern look', undertone: 'cool', intensity: 'light' },
              { name: 'Burgundy Wine', hex: '#722F37', description: 'Deep, cool-toned red', undertone: 'cool', intensity: 'dark' },
              { name: 'Violet Black', hex: '#1A0A1E', description: 'Black with purple undertones', undertone: 'cool', intensity: 'dark' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Add depth and interest while maintaining cool tones',
            colors: [
              { name: 'Icy Platinum', hex: '#F0EDE8', description: 'Cool, bright highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Soft, cool-toned blonde highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Cool Mocha', hex: '#6B5B4F', description: 'Neutral brown for subtle dimension', undertone: 'neutral', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Golden Blonde', hex: '#E6BE8A', description: 'Too warm and brassy', undertone: 'warm', intensity: 'light' },
          { name: 'Copper', hex: '#B87333', description: 'Clashes with cool undertones', undertone: 'warm', intensity: 'medium' },
          { name: 'Strawberry Blonde', hex: '#D4A574', description: 'Too warm for your coloring', undertone: 'warm', intensity: 'light' },
          { name: 'Caramel', hex: '#A67B5B', description: 'Golden undertones will look off', undertone: 'warm', intensity: 'medium' }
        ],
        tips: [
          'Your high contrast coloring can handle the most dramatic shades',
          'Blue-black or jet black will look stunning on you',
          'If going blonde, choose icy platinum over golden shades',
          'Avoid any warmth in your hair color - it will clash with your cool skin'
        ],
        celebrityExamples: ['Dita Von Teese', 'Megan Fox', 'Courtney Cox', 'Lucy Liu']
      },
      {
        subtypeId: 'fire-earth',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Deep, rich colors that honor your depth while staying cool',
            colors: [
              { name: 'Dark Espresso', hex: '#1E1410', description: 'Rich, deep brown with neutral undertones', undertone: 'neutral', intensity: 'dark' },
              { name: 'Dark Mahogany', hex: '#3C1414', description: 'Deep reddish-brown with cool base', undertone: 'cool', intensity: 'dark' },
              { name: 'Darkest Brown', hex: '#1C1008', description: 'Nearly black brown', undertone: 'neutral', intensity: 'dark' },
              { name: 'Cool Chestnut', hex: '#4A3728', description: 'Medium-dark brown without warmth', undertone: 'cool', intensity: 'dark' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Bold shades that complement your deep coloring',
            colors: [
              { name: 'Deep Burgundy', hex: '#4A0E0E', description: 'Wine-inspired deep red', undertone: 'cool', intensity: 'dark' },
              { name: 'Aubergine', hex: '#3D0734', description: 'Deep purple-brown', undertone: 'cool', intensity: 'dark' },
              { name: 'Black Cherry', hex: '#2A0A14', description: 'Nearly black with red undertones', undertone: 'cool', intensity: 'dark' },
              { name: 'Deep Plum', hex: '#2E1A2E', description: 'Rich purple-black', undertone: 'cool', intensity: 'dark' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Subtle dimension that adds richness',
            colors: [
              { name: 'Cool Chocolate', hex: '#3D2B1F', description: 'Deep brown highlights', undertone: 'cool', intensity: 'dark' },
              { name: 'Muted Burgundy', hex: '#5C3A3A', description: 'Subtle wine-toned highlights', undertone: 'cool', intensity: 'medium' },
              { name: 'Ash Brown', hex: '#6B5B4F', description: 'Cool-toned brown for dimension', undertone: 'cool', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Golden Brown', hex: '#996515', description: 'Too warm for your coloring', undertone: 'warm', intensity: 'medium' },
          { name: 'Honey Blonde', hex: '#DDB06B', description: 'Golden tones will clash', undertone: 'warm', intensity: 'light' },
          { name: 'Copper Red', hex: '#B87333', description: 'Too orange and warm', undertone: 'warm', intensity: 'medium' },
          { name: 'Auburn', hex: '#A52A2A', description: 'Warm red-brown will look off', undertone: 'warm', intensity: 'medium' }
        ],
        tips: [
          'Embrace your depth - very dark colors look amazing on you',
          'You can wear some deep burgundy and plum tones',
          'Keep highlights subtle and in the cool-to-neutral range',
          'Avoid anything with golden or orange undertones'
        ],
        celebrityExamples: ['Penelope Cruz', 'Eva Longoria', 'Salma Hayek', 'Monica Bellucci']
      },
      {
        subtypeId: 'fire-air',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Bright, clear colors that match your vivid coloring',
            colors: [
              { name: 'Cool Black', hex: '#0F0F0F', description: 'Clear, bright black', undertone: 'cool', intensity: 'dark' },
              { name: 'Icy Blonde', hex: '#F5F0E8', description: 'Bright, cool platinum', undertone: 'cool', intensity: 'light' },
              { name: 'Clear Brunette', hex: '#2C2018', description: 'Bright, clear brown', undertone: 'neutral', intensity: 'dark' },
              { name: 'Ash Brown', hex: '#6B5B4F', description: 'Cool-toned medium brown', undertone: 'cool', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Vibrant, electric shades for your bright energy',
            colors: [
              { name: 'Electric Blue', hex: '#0066FF', description: 'Vivid, bright blue', undertone: 'cool', intensity: 'vivid' },
              { name: 'Hot Pink', hex: '#FF1493', description: 'Bright, cool-toned pink', undertone: 'cool', intensity: 'vivid' },
              { name: 'Violet', hex: '#8B00FF', description: 'Bright purple', undertone: 'cool', intensity: 'vivid' },
              { name: 'Fuchsia', hex: '#FF00FF', description: 'Electric magenta', undertone: 'cool', intensity: 'vivid' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Bright, clear highlights for added vibrancy',
            colors: [
              { name: 'Bright Platinum', hex: '#E8E4E1', description: 'Cool, bright blonde highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Cool Silver', hex: '#C8C8C8', description: 'Metallic silver streaks', undertone: 'cool', intensity: 'light' },
              { name: 'Bright Violet', hex: '#9370DB', description: 'Vivid purple highlights', undertone: 'cool', intensity: 'vivid' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Muted Brown', hex: '#8B7355', description: 'Too dull for your bright coloring', undertone: 'neutral', intensity: 'medium' },
          { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Too muted and soft', undertone: 'cool', intensity: 'light' },
          { name: 'Golden Blonde', hex: '#E6BE8A', description: 'Warm tones clash with your coloring', undertone: 'warm', intensity: 'light' },
          { name: 'Warm Auburn', hex: '#A52A2A', description: 'Too warm and muted', undertone: 'warm', intensity: 'medium' }
        ],
        tips: [
          'You need bright, clear colors - avoid anything muted or dusty',
          'Vivid fashion colors look amazing on you',
          'High-shine, glossy finishes enhance your brightness',
          'If going natural, choose clear, bright shades over muted ones'
        ],
        celebrityExamples: ['Katy Perry', 'Zooey Deschanel', 'Anne Hathaway', 'Alexis Bledel']
      },
      {
        subtypeId: 'fire-water',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Cool, refined colors for your elegant coloring',
            colors: [
              { name: 'Soft Black', hex: '#1C1C1C', description: 'Softer black with cool undertones', undertone: 'cool', intensity: 'dark' },
              { name: 'Cool Brown', hex: '#4A3C34', description: 'Medium brown with cool undertones', undertone: 'cool', intensity: 'medium' },
              { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Soft, cool blonde', undertone: 'cool', intensity: 'light' },
              { name: 'Mushroom Brown', hex: '#8B7D7B', description: 'Cool taupe-brown', undertone: 'cool', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Soft, cool fashion shades',
            colors: [
              { name: 'Dusty Rose', hex: '#C4647C', description: 'Soft pink with cool undertones', undertone: 'cool', intensity: 'medium' },
              { name: 'Lavender', hex: '#B57EDC', description: 'Soft purple', undertone: 'cool', intensity: 'light' },
              { name: 'Mauve', hex: '#915F6D', description: 'Dusty pink-purple', undertone: 'cool', intensity: 'medium' },
              { name: 'Soft Plum', hex: '#8E4585', description: 'Muted purple', undertone: 'cool', intensity: 'medium' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Soft, cool highlights for gentle dimension',
            colors: [
              { name: 'Cool Ash', hex: '#A8A0A0', description: 'Soft ash highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Silver', hex: '#D0D0D0', description: 'Gentle silver tones', undertone: 'cool', intensity: 'light' },
              { name: 'Rose Brown', hex: '#8B6B6B', description: 'Cool brown with pink undertones', undertone: 'cool', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Jet Black', hex: '#000000', description: 'Too harsh for your softer contrast', undertone: 'neutral', intensity: 'dark' },
          { name: 'Bright Platinum', hex: '#FFFFFF', description: 'Too stark and bright', undertone: 'cool', intensity: 'light' },
          { name: 'Golden Highlights', hex: '#D4AF37', description: 'Warm tones clash', undertone: 'warm', intensity: 'light' },
          { name: 'Copper', hex: '#B87333', description: 'Too warm for your coloring', undertone: 'warm', intensity: 'medium' }
        ],
        tips: [
          'Choose softer versions of cool colors rather than stark contrasts',
          'Ash and mushroom tones are particularly flattering',
          'Avoid very bright or very dark extremes',
          'Soft, cool-toned highlights add beautiful dimension'
        ],
        celebrityExamples: ['Jennifer Aniston (cool phases)', 'Kate Middleton', 'Leighton Meester', 'Emmy Rossum']
      }
    ]
  },
  {
    elementId: 'water',
    overview: 'Water types (Summer) look best with soft, muted, cool-toned hair colors. Your delicate coloring is enhanced by gentle shades that don\'t overpower. Avoid harsh contrasts and warm, brassy tones.',
    generalTips: [
      'Choose soft, muted shades over bright or saturated colors',
      'Cool undertones are essential - ash, rose, and violet bases work best',
      'Avoid high contrast - your coloring is naturally soft',
      'Gentle highlights and lowlights add dimension without harshness'
    ],
    subtypeGuides: [
      {
        subtypeId: 'water-water',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Soft, muted colors that enhance your gentle coloring',
            colors: [
              { name: 'Ash Brown', hex: '#6B5B4F', description: 'Soft brown with cool ash undertones', undertone: 'cool', intensity: 'medium' },
              { name: 'Dusty Blonde', hex: '#B8A898', description: 'Muted, cool-toned blonde', undertone: 'cool', intensity: 'light' },
              { name: 'Mushroom Brown', hex: '#8B7D7B', description: 'Cool taupe-brown', undertone: 'cool', intensity: 'medium' },
              { name: 'Soft Cocoa', hex: '#5C4A42', description: 'Gentle brown with cool undertones', undertone: 'cool', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Soft, dusty fashion shades',
            colors: [
              { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Soft, muted pink', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Lavender', hex: '#C8B8D8', description: 'Gentle purple', undertone: 'cool', intensity: 'light' },
              { name: 'Mauve', hex: '#C4A4B4', description: 'Dusty pink-purple', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Periwinkle', hex: '#B8B8D8', description: 'Muted blue-violet', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Gentle highlights for soft dimension',
            colors: [
              { name: 'Cool Ash Blonde', hex: '#C8C0B8', description: 'Soft ash highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Rose Beige', hex: '#C4AEAD', description: 'Soft pink-beige highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Taupe', hex: '#A89890', description: 'Muted brown-gray', undertone: 'cool', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Jet Black', hex: '#000000', description: 'Too harsh and dramatic', undertone: 'neutral', intensity: 'dark' },
          { name: 'Bright Blonde', hex: '#FFFF00', description: 'Too bright and warm', undertone: 'warm', intensity: 'light' },
          { name: 'Copper', hex: '#B87333', description: 'Too warm and intense', undertone: 'warm', intensity: 'medium' },
          { name: 'Vivid Red', hex: '#FF0000', description: 'Too bright for your soft coloring', undertone: 'warm', intensity: 'vivid' }
        ],
        tips: [
          'Embrace soft, muted shades - they enhance your natural elegance',
          'Ash and mushroom tones are your best friends',
          'Avoid stark contrasts between roots and ends',
          'Soft balayage looks more natural than harsh highlights'
        ],
        celebrityExamples: ['Kate Winslet', 'Cate Blanchett', 'Naomi Watts', 'Nicole Kidman (natural)']
      },
      {
        subtypeId: 'water-air',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Light, delicate colors for your fresh appearance',
            colors: [
              { name: 'Light Ash Blonde', hex: '#D4C8B8', description: 'Soft, light blonde with cool undertones', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Champagne', hex: '#E8DCD0', description: 'Light, cool-toned blonde', undertone: 'cool', intensity: 'light' },
              { name: 'Light Brown', hex: '#9B8878', description: 'Soft, light brown', undertone: 'cool', intensity: 'medium' },
              { name: 'Pale Mushroom', hex: '#A8A098', description: 'Very light taupe', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Soft, pastel fashion shades',
            colors: [
              { name: 'Pale Pink', hex: '#F4C2C2', description: 'Very soft pink', undertone: 'cool', intensity: 'light' },
              { name: 'Baby Lavender', hex: '#E6E6FA', description: 'Pale purple', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Peach', hex: '#FFDAB9', description: 'Gentle peachy-pink', undertone: 'neutral', intensity: 'light' },
              { name: 'Pale Blue', hex: '#B0E0E6', description: 'Very soft blue', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Delicate highlights for subtle dimension',
            colors: [
              { name: 'Pale Blonde', hex: '#E8E0D8', description: 'Very light, cool highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Soft Silver', hex: '#D8D8D8', description: 'Gentle silver tones', undertone: 'cool', intensity: 'light' },
              { name: 'Light Rose', hex: '#E8D0D0', description: 'Soft pink highlights', undertone: 'cool', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Dark Brown', hex: '#3D2314', description: 'Too dark and heavy', undertone: 'neutral', intensity: 'dark' },
          { name: 'Black', hex: '#000000', description: 'Far too harsh', undertone: 'neutral', intensity: 'dark' },
          { name: 'Golden Blonde', hex: '#E6BE8A', description: 'Too warm and brassy', undertone: 'warm', intensity: 'light' },
          { name: 'Bright Red', hex: '#FF0000', description: 'Too intense', undertone: 'warm', intensity: 'vivid' }
        ],
        tips: [
          'Keep it light and delicate - dark colors will overwhelm you',
          'Soft, pastel fashion colors look ethereal on you',
          'Avoid anything too warm or too dark',
          'Your natural light coloring is beautiful - enhance, don\'t fight it'
        ],
        celebrityExamples: ['Elle Fanning', 'Amanda Seyfried', 'Dakota Fanning', 'Kirsten Dunst']
      },
      {
        subtypeId: 'water-earth',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Muted, sophisticated colors for your understated elegance',
            colors: [
              { name: 'Soft Brown', hex: '#7B6B5B', description: 'Muted, dusty brown', undertone: 'neutral', intensity: 'medium' },
              { name: 'Greige', hex: '#9B9080', description: 'Gray-beige blend', undertone: 'neutral', intensity: 'medium' },
              { name: 'Dusty Blonde', hex: '#B8A890', description: 'Muted, soft blonde', undertone: 'neutral', intensity: 'light' },
              { name: 'Soft Taupe', hex: '#8B8078', description: 'Muted brown-gray', undertone: 'neutral', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Muted, dusty fashion shades',
            colors: [
              { name: 'Dusty Sage', hex: '#9CAF88', description: 'Muted green', undertone: 'neutral', intensity: 'medium' },
              { name: 'Soft Mauve', hex: '#C4A4B4', description: 'Dusty pink-purple', undertone: 'cool', intensity: 'light' },
              { name: 'Muted Teal', hex: '#6B8B8B', description: 'Soft blue-green', undertone: 'cool', intensity: 'medium' },
              { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Soft, muted pink', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Subtle dimension with muted tones',
            colors: [
              { name: 'Soft Ash', hex: '#A8A098', description: 'Muted ash highlights', undertone: 'neutral', intensity: 'light' },
              { name: 'Dusty Beige', hex: '#B8B0A8', description: 'Soft beige highlights', undertone: 'neutral', intensity: 'light' },
              { name: 'Mushroom', hex: '#A4978E', description: 'Muted brown-gray', undertone: 'neutral', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Bright Blonde', hex: '#FFFF00', description: 'Too bright and clear', undertone: 'warm', intensity: 'light' },
          { name: 'Vivid Red', hex: '#FF0000', description: 'Too saturated', undertone: 'warm', intensity: 'vivid' },
          { name: 'Jet Black', hex: '#000000', description: 'Too stark', undertone: 'neutral', intensity: 'dark' },
          { name: 'Bright Copper', hex: '#FF7F00', description: 'Too warm and bright', undertone: 'warm', intensity: 'vivid' }
        ],
        tips: [
          'Muted, dusty tones are your signature',
          'Avoid anything too bright, clear, or saturated',
          'Greige and mushroom tones are incredibly flattering',
          'Soft, blended color techniques work better than stark highlights'
        ],
        celebrityExamples: ['Sarah Jessica Parker', 'Drew Barrymore (muted phases)', 'Jennifer Grey', 'Diane Lane']
      },
      {
        subtypeId: 'water-fire',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Cool, refined colors with more clarity',
            colors: [
              { name: 'Cool Brown', hex: '#5B4B3B', description: 'Clear, cool-toned brown', undertone: 'cool', intensity: 'medium' },
              { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Cool, clear blonde', undertone: 'cool', intensity: 'light' },
              { name: 'Cool Espresso', hex: '#3B2B1B', description: 'Darker brown with cool undertones', undertone: 'cool', intensity: 'dark' },
              { name: 'Slate Brown', hex: '#6B5B5B', description: 'Cool brown with gray undertones', undertone: 'cool', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Cool fashion shades with more saturation',
            colors: [
              { name: 'Rose Pink', hex: '#E8A4B8', description: 'Cool pink with clarity', undertone: 'cool', intensity: 'medium' },
              { name: 'Orchid', hex: '#DA70D6', description: 'Clear purple-pink', undertone: 'cool', intensity: 'medium' },
              { name: 'Cool Raspberry', hex: '#C4647C', description: 'Clear berry tone', undertone: 'cool', intensity: 'medium' },
              { name: 'Wisteria', hex: '#C9A0DC', description: 'Soft purple', undertone: 'cool', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Cool highlights with more definition',
            colors: [
              { name: 'Cool Platinum', hex: '#E0D8D0', description: 'Clear, cool highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Rose Highlights', hex: '#D8C0C0', description: 'Cool pink-toned highlights', undertone: 'cool', intensity: 'light' },
              { name: 'Cool Ash', hex: '#A8A0A0', description: 'Clear ash highlights', undertone: 'cool', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Golden Blonde', hex: '#E6BE8A', description: 'Too warm', undertone: 'warm', intensity: 'light' },
          { name: 'Copper', hex: '#B87333', description: 'Warm tones clash', undertone: 'warm', intensity: 'medium' },
          { name: 'Muted Brown', hex: '#8B7355', description: 'Too muted for your clarity', undertone: 'neutral', intensity: 'medium' },
          { name: 'Warm Auburn', hex: '#A52A2A', description: 'Too warm', undertone: 'warm', intensity: 'medium' }
        ],
        tips: [
          'You can handle slightly more saturated colors than other Water types',
          'Keep everything cool-toned but with more clarity',
          'Rose and orchid tones are particularly flattering',
          'Avoid both warm tones and overly muted shades'
        ],
        celebrityExamples: ['Reese Witherspoon (cool phases)', 'January Jones', 'Gwyneth Paltrow', 'Sienna Miller']
      }
    ]
  },
  {
    elementId: 'earth',
    overview: 'Earth types (Autumn) look best with warm, rich, earthy hair colors. Your warm undertones are enhanced by golden, copper, and auburn shades. Avoid cool, ashy tones that clash with your natural warmth.',
    generalTips: [
      'Embrace warm undertones - golden, copper, and red-based colors',
      'Rich, earthy shades complement your natural coloring',
      'Avoid cool, ashy, or blue-based colors',
      'Matte and natural finishes often look more authentic than high-shine'
    ],
    subtypeGuides: [
      {
        subtypeId: 'earth-earth',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Warm, rich colors that enhance your earthy beauty',
            colors: [
              { name: 'Warm Chestnut', hex: '#8B4513', description: 'Rich, warm brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Golden Brown', hex: '#996515', description: 'Brown with golden undertones', undertone: 'warm', intensity: 'medium' },
              { name: 'Auburn', hex: '#A52A2A', description: 'Warm reddish-brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Copper Brown', hex: '#8B5A2B', description: 'Brown with copper undertones', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Warm, earthy fashion shades',
            colors: [
              { name: 'Copper', hex: '#B87333', description: 'Rich, warm copper', undertone: 'warm', intensity: 'medium' },
              { name: 'Pumpkin Spice', hex: '#C45E28', description: 'Warm orange-brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Rust', hex: '#B7410E', description: 'Deep orange-red', undertone: 'warm', intensity: 'medium' },
              { name: 'Warm Burgundy', hex: '#722F37', description: 'Deep red with warm undertones', undertone: 'warm', intensity: 'dark' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Warm highlights for sun-kissed dimension',
            colors: [
              { name: 'Golden Highlights', hex: '#D4AF37', description: 'Warm, golden streaks', undertone: 'warm', intensity: 'light' },
              { name: 'Caramel', hex: '#A67B5B', description: 'Warm brown highlights', undertone: 'warm', intensity: 'medium' },
              { name: 'Honey', hex: '#DDB06B', description: 'Golden-brown highlights', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool and ashy', undertone: 'cool', intensity: 'light' },
          { name: 'Blue-Black', hex: '#0C0C1E', description: 'Cool undertones clash', undertone: 'cool', intensity: 'dark' },
          { name: 'Platinum', hex: '#E8E4E1', description: 'Too cool and icy', undertone: 'cool', intensity: 'light' },
          { name: 'Cool Brown', hex: '#4A3C34', description: 'Lacks warmth', undertone: 'cool', intensity: 'medium' }
        ],
        tips: [
          'Warm, golden tones make your skin glow',
          'Copper and auburn shades are incredibly flattering',
          'Avoid anything with ash or cool undertones',
          'Sun-kissed highlights look natural on you'
        ],
        celebrityExamples: ['Julia Roberts', 'Amy Adams', 'Julianne Moore', 'Jessica Chastain']
      },
      {
        subtypeId: 'earth-fire',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Deep, rich warm colors for your intense coloring',
            colors: [
              { name: 'Dark Chocolate', hex: '#3D2314', description: 'Deep brown with warm undertones', undertone: 'warm', intensity: 'dark' },
              { name: 'Espresso', hex: '#3C1414', description: 'Rich, dark brown', undertone: 'warm', intensity: 'dark' },
              { name: 'Dark Auburn', hex: '#5C2018', description: 'Deep reddish-brown', undertone: 'warm', intensity: 'dark' },
              { name: 'Mahogany', hex: '#4E0707', description: 'Deep red-brown', undertone: 'warm', intensity: 'dark' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Deep, rich fashion shades',
            colors: [
              { name: 'Deep Burgundy', hex: '#4A0E0E', description: 'Rich wine red', undertone: 'warm', intensity: 'dark' },
              { name: 'Dark Copper', hex: '#8B4513', description: 'Deep copper', undertone: 'warm', intensity: 'dark' },
              { name: 'Oxblood', hex: '#4A0000', description: 'Very deep red', undertone: 'warm', intensity: 'dark' },
              { name: 'Dark Bronze', hex: '#5C4033', description: 'Deep bronze-brown', undertone: 'warm', intensity: 'dark' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Rich highlights for depth',
            colors: [
              { name: 'Bronze', hex: '#CD7F32', description: 'Warm bronze highlights', undertone: 'warm', intensity: 'medium' },
              { name: 'Dark Caramel', hex: '#8B6914', description: 'Deep golden highlights', undertone: 'warm', intensity: 'medium' },
              { name: 'Copper Lowlights', hex: '#A0522D', description: 'Rich copper dimension', undertone: 'warm', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool', undertone: 'cool', intensity: 'light' },
          { name: 'Platinum', hex: '#E8E4E1', description: 'Too light and cool', undertone: 'cool', intensity: 'light' },
          { name: 'Blue-Black', hex: '#0C0C1E', description: 'Cool undertones clash', undertone: 'cool', intensity: 'dark' },
          { name: 'Pastel Colors', hex: '#FFB6C1', description: 'Too light and cool', undertone: 'cool', intensity: 'light' }
        ],
        tips: [
          'Deep, rich colors complement your intense coloring',
          'Dark auburn and mahogany are stunning on you',
          'You can handle very dark shades as long as they have warmth',
          'Avoid anything light or cool-toned'
        ],
        celebrityExamples: ['Eva Green (warm phases)', 'Mila Kunis', 'Penelope Cruz (warm phases)', 'Sandra Bullock']
      },
      {
        subtypeId: 'earth-water',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Soft, muted warm colors for your understated elegance',
            colors: [
              { name: 'Soft Brown', hex: '#8B7355', description: 'Muted, warm brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Dusty Caramel', hex: '#A08060', description: 'Soft, muted caramel', undertone: 'warm', intensity: 'medium' },
              { name: 'Soft Auburn', hex: '#8B5A4A', description: 'Muted reddish-brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Mushroom Brown', hex: '#9B8B7B', description: 'Soft brown with neutral undertones', undertone: 'neutral', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Soft, muted fashion shades',
            colors: [
              { name: 'Dusty Rose', hex: '#C4948C', description: 'Soft, warm pink', undertone: 'warm', intensity: 'light' },
              { name: 'Soft Terracotta', hex: '#C4847C', description: 'Muted orange-pink', undertone: 'warm', intensity: 'medium' },
              { name: 'Dusty Coral', hex: '#C4948C', description: 'Soft coral', undertone: 'warm', intensity: 'light' },
              { name: 'Muted Copper', hex: '#A07050', description: 'Soft copper', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Soft highlights for gentle dimension',
            colors: [
              { name: 'Soft Gold', hex: '#C4B47C', description: 'Muted golden highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Dusty Honey', hex: '#B8A078', description: 'Soft honey highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Soft Caramel', hex: '#A89070', description: 'Muted caramel', undertone: 'warm', intensity: 'medium' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Bright Copper', hex: '#FF7F00', description: 'Too bright and saturated', undertone: 'warm', intensity: 'vivid' },
          { name: 'Jet Black', hex: '#000000', description: 'Too stark', undertone: 'neutral', intensity: 'dark' },
          { name: 'Bright Blonde', hex: '#FFFF00', description: 'Too bright', undertone: 'warm', intensity: 'light' },
          { name: 'Cool Ash', hex: '#A8A098', description: 'Too cool', undertone: 'cool', intensity: 'light' }
        ],
        tips: [
          'Soft, muted warm tones are your signature',
          'Avoid anything too bright, saturated, or cool',
          'Dusty and mushroom tones with warmth are flattering',
          'Gentle, blended color techniques work best'
        ],
        celebrityExamples: ['Jennifer Lopez', 'Drew Barrymore', 'Sarah Jessica Parker (warm phases)', 'Gisele Bundchen']
      },
      {
        subtypeId: 'earth-air',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Bright, warm colors for your sunny appearance',
            colors: [
              { name: 'Golden Blonde', hex: '#E6BE8A', description: 'Warm, golden blonde', undertone: 'warm', intensity: 'light' },
              { name: 'Honey Blonde', hex: '#DDB06B', description: 'Rich honey color', undertone: 'warm', intensity: 'light' },
              { name: 'Strawberry Blonde', hex: '#D4A574', description: 'Warm peachy-blonde', undertone: 'warm', intensity: 'light' },
              { name: 'Light Auburn', hex: '#B87333', description: 'Light reddish-brown', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Bright, warm fashion shades',
            colors: [
              { name: 'Bright Copper', hex: '#FF7F00', description: 'Vivid copper', undertone: 'warm', intensity: 'vivid' },
              { name: 'Tangerine', hex: '#FF9966', description: 'Bright orange', undertone: 'warm', intensity: 'vivid' },
              { name: 'Coral', hex: '#FF7F50', description: 'Warm coral', undertone: 'warm', intensity: 'vivid' },
              { name: 'Amber', hex: '#FFBF00', description: 'Bright golden', undertone: 'warm', intensity: 'vivid' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Bright, sunny highlights',
            colors: [
              { name: 'Bright Gold', hex: '#FFD700', description: 'Vivid golden highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Bright Honey', hex: '#E8B830', description: 'Warm honey highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Light Copper', hex: '#D4A06A', description: 'Bright copper highlights', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool and muted', undertone: 'cool', intensity: 'light' },
          { name: 'Dark Brown', hex: '#3D2314', description: 'Too dark for your light coloring', undertone: 'neutral', intensity: 'dark' },
          { name: 'Cool Platinum', hex: '#E8E4E1', description: 'Too cool', undertone: 'cool', intensity: 'light' },
          { name: 'Muted Brown', hex: '#8B7355', description: 'Too muted', undertone: 'neutral', intensity: 'medium' }
        ],
        tips: [
          'Bright, warm colors make you glow',
          'Golden and honey tones are incredibly flattering',
          'You can handle vivid warm colors that would overwhelm others',
          'Avoid anything cool, ashy, or too muted'
        ],
        celebrityExamples: ['Blake Lively', 'Gigi Hadid', 'Margot Robbie', 'Cameron Diaz']
      }
    ]
  },
  {
    elementId: 'air',
    overview: 'Air types (Spring) look best with warm, clear, bright hair colors. Your fresh, vibrant coloring is enhanced by golden, peachy, and warm tones with clarity. Avoid muted, dusty, or cool colors.',
    generalTips: [
      'Choose warm, clear colors with brightness',
      'Golden and peachy undertones enhance your fresh appearance',
      'Avoid muted, dusty, or cool-toned colors',
      'High-shine, glossy finishes complement your vibrant energy'
    ],
    subtypeGuides: [
      {
        subtypeId: 'air-air',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Warm, clear colors for your fresh, vibrant appearance',
            colors: [
              { name: 'Golden Brown', hex: '#996515', description: 'Clear, warm brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Warm Blonde', hex: '#D4A574', description: 'Clear, golden blonde', undertone: 'warm', intensity: 'light' },
              { name: 'Light Auburn', hex: '#B87333', description: 'Clear, warm reddish-brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Honey Brown', hex: '#A67B5B', description: 'Warm honey-brown', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Bright, warm fashion shades',
            colors: [
              { name: 'Coral', hex: '#FF7F50', description: 'Bright, warm coral', undertone: 'warm', intensity: 'vivid' },
              { name: 'Peach', hex: '#FFCBA4', description: 'Warm peachy-pink', undertone: 'warm', intensity: 'light' },
              { name: 'Warm Pink', hex: '#FF6B6B', description: 'Clear, warm pink', undertone: 'warm', intensity: 'vivid' },
              { name: 'Apricot', hex: '#FBCEB1', description: 'Soft, warm apricot', undertone: 'warm', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Warm, clear highlights for sun-kissed dimension',
            colors: [
              { name: 'Golden Highlights', hex: '#D4AF37', description: 'Clear, warm gold', undertone: 'warm', intensity: 'light' },
              { name: 'Honey Highlights', hex: '#DDB06B', description: 'Warm honey streaks', undertone: 'warm', intensity: 'light' },
              { name: 'Peachy Highlights', hex: '#FFDAB9', description: 'Soft, warm peach', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool and muted', undertone: 'cool', intensity: 'light' },
          { name: 'Dusty Brown', hex: '#8B7355', description: 'Too muted', undertone: 'neutral', intensity: 'medium' },
          { name: 'Blue-Black', hex: '#0C0C1E', description: 'Too cool and dark', undertone: 'cool', intensity: 'dark' },
          { name: 'Cool Platinum', hex: '#E8E4E1', description: 'Too cool', undertone: 'cool', intensity: 'light' }
        ],
        tips: [
          'Clear, warm colors make your skin glow',
          'Golden and honey tones are your best friends',
          'Avoid anything muted, dusty, or cool',
          'High-shine finishes enhance your fresh appearance'
        ],
        celebrityExamples: ['Taylor Swift', 'Scarlett Johansson', 'Emma Stone', 'Amy Adams']
      },
      {
        subtypeId: 'air-water',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Light, warm colors for your delicate appearance',
            colors: [
              { name: 'Light Golden Blonde', hex: '#E8D4B8', description: 'Soft, warm blonde', undertone: 'warm', intensity: 'light' },
              { name: 'Soft Honey', hex: '#D4B896', description: 'Light honey color', undertone: 'warm', intensity: 'light' },
              { name: 'Light Brown', hex: '#A08060', description: 'Soft, warm brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Champagne', hex: '#F7E7CE', description: 'Very light, warm blonde', undertone: 'warm', intensity: 'light' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Soft, warm fashion shades',
            colors: [
              { name: 'Soft Peach', hex: '#FFDAB9', description: 'Gentle peachy-pink', undertone: 'warm', intensity: 'light' },
              { name: 'Blush', hex: '#FFB6C1', description: 'Soft, warm pink', undertone: 'warm', intensity: 'light' },
              { name: 'Apricot', hex: '#FBCEB1', description: 'Soft apricot', undertone: 'warm', intensity: 'light' },
              { name: 'Soft Coral', hex: '#F08080', description: 'Light coral', undertone: 'warm', intensity: 'light' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Delicate, warm highlights',
            colors: [
              { name: 'Soft Gold', hex: '#E8D8B8', description: 'Gentle golden highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Light Honey', hex: '#E8D0A8', description: 'Soft honey highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Cream', hex: '#FFFDD0', description: 'Very light, warm highlights', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Dark Brown', hex: '#3D2314', description: 'Too dark and heavy', undertone: 'neutral', intensity: 'dark' },
          { name: 'Black', hex: '#000000', description: 'Far too dark', undertone: 'neutral', intensity: 'dark' },
          { name: 'Cool Ash', hex: '#A8A098', description: 'Too cool', undertone: 'cool', intensity: 'light' },
          { name: 'Bright Red', hex: '#FF0000', description: 'Too intense', undertone: 'warm', intensity: 'vivid' }
        ],
        tips: [
          'Keep it light and warm - dark colors will overwhelm you',
          'Soft, warm pastels look beautiful on you',
          'Avoid anything too dark, cool, or intense',
          'Your natural light coloring is beautiful - enhance it gently'
        ],
        celebrityExamples: ['Amanda Seyfried (warm phases)', 'Reese Witherspoon', 'Kate Hudson', 'Goldie Hawn']
      },
      {
        subtypeId: 'air-fire',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Bright, clear warm colors for your vivid appearance',
            colors: [
              { name: 'Bright Golden Brown', hex: '#B8860B', description: 'Clear, vivid brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Bright Blonde', hex: '#FFD700', description: 'Vivid golden blonde', undertone: 'warm', intensity: 'light' },
              { name: 'Bright Auburn', hex: '#CD5C5C', description: 'Clear, vivid reddish-brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Bright Copper', hex: '#FF7F00', description: 'Vivid copper', undertone: 'warm', intensity: 'vivid' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Vivid, bright fashion shades',
            colors: [
              { name: 'Hot Coral', hex: '#FF6B6B', description: 'Bright, vivid coral', undertone: 'warm', intensity: 'vivid' },
              { name: 'Electric Orange', hex: '#FF6600', description: 'Vivid orange', undertone: 'warm', intensity: 'vivid' },
              { name: 'Hot Pink', hex: '#FF69B4', description: 'Bright, warm pink', undertone: 'warm', intensity: 'vivid' },
              { name: 'Bright Yellow', hex: '#FFFF00', description: 'Vivid yellow', undertone: 'warm', intensity: 'vivid' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Bright, vivid highlights',
            colors: [
              { name: 'Bright Gold', hex: '#FFD700', description: 'Vivid golden highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Bright Copper', hex: '#FF8C00', description: 'Vivid copper highlights', undertone: 'warm', intensity: 'vivid' },
              { name: 'Electric Blonde', hex: '#FFFF99', description: 'Very bright blonde', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Muted Brown', hex: '#8B7355', description: 'Too muted and dull', undertone: 'neutral', intensity: 'medium' },
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool and muted', undertone: 'cool', intensity: 'light' },
          { name: 'Dusty Rose', hex: '#C4A4A4', description: 'Too muted', undertone: 'cool', intensity: 'light' },
          { name: 'Cool Brown', hex: '#4A3C34', description: 'Too cool', undertone: 'cool', intensity: 'medium' }
        ],
        tips: [
          'You need bright, vivid colors - muted shades will make you look tired',
          'Vivid fashion colors look amazing on you',
          'High-shine, glossy finishes enhance your brightness',
          'Avoid anything muted, dusty, or cool'
        ],
        celebrityExamples: ['Lindsay Lohan', 'Nicole Kidman (warm phases)', 'Isla Fisher', 'Christina Hendricks']
      },
      {
        subtypeId: 'air-earth',
        bestColors: [
          {
            name: 'Natural Shades',
            description: 'Rich, warm colors for your golden appearance',
            colors: [
              { name: 'Rich Golden Brown', hex: '#996515', description: 'Deep golden brown', undertone: 'warm', intensity: 'medium' },
              { name: 'Warm Caramel', hex: '#A67B5B', description: 'Rich caramel', undertone: 'warm', intensity: 'medium' },
              { name: 'Golden Auburn', hex: '#B87333', description: 'Warm reddish-gold', undertone: 'warm', intensity: 'medium' },
              { name: 'Honey Brown', hex: '#A0785A', description: 'Rich honey-brown', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Fashion Colors',
            description: 'Rich, warm fashion shades',
            colors: [
              { name: 'Warm Coral', hex: '#FF6F61', description: 'Rich coral', undertone: 'warm', intensity: 'vivid' },
              { name: 'Amber', hex: '#FFBF00', description: 'Rich golden', undertone: 'warm', intensity: 'vivid' },
              { name: 'Mango', hex: '#FF8243', description: 'Warm orange', undertone: 'warm', intensity: 'vivid' },
              { name: 'Salmon', hex: '#FA8072', description: 'Warm peachy-pink', undertone: 'warm', intensity: 'medium' }
            ]
          },
          {
            name: 'Highlights & Dimension',
            description: 'Rich, golden highlights',
            colors: [
              { name: 'Rich Gold', hex: '#D4AF37', description: 'Deep golden highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Warm Honey', hex: '#DDB06B', description: 'Rich honey highlights', undertone: 'warm', intensity: 'light' },
              { name: 'Caramel', hex: '#FFD59A', description: 'Warm caramel highlights', undertone: 'warm', intensity: 'light' }
            ]
          }
        ],
        avoidColors: [
          { name: 'Ash Blonde', hex: '#B8B0A0', description: 'Too cool', undertone: 'cool', intensity: 'light' },
          { name: 'Cool Brown', hex: '#4A3C34', description: 'Lacks warmth', undertone: 'cool', intensity: 'medium' },
          { name: 'Platinum', hex: '#E8E4E1', description: 'Too cool and icy', undertone: 'cool', intensity: 'light' },
          { name: 'Blue-Black', hex: '#0C0C1E', description: 'Too cool and dark', undertone: 'cool', intensity: 'dark' }
        ],
        tips: [
          'Rich, warm colors make your skin glow',
          'Golden and caramel tones are incredibly flattering',
          'You can handle richer, deeper warm colors than other Air types',
          'Avoid anything cool or ashy'
        ],
        celebrityExamples: ['Jennifer Aniston (warm phases)', 'Blake Lively', 'Gisele Bundchen', 'Beyoncé']
      }
    ]
  }
];

const ElementIcon: React.FC<{ element: string; className?: string }> = ({ element, className = "w-5 h-5" }) => {
  switch (element) {
    case 'fire':
      return <Flame className={className} />;
    case 'water':
      return <Droplets className={className} />;
    case 'earth':
      return <Mountain className={className} />;
    case 'air':
      return <Wind className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

interface HairColorGuideProps {
  userElement?: string | null;
  userSubtype?: string | null;
  user?: any;
  savedHairColors?: SavedHairColor[];
  onSaveColor?: (color: SavedHairColor) => void;
  onRemoveColor?: (colorId: string) => void;
}

const HairColorGuide: React.FC<HairColorGuideProps> = ({ 
  userElement, 
  userSubtype, 
  user,
  savedHairColors = [],
  onSaveColor,
  onRemoveColor
}) => {
  const [selectedElement, setSelectedElement] = useState<string>(userElement || 'fire');
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(userSubtype || null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const elementData = hairColorData.find(e => e.elementId === selectedElement);
  const elementType = elementalTypes.find(e => e.id === selectedElement);
  
  const subtypeGuide = selectedSubtype 
    ? elementData?.subtypeGuides.find(s => s.subtypeId === selectedSubtype)
    : null;

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const getSubtypeInfo = (subtypeId: string): ElementalSubtype | undefined => {
    return elementType?.subtypes.find(s => s.id === subtypeId);
  };

  const isColorSaved = (colorName: string, hex: string): boolean => {
    return savedHairColors.some(c => c.name === colorName && c.hex === hex);
  };

  const getSavedColorId = (colorName: string, hex: string): string | undefined => {
    const saved = savedHairColors.find(c => c.name === colorName && c.hex === hex);
    return saved?.id;
  };

  const handleToggleSave = (color: HairColor, category: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save hair colors to your favorites.',
        variant: 'destructive'
      });
      return;
    }

    const existingId = getSavedColorId(color.name, color.hex);
    
    if (existingId && onRemoveColor) {
      onRemoveColor(existingId);
    } else if (onSaveColor && selectedSubtype) {
      const savedColor: SavedHairColor = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: color.name,
        hex: color.hex,
        description: color.description,
        undertone: color.undertone,
        intensity: color.intensity,
        category: category,
        elementId: selectedElement,
        subtypeId: selectedSubtype,
        savedAt: new Date().toISOString()
      };
      onSaveColor(savedColor);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="relative p-8 border-b overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69428e008bae4e2c0619585d_1770944907449_6af5227f.jpg')` }}

        />
        {/* Subtle overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/50 to-purple-900/50" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-white drop-shadow-md">Hair Color Guide</h2>
              <p className="text-amber-100/90 drop-shadow-sm">Find your perfect hair color by element & subtype</p>
            </div>
          </div>

          {/* Saved Colors Count */}
          {savedHairColors.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/20">
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span className="text-white/90">{savedHairColors.length} saved color{savedHairColors.length !== 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Element Selector */}
          <div className="flex flex-wrap gap-3 mt-6">
            {elementalTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedElement(type.id);
                  setSelectedSubtype(null);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  selectedElement === type.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white/90 text-gray-700 hover:bg-white border border-white/30 shadow-sm'
                }`}
                style={{
                  backgroundColor: selectedElement === type.id ? type.colors[0].hex : undefined
                }}
              >
                <ElementIcon element={type.id} className="w-5 h-5" />
                <span>{type.name}</span>
                <span className="text-sm opacity-75">({type.season})</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="p-8">
        {elementData && elementType && (
          <>
            {/* Element Overview */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${elementType.colors[0].hex}20` }}
                >
                  <ElementIcon element={selectedElement} className="w-7 h-7" style={{ color: elementType.colors[0].hex }} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">
                    {elementType.name} Element ({elementType.season})
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{elementData.overview}</p>
                </div>
              </div>

              {/* General Tips */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {elementData.generalTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtype Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Subtype</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {elementType.subtypes.map((subtype) => (
                  <button
                    key={subtype.id}
                    onClick={() => setSelectedSubtype(subtype.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedSubtype === subtype.id
                        ? 'ring-2 shadow-lg scale-[1.02]'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    style={{
                      backgroundColor: selectedSubtype === subtype.id ? `${subtype.colors[0].hex}15` : undefined,
                      borderColor: selectedSubtype === subtype.id ? subtype.colors[0].hex : undefined,
                      ringColor: selectedSubtype === subtype.id ? subtype.colors[0].hex : undefined
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: subtype.colors[0].hex }}
                      />
                      <span className="font-medium text-gray-900">{subtype.shortName}</span>
                    </div>
                    <p className="text-xs text-gray-500">{subtype.seasonalName}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Subtype Hair Guide */}
            {subtypeGuide && (
              <div className="space-y-8">
                {/* Subtype Info */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: `${getSubtypeInfo(selectedSubtype!)?.colors[0].hex}10` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {getSubtypeInfo(selectedSubtype!)?.colors.slice(0, 4).map((color, idx) => (
                        <div 
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {getSubtypeInfo(selectedSubtype!)?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {getSubtypeInfo(selectedSubtype!)?.seasonalName}
                      </p>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {subtypeGuide.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>

                  {/* Celebrity Examples */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Celebrity Examples:</span>{' '}
                      {subtypeGuide.celebrityExamples.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Best Colors */}
                <div>
                  <h4 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-green-500" />
                    Recommended Hair Colors
                  </h4>
                  
                  <div className="space-y-6">
                    {subtypeGuide.bestColors.map((category) => (
                      <div key={category.name} className="border border-gray-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div>
                            <h5 className="font-semibold text-gray-900">{category.name}</h5>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                          {expandedCategories[category.name] ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        
                        {(expandedCategories[category.name] !== false) && (
                          <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.colors.map((color) => {
                              const isSaved = isColorSaved(color.name, color.hex);
                              return (
                                <div 
                                  key={color.name}
                                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow relative group"
                                >
                                  <div 
                                    className="w-12 h-12 rounded-lg shadow-inner flex-shrink-0"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm">{color.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{color.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        color.undertone === 'warm' ? 'bg-orange-100 text-orange-700' :
                                        color.undertone === 'cool' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                      }`}>
                                        {color.undertone}
                                      </span>
                                      <span className="text-xs text-gray-400">{color.hex}</span>
                                    </div>
                                  </div>
                                  {/* Heart Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleSave(color, category.name);
                                    }}
                                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                                      isSaved 
                                        ? 'bg-rose-100 text-rose-500' 
                                        : 'bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-400'
                                    }`}
                                    title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
                                  >
                                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors to Avoid */}
                <div>
                  <h4 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-2">
                    <X className="w-6 h-6 text-red-500" />
                    Colors to Avoid
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {subtypeGuide.avoidColors.map((color) => (
                      <div 
                        key={color.name}
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg shadow-inner flex-shrink-0 relative"
                          style={{ backgroundColor: color.hex }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <X className="w-6 h-6 text-white drop-shadow-md" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{color.name}</p>
                          <p className="text-xs text-red-600 mt-0.5">{color.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Prompt to select subtype */}
            {!selectedSubtype && (
              <div className="text-center py-12 px-6 bg-gray-50 rounded-2xl">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Select Your Subtype</h4>
                <p className="text-gray-600 max-w-md mx-auto">
                  Choose your specific subtype above to see personalized hair color recommendations 
                  tailored to your unique coloring.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { hairColorData };
export default HairColorGuide;
