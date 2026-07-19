"use client";

import BlogSection from '@/components/BlogSection';
import { usePage } from '@/hooks/usePage';

export default function BlogClient() {
  const { currentLang, setTab } = usePage();
  return <BlogSection currentLang={currentLang} setTab={setTab} isFullPage />;
}
