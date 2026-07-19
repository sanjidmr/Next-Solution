import { SupabaseClient } from "@supabase/supabase-js";
import { SiteSettings } from "@/types";
import { mapSiteSettings } from "@/lib/mappers";

export const settingsRepository = {
  async getSettings(supabase: SupabaseClient): Promise<SiteSettings> {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .is("deleted_at", null)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    
    if (!data) {
      throw new Error("Site settings not configured in database.");
    }
    
    return mapSiteSettings.fromDb(data);
  },

  async saveSettings(supabase: SupabaseClient, settings: SiteSettings) {
    const dbRow = mapSiteSettings.toDb(settings);
    const { error } = await supabase
      .from("site_settings")
      .upsert(dbRow);

    if (error) throw error;
  }
};
