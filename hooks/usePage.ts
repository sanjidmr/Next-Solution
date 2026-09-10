"use client";

import { useLang } from '@/providers/LangProvider';
import { usePageTransition } from '@/providers/PageTransitionProvider';
import { getPathForTab, NavTabId } from '@/config/navigation';

/**
 * Convenience hook for page components.
 * Returns currentLang and a setTab helper that navigates via the cinematic
 * page-transition overlay before completing the route switch.
 */
export function usePage() {
  const { currentLang, setCurrentLang } = useLang();
  const { navigate } = usePageTransition();

  const setTab = (tab: string) => {
    const path = getPathForTab(tab as NavTabId);
    if (path) navigate(path);
  };

  return { currentLang, setCurrentLang, setTab };
}
