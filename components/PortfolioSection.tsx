"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  ArrowRight, ArrowUpRight, X, ExternalLink, ChevronRight,
  ShoppingBag, Heart, GraduationCap, Home, Utensils, Plane,
  Building, Rocket, Globe, Monitor, Smartphone, Palette, Video,
  Megaphone, Cpu, Search as SearchIcon, Code2, Calendar, Tag, Link2
} from 'lucide-react';
import { getPortfolio } from '@/lib/db';
import { PortfolioItem } from '@/types';

interface PortfolioSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
  portfolioData?: PortfolioItem[];
}

const HERO_IMAGES = ['/travel.png', '/laziz.png', '/stranger.png'];

const CATEGORIES = [
  { id: 'all', labelEn: 'All Works', labelBn: 'সব কাজ' },
  { id: 'Web Development', labelEn: 'Web Development', labelBn: 'ওয়েব ডেভেলপমেন্ট' },
  { id: 'Mobile App', labelEn: 'Mobile App', labelBn: 'মোবাইল অ্যাপ' },
  { id: 'UI/UX Design', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স ডিজাইন' },
  { id: 'Graphic Design', labelEn: 'Graphic Design', labelBn: 'গ্রাফিক ডিজাইন' },
  { id: 'Video Editing', labelEn: 'Video Editing', labelBn: 'ভিডিও এডিটিং' },
  { id: 'Digital Marketing', labelEn: 'Digital Marketing', labelBn: 'ডিজিটাল মার্কেটিং' },
  { id: 'AI Automation & Agent', labelEn: 'AI Automation', labelBn: 'এআই অটোমেশন' },
  { id: 'SEO', labelEn: 'SEO', labelBn: 'এসইও' },
];

const INDUSTRIES = [
  { icon: ShoppingBag, labelEn: 'E-Commerce', labelBn: 'ই-কমার্স' },
  { icon: Heart, labelEn: 'Healthcare', labelBn: 'হেলথকেয়ার' },
  { icon: GraduationCap, labelEn: 'Education', labelBn: 'শিক্ষা' },
  { icon: Home, labelEn: 'Real Estate', labelBn: 'রিয়েল এস্টেট' },
  { icon: Utensils, labelEn: 'Restaurant', labelBn: 'রেস্টুরেন্ট' },
  { icon: Plane, labelEn: 'Travel & Tourism', labelBn: 'ভ্রমণ ও পর্যটন' },
  { icon: Building, labelEn: 'Finance', labelBn: 'ফিনান্স' },
  { icon: Rocket, labelEn: 'SaaS', labelBn: 'সাশ' },
  { icon: Globe, labelEn: 'Technology', labelBn: 'প্রযুক্তি' },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Web Development': Code2,
  'Mobile App': Smartphone,
  'UI/UX Design': Palette,
  'Graphic Design': Palette,
  'Video Editing': Video,
  'Digital Marketing': Megaphone,
  'AI Automation & Agent': Cpu,
  'SEO': SearchIcon,
  'Web App': Monitor,
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function PortfolioSection({ currentLang, setTab, isFullPage = false, portfolioData }: PortfolioSectionProps) {
  const isEn = currentLang === 'en';
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalProject, setModalProject] = useState<PortfolioItem | null>(null);

  const portfolio = useMemo(() => {
    try {
      const data = portfolioData && portfolioData.length > 0
        ? portfolioData
        : getPortfolio();
      return data.filter(p => p.status !== 'draft');
    } catch {
      return [];
    }
  }, [portfolioData]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return portfolio;
    return portfolio.filter(p => p.category === activeCategory);
  }, [portfolio, activeCategory]);

  const featuredProject = useMemo(() => {
    return portfolio.find(p => p.featured) || portfolio[0] || null;
  }, [portfolio]);

  const handleProjectClick = useCallback((item: PortfolioItem) => {
    if (item.liveUrl) {
      window.open(item.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalProject(item);
    }
  }, []);

  const gridRef = useScrollReveal();
  const caseStudyRef = useScrollReveal();
  const industriesRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div data-space-page className="min-h-screen bg-white dark:bg-[#0A0908] text-gray-900 dark:text-white font-sans transition-colors">

      {/* ========================================
          1. HERO SECTION
      ========================================= */}
      <section data-space-hero className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white dark:from-[#0A0908] dark:to-[#0E0D0B]">
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,90,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/[0.03] dark:bg-orange-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-400/[0.02] dark:bg-orange-400/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 lg:py-28">
          {/* Mobile: text first, images second. Desktop: side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

            {/* Left Column — Text */}
            <div className="space-y-6 sm:space-y-7 order-1">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">
                  {isEn ? 'OUR PORTFOLIO' : 'আমাদের পোর্টফোলিও'}
                </span>
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-orange-500 to-transparent" />

              <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.05] tracking-tight">
                <span className="text-gray-900 dark:text-white">{isEn ? 'Ideas We Design.' : 'আমরা যে আইডিয়া ডিজাইন করি।'}</span>
                <br />
                <span className="text-gray-900 dark:text-white">{isEn ? 'Solutions We ' : 'সমাধান যা আমরা '}</span>
                <span className="text-orange-500">{isEn ? 'Deliver.' : 'দিই।'}</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                {isEn
                  ? 'Explore our diverse portfolio of digital products, websites, and campaigns that drive real growth for businesses worldwide.'
                  : 'বিশ্বব্যাপী ব্যবসাগুলোর জন্য প্রকৃত বৃদ্ধি চালিত ডিজিটাল প্রোডাক্ট, ওয়েবসাইট এবং ক্যাম্পেইনের আমাদের বৈচিত্র্যময় পোর্টফোলিও অন্বেষণ করুন।'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setTab('contact')}
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-7 py-3.5 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  <span>{isEn ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => document.getElementById('project-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/70 hover:text-orange-500 hover:border-orange-300 dark:hover:border-orange-500/30 text-xs sm:text-sm font-bold px-7 py-3.5 transition-all duration-300 cursor-pointer"
                >
                  <span>{isEn ? 'Explore Projects' : 'প্রজেক্ট দেখুন'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column — 3 Floating Images, bigger & tilted stylishly */}
            <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] order-2">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-orange-300/30 dark:border-orange-500/10 animate-[spin_60s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-full border border-orange-200/20 dark:border-orange-500/6 animate-[spin_45s_linear_infinite_reverse]" />
              </div>

              {/* 3 Floating images — bigger, side-by-side tilted layout */}
              <div className="relative w-full max-w-[560px] h-[420px] sm:h-[480px] lg:h-[540px]">

                {/* Image 1 — Large, top-left, tilted right */}
                <div className="absolute top-[2%] left-[2%] w-[55%] h-[55%] rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-2xl shadow-gray-400/20 dark:shadow-black/40 rotate-[3deg] hover:rotate-[1deg] transition-transform duration-500 z-10 group/img">
                  <img src={HERO_IMAGES[0]} alt="Travel project" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">Web Development</span>
                  </div>
                </div>

                {/* Image 2 — Medium, top-right, tilted left */}
                <div className="absolute top-[0%] right-[0%] w-[48%] h-[48%] rounded-2xl lg:rounded-3xl overflow-hidden border border-orange-200/40 dark:border-orange-500/20 shadow-xl shadow-gray-300/20 dark:shadow-black/50 rotate-[-4deg] hover:rotate-[-2deg] transition-transform duration-500 z-20 group/img">
                  <img src={HERO_IMAGES[1]} alt="Restaurant project" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] font-bold text-white bg-orange-500/40 backdrop-blur-sm rounded-full px-2.5 py-1">Mobile App</span>
                  </div>
                </div>

                {/* Image 3 — Large, bottom-center-right, tilted right */}
                <div className="absolute bottom-[0%] right-[8%] w-[58%] h-[52%] rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-2xl shadow-gray-400/20 dark:shadow-black/40 rotate-[2deg] hover:rotate-[0deg] transition-transform duration-500 z-10 group/img">
                  <img src={HERO_IMAGES[2]} alt="Stranger Vibe project" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] font-bold text-white bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">UI/UX Design</span>
                  </div>
                </div>

                {/* Floating info card */}
                <div className="absolute bottom-[28%] left-[0%] z-30 bg-white/80 dark:bg-white/[0.06] backdrop-blur-xl border border-gray-200/60 dark:border-white/10 rounded-2xl p-4 shadow-xl shadow-gray-200/40 dark:shadow-2xl max-w-[190px] hidden sm:block">
                  <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">Stranger Vibe</p>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-2">Creative Brand Experience</p>
                  <p className="text-[8px] text-gray-400 dark:text-gray-500 leading-relaxed mb-2">Bold branding with immersive digital presence.</p>
                  <span className="text-[9px] font-bold text-orange-500 dark:text-orange-400 inline-flex items-center gap-1 cursor-pointer hover:text-orange-600 dark:hover:text-orange-300 transition">
                    {isEn ? 'View Project' : 'দেখুন'} <ArrowRight className="h-2.5 w-2.5" />
                  </span>
                </div>

                {/* Glow dots */}
                <span className="absolute top-[8%] left-[48%] w-2 h-2 rounded-full bg-orange-400/50 dark:bg-orange-500/60 animate-pulse z-30" />
                <span className="absolute bottom-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-orange-300/30 dark:bg-orange-400/40 animate-pulse z-30" style={{ animationDelay: '1s' }} />
                <span className="absolute top-[55%] right-[8%] w-1 h-1 rounded-full bg-orange-400/40 dark:bg-orange-500/50 animate-pulse z-30" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================
          PROJECT GRID — heading left + nav right
      ========================================= */}
      <section id="project-grid" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0A0908] transition-colors">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* Header row: left-aligned title + right-side filter pills */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
            {/* Left — title */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">
                {isEn ? 'OUR WORK' : 'আমাদের কাজ'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {isEn ? (
                  <>Projects That Make a<br /><span className="text-orange-500">Difference</span></>
                ) : (
                  <>যে প্রজেক্টগুলো<br /><span className="text-orange-500">পার্থক্য তৈরি করে</span></>
                )}
              </h2>
            </div>

            {/* Right — filter pills (2-3 rows on mobile, wrap) */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-bold transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-500/30'
                  }`}
                >
                  {isEn ? cat.labelEn : cat.labelBn}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-2">
                <Code2 className="h-7 w-7 text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{isEn ? 'No projects found in this category.' : 'এই ক্যাটাগরিতে কোনো প্রজেক্ট নেই।'}</p>
              <p className="text-gray-400 dark:text-gray-600 text-xs">{isEn ? 'Try selecting a different filter or check back soon for new projects.' : 'অন্য ফিল্টার বেছে নিন অথবা শীঘ্রই নতুন প্রজেক্ট দেখুন।'}</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isEn={isEn}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>


      {/* ========================================
          CASE STUDY SECTION
      ========================================= */}
      {featuredProject && (
        <section ref={caseStudyRef} className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-[#0E0D0B] transition-colors">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

              <div className="space-y-5 sm:space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">
                  {isEn ? 'CASE STUDY' : 'কেস স্টাডি'}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.8rem] font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {isEn ? (
                    <>Transforming Ideas Into<br /><span className="text-orange-500">Digital Success Stories</span></>
                  ) : (
                    <>আইডিয়াকে রূপান্তরিত করছি<br /><span className="text-orange-500">ডিজিটাল সফলতায়</span></>
                  )}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                  {isEn
                    ? 'We combine creativity, cutting-edge technology, and strategic thinking to deliver digital solutions that exceed expectations and drive measurable results.'
                    : 'আমরা সৃজনশীলতা, আধুনিক প্রযুক্তি এবং কৌশলগত চিন্তাভাবনা একত্রিত করে এমন ডিজিটাল সমাধান প্রদান করি যা প্রত্যাশাকে অতিক্রম করে এবং পরিমাপযোগ্য ফলাফল নিশ্চিত করে।'}
                </p>

                <div className="space-y-3 pt-2">
                  {(isEn
                    ? ['User-Centered Approach', 'Modern Technologies', 'Result-Oriented Solutions', 'Long-Term Partnership']
                    : ['ব্যবহারকারী-কেন্দ্রিক পদ্ধতি', 'আধুনিক প্রযুক্তি', 'ফলাফলমুখী সমাধান', 'দীর্ঘমেয়াদী অংশীদারিত্ব']
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                        <svg className="h-3 w-3 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleProjectClick(featuredProject)}
                    className="inline-flex items-center gap-2 rounded-xl border border-orange-300 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-400 dark:hover:border-orange-500/50 text-xs font-bold px-6 py-3 transition-all duration-300 cursor-pointer"
                  >
                    <span>{isEn ? 'View Case Study' : 'কেস স্টাডি দেখুন'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/[0.04] dark:bg-orange-500/[0.06] rounded-3xl blur-[60px] pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-2xl shadow-gray-300/30 dark:shadow-black/50">
                  <img
                    src={featuredProject.image}
                    alt={isEn ? featuredProject.titleEn : featuredProject.titleBn}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="text-base sm:text-lg font-bold text-white mb-1">{isEn ? featuredProject.titleEn : featuredProject.titleBn}</p>
                    <p className="text-xs text-gray-300">{featuredProject.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ========================================
          INDUSTRIES SECTION
      ========================================= */}
      <section ref={industriesRef} className="py-14 sm:py-16 lg:py-20 bg-white dark:bg-[#0A0908] transition-colors">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="rounded-2xl lg:rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] p-6 sm:p-8 lg:p-12 transition-colors">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 lg:mb-8">
              {isEn ? 'Industries We Work With' : 'যে সেক্টরে আমরা কাজ করি'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
              {INDUSTRIES.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02] px-3 sm:px-4 py-2.5 sm:py-3 hover:border-orange-200 dark:hover:border-orange-500/20 hover:bg-orange-50 dark:hover:bg-orange-500/5 transition-all duration-300">
                    <Icon className="h-4 w-4 text-orange-500 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 dark:text-gray-300">{isEn ? ind.labelEn : ind.labelBn}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ========================================
          FINAL CTA
      ========================================= */}
      <section ref={ctaRef} className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-[#0A0908] transition-colors">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <div className="relative rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1816] dark:to-[#0E0D0B] border border-gray-200 dark:border-white/10 p-8 sm:p-12 lg:p-16 text-center space-y-5 sm:space-y-6 overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/[0.04] dark:bg-orange-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-orange-400/[0.03] dark:bg-orange-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-gray-900 dark:text-white leading-tight relative z-10">
              {isEn ? (
                <>Have a Project in Mind?<br />Let's Build Something <span className="text-orange-500">Amazing</span> Together.</>
              ) : (
                <>প্রজেক্ট নিয়ে কিছু মাথায় আছে?<br />চলুন একসাথে কিছু <span className="text-orange-500">অসাধারণ</span> তৈরি করি।</>
              )}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto relative z-10">
              {isEn
                ? 'From concept to launch, we handle everything. Let us turn your vision into a high-performing digital reality.'
                : 'কনসেপ্ট থেকে লঞ্চ পর্যন্ত, আমরা সব সামলাই। আপনার ভিশনকে একটি উচ্চ-কার্যকর ডিজিটাল বাস্তবতায় রূপান্তরিত করতে দিন।'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
              <button
                onClick={() => setTab('contact')}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-7 py-3.5 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <span>{isEn ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setTab('contact')}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-gray-400 dark:text-white/60 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-none"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================
          PROJECT DETAIL MODAL
      ========================================= */}
      {modalProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalProject(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 rounded-2xl lg:rounded-3xl shadow-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative">
              <img
                src={modalProject.image}
                alt={isEn ? modalProject.titleEn : modalProject.titleBn}
                className="w-full aspect-video object-cover rounded-t-2xl lg:rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#141414] via-transparent to-transparent" />
            </div>

            <div className="p-5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500">{modalProject.category}</p>
                  {modalProject.projectType && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 rounded-full px-2 py-0.5 border border-emerald-500/20">{modalProject.projectType}</span>
                  )}
                  {modalProject.projectDate && (
                    <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {new Date(modalProject.projectDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{isEn ? modalProject.titleEn : modalProject.titleBn}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{isEn ? modalProject.descriptionEn : modalProject.descriptionBn}</p>
              </div>

              {modalProject.technologies?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{isEn ? 'Technologies' : 'প্রযুক্তি'}</p>
                  <div className="flex flex-wrap gap-2">
                    {modalProject.technologies.map((t, i) => (
                      <span key={i} className="rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1 text-[10px] font-bold text-gray-600 dark:text-gray-300">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {modalProject.featuresEn && modalProject.featuresEn.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{isEn ? 'Key Deliverables' : 'মূল ডেলিভারেবল'}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(isEn ? modalProject.featuresEn : (modalProject.featuresBn || modalProject.featuresEn)).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-400 dark:bg-orange-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalProject.challengeEn && (
                <div className="space-y-4">
                  {[
                    { labelEn: 'Challenge', labelBn: 'চ্যালেঞ্জ', content: isEn ? modalProject.challengeEn : modalProject.challengeBn },
                    { labelEn: 'Solution', labelBn: 'সমাধান', content: isEn ? modalProject.solutionEn : modalProject.solutionBn },
                    { labelEn: 'Result', labelBn: 'ফলাফল', content: isEn ? modalProject.resultEn : modalProject.resultBn },
                  ].filter(s => s.content).map((section, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1">{isEn ? section.labelEn : section.labelBn}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {modalProject.galleryJson && (() => {
                try {
                  const gallery = JSON.parse(modalProject.galleryJson);
                  if (Array.isArray(gallery) && gallery.length > 0) {
                    return (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">{isEn ? 'Project Gallery' : 'প্রজেক্ট গ্যালারি'}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {gallery.map((url: string, i: number) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden border border-gray-100 dark:border-white/5 hover:border-orange-200 dark:hover:border-orange-500/30 transition-all">
                              <img src={url} alt={`Gallery ${i + 1}`} className="w-full aspect-video object-cover" />
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                } catch { return null; }
                return null;
              })()}

              <div className="flex flex-wrap gap-3 pt-2">
                {modalProject.liveUrl && (
                  <a
                    href={modalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {isEn ? 'Live Project' : 'লাইভ প্রজেক্ট'}
                  </a>
                )}
                {modalProject.appStoreUrl && (
                  <a
                    href={modalProject.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white/10 hover:bg-gray-800 dark:hover:bg-white/15 text-white text-xs font-bold px-5 py-2.5 transition-all"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    {isEn ? 'App Store' : 'অ্যাপ স্টোর'}
                  </a>
                )}
                {modalProject.playStoreUrl && (
                  <a
                    href={modalProject.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white/10 hover:bg-gray-800 dark:hover:bg-white/15 text-white text-xs font-bold px-5 py-2.5 transition-all"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.49c.39.23.88.07 1.16-.33l8.88-13.32L21 12l-7.66 11.49c-.28.4-.77.56-1.16.33L3.18 23.49zM13.22 9.68L4.34 3.83c-.39-.23-.88-.07-1.16.33L.52 5.69 7.4 12l5.82-2.32zM.52 18.31l2.66 1.53 6.88-5.84L.52 18.31zM21.48 12l-2.66-1.53-6.88 5.84 9.54-4.31zM23 10.84l-2.52-1.45-5.82 2.31L23 10.84z"/></svg>
                    {isEn ? 'Play Store' : 'প্লে স্টোর'}
                  </a>
                )}
                {modalProject.githubUrl && (
                  <a
                    href={modalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 text-xs font-bold px-5 py-2.5 transition-all"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ========================================
    PROJECT CARD COMPONENT
========================================= */
function ProjectCard({ project, isEn, onClick }: { project: PortfolioItem; isEn: boolean; onClick: () => void }) {
  const CatIcon = CATEGORY_ICONS[project.category] || Code2;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl lg:rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] overflow-hidden hover:border-orange-200 dark:hover:border-orange-500/20 transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(255,90,0,0.1)] dark:hover:shadow-[0_20px_60px_-15px_rgba(255,90,0,0.08)] cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={isEn ? project.titleEn : project.titleBn}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-[#0A0908]/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-400 bg-gray-900/40 dark:bg-black/40 backdrop-blur-sm rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 border border-white/10">
              {project.category}
            </span>
            {project.projectType && (
              <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-emerald-400 bg-gray-900/40 dark:bg-black/40 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 sm:py-0.5 border border-emerald-400/20 hidden sm:inline-block">
                {project.projectType}
              </span>
            )}
          </div>
          {project.liveUrl && (
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 lg:p-5 flex flex-col flex-1">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors mb-1.5 sm:mb-2 line-clamp-2">
          {isEn ? project.titleEn : project.titleBn}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed line-clamp-2 mb-3 sm:mb-4 flex-1">
          {isEn ? project.descriptionEn : project.descriptionBn}
        </p>

        <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CatIcon className="h-3 w-3 text-orange-400 dark:text-orange-500/60" />
            <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500">{project.category}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {project.technologies?.slice(0, 2).map((t, i) => (
              <span key={i} className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-white/[0.03] rounded-full px-1.5 sm:px-2 py-0.5 border border-gray-100 dark:border-white/5">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end mt-2.5 sm:mt-3">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 text-gray-300 dark:text-white/40 group-hover:border-orange-200 dark:group-hover:border-orange-500/30 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/5 transition-all duration-300">
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
