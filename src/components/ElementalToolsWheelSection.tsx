import React from 'react';
import { Sparkles } from 'lucide-react';
import { ElementalType } from '@/data/elementalTypes';
import ElementalColorWheel from './ElementalColorWheel';

export interface ElementalToolsWheelSectionProps {
  userElement: string | null;
  userSubtype: string | null;
  onSelectType: (type: ElementalType) => void;
  onStartQuiz: () => void;
  onStartSubtypeQuiz?: () => void;
}

const ElementalToolsWheelSection: React.FC<ElementalToolsWheelSectionProps> = ({
  userElement,
  userSubtype,
  onSelectType,
  onStartQuiz,
  onStartSubtypeQuiz,
}) => {
  return (
    <>
      <div id="elemental-tools" className="scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center px-6 pt-6 pb-2">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-2">Try it on the page</p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">Elemental Tools</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Explore the wheel, live camera matching, wardrobe audit, and your saved palette.
          </p>
        </div>
      </div>

      <section id="color-wheel" className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-800 mb-4">
              Interactive tool
            </span>
          </div>
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
        </div>
      </section>
    </>
  );
};

export default ElementalToolsWheelSection;
