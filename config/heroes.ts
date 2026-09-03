/**
 * Per-page hero theme configuration.
 *
 * Describes the visual lightness of each page's hero background so the
 * Navbar can adapt its text/icon contrast automatically instead of relying
 * on a single hardcoded style.
 *
 *   heroTheme === 'dark'  -> hero background is dark  -> Navbar uses light text/icons
 *   heroTheme === 'light' -> hero background is light -> Navbar uses dark text/icons
 *
 * The Contact page is intentionally NOT listed: it keeps its unchanged,
 * default Navbar behaviour.
 */
export type HeroTheme = 'dark' | 'light';

export const heroThemeByPath: Record<string, HeroTheme> = {
  '/': 'dark',
  '/about': 'dark',
  '/services': 'dark',
  '/portfolio': 'dark',
};

/** @default 'dark' */
export function getHeroTheme(pathname: string): HeroTheme {
  return heroThemeByPath[pathname] ?? 'dark';
}
