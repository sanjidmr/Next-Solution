"use client";

import AdminPanel from '@/components/AdminPanel';
import { usePage } from '@/hooks/usePage';

export default function AdminClient() {
  const { currentLang } = usePage();
  return <AdminPanel currentLang={currentLang} />;
}
