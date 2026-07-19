import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getServerEnv } from "@/lib/env";

export async function GET() {
  try {
    const env = getServerEnv();
    const email = env.ADMIN_BOOTSTRAP_EMAIL;
    const password = env.ADMIN_BOOTSTRAP_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Admin bootstrap environment variables are not configured." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if any admin or super_admin already exists
    const { data: existingProfiles, error: countError } = await supabase
      .from("profiles")
      .select("id")
      .in("role", ["super_admin", "admin"]);

    if (countError) {
      return NextResponse.json(
        { error: `Database check failed: ${countError.message}` },
        { status: 500 }
      );
    }

    if (existingProfiles && existingProfiles.length > 0) {
      return NextResponse.json(
        { message: "Bootstrap already executed. Administrators already exist." },
        { status: 200 }
      );
    }

    // Create the super admin user using Admin client
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: "super_admin" },
      user_metadata: { full_name: "Super Administrator" }
    });

    if (authError) {
      return NextResponse.json(
        { error: `Auth creation failed: ${authError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Super admin bootstrapped successfully.",
        userId: authUser.user?.id,
        email: authUser.user?.email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during bootstrap." },
      { status: 500 }
    );
  }
}
