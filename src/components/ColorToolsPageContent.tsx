import React, { useState } from 'react';
import { Camera, Shirt } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { ElementalType } from '@/data/elementalTypes';
import CameraColorAnalyzer from './CameraColorAnalyzer';
import WardrobeAnalyzer from './WardrobeAnalyzer';
import SavedColorScans from './SavedColorScans';
import {
  useSavedColorScans,
  type ColorAnalyzerScan,
} from '@/hooks/useSavedColorScans';

export interface ColorToolsPageContentProps {
  userType: ElementalType | null | undefined;
  userSubtype: string | null;
  user?: User | null;
  onRequestAuth?: () => void;
  isPremium: boolean;
  remainingWardrobeUses: number;
  onUseWardrobeAnalyzer: () => Promise<boolean>;
  onUpgradeToPremium: () => void;
}

const ColorToolsPageContent: React.FC<ColorToolsPageContentProps> = ({
  userType,
  userSubtype,
  user = null,
  onRequestAuth,
  isPremium,
  remainingWardrobeUses,
  onUseWardrobeAnalyzer,
  onUpgradeToPremium,
}) => {
  const {
    scans,
    filteredScans,
    loading: scansLoading,
    scoreFilter,
    setScoreFilter,
    saveScan,
    deleteScan,
  } = useSavedColorScans(user);

  const [revisitScan, setRevisitScan] = useState<ColorAnalyzerScan | null>(null);

  return (
    <main className="bg-white">
      {/* Camera Color Analyzer */}
      <section id="analyzer" className="py-20 px-6 bg-white scroll-mt-24 md:scroll-mt-32 lg:scroll-mt-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full shadow-sm mb-6">
              <Camera className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-medium text-violet-800">Interactive tool</span>
            </div>
            <h1 className="text-4xl font-serif text-gray-900 mb-4">Camera Color Analyzer</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Point your camera at clothing - in store or at home — and find out instantly whether the color
              belongs in your elemental world. Get real-time compatibility scores and suggestions.
            </p>
          </div>

          <CameraColorAnalyzer
            userType={userType ?? null}
            userSubtype={userSubtype}
            user={user}
            onRequestAuth={onRequestAuth}
            onSaveScan={saveScan}
            revisitScan={revisitScan}
            onRevisitHandled={() => setRevisitScan(null)}
          />

          <SavedColorScans
            signedIn={!!user}
            scans={scans}
            filteredScans={filteredScans}
            loading={scansLoading}
            scoreFilter={scoreFilter}
            onFilterChange={setScoreFilter}
            onDelete={deleteScan}
            onRevisit={setRevisitScan}
            onRequestAuth={onRequestAuth}
          />
        </div>
      </section>

      {/* Wardrobe Analyzer */}
      <section id="wardrobe" className="py-20 px-6 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full shadow-sm mb-6">
              <Shirt className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-medium text-violet-800">Interactive tool</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Wardrobe Analyzer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload photos of your existing clothing to see how well they match your elemental palette
            </p>
          </div>
          <WardrobeAnalyzer
            userType={userType}
            isPremium={isPremium}
            remainingUses={remainingWardrobeUses}
            onUseAnalyzer={onUseWardrobeAnalyzer}
            onUpgradeToPremium={onUpgradeToPremium}
          />
        </div>
      </section>
    </main>
  );
};

export default ColorToolsPageContent;
