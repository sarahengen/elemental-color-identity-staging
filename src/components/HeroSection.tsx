import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, Gift } from 'lucide-react';
import { elementalTypes } from '@/data/elementalTypes';
interface HeroSectionProps {
  onStartQuiz: () => void;
  onExploreTypes: () => void;
  onJoinMembership: () => void;
  onGiftQuiz?: () => void;
}
const HeroSection: React.FC<HeroSectionProps> = ({
  onStartQuiz,
  onExploreTypes,
  onJoinMembership,
  onGiftQuiz
}) => {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTypeIndex(prev => (prev + 1) % elementalTypes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const activeType = elementalTypes[activeTypeIndex];
  return <section className="relative min-h-[90vh] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out" style={{
      background: `linear-gradient(135deg, ${activeType.colors[0].hex}30, ${activeType.colors[1].hex}30, ${activeType.colors[2]?.hex || activeType.colors[0].hex}20)`
    }} />
      
      {/* Soft fade to white at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />


      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Elemental Color Analysis + Personality Typing</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-4 leading-tight" data-mixed-content="true">
              Where{' '}
              <span className="transition-colors duration-700" style={{
              color: activeType.colors[0].hex
            }}>
                Color
              </span>{' '}Meets
              <br />
              Consciousness
            </h1>

            <p className="text-base md:text-lg font-medium tracking-wide text-gray-700 mb-8">
              A new language for your true self.
            </p>





            <div className="mb-10 max-w-lg space-y-4">
              <p className="font-serif text-lg md:text-xl text-gray-600 leading-relaxed" data-mixed-content="true">
                You know your Enneagram. You've read your chart. You understand your Human Design. You know your season. And yet, standing in front of the mirror, something still feels unresolved —{' '}
                <em className="italic font-medium transition-colors duration-700" style={{
                color: activeType.colors[0].hex
              }}>
                  the reflection doesn't quite match who you know yourself to be.
                </em>
              </p>

              <p className="font-serif text-lg md:text-xl text-gray-600 leading-relaxed">Elemental Color Identity bridges that gap — making your inner self visible in the world. Not as decoration, but as a mirror for who you are.</p>



              <p className="inline-flex items-center gap-2 mt-2 text-base md:text-lg font-semibold tracking-wide uppercase text-gray-900 border-l-4 pl-4 py-1" style={{
              borderColor: activeType.colors[0].hex
            }}>
                Discover Your Elemental Type
              </p>



            </div>







            <div className="flex flex-col items-center gap-3 max-w-xl">
              <button onClick={onStartQuiz} className="group flex items-center justify-center gap-3 w-full px-8 py-4 min-h-[3.5rem] bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                <Play className="w-5 h-5 shrink-0" />
                Take the Free Quiz
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
              {onGiftQuiz && <button onClick={onGiftQuiz} className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  <Gift className="w-4 h-4 text-amber-500" />
                  or gift the Free Quiz to a friend
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>}
            </div>

          </div>


          {/* Mobile Element Cards - 2x2 grid below headline content */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              {elementalTypes.map((type, idx) => <div key={type.id} onClick={() => setActiveTypeIndex(idx)} className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${idx === activeTypeIndex ? 'ring-4 ring-offset-2 shadow-2xl' : 'opacity-80 hover:opacity-100 shadow-lg'}`} style={{
              '--tw-ring-color': type.colors[0].hex,
              height: '150px'
            } as React.CSSProperties}>
                  <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, ${type.colors[0].hex}, ${type.colors[1].hex})`
              }} />
                  <img src={type.image} alt={type.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]">
                      {type.season}
                    </span>
                  </div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-lg font-serif text-white drop-shadow-lg">{type.name}</h3>
                    <p className="text-white/80 text-[10px] mt-0.5 drop-shadow" data-mixed-content="true" data-mixed-content="true">{type.season} • 4 Subtypes</p>
                    <div className="flex gap-1 mt-2">
                      {type.colors.slice(0, 4).map((color, cidx) => <div key={cidx} className="w-4 h-4 rounded-full border-2 border-white/50" style={{
                    backgroundColor: color.hex
                  }} />)}
                    </div>
                  </div>
                </div>)}
            </div>

            {/* Type Indicator */}
            <div className="flex justify-center gap-2 mt-5">
              {elementalTypes.map((type, idx) => <button key={type.id} onClick={() => setActiveTypeIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === activeTypeIndex ? 'w-8' : 'opacity-50 hover:opacity-100'}`} style={{
              backgroundColor: type.colors[0].hex
            }} />)}
            </div>
          </div>


          {/* Right Content - Element Cards */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Element Cards */}
              <div className="grid grid-cols-2 gap-4">
                {elementalTypes.map((type, idx) => <div key={type.id} onClick={() => setActiveTypeIndex(idx)} className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${idx === activeTypeIndex ? 'ring-4 ring-offset-4 scale-105 shadow-2xl' : 'opacity-70 hover:opacity-100 shadow-lg'}`} style={{
                '--tw-ring-color': type.colors[0].hex,
                height: idx === activeTypeIndex ? '185px' : '150px'
              } as React.CSSProperties}>
                    <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, ${type.colors[0].hex}, ${type.colors[1].hex})`
                }} />
                    <img src={type.image} alt={type.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
                    {/* Season badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                        {type.season}
                      </span>
                    </div>
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h3 className="text-xl font-serif text-white drop-shadow-lg">{type.name}</h3>
                      <p className="text-white/80 text-xs mt-1 drop-shadow" data-mixed-content="true" data-mixed-content="true">{type.season} • 4 Subtypes</p>

                      <div className="flex gap-1 mt-3">
                        {type.colors.slice(0, 4).map((color, cidx) => <div key={cidx} className="w-5 h-5 rounded-full border-2 border-white/50" style={{
                      backgroundColor: color.hex
                    }} />)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* Type Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {elementalTypes.map((type, idx) => <button key={type.id} onClick={() => setActiveTypeIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === activeTypeIndex ? 'w-8' : 'opacity-50 hover:opacity-100'}`} style={{
                backgroundColor: type.colors[0].hex
              }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;