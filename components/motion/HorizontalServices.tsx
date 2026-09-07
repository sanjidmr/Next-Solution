"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

export interface HorizontalService {
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  techs: string[];
  popular: string[];
  benefits: string[];
}

interface HorizontalServicesProps {
  currentLang: 'en' | 'bn';
  services: HorizontalService[];
  onSelect: (slug: string) => void;
}

function ServiceCard({
  service,
  idx,
  currentLang,
  onSelect,
  className = '',
}: {
  service: HorizontalService;
  idx: number;
  currentLang: 'en' | 'bn';
  onSelect: (slug: string) => void;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <motion.button
      type="button"
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onClick={() => onSelect(service.slug)}
      className={`group relative cursor-pointer rounded-3xl border border-neutral-200/50 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md p-5 sm:p-7 flex flex-col justify-between overflow-hidden text-left shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:border-orange-500 hover:shadow-[0_0_0_1px_rgba(255,77,0,0.25),0_20px_60px_-10px_rgba(255,77,0,0.25)] transition-all duration-500 ${className}`}
    >
      {/* Glow on hover */}
      <div className="absolute -inset-1 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.12)_0%,rgba(255,77,0,0.05)_35%,transparent_70%)] blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,77,0,0.06)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-blue-50/5 dark:bg-orange-500/50 border border-blue-100/50 flex items-center justify-center text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="text-[9px] font-bold font-mono bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-400 px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-100/30">
            {currentLang === 'en' ? `Service 0${idx + 1}` : `সেবা 0${idx + 1}`}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <h3 className="font-sans text-sm sm:text-base md:text-xl font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors duration-300">
              {service.title}
            </h3>
            <span className="text-[10px] font-extrabold text-neutral-400 dark:text-neutral-500 font-mono">
              (0{idx + 1})
            </span>
          </div>
          <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
            {service.desc}
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {currentLang === 'en' ? 'Core Stack' : 'প্রধান টেকনোলজি'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {service.techs.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-blue-50/5 dark:bg-orange-500/50 border border-neutral-200/60 text-[9px] font-extrabold font-mono text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 hover:text-blue-600 dark:text-orange-400 px-2.5 py-1 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {service.techs.length > 5 && (
              <span className="rounded-lg bg-blue-50/30 dark:bg-orange-500/5 border border-blue-100/20 text-[9px] font-extrabold font-mono text-blue-600 dark:text-orange-400 px-2 py-1">
                +{service.techs.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-neutral-50 dark:border-neutral-800 flex-1 flex flex-col space-y-4 relative z-10 transition-all duration-300">
        <div className="flex items-center justify-between text-[10px] font-bold font-mono text-neutral-400 dark:text-neutral-500">
          <span>{currentLang === 'en' ? 'Exclusive Service' : 'এক্সক্লুসিভ সেবা'}</span>
          <span className="text-blue-600 dark:text-orange-400 bg-blue-50/5 dark:bg-orange-500/50 px-2 py-0.5 rounded border border-blue-100/30">
            {currentLang === 'en' ? 'View Details →' : 'বিস্তারিত দেখুন →'}
          </span>
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-2 gap-3 sm:gap-4 pt-1 items-stretch transition-all duration-300">
            <div className="flex flex-col min-w-0">
              <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center">
                <CheckCircle className="h-3 w-3 text-emerald-500 dark:text-emerald-400 mr-1 shrink-0" />
                {currentLang === 'en' ? 'Popular Solutions' : 'জনপ্রিয় সমাধানসমূহ'}
              </div>
              <div className="flex-1 flex flex-col justify-around text-[11px] font-sans text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 font-medium pt-2">
                {service.popular.map((proj) => (
                  <div key={proj} className="flex items-center leading-snug">
                    <span className="h-1 w-1 bg-neutral-300 rounded-full mr-2 shrink-0" />
                    <span className="min-w-0 line-clamp-2">{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center">
                <Sparkles className="h-3 w-3 text-blue-500 dark:text-orange-400 mr-1 shrink-0" />
                {currentLang === 'en' ? 'Core Benefits' : 'মূল সুবিধা'}
              </div>
              <div className="flex-1 flex flex-col justify-around text-[11px] font-sans text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 font-medium pt-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center leading-snug">
                    <span className="h-1 w-1 bg-neutral-300 rounded-full mr-2 shrink-0" />
                    <span className="min-w-0 line-clamp-2">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </motion.button>
  );
}

/**
 * "Our Services" — premium horizontal scroll storytelling.
 *
 * The section pins to the viewport (sticky) while vertical scrolling drives
 * the cards horizontally from right → left. Scroll distance is proportional to
 * the real track width (measured), easing is spring-smoothed, and the whole
 * interaction releases naturally once the final card reaches position.
 *
 * Fallbacks:
 *  - prefers-reduced-motion → plain responsive grid (never animated).
 *  - tiny/edge widths → normal grid if the track fits the viewport.
 */
export default function HorizontalServices({
  currentLang,
  services,
  onSelect,
}: HorizontalServicesProps) {
  const reduceOS = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  // Resolve reduced-motion only after hydration → SSR and the very first
  // client paint always render the same branch (no hydration mismatch).
  useEffect(() => {
    if (reduceOS) setReduce(true);
  }, [reduceOS]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [measured, setMeasured] = useState(false);

  // Track the live viewport width (used for the dynamic travel calc).
  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Measure how far the track can travel horizontally (right → left).
  // The track is ALWAYS mounted (non-reduced branch) so this actually runs.
  useEffect(() => {
    if (reduce) return;
    if (viewportW === 0) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        setMeasured(true);
        setMaxScroll(Math.max(0, track.scrollWidth - viewportW));
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce, services.length, viewportW]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Raw horizontal travel (px), spring-smoothed for a premium feel.
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.4 });

  // Discovered progress bar at the bottom of the pinned viewport.
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
  });

  // Normal-grid fallback only when motion is reduced or when measurement
  // confirms the track genuinely does not overflow a very wide viewport.
  if (reduce || (measured && maxScroll <= 0)) {
    return (
      <div
        ref={sectionRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-14"
      >
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100/50 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            {currentLang === 'en' ? '✦ Our Services' : '✦ আমাদের সেবাসমূহ'}
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
            {currentLang === 'en' ? 'Everything Your Business Needs, ' : 'আপনার ব্যবসার যাবতীয় চাহিদা, '}
            <span className="bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              {currentLang === 'en' ? 'In One Place' : 'এক জায়গাতেই'}
            </span>
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">
            {currentLang === 'en' ? 'From Websites to AI — We Deliver It All' : 'ওয়েবসাইট থেকে এআই — সবকিছুই আমরা করে দিই'}
          </p>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl mx-auto">
            {currentLang === 'en'
              ? 'From high-performance websites to intelligent AI services — we deliver every digital service you need to grow, win and scale.'
              : 'উচ্চ-মানের ওয়েবসাইট থেকে বুদ্ধিমান এআই সার্ভিস — আপনার ব্যবসাকে বড় করার জন্য দরকারি প্রতিটি ডিজিটাল সেবা আমরা দিয়ে থাকি।'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.slug}
              service={service}
              idx={idx}
              currentLang={currentLang}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${maxScroll}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Ambient gradients */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-blue-100/20 dark:bg-orange-500/5 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 bg-indigo-50/30 dark:bg-orange-500/5 rounded-full blur-3xl" />

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full items-center gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-10 lg:px-16 will-change-transform"
        >
          {/* Intro slide — heading that travels with the row */}
          <div className="shrink-0 w-[88vw] sm:w-[460px] lg:w-[560px] space-y-6 pr-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100/50 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              {currentLang === 'en' ? '✦ Our Services' : '✦ আমাদের সেবাসমূহ'}
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
              {currentLang === 'en' ? 'Everything Your Business Needs, ' : 'আপনার ব্যবসার যাবতীয় চাহিদা, '}
              <span className="bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                {currentLang === 'en' ? 'In One Place' : 'এক জায়গাতেই'}
              </span>
            </h2>

            <p className="font-sans text-sm md:text-base text-neutral-500 dark:text-neutral-400 font-semibold uppercase tracking-wider">
              {currentLang === 'en' ? 'From Websites to AI — We Deliver It All' : 'ওয়েবসাইট থেকে এআই — সবকিছুই আমরা করে দিই'}
            </p>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans max-w-xl">
              {currentLang === 'en'
                ? 'Scroll to explore our complete digital ecosystem. Click any service to see full deliverables, tech stacks and plans.'
                : 'আমাদের সম্পূর্ণ ডিজিটাল ইকোসিস্টেম ঘুরে দেখতে স্ক্রল করুন। যেকোনো সেবায় ক্লিক করে বিস্তারিত, ডেলিভারেবল এবং প্ল্যান দেখুন।'}
            </p>

            <div className="flex items-center gap-3 text-xs font-bold font-mono text-neutral-400 dark:text-neutral-500">
              <TrendingUp className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              <span className="uppercase tracking-widest">
                {currentLang === 'en' ? 'Scroll to explore' : 'স্ক্রল করে দেখুন'}
              </span>
            </div>
          </div>

          {services.map((service, idx) => (
            <div key={service.slug} className="shrink-0 w-[80vw] sm:w-[400px] lg:w-[460px] h-[58vh] sm:h-[54vh]">
              <ServiceCard
                service={service}
                idx={idx}
                currentLang={currentLang}
                onSelect={onSelect}
                className="h-full"
              />
            </div>
          ))}
        </motion.div>

        {/* Discovered progress bar */}
        <div className="absolute bottom-6 left-6 right-6 max-w-5xl mx-auto">
          <div className="h-[3px] w-full rounded-full bg-neutral-200/70 dark:bg-white/10 overflow-hidden">
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-orange-500 via-blue-600 to-indigo-600 dark:from-orange-500 dark:via-orange-400 dark:to-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}