"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useInView } from 'motion/react';

interface CountUpProps {
  /** The target value string, e.g. "50+", "98%", "4.91", or a non-numeric string like "Bespoke". */
  value: string;
  /** Duration in seconds of the count-up animation. */
  duration?: number;
  /** Extra classes applied to the <span>. */
  className?: string;
}

/**
 * Counts from 0 up to the numeric part of `value`, appending any non-numeric
 * suffix (e.g. "+", "%"), triggered the first time it becomes visible in the
 * viewport. Falls back to showing the full string if there is no number, and
 * renders the final value directly when the user prefers reduced motion.
 */
export default function CountUp({
  value,
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const hasNumber = !Number.isNaN(numeric);

  const [count, setCount] = useState<number>(reduce ? numeric : 0);

  useEffect(() => {
    if (reduce || !inView || !hasNumber) return;
    let raf = 0;
    let startTs: number | null = null;

    const totalMs = duration * 1000;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / totalMs, 1);
      // Ease-out for a smooth, premium settle.
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setCount(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(numeric);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, duration, reduce, hasNumber]);

  return (
    <span ref={ref} className={className}>
      {hasNumber ? `${count}${suffix}` : value}
    </span>
  );
}