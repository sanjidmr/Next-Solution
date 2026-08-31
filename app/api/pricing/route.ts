import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  mapProjectPricing,
  mapMonthlyPricing,
  mapAgencyPackage,
} from "@/lib/mappers";

export const runtime = "nodejs";

/**
 * Public pricing data for the /pricing page. Uses the anon server client so
 * RLS only returns enabled (published), non-deleted rows.
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const [projectRes, monthlyRes, agencyRes] = await Promise.all([
      supabase
        .from("project_pricing")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("monthly_pricing")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("agency_packages")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);

    const hasError = projectRes.error || monthlyRes.error || agencyRes.error;
    if (hasError) {
      const message =
        (projectRes.error || monthlyRes.error || agencyRes.error)?.message ||
        "Failed to fetch pricing data.";
      throw new Error(message);
    }

    const project = (projectRes.data || []).map((r) => mapProjectPricing.fromDb(r));
    const monthly = (monthlyRes.data || []).map((r) => mapMonthlyPricing.fromDb(r));
    const agency = (agencyRes.data || []).map((r) => mapAgencyPackage.fromDb(r));

    return NextResponse.json({
      project,
      monthly,
      agency,
      configured: project.length > 0 || monthly.length > 0 || agency.length > 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch pricing data." },
      { status: 500 }
    );
  }
}