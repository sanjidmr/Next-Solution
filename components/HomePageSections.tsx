"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle, ChevronRight, HelpCircle, Star, Quote, 
  Sparkles, Layers, Cpu, ShieldCheck, Heart, ArrowUpRight, Code, 
  MessageSquare, Shield, Megaphone, Smartphone, Globe, Zap, 
  Users, Calendar, BarChart3, TrendingUp, Award, Clock, ArrowLeft, 
  Check, Mail, Send, Activity, Play, Plus, Trash2, Edit2,
  ShoppingCart, Palette, Search, Clapperboard, Bot,
  Target, Handshake, MapPin, Truck, Briefcase, Rocket
} from 'lucide-react';

import { translations } from '@/data/translations';
import TrustedByMarquee from '@/components/motion/TrustedByMarquee';
import HorizontalServices from '@/components/motion/HorizontalServices';
import StackingCards from '@/components/motion/StackingCards';
import RevealGuard from '@/components/motion/RevealGuard';
import { 
  getSettings, getClientLogos, getSuccessStories, 
  getTestimonials, getBlogs,
  addSubscriber, getWhyChooseUsCards, getWhyChooseUsStats, 
  getWhyChooseUsBadges, getWhyChooseUsTechs, getWhyChooseUsCTA,
  getProcessSteps, getProcessCTA, getTechServiceCards
} from '@/lib/db';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { 
  Service, PortfolioItem, BlogPost, Testimonial, SuccessStory, 
  ClientLogo, WhyChooseUsCard, WhyChooseUsStat, 
  WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA, ProcessStep, ProcessCTA, TechServiceCard
} from '@/types';

const IconHelper = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Layers': return <Layers className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Compass': return <Globe className={className} />;
    case 'MessageSquare': return <MessageSquare className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Activity': return <Activity className={className} />;
    default: return <Sparkles className={className} />;
  }
};

