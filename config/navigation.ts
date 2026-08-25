export const navTabPaths = {
  home: "/",
  about: "/about",
  services: "/services",
  portfolio: "/portfolio",
  pricing: "/pricing",
  reviews: "/reviews",
  faq: "/faq",
  contact: "/contact",
  admin: "/admin",
  privacy_policy: "/legal/privacy-policy",
  terms_conditions: "/legal/terms",
  cookie_policy: "/legal/cookies",
} as const;

export type NavTabId = keyof typeof navTabPaths;

export function getPathForTab(tabId: NavTabId): string {
  return navTabPaths[tabId];
}

/** Public routes included in sitemap (excludes admin). */
export const publicNavPaths: string[] = [
  navTabPaths.home,
  navTabPaths.about,
  navTabPaths.services,
  navTabPaths.portfolio,
  navTabPaths.pricing,
  navTabPaths.reviews,
  navTabPaths.faq,
  navTabPaths.contact,
  navTabPaths.privacy_policy,
  navTabPaths.terms_conditions,
  navTabPaths.cookie_policy,
];

export const mainNavItems: { id: NavTabId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: navTabPaths.home },
  { id: "about", label: "About", href: navTabPaths.about },
  { id: "services", label: "Services", href: navTabPaths.services },
  { id: "portfolio", label: "Portfolio", href: navTabPaths.portfolio },
  { id: "pricing", label: "Pricing", href: navTabPaths.pricing },
  { id: "reviews", label: "Reviews", href: navTabPaths.reviews },
  { id: "faq", label: "FAQ", href: navTabPaths.faq },
  { id: "contact", label: "Contact", href: navTabPaths.contact },
];
