"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { translations } from '@/data/translations';
import { getServices } from '@/lib/db';
import { initialServices } from '@/data/initialData';
import { Service } from '@/types';

interface ServicesSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

export default function ServicesSection({ currentLang, setTab, isFullPage = false }: ServicesSectionProps) {
  const t = translations[currentLang];
  const [services, setServices] = useState<Service[]>(initialServices);
  useEffect(() => {
    setServices(getServices());
  }, []);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'design' | 'automation' | 'video' | 'marketing'>('frontend');

  // Interactive Service Blueprinter State
  const [selectedBlueprintTechs, setSelectedBlueprintTechs] = useState<string[]>(['web-dev', 'ui-ux']);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const blueprintOptions = React.useMemo(() => [
    {
      id: 'web-dev',
      titleEn: 'Web Development',
      titleBn: 'à¦“à¦¯à¦¼à§‡à¦¬ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ',
      badgeEn: 'React / Next.js',
      badgeBn: 'à¦°à¦¿à§Ÿà§à¦¯à¦¾à¦•à§à¦Ÿ / à¦¨à§‡à¦•à§à¦¸à¦Ÿ.à¦œà§‡à¦à¦¸',
      icon: 'Code2',
      color: 'from-blue-500 dark:from-orange-500 to-cyan-500',
      terminalLog: 'Provisioning secure cloud architecture & CDN edge...',
      coords: { x: 70, y: 70 }
    },
    {
      id: 'ui-ux',
      titleEn: 'UI/UX Design',
      titleBn: 'à¦‡à¦‰à¦†à¦‡/à¦‡à¦‰à¦à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨',
      badgeEn: 'Figma Systems',
      badgeBn: 'à¦«à¦¿à¦—à§‹à¦®à¦¾ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®',
      icon: 'Layout',
      color: 'from-purple-500 to-pink-600',
      terminalLog: 'Calibrating user personas & fluid UX flows...',
      coords: { x: 250, y: 70 }
    },
    {
      id: 'marketing',
      titleEn: 'Digital Marketing',
      titleBn: 'à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚',
      badgeEn: 'High-ROI Funnels',
      badgeBn: 'à¦†à¦°à¦“à¦†à¦‡ à¦«à¦¾à¦¨à§‡à¦²',
      icon: 'Megaphone',
      color: 'from-orange-500 to-red-600',
      terminalLog: 'Synthesizing conversion campaigns & analytics pixels...',
      coords: { x: 260, y: 160 }
    },
    {
      id: 'seo',
      titleEn: 'SEO Strategy',
      titleBn: 'à¦à¦¸à¦‡à¦“ à¦•à§à¦¯à¦¾à¦®à§à¦ªà§‡à¦‡à¦¨',
      badgeEn: 'Organic Rankings',
      badgeBn: 'à¦…à¦°à§à¦—à¦¾à¦¨à¦¿à¦• à¦°â€à§à¦¯à¦¾à¦™à§à¦•à¦¿à¦‚',
      icon: 'Search',
      color: 'from-emerald-500 to-teal-600',
      terminalLog: 'Mapping search syntax & core semantic page ranks...',
      coords: { x: 250, y: 250 }
    },
    {
      id: 'ai-automation',
      titleEn: 'AI Services',
      titleBn: 'à¦à¦†à¦‡ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨',
      badgeEn: 'LLMs & Agents',
      badgeBn: 'à¦à¦²à¦à¦²à¦à¦® à¦“ à¦à¦†à¦‡ à¦à¦œà§‡à¦¨à§à¦Ÿà¦¸',
      icon: 'Cpu',
      color: 'from-indigo-500 to-blue-600',
      terminalLog: 'Wiring intelligent LLM cognitive node triggers...',
      coords: { x: 70, y: 250 }
    },
    {
      id: 'video-editing',
      titleEn: 'Video Production',
      titleBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦ªà§à¦°à¦¡à¦¾à¦•à¦¶à¦¨',
      badgeEn: 'Cinematic Promos',
      badgeBn: 'à¦¸à¦¿à¦¨à§‡à¦®à§à¦¯à¦¾à¦Ÿà¦¿à¦• à¦ªà§à¦°à¦®à§‹à¦¶à¦¨',
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
      qBn: 'à¦†à¦ªà¦¨à¦¾à¦°à¦¾ à¦•à¦¿ à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦¬à¦¾à¦œà§‡à¦Ÿà§‡ à¦¨à¦¾à¦•à¦¿ à¦˜à¦£à§à¦Ÿà¦¾à¦° à¦¹à¦¿à¦¸à¦¾à¦¬à§‡ à¦šà¦¾à¦°à§à¦œ à¦•à¦°à§‡à¦¨?',
      aEn: 'We prefer transparent fixed-price milestones for clearly defined scopes. For agile startups needing rapid continuous pivots, we offer dedicated monthly sprint squads on a retainer basis.',
      aBn: 'à¦†à¦®à¦°à¦¾ à¦¸à§à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦•à¦¾à¦œà§‡à¦° à¦ªà¦°à¦¿à¦§à¦¿à¦° à¦œà¦¨à§à¦¯ à¦¸à§à¦¬à¦šà§à¦› à¦«à¦¿à¦•à§à¦¸à¦¡-à¦ªà§à¦°à¦¾à¦‡à¦¸ à¦®à¦¾à¦‡à¦²à¦¸à§à¦Ÿà§‹à¦¨ à¦ªà¦›à¦¨à§à¦¦ à¦•à¦°à¦¿à¥¤ à¦¤à¦¬à§‡ à¦•à§à¦°à¦®à¦¾à¦—à¦¤ à¦ªà¦°à¦¿à¦¬à¦°à§à¦§à¦¨à¦¶à§€à¦² à¦¸à§à¦Ÿà¦¾à¦°à§à¦Ÿà¦†à¦ªà§‡à¦° à¦œà¦¨à§à¦¯ à¦†à¦®à¦°à¦¾ à¦°à¦¿à¦Ÿà§‡à¦‡à¦¨à¦¾à¦° à¦­à¦¿à¦¤à§à¦¤à¦¿à¦¤à§‡ à¦®à¦¾à¦¸à¦¿à¦• à¦¡à§‡à¦¡à¦¿à¦•à§‡à¦Ÿà§‡à¦¡ à¦¸à§à¦ªà§à¦°à¦¿à¦¨à§à¦Ÿ à¦¸à§à¦•à§‹à¦¯à¦¼à¦¾à¦¡ à¦…à¦«à¦¾à¦° à¦•à¦°à¦¿à¥¤'
    },
    {
      qEn: 'Can we migrate our existing application to Next Solution?',
      qBn: 'à¦†à¦®à¦°à¦¾ à¦•à¦¿ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¿à¦•à§‡à¦¶à¦¨ à¦¨à§‡à¦•à§à¦¸à¦Ÿ à¦¸à¦²à¦¿à¦‰à¦¶à¦¨à§‡ à¦®à¦¾à¦‡à¦—à§à¦°à§‡à¦Ÿ à¦•à¦°à¦¤à§‡ à¦ªà¦¾à¦°à¦¬?',
      aEn: 'Absolutely. We specialize in legacy code refactoring, database normalization, and framework upgrades (e.g., migrating PHP/WordPress or raw HTML systems to secure React/Next.js and Cloud storage).',
      aBn: 'à¦…à¦¬à¦¶à§à¦¯à¦‡à¥¤ à¦†à¦®à¦°à¦¾ à¦²à¦¿à¦—à§à¦¯à¦¾à¦¸à¦¿ à¦•à§‹à¦¡ à¦°à¦¿à¦«à§à¦¯à¦¾à¦•à§à¦Ÿà¦°à¦¿à¦‚, à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦¸ à¦…à¦ªà§à¦Ÿà¦¿à¦®à¦¾à¦‡à¦œà§‡à¦¶à¦¨ à¦à¦¬à¦‚ à¦†à¦§à§à¦¨à¦¿à¦• à¦«à§à¦°à§‡à¦®à¦“à¦¯à¦¼à¦¾à¦°à§à¦• à¦†à¦ªà¦—à§à¦°à§‡à¦¡à§‡ à¦ªà¦¾à¦°à¦¦à¦°à§à¦¶à§€ (à¦¯à§‡à¦®à¦¨ à¦“à¦¯à¦¼à¦¾à¦°à§à¦¡à¦ªà§à¦°à§‡à¦¸ à¦¬à¦¾ à¦° à¦°à¦¿à§Ÿà§à¦¯à¦¾à¦•à§à¦Ÿ à¦¥à§‡à¦•à§‡ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦“ à¦¦à§à¦°à§à¦¤à¦¤à¦° à¦•à§à¦²à¦¾à¦‰à¦¡ à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à¦šà¦¾à¦°à§‡ à¦¸à§à¦¥à¦¾à¦¨à¦¾à¦¨à§à¦¤à¦°à¦¿à¦¤ à¦•à¦°à¦¾)à¥¤'
    },
    {
      qEn: 'Do you offer post-launch maintenance SLA guarantees?',
      qBn: 'à¦†à¦ªà¦¨à¦¾à¦°à¦¾ à¦•à¦¿ à¦²à¦žà§à¦šà§‡à¦° à¦ªà¦° à¦®à§‡à¦‡à¦¨à¦Ÿà§‡à¦¨à§à¦¯à¦¾à¦¨à§à¦¸ à¦¬à¦¾ à¦à¦¸à¦à¦²à¦ à¦—à§à¦¯à¦¾à¦°à¦¾à¦¨à§à¦Ÿà¦¿ à¦¦à§‡à¦¨?',
      aEn: 'Yes. Every project includes 30 days of complimentary hyper-care monitoring. Following that, we offer custom SLAs covering security audits, performance checkups, database backups, and instant bug fixes.',
      aBn: 'à¦¹à§à¦¯à¦¾à¦à¥¤ à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà§‡ à§©à§¦ à¦¦à¦¿à¦¨à§‡à¦° à¦ªà§à¦°à¦¶à¦‚à¦¸à¦¾à¦®à§‚à¦²à¦• à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦…à¦¨à§à¦¤à¦°à§à¦­à§à¦•à§à¦¤ à¦°à§Ÿà§‡à¦›à§‡à¥¤ à¦à¦°à¦ªà¦° à¦¨à¦¿à¦°à¦¾à¦ªà¦¤à§à¦¤à¦¾ à¦…à¦¡à¦¿à¦Ÿ, à¦ªà¦¾à¦°à¦«à¦°à¦®à§à¦¯à¦¾à¦¨à§à¦¸ à¦šà§‡à¦•à¦†à¦ª à¦à¦¬à¦‚ à¦¦à§à¦°à§à¦¤ à¦¬à¦¾à¦— à¦«à¦¿à¦•à§à¦¸à¦¸à¦¹ à¦•à¦¾à¦¸à§à¦Ÿà¦® à¦à¦¸à¦à¦²à¦ à¦šà§à¦•à§à¦¤à¦¿ à¦¬à¦¾à§Žà¦¸à¦°à¦¿à¦• à¦¬à¦¾ à¦®à¦¾à¦¸à¦¿à¦• à¦¨à§‡à¦“à§Ÿà¦¾ à¦¯à¦¾à§Ÿà¥¤'
    }
  ];

  // ==========================================
  // DETAIL VIEW: INDIVIDUAL SERVICE PAGE
  // ==========================================
  if (selectedService) {
    return (
      <section id="services-section-detail" className="bg-white dark:bg-[#141414] min-h-screen py-24 animate-fadeIn text-zinc-900 font-sans selection:bg-blue-600 selection:text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-semibold text-gray-400 dark:text-neutral-500">
              <li>
                <button 
                  onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 dark:text-orange-400 transition"
                >
                  {currentLang === 'en' ? 'Home' : 'à¦¹à§‹à¦®'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5">
                <Icons.ChevronRight className="h-3 w-3 shrink-0" />
                <button 
                  onClick={() => { setSelectedService(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-600 dark:text-orange-400 transition"
                >
                  {currentLang === 'en' ? 'Services' : 'à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸à¦¸à¦®à§‚à¦¹'}
                </button>
              </li>
              <li className="flex items-center space-x-1.5 text-blue-600 dark:text-orange-400" aria-current="page">
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
            className="group inline-flex items-center space-x-2 text-xs font-bold text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-blue-600 dark:text-orange-400 transition mb-8 cursor-pointer border border-gray-100 dark:border-neutral-800 rounded-full px-4 py-1.5 bg-gray-50/50 hover:bg-white dark:bg-[#141414]"
          >
            <Icons.ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{currentLang === 'en' ? 'Back to Capabilities Catalog' : 'à¦¸à§‡à¦¬à¦¾ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—à§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨'}</span>
          </button>

          {/* Header Layout mimicking Stripe / Clay premium design */}
          <div className="border-b border-gray-100 dark:border-neutral-800 pb-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start sm:items-center space-x-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/15">
                  {getIcon(selectedService.icon, "h-8 w-8")}
                </div>
                <div>
                  <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-100/50">
                    {selectedService.category}
                  </span>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight sm:text-4xl mt-1.5">
                    {currentLang === 'en' ? selectedService.titleEn : selectedService.titleBn}
                  </h1>
                </div>
              </div>

              {/* Action and indicators overview */}
              <div className="flex flex-col sm:items-end justify-center">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 dark:text-neutral-500">
                  {currentLang === 'en' ? 'Service Reference Code' : 'à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦°à§‡à¦«à¦¾à¦°à§‡à¦¨à§à¦¸ à¦•à§‹à¦¡'}
                </span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-orange-400 mt-1 font-mono">NS-{selectedService.slug.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-neutral-300 dark:text-neutral-600 max-w-4xl">
              {currentLang === 'en' ? selectedService.descriptionEn : selectedService.descriptionBn}
            </p>

            {selectedService.subtitleEn && (
              <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/40 dark:bg-orange-500/5 p-4 max-w-4xl">
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
                <span>{currentLang === 'en' ? 'Get Free Consultation' : 'à¦«à§à¦°à¦¿ à¦ªà¦°à¦¾à¦®à¦°à§à¦¶ à¦¨à¦¿à¦¨'}</span>
                <Icons.ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Strategic Insight Columns: Why Need, Who For, Business Impact */}
          {(selectedService.whyNeedEn || selectedService.whoForEn || selectedService.businessImpactEn) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-gray-100 dark:border-neutral-800">
              {selectedService.whoForEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100/40">
                    <Icons.Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Who is this for?' : 'à¦•à¦¾à¦° à¦œà¦¨à§à¦¯ à¦ªà§à¦°à¦¯à§‹à¦œà§à¦¯?'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whoForEn : selectedService.whoForBn}
                  </p>
                </div>
              )}

              {selectedService.whyNeedEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100/40">
                    <Icons.AlertCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Why you need this' : 'à¦•à§‡à¦¨ à¦à¦Ÿà¦¿ à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    {currentLang === 'en' ? selectedService.whyNeedEn : selectedService.whyNeedBn}
                  </p>
                </div>
              )}

              {selectedService.businessImpactEn && (
                <div className="rounded-2xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 p-6 space-y-4 shadow-sm hover:border-gray-200 dark:border-neutral-700 transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/40">
                    <Icons.TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-widest">
                    {currentLang === 'en' ? 'Expected Business Impact' : 'à¦ªà§à¦°à¦¤à§à¦¯à¦¾à¦¶à¦¿à¦¤ à¦¬à§à¦¯à¦¬à¦¸à¦¾à¦¯à¦¼à¦¿à¦• à¦ªà§à¦°à¦­à¦¾à¦¬'}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
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
                <div className="py-12 border-b border-gray-100 dark:border-neutral-800 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2.5">
                      <Icons.Layers className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                      <span>{currentLang === 'en' ? 'Specialized Sub-Services' : 'à¦¬à¦¿à¦¶à§‡à¦·à¦¾à¦¯à¦¼à¦¿à¦¤ à¦¸à¦¾à¦¬-à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦¸à¦®à§‚à¦¹'}</span>
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-neutral-500">
                      {currentLang === 'en' ? 'Micro-capabilities we activate within this service group' : 'à¦à¦‡ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸ à¦—à§à¦°à§à¦ªà§‡à¦° à¦…à¦§à§€à¦¨à§‡ à¦¯à§‡ à¦›à§‹à¦Ÿ à¦¸à¦¾à¦¬-à¦¸à§‡à¦¬à¦¾à¦¸à¦®à§‚à¦¹ à¦†à¦®à¦°à¦¾ à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦•à¦°à¦¿'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subServices.map((sub: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 p-5 space-y-3 hover:border-blue-500 hover:shadow-sm transition bg-[#FAFAFA]/50 dark:bg-[#141414]/50">
                        <h4 className="text-xs font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
                          <span>{currentLang === 'en' ? sub.titleEn : sub.titleBn}</span>
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-b border-gray-100 dark:border-neutral-800">
            
            {/* Column 1: Core Deliverables & Strategic Benefits */}
            <div className="space-y-12">
              {/* Deliverables */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Compass className="h-5 w-5 text-blue-500 dark:text-orange-400" />
                  <span>{currentLang === 'en' ? 'Core Deliverables' : 'à¦ªà§à¦°à¦§à¦¾à¦¨ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¸à¦®à§‚à¦¹'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.featuresEn : selectedService.featuresBn).map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed">
                      <Icons.CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Sparkles className="h-5 w-5 text-purple-500" />
                  <span>{currentLang === 'en' ? 'Strategic Benefits' : 'à¦•à§Œà¦¶à¦²à¦—à¦¤ à¦‰à¦ªà¦•à¦¾à¦°à¦¿à¦¤à¦¾'}</span>
                </h2>
                <ul className="space-y-4">
                  {(currentLang === 'en' ? selectedService.benefitsEn : selectedService.benefitsBn).map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed">
                      <Icons.Plus className="h-4 w-4 text-blue-500 dark:text-orange-400 shrink-0 mt-0.5" />
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
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Workflow className="h-5 w-5 text-blue-500 dark:text-orange-400" />
                  <span>{currentLang === 'en' ? 'Execution Framework' : 'à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à¦¯à¦¼à¦¨ à¦«à§à¦°à§‡à¦®à¦“à¦¯à¦¼à¦¾à¦°à§à¦•'}</span>
                </h2>
                <div className="space-y-5">
                  {(currentLang === 'en' ? selectedService.processEn : selectedService.processBn).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 text-xs">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-orange-500/10 text-[10px] font-bold text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20">
                        {idx + 1}
                      </span>
                      <p className="text-gray-600 dark:text-neutral-300 dark:text-neutral-600 mt-0.5 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Ecosystem */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2.5 border-b border-gray-100 dark:border-neutral-800 pb-3">
                  <Icons.Code className="h-5 w-5 text-gray-700 dark:text-neutral-200" />
                  <span>{currentLang === 'en' ? 'Technology Ecosystem' : 'à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿ à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®'}</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techUsed.map((tech, idx) => (
                    <span key={idx} className="rounded-full bg-gray-50 dark:bg-neutral-900 border border-gray-200/80 px-3.5 py-1 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:border-gray-300 hover:bg-gray-100/50 transition">
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
                <div className="py-12 border-b border-gray-100 dark:border-neutral-800 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2.5">
                      <Icons.Layers className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                      <span>{currentLang === 'en' ? 'Scope & Execution Blueprints' : 'à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¬à§à¦²à§à¦ªà§à¦°à¦¿à¦¨à§à¦Ÿ'}</span>
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-neutral-500">
                      {currentLang === 'en' ? 'Choose a structure matching your project volume and milestone speed' : 'à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà§‡à¦° à¦­à¦²à¦¿à¦‰à¦® à¦“ à¦®à¦¾à¦‡à¦²à¦¸à§à¦Ÿà§‹à¦¨à§‡à¦° à¦¸à§à¦ªà¦¿à¦¡ à¦…à¦¨à§à¦¯à¦¾à§Ÿà§€ à¦¸à§‡à¦°à¦¾ à¦•à¦¾à¦ à¦¾à¦®à§‹à¦Ÿà¦¿ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {plans.map((p: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-6 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-blue-600 transition duration-300">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start border-b border-gray-100 dark:border-neutral-800 pb-4">
                            <div>
                              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">{currentLang === 'en' ? p.nameEn : p.nameBn}</h3>
                              <span className="text-[9px] text-blue-600 dark:text-orange-400 font-extrabold uppercase tracking-widest mt-1 block">
                                {currentLang === 'en' ? p.periodEn : p.periodBn}
                              </span>
                            </div>
                          </div>
                          {p.featuresEn && Array.isArray(p.featuresEn) && (
                            <ul className="space-y-3 pt-2">
                              {(currentLang === 'en' ? p.featuresEn : p.featuresBn).map((feat: string, fidx: number) => (
                                <li key={fidx} className="flex items-start space-x-2.5 text-xs text-gray-600 dark:text-neutral-300 dark:text-neutral-600">
                                  <Icons.Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
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
                          {currentLang === 'en' ? 'Select Plan' : 'à¦ªà§à¦²à§à¦¯à¦¾à¦¨à¦Ÿà¦¿ à¦¬à§‡à¦›à§‡ à¦¨à¦¿à¦¨'}
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
                <div className="py-12 border-b border-gray-100 dark:border-neutral-800 space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2.5">
                      <Icons.HelpCircle className="h-5 w-5 text-blue-600 dark:text-orange-400" />
                      <span>{currentLang === 'en' ? 'Frequently Asked Questions' : 'à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦œà¦¿à¦œà§à¦žà¦¾à¦¸à¦¾'}</span>
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-neutral-500">
                      {currentLang === 'en' ? 'Answering specific details for this service' : 'à¦à¦‡ à¦¸à§‡à¦¬à¦¾à¦¸à¦®à§à¦ªà¦°à§à¦•à¦¿à¦¤ à¦•à¦¿à¦›à§ à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦ªà§à¦°à¦¶à§à¦¨à§‹à¦¤à§à¦¤à¦°'}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {sfaqs.map((f: any, idx: number) => (
                      <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 space-y-2.5 shadow-sm text-left">
                        <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center space-x-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                          <span>{currentLang === 'en' ? f.questionEn : f.questionBn}</span>
                        </span>
                        <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed pl-3.5 border-l-2 border-gray-100 dark:border-neutral-800">
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
              className="rounded-xl border border-gray-200 dark:border-neutral-700 px-6 py-3 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-blue-600 dark:text-orange-400 hover:border-blue-600 transition cursor-pointer bg-white dark:bg-[#141414] hover:bg-gray-50 dark:bg-neutral-900"
            >
              {currentLang === 'en' ? 'Return to Capabilities Catalog' : 'à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—à§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨'}
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
    <div id="services-page-root" data-space-page className="bg-white dark:bg-[#141414] min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO SECTION â€” Full Screen */}
      <section id="services-hero" data-space-hero className="relative min-h-[auto] sm:min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0A0908] py-12 sm:py-0">
        {/* Unified background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-[#0A0908] dark:via-[#0F0E0C] dark:to-[#0A0908]" />
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-orange-500/[0.06] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-400/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,74,0,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

            {/* Left Column: Copy & CTA */}
            <div className="space-y-6 sm:space-y-8 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                  {currentLang === 'en' ? 'ONE TRUSTED PARTNER' : 'à¦à¦•à¦Ÿà¦¿ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦°'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
                {currentLang === 'en' ? (
                  <>All Digital Problems.<br /><span className="text-orange-500">One Trusted Solution.</span></>
                ) : (
                  <>à¦¸à¦•à¦² à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦¸à¦®à¦¸à§à¦¯à¦¾à¥¤<br /><span className="text-orange-500">à¦à¦•à¦Ÿà¦¿ à¦¬à¦¿à¦¶à§à¦¬à¦¸à§à¦¤ à¦¸à¦®à¦¾à¦§à¦¾à¦¨à¥¤</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                {currentLang === 'en'
                  ? 'From strategy to execution, we architect complete digital ecosystems. 50+ projects delivered, 100% client retention, and a team of senior engineers who ship revenue â€” not just code.'
                  : 'à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ à¦¥à§‡à¦•à§‡ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à¦¯à¦¼à¦¨ à¦ªà¦°à§à¦¯à¦¨à§à¦¤, à¦†à¦®à¦°à¦¾ à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¤à§ˆà¦°à¦¿ à¦•à¦°à¦¿à¥¤ à§«à§¦+ à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¸à¦®à§à¦ªà¦¨à§à¦¨, à§§à§¦à§¦% à¦•à§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦Ÿ à¦§à¦¾à¦°à¦£ à¦à¦¬à¦‚ à¦¸à¦¿à¦¨à¦¿à¦¯à¦¼à¦° à¦‡à¦žà§à¦œà¦¿à¦¨à¦¿à¦¯à¦¼à¦¾à¦°à¦¦à§‡à¦° à¦à¦•à¦Ÿà¦¿ à¦¦à¦² à¦¯à¦¾à¦°à¦¾ à¦°à¦¾à¦œà¦¸à§à¦¬ à¦¤à§ˆà¦°à¦¿ à¦•à¦°à§‡ â€” à¦¶à§à¦§à§ à¦•à§‹à¦¡ à¦¨à¦¯à¦¼à¥¤'}
              </p>

              <div className="flex flex-wrap gap-6 sm:gap-8 pt-2">
                {[
                  { num: '50+', labelEn: 'Projects Done', labelBn: 'à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿ à¦¸à¦®à§à¦ªà¦¨à§à¦¨' },
                  { num: '100%', labelEn: 'Client Retention', labelBn: 'à¦•à§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦Ÿ à¦§à¦¾à¦°à¦£' },
                  { num: '24/7', labelEn: 'Active Support', labelBn: 'à¦¸à¦•à§à¦°à¦¿à¦¯à¦¼ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ' }
                ].map((s, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="block text-2xl font-black text-orange-500 font-mono">{s.num}</span>
                    <span className="block text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider">{currentLang === 'en' ? s.labelEn : s.labelBn}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-8 py-4 transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Get Free Consultation' : 'à¦«à§à¦°à¦¿ à¦ªà¦°à¦¾à¦®à¦°à§à¦¶ à¦¨à¦¿à¦¨'}
                </button>
                <button
                  onClick={() => { setTab('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-xl border border-gray-200 dark:border-neutral-700 px-8 py-4 text-xs font-bold text-gray-700 dark:text-neutral-200 hover:text-orange-500 hover:border-orange-500/30 bg-transparent transition-all duration-300 cursor-pointer"
                >
                  {currentLang === 'en' ? 'View Our Portfolio' : 'à¦ªà§‹à¦°à§à¦Ÿà¦«à§‹à¦²à¦¿à¦“ à¦¦à§‡à¦–à§à¦¨'}
                </button>
              </div>
            </div>

            {/* Right Column: Logo + Orbiting Services */}
            <div className="relative flex items-center justify-center min-h-[340px] sm:min-h-[440px] lg:min-h-[650px]">

              {/* Responsive orbit wrapper â€” scales down on mobile */}
              <div className="relative w-full h-full scale-[0.52] sm:scale-75 lg:scale-100 origin-center">

                {/* Outer orbit ring â€” 6 services, rotates clockwise */}
                <div className="absolute inset-0 animate-[spin_70s_linear_infinite]">
                  {[
                    { nameEn: 'Web Development', nameBn: 'à¦“à¦¯à¦¼à§‡à¦¬ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ', icon: Icons.Globe, x: 0, y: -280 },
                    { nameEn: 'UI/UX Design', nameBn: 'à¦‡à¦‰à¦†à¦‡/à¦‡à¦‰à¦à¦•à§à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨', icon: Icons.Palette, x: 242.49, y: -140 },
                    { nameEn: 'Video Editing', nameBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦à¦¡à¦¿à¦Ÿà¦¿à¦‚', icon: Icons.Video, x: 242.49, y: 140 },
                    { nameEn: 'App Development', nameBn: 'à¦…à§à¦¯à¦¾à¦ª à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ', icon: Icons.Smartphone, x: 0, y: 280 },
                    { nameEn: 'Graphic Design', nameBn: 'à¦—à§à¦°à¦¾à¦«à¦¿à¦• à¦¡à¦¿à¦œà¦¾à¦‡à¦¨', icon: Icons.PenTool, x: -242.49, y: 140 },
                    { nameEn: 'SEO Strategy', nameBn: 'à¦à¦¸à¦‡à¦“ à¦•à§à¦¯à¦¾à¦®à§à¦ªà§‡à¦‡à¦¨', icon: Icons.Search, x: -242.49, y: -140 },
                  ].map((svc, i) => {
                    const SvcIcon = svc.icon;
                    return (
                      <div
                        key={`outer-${i}`}
                        className="absolute z-10 animate-[spin_70s_linear_infinite_reverse]"
                        style={{ left: `calc(50% + ${svc.x}px - 40px)`, top: `calc(50% + ${svc.y}px - 11px)` }}
                      >
                        <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.06] backdrop-blur-md border border-orange-100 dark:border-white/[0.08] rounded-full px-3.5 py-2 shadow-sm hover:bg-orange-50 dark:hover:bg-orange-500/15 hover:border-orange-300 dark:hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(255,74,0,0.1)] hover:scale-105 transition-all duration-300 cursor-default whitespace-nowrap">
                          <SvcIcon className="h-3 w-3 text-orange-500 dark:text-orange-400 shrink-0" />
                          <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">{currentLang === 'en' ? svc.nameEn : svc.nameBn}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Outer orbit ring visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[560px] h-[560px] rounded-full border border-dashed border-orange-200/40 dark:border-orange-500/8" />
                  </div>
                </div>

                {/* Inner orbit ring â€” 4 services, rotates counter-clockwise */}
                <div className="absolute inset-0 animate-[spin_45s_linear_infinite_reverse]">
                  {[
                    { nameEn: 'Product Innovation', nameBn: 'à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦‡à¦¨à§‹à¦­à§‡à¦¶à¦¨', icon: Icons.Lightbulb, x: 0, y: -155 },
                    { nameEn: 'Creative Content', nameBn: 'à¦•à§à¦°à¦¿à¦¯à¦¼à§‡à¦Ÿà¦¿à¦­ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ', icon: Icons.Film, x: 155, y: 0 },
                    { nameEn: 'Marketing & PR', nameBn: 'à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚ à¦“ à¦ªà¦¿à¦†à¦°', icon: Icons.Megaphone, x: 0, y: 155 },
                    { nameEn: 'AI Services', nameBn: 'à¦à¦†à¦‡ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨', icon: Icons.BrainCircuit, x: -155, y: 0 },
                  ].map((svc, i) => {
                    const SvcIcon = svc.icon;
                    return (
                      <div
                        key={`inner-${i}`}
                        className="absolute z-10 animate-[spin_45s_linear_infinite]"
                        style={{ left: `calc(50% + ${svc.x}px - 48px)`, top: `calc(50% + ${svc.y}px - 13px)` }}
                      >
                        <div className="flex items-center gap-2 bg-orange-50/90 dark:bg-orange-500/10 backdrop-blur-md border border-orange-200 dark:border-orange-500/25 rounded-full px-4 py-2 shadow-md hover:bg-orange-100 dark:hover:bg-orange-500/20 hover:shadow-[0_0_25px_rgba(255,74,0,0.15)] hover:scale-105 transition-all duration-300 cursor-default whitespace-nowrap">
                          <SvcIcon className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
                          <span className="text-[10px] font-extrabold text-orange-700 dark:text-orange-300">{currentLang === 'en' ? svc.nameEn : svc.nameBn}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inner orbit ring visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[310px] h-[310px] rounded-full border border-orange-200/50 dark:border-orange-500/15" />
                  </div>
                </div>

              </div>

              {/* Center logo â€” stays fixed, above everything */}
              <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-orange-500/10 blur-[60px] pointer-events-none -translate-x-[20%] -translate-y-[20%]" />
                <img src="/logo.png" alt="Next Solution" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain block dark:hidden relative z-10 drop-shadow-[0_0_30px_rgba(255,74,0,0.12)]" />
                <img src="/logow.png" alt="Next Solution" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36 object-contain hidden dark:block relative z-10 drop-shadow-[0_0_30px_rgba(255,74,0,0.15)]" />
              </div>

              {/* Glow behind logo */}
              <div className="absolute z-[25] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/[0.08] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute z-[25] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-400/[0.05] rounded-full blur-[60px] pointer-events-none" />
            </div>

          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{currentLang === 'en' ? 'Scroll to explore' : 'à¦à¦•à§à¦¸à¦ªà§à¦²à§‹à¦° à¦•à¦°à¦¤à§‡ à¦¸à§à¦•à§à¦°à¦² à¦•à¦°à§à¦¨'}</span>
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-neutral-600 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>



      {/* 2. SERVICES OVERVIEW GRID (LOADED DYNAMICALLY) */}
      <section id="services-grid-list" className="py-24 border-b border-gray-50 bg-white dark:bg-[#141414]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'OUR CAPABILITIES CATALOG' : 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§‡à¦¬à¦¾ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦²à¦—'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Explore Specific Expertise' : 'à¦¬à¦¿à¦¶à§‡à¦·à¦¾à¦¯à¦¼à¦¿à¦¤ à¦¦à¦•à§à¦·à¦¤à¦¾à¦¸à¦®à§‚à¦¹ à¦…à¦¨à§à¦¬à§‡à¦·à¦£ à¦•à¦°à§à¦¨'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
              {currentLang === 'en' ? (
                'Manageable via active client consoles. Zero hardcoding. Click to access complete deliverable checklists, tech stacks, and plans.'
              ) : (
                'à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨ à¦•à¦¨à¦¸à§‹à¦² à¦¥à§‡à¦•à§‡ à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦ªà¦°à¦¿à¦šà¦¾à¦²à¦¨à¦¾à¦¯à§‹à¦—à§à¦¯à¥¤ à¦•à§‹à¦¨à§‹ à¦¹à¦¾à¦°à§à¦¡à¦•à§‹à¦¡à§‡à¦¡ à¦¡à¦¾à¦Ÿà¦¾ à¦¨à§‡à¦‡à¥¤ à¦ªà§‚à¦°à§à¦£ à¦¬à¦¿à¦¬à¦°à¦£ à¦à¦¬à¦‚ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦ªà§à¦²à§à¦¯à¦¾à¦¨ à¦¦à§‡à¦–à¦¤à§‡ à¦¯à§‡à¦•à§‹à¦¨à§‹ à¦¸à§‡à¦¬à¦¾à¦¯à¦¼ à¦•à§à¦²à¦¿à¦• à¦•à¦°à§à¦¨à¥¤'
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
                className="group cursor-pointer rounded-2xl border border-gray-100 dark:border-neutral-800 bg-[#FAFAFA]/40 p-6 shadow-sm hover:shadow-lg hover:border-blue-600 hover:bg-white dark:bg-[#141414] transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon and Pricing Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 group-hover:text-white transition duration-300 border border-blue-100/50">
                      {getIcon(service.icon)}
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono font-bold bg-blue-50 dark:bg-orange-500/10 border border-blue-100 dark:border-orange-500/20 text-blue-600 dark:text-orange-400 px-1.5 py-0.5 rounded">
                        {currentLang === 'en' ? 'Verified' : 'à¦¯à¦¾à¦šà¦¾à¦‡à¦•à§ƒà¦¤'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-orange-400 transition-colors">
                    {currentLang === 'en' ? service.titleEn : service.titleBn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed line-clamp-3">
                    {currentLang === 'en' ? service.descriptionEn : service.descriptionBn}
                  </p>

                  {/* Key Benefits (Requested Checklist) */}
                  <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-gray-400 dark:text-neutral-500 tracking-wider block">
                      {currentLang === 'en' ? 'Core Benefits' : 'à¦®à§‚à¦² à¦¸à§à¦¬à¦¿à¦§à¦¾ à¦¸à¦®à§‚à¦¹'}
                    </span>
                    <ul className="space-y-1.5">
                      {(currentLang === 'en' ? service.benefitsEn : service.benefitsBn).slice(0, 2).map((b, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[10px] text-gray-500 dark:text-neutral-400 dark:text-neutral-500">
                          <Icons.Check className="h-3 w-3 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learn More Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-orange-400 group-hover:text-blue-700">
                  <span>{currentLang === 'en' ? 'View Details & Plan' : 'à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤ à¦¬à¦¿à¦¬à¦°à¦£ à¦“ à¦ªà§à¦²à§à¦¯à¦¾à¦¨'}</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icons.ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE OUR SERVICES (8 VALUE CARDS) */}
      <section id="services-why-choose" className="py-24 bg-[#FAFAFA] dark:bg-[#0D0C0A] border-b border-gray-100 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'AGENCY PRINCIPLES' : 'à¦à¦œà§‡à¦¨à§à¦¸à¦¿ à¦¨à§€à¦¤à¦¿à¦®à¦¾à¦²à¦¾'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Why Choose Next Solution?' : 'à¦•à§‡à¦¨ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§‡à¦¬à¦¾ à¦¬à§‡à¦›à§‡ à¦¨à§‡à¦¬à§‡à¦¨?'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'We set premium benchmarks in execution. We do not compromise, outsource, or delay.'
              ) : (
                'à¦†à¦®à¦°à¦¾ à¦•à¦¾à¦œ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à§Ÿà¦¨à§‡ à¦ªà§à¦°à¦¿à¦®à¦¿à§Ÿà¦¾à¦® à¦®à¦¾à¦¨à¦¦à¦£à§à¦¡ à¦¨à¦¿à¦°à§à¦§à¦¾à¦°à¦£ à¦•à¦°à¦¿à¥¤ à¦•à§‹à¦¨à§‹ à¦…à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦•à¦¾à¦œ à¦¬à¦¾ à¦¸à¦®à§Ÿà¦•à§à¦·à§‡à¦ªà¦£ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦…à¦­à¦¿à¦§à¦¾à¦¨à§‡ à¦¨à§‡à¦‡à¥¤'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Award',
                color: 'text-blue-600 dark:text-orange-400 bg-blue-50 dark:bg-orange-500/10 border-blue-100/50',
                titleEn: 'Experienced Team',
                titleBn: 'à¦…à¦­à¦¿à¦œà§à¦ž à¦Ÿà¦¿à¦®',
                descEn: 'All products are hand-engineered by senior full-stack developers and product designers.',
                descBn: 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ à¦•à§‹à¦¡ à¦à¦¬à¦‚ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦¤à§ˆà¦°à¦¿ à¦•à¦°à§‡à¦¨ à¦¸à¦¿à¦¨à¦¿à§Ÿà¦° à¦«à§à¦²-à¦¸à§à¦Ÿà§à¦¯à¦¾à¦• à¦¡à§‡à¦­à§‡à¦²à¦ªà¦¾à¦° à¦“ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨à¦¾à¦°à¦°à¦¾à¥¤'
              },
              {
                icon: 'Cpu',
                color: 'text-purple-600 dark:text-purple-400 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 border-purple-100/50',
                titleEn: 'Modern Technologies',
                titleBn: 'à¦†à¦§à§à¦¨à¦¿à¦• à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿',
                descEn: 'Strict typesafe TypeScript, React ecosystem, and optimized serverless cloud configurations.',
                descBn: 'à¦Ÿà¦¾à¦‡à¦ªà¦¸à§‡à¦« à¦Ÿà¦¾à¦‡à¦ªà¦¸à§à¦•à§à¦°à¦¿à¦ªà§à¦Ÿ, à¦°à¦¿à§Ÿà§à¦¯à¦¾à¦•à§à¦Ÿ à¦“ à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦¸ à¦…à¦ªà§à¦Ÿà¦¿à¦®à¦¾à¦‡à¦œà§‡à¦¶à¦¨ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§‡ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦—à¦¤à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤ à¦•à¦°à¦¾à¥¤'
              },
              {
                icon: 'Zap',
                color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100/50',
                titleEn: 'Extreme Performance',
                titleBn: 'à¦šà¦°à¦® à¦ªà¦¾à¦°à¦«à¦°à¦®à§à¦¯à¦¾à¦¨à§à¦¸',
                descEn: 'Ultra-low latency rendering and serverless caching ensuring your pages score 100/100 on Google Lighthouse.',
                descBn: 'à§§à§¦à§¦% à¦—à§à¦—à¦² à¦²à¦¾à¦‡à¦Ÿà¦¹à¦¾à¦‰à¦¸ à¦¸à§à¦•à§‹à¦° à¦à¦¬à¦‚ à¦†à¦²à§à¦Ÿà§à¦°à¦¾-à¦²à§‹ à¦²à§à¦¯à¦¾à¦Ÿà§‡à¦¨à§à¦¸à¦¿ à¦¸à§à¦ªà¦¿à¦¡ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤à¦•à¦°à¦£à¥¤'
              },
              {
                icon: 'Zap',
                color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100/50',
                titleEn: 'Fast Delivery',
                titleBn: 'à¦¦à§à¦°à§à¦¤ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿',
                descEn: 'Rigorous sprint tracking and agile timelines ensuring project milestones launch on schedule.',
                descBn: 'à¦¸à§à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦šà¦¾à¦•à§à¦·à§à¦· à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ à¦“ à¦¸à§à¦ªà§à¦°à¦¿à¦¨à§à¦Ÿ à¦Ÿà§à¦°à§à¦¯à¦¾à¦•à¦¿à¦‚-à¦à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦¸à¦®à§Ÿà¦®à¦¤à§‹ à¦¡à§‡à¦²à¦¿à¦­à¦¾à¦°à¦¿ à¦¨à¦¿à¦¶à§à¦šà¦¿à¦¤à¦•à¦°à¦£à¥¤'
              },
              {
                icon: 'ShieldCheck',
                color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-100/50',
                titleEn: 'Secure Solutions',
                titleBn: 'à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦¸à¦®à¦¾à¦§à¦¾à¦¨',
                descEn: 'Robust middleware security, secure API routing, and full GDPR/HIPAA-ready compliance parameters.',
                descBn: 'à¦®à¦œà¦¬à§à¦¤ à¦®à¦¿à¦¡à¦²à¦“à§Ÿà§à¦¯à¦¾à¦° à¦¸à¦¿à¦•à¦¿à¦‰à¦°à¦¿à¦Ÿà¦¿ à¦à¦¬à¦‚ à¦¡à§‡à¦Ÿà¦¾ à¦¸à§à¦°à¦•à§à¦·à¦¾à§Ÿ à¦¸à¦°à§à¦¬à§‹à¦šà§à¦š à¦¨à¦¿à¦°à¦¾à¦ªà¦¤à§à¦¤à¦¾ à¦“ à¦•à¦®à¦ªà§à¦²à¦¾à¦¯à¦¼à§‡à¦¨à§à¦¸à¥¤'
              },
              {
                icon: 'HeartHandshake',
                color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-100/50',
                titleEn: 'Ongoing Support',
                titleBn: 'à¦¸à¦¾à¦°à§à¦¬à¦•à§à¦·à¦£à¦¿à¦• à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ',
                descEn: 'Committed SLA contracts, regular version upgrades, and direct priority support channels.',
                descBn: 'à¦¬à¦¾à§Žà¦¸à¦°à¦¿à¦• à¦à¦¸à¦à¦²à¦ à¦šà§à¦•à§à¦¤à¦¿, à¦°à§‡à¦—à§à¦²à¦¾à¦° à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦¬à§à¦¯à¦¾à¦•à¦†à¦ª à¦“ à¦¦à§à¦°à§à¦¤ à¦¤à§à¦°à§à¦Ÿà¦¿ à¦¸à¦‚à¦¶à§‹à¦§à¦¨à§‡ à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿà¥¤'
              },
              {
                icon: 'Layers',
                color: 'text-indigo-600 dark:text-orange-400 bg-indigo-50 dark:bg-orange-500/10 border-indigo-100/50',
                titleEn: 'Scalable Architecture',
                titleBn: 'à¦¸à§à¦•à§‡à¦²à§‡à¦¬à¦² à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à¦šà¦¾à¦°',
                descEn: 'Database normalization and decoupling enabling traffic pivots of up to 10x without latency.',
                descBn: 'à¦­à¦¬à¦¿à¦·à§à¦¯à¦¤à§‡ à¦¸à¦¹à¦œà§‡ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦¡à¦¿à¦•à¦¾à¦ªà¦²à¦¡ à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à¦šà¦¾à¦° à¦¯à¦¾ à§§à§¦ à¦—à§à¦£ à¦Ÿà§à¦°à¦¾à¦«à¦¿à¦• à¦²à§‹à¦¡ à¦¨à¦¿à¦¤à§‡ à¦ªà¦¾à¦°à§‡à¥¤'
              },
              {
                icon: 'Smile',
                color: 'text-teal-600 bg-teal-50 border-teal-100/50',
                titleEn: 'Customer Satisfaction',
                titleBn: 'à¦—à§à¦°à¦¾à¦¹à¦• à¦¸à¦¨à§à¦¤à§à¦·à§à¦Ÿà¦¿',
                descEn: 'Comprehensive collaborative Figma feedback loops and 100% intellectual property transfers.',
                descBn: 'à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦¸à¦¹à¦¯à§‹à¦—à¦¿à¦¤à¦¾, à¦¨à¦¿à§Ÿà¦®à¦¿à¦¤ à¦•à¦¾à¦œà§‡à¦° à¦†à¦ªà¦¡à§‡à¦Ÿ à¦ªà§à¦°à¦¦à¦¾à¦¨ à¦“ à¦¶à¦¤à¦­à¦¾à¦— à¦¬à§à¦¦à§à¦§à¦¿à¦¬à§ƒà¦¤à§à¦¤à¦¿à¦• à¦¸à§à¦¬à¦¤à§à¦¬ à¦¹à¦¸à§à¦¤à¦¾à¦¨à§à¦¤à¦°à¥¤'
              }
            ].map((card, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-4 shadow-sm hover:border-blue-600/30 transition duration-300">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${card.color}`}>
                  {getIcon(card.icon, "h-5 w-5")}
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentLang === 'en' ? card.titleEn : card.titleBn}
                </h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  {currentLang === 'en' ? card.descEn : card.descBn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DEVELOPMENT PROCESS (8 INTERACTIVE STEPS) */}
      <section id="services-process" className="py-24 bg-white dark:bg-[#141414] border-b border-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'OUR PIPELINE FRAMEWORK' : 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦•à¦¾à¦œà§‡à¦° à¦ªà¦¾à¦‡à¦ªà¦²à¦¾à¦‡à¦¨'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? '8 Phases to Perfect Release' : 'à¦¨à¦¿à¦–à§à¦à¦¤ à¦ªà§à¦°à¦•à¦¾à¦¶à§‡à¦° à§®à¦Ÿà¦¿ à¦¸à§à¦¤à¦°'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'How we transform ideas from napkin designs into production-ready software systems.'
              ) : (
                'à¦†à¦®à¦°à¦¾ à¦•à§€à¦­à¦¾à¦¬à§‡ à¦†à¦ªà¦¨à¦¾à¦° à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦†à¦‡à¦¡à¦¿à§Ÿà¦¾à¦•à§‡ à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿ-à¦¡à¦®à¦¿à¦¨à§‡à¦Ÿà¦¿à¦‚ à¦¡à¦¿à¦œà¦¿à¦Ÿà¦¾à¦² à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®à§‡ à¦°à§‚à¦ªà¦¾à¦¨à§à¦¤à¦° à¦•à¦°à¦¿à¥¤'
              )}
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: '01', titleEn: 'Consultation', titleBn: 'à¦ªà¦°à¦¾à¦®à¦°à§à¦¶ à¦“ à¦ªà¦°à¦¿à¦šà¦¿à¦¤à¦¿', descEn: 'Direct scoping call with Solutions Architect to understand key business metrics.', descBn: 'à¦¬à§à¦¯à¦¬à¦¸à¦¾à§Ÿà¦¿à¦• à¦²à¦•à§à¦·à§à¦¯ à¦“ à¦•à¦¾à¦°à¦¿à¦—à¦°à¦¿ à¦ªà¦°à¦¿à¦§à¦¿ à¦¬à§à¦à¦¤à§‡ à¦¸à¦²à¦¿à¦‰à¦¶à¦¨ à¦†à¦°à§à¦•à¦¿à¦Ÿà§‡à¦•à§à¦Ÿà§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦†à¦²à§‹à¦šà¦¨à¦¾à¥¤' },
              { step: '02', titleEn: 'Requirement Analysis', titleBn: 'à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§€à§Ÿà¦¤à¦¾ à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£', descEn: 'Surgical software auditing, user stories, and comprehensive data pipeline modeling.', descBn: 'à¦¸à¦«à¦Ÿà¦“à§Ÿà§à¦¯à¦¾à¦° à¦•à§‹à¦¡ à¦…à¦¡à¦¿à¦Ÿ, à¦‡à¦‰à¦œà¦¾à¦° à¦œà¦¾à¦°à§à¦¨à¦¿ à¦¬à¦¿à¦¶à§à¦²à§‡à¦·à¦£ à¦à¦¬à¦‚ à¦¤à¦¥à§à¦¯ à¦ªà§à¦°à¦¬à¦¾à¦¹ à¦¡à¦¾à§Ÿà¦¾à¦—à§à¦°à¦¾à¦® à¦¤à§ˆà¦°à¦¿à¥¤' },
              { step: '03', titleEn: 'Planning & Architecture', titleBn: 'à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾ à¦“ à¦¸à§à¦¥à¦¾à¦ªà¦¤à§à¦¯', descEn: 'Database schema diagrams, system wireframes, and secure API blueprints mapping.', descBn: 'à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦¸ à¦¸à§à¦•à¦¿à¦®à¦¾ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨, à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦°à¦¿à¦¡à¦¾à¦¨à¦¡à§à¦¯à¦¾à¦¨à§à¦¸à¦¿ à¦à¦¬à¦‚ à¦à¦ªà¦¿à¦†à¦‡ à¦¬à§à¦²à§à¦ªà§à¦°à¦¿à¦¨à§à¦Ÿ à¦¤à§ˆà¦°à¦¿à¥¤' },
              { step: '04', titleEn: 'UI/UX Redesign', titleBn: 'à¦‡à¦‰à¦œà¦¾à¦° à¦‡à¦¨à§à¦Ÿà¦¾à¦°à¦«à§‡à¦¸ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨', descEn: 'Creating beautiful high-fidelity component libraries with responsive motion rules.', descBn: 'à¦«à¦¿à¦¡à¦¬à§à¦¯à¦¾à¦• à¦²à§à¦ªà§‡à¦° à¦®à¦¾à¦§à§à¦¯à¦®à§‡ à¦«à¦¿à¦—à¦®à¦¾à¦¤à§‡ à¦šà¦®à§Žà¦•à¦¾à¦° à¦•à¦®à§à¦ªà§‹à¦¨à§‡à¦¨à§à¦Ÿ à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦“ à¦ªà§à¦°à§‹à¦Ÿà§‹à¦Ÿà¦¾à¦‡à¦ªà¦¿à¦‚à¥¤' },
              { step: '05', titleEn: 'Development', titleBn: 'à¦•à§‹à¦¡à¦¿à¦‚ à¦“ à¦¡à§‡à¦­à§‡à¦²à¦ªà¦®à§‡à¦¨à§à¦Ÿ', descEn: 'Strict typesafe production-ready code execution on dedicated Git branches.', descBn: 'à¦¡à§‡à¦¡à¦¿à¦•à§‡à¦Ÿà§‡à¦¡ à¦—à¦¿à¦Ÿ à¦°à¦¿à¦ªà§‹à¦œà¦¿à¦Ÿà¦°à¦¿à¦¤à§‡ à¦Ÿà¦¾à¦‡à¦ªà¦¸à§‡à¦« à¦•à§‹à¦¡ à¦²à§‡à¦–à¦¾ à¦“ à¦¸à¦¾à¦°à§à¦­à¦¾à¦° à¦‡à¦¨à§à¦Ÿà¦¿à¦—à§à¦°à§‡à¦¶à¦¨à¥¤' },
              { step: '06', titleEn: 'Rigorous Testing', titleBn: 'à¦¨à¦¿à¦¬à¦¿à§œ à¦ªà¦°à§€à¦•à§à¦·à¦£ à¦“ à¦Ÿà§‡à¦¸à§à¦Ÿà¦¿à¦‚', descEn: 'Continuous Integration automation, automated unit and user testing routines.', descBn: 'à¦¸à§à¦¬à¦¯à¦¼à¦‚à¦•à§à¦°à¦¿à¦¯à¦¼ à¦‡à¦‰à¦¨à¦¿à¦Ÿ à¦Ÿà§‡à¦¸à§à¦Ÿ à¦à¦¬à¦‚ à¦¸à¦®à§à¦ªà§‚à¦°à§à¦£ à¦‡à¦‰à¦œà¦¾à¦° à¦‡à¦¨à§à¦Ÿà¦¾à¦°à¦«à§‡à¦¸ à¦à¦•à§à¦¸à¦ªà§‡à¦°à¦¿à§Ÿà§‡à¦¨à§à¦¸ à¦Ÿà§‡à¦¸à§à¦Ÿà¦¿à¦‚à¥¤' },
              { step: '07', titleEn: 'Production Deployment', titleBn: 'à¦¡à§‡à¦ªà§à¦²à¦¯à¦¼à¦®à§‡à¦¨à§à¦Ÿ à¦“ à¦ªà§à¦°à¦•à¦¾à¦¶', descEn: 'Secure Cloud orchestration, SSL provisioning, and global DNS routing setups.', descBn: 'à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦•à§à¦²à¦¾à¦‰à¦¡ à¦‡à¦¨à¦«à§à¦°à¦¾à¦¸à§à¦Ÿà§à¦°à¦¾à¦•à¦šà¦¾à¦°à§‡ à¦¡à§‡à¦ªà§à¦²à¦¯à¦¼à¦®à§‡à¦¨à§à¦Ÿ, à¦à¦¸à¦à¦¸à¦à¦² à¦“ à¦¸à¦¿à¦¡à¦¿à¦à¦¨ à¦…à¦ªà§à¦Ÿà¦¿à¦®à¦¾à¦‡à¦œà§‡à¦¶à¦¨à¥¤' },
              { step: '08', titleEn: 'Maintenance & Support', titleBn: 'à¦°à¦•à§à¦·à¦£à¦¾à¦¬à§‡à¦•à§à¦·à¦£ à¦“ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ', descEn: 'Continuous optimization checkups, backups, and proactive security monitoring.', descBn: 'à¦¨à¦¿à¦¯à¦¼à¦®à¦¿à¦¤ à¦¸à¦¿à¦•à¦¿à¦‰à¦°à¦¿à¦Ÿà¦¿ à¦†à¦ªà¦¡à§‡à¦Ÿ, à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦¸ à¦¬à§à¦¯à¦¾à¦•à¦†à¦ª à¦à¦¬à¦‚ à¦ªà§à¦°à§‹à¦…à§à¦¯à¦¾à¦•à§à¦Ÿà¦¿à¦­ à¦®à¦¨à¦¿à¦Ÿà¦°à¦¿à¦‚à¥¤' }
            ].map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-4 shadow-sm relative group hover:border-blue-600 transition duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-100 group-hover:text-blue-600 dark:text-orange-400 transition duration-200">
                    {p.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {currentLang === 'en' ? p.titleEn : p.titleBn}
                </h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  {currentLang === 'en' ? p.descEn : p.descBn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INDUSTRIES WE SERVE (12 ELEGANT CARDS) */}
      <section id="services-industries" className="py-24 bg-[#FAFAFA] dark:bg-[#0D0C0A] border-b border-gray-100 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'MARKET VERTICALS' : 'à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿ à¦­à¦¾à¦°à§à¦Ÿà¦¿à¦•à¦¾à¦² à¦¸à¦®à§‚à¦¹'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Industries We Serve' : 'à¦¯à§‡ à¦¸à¦•à¦² à¦¸à§‡à¦•à§à¦Ÿà¦°à§‡ à¦†à¦®à¦°à¦¾ à¦¸à§‡à¦¬à¦¾ à¦¦à¦¿à¦‡'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'Tailored architectures designed specifically for compliance and user context of individual markets.'
              ) : (
                'à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦¬à¦¾à¦œà¦¾à¦°à§‡à¦° à¦¨à¦¿à§Ÿà¦®à¦•à¦¾à¦¨à§à¦¨ à¦à¦¬à¦‚ à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦°à¦•à¦¾à¦°à§€à¦¦à§‡à¦° à¦…à¦­à¦¿à¦œà§à¦žà¦¤à¦¾à¦° à¦¸à¦¾à¦¥à§‡ à¦¸à¦¾à¦®à¦žà§à¦œà¦¸à§à¦¯à¦ªà§‚à¦°à§à¦£ à¦¬à¦¿à¦¶à§‡à¦·à¦¾à§Ÿà¦¿à¦¤ à¦•à¦¾à¦ à¦¾à¦®à§‹à¥¤'
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ShoppingBag', labelEn: 'E-Commerce', labelBn: 'à¦‡-à¦•à¦®à¦¾à¦°à§à¦¸' },
              { icon: 'Utensils', labelEn: 'Restaurant', labelBn: 'à¦°à§‡à¦¸à§à¦Ÿà§à¦°à§‡à¦¨à§à¦Ÿ à¦“ à¦«à§à¦¡' },
              { icon: 'Heart', labelEn: 'Healthcare', labelBn: 'à¦¹à§‡à¦²à¦¥à¦•à§‡à§Ÿà¦¾à¦° à¦“ à¦®à§‡à¦¡à¦¿à¦¸à¦¿à¦¨' },
              { icon: 'GraduationCap', labelEn: 'Education', labelBn: 'à¦¶à¦¿à¦•à§à¦·à¦¾ à¦“ à¦à¦¡à¦Ÿà§‡à¦•' },
              { icon: 'Home', labelEn: 'Real Estate', labelBn: 'à¦°à¦¿à¦¯à¦¼à§‡à¦² à¦à¦¸à§à¦Ÿà§‡à¦Ÿ' },
              { icon: 'Plane', labelEn: 'Travel & Tourism', labelBn: 'à¦­à§à¦°à¦®à¦£ à¦“ à¦ªà¦°à§à¦¯à¦Ÿà¦¨' },
              { icon: 'Building', labelEn: 'Corporate Enterprises', labelBn: 'à¦•à¦°à§à¦ªà§‹à¦°à§‡à¦Ÿ à¦ªà§à¦°à¦¤à¦¿à¦·à§à¦ à¦¾à¦¨' },
              { icon: 'Rocket', labelEn: 'High-Growth Startups', labelBn: 'à¦¸à§à¦Ÿà¦¾à¦°à§à¦Ÿà¦†à¦ª à¦“ à¦‰à¦¦à§à¦­à¦¾à¦¬à¦¨' },
              { icon: 'Globe', labelEn: 'NGO & Non-Profits', labelBn: 'à¦à¦¨à¦œà¦¿à¦“ à¦“ à¦¸à¦¾à¦®à¦¾à¦œà¦¿à¦• à¦¸à¦‚à¦¸à§à¦¥à¦¾' },
              { icon: 'Factory', labelEn: 'Manufacturing', labelBn: 'à¦‰à§Žà¦ªà¦¾à¦¦à¦¨ à¦“ à¦¶à¦¿à¦²à§à¦ª à¦•à¦¾à¦°à¦–à¦¾à¦¨à¦¾' },
              { icon: 'Briefcase', labelEn: 'Law Firms', labelBn: 'à¦†à¦‡à¦¨à¦œà§€à¦¬à§€ à¦“ à¦«à¦¾à¦°à§à¦®' },
              { icon: 'User', labelEn: 'Personal Brands', labelBn: 'à¦¬à§à¦¯à¦•à§à¦¤à¦¿à¦—à¦¤ à¦¬à§à¦°à§à¦¯à¦¾à¦¨à§à¦¡à¦¿à¦‚' }
            ].map((ind, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 flex items-center space-x-3 shadow-sm hover:border-blue-600/30 transition duration-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100/50">
                  {getIcon(ind.icon, "h-4 w-4")}
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-neutral-200">
                  {currentLang === 'en' ? ind.labelEn : ind.labelBn}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TECHNOLOGIES WE USE (CATEGORIZED TABS) */}
      <section id="services-tech-stack" className="py-24 bg-white dark:bg-[#141414] border-b border-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'OUR STACK ECOSYSTEM' : 'à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿ à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Technology Ecosystem' : 'à¦ªà§à¦°à¦¯à§à¦•à§à¦¤à¦¿ à¦‡à¦•à§‹à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 dark:text-neutral-500 max-w-xl mx-auto leading-relaxed">
              {currentLang === 'en' ? (
                'We write strict typesafe assemblies using industry leading stacks. Zero legacy dependencies.'
              ) : (
                'à¦†à¦®à¦°à¦¾ à¦†à¦§à§à¦¨à¦¿à¦• à¦à¦¬à¦‚ à¦¨à¦¿à¦°à¦¾à¦ªà¦¦ à¦¸à§à¦Ÿà§à¦¯à¦¾à¦• à¦¬à§à¦¯à¦¬à¦¹à¦¾à¦° à¦•à¦°à§‡ à¦Ÿà¦¾à¦‡à¦ªà¦¸à§‡à¦« à¦•à§‹à¦¡ à¦²à¦¿à¦–à§‡ à¦¥à¦¾à¦•à¦¿à¥¤ à¦•à§‹à¦¨à§‹ à¦…à¦ªà§à¦°à§Ÿà§‹à¦œà¦¨à§€à§Ÿ à¦œà¦Ÿà¦¿à¦²à¦¤à¦¾ à¦›à¦¾à§œà¦¾à¦‡à¥¤'
              )}
            </p>
          </div>

          {/* Stack Tab selection */}
          <div className="flex overflow-x-auto items-center gap-2 sm:gap-3 mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
            {[
              { id: 'frontend', labelEn: 'Frontend', labelBn: 'à¦«à§à¦°à¦¨à§à¦Ÿà¦à¦¨à§à¦¡' },
              { id: 'backend', labelEn: 'Backend & Cloud', labelBn: 'à¦¬à§à¦¯à¦¾à¦•à¦à¦¨à§à¦¡ à¦“ à¦•à§à¦²à¦¾à¦‰à¦¡' },
              { id: 'design', labelEn: 'Design Tools', labelBn: 'à¦¡à¦¿à¦œà¦¾à¦‡à¦¨ à¦Ÿà§à¦²à¦¸' },
              { id: 'automation', labelEn: 'AI Services', labelBn: 'à¦à¦†à¦‡ à¦“ à¦…à¦Ÿà§‹à¦®à§‡à¦¶à¦¨' },
              { id: 'video', labelEn: 'Video & Graphics', labelBn: 'à¦­à¦¿à¦¡à¦¿à¦“ à¦“ à¦—à§à¦°à¦¾à¦«à¦¿à¦•à§à¦¸' },
              { id: 'marketing', labelEn: 'Marketing & PR', labelBn: 'à¦®à¦¾à¦°à§à¦•à§‡à¦Ÿà¦¿à¦‚ à¦“ à¦ªà¦¿à¦†à¦°' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTechTab(tab.id as any)}
                className={`rounded-full px-5 py-2 text-xs font-bold border transition ${
                  activeTechTab === tab.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10' 
                    : 'bg-white dark:bg-[#141414] border-gray-100 dark:border-neutral-800 text-gray-500 dark:text-neutral-400 dark:text-neutral-500 hover:text-gray-700 dark:text-neutral-200 hover:border-gray-200 dark:border-neutral-700'
                }`}
              >
                {currentLang === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="bg-[#FAFAFA]/60 dark:bg-[#141414]/60 border border-gray-100 dark:border-neutral-800 rounded-3xl p-5 sm:p-8 max-w-4xl mx-auto">
            {activeTechTab === 'frontend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">React & Next.js Ecosystem</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    We use Vite, React 18/19, and Next.js server component rendering to deliver exceptional load speeds (First Contentful Paint &lt; 0.4s).
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['React 19', 'Next.js', 'Vite', 'Tailwind CSS 4', 'TypeScript', 'Framer Motion', 'Redux Toolkit', 'Zustand', 'D3.js', 'Recharts'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'backend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Cloud Run & Databases</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    Strict RESTful configurations, secure Node.js APIs, database migrations via ORM models, and cloud-hosted data storage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Cloud SQL', 'Firebase Firestore', 'MongoDB', 'Drizzle ORM', 'Redis', 'Docker', 'Google Cloud Run'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'design' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Editorial Figma Redesigns</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    We design responsive design rules, atomic layout components, stylebooks, interactive click triggers, and visual prototypes.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Figma Professional', 'Adobe Illustrator', 'Photoshop', 'Canva Pro', 'Spline 3D', 'Proto.io', 'Bespoke Style Guides'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'automation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">AI Agents & Pipeline Loops</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    Integrating Google Gemini models directly via server proxies, LangChain embeddings, vector search indexes, and n8n workflow loops.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Google Gemini SDK', 'OpenAI API', 'LangChain', 'Pinecone Vector DB', 'n8n pipelines', 'Make.com', 'Airtable Syncs', 'Slack bots', 'Zapier'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'video' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Cinematic Video Ads & Reels</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
                    Storyboards, advanced color grading, motion graphics, audio restoration, and ad integrations to drive click conversions.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['DaVinci Resolve Studio', 'Premiere Pro', 'After Effects', 'CapCut Pro', 'Storyblocks License', 'Getty Images License', 'Professional Sound Design'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTechTab === 'marketing' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                <div className="space-y-2">
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Marketing, PR & Brand Strategy</h4>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
                    Data-driven marketing campaigns, brand positioning, media outreach, performance analytics, and full-funnel growth strategies powered by industry-leading platforms.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {['Google Analytics 4', 'Meta Business Suite', 'SEMrush', 'Ahrefs', 'HubSpot CRM', 'Mailchimp', 'Hootsuite', 'Google Ads', 'Facebook Ads Manager', 'Buffer'].map((t) => (
                    <span key={t} className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-neutral-200 shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. FAQ PREVIEW SECTION */}
      <section id="services-faq-accordion" className="py-24 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'COMMON QUESTIONS' : 'à¦œà¦¿à¦œà§à¦žà¦¾à¦¸à¦¿à¦¤ à¦ªà§à¦°à¦¶à§à¦¨à¦¾à¦¬à¦²à§€'}
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {currentLang === 'en' ? 'Frequently Asked Questions' : 'à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦œà¦¿à¦œà§à¦žà¦¾à¦¸à¦¾à¦¸à¦®à§‚à¦¹'}
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {mainFaqs.map((faq, idx) => {
              const isOpen = activeFAQIndex === idx;
              return (
                <div key={idx} className={`
  rounded-2xl border bg-white dark:bg-[#141414] p-5 cursor-pointer transition duration-300 ${
    isOpen ? 'border-blue-500 shadow-md' : 'border-gray-200/60 hover:border-gray-300 shadow-sm'
  }
`}>
                  <button
                    onClick={() => setActiveFAQIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-blue-600 dark:text-orange-400 transition"
                  >
                    <span>{currentLang === 'en' ? faq.qEn : faq.qBn}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 text-gray-400 dark:text-neutral-500 group-hover:text-blue-600 dark:text-orange-400">
                      {isOpen ? <Icons.Minus className="h-4 w-4 text-blue-600 dark:text-orange-400" /> : <Icons.Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-4">
                      <p className="text-xs md:text-sm leading-relaxed text-gray-600 dark:text-neutral-300 dark:text-neutral-600">
                        {currentLang === 'en' ? faq.aEn : faq.aBn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section id="services-final-cta" className="py-24 bg-white dark:bg-[#141414]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 dark:from-orange-500 to-indigo-600 dark:to-orange-400 p-6 sm:p-8 md:p-14 text-center space-y-4 sm:space-y-6 relative overflow-hidden shadow-xl text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
            
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-100 relative z-10 block">
              {currentLang === 'en' ? 'COLLABORATIVE CODES' : 'à¦¸à¦¹à¦¯à§‹à¦—à¦¿à¦¤à¦¾'}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-black max-w-2xl mx-auto leading-tight relative z-10">
              {currentLang === 'en' ? 'Ready to Scale Your Business Operations?' : 'à¦†à¦ªà¦¨à¦¾à¦° à¦¬à§à¦¯à¦¬à¦¸à¦¾à¦¯à¦¼à¦¿à¦• à¦•à¦¾à¦°à§à¦¯à¦•à§à¦°à¦®à¦•à§‡ à¦†à¦°à¦“ à¦ªà§à¦°à¦¸à¦¾à¦°à¦¿à¦¤ à¦•à¦°à¦¤à§‡ à¦ªà§à¦°à¦¸à§à¦¤à§à¦¤?'}
            </h2>
            
            <p className="text-xs md:text-sm text-blue-100 max-w-md mx-auto relative z-10 leading-relaxed">
              {currentLang === 'en' ? (
                'Talk to a senior partner today to map out user stories, scope budgets, and draft blueprints.'
              ) : (
                'à¦†à¦ªà¦¨à¦¾à¦° à¦ªà§à¦°à¦œà§‡à¦•à§à¦Ÿà§‡à¦° à¦ªà¦°à¦¿à¦•à¦²à§à¦ªà¦¨à¦¾, à¦¬à¦¾à¦œà§‡à¦Ÿ à¦¨à¦¿à¦°à§à¦§à¦¾à¦°à¦£ à¦à¦¬à¦‚ à¦¸à¦«à¦² à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦¾à§Ÿà¦¨à§‡à¦° à¦œà¦¨à§à¦¯ à¦†à¦œà¦‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦°à§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦•à¦¥à¦¾ à¦¬à¦²à§à¦¨à¥¤'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
              <button
                id="cta-get-free-quote"
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl bg-white dark:bg-[#141414] hover:bg-gray-50 dark:bg-neutral-900 text-blue-600 dark:text-orange-400 text-xs font-bold px-6 py-3.5 transition shadow-md hover:scale-[1.01] cursor-pointer"
              >
                {currentLang === 'en' ? 'Start Now' : 'à¦à¦–à¦¨à¦‡ à¦¶à§à¦°à§ à¦•à¦°à§à¦¨'}
              </button>
              <button
                id="cta-contact-us"
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl border border-white/30 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition cursor-pointer"
              >
                {currentLang === 'en' ? 'Contact Us Directly' : 'à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦— à¦•à¦°à§à¦¨'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
