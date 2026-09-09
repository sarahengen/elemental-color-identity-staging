import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, X, Sparkles, RefreshCw, Zap, Check, AlertCircle, ChevronDown, Bookmark, Loader2 } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { ElementalType, ColorSwatch } from '@/data/elementalTypes';
import type { ColorAnalyzerScan, SaveColorScanInput } from '@/hooks/useSavedColorScans';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CameraColorAnalyzerProps {
  userType: ElementalType | null;
  userSubtype?: string | null;
  user?: User | null;
  onRequestAuth?: () => void;
  onSaveScan?: (input: SaveColorScanInput) => Promise<unknown>;
  revisitScan?: ColorAnalyzerScan | null;
  onRevisitHandled?: () => void;
}

interface AnalyzedColor {
  hex: string;
  percentage: number;
  name: string;
}

interface MatchResult {
  score: number;
  matchedColors: Array<{ analyzed: AnalyzedColor; palette: ColorSwatch; distance: number }>;
  verdict: 'perfect' | 'great' | 'good' | 'neutral' | 'poor';
  suggestions: string[];
}

const HONEST_RESULT_TIPS: { title: string; body: string }[] = [
  {
    title: 'Light first',
    body: 'Move to a window in natural daylight before you do anything else. Indirect light — not direct sun — gives the most honest color. Avoid warm bulbs and overhead lighting where possible.',
  },
  {
    title: 'Fill the frame',
    body: 'Hold the item close enough that the color fills most of your screen.',
  },
  {
    title: 'Lock before you shoot',
    body: 'Press and hold on the item until AE/AF Lock appears. This stops your phone from automatically shifting color and brightness in the moment before you capture.',
  },
  {
    title: 'Shoot straight on',
    body: 'Angles create shadows and reflections that shift color. Hold your phone flat and parallel to the surface of the item.',
  },
  {
    title: 'No flash',
    body: 'Move to better light instead.',
  },
  {
    title: 'Take a few shots',
    body: 'Take two or three and trust the one that looks most true to your eye in that light.',
  },
  {
    title: 'Check it where you shot it',
    body: 'Look at the image on your screen while still in the same natural light. If it looks right there — it is your most honest read.',
  },
];

