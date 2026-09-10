"use client";

import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LangProvider } from '@/providers/LangProvider';
import { ContentSyncProvider } from '@/providers/ContentSyncProvider';
import PageTransitionProvider from '@/providers/PageTransitionProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <ContentSyncProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </ContentSyncProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
