import type { Metadata } from 'next';
import AboutClient from './_client';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Next Solution – our mission, vision, team, and the values that drive us.',
};

export default function AboutPage() {
  return <AboutClient />;
}
