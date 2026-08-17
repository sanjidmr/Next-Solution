"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
}

export default function Navbar({
  currentLang,
  setLang,
  isDark,
  toggleTheme,
  currentTab,
  setTab,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang];

  // Resolve active tab based on actual Next.js route path
  const activeTab = Object.keys(navTabPaths).find(
    (key) => navTabPaths[key as keyof typeof navTabPaths] === pathname
  ) || currentTab || 'home';

  const navItems: { id: string; label: string; highlight?: boolean }[] = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices },
    { id: 'portfolio', label: t.navPortfolio },
    { id: 'pricing', label: t.navPricing },
    { id: 'blogs', label: t.navBlogs },
    { id: 'faq', label: t.navFAQ },
    { id: 'reviews', label: t.navReviews },
    { id: 'contact', label: t.navContact },
  ];

  const handleTabClick = (tabId: string) => {
    if (setTab) {
      setTab(tabId);
    }
    setIsOpen(false);
    const path = getPathForTab(tabId as any);
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-navbar" className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-[#0A0A0A]/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleTabClick('home')}
            className="flex cursor-pointer items-center space-x-2 transition duration-200 hover:opacity-90"
          >
            <img src={isDark ? "/logow.png" : "/logo.png"} alt="Next Solution" className="h-11 w-auto max-h-11 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav id="nav-desktop-links" className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? item.highlight
                      ? 'bg-orange-600 text-white'
                      : 'text-orange-600 bg-orange-500/10 dark:bg-orange-500/15'
                    : item.highlight
                      ? 'text-orange-600 hover:bg-orange-50 border border-orange-200/50 dark:border-orange-500/30 dark:hover:bg-orange-500/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>


          {/* Utilities (Dark Mode Toggle, CTA) */}
          <div id="nav-utilities" className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-orange-500 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-orange-500 dark:hover:text-orange-400"
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
            <button
              id="navbar-cta-btn"
              onClick={() => handleTabClick('contact')}
              className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-xs font-bold transition duration-200 shadow-sm"
            >
              {t.btnFreeQuote}
            </button>
          </div>

          {/* Mobile menu button */}
          <div id="nav-mobile-controls" className="flex items-center space-x-2 lg:hidden">
            {/* Dark Mode Toggle for mobile */}
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors active:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:active:bg-neutral-800"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Hamburger Icon */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors duration-200 dark:text-neutral-200 dark:hover:bg-white/5"
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
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg overflow-hidden shadow-xl dark:border-neutral-800 dark:bg-[#0D0D0D]/95"
          >
            <div className="space-y-1 px-4 py-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleTabClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition flex items-center justify-between min-h-[48px] ${
                    activeTab === item.id
                      ? item.highlight
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400'
                      : 'text-gray-600 hover:bg-gray-50/80 active:bg-gray-100/50 dark:text-neutral-300 dark:hover:bg-white/5 dark:active:bg-white/10'
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
                </motion.button>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-2 dark:border-neutral-800">
                <button
                  id="mobile-cta-btn"
                  onClick={() => handleTabClick('contact')}
                  className="w-full rounded-xl bg-orange-600 py-3 text-center text-sm font-bold text-white hover:bg-orange-700 active:bg-orange-800 transition shadow-md min-h-[48px]"
                >
                  {t.btnFreeQuote}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
