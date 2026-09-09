import React, { useState } from 'react';
import { elementalTypes } from '@/data/elementalTypes';
import { Palette, Brush, Frame, Lightbulb, Sparkles, ChevronRight, X, Flame, Droplets, Mountain, Wind, Image as ImageIcon } from 'lucide-react';
import ArtGallery from './ArtGallery';

interface ArtisticCorrespondenceProps {
  userElement: string | null;
  userSubtype: string | null;
  embedInGuideHub?: boolean;
}

interface ArtisticData {

  subtypeId: string;
  elementCombo: string;
  archetypeName: string;
  qualities: string;
  essence: string;
  visualArtwork: {
    title: string;
    artist: string;
    description: string;
  };
  movementStyle: {
    name: string;
    description: string;
  };
  mediumSuggestion: string;
  creativePrompt: string;
}

// Artistic correspondence data for all 16 subtypes
export const artisticCorrespondenceData: Record<string, ArtisticData[]> = {
  fire: [
    {
      subtypeId: 'fire-fire',
      elementCombo: 'FIRE + FIRE',
      archetypeName: 'The Electric Arc',
      qualities: 'Sudden, Connective, Striking',
      essence: 'The lightning-fire that bridges gaps, creates instant connection, dances between potentials. More flash than substance, more connection than consumption.',
      visualArtwork: {
        title: 'The Great Wave off Kanagawa',
        artist: 'Hokusai',
        description: 'The foam crests as frozen electrical arcs of ocean energy'
      },
      movementStyle: {
        name: 'Op Art (Bridget Riley/Escher)',
        description: 'Visual electricity that "jumps" to the viewer\'s retina'
      },
      mediumSuggestion: 'Energetic Photograms',
      creativePrompt: 'Create work that exists only in the moment of connection between viewer and object.'
    },
    {
      subtypeId: 'fire-water',
      elementCombo: 'FIRE + WATER',
      archetypeName: 'The Blue Flame',
      qualities: 'Precise, Hot, Pure, Efficient',
      essence: 'The hottest part of the fire—clean, focused, almost intellectual. The scientist\'s flame, the surgeon\'s cautery, the star-core fire.',
      visualArtwork: {
        title: 'Cyanotype photographs',
        artist: 'Anna Atkins',
        description: 'The blueprint\'s cool intensity'
      },
      movementStyle: {
        name: 'Minimalism (Agnes Martin, Anne Truitt)',
        description: 'The essence distilled'
      },
      mediumSuggestion: 'Glassblowing with oxygen torch (true blue flame work)',
      creativePrompt: 'Remove everything until only the essential heat remains.'
    },
    {
      subtypeId: 'fire-earth',
      elementCombo: 'FIRE + EARTH',
      archetypeName: 'The Forge Iron',
      qualities: 'Enduring, Transformative, Heavy',
      essence: 'The fire that works, that makes, that carries memory of both destruction and creation. Fire as tool, fire as heavy industry, fire that leaves something behind.',
      visualArtwork: {
        title: 'The Knife-Grinder',
        artist: 'Kazimir Malevich (1912)',
        description: 'Labor as elemental force'
      },
      movementStyle: {
        name: 'Social Realism',
        description: 'The fire of labor (Lunch atop a Skyscraper)'
      },
      mediumSuggestion: 'Iron casting art (direct from the forge)',
      creativePrompt: 'Make something useful from something destroyed. Let the scars show.'
    },
    {
      subtypeId: 'fire-air',
      elementCombo: 'FIRE + AIR',
      archetypeName: 'The Illuminating Spark',
      qualities: 'Initiating, Small but Crucial, Ephemeral',
      essence: 'The first light in darkness, the idea-igniter, the fragile beginning. Not the blaze but the possibility of blaze.',
      visualArtwork: {
        title: 'Fireflies',
        artist: 'Yayoi Kusama',
        description: 'Points of light in infinity'
      },
      movementStyle: {
        name: 'Luminism (Lane/Heade)',
        description: 'Let there be light'
      },
      mediumSuggestion: 'Phosphorescent paintings – Glow that remembers light',
      creativePrompt: 'Document the moment just before understanding. The gasp, not the speech.'
    }
  ],
  water: [
    {
      subtypeId: 'water-air',
      elementCombo: 'WATER + AIR',
      archetypeName: 'The Misty Shore',
      qualities: 'Liminal, Veiled, Transitional',
      essence: 'Where water remembers it was air, and land remembers it might become sea. The place of arrivals and departures, seen through a softening lens.',
      visualArtwork: {
        title: 'Impression, Sunrise',
        artist: 'Claude Monet',
        description: 'Gentle, enveloping mist—capturing the soft-focus energy'
      },
      movementStyle: {
        name: 'Monet\'s London Parliament series',
        description: 'Architecture dissolving into Thames fog'
      },
      mediumSuggestion: 'Frosted glass engravings',
      creativePrompt: 'Create art that can only be seen through both mist and intimacy.'
    },
    {
      subtypeId: 'water-water',
      elementCombo: 'WATER + WATER',
      archetypeName: 'The Forest Lake',
      qualities: 'Deep, Reflective, Still Center',
      essence: 'Water that holds the forest\'s secrets upside down. The mirror that shows the world its true face when it stops moving.',
      visualArtwork: {
        title: 'Ophelia',
        artist: 'John Everett Millais',
        description: 'Water as final resting place, holding beauty'
      },
      movementStyle: {
        name: 'Pre-Raphaelite',
        description: 'Obsession with reflective surfaces'
      },
      mediumSuggestion: 'Mirrored installations (but weathered, imperfect)',
      creativePrompt: 'Make something that holds stillness so perfectly it becomes a mirror, reflecting truths.'
    },
    {
      subtypeId: 'water-fire',
      elementCombo: 'WATER + FIRE',
      archetypeName: 'The Sun-Dappled Pond',
      qualities: 'Fragmented, Joyful, Ephemeral',
      essence: 'Light playing on water as water plays with light. A celebration of the temporary, the broken-whole, the dance of photons on liquid.',
      visualArtwork: {
        title: 'Water Lilies series',
        artist: 'Claude Monet',
        description: 'Fractured light as subject itself'
      },
      movementStyle: {
        name: 'Impressionism',
        description: 'The instant of light'
      },
      mediumSuggestion: 'Mosaic work with reflective tesserae',
      creativePrompt: 'Capture light not as illumination, but as a dancer on water\'s skin. Make joy from fragmentation.'
    },
    {
      subtypeId: 'water-earth',
      elementCombo: 'WATER + EARTH',
      archetypeName: 'The Languid River',
      qualities: 'Narrative, Flowing, Connective',
      essence: 'Water as story, carrying sediment of meaning from source to delta. The element as time, as history, as conversation between landscapes.',
      visualArtwork: {
        title: 'The Course of Empire series',
        artist: 'Thomas Cole',
        description: 'Civilization as river\'s story'
      },
      movementStyle: {
        name: 'Narrative art',
        description: 'Where the river is protagonist'
      },
      mediumSuggestion: 'Scroll formats (unfolding like riverbanks)',
      creativePrompt: 'Let your work carry sediment from its source to its completion. Make the journey visible in the final form.'
    }
  ],
  earth: [
    {
      subtypeId: 'earth-fire',
      elementCombo: 'EARTH + FIRE',
      archetypeName: 'The Mountain Stone',
      qualities: 'Enduring, Austere, Monumental',
      essence: 'Earth\'s bone structure. Not just rock, but rock that remembers being molten; rock that will become sand; rock that currently defines "here."',

      visualArtwork: {
        title: 'Moon and Half Dome',
        artist: 'Ansel Adams',
        description: 'Sublime, monument made humble'
      },
      movementStyle: {
        name: 'Minimalist stone works',
        description: 'The weight of presence'
      },
      mediumSuggestion: 'Lithography (drawing on stone to make marks)',
      creativePrompt: 'Create work that feels both ancient and immediate, something that will outlast you.'
    },
    {
      subtypeId: 'earth-earth',
      elementCombo: 'EARTH + EARTH',
      archetypeName: 'The Forest Floor',
      qualities: 'Layered, Decaying, Fertile',
      essence: 'Where death becomes life becomes soil becomes life again. The quiet, dark, necessary transformation beneath the showy canopy.',
      visualArtwork: {
        title: 'The Hay Wain (1821)',
        artist: 'John Constable',
        description: 'Muddy wheels, lush landscape'
      },
      movementStyle: {
        name: 'Bio-art (living materials)',
        description: 'Art that grows, decays, and transforms'
      },
      mediumSuggestion: 'Compost prints (images created through decomposition)',
      creativePrompt: 'Make art from what has been discarded or is decaying. Find the beauty in transformation, not just creation.'
    },
    {
      subtypeId: 'earth-water',
      elementCombo: 'EARTH + WATER',
      archetypeName: 'The Velvet Moss',
      qualities: 'Soft, Ancient, Collaborative',
      essence: 'Earth\'s patience made visible. Not aggressive growth but gentle colonization, the collaboration of miniature worlds creating softness over hardness.',
      visualArtwork: {
        title: 'The Unicorn Tapestries',
        artist: 'Medieval craftsmen',
        description: 'Medieval softness on forest floor'
      },
      movementStyle: {
        name: 'Arts and Crafts movement',
        description: 'Return to natural textures'
      },
      mediumSuggestion: 'Textile art mimicking moss (felting, velvet, chenille)',
      creativePrompt: 'Work on a miniature scale that rewards close attention. Make softness from hardness, community from individuality.'
    },
    {
      subtypeId: 'earth-air',
      elementCombo: 'EARTH + AIR',

      archetypeName: 'The Golden Harvest',
      qualities: 'Cyclical, Abundant, Temporary',
      essence: 'Earth\'s generosity, time-limited. The moment of fullness before emptiness, the result of all the other earth-types working together.',
      visualArtwork: {
        title: 'The Harvesters',
        artist: 'Pieter Bruegel the Elder',
        description: 'Human rhythm with earth\'s cycle'
      },
      movementStyle: {
        name: 'Van Gogh\'s spiritual materialism',
        description: 'The sacred in the earthly'
      },
      mediumSuggestion: 'Straw marquetry (harvest as medium)',
      creativePrompt: 'Celebrate abundance without ignoring its temporariness. Make work about fullness that acknowledges emptiness will follow.'
    }
  ],
  air: [
    {
      subtypeId: 'air-air',
      elementCombo: 'AIR + AIR',
      archetypeName: 'The Clear Morning Sky',
      qualities: 'Expansive, Empty, Potential',
      essence: 'Air at its most pure—the blank canvas, the inhale before speech, the space where anything might appear but nothing yet has.',
      visualArtwork: {
        title: 'Sky Above Clouds',
        artist: 'Georgia O\'Keeffe',
        description: 'Pure expanse as subject'
      },
      movementStyle: {
        name: 'Color Field painting (Rothko\'s veils of color)',
        description: 'The infinite in the bounded'
      },
      mediumSuggestion: 'Empty frames that capture changing light',
      creativePrompt: 'Create work about potential rather than manifestation. Make the empty space more important than what fills it.'
    },
    {
      subtypeId: 'air-fire',
      elementCombo: 'AIR + FIRE',
      archetypeName: 'The Playful Breeze',
      qualities: 'Capricious, Animated, Delicate',
      essence: 'Air that touches things lightly, that reminds leaves they can dance, that carries scents but not storms.',
      visualArtwork: {
        title: 'Mobiles',
        artist: 'Alexander Calder',
        description: 'Captured playfulness'
      },
      movementStyle: {
        name: 'Rococo',
        description: 'The aesthetic of playful movement'
      },
      mediumSuggestion: 'Kite art (literally playing with wind)',
      creativePrompt: 'Make art that requires movement—either its own or the viewer\'s. Capture capriciousness without chaos.'
    },
    {
      subtypeId: 'air-earth',
      elementCombo: 'AIR + EARTH',
      archetypeName: 'The Gilded Zephyr',
      qualities: 'Luxurious, Warming, Atmospheric',
      essence: 'The breeze that feels expensive, that carries the scent of blooming orchards or distant spices, that gilds everything it touches with late afternoon light.',
      visualArtwork: {
        title: 'The Birth of Venus',
        artist: 'Botticelli',
        description: 'Wind as divine attendant'
      },
      movementStyle: {
        name: 'Aesthetic Movement',
        description: 'Art for beauty\'s sake'
      },
      mediumSuggestion: 'Gold leaf on irregular surfaces (catching light differently)',
      creativePrompt: 'Create luxury from lightness. Make opulence feel effortless, like something the wind just happened to arrange perfectly.'
    },
    {
      subtypeId: 'air-water',
      elementCombo: 'AIR + WATER',
      archetypeName: 'The First Whisper',
      qualities: 'Intimate, Secret, Beginning',
      essence: 'Air shaped by vulnerability, the breath that carries a secret, the almost-sound before it becomes word, the sigh that changes everything.',
      visualArtwork: {
        title: 'The Psyche Mirror',
        artist: 'Dante Gabriel Rossetti',
        description: 'Self revealed in intimate space'
      },
      movementStyle: {
        name: 'Confessional art',
        description: 'The whispered secret as art'
      },
      mediumSuggestion: 'Hidden compartments in artworks (secrets within secrets)',
      creativePrompt: 'Make art that requires intimacy to experience. Create secrets worth leaning close to hear.'
    }
  ]
};

