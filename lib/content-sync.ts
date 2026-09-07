/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";
import { serviceRepository } from "@/repositories/serviceRepository";
import { portfolioRepository } from "@/repositories/portfolioRepository";
import { blogRepository } from "@/repositories/blogRepository";
import { faqRepository } from "@/repositories/faqRepository";
import { testimonialRepository } from "@/repositories/testimonialRepository";
import { KEYS, setLocalData } from "@/lib/db";
import {
  mapClientLogo,
  mapClientMoment,
  mapSuccessStory,
  mapReviewSettings,
  mapTestimonialVideo,
  mapTestimonialStatistics,
  mapWhyChooseUsCard,
  mapWhyChooseUsStat,
  mapWhyChooseUsBadge,
  mapWhyChooseUsTech,
  mapWhyChooseUsCTA,
  mapProcessStep,
  mapProcessCTA,
  mapTechServiceCard,
  mapCurrency,
  mapCurrencySettings,
  mapPricingPackage,
  mapPricingAddon,
  mapPricingComparison,
  mapLegalPolicy,
  mapLegalRevision,
  mapCookieCategory,
  mapCookieSettings,
  mapSiteSettings,
} from "@/lib/mappers";

type Job = {
  key: string;
  label: string;
  run: (supabase: SupabaseClient) => Promise<void>;
};

/**
 * Public content sync.
 *
 * The public pages render through the localStorage-backed getters in @/lib/db
 * (seeded with the static initialData). This module hydrates those localStorage
 * keys from Supabase using the **anonymous / public key only** (never the
 * service-role key). RLS policies restrict every table to the rows the public is
 * allowed to see (published/visible/not-deleted), so drafts and internal rows
 * are never synced.
 *
 * Datasets that already have a repository are fetched through it; the remaining
 * tables are read via a plain anon SELECT and mapped with the existing mappers. No
 * manual status/visibility filters are added here — RLS already enforces them.
 */


async function fetchRows<T>(
  supabase: SupabaseClient,
  table: string,
  mapRow: (row: any) => T,
  predicate?: (query: any) => any,
): Promise<T[]> {
  let query: any = supabase.from(table).select("*");
  if (predicate) query = predicate(query);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((row: any) => mapRow(row));
}

async function listJob<T>(
  supabase: SupabaseClient,
  table: string,
  mapRow: (row: any) => T,
  key: string,
  predicate?: (query: any) => any,
): Promise<void> {
  const rows = await fetchRows(supabase, table, mapRow, predicate);
  // Only hydrate when the DB actually contains data; otherwise the seeded
  // fallback content stays active (graceful degradation; no fake data created).
  if (rows.length > 0) setLocalData(key, rows);
}

