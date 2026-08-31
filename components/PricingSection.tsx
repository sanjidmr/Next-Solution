"use client";
/**
 * Public /pricing page component — dynamic pricing engine.
 * Data comes from the Supabase backend via GET /api/pricing (published rows
 * only). Rows are managed in the admin panel under Pricing Management.
 * Requests land in pricing_quote_requests via POST /api/pricing/quotes.
 */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Layers,
  Zap,
  Target,
  Tag,
  Diamond,
  ChevronDown,
  AlertCircle,
  X,
  Loader2,
  PenTool,
  Code,
  Palette,
  Megaphone,
  Brain,
  Search,
  Video,
  FolderOpen,
  Send,
  Calculator,
  Table2,
  Wallet,
  Building2,
  BadgeCheck,
  CalendarClock,
  Rocket,
  Star,
  Quote,
} from 'lucide-react';
import {
  getFAQs,
  addPricingQuote,
  getCurrencies,
  getCurrencySettings,
  getWhyChooseUsCards,
  getTestimonials,
} from '@/lib/db';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import {
  ProjectPricing,
  MonthlyPricing,
  AgencyPackage,
  FAQ,
  Testimonial,
  PricingQuoteRequest,
  Currency,
  WhyChooseUsCard,
} from '@/types';
import { initialProjectPricing, initialMonthlyPricing, initialAgencyPackages } from '@/data/pricingInitialData';

interface PricingSectionProps {
  currentLang: 'en' | 'bn';
  setTab: (tab: string) => void;
  isFullPage?: boolean;
}

const SERVICES = [
  'Web Development',
  'UI/UX Design',
  'Graphic Design',
  'Video Editing',
  'Digital Marketing',
  'AI Services',
  'SEO',
] as const;

const SERVICE_ICONS: Record<string, any> = {
  'Web Development': Code,
  'UI/UX Design': Palette,
  'Graphic Design': PenTool,
  'Video Editing': Video,
  'Digital Marketing': Megaphone,
  'AI Services': Brain,
  'SEO': Search,
};

const fmtPrice = (n: number) => '$' + Number(n || 0).toLocaleString('en-US');

const DEFAULT_FAQS: { question: string; answer: string }[] = [
  {
    question: 'How do your project-based prices work?',
    answer: 'Every project card shows a flat, all-inclusive price for that service — no surprise charges. The price covers design, build, delivery and the listed support window. Timelines are shared before we start, and you only move to the next stage after approving the current one.',
  },
  {
    question: 'What do the monthly plans include?',
    answer: 'Monthly plans are recurring retainers covering ongoing production — marketing, SEO, design output, video content or site maintenance. You can pause or cancel with one month of notice, and everything you get each month is listed on the card.',
  },
  {
    question: 'Which agency package should I choose?',
    answer: 'Start with Starter Launchpad to launch fast, choose Growth Engine if you want design, web, marketing and SEO running together, and Scale Dominator when you need automation and full campaign management. Enterprise Alliance is tailored for larger teams with ongoing needs.',
  },
  {
    question: 'Can I get a custom quote?',
    answer: 'Yes. Use the "Get a Custom Quote" button and our team will reply within 24 hours with a tailored proposal, timeline and price for your specific project.',
  },
  {
    question: 'Is there any hidden charge for revisions?',
    answer: 'No. The revision and support scope is printed directly on every card. Anything inside that scope is free; anything beyond it is quoted in writing before we proceed.',
  },
];

const CALC_ADDONS = [
  { id: 'express', label: 'Express Delivery (48h Rush)', price: 149 },
  { id: 'revisions', label: 'Extra Revision Rounds (x3)', price: 99 },
  { id: 'seo', label: 'SEO Starter Audit', price: 199 },
  { id: 'kit', label: 'Brand Visual Kit (Logo + UI Mockups)', price: 120 },
  { id: 'social', label: 'Social Media Kit (12 Posts)', price: 249 },
  { id: 'support', label: 'Extended Support +2 Months', price: 180 },
];

const WHY_ICONS: Record<string, any> = {
  zap: Zap,
  layers: Layers,
  shield: ShieldCheck,
  target: Target,
  rocket: Rocket,
  star: Star,
  badge: BadgeCheck,
  check: Check,
  tag: Tag,
  diamond: Diamond,
  code: Code,
};

