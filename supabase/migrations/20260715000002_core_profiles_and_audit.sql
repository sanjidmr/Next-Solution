-- =============================================================================
-- 20260715000002_core_profiles_and_audit.sql
-- Profiles, private auth helpers, triggers, and audit/notification stubs
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS private;

COMMENT ON SCHEMA private IS 'Internal helpers (security definer). Not exposed via PostgREST API schemas.';

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  role public.user_role NOT NULL DEFAULT 'client',
  phone text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles (email);
CREATE INDEX IF NOT EXISTS profiles_active_idx ON public.profiles (is_active)
  WHERE deleted_at IS NULL;

COMMENT ON TABLE public.profiles IS 'App user profiles; role is the source of truth for authorization (not user_metadata)';
COMMENT ON COLUMN public.profiles.role IS 'Set from auth.users.raw_app_meta_data.role on signup, or defaults to client. Never trust user_metadata.';

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Private role helpers (security definer — never read role from JWT user_metadata)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION private.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('super_admin'::public.user_role, 'admin'::public.user_role, 'editor'::public.user_role)
      AND p.is_active = true
      AND p.deleted_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('super_admin'::public.user_role, 'admin'::public.user_role)
      AND p.is_active = true
      AND p.deleted_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION private.has_role(roles public.user_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = ANY (roles)
      AND p.is_active = true
      AND p.deleted_at IS NULL
  );
$$;

CREATE OR REPLACE FUNCTION private.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT private.has_role(ARRAY['super_admin'::public.user_role]);
$$;

REVOKE ALL ON FUNCTION private.is_staff() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.has_role(public.user_role[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_super_admin() FROM PUBLIC;

GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_staff() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_role(public.user_role[]) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.is_super_admin() TO anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- handle_new_user — create profile from auth.users
-- Role: app_metadata.role if valid, else 'client'. NEVER trust user_metadata.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chosen_role public.user_role := 'client';
  meta_role text;
BEGIN
  meta_role := NEW.raw_app_meta_data ->> 'role';

  IF meta_role IS NOT NULL
     AND meta_role IN ('super_admin', 'admin', 'editor', 'client', 'public')
  THEN
    chosen_role := meta_role::public.user_role;
  END IF;
  -- Intentionally ignore NEW.raw_user_meta_data->>'role' (user-editable / unsafe)

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      ''
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    chosen_role
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(NULLIF(EXCLUDED.full_name, ''), public.profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
        updated_at = now();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Prevent role escalation: only super_admin may change role / is_active / soft-delete profiles
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.role IS DISTINCT FROM OLD.role
       OR NEW.is_active IS DISTINCT FROM OLD.is_active
       OR NEW.deleted_at IS DISTINCT FROM OLD.deleted_at
    THEN
      IF NOT private.is_super_admin() THEN
        RAISE EXCEPTION 'Only super_admin may change role, is_active, or deleted_at on profiles'
          USING ERRCODE = '42501';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_role ON public.profiles;
CREATE TRIGGER profiles_protect_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_role();

-- ---------------------------------------------------------------------------
-- Activity / audit / notifications (RLS enabled in later migration)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  summary text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS activity_logs_actor_idx ON public.activity_logs (actor_id);
CREATE INDEX IF NOT EXISTS activity_logs_entity_idx ON public.activity_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS activity_logs_created_idx ON public.activity_logs (created_at DESC);

DROP TRIGGER IF EXISTS activity_logs_set_updated_at ON public.activity_logs;
CREATE TRIGGER activity_logs_set_updated_at
  BEFORE UPDATE ON public.activity_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  table_name text NOT NULL,
  record_id uuid,
  operation text NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS audit_logs_actor_idx ON public.audit_logs (actor_id);
CREATE INDEX IF NOT EXISTS audit_logs_table_idx ON public.audit_logs (table_name, record_id);
CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON public.audit_logs (created_at DESC);

DROP TRIGGER IF EXISTS audit_logs_set_updated_at ON public.audit_logs;
CREATE TRIGGER audit_logs_set_updated_at
  BEFORE UPDATE ON public.audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS notifications_user_idx ON public.notifications (user_id, is_read)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS notifications_created_idx ON public.notifications (created_at DESC);

DROP TRIGGER IF EXISTS notifications_set_updated_at ON public.notifications;
CREATE TRIGGER notifications_set_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- RLS stubs: enable early; concrete policies live in 20260715000004
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
