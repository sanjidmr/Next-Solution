/**
 * Default/fallback pricing content for the agency.
 * Loaded by the /pricing page when the Supabase tables are empty, and seeded
 * into the database by /api/seed. Everything here is fully editable from the
 * admin panel (Pricing Management).
 */
import { ProjectPricing, MonthlyPricing, AgencyPackage } from "@/types";

export const initialProjectPricing: ProjectPricing[] = [
  // ----------------------------------------------------------------- WEB
  { id: "10000000-0000-4000-8000-000000000001", service: "Web Development", projectType: "Landing Page Website", price: 499, currency: "USD", billingType: "one-time", delivery: "5-7 business days", revisions: "3 revision rounds", support: "30 days support", features: ["Single-page responsive design", "Conversion-focused sections", "Mobile & tablet optimized", "Basic on-page SEO setup", "Contact form integration", "Social links & Google Maps"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000002", service: "Web Development", projectType: "Portfolio Website", price: 599, currency: "USD", billingType: "one-time", delivery: "5-8 business days", revisions: "3 revision rounds", support: "30 days support", features: ["Multiple pages", "Portfolio / gallery section", "Team & about sections", "Blog-ready structure", "Contact form integration", "Responsive design"], recommended: false, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000003", service: "Web Development", projectType: "Business Website", price: 799, currency: "USD", billingType: "one-time", delivery: "7-10 business days", revisions: "4 revision rounds", support: "30 days support", features: ["Up to 8 pages", "Custom UI within brand style", "Services showcase", "Testimonials gallery", "About us + FAQ pages", "Google Analytics setup", "Basic SEO structure"], recommended: true, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000004", service: "Web Development", projectType: "Corporate Website", price: 1299, currency: "USD", billingType: "one-time", delivery: "2-3 weeks", revisions: "5 revision rounds", support: "45 days support", features: ["Up to 15 pages", "Custom design system", "News / blog section", "Careers & contact pages", "Advanced forms", "Multi-language ready", "Speed & SEO optimization"], recommended: false, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000005", service: "Web Development", projectType: "E-Commerce Website", price: 1799, currency: "USD", billingType: "one-time", delivery: "3-4 weeks", revisions: "6 revision rounds", support: "60 days support", features: ["Product catalog & variants", "Shopping cart & checkout", "Secure payment gateway", "Order management dashboard", "Customer accounts", "Inventory-ready setup", "Conversion optimization"], recommended: false, enabled: true, sortOrder: 5 },
  { id: "10000000-0000-4000-8000-000000000006", service: "Web Development", projectType: "Custom Web Application", price: 3500, currency: "USD", billingType: "one-time", delivery: "4-6 weeks", revisions: "Dedicated scoping", support: "90 days support", features: ["Custom logic & workflows", "User authentication & roles", "Dashboard & data views", "Third-party integrations", "Database design & setup", "Cloud deployment", "Admin management panel"], recommended: false, enabled: true, sortOrder: 6 },

  // ------------------------------------------------------------- UI/UX
  { id: "10000000-0000-4000-8000-000000000007", service: "UI/UX Design", projectType: "Landing Page UI/UX", price: 349, currency: "USD", billingType: "one-time", delivery: "3-5 business days", revisions: "3 revision rounds", support: "15 days support", features: ["Wireframes & user flow", "High-fidelity desktop design", "Mobile responsive layouts", "Brand-aligned visual kit", "Design handoff (Figma)", "Developer-ready specs"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000008", service: "UI/UX Design", projectType: "Website UI/UX", price: 599, currency: "USD", billingType: "one-time", delivery: "5-8 business days", revisions: "4 revision rounds", support: "30 days support", features: ["Up to 8 page designs", "UX research & competitor review", "Wireframes & prototypes", "Complete design system", "Interactive prototype", "Developer-ready specs"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000009", service: "UI/UX Design", projectType: "Mobile App UI/UX", price: 899, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "4 revision rounds", support: "30 days support", features: ["iOS & Android screens", "User flows & journey maps", "Interactive prototype", "Component-based design system", "Accessibility best practices", "Developer handoff"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000010", service: "UI/UX Design", projectType: "Dashboard / SaaS UI/UX", price: 1199, currency: "USD", billingType: "one-time", delivery: "2-3 weeks", revisions: "5 revision rounds", support: "45 days support", features: ["Information architecture", "Dashboard & reports design", "Data visualization", "Multi-role interfaces", "Design system & tokens", "Interactive prototype"], recommended: false, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000011", service: "UI/UX Design", projectType: "Complete Product UI/UX", price: 2499, currency: "USD", billingType: "one-time", delivery: "3-4 weeks", revisions: "Dedicated design sprints", support: "60 days support", features: ["Full product design", "UX strategy & research", "Wireframes to final screens", "Complete design system", "Usability testing", "Developer handoff & QA"], recommended: false, enabled: true, sortOrder: 5 },

  // ------------------------------------------------------- Graphic Design
  { id: "10000000-0000-4000-8000-000000000012", service: "Graphic Design", projectType: "Logo Design", price: 149, currency: "USD", billingType: "one-time", delivery: "3-5 business days", revisions: "3 concept options", support: "30 days support", features: ["3 unique concepts", "Unlimited redraw rounds", "Vector files (AI/SVG)", "All color variants", "Transparent PNG files", "Logo usage guide"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000013", service: "Graphic Design", projectType: "Brand Identity", price: 499, currency: "USD", billingType: "one-time", delivery: "7-10 business days", revisions: "4 revision rounds", support: "30 days support", features: ["Logo + variations", "Color palette system", "Typography pairing", "Business card design", "Letterhead & envelope", "Brand guideline sheet"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000014", service: "Graphic Design", projectType: "Social Media Design", price: 299, currency: "USD", billingType: "one-time", delivery: "5-7 business days", revisions: "3 revision rounds", support: "30 days support", features: ["Post & story templates", "Banner & cover designs", "Ad creative designs", "Icon & sticker sets", "Reusable template kit", "Brand consistency"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000015", service: "Graphic Design", projectType: "Marketing Design Package", price: 399, currency: "USD", billingType: "one-time", delivery: "5-8 business days", revisions: "3 revision rounds", support: "30 days support", features: ["Flyer & brochure design", "Poster & banner designs", "Ad creatives", "Email header design", "Presentation deck design", "Print-ready files"], recommended: false, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000016", service: "Graphic Design", projectType: "Complete Branding", price: 899, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "5 revision rounds", support: "45 days support", features: ["Full identity system", "Logo & submarks", "Stationery & packaging", "Social media kit", "Brand guidelines document", "All source files"], recommended: false, enabled: true, sortOrder: 5 },

  // -------------------------------------------------------- Video Editing
  { id: "10000000-0000-4000-8000-000000000017", service: "Video Editing", projectType: "Short-Form Video", price: 99, currency: "USD", billingType: "one-time", delivery: "2-3 business days", revisions: "2 revision rounds", support: "7 days support", features: ["Up to 60s video", "Transitions & effects", "Color grading", "Licensed music & SFX", "Captions & subtitles", "Multiple aspect ratios"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000018", service: "Video Editing", projectType: "Reels / Shorts Package", price: 129, currency: "USD", billingType: "one-time", delivery: "2-4 business days", revisions: "2 revision rounds", support: "7 days support", features: ["Up to 90s reel/short", "Hook & retention edits", "Trending captions", "Sound design", "Cover thumbnails", "Platform-ready export"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000019", service: "Video Editing", projectType: "YouTube Video", price: 199, currency: "USD", billingType: "one-time", delivery: "3-5 business days", revisions: "3 revision rounds", support: "14 days support", features: ["Up to 15 min video", "Story-driven assembly", "Motion graphics intro", "Color correction & grading", "Thumbnail design", "SEO description & tags"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000020", service: "Video Editing", projectType: "Promotional Video", price: 349, currency: "USD", billingType: "one-time", delivery: "5-7 business days", revisions: "3 revision rounds", support: "14 days support", features: ["Up to 3 min video", "Script & storyboard help", "Branded motion graphics", "Voice-over sync", "Music & sound mixing", "Package deliverable loops"], recommended: false, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000021", service: "Video Editing", projectType: "Corporate Film Editing", price: 599, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "4 revision rounds", support: "30 days support", features: ["Up to 8 min film", "Multi-camera assembly", "Advanced color grading", "Custom graphics package", "Interview & b-roll pacing", "Subtitles & translations"], recommended: false, enabled: true, sortOrder: 5 },

  // --------------------------------------------------- Digital Marketing
  { id: "10000000-0000-4000-8000-000000000022", service: "Digital Marketing", projectType: "Campaign Setup", price: 399, currency: "USD", billingType: "one-time", delivery: "5-7 business days", revisions: "Setup & optimize", support: "30 days support", features: ["Audience & platform research", "Campaign structure setup", "Pixel & tracking installation", "Ad copy & creative brief", "Budget allocation plan", "Reporting dashboard setup"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000023", service: "Digital Marketing", projectType: "Paid Ads Setup", price: 599, currency: "USD", billingType: "one-time", delivery: "5-8 business days", revisions: "Setup & optimize", support: "30 days support", features: ["Google & Meta ads setup", "Keyword & audience targeting", "Conversion tracking", "Ad creatives & copy", "A/B testing framework", "30-day optimization"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000024", service: "Digital Marketing", projectType: "Marketing Strategy", price: 899, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "Strategy sessions", support: "45 days support", features: ["Full marketing audit", "Buyer persona development", "Channel strategy & mix", "Content & budget plan", "KPI framework", "90-day roadmap"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000025", service: "Digital Marketing", projectType: "Complete Campaign Management Setup", price: 1499, currency: "USD", billingType: "one-time", delivery: "2 weeks", revisions: "Full setup", support: "60 days support", features: ["Multi-channel campaigns", "Landing page setup", "Sales funnel architecture", "Automation & retargeting", "Analytics & attribution", "Monthly reporting"], recommended: false, enabled: true, sortOrder: 4 },

  // ----------------------------------------------------------- AI Services
  { id: "10000000-0000-4000-8000-000000000026", service: "AI Services", projectType: "AI Chatbot", price: 899, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "4 training rounds", support: "30 days support", features: ["Website/WhatsApp chatbot", "Custom knowledge base", "10+ industry intents", "Human handover rules", "Analytics dashboard", "Hosting & deployment"], recommended: true, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000027", service: "AI Services", projectType: "AI Integration", price: 699, currency: "USD", billingType: "one-time", delivery: "1 week", revisions: "3 integration rounds", support: "30 days support", features: ["Connect AI to business tools", "Existing app integration", "Data sync & automation", "Custom prompts", "Testing & QA", "Documentation & training"], recommended: false, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000028", service: "AI Services", projectType: "AI Customer Support Agent", price: 1299, currency: "USD", billingType: "one-time", delivery: "2 weeks", revisions: "5 training rounds", support: "45 days support", features: ["AI support agent setup", "FAQ & product training", "Ticket integration (Zendesk etc.)", "Escalation to humans", "Multilingual support", "Performance analytics"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000029", service: "AI Services", projectType: "AI Workflow Automation", price: 1799, currency: "USD", billingType: "one-time", delivery: "2-3 weeks", revisions: "5 automation rounds", support: "60 days support", features: ["Process audit & mapping", "Custom automation design", "Tool integrations (Zapier etc.)", "Human-in-the-loop checks", "Error handling & logging", "Team training"], recommended: false, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000030", service: "AI Services", projectType: "Custom AI Agent", price: 3999, currency: "USD", billingType: "one-time", delivery: "4-6 weeks", revisions: "Dedicated build sprints", support: "90 days support", features: ["Custom AI agent development", "Custom API integrations", "Data pipelines & vector DBs", "Advanced reasoning workflows", "Security & access controls", "Deployment & maintenance"], recommended: false, enabled: true, sortOrder: 5 },

  // ---------------------------------------------------------------- SEO
  { id: "10000000-0000-4000-8000-000000000031", service: "SEO", projectType: "SEO Audit", price: 349, currency: "USD", billingType: "one-time", delivery: "5-7 business days", revisions: "1 review session", support: "14 days support", features: ["Full technical audit", "On-page & content audit", "Backlink analysis", "Competitor comparison", "Priority action plan", "Executive summary"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "10000000-0000-4000-8000-000000000032", service: "SEO", projectType: "Local SEO Setup", price: 449, currency: "USD", billingType: "one-time", delivery: "1 week", revisions: "Setup & optimize", support: "30 days support", features: ["Google Business Profile setup", "Local citations & directories", "NAP consistency audit", "Local keyword targeting", "Review strategy setup", "Maps & geo tracking"], recommended: false, enabled: true, sortOrder: 2 },
  { id: "10000000-0000-4000-8000-000000000033", service: "SEO", projectType: "Technical SEO Setup", price: 599, currency: "USD", billingType: "one-time", delivery: "1 week", revisions: "Setup & optimize", support: "30 days support", features: ["Site speed optimization", "Crawl & index fixes", "Schema markup", "Sitemap & robots setup", "Core Web Vitals", "HTTPS & redirect audit"], recommended: false, enabled: true, sortOrder: 3 },
  { id: "10000000-0000-4000-8000-000000000034", service: "SEO", projectType: "On-Page SEO", price: 749, currency: "USD", billingType: "one-time", delivery: "1-2 weeks", revisions: "3 optimization rounds", support: "30 days support", features: ["Keyword research & mapping", "Title/meta optimization", "Content optimization", "Internal linking plan", "Header & image SEO", "Ranking tracking setup"], recommended: true, enabled: true, sortOrder: 4 },
  { id: "10000000-0000-4000-8000-000000000035", service: "SEO", projectType: "Complete SEO Setup", price: 1299, currency: "USD", billingType: "one-time", delivery: "2-3 weeks", revisions: "Full optimization", support: "45 days support", features: ["Everything in audit + fixes", "Technical + on-page + local SEO", "Content gap filling", "Backlink foundation", "Analytics & Search Console", "90-day growth roadmap"], recommended: false, enabled: true, sortOrder: 5 },
];

export const initialMonthlyPricing: MonthlyPricing[] = [
  { id: "20000000-0000-4000-8000-000000000001", planName: "Social Media Management", service: "Digital Marketing", description: "Consistent daily social media management with on-brand creatives, scheduling and monthly reporting.", price: 449, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["12 posts per month", "Captions & hashtags", "Community management", "Monthly performance report"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "20000000-0000-4000-8000-000000000002", planName: "Growth Marketing", service: "Digital Marketing", description: "Results-driven growth: content, social, email and retargeting managed together each month.", price: 599, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Content calendar & publishing", "Paid ads management", "Email campaigns", "Landing page A/B tests", "Monthly strategy call", "Funnel reporting"], recommended: false, enabled: true, sortOrder: 2 },
  { id: "20000000-0000-4000-8000-000000000003", planName: "Complete Marketing Care", service: "Digital Marketing", description: "Full-funnel digital marketing handled end-to-end by a dedicated growth pod every month.", price: 999, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Everything in Growth", "SEO content & outreach", "Multi-channel campaigns", "Conversion rate optimization", "Bi-weekly reviews", "Dedicated account manager"], recommended: true, enabled: true, sortOrder: 3 },
  { id: "20000000-0000-4000-8000-000000000004", planName: "Growth SEO", service: "SEO", description: "Monthly on-page optimization and content that steadily lifts organic rankings.", price: 399, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Keyword tracking", "Content updates", "Technical fixes", "Internal linking", "Monthly rank report"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "20000000-0000-4000-8000-000000000005", planName: "Complete SEO Care", service: "SEO", description: "Full-service monthly SEO including content creation, links and technical maintenance.", price: 699, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Everything in Growth SEO", "2 articles per month", "Digital PR outreach", "Backlink building", "Competitor tracking", "Quarterly strategy"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "20000000-0000-4000-8000-000000000006", planName: "Unlimited Design Retainer", service: "Graphic Design", description: "Flat-rate monthly design with fast turnaround — perfect for teams with steady creative needs.", price: 499, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Unlimited requests", "Social & ad creatives", "48-72h turnaround", "Brand-consistent output", "Monthly asset report"], recommended: true, enabled: true, sortOrder: 1 },
  { id: "20000000-0000-4000-8000-000000000007", planName: "Video Content Plan", service: "Video Editing", description: "Monthly short-form video production for socials, ads and reels with quick turnaround.", price: 549, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["8 short videos/month", "Captions & hooks", "Branded motion pack", "Platform exports", "Content ideas included"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "20000000-0000-4000-8000-000000000008", planName: "Site Care & Maintenance", service: "Web Development", description: "Keep your website secure, fast and updated with regular maintenance and backups.", price: 149, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Weekly backups", "Security monitoring", "Plugin & core updates", "Uptime monitoring", "1 small edit/month"], recommended: false, enabled: true, sortOrder: 1 },
  { id: "20000000-0000-4000-8000-000000000009", planName: "Professional Site Care", service: "Web Development", description: "Priority maintenance with content updates and proactive performance monitoring.", price: 299, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Everything in Essential", "Up to 5 edits/month", "Speed optimization", "SEO health checks", "Priority support tickets"], recommended: true, enabled: true, sortOrder: 2 },
  { id: "20000000-0000-4000-8000-000000000010", planName: "AI Automation Care", service: "AI Services", description: "Ongoing upkeep, training and improvements for your AI chatbots and automations.", price: 799, currency: "USD", billingType: "monthly", delivery: "Ongoing", features: ["Model retraining", "New intents & flows", "Knowledge base updates", "Accuracy monitoring", "Priority support"], recommended: false, enabled: true, sortOrder: 1 },
];

export const initialAgencyPackages: AgencyPackage[] = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    name: "Starter Launchpad",
    tagline: "Everything you need to launch a strong digital presence.",
    originalPrice: 3999,
    price: 3499,
    discount: 13,
    billingType: "one-time",
    delivery: "3-4 weeks delivery",
    support: "60 days post-launch support",
    features: [
      "Business website (up to 8 pages)",
      "Landing page UI/UX design",
      "Logo design + brand basics",
      "Social media design kit",
      "On-page SEO setup",
      "Contact & inquiry system",
      "Google Analytics & Search Console",
      "3 training sessions",
    ],
    includedServices: ["Web Development", "UI/UX Design", "Graphic Design", "SEO"],
    mostPopular: false,
    enabled: true,
    sortOrder: 1,
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    name: "Growth Engine",
    tagline: "Full-agency launch with design, marketing and SEO working together.",
    originalPrice: 9999,
    price: 8499,
    discount: 15,
    billingType: "one-time",
    delivery: "6-8 weeks delivery",
    support: "180 days post-launch support",
    features: [
      "Everything in Starter Launchpad",
      "E-Commerce or corporate website",
      "Complete brand identity system",
      "Brand video + promo reel",
      "Social media setup & 30 posts",
      "Paid ads setup (Google + Meta)",
      "Complete SEO setup",
      "AI chatbot integration",
      "Monthly reporting for 3 months",
    ],
    includedServices: ["Web Development", "UI/UX Design", "Graphic Design", "Video Editing", "Digital Marketing", "AI Services", "SEO"],
    mostPopular: true,
    enabled: true,
    sortOrder: 2,
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    name: "Scale Dominator",
    tagline: "Aggressive growth with full digital marketing and automation running for you.",
    originalPrice: 19999,
    price: 16999,
    discount: 15,
    billingType: "one-time",
    delivery: "10-12 weeks delivery",
    support: "1 year priority support",
    features: [
      "Everything in Growth Engine",
      "Custom web application",
      "Complete UI/UX for product",
      "Full SEO + content engine",
      "3 months campaign management",
      "AI workflow automation",
      "Custom analytics dashboard",
      "Quarterly growth strategy",
      "Dedicated account manager",
    ],
    includedServices: ["Web Development", "UI/UX Design", "Graphic Design", "Video Editing", "Digital Marketing", "AI Services", "SEO"],
    mostPopular: false,
    enabled: true,
    sortOrder: 3,
  },
  {
    id: "30000000-0000-4000-8000-000000000004",
    name: "Enterprise Alliance",
    tagline: "Custom partnership for enterprise teams — your dedicated product & growth studio.",
    originalPrice: 34999,
    price: 29999,
    discount: 14,
    billingType: "one-time",
    delivery: "Custom delivery timeline",
    support: "Ongoing partnership",
    features: [
      "Everything in Scale Dominator",
      "Multiple products & apps",
      "Custom AI agents & integrations",
      "24/7 maintenance & monitoring",
      "Dedicated project pods",
      "Weekly executive reporting",
      "SLA-backed support",
      "On-site workshops",
    ],
    includedServices: ["Web Development", "UI/UX Design", "Graphic Design", "Video Editing", "Digital Marketing", "AI Services", "SEO"],
    mostPopular: false,
    enabled: true,
    sortOrder: 4,
  },
];