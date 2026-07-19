import { SupabaseClient } from "@supabase/supabase-js";
import { FAQ } from "@/types";
import { mapFAQ } from "@/lib/mappers";

export const faqRepository = {
  async getAll(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapFAQ.fromDb);
  },

  async save(supabase: SupabaseClient, faq: FAQ) {
    const dbRow = mapFAQ.toDb(faq);
    const { error } = await supabase
      .from("faqs")
      .upsert(dbRow);

    if (error) throw error;
  },

  async delete(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("faqs")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
