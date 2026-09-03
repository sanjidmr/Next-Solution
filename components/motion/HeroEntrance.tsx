"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type HeroEntranceDirection =
  | 'down'    // from above the viewport, travel down into place
  | 'left'    // from the left edge, travel right into place
  | 'right'   // from the right edge, travel left into place
  | 'up'      // from below the viewport, travel up into place
  | 'in'      // gentle scale + fade from the center (large visuals)
  | 'none';   // pure fade

interface HeroEntranceProps {
  children: React.ReactNode;
  direction?: HeroEntranceDirection;
  /** Delay in seconds before the entrance starts. */
  delay?: number;
  /** Duration in seconds for the entrance. */
  duration?: number;
  /** Distance (px) travelled; defaults to a value that exits the viewport. */
  distance?: number;
  /** Extra classes forwarded to the wrapper. */
  className?: string;
}

/**
 * On-mount hero entrance animation — the opposite of a scroll reveal.
 *
 * Page heroes are visible the moment the page appears, so this animates
 * immediately on mount (animate, NOT whileInView) and travels from large
 * offsets so the hero "assembles itself" from a chosen edge of the viewport.
 * Uses only transform + opacity (GPU friendly, no layout shift, no overflow),
 * respects prefers-reduced-motion, and never changes the hero's layout.
 */
export default function HeroEntrance({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.9,
  distance = 120,
  className,
}: HeroEntranceProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const x =
    direction === 'left' ? -distance
    : direction === 'right' ? distance
    : 0;
  const y =
    direction === 'down' ? -distance
    : direction === 'up' ? distance
    : 0;
  const scale = direction === 'in' ? 0.92 : 1;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}