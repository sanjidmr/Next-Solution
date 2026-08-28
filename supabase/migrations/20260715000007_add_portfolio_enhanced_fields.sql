-- Migration: Add enhanced portfolio fields to portfolio_items
-- Safe ALTER TABLE — adds new columns with defaults

ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS project_date TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS app_store_url TEXT,
  ADD COLUMN IF NOT EXISTS play_store_url TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_image TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();
