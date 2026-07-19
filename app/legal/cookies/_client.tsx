"use client";

import LegalDocPage from '@/components/LegalDocPage';
import { usePage } from '@/hooks/usePage';

export default function CookiesClient() {
  const { currentLang, setTab } = usePage();
  return <LegalDocPage currentLang={currentLang} policyType="cookie_policy" setTab={setTab} />;
}
