"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getLocalItem, setLocalItem } from '@/lib/utils';
import { translations } from '@/data/translations';
import { adminDB } from '@/lib/admin-fetch';
import { 
  ContactMessage, Subscriber, BlogPost, Service, SiteSettings, PortfolioItem, FAQ, Testimonial,
  PricingPackage, PricingAddon, PricingComparison, PricingQuoteRequest, Currency, CurrencySettings,
  TestimonialCategory, TestimonialVideo, TestimonialStatistics, ClientLogo, SuccessStory, ReviewSettings,
  WhyChooseUsCard, WhyChooseUsStat, WhyChooseUsBadge, WhyChooseUsTech, WhyChooseUsCTA,
  ProcessStep, ProcessCTA, TechServiceCard
} from '@/types';

import AdminLegalCMS from '@/components/AdminLegalCMS';
import AdminProductsCMS from '@/components/AdminProductsCMS';

import { 
  Lock as LockIcon, CheckCircle2 as CheckCircle2Icon, Trash2 as Trash2Icon, Mail as MailIcon, Users as UsersIcon, BookOpen as BookOpenIcon, Settings as SettingsIcon, 
  RotateCcw as RotateCcwIcon, Sparkles as SparklesIcon, Plus as PlusIcon, Edit2 as Edit2Icon, BarChart3 as BarChart3Icon, FolderKanban as FolderKanbanIcon, 
  DollarSign as DollarSignIcon, HelpCircle as HelpCircleIcon, MessageSquare as MessageSquareIcon, UserCheck as UserCheckIcon, Image as ImageIcon, Shield as ShieldIcon,
  Search as SearchIcon, Eye as EyeIcon, ArrowUpRight as ArrowUpRightIcon, Cpu as CpuIcon, ShoppingBag as ShoppingBagIcon
} from 'lucide-react';

interface AdminPanelProps {
  currentLang: 'en' | 'bn';
}

