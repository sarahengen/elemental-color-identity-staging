import React, { useCallback, useEffect, useState } from 'react';

export type PageAnchorNavItem = { id: string; label: string };

type PageAnchorNavProps = {
  items: PageAnchorNavItem[];
  ariaLabel?: string;
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  }
};

/**
 * Horizontal pill nav: inactive = white pill + thin light-blue border + bold dark text;
 * active = solid blue + white text + soft shadow (reference “Expression” pill style, blue).
 */
const pillInactive =
  'border border-sky-200 bg-white text-gray-900 font-bold text-sm rounded-full px-4 py-2.5 whitespace-nowrap ' +
  'shadow-sm shadow-sky-900/5 transition-all duration-200 hover:border-sky-300 hover:bg-sky-50/80 hover:shadow-md';

const pillActive =
  'border border-blue-600 bg-blue-600 text-white font-bold text-sm rounded-full px-4 py-2.5 whitespace-nowrap ' +
  'shadow-md shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:border-blue-700';

const strip = 'sticky top-0 z-20 bg-white/98 backdrop-blur-sm border-b border-sky-100';

const PageAnchorNav: React.FC<PageAnchorNavProps> = ({
  items,
  ariaLabel = 'Jump to section',
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = useCallback((id: string) => {
    scrollToId(id);
    setActiveId(id);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && items.some((i) => i.id === hash)) {
      setActiveId(hash);
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;

    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(item.id);
            }
          });
        },
        {
          root: null,
          rootMargin: '-42% 0px -48% 0px',
          threshold: [0, 0.1, 0.25],
        }
      );

      io.observe(el);
      observers.push(io);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={strip} role="navigation" aria-label={ariaLabel}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin [scrollbar-width:thin]">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex-shrink-0 font-sans tracking-tight ${isActive ? pillActive : pillInactive}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageAnchorNav;
