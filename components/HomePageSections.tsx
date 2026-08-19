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
  Target, Handshake, MapPin, Truck, Briefcase
} from 'lucide-react';

import { translations } from '@/data/translations';
import { 
  getSettings, getClientLogos, getSuccessStories, 
  getTestimonials, getBlogs, getPortfolio, getPricingPackages, 
  addSubscriber, getWhyChooseUsCards, getWhyChooseUsStats, 
  getWhyChooseUsBadges, getWhyChooseUsTechs, getWhyChooseUsCTA,
  getProcessSteps, getProcessCTA, getTechServiceCards,
  getCurrencies, getCurrencySettings
} from '@/lib/db';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { 
  Service, PortfolioItem, BlogPost, Testimonial, SuccessStory, 
  ClientLogo, PricingPackage, WhyChooseUsCard, WhyChooseUsStat, 
  WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA, ProcessStep, ProcessCTA, TechServiceCard,
  Currency
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
  { id: 'eco-3', icon: 'Code', labelEn: 'mobile apps', labelBn: 'ওয়েব অ্যাপ্লিকেশন', descEn: 'Custom full-stack cloud SaaS.', descBn: 'কাস্টম ফুল-স্ট্যাক ক্লাউড ওয়েব অ্যাপ।' },
  { id: 'eco-4', icon: 'Layers', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স ডিজাইন', descEn: 'Awwwards-winning interfaces.', descBn: 'অ্যাওয়ার্ড-উইনিং প্রিমিয়াম ডিজাইন।' },
  { id: 'eco-5', icon: 'Activity', labelEn: 'Digital Marketing', labelBn: 'ডিজিটাল মার্কেটিং', descEn: 'Data-driven growth & ads.', descBn: 'ডাটা-চালিত গ্রোথ ও বিজ্ঞাপন।' },
  { id: 'eco-6', icon: 'Zap', labelEn: 'SEO Optimization', labelBn: 'এসইও অপ্টিমাইজেশন', descEn: 'Organic search performance.', descBn: 'সার্চ ইঞ্জিনে অর্গানিক ট্রাফিক।' },
  { id: 'eco-7', icon: 'Sparkles', labelEn: 'AI Automation', labelBn: 'এআই অটোমেশন', descEn: 'Smart agents & workflows.', descBn: 'বুদ্ধিমান এআই এজেন্ট ও ওয়ার্কফ্লো।' },
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
}

export default function HomePageSections({ currentLang, setTab }: HomePageSectionsProps) {
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
  const portfolio = getPortfolio();
  const pricingPackages = getPricingPackages().filter(p => p.enabled !== false);

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
    { slug: 'web-development', icon: Code, title: 'Web Development', desc: 'High-converting, blazing-fast websites and portals built to scale your business.', techs: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'WordPress', 'Shopify'], popular: ['Business & Corporate Sites', 'Multi-Vendor E-Commerce', 'Custom CMS Portals'], benefits: ['Blazing-fast load speeds', 'Pixel-perfect responsive design'] },
    { slug: 'web-development', icon: ShoppingCart, title: 'E-Commerce Solutions', desc: 'Online stores with secure payments, smart inventory and seamless checkout.', techs: ['Shopify', 'WooCommerce', 'Stripe', 'Laravel', 'Supabase'], popular: ['Online Stores', 'Secure Checkout', 'Admin Inventory Suite'], benefits: ['Boosted conversion rates', 'Secure payment gateways'] },
    { slug: 'ui-ux-design', icon: Palette, title: 'UI/UX Design', desc: 'Stunning, user-centric interfaces that boost engagement and conversions.', techs: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems'], popular: ['Website UI Design', 'Dashboard Layouts', 'Mobile App UI'], benefits: ['Higher user engagement', 'Consistent brand experience'] },
    { slug: 'digital-marketing', icon: Megaphone, title: 'Digital Marketing', desc: 'Data-driven campaigns that generate leads and maximize marketing ROI.', techs: ['Meta Ads', 'Google Ads', 'Email Automation', 'Analytics'], popular: ['Social Media Campaigns', 'Lead Funnels', 'Email Marketing'], benefits: ['Measurable lead growth', 'Maximized ad ROI'] },
    { slug: 'seo', icon: Search, title: 'SEO Optimization', desc: 'Dominate Google with technical SEO, on-page mastery and authority links.', techs: ['Technical SEO', 'Keyword Research', 'Link Building', 'Local SEO'], popular: ['Site Audits', 'On-Page Optimization', 'Local Map SEO'], benefits: ['Higher organic rankings', 'Long-term traffic growth'] },
    { slug: 'mobile-app', icon: Smartphone, title: 'Mobile App Development', desc: 'Premium iOS & Android apps that put your business in every pocket.', techs: ['Flutter', 'React Native', 'Swift', 'Kotlin'], popular: ['iOS Apps', 'Android Apps', 'Cross-Platform Apps'], benefits: ['App-store ready builds', 'Smooth native performance'] },
    { slug: 'graphic-design', icon: Sparkles, title: 'Branding & Graphic Design', desc: 'Complete brand identities and visuals that make you unforgettable.', techs: ['Adobe Photoshop', 'Illustrator', 'Brand Identity', 'Print Design'], popular: ['Logo & Identity', 'Social Media Graphics', 'Flyers & Brochures'], benefits: ['Memorable brand presence', 'Professional visual assets'] },
    { slug: 'video-editing', icon: Clapperboard, title: 'Content & Video Production', desc: 'Cinematic reels, ads and videos engineered to stop the scroll.', techs: ['Premiere Pro', 'After Effects', 'Color Grading', 'Motion FX'], popular: ['Reels & Shorts', 'Corporate Promos', 'Video Ads'], benefits: ['Viral-ready content', 'High-retention edits'] },
    { slug: 'ai-automation', icon: Cpu, title: 'AI Automation / AI Solutions', desc: 'Custom AI agents and workflows that sell, support and save time 24/7.', techs: ['OpenAI', 'Gemini', 'Claude', 'n8n', 'Make'], popular: ['AI Support Bots', 'Workflow Automation', 'AI Voice Agents'], benefits: ['Round-the-clock automation', 'Reduced operating costs'] },
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
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null);

  // Currency switcher (shared with pricing page)
  const allCurrencies = getCurrencies().filter(c => c.enabled !== false).sort((a, b) => a.sortOrder - b.sortOrder);
  const currencySettings = getCurrencySettings();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(() => {
    const storedCode = getLocalItem('next_solution_selected_currency_code');
    if (storedCode) {
      const found = allCurrencies.find(c => c.code === storedCode);
      if (found) return found;
    }
    const defaultCurr = allCurrencies.find(c => c.code === (getCurrencySettings().defaultCurrencyCode || 'USD'));
    return defaultCurr || allCurrencies[0] || null;
  });
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});

  useEffect(() => {
    if (currencySettings.enableLiveRates) {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data && data.rates) setLiveRates(data.rates);
        })
        .catch(() => {});
    }
  }, [currencySettings.enableLiveRates]);

  const handleCurrencyChange = (curr: Currency) => {
    setSelectedCurrency(curr);
    setLocalItem('next_solution_selected_currency_code', curr.code);
  };

  const formatPrice = (usdAmount: number) => {
    if (!selectedCurrency) return `$${usdAmount.toLocaleString()}`;
    const liveRate = currencySettings.enableLiveRates ? liveRates[selectedCurrency.code] : undefined;
    const rate = liveRate ?? selectedCurrency.exchangeRate ?? 1.0;
    const amount = usdAmount * rate;
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: currencySettings.decimalPrecision ?? 0,
      maximumFractionDigits: currencySettings.decimalPrecision ?? 0,
    });
    return `${selectedCurrency.symbol}${formattedAmount}`;
  };

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
    'Mobile App', 
    'Graphic Design', 
    'Video Editing', 
    'Digital Marketing', 
    'SEO', 
    'AI Automation & Agent'
  ];

  const getPortfolioCategoryLabel = (cat: string) => {
    if (currentLang === 'bn') {
      switch (cat) {
        case 'All': return 'সব কাজ';
        case 'Web Development': return 'ওয়েব ডেভেলপমেন্ট';
        case 'UI/UX Design': return 'ইউআই/ইউএক্স ডিজাইন';
        case 'Mobile App': return 'মোবাইল অ্যাপ';
        case 'Graphic Design': return 'গ্রাফিক ডিজাইন';
        case 'Video Editing': return 'ভিডিও এডিটিং';
        case 'Digital Marketing': return 'ডিজিটাল মার্কেটিং';
        case 'SEO': return 'এসইও';
        case 'AI Automation & Agent': return 'এআই অটোমেশন ও এজেন্ট';
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
      nameEn: 'AI & Automations',
      nameBn: 'এআই ও অটোমেশন',
      techs: [
        { name: 'Gemini AI', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100', bg: 'bg-indigo-50/5 dark:bg-orange-500/50' },
        { name: 'LangChain', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-amber-50/30' },
        { name: 'Python Scripts', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-yellow-50/30' },
        { name: 'Trigger.dev', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100', bg: 'bg-violet-50/30 dark:bg-orange-500/5' }
      ]
    }
  ];


  return (
    <div className="space-y-8">
      {/* ========================================================
          SECTION 9: TECHNOLOGIES WE USE (PREMIUM INTERACTIVE STACK)
         ======================================================== */}
      <section id="technologies" className="relative overflow-hidden py-12 border-y border-neutral-100 dark:border-neutral-800 bg-linear-to-b from-white via-[#FAFAFA]/40 to-white">
        {/* Modern subtle ambient gradients in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-blue-100/20 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 h-72 w-72 bg-indigo-50/30 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          {/* Header Block */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100/50 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              {currentLang === 'en' ? '✦ Our Services' : '✦ আমাদের সেবাসমূহ'}
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-black leading-tight tracking-tight"
            >
              {currentLang === 'en' ? 'Everything Your Business Needs, ' : 'আপনার ব্যবসার যাবতীয় চাহিদা, '}
              <span className="bg-gradient-to-r from-blue-600 dark:from-orange-500 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                {currentLang === 'en' ? 'In One Place' : 'এক জায়গাতেই'}
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-sm md:text-base text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider"
            >
              {currentLang === 'en' ? 'From Websites to AI — We Deliver It All' : 'ওয়েবসাইট থেকে এআই — সবকিছুই আমরা করে দিই'}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              {currentLang === 'en' 
                ? 'From high-performance websites to intelligent AI automation — we deliver every digital service you need to grow, win and scale. Click any service to explore full details, deliverables and plans.'
                : 'উচ্চ-মানের ওয়েবসাইট থেকে বুদ্ধিমান এআই অটোমেশন — আপনার ব্যবসাকে বড় করার জন্য দরকারি প্রতিটি ডিজিটাল সেবা আমরা দিয়ে থাকি। যেকোনো সেবায় ক্লিক করে বিস্তারিত, ডেলিভারেবল এবং প্ল্যান দেখুন।'}
            </motion.p>
          </div>

          {/* FLOATING TECHNOLOGY CLOUD */}
          <div className="max-w-4xl mx-auto py-4">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { name: 'Next.js', xOffset: -8, yOffset: -12, speed: 7 },
                { name: 'React', xOffset: 10, yOffset: 12, speed: 6 },
                { name: 'Supabase', xOffset: -12, yOffset: 14, speed: 8 },
                { name: 'TypeScript', xOffset: 12, yOffset: -8, speed: 6.5 },
                { name: 'OpenAI', xOffset: -14, yOffset: -6, speed: 7.2 },
                { name: 'Gemini AI', xOffset: 14, yOffset: 10, speed: 5.5 },
                { name: 'Figma', xOffset: -8, yOffset: 15, speed: 7.8 },
                { name: 'WordPress', xOffset: 8, yOffset: -15, speed: 8.2 },
                { name: 'Shopify', xOffset: -15, yOffset: 8, speed: 6.8 },
                { name: 'Meta Ads', xOffset: 10, yOffset: -12, speed: 5.8 },
                { name: 'Google Ads', xOffset: -6, yOffset: 14, speed: 7.5 },
                { name: 'Adobe Premiere', xOffset: 15, yOffset: -10, speed: 6.2 },
                { name: 'Laravel', xOffset: -10, yOffset: -14, speed: 8.5 },
                { name: 'SEO Engine', xOffset: 12, yOffset: 8, speed: 6.4 },
              ].map((tag, idx) => (
                <motion.div
                  key={idx}
                  animate={{ 
                    y: [0, tag.yOffset, 0],
                    x: [0, tag.xOffset, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: tag.speed,
                    ease: "easeInOut"
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-[#141414] border border-neutral-200/50 hover:border-orange-500 hover:text-orange-600 hover:shadow-[0_10px_20px_-5px_rgba(255,77,0,0.1)] cursor-default transition-colors duration-300 shadow-xs font-mono"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-orange-500 mr-2"></span>
                  {tag.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* TECHNOLOGY COUNTERS */}
         

          {/* BENTO GRID OF CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {homeServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  whileHover={{ y: -8 }}
                  key={idx}
                  onClick={() => openService(service.slug)}
                  className="group relative cursor-pointer rounded-3xl border border-neutral-200/50 bg-white dark:bg-[#141414] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:border-orange-500 hover:shadow-[0_20px_50px_-10px_rgba(255,77,0,0.08)] transition-all duration-500"
                >
                  {/* Glossy gradient highlight on hover */}
                  <div className="absolute inset-0 bg-radial-gradient(circle_at_top_left,rgba(255,77,0,0.02)_0%,transparent_60%) pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Top Badge & Icon Row */}
                  <div className="relative z-10 space-y-5">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50/5 dark:bg-orange-500/50 border border-blue-100/50 flex items-center justify-center text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      {/* Featured Badge */}
                      <span className="text-[9px] font-bold font-mono bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-400 px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-100/30">
                        {currentLang === 'en' ? `Service 0${idx + 1}` : `সেবা 0${idx + 1}`}
                      </span>
                    </div>

                    {/* Service Text */}
                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <h3 className="font-sans text-xl font-extrabold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors duration-300">
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

                    {/* Core Technologies Badges */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {currentLang === 'en' ? 'Core Stack' : 'প্রধান টেকনোলজি'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.techs.slice(0, 6).map((tech) => (
                          <span 
                            key={tech}
                            className="rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:bg-blue-50/5 dark:bg-orange-500/50 border border-neutral-200/60 text-[9px] font-extrabold font-mono text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 hover:text-blue-600 dark:text-orange-400 px-2.5 py-1 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.techs.length > 6 && (
                          <span className="rounded-lg bg-blue-50/30 dark:bg-orange-500/5 border border-blue-100/20 text-[9px] font-extrabold font-mono text-blue-600 dark:text-orange-400 px-2 py-1">
                            +{service.techs.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Hidden Drawer/Content - Reveals on hover/desktop or stands elegantly */}
                  <div className="mt-6 pt-5 border-t border-neutral-50 dark:border-neutral-800 space-y-4 relative z-10 transition-all duration-300">
                    {/* Experience Level & Count Row */}
                    <div className="flex items-center justify-between text-[10px] font-bold font-mono text-neutral-400 dark:text-neutral-500">
                      <span>{currentLang === 'en' ? 'Exclusive Service' : 'এক্সক্লুসিভ সেবা'}</span>
                      <span className="text-blue-600 dark:text-orange-400 bg-blue-50/5 dark:bg-orange-500/50 px-2 py-0.5 rounded border border-blue-100/30">
                        {currentLang === 'en' ? 'View Details →' : 'বিস্তারিত দেখুন →'}
                      </span>
                    </div>

                    {/* Hover expansion container (always readable, extra sleek styled bullet points) */}
                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 space-y-3 pt-1">
                      {/* Popular Projects */}
                      <div className="space-y-1">
                        <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center">
                          <CheckCircle className="h-3 w-3 text-emerald-500 dark:text-emerald-400 mr-1" />
                          {currentLang === 'en' ? 'Popular Solutions' : 'জনপ্রিয় সমাধানসমূহ'}
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-[11px] font-sans text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 font-medium pl-4">
                          {service.popular.map((proj, pIdx) => (
                            <div key={pIdx} className="flex items-center">
                              <span className="h-1 w-1 bg-neutral-300 rounded-full mr-2"></span>
                              {proj}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Benefits */}
                      <div className="space-y-1">
                        <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center">
                          <Sparkles className="h-3 w-3 text-blue-500 dark:text-orange-400 mr-1" />
                          {currentLang === 'en' ? 'Core Benefits' : 'মূল সুবিধা'}
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-[11px] font-sans text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 font-medium pl-4">
                          {service.benefits.map((benefit, bIdx) => (
                            <div key={bIdx} className="flex items-center">
                              <span className="h-1 w-1 bg-neutral-300 rounded-full mr-2"></span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION: WHY CHOOSE US (PREMIUM WORLD-CLASS DESIGN)
         ======================================================== */}
<section id="why-choose-us" className="relative overflow-hidden bg-white dark:bg-[#0B0A08] dark:bg-gradient-to-b dark:from-[#0C0A08] dark:via-[#13100C] dark:to-[#090807] text-neutral-900 dark:text-white border-y border-neutral-100 dark:border-neutral-800">

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
              <span className="h-px w-12 sm:w-16 bg-orange-500/60"></span>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-orange-600 dark:text-orange-400">
                {currentLang === 'en' ? 'Why Choose Us' : 'কেন আমাদের বেছে নেবেন'}
              </span>
              <span className="h-px w-12 sm:w-16 bg-orange-500/60"></span>
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
          <div className="mt-8 sm:mt-10 lg:mt-12">
              <div className="mx-auto max-w-[1250px]">
                <img
                  src="/chose.png"
                  alt="Why choose Next Solution - our team and capabilities"
                  className="w-full h-auto select-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 6: OUR PROCESS (PREMIUM TIMELINE)
         ======================================================== */}
      <section id="our-process" className="relative bg-white dark:bg-[#141414] py-16 sm:py-20 overflow-hidden border-y border-gray-100 dark:border-neutral-800">
        {/* Ambient Gradient Background Orbs */}
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-50/40 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-indigo-50/30 dark:bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-orange-500/10 border border-blue-100 dark:border-orange-500/20 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{currentLang === 'en' ? processCTA.titleEn : processCTA.titleBn}</span>
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              {currentLang === 'en' ? processCTA.highlightEn : processCTA.highlightBn}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'en' ? processCTA.subtitleEn : processCTA.subtitleBn}
            </p>
          </div>

          {/* Adaptation Service Selector (Interactive Tab) */}
          <div className="max-w-2xl mx-auto bg-gray-50/80 border border-gray-100 dark:border-neutral-800 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 shadow-sm">
            {[
              { id: 'all', labelEn: 'All Services Workflow', labelBn: 'সকল সার্ভিস ওয়ার্কফ্লো', icon: 'Globe' },
              { id: 'web', labelEn: 'Web & Apps Dev', labelBn: 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট', icon: 'Code' },
              { id: 'design', labelEn: 'UI/UX & Branding', labelBn: 'ইউআই/ইউএক্স ও ব্র্যান্ডিং', icon: 'Layers' },
              { id: 'marketing', labelEn: 'SEO & Marketing', labelBn: 'এসইও ও ডিজিটাল মার্কেটিং', icon: 'Megaphone' },
              { id: 'ai', labelEn: 'AI & Automations', labelBn: 'এআই ও অটোমেশন', icon: 'Cpu' }
            ].map((tab) => {
              const isActive = (activeTimelineStep === 0 && tab.id === 'all') || 
                               (activeTimelineStep === 1 && tab.id === 'web') ||
                               (activeTimelineStep === 2 && tab.id === 'design') ||
                               (activeTimelineStep === 3 && tab.id === 'marketing') ||
                               (activeTimelineStep === 4 && tab.id === 'ai');
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'all') setActiveTimelineStep(0);
                    if (tab.id === 'web') setActiveTimelineStep(1);
                    if (tab.id === 'design') setActiveTimelineStep(2);
                    if (tab.id === 'marketing') setActiveTimelineStep(3);
                    if (tab.id === 'ai') setActiveTimelineStep(4);
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/15 scale-102'
                      : 'text-gray-600 dark:text-neutral-300 dark:text-neutral-600 hover:bg-gray-100 dark:bg-neutral-800'
                  }`}
                >
                  <IconHelper name={tab.icon} className="h-3.5 w-3.5" />
                  <span>{currentLang === 'en' ? tab.labelEn : tab.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Adaptability Insight Banner */}
          <div className="max-w-3xl mx-auto rounded-xl bg-blue-50/5 dark:bg-orange-500/50 border border-blue-100/50 p-4 text-center">
            <p className="text-xs text-blue-700 font-medium">
              {activeTimelineStep === 0 && (currentLang === 'en' 
                ? "💡 Showing our baseline 7-step digital growth workflow. Switch tabs above to see how we specialize our process for individual disciplines."
                : "💡 আমাদের বেসলাইন ৭-ধাপের ডিজিটাল গ্রোথ ওয়ার্কফ্লো দেখানো হচ্ছে। নির্দিষ্ট সার্ভিসের কাজের পদ্ধতি দেখতে ওপরে ট্যাব পরিবর্তন করুন।")}
              {activeTimelineStep === 1 && (currentLang === 'en' 
                ? "💻 Web Dev Path: Emphasizes modular React architecture, headless APIs, strict QA test scripts, load optimizations, and high-performance serverless cloud deployments."
                : "💻 ওয়েব ডেভেলপমেন্ট পথ: মডুলার রিঅ্যাক্ট আর্কিটেকচার, হেডলেস এপিআই, কঠোর কিউএ টেস্ট স্ক্রিপ্ট এবং উচ্চ-ক্ষমতার ক্লাউড ডেপ্লয়মেন্টের ওপর জোর দেয়।")}
              {activeTimelineStep === 2 && (currentLang === 'en' 
                ? "🎨 Design Path: Focuses on extensive mood-boarding, wireframing, high-fidelity interactive prototyping, user persona studies, and full branding system deliverables."
                : "🎨 ডিজাইন পথ: বিস্তারিত মুড-বোর্ডিং, ওয়্যারফ্রেমিং, ইন্টারঅ্যাক্টিভ প্রোটোটাইপিং, ইউজার পারসোনা স্টাডি এবং ব্র্যান্ডিং সিস্টেমের ওপর ফোকাস করে।")}
              {activeTimelineStep === 3 && (currentLang === 'en' 
                ? "📈 SEO & Marketing Path: Maximizes competitor backlink profiling, technical core web vitals audits, landing page conversions, dynamic pixel tracking, and performance reporting."
                : "📈 এসইও ও মার্কেটিং পথ: প্রতিযোগী ব্যাকলিংক প্রোফাইলিং, টেকনিক্যাল ও কন্টেন্ট অডিট, ল্যান্ডিং পেজ কনভার্সন এবং পারফরম্যান্স রিপোর্টিং নিশ্চিত করে।")}
              {activeTimelineStep === 4 && (currentLang === 'en' 
                ? "🤖 AI & Automation Path: Specializes in custom LLM orchestrations (Gemini API), flow diagrams, integration testing, training custom agents, and automated database triggering."
                : "🤖 এআই ও অটোমেশন পথ: কাস্টম এলএলএম অর্কেস্ট্রেশন (জেমিনি এপিআই), ফ্লো ডায়াগ্রাম, ইন্টিগ্রেশন টেস্টিং এবং কাস্টম এজেন্ট ট্রেনিং সলিউশনে পারদর্শী।")}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-8">
            
            {/* Desktop Center connector line */}
            <div className="absolute left-4 lg:left-1/2 top-4 bottom-4 w-[2px] bg-gray-100 dark:bg-neutral-800 lg:-translate-x-[1px] block"></div>
            
            {/* Center connector line GLOW progress bar */}
            <div className="absolute left-4 lg:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-600 dark:from-orange-500 via-indigo-500 to-purple-600 lg:-translate-x-[1px] block opacity-30"></div>

            <div className="space-y-5 relative">
              {processSteps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`flex flex-col lg:flex-row items-stretch gap-4 lg:gap-10 relative ${
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Visual dot indicator with glow if hovered */}
                    <div className="absolute left-4 lg:left-1/2 top-8 h-8 w-8 rounded-full bg-white dark:bg-[#141414] border-4 border-blue-600 z-10 lg:-translate-x-[16px] flex items-center justify-center shadow-lg transition-all duration-300">
                      <span className="text-[10px] font-black text-blue-600 dark:text-orange-400 font-mono">{step.stepNumber}</span>
                    </div>
                    
                    {/* Content card (Responsive wrapper) */}
                    <div className="w-full lg:w-1/2 pl-14 md:pl-16 lg:pl-0">
                      <div className="group relative rounded-2xl lg:rounded-3xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-3 sm:p-4 lg:p-5 space-y-2.5 lg:space-y-3 shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-300">
                        {/* Decorative subtle border glow */}
                        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        {/* Top Metadata Row */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md lg:rounded-lg bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 font-mono">
                            STEP {step.stepNumber}
                          </span>
                          <span className="text-lg sm:text-2xl" role="img" aria-label="step-icon">
                            {step.icon}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5 lg:space-y-3">
                          <h3 className="font-sans text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors duration-200 leading-snug">
                            {currentLang === 'en' ? step.titleEn : step.titleBn}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] lg:text-xs text-gray-500 dark:text-neutral-400 leading-snug line-clamp-2 lg:line-clamp-none">
                            {currentLang === 'en' ? step.descriptionEn : step.descriptionBn}
                          </p>
                        </div>

                        {/* Detail Reveal Panel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 pt-2 lg:pt-3 border-t border-gray-50 text-[10px] lg:text-[11px]">
                          {/* Deliverables Column */}
                          <div className="space-y-1.5">
                            <span className="block font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-[8px] lg:text-[9px]">
                              {currentLang === 'en' ? 'Deliverables' : 'ডেলিভারিবলস'}
                            </span>
                            <ul className="space-y-1">
                              {(currentLang === 'en' ? step.deliverablesEn : step.deliverablesBn).map((del, dIdx) => (
                                <li key={dIdx} className="flex items-center space-x-1 text-gray-600 dark:text-neutral-300 dark:text-neutral-600">
                                  <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                                  <span>{del}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tools & Services Column */}
                          <div className="space-y-2.5 lg:space-y-4">
                            {/* Duration */}
                            <div className="space-y-1">
                              <span className="block font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-[8px] lg:text-[9px]">
                                {currentLang === 'en' ? 'Estimated Duration' : 'আনুমানিক সময়'}
                              </span>
                              <span className="font-semibold text-gray-700 dark:text-neutral-200 bg-gray-50 dark:bg-neutral-900 px-1.5 sm:px-2 py-0.5 rounded-md inline-block text-[10px] lg:text-[11px]">
                                {currentLang === 'en' ? step.estimatedDurationEn : step.estimatedDurationBn}
                              </span>
                            </div>

                            {/* Tools Used */}
                            <div className="space-y-1 lg:space-y-1.5">
                              <span className="block font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest text-[8px] lg:text-[9px]">
                                {currentLang === 'en' ? 'Primary Stack' : 'প্রধান স্ট্যাক'}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {step.toolsUsed.map((tool, tIdx) => (
                                  <span key={tIdx} className="px-1.5 sm:px-2 py-0.5 rounded bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 dark:text-neutral-500 font-mono text-[9px] lg:text-[10px]">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Step visual - blends with background */}
                    <div className="w-full lg:w-1/2 pl-14 md:pl-16 lg:pl-0">
                      <div className="group/visual relative h-full min-h-[110px] sm:min-h-[150px] lg:min-h-[240px] overflow-hidden flex items-center justify-center">
                        <img
                          src={`/step${parseInt(step.stepNumber, 10)}.png`}
                          alt={currentLang === 'en' ? step.titleEn : step.titleBn}
                          className="max-h-[180px] sm:max-h-[240px] lg:max-h-[300px] w-auto max-w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

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
          <div className="lg:sticky lg:top-28 flex lg:flex-col gap-1.5 lg:gap-2 lg:p-2 lg:rounded-2xl lg:bg-white lg:dark:bg-[#141414] lg:border lg:border-neutral-100 lg:dark:border-neutral-800 lg:shadow-sm overflow-x-auto scrollbar-none pb-1 lg:pb-0 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
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
          </div>

          {/* Right: Portfolio cards in a grid (same size as services cards) */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.slice(0, 6).map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-neutral-800 dark:text-neutral-100 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm">
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
                        <span className="font-extrabold uppercase text-orange-500 dark:text-orange-400">
                          {currentLang === 'en' ? item.industryEn || 'Digital Product' : item.industryBn || 'ডিজিটাল প্রোডাক্ট'}
                        </span>
                        <span className="text-neutral-400 dark:text-neutral-500 font-medium bg-neutral-50 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-800">
                          {item.duration}
                        </span>
                      </div>

                      <h3 className="font-sans text-base md:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200 leading-snug line-clamp-1">
                        {currentLang === 'en' ? item.titleEn : item.titleBn}
                      </h3>

<p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
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
                          <span
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
          </div>
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
      {/* ========================================================
          SECTION 8: INDUSTRIES WE SERVE (PREMIUM ASYMMETRIC EDITORIAL)
         ======================================================== */}
      <section id="industries" className="relative bg-white py-16 sm:py-20 overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* ── Section Header ── */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
                {currentLang === 'en' ? 'INDUSTRIES WE SERVE' : 'যে সকল সেক্টরে আমরা সেবা দিই'}
              </span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
              {currentLang === 'en' ? (
                <>Built for <span className="text-orange-500">Your Industry.</span><br />Designed for Your Growth.</>
              ) : (
                <>আপনার <span className="text-orange-500">সেক্টরের</span> জন্য তৈরি।<br />আপনার প্রবৃদ্ধির জন্য ডিজাইন।</>
              )}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
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
                  <motion.div
                    key={ind.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredIndustry(ind.id)}
                    className={`relative group cursor-pointer rounded-[22px] overflow-hidden border transition-all duration-400 ${isHovered ? 'border-orange-400 shadow-[0_12px_40px_rgba(255,74,0,0.15)]' : 'border-gray-200 shadow-sm hover:shadow-lg'}`}
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
                  </motion.div>
                );
              })}
            </div>

            {/* ── Center Featured Area ── */}
            <motion.div
              className="flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`relative w-full aspect-square max-w-[400px] rounded-full transition-all duration-500 ${hoveredIndustry !== null ? 'shadow-[0_0_60px_rgba(255,74,0,0.12)]' : ''}`}>
                {/* Outer ring */}
                <div className={`absolute -inset-3 rounded-full border-2 border-dashed transition-all duration-500 ${hoveredIndustry !== null ? 'border-orange-400/50' : 'border-gray-200'}`} />
                {/* Inner ring */}
                <div className={`absolute -inset-1 rounded-full border transition-all duration-500 ${hoveredIndustry !== null ? 'border-orange-400' : 'border-gray-300'}`} />
                {/* Image */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={hoveredIndustry ? industries.find(i => i.id === hoveredIndustry)?.image || industries[0].image : industries[0].image}
                    alt="Industries"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                {/* Center label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-5 py-2 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-900">
                    {currentLang === 'en' ? '9+ INDUSTRIES' : '৯+ সেক্টর'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Right Column (4 cards) ── */}
            <div className="flex flex-col gap-4 z-10">
              {industries.slice(4, 8).map((ind, idx) => {
                const isHovered = hoveredIndustry === ind.id;
                return (
                  <motion.div
                    key={ind.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx + 4) * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setHoveredIndustry(ind.id)}
                    className={`relative group cursor-pointer rounded-[22px] overflow-hidden border transition-all duration-400 ${isHovered ? 'border-orange-400 shadow-[0_12px_40px_rgba(255,74,0,0.15)]' : 'border-gray-200 shadow-sm hover:shadow-lg'}`}
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
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── 9th Industry — Featured Wide Card (Desktop) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden lg:block mt-6 relative mx-auto max-w-3xl group cursor-pointer rounded-[24px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-400 hover:border-orange-400"
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
          </motion.div>

          {/* ── Mobile / Tablet Layout ── */}
          <div className="lg:hidden space-y-6">
            {/* Featured image on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
            </motion.div>

            {/* Industry cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {industries.map((ind, idx) => (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                  className="group cursor-pointer rounded-[18px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300"
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================


      {/* ========================================================
          SECTION 10: PRICING PREVIEW (TRANSPARENT RATES)
         ======================================================== */}
      <section id="pricing-preview" className="bg-gray-50/30 border-y border-gray-100 dark:border-neutral-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'TRANSPARENT RATES' : 'স্বচ্ছ প্রাইসিং'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Predictable Packages for Scalable Growth' : 'বাস্তবসম্মত ও সাশ্রয়ী প্রিমিয়াম প্ল্যান'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-xl mx-auto">
              {currentLang === 'en' 
                ? 'Milestone-based billing, zero hidden fees, and absolute source-code transparency.'
                : 'নির্ধারিত কাজের জন্য স্বচ্ছ মাইলস্টোন চুক্তি, কোনো অতিরিক্ত হিডেন চার্জ নেই।'}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-2xl p-1.5 shadow-sm">
              {allCurrencies.map((curr) => {
                const isSelected = selectedCurrency?.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencyChange(curr)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:bg-neutral-900 hover:text-neutral-950'
                    }`}
                  >
                    <span className="text-sm shrink-0" role="img" aria-label={curr.name}>
                      {curr.flag || '🏳️'}
                    </span>
                    <span className="font-sans shrink-0">{curr.symbol}</span>
                    <span className="font-mono uppercase tracking-wider shrink-0">{curr.code}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-neutral-500">
              {currentLang === 'en' ? 'Select Preferred Currency' : 'পছন্দসই কারেন্সি সিলেক্ট করুন'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPackages.slice(0, 3).map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -5 }}
                className={`rounded-3xl border bg-white dark:bg-[#141414] p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between relative overflow-hidden ${
                  pkg.popular 
                    ? 'border-blue-600 ring-1 ring-blue-600/20 shadow-blue-600/5' 
                    : 'border-gray-100 dark:border-neutral-800'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    {currentLang === 'en' ? 'Most Popular' : 'জনপ্রিয়'}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-orange-400 font-mono uppercase tracking-widest block">{pkg.category}</span>
                    <h3 className="font-sans text-lg font-black text-gray-900 dark:text-white">{currentLang === 'en' ? pkg.nameEn : pkg.nameBn}</h3>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 leading-relaxed">{currentLang === 'en' ? pkg.descriptionEn : pkg.descriptionBn}</p>
                  </div>

                  <div className="py-2 border-y border-gray-50 flex items-baseline space-x-1.5">
                    <span className="text-3xl font-black text-gray-900 dark:text-white font-mono">{formatPrice(pkg.priceMonthly)}</span>
                    <span className="text-xs text-gray-400 dark:text-neutral-500">/ {currentLang === 'en' ? 'mo' : 'মাস'}</span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500">
                      {currentLang === 'en' ? 'Includes Core Benefits' : 'প্ল্যানে যা যা অন্তর্ভুক্ত'}
                    </span>
                    <ul className="space-y-2">
                      {(currentLang === 'en' ? pkg.featuresEn : pkg.featuresBn).slice(0, 5).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-blue-600 dark:text-orange-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 dark:text-neutral-300 dark:text-neutral-600 leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <button
                    onClick={() => { setTab('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-full rounded-xl py-3 text-xs font-bold transition duration-150 cursor-pointer text-center block ${
                      pkg.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/10' 
                        : 'bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800'
                    }`}
                  >
                    {currentLang === 'en' ? pkg.ctaEn : pkg.ctaBn}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => { setTab('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center space-x-2 rounded-xl border border-gray-200 dark:border-neutral-700 px-6 py-3 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 hover:border-blue-600 hover:bg-gray-50/50 transition cursor-pointer"
            >
              <span>{currentLang === 'en' ? 'Compare Full Pricing Comparison' : 'সব প্ল্যান সমূহ দেখুন ও তুলনা করুন'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11: CLIENT TESTIMONIALS (MODERN MINI GRID)
         ======================================================== */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'CLIENT FEEDBACK' : 'ক্লায়েন্ট টেস্টিমোনিয়াল'}
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Trusted by Dynamic Tech Leaders' : 'টেক স্টার্টআপ ও এন্টারপ্রাইজ লিডারদের প্রতিক্রিয়া'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative rounded-2xl border border-neutral-100/70 bg-[#FAFAFA]/40 p-5 hover:bg-white dark:bg-[#141414] hover:border-blue-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  {/* Rating & Small Quote */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-0.5">
                      {Array.from({ length: item.rating }).map((_, rIdx) => (
                        <Star key={rIdx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="h-4.5 w-4.5 text-neutral-200 group-hover:text-blue-100 transition duration-300 shrink-0" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed font-normal italic">
                    "{currentLang === 'en' ? item.feedbackEn : item.feedbackBn}"
                  </p>
                </div>

                {/* Profile Meta */}
                <div className="flex items-center space-x-3 pt-4 border-t border-neutral-100/50">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shrink-0">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-neutral-900 dark:text-white truncate">{item.name}</span>
                    <span className="block text-[9px] text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider truncate">
                      {currentLang === 'en' ? item.roleEn : item.roleBn}
                    </span>
                    <span className="block text-[9px] text-blue-600 dark:text-orange-400 font-bold truncate">
                      {item.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 12: SUCCESS STORIES (DETAILED PROBLEM-SOLUTION-RESULT)
         ======================================================== */}
      <section id="success-stories" className="bg-gray-50/20 border-y border-gray-100 dark:border-neutral-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'ENTERPRISE OUTCOMES' : 'গ্রাহক কেস স্টাডি'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Real Problem. Real Engineering. Real Results.' : 'বাস্তব চ্যালেঞ্জ ও আমাদের তৈরি সফল সলিউশন'}
            </h2>
          </div>

          <div className="space-y-10">
            {successStories.slice(0, 2).map((story, sIdx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 md:p-10 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Text Flow: Challenge & Solution */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-orange-400 tracking-wider">
                        {currentLang === 'en' ? story.industryEn : story.industryBn} • {story.timelineEn}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-gray-900 dark:text-white">
                        {story.companyName} — {currentLang === 'en' ? story.serviceEn : story.serviceBn}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono">
                          {currentLang === 'en' ? 'THE CHALLENGE' : 'প্রধান সমস্যা'}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                          {currentLang === 'en' ? story.challengeEn : story.challengeBn}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
                          {currentLang === 'en' ? 'OUR SYSTEM SOLUTION' : 'আমাদের কাস্টম সলিউশন'}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                          {currentLang === 'en' ? story.solutionEn : story.solutionBn}
                        </p>
                      </div>
                    </div>

                    {/* Client quote */}
                    <div className="relative rounded-2xl bg-[#FAFAFA]/80 p-5 border border-gray-50">
                      <Quote className="absolute right-4 top-4 h-8 w-8 text-blue-50" />
                      <blockquote className="text-xs text-gray-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed italic relative z-10">
                        "{currentLang === 'en' ? story.clientQuoteEn : story.clientQuoteBn}"
                      </blockquote>
                      <div className="mt-3 flex items-center space-x-2.5">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-800 shrink-0">
                          <img src={story.clientPhoto} alt={story.clientName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-900 dark:text-white">{story.clientName}</span>
                          <span className="block text-[9px] text-gray-400 dark:text-neutral-500">
                            {currentLang === 'en' ? story.clientRoleEn : story.clientRoleBn} — {story.companyName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Display Grid */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-blue-50 bg-blue-50/20 dark:bg-orange-500/5 p-6 space-y-4">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-orange-400 uppercase tracking-widest font-mono">
                        {currentLang === 'en' ? 'MEASURABLE IMPROVEMENTS' : 'পরিমাপযোগ্য ফলাফল'}
                      </span>
                      <p className="text-xs text-gray-700 dark:text-neutral-200 leading-relaxed font-medium">
                        {currentLang === 'en' ? story.resultsEn : story.resultsBn}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-gray-100 dark:border-neutral-800 p-4 text-center space-y-1">
                        <span className="text-2xl font-black text-blue-600 dark:text-orange-400 font-mono">35%</span>
                        <span className="block text-[9px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
                          {currentLang === 'en' ? 'Transaction Lift' : 'সেলস ও ট্রানজেকশন বৃদ্ধি'}
                        </span>
                      </div>
                      <div className="rounded-2xl border border-gray-100 dark:border-neutral-800 p-4 text-center space-y-1">
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">&lt;300ms</span>
                        <span className="block text-[9px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
                          {currentLang === 'en' ? 'Response Latency' : 'সাইটের লোডিং টাইম'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {story.technologies.map((t) => (
                        <span key={t} className="rounded bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 text-[9px] font-bold text-gray-400 dark:text-neutral-500 font-mono px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 13: BLOG PREVIEW (LATEST THREE ARTICLES)
         ======================================================== */}
      {blogs.length > 0 && (
        <section id="blog-preview" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-orange-400">
                {currentLang === 'en' ? 'KNOWLEDGE CENTER' : 'আমাদের সর্বশেষ ব্লগ'}
              </span>
              <h2 className="font-sans text-3xl font-black text-gray-900 dark:text-white leading-tight">
                {currentLang === 'en' ? 'Insights on Software Engineering' : 'সফটওয়্যার ও এআই প্রযুক্তির সর্বশেষ আপডেট'}
              </h2>
            </div>
            
            <button
              onClick={() => { setTab('blogs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center space-x-1.5 rounded-xl border border-gray-200 dark:border-neutral-700 px-5 py-2.5 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 hover:border-blue-600 transition cursor-pointer self-start md:self-auto"
            >
              <span>{currentLang === 'en' ? 'See All Intel Posts' : 'সকল ব্লগ পোস্ট দেখুন'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                onClick={() => {
                  setTab('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-3xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 space-y-5 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gray-50 dark:bg-neutral-900 relative border border-gray-50">
                    <img 
                      src={post.image} 
                      alt={post.titleEn} 
                      className="h-full w-full object-cover group-hover:scale-102 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/10">
                      {currentLang === 'en' ? post.categoryEn : post.categoryBn}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono flex items-center space-x-1.5">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </span>
                    <h3 className="font-sans text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition duration-200 line-clamp-2">
                      {currentLang === 'en' ? post.titleEn : post.titleBn}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 leading-relaxed line-clamp-2">
                      {currentLang === 'en' ? post.excerptEn : post.excerptBn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 dark:text-neutral-500 group-hover:text-blue-600 dark:text-orange-400 transition">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-500 dark:text-neutral-400 dark:text-neutral-500">By {post.author}</span>
                  </div>
                  <span className="inline-flex items-center space-x-1">
                    <span>{currentLang === 'en' ? 'Read Post' : 'পড়ুন'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 15: FINAL CTA (HIGH-IMPACT NEGATIVE-SPACE BANNER)
         ======================================================== */}
      <section id="final-cta" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl border border-gray-100 dark:border-neutral-800 bg-[#FAFAFA] p-8 md:p-16 text-center space-y-8 shadow-sm relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Ready to transform your ideas into market success?' : 'আপনার আইডিয়াকে সাফল্যের শিখরে নিয়ে যেতে প্রস্তুত?'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-md mx-auto leading-relaxed">
              {currentLang === 'en' 
                ? 'Start blueprint drafting with our senior solutions architects. 100% free consultation.' 
                : 'আমাদের সিনিয়র সলিউশন আর্কিটেক্টদের সাথে আপনার খসড়া রোডম্যাপ শুরু করুন। শতভাগ ফ্রি পরামর্শ।'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <button
              id="final-cta-start-project"
              onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-4 transition hover:scale-[1.01] shadow-md shadow-blue-600/15 cursor-pointer"
            >
              {currentLang === 'en' ? 'Start Your Project' : 'প্রজেক্ট আলোচনা শুরু করুন'}
            </button>
            <button
              id="final-cta-book-consultation"
              onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto rounded-xl bg-white dark:bg-[#141414] hover:bg-gray-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 text-xs font-bold px-6 py-4 border border-gray-200 dark:border-neutral-700 transition hover:scale-[1.01] cursor-pointer"
            >
              {currentLang === 'en' ? 'Book a Free Consultation' : 'ফ্রি কনসালটেশন বুক করুন'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}