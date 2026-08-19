"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FloatingContact from '@/components/FloatingContact';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLang } from '@/providers/LangProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { getPathForTab, NavTabId, publicNavPaths } from '@/config/navigation';

interface ShellLayoutProps {
  children: React.ReactNode;
}

export default function ShellLayout({ children }: ShellLayoutProps) {
  const router = useRouter();
  const { currentLang, setCurrentLang } = useLang();
  const { isDark, toggleTheme } = useTheme();

  // Prefetch all public routes on mount for instant client-side navigation
  useEffect(() => {
    publicNavPaths.forEach((path) => router.prefetch(path));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTab = (tab: string) => {
    const path = getPathForTab(tab as NavTabId);
    if (path) router.push(path);
  };

  const handleOpenPrivacyPolicy = () => {
    router.push('/legal/privacy-policy');
  };

  return (
    <>
      <Navbar
        currentLang={currentLang}
        setLang={setCurrentLang}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentTab=""
        setTab={setTab}
      />
      <main className="min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      <Footer
        currentLang={currentLang}
        setTab={setTab}
      />
      <CookieConsent
        currentLang={currentLang}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />
      <FloatingContact currentLang={currentLang} />
    </>
  );
}
