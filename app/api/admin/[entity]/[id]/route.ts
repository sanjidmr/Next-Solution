import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/require-admin";

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
  "project-pricing": "project_pricing",
  "monthly-pricing": "monthly_pricing",
  "agency-packages": "agency_packages",
};

const SOFT_DELETE_TABLES = new Set([
  "services",
  "portfolio_items",
  "blog_posts",
  "products",
  "project_pricing",
  "monthly_pricing",
  "agency_packages",
]);

const SINGLETON_TABLES = new Set([
  "site_settings",
  "currency_settings",
  "testimonial_statistics",
  "review_settings",
  "why_choose_us_cta",
  "process_cta",
  "cookie_settings",
]);

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> }
) {
  try {
    const denied = await requireStaff();
    if (denied) {
      return NextResponse.json({ error: denied.error }, { status: denied.status });
    }

    const { entity, id } = await params;
    const tableName = TABLE_MAP[entity];
    if (!tableName) {
      return NextResponse.json({ error: `Unknown entity: ${entity}` }, { status: 404 });
    }

    const supabase = createAdminClient();
    const body = await request.json();

    const { error } = await supabase
      .from(tableName)
      .update(body)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> }
) {
  try {
    const denied = await requireStaff();
    if (denied) {
      return NextResponse.json({ error: denied.error }, { status: denied.status });
    }

    const { entity, id } = await params;
    const tableName = TABLE_MAP[entity];
    if (!tableName) {
      return NextResponse.json({ error: `Unknown entity: ${entity}` }, { status: 404 });
    }

    if (SINGLETON_TABLES.has(tableName)) {
      return NextResponse.json(
        { error: "Cannot delete singleton settings" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    if (SOFT_DELETE_TABLES.has(tableName)) {
      const { error } = await supabase
        .from(tableName)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq("id", id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete" },
      { status: 500 }
    );
  }
}
