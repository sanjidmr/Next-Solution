"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getServerEnv } from "@/lib/env";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

// HttpOnly=false so the AdminPanel client can detect the session and skip the
// redundant in-panel passcode gate. The /admin route itself is still guarded
// server-side in middleware by checking this cookie.

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

export async function signIn(formData: FormData) {
  const env = getServerEnv();
  const adminEmail = env.ADMIN_BOOTSTRAP_EMAIL;
  const adminPassword = env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Admin credentials are not configured on this server.");
  }

  const inputEmail = ((formData.get("email") as string) || "").trim().toLowerCase();
  const inputPassword = (formData.get("password") as string) || "";

  if (inputEmail !== adminEmail.trim().toLowerCase() || inputPassword !== adminPassword) {
    throw new Error("Invalid login credentials.");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin =
    (await headers()).get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) throw new Error(error.message);
  if (data.url) redirect(data.url);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const origin =
    (await headers()).get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
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
