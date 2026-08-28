"use client";

import Hero from '@/components/Hero';
import HomePageSections from '@/components/HomePageSections';
import { usePage } from '@/hooks/usePage';
import { PortfolioItem } from '@/types';

interface HomeClientProps {
  portfolioData?: PortfolioItem[];
}

export default function HomeClient({ portfolioData }: HomeClientProps) {
  const { currentLang, setTab } = usePage();

  return (
    <>
      <Hero currentLang={currentLang} setTab={setTab} />
      <HomePageSections currentLang={currentLang} setTab={setTab} portfolioData={portfolioData} />
    </>
  );
}
