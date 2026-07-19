"use client";

import AboutPage from '@/components/AboutPage';
import { usePage } from '@/hooks/usePage';

export default function AboutClient() {
  const { currentLang, setTab } = usePage();
  return <AboutPage currentLang={currentLang} setTab={setTab} />;
}
