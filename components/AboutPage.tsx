"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, Eye, ShieldCheck, Sparkles, ArrowRight, ArrowUpRight, 
  ChevronDown, ChevronUp, Heart, Smile, Users, Palette, TrendingUp, 
  Lightbulb, CheckCircle2, Globe, Clock, Code2, Database, Terminal, 
  Cpu, Star, Zap, Check, MessageSquare, Quote, Server, Layers,
  MapPin, BookOpen, Laptop, Network, Rocket, FileText, Share2, Compass,
  DollarSign, Activity, Settings as SettingsIcon, BrainCircuit, Search, Play,
  Mail, Linkedin, Smartphone
} from 'lucide-react';
import { translations } from '@/data/translations';
import { getSettings, getTestimonials } from '@/lib/db';

import sanjidImage from "../assets/images/sanjid.jpg";
import jisan from "../assets/images/jisan.jpg";
import sadi from "../assets/images/sadi.jpg";
import mustafiz from "../assets/images/mustafiz.jpg";


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

interface AboutPageProps {
  currentLang: 'en' | 'bn';
  setTab?: (tab: string) => void;
}

export default function AboutPage({ currentLang, setTab }: AboutPageProps) {
  const t = translations[currentLang];
  const settings = getSettings();
  const testimonials = getTestimonials();

  const leadershipTeam = useMemo(() => [
    {
      id: 'ceo',
      nameEn: 'Mushfiqur Rahman Sanjid',
      nameBn: 'মুশফিকুর রহমান সানজিদ',
      roleEn: 'Founder & CEO',
      roleBn: 'প্রতিষ্ঠাতা ও সিইও',
      portrait: sanjidImage ,
      bioEn: 'Founder of Next Solution and a dedicated web development expert. He architects high-performance websites and scalable web applications using React, Next.js and TypeScript — ensuring every build delivers blazing-fast speed, pixel-perfect responsiveness and revenue-focused engineering.',
      bioBn: 'নেক্সট সলিউশনের প্রতিষ্ঠাতা এবং নিবেদিতপ্রাণ ওয়েব ডেভেলপমেন্ট এক্সপার্ট। তিনি রিয়্যাক্ট, নেক্সট.জেএস ও টাইপস্ক্রিপ্ট ব্যবহার করে উচ্চ-ক্ষমতাসম্পন্ন ওয়েবসাইট এবং স্কেলেবল ওয়েব অ্যাপ্লিকেশন ডিজাইন করেন — প্রতিটি প্রজেক্টে ব্লেজিং-ফাস্ট স্পিড, পিক্সেল-পারফেক্ট রেসপনসিভ ডিজাইন এবং রাজস্ব-কেন্দ্রিক ইঞ্জিনিয়ারিং নিশ্চিত করেন।',
      experienceEn: '4+ Years of Web Development',
      experienceBn: '৪+ বছরের ওয়েব ডেভেলপমেন্ট অভিজ্ঞতা',
      mottoEn: 'Our mission is to build digital solutions that create lasting business impact.',
      mottoBn: 'এমন ডিজিটাল সলিউশন তৈরি করা যা স্থায়ী ব্যবসায়িক প্রভাব ফেলে।',
      skillsEn: ['Web Development', 'React & Next.js', 'Business Strategy'],
      skillsBn: ['ওয়েব ডেভেলপমেন্ট', 'রিয়্যাক্ট ও নেক্সট.জেএস', 'বিজনেস স্ট্র্যাটেজি'],
      email: 'mushfiqurrahmansanjid@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Available for Advisory',
      statusBn: 'পরামর্শের জন্য উপলব্ধ'
    },
    {
      id: 'co-founder',
      nameEn: "Saa'd ibna bashar",
      nameBn: 'সা\u2019দ ইবনা বাশার',
      roleEn: 'Co-Founder & MD',
      roleBn: 'সহ-প্রতিষ্ঠাতা ও এমডি',
      portrait: sadi,
      bioEn: 'Co-Founder & Managing Director of Next Solution and an AI-integrated digital marketing expert. He blends data-driven campaign strategy with AI-powered automation, Meta & Google Ads optimization and conversion funnels that turn clicks into measurable revenue.',
      bioBn: 'নেক্সট সলিউশনের সহ-প্রতিষ্ঠাতা ও ম্যানেজিং ডিরেক্টর এবং এআই-ইন্টিগ্রেটেড ডিজিটাল মার্কেটিং এক্সপার্ট। তিনি ডেটা-চালিত ক্যাম্পেইন স্ট্র্যাটেজির সাথে এআই-চালিত অটোমেশন, মেটা ও গুগল অ্যাডস অপ্টিমাইজেশন এবং কনভার্সন ফানেল যুক্ত করেন, যা ক্লিককে পরিমাপযোগ্য রাজস্বে রূপান্তর করে।',
      experienceEn: '4+ Years in Digital Marketing',
      experienceBn: '৪+ বছরের ডিজিটাল মার্কেটিং অভিজ্ঞতা',
      mottoEn: 'Innovation begins with understanding human experience.',
      mottoBn: 'উদ্ভাবনের সূচনা হয় মানুষের অভিজ্ঞতা অনুধাবনের মধ্য দিয়ে।',
      skillsEn: ['AI-Integrated Marketing', 'Digital Marketing', 'Branding'],
      skillsBn: ['এআই ইন্টিগ্রেটেড মার্কেটিং', 'ডিজিটাল মার্কেটিং', 'ব্র্যান্ডিং'],
      email: 'saadibnebashar@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Designing Solutions',
      statusBn: 'সলিউশন ডিজাইনে ব্যস্ত'
    },
    {
      id: 'md',
      nameEn: 'Al Amin Jisan',
      nameBn: 'আল আমিন জিসান',
      roleEn: 'General Manager & SEO Expert',
      roleBn: 'জেনারেল ম্যানেজার ও এসইও এক্সপার্ট',
      portrait: jisan,
      bioEn: 'General Manager of Next Solution and a seasoned SEO expert. He masters technical SEO, on-page optimization, keyword strategy and authority link building — pushing brands to the top of Google and compounding organic traffic over time.',
      bioBn: 'নেক্সট সলিউশনের জেনারেল ম্যানেজার এবং দক্ষ এসইও এক্সপার্ট। তিনি টেকনিক্যাল এসইও, অন-পেজ অপ্টিমাইজেশন, কিওয়ার্ড স্ট্র্যাটেজি এবং অথরিটি লিংক বিল্ডিংয়ে পারদর্শী — যা ব্র্যান্ডকে গুগলের শীর্ষে পৌঁছে দেয় এবং অর্গানিক ট্রাফিককে ধারাবাহিকভাবে বৃদ্ধি করে।',
      experienceEn: '4+ Years of SEO & Operations',
      experienceBn: '৪+ বছরের এসইও ও অপারেশনস অভিজ্ঞতা',
      mottoEn: 'We don\'t just complete projects—we build long-term trust.',
      mottoBn: 'আমরা শুধু প্রজেক্ট সম্পন্ন করি না—আমরা দীর্ঘমেয়াদী বিশ্বাস তৈরি করি।',
      skillsEn: ['Technical SEO', 'Keyword Strategy', 'Project Management'],
      skillsBn: ['টেকনিক্যাল এসইও', 'কিওয়ার্ড স্ট্র্যাটেজি', 'প্রজেক্ট ম্যানেজমেন্ট'],
      email: 'alaminjisan@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Consulting Partners',
      statusBn: 'অংশীদারদের সাথে কনসাল্টিংয়ে ব্যস্ত'
    },
    {
      id: 'gm',
      nameEn: 'Mustafizur Rahman',
      nameBn: 'মুস্তাফিজুর রহমান',
      roleEn: 'Chief Architect',
      roleBn: 'চিফ আর্কিটেক্ট',
      portrait: mustafiz,
      bioEn: 'Chief Architect of Next Solution and an expert graphic designer. He crafts premium brand identities, memorable logos and pixel-perfect visuals — fusing design systems, color psychology and typography into interfaces that truly convert.',
      bioBn: 'নেক্সট সলিউশনের চিফ আর্কিটেক্ট এবং অভিজ্ঞ গ্রাফিক ডিজাইনার। তিনি প্রিমিয়াম ব্র্যান্ড আইডেন্টিটি, স্মরণীয় লোগো এবং পিক্সেল-পারফেক্ট ভিজ্যুয়াল ডিজাইন করেন — ডিজাইন সিস্টেম, কালার সাইকোলজি ও টাইপোগ্রাফি মিলিয়ে এমন ইন্টারফেস তৈরি করেন যা সত্যিই কনভার্ট করে।',
      experienceEn: '4+ Years of Design & Architecture',
      experienceBn: '৪+ বছরের ডিজাইন ও আর্কিটেকচার অভিজ্ঞতা',
      mottoEn: 'Every pixel, every strategy, every decision should drive ROI.',
      mottoBn: 'প্রতিটি পিক্সেল, প্রতিটি স্ট্র্যাটেজি এবং প্রতিটি সিদ্ধান্ত আরও প্রবৃদ্ধি বয়ে আনবে।',
      skillsEn: ['Graphic Design', 'Brand Identity', 'Design Systems'],
      skillsBn: ['গ্রাফিক ডিজাইন', 'ব্র্যান্ড আইডেন্টিটি', 'ডিজাইন সিস্টেম'],
      email: 'mustafiz@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Managing Milestones',
      statusBn: 'মাইলস্টোন পরিচালনায় ব্যস্ত'
    }
  ], []);

  // Selected Story milestone
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  
  // Selected Ecosystem Category
  const [selectedEcosystemCategory, setSelectedEcosystemCategory] = useState<'all' | 'dev' | 'design' | 'ai' | 'marketing'>('all');


  // Active Process Step state
  const [activeProcessStep, setActiveProcessStep] = useState(0);



  // Dynamic statistics from Settings or premium default values
  const stats = useMemo(() => ({
    projects: settings.statsProjects || 300,
    clients: settings.statsClients || 150,
    satisfaction: settings.statsSatisfaction || 98,
    experts: settings.statsTeam || 20,
    services: 15,
    retention: 94
  }), [settings]);

  // Handle CTA redirection
  const navigateToTab = (tabName: string) => {
    if (setTab) {
      setTab(tabName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Counting up statistics animation effect
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    experts: 0,
    services: 0,
    retention: 0
  });

  useEffect(() => {
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);

      setAnimatedStats({
        projects: Math.floor(easeOutQuad * stats.projects),
        clients: Math.floor(easeOutQuad * stats.clients),
        satisfaction: Math.floor(easeOutQuad * stats.satisfaction),
        experts: Math.floor(easeOutQuad * stats.experts),
        services: Math.floor(easeOutQuad * stats.services),
        retention: Math.floor(easeOutQuad * stats.retention)
      });

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [stats]);

  // Story Milestones
  const storyMilestones = useMemo(() => [
  {
    year: '2025',
    titleEn: 'Where The Vision Took Shape',
    titleBn: 'যেখানে স্঵প্ন রূপ নিল',
    descEn: 'In 2025, we made a bold decision — to build something the industry has never seen. We spent countless hours architecting our technology stack, perfecting AI-driven workflows, and designing systems that don\'t just work — they dominate. Every pixel, every line of code, every automation was crafted with one obsession: making your business unstoppable.',
    descBn: '০০০০ সালে আমরা ২০০০ সালে একটি সাহসী সিদ্ধান্ত সিনে মেনে নিল — ২ম কিজু তৈরি তৈরি করতে যে ছেল শিল্পে আগে কশনো দেখা যায়নি তে তৈরি করিছিস সে রূপ নিল সে সে তৈরি করিছিস সে রূপ নিল — সে ক্ষেত্রে আধিপত্্য বজায় রাখে পরে তেসের পিক্সেল, প্রতিটি কোড লাইন, প্রতিটি অটোমেশন তৈরি হযেছে ২কটি মাত্র পাগলামি দেয়ে ছিয়শেশ সে রতত ব্যবসাকে অজেয় করাতে টরেসি হনসরিচারদ তৈরি তৈরি করা হযেছে—এটা মাত্র নূধ তৈরি করা অনুস্থিত তৈরি করতে টরেসের অন্তর দেখা যায়নি অুসে ধস্রে সে খুজে পধ্রতে নির্ভার দুর্রসতা থডে কাটলাম নসল্স্তর তস্ন দরুশী করতে — আপনার ব্যবসাকে অজেয় করা।।',
    metric: 'Vision & Architecture',
    color: 'from-blue-600 dark:from-blue-500 to-indigo-600 dark:to-blue-400'
  },
  {
    year: '2026',
    titleEn: 'The Era Of Execution Begins',
    titleBn: 'বাস্তবায়নের যুগ শুরু',
    descEn: '2026 is the year we stop planning and start dominating. With our foundation locked in, we\'re unleashing full-stack digital ecosystems — lightning-fast websites, AI-powered automations, conversion-optimized designs, and enterprise-grade platforms — all engineered to make your competitors wonder what just happened. This isn\'t a service. This is your unfair advantage.',
    descBn: '০০২০ হলো সেই সেই বন্ধ করে আধিপ্ত্্য শুরু করি তস্ন ছিলসত তৈরি দিচ্ছি ছিন্সেন শুনসেসসে তৈরি করিছিস। অতহ দুর্ত অত্তে প্রস্তুত — অতিদ্রুত ওয়েবসাইট, AI-চালিত অটোমেশন, কনভার্সন-঑প্টিমাইজ্ড ডিজাইন এবং নন্তরনীর গ্রেড প্ল্যাটফর্ম — সবকিছু ইঞ্জিনিয়ার করা হযেছে আপনার প্রতিযোগীদের হতনবুদ্ধি করতে। ২২ শুধু ২টি সেবা নয়। ২২ হলো আপনার অসাধারণ সুবিধা।।।',
    metric: 'Full Launch & Domination',
    color: 'from-indigo-600 to-purple-600'
  }
], []);

  // Core Values Data
  const coreValues = useMemo(() => [
    {
      titleEn: 'Continuous Innovation',
      titleBn: 'ক্রমাগত উদ্ভাবন',
      descEn: 'We do not just adopt new frameworks; we push their limits. We build private libraries, test pre-releases, and integrate advanced AI capabilities to keep you years ahead.',
      descBn: 'আমরা কেবল নতুন ফ্রেমওয়ার্ক গ্রহণই করি না, বরং সেগুলোর সীমানা ছাড়িয়ে যাই। আমরা নিজস্ব লাইব্রেরি তৈরি করি এবং উন্নত এআই ক্ষমতা যুক্ত করি যাতে আপনি সবার চেয়ে এগিয়ে থাকেন।',
      icon: Lightbulb,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-amber-100/50'
    },
    {
      titleEn: 'Absolute Transparency',
      titleBn: 'সম্পূর্ণ স্বচ্ছতা',
      descEn: 'No black boxes. No hidden fees. Every line of code, every developer sprint, and every database latency profile is entirely visible to you on shared dashboards.',
      descBn: 'কোনো অস্বচ্ছতা নেই, কোনো গোপন চার্জ নেই। কোডের প্রতিটি লাইন, ডেভেলপমেন্ট স্প্রিন্ট এবং ডাটাবেসের কার্যক্ষমতা আপনি সরাসরি শেয়ার্ড ড্যাশবোর্ডে দেখতে পাবেন।',
      icon: Eye,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-100/50'
    },
    {
      titleEn: 'Triple-Device Quality Check',
      titleBn: 'নিখুঁত মান নিয়ন্ত্রণ',
      descEn: 'Every digital artifact undergoes strict triple-device verification (Desktop, Tablet, Mobile) and extensive Lighthouse audits to achieve near-perfect speed scores.',
      descBn: 'আমাদের প্রতিটি ডিজিটাল প্রোডাক্ট ডেক্সটপ, ট্যাবলেট ও মোবাইলে নিবিড় পরীক্ষার মধ্য দিয়ে যায় এবং অত্যন্ত দ্রুত লোড স্পিড নিশ্চিত করতে কঠোর অডিট করা হয়।',
      icon: ShieldCheck,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50'
    },
    {
      titleEn: 'Aesthetic Craftsmanship',
      titleBn: 'নান্দনিক কারুকাজ',
      descEn: 'We pairing gorgeous geometric grids, precise micro-animations, and balanced negative space to design emotional digital products that captivate users instantly.',
      descBn: 'আমরা চমৎকার জ্যামিতিক গ্রিড, নিখুঁত মাইক্রো-অ্যানিমেশন এবং মার্জিত নেগেটিভ স্পেস ব্যবহার করে এমন ডিজাইন করি যা ব্যবহারকারীদের প্রথম দেখাতেই আকৃষ্ট করে।',
      icon: Palette,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-100/50'
    },
    {
      titleEn: 'Hyper-Care Client Success',
      titleBn: 'গ্রাহক কেন্দ্রিক প্রবৃদ্ধি',
      descEn: 'Your investment ROI is our highest engineering benchmark. We actively check post-launch user dropoffs, funnel conversion rates, and server performance.',
      descBn: 'আপনার বিনিয়োগের সর্বোচ্চ রিটার্ন নিশ্চিত করাই আমাদের মূল লক্ষ্য। আমরা লঞ্চ-পরবর্তী ব্যবহারকারীর আচরণ এবং সার্ভারের কার্যক্ষমতা নিবিড়ভাবে পর্যবেক্ষণ করি।',
      icon: Heart,
      color: 'from-red-500/10 to-rose-500/10 text-red-600 dark:text-red-400 border-red-100/50'
    },
    {
      titleEn: 'Long-Term Partnership',
      titleBn: 'দীর্ঘমেয়াদী অংশীদারিত্ব',
      descEn: 'We do not build and disappear. We continuously consult on tech-stack pivots, scale strategies, database replication, and digital expansion roadmap.',
      descBn: 'আমরা প্রজেক্ট শেষ করে হারিয়ে যাই না। টেক-স্ট্যাক পরিবর্তন, স্কেলিং কৌশল এবং ডাটাবেস সিকিউরিটি নিয়ে আমরা ক্রমাগত ব্যবসায়িক পরামর্শ প্রদান করি।',
      icon: Users,
      color: 'from-purple-500/10 to-violet-500/10 text-purple-600 dark:text-purple-400 dark:text-purple-300 border-purple-100/50'
    },
    {
      titleEn: 'Growth & Scale Mindset',
      titleBn: 'প্রবৃদ্ধি ও স্কেলিং মানসিকতা',
      descEn: 'Our databases and serverless architectures are built with horizontal scaling in mind. We prepare your software to handle 10x traffic spikes seamlessly.',
      descBn: 'আমাদের ডাটাবেস এবং সার্ভারলেস আর্কিটেকচার সহজেই ট্রাফিক সামলাতে পারে। আপনার সফটওয়্যারকে ১০ গুণ বেশি ট্রাফিক পরিচালনা করার জন্য প্রস্তুত করা হয়।',
      icon: TrendingUp,
      color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-100/50'
    },
    {
      titleEn: 'AI-Driven Future',
      titleBn: 'এআই-চালিত ভবিষ্যৎ',
      descEn: 'By integrating LLMs, cognitive workflows, and automated agents directly into web apps, we completely eliminate manual repetitive tasks.',
      descBn: 'এলএলএম, কগনিটিভ ওয়ার্কফ্লো এবং স্বয়ংক্রিয় এআই এজেন্টকে ওয়েব অ্যাপে একীভূত করার মাধ্যমে আমরা পুনরাবৃত্তিমূলক কাজ দূর করি।',
      icon: BrainCircuit,
      color: 'from-fuchsia-500/10 to-purple-500/10 text-fuchsia-600 border-fuchsia-100/50'
    }
  ], []);

  // Services Bento Grid Data
  const servicesList = useMemo(() => [
    {
      id: 'web-dev',
      slug: 'web-development',
      category: 'dev',
      icon: Code2,
      nameEn: 'Web Development',
      nameBn: 'ওয়েব ডেভেলপমেন্ট',
      descEn: 'Ultra-fast static and dynamic marketing sites built with optimized layouts and flawless SEO scores.',
      descBn: 'উচ্চগতির স্ট্যাটিক ও ডাইনামিক ওয়েবসাইট যা দারুণভাবে সার্চ ইঞ্জিনে র‍্যাঙ্ক করতে সাহায্য করে।',
      techs: ['Next.js', 'React', 'Tailwind', 'Cloudflare'],
      benefitEn: '99+ Lighthouse speed score',
      benefitBn: '৯৯+ লাইটহাউস স্পিড স্কোর'
    },
    {
      id: 'ui-ux',
      slug: 'ui-ux-design',
      category: 'design',
      icon: Layers,
      nameEn: 'UI/UX Design',
      nameBn: 'ইউআই/ইউএক্স ডিজাইন',
      descEn: 'Immersive layouts, strict design systems, and responsive wireframes that perfectly blend brand story with usability.',
      descBn: 'আকর্ষণীয় লেআউট, সুসংগঠিত ডিজাইন সিস্টেম এবং ব্যবহারকারী-বান্ধব ইন্টারফেস ডিজাইন।',
      techs: ['Figma', 'Framer', 'Prototyping', 'Adobe CC'],
      benefitEn: '100% bespoke design files',
      benefitBn: 'শতভাগ ইউনিক ডিজাইন ফাইল'
    },
    {
      id: 'seo',
      slug: 'seo',
      category: 'marketing',
      icon: Search,
      nameEn: 'SEO Optimization',
      nameBn: 'এসইও অপ্টিমাইজেশন',
      descEn: 'Semantic content structures, schema markup deployment, and technical audits that secure persistent search rankings.',
      descBn: 'সার্চ ইঞ্জিনে র‍্যাঙ্ক পাওয়ার জন্য নিখুঁত কনটেন্ট স্ট্রাকচার এবং টেকনিক্যাল অডিট।',
      techs: ['Semrush', 'Ahrefs', 'Schema.org', 'Console'],
      benefitEn: 'Double-digit organic CTR lift',
      benefitBn: 'দ্বিগুণ অর্গানিক ক্লিক রেট বৃদ্ধি'
    },
    {
      id: 'marketing',
      slug: 'digital-marketing',
      category: 'marketing',
      icon: Rocket,
      nameEn: 'Digital Marketing',
      nameBn: 'ডিজিটাল মার্কেটিং',
      descEn: 'High-conversion paid campaigns, social ad targeting, and retargeting systems designed for maximum lead ROI.',
      descBn: 'সর্বোচ্চ লাভ বা রিটার্ন অন ইনভেস্টমেন্ট নিশ্চিত করার জন্য হাই-কনভার্সন বিজ্ঞাপন প্রচার।',
      techs: ['Meta Pixel', 'Google Ads', 'GA4', 'Tag Manager'],
      benefitEn: '3.5x average ad spend return',
      benefitBn: '৩.৫ গুণ বেশি বিজ্ঞাপন আরওআই'
    },
    {
      id: 'graphic-design',
      slug: 'graphic-design',
      category: 'design',
      icon: Palette,
      nameEn: 'Graphic Design',
      nameBn: 'গ্রাফিক ডিজাইন',
      descEn: 'Visual assets, marketing banners, and vector packaging materials that cleanly communicate premium product value.',
      descBn: 'আকর্ষণীয় ভিজ্যুয়াল অ্যাসেটস এবং ডিজিটাল ব্যানার যা আপনার পণ্যের মান তুলে ধরে।',
      techs: ['Illustrator', 'Photoshop', 'InDesign', 'Vector'],
      benefitEn: 'Pixel-perfect print files',
      benefitBn: 'মুদ্রণযোগ্য পিক্সেল-পারফেক্ট ফাইল'
    },
    {
      id: 'ai-automation',
      slug: 'ai-automation',
      category: 'ai',
      icon: Cpu,
      nameEn: 'AI Services',
      nameBn: 'এআই সার্ভিস',
      descEn: 'Automate repetitive back-office operations, sync data vectors, and streamline workflows with intelligent triggers.',
      descBn: 'ব্যবসায়িক পুনরাবৃত্তিমূলক কাজ দূরীকরণ এবং স্বয়ংক্রিয় এআই সিস্টেম সংস্থাপন।',
      techs: ['n8n', 'Make.com', 'Zapier', 'APIs'],
      benefitEn: '70% manual labor hours saved',
      benefitBn: '৭০% পর্যন্ত সময় ও শ্রম সাশ্রয়'
    },
    {
      id: 'ai-agents',
      slug: 'ai-automation',
      category: 'ai',
      icon: BrainCircuit,
      nameEn: 'AI Agents',
      nameBn: 'এআই এজেন্টস',
      descEn: 'Develop proprietary autonomous cognitive agents capable of advanced reasoning, live translation, and complex task planning.',
      descBn: 'উন্নত সিদ্ধান্ত গ্রহণ ও জটিল কাজ সম্পন্ন করতে সক্ষম স্বয়ংক্রিয় কগনিটিভ এজেন্ট।',
      techs: ['Gemini SDK', 'OpenAI API', 'LangChain', 'VectorDB'],
      benefitEn: '24/7 intelligent execution',
      benefitBn: '২৪/৭ নির্ভুল স্বয়ংক্রিয় কার্যক্রম'
    },
    {
      id: 'video-editing',
      slug: 'video-editing',
      category: 'design',
      icon: Play,
      nameEn: 'Video Editing',
      nameBn: 'ভিডিও এডিটিং',
      descEn: 'Premium high-retention commercial promos, kinetic titles, sound design, and color grading for digital channels.',
      descBn: 'ডিজিটাল প্ল্যাটফর্মের জন্য প্রিমিয়াম প্রমোশনাল বিজ্ঞাপন, কালার গ্রেডিং ও সাউন্ড ডিজাইন।',
      techs: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
      benefitEn: '40%+ social retention bump',
      benefitBn: '৪০%+ সামাজিক যোগাযোগ মাধ্যমে রিটেনশন বৃদ্ধি'
    },
    {
      id: 'branding',
      slug: 'graphic-design',
      category: 'design',
      icon: Sparkles,
      nameEn: 'Branding & Identity',
      nameBn: 'ব্র্যান্ডিং ও আইডেন্টিটি',
      descEn: 'Craft unforgettable brand strategies, unique logo marks, color guidebooks, and guidelines that establish market leadership.',
      descBn: 'অনন্য ব্র্যান্ড কৌশল, লোগো মার্ক এবং কালার গাইডলাইন যা আপনার ব্র্যান্ডকে বাজারে শীর্ষস্থানে প্রতিষ্ঠিত করবে।',
      techs: ['Figma', 'Illustrator', 'Brand Strategy'],
      benefitEn: 'Indestructible market recall',
      benefitBn: 'দীর্ঘস্থায়ী ব্র্যান্ড ভ্যালু ও বিশ্বাসযোগ্যতা'
    }
  ], []);

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

  // Expert Team List loaded from Settings or premium default
  const teamMembers = useMemo(() => {
    const defaultTeam = [
      {
        name: 'Sanjid Rahman',
        roleEn: 'Chief Technology Officer (CTO)',
        roleBn: 'প্রধান প্রযুক্তি কর্মকর্তা (সিটিও)',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        bioEn: 'Senior Full Stack Systems Architect specializing in type-safe concurrent compilations, relational performance tuning, and high-frequency data structures.',
        bioBn: 'সিনিয়র ফুল-স্ট্যাক সিস্টেম আর্কিটেক্ট যিনি টাইপ-সেফ কনকারেন্ট কোডিং এবং উচ্চ-পারফরম্যান্স ডাটাবেস আর্কিটেকচারে অত্যন্ত দক্ষ।',
        skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Go', 'LLMs'],
        experience: '12+ Years Exp',
        linkedin: '#'
      },
      {
        name: 'Tasnim Ahmed',
        roleEn: 'Chief Design Officer (CDO)',
        roleBn: 'প্রধান ডিজাইন কর্মকর্তা (সিডিও)',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
        bioEn: 'Award-winning visual and digital interaction designer. Believes that breathing grids, strict type rules, and negative space form the bedrock of user conversion.',
        bioBn: 'পুরস্কার বিজয়ী ভিজ্যুয়াল এবং ডিজিটাল ইন্টারঅ্যাকশন ডিজাইনার। চমৎকার গ্রিড ও সঠিক স্পেসিংকে ইউজার কনভার্সনের অন্যতম প্রধান বিষয় মনে করেন।',
        skills: ['Figma', 'Framer', 'Design Systems', 'Interface Theory'],
        experience: '9+ Years Exp',
        linkedin: '#'
      },
      {
        name: 'Dr. Asif Karim',
        roleEn: 'VP of Organic Search Strategy',
        roleBn: 'অর্গানিক সার্চ স্ট্র্যাটেজি ভিপি',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
        bioEn: 'SEO veteran who decodes web crawl semantics and builds authoritative information structures that capture top-tier international search positions.',
        bioBn: 'এসইও বিশেষজ্ঞ যিনি সার্চ ক্রলিং মেথড ডিকোড করে কাস্টমারদের জন্য বৈশ্বিক এবং দেশের বাজারে প্রথম স্থান অর্জন করতে কাজ করেন।',
        skills: ['Technical SEO', 'Schema Markup', 'Semrush', 'Search Console'],
        experience: '14+ Years Exp',
        linkedin: '#'
      }
    ];
    return settings.aboutTeamJson ? JSON.parse(settings.aboutTeamJson) : defaultTeam;
  }, [settings]);

  // Success Stories Data
  const successStories = useMemo(() => [
    {
      company: 'Apex Healthcare Inc.',
      metric: '80% Booking Ratio',
      metricDescEn: 'Lift in virtual consultation booking rate inside 45 days.',
      metricDescBn: 'মাত্র ৪৫ দিনে ভার্চুয়াল কনসাল্টেশন বুকিং রেট বৃদ্ধি।',
      challengeEn: 'Apex struggled with fragmented patient records, sluggish page loads (5.4s), and high user bounce rates on patient portals.',
      challengeBn: 'এপেক্স হেলথকেয়ার পেজের ধীরগতি (৫.৪ সেকেন্ড) এবং ইউজার ড্রপ-অফের কারণে অনেক রোগী বুকিং করতে ব্যর্থ হচ্ছিলেন।',
      solutionEn: 'We engineered a server-side rendered patient portal with next-gen image decoding and database transaction pooling.',
      solutionBn: 'আমরা আধুনিক ইমেজ ডিকোডিং ও অপ্টিমাইজড ডাটাবেসের সাহায্যে একটি চমৎকার উচ্চগতির পেশেন্ট পোর্টাল তৈরি করি।',
      resultsEn: 'Page load times plummeted to 720ms. The clean onboarding flow triggered a massive increase in appointment completions.',
      resultsBn: 'পেজ লোডিং সময় কমে মাত্র ৭২০ মিলিসেকেন্ডে দাঁড়ায়। অত্যন্ত সহজ বুকিং পদ্ধতির কারণে তাদের এপয়েন্টমেন্ট বুকিংয়ের হার দ্রুত বৃদ্ধি পায়।'
    },
    {
      company: 'Fintech Spark Ltd.',
      metric: '90% Transactions Uptime',
      metricDescEn: 'Under heavy load spikes of 12,000 requests per minute.',
      metricDescBn: 'প্রতি মিনিটে ১২,০০০ ট্রাফিক রিকোয়েস্টের চরম চাপেও নিরবচ্ছিন্ন সচলতা।',
      challengeEn: 'Their legacy payment routing engine suffered transient timeout bugs and duplicate transaction records during weekly traffic spikes.',
      challengeBn: 'তাদের আগের পেমেন্ট সিস্টেমে প্রতি সপ্তাহে ট্রাফিকের চরম চাপে অনেক ট্রানজেকশন আটকে যেত এবং পেমেন্ট ডুপ্লিকেট হয়ে যেত।',
      solutionEn: 'We redesigned their core API using strict relational transactions, optimistic ledger locks, and localized Cloudflare Edge caching.',
      solutionBn: 'আমরা রিলেশনাল ট্রানজেকশন, অপ্টিমিস্টিক লেজার লক এবং ক্লাউডফ্লেয়ার এজ ক্যাшением সমন্বয়ে তাদের এপিআই পুনর্নির্মাণ করি।',
      resultsEn: 'Zero duplicate billing occurrences. Processing latency dropped by 64%, completely eliminating lost transaction sales.',
      resultsBn: 'পেমেন্ট আটকে যাওয়া বা ডুপ্লিকেট হওয়া সম্পূর্ণ বন্ধ হয়ে যায়। প্রসেসিং লেটেন্সি ৬৪% কমে যায় যা ব্যবসায়িক লস পুরোপুরি দূর করে।'
    }
  ], []);

  // Filtered Services based on selected category in Bento Grid
  const filteredServices = useMemo(() => {
    if (selectedEcosystemCategory === 'all') return servicesList;
    return servicesList.filter(s => s.category === selectedEcosystemCategory);
  }, [servicesList, selectedEcosystemCategory]);

  // Industries We Serve Data
  const industriesList = useMemo(() => [
    {
      icon: DollarSign,
      nameEn: 'Fintech & Digital Banking',
      nameBn: 'ফিনটেক ও ডিজিটাল ব্যাংকিং',
      descEn: 'Relational ledger safety, lightning fast payment API integrations, and secure transactions.',
      descBn: 'রিলেশনাল লেজার সিকিউরিটি, দ্রুততম পেমেন্ট গেটওয়ে ইন্টিগ্রেশন এবং সম্পূর্ণ নিরাপদ ট্রানজেকশন।'
    },
    {
      icon: Activity,
      nameEn: 'Healthcare & Biotech',
      nameBn: 'হেলথকেয়ার ও বায়োটেক',
      descEn: 'Typesafe portal interfaces, HIPAA-compliant flows, and fast record-load latency.',
      descBn: 'টাইপসেফ পোর্টাল ইন্টারফেস এবং দ্রুততম পেশেন্ট রেকর্ড ট্র্যাকিং সিস্টেম।'
    },
    {
      icon: BookOpen,
      nameEn: 'Edtech & E-Learning',
      nameBn: 'এডটেক ও ই-লার্নিং',
      descEn: 'High concurrency video classroom streaming and custom progress management dashboards.',
      descBn: 'উচ্চ লোড ক্ষমতাসম্পন্ন ভিডিও ক্লাস স্ট্রিমিং এবং চমৎকার কাস্টম লার্নিং ড্যাশবোর্ড।'
    },
    {
      icon: Laptop,
      nameEn: 'SaaS & Enterprise Tech',
      nameBn: 'স্যাস ও এন্টারপ্রাইজ টেক',
      descEn: 'Highly scalable multitenant architectures with responsive grids and real-time triggers.',
      descBn: 'উচ্চ কার্যক্ষম মাল্টি-টেন্যান্ট স্যাস আর্কিটেকচার এবং রিয়েল-টাইম ড্যাশবোর্ড।'
    },
    {
      icon: Globe,
      nameEn: 'Global E-commerce',
      nameBn: 'গ্লোবাল ই-কমার্স',
      descEn: 'Headless shopify platforms, blazing speed catalog indexing, and automated tax calculations.',
      descBn: 'হেডলেস ই-কমার্স প্ল্যাটফর্ম, দ্রুততম প্রোডাক্ট ক্যাটালগ ইনডেক্সিং এবং পেমেন্ট।'
    },
    {
      icon: BrainCircuit,
      nameEn: 'AI Services',
      nameBn: 'এআই সার্ভিস',
      descEn: 'LLM-powered chatbots, intelligent RPA pipelines, and computer vision systems.',
      descBn: 'এলএলএম-চালিত চ্যাটবট, ইন্টেলিজেন্ট আরপিএ পাইপলাইন এবং কম্পিউটার ভিশন সিস্টেম।'
    },
    {
      icon: Rocket,
      nameEn: 'Startups & Venture',
      nameBn: 'স্টার্টআপ ও ভেঞ্চার',
      descEn: 'Rapid MVP builds, scalable product architecture, and investor-ready platform demos.',
      descBn: 'দ্রুত এমভিপি বিল্ড, স্কেলেবল প্রোডাক্ট আর্কিটেকচার এবং বিনিয়োগকারীদের জন্য প্ল্যাটফর্ম ডেমো।'
    },
    {
      icon: ShieldCheck,
      nameEn: 'Cybersecurity',
      nameBn: 'সাইবার সিকিউরিটি',
      descEn: 'Zero-trust architecture, penetration testing, and SOC 2 compliance audit automation.',
      descBn: 'জিরো-ট্রাস্ট আর্কিটেকচার, পেনিট্রেশন টেস্টিং এবং এসওসি ২ কমপ্লায়েন্স অডিট।'
    },
    {
      icon: Smartphone,
      nameEn: 'Telecom & Connectivity',
      nameBn: 'টেলিকম ও কানেক্টিভিটি',
      descEn: 'OSS/BSS platforms, real-time network monitoring dashboards, and 5G provisioning portals.',
      descBn: 'ওএসএস/বিএসএস প্ল্যাটফর্ম, রিয়েল-টাইম নেটওয়ার্ক মনিটরিং ড্যাশবোর্ড এবং ৫জি প্রভিশনিং।'
    },
    {
      icon: TrendingUp,
      nameEn: 'Investment & Trading',
      nameBn: 'ইনভেস্টমেন্ট ও ট্রেডিং',
      descEn: 'Real-time market data feeds, algorithmic trading engines, and portfolio risk analytics.',
      descBn: 'রিয়েল-টাইম মার্কেট ডেটা ফিড, অ্যালগরিদমিক ট্রেডিং ইঞ্জিন এবং পোর্টফোলিও রিস্ক অ্যানালিটিক্স।'
    },
    {
      icon: Server,
      nameEn: 'Cloud & DevOps',
      nameBn: 'ক্লাউড ও ডেভঅপ্স',
      descEn: 'Multi-cloud Kubernetes orchestration, CI/CD pipelines, and auto-scaling infrastructure.',
      descBn: 'মাল্টি-ক্লাউড কুবেরনেটিস অর্কেস্ট্রেশন, সিআই/সিডি পাইপলাইন এবং অটো-স্কেলিং ইনফ্রাস্ট্রাকচার।'
    },
    {
      icon: Play,
      nameEn: 'Media & Entertainment',
      nameBn: 'মিডিয়া ও এন্টারটেইনমেন্ট',
      descEn: 'OTT streaming platforms, live event broadcasting, and DRM-protected content delivery.',
      descBn: 'ওটিটি স্ট্রিমিং প্ল্যাটফর্ম, লাইভ ইভেন্ট ব্রডকাস্টিং এবং ডিআরএম-প্রটেক্টেড কনটেন্ট ডেলিভারি।'
    },
    {
      icon: MapPin,
      nameEn: 'Real Estate & Property',
      nameBn: 'রিয়েল এস্টেট ও প্রপার্টি',
      descEn: 'VR property tours, automated valuation models, and smart building IoT integrations.',
      descBn: 'ভিআর প্রপার্টি ট্যুর, অটোমেটেড ভ্যালুয়েশন মডেল এবং স্মার্ট বিল্ডিং আইওটি ইন্টিগ্রেশন।'
    },
    {
      icon: Compass,
      nameEn: 'Logistics & Transportation',
      nameBn: 'লজিস্টিকস ও ট্রান্সপোর্টেশন',
      descEn: 'Fleet tracking systems, route optimization engines, and real-time shipment visibility.',
      descBn: 'ফ্লিট ট্র্যাকিং সিস্টেম, রুট অপ্টিমাইজেশন ইঞ্জিন এবং রিয়েল-টাইম শিপমেন্ট ভিজিবিলিটি।'
    },
    {
      icon: Heart,
      nameEn: 'Wellness & Lifestyle',
      nameBn: 'ওয়েলনেস ও লাইফস্টাইল',
      descEn: 'Health tracking platforms, telemedicine portals, and personalized wellness AI coaches.',
      descBn: 'হেলথ ট্র্যাকিং প্ল্যাটফর্ম, টেলিমেডিসিন পোর্টাল এবং পার্সোনালাইজড ওয়েলনেস এআই কোচ।'
    },
    {
      icon: Users,
      nameEn: 'HR & Talent Management',
      nameBn: 'এইচআর ও ট্যালেন্ট ম্যানেজমেন্ট',
      descEn: 'ATS recruitment platforms, employee engagement dashboards, and payroll automation.',
      descBn: 'এটিএস রিক্রুটমেন্ট প্ল্যাটফর্ম, এমপ্লয়ি এনগেজমেন্ট ড্যাশবোর্ড এবং পে-রোল অটোমেশন।'
    }
  ], []);

  // Our Process Steps
  const processSteps = useMemo(() => [
    {
      step: '01',
      titleEn: 'Strategic Discovery & Consulting',
      titleBn: 'কৌশলগত আলোচনা ও পরিকল্পনা',
      descEn: 'We begin by analyzing your exact business goals, auditing any legacy codebases, and planning a bulletproof roadmap to eliminate technical bottlenecks.',
      descBn: 'আপনার ব্যবসায়িক লক্ষ্য পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করা এবং সমস্ত টেকনিক্যাল বাধা দূর করতে একটি বুলেটপ্রুফ রোডম্যাপ তৈরি করা।'
    },
    {
      step: '02',
      titleEn: 'Visual Prototyping & UX Design',
      titleBn: 'ভিজ্যুয়াল প্রোটোটাইপিং ও ইউএক্স ডিজাইন',
      descEn: 'Our award-winning designers create bespoke interactive wireframes, establishing strict typographic hierarchy and breathing grids.',
      descBn: 'আমাদের চমৎকার ডিজাইনাররা আপনার ব্র্যান্ডের জন্য কাস্টম ডিজাইন, ইন্টারঅ্যাকশন মকআপ এবং সুসংগঠিত টাইপোগ্রাফি তৈরি করেন।'
    },
    {
      step: '03',
      titleEn: 'Typesafe Agile Development',
      titleBn: 'টাইপসেফ এজাইল ডেভেলপমেন্ট',
      descEn: 'We craft modular, self-healing typescript structures and optimized database schemas using Next.js/React for extreme responsive performance.',
      descBn: 'আমরা নেক্সট.জেএস এবং রিঅ্যাক্টের সাহায্যে দ্রুতগতির, পরিচ্ছন্ন ও শতভাগ সুরক্ষিত কোড স্ট্রাকচার তৈরি করি।'
    },
    {
      step: '04',
      titleEn: 'Strict Quality Auditing & Launch',
      titleBn: 'কঠোর মান পরীক্ষা ও লঞ্চিং',
      descEn: 'We deploy extensive Lighthouse score audits and run multi-device checks on desktop, tablet, and mobile before launching with zero downtime.',
      descBn: 'লঞ্চ করার আগে আমরা প্রতিটি ফিচার ডেস্কটপ, ট্যাবলেট এবং মোবাইলে নিবিড় পরীক্ষা করি এবং সর্বোচ্চ স্পিড স্কোর নিশ্চিত করি।'
    },
    {
      step: '05',
      titleEn: 'Hyper-Care Post-Launch Growth Support',
      titleBn: 'লঞ্চ পরবর্তী প্রবৃদ্ধি ও সাপোর্ট',
      descEn: 'We monitor funnel conversion, optimize database index lag, and scale serverless resources to prepare your application for heavy traffic peaks.',
      descBn: 'আমরা ডাটাবেস পারফরম্যান্স পর্যবেক্ষণ, ট্রাফিক সামলানো এবং ক্রমাগত নতুন কাস্টমাইজেশন ও কারিগরি সাপোর্ট দিয়ে থাকি।'
    }
  ], []);

  return (
    <section id="about-page" data-space-page className="bg-white dark:bg-[#0F0E0C] dark:bg-gradient-to-b dark:from-[#12100D] dark:via-[#0F0E0C] dark:to-[#0A0908] text-neutral-900 dark:text-white relative selection:bg-blue-500 dark:bg-blue-500 selection:text-white">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800 z-50">
        <motion.div 
          className="h-full bg-blue-600 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* Background ambient luxurious glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-10 w-[600px] h-[600px] bg-gradient-to-bl from-teal-500/5 to-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-10 w-[500px] h-[500px] bg-gradient-to-tr from-fuchsia-500/5 to-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ========================================================
          01. HERO STORY — ABOUT US PREMIUM HERO
         ======================================================== */}
      <div className="hero-stack">
      <section id="about-hero" data-space-hero className="hero-sticky relative overflow-hidden bg-white dark:bg-[#080a0d] min-h-[100svh]">
        
        {/* Background "NEXT SOLUTION" watermark typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0" aria-hidden="true">
          <span className="block text-[120px] sm:text-[180px] lg:text-[260px] font-black uppercase tracking-wider text-black/[0.018] dark:text-white/[0.025] whitespace-nowrap leading-none">N E X T</span>
        </div>

        {/* Orange dot pattern — upper middle */}
        <div className="absolute top-16 left-[45%] w-[180px] h-[120px] pointer-events-none opacity-[0.08] dark:opacity-[0.06] z-0" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #FF5A00 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

        {/* Orange dot pattern — far right */}
        <div className="absolute bottom-24 right-8 w-[140px] h-[100px] pointer-events-none opacity-[0.07] dark:opacity-[0.05] z-0" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #FF5A00 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

        {/* Large abstract orange curved shape — far right */}
        <div className="absolute -right-32 bottom-0 w-[400px] h-[700px] pointer-events-none z-0" aria-hidden="true">
          <div className="absolute inset-0 rounded-l-full bg-gradient-to-l from-[#FF5A00]/12 via-[#FF5A00]/6 to-transparent" />
          <div className="absolute top-20 right-0 w-[250px] h-[400px] rounded-l-full border-[3px] border-[#FF5A00]/15 dark:border-[#FF5A00]/10" />
          <div className="absolute top-40 right-12 w-[180px] h-[300px] rounded-l-full border-[2px] border-[#FF5A00]/8 dark:border-[#FF5A00]/6" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-0 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-10 lg:mb-14">
            <span className="hover:text-[#FF5A00] dark:hover:text-[#FF5A00] transition cursor-pointer" onClick={() => navigateToTab('home')}>
              {currentLang === 'en' ? 'Home' : 'হোম'}
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <span className="text-neutral-900 dark:text-white">
              {currentLang === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-stretch">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-5 space-y-7 lg:space-y-8 relative z-10 flex flex-col justify-center py-10 lg:py-0">

              {/* Label */}
              <div className="inline-flex items-center space-x-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5A00] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A00]">
                  {currentLang === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-sans text-[2rem] sm:text-[2.6rem] lg:text-[3.4rem] font-black tracking-tight leading-[1.02] text-neutral-900 dark:text-white">
                {currentLang === 'en' ? (
                  <>
                    We Are Not Just<br />
                    An Agency.<br />
                    We Are Your Digital<br />
                    Growth <span className="text-[#FF5A00]">Partner</span>.
                  </>
                ) : (
                  <>
                    আমরা শুধু একটি<br />
                    এজেন্সি নই।<br />
                    আমরা আপনার ডিজিটাল<br />
                    <span className="text-[#FF5A00]">গ্রোথ পার্টনার</span>।
                  </>
                )}
              </h1>

              {/* Orange underline */}
              <div className="w-[45px] h-[3.5px] rounded-full bg-[#FF5A00]" />

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#555555] dark:text-[#b5b5b5] max-w-[460px]">
                {currentLang === 'en'
? 'At Next Solution, we combine creativity, technology and strategy to help businesses grow faster. From web development to AI Services, we deliver complete digital solutions under one roof.'
                  : 'নেক্সট সলিউশনে, আমরা সৃজনশীলতা, প্রযুক্তি এবং কৌশল একত্রিত করে ব্যবসাগুলোকে দ্রুত বৃদ্ধি পেতে সাহায্য করি। ওয়েব ডেভেলপমেন্ট থেকে AI সার্ভিস — আমরা এক ছাদের নিচে সম্পূর্ণ ডিজিটাল সমাধান প্রদান করি।'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <motion.button
                  id="about-hero-btn-primary"
                  onClick={() => navigateToTab('services')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-[#FF5A00] hover:bg-[#E04F00] text-white text-[13px] sm:text-sm font-bold px-7 py-3.5 shadow-lg shadow-[#FF5A00]/20 hover:shadow-xl hover:shadow-[#FF5A00]/30 transition-all duration-300 cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Explore Services' : 'সেবাসমূহ দেখুন'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.button
                  id="about-hero-btn-secondary"
                  onClick={() => navigateToTab('team')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-[10px] border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-transparent text-neutral-800 dark:text-white text-[13px] sm:text-sm font-bold px-7 py-3.5 hover:border-neutral-500 dark:hover:border-neutral-400 transition-all duration-300 cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Meet Our Team' : 'আমাদের টিম দেখুন'}</span>
                  <Users className="h-4 w-4" />
                </motion.button>
              </div>

{/* Key Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {[
                  { value: '2+', labelEn: 'Years Technical', labelBn: 'বছরের অভিজ্ঞতা' },
                  { value: '2+', labelEn: 'Years Agency', labelBn: 'বছরের এজেন্সি' },
                  { value: '50+', labelEn: 'Projects', labelBn: 'প্রজেক্ট' },
                  { value: '20+', labelEn: 'Clients', labelBn: 'ক্লায়েন্ট' },
                  { value: '5+', labelEn: 'Team Members', labelBn: 'টিম মেম্বার' },
                  { value: '8+', labelEn: 'Digital Services', labelBn: 'ডিজিটাল সেবা' },
                  { value: '20+', labelEn: 'Industries Served', labelBn: 'ইন্ডাস্ট্রি' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="group rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm px-3 py-2.5 text-center hover:border-[#FF5A00]/50 hover:bg-[#FF5A00]/5 hover:shadow-[0_8px_24px_-8px_rgba(255,90,0,0.3)] transition-all duration-300"
                  >
                    <span className="block text-[15px] font-black text-neutral-900 dark:text-white group-hover:text-[#FF5A00] transition-colors duration-300 leading-none">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-[8.5px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                      {currentLang === 'en' ? s.labelEn : s.labelBn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN — Team Visual ── */}
            <div className="lg:col-span-7 relative z-10 flex justify-center lg:justify-end lg:items-end -mr-4 xl:-mr-12 2xl:-mr-20">
              <div className="relative w-full max-w-[540px] lg:max-w-none ml-auto lg:ml-8 xl:ml-12">

                {/* Circular glow frame */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[500px] lg:h-[500px] xl:w-[580px] xl:h-[580px] rounded-full border border-[#FF5A00]/25 dark:border-[#FF5A00]/20 bg-gradient-to-br from-[#FF5A00]/5 via-[#FF5A00]/3 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] sm:w-[400px] sm:h-[400px] lg:w-[540px] lg:h-[540px] xl:w-[620px] xl:h-[620px] rounded-full border border-[#FF5A00]/10 dark:border-[#FF5A00]/8 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[460px] lg:h-[460px] xl:w-[540px] xl:h-[540px] rounded-full bg-[#FF5A00]/[0.04] dark:bg-[#FF5A00]/[0.06] blur-[60px] pointer-events-none" />

                {/* Team image */}
                <div className="relative z-10">
                  <img
                    src="/about.png"
                    alt={currentLang === 'en' ? 'Next Solution Team' : 'নেক্সট সলিউশন টিম'}
                    className="w-full h-auto relative z-10 scale-[0.95] sm:scale-[1.05] lg:scale-[1.05] xl:scale-[1.15] 2xl:scale-[1.25] origin-bottom dark:hidden"
                    style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)' }}
                  />
                  <img
                    src="/aboutb.png"
                    alt={currentLang === 'en' ? 'Next Solution Team' : 'নেক্সট সলিউশন টিম'}
                    className="w-full h-auto relative z-10 scale-[0.95] sm:scale-[1.05] lg:scale-[1.05] xl:scale-[1.15] 2xl:scale-[1.25] origin-bottom hidden dark:block"
                    style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)' }}
                  />
                </div>

                {/* ── Floating Cards (Desktop) ── */}
                <div className="hidden lg:block">
                </div>

</div>
            </div>

          </div>
        </div>
      </section>
      </div>

      {/* ========================================================
          02. WHO WE ARE
         ======================================================== */}
      <section id="who-we-are" className="stack-cover relative py-28 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/20 to-white dark:from-[#0A0908] dark:via-[#0F0E0C] dark:to-[#12100D]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center space-y-5 max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-sm rounded-full px-5 py-2 border border-orange-100 dark:border-orange-500/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                {currentLang === 'en' ? 'WHO WE ARE' : '\u0986\u09AE\u09B0\u09BE \u0995\u09C7'}
              </span>
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-neutral-900 dark:text-white leading-[1.1] tracking-tight">
              {currentLang === 'en' ? (
                <>Not Just An Agency.<br />We Are Your <span className="text-orange-500">Digital Growth</span> Engine.</>
              ) : (
                <>\u09B6\u09C1\u09A7\u09C1 \u09E8\u099F\u09BF \u098F\u099C\u09C7\u09A8\u09CD\u09B8\u09BF \u09A8\u09DF\u0964<br />\u0986\u09AE\u09B0\u09BE \u0986\u09AA\u09A8\u09BE\u09B0 <span className="text-orange-500">\u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF\u09B0</span> \u0987\u09A8\u09CD\u099C\u09BF\u09A8\u0964</>
              )}
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">

            {/* Left: Narrative (3 cols) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {currentLang === 'en'
                    ? 'Next Solution was born from a frustration with the status quo \u2014 agencies that deliver pretty designs but zero measurable business impact. We refused to be another cookie-cutter shop.'
                    : '\u09A8\u09C7\u0995\u09CD\u09B8\u09CD\u09A4 \u09B8\u09B2\u09BF\u0989\u09B6\u09A8 \u099C\u09A8\u09CD\u09AE\u09C7\u099B\u09C7 \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u0985\u09AC\u09B8\u09CD\u09A5\u09BE \u09B9\u09A4\u09BE\u09B6\u09BE \u09A5\u09C7\u0995\u09C7 \u2014 \u09E8\u09AE \u098F\u099C\u09C7\u09A8\u09CD\u09B8\u09BF \u09A5\u09C7\u0995\u09C7 \u09AF\u09C7 \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u09A6\u09C7\u09AF\u09BC \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09CB\u09A8\u09CB \u09AA\u09B0\u09BF\u09AE\u09BE\u09AA\u09AF\u09CB\u0997\u09CD\u09A6 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09AF\u09BC\u09BF\u0995 \u09AA\u09CD\u09B0\u09AD\u09BE\u09AC \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09C7 \u09A8\u09BE\u0964 \u0986\u09AE\u09B0\u09BE \u0986\u09B0\u09C7\u0995\u099F\u09BF \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09A6\u09CB\u0995\u09BE\u09A8 \u09B9\u09A4\u09C7 \u09B0\u09BE\u099C\u09BF \u099B\u09BF\u09B2\u09BE\u09AE \u09A8\u09BE\u0964'}
                </p>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {currentLang === 'en'
                    ? 'We are a team of engineers, architects, and strategists who think in systems \u2014 not templates. Every line of code we write, every workflow we automate, every pixel we place is designed to generate revenue and compound growth.'
                    : '\u0986\u09AE\u09B0\u09BE \u0987\u09A8\u09CD\u099C\u09BF\u09A8\u09BF\u09AF\u09BC\u09BE\u09B0, \u0986\u09B0\u09CD\u0995\u09BF\u099F\u09C7\u0995\u09CD\u09A4 \u098F\u09AC\u0982 \u0995\u09CC\u09B6\u09B2\u09AC\u09BF\u09A6\u09A6\u09C7\u09B0 \u098F\u0995\u099F\u09BF \u09A6\u09B2 \u09AF\u09BE\u09B0\u09BE \u099F\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F \u09A8\u09DF, \u09B8\u09BF\u09B8\u09CD\u09A4\u09C7\u09AE \u09AD\u09BE\u09AC\u09C7\u0964 \u0986\u09AE\u09B0\u09BE \u09AF\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0995\u09CB\u09A1 \u09B2\u09BF\u0996\u09BF, \u09AF\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0993\u09DF\u09BE\u09B0\u09CD\u0995\u09AB\u09CD\u09B2\u09CB \u0985\u099F\u09CB\u09AE\u09C7\u099F \u0995\u09B0\u09BF, \u09AF\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AA\u09BF\u0995\u09CD\u09B8\u09C7\u09B2 \u09B8\u09CD\u09A5\u09BE\u09AA\u09A8 \u0995\u09B0\u09BF \u2014 \u09B8\u09AC\u0987 \u09B0\u09BE\u099C\u09B8\u09CD\u09AC \u09A4\u09C8\u09B0\u09BF \u09A4\u09C8\u09B0\u09BF \u098F\u09AC\u0982 \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09AC\u09BE\u09A1\u09BC\u09BE\u09A8\u09CB\u09B0 \u099C\u09A8\u09CD\u09AF \u09A1\u09BF\u099C\u09BE\u0987\u09A8\u0964'}
                </p>
              </div>

              {/* Key pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '01', titleEn: 'Engineer-Led', titleBn: '\u0987\u09A8\u09CD\u099C\u09BF\u09A8\u09BF\u09AF\u09BC\u09BE\u09B0-\u09A8\u09C7\u09A4\u09C3\u09A4\u09CD\u09B5\u09AC\u09B9\u09C0\u09A8', descEn: 'Every solution is built by senior engineers, not junior designers with a template.', descBn: '\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8 \u09B8\u09BF\u09A8\u09BF\u09AF\u09BC\u09B0 \u0987\u09A8\u09CD\u099C\u09BF\u09A8\u09BF\u09AF\u09BC\u09BE\u09B0 \u09A6\u09CD\u09AC\u09BE\u09B0\u09BE \u09A4\u09C8\u09B0\u09BF, \u099F\u09C7\u09AE\u09AA\u09CD\u09B2\u09C7\u099F \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09DF\u0964' },
                  { icon: '02', titleEn: 'Revenue-First', titleBn: '\u09B0\u09BE\u099C\u09B8\u09CD\u09AC-\u09AA\u09CD\u09B0\u09A5\u09AE', descEn: 'We measure success by your revenue lift, not deliverable checkboxes.', descBn: '\u0986\u09AE\u09B0\u09BE \u09B8\u09AB\u09B2\u09A4\u09BE \u09AE\u09BE\u09AA\u09BF \u0986\u09AA\u09A8\u09BE\u09B0 \u09B0\u09BE\u099C\u09B8\u09CD\u09AC \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09A6\u09BF\u09AF\u09BC\u09C7, \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09C7\u09AC\u09B2 \u099A\u09C7\u0995\u09AC\u0995\u09CD\u09B8 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09DF\u0964' },
                  { icon: '03', titleEn: 'AI-Powered', titleBn: 'AI-\u099A\u09BE\u09B2\u09BF\u09A4', descEn: 'We bake AI Services into every workflow from day one \u2014 not as an afterthought.', descBn: '\u0986\u09AE\u09B0\u09BE \u09AA\u09CD\u09B0\u09A5\u09AE \u09A6\u09BF\u09A8 \u09A5\u09C7\u0995\u09C7\u09A8 \u09A5\u09C7\u0995\u09C7\u09A8\u09A8\u09C0\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u0993\u09DF\u09BE\u09B0\u09CD\u0995\u09AB\u09CD\u09B2\u09CB\u09A4\u09C7 AI \u0985\u099F\u09CB\u09AE\u09C7\u09B6\u09A8 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09BF\u0964' }
                ].map((pillar, i) => (
                  <div key={i} className="group relative rounded-2xl bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 p-5 space-y-3 hover:border-orange-200 dark:hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-500">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-[11px] font-black text-orange-600 dark:text-orange-400">{pillar.icon}</span>
                    <h4 className="text-sm font-black text-neutral-900 dark:text-white">{currentLang === 'en' ? pillar.titleEn : pillar.titleBn}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{currentLang === 'en' ? pillar.descEn : pillar.descBn}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats & CTA (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: '50+', labelEn: 'Projects Delivered', labelBn: '\u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8' },
                  { number: '100%', labelEn: 'Client Retention', labelBn: '\u0995\u09CD\u09B2\u09BE\u09AF\u09BC\u09C7\u09A8\u09CD\u099F \u09A7\u09BE\u09B0\u09A3' },
                  { number: '24/7', labelEn: 'Active Support', labelBn: '\u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u09B8\u09BE\u09AA\u09CB\u09B0\u09CD\u099F' },
                  { number: '<200ms', labelEn: 'Avg Response Time', labelBn: '\u0997\u09B2 \u09B0\u09C7\u09B8\u09AA\u09A8\u09CD\u09B8 \u099F\u09BE\u0987\u09AE' }
                ].map((stat, i) => (
                  <div key={i} className="relative rounded-2xl bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 p-5 text-center space-y-1 hover:border-orange-200 dark:hover:border-orange-500/20 transition-all duration-300">
                    <span className="block text-2xl font-black text-orange-500 font-mono">{stat.number}</span>
                    <span className="block text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{currentLang === 'en' ? stat.labelEn : stat.labelBn}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 md:p-8 text-white space-y-4 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{currentLang === 'en' ? 'Our Philosophy' : '\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09A6\u09B0\u09CD\u09B6\u09A8'}</span>
                  <h3 className="text-lg font-black leading-snug">
                    {currentLang === 'en'
                      ? '"We don\'t deliver websites. We deliver revenue engines."'
                      : '"\u0986\u09AE\u09B0\u09BE \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F \u09A6\u09BF\u09DF \u09A8\u09BE\u0964 \u0986\u09AE\u09B0\u09BE \u09B0\u09BE\u099C\u09B8\u09CD\u09AC \u0987\u09A8\u09CD\u099C\u09BF\u09A8 \u09A6\u09BF\u09DF\u0964"'}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {currentLang === 'en'
                      ? 'Every project is treated as a business partnership. Your success metrics are our KPIs.'
                      : '\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F\u0995\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09AF\u09BC\u09BF\u0995 \u0985\u0982\u09B6\u09C0\u09A6\u09BE\u09B0\u09BF\u09A4\u09CD\u09B5 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AF\u0964 \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09AB\u09B2\u09A4\u09BE\u09B0 \u09AE\u09BE\u09AA\u0995\u09BE\u09A0\u09BF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 KPI\u0964'}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigateToTab('contact')}
                className="w-full rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold px-6 py-4 hover:scale-[1.01] transition-all duration-300 shadow-lg cursor-pointer"
              >
                {currentLang === 'en' ? 'Work With Us \u2192' : '\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09C1\u09A8 \u2192'}
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          03. OUR GUIDING STARS (Mission & Vision)
         ======================================================== */}
      <section id="mission-vision" className="relative py-28 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 dark:from-[#0A0908] dark:via-[#0F0E0C] dark:to-[#12100D]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.04] dark:bg-orange-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/[0.03] dark:bg-orange-500/[0.015] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-[200px] h-[150px] pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #FF4A00 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="absolute bottom-10 right-10 w-[180px] h-[130px] pointer-events-none opacity-[0.06] dark:opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #FF4A00 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-5 max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-sm rounded-full px-5 py-2 border border-orange-100 dark:border-orange-500/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                {currentLang === 'en' ? 'OUR GUIDING STARS' : '\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AA\u09A5\u09AA\u09CD\u09B0\u09A6\u09B0\u09CD\u09B6\u0995 \u09A6\u09B0\u09CD\u09B6\u09A8'}
              </span>
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-neutral-900 dark:text-white leading-[1.1] tracking-tight">
              {currentLang === 'en' ? (
                <>The <span className="text-orange-500">Mission</span> That Drives Us.<br className="hidden sm:block" /> The <span className="text-orange-400">Vision</span> That Guides Us.</>
              ) : (
                <>যে <span className="text-orange-500">\u09AE\u09BF\u09B6\u09A8</span> \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u099A\u09BE\u09B2\u09BF\u09DF\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964<br className="hidden sm:block" /> যে <span className="text-orange-400">\u09AD\u09BF\u09B6\u09A8</span> \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AA\u09A5 \u09A6\u09C7\u0996\u09BE\u09B2\u09BE\u09B8\u09A8\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964</>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission card */}
            <div className="group relative rounded-3xl bg-white dark:bg-[#141414] p-8 md:p-10 space-y-6 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 border border-neutral-100 dark:border-neutral-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/5 dark:bg-orange-500/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-4 -right-4 text-[120px] font-black text-orange-500/[0.04] dark:text-orange-500/[0.02] leading-none select-none pointer-events-none">01</div>

              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-orange-500/25">
                  <Target className="h-6 w-6" />
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">01. Our core duty</span>
                <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                  {currentLang === 'en' ? 'Our Core Mission' : '\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AE\u09C2\u09B2 \u09AE\u09BF\u09B6\u09A8'}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                  {currentLang === 'en'
                    ? (settings.aboutMissionEn || 'We don\'t just build apps \u2014 we engineer revenue-generating digital ecosystems. Our mission is to deploy lightning-fast, bulletproof platforms fused with AI-powered automation that eliminates waste, scales revenue, and turns technical complexity into your unfair competitive advantage.')
                    : (settings.aboutMissionBn || '\u0986\u09AE\u09B0\u09BE \u09B6\u09C1\u09A7\u09C1 \u0985\u09CD\u09AF\u09BE\u09AA \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09BF \u09A8\u09BE \u2014 \u0986\u09AE\u09B0\u09BE \u0986\u09AF\u09BC\u09AC\u09C3\u09A6\u09CD\u09A7\u09BF\u0995\u09BE\u09B0\u09C0 \u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u0987\u09A8\u09CD\u09B8\u09C7\u099F\u09B8\u09C7\u09B8\u09A4\u09C7\u09AE \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09BF\u0964 \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AE\u09BF\u09B6\u09A8 \u09B9\u09B2\u09CB \u0985\u09A4\u09BF-\u09A6\u09CD\u09B0\u09C1\u09A4, \u0985\u099F\u09B2 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE \u09A4\u09C8\u09B0\u09BF \u09AF\u09BE \u09AF\u09BE AI-\u099A\u09BE\u09B2\u09BF\u09A4 \u0985\u099F\u09CB\u09AE\u09C7\u09B6\u09A8\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09AE\u09A8\u09CD\u09AD\u09BF\u09A4 \u09AF\u09C7 \u09A5\u09C7\u0995\u09C7 \u0985\u09AA\u099A\u09AF\u09BC \u09A6\u09C2\u09B0 \u0995\u09B0\u09C7, \u0986\u09AF\u09BC \u09AC\u09C3\u09A6\u09CD\u09A7\u09BE\u09AF\u09BC \u09AC\u09BE\u09A1\u09BC\u09BE\u09AF\u09BC \u09A4\u09B0\u09C7 \u09AF\u09C7 \u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u099C\u099F\u09BF\u09B2\u09A4\u09BE\u0995\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09A4\u09BE\u09AE\u09C2\u09B2\u0995 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE\u09AF\u09BC\u09C7 \u09B0\u09C2\u09AA\u09BE\u09A8\u09CD\u09A4\u09B0\u09BF\u09A4 \u0995\u09B0\u09C7\u0964')}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 italic">"We ship revenue, not just code."</span>
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                </div>
              </div>
            </div>

            {/* Vision card */}
            <div className="group relative rounded-3xl bg-white dark:bg-[#141414] p-8 md:p-10 space-y-6 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 border border-neutral-100 dark:border-neutral-800 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/5 dark:bg-orange-500/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-4 -right-4 text-[120px] font-black text-orange-500/[0.04] dark:text-orange-500/[0.02] leading-none select-none pointer-events-none">02</div>

              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-orange-500/25">
                  <Eye className="h-6 w-6" />
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">02. Our futuristic vision</span>
                <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                  {currentLang === 'en' ? 'Our Longterm Vision' : '\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09A6\u09C0\u09B0\u09CD\u0998\u09AE\u09C7\u09AF\u09BC\u09A6\u09C0 \u09AD\u09BF\u09B6\u09A8'}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                  {currentLang === 'en'
                    ? (settings.aboutVisionEn || 'We\'re building the agency that Fortune 500 companies will call when they\'re tired of agencies that deliver pretty designs but zero measurable impact. Our vision: to become the undisputed global gold standard where cutting-edge AI meets flawless craftsmanship \u2014 your ultimate digital growth partner.')
                    : (settings.aboutVisionBn || '\u0986\u09AE\u09B0\u09BE \u09B8\u09C7\u0987 \u098F\u099C\u09C7\u09A8\u09CD\u09B8\u09BF \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u099B\u09BF \u09AF\u09BE\u0995\u09C7 Fortune 500 \u0995\u09CB\u09AE\u09CD\u09AA\u09BE\u09A8\u09BF\u0997\u09C1\u09B2\u09CB \u09A1\u09BE\u0995\u09AC\u09C7 \u09AF\u09A6\u09BF \u09A4\u09BE\u09B0\u09BE \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09A1\u09BF\u099C\u09BE\u0987\u09A8 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AA\u09B0\u09BF\u09AE\u09BE\u09AA\u09AF\u09CB\u0997\u09CD\u09A6 \u09AA\u09CD\u09B0\u09AD\u09BE\u09AC \u09A8\u09BE \u09A6\u09C7\u0995\u09C7 \u098F\u099C\u09C7\u09A8\u09CD\u09B8\u09BF \u09A5\u09C7\u0995\u09C7 \u0995\u09CD\u09B2\u09BE\u09A8\u09CD\u09A4 \u09B9\u09AC\u09C7\u0964 \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09AD\u09BF\u09B6\u09A8: \u0985\u09A4\u09CD\u09AF\u09BE\u09A7\u09C1\u09A8\u09BF\u0995 AI \u098F\u09AC\u0982 \u09A4\u09CD\u09B0\u09C1\u099F\u09BF\u09B9\u09C0\u09A8 \u0995\u09BE\u09B0\u09BF\u0997\u09B0\u09BF \u09AA\u09BE\u09B0\u09A6\u09B0\u09CD\u09B6\u09BF\u09A4\u09BE\u09B0 \u09B8\u09AE\u09A8\u09CD\u09AC\u09AF\u09C7 \u0985\u09AA\u09B0\u09BF\u09B8\u09C0\u09AE \u09AC\u09C8\u09B6\u09CD\u09AC\u09BF\u0995 \u09B8\u09CD\u09AC\u09B0\u09CD\u09A3\u09AE\u09BE\u09A8 \u09B9\u09DF\u09C7 \u0993\u09A0\u09BE \u2014 \u0986\u09AA\u09A8\u09BE\u09B0 \u099A\u09C2\u09A1\u09BE\u09A8\u09CD\u09A4 \u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AC\u09C3\u09A6\u09CD\u09A7\u09BF \u09B8\u09B9\u09AF\u09CB\u0997\u09C0\u0964')}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 italic">"Your competitors fear us. Your users love us."</span>
                <div className="flex items-center space-x-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          03.5. MEET THE MINDS BEHIND NEXT SOLUTION (Leadership Showcase)
         ======================================================== */}
      <section id="about-leadership" className="bg-white dark:bg-[#141414] py-24 relative z-10 overflow-hidden">
        
        {/* Abstract Background Design Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/5 via-teal-400/5 to-purple-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-indigo-50/20 to-sky-50/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-emerald-50/10 to-blue-50/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest border border-blue-150/40">
              <span>👥 {currentLang === 'en' ? 'OUR LEADERSHIP TEAM' : 'আমাদের নেতৃত্ব টিম'}</span>
            </span>
            
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
              {currentLang === 'en' ? 'Meet The Minds Behind Next Solution' : 'নেক্সট সলিউশনের পেছনের চিন্তাশীল মন'}
            </h2> 
          </div>

          {/* Leadership Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leadershipTeam.map((leader) => {
              return (
                <div 
                  key={leader.id}
                  className="flex flex-col sm:flex-row bg-white dark:bg-[#141414] rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-blue-500/10 transition-all duration-500 group relative"
                >
                  {/* Left Side: Introduction */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-orange-400 font-mono">
                          {currentLang === 'en' ? leader.experienceEn : leader.experienceBn}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors duration-300">
                        {currentLang === 'en' ? leader.nameEn : leader.nameBn}
                      </h3>
                      
                      <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider">
                        {currentLang === 'en' ? leader.roleEn : leader.roleBn}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                      {currentLang === 'en' ? leader.bioEn : leader.bioBn}
                    </p>

                    {/* Motto/Quote */}
                    <div className="border-l-2 border-neutral-200 dark:border-neutral-700 pl-3 py-0.5">
                      <p className="text-[11px] italic text-neutral-400 dark:text-neutral-500 font-normal leading-relaxed">
                        "{currentLang === 'en' ? leader.mottoEn : leader.mottoBn}"
                      </p>
                    </div>

                    {/* Socials & Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center space-x-3">
                        <a 
                          href={`mailto:${leader.email}`} 
                          className="p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:bg-neutral-800 hover:text-blue-600 dark:text-orange-400 text-neutral-400 dark:text-neutral-500 transition-all"
                          title={leader.email}
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <a 
                          href={leader.linkedin} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:bg-neutral-800 hover:text-blue-600 dark:text-orange-400 text-neutral-400 dark:text-neutral-500 transition-all"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      <div className="flex items-center space-x-1.5 bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded-lg">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold font-mono text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                          {currentLang === 'en' ? leader.statusEn : leader.statusBn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Image */}
                  <div className="w-full sm:w-2/5 min-h-[220px] sm:min-h-full relative overflow-hidden shrink-0 bg-neutral-50 dark:bg-neutral-900">
                    <img 
                      src={typeof leader.portrait === 'string' ? leader.portrait : leader.portrait.src} 
                      alt={leader.nameEn}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.04] transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle Overlay to blend */}
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l from-transparent via-transparent to-white/10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* ========================================================
          04. CORE VALUES (Bento Grid)
         ======================================================== */}
      <section id="core-values" className="bg-neutral-50/20 py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'FOUNDATIONAL PILLARS' : 'আমাদের মূল ভিত্তিপ্রস্তর'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Eight Core Values We Practice Every Day' : 'আটটি মূল আদর্শ যা আমরা প্রতিনিয়ত মেনে চলি'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 max-w-md mx-auto">
              {currentLang === 'en' 
                ? 'These values direct every pixel we render, every database query we optimize, and every campaign we run.' 
                : 'এই মূল্যবোধগুলো আমাদের প্রতিটি পিক্সেল রেন্ডারিং, প্রতিটি ডাটাবেস অপ্টিমাইজেশন এবং আমাদের কাজের ধারা পরিচালনা করে।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-neutral-100/80 bg-white dark:bg-[#141414] p-6 space-y-4 hover:border-blue-500/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr ${v.color}`}>
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                    {currentLang === 'en' ? v.titleEn : v.titleBn}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-normal">
                    {currentLang === 'en' ? v.descEn : v.descBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          05. WHY CHOOSE US (Interactive Ecosystem)
         ======================================================== */}
      <section id="why-choose-us" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {currentLang === 'en' ? 'THE AGENCY ADVANTAGE' : 'কেন আমরা সেরা'}
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
            {currentLang === 'en' ? 'Our Digital Ecosystem Yields Stronger Performance' : 'আমাদের সমন্বিত কাজের পদ্ধতি শতভাগ প্রবৃদ্ধি নিশ্চিত করে'}
          </h2>
        </div>

        {/* Ecosystem Grid: Circular logo in center or visual block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Side Features Left */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { titleEn: 'Dedicated In-house Squad', titleBn: '১০০% ইন-হাউস স্কোয়াড', descEn: 'We do not hire temporary gig freelancers. Every single developer belongs to our core permanent staff.', descBn: 'আমরা সাময়িক কোনো ফ্রিল্যান্সার নিয়োগ করি না। আমাদের প্রতিটি সদস্য আমাদের স্থায়ী ও নিবেদিতপ্রাণ ইন-হাউস কর্মী।' },
              { titleEn: 'Extreme Load Tuning', titleBn: 'চরম লোড অপ্টিমাইজেশন', descEn: 'We implement advanced Redis caching, index pooling, and optimized static asset compression.', descBn: 'আমরা উন্নত রেডিস ক্যাশিং এবং সর্বোচ্চ ইমেজ কম্প্রেশন ব্যবহারের মাধ্যমে ট্রানজেকশন লোড সামলানো নিশ্চিত করি।' }
            ].map((f, i) => (
              <div key={i} className="border border-neutral-100/70 rounded-2xl p-6 bg-white dark:bg-[#141414] shadow-sm hover:shadow-md transition-shadow">
                <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Check className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">{currentLang === 'en' ? f.titleEn : f.titleBn}</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed mt-1">{currentLang === 'en' ? f.descEn : f.descBn}</p>
              </div>
            ))}
          </div>

          {/* Central Logo Panel */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-blue-600 dark:from-blue-500 to-indigo-600 dark:to-blue-400 text-white p-8 flex flex-col items-center justify-center text-center shadow-2xl relative">
              <div className="absolute inset-2 border-2 border-white/20 rounded-full border-dashed animate-spin [animation-duration:12s]"></div>
              
              <Network className="h-10 w-10 text-white mb-3" />
              <span className="font-sans text-lg font-black tracking-widest uppercase">Next Solution</span>
              <span className="text-[9px] text-blue-100 tracking-wider font-semibold mt-1">THE DIGITAL HQ</span>
            </div>
          </div>

          {/* Side Features Right */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { titleEn: 'AI Services Driven', titleBn: 'এআই সার্ভিস চালিত', descEn: 'By coding proprietary LLM triggers and custom cognitive workflows, we eliminate manual paperwork.', descBn: 'আমাদের তৈরি কাস্টম এলএলএম কোডিং ও ইন্টেলিজেন্ট এপিআই আপনার ব্যবসার পুনরাবৃত্তিমূলক জটিলতা দূর করে দেয়।' },
              { titleEn: 'Direct Developer SLA Hotline', titleBn: 'ডেভেলপার এসএলএ হটলাইন', descEn: 'Direct access to engineering channels on Slack without wading through slow ticket boards.', descBn: 'ঝামেলাহীন সরাসরি সাপোর্ট চ্যানেল। ধীরগতির টিকিট ব্যবস্থার অবসান ঘটিয়ে সরাসরি স্ল্যাকে ডেভেলপারদের অ্যাক্সেস।' }
            ].map((f, i) => (
              <div key={i} className="border border-neutral-100/70 rounded-2xl p-6 bg-white dark:bg-[#141414] shadow-sm hover:shadow-md transition-shadow">
                <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Check className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">{currentLang === 'en' ? f.titleEn : f.titleBn}</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed mt-1">{currentLang === 'en' ? f.descEn : f.descBn}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          06. COMPANY STATISTICS
         ======================================================== */}


      {/* ========================================================
          07. SERVICES ECOSYSTEM (Bento Grid)
         ======================================================== */}
      <section id="services-ecosystem" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {currentLang === 'en' ? 'OUR CAPABILITIES' : 'আমাদের সার্ভিস সমূহ'}
          </span>
          <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
            {currentLang === 'en' ? 'Comprehensive Digital Services Portfolio' : 'সম্পূর্ণ ওয়ান-স্টপ ডিজিটাল সার্ভিস পোর্টফোলিও'}
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-4">
            {[
              { id: 'all', labelEn: 'All Services', labelBn: 'সকল সার্ভিস' },
              { id: 'dev', labelEn: 'Development', labelBn: 'ডেভেলপমেন্ট' },
              { id: 'design', labelEn: 'Design & Branding', labelBn: 'ডিজাইন ও ব্র্যান্ডিং' },
              { id: 'ai', labelEn: 'AI Services', labelBn: 'এআই সার্ভিস' },
              { id: 'marketing', labelEn: 'Marketing & SEO', labelBn: 'মার্কেটিং ও এসইও' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedEcosystemCategory(cat.id as any)}
                className={`text-[10px] font-extrabold uppercase tracking-wider px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                  selectedEcosystemCategory === cat.id 
                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm' 
                    : 'bg-white dark:bg-[#141414] border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:text-white hover:border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {currentLang === 'en' ? cat.labelEn : cat.labelBn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (setTab && service.slug) {
                    sessionStorage.setItem('selected_service_slug', service.slug);
                    setTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group relative cursor-pointer rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-5 hover:border-blue-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-neutral-50 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                    {currentLang === 'en' ? service.nameEn : service.nameBn}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? service.descEn : service.descBn}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                  <div className="flex flex-wrap gap-1">
                    {service.techs.map((tech) => (
                      <span key={tech} className="text-[9px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    <span>{currentLang === 'en' ? service.benefitEn : service.benefitBn}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================
          08. INDUSTRIES WE SERVE
         ======================================================== */}
      <section id="industries-serve" className="bg-neutral-50/20 py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'SECTOR FOCUS' : 'শিল্পক্ষেত্র সমূহ'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Industries Powering Global Businesses' : 'শিল্পক্ষেত্রসমূহ যেখানে আমরা সফলভাবে সেবা দিচ্ছি'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 max-w-md mx-auto">
              {currentLang === 'en' 
                ? 'We configure custom, compliant operational architectures tailored to specific industry demands.' 
                : 'প্রতিটি শিল্পের নির্দিষ্ট চাহিদা অনুযায়ী আমরা সুরক্ষিত ও কাস্টমাইজড ডিজিটাল সিস্টেম সরবরাহ করি।'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industriesList.map((ind, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 space-y-4 hover:border-blue-500/15 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ind.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wide">
                    {currentLang === 'en' ? ind.nameEn : ind.nameBn}
                  </h4>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? ind.descEn : ind.descBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          09. OUR PROCESS (Interactive Timeline)
         ======================================================== */}
      <section id="our-process-timeline" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'OUR IMPLEMENTATION WORKFLOW' : 'আমাদের কাজের ধাপসমূহ'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'How We Power Your Growth Cycle' : 'কীভাবে আমরা প্রজেক্ট বাস্তবায়ন করি'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
              {currentLang === 'en' 
                ? 'From raw discovery grids to high-care SLA database backup maintenance. Scroll through our transparent process steps.' 
                : 'পরিকল্পনা থেকে শুরু করে কোডিং ও লঞ্চ পরবর্তী সার্বক্ষণিক ব্যাকআপ এবং সাপোর্ট। দেখে নিন আমাদের কাজের চমৎকার ধাপসমূহ।'}
            </p>

            <div className="space-y-1 bg-neutral-50 dark:bg-neutral-900 p-2 rounded-2xl border border-neutral-100/50">
              {processSteps.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeProcessStep === idx 
                      ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-sm border border-neutral-100 dark:border-neutral-800' 
                      : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:text-white'
                  }`}
                >
                  Step {p.step}: {currentLang === 'en' ? p.titleEn.split(' ')[0] : p.titleBn.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProcessStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-blue-50/5 dark:bg-blue-500/50 rounded-bl-full flex items-center justify-end pr-6 pt-2 text-4xl font-black text-blue-100">
                  {processSteps[activeProcessStep].step}
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100/50">
                    Phase {processSteps[activeProcessStep].step}
                  </span>

                  <h3 className="font-sans text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                    {currentLang === 'en' ? processSteps[activeProcessStep].titleEn : processSteps[activeProcessStep].titleBn}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? processSteps[activeProcessStep].descEn : processSteps[activeProcessStep].descBn}
                  </p>
                </div>

                <div className="pt-8 mt-8 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                  <span className="flex items-center space-x-1.5 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    <span>Quality Audited Milestone</span>
                  </span>
                  <span>Direct Team Collaboration</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ========================================================
          10. TECHNOLOGIES POWERING NEXT SOLUTION
         ======================================================== */}
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

     

      
      {/* ========================================================
          13. SUCCESS STORIES (Challenge, Solution, Results)
         ======================================================== */}
      <section id="success-stories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {currentLang === 'en' ? 'MEASURABLE BUSINESS OUTCOMES' : 'সাফল্যের বিবরণী'}
          </span>
          <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
            {currentLang === 'en' ? 'Our Digital Success Stories With Clear Numbers' : 'বাস্তব সংখ্যার মাধ্যমে আমাদের সফলতার প্রমাণ'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {successStories.map((story, i) => (
            <div key={i} className="border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{story.company}</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{story.metric}</span>
                </div>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                  {currentLang === 'en' ? story.metricDescEn : story.metricDescBn}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-50 dark:border-neutral-800">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 dark:text-red-400">The Challenge</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? story.challengeEn : story.challengeBn}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">Our Solution</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? story.solutionEn : story.solutionBn}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">The Result</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? story.resultsEn : story.resultsBn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          15. GLOBAL PRESENCE (Interactive Map Pin Representation)
         ======================================================== */}
      <section id="global-presence" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'GLOBAL NETWORK' : 'বিশ্বব্যাপী কার্যক্রম'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Serving Clients Globally via Remote Systems' : 'রিমোট কার্যক্রমের মাধ্যমে বিশ্বজুড়ে সফল সেবা'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
              {currentLang === 'en' 
                ? 'We deploy server architectures and coordinate localized development teams from North America to Southeast Asia. Our virtual staging frameworks enable you to check progress seamlessly from any time zone.' 
                : 'আমরা উত্তর আমেরিকা থেকে দক্ষিণ-পূর্ব এশিয়া পর্যন্ত বিস্তৃত টিম পরিচালনা করছি। আমাদের স্বয়ংক্রিয় প্রজেক্ট প্রিভিউ আপনাকে যেকোনো টাইম জোন থেকে সরাসরি কাজের অগ্রগতি দেখার সুবিধা দেয়।'}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-neutral-100/75 p-4 rounded-xl">
                <span className="block text-xl font-black text-blue-600 dark:text-blue-400">12+</span>
                <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">{currentLang === 'en' ? 'Countries Served' : 'সেবাপ্রাপ্ত দেশ'}</span>
              </div>
              <div className="border border-neutral-100/75 p-4 rounded-xl">
                <span className="block text-xl font-black text-blue-600 dark:text-blue-400">100%</span>
                <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">{currentLang === 'en' ? 'Remote Delivery' : 'রিমোট কোলাবরেশন'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Elegant luxury minimalist map grid */}
            <div className="relative w-full max-w-md aspect-video bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6 flex flex-col justify-between shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-500">NEXT_SOLUTION_CORE_NODES</span>
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin [animation-duration:20s]" />
              </div>

              {/* Simulated Cities pins */}
              <div className="relative h-24 w-full">
                <div className="absolute top-4 left-[20%] flex items-center space-x-1.5 animate-pulse">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <span className="text-[9px] font-bold text-neutral-800 dark:text-neutral-100">New York</span>
                </div>
                <div className="absolute bottom-6 left-[45%] flex items-center space-x-1.5 animate-pulse [animation-delay:0.5s]">
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                  <span className="text-[9px] font-bold text-neutral-800 dark:text-neutral-100">London</span>
                </div>
                <div className="absolute top-10 right-[15%] flex items-center space-x-1.5 animate-pulse [animation-delay:1s]">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <span className="text-[9px] font-bold text-neutral-800 dark:text-neutral-100">Dhaka HQ</span>
                </div>
              </div>

              <div className="flex justify-between items-end relative z-10 text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">
                <span>LAT: 23.8103° N</span>
                <span>LON: 90.4125° E</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          17. FINAL CTA
         ======================================================== */}
      <section id="about-final-cta" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="rounded-3xl bg-neutral-950 text-white p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10"></div>
          
          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-yellow-300" />
              <span>{currentLang === 'en' ? "LET'S WORK TOGETHER" : 'আসুন প্রজেক্ট শুরু করি'}</span>
            </span>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-6xl font-black leading-tight">
              {currentLang === 'en' ? "Let's Build Your Next Big Success Story" : 'আসুন একসাথে আপনার পরবর্তী বড় সফলতাটি তৈরি করি'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 max-w-md mx-auto leading-relaxed font-normal">
              {currentLang === 'en' 
                ? 'Whether you need a single custom web app or complete end-to-end digital transformation, Next Solution is ready to become your ultimate growth ally.' 
                : 'আপনার একটি কাস্টম ওয়েব অ্যাপ্লিকেশন বা সম্পূর্ণ ডিজিটাল ট্রান্সফরমেশন যাই প্রয়োজন হোক না কেন, নেক্সট সলিউশন আপনাকে সাহায্য করতে প্রস্তুত।'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
            <button
              id="about-final-btn-project"
              onClick={() => navigateToTab('contact')}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-8 py-4 transition shadow-md hover:scale-[1.02] cursor-pointer"
            >
              {currentLang === 'en' ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন'}
            </button>
            <button
              id="about-final-btn-consultation"
              onClick={() => navigateToTab('contact')}
              className="rounded-xl bg-white dark:bg-[#141414] hover:bg-neutral-100 dark:bg-neutral-800 text-neutral-950 text-xs sm:text-sm font-bold px-8 py-4 transition shadow-md hover:scale-[1.02] cursor-pointer"
            >
              {currentLang === 'en' ? 'Book a Free Consultation' : 'ফ্রি পরামর্শ নিন'}
            </button>
            <button
              id="about-final-btn-quote"
              onClick={() => navigateToTab('contact')}
              className="rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs sm:text-sm font-bold px-8 py-4 transition shadow-md hover:scale-[1.02] cursor-pointer"
            >
              {currentLang === 'en' ? 'Request Custom Quote' : 'বাজেট হিসাব করুন'}
            </button>
          </div>
        </div>
      </section>

    </section>
  );
}
