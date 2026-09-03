"use client";

import React from 'react';

/**
 * Reusable Sticky / Stacking Hero wrapper.
 *
 * Wraps any hero content so it behaves like a pinned, full-screen layer
 * that the following content section slides over and covers. The visual
 * "stacking" behaviour lives in the `.hero-stack` / `.hero-sticky` /
 * `.stack-cover` CSS classes (see app/globals.css), so no JavaScript
 * scroll listeners are required — keeping the animation GPU-friendly and
 * dependency-free.
 *
 * Usage:
 *   <StackingHero theme="dark">
 *     <Hero ... />
 *   </StackingHero>
 *   <section className="stack-cover"> ...next section... </section>
 *
 * The first content section rendered AFTER a StackingHero must carry the
 * `stack-cover` class so it slides over the pinned hero.
 */
interface StackingHeroProps {
  children: React.ReactNode;
  /** Hero background theme used for Navbar contrast ("dark" bg -> light text). */
  theme?: 'dark' | 'light';
  /** Extra classes for the outer `.hero-stack` wrapper. */
  className?: string;
  /** Optional id forwarded to the outer wrapper. */
  id?: string;
}

export default function StackingHero({
  children,
  className = '',
  id,
}: StackingHeroProps) {
  return (
    <div id={id} className={`hero-stack ${className}`.trim()}>
      <div className="hero-sticky">{children}</div>
    </div>
  );
}
