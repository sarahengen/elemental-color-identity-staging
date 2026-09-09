import React, { useState, useEffect, useRef } from 'react';
import { Flame, Droplets, Mountain, Wind, type LucideIcon } from 'lucide-react';

interface StackedCard {
  subtypeId: string;
  name: string;
  pairing: string;
  title: string;
  description: string;
  /** Primary element icon — carries the meaning of the card at a glance. */
  Icon: LucideIcon;
  /** Curated pair from the subtype palette — chosen for full-card gradients (skips near-black / muddy combos). */
  colors: [string, string];
}

const cardMeta: StackedCard[] = [
  {
    subtypeId: 'water-air',
    name: 'Misty Shore',
    pairing: 'Water + Air',
    title: 'The Threshold Keeper',
    description:
      'I soften what is too sharp to look at directly. The place of arrivals and departures.',
    Icon: Droplets,
    // Exact quiz header bar: Soft Pink → Sky Blue
    colors: ['#F4C2C2', '#87CEEB'],
  },
  {
    subtypeId: 'fire-earth',
    name: 'Forge Fire',
    pairing: 'Fire + Earth',
    title: 'The Maker',
    description:
      'I make things that last from things that burned. Purposeful. Enduring. Skilled.',
    Icon: Flame,
    // Quiz header bar is Black → Burgundy, which collapses to a black rectangle.
    // Kept the ember fix (Burgundy → Orange) so the dark subtype still reads richly.
    colors: ['#732F3D', '#FF5300'],
  },
  {
    subtypeId: 'earth-water',
    name: 'Velvet Moss',
    pairing: 'Earth + Water',
    title: 'The Soft Strength',
    description:
      'I turn hard places into soft ones. Patient, gentle, quietly transforming.',
    Icon: Mountain,
    // Exact quiz header bar: Dusty Rose → Army Green
    colors: ['#C4A4A4', '#5D7A57'],
  },
  {
    subtypeId: 'air-air',
    name: 'Clear Morning Sky',
    pairing: 'Air + Air',
    title: 'The Pure Vision',
    description:
      'Above the clouds, the view is clear. I see what is true before it is spoken.',
    Icon: Wind,
    // Exact quiz header bar: Coral → Warm Yellow
    colors: ['#FF7F50', '#FFE135'],
  },
];

const StackedElementalCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = cardMeta;

  // Respect reduced-motion: don't auto-advance for those users.
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [cards.length, isPaused]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Card stack */}
      <div
        className="relative w-full max-w-md mx-auto"
        style={{ height: '360px' }}
        aria-label="Animated stacked elemental subtype cards"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {cards.map((card, index) => {
          // Position of this card relative to the active one.
          const offset = (index - activeIndex + cards.length) % cards.length;
          const isActive = offset === 0;
          const isVisibleStack = offset <= 2;
          const translateY = offset * 16;
          const scale = 1 - offset * 0.045;
          const zIndex = cards.length - offset;
          const opacity = offset > 2 ? 0 : 1 - offset * 0.18;

          return (
            <button
              key={card.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group absolute inset-0 rounded-3xl p-8 flex flex-col text-left shadow-xl transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${card.colors[0]}, ${card.colors[1]})`,
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: isVisibleStack ? 'auto' : 'none',
                color: '#ffffff',
              }}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              {/* Soft top sheen for a glass-card feel */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              {/* Bottom scrim keeps text legible on light palettes */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Content fades out on background cards → no ghost-text bleed-through */}
              <div
                className="relative flex flex-col flex-1 transition-opacity duration-500"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
                    {card.pairing}
                  </span>
                  {/* Element icon in a glass badge — conveys the card's element at a glance */}
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
                    <card.Icon className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-[2rem] leading-[1.05] font-serif tracking-tight mb-2 text-white drop-shadow-sm">
                    {card.name}
                  </h3>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/85 mb-4">
                    {card.title}
                  </p>
                  <p className="text-[0.9rem] leading-relaxed italic text-white/90 border-l-2 border-white/40 pl-3.5">
                    {card.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Indicator dots */}
      <div className="flex items-center gap-2 mt-8">
        {cards.map((card, index) => (
          <button
            key={card.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${card.name}`}
            aria-current={index === activeIndex}
            className="h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
            style={{
              width: index === activeIndex ? '28px' : '10px',
              background:
                index === activeIndex
                  ? `linear-gradient(90deg, ${card.colors[0]}, ${card.colors[1]})`
                  : '#d4d4d8',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StackedElementalCards;
