"use client";

import ServicesSection from '@/components/ServicesSection';
import { usePage } from '@/hooks/usePage';

export default function ServicesClient() {
  const { currentLang, setTab } = usePage();
  return <ServicesSection currentLang={currentLang} setTab={setTab} isFullPage />;
}