const ecosystemServices = [
  { id: 'eco-1', icon: 'TrendingUp', labelEn: 'Business Growth', labelBn: 'ব্যবসায়িক প্রবৃদ্ধি', descEn: 'Direct scale & conversion focus.', descBn: 'সরাসরি প্রবৃদ্ধি ও সেলস বৃদ্ধি।' },
  { id: 'eco-2', icon: 'Globe', labelEn: 'Website Development', labelBn: 'ওয়েবসাইট ডেভেলপমেন্ট', descEn: 'High performance React & Next.js.', descBn: 'উচ্চ ক্ষমতার রিয়্যাক্ট ও নেক্সট.জেএস।' },
  { id: 'eco-3', icon: 'Code', labelEn: 'Web Apps', labelBn: 'ওয়েব অ্যাপ্লিকেশন', descEn: 'Custom full-stack cloud SaaS.', descBn: 'কাস্টম ফুল-স্ট্যাক ক্লাউড ওয়েব অ্যাপ।' },
  { id: 'eco-4', icon: 'Layers', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স ডিজাইন', descEn: 'Awwwards-winning interfaces.', descBn: 'অ্যাওয়ার্ড-উইনিং প্রিমিয়াম ডিজাইন।' },
  { id: 'eco-5', icon: 'Activity', labelEn: 'Digital Marketing', labelBn: 'ডিজিটাল মার্কেটিং', descEn: 'Data-driven growth & ads.', descBn: 'ডাটা-চালিত গ্রোথ ও বিজ্ঞাপন।' },
  { id: 'eco-6', icon: 'Zap', labelEn: 'SEO Optimization', labelBn: 'এসইও অপ্টিমাইজেশন', descEn: 'Organic search performance.', descBn: 'সার্চ ইঞ্জিনে অর্গানিক ট্রাফিক।' },
  { id: 'eco-7', icon: 'Sparkles', labelEn: 'AI Services', labelBn: 'এআই সার্ভিস', descEn: 'Smart agents & workflows.', descBn: 'বুদ্ধিমান এআই এজেন্ট ও ওয়ার্কফ্লো।' },
  { id: 'eco-8', icon: 'Play', labelEn: 'Video Editing', labelBn: 'ভিডিও এডিটিং', descEn: 'High-retention video stories.', descBn: 'আকর্ষণীয় ও রিটেনশন-ভিত্তিক ভিডিও।' },
  { id: 'eco-9', icon: 'Award', labelEn: 'Branding', labelBn: 'ব্র্যান্ডিং', descEn: 'Unforgettable digital identities.', descBn: 'স্মরণীয় ও আকর্ষণীয় ডিজিটাল ব্র্যান্ড।' },
  { id: 'eco-10', icon: 'Cpu', labelEn: 'Cloud Solutions', labelBn: 'ক্লাউড সলিউশনস', descEn: 'Scalable AWS & Vercel setups.', descBn: 'স্কেলেবল ক্লাউড সেটআপ ও ডেপ্লয়মেন্ট।' },
  { id: 'eco-11', icon: 'Activity', labelEn: 'Performance Opt.', labelBn: 'পারফরম্যান্স অপ্টিমাইজেশন', descEn: 'Sub-second paint speeds.', descBn: '০.১ সেকেন্ডে লোডিং স্পিড নিশ্চিতকরণ।' },
  { id: 'eco-12', icon: 'Shield', labelEn: 'Enterprise Security', labelBn: 'এন্টারপ্রাইজ সিকিউরিটি', descEn: 'Bank-grade encryptions.', descBn: 'ব্যাংক-গ্রেড সর্বোচ্চ নিরাপত্তা।' },
];

const journeySteps = [
  { step: '01', titleEn: 'Idea', titleBn: 'আইডিয়া', descEn: 'We brainstorm your vision.', descBn: 'আপনার ভিশন ব্রেইনস্টর্ম।' },
  { step: '02', titleEn: 'Strategy', titleBn: 'কৌশল', descEn: 'Competitor & market audit.', descBn: 'প্রতিদ্বন্দী ও মার্কেট অডিট।' },
  { step: '03', titleEn: 'Design', titleBn: 'ডিজাইন', descEn: 'Aesthetic, premium prototyping.', descBn: 'নান্দনিক প্রিমিয়াম প্রোটোটাইপিং।' },
  { step: '04', titleEn: 'Development', titleBn: 'ডেভেলপমেন্ট', descEn: 'Clean, robust code scaling.', descBn: 'নিখুঁত ও শক্তিশালী কোডিং।' },
  { step: '05', titleEn: 'Launch', titleBn: 'লঞ্চ', descEn: 'Rigorous checklists & server deployment.', descBn: 'নিখুঁত চেকলিস্ট ও ডেপ্লয়মেন্ট।' },
  { step: '06', titleEn: 'Growth', titleBn: 'প্রবৃদ্ধি', descEn: 'Measurable SEO, leads & conversions.', descBn: 'পরিমাপযোগ্য এসইও ও লিড।' }
];

const AnimatedCounter = ({ value, label }: { value: string; label: string; key?: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (end === 0) {
      // Non-numeric stats like "Bespoke" or "Zero-Risk"
      return;
    }
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="flex flex-col p-4 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 shadow-sm text-center">
      <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {numericValue > 0 ? `${count}${suffix}` : value}
      </span>
      <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mt-2">
        {label}
      </p>
    </div>
  );
};

const EcosystemFlowVisual = ({ currentLang }: { currentLang: 'en' | 'bn' }) => {
  return (
    <div className="mt-4 p-3.5 bg-neutral-50/70 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800 rounded-xl space-y-2.5 text-[10px] font-mono">
      <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-500">
        <span>{currentLang === 'en' ? 'Lifecycle pipeline' : 'লাইফসাইকেল পাইপলাইন'}</span>
        <span className="text-emerald-500 dark:text-emerald-400 animate-pulse flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 inline-block animate-ping"></span>
          {currentLang === 'en' ? 'Active sync' : 'অ্যাক্টিভ সিঙ্ক'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1 pt-1">
        {[
          { labelEn: 'Strategy', labelBn: 'কৌশল', color: 'bg-blue-500 dark:bg-orange-500' },
          { labelEn: 'Design', labelBn: 'ডিজাইন', color: 'bg-indigo-500' },
          { labelEn: 'Code', labelBn: 'ডেভেলপ', color: 'bg-purple-500' },
          { labelEn: 'Growth', labelBn: 'এসইও', color: 'bg-emerald-500' }
        ].map((node, nIdx) => (
          <React.Fragment key={nIdx}>
            {nIdx > 0 && <span className="text-neutral-300 dark:text-neutral-600 animate-pulse text-xs">➔</span>}
            <div className="flex flex-col items-center flex-1">
              <span className={`w-2 h-2 rounded-full ${node.color} shadow-sm`}></span>
              <span className="text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 mt-1 scale-90">{currentLang === 'en' ? node.labelEn : node.labelBn}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const GrowthChartVisual = ({ currentLang }: { currentLang: 'en' | 'bn' }) => {
  return (
    <div className="mt-4 p-3.5 bg-neutral-50/70 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-800 rounded-xl text-[10px] font-mono space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Conversion multiplier' : 'কনভার্সন প্রবৃদ্ধি'}</span>
        <span className="text-blue-600 dark:text-orange-400 font-bold">+420% ROI</span>
      </div>
      <div className="flex items-end justify-between h-11 pt-2 px-2 gap-2">
        {[
          { val: '30%', label: 'Q1' },
          { val: '45%', label: 'Q2' },
          { val: '70%', label: 'Q3' },
          { val: '100%', label: 'Q4' }
        ].map((bar, bIdx) => (
          <div key={bIdx} className="flex flex-col items-center flex-1 space-y-1">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-t-sm h-7 relative overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 dark:from-orange-500 to-indigo-500 rounded-t-sm transition-all duration-1000" 
                style={{ height: bar.val }}
              ></div>
            </div>
            <span className="text-[8px] text-neutral-400 dark:text-neutral-500">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIConsoleSimulator = ({ currentLang }: { currentLang: 'en' | 'bn' }) => {
  const [consoleStep, setConsoleStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConsoleStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-96 bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 font-mono text-[9px] text-neutral-300 dark:text-neutral-600 space-y-2.5 shadow-2xl relative overflow-hidden shrink-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
          <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
          <span className="text-[8px] pl-1 text-neutral-400 dark:text-neutral-500">agent-console v1.2</span>
        </div>
        <span className="text-[8px] text-purple-400 dark:text-purple-300">● LIVE RUNNING</span>
      </div>

      {/* Input */}
      <div className="space-y-1">
        <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">user@nextsolution:~$</span>
        <span className="text-white font-medium pl-1">
          {currentLang === 'en' ? 'optimize conversion funnel and automate email sequence' : 'কনভার্সন ফানেল অপ্টিমাইজ ও ইমেইল সিকোয়েন্স সেট করো'}
        </span>
      </div>

      {/* Stream output */}
      <div className="space-y-1 min-h-[50px] transition-all duration-300">
        {consoleStep >= 0 && (
          <div className="flex items-center space-x-1.5 text-blue-400 dark:text-orange-300">
            <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">➔</span>
            <span>{currentLang === 'en' ? 'Initializing Gemini-2.5-Flash model...' : 'জেমিনি ২.৫ মডেল ইনিশিয়াল করা হচ্ছে...'}</span>
          </div>
        )}
        {consoleStep >= 1 && (
          <div className="flex items-center space-x-1.5 text-purple-400 dark:text-purple-300">
            <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">➔</span>
            <span>{currentLang === 'en' ? 'Scanning funnel drop-off points... (Found 37% friction)' : 'ফানেল ড্রপ-অফ পয়েন্ট স্ক্যান করা হচ্ছে...'}</span>
          </div>
        )}
        {consoleStep >= 2 && (
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">✔</span>
            <span>{currentLang === 'en' ? 'Drafted & integrated 4 tailored drip sequence modules.' : '৪টি ড্রিপ সিকোয়েন্স মডিউল ইন্টিগ্রেট করা হয়েছে।'}</span>
          </div>
        )}
        {consoleStep >= 3 && (
          <div className="flex items-center space-x-1.5 text-indigo-400 dark:text-orange-300 font-bold animate-pulse">
            <span className="text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">★</span>
            <span>{currentLang === 'en' ? 'SLA Optimization: Success rate 100%' : 'এসএলএ অপ্টিমাইজেশন: সফলতার হার ১০০%'}</span>
          </div>
        )}
      </div>

      {/* Neon glowing line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 dark:from-orange-500 via-purple-500 to-pink-500 opacity-80 animate-pulse"></div>
    </div>
  );
};

const renderCardVisual = (stat: string | undefined) => {
  if (!stat) return null;
  const normalizedStat = stat.toUpperCase().trim();

  if (normalizedStat.includes('UP')) {
    return (
      <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-full px-2.5 py-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold tracking-tight">
        <span className="relative flex h-1.5 w-1.5 mr-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('ROI') || normalizedStat.includes('GROWTH')) {
    return (
      <div className="flex items-center space-x-1.5 bg-blue-50 dark:bg-orange-500/10 border border-blue-100 dark:border-orange-500/20 rounded-full px-2.5 py-1 text-blue-600 dark:text-orange-400 text-[10px] font-mono font-bold tracking-tight">
        <TrendingUp className="h-3 w-3 text-blue-500 dark:text-orange-400 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('NEXT-GEN') || normalizedStat.includes('AI')) {
    return (
      <div className="flex items-center space-x-1.5 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-full px-2.5 py-1 text-purple-600 dark:text-purple-400 dark:text-purple-300 text-[10px] font-mono font-bold tracking-tight">
        <Cpu className="h-3 w-3 text-purple-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('SLA') || normalizedStat.includes('SUPPORT')) {
    return (
      <div className="flex items-center space-x-1.5 bg-indigo-50 dark:bg-orange-500/10 border border-indigo-100 dark:border-orange-500/20 rounded-full px-2.5 py-1 text-indigo-600 dark:text-orange-400 text-[10px] font-mono font-bold tracking-tight">
        <Clock className="h-3 w-3 text-indigo-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('MVP') || normalizedStat.includes('FAST')) {
    return (
      <div className="flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-full px-2.5 py-1 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-bold tracking-tight">
        <Zap className="h-3 w-3 text-amber-500 dark:text-amber-400 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('BESPOKE') || normalizedStat.includes('CUSTOM')) {
    return (
      <div className="flex items-center space-x-1.5 bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 rounded-full px-2.5 py-1 text-pink-600 dark:text-pink-400 text-[10px] font-mono font-bold tracking-tight">
        <Layers className="h-3 w-3 text-pink-500 dark:text-pink-400" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('ZERO') || normalizedStat.includes('RISK')) {
    return (
      <div className="flex items-center space-x-1.5 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 rounded-full px-2.5 py-1 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold tracking-tight">
        <ShieldCheck className="h-3 w-3 text-cyan-500 dark:text-cyan-400" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('CORE') || normalizedStat.includes('PARTNER')) {
    return (
      <div className="flex items-center space-x-1.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-full px-2.5 py-1 text-rose-600 dark:text-rose-400 text-[10px] font-mono font-bold tracking-tight">
        <Heart className="h-3 w-3 text-rose-500 dark:text-rose-400 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  return (
    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-1 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 border border-neutral-100 dark:border-neutral-800">
      {stat}
    </span>
  );
};

interface HomePageSectionsProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  portfolioData?: PortfolioItem[];
}

export default function HomePageSections({ currentLang, setTab, portfolioData }: HomePageSectionsProps) {
  const t = translations[currentLang];
  const settings = getSettings();

  // Load dynamic content from database
  const rawLogos = getClientLogos();
  // Filter or fall back to defaults if logos are empty
  

  const rawSuccessStories = getSuccessStories();
  const successStories = rawSuccessStories.length > 0 ? rawSuccessStories : [
    {
      id: 'story-1',
      clientName: 'Sarah Jenkins',
      companyName: 'Fintech Spark Inc.',
      industryEn: 'Finance & Banking',
      industryBn: 'অর্থসংস্থান ও ব্যাংকিং',
      serviceEn: 'Secure Web Dashboard Redesign',
      serviceBn: 'সিকিউর ওয়েব ড্যাশবোর্ড রিডিজাইন',
      backgroundEn: 'Fintech Spark is a leading digital trading platform serving over 50,000 active retail investors globally.',
      backgroundBn: 'ফিনটেক স্পার্ক একটি নেতৃস্থানীয় ডিজিটাল ট্রেডিং প্ল্যাটফর্ম যা বিশ্বব্যাপী ৫০,০০০-এরও বেশি সক্রিয় খুচরা বিনিয়োগকারীদের পরিষেবা প্রদান করে।',
      challengeEn: 'Their existing legacy dashboard suffered from high user drop-off rates due to slow layout rendering speeds and complex multi-step transaction steps.',
      challengeBn: 'তাদের বিদ্যমান ড্যাশবোর্ডটি ধীর গতির লোডিং এবং জটিল লেনদেন ধাপের কারণে উচ্চ কাস্টমার ড্রপ-অফ রেটের মুখোমুখি হয়েছিল।',
      solutionEn: 'We engineered a flat-compiled React-based dashboard styled with Tailwind CSS, utilizing direct optimized state caching and strict zero-layout shift guidelines.',
      solutionBn: 'আমরা টেলউইন্ড সিএসএস দ্বারা একটি ফ্ল্যাট-কম্পাইলড রিয়্যাক্ট-ভিত্তিক ড্যাশবোর্ড তৈরি করেছি, যা ডেটা ক্যাশিং এবং জিরো-লেআউট শিফট প্রযুক্তি ব্যবহার করে।',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase'],
      timelineEn: '8 Weeks',
      timelineBn: '৮ সপ্তাহ',
      resultsEn: 'The site response time dropped below 300ms, and user transactions increased by 35% within the first month. The project was delivered 3 weeks early.',
      resultsBn: 'সাইটের রেসপন্স টাইম ৩০০ মিলি-সেকেন্ডের নিচে নেমে এসেছে এবং প্রথম মাসেই গ্রাহক লেনদেন ৩৫% বৃদ্ধি পেয়েছে। পুরো প্রজেক্টটি ৩ সপ্তাহ আগেই সম্পন্ন করা হয়েছে।',
      beforeImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      clientQuoteEn: 'Next Solution operates on an entirely different level of design sophistication. They delivered our secure banking dashboard 3 weeks ahead of schedule and our speed stats blew past our competitors.',
      clientQuoteBn: 'নেক্সট সলিউশন সম্পূর্ণ ভিন্ন স্তরের ডিজাইন পরিশীলিততায় কাজ করে। তারা আমাদের নির্ধারিত সময়ের ৩ সপ্তাহ আগেই সিকিউর ব্যাংকিং ড্যাশবোর্ড সরবরাহ করেছে এবং সাইটের স্পিড প্রতিদ্বন্দ্বীদের ছাড়িয়ে গেছে।',
      clientRoleEn: 'VP of Digital Experience',
      clientRoleBn: 'ভিপি অফ ডিজিটাল এক্সপেরিয়েন্স',
      clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      featured: true
    }
  ];

  const testimonials = getTestimonials();
  const blogs = getBlogs().filter(b => b.status === 'published');
  const portfolio = portfolioData ?? [];

  const whyChooseUsCards = getWhyChooseUsCards().filter(c => c.visible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  const whyChooseUsStats = getWhyChooseUsStats().filter(s => s.visible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  const whyChooseUsBadges = getWhyChooseUsBadges().filter(b => b.visible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  const whyChooseUsTechs = getWhyChooseUsTechs().filter(t => t.visible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  const whyChooseUsCTA = getWhyChooseUsCTA();

  const processSteps = getProcessSteps().filter(s => s.visible !== false).sort((a, b) => a.displayOrder - b.displayOrder);
  const processCTA = getProcessCTA();

  const techServiceCards = getTechServiceCards()
    .filter(c => c.visible !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Home page services showcase (deep-links into /services detail view)
  const homeServices = [
    { slug: 'product-innovation', icon: Rocket, title: 'Product & Business Innovation', desc: 'End-to-end product strategy, MVP development and business model innovation that turns ideas into market-ready digital products.', techs: ['Product Strategy', 'MVP Development', 'Market Research', 'Agile'], popular: ['MVP Development', 'Product Strategy', 'Business Model Design'], benefits: ['Faster time-to-market', 'Reduced development risk'] },
    { slug: 'creative-content', icon: Sparkles, title: 'Creative Content & Visual Storytelling', desc: 'Cinematic video production, motion graphics and brand storytelling that captivates audiences and drives engagement.', techs: ['Premiere Pro', 'After Effects', 'Cinema 4D', 'Motion FX'], popular: ['Brand Videos', 'Social Media Content', 'Motion Graphics'], benefits: ['Higher audience engagement', 'Memorable brand presence'] },
    { slug: 'marketing-pr', icon: Megaphone, title: 'Marketing, PR & Brand Strategy', desc: 'Full-service brand strategy, public relations and performance marketing that amplifies your brand across every channel.', techs: ['Brand Strategy', 'PR Campaigns', 'Meta Ads', 'Google Ads'], popular: ['Brand Strategy', 'PR Campaigns', 'Performance Marketing'], benefits: ['Amplified brand reach', 'Measurable marketing ROI'] },
    { slug: 'web-development', icon: Code, title: 'Web Development', desc: 'High-converting, blazing-fast websites and portals built to scale your business.', techs: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'WordPress', 'Shopify'], popular: ['Business & Corporate Sites', 'Multi-Vendor E-Commerce', 'Custom CMS Portals'], benefits: ['Blazing-fast load speeds', 'Pixel-perfect responsive design'] },
    { slug: 'digital-marketing', icon: Megaphone, title: 'Digital Marketing', desc: 'Data-driven campaigns that generate leads and maximize marketing ROI.', techs: ['Meta Ads', 'Google Ads', 'Email Automation', 'Analytics'], popular: ['Social Media Campaigns', 'Lead Funnels', 'Email Marketing'], benefits: ['Measurable lead growth', 'Maximized ad ROI'] },
    { slug: 'seo', icon: Search, title: 'SEO Optimization', desc: 'Dominate Google with technical SEO, on-page mastery and authority links.', techs: ['Technical SEO', 'Keyword Research', 'Link Building', 'Local SEO'], popular: ['Site Audits', 'On-Page Optimization', 'Local Map SEO'], benefits: ['Higher organic rankings', 'Long-term traffic growth'] },
    { slug: 'graphic-design', icon: Palette, title: 'Branding & Graphic Design', desc: 'Complete brand identities and visuals that make you unforgettable.', techs: ['Adobe Photoshop', 'Illustrator', 'Brand Identity', 'Print Design'], popular: ['Logo & Identity', 'Social Media Graphics', 'Flyers & Brochures'], benefits: ['Memorable brand presence', 'Professional visual assets'] },
    { slug: 'video-editing', icon: Clapperboard, title: 'Content & Video Production', desc: 'Cinematic reels, ads and videos engineered to stop the scroll.', techs: ['Premiere Pro', 'After Effects', 'Color Grading', 'Motion FX'], popular: ['Reels & Shorts', 'Corporate Promos', 'Video Ads'], benefits: ['Viral-ready content', 'High-retention edits'] },
    { slug: 'ai-automation', icon: Cpu, title: 'AI Services / AI Solutions', desc: 'Custom AI agents and workflows that sell, support and save time 24/7.', techs: ['OpenAI', 'Gemini', 'Claude', 'n8n', 'Make'], popular: ['AI Support Bots', 'Workflow Automation', 'AI Voice Agents'], benefits: ['Round-the-clock automation', 'Reduced operating costs'] },
  ];

  const openService = (slug: string) => {
    sessionStorage.setItem('selected_service_slug', slug);
    setTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // States for interactive components
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('All');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [hoveredEcosystem, setHoveredEcosystem] = useState<any>(null);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  // Horizontal scroll ref for featured portfolio row
  const portfolioRowRef = useRef<HTMLDivElement>(null);
  const scrollPortfolioRow = (direction: 'left' | 'right') => {
    const el = portfolioRowRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  // Auto scroll testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    if (!newsletterEmail.trim()) {
      setNewsletterError(currentLang === 'en' ? 'Please enter a valid email.' : 'অনুগ্রহ করে একটি সঠিক ইমেল প্রদান করুন।');
      return;
    }
    const success = addSubscriber(newsletterEmail);
    if (success) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    } else {
      setNewsletterError(currentLang === 'en' ? 'You are already subscribed!' : 'আপনি ইতিমধ্যে সাবস্ক্রাইব করেছেন!');
    }
  };

  // Helper to translate icon names to components
  const renderLucideIcon = (name: string, className = "h-5 w-5") => {
    const iconsMap: { [key: string]: any } = {
      ArrowRight, CheckCircle, ChevronRight, HelpCircle, Star, Quote, 
      Sparkles, Layers, Cpu, ShieldCheck, Heart, ArrowUpRight, Code, 
      MessageSquare, Shield, Megaphone, Smartphone, Globe, Zap, 
      Users, Calendar, BarChart3, TrendingUp, Award, Clock,
      ShoppingCart, MapPin, Truck, Briefcase
    };
    const IconComp = (name && Object.prototype.hasOwnProperty.call(iconsMap, name)) ? iconsMap[name] : Globe;
    return <IconComp className={className} />;
  };

  // Filter portfolio items
  const filteredPortfolio = portfolio.filter((item) => {
    if (activePortfolioFilter === 'All') return true;
    return item.category === activePortfolioFilter;
  });

  const portfolioCategories = [
    'All', 
    'Web Development', 
    'UI/UX Design', 
    'Graphic Design', 
    'Video Editing', 
    'Digital Marketing', 
    'SEO', 
    'AI Services'
  ];

  const getPortfolioCategoryLabel = (cat: string) => {
    if (currentLang === 'bn') {
      switch (cat) {
        case 'All': return 'সব কাজ';
        case 'Web Development': return 'ওয়েব ডেভেলপমেন্ট';
        case 'UI/UX Design': return 'ইউআই/ইউএক্স ডিজাইন';
        case 'Graphic Design': return 'গ্রাফিক ডিজাইন';
        case 'Video Editing': return 'ভিডিও এডিটিং';
        case 'Digital Marketing': return 'ডিজিটাল মার্কেটিং';
        case 'SEO': return 'এসইও';
        case 'AI Services': return 'এআই সার্ভিস';
        default: return cat;
      }
    }
    return cat === 'All' ? 'All Work' : cat;
  };

  // Static Details for Industries (Section 8)
  const industries = [
    { id: 'ind-1', nameEn: 'E-Commerce & Retail', nameBn: 'ই-কমার্স ও রিটেইল', descEn: 'Digital experiences that turn visitors into loyal customers.', descBn: 'ডিজিটাল অভিজ্ঞতা যা ভিজিটরদের অনুগত কাস্টমারে রূপান্তর করে।', image: '/industry1.jpg', icon: 'ShoppingCart' },
    { id: 'ind-2', nameEn: 'Technology & SaaS', nameBn: 'প্রযুক্তি ও স্যাস', descEn: 'Scalable platforms built for the future of software.', descBn: 'সফটওয়্যারের ভবিষ্যতের জন্য স্কেলেবল প্ল্যাটফর্ম।', image: '/industry2.jpg', icon: 'Cpu' },
    { id: 'ind-3', nameEn: 'Healthcare', nameBn: 'স্বাস্থ্যসেবা', descEn: 'Secure, compliant systems that improve patient outcomes.', descBn: 'নিরাপদ, কমপ্লায়েন্ট সিস্টেম যা রোগীদের ফলাফল উন্নত করে।', image: '/industry3.jpg', icon: 'Heart' },
    { id: 'ind-4', nameEn: 'Finance & FinTech', nameBn: 'ফিনান্স ও ফিনটেক', descEn: 'Intelligent financial platforms with bank-grade security.', descBn: 'ব্যাংক-গ্রেড নিরাপত্তাসহ বুদ্ধিমান ফিনান্সিয়াল প্ল্যাটফর্ম।', image: '/industry4.jpg', icon: 'ShieldCheck' },
    { id: 'ind-5', nameEn: 'Real Estate', nameBn: 'রিয়েল এস্টেট', descEn: 'Immersive property experiences that drive bookings.', descBn: 'বুকিং বৃদ্ধির জন্য ইমারসিভ প্রোপার্টি অভিজ্ঞতা।', image: '/industry5.jpg', icon: 'Layers' },
    { id: 'ind-6', nameEn: 'Education & E-Learning', nameBn: 'শিক্ষা ও ই-লার্নিং', descEn: 'Engaging learning platforms that educate and inspire.', descBn: 'শিক্ষাদান ও অনুপ্রেরণামূলক লার্নিং প্ল্যাটফর্ম।', image: '/industry6.jpg', icon: 'Globe' },
    { id: 'ind-7', nameEn: 'Travel & Hospitality', nameBn: 'ভ্রমণ ও হসপিটালিটি', descEn: 'Seamless booking journeys for the modern traveler.', descBn: 'আধুনিক ভ্রমণকারীদের জন্য সুগম বুকিং যাত্রা।', image: '/industry7.jpg', icon: 'MapPin' },
    { id: 'ind-8', nameEn: 'Logistics & Transportation', nameBn: 'লজিস্টিকস ও পরিবহন', descEn: 'Real-time tracking and optimized supply chain systems.', descBn: 'রিয়েল-টাইম ট্র্যাকিং ও অপ্টিমাইজড সাপ্লাই চেইন সিস্টেম।', image: '/industry8.jpg', icon: 'Truck' },
    { id: 'ind-9', nameEn: 'Professional Services', nameBn: 'পেশাদার সেবা', descEn: 'Digital-first solutions for modern consulting firms.', descBn: 'আধুনিক কনসালটিং ফার্মের জন্য ডিজিটাল-ফার্স্ট সলিউশন।', image: '/industry9.jpg', icon: 'Briefcase' },
  ];

  // Static Details for Technologies (Section 9)
  const techCategories = [
    {
      nameEn: 'Frontend Frameworks',
      nameBn: 'ফ্রন্টএন্ড ফ্রেমওয়ার্ক',
      techs: [
        { name: 'Next.js', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-zinc-50' },
        { name: 'React', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/5 dark:bg-orange-500/50' },
        { name: 'TypeScript', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/30 dark:bg-orange-500/5' },
        { name: 'Tailwind CSS', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=100', bg: 'bg-sky-50/50' }
      ]
    },
    {
      nameEn: 'Backend & Core Storage',
      nameBn: 'ব্যাকএন্ড ও কোর স্টোরেজ',
      techs: [
        { name: 'Node.js', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=100', bg: 'bg-green-50/30' },
        { name: 'PostgreSQL', url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/40 dark:bg-orange-500/5' },
        { name: 'Supabase', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-emerald-50/40' },
        { name: 'Prisma ORM', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=100', bg: 'bg-zinc-50' }
      ]
    },
    {
      nameEn: 'AI Services',
      nameBn: 'এআই সার্ভিস',
      techs: [
        { name: 'Gemini AI', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100', bg: 'bg-indigo-50/5 dark:bg-orange-500/50' },
        { name: 'LangChain', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-amber-50/30' },
        { name: 'Python Scripts', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-yellow-50/30' },
        { name: 'Trigger.dev', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100', bg: 'bg-violet-50/30 dark:bg-orange-500/5' }
      ]
    }
  ];


  return (
    <div data-space-page className="space-y-8">
      {/* ========================================================
          SECTION 9: OUR SERVICES — HORIZONTAL SCROLL STORYTELLING
         ======================================================== */}
      <section id="technologies" className="stack-cover relative bg-white dark:bg-[#0A0A0A]">
        <HorizontalServices
          currentLang={currentLang}
          services={homeServices}
          onSelect={openService}
        />
      </section>

      {/* ========================================================
          TRUSTED BY INDUSTRY LEADERS — right beneath Our Services
         ======================================================== */}
      <section id="trusted-by" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <TrustedByMarquee currentLang={currentLang} />
      </section>

      {/* ========================================================
          SECTION: WHY CHOOSE US (PREMIUM WORLD-CLASS DESIGN)
         ======================================================== */}
<section id="why-choose-us" className="relative overflow-hidden bg-white dark:bg-[#0B0A08] dark:bg-gradient-to-b dark:from-[#0C0A08] dark:via-[#13100C] dark:to-[#090807] text-neutral-900 dark:text-white">

        {/* Ambient warm glow - dark mode only (behind the visual) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[720px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.14] dark:bg-orange-500/[0.10] blur-[130px] hidden dark:block"></div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent dark:bg-[#FF4A00]/[0.06] blur-[160px] hidden dark:block"></div>

        {/* Subtle orange dotted patterns - upper left & upper right */}
        <div className="pointer-events-none absolute -left-8 top-16 h-40 w-40 opacity-60 dark:opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,77,0,0.35) 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        <div className="pointer-events-none absolute -right-8 top-24 h-40 w-40 opacity-60 dark:opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,77,0,0.35) 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

        {/* Subtle abstract wave shapes - bottom corners */}
        <div className="pointer-events-none absolute -bottom-28 -left-32 h-[340px] w-[420px] rounded-[45%_55%_60%_40%] bg-orange-50/70 dark:bg-orange-500/15 blur-2xl"></div>
        <div className="pointer-events-none absolute -bottom-28 -right-32 h-[340px] w-[420px] rounded-[55%_45%_40%_60%] bg-neutral-100/80 dark:bg-orange-400/[0.07] blur-2xl"></div>

        <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

          {/* Centered header */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-orange-600 dark:text-orange-400">
                {currentLang === 'en' ? 'Why Choose Us' : 'কেন আমাদের বেছে নেবেন'}
              </span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-neutral-900 dark:text-white">
              {currentLang === 'en' ? (
                <>More Than a Service,<br /> We're Your <span className="text-orange-600 dark:text-orange-400">Growth Partner.</span></>
              ) : (
                <>শুধু সেবা নয়,<br /> আমরা আপনার <span className="text-orange-600 dark:text-orange-400">গ্রোথ পার্টনার।</span></>
              )}
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
              {currentLang === 'en'
                ? 'A complete digital partner that brings strategy, design and technology together — built around your goals, powered by results.'
                : 'স্ট্র্যাটেজি, ডিজাইন ও টেকনোলজি একসাথে আনা একটি সম্পূর্ণ ডিজিটাল পার্টনার — আপনার লক্ষ্যকে কেন্দ্র করে, ফলাফলে চালিত।'}
            </p>
          </div>

{/* Main visual - chose.png (complete center visual + surrounding cards) */}
          <RevealGuard
            initial={{ opacity: 0, x: 160, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            fallbackMs={1200}
            amount={0.18}
            className="mt-8 sm:mt-10 lg:mt-12 flex justify-end"
          >
            <div className="mx-auto max-w-[1250px] animate-[ns-float_7s_ease-in-out_infinite]">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-200/40 dark:border-white/10 shadow-2xl shadow-orange-500/10">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
                <img
                  src="/chose.png"
                  alt="Why choose Next Solution - our team and capabilities"
                  className="w-full h-auto select-none"
                  width={1536}
                  height={1024}
                  draggable={false}
                />
              </div>
            </div>
          </RevealGuard>

        </div>
      </section>


      {/* ========================================================
          SECTION 6: OUR PROCESS (STICKY STACKING CARDS)
         ======================================================== */}
      <section id="our-process" className="relative bg-white dark:bg-[#141414] pt-10 pb-16 sm:pt-12 sm:pb-20">
        {/* Ambient Gradient Background Orbs — clipped in their own wrapper so
            the section itself never becomes a scroll container (which would
            break the sticky stacking-card pin) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-50/40 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-indigo-50/30 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
          
          {/* Header — pinned together with the stacking deck */}
          <StackingCards
            currentLang={currentLang}
            steps={processSteps}
            header={
              <>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100 dark:border-orange-500/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span suppressHydrationWarning>{currentLang === 'en' ? processCTA.titleEn : processCTA.titleBn}</span>
                </span>
                <h2 suppressHydrationWarning className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {currentLang === 'en' ? processCTA.highlightEn : processCTA.highlightBn}
                </h2>
                <p suppressHydrationWarning className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                  {currentLang === 'en' ? processCTA.subtitleEn : processCTA.subtitleBn}
                </p>
              </>
            }
          />

          {/* Interactive Flow Indicator Line (Idea -> Build -> Launch -> Grow) */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 p-6 shadow-inner space-y-4">
            <span className="block text-center font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-[9px]">
              {currentLang === 'en' ? 'Digital Lifecycle Pipeline' : 'ডিজিটাল লাইফসাইকেল পাইপলাইন'}
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-3 items-center text-center">
              {[
                { labelEn: '1. Idea', labelBn: '১. আইডিয়া', color: 'from-blue-500 dark:from-orange-500 to-indigo-500' },
                { labelEn: '2. Research', labelBn: '২. রিসার্চ', color: 'from-indigo-500 to-indigo-600 dark:to-orange-400' },
                { labelEn: '3. Strategy', labelBn: '৩. পরিকল্পনা', color: 'from-indigo-600 dark:from-orange-500 to-violet-500' },
                { labelEn: '4. Design', labelBn: '৪. ডিজাইন', color: 'from-violet-500 to-violet-600' },
                { labelEn: '5. Build', labelBn: '৫. ডেভেলপমেন্ট', color: 'from-violet-600 to-purple-500' },
                { labelEn: '6. Test', labelBn: '৬. টেস্টিং', color: 'from-purple-500 to-purple-600' },
                { labelEn: '7. Launch', labelBn: '৭. ডেপ্লয়', color: 'from-purple-600 to-fuchsia-500' },
                { labelEn: '8. Optimize', labelBn: '৮. অপ্টিমাইজ', color: 'from-fuchsia-500 to-rose-500' },
                { labelEn: '9. Grow', labelBn: '৯. প্রবৃদ্ধি', color: 'from-rose-500 to-emerald-500' }
              ].map((flow, fIdx) => (
                <div key={fIdx} className="space-y-1.5 group flex flex-col items-center">
                  <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${flow.color} opacity-85 group-hover:scale-y-125 transition-transform duration-200`}></div>
                  <span className="text-[10px] font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500 group-hover:text-gray-900 dark:text-white transition-colors">
                    {currentLang === 'en' ? flow.labelEn : flow.labelBn}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400 dark:text-neutral-500 italic">
              {currentLang === 'en' 
                ? "Every project undergoes our complete digital optimization lifecycle, ensuring bulletproof execution."
                : "প্রতিটি প্রজেক্ট আমাদের সম্পূর্ণ ডিজিটাল অপ্টিমাইজেশন চক্রের মধ্য দিয়ে যায়, যা বুলেটপ্রুফ কার্যকারিতা নিশ্চিত করে।"}
            </p>
          </div>

          {/* Trust Text */}
          <p className="text-center text-xs text-gray-400 dark:text-neutral-500 font-medium">
            {currentLang === 'en'
              ? '🔒 Managed via premium milestone contracts with real-time project management dashboards.'
              : '🔒 রিয়েল-টাইম প্রজেক্ট ড্যাশবোর্ড ট্র্যাকিং এবং মাইলস্টোন-ভিত্তিক বিশ্বস্ত এন্টারপ্রাইজ চুক্তি।'}
          </p>
        </div>
      </section>

{/* ========================================================
          SECTION 7: FEATURED PORTFOLIO (WITH CATEGORY FILTERING)
         ======================================================== */}
      {filteredPortfolio.length > 0 && (
      <section id="featured-portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100/60 dark:border-orange-500/20 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-orange-400"></span>
            {currentLang === 'en' ? 'Case Studies' : 'আমাদের কাজের নমুনা'}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            {currentLang === 'en' ? 'Our Featured Client Deployments' : 'আমাদের তৈরি প্রিমিয়াম কেস স্টাডি সমূহ'}
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
            {currentLang === 'en'
              ? 'Real projects, real results — explore the work we have delivered across industries.'
              : 'বাস্তব প্রজেক্ট, বাস্তব ফলাফল — আমরা বিভিন্ন খাতে যে কাজগুলো করে এসেছি তা দেখুন।'}
          </p>
        </div>

        {/* Layout: left service navbar + right portfolio row */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
{/* Left: Service Navbar (vertical on desktop, compact scroll chips on mobile) */}
          <RevealGuard
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            fallbackMs={900}
            className="lg:sticky lg:top-28 flex lg:flex-col gap-1.5 lg:gap-2 lg:p-2 lg:rounded-2xl lg:bg-white lg:dark:bg-[#141414] lg:border lg:border-neutral-100 lg:dark:border-neutral-800 lg:shadow-sm overflow-x-auto scrollbar-none pb-1 lg:pb-0 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0"
          >
            {portfolioCategories.map((cat) => {
              const isActive = activePortfolioFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActivePortfolioFilter(cat)}
                  className={`flex-shrink-0 lg:w-full flex items-center justify-between gap-2 px-3 py-1.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl text-left text-[11px] lg:text-[13px] font-bold transition duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
                >
                  <span>{getPortfolioCategoryLabel(cat)}</span>
                  {isActive && (
                    <span className="hidden lg:block h-1.5 w-1.5 rounded-full bg-white"></span>
                  )}
                </button>
              );
            })}
          </RevealGuard>

          {/* Right: Portfolio cards in a grid (same size as services cards) */}
          <RevealGuard
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            fallbackMs={1000}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.slice(0, 6).map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    onClick={() => {
                      setTab('portfolio');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
className="group cursor-pointer"
                  >
{/* 1. Image with border (top/right/left) - only image has border */}
                    <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        className="aspect-[16/9] w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Category Badge over Image (top right) */}
                      <div suppressHydrationWarning className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-neutral-800 dark:text-neutral-100 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
                        {getPortfolioCategoryLabel(item.category)}
                      </div>

                      {/* Hover arrow */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white dark:bg-[#0D0D0D] text-neutral-900 dark:text-white rounded-full p-3 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          <ArrowUpRight className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                        </div>
                      </div>
                    </div>

                    {/* 2. Below image: industry + duration, name, description */}
                    <div className="mt-3 space-y-2 px-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-wide">
                        <span suppressHydrationWarning className="font-extrabold uppercase text-orange-500 dark:text-orange-400">
                          {currentLang === 'en' ? item.industryEn || 'Digital Product' : item.industryBn || 'ডিজিটাল প্রোডাক্ট'}
                        </span>
                        <span suppressHydrationWarning className="text-neutral-400 dark:text-neutral-500 font-medium bg-neutral-50 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-800">
                          {item.duration}
                        </span>
                      </div>

                      <h3 suppressHydrationWarning className="font-sans text-base md:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200 leading-snug line-clamp-1">
                        {currentLang === 'en' ? item.titleEn : item.titleBn}
                      </h3>

<p suppressHydrationWarning className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                        {currentLang === 'en' ? item.descriptionEn : item.descriptionBn}
                      </p>
                    </div>

                    {/* 3. Built with tags - orange label */}
<div className="mt-3 pt-3 border-t border-neutral-50 dark:border-neutral-800">
                      <div className="flex items-center space-x-1 mb-1.5">
                        <Code className="h-3 w-3 text-orange-500 dark:text-orange-400" />
                        <span className="text-[9px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-wider font-mono">
                          {currentLang === 'en' ? 'Built with:' : 'যা দিয়ে তৈরি:'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.slice(0, 4).map((tech) => (
                          <span suppressHydrationWarning
                            key={tech}
                            className="rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-700/60 text-[9px] font-bold text-neutral-500 dark:text-neutral-400 font-mono px-2 py-0.5 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </RevealGuard>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => { setTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center space-x-2 rounded-xl border border-gray-200 dark:border-neutral-700 px-6 py-3 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 hover:border-blue-600 hover:bg-gray-50/50 transition cursor-pointer"
          >
            <span>{currentLang === 'en' ? 'Explore Full Portfolio' : 'সম্পূর্ণ পোর্টফোলিও ক্যাটালগ'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
      )}
      {/* ========================================================
          SECTION 8: INDUSTRIES WE SERVE (PREMIUM ASYMMETRIC EDITORIAL)
         ======================================================== */}
      <section id="industries" className="relative bg-white dark:bg-[#0A0908] py-16 sm:py-20 overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 dark:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 dark:bg-orange-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* ── Section Header ── */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/60 dark:border-orange-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                {currentLang === 'en' ? 'INDUSTRIES WE SERVE' : 'যে সকল সেক্টরে আমরা সেবা দিই'}
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              {currentLang === 'en' ? (
                <>Built for <span className="text-orange-500">Your Industry.</span><br />Designed for Your Growth.</>
              ) : (
                <>আপনার <span className="text-orange-500">সেক্টরের</span> জন্য তৈরি।<br />আপনার প্রবৃদ্ধির জন্য ডিজাইন।</>
              )}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'en'
                ? 'From startups to established enterprises, we create digital experiences and solutions tailored to the unique needs of every industry.'
                : 'স্টার্টআপ থেকে প্রতিষ্ঠিত এন্টারপ্রাইজ — প্রতিটি সেক্টরের অনন্য চাহিদার জন্য আমরা কাস্টম ডিজিটাল সলিউশন তৈরি করি।'}
            </p>
          </div>

          {/* ── Desktop Asymmetric Layout ── */}
          <div
            className="hidden lg:grid relative"
            style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr) minmax(0,1fr)', gridTemplateRows: 'repeat(4, auto)', gap: '16px 20px', alignItems: 'center' }}
            onMouseLeave={() => setHoveredIndustry(null)}
          >
            {/* Subtle connecting lines SVG (behind everything) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
              {/* Dots pattern connecting cards to center */}
              {industries.slice(0, 4).map((_, i) => (
                <circle key={`ldot-${i}`} cx="33%" cy={`${14 + i * 24}%`} r={hoveredIndustry !== null ? 3 : 2} fill={hoveredIndustry !== null ? '#FF4A00' : '#d1d5db'} className="transition-all duration-500" />
              ))}
              {industries.slice(4, 8).map((_, i) => (
                <circle key={`rdot-${i}`} cx="67%" cy={`${14 + i * 24}%`} r={hoveredIndustry !== null ? 3 : 2} fill={hoveredIndustry !== null ? '#FF4A00' : '#d1d5db'} className="transition-all duration-500" />
              ))}
            </svg>

            {/* ── Left Column (4 cards) ── */}
            <div className="flex flex-col gap-4 z-10">
              {industries.slice(0, 4).map((ind, idx) => {
                const isHovered = hoveredIndustry === ind.id;
                return (
                  <RevealGuard
                    key={ind.id}
                    initial={{ opacity: 0, x: -30, clipPath: 'inset(0% 100% 0% 0%)', scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredIndustry(ind.id)}
                    fallbackMs={800 + idx * 120}
                    className={`relative group cursor-pointer rounded-[22px] overflow-hidden border transition-all duration-400 ${isHovered ? 'border-orange-400 shadow-[0_12px_40px_rgba(255,74,0,0.15)]' : 'border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg'}`}
                    style={{ transform: idx % 2 === 1 ? 'translateX(8px)' : 'none' }}
                  >
                    <div className="relative w-full h-[155px]">
                      <img src={ind.image} alt={currentLang === 'en' ? ind.nameEn : ind.nameBn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      {/* Icon */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 border border-orange-500/40 flex items-center justify-center backdrop-blur-sm group-hover:border-orange-500 group-hover:shadow-[0_0_12px_rgba(255,74,0,0.3)] transition-all duration-400">
                        {renderLucideIcon(ind.icon, 'h-3.5 w-3.5 text-orange-400')}
                      </div>
                      {/* Arrow button */}
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                        <ArrowRight className="h-3 w-3 text-white -rotate-45" />
                      </div>
                      {/* Text */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-[13px] font-bold text-white leading-tight mb-0.5">
                          {currentLang === 'en' ? ind.nameEn : ind.nameBn}
                        </h4>
                        <p className="text-[10px] text-gray-300 leading-snug opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                          {currentLang === 'en' ? ind.descEn : ind.descBn}
                        </p>
                      </div>
                    </div>
                  </RevealGuard>
                );
              })}
            </div>

            {/* ── Center Featured Area ── */}
            <RevealGuard
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              fallbackMs={900}
              className="flex items-center justify-center z-10"
            >
              <div className={`relative w-full aspect-square max-w-[400px] rounded-full transition-all duration-500 ${hoveredIndustry !== null ? 'shadow-[0_0_60px_rgba(255,74,0,0.12)]' : ''}`}>
                {/* Outer ring */}
                <div className={`absolute -inset-3 rounded-full border-2 border-dashed transition-all duration-500 ${hoveredIndustry !== null ? 'border-orange-400/50' : 'border-gray-200 dark:border-white/10'}`} />
                {/* Inner ring */}
                <div className={`absolute -inset-1 rounded-full border transition-all duration-500 ${hoveredIndustry !== null ? 'border-orange-400' : 'border-gray-300 dark:border-white/15'}`} />
                {/* Image */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#1a1a1a] shadow-2xl">
                  <img
                    src={hoveredIndustry ? industries.find(i => i.id === hoveredIndustry)?.image || industries[0].image : industries[0].image}
                    alt="Industries"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                {/* Center label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-full px-5 py-2 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-900 dark:text-white">
                    {currentLang === 'en' ? '9+ INDUSTRIES' : '৯+ সেক্টর'}
                  </span>
                </div>
              </div>
            </RevealGuard>

            {/* ── Right Column (4 cards) ── */}
            <div className="flex flex-col gap-4 z-10">
              {industries.slice(4, 8).map((ind, idx) => {
                const isHovered = hoveredIndustry === ind.id;
                return (
                  <RevealGuard
                    key={ind.id}
                    initial={{ opacity: 0, x: 30, clipPath: 'inset(0% 0% 0% 100%)', scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                    transition={{ delay: (idx + 4) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredIndustry(ind.id)}
                    fallbackMs={800 + (idx + 4) * 120}
                    className={`relative group cursor-pointer rounded-[22px] overflow-hidden border transition-all duration-400 ${isHovered ? 'border-orange-400 shadow-[0_12px_40px_rgba(255,74,0,0.15)]' : 'border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg'}`}
                    style={{ transform: idx % 2 === 0 ? 'translateX(-8px)' : 'none' }}
                  >
                    <div className="relative w-full h-[155px]">
                      <img src={ind.image} alt={currentLang === 'en' ? ind.nameEn : ind.nameBn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 border border-orange-500/40 flex items-center justify-center backdrop-blur-sm group-hover:border-orange-500 group-hover:shadow-[0_0_12px_rgba(255,74,0,0.3)] transition-all duration-400">
                        {renderLucideIcon(ind.icon, 'h-3.5 w-3.5 text-orange-400')}
                      </div>
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                        <ArrowRight className="h-3 w-3 text-white -rotate-45" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-[13px] font-bold text-white leading-tight mb-0.5">
                          {currentLang === 'en' ? ind.nameEn : ind.nameBn}
                        </h4>
                        <p className="text-[10px] text-gray-300 leading-snug opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                          {currentLang === 'en' ? ind.descEn : ind.descBn}
                        </p>
                      </div>
                    </div>
                  </RevealGuard>
                );
              })}
            </div>
          </div>

          {/* ── 9th Industry — Featured Wide Card (Desktop) ── */}
          <RevealGuard
            initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            fallbackMs={1300}
            className="hidden lg:block mt-6 relative mx-auto max-w-3xl group cursor-pointer rounded-[24px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-400 hover:border-orange-400"
          >
            <div className="relative h-[180px] flex">
              <img src={industries[8].image} alt={currentLang === 'en' ? industries[8].nameEn : industries[8].nameBn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
              <div className="relative z-10 flex items-center gap-6 p-8 w-full">
                <div className="w-14 h-14 rounded-2xl bg-black/50 border border-orange-500/40 flex items-center justify-center backdrop-blur-sm shrink-0 group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(255,74,0,0.3)] transition-all duration-400">
                  {renderLucideIcon(industries[8].icon, 'h-6 w-6 text-orange-400')}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-white">
                    {currentLang === 'en' ? industries[8].nameEn : industries[8].nameBn}
                  </h4>
                  <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                    {currentLang === 'en' ? industries[8].descEn : industries[8].descBn}
                  </p>
                </div>
                <div className="ml-auto shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <ArrowRight className="h-4 w-4 text-white -rotate-45" />
                </div>
              </div>
            </div>
          </RevealGuard>

          {/* ── Mobile / Tablet Layout ── */}
          <div className="lg:hidden space-y-6">
            {/* Featured image on mobile */}
            <RevealGuard
              initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              fallbackMs={1100}
              className="relative rounded-[24px] overflow-hidden aspect-[16/9] sm:aspect-[21/9]"
            >
              <img src={industries[0].image} alt="Industries" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-3 border border-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{currentLang === 'en' ? 'Our Expertise' : 'আমাদের দক্ষতা'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {currentLang === 'en' ? 'Digital Solutions Across Every Industry' : 'প্রতিটি সেক্টরে ডিজিটাল সলিউশন'}
                </h3>
              </div>
            </RevealGuard>

            {/* Industry cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {industries.map((ind, idx) => (
                <RevealGuard
                  key={ind.id}
                  initial={{ opacity: 0, y: 15, clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  fallbackMs={900 + idx * 60}
                  className="group cursor-pointer rounded-[18px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300"
                >
                  <div className="relative h-[110px] sm:h-[130px]">
                    <img src={ind.image} alt={currentLang === 'en' ? ind.nameEn : ind.nameBn} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 border border-orange-500/40 flex items-center justify-center backdrop-blur-sm">
                      {renderLucideIcon(ind.icon, 'h-3 w-3 text-orange-400')}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-[11px] sm:text-[12px] font-bold text-white leading-tight mb-0.5">
                        {currentLang === 'en' ? ind.nameEn : ind.nameBn}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-gray-300 leading-snug line-clamp-2 opacity-80">
                        {currentLang === 'en' ? ind.descEn : ind.descBn}
                      </p>
                    </div>
                  </div>
                </RevealGuard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: BEHIND NEXT SOLUTION (MEET THE MASTERMIND)
         ======================================================== */}
      <section id="behind-next-solution" className="relative bg-white dark:bg-[#0A0A0A] py-16 sm:py-24 overflow-hidden">
        {/* Subtle premium backdrops */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-orange-100/40 dark:bg-orange-500/[0.06] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-blue-100/40 dark:bg-blue-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
            {/* ── Text Column ── */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/60 dark:border-orange-500/20">
                <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
                  {currentLang === 'en' ? 'Behind Next Solution' : 'নেক্সট সলিউশনের পেছনে'}
                </span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                {currentLang === 'en' ? (
                  <>Meet the <span className="text-orange-500">Mastermind</span><br />Behind the Growth.</>
                ) : (
                  <>গ্রোথের পেছনের<br /><span className="text-orange-500">মাস্টারমাইন্ডের</span> সাথে পরিচিত হোন</>
                )}
              </h2>

              <div className="flex flex-col items-center lg:items-start gap-1.5">
                <span className="font-sans text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {currentLang === 'en' ? 'Mushfiqur Rahman Sanjid' : 'মুশফিকুর রহমান সানজিদ'}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-orange-600 dark:text-orange-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  {currentLang === 'en' ? 'Founder & CEO' : 'প্রতিষ্ঠাতা ও সিইও'}
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {currentLang === 'en'
                  ? 'Founder of Next Solution and a dedicated web development expert. He architects high-performance websites and scalable web applications using React, Next.js and TypeScript — ensuring every build delivers blazing-fast speed, pixel-perfect responsiveness and revenue-focused engineering.'
                  : 'নেক্সট সলিউশনের প্রতিষ্ঠাতা এবং নিবেদিতপ্রাণ ওয়েব ডেভেলপমেন্ট এক্সপার্ট। তিনি HTML, React ও Next.js ব্যবহার করে উচ্চ-ক্ষমতাসম্পন্ন ওয়েবসাইট এবং স্কেলেবল ওয়েব অ্যাপ্লিকেশন ডিজাইন করেন — প্রতিটি প্রজেক্টে ব্লেজিং-ফাস্ট স্পিড, পিক্সেল-পারফেক্ট রেসপনসিভ ডিজাইন এবং রাজস্ব-কেন্দ্রিক ইঞ্জিনিয়ারিং নিশ্চিত করেন।'}
              </p>

              {/* Highlight chips */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2.5 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.04] px-4 py-3">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white">{currentLang === 'en' ? '4+ Years' : '৪+ বছর'}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{currentLang === 'en' ? 'Web Development' : 'ওয়েব ডেভেলপমেন্ট অভিজ্ঞতা'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.04] px-4 py-3">
                  <div className="h-9 w-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white">{currentLang === 'en' ? 'Build Digital Impact' : 'ডিজিটাল ইমপ্যাক্ট'}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{currentLang === 'en' ? 'Business Mission' : 'ব্যবসায়িক মিশন'}</p>
                  </div>
                </div>
              </div>

              {/* Quote + CTA */}
              <div className="pt-3">
                <blockquote className="relative pl-5 border-l-2 border-orange-500 text-left">
                  <p className="text-sm italic text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentLang === 'en'
                      ? 'Our mission is to build digital solutions that create lasting business impact.'
                      : 'এমন ডিজিটাল সলিউশন তৈরি করা যা স্থায়ী ব্যবসায়িক প্রভাব ফেলে।'}
                  </p>
                </blockquote>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setTab?.('about')}
                  className="group inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-6 py-3.5 text-sm font-bold shadow-[0_14px_30px_-10px_rgba(255,77,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Meet the Team' : 'টিমের সাথে পরিচিত হোন'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setTab?.('contact')}
                  className="group inline-flex items-center gap-2 rounded-xl border-2 border-orange-200 dark:border-orange-500/30 bg-white dark:bg-neutral-900 text-orange-600 dark:text-orange-400 px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Work With Us' : 'আমাদের সাথে কাজ করুন'}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Portrait Column ── */}
            <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px]">
              {/* Decorative offset ring */}
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 h-40 w-40 rounded-full border-2 border-dashed border-orange-200 dark:border-orange-500/30 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 h-52 w-52 rounded-full bg-gradient-to-br from-orange-200/60 dark:from-orange-500/20 to-transparent blur-2xl pointer-events-none" />

              <RevealGuard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                fallbackMs={900}
                className="relative"
              >
                <div className="relative rounded-[28px] overflow-hidden border border-gray-100 dark:border-white/10 shadow-2xl shadow-orange-900/10">
                  <img
                    src="/about.png"
                    alt={currentLang === 'en' ? 'Mushfiqur Rahman Sanjid — Founder & CEO' : 'মুশফিকুর রহমান সানজিদ — প্রতিষ্ঠাতা ও সিইও'}
                    className="w-full h-full object-cover aspect-[4/5] sm:aspect-[16/13] lg:aspect-[4/5]"
                  />
                  {/* Premium gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Bottom floating name tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        {currentLang === 'en' ? 'Founder & CEO — Next Solution' : 'প্রতিষ্ঠাতা ও সিইও — নেক্সট সলিউশন'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating badge — experience */}
                <div className="absolute -top-5 -right-3 sm:-right-6 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-white/10 shadow-xl px-4 py-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-600/30">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black text-gray-900 dark:text-white leading-none">4+</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 pt-1">{currentLang === 'en' ? 'Years Exp' : 'বছরের অভিজ্ঞতা'}</p>
                  </div>
                </div>

                {/* Floating badge — quote */}
                <div className="absolute -bottom-5 -left-3 sm:-left-6 max-w-[240px] rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-white/10 shadow-xl px-4 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <Quote className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 leading-snug">
                      {currentLang === 'en' ? 'Build fast. Build premium. Build impact that lasts.' : 'দ্রুত তৈরি করুন। প্রিমিয়াম তৈরি করুন। স্থায়ী ইমপ্যাক্ট তৈরি করুন।'}
                    </p>
                  </div>
                </div>
              </RevealGuard>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}
