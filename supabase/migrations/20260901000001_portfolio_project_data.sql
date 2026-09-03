-- Migration: Add structured project_data metadata column to portfolio_items
-- This stores service-specific structured fields (marketing strategy, AI
-- features, video category, deliverables, tools, etc.) as JSONB so the
-- portfolio system can be extended with new services without schema churn.

ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS project_data JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN portfolio_items.project_data IS
  'Service-specific structured fields for the portfolio project (JSONB).';
