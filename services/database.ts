import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { createClient as createBrowserSupabase } from "@/lib/supabase/client";
import { createAdminClient } from "@/lib/supabase/admin";

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabase>>;

export function getServerClient(): Promise<SupabaseClient> {
  return createServerSupabase();
}

export function getBrowserClient() {
  return createBrowserSupabase();
}

export function getAdminClient() {
  return createAdminClient();
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

export async function getAll<T>(
  table: string,
  options?: QueryOptions,
): Promise<T[]> {
  const supabase = await getServerClient();
  let query = supabase.from(table).select("*");

  if (options?.orderBy) {
    query = query.order(options.orderBy, {
      ascending: options.orderDirection !== "desc",
    });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(
      options.offset,
      options.offset + (options.limit || 10) - 1,
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch ${table}: ${error.message}`);
  return (data || []) as T[];
}

export async function getById<T>(
  table: string,
  id: string,
): Promise<T | null> {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch ${table}: ${error.message}`);
  }
  return data as T;
}

export async function create<T>(
  table: string,
  item: Record<string, unknown>,
): Promise<T> {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from(table)
    .insert(item)
    .select()
    .single();

  if (error) throw new Error(`Failed to create ${table}: ${error.message}`);
  return data as unknown as T;
}

export async function update<T>(
  table: string,
  id: string,
  item: Record<string, unknown>,
): Promise<T> {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from(table)
    .update(item)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update ${table}: ${error.message}`);
  return data as unknown as T;
}

export async function remove(
  table: string,
  id: string,
): Promise<void> {
  const supabase = await getServerClient();
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) throw new Error(`Failed to delete from ${table}: ${error.message}`);
}

export async function softDelete(
  table: string,
  id: string,
): Promise<void> {
  const supabase = await getServerClient();
  const { error } = await supabase
    .from(table)
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`Failed to soft delete from ${table}: ${error.message}`);
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
