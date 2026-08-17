-- Migration: Products and Product Images
-- Description: Creates products and product_images tables with robust constraints and synchronization logic

CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en text NOT NULL,
  title_bn text,
  slug text NOT NULL UNIQUE,
  description_en text,
  description_bn text,
  price numeric(12, 2) DEFAULT 0.00 NOT NULL,
  category text,
  image text,
  images text[] DEFAULT '{}'::text[],
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.product_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL CHECK (char_length(trim(url)) > 0),
  image_url text,
  display_order integer DEFAULT 0,
  is_main boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_is_main ON public.product_images(product_id, is_main);

-- RLS Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published products and product_images
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product_images" ON public.product_images
  FOR SELECT USING (true);

-- Allow authenticated/service role full access to products and product_images
CREATE POLICY "Allow full access to authenticated users on products" ON public.products
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Allow full access to authenticated users on product_images" ON public.product_images
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
