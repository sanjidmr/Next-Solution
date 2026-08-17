import { NextRequest, NextResponse } from "next/server";
import { getServerClient, getAdminClient, isSupabaseConfigured } from "@/services/database";
import { productRepository } from "@/repositories/productRepository";

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 503 }
      );
    }
    const supabase = await getServerClient();
    const products = await productRepository.getAll(supabase);
    return NextResponse.json({ data: products });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase environment variables not configured." },
        { status: 503 }
      );
    }
    const body = await req.json();
    const { titleEn, titleBn, slug, descriptionEn, descriptionBn, price, cost, category, subcategory, stock, sold, status, image, images } = body;

    if (!titleEn || !slug) {
      return NextResponse.json(
        { error: "titleEn and slug are required fields." },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    const createdProduct = await productRepository.create(
      supabase,
      {
        titleEn,
        titleBn,
        slug,
        descriptionEn,
        descriptionBn,
        price: typeof price === "number" ? price : parseFloat(price || "0"),
        cost: typeof cost === "number" ? cost : parseFloat(cost || "0"),
        category,
        subcategory,
        stock: typeof stock === "number" ? stock : parseInt(stock || "0", 10),
        sold: typeof sold === "number" ? sold : parseInt(sold || "0", 10),
        status: status || "published",
        image,
      },
      images || []
    );

    return NextResponse.json({ data: createdProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product." },
      { status: 500 }
    );
  }
}
