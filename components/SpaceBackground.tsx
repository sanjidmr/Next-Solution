"use client";

import React from 'react';

/**
 * SpaceBackground — a single, continuous "deep space" visual system for the
 * whole website. Rendered once at the shell level, fixed to the viewport,
 * composed of pure CSS (gradients + lightweight opacity/transform keyframes)
 * for maximum performance. It stays strictly BEHIND all content
 * (z-index -10, pointer-events none) and is only visible in dark mode.
 *
 * Star positions/brightness are precomputed (deterministic) so server render
 * and client hydration always match.
 */

type Star = { x: number; y: number; s: number; o: number; t: boolean; d: number; de: number };
type Glow = { x: number; y: number; w: number; h: number; o: number; d: number; de: number };
type Particle = { x: number; y: number; s: number; o: number; d: number; de: number };

const STARS: Star[] = [
  { x: 4, y: 12, s: 2, o: 0.75, t: true, d: 7, de: 0 },
  { x: 11, y: 48, s: 1, o: 0.3, t: false, d: 0, de: 0 },
  { x: 8, y: 78, s: 1, o: 0.45, t: true, d: 9, de: 1.2 },
  { x: 15, y: 26, s: 1, o: 0.25, t: false, d: 0, de: 0 },
  { x: 20, y: 90, s: 2, o: 0.6, t: true, d: 11, de: 0.4 },
  { x: 26, y: 8, s: 1, o: 0.5, t: true, d: 8, de: 2.1 },
  { x: 30, y: 55, s: 2, o: 0.4, t: false, d: 0, de: 0 },
  { x: 35, y: 33, s: 1, o: 0.28, t: true, d: 10, de: 0.8 },
  { x: 39, y: 97, s: 1, o: 0.35, t: false, d: 0, de: 0 },
  { x: 44, y: 16, s: 2, o: 0.65, t: true, d: 6, de: 3.0 },
  { x: 47, y: 68, s: 1, o: 0.4, t: true, d: 12, de: 0.5 },
  { x: 53, y: 44, s: 1, o: 0.2, t: false, d: 0, de: 0 },
  { x: 57, y: 84, s: 2, o: 0.55, t: true, d: 9, de: 1.6 },
  { x: 62, y: 6, s: 1, o: 0.45, t: true, d: 7, de: 2.6 },
  { x: 66, y: 30, s: 1, o: 0.3, t: false, d: 0, de: 0 },
  { x: 70, y: 92, s: 2, o: 0.7, t: true, d: 13, de: 0.2 },
  { x: 74, y: 58, s: 1, o: 0.25, t: true, d: 8, de: 1.0 },
  { x: 79, y: 21, s: 2, o: 0.5, t: false, d: 0, de: 0 },
  { x: 83, y: 76, s: 1, o: 0.35, t: true, d: 10, de: 2.8 },
  { x: 88, y: 42, s: 1, o: 0.6, t: true, d: 6, de: 0.9 },
  { x: 93, y: 11, s: 2, o: 0.4, t: false, d: 0, de: 0 },
  { x: 97, y: 64, s: 1, o: 0.45, t: true, d: 11, de: 1.8 },
  { x: 3, y: 94, s: 1, o: 0.3, t: true, d: 9, de: 3.4 },
  { x: 13, y: 62, s: 1, o: 0.55, t: false, d: 0, de: 0 },
  { x: 22, y: 38, s: 1, o: 0.2, t: false, d: 0, de: 0 },
  { x: 28, y: 100, s: 2, o: 0.5, t: true, d: 7, de: 0.6 },
  { x: 33, y: 72, s: 1, o: 0.4, t: true, d: 12, de: 1.4 },
  { x: 41, y: 4, s: 1, o: 0.3, t: false, d: 0, de: 0 },
  { x: 49, y: 55, s: 2, o: 0.65, t: true, d: 8, de: 2.4 },
  { x: 55, y: 13, s: 1, o: 0.35, t: false, d: 0, de: 0 },
  { x: 60, y: 75, s: 1, o: 0.5, t: true, d: 10, de: 0.3 },
  { x: 64, y: 48, s: 1, o: 0.22, t: true, d: 6, de: 3.2 },
  { x: 68, y: 3, s: 2, o: 0.55, t: true, d: 14, de: 0.7 },
  { x: 73, y: 66, s: 1, o: 0.3, t: false, d: 0, de: 0 },
  { x: 77, y: 88, s: 1, o: 0.4, t: true, d: 9, de: 1.1 },
  { x: 82, y: 52, s: 2, o: 0.5, t: true, d: 12, de: 2.2 },
  { x: 86, y: 19, s: 1, o: 0.28, t: false, d: 0, de: 0 },
  { x: 91, y: 80, s: 1, o: 0.6, t: true, d: 7, de: 0.5 },
  { x: 95, y: 28, s: 2, o: 0.45, t: true, d: 10, de: 1.9 },
  { x: 6, y: 34, s: 1, o: 0.5, t: true, d: 8, de: 3.6 },
  { x: 18, y: 84, s: 2, o: 0.35, t: false, d: 0, de: 0 },
  { x: 37, y: 46, s: 1, o: 0.55, t: true, d: 13, de: 0.1 },
  { x: 52, y: 96, s: 1, o: 0.4, t: true, d: 9, de: 2.9 },
  { x: 89, y: 68, s: 1, o: 0.5, t: true, d: 11, de: 1.3 },
];

const GLOWS: Glow[] = [
  { x: 78, y: -6, w: 620, h: 620, o: 0.09, d: 34, de: 0 },
  { x: 6, y: 42, w: 500, h: 500, o: 0.06, d: 42, de: 6 },
  { x: 60, y: 78, w: 560, h: 560, o: 0.07, d: 38, de: 12 },
];

const PARTICLES: Particle[] = [
  { x: 12, y: 60, s: 2, o: 0.5, d: 26, de: 0 },
  { x: 26, y: 30, s: 2, o: 0.35, d: 32, de: 4 },
  { x: 42, y: 78, s: 2, o: 0.45, d: 24, de: 9 },
  { x: 58, y: 44, s: 2, o: 0.3, d: 36, de: 2 },
  { x: 72, y: 12, s: 2, o: 0.4, d: 28, de: 7 },
  { x: 85, y: 66, s: 2, o: 0.5, d: 31, de: 11 },
  { x: 94, y: 38, s: 2, o: 0.35, d: 34, de: 5 },
];

export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="space-bg"
    >
      {/* Layer 1 — deep near-black base with subtle depth (never flat black) */}
      <div className="space-bg-base" />

      {/* Layer 2 — sparse, elegant star field */}
      <div className="space-bg-stars">
        {STARS.map((s, i) => (
          <span
            key={i}
            className={`space-star${s.t ? ' space-star--tw' : ''}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.s}px`,
              height: `${s.s}px`,
              opacity: s.o,
              animationDuration: s.t ? `${s.d}s` : undefined,
              animationDelay: s.t ? `${s.de}s` : undefined,
            }}
          />
        ))}
      </div>

      {/* Layer 3 — subtle animated orange ambient glow */}
      {GLOWS.map((g, i) => (
        <div
          key={`g${i}`}
          className="space-bg-glow"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: `${g.w}px`,
            height: `${g.h}px`,
            opacity: g.o,
            animationDuration: `${g.d}s`,
            animationDelay: `${g.de}s`,
          }}
        />
      ))}

      {/* Layer 4 — faint rising particles (desktop only) */}
      <div className="space-bg-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={`p${i}`}
            className="space-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              opacity: p.o,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.de}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}