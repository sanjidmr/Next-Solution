-- =============================================================================
-- 20260901000003_realtime_tables.sql
-- Adds the admin-critical tables to the Supabase realtime publication so the
-- admin dashboard receives live postgres_changes events for leads, portfolio,
-- services, subscribers and blog posts. Until this runs, the dashboard keeps
-- working via the built-in 60s polling fallback.
-- =============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.newsletter_subscribers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;