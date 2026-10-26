import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AdminClient from './_client';
import { requireStaff } from '@/lib/require-admin';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Next Solution CMS – manage your site content.',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const denied = await requireStaff();
  if (denied) redirect('/admin/login');

  return <AdminClient />;
}
