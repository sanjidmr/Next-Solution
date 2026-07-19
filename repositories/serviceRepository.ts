import { SupabaseClient } from "@supabase/supabase-js";
import { Service } from "@/types";
import { mapService } from "@/lib/mappers";

export const serviceRepository = {
  async getAll(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapService.fromDb);
  },

  async getPublished(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapService.fromDb);
  },

  async save(supabase: SupabaseClient, service: Service) {
    const dbRow = mapService.toDb(service);
    const { error } = await supabase
      .from("services")
      .upsert(dbRow);

    if (error) throw error;
  },

  async delete(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("services")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
