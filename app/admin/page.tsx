import type { Metadata } from 'next';
import AdminClient from './_client';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Next Solution CMS – manage your site content.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminClient />;
}