const CameraColorAnalyzer: React.FC<CameraColorAnalyzerProps> = ({ 
  userType, 
  userSubtype,
  user = null,
  onRequestAuth,
  onSaveScan,
  revisitScan = null,
  onRevisitHandled,
}) => {
  const [mode, setMode] = useState<'idle' | 'camera' | 'photo'>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzedColors, setAnalyzedColors] = useState<AnalyzedColor[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveNote, setSaveNote] = useState('');
  const [savingScan, setSavingScan] = useState(false);
  const [scanSaved, setScanSaved] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Get the user's color palette (subtype if available, otherwise main type)
  const getUserPalette = (): ColorSwatch[] => {
    if (!userType) return [];
    if (userSubtype) {
      const subtype = userType.subtypes.find(s => s.id === userSubtype);
      if (subtype) return subtype.colors;
    }
    return userType.colors;
  };

  // Color distance calculation (CIE76 approximation)
  const colorDistance = (hex1: string, hex2: string): number => {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return 255;
    
    const rMean = (rgb1.r + rgb2.r) / 2;
    const deltaR = rgb1.r - rgb2.r;
    const deltaG = rgb1.g - rgb2.g;
    const deltaB = rgb1.b - rgb2.b;
    
    // Weighted Euclidean distance
    return Math.sqrt(
      (2 + rMean / 256) * deltaR * deltaR +
      4 * deltaG * deltaG +
      (2 + (255 - rMean) / 256) * deltaB * deltaB
    );
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  // Get color name approximation
  const getColorName = (hex: string): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 'Unknown';
    
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2 / 255;
    
    if (lightness > 0.9) return 'White';
    if (lightness < 0.1) return 'Black';
    
    if (max - min < 30) {
      if (lightness > 0.6) return 'Light Gray';
      if (lightness > 0.4) return 'Gray';
      return 'Dark Gray';
    }
    
    const hue = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;
    const normalizedHue = hue < 0 ? hue + 360 : hue;
    
    if (normalizedHue < 15 || normalizedHue >= 345) return lightness > 0.5 ? 'Pink' : 'Red';
    if (normalizedHue < 45) return 'Orange';
    if (normalizedHue < 75) return 'Yellow';
    if (normalizedHue < 150) return 'Green';
    if (normalizedHue < 210) return lightness > 0.5 ? 'Cyan' : 'Teal';
    if (normalizedHue < 270) return 'Blue';
    if (normalizedHue < 315) return 'Purple';
    return 'Magenta';
  };

  // Extract dominant colors from canvas
  const extractColors = (canvas: HTMLCanvasElement): AnalyzedColor[] => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];
    
    // Validate canvas dimensions before getting image data
    if (canvas.width <= 0 || canvas.height <= 0) {
      console.warn('Canvas has invalid dimensions:', canvas.width, canvas.height);
      return [];
    }
    
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple color quantization
      const colorCounts: Record<string, number> = {};
      const step = 4; // Sample every 4th pixel for performance
      
      for (let i = 0; i < data.length; i += 4 * step) {
        // Quantize to reduce color space
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;
        
        const hex = rgbToHex(r, g, b);
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }
      
      // Sort by frequency and get top colors
      const sortedColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
      
      const totalPixels = sortedColors.reduce((sum, [, count]) => sum + count, 0);
      
      if (totalPixels === 0) return [];
      
      return sortedColors.map(([hex, count]) => ({
        hex,
        percentage: Math.round((count / totalPixels) * 100),
        name: getColorName(hex)
      }));
    } catch (error) {
      console.error('Error extracting colors from canvas:', error);
      return [];
    }
  };


  // Analyze colors against user's palette
  const analyzeMatch = (colors: AnalyzedColor[]): MatchResult => {
    const palette = getUserPalette();
    if (palette.length === 0) {
      return {
        score: 0,
        matchedColors: [],
        verdict: 'neutral',
        suggestions: ['Take the quiz to discover your color palette first!']
      };
    }
    
    const matchedColors: MatchResult['matchedColors'] = [];
    let totalScore = 0;
    let totalWeight = 0;
    
    colors.forEach(analyzedColor => {
      let bestMatch: ColorSwatch | null = null;
      let bestDistance = Infinity;
      
      palette.forEach(paletteColor => {
        const distance = colorDistance(analyzedColor.hex, paletteColor.hex);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestMatch = paletteColor;
        }
      });
      
      if (bestMatch) {
        matchedColors.push({
          analyzed: analyzedColor,
          palette: bestMatch,
          distance: bestDistance
        });
        
        // Weight by percentage of image
        const weight = analyzedColor.percentage;
        const colorScore = Math.max(0, 100 - bestDistance);
        totalScore += colorScore * weight;
        totalWeight += weight;
      }
    });
    
    const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
    
    let verdict: MatchResult['verdict'];
    if (finalScore >= 85) verdict = 'perfect';
    else if (finalScore >= 70) verdict = 'great';
    else if (finalScore >= 55) verdict = 'good';
    else if (finalScore >= 40) verdict = 'neutral';
    else verdict = 'poor';
    
    const suggestions: string[] = [];
    if (verdict === 'perfect' || verdict === 'great') {
      suggestions.push('This item is an excellent match for your palette!');
      suggestions.push('The colors will enhance your natural coloring.');
    } else if (verdict === 'good') {
      suggestions.push('This item works well with your palette.');
      suggestions.push('Consider pairing with your primary colors for best effect.');
    } else if (verdict === 'neutral') {
      suggestions.push('This item has some compatible colors but isn\'t ideal.');
      suggestions.push('It could work as an accent piece with the right styling.');
    } else {
      suggestions.push('This item may not be the best match for your coloring.');
      suggestions.push('Consider looking for similar styles in your palette colors.');
    }
    
    return { score: finalScore, matchedColors, verdict, suggestions };
  };

  // Start camera — request stream first, then switch to camera mode.
  // The <video> only mounts when mode === 'camera', so srcObject is attached in an effect below.
  const startCamera = async () => {
    try {
      setCameraError(null);
      setVideoReady(false);

      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        });
      } catch {
        // Emulators / some phones reject environment-facing constraints — fall back to any camera
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      setStream(mediaStream);
      setMode('camera');
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Unable to access camera. Please check permissions or try uploading a photo instead.');
    }
  };

  // Attach stream once the video element is in the DOM (fixes black preview + endless Loading...)
  useEffect(() => {
    if (mode !== 'camera' || !stream) return;

    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;

    const markReady = () => {
      void video.play().catch(() => {
        /* autoplay can fail until user gesture; muted + playsInline usually allows it */
      });
      if (video.videoWidth > 0) setVideoReady(true);
    };

    video.onloadedmetadata = markReady;
    video.onplaying = () => setVideoReady(true);

    if (video.readyState >= 2) markReady();

    return () => {
      video.onloadedmetadata = null;
      video.onplaying = null;
    };
  }, [mode, stream]);

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setVideoReady(false);
    setMode('idle');
  };

  /**
   * Capture the same crop the user sees in the preview.
   * The <video> uses CSS object-cover, but canvas.drawImage() of the full
   * frame would include letterboxing (e.g. green bars from an emulator webcam)
   * that object-cover had cropped out — making preview ≠ captured image.
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const videoWidth = video.videoWidth || video.clientWidth || 640;
      const videoHeight = video.videoHeight || video.clientHeight || 480;

      if (videoWidth <= 0 || videoHeight <= 0) {
        console.warn('Video dimensions not ready:', videoWidth, videoHeight);
        setCameraError('Camera not ready. Please wait a moment and try again.');
        return;
      }

      const displayWidth = video.clientWidth || videoWidth;
      const displayHeight = video.clientHeight || videoHeight;
      const scale = Math.max(displayWidth / videoWidth, displayHeight / videoHeight);
      const croppedW = displayWidth / scale;
      const croppedH = displayHeight / scale;
      const sx = Math.max(0, (videoWidth - croppedW) / 2);
      const sy = Math.max(0, (videoHeight - croppedH) / 2);

      canvas.width = Math.round(croppedW);
      canvas.height = Math.round(croppedH);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          video,
          sx,
          sy,
          croppedW,
          croppedH,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        analyzeImage(canvas);
      }

      stopCamera();
      setMode('photo');
    }
  };


  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const maxSize = 800;
            let width = img.width;
            let height = img.height;
            
            if (width > height && width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            } else if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              setCapturedImage(event.target?.result as string);
              analyzeImage(canvas);
              setMode('photo');
            }
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze image
  const analyzeImage = (canvas: HTMLCanvasElement) => {
    setIsAnalyzing(true);
    setScanSaved(false);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const colors = extractColors(canvas);
      setAnalyzedColors(colors);
      const result = analyzeMatch(colors);
      setMatchResult(result);
      setIsAnalyzing(false);
    }, 800);
  };

  // Reset analyzer
  const reset = () => {
    stopCamera();
    setCapturedImage(null);
    setAnalyzedColors([]);
    setMatchResult(null);
    setMode('idle');
    setScanSaved(false);
    setSaveNote('');
    setSaveDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Load a previously saved scan into the result view
  useEffect(() => {
    if (!revisitScan || !userType) return;

    stopCamera();
    const colors: AnalyzedColor[] =
      Array.isArray(revisitScan.analyzed_colors) && revisitScan.analyzed_colors.length > 0
        ? revisitScan.analyzed_colors.map((c) => ({
            hex: c.hex,
            percentage: c.percentage,
            name: c.name,
          }))
        : [{ hex: revisitScan.hex, percentage: 100, name: 'Saved color' }];

    setCapturedImage(revisitScan.imageUrl || null);
    setAnalyzedColors(colors);
    const rebuilt = analyzeMatch(colors);
    setMatchResult({
      ...rebuilt,
      score: revisitScan.score,
      verdict: (['perfect', 'great', 'good', 'neutral', 'poor'].includes(revisitScan.verdict)
        ? revisitScan.verdict
        : rebuilt.verdict) as MatchResult['verdict'],
    });
    setIsAnalyzing(false);
    setScanSaved(true);
    setMode('photo');
    onRevisitHandled?.();

    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional one-shot when revisitScan changes
  }, [revisitScan?.id]);

  const openSaveFlow = () => {
    if (!user) {
      onRequestAuth?.();
      return;
    }
    if (!matchResult || !analyzedColors.length) return;
    setSaveNote('');
    setSaveDialogOpen(true);
  };

  const confirmSaveScan = async () => {
    if (!onSaveScan || !matchResult || !analyzedColors.length) return;
    setSavingScan(true);
    try {
      const primary = analyzedColors[0];
      const saved = await onSaveScan({
        hex: primary.hex,
        score: matchResult.score,
        verdict: matchResult.verdict,
        note: saveNote,
        analyzedColors,
        elementId: userType?.id ?? null,
        subtypeId: userSubtype ?? null,
        imageDataUrl: capturedImage,
      });
      if (saved) {
        setScanSaved(true);
        setSaveDialogOpen(false);
      }
    } finally {
      setSavingScan(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'perfect': return 'bg-green-100 text-green-700 border-green-200';
      case 'great': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'neutral': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'perfect':
      case 'great':
        return <Sparkles className="w-5 h-5" />;
      case 'good':
        return <Check className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  if (!userType) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-serif text-gray-900 mb-2">Discover Your Type First</h3>
        <p className="text-gray-500">Take the quiz to unlock the camera color analyzer</p>
      </div>
    );
  }

  const subtypeInfo = userSubtype ? userType.subtypes.find(s => s.id === userSubtype) : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-serif text-gray-900 mb-1">Camera Color Analyzer</h3>
            <p className="text-gray-500">
              Scan clothing or decor to see how well it matches your {subtypeInfo?.name || userType.name} palette
            </p>
          </div>
          {mode !== 'idle' && (
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main content area */}
      <div className="p-6">
        {mode === 'idle' && (
          <div className="space-y-4">
            {/* Camera error message */}
            {cameraError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-4">
                {cameraError}
              </div>
            )}

            {/* How to get the most honest result — short tips only */}
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setTipsOpen((open) => !open)}
                aria-expanded={tipsOpen}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  How to get the most honest result
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {tipsOpen ? 'Tap to close' : 'Tap to expand'}
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {tipsOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-3">
                  {HONEST_RESULT_TIPS.map((tip) => (
                    <div key={tip.title}>
                      <p className="text-sm font-medium text-gray-900">{tip.title}.</p>
                      <p className="text-sm text-gray-600 mt-0.5">{tip.body}</p>
                    </div>
                  ))}
                  <p className="text-sm text-gray-700 italic pt-1 border-t border-gray-100">
                    The most accurate color comes from the simplest conditions — good light, a steady hand, and a frame filled with what you want to see.
                  </p>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={startCamera}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Camera className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Use Camera</p>
                  <p className="text-sm text-gray-500">Point at clothing in stores or your closet</p>
                </div>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Upload className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Upload Photo</p>
                  <p className="text-sm text-gray-500">Analyze an existing photo</p>
                </div>
              </button>
            </div>

            {/* User's palette preview */}
            <div className="mt-2 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-3">Your {subtypeInfo?.name || userType.name} Palette</p>
              <div className="flex flex-wrap gap-2">
                {getUserPalette().slice(0, 8).map((color, idx) => (
                  <div key={idx} className="group relative">
                    <div 
                      className="w-10 h-10 rounded-full shadow-sm border-2 border-white"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode === 'camera' && (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white/30 rounded-xl pointer-events-none">
                <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg" />
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={stopCamera}
                className="px-6 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                disabled={!videoReady}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-colors ${
                  videoReady 
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Zap className="w-5 h-5" />
                {videoReady ? 'Capture & Analyze' : 'Loading...'}
              </button>
            </div>
          </div>
        )}

        {mode === 'photo' && (

          <div className="space-y-6">
            {/* Captured image and analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Captured Image</p>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  {capturedImage && (
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p>Analyzing colors...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Color Analysis</p>
                
                {!isAnalyzing && matchResult && (
                  <div className="space-y-4">
                    {/* Score */}
                    <div className={`p-4 rounded-xl border ${getVerdictColor(matchResult.verdict)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getVerdictIcon(matchResult.verdict)}
                          <span className="font-semibold capitalize">{matchResult.verdict} Match</span>
                        </div>
                        <span className="text-2xl font-bold">{matchResult.score}%</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${matchResult.score}%`,
                            backgroundColor: matchResult.score >= 70 ? '#22c55e' : matchResult.score >= 50 ? '#eab308' : '#ef4444'
                          }}
                        />
                      </div>
                    </div>

                    {/* Detected colors */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Detected Colors</p>
                      <div className="flex flex-wrap gap-2">
                        {analyzedColors.map((color, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs text-gray-600">{color.name} ({color.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color matches */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Palette Matches</p>
                      <div className="space-y-2">
                        {matchResult.matchedColors.slice(0, 4).map((match, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: match.analyzed.hex }}
                            />
                            <span className="text-gray-400">→</span>
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: match.palette.hex }}
                            />
                            <span className="text-gray-600">{match.palette.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              match.distance < 30 ? 'bg-green-100 text-green-700' :
                              match.distance < 60 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {match.distance < 30 ? 'Close' : match.distance < 60 ? 'Similar' : 'Different'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Suggestions</p>
                      <ul className="space-y-1">
                        {matchResult.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Save scan */}
                    <div className="pt-1">
                      {scanSaved ? (
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-green-50 text-green-800 text-sm font-medium">
                          <Check className="w-4 h-4" />
                          Saved to My Saved Scans
                        </div>
                      ) : user ? (
                        <button
                          type="button"
                          onClick={openSaveFlow}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                          Save scan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRequestAuth?.()}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                          Sign in to save
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save scan</DialogTitle>
            <DialogDescription>
              Store this result on your account so you can revisit it on any device. Image thumbnails are only kept when you save.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {matchResult && analyzedColors[0] && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <div
                  className="w-10 h-10 rounded-full border border-gray-200"
                  style={{ backgroundColor: analyzedColors[0].hex }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {matchResult.verdict} · {matchResult.score}%
                  </p>
                  <p className="text-xs font-mono text-gray-500">{analyzedColors[0].hex}</p>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="scan-note" className="text-sm font-medium text-gray-700">
                Note <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="scan-note"
                value={saveNote}
                onChange={(e) => setSaveNote(e.target.value.slice(0, 200))}
                rows={3}
                placeholder="e.g. Soft pink blouse from store"
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <p className="mt-1 text-xs text-gray-400 text-right">{saveNote.length}/200</p>
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setSaveDialogOpen(false)}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50"
              disabled={savingScan}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmSaveScan()}
              disabled={savingScan}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60"
            >
              {savingScan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bookmark className="w-4 h-4" />}
              {savingScan ? 'Saving…' : 'Save'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraColorAnalyzer;
