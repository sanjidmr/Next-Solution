"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { translations } from '@/data/translations';
import { getServices } from '@/lib/db';
import { initialServices } from '@/data/initialData';
import { Service } from '@/types';
import Reveal from '@/components/motion/Reveal';
import HeroEntrance from '@/components/motion/HeroEntrance';

function TechIcon({ logo }: { logo: string }) {
  switch (logo) {
    case 'react':
      return (
        <svg className="h-5 w-5 text-sky-400 animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'nextjs':
      return (
        <svg className="h-5 w-5 text-neutral-900 dark:text-white" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="90" fill="currentColor"/>
          <path d="M149.508 157.52L69.142 54H54v72h14.4V69.752l65.842 85.344c4.686-5.184 8.784-10.944 12.184-17.184l-11.918 19.608z" fill="white"/>
          <rect x="115" y="54" width="14" height="72" fill="white"/>
        </svg>
      );
    case 'tailwind':
      return (
        <svg className="h-5 w-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case 'typescript':
      return (
        <svg className="h-5 w-5 rounded text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.39 2.39h19.22v19.22H2.39V2.39z" fill="#3178c6" />
          <path d="M11.57 14.12c-.17-.38-.45-.69-.85-.92-.4-.23-.92-.35-1.54-.35-.34 0-.67.04-.97.11-.3.07-.56.19-.78.35-.22.16-.39.36-.5.6-.11.24-.17.52-.17.84 0 .34.07.61.2.82.13.21.32.39.55.53.23.14.5.25.81.33.31.08.62.16.94.23.51.11.98.24 1.41.39.43.15.8.36 1.11.63.31.27.55.61.72 1.01.17.4.25.9.25 1.51 0 .61-.1 1.14-.31 1.6-.21.46-.51.84-.91 1.14-.4.3-.87.52-1.42.66s-1.15.21-1.81.21c-.74 0-1.42-.09-2.03-.27-.61-.18-1.14-.46-1.59-.83-.45-.37-.79-.84-1.01-1.41-.22-.57-.33-1.25-.33-2.03h2.39c0 .48.09.87.28 1.17.19.3.45.53.79.69.34.16.73.24 1.17.24.36 0 .69-.04.99-.12.3-.08.55-.21.75-.39.2-.18.35-.41.45-.69.1-.28.15-.62.15-1.02 0-.34-.06-.62-.18-.84s-.3-.4-.54-.54c-.24-.14-.52-.25-.84-.33-.32-.08-.66-.16-1.02-.24-.48-.1-.94-.22-1.37-.36-.43-.14-.8-.33-1.11-.57-.31-.24-.55-.54-.72-.9-.17-.36-.26-.81-.26-1.35 0-.53.11-.99.33-1.39.22-.4.53-.73.93-.99.4-.26.87-.45 1.41-.57.54-.12 1.11-.18 1.71-.18.66 0 1.27.08 1.83.24s1.04.4 1.45.72c.41.32.73.73.95 1.23s.34 1.09.35 1.77h-2.39c-.01-.43-.11-.79-.29-1.08zM21.61 4.54H14v2.16h2.52v12.42h2.57V6.7h2.52V4.54z" fill="#fff"/>
        </svg>
      );
    case 'vite':
      return (
        <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
          <path d="M18 31.5L29 5.5H16L18 31.5Z" fill="#BD34FE" />
          <path d="M14 31.5L3 5.5H16L14 31.5Z" fill="#41B883" />
          <path d="M16 2L22 14H10L16 2Z" fill="#FFC517" />
        </svg>
      );
    case 'javascript':
      return (
        <svg className="h-5 w-5 rounded text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="24" fill="#f7df1e" rx="3" />
          <path d="M12.15 17.56c.15.31.42.56.8.76.38.2.85.3 1.39.3.56 0 1.02-.12 1.38-.37.36-.25.54-.64.54-1.18 0-.46-.14-.81-.43-1.05s-.74-.44-1.34-.6l-1-.26c-.8-.21-1.42-.51-1.85-.92-.43-.41-.65-.98-.65-1.72 0-.74.25-1.33.74-1.77s1.17-.66 2.03-.66c.71 0 1.31.14 1.79.43.48.29.81.71.99 1.26h-2.14c-.11-.27-.28-.47-.53-.6-.25-.13-.56-.2-.93-.2-.39 0-.7.08-.94.25s-.35.4-.35.71c0 .3.11.53.33.69s.56.31 1.02.43l1 .26c1 .26 1.74.6 2.22 1.04.48.44.72 1.08.72 1.93 0 .86-.29 1.54-.87 2.04s-1.41.75-2.48.75c-.95 0-1.74-.21-2.37-.62s-1-.99-1.12-1.74h2.15zM4.17 14.12h2.16c.07.45.22.79.46 1.02.24.23.59.35 1.05.35.41 0 .73-.1.96-.3.23-.2.35-.49.35-.86v-6.31h2.42v6.31c0 .94-.28 1.68-.83 2.2s-1.35.78-2.39.78c-.99 0-1.77-.24-2.34-.73s-.88-1.16-.94-2.02z" fill="#000" />
        </svg>
      );
    case 'html5':
      return (
        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 17l.5-5.3H8.3l-.2-2.3h8.8l.2-2.4H5.8l.6 7h8.1l-.4 3.8-2.1.7-2.1-.7-.1-1.3H7.6l.2 2.9 4.2 1.3 4.2-1.3.7-3.8z" />
        </svg>
      );
    case 'css3':
      return (
        <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 17l.5-5.3H8.3l-.2-2.3h8.8l.2-2.4H5.8l.6 7h8.1l-.4 3.8-2.1.7-2.1-.7-.1-1.3H7.6l.2 2.9 4.2 1.3 4.2-1.3.7-3.8z" fill="#1572B6" />
        </svg>
      );
    case 'nodejs':
      return (
        <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-.1-3.6c-.1.3-.4.5-.7.5h-1.4c-.3 0-.6-.2-.7-.5l-.7-3.2c-.1-.5.3-1 .8-1h1.9c.5 0 .9.5.8 1l-.7 3.2z" />
        </svg>
      );
    case 'express':
      return (
        <div className="text-xs font-black text-neutral-800 dark:text-neutral-100 tracking-tighter">ex</div>
      );
    case 'postgresql':
      return (
        <svg className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" opacity=".1" />
          <path d="M15.4 6.6c-.6-.6-1.5-.9-2.4-.9-1.9 0-3.5 1.3-4 3.1h2.2c.4-.8 1.1-1.3 1.8-1.3.9 0 1.6.6 1.8 1.5h2.1c-.2-1-.7-1.8-1.5-2.4z" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity=".1" />
          <path d="M12 3s-3 4-3 7.5c0 3 1.5 4.5 3 6 1.5-1.5 3-3 3-6C15 7 12 3 12 3z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'redis':
      return (
        <svg className="h-5 w-5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 13h20v4H2v-4zm0-6h20v4H2V7z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="9" r="1.5" />
          <circle cx="5" cy="15" r="1.5" />
        </svg>
      );
    case 'supabase':
      return (
        <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.4 11.6l-8.3-9c-.4-.4-1.1-.1-1.1.5v6.4H5.2c-.7 0-1.1.8-.6 1.3l8.3 9c.4.4 1.1.1 1.1-.5v-6.4h6.8c.7 0 1.1-.8.6-1.3z" />
        </svg>
      );
    case 'docker':
      return (
        <svg className="h-5 w-5 text-cyan-500 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.6 11h16.8a1 1 0 001-1V5a1 1 0 00-1-1H3.6a1 1 0 00-1 1v5a1 1 0 001 1z" opacity=".2" />
          <path d="M22.3 12.83c-.48-.6-1.34-.84-2-.6a5.1 5.1 0 00-4.4-.1" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'flutter':
      return (
        <svg className="h-5 w-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5 1.5L2.25 12.75h4.5L18 1.5h-4.5zm0 9.0l-4.5 4.5h4.5l4.5-4.5h-4.5zm-4.5 9.0l-4.5 4.5h4.5l4.5-4.5H9.0z" />
        </svg>
      );
    case 'swift':
      return (
        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.5 12c-2.4 2.1-5.7 3.2-8.5 2.5-1.5-.4-2.8-1.2-3.8-2.2-2-2-3-4.5-3.5-6.8 1.8 1.4 4 2.1 6.3 2 1.4-.1 2.8-.5 4-1.2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'kotlin':
      return (
        <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 1.5h21L1.5 22.5V1.5z" opacity=".2" />
          <path d="M1.5 1.5h11l11 11-11 10h-11v-21z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'figma':
      return (
        <svg className="h-5 w-5" viewBox="0 0 120 180" fill="none">
          <path d="M30 45C30 20.1472 50.1472 0 75 0C99.8528 0 120 20.1472 120 45C120 69.8528 99.8528 90 75 90C50.1472 90 30 69.8528 30 45Z" fill="#F24E1E"/>
          <path d="M30 135C30 110.147 50.1472 90 75 90V180C50.1472 180 30 159.853 30 135Z" fill="#0ACF83"/>
          <path d="M75 90C99.8528 90 120 110.147 120 135C120 159.853 99.8528 180 75 180C50.1472 180 30 159.853 30 135C30 110.147 50.1472 90 75 90Z" fill="#1ABCFE"/>
        </svg>
      );
    case 'framer':
      return (
        <svg className="h-5 w-5 text-neutral-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L24 12H12V24L0 12H12V0z" />
        </svg>
      );
    case 'gemini':
      return (
        <svg className="h-5 w-5 text-indigo-500 animate-pulse" viewBox="0 0 24 24" fill="none">
          <path d="M12 3c.13 4.28 3.59 7.74 7.87 7.87a8.03 8.03 0 01-7.87 7.87c-.13-4.28-3.59-7.74-7.87-7.87A8.03 8.03 0 0112 3z" fill="url(#geminiGrad)"/>
          <defs>
            <linearGradient id="geminiGrad" x1="4" y1="4" x2="20" y2="20">
              <stop offset="0%" stopColor="#4158D0" />
              <stop offset="50%" stopColor="#C850C0" />
              <stop offset="100%" stopColor="#FFCC70" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'openai':
      return (
        <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-[spin_20s_linear_infinite]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.2 11.2a4.4 4.4 0 00-2.4-3.2 4.4 4.4 0 00.3-4 4.4 4.4 0 00-3.3-1.6 4.4 4.4 0 00-3.8-1.1 4.4 4.4 0 00-4 .3 4.4 4.4 0 00-3.2 2.4 4.4 4.4 0 00-4-.3A4.4 4.4 0 001.3 7c-.6 1.2-.7 2.6-.3 3.8a4.4 4.4 0 00-2.4 3.2 4.4 4.4 0 00-.3 4c.6 1.2 1.7 2.2 3 2.7a4.4 4.4 0 003.8 1.1 4.4 4.4 0 004-.3 4.4 4.4 0 003.2-2.4 4.4 4.4 0 004 .3 4.4 4.4 0 002.5-3.2c1.2-.6 2.2-1.7 2.7-3 .6-1.2.7-2.6.3-3.8zm-11.8 8l-3.2-1.8.1-1.3 3.1 1.8V19.2zm-.9-5.4L5.3 11.9l1.1-.6 3.2 1.9v3.6l-1.1-.6zm4-.2l-3.2-1.8.1-3.6 3.1 1.8V13.6zm.9-5.4L11.1 6.3l1.1-.6 3.2 1.9v3.6l-1.1-.6z" />
        </svg>
      );
    case 'python':
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.12 1.5c-2.32 0-4.4 1.34-4.4 3.54h4.4v1.1H6.12c-2.2 0-3.54 1.34-3.54 3.54v3.3h1.66V9.44c0-1.47 1.18-2.65 2.65-2.65H12.12c1.47 0 2.65-1.18 2.65-2.65v-1.1c0-2.2-1.34-3.54-3.54-3.54h.89z" fill="#3776ab" />
        </svg>
      );
    default:
      return (
        <div className="h-5 w-5 flex items-center justify-center font-extrabold text-[9px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-lg font-mono">
          {logo.substring(0, 2).toUpperCase()}
        </div>
      );
  }
}

interface ServicesSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

export default function ServicesSection({ currentLang, setTab, isFullPage = false }: ServicesSectionProps) {
  const t = translations[currentLang];
  const [services, setServices] = useState<Service[]>(initialServices);
  useEffect(() => {
    setServices(getServices());
  }, []);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'design' | 'automation' | 'video' | 'marketing'>('frontend');

  // Tech Stack categories
  const techCategories = useMemo(() => [
    {
      titleEn: 'Frontend Frameworks & Libraries',
      titleBn: 'ফ্রন্টএন্ড ফ্রেমওয়ার্ক ও লাইব্রেরি',
      descEn: 'We design ultra-fast, responsive, and completely interactive client-facing experiences.',
      descBn: 'আমরা ডিজাইন করি অত্যন্ত গতিসম্পন্ন ও ব্যবহারকারী-বান্ধব চমৎকার ইউজার ইন্টারফেস।',
      direction: 'left',
      techs: [
        { name: 'Next.js', tagEn: 'Server Engine', tagBn: 'সার্ভার ইঞ্জিন', logo: 'nextjs' },
        { name: 'React', tagEn: 'UI Library', tagBn: 'ইউআই লাইব্রেরি', logo: 'react' },
        { name: 'Tailwind CSS', tagEn: 'Utility Styling', tagBn: 'ইউটিলিটি স্টাইলিং', logo: 'tailwind' },
        { name: 'TypeScript', tagEn: 'Strict Types', tagBn: 'টাইপ-সেফ কোড', logo: 'typescript' },
        { name: 'Vite', tagEn: 'Fast Bundler', tagBn: 'ফাস্ট বান্ডলার', logo: 'vite' },
        { name: 'JavaScript', tagEn: 'Client Scripts', tagBn: 'ক্লায়েন্ট স্ক্রিপ্ট', logo: 'javascript' },
        { name: 'HTML5', tagEn: 'Page Structure', tagBn: 'ওয়েব স্ট্রাকচার', logo: 'html5' },
        { name: 'CSS3', tagEn: 'Custom Layouts', tagBn: 'কাস্টম লেআউট', logo: 'css3' }
      ]
    },
    {
      titleEn: 'Backend & Cloud Databases',
      titleBn: 'ব্যাকএন্ড ও ডাটাবেস',
      descEn: 'Scalable cloud architectures built with persistent, typesafe, and high-concurrency systems.',
      descBn: 'অত্যন্ত শক্তিশালী ও স্কেলেবল সার্ভার যা মিলি-সেকেন্ডে নিখুঁত ডাটা লোড নিশ্চিত করে।',
      direction: 'right',
      techs: [
        { name: 'Node.js', tagEn: 'Server Runtime', tagBn: 'সার্ভার রানটাইম', logo: 'nodejs' },
        { name: 'Express', tagEn: 'API Framework', tagBn: 'এপিআই ফ্রেমওয়ার্ক', logo: 'express' },
        { name: 'PostgreSQL', tagEn: 'SQL Database', tagBn: 'রিলেশনাল ডাটাবেস', logo: 'postgresql' },
        { name: 'MongoDB', tagEn: 'NoSQL Storage', tagBn: 'নো-এসকিউএল স্টোরেজ', logo: 'mongodb' },
        { name: 'Redis', tagEn: 'In-Memory Cache', tagBn: 'ইন-মেমোরি ক্যাশ', logo: 'redis' },
        { name: 'Supabase', tagEn: 'Backend Engine', tagBn: 'ব্যাকএন্ড ইঞ্জিন', logo: 'supabase' },
        { name: 'Docker', tagEn: 'Microcontainers', tagBn: 'কনটেইনারাইজেশন', logo: 'docker' },
        { name: 'GraphQL', tagEn: 'Dynamic API Queries', tagBn: 'এপিআই কুয়েরি', logo: 'graphql' }
      ]
    },
    {
      titleEn: 'Premium UI/UX Design',
      titleBn: 'ইউআই/ইউএক্স ডিজাইন',
      descEn: 'Bespoke UI layouts, pixel-perfect interactive systems, and strict branding guidebooks.',
      descBn: 'অনন্য লেআউট, নিখুঁত ডিজাইন টোকেন এবং ব্র্যান্ডের রূপরেখা ফুটিয়ে তোলা চমৎকার কালার প্যালেট।',
      direction: 'right',
      techs: [
        { name: 'Figma', tagEn: 'Design Systems', tagBn: 'ডিজাইন সিস্টেম', logo: 'figma' },
        { name: 'Framer', tagEn: 'Motion Layouts', tagBn: 'মোশন প্রোটোটাইপ', logo: 'framer' },
        { name: 'Photoshop', tagEn: 'Raster Editing', tagBn: 'ফটো এডিটিং', logo: 'photoshop' },
        { name: 'Illustrator', tagEn: 'Vector Graphics', tagBn: 'ভেক্টর গ্রাফিক্স', logo: 'illustrator' },
        { name: 'Adobe XD', tagEn: 'Wireframes', tagBn: 'ওয়্যারফ্রেম ডিজাইন', logo: 'adobexd' },
        { name: 'Sketch', tagEn: 'Artboard Layouts', tagBn: 'আর্টবোর্ড লেআউট', logo: 'sketch' }
      ]
    },
    {
      titleEn: 'Commercial Video Editing',
      titleBn: 'ভিডিও এডিটিং',
      descEn: 'Eye-catching social ads, color-graded commercial promos, and dynamic kinetic titles.',
      descBn: 'সামাজিক যোগাযোগ মাধ্যমের জন্য হাই-রিটেনশন ভিডিও এবং কালার-গ্রেডেড আকর্ষনীয় প্রমোশন।',
      direction: 'left',
      techs: [
        { name: 'Premiere Pro', tagEn: 'Timeline Editor', tagBn: 'ভিডিও টাইমলাইন এডিটর', logo: 'premiere' },
        { name: 'After Effects', tagEn: 'Motion FX', tagBn: 'মোশন ভিজ্যুয়াল ইফেক্ট', logo: 'aftereffects' },
        { name: 'DaVinci Resolve', tagEn: 'Color Grading', tagBn: 'কালার গ্রেডিং এক্সপার্ট', logo: 'davinci' },
        { name: 'Audition', tagEn: 'Sound Engineering', tagBn: 'সাউন্ড ডিজাইন', logo: 'audition' },
        { name: 'Blender', tagEn: '3D Animations', tagBn: '৩ডি মডেলিং ও অ্যানিমেশন', logo: 'blender' },
        { name: 'Final Cut', tagEn: 'Pro Mac Editing', tagBn: 'ম্যাক ভিডিও এডিটিং', logo: 'finalcut' }
      ]
    },
    {
      titleEn: 'Digital Marketing & SEO',
      titleBn: 'ডিজিটাল মার্কেটিং ও এসইও',
      descEn: 'Hyper-focused paid ads, conversion-rate optimization, and semantic search authority.',
      descBn: 'সার্চ ইঞ্জিনে প্রথম পেইজের র‍্যাঙ্কিং এবং সর্বোচ্চ আরওআই বিজ্ঞাপন প্রচার পরিকল্পনা।',
      direction: 'right',
      techs: [
        { name: 'Google Ads', tagEn: 'Search Campaigns', tagBn: 'গুগল সার্চ ক্যাম্পেইন', logo: 'googleads' },
        { name: 'Meta Ads', tagEn: 'Social Lead Ads', tagBn: 'মেটা সোশ্যাল অ্যাডস', logo: 'metaads' },
        { name: 'GA4 Analytics', tagEn: 'Event Tracking', tagBn: 'ইউজার ইভেন্ট ট্র্যাকিং', logo: 'ga4' },
        { name: 'Semrush', tagEn: 'Competitor Intelligence', tagBn: 'প্রতিযোগী গবেষণা', logo: 'semrush' },
        { name: 'Ahrefs', tagEn: 'Semantic SEO Tools', tagBn: 'এসইও লিংক বিল্ডিং', logo: 'ahrefs' },
        { name: 'Mailchimp', tagEn: 'Automated Email CRM', tagBn: 'স্বয়ংক্রিয় ইমেইল মার্কেটিং', logo: 'mailchimp' }
      ]
    },
    {
      titleEn: 'AI Services & Agents',
      titleBn: 'এআই সার্ভিস ও এজেন্ট',
      descEn: 'Cognitive decision loops, private LLM pipelines, and headless back-office triggers.',
      descBn: 'ব্যবসায়ের জটিল পুনরাবৃত্তিমূলক কাজ সহজ করতে স্বয়ংক্রিয় ইন্টেলিজেন্ট ওয়ার্কফ্লো।',
      direction: 'left',
      techs: [
        { name: 'Gemini Pro', tagEn: 'Multimodal LLM', tagBn: 'লার্জ ল্যাঙ্গুয়েজ মডেল', logo: 'gemini' },
        { name: 'OpenAI API', tagEn: 'Reasoning Models', tagBn: 'রিজননিং এআই মডেল', logo: 'openai' },
        { name: 'LangChain', tagEn: 'Cognitive Chains', tagBn: 'এআই এজেন্ট ফ্রেমওয়ার্ক', logo: 'langchain' },
        { name: 'n8n', tagEn: 'Workflows Orchestrator', tagBn: 'কাস্টম ওয়ার্কফ্লো নোডস', logo: 'n8n' },
        { name: 'Make.com', tagEn: 'Visual Trigger Logic', tagBn: 'ভিজ্যুয়াল ওয়ার্কফ্লো লজিক', logo: 'make' },
        { name: 'Zapier', tagEn: 'Integration Bridge', tagBn: 'অ্যাপ ইন্টিগ্রেশন ব্রিজ', logo: 'zapier' },
        { name: 'Python', tagEn: 'AI & Data Scripts', tagBn: 'এআই ও ডেটা পাইপলাইন', logo: 'python' },
        { name: 'Vector DB', tagEn: 'Semantic Embeddings', tagBn: 'সিমেন্টিক ভেক্টর স্টোরেজ', logo: 'vectordb' }
      ]
    }
  ], []);

  // Interactive Service Blueprinter State
  const [selectedBlueprintTechs, setSelectedBlueprintTechs] = useState<string[]>(['web-dev', 'ui-ux']);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const blueprintOptions = React.useMemo(() => [
    {
      id: 'web-dev',
      titleEn: 'Web Development',
      titleBn: 'à¦“à¦¯à¦¼à§‡à¦¬ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ',
      badgeEn: 'React / Next.js',
      badgeBn: 'à¦°à¦¿à§Ÿà§à¦¯à¦¾à¦•à§à¦Ÿ / à¦¨à§‡à¦•à§à¦¸à¦Ÿ.à¦œà§‡à¦à¦¸',
      icon: 'Code2',
      color: 'from-blue-500 dark:from-orange-500 to-cyan-500',
      terminalLog: 'Provisioning secure cloud architecture & CDN edge...',
      coords: { x: 70, y: 70 }
    },
    {
      id: 'ui-ux',
      titleEn: 'UI/UX Design',
      titleBn: 'à¦‡à¦‰à¦†à¦‡/à¦‡à¦‰à¦à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨',
      badgeEn: 'Figma Systems',
      badgeBn: 'à¦«à¦¿à¦—à§‹à¦®à¦¾ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®',
      icon: 'Layout',
      color: 'from-purple-500 to-pink-600',
      terminalLog: 'Calibrating user personas & fluid UX flows...',
      coords: { x: 250, y: 70 }
    },
    {
      id: 'marketing',
      titleEn: 'Digital Marketing',
      titleBn: 'à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚',
      badgeEn: 'High-ROI Funnels',
      badgeBn: 'à¦†à¦°à¦“à¦†à¦‡ à¦«à¦¾à¦¨à§‡à¦²',
      icon: 'Megaphone',
      color: 'from-orange-500 to-red-600',
      terminalLog: 'Synthesizing conversion campaigns & analytics pixels...',
      coords: { x: 260, y: 160 }
    },
    {
      id: 'seo',
      titleEn: 'SEO Strategy',
      titleBn: 'à¦à¦¸à¦‡à¦“ à¦•à§à¦¯à¦¾à¦®à§à¦ªà§‡à¦‡à¦¨',
      badgeEn: 'Organic Rankings',
      badgeBn: 'à¦…à¦°à§à¦—à¦¾à¦¨à¦¿à¦• à¦°â€à§à¦¯à¦¾à¦™à§à¦•à¦¿à¦‚',
      icon: 'Search',
      color: 'from-emerald-500 to-teal-600',
      terminalLog: 'Mapping search syntax & core semantic page ranks...',
      coords: { x: 250, y: 250 }
    },
    {
      id: 'ai-automation',
      titleEn: 'AI Services',
      titleBn: 'à¦à¦†à¦‡ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨',
      badgeEn: 'LLMs & Agents',
      badgeBn: 'à¦à¦²à¦à¦²à¦à¦® à¦“ à¦à¦†à¦‡ à¦à¦œà§‡à¦¨à§à¦Ÿà¦¸',
      icon: 'Cpu',
      color: 'from-indigo-500 to-blue-600',
      terminalLog: 'Wiring intelligent LLM cognitive node triggers...',
      coords: { x: 70, y: 250 }
    },
    {
      id: 'video-editing',
      titleEn: 'Video Production',
      titleBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦ªà§à¦°à¦¡à¦¾à¦•à¦¶à¦¨',
      badgeEn: 'Cinematic Promos',
      badgeBn: 'à¦¸à¦¿à¦¨à§‡à¦®à§à¦¯à¦¾à¦Ÿà¦¿à¦• à¦ªà§à¦°à¦®à§‹à¦¶à¦¨',
      icon: 'Video',
      color: 'from-rose-500 to-red-600',
      terminalLog: 'Calibrating multi-channel timelines & keyframe FX...',
      coords: { x: 60, y: 160 }
    },
  ], []);

  const synergyRating = React.useMemo(() => {
    const selectedCount = selectedBlueprintTechs.length;
    return Math.min(100, 70 + (selectedCount * 8) + (selectedCount > 2 ? 6 : 0));
  }, [selectedBlueprintTechs]);

  const handleToggleTech = (id: string) => {
    if (selectedBlueprintTechs.includes(id)) {
      if (selectedBlueprintTechs.length > 1) {
        setSelectedBlueprintTechs(selectedBlueprintTechs.filter(t => t !== id));
      }
    } else {
      setSelectedBlueprintTechs([...selectedBlueprintTechs, id]);
    }
  };

  const handleCopyBlueprint = () => {
    setIsCopying(true);
    const selectedServices = blueprintOptions
      .filter(o => selectedBlueprintTechs.includes(o.id))
      .map(o => o.titleEn)
      .join(', ');
    const copyText = `Next Solution Capability Config: Selected Stack: [${selectedServices}] | Stack Synergy: ${synergyRating}%`;
    navigator.clipboard.writeText(copyText).then(() => {
      setTimeout(() => setIsCopying(false), 2000);
    });
  };

  const handleLockBlueprint = () => {
    const selectedNames = blueprintOptions
      .filter(o => selectedBlueprintTechs.includes(o.id))
      .map(o => o.titleEn);
    sessionStorage.setItem('pre_selected_service', `Interactive Suite: ${selectedNames.join(' + ')}`);
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with session storage for preselected routing (e.g. from orbit dials,
  // home page bento cards and about page capability cards).
  useEffect(() => {
    const slug = sessionStorage.getItem('selected_service_slug');
    if (slug) {
      const match =
        services.find(s => s.slug === slug) ||
        initialServices.find(s => s.slug === slug);
      if (match) {
        setSelectedService(match);
        sessionStorage.removeItem('selected_service_slug');
      }
      // No match yet -> keep the slug in storage so this effect can retry
      // once the services list finishes syncing from local storage.
    }
  }, [services]);

  const getIcon = (name: string, className = "h-5 w-5") => {
    if (name && Object.prototype.hasOwnProperty.call(Icons, name)) {
      const IconComp = (Icons as any)[name];
      if (IconComp && typeof IconComp === 'function') {
        return <IconComp className={className} />;
      }
    }
    return <Icons.HelpCircle className={className} />;
  };

  const handleBookService = (serviceTitle: string) => {
    sessionStorage.setItem('pre_selected_service', serviceTitle);
    setSelectedService(null);
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // DETAIL VIEW: INDIVIDUAL SERVICE PAGE
  // ==========================================
  if (selectedService) {
    return (
      <section id="services-section-detail" className="bg-white dark:bg-[#141414] min-h-screen py-24 animate-fadeIn text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-neutral-400">
              <li>
                <button 
                  onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 dark:text-orange-400 transition"
                >
                  {currentLang === 'en' ? 'Home' : 'à¦¹à§‹à¦®'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5">
                <Icons.ChevronRight className="h-3 w-3 shrink-0" />
                <button 
                  onClick={() => { setSelectedService(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 dark:text-orange-400 transition"
                >
                  {currentLang === 'en' ? 'Services' : 'à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸à¦¸à¦®à§‚à¦¹'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5 text-blue-600 dark:text-orange-400" aria-current="page">
                <Icons.ChevronRight className="h-3 w-3 shrink-0" />
                <span>{currentLang === 'en' ? selectedService.titleEn : selectedService.titleBn}</span>
              </li>
            </ol>
          </nav>

          {/* Premium Hero Back Link Button */}
          <button
            id="back-to-services-btn"
            onClick={() => {
              setSelectedService(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-neutral-300 hover:text-blue-600 dark:text-orange-400 transition mb-8 cursor-pointer border border-gray-100 dark:border-neutral-800 rounded-full px-4 py-1.5 bg-gray-50/50 hover:bg-white dark:bg-[#141414]"
          >
            <Icons.ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{currentLang === 'en' ? 'Back to Capabilities Catalog' : 'à¦¸à§‡à¦¬à¦¾ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—à§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨'}</span>
          </button>

          {/* Header Layout mimicking Stripe / Clay premium design */}
          <div className="pb-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start sm:items-center space-x-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/15">
                  {getIcon(selectedService.icon, "h-8 w-8")}
                </div>
                <div>
                  <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-orange-400 border border-blue-100/50">
                    {selectedService.category}
                  </span>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight sm:text-4xl mt-1.5">
                    {currentLang === 'en' ? selectedService.titleEn : selectedService.titleBn}
                  </h1>
                </div>
              </div>

              {/* Action and indicators overview */}
              <div className="flex flex-col sm:items-end justify-center">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 dark:text-neutral-400">
                  {currentLang === 'en' ? 'Service Reference Code' : 'à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦°à§‡à¦«à¦¾à¦°à§‡à¦¨à§à¦¸ à¦•à§‹à¦¡'}
                </span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-orange-400 mt-1 font-mono">NS-{selectedService.slug.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-neutral-200 max-w-4xl">
              {currentLang === 'en' ? selectedService.descriptionEn : selectedService.descriptionBn}
            </p>

            {selectedService.subtitleEn && (
              <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/40 dark:bg-orange-500/5 p-4 max-w-4xl">
                <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-orange-300 italic leading-relaxed">
                  " {currentLang === 'en' ? selectedService.subtitleEn : selectedService.subtitleBn} "
                </p>
              </div>
            )}

            {/* Quick Action bar */}
            <div className="flex items-center pt-2">
              <button
                id="consultation-btn-hero"
                onClick={() => handleBookService(selectedService.titleEn)}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition shadow-lg shadow-blue-600/10 cursor-pointer flex items-center space-x-2 hover:scale-[1.01]"
              >
                <span>{currentLang === 'en' ? 'Get Free Consultation' : 'à¦«à§à¦°à¦¿ à¦ªà¦°à¦¾à¦®à¦°à§à¦¶ à¦¨à¦¿à¦¨'}</span>
                <Icons.ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Strategic Insight Columns: Why Need, Who For, Business Impact */}
          {(selectedService.whyNeedEn || selectedService.whoForEn || selectedService.businessImpactEn) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
              {selectedService.whoForEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100/40">
                    <Icons.Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Who is this for?' : 'à¦•à¦¾à¦° à¦œà¦¨à§à¦¯ à¦ªà§à¦°à¦¯à§‹à¦œà§à¦¯?'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whoForEn : selectedService.whoForBn}
                  </p>
                </div>
              )}

              {selectedService.whyNeedEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100/40">
                    <Icons.AlertCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Why you need this' : 'à¦•à§‡à¦¨ à¦à¦Ÿà¦¿ à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whyNeedEn : selectedService.whyNeedBn}
                  </p>
                </div>
              )}

              {selectedService.businessImpactEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/40">
                    <Icons.TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Expected Business Impact' : 'à¦ªà§à¦°à¦¤à§à¦¯à¦¾à¦¶à¦¿à¦¤ à¦¬à§à¦¯à¦¬à¦¸à¦¾à¦¯à¦¼à¦¿à¦• à¦ªà§à¦°à¦­à¦¾à¦¬'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">
                    {currentLang === 'en' ? selectedService.businessImpactEn : selectedService.businessImpactBn}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sub-services / Detailed Offerings */}
          {(() => {
            if (!selectedService.subServicesJson) return null;
            try {
              const subServices = JSON.parse(selectedService.subServicesJson);
              if (!Array.isArray(subServices) || subServices.length === 0) return null;
              return (
                <div className="py-12 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2.5">
                      <Icons.Layers className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                      <span>{currentLang === 'en' ? 'Specialized Sub-Services' : 'à¦¬à¦¿à¦¶à§‡à¦·à¦¾à¦¯à¦¼à¦¿à¦¤ à¦¸à¦¾à¦¬-à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦¸à¦®à§‚à¦¹'}</span>
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-neutral-400">
                      {currentLang === 'en' ? 'Micro-capabilities we activate within this service group' : 'à¦à¦‡ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦—à§à¦°à§à¦ªà§‡à¦° à¦…à¦§à§€à¦¨à§‡ à¦¯à§‡ à¦›à§‹à¦Ÿ à¦¸à¦¾à¦¬-à¦¸à§‡à¦¬à¦¾à¦¸à¦®à§‚à¦¹ à¦†à¦®à¦°à¦¾ à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à¦¿'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subServices.map((sub: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-3 hover:border-blue-500 hover:shadow-sm transition bg-[#FAFAFA]/50 dark:bg-[#141414]/50">
                        <h4 className="text-xs font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{currentLang === 'en' ? sub.titleEn : sub.titleBn}</span>
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">
                          {currentLang === 'en' ? sub.descEn : sub.descBn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } catch (err) {
              console.error('Error parsing sub-services JSON', err);
              return null;
            }
          })()}

          {/* Two Column Grid (Deliverables & Framework) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
            
            {/* Column 1: Core Deliverables & Strategic Benefits */}
            <div className="space-y-12">
              {/* Deliverables */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Compass className="h-5 w-5 text-blue-500 dark:text-orange-400" />
                  <span>{currentLang === 'en' ? 'Core Deliverables' : 'à¦ªà§à¦°à¦§à¦¾à¦¨ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¸à¦®à§‚à¦¹'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.featuresEn : selectedService.featuresBn).map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-neutral-200 leading-relaxed">
                      <Icons.CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Sparkles className="h-5 w-5 text-purple-500" />
                  <span>{currentLang === 'en' ? 'Strategic Benefits' : 'à¦•à§Œà¦¶à¦²à¦—à¦¤ à¦‰à¦ªà¦•à¦¾à¦°à¦¿à¦¤à¦¾'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.benefitsEn : selectedService.benefitsBn).map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-neutral-200 leading-relaxed">
                      <Icons.Plus className="h-4 w-4 text-blue-500 dark:text-orange-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Execution Framework & Stack */}
            <div className="space-y-12">
              {/* Execution Steps */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Workflow className="h-5 w-5 text-blue-500 dark:text-orange-400" />
                  <span>{currentLang === 'en' ? 'Execution Framework' : 'à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à¦¯à¦¼à¦¨ à¦«à§à¦°à§‡à¦®à¦“à¦¯à¦¼à¦¾à¦°à§à¦•'}</span>
                </h2>
                <div className="space-y-5">
                  {(currentLang === 'en' ? selectedService.processEn : selectedService.processBn).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 text-xs">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-orange-500/10 text-[10px] font-bold text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20">
                        {idx + 1}
                      </span>
                      <p className="text-gray-600 dark:text-neutral-200 mt-0.5 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Ecosystem */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Code className="h-5 w-5 text-gray-700 dark:text-neutral-200" />
                  <span>{currentLang === 'en' ? 'Technology Ecosystem' : 'à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿ à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®'}</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techUsed.map((tech, idx) => (
                    <span key={idx} className="rounded-full bg-gray-50 dark:bg-neutral-900 border border-gray-200/80 px-3.5 py-1 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:border-gray-300 hover:bg-gray-100/50 transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Return to capabilities footer */}
          <div className="mt-12 pt-8 flex justify-center">
            <button
              onClick={() => {
                setSelectedService(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-xl border border-gray-200 dark:border-neutral-700 px-6 py-3 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 hover:border-blue-600 transition cursor-pointer bg-white dark:bg-[#141414] hover:bg-gray-50 dark:bg-neutral-900"
            >
              {currentLang === 'en' ? 'Return to Capabilities Catalog' : 'à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—à§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨'}
            </button>
            </div>

          </div>
      </section>
    );
  }

  // ==========================================
  // VIEW: MAIN SERVICES PAGE (isFullPage)
  // ==========================================
  return (
    <div id="services-page-root" data-space-page className="bg-white dark:bg-[#141414] min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION â€” Full Screen */}
      <div className="hero-stack">
      <section id="services-hero" data-space-hero className="hero-sticky relative min-h-[100svh] flex items-center overflow-hidden bg-white dark:bg-[#0A0908] py-4 sm:py-0">
        {/* Unified background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-[#0A0908] dark:via-[#0F0E0C] dark:to-[#0A0908]" />
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-orange-500/[0.06] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-400/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,74,0,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-center">

            {/* Left Column: Copy & CTA — slides down from above */}
            <HeroEntrance direction="down" distance={100} duration={1}>
            <div className="space-y-3.5 sm:space-y-8 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                  {currentLang === 'en' ? 'ONE TRUSTED PARTNER' : 'à¦à¦•à¦Ÿà¦¿ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦°'}
                </span>
              </div>

              <h1 className="text-[1.65rem] sm:text-5xl lg:text-[4rem] font-black text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
                {currentLang === 'en' ? (
                  <>All Digital Problems.<br /><span className="text-orange-500">One Trusted Solution.</span></>
                ) : (
                  <>à¦¸à¦•à¦² à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦¸à¦®à¦¸à§à¦¯à¦¾à¥¤<br /><span className="text-orange-500">à¦à¦•à¦Ÿà¦¿ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦¸à¦®à¦¾à¦§à¦¾à¦¨à¥¤</span></>
                )}
              </h1>

              <p className="text-[13px] sm:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-lg mx-auto sm:mx-0">
                {currentLang === 'en'
                  ? 'From strategy to execution, we architect complete digital ecosystems. 50+ projects delivered, 100% client retention, and a team of senior engineers who ship revenue â€” not just code.'
                  : 'à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ à¦¥à§‡à¦•à§‡ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à¦¯à¦¼à¦¨ à¦ªà¦°à§à¦¯à¦¨à§à¦¤, à¦†à¦®à¦°à¦¾ à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¤à§ˆà¦°à¦¿ à¦•à¦°à¦¿à¥¤ à§«à§¦+ à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¸à¦®à§à¦ªà¦¨à§à¦¨, à§§à§¦à§¦% à¦•à§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦Ÿ à¦§à¦¾à¦°à¦£ à¦à¦¬à¦‚ à¦¸à¦¿à¦¨à¦¿à¦¯à¦¼à¦° à¦‡à¦žà§à¦œà¦¿à¦¨à¦¿à¦¯à¦¼à¦¾à¦°à¦¦à§‡à¦° à¦à¦•à¦Ÿà¦¿ à¦¦à¦² à¦¯à¦¾à¦°à¦¾ à¦°à¦¾à¦œà¦¸à§à¦¬ à¦¤à§ˆà¦°à¦¿ à¦•à¦°à§‡ â€” à¦¶à§à¦§à§ à¦•à§‹à¦¡ à¦¨à¦¯à¦¼à¥¤'}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 pt-1">
                {[
                  { num: '50+', labelEn: 'Projects Done', labelBn: 'à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¸à¦®à§à¦ªà¦¨à§à¦¨' },
                  { num: '100%', labelEn: 'Client Retention', labelBn: 'à¦•à§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦Ÿ à¦§à¦¾à¦°à¦£' },
                  { num: '24/7', labelEn: 'Active Support', labelBn: 'à¦¸à¦•à§à¦°à¦¿à¦¯à¦¼ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ' }
                ].map((s, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="block text-xl sm:text-2xl font-black text-orange-500 font-mono">{s.num}</span>
                    <span className="block text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-neutral-400 uppercase tracking-wider">{currentLang === 'en' ? s.labelEn : s.labelBn}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2.5">
                <button
                  onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[10px] sm:text-xs font-bold px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Get Free Consultation' : 'à¦«à§à¦°à¦¿ à¦ªà¦°à¦¾à¦®à¦°à§à¦¶ à¦¨à¦¿à¦¨'}
                </button>
                <button
                  onClick={() => { setTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-gray-200 dark:border-neutral-700 px-6 py-3 sm:px-8 sm:py-4 text-[10px] sm:text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-orange-500 hover:border-orange-500/30 bg-transparent transition-all duration-300 cursor-pointer"
                >
                  {currentLang === 'en' ? 'View Our Portfolio' : 'à¦ªà§‹à¦°à§à¦Ÿà¦«à§‹à¦²à¦¿à¦“ à¦¦à§‡à¦–à§à¦¨'}
                </button>
              </div>
            </div>
            </HeroEntrance>

            {/* Right Column: Logo + Orbiting Services — slides up from below */}
            <HeroEntrance direction="up" distance={120} duration={1} delay={0.15}>
            <div className="relative flex items-center justify-center min-h-[250px] sm:min-h-[440px] lg:min-h-[650px]">

              {/* Responsive orbit wrapper â€” scales down on mobile */}
              <div className="relative w-full h-full scale-[0.40] sm:scale-75 lg:scale-100 origin-center">

                {/* Outer orbit ring â€” 6 services, rotates clockwise */}
                <div className="absolute inset-0 animate-[spin_70s_linear_infinite]">
                  {[
                    { nameEn: 'Web Development', nameBn: 'à¦“à¦¯à¦¼à§‡à¦¬ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ', icon: Icons.Globe, x: 0, y: -280 },
                    { nameEn: 'UI/UX Design', nameBn: 'à¦‡à¦‰à¦†à¦‡/à¦‡à¦‰à¦à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨', icon: Icons.Palette, x: 242.49, y: -140 },
                    { nameEn: 'Video Editing', nameBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦à¦¡à¦¿à¦Ÿà¦¿à¦‚', icon: Icons.Video, x: 242.49, y: 140 },
                    { nameEn: 'App Development', nameBn: 'à¦…à§à¦¯à¦¾à¦ª à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ', icon: Icons.Smartphone, x: 0, y: 280 },
                    { nameEn: 'Graphic Design', nameBn: 'à¦—à§à¦°à¦¾à¦«à¦¿à¦• à¦¡à¦¿à¦œà¦¾à¦‡à¦¨', icon: Icons.PenTool, x: -242.49, y: 140 },
                    { nameEn: 'SEO Strategy', nameBn: 'à¦à¦¸à¦‡à¦“ à¦•à§à¦¯à¦¾à¦®à§à¦ªà§‡à¦‡à¦¨', icon: Icons.Search, x: -242.49, y: -140 },
                  ].map((svc, i) => {
                    const SvcIcon = svc.icon;
                    return (
                      <div
                        key={`outer-${i}`}
                        className="absolute z-10 animate-[spin_70s_linear_infinite_reverse]"
                        style={{ left: `calc(50% + ${svc.x}px - 40px)`, top: `calc(50% + ${svc.y}px - 11px)` }}
                      >
                        <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-orange-100 dark:border-white/[0.08] rounded-full px-3.5 py-2 shadow-sm hover:bg-orange-50 dark:hover:bg-orange-500/15 hover:border-orange-300 dark:hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(255,74,0,0.1)] hover:scale-105 transition-all duration-300 cursor-default whitespace-nowrap">
                          <SvcIcon className="h-3 w-3 text-orange-500 dark:text-orange-400 shrink-0" />
                          <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">{currentLang === 'en' ? svc.nameEn : svc.nameBn}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Outer orbit ring visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[560px] h-[560px] rounded-full border border-dashed border-orange-200/40 dark:border-orange-500/8" />
                  </div>
                </div>

                {/* Inner orbit ring â€” 4 services, rotates counter-clockwise */}
                <div className="absolute inset-0 animate-[spin_45s_linear_infinite_reverse]">
                  {[
                    { nameEn: 'Product Innovation', nameBn: 'à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦‡à¦¨à§‹à¦­à§‡à¦¶à¦¨', icon: Icons.Lightbulb, x: 0, y: -155 },
                    { nameEn: 'Creative Content', nameBn: 'à¦•à§à¦°à¦¿à¦¯à¦¼à§‡à¦Ÿà¦¿à¦­ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ', icon: Icons.Film, x: 155, y: 0 },
                    { nameEn: 'Marketing & PR', nameBn: 'à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚ à¦“ à¦ªà¦¿à¦†à¦°', icon: Icons.Megaphone, x: 0, y: 155 },
                    { nameEn: 'AI Services', nameBn: 'à¦à¦†à¦‡ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨', icon: Icons.BrainCircuit, x: -155, y: 0 },
                  ].map((svc, i) => {
                    const SvcIcon = svc.icon;
                    return (
                      <div
                        key={`inner-${i}`}
                        className="absolute z-10 animate-[spin_45s_linear_infinite]"
                        style={{ left: `calc(50% + ${svc.x}px - 48px)`, top: `calc(50% + ${svc.y}px - 13px)` }}
                      >
                        <div className="flex items-center gap-2 bg-orange-50/90 dark:bg-orange-500/10 backdrop-blur-md border border-orange-200 dark:border-orange-500/25 rounded-full px-4 py-2 shadow-md hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:shadow-[0_0_25px_rgba(255,74,0,0.15)] hover:scale-105 transition-all duration-300 cursor-default whitespace-nowrap">
                          <SvcIcon className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
                          <span className="text-[10px] font-extrabold text-orange-700 dark:text-orange-300">{currentLang === 'en' ? svc.nameEn : svc.nameBn}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inner orbit ring visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[310px] h-[310px] rounded-full border border-orange-200/50 dark:border-orange-500/15" />
                  </div>
                </div>

              </div>

              {/* Center logo â€” stays fixed, above everything */}
              <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-orange-500/10 blur-[60px] pointer-events-none -translate-x-[20%] -translate-y-[20%]" />
                <img src="/logo.png" alt="Next Solution" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain block dark:hidden relative z-10 drop-shadow-[0_0_30px_rgba(255,74,0,0.12)]" />
                <img src="/logow.png" alt="Next Solution" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain hidden dark:block relative z-10 drop-shadow-[0_0_30px_rgba(255,74,0,0.15)]" />
              </div>

              {/* Glow behind logo */}
              <div className="absolute z-[25] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute z-[25] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-400/[0.05] rounded-full blur-[60px] pointer-events-none" />
            </div>
            </HeroEntrance>

          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{currentLang === 'en' ? 'Scroll to explore' : 'à¦à¦•à§à¦¸à¦ªà§à¦²à§‹à¦° à¦•à¦°à¦¤à§‡ à¦¸à§à¦•à§à¦°à¦² à¦•à¦°à§à¦¨'}</span>
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-neutral-600 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        </div>
      </section>
      </div>



      {/* 2. SERVICES OVERVIEW GRID (LOADED DYNAMICALLY) */}
      <section id="services-grid-list" className="stack-cover relative py-10 sm:py-24 overflow-hidden bg-white dark:bg-[#141414] z-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
<Reveal direction="up">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'OUR CAPABILITIES CATALOG' : 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§‡à¦¬à¦¾ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Explore Specific Expertise' : 'à¦¬à¦¿à¦¶à§‡à¦·à¦¾à¦¯à¦¼à¦¿à¦¤ à¦¦à¦•à§à¦·à¦¤à¦¾à¦¸à¦®à§‚à¦¹ à¦…à¦¨à§à¦¬à§‡à¦·à¦£ à¦•à¦°à§à¦¨'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-300 leading-relaxed">
              {currentLang === 'en' ? (
                'Manageable via active client consoles. Zero hardcoding. Click to access complete deliverable checklists, tech stacks, and plans.'
              ) : (
                'à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨ à¦•à¦¨à¦¸à§‹à¦² à¦¥à§‡à¦•à§‡ à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦ªà¦°à¦¿à¦šà¦¾à¦²à¦¨à¦¾à¦¯à¦¾à¦—à§à¦¯à¥¤ à¦•à§‹à¦¨à§‹ à¦¹à¦¾à¦°à§à¦¡à¦•à§‹à¦¡à§‡à¦¡ à¦¡à¦¾à¦Ÿà¦¾ à¦¨à§‡à¦‡à¥¤ à¦ªà§‚à¦°à§à¦£ à¦¬à¦¿à¦¬à¦°à¦£ à¦à¦¬à¦‚ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦ªà§à¦²à§à¦¯à¦¾à¦¨ à¦¦à§‡à¦–à¦¤à§‡ à¦¯à§‡à¦•à§‹à¦¨à§‹ à¦¸à§‡à¦¬à¦¾à¦¯à¦¼ à¦•à§à¦²à¦¿à¦• à¦•à¦°à§à¦¨à¥¤'
              )}
            </p>
          </div>
          </Reveal>

          <Reveal disabled className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {services.map((service) => (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50/60 dark:bg-[#161616] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-blue-600 hover:bg-white dark:hover:bg-white/[0.05] dark:hover:border-orange-500/60 dark:hover:shadow-[0_0_35px_-5px_rgba(255,90,0,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.99] dark:active:shadow-[0_0_45px_-8px_rgba(255,90,0,0.5)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon and Pricing Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 dark:group-hover:bg-orange-500 group-hover:text-white dark:group-hover:border-orange-500/40 transition duration-300 border border-blue-100/50">
                      {getIcon(service.icon)}
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono font-bold bg-blue-50 dark:bg-orange-500/10 border border-blue-100 dark:border-orange-500/20 text-blue-600 dark:text-orange-400 px-1.5 py-0.5 rounded">
                        {currentLang === 'en' ? 'Verified' : 'à¦¯à¦¾à¦šà¦¾à¦‡à¦•à§ƒà¦¤'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                    {currentLang === 'en' ? service.titleEn : service.titleBn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {currentLang === 'en' ? service.descriptionEn : service.descriptionBn}
                  </p>

                  {/* Key Benefits (Requested Checklist) */}
                  <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-gray-400 dark:text-neutral-400 tracking-wider block">
                      {currentLang === 'en' ? 'Core Benefits' : 'à¦®à§‚à¦² à¦¸à§à¦¬à¦¿à¦§à¦¾ à¦¸à¦®à§‚à¦¹'}
                    </span>
                    <ul className="space-y-1.5">
                      {(currentLang === 'en' ? service.benefitsEn : service.benefitsBn).slice(0, 2).map((b, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[10px] text-gray-500 dark:text-neutral-300">
                          <Icons.Check className="h-3 w-3 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-orange-400 group-hover:text-blue-700">
                  <span>{currentLang === 'en' ? 'View Details & Plan' : 'à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦¬à¦¿à¦¬à¦°à¦£ à¦“ à¦ªà§à¦²à§à¦¯à¦¾à¦¨'}</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 dark:group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Icons.ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

        </div>
      </section>

      {/* 3. WHY CHOOSE OUR SERVICES (8 VALUE CARDS) */}
      <section id="services-why-choose" className="py-24 bg-[#FAFAFA] dark:bg-[#0D0C0A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <Reveal direction="up">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'AGENCY PRINCIPLES' : 'à¦à¦œà§‡à¦¨à§à¦¸à¦¿ à¦¨à§€à¦¤à¦¿à¦®à¦¾à¦²à¦¾'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Why Choose Next Solution?' : 'à¦•à§‡à¦¨ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§‡à¦¬à¦¾ à¦¬à§‡à¦›à§‡ à¦¨à§‡à¦¬à§‡à¦¨?'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'We set premium benchmarks in execution. We do not compromise, outsource, or delay.'
              ) : (
                'à¦†à¦®à¦°à¦¾ à¦•à¦¾à¦œ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à§Ÿà¦¨à§‡ à¦ªà§à¦°à¦¿à¦®à¦¿à§Ÿà¦¾à¦® à¦®à¦¾à¦¨à¦¦à¦£à§à¦¡ à¦¨à¦¿à¦°à§à¦§à¦¾à¦°à¦£ à¦•à¦°à¦¿à¥¤ à¦•à§‹à¦¨à§‹ à¦…à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦•à¦¾à¦œ à¦¬à¦¾ à¦¸à¦®à§Ÿà¦•à§à¦·à§‡à¦ªà¦£ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦…à¦­à¦¿à¦§à¦¾à¦¨à§‡ à¦¨à§‡à¦‡à¥¤'
              )}
            </p>
          </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Award',
                color: 'text-blue-600 dark:text-orange-400 bg-blue-50 dark:bg-orange-500/10 border-blue-100/50',
                titleEn: 'Experienced Team',
                titleBn: 'à¦…à¦­à¦¿à¦œà§à¦ž à¦Ÿà¦¿à¦®',
                descEn: 'All products are hand-engineered by senior full-stack developers and product designers.',
                descBn: 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦•à§‹à¦¡ à¦à¦¬à¦‚ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦¤à§ˆà¦°à¦¿ à¦•à¦°à§‡à¦¨ à¦¸à¦¿à¦¨à¦¿à§Ÿà¦° à¦«à§à¦²-à¦¸à§à¦Ÿà§à¦¯à¦¾à¦• à¦¡à§‡à¦­à§‡à¦²à¦ªà¦¾à¦° à¦“ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨à¦¾à¦°à¦°à¦¾à¥¤'
              },
              {
                icon: 'Cpu',
                color: 'text-purple-600 dark:text-purple-400 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 border-purple-100/50',
                titleEn: 'Modern Technologies',
                titleBn: 'à¦†à¦§à§à¦¨à¦¿à¦• à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿',
                descEn: 'Strict typesafe TypeScript, React ecosystem, and optimized serverless cloud configurations.',
                descBn: 'à¦Ÿà¦¾à¦‡à¦ªà¦¸à§‡à¦« à¦Ÿà¦¾à¦‡à¦ªà¦¸à§à¦•à§à¦°à¦¿à¦ªà§à¦Ÿ, à¦°à¦¿à§Ÿà§à¦¯à¦¾à¦•à§à¦Ÿ à¦“ à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦¸ à¦…à¦ªà§à¦Ÿà¦¿à¦®à¦¾à¦‡à¦œà§‡à¦¶à¦¨ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§‡ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦—à¦¤à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤ à¦•à¦°à¦¾à¥¤'
              },
              {
                icon: 'Zap',
                color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100/50',
                titleEn: 'Extreme Performance',
                titleBn: 'à¦šà¦°à¦® à¦ªà¦¾à¦°à¦«à¦°à¦®à§à¦¯à¦¾à¦¨à§à¦¸',
                descEn: 'Ultra-low latency rendering and serverless caching ensuring your pages score 100/100 on Google Lighthouse.',
                descBn: 'à§§à§¦à§¦% à¦—à§à¦—à¦² à¦²à¦¾à¦‡à¦Ÿà¦¹à¦¾à¦‰à¦¸ à¦¸à§à¦•à§‹à¦° à¦à¦¬à¦‚ à¦†à¦²à§à¦Ÿà§à¦°à¦¾-à¦²à§‹ à¦²à§à¦¯à¦¾à¦Ÿà§‡à¦¨à§à¦¸à¦¿ à¦¸à§à¦ªà¦¿à¦¡ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤à¦•à¦°à¦£à¥¤'
              },
              {
                icon: 'Zap',
                color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100/50',
                titleEn: 'Fast Delivery',
                titleBn: 'à¦¦à§à¦°à§à¦¤ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿',
                descEn: 'Rigorous sprint tracking and agile timelines ensuring project milestones launch on schedule.',
                descBn: 'à¦¸à§à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦šà¦¾à¦•à§à¦·à§à¦· à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ à¦“ à¦¸à§à¦ªà§à¦°à¦¿à¦¨à§à¦Ÿ à¦Ÿà§à¦°à§à¦¯à¦¾à¦•à¦¿à¦‚-à¦à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦¸à¦®à§Ÿà¦®à¦¤à§‹ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤à¦•à¦°à¦£à¥¤'
              },
              {
                icon: 'ShieldCheck',
                color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-100/50',
                titleEn: 'Secure Solutions',
                titleBn: 'à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦¸à¦®à¦¾à¦§à¦¾à¦¨',
                descEn: 'Robust middleware security, secure API routing, and full GDPR/HIPAA-ready compliance parameters.',
                descBn: 'à¦®à¦œà¦¬à§à¦¤ à¦®à¦¿à¦¡à¦²à¦“à§Ÿà§à¦¯à¦¾à¦° à¦¸à¦¿à¦•à¦¿à¦‰à¦°à¦¿à¦Ÿà¦¿ à¦à¦¬à¦‚ à¦¡à§‡à¦Ÿà¦¾ à¦¸à§à¦°à¦•à§à¦·à¦¾à§Ÿ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¨à¦¿à¦°à¦¾à¦ªà¦¤à§à¦¤à¦¾ à¦“ à¦•à¦®à¦ªà§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦¸à¥¤'
              },
              {
                icon: 'HeartHandshake',
                color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-100/50',
                titleEn: 'Ongoing Support',
                titleBn: 'à¦¸à¦¾à¦°à§à¦¬à¦•à§à¦·à¦£à¦¿à¦• à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ',
                descEn: 'Committed SLA contracts, regular version upgrades, and direct priority support channels.',
                descBn: 'à¦¬à¦¾à§Žà¦¸à¦°à¦¿à¦• à¦à¦¸à¦à¦²à¦ à¦šà§à¦•à§à¦¤à¦¿, à¦°à§‡à¦—à§à¦²à¦¾à¦° à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¬à§à¦¯à¦¾à¦•à¦†à¦ª à¦“ à¦¦à§à¦°à§à¦¤ à¦¤à§à¦°à§à¦Ÿà¦¿ à¦¸à¦‚à¦¶à§‹à¦§à¦¨à§‡ à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿà¥¤'
              },
              {
                icon: 'Layers',
                color: 'text-indigo-600 dark:text-orange-400 bg-indigo-50 dark:bg-orange-500/10 border-indigo-100/50',
                titleEn: 'Scalable Architecture',
                titleBn: 'à¦¸à§à¦•à§‡à¦²à§‡à¦¬à¦² à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à¦šà¦¾à¦°',
                descEn: 'Database normalization and decoupling enabling traffic pivots of up to 10x without latency.',
                descBn: 'à¦­à¦¬à¦¿à¦·à§à¦¯à¦¤à§‡ à¦¸à¦¹à¦œà§‡ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦¡à¦¿à¦•à¦¾à¦ªà¦²à¦¡ à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à¦šà¦¾à¦° à¦¯à¦¾ à§§à§¦ à¦—à§à¦£ à¦Ÿà§à¦°à¦¾à¦«à¦¿à¦• à¦²à§‹à¦¡ à¦¨à¦¿à¦¤à§‡ à¦ªà¦¾à¦°à§‡à¥¤'
              },
              {
                icon: 'Smile',
                color: 'text-teal-600 bg-teal-50 border-teal-100/50',
                titleEn: 'Customer Satisfaction',
                titleBn: 'à¦—à§à¦°à¦¾à¦¹à¦• à¦¸à¦¨à§à¦¤à§à¦·à§à¦Ÿà¦¿',
                descEn: 'Comprehensive collaborative Figma feedback loops and 100% intellectual property transfers.',
                descBn: 'à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¸à¦¹à¦¯à§‹à¦—à¦¿à¦¤à¦¾, à¦¨à¦¿à§Ÿà¦®à¦¿à¦¤ à¦•à¦¾à¦œà§‡à¦° à¦†à¦ªà¦¡à§‡à¦Ÿ à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦“ à¦¶à¦¤à¦­à¦¾à¦— à¦¬à§à¦¦à§à¦§à¦¿à¦¬à§ƒà¦¤à§à¦¤à¦¿à¦• à¦¸à§à¦¬à¦¤à§à¦¬ à¦¹à¦¸à§à¦¤à¦¾à¦¨à§à¦¤à¦°à¥¤'
              }
            ].map((card, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-4 shadow-sm hover:border-blue-600/30 transition duration-300">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${card.color}`}>
                  {getIcon(card.icon, "h-5 w-5")}
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentLang === 'en' ? card.titleEn : card.titleBn}
                </h3>
                <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">
                  {currentLang === 'en' ? card.descEn : card.descBn}
                </p>
              </div>
            ))}
          </Reveal>

        </div>
      </section>

      {/* 4. TECHNOLOGIES WE USE (CATEGORIZED TABS) */}
      <section id="tech-powering" className="bg-neutral-50/20 py-24 relative z-10">
        {/* Continuous Train Animation Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 35s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        `}} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'OUR TECH STACK' : 'আমাদের আধুনিক প্রযুক্তি'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'State-Of-The-Art Technologies We Depend On' : 'সর্বোচ্চ সাইট স্পিডের জন্য বিশ্বমানের আধুনিক প্রযুক্তি'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 max-w-md mx-auto">
              {currentLang === 'en' 
                ? 'We write clean, well-tested code in strict frontend, backend, design, and AI Services stacks.' 
                : 'আমরা নিখুঁত কোড লিখি এবং সর্বোত্তম গতি নিশ্চিত করতে বিশ্বমানের ফ্রেমওয়ার্ক ব্যবহার করি।'}
            </p>
          </div>

          <div className="space-y-10 max-w-6xl mx-auto">
            {techCategories.map((cat, i) => {
              // Duplicate techs array to create infinite scroll effect
              const duplicatedTechs = [...cat.techs, ...cat.techs];
              return (
                <div key={i} className="bg-white dark:bg-[#141414] border border-neutral-100/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 overflow-hidden relative">
                  {/* Category Title & Subtitle */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-50 dark:border-neutral-800 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-neutral-900 dark:text-white flex items-center gap-2 uppercase tracking-wide">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                        {currentLang === 'en' ? cat.titleEn : cat.titleBn}
                      </h3>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 font-normal leading-relaxed">
                        {currentLang === 'en' ? cat.descEn : cat.descBn}
                      </p>
                    </div>
                    <span className="self-start md:self-auto text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-100/30">
                      {currentLang === 'en' ? 'Live Tech Train' : 'টেকনোলজি ট্রেন'}
                    </span>
                  </div>

                  {/* Infinite Sliding Train Window */}
                  <div className="relative marquee-container w-full overflow-hidden py-2 select-none">
                    {/* Edge fade visual overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Track */}
                    <div className={cat.direction === 'left' ? 'animate-marquee-left gap-4 pr-4' : 'animate-marquee-right gap-4 pr-4'}>
                      {duplicatedTechs.map((tech, tIdx) => (
                        <div 
                          key={tIdx} 
                          className="w-48 sm:w-52 shrink-0 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-white dark:bg-[#141414] border border-neutral-100/60 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:border-blue-500/20 group cursor-pointer"
                        >
                          <div className="h-9 w-9 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <TechIcon logo={tech.logo} />
                          </div>
                          <div className="overflow-hidden min-w-0">
                            <span className="block text-xs font-black text-neutral-800 dark:text-neutral-100 truncate group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                              {tech.name}
                            </span>
                            <span className="block text-[8.5px] text-neutral-400 dark:text-neutral-500 font-mono font-bold uppercase tracking-widest truncate">
                              {currentLang === 'en' ? tech.tagEn : tech.tagBn}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
</section>

</div>
  );
}
