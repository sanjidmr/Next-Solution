import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

/**
 * Public contact form submission. Server-only (anonymous client; RLS grants
 * anonymous INSERT vi the "Anyone can submit contact messages" policy).
 * Writes the message into the contact_messages table so it appears in the
 * admin panel's Messages tab.
 */
export const runtime = "nodejs";

const contactSubmissionSchema = z.object({
  submissionId: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().max(180).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  service: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(120).optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 },
      );
    }
    const { submissionId, ...message } = parsed.data;

    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert([
      {
        id: submissionId || crypto.randomUUID(),
        ...message,
        status: "unread",
      },
    ]);

    if (error?.code === "23505" && submissionId) {
      return NextResponse.json({ success: true, duplicate: true });
    }
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact message could not be saved.", error);
    return NextResponse.json(
      { error: "We couldn't save your message. Please try again later." },
      { status: 500 },
    );
  }
}