"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'bn';

interface LangContextValue {
  currentLang: Lang;
  setCurrentLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({
  currentLang: 'en',
  setCurrentLang: () => {},
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'bn') {
      setCurrentLang(saved);
    }
  }, []);

  const handleSetLang = (lang: Lang) => {
    setCurrentLang(lang);
    localStorage.setItem('lang', lang);
  };

  const toggleLang = () => {
    handleSetLang(currentLang === 'en' ? 'bn' : 'en');
  };

  return (
    <LangContext.Provider value={{ currentLang, setCurrentLang: handleSetLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
