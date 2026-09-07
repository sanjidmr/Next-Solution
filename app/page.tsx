import type { Metadata } from 'next';
import HomeClient from './_client';
import { createClient } from '@/lib/supabase/server';
import { mapPortfolioItem } from '@/lib/mappers';

export const metadata: Metadata = {
  title: 'Next Solution – Digital Agency',
  description: 'Full-service digital agency specialising in web development, UI/UX design, SEO and digital marketing.',
};

async function getFeaturedPortfolio() {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true })
        .limit(6);

      if (!error) {
        return (data || []).map(mapPortfolioItem.fromDb);
      }

      // Retry transient failures (e.g. "fetch failed" on a dropped connection).
      // Non-retryable auth/RLS errors surface immediately on the last attempt.
      if (attempt === maxAttempts) {
        console.error('Supabase portfolio fetch error:', error.message);
        return [];
      }

      console.warn(
        `Supabase portfolio fetch attempt ${attempt} failed (${error.message}); retrying...`,
      );
    } catch (err) {
      if (attempt === maxAttempts) {
        console.error('Portfolio fetch failed:', err);
        return [];
      }
      console.warn(`Portfolio fetch attempt ${attempt} threw (${err}); retrying...`);
    }

    await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
  }

  return [];
}

export default async function HomePage() {
  const portfolio = await getFeaturedPortfolio();
  return <HomeClient portfolioData={portfolio} />;
}