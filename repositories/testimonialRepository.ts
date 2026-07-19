import { SupabaseClient } from "@supabase/supabase-js";
import { Testimonial } from "@/types";
import { mapTestimonial } from "@/lib/mappers";

export const testimonialRepository = {
  async getAll(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapTestimonial.fromDb);
  },

  async getApproved(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "approved")
      .order("sort_order", { ascending: true })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapTestimonial.fromDb);
  },

  async save(supabase: SupabaseClient, testimonial: Testimonial) {
    const dbRow = mapTestimonial.toDb(testimonial);
    const { error } = await supabase
      .from("testimonials")
      .upsert(dbRow);

    if (error) throw error;
  },

  async delete(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("testimonials")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
