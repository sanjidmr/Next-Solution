"use client";

import LegalDocPage from '@/components/LegalDocPage';
import { usePage } from '@/hooks/usePage';

export default function PrivacyClient() {
  const { currentLang, setTab } = usePage();
  return <LegalDocPage currentLang={currentLang} policyType="privacy_policy" setTab={setTab} />;
}
