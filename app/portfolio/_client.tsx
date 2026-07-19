"use client";

import PortfolioSection from '@/components/PortfolioSection';
import { usePage } from '@/hooks/usePage';

export default function PortfolioClient() {
  const { currentLang, setTab } = usePage();
  return <PortfolioSection currentLang={currentLang} setTab={setTab} isFullPage />;
}