// Element colors for styling
const elementColors: Record<string, { primary: string; secondary: string; bg: string; border: string; text: string; gradient: string }> = {
  fire: {
    primary: '#C41E3A',
    secondary: '#FF6B35',
    bg: 'from-red-50 via-orange-50 to-amber-50',
    border: 'border-red-500/30',
    text: 'text-red-600',
    gradient: 'from-red-600 via-orange-500 to-amber-500'
  },
  water: {
    primary: '#6B8BA4',
    secondary: '#B4A7D6',
    bg: 'from-blue-50 via-indigo-50 to-purple-50',
    border: 'border-blue-500/30',
    text: 'text-blue-600',
    gradient: 'from-blue-500 via-indigo-400 to-purple-400'
  },
  earth: {
    primary: '#CC4E3E',
    secondary: '#8B4513',
    bg: 'from-amber-50 via-orange-50 to-yellow-50',
    border: 'border-amber-500/30',
    text: 'text-amber-700',
    gradient: 'from-amber-600 via-orange-600 to-amber-700'
  },
  air: {
    primary: '#FF7F50',
    secondary: '#FFE135',
    bg: 'from-orange-50 via-yellow-50 to-pink-50',
    border: 'border-yellow-500/30',
    text: 'text-orange-600',
    gradient: 'from-orange-400 via-yellow-400 to-orange-300'
  }
};

