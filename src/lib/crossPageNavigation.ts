import type { NavigateFunction } from 'react-router-dom';
import {
  categoryForGuideSection,
  elementalGalleryPath,
  guideCategoryPath,
  guideSlugFromQuickNavId,
  isGallerySectionId,
} from '@/lib/guideCategoryRoutes';
import { isDetachedRouteBlockedInEntry } from '@/lib/launchConfig';

/**
 * Handles nav targets that no longer live on the home scroll (gallery + guide hubs).
 * Returns true if navigation was handled (caller should not scroll on home).
 */
export function navigateToDetachedSection(navigate: NavigateFunction, section: string): boolean {
  if (isDetachedRouteBlockedInEntry(section)) {
    navigate('/');
    return true;
  }

  if (section === 'community') {
    navigate('/community-forum');
    return true;
  }

  /** Color Tools page — camera and wardrobe analyzers. */
  if (section === 'color-tools') {
    navigate('/color-tools');
    return true;
  }

  if (section === 'analyzer' || section === 'wardrobe') {
    navigate(`/color-tools#${section}`);
    return true;
  }

  if (section === 'color-wheel') {
    navigate(elementalGalleryPath('color-wheel'));
    return true;
  }

  if (section === 'color-palette') {
    navigate(elementalGalleryPath('color-palette'));
    return true;
  }

  if (section === 'types' || section === 'elemental-types') {
    navigate('/elemental-types');
    return true;
  }

  if (section === 'elemental-workshop') {
    navigate('/elemental-color-workshop');
    return true;
  }

  if (section === 'elemental-gallery') {
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('elemental-gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return true;
  }
  if (isGallerySectionId(section)) {
    navigate(elementalGalleryPath(section));
    return true;
  }
  const pillarSlug = guideSlugFromQuickNavId(section);
  if (pillarSlug) {
    navigate(guideCategoryPath(pillarSlug));
    return true;
  }
  const guideCat = categoryForGuideSection(section);
  if (guideCat) {
    navigate(guideCategoryPath(guideCat, section));
    return true;
  }
  return false;
}
