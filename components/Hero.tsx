"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  ArrowRight,
  Play,
  Award,
  Heart,
  Clock,
  Users,
} from "lucide-react";
import { motion } from 'motion/react';
import CountUp from '@/components/motion/CountUp';
import { TRUSTED_BY as trustedBy } from '@/data/trustedBy';

interface HeroProps {
  currentLang: "en" | "bn";
  setTab: (tab: string) => void;
}

export default function Hero({ currentLang, setTab }: HeroProps) {
  const isEn = currentLang === "en";

  const stats = [
    {
      value: "50+",
      label: isEn ? "Projects Completed" : "সম্পন্ন প্রজেক্ট",
      icon: Award,
    },
    {
      value: "98%",
      label: isEn ? "Client Satisfaction" : "গ্রাহক সন্তুষ্টি",
      icon: Heart,
    },
    {
      value: "2+",
      label: isEn ? "Years Experience" : "বছরের অভিজ্ঞতা",
      icon: Clock,
    },
    {
      value: "20+",
      label: isEn ? "Happy Clients" : "সন্তুষ্ট ক্লায়েন্ট",
      icon: Users,
    },
  ];

  return (
    <section
      id="hero-section"
      data-space-hero
      className="relative overflow-hidden bg-white font-sans selection:bg-orange-600 selection:text-white transition-colors duration-300 dark:bg-[#0A0A0A]"
    >
      <style>{`
        @keyframes heroFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }

          20% {
            opacity: 0.9;
          }

          100% {
            transform: translateY(-60px) scale(0.7);
            opacity: 0;
          }
        }

        .hero-particle {
          animation: heroFloat 4.5s ease-out infinite;
        }

        @keyframes orangePulse {
          0%,
          100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        .orange-pulse {
          animation: orangePulse 3s ease-in-out infinite;
        }

        @keyframes gateGlow {
          0%,
          100% {
            filter: drop-shadow(0 30px 35px rgba(0, 0, 0, 0.2));
          }

          50% {
            filter: drop-shadow(
              0 35px 50px rgba(255, 77, 0, 0.18)
            );
          }
        }

        .gate-image {
          animation: gateGlow 5s ease-in-out infinite;
        }

        @keyframes trustedMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .trusted-marquee {
          animation: trustedMarquee 30s linear infinite;
        }

        .trusted-marquee:hover {
          animation-play-state: paused;
        }

        .hero-grid {
          background-size: 34px 34px;

          background-image:
            linear-gradient(
              to right,
              rgba(255, 77, 0, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 77, 0, 0.035) 1px,
              transparent 1px
            );

          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 30%,
            #000 40%,
            transparent 100%
          );

          -webkit-mask-image: radial-gradient(
            ellipse 80% 70% at 50% 30%,
            #000 40%,
            transparent 100%
          );
        }
      `}</style>

      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-100/40 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 top-[45%] h-[420px] w-[420px] rounded-full bg-orange-50/70 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-5 sm:px-7 lg:px-10 xl:px-12">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-6
            pt-6
            pb-6
            sm:gap-10
            sm:pt-10
            sm:pb-10
            lg:grid-cols-[1.15fr_1fr]
            lg:gap-10
            lg:pt-12
            lg:pb-14
            xl:grid-cols-[1.15fr_1fr]
          "
        >
          <motion.div
            initial={{ opacity: 0, y: -110 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 order-1 text-center lg:pr-0 lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: -34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center justify-center gap-3 lg:justify-start"
            >
              <span className="h-[2px] w-7 bg-orange-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-600 sm:text-xs">
                {isEn
                  ? "ONE AGENCY. ALL DIGITAL SOLUTIONS."
                  : "একটি এজেন্সি। সব ডিজিটাল সলিউশন।"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="
                max-w-[720px]
                text-[2.15rem]
                font-black
                leading-[1.05]
                tracking-[-0.035em]
                text-[#090909]
                dark:text-white
                sm:text-[2.9rem]
                md:text-[3.2rem]
                lg:text-[3.4rem]
                xl:text-[3.9rem]
                2xl:text-[4.3rem]
              "
            >
              {isEn ? (
                <>
                  We Turn Your
                  <br />

                  Ideas Into{" "}
                  <span className="text-orange-600">
                    Impact.
                  </span>

                  <br />

                  <span className="text-orange-600">
                    Your All-In-One
                  </span>{" "}
                  Digital Friend.
                </>
              ) : (
                <>
                  আমরা আপনার
                  <br />

                  আইডিয়া করি{" "}
                  <span className="text-orange-600">
                    ইমপ্যাক্টে পরিণত।
                  </span>

                  <br />

                  <span className="text-orange-600">
                    আপনার অল-ইন-ওয়ান
                  </span>{" "}
                  ডিজিটাল ফ্রেন্ড।
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-4 max-w-[560px] text-sm font-medium leading-6 text-gray-600 dark:text-neutral-400 sm:mt-7 sm:text-base lg:text-lg lg:mx-0"
            >
              {isEn
                ? "From powerful websites to digital growth strategies — we deliver complete solutions that drive real results."
                : "শক্তিশালী ওয়েবসাইট থেকে ডিজিটাল গ্রোথ স্ট্র্যাটেজি — আমরা বাস্তব ফলাফল আনার জন্য সম্পূর্ণ সলিউশন দেই।"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex flex-wrap items-center justify-center gap-5 lg:mt-8 lg:justify-start"
            >
              <button
                id="hero-primary-cta"
                onClick={() => setTab("contact")}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-orange-600
                  px-8
                  py-5
                  text-base
                  font-bold
                  text-white
                  shadow-[0_16px_35px_-12px_rgba(255,77,0,0.65)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-orange-500
                  hover:shadow-[0_20px_45px_-10px_rgba(255,77,0,0.75)]
                  active:translate-y-0
                "
              >
                <span>
                  {isEn ? "Start Your Project" : "প্রজেক্ট শুরু করুন"}
                </span>

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTab("portfolio")}
                  aria-label={
                    isEn
                      ? "Watch Our Showreel"
                      : "আমাদের শোরিল দেখুন"
                  }
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-200
                    bg-white
                    text-orange-600
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-500
                    hover:bg-orange-50
                    hover:shadow-lg
                    dark:border-orange-500/30
                    dark:bg-neutral-900
                    dark:text-orange-400
                    dark:hover:border-orange-400
                    dark:hover:bg-orange-500/10
                  "
                >
                  <Play className="h-5 w-5 translate-x-px fill-orange-600 dark:fill-orange-400" />
                </button>

                <div className="text-left">
                  <p className="text-base font-bold text-[#090909] dark:text-white">
                    {isEn
                      ? "Watch Our Showreel"
                      : "আমাদের শোরিল দেখুন"}
                  </p>

                  <p className="text-xs font-medium text-gray-500 dark:text-neutral-500">
                    {isEn ? "2 min video" : "২ মিনিটের ভিডিও"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 160 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-20
              order-2
              flex
              min-h-[200px]
              items-center
              justify-center
              sm:min-h-[420px]
              lg:min-h-[640px]
              lg:justify-end
            "
          >
            <div
              className="
                relative
                flex
                w-full
                max-w-[480px]
                items-center
                justify-center
                sm:max-w-[620px]
                lg:w-[560px]
                lg:max-w-none
                xl:w-[660px]
                2xl:w-[760px]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[6%]
                  left-1/2
                  h-[320px]
                  w-[420px]
                  -translate-x-1/2
                  rounded-full
                  bg-orange-500/10
                  blur-[100px]
                "
                aria-hidden="true"
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-[6%]
                  left-1/2
                  h-16
                  w-[80%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-black/20
                  blur-3xl
                "
                aria-hidden="true"
              />

              <img
                src="/gate.png"
                alt="Next Solution Digital Gateway"
                className="
                  gate-image
                  relative
                  z-10
                  block
                  h-auto
                  w-full
                  object-contain
                "
              />

              <span
                className="
                  hero-particle
                  absolute
                  bottom-[24%]
                  left-[31%]
                  z-20
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-orange-500
                  blur-[1px]
                "
              />

              <span
                className="
                  hero-particle
                  absolute
                  bottom-[30%]
                  right-[27%]
                  z-20
                  h-1
                  w-1
                  rounded-full
                  bg-orange-400
                  blur-[1px]
                "
                style={{ animationDelay: "1.4s" }}
              />

              <span
                className="
                  hero-particle
                  absolute
                  bottom-[20%]
                  right-[34%]
                  z-20
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-orange-500
                  blur-[1px]
                "
                style={{ animationDelay: "2.5s" }}
              />
            </div>
          </motion.div>
        </div>

        <div className="relative z-40 mt-2 pb-8 lg:-mt-4">
          <div
            className="
              grid
              grid-cols-2
              overflow-hidden
              rounded-3xl
              border
              border-gray-100
              bg-white
              shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]
              dark:border-neutral-800
              dark:bg-[#141414]
              dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]
              lg:grid-cols-4
            "
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;

              return (
                <div
                  key={idx}
                  className={`
                    relative
                    flex
                    items-center
                    justify-center
                    gap-3
                    px-4
                    py-6
                    text-center
                    sm:gap-4
                    lg:py-5
                    ${idx > 1
                      ? "border-t border-gray-100 dark:border-neutral-800 lg:border-t-0"
                      : ""
                    }
                    ${idx % 2 === 1
                      ? "max-lg:border-l max-lg:border-gray-100 dark:max-lg:border-neutral-800"
                      : ""
                    }
                    ${idx > 0
                      ? "lg:border-l lg:border-gray-100 dark:lg:border-neutral-800"
                      : ""
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-orange-100
                      bg-orange-50
                      text-orange-600
                      dark:border-orange-500/20
                      dark:bg-orange-500/10
                      dark:text-orange-400
                    "
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="text-left">
                    <p className="text-3xl font-black leading-none text-[#090909] dark:text-white sm:text-4xl">
                      <CountUp value={stat.value} duration={1.8} />
                    </p>

                    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-orange-600/70 dark:text-orange-400/80 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-40 mt-4 pb-10 lg:mt-6">
          <div className="flex items-center justify-center gap-4">
            <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-gray-500 dark:text-neutral-400 sm:text-sm">
              {isEn ? "Trusted by Industry Leaders" : "আস্থার সাথে কাজ করেছে"}
            </p>
          </div>

          <div className="relative mt-5 overflow-hidden py-2">
            <div className="trusted-marquee flex w-max items-center">
              {[...trustedBy, ...trustedBy].map((name, i) => (
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

            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0A0A0A] dark:to-transparent sm:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0A0A0A] dark:to-transparent sm:w-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
