import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const STAFF_ROLES = ["super_admin", "admin", "editor"];

/**
 * Guards the generic /api/admin/* routes. Returns null when the request has a
 * valid staff session (super_admin / admin / editor, active, not deleted),
 * otherwise returns an error response body + status to short-circuit with.
 * Role is always read from the profiles table (never from JWT metadata).
 */
export async function requireStaff(): Promise<{ error: string; status: number } | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized. Please sign in as an admin.", status: 401 };
  }

  const admin = createAdminClient();
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("role, is_active, deleted_at")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return { error: "Staff profile not found.", status: 403 };
  }

  const isStaff =
    STAFF_ROLES.includes(profile.role) &&
    profile.is_active !== false &&
    !profile.deleted_at;

  if (!isStaff) {
    return { error: "Forbidden. Staff privileges required.", status: 403 };
  }

  return null;
}