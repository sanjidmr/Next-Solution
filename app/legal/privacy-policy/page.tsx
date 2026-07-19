import type { Metadata } from 'next';
import PrivacyClient from './_client';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Next Solution Privacy Policy to understand how we collect and process your data.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
