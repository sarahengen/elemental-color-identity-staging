import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DISCOVERY_HUB_LINKS } from '@/data/discoveryHubLinks';

type CompactDiscoveryHubLinksProps = {
  /** If set, that item is omitted (e.g. hide "Famous faces" on gallery page). */
  omitTitles?: string[];
  className?: string;
};

/**
 * Horizontal compact cards: icon, title, tier badge, explore — links to gallery, guides, or home anchors.
 */
const CompactDiscoveryHubLinks: React.FC<CompactDiscoveryHubLinksProps> = ({
  omitTitles = [],
  className = '',
}) => {
  const items = DISCOVERY_HUB_LINKS.filter((l) => !omitTitles.includes(l.title));

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center sm:text-left">
        Workshop picks — explore
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {items.map((link) => (
          <Link
            key={link.title}
            to={link.to}
            className="group relative flex-shrink-0 snap-start w-[148px] sm:w-[160px] rounded-xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-left"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
              style={{
                background: `linear-gradient(90deg, ${link.gradientFrom}, ${link.gradientTo})`,
              }}
            />
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-2 shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${link.gradientFrom}, ${link.gradientTo})`,
              }}
            >
              {link.icon}
            </div>
            <h3 className="text-sm font-serif font-semibold text-gray-900 leading-tight mb-1 pr-6">{link.title}</h3>
            <span
              className="inline-flex items-center gap-0.5 text-xs font-medium"
              style={{ color: link.gradientFrom }}
            >
              Go
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-[9px] font-bold rounded-full uppercase">
              {link.tier}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompactDiscoveryHubLinks;
