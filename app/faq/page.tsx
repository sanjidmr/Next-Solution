import type { Metadata } from 'next';
import FAQClient from './_client';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to the most commonly asked questions about our services, processes and pricing.',
};

export default function FAQPage() {
  return <FAQClient />;
}
