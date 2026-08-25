"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Layers, 
  FileText, 
  ChevronDown, 
  Star, 
  Clock, 
  Upload, 
  Flame, 
  Zap, 
  Award, 
  Briefcase, 
  AlertCircle,
  Lock,
  Palette,
  Video,
  Megaphone,
  Brain,
  Code,
  Tag,
  Diamond,
  Target
} from 'lucide-react';
import { translations } from '@/data/translations';
import { 
  getPricingPackages, 
  getPricingAddons, 
  getPricingComparisons, 
  addPricingQuote,
  getFAQs,
  getTestimonials,
  getCurrencies,
  getCurrencySettings
} from '@/lib/db';
import { PricingPackage, PricingAddon, FAQ, Testimonial, Currency, CurrencySettings } from '@/types';

interface PricingSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

export default function PricingSection({ currentLang, setTab, isFullPage = false }: PricingSectionProps) {
  const t = translations[currentLang];
  const [billingPeriod, setBillingPeriod] = useState<'project' | 'monthly'>('project');
  const [valueTab, setValueTab] = useState<'mvp' | 'saas' | 'enterprise'>('mvp');
  const [activeSpectrum, setActiveSpectrum] = useState<'all' | 'design' | 'dev' | 'video' | 'marketing' | 'ai'>('all');

  const handleSpectrumSelect = (service: 'all' | 'design' | 'dev' | 'video' | 'marketing' | 'ai') => {
    setActiveSpectrum(service);
    if (service === 'design') {
      setValueTab('mvp');
    } else if (service === 'dev' || service === 'video' || service === 'marketing') {
      setValueTab('saas');
    } else if (service === 'ai') {
      setValueTab('enterprise');
    }
  };

  // Load Currencies
  const currencies = useMemo(() => getCurrencies().filter(c => c.enabled !== false).sort((a, b) => a.sortOrder - b.sortOrder), []);
  const currencySettings = useMemo(() => getCurrencySettings(), []);

  // Selected Currency State
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(() => {
    const storedCode = getLocalItem('next_solution_selected_currency_code');
    const allCurrs = getCurrencies().filter(c => c.enabled !== false).sort((a, b) => a.sortOrder - b.sortOrder);
    if (storedCode) {
      const found = allCurrs.find(c => c.code === storedCode);
      if (found) return found;
    }
    const settings = getCurrencySettings();
    const defaultCode = settings.defaultCurrencyCode || 'USD';
    const defaultCurr = allCurrs.find(c => c.code === defaultCode);
    if (defaultCurr) return defaultCurr;

    if (allCurrs.length > 0) return allCurrs[0];

    return {
      id: 'default-usd',
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      flag: '🇺🇸',
      exchangeRate: 1.0,
      enabled: true,
      isDefault: true,
      sortOrder: 0
    };
  });

  // Live Exchange Rates
  const [liveRates, setLiveRates] = useState<Record<string, number>>({});

  useEffect(() => {
    if (currencySettings.enableLiveRates) {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
          if (data && data.rates) {
            setLiveRates(data.rates);
          }
        })
        .catch(err => console.warn('Could not fetch live exchange rates:', err));
    }
  }, [currencySettings.enableLiveRates]);

  const activeExchangeRate = useMemo(() => {
    if (!selectedCurrency) return 1.0;
    if (currencySettings.enableLiveRates && liveRates[selectedCurrency.code]) {
      return liveRates[selectedCurrency.code];
    }
    return selectedCurrency.exchangeRate;
  }, [selectedCurrency, liveRates, currencySettings.enableLiveRates]);

  // Save selected currency
  const handleCurrencyChange = (curr: Currency) => {
    setSelectedCurrency(curr);
    setLocalItem('next_solution_selected_currency_code', curr.code);
  };

  // Helper to format prices
  const formatPrice = (usdAmount: number) => {
    if (!selectedCurrency) return `$${usdAmount.toLocaleString()}`;
    const rate = activeExchangeRate;
    const amount = usdAmount * rate;
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: currencySettings.decimalPrecision ?? 0,
      maximumFractionDigits: currencySettings.decimalPrecision ?? 0,
    });
    return `${selectedCurrency.symbol}${formattedAmount}`;
  };

  // Helper to format addon price strings
  const formatAddonPrice = (addonPriceStr: string) => {
    const match = addonPriceStr.match(/\$(\d+)/);
    if (match && match[1]) {
      const usdAmount = parseInt(match[1], 10);
      const converted = formatPrice(usdAmount);
      return addonPriceStr.replace(/\$\d+/, converted);
    }
    return addonPriceStr;
  };
  
  // DB States
  const allPackages = useMemo(() => getPricingPackages(), []);
  const allAddons = useMemo(() => getPricingAddons(), []);
  const allComparisons = useMemo(() => getPricingComparisons(), []);
  const faqs = useMemo(() => {
    const list = getFAQs();
    // Prioritize pricing FAQs
    return list.filter(f => 
      f.categoryEn.toLowerCase().includes('pricing') || 
      f.categoryEn.toLowerCase().includes('service') ||
      f.categoryBn.includes('প্রাইসিং')
    ).slice(0, 5);
  }, []);
  const testimonials = useMemo(() => getTestimonials().slice(0, 3), []);

  // Filter Categories
  const categories = [
    { key: 'Agency Packages', labelEn: 'All Works', labelBn: 'সব কাজ' },
    { key: 'Web Development', labelEn: 'Web Development', labelBn: 'ওয়েব ডেভেলপমেন্ট' },
    { key: 'Mobile App', labelEn: 'Mobile App', labelBn: 'মোবাইল অ্যাপ' },
    { key: 'UI/UX Design', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স ডিজাইন' },
    { key: 'Graphic Design', labelEn: 'Graphic Design', labelBn: 'গ্রাফিক ডিজাইন' },
    { key: 'Video Editing', labelEn: 'Video Editing', labelBn: 'ভিডিও এডিটিং' },
    { key: 'Digital Marketing', labelEn: 'Digital Marketing', labelBn: 'ডিজিটাল মার্কেটিং' },
    { key: 'AI Automation', labelEn: 'AI Automation', labelBn: 'এআই অটোমেশন' },
    { key: 'SEO', labelEn: 'SEO', labelBn: 'এসইও' }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('Agency Packages');

  // Filter Packages
  const activePackages = useMemo(() => {
    return allPackages
      .filter(p => p.category === selectedCategory && p.enabled !== false)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [allPackages, selectedCategory]);

  // Dynamic Calculator States
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [calculatorBasePlan, setCalculatorBasePlan] = useState<string>('agency-business');

  const selectedBasePackage = useMemo(() => {
    return allPackages.find(p => p.id === calculatorBasePlan);
  }, [allPackages, calculatorBasePlan]);

  const calculatedTotal = useMemo(() => {
    if (!selectedBasePackage) return 0;
    const basePrice = billingPeriod === 'project' ? selectedBasePackage.priceYearly : selectedBasePackage.priceMonthly;
    
    let addonsCost = 0;
    selectedAddonIds.forEach(id => {
      const addon = allAddons.find(a => a.id === id);
      if (addon) {
        // Parse numerical price from addon price string like "$150 / page" or "$299 / month"
        const match = addon.price.match(/\$(\d+)/);
        if (match && match[1]) {
          addonsCost += parseInt(match[1], 10);
        }
      }
    });

    return basePrice + addonsCost;
  }, [selectedBasePackage, selectedAddonIds, allAddons, billingPeriod]);

  // Quote Request Form States
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    service: 'Web App',
    budget: '$10,000 - $25,000',
    timeline: '2-3 months',
    description: '',
    attachmentName: '',
    attachmentData: ''
  });

  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  // Active FAQ state
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // CTA Package Pick
  const handleSelectPlan = (pkg: PricingPackage) => {
    const periodStr = billingPeriod === 'project' ? 'Project Basis' : 'Monthly Billing';
    const localizedName = currentLang === 'en' ? pkg.nameEn : pkg.nameBn;
    const localizedPrice = billingPeriod === 'project' ? pkg.priceYearly : pkg.priceMonthly;
    
    // Autofill quote form with chosen package
    setQuoteForm(prev => ({
      ...prev,
      service: pkg.category,
      budget: `${formatPrice(localizedPrice)} / month (${periodStr})`,
      description: `Hi Next Solution, I am highly interested in the "${localizedName}" package under the "${pkg.category}" category.`
    }));

    // Scroll to Custom Quote Request section smoothly
    const element = document.getElementById('quote-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle addon helper
  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  // Mock File Upload (Transforms to base64 for localstorage persistence safely)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(currentLang === 'en' ? 'File is too large. Max size is 2MB.' : 'ফাইলটি অনেক বড়। সর্বোচ্চ ২ মেগাবাইট ফাইল আপলোড করতে পারবেন।');
        return;
      }
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuoteForm(prev => ({
          ...prev,
          attachmentName: file.name,
          attachmentData: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submit handler
  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email || !quoteForm.description) {
      setErrorMessage(currentLang === 'en' ? 'Please fill out all required fields.' : 'দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }

    setSubmittingQuote(true);
    setErrorMessage('');

    setTimeout(() => {
      try {
        addPricingQuote({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          company: quoteForm.company,
          industry: quoteForm.industry,
          service: quoteForm.service,
          budget: quoteForm.budget,
          timeline: quoteForm.timeline,
          description: quoteForm.description,
          attachmentName: quoteForm.attachmentName || undefined,
          attachmentData: quoteForm.attachmentData || undefined
        });

        setSubmitSuccess(true);
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          industry: '',
          service: 'Web App',
          budget: '$10,000 - $25,000',
          timeline: '2-3 months',
          description: '',
          attachmentName: '',
          attachmentData: ''
        });
        setSelectedFileName('');
      } catch (err) {
        console.error(err);
        setErrorMessage(currentLang === 'en' ? 'An unexpected error occurred. Please try again.' : 'একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      } finally {
        setSubmittingQuote(false);
      }
    }, 1200);
  };

  return (
    <section id="pricing-page-root" className={`bg-neutral-50/60 selection:bg-blue-600 selection:text-white ${isFullPage ? 'pt-0 pb-20' : 'py-20'}`}>
      
      {/* 1. HERO SECTION — Big Impact. Small Investment. */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050607]">
        {/* Dark atmospheric layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050607] via-[#0a0b0d] to-[#08090b]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_70%_50%,rgba(255,102,0,0.06),transparent)]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.08),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.03),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

            {/* LEFT SIDE — Content */}
            <div className="space-y-6 md:space-y-7 lg:pr-8">

              {/* Label pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    {currentLang === 'en' ? 'PRICING & PACKAGES' : 'মূল্য ও প্যাকেজ'}
                  </span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-1"
              >
                <h1 className="font-sans text-[clamp(2.8rem,5.5vw,5.2rem)] font-black leading-[1.05] tracking-tight text-white">
                  {currentLang === 'en' ? 'Big Impact.' : 'বড় প্রভাব।'}
                  <br />
                  <span className="text-white">
                    {currentLang === 'en' ? 'Small ' : 'ছোট '}
                  </span>
                  <span className="text-orange-500">
                    {currentLang === 'en' ? 'Investment.' : 'বিনিয়োগ।'}
                  </span>
                </h1>
                {/* Hand-drawn underline SVG */}
                <svg className="w-48 md:w-56 h-4 mt-1 text-orange-500" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8 C30 2, 60 2, 100 6 S160 10, 198 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg"
              >
                {currentLang === 'en'
                  ? 'Premium digital solutions that deliver maximum results without stretching your budget.'
                  : 'আপনার বাজেট না বাড়িয়ে সর্বোচ্চ ফলাফল প্রদানকারী প্রিমিয়াম ডিজিটাল সমাধান।'}
              </motion.p>

              {/* Three Value Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="grid grid-cols-3 gap-0 max-w-lg"
              >
                {/* Affordable Pricing */}
                <div className="flex flex-col items-start pr-5 relative">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Tag className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {currentLang === 'en' ? 'Affordable' : 'সাশ্রয়ী'}
                    <br />
                    {currentLang === 'en' ? 'Pricing' : 'মূল্য'}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {currentLang === 'en' ? 'Plans that fit your budget perfectly.' : 'আপনার বাজেটে ফিটিং প্ল্যান।'}
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
                </div>

                {/* Best Value */}
                <div className="flex flex-col items-start px-5 relative">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Diamond className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {currentLang === 'en' ? 'Best' : 'সেরা'}
                    <br />
                    {currentLang === 'en' ? 'Value' : 'মূল্য'}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {currentLang === 'en' ? 'Top quality service at the best price.' : 'সেরা দামে সেরা সেবা।'}
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
                </div>

                {/* Max Results */}
                <div className="flex flex-col items-start pl-5">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Target className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {currentLang === 'en' ? 'Max' : 'সর্বোচ্চ'}
                    <br />
                    {currentLang === 'en' ? 'Results' : 'ফলাফল'}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {currentLang === 'en' ? 'Real, measurable growth focus.' : 'প্রকৃত, পরিমাপযোগ্য বৃদ্ধি।'}
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap gap-3 pt-1"
              >
                <button
                  onClick={() => {
                    document.getElementById('pricing-plans-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center space-x-2"
                >
                  <span>{currentLang === 'en' ? 'View Pricing Plans' : 'প্রাইসিং প্ল্যান দেখুন'}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('pricing-matrix-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-xl border border-orange-500/30 bg-transparent hover:bg-orange-500/5 px-7 py-4 text-sm font-bold text-white hover:text-orange-400 transition-all duration-300 cursor-pointer flex items-center space-x-2"
                >
                  <span>{currentLang === 'en' ? 'Compare Plans' : 'প্ল্যান তুলনা করুন'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>

            {/* RIGHT SIDE — price.png Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              {/* Atmospheric orange glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.12),transparent_70%)] blur-2xl" />
              </div>

{/* Handwritten text top-right - moved higher */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 right-4 md:right-8 lg:right-0 z-20 select-none"
              >
                <div className="relative">
                  <span className="font-['Caveat',cursive] text-lg md:text-xl text-white italic leading-tight block">
                    {currentLang === 'en' ? 'Best Results' : 'সেরা ফলাফল'}
                    <br />
                    {currentLang === 'en' ? 'Lower Cost' : 'কম খরচ'}
                  </span>
                  {/* Orange underline */}
                  <svg className="w-28 h-3 mt-0.5 text-orange-500" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6 C20 2, 50 2, 80 6 S100 8, 118 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {/* Curved arrow pointing down */}
                  <svg className="w-10 h-10 text-orange-500/60 -mt-1 ml-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4 C10 4, 15 20, 20 28 S28 36, 30 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M26 30 L30 34 L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </motion.div>

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <img
                  src="/price.png"
                  alt="Smart Pricing - Low Cost, High Impact"
                  className="w-full max-w-[600px] lg:max-w-[750px] xl:max-w-[860px] h-auto object-contain"
                />
              </motion.div>

              {/* Bottom-right badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute bottom-8 right-0 md:bottom-12 md:right-0 z-20"
              >
                <div className="flex items-center space-x-2 rounded-xl border border-orange-500/20 bg-[#0a0b0d]/80 backdrop-blur-md px-3.5 py-3.5 shadow-xl shadow-black/30">
                  <Zap className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  <span className="text-[11px] md:text-[12px] font-bold text-neutral-300 leading-tight">
                    {currentLang === 'en' ? 'Maximum Results, Minimum Budget.' : 'সর্বোচ্চ ফলাফল, ন্যূনতম বাজেট।'}
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050607] to-transparent pointer-events-none" />
      </section>
      {/* 2. ALL-IN-ONE & SERVICE PRICING MODULE */}
      <div id="pricing-plans-grid-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Billing and Categories Switchers */}
        <div className="flex flex-col space-y-10 items-center text-center">
          
          <div className="space-y-4 max-w-3xl">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50 dark:bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20">
              {currentLang === 'en' ? '💎 Flexible Pricing' : '💎 নমনীয় প্রাইসিং'}
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
              {currentLang === 'en' ? 'Predictable Packages for Scalable Growth' : 'পরিকল্পিত প্যাকেজ ও সহজ স্কেলিং'}
            </h2>
            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              {currentLang === 'en' 
                ? 'Choose the perfect package for your business today and easily upgrade as your business grows.'
                : 'আজই আপনার ব্যবসার জন্য নিখুঁত প্যাকেজ বেছে নিন এবং ব্যবসা বৃদ্ধির সাথে সাথে সহজেই আপগ্রেড করুন।'}
            </p>
          </div>

          {/* Currency Switcher */}
          {currencies.length > 0 && (
            <div className="flex flex-col items-center space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                {currentLang === 'en' ? 'Select Preferred Currency' : 'পছন্দসই কারেন্সি সিলেক্ট করুন'}
              </span>
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 rounded-2xl p-1.5 shadow-sm">
                {currencies.map((curr) => {
                  const isSelected = selectedCurrency?.code === curr.code;
                  return (
                    <button
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr)}
                      className={`relative px-4 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10 scale-100'
                          : 'text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 hover:bg-neutral-50 dark:bg-neutral-900 hover:text-neutral-950'
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
            </div>
          )}

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center space-x-1 bg-white dark:bg-[#141414] border border-neutral-100 dark:border-neutral-800 rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => setBillingPeriod('project')}
              className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                billingPeriod === 'project'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>{currentLang === 'en' ? 'Project Basis' : 'প্রজেক্ট ভিত্তিক'}</span>
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{currentLang === 'en' ? 'Monthly' : 'মাসিক'}</span>
            </button>
          </div>

          {/* Category Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mt-4">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4.5 py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10 scale-100'
                      : 'bg-white dark:bg-[#141414] text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:bg-neutral-900 hover:text-neutral-950'
                  }`}
                >
                  {currentLang === 'en' ? cat.labelEn : cat.labelBn}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-12">
              {activePackages.map((pkg, idx) => {
                const price = billingPeriod === 'project' ? pkg.priceYearly : pkg.priceMonthly;
                const pkgName = currentLang === 'en' ? pkg.nameEn : pkg.nameBn;
                
                // Determine package tier based on index or popular status
                const isStarter = idx === 0;
                const isPro = idx === 1 || pkg.popular;
                const isEnterprise = idx === 2;

                // Use admin-editable fields or sensible defaults
                const deliveryTime = pkg.deliveryTimeEn
                  ? (currentLang === 'en' ? pkg.deliveryTimeEn : pkg.deliveryTimeBn || pkg.deliveryTimeEn)
                  : (currentLang === 'en' ? '7-30 Days Delivery' : '৭-৩০ দিন ডেলিভারি');

                const supportPeriod = pkg.supportPeriodEn
                  ? (currentLang === 'en' ? pkg.supportPeriodEn : pkg.supportPeriodBn || pkg.supportPeriodEn)
                  : (currentLang === 'en' ? '1 Month Support' : '১ মাস সাপোর্ট');

                const perfectFor = pkg.perfectForEn
                  ? (currentLang === 'en' ? pkg.perfectForEn : pkg.perfectForBn || pkg.perfectForEn)
                  : (currentLang === 'en' ? 'Perfect for all businesses' : 'সব ব্যবসার জন্য আদর্শ');

                const moneyBack = isEnterprise 
                  ? (currentLang === 'en' ? '100% Satisfaction Guarantee' : '১০০% সন্তুষ্টির নিশ্চয়তা')
                  : (currentLang === 'en' ? '14-Day Money-Back Guarantee' : '১৪ দিনের মানি-ব্যাক গ্যারান্টি');

                const badgeText = isPro 
                  ? (currentLang === 'en' ? '🔥 MOST POPULAR' : '🔥 সবচেয়ে জনপ্রিয়')
                  : isEnterprise 
                    ? (currentLang === 'en' ? '👑 ENTERPRISE CHOICE' : '👑 এন্টারপ্রাইজ চয়েস')
                    : (currentLang === 'en' ? '💎 RECOMMENDED' : '💎 রিকমেন্ডেড');

                const icon = isStarter 
                  ? <Zap className="h-6 w-6 text-indigo-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  : isPro 
                    ? <Flame className="h-6 w-6 text-amber-500 dark:text-amber-400 shrink-0 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                    : <Award className="h-6 w-6 text-emerald-500 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />;

                const buttonText = isStarter 
                  ? (currentLang === 'en' ? 'Start Your Project' : 'প্রজেক্ট শুরু করুন')
                  : isPro 
                    ? (currentLang === 'en' ? 'Get Started' : 'শুরু করুন')
                    : (currentLang === 'en' ? 'Book Consultation' : 'কনসালটেশন বুক করুন');

                return (
                  <motion.div
                    key={pkg.id}
                    id={`package-card-${pkg.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: isPro ? 1.05 : 1.02 }}
                    className={`group relative rounded-2xl bg-white dark:bg-[#141414] border p-5 md:p-6 flex flex-col justify-between transition-all duration-300 ${
                      isPro
                        ? 'border-blue-600/80 ring-2 ring-blue-600/20 shadow-2xl shadow-blue-600/10 scale-100 lg:scale-[1.04] z-10'
                        : 'border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    {/* Popular/Premium Badge */}
                    {isPro ? (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 dark:from-orange-500 to-indigo-600 dark:to-orange-400 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 dark:shadow-orange-500/20">
                        {badgeText}
                      </span>
                    ) : (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-neutral-600 dark:text-neutral-300 dark:text-neutral-600">
                        {badgeText}
                      </span>
                    )}

                    <div className="space-y-4">
                      {/* Badge and Icon header */}
                      <div className="flex items-start justify-between">
                        <div className="rounded-xl bg-neutral-50 dark:bg-neutral-900 p-2.5 border border-neutral-100 dark:border-neutral-800 group-hover:bg-blue-50/5 dark:bg-orange-500/50 group-hover:border-blue-100 dark:border-orange-500/20 transition-colors duration-300">
                          {icon}
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[9px] font-bold text-neutral-800 dark:text-neutral-100">
                            {currentLang === 'en' ? pkg.badgeEn || 'Verified Plan' : pkg.badgeBn || 'যাচাইকৃত প্ল্যান'}
                          </span>
                          {pkg.techEn && (
                            <span className="block text-[8px] font-mono text-neutral-400 dark:text-neutral-500 font-semibold max-w-[120px] truncate mt-1">
                              {pkg.techEn}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Head info */}
                      <div className="space-y-1">
                        <h3 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:text-orange-400 transition-colors duration-200">
                          {pkgName}
                        </h3>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed min-h-[32px]">
                          {currentLang === 'en' ? pkg.descriptionEn : pkg.descriptionBn}
                        </p>
                      </div>

                      {/* Perfect For Subtext */}
                      <div className="text-[10px] font-bold text-blue-600/90 uppercase tracking-wider bg-blue-50/40 dark:bg-orange-500/5 border border-blue-100/30 rounded-lg px-2.5 py-1.5 inline-block">
                        {perfectFor}
                      </div>

                      {/* Pricing block */}
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-1">
                          <div className="flex flex-col items-baseline">
                          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-0.5">
                            {currentLang === 'en' ? 'Starting From' : 'শুরুমাত্র'}
                          </span>
                          <div className="flex items-baseline">
                            <span className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                              {formatPrice(price)}
                            </span>
                            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 ml-1.5">
                              {billingPeriod === 'monthly' ? (currentLang === 'en' ? '/mo' : '/মাস') : ''}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 mt-1 uppercase tracking-widest font-mono">
                            {billingPeriod === 'monthly'
                              ? (currentLang === 'en' ? 'Monthly Billing' : 'মাসিক বিলিং')
                              : (currentLang === 'en' ? 'One-time Project' : 'এককালীন প্রজেক্ট')
                            }
                          </span>
                        </div>
                      </div>

                      {/* Delivery and Support meta cards */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-1.5 text-center">
                          <span className="block text-[7px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                            {currentLang === 'en' ? 'Delivery' : 'ডেলিভারি'}
                          </span>
                          <span className="text-[9px] font-extrabold text-neutral-800 dark:text-neutral-100 font-mono">
                            {deliveryTime}
                          </span>
                        </div>
                        <div className="rounded-lg border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-1.5 text-center">
                          <span className="block text-[7px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                            {currentLang === 'en' ? 'Support' : 'সাপোর্ট'}
                          </span>
                          <span className="text-[9px] font-extrabold text-neutral-800 dark:text-neutral-100 font-mono">
                            {supportPeriod}
                          </span>
                        </div>
                      </div>

                      {/* Feature list */}
                      <div className="space-y-2 pt-1">
                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                          {currentLang === 'en' ? "Key Capabilities" : 'প্রধান সুবিধাসমূহ'}
                        </span>

                        <ul className="space-y-1.5 text-xs">
                          {(currentLang === 'en' ? pkg.featuresEn : pkg.featuresBn).map((feature, idx) => (
                            <li key={idx} className="group/item relative flex items-start space-x-2 hover:text-blue-600 dark:text-orange-400 transition-colors py-0">
                              <div className="rounded-full bg-blue-50 dark:bg-orange-500/10 p-0.5 text-blue-600 dark:text-orange-400 group-hover/item:bg-blue-100 dark:bg-orange-500/15 group-hover/item:scale-110 transition-all duration-200 mt-0.5 shrink-0">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="leading-tight text-neutral-700 dark:text-neutral-200 group-hover/item:text-neutral-900 dark:text-white transition-colors font-medium">
                                {feature}
                              </span>
                              {/* Simple CSS-based Micro Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-40 scale-0 rounded bg-neutral-900 p-1.5 text-[9px] text-white transition-all duration-200 group-hover/item:scale-100 z-30 shadow-xl pointer-events-none text-center leading-normal">
                                {currentLang === 'en' ? 'Verified inclusion' : 'যাচাইকৃত অন্তর্ভুক্ত'}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-neutral-900" />
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Not Included Section if available */}
                        {pkg.notIncludedEn && pkg.notIncludedEn.length > 0 && (
                          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                            <ul className="space-y-2 text-xs text-neutral-400 dark:text-neutral-500">
                              {(currentLang === 'en' ? pkg.notIncludedEn : pkg.notIncludedBn || []).map((not, idx) => (
                                <li key={idx} className="flex items-start space-x-2.5 line-through">
                                  <span className="text-neutral-300 dark:text-neutral-600 font-bold text-sm shrink-0 leading-none">×</span>
                                  <span className="leading-tight">{not}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-4">
                      {/* Choose CTA */}
                      <button
                        onClick={() => handleSelectPlan(pkg)}
                        className={`w-full rounded-xl py-3 text-center text-xs font-bold transition duration-300 border cursor-pointer relative overflow-hidden flex items-center justify-center space-x-2 ${
                          isPro
                            ? 'bg-gradient-to-r from-blue-600 dark:from-orange-500 to-indigo-600 dark:to-orange-400 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-600/10 border-transparent hover:shadow-blue-600/20'
                            : 'bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950'
                        }`}
                      >
                        <span>{pkg.ctaEn ? (currentLang === 'en' ? pkg.ctaEn : pkg.ctaBn) : buttonText}</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Money back Badge */}
                      <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 font-mono">
                        <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>{moneyBack}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          {/* Trust Elements row */}
          <div className="mt-16 border-t border-neutral-100 dark:border-neutral-800 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-emerald-50 dark:bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'No Hidden Fees' : 'কোনো গোপন চার্জ নেই'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-blue-50 dark:bg-orange-500/10 p-2 text-blue-600 dark:text-orange-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Free Consultation' : 'ফ্রি কনসালটেশন'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-amber-50 dark:bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Transparent Pricing' : 'স্বচ্ছ প্রাইসিং'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-indigo-50 dark:bg-orange-500/10 p-2 text-indigo-600 dark:text-orange-400">
                  <Lock className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Secure Payment' : 'নিরাপদ পেমেন্ট'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-purple-50 dark:bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400 dark:text-purple-300">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Satisfaction Guaranteed' : 'শতভাগ সন্তুষ্টির নিশ্চয়তা'}
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-rose-50 dark:bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Dedicated Support' : 'ডেডিকেটেড সাপোর্ট'}
                </span>
              </div>
            </div>
          </div>

          {/* Premium CTA: Need Something Custom? */}
          <div className="mt-16 bg-neutral-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-neutral-800">
            <div className="absolute top-0 right-0 h-64 w-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-left">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 dark:text-orange-300 border border-blue-500/20">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>{currentLang === 'en' ? 'Bespoke Solutions' : 'কাস্টম সলিউশন'}</span>
                </span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {currentLang === 'en' ? 'Need Something Custom?' : 'কাস্টম সলিউশন প্রয়োজন?'}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  {currentLang === 'en' 
                    ? "Every business is unique. Let's build a custom solution tailored to your goals. Get a bespoke scope of work tailored precisely to your budget and deadlines."
                    : "প্রতিটি ব্যবসাই অনন্য। আপনার নির্দিষ্ট উদ্দেশ্য ও লক্ষ্যের ওপর ভিত্তি করে কাস্টম সলিউশন তৈরি করুন। আপনার বাজেট ও সময়ের সাথে সামঞ্জস্যপূর্ণ ফরমাল কার্যপরিধি লাভ করুন।"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <button
                  onClick={() => {
                    const el = document.getElementById('quote-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition duration-200 cursor-pointer shadow-lg shadow-blue-600/20 flex items-center space-x-2"
                >
                  <span>{currentLang === 'en' ? 'Request Custom Quote' : 'কাস্টম কোটেশন পাঠান'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-bold transition duration-200 cursor-pointer"
                >
                  {currentLang === 'en' ? 'Schedule a Meeting' : 'মিটিং শিডিউল করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE BUDGET ESTIMATION CALCULATOR */}
      <div id="dynamic-calculator-section" className="bg-white dark:bg-[#141414] border-y border-neutral-100 dark:border-neutral-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Options builder */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 dark:text-neutral-600">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>{currentLang === 'en' ? 'Interactive Budget Builder' : 'ইন্টারেক্টিভ বাজেট বিল্ডার'}</span>
                </div>
                <h2 className="font-sans text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                  {currentLang === 'en' ? 'Construct Your Tailored Budget' : 'আপনার কাস্টম বাজেট তৈরি করুন'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">
                  {currentLang === 'en' 
                    ? 'Pick an initial base configuration tier and select from our available modular add-ons to synthesize a highly accurate ballpark estimate.'
                    : 'একটি মূল সার্ভিস ক্যাটাগরি সিলেক্ট করুন এবং আমাদের মডুলার অ্যাড-অনগুলো থেকে আপনার প্রয়োজনীয় ফিচার যোগ করে লাইভ বাজেট হিসেব করুন।'}
                </p>
              </div>

              {/* Base Pack dropdown */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider">
                  {currentLang === 'en' ? '1. Select Base Plan' : '১. বেস প্ল্যান সিলেক্ট করুন'}
                </label>
                <div className="relative">
                  <select 
                    value={calculatorBasePlan}
                    onChange={(e) => setCalculatorBasePlan(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4.5 py-3.5 text-xs font-bold text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    {allPackages.filter(p => p.enabled !== false).map(p => {
                      const optPrice = billingPeriod === 'project' ? p.priceYearly : p.priceMonthly;
                      return (
                        <option key={p.id} value={p.id}>
                          [{p.category}] {currentLang === 'en' ? p.nameEn : p.nameBn} - {formatPrice(optPrice)} / {currentLang === 'en' ? 'mo' : 'মাস'}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="absolute right-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Add-ons Checklist */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider">
                  {currentLang === 'en' ? '2. Select Modular Add-on Services' : '২. অতিরিক্ত অ্যাড-অন সার্ভিসেস যোগ করুন'}
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allAddons.filter(a => a.enabled !== false).map(addon => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`p-4 border rounded-2xl cursor-pointer transition-all duration-200 flex items-start space-x-3 text-left ${
                          isChecked 
                            ? 'bg-blue-50/5 dark:bg-orange-500/50 border-blue-500/80 ring-1 ring-blue-500/10'
                            : 'bg-neutral-50/20 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:border-neutral-600'
                        }`}
                      >
                        <div className={`mt-0.5 rounded-md border h-4.5 w-4.5 shrink-0 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-[#141414]'
                        }`}>
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2.5">
                            <span className="text-xs font-extrabold text-neutral-900 dark:text-white leading-tight">
                              {currentLang === 'en' ? addon.nameEn : addon.nameBn}
                            </span>
                            <span className="text-[10px] font-mono font-black text-blue-600 dark:text-orange-400 bg-blue-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-sm">
                              {formatAddonPrice(addon.price)}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-normal">
                            {currentLang === 'en' ? addon.descriptionEn : addon.descriptionBn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Estimator Display Card */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="rounded-3xl border border-neutral-900 bg-neutral-950 p-6 md:p-8 text-white shadow-xl">
                
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-blue-400 dark:text-orange-300" />
                  <span>{currentLang === 'en' ? 'ESTIMATION OVERVIEW' : 'বাজেট সামারি'}</span>
                </h3>

                <div className="space-y-5 border-b border-neutral-800 pb-6">
                  {/* Selected Base tier */}
                  {selectedBasePackage && (
                    <div className="flex justify-between text-xs">
                      <div>
                        <span className="text-neutral-400 dark:text-neutral-500">{currentLang === 'en' ? 'Base Configuration:' : 'মূল সার্ভিস কনফিগ:'}</span>
                        <div className="font-bold text-white mt-0.5">
                          {currentLang === 'en' ? selectedBasePackage.nameEn : selectedBasePackage.nameBn} ({selectedBasePackage.category})
                        </div>
                      </div>
                      <span className="font-mono font-bold text-neutral-100">
                        {formatPrice(billingPeriod === 'project' ? selectedBasePackage.priceYearly : selectedBasePackage.priceMonthly)}
                      </span>
                    </div>
                  )}

                  {/* Addons selected */}
                  {selectedAddonIds.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                        {currentLang === 'en' ? 'Modular Add-ons Added:' : 'সংযুক্ত অ্যাড-অন সার্ভিস সমূহ:'}
                      </span>
                      {selectedAddonIds.map(addonId => {
                        const addon = allAddons.find(a => a.id === addonId);
                        if (!addon) return null;
                        return (
                          <div key={addon.id} className="flex justify-between text-xs">
                            <span className="text-neutral-400 dark:text-neutral-500 font-medium truncate max-w-[220px]">
                              + {currentLang === 'en' ? addon.nameEn : addon.nameBn}
                            </span>
                            <span className="font-mono text-neutral-300 dark:text-neutral-600 font-semibold">{formatAddonPrice(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-2 flex items-baseline justify-between">
                  <span className="text-xs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    {currentLang === 'en' ? 'Estimated Total:' : 'আনুমানিক মোট খরচ:'}
                  </span>
                  <div className="text-right">
                    <span className="text-4xl font-black tracking-tight text-blue-400 dark:text-orange-300">{formatPrice(calculatedTotal)}</span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block mt-0.5">
                      / {currentLang === 'en' ? 'month estimation' : 'মাসিক আনুমানিক হিসেব'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const compiledNotes = `Calculated Estimate: ${formatPrice(calculatedTotal)}/month. Base package chosen: ${selectedBasePackage?.nameEn} (${selectedBasePackage?.category}). Addons included: ${selectedAddonIds.map(id => allAddons.find(a => a.id === id)?.nameEn).join(', ')}`;
                    setQuoteForm(prev => ({
                      ...prev,
                      description: prev.description + '\n\n' + compiledNotes
                    }));
                    const el = document.getElementById('quote-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-8 w-full cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 text-xs text-center transition duration-200 shadow-md shadow-blue-600/10"
                >
                  {currentLang === 'en' ? 'Apply This Build to Quote Request' : 'এই বাজেটটি কোটেশন ফর্মে সংযুক্ত করুন'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. FEATURE COMPARISON MATRIX */}
      <div id="pricing-matrix-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-orange-400">
            {currentLang === 'en' ? 'DEEP DIVE DETAILS' : 'বিস্তারিত ফিচার ম্যাট্রিক্স'}
          </span>
          <h2 className="font-sans text-2xl font-black text-neutral-900 dark:text-white tracking-tight sm:text-3xl">
            {currentLang === 'en' ? 'Side-by-Side Capability Checklist' : 'পাশাপাশি সব সুবিধা ও সক্ষমতা তুলনা'}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-normal">
            {currentLang === 'en' 
              ? 'Examine precise service level agreements (SLAs), design features, backends limits, and security frameworks.'
              : 'সার্ভিস লেভেল এগ্রিমেন্ট (SLA), ডিজাইন কোয়ালিটি, ব্যাকএন্ড আর্কিটেকচার এবং নিরাপত্তা ফিচারের তুলনামূলক তথ্য দেখে নিন।'}
          </p>
        </div>

        {/* Matrix Table */}
        <div className="border border-neutral-100 dark:border-neutral-800 rounded-2xl bg-white dark:bg-[#141414] overflow-hidden shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-[10px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                <th className="p-4 md:p-5 w-[35%]">{currentLang === 'en' ? 'Capabilities & Specs' : 'ফিচার ও কারিগরি বিবরণ'}</th>
                <th className="p-4 md:p-5 text-center w-[21%]">Starter Scale</th>
                <th className="p-4 md:p-5 text-center w-[21%]">Enterprise Business</th>
                <th className="p-4 md:p-5 text-center w-[21%]">Custom Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 dark:text-neutral-300 dark:text-neutral-600">
              {allComparisons.map((comp) => {
                const category = currentLang === 'en' ? comp.categoryEn : comp.categoryBn;
                const feature = currentLang === 'en' ? comp.featureEn : comp.featureBn;
                const starter = currentLang === 'en' ? comp.starterEn : comp.starterBn;
                const business = currentLang === 'en' ? comp.businessEn : comp.businessBn;
                const enterprise = currentLang === 'en' ? comp.enterpriseEn : comp.enterpriseBn;

                return (
                  <tr key={comp.id} className="hover:bg-neutral-50/40 transition-colors">
                    <td className="p-4 md:p-5 font-semibold text-neutral-800 dark:text-neutral-100">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-blue-600 dark:text-orange-400 font-extrabold uppercase tracking-wide mb-0.5">
                          {category}
                        </span>
                        <span>{feature}</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-center text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 font-medium">{starter}</td>
                    <td className="p-4 md:p-5 text-center text-neutral-800 dark:text-neutral-100 font-semibold">{business}</td>
                    <td className="p-4 md:p-5 text-center text-blue-700 font-bold bg-blue-50/10 dark:bg-orange-500/5">{enterprise}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* 5. POSTGRES/LOCALSTORAGE BACKED CUSTOM QUOTE FORM */}
      <div id="quote-form-section" className="bg-neutral-900 text-white py-24 border-t border-neutral-800 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 dark:text-orange-300">
                <FileText className="h-4 w-4" />
                <span>{currentLang === 'en' ? 'ZERO-TRUST CONTACT FLOW' : 'সুরক্ষিত কাস্টম কোটেশন'}</span>
              </div>

              <h2 className="font-sans text-3xl font-black tracking-tight text-white sm:text-4xl">
                {currentLang === 'en' ? 'Have a Bespoke Vision? Request a Quote.' : 'কাস্টম ডিজাইন বা সার্ভিস লাগবে? আমাদের জানান।'}
              </h2>

              <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
                {currentLang === 'en'
                  ? 'Submit your project credentials and requirements directly. Our architectural staff reviews all applications within 4 business hours to supply a formal scope of work.'
                  : 'আপনার প্রজেক্টের যাবতীয় ফাইল ও বিবরণ আমাদের কাছে পাঠিয়ে দিন। আমাদের টেকনিক্যাল টিম সর্বোচ্চ ৪ ঘণ্টার মধ্যে বিস্তারিত প্রজেক্ট আর্কিটেকচার রিভিউ প্রদান করবে।'}
              </p>

              {/* Trust badges inside form */}
              <div className="space-y-3.5 pt-4">
                <div className="flex items-center space-x-2.5 text-xs font-semibold text-neutral-300 dark:text-neutral-600">
                  <Check className="h-4.5 w-4.5 text-blue-400 dark:text-orange-300" />
                  <span>{currentLang === 'en' ? 'NDA & Non-Disclosure Agreements ready' : 'এনডিএ (NDA) চুক্তির শতভাগ নিশ্চয়তা'}</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs font-semibold text-neutral-300 dark:text-neutral-600">
                  <Check className="h-4.5 w-4.5 text-blue-400 dark:text-orange-300" />
                  <span>{currentLang === 'en' ? 'Sub-4 Hours guaranteed callback' : '৪ ঘণ্টার নিচে গ্যারান্টিড রেসপন্স'}</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs font-semibold text-neutral-300 dark:text-neutral-600">
                  <Check className="h-4.5 w-4.5 text-blue-400 dark:text-orange-300" />
                  <span>{currentLang === 'en' ? 'Detailed PDF scope of work blueprints' : 'ডিটেইলড প্রজেক্ট পিডিএফ ব্লুপ্রিন্ট'}</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-neutral-800 bg-neutral-950/80 p-6 md:p-8 shadow-2xl">
                
                {submitSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {currentLang === 'en' ? 'Quote Request Logged Successfully!' : 'কোটেশন রিকোয়েস্ট সফলভাবে জমা হয়েছে!'}
                    </h3>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-md mx-auto leading-normal">
                      {currentLang === 'en' 
                        ? 'Your custom quote request has been saved securely to our local database system. A lead engineer will contact you shortly.'
                        : 'আপনার কাস্টম কোটেশন রিকোয়েস্টটি আমাদের সুরক্ষিত ডাটাবেসে সফলভাবে সংরক্ষিত হয়েছে। একজন প্রকৌশলী খুব দ্রুত আপনার সাথে যোগাযোগ করবেন।'}
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-4 inline-flex rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3.5 text-xs transition duration-200 cursor-pointer"
                    >
                      {currentLang === 'en' ? 'Submit Another Application' : 'নতুন কোটেশন পাঠান'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuote} className="space-y-5 text-left">
                    
                    {errorMessage && (
                      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400 font-semibold flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Full Name *' : 'পূর্ণ নাম *'}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Corporate Email *' : 'কর্পোরেট ইমেল *'}
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Phone Number' : 'ফোন নম্বর'}
                        </label>
                        <input
                          type="text"
                          placeholder="+1 (555) 000-0000"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>

                      {/* Company & Industry */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Company Name & Industry' : 'প্রতিষ্ঠানের নাম ও ইন্ডাস্ট্রি'}
                        </label>
                        <input
                          type="text"
                          placeholder="Acme Corp (Fintech)"
                          value={quoteForm.company}
                          onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Target Category */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Target Category' : 'সার্ভিস ক্যাটাগরি'}
                        </label>
                        <select
                          value={quoteForm.service}
                          onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                        >
                          <option value="Web Development">{currentLang === 'en' ? 'Web Development' : 'ওয়েব ডেভেলপমেন্ট'}</option>
                          <option value="Web App">{currentLang === 'en' ? 'mobile app' : 'ওয়েব অ্যাপস'}</option>
                          <option value="UI/UX Design">{currentLang === 'en' ? 'UI/UX Design' : 'ইউআই/ইউএক্স ডিজাইন'}</option>
                          <option value="Graphic Design">{currentLang === 'en' ? 'Graphic Design' : 'গ্রাফিক ডিজাইন'}</option>
                          <option value="Digital Marketing">{currentLang === 'en' ? 'Digital Marketing' : 'ডিজিটাল মার্কেটিং'}</option>
                          <option value="SEO">{currentLang === 'en' ? 'SEO Search' : 'এসইও সার্চ'}</option>
                          <option value="AI Automation & Agent">{currentLang === 'en' ? 'AI Agent' : 'এআই এজেন্ট'}</option>
                          <option value="Video Editing">{currentLang === 'en' ? 'Video Editing' : 'ভিডিও এডিটিং'}</option>
                        </select>
                      </div>

                      {/* Ballpark Budget */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Budget Range' : 'আনুমানিক বাজেট'}
                        </label>
                        <select
                          value={quoteForm.budget}
                          onChange={(e) => setQuoteForm({ ...quoteForm, budget: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                        >
                          <option value="Under $5,000">{currentLang === 'en' ? 'Under $5,000' : '৫,০০০ ডলারের নিচে'}</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                        </select>
                      </div>

                      {/* Expected Timeline */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {currentLang === 'en' ? 'Expected Timeline' : 'আকাঙ্ক্ষিত সময়সীমা'}
                        </label>
                        <select
                          value={quoteForm.timeline}
                          onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-3.5 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                        >
                          <option value="Under 1 month">{currentLang === 'en' ? 'Under 1 Month' : '১ মাসের কম'}</option>
                          <option value="1-2 months">1-2 Months</option>
                          <option value="2-3 months">2-3 Months</option>
                          <option value="3-6 months">3-6 Months</option>
                          <option value="Flexible / Long Term">{currentLang === 'en' ? 'Flexible / Long Term' : 'দীর্ঘমেয়াদী'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                        {currentLang === 'en' ? 'Project Requirements Description *' : 'প্রজেক্টের বিবরণ ও প্রয়োজনীয়তা *'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={currentLang === 'en' ? 'Outline your primary target audiences, essential features, references, and core technical goals...' : 'আপনার প্রজেক্টের প্রধান লক্ষ্য, প্রয়োজনীয় ফিচার, রেফারেন্স এবং উদ্দেশ্যসমূহ লিখুন...'}
                        value={quoteForm.description}
                        onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                      />
                    </div>

                    {/* Mock File Attachment support */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                        {currentLang === 'en' ? 'Project Wireframe or Brief (Max 2MB)' : 'প্রজেক্ট ওয়্যারফ্রেম বা ব্রিফ (সর্বোচ্চ ২ মেগাবাইট)'}
                      </label>
                      <div className="relative border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 rounded-xl p-4 transition text-center cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center space-y-1 text-xs">
                          <Upload className="h-5 w-5 text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 mb-1" />
                          {selectedFileName ? (
                            <span className="text-blue-400 dark:text-orange-300 font-bold">{selectedFileName}</span>
                          ) : (
                            <>
                              <span className="text-neutral-300 dark:text-neutral-600 font-medium">
                                {currentLang === 'en' ? 'Click or drag files here to attach' : 'ফাইল আপলোড করতে এখানে ক্লিক করুন'}
                              </span>
                              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 dark:text-neutral-500">PDF, JPG, PNG, DOC, ZIP</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Btn */}
                    <button
                      type="submit"
                      disabled={submittingQuote}
                      className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-800 disabled:text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 text-white font-bold py-4 text-xs transition duration-200 cursor-pointer shadow-lg shadow-blue-600/15"
                    >
                      {submittingQuote 
                        ? (currentLang === 'en' ? 'Processing Secure Submission...' : 'প্রক্রিয়াধীন রয়েছে...') 
                        : (currentLang === 'en' ? 'Submit Secure Project Application' : 'প্রজেক্ট অ্যাপ্লিকেশন জমা দিন')}
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. WHY CHOOSE NEXT SOLUTION */}
      <div id="pricing-why-us" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-orange-400">
            {currentLang === 'en' ? 'UNCOMPROMISING STANDARDS' : 'আমাদের অনন্য মানদণ্ড'}
          </span>
          <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? 'Designed for Absolute Integrity' : 'ডিজাইন করা হয়েছে স্বচ্ছতা ও সততার সাথে'}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-normal">
            {currentLang === 'en'
              ? 'Why top international brands and high-growth startups confidently partner with Next Solution.'
              : 'যে কারণে শীর্ষ আন্তর্জাতিক ব্র্যান্ড এবং দ্রুত বর্ধনশীল স্টার্টআপসমূহ আমাদের উপর আস্থা রাখে।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#141414] border border-neutral-150 p-6 md:p-8 rounded-2xl text-left space-y-4">
            <div className="rounded-xl bg-blue-50/70 p-3 text-blue-600 dark:text-orange-400 w-11 h-11 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{currentLang === 'en' ? 'Velocity & Hyper-Speed Delivery' : 'গতিময় এজাইল স্প্রিন্ট'}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
              {currentLang === 'en'
                ? 'We launch initial functional views in days instead of months. Our agile workflow structure deploys interactive builds every single Friday.'
                : 'আমরা মাসের পর মাস অপেক্ষা না করে কয়েক দিনেই সচল ভিউ সরবরাহ করি। প্রতি শুক্রবারেই আমাদের ইন্টারেক্টিভ কাস্টম বিল্ড ডেপ্লয় করা হয়।'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#141414] border border-neutral-150 p-6 md:p-8 rounded-2xl text-left space-y-4">
            <div className="rounded-xl bg-blue-50/70 p-3 text-blue-600 dark:text-orange-400 w-11 h-11 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{currentLang === 'en' ? 'Absolute Coding Autonomy' : 'শতভাগ সোর্স কোড স্বাধীনতা'}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
              {currentLang === 'en'
                ? 'No vendor lock-ins or black-box servers. You receive structured Git repository handoffs, standard infrastructure code, and comprehensive redlines.'
                : 'কোনো ভেন্ডর লক-ইন বা অস্পষ্ট কোডিং নেই। আপনি পাবেন সম্পূর্ণ কাঠামোবদ্ধ গিট রিপোজিটরি, স্ট্যান্ডার্ড ইনফ্রাস্ট্রাকচার হ্যান্ডওভার এবং রেডলাইন স্পেক্স।'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#141414] border border-neutral-150 p-6 md:p-8 rounded-2xl text-left space-y-4">
            <div className="rounded-xl bg-blue-50/70 p-3 text-blue-600 dark:text-orange-400 w-11 h-11 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{currentLang === 'en' ? 'Extreme Performance SLA' : 'কোর ওয়েব ভাইটালস গ্যারান্টি'}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed">
              {currentLang === 'en'
                ? 'We target sub-second initial paints. Every platform we build undergoes extensive performance audits to hit a flawless 95%+ Core Web Vitals score.'
                : 'আমরা ১ সেকেন্ডের কম পেইন্টিং স্পিড টার্গেট করি। আমাদের তৈরি প্রতিটি সাইট Core Web Vitals অডিটে ৯৫% এর বেশি স্কোর অর্জন নিশ্চিত করে।'}
            </p>
          </div>
        </div>
      </div>

      {/* 7. FAQS */}
      <div id="pricing-faqs" className="bg-white dark:bg-[#141414] border-t border-neutral-100 dark:border-neutral-800 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'COMMON QUESTIONS' : 'সাধারণ জিজ্ঞাসাসমূহ'}
            </span>
            <h2 className="font-sans text-2xl font-black text-neutral-900 dark:text-white tracking-tight sm:text-3xl">
              {currentLang === 'en' ? 'Frequently Answered Agreements' : 'পেমেন্ট ও পিরিয়ড সংক্রান্ত প্রশ্নোত্তর'}
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              const question = currentLang === 'en' ? faq.questionEn : faq.questionBn;
              const answer = currentLang === 'en' ? faq.answerEn : faq.answerBn;

              return (
                <div 
                  key={faq.id} 
                  className="border border-neutral-200/90 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-neutral-900 dark:text-white hover:bg-neutral-50/50 dark:bg-neutral-900/50 cursor-pointer bg-transparent border-none outline-none"
                  >
                    <span>{question}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-neutral-400 dark:text-neutral-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600 dark:text-orange-400' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs text-neutral-500 dark:text-neutral-400 dark:text-neutral-500 leading-relaxed border-t border-neutral-50 dark:border-neutral-800 bg-neutral-50/20">
                          {answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 8. TESTIMONIALS SECTOR */}
      <div id="pricing-testimonials" className="bg-neutral-50/50 dark:bg-neutral-900/50 py-20 border-t border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-orange-400">
              {currentLang === 'en' ? 'CLIENT SUCCESS STORIES' : 'গ্রাহক পর্যালোচনা'}
            </span>
            <h2 className="font-sans text-2xl font-black text-neutral-900 dark:text-white tracking-tight sm:text-3xl">
              {currentLang === 'en' ? 'Praise From Trusted Partners' : 'আমাদের প্রতি তাদের আস্থা ও ভালোবাসা'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((test) => (
              <div key={test.id} className="bg-white dark:bg-[#141414] border border-neutral-150 p-6 md:p-8 rounded-3xl space-y-4 shadow-xs relative">
                <div className="flex space-x-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 dark:text-neutral-600 leading-relaxed italic">
                  "{currentLang === 'en' ? test.feedbackEn : test.feedbackBn}"
                </p>
                <div className="flex items-center space-x-3.5 pt-2">
                  <img src={test.avatar} className="h-10 w-10 rounded-full ring-2 ring-neutral-50 border object-cover" alt={test.name} />
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{test.name}</h4>
                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wide mt-0.5">
                      {currentLang === 'en' ? test.roleEn : test.roleBn}, {test.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 9. FINAL CTA SECTION */}
      <div id="pricing-final-cta" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl bg-neutral-950 p-8 md:p-16 text-center text-white overflow-hidden shadow-xl border border-neutral-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {currentLang === 'en' ? 'Launch Your Digital Breakthrough' : 'আপনার নতুন ডিজিটাল মাইলস্টোন শুরু করুন'}
            </h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-lg mx-auto">
              {currentLang === 'en'
                ? 'Join force with our senior engineers and elite designer squads to synthesize the digital product of your dream.'
                : 'আজই আমাদের সিনিয়র ইঞ্জিনিয়ার ও ডিজাইনারদের সাথে যুক্ত হয়ে আপনার স্বপ্নের ডিজিটাল প্রজেক্ট চালু করুন।'}
            </p>
            
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold px-7 py-4 text-xs text-white shadow-lg shadow-blue-600/15 cursor-pointer border-none outline-none"
              >
                {currentLang === 'en' ? 'Contact Solutions Specialist' : 'বিশেষজ্ঞের পরামর্শ নিন'}
              </button>
              <a
                href="#quote-form-section"
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 text-white font-semibold px-7 py-4 text-xs cursor-pointer"
              >
                {currentLang === 'en' ? 'Calculate Customized Pricing' : 'কাস্টম কোটেশন পাঠান'}
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
