"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FloatingContact from '@/components/FloatingContact';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useLang } from '@/providers/LangProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { getPathForTab, NavTabId } from '@/config/navigation';

interface ShellLayoutProps {
  children: React.ReactNode;
}

export default function ShellLayout({ children }: ShellLayoutProps) {
  const router = useRouter();
  const { currentLang, setCurrentLang } = useLang();
  const { isDark, toggleTheme } = useTheme();

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