async function singleJob<T>(
  supabase: SupabaseClient,
  table: string,
  mapRow: (row: any) => T,
  key: string,
  predicate?: (query: any) => any,
): Promise<void> {
  const rows = await fetchRows(supabase, table, mapRow, predicate);
  if (rows[0]) setLocalData(key, rows[0]);
}
const JOBS: Job[] = [
  // --- Datasets with repositories (ordering/status filtering handled inside) ---
  {
    key: KEYS.SERVICES,
    label: "services",
    run: async (supabase) => {
      const items = await serviceRepository.getPublished(supabase);
      if (items.length > 0) setLocalData(KEYS.SERVICES, items);
    },
  },
  {
    key: KEYS.PORTFOLIO,
    label: "portfolio_items",
    run: async (supabase) => {
      const items = await portfolioRepository.getPublished(supabase);
      if (items.length > 0) setLocalData(KEYS.PORTFOLIO, items);
    },
  },
  {
    key: KEYS.BLOGS,
    label: "blog_posts",
    run: async (supabase) => {
      const items = await blogRepository.getPublished(supabase);
      if (items.length > 0) setLocalData(KEYS.BLOGS, items);
    },
  },
  {
    key: KEYS.FAQS,
    label: "faqs",
    run: async (supabase) => {
      const items = await faqRepository.getAll(supabase);
      if (items.length > 0) setLocalData(KEYS.FAQS, items);
    },
  },
  {
    key: KEYS.TESTIMONIALS,
    label: "testimonials",
    run: async (supabase) => {
      const items = await testimonialRepository.getApproved(supabase);
      if (items.length > 0) setLocalData(KEYS.TESTIMONIALS, items);
    },
  },
  // --- Single-row settings ---
  {
    key: KEYS.SETTINGS,
    label: "site_settings",
    run: (supabase) => singleJob(supabase, "site_settings", mapSiteSettings.fromDb, KEYS.SETTINGS),
  },
  {
    key: KEYS.REVIEW_SETTINGS,
    label: "review_settings",
    run: (supabase) => singleJob(supabase, "review_settings", mapReviewSettings.fromDb, KEYS.REVIEW_SETTINGS),
  },
  {
    key: KEYS.TESTIMONIAL_STATISTICS,
    label: "testimonial_statistics",
    run: (supabase) => singleJob(supabase, "testimonial_statistics", mapTestimonialStatistics.fromDb, KEYS.TESTIMONIAL_STATISTICS),
  },
  {
    key: KEYS.WHY_CHOOSE_US_CTA,
    label: "why_choose_us_cta",
    run: (supabase) => singleJob(supabase, "why_choose_us_cta", mapWhyChooseUsCTA.fromDb, KEYS.WHY_CHOOSE_US_CTA),
  },
  {
    key: KEYS.PROCESS_CTA,
    label: "process_cta",
    run: (supabase) => singleJob(supabase, "process_cta", mapProcessCTA.fromDb, KEYS.PROCESS_CTA),
  },
  {
    key: KEYS.CURRENCY_SETTINGS,
    label: "currency_settings",
    run: (supabase) => singleJob(supabase, "currency_settings", mapCurrencySettings.fromDb, KEYS.CURRENCY_SETTINGS),
  },
  {
    key: KEYS.COOKIE_SETTINGS,
    label: "cookie_settings",
    run: (supabase) => singleJob(supabase, "cookie_settings", mapCookieSettings.fromDb, KEYS.COOKIE_SETTINGS),
  },
  // --- List content ---
  {
    key: KEYS.CLIENT_LOGOS,
    label: "client_logos",
    run: (supabase) => listJob(supabase, "client_logos", mapClientLogo.fromDb, KEYS.CLIENT_LOGOS),
  },
  {
    key: KEYS.CLIENT_MOMENTS,
    label: "client_moments",
    run: (supabase) => listJob(supabase, "client_moments", mapClientMoment.fromDb, KEYS.CLIENT_MOMENTS),
  },
  {
    key: KEYS.SUCCESS_STORIES,
    label: "success_stories",
    run: (supabase) => listJob(supabase, "success_stories", mapSuccessStory.fromDb, KEYS.SUCCESS_STORIES),
  },
  {
    key: KEYS.TESTIMONIAL_VIDEOS,
    label: "testimonial_videos",
    run: (supabase) => listJob(supabase, "testimonial_videos", mapTestimonialVideo.fromDb, KEYS.TESTIMONIAL_VIDEOS),
  },
  {
    key: KEYS.WHY_CHOOSE_US_CARDS,
    label:"why_choose_us_cards",
    run: (supabase) => listJob(supabase, "why_choose_us_cards", mapWhyChooseUsCard.fromDb, KEYS.WHY_CHOOSE_US_CARDS),
  },
  {
    key: KEYS.WHY_CHOOSE_US_STATS,
    label:"why_choose_us_stats",
    run: (supabase) => listJob(supabase, "why_choose_us_stats", mapWhyChooseUsStat.fromDb, KEYS.WHY_CHOOSE_US_STATS),
  },
  {
    key: KEYS.WHY_CHOOSE_US_BADGES,
    label:"why_choose_us_badges",
    run:(supabase) => listJob(supabase, "why_choose_us_badges", mapWhyChooseUsBadge.fromDb, KEYS.WHY_CHOOSE_US_BADGES),
  },
  {
    key: KEYS.WHY_CHOOSE_US_TECHS,
    label:"why_choose_us_techs",
    run:(supabase) => listJob(supabase, "why_choose_us_techs", mapWhyChooseUsTech.fromDb, KEYS.WHY_CHOOSE_US_TECHS),
  },
  {
    key: KEYS.PROCESS_STEPS,
    label:"process_steps",
    run:(supabase) => listJob(supabase, "process_steps", mapProcessStep.fromDb, KEYS.PROCESS_STEPS),
  },
  {
    key: KEYS.TECH_SERVICE_CARDS,
    label:"tech_service_cards",
    run:(supabase) => listJob(supabase, "tech_service_cards", mapTechServiceCard.fromDb, KEYS.TECH_SERVICE_CARDS),
  },
  {
    key: KEYS.CURRENCIES,
    label:"currencies",
    run:(supabase) => listJob(supabase, "currencies", mapCurrency.fromDb, KEYS.CURRENCIES),
  },
  {
    key: KEYS.PRICING_PACKAGES,
    label:"pricing_packages",
    run:(supabase) => listJob(supabase, "pricing_packages", mapPricingPackage.fromDb, KEYS.PRICING_PACKAGES),
  },
  {
    key: KEYS.PRICING_ADDONS,
    label:"pricing_addons",
    run:(supabase) => listJob(supabase, "pricing_addons", mapPricingAddon.fromDb, KEYS.PRICING_ADDONS),
  },
  {
    key: KEYS.PRICING_COMPARISONS,
    label:"pricing_comparisons",
    run:(supabase) => listJob(supabase, "pricing_comparisons", mapPricingComparison.fromDb, KEYS.PRICING_COMPARISONS),
  },
  {
    key: KEYS.LEGAL_POLICIES,
    label:"legal_policies",
    run:(supabase) => listJob(supabase, "legal_policies", mapLegalPolicy.fromDb, KEYS.LEGAL_POLICIES),
  },
  {
    key: KEYS.LEGAL_REVISIONS,
    label:"legal_revisions",
    run:(supabase) => listJob(supabase, "legal_revisions", mapLegalRevision.fromDb, KEYS.LEGAL_REVISIONS),
  },
  {
    key: KEYS.COOKIE_CATEGORIES,
    label:"cookie_categories",
    run:(supabase) => listJob(supabase, "cookie_categories", mapCookieCategory.fromDb, KEYS.COOKIE_CATEGORIES),
  },
];
/**
 * Fetches all public content from Supabase (browser, anon key only) and writes
 * it into the localStorage cache the public getters read。 Returns true when at least
 * one dataset synced successfully, so the caller can refresh the UI。 Failures are
 * logged without any secret values, and the seeded fallback stays active per-dataset.
 */


export async function syncPublicContentFromSupabase(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {

    // Not configured — keep theexisting localStorage/seed behavior。


    return false;
  }


  let supabase: SupabaseClient;


  try {
    supabase = createBrowserSupabaseClient();
  } catch {
    // Missing/invalid env or client construction failure; fallback stays active。


    return false;
  }


  const results = await Promise.allSettled(JOBS.map((job) => job.run(supabase)));


  const failures: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const reason = result.reason as { message?: string } | undefined;
      const label = JOBS[index]?.label ?? String(index);
      failures.push(`${label}: ${reason?.message || "unknown error"}`);
    }
  });


  if (failures.length > 0) {
    console.warn(`[content-sync] ${failures.length} dataset(s) failed to sync (local fallback remains active for those):`, failures.join("; "));
  }


  return results.some((result) => result.status === "fulfilled");
}