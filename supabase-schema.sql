-- =============================================================================
-- NEXT SOLUTION — Complete Supabase SQL Schema
-- =============================================================================
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- This creates ALL tables needed for the admin panel and public site.
-- =============================================================================

-- ===================== SERVICES =====================
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  features_en JSONB DEFAULT '[]',
  features_bn JSONB DEFAULT '[]',
  benefits_en JSONB DEFAULT '[]',
  benefits_bn JSONB DEFAULT '[]',
  price TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  process_en JSONB DEFAULT '[]',
  process_bn JSONB DEFAULT '[]',
  tech_used JSONB DEFAULT '[]',
  subtitle_en TEXT,
  subtitle_bn TEXT,
  why_need_en TEXT,
  why_need_bn TEXT,
  who_for_en TEXT,
  who_for_bn TEXT,
  business_impact_en TEXT,
  business_impact_bn TEXT,
  sub_services JSONB DEFAULT '[]',
  faqs JSONB DEFAULT '[]',
  pricing JSONB DEFAULT '{}',
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PORTFOLIO ITEMS =====================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  client TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  challenge_en TEXT NOT NULL DEFAULT '',
  challenge_bn TEXT NOT NULL DEFAULT '',
  solution_en TEXT NOT NULL DEFAULT '',
  solution_bn TEXT NOT NULL DEFAULT '',
  result_en TEXT NOT NULL DEFAULT '',
  result_bn TEXT NOT NULL DEFAULT '',
  technologies JSONB DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  featured BOOLEAN DEFAULT false,
  rating NUMERIC,
  review_en TEXT,
  review_bn TEXT,
  slug TEXT,
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  industry_en TEXT,
  industry_bn TEXT,
  completion_year TEXT,
  gallery JSONB DEFAULT '[]',
  features_en JSONB DEFAULT '[]',
  features_bn JSONB DEFAULT '[]',
  before_image TEXT,
  after_image TEXT,
  client_photo TEXT,
  client_role_en TEXT,
  client_role_bn TEXT,
  seo_title_en TEXT,
  seo_title_bn TEXT,
  seo_desc_en TEXT,
  seo_desc_bn TEXT,
  live_url TEXT,
  github_url TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== BLOG POSTS =====================
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  excerpt_bn TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  content_bn TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  category_bn TEXT NOT NULL DEFAULT '',
  tags JSONB DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  is_trending BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_editors_pick BOOLEAN DEFAULT false,
  is_learning_guide BOOLEAN DEFAULT false,
  is_latest_news BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMPTZ,
  slug TEXT,
  seo_title_en TEXT,
  seo_title_bn TEXT,
  seo_desc_en TEXT,
  seo_desc_bn TEXT,
  canonical_url TEXT,
  og_image TEXT,
  author_role_en TEXT,
  author_role_bn TEXT,
  author_bio_en TEXT,
  author_bio_bn TEXT,
  author_photo TEXT,
  author_twitter TEXT,
  author_linkedin TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== FAQS =====================
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  category_en TEXT NOT NULL DEFAULT '',
  category_bn TEXT NOT NULL DEFAULT '',
  question_en TEXT NOT NULL DEFAULT '',
  question_bn TEXT NOT NULL DEFAULT '',
  answer_en TEXT NOT NULL DEFAULT '',
  answer_bn TEXT NOT NULL DEFAULT '',
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== TESTIMONIALS =====================
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  role_en TEXT NOT NULL DEFAULT '',
  role_bn TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  feedback_en TEXT NOT NULL DEFAULT '',
  feedback_bn TEXT NOT NULL DEFAULT '',
  rating NUMERIC DEFAULT 5,
  avatar TEXT NOT NULL DEFAULT '',
  country TEXT,
  country_flag TEXT,
  industry TEXT,
  category TEXT,
  service TEXT,
  review_date TEXT,
  review_title_en TEXT,
  review_title_bn TEXT,
  company_logo TEXT,
  project_link TEXT,
  video_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== CONTACT MESSAGES =====================
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== NEWSLETTER SUBSCRIBERS =====================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== SITE SETTINGS (singleton) =====================
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  agency_name TEXT NOT NULL DEFAULT 'Next Solution',
  tagline_en TEXT,
  tagline_bn TEXT,
  address_en TEXT,
  address_bn TEXT,
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  facebook TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  twitter TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  working_hours_en TEXT NOT NULL DEFAULT '',
  working_hours_bn TEXT NOT NULL DEFAULT '',
  about_mission_en TEXT,
  about_mission_bn TEXT,
  about_vision_en TEXT,
  about_vision_bn TEXT,
  stats_projects INTEGER DEFAULT 0,
  stats_clients INTEGER DEFAULT 0,
  stats_team INTEGER DEFAULT 0,
  stats_experience INTEGER DEFAULT 0,
  stats_countries INTEGER DEFAULT 0,
  stats_satisfaction INTEGER DEFAULT 0,
  stats_industries INTEGER DEFAULT 0,
  stats_techs INTEGER DEFAULT 0,
  about_team_json JSONB,
  about_timeline_json JSONB,
  about_techs_json JSONB,
  about_values_json JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRICING PACKAGES =====================
