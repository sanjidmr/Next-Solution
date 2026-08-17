import { NextRequest, NextResponse } from "next/server";
import { getServerClient, getAdminClient, isSupabaseConfigured } from "@/services/database";
import { productRepository } from "@/repositories/productRepository";

export async function GET(
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
    const supabase = await getServerClient();
    const product = await productRepository.getById(supabase, id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: product });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch product." },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const supabase = getAdminClient();

    const updatedProduct = await productRepository.update(
      supabase,
      id,
      body,
      body.images
    );

    return NextResponse.json({ data: updatedProduct });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update product." },
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
    const supabase = getAdminClient();
    await productRepository.delete(supabase, id);

    return NextResponse.json({ success: true, message: "Product deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete product." },
      { status: 500 }
    );
  }
}
