-- =============================================================================
-- 20260901000002_lead_status_workflow.sql
-- Extends the contact_messages.status enum with the premium lead-workflow
-- stages required by the admin dashboard (New / Contacted / In Progress /
-- Converted / Closed). Existing values (unread/read/replied) are preserved and
-- remain valid; the UI maps unread->New, read->Contacted, replied->Converted.
-- =============================================================================

ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'contacted';
ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'in_progress';
ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'converted';
ALTER TYPE public.message_status ADD VALUE IF NOT EXISTS 'closed';