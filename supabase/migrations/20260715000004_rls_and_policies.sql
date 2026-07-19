-- =============================================================================
-- 20260715000004_rls_and_policies.sql
-- Enable Row Level Security and establish access control policies
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Enable RLS on all CMS tables
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'site_settings',
    'service_categories',
    'services',
    'portfolio_items',
    'blog_categories',
    'blog_posts',
    'faqs',
    'testimonials',
    'testimonial_categories',
    'testimonial_videos',
    'testimonial_statistics',
    'client_logos',
    'client_moments',
    'success_stories',
    'review_settings',
    'pricing_packages',
    'pricing_addons',
    'pricing_comparisons',
    'pricing_quote_requests',
    'currencies',
    'currency_settings',
    'contact_messages',
    'newsletter_subscribers',
    'team_members',
    'media_library',
    'legal_policies',
    'legal_revisions',
    'cookie_categories',
    'cookie_settings',
    'why_choose_us_cards',
    'why_choose_us_stats',
    'why_choose_us_badges',
    'why_choose_us_techs',
    'why_choose_us_cta',
    'process_steps',
    'process_cta',
    'tech_service_cards',
    'hero_sections',
    'website_statistics',
    'technologies',
    'partners',
    'industries',
    'timeline_events',
    'seo_meta',
    'translations',
    'languages'
  ]
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Define Shared Security Helper Policies (Admin/Staff/Public)
-- ---------------------------------------------------------------------------

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (deleted_at IS NULL AND is_active = true);

CREATE POLICY "Users can update their own profile basic info" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can do everything on profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (private.is_admin())
  WITH CHECK (private.is_admin());

-- Site Settings Policies
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify site settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Service Categories Policies
CREATE POLICY "Service categories are viewable by everyone" ON public.service_categories
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify service categories" ON public.service_categories
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Services Policies
CREATE POLICY "Published services are viewable by everyone" ON public.services
  FOR SELECT USING (deleted_at IS NULL AND status = 'published');

CREATE POLICY "Staff can read all services" ON public.services
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify services" ON public.services
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Portfolio Items Policies
CREATE POLICY "Published portfolio items viewable by everyone" ON public.portfolio_items
  FOR SELECT USING (deleted_at IS NULL AND status = 'published');

CREATE POLICY "Staff can read all portfolio items" ON public.portfolio_items
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify portfolio items" ON public.portfolio_items
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Blog Categories Policies
CREATE POLICY "Blog categories viewable by everyone" ON public.blog_categories
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify blog categories" ON public.blog_categories
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Blog Posts Policies
CREATE POLICY "Published blog posts viewable by everyone" ON public.blog_posts
  FOR SELECT USING (deleted_at IS NULL AND status = 'published');

CREATE POLICY "Staff can read all blog posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- FAQs Policies
CREATE POLICY "FAQs viewable by everyone" ON public.faqs
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify FAQs" ON public.faqs
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

-- Testimonials & Categories Policies
CREATE POLICY "Approved testimonials viewable by everyone" ON public.testimonials
  FOR SELECT USING (deleted_at IS NULL AND status = 'approved');

CREATE POLICY "Staff can read all testimonials" ON public.testimonials
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (private.is_staff())
  WITH CHECK (private.is_staff());

CREATE POLICY "Testimonial categories viewable by everyone" ON public.testimonial_categories
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify testimonial categories" ON public.testimonial_categories
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Testimonial videos viewable by everyone" ON public.testimonial_videos
  FOR SELECT USING (deleted_at IS NULL AND featured = true);

CREATE POLICY "Staff can read all testimonial videos" ON public.testimonial_videos
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify testimonial videos" ON public.testimonial_videos
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Testimonial statistics viewable by everyone" ON public.testimonial_statistics
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify testimonial statistics" ON public.testimonial_statistics
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Client logos viewable by everyone" ON public.client_logos
  FOR SELECT USING (deleted_at IS NULL AND featured = true);

CREATE POLICY "Staff can read all client logos" ON public.client_logos
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify client logos" ON public.client_logos
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Client moments viewable by everyone" ON public.client_moments
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify client moments" ON public.client_moments
  FOR ALL TO authenticated USING (private.is_staff());

-- Success Stories Policies
CREATE POLICY "Featured success stories viewable by everyone" ON public.success_stories
  FOR SELECT USING (deleted_at IS NULL AND featured = true);

CREATE POLICY "Staff can read all success stories" ON public.success_stories
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify success stories" ON public.success_stories
  FOR ALL TO authenticated USING (private.is_staff());

-- Review Settings Policies
CREATE POLICY "Review settings viewable by everyone" ON public.review_settings
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify review settings" ON public.review_settings
  FOR ALL TO authenticated USING (private.is_staff());

-- Pricing Packages, Addons, Comparisons Policies
CREATE POLICY "Enabled pricing packages viewable by everyone" ON public.pricing_packages
  FOR SELECT USING (deleted_at IS NULL AND enabled = true);

CREATE POLICY "Staff can read all pricing packages" ON public.pricing_packages
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify pricing packages" ON public.pricing_packages
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Enabled pricing addons viewable by everyone" ON public.pricing_addons
  FOR SELECT USING (enabled = true);

CREATE POLICY "Staff can read all pricing addons" ON public.pricing_addons
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify pricing addons" ON public.pricing_addons
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Pricing comparisons viewable by everyone" ON public.pricing_comparisons
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify pricing comparisons" ON public.pricing_comparisons
  FOR ALL TO authenticated USING (private.is_staff());

