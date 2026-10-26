import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPublicEnv } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnv();
  const siteUrl = new URL(NEXT_PUBLIC_SITE_URL);
  const code = searchParams.get("code");
  const candidate = searchParams.get("next") ?? "/admin";
  const next = candidate.startsWith("/") && !candidate.startsWith("//") && !candidate.includes("\\")
    ? candidate
    : "/admin";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, siteUrl));
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth_failed", siteUrl));
}
