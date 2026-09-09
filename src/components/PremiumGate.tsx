import React from 'react';
import { Crown, Lock, Check } from 'lucide-react';
interface PremiumGateProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  onUpgrade: () => void;
  featuresLabel?: string;
  ctaLabel?: string;
  pricingHint?: string;
}
const PremiumGate: React.FC<PremiumGateProps> = ({
  title,
  description,
  features,
  icon,
  gradientFrom,
  gradientTo,
  onUpgrade,
  featuresLabel = 'Discovery Features Include:',
  ctaLabel = 'Upgrade to Discovery',
  pricingHint = 'Starting at $9.99/month • Cancel anytime',
}) => {
  return <div className="relative">
      {/* Blurred preview background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="grid grid-cols-3 gap-4 p-8">
            {[...Array(9)].map((_, i) => <div key={i} className="w-24 h-24 rounded-xl" style={{
            background: `linear-gradient(135deg, ${gradientFrom}40, ${gradientTo}40)`
          }} />)}
          </div>
        </div>
      </div>

      {/* Premium gate content */}
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Lock icon with gradient background */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg" style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        }}>
            <Lock className="w-10 h-10 text-white" />
          </div>

          {/* Title and description */}
          <h3 className="text-2xl font-serif text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-8">{description}</p>


          {/* Feature list */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
            }}>
                {icon}
              </div>
              <span className="font-medium text-gray-900">{featuresLabel}</span>

            </div>
            <ul className="space-y-3 text-left">
              {features.map((feature, idx) => <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>)}
            </ul>
          </div>

          {/* Upgrade CTA */}
          <button onClick={onUpgrade} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Crown className="w-5 h-5" />
            {ctaLabel}

          </button>

          {/* Pricing hint */}
          <p className="mt-4 text-sm text-gray-500">
            {pricingHint}
          </p>
        </div>
      </div>
    </div>;
};
export default PremiumGate;
