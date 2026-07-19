"use client";

import { useLang } from '@/providers/LangProvider';
import { useRouter } from 'next/navigation';
import { getPathForTab, NavTabId } from '@/config/navigation';

/**
 * Convenience hook for page components.
 * Returns currentLang and a setTab helper that navigates via Next.js router.
 */
export function usePage() {
  const { currentLang, setCurrentLang } = useLang();
  const router = useRouter();

  const setTab = (tab: string) => {
    const path = getPathForTab(tab as NavTabId);
    if (path) router.push(path);
  };

  return { currentLang, setCurrentLang, setTab };
}
