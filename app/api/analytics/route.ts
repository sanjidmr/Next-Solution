import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const pageViewSchema = z.object({
  path: z.string().trim().min(1).max(500).regex(/^\/(?!\/)/),
});

export async function POST(request: NextRequest) {
  const parsed = pageViewSchema.safeParse(await request.json().catch(() => null));
  if (
    !parsed.success ||
    parsed.data.path.startsWith("/admin") ||
    parsed.data.path.startsWith("/api")
  ) {
    return NextResponse.json({ error: "Invalid page view." }, { status: 400 });
  }

  const existingVisitorId = request.cookies.get("ns_visitor")?.value;
  const parsedVisitorId = z.string().uuid().safeParse(existingVisitorId);
  const visitorId = parsedVisitorId.success
    ? parsedVisitorId.data
    : crypto.randomUUID();

  const supabase = await createClient();
  const { error } = await supabase.from("site_page_views").insert({
    visitor_id: visitorId,
    page_path: parsed.data.path,
  });
  if (error) {
    console.error("Page view could not be recorded.", error);
    return NextResponse.json(
      { error: "Analytics are not available." },
      { status: 503 },
    );
  }

  const response = new NextResponse(null, { status: 204 });
  if (visitorId !== existingVisitorId) {
    response.cookies.set("ns_visitor", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}

export async function GET() {
  const denied = await requireStaff();
  if (denied) {
    return NextResponse.json({ error: denied.error }, { status: denied.status });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("website_analytics");
  if (error) {
    console.error("Website analytics could not be loaded.", error);
    return NextResponse.json(
      { error: "Analytics could not be loaded." },
      { status: 503 },
    );
  }
  return NextResponse.json({ data });
}
