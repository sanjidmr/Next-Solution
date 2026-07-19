import type { Metadata } from 'next';
import ServicesClient from './_client';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our full range of digital services – web development, UI/UX design, SEO, digital marketing and more.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
