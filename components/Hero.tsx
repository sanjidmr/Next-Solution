"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Award, Activity,
  Layers, Palette, Code2, Layout, Megaphone, PenTool, Video, Search,
  Cpu, Infinity, Bot, Smartphone, TrendingUp, BarChart3, Users, Zap, Target,
  Heart
} from 'lucide-react';
import { translations } from '@/data/translations';

interface HeroProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
}

export default function Hero({ currentLang, setTab }: HeroProps) {
  const t = translations[currentLang];

  const stats = [
    { 
      value: '100+', 
      label: currentLang === 'en' ? 'Projects Delivered' : 'ডেলিভারি করা প্রজেক্ট', 
      icon: Award, 
      color: 'text-blue-600 bg-blue-50/80 border border-blue-100/50' 
    },
    { 
      value: '50+', 
      label: currentLang === 'en' ? 'Happy Clients' : 'খুশি গ্রাহক সংখ্যা', 
      icon: CheckCircle2, 
      color: 'text-emerald-600 bg-emerald-50/80 border border-emerald-100/50' 
    },
    { 
      value: '98%', 
      label: currentLang === 'en' ? 'Client Satisfaction' : 'গ্রাহক সন্তুষ্টির হার', 
      icon: Heart, 
      color: 'text-rose-600 bg-rose-50/80 border border-rose-100/50' 
    },
    { 
      value: '10+', 
      label: currentLang === 'en' ? 'Digital Services' : 'ডিজিটাল সেবাসমূহ', 
      icon: Zap, 
      color: 'text-cyan-600 bg-cyan-50/80 border border-cyan-100/50' 
    },
    { 
      value: '20+', 
      label: currentLang === 'en' ? 'Industries Served' : 'সেবা প্রদানকৃত ইন্ডাস্ট্রি', 
      icon: Activity, 
      color: 'text-purple-600 bg-purple-50/80 border border-purple-100/50' 
    },
  ];

  const handleServiceClick = (slug: string) => {
    sessionStorage.setItem('selected_service_slug', slug);
    setTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const localT = {
    en: {
      seoScore: 'SEO Performance',
      seoOptimal: 'Excellent',
      conversions: 'Conversion Rate',
      trafficGrowth: 'Traffic Growth',
      activeUsers: 'Active Visitors',
      roiTitle: 'Ad Campaign ROI',
      direct: 'Direct',
      organic: 'Organic',
      growthLabel: 'Digital Growth',
      featuresTailored: '100% Tailored Code',
      featuresUX: 'Interactive UX',
      featuresResults: 'Results Driven',
      featuresDelivery: 'Fast Delivery',
    },
    bn: {
      seoScore: 'এসইও পারফরম্যান্স',
      seoOptimal: 'চমৎকার',
      conversions: 'কনভার্সন রেট',
      trafficGrowth: 'ট্রাফিক বৃদ্ধি',
      activeUsers: 'সক্রিয় ভিজিটর',
      roiTitle: 'বিজ্ঞাপন আরওআই (ROI)',
      direct: 'সরাসরি',
      organic: 'অর্গানিক',
      growthLabel: 'ডিজিটাল গ্রোথ',
      featuresTailored: '১০০% কাস্টম কোড',
      featuresUX: 'ইন্টারেক্টিভ ইউএক্স',
      featuresResults: 'ফলাফলমুখী কাজ',
      featuresDelivery: 'দ্রুত ডেলিভারি',
    }
  }[currentLang];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-slate-50/30 py-16 lg:py-24 font-sans selection:bg-blue-600 selection:text-white">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-0.5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        .animate-orbit-cw {
          animation: orbit-cw 40s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbit-ccw 40s linear infinite;
        }
        .animate-orbit-cw-slow {
          animation: orbit-cw 60s linear infinite;
        }
        .animate-orbit-ccw-slow {
          animation: orbit-ccw 60s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.04) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%);
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay opacity-[0.015] pointer-events-none z-0" aria-hidden="true" />

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-200/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-200/15 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '4s' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative flex items-center justify-center min-h-[480px] sm:min-h-[580px] md:min-h-[700px] lg:min-h-[840px] w-full mx-auto py-8">
          
          {/* ===== Mobile Orbit Badges (above center card) ===== */}
          <div className="xl:hidden flex flex-col items-center justify-center absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[280px] h-[240px] pointer-events-none z-20">
            <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-indigo-100/40">
              <div className="absolute inset-0 rounded-full border border-indigo-50/10 animate-ping" style={{ animationDuration: '6s' }} />
            </div>
            <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-purple-100/20" />
            
            <div className="absolute w-[200px] h-[200px] rounded-full animate-orbit-cw">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100/90 rounded-full px-2.5 py-1 text-gray-800">
                  <Layers className="h-2.5 w-2.5 text-blue-600" />
                  <span className="text-[8px] font-extrabold whitespace-nowrap">Web App</span>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100/90 rounded-full px-2.5 py-1 text-gray-800">
                  <Layout className="h-2.5 w-2.5 text-purple-600" />
                  <span className="text-[8px] font-extrabold whitespace-nowrap">UI/UX</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100/90 rounded-full px-2.5 py-1 text-gray-800">
                  <Palette className="h-2.5 w-2.5 text-teal-500" />
                  <span className="text-[8px] font-extrabold whitespace-nowrap">Design</span>
                </div>
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] border border-gray-100/90 rounded-full px-2.5 py-1 text-gray-800">
                  <Search className="h-2.5 w-2.5 text-emerald-600" />
                  <span className="text-[8px] font-extrabold whitespace-nowrap">SEO</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden xl:flex flex-col space-y-5 absolute left-0 top-1/2 -translate-y-1/2 w-[290px] pointer-events-auto z-10 animate-float">
            
            <div className="relative bg-white/60 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_55px_rgba(16,185,129,0.1)] hover:-translate-y-1 rounded-3xl p-6 transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-t-3xl" />
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/60">
                    <Search className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{localT.seoScore}</span>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex items-center justify-center h-16 w-16 flex-shrink-0">
                  <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-emerald-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-500" strokeDasharray="98, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="text-center">
                    <span className="text-sm font-black text-gray-800 leading-none">98</span>
                    <span className="text-[9px] font-bold text-emerald-600 block leading-none">%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-800">{localT.seoOptimal}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide">LCP 0.6s · FCP 0.3s</p>
                  <div className="flex items-center space-x-1">
                    <div className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">All systems pass</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mb-4" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{localT.conversions}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/80">+14.8%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-black text-gray-800 tracking-tight">3.24%</span>
                  <span className="text-[10px] text-gray-400 font-semibold">vs 1.8% industry</span>
                </div>
                <div className="h-8 w-full pt-1">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient-sparkline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,18 Q15,5 30,12 T60,4 T85,14 T100,2" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0,18 Q15,5 30,12 T60,4 T85,14 T100,2 L100,20 L0,20 Z" fill="url(#gradient-sparkline)" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          <div className="hidden xl:flex flex-col space-y-5 absolute right-0 top-1/2 -translate-y-1/2 w-[290px] pointer-events-auto z-10 animate-float-delayed">
            
            <div className="relative bg-white/60 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_55px_rgba(99,102,241,0.1)] hover:-translate-y-1 rounded-3xl p-6 transition-all duration-500 overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-t-3xl" />
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{localT.growthLabel}</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100/80">Live</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-gray-800 tracking-tight">142.8k</span>
                  <span className="text-xs font-bold text-emerald-500">+24%</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5">
                      <span className="uppercase tracking-wider">{localT.organic}</span>
                      <span className="text-blue-600">58%</span>
                    </div>
                    <div className="w-full bg-gray-100/80 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5">
                      <span className="uppercase tracking-wider">{localT.direct}</span>
                      <span className="text-purple-600">42%</span>
                    </div>
                    <div className="w-full bg-gray-100/80 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-indigo-500 h-2 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.3)]" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-4" />

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100/60">
                    <Zap className="h-3 w-3 text-indigo-600" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{localT.roiTitle}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">4.8x ROAS</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100/60 uppercase tracking-wider">ROI</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 border border-purple-100/60 uppercase tracking-wider">Traffic</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 border border-emerald-100/60 uppercase tracking-wider">Conversion</span>
                </div>
              </div>
            </div>

          </div>

          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] rounded-full border border-dashed border-indigo-100/40 relative">
              <div className="absolute inset-0 rounded-full border border-indigo-50/10 animate-ping" style={{ animationDuration: '6s' }} />
            </div>
            <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[680px] lg:h-[680px] xl:w-[840px] xl:h-[840px] rounded-full border border-dashed border-purple-100/20" />
          </div>

          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none z-20">
            
            <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] rounded-full animate-orbit-cw pointer-events-none">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-ccw">
                  <div 
                    onClick={() => handleServiceClick('web-application')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)] border border-gray-100/90 hover:border-blue-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Web App details' : 'ওয়েব অ্যাপ বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Web App' : 'ওয়েব অ্যাপ'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-ccw">
                  <div 
                    onClick={() => handleServiceClick('ui-ux-design')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(147,51,234,0.15)] border border-gray-100/90 hover:border-purple-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view UI/UX details' : 'ইউআই/ইউএক্স বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Layout className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'UI/UX Design' : 'ইউআই/ইউএক্স ডিজাইন'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-ccw">
                  <div 
                    onClick={() => handleServiceClick('ui-ux-design')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(20,184,166,0.15)] border border-gray-100/90 hover:border-teal-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Web Design details' : 'ওয়েব ডিজাইন বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Web Design' : 'ওয়েব ডিজাইন'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-ccw">
                  <div 
                    onClick={() => handleServiceClick('seo')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.15)] border border-gray-100/90 hover:border-emerald-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view SEO details' : 'এসইও বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'SEO' : 'এসইও'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[680px] lg:h-[680px] xl:w-[840px] xl:h-[840px] rounded-full animate-orbit-ccw-slow pointer-events-none">
              
              <div className="absolute left-[85.4%] top-[14.6%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('web-development')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(6,182,212,0.15)] border border-gray-100/90 hover:border-cyan-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Web Development details' : 'ওয়েব ডেভেলপমেন্ট বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Web Development' : 'ওয়েব ডেভেলপমেন্ট'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[85.4%] top-[85.4%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('digital-marketing')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(236,72,153,0.15)] border border-gray-100/90 hover:border-pink-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Digital Marketing details' : 'ডিজিটাল মার্কেটিং বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Megaphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Digital Marketing' : 'ডিজিটাল মার্কেটিং'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[14.6%] top-[85.4%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('graphic-design')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)] border border-gray-100/90 hover:border-amber-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Graphic Design details' : 'গ্রাফিক ডিজাইন বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <PenTool className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Graphic Design' : 'গ্রাফিক ডিজাইন'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-[14.6%] top-[14.6%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('video-editing')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(239,68,68,0.15)] border border-gray-100/90 hover:border-red-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Video Editing details' : 'ভিডিও এডিটিং বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Video className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Video Editing' : 'ভিডিও এডিটিং'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('graphic-design')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.15)] border border-gray-100/90 hover:border-rose-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Branding details' : 'ব্র্যান্ডিং বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Branding' : 'ব্র্যান্ডিং'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('ai-automation')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.15)] border border-gray-100/90 hover:border-indigo-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view AI Automation details' : 'এআই অটোমেশন বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'AI Automation' : 'এআই অটোমেশন'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('digital-marketing')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(14,165,233,0.15)] border border-gray-100/90 hover:border-sky-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view Meta Ads details' : 'মেটা অ্যাডস বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Infinity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-500" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'Meta Ads' : 'মেটা অ্যাডস'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div className="animate-orbit-cw-slow">
                  <div 
                    onClick={() => handleServiceClick('ai-automation')}
                    className="flex items-center space-x-2 bg-white/95 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.15)] border border-gray-100/90 hover:border-rose-500 rounded-full px-3.5 py-1.5 sm:px-4.5 sm:py-2 text-gray-800 transition duration-300 cursor-pointer select-none transform hover:scale-105 active:scale-95 group"
                    title={currentLang === 'en' ? 'Click to view AI Agent details' : 'এআই এজেন্ট বিস্তারিত দেখতে ক্লিক করুন'}
                  >
                    <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-500 animate-pulse" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-extrabold whitespace-nowrap">
                      {currentLang === 'en' ? 'AI Agent' : 'এআই এজেন্ট'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="relative z-10 max-w-lg md:max-w-xl mx-auto text-center space-y-6 sm:space-y-8 px-4 pt-36 pb-8 sm:px-6 sm:py-10 md:p-14 bg-white/30 backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] border border-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(99,102,241,0.06)] transition-all duration-500 pointer-events-auto group">
            
            <div className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-tr from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
            
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-[0_2px_10px_rgba(99,102,241,0.05)] mx-auto hover:bg-indigo-50 transition duration-300 cursor-default select-none">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{currentLang === 'en' ? 'ELITE DIGITAL AGENCY' : 'শীর্ষস্থানীয় ডিজিটাল এজেন্সী'}</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-black tracking-tight text-gray-900 leading-[1.12] text-center">
              {currentLang === 'en' ? (
                <>
                  Your All-in-One <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm select-none">Trusted Digital Friend</span>
                </>
              ) : (
                <>
                  আপনার অল-ইন-ওয়ান <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm select-none">বিশ্বস্ত ডিজিটাল বন্ধু</span>
                </>
              )}
            </h1>

            <p className="font-sans text-xs sm:text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed font-medium">
              {t.heroSubheadline}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => setTab('contact')}
                className="group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>{t.heroCTAPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => setTab('portfolio')}
                className="flex items-center justify-center space-x-2 rounded-xl border border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm w-full sm:w-auto cursor-pointer"
              >
                <span>{t.heroCTASecondary}</span>
              </button>
            </div>

            <div className="pt-5 border-t border-gray-100/60 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest select-none">
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors duration-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {localT.featuresTailored}
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors duration-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {localT.featuresUX}
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors duration-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {localT.featuresResults}
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors duration-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {localT.featuresDelivery}
              </span>
            </div>
          </div>

        </div>

        <div id="hero-stats-row" className="mt-12 lg:mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 border-t border-gray-100/80 pt-10 relative z-10">
          {stats.map((stat, idx) => (
            <div 
              id={`hero-stat-${idx}`}
              key={idx} 
              className="flex flex-col items-center text-center space-y-2 p-3 sm:p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-transparent hover:border-white/60 hover:bg-white/45 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
                <div className={`p-1.5 rounded-xl transition-colors duration-300 ${stat.color} group-hover:scale-105 mb-1 sm:mb-0`}>
                  <stat.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-gray-900">{stat.value}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 leading-snug tracking-wide uppercase">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
