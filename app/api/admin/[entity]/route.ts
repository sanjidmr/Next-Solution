import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  mapService, mapPortfolioItem, mapBlogPost, mapFAQ, mapTestimonial,
  mapContactMessage, mapSubscriber, mapSiteSettings, mapPricingPackage,
  mapPricingAddon, mapPricingComparison, mapPricingQuoteRequest,
  mapCurrency, mapCurrencySettings,
  mapTestimonialVideo, mapTestimonialStatistics, mapClientLogo,
  mapSuccessStory, mapReviewSettings, mapLegalPolicy, mapLegalRevision,
  mapCookieCategory, mapCookieSettings, mapWhyChooseUsCard,
  mapWhyChooseUsStat, mapWhyChooseUsBadge, mapWhyChooseUsTech,
  mapWhyChooseUsCTA, mapProcessStep, mapProcessCTA, mapTechServiceCard,
  mapClientMoment, mapProduct, mapProductImage
} from "@/lib/mappers";

const TABLE_MAP: Record<string, string> = {
  services: "services",
  portfolio: "portfolio_items",
  blogs: "blog_posts",
  faqs: "faqs",
  testimonials: "testimonials",
  messages: "contact_messages",
  subscribers: "newsletter_subscribers",
  settings: "site_settings",
  "pricing-packages": "pricing_packages",
  "pricing-addons": "pricing_addons",
  "pricing-comparisons": "pricing_comparisons",
  "pricing-quotes": "pricing_quote_requests",
  currencies: "currencies",
  "currency-settings": "currency_settings",
  "testimonial-categories": "testimonial_categories",
  "testimonial-videos": "testimonial_videos",
  "testimonial-statistics": "testimonial_statistics",
  "client-logos": "client_logos",
  "success-stories": "success_stories",
  "review-settings": "review_settings",
  "legal-policies": "legal_policies",
  "legal-revisions": "legal_revisions",
  "cookie-categories": "cookie_categories",
  "cookie-settings": "cookie_settings",
  "why-choose-us-cards": "why_choose_us_cards",
  "why-choose-us-stats": "why_choose_us_stats",
  "why-choose-us-badges": "why_choose_us_badges",
  "why-choose-us-techs": "why_choose_us_techs",
  "why-choose-us-cta": "why_choose_us_cta",
  "process-steps": "process_steps",
  "process-cta": "process_cta",
  "tech-service-cards": "tech_service_cards",
  "client-moments": "client_moments",
  products: "products",
  "product-images": "product_images",
};

const SINGLETON_TABLES = new Set([
  "site_settings",
  "currency_settings",
  "testimonial_statistics",
  "review_settings",
  "why_choose_us_cta",
  "process_cta",
  "cookie_settings",
]);

const NO_ORDER_TABLES = new Set([
  "newsletter_subscribers",
  "contact_messages",
  "pricing_quote_requests",
  "legal_revisions",
  "product_images",
  "testimonial_categories",
  "client_moments",
]);

