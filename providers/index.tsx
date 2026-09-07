"use client";

import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LangProvider } from '@/providers/LangProvider';
import { ContentSyncProvider } from '@/providers/ContentSyncProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <ContentSyncProvider>{children}</ContentSyncProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
