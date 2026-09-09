import type { ReactNode } from 'react';
import {
  GitCompare,
  Users,
  Scissors,
  Home,
  Gem,
  Palette,
  Droplets,
} from 'lucide-react';
import { elementalGalleryPath, guideCategoryPath } from '@/lib/guideCategoryRoutes';

export type DiscoveryHubTier = 'workshop';

export type DiscoveryHubLinkItem = {
  title: string;
  to: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  tier: DiscoveryHubTier;
};

/** Compact cross-links for gallery & guide pages (Workshop experiences). */
export const DISCOVERY_HUB_LINKS: DiscoveryHubLinkItem[] = [
  {
    title: 'Compare types',
    to: elementalGalleryPath('compare'),
    icon: <GitCompare className="w-4 h-4" />,
    gradientFrom: '#6366f1',
    gradientTo: '#8b5cf6',
    tier: 'workshop',
  },
  {
    title: 'Famous faces',
    to: elementalGalleryPath('celebrities'),
    icon: <Users className="w-4 h-4" />,
    gradientFrom: '#f43f5e',
    gradientTo: '#a855f7',
    tier: 'workshop',
  },
  {
    title: 'Hair color',
    to: guideCategoryPath('style', 'hair-color'),
    icon: <Scissors className="w-4 h-4" />,
    gradientFrom: '#f59e0b',
    gradientTo: '#ec4899',
    tier: 'workshop',
  },
  {
    title: 'Environment',
    to: guideCategoryPath('living', 'decor'),
    icon: <Home className="w-4 h-4" />,
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    tier: 'workshop',
  },
  {
    title: 'Jewelry',
    to: guideCategoryPath('style', 'jewelry'),
    icon: <Gem className="w-4 h-4" />,
    gradientFrom: '#ec4899',
    gradientTo: '#f59e0b',
    tier: 'workshop',
  },
  {
    title: 'Make-up',
    to: '/#pro-guides',
    icon: <Palette className="w-4 h-4" />,
    gradientFrom: '#d946ef',
    gradientTo: '#f43f5e',
    tier: 'workshop',
  },
  {
    title: 'Nail color',
    to: '/#pro-guides',
    icon: <Droplets className="w-4 h-4" />,
    gradientFrom: '#f472b6',
    gradientTo: '#c084fc',
    tier: 'workshop',
  },
];
