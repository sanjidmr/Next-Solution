"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle, ChevronRight, HelpCircle, Star, Quote, 
  Sparkles, Layers, Cpu, ShieldCheck, Heart, ArrowUpRight, Code, 
  MessageSquare, Shield, Megaphone, Smartphone, Globe, Zap, 
  Users, Calendar, BarChart3, TrendingUp, Award, Clock, ArrowLeft, 
  Check, Mail, Send, Activity, Play, Plus, Trash2, Edit2
} from 'lucide-react';

import { translations } from '@/data/translations';
import { 
  getServices, getSettings, getClientLogos, getSuccessStories, 
  getTestimonials, getBlogs, getPortfolio, getPricingPackages, 
  addSubscriber, getWhyChooseUsCards, getWhyChooseUsStats, 
  getWhyChooseUsBadges, getWhyChooseUsTechs, getWhyChooseUsCTA,
  getProcessSteps, getProcessCTA, getTechServiceCards
} from '@/lib/db';
import { 
  Service, PortfolioItem, BlogPost, Testimonial, SuccessStory, 
  ClientLogo, PricingPackage, WhyChooseUsCard, WhyChooseUsStat, 
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
    <div className="flex flex-col p-4 rounded-xl bg-neutral-50/50 border border-neutral-100 shadow-sm text-center">
      <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">
        {numericValue > 0 ? `${count}${suffix}` : value}
      </span>
      <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mt-2">
        {label}
      </p>
    </div>
  );
};