// Fire Canvas Component
const FireCanvas: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-red-400 ring-offset-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-950">
      {/* Canvas texture */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      {/* Abstract fire painting */}
      <div className="absolute inset-4 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 130" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fireArtGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C41E3A" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#FFD700" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFF8DC" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="fireArtGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8B0000" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF4500" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Background dark */}
          <rect x="0" y="0" width="100" height="130" fill="#1a0a0a" />
          {/* Abstract flame forms */}
          <path d="M50,130 Q20,90 35,60 Q50,30 45,10 Q60,40 55,70 Q70,100 50,130" fill="url(#fireArtGrad1)" />
          <path d="M30,130 Q10,100 25,70 Q40,40 30,20 Q50,50 40,80 Q55,110 30,130" fill="url(#fireArtGrad2)" opacity="0.8" />
          <path d="M70,130 Q90,100 75,70 Q60,40 70,20 Q50,50 60,80 Q45,110 70,130" fill="url(#fireArtGrad2)" opacity="0.8" />
          {/* Spark details */}
          <circle cx="35" cy="45" r="2" fill="#FFD700" opacity="0.8" />
          <circle cx="60" cy="35" r="1.5" fill="#FFF8DC" opacity="0.9" />
          <circle cx="45" cy="55" r="1" fill="#FFFFFF" opacity="0.7" />
        </svg>
      </div>
      
      {/* Ornate frame */}
      <div className="absolute inset-2 border-4 border-amber-700/60 rounded-lg">
        <div className="absolute inset-1 border border-amber-600/40 rounded" />
      </div>
      
      {/* Fire icon */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-lg shadow-red-500/30">
          <Flame className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
    
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border border-amber-600/50 rounded-md px-3 py-2 shadow-lg">
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

// Water Canvas Component
const WaterCanvas: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-blue-300 ring-offset-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-blue-50 to-indigo-100">
      {/* Canvas texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      {/* Abstract water painting - Monet-inspired */}
      <div className="absolute inset-4 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 130" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waterArtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#6B8BA4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#B4A7D6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Background */}
          <rect x="0" y="0" width="100" height="130" fill="#E8F4F8" />
          {/* Water lily pond impression */}
          <ellipse cx="50" cy="100" rx="45" ry="25" fill="#6B8BA4" opacity="0.3" />
          <ellipse cx="50" cy="95" rx="40" ry="20" fill="#87CEEB" opacity="0.4" />
          {/* Lily pads */}
          <ellipse cx="30" cy="90" rx="12" ry="6" fill="#228B22" opacity="0.5" />
          <ellipse cx="65" cy="95" rx="10" ry="5" fill="#2E8B57" opacity="0.4" />
          <ellipse cx="50" cy="105" rx="8" ry="4" fill="#228B22" opacity="0.3" />
          {/* Water lilies */}
          <circle cx="30" cy="88" r="4" fill="#FFB6C1" opacity="0.8" />
          <circle cx="65" cy="93" r="3" fill="#FFC0CB" opacity="0.7" />
          {/* Reflections */}
          <path d="M20,40 Q35,35 50,40 Q65,45 80,40" fill="none" stroke="#B4A7D6" strokeWidth="2" opacity="0.4" />
          <path d="M15,60 Q40,55 60,60 Q80,65 90,60" fill="none" stroke="#6B8BA4" strokeWidth="1.5" opacity="0.3" />
          {/* Sky reflection */}
          <rect x="10" y="10" width="80" height="50" fill="url(#waterArtGrad)" opacity="0.3" />
        </svg>
      </div>
      
      {/* Elegant frame */}
      <div className="absolute inset-2 border-4 border-blue-200/60 rounded-lg">
        <div className="absolute inset-1 border border-indigo-200/40 rounded" />
      </div>
      
      {/* Water icon */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 shadow-lg shadow-blue-300/40">
          <Droplets className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
    
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5">
      <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-md px-3 py-2 shadow-md">
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

// Earth Canvas Component
const EarthCanvas: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-amber-500 ring-offset-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100">
      {/* Canvas texture */}
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238B4513\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      {/* Abstract landscape painting */}
      <div className="absolute inset-4 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 130" preserveAspectRatio="none">
          <defs>
            <linearGradient id="earthSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F4A460" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="earthFieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DAA520" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B4513" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Sky */}
          <rect x="0" y="0" width="100" height="50" fill="url(#earthSkyGrad)" />
          {/* Mountains */}
          <path d="M0,60 L25,30 L50,55 L75,25 L100,50 L100,70 L0,70 Z" fill="#8B7355" opacity="0.6" />
          <path d="M0,70 L20,45 L45,65 L70,40 L100,60 L100,80 L0,80 Z" fill="#A0522D" opacity="0.5" />
          {/* Harvest fields */}
          <rect x="0" y="70" width="100" height="60" fill="url(#earthFieldGrad)" />
          {/* Field rows */}
          <path d="M0,80 Q25,75 50,80 Q75,85 100,80" fill="none" stroke="#CD853F" strokeWidth="2" opacity="0.5" />
          <path d="M0,95 Q25,90 50,95 Q75,100 100,95" fill="none" stroke="#DEB887" strokeWidth="2" opacity="0.4" />
          <path d="M0,110 Q25,105 50,110 Q75,115 100,110" fill="none" stroke="#D2691E" strokeWidth="2" opacity="0.3" />
          {/* Wheat stalks suggestion */}
          <g opacity="0.6">
            <line x1="20" y1="85" x2="20" y2="75" stroke="#DAA520" strokeWidth="1" />
            <line x1="35" y1="90" x2="35" y2="78" stroke="#DAA520" strokeWidth="1" />
            <line x1="60" y1="88" x2="60" y2="76" stroke="#DAA520" strokeWidth="1" />
            <line x1="80" y1="85" x2="80" y2="73" stroke="#DAA520" strokeWidth="1" />
          </g>
        </svg>
      </div>
      
      {/* Rustic frame */}
      <div className="absolute inset-2 border-4 border-amber-700/50 rounded-lg">
        <div className="absolute inset-1 border border-amber-600/30 rounded" />
      </div>
      
      {/* Earth icon */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 shadow-lg shadow-amber-600/30">
          <Mountain className="w-5 h-5 text-amber-100" />
        </div>
      </div>
    </div>
    
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5">
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

// Air Canvas Component
const AirCanvas: React.FC<{ isSelected: boolean; isUser: boolean }> = ({ isSelected, isUser }) => (
  <div className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${isSelected ? 'ring-4 ring-orange-300 ring-offset-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-yellow-50 to-pink-50">
      {/* Canvas texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FF7F50\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      {/* Abstract sky/clouds painting */}
      <div className="absolute inset-4 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 130" preserveAspectRatio="none">
          <defs>
            <linearGradient id="airSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE4B5" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFDAB9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Background sky */}
          <rect x="0" y="0" width="100" height="130" fill="url(#airSkyGrad)" />
          {/* Clouds */}
          <ellipse cx="25" cy="30" rx="20" ry="10" fill="white" opacity="0.7" />
          <ellipse cx="35" cy="28" rx="15" ry="8" fill="white" opacity="0.8" />
          <ellipse cx="70" cy="50" rx="25" ry="12" fill="white" opacity="0.6" />
          <ellipse cx="80" cy="48" rx="18" ry="9" fill="white" opacity="0.7" />
          <ellipse cx="45" cy="80" rx="22" ry="11" fill="white" opacity="0.5" />
          {/* Wind currents */}
          <path d="M10,60 Q30,50 50,60 Q70,70 90,60" fill="none" stroke="#FF7F50" strokeWidth="1.5" opacity="0.4" />
          <path d="M5,90 Q25,80 45,90 Q65,100 85,90" fill="none" stroke="#FFE135" strokeWidth="1" opacity="0.3" />
          <path d="M15,110 Q35,100 55,110 Q75,120 95,110" fill="none" stroke="#FFCBA4" strokeWidth="1" opacity="0.3" />
          {/* Floating particles */}
          <circle cx="20" cy="45" r="2" fill="#FF7F50" opacity="0.5" />
          <circle cx="75" cy="35" r="1.5" fill="#FFE135" opacity="0.6" />
          <circle cx="50" cy="70" r="2" fill="#FFCBA4" opacity="0.4" />
          <circle cx="30" cy="100" r="1.5" fill="#FF7F50" opacity="0.3" />
        </svg>
      </div>
      
      {/* Delicate frame */}
      <div className="absolute inset-2 border-4 border-orange-200/60 rounded-lg">
        <div className="absolute inset-1 border border-yellow-200/40 rounded" />
      </div>
      
      {/* Air icon */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg shadow-orange-300/40">
          <Wind className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
    
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5">
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

type ArtisticView = 'correspondence' | 'gallery';

const ArtisticViewToggle: React.FC<{
  activeView: ArtisticView;
  setActiveView: React.Dispatch<React.SetStateAction<ArtisticView>>;
}> = ({ activeView, setActiveView }) => (
  <div className="flex justify-center">
    <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-200">
      <button
        type="button"
        onClick={() => setActiveView('correspondence')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
          activeView === 'correspondence'
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Palette className="w-4 h-4" />
        <span>Correspondence</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveView('gallery')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
          activeView === 'gallery'
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>Art Gallery</span>
      </button>
    </div>
  </div>
);

const ArtisticCorrespondence: React.FC<ArtisticCorrespondenceProps> = ({
  userElement,
  userSubtype,
  embedInGuideHub = false,
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [expandedSubtype, setExpandedSubtype] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ArtisticView>('correspondence');

  const selectedData = selectedElement ? artisticCorrespondenceData[selectedElement] : null;
  const colors = selectedElement ? elementColors[selectedElement] : null;

  const isUserElement = (element: string) => userElement === element;

  const renderCanvas = (element: string) => {
    const isSelected = selectedElement === element;
    const isUser = isUserElement(element);
    
    switch (element) {
      case 'fire':
        return <FireCanvas isSelected={isSelected} isUser={isUser} />;
      case 'water':
        return <WaterCanvas isSelected={isSelected} isUser={isUser} />;
      case 'earth':
        return <EarthCanvas isSelected={isSelected} isUser={isUser} />;
      case 'air':
        return <AirCanvas isSelected={isSelected} isUser={isUser} />;
      default:
        return null;
    }
  };

  const getElementBg = (element: string) => {
    return elementColors[element]?.bg || 'from-gray-50 to-gray-100';
  };

  const getElementGradient = (element: string) => {
    return elementColors[element]?.gradient || 'from-gray-500 to-gray-600';
  };

  const getElementTextColor = (element: string) => {
    return elementColors[element]?.text || 'text-gray-600';
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire':
        return <Flame className="w-6 h-6" />;
      case 'water':
        return <Droplets className="w-6 h-6" />;
      case 'earth':
        return <Mountain className="w-6 h-6" />;
      case 'air':
        return <Wind className="w-6 h-6" />;
      default:
        return null;
    }
  };

  // If gallery view is active, show the ArtGallery component
  if (activeView === 'gallery') {
    return (
      <div className="space-y-8">
        <ArtisticViewToggle activeView={activeView} setActiveView={setActiveView} />

        <ArtGallery userElement={userElement} userSubtype={userSubtype} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ArtisticViewToggle activeView={activeView} setActiveView={setActiveView} />

      {!embedInGuideHub && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
          <Palette className="w-10 h-10 mx-auto text-violet-600 mb-4" />
          <h3 className="text-2xl font-serif text-gray-900 mb-4">Art as Elemental Expression</h3>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Each elemental fusion carries its own artistic resonance—a visual language, a creative medium, 
            and an aesthetic philosophy that speaks to your soul. Discover the artworks, movements, and 
            creative prompts that align with your <span className="text-violet-600 font-medium">elemental artistic essence</span>.
          </p>
        </div>
      )}

      {/* Art Canvas Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.keys(artisticCorrespondenceData).map((element) => (
          <button
            key={element}
            onClick={() => {
              setSelectedElement(element);
              setExpandedSubtype(null);
            }}
            className="group transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            {renderCanvas(element)}
            
            {/* Theme label below canvas */}
            <p className={`mt-4 text-sm font-semibold ${getElementTextColor(element)} text-center transition-all group-hover:scale-105 capitalize`}>
              {element} Artistic Correspondence
            </p>
          </button>
        ))}
      </div>

      {/* Selected Element Detail */}
      {selectedData && selectedElement && colors && (
        <div className={`bg-gradient-to-br ${getElementBg(selectedElement)} rounded-2xl p-8 border border-gray-200 relative`}>
          {/* Close button */}
          <button 
            onClick={() => setSelectedElement(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${getElementGradient(selectedElement)} text-white mb-4`}>
              {getElementIcon(selectedElement)}
              <span className="text-xl font-bold uppercase tracking-wide">{selectedElement} Artistic Correspondence</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the artistic expressions that resonate with {selectedElement} energy and its elemental fusions.
            </p>
          </div>

          {/* User's subtype highlight */}
          {userElement === selectedElement && userSubtype && (
            <div className="text-center mb-6">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 ${colors.text}`}>
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Your artistic correspondence is highlighted below</span>
              </span>
            </div>
          )}

          {/* Subtype Cards */}
          <div className="space-y-4">
            {selectedData.map((data) => {
              const isExpanded = expandedSubtype === data.subtypeId;
              const isUserSubtype = userSubtype === data.subtypeId && userElement === selectedElement;
              
              return (
                <div 
                  key={data.subtypeId}
                  className={`bg-white/80 rounded-xl overflow-hidden transition-all ${isUserSubtype ? 'ring-2 ring-amber-400' : ''}`}
                >
                  {/* Header - Always visible */}
                  <button
                    onClick={() => setExpandedSubtype(isExpanded ? null : data.subtypeId)}
                    className="w-full flex items-center justify-between p-5 hover:bg-white/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getElementGradient(selectedElement)}`}
                      >
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">{data.elementCombo}</h3>
                          {isUserSubtype && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{data.archetypeName} • {data.qualities}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      {/* Essence */}
                      <div className="pt-5 mb-6">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Essence</h4>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{data.essence}"
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Visual Artwork */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getElementGradient(selectedElement)}`}>
                              <Frame className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Visual Artwork</h4>
                          </div>
                          <p className="text-gray-900 font-medium">{data.visualArtwork.title}</p>
                          <p className="text-sm text-gray-500 mb-1">by {data.visualArtwork.artist}</p>
                          <p className="text-sm text-gray-600">{data.visualArtwork.description}</p>
                        </div>

                        {/* Movement & Style */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getElementGradient(selectedElement)}`}>
                              <Brush className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Movement & Style</h4>
                          </div>
                          <p className="text-gray-900 font-medium">{data.movementStyle.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{data.movementStyle.description}</p>
                        </div>

                        {/* Medium Suggestion */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getElementGradient(selectedElement)}`}>
                              <Palette className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Medium Suggestion</h4>
                          </div>
                          <p className="text-gray-700">{data.mediumSuggestion}</p>
                        </div>

                        {/* Creative Prompt */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getElementGradient(selectedElement)}`}>
                              <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Creative Prompt</h4>
                          </div>
                          <p className="text-gray-700 italic">"{data.creativePrompt}"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prompt to select if nothing selected */}
      {!selectedElement && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Click on an art canvas above to explore the artistic correspondence for that element
          </p>
        </div>
      )}

      {/* Closing Quote */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed italic text-lg">
          "These artistic correspondences connect your elemental nature to creative expression. 
          Use them as inspiration for your own artistic journey, or to understand the visual 
          language that resonates with your <span className="text-violet-600 font-medium">elemental energy</span>."
        </p>
      </div>

    </div>
  );
};

export default ArtisticCorrespondence;
