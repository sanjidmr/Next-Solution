"use client";
import React, { useState } from 'react';
import { Globe, ArrowUpRight, TrendingUp, Zap, Users, ShieldAlert, Sparkles, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisualsProps {
  currentLang: 'en' | 'bn';
}

interface MapLocation {
  id: string;
  name: string;
  country: string;
  flag: string;
  serviceEn: string;
  serviceBn: string;
  stat: string;
  cx: string; // SVG positioning X
  cy: string; // SVG positioning Y
}

export default function TestimonialsVisuals({ currentLang }: VisualsProps) {
  // Map Location Hotspots
  const locations: MapLocation[] = [
    { id: 'loc-1', name: 'Fintech Spark Inc.', country: 'San Francisco, USA', flag: '🇺🇸', serviceEn: 'Web App & Dashboard Rebuild', serviceBn: 'ড্যাশবোর্ড ও ওয়েব অ্যাপ রিডিজাইন', stat: '+35% Conversions', cx: '22%', cy: '36%' },
    { id: 'loc-2', name: 'Sora Web3 Labs', country: 'Singapore', flag: '🇸🇬', serviceEn: 'Unified Brand System & Landing', serviceBn: 'ব্র্যান্ড ডিজাইন ও পোর্টাল প্ল্যাটফর্ম', stat: '+$12M Series-A Raised', cx: '76%', cy: '56%' },
    { id: 'loc-3', name: 'Pioneer Retail Ltd.', country: 'Dhaka, Bangladesh', flag: '🇧🇩', serviceEn: 'Enterprise E-commerce Platform', serviceBn: 'এন্টারপ্রাইজ ই-কমার্স সিস্টেম', stat: '4.2x ROI on Tech Investment', cx: '70%', cy: '46%' },
    { id: 'loc-4', name: 'Horizon Telehealth', country: 'London, UK', flag: '🇬🇧', serviceEn: 'Compliance Audit & Client UI', serviceBn: 'কমপ্লায়েন্স অডিট ও ক্লায়েন্ট ইন্টারফেস', stat: 'Site Load Time <300ms', cx: '48%', cy: '28%' },
    { id: 'loc-5', name: 'Scribe AI Logistics', country: 'Sydney, Australia', flag: '🇦🇺', serviceEn: 'AI Agents & Slack Orchestrator', serviceBn: 'এআই এজেন্ট এবং স্ল্যাক অর্কেস্ট্রেটর', stat: '+98% Ops Efficiency', cx: '88%', cy: '78%' }
  ];

  const [activeLoc, setActiveLoc] = useState<MapLocation | null>(locations[0]);

  // Client Achievements state
  const [activeMetricTab, setActiveMetricTab] = useState<'traffic' | 'speed' | 'conversion' | 'leads'>('conversion');

  const metricsData = {
    traffic: {
      titleEn: 'Monthly Organic Traffic',
      titleBn: 'মাসিক অর্গানিক ট্রাফিক প্রবৃদ্ধি',
      descEn: 'We implement surgical technical SEO audits, site speed caching, and structure mapping to turn domains into search magnets.',
      descBn: 'এসইও অপ্টিমাইজেশন ও স্পিড টিউনিংয়ের মাধ্যমে সার্চ র‍্যাঙ্কিংয়ে অভূতপূর্ব পরিবর্তন।',
      before: '2,500 visits / mo',
      after: '68,400 visits / mo',
      percentage: '2,636%',
      beforeVal: 15,
      afterVal: 95,
      color: 'from-blue-500 to-cyan-400'
    },
    speed: {
      titleEn: 'Framer / Page Load Speed',
      titleBn: 'ওয়েবসাইট লোড স্পিড উন্নয়ন',
      descEn: 'By replacing heavy libraries with React dynamic imports and optimizing assets, we achieve sub-millisecond core web vitals.',
      descBn: 'ভারী লাইব্রেরির বিকল্প ব্যবহার করে প্রতিটি পেজের লোড স্পিড ৩০০ মিলি-সেকেন্ডের নিচে নামিয়ে আনা হয়েছে।',
      before: '4.8 seconds (High bounce)',
      after: '0.3 seconds (Sub-millisecond)',
      percentage: '-93.7% delay',
      beforeVal: 88,
      afterVal: 8,
      color: 'from-amber-500 to-rose-500'
    },
    conversion: {
      titleEn: 'Landing Page Conversions',
      titleBn: 'ল্যান্ডিং পেজ কনভার্সন রেট',
      descEn: 'Stripe, Linear, and Vercel-inspired typography pairings combined with layout hierarchy results in instant conversion leaps.',
      descBn: 'আধুনিক ডিজাইন থিওরি এবং চমৎকার ইউজার ইন্টারফেসের সমন্বয়ে কনভার্সন রেট বৃদ্ধি।',
      before: '1.2% average conversion',
      after: '4.9% verified conversion',
      percentage: '308% increase',
      beforeVal: 24,
      afterVal: 98,
      color: 'from-emerald-500 to-teal-400'
    },
    leads: {
      titleEn: 'Monthly B2B Lead Intake',
      titleBn: 'মাসিক নতুন বিটুবি ক্লায়েন্ট লিড',
      descEn: 'Interactive cost calculators, custom onboarding workflows, and smart integrations mean leads flow into your CRM automatically.',
      descBn: 'সহজ অনবোর্ডিং ফানেল ও কাস্টমাইজড কোটেশন ক্যালকুলেটরের মাধ্যমে ক্লায়েন্ট লিড বৃদ্ধি।',
      before: '18 qualified leads / mo',
      after: '142 qualified leads / mo',
      percentage: '688% surge',
      beforeVal: 12,
      afterVal: 90,
      color: 'from-indigo-500 to-purple-500'
    }
  };

  const activeMetric = metricsData[activeMetricTab];

  return (
    <div className="space-y-16">
      
      {/* 10. GLOBAL CLIENT MAP */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Map Info Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
              <Globe className="h-3.5 w-3.5 animate-spin-slow" />
              <span>{currentLang === 'en' ? 'Remote Delivery Ecosystem' : 'রিমোট ডেলিভারি ইকোসিস্টেম'}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {currentLang === 'en' ? 'Global Footprint of Trust' : 'বিশ্বজুড়ে আমাদের কাজের প্রভাব'}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              {currentLang === 'en'
                ? 'From Silicon Valley startups to fast-scaling South Asian enterprises, Next Solution delivers state-of-the-art systems everywhere, ensuring zero latency and 100% core architecture uptime.'
                : 'আমেরিকা থেকে শুরু করে অস্ট্রেলিয়া পর্যন্ত বিশ্বব্যাপী ক্লায়েন্টদের জন্য নেক্সট সলিউশন ডেভেলপ করছে আধুনিক সফটওয়্যার সলিউশন ও চমৎকার ইউআই সিস্টেম।'}
            </p>

            {/* List of points on the left for interaction */}
            <div className="space-y-2 pt-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLoc(loc)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                    activeLoc?.id === loc.id
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="font-semibold flex items-center space-x-2">
                    <span>{loc.flag}</span>
                    <span className="truncate">{loc.name}</span>
                  </span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono text-cyan-400 font-bold">{loc.stat.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map Section */}
          <div className="lg:col-span-8 relative">
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4 relative aspect-[1.85] overflow-hidden flex items-center justify-center">
              
              {/* World Map Outline SVG */}
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full opacity-35 text-slate-700 select-none pointer-events-none"
                fill="currentColor"
              >
                {/* Simplified Grid of dots representing continents */}
                <g fill="#475569" opacity="0.45">
                  {/* North America */}
                  <rect x="150" y="120" width="160" height="120" rx="40" />
                  <rect x="250" y="200" width="100" height="80" rx="30" />
                  {/* South America */}
                  <rect x="280" y="280" width="90" height="150" rx="30" />
                  {/* Europe */}
                  <rect x="440" y="100" width="120" height="90" rx="30" />
                  {/* Africa */}
                  <rect x="460" y="210" width="100" height="140" rx="40" />
                  {/* Asia */}
                  <rect x="580" y="110" width="220" height="160" rx="50" />
                  <rect x="700" y="240" width="120" height="80" rx="25" />
                  {/* Oceania */}
                  <rect x="800" y="320" width="110" height="90" rx="35" />
                </g>
              </svg>

              {/* Glowing Pulse Nodes */}
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  style={{ left: loc.cx, top: loc.cy }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                  onClick={() => setActiveLoc(loc)}
                >
                  <span className={`absolute inline-flex h-5 w-5 rounded-full opacity-75 ${
                    activeLoc?.id === loc.id ? 'bg-cyan-500 animate-ping' : 'bg-slate-400 animate-pulse'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-white shadow-lg ${
                    activeLoc?.id === loc.id ? 'bg-cyan-400' : 'bg-slate-500'
                  }`}></span>
                </div>
              ))}

              {/* Active Location Tooltip overlay */}
              <AnimatePresence mode="wait">
                {activeLoc && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-950/95 border border-slate-800 p-4 rounded-xl shadow-2xl backdrop-blur-md z-20"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm">{activeLoc.flag}</span>
                        <div>
                          <span className="block font-bold text-xs text-white leading-tight">{activeLoc.name}</span>
                          <span className="text-[10px] text-slate-400">{activeLoc.country}</span>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                        {currentLang === 'en' ? 'Delivered' : 'ডেলিভার্ড'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      <strong>{currentLang === 'en' ? 'Core Work:' : 'প্রধান কাজ:'}</strong> {currentLang === 'en' ? activeLoc.serviceEn : activeLoc.serviceBn}
                    </p>
                    <div className="flex items-center justify-between mt-3 bg-cyan-950/30 border border-cyan-900/30 p-2 rounded-lg">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {activeLoc.stat}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-bold">verified metric</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>

      {/* 12. CLIENT ACHIEVEMENTS BEFORE VS AFTER COMPARISON */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-10 shadow-sm relative overflow-hidden">
        
        {/* Decorative Grid Backing */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold tracking-wider text-blue-700 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>{currentLang === 'en' ? 'Measurable Impact Analytics' : 'পরিমাপযোগ্য কাজের প্রভাব'}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentLang === 'en' ? 'Client Performance Achievements' : 'আমাদের অর্জিত মাইলস্টোন এবং পারফরম্যান্স'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                {currentLang === 'en'
                  ? 'We do not just build gorgeous layouts. We engineer high-performance systems that double conversions, optimize rendering speeds, and drive authentic business growth.'
                  : 'আমরা শুধু চমৎকার ল্যান্ডিং পেজই তৈরি করি না। আমরা এমন সিস্টেম ডেভেলপ করি যা ব্যবসার প্রবৃদ্ধি বৃদ্ধি করতে সরাসরি কাজ করে।'}
              </p>
            </div>

            {/* Achievements Selector buttons */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
              {Object.keys(metricsData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMetricTab(tab as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                    activeMetricTab === tab
                      ? 'bg-white text-blue-600 shadow-sm font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab === 'traffic' ? 'SEO Traffic' : tab === 'speed' ? 'Page Speed' : tab === 'conversion' ? 'Conversions' : 'Client Leads'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Comparison Card Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl border border-slate-150 p-6">
            
            {/* Descriptive Content */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-display font-bold text-lg text-slate-900 flex items-center">
                <span>{activeMetric.titleEn}</span>
                <ArrowUpRight className="h-4 w-4 ml-1.5 text-blue-500" />
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {currentLang === 'en' ? activeMetric.descEn : activeMetric.descBn}
              </p>
              
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold bg-white px-3 py-2 rounded-xl border border-slate-100 max-w-xs">
                <ShieldAlert className="h-4 w-4 text-emerald-500" />
                <span>Independently verified client audits</span>
              </div>
            </div>

            {/* Visualizer bars comparison */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Before Next Solution Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-rose-600 uppercase tracking-wide">BEFORE Next Solution</span>
                  <span className="font-bold text-slate-700">{activeMetric.before}</span>
                </div>
                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeMetric.beforeVal}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
              </div>

              {/* After Next Solution Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-600 uppercase tracking-wide flex items-center">
                    AFTER NEXT SOLUTION
                    <span className="ml-1.5 inline-block text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-extrabold uppercase animate-pulse">
                      {activeMetric.percentage}
                    </span>
                  </span>
                  <span className="font-bold text-slate-900">{activeMetric.after}</span>
                </div>
                <div className="h-6 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeMetric.afterVal}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className={`h-full bg-gradient-to-r ${activeMetric.color} rounded-full flex items-center justify-end pr-3`}
                  >
                    <span className="text-[10px] font-black text-white drop-shadow-sm flex items-center">
                      <Zap className="h-3 w-3 fill-white mr-1 animate-pulse" />
                      {activeMetric.percentage}
                    </span>
                  </motion.div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
