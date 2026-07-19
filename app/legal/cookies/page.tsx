import type { Metadata } from 'next';
import CookiesClient from './_client';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how Next Solution uses cookies and how you can manage your preferences.',
};

export default function CookiePolicyPage() {
  return <CookiesClient />;
}
