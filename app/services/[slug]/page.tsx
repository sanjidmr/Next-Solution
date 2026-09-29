import type { Metadata } from "next";
import ServicesClient from "./client";
import { initialServices } from "@/data/initialData";

/**
 * /services/[slug] — deep-linkable service detail page.
 * The detail view itself lives inside ServicesSection (its `selectedService`
 * state). This route preselects the exact service so every service card can
 * navigate directly to that service's own detail page.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = initialServices.find((s) => s.slug === slug);
  if (!match) return { title: "Service not found" };
  return {
    title: `${match.titleEn} | Next Solution`,
    description:
      match.subtitleEn || match.descriptionEn?.slice(0, 155) || "Explore this service in detail at Next Solution.",
  };
}

export default async function ServicesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ServicesClient slug={slug} />;
}