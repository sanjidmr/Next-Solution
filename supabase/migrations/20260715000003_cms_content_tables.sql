-- =============================================================================
-- 20260715000003_cms_content_tables.sql
-- CMS domain tables matching types/index.ts (bilingual en/bn, jsonb arrays)
-- =============================================================================

-- Helper macro-style: every table gets uuid PK, timestamps, soft delete.
-- updated_at triggers applied at end via DO block.

-- ---------------------------------------------------------------------------
-- Site settings (singleton)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name text NOT NULL DEFAULT 'Next Solution',
  tagline_en text,
  tagline_bn text,
  address_en text,
  address_bn text,
  phone text,
  email text,
  facebook text,
  linkedin text,
  twitter text,
  instagram text,
  working_hours_en text,
  working_hours_bn text,
  about_mission_en text,
  about_mission_bn text,
  about_vision_en text,
  about_vision_bn text,
  stats_projects integer DEFAULT 0,
  stats_clients integer DEFAULT 0,
  stats_team integer DEFAULT 0,
  stats_experience integer DEFAULT 0,
  stats_countries integer DEFAULT 0,
  stats_satisfaction integer DEFAULT 0,
  stats_industries integer DEFAULT 0,
  stats_techs integer DEFAULT 0,
  about_team jsonb NOT NULL DEFAULT '[]'::jsonb,
  about_timeline jsonb NOT NULL DEFAULT '[]'::jsonb,
  about_techs jsonb NOT NULL DEFAULT '[]'::jsonb,
  about_values jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Services
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_bn text,
  slug text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT service_categories_slug_key UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS service_categories_sort_idx
  ON public.service_categories (sort_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  category_id uuid REFERENCES public.service_categories (id) ON DELETE SET NULL,
  title_en text NOT NULL,
  title_bn text,
  subtitle_en text,
  subtitle_bn text,
  description_en text,
  description_bn text,
  features_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  features_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  benefits_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  benefits_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  process_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  process_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  pricing jsonb NOT NULL DEFAULT '{}'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  sub_services jsonb NOT NULL DEFAULT '[]'::jsonb,
  tech_used jsonb NOT NULL DEFAULT '[]'::jsonb,
  why_need_en text,
  why_need_bn text,
  who_for_en text,
  who_for_bn text,
  business_impact_en text,
  business_impact_bn text,
  price text,
  icon text,
  slug text NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT services_slug_key UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS services_status_idx ON public.services (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS services_category_idx ON public.services (category) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS services_category_id_idx ON public.services (category_id);
CREATE INDEX IF NOT EXISTS services_sort_idx ON public.services (sort_order);
CREATE INDEX IF NOT EXISTS services_slug_published_idx ON public.services (slug)
  WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS services_features_gin ON public.services USING gin (features_en);
CREATE INDEX IF NOT EXISTS services_tech_used_gin ON public.services USING gin (tech_used);

-- ---------------------------------------------------------------------------
-- Portfolio
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  title_en text NOT NULL,
  title_bn text,
  description_en text,
  description_bn text,
  client text,
  duration text,
  budget text,
  challenge_en text,
  challenge_bn text,
  solution_en text,
  solution_bn text,
  result_en text,
  result_bn text,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  image text,
  featured boolean NOT NULL DEFAULT false,
  rating numeric(3,2),
  review_en text,
  review_bn text,
  slug text,
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  industry_en text,
  industry_bn text,
  completion_year text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  features_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  features_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  before_image text,
  after_image text,
  client_photo text,
  client_role_en text,
  client_role_bn text,
  seo_title_en text,
  seo_title_bn text,
  seo_desc_en text,
  seo_desc_bn text,
  live_url text,
  github_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS portfolio_items_slug_key
  ON public.portfolio_items (slug)
  WHERE slug IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS portfolio_items_status_idx ON public.portfolio_items (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS portfolio_items_category_idx ON public.portfolio_items (category);
CREATE INDEX IF NOT EXISTS portfolio_items_featured_idx ON public.portfolio_items (featured)
  WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS portfolio_items_gallery_gin ON public.portfolio_items USING gin (gallery);
CREATE INDEX IF NOT EXISTS portfolio_items_technologies_gin ON public.portfolio_items USING gin (technologies);

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_bn text,
  slug text NOT NULL,
  description_en text,
  description_bn text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT blog_categories_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.blog_categories (id) ON DELETE SET NULL,
  title_en text NOT NULL,
  title_bn text,
  excerpt_en text,
  excerpt_bn text,
  content_en text,
  content_bn text,
  category_en text,
  category_bn text,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  image text,
  author text,
  author_role_en text,
  author_role_bn text,
  author_bio_en text,
  author_bio_bn text,
  author_photo text,
  author_twitter text,
  author_linkedin text,
  read_time text,
  published_at timestamptz,
  scheduled_at timestamptz,
  status public.content_status NOT NULL DEFAULT 'draft',
  views integer NOT NULL DEFAULT 0,
  engagement integer NOT NULL DEFAULT 0,
  is_trending boolean NOT NULL DEFAULT false,
  is_featured boolean NOT NULL DEFAULT false,
  is_editors_pick boolean NOT NULL DEFAULT false,
  is_learning_guide boolean NOT NULL DEFAULT false,
  is_latest_news boolean NOT NULL DEFAULT false,
  slug text,
  seo_title_en text,
  seo_title_bn text,
  seo_desc_en text,
  seo_desc_bn text,
  canonical_url text,
  og_image text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_key
  ON public.blog_posts (slug)
  WHERE slug IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS blog_posts_category_id_idx ON public.blog_posts (category_id);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON public.blog_posts (published_at DESC)
  WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS blog_posts_flags_idx ON public.blog_posts (is_featured, is_trending, is_editors_pick)
  WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS blog_posts_tags_gin ON public.blog_posts USING gin (tags);

-- ---------------------------------------------------------------------------
-- FAQs
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en text,
  category_bn text,
  question_en text NOT NULL,
  question_bn text,
  answer_en text,
  answer_bn text,
  helpful_count integer NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS faqs_status_idx ON public.faqs (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS faqs_category_idx ON public.faqs (category_en);

-- ---------------------------------------------------------------------------
-- Testimonials / reviews
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.testimonial_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_bn text,
  slug text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT testimonial_categories_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_en text,
  role_bn text,
  company text,
  feedback_en text,
  feedback_bn text,
  rating numeric(2,1) NOT NULL DEFAULT 5 CHECK (rating >= 0 AND rating <= 5),
  avatar text,
  country text,
  country_flag text,
  industry text,
  category text,
  category_id uuid REFERENCES public.testimonial_categories (id) ON DELETE SET NULL,
  service text,
  review_date date,
  review_title_en text,
  review_title_bn text,
  company_logo text,
  project_link text,
  video_url text,
  is_verified boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  status public.review_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS testimonials_status_idx ON public.testimonials (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON public.testimonials (featured, sort_order)
  WHERE status = 'approved' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS testimonials_category_id_idx ON public.testimonials (category_id);

CREATE TABLE IF NOT EXISTS public.testimonial_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_bn text,
  client_name text,
  company text,
  avatar text,
  rating numeric(2,1) NOT NULL DEFAULT 5,
  video_url text NOT NULL,
  thumbnail_url text,
  short_description_en text,
  short_description_bn text,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS testimonial_videos_status_idx
  ON public.testimonial_videos (status, display_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.testimonial_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  projects_completed integer NOT NULL DEFAULT 0,
  happy_clients integer NOT NULL DEFAULT 0,
  client_satisfaction numeric(5,2) NOT NULL DEFAULT 0,
  average_rating numeric(3,2) NOT NULL DEFAULT 0,
  industries_served integer NOT NULL DEFAULT 0,
  five_star_reviews integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.client_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS client_logos_order_idx ON public.client_logos (display_order) WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.client_moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_bn text,
  client_name text,
  company text,
  image_url text NOT NULL,
  description_en text,
  description_bn text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS client_moments_visible_idx
  ON public.client_moments (visible, display_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  company_name text,
  industry_en text,
  industry_bn text,
  service_en text,
  service_bn text,
  background_en text,
  background_bn text,
  challenge_en text,
  challenge_bn text,
  solution_en text,
  solution_bn text,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  timeline_en text,
  timeline_bn text,
  results_en text,
  results_bn text,
  before_image text,
  after_image text,
  client_quote_en text,
  client_quote_bn text,
  client_role_en text,
  client_role_bn text,
  client_photo text,
  case_study_id uuid REFERENCES public.portfolio_items (id) ON DELETE SET NULL,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS success_stories_status_idx ON public.success_stories (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS success_stories_case_study_idx ON public.success_stories (case_study_id);
CREATE INDEX IF NOT EXISTS success_stories_technologies_gin ON public.success_stories USING gin (technologies);

CREATE TABLE IF NOT EXISTS public.review_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enable_public_submissions boolean NOT NULL DEFAULT true,
  require_approval_before_publishing boolean NOT NULL DEFAULT true,
  default_verification_status boolean NOT NULL DEFAULT false,
  notify_on_new_review boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Pricing
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.pricing_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text,
  name_en text NOT NULL,
  name_bn text,
  price_monthly numeric(12,2) NOT NULL DEFAULT 0,
  price_yearly numeric(12,2) NOT NULL DEFAULT 0,
  description_en text,
  description_bn text,
  features_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  features_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  not_included_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  not_included_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_en text,
  cta_bn text,
  popular boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  badge_en text,
  badge_bn text,
  tech_en text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS pricing_packages_enabled_idx
  ON public.pricing_packages (enabled, sort_order)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS pricing_packages_category_idx ON public.pricing_packages (category);
CREATE INDEX IF NOT EXISTS pricing_packages_features_gin ON public.pricing_packages USING gin (features_en);

CREATE TABLE IF NOT EXISTS public.pricing_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_bn text,
  price text,
  description_en text,
  description_bn text,
  category text,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS pricing_addons_enabled_idx
  ON public.pricing_addons (enabled)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.pricing_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_en text NOT NULL,
  feature_bn text,
  starter_en text,
  starter_bn text,
  business_en text,
  business_bn text,
  enterprise_en text,
  enterprise_bn text,
  category_en text,
  category_bn text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS pricing_comparisons_sort_idx
  ON public.pricing_comparisons (sort_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.pricing_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  industry text,
  service text,
  budget text,
  timeline text,
  description text,
  attachment_name text,
  attachment_data text,
  status public.quote_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS pricing_quote_requests_status_idx
  ON public.pricing_quote_requests (status, created_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS pricing_quote_requests_email_idx ON public.pricing_quote_requests (email);

-- ---------------------------------------------------------------------------
-- Currencies
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.currencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  symbol text NOT NULL,
  flag text,
  exchange_rate numeric(18,8) NOT NULL DEFAULT 1,
  enabled boolean NOT NULL DEFAULT true,
  is_default boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT currencies_code_key UNIQUE (code)
);

CREATE INDEX IF NOT EXISTS currencies_enabled_idx
  ON public.currencies (enabled, sort_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.currency_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enable_live_rates boolean NOT NULL DEFAULT true,
  decimal_precision integer NOT NULL DEFAULT 0,
  default_currency_code text NOT NULL DEFAULT 'USD',
  last_updated_live_rates timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Contact / newsletter
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.contact_messages (
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

CREATE INDEX IF NOT EXISTS contact_messages_status_idx
  ON public.contact_messages (status, created_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON public.contact_messages (email);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

-- ---------------------------------------------------------------------------
-- Team / media
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_en text,
  role_bn text,
  department_en text,
  department_bn text,
  avatar text,
  email text,
  linkedin text,
  bio_en text,
  bio_bn text,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS team_members_status_idx
  ON public.team_members (status, sort_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  bucket text NOT NULL,
  path text NOT NULL,
  mime text,
  size bigint,
  alt_en text,
  alt_bn text,
  group_name text,
  url text,
  created_by uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT media_library_bucket_path_key UNIQUE (bucket, path)
);

CREATE INDEX IF NOT EXISTS media_library_bucket_idx ON public.media_library (bucket) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS media_library_group_idx ON public.media_library (group_name);

-- ---------------------------------------------------------------------------
-- Legal / cookies
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.legal_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.legal_policy_type NOT NULL,
  title_en text NOT NULL,
  title_bn text,
  slug text NOT NULL,
  status public.content_status NOT NULL DEFAULT 'draft',
  version text,
  effective_date text,
  last_updated date,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo_title text,
  seo_description text,
  meta_title_en text,
  meta_title_bn text,
  meta_description_en text,
  meta_description_bn text,
  canonical_url text,
  og_title text,
  og_description text,
  twitter_card text,
  schema_markup text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT legal_policies_slug_key UNIQUE (slug),
  CONSTRAINT legal_policies_type_key UNIQUE (type)
);

CREATE INDEX IF NOT EXISTS legal_policies_status_idx ON public.legal_policies (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS legal_policies_sections_gin ON public.legal_policies USING gin (sections);

CREATE TABLE IF NOT EXISTS public.legal_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id uuid NOT NULL REFERENCES public.legal_policies (id) ON DELETE CASCADE,
  version text NOT NULL,
  updated_by text,
  change_summary text,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS legal_revisions_policy_idx ON public.legal_revisions (policy_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.cookie_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description_en text,
  description_bn text,
  enabled_by_default boolean NOT NULL DEFAULT false,
  is_essential boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.cookie_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_title_en text,
  banner_title_bn text,
  banner_text_en text,
  banner_text_bn text,
  enable_customize boolean NOT NULL DEFAULT true,
  last_updated timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Why Choose Us / Process / Tech cards
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.why_choose_us_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text,
  title_en text NOT NULL,
  title_bn text,
  desc_en text,
  desc_bn text,
  description_en text,
  description_bn text,
  category_en text,
  category_bn text,
  badge_text_en text,
  badge_text_bn text,
  stat text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS why_choose_us_cards_visible_idx
  ON public.why_choose_us_cards (visible, display_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.why_choose_us_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label_en text,
  label_bn text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.why_choose_us_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_en text,
  text_bn text,
  label_en text,
  label_bn text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.why_choose_us_techs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text,
  logo_url text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.why_choose_us_cta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline_en text,
  headline_bn text,
  sub_en text,
  sub_bn text,
  btn1_text_en text,
  btn1_text_bn text,
  btn2_text_en text,
  btn2_text_bn text,
  note_en text,
  note_bn text,
  tagline_en text,
  tagline_bn text,
  description_en text,
  description_bn text,
  primary_button_text_en text,
  primary_button_text_bn text,
  secondary_button_text_en text,
  secondary_button_text_bn text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.process_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number text,
  icon text,
  title_en text NOT NULL,
  title_bn text,
  description_en text,
  description_bn text,
  deliverables_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  deliverables_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  estimated_duration_en text,
  estimated_duration_bn text,
  tools_used jsonb NOT NULL DEFAULT '[]'::jsonb,
  services_included_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  services_included_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  animation_type text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS process_steps_visible_idx
  ON public.process_steps (visible, display_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.process_cta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text,
  title_bn text,
  highlight_en text,
  highlight_bn text,
  subtitle_en text,
  subtitle_bn text,
  cta_headline_en text,
  cta_headline_bn text,
  cta_subtitle_en text,
  cta_subtitle_bn text,
  cta_primary_text_en text,
  cta_primary_text_bn text,
  cta_secondary_text_en text,
  cta_secondary_text_bn text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.tech_service_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text,
  category_en text NOT NULL,
  category_bn text,
  description_en text,
  description_bn text,
  technologies jsonb NOT NULL DEFAULT '[]'::jsonb,
  project_count text,
  popular_projects_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  popular_projects_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  benefits_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  benefits_bn jsonb NOT NULL DEFAULT '[]'::jsonb,
  experience_level_en text,
  experience_level_bn text,
  featured_badge_en text,
  featured_badge_bn text,
  display_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  animation_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS tech_service_cards_visible_idx
  ON public.tech_service_cards (visible, display_order)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS tech_service_cards_technologies_gin
  ON public.tech_service_cards USING gin (technologies);

-- ---------------------------------------------------------------------------
-- Marketing / about extras
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.hero_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL DEFAULT 'home',
  headline_en text,
  headline_bn text,
  subheadline_en text,
  subheadline_bn text,
  cta_primary_en text,
  cta_primary_bn text,
  cta_secondary_en text,
  cta_secondary_bn text,
  image_url text,
  video_url text,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS hero_sections_page_status_idx
  ON public.hero_sections (page_key, status)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.website_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  value text NOT NULL,
  label_en text,
  label_bn text,
  suffix text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT website_statistics_key_key UNIQUE (key)
);

CREATE TABLE IF NOT EXISTS public.technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text,
  logo_url text,
  category text,
  website_url text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS technologies_visible_idx
  ON public.technologies (visible, sort_order)
  WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  description_en text,
  description_bn text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.industries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_bn text,
  slug text,
  description_en text,
  description_bn text,
  icon text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS industries_slug_key
  ON public.industries (slug)
  WHERE slug IS NOT NULL AND deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text,
  title_en text NOT NULL,
  title_bn text,
  description_en text,
  description_bn text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS timeline_events_visible_idx
  ON public.timeline_events (visible, sort_order)
  WHERE deleted_at IS NULL;

-- ---------------------------------------------------------------------------
-- SEO / i18n
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.seo_meta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  title_en text,
  title_bn text,
  description_en text,
  description_bn text,
  og_title_en text,
  og_title_bn text,
  og_description_en text,
  og_description_bn text,
  og_image text,
  canonical_url text,
  robots text DEFAULT 'index,follow',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT seo_meta_page_path_key UNIQUE (page_path)
);

CREATE TABLE IF NOT EXISTS public.languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  name text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT languages_code_key UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS public.translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lang text NOT NULL,
  key text NOT NULL,
  value text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  CONSTRAINT translations_lang_key_key UNIQUE (lang, key)
);

CREATE INDEX IF NOT EXISTS translations_lang_idx ON public.translations (lang) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS translations_key_trgm_idx ON public.translations USING gin (key gin_trgm_ops);

-- ---------------------------------------------------------------------------
-- updated_at triggers for all CMS tables
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
    EXECUTE format('DROP TRIGGER IF EXISTS %I_set_updated_at ON public.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER %I_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
      t, t
    );
  END LOOP;
END $$;
