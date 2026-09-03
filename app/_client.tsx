"use client";

import Hero from '@/components/Hero';
import StackingHero from '@/components/StackingHero';
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
      <StackingHero theme="dark">
        <Hero currentLang={currentLang} setTab={setTab} />
      </StackingHero>
      <HomePageSections currentLang={currentLang} setTab={setTab} portfolioData={portfolioData} />
    </>
  );
}
