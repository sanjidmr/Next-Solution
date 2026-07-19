"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { translations } from '@/data/translations';
import { getServices } from '@/lib/db';
import { Service } from '@/types';

interface ServicesSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

export default function ServicesSection({ currentLang, setTab, isFullPage = false }: ServicesSectionProps) {
  const t = translations[currentLang];
  const services = getServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'design' | 'automation' | 'video'>('frontend');

  // Interactive Service Blueprinter State
  const [selectedBlueprintTechs, setSelectedBlueprintTechs] = useState<string[]>(['web-dev', 'ui-ux']);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const blueprintOptions = React.useMemo(() => [
    {
      id: 'web-dev',
      titleEn: 'Web Development',
      titleBn: 'ওয়েব ডেভেলপমেন্ট',
      badgeEn: 'React / Next.js',
      badgeBn: 'রিয়্যাক্ট / নেক্সট.জেএস',
      icon: 'Code2',
      color: 'from-blue-500 to-cyan-500',
      terminalLog: 'Provisioning secure cloud architecture & CDN edge...',
      coords: { x: 70, y: 70 }
    },
    {
      id: 'ui-ux',
      titleEn: 'UI/UX Design',
      titleBn: 'ইউআই/ইউএক্স ডিজাইন',
      badgeEn: 'Figma Systems',
      badgeBn: 'ফিগোমা ডিজাইন সিস্টেম',
      icon: 'Layout',
      color: 'from-purple-500 to-pink-600',
      terminalLog: 'Calibrating user personas & fluid UX flows...',
      coords: { x: 250, y: 70 }
    },
    {
      id: 'marketing',
      titleEn: 'Digital Marketing',
      titleBn: 'ডিজিটাল মার্কেটিং',
      badgeEn: 'High-ROI Funnels',
      badgeBn: 'আরওআই ফানেল',
      icon: 'Megaphone',
      color: 'from-orange-500 to-red-600',
      terminalLog: 'Synthesizing conversion campaigns & analytics pixels...',
      coords: { x: 260, y: 160 }
    },
    {
      id: 'seo',
      titleEn: 'SEO Strategy',
      titleBn: 'এসইও ক্যাম্পেইন',
      badgeEn: 'Organic Rankings',
      badgeBn: 'অর্গানিক র‍্যাঙ্কিং',
      icon: 'Search',
      color: 'from-emerald-500 to-teal-600',
      terminalLog: 'Mapping search syntax & core semantic page ranks...',
      coords: { x: 250, y: 250 }
    },
    {
      id: 'ai-automation',
      titleEn: 'AI Automations',
      titleBn: 'এআই অটোমেশন',
      badgeEn: 'LLMs & Agents',
      badgeBn: 'এলএলএম ও এআই এজেন্টস',
      icon: 'Cpu',
      color: 'from-indigo-500 to-blue-600',
      terminalLog: 'Wiring intelligent LLM cognitive node triggers...',
      coords: { x: 70, y: 250 }
    },
    {
      id: 'video-editing',
      titleEn: 'Video Production',
      titleBn: 'ভিডিও প্রডাকশন',
      badgeEn: 'Cinematic Promos',
      badgeBn: 'সিনেম্যাটিক প্রমোশন',
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

  // Sync with session storage for preselected routing (e.g. from orbit dials)
  useEffect(() => {
    const slug = sessionStorage.getItem('selected_service_slug');
    if (slug) {
      const match = services.find(s => s.slug === slug);
      if (match) {
        setSelectedService(match);
      }
      sessionStorage.removeItem('selected_service_slug');
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

  // Modern FAQ list for the main services page
  const mainFaqs = [
    {
      qEn: 'Do you charge on a fixed scope or hourly basis?',
      qBn: 'আপনারা কি নির্দিষ্ট বাজেটে নাকি ঘণ্টার হিসাবে চার্জ করেন?',
      aEn: 'We prefer transparent fixed-price milestones for clearly defined scopes. For agile startups needing rapid continuous pivots, we offer dedicated monthly sprint squads on a retainer basis.',
      aBn: 'আমরা সুনির্দিষ্ট কাজের পরিধির জন্য স্বচ্ছ ফিক্সড-প্রাইস মাইলস্টোন পছন্দ করি। তবে ক্রমাগত পরিবর্ধনশীল স্টার্টআপের জন্য আমরা রিটেইনার ভিত্তিতে মাসিক ডেডিকেটেড স্প্রিন্ট স্কোয়াড অফার করি।'
    },
    {
      qEn: 'Can we migrate our existing application to Next Solution?',
      qBn: 'আমরা কি আমাদের বর্তমান অ্যাপ্লিকেশন নেক্সট সলিউশনে মাইগ্রেট করতে পারব?',
      aEn: 'Absolutely. We specialize in legacy code refactoring, database normalization, and framework upgrades (e.g., migrating PHP/WordPress or raw HTML systems to secure React/Next.js and Cloud storage).',
      aBn: 'অবশ্যই। আমরা লিগ্যাসি কোড রিফ্যাক্টরিং, ডাটাবেস অপ্টিমাইজেশন এবং আধুনিক ফ্রেমওয়ার্ক আপগ্রেডে পারদর্শী (যেমন ওয়ার্ডপ্রেস বা র রিয়্যাক্ট থেকে নিরাপদ ও দ্রুততর ক্লাউড আর্কিটেকচারে স্থানান্তরিত করা)।'
    },
    {
      qEn: 'Do you offer post-launch maintenance SLA guarantees?',
      qBn: 'আপনারা কি লঞ্চের পর মেইনটেন্যান্স বা এসএলএ গ্যারান্টি দেন?',
      aEn: 'Yes. Every project includes 30 days of complimentary hyper-care monitoring. Following that, we offer custom SLAs covering security audits, performance checkups, database backups, and instant bug fixes.',
      aBn: 'হ্যাঁ। প্রতিটি প্রজেক্টে ৩০ দিনের প্রশংসামূলক সাপোর্ট অন্তর্ভুক্ত রয়েছে। এরপর নিরাপত্তা অডিট, পারফরম্যান্স চেকআপ এবং দ্রুত বাগ ফিক্সসহ কাস্টম এসএলএ চুক্তি বাৎসরিক বা মাসিক নেওয়া যায়।'
    }
  ];

  // ==========================================
  // DETAIL VIEW: INDIVIDUAL SERVICE PAGE
  // ==========================================
  if (selectedService) {
    return (
      <section id="services-section-detail" className="bg-white min-h-screen py-24 animate-fadeIn text-zinc-900 font-sans selection:bg-blue-600 selection:text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-semibold text-gray-400">
              <li>
                <button 
                  onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 transition"
                >
                  {currentLang === 'en' ? 'Home' : 'হোম'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5">
                <Icons.ChevronRight className="h-3 w-3 shrink-0" />
                <button 
                  onClick={() => { setSelectedService(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 transition"
                >
                  {currentLang === 'en' ? 'Services' : 'সার্ভিসসমূহ'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5 text-blue-600" aria-current="page">
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
            className="group inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition mb-8 cursor-pointer border border-gray-100 rounded-full px-4 py-1.5 bg-gray-50/50 hover:bg-white"
          >
            <Icons.ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{currentLang === 'en' ? 'Back to Capabilities Catalog' : 'সেবা ক্যাটালগে ফিরে যান'}</span>
          </button>

          {/* Header Layout mimicking Stripe / Clay premium design */}
          <div className="border-b border-gray-100 pb-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start sm:items-center space-x-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/15">
                  {getIcon(selectedService.icon, "h-8 w-8")}
                </div>
                <div>
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-100/50">
                    {selectedService.category}
                  </span>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl mt-1.5">
                    {currentLang === 'en' ? selectedService.titleEn : selectedService.titleBn}
                  </h1>
                </div>
              </div>

              {/* Action and indicators overview */}
              <div className="flex flex-col sm:items-end justify-center">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400">
                  {currentLang === 'en' ? 'Service Reference Code' : 'সার্ভিস রেফারেন্স কোড'}
                </span>
                <span className="text-sm font-extrabold text-blue-600 mt-1 font-mono">NS-{selectedService.slug.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-gray-600 max-w-4xl">
              {currentLang === 'en' ? selectedService.descriptionEn : selectedService.descriptionBn}
            </p>

            {selectedService.subtitleEn && (
              <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/40 p-4 max-w-4xl">
                <p className="text-xs sm:text-sm font-medium text-blue-700 italic leading-relaxed">
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
                <span>{currentLang === 'en' ? 'Get Free Consultation' : 'ফ্রি পরামর্শ নিন'}</span>
                <Icons.ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Strategic Insight Columns: Why Need, Who For, Business Impact */}
          {(selectedService.whyNeedEn || selectedService.whoForEn || selectedService.businessImpactEn) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-gray-100">
              {selectedService.whoForEn && (
                <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4 shadow-sm hover:border-gray-200 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/40">
                    <Icons.Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                    {currentLang === 'en' ? 'Who is this for?' : 'কার জন্য প্রযোজ্য?'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whoForEn : selectedService.whoForBn}
                  </p>
                </div>
              )}

              {selectedService.whyNeedEn && (
                <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4 shadow-sm hover:border-gray-200 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100/40">
                    <Icons.AlertCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                    {currentLang === 'en' ? 'Why you need this' : 'কেন এটি প্রয়োজন'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whyNeedEn : selectedService.whyNeedBn}
                  </p>
                </div>
              )}

              {selectedService.businessImpactEn && (
                <div className="rounded-2xl bg-white border border-gray-100 p-6 space-y-4 shadow-sm hover:border-gray-200 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/40">
                    <Icons.TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
                    {currentLang === 'en' ? 'Expected Business Impact' : 'প্রত্যাশিত ব্যবসায়িক প্রভাব'}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
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
                <div className="py-12 border-b border-gray-100 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2.5">
                      <Icons.Layers className="h-5 w-5 text-blue-600" />
                      <span>{currentLang === 'en' ? 'Specialized Sub-Services' : 'বিশেষায়িত সাব-সার্ভিস সমূহ'}</span>
                    </h2>
                    <p className="text-xs text-gray-400">
                      {currentLang === 'en' ? 'Micro-capabilities we activate within this service group' : 'এই সার্ভিস গ্রুপের অধীনে যে ছোট সাব-সেবাসমূহ আমরা প্রদান করি'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subServices.map((sub: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 p-5 space-y-3 hover:border-blue-500 hover:shadow-sm transition bg-[#FAFAFA]/50">
                        <h4 className="text-xs font-extrabold text-gray-900 flex items-center space-x-2">
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{currentLang === 'en' ? sub.titleEn : sub.titleBn}</span>
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-b border-gray-100">
            
            {/* Column 1: Core Deliverables & Strategic Benefits */}
            <div className="space-y-12">
              {/* Deliverables */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2.5 border-b border-gray-100 pb-3">
                  <Icons.Compass className="h-5 w-5 text-blue-500" />
                  <span>{currentLang === 'en' ? 'Core Deliverables' : 'প্রধান ডেলিভারি সমূহ'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.featuresEn : selectedService.featuresBn).map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 leading-relaxed">
                      <Icons.CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2.5 border-b border-gray-100 pb-3">
                  <Icons.Sparkles className="h-5 w-5 text-purple-500" />
                  <span>{currentLang === 'en' ? 'Strategic Benefits' : 'কৌশলগত উপকারিতা'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.benefitsEn : selectedService.benefitsBn).map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 leading-relaxed">
                      <Icons.Plus className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
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
                <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2.5 border-b border-gray-100 pb-3">
                  <Icons.Workflow className="h-5 w-5 text-blue-500" />
                  <span>{currentLang === 'en' ? 'Execution Framework' : 'বাস্তবায়ন ফ্রেমওয়ার্ক'}</span>
                </h2>
                <div className="space-y-5">
                  {(currentLang === 'en' ? selectedService.processEn : selectedService.processBn).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 text-xs">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-600 border border-blue-100">
                        {idx + 1}
                      </span>
                      <p className="text-gray-600 mt-0.5 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Ecosystem */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2.5 border-b border-gray-100 pb-3">
                  <Icons.Code className="h-5 w-5 text-gray-700" />
                  <span>{currentLang === 'en' ? 'Technology Ecosystem' : 'প্রযুক্তি ইকোসিস্টেম'}</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techUsed.map((tech, idx) => (
                    <span key={idx} className="rounded-full bg-gray-50 border border-gray-200/80 px-3.5 py-1 text-xs font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-100/50 transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Service specific Pricing plans */}
          {(() => {
            if (!selectedService.pricingJson) return null;
            try {
              const plans = JSON.parse(selectedService.pricingJson);
              if (!Array.isArray(plans) || plans.length === 0) return null;
              return (
                <div className="py-12 border-b border-gray-100 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2.5">
                      <Icons.Layers className="h-5 w-5 text-blue-600" />
                      <span>{currentLang === 'en' ? 'Scope & Execution Blueprints' : 'প্রজেক্ট ডেলিভারি ব্লুপ্রিন্ট'}</span>
                    </h2>
                    <p className="text-xs text-gray-400">
                      {currentLang === 'en' ? 'Choose a structure matching your project volume and milestone speed' : 'আপনার প্রজেক্টের ভলিউম ও মাইলস্টোনের স্পিড অনুযায়ী সেরা কাঠামোটি নির্বাচন করুন'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {plans.map((p: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-6 space-y-6 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-blue-600 transition duration-300">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                            <div>
                              <h3 className="text-sm font-extrabold text-gray-900">{currentLang === 'en' ? p.nameEn : p.nameBn}</h3>
                              <span className="text-[9px] text-blue-600 font-extrabold uppercase tracking-widest mt-1 block">
                                {currentLang === 'en' ? p.periodEn : p.periodBn}
                              </span>
                            </div>
                          </div>
                          {p.featuresEn && Array.isArray(p.featuresEn) && (
                            <ul className="space-y-3 pt-2">
                              {(currentLang === 'en' ? p.featuresEn : p.featuresBn).map((feat: string, fidx: number) => (
                                <li key={fidx} className="flex items-start space-x-2.5 text-xs text-gray-600">
                                  <Icons.Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <button
                          id={`select-plan-btn-${idx}`}
                          onClick={() => handleBookService(`${selectedService.titleEn} (${p.nameEn})`)}
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 transition mt-6 hover:scale-[1.01]"
                        >
                          {currentLang === 'en' ? 'Select Plan' : 'প্ল্যানটি বেছে নিন'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } catch (err) {
              console.error('Error parsing pricing JSON', err);
              return null;
            }
          })()}

          {/* Service specific FAQs */}
          {(() => {
            if (!selectedService.faqsJson) return null;
            try {
              const sfaqs = JSON.parse(selectedService.faqsJson);
              if (!Array.isArray(sfaqs) || sfaqs.length === 0) return null;
              return (
                <div className="py-12 border-b border-gray-100 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2.5">
                      <Icons.HelpCircle className="h-5 w-5 text-blue-600" />
                      <span>{currentLang === 'en' ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসা'}</span>
                    </h2>
                    <p className="text-xs text-gray-400">
                      {currentLang === 'en' ? 'Answering specific details for this service' : 'এই সেবাসম্পর্কিত কিছু সাধারণ প্রশ্নোত্তর'}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {sfaqs.map((f: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-5 space-y-2.5 shadow-sm text-left">
                        <span className="font-bold text-xs text-gray-900 flex items-center space-x-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                          <span>{currentLang === 'en' ? f.questionEn : f.questionBn}</span>
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed pl-3.5 border-l-2 border-gray-100">
                          {currentLang === 'en' ? f.answerEn : f.answerBn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } catch (err) {
              console.error('Error parsing FAQs JSON', err);
              return null;
            }
          })()}

          {/* Return to capabilities footer */}
          <div className="mt-12 pt-8 flex justify-center">
            <button
              onClick={() => {
                setSelectedService(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-xl border border-gray-200 px-6 py-3 text-xs font-bold text-gray-700 hover:text-blue-600 hover:border-blue-600 transition cursor-pointer bg-white hover:bg-gray-50"
            >
              {currentLang === 'en' ? 'Return to Capabilities Catalog' : 'সম্পূর্ণ ক্যাটালগে ফিরে যান'}
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
    <div id="services-page-root" className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section id="services-hero" className="bg-neutral-50/40 border-b border-neutral-100/80 py-16 sm:py-24 relative overflow-hidden">
        
        {/* Custom Styling for the Interactive Hero */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -20;
            }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(1deg); }
          }
          .animate-dash-flow {
            stroke-dasharray: 6, 4;
            animation: dash 1.5s linear infinite;
          }
          .animate-float-slow {
            animation: float-slow 4s ease-in-out infinite;
          }
        `}} />

        {/* Ambient Neon Blobs in Background */}
        <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-purple-400/10 blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Interactive Category Selector */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Premium Status Capsule */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-xs font-bold text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>
                  {currentLang === 'en' ? 'SYSTEMS STACK BUILDER v4.0' : 'সিস্টেম স্ট্যাক বিল্ডার ৪.০'}
                </span>
              </div>

              {/* Breadcrumb Navigation */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-xs font-black text-neutral-400 uppercase tracking-widest">
                  <li>
                    <button 
                      onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-blue-600 transition cursor-pointer"
                    >
                      {currentLang === 'en' ? 'Home' : 'হোম'}
                    </button>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Icons.ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
                    <span className="text-blue-600">{currentLang === 'en' ? 'Services' : 'সার্ভিসসমূহ'}</span>
                  </li>
                </ol>
              </nav>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-none">
                {currentLang === 'en' ? (
                  <>Next-Gen <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Digital Blueprint</span> Suite</>
                ) : (
                  <>নেক্সট-জেন <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ডিজিটাল ব্লুপ্রিন্ট</span> ডিজাইন</>
                )}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-xl">
                {currentLang === 'en' ? (
                  'Explore our digital capabilities and simulate system alignments in real-time. Toggle different engineering pillars, cognitive neural components, design systems, or growth funnels to see the technology topology map dynamically update.'
                ) : (
                  'আমাদের ডিজিটাল প্রযুক্তিগত সেবাগুলো একনজরে দেখে নিন। আমাদের রিয়েল-টাইম টপোলজি আর্কিটেক্টে বিভিন্ন ফ্রন্টএন্ড স্ট্যাক, ডিজাইন সিস্টেম, এআই অটোমেশন বা মার্কেটিং নোড যুক্ত করে ইন্টারেক্টিভ কানেক্টিভিটি পরীক্ষা করুন।'
                )}
              </p>

              {/* Interactive Direct Anchor Selector */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                  {currentLang === 'en' ? 'Or quick jump to catalog category' : 'অথবা নির্দিষ্ট ক্যাটাগরিতে ক্লিক করুন'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Development', 'Design', 'Marketing'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        const target = document.getElementById('services-grid-list');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-100 bg-white hover:border-blue-600 hover:text-blue-600 px-3.5 py-1.5 text-xs font-extrabold text-neutral-600 transition cursor-pointer shadow-sm hover:shadow"
                    >
                      <span>
                        {cat === 'Development' && (currentLang === 'en' ? 'Web Systems' : 'ওয়েব সিস্টেম')}
                        {cat === 'Design' && (currentLang === 'en' ? 'Creative UI' : 'ক্রিয়েটিভ ইউআই')}
                        {cat === 'Marketing' && (currentLang === 'en' ? 'Growth Marketing' : 'গ্রোথ মার্কেটিং')}
                      </span>
                      <Icons.CornerDownRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-100">
                <button
                  id="hero-free-consultation-btn"
                  onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3.5 transition shadow-lg shadow-blue-600/10 cursor-pointer hover:scale-[1.01]"
                >
                  {currentLang === 'en' ? 'Get Free Consultation' : 'ফ্রি পরামর্শ নিন'}
                </button>
                <button
                  id="hero-view-portfolio-btn"
                  onClick={() => { setTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-neutral-200 px-6 py-3.5 text-xs font-bold text-neutral-700 hover:text-blue-600 hover:border-blue-600 bg-white transition cursor-pointer"
                >
                  {currentLang === 'en' ? 'View Our Portfolio' : 'পোর্টফোলিও দেখুন'}
                </button>
              </div>

            </div>

            {/* Right Column: Next-Gen Service Blueprinter (Interactive Sandbox Terminal) */}
            <div className="lg:col-span-6 relative">
              <div className="w-full max-w-lg mx-auto bg-neutral-900 border border-neutral-800 rounded-[32px] p-6 shadow-2xl shadow-blue-950/20 relative z-10 overflow-hidden text-white font-sans animate-float-slow">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                
                {/* Simulated Console Controls */}
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1 bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-700/50">
                    <Icons.Settings className="h-3 w-3 text-blue-400 animate-spin" />
                    <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-300">BLUEPRINT_SIMULATOR_CORE_V4</span>
                  </div>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  
                  {/* Grid Left: Quick Toggle Pillars */}
                  <div className="sm:col-span-6 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">
                      {currentLang === 'en' ? 'Toggle Stack Modules' : 'স্ট্যাক মডিউল নির্বাচন'}
                    </span>
                    
                    <div className="space-y-1.5 max-h-[175px] overflow-y-auto pr-1">
                      {blueprintOptions.map((option) => {
                        const active = selectedBlueprintTechs.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleToggleTech(option.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all text-left group cursor-pointer ${
                              active
                                ? 'bg-neutral-800/80 border-blue-500/40 text-white shadow-sm'
                                : 'bg-neutral-950/40 border-neutral-800/80 text-neutral-400 hover:border-neutral-700/60'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`h-6.5 w-6.5 rounded-lg flex items-center justify-center shrink-0 border ${
                                active
                                  ? 'bg-blue-600 border-blue-400/50 text-white'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                              }`}>
                                {option.icon === 'Code2' && <Icons.Code2 className="h-3.5 w-3.5" />}
                                {option.icon === 'Layout' && <Icons.Layout className="h-3.5 w-3.5" />}
                                {option.icon === 'Megaphone' && <Icons.Megaphone className="h-3.5 w-3.5" />}
                                {option.icon === 'Search' && <Icons.Search className="h-3.5 w-3.5" />}
                                {option.icon === 'Cpu' && <Icons.Cpu className="h-3.5 w-3.5" />}
                                {option.icon === 'Video' && <Icons.Video className="h-3.5 w-3.5" />}
                              </div>
                              <span className="text-[11px] font-extrabold truncate">
                                {currentLang === 'en' ? option.titleEn : option.titleBn}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[9px] font-mono font-bold bg-neutral-800 border border-neutral-700/60 text-neutral-300 px-1.5 py-0.5 rounded">
                                {currentLang === 'en' ? option.badgeEn : option.badgeBn}
                              </span>
                              <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${
                                active ? 'border-blue-500 bg-blue-600' : 'border-neutral-700 bg-transparent'
                              }`}>
                                {active && <Icons.Check className="h-2 w-2 text-white stroke-[3px]" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grid Right: Interactive Dynamic Visual Topology Network */}
                  <div className="sm:col-span-6 flex justify-center items-center">
                    <div className="relative w-44 h-44 bg-neutral-950/80 border border-neutral-800/60 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Network Canvas */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                        {/* Define gradients for connecting lines */}
                        <defs>
                          <linearGradient id="lineGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>

                        {/* Connection Lines */}
                        {blueprintOptions.map((opt) => {
                          const isSelected = selectedBlueprintTechs.includes(opt.id);
                          return (
                            <line
                              key={`line-${opt.id}`}
                              x1="160"
                              y1="160"
                              x2={opt.coords.x}
                              y2={opt.coords.y}
                              stroke={isSelected ? 'url(#lineGlowGrad)' : '#333333'}
                              strokeWidth={isSelected ? '2.5' : '1'}
                              className={isSelected ? 'animate-dash-flow' : ''}
                              strokeDasharray={isSelected ? '6, 4' : '3, 3'}
                            />
                          );
                        })}

                        {/* Core Server Node (Center) */}
                        <g transform="translate(160, 160)">
                          <circle r="22" className="fill-blue-500/10 stroke-blue-500/25 stroke-[1]" />
                          <circle r="15" className="fill-blue-600/30 stroke-blue-400/50 stroke-[1.5]" />
                          <circle r="6" className="fill-blue-500" />
                          <circle r="5" className="fill-white" />
                        </g>

                        {/* Satellite Nodes */}
                        {blueprintOptions.map((opt) => {
                          const isSelected = selectedBlueprintTechs.includes(opt.id);
                          return (
                            <g
                              key={`node-${opt.id}`}
                              transform={`translate(${opt.coords.x}, ${opt.coords.y})`}
                              onClick={() => handleToggleTech(opt.id)}
                              className="cursor-pointer"
                            >
                              {/* Pulsing ring for selected ones */}
                              {isSelected && (
                                <circle r="18" className="fill-none stroke-blue-400/20 stroke-[3] animate-pulse" />
                              )}
                              <circle
                                r="14"
                                className={`transition-all duration-300 ${
                                  isSelected
                                    ? 'fill-neutral-900 stroke-blue-500 stroke-[1.5]'
                                    : 'fill-neutral-950 stroke-neutral-800 hover:stroke-neutral-700 stroke-[1]'
                                }`}
                              />
                              {/* Central Indicator Mini Icon */}
                              <g transform="scale(0.5) translate(-10, -10)" className={isSelected ? 'text-blue-400' : 'text-neutral-600'}>
                                {opt.icon === 'Code2' && <Icons.Code2 className="h-5 w-5" />}
                                {opt.icon === 'Layout' && <Icons.Layout className="h-5 w-5" />}
                                {opt.icon === 'Megaphone' && <Icons.Megaphone className="h-5 w-5" />}
                                {opt.icon === 'Search' && <Icons.Search className="h-5 w-5" />}
                                {opt.icon === 'Cpu' && <Icons.Cpu className="h-5 w-5" />}
                                {opt.icon === 'Video' && <Icons.Video className="h-5 w-5" />}
                              </g>
                            </g>
                          );
                        })}
                      </svg>

                      {/* Overlaid Hub Label */}
                      <div className="absolute bottom-2 bg-neutral-900/90 border border-neutral-800/80 px-2.5 py-0.5 rounded-full text-[7px] font-mono tracking-widest text-neutral-400 text-center pointer-events-none">
                        {currentLang === 'en' ? 'ACTIVE SYSTEM TOPOLOGY' : 'সক্রিয় সিস্টেম টপোলজি'}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Diagnostic Console Panel */}
                <div className="bg-neutral-950 border border-neutral-800/60 rounded-xl p-3 my-4 space-y-1 font-mono text-[9px] text-emerald-400 h-16 overflow-y-auto">
                  <div className="text-neutral-500 flex items-center justify-between">
                    <span>{currentLang === 'en' ? 'BLUEPRINT CONFIGURATION OUTPUT' : 'ব্লুপ্রিন্ট কনফিগারেশন আউটপুট'}</span>
                    <span className="text-[8px] uppercase tracking-wider text-blue-500 font-bold bg-blue-500/10 px-1 rounded">SLA SAFE</span>
                  </div>
                  <div className="truncate">
                    &gt; {currentLang === 'en' ? 'Active nodes:' : 'সক্রিয় নোডসমূহ:'} {selectedBlueprintTechs.join(' || ')}
                  </div>
                  {/* Show dynamically updated provisioning logs */}
                  {selectedBlueprintTechs.map((techId) => {
                    const tech = blueprintOptions.find(o => o.id === techId);
                    if (!tech) return null;
                    return (
                      <div key={techId} className="truncate text-blue-400">
                        &gt; {tech.terminalLog}
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic Package Summary & Value Indicator */}
                <div className="border-t border-neutral-800/60 pt-4 mt-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      {currentLang === 'en' ? 'System Standard' : 'সিস্টেম স্ট্যান্ডার্ড'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-200">
                      <Icons.ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>{currentLang === 'en' ? 'Enterprise Grade' : 'এন্টারপ্রাইজ গ্রেড'}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                      {currentLang === 'en' ? 'Topology Synergy' : 'টপোলজি সিনার্জি সূচক'}
                    </span>
                    <div className="flex items-center gap-1.5 justify-end text-xl sm:text-2xl font-black text-blue-400 tracking-tight font-mono">
                      <Icons.Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                      <span>{synergyRating}%</span>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Blueprint Call-to-Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4 pt-1">
                  <button
                    onClick={handleCopyBlueprint}
                    className="sm:col-span-4 rounded-xl bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700/60 text-[10px] font-bold py-2.5 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isCopying ? <Icons.Check className="h-3.5 w-3.5 text-emerald-400" /> : <Icons.Copy className="h-3.5 w-3.5 text-neutral-400" />}
                    <span>{isCopying ? (currentLang === 'en' ? 'Copied' : 'কপি হয়েছে') : (currentLang === 'en' ? 'Copy Config' : 'কনফিগ কপি')}</span>
                  </button>

                  <button
                    onClick={handleLockBlueprint}
                    className="sm:col-span-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black py-2.5 transition flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-blue-600/20 hover:scale-[1.01]"
                  >
                    <span>{currentLang === 'en' ? 'Process Selected Capabilities' : 'নির্বাচিত সেবা আলোচনা করুন'}</span>
                    <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW GRID (LOADED DYNAMICALLY) */}
      <section id="services-grid-list" className="py-24 border-b border-gray-50 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'OUR CAPABILITIES CATALOG' : 'আমাদের সেবা ক্যাটালগ'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? 'Explore Specific Expertise' : 'বিশেষায়িত দক্ষতাসমূহ অন্বেষণ করুন'}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {currentLang === 'en' ? (
                'Manageable via active client consoles. Zero hardcoding. Click to access complete deliverable checklists, tech stacks, and plans.'
              ) : (
                'অ্যাডমিন কনসোল থেকে সরাসরি পরিচালনাযোগ্য। কোনো হার্ডকোডেড ডাটা নেই। পূর্ণ বিবরণ এবং ডেলিভারি প্ল্যান দেখতে যেকোনো সেবায় ক্লিক করুন।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-[#FAFAFA]/40 p-6 shadow-sm hover:shadow-lg hover:border-blue-600 hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon and Pricing Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300 border border-blue-100/50">
                      {getIcon(service.icon)}
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono font-bold bg-blue-50 border border-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                        {currentLang === 'en' ? 'Verified' : 'যাচাইকৃত'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {currentLang === 'en' ? service.titleEn : service.titleBn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {currentLang === 'en' ? service.descriptionEn : service.descriptionBn}
                  </p>

                  {/* Key Benefits (Requested Checklist) */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">
                      {currentLang === 'en' ? 'Core Benefits' : 'মূল সুবিধা সমূহ'}
                    </span>
                    <ul className="space-y-1.5">
                      {(currentLang === 'en' ? service.benefitsEn : service.benefitsBn).slice(0, 2).map((b, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[10px] text-gray-500">
                          <Icons.Check className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>{currentLang === 'en' ? 'View Details & Plan' : 'বিস্তারিত বিবরণ ও প্ল্যান'}</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icons.ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE OUR SERVICES (8 VALUE CARDS) */}
      <section id="services-why-choose" className="py-24 bg-[#FAFAFA] border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'AGENCY PRINCIPLES' : 'এজেন্সি নীতিমালা'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? 'Why Choose Next Solution?' : 'কেন আমাদের সেবা বেছে নেবেন?'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'We set premium benchmarks in execution. We do not compromise, outsource, or delay.'
              ) : (
                'আমরা কাজ বাস্তবায়নে প্রিমিয়াম মানদণ্ড নির্ধারণ করি। কোনো অসম্পূর্ণ কাজ বা সময়ক্ষেপণ আমাদের অভিধানে নেই।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Award',
                color: 'text-blue-600 bg-blue-50 border-blue-100/50',
                titleEn: 'Experienced Team',
                titleBn: 'অভিজ্ঞ টিম',
                descEn: 'All products are hand-engineered by senior full-stack developers and product designers.',
                descBn: 'আমাদের প্রতিটি কোড এবং ডিজাইন তৈরি করেন সিনিয়র ফুল-স্ট্যাক ডেভেলপার ও ডিজাইনাররা।'
              },
              {
                icon: 'Cpu',
                color: 'text-purple-600 bg-purple-50 border-purple-100/50',
                titleEn: 'Modern Technologies',
                titleBn: 'আধুনিক প্রযুক্তি',
                descEn: 'Strict typesafe TypeScript, React ecosystem, and optimized serverless cloud configurations.',
                descBn: 'টাইপসেফ টাইপস্ক্রিপ্ট, রিয়্যাক্ট ও ডাটাবেস অপ্টিমাইজেশন ব্যবহার করে সর্বোচ্চ গতি নিশ্চিত করা।'
              },
              {
                icon: 'Zap',
                color: 'text-emerald-600 bg-emerald-50 border-emerald-100/50',
                titleEn: 'Extreme Performance',
                titleBn: 'চরম পারফরম্যান্স',
                descEn: 'Ultra-low latency rendering and serverless caching ensuring your pages score 100/100 on Google Lighthouse.',
                descBn: '১০০% গুগল লাইটহাউস স্কোর এবং আল্ট্রা-লো ল্যাটেন্সি স্পিড নিশ্চিতকরণ।'
              },
              {
                icon: 'Zap',
                color: 'text-amber-600 bg-amber-50 border-amber-100/50',
                titleEn: 'Fast Delivery',
                titleBn: 'দ্রুত ডেলিভারি',
                descEn: 'Rigorous sprint tracking and agile timelines ensuring project milestones launch on schedule.',
                descBn: 'সুনির্দিষ্ট চাক্ষুষ পরিকল্পনা ও স্প্রিন্ট ট্র্যাকিং-এর মাধ্যমে সময়মতো ডেলিভারি নিশ্চিতকরণ।'
              },
              {
                icon: 'ShieldCheck',
                color: 'text-red-600 bg-red-50 border-red-100/50',
                titleEn: 'Secure Solutions',
                titleBn: 'নিরাপদ সমাধান',
                descEn: 'Robust middleware security, secure API routing, and full GDPR/HIPAA-ready compliance parameters.',
                descBn: 'মজবুত মিডলওয়্যার সিকিউরিটি এবং ডেটা সুরক্ষায় সর্বোচ্চ নিরাপত্তা ও কমপ্লায়েন্স।'
              },
              {
                icon: 'HeartHandshake',
                color: 'text-cyan-600 bg-cyan-50 border-cyan-100/50',
                titleEn: 'Ongoing Support',
                titleBn: 'সার্বক্ষণিক সাপোর্ট',
                descEn: 'Committed SLA contracts, regular version upgrades, and direct priority support channels.',
                descBn: 'বাৎসরিক এসএলএ চুক্তি, রেগুলার সিস্টেম ব্যাকআপ ও দ্রুত ত্রুটি সংশোধনে কাস্টমার সাপোর্ট।'
              },
              {
                icon: 'Layers',
                color: 'text-indigo-600 bg-indigo-50 border-indigo-100/50',
                titleEn: 'Scalable Architecture',
                titleBn: 'স্কেলেবল আর্কিটেকচার',
                descEn: 'Database normalization and decoupling enabling traffic pivots of up to 10x without latency.',
                descBn: 'ভবিষ্যতে সহজে ব্যবহারের জন্য ডিকাপলড আর্কিটেকচার যা ১০ গুণ ট্রাফিক লোড নিতে পারে।'
              },
              {
                icon: 'Smile',
                color: 'text-teal-600 bg-teal-50 border-teal-100/50',
                titleEn: 'Customer Satisfaction',
                titleBn: 'গ্রাহক সন্তুষ্টি',
                descEn: 'Comprehensive collaborative Figma feedback loops and 100% intellectual property transfers.',
                descBn: 'সম্পূর্ণ সহযোগিতা, নিয়মিত কাজের আপডেট প্রদান ও শতভাগ বুদ্ধিবৃত্তিক স্বত্ব হস্তান্তর।'
              }
            ].map((card, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4 shadow-sm hover:border-blue-600/30 transition duration-300">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${card.color}`}>
                  {getIcon(card.icon, "h-5 w-5")}
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  {currentLang === 'en' ? card.titleEn : card.titleBn}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {currentLang === 'en' ? card.descEn : card.descBn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DEVELOPMENT PROCESS (8 INTERACTIVE STEPS) */}
      <section id="services-process" className="py-24 bg-white border-b border-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'OUR PIPELINE FRAMEWORK' : 'আমাদের কাজের পাইপলাইন'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? '8 Phases to Perfect Release' : 'নিখুঁত প্রকাশের ৮টি স্তর'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'How we transform ideas from napkin designs into production-ready software systems.'
              ) : (
                'আমরা কীভাবে আপনার সাধারণ আইডিয়াকে মার্কেট-ডমিনেটিং ডিজিটাল সিস্টেমে রূপান্তর করি।'
              )}
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: '01', titleEn: 'Consultation', titleBn: 'পরামর্শ ও পরিচিতি', descEn: 'Direct scoping call with Solutions Architect to understand key business metrics.', descBn: 'ব্যবসায়িক লক্ষ্য ও কারিগরি পরিধি বুঝতে সলিউশন আর্কিটেক্টের সাথে আলোচনা।' },
              { step: '02', titleEn: 'Requirement Analysis', titleBn: 'প্রয়োজনীয়তা বিশ্লেষণ', descEn: 'Surgical software auditing, user stories, and comprehensive data pipeline modeling.', descBn: 'সফটওয়্যার কোড অডিট, ইউজার জার্নি বিশ্লেষণ এবং তথ্য প্রবাহ ডায়াগ্রাম তৈরি।' },
              { step: '03', titleEn: 'Planning & Architecture', titleBn: 'পরিকল্পনা ও স্থাপত্য', descEn: 'Database schema diagrams, system wireframes, and secure API blueprints mapping.', descBn: 'ডাটাবেস স্কিমা ডিজাইন, সিস্টেম রিডানড্যান্সি এবং এপিআই ব্লুপ্রিন্ট তৈরি।' },
              { step: '04', titleEn: 'UI/UX Redesign', titleBn: 'ইউজার ইন্টারফেস ডিজাইন', descEn: 'Creating beautiful high-fidelity component libraries with responsive motion rules.', descBn: 'ফিডব্যাক লুপের মাধ্যমে ফিগমাতে চমৎকার কম্পোনেন্ট ডিজাইন ও প্রোটোটাইপিং।' },
              { step: '05', titleEn: 'Development', titleBn: 'কোডিং ও ডেভেলপমেন্ট', descEn: 'Strict typesafe production-ready code execution on dedicated Git branches.', descBn: 'ডেডিকেটেড গিট রিপোজিটরিতে টাইপসেফ কোড লেখা ও সার্ভার ইন্টিগ্রেশন।' },
              { step: '06', titleEn: 'Rigorous Testing', titleBn: 'নিবিড় পরীক্ষণ ও টেস্টিং', descEn: 'Continuous Integration automation, automated unit and user testing routines.', descBn: 'স্বয়ংক্রিয় ইউনিট টেস্ট এবং সম্পূর্ণ ইউজার ইন্টারফেস এক্সপেরিয়েন্স টেস্টিং।' },
              { step: '07', titleEn: 'Production Deployment', titleBn: 'ডেপ্লয়মেন্ট ও প্রকাশ', descEn: 'Secure Cloud orchestration, SSL provisioning, and global DNS routing setups.', descBn: 'নিরাপদ ক্লাউড ইনফ্রাস্ট্রাকচারে ডেপ্লয়মেন্ট, এসএসএল ও সিডিএন অপ্টিমাইজেশন।' },
              { step: '08', titleEn: 'Maintenance & Support', titleBn: 'রক্ষণাবেক্ষণ ও সাপোর্ট', descEn: 'Continuous optimization checkups, backups, and proactive security monitoring.', descBn: 'নিয়মিত সিকিউরিটি আপডেট, ডাটাবেস ব্যাকআপ এবং প্রোঅ্যাক্টিভ মনিটরিং।' }
            ].map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4 shadow-sm relative group hover:border-blue-600 transition duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-100 group-hover:text-blue-600 transition duration-200">
                    {p.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  {currentLang === 'en' ? p.titleEn : p.titleBn}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {currentLang === 'en' ? p.descEn : p.descBn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INDUSTRIES WE SERVE (12 ELEGANT CARDS) */}
      <section id="services-industries" className="py-24 bg-[#FAFAFA] border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'MARKET VERTICALS' : 'মার্কেট ভার্টিকাল সমূহ'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? 'Industries We Serve' : 'যে সকল সেক্টরে আমরা সেবা দিই'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'Tailored architectures designed specifically for compliance and user context of individual markets.'
              ) : (
                'নির্দিষ্ট বাজারের নিয়মকানুন এবং ব্যবহারকারীদের অভিজ্ঞতার সাথে সামঞ্জস্যপূর্ণ বিশেষায়িত কাঠামো।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ShoppingBag', labelEn: 'E-Commerce', labelBn: 'ই-কমার্স' },
              { icon: 'Utensils', labelEn: 'Restaurant', labelBn: 'রেস্টুরেন্ট ও ফুড' },
              { icon: 'Heart', labelEn: 'Healthcare', labelBn: 'হেলথকেয়ার ও মেডিসিন' },
              { icon: 'GraduationCap', labelEn: 'Education', labelBn: 'শিক্ষা ও এডটেক' },
              { icon: 'Home', labelEn: 'Real Estate', labelBn: 'রিয়েল এস্টেট' },
              { icon: 'Plane', labelEn: 'Travel & Tourism', labelBn: 'ভ্রমণ ও পর্যটন' },
              { icon: 'Building', labelEn: 'Corporate Enterprises', labelBn: 'কর্পোরেট প্রতিষ্ঠান' },
              { icon: 'Rocket', labelEn: 'High-Growth Startups', labelBn: 'স্টার্টআপ ও উদ্ভাবন' },
              { icon: 'Globe', labelEn: 'NGO & Non-Profits', labelBn: 'এনজিও ও সামাজিক সংস্থা' },
              { icon: 'Factory', labelEn: 'Manufacturing', labelBn: 'উৎপাদন ও শিল্প কারখানা' },
              { icon: 'Briefcase', labelEn: 'Law Firms', labelBn: 'আইনজীবী ও ফার্ম' },
              { icon: 'User', labelEn: 'Personal Brands', labelBn: 'ব্যক্তিগত ব্র্যান্ডিং' }
            ].map((ind, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-5 flex items-center space-x-3 shadow-sm hover:border-blue-600/30 transition duration-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100/50">
                  {getIcon(ind.icon, "h-4 w-4")}
                </div>
                <span className="text-xs font-bold text-gray-700">
                  {currentLang === 'en' ? ind.labelEn : ind.labelBn}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TECHNOLOGIES WE USE (CATEGORIZED TABS) */}
      <section id="services-tech-stack" className="py-24 bg-white border-b border-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'OUR STACK ECOSYSTEM' : 'আমাদের প্রযুক্তি ইকোসিস্টেম'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? 'Technology Ecosystem' : 'প্রযুক্তি ইকোসিস্টেম'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'We write strict typesafe assemblies using industry leading stacks. Zero legacy dependencies.'
              ) : (
                'আমরা আধুনিক এবং নিরাপদ স্ট্যাক ব্যবহার করে টাইপসেফ কোড লিখে থাকি। কোনো অপ্রয়োজনীয় জটিলতা ছাড়াই।'
              )}
            </p>
          </div>

          {/* Stack Tab selection */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { id: 'frontend', labelEn: 'Frontend', labelBn: 'ফ্রন্টএন্ড' },
              { id: 'backend', labelEn: 'Backend & Cloud', labelBn: 'ব্যাকএন্ড ও ক্লাউড' },
              { id: 'design', labelEn: 'Design Tools', labelBn: 'ডিজাইন টুলস' },
              { id: 'automation', labelEn: 'AI & Automations', labelBn: 'এআই ও অটোমেশন' },
              { id: 'video', labelEn: 'Video & Graphics', labelBn: 'ভিডিও ও গ্রাফিক্স' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTechTab(tab.id as any)}
                className={`rounded-full px-5 py-2 text-xs font-bold border transition ${
                  activeTechTab === tab.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10' 
                    : 'bg-white border-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                {currentLang === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="bg-[#FAFAFA]/60 border border-gray-100 rounded-3xl p-8 max-w-4xl mx-auto">
            {activeTechTab === 'frontend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900">React & Next.js Ecosystem</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We use Vite, React 18/19, and Next.js server component rendering to deliver exceptional load speeds (First Contentful Paint &lt; 0.4s).
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['React 19', 'Next.js', 'Vite', 'Tailwind CSS 4', 'TypeScript', 'Framer Motion', 'Redux Toolkit', 'Zustand', 'D3.js', 'Recharts'].map((t) => (
                    <span key={t} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'backend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900">Cloud Run & Databases</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Strict RESTful configurations, secure Node.js APIs, database migrations via ORM models, and cloud-hosted data storage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Cloud SQL', 'Firebase Firestore', 'MongoDB', 'Drizzle ORM', 'Redis', 'Docker', 'Google Cloud Run'].map((t) => (
                    <span key={t} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'design' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900">Editorial Figma Redesigns</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We design responsive design rules, atomic layout components, stylebooks, interactive click triggers, and visual prototypes.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Figma Professional', 'Adobe Illustrator', 'Photoshop', 'Canva Pro', 'Spline 3D', 'Proto.io', 'Bespoke Style Guides'].map((t) => (
                    <span key={t} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'automation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900">AI Agents & Pipeline Loops</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Integrating Google Gemini models directly via server proxies, LangChain embeddings, vector search indexes, and n8n workflow loops.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Google Gemini SDK', 'OpenAI API', 'LangChain', 'Pinecone Vector DB', 'n8n pipelines', 'Make.com', 'Airtable Syncs', 'Slack bots', 'Zapier'].map((t) => (
                    <span key={t} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'video' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900">Cinematic Video Ads & Reels</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Storyboards, advanced color grading, motion graphics, audio restoration, and ad integrations to drive click conversions.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['DaVinci Resolve Studio', 'Premiere Pro', 'After Effects', 'CapCut Pro', 'Storyblocks License', 'Getty Images License', 'Professional Sound Design'].map((t) => (
                    <span key={t} className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. FAQ PREVIEW SECTION */}
      <section id="services-faq-accordion" className="py-24 bg-[#FAFAFA] border-b border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              {currentLang === 'en' ? 'COMMON QUESTIONS' : 'জিজ্ঞাসিত প্রশ্নাবলী'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {currentLang === 'en' ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসাসমূহ'}
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {mainFaqs.map((faq, idx) => {
              const isOpen = activeFAQIndex === idx;
              return (
                <div key={idx} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFAQIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-900 hover:text-blue-600 transition"
                  >
                    <span>{currentLang === 'en' ? faq.qEn : faq.qBn}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:text-blue-600">
                      {isOpen ? <Icons.Minus className="h-4 w-4 text-blue-600" /> : <Icons.Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-gray-500 leading-relaxed border-t border-gray-50/50 animate-fadeIn">
                      {currentLang === 'en' ? faq.aEn : faq.aBn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section id="services-final-cta" className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-xl text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
            
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-100 relative z-10 block">
              {currentLang === 'en' ? 'COLLABORATIVE CODES' : 'সহযোগিতা'}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-black max-w-2xl mx-auto leading-tight relative z-10">
              {currentLang === 'en' ? 'Ready to Scale Your Business Operations?' : 'আপনার ব্যবসায়িক কার্যক্রমকে আরও প্রসারিত করতে প্রস্তুত?'}
            </h2>
            
            <p className="text-xs md:text-sm text-blue-100 max-w-md mx-auto relative z-10 leading-relaxed">
              {currentLang === 'en' ? (
                'Talk to a senior partner today to map out user stories, scope budgets, and draft blueprints.'
              ) : (
                'আপনার প্রজেক্টের পরিকল্পনা, বাজেট নির্ধারণ এবং সফল বাস্তবায়নের জন্য আজই আমাদের পার্টনারের সাথে কথা বলুন।'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
              <button
                id="cta-get-free-quote"
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl bg-white hover:bg-gray-50 text-blue-600 text-xs font-bold px-6 py-3.5 transition shadow-md hover:scale-[1.01] cursor-pointer"
              >
                {currentLang === 'en' ? 'Start Now' : 'এখনই শুরু করুন'}
              </button>
              <button
                id="cta-contact-us"
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl border border-white/30 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition cursor-pointer"
              >
                {currentLang === 'en' ? 'Contact Us Directly' : 'সরাসরি যোগাযোগ করুন'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
