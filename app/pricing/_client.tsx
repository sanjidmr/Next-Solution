"use client";

import PricingSection from '@/components/PricingSection';
import { usePage } from '@/hooks/usePage';

export default function PricingClient() {
  const { currentLang, setTab } = usePage();
  return <PricingSection currentLang={currentLang} setTab={setTab} isFullPage />;
}
