"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'in'
  | 'none';

interface RevealProps {
  children: React.ReactNode;
  /**
   * Direction the element travels from while revealing.
   * - up    -> slides up from below (most headings/cards)
   * - down  -> slides down from above
   * - left  -> slides in from the left
   * - right -> slides in from the right
   * - in    -> gentle scale + fade from center (large visuals)
   * - none  -> pure fade
   */
  direction?: RevealDirection;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Duration in seconds for the reveal. */
  duration?: number;
  /** Optional stagger member: use with <StaggerItem> messaging. */
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'figure';
  /** Extra classes forwarded to the wrapper. */
  className?: string;
  /** If true, disable the reveal entirely (content always visible). */
  disabled?: boolean;
  /** Amount of the element that must enter the viewport (0–1). */
  amount?: number;
}

const offset: Record<RevealDirection, number> = {
  up: 28,
  down: -28,
  left: 40,
  right: -40,
  in: 0,
  none: 0,
};

/**
 * Lightweight, SSR-safe scroll-reveal wrapper.
 *
 * Renders its children inside a motion wrapper that moves from the chosen
 * direction into place using ONLY transform + opacity (GPU friendly, no
 * layout shift). The initial state is the same as the final state on the
 * server (and for reduced motion), so there is no flash of hidden content
 * and the design is 100% preservable.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  as = 'div',
  className,
  disabled = false,
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();

  const Tag: any = motion[as as keyof typeof motion];

  if (disabled || reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const off = offset[direction];
  const noTransform = direction === 'none' || direction === 'in';

  return (
    <Tag
      className={className}
      initial={
        noTransform
          ? { opacity: 0, scale: direction === 'in' ? 0.96 : 1 }
          : { opacity: 0, x: direction === 'left' || direction === 'right' ? off : 0, y: direction === 'up' || direction === 'down' ? off : 0 }
      }
      whileInView={
        noTransform
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}