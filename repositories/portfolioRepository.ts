import { SupabaseClient } from "@supabase/supabase-js";
import { PortfolioItem } from "@/types";
import { mapPortfolioItem } from "@/lib/mappers";

export const portfolioRepository = {
  async getAll(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapPortfolioItem.fromDb);
  },

  async getPublished(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapPortfolioItem.fromDb);
  },

  async save(supabase: SupabaseClient, item: PortfolioItem) {
    const dbRow = mapPortfolioItem.toDb(item);
    const { error } = await supabase
      .from("portfolio_items")
      .upsert(dbRow);

    if (error) throw error;
  },

  async delete(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("portfolio_items")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
