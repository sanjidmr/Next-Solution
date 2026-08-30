import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Admin image upload. Accepts multipart/form-data with a `file` (and optional
 * `folder`), pushes it into the public `portfolio-images` storage bucket and
 * returns the public URL. Server-only (service-role client).
 */
export const runtime = "nodejs";

const ALLOWED_EXT = ["png", "jpg", "jpeg", "webp", "gif", "svg", "avif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10MB)." },
        { status: 400 }
      );
    }

    const folder = (formData.get("folder") as string) || "projects";
    const ext = normalizeExt(file.name.split(".").pop());
    const path = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    const supabase = createAdminClient();

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(path, bytes, {
        contentType: file.type || `image/${ext}`,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path);

    return NextResponse.json({ data: { url: data.publicUrl } });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Upload failed." },
      { status: 500 }
    );
  }
}

function normalizeExt(ext?: string): string {
  const clean = (ext || "png").toLowerCase();
  return ALLOWED_EXT.includes(clean) ? clean : "png";
}