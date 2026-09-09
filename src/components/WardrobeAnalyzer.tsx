import React, { useState, useCallback } from 'react';
import { Upload, X, Palette, CheckCircle, AlertCircle, Crown, Lock, Sparkles } from 'lucide-react';
import { ElementalType } from '@/data/elementalTypes';

interface WardrobeAnalyzerProps {
  userType: ElementalType | null;
  isPremium?: boolean;
  remainingUses?: number;
  onUseAnalyzer?: () => Promise<boolean>;
  onUpgradeToPremium?: () => void;
}

interface UploadedItem {
  id: string;
  file: File;
  preview: string;
  dominantColor: string;
  matchScore: number;
  matchStatus: 'perfect' | 'good' | 'neutral' | 'poor';
}

const WardrobeAnalyzer: React.FC<WardrobeAnalyzerProps> = ({ 
  userType, 
  isPremium = false, 
  remainingUses = 3,
  onUseAnalyzer,
  onUpgradeToPremium
}) => {
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Simulate color extraction and matching
  const analyzeImage = (file: File): Promise<UploadedItem> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulate color analysis with random results for demo
        const colors = userType?.colors || [];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const matchScore = Math.floor(Math.random() * 40) + 60; // 60-100
        
        let matchStatus: 'perfect' | 'good' | 'neutral' | 'poor';
        if (matchScore >= 90) matchStatus = 'perfect';
        else if (matchScore >= 75) matchStatus = 'good';
        else if (matchScore >= 60) matchStatus = 'neutral';
        else matchStatus = 'poor';

        resolve({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: e.target?.result as string,
          dominantColor: randomColor?.hex || '#888888',
          matchScore,
          matchStatus
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async (files: File[]) => {
    // Check if user can use the analyzer
    if (!isPremium && remainingUses <= 0) {
      setShowLimitModal(true);
      return;
    }

    // Track usage if callback provided
    if (onUseAnalyzer) {
      const canProceed = await onUseAnalyzer();
      if (!canProceed && !isPremium) {
        setShowLimitModal(true);
        return;
      }
    }

    const analyzed = await Promise.all(files.map(analyzeImage));
    setUploadedItems(prev => [...prev, ...analyzed]);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    await handleAnalyze(files);
  }, [userType, isPremium, remainingUses]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleAnalyze(files);
  };

  const removeItem = (id: string) => {
    setUploadedItems(prev => prev.filter(item => item.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'perfect': return 'bg-green-100 text-green-700 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'perfect':
      case 'good':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (!userType) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <Palette className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-serif text-gray-900 mb-2">Discover Your Type First</h3>
        <p className="text-gray-500">Take the quiz to unlock your personalized wardrobe analyzer</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-serif text-gray-900">Wardrobe Analyzer</h3>
          {isPremium ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 rounded-full text-sm font-medium">
              <Crown className="w-4 h-4" />
              Unlimited
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              {remainingUses} uses left
            </span>
          )}
        </div>
        <p className="text-gray-500">Upload photos of your clothing to see how well they match your {userType.name} palette</p>
      </div>

      {/* Premium Banner for Free Users */}
      {!isPremium && remainingUses <= 1 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Upgrade to Premium</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get unlimited wardrobe analyses, advanced AI color matching, and exclusive member benefits.
              </p>
              <button
                onClick={onUpgradeToPremium}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-sm font-medium hover:from-amber-600 hover:to-rose-600 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          isDragging 
            ? 'border-gray-400 bg-gray-50' 
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        } ${!isPremium && remainingUses <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={!isPremium && remainingUses <= 0}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        {!isPremium && remainingUses <= 0 ? (
          <>
            <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">Usage Limit Reached</p>
            <p className="text-gray-400 text-sm">Upgrade to Premium for unlimited analyses</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium mb-2">Drop your clothing photos here</p>
            <p className="text-gray-400 text-sm">or click to browse</p>
          </>
        )}
      </div>

      {/* Uploaded Items Grid */}
      {uploadedItems.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-gray-900 mb-4">Analyzed Items ({uploadedItems.length})</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img 
                    src={item.preview} 
                    alt="Uploaded item"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>

                {/* Match info */}
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.dominantColor }}
                    />
                    <span className="text-xs text-gray-500 uppercase">{item.dominantColor}</span>
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.matchStatus)}`}>
                    {getStatusIcon(item.matchStatus)}
                    <span>{item.matchScore}% Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-4">Wardrobe Analysis Summary</h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {uploadedItems.filter(i => i.matchStatus === 'perfect').length}
                </div>
                <div className="text-xs text-gray-500">Perfect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {uploadedItems.filter(i => i.matchStatus === 'good').length}
                </div>
                <div className="text-xs text-gray-500">Good</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {uploadedItems.filter(i => i.matchStatus === 'neutral').length}
                </div>
                <div className="text-xs text-gray-500">Neutral</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {uploadedItems.filter(i => i.matchStatus === 'poor').length}
                </div>
                <div className="text-xs text-gray-500">Poor</div>
              </div>
            </div>
          </div>

          {/* Premium AI Analysis (Premium Only) */}
          {isPremium && (
            <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium text-gray-900">Premium AI Insights</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Your wardrobe has a strong foundation of colors that complement your {userType.name} palette.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Consider adding more {userType.colors[0]?.name || 'accent'} pieces to enhance your look.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Try pairing items with 80%+ match scores for the most harmonious outfits.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Limit Reached Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">Usage Limit Reached</h3>
              <p className="text-gray-600 mb-6">
                You've used all your free wardrobe analyses this month. Upgrade to Premium for unlimited access!
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowLimitModal(false);
                    onUpgradeToPremium?.();
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full font-medium hover:from-amber-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </button>
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="w-full py-3 px-4 border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WardrobeAnalyzer;
