-- =============================================================================
-- 20260731000001_pricing_system.sql
-- Dynamic three-tier pricing engine:
--   project_pricing  -> one-time project-based service cards (Price per Project)
--   monthly_pricing  -> recurring subscription cards (Price per Month)
--   agency_packages  -> bundled service packages (Agency Packages)
-- All three are fully CMS-managed from the admin panel and rendered on the
-- public /pricing page. Public visitors only see enabled (published) rows;
-- staff (super_admin / admin / editor) can manage everything.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- project_pricing
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.project_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,               -- e.g. 'Web Development' (one of the 7 services)
  project_type text NOT NULL,          -- e.g. 'Landing Page Website'
  price numeric(12,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  billing_type text NOT NULL DEFAULT 'one-time', -- one-time | monthly | yearly
  delivery text NOT NULL DEFAULT '',
  revisions text NOT NULL DEFAULT '',
  support text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommended boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS project_pricing_service_idx ON public.project_pricing (service);
CREATE INDEX IF NOT EXISTS project_pricing_enabled_idx ON public.project_pricing (enabled, sort_order)
  WHERE deleted_at IS NULL;

COMMENT ON TABLE public.project_pricing IS 'One-time project-based pricing cards; published rows (enabled=true) are visible on /pricing';
COMMENT ON COLUMN public.project_pricing.service IS 'Service category. Use one of: Web Development, UI/UX Design, Graphic Design, Video Editing, Digital Marketing, AI Services, SEO';

-- ---------------------------------------------------------------------------
-- monthly_pricing
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.monthly_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name text NOT NULL,
  service text NOT NULL,               -- main service category the plan belongs to
  description text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  billing_type text NOT NULL DEFAULT 'monthly', -- monthly | yearly
  delivery text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommended boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS monthly_pricing_service_idx ON public.monthly_pricing (service);
CREATE INDEX IF NOT EXISTS monthly_pricing_enabled_idx ON public.monthly_pricing (enabled, sort_order)
  WHERE deleted_at IS NULL;

COMMENT ON TABLE public.monthly_pricing IS 'Recurring subscription pricing cards; published rows (enabled=true) are visible on /pricing';

-- ---------------------------------------------------------------------------
-- agency_packages
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.agency_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  original_price numeric(12,2) NOT NULL DEFAULT 0, -- struck-through original price
  price numeric(12,2) NOT NULL DEFAULT 0,          -- actual price to display
  discount integer,                                -- optional % saved (nullable)
  billing_type text NOT NULL DEFAULT 'one-time',   -- one-time | monthly | yearly
  delivery text NOT NULL DEFAULT '',
  support text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  included_services jsonb NOT NULL DEFAULT '[]'::jsonb, -- the services covered by the bundle
  most_popular boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS agency_packages_enabled_idx ON public.agency_packages (enabled, sort_order)
  WHERE deleted_at IS NULL;

COMMENT ON TABLE public.agency_packages IS 'Bundled full-agency packages; published rows (enabled=true) are visible on /pricing';

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

ALTER TABLE public.project_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_packages ENABLE ROW LEVEL SECURITY;

-- Public: read only enabled (published) rows that are not soft-deleted.
CREATE POLICY "project_pricing_read_public" ON public.project_pricing
  FOR SELECT USING (enabled = true AND deleted_at IS NULL);
CREATE POLICY "monthly_pricing_read_public" ON public.monthly_pricing
  FOR SELECT USING (enabled = true AND deleted_at IS NULL);
CREATE POLICY "agency_packages_read_public" ON public.agency_packages
  FOR SELECT USING (enabled = true AND deleted_at IS NULL);

-- Staff: full access (routing uses private.is_staff(), defined in 0002).
CREATE POLICY "project_pricing_select_staff" ON public.project_pricing
  FOR SELECT USING (private.is_staff());
CREATE POLICY "project_pricing_insert_staff" ON public.project_pricing
  FOR INSERT WITH CHECK (private.is_staff());
CREATE POLICY "project_pricing_update_staff" ON public.project_pricing
  FOR UPDATE USING (private.is_staff()) WITH CHECK (private.is_staff());
CREATE POLICY "project_pricing_delete_staff" ON public.project_pricing
  FOR DELETE USING (private.is_staff());

CREATE POLICY "monthly_pricing_select_staff" ON public.monthly_pricing
  FOR SELECT USING (private.is_staff());
CREATE POLICY "monthly_pricing_insert_staff" ON public.monthly_pricing
  FOR INSERT WITH CHECK (private.is_staff());
CREATE POLICY "monthly_pricing_update_staff" ON public.monthly_pricing
  FOR UPDATE USING (private.is_staff()) WITH CHECK (private.is_staff());
CREATE POLICY "monthly_pricing_delete_staff" ON public.monthly_pricing
  FOR DELETE USING (private.is_staff());

CREATE POLICY "agency_packages_select_staff" ON public.agency_packages
  FOR SELECT USING (private.is_staff());
CREATE POLICY "agency_packages_insert_staff" ON public.agency_packages
  FOR INSERT WITH CHECK (private.is_staff());
CREATE POLICY "agency_packages_update_staff" ON public.agency_packages
  FOR UPDATE USING (private.is_staff()) WITH CHECK (private.is_staff());
CREATE POLICY "agency_packages_delete_staff" ON public.agency_packages
  FOR DELETE USING (private.is_staff());

-- ---------------------------------------------------------------------------
-- updated_at triggers (uses public.set_updated_at() from 0002)
-- ---------------------------------------------------------------------------

DROP TRIGGER IF EXISTS project_pricing_set_updated_at ON public.project_pricing;
CREATE TRIGGER project_pricing_set_updated_at
  BEFORE UPDATE ON public.project_pricing
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS monthly_pricing_set_updated_at ON public.monthly_pricing;
CREATE TRIGGER monthly_pricing_set_updated_at
  BEFORE UPDATE ON public.monthly_pricing
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS agency_packages_set_updated_at ON public.agency_packages;
CREATE TRIGGER agency_packages_set_updated_at
  BEFORE UPDATE ON public.agency_packages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();