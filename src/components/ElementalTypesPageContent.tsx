import React from 'react';
import { elementalTypes, ElementalType } from '@/data/elementalTypes';
import ElementalTypeCard from './ElementalTypeCard';
import ElementalGalleryTeaser from './ElementalGalleryTeaser';
import ElementalGuidesGateway from './ElementalGuidesGateway';

export interface ElementalTypesPageContentProps {
  userElement: string | null;
  onSelectType: (type: ElementalType) => void;
  hasWorkshopAccess?: boolean;
  onUnlockWorkshop?: () => void;
}

const ElementalTypesPageContent: React.FC<ElementalTypesPageContentProps> = ({
  userElement,
  onSelectType,
  hasWorkshopAccess = false,
  onUnlockWorkshop,
}) => {
  return (
    <main className="bg-white">

      {/* 1. The Four Elements */}
      <section id="types" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">The Four Elements</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Four Elements or &lsquo;Roots&rsquo;&mdash; Fire, Water, Earth, and Air&mdash;represent the
              distinct fundamental forces and energies of the natural world&hellip;and you. Select an element to learn
              more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {elementalTypes.map((type) => (
              <ElementalTypeCard
                key={type.id}
                type={type}
                onClick={() => onSelectType(type)}
                isSelected={userElement === type.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Elemental Gallery (includes palette + compass cards) */}
      <ElementalGalleryTeaser hasWorkshopAccess={hasWorkshopAccess} onUnlock={onUnlockWorkshop} />

      {/* 3. Elemental Guides */}
      <ElementalGuidesGateway hasWorkshopAccess={hasWorkshopAccess} onUnlock={onUnlockWorkshop} />

    </main>
  );
};

export default ElementalTypesPageContent;
