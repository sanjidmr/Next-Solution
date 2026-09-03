"use client";

import React from 'react';
import { motion, Variants, useReducedMotion } from 'motion/react';

interface StaggerProps {
  children: React.ReactNode;
  /** Seconds between each child revealing. */
  stagger?: number;
  /** Extra delay before the whole group starts. */
  delay?: number;
  /** Distance (px) travelled before settling. */
  distance?: number;
  /** Horizontal entry from the side (left/right) or from bottom. */
  from?: 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Sequential (cascade) reveal container.
 *
 * Wrap a group of cards with <Stagger> and each card will reveal one after
 * another with a small offset — creating a natural premium "cascade" of
 * content as the section enters the viewport. Only uses transform + opacity,
 * respects prefers-reduced-motion, and leaves the design 100% intact.
 */
export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  distance = 28,
  from = 'bottom',
  className,
}: StaggerProps) {
  const reduce = useReducedMotion();

  const x = from === 'left' ? -distance : from === 'right' ? distance : 0;
  const y = from === 'bottom' ? distance : 0;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const item: Variants = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x, y },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {childrenArray.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}