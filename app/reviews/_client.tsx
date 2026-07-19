"use client";

import TestimonialsPage from '@/components/TestimonialsPage';
import { usePage } from '@/hooks/usePage';

export default function ReviewsClient() {
  const { currentLang, setTab } = usePage();
  return <TestimonialsPage currentLang={currentLang} setTab={setTab} />;
}
