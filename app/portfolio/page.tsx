import type { Metadata } from 'next';
import PortfolioClient from './_client';
import { createAdminClient } from '@/lib/supabase/admin';
import { mapPortfolioItem } from '@/lib/mappers';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our portfolio of web development, design and marketing projects delivered for clients worldwide.',
};

async function getPortfolioFromSupabase() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

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

export default async function PortfolioPage() {
  const portfolio = await getPortfolioFromSupabase();
  return <PortfolioClient portfolioData={portfolio} />;
}
