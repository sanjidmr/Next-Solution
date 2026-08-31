import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Public pricing inquiry submission from the /pricing page. Writes the lead
 * into pricing_quote_requests so it appears in the admin panel (Pricing
 * Management -> Quote Requests). Anon INSERT is allowed via RLS.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const company = String(body.company || "").trim();
    const industry = String(body.industry || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();
    const timeline = String(body.timeline || "").trim();
    const description = String(body.description || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("pricing_quote_requests").insert([
      {
        name,
        email,
        phone: phone || null,
        company: company || null,
        industry: industry || null,
        service: service || null,
        budget: budget || null,
        timeline: timeline || null,
        project_desc: description || null,
        status: "pending",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit your request. Please try again." },
      { status: 500 }
    );
  }
}