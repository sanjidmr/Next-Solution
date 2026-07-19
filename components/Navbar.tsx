"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/data/translations';
import { getPathForTab, navTabPaths } from '@/config/navigation';



interface NavbarProps {
  currentLang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  isDark: boolean; // Retained to maintain signature compatibility
  toggleTheme: () => void; // Retained to maintain signature compatibility
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({
  currentLang,
  setLang,
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
    <header id="app-navbar" className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => handleTabClick('home')}
            className="flex cursor-pointer items-center space-x-2 transition duration-200 hover:opacity-90"
          >
            <img src="/logo.jpg" alt="Next Solution" className="h-12 w-auto rounded-lg" />
            <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:inline">Next Solution</span>
          </div>

          {/* Desktop Navigation */}
          <nav id="nav-desktop-links" className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === item.id
                    ? item.highlight
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 bg-blue-50/50'
                    : item.highlight
                      ? 'text-blue-600 hover:bg-blue-50 border border-blue-200/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>


          {/* Utilities (Lang Switcher, CTA) */}
          <div id="nav-utilities" className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5">
              <button
                id="lang-btn-en"
                onClick={() => setLang('en')}
                className={`flex h-6 items-center space-x-1 rounded-md px-2 text-[10px] font-bold tracking-wide transition-all ${currentLang === 'en'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                <Globe className="h-3 w-3" />
                <span>EN</span>
              </button>
              <button
                id="lang-btn-bn"
                onClick={() => setLang('bn')}
                className={`rounded-md px-2 h-6 text-[10px] font-bold transition-all ${currentLang === 'bn'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                বাংলা
              </button>
            </div>

            {/* CTA Button */}
            <button
              id="navbar-cta-btn"
              onClick={() => handleTabClick('contact')}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold transition duration-200 shadow-sm"
            >
              {t.btnFreeQuote}
            </button>
          </div>

          {/* Mobile menu button */}
          <div id="nav-mobile-controls" className="flex items-center space-x-2 lg:hidden">
            {/* Lang Switch Toggle for mobile */}
            <button
              id="mobile-lang-switch"
              onClick={() => setLang(currentLang === 'en' ? 'bn' : 'en')}
              className="flex h-9 items-center space-x-1 rounded-lg border border-gray-200 px-3 text-xs font-bold text-gray-600 active:bg-gray-50 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{currentLang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Hamburger Icon */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors duration-200"
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
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg overflow-hidden shadow-xl"
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
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold transition flex items-center justify-between min-h-[48px] ${activeTab === item.id
                      ? item.highlight
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50/80 active:bg-gray-100/50'
                    }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="h-1.5 w-1.5 rounded-full bg-blue-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <button
                  id="mobile-cta-btn"
                  onClick={() => handleTabClick('contact')}
                  className="w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 active:bg-blue-800 transition shadow-md min-h-[48px]"
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
