import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/require-admin";
import { randomUUID } from "node:crypto";

/**
 * Admin image upload. Accepts multipart/form-data with a `file` (and optional
 * `folder`), pushes it into the public `portfolio-images` storage bucket and
 * returns the public URL. Server-only (service-role client).
 */
export const runtime = "nodejs";

const ALLOWED_TYPES: Record<string, string> = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_SIZE = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const denied = await requireStaff();
    if (denied) {
      return NextResponse.json({ error: denied.error }, { status: denied.status });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "Unsupported image type. Upload PNG, JPEG, WebP, GIF, or AVIF." },
        { status: 400 },
      );
    }
    if (file.size === 0 || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 4 MB." },
        { status: 400 }
      );
    }

    const requestedFolder = formData.get("folder");
    const folder =
      typeof requestedFolder === "string" &&
      /^[a-z0-9_-]{1,40}$/i.test(requestedFolder)
        ? requestedFolder
        : "projects";
    const path = `${folder}/${randomUUID()}.${ext}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!hasValidImageSignature(bytes, file.type)) {
      return NextResponse.json(
        { error: "The uploaded file does not match its image type." },
        { status: 400 },
      );
    }
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
  } catch (error) {
    console.error("Admin image upload failed.", error);
    return NextResponse.json(
      { error: "Image upload failed. Please try again." },
      { status: 500 }
    );
  }
}

function hasValidImageSignature(bytes: Buffer, type: string): boolean {
  if (type === "image/png") {
    return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/gif") {
    const signature = bytes.subarray(0, 6).toString("ascii");
    return signature === "GIF87a" || signature === "GIF89a";
  }
  if (type === "image/webp") {
    return bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
      bytes.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return (
    type === "image/avif" &&
    bytes.subarray(4, 8).toString("ascii") === "ftyp" &&
    ["avif", "avis"].includes(bytes.subarray(8, 12).toString("ascii"))
  );
}