export default function AdminPanel({ currentLang }: AdminPanelProps) {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'messages' | 'subscribers' | 'blogs' | 'services' | 'portfolio' | 'pricing' | 'faqs' | 'testimonials' | 'team' | 'media' | 'settings' | 'users' | 'legal' | 'whychooseus' | 'process' | 'techstack' | 'products'>('overview');

  // PROCESS WORKFLOW CMS STATE
  const [processSteps, setProcessStepsState] = useState<ProcessStep[]>([]);
  const [processCTA, setProcessCTAState] = useState<ProcessCTA | null>(null);

  const [editingProcessStep, setEditingProcessStep] = useState<ProcessStep | null>(null);
  const [isCreatingProcessStep, setIsCreatingProcessStep] = useState(false);
  const [processStepForm, setProcessStepForm] = useState<Partial<ProcessStep>>({
    stepNumber: '1',
    titleEn: '',
    titleBn: '',
    descriptionEn: '',
    descriptionBn: '',
    icon: '💡',
    estimatedDurationEn: '',
    estimatedDurationBn: '',
    deliverablesEn: [],
    deliverablesBn: [],
    toolsUsed: [],
    displayOrder: 1,
    visible: true
  });

  const [processCTAForm, setProcessCTAForm] = useState<Partial<ProcessCTA>>({
    titleEn: '',
    titleBn: '',
    highlightEn: '',
    highlightBn: '',
    subtitleEn: '',
    subtitleBn: '',
    ctaHeadlineEn: '',
    ctaHeadlineBn: '',
    ctaSubtitleEn: '',
    ctaSubtitleBn: '',
    ctaPrimaryTextEn: '',
    ctaPrimaryTextBn: '',
    ctaSecondaryTextEn: '',
    ctaSecondaryTextBn: ''
  });

  const [processSubTab, setProcessSubTab] = useState<'steps' | 'cta'>('steps');

  // WHY CHOOSE US CMS STATE
  const [whyChooseUsCards, setWhyChooseUsCardsState] = useState<WhyChooseUsCard[]>([]);
  const [whyChooseUsStats, setWhyChooseUsStatsState] = useState<WhyChooseUsStat[]>([]);
  const [whyChooseUsBadges, setWhyChooseUsBadgesState] = useState<WhyChooseUsBadge[]>([]);
  const [whyChooseUsTechs, setWhyChooseUsTechsState] = useState<WhyChooseUsTech[]>([]);
  const [whyChooseUsCTA, setWhyChooseUsCTAState] = useState<WhyChooseUsCTA | null>(null);

  // Edit / Create States for Why Choose Us
  const [editingWhyCard, setEditingWhyCard] = useState<WhyChooseUsCard | null>(null);
  const [isCreatingWhyCard, setIsCreatingWhyCard] = useState(false);
  const [whyCardForm, setWhyCardForm] = useState<Partial<WhyChooseUsCard>>({
    titleEn: '', titleBn: '', descriptionEn: '', descriptionBn: '', icon: 'Sparkles', categoryEn: '', categoryBn: '', badgeTextEn: '', badgeTextBn: '', displayOrder: 1, visible: true
  });

  const [editingWhyStat, setEditingWhyStat] = useState<WhyChooseUsStat | null>(null);
  const [isCreatingWhyStat, setIsCreatingWhyStat] = useState(false);
  const [whyStatForm, setWhyStatForm] = useState<Partial<WhyChooseUsStat>>({
    value: '', labelEn: '', labelBn: '', displayOrder: 1, visible: true
  });

  const [editingWhyBadge, setEditingWhyBadge] = useState<WhyChooseUsBadge | null>(null);
  const [isCreatingWhyBadge, setIsCreatingWhyBadge] = useState(false);
  const [whyBadgeForm, setWhyBadgeForm] = useState<Partial<WhyChooseUsBadge>>({
    labelEn: '', labelBn: '', displayOrder: 1, visible: true
  });

  const [editingWhyTech, setEditingWhyTech] = useState<WhyChooseUsTech | null>(null);
  const [isCreatingWhyTech, setIsCreatingWhyTech] = useState(false);
  const [whyTechForm, setWhyTechForm] = useState<Partial<WhyChooseUsTech>>({
    name: '', logoUrl: '', displayOrder: 1, visible: true
  });

  const [whyCTAForm, setWhyCTAForm] = useState<Partial<WhyChooseUsCTA>>({
    taglineEn: '', taglineBn: '', headlineEn: '', headlineBn: '', descriptionEn: '', descriptionBn: '', primaryButtonTextEn: '', primaryButtonTextBn: '', secondaryButtonTextEn: '', secondaryButtonTextBn: ''
  });

  const [whyChooseUsSubTab, setWhyChooseUsSubTab] = useState<'cards' | 'stats' | 'badges' | 'techs' | 'cta'>('cards');

  // TECH STACK CMS STATE
  const [techServiceCards, setTechServiceCardsState] = useState<TechServiceCard[]>([]);
  const [editingTechServiceCard, setEditingTechServiceCard] = useState<TechServiceCard | null>(null);
  const [isCreatingTechServiceCard, setIsCreatingTechServiceCard] = useState(false);
  const [techServiceCardForm, setTechServiceCardForm] = useState<Partial<TechServiceCard>>({
    icon: 'Globe',
    categoryEn: '',
    categoryBn: '',
    descriptionEn: '',
    descriptionBn: '',
    technologies: [],
    projectCount: '',
    popularProjectsEn: [],
    popularProjectsBn: [],
    benefitsEn: [],
    benefitsBn: [],
    experienceLevelEn: '',
    experienceLevelBn: '',
    featuredBadgeEn: '',
    featuredBadgeBn: '',
    displayOrder: 1,
    visible: true,
    animationType: 'fade'
  });

  // Database lists state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Expanded Modules lists state
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);

  // Success toast/banner notice
  const [successNotice, setSuccessNotice] = useState('');

  // Edit / Create States for Blog
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  
  // Edit States for Service
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Edit / Create States for Portfolios
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);

  // Edit / Create States for FAQs
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isCreatingFAQ, setIsCreatingFAQ] = useState(false);

  // Edit / Create States for Testimonials
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);

  // Edit / Create States for Pricing plans
  const [editingPricingPlan, setEditingPricingPlan] = useState<any | null>(null);
  const [isCreatingPricingPlan, setIsCreatingPricingPlan] = useState(false);

  // Edit / Create States for Team Members
  const [editingTeamMember, setEditingTeamMember] = useState<any | null>(null);
  const [isCreatingTeamMember, setIsCreatingTeamMember] = useState(false);

  // Edit / Create States for User Management
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Media Library state controls
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaCategory, setMediaCategory] = useState('all');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaGroup, setNewMediaGroup] = useState('portfolio');

  // Form states for Blog creation/edit
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    titleEn: '', titleBn: '', excerptEn: '', excerptBn: '', contentEn: '', contentBn: '',
    categoryEn: 'Technology', categoryBn: 'প্রযুক্তি', tags: [], image: '', author: '', readTime: '', status: 'draft'
  });

  // Form states for Portfolio
  const [portfolioForm, setPortfolioForm] = useState<Partial<PortfolioItem>>({
    titleEn: '', titleBn: '', category: 'Web Development', duration: '3 Months', budget: '$15,000',
    descriptionEn: '', descriptionBn: '', client: '', challengeEn: '', challengeBn: '',
    solutionEn: '', solutionBn: '', resultEn: '', resultBn: '', technologies: [], image: '', featured: false,
    projectType: '', projectDate: '', appStoreUrl: '', playStoreUrl: '', thumbnailImage: ''
  });

  // Form states for FAQs
  const [faqForm, setFaqForm] = useState<Partial<FAQ>>({
    categoryEn: 'General', categoryBn: 'সাধারণ', questionEn: '', questionBn: '', answerEn: '', answerBn: '', helpfulCount: 0
  });

  // Form states for Testimonials
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    name: '', roleEn: '', roleBn: '', company: '', feedbackEn: '', feedbackBn: '', rating: 5, avatar: ''
  });

  // Form states for Pricing plans
  const [pricingPlanForm, setPricingPlanForm] = useState<any>({
    nameEn: '', nameBn: '', priceEn: '', priceBn: '', periodEn: 'month', periodBn: 'মাস',
    badgeEn: '', badgeBn: '', featuresEn: [], featuresBn: [], buttonTextEn: 'Get Started', buttonTextBn: 'শুরু করুন'
  });

  // State arrays for granular pricing entities
  const [pricingPackages, setPricingPackages] = useState<PricingPackage[]>([]);
  const [pricingAddons, setPricingAddons] = useState<PricingAddon[]>([]);
  const [pricingComparisons, setPricingComparisons] = useState<PricingComparison[]>([]);
  const [pricingQuotes, setPricingQuotes] = useState<PricingQuoteRequest[]>([]);
  
  // Currencies State
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currencySettings, setCurrencySettingsState] = useState<CurrencySettings>({
    enableLiveRates: true,
    decimalPrecision: 0,
    defaultCurrencyCode: 'USD'
  });
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);
  const [isCreatingCurrency, setIsCreatingCurrency] = useState(false);
  const [currencyForm, setCurrencyForm] = useState<Partial<Currency>>({
    name: '', code: '', symbol: '', flag: '', exchangeRate: 1.0, enabled: true, isDefault: false, sortOrder: 0
  });

  // Sub-tab selection for Pricing inside admin panel
  const [pricingSubTab, setPricingSubTab] = useState<'packages' | 'addons' | 'comparisons' | 'quotes' | 'currencies'>('packages');

  // New Testimonials Entities States
  const [testimonialVideos, setTestimonialVideos] = useState<TestimonialVideo[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [testimonialStatistics, setTestimonialStatistics] = useState<TestimonialStatistics | null>(null);
  const [reviewSettings, setReviewSettings] = useState<ReviewSettings | null>(null);

  // Sub-tab for testimonials admin panel
  const [testimonialsSubTab, setTestimonialsSubTab] = useState<'reviews' | 'videos' | 'stories' | 'logos' | 'stats_settings'>('reviews');

  // Edit / Create states for Videos
  const [editingVideo, setEditingVideo] = useState<TestimonialVideo | null>(null);
  const [isCreatingVideo, setIsCreatingVideo] = useState(false);
  const [videoForm, setVideoForm] = useState<Partial<TestimonialVideo>>({
    titleEn: '', titleBn: '', clientName: '', company: '', avatar: '', rating: 5, videoUrl: '', thumbnailUrl: '', shortDescriptionEn: '', shortDescriptionBn: '', featured: true, displayOrder: 1
  });

  // Edit / Create states for Success Stories
  const [editingSuccessStory, setEditingSuccessStory] = useState<SuccessStory | null>(null);
  const [isCreatingSuccessStory, setIsCreatingSuccessStory] = useState(false);
  const [successStoryForm, setSuccessStoryForm] = useState<Partial<SuccessStory>>({
    clientName: '', companyName: '', industryEn: '', industryBn: '', serviceEn: '', serviceBn: '', backgroundEn: '', backgroundBn: '', challengeEn: '', challengeBn: '', solutionEn: '', solutionBn: '', technologies: [], timelineEn: '', timelineBn: '', resultsEn: '', resultsBn: '', beforeImage: '', afterImage: '', clientQuoteEn: '', clientQuoteBn: '', clientRoleEn: '', clientRoleBn: '', clientPhoto: '', featured: true, displayOrder: 1
  });

  // Edit / Create states for Client Logos
  const [editingClientLogo, setEditingClientLogo] = useState<ClientLogo | null>(null);
  const [isCreatingClientLogo, setIsCreatingClientLogo] = useState(false);
  const [clientLogoForm, setClientLogoForm] = useState<Partial<ClientLogo>>({
    name: '', logoUrl: '', featured: true, displayOrder: 1
  });

  // Edit / Create States for Pricing Packages
  const [editingPricingPackage, setEditingPricingPackage] = useState<PricingPackage | null>(null);
  const [isCreatingPricingPackage, setIsCreatingPricingPackage] = useState(false);

  // Edit / Create States for Pricing Addons
  const [editingPricingAddon, setEditingPricingAddon] = useState<PricingAddon | null>(null);
  const [isCreatingPricingAddon, setIsCreatingPricingAddon] = useState(false);

  // Edit / Create States for Pricing Comparisons
  const [editingPricingComparison, setEditingPricingComparison] = useState<PricingComparison | null>(null);
  const [isCreatingPricingComparison, setIsCreatingPricingComparison] = useState(false);

  // Forms
  const [pricingPackageForm, setPricingPackageForm] = useState<Partial<PricingPackage>>({
    category: 'Agency Packages',
    nameEn: '', nameBn: '',
    priceMonthly: 0, priceYearly: 0,
    descriptionEn: '', descriptionBn: '',
    featuresEn: [], featuresBn: [],
    notIncludedEn: [], notIncludedBn: [],
    ctaEn: 'Get Started', ctaBn: 'শুরু করুন',
    popular: false, enabled: true, sortOrder: 0,
    badgeEn: '', badgeBn: '', techEn: ''
  });

  const [pricingAddonForm, setPricingAddonForm] = useState<Partial<PricingAddon>>({
    nameEn: '', nameBn: '', price: '', descriptionEn: '', descriptionBn: '', category: 'Core Service', enabled: true
  });

  const [pricingComparisonForm, setPricingComparisonForm] = useState<Partial<PricingComparison>>({
    featureEn: '', featureBn: '',
    starterEn: '', starterBn: '',
    businessEn: '', businessBn: '',
    enterpriseEn: '', enterpriseBn: '',
    categoryEn: 'Core Deliverables', categoryBn: 'প্রধান ডেলিভারিবল',
    sortOrder: 0
  });

  // Form states for Team Members
  const [teamMemberForm, setTeamMemberForm] = useState<any>({
    name: '', roleEn: '', roleBn: '', departmentEn: 'Management', departmentBn: 'ব্যবস্থাপনা',
    avatar: '', email: '', linkedin: '', bioEn: '', bioBn: ''
  });

  // Form states for Admin Users
  const [userForm, setUserForm] = useState<any>({
    username: '', password: '', role: 'Editor', status: 'active', email: ''
  });

  // Helper to safely get flag
  const currFlag = (c: any) => c?.flag || '🏳️';

  // Load Admin Data from central simulated DB with auxiliary loaders
  const loadAdminData = async () => {
    try {
    const msgs = await adminDB.getAllMessages(); setMessages(msgs || []);
    const subs = await adminDB.getAllSubscribers(); setSubscribers(subs || []);
    const blgs = await adminDB.getAllBlogs(); setBlogs(blgs || []);
    const svcs = await adminDB.getAllServices(); setServices(svcs || []);
    const stgs = await adminDB.getSettings(); setSettings(stgs || {} as SiteSettings);
    const pfs = await adminDB.getAllPortfolio(); setPortfolios(pfs || []);
    const faqs = await adminDB.getAllFAQs(); setFaqs(faqs || []);
    const tsts = await adminDB.getAllTestimonials(); setTestimonials(tsts || []);
    const pkgs = await adminDB.getAllPricingPackages(); setPricingPackages(pkgs || []);
    const adns = await adminDB.getAllPricingAddons(); setPricingAddons(adns || []);
    const cmps = await adminDB.getAllPricingComparisons(); setPricingComparisons(cmps || []);
    const pqs = await adminDB.getAllPricingQuotes(); setPricingQuotes(pqs || []);
    const curs = await adminDB.getAllCurrencies(); setCurrencies(curs || []);
    const currSets = await adminDB.getCurrencySettings(); if (currSets) setCurrencySettingsState(currSets);
    const vids = await adminDB.getAllTestimonialVideos(); setTestimonialVideos(vids || []);
    const strs = await adminDB.getAllSuccessStories(); setSuccessStories(strs || []);
    const clogs = await adminDB.getAllClientLogos(); setClientLogos(clogs || []);
    const tstsStats = await adminDB.getTestimonialStatistics(); setTestimonialStatistics(tstsStats || null);
    const rvw = await adminDB.getReviewSettings(); setReviewSettings(rvw || null);

    // Auxiliary collections with local persistence
    if (!getLocalItem('next_solution_pricing_plans')) {
      const defaultPricing = [
        { id: 'price-1', nameEn: 'Startup Blueprint', nameBn: 'স্টার্টআপ ব্লুপ্রিন্ট', priceEn: '$1,500', priceBn: '৳১,৫০,০০০', periodEn: 'one-time', periodBn: 'এককালীন', badgeEn: 'Popular', badgeBn: 'জনপ্রিয়', featuresEn: ['High-Fidelity UI Redesign', 'Standard React Frontend', 'Contact Form Integration', 'Basic SEO Setup'], featuresBn: ['হাই-ফিডেলিটি UI রিডিজাইন', 'স্ট্যান্ডার্ড রিঅ্যাক্ট ফ্রন্টএন্ড', 'যোগাযোগ ফর্ম ইন্টিগ্রেশন', 'বেসিক এসইও সেটআপ'], buttonTextEn: 'Kickstart Project', buttonTextBn: 'প্রজেক্ট শুরু করুন' },
        { id: 'price-2', nameEn: 'Enterprise Scaling', nameBn: 'এন্টারপ্রাইজ স্কেলিং', priceEn: '$5,000', priceBn: '৳৫,০০,০০০', periodEn: 'month', periodBn: 'মাস', badgeEn: 'Elite', badgeBn: 'এলিট', featuresEn: ['Custom Next.js App Router', 'Full Cloud Architecture', 'Supabase Database Setup', 'Role-Based Authentication', 'Continuous 24/7 Support'], featuresBn: ['কাস্টম নেক্সট জেএস অ্যাপ রাউটার', 'সম্পূর্ণ ক্লাউড আর্কিটেকচার', 'সুপাবেস ডাটাবেস সেটআপ', 'রোল-ভিত্তিক অথেনটিকেশন', 'সার্বক্ষণিক সাপোর্ট'], buttonTextEn: 'Secure Retainer', buttonTextBn: 'রিটেইনার বুক করুন' }
      ];
      setLocalItem('next_solution_pricing_plans', JSON.stringify(defaultPricing));
    }
    setPricingPlans(JSON.parse(getLocalItem('next_solution_pricing_plans') || '[]'));

    if (!getLocalItem('next_solution_team')) {
      const defaultTeam = [
        { id: 'team-1', name: 'Sanjid Rahman', roleEn: 'Founder & CEO', roleBn: 'প্রতিষ্ঠাতা ও সিইও', departmentEn: 'Executive', departmentBn: 'নির্বাহী', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', email: 'sanjid@nextsolution.com', linkedin: 'https://linkedin.com/in/sanjid', bioEn: 'Sanjid oversees Next Solutions strategic direction, drawing on 12+ years of enterprise SaaS architecture.', bioBn: 'সানজিদ নেক্সট সলিউশনের কৌশলগত পরিকল্পনা পরিচালনা করেন, তার ১২ বছরের স্যাস আর্কিটেকচারের অভিজ্ঞতা রয়েছে।' },
        { id: 'team-2', name: 'Tasnim Ahmed', roleEn: 'Head of Product Engineering', roleBn: 'হেড অফ প্রোডাক্ট ইঞ্জিনিয়ারিং', departmentEn: 'Engineering', departmentBn: 'প্রকৌশল', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', email: 'tasnim@nextsolution.com', linkedin: 'https://linkedin.com/in/tasnim', bioEn: 'Tasnim directs the frontend and cloud systems deployment with a deep focus on Webflow and Next.js scale.', bioBn: 'তাসনিম ওয়েবফ্লো এবং নেক্সট জেএস স্কেলের ওপর গভীর ফোকাস দিয়ে ফ্রন্টএন্ড এবং ক্লাউড সিস্টেম পরিচালনা করেন।' }
      ];
      setLocalItem('next_solution_team', JSON.stringify(defaultTeam));
    }
    setTeamMembers(JSON.parse(getLocalItem('next_solution_team') || '[]'));

    if (!getLocalItem('next_solution_media')) {
      const defaultMedia = [
        { id: 'media-1', title: 'Enterprise Dashboard', group: 'portfolio', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
        { id: 'media-2', title: 'Strategic Team Audit', group: 'about', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600' },
        { id: 'media-3', title: 'Tech Stack Diagram', group: 'services', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600' }
      ];
      setLocalItem('next_solution_media', JSON.stringify(defaultMedia));
    }
    setMediaItems(JSON.parse(getLocalItem('next_solution_media') || '[]'));

    if (!getLocalItem('next_solution_admin_users')) {
      const defaultUsers = [
        { id: 'user-1', username: 'admin', role: 'SuperAdmin', status: 'active', email: 'admin@nextsolution.com', lastActive: new Date().toISOString() },
        { id: 'user-2', username: 'moderator_tasnim', role: 'Editor', status: 'active', email: 'tasnim@nextsolution.com', lastActive: new Date().toISOString() }
      ];
      setLocalItem('next_solution_admin_users', JSON.stringify(defaultUsers));
    }
    setAdminUsers(JSON.parse(getLocalItem('next_solution_admin_users') || '[]'));

    // Load Why Choose Us data
    const wcuC = await adminDB.getAllWhyChooseUsCards(); setWhyChooseUsCardsState(wcuC || []);
    const wcuS = await adminDB.getAllWhyChooseUsStats(); setWhyChooseUsStatsState(wcuS || []);
    const wcuB = await adminDB.getAllWhyChooseUsBadges(); setWhyChooseUsBadgesState(wcuB || []);
    const wcuT = await adminDB.getAllWhyChooseUsTechs(); setWhyChooseUsTechsState(wcuT || []);
    const ctaData = await adminDB.getWhyChooseUsCTA();
    setWhyChooseUsCTAState(ctaData);
    setWhyCTAForm(ctaData || {
      taglineEn: '', taglineBn: '', headlineEn: '', headlineBn: '', descriptionEn: '', descriptionBn: '', primaryButtonTextEn: '', primaryButtonTextBn: '', secondaryButtonTextEn: '', secondaryButtonTextBn: ''
    });

    // Load Process Workflow data
    const pSteps = await adminDB.getAllProcessSteps(); setProcessStepsState(pSteps || []);
    const pctData = await adminDB.getProcessCTA();
    setProcessCTAState(pctData);
    setProcessCTAForm(pctData || {
      titleEn: '', titleBn: '', highlightEn: '', highlightBn: '', subtitleEn: '', subtitleBn: '', ctaHeadlineEn: '', ctaHeadlineBn: '', ctaSubtitleEn: '', ctaSubtitleBn: '', ctaPrimaryTextEn: '', ctaPrimaryTextBn: '', ctaSecondaryTextEn: '', ctaSecondaryTextBn: ''
    });

    // Load Tech Service Cards
    const tsCards = await adminDB.getAllTechServiceCards(); setTechServiceCardsState(tsCards || []);
    } catch (err) {
      console.error('Admin data load failed (continuing):', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (password === 'admin') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setAuthError(currentLang === 'en' ? 'Incorrect credential. Try again.' : 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।');
    }
  };

  // Messages operations
  const handleToggleMessageStatus = async (id: string, currentStatus: 'unread' | 'read' | 'replied') => {
    let nextStatus: 'unread' | 'read' | 'replied' = 'read';
    if (currentStatus === 'read') nextStatus = 'replied';
    else if (currentStatus === 'replied') nextStatus = 'unread';

    await adminDB.updateMessage(id, { status: nextStatus });
    const msgs = await adminDB.getAllMessages(); setMessages(msgs || []);
    triggerNotice(currentLang === 'en' ? 'Message state updated!' : 'বার্তার স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  const handleDeleteMessage = async (id: string) => {
    await adminDB.deleteMessage(id);
    const msgs = await adminDB.getAllMessages(); setMessages(msgs || []);
    triggerNotice(currentLang === 'en' ? 'Message permanently deleted.' : 'বার্তাটি স্থায়ীভাবে মুছে ফেলা হয়েছে।');
  };

  // Subscribers operations
  const handleDeleteSub = async (id: string) => {
    await adminDB.deleteSubscriber(id);
    const subs = await adminDB.getAllSubscribers(); setSubscribers(subs || []);
    triggerNotice(currentLang === 'en' ? 'Subscriber removed.' : 'সাবস্ক্রাইবার মুছে ফেলা হয়েছে।');
  };

  // Blog operations (Publish, Save, Delete)
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogId = editingBlog ? editingBlog.id : `blog-${Date.now()}`;
    const publishedDate = editingBlog ? editingBlog.publishedAt : new Date().toISOString().split('T')[0];

    const completedPost: BlogPost = {
      id: blogId,
      titleEn: blogForm.titleEn || 'Untitled',
      titleBn: blogForm.titleBn || 'শিরোনামহীন',
      excerptEn: blogForm.excerptEn || '',
      excerptBn: blogForm.excerptBn || '',
      contentEn: blogForm.contentEn || '',
      contentBn: blogForm.contentBn || '',
      categoryEn: blogForm.categoryEn || 'Technology',
      categoryBn: blogForm.categoryBn || 'প্রযুক্তি',
      tags: blogForm.tags || ['General'],
      image: blogForm.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      author: blogForm.author || 'Sanjid Rahman',
      readTime: blogForm.readTime || '5 Min Read',
      publishedAt: publishedDate,
      status: blogForm.status || 'draft'
    };

    await adminDB.saveBlog(completedPost);
    const blgs = await adminDB.getAllBlogs(); setBlogs(blgs || []);
    setIsCreatingBlog(false);
    setEditingBlog(null);
    triggerNotice(currentLang === 'en' ? 'Article saved successfully!' : 'নিবন্ধটি সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleEditBlogTrigger = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm(blog);
    setIsCreatingBlog(true);
  };

  const handleDeleteBlog = async (id: string) => {
    await adminDB.deleteBlog(id);
    const blgs = await adminDB.getAllBlogs(); setBlogs(blgs || []);
    triggerNotice(currentLang === 'en' ? 'Article deleted.' : 'নিবন্ধটি মুছে ফেলা হয়েছে।');
  };

  // Service Edit Save
  const handleSaveServiceEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const serviceToSave = { ...editingService };
    if (!serviceToSave.id) {
      serviceToSave.id = `service-${Date.now()}`;
    }
    if (!serviceToSave.slug) {
      serviceToSave.slug = (serviceToSave.titleEn || 'service')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    await adminDB.saveService(serviceToSave);
    const svcs = await adminDB.getAllServices(); setServices(svcs || []);
    setEditingService(null);
    triggerNotice(
      currentLang === 'en' 
        ? 'Service successfully saved and published!' 
        : 'সার্ভিসটি সফলভাবে সংরক্ষণ এবং প্রকাশ করা হয়েছে!'
    );
  };

  // Service Delete
  const handleDeleteService = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this service?' : 'আপনি কি সত্যিই এই সার্ভিসটি মুছে ফেলতে চান?')) {
      await adminDB.deleteService(id);
      const svcs = await adminDB.getAllServices(); setServices(svcs || []);
      triggerNotice(currentLang === 'en' ? 'Service permanently deleted.' : 'সার্ভিসটি স্থায়ীভাবে মুছে ফেলা হয়েছে।');
    }
  };

  // System Config Settings save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await adminDB.saveSettings(settings);
    triggerNotice(currentLang === 'en' ? 'Site configuration updated.' : 'সাইটের কনফিগারেশন আপডেট করা হয়েছে।');
  };

  // Portfolio CRUD operations
  const [portfolioUploading, setPortfolioUploading] = useState(false);
  const uploadPortfolioFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'projects');
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Upload failed');
    return json.data.url;
  };
  const handlePortfolioImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPortfolioUploading(true);
    try {
      const url = await uploadPortfolioFile(file);
      setPortfolioForm({ ...portfolioForm, image: url });
      triggerNotice(currentLang === 'en' ? 'Featured image uploaded!' : 'প্রধান ছবি আপলোড করা হয়েছে!');
    } catch (err: any) {
      triggerNotice(err.message || 'Upload failed');
    } finally {
      setPortfolioUploading(false);
      e.target.value = '';
    }
  };
  const handlePortfolioGalleryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setPortfolioUploading(true);
    try {
      let gallery: string[] = [];
      try { gallery = JSON.parse(portfolioForm.galleryJson || '[]') || []; } catch { gallery = []; }
      for (const f of files) {
        const url = await uploadPortfolioFile(f);
        gallery.push(url);
      }
      setPortfolioForm({ ...portfolioForm, galleryJson: JSON.stringify(gallery) });
      triggerNotice(currentLang === 'en' ? 'Gallery images uploaded!' : 'গ্যালারির ছবিগুলো আপলোড করা হয়েছে!');
    } catch (err: any) {
      triggerNotice(err.message || 'Upload failed');
    } finally {
      setPortfolioUploading(false);
      e.target.value = '';
    }
  };
  const removeGalleryImage = (url: string) => {
    let gallery: string[] = [];
    try { gallery = JSON.parse(portfolioForm.galleryJson || '[]') || []; } catch { gallery = []; }
    setPortfolioForm({ ...portfolioForm, galleryJson: JSON.stringify(gallery.filter(u => u !== url)) });
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemId = editingPortfolio ? editingPortfolio.id : `portfolio-${Date.now()}`;
    
    // Auto generate slug if empty
    const generatedSlug = portfolioForm.slug || portfolioForm.titleEn
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `project-${Date.now()}`;

    const completedItem: PortfolioItem = {
      id: itemId,
      titleEn: portfolioForm.titleEn || 'Untitled Project',
      titleBn: portfolioForm.titleBn || 'শিরোনামহীন প্রজেক্ট',
      category: portfolioForm.category || 'Web Development',
      duration: portfolioForm.duration || '',
      budget: portfolioForm.budget || '',
      descriptionEn: portfolioForm.descriptionEn || '',
      descriptionBn: portfolioForm.descriptionBn || '',
      client: portfolioForm.client || '',
      challengeEn: portfolioForm.challengeEn || '',
      challengeBn: portfolioForm.challengeBn || '',
      solutionEn: portfolioForm.solutionEn || '',
      solutionBn: portfolioForm.solutionBn || '',
      resultEn: portfolioForm.resultEn || '',
      resultBn: portfolioForm.resultBn || '',
      technologies: portfolioForm.technologies || [],
      image: portfolioForm.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      featured: portfolioForm.featured || false,
      rating: portfolioForm.rating || 5,
      reviewEn: portfolioForm.reviewEn || '',
      reviewBn: portfolioForm.reviewBn || '',
      
      // Extended fields
      slug: generatedSlug,
      status: portfolioForm.status || 'published',
      sortOrder: Number(portfolioForm.sortOrder) || 0,
      industryEn: portfolioForm.industryEn || '',
      industryBn: portfolioForm.industryBn || '',
      completionYear: portfolioForm.completionYear || '',
      galleryJson: portfolioForm.galleryJson || '[]',
      featuresEn: portfolioForm.featuresEn || [],
      featuresBn: portfolioForm.featuresBn || [],
      beforeImage: portfolioForm.beforeImage || '',
      afterImage: portfolioForm.afterImage || '',
      clientPhoto: portfolioForm.clientPhoto || '',
      clientRoleEn: portfolioForm.clientRoleEn || '',
      clientRoleBn: portfolioForm.clientRoleBn || '',
      seoTitleEn: portfolioForm.seoTitleEn || '',
      seoTitleBn: portfolioForm.seoTitleBn || '',
      seoDescEn: portfolioForm.seoDescEn || '',
      seoDescBn: portfolioForm.seoDescBn || '',
      liveUrl: portfolioForm.liveUrl || '',
      githubUrl: portfolioForm.githubUrl || '',
      projectType: portfolioForm.projectType || '',
      projectDate: portfolioForm.projectDate || '',
      appStoreUrl: portfolioForm.appStoreUrl || '',
      playStoreUrl: portfolioForm.playStoreUrl || '',
      thumbnailImage: portfolioForm.thumbnailImage || ''
    };

    await adminDB.savePortfolio(completedItem);
    const pfs = await adminDB.getAllPortfolio(); setPortfolios(pfs || []);
    setIsCreatingPortfolio(false);
    setEditingPortfolio(null);
    triggerNotice(currentLang === 'en' ? 'Portfolio item saved!' : 'পোর্টফোলিও প্রজেক্টটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditPortfolioTrigger = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPortfolioForm(item);
    setIsCreatingPortfolio(true);
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio project?')) return;
    await adminDB.deletePortfolio(id);
    const pfs = await adminDB.getAllPortfolio(); setPortfolios(pfs || []);
    triggerNotice(currentLang === 'en' ? 'Portfolio item deleted.' : 'পোর্টফোলিও প্রজেক্টটি মুছে ফেলা হয়েছে।');
  };

  // FAQ CRUD operations
  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    const faqId = editingFAQ ? editingFAQ.id : `faq-${Date.now()}`;
    const completedFAQ: FAQ = {
      id: faqId,
      categoryEn: faqForm.categoryEn || 'General',
      categoryBn: faqForm.categoryBn || 'সাধারণ',
      questionEn: faqForm.questionEn || '',
      questionBn: faqForm.questionBn || '',
      answerEn: faqForm.answerEn || '',
      answerBn: faqForm.answerBn || '',
      helpfulCount: faqForm.helpfulCount || 0
    };

    await adminDB.saveFAQ(completedFAQ);
    const faqs = await adminDB.getAllFAQs(); setFaqs(faqs || []);
    setIsCreatingFAQ(false);
    setEditingFAQ(null);
    triggerNotice(currentLang === 'en' ? 'FAQ successfully saved!' : 'প্রশ্নোত্তরটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditFAQTrigger = (item: FAQ) => {
    setEditingFAQ(item);
    setFaqForm(item);
    setIsCreatingFAQ(true);
  };

  const handleDeleteFAQ = async (id: string) => {
    await adminDB.deleteFAQ(id);
    const faqs = await adminDB.getAllFAQs(); setFaqs(faqs || []);
    triggerNotice(currentLang === 'en' ? 'FAQ entry removed.' : 'প্রশ্নোত্তরটি মুছে ফেলা হয়েছে।');
  };

  // Testimonials CRUD operations
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const testimonialId = editingTestimonial ? editingTestimonial.id : `testimonial-${Date.now()}`;
    const completedTestimonial: Testimonial = {
      id: testimonialId,
      name: testimonialForm.name || 'Anonymous',
      roleEn: testimonialForm.roleEn || 'Product Owner',
      roleBn: testimonialForm.roleBn || 'প্রোডাক্ট ওনার',
      company: testimonialForm.company || 'Enterprise Inc',
      feedbackEn: testimonialForm.feedbackEn || '',
      feedbackBn: testimonialForm.feedbackBn || '',
      rating: testimonialForm.rating || 5,
      avatar: testimonialForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    };

    await adminDB.saveTestimonial(completedTestimonial);
    const tsts = await adminDB.getAllTestimonials(); setTestimonials(tsts || []);
    setIsCreatingTestimonial(false);
    setEditingTestimonial(null);
    triggerNotice(currentLang === 'en' ? 'Testimonial successfully saved!' : 'টেস্টিমোনিয়ালটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditTestimonialTrigger = (item: Testimonial) => {
    setEditingTestimonial(item);
    setTestimonialForm(item);
    setIsCreatingTestimonial(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    await adminDB.deleteTestimonial(id);
    const tsts = await adminDB.getAllTestimonials(); setTestimonials(tsts || []);
    triggerNotice(currentLang === 'en' ? 'Testimonial removed.' : 'টেস্টিমোনিয়ালটি মুছে ফেলা হয়েছে।');
  };

  // Testimonial Videos operations
  const handleSaveTestimonialVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = editingVideo ? editingVideo.id : `video-${Date.now()}`;
    const completedVideo: TestimonialVideo = {
      id: videoId,
      titleEn: videoForm.titleEn || 'Video Review',
      titleBn: videoForm.titleBn || 'ভিডিও রিভিউ',
      clientName: videoForm.clientName || 'Anonymous',
      company: videoForm.company || 'Enterprise Inc',
      avatar: videoForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      rating: videoForm.rating || 5,
      videoUrl: videoForm.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: videoForm.thumbnailUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
      shortDescriptionEn: videoForm.shortDescriptionEn || '',
      shortDescriptionBn: videoForm.shortDescriptionBn || '',
      featured: videoForm.featured ?? true,
      displayOrder: Number(videoForm.displayOrder) || 1
    };
    await adminDB.saveTestimonialVideo(completedVideo);
    const vids = await adminDB.getAllTestimonialVideos(); setTestimonialVideos(vids || []);
    setIsCreatingVideo(false);
    setEditingVideo(null);
    triggerNotice(currentLang === 'en' ? 'Testimonial video successfully saved!' : 'ভিডিও টেস্টিমোনিয়ালটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditVideoTrigger = (item: TestimonialVideo) => {
    setEditingVideo(item);
    setVideoForm(item);
    setIsCreatingVideo(true);
  };

  const handleDeleteVideo = async (id: string) => {
    await adminDB.deleteTestimonialVideo(id);
    const vids = await adminDB.getAllTestimonialVideos(); setTestimonialVideos(vids || []);
    triggerNotice(currentLang === 'en' ? 'Testimonial video removed.' : 'ভিডিও টেস্টিমোনিয়ালটি মুছে ফেলা হয়েছে।');
  };

  // Success Stories operations
  const handleSaveSuccessStory = async (e: React.FormEvent) => {
    e.preventDefault();
    const storyId = editingSuccessStory ? editingSuccessStory.id : `story-${Date.now()}`;
    const completedStory: SuccessStory = {
      id: storyId,
      clientName: successStoryForm.clientName || '',
      companyName: successStoryForm.companyName || '',
      industryEn: successStoryForm.industryEn || '',
      industryBn: successStoryForm.industryBn || '',
      serviceEn: successStoryForm.serviceEn || '',
      serviceBn: successStoryForm.serviceBn || '',
      backgroundEn: successStoryForm.backgroundEn || '',
      backgroundBn: successStoryForm.backgroundBn || '',
      challengeEn: successStoryForm.challengeEn || '',
      challengeBn: successStoryForm.challengeBn || '',
      solutionEn: successStoryForm.solutionEn || '',
      solutionBn: successStoryForm.solutionBn || '',
      technologies: Array.isArray(successStoryForm.technologies) ? successStoryForm.technologies : String(successStoryForm.technologies || '').split(',').map(s => s.trim()).filter(Boolean),
      timelineEn: successStoryForm.timelineEn || '',
      timelineBn: successStoryForm.timelineBn || '',
      resultsEn: successStoryForm.resultsEn || '',
      resultsBn: successStoryForm.resultsBn || '',
      beforeImage: successStoryForm.beforeImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      afterImage: successStoryForm.afterImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      clientQuoteEn: successStoryForm.clientQuoteEn || '',
      clientQuoteBn: successStoryForm.clientQuoteBn || '',
      clientRoleEn: successStoryForm.clientRoleEn || '',
      clientRoleBn: successStoryForm.clientRoleBn || '',
      clientPhoto: successStoryForm.clientPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      featured: successStoryForm.featured ?? true,
      displayOrder: Number(successStoryForm.displayOrder) || 1
    };
    await adminDB.saveSuccessStory(completedStory);
    const strs = await adminDB.getAllSuccessStories(); setSuccessStories(strs || []);
    setIsCreatingSuccessStory(false);
    setEditingSuccessStory(null);
    triggerNotice(currentLang === 'en' ? 'Success story successfully saved!' : 'সফলতার গল্পটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditSuccessStoryTrigger = (item: SuccessStory) => {
    setEditingSuccessStory(item);
    setSuccessStoryForm(item);
    setIsCreatingSuccessStory(true);
  };

  const handleDeleteSuccessStory = async (id: string) => {
    await adminDB.deleteSuccessStory(id);
    const strs = await adminDB.getAllSuccessStories(); setSuccessStories(strs || []);
    triggerNotice(currentLang === 'en' ? 'Success story removed.' : 'সফলতার গল্পটি মুছে ফেলা হয়েছে।');
  };

  // Client Logos operations
  const handleSaveClientLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    const logoId = editingClientLogo ? editingClientLogo.id : `logo-${Date.now()}`;
    const completedLogo: ClientLogo = {
      id: logoId,
      name: clientLogoForm.name || '',
      logoUrl: clientLogoForm.logoUrl || '',
      featured: clientLogoForm.featured ?? true,
      displayOrder: Number(clientLogoForm.displayOrder) || 1
    };
    await adminDB.saveClientLogo(completedLogo);
    const clogs = await adminDB.getAllClientLogos(); setClientLogos(clogs || []);
    setIsCreatingClientLogo(false);
    setEditingClientLogo(null);
    triggerNotice(currentLang === 'en' ? 'Client logo successfully saved!' : 'ক্লায়েন্ট লোগোটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditClientLogoTrigger = (item: ClientLogo) => {
    setEditingClientLogo(item);
    setClientLogoForm(item);
    setIsCreatingClientLogo(true);
  };

  const handleDeleteClientLogo = async (id: string) => {
    await adminDB.deleteClientLogo(id);
    const clogs = await adminDB.getAllClientLogos(); setClientLogos(clogs || []);
    triggerNotice(currentLang === 'en' ? 'Client logo removed.' : 'ক্লায়েন্ট লোগোটি মুছে ফেলা হয়েছে।');
  };

  // Statistics and Settings operations
  const handleSaveTestimonialStatistics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialStatistics) return;
    await adminDB.saveTestimonialStatistics(testimonialStatistics);
    triggerNotice(currentLang === 'en' ? 'Statistics successfully updated!' : 'পরিসংখ্যান সফলভাবে আপডেট করা হয়েছে!');
  };

  const handleSaveReviewSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewSettings) return;
    await adminDB.saveReviewSettings(reviewSettings);
    triggerNotice(currentLang === 'en' ? 'Settings successfully updated!' : 'সেটিংস সফলভাবে আপডেট করা হয়েছে!');
  };

  // Pricing plans operations
  const handleSavePricingPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...pricingPlans];
    const planId = editingPricingPlan ? editingPricingPlan.id : `price-${Date.now()}`;
    const completedPlan = {
      id: planId,
      nameEn: pricingPlanForm.nameEn || 'Premium Plan',
      nameBn: pricingPlanForm.nameBn || 'প্রিমিয়াম প্ল্যান',
      priceEn: pricingPlanForm.priceEn || '$1,000',
      priceBn: pricingPlanForm.priceBn || '৳১,০০,০০০',
      periodEn: pricingPlanForm.periodEn || 'month',
      periodBn: pricingPlanForm.periodBn || 'মাস',
      badgeEn: pricingPlanForm.badgeEn || '',
      badgeBn: pricingPlanForm.badgeBn || '',
      featuresEn: pricingPlanForm.featuresEn || [],
      featuresBn: pricingPlanForm.featuresBn || [],
      buttonTextEn: pricingPlanForm.buttonTextEn || 'Get Started',
      buttonTextBn: pricingPlanForm.buttonTextBn || 'শুরু করুন'
    };

    const index = list.findIndex(p => p.id === planId);
    if (index >= 0) {
      list[index] = completedPlan;
    } else {
      list.push(completedPlan);
    }

    setLocalItem('next_solution_pricing_plans', JSON.stringify(list));
    setPricingPlans(list);
    setIsCreatingPricingPlan(false);
    setEditingPricingPlan(null);
    triggerNotice(currentLang === 'en' ? 'Pricing plan saved!' : 'প্রাইসিং প্যাকেজটি সংরক্ষণ করা হয়েছে!');
  };

  const handleEditPricingPlanTrigger = (plan: any) => {
    setEditingPricingPlan(plan);
    setPricingPlanForm(plan);
    setIsCreatingPricingPlan(true);
  };

  const handleDeletePricingPlan = (id: string) => {
    const list = pricingPlans.filter(p => p.id !== id);
    setLocalItem('next_solution_pricing_plans', JSON.stringify(list));
    setPricingPlans(list);
    triggerNotice(currentLang === 'en' ? 'Pricing plan deleted.' : 'প্রাইসিং প্যাকেজটি মুছে ফেলা হয়েছে।');
  };

  // 1. Pricing Packages CRUD
  const handleSavePricingPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const pkgId = editingPricingPackage ? editingPricingPackage.id : `pkg-${Date.now()}`;
    const completedPkg: PricingPackage = {
      id: pkgId,
      category: pricingPackageForm.category || 'Agency Packages',
      nameEn: pricingPackageForm.nameEn || '',
      nameBn: pricingPackageForm.nameBn || '',
      priceMonthly: Number(pricingPackageForm.priceMonthly) || 0,
      priceYearly: Number(pricingPackageForm.priceYearly) || 0,
      descriptionEn: pricingPackageForm.descriptionEn || '',
      descriptionBn: pricingPackageForm.descriptionBn || '',
      featuresEn: pricingPackageForm.featuresEn || [],
      featuresBn: pricingPackageForm.featuresBn || [],
      notIncludedEn: pricingPackageForm.notIncludedEn || [],
      notIncludedBn: pricingPackageForm.notIncludedBn || [],
      ctaEn: pricingPackageForm.ctaEn || 'Get Started',
      ctaBn: pricingPackageForm.ctaBn || 'শুরু করুন',
      popular: !!pricingPackageForm.popular,
      enabled: !!pricingPackageForm.enabled,
      sortOrder: Number(pricingPackageForm.sortOrder) || 0,
      badgeEn: pricingPackageForm.badgeEn || '',
      badgeBn: pricingPackageForm.badgeBn || '',
      techEn: pricingPackageForm.techEn || '',
      deliveryTimeEn: pricingPackageForm.deliveryTimeEn || '',
      deliveryTimeBn: pricingPackageForm.deliveryTimeBn || '',
      supportPeriodEn: pricingPackageForm.supportPeriodEn || '',
      supportPeriodBn: pricingPackageForm.supportPeriodBn || '',
      perfectForEn: pricingPackageForm.perfectForEn || '',
      perfectForBn: pricingPackageForm.perfectForBn || ''
    };

    await adminDB.savePricingPackage(completedPkg);
    const pkgs = await adminDB.getAllPricingPackages(); setPricingPackages(pkgs || []);
    setIsCreatingPricingPackage(false);
    setEditingPricingPackage(null);
    triggerNotice(currentLang === 'en' ? 'Pricing package saved successfully!' : 'প্রাইসিং প্যাকেজটি সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleEditPricingPackageTrigger = (pkg: PricingPackage) => {
    setEditingPricingPackage(pkg);
    setPricingPackageForm(pkg);
    setIsCreatingPricingPackage(true);
  };

  const handleDeletePricingPackage = async (id: string) => {
    await adminDB.deletePricingPackage(id);
    const pkgs = await adminDB.getAllPricingPackages(); setPricingPackages(pkgs || []);
    triggerNotice(currentLang === 'en' ? 'Pricing package removed.' : 'প্রাইসিং প্যাকেজটি মুছে ফেলা হয়েছে।');
  };

  // 2. Pricing Addons CRUD
  const handleSavePricingAddon = async (e: React.FormEvent) => {
    e.preventDefault();
    const addonId = editingPricingAddon ? editingPricingAddon.id : `addon-${Date.now()}`;
    const completedAddon: PricingAddon = {
      id: addonId,
      nameEn: pricingAddonForm.nameEn || '',
      nameBn: pricingAddonForm.nameBn || '',
      price: pricingAddonForm.price || '',
      descriptionEn: pricingAddonForm.descriptionEn || '',
      descriptionBn: pricingAddonForm.descriptionBn || '',
      category: pricingAddonForm.category || 'Core Service',
      enabled: !!pricingAddonForm.enabled
    };

    await adminDB.savePricingAddon(completedAddon);
    const adns = await adminDB.getAllPricingAddons(); setPricingAddons(adns || []);
    setIsCreatingPricingAddon(false);
    setEditingPricingAddon(null);
    triggerNotice(currentLang === 'en' ? 'Add-on service saved successfully!' : 'অ্যাড-অন সার্ভিসটি সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleEditPricingAddonTrigger = (addon: PricingAddon) => {
    setEditingPricingAddon(addon);
    setPricingAddonForm(addon);
    setIsCreatingPricingAddon(true);
  };

  const handleDeletePricingAddon = async (id: string) => {
    await adminDB.deletePricingAddon(id);
    const adns = await adminDB.getAllPricingAddons(); setPricingAddons(adns || []);
    triggerNotice(currentLang === 'en' ? 'Add-on service removed.' : 'অ্যাড-অন সার্ভিসটি মুছে ফেলা হয়েছে।');
  };

  // 3. Pricing Comparisons CRUD
  const handleSavePricingComparison = async (e: React.FormEvent) => {
    e.preventDefault();
    const compId = editingPricingComparison ? editingPricingComparison.id : `comp-${Date.now()}`;
    const completedComp: PricingComparison = {
      id: compId,
      featureEn: pricingComparisonForm.featureEn || '',
      featureBn: pricingComparisonForm.featureBn || '',
      starterEn: pricingComparisonForm.starterEn || '',
      starterBn: pricingComparisonForm.starterBn || '',
      businessEn: pricingComparisonForm.businessEn || '',
      businessBn: pricingComparisonForm.businessBn || '',
      enterpriseEn: pricingComparisonForm.enterpriseEn || '',
      enterpriseBn: pricingComparisonForm.enterpriseBn || '',
      categoryEn: pricingComparisonForm.categoryEn || 'Core Deliverables',
      categoryBn: pricingComparisonForm.categoryBn || 'প্রধান ডেলিভারিবল',
      sortOrder: Number(pricingComparisonForm.sortOrder) || 0
    };

    await adminDB.savePricingComparison(completedComp);
    const cmps = await adminDB.getAllPricingComparisons(); setPricingComparisons(cmps || []);
    setIsCreatingPricingComparison(false);
    setEditingPricingComparison(null);
    triggerNotice(currentLang === 'en' ? 'Comparison feature saved successfully!' : 'ফিচার তুলনা ম্যাট্রিক্স সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleEditPricingComparisonTrigger = (comp: PricingComparison) => {
    setEditingPricingComparison(comp);
    setPricingComparisonForm(comp);
    setIsCreatingPricingComparison(true);
  };

  const handleDeletePricingComparison = async (id: string) => {
    await adminDB.deletePricingComparison(id);
    const cmps = await adminDB.getAllPricingComparisons(); setPricingComparisons(cmps || []);
    triggerNotice(currentLang === 'en' ? 'Comparison feature removed.' : 'ফিচার তুলনা ম্যাট্রিক্স মুছে ফেলা হয়েছে।');
  };

  // 4. Quotes Operations
  const handleUpdateQuoteStatus = async (id: string, status: 'pending' | 'reviewed' | 'contacted') => {
    await adminDB.updatePricingQuote(id, { status: status });
    const pqs = await adminDB.getAllPricingQuotes(); setPricingQuotes(pqs || []);
    triggerNotice(currentLang === 'en' ? 'Inbound quote status updated!' : 'কোড রিকোয়েস্ট স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  const handleDeleteQuote = async (id: string) => {
    await adminDB.deletePricingQuote(id);
    const pqs = await adminDB.getAllPricingQuotes(); setPricingQuotes(pqs || []);
    triggerNotice(currentLang === 'en' ? 'Inbound quote request removed.' : 'কোড রিকোয়েস্টটি মুছে ফেলা হয়েছে।');
  };

  // Currency & Rate operations
  const handleSaveCurrencySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminDB.saveCurrencySettings(currencySettings);
    triggerNotice(currentLang === 'en' ? 'Currency configurations updated!' : 'কারেন্সি কনফিগারেশন সফলভাবে আপডেট করা হয়েছে!');
    const currSets = await adminDB.getCurrencySettings(); if (currSets) setCurrencySettingsState(currSets);
  };

  const handleSaveCurrency = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currencyForm.name || !currencyForm.code || !currencyForm.symbol) {
      alert('Please fill out all required fields');
      return;
    }
    const id = editingCurrency ? editingCurrency.id : `curr-${Date.now()}`;
    const currToSave: Currency = {
      id,
      name: currencyForm.name,
      code: currencyForm.code.toUpperCase(),
      symbol: currencyForm.symbol,
      flag: currencyForm.flag || '🏳️',
      exchangeRate: Number(currencyForm.exchangeRate) || 1.0,
      enabled: currencyForm.enabled !== false,
      isDefault: currencyForm.isDefault === true,
      sortOrder: Number(currencyForm.sortOrder) || 0,
      createdAt: editingCurrency?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // If making this currency default, disable other defaults
    if (currToSave.isDefault) {
      const all = currencies;
      for (const c of all) {
        if (c.id !== currToSave.id && c.isDefault) {
          c.isDefault = false;
          c.updatedAt = new Date().toISOString();
          await adminDB.saveCurrency(c);
        }
      }
    }

    await adminDB.saveCurrency(currToSave);
    triggerNotice(currentLang === 'en' ? 'Currency successfully saved!' : 'কারেন্সি সফলভাবে সংরক্ষণ করা হয়েছে!');
    const curs = await adminDB.getAllCurrencies(); setCurrencies(curs || []);
    setEditingCurrency(null);
    setIsCreatingCurrency(false);
    setCurrencyForm({
      name: '', code: '', symbol: '', flag: '', exchangeRate: 1.0, enabled: true, isDefault: false, sortOrder: 0
    });
  };

  const handleDeleteCurrency = async (id: string) => {
    const toDel = currencies.find(c => c.id === id);
    if (toDel?.isDefault) {
      alert(currentLang === 'en' ? 'Cannot delete the default currency.' : 'ডিফল্ট কারেন্সি মুছে ফেলা যাবে না।');
      return;
    }
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this currency?' : 'আপনি কি সত্যিই এই কারেন্সিটি মুছে ফেলতে চান?')) {
      await adminDB.deleteCurrency(id);
      triggerNotice(currentLang === 'en' ? 'Currency deleted.' : 'কারেন্সি মুছে ফেলা হয়েছে।');
      const curs = await adminDB.getAllCurrencies(); setCurrencies(curs || []);
    }
  };

  const handleToggleCurrencyEnabled = async (id: string) => {
    const list = currencies;
    const found = list.find(c => c.id === id);
    if (found) {
      if (found.isDefault) {
        alert(currentLang === 'en' ? 'Cannot disable the default currency.' : 'ডিফল্ট কারেন্সি নিষ্ক্রিয় করা যাবে না।');
        return;
      }
      found.enabled = !found.enabled;
      await adminDB.saveCurrency(found);
      const curs = await adminDB.getAllCurrencies(); setCurrencies(curs || []);
      triggerNotice(currentLang === 'en' ? 'Currency status updated.' : 'কারেন্সির অবস্থা আপডেট করা হয়েছে।');
    }
  };

  const handleMoveCurrency = async (index: number, direction: 'up' | 'down') => {
    const sorted = [...currencies].sort((a, b) => a.sortOrder - b.sortOrder);
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sorted.length - 1) return;

    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const tempSort = sorted[index].sortOrder;
    sorted[index].sortOrder = sorted[swapIndex].sortOrder;
    sorted[swapIndex].sortOrder = tempSort;

    await adminDB.saveCurrency(sorted[index]);
    await adminDB.saveCurrency(sorted[swapIndex]);
    const curs = await adminDB.getAllCurrencies(); setCurrencies(curs || []);
    triggerNotice(currentLang === 'en' ? 'Order updated.' : 'ক্রমবিন্যাস আপডেট করা হয়েছে।');
  };

  // Team Members operations
  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...teamMembers];
    const memberId = editingTeamMember ? editingTeamMember.id : `team-${Date.now()}`;
    const completedMember = {
      id: memberId,
      name: teamMemberForm.name || 'Team Member',
      roleEn: teamMemberForm.roleEn || 'Product Engineer',
      roleBn: teamMemberForm.roleBn || 'প্রোডাক্ট ইঞ্জিনিয়ার',
      departmentEn: teamMemberForm.departmentEn || 'Engineering',
      departmentBn: teamMemberForm.departmentBn || 'প্রকৌশল',
      avatar: teamMemberForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      email: teamMemberForm.email || 'hello@nextsolution.com',
      linkedin: teamMemberForm.linkedin || 'https://linkedin.com',
      bioEn: teamMemberForm.bioEn || '',
      bioBn: teamMemberForm.bioBn || ''
    };

    const index = list.findIndex(t => t.id === memberId);
    if (index >= 0) {
      list[index] = completedMember;
    } else {
      list.push(completedMember);
    }

    setLocalItem('next_solution_team', JSON.stringify(list));
    setTeamMembers(list);
    setIsCreatingTeamMember(false);
    setEditingTeamMember(null);
    triggerNotice(currentLang === 'en' ? 'Team member saved successfully!' : 'টিম মেম্বার প্রোফাইল সংরক্ষণ করা হয়েছে!');
  };

  const handleEditTeamMemberTrigger = (member: any) => {
    setEditingTeamMember(member);
    setTeamMemberForm(member);
    setIsCreatingTeamMember(true);
  };

  const handleDeleteTeamMember = (id: string) => {
    const list = teamMembers.filter(t => t.id !== id);
    setLocalItem('next_solution_team', JSON.stringify(list));
    setTeamMembers(list);
    triggerNotice(currentLang === 'en' ? 'Team member deleted.' : 'টিম মেম্বারকে বাদ দেওয়া হয়েছে।');
  };

  // Admin User operations
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...adminUsers];
    const userId = editingUser ? editingUser.id : `user-${Date.now()}`;
    const completedUser = {
      id: userId,
      username: userForm.username || 'user',
      password: userForm.password || 'password',
      role: userForm.role || 'Editor',
      status: userForm.status || 'active',
      email: userForm.email || 'editor@nextsolution.com',
      lastActive: new Date().toISOString()
    };

    const index = list.findIndex(u => u.id === userId);
    if (index >= 0) {
      list[index] = completedUser;
    } else {
      list.push(completedUser);
    }

    setLocalItem('next_solution_admin_users', JSON.stringify(list));
    setAdminUsers(list);
    setIsCreatingUser(false);
    setEditingUser(null);
    triggerNotice(currentLang === 'en' ? 'User account updated!' : 'ইউজার অ্যাকাউন্ট আপডেট করা হয়েছে!');
  };

  const handleEditUserTrigger = (u: any) => {
    setEditingUser(u);
    setUserForm(u);
    setIsCreatingUser(true);
  };

  const handleDeleteUser = (id: string) => {
    if (id === 'user-1') {
      alert(currentLang === 'en' ? 'Primary Admin account cannot be deleted for safety.' : 'নিরাপত্তার স্বার্থে প্রধান অ্যাডমিন অ্যাকাউন্ট মুছে ফেলা সম্ভব নয়।');
      return;
    }
    const list = adminUsers.filter(u => u.id !== id);
    setLocalItem('next_solution_admin_users', JSON.stringify(list));
    setAdminUsers(list);
    triggerNotice(currentLang === 'en' ? 'User deleted.' : 'ইউজার অ্যাকাউন্ট মুছে ফেলা হয়েছে।');
  };

  // Why Choose Us operations
  const handleSaveWhyCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingWhyCard ? editingWhyCard.id : `why-card-${Date.now()}`;
    const card: WhyChooseUsCard = {
      id,
      titleEn: whyCardForm.titleEn || '',
      titleBn: whyCardForm.titleBn || '',
      descriptionEn: whyCardForm.descriptionEn || '',
      descriptionBn: whyCardForm.descriptionBn || '',
      icon: whyCardForm.icon || 'Sparkles',
      categoryEn: whyCardForm.categoryEn || '',
      categoryBn: whyCardForm.categoryBn || '',
      badgeTextEn: whyCardForm.badgeTextEn || '',
      badgeTextBn: whyCardForm.badgeTextBn || '',
      displayOrder: Number(whyCardForm.displayOrder) || 1,
      visible: whyCardForm.visible !== false
    };
    await adminDB.saveWhyChooseUsCard(card);
    const wcuC = await adminDB.getAllWhyChooseUsCards(); setWhyChooseUsCardsState(wcuC || []);
    setEditingWhyCard(null);
    setIsCreatingWhyCard(false);
    setWhyCardForm({
      titleEn: '', titleBn: '', descriptionEn: '', descriptionBn: '', icon: 'Sparkles', categoryEn: '', categoryBn: '', badgeTextEn: '', badgeTextBn: '', displayOrder: 1, visible: true
    });
    triggerNotice(currentLang === 'en' ? 'Card saved successfully!' : 'কার্ড সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteWhyCard = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this card?' : 'আপনি কি নিশ্চিত যে এই কার্ডটি মুছে ফেলতে চান?')) {
      await adminDB.deleteWhyChooseUsCard(id);
      const wcuC = await adminDB.getAllWhyChooseUsCards(); setWhyChooseUsCardsState(wcuC || []);
      triggerNotice(currentLang === 'en' ? 'Card deleted.' : 'কার্ড মুছে ফেলা হয়েছে।');
    }
  };

  const handleSaveWhyStat = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingWhyStat ? editingWhyStat.id : `why-stat-${Date.now()}`;
    const stat: WhyChooseUsStat = {
      id,
      value: whyStatForm.value || '',
      labelEn: whyStatForm.labelEn || '',
      labelBn: whyStatForm.labelBn || '',
      displayOrder: Number(whyStatForm.displayOrder) || 1,
      visible: whyStatForm.visible !== false
    };
    await adminDB.saveWhyChooseUsStat(stat);
    const wcuS = await adminDB.getAllWhyChooseUsStats(); setWhyChooseUsStatsState(wcuS || []);
    setEditingWhyStat(null);
    setIsCreatingWhyStat(false);
    setWhyStatForm({ value: '', labelEn: '', labelBn: '', displayOrder: 1, visible: true });
    triggerNotice(currentLang === 'en' ? 'Stat saved successfully!' : 'পরিসংখ্যান সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteWhyStat = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this stat?' : 'আপনি কি নিশ্চিত যে এই পরিসংখ্যানটি মুছে ফেলতে চান?')) {
      await adminDB.deleteWhyChooseUsStat(id);
      const wcuS = await adminDB.getAllWhyChooseUsStats(); setWhyChooseUsStatsState(wcuS || []);
      triggerNotice(currentLang === 'en' ? 'Stat deleted.' : 'পরিসংখ্যান মুছে ফেলা হয়েছে।');
    }
  };

  const handleSaveWhyBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingWhyBadge ? editingWhyBadge.id : `why-badge-${Date.now()}`;
    const badge: WhyChooseUsBadge = {
      id,
      labelEn: whyBadgeForm.labelEn || '',
      labelBn: whyBadgeForm.labelBn || '',
      displayOrder: Number(whyBadgeForm.displayOrder) || 1,
      visible: whyBadgeForm.visible !== false
    };
    await adminDB.saveWhyChooseUsBadge(badge);
    const wcuB = await adminDB.getAllWhyChooseUsBadges(); setWhyChooseUsBadgesState(wcuB || []);
    setEditingWhyBadge(null);
    setIsCreatingWhyBadge(false);
    setWhyBadgeForm({ labelEn: '', labelBn: '', displayOrder: 1, visible: true });
    triggerNotice(currentLang === 'en' ? 'Badge saved successfully!' : 'ব্যাজ সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteWhyBadge = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this badge?' : 'আপনি কি নিশ্চিত যে এই ব্যাজটি মুছে ফেলতে চান?')) {
      await adminDB.deleteWhyChooseUsBadge(id);
      const wcuB = await adminDB.getAllWhyChooseUsBadges(); setWhyChooseUsBadgesState(wcuB || []);
      triggerNotice(currentLang === 'en' ? 'Badge deleted.' : 'ব্যাজ মুছে ফেলা হয়েছে।');
    }
  };

  const handleSaveWhyTech = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingWhyTech ? editingWhyTech.id : `why-tech-${Date.now()}`;
    const tech: WhyChooseUsTech = {
      id,
      name: whyTechForm.name || '',
      logoUrl: whyTechForm.logoUrl || '',
      displayOrder: Number(whyTechForm.displayOrder) || 1,
      visible: whyTechForm.visible !== false
    };
    await adminDB.saveWhyChooseUsTech(tech);
    const wcuT = await adminDB.getAllWhyChooseUsTechs(); setWhyChooseUsTechsState(wcuT || []);
    setEditingWhyTech(null);
    setIsCreatingWhyTech(false);
    setWhyTechForm({ name: '', logoUrl: '', displayOrder: 1, visible: true });
    triggerNotice(currentLang === 'en' ? 'Technology saved successfully!' : 'প্রযুক্তি সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteWhyTech = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this technology?' : 'আপনি কি নিশ্চিত যে এই প্রযুক্তিটি মুছে ফেলতে চান?')) {
      await adminDB.deleteWhyChooseUsTech(id);
      const wcuT = await adminDB.getAllWhyChooseUsTechs(); setWhyChooseUsTechsState(wcuT || []);
      triggerNotice(currentLang === 'en' ? 'Technology deleted.' : 'প্রযুক্তি মুছে ফেলা হয়েছে।');
    }
  };

  const handleSaveWhyCTA = async (e: React.FormEvent) => {
    e.preventDefault();
    const cta: WhyChooseUsCTA = {
      taglineEn: whyCTAForm.taglineEn || '',
      taglineBn: whyCTAForm.taglineBn || '',
      headlineEn: whyCTAForm.headlineEn || '',
      headlineBn: whyCTAForm.headlineBn || '',
      descriptionEn: whyCTAForm.descriptionEn || '',
      descriptionBn: whyCTAForm.descriptionBn || '',
      primaryButtonTextEn: whyCTAForm.primaryButtonTextEn || '',
      primaryButtonTextBn: whyCTAForm.primaryButtonTextBn || '',
      secondaryButtonTextEn: whyCTAForm.secondaryButtonTextEn || '',
      secondaryButtonTextBn: whyCTAForm.secondaryButtonTextBn || ''
    };
    await adminDB.saveWhyChooseUsCTA(cta);
    setWhyChooseUsCTAState(cta);
    triggerNotice(currentLang === 'en' ? 'CTA saved successfully!' : 'কল-টু-অ্যাকশন সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  // Media Library helpers
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    const list = [...mediaItems];
    list.unshift({
      id: `media-${Date.now()}`,
      title: newMediaTitle || 'Asset Reference',
      group: newMediaGroup || 'portfolio',
      url: newMediaUrl
    });
    setLocalItem('next_solution_media', JSON.stringify(list));
    setMediaItems(list);
    setNewMediaUrl('');
    setNewMediaTitle('');
    triggerNotice(currentLang === 'en' ? 'New asset added to Media Library!' : 'মিডিয়া লাইব্রেরিতে নতুন ছবি যোগ করা হয়েছে!');
  };

  const handleDeleteMedia = (id: string) => {
    const list = mediaItems.filter(m => m.id !== id);
    setLocalItem('next_solution_media', JSON.stringify(list));
    setMediaItems(list);
    triggerNotice(currentLang === 'en' ? 'Asset deleted from Media Library.' : 'মিডিয়া ফাইলটি মুছে ফেলা হয়েছে।');
  };

  // PROCESS WORKFLOW ACTIONS
  const handleSaveProcessStep = async (e: React.FormEvent) => {
    e.preventDefault();
    const step: ProcessStep = {
      id: editingProcessStep?.id || `process-step-${Date.now()}`,
      stepNumber: processStepForm.stepNumber ? String(processStepForm.stepNumber) : '1',
      titleEn: processStepForm.titleEn || '',
      titleBn: processStepForm.titleBn || '',
      descriptionEn: processStepForm.descriptionEn || '',
      descriptionBn: processStepForm.descriptionBn || '',
      icon: processStepForm.icon || '💡',
      estimatedDurationEn: processStepForm.estimatedDurationEn || '',
      estimatedDurationBn: processStepForm.estimatedDurationBn || '',
      deliverablesEn: Array.isArray(processStepForm.deliverablesEn) ? processStepForm.deliverablesEn : [],
      deliverablesBn: Array.isArray(processStepForm.deliverablesBn) ? processStepForm.deliverablesBn : [],
      toolsUsed: Array.isArray(processStepForm.toolsUsed) ? processStepForm.toolsUsed : [],
      servicesIncludedEn: Array.isArray(processStepForm.servicesIncludedEn) ? processStepForm.servicesIncludedEn : [],
      servicesIncludedBn: Array.isArray(processStepForm.servicesIncludedBn) ? processStepForm.servicesIncludedBn : [],
      animationType: processStepForm.animationType || 'fade',
      displayOrder: Number(processStepForm.displayOrder) || 1,
      visible: processStepForm.visible !== false
    };
    await adminDB.saveProcessStep(step);
    const pSteps = await adminDB.getAllProcessSteps(); setProcessStepsState(pSteps || []);
    setEditingProcessStep(null);
    setIsCreatingProcessStep(false);
    setProcessStepForm({
      stepNumber: '1', titleEn: '', titleBn: '', descriptionEn: '', descriptionBn: '', icon: '💡', estimatedDurationEn: '', estimatedDurationBn: '', deliverablesEn: [], deliverablesBn: [], toolsUsed: [], servicesIncludedEn: [], servicesIncludedBn: [], animationType: 'fade', displayOrder: 1, visible: true
    });
    triggerNotice(currentLang === 'en' ? 'Process step saved successfully!' : 'প্রসেস ধাপ সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteProcessStep = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this process step?' : 'আপনি কি নিশ্চিত যে এই প্রসেস ধাপটি মুছে ফেলতে চান?')) {
      await adminDB.deleteProcessStep(id);
      const pSteps = await adminDB.getAllProcessSteps(); setProcessStepsState(pSteps || []);
      triggerNotice(currentLang === 'en' ? 'Process step deleted.' : 'প্রসেস ধাপ মুছে ফেলা হয়েছে।');
    }
  };

  // TECH STACK CMS ACTIONS
  const handleSaveTechServiceCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const card: TechServiceCard = {
      id: editingTechServiceCard?.id || `tech-card-${Date.now()}`,
      icon: techServiceCardForm.icon || 'Globe',
      categoryEn: techServiceCardForm.categoryEn || '',
      categoryBn: techServiceCardForm.categoryBn || '',
      descriptionEn: techServiceCardForm.descriptionEn || '',
      descriptionBn: techServiceCardForm.descriptionBn || '',
      technologies: Array.isArray(techServiceCardForm.technologies) ? techServiceCardForm.technologies : [],
      projectCount: techServiceCardForm.projectCount || '',
      popularProjectsEn: Array.isArray(techServiceCardForm.popularProjectsEn) ? techServiceCardForm.popularProjectsEn : [],
      popularProjectsBn: Array.isArray(techServiceCardForm.popularProjectsBn) ? techServiceCardForm.popularProjectsBn : [],
      benefitsEn: Array.isArray(techServiceCardForm.benefitsEn) ? techServiceCardForm.benefitsEn : [],
      benefitsBn: Array.isArray(techServiceCardForm.benefitsBn) ? techServiceCardForm.benefitsBn : [],
      experienceLevelEn: techServiceCardForm.experienceLevelEn || '',
      experienceLevelBn: techServiceCardForm.experienceLevelBn || '',
      featuredBadgeEn: techServiceCardForm.featuredBadgeEn || '',
      featuredBadgeBn: techServiceCardForm.featuredBadgeBn || '',
      displayOrder: Number(techServiceCardForm.displayOrder) || 1,
      visible: techServiceCardForm.visible !== false,
      animationType: techServiceCardForm.animationType || 'fade'
    };

    await adminDB.saveTechServiceCard(card);
    const tsCards = await adminDB.getAllTechServiceCards(); setTechServiceCardsState(tsCards || []);
    setEditingTechServiceCard(null);
    setIsCreatingTechServiceCard(false);
    setTechServiceCardForm({
      icon: 'Globe', categoryEn: '', categoryBn: '', descriptionEn: '', descriptionBn: '', technologies: [], projectCount: '', popularProjectsEn: [], popularProjectsBn: [], benefitsEn: [], benefitsBn: [], experienceLevelEn: '', experienceLevelBn: '', featuredBadgeEn: '', featuredBadgeBn: '', displayOrder: 1, visible: true, animationType: 'fade'
    });
    triggerNotice(currentLang === 'en' ? 'Technology Service Card saved successfully!' : 'টেকনোলজি সার্ভিস কার্ড সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  const handleDeleteTechServiceCard = async (id: string) => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to delete this card?' : 'আপনি কি নিশ্চিত যে এই কার্ডটি মুছে ফেলতে চান?')) {
      await adminDB.deleteTechServiceCard(id);
      const tsCards = await adminDB.getAllTechServiceCards(); setTechServiceCardsState(tsCards || []);
      triggerNotice(currentLang === 'en' ? 'Technology Service Card deleted.' : 'টেকনোলজি সার্ভিস কার্ড মুছে ফেলা হয়েছে।');
    }
  };

  const handleRestoreTechServiceCards = async () => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to restore default technology cards?' : 'আপনি কি নিশ্চিত যে ডিফল্ট টেকনোলজি কার্ডগুলো পুনরুদ্ধার করতে চান?')) {
      const { initialTechServiceCards } = await import('@/data/initialData'); for (const card of initialTechServiceCards) { await adminDB.saveTechServiceCard(card); }
      const tsCards = await adminDB.getAllTechServiceCards(); setTechServiceCardsState(tsCards || []);
      triggerNotice(currentLang === 'en' ? 'Technology Service Cards restored to default.' : 'টেকনোলজি সার্ভিস কার্ডগুলো ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।');
    }
  };

  const handleSaveProcessCTA = async (e: React.FormEvent) => {
    e.preventDefault();
    const cta: ProcessCTA = {
      id: 'process-cta',
      titleEn: processCTAForm.titleEn || '',
      titleBn: processCTAForm.titleBn || '',
      highlightEn: processCTAForm.highlightEn || '',
      highlightBn: processCTAForm.highlightBn || '',
      subtitleEn: processCTAForm.subtitleEn || '',
      subtitleBn: processCTAForm.subtitleBn || '',
      ctaHeadlineEn: processCTAForm.ctaHeadlineEn || '',
      ctaHeadlineBn: processCTAForm.ctaHeadlineBn || '',
      ctaSubtitleEn: processCTAForm.ctaSubtitleEn || '',
      ctaSubtitleBn: processCTAForm.ctaSubtitleBn || '',
      ctaPrimaryTextEn: processCTAForm.ctaPrimaryTextEn || '',
      ctaPrimaryTextBn: processCTAForm.ctaPrimaryTextBn || '',
      ctaSecondaryTextEn: processCTAForm.ctaSecondaryTextEn || '',
      ctaSecondaryTextBn: processCTAForm.ctaSecondaryTextBn || ''
    };
    await adminDB.saveProcessCTA(cta);
    setProcessCTAState(cta);
    triggerNotice(currentLang === 'en' ? 'Process CTA saved successfully!' : 'প্রসেস কল-টু-অ্যাকশন সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  // Reset database callback
  const handleResetDB = async () => {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to reset all database entries? This deletes custom submissions.' : 'আপনি কি সত্যিই সম্পূর্ণ ডাটাবেস রিসেট করতে চান?')) {
      await fetch('/api/seed', { method: 'GET' });
      await loadAdminData();
      triggerNotice(currentLang === 'en' ? 'Database restored to high-end seeds!' : 'ডাটাবেস সফলভাবে আদি ফ্যাক্টরি সেটিংসে রিসেট করা হয়েছে!');
    }
  };

  const triggerNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  // Authentication Screen Layout
  if (!isAuthenticated) {
    return (
      <section id="admin-auth-screen" className="flex items-center justify-center min-h-[70vh] bg-white dark:bg-[#141414] px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 md:p-8 shadow-xl text-center space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400">
            <LockIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {currentLang === 'en' ? 'Enter Administrative Console' : 'প্রশাসনিক কনসোলে প্রবেশ করুন'}
            </h2>
            <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1.5">
              {currentLang === 'en' ? 'Provide security credentials to unlock active CRUD operations.' : 'অ্যাক্টিভ CRUD ক্রিয়াকলাপগুলি আনলক করতে পিন সরবরাহ করুন।'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider">
                {currentLang === 'en' ? 'Passcode' : 'পাসকোড'}
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={currentLang === 'en' ? 'Enter admin to access' : 'প্রবেশ করতে admin লিখুন'}
                className="w-full rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-2.5 text-sm text-gray-800 dark:text-neutral-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 transition"
              />
            </div>

            {authError && (
              <span className="block text-xs text-red-500 dark:text-red-400 font-semibold">{authError}</span>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold py-3 transition shadow-sm"
            >
              {currentLang === 'en' ? 'Unlock Control Panel' : 'প্যানেল আনলক করুন'}
            </button>
          </form>

          <div className="rounded bg-blue-50/50 border border-blue-100 dark:border-orange-500/20 p-3 text-[10px] text-gray-500 dark:text-neutral-400 max-w-xs mx-auto">
            💡 {currentLang === 'en' ? 'Security Notice: Input passcode "admin" to explore complete database controls.' : 'নিরাপত্তা বিজ্ঞপ্তি: সম্পূর্ণ ডাটাবেস নিয়ন্ত্রণ করতে পাসকোড "admin" লিখুন।'}
          </div>
        </div>
      </section>
    );
  }

  // Primary Authenticated Admin Console Layout
  return (
    <section id="admin-main-dashboard" className="bg-gray-50 dark:bg-[#0c0c0c] py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-neutral-700/80 pb-6 mb-8">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <SparklesIcon className="h-5.5 w-5.5 text-blue-500 dark:text-orange-400" />
              <span>{currentLang === 'en' ? 'Next Solution Console' : 'নেক্সট সリューション কনসোল'}</span>
            </h2>
            <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
              {currentLang === 'en' ? 'Live administration dashboard with direct localStorage persistence.' : 'সরাসরি লোকালস্টোরেজ ডাটাবেস সহ লাইভ অ্যাডমিন প্যানেল।'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Lock option */}
            <button
              id="admin-lock-btn"
              onClick={() => setIsAuthenticated(false)}
              className="rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
            >
              <LockIcon className="h-3.5 w-3.5" />
              <span>{currentLang === 'en' ? 'Lock Console' : 'লক কনসোল'}</span>
            </button>
            
            {/* Database Reset */}
            <button
              id="admin-reset-db-btn"
              onClick={handleResetDB}
              className="rounded-lg border border-red-200 dark:border-red-500/30 bg-red-50/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              <span>{currentLang === 'en' ? 'Reset DB' : 'ডাটাবেস রিসেট'}</span>
            </button>
          </div>
        </div>

        {/* Global Success Notification banner */}
        {successNotice && (
          <div id="admin-toast-banner" className="mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center space-x-2">
            <CheckCircle2Icon className="h-4.5 w-4.5" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Console Overview indicators */}
        <div id="admin-metrics-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 shadow-sm">
            <span className="block text-[9px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-1">
              <MailIcon className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400" />
              <span>Inbound Leads</span>
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white block mt-1.5">{messages.length} Total</span>
            <span className="text-[10px] text-gray-400 dark:text-neutral-500">{messages.filter(m => m.status === 'unread').length} Unread</span>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 shadow-sm">
            <span className="block text-[9px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-1">
              <UsersIcon className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400" />
              <span>Intel Subscriptions</span>
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white block mt-1.5">{subscribers.length} Members</span>
            <span className="text-[10px] text-gray-400 dark:text-neutral-500">Live persistence</span>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 shadow-sm">
            <span className="block text-[9px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-1">
              <BookOpenIcon className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400" />
              <span>Published Blogs</span>
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white block mt-1.5">{blogs.filter(b => b.status === 'published').length} Live</span>
            <span className="text-[10px] text-gray-400 dark:text-neutral-500">{blogs.filter(b => b.status === 'draft').length} Drafts</span>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 shadow-sm">
            <span className="block text-[9px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest flex items-center gap-1">
              <SettingsIcon className="h-3.5 w-3.5 text-blue-500 dark:text-orange-400" />
              <span>Core Services</span>
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white block mt-1.5">{services.length} Capabilities</span>
            <span className="text-[10px] text-gray-400 dark:text-neutral-500">Dual translations</span>
          </div>
        </div>

        {/* Dashboard Navigation & Working Desk split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sub Tab selection (Sidebar left) */}
          <div className="lg:col-span-3 rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible shadow-sm">
{[
              { id: 'overview', label: currentLang === 'en' ? 'Dashboard Overview' : 'ড্যাশবোর্ড ওভারভিউ', icon: BarChart3Icon },
              { id: 'messages', label: currentLang === 'en' ? 'Inbound Leads' : 'প্রাপ্ত বার্তা সমূহ', icon: MailIcon },
              { id: 'services', label: currentLang === 'en' ? 'Manage Services' : 'সার্ভিস পরিবর্তন', icon: SettingsIcon },
              { id: 'portfolio', label: currentLang === 'en' ? 'Manage Portfolio' : 'পোর্টফোলিও পরিচালনা', icon: FolderKanbanIcon },
              { id: 'pricing', label: currentLang === 'en' ? 'Pricing Plans' : 'প্রাইসিং প্যাকেজ', icon: DollarSignIcon },
              { id: 'faqs', label: currentLang === 'en' ? 'Manage FAQs' : 'সাধারণ জিজ্ঞাসা', icon: HelpCircleIcon },
              { id: 'team', label: currentLang === 'en' ? 'Team Members' : 'টিম মেম্বার্স', icon: UserCheckIcon },
              { id: 'settings', label: currentLang === 'en' ? 'Site Config & SEO' : 'সাইটের তথ্য ও এসইও', icon: SettingsIcon },
              { id: 'products', label: currentLang === 'en' ? 'Manage Products' : 'প্রোডাক্টস পরিচালনা', icon: ShoppingBagIcon }
            ].map((tab) => (
              <button
                id={`admin-tab-trigger-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  setIsCreatingBlog(false);
                  setEditingBlog(null);
                  setEditingService(null);
                  setEditingPortfolio(null);
                  setIsCreatingPortfolio(false);
                  setEditingFAQ(null);
                  setIsCreatingFAQ(false);
                  setEditingTestimonial(null);
                  setIsCreatingTestimonial(false);
                  setEditingPricingPlan(null);
                  setIsCreatingPricingPlan(false);
                  setEditingTeamMember(null);
                  setIsCreatingTeamMember(false);
                  setEditingUser(null);
                  setIsCreatingUser(false);
                  setEditingWhyCard(null);
                  setIsCreatingWhyCard(false);
                  setEditingWhyStat(null);
                  setIsCreatingWhyStat(false);
                  setEditingWhyBadge(null);
                  setIsCreatingWhyBadge(false);
                  setEditingWhyTech(null);
                  setIsCreatingWhyTech(false);
                  setEditingProcessStep(null);
                  setIsCreatingProcessStep(false);
                  setEditingTechServiceCard(null);
                  setIsCreatingTechServiceCard(false);
                }}
                className={`flex items-center space-x-2 w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold transition duration-150 shrink-0 lg:shrink-1 ${
                  activeSubTab === tab.id
                    ? 'bg-blue-600 dark:bg-orange-500 text-white shadow-sm shadow-blue-600/10'
                    : 'text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-[#1a1a1a]'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Work Desk (Right panel) */}
          <div className="lg:col-span-9 bg-white dark:bg-[#141414] border border-gray-200 dark:border-neutral-700/80 rounded-2xl p-5 md:p-6 shadow-sm overflow-hidden">
            
            {/* T0: DASHBOARD OVERVIEW & ANALYTICS */}
            {activeSubTab === 'overview' && (
              <div id="panel-overview-desk" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Enterprise Operations Hub' : 'এন্টারপ্রাইজ অপারেশনস হাব'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-widest font-mono">Live Systems Connected</span>
                  </div>
                </div>

                {/* KPI Metrics row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 space-y-1 shadow-sm">
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase block">Monthly Revenue</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">$24,500</span>
                    <span className="text-[9px] text-emerald-500 dark:text-emerald-400 font-bold flex items-center">↑ 12.4% vs last month</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 space-y-1 shadow-sm">
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase block">Lead Conversion</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">8.42%</span>
                    <span className="text-[9px] text-emerald-500 dark:text-emerald-400 font-bold flex items-center">↑ 2.1% conversion rate</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 space-y-1 shadow-sm">
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase block">Total Leads Logged</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">{messages.length}</span>
                    <span className="text-[9px] text-blue-500 dark:text-orange-400 font-semibold block">Real-time DB synced</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-neutral-700/80 bg-white dark:bg-[#141414] p-4 space-y-1 shadow-sm">
                    <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase block">Subscriber Intel</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">{subscribers.length}</span>
                    <span className="text-[9px] text-purple-500 font-semibold block">Active newsletters</span>
                  </div>
                </div>

                {/* Analytic Graphs mock dashboard using SVG */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-4 md:p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Client Traffic & Lead Volume</h4>
                        <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">Bi-weekly analytics aggregation</p>
                      </div>
                      <select className="text-[10px] bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 rounded px-2 py-1 font-bold">
                        <option>7 Days (Interval)</option>
                        <option>30 Days (Rolling)</option>
                        <option>Year to Date</option>
                      </select>
                    </div>
                    {/* SVG Line Chart */}
                    <div className="relative h-48 w-full bg-gray-50/50 rounded-lg flex items-end px-4 pb-2 pt-6">
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area path */}
                        <path d="M 0 85 Q 15 65 30 75 T 60 40 T 90 20 T 100 15 L 100 95 L 0 95 Z" fill="url(#gradient-area)" />
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
                        {/* Main line path */}
                        <path d="M 0 85 Q 15 65 30 75 T 60 40 T 90 20 T 100 15" fill="none" stroke="#FF4D00" strokeWidth="2" strokeLinecap="round" />
                        {/* Dots */}
                        <circle cx="30" cy="75" r="2" fill="#FF4D00" />
                        <circle cx="60" cy="40" r="2" fill="#FF4D00" />
                        <circle cx="90" cy="20" r="2" fill="#FF4D00" />
                      </svg>
                      {/* X Axis Labels */}
                      <div className="w-full flex justify-between text-[8px] font-bold text-gray-400 dark:text-neutral-500 font-mono relative z-10">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                        <span>Sun</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-4 space-y-4 shadow-sm">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">Acquisition Channels</h4>
                      <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">Where inbound leads originate</p>
                    </div>
                    {/* Funnel list representation */}
                    <div className="space-y-3 pt-2">
                      {[
                        { label: 'Organic Search (SEO)', pct: '48%', color: 'bg-blue-600 dark:bg-orange-500' },
                        { label: 'LinkedIn Marketing', pct: '28%', color: 'bg-emerald-600' },
                        { label: 'Client Referrals', pct: '15%', color: 'bg-indigo-600' },
                        { label: 'Direct / Word of Mouth', pct: '9%', color: 'bg-purple-600' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-gray-600 dark:text-neutral-300">
                            <span>{item.label}</span>
                            <span className="font-mono">{item.pct}</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Operations checklist and system logs */}
                <div className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-4 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">System Audit & Status Log</h4>
                  <div className="divide-y divide-gray-50 text-[10px]">
                    <div className="py-2.5 flex items-center justify-between text-gray-600 dark:text-neutral-300">
                      <span>Database initialized successfully (seeded default records)</span>
                      <span className="font-mono text-gray-400 dark:text-neutral-500">July 10, 2026</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between text-gray-600 dark:text-neutral-300">
                      <span>Services module string integrity confirmed and secured</span>
                      <span className="font-mono text-emerald-500 dark:text-emerald-400 font-bold">Passed</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between text-gray-600 dark:text-neutral-300">
                      <span>Supabase storage container connection emulation</span>
                      <span className="font-mono text-blue-500 dark:text-orange-400 font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* T1: INBOUND LEADS SECTION */}
            {activeSubTab === 'messages' && (
              <div id="panel-leads-desk" className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-50 pb-3">
                  {currentLang === 'en' ? 'Inbound Customer Leads' : 'প্রাপ্ত কাস্টমার লিডসমূহ'}
                </h3>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`rounded-xl border p-4 text-xs space-y-3 transition ${
                        msg.status === 'unread' 
                          ? 'border-blue-400 bg-blue-50/10' 
                          : 'border-gray-100 dark:border-neutral-800'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-2">
                        <div>
                          <span className="font-bold text-sm text-gray-900 dark:text-white block">{msg.name}</span>
                          <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px]">{msg.email} | {msg.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            id={`status-toggle-${msg.id}`}
                            onClick={() => handleToggleMessageStatus(msg.id, msg.status)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition ${
                              msg.status === 'unread'
                                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                                : msg.status === 'read'
                                ? 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 border border-gray-200 dark:border-neutral-700'
                                : 'bg-emerald-100 text-emerald-700 dark:text-emerald-300'
                            }`}
                          >
                            {msg.status}
                          </button>

                          <button
                            id={`delete-msg-${msg.id}`}
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:text-red-400 rounded transition"
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-[11px] font-semibold text-gray-500 dark:text-neutral-400 bg-gray-50 dark:bg-[#141414] p-2.5 rounded-lg">
                        <div>Desired Service: <span className="text-gray-800 dark:text-neutral-100">{msg.service}</span></div>
                        <div>Estimated Budget: <span className="text-gray-800 dark:text-neutral-100">{msg.budget}</span></div>
                      </div>

                      <p className="text-gray-700 dark:text-neutral-200 leading-relaxed text-[11px] whitespace-pre-line bg-gray-50 dark:bg-[#141414] p-2.5 rounded-lg">
                        {msg.message}
                      </p>
                      
                      <div className="text-[10px] text-gray-400 dark:text-neutral-500 font-medium">
                        Received on: {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-10 text-gray-400 dark:text-neutral-500 italic">
                      No inbound customer messages stored. Use the Contact Page form to log messages in real-time!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* T2: NEWSLETTER SUBSCRIBERS LIST */}
            {activeSubTab === 'subscribers' && (
              <div id="panel-subs-desk" className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-50 pb-3">
                  {currentLang === 'en' ? 'Intel Subscribers Directory' : 'নিউজলেটার সাবস্ক্রাইবার তালিকা'}
                </h3>

                <div className="overflow-x-auto border border-gray-100 dark:border-neutral-800 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                     <thead>
                       <tr className="bg-gray-50 dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-800 font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500">
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Subscribed Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-gray-600 dark:text-neutral-300">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]">
                          <td className="p-4 font-semibold text-gray-900 dark:text-white">{sub.email}</td>
                          <td className="p-4">{new Date(sub.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            <button
                              id={`delete-sub-${sub.id}`}
                              onClick={() => handleDeleteSub(sub.id)}
                              className="text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:text-red-400 rounded p-1"
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {subscribers.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-gray-400 dark:text-neutral-500 italic">
                            No active subscribers listed. Use the footer newsletter form to add subscribers instantly!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* T3: MANAGE BLOG ARTICLES CRUD */}
            {activeSubTab === 'blogs' && (
              <div id="panel-blogs-desk" className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Manage Published Intelligence' : 'নিবন্ধ পরিচালনা ও প্রকাশ'}
                  </h3>
                  {!isCreatingBlog && (
                    <button
                      id="create-blog-btn"
                      onClick={() => {
                        setIsCreatingBlog(true);
                        setEditingBlog(null);
                        setBlogForm({
                          titleEn: '', titleBn: '', excerptEn: '', excerptBn: '', contentEn: '', contentBn: '',
                          categoryEn: 'Technology', categoryBn: 'প্রযুক্তি', tags: ['Code', 'Engineering'],
                          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
                          author: 'Sanjid Rahman (CTO)', readTime: '5 Min Read', status: 'published'
                        });
                      }}
                      className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition shadow-sm"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                      <span>{currentLang === 'en' ? 'Create Article' : 'নতুন পোস্ট তৈরি'}</span>
                    </button>
                  )}
                </div>

                {isCreatingBlog ? (
                  <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Title (English)</label>
                        <input
                          id="blog-form-titleEn"
                          type="text"
                          required
                          value={blogForm.titleEn}
                          onChange={(e) => setBlogForm({ ...blogForm, titleEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Category (English)</label>
                        <input
                          id="blog-form-catEn"
                          type="text"
                          required
                          value={blogForm.categoryEn}
                          onChange={(e) => setBlogForm({ ...blogForm, categoryEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Excerpt (English)</label>
                        <textarea
                          id="blog-form-exEn"
                          rows={2}
                          required
                          value={blogForm.excerptEn}
                          onChange={(e) => setBlogForm({ ...blogForm, excerptEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        ></textarea>
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Content (English)</label>
                        <textarea
                          id="blog-form-conEn"
                          rows={6}
                          required
                          value={blogForm.contentEn}
                          onChange={(e) => setBlogForm({ ...blogForm, contentEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        ></textarea>
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Author</label>
                        <input
                          id="blog-form-author"
                          type="text"
                          required
                          value={blogForm.author}
                          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Image URL</label>
                        <input
                          id="blog-form-image"
                          type="text"
                          required
                          value={blogForm.image}
                          onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Publication Status</label>
                        <select
                          id="blog-form-status"
                          value={blogForm.status}
                          onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        >
                          <option value="draft">Draft (Private)</option>
                          <option value="published">Published (Live to blog tab)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        id="blog-cancel-btn"
                        type="button"
                        onClick={() => {
                          setIsCreatingBlog(false);
                          setEditingBlog(null);
                        }}
                        className="rounded border border-gray-200 dark:border-neutral-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                      >
                        Cancel
                      </button>
                      <button
                        id="blog-submit-btn"
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 font-bold shadow-sm"
                      >
                        Save & Deploy
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="overflow-x-auto border border-gray-100 dark:border-neutral-800 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-[#141414] border-b border-gray-100 dark:border-neutral-800 font-bold uppercase tracking-wider text-gray-400 dark:text-neutral-500">
                          <th className="p-4">Title (English)</th>
                          <th className="p-4">Author</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-gray-600 dark:text-neutral-300">
                        {blogs.map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]">
                            <td className="p-4 font-semibold text-gray-900 dark:text-white max-w-xs truncate">{b.titleEn}</td>
                            <td className="p-4">{b.author}</td>
                            <td className="p-4">{b.categoryEn}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                b.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 text-amber-600 dark:text-amber-400'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                id={`edit-blog-btn-${b.id}`}
                                onClick={() => handleEditBlogTrigger(b)}
                                className="text-gray-400 dark:text-neutral-500 hover:text-blue-600 dark:hover:text-orange-400 dark:text-orange-400 p-1"
                              >
                                <Edit2Icon className="h-4 w-4" />
                              </button>
                              <button
                                id={`delete-blog-btn-${b.id}`}
                                onClick={() => handleDeleteBlog(b.id)}
                                className="text-gray-400 dark:text-neutral-500 hover:text-red-500 dark:text-red-400 p-1"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* T4: MANAGE CORE CAPABILITIES SERVICES */}
            {activeSubTab === 'services' && (
              <div id="panel-services-desk" className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Manage Capability Matrix' : 'সার্ভিসের বিবরণ ও বাজেট পরিবর্তন'}
                  </h3>
                  {!editingService && (
                    <button
                      id="admin-add-service-btn"
                      onClick={() => setEditingService({
                        id: '',
                        category: 'Engineering',
                        titleEn: '',
                        titleBn: '',
                        descriptionEn: '',
                        descriptionBn: '',
                        featuresEn: [],
                        featuresBn: [],
                        benefitsEn: [],
                        benefitsBn: [],
                        price: '$3,000',
                        icon: 'Laptop',
                        slug: '',
                        processEn: [],
                        processBn: [],
                        techUsed: [],
                        subtitleEn: '',
                        subtitleBn: '',
                        whyNeedEn: '',
                        whyNeedBn: '',
                        whoForEn: '',
                        whoForBn: '',
                        businessImpactEn: '',
                        businessImpactBn: '',
                        subServicesJson: '[]',
                        pricingJson: '[]',
                        faqsJson: '[]'
                      })}
                      className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                      <span>{currentLang === 'en' ? 'Create Service' : 'নতুন সার্ভিস'}</span>
                    </button>
                  )}
                </div>

                {editingService ? (
                  <form onSubmit={handleSaveServiceEdit} className="space-y-6 text-xs bg-gray-50/50 p-5 rounded-2xl border border-gray-100 dark:border-neutral-800 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                      <h4 className="text-sm font-bold text-blue-600 dark:text-orange-400">Editing: {editingService.titleEn}</h4>
                      <span className="text-[10px] font-mono text-gray-400 dark:text-neutral-500">ID: {editingService.id}</span>
                    </div>
                    
                    {/* SECTION 1: Core Details */}
                    <div className="space-y-4">
                      <h5 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">1. Core Details</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Starting Price</label>
                          <input
                            id="service-form-price"
                            type="text"
                            required
                            value={editingService.price}
                            onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Category Group</label>
                          <input
                            id="service-form-cat"
                            type="text"
                            required
                            value={editingService.category}
                            onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Slug (e.g. web-development)</label>
                          <input
                            id="service-form-slug"
                            type="text"
                            value={editingService.slug || ''}
                            onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                            placeholder="Leave blank to auto-generate from English Title"
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Lucide Icon Name (e.g. Sparkles, Laptop, Smartphone)</label>
                          <input
                            id="service-form-icon"
                            type="text"
                            required
                            value={editingService.icon || ''}
                            onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Title (English)</label>
                          <input
                            id="service-form-titleEn"
                            type="text"
                            required
                            value={editingService.titleEn}
                            onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Description (English)</label>
                          <textarea
                            id="service-form-descEn"
                            rows={3}
                            value={editingService.descriptionEn}
                            onChange={(e) => setEditingService({ ...editingService, descriptionEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          ></textarea>
                        </div>
                        
                      </div>
                    </div>

                    {/* SECTION 2: Subtitle & Copywriting */}
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <h5 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">2. High-Impact Copywriting</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Subtitle (English)</label>
                          <input
                            id="service-form-subEn"
                            type="text"
                            value={editingService.subtitleEn || ''}
                            onChange={(e) => setEditingService({ ...editingService, subtitleEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Hook line"
                          />
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Why You Need This (English)</label>
                          <textarea
                            id="service-form-whyEn"
                            rows={2}
                            value={editingService.whyNeedEn || ''}
                            onChange={(e) => setEditingService({ ...editingService, whyNeedEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Core business pain point"
                          ></textarea>
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Who Is This For? (English)</label>
                          <textarea
                            id="service-form-forEn"
                            rows={2}
                            value={editingService.whoForEn || ''}
                            onChange={(e) => setEditingService({ ...editingService, whoForEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Target audience"
                          ></textarea>
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Business Impact (English)</label>
                          <textarea
                            id="service-form-impactEn"
                            rows={2}
                            value={editingService.businessImpactEn || ''}
                            onChange={(e) => setEditingService({ ...editingService, businessImpactEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="ROI outcome"
                          ></textarea>
                        </div>
                        
                      </div>
                    </div>

                    {/* SECTION 3: Deliverables, Process, Stack arrays */}
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <h5 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">3. Arrays & Technology Stack</h5>
                      
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Technology Ecosystem (Comma-separated)</label>
                        <input
                          id="service-form-tech"
                          type="text"
                          value={editingService.techUsed ? editingService.techUsed.join(', ') : ''}
                          onChange={(e) => setEditingService({ ...editingService, techUsed: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          placeholder="e.g. React, Node.js, Tailwind, Postgres"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Core Deliverables (En, Comma-separated)</label>
                          <textarea
                            id="service-form-featEn"
                            rows={2}
                            value={editingService.featuresEn ? editingService.featuresEn.join(', ') : ''}
                            onChange={(e) => setEditingService({ ...editingService, featuresEn: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Deliverable A, Deliverable B"
                          />
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Strategic Benefits (En, Comma-separated)</label>
                          <textarea
                            id="service-form-benEn"
                            rows={2}
                            value={editingService.benefitsEn ? editingService.benefitsEn.join(', ') : ''}
                            onChange={(e) => setEditingService({ ...editingService, benefitsEn: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Benefit A, Benefit B"
                          />
                        </div>
                        
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Execution Framework (En, One step per line)</label>
                          <textarea
                            id="service-form-procEn"
                            rows={3}
                            value={editingService.processEn ? editingService.processEn.join('\n') : ''}
                            onChange={(e) => setEditingService({ ...editingService, processEn: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-mono text-[10px] focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                            placeholder="Step 1&#10;Step 2&#10;Step 3"
                          />
                        </div>
                        
                      </div>
                    </div>

                    {/* SECTION 4: JSON lists */}
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <h5 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">4. Structured JSON Modules (Dynamic Lists)</h5>
                      
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Sub-Services List JSON</label>
                        <textarea
                          id="service-form-subjson"
                          rows={3}
                          value={editingService.subServicesJson || '[]'}
                          onChange={(e) => setEditingService({ ...editingService, subServicesJson: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-mono text-[10px] focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        />
                        <span className="text-[9px] text-gray-400 dark:text-neutral-500 block font-mono">{'Format: [{"titleEn": "...", "titleBn": "...", "descEn": "...", "descBn": "..."}]'}</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Pricing Tiers JSON</label>
                        <textarea
                          id="service-form-pricejson"
                          rows={4}
                          value={editingService.pricingJson || '[]'}
                          onChange={(e) => setEditingService({ ...editingService, pricingJson: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-mono text-[10px] focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        />
                        <span className="text-[9px] text-gray-400 dark:text-neutral-500 block font-mono">{'Format: [{"nameEn": "...", "nameBn": "...", "price": "...", "periodEn": "...", "periodBn": "...", "featuresEn": ["A"], "featuresBn": ["১"]}]'}</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Service FAQs JSON</label>
                        <textarea
                          id="service-form-faqjson"
                          rows={3}
                          value={editingService.faqsJson || '[]'}
                          onChange={(e) => setEditingService({ ...editingService, faqsJson: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-mono text-[10px] focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        />
                        <span className="text-[9px] text-gray-400 dark:text-neutral-500 block font-mono">{'Format: [{"questionEn": "...", "questionBn": "...", "answerEn": "...", "answerBn": "..."}]'}</span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <button
                        id="service-cancel-btn"
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="rounded border border-gray-200 dark:border-neutral-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        id="service-submit-btn"
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 text-white px-5 py-2 font-bold shadow-sm hover:bg-blue-700 dark:hover:bg-orange-400"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((srv) => (
                      <div key={srv.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between text-xs hover:border-blue-500 dark:border-orange-500 transition shadow-sm bg-white dark:bg-[#141414]">
                        <div>
                          <span className="font-bold text-sm text-gray-900 dark:text-white">{srv.titleEn}</span>
                          <span className="block text-gray-400 dark:text-neutral-500 font-mono mt-1">{srv.category} • Budget starting at: <span className="text-blue-600 dark:text-orange-400 font-bold">{srv.price}</span></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            id={`edit-service-btn-${srv.id}`}
                            onClick={() => setEditingService(srv)}
                            className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 transition border border-gray-100 dark:border-neutral-800"
                          >
                            Modify details
                          </button>
                          <button
                            id={`delete-service-btn-${srv.id}`}
                            onClick={() => handleDeleteService(srv.id)}
                            className="rounded border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 dark:text-red-300 p-1.5 transition"
                            title={currentLang === 'en' ? 'Delete Service' : 'সার্ভিস মুছুন'}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* T5: SYSTEM CONFIG SETTINGS */}
            {activeSubTab === 'settings' && settings && (
              <form onSubmit={handleSaveSettings} className="space-y-8 text-xs">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-50 pb-3 flex items-center justify-between">
                  <span>{currentLang === 'en' ? 'Agency Information Config' : 'এজেন্সি তথ্য কনফিগারেশন'}</span>
                  <span className="text-[10px] text-blue-600 dark:text-orange-400 bg-blue-50 dark:bg-orange-500/10 px-2 py-0.5 rounded font-extrabold uppercase">Live DB</span>
                </h3>

                {/* Section A: Core Info */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">A. Core Contacts</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Agency Name</label>
                      <input
                        id="settings-form-name"
                        type="text"
                        required
                        value={settings.agencyName}
                        onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Support Corporate Email</label>
                      <input
                        id="settings-form-email"
                        type="email"
                        required
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Hotline Phone</label>
                      <input
                        id="settings-form-phone"
                        type="text"
                        required
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">GPS Office Address (English)</label>
                      <input
                        id="settings-form-addressEn"
                        type="text"
                        required
                        value={settings.addressEn}
                        onChange={(e) => setSettings({ ...settings, addressEn: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Mission & Vision */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">B. Mission & Vision Statements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Core Mission (English)</label>
                      <textarea
                        id="settings-form-missionEn"
                        rows={3}
                        value={settings.aboutMissionEn || ''}
                        onChange={(e) => setSettings({ ...settings, aboutMissionEn: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        placeholder="Define company mission in English"
                      />
                    </div>
                    
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Long-term Vision (English)</label>
                      <textarea
                        id="settings-form-visionEn"
                        rows={3}
                        value={settings.aboutVisionEn || ''}
                        onChange={(e) => setSettings({ ...settings, aboutVisionEn: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        placeholder="Define company vision in English"
                      />
                    </div>
                    
                  </div>
                </div>

                {/* Section C: Live Counters */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">C. Statistics Counters</h4>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Projects Done</label>
                      <input
                        id="settings-form-stat-projects"
                        type="number"
                        value={settings.statsProjects || 0}
                        onChange={(e) => setSettings({ ...settings, statsProjects: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Happy Clients</label>
                      <input
                        id="settings-form-stat-clients"
                        type="number"
                        value={settings.statsClients || 0}
                        onChange={(e) => setSettings({ ...settings, statsClients: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Team Size</label>
                      <input
                        id="settings-form-stat-team"
                        type="number"
                        value={settings.statsTeam || 0}
                        onChange={(e) => setSettings({ ...settings, statsTeam: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Experience Yrs</label>
                      <input
                        id="settings-form-stat-exp"
                        type="number"
                        value={settings.statsExperience || 0}
                        onChange={(e) => setSettings({ ...settings, statsExperience: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Countries Served</label>
                      <input
                        id="settings-form-stat-countries"
                        type="number"
                        value={settings.statsCountries || 0}
                        onChange={(e) => setSettings({ ...settings, statsCountries: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Satisfaction %</label>
                      <input
                        id="settings-form-stat-satisfy"
                        type="number"
                        value={settings.statsSatisfaction || 0}
                        onChange={(e) => setSettings({ ...settings, statsSatisfaction: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Industries Served</label>
                      <input
                        id="settings-form-stat-industries"
                        type="number"
                        value={settings.statsIndustries || 0}
                        onChange={(e) => setSettings({ ...settings, statsIndustries: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-gray-500 dark:text-neutral-400">Techs Used</label>
                      <input
                        id="settings-form-stat-techs"
                        type="number"
                        value={settings.statsTechs || 0}
                        onChange={(e) => setSettings({ ...settings, statsTechs: parseInt(e.target.value) || 0 })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section D: Advanced Team, Timeline, Techs JSON editors */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">D. Dynamic Lists (JSON Arrays)</h4>
                    <span className="text-[9px] text-gray-400 dark:text-neutral-500">Validate comma structures carefully</span>
                  </div>

                  <div className="space-y-4">
                    {/* Team squad JSON */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Team Members List JSON</label>
                        <span className="text-[9px] bg-gray-50 dark:bg-[#141414] px-1.5 py-0.5 rounded text-gray-400 dark:text-neutral-500 font-mono">
                          Array of Name, Role, Image, Bio, Skills
                        </span>
                      </div>
                      <textarea
                        id="settings-form-teamJson"
                        rows={4}
                        value={settings.aboutTeamJson || '[]'}
                        onChange={(e) => setSettings({ ...settings, aboutTeamJson: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-mono text-[10px]"
                      />
                    </div>

                    {/* Timeline JSON */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Milestones Timeline JSON</label>
                        <span className="text-[9px] bg-gray-50 dark:bg-[#141414] px-1.5 py-0.5 rounded text-gray-400 dark:text-neutral-500 font-mono">
                          Array of Year, titleEn, titleBn, descEn, descBn
                        </span>
                      </div>
                      <textarea
                        id="settings-form-timelineJson"
                        rows={4}
                        value={settings.aboutTimelineJson || '[]'}
                        onChange={(e) => setSettings({ ...settings, aboutTimelineJson: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-mono text-[10px]"
                      />
                    </div>

                    {/* Tech Stack JSON */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Technologies Stack JSON</label>
                        <span className="text-[9px] bg-gray-50 dark:bg-[#141414] px-1.5 py-0.5 rounded text-gray-400 dark:text-neutral-500 font-mono">
                          Array of Name, descEn, descBn, color
                        </span>
                      </div>
                      <textarea
                        id="settings-form-techsJson"
                        rows={4}
                        value={settings.aboutTechsJson || '[]'}
                        onChange={(e) => setSettings({ ...settings, aboutTechsJson: e.target.value })}
                        className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-neutral-800">
                  <button
                    id="settings-save-btn"
                    type="submit"
                    className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-6 py-2.5 font-bold transition shadow-md shadow-blue-600/10 cursor-pointer"
                  >
                    Deploy Site Config
                  </button>
                </div>
              </form>
            )}

            {/* T6: PORTFOLIO MANAGEMENT */}
            {activeSubTab === 'portfolio' && (
              <div id="panel-portfolio-desk" className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Manage Portfolio Items' : 'পোর্টফোলিও কেস স্টাডি পরিচালনা'}
                  </h3>
                  <button
                    id="add-portfolio-btn"
                    onClick={() => {
                      setIsCreatingPortfolio(true);
                      setEditingPortfolio(null);
                      setPortfolioForm({
                        titleEn: '', titleBn: '', category: '', duration: '', budget: '', projectType: '', completionYear: '',
                        descriptionEn: '', descriptionBn: '', client: '', challengeEn: '', challengeBn: '',
                        solutionEn: '', solutionBn: '', resultEn: '', resultBn: '', technologies: [], image: '', featured: false,
                        projectDate: '', appStoreUrl: '', playStoreUrl: '', thumbnailImage: ''
                      });
                    }}
                    className="flex items-center space-x-1.5 rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-2 font-bold transition"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{currentLang === 'en' ? 'New Case Study' : 'নতুন প্রজেক্ট যোগ করুন'}</span>
                  </button>
                </div>

                {isCreatingPortfolio ? (
<form onSubmit={handleSavePortfolio} className="space-y-5 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-neutral-700 max-h-[80vh] overflow-y-auto text-xs">

                    {/* 1. BASIC PROJECT INFO */}
                    <div className="space-y-3 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414]">
                      <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px] mb-2 border-b border-gray-50 pb-1.5">1. Basic Project Info</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Project Name *</label>
                          <input
                            type="text" required
                            value={portfolioForm.titleEn || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, titleEn: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">This portfolio is for which service? *</label>
                          <select
                            required
                            value={portfolioForm.category || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          >
                            <option value="">-- Select a service --</option>
                            {(services.length > 0
                              ? Array.from(new Set(services.map(s => s.titleEn).filter(Boolean)))
                              : ['Web Development', 'Web App', 'Mobile App', 'UI/UX Design', 'Graphic Design', 'Digital Marketing', 'SEO', 'AI Automation & Agent']
                            ).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Project Type</label>
                          <select
                            value={portfolioForm.projectType || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, projectType: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          >
                            <option value="">Select Type</option>
                            <option value="website">Website</option>
                            <option value="webapp">Web Application</option>
                            <option value="mobile">Mobile App</option>
                            <option value="desktop">Desktop Software</option>
                            <option value="design">Design Project</option>
                            <option value="marketing">Marketing Campaign</option>
                            <option value="ai">AI / Automation</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Completion Year</label>
                          <input
                            type="text" placeholder="e.g. 2026"
                            value={portfolioForm.completionYear || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, completionYear: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. IMAGES — REAL UPLOAD */}
                    <div className="space-y-3 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414]">
                      <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px] mb-2 border-b border-gray-50 pb-1.5">2. Project Images (Upload Files)</h4>

                      {/* Featured image upload */}
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Featured / Main Image *</label>
                        <div className="flex flex-wrap items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center space-x-1.5 rounded border border-dashed border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 px-3 py-2 font-bold text-gray-600 dark:text-neutral-300 text-[10px] transition">
                            {portfolioUploading
                              ? <span>{currentLang === 'en' ? 'Uploading…' : 'আপলোড হচ্ছে…'}</span>
                              : <span>{currentLang === 'en' ? '⬆ Upload Image' : '⬆ ছবি আপলোড'}</span>}
                            <input type="file" accept="image/*" className="hidden" onChange={handlePortfolioImageChange} />
                          </label>
                          {portfolioForm.image && (
                            <div className="relative">
                              <img src={portfolioForm.image} alt="" className="h-14 w-20 object-cover rounded border border-gray-200 dark:border-neutral-700" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => setPortfolioForm({ ...portfolioForm, image: '' })}
                                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] leading-none font-bold transition hover:bg-red-600"
                                title="Remove"
                              >✕</button>
                            </div>
                          )}
                          {portfolioForm.image && (
                            <span className="text-[9px] text-gray-400 dark:text-neutral-500 font-mono break-all max-w-[220px]">{portfolioForm.image}</span>
                          )}
                        </div>
                      </div>

                      {/* Gallery upload */}
                      <div className="space-y-1.5 pt-2 border-t border-gray-50">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">More Project Photos (Gallery)</label>
                        <label className="cursor-pointer inline-flex items-center space-x-1.5 rounded border border-dashed border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 px-3 py-2 font-bold text-gray-600 dark:text-neutral-300 text-[10px] transition">
                          <span>{portfolioUploading ? (currentLang === 'en' ? 'Uploading…' : 'আপলোড হচ্ছে…') : (currentLang === 'en' ? '⬆ Upload more images' : '⬆ আরও ছবি আপলোড')}</span>
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handlePortfolioGalleryChange} />
                        </label>
                        {(() => {
                          let gallery: string[] = [];
                          try { gallery = JSON.parse(portfolioForm.galleryJson || '[]') || []; } catch { gallery = []; }
                          if (gallery.length === 0) {
                            return <p className="text-[10px] text-gray-400 dark:text-neutral-500 italic">No gallery photos yet. Upload as many as you like.</p>;
                          }
                          return (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {gallery.map((u) => (
                                <div key={u} className="relative">
                                  <img src={u} alt="" className="h-14 w-20 object-cover rounded border border-gray-200 dark:border-neutral-700" referrerPolicy="no-referrer" />
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(u)}
                                    className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] leading-none font-bold transition hover:bg-red-600"
                                    title="Remove"
                                  >✕</button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* 3. DESCRIPTION & TECHNOLOGIES */}
                    <div className="space-y-3 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414]">
                      <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px] mb-2 border-b border-gray-50 pb-1.5">3. About the Project</h4>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Project Description *</label>
                        <textarea
                          rows={4} required
                          value={portfolioForm.descriptionEn || ''}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, descriptionEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">What was this project built with? (Technologies) *</label>
                        <input
                          type="text" required
                          placeholder="Next.js, React, Tailwind CSS, Supabase, OpenAI"
                          value={portfolioForm.technologies ? portfolioForm.technologies.join(', ') : ''}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                        />
                        <p className="text-[9px] text-gray-400 dark:text-neutral-500">Separate with commas, e.g. Next.js, Supabase, Stripe</p>
                      </div>
                    </div>

                    {/* 4. LINKS */}
                    <div className="space-y-3 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414]">
                      <h4 className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px] mb-2 border-b border-gray-50 pb-1.5">4. Project Links</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Live Website / Demo URL</label>
                          <input
                            type="text" placeholder="https://..."
                            value={portfolioForm.liveUrl || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, liveUrl: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">GitHub Repository URL</label>
                          <input
                            type="text" placeholder="https://github.com/..."
                            value={portfolioForm.githubUrl || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, githubUrl: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">App Store URL (iOS)</label>
                          <input
                            type="text" placeholder="https://apps.apple.com/..."
                            value={portfolioForm.appStoreUrl || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, appStoreUrl: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Play Store URL (Android)</label>
                          <input
                            type="text" placeholder="https://play.google.com/..."
                            value={portfolioForm.playStoreUrl || ''}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, playStoreUrl: e.target.value })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 5. OPTIONS */}
                    <div className="p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414]">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Display Order</label>
                          <input
                            type="number"
                            value={portfolioForm.sortOrder || 0}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, sortOrder: parseInt(e.target.value) || 0 })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500"
                          />
                        </div>
                        <div className="flex items-center space-x-2 h-full pt-6">
                          <input
                            type="checkbox"
                            id="portfolio-form-featured"
                            checked={portfolioForm.featured || false}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, featured: e.target.checked })}
                            className="h-4 w-4 text-blue-600 dark:text-orange-400 rounded border-gray-300 dark:border-neutral-600 focus:ring-blue-500 dark:focus:ring-orange-500"
                          />
                          <label htmlFor="portfolio-form-featured" className="font-bold text-gray-700 dark:text-neutral-200">Featured Project</label>
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold text-gray-500 dark:text-neutral-400">Status</label>
                          <select
                            value={portfolioForm.status || 'published'}
                            onChange={(e) => setPortfolioForm({ ...portfolioForm, status: e.target.value as any })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 dark:focus:border-orange-500 dark:border-orange-500 font-bold"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setIsCreatingPortfolio(false)}
                        className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={portfolioUploading}
                        className={`rounded px-5 py-2 font-bold shadow-md shadow-blue-600/10 text-white transition ${portfolioUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400'}`}
                      >
                        {currentLang === 'en' ? 'Save Project' : 'প্রজেক্ট সংরক্ষণ করুন'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {portfolios.map((item) => (
                      <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt="" className="h-12 w-16 object-cover rounded bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-neutral-800" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white block">{item.titleEn}</span>
                            <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-0.5">{item.category}{item.completionYear ? ` • ${item.completionYear}` : ''}{(item.projectType ? ` • ${item.projectType}` : '')}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditPortfolioTrigger(item)}
                            className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {portfolios.length === 0 && (
                      <div className="text-center py-10 text-gray-400 dark:text-neutral-500 italic">No case studies loaded. Add one to expand agency portfolio!</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* T7: PREMIUM MULTI-TAB GRANULAR PRICING OPERATIONS */}
            {activeSubTab === 'pricing' && (
              <div id="panel-pricing-desk" className="space-y-6 text-xs">
                
                {/* Secondary navigation for pricing entities */}
                <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  {[
                    { id: 'packages', label: currentLang === 'en' ? 'Core Packages' : 'মূল প্যাকেজসমূহ', count: pricingPackages.length },
                    { id: 'addons', label: currentLang === 'en' ? 'Budget Add-ons' : 'বাজেট অ্যাড-অন', count: pricingAddons.length },
                    { id: 'comparisons', label: currentLang === 'en' ? 'Feature Matrix' : 'ফিচার তুলনা ম্যাট্রিক্স', count: pricingComparisons.length },
                    { id: 'quotes', label: currentLang === 'en' ? 'Inbound Quotes' : 'প্রাপ্ত কোটেশন', count: pricingQuotes.filter(q => q.status === 'pending').length, badgeColor: 'bg-amber-100 text-amber-800 dark:text-amber-300' },
                    { id: 'currencies', label: currentLang === 'en' ? 'Currency Settings' : 'কারেন্সি সেটিংস', count: currencies.length }
                  ].map((subTab) => (
                    <button
                      key={subTab.id}
                      type="button"
                      onClick={() => {
                        setPricingSubTab(subTab.id as any);
                        setIsCreatingPricingPackage(false);
                        setEditingPricingPackage(null);
                        setIsCreatingPricingAddon(false);
                        setEditingPricingAddon(null);
                        setIsCreatingPricingComparison(false);
                        setEditingPricingComparison(null);
                      }}
                      className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center space-x-1.5 ${
                        pricingSubTab === subTab.id
                          ? 'bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 border border-blue-100 dark:border-orange-500/20'
                          : 'text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]'
                      }`}
                    >
                      <span>{subTab.label}</span>
                      {subTab.count !== undefined && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${subTab.badgeColor || 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300'}`}>
                          {subTab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* SUBTAB 1: CORE PACKAGES */}
                {pricingSubTab === 'packages' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-700 dark:text-neutral-200">
                        {currentLang === 'en' ? 'Manage Agency Service Packages' : 'এজেন্সি সার্ভিস প্যাকেজসমূহ পরিচালনা'}
                      </h4>
                      {!isCreatingPricingPackage && (
                        <button
                          onClick={() => {
                            setIsCreatingPricingPackage(true);
                            setEditingPricingPackage(null);
                            setPricingPackageForm({
                              category: 'Agency Packages',
                              nameEn: '', nameBn: '',
                              priceMonthly: 0, priceYearly: 0,
                              descriptionEn: '', descriptionBn: '',
                              featuresEn: [], featuresBn: [],
                              notIncludedEn: [], notIncludedBn: [],
                              ctaEn: 'Get Started', ctaBn: 'শুরু করুন',
                              popular: false, enabled: true, sortOrder: 0,
                              badgeEn: '', badgeBn: '', techEn: ''
                            });
                          }}
                          className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add Package' : 'নতুন প্যাকেজ যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingPricingPackage ? (
                      <form onSubmit={handleSavePricingPackage} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700 max-h-[75vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-2">
                          <span className="font-extrabold text-blue-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">
                            {editingPricingPackage ? 'Modify Package Details' : 'Create New Service Package'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Package Name (English)</label>
                            <input
                              type="text" required
                              value={pricingPackageForm.nameEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, nameEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. Startup Launchpad"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Price (Monthly USD/BDT)</label>
                            <input
                              type="number" required
                              value={pricingPackageForm.priceMonthly || 0}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, priceMonthly: Number(e.target.value) || 0 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Price (Yearly USD/BDT)</label>
                            <input
                              type="number" required
                              value={pricingPackageForm.priceYearly || 0}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, priceYearly: Number(e.target.value) || 0 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Package Category</label>
                            <select
                              value={pricingPackageForm.category || 'Agency Packages'}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, category: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            >
                              <option>Agency Packages</option>
                              <option>Web Development</option>
                              <option>Mobile App</option>
                              <option>UI/UX Design</option>
                              <option>Graphic Design</option>
                              <option>Video Editing</option>
                              <option>Digital Marketing</option>
                              <option>AI Automation</option>
                              <option>SEO</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Sort Order</label>
                            <input
                              type="number"
                              value={pricingPackageForm.sortOrder || 0}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, sortOrder: Number(e.target.value) || 0 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Description (English)</label>
                            <textarea
                              rows={2} required
                              value={pricingPackageForm.descriptionEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, descriptionEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="Describe core target demographic and value"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Included Features (English - Comma Separated)</label>
                            <textarea
                              rows={3} required
                              value={pricingPackageForm.featuresEn ? pricingPackageForm.featuresEn.join(', ') : ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, featuresEn: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="Dynamic Dashboard, 3 Figma Prototypes, API Gateway Setup"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">NOT Included Features (English - Comma Separated)</label>
                            <textarea
                              rows={2}
                              value={pricingPackageForm.notIncludedEn ? pricingPackageForm.notIncludedEn.join(', ') : ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, notIncludedEn: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="Custom CMS, Native Apps integration"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">CTA Text (English)</label>
                            <input
                              type="text" required
                              value={pricingPackageForm.ctaEn || 'Get Started'}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, ctaEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Promo Badge (English)</label>
                            <input
                              type="text"
                              placeholder="e.g. Popular"
                              value={pricingPackageForm.badgeEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, badgeEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox" id="pkg-popular"
                              checked={!!pricingPackageForm.popular}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, popular: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                            />
                            <label htmlFor="pkg-popular" className="font-bold text-gray-600 dark:text-neutral-300">Mark as Popular (Visual Highlight)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox" id="pkg-enabled"
                              checked={!!pricingPackageForm.enabled}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, enabled: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                            />
                            <label htmlFor="pkg-enabled" className="font-bold text-gray-600 dark:text-neutral-300">Publish/Enable Plan</label>
                          </div>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              placeholder="Supported Technologies comma separated"
                              value={pricingPackageForm.techEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, techEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400 text-xs">Delivery Time (EN)</label>
                            <input type="text" placeholder="e.g. 7 Days Delivery"
                              value={pricingPackageForm.deliveryTimeEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, deliveryTimeEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none text-xs"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400 text-xs">Support Period (EN)</label>
                            <input type="text" placeholder="e.g. 3 Months Support"
                              value={pricingPackageForm.supportPeriodEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, supportPeriodEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none text-xs"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400 text-xs">Perfect For (EN)</label>
                            <input type="text" placeholder="e.g. Startups & Personal Brands"
                              value={pricingPackageForm.perfectForEn || ''}
                              onChange={(e) => setPricingPackageForm({ ...pricingPackageForm, perfectForEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setIsCreatingPricingPackage(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3.5 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4.5 py-1.5 font-bold"
                          >
                            Save Package Details
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {pricingPackages.map((pkg) => (
                          <div key={pkg.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white">{pkg.nameEn}</span>
                                <span className="text-[9px] bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 px-2 py-0.5 rounded font-extrabold uppercase">{pkg.category}</span>
                                {pkg.popular && <span className="text-[9px] bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold">Featured</span>}
                                {!pkg.enabled && <span className="text-[9px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">Disabled</span>}
                              </div>
                              <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-1">
                                Monthly: <span className="text-blue-600 dark:text-orange-400 font-bold">${pkg.priceMonthly}</span> • Yearly: <span className="text-green-600 dark:text-emerald-400 font-bold">${pkg.priceYearly}</span> • Deliverables count: {pkg.featuresEn.length}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditPricingPackageTrigger(pkg)}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleDeletePricingPackage(pkg.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                        {pricingPackages.length === 0 && (
                          <div className="text-center py-8 text-gray-400 dark:text-neutral-500 italic">No pricing packages configured. Add one to start scaling sales.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 2: BUDGET ADDONS */}
                {pricingSubTab === 'addons' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-700 dark:text-neutral-200">
                        {currentLang === 'en' ? 'Manage Service Add-on Upgrades' : 'সার্ভিস অ্যাড-অন আপগ্রেড পরিচালনা'}
                      </h4>
                      {!isCreatingPricingAddon && (
                        <button
                          onClick={() => {
                            setIsCreatingPricingAddon(true);
                            setEditingPricingAddon(null);
                            setPricingAddonForm({
                              nameEn: '', nameBn: '', price: '', descriptionEn: '', descriptionBn: '', category: 'Core Service', enabled: true
                            });
                          }}
                          className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add Add-on' : 'নতুন অ্যাড-অন যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingPricingAddon ? (
                      <form onSubmit={handleSavePricingAddon} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Add-on Name (English)</label>
                            <input
                              type="text" required
                              value={pricingAddonForm.nameEn || ''}
                              onChange={(e) => setPricingAddonForm({ ...pricingAddonForm, nameEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. SEO Launch Campaign"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Add-on Price Label (e.g. $499 or $100/hr)</label>
                            <input
                              type="text" required
                              value={pricingAddonForm.price || ''}
                              onChange={(e) => setPricingAddonForm({ ...pricingAddonForm, price: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. $750 / launch"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Service Category Tag</label>
                            <input
                              type="text" required
                              value={pricingAddonForm.category || 'Core Service'}
                              onChange={(e) => setPricingAddonForm({ ...pricingAddonForm, category: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. Marketing, Development, Security"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Description (English)</label>
                            <textarea
                              rows={2} required
                              value={pricingAddonForm.descriptionEn || ''}
                              onChange={(e) => setPricingAddonForm({ ...pricingAddonForm, descriptionEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="Describe what the client receives upon adding this addon"
                            />
                          </div>
                          
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                          <input
                            type="checkbox" id="addon-enabled"
                            checked={!!pricingAddonForm.enabled}
                            onChange={(e) => setPricingAddonForm({ ...pricingAddonForm, enabled: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                          />
                          <label htmlFor="addon-enabled" className="font-bold text-gray-600 dark:text-neutral-300">Add-on Active / Enabled for Estimator Calculator</label>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setIsCreatingPricingAddon(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3.5 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4.5 py-1.5 font-bold"
                          >
                            Save Add-on Option
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {pricingAddons.map((addon) => (
                          <div key={addon.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white">{addon.nameEn}</span>
                                <span className="text-[9px] bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:text-purple-300 px-2 py-0.5 rounded font-extrabold uppercase">{addon.category}</span>
                                {!addon.enabled && <span className="text-[9px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">Disabled</span>}
                              </div>
                              <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-1">
                                Cost upgrade: <span className="text-blue-600 dark:text-orange-400 font-bold">{addon.price}</span> — {addon.descriptionEn}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditPricingAddonTrigger(addon)}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePricingAddon(addon.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                        {pricingAddons.length === 0 && (
                          <div className="text-center py-8 text-gray-400 dark:text-neutral-500 italic">No custom add-on options configured yet.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 3: FEATURE MATRIX COMPARISONS */}
                {pricingSubTab === 'comparisons' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-700 dark:text-neutral-200">
                        {currentLang === 'en' ? 'Manage Matrix Feature Comparison Table' : 'ফিচার তুলনা ম্যাট্রিক্স টেবিল পরিচালনা'}
                      </h4>
                      {!isCreatingPricingComparison && (
                        <button
                          onClick={() => {
                            setIsCreatingPricingComparison(true);
                            setEditingPricingComparison(null);
                            setPricingComparisonForm({
                              featureEn: '', featureBn: '',
                              starterEn: '', starterBn: '',
                              businessEn: '', businessBn: '',
                              enterpriseEn: '', enterpriseBn: '',
                              categoryEn: 'Core Deliverables', categoryBn: 'প্রধান ডেলিভারিবল',
                              sortOrder: 0
                            });
                          }}
                          className="flex items-center space-x-1 rounded-md bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add Row' : 'নতুন রো যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingPricingComparison ? (
                      <form onSubmit={handleSavePricingComparison} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700 max-h-[75vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Group Category (English)</label>
                            <input
                              type="text" required
                              value={pricingComparisonForm.categoryEn || ''}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, categoryEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. Core Features, Support, Code Quality"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Feature Name (English)</label>
                            <input
                              type="text" required
                              value={pricingComparisonForm.featureEn || ''}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, featureEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                              placeholder="e.g. Slack Direct Support"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-[#141414] p-3 rounded-xl border border-gray-100 dark:border-neutral-800">
                          <div className="space-y-2 border-r border-gray-50 pr-2">
                            <h5 className="font-extrabold text-blue-600 dark:text-orange-400 text-[10px]">1. Starter Level Specs</h5>
                            <input
                              type="text" required placeholder="Starter En (e.g. Email Only)"
                              value={pricingComparisonForm.starterEn || ''}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, starterEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                            
                          </div>

                          <div className="space-y-2 border-r border-gray-50 pr-2">
                            <h5 className="font-extrabold text-blue-600 dark:text-orange-400 text-[10px]">2. Business Level Specs</h5>
                            <input
                              type="text" required placeholder="Business En (e.g. Next-day Reply)"
                              value={pricingComparisonForm.businessEn || ''}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, businessEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                            
                          </div>

                          <div className="space-y-2">
                            <h5 className="font-extrabold text-blue-600 dark:text-orange-400 text-[10px]">3. Enterprise Level Specs</h5>
                            <input
                              type="text" required placeholder="Enterprise En (e.g. Instant 24/7)"
                              value={pricingComparisonForm.enterpriseEn || ''}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, enterpriseEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                            
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="font-semibold text-gray-500 dark:text-neutral-400">Global Sort Order</label>
                            <input
                              type="number"
                              value={pricingComparisonForm.sortOrder || 0}
                              onChange={(e) => setPricingComparisonForm({ ...pricingComparisonForm, sortOrder: Number(e.target.value) || 0 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          <div className="pt-6 text-gray-400 dark:text-neutral-500 text-[10px]">
                            💡 TIP: Enter "Yes" or "No" (or checkmarks) to render beautiful check/cross icons in the frontend!
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setIsCreatingPricingComparison(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3.5 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4.5 py-1.5 font-bold"
                          >
                            Save Comparison Row
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {pricingComparisons.map((comp) => (
                          <div key={comp.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white">{comp.featureEn}</span>
                                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-neutral-200 px-2 py-0.5 rounded font-extrabold uppercase">{comp.categoryEn}</span>
                              </div>
                              <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-1">
                                Starter: <span className="text-gray-600 dark:text-neutral-300 font-semibold">{comp.starterEn}</span> • Business: <span className="text-gray-600 dark:text-neutral-300 font-semibold">{comp.businessEn}</span> • Enterprise: <span className="text-gray-600 dark:text-neutral-300 font-semibold">{comp.enterpriseEn}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditPricingComparisonTrigger(comp)}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                Edit Row
                              </button>
                              <button
                                onClick={() => handleDeletePricingComparison(comp.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                        {pricingComparisons.length === 0 && (
                          <div className="text-center py-8 text-gray-400 dark:text-neutral-500 italic">No feature comparison records configured yet.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 4: INBOUND LEADS & CONSULTATION QUOTES */}
                {pricingSubTab === 'quotes' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-700 dark:text-neutral-200">
                      {currentLang === 'en' ? 'Review Custom Inbound Business Quote Requests' : 'কাস্টম কোটেশন ও বিজনেস লিড পর্যালোচনা'}
                    </h4>

                    <div className="grid grid-cols-1 gap-4">
                      {pricingQuotes.map((quote) => (
                        <div key={quote.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-2.5">
                            <div>
                              <span className="text-sm font-bold text-gray-900 dark:text-white block">{quote.name}</span>
                              <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono block mt-0.5">
                                {quote.company} • {quote.industry} • Submitted {new Date(quote.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                                quote.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:text-amber-300' :
                                quote.status === 'reviewed' ? 'bg-blue-100 dark:bg-orange-500/15 text-blue-800' :
                                'bg-emerald-100 text-emerald-800'
                              }`}>
                                {quote.status}
                              </span>
                              
                              <select
                                value={quote.status}
                                onChange={(e) => handleUpdateQuoteStatus(quote.id, e.target.value as any)}
                                className="text-[10px] bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-neutral-700 rounded px-2 py-1 font-bold"
                              >
                                <option value="pending">Mark Pending</option>
                                <option value="reviewed">Mark Reviewed</option>
                                <option value="contacted">Mark Contacted</option>
                              </select>

                              <button
                                onClick={() => handleDeleteQuote(quote.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 p-1 border border-red-100 dark:border-red-500/20 transition"
                                title="Delete Inbound Quote"
                              >
                                <Trash2Icon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
                            <div className="space-y-0.5">
                              <span className="text-gray-400 dark:text-neutral-500 font-bold block">CLIENT EMAIL</span>
                              <a href={`mailto:${quote.email}`} className="text-blue-600 dark:text-orange-400 hover:underline font-semibold block">{quote.email}</a>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-gray-400 dark:text-neutral-500 font-bold block">CLIENT PHONE</span>
                              <a href={`tel:${quote.phone}`} className="text-gray-800 dark:text-neutral-100 font-mono font-semibold block">{quote.phone}</a>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-gray-400 dark:text-neutral-500 font-bold block">SERVICE REQUESTED</span>
                              <span className="text-gray-800 dark:text-neutral-100 font-bold block">{quote.service}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-gray-400 dark:text-neutral-500 font-bold block">BUDGET & TIMELINE</span>
                              <span className="text-amber-600 dark:text-amber-400 font-bold block">{quote.budget} ({quote.timeline})</span>
                            </div>
                          </div>

                          <div className="bg-gray-50/50 rounded-lg p-3 text-gray-700 dark:text-neutral-200 leading-relaxed font-sans text-xs border border-gray-100 dark:border-neutral-800">
                            <span className="font-extrabold text-blue-600 dark:text-orange-400 text-[10px] block mb-1">PROJECT DETAILS / CHALLENGE</span>
                            {quote.description}
                          </div>

                          {quote.attachmentName && quote.attachmentData && (
                            <div className="flex items-center space-x-2 bg-emerald-50/30 border border-emerald-100 dark:border-emerald-500/20 rounded-lg p-2.5 max-w-sm">
                              <ImageIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              <div className="text-[10px] overflow-hidden truncate">
                                <span className="font-bold text-gray-700 dark:text-neutral-200 block truncate">{quote.attachmentName}</span>
                                <a 
                                  href={quote.attachmentData} 
                                  download={quote.attachmentName} 
                                  target="_blank" 
                                  referrerPolicy="no-referrer"
                                  rel="noopener noreferrer" 
                                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                                >
                                  Download/View Client Document (Attachment)
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {pricingQuotes.length === 0 && (
                        <div className="text-center py-10 text-gray-400 dark:text-neutral-500 italic">No custom quote requests logged yet. Inbound client inquiries will appear here.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* SUBTAB 5: CURRENCY SETTINGS MODULE */}
                {pricingSubTab === 'currencies' && (
                  <div className="space-y-6 text-xs">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-neutral-100 text-sm">
                          {currentLang === 'en' ? 'Currency & Exchange Rate Configurations' : 'কারেন্সি ও এক্সচেঞ্জ রেট কনফিগারেশন'}
                        </h4>
                        <p className="text-gray-400 dark:text-neutral-500 text-[10px] mt-0.5">
                          {currentLang === 'en' ? 'Manage global currencies, symbols, manual conversion rates, and decimal precision options.' : 'গ্লোবাল কারেন্সি, প্রতীক, ম্যানুয়াল এক্সচেঞ্জ রেট এবং দশমিকের সুনির্দিষ্টতা সেটিংস পরিবর্তন করুন।'}
                        </p>
                      </div>
                      {!isCreatingCurrency && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingCurrency(true);
                            setEditingCurrency(null);
                            setCurrencyForm({
                              name: '', code: '', symbol: '', flag: '', exchangeRate: 1.0, enabled: true, isDefault: false, sortOrder: currencies.length
                            });
                          }}
                          className="flex items-center space-x-1.5 rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-2 font-bold transition self-start md:self-auto"
                        >
                          <PlusIcon className="h-4 w-4" />
                          <span>{currentLang === 'en' ? 'Add Custom Currency' : 'নতুন কারেন্সি যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Side: General settings and Form */}
                      <div className="lg:col-span-5 space-y-6">
                        
                        {/* 1. General Preferences Settings */}
                        <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-xs space-y-4">
                          <h5 className="font-bold text-gray-700 dark:text-neutral-200 border-b border-gray-50 pb-2 flex items-center space-x-1.5">
                            <SettingsIcon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                            <span>{currentLang === 'en' ? 'Global Preferences' : 'সাধারণ সেটিংস'}</span>
                          </h5>

                          <form onSubmit={handleSaveCurrencySettings} className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Default Currency Code' : 'ডিফল্ট কারেন্সি কোড'}</label>
                              <select
                                value={currencySettings.defaultCurrencyCode}
                                onChange={(e) => setCurrencySettingsState({ ...currencySettings, defaultCurrencyCode: e.target.value })}
                                className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-bold focus:outline-none"
                              >
                                {currencies.map(c => (
                                  <option key={c.id} value={c.code}>{currFlag(c)} {c.code} ({c.name})</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Price Decimal Precision' : 'দশমিকের পর সংখ্যা'}</label>
                              <select
                                value={currencySettings.decimalPrecision}
                                onChange={(e) => setCurrencySettingsState({ ...currencySettings, decimalPrecision: Number(e.target.value) })}
                                className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 font-bold focus:outline-none"
                              >
                                <option value="0">0 (e.g., $150)</option>
                                <option value="1">1 (e.g., $150.0)</option>
                                <option value="2">2 (e.g., $150.00)</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between py-2 border-t border-b border-gray-50">
                              <div>
                                <span className="font-semibold text-gray-700 dark:text-neutral-200 block">{currentLang === 'en' ? 'Use Live Exchange Rates' : 'লাইভ এক্সচেঞ্জ রেট ব্যবহার'}</span>
                                <span className="text-[10px] text-gray-400 dark:text-neutral-500 block mt-0.5">
                                  {currentLang === 'en' ? 'Fetches real-time market rates from free conversion API.' : 'রিয়েল-টাইম মার্কেট এক্সচেঞ্জ রেট এপিআই থেকে ডাটা লোড করে।'}
                                </span>
                              </div>
                              <input
                                type="checkbox"
                                checked={currencySettings.enableLiveRates}
                                onChange={(e) => setCurrencySettingsState({ ...currencySettings, enableLiveRates: e.target.checked })}
                                className="h-4.5 w-4.5 rounded text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white font-bold py-2 shadow-xs transition"
                            >
                              {currentLang === 'en' ? 'Save Preferences' : 'সেটিংস সংরক্ষণ করুন'}
                            </button>
                          </form>
                        </div>

                        {/* 2. Add/Edit Currency Form */}
                        {isCreatingCurrency && (
                          <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-xs space-y-4">
                            <h5 className="font-bold text-gray-700 dark:text-neutral-200 border-b border-gray-50 pb-2 flex items-center justify-between">
                              <span>{editingCurrency ? (currentLang === 'en' ? 'Edit Currency' : 'কারেন্সি সম্পাদনা') : (currentLang === 'en' ? 'New Currency Details' : 'নতুন কারেন্সি বিবরণ')}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCreatingCurrency(false);
                                  setEditingCurrency(null);
                                }}
                                className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300 text-xs font-bold"
                              >
                                {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                              </button>
                            </h5>

                            <form onSubmit={handleSaveCurrency} className="space-y-3">
                              <div className="space-y-1">
                                <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Currency Name' : 'কারেন্সির নাম'}</label>
                                <input
                                  type="text" required placeholder="e.g. US Dollar"
                                  value={currencyForm.name || ''}
                                  onChange={(e) => setCurrencyForm({ ...currencyForm, name: e.target.value })}
                                  className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Currency Code' : 'কারেন্সি কোড'}</label>
                                  <input
                                    type="text" required placeholder="e.g. USD" maxLength={3}
                                    value={currencyForm.code || ''}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, code: e.target.value.toUpperCase() })}
                                    className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 uppercase focus:outline-none font-bold"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Currency Symbol' : 'কারেন্সি প্রতীক'}</label>
                                  <input
                                    type="text" required placeholder="e.g. $"
                                    value={currencyForm.symbol || ''}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, symbol: e.target.value })}
                                    className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-mono"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'Flag Emoji' : 'পতাকা ইমোজি'}</label>
                                  <input
                                    type="text" placeholder="e.g. 🇺🇸"
                                    value={currencyForm.flag || ''}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, flag: e.target.value })}
                                    className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 text-center text-lg focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="font-semibold text-gray-500 dark:text-neutral-400 block">{currentLang === 'en' ? 'USD Exchange Rate' : 'USD এক্সচেঞ্জ রেট'}</label>
                                  <input
                                    type="number" required step="any" min="0.000001" placeholder="1.0"
                                    value={currencyForm.exchangeRate === undefined ? '' : currencyForm.exchangeRate}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, exchangeRate: Number(e.target.value) })}
                                    className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-mono font-semibold"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1.5 pt-1.5">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox" id="curr-enabled"
                                    checked={currencyForm.enabled !== false}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, enabled: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 dark:text-orange-400 rounded"
                                  />
                                  <label htmlFor="curr-enabled" className="font-semibold text-gray-700 dark:text-neutral-200">{currentLang === 'en' ? 'Enable Currency' : 'সক্রিয় করুন'}</label>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox" id="curr-is-default"
                                    checked={currencyForm.isDefault === true}
                                    onChange={(e) => setCurrencyForm({ ...currencyForm, isDefault: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 dark:text-orange-400 rounded"
                                  />
                                  <label htmlFor="curr-is-default" className="font-semibold text-gray-700 dark:text-neutral-200">{currentLang === 'en' ? 'Set as System Default' : 'সিস্টেম ডিফল্ট সেট করুন'}</label>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 mt-3 shadow-xs transition"
                              >
                                {editingCurrency ? (currentLang === 'en' ? 'Update Currency' : 'কারেন্সি আপডেট করুন') : (currentLang === 'en' ? 'Add Currency' : 'কারেন্সি যোগ করুন')}
                              </button>
                            </form>
                          </div>
                        )}
                      </div>

                      {/* Right Side: Currencies List */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-neutral-800 p-5 shadow-xs space-y-4">
                          <h5 className="font-bold text-gray-700 dark:text-neutral-200 border-b border-gray-50 pb-2 flex items-center justify-between">
                            <span>{currentLang === 'en' ? 'Configured Currencies' : 'কনফিগারড কারেন্সিসমূহ'}</span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-normal">
                              {currentLang === 'en' ? 'Display order is saved and updated in real-time.' : 'প্রদর্শনের ক্রম রিয়েল-টাইমে সেভ করা হয়।'}
                            </span>
                          </h5>

                          <div className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {[...currencies].sort((a, b) => a.sortOrder - b.sortOrder).map((curr, idx) => {
                              const isSystemDefaultInSettings = currencySettings.defaultCurrencyCode === curr.code;
                              return (
                                <div key={curr.id} className="py-4 flex items-center justify-between gap-4">
                                  <div className="flex items-center space-x-3 min-w-0">
                                    <span className="text-2xl" role="img" aria-label={curr.name}>{currFlag(curr)}</span>
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="font-bold text-gray-900 dark:text-white">{curr.code}</span>
                                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-neutral-200 font-bold font-mono px-1.5 py-0.5 rounded">
                                          {curr.symbol}
                                        </span>
                                        {curr.isDefault && (
                                          <span className="text-[8px] bg-blue-100 dark:bg-orange-500/15 text-blue-800 font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                                            {currentLang === 'en' ? 'DB Default' : 'ডিবি ডিফল্ট'}
                                          </span>
                                        )}
                                        {isSystemDefaultInSettings && (
                                          <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                                            {currentLang === 'en' ? 'Active Default' : 'সক্রিয় ডিফল্ট'}
                                          </span>
                                        )}
                                        {!curr.enabled && (
                                          <span className="text-[8px] bg-red-100 text-red-800 font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                                            {currentLang === 'en' ? 'Disabled' : 'নিষ্ক্রিয়'}
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-gray-400 dark:text-neutral-500 font-semibold text-[10px] block truncate">{curr.name}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 shrink-0">
                                    <div className="text-right font-mono text-xs hidden sm:block">
                                      <span className="text-gray-400 dark:text-neutral-500 text-[10px] block">{currentLang === 'en' ? 'USD Exchange Rate' : 'USD এক্সচেঞ্জ রেট'}</span>
                                      <span className="text-gray-800 dark:text-neutral-100 font-bold">1 USD = {curr.exchangeRate} {curr.code}</span>
                                    </div>

                                    {/* Sort Controls */}
                                    <div className="flex flex-col space-y-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => handleMoveCurrency(idx, 'up')}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 text-gray-400 dark:text-neutral-500 disabled:opacity-20 disabled:hover:bg-transparent"
                                        title={currentLang === 'en' ? 'Move Up' : 'উপরে সরান'}
                                      >
                                        ▲
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === currencies.length - 1}
                                        onClick={() => handleMoveCurrency(idx, 'down')}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 text-gray-400 dark:text-neutral-500 disabled:opacity-20 disabled:hover:bg-transparent"
                                        title={currentLang === 'en' ? 'Move Down' : 'নিচে সরান'}
                                      >
                                        ▼
                                      </button>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex space-x-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingCurrency(curr);
                                          setCurrencyForm(curr);
                                          setIsCreatingCurrency(true);
                                        }}
                                        className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-2 py-1 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        disabled={curr.isDefault}
                                        onClick={() => handleDeleteCurrency(curr.id)}
                                        className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-2 py-1 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {currencies.length === 0 && (
                              <div className="text-center py-8 text-gray-400 dark:text-neutral-500 italic">{currentLang === 'en' ? 'No currencies configured.' : 'কোনো কারেন্সি কনফিগার করা নেই।'}</div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}

            {/* T8: FAQ MANAGEMENT */}
            {activeSubTab === 'faqs' && (
              <div id="panel-faqs-desk" className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Manage Global FAQs' : 'সাধারণ জিজ্ঞাসাবলী পরিচালনা'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsCreatingFAQ(true);
                      setEditingFAQ(null);
                      setFaqForm({
                        categoryEn: 'General', categoryBn: 'সাধারণ', questionEn: '', questionBn: '', answerEn: '', answerBn: '', helpfulCount: 0
                      });
                    }}
                    className="flex items-center space-x-1.5 rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-2 font-bold transition"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{currentLang === 'en' ? 'Add Question' : 'প্রশ্ন যোগ করুন'}</span>
                  </button>
                </div>

                {isCreatingFAQ ? (
                  <form onSubmit={handleSaveFAQ} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">FAQ Group Category (English)</label>
                        <input
                          type="text" required
                          value={faqForm.categoryEn || ''}
                          onChange={(e) => setFaqForm({ ...faqForm, categoryEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Question Statement (English)</label>
                        <input
                          type="text" required
                          value={faqForm.questionEn || ''}
                          onChange={(e) => setFaqForm({ ...faqForm, questionEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Answer Explanation (English)</label>
                        <textarea
                          rows={4} required
                          value={faqForm.answerEn || ''}
                          onChange={(e) => setFaqForm({ ...faqForm, answerEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsCreatingFAQ(false)}
                        className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 font-bold"
                      >
                        Save FAQ Question
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {faqs.map((item) => (
                      <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-blue-50 dark:bg-orange-500/10 text-blue-600 dark:text-orange-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.categoryEn}</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditFAQTrigger(item)}
                              className="text-gray-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-orange-400 dark:text-orange-400 font-bold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(item.id)}
                              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 dark:text-red-300 font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white font-sans">Q: {item.questionEn}</p>
                        <p className="text-gray-500 dark:text-neutral-400 text-[11px] leading-relaxed">A: {item.answerEn}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* T9: TESTIMONIALS MANAGEMENT */}
            {activeSubTab === 'testimonials' && (
              <div id="panel-testimonials-desk" className="space-y-6 text-xs">
                {/* SUB TAB MENU */}
                <div className="flex flex-wrap border-b border-gray-100 dark:border-neutral-800 gap-1 pb-px">
                  <button
                    onClick={() => setTestimonialsSubTab('reviews')}
                    className={`px-4 py-2 font-bold border-b-2 text-xs transition duration-150 ${
                      testimonialsSubTab === 'reviews'
                        ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white dark:text-neutral-100 hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700'
                    }`}
                  >
                    {currentLang === 'en' ? 'Reviews (Text)' : 'গ্রাহক রিভিউ'}
                  </button>
                  <button
                    onClick={() => setTestimonialsSubTab('videos')}
                    className={`px-4 py-2 font-bold border-b-2 text-xs transition duration-150 ${
                      testimonialsSubTab === 'videos'
                        ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white dark:text-neutral-100 hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700'
                    }`}
                  >
                    {currentLang === 'en' ? 'Video Testimonials' : 'ভিডিও রিভিউ'}
                  </button>
                  <button
                    onClick={() => setTestimonialsSubTab('stories')}
                    className={`px-4 py-2 font-bold border-b-2 text-xs transition duration-150 ${
                      testimonialsSubTab === 'stories'
                        ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white dark:text-neutral-100 hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700'
                    }`}
                  >
                    {currentLang === 'en' ? 'Success Stories' : 'সফলতার গল্প'}
                  </button>
                  <button
                    onClick={() => setTestimonialsSubTab('logos')}
                    className={`px-4 py-2 font-bold border-b-2 text-xs transition duration-150 ${
                      testimonialsSubTab === 'logos'
                        ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white dark:text-neutral-100 hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700'
                    }`}
                  >
                    {currentLang === 'en' ? 'Client Logos' : 'ক্লায়েন্ট লোগো'}
                  </button>
                  <button
                    onClick={() => setTestimonialsSubTab('stats_settings')}
                    className={`px-4 py-2 font-bold border-b-2 text-xs transition duration-150 ${
                      testimonialsSubTab === 'stats_settings'
                        ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                        : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-white dark:text-neutral-100 hover:border-gray-200 dark:hover:border-neutral-700 dark:border-neutral-700'
                    }`}
                  >
                    {currentLang === 'en' ? 'Stats & Settings' : 'পরিসংখ্যান ও সেটিংস'}
                  </button>
                </div>

                {/* SUB TAB 1: REVIEWS (TEXT TESTIMONIALS) */}
                {testimonialsSubTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                        {currentLang === 'en' ? 'Review Feed Moderation' : 'গ্রাহক রিভিউ ফিড মডারেশন'}
                      </h4>
                      {!isCreatingTestimonial && (
                        <button
                          onClick={() => {
                            setIsCreatingTestimonial(true);
                            setEditingTestimonial(null);
                            setTestimonialForm({
                              name: '', roleEn: '', roleBn: '', company: '', feedbackEn: '', feedbackBn: '', rating: 5,
                              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                              isVerified: true, status: 'approved', industryEn: 'SaaS', industryBn: 'স্যাস'
                            });
                          }}
                          className="flex items-center space-x-1 rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3 w-3" />
                          <span>{currentLang === 'en' ? 'Add Written Review' : 'নতুন রিটেন রিভিউ'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingTestimonial ? (
                      <form onSubmit={handleSaveTestimonial} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Name</label>
                            <input
                              type="text" required
                              value={testimonialForm.name || ''}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Company Name</label>
                            <input
                              type="text" required
                              value={testimonialForm.company || ''}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Role (English)</label>
                            <input
                              type="text" required
                              value={testimonialForm.roleEn || ''}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, roleEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Rating (Stars 1-5)</label>
                            <input
                              type="number" min={1} max={5} required
                              value={testimonialForm.rating || 5}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Avatar Image URL</label>
                            <input
                              type="text" required
                              value={testimonialForm.avatar || ''}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="font-bold text-gray-500 dark:text-neutral-400">Industry (EN)</label>
                              <input
                                type="text"
                                value={testimonialForm.industryEn || ''}
                                onChange={(e) => setTestimonialForm({ ...testimonialForm, industryEn: e.target.value })}
                                className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                                placeholder="e.g. SaaS"
                              />
                            </div>
                            
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Status</label>
                            <select
                              value={testimonialForm.status || 'approved'}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, status: e.target.value as any })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            >
                              <option value="pending">Pending Review</option>
                              <option value="approved">Approved & Active</option>
                              <option value="featured">Featured (Sticky Highlight)</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2 pt-4">
                            <input
                              type="checkbox"
                              id="isVerified"
                              checked={testimonialForm.isVerified ?? true}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, isVerified: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                            />
                            <label htmlFor="isVerified" className="font-bold text-gray-700 dark:text-neutral-200">Verified Client Account</label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Feedback Review (English)</label>
                            <textarea
                              rows={4} required
                              value={testimonialForm.feedbackEn || ''}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, feedbackEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCreatingTestimonial(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-1.5 font-bold"
                          >
                            Save Review
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {testimonials.map((item) => (
                          <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-start gap-4 bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 hover:shadow-sm transition">
                            <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-[#141414]" referrerPolicy="no-referrer" />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-xs text-gray-900 dark:text-white">{item.name}</span>
                                  <span className="text-gray-400 dark:text-neutral-500 text-[10px]">• {item.company}</span>
                                  {item.isVerified && (
                                    <span className="bg-blue-50 dark:bg-orange-500/10 text-blue-700 dark:text-orange-400 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Verified</span>
                                  )}
                                  {item.status === 'featured' && (
                                    <span className="bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Featured</span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditTestimonialTrigger(item)}
                                    className="text-blue-600 dark:text-orange-400 hover:underline font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTestimonial(item.id)}
                                    className="text-red-500 dark:text-red-400 hover:underline font-bold"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              <span className="block text-[10px] text-gray-500 dark:text-neutral-400">{item.roleEn} ({item.industryEn || 'General'})</span>
                              <p className="text-gray-600 dark:text-neutral-300 leading-relaxed italic text-[11px] bg-gray-50/50 p-2 rounded mt-1 border border-gray-50">"{item.feedbackEn}"</p>
                              <div className="flex items-center space-x-0.5 text-amber-500 dark:text-amber-400 font-semibold pt-1">
                                {'★'.repeat(item.rating)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB 2: VIDEO TESTIMONIALS */}
                {testimonialsSubTab === 'videos' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                        {currentLang === 'en' ? 'Manage Video Testimonial Reels' : 'ভিডিও টেস্টিমোনিয়াল পরিচালনা'}
                      </h4>
                      {!isCreatingVideo && (
                        <button
                          onClick={() => {
                            setIsCreatingVideo(true);
                            setEditingVideo(null);
                            setVideoForm({
                              titleEn: '', titleBn: '', clientName: '', company: '', rating: 5,
                              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                              thumbnailUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600',
                              shortDescriptionEn: '', shortDescriptionBn: '', featured: true, displayOrder: 1
                            });
                          }}
                          className="flex items-center space-x-1 rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3 w-3" />
                          <span>{currentLang === 'en' ? 'Add Video Review' : 'নতুন ভিডিও রিভিউ'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingVideo ? (
                      <form onSubmit={handleSaveTestimonialVideo} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Name</label>
                            <input
                              type="text" required
                              value={videoForm.clientName || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, clientName: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Company Name</label>
                            <input
                              type="text" required
                              value={videoForm.company || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, company: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Video Title (English)</label>
                            <input
                              type="text" required
                              value={videoForm.titleEn || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, titleEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1 col-span-2">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">YouTube / Vimeo Embed URL</label>
                            <input
                              type="text" required
                              value={videoForm.videoUrl || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                              placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Rating (Stars)</label>
                            <input
                              type="number" min={1} max={5} required
                              value={videoForm.rating || 5}
                              onChange={(e) => setVideoForm({ ...videoForm, rating: parseInt(e.target.value) || 5 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Video Thumbnail URL</label>
                            <input
                              type="text" required
                              value={videoForm.thumbnailUrl || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Avatar Photo URL</label>
                            <input
                              type="text" required
                              value={videoForm.avatar || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, avatar: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Short Summary (EN)</label>
                            <textarea
                              rows={2} required
                              value={videoForm.shortDescriptionEn || ''}
                              onChange={(e) => setVideoForm({ ...videoForm, shortDescriptionEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Display Order</label>
                            <input
                              type="number" required
                              value={videoForm.displayOrder || 1}
                              onChange={(e) => setVideoForm({ ...videoForm, displayOrder: parseInt(e.target.value) || 1 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-4">
                            <input
                              type="checkbox"
                              id="videoFeatured"
                              checked={videoForm.featured ?? true}
                              onChange={(e) => setVideoForm({ ...videoForm, featured: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                            />
                            <label htmlFor="videoFeatured" className="font-bold text-gray-700 dark:text-neutral-200">Featured Highlight</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCreatingVideo(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-1.5 font-bold"
                          >
                            Save Video
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonialVideos.map((item) => (
                          <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-3 bg-white dark:bg-[#141414] flex flex-col justify-between hover:border-blue-500 dark:border-orange-500 transition">
                            <div className="relative rounded-lg overflow-hidden border border-gray-100 dark:border-neutral-800 mb-2 aspect-video">
                              <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <span className="bg-white/90 text-blue-600 dark:text-orange-400 hover:bg-white dark:bg-[#141414] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">PLAY REEL</span>
                              </div>
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-gray-900 dark:text-white">{item.clientName} • <span className="text-gray-400 dark:text-neutral-500">{item.company}</span></span>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditVideoTrigger(item)}
                                    className="text-blue-600 dark:text-orange-400 hover:underline font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteVideo(item.id)}
                                    className="text-red-500 dark:text-red-400 hover:underline font-bold"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              <h5 className="font-bold text-gray-800 dark:text-neutral-100 text-xs">{item.titleEn}</h5>
                              <p className="text-gray-500 dark:text-neutral-400 text-[10px] leading-relaxed line-clamp-2">"{item.shortDescriptionEn}"</p>
                              <div className="flex items-center space-x-0.5 text-amber-500 dark:text-amber-400 pt-1">
                                {'★'.repeat(item.rating)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB 3: SUCCESS STORIES (B&A COMPARISONS) */}
                {testimonialsSubTab === 'stories' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                        {currentLang === 'en' ? 'Manage Client Case Studies & Success Stories' : 'সফলতার কেস স্টাডিজ পরিচালনা'}
                      </h4>
                      {!isCreatingSuccessStory && (
                        <button
                          onClick={() => {
                            setIsCreatingSuccessStory(true);
                            setEditingSuccessStory(null);
                            setSuccessStoryForm({
                              clientName: '', companyName: '', industryEn: '', industryBn: '', serviceEn: '', serviceBn: '',
                              backgroundEn: '', backgroundBn: '', challengeEn: '', challengeBn: '', solutionEn: '', solutionBn: '',
                              resultsEn: '', resultsBn: '', timelineEn: '3 Months', timelineBn: '৩ মাস', technologies: [],
                              beforeImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
                              afterImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
                              clientQuoteEn: '', clientQuoteBn: '', clientRoleEn: '', clientRoleBn: '',
                              clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                              featured: true, displayOrder: 1
                            });
                          }}
                          className="flex items-center space-x-1 rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3 w-3" />
                          <span>{currentLang === 'en' ? 'New Success Story' : 'নতুন কেস স্টাডি'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingSuccessStory ? (
                      <form onSubmit={handleSaveSuccessStory} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Name</label>
                            <input
                              type="text" required
                              value={successStoryForm.clientName || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, clientName: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Company Name</label>
                            <input
                              type="text" required
                              value={successStoryForm.companyName || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, companyName: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Industry (EN)</label>
                            <input
                              type="text" required
                              value={successStoryForm.industryEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, industryEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Service Engaged (EN)</label>
                            <input
                              type="text" required
                              value={successStoryForm.serviceEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, serviceEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Background (EN)</label>
                            <textarea
                              rows={2} required
                              value={successStoryForm.backgroundEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, backgroundEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Challenge (EN)</label>
                            <textarea
                              rows={3} required
                              value={successStoryForm.challengeEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, challengeEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Solution (EN)</label>
                            <textarea
                              rows={3} required
                              value={successStoryForm.solutionEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, solutionEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Results Description (EN)</label>
                            <textarea
                              rows={2} required
                              value={successStoryForm.resultsEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, resultsEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                              placeholder="e.g. 150% Increase in SEO traffic, 40% reduction in bounce rate"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Project Timeline (EN)</label>
                            <input
                              type="text" required
                              value={successStoryForm.timelineEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, timelineEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                              placeholder="e.g. 3 Months"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Technologies (Comma Separated)</label>
                            <input
                              type="text"
                              value={Array.isArray(successStoryForm.technologies) ? successStoryForm.technologies.join(', ') : successStoryForm.technologies || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, technologies: e.target.value.split(',').map(s => s.trim()) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-semibold text-blue-600 dark:text-orange-400"
                              placeholder="Next.js, Tailwind, Supabase"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Before Image URL (Old Site)</label>
                            <input
                              type="text" required
                              value={successStoryForm.beforeImage || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, beforeImage: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">After Image URL (New Site)</label>
                            <input
                              type="text" required
                              value={successStoryForm.afterImage || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, afterImage: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Rep Photo</label>
                            <input
                              type="text" required
                              value={successStoryForm.clientPhoto || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, clientPhoto: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Quote/Testimonial (EN)</label>
                            <textarea
                              rows={2} required
                              value={successStoryForm.clientQuoteEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, clientQuoteEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Client Design Role (EN)</label>
                            <input
                              type="text" required
                              value={successStoryForm.clientRoleEn || ''}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, clientRoleEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                              placeholder="e.g. CTO & Co-Founder"
                            />
                          </div>
                          
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Display Order</label>
                            <input
                              type="number" required
                              value={successStoryForm.displayOrder || 1}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, displayOrder: parseInt(e.target.value) || 1 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-4">
                            <input
                              type="checkbox"
                              id="storyFeatured"
                              checked={successStoryForm.featured ?? true}
                              onChange={(e) => setSuccessStoryForm({ ...successStoryForm, featured: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                            />
                            <label htmlFor="storyFeatured" className="font-bold text-gray-700 dark:text-neutral-200">Featured Case Study</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCreatingSuccessStory(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-1.5 font-bold"
                          >
                            Save Success Story
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {successStories.map((item) => (
                          <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 bg-white dark:bg-[#141414] flex items-center justify-between hover:border-blue-500 dark:border-orange-500 transition">
                            <div className="flex items-center space-x-4">
                              <img src={item.afterImage} alt="" className="h-14 w-20 rounded-lg object-cover border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-[#141414]" referrerPolicy="no-referrer" />
                              <div>
                                <h5 className="font-bold text-gray-900 dark:text-white text-sm">{item.clientName} ({item.companyName})</h5>
                                <span className="text-[10px] bg-blue-50 dark:bg-orange-500/10 text-blue-700 dark:text-orange-400 rounded px-1.5 py-0.5 font-bold uppercase tracking-wider">{item.serviceEn}</span>
                                <p className="text-gray-500 dark:text-neutral-400 text-[10px] mt-1">Results: <span className="font-semibold text-green-600 dark:text-emerald-400">{item.resultsEn}</span></p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditSuccessStoryTrigger(item)}
                                className="text-blue-600 dark:text-orange-400 hover:underline font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSuccessStory(item.id)}
                                className="text-red-500 dark:text-red-400 hover:underline font-bold"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB 4: CLIENT LOGOS */}
                {testimonialsSubTab === 'logos' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                        {currentLang === 'en' ? 'Manage Client Partner Logos' : 'ক্লায়েন্ট লোগো পরিচালনা'}
                      </h4>
                      {!isCreatingClientLogo && (
                        <button
                          onClick={() => {
                            setIsCreatingClientLogo(true);
                            setEditingClientLogo(null);
                            setClientLogoForm({ name: '', logoUrl: '', featured: true, displayOrder: 1 });
                          }}
                          className="flex items-center space-x-1 rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-2.5 py-1.5 font-bold transition"
                        >
                          <PlusIcon className="h-3 w-3" />
                          <span>{currentLang === 'en' ? 'Add Partner Logo' : 'নতুন লোগো যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {isCreatingClientLogo ? (
                      <form onSubmit={handleSaveClientLogo} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 border border-gray-200 dark:border-neutral-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Partner / Brand Name</label>
                            <input
                              type="text" required
                              value={clientLogoForm.name || ''}
                              onChange={(e) => setClientLogoForm({ ...clientLogoForm, name: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                              placeholder="e.g. Stripe"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Logo SVG / PNG URL</label>
                            <input
                              type="text" required
                              value={clientLogoForm.logoUrl || ''}
                              onChange={(e) => setClientLogoForm({ ...clientLogoForm, logoUrl: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none font-mono text-[10px]"
                              placeholder="https://cdn.worldvectorlogo.com/logos/stripe.svg"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-500 dark:text-neutral-400">Display Order</label>
                            <input
                              type="number" required
                              value={clientLogoForm.displayOrder || 1}
                              onChange={(e) => setClientLogoForm({ ...clientLogoForm, displayOrder: parseInt(e.target.value) || 1 })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-4">
                            <input
                              type="checkbox"
                              id="logoFeatured"
                              checked={clientLogoForm.featured ?? true}
                              onChange={(e) => setClientLogoForm({ ...clientLogoForm, featured: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                            />
                            <label htmlFor="logoFeatured" className="font-bold text-gray-700 dark:text-neutral-200">Display in Slider</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCreatingClientLogo(false)}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-3 py-1.5 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-1.5 font-bold"
                          >
                            Save Logo
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {clientLogos.map((item) => (
                          <div key={item.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-3 bg-white dark:bg-[#141414] flex flex-col items-center justify-between hover:border-blue-500 dark:border-orange-500 transition">
                            <div className="h-10 flex items-center justify-center p-2 mb-2 w-full bg-gray-50 dark:bg-[#141414] rounded-lg">
                              {item.logoUrl ? (
                                <img src={item.logoUrl} alt={item.name} className="max-h-6 max-w-[80%] object-contain opacity-70" referrerPolicy="no-referrer" />
                              ) : (
                                <span className="font-bold text-[10px] text-gray-400 dark:text-neutral-500">{item.name}</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between w-full border-t border-gray-50 pt-2 mt-1">
                              <span className="font-bold text-[10px] text-gray-700 dark:text-neutral-200 truncate max-w-[60%]">{item.name}</span>
                              <div className="flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleEditClientLogoTrigger(item)}
                                  className="text-blue-600 dark:text-orange-400 hover:underline text-[10px] font-bold"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClientLogo(item.id)}
                                  className="text-red-500 dark:text-red-400 hover:underline text-[10px] font-bold"
                                >
                                  Del
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB 5: STATS & SYSTEM SETTINGS */}
                {testimonialsSubTab === 'stats_settings' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* STATS MANAGER */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-2">
                        {currentLang === 'en' ? 'Core Trust Statistics' : 'মূল বিশ্বাস পরিসংখ্যান'}
                      </h4>
                      <form onSubmit={handleSaveTestimonialStatistics} className="space-y-3 bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-100 dark:border-neutral-800 shadow-sm">
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Total Clients Served</label>
                          <input
                            type="number" required
                            value={testimonialStatistics?.totalClients ?? 150}
                            onChange={(e) => setTestimonialStatistics({
                              ...(testimonialStatistics || { totalClients: 150, satisfactionRate: 99, averageRating: 4.9, successStoryCount: 12 }),
                              totalClients: parseInt(e.target.value) || 150
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Satisfaction Rate (%)</label>
                          <input
                            type="number" required min={1} max={100}
                            value={testimonialStatistics?.satisfactionRate ?? 99}
                            onChange={(e) => setTestimonialStatistics({
                              ...(testimonialStatistics || { totalClients: 150, satisfactionRate: 99, averageRating: 4.9, successStoryCount: 12 }),
                              satisfactionRate: parseInt(e.target.value) || 99
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Average Rating (Stars 1-5)</label>
                          <input
                            type="number" step="0.1" required min={1} max={5}
                            value={testimonialStatistics?.averageRating ?? 4.9}
                            onChange={(e) => setTestimonialStatistics({
                              ...(testimonialStatistics || { totalClients: 150, satisfactionRate: 99, averageRating: 4.9, successStoryCount: 12 }),
                              averageRating: parseFloat(e.target.value) || 4.9
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Success Case Studies Count</label>
                          <input
                            type="number" required
                            value={testimonialStatistics?.successStoryCount ?? 12}
                            onChange={(e) => setTestimonialStatistics({
                              ...(testimonialStatistics || { totalClients: 150, satisfactionRate: 99, averageRating: 4.9, successStoryCount: 12 }),
                              successStoryCount: parseInt(e.target.value) || 12
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white py-1.5 font-bold transition"
                        >
                          Update Trust Statistics
                        </button>
                      </form>
                    </div>

                    {/* SETTINGS MANAGER */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-2">
                        {currentLang === 'en' ? 'Review Submission Settings' : 'রিভিউ সাবমিশন সেটিংস'}
                      </h4>
                      <form onSubmit={handleSaveReviewSettings} className="space-y-3 bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-100 dark:border-neutral-800 shadow-sm">
                        <div className="flex items-center justify-between py-1 border-b border-gray-50">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700 dark:text-neutral-200">Require Approval</span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500">Newly submitted reviews must be manually approved</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={reviewSettings?.requireApproval ?? true}
                            onChange={(e) => setReviewSettings({
                              ...(reviewSettings || { requireApproval: true, enableRatings: true, allowVideoUploads: true, notificationEmail: 'admin@nextsolution.com', reviewsPerPage: 10 }),
                              requireApproval: e.target.checked
                            })}
                            className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                          />
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-gray-50">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700 dark:text-neutral-200">Enable Star Ratings</span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500">Allow users to provide 1-5 rating sliders</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={reviewSettings?.enableRatings ?? true}
                            onChange={(e) => setReviewSettings({
                              ...(reviewSettings || { requireApproval: true, enableRatings: true, allowVideoUploads: true, notificationEmail: 'admin@nextsolution.com', reviewsPerPage: 10 }),
                              enableRatings: e.target.checked
                            })}
                            className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                          />
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-gray-50">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-700 dark:text-neutral-200">Allow Video Submissions</span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500">Enable video URL suggestions in client forms</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={reviewSettings?.allowVideoUploads ?? true}
                            onChange={(e) => setReviewSettings({
                              ...(reviewSettings || { requireApproval: true, enableRatings: true, allowVideoUploads: true, notificationEmail: 'admin@nextsolution.com', reviewsPerPage: 10 }),
                              allowVideoUploads: e.target.checked
                            })}
                            className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 h-4 w-4"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Moderator Notification Email</label>
                          <input
                            type="email" required
                            value={reviewSettings?.notificationEmail ?? 'admin@nextsolution.com'}
                            onChange={(e) => setReviewSettings({
                              ...(reviewSettings || { requireApproval: true, enableRatings: true, allowVideoUploads: true, notificationEmail: 'admin@nextsolution.com', reviewsPerPage: 10 }),
                              notificationEmail: e.target.value
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold text-gray-500 dark:text-neutral-400">Reviews Per Page</label>
                          <input
                            type="number" required
                            value={reviewSettings?.reviewsPerPage ?? 10}
                            onChange={(e) => setReviewSettings({
                              ...(reviewSettings || { requireApproval: true, enableRatings: true, allowVideoUploads: true, notificationEmail: 'admin@nextsolution.com', reviewsPerPage: 10 }),
                              reviewsPerPage: parseInt(e.target.value) || 10
                            })}
                            className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white py-1.5 font-bold transition"
                        >
                          Update System Settings
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* T10: TEAM MEMBERS MANAGEMENT */}
            {activeSubTab === 'team' && (
              <div id="panel-team-desk" className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Manage Executive & Delivery Team' : 'টিম মেম্বার্স প্রোফাইল পরিচালনা'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsCreatingTeamMember(true);
                      setEditingTeamMember(null);
                      setTeamMemberForm({
                        name: '', roleEn: '', roleBn: '', departmentEn: 'Management', departmentBn: 'ব্যবস্থাপনা',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                        email: '', linkedin: '', bioEn: '', bioBn: ''
                      });
                    }}
                    className="flex items-center space-x-1.5 rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-2 font-bold transition"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{currentLang === 'en' ? 'Add Member' : 'মেম্বার যোগ করুন'}</span>
                  </button>
                </div>

                {isCreatingTeamMember ? (
                  <form onSubmit={handleSaveTeamMember} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Full Name</label>
                        <input
                          type="text" required
                          value={teamMemberForm.name || ''}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, name: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Avatar Photo URL</label>
                        <input
                          type="text" required
                          value={teamMemberForm.avatar || ''}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, avatar: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Corporate Role (English)</label>
                        <input
                          type="text" required
                          value={teamMemberForm.roleEn || ''}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, roleEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <div className="space-y-1.5 col-span-2">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">LinkedIn Profile Link</label>
                        <input
                          type="text"
                          value={teamMemberForm.linkedin || ''}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, linkedin: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Department (English)</label>
                        <select
                          value={teamMemberForm.departmentEn || 'Engineering'}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, departmentEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                        >
                          <option>Executive</option>
                          <option>Engineering</option>
                          <option>Design</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Short Bio (English)</label>
                        <textarea
                          rows={3}
                          value={teamMemberForm.bioEn || ''}
                          onChange={(e) => setTeamMemberForm({ ...teamMemberForm, bioEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsCreatingTeamMember(false)}
                        className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 font-bold"
                      >
                        Save Team Profile
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                        <div className="flex items-center space-x-4">
                          <img src={member.avatar} alt="" className="h-10 w-10 object-cover rounded-full bg-gray-50 dark:bg-[#141414] border border-gray-50" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white block">{member.name}</span>
                            <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-0.5">{member.roleEn} • {member.departmentEn}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditTeamMemberTrigger(member)}
                            className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTeamMember(member.id)}
                            className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* T11: MEDIA LIBRARY */}
            {activeSubTab === 'media' && (
              <div id="panel-media-desk" className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Asset & Media Reference Library' : 'মিডিয়া ও অ্যাসেট রেফারেন্স লাইব্রেরি'}
                  </h3>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-bold uppercase tracking-wider">Dynamic CDN references</span>
                </div>

                {/* Add new media reference form */}
                <form onSubmit={handleAddMedia} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-gray-500 dark:text-neutral-400">Asset Title</label>
                    <input
                      type="text" required
                      placeholder="e.g. Stripe Mockup"
                      value={newMediaTitle}
                      onChange={(e) => setNewMediaTitle(e.target.value)}
                      className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="font-semibold text-gray-500 dark:text-neutral-400">Direct CDN / Unsplash URL</label>
                    <input
                      type="text" required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-1.5 text-gray-800 dark:text-neutral-100 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-4 py-2 font-bold transition h-8.5"
                  >
                    Index Asset
                  </button>
                </form>

                {/* Media Search and Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-neutral-800 px-2.5 py-1 rounded-lg w-64 text-[11px]">
                      <SearchIcon className="h-3.5 w-3.5 text-gray-400 dark:text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search media assets..."
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        className="bg-transparent focus:outline-none w-full text-gray-700 dark:text-neutral-200 placeholder-gray-400"
                      />
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {['all', 'portfolio', 'about', 'services'].map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setMediaCategory(cat)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                            mediaCategory === cat ? 'bg-blue-600 dark:bg-orange-500 text-white' : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaItems
                      .filter(m => mediaCategory === 'all' || m.group === mediaCategory)
                      .filter(m => !mediaSearch || m.title.toLowerCase().includes(mediaSearch.toLowerCase()))
                      .map((item) => (
                        <div key={item.id} className="group relative rounded-xl border border-gray-100 dark:border-neutral-800 overflow-hidden shadow-sm bg-white dark:bg-[#141414] flex flex-col justify-between">
                          <img src={item.url} alt="" className="h-28 w-full object-cover bg-gray-50 dark:bg-[#141414]" referrerPolicy="no-referrer" />
                          <div className="p-2.5 space-y-1 border-t border-gray-50">
                            <span className="font-bold text-gray-900 dark:text-white block truncate">{item.title}</span>
                            <span className="text-[9px] text-gray-400 dark:text-neutral-500 font-mono block truncate">{item.url}</span>
                          </div>
                          <div className="flex border-t border-gray-50 divide-x divide-gray-50 text-[10px] font-bold text-center">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(item.url);
                                triggerNotice(currentLang === 'en' ? 'Link copied to clipboard!' : 'অ্যাসেট লিংক কপি করা হয়েছে!');
                              }}
                              className="w-1/2 py-1.5 text-blue-600 dark:text-orange-400 hover:bg-blue-50/50 transition cursor-pointer"
                            >
                              Copy Link
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(item.id)}
                              className="w-1/2 py-1.5 text-red-500 dark:text-red-400 hover:bg-red-50/50 transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* T12: USER & ROLE MANAGEMENT */}
            {activeSubTab === 'users' && (
              <div id="panel-users-desk" className="space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-700/80 pb-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLang === 'en' ? 'Administrative Accounts & Role Access' : 'প্রশাসনিক অ্যাকাউন্ট ও ভূমিকা নিয়ন্ত্রণ'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsCreatingUser(true);
                      setEditingUser(null);
                      setUserForm({
                        username: '', password: '', role: 'Editor', status: 'active', email: ''
                      });
                    }}
                    className="flex items-center space-x-1.5 rounded-lg bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-3 py-2 font-bold transition"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>{currentLang === 'en' ? 'New Admin' : 'নতুন অ্যাকাউন্ট'}</span>
                  </button>
                </div>

                {isCreatingUser ? (
                  <form onSubmit={handleSaveUser} className="space-y-4 bg-gray-50/50 dark:bg-neutral-800/40 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Username Identifier</label>
                        <input
                          type="text" required
                          value={userForm.username || ''}
                          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Corporate Email</label>
                        <input
                          type="email" required
                          value={userForm.email || ''}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Role Permissions</label>
                        <select
                          value={userForm.role || 'Editor'}
                          onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                        >
                          <option>SuperAdmin</option>
                          <option>Editor</option>
                          <option>Moderator</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Account Status</label>
                        <select
                          value={userForm.status || 'active'}
                          onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                        >
                          <option>active</option>
                          <option>locked</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-semibold text-gray-500 dark:text-neutral-400">Access Key Passcode</label>
                        <input
                          type="password" required
                          value={userForm.password || ''}
                          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsCreatingUser(false)}
                        className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 font-bold"
                      >
                        Save Administrator
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {adminUsers.map((u) => (
                      <div key={u.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold font-mono ${
                            u.role === 'SuperAdmin' ? 'bg-purple-100 text-purple-700 dark:text-purple-400 dark:text-purple-300' : 'bg-blue-100 dark:bg-orange-500/15 text-blue-700 dark:text-orange-400'
                          }`}>
                            {u.username.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white block">{u.username} • <span className="text-[10px] bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-gray-600 dark:text-neutral-300 font-extrabold uppercase">{u.role}</span></span>
                            <span className="text-gray-400 dark:text-neutral-500 font-mono text-[10px] block mt-0.5">{u.email} • Status: <span className={`font-bold uppercase ${u.status === 'active' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{u.status}</span></span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditUserTrigger(u)}
                            className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 font-semibold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'legal' && (
              <AdminLegalCMS currentLang={currentLang} triggerNotice={triggerNotice} />
            )}

            {activeSubTab === 'whychooseus' && (
              <div id="panel-whychooseus-desk" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {currentLang === 'en' ? 'Why Choose Us Configuration' : 'হোয়াই চুজ আস কনফিগারেশন'}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                      {currentLang === 'en' 
                        ? 'Manage custom asymmetric ecosystem cards, live metrics counter, trust badges, cloud tech logos, and custom call to action.' 
                        : 'কাস্টম অ্যাসিম্যাট্রিক ইকোসিস্টেম কার্ড, লাইভ কাউন্টার, ট্রাস্ট ব্যাজ এবং কল টু অ্যাকশন পরিবর্তন করুন।'}
                    </p>
                  </div>
                </div>

                {/* Sub Tab Navigation */}
                <div className="flex flex-wrap border-b border-gray-200 dark:border-neutral-700">
                  {(['cards', 'stats', 'badges', 'techs', 'cta'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setWhyChooseUsSubTab(tab);
                        setIsCreatingWhyCard(false); setEditingWhyCard(null);
                        setIsCreatingWhyStat(false); setEditingWhyStat(null);
                        setIsCreatingWhyBadge(false); setEditingWhyBadge(null);
                        setIsCreatingWhyTech(false); setEditingWhyTech(null);
                      }}
                      className={`border-b-2 py-2 px-4 text-xs font-bold transition-all duration-150 ${
                        whyChooseUsSubTab === tab
                          ? 'border-blue-600 text-blue-600 dark:text-orange-400'
                          : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white dark:text-white'
                      }`}
                    >
                      {tab === 'cards' && (currentLang === 'en' ? 'Ecosystem Cards' : 'ইকোসিস্টেম কার্ড')}
                      {tab === 'stats' && (currentLang === 'en' ? 'Live Statistics' : 'লাইভ পরিসংখ্যান')}
                      {tab === 'badges' && (currentLang === 'en' ? 'Trust Badges' : 'ট্রাস্ট ব্যাজ')}
                      {tab === 'techs' && (currentLang === 'en' ? 'Cloud Tech Badges' : 'ক্লাউড টেক ব্যাজ')}
                      {tab === 'cta' && (currentLang === 'en' ? 'CTA Section' : 'কল-টু-অ্যাকশন')}
                    </button>
                  ))}
                </div>

                {/* subtab == 'cards' */}
                {whyChooseUsSubTab === 'cards' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100">
                        {currentLang === 'en' ? 'Ecosystem & Advantage Cards' : 'ইকোসিস্টেম ও অ্যাডভান্টেজ কার্ড'}
                      </h4>
                      {!isCreatingWhyCard && !editingWhyCard && (
                        <button
                          onClick={() => {
                            setWhyCardForm({
                              titleEn: '', titleBn: '', descriptionEn: '', descriptionBn: '', icon: 'Sparkles', categoryEn: '', categoryBn: '', badgeTextEn: '', badgeTextBn: '', displayOrder: 1, visible: true
                            });
                            setIsCreatingWhyCard(true);
                          }}
                          className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add New Card' : 'নতুন কার্ড যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {(isCreatingWhyCard || editingWhyCard) ? (
                      <form onSubmit={handleSaveWhyCard} className="space-y-4 rounded-xl border border-blue-100 dark:border-orange-500/20 bg-blue-50/20 p-5">
                        <div className="text-xs font-bold text-blue-700 dark:text-orange-400 pb-2 border-b border-blue-100 dark:border-orange-500/20 flex justify-between items-center">
                          <span>{editingWhyCard ? (currentLang === 'en' ? 'Edit Advantage Card' : 'কার্ড এডিট করুন') : (currentLang === 'en' ? 'Create Advantage Card' : 'নতুন কার্ড তৈরি করুন')}</span>
                          <button 
                            type="button" 
                            onClick={() => { setIsCreatingWhyCard(false); setEditingWhyCard(null); }}
                            className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300"
                          >
                            ✖
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Title (English)' : 'শিরোনাম (ইংরেজী)'}</label>
                            <input
                              type="text" required
                              value={whyCardForm.titleEn || ''}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, titleEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Category/Spoke Key (English)' : 'ক্যাটাগরি/স্পোক কি (ইংরেজী)'}</label>
                            <input
                              type="text" placeholder="e.g. Design, Development, Marketing"
                              value={whyCardForm.categoryEn || ''}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, categoryEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Lucide Icon Name' : 'লুসিড আইকন নাম'}</label>
                            <select
                              value={whyCardForm.icon || 'Sparkles'}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, icon: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            >
                              {['Sparkles', 'Cpu', 'Users', 'Trophy', 'TrendingUp', 'Activity', 'Shield', 'Layers', 'CheckCircle2', 'Flame', 'Compass', 'Lightbulb'].map((ic) => (
                                <option key={ic} value={ic}>{ic}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Badge Overlap Text (English) - Optional' : 'ওভারল্যাপ ব্যাজ টেক্সট (ইংরেজী)'}</label>
                            <input
                              type="text" placeholder="e.g. Speed 100%"
                              value={whyCardForm.badgeTextEn || ''}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, badgeTextEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Display Order' : 'প্রদর্শনের ক্রম'}</label>
                            <input
                              type="number" required
                              value={whyCardForm.displayOrder || 1}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, displayOrder: Number(e.target.value) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1 flex items-center pt-5">
                            <input
                              type="checkbox" id="whycard-visible"
                              checked={whyCardForm.visible !== false}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, visible: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 mr-2 h-4 w-4"
                            />
                            <label htmlFor="whycard-visible" className="font-bold text-gray-600 dark:text-neutral-300 select-none">{currentLang === 'en' ? 'Card is Visible' : 'কার্ডটি দৃশ্যমান হবে'}</label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Description (English)' : 'বর্ণনা (ইংরেজী)'}</label>
                            <textarea
                              rows={3} required
                              value={whyCardForm.descriptionEn || ''}
                              onChange={(e) => setWhyCardForm({ ...whyCardForm, descriptionEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-blue-50">
                          <button
                            type="button"
                            onClick={() => { setIsCreatingWhyCard(false); setEditingWhyCard(null); }}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] transition"
                          >
                            {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
                          >
                            {currentLang === 'en' ? 'Save Card' : 'সংরক্ষণ করুন'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {whyChooseUsCards.map((c) => (
                          <div key={c.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] bg-blue-50 dark:bg-orange-500/10 text-blue-700 dark:text-orange-400 px-2 py-0.5 rounded uppercase font-bold">{c.icon}</span>
                                {c.categoryEn && (
                                  <span className="font-mono text-[10px] bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 px-2 py-0.5 rounded font-semibold">{c.categoryEn}</span>
                                )}
                                {!c.visible && (
                                  <span className="font-mono text-[10px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">Hidden</span>
                                )}
                              </div>
                              <h5 className="font-bold text-sm text-gray-900 dark:text-white mt-2">
                                {currentLang === 'en' ? c.titleEn : c.titleBn}
                              </h5>
                              <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1 line-clamp-1 max-w-xl">
                                {currentLang === 'en' ? c.descriptionEn : c.descriptionBn}
                              </p>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-neutral-500 mt-1 block">Sort order: {c.displayOrder}</span>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingWhyCard(c);
                                  setWhyCardForm(c);
                                }}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                {currentLang === 'en' ? 'Edit' : 'সম্পাদনা'}
                              </button>
                              <button
                                onClick={() => handleDeleteWhyCard(c.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                {currentLang === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* subtab == 'stats' */}
                {whyChooseUsSubTab === 'stats' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100">
                        {currentLang === 'en' ? 'Live Dynamic Statistics Counter' : 'লাইভ ডায়নামিক কাউন্টার পরিসংখ্যান'}
                      </h4>
                      {!isCreatingWhyStat && !editingWhyStat && (
                        <button
                          onClick={() => {
                            setWhyStatForm({ value: '', labelEn: '', labelBn: '', displayOrder: 1, visible: true });
                            setIsCreatingWhyStat(true);
                          }}
                          className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add New Stat' : 'নতুন পরিসংখ্যান যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {(isCreatingWhyStat || editingWhyStat) ? (
                      <form onSubmit={handleSaveWhyStat} className="space-y-4 rounded-xl border border-blue-100 dark:border-orange-500/20 bg-blue-50/20 p-5">
                        <div className="text-xs font-bold text-blue-700 dark:text-orange-400 pb-2 border-b border-blue-100 dark:border-orange-500/20 flex justify-between items-center">
                          <span>{editingWhyStat ? (currentLang === 'en' ? 'Edit Metric' : 'পরিসংখ্যান এডিট করুন') : (currentLang === 'en' ? 'Create Metric' : 'নতুন পরিসংখ্যান তৈরি করুন')}</span>
                          <button 
                            type="button" 
                            onClick={() => { setIsCreatingWhyStat(false); setEditingWhyStat(null); }}
                            className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300"
                          >
                            ✖
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Value (e.g. 99% or 250+)' : 'মান (উদাঃ ৯৯% বা ২৫০+)'}</label>
                            <input
                              type="text" required
                              value={whyStatForm.value || ''}
                              onChange={(e) => setWhyStatForm({ ...whyStatForm, value: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Display Order' : 'প্রদর্শনের ক্রম'}</label>
                            <input
                              type="number" required
                              value={whyStatForm.displayOrder || 1}
                              onChange={(e) => setWhyStatForm({ ...whyStatForm, displayOrder: Number(e.target.value) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Label (English)' : 'লেবেল (ইংরেজী)'}</label>
                            <input
                              type="text" required
                              value={whyStatForm.labelEn || ''}
                              onChange={(e) => setWhyStatForm({ ...whyStatForm, labelEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          

                          <div className="space-y-1 flex items-center pt-2 col-span-2">
                            <input
                              type="checkbox" id="whystat-visible"
                              checked={whyStatForm.visible !== false}
                              onChange={(e) => setWhyStatForm({ ...whyStatForm, visible: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 mr-2 h-4 w-4"
                            />
                            <label htmlFor="whystat-visible" className="font-bold text-gray-600 dark:text-neutral-300 select-none">{currentLang === 'en' ? 'Stat is Visible' : 'পরিসংখ্যানটি দৃশ্যমান হবে'}</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-blue-50">
                          <button
                            type="button"
                            onClick={() => { setIsCreatingWhyStat(false); setEditingWhyStat(null); }}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] transition"
                          >
                            {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
                          >
                            {currentLang === 'en' ? 'Save Stat' : 'সংরক্ষণ করুন'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {whyChooseUsStats.map((s) => (
                          <div key={s.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-base font-black text-blue-600 dark:text-orange-400">{s.value}</span>
                                {!s.visible && (
                                  <span className="font-mono text-[10px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">Hidden</span>
                                )}
                              </div>
                              <h5 className="font-semibold text-xs text-gray-700 dark:text-neutral-200 mt-1">
                                {currentLang === 'en' ? s.labelEn : s.labelBn}
                              </h5>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-neutral-500 block mt-1">Sort order: {s.displayOrder}</span>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingWhyStat(s);
                                  setWhyStatForm(s);
                                }}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                {currentLang === 'en' ? 'Edit' : 'সম্পাদনা'}
                              </button>
                              <button
                                onClick={() => handleDeleteWhyStat(s.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                {currentLang === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* subtab == 'badges' */}
                {whyChooseUsSubTab === 'badges' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100">
                        {currentLang === 'en' ? 'Trust & Certification Badges' : 'ট্রাস্ট ও সার্টিফিকেশন ব্যাজ'}
                      </h4>
                      {!isCreatingWhyBadge && !editingWhyBadge && (
                        <button
                          onClick={() => {
                            setWhyBadgeForm({ labelEn: '', labelBn: '', displayOrder: 1, visible: true });
                            setIsCreatingWhyBadge(true);
                          }}
                          className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add New Trust Badge' : 'নতুন ট্রাস্ট ব্যাজ যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {(isCreatingWhyBadge || editingWhyBadge) ? (
                      <form onSubmit={handleSaveWhyBadge} className="space-y-4 rounded-xl border border-blue-100 dark:border-orange-500/20 bg-blue-50/20 p-5">
                        <div className="text-xs font-bold text-blue-700 dark:text-orange-400 pb-2 border-b border-blue-100 dark:border-orange-500/20 flex justify-between items-center">
                          <span>{editingWhyBadge ? (currentLang === 'en' ? 'Edit Trust Badge' : 'ব্যাজ এডিট করুন') : (currentLang === 'en' ? 'Create Trust Badge' : 'নতুন ব্যাজ তৈরি করুন')}</span>
                          <button 
                            type="button" 
                            onClick={() => { setIsCreatingWhyBadge(false); setEditingWhyBadge(null); }}
                            className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300"
                          >
                            ✖
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Label (English)' : 'লেবেল (ইংরেজী)'}</label>
                            <input
                              type="text" required
                              value={whyBadgeForm.labelEn || ''}
                              onChange={(e) => setWhyBadgeForm({ ...whyBadgeForm, labelEn: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>
                          

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Display Order' : 'প্রদর্শনের ক্রম'}</label>
                            <input
                              type="number" required
                              value={whyBadgeForm.displayOrder || 1}
                              onChange={(e) => setWhyBadgeForm({ ...whyBadgeForm, displayOrder: Number(e.target.value) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1 flex items-center pt-5">
                            <input
                              type="checkbox" id="whybadge-visible"
                              checked={whyBadgeForm.visible !== false}
                              onChange={(e) => setWhyBadgeForm({ ...whyBadgeForm, visible: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 mr-2 h-4 w-4"
                            />
                            <label htmlFor="whybadge-visible" className="font-bold text-gray-600 dark:text-neutral-300 select-none">{currentLang === 'en' ? 'Badge is Visible' : 'ব্যাজটি দৃশ্যমান হবে'}</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-blue-50">
                          <button
                            type="button"
                            onClick={() => { setIsCreatingWhyBadge(false); setEditingWhyBadge(null); }}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] transition"
                          >
                            {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
                          >
                            {currentLang === 'en' ? 'Save Badge' : 'সংরক্ষণ করুন'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {whyChooseUsBadges.map((b) => (
                          <div key={b.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-gray-900 dark:text-white">{currentLang === 'en' ? b.labelEn : b.labelBn}</span>
                                {!b.visible && (
                                  <span className="font-mono text-[10px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">Hidden</span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-neutral-500 block mt-1">Sort order: {b.displayOrder}</span>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingWhyBadge(b);
                                  setWhyBadgeForm(b);
                                }}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                {currentLang === 'en' ? 'Edit' : 'সম্পাদনা'}
                              </button>
                              <button
                                onClick={() => handleDeleteWhyBadge(b.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                {currentLang === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* subtab == 'techs' */}
                {whyChooseUsSubTab === 'techs' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100">
                        {currentLang === 'en' ? 'Technologies & Framework Ecosystem' : 'প্রযুক্তি ও ফ্রেমওয়ার্ক ইকোসিস্টেম'}
                      </h4>
                      {!isCreatingWhyTech && !editingWhyTech && (
                        <button
                          onClick={() => {
                            setWhyTechForm({ name: '', logoUrl: '', displayOrder: 1, visible: true });
                            setIsCreatingWhyTech(true);
                          }}
                          className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                          <span>{currentLang === 'en' ? 'Add Technology' : 'নতুন প্রযুক্তি যোগ করুন'}</span>
                        </button>
                      )}
                    </div>

                    {(isCreatingWhyTech || editingWhyTech) ? (
                      <form onSubmit={handleSaveWhyTech} className="space-y-4 rounded-xl border border-blue-100 dark:border-orange-500/20 bg-blue-50/20 p-5">
                        <div className="text-xs font-bold text-blue-700 dark:text-orange-400 pb-2 border-b border-blue-100 dark:border-orange-500/20 flex justify-between items-center">
                          <span>{editingWhyTech ? (currentLang === 'en' ? 'Edit Tech Brand' : 'প্রযুক্তি এডিট করুন') : (currentLang === 'en' ? 'Add Tech Brand' : 'নতুন প্রযুক্তি তৈরি করুন')}</span>
                          <button 
                            type="button" 
                            onClick={() => { setIsCreatingWhyTech(false); setEditingWhyTech(null); }}
                            className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 dark:text-neutral-300"
                          >
                            ✖
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Technology Name' : 'প্রযুক্তির নাম'}</label>
                            <input
                              type="text" required
                              value={whyTechForm.name || ''}
                              onChange={(e) => setWhyTechForm({ ...whyTechForm, name: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'SVG Logo Source / URL' : 'এসভিজি লোগো বা ছবির লিংক'}</label>
                            <input
                              type="text" required placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
                              value={whyTechForm.logoUrl || ''}
                              onChange={(e) => setWhyTechForm({ ...whyTechForm, logoUrl: e.target.value })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Display Order' : 'প্রদর্শনের ক্রম'}</label>
                            <input
                              type="number" required
                              value={whyTechForm.displayOrder || 1}
                              onChange={(e) => setWhyTechForm({ ...whyTechForm, displayOrder: Number(e.target.value) })}
                              className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                            />
                          </div>

                          <div className="space-y-1 flex items-center pt-5">
                            <input
                              type="checkbox" id="whytech-visible"
                              checked={whyTechForm.visible !== false}
                              onChange={(e) => setWhyTechForm({ ...whyTechForm, visible: e.target.checked })}
                              className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 mr-2 h-4 w-4"
                            />
                            <label htmlFor="whytech-visible" className="font-bold text-gray-600 dark:text-neutral-300 select-none">{currentLang === 'en' ? 'Tech is Visible' : 'প্রযুক্তিটি দৃশ্যমান হবে'}</label>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-2 border-t border-blue-50">
                          <button
                            type="button"
                            onClick={() => { setIsCreatingWhyTech(false); setEditingWhyTech(null); }}
                            className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] transition"
                          >
                            {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                          </button>
                          <button
                            type="submit"
                            className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
                          >
                            {currentLang === 'en' ? 'Save Technology' : 'সংরক্ষণ করুন'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {whyChooseUsTechs.map((t) => (
                          <div key={t.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                            <div className="flex items-center gap-3">
                              {t.logoUrl ? (
                                <img src={t.logoUrl} alt={t.name} referrerPolicy="no-referrer" className="h-7 w-7 object-contain bg-slate-50 dark:bg-slate-900/60 p-1 rounded border border-gray-100 dark:border-neutral-800 shrink-0" />
                              ) : (
                                <div className="h-7 w-7 rounded bg-gray-100 dark:bg-neutral-800" />
                              )}
                              <div>
                                <span className="font-bold text-sm text-gray-900 dark:text-white block">{t.name}</span>
                                <span className="text-[9px] font-mono text-gray-400 dark:text-neutral-500 block">Sort order: {t.displayOrder} {!t.visible && '• Hidden'}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingWhyTech(t);
                                  setWhyTechForm(t);
                                }}
                                className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-2.5 py-1.5 text-xs font-bold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                              >
                                {currentLang === 'en' ? 'Edit' : 'সম্পাদনা'}
                              </button>
                              <button
                                onClick={() => handleDeleteWhyTech(t.id)}
                                className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-2.5 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                              >
                                {currentLang === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* subtab == 'cta' */}
                {whyChooseUsSubTab === 'cta' && (
                  <form onSubmit={handleSaveWhyCTA} className="space-y-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 shadow-sm text-xs">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100 pb-2 border-b border-gray-100 dark:border-neutral-800">
                      {currentLang === 'en' ? 'Call To Action (CTA) Box Text & Translations' : 'কল টু অ্যাকশন (CTA) বক্স টেক্সট ও অনুবাদসমূহ'}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Tagline Over Heading (English)' : 'ট্যাগলাইন ওভার হেডিং (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={whyCTAForm.taglineEn || ''}
                          onChange={(e) => setWhyCTAForm({ ...whyCTAForm, taglineEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Headline (English)' : 'হেডলাইন (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={whyCTAForm.headlineEn || ''}
                          onChange={(e) => setWhyCTAForm({ ...whyCTAForm, headlineEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Primary Button Text (English)' : 'প্রধান বাটন টেক্সট (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={whyCTAForm.primaryButtonTextEn || ''}
                          onChange={(e) => setWhyCTAForm({ ...whyCTAForm, primaryButtonTextEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Secondary Button Text (English)' : 'सहयोगी বাটন টেক্সট (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={whyCTAForm.secondaryButtonTextEn || ''}
                          onChange={(e) => setWhyCTAForm({ ...whyCTAForm, secondaryButtonTextEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Description (English)' : 'বর্ণনা (ইংরেজী)'}</label>
                        <textarea
                          rows={3} required
                          value={whyCTAForm.descriptionEn || ''}
                          onChange={(e) => setWhyCTAForm({ ...whyCTAForm, descriptionEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>
                      
                    </div>

                    <div className="flex justify-end pt-3 border-t border-gray-100 dark:border-neutral-800">
                      <button
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-6 py-2.5 text-xs font-bold transition shadow-sm"
                      >
                        {currentLang === 'en' ? 'Save CTA Changes' : 'কল-টু-অ্যাকশন সেভ করুন'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeSubTab === 'techstack' && (
              <div id="panel-techstack-desk" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {currentLang === 'en' ? 'Technologies & Tools Stack' : 'টেকনোলজি ও টুলস স্ট্যাক'}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                      {currentLang === 'en' 
                        ? 'Configure the Bento-Grid style technology showcase displayed on the home page.' 
                        : 'হোম পেজে প্রদর্শিত বেন্টো-গ্রিড টেকনোলজি শোকেসটি কনফিগার করুন।'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleRestoreTechServiceCards}
                      className="inline-flex items-center space-x-1 rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] px-3 py-1.5 text-xs font-bold text-gray-600 dark:text-neutral-300 transition"
                    >
                      <RotateCcwIcon className="h-3.5 w-3.5" />
                      <span>{currentLang === 'en' ? 'Restore Defaults' : 'ডিফল্ট পুনরুদ্ধার'}</span>
                    </button>
                    {!isCreatingTechServiceCard && !editingTechServiceCard && (
                      <button
                        onClick={() => {
                          setIsCreatingTechServiceCard(true);
                          setTechServiceCardForm({
                            icon: 'Globe', categoryEn: '', categoryBn: '', descriptionEn: '', descriptionBn: '', technologies: [], projectCount: 'Used by 50+ Projects', popularProjectsEn: [], popularProjectsBn: [], benefitsEn: [], benefitsBn: [], experienceLevelEn: 'Expert Level Architecture', experienceLevelBn: 'এক্সপার্ট লেভেল আর্কিটেকচার', featuredBadgeEn: '', featuredBadgeBn: '', displayOrder: techServiceCards.length + 1, visible: true, animationType: 'fade'
                          });
                        }}
                        className="inline-flex items-center space-x-1 rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 px-3.5 py-1.5 text-xs font-bold text-white transition shadow-sm"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                        <span>{currentLang === 'en' ? 'Add Card' : 'কার্ড যোগ করুন'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isCreatingTechServiceCard || editingTechServiceCard ? (
                  <form onSubmit={handleSaveTechServiceCard} className="space-y-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 shadow-sm text-xs">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-neutral-100 pb-2 border-b border-gray-100 dark:border-neutral-800">
                      {editingTechServiceCard ? (currentLang === 'en' ? 'Edit Card' : 'কার্ড সম্পাদন') : (currentLang === 'en' ? 'Create New Card' : 'নতুন কার্ড তৈরি')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Icon Class/Name' : 'আইকন নাম'}</label>
                        <select
                          value={techServiceCardForm.icon || 'Globe'}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, icon: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        >
                          {['Globe', 'Layers', 'Sparkles', 'TrendingUp', 'Megaphone', 'Clock', 'Award', 'Zap', 'Cpu'].map(ic => (
                            <option key={ic} value={ic}>{ic}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Category (English)' : 'ক্যাটাগরি (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={techServiceCardForm.categoryEn || ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, categoryEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Description (English)' : 'বর্ণনা (ইংরেজী)'}</label>
                        <textarea
                          rows={2} required
                          value={techServiceCardForm.descriptionEn || ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, descriptionEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Project Count Metric (e.g. 120+)' : 'প্রজেক্ট সংখ্যা বা মেট্রিক'}</label>
                        <input
                          type="text" required
                          value={techServiceCardForm.projectCount || ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, projectCount: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Experience Level (English)' : 'অভিজ্ঞতা স্তর (ইংরেজী)'}</label>
                        <input
                          type="text" required
                          value={techServiceCardForm.experienceLevelEn || ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, experienceLevelEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Featured Badge (English) - Optional' : 'ফিচারড ব্যাজ (ইংরেজী)'}</label>
                        <input
                          type="text"
                          value={techServiceCardForm.featuredBadgeEn || ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, featuredBadgeEn: e.target.value })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Technologies (One per line)' : 'টেকনোলজিস (লাইন প্রতি একটি)'}</label>
                        <textarea
                          rows={4} required
                          placeholder="React&#10;Next.js&#10;TailwindCSS"
                          value={techServiceCardForm.technologies ? techServiceCardForm.technologies.join('\n') : ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, technologies: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Popular Solutions (English, One per line)' : 'জনপ্রিয় সমাধান (ইংরেজী, লাইন প্রতি একটি)'}</label>
                        <textarea
                          rows={4} required
                          placeholder="Enterprise CRM&#10;SaaS Dashboards"
                          value={techServiceCardForm.popularProjectsEn ? techServiceCardForm.popularProjectsEn.join('\n') : ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, popularProjectsEn: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Core Benefits (English, One per line)' : 'মূল সুবিধা (ইংরেজী, লাইন প্রতি একটি)'}</label>
                        <textarea
                          rows={3} required
                          placeholder="Lightning Fast Loadtimes&#10;SEO friendly"
                          value={techServiceCardForm.benefitsEn ? techServiceCardForm.benefitsEn.join('\n') : ''}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, benefitsEn: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-gray-600 dark:text-neutral-300 block">{currentLang === 'en' ? 'Display Order' : 'প্রদর্শনের ক্রম'}</label>
                        <input
                          type="number" required
                          value={techServiceCardForm.displayOrder || 1}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, displayOrder: Number(e.target.value) })}
                          className="w-full rounded border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-2.5 py-2 text-gray-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:border-neutral-600"
                        />
                      </div>

                      <div className="space-y-1 flex items-center pt-5">
                        <input
                          type="checkbox" id="techcard-visible"
                          checked={techServiceCardForm.visible !== false}
                          onChange={(e) => setTechServiceCardForm({ ...techServiceCardForm, visible: e.target.checked })}
                          className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-orange-400 focus:ring-blue-500 dark:focus:ring-orange-500 mr-2 h-4 w-4"
                        />
                        <label htmlFor="techcard-visible" className="font-bold text-gray-600 dark:text-neutral-300 select-none">{currentLang === 'en' ? 'Card is Visible' : 'কার্ডটি দৃশ্যমান হবে'}</label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-blue-50">
                      <button
                        type="button"
                        onClick={() => { setIsCreatingTechServiceCard(false); setEditingTechServiceCard(null); }}
                        className="rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#141414] px-4 py-2 text-xs font-bold text-gray-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-800/70 dark:bg-[#141414] transition"
                      >
                        {currentLang === 'en' ? 'Cancel' : 'বাতিল'}
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-blue-600 dark:bg-orange-500 hover:bg-blue-700 dark:hover:bg-orange-400 text-white px-5 py-2 text-xs font-bold transition shadow-sm"
                      >
                        {currentLang === 'en' ? 'Save Card' : 'সংরক্ষণ করুন'}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {techServiceCards.map((card) => (
                      <div key={card.id} className="rounded-xl border border-gray-100 dark:border-neutral-800 p-4 flex items-center justify-between gap-4 shadow-sm bg-white dark:bg-[#141414] hover:border-blue-500 dark:border-orange-500 transition">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-orange-500/10 flex items-center justify-center text-blue-600 dark:text-orange-400 shrink-0">
                            <CpuIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-gray-900 dark:text-white block">
                              {currentLang === 'en' ? card.categoryEn : card.categoryBn}
                            </span>
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500 block font-mono">
                              Sort order: {card.displayOrder} • {card.technologies.length} Techs {!card.visible && '• Hidden'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingTechServiceCard(card);
                              setTechServiceCardForm(card);
                            }}
                            className="rounded bg-gray-50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-neutral-800 dark:bg-neutral-800 px-2.5 py-1.5 text-xs font-bold text-gray-700 dark:text-neutral-200 border border-gray-100 dark:border-neutral-800 transition"
                          >
                            {currentLang === 'en' ? 'Edit' : 'সম্পাদনা'}
                          </button>
                          <button
                            onClick={() => handleDeleteTechServiceCard(card.id)}
                            className="rounded bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 px-2.5 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 transition"
                          >
                            {currentLang === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'products' && (
              <AdminProductsCMS currentLang={currentLang} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
