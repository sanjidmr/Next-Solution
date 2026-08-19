"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, Eye, ShieldCheck, Sparkles, Award, ArrowRight, ArrowUpRight, 
  ChevronDown, ChevronUp, Heart, Smile, Users, Palette, TrendingUp, 
  Lightbulb, CheckCircle2, Globe, Clock, Code2, Database, Terminal, 
  Cpu, Star, Zap, Check, MessageSquare, Quote, Server, Layers,
  MapPin, BookOpen, Laptop, Network, Rocket, FileText, Share2, Compass,
  DollarSign, Activity, Settings as SettingsIcon, BrainCircuit, Search, Play,
  Mail, Linkedin, Smartphone
} from 'lucide-react';
import { translations } from '@/data/translations';
import { getSettings, getTestimonials, getFAQs } from '@/lib/db';

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
  const faqs = getFAQs();

  const leadershipTeam = useMemo(() => [
    {
      id: 'ceo',
      nameEn: 'Mushfiqur Rahman Sanjid',
      nameBn: 'মুশফিকুর রহমান সানজিদ',
      roleEn: 'Founder & CEO',
      roleBn: 'প্রতিষ্ঠাতা ও সিইও',
      portrait: sanjidImage ,
      bioEn: 'Visionary technologist driving the mission of Next Solution. Specializing in high-scale web sites, predictive Web devolopment pipelines, and robust enterprise strategies.',
      bioBn: 'নেক্সট সলিউশনের রূপকল্প পরিচালনাকারী স্বপ্নদর্শী টেকনোলজিস্ট ও প্রতিষ্ঠাতা। তিনি হাই-স্কেল ক্লাউড সিস্টেম, প্রেডিক্টিভ এআই অটোমেশন পাইপলাইন এবং শক্তিশালী ব্যবসায়িক কৌশল বাস্তবায়নে পারদর্শী।',
      experienceEn: '4+ Years of Tech Experience',
      experienceBn: '4+ বছরের প্রযুক্তি অভিজ্ঞতা',
      mottoEn: 'Our mission is to build digital solutions that create lasting business impact.',
      mottoBn: 'এমন ডিজিটাল সলিউশন তৈরি করা যা স্থায়ী ব্যবসায়িক প্রভাব ফেলে।',
      skillsEn: ['Business Strategy', 'Technology', 'Web devolopment'],
      skillsBn: ['বিজনেস স্ট্র্যাটেজি', 'প্রযুক্তি', 'এআই অটোমেশন'],
      email: 'mushfiqurrahmansanjid@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Available for Advisory',
      statusBn: 'পরামর্শের জন্য উপলব্ধ'
    },
    {
      id: 'co-founder',
      nameEn: 'Saad ibne bashar',
      nameBn: 'সাদ ইবনে বাসার',
      roleEn: 'Co-Founder & Chief Architect',
      roleBn: 'সহ-প্রতিষ্ঠাতা ও প্রধান আর্কিটেক্ট',
      portrait: sadi,
      bioEn: 'Spearheading the core marcketing division. Obsessed with fb ads buissness grouth , marcketing stratigy, and sub-millisecond response times.',
      bioBn: 'আমাদের মূল ইঞ্জিনিয়ারিং বিভাগের প্রধান। তিনি উচ্চ-ক্ষমতাসম্পন্ন রিঅ্যাক্ট ডিজাইন টোকেন, ডাটাবেস স্কিমা সুরক্ষা এবং সাব-মিলি-সেকেন্ড রেসপন্স টাইম অর্জনে নিবেদিত।',
      experienceEn: '4+ Years in marcketing',
      experienceBn: '৮+ বছরের ফুলস্ট্যাক অভিজ্ঞতা',
      mottoEn: 'Innovation begins with understanding human experience.',
      mottoBn: 'উদ্ভাবনের সূচনা হয় মানুষের অভিজ্ঞতা অনুধাবনের মধ্য দিয়ে।',
      skillsEn: ['Digital marcketing', 'graphic design', 'Branding'],
      skillsBn: ['ওয়েব ডেভেলপমেন্ট', 'ইউআই/ইউএক্স ডিজাইন', 'ব্র্যান্ডিং'],
      email: 'saadibnebashar@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Designing Solutions',
      statusBn: 'সলিউশন ডিজাইনে ব্যস্ত'
    },
    {
      id: 'md',
      nameEn: 'Al Amin Jisan',
      nameBn: 'আল আমিন জিসান',
      roleEn: 'Managing Director',
      roleBn: 'ম্যানেজিং ডিরেক্টর',
      portrait: jisan,
      bioEn: 'Overseeing company growth, daily operations, and partner alignment. Committed to delivering seamless execution, transparency, and operational excellence.',
      bioBn: 'কোম্পানির প্রবৃদ্ধি, দৈনিক অপারেশন এবং অংশীদারদের সমন্বয় তদারকি করছেন। সকল প্রজেক্টে স্বচ্ছতা, নিখুঁত বাস্তবায়ন এবং কার্যক্ষমতার উৎকর্ষতা বজায় রাখতে তিনি প্রতিজ্ঞ।',
      experienceEn: '4+ Years of Operations',
      experienceBn: '৭+ বছরের অপারেশনস অভিজ্ঞতা',
      mottoEn: 'We don\'t just complete projects—we build long-term trust.',
      mottoBn: 'আমরা শুধু প্রজেক্ট সম্পন্ন করি না—আমরা দীর্ঘমেয়াদী বিশ্বাস তৈরি করি।',
      skillsEn: ['Project Management', 'Business Growth', 'marcketing'],
      skillsBn: ['প্রজেক্ট ম্যানেজমেন্ট', 'বিজনেস গ্রোথ', 'নেতৃত্ব'],
      email: 'alaminjisan@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Consulting Partners',
      statusBn: 'অংশীদারদের সাথে কনসাল্টিংয়ে ব্যস্ত'
    },
    {
      id: 'gm',
      nameEn: 'Mustafizur Rahman',
      nameBn: 'মুস্তাফিজুর রহমান',
      roleEn: 'General Manager',
      roleBn: 'জেনারেল ম্যানেজার',
      portrait: mustafiz,
      bioEn: 'Coordinating cross-functional squads to ensure pixel-perfect design standards, successful milestone tracking, and high-impact marketing results.',
      bioBn: 'ক্রস-ফাংশনাল স্কোয়াড সমন্বয় করে পিক্সেল-পারফেক্ট ডিজাইনের মানদণ্ড বজায় রাখা, মাইলস্টোন ট্র্যাকিং এবং উচ্চ-প্রভাবশালী মার্কেটিং ফলাফল নিশ্চিত করছেন।',
      experienceEn: '4+ Years of Leadership',
      experienceBn: '৬+ বছরের লিডারশিপ অভিজ্ঞতা',
      mottoEn: 'Every pixel, every strategy, every decision should drive ROI.',
      mottoBn: 'প্রতিটি পিক্সেল, প্রতিটি স্ট্র্যাটেজি এবং প্রতিটি সিদ্ধান্ত আরও প্রবৃদ্ধি বয়ে আনবে।',
      skillsEn: ['SEO', 'Digital Marketing', 'Innovation'],
      skillsBn: ['এসইও', 'ডিজিটাল মার্কেটিং', 'ইনোভেশন'],
      email: 'mustafiz@gmail.com',
      linkedin: 'https://linkedin.com/',
      statusEn: 'Managing Milestones',
      statusBn: 'মাইলস্টোন পরিচালনায় ব্যস্ত'
    }
  ], []);

  const deliverySquad = useMemo(() => [
    { 
      nameEn: 'Sabbir Ahmed', 
      nameBn: 'সাব্বির আহমেদ', 
      roleEn: 'Senior React Developer', 
      roleBn: 'সিনিয়র রিঅ্যাক্ট ডেভেলপার', 
      deptEn: 'Development', 
      deptBn: 'ডেভেলপমেন্ট',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      descEn: 'Expert in crafting ultra-fast interactive React applications and state performance optimization.',
      descBn: 'অতি-দ্রুত ইন্টারেক্টিভ রিঅ্যাক্ট অ্যাপ্লিকেশন এবং স্টেট পারফরম্যান্স অপ্টিমাইজেশনে পারদর্শী।'
    },
    { 
      nameEn: 'Fahmida Riya', 
      nameBn: 'ফাহমিদা রিয়া', 
      roleEn: 'Creative Art Director', 
      roleBn: 'সৃজনশীল আর্ট ডিরেক্টর', 
      deptEn: 'Design', 
      deptBn: 'ডিজাইন',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      descEn: 'Crafting premium visual styles, design systems, and responsive layouts that convert users.',
      descBn: 'প্রিমিয়াম ভিজ্যুয়াল স্টাইল, ডিজাইন সিস্টেম এবং আকর্ষণীয় রেসপনসিভ লেআউট তৈরিতে অভিজ্ঞ।'
    },
    { 
      nameEn: 'Asif Zaman', 
      nameBn: 'আসিফ জামান', 
      roleEn: 'AI Integration Specialist', 
      roleBn: 'এআই ইন্টিগ্রেশন স্পেশালিস্ট', 
      deptEn: 'AI & Automations', 
      deptBn: 'এআই ও অটোমেশন',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      descEn: 'Building modern cognitive agent structures, custom LLM pipelines, and automated integrations.',
      descBn: 'আধুনিক কগনিটিভ এজেন্ট স্ট্রাকচার, কাস্টম এলএলএম পাইপলাইন এবং স্বয়ংক্রিয় এআই ইন্টিগ্রেশন বিল্ডার।'
    },
    { 
      nameEn: 'Farhana Parveen', 
      nameBn: 'ফারহানা পারভীন', 
      roleEn: 'Lead UX Copywriter', 
      roleBn: 'লিড ইউএক্স কপিরাইটার', 
      deptEn: 'Content Strategy', 
      deptBn: 'কনটেন্ট স্ট্র্যাটেজি',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      descEn: 'Structuring strategic high-conversion copy, messaging hierarchies, and content frameworks.',
      descBn: 'হাই-কনভার্সন কপিরাইটিং, স্ট্র্যাটেজিক মেসেজিং এবং আকর্ষণীয় ব্র্যান্ড কনটেন্ট তৈরিতে পারদর্শী।'
    },
    { 
      nameEn: 'Imran Khan', 
      nameBn: 'ইমরান খান', 
      roleEn: 'Senior SEO Strategist', 
      roleBn: 'সিনিয়র এসইও স্ট্র্যাটেজিস্ট', 
      deptEn: 'Growth & SEO', 
      deptBn: 'এসইও ও প্রবৃদ্ধি',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      descEn: 'Driving exponential organic growth through advanced ranking setups and semantic content strategies.',
      descBn: 'অ্যাডভান্সড র‌্যাঙ্কিং সেটআপ এবং সার্চ ইঞ্জিন ফ্রেন্ডলি কনটেন্ট স্ট্র্যাটেজির মাধ্যমে অর্গানিক প্রবৃদ্ধি নিশ্চিতকারী।'
    },
    { 
      nameEn: 'Zeeshan Ali', 
      nameBn: 'জিশান আলী', 
      roleEn: 'Cloud Infrastructure Architect', 
      roleBn: 'ক্লাউড ইনফ্রাস্ট্রাকচার আর্কিটেক্ট', 
      deptEn: 'Cloud & DevOps', 
      deptBn: 'ক্লাউড ও ডেভঅপ্স',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      descEn: 'Deploying robust serverless cloud structures and high-availability container network channels.',
      descBn: 'রোবস্ট সার্ভারলেস ক্লাউড আর্কিটেকচার এবং হাই-অ্যাভেলেবিলিটি কনটেইনার নেটওয়ার্ক চ্যানেল পরিচালনায় পারদর্শী।'
    }
  ], []);

  // Selected Story milestone
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  
  // Selected Ecosystem Category
  const [selectedEcosystemCategory, setSelectedEcosystemCategory] = useState<'all' | 'dev' | 'design' | 'ai' | 'marketing'>('all');

  // Selected Squad Category for Meet Our Team filtering
  const [selectedSquadCategory, setSelectedSquadCategory] = useState<string>('all');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Active Process Step state
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Hero Rotator Index State for premium word rotation
  const [heroRotatorIndex, setHeroRotatorIndex] = useState(0);

  // Hero interactive showcase active tab state ('code' | 'canvas' | 'ai')
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'code' | 'canvas' | 'ai'>('code');

  // Interactive Showcase Custom States
  const [optimizationStage, setOptimizationStage] = useState<'bloated' | 'optimizing' | 'optimized'>('bloated');
  const [vibeTheme, setVibeTheme] = useState<'cyber' | 'peak' | 'rose'>('cyber');
  const [cornerRadius, setCornerRadius] = useState<number>(16);
  const [glowIntensity, setGlowIntensity] = useState<number>(40);
  const [aiStep, setAiStep] = useState<'idle' | 'running' | 'completed'>('idle');
  const [aiLogs, setAiLogs] = useState<string[]>([]);

  const triggerOptimization = () => {
    if (optimizationStage === 'optimized') {
      setOptimizationStage('bloated');
      return;
    }
    setOptimizationStage('optimizing');
    setTimeout(() => {
      setOptimizationStage('optimized');
    }, 1500);
  };

  const runAiSimulation = () => {
    if (aiStep === 'running') return;
    if (aiStep === 'completed') {
      setAiStep('idle');
      setAiLogs([]);
      return;
    }
    setAiStep('running');
    setAiLogs([]);
    
    const logs = [
      currentLang === 'en' ? "⚡ Initiating Gemini 2.5 Flash secure gateway..." : "⚡ জেমিনি ২.৫ ফ্ল্যাশ সিকিউর গেটওয়ে চালু হচ্ছে...",
      currentLang === 'en' ? "🔍 Querying search impressions & visual conversion gaps..." : "🔍 সার্চ ইম্প্রেশন ও ভিজ্যুয়াল কনভার্সন গ্যাপ বিশ্লেষণ করা হচ্ছে...",
      currentLang === 'en' ? "📈 Generating 120 custom optimized viewport assets..." : "📈 ১২০টি কাস্টম অপ্টিমাইজড ভিউপোর্ট অ্যাসেট তৈরি হচ্ছে...",
      currentLang === 'en' ? "🔄 Adapting database index profiles for ultra-fast TTFB..." : "🔄 আল্ট্রা-ফাস্ট রেসপন্স টাইমের জন্য ডাটাবেস ইনডেক্স ঠিক করা হচ্ছে...",
      currentLang === 'en' ? "🚀 AI Engine Core online! Predicted Conversion Lift: +240%" : "🚀 এআই ইঞ্জিন কোর অনলাইন! সম্ভাব্য কনভার্সন বৃদ্ধি: +২৪০%"
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logs.length) {
        const msg = logs[current] as string;
        setAiLogs(prev => {
          if (prev.includes(msg)) return prev;
          return [...prev, msg];
        });
        current++;
      } else {
        clearInterval(interval);
        setAiStep('completed');
      }
    }, 600);
  };

  useEffect(() => {
    const rotatorInterval = setInterval(() => {
      setHeroRotatorIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(rotatorInterval);
  }, []);

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
    year: '2022',
    titleEn: 'The Vision Was Born',
    titleBn: 'স্বপ্নের সূচনা',
    descEn: 'In 2022, Next Solution began as a vision driven by a simple belief: every business deserves a modern digital presence built with quality, transparency, and long-term value. We invested our time in learning advanced technologies, studying global design standards, and building a strong foundation before offering services professionally.',
    descBn: '২০২২ সালে একটি স্পষ্ট লক্ষ্য নিয়ে নেক্সট সলিউশনের যাত্রা শুরু হয়—প্রতিটি ব্যবসার জন্য মানসম্মত, আধুনিক এবং দীর্ঘমেয়াদী মূল্য প্রদানকারী ডিজিটাল সমাধান তৈরি করা। আমরা প্রথম বছরটি উন্নত প্রযুক্তি শেখা, আন্তর্জাতিক মানের ডিজাইন বিশ্লেষণ এবং শক্ত ভিত্তি তৈরিতে ব্যয় করি।',
    metric: 'Vision & Foundation',
    color: 'from-blue-600 dark:from-blue-500 to-indigo-600 dark:to-blue-400'
  },
  {
    year: '2023',
    titleEn: 'Building Skills & Experience',
    titleBn: 'দক্ষতা ও অভিজ্ঞতা গঠন',
    descEn: 'Throughout 2023, we focused on mastering modern web technologies, UI/UX principles, and scalable development practices. We completed numerous practice projects, refined our workflow, and established quality standards that would shape every future client project.',
    descBn: '২০২৩ সালে আমরা আধুনিক ওয়েব প্রযুক্তি, UI/UX ডিজাইন এবং স্কেলেবল ডেভেলপমেন্ট পদ্ধতিতে নিজেদের দক্ষ করে তুলি। অসংখ্য প্র্যাকটিস প্রজেক্ট সম্পন্ন করে এমন একটি মানসম্মত ওয়ার্কফ্লো তৈরি করি যা ভবিষ্যতের প্রতিটি ক্লায়েন্ট প্রজেক্টের ভিত্তি হয়ে ওঠে।',
    metric: 'Continuous Learning',
    color: 'from-indigo-600 dark:from-blue-500 to-violet-600'
  },
  {
    year: '2024',
    titleEn: 'From Vision to Reality',
    titleBn: 'স্বপ্ন থেকে বাস্তবতা',
    descEn: 'In 2024, Next Solution officially started delivering professional digital solutions. We began working with businesses to create modern websites, user-friendly interfaces, and reliable digital experiences focused on performance, design quality, and business growth.',
    descBn: '২০২৪ সালে নেক্সট সলিউশন আনুষ্ঠানিকভাবে পেশাদার ডিজিটাল সেবা প্রদান শুরু করে। আধুনিক ওয়েবসাইট, আকর্ষণীয় ইউজার ইন্টারফেস এবং ব্যবসার প্রবৃদ্ধিকে কেন্দ্র করে নির্ভরযোগ্য ডিজিটাল সমাধান তৈরি করতে আমরা বিভিন্ন প্রতিষ্ঠানের সাথে কাজ শুরু করি।',
    metric: 'Professional Launch',
    color: 'from-violet-600 to-purple-600'
  },
  {
    year: '2025',
    titleEn: 'Expanding Our Digital Services',
    titleBn: 'সেবার পরিধি সম্প্রসারণ',
    descEn: 'As our experience grew, we expanded beyond web development into UI/UX design, branding, SEO, automation, and AI-powered digital solutions. Our mission became helping businesses build a complete digital ecosystem rather than just a website.',
    descBn: 'অভিজ্ঞতার সাথে সাথে আমরা ওয়েব ডেভেলপমেন্টের পাশাপাশি UI/UX ডিজাইন, ব্র্যান্ডিং, SEO, অটোমেশন এবং AI-ভিত্তিক ডিজিটাল সমাধান যুক্ত করি। আমাদের লক্ষ্য শুধু একটি ওয়েবসাইট নয়, বরং ব্যবসার জন্য একটি পূর্ণাঙ্গ ডিজিটাল ইকোসিস্টেম তৈরি করা।',
    metric: 'Digital Growth',
    color: 'from-purple-600 to-pink-600'
  },
  {
    year: '2026',
    titleEn: 'Growing With Every Partnership',
    titleBn: 'প্রতিটি অংশীদারিত্বে নতুন অগ্রযাত্রা',
    descEn: 'Today, Next Solution continues to grow by delivering high-quality digital experiences with transparency, innovation, and long-term support. Every project is treated as a partnership where our success is measured by the success of our clients. We are committed to becoming a trusted long-term digital partner for businesses worldwide.',
    descBn: 'আজ নেক্সট সলিউশন স্বচ্ছতা, উদ্ভাবন এবং দীর্ঘমেয়াদী সহযোগিতার মাধ্যমে প্রতিটি ক্লায়েন্টের জন্য মানসম্মত ডিজিটাল অভিজ্ঞতা তৈরি করে চলেছে। আমরা প্রতিটি প্রজেক্টকে একটি দীর্ঘমেয়াদী অংশীদারিত্ব হিসেবে দেখি, যেখানে আমাদের সফলতা নির্ভর করে ক্লায়েন্টের সফলতার উপর। বিশ্বব্যাপী ব্যবসার জন্য একটি বিশ্বস্ত ডিজিটাল পার্টনার হওয়াই আমাদের লক্ষ্য।',
    metric: 'Growing Together',
    color: 'from-pink-600 to-blue-600'
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
      id: 'mobile-apps',
      category: 'dev',
      icon: Smartphone,
      nameEn: 'Mobile App',
      nameBn: 'মোবাইল অ্যাপ্লিকেশন',
      descEn: 'Native iOS & Android apps with Flutter & React Native — seamless UX, offline-first architecture, and App Store ready.',
      descBn: 'ফ্লাটার ও রিঅ্যাক্ট নেটিভ দিয়ে নেটিভ আইওএস অ্যান্ড্রয়েড অ্যাপ — স্মুথ ইউএক্স, অফলাইন-ফার্সট আর্কিটেকচার, অ্যাপ স্টোর রেডি।',
      techs: ['Flutter', 'React Native', 'Dart', 'Swift', 'Kotlin'],
      benefitEn: '60fps smooth native performance',
      benefitBn: '৬০এফপিএস নেটিভ পারফরম্যান্স'
    },
    {
      id: 'ui-ux',
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
      category: 'ai',
      icon: Cpu,
      nameEn: 'AI Automation',
      nameBn: 'এআই অটোমেশন',
      descEn: 'Automate repetitive back-office operations, sync data vectors, and streamline workflows with intelligent triggers.',
      descBn: 'ব্যবসায়িক পুনরাবৃত্তিমূলক কাজ দূরীকরণ এবং স্বয়ংক্রিয় এআই সিস্টেম সংস্থাপন।',
      techs: ['n8n', 'Make.com', 'Zapier', 'APIs'],
      benefitEn: '70% manual labor hours saved',
      benefitBn: '৭০% পর্যন্ত সময় ও শ্রম সাশ্রয়'
    },
    {
      id: 'ai-agents',
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
      titleEn: 'Mobile App Engineering',
      titleBn: 'মোবাইল অ্যাপ ইঞ্জিনিয়ারিং',
      descEn: 'Seamless native experiences published across iOS and Android app stores.',
      descBn: 'আইওএস এবং অ্যান্ড্রয়েডের জন্য হাই-কনভার্সন ও শতভাগ নির্ভরযোগ্য মোবাইল অ্যাপ্লিকেশন।',
      direction: 'left',
      techs: [
        { name: 'React Native', tagEn: 'Hybrid Core', tagBn: 'হাইব্রিড অ্যাপ', logo: 'react' },
        { name: 'Flutter', tagEn: 'Native Engines', tagBn: 'নেটিভ ইঞ্জিন', logo: 'flutter' },
        { name: 'Swift', tagEn: 'Native iOS', tagBn: 'নেটিভ আইওএস', logo: 'swift' },
        { name: 'Kotlin', tagEn: 'Native Android', tagBn: 'নেটিভ অ্যান্ড্রয়েড', logo: 'kotlin' },
        { name: 'Android SDK', tagEn: 'OS Services', tagBn: 'অ্যান্ড্রয়েড এসডিকে', logo: 'android' },
        { name: 'iOS SDK', tagEn: 'Core Apple Services', tagBn: 'অ্যাপল এসডিকে', logo: 'ios' },
        { name: 'Expo', tagEn: 'Fast Ecosystem', tagBn: 'এক্সপো ইকোসিস্টেম', logo: 'expo' }
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
      titleEn: 'AI Automations & Agents',
      titleBn: 'এআই অটোমেশন ও এজেন্ট',
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

  // Awards/Badges Wall Data
  const awardsList = useMemo(() => [
    { title: '99+ Lighthouse Core Web Vitals Audited', issuer: 'Performance Excellence Badge' },
    { title: 'Google Certified Professional Cloud Architects', issuer: 'Enterprise Deployment Standard' },
    { title: 'Typesafe Certified React & Node.js Engineers', issuer: 'Absolute Code Integrity' },
    { title: 'Awwwards Honoree Digital Design Standards', issuer: 'Elite UI/UX Aesthetics' },
    { title: 'Verified Shopify & WordPress Partner Devs', issuer: 'Secure E-commerce Deployments' },
    { title: 'Top-Rated Digital Growth Agency Award', issuer: 'Client ROI Excellence' }
  ], []);

  // Community Contribution Data
  const communityContributions = useMemo(() => [
    {
      titleEn: 'Open Source Code Contributions',
      titleBn: 'ওপেন সোর্স কোড কন্ট্রিবিউশন',
      descEn: 'We publish free Next.js layout blueprints and custom database utility scripts that help over 15,000 developers worldwide build products faster.',
      descBn: 'আমরা বিশ্বব্যাপী ১৫,০০০-এর বেশি ডেভেলপারদের জন্য বিনামূল্যে নেক্সট.জেএস লেআউট ব্লুপ্রিন্ট এবং ডাটাবেস ইউটিলিটি স্ক্রিপ্ট প্রকাশ করেছি।',
      metric: '1.2K+ GitHub Stars'
    },
    {
      titleEn: 'Free Advanced Tech Education',
      titleBn: 'বিনামূল্যে উন্নত প্রযুক্তি শিক্ষা',
      descEn: 'We host monthly technical workshops and codelabs in Dhaka, teaching local students typescript structures, serverless paradigms, and AI model deployments.',
      descBn: 'আমরা ঢাকায় প্রতি মাসে টেকনিক্যাল কর্মশালা আয়োজন করে শিক্ষার্থীদের টাইপস্ক্রিপ্ট, সার্ভারলেস টেকনোলজি এবং এআই মডেল ইন্টিগ্রেশন শেখাই।',
      metric: '500+ Students Mentored'
    },
    {
      titleEn: 'Pro-Bono NGO Digitalization',
      titleBn: 'স্বেচ্ছাসেবী আইটি সহায়তা',
      descEn: 'Every quarter, Next Solution builds and deploys high-quality charity tracking portals for local non-profit organizations completely free of cost.',
      descBn: 'প্রতি তিন মাস অন্তর আমরা স্থানীয় অলাভজনক বা সামাজিক সংস্থাকে সম্পূর্ণ বিনামূল্যে চমৎকার চ্যারিটি ট্র্যাকিং পোর্টাল তৈরি করে দিই।',
      metric: '4 NGO Portals Launched'
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
      nameEn: 'AI & Automation',
      nameBn: 'এআই ও অটোমেশন',
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
    <section id="about-page" className="bg-white dark:bg-[#0F0E0C] dark:bg-gradient-to-b dark:from-[#12100D] dark:via-[#0F0E0C] dark:to-[#0A0908] text-neutral-900 dark:text-white overflow-hidden relative selection:bg-blue-500 dark:bg-blue-500 selection:text-white">
      
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
          01. HERO STORY - PREMIUM AWARD-WINNING HERO
         ======================================================== */}
      <section id="about-hero" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-20 relative z-10 overflow-visible">
        
        {/* Decorative Grid and Ambient Lights */}
        <div className="absolute inset-0 -top-20 -z-10 h-[120%] w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-blue-400/10 via-indigo-400/10 to-violet-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-5000" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-teal-400/10 via-emerald-400/10 to-blue-400/10 rounded-full blur-[90px] pointer-events-none animate-pulse duration-7000" />

        {/* Breadcrumb row */}
        <nav className="flex items-center space-x-2 text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-6">
          <span className="hover:text-blue-600 dark:text-blue-400 transition cursor-pointer" onClick={() => navigateToTab('home')}>
            {currentLang === 'en' ? 'Home' : 'হোম'}
          </span>
          <span className="text-neutral-300 dark:text-neutral-600">/</span>
          <span className="text-neutral-900 dark:text-white">
            {currentLang === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side (45% on desktop) */}
          <div className="lg:col-span-5 space-y-8 text-center sm:text-left relative">
            
            {/* Small live-ping badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 text-[10px] sm:text-xs font-black uppercase tracking-widest justify-center sm:justify-start shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{currentLang === 'en' ? '🟢 ABOUT NEXT SOLUTION' : '🟢 নেক্সট সলিউশন সম্পর্কে'}</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-3xl sm:text-5xl lg:text-[4rem] font-black tracking-tight text-neutral-950 leading-[1.08]">
              {currentLang === 'en' ? (
                <>
                  More Than A<br className="hidden sm:inline" /> Digital Agency.<br />
                  We Are Your <br />
                  <span className="relative inline-block mt-1">
                    <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 dark:from-blue-500 via-violet-600 to-pink-600 opacity-10 blur-md"></span>
                    <span className="relative bg-gradient-to-r from-blue-600 dark:from-blue-500 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                      Digital Growth Partner.
                    </span>
                  </span>
                </>
              ) : (
                <>
                  একটি ডিজিটাল এজেন্সির<br /> চেয়েও অনেক বেশি।<br />
                  আমরা আপনার <br />
                  <span className="relative inline-block mt-1">
                    <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 dark:from-blue-500 via-violet-600 to-pink-600 opacity-10 blur-md"></span>
                    <span className="relative bg-gradient-to-r from-blue-600 dark:from-blue-500 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                      ডিজিটাল গ্রোথ পার্টনার।
                    </span>
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[1.05rem] leading-relaxed text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-normal max-w-2xl">
              {currentLang === 'en' 
                ? 'Next Solution helps modern businesses scale dynamically by handling every dimension of digital growth. We build high-performance mobile apps, visually captivating brand identities, high-conversion SEO setups, and intelligent AI automation, acts as your reliable long-term digital headquarters.'
                : 'নেক্সট সলিউশন আপনার ব্যবসাকে বড় করতে ডিজিটাল খাতের প্রতিটি দিকে কাজ করে। হাই-পারফরম্যান্স ওয়েব অ্যাপস, চমৎকার ব্র্যান্ড আইডেন্টিটি, হাই-কনভার্সন এসইও এবং কাস্টম এআই অটোমেশন নিয়ে আমরা আপনার বিশ্বস্ত ও দীর্ঘমেয়াদী ডিজিটাল পার্টনার হিসেবে কাজ করি।'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <motion.button
                id="about-hero-btn-primary"
                onClick={() => navigateToTab('contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 rounded-xl bg-neutral-950 text-white text-xs sm:text-sm font-black px-8 py-4.5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(255,77,0,0.35)] hover:bg-orange-600 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Button glow backdrop */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 dark:from-blue-500 to-indigo-600 dark:to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span>🚀 {currentLang === 'en' ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন'}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              <motion.button
                id="about-hero-btn-secondary"
                onClick={() => navigateToTab('contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-neutral-200/80 bg-white dark:bg-[#141414] hover:bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-900 text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm font-black px-8 py-4.5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span>📅 {currentLang === 'en' ? 'Book Free Consultation' : 'ফ্রি পরামর্শ বুক করুন'}</span>
              </motion.button>
            </div>

            {/* Core Values Pills below buttons */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 text-left">
              <span className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 text-center sm:text-left">
                {currentLang === 'en' ? 'OUR GUIDING CORES' : 'আমাদের মূল আদর্শ সমূহ'}
              </span>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                {[
                  { icon: '💡', labelEn: 'Innovation', labelBn: 'উদ্ভাবন', border: 'hover:border-amber-200 hover:bg-amber-50/50 hover:text-amber-700 shadow-amber-100' },
                  { icon: '🤝', labelEn: 'Transparency', labelBn: 'স্বচ্ছতা', border: 'hover:border-blue-200 dark:border-blue-500/25 hover:bg-blue-50/5 dark:bg-blue-500/50 hover:text-blue-700 shadow-blue-100' },
                  { icon: '🏆', labelEn: 'Quality', labelBn: 'গুণমান', border: 'hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 shadow-emerald-100' },
                  { icon: '⚡', labelEn: 'Fast Delivery', labelBn: 'দ্রুত ডেলিভারি', border: 'hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-700 shadow-rose-100' },
                  { icon: '🚀', labelEn: 'Growth Focus', labelBn: 'গ্রোথ ফোকাস', border: 'hover:border-cyan-200 hover:bg-cyan-50/50 hover:text-cyan-700 shadow-cyan-100' },
                  { icon: '❤️', labelEn: 'Long-Term Partnership', labelBn: 'দীর্ঘমেয়াদী পার্টনারশিপ', border: 'hover:border-purple-200 hover:bg-purple-50/5 dark:bg-blue-500/50 hover:text-purple-700 shadow-purple-100' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-neutral-200/60 bg-white dark:bg-[#141414] text-[11px] font-black text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 transition-all duration-300 shadow-sm cursor-default hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${item.border}`}
                  >
                    <span>{item.icon}</span>
                    <span>{currentLang === 'en' ? item.labelEn : item.labelBn}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side (55% on desktop) - INTERACTIVE DIGITAL GROWTH CORE */}
          <div className="lg:col-span-7 w-full relative flex flex-col space-y-6 lg:space-y-8 h-auto overflow-visible">
            
            {/* Interactive Showcase Mode Selectors */}
            <div className="flex space-x-1.5 p-1.5 bg-neutral-100/90 backdrop-blur-md rounded-2xl border border-neutral-200/50 w-full max-w-lg mx-auto lg:mx-0 shadow-sm relative z-20">
              {[
                { id: 'code', labelEn: 'Scalability Core', labelBn: 'স্কেলেবিলিটি কোর', icon: Terminal },
                { id: 'canvas', labelEn: 'Design Tokens', labelBn: 'ডিজাইন টোকেন', icon: Palette },
                { id: 'ai', labelEn: 'Autonomous AI', labelBn: 'অটোনোমাস এআই', icon: BrainCircuit }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeShowcaseTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`showcase-tab-${tab.id}`}
                    onClick={() => {
                      setActiveShowcaseTab(tab.id as 'code' | 'canvas' | 'ai');
                    }}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-black tracking-wide transition-all duration-300 relative cursor-pointer ${
                      isActive 
                        ? 'text-neutral-950 bg-white dark:bg-[#141414] shadow-sm border border-neutral-200/20' 
                        : 'text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50/50 dark:bg-neutral-900/50'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`} />
                    <span className="hidden sm:inline">{currentLang === 'en' ? tab.labelEn : tab.labelBn}</span>
                    <span className="inline sm:hidden">{currentLang === 'en' ? tab.labelEn.split(' ')[0] : tab.labelBn.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Cabinet Container */}
            <div className="relative w-full overflow-visible">
              
              {/* Outer decorative neon glow backdrop responsive to selected tab */}
              <div className={`absolute -inset-2 rounded-[2rem] opacity-30 blur-2xl transition-all duration-700 pointer-events-none -z-10 ${
                activeShowcaseTab === 'code' 
                  ? 'bg-gradient-to-tr from-blue-500 dark:from-blue-500 via-indigo-500 to-violet-500' 
                  : activeShowcaseTab === 'canvas'
                    ? 'bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500'
                    : 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-blue-500 dark:to-blue-400'
              }`} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcaseTab}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white/85 backdrop-blur-xl rounded-3xl border border-neutral-200/70 shadow-[0_30px_70px_rgba(0,0,0,0.06)] overflow-hidden relative p-5 sm:p-7 md:p-8"
                >
                  {/* TAB 1: CODE SCALABILITY ENGINE */}
                  {activeShowcaseTab === 'code' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">
                            {currentLang === 'en' ? 'SPEED ENGINE' : 'স্পিড ইঞ্জিন'}
                          </span>
                          <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1">
                            {currentLang === 'en' ? 'Clean TypeScript Architecture' : 'পরিচ্ছন্ন টাইপস্ক্রিপ্ট আর্কিটেকচার'}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1.5 self-start sm:self-center">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">SSR Active</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Editor Box */}
                        <div className="md:col-span-7 flex flex-col bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden relative font-mono text-[11px] leading-relaxed min-h-[230px] justify-between">
                          
                          {/* Code Window Header */}
                          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/80 border-b border-neutral-800/60">
                            <div className="flex space-x-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">api/growth/optimize.ts</span>
                            <div className="w-4" />
                          </div>

                          {/* Code Body */}
                          <div className="p-4 space-y-1 select-none overflow-x-auto text-neutral-300 dark:text-neutral-600">
                            <div><span className="text-pink-400">import</span> &#123; <span className="text-cyan-300">NextSolution</span> &#125; <span className="text-pink-400">from</span> <span className="text-amber-200">"next-sol"</span>;</div>
                            <div className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? '// Initialize instant assets payload optimization' : '// অ্যাসেট পেলোড অপ্টিমাইজেশন'}</div>
                            <div><span className="text-pink-400">export async function</span> <span className="text-blue-400 dark:text-blue-300">POST</span>(req: <span className="text-emerald-400">Request</span>) &#123;</div>
                            <div>&nbsp;&nbsp;<span className="text-pink-400">const</span> client = <span className="text-pink-400">new</span> <span className="text-cyan-300">NextSolution</span>(&#123; <span className="text-purple-300">engine</span>: <span className="text-amber-200">'core'</span> &#125;);</div>
                            <div>&nbsp;&nbsp;<span className="text-pink-400">const</span> res = <span className="text-pink-400">await</span> client.<span className="text-blue-400 dark:text-blue-300">optimize</span>(&#123;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;minify: <span className="text-amber-400">true</span>,</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;seoPriority: <span className="text-amber-400">"Google-Rank-1"</span>,</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;hydratedTrees: <span className="text-amber-400">true</span></div>
                            <div>&nbsp;&nbsp;&#125;);</div>
                            <div>&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-cyan-300">Response</span>.<span className="text-blue-400 dark:text-blue-300">json</span>(&#123; res &#125;);</div>
                            <div>&#125;</div>
                          </div>

                          {/* Code Window Footer */}
                          <div className="px-4 py-2 bg-neutral-900/40 border-t border-neutral-900/80 flex justify-between items-center text-[9px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                            <span>UTF-8</span>
                            <span>TypeScript / React</span>
                          </div>

                          {/* Optimizing Overlay */}
                          {optimizationStage === 'optimizing' && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-10"
                            >
                              <div className="h-7 w-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                              <span className="text-xs text-neutral-300 dark:text-neutral-600 font-mono">
                                {currentLang === 'en' ? 'Reindexing virtual DOM trees...' : 'ভার্চুয়াল ডম ইনডেক্স করা হচ্ছে...'}
                              </span>
                            </motion.div>
                          )}
                        </div>

                        {/* Lighthouse Gauge and Stats Panel */}
                        <div className="md:col-span-5 flex flex-col justify-between p-4.5 bg-neutral-50/70 dark:bg-neutral-900/70 rounded-2xl border border-neutral-150/40 space-y-4">
                          <div className="text-center md:text-left">
                            <span className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                              {currentLang === 'en' ? 'Lighthouse Score' : 'লাইটহাউস স্কোর'}
                            </span>
                            
                            {/* SVG Radial Gauge */}
                            <div className="flex items-center justify-center py-4 relative">
                              <svg className="w-24 h-24 transform -rotate-90">
                                <circle cx="48" cy="48" r="40" className="stroke-neutral-200 fill-none" strokeWidth="6" />
                                <motion.circle 
                                  cx="48" cy="48" r="40" 
                                  className={`fill-none transition-colors duration-500 ${
                                    optimizationStage === 'optimized' 
                                      ? 'stroke-emerald-500 shadow-emerald-400' 
                                      : optimizationStage === 'optimizing'
                                        ? 'stroke-amber-400'
                                        : 'stroke-rose-500'
                                  }`} 
                                  strokeWidth="6" 
                                  strokeDasharray="251.2"
                                  initial={{ strokeDashoffset: 251.2 }}
                                  animate={{ 
                                    strokeDashoffset: optimizationStage === 'optimized' 
                                      ? 2.5 
                                      : optimizationStage === 'optimizing' 
                                        ? 70 
                                        : 145 
                                  }}
                                  transition={{ duration: 1, ease: "easeInOut" }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span 
                                  key={optimizationStage}
                                  initial={{ scale: 0.85, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className={`text-2xl font-black font-sans ${
                                    optimizationStage === 'optimized' 
                                      ? 'text-emerald-600 dark:text-emerald-400' 
                                      : optimizationStage === 'optimizing'
                                        ? 'text-amber-500 dark:text-amber-400'
                                        : 'text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {optimizationStage === 'optimized' ? '99' : optimizationStage === 'optimizing' ? '72' : '42'}
                                </motion.span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 -mt-1">
                                  {optimizationStage === 'optimized' ? 'PERFECT' : optimizationStage === 'optimizing' ? 'TUNING' : 'BLOATED'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Specs */}
                          <div className="space-y-2 border-t border-b border-neutral-100 dark:border-neutral-800 py-3 text-xs">
                            <div className="flex justify-between font-mono">
                              <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'TTFB:' : 'প্রথম বাইট টাইম:'}</span>
                              <span className={`font-black ${optimizationStage === 'optimized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                                {optimizationStage === 'optimized' ? '12ms' : '240ms'}
                              </span>
                            </div>
                            <div className="flex justify-between font-mono">
                              <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Bundle Weight:' : 'বান্ডেল সাইজ:'}</span>
                              <span className={`font-black ${optimizationStage === 'optimized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-700 dark:text-neutral-200'}`}>
                                {optimizationStage === 'optimized' ? '14.2 KB' : '3.4 MB'}
                              </span>
                            </div>
                            <div className="flex justify-between font-mono">
                              <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Interactive:' : 'ইন্টারেক্টিভ টাইম:'}</span>
                              <span className={`font-black ${optimizationStage === 'optimized' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                                {optimizationStage === 'optimized' ? '0.12s' : '2.1s'}
                              </span>
                            </div>
                          </div>

                          {/* Trigger Action Button */}
                          <motion.button
                            onClick={triggerOptimization}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm text-center ${
                              optimizationStage === 'optimized'
                                ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100'
                                : 'bg-neutral-900 hover:bg-blue-600 text-white'
                            }`}
                          >
                            {optimizationStage === 'optimized' 
                              ? (currentLang === 'en' ? '↩️ Reset Simulator' : '↩️ রিসেট করুন') 
                              : optimizationStage === 'optimizing'
                                ? (currentLang === 'en' ? '⚡ Tuning...' : '⚡ টিউনিং...')
                                : (currentLang === 'en' ? '⚡ Optimize My Speed' : '⚡ স্পিড অপ্টিমাইজ করুন')
                            }
                          </motion.button>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 2: CANVAS DESIGN TOKENS SYSTEM */}
                  {activeShowcaseTab === 'canvas' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-md">
                            {currentLang === 'en' ? 'DESIGN LAB' : 'ডিজাইন ল্যাব'}
                          </span>
                          <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1">
                            {currentLang === 'en' ? 'Interactive Figma-Like Sandbox' : 'ইন্টারেক্টিভ ফিগমা ডিজাইন স্যান্ডবক্স'}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1.5 self-start sm:self-center">
                          <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">Tokens Engaged</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        
                        {/* Interactive Client Card Preview */}
                        <div className="md:col-span-6 flex items-center justify-center p-4 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100/50 h-[260px] relative overflow-hidden">
                          
                          {/* Beautiful background grids */}
                          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

                          {/* Dynamic Custom Card */}
                          <motion.div 
                            layout
                            style={{ 
                              borderRadius: `${cornerRadius}px`,
                              boxShadow: vibeTheme === 'cyber' 
                                ? `0 15px ${glowIntensity}px -5px rgba(255, 77, 0, 0.45)` 
                                : vibeTheme === 'peak' 
                                  ? `0 15px ${glowIntensity}px -5px rgba(16, 185, 129, 0.45)` 
                                  : `0 15px ${glowIntensity}px -5px rgba(255, 77, 0, 0.45)`
                            }}
                            className={`w-[250px] p-5 border relative overflow-hidden transition-all duration-300 bg-white dark:bg-[#141414] ${
                              vibeTheme === 'cyber' 
                                ? 'border-blue-100 dark:border-orange-500/20' 
                                : vibeTheme === 'peak' 
                                  ? 'border-emerald-100 dark:border-emerald-500/20' 
                                  : 'border-rose-100 dark:border-rose-500/20'
                            }`}
                          >
                            {/* Card Glow Mesh */}
                            <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[30px] opacity-20 pointer-events-none ${
                              vibeTheme === 'cyber' 
                                ? 'bg-blue-500 dark:bg-blue-500' 
                                : vibeTheme === 'peak' 
                                  ? 'bg-emerald-500' 
                                  : 'bg-rose-500'
                            }`} />

                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                vibeTheme === 'cyber' 
                                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                                  : vibeTheme === 'peak' 
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              }`}>
                                {vibeTheme === 'cyber' ? 'CYBER FINTECH' : vibeTheme === 'peak' ? 'GREEN ECO' : 'SOLAR AGENCY'}
                              </span>
                              <Sparkles className={`h-4 w-4 ${
                                vibeTheme === 'cyber' ? 'text-blue-500 dark:text-blue-400' : vibeTheme === 'peak' ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                              }`} />
                            </div>

                            <h4 className={`text-sm font-black tracking-tight mb-2 text-neutral-950 ${
                              vibeTheme === 'peak' ? 'font-serif' : vibeTheme === 'rose' ? 'font-sans uppercase tracking-wider' : 'font-sans'
                            }`}>
                              {vibeTheme === 'cyber' ? 'Infinite Transactions' : vibeTheme === 'peak' ? 'Forest Green Core' : 'Symphony Agency'}
                            </h4>

                            <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500 mb-4">
                              {currentLang === 'en' 
                                ? 'Crafting stunning immersive digital systems that perform under heavy traffic.'
                                : 'পণ্য বা সার্ভিসের সাথে কাস্টমারের চমৎকার ডিজিটাল অভিজ্ঞতার মেলবন্ধন।'
                              }
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                              <div className="flex -space-x-1.5">
                                <span className={`h-4.5 w-4.5 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white ${
                                  vibeTheme === 'cyber' ? 'bg-blue-600' : vibeTheme === 'peak' ? 'bg-emerald-600' : 'bg-rose-600'
                                }`}>A</span>
                                <span className="h-4.5 w-4.5 rounded-full border border-white bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[8px] font-black text-neutral-600 dark:text-neutral-300 dark:text-neutral-600">B</span>
                              </div>
                              <span className={`text-[10px] font-black ${
                                vibeTheme === 'cyber' ? 'text-blue-600 dark:text-blue-400' : vibeTheme === 'peak' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                              }`}>{currentLang === 'en' ? 'Learn More →' : 'জানুন →'}</span>
                            </div>
                          </motion.div>

                          {/* Draggable cursor feedback */}
                          <div className="absolute bottom-3 right-4 flex items-center space-x-1 bg-neutral-900 text-white rounded-full px-2.5 py-1 text-[8px] font-mono shadow-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>UI UX LIVE</span>
                          </div>
                        </div>

                        {/* Sliders and Preset Controls */}
                        <div className="md:col-span-6 space-y-5">
                          <div className="space-y-2">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                              {currentLang === 'en' ? '1. Select Visual Vibe' : '১. ব্র্যান্ড ভাইব নির্বাচন করুন'}
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'cyber', label: currentLang === 'en' ? 'Cyber Blue' : 'সাইবার ব্লু', color: 'bg-blue-500 dark:bg-blue-500' },
                                { id: 'peak', label: currentLang === 'en' ? 'Eco Green' : 'ইকো গ্রিন', color: 'bg-emerald-500' },
                                { id: 'rose', label: currentLang === 'en' ? 'Solar Rose' : 'সোলার রোজ', color: 'bg-rose-500' }
                              ].map((v) => (
                                <button
                                  key={v.id}
                                  onClick={() => setVibeTheme(v.id as 'cyber' | 'peak' | 'rose')}
                                  className={`flex items-center space-x-1.5 py-2 px-2.5 border rounded-xl text-[10px] font-black transition-all cursor-pointer ${
                                    vibeTheme === v.id 
                                      ? 'border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-950 shadow-sm' 
                                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 bg-white dark:bg-[#141414] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500'
                                  }`}
                                >
                                  <span className={`h-2.5 w-2.5 rounded-full ${v.color}`} />
                                  <span>{v.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                            
                            {/* Border Radius control */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                  {currentLang === 'en' ? '2. Border Radius' : '২. বর্ডার রেডিয়াস'}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-700 dark:text-neutral-200">{cornerRadius}px</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="28" 
                                value={cornerRadius}
                                onChange={(e) => setCornerRadius(Number(e.target.value))}
                                className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900" 
                              />
                            </div>

                            {/* Glow Intensity control */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                                  {currentLang === 'en' ? '3. Glow Intensity' : '৩. গ্লো ইনটেনসিটি'}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-700 dark:text-neutral-200">{glowIntensity}px</span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="80" 
                                value={glowIntensity}
                                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                                className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900" 
                              />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AUTONOMOUS AI GROWTH PIPELINE */}
                  {activeShowcaseTab === 'ai' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            {currentLang === 'en' ? 'INTELLIGENCE CORE' : 'এআই ইন্টেলিজেন্স কোর'}
                          </span>
                          <h3 className="text-base font-black text-neutral-900 dark:text-white mt-1">
                            {currentLang === 'en' ? 'Gemini-Powered Neural Growth' : 'জেমিনি-চালিত নিউরাল গ্রোথ পাইপলাইন'}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1.5 self-start sm:self-center">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">Model 2.5 Flash</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                        
                        {/* Interactive Neural Diagram + Terminal Logs */}
                        <div className="md:col-span-7 flex flex-col bg-neutral-950 rounded-2xl border border-neutral-800 p-4 font-mono text-[10px] leading-relaxed min-h-[240px] justify-between relative shadow-2xl overflow-hidden">
                          
                          {/* Top Visual Diagram */}
                          <div className="flex justify-between items-center bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-850 mb-3 relative overflow-hidden">
                            <div className="flex items-center space-x-1.5 relative z-10">
                              <Users className="h-3.5 w-3.5 text-blue-400 dark:text-blue-300" />
                              <span className="text-[9px] text-neutral-300 dark:text-neutral-600 font-bold">{currentLang === 'en' ? 'Traffic' : 'কাস্টমার'}</span>
                            </div>
                            
                            {/* Animated connection beam */}
                            <div className="flex-1 h-0.5 mx-2 bg-neutral-800 relative">
                              <motion.div 
                                animate={aiStep === 'running' ? { left: ["0%", "100%"] } : { left: "0%" }}
                                transition={aiStep === 'running' ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
                                className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" 
                              />
                            </div>

                            <div className="flex items-center space-x-1.5 relative z-10">
                              <BrainCircuit className="h-3.5 w-3.5 text-purple-400 dark:text-purple-300 animate-spin" />
                              <span className="text-[9px] text-neutral-300 dark:text-neutral-600 font-bold">Gemini AI</span>
                            </div>

                            {/* Animated connection beam */}
                            <div className="flex-1 h-0.5 mx-2 bg-neutral-800 relative">
                              <motion.div 
                                animate={aiStep === 'running' ? { left: ["0%", "100%"] } : { left: "0%" }}
                                transition={aiStep === 'running' ? { repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 } : {}}
                                className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent" 
                              />
                            </div>

                            <div className="flex items-center space-x-1.5 relative z-10">
                              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-[9px] text-neutral-300 dark:text-neutral-600 font-bold">{currentLang === 'en' ? 'Revenue' : 'প্রবৃদ্ধি'}</span>
                            </div>
                          </div>

                          {/* Terminal Output */}
                          <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[130px] pr-2 scrollbar-thin scrollbar-thumb-neutral-800">
                            {aiLogs.length === 0 ? (
                              <div className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 italic h-full flex items-center justify-center text-center p-3">
                                {currentLang === 'en' 
                                  ? 'Click "Trigger Growth Agent" below to run simulated crawl & database auto-optimizations...'
                                  : 'নিচের "গ্রোথ এজেন্ট চালু করুন" বাটনে ক্লিক করে ডেমো সিমুলেশন রান করুন...'
                                }
                              </div>
                            ) : (
                              aiLogs.map((log, index) => (
                                <motion.div 
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="text-neutral-300 dark:text-neutral-600 font-mono text-[9px] sm:text-[10px]"
                                >
                                  {log}
                                </motion.div>
                              ))
                            )}
                          </div>

                          {/* Console indicator */}
                          <div className="mt-3 pt-2 border-t border-neutral-900 flex items-center justify-between text-[9px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                            <span>Sys: SECURE_AGENTS_ON</span>
                            <span>{aiStep === 'running' ? '● RUNNING' : aiStep === 'completed' ? '● COMPLETED' : '● IDLE'}</span>
                          </div>
                        </div>

                        {/* Interactive Growth hockey stick chart */}
                        <div className="md:col-span-5 flex flex-col justify-between p-4.5 bg-neutral-50/70 dark:bg-neutral-900/70 rounded-2xl border border-neutral-150/40 space-y-4">
                          <div>
                            <span className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                              {currentLang === 'en' ? 'Funnel Conversion Rate' : 'ফানেল কনভার্সন রেট'}
                            </span>
                            
                            {/* Animated SVG Sparkline */}
                            <div className="h-28 w-full bg-neutral-950 rounded-xl mt-3 relative overflow-hidden flex items-end">
                              <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
                              
                              <svg className="w-full h-full p-2" viewBox="0 0 200 100" preserveAspectRatio="none">
                                {/* Flat base reference path */}
                                <path d="M0,80 L50,78 L100,75 L150,70 L200,68" fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="3,3" />
                                
                                {/* Dynamic hockey line */}
                                <motion.path 
                                  d="M0,80 L50,78 L100,75 L140,55 L200,10" 
                                  fill="none" 
                                  className="stroke-emerald-500" 
                                  strokeWidth="2.5" 
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0.1 }}
                                  animate={{ pathLength: aiStep === 'completed' ? 1 : aiStep === 'running' ? 0.6 : 0.25 }}
                                  transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                              </svg>

                              {/* Hover tooltip overlay */}
                              {aiStep === 'completed' && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute top-2 right-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-1 flex items-center space-x-1 shadow-sm"
                                >
                                  <span className="text-[9px] font-mono font-black text-emerald-600 dark:text-emerald-400">+240% CTR</span>
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                  </span>
                                </motion.div>
                              )}

                              <div className="absolute bottom-2 left-3 text-[8px] font-mono text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                                {currentLang === 'en' ? 'Organic Traffic Trend' : 'অর্গানিক ট্রাফিক ট্রেন্ড'}
                              </div>
                            </div>
                          </div>

                          {/* Stat rows */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[11px] font-mono border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
                              <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Model latency:' : 'এআই ল্যাটেন্সি:'}</span>
                              <span className="font-bold text-neutral-800 dark:text-neutral-100">120ms</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-mono">
                              <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Database sync:' : 'ডাটাবেস সিঙ্ক:'}</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">Active (Uptime 100%)</span>
                            </div>
                          </div>

                          {/* Trigger simulation button */}
                          <motion.button
                            onClick={runAiSimulation}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm text-center ${
                              aiStep === 'completed'
                                ? 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100'
                                : 'bg-neutral-900 hover:bg-emerald-600 text-white'
                            }`}
                          >
                            {aiStep === 'running' 
                              ? (currentLang === 'en' ? '🤖 Processing...' : '🤖 প্রোসেস হচ্ছে...') 
                              : aiStep === 'completed'
                                ? (currentLang === 'en' ? '↩️ Reset Simulation' : '↩️ সিমুলেশন রিসেট')
                                : (currentLang === 'en' ? '🚀 Trigger Growth Agent' : '🚀 গ্রোথ এজেন্ট চালু করুন')
                            }
                          </motion.button>
                        </div>

                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

              {/* Floating micro indicators decoration (No photos, completely abstract design) */}
              <div className="absolute -bottom-8 -left-4 hidden md:flex items-center space-x-2 bg-white dark:bg-[#141414] px-3.5 py-2 rounded-2xl border border-neutral-200/60 shadow-md">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-wide text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 uppercase">
                  {currentLang === 'en' ? '🌐 ZERO DOWNTIME CORE' : '🌐 জিরো ডাউনটাইম কোর'}
                </span>
              </div>

              <div className="absolute -top-6 -right-4 hidden md:flex items-center space-x-1.5 bg-neutral-950 text-white px-3 py-1.5 rounded-xl shadow-lg border border-neutral-800">
                <span className="text-[9px] font-mono">NEXT SOLUTION v2.0</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          02. OUR STORY (Storytelling Timeline)
         ======================================================== */}
      <section id="our-story" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/30 py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {currentLang === 'en' ? 'OUR BRAND CHRONICLES' : 'আমাদের ব্র্যান্ডের গল্প'}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
                {currentLang === 'en' ? 'The History & Philosophy of Next Solution' : 'নেক্সট সলিউশনের জন্ম ও আমাদের দীর্ঘ ইতিহাস'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-md">
                {currentLang === 'en' 
                  ? 'We founded this agency with one simple rule: never deploy lazy templates, and never compromise on relational performance. Click through our milestones to see how we expanded our digital footprint.' 
                  : 'আমরা কেবল একটি সরল নিয়মে বিশ্বাস করি: কখনো রেডিমেড টেমপ্লেট ব্যবহার করব না এবং গতির সাথে আপস করব না। মাইলস্টোনগুলোতে ক্লিক করে দেখে নিন কীভাবে আমরা প্রযুক্তির উৎকর্ষে নিজেদের নিয়োজিত করেছি।'}
              </p>

              {/* Milestone Selectors */}
              <div className="space-y-2 pt-4">
                {storyMilestones.map((m, idx) => (
                  <button
                    key={m.year}
                    onClick={() => setSelectedMilestone(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedMilestone === idx 
                        ? 'bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-700 shadow-md text-blue-600 dark:text-blue-400 pl-6' 
                        : 'bg-transparent border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-950'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold">{m.year}</span>
                      <span className="text-xs font-bold">{currentLang === 'en' ? m.titleEn : m.titleBn}</span>
                    </div>
                    {selectedMilestone === idx && <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Milestone Card Detail */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMilestone}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[420px]"
                >
                  <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${storyMilestones[selectedMilestone].color}`} />
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl font-black text-neutral-100 font-mono tracking-tighter">
                        {storyMilestones[selectedMilestone].year}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100/50">
                        {storyMilestones[selectedMilestone].metric}
                      </span>
                    </div>

                    <h3 className="font-sans text-2xl md:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
                      {currentLang === 'en' ? storyMilestones[selectedMilestone].titleEn : storyMilestones[selectedMilestone].titleBn}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                      {currentLang === 'en' ? storyMilestones[selectedMilestone].descEn : storyMilestones[selectedMilestone].descBn}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-ping"></div>
                      <span className="text-[10px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        {currentLang === 'en' ? 'Verified Milestone Record' : 'যাচাইকৃত ইতিহাস রেকর্ড'}
                      </span>
                    </div>
                    <button
                      onClick={() => navigateToTab('contact')}
                      className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <span>{currentLang === 'en' ? 'Start project with us' : 'আমাদের সাথে কাজ শুরু করুন'}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          03. MISSION & VISION (Spread Cards)
         ======================================================== */}
      <section id="mission-vision" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {currentLang === 'en' ? 'OUR GUIDING STARS' : 'আমাদের পথপ্রদর্শক দর্শন'}
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
            {currentLang === 'en' ? 'Aligning Complex Technical Logic With Clear Brand Direction' : 'পরিষ্কার ও নিখুঁত পরিকল্পনার সাথে সফল ডিজিটাল বাস্তবায়ন'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission card */}
          <div className="group relative rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-8 md:p-10 space-y-6 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-blue-600 dark:from-blue-500 to-indigo-600 dark:to-blue-400" />
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition duration-300">
              <Target className="h-6 w-6" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">01. Our core duty</span>
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                {currentLang === 'en' ? 'Our Core Mission' : 'আমাদের মূল মিশন'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                {currentLang === 'en'
                  ? (settings.aboutMissionEn || 'To orchestrate incredibly fast, reliable, and secure mobile app platforms coupled with gorgeous brand design systems that reliably scale businesses, eliminate technical debt, and maximize operational ROI.')
                  : (settings.aboutMissionBn || 'আমাদের মূল মিশন হলো অতি-দ্রুত, বিশ্বস্ত ও সুরক্ষিত অ্যাপ্লিকেশন প্ল্যাটফর্ম তৈরি করা যা এআই অটোমেশনের মাধ্যমে ব্যবসায়িক জটিলতা ও অপচয় দূর করে প্রবৃদ্ধি এবং বিনিয়োগের নিশ্চিত রিটার্ন প্রদান করে।')}
              </p>
            </div>

            {/* Decorative Vector simulation */}
            <div className="pt-4 border-t border-neutral-100/70 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest italic">"Performance First, Always."</span>
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Vision card */}
          <div className="group relative rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-8 md:p-10 space-y-6 shadow-sm hover:shadow-xl hover:border-purple-500/20 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-purple-600 to-pink-600" />
            <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:text-purple-300 flex items-center justify-center group-hover:scale-110 transition duration-300">
              <Eye className="h-6 w-6" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 dark:text-purple-300">02. Our futuristic vision</span>
              <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white">
                {currentLang === 'en' ? 'Our Longterm Vision' : 'আমাদের দীর্ঘমেয়াদী ভিশন'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                {currentLang === 'en'
                  ? (settings.aboutVisionEn || 'To define the absolute gold standard for full-stack digital craftsmanship and secure AI integrations, establishing ourselves as the ultimate digital headquarters for leading organizations worldwide.')
                  : (settings.aboutVisionBn || 'প্রযুক্তির বৈশ্বিক মানদণ্ড বা পরম গোল্ড স্ট্যান্ডার্ড হিসেবে নিজেদের প্রতিষ্ঠিত করা, যাতে সারাবিশ্বের সফল প্রতিষ্ঠানসমূহ নির্দ্বিধায় নেক্সট সリューションকে তাদের প্রধান ডিজিটাল সহযোগী মনে করে।')}
              </p>
            </div>

            {/* Decorative Vector simulation */}
            <div className="pt-4 border-t border-neutral-100/70 flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest italic">"Uncompromised Integrity."</span>
              <Check className="h-4 w-4 text-purple-600 dark:text-purple-400 dark:text-purple-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          03.5. MEET THE MINDS BEHIND NEXT SOLUTION (Leadership Showcase)
         ======================================================== */}
      <section id="about-leadership" className="border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] py-24 relative z-10 overflow-hidden">
        
        {/* Abstract Background Design Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
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
          03.6. THE ENTIRE CREW (Our Team Gallery Section)
         ======================================================== */}
      <section id="about-squad" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/25 py-20 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-blue-500/10 text-indigo-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-wider">
              <span>👥 {currentLang === 'en' ? 'OUR TEAM EXPERTS' : 'আমাদের টিম বিশেষজ্ঞরা'}</span>
            </span>
            <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Meet our team' : 'আমাদের টিম'}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-md mx-auto">
              {currentLang === 'en'
                ? 'The highly specialized builders, pixel craftsman, and growth strategists transforming code into business success.'
                : 'অভিজ্ঞ বিল্ডার্স, পিক্সেল ক্রাফটসম্যান এবং গ্রোথ স্ট্র্যাটেজিস্টরা যারা কোডকে নিশ্চিত ব্যবসায়িক সফলতায় রূপান্তর করে।'}
            </p>
          </div>

          {/* Team Stats Row */}
       

          {/* Interactive Team Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
            {[
              { id: 'all', labelEn: 'All Departments', labelBn: 'সকল ডিপার্টমেন্ট' },
              { id: 'Development', labelEn: 'Development', labelBn: 'ডেভেলপমেন্ট' },
              { id: 'Design', labelEn: 'Design', labelBn: 'ডিজাইন' },
              { id: 'AI & Automations', labelEn: 'AI & Automations', labelBn: 'এআই ও অটোমেশন' },
              { id: 'Content Strategy', labelEn: 'Content Strategy', labelBn: 'কনটেন্ট স্ট্র্যাটেজি' },
              { id: 'Growth & SEO', labelEn: 'Growth & SEO', labelBn: 'এসইও ও প্রবৃদ্ধি' },
              { id: 'Cloud & DevOps', labelEn: 'Cloud & DevOps', labelBn: 'ক্লাউড ও ডেভঅপ্স' }
            ].map((cat) => {
              const count = cat.id === 'all' 
                ? deliverySquad.length 
                : deliverySquad.filter(m => m.deptEn === cat.id).length;
              
              const isActive = selectedSquadCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSquadCategory(cat.id)}
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-1.5 cursor-pointer hover:scale-[1.02] ${
                    isActive 
                      ? 'bg-neutral-950 border-neutral-950 text-white shadow-md' 
                      : 'bg-white dark:bg-[#141414] border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:text-white hover:border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <span>{currentLang === 'en' ? cat.labelEn : cat.labelBn}</span>
                  <span className={`inline-flex items-center justify-center h-4 px-1.5 rounded-full text-[8px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 4-Columns Team Grid with Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {deliverySquad
                .filter(member => selectedSquadCategory === 'all' || member.deptEn === selectedSquadCategory)
                .map((member, i) => {
                  return (
                    <motion.div
                      key={member.nameEn}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{ y: -6 }}
                      className="bg-white dark:bg-[#141414] border border-neutral-150/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500/15 transition-all duration-300 flex flex-col group h-full"
                    >
                      {/* Image on top */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                        <img 
                          src={member.image} 
                          alt={member.nameEn}
                          className="h-full w-full object-cover object-center group-hover:scale-[1.05] transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-sm text-[8px] font-mono font-black text-white uppercase tracking-wider">
                            {currentLang === 'en' ? member.deptEn : member.deptBn}
                          </span>
                        </div>
                      </div>

                      {/* Content underneath */}
                      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                              {currentLang === 'en' ? member.nameEn : member.nameBn}
                            </h4>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" title="Active" />
                          </div>
                          
                          <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider">
                            {currentLang === 'en' ? member.roleEn : member.roleBn}
                          </p>
                        </div>

                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                          {currentLang === 'en' ? member.descEn : member.descBn}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>

        </div>
      </section>


         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 max-w-6xl mx-auto mb-14">
            {[
              { value: '5+', label: currentLang === 'en' ? 'Years Technical' : 'বছর টেকনিক্যাল', color: 'from-blue-500 dark:from-blue-500 to-indigo-500', bg: 'bg-blue-50/60', border: 'border-blue-100/60', textColor: 'text-blue-600 dark:text-blue-400' },
              { value: '4+', label: currentLang === 'en' ? 'Years Agency' : 'বছর এজেন্সি', color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50/60', border: 'border-violet-100/60', textColor: 'text-violet-600 dark:text-blue-400' },
              { value: '100+', label: currentLang === 'en' ? 'Projects' : 'প্রজেক্ট', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50/60', border: 'border-emerald-100/60', textColor: 'text-emerald-600 dark:text-emerald-400' },
              { value: '50+', label: currentLang === 'en' ? 'Clients' : 'ক্লায়েন্ট', color: 'from-rose-500 to-pink-500', bg: 'bg-rose-50/60', border: 'border-rose-100/60', textColor: 'text-rose-600 dark:text-rose-400' },
              { value: '15+', label: currentLang === 'en' ? 'Team Members' : 'টিম মেম্বার', color: 'from-blue-500 to-indigo-500', bg: 'bg-amber-50/60', border: 'border-amber-100/60', textColor: 'text-blue-600 dark:text-blue-400' },
              { value: '8+', label: currentLang === 'en' ? 'Digital Services' : 'ডিজিটাল সেবা', color: 'from-cyan-500 to-sky-500', bg: 'bg-cyan-50/60', border: 'border-cyan-100/60', textColor: 'text-cyan-600 dark:text-cyan-400' },
              { value: '20+', label: currentLang === 'en' ? 'Industries Served' : 'ইন্ডাস্ট্রি', color: 'from-slate-600 to-gray-500', bg: 'bg-slate-50/60', border: 'border-slate-100/60', textColor: 'text-slate-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`relative group ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-2xl p-4 text-center overflow-hidden transition-shadow duration-300 hover:shadow-lg`}
              >
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-60`} />
                <span className={`block text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent tracking-tight leading-none mb-2`}>
                  {stat.value}
                </span>
                <span className={`block text-[9px] sm:text-[10px] font-bold ${stat.textColor} uppercase tracking-widest leading-snug`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>









      {/* ========================================================
          04. CORE VALUES (Bento Grid)
         ======================================================== */}
      <section id="core-values" className="border-y border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 py-24 relative z-10">
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
              { titleEn: 'AI & Automation Driven', titleBn: 'এআই ও অটোমেশন চালিত', descEn: 'By coding proprietary LLM triggers and custom cognitive workflows, we eliminate manual paperwork.', descBn: 'আমাদের তৈরি কাস্টম এলএলএম কোডিং ও ইন্টেলিজেন্ট এপিআই আপনার ব্যবসার পুনরাবৃত্তিমূলক জটিলতা দূর করে দেয়।' },
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
              { id: 'ai', labelEn: 'AI & Automation', labelBn: 'এআই ও অটোমেশন' },
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
                className="group relative rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-5 hover:border-blue-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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
      <section id="industries-serve" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 py-24 relative z-10">
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

                <div className="pt-8 mt-8 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
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
      <section id="tech-powering" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 py-24 relative z-10">
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
                ? 'We write clean, well-tested code in strict frontend, backend, design, and AI automation stacks.' 
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
          14. AWARDS & CERTIFICATIONS (Future-ready Certificates Wall)
         ======================================================== */}
      <section id="awards-certifications" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'VERIFIED EXPERTISE' : 'যাচাইকৃত সনদপত্র'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Awards & Professional Certifications' : 'আমাদের অর্জন ও পেশাদার সার্টিফিকেটসমূহ'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {awardsList.map((aw, i) => (
              <div key={i} className="group border border-neutral-100/70 bg-white dark:bg-[#141414] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-black text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">{aw.title}</span>
                  <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">{aw.issuer}</span>
                </div>
              </div>
            ))}
          </div>
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
          16. COMMUNITY & INNOVATION (Contributions)
         ======================================================== */}
      <section id="community-contributions" className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/20 py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {currentLang === 'en' ? 'COMMUNITY & IMPACT' : 'সামাজিক অবদান ও উদ্ভাবন'}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Our Contributions To Open Source & Technology' : 'প্রযুক্তি এবং তরুণদের দক্ষ করার জন্য আমাদের প্রয়াস'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {communityContributions.map((c, i) => (
              <div key={i} className="border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded border border-blue-100/50">
                    {c.metric}
                  </span>
                  <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white pt-1">
                    {currentLang === 'en' ? c.titleEn : c.titleBn}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed font-normal">
                    {currentLang === 'en' ? c.descEn : c.descBn}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-50 dark:border-neutral-800 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                  <span>Next Solution Impact</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                </div>
              </div>
            ))}
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
