export const navTabPaths = {
  home: "/",
  about: "/about",
  services: "/services",
portfolio: "/portfolio",
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
  { id: "contact", label: "Contact", href: navTabPaths.contact },
];
