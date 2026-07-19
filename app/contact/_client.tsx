"use client";

import ContactSection from '@/components/ContactSection';
import { usePage } from '@/hooks/usePage';

export default function ContactClient() {
  const { currentLang } = usePage();
  return <ContactSection currentLang={currentLang} isFullPage />;
}
