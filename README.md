# Next Solution — Digital Agency

Enterprise-grade digital agency website built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Supabase**.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase account (for production features)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd next-solution

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_BOOTSTRAP_EMAIL=admin@nextsolution.co
ADMIN_BOOTSTRAP_PASSWORD=your-strong-password
```

The app works **without Supabase** in development mode using localStorage fallback. All data persists in the browser.

## Supabase Setup

### 1. Create a Supabase Project

Go to [supabase.com](https://supabase.com) and create a new project.

### 2. Run Migrations

The migration files are in `supabase/migrations/`. Run them in order:

1. `20260715000001_extensions_and_enums.sql` — Extensions and enums
2. `20260715000002_core_profiles_and_audit.sql` — Profiles and audit tables
3. `20260715000003_cms_content_tables.sql` — All CMS content tables
4. `20260715000004_rls_and_policies.sql` — Row Level Security policies

You can run these via the Supabase SQL editor or the CLI:

```bash
supabase db push
```

### 3. Configure Authentication

1. Go to **Authentication → Providers** in Supabase dashboard
2. Enable **Email** auth (default)
3. (Optional) Enable **Google** auth and configure OAuth credentials
4. Set Site URL: `http://localhost:3000`
5. Add redirect URLs: `http://localhost:3000/auth/callback`

### 4. Bootstrap Admin User

After migrations are applied, make a GET request to:

```
GET /api/bootstrap
```

This creates the first super admin user using the `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` env vars.

### 5. Storage Buckets

Create the following storage buckets in the Supabase dashboard:

- `team` — Team member photos
- `portfolio` — Portfolio project images
- `blogs` — Blog post images
- `services` — Service icons/images
- `reviews` — Testimonial avatars
- `logos` — Client logo images
- `hero` — Hero section backgrounds
- `uploads` — General uploads
- `media` — Media library

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard & login
│   ├── about/              # About page
│   ├── blog/               # Blog listing & posts
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── legal/              # Legal pages (privacy, terms, cookies)
│   ├── portfolio/          # Portfolio page
│   ├── pricing/            # Pricing page
│   ├── reviews/            # Reviews page
│   ├── services/           # Services page
│   ├── api/                # API routes
│   └── auth/               # Auth routes (callback, reset password)
├── actions/                # Server Actions
├── components/             # React components
├── config/                 # App configuration
├── data/                   # Static data & translations
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & services
│   ├── supabase/           # Supabase client config
│   └── schema.ts           # JSON-LD schema generators
├── providers/              # React context providers
├── repositories/           # Data access layer
├── services/               # Business logic layer
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── validators/             # Zod validation schemas
└── supabase/               # Supabase config & migrations
```

## Features

- **Bilingual** — English/Bengali (bn) with full RTL support readiness
- **Dark/Light** — Theme toggle (pre-configured)
- **SEO Optimized** — Metadata API, OpenGraph, Twitter Cards, JSON-LD schemas
- **Admin Panel** — Full CRUD for all content types
- **Supabase Auth** — Email/password + Google OAuth
- **RLS** — Row Level Security for all tables
- **Responsive** — Mobile-first, pixel-perfect across all devices
- **Performance** — Server Components, Suspense, streaming, image optimization

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Set all environment variables in the Vercel dashboard. The `vercel.json` is pre-configured with security headers.

## License

All rights reserved. This project is proprietary software.
