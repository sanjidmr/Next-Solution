"use client";

import { Sparkles, Users, CalendarClock, Rocket, Lock, HeartHandshake, MessageSquare } from 'lucide-react';

const REASONS = [
  {
    icon: Users,
    en: {
      title: 'Senior Engineers Only',
      desc: 'No juniors learning on your payroll. Senior engineers, designers, and SEO strategists build your product end-to-end.',
    },
    bn: {
      title: 'শুধুই সিনিয়র ইঞ্জিনিয়ার',
      desc: 'আপনার বাজেটে জুনিয়র শেখার খরচ নেই। সিনিয়র ইঞ্জিনিয়ার, ডিজাইনার ও এসইও স্ট্র্যাটেজিস্ট শুরু থেকে শেষ পর্যন্ত আপনার পণ্য বানান।',
    },
  },
  {
    icon: CalendarClock,
    en: {
      title: 'Fixed Price, Fixed Deadline',
      desc: 'Transparent fixed pricing with milestone-based delivery. You always know what you pay and exactly when you launch.',
    },
    bn: {
      title: 'ফিক্সড প্রাইস, ফিক্সড ডেডলাইন',
      desc: 'মাইলস্টোন-ভিত্তিক ডেলিভারির সাথে স্বচ্ছ ফিক্সড প্রাইসিং। কী দিতে হবে আর কবে লঞ্চ হবে — সব আগে থেকেই জানা।',
    },
  },
  {
    icon: Rocket,
    en: {
      title: 'Launch-Ready Engineering',
      desc: 'Typesafe, tested, and scalable code with audit-optimized performance and modern security from day one.',
    },
    bn: {
      title: 'লঞ্চ-রেডি ইঞ্জিনিয়ারিং',
      desc: 'টাইপসেফ, টেস্টেড ও স্কেলেবল কোড — প্রথম দিন থেকেই সর্বোচ্চ পারফরম্যান্স আর আধুনিক সিকিউরিটি।',
    },
  },
  {
    icon: Lock,
    en: {
      title: '100% Ownership & NDA',
      desc: 'Source code, designs, and assets are fully yours. Strict NDAs protect your idea before you even sign.',
    },
    bn: {
      title: '১০০% স্বত্বাধিকার ও NDA',
      desc: 'সোর্স কোড, ডিজাইন আর অ্যাসেট ১০০% আপনার। সাইন করার আগেই কঠোর NDA আপনার আইডিয়া রক্ষা করে।',
    },
  },
  {
    icon: HeartHandshake,
    en: {
      title: 'Free Post-Launch Care',
      desc: '30 days of free support and performance monitoring after launch. We don\'t vanish once the invoice is paid.',
    },
    bn: {
      title: 'ফ্রি পোস্ট-লঞ্চ কেয়ার',
      desc: 'লঞ্চের পর ৩০ দিন ফ্রি সাপোর্ট ও পারফরম্যান্স মনিটরিং। ইনভয়েস মেটালেই আমরা অদৃশ্য হই না।',
    },
  },
  {
    icon: MessageSquare,
    en: {
      title: 'Weekly Transparent Updates',
      desc: 'A dedicated senior partner and weekly progress reports. You never have to chase us for updates.',
    },
    bn: {
      title: 'সাপ্তাহিক স্বচ্ছ আপডেট',
      desc: 'একজন ডেডিকেটেড সিনিয়র পার্টনার আর সাপ্তাহিক প্রোগ্রেস রিপোর্ট। আপডেটের জন্য আপনাকে পেছনে তাড়া করতে হয় না।',
    },
  },
] as const;

const STATS = [
  { value: '20+', en: 'Projects Delivered', bn: 'ডেলিভারড প্রজেক্ট' },
  { value: '6+', en: 'Years Avg. Senior Experience', bn: 'বছর সিনিয়র অভিজ্ঞতা' },
  { value: '30', en: 'Days Free Post-Launch', bn: 'দিন ফ্রি সাপোর্ট' },
  { value: '98%', en: 'Client Retention', bn: 'ক্লায়েন্ট সন্তুষ্টি' },
] as const;

interface WhyChooseNextSectionProps {
  currentLang: 'en' | 'bn';
}

export default function WhyChooseNextSection({ currentLang }: WhyChooseNextSectionProps) {
  const isEn = currentLang === 'en';

  return (
    <section id="why-next-solution" className="relative overflow-hidden bg-[#050505] py-24 sm:py-28 border-t border-white/[0.06]">
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-orange-500/[0.05] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-orange-600/[0.04] blur-[120px]" />
      </div>

      {/* grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            {isEn ? 'Why Next Solution' : 'কেন নেক্সট সলিউশন'}
          </span>

          <h2 className="mt-6 font-display text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isEn ? (
              <>Why Clients Choose <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Next Solution</span></>
            ) : (
              <>ক্লায়েন্টরা কেন বেছে নেয় <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">নেক্সট সলিউশন</span></>
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-500">
            {isEn
              ? 'Trusted by startups, agencies, and growing brands that need a partner — not a vendor. Here\'s what makes us different.'
              : 'স্টার্টআপ, এজেন্সি ও গড়ে ওঠা ব্র্যান্ডদের কাছে বিশ্বস্ত — যাদের দরকার পার্টনার, ভেন্ডর নয়। এটাই আমাদের পার্থক্য।'}
          </p>
        </div>

        {/* reason cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            const copy = isEn ? reason.en : reason.bn;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.04]"
              >
                <span className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-bold text-white/[0.04] transition-colors duration-300 group-hover:text-orange-500/20">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-base font-bold text-white">{copy.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{copy.desc}</p>
              </div>
            );
          })}
        </div>

        {/* trust strip */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.value} className="bg-[#0a0a09] px-6 py-7 text-center">
              <p className="font-display text-3xl font-bold text-orange-400">{stat.value}</p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {isEn ? stat.en : stat.bn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* bottom fade into footer */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050505]" />
    </section>
  );
}