import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Public contact form submission. Server-only (service-role client).
 * Writes the message into the contact_messages table so it appears in the
 * admin panel's Messages tab.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const service = String(body.service || "").trim();
    const budget = String(body.budget || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
        service,
        budget,
        status: "unread",
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to send message." },
      { status: 500 }
    );
  }
}