"use client";

import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LangProvider } from '@/providers/LangProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
