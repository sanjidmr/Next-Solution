import type { Metadata } from 'next';
import PricingClient from './_client';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing packages for web development, design and digital marketing tailored to your budget.',
};

export default function PricingPage() {
  return <PricingClient />;
}
