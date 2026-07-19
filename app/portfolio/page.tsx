import type { Metadata } from 'next';
import PortfolioClient from './_client';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse our portfolio of web development, design and marketing projects delivered for clients worldwide.',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
