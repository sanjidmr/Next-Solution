"use client";

import React, { createContext, useContext, useState } from 'react';

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

/**
 * Next Solution is an English-only brand site.
 * currentLang is pinned to 'en' so no Bangla content is ever rendered.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [currentLang] = useState<Lang>('en');

  return (
    <LangContext.Provider
      value={{
        currentLang,
        setCurrentLang: () => {},
        toggleLang: () => {},
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
