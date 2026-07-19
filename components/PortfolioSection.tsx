"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { 
  Search, Calendar, DollarSign, Award, Star, Quote, ArrowUpRight, 
  ArrowLeft, ArrowRight, ShieldCheck, ChevronRight, Activity, Zap, Users, Code, Info, Sparkles
} from 'lucide-react';
import { translations } from '@/data/translations';
import { getPortfolio } from '@/lib/db';
import { PortfolioItem } from '@/types';

interface PortfolioSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

// Interactive Before/After Image Comparison Slider
function BeforeAfterSlider({ beforeUrl, afterUrl, currentLang }: { beforeUrl: string, afterUrl: string, currentLang: 'en' | 'bn' }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const position = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, container);
    }
  };

  return (
    <div 
      className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 select-none cursor-ew-resize group"
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Before Image */}
      <img 
        src={beforeUrl} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute left-4 top-4 bg-red-600/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm shadow-md">
        {currentLang === 'en' ? 'Legacy Version' : 'লিগ্যাসি সংস্করণ'}
      </div>

      {/* After Image Overlay */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={afterUrl} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 top-4 bg-green-600/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm shadow-md">
          {currentLang === 'en' ? 'Next Solution Design' : 'নেক্সট সলিউশন ডিজাইন'}
        </div>
      </div>

      {/* Slide Handle Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="h-10 w-10 rounded-full bg-white text-gray-800 flex items-center justify-center border border-gray-100 shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-150">
          <Code className="h-4 w-4 rotate-90 text-blue-600" />
        </div>
      </div>
      
      {/* Slider instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-medium px-4 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {currentLang === 'en' ? 'Drag handle left & right to compare' : 'তুলনা করতে হ্যান্ডেলটি ডানে-বামে ড্র্যাগ করুন'}
      </div>
    </div>
  );
}

export default function PortfolioSection({ currentLang, setTab, isFullPage = false }: PortfolioSectionProps) {
  const t = translations[currentLang];
  const portfolio = getPortfolio();
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // High-fidelity active Case Study state
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const getCategoryLabel = (cat: string) => {
    if (currentLang === 'bn') {
      switch (cat) {
        case 'All': return 'সব প্রজেক্ট';
        case 'Web Development': return 'ওয়েব ডেভেলপমেন্ট';
        case 'Mobile App': return 'মোবাইল অ্যাপ';
        case 'UI/UX Design': return 'ইউআই/ইউএক্স ডিজাইন';
        case 'Graphic Design': return 'গ্রাফিক ডিজাইন';
        case 'Video Editing': return 'ভিডিও এডিটিং';
        case 'Digital Marketing': return 'ডিজিটাল মার্কেটিং';
        case 'AI Automation & Agent': return 'এআই অটোমেশন ও এজেন্ট';
        case 'SEO': return 'এসইও';
        default: return cat;
      }
    } else {
      switch (cat) {
        case 'All': return 'All Projects';
        default: return cat;
      }
    }
  };

  const categories = useMemo(() => {
    const canonical = [
      'All',
      'Web Development',
      'Mobile App',
      'UI/UX Design',
      'Graphic Design',
      'Video Editing',
      'Digital Marketing',
      'AI Automation & Agent',
      'SEO'
    ];
    const dbCategories = new Set(portfolio.map(item => item.category));
    const extra = Array.from(dbCategories).filter(cat => cat && !canonical.includes(cat));
    return [...canonical, ...extra];
  }, [portfolio]);

  const filteredPortfolio = useMemo(() => {
    return portfolio.filter(item => {
      // Exclude drafts from public listing
      if (item.status === 'draft') return false;

      const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
      const term = searchQuery.trim().toLowerCase();
      if (!term) return matchesCategory;

      const title = (currentLang === 'en' ? item.titleEn : item.titleBn).toLowerCase();
      const desc = (currentLang === 'en' ? item.descriptionEn : item.descriptionBn).toLowerCase();
      const client = item.client.toLowerCase();
      const tech = item.technologies.join(' ').toLowerCase();

      const matchesSearch = title.includes(term) || desc.includes(term) || client.includes(term) || tech.includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [portfolio, activeFilter, searchQuery, currentLang]);

  // Find featured work (the top-tier showcase project)
  const featuredProject = useMemo(() => {
    return portfolio.find(item => item.featured && item.status !== 'draft') || portfolio[0] || null;
  }, [portfolio]);

  const handleStartConsultation = (projectTitle: string) => {
    sessionStorage.setItem('pre_selected_message', `Hello, we would like to build something similar to "${projectTitle}". Please share details about cost and development timeline.`);
    setSelectedProject(null);
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stagger animation helpers
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  // Dynamic Case Study FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // If a user clicks a case study card, we show the beautiful dynamic page
  if (selectedProject) {
    // Gallery screenshots list
    let parsedGallery: string[] = [];
    try {
      if (selectedProject.galleryJson) {
        parsedGallery = JSON.parse(selectedProject.galleryJson);
      }
    } catch (e) {
      parsedGallery = [];
    }

    // Related projects inside same category or other featured
    const relatedProjects = portfolio
      .filter(item => item.id !== selectedProject.id && item.status !== 'draft' && (item.category === selectedProject.category || item.featured))
      .slice(0, 2);

    return (
      <article className="bg-white min-h-screen pt-24 pb-20 font-sans text-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation Bar */}
          <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-5">
            <button
              onClick={() => {
                setSelectedProject(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>{currentLang === 'en' ? 'Back to Portfolio' : 'পোর্টফোলিওতে ফিরে যান'}</span>
            </button>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-400">
              <span>{currentLang === 'en' ? 'CASE STUDY' : 'কেস স্টাডি'}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-blue-600 font-bold uppercase tracking-wider">{selectedProject.category}</span>
            </div>
          </div>

          {/* 1. HERO SECTION */}
          <header className="space-y-6 max-w-4xl mb-12">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold px-3 py-1 text-[10px] uppercase tracking-wider">
                {selectedProject.category}
              </span>
              {selectedProject.industryEn && (
                <span className="rounded-full bg-gray-50 border border-gray-100 text-gray-600 font-mono px-3 py-1 text-[10px]">
                  {currentLang === 'en' ? selectedProject.industryEn : selectedProject.industryBn}
                </span>
              )}
            </div>
            <h1 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              {currentLang === 'en' ? selectedProject.titleEn : selectedProject.titleBn}
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl">
              {currentLang === 'en' ? selectedProject.descriptionEn : selectedProject.descriptionBn}
            </p>
          </header>

          {/* 2. OVERVIEW METRICS PANEL */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-12 shadow-sm text-center">
            <div className="space-y-1">
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex justify-center items-center gap-1">
                <Users className="h-3.5 w-3.5 text-blue-500" />
                <span>{currentLang === 'en' ? 'Client Partner' : 'ক্লায়েন্ট অংশীদার'}</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 mt-1 block">{selectedProject.client}</span>
            </div>
            <div className="space-y-1 border-l border-gray-100">
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex justify-center items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                <span>{currentLang === 'en' ? 'Timeline' : 'সময়কাল'}</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 mt-1 block">
                {selectedProject.duration} {selectedProject.completionYear && `(${selectedProject.completionYear})`}
              </span>
            </div>
            <div className="space-y-1 border-l border-gray-100">
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex justify-center items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-blue-500" />
                <span>{currentLang === 'en' ? 'Budget Spec' : 'বাজেট স্পেক'}</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-900 mt-1 block">{selectedProject.budget}</span>
            </div>
            <div className="space-y-1 border-l border-gray-100">
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex justify-center items-center gap-1">
                <Award className="h-3.5 w-3.5 text-blue-500" />
                <span>{currentLang === 'en' ? 'Impact Status' : 'ইমপ্যাক্ট স্ট্যাটাস'}</span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-green-600 mt-1 block flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                <span>{currentLang === 'en' ? 'Verified Success' : 'যাচাইকৃত সাফল্য'}</span>
              </span>
            </div>
          </section>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Left Content Side */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Cover Screenshot */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-gray-100 bg-gray-50 shadow-md">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.titleEn} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Challenge vs Solution Splits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3 bg-red-50/20 border border-red-100/50 p-6 rounded-2xl">
                  <h3 className="text-sm font-black text-red-700 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Info className="h-4 w-4" />
                    <span>01. {currentLang === 'en' ? 'The Core Challenge' : 'মূল চ্যালেঞ্জ'}</span>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {currentLang === 'en' ? selectedProject.challengeEn : selectedProject.challengeBn}
                  </p>
                </div>

                <div className="space-y-3 bg-blue-50/20 border border-blue-100/50 p-6 rounded-2xl">
                  <h3 className="text-sm font-black text-blue-700 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" />
                    <span>02. {currentLang === 'en' ? 'Our Engineering Solution' : 'আমাদের প্রকৌশল সমাধান'}</span>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {currentLang === 'en' ? selectedProject.solutionEn : selectedProject.solutionBn}
                  </p>
                </div>
              </div>

              {/* Interactive Before/After Visual if provided */}
              {selectedProject.beforeImage && selectedProject.afterImage && (
                <div className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Before & After Design Transformation' : 'ডিজাইন রূপান্তরের আগে ও পরে'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {currentLang === 'en' ? 'Drag slider handle to see code rendering improvements.' : 'কোড ডিজাইনের চমৎকার পরিবর্তন দেখতে হ্যান্ডেলটি ডানে-বামে সরান।'}
                    </p>
                  </div>
                  <BeforeAfterSlider 
                    beforeUrl={selectedProject.beforeImage} 
                    afterUrl={selectedProject.afterImage} 
                    currentLang={currentLang} 
                  />
                </div>
              )}

              {/* Delivered Features List */}
              {((currentLang === 'en' ? selectedProject.featuresEn : selectedProject.featuresBn) || []).length > 0 && (
                <div className="space-y-4 bg-gray-50/30 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center space-x-1.5">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span>{currentLang === 'en' ? 'Delivered Product Modules' : 'প্রদত্ত প্রোডাক্ট মডিউলসমূহ'}</span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {((currentLang === 'en' ? selectedProject.featuresEn : selectedProject.featuresBn) || []).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                        <span className="rounded-full bg-blue-100 text-blue-700 p-0.5 mt-0.5">
                          <ChevronRight className="h-3 w-3" />
                        </span>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Design Showcase / Screenshot Gallery */}
              {parsedGallery.length > 0 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                      {currentLang === 'en' ? 'Interface Design Gallery' : 'ইন্টারফেস ডিজাইন গ্যালারি'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {currentLang === 'en' ? 'A breakdown of layout fidelity and customized views created.' : 'তৈরিকৃত হাই-ফিডেলিটি লেআউট এবং কাস্টমাইজড ভিউর একটি বিশ্লেষণ।'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedGallery.map((imgUrl, idx) => (
                      <div key={idx} className="group overflow-hidden rounded-xl border border-gray-100 bg-gray-50 aspect-video relative">
                        <img 
                          src={imgUrl} 
                          alt={`Gallery screenshot ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Spec Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* UPTIME & RESULT METRICS */}
              <div className="bg-gray-900 text-white rounded-2xl p-6 border border-gray-800 space-y-4 shadow-xl">
                <span className="text-[9px] font-bold tracking-widest text-blue-400 block uppercase font-mono">
                  {currentLang === 'en' ? 'Performance Metrics Achieved' : 'অর্জিত পারফরম্যান্স ম্যাট্রিক্স'}
                </span>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-blue-400">
                    {selectedProject.id === '1' ? '0.4s' : selectedProject.id === '2' ? '3.8%' : '10x'}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">
                    {currentLang === 'en' ? 'Core Loading Speed Decreased' : 'কোর লোডিং স্পিড হ্রাস'}
                  </p>
                </div>
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase font-mono block">
                    {currentLang === 'en' ? 'CONVERSION RESULT' : 'কনভার্সন ফলাফল'}
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed italic">
                    "{currentLang === 'en' ? selectedProject.resultEn : selectedProject.resultBn}"
                  </p>
                </div>
              </div>

              {/* TECHNICAL INTEGRATION BOX */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider font-mono">
                  {currentLang === 'en' ? 'Engineered Tech Stack' : 'ব্যবহৃত টেকনোলজি স্ট্যাক'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 flex items-center space-x-1"
                    >
                      <Code className="h-3.5 w-3.5 text-blue-500" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
                {selectedProject.liveUrl && (
                  <div className="pt-2">
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 shadow-sm transition"
                    >
                      <span>{currentLang === 'en' ? 'Launch Live Project' : 'লাইভ প্রজেক্ট চালু করুন'}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
                {selectedProject.githubUrl && (
                  <div>
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-2.5 transition"
                    >
                      <span>{currentLang === 'en' ? 'View Source Code' : 'সোর্স কোড দেখুন'}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* CLIENT TESTIMONIAL BLOCK */}
              {selectedProject.reviewEn && (
                <div className="rounded-2xl border border-blue-50/50 bg-blue-50/15 p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-blue-50/50 pb-3">
                    <span className="text-xs font-black text-blue-700 flex items-center space-x-1">
                      <Quote className="h-4 w-4 text-blue-400" />
                      <span>{currentLang === 'en' ? 'Partner Review' : 'অংশীদারদের মন্তব্য'}</span>
                    </span>
                    <div className="flex items-center space-x-0.5">
                      {Array.from({ length: selectedProject.rating || 5 }).map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-xs italic text-gray-700 leading-relaxed">
                    "{currentLang === 'en' ? selectedProject.reviewEn : selectedProject.reviewBn}"
                  </blockquote>
                  
                  {/* Client Bio */}
                  <div className="flex items-center space-x-3 pt-2">
                    {selectedProject.clientPhoto ? (
                      <img 
                        src={selectedProject.clientPhoto} 
                        alt="" 
                        className="h-10 w-10 rounded-full object-cover border border-blue-100 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold font-mono text-sm">
                        {selectedProject.client[0]}
                      </div>
                    )}
                    <div>
                      <span className="block text-xs font-bold text-gray-900">{selectedProject.client}</span>
                      {selectedProject.clientRoleEn && (
                        <span className="block text-[10px] text-gray-400 mt-0.5 font-medium">
                          {currentLang === 'en' ? selectedProject.clientRoleEn : selectedProject.clientRoleBn}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* 3. CASE STUDY SPECIFIC FAQS */}
          <section className="border-t border-gray-100 pt-16 mb-16 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                {currentLang === 'en' ? 'PROJECT FAQS' : 'প্রজেক্ট সাধারণ জিজ্ঞাসা'}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {currentLang === 'en' ? 'Frequently Asked Execution Details' : 'প্রজেক্টের কিছু সাধারণ প্রশ্নোত্তর'}
              </h3>
            </div>
            <div className="max-w-3xl space-y-3">
              {[
                {
                  qEn: "How long did the initial strategy phase take?",
                  qBn: "প্রাথমিক স্ট্র্যাটেজি পরিকল্পনা পর্বের জন্য কত সময় লেগেছিল?",
                  aEn: "Our discovery, system audits, and UX blueprints took exactly 3 weeks. After matching key deliverables with AeroBank C-level executives, we began active builds.",
                  aBn: "আমাদের ডিসকভারি, সিস্টেম অডিট এবং ইউএক্স ব্লুপ্রিন্ট করতে ঠিক ৩ সপ্তাহ সময় লেগেছিল। তারপর আমরা অ্যাক্টিভ ডেভেলপমেন্টের কাজ শুরু করি।"
                },
                {
                  qEn: "What custom measures were taken to ensure transaction safety?",
                  qBn: "লেনদেনের নিরাপত্তা নিশ্চিত করতে কী কী কাস্টম ব্যবস্থা নেওয়া হয়েছিল?",
                  aEn: "We integrated zero-trust architecture gateways, full payload sanitization, and state caches to separate user data processing from external payment endpoints securely.",
                  aBn: "আমরা জিরো-ট্রাস্ট আর্কিটেকচার গেটওয়ে, ফুল পে-লোড স্যানিটাইজেশন এবং স্টেট ক্যাশে সংযুক্ত করেছি যেন ব্যবহারকারীর ব্যক্তিগত ডেটা বাহ্যিক পেমেন্ট এ্যান্ডপয়েন্ট থেকে সম্পূর্ণ সুরক্ষিত থাকে।"
                }
              ].map((faqItem, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between font-bold text-xs text-gray-800 hover:bg-gray-50 transition"
                  >
                    <span>{currentLang === 'en' ? faqItem.qEn : faqItem.qBn}</span>
                    <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-90 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-gray-50/50 text-xs text-gray-500 leading-relaxed">
                          {currentLang === 'en' ? faqItem.aEn : faqItem.aBn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* 4. RELATED CASE STUDIES RECOMMENDATIONS */}
          {relatedProjects.length > 0 && (
            <section className="border-t border-gray-100 pt-16 mb-16 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                  {currentLang === 'en' ? 'CURATED HIGHLIGHTS' : 'নির্বাচিত অন্যান্য কাজ'}
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  {currentLang === 'en' ? 'Explore Other Success Stories' : 'অন্যান্য সাফল্যের গল্পগুলো দেখুন'}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setSelectedProject(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 flex items-center space-x-4 hover:border-blue-500 transition hover:shadow-sm"
                  >
                    <img 
                      src={item.image} 
                      alt="" 
                      className="h-16 w-24 object-cover rounded bg-gray-50 border border-gray-100 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {currentLang === 'en' ? item.titleEn : item.titleBn}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">Client: {item.client}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. FINAL CASE STUDY CONVERSION CTA */}
          <footer className="relative overflow-hidden rounded-3xl bg-blue-600 text-white p-8 md:p-12 text-center space-y-6 shadow-xl shadow-blue-600/10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/50 to-indigo-700/50 mix-blend-multiply pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                {currentLang === 'en' 
                  ? `Ready to replicate the success of ${selectedProject.client}?`
                  : `${selectedProject.client}-এর মতো সাফল্য আপনার ব্যবসায়ে চান?`}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                {currentLang === 'en'
                  ? 'Let\'s collaborate on strategy, architecture, and visual execution to make your product stand out worldwide.'
                  : 'আসুন আমরা আপনার প্রজেক্টের কৌশল, আর্কিটেকচার এবং ডিজাইন নিয়ে একসাথে কাজ করি বিশ্বব্যাপী পরিচিতি পাওয়ার জন্য।'}
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleStartConsultation(selectedProject.titleEn)}
                  className="rounded-xl bg-white hover:bg-gray-50 text-blue-600 text-xs font-bold px-6 py-3 transition relative hover:scale-[1.02] shadow-md shadow-black/5"
                >
                  {currentLang === 'en' ? 'Get Free Consultation' : 'ফ্রি কনসালটেশন নিন'}
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white border border-blue-500/50 text-xs font-bold px-5 py-3 transition relative"
                >
                  {currentLang === 'en' ? 'View Other Case Studies' : 'অন্যান্য কেস স্টাডি দেখুন'}
                </button>
              </div>
            </div>
          </footer>

        </div>
      </article>
    );
  }

  // ELSE - SHOW MAIN PORTFOLIO CATALOG
  return (
    <section id="portfolio-section" className={`bg-white py-20 ${isFullPage ? 'min-h-screen py-24' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          {/* Breadcrumb block */}
          <nav className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-gray-400 mb-2">
            <span className="hover:text-gray-900 cursor-pointer" onClick={() => setTab('home')}>{currentLang === 'en' ? 'Home' : 'হোম'}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 font-bold">{currentLang === 'en' ? 'Portfolio' : 'পোর্টফোলিও'}</span>
          </nav>
          
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100/50 px-3 py-1 rounded-full inline-block">
            {currentLang === 'en' ? 'INTERNATIONAL PORTFOLIO' : 'আন্তর্জাতিক মানের পোর্টফোলিও'}
          </span>
          <h2 className="font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-5xl leading-tight">
            {t.sectionPortfolioTitle}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {t.sectionPortfolioSub}
          </p>
          
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => handleStartConsultation('General Portfolio Query')}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 transition shadow-md shadow-blue-600/10 hover:scale-[1.01]"
            >
              {currentLang === 'en' ? 'Get Free Consultation' : 'ফ্রি কনসালটেশন নিন'}
            </button>
            <a
              href="#portfolio-grid"
              className="rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold px-5 py-2.5 transition"
            >
              {currentLang === 'en' ? 'View Our Work' : 'আমাদের কাজ দেখুন'}
            </a>
          </div>
        </div>

        {/* 2. STATS OVERVIEW PANEL */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50/50 p-6 sm:p-8 rounded-3xl border border-gray-100/80 mb-16 shadow-sm">
          <div className="text-center space-y-1">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">150+</h4>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentLang === 'en' ? 'Projects Completed' : 'প্রজেক্ট সমাপ্ত'}
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-gray-100">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">99.8%</h4>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentLang === 'en' ? 'Client Satisfaction' : 'ক্লায়েন্ট সন্তুষ্টি'}
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-gray-100">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">12+</h4>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentLang === 'en' ? 'Industries Served' : 'শিল্পক্ষেত্রসমূহ'}
            </p>
          </div>
          <div className="text-center space-y-1 border-l border-gray-100">
            <h4 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">25+</h4>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {currentLang === 'en' ? 'Technologies Mastered' : 'মাস্টার্ড টেকনোলজিস'}
            </p>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS SHOWCASE */}
        {featuredProject && (
          <section className="mb-16 rounded-3xl border border-gray-100 bg-gray-50/30 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-6 relative aspect-video overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
              <img 
                src={featuredProject.image} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
                referrerPolicy="no-referrer"
              />
              <span className="absolute left-4 top-4 rounded bg-blue-600 px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                {currentLang === 'en' ? 'Featured Case Study' : 'বিশেষ কেস স্টাডি'}
              </span>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block font-bold">
                {featuredProject.client} • {getCategoryLabel(featuredProject.category)}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
                {currentLang === 'en' ? featuredProject.titleEn : featuredProject.titleBn}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                {currentLang === 'en' ? featuredProject.descriptionEn : featuredProject.descriptionBn}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-1">
                {featuredProject.technologies.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="rounded-lg bg-white border border-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => {
                    setSelectedProject(featuredProject);
                    setTab('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-5 py-2.5 transition flex items-center space-x-1.5"
                >
                  <span>{currentLang === 'en' ? 'Read Case Study' : 'কেস স্টাডি পড়ুন'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleStartConsultation(featuredProject.titleEn)}
                  className="rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold px-4 py-2.5 transition"
                >
                  {currentLang === 'en' ? 'Partner with Us' : 'আমাদের সাথে অংশীদার হন'}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. INTERACTIVE CONTROL ROW (Filters + Search) */}
        <div id="portfolio-controls" className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8 mb-12">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                id={`portfolio-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition border duration-150 ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/10'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs shrink-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="portfolio-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'en' ? 'Search work, tech, client...' : 'কাজ, প্রযুক্তি, ক্লায়েন্ট খুঁজুন...'}
              className="w-full rounded-xl border border-gray-200 bg-white px-9 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* 5. PORTFOLIO CARDS GRID */}
        {filteredPortfolio.length > 0 ? (
          <motion.div 
            id="portfolio-grid" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredPortfolio.map((item) => (
              <motion.div
                id={`portfolio-card-${item.id}`}
                key={item.id}
                onClick={() => {
                  setSelectedProject(item);
                  setTab('portfolio');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variants={itemVariants}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-blue-500 transition duration-300 flex flex-col h-full"
              >
                {/* Image panel */}
                <div className="relative aspect-video overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={item.image}
                    alt={currentLang === 'en' ? item.titleEn : item.titleBn}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/25 to-transparent"></div>
                  
                  {/* Category overlay label */}
                  <span className="absolute left-3 bottom-3 rounded-md bg-gray-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 font-mono">
                    {getCategoryLabel(item.category)}
                  </span>
                  
                  {/* Featured badge if present */}
                  {item.featured && (
                    <span className="absolute right-3 top-3 rounded bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide shadow-md">
                      {t.badgeFeatured}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">{item.client}</span>
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                      {currentLang === 'en' ? item.titleEn : item.titleBn}
                    </h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {currentLang === 'en' ? item.descriptionEn : item.descriptionBn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {item.technologies.slice(0, 2).map((tech, idx) => (
                        <span key={idx} className="rounded bg-gray-50 border border-gray-100 px-2 py-0.5 text-[9px] font-semibold text-gray-500 font-mono">
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 2 && (
                        <span className="rounded bg-gray-50 border border-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-400 font-mono">
                          +{item.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5 shrink-0">
                      <span>{currentLang === 'en' ? 'Case Study' : 'কেস স্টাডি'}</span>
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div id="portfolio-empty-state" className="text-center py-20 border border-dashed border-gray-200 rounded-2xl max-w-md mx-auto">
            <span className="block text-sm text-gray-500 font-medium">
              {currentLang === 'en' ? 'No work found matching search criteria.' : 'খোঁজা মানদণ্ডের সাথে মিলে কোনো কাজ পাওয়া যায়নি।'}
            </span>
          </div>
        )}

        {/* 6. CONVERSION FOOTER CALL TO ACTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-12 text-center mt-20 shadow-xl border border-gray-800">
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/20 to-transparent mix-blend-screen pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest font-mono block">
              {currentLang === 'en' ? 'COLLABORATE WITH NEXT SOLUTION' : 'নেক্সট সলিউশনের সাথে কাজ করুন'}
            </span>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
              {currentLang === 'en' ? 'Have a revolutionary product idea?' : 'আপনার কী কোনো অসাধারণ প্রজেক্ট আইডিয়া আছে?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {currentLang === 'en'
                ? 'We align high-fidelity product strategy with fast full-stack builds, helping you scale seamlessly from day zero.'
                : 'আমরা নিখুঁত প্রোডাক্ট কৌশলের সাথে দ্রুত ফুল-স্ট্যাক বিল্ড একত্রিত করি, যা আপনাকে প্রথম দিন থেকেই মসৃণভাবে স্কেল করতে সাহায্য করে।'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleStartConsultation('Partnering on new digital solution')}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 transition relative hover:scale-[1.01] shadow-lg shadow-blue-600/10 inline-flex items-center space-x-1.5"
              >
                <span>{currentLang === 'en' ? 'Initiate Partnership Consultation' : 'অংশীদারিত্বের জন্য কনসালটেশন শুরু করুন'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}
