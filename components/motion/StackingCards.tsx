"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { CheckCircle } from 'lucide-react';

export interface ProcessCard {
  id: string;
  stepNumber: string;
  icon: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  deliverablesEn: string[];
  deliverablesBn: string[];
  estimatedDurationEn: string;
  estimatedDurationBn: string;
  toolsUsed: string[];
}

interface StackingCardsProps {
  currentLang: 'en' | 'bn';
  steps: ProcessCard[];
  header?: React.ReactNode;
}

/** px — how much each lower card peeks under the top card */
const GAP = 22;

function StepCard({
  step,
  currentLang,
}: {
  step: ProcessCard;
  currentLang: 'en' | 'bn';
}) {
  const en = currentLang === 'en';
  return (
    <div className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-gray-200/70 dark:border-neutral-700/70 bg-white dark:bg-[#1A1A1A] p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] sm:p-7">
      {/* Decorative top glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/10 dark:from-orange-500/10 to-transparent" />

      {/* Top metadata */}
      <div className="relative flex items-center justify-between">
        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600 font-mono sm:text-xs dark:bg-orange-500/10 dark:text-orange-400">
          STEP {step.stepNumber}
        </span>
        <span className="text-xl sm:text-2xl" role="img" aria-label="step-icon">
          {step.icon}
        </span>
      </div>

      {/* Title + description */}
      <div className="relative mt-4 space-y-2">
        <h3 suppressHydrationWarning className="font-sans text-lg font-bold text-gray-900 leading-snug sm:text-xl dark:text-white">
          {en ? step.titleEn : step.titleBn}
        </h3>
        <p suppressHydrationWarning className="text-xs leading-relaxed text-gray-500 sm:text-sm dark:text-neutral-400">
          {en ? step.descriptionEn : step.descriptionBn}
        </p>
      </div>

      {/* Deliverables */}
      <div className="relative mt-4 space-y-1.5">
        <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
          {en ? 'Deliverables' : 'ডেলিভারিবলস'}
        </span>
        <div className="grid grid-cols-1 gap-1.5 text-[11px] sm:grid-cols-2">
          {(en ? step.deliverablesEn : step.deliverablesBn).slice(0, 4).map((del) => (
            <div key={del} className="flex items-center space-x-1 text-gray-600 dark:text-neutral-300">
              <CheckCircle className="h-3 w-3 shrink-0 text-emerald-500 dark:text-emerald-400" />
              <span suppressHydrationWarning>{del}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer meta */}
      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-50 pt-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
            {en ? 'Duration' : 'সময়'}
          </span>
          <span suppressHydrationWarning className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-700 dark:bg-neutral-900 dark:text-neutral-200">
            {en ? step.estimatedDurationEn : step.estimatedDurationBn}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {step.toolsUsed.slice(0, 4).map((tool) => (
            <span
              key={tool}
              suppressHydrationWarning
              className="rounded bg-gray-50 px-1.5 py-0.5 font-mono text-[9px] text-gray-500 dark:bg-neutral-900 dark:text-neutral-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One animated card in the deck. Own component so hooks are called
 * unconditionally and lint's rules-of-hooks stays happy.
 */
function DeckCard({
  scrollYProgress,
  n,
  index,
  viewportH,
  step,
  currentLang,
}: {
  scrollYProgress: MotionValue<number>;
  n: number;
  index: number;
  viewportH: number;
  step: ProcessCard;
  currentLang: 'en' | 'bn';
}) {
  const local = useTransform(scrollYProgress, (p) =>
    index === 0 ? 1 : Math.min(Math.max(p * (n - 1) - (index - 1), 0), 1)
  );
  const finalY = index * GAP;
  const startY = index === 0 ? finalY : finalY + (viewportH || 640) * 0.5;
  const rawY = useTransform(local, [0, 1], [startY, finalY]);
  const y = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.55 });
  const scale = useTransform(local, [0, 1], [0.88, 1]);
  const opacity = useTransform(local, [0, 0.35, 1], [0.25, 1, 1]);

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: index }}
      className="absolute inset-0 will-change-transform"
    >
      <StepCard step={step} currentLang={currentLang} />
    </motion.div>
  );
}

/**
 * "Our Proven Process" — sticky stacking-card scroll experience.
 *
 * The deck pins while each card rises from below and settles on top of the
 * previous one with a soft spring "bounce" settle. By the end all cards form
 * one neat fanned stack, then the pin releases and normal scroll resumes.
 *
 * Reduced motion + tiny viewports fall back to a normal vertical list.
 */
export default function StackingCards({ currentLang, steps, header }: StackingCardsProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewportH, setViewportH] = useState(0);
  const [ready, setReady] = useState(false);
  const needsLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Runs after commit on the client → the ref div is guaranteed to be in the
  // real DOM before any child DeckCard subscribes to the scroll MotionValue.
  needsLayoutEffect(() => {
    setReady(true);
  }, []);

  const n = steps.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Functional scroll depth so every stacking stage gets its own segment of
  // the pin. ~55% of the viewport per step — the deck is tall and each card
  // glides up slowly and deliberately as the user keeps scrolling, then the
  // section releases when the whole stack has settled.
  const perStep = Math.max(220, Math.round((viewportH || 840) * 0.55));
  const travel = n * perStep;
  const deckH = `calc(100svh + ${travel}px)`;
  const animated = !reduce && viewportH > 0 && ready;

  // The ref wrapper is always rendered (animated or not) so useScroll always
  // finds a hydrated target on the very first client render. Its height only
  // stretches to the pinned travel once the sticky deck is active.
  return (
    <div ref={sectionRef} className="relative" style={animated ? { height: deckH } : undefined}>
      {animated ? (
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          {/* Ambient glows behind the deck */}
          <div className="pointer-events-none absolute top-1/4 left-[10%] h-96 w-96 bg-blue-50/40 rounded-full blur-3xl dark:bg-orange-500/5" />
          <div className="pointer-events-none absolute bottom-1/4 right-[10%] h-96 w-96 bg-indigo-50/30 rounded-full blur-3xl dark:bg-orange-500/5" />

          <div className="relative w-full max-w-4xl">
            {/* Pinned header — stays on screen while the cards stack below */}
            {header ? (
              <div className="text-center space-y-3 mb-6">{header}</div>
            ) : null}

            <div className="relative w-[min(880px,92vw)] h-[min(56vh,540px)] mx-auto">
              {steps.map((step, index) => (
                <DeckCard
                  key={step.id}
                  scrollYProgress={scrollYProgress}
                  n={n}
                  index={index}
                  viewportH={viewportH}
                  step={step}
                  currentLang={currentLang}
                />
              ))}
            </div>
          </div>

          {/* Step counter hint */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
            {currentLang === 'en'
              ? `1 / ${n} — Keep scrolling to stack the process`
              : `1 / ${n} — প্রসেস স্ট্যাক করতে স্ক্রল করুন`}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl space-y-6">
          {header ? <div className="text-center space-y-3">{header}</div> : null}
          {steps.map((step) => (
            <div key={step.id} className="h-[340px] sm:h-[360px]">
              <StepCard step={step} currentLang={currentLang} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}