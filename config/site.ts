export const siteConfig = {
  name: "Next Solution",
  shortName: "NextSolution",
  description:
    "Premium digital agency transforming ideas into measurable digital success — web engineering, UI/UX, SEO, and growth for brands worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/logo.svg",
  contact: {
    email: "hello@nextsolution.co",
    phone: "+880 1711 000000",
    phoneHref: "tel:+8801711000000",
    address: "Suite 404, Silicon High-Street, Dhaka, Bangladesh",
    hours: "Mon - Fri: 9:00 AM - 6:00 PM (GMT+6)",
  },
  social: {
    twitter: "https://twitter.com/nextsolution",
    linkedin: "https://linkedin.com/company/nextsolution",
    github: "https://github.com/nextsolution",
  },
  links: {
    home: "/",
    contact: "/contact",
    admin: "/admin",
  },
} as const;

export type SiteConfig = typeof siteConfig;
