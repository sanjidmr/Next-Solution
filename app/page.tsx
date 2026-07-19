import type { Metadata } from 'next';
import HomeClient from './_client';

export const metadata: Metadata = {
  title: 'Next Solution – Digital Agency',
  description: 'Full-service digital agency specialising in web development, UI/UX design, SEO and digital marketing.',
};

export default function HomePage() {
  return <HomeClient />;
}
