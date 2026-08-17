import { SupabaseClient } from "@supabase/supabase-js";
import { Product, ProductImage } from "@/types";
import { mapProduct, mapProductImage } from "@/lib/mappers";

export const productRepository = {
  /**
   * Retrieves all products along with their associated product_images.
   */
  async getAll(supabase: SupabaseClient): Promise<Product[]> {
    const { data: productsData, error: pError } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (pError) throw pError;
    if (!productsData || productsData.length === 0) return [];

    const productIds = productsData.map((p) => p.id);
    const { data: imagesData } = await supabase
      .from("product_images")
      .select("*")
      .in("product_id", productIds)
      .order("display_order", { ascending: true });

    const imagesByProductId: Record<string, ProductImage[]> = {};
    if (imagesData) {
      imagesData.forEach((imgRow) => {
        const mappedImg = mapProductImage.fromDb(imgRow);
        if (!imagesByProductId[mappedImg.productId]) {
          imagesByProductId[mappedImg.productId] = [];
        }
        imagesByProductId[mappedImg.productId].push(mappedImg);
      });
    }

    return productsData.map((pRow) =>
      mapProduct.fromDb(pRow, imagesByProductId[pRow.id] || [])
    );
  },

  /**
   * Retrieves a single product by ID with its product_images.
   */
  async getById(supabase: SupabaseClient, id: string): Promise<Product | null> {
    const { data: pData, error: pError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (pError || !pData) return null;

    const { data: imagesData } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", id)
      .order("display_order", { ascending: true });

    const mappedImages = (imagesData || []).map(mapProductImage.fromDb);
    return mapProduct.fromDb(pData, mappedImages);
  },

  /**
   * Creates a new product and saves its associated product_images safely.
   * Root cause fix: Obtains created product.id FIRST before inserting images,
   * ensures 'url' field is NEVER NULL, and syncs products.images array.
   */
  async create(
    supabase: SupabaseClient,
    product: Partial<Product>,
    imageUrls: string[] = []
  ): Promise<Product> {
    const validUrls = (imageUrls || [])
      .map((u) => (u || "").trim())
      .filter((u) => u.length > 0);

    const mainImage = product.image || (validUrls.length > 0 ? validUrls[0] : null);
    const productDbPayload = mapProduct.toDb({
      ...product,
      image: mainImage || undefined,
      images: validUrls,
    });

    // 1. Insert product record to obtain generated product ID
    const { data: createdProductData, error: createError } = await supabase
      .from("products")
      .insert(productDbPayload)
      .select()
      .single();

    if (createError) throw createError;
    const productId = createdProductData.id;

    // 2. Insert image records if valid URLs exist
    const createdImages: ProductImage[] = [];
    if (validUrls.length > 0) {
      const imagePayloads = validUrls.map((url, idx) =>
        mapProductImage.toDb(
          {
            url,
            imageUrl: url,
            displayOrder: idx,
            isMain: url === mainImage || idx === 0,
          },
          productId
        )
      );

      const { data: insertedImagesData, error: imgError } = await supabase
        .from("product_images")
        .insert(imagePayloads)
        .select();

      if (imgError) {
        console.error("Failed to insert product images:", imgError);
      } else if (insertedImagesData) {
        insertedImagesData.forEach((imgRow) =>
          createdImages.push(mapProductImage.fromDb(imgRow))
        );
      }
    }

    return mapProduct.fromDb(createdProductData, createdImages);
  },

  /**
   * Updates an existing product and synchronizes product_images and products.images array.
   */
  async update(
    supabase: SupabaseClient,
    id: string,
    product: Partial<Product>,
    imageUrls?: string[]
  ): Promise<Product> {
    const existingProduct = await this.getById(supabase, id);
    if (!existingProduct) throw new Error(`Product not found with ID ${id}`);

    let updatedUrls = imageUrls;
    if (updatedUrls === undefined) {
      updatedUrls = product.images || existingProduct.images || [];
    }

    const validUrls = updatedUrls
      .map((u) => (u || "").trim())
      .filter((u) => u.length > 0);

    const mainImage = product.image || (validUrls.length > 0 ? validUrls[0] : null);

    const productDbPayload = mapProduct.toDb({
      ...product,
      id,
      image: mainImage || undefined,
      images: validUrls,
    });

    const { data: updatedProductData, error: updateError } = await supabase
      .from("products")
      .update(productDbPayload)
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Synchronize product_images relation table
    if (imageUrls !== undefined) {
      // Clear existing images and replace with updated set safely
      await supabase.from("product_images").delete().eq("product_id", id);

      if (validUrls.length > 0) {
        const imagePayloads = validUrls.map((url, idx) =>
          mapProductImage.toDb(
            {
              url,
              imageUrl: url,
              displayOrder: idx,
              isMain: url === mainImage || idx === 0,
            },
            id
          )
        );

        await supabase.from("product_images").insert(imagePayloads);
      }
    }

    const updated = await this.getById(supabase, id);
    return updated || mapProduct.fromDb(updatedProductData, []);
  },

  /**
   * Deletes a product by ID. Associated product_images are cascade-deleted by DB constraint.
   */
  async delete(supabase: SupabaseClient, id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },

  /**
   * Adds new images to a product, ensuring url is non-null and product_id is valid.
   */
  async addImages(
    supabase: SupabaseClient,
    productId: string,
    imageUrls: string[]
  ): Promise<ProductImage[]> {
    const product = await this.getById(supabase, productId);
    if (!product) throw new Error(`Product not found with ID ${productId}`);

    const validUrls = (imageUrls || [])
      .map((u) => (u || "").trim())
      .filter((u) => u.length > 0);

    if (validUrls.length === 0) return [];

    const existingImages = product.productImages || [];
    const startOrder = existingImages.length;

    const imagePayloads = validUrls.map((url, idx) =>
      mapProductImage.toDb(
        {
          url,
          imageUrl: url,
          displayOrder: startOrder + idx,
          isMain: existingImages.length === 0 && idx === 0,
        },
        productId
      )
    );

    const { data: insertedData, error } = await supabase
      .from("product_images")
      .insert(imagePayloads)
      .select();

    if (error) throw error;

    const newImages = (insertedData || []).map(mapProductImage.fromDb);

    // Sync products.images array
    const combinedUrls = Array.from(
      new Set([...(product.images || []), ...validUrls])
    );
    const mainImg = product.image || combinedUrls[0];

    await supabase
      .from("products")
      .update({ images: combinedUrls, image: mainImg })
      .eq("id", productId);

    return newImages;
  },

  /**
   * Sets a specific image as the main featured image for a product.
   */
  async setMainImage(
    supabase: SupabaseClient,
    productId: string,
    imageUrl: string
  ): Promise<void> {
    const validUrl = (imageUrl || "").trim();
    if (!validUrl) throw new Error("Main image URL cannot be empty.");

    // Update main image in products table
    const { error: pError } = await supabase
      .from("products")
      .update({ image: validUrl })
      .eq("id", productId);

    if (pError) throw pError;

    // Update is_main flags in product_images table
    await supabase
      .from("product_images")
      .update({ is_main: false })
      .eq("product_id", productId);

    await supabase
      .from("product_images")
      .update({ is_main: true })
      .eq("product_id", productId)
      .or(`url.eq.${validUrl},image_url.eq.${validUrl}`);
  },

  /**
   * Deletes a single image from product_images and syncs products.images array.
   */
  async deleteImage(
    supabase: SupabaseClient,
    productId: string,
    imageIdOrUrl: string
  ): Promise<void> {
    const product = await this.getById(supabase, productId);
    if (!product) throw new Error(`Product not found with ID ${productId}`);

    // Delete image from product_images table
    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", productId)
      .or(`id.eq.${imageIdOrUrl},url.eq.${imageIdOrUrl},image_url.eq.${imageIdOrUrl}`);

    // Filter out image from products.images array
    const remainingUrls = (product.images || []).filter(
      (u) => u !== imageIdOrUrl
    );
    const newMain =
      product.image === imageIdOrUrl
        ? remainingUrls[0] || null
        : product.image;

    await supabase
      .from("products")
      .update({ images: remainingUrls, image: newMain })
      .eq("id", productId);
  },
};
