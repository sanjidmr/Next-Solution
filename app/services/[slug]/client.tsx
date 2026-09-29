"use client";

import ServicesSection from "@/components/ServicesSection";
import { usePage } from "@/hooks/usePage";

interface ServicesSlugClientProps {
  slug: string;
}

export default function ServicesSlugClient({ slug }: ServicesSlugClientProps) {
  const { currentLang, setTab } = usePage();
  return (
    <ServicesSection
      currentLang={currentLang}
      setTab={setTab}
      isFullPage
      initialServiceSlug={slug}
    />
  );
}