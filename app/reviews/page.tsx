import type { Metadata } from 'next';
import ReviewsClient from './_client';

export const metadata: Metadata = {
  title: 'Client Reviews',
  description: 'See what our clients say about working with Next Solution – real reviews from real projects.',
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
