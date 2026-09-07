"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, type HTMLMotionProps } from 'motion/react';

/**
 * RevealGuard
 *
 * A drop-in replacement for `initial` + `whileInView` reveals that can NEVER
 * permanently hide its content:
 *
 *  1. It reveals via IntersectionObserver (`useInView`) for a premium
 *     scroll-triggered entrance — exactly like `whileInView`.
 *  2. It ALSO forces the visible state after `fallbackMs` regardless of
 *     observer behavior, so an image/content can never be stuck in its
 *     hidden initial state (broken observers, hydration hiccups, etc.).
 *
 * All standard motion props (initial, animate, transition, whileHover,
 * style, onMouseEnter, className, ...) are forwarded.
 */
type RevealGuardProps = HTMLMotionProps<'div'> & {
  /** Hidden state applied until revealed. */
  initial: Record<string, unknown>;
  /** Visible state applied once revealed. */
  animate: Record<string, unknown>;
  /** Milliseconds to force the visible state, even if never observed in view. */
  fallbackMs?: number;
  /** Viewport visibility fraction required (0–1) before scroll-triggering. */
  amount?: number;
};

export default function RevealGuard({
  initial,
  animate,
  transition,
  fallbackMs = 1400,
  amount = 0.15,
  ...rest
}: RevealGuardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForced(true), fallbackMs);
    return () => clearTimeout(t);
  }, [fallbackMs]);

  const shown = inView || forced;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={shown ? animate : initial}
      transition={transition}
      {...rest}
    />
  );
}