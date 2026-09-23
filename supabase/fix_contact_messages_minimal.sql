-- ============================================================================
-- ONE-STEP FIX: Contact form messages cannot be written into the database
-- ----------------------------------------------------------------------------
-- The hosted database has RLS enabled on `contact_messages` but is missing the
-- anonymous INSERT policy ("Anyone can submit contact messages"). As a result
-- every public contact-form submission is rejected:
--
--   42501  new row violates row-level security policy for table
--          "contact_messages"
--
-- HOW TO USE (takes 10 seconds):
--   1. Open the Supabase Dashboard for YOUR project
--   2. Go to SQL Editor  ->  New query
--   3. Paste ONLY these 3 lines below
--   4. Press Run
--   5. In the website Admin Panel open the Messages tab and press
--      "Test Connection" to confirm the public submit test now passes.
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);