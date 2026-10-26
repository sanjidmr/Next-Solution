"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPublicEnv } from "@/lib/env";

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
}

export async function signIn(formData: FormData): Promise<{ success: true } | { error: string }> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: "Invalid email or password." };

  const admin = createAdminClient();
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("role, is_active, deleted_at")
    .eq("id", data.user.id)
    .maybeSingle();

  const isStaff =
    !profileError &&
    profile &&
    ["super_admin", "admin", "editor"].includes(profile.role) &&
    profile.is_active !== false &&
    !profile.deleted_at;

  if (!isStaff) {
    await supabase.auth.signOut();
    return { error: "This account is not authorized to access the admin panel." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnv();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: new URL("/auth/callback", NEXT_PUBLIC_SITE_URL).toString(),
    },
  });

  if (error) throw new Error(error.message);
  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/admin/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnv();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: new URL("/auth/reset-password", NEXT_PUBLIC_SITE_URL).toString(),
  });

  if (error) throw new Error(error.message);
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);

  redirect("/admin");
}
