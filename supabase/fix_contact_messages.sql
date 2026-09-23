-- ============================================================================
-- FIX: Contact form messages are NOT appearing in the Admin Panel
-- ----------------------------------------------------------------------------
-- WHY THIS HAPPENS
--   The contact form posts to /api/contact which INSERTs into the
--   `contact_messages` table as an anonymous user. That INSERT is only allowed
--   when the row-level-security policy "Anyone can submit contact messages"
--   exists. If the hosted database is out of sync with the project migrations
--   (missing table / missing policy / missing message_status enum), the write
--   silently fails and the form never tells you -- so the Admin Panel stays
--   empty.
--
-- WHAT THIS SCRIPT DOES (idempotent -- safe to run again and again)
--   1. Creates the `public.message_status` enum with all lead-workflow values.
--   2. Creates/repairs the `contact_messages` table (exact schema the app
--      expects, incl. uuid id, updated_at, deleted_at).
--   3. Enables RLS and recreates the anonymous-INSERT policy (the essential
--      bit) plus staff view/modify policies (when the private.is_staff()
--      helper is available).
--   4. Adds the table to the `supabase_realtime` publication so new messages
--      show up in the Admin Panel without a page refresh.
--
-- HOW TO USE
--   Supabase Dashboard -> SQL Editor -> New query -> paste this whole file ->
--   Run.
--
-- NOTE: If the table exists with the OLD schema (TEXT id), the script rebuilds
-- it -- any rows already stored there are dropped (the messages that never made
-- it to the panel are effectively lost anyway).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) message_status enum (with all lead-workflow stages)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'message_status' AND n.nspname = 'public'
  ) THEN
    CREATE TYPE public.message_status AS ENUM ('unread', 'read', 'replied');
  END IF;
END $$;

DO $$ BEGIN
  ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'contacted';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'in_progress';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'converted';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'closed';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------------------------------------------------------------------------
-- 2) contact_messages table (create / repair / upgrade)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'contact_messages'
  ) THEN
    CREATE TABLE public.contact_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      subject text,
      message text NOT NULL,
      service text,
      budget text,
      status public.message_status NOT NULL DEFAULT 'unread',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      deleted_at timestamptz
    );

  ELSIF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'contact_messages'
      AND column_name = 'id' AND data_type <> 'uuid'
  ) THEN
    -- Old schema found (TEXT primary key) -> rebuild with the exact schema the
    -- app expects. Rows stored with the old schema are dropped here.
    DROP TABLE public.contact_messages CASCADE;
    CREATE TABLE public.contact_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      email text NOT NULL,
      phone text,
      subject text,
      message text NOT NULL,
      service text,
      budget text,
      status public.message_status NOT NULL DEFAULT 'unread',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      deleted_at timestamptz
    );

  ELSE
    -- New-ish schema already present -> fill in any missing columns and cast a
    -- TEXT status column to the enum if needed.
    ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS phone text;
    ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS subject text;
    ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS service text;
    ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS budget text;
    ALTER TABLE public.contact_messages
      ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
    ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'contact_messages'
        AND column_name = 'status' AND data_type <> 'USER-DEFINED'
    ) THEN
      ALTER TABLE public.contact_messages
        ALTER COLUMN status SET DATA TYPE public.message_status
          USING status::text::public.message_status;
      ALTER TABLE public.contact_messages
        ALTER COLUMN status SET DEFAULT 'unread';
    END IF;
  END IF;
END $$;
-- Indexes (no-op when they already exist)
CREATE INDEX IF NOT EXISTS contact_messages_status_idx
  ON public.contact_messages (status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON public.contact_messages (email);

-- ---------------------------------------------------------------------------
-- 3) RLS: the essential anonymous-INSERT policy plus staff-only access
-- ---------------------------------------------------------------------------
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Staff can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Staff can modify contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Public can view contact messages" ON public.contact_messages;

-- Anyone (anonymous, incl. the public contact form) can submit a message.
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Staff view/modify policies are defense-in-depth only (the Admin Panel reads
-- the table with the service-role key which bypasses RLS). They are created
-- only when the private.is_staff() helper from migration 0002 exists.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE p.proname = 'is_staff' AND n.nspname = 'private'
  ) THEN
    EXECUTE $p$
      CREATE POLICY "Staff can view contact messages" ON public.contact_messages
        FOR SELECT TO authenticated USING (private.is_staff());
      CREATE POLICY "Staff can modify contact messages" ON public.contact_messages
        FOR ALL TO authenticated USING (private.is_staff());
    $p$;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 4) Realtime publication (so new messages appear live in the Admin Panel)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime')
     AND NOT EXISTS (
       SELECT 1
       FROM pg_publication_tables pt
       JOIN pg_publication p ON p.oid = pt.pubid
       JOIN pg_class c ON c.oid = pt.prelid
       WHERE p.pubname = 'supabase_realtime'
         AND c.relname = 'contact_messages'
         AND c.relnamespace = 'public'::regclass
     ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
  END IF;
END $$;