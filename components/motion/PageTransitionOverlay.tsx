"use client";

import { motion } from "motion/react";

export interface PageTransitionMeta {
  path: string;
  title: string;
  subtitle: string;
  page: string;
}

const EASE = [0.83, 0, 0.17, 1] as const;

interface PageTransitionOverlayProps {
  meta: PageTransitionMeta;
  phase: "in" | "hold" | "out";
}

/**
 * Cinematic full-screen editorial navigation overlay.
 * Wipes in over the current page (clipPath inset from the right edge), holds
 * for ~2.0s with the incoming page title fully readable and glowing, then
 * wipes back out to unveil the freshly-mounted route.
 */
export default function PageTransitionOverlay({ meta, phase }: PageTransitionOverlayProps) {
  const contentVariants = {
    in: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE },
    },
    hold: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 2.0, ease: "easeOut" as const },
    },
    out: {
      opacity: 0,
      y: -22,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  const titleGlowVariants = {
    in: { textShadow: "0 0 0px rgba(255,77,0,0)" },
    hold: {
      textShadow: "0 0 46px rgba(255,77,0,0.55)",
      transition: { duration: 1.2 },
    },
    out: {
      textShadow: "0 0 0px rgba(255,77,0,0)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      id="page-transition-overlay"
      aria-hidden="true"
      className="fixed inset-0 z-[200] overflow-hidden bg-[#050505] text-white"
      style={{ clipPath: "inset(0% 100% 0% 0%)" }}
      variants={{
        in: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.5, ease: EASE } },
        hold: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 2.0, ease: "linear" as const } },
        out: { clipPath: "inset(0% 100% 0% 0%)", transition: { duration: 0.35, ease: EASE } },
      }}
      initial="in"
      animate={phase}
    >
      {/* ── Editorial texture: scanlines + vignette ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.35) 3px, rgba(255,255,255,0.35) 4px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Top header — telemetry + route metadata ── */}
      <motion.header
        variants={contentVariants}
        initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
        animate={phase}
        className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 sm:px-10"
      >
        <div className="flex items-center gap-3">
          <motion.span
            className="relative flex h-2 w-2"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,77,0,0.9)]" />
          </motion.span>
          <span>Telemetry.log // Next_Solution</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>Route {meta.path.toUpperCase()}</span>
          <span className="text-orange-400">SYS_{meta.page}</span>
        </div>
      </motion.header>

      {/* ── Center — giant editorial typography ── */}
      <motion.div
        variants={contentVariants}
        initial={{ opacity: 0, y: 42, filter: "blur(18px)" }}
        animate={phase}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Ghost page number */}
        <span className="pointer-events-none absolute select-none font-display text-[clamp(9rem,30vw,22rem)] font-bold leading-none text-white/[0.045]">
          {meta.page}
        </span>

        <div className="relative flex items-end gap-3">
          <motion.h1
            variants={titleGlowVariants}
            className="font-display text-[clamp(3.5rem,13vw,9.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            {meta.title}
          </motion.h1>
          <motion.span
            variants={contentVariants}
            animate={phase}
            className="mb-[0.28em] inline-block h-[0.55em] w-[0.55em] shrink-0 rounded-full bg-orange-500 shadow-[0_0_34px_rgba(255,77,0,0.95)]"
          />
        </div>

        <div className="relative mt-8 flex flex-col items-center gap-4">
          <motion.span
            variants={contentVariants}
            animate={phase}
            initial={{ opacity: 0, scaleX: 0 }}
            className="h-px w-20 origin-center bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />
          <motion.p
            variants={contentVariants}
            initial={{ opacity: 0, y: 14 }}
            animate={phase}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-400 sm:text-sm"
          >
            {meta.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* ── Bottom — laser gradient progress + route indicator ── */}
      <motion.footer
        variants={contentVariants}
        initial={{ opacity: 0, y: 26 }}
        animate={phase}
        className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-10"
      >
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
          <span>Loading experience</span>
          <span className="hidden sm:inline text-orange-400/90">PAGE {meta.page}</span>
        </div>

        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ borderRadius: "9999px" }}
            initial={{ width: "0%" }}
            animate={{ width: phase === "in" ? "0%" : "100%" }}
            transition={{ duration: 2.35, ease: "easeOut" }}
          >
            <span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #FF4D00 0%, #FFA372 30%, #FF4D00 60%, #FF8C4B 100%)",
                backgroundSize: "220% 100%",
                boxShadow: "0 0 22px rgba(255,77,0,0.7)",
              }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, #FF4D00 0%, #FFA372 30%, #FF4D00 60%, #FF8C4B 100%)",
                  backgroundSize: "220% 100%",
                }}
                animate={{ backgroundPosition: ["220% 0%", "-220% 0%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </span>
          </motion.div>
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
          <span>nextsolution.co{meta.path}</span>
          <span>wipe :: {meta.page} / 05</span>
        </div>
      </motion.footer>
    </motion.div>
  );
}