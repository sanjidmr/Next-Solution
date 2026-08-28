import type { Metadata } from 'next';
import HomeClient from './_client';
import { createAdminClient } from '@/lib/supabase/admin';
import { mapPortfolioItem } from '@/lib/mappers';

export const metadata: Metadata = {
  title: 'Next Solution – Digital Agency',
  description: 'Full-service digital agency specialising in web development, UI/UX design, SEO and digital marketing.',
};

async function getFeaturedPortfolio() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error) {
      console.error('Supabase portfolio fetch error:', error.message);
      return [];
    }

    return (data || []).map(mapPortfolioItem.fromDb);
  } catch (err) {
    console.error('Portfolio fetch failed:', err);
    return [];
  }
}

export default async function HomePage() {
  const portfolio = await getFeaturedPortfolio();
  return <HomeClient portfolioData={portfolio} />;
}