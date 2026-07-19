import type { Metadata } from 'next';
import ContactClient from './_client';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Next Solution team to discuss your project requirements.',
};

export default function ContactPage() {
  return <ContactClient />;
}
