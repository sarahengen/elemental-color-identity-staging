import type { NavigateFunction } from 'react-router-dom';
import { navigateToDetachedSection } from '@/lib/crossPageNavigation';

/** Sections rendered via state flags on the home AppLayout. */
const HOME_STATE_SECTIONS = ['about', 'contact', 'blog', 'book', 'terms', 'privacy', 'corporate', 'admin', 'gift-quiz'] as const;

/**
 * Shared nav handler for routes outside AppLayout (press, forum, elemental-types, etc.).
 */
export function navigateFromDetachedPage(navigate: NavigateFunction, section: string): void {
  if (section === 'types' || section === 'elemental-types') {
    navigate('/elemental-types');
    return;
  }

  if (section === 'color-tools') {
    navigate('/color-tools');
    return;
  }

  if (section === 'elemental-workshop') {
    navigate('/elemental-color-workshop');
    return;
  }

  if (section === 'press') {
    navigate('/press');
    window.setTimeout(() => window.scrollTo(0, 0), 0);
    return;
  }

  if (navigateToDetachedSection(navigate, section)) {
    return;
  }

  if ((HOME_STATE_SECTIONS as readonly string[]).includes(section)) {
    navigate(`/?section=${section}`);
    return;
  }

  if (section === 'home') {
    navigate('/');
    return;
  }

  navigate('/');
  window.setTimeout(() => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}

/** Footer element shortcuts → elemental types page with pre-selected element. */
export function navigateToElementOnTypesPage(navigate: NavigateFunction, elementId: string): void {
  navigate(`/elemental-types?element=${encodeURIComponent(elementId)}`);
}
