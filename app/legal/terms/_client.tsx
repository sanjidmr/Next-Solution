"use client";

import LegalDocPage from '@/components/LegalDocPage';
import { usePage } from '@/hooks/usePage';

export default function TermsClient() {
  const { currentLang, setTab } = usePage();
  return <LegalDocPage currentLang={currentLang} policyType="terms_conditions" setTab={setTab} />;
}
