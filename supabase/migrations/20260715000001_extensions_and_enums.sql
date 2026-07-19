-- =============================================================================
-- 20260715000001_extensions_and_enums.sql
-- Extensions and shared enums for Next Solution CMS
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

-- Ensure extensions schema is on the search path for gen_random_uuid / digest etc.
-- Supabase already exposes extensions; these CREATE EXTENSION IF NOT EXISTS are idempotent.

DO $$
BEGIN
  CREATE TYPE public.user_role AS ENUM (
    'super_admin',
    'admin',
    'editor',
    'client',
    'public'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.content_status AS ENUM (
    'draft',
    'published',
    'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.message_status AS ENUM (
    'unread',
    'read',
    'replied'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.review_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'archived'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.quote_status AS ENUM (
    'pending',
    'reviewed',
    'contacted'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.legal_policy_type AS ENUM (
    'privacy_policy',
    'terms_conditions',
    'cookie_policy'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

COMMENT ON TYPE public.user_role IS 'Authorization roles stored on profiles; never taken from user_metadata';
COMMENT ON TYPE public.content_status IS 'CMS publish lifecycle for content entities';
COMMENT ON TYPE public.message_status IS 'Contact inbox message lifecycle';
COMMENT ON TYPE public.review_status IS 'Public testimonial / review moderation lifecycle';
COMMENT ON TYPE public.quote_status IS 'Pricing quote request lifecycle';
COMMENT ON TYPE public.legal_policy_type IS 'Legal document kinds managed in the legal CMS';
