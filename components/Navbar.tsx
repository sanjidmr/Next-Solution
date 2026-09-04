"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/data/translations';
import { getPathForTab, navTabPaths } from '@/config/navigation';

interface NavbarProps {
  currentLang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  isDark: boolean;
  toggleTheme: () => void;
  currentTab: string;
  setTab: (tab: string) => void;
  /**
   * Visual lightness of the hero currently under the Navbar.
   * 'dark'  -> hero background is dark  -> Navbar renders light text/icons
   * 'light' -> hero background is light -> Navbar renders dark text/icons
   * When omitted it falls back to the global dark-mode flag.
   */
  theme?: 'dark' | 'light';
}

export default function Navbar({
  currentLang,
  setLang,
  isDark,
  toggleTheme,
  currentTab,
  setTab,
  theme,
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang];

  // The hero theme decides the navbar's text/icon contrast.
  // A dark hero -> light text; a light hero -> dark text.
  // The site's heroes are white in light mode and near-black in dark mode,
  // so over a "dark"-themed hero the navbar matches the actual rendered
  // background (isDark) instead of assuming dark. Only a force-light hero
  // pins the navbar to light contrast.
  const heroIsDark = theme === 'light' ? false : isDark;

  // Frosted background only appears after the user scrolls past the hero,
  // so the navbar floats transparently over the hero composition and only
  // takes on the "secondary" background colour once the hero is covered.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('[data-space-hero]');
      const heroH = hero ? hero.offsetHeight : 0;
      // The hero is considered "passed" once we have scrolled roughly one
      // hero-height (the cover section has slid over it). If no hero is
      // present, fall back to a small nudge.
      setScrolled(window.scrollY > (heroH > 0 ? heroH : 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Resolve active tab based on actual Next.js route path
  const activeTab = Object.keys(navTabPaths).find(
    (key) => navTabPaths[key as keyof typeof navTabPaths] === pathname
  ) || currentTab || 'home';

  const navItems: { id: string; label: string; highlight?: boolean }[] = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'portfolio', label: t.navPortfolio },
    { id: 'contact', label: t.navContact },
  ];

  const handleTabClick = (tabId: string) => {
    if (setTab) {
      setTab(tabId);
    }
    setIsOpen(false);
  };

  // Contrast-aware derived classes
  const headerClass = [
    'sticky top-0 z-50 w-full transition-colors duration-300',
    scrolled
      ? heroIsDark
        ? 'bg-[#0A0A0A]/80 backdrop-blur-md'
        : 'bg-white/80 backdrop-blur-md shadow-sm'
      : 'bg-transparent',
  ].join(' ');

  const utilBtnBase =
    'flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200';
  const utilBtn = heroIsDark
    ? 'border-white/20 bg-white/10 text-white hover:border-orange-400 hover:text-orange-300'
    : 'border-neutral-200 bg-white text-neutral-700 hover:border-orange-500 hover:text-orange-600';

  const hamburgerCls = heroIsDark
    ? 'text-white hover:bg-white/10'
    : 'text-neutral-700 hover:bg-neutral-100';

  const mobileDrawerCls = heroIsDark
    ? 'border-t border-white/10 bg-[#0D0D0D]/95'
    : 'border-t border-gray-100 bg-white/95';

  return (
    <header id="app-navbar" className={headerClass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            id="nav-logo"
            href={getPathForTab('home')}
            onClick={() => handleTabClick('home')}
            className="flex cursor-pointer items-center space-x-2 transition duration-200 hover:opacity-90"
          >
            <img src={heroIsDark ? "/logow.png" : "/logo.png"} alt="Next Solution" className="h-9 w-auto max-h-9 object-contain sm:h-8 max-h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav id="nav-desktop-links" className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => (
              <Link
                id={`nav-link-${item.id}`}
                key={item.id}
                href={getPathForTab(item.id as any)}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  item.highlight
                    ? 'text-orange-600 hover:bg-orange-50 border border-orange-200/50 dark:border-orange-500/30 dark:hover:bg-orange-500/10'
                    : activeTab === item.id
                      ? (heroIsDark
                          ? 'text-orange-400 bg-white/10'
                          : 'text-orange-600 bg-orange-500/10')
                      : (heroIsDark
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5')
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Utilities (Dark Mode Toggle, CTA) */}
          <div id="nav-utilities" className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`${utilBtnBase} ${utilBtn}`}
            >
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.div>
            </button>

            {/* CTA Button */}
            <Link
              id="navbar-cta-btn"
              href={getPathForTab('contact')}
              onClick={() => handleTabClick('contact')}
              className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs font-bold transition duration-200 shadow-sm"
            >
              {t.btnFreeQuote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div id="nav-mobile-controls" className="flex items-center space-x-2 lg:hidden">
            {/* Dark Mode Toggle for mobile */}
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`${utilBtnBase} ${utilBtn} ${heroIsDark ? 'active:bg-white/20' : 'active:bg-neutral-100'}`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Hamburger Icon */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none ${hamburgerCls}`}
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {isOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden border-t backdrop-blur-lg overflow-hidden shadow-xl ${mobileDrawerCls}`}
          >
            <div className="space-y-1 px-4 py-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    id={`mobile-nav-link-${item.id}`}
                    href={getPathForTab(item.id as any)}
                    onClick={() => handleTabClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition flex items-center justify-between min-h-[48px] ${
                      activeTab === item.id
                        ? item.highlight
                          ? 'bg-orange-600 text-white'
                          : heroIsDark
                            ? 'bg-white/10 text-orange-400'
                            : 'bg-orange-500/10 text-orange-600'
                        : heroIsDark
                          ? 'text-white/85 hover:bg-white/10 active:bg-white/15'
                          : 'text-neutral-700 hover:bg-neutral-100/70 active:bg-neutral-200/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="h-1.5 w-1.5 rounded-full bg-orange-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className={`pt-4 border-t mt-2 ${heroIsDark ? 'border-white/10' : 'border-gray-100'}`}>
                <Link
                  id="mobile-cta-btn"
                  href={getPathForTab('contact')}
                  onClick={() => handleTabClick('contact')}
                  className="block w-full rounded-xl bg-orange-600 py-3 text-center text-sm font-bold text-white hover:bg-orange-700 active:bg-orange-800 transition shadow-md min-h-[48px]"
                >
                  {t.btnFreeQuote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
