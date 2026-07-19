"use client";

import FAQSection from '@/components/FAQSection';
import { usePage } from '@/hooks/usePage';

export default function FAQClient() {
  const { currentLang, setTab } = usePage();
  return <FAQSection currentLang={currentLang} setTab={setTab} isFullPage />;
}
