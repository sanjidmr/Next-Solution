"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Printer, Link2, ChevronRight, CornerDownRight, ArrowUp, 
  HelpCircle, Mail, MessageSquare, Check, Calendar, Info, 
  BookOpen, FileText, Download, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { getLegalPolicies } from '@/lib/db';
import { LegalPolicy, LegalSection } from '@/types';

interface LegalDocPageProps {
  currentLang: 'en' | 'bn';
  policyType: 'privacy_policy' | 'terms_conditions' | 'cookie_policy';
  setTab: (tab: string) => void;
}

export default function LegalDocPage({ currentLang, policyType, setTab }: LegalDocPageProps) {
  const [policy, setPolicy] = useState<LegalPolicy | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionsRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // Load matching policy from local storage simulated DB
    const allPolicies = getLegalPolicies();
    const found = allPolicies.find(p => p.type === policyType);
    if (found) {
      setPolicy(found);
      if (found.sections.length > 0) {
        setActiveSectionId(found.sections[0].id);
      }
    }
  }, [policyType]);

  // Read scroll progress, show back to top button and run Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Progress Bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Back To Top visibility
      setShowBackToTop(window.scrollY > 400);

      // 3. Scroll Spy (Active section in Table of Contents)
      if (!policy || policy.sections.length === 0) return;

      const scrollPosition = window.scrollY + 160; // Offset for navbar and headers
      let currentSectionId = policy.sections[0].id;

      for (const section of policy.sections) {
        const element = sectionsRefs.current[section.id];
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            currentSectionId = section.id;
          } else {
            break;
          }
        }
      }

      setActiveSectionId(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial trigger
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [policy]);

  const handleCopyLink = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateReadingTime = (sectionsList: LegalSection[]): number => {
    const totalWords = sectionsList.reduce((acc, sec) => {
      const text = currentLang === 'en' ? sec.contentEn : sec.contentBn;
      return acc + text.split(/\s+/).length;
    }, 0);
    // Average reading speed: 200 words per minute
    return Math.max(1, Math.round(totalWords / 200));
  };

  const scrollToSection = (id: string) => {
    const element = sectionsRefs.current[id];
    if (element) {
      const offset = 100; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSectionId(id);
    }
  };

  if (!policy) {
    return (
      <div className="py-24 text-center font-sans">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Shield className="h-6 w-6 animate-spin" />
          </div>
          <p className="text-sm text-gray-500">Loading document...</p>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(policy.sections);
  const policyTitle = currentLang === 'en' ? policy.titleEn : policy.titleBn;

  return (
    <div id={`legal-page-${policyType}`} className="bg-white min-h-screen pb-24 font-sans relative">
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-blue-600 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Header Area */}
      <div className="border-b border-gray-100 bg-[#FAFAFA]/40 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-1.5 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <button 
              onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-blue-600 transition"
            >
              {currentLang === 'en' ? 'Home' : 'হোম'}
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-400">{currentLang === 'en' ? 'Legal' : 'আইনি'}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-800 font-medium">{policyTitle}</span>
          </nav>

          {/* Title & Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded tracking-wider inline-block">
                {currentLang === 'en' ? `Next Solution Legal ${policy.version}` : `নেক্সট সলিউশন আইনি খসড়া ${policy.version}`}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
                {policyTitle}
              </h1>
              <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                {currentLang === 'en' 
                  ? `Learn how we approach compliance, privacy protections, and user agreements in this comprehensive, legally-reviewed ${policyTitle.toLowerCase()} document.` 
                  : `এই আইনি পত্রে আমাদের ${policyTitle}-এর নিরাপত্তা নীতিমালা, গ্রাহক চুক্তি এবং সম্মতি সংক্রান্ত সকল নিয়মাবলী স্পষ্টভাবে আলোচনা করা হয়েছে।`}
              </p>
            </div>

            {/* Quick Action Info Card */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 text-gray-500">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    {currentLang === 'en' ? 'Effective Date' : 'কার্যকরী তারিখ'}
                  </span>
                  <div className="flex items-center space-x-1.5 text-gray-800 font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>{policy.effectiveDate}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                    {currentLang === 'en' ? 'Reading Time' : 'পড়ার সময়'}
                  </span>
                  <div className="flex items-center space-x-1.5 text-gray-800 font-semibold">
                    <BookOpen className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>{readingTime} {currentLang === 'en' ? 'min read' : 'মিনিট'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-50 flex items-center justify-between gap-3">
                <button
                  id="btn-print-policy"
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center space-x-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-2 px-3 rounded-lg border border-gray-100 transition"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{currentLang === 'en' ? 'Print' : 'প্রিন্ট'}</span>
                </button>

                <button
                  id="btn-copy-link-policy"
                  onClick={handleCopyLink}
                  className={`flex-1 flex items-center justify-center space-x-1.5 font-bold py-2 px-3 rounded-lg border transition ${
                    copied 
                      ? 'bg-green-50 border-green-100 text-green-600' 
                      : 'bg-blue-600 hover:bg-blue-700 border-transparent text-white'
                  }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                  <span>{copied ? (currentLang === 'en' ? 'Copied' : 'কপি হয়েছে') : (currentLang === 'en' ? 'Copy Link' : 'কপি লিঙ্ক')}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Documentation Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDEBAR: Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="space-y-1.5 pb-3 border-b border-gray-100">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  {currentLang === 'en' ? 'DOCUMENT CONTENTS' : 'সূচিপত্র'}
                </span>
                <span className="text-xs text-gray-400 font-medium block">
                  {currentLang === 'en' ? 'Jump to specific section' : 'সরাসরি নির্দিষ্ট বিভাগে যান'}
                </span>
              </div>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                {policy.sections.map((section) => {
                  const isActive = activeSectionId === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-2 text-left text-xs py-2 px-2.5 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 font-bold border-l-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {isActive && <CornerDownRight className="h-3 w-3 text-blue-600 shrink-0" />}
                      <span className="truncate">{currentLang === 'en' ? section.titleEn : section.titleBn}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Version & History Log Info */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-[11px] text-gray-500 leading-normal">
                <div className="flex items-center space-x-1.5 text-gray-800 font-semibold mb-1">
                  <Info className="h-3.5 w-3.5 text-blue-500" />
                  <span>{currentLang === 'en' ? 'Document Info' : 'নথির তথ্য'}</span>
                </div>
                <p><strong>{currentLang === 'en' ? 'Version:' : 'সংস্করণ:'}</strong> {policy.version}</p>
                <p><strong>{currentLang === 'en' ? 'Last Revised:' : 'সর্বশেষ পরিবর্তন:'}</strong> {policy.lastUpdated}</p>
                <p>{currentLang === 'en' 
                  ? 'Subject to update without prior notification. Please review periodic changes.' 
                  : 'পূর্ব ঘোষণা ছাড়াই পরিবর্তন সাপেক্ষ। সময় সময় আপডেট চেক করার অনুরোধ রইল।'}
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: Comprehensive Content Areas */}
          <main className="col-span-1 lg:col-span-9 space-y-12">
            
            {/* Notice banner for legal binding */}
            <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/10 text-xs text-blue-600 flex items-start space-x-2.5 font-sans">
              <Shield className="h-4.5 w-4.5 shrink-0 mt-0.5 text-blue-600" />
              <div>
                <p className="font-bold">
                  {currentLang === 'en' ? 'Legal Binding & Applicability' : 'আইনি বাধ্যবাধকতা ও প্রযোজ্যতা'}
                </p>
                <p className="text-gray-500 mt-1 leading-relaxed">
                  {currentLang === 'en'
                    ? 'By interacting with Next Solution platforms, you explicitly agree to the directives specified in this document. Any unauthorized reproduction of these clauses is strictly prohibited.'
                    : 'নেক্সট সলিউশনের প্ল্যাটফর্ম ব্যবহারের মাধ্যমে আপনি এই পত্রে বর্ণিত সকল নিয়মের প্রতি আপনার সুস্পষ্ট সম্মতি প্রদান করছেন। আইনি অনুমোদন ছাড়া এর অনুলিপি কপি করা আইনত দণ্ডনীয়।'}
                </p>
              </div>
            </div>

            {/* Render dynamically populated sections */}
            <div className="space-y-10">
              {policy.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => { sectionsRefs.current[section.id] = el; }}
                  className="scroll-mt-24 space-y-4"
                >
                  <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full"></div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-sans tracking-tight">
                      {currentLang === 'en' ? section.titleEn : section.titleBn}
                    </h2>
                  </div>

                  {/* Render content paragraphs correctly */}
                  <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
                    {currentLang === 'en' ? section.contentEn : section.contentBn}
                  </div>
                </section>
              ))}
            </div>

            {/* Need Help? Contact Legal Team Block */}
            <div id="legal-contact-block" className="mt-16 border border-gray-100 rounded-3xl bg-[#FAFAFA] p-8 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <HelpCircle className="h-5 w-5 shrink-0" />
                    <span className="text-xs uppercase font-bold tracking-wider">
                      {currentLang === 'en' ? 'Need help?' : 'সাহায্য প্রয়োজন?'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">
                    {currentLang === 'en' ? 'Contact our Legal Team' : 'আমাদের লিগ্যাল টিমের সাথে যোগাযোগ করুন'}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
                    {currentLang === 'en'
                      ? 'Our solutions architects and regulatory attorneys are happy to help clarify any clauses or draft tailored enterprise agreements.'
                      : 'আমাদের আইনি দল এবং সলিউশন আর্কিটেক্টরা যেকোনো ধারা বা কাস্টম চুক্তিনামার বিষয়ে আপনার প্রশ্নের উত্তর দিতে প্রস্তুত।'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto text-xs shrink-0">
                  <button
                    onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex-1 md:flex-none inline-flex items-center justify-center space-x-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 transition shadow-sm hover:scale-[1.01]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{currentLang === 'en' ? 'Contact Us' : 'যোগাযোগ করুন'}</span>
                  </button>

                  <a
                    href="mailto:legal@nextsolution.co"
                    className="flex-1 md:flex-none inline-flex items-center justify-center space-x-1.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-5 border border-gray-200 transition text-center"
                  >
                    <Mail className="h-4 w-4 text-blue-500 animate-pulse" />
                    <span>{currentLang === 'en' ? 'Send Email' : 'ইমেল করুন'}</span>
                  </a>
                </div>
              </div>

              {/* Secure verification stamp */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span>{currentLang === 'en' ? 'Verified GDPR, CCPA & local legal compliance' : 'GDPR, CCPA এবং স্থানীয় আইন দ্বারা অনুমোদিত'}</span>
                <span className="flex items-center space-x-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>{currentLang === 'en' ? 'SSL Secured Sandbox' : 'এসএসএল সুরক্ষিত'}</span>
                </span>
              </div>
            </div>

          </main>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          id="btn-back-to-top-legal"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-white hover:bg-gray-50 text-gray-500 hover:text-blue-600 rounded-full shadow-lg border border-gray-100 transition z-40 hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

    </div>
  );
}
