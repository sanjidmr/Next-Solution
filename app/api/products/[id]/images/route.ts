import { NextRequest, NextResponse } from "next/server";
import { getAdminClient, isSupabaseConfigured } from "@/services/database";
import { productRepository } from "@/repositories/productRepository";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 503 }
      );
    }
    const body = await req.json();
    const { imageUrls } = body;

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return NextResponse.json(
        { error: "imageUrls must be a non-empty array of image URLs." },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    const newImages = await productRepository.addImages(supabase, id, imageUrls);

    return NextResponse.json({ data: newImages }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add product images." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 503 }
      );
    }
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "imageUrl is required to set main image." },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    await productRepository.setMainImage(supabase, id, imageUrl);

    return NextResponse.json({ success: true, message: "Main image updated successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update main image." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 503 }
      );
    }
    const { searchParams } = new URL(req.url);
    const imageIdOrUrl = searchParams.get("imageId") || searchParams.get("url");

    if (!imageIdOrUrl) {
      return NextResponse.json(
        { error: "imageId or url query parameter is required." },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    await productRepository.deleteImage(supabase, id, imageIdOrUrl);

    return NextResponse.json({ success: true, message: "Product image deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product image." },
      { status: 500 }
    );
  }
}