export default function PricingSection({ currentLang, setTab, isFullPage = false }: PricingSectionProps) {
  const [billingPeriod, setBillingPeriod] = useState<'project' | 'monthly'>('project');
  const [activeService, setActiveService] = useState<string>('All Services');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [quoteModal, setQuoteModal] = useState<{ open: boolean; service: string; planLabel: string }>({ open: false, service: 'Web Development', planLabel: '' });

  // Budget estimator state (restored calculator section)
  const [estType, setEstType] = useState<'project' | 'monthly'>('project');
  const [estBaseId, setEstBaseId] = useState<string>('');
  const [chosenAddons, setChosenAddons] = useState<string[]>([]);

  // Backend data
  const [pricingData, setPricingData] = useState<{ project: ProjectPricing[]; monthly: MonthlyPricing[]; agency: AgencyPackage[]; configured: boolean } | null>(null);
  const [dataError, setDataError] = useState(false);

  // ---- Currency handling (restored classic switcher) ----
  const currencies = useMemo(
    () => getCurrencies().filter((c) => c.enabled !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    []
  );
  const currencySettings = useMemo(() => getCurrencySettings(), []);

  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(() => {
    const storedCode = getLocalItem('next_solution_selected_currency_code');
    if (storedCode) {
      const found = currencies.find((c) => c.code === storedCode);
      if (found) return found;
    }
    const defaultCode = currencySettings.defaultCurrencyCode || 'USD';
    const def = currencies.find((c) => c.code === defaultCode);
    return def || currencies[0] || null;
  });

  const [liveRates, setLiveRates] = useState<Record<string, number>>({});

  useEffect(() => {
    if (currencySettings.enableLiveRates) {
      fetch('https://open.er-api.com/v6/latest/USD')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.rates) setLiveRates(data.rates);
        })
        .catch((err) => console.warn('Could not fetch live exchange rates:', err));
    }
  }, [currencySettings.enableLiveRates]);

  const activeExchangeRate = useMemo(() => {
    if (!selectedCurrency) return 1.0;
    if (currencySettings.enableLiveRates && liveRates[selectedCurrency.code]) return liveRates[selectedCurrency.code];
    return selectedCurrency.exchangeRate || 1;
  }, [selectedCurrency, liveRates, currencySettings.enableLiveRates]);

  const handleCurrencyChange = (curr: Currency) => {
    setSelectedCurrency(curr);
    setLocalItem('next_solution_selected_currency_code', curr.code);
  };

  const formatPrice = (usdAmount: number) => {
    if (!selectedCurrency) return `$${Number(usdAmount || 0).toLocaleString('en-US')}`;
    const rate = activeExchangeRate || 1;
    const precision = currencySettings.decimalPrecision ?? 0;
    const amount = (Number(usdAmount || 0) * rate).toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
    return `${selectedCurrency.symbol}${amount}`;
  };

  useEffect(() => {
    let cancelled = false;
    fetch('/api/pricing')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('pricing fetch failed'))))
      .then((json) => {
        if (!cancelled) {
          setPricingData({
            project: json.project || [],
            monthly: json.monthly || [],
            agency: json.agency || [],
            configured: !!json.configured,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setDataError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = !pricingData && !dataError;
  // If the backend is unreachable, fall back to the bundled starter data.
  const fallback = dataError;

  const projectList = useMemo(() => {
    if (fallback) return initialProjectPricing;
    return pricingData?.project || [];
  }, [pricingData, fallback]);

  const monthlyList = useMemo(() => {
    if (fallback) return initialMonthlyPricing;
    return pricingData?.monthly || [];
  }, [pricingData, fallback]);

  const agencyList = useMemo(() => {
    if (fallback) return initialAgencyPackages;
    return pricingData?.agency || [];
  }, [pricingData, fallback]);

  const configured = fallback ? true : !!pricingData?.configured;

  const filteredProject = useMemo(() => {
    return projectList
      .filter((p) => p.enabled !== false)
      .filter((p) => activeService === 'All Services' || p.service === activeService)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [projectList, activeService]);

  const filteredMonthly = useMemo(() => {
    return monthlyList
      .filter((p) => p.enabled !== false)
      .filter((p) => activeService === 'All Services' || p.service === activeService)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [monthlyList, activeService]);

  // Budget estimator derived state
  const estBaseOptions = useMemo(() => (estType === 'project' ? filteredProject : filteredMonthly), [estType, filteredProject, filteredMonthly]);
  const estBase = estBaseOptions.find((o) => o.id === estBaseId) || estBaseOptions[0];
  const estAddonItems = CALC_ADDONS.filter((a) => chosenAddons.includes(a.id));
  const estTotal = (estBase?.price || 0) + estAddonItems.reduce((s, a) => s + a.price, 0);

  useEffect(() => {
    const options = estType === 'project' ? filteredProject : filteredMonthly;
    if (options.length === 0) {
      setEstBaseId('');
    } else if (!options.some((o) => o.id === estBaseId)) {
      setEstBaseId(options[0].id);
    }
  }, [estType, filteredProject, filteredMonthly, estBaseId]);

  const faqs = useMemo(() => {
    const list = getFAQs();
    try {
      const pricingFaqs = list
        .filter((f: FAQ) => f.categoryEn.toLowerCase() === 'pricing')
        .slice(0, 8);
      if (pricingFaqs.length >= 5) return pricingFaqs;
    } catch {
      // fall through to defaults
    }
    return DEFAULT_FAQS;
  }, []);
  const t = (en: string, bn: string) => (currentLang === 'en' ? en : bn);

  const openQuote = useCallback((service: string, planLabel?: string) => {
    setQuoteModal({ open: true, service, planLabel: planLabel || '' });
  }, []);

  const scrollToPlans = () => {
    document.getElementById('pricing-plans-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToQuote = () => {
    document.getElementById('pricing-quote-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ServiceFilterChips = () => (
    <div className="flex flex-wrap justify-center gap-2">
      {['All Services', ...SERVICES].map((s) => {
        const active = activeService === s;
        return (
          <button
            key={s}
            onClick={() => setActiveService(s)}
            className={`group flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
              active
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-orange-500/50 hover:text-orange-500 dark:hover:text-orange-400 bg-white dark:bg-[#141414]'
            }`}
          >
            {SERVICE_ICONS[s] ? (() => { const Icon = SERVICE_ICONS[s]; return <Icon className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-orange-500/70 group-hover:text-orange-500'}`} />; })() : (
              <FolderOpen className={`h-3.5 w-3.5 ${active ? 'text-white' : 'text-orange-500/70'}`} />
            )}
            <span>{s}</span>
          </button>
        );
      })}
    </div>
  );

  const EmptyState = ({ title, subtitle, cta }: { title: string; subtitle: string; cta?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-[#141414]/60 px-6 py-14 text-center"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
        <Sparkles className="h-5 w-5 text-orange-500" />
      </div>
      <h4 className="text-sm font-black text-neutral-900 dark:text-white">{title}</h4>
      <p className="mx-auto mt-2 max-w-md text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{subtitle}</p>
      {cta && (
        <button
          onClick={() => openQuote(activeService === 'All Services' ? 'Web Development' : activeService)}
          className="mt-6 inline-flex items-center space-x-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer"
        >
          <span>{cta}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </motion.div>
  );

  return (
    <section id="pricing-page-root" data-space-page className={`bg-neutral-50/60 selection:bg-orange-500 selection:text-white ${isFullPage ? 'pt-0 pb-20' : 'py-20'}`}>

      {/* 1. HERO SECTION */}
      <section data-space-hero className="relative min-h-screen flex items-center overflow-hidden bg-[#050607]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050607] via-[#0a0b0d] to-[#08090b]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_70%_50%,rgba(255,102,0,0.06),transparent)]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.08),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.03),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

            {/* LEFT SIDE — Content */}
            <div className="space-y-6 md:space-y-7 lg:pr-8">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center space-x-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    {t('PRICING & PACKAGES', 'মূল্য ও প্যাকেজ')}
                  </span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-1"
              >
                <h1 className="font-sans text-[clamp(2.8rem,5.5vw,5.2rem)] font-black leading-[1.05] tracking-tight text-white">
                  {t('Big Impact.', 'বড় প্রভাব।')}
                  <br />
                  <span className="text-white">{t('Small ', 'ছোট ')}</span>
                  <span className="text-orange-500">{t('Investment.', 'বিনিয়োগ।')}</span>
                </h1>
                <svg className="w-48 md:w-56 h-4 mt-1 text-orange-500" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8 C30 2, 60 2, 100 6 S160 10, 198 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg"
              >
                {t(
                  'Transparent, all-inclusive pricing across project work, monthly subscriptions and complete agency packages.',
                  'প্রজেক্ট, মাসিক প্ল্যান ও সম্পূর্ণ এজেন্সি প্যাকেজে স্বচ্ছ, অল-ইনক্লুসিভ মূল্য।'
                )}
              </motion.p>

              {/* Three Value Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="grid grid-cols-3 gap-0 max-w-lg"
              >
                <div className="flex flex-col items-start pr-5 relative">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Tag className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {t('Affordable', 'সাশ্রয়ী')}<br />{t('Pricing', 'মূল্য')}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {t('Plans that fit your budget perfectly.', 'আপনার বাজেটে ফিটিং প্ল্যান।')}
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
                </div>

                <div className="flex flex-col items-start px-5 relative">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Diamond className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {t('Best', 'সেরা')}<br />{t('Value', 'মূল্য')}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {t('Top quality service at the best price.', 'সেরা দামে সেরা সেবা।')}
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
                </div>

                <div className="flex flex-col items-start pl-5">
                  <div className="rounded-full border border-orange-500/30 bg-orange-500/5 p-2.5 mb-3">
                    <Target className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight mb-1.5">
                    {t('Max', 'সর্বোচ্চ')}<br />{t('Results', 'ফলাফল')}
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug">
                    {t('Real, measurable growth focus.', 'প্রকৃত, পরিমাপযোগ্য বৃদ্ধি।')}
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
                  onClick={scrollToPlans}
                  className="group rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center space-x-2"
                >
                  <span>{t('View Pricing Plans', 'প্রাইসিং প্ল্যান দেখুন')}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={scrollToQuote}
                  className="rounded-xl border border-orange-500/30 bg-transparent hover:bg-orange-500/5 px-7 py-4 text-sm font-bold text-white hover:text-orange-400 transition-all duration-300 cursor-pointer flex items-center space-x-2"
                >
                  <span>{t('Get a Custom Quote', 'কাস্টম কোটেশন নিন')}</span>
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,102,0,0.12),transparent_70%)] blur-2xl" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 right-4 md:right-8 lg:right-0 z-20 select-none"
              >
                <div className="relative">
                  <span className="font-['Caveat',cursive] text-lg md:text-xl text-white italic leading-tight block">
                    {t('Best Results', 'সেরা ফলাফল')}<br />{t('Lower Cost', 'কম খরচ')}
                  </span>
                  <svg className="w-28 h-3 mt-0.5 text-orange-500" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6 C20 2, 50 2, 80 6 S100 8, 118 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className="w-10 h-10 text-orange-500/60 -mt-1 ml-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4 C10 4, 15 20, 20 28 S28 36, 30 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M26 30 L30 34 L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </motion.div>

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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute bottom-8 right-0 md:bottom-12 md:right-0 z-20"
              >
                <div className="flex items-center space-x-2 rounded-xl border border-orange-500/20 bg-[#0a0b0d]/80 backdrop-blur-md px-3.5 py-3.5 shadow-xl shadow-black/30">
                  <Zap className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  <span className="text-[11px] md:text-[12px] font-bold text-neutral-300 leading-tight">
                    {t('Maximum Results, Minimum Budget.', 'সর্বোচ্চ ফলাফল, ন্যূনতম বাজেট।')}
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050607] to-transparent pointer-events-none" />
      </section>

      {/* 2. PRICING PLANS — PROJECT / MONTHLY */}
      <div id="pricing-plans-grid-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

        <div className="flex flex-col space-y-10 items-center text-center">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('SIMPLE, HONEST PRICING', 'সহজ, স্বচ্ছ মূল্য')}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t('Transparent Pricing For Every Service', 'প্রতিটি সেবার জন্য স্বচ্ছ মূল্য')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              {t(
                'Choose one-time project pricing or a monthly subscription — every card includes delivery time, revisions and support.',
                'এককালীন প্রজেক্ট প্রাইস বা মাসিক সাবস্ক্রিপশন — প্রতিটি কার্ডে ডেলিভারি, রিভিশন ও সাপোর্টসহ।'
              )}
            </p>
          </div>

          {/* Billing toggle */}
          <div className="inline-flex items-center rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#141414] p-1.5 shadow-sm">
            {(['project', 'monthly'] as const).map((period) => {
              const active = billingPeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`relative rounded-xl px-6 md:px-10 py-3.5 text-sm font-black transition-all duration-300 cursor-pointer ${
                    active ? 'text-white' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/25"
                    />
                  )}
                  <span className="relative z-10">
                    {period === 'project'
                      ? t('PROJECT BASED', 'প্রজেক্ট ভিত্তিক')
                      : t('MONTHLY', 'মাসিক')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Currency Switcher — restored */}
          {currencies.length > 0 && (
            <div className="flex flex-col items-center space-y-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                {t('Select Preferred Currency', 'পছন্দের কারেন্সি বেছে নিন')}
              </span>
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#141414] p-1.5 shadow-sm">
                {currencies.map((curr) => {
                  const isSelected = selectedCurrency?.code === curr.code;
                  return (
                    <button
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr)}
                      className={`relative rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-100'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white'
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

          <ServiceFilterChips />
        </div>

        {/* Cards */}
        {loading ? (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 space-y-3">
                <div className="h-3 w-24 rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                <div className="h-6 w-32 rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                <div className="h-9 w-28 rounded bg-orange-500/10 animate-pulse" />
                <div className="space-y-2 pt-2">
                  {[...Array(5)].map((__, j) => (
                    <div key={j} className="h-2.5 w-full rounded bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : billingPeriod === 'project' ? (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProject.map((p, i) => {
              const Icon = SERVICE_ICONS[p.service] || FolderOpen;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 dark:hover:border-orange-500/60 dark:hover:shadow-[0_0_35px_-5px_rgba(255,90,0,0.25)] transition-all duration-300"
                >
                  {p.recommended && (
                    <span className="absolute -top-3 right-5 rounded-full bg-orange-500 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/30">
                      {t('BEST SELLER', 'সেরা পছন্দ')}
                    </span>
                  )}
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {p.service}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-black text-neutral-900 dark:text-white">{p.projectType}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-3xl font-black text-orange-500">{formatPrice(p.price)}</span>
                    <span className="pb-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500">/ {t('project', 'প্রজেক্ট')}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
                    {p.delivery && <span className="flex items-center space-x-1.5"><Clock className="h-3 w-3 text-orange-500/70" /><span>{p.delivery}</span></span>}
                    {p.revisions && <span className="flex items-center space-x-1.5"><Layers className="h-3 w-3 text-orange-500/70" /><span>{p.revisions}</span></span>}
                    {p.support && <span className="flex items-center space-x-1.5"><ShieldCheck className="h-3 w-3 text-orange-500/70" /><span>{p.support}</span></span>}
                  </div>

                  <ul className="mt-4 space-y-2 flex-1">
                    {(p.features || []).slice(0, 6).map((f, j) => (
                      <li key={j} className="flex items-start space-x-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openQuote(p.service, p.projectType)}
                    className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl bg-neutral-900 dark:bg-orange-500 text-white hover:bg-orange-500 dark:hover:bg-orange-400 px-4 py-3 text-xs font-black transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>{t('Get This Project', 'এই প্রজেক্ট নিন')}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
            {!configured && filteredProject.length === 0 && (
              <EmptyState
                title={t('Project pricing is coming soon', 'প্রজেক্ট প্রাইসিং শীঘ্রই আসছে')}
                subtitle={t('We are currently fine-tuning custom pricing for this category. Tell us about your project and we will send a tailored quote.', 'আমরা এই ক্যাটাগরির জন্য কাস্টম প্রাইসিং তৈরি করছি। আপনার প্রজেক্টের কথা জানান, আমরা সাজানো কোটেশন পাঠাবো।')}
                cta={t('Get a Custom Quote', 'কাস্টম কোটেশন নিন')}
              />
            )}
            {configured && filteredProject.length === 0 && (
              <EmptyState
                title={t('No options in this category yet', 'এই ক্যাটাগরিতে এখনও কিছু নেই')}
                subtitle={t('Packages for this service are being prepared. Request a custom quote and our team will reply within 24 hours.', 'এই সেবার প্যাকেজ প্রস্তুত করা হচ্ছে। কাস্টম কোটেশন চান? আমাদের টিম ২৪ ঘণ্টার মধ্যে রিপ্লাই দেবে।')}
                cta={t('Request a Quote', 'কোটেশন চান')}
              />
            )}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMonthly.map((p, i) => {
              const Icon = SERVICE_ICONS[p.service] || FolderOpen;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 dark:hover:border-orange-500/60 dark:hover:shadow-[0_0_35px_-5px_rgba(255,90,0,0.25)] transition-all duration-300"
                >
                  {p.recommended && (
                    <span className="absolute -top-3 right-5 rounded-full bg-orange-500 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/30">
                      {t('MOST POPULAR', 'সবচেয়ে জনপ্রিয়')}
                    </span>
                  )}
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{p.service}</p>
                      <h3 className="text-sm font-black text-neutral-900 dark:text-white">{p.planName}</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-3xl font-black text-orange-500">{formatPrice(p.price)}</span>
                    <span className="pb-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500">/ {t(p.billingType === 'yearly' ? 'year' : 'month', p.billingType === 'yearly' ? 'বছর' : 'মাস')}</span>
                  </div>
                  <p className="mt-3 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">{p.description}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {(p.features || []).slice(0, 6).map((f, j) => (
                      <li key={j} className="flex items-start space-x-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openQuote(p.service, p.planName)}
                    className="mt-6 w-full flex items-center justify-center space-x-2 rounded-xl bg-neutral-900 dark:bg-orange-500 text-white hover:bg-orange-500 dark:hover:bg-orange-400 px-4 py-3 text-xs font-black transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>{t('Get This Plan', 'এই প্ল্যান নিন')}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
            {!configured && filteredMonthly.length === 0 && (
              <EmptyState
                title={t('Monthly plans are coming soon', 'মাসিক প্ল্যান শীঘ্রই আসছে')}
                subtitle={t('Recurring plans for this service are being prepared. Ask for a custom monthly retainer and we will structure it around your goals.', 'এই সেবার রিকারিং প্ল্যান তৈরি হচ্ছে। কাস্টম মাসিক রিটেইনার চাইলে আমাদের জানান।')}
                cta={t('Get a Custom Quote', 'কাস্টম কোটেশন নিন')}
              />
            )}
            {configured && filteredMonthly.length === 0 && (
              <EmptyState
                title={t('No monthly plans in this category yet', 'এই ক্যাটাগরিতে এখনও মাসিক প্ল্যান নেই')}
                subtitle={t('We can build a monthly retainer that exactly matches your workflow. Request a quote and we will reply within 24 hours.', 'আমরা আপনার প্রয়োজনের জন্য কাস্টম মাসিক রিটেইনার বানাতে পারি। কোটেশন চান।')}
                cta={t('Request a Quote', 'কোটেশন চান')}
              />
            )}
          </div>
        )}
      </div>

      {/* 3. AGENCY PACKAGES */}
      <div id="pricing-agency-packages" className="bg-white dark:bg-[#141414] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('ALL-IN-ONE SOLUTIONS', 'অল-ইন-ওয়ান সমাধান')}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t('Agency Packages — Everything Under One Roof', 'এজেন্সি প্যাকেজ — এক ছাদের নিচে সব')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              {t('Design, development, marketing, video and AI — bundled with a single price and a single point of contact.', 'ডিজাইন, ডেভেলপমেন্ট, মার্কেটিং, ভিডিও ও AI — একটি মূল্যে সব।')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {agencyList.filter((p) => p.enabled !== false).map((pkg, i) => {
              const popular = pkg.mostPopular;
              const discount = pkg.discount ?? (pkg.originalPrice > 0 ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : undefined);
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                    popular
                      ? 'border-2 border-orange-500 bg-neutral-950 text-white shadow-2xl shadow-orange-500/15 dark:bg-neutral-900 lg:-translate-y-3'
                      : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] hover:border-orange-500/40'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/30 whitespace-nowrap">
                      {t('MOST POPULAR', 'সবচেয়ে জনপ্রিয়')}
                    </span>
                  )}
                  {!popular && discount && (
                    <span className="absolute top-4 right-4 rounded-full bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 text-[9px] font-black text-orange-500">
                      {t('SAVE', 'সাশ্রয়')} {discount}%
                    </span>
                  )}

                  <div>
                    <h3 className={`text-lg font-black ${popular ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>{pkg.name}</h3>
                    <p className={`mt-1.5 text-[11px] leading-snug ${popular ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'}`}>{pkg.tagline}</p>
                  </div>

                  <div className={`mt-5 border-t pt-5 ${popular ? 'border-neutral-800' : 'border-neutral-100 dark:border-neutral-800'}`}>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-black ${popular ? 'text-orange-500' : 'text-orange-500'}`}>{formatPrice(pkg.price)}</span>
                      {pkg.originalPrice > 0 && pkg.originalPrice > pkg.price && (
                        <span className="text-xs font-bold text-neutral-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                      )}
                    </div>
                    {discount && discount > 0 && (
                      <span className={`mt-1 inline-block text-[10px] font-black ${popular ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        {t('You save', 'আপনি সাশ্রয় করবেন')} {formatPrice(pkg.originalPrice - pkg.price)}
                      </span>
                    )}
                  </div>

                  <div className={`mt-4 space-y-1.5 text-[10px] ${popular ? 'text-neutral-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    {pkg.delivery && <span className="flex items-center space-x-1.5"><Clock className="h-3 w-3 text-orange-500/80" /><span>{pkg.delivery}</span></span>}
                    {pkg.support && <span className="flex items-center space-x-1.5"><ShieldCheck className="h-3 w-3 text-orange-500/80" /><span>{pkg.support}</span></span>}
                  </div>

                  <ul className={`mt-5 space-y-2.5 flex-1`}>
                    {(pkg.features || []).slice(0, 8).map((f, j) => (
                      <li key={j} className="flex items-start space-x-2 text-[11px]">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${popular ? 'text-orange-500' : 'text-orange-500'}`} />
                        <span className={popular ? 'text-neutral-300' : 'text-neutral-600 dark:text-neutral-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {(pkg.includedServices || []).map((s) => {
                      const Icon = SERVICE_ICONS[s];
                      return Icon ? (
                        <span key={s} className={`inline-flex items-center space-x-1 rounded-md px-2 py-1 text-[9px] font-bold ${popular ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'}`}>
                          <Icon className="h-3 w-3" />
                          <span>{s.split(' ')[0]}</span>
                        </span>
                      ) : (
                        <span key={s} className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-[9px] font-bold text-neutral-500 dark:text-neutral-400"><span>{s.split(' ')[0]}</span></span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => openQuote('Web Development', pkg.name)}
                    className={`mt-6 w-full rounded-xl px-4 py-3.5 text-xs font-black transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 ${
                      popular
                        ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/25'
                        : 'bg-neutral-900 dark:bg-orange-500 text-white hover:bg-orange-500 dark:hover:bg-orange-400'
                    }`}
                  >
                    <span>{t('Choose Package', 'প্যাকেজ নির্বাচন করুন')}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              );
            })}
            {!configured && agencyList.length === 0 && (
              <div className="col-span-full">
                <EmptyState
                  title={t('Agency packages are coming soon', 'এজেন্সি প্যাকেজ শীঘ্রই আসছে')}
                  subtitle={t('Our all-in-one bundles are being finalized. Ask for a custom package and we will assemble the perfect service mix for your goals.', 'আমাদের অল-ইন-ওয়ান প্যাকেজ চূড়ান্ত করা হচ্ছে। কাস্টম প্যাকেজ চাইলে আমাদের জানান।')}
                  cta={t('Get a Custom Quote', 'কাস্টম কোটেশন নিন')}
                />
              </div>
            )}
          </div>
        </div>
      </div>



      {/* 4. INTERACTIVE BUDGET ESTIMATOR */}
      <div id="pricing-budget-calculator" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
            {t('BUDGET ESTIMATOR', 'বাজেট এস্টিমেটর')}
          </span>
          <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            {t('Build Your Own Estimate', 'নিজের এস্টিমেট তৈরি করুন')}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal max-w-2xl mx-auto">
            {t('Pick a base package and stack optional add-ons to see a live estimate — instantly, in your preferred currency.', 'একটি বেস প্যাকেজ বাছাই করে অ্যাড-অন যোগ করুন — সাথে সাথে সাজানো এস্টিমেট দেখুন।')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: options builder */}
          <div className="lg:col-span-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 md:p-8 space-y-6">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <Calculator className="h-5 w-5 text-orange-500" />
              </span>
              <div>
                <h3 className="text-sm font-black text-neutral-900 dark:text-white">{t('Step 1 — Choose your base', 'ধাপ ১ — বেস বেছে নিন')}</h3>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t('One-time project or a monthly retainer base.', 'এককালীন প্রজেক্ট বা মাসিক রিটেইনার বেস।')}</p>
              </div>
            </div>

            <div className="inline-flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/40 p-1">
              {(['project', 'monthly'] as const).map((tp) => (
                <button
                  key={tp}
                  onClick={() => setEstType(tp)}
                  className={`rounded-lg px-4 py-2 text-[11px] font-black transition-all duration-200 cursor-pointer ${estType === tp ? 'bg-orange-500 text-white shadow-sm' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
                >
                  {tp === 'project' ? t('One-Time Project', 'এককালীন প্রজেক্ট') : t('Monthly Retainer', 'মাসিক রিটেইনার')}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                {t('Select a package', 'প্যাকেজ নির্বাচন করুন')}
              </label>
              <select
                value={estBase?.id || ''}
                onChange={(e) => setEstBaseId(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-xs font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
              >
                {estBaseOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.service} — {estType === 'project' ? (opt as ProjectPricing).projectType : (opt as MonthlyPricing).planName} · {formatPrice(opt.price)}
                    {estType === 'project' ? ` /${t('project', 'প্রজেক্ট')}` : ` /${t('month', 'মাস')}`}
                  </option>
                ))}
              </select>
              {estBase && (
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  {estType === 'project' ? (estBase as ProjectPricing).delivery : (estBase as MonthlyPricing).description}
                </p>
              )}
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-800 pt-5">
              <div className="flex items-center space-x-2.5 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                  <Layers className="h-5 w-5 text-orange-500" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">{t('Step 2 — Stack add-ons', 'ধাপ ২ — অ্যাড-অন যোগ করুন')}</h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">{t('Optional extras, added straight to your estimate.', 'ঐচ্ছিক এক্সট্রা, সরাসরি এস্টিমেটে যোগ হয়ে যায়।')}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CALC_ADDONS.map((a) => {
                  const checked = chosenAddons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => setChosenAddons((list) => (checked ? list.filter((x) => x !== a.id) : [...list, a.id]))}
                      className={`flex items-start justify-between space-x-2 rounded-xl border px-3.5 py-3 text-left transition-all duration-200 cursor-pointer ${checked ? 'border-orange-500 bg-orange-500/5' : 'border-neutral-200 dark:border-neutral-700 hover:border-orange-500/40'}`}
                    >
                      <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-200 leading-snug">{a.label}</span>
                      <span className="shrink-0 flex items-center space-x-1.5">
                        <span className="text-[11px] font-black text-neutral-500 dark:text-neutral-400">{formatPrice(a.price)}</span>
                        <span className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${checked ? 'border-orange-500 bg-orange-500 text-white' : 'border-neutral-300 dark:border-neutral-600'}`}>
                          {checked && <Check className="h-3 w-3" />}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: live estimate display */}
          <div className="lg:col-span-2 sticky lg:top-24 rounded-2xl bg-neutral-950 p-6 md:p-8 text-white shadow-xl border border-neutral-800 space-y-6">
            <div className="flex items-center space-x-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15">
                <Wallet className="h-5 w-5 text-orange-500" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{t('LIVE ESTIMATE', 'লাইভ এস্টিমেট')}</p>
                <h3 className="text-sm font-black">
                  {t('Your estimated ', 'আপনার আনুমানিক ')}
                  <span className="text-orange-500">{estType === 'project' ? t('budget', 'বাজেট') : t('monthly cost', 'মাসিক খরচ')}</span>
                </h3>
              </div>
            </div>

            {estBase ? (
              <>
                <div className="space-y-3 border-t border-neutral-800 pt-5">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>{estType === 'project' ? (estBase as ProjectPricing).projectType : (estBase as MonthlyPricing).planName}</span>
                    <span className="font-black text-white text-[13px]">{formatPrice(estBase.price)}</span>
                  </div>
                  {estAddonItems.map((a) => (
                    <div key={a.id} className="flex items-start justify-between text-[11px] text-neutral-400 space-x-2">
                      <span className="flex items-center space-x-1.5"><span className="h-1.5 w-1.5 rounded-full bg-orange-500/70 shrink-0" />{a.label}</span>
                      <span className="font-bold text-neutral-200 shrink-0">+ {formatPrice(a.price)}</span>
                    </div>
                  ))}
                  {estAddonItems.length === 0 && (
                    <p className="text-[11px] text-neutral-600">{t('No add-ons selected yet.', 'এখনও কোনো অ্যাড-অন বাছাই করা হয়নি।')}</p>
                  )}
                </div>

                <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3.5 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-300">{t('Estimated Total', 'মোট আনুমানিক')}</span>
                  <span className="text-2xl font-black text-orange-500">{formatPrice(estTotal)}</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                  {t('The final quote may vary slightly with scope — our team confirms the exact price for free.', 'চূড়ান্ত কোট স্কোপ অনুযায়ী সামান্য পরিবর্তিত হতে পারে — দলটি বিনামূল্যে সঠিক দাম নিশ্চিত করে।')}
                </p>
                <button
                  onClick={() => openQuote(
                    estBase.service,
                    (estType === 'project' ? (estBase as ProjectPricing).projectType : (estBase as MonthlyPricing).planName) + (estAddonItems.length ? ` + ${estAddonItems.length} add-on(s)` : '')
                  )}
                  className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 px-5 py-3.5 text-xs font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>{t('Request This Estimate', 'এই এস্টিমেটটি চাই')}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <p className="text-[11px] text-neutral-500 border-t border-neutral-800 pt-5">
                {t('No packages available yet — request a custom quote below.', 'এখনও কোনো প্যাকেজ নেই — নিচে কাস্টম কোটের রিকোয়েস্ট করুন।')}
              </p>
            )}

            <div className="flex items-center space-x-2 pt-1 border-t border-neutral-800">
              <BadgeCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <p className="text-[10px] text-neutral-400">{t('No obligation — estimates are free and answered within 24 hours.', 'কোনো বাধ্যবাধকতা নেই — এস্টিমেট ফ্রি, ২৪ ঘণ্টার মধ্যে রিপ্লাই।')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FEATURE COMPARISON MATRIX */}
      <div id="pricing-comparison-matrix" className="bg-white dark:bg-[#141414] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('COMPARE & CHOOSE', 'তুলনা করুন ও বেছে নিন')}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t('Feature Comparison Matrix', 'ফিচার তুলনা ম্যাট্রিক্স')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal max-w-2xl mx-auto">
              {t('See how the flagship offers stack up side by side — pricing, delivery, support and scope at a glance.', 'প্রধান অফারগুলো পাশাপাশি দেখুন — দাম, ডেলিভারি, সাপোর্ট ও স্কোপ এক নজরে।')}
            </p>
          </div>

          {agencyList.filter((p) => p.enabled !== false).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-[#141414]/60 p-10 text-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('No comparison data yet — request a custom quote below.', 'তুলনার জন্য এখনও ডেটা নেই — নিচে কাস্টম কোটের রিকোয়েস্ট করুন।')}</p>
              <button onClick={scrollToQuote} className="mt-5 inline-flex items-center space-x-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer">
                <span>{t('Get a Custom Quote', 'কাস্টম কোটেশন নিন')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full min-w-[880px] border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="min-w-[220px] text-left align-bottom px-4 pb-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                      {t('Feature', 'ফিচার')}
                    </th>
                    {agencyList.filter((p) => p.enabled !== false).slice(0, 5).map((pkg) => {
                      const popular = pkg.mostPopular;
                      return (
                        <th
                          key={pkg.id}
                          className={`px-4 pb-4 align-bottom rounded-t-2xl border ${popular ? 'bg-orange-500/10 border-orange-500/40' : 'border-transparent'}`}
                        >
                          <div className="text-left">
                            {popular && (
                              <span className="inline-block mb-1.5 rounded-full bg-orange-500 px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">
                                {t('MOST POPULAR', 'সবচেয়ে জনপ্রিয়')}
                              </span>
                            )}
                            <p className="text-xs font-black text-neutral-900 dark:text-white">{pkg.name}</p>
                            <p className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">{pkg.tagline}</p>
                            <p className="mt-2 text-lg font-black text-orange-500">{formatPrice(pkg.price)}</p>
                            {pkg.originalPrice > 0 && pkg.originalPrice > pkg.price && (
                              <p className="text-[10px] font-bold text-neutral-400 line-through">{formatPrice(pkg.originalPrice)}</p>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {(['delivery', 'support', 'scope', 'features'] as const).map((rowKey) => (
                    <tr key={rowKey}>
                      <td className="px-4 py-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        {rowKey === 'delivery' ? t('Delivery', 'ডেলিভারি') : rowKey === 'support' ? t('Support', 'সাপোর্ট') : rowKey === 'scope' ? t('Services Included', 'অন্তর্ভুক্ত সেবা') : t('Features', 'ফিচার')}
                      </td>
                      {agencyList.filter((p) => p.enabled !== false).slice(0, 5).map((pkg) => {
                        const popular = pkg.mostPopular;
                        const tdCls = `px-4 py-4 border-t align-top ${popular ? 'bg-orange-500/[0.04] border-orange-500/30' : 'border-neutral-100 dark:border-neutral-800'}`;
                        if (rowKey === 'delivery') {
                          return <td key={pkg.id} className={tdCls}><span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-200">{pkg.delivery || '—'}</span></td>;
                        }
                        if (rowKey === 'support') {
                          return <td key={pkg.id} className={tdCls}><span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-200">{pkg.support || '—'}</span></td>;
                        }
                        if (rowKey === 'scope') {
                          return (
                            <td key={pkg.id} className={tdCls}>
                              <div className="flex flex-wrap gap-1">
                                {(pkg.includedServices || []).map((s) => (
                                  <span key={s} className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[9px] font-bold text-neutral-600 dark:text-neutral-300">{s.split(' ')[0]}</span>
                                ))}
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td key={pkg.id} className={tdCls}>
                            <ul className="space-y-1">
                              {(pkg.features || []).slice(0, 4).map((f, j) => (
                                <li key={j} className="flex items-start space-x-1.5 text-[10px] text-neutral-600 dark:text-neutral-300">
                                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 pt-4" />
                    {agencyList.filter((p) => p.enabled !== false).slice(0, 5).map((pkg) => {
                      const popular = pkg.mostPopular;
                      return (
                        <td key={pkg.id} className={`px-4 pt-4 ${popular ? 'bg-orange-500/[0.04]' : ''}`}>
                          <button
                            onClick={() => openQuote('Web Development', pkg.name)}
                            className={`w-full rounded-xl px-3 py-2.5 text-[11px] font-black transition-all duration-300 cursor-pointer ${popular ? 'bg-orange-500 text-white hover:bg-orange-400' : 'bg-neutral-900 dark:bg-orange-500 text-white hover:bg-orange-500 dark:hover:bg-orange-400'}`}
                          >
                            {t('Select', 'নির্বাচন')}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 6. CUSTOM QUOTE FORM */}
      <div id="pricing-quote-form-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 lg:sticky lg:top-24">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('GET A FREE CUSTOM QUOTE', 'ফ্রি কাস্টম কোটেশন নিন')}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t('Tell Us About Your Project', 'আপনার প্রজেক্টের কথা বলুন')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
              {t(
                'Share your goals and we will send a tailored proposal — scope, deliverables, timeline and a fixed price — within 24 hours. In Bengali',
                'আপনার লক্ষ্য জানান — আমরা ২৪ ঘণ্টার মধ্যে সুসংগঠিত প্রস্তাব পাঠাবো (স্কোপ, ডেলিভারেবল, টাইমলাইন ও নির্দিষ্ট দামসহ)।'
              )}
            </p>
            <div className="space-y-3">
              {[
                t('Free estimate, no obligation', 'ফ্রি এস্টিমেট, কোনো বাধ্যবাধকতা নেই'),
                t('Reply within 24 hours on working days', 'কাজের দিনে ২৪ ঘণ্টার মধ্যে রিপ্লাই'),
                t('No hidden fees — the quoted price is the price', 'লুকানো চার্জ নেই — উদ্ধৃত দামই চূড়ান্ত দাম'),
                t('100% confidential project details', '১০০% গোপনীয় প্রজেক্টের তথ্য'),
              ].map((text) => (
                <div key={text} className="flex items-center space-x-2.5 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 px-4 py-3">
                  <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-200">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-neutral-400 dark:text-neutral-500">
              <CalendarClock className="h-4 w-4 shrink-0" />
              <span>{t('Prefer WhatsApp? Our team is available on live chat.', 'হোয়াটসঅ্যাপ পছন্দ করেন? লাইভ চ্যাটেও আমরা আছি।')}</span>
            </div>
          </div>

          <QuoteFormSection currentLang={currentLang} fallbackSave={(q) => addPricingQuote(q)} />
        </div>
      </div>

      {/* 7. WHY CHOOSE NEXT SOLUTION */}
      <div id="pricing-why-us" className="bg-neutral-50/80 dark:bg-black/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('UNCOMPROMISING STANDARDS', 'আমাদের অনন্য মানদণ্ড')}
            </span>
            <h2 className="font-sans text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t('Designed for Absolute Integrity', 'ডিজাইন করা হয়েছে স্বচ্ছতা ও সততার সাথে')}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
              {t('Why top international brands and high-growth startups confidently partner with Next Solution.', 'যে কারণে শীর্ষ আন্তর্জাতিক ব্র্যান্ড এবং দ্রুত বর্ধনশীল স্টার্টআপগুলো আমাদের উপর আস্থা রাখে।')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {getWhyChooseUsCards()
              .filter((c) => c.visible !== false)
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .slice(0, 6)
              .map((card: WhyChooseUsCard) => {
                const Icon = WHY_ICONS[card.icon?.toLowerCase()] || Sparkles;
                const title = currentLang === 'en' ? card.titleEn : card.titleBn;
                const desc = (currentLang === 'en' ? card.descEn || card.descriptionEn : card.descBn || card.descriptionBn) || '';
                const badge = currentLang === 'en' ? card.badgeTextEn : card.badgeTextBn;
                return (
                  <div key={card.id} className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 rounded-2xl space-y-4 hover:border-orange-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                        <Icon className="h-5 w-5 text-orange-500" />
                      </span>
                      {badge && (
                        <span className="rounded-full bg-orange-500/10 border border-orange-500/30 px-2.5 py-1 text-[9px] font-black text-orange-500">{badge}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{title}</h3>
                    {desc && <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* 8. TESTIMONIALS */}
      <div id="pricing-testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-3 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('CLIENT SUCCESS STORIES', 'গ্রাহক পর্যালোচনা')}
            </span>
            <h2 className="font-sans text-2xl font-black text-neutral-900 dark:text-white tracking-tight sm:text-3xl">
              {t('Praise From Trusted Partners', 'আমাদের প্রতি তাদের আস্থা ও ভালোবাসা')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {getTestimonials()
              .slice(0, 6)
              .map((test) => (
                <div key={test.id} className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 rounded-3xl space-y-4">
                  <Quote className="h-5 w-5 text-orange-500/40" />
                  <div className="flex space-x-1">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                    "{t(test.feedbackEn, test.feedbackBn)}"
                  </p>
                  <div className="flex items-center space-x-3.5 pt-2">
                    {test.avatar ? (
                      <img src={test.avatar} className="h-10 w-10 rounded-full border object-cover" alt={test.name} />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-black text-sm">{test.name?.[0] || 'T'}</span>
                    )}
                    <div>
                      <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">{test.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide mt-0.5">
                        {t(test.roleEn, test.roleBn)}, {test.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 9. FAQS */}
      <div id="pricing-faqs" className="bg-white dark:bg-[#141414] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              {t('COMMON QUESTIONS', 'সাধারণ জিজ্ঞাসাসমূহ')}
            </span>
            <h2 className="font-sans text-2xl font-black text-neutral-900 dark:text-white tracking-tight sm:text-3xl">
              {t('Frequently Asked Questions', 'পেমেন্ট ও পিরিয়ড সংক্রান্ত প্রশ্নোত্তর')}
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const id = (faq as any).id || `faq-${idx}`;
              const isOpen = activeFaqId === id;
              const question = (faq as any).questionEn || (faq as any).question;
              const answer = (faq as any).answerEn || (faq as any).answer;
              return (
                <div key={id} className="border border-neutral-200/90 rounded-2xl overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : id)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-neutral-900 dark:text-white hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 cursor-pointer bg-transparent border-none outline-none"
                  >
                    <span>{question}</span>
                    <ChevronDown className={`h-4.5 w-4.5 text-neutral-400 dark:text-neutral-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-50 dark:border-neutral-800 bg-neutral-50/20">
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

      {/* 10. FINAL CTA */}
      <div id="pricing-final-cta" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl bg-neutral-950 p-8 md:p-16 text-center text-white overflow-hidden shadow-xl border border-neutral-800">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {t('Launch Your Digital Breakthrough', 'আপনার নতুন ডিজিটাল মাইলস্টোন শুরু করুন')}
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-lg mx-auto">
              {t(
                'Join force with our senior engineers and elite designer squads to synthesize the digital product of your dream.',
                'আজই আমাদের সিনিয়র ইঞ্জিনিয়ার ও ডিজাইনারদের সাথে যুক্ত হয়ে আপনার স্বপ্নের ডিজিটাল প্রজেক্ট চালু করুন।'
              )}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-xl bg-orange-500 hover:bg-orange-400 font-bold px-7 py-4 text-xs text-white shadow-lg shadow-orange-500/15 cursor-pointer border-none outline-none transition-all duration-300"
              >
                {t('Contact Solutions Specialist', 'বিশেষজ্ঞের পরামর্শ নিন')}
              </button>
              <button
                onClick={scrollToQuote}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-orange-500/40 text-white font-semibold px-7 py-4 text-xs cursor-pointer transition-all duration-300"
              >
                {t('Get a Custom Quote', 'কাস্টম কোটেশন পাঠান')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal
        open={quoteModal.open}
        service={quoteModal.service}
        planLabel={quoteModal.planLabel}
        currentLang={currentLang}
        onClose={() => setQuoteModal((m) => ({ ...m, open: false }))}
        fallbackSave={(quote) => addPricingQuote(quote)}
      />

    </section>
  );
}

interface InquiryModalProps {
  open: boolean;
  service: string;
  planLabel?: string;
  currentLang: 'en' | 'bn';
  onClose: () => void;
  fallbackSave: (quote: Omit<PricingQuoteRequest, 'id' | 'createdAt' | 'status'>) => PricingQuoteRequest;
}

function InquiryModal({ open, service, planLabel, currentLang, onClose, fallbackSave }: InquiryModalProps) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', industry: '',
    service, budget: '$1,000 - $5,000', timeline: 'Within 2 weeks', description: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service }));
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const payload = {
        ...form,
        service: planLabel ? `${form.service} — ${planLabel}` : form.service,
      };
      const res = await fetch('/api/pricing/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Failed to send');
      setStatus('success');
    } catch (err: any) {
      // Fallback: keep the inquiry in localStorage so it still reaches the team.
      try {
        fallbackSave({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          industry: form.industry,
          service: planLabel ? `${form.service} — ${planLabel}` : form.service,
          budget: form.budget,
          timeline: form.timeline,
          description: form.description,
        });
        setStatus('success');
      } catch {
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    }
  };

  const inputCls =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-neutral-100 dark:bg-neutral-800 p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {status === 'success' ? (
              <div className="p-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
                  <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-base font-black text-neutral-900 dark:text-white">
                  {currentLang === 'en' ? 'Request received!' : 'রিকোয়েস্ট গৃহীত হয়েছে!'}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {currentLang === 'en'
                    ? 'Our team will review your project details and get back to you within 24 hours with a tailored estimate.'
                    : 'আমাদের টিম আপনার প্রজেক্টের বিবরণ দেখে ২৪ ঘণ্টার মধ্যে কাস্টম এস্টিমেটসহ যোগাযোগ করবে।'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-xs font-bold text-white cursor-pointer"
                >
                  {currentLang === 'en' ? 'Done' : 'সম্পন্ন'}
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-neutral-100 dark:border-neutral-800 px-7 py-5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-500">
                    {currentLang === 'en' ? 'Pricing Inquiry' : 'প্রাইসিং ইনকোয়ারি'}
                  </span>
                  <h3 className="mt-1 text-lg font-black text-neutral-900 dark:text-white">
                    {currentLang === 'en' ? 'Get a Custom Quote' : 'কাস্টম কোটেশন নিন'}
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {planLabel
                      ? currentLang === 'en' ? `Interested in: ${planLabel}` : `আগ্রহী: ${planLabel}`
                      : currentLang === 'en' ? `Service: ${service}` : `সেবা: ${service}`}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Phone</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" className={inputCls} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Company</label>
                      <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company" className={inputCls} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Industry</label>
                    <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="e.g. E-Commerce, Healthcare, SaaS" className={inputCls} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Budget Range</label>
                      <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputCls}>
                        {['< $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Timeline</label>
                      <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={inputCls}>
                        {['ASAP', 'Within 2 weeks', 'Within a month', '1-3 months', 'Not sure yet'].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-neutral-500 dark:text-neutral-400">Project Details</label>
                    <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell us briefly about your goals, scope and any special requirements..." className={inputCls} />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start space-x-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-2.5 text-[11px] text-red-600 dark:text-red-400">
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-3.5 text-xs font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>{currentLang === 'en' ? 'Send Inquiry' : 'ইনকোয়ারি পাঠান'}</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface QuoteFormSectionProps {
  currentLang: 'en' | 'bn';
  fallbackSave: (quote: Omit<PricingQuoteRequest, 'id' | 'createdAt' | 'status'>) => PricingQuoteRequest;
}

function QuoteFormSection({ currentLang, fallbackSave }: QuoteFormSectionProps) {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    service: string;
    engagement: string;
    budget: string;
    timeline: string;
    description: string;
  }>({
    name: '', email: '', phone: '', company: '', industry: '',
    service: SERVICES[0], engagement: 'One-Time Project', budget: '$1,000 - $5,000', timeline: 'Within 2 weeks', description: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const payload = {
        ...form,
        service: `${form.service} (${form.engagement})`,
      };
      const res = await fetch('/api/pricing/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Failed to send');
      setStatus('success');
    } catch (err: any) {
      try {
        fallbackSave({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          industry: form.industry,
          service: `${form.service} (${form.engagement})`,
          budget: form.budget,
          timeline: form.timeline,
          description: form.description,
        });
        setStatus('success');
      } catch {
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    }
  };

  const inputCls =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30';
  const labelCls = 'block text-[10px] font-bold text-neutral-500 dark:text-neutral-400';
  const en = currentLang === 'en';

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-8 md:p-10 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
          <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-base font-black text-neutral-900 dark:text-white">{en ? 'Request received!' : 'রিকোয়েস্ট গৃহীত হয়েছে!'}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm mx-auto">
          {en
            ? 'Our team will review your project details and get back to you within 24 hours with a tailored estimate.'
            : 'আমাদের টিম আপনার প্রজেক্টের বিবরণ দেখে ২৪ ঘণ্টার মধ্যে কাস্টম এস্টিমেটসহ যোগাযোগ করবে।'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-xs font-bold text-white cursor-pointer"
        >
          {en ? 'Send Another Request' : 'আরেকটি রিকোয়েস্ট পাঠান'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 md:p-8 space-y-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={en ? 'Your full name' : 'আপনার পুরো নাম'} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Email *</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>{en ? 'Phone' : 'ফোন'}</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+880 1XXX-XXXXXX" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>{en ? 'Company' : 'কোম্পানি'}</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={en ? 'Your company' : 'আপনার কোম্পানি'} className={inputCls} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>{en ? 'Industry' : 'ইন্ডাস্ট্রি'}</label>
        <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder={en ? 'e.g. E-Commerce, Healthcare, SaaS' : 'যেমন: ই-কমার্স, হেলথকেয়ার, SaaS'} className={inputCls} />
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>{en ? 'Service you are interested in' : 'আগ্রহী সেবা'}</label>
        <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls}>
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>{en ? 'Engagement type' : 'কাজের ধরন'}</label>
        <div className="grid grid-cols-2 gap-2">
          {['One-Time Project', 'Monthly Retainer', 'Agency Package', 'Not Sure Yet'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm({ ...form, engagement: opt })}
              className={`rounded-lg border px-3 py-2.5 text-[11px] font-bold transition-all duration-200 cursor-pointer ${form.engagement === opt ? 'border-orange-500 bg-orange-500/5 text-orange-600 dark:text-orange-400' : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-orange-500/40'}`}
            >
              {en ? opt : opt === 'One-Time Project' ? 'এককালীন প্রজেক্ট' : opt === 'Monthly Retainer' ? 'মাসিক রিটেইনার' : opt === 'Agency Package' ? 'এজেন্সি প্যাকেজ' : 'নিশ্চিত নই'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className={labelCls}>{en ? 'Budget Range' : 'বাজেট রেঞ্জ'}</label>
          <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputCls}>
            {['< $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>{en ? 'Timeline' : 'টাইমলাইন'}</label>
          <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={inputCls}>
            {['ASAP', 'Within 2 weeks', 'Within a month', '1-3 months', 'Not sure yet'].map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelCls}>{en ? 'Project Details' : 'প্রজেক্টের বিবরণ'} *</label>
        <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={en ? 'Tell us about your goals, scope and any special requirements...' : 'আপনার লক্ষ্য, স্কোপ এবং বিশেষ প্রয়োজনীয়তার কথা জানান...'} className={inputCls} />
      </div>

      {status === 'error' && (
        <div className="flex items-start space-x-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-2.5 text-[11px] text-red-600 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center space-x-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-4 text-xs font-black text-white shadow-lg shadow-orange-500/20 transition-all duration-300 cursor-pointer"
      >
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span>{en ? 'Send Free Quote Request' : 'ফ্রি কোটেশন রিকোয়েস্ট পাঠান'}</span>
      </button>

      <p className="text-center text-[10px] text-neutral-400 dark:text-neutral-500">
        {en ? 'We reply within 24 hours on working days. Your details stay confidential.' : 'কাজের দিনে ২৪ ঘণ্টার মধ্যে রিপ্লাই পাবেন। আপনার তথ্য গোপন থাকবে।'}
      </p>
    </form>
  );
}