const EcosystemFlowVisual = ({ currentLang }: { currentLang: 'en' | 'bn' }) => {
  return (
    <div className="mt-4 p-3.5 bg-neutral-50/70 border border-neutral-100 rounded-xl space-y-2.5 text-[10px] font-mono">
      <div className="flex items-center justify-between text-neutral-400">
        <span>{currentLang === 'en' ? 'Lifecycle pipeline' : 'লাইফসাইকেল পাইপলাইন'}</span>
        <span className="text-emerald-500 animate-pulse flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 inline-block animate-ping"></span>
          {currentLang === 'en' ? 'Active sync' : 'অ্যাক্টিভ সিঙ্ক'}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1 pt-1">
        {[
          { labelEn: 'Strategy', labelBn: 'কৌশল', color: 'bg-blue-500' },
          { labelEn: 'Design', labelBn: 'ডিজাইন', color: 'bg-indigo-500' },
          { labelEn: 'Code', labelBn: 'ডেভেলপ', color: 'bg-purple-500' },
          { labelEn: 'Growth', labelBn: 'এসইও', color: 'bg-emerald-500' }
        ].map((node, nIdx) => (
          <React.Fragment key={nIdx}>
            {nIdx > 0 && <span className="text-neutral-300 animate-pulse text-xs">➔</span>}
            <div className="flex flex-col items-center flex-1">
              <span className={`w-2 h-2 rounded-full ${node.color} shadow-sm`}></span>
              <span className="text-neutral-600 mt-1 scale-90">{currentLang === 'en' ? node.labelEn : node.labelBn}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const GrowthChartVisual = ({ currentLang }: { currentLang: 'en' | 'bn' }) => {
  return (
    <div className="mt-4 p-3.5 bg-neutral-50/70 border border-neutral-100 rounded-xl text-[10px] font-mono space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-neutral-400">{currentLang === 'en' ? 'Conversion multiplier' : 'কনভার্সন প্রবৃদ্ধি'}</span>
        <span className="text-blue-600 font-bold">+420% ROI</span>
      </div>
      <div className="flex items-end justify-between h-11 pt-2 px-2 gap-2">
        {[
          { val: '30%', label: 'Q1' },
          { val: '45%', label: 'Q2' },
          { val: '70%', label: 'Q3' },
          { val: '100%', label: 'Q4' }
        ].map((bar, bIdx) => (
          <div key={bIdx} className="flex flex-col items-center flex-1 space-y-1">
            <div className="w-full bg-neutral-200 rounded-t-sm h-7 relative overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-sm transition-all duration-1000" 
                style={{ height: bar.val }}
              ></div>
            </div>
            <span className="text-[8px] text-neutral-400">{bar.label}</span>
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
    <div className="w-full lg:w-96 bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 font-mono text-[9px] text-neutral-300 space-y-2.5 shadow-2xl relative overflow-hidden shrink-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-neutral-500">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
          <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
          <span className="text-[8px] pl-1 text-neutral-400">agent-console v1.2</span>
        </div>
        <span className="text-[8px] text-purple-400">● LIVE RUNNING</span>
      </div>

      {/* Input */}
      <div className="space-y-1">
        <span className="text-neutral-500">user@nextsolution:~$</span>
        <span className="text-white font-medium pl-1">
          {currentLang === 'en' ? 'optimize conversion funnel and automate email sequence' : 'কনভার্সন ফানেল অপ্টিমাইজ ও ইমেইল সিকোয়েন্স সেট করো'}
        </span>
      </div>

      {/* Stream output */}
      <div className="space-y-1 min-h-[50px] transition-all duration-300">
        {consoleStep >= 0 && (
          <div className="flex items-center space-x-1.5 text-blue-400">
            <span className="text-neutral-500">➔</span>
            <span>{currentLang === 'en' ? 'Initializing Gemini-2.5-Flash model...' : 'জেমিনি ২.৫ মডেল ইনিশিয়াল করা হচ্ছে...'}</span>
          </div>
        )}
        {consoleStep >= 1 && (
          <div className="flex items-center space-x-1.5 text-purple-400">
            <span className="text-neutral-500">➔</span>
            <span>{currentLang === 'en' ? 'Scanning funnel drop-off points... (Found 37% friction)' : 'ফানেল ড্রপ-অফ পয়েন্ট স্ক্যান করা হচ্ছে...'}</span>
          </div>
        )}
        {consoleStep >= 2 && (
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="text-neutral-500">✔</span>
            <span>{currentLang === 'en' ? 'Drafted & integrated 4 tailored drip sequence modules.' : '৪টি ড্রিপ সিকোয়েন্স মডিউল ইন্টিগ্রেট করা হয়েছে।'}</span>
          </div>
        )}
        {consoleStep >= 3 && (
          <div className="flex items-center space-x-1.5 text-indigo-400 font-bold animate-pulse">
            <span className="text-neutral-500">★</span>
            <span>{currentLang === 'en' ? 'SLA Optimization: Success rate 100%' : 'এসএলএ অপ্টিমাইজেশন: সফলতার হার ১০০%'}</span>
          </div>
        )}
      </div>

      {/* Neon glowing line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 animate-pulse"></div>
    </div>
  );
};

const renderCardVisual = (stat: string | undefined) => {
  if (!stat) return null;
  const normalizedStat = stat.toUpperCase().trim();

  if (normalizedStat.includes('UP')) {
    return (
      <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 text-emerald-600 text-[10px] font-mono font-bold tracking-tight">
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
      <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 text-blue-600 text-[10px] font-mono font-bold tracking-tight">
        <TrendingUp className="h-3 w-3 text-blue-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('NEXT-GEN') || normalizedStat.includes('AI')) {
    return (
      <div className="flex items-center space-x-1.5 bg-purple-50 border border-purple-100 rounded-full px-2.5 py-1 text-purple-600 text-[10px] font-mono font-bold tracking-tight">
        <Cpu className="h-3 w-3 text-purple-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('SLA') || normalizedStat.includes('SUPPORT')) {
    return (
      <div className="flex items-center space-x-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-1 text-indigo-600 text-[10px] font-mono font-bold tracking-tight">
        <Clock className="h-3 w-3 text-indigo-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('MVP') || normalizedStat.includes('FAST')) {
    return (
      <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1 text-amber-600 text-[10px] font-mono font-bold tracking-tight">
        <Zap className="h-3 w-3 text-amber-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('BESPOKE') || normalizedStat.includes('CUSTOM')) {
    return (
      <div className="flex items-center space-x-1.5 bg-pink-50 border border-pink-100 rounded-full px-2.5 py-1 text-pink-600 text-[10px] font-mono font-bold tracking-tight">
        <Layers className="h-3 w-3 text-pink-500" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('ZERO') || normalizedStat.includes('RISK')) {
    return (
      <div className="flex items-center space-x-1.5 bg-cyan-50 border border-cyan-100 rounded-full px-2.5 py-1 text-cyan-600 text-[10px] font-mono font-bold tracking-tight">
        <ShieldCheck className="h-3 w-3 text-cyan-500" />
        <span>{stat}</span>
      </div>
    );
  }

  if (normalizedStat.includes('CORE') || normalizedStat.includes('PARTNER')) {
    return (
      <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-100 rounded-full px-2.5 py-1 text-rose-600 text-[10px] font-mono font-bold tracking-tight">
        <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
        <span>{stat}</span>
      </div>
    );
  }

  return (
    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-1 rounded-xl bg-neutral-50 text-neutral-600 border border-neutral-100">
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
  const services = getServices();
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

  // States for interactive components
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('All');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');
  const [hoveredEcosystem, setHoveredEcosystem] = useState<any>(null);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);

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
      Users, Calendar, BarChart3, TrendingUp, Award, Clock
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
    'Mobile App', 
    'Graphic Design', 
    'Video Editing', 
    'Digital Marketing', 
    'AI Automation & Agent'
  ];

  const getPortfolioCategoryLabel = (cat: string) => {
    if (currentLang === 'bn') {
      switch (cat) {
        case 'All': return 'সব কাজ';
        case 'Web Development': return 'ওয়েব ডেভেলপমেন্ট';
        case 'Mobile App': return 'মোবাইল অ্যাপ';
        case 'Graphic Design': return 'গ্রাফিক ডিজাইন';
        case 'Video Editing': return 'ভিডিও এডিটিং';
        case 'Digital Marketing': return 'ডিজিটাল মার্কেটিং';
        case 'AI Automation & Agent': return 'এআই অটোমেশন ও এজেন্ট';
        default: return cat;
      }
    }
    return cat === 'All' ? 'All Work' : cat;
  };

  // Static Details for Industries (Section 8)
  const industries = [
    {
      id: 'ind-1',
      nameEn: 'E-Commerce',
      nameBn: 'ই-কমার্স',
      descEn: 'High conversion payment architectures, sub-second search matching, and dynamic cart scaling.',
      descBn: 'উচ্চ কনভার্সন পেমেন্ট ফ্রেমওয়ার্ক, দ্রুততম প্রোডাক্ট সার্চ ফিল্টারিং এবং ডাইনামিক কার্ট স্কেলিং সলিউশন।',
      iconName: 'Zap'
    },
    {
      id: 'ind-2',
      nameEn: 'Healthcare & Biotech',
      nameBn: 'স্বাস্থ্যসেবা ও বায়োটেক',
      descEn: 'Telemetry visualizer panels, HIPAA-ready database queries, and secure client-record vaults.',
      descBn: 'টেলিমেট্রি ভিজ্যুয়ালাইজার প্যানেল, নিরাপদ ডেটা ম্যানেজমেন্ট এবং সুরক্ষিত পেশেন্ট রেকর্ড ভল্ট।',
      iconName: 'Activity'
    },
    {
      id: 'ind-3',
      nameEn: 'SaaS & Enterprise Portals',
      nameBn: 'সফটওয়্যার ও কর্পোরেট পোর্টাল',
      descEn: 'Multi-tenant database orchestration, granular role permissions, and slick analytics boards.',
      descBn: 'মাল্টি-ট্যানেন্ট ডেটাবেস সিস্টেম, সূক্ষ্ম রোল পারমিশন এবং আকর্ষণীয় অ্যানালিটিক্স ড্যাশবোর্ড।',
      iconName: 'Cpu'
    },
    {
      id: 'ind-4',
      nameEn: 'Fintech & Blockchain',
      nameBn: 'ফিনটেক ও ব্লকচেইন',
      descEn: 'Double-entry ledger validation, cryptographic key integrations, and secure payment proxies.',
      descBn: 'ডাবল-অ্যান্ট্রি লেজার ভ্যালিডেশন, ক্রিপ্টোগ্রাফিক সিকিউরিটি এবং নিরাপদ গেটওয়ে প্রক্সি।',
      iconName: 'ShieldCheck'
    },
    {
      id: 'ind-5',
      nameEn: 'Education & LMS',
      nameBn: 'শিক্ষা ও এলএমএস',
      descEn: 'Interactive live video streaming, course progress tracking, and secure payment gateways.',
      descBn: 'ইন্টারেক্টিভ লাইভ ক্লাস স্ট্রিমিং, কোর্স অগ্রগতি ট্র্যাকিং এবং পেমেন্ট গেটওয়ে সমাধান।',
      iconName: 'Globe'
    },
    {
      id: 'ind-6',
      nameEn: 'Real Estate & Property',
      nameBn: 'রিয়েল এস্টেট ও প্রোপার্টি',
      descEn: 'Interactive location mapping, advanced property filters, and secure contact booking channels.',
      descBn: 'ইন্টারেক্টিভ লোকেশন ম্যাপিং, অ্যাডভান্সড প্রোপার্টি ফিল্টারিং এবং বুকিং চ্যানেল।',
      iconName: 'Layers'
    },
    {
      id: 'ind-7',
      nameEn: 'Logistics & Smart Delivery',
      nameBn: 'লজিস্টিকস ও স্মার্ট ডেলিভারি',
      descEn: 'Real-time fleet tracking, automated delivery dispatching systems, and predictive supply chain analytics.',
      descBn: 'রিয়েল-টাইম ডেলিভারি ট্র্যাকিং, অটোমেটেড লজিস্টিকস ডিসপ্যাচিং এবং সাপ্লাই চেইন অ্যানালিটিক্স সলিউশন।',
      iconName: 'Clock'
    },
    {
      id: 'ind-8',
      nameEn: 'Media, Entertainment & Creators',
      nameBn: 'মিডিয়া, এন্টারটেইনমেন্ট ও ক্রিয়েটর',
      descEn: 'High-performance streaming platforms, automated video processing pipelines, and custom creator economy assets.',
      descBn: 'উচ্চ-গতির স্ট্রিমিং প্ল্যাটফর্ম, স্বয়ংক্রিয় ভিডিও প্রসেসিং এবং ডিজিটাল ব্র্যান্ডিং ডিজাইন।',
      iconName: 'Megaphone'
    },
    {
      id: 'ind-9',
      nameEn: 'Retail & Fashion Brands',
      nameBn: 'রিটেইল ও ফ্যাশন ব্র্যান্ড',
      descEn: 'Premium brand identity packages, highly engaging promotional product videos, and targeted marketing campaigns.',
      descBn: 'প্রিমিয়াম ব্র্যান্ড আইডেন্টিটি প্যাকেজ, আকর্ষণীয় ভিডিও বিজ্ঞাপন এবং হাই-কনভার্টিং মার্কেটিং ক্যাম্পেইন।',
      iconName: 'Sparkles'
    },
    {
      id: 'ind-10',
      nameEn: 'Travel, Leisure & Hospitality',
      nameBn: 'ভ্রমণ, বিনোদন ও হসপিটালিটি',
      descEn: 'Interactive multi-resource booking calendars, optimized localized SEO engines, and immersive promotional reels.',
      descBn: 'ইন্টারেক্টিভ বুকিং ক্যালেন্ডার সিস্টেম, অপ্টিমাইজড লোকাল এসইও এবং চমৎকার সিনেমাটিক প্রচারমূলক ভিডিও।',
      iconName: 'TrendingUp'
    }
  ];

  // Static Details for Technologies (Section 9)
  const techCategories = [
    {
      nameEn: 'Frontend Frameworks',
      nameBn: 'ফ্রন্টএন্ড ফ্রেমওয়ার্ক',
      techs: [
        { name: 'Next.js', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-zinc-50' },
        { name: 'React', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/50' },
        { name: 'TypeScript', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/30' },
        { name: 'Tailwind CSS', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=100', bg: 'bg-sky-50/50' }
      ]
    },
    {
      nameEn: 'Backend & Core Storage',
      nameBn: 'ব্যাকএন্ড ও কোর স্টোরেজ',
      techs: [
        { name: 'Node.js', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=100', bg: 'bg-green-50/30' },
        { name: 'PostgreSQL', url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=100', bg: 'bg-blue-50/40' },
        { name: 'Supabase', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=100', bg: 'bg-emerald-50/40' },
        { name: 'Prisma ORM', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=100', bg: 'bg-zinc-50' }
      ]
    },
    {
      nameEn: 'AI & Automations',
      nameBn: 'এআই ও অটোমেশন',
      techs: [
        { name: 'Gemini AI', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100', bg: 'bg-indigo-50/50' },
        { name: 'LangChain', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-amber-50/30' },
        { name: 'Python Scripts', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=100', bg: 'bg-yellow-50/30' },
        { name: 'Trigger.dev', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100', bg: 'bg-violet-50/30' }
      ]
    }
  ];


  return (
    <div className="space-y-8">
      
      {/* ========================================================
          SECTION 1: TRUSTED BY (DYNAMIC BRAND LOGOS TICKER)
         ======================================================== */}
      <section id="trusted-by" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-train {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee-train {
            display: flex;
            animation: marquee-train 25s linear infinite;
          }
        `}} />
        
      </section>



      {/* ========================================================
          SECTION 3: SERVICES OVERVIEW (DYNAMIC SERVICES CATALOG)
         ======================================================== */}
      <section id="services-overview" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {currentLang === 'en' ? 'CAPABILITIES CATALOG' : 'আমাদের সার্ভিসসমূহ'}
          </span>
          <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
            {currentLang === 'en' ? 'Enterprise-Grade Software & Design' : 'বিশ্বমানের এন্টারপ্রাইজ সফটওয়্যার ও ডিজাইন'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            {currentLang === 'en' 
              ? 'We compile typesafe web assemblies, audit legacy databases, and engineer beautiful fluid user interfaces with zero-layout shift guidelines.'
              : 'আমরা নিরাপদ ওয়েব ফ্রেমওয়ার্ক, গতিশীল ক্লাউড ডেটাবেস এবং জিরো-লেআউট শিফট নির্দেশিকা মেনে আকর্ষণীয় ইন্টারফেস তৈরি করি।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 space-y-6 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top border ambient highlight */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {renderLucideIcon(service.icon || 'Globe', "h-5 w-5")}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-sans text-base font-bold text-gray-900 group-hover:text-blue-600 transition duration-200">
                    {currentLang === 'en' ? service.titleEn : service.titleBn}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {currentLang === 'en' ? service.descriptionEn : service.descriptionBn}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="pt-3 border-t border-gray-50">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {currentLang === 'en' ? 'Core Deliverable' : 'প্রধান সুবিধা'}
                  </span>
                  <ul className="space-y-1.5">
                    {(currentLang === 'en' ? service.featuresEn : service.featuresBn).slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2 text-xs text-gray-600">
                        <Check className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    sessionStorage.setItem('selected_service_slug', service.slug);
                    setTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-xl border border-gray-100 hover:border-blue-600 hover:bg-blue-600 text-gray-700 hover:text-white text-xs font-bold py-3 transition cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Learn More' : 'বিস্তারিত জানুন'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => { setTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center space-x-2 rounded-xl border border-gray-200 px-6 py-3 text-xs font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 hover:bg-gray-50/50 transition cursor-pointer"
          >
            <span>{currentLang === 'en' ? 'View All Capabilities' : 'সব সার্ভিসসমূহ দেখুন'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: WHY CHOOSE US (PREMIUM WORLD-CLASS DESIGN)
         ======================================================== */}
      <section id="why-choose-us" className="relative bg-white text-neutral-900 py-16 overflow-hidden border-y border-neutral-100">
        {/* Subtle grid and organic radial gradient background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Main Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Asymmetric Sticky Info Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-xs font-mono tracking-widest text-blue-600 font-bold uppercase">
                  {currentLang === 'en' ? '● THE DIGITAL ECOSYSTEM' : '● ডিজিটাল ইকোসিস্টেম'}
                </span>
                
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                  {currentLang === 'en' ? (
                    <>Why Businesses Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-black">Next Solution</span></>
                  ) : (
                    <>কেন ব্যবসাগুলো <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-black">নেক্সট সলিউশন</span> বেছে নেয়</>
                  )}
                </h2>

                <div className="text-lg font-medium text-neutral-700 font-sans leading-relaxed pt-2">
                  {currentLang === 'en' ? (
                    <>Your Trusted <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">All-in-One</span> Digital Partner</>
                  ) : (
                    <>আপনার বিশ্বস্ত <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">অল-ইন-ওয়ান</span> ডিজিটাল পার্টনার</>
                  )}
                </div>
                
                <p className="text-sm text-neutral-500 font-sans leading-relaxed max-w-md pt-1">
                  {currentLang === 'en' 
                    ? "We do not just deliver simple websites or run typical campaigns. We design, build, and support complete digital ecosystems that help businesses launch, grow, automate, and scale with absolute precision."
                    : "আমরা শুধু সাধারণ ওয়েবসাইট বা গতানুগতিক ক্যাম্পেইন করি না। আমরা এমন ডিজিটাল ইকোসিস্টেম তৈরি ও পরিচালনা করি যা ব্যবসাগুলোর প্রবৃদ্ধি ও অটোমেশন নিশ্চিত করে।"}
                </p>
              </div>

              {/* Trust Badges - Left Panel */}
              <div className="pt-4 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {currentLang === 'en' ? 'Our Guarantees' : 'আমাদের নিশ্চয়তাসমূহ'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {whyChooseUsBadges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-medium text-neutral-700 shadow-sm"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>{currentLang === 'en' ? badge.labelEn : badge.labelBn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini CTA trigger under Left Panel */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setTab('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center space-x-2 rounded-xl bg-neutral-900 px-6 py-3 text-xs font-bold text-white hover:bg-neutral-800 transition shadow-md shadow-neutral-900/10 cursor-pointer"
                >
                  <span>{currentLang === 'en' ? whyChooseUsCTA.primaryButtonTextEn : whyChooseUsCTA.primaryButtonTextBn}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center space-x-2 rounded-xl bg-white border border-neutral-200 px-6 py-3 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <span>{currentLang === 'en' ? whyChooseUsCTA.secondaryButtonTextEn : whyChooseUsCTA.secondaryButtonTextBn}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Immersive Interactive Ecosystem Showcase */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center pt-8 lg:pt-0">
              <div className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] rounded-full border border-neutral-100 bg-neutral-50/30 flex items-center justify-center p-8 shadow-inner">
                
                {/* Glowing connection lines overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="lineNormal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {ecosystemServices.map((eco, idx) => {
                    const angle = (idx / 12) * 2 * Math.PI;
                    const x = Math.round((50 + 40 * Math.cos(angle)) * 100) / 100;
                    const y = Math.round((50 + 40 * Math.sin(angle)) * 100) / 100;
                    const isHovered = hoveredEcosystem?.id === eco.id;
                    return (
                      <line 
                        key={`line-${eco.id}`}
                        x1="50%" 
                        y1="50%" 
                        x2={`${x}%`} 
                        y2={`${y}%`} 
                        stroke={isHovered ? 'url(#lineGrad)' : 'url(#lineNormal)'}
                        strokeWidth={isHovered ? '2.5' : '1.5'}
                        strokeDasharray={isHovered ? 'none' : '4, 4'}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                {/* Central Next Solution Hub */}
                <div className="absolute w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-full bg-white shadow-xl border border-neutral-100 flex flex-col items-center justify-center p-4 text-center z-20 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    {!hoveredEcosystem ? (
                      <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-display font-extrabold text-lg sm:text-xl">
                          N
                        </div>
                        <span className="font-display font-black text-[11px] sm:text-xs tracking-tight text-neutral-900 mt-2">Next Solution</span>
                        <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mt-0.5">Ecosystem</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hovered"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="text-xl sm:text-2xl text-blue-600 mb-1">
                          <IconHelper name={hoveredEcosystem.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <span className="font-sans font-bold text-[10px] sm:text-xs text-neutral-800 line-clamp-1 leading-tight">
                          {currentLang === 'en' ? hoveredEcosystem.labelEn : hoveredEcosystem.labelBn}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-neutral-500 leading-tight mt-1 line-clamp-2 px-1">
                          {currentLang === 'en' ? hoveredEcosystem.descEn : hoveredEcosystem.descBn}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Satellite Ecosystem Nodes */}
                {ecosystemServices.map((eco, idx) => {
                  const angle = (idx / 12) * 2 * Math.PI;
                  const x = Math.round((50 + 40 * Math.cos(angle)) * 100) / 100;
                  const y = Math.round((50 + 40 * Math.sin(angle)) * 100) / 100;
                  const isHovered = hoveredEcosystem?.id === eco.id;
                  
                  return (
                    <div 
                      key={eco.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group/node"
                      onMouseEnter={() => setHoveredEcosystem(eco)}
                      onMouseLeave={() => setHoveredEcosystem(null)}
                    >
                      <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 ${isHovered ? 'border-blue-500 text-blue-600 shadow-blue-500/10' : 'border-neutral-100 text-neutral-500 hover:border-neutral-300 shadow-neutral-200/40'}`}>
                        <IconHelper name={eco.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-neutral-900 text-white text-[8px] font-sans font-medium whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                        {currentLang === 'en' ? eco.labelEn : eco.labelBn}
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>

          {/* Staggered Feature Cards - Bento Styled Grid */}
          <div className="space-y-12 pt-16 border-t border-neutral-100">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-blue-600 animate-pulse">
                <Activity className="h-3.5 w-3.5 text-blue-500" />
                <span>{currentLang === 'en' ? 'OUR CAPABILITIES' : 'আমাদের দক্ষতাসমূহ'}</span>
              </span>
              <h3 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                {currentLang === 'en' ? 'Engineered for Performance & Success' : 'পারফরম্যান্স ও সাফল্যের নিখুঁত নিশ্চয়তা'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
                {currentLang === 'en'
                  ? 'We design and optimize every touchpoint with extreme precision. Explore the concrete advantages of our high-speed growth architecture.'
                  : 'আমরা অত্যন্ত সূক্ষ্মতার সাথে প্রতিটি টাচপয়েন্ট ডিজাইন এবং অপ্টিমাইজ করি। আমাদের হাই-স্পিড গ্রোথ আর্কিটেকচারের সুবিধাগুলো দেখুন।'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {whyChooseUsCards.map((card, idx) => {
                // Determine responsive column spans for bento layout
                let spanClass = 'lg:col-span-2 md:col-span-1';
                if (idx === 0) spanClass = 'lg:col-span-3 md:col-span-2';
                else if (idx === 1) spanClass = 'lg:col-span-3 md:col-span-2';
                else if (idx === 2) spanClass = 'lg:col-span-2 md:col-span-1';
                else if (idx === 3) spanClass = 'lg:col-span-2 md:col-span-1';
                else if (idx === 4) spanClass = 'lg:col-span-2 md:col-span-2';
                else if (idx === 5) spanClass = 'lg:col-span-3 md:col-span-1';
                else if (idx === 6) spanClass = 'lg:col-span-3 md:col-span-1';
                else if (idx === 7) spanClass = 'lg:col-span-6 md:col-span-2';

                const isPartnerCard = card.titleEn.toLowerCase().includes('partner') || idx === 0;
                const isGrowthCard = card.titleEn.toLowerCase().includes('growth') || idx === 1;
                const isAICard = card.titleEn.toLowerCase().includes('ai') || idx === 7;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`group relative bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden -z-0 ${spanClass}`}
                  >
                    {/* Glowing outer hover outline */}
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xs"></div>
                    
                    {/* Absolute soft decorative radial spotlight inside the card */}
                    <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-50/20 rounded-full blur-2xl group-hover:bg-blue-100/30 transition-all duration-300 pointer-events-none -z-10"></div>

                    <div className="space-y-6 relative z-10 w-full">
                      {isAICard ? (
                        // Special Full-width AI Row Layout
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 w-full">
                          <div className="space-y-4 flex-1">
                            <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                                <IconHelper name={card.icon} className="h-6 w-6" />
                              </div>
                              {renderCardVisual(card.stat)}
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-neutral-900 group-hover:text-purple-600 transition-colors duration-200">
                                {currentLang === 'en' ? card.titleEn : card.titleBn}
                              </h4>
                              <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed max-w-xl">
                                {currentLang === 'en' ? (card.descriptionEn || card.descEn) : (card.descriptionBn || card.descBn)}
                              </p>
                            </div>

                            {card.badgeTextEn && (
                              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50/60 border border-purple-100 text-[10px] font-mono font-bold text-purple-600 tracking-wider uppercase">
                                <Sparkles className="h-3 w-3" />
                                <span>{currentLang === 'en' ? card.badgeTextEn : card.badgeTextBn}</span>
                              </div>
                            )}
                          </div>

                          <AIConsoleSimulator currentLang={currentLang} />
                        </div>
                      ) : (
                        // Standard Card Layout
                        <>
                          <div className="flex items-center justify-between">
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                              <IconHelper name={card.icon} className="h-5.5 w-5.5" />
                            </div>
                            {renderCardVisual(card.stat)}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-sans font-bold text-lg text-neutral-900 group-hover:text-blue-600 transition-colors duration-200">
                              {currentLang === 'en' ? card.titleEn : card.titleBn}
                            </h4>
                            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                              {currentLang === 'en' ? (card.descriptionEn || card.descEn) : (card.descriptionBn || card.descBn)}
                            </p>

                            {/* Inject custom micro-visualizers if they match */}
                            {isPartnerCard && <EcosystemFlowVisual currentLang={currentLang} />}
                            {isGrowthCard && <GrowthChartVisual currentLang={currentLang} />}
                          </div>
                        </>
                      )}
                    </div>

                    {!isAICard && (
                      <div className="pt-5 border-t border-neutral-50 mt-6 relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span className="font-medium tracking-wide">{card.categoryEn || 'PERFORMANCE'}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-blue-600" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 6: OUR PROCESS (PREMIUM TIMELINE)
         ======================================================== */}
      <section id="our-process" className="relative bg-white py-28 overflow-hidden border-y border-gray-100">
        {/* Ambient Gradient Background Orbs */}
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{currentLang === 'en' ? processCTA.titleEn : processCTA.titleBn}</span>
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              {currentLang === 'en' ? processCTA.highlightEn : processCTA.highlightBn}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'en' ? processCTA.subtitleEn : processCTA.subtitleBn}
            </p>
          </div>

          {/* Adaptation Service Selector (Interactive Tab) */}
          <div className="max-w-2xl mx-auto bg-gray-50/80 border border-gray-100 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1 shadow-sm">
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
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconHelper name={tab.icon} className="h-3.5 w-3.5" />
                  <span>{currentLang === 'en' ? tab.labelEn : tab.labelBn}</span>
                </button>
              );
            })}
          </div>

          {/* Adaptability Insight Banner */}
          <div className="max-w-3xl mx-auto rounded-xl bg-blue-50/50 border border-blue-100/50 p-4 text-center">
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
          <div className="relative mt-12">
            
            {/* Desktop Center connector line */}
            <div className="absolute left-4 lg:left-1/2 top-4 bottom-4 w-[2px] bg-gray-100 lg:-translate-x-[1px] hidden md:block"></div>
            
            {/* Center connector line GLOW progress bar */}
            <div className="absolute left-4 lg:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-600 via-indigo-500 to-purple-600 lg:-translate-x-[1px] hidden md:block opacity-30"></div>

            <div className="space-y-8 relative">
              {processSteps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`flex flex-col md:flex-row items-stretch gap-6 lg:gap-12 relative ${
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Visual dot indicator with glow if hovered */}
                    <div className="absolute left-4 lg:left-1/2 top-8 h-8 w-8 rounded-full bg-white border-4 border-blue-600 z-10 lg:-translate-x-[16px] hidden md:flex items-center justify-center shadow-lg transition-all duration-300">
                      <span className="text-[10px] font-black text-blue-600 font-mono">{step.stepNumber}</span>
                    </div>
                    
                    {/* Content card (Responsive wrapper) */}
                    <div className="w-full lg:w-1/2 pl-0 md:pl-16 lg:pl-0">
                      <div className="group relative rounded-3xl border border-gray-100 bg-white p-6 md:p-8 space-y-6 shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-300">
                        {/* Decorative subtle border glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        {/* Top Metadata Row */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 font-mono">
                            STEP {step.stepNumber}
                          </span>
                          <span className="text-2xl" role="img" aria-label="step-icon">
                            {step.icon}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3">
                          <h3 className="font-sans text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {currentLang === 'en' ? step.titleEn : step.titleBn}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                            {currentLang === 'en' ? step.descriptionEn : step.descriptionBn}
                          </p>
                        </div>

                        {/* Detail Reveal Panel */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50 text-xs">
                          {/* Deliverables Column */}
                          <div className="space-y-2">
                            <span className="block font-bold text-gray-400 uppercase tracking-widest text-[9px]">
                              {currentLang === 'en' ? 'Deliverables' : 'ডেলিভারিবলস'}
                            </span>
                            <ul className="space-y-1.5">
                              {(currentLang === 'en' ? step.deliverablesEn : step.deliverablesBn).map((del, dIdx) => (
                                <li key={dIdx} className="flex items-center space-x-1 text-gray-600">
                                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                  <span>{del}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tools & Services Column */}
                          <div className="space-y-4">
                            {/* Duration */}
                            <div className="space-y-1">
                              <span className="block font-bold text-gray-400 uppercase tracking-widest text-[9px]">
                                {currentLang === 'en' ? 'Estimated Duration' : 'আনুমানিক সময়'}
                              </span>
                              <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md inline-block">
                                {currentLang === 'en' ? step.estimatedDurationEn : step.estimatedDurationBn}
                              </span>
                            </div>

                            {/* Tools Used */}
                            <div className="space-y-1.5">
                              <span className="block font-bold text-gray-400 uppercase tracking-widest text-[9px]">
                                {currentLang === 'en' ? 'Primary Stack' : 'প্রধান স্ট্যাক'}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {step.toolsUsed.map((tool, tIdx) => (
                                  <span key={tIdx} className="px-2 py-0.5 rounded bg-gray-50 text-gray-500 font-mono text-[10px]">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    
                    {/* Empty placeholder to keep layout centered */}
                    <div className="w-1/2 hidden lg:block"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Interactive Flow Indicator Line (Idea -> Build -> Launch -> Grow) */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-gray-50 border border-gray-100 p-6 shadow-inner space-y-4">
            <span className="block text-center font-bold text-gray-400 uppercase tracking-widest text-[9px]">
              {currentLang === 'en' ? 'Digital Lifecycle Pipeline' : 'ডিজিটাল লাইফসাইকেল পাইপলাইন'}
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-3 items-center text-center">
              {[
                { labelEn: '1. Idea', labelBn: '১. আইডিয়া', color: 'from-blue-500 to-indigo-500' },
                { labelEn: '2. Research', labelBn: '২. রিসার্চ', color: 'from-indigo-500 to-indigo-600' },
                { labelEn: '3. Strategy', labelBn: '৩. পরিকল্পনা', color: 'from-indigo-600 to-violet-500' },
                { labelEn: '4. Design', labelBn: '৪. ডিজাইন', color: 'from-violet-500 to-violet-600' },
                { labelEn: '5. Build', labelBn: '৫. ডেভেলপমেন্ট', color: 'from-violet-600 to-purple-500' },
                { labelEn: '6. Test', labelBn: '৬. টেস্টিং', color: 'from-purple-500 to-purple-600' },
                { labelEn: '7. Launch', labelBn: '৭. ডেপ্লয়', color: 'from-purple-600 to-fuchsia-500' },
                { labelEn: '8. Optimize', labelBn: '৮. অপ্টিমাইজ', color: 'from-fuchsia-500 to-rose-500' },
                { labelEn: '9. Grow', labelBn: '৯. প্রবৃদ্ধি', color: 'from-rose-500 to-emerald-500' }
              ].map((flow, fIdx) => (
                <div key={fIdx} className="space-y-1.5 group flex flex-col items-center">
                  <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${flow.color} opacity-85 group-hover:scale-y-125 transition-transform duration-200`}></div>
                  <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                    {currentLang === 'en' ? flow.labelEn : flow.labelBn}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400 italic">
              {currentLang === 'en' 
                ? "Every project undergoes our complete digital optimization lifecycle, ensuring bulletproof execution."
                : "প্রতিটি প্রজেক্ট আমাদের সম্পূর্ণ ডিজিটাল অপ্টিমাইজেশন চক্রের মধ্য দিয়ে যায়, যা বুলেটপ্রুফ কার্যকারিতা নিশ্চিত করে।"}
            </p>
          </div>

          {/* Trust Text */}
          <p className="text-center text-xs text-gray-400 font-medium">
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentLang === 'en' ? 'CASE STUDIES' : 'আমাদের কাজের নমুনা'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
              {currentLang === 'en' ? 'Our Featured Client Deployments' : 'আমাদের তৈরি প্রিমিয়াম কেস স্টাডি সমূহ'}
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 select-none">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition duration-150 whitespace-nowrap cursor-pointer ${
                  activePortfolioFilter === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {getPortfolioCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.slice(0, 6).map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl border border-neutral-100 bg-white p-4 hover:border-blue-600 hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Modern sleek hover glow background element */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="space-y-4 relative z-10">
                  {/* 1. Project Featured Image (At the top of the design) */}
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-neutral-50 relative border border-neutral-100">
                    <img 
                      src={item.image} 
                      alt={item.titleEn} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category Badge over Image */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-neutral-800 font-mono text-[8.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-neutral-200/50 shadow-xs">
                      {getPortfolioCategoryLabel(item.category)}
                    </div>

                    {/* Modern Quick View Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm text-neutral-900 rounded-full p-2.5 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Project Metadata & Text Content */}
                  <div className="space-y-2 px-0.5">
                    {/* Industry and Duration row */}
                    <div className="flex items-center justify-between text-[9px] font-mono tracking-wide">
                      <span className="font-extrabold uppercase text-blue-600">
                        {currentLang === 'en' ? item.industryEn || 'Digital Product' : item.industryBn || 'ডিজিটাল প্রোডাক্ট'}
                      </span>
                      <span className="text-neutral-400 font-medium bg-neutral-50 px-1.5 py-0.5 rounded border border-neutral-100">
                        {item.duration}
                      </span>
                    </div>

                    {/* 2. Name / Title */}
                    <h3 className="font-sans text-sm sm:text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
                      {currentLang === 'en' ? item.titleEn : item.titleBn}
                    </h3>

                    {/* 3. Short Description */}
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-sans line-clamp-2">
                      {currentLang === 'en' ? item.descriptionEn : item.descriptionBn}
                    </p>
                  </div>
                </div>

                {/* 4. Built with / Technologies Section */}
                <div className="pt-3 mt-4 border-t border-neutral-50 flex flex-col space-y-2 relative z-10">
                  <div className="flex items-center space-x-1">
                    <Code className="h-3 w-3 text-neutral-400" />
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                      {currentLang === 'en' ? 'Built with:' : 'যা দিয়ে তৈরি:'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="rounded-full bg-neutral-50 hover:bg-blue-50/50 hover:text-blue-600 border border-neutral-200/60 text-[8.5px] font-bold text-neutral-500 font-mono px-2 py-0.5 transition-colors duration-200"
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

        <div className="text-center pt-4">
          <button
            onClick={() => { setTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center space-x-2 rounded-xl border border-gray-200 px-6 py-3 text-xs font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 hover:bg-gray-50/50 transition cursor-pointer"
          >
            <span>{currentLang === 'en' ? 'Explore Full Portfolio' : 'সম্পূর্ণ পোর্টফোলিও ক্যাটালগ'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: INDUSTRIES WE SERVE (PREMIUM VERTICALS)
         ======================================================== */}
      <section id="industries" className="bg-gray-50/20 border-y border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentLang === 'en' ? 'SECTOR DOMINANCE' : 'আমাদের দক্ষতাসমূহ'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
              {currentLang === 'en' ? 'Custom Engineering for Diverse Industries' : 'ভিন্ন খাতের জন্য বিশেষায়িত সফটওয়্যার সলিউশন'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
              {currentLang === 'en' 
                ? 'We translate complex industry workflows into intuitive, lighting-fast Typesafe software interfaces.'
                : 'আমরা জটিল সেক্টর রিকোয়ারমেন্টকে সহজ ও অত্যন্ত গতিশীল ডিজিটাল ইন্টারফেসে রূপান্তর করি।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 space-y-4 shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50/50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-200">
                    {renderLucideIcon(industry.iconName, "h-5 w-5")}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-sans text-base font-bold text-gray-900">
                      {currentLang === 'en' ? industry.nameEn : industry.nameBn}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {currentLang === 'en' ? industry.descEn : industry.descBn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button 
                    onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-gray-400 group-hover:text-blue-600 transition"
                  >
                    <span>{currentLang === 'en' ? 'Discuss Vertical' : 'পরামর্শ নিন'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: TECHNOLOGIES WE USE (PREMIUM INTERACTIVE STACK)
         ======================================================== */}
      <section id="technologies" className="relative overflow-hidden py-12 border-y border-neutral-100 bg-linear-to-b from-white via-[#FAFAFA]/40 to-white">
        {/* Modern subtle ambient gradients in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 h-72 w-72 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          {/* Header Block */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              {currentLang === 'en' ? '⚡ Modern Technology Stack' : '⚡ আধুনিক প্রযুক্তির সমাহার'}
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight"
            >
              {currentLang === 'en' ? 'The Technologies Powering ' : 'নেক্সট সলিউশনের শক্তিশালী '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Next Solution
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-sm md:text-base text-neutral-500 font-semibold uppercase tracking-wider"
            >
              {currentLang === 'en' ? 'Built With Industry-Leading Tools & Frameworks' : 'শিল্প-সেরা ফ্রেমওয়ার্ক ও টুলের নিখুঁত ব্যবহার'}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              {currentLang === 'en' 
                ? 'We use the latest technologies, platforms, frameworks, and creative tools to build high-performing websites, applications, brands, marketing campaigns, AI systems, and digital experiences that help businesses grow faster.'
                : 'আমরা আধুনিকতম প্রযুক্তি, প্ল্যাটফর্ম, ফ্রেমওয়ার্ক এবং সৃজনশীল টুলস ব্যবহার করি উচ্চ-মানের ওয়েবসাইট, ওয়েব অ্যাপ্লিকেশন, ব্র্যান্ড আইডেন্টিটি, ডিজিটাল মার্কেটিং ক্যাম্পেইন, এআই সিস্টেম এবং অসাধারণ ডিজিটাল অভিজ্ঞতা তৈরি করতে যা আপনার ব্যবসাকে দ্রুত বড় করতে সাহায্য করবে।'}
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
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-white border border-neutral-200/50 hover:border-blue-500 hover:text-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(59,130,246,0.1)] cursor-default transition-colors duration-300 shadow-xs font-mono"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                  {tag.name}
                </motion.div>
              ))}
            </div>
          </div>

          {/* TECHNOLOGY COUNTERS */}
         

          {/* BENTO GRID OF CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {techServiceCards.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                whileHover={{ y: -8 }}
                key={item.id}
                className="group relative rounded-3xl border border-neutral-200/50 bg-white p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:border-blue-500 hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.08)] transition-all duration-500"
              >
                {/* Glossy gradient highlight on hover */}
                <div className="absolute inset-0 bg-radial-gradient(circle_at_top_left,rgba(37,99,235,0.02)_0%,transparent_60%) pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top Badge & Icon Row */}
                <div className="relative z-10 space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      {renderLucideIcon(item.icon, "h-6 w-6")}
                    </div>
                    
                    {/* Featured Badge */}
                    {(currentLang === 'en' ? item.featuredBadgeEn : item.featuredBadgeBn) && (
                      <span className="text-[9px] font-bold font-mono bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full uppercase tracking-wider border border-indigo-100/30">
                        {currentLang === 'en' ? item.featuredBadgeEn : item.featuredBadgeBn}
                      </span>
                    )}
                  </div>

                  {/* Service Text */}
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <h3 className="font-sans text-xl font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors duration-300">
                        {currentLang === 'en' ? item.categoryEn : item.categoryBn}
                      </h3>
                      <span className="text-[10px] font-extrabold text-neutral-400 font-mono">
                        ({item.projectCount})
                      </span>
                    </div>

                    <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                      {currentLang === 'en' ? item.descriptionEn : item.descriptionBn}
                    </p>
                  </div>

                  {/* Core Technologies Badges */}
                  <div className="space-y-2">
                    <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400">
                      {currentLang === 'en' ? 'Core Stack' : 'প্রধান টেকনোলজি'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.slice(0, 6).map((tech) => (
                        <span 
                          key={tech}
                          className="rounded-lg bg-neutral-50 hover:bg-blue-50/50 border border-neutral-200/60 text-[9px] font-extrabold font-mono text-neutral-600 hover:text-blue-600 px-2.5 py-1 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 6 && (
                        <span className="rounded-lg bg-blue-50/30 border border-blue-100/20 text-[9px] font-extrabold font-mono text-blue-600 px-2 py-1">
                          +{item.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Hidden Drawer/Content - Reveals on hover/desktop or stands elegantly */}
                <div className="mt-6 pt-5 border-t border-neutral-50 space-y-4 relative z-10 transition-all duration-300">
                  {/* Experience Level & Count Row */}
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono text-neutral-400">
                    <span>{currentLang === 'en' ? item.experienceLevelEn : item.experienceLevelBn}</span>
                    <span className="text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100/30">
                      {currentLang === 'en' ? 'Used By 120+ Projects' : '১২০+ প্রজেক্টে ব্যবহৃত'}
                    </span>
                  </div>

                  {/* Hover expansion container (always readable, extra sleek styled bullet points) */}
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 space-y-3 pt-1">
                    {/* Popular Projects */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 flex items-center">
                        <CheckCircle className="h-3 w-3 text-emerald-500 mr-1" />
                        {currentLang === 'en' ? 'Popular Solutions' : 'জনপ্রিয় সমাধানসমূহ'}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[11px] font-sans text-neutral-600 font-medium pl-4">
                        {(currentLang === 'en' ? item.popularProjectsEn : item.popularProjectsBn).map((proj, pIdx) => (
                          <div key={pIdx} className="flex items-center">
                            <span className="h-1 w-1 bg-neutral-300 rounded-full mr-2"></span>
                            {proj}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="space-y-1">
                      <div className="text-[9px] font-extrabold font-mono uppercase tracking-wider text-neutral-400 flex items-center">
                        <Sparkles className="h-3 w-3 text-blue-500 mr-1" />
                        {currentLang === 'en' ? 'Core Benefits' : 'মূল সুবিধা'}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[11px] font-sans text-neutral-600 font-medium pl-4">
                        {(currentLang === 'en' ? item.benefitsEn : item.benefitsBn).map((benefit, bIdx) => (
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
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 10: PRICING PREVIEW (TRANSPARENT RATES)
         ======================================================== */}
      <section id="pricing-preview" className="bg-gray-50/30 border-y border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentLang === 'en' ? 'TRANSPARENT RATES' : 'স্বচ্ছ প্রাইসিং'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
              {currentLang === 'en' ? 'Predictable Packages for Scalable Growth' : 'বাস্তবসম্মত ও সাশ্রয়ী প্রিমিয়াম প্ল্যান'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
              {currentLang === 'en' 
                ? 'Milestone-based billing, zero hidden fees, and absolute source-code transparency.'
                : 'নির্ধারিত কাজের জন্য স্বচ্ছ মাইলস্টোন চুক্তি, কোনো অতিরিক্ত হিডেন চার্জ নেই।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPackages.slice(0, 3).map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -5 }}
                className={`rounded-3xl border bg-white p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between relative overflow-hidden ${
                  pkg.popular 
                    ? 'border-blue-600 ring-1 ring-blue-600/20 shadow-blue-600/5' 
                    : 'border-gray-100'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                    {currentLang === 'en' ? 'Most Popular' : 'জনপ্রিয়'}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-widest block">{pkg.category}</span>
                    <h3 className="font-sans text-lg font-black text-gray-900">{currentLang === 'en' ? pkg.nameEn : pkg.nameBn}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{currentLang === 'en' ? pkg.descriptionEn : pkg.descriptionBn}</p>
                  </div>

                  <div className="py-2 border-y border-gray-50 flex items-baseline space-x-1.5">
                    <span className="text-3xl font-black text-gray-900 font-mono">${pkg.priceMonthly}</span>
                    <span className="text-xs text-gray-400">/ {currentLang === 'en' ? 'mo' : 'মাস'}</span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {currentLang === 'en' ? 'Includes Core Benefits' : 'প্ল্যানে যা যা অন্তর্ভুক্ত'}
                    </span>
                    <ul className="space-y-2">
                      {(currentLang === 'en' ? pkg.featuresEn : pkg.featuresBn).slice(0, 5).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 leading-tight">{feat}</span>
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
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100'
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
              className="inline-flex items-center space-x-2 rounded-xl border border-gray-200 px-6 py-3 text-xs font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 hover:bg-gray-50/50 transition cursor-pointer"
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentLang === 'en' ? 'CLIENT FEEDBACK' : 'ক্লায়েন্ট টেস্টিমোনিয়াল'}
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-black text-gray-900 leading-tight">
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
                className="group relative rounded-2xl border border-neutral-100/70 bg-[#FAFAFA]/40 p-5 hover:bg-white hover:border-blue-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
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
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal italic">
                    "{currentLang === 'en' ? item.feedbackEn : item.feedbackBn}"
                  </p>
                </div>

                {/* Profile Meta */}
                <div className="flex items-center space-x-3 pt-4 border-t border-neutral-100/50">
                  <div className="h-9 w-9 rounded-full overflow-hidden border border-neutral-100 bg-neutral-50 shrink-0">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-neutral-900 truncate">{item.name}</span>
                    <span className="block text-[9px] text-neutral-400 font-semibold uppercase tracking-wider truncate">
                      {currentLang === 'en' ? item.roleEn : item.roleBn}
                    </span>
                    <span className="block text-[9px] text-blue-600 font-bold truncate">
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
      <section id="success-stories" className="bg-gray-50/20 border-y border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {currentLang === 'en' ? 'ENTERPRISE OUTCOMES' : 'গ্রাহক কেস স্টাডি'}
            </span>
            <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
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
                className="rounded-3xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Text Flow: Challenge & Solution */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                        {currentLang === 'en' ? story.industryEn : story.industryBn} • {story.timelineEn}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-gray-900">
                        {story.companyName} — {currentLang === 'en' ? story.serviceEn : story.serviceBn}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest font-mono">
                          {currentLang === 'en' ? 'THE CHALLENGE' : 'প্রধান সমস্যা'}
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {currentLang === 'en' ? story.challengeEn : story.challengeBn}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono">
                          {currentLang === 'en' ? 'OUR SYSTEM SOLUTION' : 'আমাদের কাস্টম সলিউশন'}
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {currentLang === 'en' ? story.solutionEn : story.solutionBn}
                        </p>
                      </div>
                    </div>

                    {/* Client quote */}
                    <div className="relative rounded-2xl bg-[#FAFAFA]/80 p-5 border border-gray-50">
                      <Quote className="absolute right-4 top-4 h-8 w-8 text-blue-50" />
                      <blockquote className="text-xs text-gray-600 leading-relaxed italic relative z-10">
                        "{currentLang === 'en' ? story.clientQuoteEn : story.clientQuoteBn}"
                      </blockquote>
                      <div className="mt-3 flex items-center space-x-2.5">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                          <img src={story.clientPhoto} alt={story.clientName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-900">{story.clientName}</span>
                          <span className="block text-[9px] text-gray-400">
                            {currentLang === 'en' ? story.clientRoleEn : story.clientRoleBn} — {story.companyName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Display Grid */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-blue-50 bg-blue-50/20 p-6 space-y-4">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                        {currentLang === 'en' ? 'MEASURABLE IMPROVEMENTS' : 'পরিমাপযোগ্য ফলাফল'}
                      </span>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        {currentLang === 'en' ? story.resultsEn : story.resultsBn}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-gray-100 p-4 text-center space-y-1">
                        <span className="text-2xl font-black text-blue-600 font-mono">35%</span>
                        <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                          {currentLang === 'en' ? 'Transaction Lift' : 'সেলস ও ট্রানজেকশন বৃদ্ধি'}
                        </span>
                      </div>
                      <div className="rounded-2xl border border-gray-100 p-4 text-center space-y-1">
                        <span className="text-2xl font-black text-emerald-600 font-mono">&lt;300ms</span>
                        <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                          {currentLang === 'en' ? 'Response Latency' : 'সাইটের লোডিং টাইম'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {story.technologies.map((t) => (
                        <span key={t} className="rounded bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-400 font-mono px-2 py-0.5">
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
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {currentLang === 'en' ? 'KNOWLEDGE CENTER' : 'আমাদের সর্বশেষ ব্লগ'}
              </span>
              <h2 className="font-sans text-3xl font-black text-gray-900 leading-tight">
                {currentLang === 'en' ? 'Insights on Software Engineering' : 'সফটওয়্যার ও এআই প্রযুক্তির সর্বশেষ আপডেট'}
              </h2>
            </div>
            
            <button
              onClick={() => { setTab('blogs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center space-x-1.5 rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 transition cursor-pointer self-start md:self-auto"
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
                className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-5 space-y-5 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gray-50 relative border border-gray-50">
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
                    <span className="text-[10px] text-gray-400 font-mono flex items-center space-x-1.5">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </span>
                    <h3 className="font-sans text-sm font-bold text-gray-900 group-hover:text-blue-600 transition duration-200 line-clamp-2">
                      {currentLang === 'en' ? post.titleEn : post.titleBn}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {currentLang === 'en' ? post.excerptEn : post.excerptBn}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-blue-600 transition">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-500">By {post.author}</span>
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
        <div className="rounded-3xl border border-gray-100 bg-[#FAFAFA] p-8 md:p-16 text-center space-y-8 shadow-sm relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {currentLang === 'en' ? 'Ready to transform your ideas into market success?' : 'আপনার আইডিয়াকে সাফল্যের শিখরে নিয়ে যেতে প্রস্তুত?'}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
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
              className="w-full sm:w-auto rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 text-xs font-bold px-6 py-4 border border-gray-200 transition hover:scale-[1.01] cursor-pointer"
            >
              {currentLang === 'en' ? 'Book a Free Consultation' : 'ফ্রি কনসালটেশন বুক করুন'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
