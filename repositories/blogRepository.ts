import { SupabaseClient } from "@supabase/supabase-js";
import { BlogPost } from "@/types";
import { mapBlogPost } from "@/lib/mappers";

export const blogRepository = {
  async getAll(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapBlogPost.fromDb);
  },

  async getPublished(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapBlogPost.fromDb);
  },

  async save(supabase: SupabaseClient, post: BlogPost) {
    const dbRow = mapBlogPost.toDb(post);
    const { error } = await supabase
      .from("blog_posts")
      .upsert(dbRow);

    if (error) throw error;
  },

  async delete(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
