import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetails from "./client";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapPortfolioItem } from "@/lib/mappers";

async function getPortfolioItem(slug: string) {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .is("deleted_at", null)
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    const item = mapPortfolioItem.fromDb(data);
    if (item.status === "draft") return null;
    return item;
  } catch (err) {
    console.error("Portfolio detail fetch failed:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return { title: "Project not found" };
  return {
    title: `${item.titleEn} | Next Solution MYM`,
    description: item.seoDescEn || item.descriptionEn?.slice(0, 155) || "",
  };
}

export default async function PortfolioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return notFound();
  return <PortfolioDetails item={item} />;
}