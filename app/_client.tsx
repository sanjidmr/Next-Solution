"use client";

import Hero from '@/components/Hero';
import HomePageSections from '@/components/HomePageSections';
import { usePage } from '@/hooks/usePage';

export default function HomeClient() {
  const { currentLang, setTab } = usePage();

  return (
    <>
      <Hero currentLang={currentLang} setTab={setTab} />
      <HomePageSections currentLang={currentLang} setTab={setTab} />
    </>
  );
}
