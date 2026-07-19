import type { Metadata } from 'next';
import BlogClient from './_client';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest insights on web development, design trends, SEO and digital marketing from the Next Solution team.',
};

export default function BlogPage() {
  return <BlogClient />;
}
