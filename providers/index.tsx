"use client";

import React from 'react';
import { LangProvider } from '@/providers/LangProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      {children}
    </LangProvider>
  );
}
