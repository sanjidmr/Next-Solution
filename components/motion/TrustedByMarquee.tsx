"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TRUSTED_BY } from '@/data/trustedBy';

interface TrustedByMarqueeProps {
  currentLang: 'en' | 'bn';
  className?: string;
}

/**
 * "Trusted by Industry Leaders" marquee — a seamless, infinite horizontal
 * marquee of partner names with soft edge fades. Lifted out of the hero so it
 * can live independently beneath the "Our Services" section. Pure CSS animation
 * (GPU friendly), pauses on hover, and is naturally disabled by the global
 * prefers-reduced-motion rule.
 */
export default function TrustedByMarquee({
  currentLang,
  className = '',
}: TrustedByMarqueeProps) {
  return (
    <div
      className={`relative z-40 w-full ${className}`}
      aria-label={
        currentLang === 'en'
          ? 'Trusted by industry leaders'
          : 'আস্থার সাথে কাজ করেছে'
      }
    >
      <div className="flex items-center justify-center gap-4">
        <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-gray-500 dark:text-neutral-400 sm:text-sm">
          {currentLang === 'en'
            ? 'Trusted by Industry Leaders'
            : 'আস্থার সাথে কাজ করেছে'}
        </p>
      </div>

      <div className="relative mt-5 overflow-hidden py-2">
        <div className="trusted-marquee flex w-max items-center">
          {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
            <div
              key={i}
              className="group mx-2 flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/70 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/60 hover:shadow-[0_14px_35px_-14px_rgba(255,77,0,0.45)] dark:border-neutral-800 dark:bg-[#141414]/80 sm:mx-3 sm:px-5"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500/70 transition-transform duration-300 group-hover:scale-125" />
              <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-gray-700 transition-colors duration-300 group-hover:text-orange-600 dark:text-neutral-200 dark:group-hover:text-orange-400 sm:text-lg">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-black/60 dark:to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-black/60 dark:to-transparent sm:w-40" />
      </div>
    </div>
  );
}
