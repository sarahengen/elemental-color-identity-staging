import React from 'react';
import { ElementalType } from '@/data/elementalTypes';
import { ArrowRight } from 'lucide-react';

interface ElementalTypeCardProps {
  type: ElementalType;
  onClick: () => void;
  isSelected?: boolean;
}

const ElementalTypeCard: React.FC<ElementalTypeCardProps> = ({ type, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
        isSelected ? 'ring-4 ring-offset-2' : ''
      }`}
      style={{ 
        '--ring-color': type.colors[0].hex,
        ringColor: isSelected ? type.colors[0].hex : 'transparent'
      } as React.CSSProperties}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{ 
          background: `linear-gradient(135deg, ${type.colors[0].hex}, ${type.colors[1].hex})` 
        }}
      />
      
      {/* Image overlay */}
      <div className="absolute inset-0">
        <img 
          src={type.image} 
          alt={type.name}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110"
        />
      </div>

      {/* Season badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {type.season}
        </span>
      </div>

      {/* Content */}
      <div className="relative p-6 h-80 flex flex-col justify-end">
        <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
          <h3 className="text-3xl font-serif text-white mb-1 drop-shadow-lg">{type.name}</h3>
          <p className="text-white/80 text-xs mb-2 drop-shadow">{type.season} Season • 4 Subtypes</p>
          <p className="text-white/90 text-sm mb-4 drop-shadow">{type.tagline}</p>
          
          {/* Color swatches */}
          <div className="flex gap-1 mb-4">
            {type.colors.slice(0, 6).map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full border-2 border-white/50 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <div className="flex items-center text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Explore {type.name}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementalTypeCard;
