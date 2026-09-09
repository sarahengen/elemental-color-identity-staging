import React from 'react';
import { Sparkles } from 'lucide-react';
import { ElementalType } from '@/data/elementalTypes';
import ElementalColorWheel from './ElementalColorWheel';
import LockedOverlay from './LockedOverlay';

export interface ElementalColorWheelSectionProps {
  userElement: string | null;
  userSubtype: string | null;
  onSelectType: (type: ElementalType) => void;
  onStartQuiz: () => void;
  onStartSubtypeQuiz?: () => void;
  hasWorkshopAccess?: boolean;
  onUnlockWorkshop?: () => void;
}

const ElementalColorWheelSection: React.FC<ElementalColorWheelSectionProps> = ({
  userElement,
  userSubtype,
  onSelectType,
  onStartQuiz,
  onStartSubtypeQuiz,
  hasWorkshopAccess = false,
  onUnlockWorkshop,
}) => {
  const wheelContent = (
    <>
      <ElementalColorWheel
        userElement={userElement}
        userSubtype={userSubtype}
        onSelectType={(type) => {
          onSelectType(type);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectSubtype={(type) => {
          onSelectType(type);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {!userElement && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Take the quiz to discover your position on the elemental color wheel
          </p>
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Find My Element
          </button>
        </div>
      )}

      {userElement && !userSubtype && onStartSubtypeQuiz && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            You&apos;ve discovered your element! Take the subtype quiz to find your exact position on the wheel.
          </p>
          <button
            onClick={onStartSubtypeQuiz}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            Find My Subtype
          </button>
        </div>
      )}
    </>
  );

  return (
    <section id="color-wheel" className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {hasWorkshopAccess ? (
          wheelContent
        ) : (
          <LockedOverlay
            title="Explore the Elemental Color Wheel"
            description="Navigate all 16 subtypes on the color wheel."
            icon={<Sparkles className="h-7 w-7 text-white" />}
            ctaLabel="Find your exact position"
            note="Included with Elemental Color Workshop"
            gradientFrom="#f59e0b"
            gradientTo="#ec4899"
            onUnlock={() => onUnlockWorkshop?.()}
          >
            {wheelContent}
          </LockedOverlay>
        )}
      </div>
    </section>
  );
};

export default ElementalColorWheelSection;
