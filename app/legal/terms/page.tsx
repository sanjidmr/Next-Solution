import type { Metadata } from 'next';
import TermsClient from './_client';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review the Terms & Conditions governing the use of Next Solution services.',
};

export default function TermsPage() {
  return <TermsClient />;
}