-- Pricing Quote Requests Policies (Anonymous Insert, Staff Select/Modify)
CREATE POLICY "Anyone can submit quote requests" ON public.pricing_quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view quote requests" ON public.pricing_quote_requests
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify quote requests" ON public.pricing_quote_requests
  FOR ALL TO authenticated USING (private.is_staff());

-- Currencies & Settings Policies
CREATE POLICY "Enabled currencies viewable by everyone" ON public.currencies
  FOR SELECT USING (enabled = true);

CREATE POLICY "Staff can read all currencies" ON public.currencies
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify currencies" ON public.currencies
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Currency settings viewable by everyone" ON public.currency_settings
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify currency settings" ON public.currency_settings
  FOR ALL TO authenticated USING (private.is_staff());

-- Contact Messages Policies (Anonymous Insert, Staff View/Modify)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view contact messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify contact messages" ON public.contact_messages
  FOR ALL TO authenticated USING (private.is_staff());

-- Newsletter Subscribers Policies (Anonymous Insert, Staff View/Modify)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view newsletter subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify newsletter subscribers" ON public.newsletter_subscribers
  FOR ALL TO authenticated USING (private.is_staff());

-- Team Members Policies
CREATE POLICY "Team members viewable by everyone" ON public.team_members
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify team members" ON public.team_members
  FOR ALL TO authenticated USING (private.is_staff());

-- Media Library Policies
CREATE POLICY "Media library items viewable by everyone" ON public.media_library
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify media library" ON public.media_library
  FOR ALL TO authenticated USING (private.is_staff());

-- Legal Policies & Revisions
CREATE POLICY "Legal policies viewable by everyone" ON public.legal_policies
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify legal policies" ON public.legal_policies
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Legal revisions viewable by everyone" ON public.legal_revisions
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify legal revisions" ON public.legal_revisions
  FOR ALL TO authenticated USING (private.is_staff());

-- Cookie Categories & Settings
CREATE POLICY "Cookie categories viewable by everyone" ON public.cookie_categories
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify cookie categories" ON public.cookie_categories
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Cookie settings viewable by everyone" ON public.cookie_settings
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify cookie settings" ON public.cookie_settings
  FOR ALL TO authenticated USING (private.is_staff());

-- Why Choose Us (Cards, Stats, Badges, Techs, CTA)
CREATE POLICY "Why choose us cards viewable by everyone" ON public.why_choose_us_cards
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all why choose us cards" ON public.why_choose_us_cards
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify why choose us cards" ON public.why_choose_us_cards
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Why choose us stats viewable by everyone" ON public.why_choose_us_stats
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all why choose us stats" ON public.why_choose_us_stats
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify why choose us stats" ON public.why_choose_us_stats
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Why choose us badges viewable by everyone" ON public.why_choose_us_badges
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all why choose us badges" ON public.why_choose_us_badges
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify why choose us badges" ON public.why_choose_us_badges
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Why choose us techs viewable by everyone" ON public.why_choose_us_techs
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all why choose us techs" ON public.why_choose_us_techs
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify why choose us techs" ON public.why_choose_us_techs
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Why choose us CTA viewable by everyone" ON public.why_choose_us_cta
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify why choose us CTA" ON public.why_choose_us_cta
  FOR ALL TO authenticated USING (private.is_staff());

-- Process Workflow (Steps, CTA)
CREATE POLICY "Process steps viewable by everyone" ON public.process_steps
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all process steps" ON public.process_steps
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify process steps" ON public.process_steps
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Process CTA viewable by everyone" ON public.process_cta
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify process CTA" ON public.process_cta
  FOR ALL TO authenticated USING (private.is_staff());

-- Tech Service Cards
CREATE POLICY "Tech service cards viewable by everyone" ON public.tech_service_cards
  FOR SELECT USING (deleted_at IS NULL AND visible = true);

CREATE POLICY "Staff can read all tech service cards" ON public.tech_service_cards
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can modify tech service cards" ON public.tech_service_cards
  FOR ALL TO authenticated USING (private.is_staff());

-- Auxiliary CMS Tables (Hero, Website Stats, Technologies, Partners, Industries, Timeline, SEO, Languages, Translations)
CREATE POLICY "Hero sections viewable by everyone" ON public.hero_sections
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify hero sections" ON public.hero_sections
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Website statistics viewable by everyone" ON public.website_statistics
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify website statistics" ON public.website_statistics
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Technologies viewable by everyone" ON public.technologies
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify technologies" ON public.technologies
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Partners viewable by everyone" ON public.partners
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify partners" ON public.partners
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Industries viewable by everyone" ON public.industries
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify industries" ON public.industries
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Timeline events viewable by everyone" ON public.timeline_events
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify timeline events" ON public.timeline_events
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "SEO meta viewable by everyone" ON public.seo_meta
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify SEO meta" ON public.seo_meta
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Languages viewable by everyone" ON public.languages
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify languages" ON public.languages
  FOR ALL TO authenticated USING (private.is_staff());

CREATE POLICY "Translations viewable by everyone" ON public.translations
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Staff can modify translations" ON public.translations
  FOR ALL TO authenticated USING (private.is_staff());

-- Audit / Activity Logs / Notifications (Staff Restricted)
CREATE POLICY "Staff can view activity logs" ON public.activity_logs
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can write activity logs" ON public.activity_logs
  FOR INSERT TO authenticated WITH CHECK (private.is_staff());

CREATE POLICY "Staff can view audit logs" ON public.audit_logs
  FOR SELECT TO authenticated USING (private.is_staff());

CREATE POLICY "Staff can write audit logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (private.is_staff());

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can update their own notifications read state" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Staff can manage all notifications" ON public.notifications
  FOR ALL TO authenticated USING (private.is_staff()) WITH CHECK (private.is_staff());