CREATE TABLE IF NOT EXISTS pricing_packages (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL DEFAULT '',
  name_en TEXT NOT NULL DEFAULT '',
  name_bn TEXT NOT NULL DEFAULT '',
  price_monthly NUMERIC DEFAULT 0,
  price_yearly NUMERIC DEFAULT 0,
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  features_en JSONB DEFAULT '[]',
  features_bn JSONB DEFAULT '[]',
  not_included_en JSONB DEFAULT '[]',
  not_included_bn JSONB DEFAULT '[]',
  cta_en TEXT NOT NULL DEFAULT '',
  cta_bn TEXT NOT NULL DEFAULT '',
  popular BOOLEAN DEFAULT false,
  enabled BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  badge_en TEXT,
  badge_bn TEXT,
  tech_en TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRICING ADDONS =====================
CREATE TABLE IF NOT EXISTS pricing_addons (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL DEFAULT '',
  name_bn TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  category TEXT,
  enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRICING COMPARISONS =====================
CREATE TABLE IF NOT EXISTS pricing_comparisons (
  id TEXT PRIMARY KEY,
  feature_en TEXT NOT NULL DEFAULT '',
  feature_bn TEXT NOT NULL DEFAULT '',
  starter_en TEXT NOT NULL DEFAULT '',
  starter_bn TEXT NOT NULL DEFAULT '',
  business_en TEXT NOT NULL DEFAULT '',
  business_bn TEXT NOT NULL DEFAULT '',
  enterprise_en TEXT NOT NULL DEFAULT '',
  enterprise_bn TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  category_bn TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRICING QUOTE REQUESTS =====================
CREATE TABLE IF NOT EXISTS pricing_quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  service TEXT DEFAULT '',
  project_desc TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  timeline TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== CURRENCIES =====================
CREATE TABLE IF NOT EXISTS currencies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  code TEXT NOT NULL DEFAULT '',
  symbol TEXT NOT NULL DEFAULT '',
  flag TEXT,
  exchange_rate NUMERIC DEFAULT 1,
  enabled BOOLEAN DEFAULT false,
  is_default BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== CURRENCY SETTINGS (singleton) =====================
CREATE TABLE IF NOT EXISTS currency_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  enable_live_rates BOOLEAN DEFAULT true,
  decimal_precision INTEGER DEFAULT 0,
  default_currency_code TEXT DEFAULT 'USD',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== TESTIMONIAL CATEGORIES =====================
CREATE TABLE IF NOT EXISTS testimonial_categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL DEFAULT '',
  name_bn TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== TESTIMONIAL VIDEOS =====================
CREATE TABLE IF NOT EXISTS testimonial_videos (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  client_name TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  avatar TEXT,
  rating NUMERIC DEFAULT 5,
  video_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  short_description_en TEXT NOT NULL DEFAULT '',
  short_description_bn TEXT NOT NULL DEFAULT '',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== TESTIMONIAL STATISTICS (singleton) =====================
CREATE TABLE IF NOT EXISTS testimonial_statistics (
  id TEXT PRIMARY KEY DEFAULT 'default',
  total_reviews INTEGER DEFAULT 0,
  average_rating NUMERIC DEFAULT 0,
  satisfaction_rate INTEGER DEFAULT 0,
  video_reviews_count INTEGER DEFAULT 0,
  featured_stories_count INTEGER DEFAULT 0,
  client_retention_rate INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== CLIENT LOGOS =====================
CREATE TABLE IF NOT EXISTS client_logos (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  logo_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== SUCCESS STORIES =====================
CREATE TABLE IF NOT EXISTS success_stories (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL DEFAULT '',
  company_name TEXT NOT NULL DEFAULT '',
  industry_en TEXT,
  industry_bn TEXT,
  service_en TEXT,
  service_bn TEXT,
  background_en TEXT,
  background_bn TEXT,
  challenge_en TEXT,
  challenge_bn TEXT,
  solution_en TEXT,
  solution_bn TEXT,
  technologies JSONB DEFAULT '[]',
  timeline_en TEXT,
  timeline_bn TEXT,
  results_en TEXT,
  results_bn TEXT,
  before_image TEXT,
  after_image TEXT,
  client_quote_en TEXT,
  client_quote_bn TEXT,
  client_role_en TEXT,
  client_role_bn TEXT,
  client_photo TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== REVIEW SETTINGS (singleton) =====================
CREATE TABLE IF NOT EXISTS review_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  moderation_enabled BOOLEAN DEFAULT false,
  allow_anonymous BOOLEAN DEFAULT false,
  min_rating_for_auto_publish INTEGER DEFAULT 4,
  notify_on_new_review BOOLEAN DEFAULT true,
  enable_video_reviews BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== LEGAL POLICIES =====================
CREATE TABLE IF NOT EXISTS legal_policies (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'privacy_policy',
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  status TEXT DEFAULT 'draft',
  version TEXT NOT NULL DEFAULT '1.0',
  effective_date TEXT NOT NULL DEFAULT '',
  last_updated TEXT,
  sections JSONB DEFAULT '[]',
  seo_title TEXT,
  seo_description TEXT,
  meta_title_en TEXT,
  meta_title_bn TEXT,
  meta_description_en TEXT,
  meta_description_bn TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  twitter_card TEXT,
  schema_markup TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== LEGAL REVISIONS =====================
CREATE TABLE IF NOT EXISTS legal_revisions (
  id TEXT PRIMARY KEY,
  policy_id TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '',
  updated_by TEXT NOT NULL DEFAULT '',
  change_summary TEXT NOT NULL DEFAULT '',
  sections JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== COOKIE CATEGORIES =====================
CREATE TABLE IF NOT EXISTS cookie_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  enabled_by_default BOOLEAN DEFAULT false,
  is_essential BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== COOKIE SETTINGS (singleton) =====================
CREATE TABLE IF NOT EXISTS cookie_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  banner_title_en TEXT NOT NULL DEFAULT '',
  banner_title_bn TEXT NOT NULL DEFAULT '',
  banner_text_en TEXT NOT NULL DEFAULT '',
  banner_text_bn TEXT NOT NULL DEFAULT '',
  enable_customize BOOLEAN DEFAULT false,
  last_updated TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== WHY CHOOSE US CARDS =====================
CREATE TABLE IF NOT EXISTS why_choose_us_cards (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  category_en TEXT,
  category_bn TEXT,
  badge_text_en TEXT,
  badge_text_bn TEXT,
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== WHY CHOOSE US STATS =====================
CREATE TABLE IF NOT EXISTS why_choose_us_stats (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label_en TEXT NOT NULL DEFAULT '',
  label_bn TEXT NOT NULL DEFAULT '',
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== WHY CHOOSE US BADGES =====================
CREATE TABLE IF NOT EXISTS why_choose_us_badges (
  id TEXT PRIMARY KEY,
  label_en TEXT NOT NULL DEFAULT '',
  label_bn TEXT NOT NULL DEFAULT '',
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== WHY CHOOSE US TECHS =====================
CREATE TABLE IF NOT EXISTS why_choose_us_techs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== WHY CHOOSE US CTA (singleton) =====================
CREATE TABLE IF NOT EXISTS why_choose_us_cta (
  id TEXT PRIMARY KEY DEFAULT 'default',
  headline_en TEXT NOT NULL DEFAULT '',
  headline_bn TEXT NOT NULL DEFAULT '',
  sub_en TEXT,
  sub_bn TEXT,
  btn1_text_en TEXT,
  btn1_text_bn TEXT,
  btn2_text_en TEXT,
  btn2_text_bn TEXT,
  note_en TEXT,
  note_bn TEXT,
  tagline_en TEXT,
  tagline_bn TEXT,
  description_en TEXT,
  description_bn TEXT,
  primary_button_text_en TEXT,
  primary_button_text_bn TEXT,
  secondary_button_text_en TEXT,
  secondary_button_text_bn TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PROCESS STEPS =====================
CREATE TABLE IF NOT EXISTS process_steps (
  id TEXT PRIMARY KEY,
  step_number TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  deliverables_en JSONB DEFAULT '[]',
  deliverables_bn JSONB DEFAULT '[]',
  estimated_duration_en TEXT NOT NULL DEFAULT '',
  estimated_duration_bn TEXT NOT NULL DEFAULT '',
  tools_used JSONB DEFAULT '[]',
  services_included_en JSONB DEFAULT '[]',
  services_included_bn JSONB DEFAULT '[]',
  animation_type TEXT DEFAULT 'fade',
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PROCESS CTA (singleton) =====================
CREATE TABLE IF NOT EXISTS process_cta (
  id TEXT PRIMARY KEY DEFAULT 'default',
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT NOT NULL DEFAULT '',
  highlight_en TEXT NOT NULL DEFAULT '',
  highlight_bn TEXT NOT NULL DEFAULT '',
  subtitle_en TEXT NOT NULL DEFAULT '',
  subtitle_bn TEXT NOT NULL DEFAULT '',
  cta_headline_en TEXT NOT NULL DEFAULT '',
  cta_headline_bn TEXT NOT NULL DEFAULT '',
  cta_subtitle_en TEXT NOT NULL DEFAULT '',
  cta_subtitle_bn TEXT NOT NULL DEFAULT '',
  cta_primary_text_en TEXT NOT NULL DEFAULT '',
  cta_primary_text_bn TEXT NOT NULL DEFAULT '',
  cta_secondary_text_en TEXT NOT NULL DEFAULT '',
  cta_secondary_text_bn TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== TECH SERVICE CARDS =====================
CREATE TABLE IF NOT EXISTS tech_service_cards (
  id TEXT PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  category_bn TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_bn TEXT NOT NULL DEFAULT '',
  technologies JSONB DEFAULT '[]',
  project_count TEXT NOT NULL DEFAULT '',
  popular_projects_en JSONB DEFAULT '[]',
  popular_projects_bn JSONB DEFAULT '[]',
  benefits_en JSONB DEFAULT '[]',
  benefits_bn JSONB DEFAULT '[]',
  experience_level_en TEXT NOT NULL DEFAULT '',
  experience_level_bn TEXT NOT NULL DEFAULT '',
  featured_badge_en TEXT,
  featured_badge_bn TEXT,
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  animation_type TEXT DEFAULT 'fade',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== CLIENT MOMENTS =====================
CREATE TABLE IF NOT EXISTS client_moments (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT,
  client_name TEXT,
  company TEXT,
  image_url TEXT NOT NULL DEFAULT '',
  description_en TEXT,
  description_bn TEXT,
  display_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRODUCTS =====================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL DEFAULT '',
  title_bn TEXT,
  slug TEXT NOT NULL DEFAULT '',
  description_en TEXT,
  description_bn TEXT,
  price NUMERIC DEFAULT 0,
  cost NUMERIC DEFAULT 0,
  category TEXT,
  subcategory TEXT,
  stock INTEGER DEFAULT 0,
  sold INTEGER DEFAULT 0,
  image TEXT,
  images JSONB DEFAULT '[]',
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== PRODUCT IMAGES =====================
CREATE TABLE IF NOT EXISTS product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================== INDEXES =====================
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_status ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_pricing_packages_category ON pricing_packages(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_deleted_at ON portfolio_items(deleted_at);
CREATE INDEX IF NOT EXISTS idx_services_deleted_at ON services(deleted_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_deleted_at ON blog_posts(deleted_at);
CREATE INDEX IF NOT EXISTS idx_products_deleted_at ON products(deleted_at);

-- ===================== ENABLE ROW LEVEL SECURITY =====================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cookie_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_techs ENABLE ROW LEVEL SECURITY;
ALTER TABLE why_choose_us_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_service_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- ===================== RLS POLICIES =====================
-- Allow public read access to published/visible data
-- Allow service_role full access (bypasses RLS automatically)

-- Public can read published services
CREATE POLICY "Public read services" ON services FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Admin all services" ON services FOR ALL USING (true) WITH CHECK (true);

-- Public can read published portfolio
CREATE POLICY "Public read portfolio" ON portfolio_items FOR SELECT USING (deleted_at IS NULL AND status = 'published');
CREATE POLICY "Admin all portfolio" ON portfolio_items FOR ALL USING (true) WITH CHECK (true);

-- Public can read published blogs
CREATE POLICY "Public read blogs" ON blog_posts FOR SELECT USING (deleted_at IS NULL AND status = 'published');
CREATE POLICY "Admin all blogs" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

-- Public read FAQs
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Admin all faqs" ON faqs FOR ALL USING (true) WITH CHECK (true);

-- Public read testimonials
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (status IN ('approved', 'featured'));
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);

-- Contact messages: admin only
CREATE POLICY "Admin all messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Newsletter subscribers: public insert, admin read/delete
CREATE POLICY "Public insert subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all subscribers" ON newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

-- Site settings: public read, admin write
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin all settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Pricing: public read enabled packages
CREATE POLICY "Public read pricing" ON pricing_packages FOR SELECT USING (enabled = true);
CREATE POLICY "Admin all pricing" ON pricing_packages FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read addons" ON pricing_addons FOR SELECT USING (enabled = true);
CREATE POLICY "Admin all addons" ON pricing_addons FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read comparisons" ON pricing_comparisons FOR SELECT USING (true);
CREATE POLICY "Admin all comparisons" ON pricing_comparisons FOR ALL USING (true) WITH CHECK (true);

-- Quote requests: admin only
CREATE POLICY "Admin all quotes" ON pricing_quote_requests FOR ALL USING (true) WITH CHECK (true);

-- Currencies: public read enabled
CREATE POLICY "Public read currencies" ON currencies FOR SELECT USING (enabled = true);
CREATE POLICY "Admin all currencies" ON currencies FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read currency_settings" ON currency_settings FOR SELECT USING (true);
CREATE POLICY "Admin all currency_settings" ON currency_settings FOR ALL USING (true) WITH CHECK (true);

-- Testimonial sub-tables: public read, admin all
CREATE POLICY "Public read testimonial_categories" ON testimonial_categories FOR SELECT USING (true);
CREATE POLICY "Admin all testimonial_categories" ON testimonial_categories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read testimonial_videos" ON testimonial_videos FOR SELECT USING (true);
CREATE POLICY "Admin all testimonial_videos" ON testimonial_videos FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read testimonial_statistics" ON testimonial_statistics FOR SELECT USING (true);
CREATE POLICY "Admin all testimonial_statistics" ON testimonial_statistics FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read client_logos" ON client_logos FOR SELECT USING (true);
CREATE POLICY "Admin all client_logos" ON client_logos FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read success_stories" ON success_stories FOR SELECT USING (true);
CREATE POLICY "Admin all success_stories" ON success_stories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read review_settings" ON review_settings FOR SELECT USING (true);
CREATE POLICY "Admin all review_settings" ON review_settings FOR ALL USING (true) WITH CHECK (true);

-- Legal: public read published
CREATE POLICY "Public read legal" ON legal_policies FOR SELECT USING (status = 'published');
CREATE POLICY "Admin all legal" ON legal_policies FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin all revisions" ON legal_revisions FOR ALL USING (true) WITH CHECK (true);

-- Cookie
CREATE POLICY "Public read cookie_categories" ON cookie_categories FOR SELECT USING (true);
CREATE POLICY "Admin all cookie_categories" ON cookie_categories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read cookie_settings" ON cookie_settings FOR SELECT USING (true);
CREATE POLICY "Admin all cookie_settings" ON cookie_settings FOR ALL USING (true) WITH CHECK (true);

-- Why Choose Us
CREATE POLICY "Public read wcu_cards" ON why_choose_us_cards FOR SELECT USING (visible = true);
CREATE POLICY "Admin all wcu_cards" ON why_choose_us_cards FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read wcu_stats" ON why_choose_us_stats FOR SELECT USING (visible = true);
CREATE POLICY "Admin all wcu_stats" ON why_choose_us_stats FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read wcu_badges" ON why_choose_us_badges FOR SELECT USING (visible = true);
CREATE POLICY "Admin all wcu_badges" ON why_choose_us_badges FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read wcu_techs" ON why_choose_us_techs FOR SELECT USING (visible = true);
CREATE POLICY "Admin all wcu_techs" ON why_choose_us_techs FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read wcu_cta" ON why_choose_us_cta FOR SELECT USING (true);
CREATE POLICY "Admin all wcu_cta" ON why_choose_us_cta FOR ALL USING (true) WITH CHECK (true);

-- Process
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (visible = true);
CREATE POLICY "Admin all process_steps" ON process_steps FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read process_cta" ON process_cta FOR SELECT USING (true);
CREATE POLICY "Admin all process_cta" ON process_cta FOR ALL USING (true) WITH CHECK (true);

-- Tech service cards
CREATE POLICY "Public read tech_service_cards" ON tech_service_cards FOR SELECT USING (visible = true);
CREATE POLICY "Admin all tech_service_cards" ON tech_service_cards FOR ALL USING (true) WITH CHECK (true);

-- Client moments
CREATE POLICY "Public read client_moments" ON client_moments FOR SELECT USING (visible = true);
CREATE POLICY "Admin all client_moments" ON client_moments FOR ALL USING (true) WITH CHECK (true);

-- Products
CREATE POLICY "Public read products" ON products FOR SELECT USING (deleted_at IS NULL AND status = 'published');
CREATE POLICY "Admin all products" ON products FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin all product_images" ON product_images FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- DONE! Tables created and RLS policies applied.
-- Next: Visit /api/seed to populate with initial data.
-- =============================================================================
