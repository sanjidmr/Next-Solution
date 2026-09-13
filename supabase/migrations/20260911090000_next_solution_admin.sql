-- Next Solution Agency - Supabase Database Schema & RLS Migration
-- Migration: 20260911090000_next_solution_admin.sql
-- Covers: Projects, Leads, User Roles, Storage, RLS Policies, and Initial Seeds

-- 1. Enable UUID Extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Roles Table (Admin Authorization)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
        OR (auth.jwt() ->> 'email') = 'mushfiqurrahmansanjid@gmail.com'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for user_roles
DO $$ BEGIN
    DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
    CREATE POLICY "Admins can view roles"
    ON public.user_roles FOR SELECT
    TO authenticated
    USING (public.is_admin() OR user_id = auth.uid());
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_title TEXT,
    number TEXT NOT NULL DEFAULT '01',
    category TEXT NOT NULL DEFAULT 'Web',
    category_label TEXT,
    service_name TEXT,
    service_id TEXT,
    client TEXT,
    year TEXT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::TEXT,
    location TEXT DEFAULT 'Global',
    tagline TEXT,
    short_description TEXT,
    description TEXT,
    challenge TEXT,
    approach TEXT,
    solution TEXT,
    result TEXT,
    outcomes TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    services TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    hero_image TEXT,
    cover_image TEXT,
    thumbnail_image TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    website_url TEXT,
    project_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);

-- Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Projects RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
    CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    TO public
    USING (published = true);

    DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
    CREATE POLICY "Admins can view all projects"
    ON public.projects FOR SELECT
    TO authenticated
    USING (public.is_admin());

    DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
    CREATE POLICY "Admins can insert projects"
    ON public.projects FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

    DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
    CREATE POLICY "Admins can update projects"
    ON public.projects FOR UPDATE
    TO authenticated
    USING (public.is_admin());

    DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
    CREATE POLICY "Admins can delete projects"
    ON public.projects FOR DELETE
    TO authenticated
    USING (public.is_admin());
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 4. Leads Table (Client Contact Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id TEXT UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    disciplines TEXT[] DEFAULT '{}',
    budget TEXT,
    timeline TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON public.leads;
CREATE TRIGGER trigger_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Leads RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public can submit contact inquiries" ON public.leads;
    CREATE POLICY "Public can submit contact inquiries"
    ON public.leads FOR INSERT
    TO public
    WITH CHECK (true);

    DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
    CREATE POLICY "Admins can view leads"
    ON public.leads FOR SELECT
    TO authenticated
    USING (public.is_admin());

    DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
    CREATE POLICY "Admins can update leads"
    ON public.leads FOR UPDATE
    TO authenticated
    USING (public.is_admin());

    DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
    CREATE POLICY "Admins can delete leads"
    ON public.leads FOR DELETE
    TO authenticated
    USING (public.is_admin());
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 5. Supabase Storage Bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Public Access for Project Images" ON storage.objects;
    CREATE POLICY "Public Access for Project Images"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'project-images');

    DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
    CREATE POLICY "Admins can upload project images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'project-images' AND public.is_admin());

    DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
    CREATE POLICY "Admins can update project images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'project-images' AND public.is_admin());

    DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
    CREATE POLICY "Admins can delete project images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'project-images' AND public.is_admin());
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 6. Initial Seed Data from Existing Showcase Projects
INSERT INTO public.projects (
    slug, title, short_title, number, category, category_label, service_name, service_id,
    client, year, location, tagline, description, challenge, solution,
    outcomes, deliverables, technologies, hero_image, cover_image, gallery_images,
    website_url, featured, published, display_order, seo_title, seo_description
) VALUES
(
    'aura-neural',
    'AURA NEURAL LABS',
    'Aura Neural',
    '01',
    'Web',
    'Web Architecture / AI Interface',
    'Web Development',
    'web-development',
    'Aura Intelligence Ltd.',
    '2025',
    'San Francisco / Global',
    'Translating complex neural models into an intuitive spatial web canvas.',
    'Aura Neural is an international deep-tech research initiative developing foundational perceptual AI models. Next Solution architected their global digital ecosystem, integrating high-performance WebGL visualizations with a modular developer documentation hub.',
    'Aura needed a digital presence that established instant credibility with top academic researchers and enterprise partners, while presenting highly technical tensor concepts without overwhelming non-technical venture leaders.',
    'We constructed an interactive mathematical web canvas using reactive vector nodes and dark-mode high-contrast typography, reducing bounce rates and doubling enterprise pilot inquiry conversion within 60 days.',
    ARRAY['+184% inbound enterprise research inquiries', '0.48s global average Largest Contentful Paint', 'Featured in Awwwards Site of the Day'],
    ARRAY['Custom Web Platform', 'Interactive Visualizer', 'Design System', 'Technical Documentation UI'],
    ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Canvas API', 'Vite'],
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'],
    'https://auraneural.example.com',
    true,
    true,
    1,
    'Aura Neural Labs — AI Architecture & Web Platform | Next Solution',
    'Case study of Aura Neural Labs perceptual AI interface engineering and spatial web platform by Next Solution.'
),
(
    'monolith-atelier',
    'MONOLITH ATELIER',
    'Monolith Atelier',
    '02',
    'Branding',
    'Identity / Spatial Motion / Web',
    'Graphic Design & Branding',
    'graphic-design',
    'Monolith Architectural Studio',
    '2025',
    'Tokyo / Zurich',
    'Brutal minimalism meets luxury material craftsmanship.',
    'An uncompromising visual identity and bespoke digital portfolio for a Tokyo and Zurich based architectural firm known for raw concrete monolithic private residences.',
    'The client required an experience that communicated total spatial restraint, eliminating conventional web chrome in favor of expansive photography and architectural cadence.',
    'We engineered an asymmetrical editorial layout with micro-staggered typography, bespoke monospaced grid markers, and seamless full-bleed project transitions reflecting architectural elevations.',
    ARRAY['Secured 4 international private estate commissions in Q1', 'Average session duration increased to 4m 15s', 'Won European Design Award'],
    ARRAY['Brand Identity', 'Custom Typography Pairing', 'Editorial Monograph Web System', 'Video Trailer'],
    ARRAY['TypeScript', 'Motion', 'Vite', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'],
    'https://monolith-atelier.example.com',
    true,
    true,
    2,
    'Monolith Atelier — Luxury Architecture Identity & Digital Monograph | Next Solution',
    'Editorial brand identity and digital portfolio showcase for Monolith Atelier by Next Solution.'
),
(
    'vertex-protocol',
    'VERTEX PROTOCOL',
    'Vertex Protocol',
    '03',
    'Product',
    'FinTech UX / Product Innovation',
    'UI/UX Design',
    'ui-ux-design',
    'Vertex Financial Group',
    '2024',
    'London / Singapore',
    'Next-generation institutional liquidity terminal engineered for instant execution.',
    'Vertex provides high-frequency algorithmic liquidity for global currency pairs. Next Solution designed and prototyped their real-time desktop web terminal and responsive mobile execution interface.',
    'Institutional traders demand sub-50 millisecond data rendering, dense multi-pane telemetry, and zero visual cognitive friction during volatile market conditions.',
    'We designed a low-contrast ergonomic dark interface with mathematically derived typographic scales, instant keyboard navigation shortcuts, and ultra-lightweight rendering primitives.',
    ARRAY['$4.2B daily trading volume routed through the redesigned interface', 'Zero user misclicks reported in institutional trader pilot', 'Design system adopted across 8 global trading desks'],
    ARRAY['Trading Terminal UX/UI', 'High-Density Design System', 'Component Codebook', 'Mobile Companion App'],
    ARRAY['React', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'],
    'https://vertex-protocol.example.com',
    true,
    true,
    3,
    'Vertex Protocol — Institutional Trading Terminal UX | Next Solution',
    'High-frequency trading terminal interface and design system case study by Next Solution.'
),
(
    'chrono-audio',
    'CHRONO ACOUSTICS',
    'Chrono Acoustics',
    '04',
    'Video',
    'Cinematic Launch / 3D Spatial Audio',
    'Video Editing & Motion',
    'video-editing',
    'Chrono Labs Stockholm',
    '2024',
    'Stockholm',
    'Cinematic sound design for zero-latency studio monitors.',
    'Chrono Acoustics crafts studio-grade reference monitors for mastering engineers. Next Solution produced their global launch film, product reveal trailers, and interactive web audio sandbox.',
    'Capturing the emotional purity of planar magnetic acoustics on digital screens without physical tactile demonstration.',
    'We directed a high-contrast macro film exploring brushed titanium driver housings, paired with synchronized interactive frequency audio sweeps right on the web canvas.',
    ARRAY['First production batch sold out in under 9 minutes', '1.4M organic YouTube views on the cinematic product reveal film', 'Nominated for Best Commercial Craft at Ciclope Festival'],
    ARRAY['4K Hero Launch Film', 'Product Teaser Sequences', 'Spatial Sound Identity', '3D Interactive Product Page'],
    ARRAY['DaVinci Resolve', 'Cinema 4D', 'Ableton Live', 'React 19'],
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop'],
    'https://chrono-acoustics.example.com',
    true,
    true,
    4,
    'Chrono Acoustics — Cinematic Launch & Spatial Sound | Next Solution',
    'Cinematic motion, sound design, and product launch film case study by Next Solution.'
),
(
    'valkyrie-os',
    'VALKYRIE DEFENSE OS',
    'Valkyrie OS',
    '05',
    'UI/UX',
    'Autonomous Systems / Mission Control',
    'UI/UX Design',
    'ui-ux-design',
    'Valkyrie Autonomous Dynamics',
    '2024',
    'Munich',
    'Mission critical telemetry interface for autonomous aerospace fleets.',
    'Valkyrie builds AI-directed flight management for defense and emergency logistics. Next Solution architected the multi-monitor ground station control UI and ruggedized tablet interface.',
    'Extreme operational reliability under high-stress pilot conditions where split-second decision latency is non-negotiable.',
    'High-contrast tactical vector graphics, strict color-coded threat hierarchies, and tactile haptic confirmation states guaranteeing operational clarity in degraded visibility.',
    ARRAY['Standardized across 14 defense contractor command stations', 'Zero critical user errors recorded during extreme weather simulation trials', '35% reduction in operator cognitive fatigue scores'],
    ARRAY['Command Station Multi-Screen UI', 'Ruggedized Mobile Interface', 'Design System Specification', 'Tactical Iconography Set'],
    ARRAY['TypeScript', 'WebGL', 'Vector Engines', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1517976487502-570a256a008c?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'],
    'https://valkyrie-os.example.com',
    true,
    true,
    5,
    'Valkyrie Defense OS — Mission Critical Command Interface | Next Solution',
    'Autonomous aerospace telemetry and command control interface design by Next Solution.'
),
(
    'solis-energy',
    'SOLIS BIFACIAL ENERGY',
    'Solis Energy',
    '06',
    'Marketing',
    'CleanTech Growth / Inbound Funnel',
    'Marketing & PR/AI Services',
    'marketing-pr-ai',
    'Solis Clean Energy Partners',
    '2024',
    'Denver / Austin',
    'Algorithmic inbound acquisition engine for commercial solar microgrids.',
    'Solis finances and installs utility-scale commercial solar arrays. Next Solution deployed an algorithmic inbound capture system, interactive ROI feasibility calculator, and targeted enterprise digital PR campaigns.',
    'Commercial real estate CFOs were skeptical of conventional solar marketing pitches and demanded verifiable capital expenditure payoff modeling before agreeing to initial discovery consultations.',
    'We developed a real-time satellite solar irradiation yield calculator based on commercial building square footage, paired with an automated account-based marketing workflow that pre-qualified prospective enterprise leads.',
    ARRAY['$18.4M in closed-won commercial installation contracts generated', '3.8x increase in qualified enterprise CFO discovery consultations', 'Winner of CleanTech Inbound Growth Initiative of the Year'],
    ARRAY['Interactive Solar Yield Calculator', 'Inbound Lead Acceleration Funnel', 'Algorithmic PR Sequences', 'Enterprise Investor Presentation Deck'],
    ARRAY['React 19', 'Mapbox API', 'Algorithmic Modeling', 'Tailwind CSS'],
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop',
    ARRAY['https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop'],
    'https://solis-energy.example.com',
    true,
    true,
    6,
    'Solis Energy — CleanTech Growth Engine & Yield Modeling | Next Solution',
    'Commercial clean energy inbound acquisition engine and interactive yield modeling by Next Solution.'
)
ON CONFLICT (slug) DO NOTHING;
