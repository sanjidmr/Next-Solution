import { SupabaseClient } from "@supabase/supabase-js";
import { ContactMessage, Subscriber } from "@/types";
import { mapContactMessage, mapSubscriber } from "@/lib/mappers";

export const contactRepository = {
  async getMessages(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapContactMessage.fromDb);
  },

  async addMessage(supabase: SupabaseClient, msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) {
    const dbRow = mapContactMessage.toDb({
      id: crypto.randomUUID(),
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message,
      service: msg.service,
      budget: msg.budget,
      status: "unread",
      createdAt: new Date().toISOString()
    });

    const { data, error } = await supabase
      .from("contact_messages")
      .insert(dbRow)
      .select()
      .single();

    if (error) throw error;
    return mapContactMessage.fromDb(data);
  },

  async updateMessageStatus(supabase: SupabaseClient, id: string, status: 'unread' | 'read' | 'replied') {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
  },

  async deleteMessage(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("contact_messages")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  },

  async getSubscribers(supabase: SupabaseClient) {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .is("deleted_at", null);

    if (error) throw error;
    return (data || []).map(mapSubscriber.fromDb);
  },

  async addSubscriber(supabase: SupabaseClient, email: string) {
    const dbRow = mapSubscriber.toDb({
      id: crypto.randomUUID(),
      email,
      createdAt: new Date().toISOString()
    });

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert(dbRow);

    if (error) {
      if (error.code === "23505") { // Unique key constraint conflict
        return false;
      }
      throw error;
    }
    return true;
  },

  async deleteSubscriber(supabase: SupabaseClient, id: string) {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw error;
  }
};
