"use client";

import PortfolioSection from '@/components/PortfolioSection';
import { usePage } from '@/hooks/usePage';
import { PortfolioItem } from '@/types';

interface PortfolioClientProps {
  portfolioData?: PortfolioItem[];
}

export default function PortfolioClient({ portfolioData }: PortfolioClientProps) {
  const { currentLang, setTab } = usePage();
  return <PortfolioSection currentLang={currentLang} setTab={setTab} isFullPage portfolioData={portfolioData} />;
}