// Map entity slug → mapper.toDb function
const TO_DB_MAP: Record<string, (item: any) => any> = {
  services: (i) => mapService.toDb(i),
  portfolio: (i) => mapPortfolioItem.toDb(i),
  blogs: (i) => mapBlogPost.toDb(i),
  faqs: (i) => mapFAQ.toDb(i),
  testimonials: (i) => mapTestimonial.toDb(i),
  messages: (i) => mapContactMessage.toDb(i),
  subscribers: (i) => mapSubscriber.toDb(i),
  settings: (i) => mapSiteSettings.toDb(i),
  "pricing-packages": (i) => mapPricingPackage.toDb(i),
  "pricing-addons": (i) => mapPricingAddon.toDb(i),
  "pricing-comparisons": (i) => mapPricingComparison.toDb(i),
  "pricing-quotes": (i) => mapPricingQuoteRequest.toDb(i),
  currencies: (i) => mapCurrency.toDb(i),
  "currency-settings": (i) => mapCurrencySettings.toDb(i),
  "testimonial-categories": (i) => ({ id: i.id, name_en: i.nameEn, name_bn: i.nameBn, slug: i.slug }),
  "testimonial-videos": (i) => mapTestimonialVideo.toDb(i),
  "testimonial-statistics": (i) => mapTestimonialStatistics.toDb(i),
  "client-logos": (i) => mapClientLogo.toDb(i),
  "success-stories": (i) => mapSuccessStory.toDb(i),
  "review-settings": (i) => mapReviewSettings.toDb(i),
  "legal-policies": (i) => mapLegalPolicy.toDb(i),
  "legal-revisions": (i) => mapLegalRevision.toDb(i),
  "cookie-categories": (i) => mapCookieCategory.toDb(i),
  "cookie-settings": (i) => mapCookieSettings.toDb(i),
  "why-choose-us-cards": (i) => mapWhyChooseUsCard.toDb(i),
  "why-choose-us-stats": (i) => mapWhyChooseUsStat.toDb(i),
  "why-choose-us-badges": (i) => ({ id: i.id, label_en: i.labelEn || i.textEn, label_bn: i.labelBn || i.textBn, display_order: i.displayOrder || 0, visible: i.visible ?? true }),
  "why-choose-us-techs": (i) => mapWhyChooseUsTech.toDb(i),
  "why-choose-us-cta": (i) => mapWhyChooseUsCTA.toDb(i),
  "process-steps": (i) => mapProcessStep.toDb(i),
  "process-cta": (i) => mapProcessCTA.toDb(i),
  "tech-service-cards": (i) => mapTechServiceCard.toDb(i),
  "client-moments": (i) => mapClientMoment.toDb(i),
  products: (i) => mapProduct.toDb(i),
  "product-images": (i) => mapProductImage.toDb(i),
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const { entity } = await params;
    const tableName = TABLE_MAP[entity];
    if (!tableName) {
      return NextResponse.json({ error: `Unknown entity: ${entity}` }, { status: 404 });
    }

    const supabase = createAdminClient();
    let query = supabase.from(tableName).select("*");

    if (tableName === "services") {
      query = query.is("deleted_at", null).order("sort_order", { ascending: true });
    } else if (tableName === "portfolio_items") {
      query = query.is("deleted_at", null).order("sort_order", { ascending: true });
    } else if (tableName === "blog_posts") {
      query = query.is("deleted_at", null).order("published_at", { ascending: false });
    } else if (tableName === "products") {
      query = query.is("deleted_at", null).order("sort_order", { ascending: true });
    } else if (SINGLETON_TABLES.has(tableName)) {
      query = query.limit(1);
    } else if (tableName === "contact_messages") {
      query = query.order("created_at", { ascending: false });
    } else if (NO_ORDER_TABLES.has(tableName)) {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("display_order", { ascending: true }).order("sort_order", { ascending: true });
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ entity: string }> }
) {
  try {
    const { entity } = await params;
    const tableName = TABLE_MAP[entity];
    if (!tableName) {
      return NextResponse.json({ error: `Unknown entity: ${entity}` }, { status: 404 });
    }

    const toDb = TO_DB_MAP[entity];
    if (!toDb) {
      return NextResponse.json({ error: `No mapper for entity: ${entity}` }, { status: 400 });
    }

    const supabase = createAdminClient();
    const body = await request.json();

    const items = Array.isArray(body) ? body : [body];
    const dbItems = items.map((item) => toDb(item));

    if (SINGLETON_TABLES.has(tableName) && dbItems.length === 1) {
      const { error } = await supabase
        .from(tableName)
        .upsert(dbItems[0], { onConflict: "id" });
      if (error) throw error;
    } else {
      const { error } = await supabase.from(tableName).upsert(dbItems);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save data" },
      { status: 500 }
    );
  }
}
